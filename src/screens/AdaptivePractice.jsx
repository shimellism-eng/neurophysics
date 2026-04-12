/**
 * AdaptivePractice — adaptive question bank practice mode.
 * Route: /practice/:topicId
 */
import { motion, AnimatePresence } from 'motion/react'
import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { ArrowLeft, Zap, TrendingUp, TrendingDown, Minus, ChevronRight, RotateCcw, BookmarkPlus, Check, Loader2, CheckCircle, XCircle, Lightbulb, AlertCircle } from 'lucide-react'
import { TOPICS, MODULES, PHYSICS_ONLY_TOPICS } from '../data/topics'
import { useAdaptive } from '../hooks/useAdaptive'
import { getNextQuestion } from '../data/questionBank/index'
import { getSelectedBoard } from '../utils/boardConfig'
import { supabase } from '../lib/supabase'

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
const API_BASE = import.meta.env.VITE_API_BASE || 'https://neurophysics.vercel.app'

function ExtendedQuestion({ q, onAnswer, moduleColor = '#6366f1' }) {
  const half = Math.ceil(q.marks / 2)
  const [answer, setAnswer] = useState('')
  const [status, setStatus] = useState('idle')   // idle | marking | marked | error
  const [result, setResult] = useState(null)
  const [selfScore, setSelfScore] = useState(null)

  const handleSubmit = async () => {
    if (answer.trim().length < 10) return
    setStatus('marking')
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 30000)
    try {
      const session = supabase ? (await supabase.auth.getSession()).data?.session : null
      if (!session?.access_token) { clearTimeout(timeout); setStatus('error'); return }
      const res = await fetch(`${API_BASE}/api/mark`, {
        method: 'POST',
        signal: controller.signal,
        headers: {
          'content-type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          question: q.question,
          studentAnswer: answer,
          markScheme: q.markScheme,
          marks: q.marks,
        }),
      })
      clearTimeout(timeout)
      const data = await res.json()
      if (data.error || !data.breakdown) { setStatus('error'); return }
      setResult(data)
      setStatus('marked')
    } catch {
      clearTimeout(timeout)
      setStatus('error')
    }
  }

  const handleContinue = () => onAnswer(result.marksAwarded >= half)
  const handleSelfScore = (pts) => { setSelfScore(pts); onAnswer(pts >= half) }

  const pct = result ? result.marksAwarded / q.marks : 0
  const scoreColor = pct >= 0.8 ? '#00bc7d' : pct >= 0.5 ? '#fbbf24' : '#ef4444'

  return (
    <div className="space-y-3">
      <AnimatePresence mode="wait">

        {/* Typing */}
        {status === 'idle' && (
          <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3">
            <textarea
              value={answer}
              onChange={e => setAnswer(e.target.value.slice(0, 600))}
              placeholder="Write your answer here… use key physics terms."
              rows={4}
              style={{
                width: '100%', background: 'rgba(18,26,47,0.9)',
                border: `1px solid ${answer.length >= 10 ? moduleColor + '60' : '#2d3e55'}`,
                borderRadius: 12, padding: '10px 12px', color: '#f8fafc',
                fontSize: 13, lineHeight: 1.6, resize: 'none', outline: 'none',
                fontFamily: 'inherit', transition: 'border-color 0.2s',
              }}
            />
            <div style={{ color: '#556677', fontSize: 10, textAlign: 'right', marginTop: -8 }}>
              {answer.length} / 600
            </div>
            <motion.button
              onClick={handleSubmit}
              disabled={answer.trim().length < 10}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-[12px] font-semibold text-sm"
              style={{
                background: answer.trim().length >= 10 ? `linear-gradient(135deg, ${moduleColor}, ${moduleColor}cc)` : 'rgba(255,255,255,0.05)',
                color: answer.trim().length >= 10 ? '#fff' : '#556677',
                cursor: answer.trim().length >= 10 ? 'pointer' : 'not-allowed',
              }}
              whileTap={answer.trim().length >= 10 ? { scale: 0.97 } : {}}>
              Submit for AI marking
            </motion.button>
          </motion.div>
        )}

        {/* Marking */}
        {status === 'marking' && (
          <motion.div key="marking" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-3 py-6">
            <Loader2 size={28} color={moduleColor} className="animate-spin" />
            <p className="text-sm" style={{ color: '#a8b8cc' }}>Mamo is marking your answer…</p>
          </motion.div>
        )}

        {/* Marked */}
        {status === 'marked' && result && (
          <motion.div key="marked" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
            {/* Score */}
            <motion.div className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-[14px]"
              style={{ background: `${scoreColor}12`, border: `1.5px solid ${scoreColor}40` }}
              initial={{ scale: 0.85 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 280, damping: 22 }}>
              <span className="text-xl font-black" style={{ color: scoreColor }}>{result.marksAwarded}</span>
              <span className="text-sm font-semibold" style={{ color: 'rgba(255,255,255,0.35)' }}>/ {q.marks} marks</span>
            </motion.div>

            {/* Breakdown */}
            <div className="rounded-[12px] overflow-hidden"
              style={{ background: 'rgba(18,26,47,0.9)', border: '0.75px solid #1d293d' }}>
              <div className="px-3 pt-3 pb-1">
                <p className="text-[10px] uppercase tracking-wide font-semibold" style={{ color: '#556677' }}>Breakdown</p>
              </div>
              <div className="px-3 pb-3 space-y-2.5 mt-1">
                {q.markScheme.map((point, i) => {
                  const item = result.breakdown[i] || { awarded: false, reason: '' }
                  return (
                    <motion.div key={i} className="flex items-start gap-2"
                      initial={{ opacity: 0, x: -4 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}>
                      {item.awarded
                        ? <CheckCircle size={15} color="#00bc7d" style={{ flexShrink: 0, marginTop: 1 }} />
                        : <XCircle size={15} color="#ef4444" style={{ flexShrink: 0, marginTop: 1 }} />
                      }
                      <div>
                        <p className="text-xs leading-relaxed" style={{ color: '#cad5e2' }}>
                          {point.replace(/\s*\(1\)\s*$/, '')}
                        </p>
                        {item.reason && (
                          <p className="text-[11px] mt-0.5" style={{ color: item.awarded ? '#00bc7d' : '#ef4444' }}>
                            {item.reason}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>

            {/* Feedback */}
            {result.feedback && (
              <div className="flex items-start gap-2 px-3 py-2.5 rounded-[10px]"
                style={{ background: 'rgba(253,199,0,0.07)', border: '0.75px solid rgba(253,199,0,0.2)' }}>
                <Lightbulb size={13} color="#fdc700" style={{ marginTop: 1, flexShrink: 0 }} />
                <p className="text-xs leading-relaxed" style={{ color: '#fdc700' }}>{result.feedback}</p>
              </div>
            )}

            {q.senNote && (
              <div className="px-3 py-2 rounded-[10px]"
                style={{ background: 'rgba(253,199,0,0.07)', border: '0.75px solid rgba(253,199,0,0.2)' }}>
                <span className="text-xs" style={{ color: '#fdc700' }}>💡 {q.senNote}</span>
              </div>
            )}

            <motion.button onClick={handleContinue}
              className="w-full flex items-center justify-center py-3 rounded-[12px] font-semibold text-sm"
              style={{ background: `linear-gradient(135deg, ${moduleColor}, ${moduleColor}cc)`, color: '#fff' }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}>
              Continue
            </motion.button>
          </motion.div>
        )}

        {/* Error fallback — self-mark */}
        {status === 'error' && (
          <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
            <div className="flex items-center gap-2 px-3 py-2 rounded-[10px]"
              style={{ background: 'rgba(239,68,68,0.08)', border: '0.75px solid rgba(239,68,68,0.25)' }}>
              <AlertCircle size={13} color="#ef4444" style={{ flexShrink: 0 }} />
              <p className="text-xs" style={{ color: '#ef4444' }}>AI marking unavailable — self-rate instead.</p>
            </div>
            {/* Show mark scheme */}
            {q.markScheme.map((m, i) => (
              <div key={i} className="flex items-start gap-2 px-3 py-2 rounded-[10px]"
                style={{ background: 'rgba(0,188,125,0.06)', border: '0.75px solid rgba(0,188,125,0.15)' }}>
                <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5"
                  style={{ background: 'rgba(0,188,125,0.2)', color: '#00bc7d' }}>{i + 1}</span>
                <span className="text-xs leading-relaxed" style={{ color: '#cad5e2' }}>{m}</span>
              </div>
            ))}
            {selfScore === null ? (
              <div>
                <div className="text-xs font-semibold mb-2 text-center" style={{ color: '#a8b8cc' }}>How many marks did you earn?</div>
                <div className="flex gap-2 justify-center flex-wrap">
                  {Array.from({ length: q.marks + 1 }, (_, i) => i).map(pts => (
                    <motion.button key={pts}
                      className="px-4 py-2 rounded-[10px] text-sm font-bold"
                      style={{ background: 'rgba(99,102,241,0.12)', border: '0.75px solid rgba(99,102,241,0.3)', color: '#818cf8' }}
                      onClick={() => handleSelfScore(pts)} whileTap={{ scale: 0.92 }}>
                      {pts}
                    </motion.button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center text-sm font-semibold py-2"
                style={{ color: selfScore >= q.marks ? '#00bc7d' : selfScore >= half ? '#fbbf24' : '#ef4444' }}>
                {selfScore}/{q.marks} marks
              </div>
            )}
            {q.senNote && (
              <div className="px-3 py-2 rounded-[10px]"
                style={{ background: 'rgba(253,199,0,0.07)', border: '0.75px solid rgba(253,199,0,0.2)' }}>
                <span className="text-xs" style={{ color: '#fdc700' }}>💡 {q.senNote}</span>
              </div>
            )}
          </motion.div>
        )}

      </AnimatePresence>
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

const getProgressLabel = (current, total) => {
  const pct = current / total;
  if (pct === 0) return "Let's go! 🚀";
  if (pct < 0.35) return 'Good start! ⚡';
  if (pct < 0.6) return 'Halfway there 💪';
  if (pct < 0.85) return 'Nearly done! 🔥';
  return 'Last few! 🏁';
}

// ── Main Screen ───────────────────────────────────────────────────────────────
export default function AdaptivePractice() {
  const { topicId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { reviewMode, maxQuestions } = location.state || {}
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
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState(null)
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
    const board = getSelectedBoard().id
    const q = getNextQuestion(topicId, currentTier, ids, course, board)
    if (!q) { setShowDone(true); return }
    setCurrentQ(q)
    setAnswered(false)
    setPrevTier(currentTier)
    start()
  }

  const handleAnswer = useCallback((correct) => {
    stop()
    setAnswered(true)
    setLastAnswerCorrect(correct)
    setSessionCount(c => c + 1)
    if (correct) setSessionCorrect(c => c + 1)
    submit(correct, ms, currentQ?.timeExpected || 60)
    if (currentQ) setSeenIds(ids => [...ids, currentQ.id])
  }, [stop, submit, currentQ, ms])

  const handleNext = () => {
    const nextCount = sessionCount  // sessionCount already incremented by handleAnswer
    if (reviewMode && nextCount >= (maxQuestions || 5)) {
      setShowDone(true)
      return
    }
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
    setTimeout(() => navigate(-1), 120)
  }

  if (!topic) return (
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

  // ── Results screen ──────────────────────────────────────────────────────────
  const reviewCap = reviewMode ? (maxQuestions || 5) : 20
  if (showDone || sessionCount >= reviewCap) {
    const pct = sessionCount > 0 ? Math.round((sessionCorrect / sessionCount) * 100) : 0
    const isReviewComplete = reviewMode && sessionCount >= reviewCap
    return (
      <div className="flex flex-col h-full overflow-hidden" style={{ background: '#080f1e' }}>
        <div className="px-5 pt-5">
          <button onClick={() => { clearSession(); navigate(-1) }}
            className="w-11 h-11 rounded-[12px] flex items-center justify-center"
            style={{ background: 'rgba(255,255,255,0.07)', border: '0.75px solid rgba(255,255,255,0.1)' }}>
            <ArrowLeft size={18} color="#a8b8cc" />
          </button>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center px-6 gap-5">
          {isReviewComplete ? (
            <div className="flex items-center gap-2 px-4 py-2 rounded-full"
              style={{ background: 'rgba(0,188,125,0.12)', border: '1px solid rgba(0,188,125,0.3)' }}>
              <Check size={14} color="#00bc7d" />
              <span className="text-sm font-bold" style={{ color: '#00bc7d' }}>Review complete</span>
            </div>
          ) : null}
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
    <div className="flex flex-col h-full overflow-hidden" style={{ background: '#080f1e' }}>

      {/* Header */}
      <div className="px-5 pt-5 pb-3 shrink-0 flex items-center gap-3 sticky top-0 z-10"
        style={{
          background: 'rgba(8,15,30,0.96)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '0.75px solid rgba(255,255,255,0.07)',
        }}>
        <button onClick={() => navigate(-1)}
          className="w-11 h-11 rounded-[12px] flex items-center justify-center shrink-0"
          style={{ background: 'rgba(255,255,255,0.07)', border: '0.75px solid rgba(255,255,255,0.1)' }}>
          <ArrowLeft size={18} color="#a8b8cc" />
        </button>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-bold truncate" style={{ color: moduleColor }}>
            {topic.title}
          </div>
          <div className="text-xs mt-0.5" style={{ color: '#64748b' }}>
            {sessionCount} answered · {sessionCorrect} correct
          </div>
          <span style={{ fontSize: 11, color: '#64748b', fontStyle: 'italic' }}>
            {getProgressLabel(sessionCount, reviewMode ? (maxQuestions || 5) : 20)}
          </span>
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
      <div className="flex-1 overflow-y-auto px-5 pt-4 pb-2" style={{ minHeight: 0 }}>
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

              {/* Adaptive reasoning label */}
              <p className="text-xs italic mb-3" style={{ color: '#a8b8cc' }}>
                {tier === 1 ? '📚 Revisiting — building foundations' : tier === 2 ? '🎯 Practising — consolidating understanding' : '🚀 Challenging — pushing for mastery'}
              </p>

              {/* Question text */}
              <p className="text-base font-semibold leading-snug mb-4" style={{ color: '#f8fafc' }}>
                {currentQ.question}
              </p>

              {/* Question component */}
              {currentQ.type === 'mcq' && <MCQQuestion q={currentQ} onAnswer={handleAnswer} />}
              {currentQ.type === 'calculation' && <CalcQuestion q={currentQ} onAnswer={handleAnswer} />}
              {(currentQ.type === 'short_answer' || currentQ.type === 'extended') && <ExtendedQuestion q={currentQ} onAnswer={handleAnswer} moduleColor={moduleColor} />}

              {/* Next button — shown after answering, no tier change indicator */}
              {answered && (
                <motion.div className="mt-4 space-y-2" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                  {/* Ask Mamo — only after incorrect answers */}
                  {lastAnswerCorrect === false && (
                    <motion.button
                      className="w-full flex items-center justify-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold"
                      style={{
                        background: 'rgba(99,102,241,0.15)',
                        border: '0.75px solid rgba(99,102,241,0.35)',
                        color: '#818cf8',
                      }}
                      onClick={() => navigate('/mamo', { state: {
                        questionContext: currentQ?.question || currentQ?.text || '',
                        topicContext: topic?.title || '',
                      }})}
                      whileTap={{ scale: 0.97 }}>
                      🤖 Ask Mamo
                    </motion.button>
                  )}
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
