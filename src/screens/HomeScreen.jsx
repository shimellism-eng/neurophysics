import { motion, AnimatePresence } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import { ChevronRight, Zap, Star, Flame, Target, TrendingUp, AlertCircle, Sparkles, Calendar, BookOpen, ArrowRight } from 'lucide-react'
import { MODULES, TOPICS } from '../data/topics'
import { useProgress } from '../hooks/useProgress'
import { useInsights } from '../hooks/useInsights'
import { useAuth } from '../context/AuthContext'

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}

function loadProfile() {
  try {
    return JSON.parse(localStorage.getItem('neurophysics_profile') || '{}')
  } catch {
    return {}
  }
}

// Day-dot streak indicators: Mon-Sun
function StreakDots({ streak }) {
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
  const today = new Date().getDay() // 0=Sun
  // Convert JS day (0=Sun) to index where Mon=0
  const todayIdx = today === 0 ? 6 : today - 1
  // Fill dots going backwards from today based on streak count
  return (
    <div className="flex items-end gap-2 mt-3">
      {days.map((label, i) => {
        // How many days ago is index i relative to today?
        const daysAgo = todayIdx >= i ? todayIdx - i : todayIdx - i + 7
        const filled = daysAgo < streak
        const isToday = i === todayIdx
        return (
          <div key={i} className="flex flex-col items-center gap-1">
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: filled
                  ? isToday
                    ? '#f97316'
                    : 'rgba(249,115,22,0.55)'
                  : 'rgba(255,255,255,0.1)',
                boxShadow: filled && isToday ? '0 0 6px rgba(249,115,22,0.7)' : 'none',
                border: isToday && !filled ? '1px solid rgba(249,115,22,0.4)' : 'none',
              }}
            />
            <span
              style={{
                fontSize: 9,
                color: filled ? (isToday ? '#f97316' : 'rgba(249,115,22,0.5)') : 'rgba(255,255,255,0.2)',
                fontWeight: isToday ? 700 : 500,
                lineHeight: 1,
              }}
            >
              {label}
            </span>
          </div>
        )
      })}
    </div>
  )
}

// Progress ring -- animated, sits in hero
function ProgressRing({ masteredCount, totalTopics }) {
  const pct = totalTopics > 0 ? Math.round((masteredCount / totalTopics) * 100) : 0
  const R = 32
  const C = 2 * Math.PI * R
  const offset = C * (1 - pct / 100)

  return (
    <div className="relative shrink-0" style={{ width: 80, height: 80 }}>
      <svg width="80" height="80" viewBox="0 0 80 80">
        {/* Track */}
        <circle cx="40" cy="40" r={R} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="7" />
        {/* Fill */}
        <motion.circle
          cx="40" cy="40" r={R}
          fill="none"
          stroke="url(#homeRingGrad)"
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={C}
          strokeDashoffset={C}
          transform="rotate(-90 40 40)"
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.4 }}
        />
        <defs>
          <linearGradient id="homeRingGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#22c55e" />
          </linearGradient>
        </defs>
      </svg>
      {/* Label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="text-sm font-bold leading-none" style={{ color: '#f8fafc' }}>
          {masteredCount}
        </span>
        <span className="leading-none mt-0.5" style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>
          /{totalTopics}
        </span>
      </div>
    </div>
  )
}

export default function HomeScreen() {
  const navigate = useNavigate()
  const { progress, stats } = useProgress()
  const { weakTopics, suggestions, overallAccuracy, hasData, reviewDue } = useInsights()
  const { user } = useAuth()
  const profile = loadProfile()

  const rawName =
    profile.name ||
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    user?.email?.split('@')[0] ||
    'Learner'
  const displayName = rawName.split(' ')[0]
  const avatar = profile.avatar || '🧠'
  const greeting = getGreeting()

  const masteredCount = Object.values(progress).filter(p => p.mastered).length
  const totalTopics = Object.keys(TOPICS).length
  const progressPct = totalTopics > 0 ? Math.round((masteredCount / totalTopics) * 100) : 0

  const streak = stats.streak || 0
  const xp = stats.xp || 0

  const allTopicIds = MODULES.flatMap(m => m.topics)
  const firstUnmastered = allTopicIds.find(id => !progress[id]?.mastered) || allTopicIds[0]
  const resumeTopic = TOPICS[firstUnmastered]
  const resumeModule = MODULES.find(m => m.topics.includes(firstUnmastered))
  const moduleColor = resumeModule?.color || null

  const sparkEntry = weakTopics[0] || suggestions[0] || null
  const sparkTopic = sparkEntry ? sparkEntry.topic : resumeTopic
  const sparkId = sparkEntry ? sparkEntry.id : firstUnmastered
  const sparkIsWeak = sparkEntry?.reason === 'needs work' || (weakTopics.length > 0 && sparkEntry === weakTopics[0])

  return (
    <div
      className="flex flex-col h-full overflow-y-auto"
      style={{
        background: '#080f1e',
        paddingTop: 'env(safe-area-inset-top, 16px)',
        paddingBottom: 96,
      }}
    >

      {/* ── HERO ─────────────────────────────────────────────── */}
      <div
        className="px-5 pt-6 pb-5 relative"
        style={{
          background: `radial-gradient(ellipse 120% 80% at 50% -20%, ${moduleColor || '#6366f1'}18 0%, transparent 70%)`,
        }}
      >
        <motion.div
          className="flex items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Avatar */}
          <div
            className="flex items-center justify-center text-3xl shrink-0"
            style={{
              width: 64,
              height: 64,
              borderRadius: 20,
              background: 'linear-gradient(135deg, rgba(99,102,241,0.3), rgba(21,93,252,0.18))',
              border: '2px solid rgba(99,102,241,0.45)',
              boxShadow: '0 0 0 4px rgba(99,102,241,0.08), 0 8px 24px rgba(99,102,241,0.2)',
            }}
          >
            {avatar}
          </div>

          {/* Greeting */}
          <div className="flex-1 min-w-0">
            <p
              className="text-[10px] font-bold uppercase tracking-widest mb-0.5"
              style={{ color: '#6366f1' }}
            >
              {greeting}
            </p>
            <h1
              className="font-bold leading-tight truncate font-display"
              style={{ color: '#f8fafc', fontSize: 26, letterSpacing: '-0.03em' }}
            >
              {displayName}
            </h1>
            {/* Stat pills */}
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <span
                className="font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5"
                style={{
                  fontSize: 12,
                  background: 'rgba(253,199,0,0.12)',
                  color: '#fdc700',
                  border: '1px solid rgba(253,199,0,0.25)',
                }}
              >
                <Zap size={12} />
                {xp} XP
              </span>
              {masteredCount > 0 && (
                <span
                  className="font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5"
                  style={{
                    fontSize: 12,
                    background: 'rgba(34,197,94,0.12)',
                    color: '#22c55e',
                    border: '1px solid rgba(34,197,94,0.25)',
                  }}
                >
                  <Star size={12} />
                  {masteredCount} mastered
                </span>
              )}
            </div>
          </div>

          {/* Progress ring */}
          <ProgressRing masteredCount={masteredCount} totalTopics={totalTopics} />
        </motion.div>

        {/* Overall progress bar */}
        {progressPct > 0 && (
          <motion.div
            className="mt-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="w-full rounded-full overflow-hidden" style={{ height: 8, background: 'rgba(255,255,255,0.06)' }}>
              <motion.div
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg, #6366f1, #22c55e)' }}
                initial={{ width: 0 }}
                animate={{ width: `${progressPct}%` }}
                transition={{ delay: 0.5, duration: 1, ease: 'easeOut' }}
              />
            </div>
            <div className="flex items-center justify-between mt-1.5">
              <p className="text-[11px] font-semibold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.3)' }}>
                GCSE Physics - {progressPct}% complete
              </p>
              <p className="text-[11px] font-bold" style={{ color: moduleColor || '#6366f1' }}>
                {masteredCount}/{totalTopics} topics
              </p>
            </div>
          </motion.div>
        )}
      </div>

      {/* ── STREAK ────────────────────────────────────────────── */}
      <div className="px-5 mb-5">
        <motion.div
          className="w-full rounded-[22px] px-5 py-5"
          style={{
            background: streak > 0
              ? 'linear-gradient(135deg, rgba(249,115,22,0.2) 0%, rgba(15,22,41,0.97) 60%)'
              : 'rgba(255,255,255,0.03)',
            border: streak > 0 ? '1px solid rgba(249,115,22,0.4)' : '1px solid rgba(255,255,255,0.07)',
            boxShadow: streak > 0 ? '0 4px 40px rgba(249,115,22,0.12), inset 0 1px 0 rgba(249,115,22,0.15)' : 'none',
          }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-start gap-4">
            <motion.div
              animate={streak > 0 ? { scale: [1, 1.12, 1] } : {}}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              style={{ lineHeight: 1, paddingTop: 2 }}
            >
              <Flame
                size={streak > 0 ? 38 : 24}
                color={streak > 0 ? '#f97316' : 'rgba(255,255,255,0.2)'}
                strokeWidth={1.6}
              />
            </motion.div>

            <div className="flex-1 min-w-0">
              {streak > 0 ? (
                <>
                  <div className="font-bold font-display" style={{ color: '#f97316', fontSize: 22, letterSpacing: '-0.02em' }}>
                    {streak} day streak
                  </div>
                  <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>
                    Keep going - study something today
                  </p>
                  <StreakDots streak={streak} />
                </>
              ) : (
                <>
                  <div className="text-base font-bold font-display" style={{ color: '#f8fafc' }}>
                    Start your streak
                  </div>
                  <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>
                    Complete a topic to light it up
                  </p>
                  <StreakDots streak={0} />
                </>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── REVIEW DUE ────────────────────────────────────────── */}
      {reviewDue.length > 0 ? (
        <div className="px-5 mb-5">
          <motion.div
            className="w-full rounded-[22px] px-5 py-5"
            style={{
              background: 'rgba(99,102,241,0.07)',
              border: '1px solid rgba(99,102,241,0.22)',
            }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Calendar size={13} color="#818cf8" />
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#818cf8' }}>
                Review Due
              </span>
              <span
                className="ml-auto text-xs font-bold px-2 py-0.5 rounded-full"
                style={{ background: 'rgba(99,102,241,0.2)', color: '#a5b4fc' }}
              >
                {reviewDue.length}
              </span>
            </div>
            <p className="text-xs mb-3" style={{ color: 'rgba(255,255,255,0.35)' }}>
              Spaced practice locks it into long-term memory
            </p>
            <div className="flex flex-wrap gap-2">
              {reviewDue.slice(0, 3).map(({ id, topic }) => (
                <motion.button
                  key={id}
                  className="flex items-center gap-1.5 px-4 py-3 rounded-full text-xs font-semibold"
                  style={{
                    background: topic.moduleColor ? `${topic.moduleColor}18` : 'rgba(99,102,241,0.15)',
                    border: `1px solid ${topic.moduleColor ? `${topic.moduleColor}35` : 'rgba(99,102,241,0.3)'}`,
                    color: topic.moduleColor || '#818cf8',
                    minHeight: 44,
                  }}
                  onClick={() => navigate(`/lesson/${id}`)}
                  whileTap={{ scale: 0.95 }}
                >
                  {topic.title}
                  <ChevronRight size={10} strokeWidth={2.5} />
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      ) : masteredCount >= 5 ? (
        <div className="px-5 mb-5">
          <motion.div
            className="w-full rounded-[22px] px-5 py-3 flex items-center gap-3"
            style={{ background: 'rgba(99,102,241,0.05)', border: '1px solid rgba(99,102,241,0.15)' }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 }}
          >
            <Calendar size={13} color="#6366f1" />
            <span className="text-xs font-semibold" style={{ color: '#818cf8' }}>All caught up</span>
            <span className="text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>No reviews due today</span>
          </motion.div>
        </div>
      ) : null}

      {/* ── DAILY SPARK ───────────────────────────────────────── */}
      {sparkTopic && (
        <div className="px-5 mb-5">
          <motion.button
            className="w-full rounded-[22px] px-5 py-5 text-left flex items-center gap-4"
            style={{
              background: sparkTopic.moduleColor
                ? `linear-gradient(135deg, ${sparkTopic.moduleColor}20, rgba(15,22,41,0.97))`
                : 'linear-gradient(135deg, rgba(99,102,241,0.20), rgba(15,22,41,0.97))',
              border: `1px solid ${sparkTopic.moduleColor ? `${sparkTopic.moduleColor}40` : 'rgba(99,102,241,0.4)'}`,
              minHeight: 44,
            }}
            onClick={() => navigate(sparkIsWeak ? `/diagnostic/${sparkId}` : `/lesson/${sparkId}`)}
            whileTap={{ y: 3, scale: 0.99 }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Icon area - 48x48 */}
            <div
              className="rounded-[16px] flex items-center justify-center shrink-0"
              style={{
                width: 48,
                height: 48,
                background: sparkTopic.moduleColor ? `${sparkTopic.moduleColor}22` : 'rgba(99,102,241,0.2)',
                border: `1.5px solid ${sparkTopic.moduleColor ? `${sparkTopic.moduleColor}45` : 'rgba(99,102,241,0.38)'}`,
              }}
            >
              <Sparkles size={22} color={sparkTopic.moduleColor || '#818cf8'} />
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-widest mb-0.5"
                style={{ color: sparkTopic.moduleColor || '#818cf8' }}>
                Daily Spark
              </p>
              <p className="text-sm font-bold truncate" style={{ color: '#f8fafc' }}>
                {sparkTopic.title}
              </p>
              <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>
                {sparkIsWeak ? 'Needs more practice' : "Today's recommended topic"}
              </p>
            </div>

            {/* Pulsing right arrow */}
            <motion.div
              className="shrink-0"
              animate={{ x: [0, 3, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ArrowRight
                size={20}
                color={sparkTopic.moduleColor || '#818cf8'}
                strokeWidth={2}
                style={{ opacity: 0.8 }}
              />
            </motion.div>
          </motion.button>
        </div>
      )}

      {/* ── CONTINUE LEARNING ─────────────────────────────────── */}
      <div className="px-5 mb-5 space-y-2.5">
        {/* Primary CTA */}
        <motion.button
          className="w-full rounded-[22px] flex items-center justify-between px-5"
          style={{
            paddingTop: 20,
            paddingBottom: 20,
            background: resumeModule
              ? `linear-gradient(135deg, ${resumeModule.color}e0, ${resumeModule.color}90)`
              : 'linear-gradient(135deg, #6366f1, #4f46e5)',
            boxShadow: `0 6px 0 rgba(0,0,0,0.25), 0 14px 32px ${moduleColor || '#6366f1'}40`,
            color: '#fff',
          }}
          onClick={() => navigate(`/lesson/${firstUnmastered}`)}
          whileTap={{ y: 4, boxShadow: `0 2px 0 rgba(0,0,0,0.15), 0 4px 12px ${moduleColor || '#6366f1'}25` }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-3">
            {resumeModule && (
              <div
                className="rounded-[14px] flex items-center justify-center"
                style={{ width: 44, height: 44, background: 'rgba(255,255,255,0.18)' }}
              >
                <resumeModule.icon size={22} color="#fff" strokeWidth={2} />
              </div>
            )}
            <div className="text-left">
              <div className="text-[10px] font-bold uppercase tracking-widest opacity-70 mb-0.5 font-display">
                {masteredCount === 0 ? 'Start here' : 'Continue learning'}
              </div>
              <div className="font-bold font-display" style={{ fontSize: 15, letterSpacing: '-0.01em' }}>
                {resumeTopic?.title || 'Energy Stores'}
              </div>
              {resumeModule && (
                <div className="text-xs opacity-60 mt-0.5">{resumeModule.name}</div>
              )}
            </div>
          </div>
          <ChevronRight size={22} strokeWidth={2.5} />
        </motion.button>

        {/* Secondary actions row */}
        <div className="grid grid-cols-2 gap-2">
          <motion.button
            className="rounded-[18px] flex items-center justify-center gap-2"
            style={{
              paddingTop: 16,
              paddingBottom: 16,
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(99,102,241,0.28)',
              color: '#a5b4fc',
              borderLeft: `3px solid ${moduleColor || '#6366f1'}`,
              minHeight: 52,
            }}
            onClick={() => navigate('/mastery')}
            whileTap={{ y: 2, scale: 0.98 }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            <Target size={15} color={moduleColor || '#6366f1'} />
            <span className="text-xs font-bold">My Progress</span>
          </motion.button>

          <motion.button
            className="rounded-[18px] flex items-center justify-center gap-2"
            style={{
              paddingTop: 16,
              paddingBottom: 16,
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'rgba(255,255,255,0.5)',
              minHeight: 52,
            }}
            onClick={() => navigate('/topics')}
            whileTap={{ y: 2, scale: 0.98 }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.38 }}
          >
            <BookOpen size={15} color="rgba(255,255,255,0.4)" />
            <span className="text-xs font-bold">All Topics</span>
          </motion.button>
        </div>
      </div>

      {/* ── INSIGHTS ──────────────────────────────────────────── */}
      <AnimatePresence>
        {hasData && (
          <motion.div
            className="px-5 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp size={14} color="#6366f1" />
              {/* Colored dot before heading */}
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: moduleColor || '#6366f1',
                  boxShadow: `0 0 6px ${moduleColor || '#6366f1'}`,
                  flexShrink: 0,
                }}
              />
              <span
                className="font-bold uppercase tracking-widest"
                style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)' }}
              >
                Insights
              </span>
              {overallAccuracy !== null && (
                <span
                  className="ml-auto text-xs font-bold px-2 py-0.5 rounded-full"
                  style={{
                    background: overallAccuracy >= 0.7 ? 'rgba(34,197,94,0.12)' : 'rgba(249,115,22,0.12)',
                    color: overallAccuracy >= 0.7 ? '#22c55e' : '#f97316',
                  }}
                >
                  {Math.round(overallAccuracy * 100)}% accuracy
                </span>
              )}
            </div>

            {/* Needs Work */}
            {weakTopics.length > 0 && (
              <div className="mb-4">
                <div className="flex items-center gap-1.5 mb-2">
                  <AlertCircle size={11} color="#f97316" />
                  <span className="text-xs font-semibold" style={{ color: '#f97316' }}>Needs work</span>
                </div>
                <div className="space-y-2">
                  {weakTopics.map((x, i) => (
                    <motion.button
                      key={x.id}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-[16px] text-left"
                      style={{
                        background: 'rgba(249,115,22,0.06)',
                        border: '1px solid rgba(249,115,22,0.2)',
                        minHeight: 44,
                      }}
                      onClick={() => navigate(`/diagnostic/${x.id}`)}
                      whileTap={{ scale: 0.97 }}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.42 + i * 0.06 }}
                    >
                      <div
                        className="w-10 h-10 rounded-[12px] flex items-center justify-center shrink-0 text-xs font-bold"
                        style={{
                          background: `${x.topic.moduleColor}18`,
                          color: x.topic.moduleColor,
                          border: `1px solid ${x.topic.moduleColor}35`,
                        }}
                      >
                        {Math.round(x.accuracy * 100)}%
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-bold truncate" style={{ color: '#f8fafc' }}>{x.topic.title}</div>
                        <div className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>Tap to practise again</div>
                      </div>
                      <span style={{ color: x.topic.moduleColor, fontWeight: 700, fontSize: 13 }}>→</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Suggested */}
            {suggestions.length > 0 && (
              <div>
                <div className="flex items-center gap-1.5 mb-2">
                  <Sparkles size={11} color="#6366f1" />
                  <span className="text-xs font-semibold" style={{ color: '#6366f1' }}>Suggested for you</span>
                </div>
                <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
                  {suggestions.map((x, i) => (
                    <motion.button
                      key={x.id}
                      className="flex-shrink-0 w-36 flex flex-col gap-1.5 px-3 py-3 rounded-[16px] text-left"
                      style={{
                        background: `${x.topic.moduleColor}0d`,
                        border: `1px solid ${x.topic.moduleColor}30`,
                        minHeight: 44,
                      }}
                      onClick={() => navigate(x.reason === 'needs work' ? `/diagnostic/${x.id}` : `/lesson/${x.id}`)}
                      whileTap={{ scale: 0.96 }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.46 + i * 0.07 }}
                    >
                      <div
                        className="w-7 h-7 rounded-[8px] flex items-center justify-center"
                        style={{ background: `${x.topic.moduleColor}20` }}
                      >
                        <Target size={13} color={x.topic.moduleColor} />
                      </div>
                      <div className="text-xs font-semibold leading-snug" style={{ color: '#f8fafc' }}>
                        {x.topic.title}
                      </div>
                      <div
                        className="text-[10px] px-1.5 py-0.5 rounded-full self-start font-semibold"
                        style={{
                          background: x.reason === 'needs work' ? 'rgba(249,115,22,0.15)' : 'rgba(99,102,241,0.15)',
                          color: x.reason === 'needs work' ? '#f97316' : '#818cf8',
                        }}
                      >
                        {x.reason === 'needs work' ? 'Review' : 'Try it'}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}
