import { motion } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import { ChevronRight, Zap, Star, BookOpen, Flame, Target } from 'lucide-react'
import { MODULES, TOPICS } from '../data/topics'
import { useProgress } from '../hooks/useProgress'

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

export default function HomeScreen() {
  const navigate = useNavigate()
  const { progress, stats } = useProgress()
  const profile = loadProfile()

  const displayName = profile.name || 'Learner'
  const avatar = profile.avatar || '🧠'
  const greeting = getGreeting()

  const masteredCount = Object.values(progress).filter(p => p.mastered).length
  const totalTopics = Object.keys(TOPICS).length
  const progressPct = totalTopics > 0 ? Math.round((masteredCount / totalTopics) * 100) : 0

  const statsCards = [
    { label: 'XP',      value: stats.xp || 0,           icon: Zap,    color: '#fdc700' },
    { label: 'Streak',  value: `${stats.streak || 0}d`,  icon: Flame,  color: '#f97316' },
    { label: 'Mastered', value: masteredCount,            icon: Star,   color: '#00bc7d' },
  ]

  // Find first unstarted topic to resume
  const allTopicIds = MODULES.flatMap(m => m.topics)
  const firstUnmastered = allTopicIds.find(id => !progress[id]?.mastered) || allTopicIds[0]
  const resumeTopic = TOPICS[firstUnmastered]

  return (
    <div className="flex flex-col h-full overflow-y-auto" style={{ background: '#0b1121' }}>

      {/* Hero / greeting */}
      <div className="px-5 pt-8 pb-5">
        <motion.div
          className="flex items-center gap-3 mb-4"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Avatar */}
          <div
            className="w-14 h-14 rounded-[18px] flex items-center justify-center text-2xl shrink-0"
            style={{
              background: 'linear-gradient(135deg, rgba(21,93,252,0.18), rgba(99,102,241,0.18))',
              border: '1px solid rgba(99,102,241,0.3)',
            }}
          >
            {avatar}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-widest mb-0.5" style={{ color: '#6366f1' }}>
              {greeting}
            </p>
            <h1 className="text-2xl font-extrabold leading-tight truncate" style={{ color: '#f8fafc', letterSpacing: '-0.01em' }}>
              {displayName}
            </h1>
            <p className="text-xs mt-0.5" style={{ color: '#a8b8cc' }}>GCSE Physics · {progressPct}% complete</p>
          </div>
        </motion.div>

        {/* Progress bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.45 }}
        >
          <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: '#1d293d' }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, #155dfc, #6366f1)' }}
              initial={{ width: 0 }}
              animate={{ width: `${progressPct}%` }}
              transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
            />
          </div>
          <div className="flex justify-between mt-1.5">
            <span className="text-xs" style={{ color: '#4a5a72' }}>{masteredCount} mastered</span>
            <span className="text-xs" style={{ color: '#4a5a72' }}>{totalTopics} total</span>
          </div>
        </motion.div>
      </div>

      {/* Stats */}
      <div className="px-5 mb-5">
        <div className="grid grid-cols-3 gap-3">
          {statsCards.map((s, i) => (
            <motion.div
              key={i}
              className="rounded-[16px] p-4 text-center"
              style={{ background: 'rgba(18,26,47,0.9)', border: '0.75px solid #1d293d' }}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.07 }}
            >
              <s.icon size={18} color={s.color} className="mx-auto mb-2" />
              <div className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</div>
              <div className="text-xs" style={{ color: '#a8b8cc' }}>{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA — resume */}
      <div className="px-5 mb-5 space-y-3">
        <motion.button
          className="w-full py-4 rounded-[16px] flex items-center justify-between px-5"
          style={{
            background: 'linear-gradient(135deg, #155dfc, #2b7fff)',
            boxShadow: '0px 8px 24px rgba(21,93,252,0.4)',
            color: '#fff',
          }}
          onClick={() => navigate(`/lesson/${firstUnmastered}`)}
          whileTap={{ scale: 0.97 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          aria-label={`Continue learning: ${resumeTopic?.title || 'next topic'}`}
        >
          <div className="text-left">
            <div className="text-xs opacity-75 font-normal mb-0.5">Continue learning</div>
            <div className="text-sm font-bold">{resumeTopic?.title || 'Energy Stores'}</div>
          </div>
          <ChevronRight size={22} strokeWidth={2.5} />
        </motion.button>

        {/* Quick practice */}
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
              <div className="text-xs" style={{ color: '#a8b8cc' }}>Track your progress</div>
            </div>
          </div>
          <ChevronRight size={14} color="#a8b8cc" />
        </motion.button>
      </div>

      {/* Modules */}
      <div className="px-5 pb-8">
        <div className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: '#a8b8cc' }}>
          All Modules
        </div>
        <div className="space-y-2">
          {MODULES.map((module, i) => {
            const mastCount = module.topics.filter(t => progress[t]?.mastered).length
            const pct = module.topics.length > 0 ? Math.round((mastCount / module.topics.length) * 100) : 0
            return (
              <motion.button
                key={module.name}
                className="w-full text-left flex items-center gap-3 p-4 rounded-[16px]"
                style={{ background: 'rgba(18,26,47,0.9)', border: '0.75px solid #1d293d' }}
                onClick={() => navigate('/topics')}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.05 }}
                aria-label={`${module.name}: ${mastCount} of ${module.topics.length} topics mastered`}
              >
                <div
                  className="w-9 h-9 rounded-[12px] flex items-center justify-center shrink-0"
                  style={{ background: `${module.color}20`, border: `1px solid ${module.color}40` }}
                >
                  <module.icon size={18} color={module.color} strokeWidth={2} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold" style={{ color: '#f8fafc' }}>{module.name}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex-1 h-1 rounded-full overflow-hidden" style={{ background: '#1d293d' }}>
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${pct}%`, background: module.color, opacity: 0.75 }}
                      />
                    </div>
                    <span className="text-xs shrink-0" style={{ color: '#a8b8cc' }}>{mastCount}/{module.topics.length}</span>
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
