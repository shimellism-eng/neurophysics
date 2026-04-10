import { motion } from 'motion/react'
import { useSearchParams } from 'react-router-dom'
import { CheckCircle, Zap, Flame } from 'lucide-react'
import { TOPICS, MODULES } from '../data/topics'

function decodeProgress(encoded) {
  try {
    return JSON.parse(atob(encoded))
  } catch { return null }
}

export default function ShareProgressScreen() {
  const [searchParams] = useSearchParams()
  const raw = searchParams.get('d')
  const data = raw ? decodeProgress(raw) : null

  if (!data) {
    return (
      <div className="flex flex-col h-full items-center justify-center px-8" style={{ background: '#080f1e' }}>
        <div className="text-4xl mb-4">🔬</div>
        <h2 className="font-bold text-xl mb-2 text-center" style={{ color: '#f8fafc' }}>Invalid progress link</h2>
        <p className="text-center text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
          This link may have expired or been corrupted.
        </p>
        <a href="https://www.neurophysics.co.uk" className="mt-6 px-6 py-3 rounded-[14px] font-bold text-sm" style={{ background: '#6366f1', color: '#fff' }}>
          Try NeuroPhysics →
        </a>
      </div>
    )
  }

  const { name, avatar, masteredIds, streak, xp } = data
  const masteredSet = new Set(masteredIds || [])
  const totalTopics = Object.keys(TOPICS).length
  const masteredCount = masteredSet.size
  const progressPct = totalTopics > 0 ? Math.round((masteredCount / totalTopics) * 100) : 0

  return (
    <div className="flex flex-col min-h-full overflow-y-auto px-5 py-8" style={{ background: '#080f1e' }}>
      {/* Header */}
      <motion.div
        className="text-center mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="text-5xl mb-3">{avatar || '🧠'}</div>
        <h1 className="font-bold text-2xl mb-0.5" style={{ color: '#f8fafc', letterSpacing: '-0.03em' }}>
          {name || 'A Physics Learner'}
        </h1>
        <p className="text-sm" style={{ color: '#6366f1' }}>GCSE Physics Progress</p>
      </motion.div>

      {/* Stats row */}
      <motion.div
        className="flex gap-3 mb-6"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {[
          { icon: CheckCircle, value: masteredCount, label: 'Mastered', color: '#22c55e' },
          { icon: Flame, value: streak || 0, label: 'Day streak', color: '#f97316' },
          { icon: Zap, value: xp || 0, label: 'XP earned', color: '#fdc700' },
        ].map(({ icon: Icon, value, label, color }) => (
          <div key={label} className="flex-1 rounded-[18px] p-4 text-center" style={{ background: 'rgba(18,26,47,0.9)', border: '0.75px solid #1d293d' }}>
            <Icon size={18} color={color} className="mx-auto mb-1" />
            <div className="font-bold text-lg" style={{ color: '#f8fafc' }}>{value}</div>
            <div className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.3)' }}>{label}</div>
          </div>
        ))}
      </motion.div>

      {/* Progress bar */}
      <motion.div className="mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}>
        <div className="flex justify-between mb-1.5">
          <span className="text-xs font-semibold" style={{ color: 'rgba(255,255,255,0.35)' }}>Overall progress</span>
          <span className="text-xs font-bold" style={{ color: '#6366f1' }}>{masteredCount}/{totalTopics} topics</span>
        </div>
        <div className="w-full rounded-full overflow-hidden" style={{ height: 8, background: 'rgba(255,255,255,0.06)' }}>
          <motion.div
            className="h-full rounded-full"
            style={{ background: 'linear-gradient(90deg, #6366f1, #818cf8)' }}
            initial={{ width: 0 }}
            animate={{ width: `${progressPct}%` }}
            transition={{ delay: 0.4, duration: 1, ease: 'easeOut' }}
          />
        </div>
      </motion.div>

      {/* Mastered topics by module */}
      {MODULES.map((module, mi) => {
        const mastered = module.topics.filter(id => masteredSet.has(id))
        if (!mastered.length) return null
        return (
          <motion.div
            key={module.id}
            className="mb-4"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + mi * 0.05 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <module.icon size={13} color={module.color} />
              <span className="text-xs font-bold uppercase tracking-wider" style={{ color: module.color }}>{module.name}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {mastered.map(id => (
                <span
                  key={id}
                  className="px-3 py-1.5 rounded-full text-xs font-semibold"
                  style={{ background: `${module.color}18`, border: `1px solid ${module.color}30`, color: module.color }}
                >
                  ✓ {TOPICS[id]?.title}
                </span>
              ))}
            </div>
          </motion.div>
        )
      })}

      {/* CTA */}
      <motion.div
        className="mt-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-sm mb-3" style={{ color: 'rgba(255,255,255,0.35)' }}>
          Learn GCSE Physics with AI-powered tutoring
        </p>
        <a
          href="https://www.neurophysics.co.uk"
          className="inline-block px-8 py-3.5 rounded-[16px] font-bold text-sm"
          style={{ background: 'linear-gradient(135deg, #6366f1, #818cf8)', color: '#fff', boxShadow: '0 4px 20px rgba(99,102,241,0.4)' }}
        >
          Start learning free at NeuroPhysics →
        </a>
      </motion.div>

      <div className="h-10" />
    </div>
  )
}
