import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { ChevronDown, ChevronRight, CheckCircle, Lock, RotateCcw, Target } from 'lucide-react'
import { MODULES, TOPICS } from '../data/topics'
import { useProgress } from '../hooks/useProgress'
import { useStudyPlan } from '../hooks/useStudyPlan'
import { getSelectedBoard } from '../utils/boardConfig'
import PageHeader from '../components/PageHeader'

// ── helpers ───────────────────────────────────────────────────────────────────
function fmtDate(d) {
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
}

const STATUS_THEME = {
  green:   { color: '#22c55e', bg: 'rgba(34,197,94,0.07)',   border: 'rgba(34,197,94,0.2)'  },
  amber:   { color: '#f59e0b', bg: 'rgba(245,158,11,0.07)',  border: 'rgba(245,158,11,0.22)' },
  red:     { color: '#ef4444', bg: 'rgba(239,68,68,0.07)',   border: 'rgba(239,68,68,0.22)' },
  no_date: { color: '#6366f1', bg: 'rgba(99,102,241,0.07)',  border: 'rgba(99,102,241,0.2)' },
  passed:  { color: '#94a3b8', bg: 'rgba(148,163,184,0.06)', border: 'rgba(148,163,184,0.15)' },
}

// ── Donut SVG ─────────────────────────────────────────────────────────────────
function Donut({ daysLeft, weeksLeft, color }) {
  const r = 32, cxy = 40, circ = 2 * Math.PI * r
  const pct = Math.min(1, (daysLeft || 0) / 56)
  const dashOffset = circ * (1 - pct)
  return (
    <svg width={80} height={80}>
      <circle cx={cxy} cy={cxy} r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth={6}/>
      <circle cx={cxy} cy={cxy} r={r} fill="none" stroke={color} strokeWidth={6}
        strokeDasharray={circ} strokeDashoffset={dashOffset}
        strokeLinecap="round" transform={`rotate(-90 ${cxy} ${cxy})`}/>
      <text x={cxy} y={cxy - 4} textAnchor="middle" fontSize={16} fontWeight="800" fill={color}>{weeksLeft}</text>
      <text x={cxy} y={cxy + 12} textAnchor="middle" fontSize={9} fontWeight="600" fill="rgba(255,255,255,0.4)">
        {weeksLeft === 1 ? 'week' : 'weeks'}
      </text>
    </svg>
  )
}

// ── Week Card ─────────────────────────────────────────────────────────────────
function WeekCard({ week, isOpen, onToggle, navigate, progress }) {
  const board = getSelectedBoard()

  const weekLabel = week.status === 'current'
    ? 'This week'
    : week.weekIndex === 1 ? 'Next week'
    : `Week ${week.weekIndex + 1}`

  const dateRange = `${fmtDate(week.weekStart)} – ${fmtDate(week.weekEnd)}`

  // Exam week card
  if (week.type === 'exam_week') {
    return (
      <motion.div
        className="rounded-[20px] px-5 py-4"
        style={{
          background: 'linear-gradient(135deg, rgba(99,102,241,0.12), rgba(99,102,241,0.06))',
          border: '1px solid rgba(99,102,241,0.3)',
        }}
        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-[12px] flex items-center justify-center shrink-0"
            style={{ background: 'rgba(99,102,241,0.18)', fontSize: 20 }}>🎯</div>
          <div className="flex-1 min-w-0">
            <div className="font-bold" style={{ color: '#818cf8', fontSize: 14 }}>Exam Week</div>
            <div className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>{dateRange}</div>
          </div>
        </div>
        <div className="mt-3 rounded-[14px] px-4 py-3"
          style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)' }}>
          <p className="text-xs" style={{ color: '#a5b4fc' }}>
            No new topics this week — revisit your weakest areas, practise exam technique, and rest well.
          </p>
        </div>
      </motion.div>
    )
  }

  // Study week card
  const isCurrent  = week.status === 'current'
  const isComplete = week.isComplete
  const borderColor = isCurrent ? '#00d4ff' : isComplete ? 'rgba(34,197,94,0.3)' : 'rgba(255,255,255,0.07)'
  const bgColor     = isCurrent ? 'rgba(0,212,255,0.05)' : isComplete ? 'rgba(34,197,94,0.04)' : 'rgba(255,255,255,0.02)'

  return (
    <motion.div
      className="rounded-[20px] overflow-hidden"
      style={{ background: bgColor, border: `1px solid ${borderColor}` }}
      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
      transition={{ delay: week.weekIndex * 0.04 }}>

      {/* Card header — always visible */}
      <button
        className="w-full flex items-center gap-3 px-5 py-4"
        onClick={onToggle}>

        {/* Status dot / check */}
        <div className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
          style={{
            background: isComplete ? 'rgba(34,197,94,0.15)' : isCurrent ? 'rgba(0,212,255,0.12)' : 'rgba(255,255,255,0.05)',
          }}>
          {isComplete
            ? <CheckCircle size={16} color="#22c55e" />
            : isCurrent
              ? <Target size={16} color="#00d4ff" />
              : <span style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.3)' }}>
                  {week.weekIndex + 1}
                </span>}
        </div>

        <div className="flex-1 min-w-0 text-left">
          <div className="flex items-center gap-2">
            <span className="font-bold" style={{ color: isCurrent ? '#00d4ff' : '#f8fafc', fontSize: 14 }}>
              {weekLabel}
            </span>
            {isCurrent && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold"
                style={{ background: 'rgba(0,212,255,0.15)', color: '#00d4ff' }}>NOW</span>
            )}
          </div>
          <div className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.3)' }}>
            {dateRange} · {week.topicIds.length} topic{week.topicIds.length !== 1 ? 's' : ''}
            {week.masteredInBatch > 0 && ` · ${week.masteredInBatch} done`}
          </div>
        </div>

        {/* Progress mini-bar */}
        <div className="flex flex-col items-end gap-1 shrink-0">
          {week.topicIds.length > 0 && (
            <div className="w-16 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.07)' }}>
              <div className="h-full rounded-full"
                style={{
                  width: `${Math.round((week.masteredInBatch / week.topicIds.length) * 100)}%`,
                  background: isComplete ? '#22c55e' : isCurrent ? '#00d4ff' : '#6366f1',
                }}/>
            </div>
          )}
          <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown size={16} color="rgba(255,255,255,0.3)" />
          </motion.div>
        </div>
      </button>

      {/* Expandable topic list */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}>
            <div className="px-4 pb-4 space-y-2">
              {week.topicIds.map(id => {
                const topic  = TOPICS[id]
                const mod    = MODULES.find(m => m.topics.includes(id))
                const done   = progress[id]?.mastered
                const review = progress[id]?.mastered && progress[id]?.nextReviewAt <= Date.now()

                const hasLesson = topic?.hook || (topic?.lessonSteps?.length > 0)
                const route = hasLesson ? `/lesson/${id}` : `/practice/${id}`

                return (
                  <motion.button
                    key={id}
                    className="w-full flex items-center gap-3 rounded-[14px] px-4 py-3 text-left"
                    style={{
                      background: done ? 'rgba(34,197,94,0.06)' : `${mod?.color || '#6366f1'}0d`,
                      border: `1px solid ${done ? 'rgba(34,197,94,0.18)' : `${mod?.color || '#6366f1'}22`}`,
                    }}
                    onClick={() => navigate(route)}
                    whileTap={{ scale: 0.97 }}>

                    <div className="shrink-0">
                      {done
                        ? review
                          ? <RotateCcw size={14} color="#f59e0b" />
                          : <CheckCircle size={14} color="#22c55e" />
                        : <Lock size={14} color="rgba(255,255,255,0.25)" />}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold truncate"
                        style={{ color: done ? '#86efac' : '#f8fafc' }}>
                        {topic?.title || id}
                      </div>
                      {mod && (
                        <div className="text-xs mt-0.5" style={{ color: mod.color, opacity: 0.7 }}>
                          {mod.name}
                        </div>
                      )}
                    </div>

                    <ChevronRight size={14} color="rgba(255,255,255,0.2)" />
                  </motion.button>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ── Screen ────────────────────────────────────────────────────────────────────
export default function StudyPlanScreen() {
  const navigate  = useNavigate()
  const { progress } = useProgress()
  const board     = getSelectedBoard()

  const [paceOverride, setPaceOverride] = useState(
    () => parseInt(localStorage.getItem('np_pace_override') || '0')
  )

  const plan = useStudyPlan(progress, paceOverride)

  // Default open: current week (or 0)
  const currentIdx = plan.weeklyPlan._currentWeekIndex ?? 0
  const [openWeek, setOpenWeek] = useState(currentIdx)

  const activePace = plan.weeklyPlan._topicsPerWeek || 0

  const setPace = useCallback((val) => {
    const clamped = Math.min(10, Math.max(1, val))
    setPaceOverride(clamped)
    localStorage.setItem('np_pace_override', String(clamped))
  }, [])

  const resetPace = useCallback(() => {
    setPaceOverride(0)
    localStorage.removeItem('np_pace_override')
  }, [])

  const s = STATUS_THEME[plan.examStatus] || STATUS_THEME.no_date

  return (
    <div
      className="flex flex-col h-full overflow-y-auto"
      style={{ background: '#080f1e', paddingBottom: 'calc(96px + env(safe-area-inset-bottom, 0px))' }}>

      {/* Header */}
      <PageHeader
        title="Study Plan"
        subtitle={board.name}
        onBack={() => navigate(-1)}
      />

      <div className="px-5 pt-5 space-y-4">

        {/* ── No exam date ── */}
        {plan.examStatus === 'no_date' && (
          <motion.div className="rounded-[22px] px-5 py-8 text-center"
            style={{ background: s.bg, border: `1px solid ${s.border}` }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>📅</div>
            <div className="font-bold mb-1" style={{ color: '#f8fafc', fontSize: 16 }}>
              Set your exam date first
            </div>
            <p className="text-sm mb-4" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Once you add your exam date, we'll build a personalised week-by-week plan.
            </p>
            <button
              onClick={() => navigate('/settings')}
              className="px-6 py-2.5 rounded-full font-bold text-sm"
              style={{ background: '#6366f1', color: '#fff' }}>
              Go to Settings →
            </button>
          </motion.div>
        )}

        {/* ── Exam passed ── */}
        {plan.examStatus === 'passed' && (
          <div className="rounded-[22px] px-5 py-6 text-center"
            style={{ background: s.bg, border: `1px solid ${s.border}` }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🎓</div>
            <div className="font-bold" style={{ color: '#f8fafc', fontSize: 16 }}>Exam date has passed</div>
            <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Update your exam date in Settings to start a new plan.
            </p>
          </div>
        )}

        {/* ── Active plan ── */}
        {plan.examStatus !== 'no_date' && plan.examStatus !== 'passed' && (
          <>
            {/* Hero: donut + stats */}
            <motion.div className="rounded-[22px] px-5 py-5"
              style={{ background: s.bg, border: `1px solid ${s.border}` }}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex items-center gap-4">
                <Donut daysLeft={plan.daysLeft} weeksLeft={plan.weeksLeft} color={s.color} />
                <div className="flex-1 min-w-0">
                  <div className="font-bold" style={{ color: s.color, fontSize: 18, letterSpacing: '-0.02em' }}>
                    {plan.weeksLeft} week{plan.weeksLeft !== 1 ? 's' : ''} left
                  </div>
                  <div className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>
                    {plan.masteredCount} of {plan.totalTopics} topics mastered
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>
                    {plan.remainingCount} to go · {plan.neededPerDay}/day needed
                  </div>
                  <div className="mt-2 text-xs font-bold"
                    style={{ color: plan.onTrack ? '#22c55e' : '#f59e0b' }}>
                    {plan.onTrack ? '✅ On track' : '⚠️ Pick up the pace'}
                  </div>

                  {/* Pace control */}
                  <div className="mt-3 flex items-center gap-2">
                    <button
                      className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                      style={{ background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.5)', border: '0.75px solid rgba(255,255,255,0.1)' }}
                      onClick={() => setPace(activePace - 1)}
                      aria-label="Decrease pace">−</button>
                    <span className="text-xs font-bold tabular-nums" style={{ color: paceOverride > 0 ? s.color : 'rgba(255,255,255,0.5)', minWidth: 72 }}>
                      {paceOverride > 0 ? `Custom: ${activePace}/week` : `${activePace} topics/week`}
                    </span>
                    <button
                      className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                      style={{ background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.5)', border: '0.75px solid rgba(255,255,255,0.1)' }}
                      onClick={() => setPace(activePace + 1)}
                      aria-label="Increase pace">+</button>
                    {paceOverride > 0 && (
                      <button
                        className="text-xs underline shrink-0"
                        style={{ color: 'rgba(255,255,255,0.3)' }}
                        onClick={resetPace}>Reset</button>
                    )}
                  </div>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-4">
                <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                  <motion.div className="h-full rounded-full"
                    style={{ background: `linear-gradient(90deg, ${s.color}99, ${s.color})` }}
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.round((plan.masteredCount / plan.totalTopics) * 100)}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}/>
                </div>
                <div className="flex justify-between mt-1">
                  <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>0%</span>
                  <span style={{ fontSize: 10, color: s.color, fontWeight: 700 }}>
                    {Math.round((plan.masteredCount / plan.totalTopics) * 100)}% complete
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Weekly plan cards */}
            <div className="space-y-3">
              {plan.weeklyPlan.map((week, i) => (
                <WeekCard
                  key={week.weekIndex}
                  week={week}
                  isOpen={openWeek === i}
                  onToggle={() => setOpenWeek(openWeek === i ? -1 : i)}
                  navigate={navigate}
                  progress={progress}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
