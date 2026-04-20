/**
 * Grade9Challenge - curated Grade 9 discriminator questions.
 * Mixes chained calculations, RPA error-direction, and novel-context questions.
 */
import { motion, AnimatePresence } from 'motion/react'
import { useState, useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Trophy, Star, CaretRight, ArrowCounterClockwise } from '@phosphor-icons/react'
import { getGrade9Questions } from '../data/examIndex'
import { saveQuizResult } from '../hooks/useInsights'
import { getSelectedBoard } from '../utils/boardConfig'

const MODULE_COLOR = '#a855f7' // purple for Grade 9

// ── Inline question components (same as ExamPractice.jsx) ────────────────────
import {
  CalculationQuestion,
  ExtendedAnswerQuestion,
  NovelContextQuestion,
} from '../components/questions'

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

  const [course, setCourse] = useState(() => {
    try { return JSON.parse(localStorage.getItem('neurophysics_prefs') || '{}').course || 'combined' } catch { return 'combined' }
  })
  const [started, setStarted] = useState(false)
  const questions = useMemo(() => getGrade9Questions(course), [course])
  const total = questions.length

  const [qIndex, setQIndex]       = useState(0)
  const [score, setScore]         = useState(0)
  const [completed, setCompleted] = useState(false)
  const [showResults, setShowResults] = useState(false)

  const board = getSelectedBoard()
  const isCCEA = board.gradeSystem === 'A*-G'
  const topLabel    = isCCEA ? 'Grade A*' : 'Grade 9'
  const midLabel    = isCCEA ? 'Grade A'  : 'Grade 8'
  const challengeTitle = isCCEA ? 'Grade A* Challenge' : 'Grade 9 Challenge'
  const challengeHeader = isCCEA ? 'GRADE A* CHALLENGE' : 'GRADE 9 CHALLENGE'

  const q = questions[qIndex] || {}
  const isLast = qIndex === total - 1
  const typeInfo = TYPE_LABELS[q.type] || { label: topLabel, emoji: '⭐' }

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
    setStarted(false)
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
    const isTop = pct >= 75
    const isMid = pct >= 55
    return (
      <div className="flex flex-col h-full overflow-hidden" style={{ background: '#0b1121' }}>
        <div className="px-5 pt-5 pb-3 shrink-0">
          <button onClick={() => navigate(-1)} aria-label="Go back"
            className="w-11 h-11 rounded-[12px] flex items-center justify-center"
            style={{ background: 'rgba(18,26,47,0.9)', border: '0.75px solid #1d293d' }}>
            <ArrowLeft size={18} color="#a8b8cc" />
          </button>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center px-6 gap-5">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.1 }}>
            <Trophy size={72} color={isTop ? '#fdc700' : isMid ? '#a855f7' : '#64748b'} />
          </motion.div>

          <motion.div className="text-center" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
            <div className="text-4xl font-black mb-1" style={{ color: '#f8fafc' }}>{score}/{total}</div>
            <div className="text-lg font-semibold mb-2" style={{ color: isTop ? '#fdc700' : isMid ? '#c084fc' : '#64748b' }}>
              {isTop ? `🏆 ${topLabel} standard!` : isMid ? `★ ${midLabel} territory` : 'Keep practising'}
            </div>
            <div className="text-sm" style={{ color: '#a8b8cc' }}>
              {isTop
                ? `You're answering at the top 3% level. These are the questions that separate ${midLabel} from ${topLabel}.`
                : isMid
                ? 'Solid performance. Review the mark schemes for any questions you missed.'
                : 'These discriminator questions are designed to be hard. Study the mark schemes — the pattern becomes clear.'}
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
              <ArrowCounterClockwise size={15} /> Try again
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

  // ── Intro / course picker screen ──────────────────────────────────────────
  if (!started && !showResults) {
    return (
      <div className="flex flex-col h-full overflow-hidden" style={{ background: '#0b1121' }}>
        <div className="px-5 pt-5 pb-3 shrink-0">
          <button onClick={() => navigate(-1)} aria-label="Go back"
            className="w-11 h-11 rounded-[12px] flex items-center justify-center"
            style={{ background: 'rgba(18,26,47,0.9)', border: '0.75px solid #1d293d' }}>
            <ArrowLeft size={18} color="#a8b8cc" />
          </button>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center px-6 gap-6">
          <Trophy size={56} color="#a855f7" />
          <div className="text-center">
            <div className="text-2xl font-black mb-1" style={{ color: '#f8fafc' }}>{challengeTitle}</div>
            <div className="text-sm mb-1" style={{ color: '#64748b' }}>Chained calcs · RPA errors · Novel context</div>
            <div className="text-xs leading-relaxed" style={{ color: '#64748b' }}>
              Chained calcs = multi-step problems where each answer feeds into the next · RPA errors = spotting how an experimental mistake shifts your result
            </div>
          </div>
          <div className="w-full space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider mb-2 text-center" style={{ color: '#64748b' }}>Your course</div>
            {[
              { id: 'combined', label: 'Combined Science', sub: 'Excludes Physics-only topics', color: '#818cf8' },
              { id: 'physics_only', label: 'Physics Only', sub: 'All topics including Physics-only', color: '#e879f9' },
            ].map(opt => (
              <motion.button key={opt.id}
                className="w-full flex items-center gap-3 px-4 py-3.5 rounded-[16px] text-left"
                style={{
                  background: course === opt.id ? `${opt.color}15` : 'rgba(18,26,47,0.9)',
                  border: course === opt.id ? `1.5px solid ${opt.color}50` : '0.75px solid #1d293d',
                }}
                onClick={() => {
                  setCourse(opt.id)
                  try {
                    const prefs = JSON.parse(localStorage.getItem('neurophysics_prefs') || '{}')
                    localStorage.setItem('neurophysics_prefs', JSON.stringify({ ...prefs, course: opt.id }))
                  } catch {}
                }}
                whileTap={{ scale: 0.98 }}>
                <div className="w-4 h-4 rounded-full border-2 flex items-center justify-center"
                  style={{ borderColor: course === opt.id ? opt.color : '#1d293d' }}>
                  {course === opt.id && <div className="w-2 h-2 rounded-full" style={{ background: opt.color }} />}
                </div>
                <div>
                  <div className="text-sm font-bold" style={{ color: '#f8fafc' }}>{opt.label}</div>
                  <div className="text-xs" style={{ color: '#64748b' }}>{opt.sub}</div>
                </div>
              </motion.button>
            ))}
          </div>
          <div className="text-xs text-center" style={{ color: '#64748b' }}>
            {total} questions · ~{Math.ceil(total * 1.5)} min
          </div>
          <motion.button
            className="w-full py-4 rounded-[16px] text-base font-bold"
            style={{ background: '#6366f1', color: '#fff' }}
            onClick={() => setStarted(true)}
            whileTap={{ scale: 0.97 }}>
            Start Challenge
          </motion.button>
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
          aria-label={qIndex > 0 ? 'Previous question' : 'Go back'}
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
          <div className="text-xs font-bold" style={{ color: '#c084fc' }}>{challengeHeader}</div>
          <div className="text-xs" style={{ color: '#64748b' }}>Question {qIndex + 1}</div>
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
          style={{ background: '#6366f1' }}
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
            style={{ background: '#6366f1', color: '#fff' }}
            onClick={handleNext} whileTap={{ scale: 0.97 }}>
            {isLast ? 'See results' : 'Next question'} <CaretRight size={18} />
          </motion.button>
        </motion.div>
      )}
    </div>
  )
}
