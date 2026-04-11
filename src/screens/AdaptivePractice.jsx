/**
 * AdaptivePractice — adaptive question bank practice mode.
 * Route: /practice/:topicId
 */
import { motion, AnimatePresence } from 'motion/react'
import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Zap, TrendingUp, TrendingDown, Minus, ChevronRight, RotateCcw, BookmarkPlus, Check } from 'lucide-react'
import { TOPICS, MODULES, PHYSICS_ONLY_TOPICS } from '../data/topics'
import { useAdaptive } from '../hooks/useAdaptive'
import { getNextQuestion } from '../data/questionBank/index'

const TIER_CONFIG = {
  1: { label: 'Tier 1', sub: 'Recall & MCQ', color: '#3b82f6', bg: 'rgba(59,130,246,0.12)' },
  2: { label: 'Tier 2', sub: 'Application',  color: '#f97316', bg: 'rgba(249,115,22,0.12)' },
  3: { label: 'Tier 3', sub: 'Mastery',      color: '#a855f7', bg: 'rgba(168,85,247,0.12)' },
}

// ── Timer hook ────────────────────────────────────────────────────────────────
function useTimer() {
  const [ms, setMs] = useState(0)
  const ref = useRef(null)
  const start = useCallback(() => {
    setMs(0)
    ref.current = setInterval(() => setMs(p => p + 100), 100)
  }, [])
  const stop = useCallback(() => {
    clearInterval(ref.current)
    return ms
  }, [ms])
  useEffect(() => () => clearInterval(ref.current), [])
  return { ms, start, stop }
}

// ── MCQ Question ──────────────────────────────────────────────────────────────
function MCQQuestion({ q, onAnswer }) {
  const [selected, setSelected] = useState(null)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    if (selected === null || submitted) return
    setSubmitted(true)
    onAnswer(selected === q.correctIndex)
  }

  return (
    <div className="space-y-3">
      <div className="space-y-2">
        {q.options.map((opt, i) => {
          const isCorrect = submitted && i === q.correctIndex
          const isWrong   = submitted && i === selected && selected !== q.correctIndex
          return (
            <motion.button key={i}
              className="w-full text-left px-4 py-3.5 rounded-[14px] text-sm font-medium"
              style={{
                background: isCorrect ? 'rgba(0,188,125,0.12)' : isWrong ? 'rgba(239,68,68,0.12)' : selected === i ? 'rgba(99,102,241,0.12)' : 'rgba(18,26,47,0.9)',
                border: isCorrect ? '1.5px solid #00bc7d' : isWrong ? '1.5px solid #ef4444' : selected === i ? '1.5px solid #6366f1' : '0.75px solid #1d293d',
                color: isCorrect ? '#00bc7d' : isWrong ? '#ef4444' : '#f8fafc',
              }}
              onClick={() => { if (!submitted) setSelected(i) }}
              whileTap={submitted ? {} : { scale: 0.98 }}>
              <span className="font-bold mr-3" style={{ color: 'rgba(255,255,255,0.35)' }}>
                {String.fromCharCode(65 + i)}
              </span>
              {opt}
            </motion.button>
          )
        })}
      </div>
      {!submitted && (
        <motion.button
          className="w-full py-3.5 rounded-[14px] text-sm font-bold"
          style={{ background: selected !== null ? '#6366f1' : '#1d293d', color: selected !== null ? '#fff' : '#64748b' }}
          onClick={handleSubmit} disabled={selected === null} whileTap={{ scale: 0.97 }}>
          Check answer
        </motion.button>
      )}
    </div>
  )
}

// ── Calculation Question ──────────────────────────────────────────────────────
function CalcQuestion({ q, onAnswer }) {
  const [value, setValue] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [correct, setCorrect] = useState(null)

  const handleSubmit = () => {
    if (!value || submitted) return
    const num = parseFloat(value)
    const [lo, hi] = q.acceptableRange || [q.answer * 0.98, q.answer * 1.02]
    const isCorrect = !isNaN(num) && num >= lo && num <= hi
    setCorrect(isCorrect)
    setSubmitted(true)
    onAnswer(isCorrect)
  }

  return (
    <div className="space-y-3">
      <div className="flex gap-2 items-center">
        <input
          type="number"
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder="Your answer"
          className="flex-1 px-4 py-3 rounded-[12px] text-sm font-mono"
          style={{
            background: 'rgba(18,26,47,0.9)',
            border: submitted ? (correct ? '1.5px solid #00bc7d' : '1.5px solid #ef4444') : '0.75px solid #1d293d',
            color: '#f8fafc',
            outline: 'none',
          }}
          disabled={submitted}
        />
        {q.unit && (
          <span className="px-3 py-3 rounded-[12px] text-sm font-semibold shrink-0"
            style={{ background: 'rgba(18,26,47,0.9)', border: '0.75px solid #1d293d', color: '#64748b' }}>
            {q.unit}
          </span>
        )}
      </div>
      {!submitted && (
        <motion.button
          className="w-full py-3.5 rounded-[14px] text-sm font-bold"
          style={{ background: value ? '#6366f1' : '#1d293d', color: value ? '#fff' : '#64748b' }}
          onClick={handleSubmit} disabled={!value} whileTap={{ scale: 0.97 }}>
          Check answer
        </motion.button>
      )}
      {submitted && (
        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
          className="space-y-2">
          <div className="px-3 py-2 rounded-[10px]"
            style={{ background: correct ? 'rgba(0,188,125,0.08)' : 'rgba(239,68,68,0.08)',
              border: `0.75px solid ${correct ? 'rgba(0,188,125,0.25)' : 'rgba(239,68,68,0.25)'}` }}>
            <div className="text-xs font-semibold mb-1" style={{ color: correct ? '#00bc7d' : '#ef4444' }}>
              {correct ? '✓ Correct!' : `✗ Answer: ${q.answer} ${q.unit || ''}`}
            </div>
          </div>
          {q.markScheme && q.markScheme.map((m, i) => (
            <div key={i} className="flex items-start gap-2 px-3 py-2 rounded-[10px]"
              style={{ background: 'rgba(18,26,47,0.9)', border: '0.75px solid #1d293d' }}>
              <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5"
                style={{ background: 'rgba(99,102,241,0.2)', color: '#818cf8' }}>{i + 1}</span>
              <span className="text-xs leading-relaxed" style={{ color: '#cad5e2' }}>{m}</span>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  )
}

// ── Extended/Short Answer Question ────────────────────────────────────────────
function ExtendedQuestion({ q, onAnswer }) {
  const [open, setOpen] = useState(false)
  const [selfScore, setSelfScore] = useState(null)
  const half = Math.ceil(q.marks / 2)

  return (
    <div className="space-y-3">
      <motion.button
        className="w-full text-left px-4 py-3 rounded-[14px] flex items-center justify-between"
        style={{ background: open ? 'rgba(0,188,125,0.08)' : 'rgba(18,26,47,0.9)',
          border: open ? '0.75px solid rgba(0,188,125,0.3)' : '0.75px solid #1d293d' }}
        onClick={() => setOpen(v => !v)} whileTap={{ scale: 0.98 }}>
        <span className="text-sm font-semibold" style={{ color: open ? '#00bc7d' : '#a8b8cc' }}>
          {open ? 'Mark scheme' : 'Reveal mark scheme'}
        </span>
        <motion.span animate={{ rotate: open ? 90 : 0 }} style={{ color: '#a8b8cc' }}>›</motion.span>
      </motion.button>
      <AnimatePresence>
        {open && (
          <motion.div className="space-y-2" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
            {q.markScheme.map((m, i) => (
              <div key={i} className="flex items-start gap-2 px-3 py-2 rounded-[10px]"
                style={{ background: 'rgba(0,188,125,0.06)', border: '0.75px solid rgba(0,188,125,0.15)' }}>
                <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5"
                  style={{ background: 'rgba(0,188,125,0.2)', color: '#00bc7d' }}>{i + 1}</span>
                <span className="text-xs leading-relaxed" style={{ color: '#cad5e2' }}>{m}</span>
              </div>
            ))}
            {selfScore === null && (
              <div className="pt-1">
                <div className="text-xs font-semibold mb-2 text-center" style={{ color: '#a8b8cc' }}>How many marks did you earn?</div>
                <div className="flex gap-2 justify-center flex-wrap">
                  {Array.from({ length: q.marks + 1 }, (_, i) => i).map(pts => (
                    <motion.button key={pts}
                      className="px-4 py-2 rounded-[10px] text-sm font-bold"
                      style={{ background: 'rgba(99,102,241,0.12)', border: '0.75px solid rgba(99,102,241,0.3)', color: '#818cf8' }}
                      onClick={() => { setSelfScore(pts); onAnswer(pts >= half) }}
                      whileTap={{ scale: 0.92 }}>
                      {pts}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}
            {selfScore !== null && (
              <div className="text-center text-sm font-semibold py-2"
                style={{ color: selfScore >= q.marks ? '#00bc7d' : selfScore >= half ? '#fbbf24' : '#ef4444' }}>
                {selfScore}/{q.marks} marks
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      {q.senNote && (
        <div className="px-3 py-2 rounded-[10px]"
          style={{ background: 'rgba(253,199,0,0.07)', border: '0.75px solid rgba(253,199,0,0.2)' }}>
          <span className="text-xs" style={{ color: '#fdc700' }}>💡 {q.senNote}</span>
        </div>
      )}
    </div>
  )
}

// ── Tier change indicator ──────────────────────────────────────────────────────
function TierChange({ from, to }) {
  if (from === to) return (
    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
      style={{ background: 'rgba(255,255,255,0.06)', border: '0.75px solid rgba(255,255,255,0.1)' }}>
      <Minus size={12} color="#64748b" />
      <span className="text-xs font-semibold" style={{ color: '#64748b' }}>Same tier</span>
    </div>
  )
  if (to > from) return (
    <motion.div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
      style={{ background: 'rgba(0,188,125,0.1)', border: '0.75px solid rgba(0,188,125,0.3)' }}
      initial={{ scale: 0.8 }} animate={{ scale: [0.8, 1.1, 1] }}>
      <TrendingUp size={12} color="#00bc7d" />
      <span className="text-xs font-bold" style={{ color: '#00bc7d' }}>Tier up! → Tier {to}</span>
    </motion.div>
  )
  return (
    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
      style={{ background: 'rgba(239,68,68,0.1)', border: '0.75px solid rgba(239,68,68,0.3)' }}>
      <TrendingDown size={12} color="#ef4444" />
      <span className="text-xs font-semibold" style={{ color: '#ef4444' }}>Tier down → Tier {to}</span>
    </div>
  )
}

// ── Session persistence key ───────────────────────────────────────────────────
const sessionKey = (topicId) => `neurophysics_practice_session_${topicId}`

// ── Main Screen ───────────────────────────────────────────────────────────────
export default function AdaptivePractice() {
  const { topicId } = useParams()
  const navigate = useNavigate()
  const topic = TOPICS[topicId]
  const mod = MODULES.find(m => m.topics.includes(topicId))
  const moduleColor = topic?.moduleColor || mod?.color || '#6366f1'

  const { tier, streak, totalAttempts, submit, reset } = useAdaptive(topicId)
  const { ms, start, stop } = useTimer()

  const [courseFilter, setCourseFilter] = useState('all')
  const [savedConfirm, setSavedConfirm] = useState(false)
  const [sessionCount, setSessionCount] = useState(0)
  const [sessionCorrect, setSessionCorrect] = useState(0)
  const [seenIds, setSeenIds] = useState([])
  const [currentQ, setCurrentQ] = useState(null)
  const [answered, setAnswered] = useState(false)
  const [prevTier, setPrevTier] = useState(tier)
  const [showDone, setShowDone] = useState(false)

  // ── Save session after every answer ────────────────────────────────────────
  useEffect(() => {
    if (sessionCount > 0) {
      try {
        localStorage.setItem(sessionKey(topicId), JSON.stringify({
          sessionCount, sessionCorrect, seenIds, savedAt: Date.now(),
        }))
      } catch {}
    }
  }, [sessionCount, sessionCorrect, seenIds, topicId])

  // ── Restore session + load first question on mount ──────────────────────────
  useEffect(() => {
    let initialIds = []
    let initialCount = 0
    let initialCorrect = 0
    try {
      const raw = localStorage.getItem(sessionKey(topicId))
      if (raw) {
        const saved = JSON.parse(raw)
        const age = Date.now() - (saved.savedAt || 0)
        if (age < 24 * 60 * 60 * 1000) {          // within 24 h
          initialIds    = saved.seenIds    || []
          initialCount  = saved.sessionCount  || 0
          initialCorrect = saved.sessionCorrect || 0
          setSeenIds(initialIds)
          setSessionCount(initialCount)
          setSessionCorrect(initialCorrect)
        }
      }
    } catch {}
    loadQuestion(initialIds, courseFilter, tier)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ── Internal question loader (accepts explicit values to avoid stale closures)
  function loadQuestion(ids, course, currentTier) {
    const q = getNextQuestion(topicId, currentTier, ids, course)
    if (!q) { setShowDone(true); return }
    setCurrentQ(q)
    setAnswered(false)
    setPrevTier(currentTier)
    start()
  }

  const handleAnswer = useCallback((correct) => {
    stop()
    setAnswered(true)
    setSessionCount(c => c + 1)
    if (correct) setSessionCorrect(c => c + 1)
    submit(correct, ms, currentQ?.timeExpected || 60)
    if (currentQ) setSeenIds(ids => [...ids, currentQ.id])
  }, [stop, submit, currentQ, ms])

  const handleNext = () => {
    loadQuestion([...seenIds, currentQ?.id].filter(Boolean), courseFilter, tier)
  }

  // ── Course filter change ────────────────────────────────────────────────────
  const handleCourseFilter = (newCourse) => {
    setCourseFilter(newCourse)
    setSeenIds([])
    setAnswered(false)
    loadQuestion([], newCourse, tier)
  }

  // ── Clear saved session ─────────────────────────────────────────────────────
  const clearSession = () => {
    try { localStorage.removeItem(sessionKey(topicId)) } catch {}
  }

  // ── Save & exit ─────────────────────────────────────────────────────────────
  const handleSaveAndExit = () => {
    try {
      localStorage.setItem(sessionKey(topicId), JSON.stringify({
        sessionCount, sessionCorrect, seenIds, savedAt: Date.now(),
      }))
    } catch {}
    setSavedConfirm(true)
    setTimeout(() => navigate(-1), 700)
  }

  if (!topic) return (
    <div className="flex items-center justify-center h-full" style={{ color: '#a8b8cc', background: '#0b1121' }}>
      Topic not found
    </div>
  )

  // ── Results screen ──────────────────────────────────────────────────────────
  if (showDone || sessionCount >= 20) {
    const pct = sessionCount > 0 ? Math.round((sessionCorrect / sessionCount) * 100) : 0
    return (
      <div className="flex flex-col h-full overflow-hidden" style={{ background: '#0b1121' }}>
        <div className="px-5 pt-5">
          <button onClick={() => { clearSession(); navigate(-1) }}
            className="w-11 h-11 rounded-[12px] flex items-center justify-center"
            style={{ background: 'rgba(18,26,47,0.9)', border: '0.75px solid #1d293d' }}>
            <ArrowLeft size={18} color="#a8b8cc" />
          </button>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center px-6 gap-5">
          <div className="text-5xl">{pct >= 80 ? '🏆' : pct >= 60 ? '⭐' : '📚'}</div>
          <div className="text-center">
            <div className="text-3xl font-black" style={{ color: '#f8fafc' }}>{sessionCorrect}/{sessionCount}</div>
            <div className="text-lg font-semibold mt-1" style={{ color: moduleColor }}>{pct}% accuracy</div>
            <div className="text-sm mt-2" style={{ color: '#64748b' }}>{topic.title}</div>
          </div>
          <div className="flex gap-3 w-full">
            <motion.button
              className="flex-1 py-3.5 rounded-[14px] text-sm font-bold flex items-center justify-center gap-2"
              style={{ background: 'rgba(255,255,255,0.06)', border: '0.75px solid rgba(255,255,255,0.1)', color: '#a8b8cc' }}
              onClick={() => {
                clearSession()
                reset()
                setSessionCount(0); setSessionCorrect(0); setSeenIds([])
                setShowDone(false)
                loadQuestion([], courseFilter, tier)
              }}
              whileTap={{ scale: 0.96 }}>
              <RotateCcw size={14} /> Restart
            </motion.button>
            <motion.button
              className="flex-1 py-3.5 rounded-[14px] text-sm font-bold"
              style={{ background: moduleColor, color: '#fff' }}
              onClick={() => { clearSession(); navigate(-1) }}
              whileTap={{ scale: 0.96 }}>
              Done
            </motion.button>
          </div>
        </div>
      </div>
    )
  }

  // ── Practice screen ─────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col h-full overflow-hidden" style={{ background: '#0b1121' }}>

      {/* Header */}
      <div className="px-5 pt-5 pb-3 shrink-0 flex items-center gap-3"
        style={{ borderBottom: '0.75px solid #1d293d' }}>
        <button onClick={() => navigate(-1)}
          className="w-11 h-11 rounded-[12px] flex items-center justify-center shrink-0"
          style={{ background: 'rgba(18,26,47,0.9)', border: '0.75px solid #1d293d' }}>
          <ArrowLeft size={18} color="#a8b8cc" />
        </button>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-bold truncate" style={{ color: moduleColor }}>
            {topic.title}
          </div>
          <div className="text-xs mt-0.5" style={{ color: '#64748b' }}>
            {sessionCount} answered · {sessionCorrect} correct
          </div>
        </div>
      </div>

      {/* Course filter + streak row */}
      <div className="px-5 pt-3 pb-1 shrink-0 flex items-center justify-between gap-3">
        {/* Combined / Physics filter */}
        <div className="flex gap-2">
          {[
            { id: 'all',      label: 'Physics' },
            { id: 'combined', label: 'Combined' },
          ].map(f => (
            <button key={f.id} type="button"
              className="px-3 py-1.5 rounded-full text-xs font-bold"
              style={{
                background: courseFilter === f.id ? `${moduleColor}22` : 'rgba(255,255,255,0.04)',
                border: courseFilter === f.id ? `1px solid ${moduleColor}55` : '1px solid rgba(255,255,255,0.08)',
                color: courseFilter === f.id ? moduleColor : 'rgba(255,255,255,0.35)',
              }}
              onClick={() => handleCourseFilter(f.id)}>
              {f.label}
            </button>
          ))}
        </div>

        {/* Streak — no tier mention */}
        {streak > 0 && (
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-xs font-semibold" style={{ color: '#00bc7d' }}>
              🔥 {streak} in a row
            </span>
          </div>
        )}
      </div>

      {/* Question content */}
      <div className="flex-1 overflow-y-auto px-5 pt-4 pb-2">
        {currentQ && (
          <AnimatePresence mode="wait">
            <motion.div key={currentQ.id}
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.18 }}>

              {/* Question type badge — neutral colour, no tier info */}
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2.5 py-1 rounded-full text-xs font-bold"
                  style={{ background: 'rgba(99,102,241,0.1)', border: '0.75px solid rgba(99,102,241,0.25)', color: '#818cf8' }}>
                  {currentQ.type === 'mcq' ? '⚡ Multiple choice' : currentQ.type === 'calculation' ? '🔢 Calculation' : currentQ.type === 'extended' ? '✍️ Extended' : '💬 Short answer'}
                </span>
                <span className="text-xs" style={{ color: '#64748b' }}>
                  {currentQ.marks} mark{currentQ.marks !== 1 ? 's' : ''}
                </span>
              </div>

              {/* Question text */}
              <p className="text-base font-semibold leading-snug mb-4" style={{ color: '#f8fafc' }}>
                {currentQ.question}
              </p>

              {/* Question component */}
              {currentQ.type === 'mcq' && <MCQQuestion q={currentQ} onAnswer={handleAnswer} />}
              {currentQ.type === 'calculation' && <CalcQuestion q={currentQ} onAnswer={handleAnswer} />}
              {(currentQ.type === 'short_answer' || currentQ.type === 'extended') && <ExtendedQuestion q={currentQ} onAnswer={handleAnswer} />}

              {/* Next button — shown after answering, no tier change indicator */}
              {answered && (
                <motion.div className="mt-4" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                  <motion.button
                    className="w-full py-4 rounded-[16px] text-base font-bold flex items-center justify-center gap-2"
                    style={{ background: `linear-gradient(135deg, ${moduleColor}, ${moduleColor}cc)`, color: '#fff' }}
                    onClick={handleNext} whileTap={{ scale: 0.97 }}>
                    Next question <ChevronRight size={18} />
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        )}

        {/* No questions available */}
        {!currentQ && !showDone && (
          <div className="flex flex-col items-center justify-center h-full gap-4 pt-16">
            <div className="text-4xl">📚</div>
            <div className="text-center">
              <div className="text-base font-bold" style={{ color: '#f8fafc' }}>No questions yet</div>
              <div className="text-sm mt-1" style={{ color: '#64748b' }}>
                Questions for this topic are coming soon.
              </div>
            </div>
            <motion.button
              className="px-6 py-3 rounded-[14px] text-sm font-bold"
              style={{ background: moduleColor, color: '#fff' }}
              onClick={() => navigate(-1)} whileTap={{ scale: 0.97 }}>
              Go back
            </motion.button>
          </div>
        )}
      </div>

      {/* Save & come back later footer */}
      <div className="shrink-0 px-5 pt-2 pb-6" style={{ borderTop: '0.75px solid rgba(255,255,255,0.05)' }}>
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
              <motion.div key="saved" className="flex items-center gap-2"
                initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}>
                <Check size={15} color="#00bc7d" strokeWidth={2.5} />
                <span className="text-sm font-semibold" style={{ color: '#00bc7d' }}>Progress saved</span>
              </motion.div>
            ) : (
              <motion.div key="save" className="flex items-center gap-2"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <BookmarkPlus size={15} color="rgba(255,255,255,0.35)" strokeWidth={2} />
                <span className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.35)' }}>
                  Save &amp; come back later
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </div>
  )
}
