/**
 * QuickWinScreen — 5-question cross-topic MCQ session.
 * First runtime integration for the exported question bank JSON.
 */
import { useEffect, useState } from 'react'
import { useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { CheckCircle, XCircle, CaretRight, Lightning, BookOpen, ChatCircleDots } from '@phosphor-icons/react'
import { useSRS } from '../hooks/useSRS'
import { TOPICS, MODULES } from '../data/topics'
import { trackMisconception } from '../utils/misconceptions'
import { getValidatedBoard } from '../utils/boardConfig'
import { checkAnswer, getRandomQuiz } from '../lib/questionRepository'
import { navigateToTopicStudy } from '../features/lesson/routing'
import SafeAreaPage from '../components/ui/SafeAreaPage'
import PageHeader from '../components/PageHeader'

const QUICK_WIN_COUNT = 5

// Topic label for a question — falls back to topicId if not in TOPICS
function topicLabel(q) {
  return TOPICS[q.topicId]?.title || q.topic
}

const _colorCache = {}
function topicColor(topicId) {
  if (_colorCache[topicId]) return _colorCache[topicId]
  const mod = MODULES.find(m => m.topics.includes(topicId))
  const color = mod?.color || '#6366f1'
  _colorCache[topicId] = color
  return color
}

// ── Result screen ─────────────────────────────────────────────────────────────

function ResultScreen({ questions, answers, onDone }) {
  const correct = answers.filter((a, i) => a === questions[i].correctIndex).length
  const topicsHit = [...new Set(questions.map(q => topicLabel(q)))]
  const pct = Math.round((correct / questions.length) * 100)

  const emoji = correct === questions.length ? '🎉' : correct >= 3 ? '⚡' : '📚'
  const headline =
    correct === questions.length ? 'Perfect score!' :
    correct >= 4 ? 'Almost there!' :
    correct >= 3 ? 'Good effort!' : 'Keep practising!'

  return (
    <motion.div
      className="flex flex-col items-center px-6 pt-8 pb-10"
      initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Score ring */}
      <div
        className="flex flex-col items-center justify-center rounded-full mb-5"
        style={{
          width: 120, height: 120,
          background: `conic-gradient(#6366f1 ${pct * 3.6}deg, rgba(255,255,255,0.07) 0deg)`,
          boxShadow: '0 0 0 4px rgba(99,102,241,0.12)',
        }}
      >
        <div className="flex flex-col items-center justify-center rounded-full"
          style={{ width: 100, height: 100, background: '#0d1629' }}>
          <div style={{ fontSize: 30 }}>{emoji}</div>
          <div className="font-bold" style={{ fontSize: 22, color: '#f8fafc', letterSpacing: '-0.02em' }}>
            {correct}/{questions.length}
          </div>
        </div>
      </div>

      <h2 className="font-bold mb-1" style={{ fontSize: 22, color: '#f8fafc', letterSpacing: '-0.02em' }}>
        {headline}
      </h2>

      <p className="text-center mb-6" style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.55 }}>
        Topics: {topicsHit.join(', ')}
      </p>

      {/* Per-question breakdown */}
      <div className="w-full rounded-[18px] overflow-hidden mb-6"
        style={{ background: 'rgba(255,255,255,0.04)', border: '0.75px solid rgba(255,255,255,0.07)' }}>
        {questions.map((q, i) => {
          const wasCorrect = answers[i] === q.correctIndex
          return (
            <div key={q.id}
              className="flex items-start gap-3 px-4 py-3"
              style={{ borderTop: i === 0 ? 'none' : '0.75px solid rgba(255,255,255,0.06)' }}>
              {wasCorrect
                ? <CheckCircle size={18} color="#4ade80" style={{ flexShrink: 0, marginTop: 2 }} />
                : <XCircle     size={18} color="#f87171" style={{ flexShrink: 0, marginTop: 2 }} />}
              <div className="flex-1 min-w-0">
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 2 }}>{topicLabel(q)}</div>
                <div className="line-clamp-2" style={{ fontSize: 13, color: wasCorrect ? '#f8fafc' : 'rgba(255,255,255,0.6)' }}>
                  {q.question}
                </div>
                {!wasCorrect && (
                  <div style={{ fontSize: 12, color: '#4ade80', marginTop: 3 }}>
                    ✓ {q.options[q.correctIndex]}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <motion.button
        className="w-full font-bold"
        style={{
          height: 56, borderRadius: 16,
          background: '#6366f1',
          color: '#080f1e', fontSize: 16, border: 'none', cursor: 'pointer',
        }}
        whileTap={{ y: 3 }}
        onClick={onDone}
      >
        Done
      </motion.button>
    </motion.div>
  )
}

// ── Main screen ───────────────────────────────────────────────────────────────

export default function QuickWinScreen() {
  const navigate = useNavigate()
  const location = useLocation()
  const { updateProgress } = useSRS()
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState('')

  const [idx, setIdx]           = useState(0)
  const [selected, setSelected] = useState(null)   // chosen option index
  const [revealed, setRevealed] = useState(false)
  const [answers, setAnswers]   = useState([])      // array of chosen indices
  const [done, setDone]         = useState(false)
  const [sessionStreak, setSessionStreak] = useState(0)

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

    navigate('/practice-tools', { replace: true })
  }, [location.state, navigate])

  useEffect(() => {
    let cancelled = false

    async function loadQuiz() {
      setLoading(true)
      setLoadError('')
      try {
        const quiz = await getRandomQuiz({
          examBoard: getValidatedBoard(),
          count: QUICK_WIN_COUNT,
          maxPerTopic: 2,
        })
        if (!cancelled) setQuestions(quiz)
      } catch (error) {
        if (!cancelled) {
          setLoadError(error instanceof Error ? error.message : 'Could not load questions')
          setQuestions([])
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    loadQuiz()
    return () => { cancelled = true }
  }, [])

  if (loading) {
    return (
      <SafeAreaPage>
        <PageHeader title="Quick win" onBack={safeExit} />
        <div className="flex items-center justify-center h-full" style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14 }}>
          Loading questions...
        </div>
      </SafeAreaPage>
    )
  }

  if (loadError) {
    return (
      <SafeAreaPage>
        <PageHeader title="Quick win" onBack={safeExit} />
        <div className="flex items-center justify-center h-full px-6 text-center" style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>
          {loadError}
        </div>
      </SafeAreaPage>
    )
  }

  if (!questions.length) {
    return (
      <SafeAreaPage>
        <PageHeader title="Quick win" onBack={safeExit} />
        <div className="flex items-center justify-center h-full" style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14 }}>
          No questions available
        </div>
      </SafeAreaPage>
    )
  }

  const q = questions[idx]

  function handleSelect(optIdx) {
    if (revealed) return
    const review = checkAnswer(q, optIdx)
    const correct = review.isCorrect
    setSelected(optIdx)
    setRevealed(true)
    setSessionStreak(s => correct ? s + 1 : 0)
    updateProgress(q.id, correct)
    if (!correct) trackMisconception(q.topicId, q.options[optIdx])
  }

  function handleNext() {
    const nextAnswers = [...answers, selected]
    if (idx + 1 >= questions.length) {
      setAnswers(nextAnswers)
      setDone(true)
    } else {
      setAnswers(nextAnswers)
      setIdx(idx + 1)
      setSelected(null)
      setRevealed(false)
    }
  }

  function goToTopic(topicId) {
    const t = TOPICS[topicId]
    if (!t) return
    navigateToTopicStudy(navigate, t, topicId)
  }

  if (done) {
    return (
      <SafeAreaPage>
        <PageHeader title="Quick win" onBack={safeExit} />
        <div className="overflow-y-auto flex-1" style={{ minHeight: 0 }}>
          <ResultScreen questions={questions} answers={answers} onDone={safeExit} />
        </div>
      </SafeAreaPage>
    )
  }

  const isCorrect = revealed && selected === q.correctIndex

  return (
    <SafeAreaPage>
      <PageHeader title="Quick win" onBack={safeExit} />

      {/* Progress dots */}
      <div className="flex gap-2 px-5 mb-5">
        {questions.map((_, i) => (
          <div key={i} className="flex-1 rounded-full" style={{
            height: 4,
            background: i < idx ? '#6366f1'
              : i === idx ? 'rgba(99,102,241,0.4)'
              : 'rgba(255,255,255,0.08)',
            transition: 'background 0.3s',
          }} />
        ))}
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-6" style={{ minHeight: 0 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Topic pill */}
            <div className="flex items-center gap-1.5 mb-1">
              <span style={{ width: 8, height: 8, borderRadius: 4, background: topicColor(q.topicId), flexShrink: 0 }} />
              <span style={{ fontSize: 12, fontWeight: 600, color: topicColor(q.topicId), textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                {topicLabel(q)}
              </span>
            </div>

            {/* Question */}
            <p className="mb-5" style={{ fontSize: 17, fontWeight: 600, color: '#f8fafc', lineHeight: 1.5, letterSpacing: '-0.01em' }}>
              {q.question}
            </p>

            {/* Options */}
            <div className="space-y-3 mb-6">
              {q.options.map((opt, i) => {
                let bg = 'rgba(255,255,255,0.05)'
                let border = '1px solid rgba(255,255,255,0.1)'
                let color = '#f8fafc'

                if (revealed) {
                  if (i === q.correctIndex) {
                    bg = 'rgba(74,222,128,0.12)'; border = '1px solid #4ade80'; color = '#4ade80'
                  } else if (i === selected && selected !== q.correctIndex) {
                    bg = 'rgba(248,113,113,0.12)'; border = '1px solid #f87171'; color = '#f87171'
                  } else {
                    color = 'rgba(255,255,255,0.3)'
                  }
                } else if (selected === i) {
                  bg = 'rgba(99,102,241,0.12)'; border = '1px solid #6366f1'
                }

                return (
                  <motion.button
                    key={i}
                    className="w-full text-left px-4 py-4 rounded-[14px]"
                    style={{ background: bg, border, color, fontSize: 15, lineHeight: 1.4, cursor: revealed ? 'default' : 'pointer', transition: 'background 0.2s, border 0.2s, color 0.2s' }}
                    whileTap={revealed ? {} : { scale: 0.98 }}
                    onClick={() => handleSelect(i)}
                  >
                    {opt}
                  </motion.button>
                )
              })}
            </div>

            {/* 3-layer diagnostic feedback */}
            <AnimatePresence>
              {revealed && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  aria-live="polite" aria-atomic="true"
                  className="rounded-[14px] px-4 py-4 mb-4 space-y-3"
                  style={{
                    background: isCorrect ? 'rgba(74,222,128,0.08)' : 'rgba(248,113,113,0.08)',
                    border: `0.75px solid ${isCorrect ? 'rgba(74,222,128,0.25)' : 'rgba(248,113,113,0.25)'}`,
                  }}
                >
                  {/* Layer 1 — result + streak */}
                  <div>
                    <div className="font-bold" style={{ fontSize: 13, color: isCorrect ? '#4ade80' : '#f87171' }}>
                      {isCorrect
                        ? sessionStreak >= 3 ? `✓ Correct! 🔥 ${sessionStreak} in a row!` : '✓ Correct! Got it!'
                        : '✗ Not quite'}
                    </div>
                    {!isCorrect && (
                      <div className="mt-1" style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>
                        The answer is: <span style={{ color: '#4ade80', fontWeight: 600 }}>{q.options[q.correctIndex]}</span>
                      </div>
                    )}
                  </div>

                  {/* Layer 2 — why (senNote as explanation) */}
                  {q.senNote && (
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', paddingTop: 8, borderTop: '0.75px solid rgba(255,255,255,0.08)', lineHeight: 1.6 }}>
                      {q.explanation}
                    </div>
                  )}

                  {/* Layer 3 — action buttons */}
                  <div className="flex gap-2 pt-1">
                    <button
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-[10px] font-semibold"
                      style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.55)', border: '0.75px solid rgba(255,255,255,0.1)', fontSize: 12, cursor: 'pointer' }}
                      onClick={() => goToTopic(q.topicId)}
                    >
                      <BookOpen size={13} />
                      Show concept
                    </button>
                    {!isCorrect && (
                      <button
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-[10px] font-semibold"
                        style={{ background: 'rgba(99,102,241,0.08)', color: '#6366f1', border: '0.75px solid rgba(99,102,241,0.2)', fontSize: 12, cursor: 'pointer' }}
                        onClick={() => {
                          const params = new URLSearchParams({
                            topic: q.topicId,
                            label: topicLabel(q),
                            question: q.question,
                            wrong: q.options[selected],
                            correct: q.options[q.correctIndex],
                          })
                          navigate(`/mamo?${params.toString()}`)
                        }}
                      >
                        <ChatCircleDots size={13} />
                        Ask Mamo
                      </button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Next button — only appears after answering */}
      <AnimatePresence>
        {revealed && (
          <motion.div
            className="px-5 pb-6"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
          >
            <motion.button
              className="w-full flex items-center justify-center gap-2 font-bold"
              style={{
                height: 56, borderRadius: 16,
                background: '#6366f1',
                color: '#080f1e', fontSize: 16, border: 'none', cursor: 'pointer',
              }}
              whileTap={{ y: 3 }}
              onClick={handleNext}
            >
              {idx + 1 >= questions.length ? 'See results' : 'Next question'}
              <CaretRight size={20} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </SafeAreaPage>
  )
}
