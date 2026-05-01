/**
 * TimedPaper - board-filtered mini-paper with:
 * - Global countdown timer (55 min) with amber/red urgency
 * - Question palette (numbered circles, answered/flagged states)
 * - Full state persistence (survives app backgrounding)
 * - 3-stage results: The Number → The Breakdown → The Plan
 */
import { motion, AnimatePresence } from 'motion/react'
import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Flag, CaretUp, CaretDown, Trophy, Clock, CheckCircle, Warning, ChartBar, BookOpen, Eye, EyeSlash } from '@phosphor-icons/react'
import { getTimedPaperQuestions } from '../data/examIndex'
import { getAnswerMarksTotal } from '../features/timed-paper/scoring'
import {
  getPaperTotalMarks,
  getTimedPaperTimeUsed,
  normaliseTimedPaperAnswers,
  normaliseTimedPaperOutcome,
  parseSavedTimedPaperState,
} from '../features/timed-paper/session'
import { saveQuizResult } from '../hooks/useInsights'
import { useReducedMotion } from '../hooks/useReducedMotion'
import {
  CalculationQuestion,
  ExtendedAnswerQuestion,
  SequenceSortQuestion,
  GraphQuestion,
  NovelContextQuestion,
} from '../components/questions'

const PAPER_DURATION_STD  = 55 * 60 // 55 minutes — standard
const PAPER_DURATION_EHCP = 69 * 60 // 69 minutes — 25% extra time (EHCP)
const PAPER_DURATION = PAPER_DURATION_STD   // default (used where needed)
const STORAGE_KEY = 'neurophysics_timed_paper'

// ── Timer arc component ───────────────────────────────────────────────────────
function TimerArc({ remaining, total }) {
  const pct = remaining / total
  const urgent = remaining < 120
  const warning = remaining < 300
  const color = urgent ? '#ef4444' : warning ? '#f59e0b' : '#6366f1'
  const size = 44
  const r = 18
  const circ = 2 * Math.PI * r
  const dash = circ * pct
  const reducedMotion = useReducedMotion()

  const mins = Math.floor(remaining / 60)
  const secs = remaining % 60
  const label = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`

  return (
    <motion.div className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
      animate={reducedMotion ? {} : (urgent ? { scale: [1, 1.06, 1] } : { scale: 1 })}
      transition={reducedMotion ? { duration: 0 } : (urgent ? { repeat: Infinity, duration: 1.2, ease: 'easeInOut' } : {})}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)', position: 'absolute' }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#1d293d" strokeWidth={3} />
        <motion.circle
          cx={size / 2} cy={size / 2} r={r} fill="none"
          stroke={color} strokeWidth={3} strokeLinecap="round"
          strokeDasharray={circ}
          animate={{ strokeDashoffset: circ - dash }}
          transition={{ duration: reducedMotion ? 0 : 0.5 }}
        />
      </svg>
      <span className="text-xs font-bold tabular-nums" style={{ color, zIndex: 1 }}>{label}</span>
    </motion.div>
  )
}

// ── Question palette ──────────────────────────────────────────────────────────
function QuestionPalette({ questions, answers, flags, currentIdx, onJump, open, onToggle }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="absolute bottom-full left-0 right-0 px-4 pb-3 pt-4 z-50"
          style={{ background: 'rgba(11,17,33,0.98)', borderTop: '0.75px solid #1d293d', backdropFilter: 'blur(12px)' }}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ type: 'spring', stiffness: 380, damping: 30 }}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold" style={{ color: '#f8fafc' }}>Question Palette</span>
            <div className="flex items-center gap-3 text-xs" style={{ color: '#8899b0' }}>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full border border-current inline-block" /> Unanswered</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-indigo-500 inline-block" /> Answered</span>
              <span className="flex items-center gap-1"><Flag size={10} color="#f59e0b" /> Flagged</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {questions.map((_, i) => {
              const answered = answers[i] !== undefined
              const flagged  = flags[i]
              const current  = i === currentIdx
              return (
                <motion.button key={i}
                  className="relative w-11 h-11 rounded-[10px] text-sm font-bold flex items-center justify-center"
                  style={{
                    background: current ? '#6366f1' : answered ? 'rgba(99,102,241,0.2)' : 'rgba(18,26,47,0.9)',
                    border: current ? '2px solid #6366f1' : answered ? '1.5px solid #6366f1' : '0.75px solid #2d3e55',
                    color: current ? '#fff' : answered ? '#818cf8' : '#a8b8cc',
                  }}
                  onClick={() => { onJump(i); onToggle() }}
                  whileTap={{ scale: 0.9 }}>
                  {i + 1}
                  {flagged && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full flex items-center justify-center"
                      style={{ background: '#f59e0b' }}>
                      <Flag size={7} color="#fff" />
                    </span>
                  )}
                </motion.button>
              )
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}


// ── RPA Error Question ────────────────────────────────────────────────────────
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
          style={{ background: 'rgba(99,102,241,0.15)', color: '#818cf8', border: '0.75px solid rgba(99,102,241,0.3)' }}>
          {data.rpaRef}
        </span>
        <span className="text-xs" style={{ color: '#8899b0' }}>{data.rpaName}</span>
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
              <motion.button key={opt.value} className="flex-1 py-3 rounded-[12px] text-sm font-bold"
                style={{
                  background: isCorrect ? 'rgba(0,188,125,0.15)' : isWrong ? 'rgba(239,68,68,0.15)' : selected === opt.value ? 'rgba(99,102,241,0.15)' : 'rgba(18,26,47,0.9)',
                  border: isCorrect ? '1.5px solid #00bc7d' : isWrong ? '1.5px solid #ef4444' : selected === opt.value ? '1.5px solid #6366f1' : '0.75px solid #1d293d',
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
        <motion.button className="w-full py-3 rounded-[14px] text-sm font-bold"
          style={{ background: selected ? '#6366f1' : '#1d293d', color: selected ? '#fff' : '#8899b0' }}
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
        </motion.div>
      )}
    </div>
  )
}

// ── Inline MCQ for equation-recall ───────────────────────────────────────────
function EquationRecallQuestion({ data, onComplete }) {
  const [sel, setSel] = useState(null)
  const [sub, setSub] = useState(false)
  const submit = () => {
    if (sel === null || sub) return
    setSub(true)
    onComplete(sel === data.correctAnswer)
  }
  return (
    <div className="space-y-2">
      {(data.options || []).map((opt, idx) => {
        const correct = sub && idx === data.correctAnswer
        const wrong   = sub && idx === sel && sel !== data.correctAnswer
        return (
          <motion.button key={idx}
            className="w-full text-left rounded-[14px] p-4 flex items-center gap-3"
            style={{
              background: correct ? 'rgba(0,188,125,0.12)' : wrong ? 'rgba(239,68,68,0.12)' : sel === idx ? 'rgba(99,102,241,0.12)' : 'rgba(18,26,47,0.9)',
              border: correct ? '1.5px solid #00bc7d' : wrong ? '1.5px solid #ef4444' : sel === idx ? '1.5px solid #6366f1' : '0.75px solid #1d293d',
              color: '#f8fafc',
            }}
            onClick={() => { if (!sub) setSel(idx) }}
            whileTap={sub ? {} : { scale: 0.98 }}>
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
              style={{ background: sel === idx && !sub ? '#6366f1' : sub && idx === data.correctAnswer ? '#00bc7d' : sub && idx === sel ? '#ef4444' : '#1d293d', color: '#fff' }}>
              {['A','B','C','D'][idx]}
            </div>
            <span className="text-sm">{opt}</span>
          </motion.button>
        )
      })}
      {!sub && (
        <motion.button className="w-full mt-2 py-3 rounded-[14px] text-sm font-bold"
          style={{ background: sel !== null ? '#6366f1' : '#1d293d', color: sel !== null ? '#fff' : '#8899b0' }}
          onClick={submit} disabled={sel === null} whileTap={{ scale: 0.97 }}>
          Confirm
        </motion.button>
      )}
    </div>
  )
}

// ── Section labels ────────────────────────────────────────────────────────────
function getSectionLabel(idx, questions) {
  const types = questions.slice(0, idx + 1).map(q => q.type)
  const mcqCount = questions.filter(q => q.type === 'equation-recall').length
  const mcqEnd = mcqCount - 1
  if (idx <= mcqEnd) return { section: 'A', label: 'Multiple Choice' }
  if (idx <= mcqEnd + 3) return { section: 'B', label: 'Short Answer' }
  if (idx <= mcqEnd + 5) return { section: 'C', label: 'Calculations' }
  return { section: 'D', label: 'Extended Response' }
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function TimedPaper() {
  const navigate = useNavigate()

  const [course, setCourse] = useState(() => {
    try { return JSON.parse(localStorage.getItem('neurophysics_prefs') || '{}').course || 'combined' } catch { return 'combined' }
  })

  // Load or generate paper
  const questions = useMemo(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null')
      if (saved?.questions && saved.timeRemaining > 0) return saved.questions
    } catch {}
    return getTimedPaperQuestions(course)
  }, [course])

  const total = questions.length
  const totalMarks = getPaperTotalMarks(questions)

  // Restore state if available
  const loadState = () => parseSavedTimedPaperState(
    localStorage.getItem(STORAGE_KEY),
    PAPER_DURATION
  )

  const init = loadState()
  const isResuming = (() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null')
      return !!(saved?.questions && Object.keys(saved?.answers || {}).length > 0)
    } catch { return false }
  })()

  const [qIndex, setQIndex]         = useState(init.qIndex)
  const [answers, setAnswers]       = useState(init.answers)
  const [flags, setFlags]           = useState(init.flags)
  const [remaining, setRemaining]   = useState(init.remaining)
  const [score, setScore]           = useState(init.score)
  const [completed, setCompleted]   = useState(false)
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [timesUp, setTimesUp]       = useState(false)
  const [resumeBanner, setResumeBanner] = useState(false)
  const [hideTimer, setHideTimer]   = useState(() => {
    try { return sessionStorage.getItem('neurophysics_paper_hide_timer') === 'true' } catch { return false }
  })
  const [paused, setPaused]         = useState(() => {
    try { return sessionStorage.getItem('neurophysics_paper_paused') === 'true' } catch { return false }
  })
  // EHCP start screen: show only on fresh paper (not resuming)
  const [showTimeChoice, setShowTimeChoice] = useState(!isResuming)
  const [paperDuration, setPaperDuration]   = useState(init.remaining || PAPER_DURATION_STD)

  const timerRef = useRef(null)
  const backgroundedAt = useRef(null)
  // Wall-clock anchors — set when the timer starts (or resumes after pause)
  const startTimeRef       = useRef(null) // Date.now() when the current run began
  const initialRemainingRef = useRef(null) // remaining seconds at that moment

  // Persist state after each answer
  const persist = useCallback((extra = {}) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        questions, qIndex, answers, flags, timeRemaining: remaining, score, ...extra,
      }))
    } catch {}
  }, [questions, qIndex, answers, flags, remaining, score])

  // Persist pause state to sessionStorage
  useEffect(() => {
    try { sessionStorage.setItem('neurophysics_paper_paused', String(paused)) } catch {}
  }, [paused])

  // Persist hide-timer preference to sessionStorage
  useEffect(() => {
    try { sessionStorage.setItem('neurophysics_paper_hide_timer', String(hideTimer)) } catch {}
  }, [hideTimer])

  // Timer tick — wall-clock based so backgrounding / interval drift cannot steal time
  useEffect(() => {
    if (showResults || timesUp || showTimeChoice || paused) return

    // Anchor the wall clock whenever the timer (re)starts
    startTimeRef.current        = Date.now()
    initialRemainingRef.current = remaining

    timerRef.current = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000)
      const next    = Math.max(0, initialRemainingRef.current - elapsed)
      setRemaining(next)
      if (next === 0) {
        clearInterval(timerRef.current)
        setTimesUp(true)
      }
    }, 500) // 500 ms tick so display updates smoothly while still using wall-clock truth

    return () => clearInterval(timerRef.current)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showResults, timesUp, showTimeChoice, paused])

  // Background / foreground handling — wall-clock correction on return
  useEffect(() => {
    const handleHide = () => {
      clearInterval(timerRef.current)
      backgroundedAt.current = Date.now()
      persist()
    }
    const handleShow = () => {
      if (backgroundedAt.current) {
        const away = Math.floor((Date.now() - backgroundedAt.current) / 1000)
        backgroundedAt.current = null
        if (away > 30) setResumeBanner(true)

        // If not paused, correct remaining from wall clock immediately
        if (!paused && startTimeRef.current !== null && initialRemainingRef.current !== null) {
          const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000)
          const corrected = Math.max(0, initialRemainingRef.current - elapsed)
          setRemaining(corrected)
          if (corrected === 0) {
            clearInterval(timerRef.current)
            setTimesUp(true)
          }
        }
      }
    }
    const handleVisibility = () => {
      document.hidden ? handleHide() : handleShow()
    }
    document.addEventListener('visibilitychange', handleVisibility)
    return () => document.removeEventListener('visibilitychange', handleVisibility)
  }, [persist, paused])

  const q = questions[qIndex] || {}
  const isLast = qIndex === total - 1
  const sectionInfo = getSectionLabel(qIndex, questions)

  // scoreRef keeps a always-current score value so handleNext never reads stale closure state
  const scoreRef = useRef(init.score)

  const handleComplete = useCallback((outcome) => {
    const normalised = normaliseTimedPaperOutcome(outcome, q?.marks || 1)

    setCompleted(true)
    setAnswers(prev => {
      const updated = { ...prev, [qIndex]: normalised }
      const updatedScore = getAnswerMarksTotal(updated)
      setScore(updatedScore)
      scoreRef.current = updatedScore
      persist({ answers: updated, score: updatedScore })
      return updated
    })
  }, [qIndex, persist, q])

  // Use functional update so rapid taps never read stale qIndex.
  // Reads scoreRef.current instead of score to avoid stale closure on last question.
  const handleNext = useCallback(() => {
    setQIndex(prev => {
      if (prev >= total - 1) {
        // Last question — go to results (defer to next tick to avoid setState-in-render)
        setTimeout(() => {
          saveQuizResult('timed_paper', scoreRef.current, totalMarks)
          localStorage.removeItem(STORAGE_KEY)
          setShowResults(true)
        }, 0)
        return prev
      }
      return Math.min(prev + 1, total - 1) // BUG-05: bounds guard
    })
    setCompleted(false)
  }, [total])

  const toggleFlag = () => {
    setFlags(prev => ({ ...prev, [qIndex]: !prev[qIndex] }))
  }

  const jumpTo = (idx) => {
    setQIndex(idx)
    setCompleted(answers[idx] !== undefined)
  }

  const flaggedCount = Object.values(flags).filter(Boolean).length
  const answeredCount = Object.keys(answers).length

  const renderQuestion = () => {
    // key={qIndex} on every component forces a fresh mount when navigating,
    // preventing state bleed between same-type questions
    const props = { key: qIndex, data: q, moduleColor: '#6366f1', onComplete: handleComplete }
    switch (q.type) {
      case 'equation-recall':      return <EquationRecallQuestion key={qIndex} data={q} onComplete={handleComplete} />
      case 'calculation':
      case 'calculation-chained':  return <CalculationQuestion {...props} />
      case 'graph-read':           return <GraphQuestion {...props} />
      case 'extended-answer':      return <ExtendedAnswerQuestion {...props} />
      case 'novel-context':        return <NovelContextQuestion {...props} onComplete={handleComplete} />
      case 'rpa-error':            return <RPAErrorQuestion {...props} onComplete={handleComplete} />
      case 'sequence':             return <SequenceSortQuestion {...props} />
      default: return (
        <div key={qIndex} className="py-8 text-center text-sm" style={{ color: '#8899b0' }}>
          Question type: {q.type}
        </div>
      )
    }
  }

  // ── EHCP / time choice screen (fresh paper only) ──────────────────────────
  if (showTimeChoice) {
    return (
      <div className="flex flex-col h-full" style={{ background: '#0b1121' }}>
        <div className="px-4 pt-5 pb-3 shrink-0 flex items-center gap-3">
          <button onClick={() => navigate(-1)}
            className="w-11 h-11 rounded-[12px] flex items-center justify-center shrink-0"
            style={{ background: 'rgba(255,255,255,0.07)', border: '0.75px solid rgba(255,255,255,0.1)' }}>
            <ArrowLeft size={18} color="#a8b8cc" />
          </button>
          <h1 className="text-base font-bold" style={{ color: '#f8fafc' }}>Exam-style Physics Paper</h1>
        </div>

        <div className="flex-1 overflow-y-auto flex flex-col items-center justify-center px-6 gap-5">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div style={{ fontSize: 56 }} className="mb-3">⏱</div>
            <h2 className="text-2xl font-black mb-2" style={{ color: '#f8fafc' }}>Ready to start?</h2>
            <p className="text-sm" style={{ color: '#a8b8cc' }}>
              {totalMarks} marks · choose your course and time allowance
            </p>
          </motion.div>

          {/* Course picker */}
          <motion.div
            className="w-full space-y-2"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="text-xs font-bold uppercase tracking-wider mb-2 text-center" style={{ color: '#8899b0' }}>Your course</div>
            {[
              { id: 'combined', label: 'Combined Science', sub: 'Excludes Physics-only topics', color: '#818cf8' },
              { id: 'physics_only', label: 'Physics Only', sub: 'All topics including Physics-only', color: '#e879f9' },
            ].map(opt => (
              <motion.button key={opt.id}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-[14px] text-left"
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
                  <div className="text-xs" style={{ color: '#8899b0' }}>{opt.sub}</div>
                </div>
              </motion.button>
            ))}
          </motion.div>

          <motion.div
            className="w-full flex flex-col gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="text-xs font-bold uppercase tracking-wider mb-1 text-center" style={{ color: '#8899b0' }}>Time allowance</div>
            <motion.button
              className="w-full py-5 rounded-[16px] flex items-center justify-between px-5"
              style={{ background: 'rgba(99,102,241,0.12)', border: '1.5px solid rgba(99,102,241,0.45)', color: '#f8fafc' }}
              onClick={() => { setPaperDuration(PAPER_DURATION_STD); setRemaining(PAPER_DURATION_STD); setShowTimeChoice(false) }}
              whileTap={{ scale: 0.97 }}
            >
              <div className="text-left">
                <div className="text-base font-bold">Standard time</div>
                <div className="text-xs mt-0.5" style={{ color: '#818cf8' }}>55 minutes</div>
              </div>
              <Clock size={22} color="#818cf8" />
            </motion.button>

            <motion.button
              className="w-full py-5 rounded-[16px] flex items-center justify-between px-5"
              style={{ background: 'rgba(253,199,0,0.08)', border: '1.5px solid rgba(253,199,0,0.3)', color: '#f8fafc' }}
              onClick={() => { setPaperDuration(PAPER_DURATION_EHCP); setRemaining(PAPER_DURATION_EHCP); setShowTimeChoice(false) }}
              whileTap={{ scale: 0.97 }}
            >
              <div className="text-left">
                <div className="text-base font-bold">EHCP — 25% extra time</div>
                <div className="text-xs mt-0.5" style={{ color: '#fdc700' }}>69 minutes</div>
              </div>
              <Clock size={22} color="#fdc700" />
            </motion.button>
          </motion.div>

          <p className="text-xs text-center" style={{ color: '#475569' }}>
            EHCP stands for Education, Health and Care Plan. Select if you have an exam access arrangement.
          </p>
        </div>
      </div>
    )
  }

  // ── Time's up modal ────────────────────────────────────────────────────────
  if (timesUp && !showResults) {
    return (
      <div className="flex flex-col h-full items-center justify-center gap-5 px-8" style={{ background: '#0b1121' }}>
        <Clock size={64} color="#ef4444" />
        <div className="text-2xl font-black text-center" style={{ color: '#f8fafc' }}>Time's up!</div>
        <div className="text-sm text-center" style={{ color: '#a8b8cc' }}>
          You answered {answeredCount} of {total} questions.
        </div>
        <motion.button className="w-full py-4 rounded-[16px] font-bold"
          style={{ background: '#6366f1', color: '#fff' }}
          onClick={() => { saveQuizResult('timed_paper', score, total); localStorage.removeItem(STORAGE_KEY); setShowResults(true) }}
          whileTap={{ scale: 0.97 }}>
          See results
        </motion.button>
      </div>
    )
  }

  // ── Results (inline - full 3-stage flow in PaperResults) ──────────────────
  if (showResults) {
    // Normalise: ensure every question index has an entry; unanswered stays separate from incorrect
    const normalisedAnswers = normaliseTimedPaperAnswers(questions, answers)
    const normalisedScore = getAnswerMarksTotal(normalisedAnswers)
    navigate('/paper-results', { state: { score: normalisedScore, total: totalMarks, questions, answers: normalisedAnswers, timeUsed: getTimedPaperTimeUsed(paperDuration, remaining) } })
    return null
  }

  // ── Question screen ────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col h-full overflow-hidden relative" style={{ background: '#0b1121' }}>
      {/* Resume banner */}
      <AnimatePresence>
        {resumeBanner && (
          <motion.div
            className="absolute top-0 left-0 right-0 z-50 px-5 py-3 flex items-center justify-between"
            style={{ background: 'rgba(245,158,11,0.15)', borderBottom: '0.75px solid rgba(245,158,11,0.4)' }}
            initial={{ y: -60 }} animate={{ y: 0 }} exit={{ y: -60 }}>
            <div>
              <div className="text-xs font-bold" style={{ color: '#fbbf24' }}>You were away for a while</div>
              <div className="text-xs" style={{ color: '#a8b8cc' }}>Timer was paused. Continue or abandon?</div>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 rounded-[8px] text-xs font-bold"
                style={{ background: 'rgba(239,68,68,0.15)', color: '#ef4444' }}
                onClick={() => { localStorage.removeItem(STORAGE_KEY); navigate(-1) }}>
                Abandon
              </button>
              <button className="px-3 py-1.5 rounded-[8px] text-xs font-bold"
                style={{ background: '#6366f1', color: '#fff' }}
                onClick={() => setResumeBanner(false)}>
                Resume
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="px-4 pt-5 pb-3 shrink-0 flex items-center gap-3"
        style={{ borderBottom: '0.75px solid rgba(255,255,255,0.07)' }}>
        <button onClick={() => navigate(-1)}
          className="w-11 h-11 rounded-[12px] flex items-center justify-center shrink-0"
          style={{ background: 'rgba(255,255,255,0.07)', border: '0.75px solid rgba(255,255,255,0.1)' }}>
          <ArrowLeft size={18} color="#a8b8cc" />
        </button>
        <div className="flex-1 min-w-0">
          <div className="text-xs font-bold" style={{ color: '#f8fafc' }}>
            Exam-style Physics Paper
          </div>
          <div className="text-xs" style={{ color: '#8899b0' }}>
            Q{qIndex + 1}/{total} · {answeredCount} answered · Section {sectionInfo.section}
          </div>
        </div>
        {/* Timer hide toggle */}
        <button
          onClick={() => setHideTimer(v => !v)}
          className="w-11 h-11 rounded-[12px] flex items-center justify-center shrink-0"
          style={{ background: 'rgba(255,255,255,0.07)', border: '0.75px solid rgba(255,255,255,0.1)' }}
          aria-label={hideTimer ? 'Show timer' : 'Hide timer'}
        >
          {hideTimer
            ? <EyeSlash size={15} color="#8899b0" />
            : <Eye size={15} color="#8899b0" />
          }
        </button>
        {/* Pause / Resume button */}
        <button
          onClick={() => setPaused(v => !v)}
          className="px-2.5 py-3 rounded-[10px] flex items-center gap-1 shrink-0 text-xs font-bold"
          style={{
            background: paused ? 'rgba(34,197,94,0.15)' : 'rgba(18,26,47,0.9)',
            border: paused ? '0.75px solid rgba(34,197,94,0.4)' : '0.75px solid #1d293d',
            color: paused ? '#22c55e' : '#8899b0',
          }}
          aria-label={paused ? 'Resume paper' : 'Pause paper'}
        >
          {paused ? '▶' : '⏸'}
        </button>
        {!hideTimer && <TimerArc remaining={remaining} total={paperDuration} />}
        {hideTimer && (
          <div className="w-11 h-11 flex items-center justify-center rounded-full"
            style={{ background: 'rgba(18,26,47,0.9)', border: '0.75px solid #1d293d' }}>
            <span className="text-xs font-bold" style={{ color: '#475569' }}>—</span>
          </div>
        )}
      </div>

      {/* Progress bar */}
      <div className="h-0.5 shrink-0" style={{ background: '#1d293d' }}>
        <motion.div className="h-full"
          style={{ background: '#6366f1' }}
          animate={{ width: `${(answeredCount / total) * 100}%` }} />
      </div>

      {/* Pause overlay */}
      <AnimatePresence>
        {paused && (
          <motion.div
            className="absolute inset-0 z-40 flex items-center justify-center"
            style={{ background: 'rgba(11,17,33,0.82)', backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}>
            <motion.div
              className="px-8 py-6 rounded-[22px] text-center"
              style={{ background: 'rgba(18,26,47,0.98)', border: '1px solid #1d293d', maxWidth: 300 }}
              initial={{ scale: 0.92 }} animate={{ scale: 1 }} exit={{ scale: 0.92 }}>
              <div style={{ fontSize: 36, marginBottom: 10 }}>⏸</div>
              <div className="font-bold mb-1" style={{ color: '#f8fafc', fontSize: 16 }}>Paper paused</div>
              <p className="text-sm mb-4" style={{ color: '#8899b0' }}>Tap Resume when you're ready to continue.</p>
              <motion.button
                className="w-full py-3 rounded-[14px] font-bold text-sm"
                style={{ background: '#22c55e', color: '#fff' }}
                onClick={() => setPaused(false)}
                whileTap={{ scale: 0.97 }}>
                ▶ Resume
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Question content */}
      <div className="flex-1 overflow-y-auto px-5 pb-4 pt-4"
        style={{ minHeight: 0, filter: paused ? 'blur(6px)' : 'none', transition: 'filter 0.2s', pointerEvents: paused ? 'none' : 'auto' }}>
        {/* BUG-05: safe fallback if question is undefined (e.g. empty/corrupt question set) */}
        {!questions[qIndex] ? (
          <div className="flex items-center justify-center h-full py-16 text-sm" style={{ color: '#8899b0' }}>
            No question available.
          </div>
        ) : <>
        {/* Section label */}
        <div className="flex items-center justify-between mb-3">
          <span className="px-2 py-0.5 rounded-full text-xs font-bold"
            style={{ background: 'rgba(99,102,241,0.12)', border: '0.75px solid rgba(99,102,241,0.25)', color: '#818cf8' }}>
            Section {sectionInfo.section} - {sectionInfo.label}
          </span>
          <button
            className="flex items-center gap-1 px-3 py-1.5 rounded-[8px] text-xs font-semibold"
            style={{
              background: flags[qIndex] ? 'rgba(245,158,11,0.12)' : 'rgba(18,26,47,0.9)',
              border: flags[qIndex] ? '0.75px solid rgba(245,158,11,0.4)' : '0.75px solid #1d293d',
              color: flags[qIndex] ? '#f59e0b' : '#8899b0',
            }}
            onClick={toggleFlag}>
            <Flag size={11} /> {flags[qIndex] ? 'Flagged' : 'Flag'}
          </button>
        </div>

        {/* Question text */}
        <div className="mb-4">
          <p className="text-base font-semibold leading-snug" style={{ color: '#f8fafc' }}>{q.question}</p>
          {q.questionSubtitle && (
            <p className="text-xs mt-1" style={{ color: '#8899b0' }}>{q.questionSubtitle}</p>
          )}
          {(q.marks || q.steps?.length) && (
            <p className="text-xs mt-0.5 text-right font-semibold" style={{ color: '#a8b8cc' }}>
              [{q.marks || q.steps?.length} marks]
            </p>
          )}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={qIndex}
            initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.18 }}>
            {renderQuestion()}
          </motion.div>
        </AnimatePresence>
        </>}
      </div>

      {/* Bottom bar: palette toggle + next */}
      <div className="relative shrink-0" style={{ borderTop: '0.75px solid #1d293d' }}>
        <QuestionPalette
          questions={questions} answers={answers} flags={flags}
          currentIdx={qIndex} onJump={jumpTo}
          open={paletteOpen} onToggle={() => setPaletteOpen(v => !v)}
        />
        <div className="px-4 pt-3 flex items-center gap-3"
          style={{ background: 'rgba(11,17,33,0.98)', paddingBottom: 'calc(12px + var(--safe-bottom))' }}>
          <button
            className="flex items-center gap-2 px-4 py-3 rounded-[13px] text-sm font-semibold"
            style={{ background: 'rgba(18,26,47,0.9)', border: '0.75px solid #1d293d', color: '#a8b8cc' }}
            onClick={() => setPaletteOpen(v => !v)}>
            <span className="text-xs font-bold">{answeredCount}/{total}</span>
            {paletteOpen ? <CaretDown size={15} /> : <CaretUp size={15} />}
          </button>

          {flaggedCount > 0 && (
            <div className="flex items-center gap-1 px-2 py-1 rounded-[8px]"
              style={{ background: 'rgba(245,158,11,0.1)', border: '0.75px solid rgba(245,158,11,0.25)' }}>
              <Flag size={11} color="#f59e0b" />
              <span className="text-xs font-bold" style={{ color: '#f59e0b' }}>{flaggedCount}</span>
            </div>
          )}

          {/* Skip - always available, no score recorded */}
          {!completed && !isLast && (
            <motion.button
              className="px-4 py-3 rounded-[13px] text-sm font-semibold"
              style={{ background: 'rgba(18,26,47,0.9)', border: '0.75px solid #1d293d', color: '#8899b0' }}
              onClick={handleNext}
              whileTap={{ scale: 0.97 }}>
              Skip
            </motion.button>
          )}

          {/* Next / Submit - active only after answering */}
          <motion.button
            className="flex-1 py-3 rounded-[13px] text-sm font-bold"
            style={{
              background: completed ? '#6366f1' : '#1d293d',
              color: completed ? '#fff' : '#475569',
              boxShadow: completed ? '0 4px 16px rgba(99,102,241,0.35)' : 'none',
            }}
            onClick={completed ? handleNext : undefined}
            whileTap={completed ? { scale: 0.97 } : {}}>
            {isLast ? (completed ? 'Submit paper' : 'Answer to submit') : (completed ? 'Next →' : 'Answer to continue')}
          </motion.button>
        </div>
      </div>
    </div>
  )
}
