/**
 * Grade9Challenge - curated Grade 9 discriminator questions.
 * Mixes chained calculations, RPA error-direction, and novel-context questions.
 */
import { motion, AnimatePresence } from 'motion/react'
import { useState, useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Trophy, Star, ChevronRight, RotateCcw } from 'lucide-react'
import { getGrade9Questions } from '../data/examIndex'
import { saveQuizResult } from '../hooks/useInsights'

const MODULE_COLOR = '#a855f7' // purple for Grade 9

// ── Inline question components (same as ExamPractice.jsx) ────────────────────
import {
  CalculationQuestion,
  ExtendedAnswerQuestion,
} from '../components/questions'

// ── Novel Context ─────────────────────────────────────────────────────────────
function NovelContextQuestion({ data, onComplete }) {
  const [open, setOpen] = useState(false)
  const [selfScore, setSelfScore] = useState(null)

  const handleScore = (pts) => {
    setSelfScore(pts)
    onComplete(pts >= Math.ceil(data.marks / 2))
  }

  return (
    <div className="space-y-3">
      <div className="px-4 py-3 rounded-[14px]"
        style={{ background: 'rgba(168,85,247,0.07)', border: '0.75px solid rgba(168,85,247,0.25)' }}>
        <div className="text-xs font-semibold mb-1.5" style={{ color: '#c084fc' }}>Unfamiliar Context</div>
        <p className="text-sm leading-relaxed" style={{ color: '#cad5e2' }}>{data.scenario}</p>
      </div>

      <motion.button
        className="w-full text-left px-4 py-3 rounded-[14px] flex items-center justify-between"
        style={{ background: open ? 'rgba(0,188,125,0.08)' : 'rgba(18,26,47,0.9)',
          border: open ? '0.75px solid rgba(0,188,125,0.3)' : '0.75px solid #1d293d' }}
        onClick={() => setOpen(v => !v)}
        whileTap={{ scale: 0.98 }}>
        <span className="text-sm font-semibold" style={{ color: open ? '#00bc7d' : '#a8b8cc' }}>
          {open ? 'Mark scheme' : 'Reveal mark scheme'}
        </span>
        <motion.span animate={{ rotate: open ? 90 : 0 }} style={{ color: '#a8b8cc' }}>›</motion.span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div className="space-y-2 px-1"
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
            {data.markScheme.map((m, i) => (
              <div key={i} className="flex items-start gap-2 px-3 py-2 rounded-[10px]"
                style={{ background: 'rgba(0,188,125,0.06)', border: '0.75px solid rgba(0,188,125,0.15)' }}>
                <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5"
                  style={{ background: 'rgba(0,188,125,0.2)', color: '#00bc7d' }}>{i + 1}</span>
                <span className="text-xs leading-relaxed" style={{ color: '#cad5e2' }}>{m}</span>
              </div>
            ))}
            <div className="mt-2 px-3 py-2 rounded-[10px]"
              style={{ background: 'rgba(18,26,47,0.9)', border: '0.75px solid #1d293d' }}>
              <div className="text-xs font-semibold mb-1" style={{ color: '#818cf8' }}>Model answer</div>
              <p className="text-xs leading-relaxed" style={{ color: '#a8b8cc' }}>{data.modelAnswer}</p>
            </div>

            {selfScore === null && (
              <div className="pt-2">
                <div className="text-xs font-semibold mb-2 text-center" style={{ color: '#a8b8cc' }}>
                  How many marks did you earn?
                </div>
                <div className="flex gap-2 justify-center">
                  {[0, Math.floor(data.marks / 2), data.marks].map(pts => (
                    <motion.button key={pts}
                      className="px-5 py-2 rounded-[10px] text-sm font-bold"
                      style={{ background: 'rgba(168,85,247,0.12)', border: '0.75px solid rgba(168,85,247,0.3)', color: '#c084fc' }}
                      onClick={() => handleScore(pts)} whileTap={{ scale: 0.92 }}>
                      {pts}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}
            {selfScore !== null && (
              <div className="text-center text-sm font-semibold py-2"
                style={{ color: selfScore >= Math.ceil(data.marks / 2) ? '#00bc7d' : '#f59e0b' }}>
                {selfScore >= data.marks ? '★ Full marks - Grade 9 standard!'
                  : selfScore > 0 ? `${selfScore}/${data.marks} - almost there`
                  : `0/${data.marks} - study the mark scheme carefully`}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      {data.senNote && (
        <div className="px-3 py-2 rounded-[10px]"
          style={{ background: 'rgba(253,199,0,0.07)', border: '0.75px solid rgba(253,199,0,0.2)' }}>
          <span className="text-xs" style={{ color: '#fdc700' }}>{data.senNote}</span>
        </div>
      )}
    </div>
  )
}

// ── RPA Error ─────────────────────────────────────────────────────────────────
function RPAErrorQuestion({ data, onComplete }) {
  const [selected, setSelected] = useState(null)
  const [submitted, setSubmitted] = useState(false)

  const options = [
    { value: 'high', label: 'Too high' },
    { value: 'low',  label: 'Too low' },
    { value: 'no effect', label: 'No effect' },
  ]

  const handleSubmit = () => {
    if (!selected || submitted) return
    setSubmitted(true)
    onComplete(selected === data.direction)
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <span className="px-2 py-0.5 rounded-full text-xs font-bold"
          style={{ background: 'rgba(168,85,247,0.15)', color: '#c084fc', border: '0.75px solid rgba(168,85,247,0.3)' }}>
          {data.rpaRef}
        </span>
        <span className="text-xs" style={{ color: '#64748b' }}>{data.rpaName}</span>
      </div>
      <div className="px-3 py-2.5 rounded-[12px]"
        style={{ background: 'rgba(18,26,47,0.9)', border: '0.75px solid #1d293d' }}>
        <div className="text-xs font-semibold mb-1" style={{ color: '#a8b8cc' }}>The experiment</div>
        <p className="text-sm leading-relaxed" style={{ color: '#cad5e2' }}>{data.experiment}</p>
      </div>

      <div>
        <div className="text-xs font-semibold mb-2" style={{ color: '#a8b8cc' }}>The calculated value is:</div>
        <div className="flex gap-2">
          {options.map(opt => {
            const isCorrect = submitted && opt.value === data.direction
            const isWrong   = submitted && opt.value === selected && selected !== data.direction
            return (
              <motion.button key={opt.value}
                className="flex-1 py-3 rounded-[12px] text-sm font-bold"
                style={{
                  background: isCorrect ? 'rgba(0,188,125,0.15)' : isWrong ? 'rgba(239,68,68,0.15)' : selected === opt.value ? 'rgba(168,85,247,0.15)' : 'rgba(18,26,47,0.9)',
                  border: isCorrect ? '1.5px solid #00bc7d' : isWrong ? '1.5px solid #ef4444' : selected === opt.value ? '1.5px solid #a855f7' : '0.75px solid #1d293d',
                  color: isCorrect ? '#00bc7d' : isWrong ? '#ef4444' : '#f8fafc',
                }}
                onClick={() => { if (!submitted) setSelected(opt.value) }}
                whileTap={submitted ? {} : { scale: 0.96 }}>
                {opt.label}
              </motion.button>
            )
          })}
        </div>
      </div>

      {!submitted && (
        <motion.button
          className="w-full py-3 rounded-[14px] text-sm font-bold"
          style={{ background: selected ? MODULE_COLOR : '#1d293d', color: selected ? '#fff' : '#64748b' }}
          onClick={handleSubmit} disabled={!selected} whileTap={{ scale: 0.97 }}>
          Check answer
        </motion.button>
      )}

      {submitted && (
        <motion.div className="space-y-2" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
          {data.markScheme.map((m, i) => (
            <div key={i} className="flex items-start gap-2 px-3 py-2 rounded-[10px]"
              style={{ background: 'rgba(0,188,125,0.06)', border: '0.75px solid rgba(0,188,125,0.15)' }}>
              <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5"
                style={{ background: 'rgba(0,188,125,0.2)', color: '#00bc7d' }}>{i + 1}</span>
              <span className="text-xs leading-relaxed" style={{ color: '#cad5e2' }}>{m}</span>
            </div>
          ))}
          {data.senNote && (
            <div className="px-3 py-2 rounded-[10px]"
              style={{ background: 'rgba(253,199,0,0.07)', border: '0.75px solid rgba(253,199,0,0.2)' }}>
              <span className="text-xs" style={{ color: '#fdc700' }}>{data.senNote}</span>
            </div>
          )}
        </motion.div>
      )}
    </div>
  )
}

// ── TYPE LABELS ───────────────────────────────────────────────────────────────
const TYPE_LABELS = {
  'calculation-chained': { label: 'Chained Calculation', emoji: '🔗' },
  'rpa-error':           { label: 'RPA Error Analysis',  emoji: '🔬' },
  'novel-context':       { label: 'Novel Context',        emoji: '🌍' },
}

// ── Main Screen ───────────────────────────────────────────────────────────────
export default function Grade9Challenge() {
  const navigate = useNavigate()
  const questions = useMemo(() => getGrade9Questions(), [])
  const total = questions.length

  const [qIndex, setQIndex]       = useState(0)
  const [score, setScore]         = useState(0)
  const [completed, setCompleted] = useState(false)
  const [showResults, setShowResults] = useState(false)

  const q = questions[qIndex] || {}
  const isLast = qIndex === total - 1
  const typeInfo = TYPE_LABELS[q.type] || { label: 'Grade 9', emoji: '⭐' }

  const handleComplete = useCallback((correct) => {
    if (correct) setScore(s => s + 1)
    setCompleted(true)
  }, [])

  const handleNext = () => {
    if (isLast) {
      saveQuizResult('grade9_challenge', score, total)
      try { window.dispatchEvent(new Event('storage')) } catch {}
      setShowResults(true)
    } else {
      setQIndex(i => i + 1)
      setCompleted(false)
    }
  }

  const restart = () => {
    setQIndex(0)
    setScore(0)
    setCompleted(false)
    setShowResults(false)
  }

  const renderQuestion = () => {
    const props = { data: q, moduleColor: MODULE_COLOR, onComplete: handleComplete }
    switch (q.type) {
      case 'calculation-chained': return <CalculationQuestion {...props} />
      case 'novel-context':       return <NovelContextQuestion {...props} />
      case 'rpa-error':           return <RPAErrorQuestion {...props} />
      case 'extended-answer':     return <ExtendedAnswerQuestion {...props} />
      default: return null
    }
  }

  // ── Results ────────────────────────────────────────────────────────────────
  if (showResults) {
    const pct = Math.round((score / total) * 100)
    const grade9 = pct >= 75
    const grade8 = pct >= 55
    return (
      <div className="flex flex-col h-full overflow-hidden" style={{ background: '#0b1121' }}>
        <div className="px-5 pt-5 pb-3 shrink-0">
          <button onClick={() => navigate(-1)}
            className="w-11 h-11 rounded-[12px] flex items-center justify-center"
            style={{ background: 'rgba(18,26,47,0.9)', border: '0.75px solid #1d293d' }}>
            <ArrowLeft size={18} color="#a8b8cc" />
          </button>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center px-6 gap-5">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.1 }}>
            <Trophy size={72} color={grade9 ? '#fdc700' : grade8 ? '#a855f7' : '#64748b'} strokeWidth={1.2} />
          </motion.div>

          <motion.div className="text-center" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
            <div className="text-4xl font-black mb-1" style={{ color: '#f8fafc' }}>{score}/{total}</div>
            <div className="text-lg font-semibold mb-2" style={{ color: grade9 ? '#fdc700' : grade8 ? '#c084fc' : '#64748b' }}>
              {grade9 ? '🏆 Grade 9 standard!' : grade8 ? '★ Grade 8 territory' : 'Keep practising'}
            </div>
            <div className="text-sm" style={{ color: '#a8b8cc' }}>
              {grade9
                ? 'You\'re answering at the top 3% level. These are the questions that separate Grade 8 from Grade 9.'
                : grade8
                ? 'Solid performance. Review the mark schemes for any questions you missed.'
                : 'Grade 9 discriminators are designed to be hard. Study the mark schemes - the pattern becomes clear.'}
            </div>
          </motion.div>

          {/* Score breakdown by type */}
          <motion.div className="w-full space-y-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            {Object.entries(TYPE_LABELS).map(([type, info]) => {
              const typeQs = questions.filter(q => q.type === type)
              const count = typeQs.length
              if (!count) return null
              return (
                <div key={type} className="flex items-center gap-3 px-4 py-3 rounded-[12px]"
                  style={{ background: 'rgba(18,26,47,0.9)', border: '0.75px solid #1d293d' }}>
                  <span style={{ fontSize: 20 }}>{info.emoji}</span>
                  <div className="flex-1">
                    <div className="text-xs font-semibold" style={{ color: '#f8fafc' }}>{info.label}</div>
                    <div className="text-xs" style={{ color: '#64748b' }}>{count} questions</div>
                  </div>
                </div>
              )
            })}
          </motion.div>

          <div className="flex gap-3 w-full">
            <motion.button
              className="flex-1 py-3.5 rounded-[14px] text-sm font-bold flex items-center justify-center gap-2"
              style={{ background: 'rgba(168,85,247,0.12)', border: '0.75px solid rgba(168,85,247,0.3)', color: '#c084fc' }}
              onClick={restart} whileTap={{ scale: 0.96 }}>
              <RotateCcw size={15} /> Try again
            </motion.button>
            <motion.button
              className="flex-1 py-3.5 rounded-[14px] text-sm font-bold"
              style={{ background: MODULE_COLOR, color: '#fff' }}
              onClick={() => navigate(-1)} whileTap={{ scale: 0.96 }}>
              Done
            </motion.button>
          </div>
        </div>
      </div>
    )
  }

  // ── Question screen ────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col h-full overflow-hidden" style={{ background: '#0b1121' }}>
      {/* Header */}
      <div className="px-5 pt-5 pb-3 shrink-0 flex items-center gap-3"
        style={{ borderBottom: '0.75px solid #1d293d' }}>
        <button
          onClick={() => {
            if (qIndex > 0) {
              setQIndex(i => i - 1)
              setCompleted(false)
            } else {
              navigate(-1)
            }
          }}
          className="w-11 h-11 rounded-[12px] flex items-center justify-center shrink-0"
          style={{ background: 'rgba(18,26,47,0.9)', border: '0.75px solid #1d293d' }}>
          <ArrowLeft size={18} color="#a8b8cc" />
        </button>
        <div className="flex-1 min-w-0">
          <div className="text-xs font-bold" style={{ color: '#c084fc' }}>GRADE 9 CHALLENGE</div>
          <div className="text-xs" style={{ color: '#64748b' }}>Q{qIndex + 1} of {total}</div>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
          style={{ background: 'rgba(253,199,0,0.1)', border: '0.75px solid rgba(253,199,0,0.3)' }}>
          <Star size={12} color="#fdc700" fill="#fdc700" />
          <span className="text-xs font-bold" style={{ color: '#fdc700' }}>{score}</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1 shrink-0" style={{ background: '#1d293d' }}>
        <motion.div className="h-full rounded-full"
          style={{ background: 'linear-gradient(90deg, #a855f7, #ec4899)' }}
          animate={{ width: `${((qIndex + (completed ? 1 : 0)) / total) * 100}%` }}
          transition={{ type: 'spring', stiffness: 120, damping: 20 }} />
      </div>

      {/* Question type badge */}
      <div className="px-5 pt-4 pb-2 shrink-0">
        <span className="px-3 py-1 rounded-full text-xs font-bold"
          style={{ background: 'rgba(168,85,247,0.12)', border: '0.75px solid rgba(168,85,247,0.3)', color: '#c084fc' }}>
          {typeInfo.emoji} {typeInfo.label}
        </span>
      </div>

      {/* Question content */}
      <div className="flex-1 overflow-y-auto px-5 pb-4">
        {/* Question text */}
        <div className="mb-4">
          <p className="text-base font-semibold leading-snug" style={{ color: '#f8fafc' }}>{q.question}</p>
          {q.questionSubtitle && (
            <p className="text-xs mt-1 text-right" style={{ color: '#64748b' }}>{q.questionSubtitle}</p>
          )}
          {(q.marks || q.steps?.length) && (
            <p className="text-xs mt-0.5 text-right font-semibold" style={{ color: '#a855f7' }}>
              [{q.marks || q.steps?.length} marks]
            </p>
          )}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={qIndex}
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
            {renderQuestion()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Next button */}
      {completed && (
        <motion.div className="px-5 py-4 shrink-0"
          style={{ borderTop: '0.75px solid #1d293d' }}
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <motion.button
            className="w-full py-4 rounded-[16px] text-base font-bold flex items-center justify-center gap-2"
            style={{ background: 'linear-gradient(135deg, #a855f7, #ec4899)', color: '#fff',
              boxShadow: '0 4px 20px rgba(168,85,247,0.4)' }}
            onClick={handleNext} whileTap={{ scale: 0.97 }}>
            {isLast ? 'See results' : 'Next question'} <ChevronRight size={18} />
          </motion.button>
        </motion.div>
      )}
    </div>
  )
}
