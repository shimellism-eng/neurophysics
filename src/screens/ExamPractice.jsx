/**
 * ExamPractice — exam-style questions screen.
 * Separate from the diagnostic quiz. Pulls from exam data files.
 * Reuses existing interactive component pattern + new components.
 */
import { motion, AnimatePresence } from 'motion/react'
import { useNavigate, useParams } from 'react-router-dom'
import { useState, useMemo, useCallback } from 'react'
import { ArrowLeft, GraduationCap, ChevronRight, Award, Volume2 } from 'lucide-react'
import { useSessionTimer } from '../hooks/useSessionTimer'
import BreakNudge from '../components/BreakNudge'
import { TOPICS } from '../data/topics'
import { getExamQuestions } from '../data/examIndex'
import { saveQuizResult } from '../hooks/useInsights'
import {
  TapMatchQuestion,
  HotspotQuestion,
  SequenceSortQuestion,
  MisconceptionQuestion,
  ConfidenceQuestion,
  CalculationQuestion,
  FillStepsQuestion,
  GraphQuestion,
  ExtendedAnswerQuestion,
} from '../components/questions'

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const TYPE_LABELS = {
  'calculation': '🧮 Calculation',
  'sequence': '🔢 Put in order',
  'fill-steps': '📝 Complete the explanation',
  'graph-read': '📈 Read the graph',
  'tap-match': '🔗 Match',
  'hotspot': '📍 Tap the right area',
  'misconception': '🤔 True or false?',
  'confidence': '💭 How confident are you?',
  'equation-recall': '📐 Recall the equation',
  'extended-answer': '✍️ 6-mark question',
}

export default function ExamPractice() {
  const { id } = useParams()
  const navigate = useNavigate()
  const topic = TOPICS[id]

  const questions = useMemo(() => {
    const raw = getExamQuestions(id)
    return shuffle(raw)
  }, [id])

  const total = questions.length

  const [qIndex, setQIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [completed, setCompleted] = useState(false)
  const [showResults, setShowResults] = useState(false)

  // MCQ state (for equation-recall type)
  const [selected, setSelected] = useState(null)
  const [mcqSubmitted, setMcqSubmitted] = useState(false)

  // F10/F12: session timer for ADHD pacing
  const { showNudge, nudgeLevel, dismissBreak } = useSessionTimer(true)

  if (!topic || total === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full px-6" style={{ background: '#0b1121', color: '#a8b8cc' }}>
        <GraduationCap size={48} strokeWidth={1.2} style={{ marginBottom: 16, opacity: 0.4 }} />
        <p className="text-center text-sm">No exam practice questions available for this topic yet.</p>
        <button
          className="mt-4 px-6 py-3 rounded-[14px] text-sm font-semibold"
          style={{ background: 'rgba(18,26,47,0.9)', border: '1px solid #2d3e55', color: '#a8b8cc' }}
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    )
  }

  const q = questions[qIndex] || {}
  const qType = q.type || 'mcq'
  const isLast = qIndex === total - 1

  const handleInteractiveComplete = useCallback((correct) => {
    if (correct) setScore(s => s + 1)
    setCompleted(true)
  }, [])

  // MCQ handler for equation-recall
  const handleMcqSelect = (idx) => { if (!mcqSubmitted) setSelected(idx) }
  const handleMcqSubmit = () => {
    if (selected === null || mcqSubmitted) return
    setMcqSubmitted(true)
    if (selected === q.correctAnswer) setScore(s => s + 1)
    setCompleted(true)
  }

  const handleNext = () => {
    if (isLast) {
      // Save result and show results screen
      saveQuizResult(id, score, total)
      try { window.dispatchEvent(new Event('storage')) } catch (e) {}
      setShowResults(true)
    } else {
      setQIndex(i => i + 1)
      setCompleted(false)
      setSelected(null)
      setMcqSubmitted(false)
    }
  }

  const optionLabels = ['A', 'B', 'C', 'D']

  const renderQuestion = () => {
    const props = { data: q, moduleColor: topic.moduleColor, onComplete: handleInteractiveComplete }

    switch (qType) {
      case 'calculation':    return <CalculationQuestion {...props} />
      case 'fill-steps':     return <FillStepsQuestion {...props} />
      case 'graph-read':     return <GraphQuestion {...props} />
      case 'tap-match':      return <TapMatchQuestion {...props} />
      case 'hotspot':        return <HotspotQuestion {...props} />
      case 'sequence':       return <SequenceSortQuestion {...props} />
      case 'misconception':  return <MisconceptionQuestion {...props} />
      case 'confidence':     return <ConfidenceQuestion {...props} />
      case 'extended-answer': return <ExtendedAnswerQuestion {...props} />
      case 'equation-recall':
        // Render as MCQ
        return (
          <div className="space-y-2">
            {(q.options || []).map((opt, idx) => {
              const getStyle = () => {
                if (!mcqSubmitted) {
                  return selected === idx
                    ? { background: `${topic.moduleColor}20`, border: `1.5px solid ${topic.moduleColor}`, color: '#f8fafc' }
                    : { background: 'rgba(18,26,47,0.9)', border: '0.75px solid #1d293d', color: '#cad5e2' }
                }
                if (idx === q.correctAnswer) return { background: 'rgba(0,188,125,0.15)', border: '1.5px solid #00bc7d', color: '#f8fafc' }
                if (idx === selected) return { background: 'rgba(239,68,68,0.15)', border: '1.5px solid #ef4444', color: '#f8fafc' }
                return { background: 'rgba(18,26,47,0.5)', border: '0.75px solid #1d293d', color: '#a8b8cc' }
              }
              return (
                <motion.button
                  key={idx}
                  className="w-full text-left rounded-[16px] p-4 flex items-center gap-3"
                  style={getStyle()}
                  onClick={() => handleMcqSelect(idx)}
                  whileTap={mcqSubmitted ? {} : { scale: 0.98 }}
                >
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                    style={{
                      background: selected === idx && !mcqSubmitted ? topic.moduleColor
                        : mcqSubmitted && idx === q.correctAnswer ? '#00bc7d'
                        : mcqSubmitted && idx === selected ? '#ef4444'
                        : '#1d293d',
                      color: '#fff',
                    }}>
                    {optionLabels[idx]}
                  </div>
                  <span className="text-sm font-medium flex-1">{opt}</span>
                </motion.button>
              )
            })}
            {mcqSubmitted && q.senNote && (
              <motion.div className="mt-3 px-4 py-3 rounded-[12px] flex items-start gap-2"
                style={{ background: 'rgba(253,199,0,0.07)', border: '0.75px solid rgba(253,199,0,0.25)' }}
                initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
                <span className="text-xs leading-relaxed" style={{ color: '#fdc700' }}>{q.senNote}</span>
              </motion.div>
            )}
            {/* Memory tip card */}
            <motion.div
              className="mt-4 px-4 py-3 rounded-[14px] flex items-start gap-3"
              style={{ background: 'rgba(99,102,241,0.07)', border: '0.75px solid rgba(99,102,241,0.22)' }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span style={{ fontSize: 16 }}>📐</span>
              <div>
                <div className="text-xs font-semibold mb-0.5" style={{ color: '#818cf8' }}>
                  {q.onSheet ? 'On the equation sheet' : 'Must be memorised'}
                </div>
                <div className="text-xs leading-relaxed" style={{ color: '#a8b8cc' }}>
                  {q.onSheet
                    ? 'This equation is given to you in the exam. Focus on knowing when and how to use it.'
                    : 'This equation is NOT provided in the exam. Write it out a few times to commit it to memory.'}
                </div>
              </div>
            </motion.div>
          </div>
        )
      default: return null
    }
  }

  // Results screen
  if (showResults) {
    const pct = Math.round((score / total) * 100)
    const passed = pct >= 60
    return (
      <div className="flex flex-col h-full overflow-hidden" style={{ background: '#0b1121' }}>
        <div className="px-5 pt-5 pb-3 shrink-0">
          <button
            onClick={() => navigate(`/lesson/${id}`)}
            className="w-11 h-11 rounded-[12px] flex items-center justify-center"
            style={{ background: 'rgba(18,26,47,0.9)', border: '0.75px solid #1d293d' }}
          >
            <ArrowLeft size={18} color="#a8b8cc" />
          </button>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center px-6">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.2 }}>
            <Award size={64} color={passed ? '#00bc7d' : topic.moduleColor} strokeWidth={1.2} />
          </motion.div>
          <motion.h1 className="text-2xl font-bold mt-4" style={{ color: '#f8fafc' }}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            Exam Practice Complete
          </motion.h1>
          <motion.div className="mt-3 px-6 py-3 rounded-[16px]"
            style={{ background: passed ? 'rgba(0,188,125,0.12)' : 'rgba(239,68,68,0.12)', border: passed ? '1px solid rgba(0,188,125,0.3)' : '1px solid rgba(239,68,68,0.3)' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            <span className="text-lg font-bold" style={{ color: passed ? '#00bc7d' : '#ef4444' }}>
              {score} / {total} ({pct}%)
            </span>
          </motion.div>
          <motion.p className="text-sm mt-4 text-center" style={{ color: '#a8b8cc' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            {pct >= 80 ? 'Excellent exam technique!' : pct >= 60 ? 'Good effort — keep practising the tricky ones.' : 'Keep going — review the worked solutions to improve.'}
          </motion.p>
          <motion.div className="flex gap-3 mt-6" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
            <button
              className="px-5 py-3 rounded-[14px] text-sm font-semibold"
              style={{ background: 'rgba(18,26,47,0.9)', border: '1px solid #2d3e55', color: '#a8b8cc' }}
              onClick={() => navigate(`/lesson/${id}`)}
            >
              Back to Lesson
            </button>
            <button
              className="px-5 py-3 rounded-[14px] text-sm font-semibold"
              style={{ background: `linear-gradient(135deg, ${topic.moduleColor}, ${topic.moduleColor}cc)`, color: '#fff', boxShadow: `0 6px 20px ${topic.moduleColor}40` }}
              onClick={() => navigate(`/topics`)}
            >
              All Topics
            </button>
          </motion.div>
        </div>
      </div>
    )
  }

  // Whether to show the check/next button
  const showFooter = qType === 'equation-recall'
    ? (selected !== null)
    : completed

  return (
    <div className="flex flex-col h-full overflow-hidden" style={{ background: '#0b1121' }}>
      {/* F10/F12: Break nudge */}
      {showNudge && <BreakNudge nudgeLevel={nudgeLevel} onDismiss={dismissBreak} />}

      {/* Header */}
      <div className="px-5 pt-5 pb-3 shrink-0 flex items-center gap-3">
        <button
          onClick={() => navigate(`/lesson/${id}`)}
          className="w-11 h-11 rounded-[12px] flex items-center justify-center"
          style={{ background: 'rgba(18,26,47,0.9)', border: '0.75px solid #1d293d' }}
        >
          <ArrowLeft size={18} color="#a8b8cc" />
        </button>
        <div className="flex-1 min-w-0">
          <div className="text-xs font-medium" style={{ color: topic.moduleColor }}>Exam Practice</div>
          <h1 className="text-base font-bold leading-tight truncate" style={{ color: '#f8fafc' }}>{topic.title}</h1>
        </div>
        <div className="px-3 py-1 rounded-full text-xs font-semibold"
          style={{ background: 'rgba(99,102,241,0.12)', color: '#818cf8', border: '1px solid rgba(99,102,241,0.3)' }}>
          <GraduationCap size={12} className="inline mr-1" style={{ verticalAlign: -1 }} />
          Exam
        </div>
      </div>

      {/* Progress */}
      <div className="px-5 pb-3 shrink-0">
        <div className="flex items-center gap-2">
          <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: '#818cf8' }}
              animate={{ width: `${((qIndex + (completed ? 1 : 0)) / total) * 100}%` }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
          </div>
          <span className="text-xs font-semibold shrink-0" style={{ color: '#a8b8cc' }}>
            {qIndex + 1} / {total}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto px-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={qIndex}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
          >
            {/* Type badge */}
            {TYPE_LABELS[qType] && (
              <div className="mb-2">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full"
                  style={{ background: 'rgba(99,102,241,0.1)', color: '#818cf8', border: '1px solid rgba(99,102,241,0.25)' }}>
                  {TYPE_LABELS[qType]}
                </span>
              </div>
            )}

            {/* Question — F7: text-base + leading-relaxed for readability */}
            <div className="mb-4">
              <div className="flex items-start gap-2">
                <h2 className="flex-1 text-base font-semibold leading-relaxed" style={{ color: '#f8fafc' }}>
                  {q.question}
                </h2>
                {/* F6: TTS speak button */}
                {(() => { try { return !!JSON.parse(localStorage.getItem('neurophysics_prefs') || '{}').tts } catch { return false } })() && (
                  <button
                    className="w-9 h-9 rounded-[10px] flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: 'rgba(99,102,241,0.10)', border: '0.75px solid rgba(99,102,241,0.25)' }}
                    onClick={() => {
                      if (!('speechSynthesis' in window)) return
                      window.speechSynthesis.cancel()
                      const utt = new SpeechSynthesisUtterance(q.question + (q.questionSubtitle ? '. ' + q.questionSubtitle : ''))
                      utt.rate = 0.9
                      window.speechSynthesis.speak(utt)
                    }}
                    aria-label="Read question aloud"
                  >
                    <Volume2 size={14} color="#818cf8" />
                  </button>
                )}
              </div>
              {q.questionSubtitle && (
                <p className="text-xs mt-1 leading-relaxed" style={{ color: '#a8b8cc' }}>{q.questionSubtitle}</p>
              )}
            </div>

            {/* Question content */}
            {renderQuestion()}
          </motion.div>
        </AnimatePresence>
        <div style={{ height: 24 }} />
      </div>

      {/* Footer */}
      <AnimatePresence>
        {showFooter && (
          <motion.div
            className="shrink-0 px-5 pb-8 pt-3"
            style={{ background: '#0b1121', borderTop: '0.75px solid #1d293d' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            {/* Equation-recall: check first, then next */}
            {qType === 'equation-recall' && !mcqSubmitted ? (
              <motion.button
                className="w-full py-4 rounded-[16px] font-semibold text-base"
                style={{
                  background: 'linear-gradient(135deg, #6366f1, #818cf8)',
                  boxShadow: '0px 8px 24px rgba(99,102,241,0.4)',
                  color: '#fff',
                }}
                onClick={handleMcqSubmit}
                whileTap={{ scale: 0.97 }}
              >
                Check Answer
              </motion.button>
            ) : (
              completed && (
                <motion.button
                  className="w-full py-4 rounded-[16px] font-semibold text-base flex items-center justify-center gap-2"
                  style={{
                    background: isLast
                      ? 'linear-gradient(135deg, #6366f1, #818cf8)'
                      : `linear-gradient(135deg, ${topic.moduleColor}, ${topic.moduleColor}cc)`,
                    boxShadow: isLast
                      ? '0px 8px 24px rgba(99,102,241,0.4)'
                      : `0px 8px 24px ${topic.moduleColor}40`,
                    color: '#fff',
                  }}
                  onClick={handleNext}
                  whileTap={{ scale: 0.97 }}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  {isLast ? 'See Results' : 'Next →'}
                </motion.button>
              )
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
