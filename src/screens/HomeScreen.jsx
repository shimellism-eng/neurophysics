import { motion, AnimatePresence } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import {
  ChevronRight, Zap, Flame, TrendingUp,
  Calendar, CheckCircle, Clock, Target,
  RefreshCw, Layers, BrainCircuit, ArrowRight,
} from 'lucide-react'
import { MODULES, TOPICS } from '../data/topics'
import { useProgress } from '../hooks/useProgress'
import { useInsights } from '../hooks/useInsights'
import { useStudyPlan } from '../hooks/useStudyPlan'
import { useAuth } from '../context/AuthContext'
import { getSelectedBoard } from '../utils/boardConfig'

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}

function loadProfile() {
  try { return JSON.parse(localStorage.getItem('neurophysics_profile') || '{}') }
  catch { return {} }
}

// ── 7-day streak calendar ─────────────────────────────────────────────────────
function StreakCalendar({ streakDates = [] }) {
  const labels  = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const now     = new Date()
  const todayIdx = now.getDay() === 0 ? 6 : now.getDay() - 1

  // Build a Set of dateStrings the user actually studied
  const studiedSet = new Set(streakDates)

  return (
    <div className="flex items-end gap-1.5 mt-4">
      {labels.map((label, i) => {
        // How many days ago was this calendar slot (0 = today)
        const daysAgo = todayIdx >= i ? todayIdx - i : todayIdx - i + 7
        // Get the actual calendar date for this slot
        const slotDate = new Date(now)
        slotDate.setDate(now.getDate() - daysAgo)
        const filled  = studiedSet.has(slotDate.toDateString())
        const isToday = i === todayIdx

        return (
          <div key={i} className="flex flex-col items-center gap-1.5 flex-1">
            <div
              style={{
                width: '100%', height: 28, borderRadius: 6,
                background: filled
                  ? isToday ? '#f97316' : 'rgba(249,115,22,0.45)'
                  : 'rgba(255,255,255,0.07)',
                border: isToday && !filled ? '1.5px solid rgba(249,115,22,0.5)' : 'none',
                boxShadow: filled && isToday ? '0 0 10px rgba(249,115,22,0.5)' : 'none',
                position: 'relative', overflow: 'hidden',
              }}
            >
              {filled && isToday && (
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(180deg, rgba(255,255,255,0.2) 0%, transparent 100%)',
                }} />
              )}
            </div>
            <span style={{
              fontSize: 11, fontWeight: isToday ? 700 : 500,
              color: filled
                ? isToday ? '#f97316' : 'rgba(249,115,22,0.55)'
                : 'rgba(255,255,255,0.2)',
              letterSpacing: '0.02em',
            }}>
              {isToday ? 'Today' : label}
            </span>
          </div>
        )
      })}
    </div>
  )
}

// ── Exam Countdown Widget ─────────────────────────────────────────────────────
const STATUS_THEME = {
  green:   { color: '#22c55e', bg: 'rgba(34,197,94,0.07)',   border: 'rgba(34,197,94,0.2)'  },
  amber:   { color: '#f59e0b', bg: 'rgba(245,158,11,0.07)',  border: 'rgba(245,158,11,0.22)' },
  red:     { color: '#ef4444', bg: 'rgba(239,68,68,0.07)',   border: 'rgba(239,68,68,0.22)' },
  no_date: { color: '#6366f1', bg: 'rgba(99,102,241,0.07)',  border: 'rgba(99,102,241,0.2)' },
  passed:  { color: '#94a3b8', bg: 'rgba(148,163,184,0.06)', border: 'rgba(148,163,184,0.15)' },
}

function ExamWidget({ plan, navigate }) {
  const s = STATUS_THEME[plan.examStatus] || STATUS_THEME.no_date

  // No exam date set — prompt user
  if (plan.examStatus === 'no_date') {
    return (
      <div className="rounded-[22px] px-5 py-4 flex items-center justify-between"
        style={{ background: s.bg, border: `1px solid ${s.border}` }}>
        <div>
          <div className="font-bold" style={{ color: s.color, fontSize: 14 }}>Set your exam date</div>
          <div className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.32)' }}>
            Get a personalised revision plan
          </div>
        </div>
        <button onClick={() => navigate('/settings')}
          className="px-3 py-1.5 rounded-full text-xs font-bold"
          style={{ background: `${s.color}22`, color: s.color, border: `1px solid ${s.color}44` }}>
          Set date →
        </button>
      </div>
    )
  }

  if (plan.examStatus === 'passed') {
    return (
      <div className="rounded-[22px] px-5 py-3 flex items-center gap-3"
        style={{ background: s.bg, border: `1px solid ${s.border}` }}>
        <CheckCircle size={18} color={s.color} />
        <span style={{ fontSize: 13, color: s.color, fontWeight: 600 }}>Exam date passed — keep practising!</span>
      </div>
    )
  }

  // Donut: fraction of an 8-week window (56 days)
  const r = 20, cxy = 26, circ = 2 * Math.PI * r
  const donutPct = Math.min(1, (plan.daysLeft || 0) / 56)
  const dashOffset = circ * (1 - donutPct)

  return (
    <motion.div className="rounded-[22px] px-5 py-4"
      style={{ background: s.bg, border: `1px solid ${s.border}` }}
      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}>
      <div className="flex items-center gap-4">
        {/* Donut countdown */}
        <svg width={52} height={52} style={{ flexShrink: 0 }}>
          <circle cx={cxy} cy={cxy} r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth={5}/>
          <circle cx={cxy} cy={cxy} r={r} fill="none" stroke={s.color} strokeWidth={5}
            strokeDasharray={circ} strokeDashoffset={dashOffset}
            strokeLinecap="round" transform={`rotate(-90 ${cxy} ${cxy})`}/>
          <text x={cxy} y={cxy + 4} textAnchor="middle" fontSize={10} fontWeight="800" fill={s.color}>
            {plan.weeksLeft}w
          </text>
        </svg>

        <div className="flex-1 min-w-0">
          <div className="font-bold" style={{ color: s.color, fontSize: 15, letterSpacing: '-0.02em' }}>
            {plan.weeksLeft} week{plan.weeksLeft !== 1 ? 's' : ''} to exam
          </div>
          <div className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>
            {plan.remainingCount} topics left · {plan.neededPerDay}/day needed
          </div>
          <div className="mt-2 flex items-center justify-between">
            <span style={{ fontSize: 11, fontWeight: 700, color: plan.onTrack ? '#22c55e' : '#f59e0b' }}>
              {plan.onTrack ? '✅ On track' : '⚠️ Pick up the pace'}
            </span>
            <button onClick={() => navigate('/study-plan')}
              style={{ fontSize: 11, fontWeight: 700, color: s.color, opacity: 0.8 }}>
              Full plan →
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ── Weekly Progress Dots ──────────────────────────────────────────────────────
function WeeklyDots({ plan }) {
  return (
    <div className="flex items-center gap-2 mt-3">
      <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', fontWeight: 600 }}>THIS WEEK</span>
      <div className="flex items-center gap-1.5 flex-1">
        {plan.weeklyDots.map((filled, i) => (
          <motion.div key={i}
            style={{
              width: 10, height: 10, borderRadius: 5,
              background: filled ? '#22c55e' : 'rgba(255,255,255,0.1)',
              border: filled ? 'none' : '1px solid rgba(255,255,255,0.15)',
            }}
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            transition={{ delay: 0.05 * i, type: 'spring', stiffness: 300 }}
          />
        ))}
      </div>
      <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', fontWeight: 600 }}>
        {plan.masteredThisWeek}/{plan.weeklyTarget}
      </span>
    </div>
  )
}

// ─── InsightsPanel ────────────────────────────────────────────────────────────
function InsightsPanel({ insights, onTopicTap }) {
  if (!insights.hasData) return null

  return (
    <div className="space-y-3">
      {/* Overall accuracy */}
      {insights.overallAccuracy !== null && (
        <div className="rounded-[22px] px-4 py-4"
          style={{ background: 'rgba(15,22,41,0.95)', border: '0.75px solid rgba(255,255,255,0.08)' }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Overall accuracy
            </span>
            <span className="text-sm font-black" style={{ color: insights.overallAccuracy >= 0.7 ? '#22c55e' : insights.overallAccuracy >= 0.5 ? '#fbbf24' : '#fbbf24' }}>
              {Math.round(insights.overallAccuracy * 100)}%
            </span>
          </div>
          <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
            <motion.div className="h-full rounded-full"
              style={{ background: insights.overallAccuracy >= 0.7 ? '#22c55e' : '#fbbf24' }}
              initial={{ width: 0 }}
              animate={{ width: `${insights.overallAccuracy * 100}%` }}
              transition={{ duration: 1, ease: 'easeOut' }} />
          </div>
          <div className="text-xs mt-2" style={{ color: 'rgba(255,255,255,0.35)' }}>
            {insights.attempted} topic{insights.attempted !== 1 ? 's' : ''} practised so far
          </div>
        </div>
      )}

      {/* Strong topics — wins first */}
      {insights.strongTopics.length > 0 && (
        <div className="rounded-[22px] px-4 py-4"
          style={{ background: 'rgba(34,197,94,0.06)', border: '0.75px solid rgba(34,197,94,0.15)' }}>
          <div className="text-sm font-bold mb-3" style={{ color: '#4ade80' }}>
            Strong areas
          </div>
          <div className="space-y-2">
            {insights.strongTopics.map(({ id, topic, accuracy }) => (
              <div key={id} className="flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold truncate" style={{ color: '#f8fafc' }}>{topic.title}</div>
                  <div className="w-full h-1.5 rounded-full mt-1 overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
                    <div className="h-full rounded-full" style={{ width: `${accuracy * 100}%`, background: '#22c55e' }} />
                  </div>
                </div>
                <span className="text-xs font-bold shrink-0" style={{ color: '#4ade80' }}>
                  {Math.round(accuracy * 100)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Keep practising — amber not red */}
      {insights.weakTopics.length > 0 && (
        <div className="rounded-[22px] px-4 py-4"
          style={{ background: 'rgba(251,191,36,0.06)', border: '0.75px solid rgba(251,191,36,0.2)' }}>
          <div className="text-sm font-bold mb-3" style={{ color: '#fbbf24' }}>
            Keep practising
          </div>
          <div className="space-y-2">
            {insights.weakTopics.map(({ id, topic, accuracy }) => (
              <div key={id} className="flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold truncate" style={{ color: '#f8fafc' }}>{topic.title}</div>
                  <div className="w-full h-1.5 rounded-full mt-1 overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
                    <div className="h-full rounded-full" style={{ width: `${accuracy * 100}%`, background: '#fbbf24' }} />
                  </div>
                </div>
                <span className="text-xs font-bold shrink-0" style={{ color: '#fbbf24' }}>
                  {Math.round(accuracy * 100)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Suggestions */}
      {insights.suggestions.length > 0 && (
        <div className="rounded-[22px] px-4 py-4"
          style={{ background: 'rgba(99,102,241,0.08)', border: '0.75px solid rgba(99,102,241,0.2)' }}>
          <div className="text-sm font-bold mb-3" style={{ color: '#818cf8' }}>
            Recommended next
          </div>
          <div className="space-y-2">
            {insights.suggestions.map(({ id, topic, reason, accuracy }) => (
              <button key={id} className="w-full flex items-center gap-3 py-1 text-left" onClick={() => onTopicTap && onTopicTap(id)}>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold truncate" style={{ color: '#f8fafc' }}>{topic.title}</div>
                  <div className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.38)' }}>
                    {reason === 'needs work'
                      ? `${Math.round(accuracy * 100)}% — practise again to boost this`
                      : 'Not tried yet — give it a go'}
                  </div>
                </div>
                <ChevronRight size={16} color="#818cf8" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Screen ───────────────────────────────────────────────────────────────────
export default function HomeScreen() {
  const navigate = useNavigate()
  const { progress, stats } = useProgress()
  const { weakTopics, strongTopics, suggestions, overallAccuracy, hasData, reviewDue, attempted } = useInsights()
  const { user } = useAuth()
  const profile  = loadProfile()

  const rawName = profile.name || user?.user_metadata?.full_name || user?.user_metadata?.name
    || user?.email?.split('@')[0] || 'Learner'
  const displayName = rawName.split(' ')[0]
  const avatar   = profile.avatar || '🧠'
  const greeting = getGreeting()

  const [, setBoardTick] = useState(0)
  useEffect(() => {
    const onStorage = () => setBoardTick(t => t + 1)
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  // ── First-run welcome overlay ──────────────────────────────────────────────
  const [showWelcome, setShowWelcome] = useState(() => !localStorage.getItem('np_welcome_seen'))
  const [showNudge, setShowNudge] = useState(false)
  const reduceMotion = localStorage.getItem('np_reduce_motion') === 'true'

  const dismissWelcome = () => {
    localStorage.setItem('np_welcome_seen', '1')
    setShowWelcome(false)
    // Show settings nudge only if no accessibility prefs have been configured
    const prefs = (() => { try { return JSON.parse(localStorage.getItem('neurophysics_prefs') || '{}') } catch { return {} } })()
    const hasPrefs = Object.keys(prefs).some(k => prefs[k] && prefs[k] !== false && prefs[k] !== 'Normal' && prefs[k] !== 'Dark')
    if (!hasPrefs && !localStorage.getItem('np_setup_nudge_seen')) {
      setShowNudge(true)
    }
  }

  const dismissNudge = () => {
    localStorage.setItem('np_setup_nudge_seen', '1')
    setShowNudge(false)
  }
  const selectedBoard  = getSelectedBoard()
  const targetGrade    = profile.grade || null
  const targetLabel    = targetGrade
    ? `Target: ${selectedBoard.gradeSystem === 'A*-G' ? targetGrade : `Grade ${targetGrade}`}`
    : null

  const plan          = useStudyPlan(progress)
  const masteredCount = plan.masteredCount
  const totalTopics   = plan.totalTopics
  const progressPct   = totalTopics > 0 ? Math.round((masteredCount / totalTopics) * 100) : 0
  const streak        = stats.streak || 0
  const xp            = stats.xp || 0
  const streakDates   = Array.isArray(stats.streakDates) ? stats.streakDates : []

  // Use study plan's smart priority topic for the CTA
  const firstUnmastered = plan.todayTopicId || MODULES.flatMap(m => m.topics)[0]
  const resumeTopic     = plan.todayTopic || TOPICS[firstUnmastered]
  const resumeModule    = plan.todayModule || MODULES.find(m => m.topics.includes(firstUnmastered))
  const moduleColor     = resumeModule?.color || '#6366f1'

  // Routing guard — same logic as LearnScreen onTap
  const navigateToTopic = (topicId) => {
    const t = TOPICS[topicId]
    if (!t) return
    if (t.hook || (t.lessonSteps && t.lessonSteps.length > 0)) navigate(`/lesson/${topicId}`)
    else if (t.practicalId) navigate(`/practical/${t.practicalId}`)
    else navigate(`/practice/${topicId}`)
  }

  return (
    <div
      className="flex flex-col h-full overflow-y-auto"
      style={{ background: '#080f1e', paddingTop: 'env(safe-area-inset-top, 16px)', paddingBottom: 'calc(96px + env(safe-area-inset-bottom, 0px))' }}
    >

      {/* ── First-run welcome overlay ─────────────────────────────────────────── */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col justify-end"
            style={{ background: 'rgba(4,8,20,0.92)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0.1 : 0.25 }}
          >
            <motion.div
              className="mx-2 mb-4 rounded-[32px] overflow-hidden"
              style={{ background: 'rgba(11,17,33,1)', border: '0.75px solid rgba(255,255,255,0.12)', boxShadow: '0 -8px 60px rgba(0,0,0,0.6)' }}
              initial={{ y: reduceMotion ? 0 : 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: reduceMotion ? 0 : 80, opacity: 0 }}
              transition={{ duration: reduceMotion ? 0.1 : 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Gradient hero band */}
              <div
                className="px-6 pt-8 pb-7 text-center relative overflow-hidden"
                style={{ background: 'linear-gradient(160deg, rgba(0,212,255,0.12) 0%, rgba(99,102,241,0.18) 50%, rgba(155,89,182,0.1) 100%)' }}
              >
                {/* Glow orbs */}
                <div style={{ position: 'absolute', top: -30, left: '50%', transform: 'translateX(-50%)', width: 180, height: 100, background: 'radial-gradient(ellipse, rgba(0,212,255,0.18) 0%, transparent 70%)', pointerEvents: 'none' }} />
                {/* App icon */}
                <div
                  className="mx-auto mb-4 flex items-center justify-center rounded-[22px]"
                  style={{ width: 72, height: 72, background: 'linear-gradient(135deg, #0d1f3c 0%, #1a2a4a 100%)', border: '0.75px solid rgba(0,212,255,0.3)', boxShadow: '0 0 24px rgba(0,212,255,0.2)' }}
                >
                  <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
                    <circle cx="19" cy="19" r="4" fill="#00d4ff" />
                    <ellipse cx="19" cy="19" rx="16" ry="6.5" stroke="#00d4ff" strokeWidth="1.5" fill="none" opacity="0.7" />
                    <ellipse cx="19" cy="19" rx="16" ry="6.5" stroke="#9b59b6" strokeWidth="1.5" fill="none" opacity="0.7" transform="rotate(60 19 19)" />
                    <ellipse cx="19" cy="19" rx="16" ry="6.5" stroke="#6366f1" strokeWidth="1.5" fill="none" opacity="0.7" transform="rotate(120 19 19)" />
                  </svg>
                </div>
                <h2 className="font-extrabold mb-2" style={{ fontSize: 24, color: '#f8fafc', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
                  Welcome to<br />
                  <span style={{ background: 'linear-gradient(90deg, #00d4ff, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>NeuroPhysics</span>
                </h2>
                <p className="text-sm font-medium" style={{ color: '#7b9ab8' }}>
                  Built for how your brain works — not against it.
                </p>
              </div>

              {/* 3 value props */}
              <div className="px-4 py-4 space-y-2.5">
                {[
                  {
                    Icon: RefreshCw,
                    color: '#00d4ff',
                    bg: 'rgba(0,212,255,0.1)',
                    border: 'rgba(0,212,255,0.2)',
                    title: 'Spaced repetition',
                    desc: 'Topics resurface at exactly the right moment to stick in long-term memory.',
                  },
                  {
                    Icon: Layers,
                    color: '#818cf8',
                    bg: 'rgba(99,102,241,0.1)',
                    border: 'rgba(99,102,241,0.2)',
                    title: 'Bite-sized lessons',
                    desc: 'One concept per screen — no cognitive overload, no walls of text.',
                  },
                  {
                    Icon: BrainCircuit,
                    color: '#e91e8c',
                    bg: 'rgba(233,30,140,0.1)',
                    border: 'rgba(233,30,140,0.2)',
                    title: 'Mamo AI tutor',
                    desc: 'Ask anything, any time. Instant exam-focused explanations.',
                  },
                ].map(({ Icon, color, bg, border, title, desc }, i) => (
                  <motion.div
                    key={title}
                    className="flex items-center gap-4 px-4 py-3.5 rounded-[18px]"
                    style={{ background: bg, border: `0.75px solid ${border}` }}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: reduceMotion ? 0 : 0.15 + i * 0.07, duration: 0.3 }}
                  >
                    <div
                      className="rounded-[12px] flex items-center justify-center shrink-0"
                      style={{ width: 42, height: 42, background: `${color}18`, border: `0.75px solid ${color}40` }}
                    >
                      <Icon size={18} color={color} strokeWidth={1.8} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-bold" style={{ color: '#f8fafc' }}>{title}</div>
                      <div className="text-xs leading-relaxed mt-0.5" style={{ color: '#7b9ab8' }}>{desc}</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* CTA */}
              <div className="px-4 pt-1 pb-6">
                <motion.button
                  className="w-full py-4 rounded-[20px] font-bold flex items-center justify-center gap-2"
                  style={{
                    background: 'linear-gradient(135deg, #00c4ee 0%, #6366f1 60%, #9b59b6 100%)',
                    color: '#fff',
                    fontSize: 16,
                    letterSpacing: '-0.01em',
                    boxShadow: '0 6px 32px rgba(0,212,255,0.25), 0 2px 8px rgba(99,102,241,0.3)',
                  }}
                  onClick={dismissWelcome}
                  whileTap={{ scale: 0.97 }}
                >
                  Start learning
                  <ArrowRight size={18} strokeWidth={2.5} />
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Settings nudge banner ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {showNudge && (
          <motion.div
            className="mx-4 mt-3 px-4 py-3 rounded-[16px] flex items-center gap-3"
            style={{ background: 'rgba(99,102,241,0.1)', border: '0.75px solid rgba(99,102,241,0.25)' }}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: reduceMotion ? 0.1 : 0.3 }}
          >
            <span className="text-lg shrink-0">⚡</span>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-semibold" style={{ color: '#f8fafc' }}>Personalise your experience</div>
              <div className="text-xs mt-0.5" style={{ color: '#a8b8cc' }}>Set dyslexia font, reduce motion and more in Settings.</div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                className="px-3 py-1.5 rounded-full text-xs font-bold"
                style={{ background: 'rgba(99,102,241,0.2)', color: '#818cf8' }}
                onClick={() => { dismissNudge(); navigate('/settings') }}
              >
                Set up
              </button>
              <button
                className="w-7 h-7 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.07)' }}
                onClick={dismissNudge}
                aria-label="Dismiss"
              >
                <span style={{ fontSize: 12, color: '#a8b8cc' }}>✕</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <div
        className="px-5 pt-6 pb-6"
        style={{ background: `radial-gradient(ellipse 130% 90% at 50% -10%, ${moduleColor}16 0%, transparent 65%)` }}
      >
        <motion.div
          className="flex items-center gap-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Avatar */}
          <div
            className="flex items-center justify-center text-3xl shrink-0"
            style={{
              width: 60, height: 60, borderRadius: 18,
              background: 'linear-gradient(135deg, rgba(99,102,241,0.28), rgba(21,93,252,0.15))',
              border: '1.5px solid rgba(99,102,241,0.38)',
              boxShadow: '0 0 0 4px rgba(99,102,241,0.07), 0 8px 20px rgba(99,102,241,0.18)',
            }}
          >
            {avatar}
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-[12px] font-semibold mb-0.5" style={{ color: '#6366f1' }}>
              {greeting}
            </p>
            <h1 className="font-bold leading-tight truncate" style={{ color: '#f8fafc', fontSize: 24, letterSpacing: '-0.03em' }}>
              {displayName}
            </h1>

            <div className="flex items-center gap-2 mt-2 flex-wrap">
              {xp >= 5 ? (
                <span className="font-bold px-2.5 py-1 rounded-full flex items-center gap-1"
                  style={{ fontSize: 12, background: 'rgba(253,199,0,0.12)', color: '#fdc700', border: '1px solid rgba(253,199,0,0.22)' }}>
                  <Zap size={11} /> {xp} XP
                </span>
              ) : (
                <span className="font-semibold px-2.5 py-1 rounded-full"
                  style={{ fontSize: 12, background: 'rgba(99,102,241,0.1)', color: '#818cf8' }}>
                  First XP incoming
                </span>
              )}

              {masteredCount > 0 && (
                <button onClick={() => navigate('/mastery')}
                  className="font-bold px-2.5 py-1 rounded-full flex items-center gap-1"
                  style={{ fontSize: 12, background: 'rgba(34,197,94,0.1)', color: '#22c55e', border: '1px solid rgba(34,197,94,0.2)' }}>
                  <CheckCircle size={11} /> {masteredCount} mastered
                </button>
              )}

              {plan.daysLeft > 0 && plan.examStatus !== 'no_date' && plan.examStatus !== 'passed' && (() => {
                const s = STATUS_THEME[plan.examStatus]
                return (
                  <span className="font-bold px-2.5 py-1 rounded-full flex items-center gap-1"
                    style={{ fontSize: 12, background: `${s.color}18`, color: s.color, border: `1px solid ${s.color}35` }}>
                    <Target size={10} /> {plan.daysLeft}d
                  </span>
                )
              })()}

              {/* Board badge — always shown */}
              <span className="font-bold px-2.5 py-1 rounded-full"
                style={{
                  fontSize: 12,
                  background: `${selectedBoard.color}12`,
                  color: selectedBoard.color,
                  border: `1px solid ${selectedBoard.color}28`,
                }}>
                {selectedBoard.name}
              </span>

              {targetLabel && (
                <span className="font-bold px-2.5 py-1 rounded-full"
                  style={{
                    fontSize: 12,
                    background: `${selectedBoard.color}12`,
                    color: selectedBoard.color,
                    border: `1px solid ${selectedBoard.color}28`,
                  }}>
                  🏆 {targetLabel}
                </span>
              )}
            </div>
          </div>
        </motion.div>

        {/* Progress bar — only once started */}
        {progressPct > 0 && (
          <motion.div className="mt-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            <div className="w-full rounded-full overflow-hidden" style={{ height: 6, background: 'rgba(255,255,255,0.06)' }}>
              <motion.div className="h-full rounded-full"
                style={{ background: `linear-gradient(90deg, #6366f1, ${moduleColor})` }}
                initial={{ width: 0 }}
                animate={{ width: `${progressPct}%` }}
                transition={{ delay: 0.5, duration: 1, ease: 'easeOut' }}
              />
            </div>
            <div className="flex items-center justify-between mt-1.5">
              <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.28)', fontWeight: 600, letterSpacing: '0.05em' }}>
                GCSE Physics
              </p>
              <p style={{ fontSize: 11, fontWeight: 700, color: moduleColor }}>
                {masteredCount}/{totalTopics} topics
              </p>
            </div>
          </motion.div>
        )}
      </div>

      {/* ── PRIMARY CTA ──────────────────────────────────────────────────────── */}
      <div className="px-5 mb-5">
        <motion.button
          className="w-full rounded-[22px] flex items-center justify-between"
          style={{
            padding: '20px 20px',
            background: resumeModule
              ? `linear-gradient(135deg, ${resumeModule.color}e8, ${resumeModule.color}88)`
              : 'linear-gradient(135deg, #6366f1, #4f46e5)',
            boxShadow: `0 6px 0 rgba(0,0,0,0.22), 0 16px 36px ${moduleColor}38`,
            color: '#fff',
          }}
          onClick={() => navigateToTopic(firstUnmastered)}
          whileTap={{ y: 4, boxShadow: `0 2px 0 rgba(0,0,0,0.15), 0 4px 12px ${moduleColor}22` }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-3.5">
            {resumeModule && (
              <div className="rounded-[14px] flex items-center justify-center shrink-0"
                style={{ width: 48, height: 48, background: 'rgba(255,255,255,0.18)' }}>
                <resumeModule.icon size={24} color="#fff" strokeWidth={1.8} />
              </div>
            )}
            <div className="text-left">
              <div className="font-semibold opacity-75 mb-0.5" style={{ fontSize: 12 }}>
                {plan.isReview ? '🔁 Review due' : masteredCount === 0 ? 'Start here' : "Today's topic"}
              </div>
              <div className="font-bold" style={{ fontSize: 17, letterSpacing: '-0.02em' }}>
                {resumeTopic?.title || 'Energy Stores'}
              </div>
              {resumeModule && (
                <div className="opacity-65 mt-0.5" style={{ fontSize: 12 }}>{resumeModule.name}</div>
              )}
            </div>
          </div>
          <motion.div
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronRight size={24} strokeWidth={2.5} />
          </motion.div>
        </motion.button>
      </div>

      {/* ── EXAM PLAN WIDGET ─────────────────────────────────────────────────── */}
      <div className="px-5 mb-5">
        <ExamWidget plan={plan} navigate={navigate} />
        {plan.examStatus !== 'no_date' && plan.examStatus !== 'passed' && (
          <WeeklyDots plan={plan} />
        )}
      </div>

      {/* ── STREAK ───────────────────────────────────────────────────────────── */}
      <div className="px-5 mb-5">
        <motion.div
          className="rounded-[22px] px-5 py-5"
          style={{
            background: streak > 0
              ? 'linear-gradient(135deg, rgba(249,115,22,0.18) 0%, rgba(15,22,41,0.97) 60%)'
              : 'rgba(255,255,255,0.03)',
            border: streak > 0 ? '0.75px solid rgba(249,115,22,0.35)' : '0.75px solid rgba(255,255,255,0.07)',
            boxShadow: streak > 0 ? '0 4px 32px rgba(249,115,22,0.1)' : 'none',
          }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-start gap-3.5">
            <motion.div
              animate={streak > 0 ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              style={{ paddingTop: 2 }}
            >
              <Flame
                size={streak > 0 ? 34 : 22}
                color={streak > 0 ? '#f97316' : 'rgba(255,255,255,0.18)'}
                strokeWidth={1.5}
              />
            </motion.div>

            <div className="flex-1 min-w-0">
              {streak > 0 ? (
                <>
                  <div className="font-bold" style={{ color: '#f97316', fontSize: 20, letterSpacing: '-0.02em' }}>
                    {streak} day streak
                  </div>
                  <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.38)' }}>
                    Study today to keep it going
                  </p>
                </>
              ) : (
                <>
                  <div className="font-bold" style={{ color: '#f8fafc', fontSize: 16 }}>
                    Start your streak today
                  </div>
                  <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.32)' }}>
                    Complete one topic to light it up
                  </p>
                </>
              )}
              {streak > 0 && <StreakCalendar streakDates={streakDates} />}
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── REVIEW DUE ───────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {reviewDue.length > 0 && (
          <motion.div
            className="px-5 mb-5"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.28 }}
          >
            <div className="rounded-[22px] px-5 py-5"
              style={{ background: 'rgba(99,102,241,0.07)', border: '0.75px solid rgba(99,102,241,0.2)' }}>
              <div className="flex items-center gap-2 mb-1">
                <Calendar size={13} color="#818cf8" />
                <span style={{ fontSize: 13, fontWeight: 700, color: '#818cf8' }}>
                  Time to revisit
                </span>
                <span className="ml-auto text-xs font-bold px-2 py-0.5 rounded-full"
                  style={{ background: 'rgba(99,102,241,0.18)', color: '#a5b4fc' }}>
                  {reviewDue.length}
                </span>
              </div>
              <p className="text-xs mb-3.5" style={{ color: 'rgba(255,255,255,0.32)' }}>
                Spaced practice locks it into long-term memory
              </p>
              <div className="flex flex-col gap-2">
                {reviewDue.slice(0, 3).map(({ id, topic, masteredAt, nextReviewAt }) => {
                  const now = Date.now()
                  const isDueToday = nextReviewAt && nextReviewAt <= now
                  const daysUntilDue = nextReviewAt && nextReviewAt > now
                    ? Math.ceil((nextReviewAt - now) / (1000 * 60 * 60 * 24))
                    : null
                  const masteredDaysAgo = masteredAt
                    ? Math.max(0, Math.floor((now - masteredAt) / (1000 * 60 * 60 * 24)))
                    : null
                  return (
                    <motion.button
                      key={id}
                      className="flex items-center justify-between px-4 py-3 rounded-2xl text-left w-full"
                      style={{
                        background: topic.moduleColor ? `${topic.moduleColor}18` : 'rgba(99,102,241,0.15)',
                        border: `1px solid ${topic.moduleColor ? `${topic.moduleColor}32` : 'rgba(99,102,241,0.28)'}`,
                      }}
                      onClick={() => navigate(`/practice/${id}`, { state: { reviewMode: true, maxQuestions: 5 } })}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div>
                        <div className="text-xs font-semibold" style={{ color: topic.moduleColor || '#818cf8' }}>
                          {topic.title}
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          {isDueToday && (
                            <span className="text-xs font-bold" style={{ color: '#f59e0b' }}>Due today</span>
                          )}
                          {daysUntilDue !== null && (
                            <span className="text-xs" style={{ color: '#a8b8cc' }}>Due in {daysUntilDue} day{daysUntilDue !== 1 ? 's' : ''}</span>
                          )}
                          {masteredDaysAgo !== null && (
                            <span className="text-xs" style={{ color: '#a8b8cc' }}>
                              {isDueToday || daysUntilDue !== null ? '·' : ''} Mastered {masteredDaysAgo === 0 ? 'today' : `${masteredDaysAgo} day${masteredDaysAgo !== 1 ? 's' : ''} ago`}
                            </span>
                          )}
                        </div>
                      </div>
                      <ChevronRight size={14} strokeWidth={2.5} color={topic.moduleColor || '#818cf8'} style={{ flexShrink: 0 }} />
                    </motion.button>
                  )
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── INSIGHTS — enhanced panel ─────────────────────────────────────────── */}
      <AnimatePresence>
        {hasData && (
          <motion.div
            className="px-5 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.32 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp size={13} color="#6366f1" />
              <span style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.5)' }}>
                Insights
              </span>
            </div>
            <InsightsPanel insights={{ weakTopics, strongTopics, suggestions, overallAccuracy, hasData, attempted }} onTopicTap={navigateToTopic} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── TIMED PAPER PROMO — unlocked at 10+ topics mastered ─────────────── */}
      {masteredCount >= 10 && (
        <motion.div className="px-5 mb-5" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.38 }}>
          <motion.button
            className="w-full rounded-[22px] flex items-center justify-between px-5 py-4"
            style={{
              background: 'linear-gradient(135deg, rgba(99,102,241,0.2) 0%, rgba(99,102,241,0.08) 100%)',
              border: '0.75px solid rgba(99,102,241,0.35)',
              boxShadow: '0 4px 24px rgba(99,102,241,0.12)',
            }}
            onClick={() => navigate('/timed-paper')}
            whileTap={{ scale: 0.97 }}
          >
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-[14px] flex items-center justify-center shrink-0"
                style={{ background: 'rgba(99,102,241,0.18)', border: '0.75px solid rgba(99,102,241,0.35)' }}>
                <Clock size={22} color="#818cf8" strokeWidth={1.8} />
              </div>
              <div className="text-left">
                <div className="text-[12px] font-semibold mb-0.5" style={{ color: '#6366f1' }}>
                  You've mastered {masteredCount} topics
                </div>
                <div className="font-bold" style={{ color: '#f8fafc', fontSize: 16, letterSpacing: '-0.02em' }}>
                  Try a Timed Paper
                </div>
                <div className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.38)' }}>
                  Exam-style · 35 marks · 55 min
                </div>
              </div>
            </div>
            <ChevronRight size={20} color="rgba(99,102,241,0.6)" strokeWidth={2.5} />
          </motion.button>
        </motion.div>
      )}

    </div>
  )
}
