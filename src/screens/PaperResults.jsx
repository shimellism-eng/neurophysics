/**
 * PaperResults - 3-stage results flow for TimedPaper
 * Stage 1: The Number  - grade range, confetti, time used
 * Stage 2: The Breakdown - section scores, marks heatmap
 * Stage 3: The Plan - weakest topics → lesson links
 */
import { motion, AnimatePresence } from 'motion/react'
import { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  Trophy, ChevronRight, ChevronLeft, BookOpen,
  BarChart3, Lightbulb, Clock, Target, Star, ArrowLeft,
} from 'lucide-react'

import { getSelectedBoard, CCEA_BOUNDARIES } from '../utils/boardConfig'

// ── Approximate grade boundary ranges (9-1 system) ───────────────────────────
const GRADE_RANGES = [
  { grade: '9', min: 0.85, label: 'Grade 9', color: '#a855f7', bg: 'rgba(168,85,247,0.15)', desc: 'Outstanding - top tier nationally' },
  { grade: '8', min: 0.75, label: 'Grade 8', color: '#6366f1', bg: 'rgba(99,102,241,0.15)', desc: 'Excellent - well above national average' },
  { grade: '7', min: 0.65, label: 'Grade 7', color: '#3b82f6', bg: 'rgba(59,130,246,0.15)', desc: 'Strong - above national average' },
  { grade: '6', min: 0.55, label: 'Grade 6', color: '#10b981', bg: 'rgba(16,185,129,0.15)', desc: 'Good - at or above national average' },
  { grade: '5', min: 0.44, label: 'Grade 5', color: '#f59e0b', bg: 'rgba(245,158,11,0.15)', desc: 'Standard pass' },
  { grade: '4', min: 0.33, label: 'Grade 4', color: '#f97316', bg: 'rgba(249,115,22,0.15)', desc: 'Pass - meets minimum standard' },
  { grade: '3', min: 0.20, label: 'Grade 3', color: '#ef4444', bg: 'rgba(239,68,68,0.15)', desc: 'Below pass - more revision needed' },
  { grade: 'U', min: 0,    label: 'Ungraded', color: '#64748b', bg: 'rgba(100,116,139,0.12)', desc: 'Ungraded' },
]

function getGrade(score, total) {
  const board = getSelectedBoard()
  const pct = score / total
  if (board.gradeSystem === 'A*-G') {
    const match = CCEA_BOUNDARIES.find(g => pct >= g.min)
    return match
      ? { grade: match.grade, label: `Grade ${match.grade}`, color: match.color, bg: match.bg, desc: match.desc }
      : { grade: 'U', label: 'Ungraded', color: '#64748b', bg: 'rgba(100,116,139,0.12)', desc: 'Ungraded' }
  }
  return GRADE_RANGES.find(g => pct >= g.min) || GRADE_RANGES[GRADE_RANGES.length - 1]
}

function getGradeScale() {
  const board = getSelectedBoard()
  if (board.gradeSystem === 'A*-G') {
    return CCEA_BOUNDARIES.slice(0, 7).map(g => ({
      grade: g.grade, min: g.min, label: `Grade ${g.grade}`,
      color: g.color, bg: g.bg, desc: g.desc,
    }))
  }
  return GRADE_RANGES.slice(0, 6)
}

// ── Section labels from question type ────────────────────────────────────────
function sectionOf(q) {
  if (q.type === 'equation-recall' || q.type === 'mcq') return 'A'
  if (q.type === 'rpa-error') return 'B'
  if (q.type === 'calculation') return 'B'
  if (q.type === 'calculation-chained') return 'C'
  if (q.type === 'graph' || q.type === 'diagram') return 'C'
  if (q.type === 'novel-context' || q.type === 'extended') return 'D'
  return 'B'
}

const SECTION_META = {
  A: { label: 'Section A - MCQ & Equation Recall', color: '#6366f1' },
  B: { label: 'Section B - Short Answer & RPA',    color: '#3b82f6' },
  C: { label: 'Section C - Calculations & Graphs', color: '#10b981' },
  D: { label: 'Section D - Extended Writing',      color: '#a855f7' },
}

// ── Confetti ──────────────────────────────────────────────────────────────────
function Confetti({ show }) {
  const canvasRef = useRef(null)
  const particles = useRef([])
  const raf       = useRef(null)

  useEffect(() => {
    if (!show) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    canvas.width  = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const colors = ['#a855f7', '#6366f1', '#3b82f6', '#10b981', '#f59e0b', '#ec4899']
    particles.current = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: -10 - Math.random() * 40,
      vx: (Math.random() - 0.5) * 3,
      vy: 2 + Math.random() * 3,
      size: 4 + Math.random() * 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      rot: Math.random() * 360,
      rotV: (Math.random() - 0.5) * 8,
      alpha: 1,
    }))

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      let alive = false
      particles.current.forEach(p => {
        p.x  += p.vx
        p.y  += p.vy
        p.rot += p.rotV
        p.vy += 0.05
        if (p.y > canvas.height * 0.6) p.alpha -= 0.02
        if (p.alpha > 0 && p.y < canvas.height) {
          alive = true
          ctx.save()
          ctx.globalAlpha = Math.max(0, p.alpha)
          ctx.translate(p.x, p.y)
          ctx.rotate((p.rot * Math.PI) / 180)
          ctx.fillStyle = p.color
          ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2)
          ctx.restore()
        }
      })
      if (alive) raf.current = requestAnimationFrame(draw)
    }
    raf.current = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(raf.current)
  }, [show])

  if (!show) return null
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full pointer-events-none"
      style={{ height: 280, zIndex: 0 }}
    />
  )
}

// ── Stage 1: The Number ───────────────────────────────────────────────────────
function StageNumber({ score, total, timeUsed, onNext }) {
  const navigate = useNavigate()
  const grade    = getGrade(score, total)
  const pct      = Math.round((score / total) * 100)
  const mins     = Math.floor(timeUsed / 60)
  const secs     = timeUsed % 60
  const timeStr  = `${mins}m ${secs}s`
  const celebrate = pct >= 75

  const countTo = score
  const [displayed, setDisplayed] = useState(0)
  useEffect(() => {
    let i = 0
    const iv = setInterval(() => {
      i++
      setDisplayed(i)
      if (i >= countTo) clearInterval(iv)
    }, 60)
    return () => clearInterval(iv)
  }, [countTo])

  return (
    <div className="flex flex-col h-full overflow-y-auto" style={{ paddingBottom: 'calc(var(--safe-bottom) + 24px)' }}>
      {/* Exit button */}
      <div className="px-5 pt-5 pb-2 flex">
        <button onClick={() => navigate('/learn')} className="w-11 h-11 rounded-[12px] flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.07)', border: '0.75px solid rgba(255,255,255,0.1)' }}>
          <ArrowLeft size={18} color="#a8b8cc" />
        </button>
      </div>
      {/* Hero */}
      <div className="relative flex flex-col items-center pt-12 pb-8 px-6 overflow-hidden" style={{ minHeight: 280 }}>
        <Confetti show={celebrate} />

        <motion.div
          className="relative z-10 flex flex-col items-center"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Grade badge */}
          <motion.div
            className="w-24 h-24 rounded-full flex items-center justify-center mb-4"
            style={{ background: grade.bg, border: `3px solid ${grade.color}` }}
            initial={{ scale: 0.5, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.2 }}
          >
            <span className="text-4xl font-black" style={{ color: grade.color }}>{grade.grade}</span>
          </motion.div>

          <p className="text-base font-semibold mb-1" style={{ color: grade.color }}>{grade.label}</p>
          <p className="text-sm text-center mb-6" style={{ color: '#64748b' }}>{grade.desc}</p>

          {/* Score counter */}
          <motion.div
            className="flex items-end gap-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <span className="text-5xl font-black tabular-nums" style={{ color: '#f8fafc' }}>{displayed}</span>
            <span className="text-2xl font-bold mb-1" style={{ color: '#475569' }}>/{total}</span>
          </motion.div>
          <p className="text-sm mt-1" style={{ color: '#64748b' }}>{pct}% - {timeStr} used</p>

          {/* ── Grade band pills row ── */}
          <motion.div
            className="flex flex-wrap justify-center gap-1.5 mt-4 px-2"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
          >
            {getGradeScale().map((g) => {
              const isMe = g.grade === grade.grade
              return (
                <div
                  key={g.grade}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold"
                  style={{
                    background: isMe ? '#6366f1' : 'rgba(255,255,255,0.06)',
                    color: isMe ? '#0a0a0f' : '#64748b',
                    border: isMe ? '1.5px solid #6366f1' : '1px solid rgba(255,255,255,0.08)',
                    fontWeight: isMe ? 700 : 500,
                  }}
                >
                  {getSelectedBoard().gradeSystem === 'A*-G' ? g.grade : `Grade ${g.grade}`}
                  <span style={{ opacity: 0.75 }}>≥{Math.round(g.min * 100)}%</span>
                </div>
              )
            })}
          </motion.div>

          {/* CCEA C* special note */}
          {getSelectedBoard().id === 'ccea' && grade.grade === 'C*' && (
            <motion.div
              className="mt-3 px-4 py-2 rounded-xl text-xs font-bold text-center"
              style={{ background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.4)', color: '#f59e0b' }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 }}
            >
              C* — Strong Pass! 🎉
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Grade scale */}
      <div className="px-6 pb-4">
        <div className="rounded-2xl overflow-hidden" style={{ border: '0.75px solid #1d293d' }}>
          {getGradeScale().map((g, i) => {
            const isMe = g.grade === grade.grade
            return (
              <motion.div
                key={g.grade}
                className="flex items-center justify-between px-4 py-2.5"
                style={{
                  background: isMe ? g.bg : i % 2 === 0 ? 'rgba(18,26,47,0.5)' : 'transparent',
                }}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.05 }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold w-5" style={{ color: g.color }}>{g.grade}</span>
                  <span className="text-xs" style={{ color: isMe ? '#f8fafc' : '#64748b' }}>
                    {Math.round(g.min * total)}+ marks
                  </span>
                </div>
                {isMe && (
                  <motion.div
                    className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full"
                    style={{ background: g.color }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 18, delay: 0.6 }}
                  >
                    <Target size={10} color="#fff" />
                    <span className="text-xs font-bold text-white">You</span>
                  </motion.div>
                )}
              </motion.div>
            )
          })}
        </div>
        <p className="text-xs text-center mt-3" style={{ color: '#334155' }}>
          Approximate grade boundaries for practice purposes — actual boundaries vary each year and by exam board.
        </p>
      </div>

      <div className="px-6 pb-8">
        <motion.button
          className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-white"
          style={{ background: '#6366f1' }}
          onClick={onNext}
          whileTap={{ scale: 0.97 }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          See Breakdown <ChevronRight size={18} />
        </motion.button>
      </div>
    </div>
  )
}

// ── Stage 2: The Breakdown ────────────────────────────────────────────────────
function StageBreakdown({ questions, answers, timeUsed, onNext, onBack }) {
  // Group by section
  const sections = {}
  questions.forEach((q, i) => {
    const sec = sectionOf(q)
    if (!sections[sec]) sections[sec] = { questions: [], answered: 0, marks: 0, possible: 0 }
    sections[sec].questions.push({ q, i })
    sections[sec].possible += (q.marks || 1)
    if (answers[i] !== undefined) {
      sections[sec].answered++
      // For auto-marked types, use answer.correct; for self-assessed use answer.selfScore
      const a = answers[i]
      if (typeof a?.correct === 'boolean') {
        sections[sec].marks += a.correct ? (q.marks || 1) : 0
      } else if (typeof a?.selfScore === 'number') {
        sections[sec].marks += a.selfScore
      } else if (typeof a?.score === 'number') {
        sections[sec].marks += a.score
      }
    }
  })

  const avgTime = timeUsed / Math.max(1, Object.values(answers).length)

  return (
    <div className="flex flex-col h-full overflow-y-auto" style={{ paddingBottom: 'calc(var(--safe-bottom) + 24px)' }}>
      <div className="px-6 pt-8 pb-4">
        <motion.div
          className="flex items-center gap-3 mb-6"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(99,102,241,0.15)' }}>
            <BarChart3 size={20} color="#6366f1" />
          </div>
          <div>
            <h2 className="text-lg font-bold" style={{ color: '#f8fafc' }}>The Breakdown</h2>
            <p className="text-xs" style={{ color: '#64748b' }}>Marks by section</p>
          </div>
        </motion.div>

        <div className="space-y-3 mb-6">
          {['A', 'B', 'C', 'D'].map((sec, idx) => {
            const data = sections[sec]
            if (!data) return null
            const meta = SECTION_META[sec]
            const pct  = data.possible > 0 ? data.marks / data.possible : 0
            return (
              <motion.div
                key={sec}
                className="rounded-2xl p-4"
                style={{ background: 'rgba(18,26,47,0.7)', border: '0.75px solid #1d293d' }}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.08 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold" style={{ color: meta.color }}>{meta.label}</span>
                  <span className="text-sm font-bold tabular-nums" style={{ color: '#f8fafc' }}>
                    {data.marks}/{data.possible}
                  </span>
                </div>
                {/* Progress bar */}
                <div className="h-2 rounded-full overflow-hidden" style={{ background: '#0f172a' }}>
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: meta.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${pct * 100}%` }}
                    transition={{ duration: 0.7, delay: 0.2 + idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>
                <div className="flex items-center justify-between mt-1.5">
                  <span className="text-xs" style={{ color: '#475569' }}>
                    {data.answered}/{data.questions.length} answered
                  </span>
                  <span className="text-xs font-semibold" style={{ color: pct >= 0.8 ? '#10b981' : pct >= 0.55 ? '#f59e0b' : '#ef4444' }}>
                    {Math.round(pct * 100)}%
                  </span>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Time card */}
        <motion.div
          className="rounded-2xl p-4 mb-6"
          style={{ background: 'rgba(18,26,47,0.7)', border: '0.75px solid #1d293d' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center gap-2 mb-1">
            <Clock size={16} color="#6366f1" />
            <span className="text-xs font-semibold" style={{ color: '#6366f1' }}>Time Analysis</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs" style={{ color: '#64748b' }}>Total time used</span>
            <span className="text-sm font-bold" style={{ color: '#f8fafc' }}>
              {Math.floor(timeUsed / 60)}m {timeUsed % 60}s
            </span>
          </div>
          <div className="flex items-center justify-between mt-1">
            <span className="text-xs" style={{ color: '#64748b' }}>Avg per answered question</span>
            <span className="text-sm font-bold" style={{ color: '#f8fafc' }}>
              {Math.round(avgTime)}s
            </span>
          </div>
          {avgTime < 45 && (
            <p className="text-xs mt-2" style={{ color: '#f59e0b' }}>
              ⚡ Pacing: fast - make sure you checked your working
            </p>
          )}
          {avgTime > 180 && (
            <p className="text-xs mt-2" style={{ color: '#f59e0b' }}>
              ⏱ Pacing: slow - under exam conditions, aim for ~90s per mark
            </p>
          )}
        </motion.div>
      </div>

      <div className="px-6 pb-8 flex gap-3">
        <button
          className="flex items-center gap-1.5 px-4 py-3 rounded-xl font-semibold text-sm"
          style={{ background: 'rgba(18,26,47,0.8)', color: '#94a3b8', border: '0.75px solid #1d293d' }}
          onClick={onBack}
        >
          <ChevronLeft size={16} /> Back
        </button>
        <motion.button
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-bold text-white"
          style={{ background: '#6366f1' }}
          onClick={onNext}
          whileTap={{ scale: 0.97 }}
        >
          The Plan <ChevronRight size={18} />
        </motion.button>
      </div>
    </div>
  )
}

// ── Stage 3: The Plan ─────────────────────────────────────────────────────────
const TOPIC_SLUGS = {
  'equation-recall': null,
  'calculation': null,
  'calculation-chained': null,
  'rpa-error': null,
  'novel-context': null,
  'extended': null,
  'graph': null,
}

function StageThePlan({ questions, answers, onDone }) {
  const navigate = useNavigate()
  const topGradeLabel = getSelectedBoard().gradeSystem === 'A*-G' ? 'Grade A*' : 'Grade 9'

  // Find weakest question topics - group by q.topic or q.rpaRef or fall back to type
  const topicStats = {}
  questions.forEach((q, i) => {
    const slug = q.topic || q.rpaRef || q.type || 'general'
    if (!topicStats[slug]) topicStats[slug] = { slug, label: q.topicLabel || slug, total: 0, correct: 0, type: q.type }
    topicStats[slug].total++
    const a = answers[i]
    if (a?.correct === true) topicStats[slug].correct++
    else if (typeof a?.selfScore === 'number' && a.selfScore > 0) topicStats[slug].correct += a.selfScore / (q.marks || 1)
  })

  const sorted = Object.values(topicStats)
    .filter(t => t.total > 0)
    .map(t => ({ ...t, pct: t.correct / t.total }))
    .sort((a, b) => a.pct - b.pct)

  const weakest = sorted.slice(0, 3)
  const strongest = sorted.slice(-2).reverse()

  const toExamSlug = (slug) => {
    return slug.replace(/_/g, '-')
  }

  return (
    <div className="flex flex-col h-full overflow-y-auto" style={{ paddingBottom: 'calc(var(--safe-bottom) + 24px)' }}>
      <div className="px-6 pt-8 pb-4">
        <motion.div
          className="flex items-center gap-3 mb-6"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(168,85,247,0.15)' }}>
            <Lightbulb size={20} color="#a855f7" />
          </div>
          <div>
            <h2 className="text-lg font-bold" style={{ color: '#f8fafc' }}>The Plan</h2>
            <p className="text-xs" style={{ color: '#64748b' }}>What to focus on next</p>
          </div>
        </motion.div>

        {/* Weakest areas */}
        {weakest.length > 0 && (
          <>
            <p className="text-xs font-bold mb-3 uppercase tracking-wider" style={{ color: '#ef4444' }}>
              Needs work
            </p>
            <div className="space-y-2 mb-6">
              {weakest.map((t, i) => (
                <motion.button
                  key={t.slug}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-2xl text-left"
                  style={{ background: 'rgba(239,68,68,0.08)', border: '0.75px solid rgba(239,68,68,0.25)' }}
                  onClick={() => navigate(`/exam/${toExamSlug(t.slug)}`)}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <div>
                    <p className="text-sm font-semibold" style={{ color: '#f8fafc' }}>
                      {t.label.replace(/_/g, ' ')}
                    </p>
                    <p className="text-xs" style={{ color: '#ef4444' }}>
                      {Math.round(t.pct * 100)}% correct · {t.total} question{t.total > 1 ? 's' : ''}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: 'rgba(239,68,68,0.15)', color: '#ef4444' }}>
                      Practice
                    </span>
                    <ChevronRight size={16} color="#ef4444" />
                  </div>
                </motion.button>
              ))}
            </div>
          </>
        )}

        {/* Strongest areas */}
        {strongest.length > 0 && (
          <>
            <p className="text-xs font-bold mb-3 uppercase tracking-wider" style={{ color: '#10b981' }}>
              Strengths
            </p>
            <div className="space-y-2 mb-6">
              {strongest.map((t, i) => (
                <motion.div
                  key={t.slug}
                  className="flex items-center justify-between px-4 py-3 rounded-2xl"
                  style={{ background: 'rgba(16,185,129,0.08)', border: '0.75px solid rgba(16,185,129,0.2)' }}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.06 }}
                >
                  <div>
                    <p className="text-sm font-semibold" style={{ color: '#f8fafc' }}>
                      {t.label.replace(/_/g, ' ')}
                    </p>
                    <p className="text-xs" style={{ color: '#10b981' }}>
                      {Math.round(t.pct * 100)}% correct
                    </p>
                  </div>
                  <Star size={16} color="#10b981" fill="#10b981" />
                </motion.div>
              ))}
            </div>
          </>
        )}

        {/* Study recommendations */}
        <motion.div
          className="rounded-2xl p-4 mb-6"
          style={{ background: 'rgba(99,102,241,0.08)', border: '0.75px solid rgba(99,102,241,0.2)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <BookOpen size={16} color="#6366f1" />
            <span className="text-xs font-bold" style={{ color: '#6366f1' }}>Study suggestions</span>
          </div>
          <ul className="space-y-2">
            {[
              'Redo weakest topics using exam practice before your next paper',
              'Time yourself on 6-mark questions - aim for 1 mark per minute',
              'Review RPA method cards in Practicals for error-direction questions',
              `Try the ${topGradeLabel} Challenge to target top-tier discriminator questions`,
            ].map((tip, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-xs mt-0.5 font-bold" style={{ color: '#6366f1' }}>{i + 1}.</span>
                <span className="text-xs" style={{ color: '#94a3b8' }}>{tip}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Grade 9 CTA */}
        <motion.button
          className="w-full flex items-center justify-between px-5 py-4 rounded-2xl mb-4"
          style={{ background: 'linear-gradient(135deg, rgba(168,85,247,0.2), rgba(99,102,241,0.2))', border: '1px solid rgba(168,85,247,0.4)' }}
          onClick={() => navigate('/grade9')}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
        >
          <div className="flex items-center gap-3">
            <Trophy size={22} color="#a855f7" />
            <div className="text-left">
              <p className="text-sm font-bold" style={{ color: '#f8fafc' }}>{topGradeLabel} Challenge</p>
              <p className="text-xs" style={{ color: '#a855f7' }}>Chained calcs · RPA errors · Novel context</p>
            </div>
          </div>
          <ChevronRight size={18} color="#a855f7" />
        </motion.button>
      </div>

      <div className="px-6 pb-8">
        <motion.button
          className="w-full py-4 rounded-2xl font-bold text-white"
          style={{ background: '#6366f1' }}
          onClick={onDone}
          whileTap={{ scale: 0.97 }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
        >
          Done
        </motion.button>
      </div>
    </div>
  )
}

// ── Main export ───────────────────────────────────────────────────────────────
export default function PaperResults() {
  const navigate  = useNavigate()
  const { state } = useLocation()
  const [stage, setStage] = useState(0)

  // Fallback if navigated directly without state
  const score     = state?.score     ?? 0
  const total     = state?.total     ?? 35
  const questions = state?.questions ?? []
  const answers   = state?.answers   ?? {}
  const timeUsed  = state?.timeUsed  ?? 0

  const stages = ['number', 'breakdown', 'plan']
  const STAGE_LABELS = ['The Number', 'The Breakdown', 'The Plan']

  return (
    <div
      className="flex flex-col"
      style={{ height: '100%', background: '#0b1121', color: '#f8fafc' }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3 flex-shrink-0"
        style={{ borderBottom: '0.75px solid #1d293d' }}
      >
        <button
          className="p-2 rounded-xl"
          style={{ background: 'rgba(18,26,47,0.8)' }}
          onClick={() => navigate('/')}
        >
          <ChevronLeft size={20} color="#94a3b8" />
        </button>

        <div className="flex items-center gap-2">
          {stages.map((_, i) => (
            <button
              key={i}
              className="flex items-center gap-1.5"
              onClick={() => setStage(i)}
            >
              <motion.div
                className="h-1.5 rounded-full"
                style={{ background: i === stage ? '#6366f1' : '#1d293d' }}
                animate={{ width: i === stage ? 24 : 8 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              />
            </button>
          ))}
        </div>

        <div className="w-10 flex justify-end">
          <span className="text-xs font-semibold" style={{ color: '#475569' }}>
            {stage + 1}/3
          </span>
        </div>
      </div>

      {/* Stage label */}
      <AnimatePresence mode="wait">
        <motion.div
          key={stage}
          className="px-6 pt-2 pb-0 flex-shrink-0"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 6 }}
          transition={{ duration: 0.18 }}
        >
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#475569' }}>
            {STAGE_LABELS[stage]}
          </span>
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="flex-1 overflow-hidden relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={stage}
            className="absolute inset-0"
            initial={{ opacity: 0, x: stage > 0 ? 32 : -32 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: stage > 0 ? -32 : 32 }}
            transition={{ type: 'spring', stiffness: 340, damping: 30 }}
          >
            {stage === 0 && (
              <StageNumber
                score={score}
                total={total}
                timeUsed={timeUsed}
                onNext={() => setStage(1)}
              />
            )}
            {stage === 1 && (
              <StageBreakdown
                questions={questions}
                answers={answers}
                timeUsed={timeUsed}
                onNext={() => setStage(2)}
                onBack={() => setStage(0)}
              />
            )}
            {stage === 2 && (
              <StageThePlan
                questions={questions}
                answers={answers}
                onDone={() => navigate('/')}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
