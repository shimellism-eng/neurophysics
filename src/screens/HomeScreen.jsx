import { motion } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import { ChevronRight, Zap, Star, BookOpen, Flame } from 'lucide-react'
import { MODULES, TOPICS } from '../data/topics'
import { useProgress } from '../hooks/useProgress'

export default function HomeScreen() {
  const navigate = useNavigate()
  const { progress, stats } = useProgress()

  const masteredCount = Object.values(progress).filter(p => p.mastered).length

  const statsCards = [
    { label: 'XP', value: stats.xp || 0, icon: Zap, color: '#fdc700' },
    { label: 'Streak', value: `${stats.streak || 0}d`, icon: Flame, color: '#f97316' },
    { label: 'Mastered', value: masteredCount, icon: Star, color: '#00bc7d' },
  ]

  // Find first unstarted topic to resume
  const allTopicIds = MODULES.flatMap(m => m.topics)
  const firstUnmastered = allTopicIds.find(id => !progress[id]?.mastered) || allTopicIds[0]

  return (
    <div className="flex flex-col h-full overflow-y-auto" style={{ background: '#0b1121' }}>
      {/* Hero */}
      <div className="px-5 pt-10 pb-5">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-2 mb-2">
            <div
              className="w-8 h-8 rounded-[10px] flex items-center justify-center"
              style={{ background: 'rgba(21,93,252,0.15)', border: '1px solid rgba(21,93,252,0.3)' }}
            >
              <BookOpen size={15} color="#155dfc" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#155dfc' }}>NeuroPhysics</span>
          </div>
          <h1 className="text-3xl font-extrabold leading-tight mb-2" style={{ color: '#f8fafc' }}>
            GCSE Physics<br />
            <span style={{ color: '#155dfc' }}>Made Clear</span>
          </h1>
          <p className="text-sm leading-relaxed" style={{ color: '#90a1b9' }}>
            {Object.keys(TOPICS).length} topics · {MODULES.length} modules · built for neurodivergent learners
          </p>
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
              <div className="text-xs" style={{ color: '#90a1b9' }}>{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA buttons */}
      <div className="px-5 mb-5 space-y-3">
        <motion.button
          className="w-full py-4 rounded-[16px] flex items-center justify-between px-5 font-semibold text-base"
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
        >
          <div>
            <div className="text-xs opacity-75 font-normal">Continue learning</div>
            <div className="text-sm font-bold">{TOPICS[firstUnmastered]?.title || 'Energy Stores'} →</div>
          </div>
          <ChevronRight size={22} strokeWidth={2.5} />
        </motion.button>

      </div>

      {/* Modules */}
      <div className="px-5 pb-8">
        <div className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: '#90a1b9' }}>
          All Modules
        </div>
        <div className="space-y-2">
          {MODULES.map((module, i) => {
            const mastCount = module.topics.filter(t => progress[t]?.mastered).length
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
              >
                <div
                  className="w-9 h-9 rounded-[12px] flex items-center justify-center shrink-0"
                  style={{ background: `${module.color}20`, border: `1px solid ${module.color}40` }}
                >
                  <module.icon size={18} color={module.color} strokeWidth={2} />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold" style={{ color: '#f8fafc' }}>{module.name}</div>
                  <div className="text-xs" style={{ color: '#90a1b9' }}>{mastCount}/{module.topics.length} mastered</div>
                </div>
                <ChevronRight size={14} color="#90a1b9" />
              </motion.button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
