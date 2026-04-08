import { motion, AnimatePresence } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import { ChevronRight, Zap, Star, Flame, Target, TrendingUp, AlertCircle, Sparkles, Calendar } from 'lucide-react'
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

// Inline progress ring — smaller than MasteryScreen's, sits beside the greeting
function ProgressRing({ masteredCount, totalTopics }) {
  const pct = totalTopics > 0 ? Math.round((masteredCount / totalTopics) * 100) : 0
  // ring geometry: r=30, so circumference ≈ 188.5
  const R = 30
  const C = 2 * Math.PI * R
  const offset = C * (1 - pct / 100)

  return (
    <div className="relative shrink-0" style={{ width: 72, height: 72 }}>
      <svg width="72" height="72" viewBox="0 0 72 72">
        {/* track */}
        <circle
          cx="36" cy="36" r={R}
          fill="none"
          stroke="#1d293d"
          strokeWidth="6"
        />
        {/* fill */}
        <motion.circle
          cx="36" cy="36" r={R}
          fill="none"
          stroke="url(#ringGrad)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={C}
          strokeDashoffset={C}
          transform="rotate(-90 36 36)"
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.1, ease: 'easeOut', delay: 0.3 }}
        />
        <defs>
          <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#155dfc" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>
        </defs>
      </svg>
      {/* label inside ring */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="text-xs font-bold leading-none" style={{ color: '#f8fafc' }}>
          {masteredCount}
        </span>
        <span className="leading-none mt-0.5" style={{ fontSize: 9, color: '#6366f1' }}>
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

  // Priority: manually-set profile name → OAuth display name → email prefix → fallback
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

  // Find first unmastered topic to resume
  const allTopicIds = MODULES.flatMap(m => m.topics)
  const firstUnmastered = allTopicIds.find(id => !progress[id]?.mastered) || allTopicIds[0]
  const resumeTopic = TOPICS[firstUnmastered]

  // Find the module that owns firstUnmastered
  const resumeModule = MODULES.find(m => m.topics.includes(firstUnmastered))

  // Daily Spark: first weak topic, else first suggestion, else firstUnmastered
  const sparkEntry = weakTopics[0] || suggestions[0] || null
  const sparkTopic = sparkEntry ? sparkEntry.topic : resumeTopic
  const sparkId = sparkEntry ? sparkEntry.id : firstUnmastered
  const sparkIsWeak = sparkEntry?.reason === 'needs work' || (weakTopics.length > 0 && sparkEntry === weakTopics[0])

  return (
    <div
      className="flex flex-col h-full overflow-y-auto"
      style={{ background: '#0b1121' }}
    >

      {/* ── HERO ─────────────────────────────────────────────── */}
      <div className="px-5 pt-8 pb-4">
        <motion.div
          className="flex items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Avatar */}
          <div
            className="w-13 h-13 rounded-[18px] flex items-center justify-center text-2xl shrink-0"
            style={{
              width: 52,
              height: 52,
              background: 'linear-gradient(135deg, rgba(21,93,252,0.18), rgba(99,102,241,0.18))',
              border: '1px solid rgba(99,102,241,0.3)',
            }}
          >
            {avatar}
          </div>

          {/* Greeting text */}
          <div className="flex-1 min-w-0">
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-0.5"
              style={{ color: '#6366f1' }}
            >
              {greeting}
            </p>
            <h1
              className="text-2xl font-bold leading-tight truncate"
              style={{ color: '#f8fafc', letterSpacing: '-0.01em' }}
            >
              {displayName}
            </h1>
            {/* XP + mastery pills */}
            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
              <span
                className="text-xs font-semibold px-2 py-0.5 rounded-full flex items-center gap-1"
                style={{ background: 'rgba(253,199,0,0.12)', color: '#fdc700', border: '1px solid rgba(253,199,0,0.25)' }}
              >
                <Zap size={10} />
                {xp} XP
              </span>
              <span
                className="text-xs font-semibold px-2 py-0.5 rounded-full flex items-center gap-1"
                style={{ background: 'rgba(0,188,125,0.12)', color: '#00bc7d', border: '1px solid rgba(0,188,125,0.25)' }}
              >
                <Star size={10} />
                {masteredCount} mastered
              </span>
            </div>
          </div>

          {/* Progress ring */}
          <ProgressRing masteredCount={masteredCount} totalTopics={totalTopics} />
        </motion.div>

        {/* Thin progress bar under hero */}
        <motion.div
          className="mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
        >
          <div
            className="w-full h-1 rounded-full overflow-hidden"
            style={{ background: '#1d293d' }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, #155dfc, #6366f1)' }}
              initial={{ width: 0 }}
              animate={{ width: `${progressPct}%` }}
              transition={{ delay: 0.45, duration: 0.9, ease: 'easeOut' }}
            />
          </div>
          <p className="text-xs font-semibold uppercase tracking-wide mt-1" style={{ color: '#64748b' }}>
            GCSE Physics · {progressPct}% complete
          </p>
        </motion.div>
      </div>

      {/* ── STREAK CARD ─────────────────────────────────────── */}
      <div className="px-5 mb-4">
        <motion.div
          className="w-full rounded-[20px] px-5 py-4 flex items-center gap-4"
          style={{
            background: streak > 0
              ? 'linear-gradient(135deg, rgba(249,115,22,0.18), rgba(234,88,12,0.1))'
              : 'rgba(18,26,47,0.9)',
            border: streak > 0
              ? '1px solid rgba(249,115,22,0.4)'
              : '0.75px solid #1d293d',
          }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Animated flame */}
          <motion.div
            animate={streak > 0
              ? { scale: [1, 1.08, 1], opacity: [1, 0.9, 1] }
              : {}}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ lineHeight: 1 }}
          >
            <Flame
              size={streak > 0 ? 38 : 28}
              color={streak > 0 ? '#f97316' : '#4a5a72'}
              strokeWidth={1.8}
            />
          </motion.div>

          <div className="flex-1 min-w-0">
            {streak > 0 ? (
              <>
                <div
                  className="text-2xl font-bold leading-none"
                  style={{ color: '#f97316' }}
                >
                  {streak}
                  <span className="text-base font-bold ml-1" style={{ color: '#f97316' }}>
                    day streak 🔥
                  </span>
                </div>
                <p className="text-xs mt-1" style={{ color: '#a8b8cc' }}>
                  Keep it going — study something today
                </p>
              </>
            ) : (
              <>
                <div className="text-xl font-bold" style={{ color: '#f8fafc' }}>
                  Start your streak today
                </div>
                <p className="text-xs mt-1" style={{ color: '#a8b8cc' }}>
                  Complete a topic to light your streak 🔥
                </p>
              </>
            )}
          </div>
        </motion.div>
      </div>

      {/* ── REVIEW DUE ──────────────────────────────────────── */}
      {reviewDue.length > 0 ? (
        <div className="px-5 mb-4">
          <motion.div
            className="w-full rounded-[20px] px-5 py-4"
            style={{
              background: 'rgba(99,102,241,0.08)',
              border: '1px solid rgba(99,102,241,0.25)',
            }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Header */}
            <div className="flex items-center gap-2 mb-3">
              <Calendar size={14} color="#818cf8" />
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#818cf8' }}>
                Review Due
              </span>
            </div>
            <p className="text-xs mb-3" style={{ color: '#a8b8cc' }}>
              Spaced practice keeps it in long-term memory
            </p>
            {/* Topic pill chips */}
            <div className="flex flex-wrap gap-2">
              {reviewDue.slice(0, 3).map(({ id, topic }) => (
                <motion.button
                  key={id}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                  style={{
                    background: topic.moduleColor ? `${topic.moduleColor}20` : 'rgba(99,102,241,0.18)',
                    border: `1px solid ${topic.moduleColor ? `${topic.moduleColor}40` : 'rgba(99,102,241,0.35)'}`,
                    color: topic.moduleColor || '#818cf8',
                  }}
                  onClick={() => navigate(`/lesson/${id}`)}
                  whileTap={{ scale: 0.95 }}
                  aria-label={`Review ${topic.title}`}
                >
                  <span>{topic.title}</span>
                  <ChevronRight size={10} strokeWidth={2.5} />
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      ) : masteredCount >= 5 ? (
        <div className="px-5 mb-4">
          <motion.div
            className="w-full rounded-[20px] px-5 py-3 flex items-center gap-3"
            style={{
              background: 'rgba(99,102,241,0.06)',
              border: '1px solid rgba(99,102,241,0.18)',
            }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.4 }}
          >
            <Calendar size={14} color="#6366f1" />
            <span className="text-xs font-semibold" style={{ color: '#818cf8' }}>
              You're all caught up ✓
            </span>
            <span className="text-xs" style={{ color: '#64748b' }}>
              No reviews due today
            </span>
          </motion.div>
        </div>
      ) : null}

      {/* ── DAILY SPARK ─────────────────────────────────────── */}
      {sparkTopic && (
        <div className="px-5 mb-4">
          <motion.button
            className="w-full rounded-[20px] px-5 py-4 text-left flex items-center gap-4"
            style={{
              background: 'linear-gradient(135deg, #1e293b, rgba(99,102,241,0.15))',
              border: '1px solid rgba(99,102,241,0.4)',
            }}
            onClick={() =>
              navigate(sparkIsWeak ? `/diagnostic/${sparkId}` : `/lesson/${sparkId}`)
            }
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            aria-label={`Daily Spark: ${sparkTopic.title}`}
          >
            {/* Icon badge */}
            <div
              className="w-11 h-11 rounded-[14px] flex items-center justify-center shrink-0"
              style={{
                background: 'rgba(99,102,241,0.18)',
                border: '1px solid rgba(99,102,241,0.35)',
              }}
            >
              <Sparkles size={20} color="#818cf8" />
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold uppercase tracking-widest mb-0.5" style={{ color: '#818cf8' }}>
                ⚡ Daily Spark
              </p>
              <p className="text-xs leading-relaxed mb-1" style={{ color: '#a8b8cc' }}>
                Today's recommended topic
              </p>
              <p className="text-sm font-bold truncate" style={{ color: '#f8fafc' }}>
                {sparkTopic.title}
              </p>
            </div>

            {/* CTA chip */}
            <div
              className="shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold"
              style={{
                background: 'rgba(99,102,241,0.22)',
                color: '#a5b4fc',
                border: '1px solid rgba(99,102,241,0.4)',
              }}
            >
              Start
              <ChevronRight size={12} strokeWidth={2.5} />
            </div>
          </motion.button>
        </div>
      )}

      {/* ── CONTINUE LEARNING ───────────────────────────────── */}
      <div className="px-5 mb-4 space-y-3">
        <motion.button
          className="w-full rounded-[20px] flex items-center justify-between px-5 py-4"
          style={{
            background: resumeModule
              ? `linear-gradient(135deg, ${resumeModule.color}cc, ${resumeModule.color}88)`
              : 'linear-gradient(135deg, #155dfc, #2b7fff)',
            boxShadow: resumeModule
              ? `0 8px 28px ${resumeModule.color}40`
              : '0 8px 28px rgba(21,93,252,0.4)',
            color: '#fff',
          }}
          onClick={() => navigate(`/lesson/${firstUnmastered}`)}
          whileTap={{ scale: 0.97 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          aria-label={`Continue learning: ${resumeTopic?.title || 'next topic'}`}
        >
          <div className="flex items-center gap-3">
            {/* Module colour dot */}
            {resumeModule && (
              <div
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ background: '#fff', opacity: 0.75 }}
              />
            )}
            <div className="text-left">
              <div className="text-xs font-semibold uppercase tracking-wide opacity-75 mb-0.5">
                {masteredCount === 0 ? 'Start with' : 'Continue learning'}
              </div>
              <div className="text-sm font-bold">
                {resumeTopic?.title || 'Energy Stores'}
              </div>
              {resumeModule && (
                <div className="text-xs opacity-70 mt-0.5">{resumeModule.name}</div>
              )}
            </div>
          </div>
          <ChevronRight size={22} strokeWidth={2.5} />
        </motion.button>

        {/* Mastery View — secondary action */}
        <motion.button
          className="w-full py-3.5 rounded-[16px] flex items-center justify-between px-5"
          style={{
            background: 'rgba(18,26,47,0.9)',
            border: '0.75px solid rgba(99,102,241,0.3)',
            color: '#fff',
          }}
          onClick={() => navigate('/mastery')}
          whileTap={{ scale: 0.97 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.36 }}
          aria-label="View mastery progress"
        >
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-[10px] flex items-center justify-center"
              style={{ background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)' }}
            >
              <Target size={15} color="#6366f1" />
            </div>
            <div className="text-left">
              <div className="text-sm font-semibold" style={{ color: '#f8fafc' }}>Mastery View</div>
              <div className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#64748b' }}>Track your progress</div>
            </div>
          </div>
          <ChevronRight size={14} color="#a8b8cc" />
        </motion.button>
      </div>

      {/* ── INSIGHTS ────────────────────────────────────────── */}
      <AnimatePresence>
        {hasData && (
          <motion.div
            className="px-5 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {/* Section header */}
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp size={13} color="#6366f1" />
              <span
                className="text-xs font-semibold uppercase tracking-wide"
                style={{ color: '#a8b8cc' }}
              >
                Your Insights
              </span>
              {overallAccuracy !== null && (
                <span
                  className="ml-auto text-xs font-bold px-2 py-0.5 rounded-full"
                  style={{
                    background: overallAccuracy >= 0.7 ? 'rgba(0,188,125,0.15)' : 'rgba(249,115,22,0.15)',
                    color: overallAccuracy >= 0.7 ? '#00bc7d' : '#f97316',
                  }}
                >
                  {Math.round(overallAccuracy * 100)}% overall
                </span>
              )}
            </div>

            {/* Needs Work — mini cards with ⚠️ badge */}
            {weakTopics.length > 0 && (
              <div className="mb-4">
                <div className="flex items-center gap-1.5 mb-2.5">
                  <AlertCircle size={11} color="#f97316" />
                  <span className="text-xs font-semibold" style={{ color: '#f97316' }}>
                    Needs work
                  </span>
                </div>
                <div className="space-y-2">
                  {weakTopics.map((x, i) => (
                    <motion.button
                      key={x.id}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-[16px] text-left relative overflow-hidden"
                      style={{
                        background: 'rgba(249,115,22,0.07)',
                        border: '0.75px solid rgba(249,115,22,0.25)',
                      }}
                      onClick={() => navigate(`/diagnostic/${x.id}`)}
                      whileTap={{ scale: 0.97 }}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.42 + i * 0.06 }}
                    >
                      {/* ⚠️ badge in top-right */}
                      <span
                        className="absolute top-2 right-3 text-xs"
                        aria-hidden="true"
                        style={{ fontSize: 12 }}
                      >
                        ⚠️
                      </span>

                      {/* accuracy bubble */}
                      <div
                        className="w-10 h-10 rounded-[12px] flex items-center justify-center shrink-0 text-xs font-bold"
                        style={{
                          background: `${x.topic.moduleColor}20`,
                          color: x.topic.moduleColor,
                          border: `1px solid ${x.topic.moduleColor}40`,
                        }}
                      >
                        {Math.round(x.accuracy * 100)}%
                      </div>

                      <div className="flex-1 min-w-0 pr-6">
                        <div className="text-sm font-bold truncate" style={{ color: '#f8fafc' }}>
                          {x.topic.title}
                        </div>
                        <div className="text-xs leading-relaxed" style={{ color: '#a8b8cc' }}>
                          Tap to practise again
                        </div>
                      </div>

                      <ChevronRight size={13} color="#f97316" className="shrink-0" />
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Suggested next */}
            {suggestions.length > 0 && (
              <div>
                <div className="flex items-center gap-1.5 mb-2.5">
                  <Sparkles size={11} color="#6366f1" />
                  <span className="text-xs font-semibold" style={{ color: '#6366f1' }}>
                    Suggested for you
                  </span>
                </div>
                <div
                  className="flex gap-2 overflow-x-auto pb-1"
                  style={{ scrollbarWidth: 'none' }}
                >
                  {suggestions.map((x, i) => (
                    <motion.button
                      key={x.id}
                      className="flex-shrink-0 w-36 flex flex-col gap-1.5 px-3 py-3 rounded-[14px] text-left"
                      style={{
                        background: 'rgba(18,26,47,0.9)',
                        border: `0.75px solid ${x.topic.moduleColor}40`,
                      }}
                      onClick={() =>
                        navigate(
                          x.reason === 'needs work'
                            ? `/diagnostic/${x.id}`
                            : `/lesson/${x.id}`
                        )
                      }
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
                      <div
                        className="text-xs font-semibold leading-snug"
                        style={{ color: '#f8fafc' }}
                      >
                        {x.topic.title}
                      </div>
                      <div
                        className="text-xs px-1.5 py-0.5 rounded-full self-start"
                        style={{
                          background:
                            x.reason === 'needs work'
                              ? 'rgba(249,115,22,0.15)'
                              : 'rgba(99,102,241,0.15)',
                          color:
                            x.reason === 'needs work' ? '#f97316' : '#818cf8',
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

      {/* ── ALL MODULES ─────────────────────────────────────── */}
      <div className="px-5 pb-8">
        <div
          className="text-xs font-semibold uppercase tracking-wide mb-3"
          style={{ color: '#a8b8cc' }}
        >
          All Modules
        </div>
        <div className="space-y-2">
          {MODULES.map((module, i) => {
            const mastCount = module.topics.filter(t => progress[t]?.mastered).length
            const pct =
              module.topics.length > 0
                ? Math.round((mastCount / module.topics.length) * 100)
                : 0
            return (
              <motion.button
                key={module.name}
                className="w-full text-left flex items-center gap-3 p-4 rounded-[16px]"
                style={{
                  background: 'rgba(18,26,47,0.9)',
                  border: '0.75px solid #1d293d',
                }}
                onClick={() => navigate('/topics')}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.05 }}
                aria-label={`${module.name}: ${mastCount} of ${module.topics.length} topics mastered`}
              >
                <div
                  className="w-9 h-9 rounded-[12px] flex items-center justify-center shrink-0"
                  style={{
                    background: `${module.color}20`,
                    border: `1px solid ${module.color}40`,
                  }}
                >
                  <module.icon size={18} color={module.color} strokeWidth={2} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold" style={{ color: '#f8fafc' }}>
                    {module.name}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <div
                      className="flex-1 h-1 rounded-full overflow-hidden"
                      style={{ background: '#1d293d' }}
                    >
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${pct}%`,
                          background: module.color,
                          opacity: 0.75,
                        }}
                      />
                    </div>
                    <span className="text-xs shrink-0" style={{ color: '#a8b8cc' }}>
                      {mastCount}/{module.topics.length}
                    </span>
                  </div>
                </div>
                <ChevronRight size={14} color="#a8b8cc" />
              </motion.button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
