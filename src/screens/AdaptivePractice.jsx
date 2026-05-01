/**
 * AdaptivePractice — adaptive question bank practice mode.
 * Route: /practice/:topicId
 */
import { motion, AnimatePresence } from 'motion/react'
import { useState, useEffect, useCallback } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import {
  CaretRight,
  ArrowCounterClockwise,
  BookmarkSimple,
  Check,
  CircleNotch,
  ArrowLeft,
} from '@phosphor-icons/react'
import { TOPICS, MODULES } from '../data/topics'
import { useAdaptiveRuntime } from '../hooks/useAdaptiveRuntime'
import { checkAnswer, getQuestions } from '../lib/questionRepository'
import { getSelectedBoard } from '../utils/boardConfig'
import PageHeader from '../components/PageHeader'

const MODULE_TOPIC_NAME_MAP = {
  'Magnetism & Electromagnetism': 'Magnetism',
  'Space Physics': 'Space',
}

const sessionKey = (topicId) => `neurophysics_practice_session_${topicId}`
const RECENT_REPEAT_WINDOW = 5

function uniqueIds(ids) {
  return [...new Set(ids.filter(Boolean))]
}

const getProgressLabel = (current, total) => {
  const pct = current / total
  if (pct === 0) return 'Ready to begin'
  if (pct < 0.35) return 'Good start'
  if (pct < 0.6) return 'Halfway there'
  if (pct < 0.85) return 'Nearly done'
  return 'Final questions'
}

function MCQQuestion({ question, review, onSubmit }) {
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    setSelected(null)
  }, [question?.id])

  const handleSubmit = () => {
    if (selected == null || review) return
    onSubmit(selected)
  }

  return (
    <div className="space-y-3">
      <div className="space-y-2">
        {(question.options || []).map((option, index) => {
          const isCorrect = review && index === review.correctIndex
          const isWrong = review && index === selected && !review.isCorrect
          const isSelected = selected === index
          return (
            <motion.button
              key={`${question.id}-${index}`}
              className="w-full text-left px-4 py-3.5 rounded-[14px] text-sm font-medium"
              style={{
                background: isCorrect
                  ? 'rgba(0,188,125,0.12)'
                  : isWrong
                    ? 'rgba(239,68,68,0.12)'
                    : isSelected
                      ? 'rgba(99,102,241,0.12)'
                      : 'rgba(18,26,47,0.9)',
                border: isCorrect
                  ? '1.5px solid #00bc7d'
                  : isWrong
                    ? '1.5px solid #ef4444'
                    : isSelected
                      ? '1.5px solid #6366f1'
                      : '0.75px solid #1d293d',
                color: isCorrect ? '#00bc7d' : isWrong ? '#ef4444' : '#f8fafc',
              }}
              disabled={Boolean(review)}
              onClick={() => {
                if (!review) setSelected(index)
              }}
              whileTap={review ? {} : { scale: 0.98 }}
            >
              <span className="font-bold mr-3" style={{ color: 'rgba(255,255,255,0.35)' }}>
                {String.fromCharCode(65 + index)}
              </span>
              {option}
            </motion.button>
          )
        })}
      </div>

      {!review && (
        <motion.button
          className="w-full py-3.5 rounded-[14px] text-sm font-bold"
          style={{
            background: selected != null ? '#6366f1' : '#1d293d',
            color: selected != null ? '#fff' : '#8899b0',
          }}
          onClick={handleSubmit}
          disabled={selected == null}
          whileTap={{ scale: 0.97 }}
        >
          Check answer
        </motion.button>
      )}
    </div>
  )
}

export default function AdaptivePractice() {
  const { topicId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { reviewMode, maxQuestions } = location.state || {}

  const topic = TOPICS[topicId]
  const mod = MODULES.find((module) => module.topics.includes(topicId))
  const moduleColor = topic?.moduleColor || mod?.color || '#6366f1'
  const repositoryTopic = MODULE_TOPIC_NAME_MAP[mod?.name] || mod?.name || null
  const boardId = getSelectedBoard().id

  const { learnerState, recordAnswer, resetTopicState, selectQuestion } = useAdaptiveRuntime(topicId)

  const [savedConfirm, setSavedConfirm] = useState(false)
  const [sessionCount, setSessionCount] = useState(0)
  const [sessionCorrect, setSessionCorrect] = useState(0)
  const [seenIds, setSeenIds] = useState([])
  const [questionPool, setQuestionPool] = useState([])
  const [poolLoading, setPoolLoading] = useState(true)
  const [poolError, setPoolError] = useState('')
  const [currentQuestion, setCurrentQuestion] = useState(null)
  const [answerReview, setAnswerReview] = useState(null)
  const [showDone, setShowDone] = useState(false)
  const [sessionRestorePrompt, setSessionRestorePrompt] = useState(null)
  const [restoreChecked, setRestoreChecked] = useState(false)
  const [difficultyMessage, setDifficultyMessage] = useState(null)

  const reviewCap = reviewMode ? (maxQuestions || 5) : 20
  const streak = learnerState.correctStreak
  const safeExit = useCallback(() => {
    const from = location.state?.from
    if (typeof from === 'string' && from.startsWith('/')) {
      navigate(from, { replace: true })
      return
    }

    const historyIndex = window.history?.state?.idx
    if (typeof historyIndex === 'number' && historyIndex > 0) {
      navigate(-1)
      return
    }

    navigate('/learn', { replace: true })
  }, [location.state, navigate])

  const getRecentExcludeIds = useCallback((extraIds = []) => {
    return uniqueIds([
      ...learnerState.recentQuestionIds,
      ...seenIds,
      ...extraIds,
      currentQuestion?.id,
    ]).slice(-RECENT_REPEAT_WINDOW)
  }, [currentQuestion?.id, learnerState.recentQuestionIds, seenIds])

  const presentQuestion = useCallback((question) => {
    setCurrentQuestion(question)
    setAnswerReview(null)
    setDifficultyMessage(null)
  }, [])

  const clearSession = useCallback(() => {
    try {
      localStorage.removeItem(sessionKey(topicId))
    } catch {}
  }, [topicId])

  const pickNextQuestion = useCallback((options = {}) => {
    const explicitExcludeIds = uniqueIds(options.excludeIds || [])
    let sessionSeenIds = uniqueIds([
      ...seenIds,
      ...explicitExcludeIds,
    ])

    const sessionPool = questionPool.filter((question) => question.topicId === topicId)
    const activePool = sessionPool.length ? sessionPool : questionPool
    const allAvailableSeen = activePool.length > 0 && activePool.every((question) => sessionSeenIds.includes(question.id))

    if (allAvailableSeen) {
      console.warn(`[AdaptivePractice] All ${activePool.length} questions for ${topicId} have been seen in this session; resetting session question history.`)
      sessionSeenIds = []
      setSeenIds([])
    }

    const nextQuestion = selectQuestion(questionPool, {
      excludeIds: getRecentExcludeIds(explicitExcludeIds),
      sessionSeenIds,
      learnerState: options.learnerState,
      topicId,
      lastQuestion: options.lastQuestion || null,
    })

    if (!nextQuestion) {
      setShowDone(true)
      setCurrentQuestion(null)
      setAnswerReview(null)
      return null
    }

    setShowDone(false)
    presentQuestion(nextQuestion)
    return nextQuestion
  }, [getRecentExcludeIds, presentQuestion, questionPool, selectQuestion, topicId])

  useEffect(() => {
    setRestoreChecked(false)
    setSessionRestorePrompt(null)
    setSessionCount(0)
    setSessionCorrect(0)
    setSeenIds([])
    setCurrentQuestion(null)
    setAnswerReview(null)
    setShowDone(false)
    try {
      const raw = localStorage.getItem(sessionKey(topicId))
      if (raw) {
        const saved = JSON.parse(raw)
        const age = Date.now() - (saved.savedAt || 0)
        if (age < 24 * 60 * 60 * 1000 && (saved.sessionCount || 0) > 0) {
          setSessionRestorePrompt({
            sessionCount: saved.sessionCount || 0,
            sessionCorrect: saved.sessionCorrect || 0,
            seenIds: saved.seenIds || [],
          })
        }
      }
    } catch {}
    setRestoreChecked(true)
  }, [topicId])

  useEffect(() => {
    let cancelled = false

    async function loadPool() {
      if (!repositoryTopic) {
        if (!cancelled) {
          setQuestionPool([])
          setPoolLoading(false)
        }
        return
      }

      setPoolLoading(true)
      setPoolError('')
      try {
        const questions = await getQuestions({ examBoard: boardId, topic: repositoryTopic })
        const filtered = questions.filter((question) => question.topicId === topicId)
        if (!cancelled) {
          setQuestionPool(filtered)
        }
      } catch (error) {
        if (!cancelled) {
          setQuestionPool([])
          setPoolError(error instanceof Error ? error.message : 'Unable to load practice questions right now.')
        }
      } finally {
        if (!cancelled) setPoolLoading(false)
      }
    }

    setCurrentQuestion(null)
    setAnswerReview(null)
    setShowDone(false)
    loadPool()

    return () => {
      cancelled = true
    }
  }, [boardId, repositoryTopic, topicId])

  useEffect(() => {
    if (sessionCount <= 0) return
    try {
      localStorage.setItem(sessionKey(topicId), JSON.stringify({
        sessionCount,
        sessionCorrect,
        seenIds,
        savedAt: Date.now(),
      }))
    } catch {}
  }, [seenIds, sessionCorrect, sessionCount, topicId])

  useEffect(() => {
    if (!restoreChecked || poolLoading || sessionRestorePrompt || showDone) return
    if (currentQuestion || !questionPool.length) return
    pickNextQuestion({ excludeIds: seenIds })
  }, [currentQuestion, pickNextQuestion, poolLoading, questionPool.length, restoreChecked, seenIds, sessionRestorePrompt, showDone])

  const handleOptionSubmit = useCallback((selectedIndex) => {
    if (!currentQuestion || answerReview) return

    const review = checkAnswer(currentQuestion, selectedIndex)
    const nextSeenIds = currentQuestion.id && !seenIds.includes(currentQuestion.id)
      ? [...seenIds, currentQuestion.id]
      : seenIds

    setAnswerReview(review)
    setSeenIds(nextSeenIds)
    setSessionCount((count) => count + 1)
    if (review.isCorrect) {
      setSessionCorrect((count) => count + 1)
    }
  }, [answerReview, currentQuestion, seenIds])

  const handleNext = useCallback(() => {
    if (!currentQuestion || !answerReview) return
    if (reviewMode && sessionCount >= reviewCap) {
      setShowDone(true)
      return
    }

    const result = recordAnswer(currentQuestion, answerReview.isCorrect)
    const { difficultyChanged, ...nextState } = result
    if (difficultyChanged === 'up') {
      setDifficultyMessage(`Nice work. Moving up to ${nextState.currentDifficulty}.`)
    } else if (difficultyChanged === 'down') {
      setDifficultyMessage(`Let's strengthen this. Moving to ${nextState.currentDifficulty}.`)
    }
    pickNextQuestion({
      excludeIds: getRecentExcludeIds([currentQuestion.id]),
      learnerState: nextState,
      lastQuestion: currentQuestion,
    })
  }, [answerReview, currentQuestion, getRecentExcludeIds, pickNextQuestion, recordAnswer, reviewCap, reviewMode, sessionCount])

  const handleRestoreContinue = useCallback(() => {
    if (!sessionRestorePrompt) return
    setSeenIds(sessionRestorePrompt.seenIds)
    setSessionCount(sessionRestorePrompt.sessionCount)
    setSessionCorrect(sessionRestorePrompt.sessionCorrect)
    setSessionRestorePrompt(null)
    setCurrentQuestion(null)
    setAnswerReview(null)
  }, [sessionRestorePrompt])

  const handleRestoreFresh = useCallback(() => {
    clearSession()
    setSeenIds([])
    setSessionCount(0)
    setSessionCorrect(0)
    setSessionRestorePrompt(null)
    setShowDone(false)
    setCurrentQuestion(null)
    setAnswerReview(null)
  }, [clearSession])

  const handleSaveAndExit = useCallback(() => {
    try {
      localStorage.setItem(sessionKey(topicId), JSON.stringify({
        sessionCount,
        sessionCorrect,
        seenIds,
        savedAt: Date.now(),
      }))
    } catch {}
    setSavedConfirm(true)
    setTimeout(() => safeExit(), 120)
  }, [safeExit, seenIds, sessionCorrect, sessionCount, topicId])

  const handleRestart = useCallback(() => {
    clearSession()
    const resetState = resetTopicState()
    setSessionCount(0)
    setSessionCorrect(0)
    setSeenIds([])
    setShowDone(false)
    setSavedConfirm(false)
    pickNextQuestion({ excludeIds: [], learnerState: resetState, lastQuestion: null })
  }, [clearSession, pickNextQuestion, resetTopicState])


  if (!topic) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 px-6 text-center" style={{ background: '#080f1e' }}>
        <div style={{ color: '#a8b8cc', fontSize: 15 }}>Topic not found</div>
        <button
          onClick={() => navigate('/learn')}
          className="w-11 h-11 flex items-center justify-center rounded-[12px]"
          style={{ background: 'rgba(255,255,255,0.07)', border: '0.75px solid rgba(255,255,255,0.1)' }}
        >
          <ArrowLeft size={18} color="#a8b8cc" />
        </button>
      </div>
    )
  }

  if (showDone || sessionCount >= reviewCap) {
    const pct = sessionCount > 0 ? Math.round((sessionCorrect / sessionCount) * 100) : 0
    const isReviewComplete = reviewMode && sessionCount >= reviewCap
    return (
      <div className="flex flex-col h-full overflow-hidden" style={{ background: '#080f1e' }}>
        <div className="px-5 pt-5">
          <button
            onClick={() => {
              clearSession()
              safeExit()
            }}
            className="w-11 h-11 rounded-[12px] flex items-center justify-center"
            style={{ background: 'rgba(255,255,255,0.07)', border: '0.75px solid rgba(255,255,255,0.1)' }}
          >
            <ArrowLeft size={18} color="#a8b8cc" />
          </button>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center px-6 gap-5">
          {isReviewComplete ? (
            <div
              className="flex items-center gap-2 px-4 py-2 rounded-full"
              style={{ background: 'rgba(0,188,125,0.12)', border: '1px solid rgba(0,188,125,0.3)' }}
            >
              <Check size={14} color="#00bc7d" />
              <span className="text-sm font-bold" style={{ color: '#00bc7d' }}>Review complete</span>
            </div>
          ) : null}
          <div className="text-5xl">{pct >= 80 ? '🏆' : pct >= 60 ? '⭐' : '📚'}</div>
          <div className="text-center">
            <div className="text-3xl font-black" style={{ color: '#f8fafc' }}>{sessionCorrect}/{sessionCount}</div>
            <div className="text-lg font-semibold mt-1" style={{ color: moduleColor }}>{pct}% accuracy</div>
            <div className="text-sm mt-2" style={{ color: '#8899b0' }}>{topic.title}</div>
          </div>
          <div className="flex gap-3 w-full">
            <motion.button
              className="flex-1 py-3.5 rounded-[14px] text-sm font-bold flex items-center justify-center gap-2"
              style={{ background: 'rgba(255,255,255,0.06)', border: '0.75px solid rgba(255,255,255,0.1)', color: '#a8b8cc' }}
              onClick={handleRestart}
              whileTap={{ scale: 0.96 }}
            >
              <ArrowCounterClockwise size={14} /> Restart
            </motion.button>
            <motion.button
              className="flex-1 py-3.5 rounded-[14px] text-sm font-bold"
              style={{ background: '#6366f1', color: '#fff' }}
              onClick={() => {
                clearSession()
                safeExit()
              }}
              whileTap={{ scale: 0.96 }}
            >
              Done
            </motion.button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full overflow-hidden relative" style={{ background: '#080f1e' }}>
      <PageHeader
        onBack={safeExit}
        title={<div className="text-sm font-bold truncate" style={{ color: '#f8fafc' }}>{topic.title}</div>}
        subtitle={<span style={{ fontSize: 11, color: '#8899b0', fontStyle: 'italic' }}>{getProgressLabel(sessionCount, reviewCap)}</span>}
      />

      <div className="px-5 pt-3 pb-1 shrink-0 flex items-center justify-between">
        <span className="text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>
          {learnerState.totalAnswered > 0
            ? `${Math.round((learnerState.totalCorrect / learnerState.totalAnswered) * 100)}% accuracy`
            : ''}
        </span>
        {streak > 0 && !answerReview && (
          <span className="text-xs font-semibold" style={{ color: '#00bc7d' }}>
            {streak} in a row
          </span>
        )}
      </div>

      <AnimatePresence>
        {difficultyMessage && (
          <motion.div
            className="mx-5 mb-1 px-3 py-2 rounded-[10px] text-xs font-semibold text-center shrink-0"
            style={{ background: 'rgba(99,102,241,0.1)', border: '0.75px solid rgba(99,102,241,0.25)', color: '#818cf8' }}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
          >
            {difficultyMessage}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-1 overflow-y-auto px-5 pt-4 pb-2" style={{ minHeight: 0 }}>
        {poolLoading ? (
          <div className="flex flex-col items-center justify-center h-full gap-3 pt-12">
            <CircleNotch size={24} color={moduleColor} className="animate-spin" />
            <p className="text-sm" style={{ color: '#a8b8cc' }}>Loading practice questions…</p>
          </div>
        ) : poolError ? (
          <div className="flex flex-col items-center justify-center h-full gap-4 pt-12 text-center">
            <div className="text-base font-bold" style={{ color: '#f8fafc' }}>Couldn’t load practice right now</div>
            <div className="text-sm max-w-xs" style={{ color: '#8899b0' }}>{poolError}</div>
            <motion.button
              className="px-6 py-3 rounded-[14px] text-sm font-bold"
              style={{ background: '#6366f1', color: '#fff' }}
              onClick={() => window.location.reload()}
              whileTap={{ scale: 0.97 }}
            >
              Try again
            </motion.button>
          </div>
        ) : currentQuestion ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.18 }}
            >
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <span
                  className="px-2.5 py-1 rounded-full text-xs font-bold"
                  style={{ background: 'rgba(99,102,241,0.1)', border: '0.75px solid rgba(99,102,241,0.25)', color: '#818cf8' }}
                >
                  {currentQuestion.subtopic}
                </span>
                <span
                  className="px-2.5 py-1 rounded-full text-xs font-semibold"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '0.75px solid rgba(255,255,255,0.08)', color: '#a8b8cc' }}
                >
                  {currentQuestion.difficulty}
                </span>
                {currentQuestion.skill ? (
                  <span className="text-xs" style={{ color: '#8899b0' }}>{currentQuestion.skill}</span>
                ) : null}
              </div>

              <p className="text-base font-semibold leading-snug mb-4" style={{ color: '#f8fafc' }}>
                {currentQuestion.question}
              </p>

              <MCQQuestion question={currentQuestion} review={answerReview} onSubmit={handleOptionSubmit} />

              {answerReview && (
                <motion.div className="mt-4 space-y-3" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                  <div
                    className="px-3 py-2.5 rounded-[12px]"
                    style={{
                      background: answerReview.isCorrect ? 'rgba(0,188,125,0.08)' : 'rgba(253,199,0,0.08)',
                      border: `0.75px solid ${answerReview.isCorrect ? 'rgba(0,188,125,0.25)' : 'rgba(253,199,0,0.25)'}`,
                    }}
                  >
                    <div className="text-xs font-semibold mb-1" style={{ color: answerReview.isCorrect ? '#00bc7d' : '#fdc700' }}>
                      {answerReview.isCorrect ? 'Nice work' : `Correct answer: ${answerReview.correctAnswer}`}
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color: '#cad5e2' }}>
                      {answerReview.explanation}
                    </p>
                  </div>

                  {!answerReview.isCorrect && (
                    <motion.button
                      className="w-full flex items-center justify-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold"
                      style={{
                        background: 'rgba(99,102,241,0.15)',
                        border: '0.75px solid rgba(99,102,241,0.35)',
                        color: '#818cf8',
                      }}
                      onClick={() => navigate('/mamo', {
                        state: {
                          questionContext: currentQuestion.question || '',
                          topicContext: topic.title || '',
                        },
                      })}
                      whileTap={{ scale: 0.97 }}
                    >
                      Ask Mamo
                    </motion.button>
                  )}

                  <motion.button
                    className="w-full py-4 rounded-[16px] text-base font-bold flex items-center justify-center gap-2"
                    style={{ background: moduleColor, color: '#fff' }}
                    onClick={handleNext}
                    whileTap={{ scale: 0.97 }}
                  >
                    Next question <CaretRight size={18} />
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        ) : (
          <div className="flex flex-col items-center justify-center h-full gap-4 pt-16 text-center">
            <div className="text-sm font-bold uppercase tracking-[0.18em]" style={{ color: '#818cf8' }}>Practice</div>
            <div>
              <div className="text-base font-bold" style={{ color: '#f8fafc' }}>No questions yet</div>
              <div className="text-sm mt-1" style={{ color: '#8899b0' }}>
                Questions for this topic are coming soon.
              </div>
            </div>
            <motion.button
              className="px-6 py-3 rounded-[14px] text-sm font-bold"
              style={{ background: '#6366f1', color: '#fff' }}
              onClick={safeExit}
              whileTap={{ scale: 0.97 }}
            >
              Go back
            </motion.button>
          </div>
        )}
      </div>

      <div className="shrink-0 px-5 pt-2 pb-6" style={{ borderTop: '0.75px solid rgba(255,255,255,0.05)' }}>
        <div className="mb-3 text-[11px]" style={{ color: 'rgba(255,255,255,0.35)' }}>
          {answerReview?.isCorrect === false ? `We'll stay close to ${currentQuestion?.subtopic || topic.title} next.` : `We'll keep building on ${topic.title}.`}
        </div>
        <motion.button
          type="button"
          className="w-full py-3.5 rounded-[16px] flex items-center justify-center gap-2"
          style={{
            background: savedConfirm ? 'rgba(0,188,125,0.1)' : 'rgba(255,255,255,0.03)',
            border: savedConfirm ? '1px solid rgba(0,188,125,0.3)' : '1px solid rgba(255,255,255,0.07)',
          }}
          onClick={handleSaveAndExit}
          whileTap={{ scale: 0.97 }}
          disabled={savedConfirm}
        >
          <AnimatePresence mode="wait">
            {savedConfirm ? (
              <motion.div key="saved" className="flex items-center gap-2" initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}>
                <Check size={15} color="#00bc7d" />
                <span className="text-sm font-semibold" style={{ color: '#00bc7d' }}>Progress saved</span>
              </motion.div>
            ) : (
              <motion.div key="save" className="flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <BookmarkSimple size={15} color="rgba(255,255,255,0.35)" />
                <span className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.35)' }}>
                  Save &amp; come back later
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      <AnimatePresence>
        {sessionRestorePrompt && (
          <>
            <motion.div
              className="absolute inset-0"
              style={{ background: 'rgba(8,15,30,0.75)', backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)', zIndex: 40 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              className="absolute bottom-0 left-0 right-0 px-5 pt-6 rounded-t-[20px]"
              style={{ background: 'rgba(15,22,41,0.98)', border: '0.75px solid rgba(255,255,255,0.1)', zIndex: 50, paddingBottom: 'calc(20px + var(--safe-bottom))' }}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 300 }}
            >
              <div className="w-10 h-1 rounded-full mx-auto mb-5" style={{ background: 'rgba(255,255,255,0.15)' }} />
              <div className="text-base font-bold mb-1" style={{ color: '#f8fafc' }}>
                Continue where you left off?
              </div>
              <div className="text-sm mb-5" style={{ color: '#8899b0' }}>
                You answered {sessionRestorePrompt.sessionCount} question{sessionRestorePrompt.sessionCount !== 1 ? 's' : ''} in this session ({sessionRestorePrompt.sessionCorrect} correct).
              </div>
              <div className="flex flex-col gap-3">
                <motion.button
                  className="w-full py-4 rounded-[16px] text-base font-bold"
                  style={{ background: moduleColor, color: '#fff' }}
                  onClick={handleRestoreContinue}
                  whileTap={{ scale: 0.97 }}
                >
                  Continue session
                </motion.button>
                <motion.button
                  className="w-full py-3.5 rounded-[16px] text-sm font-semibold"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '0.75px solid rgba(255,255,255,0.1)', color: '#8899b0' }}
                  onClick={handleRestoreFresh}
                  whileTap={{ scale: 0.97 }}
                >
                  Start fresh
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
