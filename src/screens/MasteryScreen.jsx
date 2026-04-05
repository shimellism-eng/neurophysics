import { motion } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle, Circle, Zap } from 'lucide-react'
import { TOPICS, MODULES } from '../data/topics'
import { useProgress } from '../hooks/useProgress'

export default function MasteryScreen() {
  const navigate = useNavigate()
  const { progress } = useProgress()

  const allTopics = Object.values(TOPICS)
  const mastered = allTopics.filter(t => progress[t.id]?.mastered)
  const started = allTopics.filter(t => progress[t.id]?.started && !progress[t.id]?.mastered)
  const percent = Math.round((mastered.length / allTopics.length) * 100)

  return (
    <div className="flex flex-col h-full overflow-y-auto" style={{ background: '#0b1121' }}>
      <div className="px-5 pt-6 pb-4">
        <h1 className="text-2xl font-bold" style={{ color: '#f8fafc' }}>Mastery</h1>
        <p className="text-sm mt-1" style={{ color: '#90a1b9' }}>Track your physics knowledge</p>
      </div>

      {/* Overall progress ring */}
      <div className="px-5 mb-6">
        <div className="rounded-[24px] p-6 flex items-center gap-6" style={{ background: 'rgba(18,26,47,0.9)', border: '0.75px solid #1d293d' }}>
          <div className="relative w-24 h-24 shrink-0">
            <svg width="96" height="96" viewBox="0 0 96 96">
              <circle cx="48" cy="48" r="40" fill="none" stroke="#1d293d" strokeWidth="8" />
              <motion.circle
                cx="48" cy="48" r="40"
                fill="none"
                stroke="#155dfc"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 40}`}
                strokeDashoffset={`${2 * Math.PI * 40 * (1 - percent / 100)}`}
                transform="rotate(-90 48 48)"
                initial={{ strokeDashoffset: 2 * Math.PI * 40 }}
                animate={{ strokeDashoffset: 2 * Math.PI * 40 * (1 - percent / 100) }}
                transition={{ duration: 1, ease: 'easeOut' }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xl font-bold" style={{ color: '#f8fafc' }}>{percent}%</span>
            </div>
          </div>
          <div>
            <div className="text-lg font-bold" style={{ color: '#f8fafc' }}>{mastered.length}/{allTopics.length}</div>
            <div className="text-sm" style={{ color: '#90a1b9' }}>Topics mastered</div>
            <div className="flex gap-3 mt-3">
              <div className="flex items-center gap-1.5">
                <CheckCircle size={12} color="#00bc7d" />
                <span className="text-xs" style={{ color: '#90a1b9' }}>{mastered.length} done</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap size={12} color="#fdc700" />
                <span className="text-xs" style={{ color: '#90a1b9' }}>{started.length} active</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Per-module breakdown */}
      <div className="px-5 pb-8 space-y-3">
        {MODULES.map((mod, i) => {
          const masteredCount = mod.topics.filter(t => progress[t]?.mastered).length
          const pct = Math.round((masteredCount / mod.topics.length) * 100)
          return (
            <motion.div
              key={mod.name}
              className="rounded-[16px] p-4"
              style={{ background: 'rgba(18,26,47,0.9)', border: '0.75px solid #1d293d' }}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <mod.icon size={20} color={mod.color} strokeWidth={2} />
                <div className="flex-1">
                  <div className="text-sm font-semibold" style={{ color: '#f8fafc' }}>{mod.name}</div>
                  <div className="text-xs" style={{ color: '#90a1b9' }}>{masteredCount}/{mod.topics.length} mastered</div>
                </div>
                <span className="text-xs font-bold" style={{ color: mod.color }}>{pct}%</span>
              </div>
              <div className="h-2 rounded-full" style={{ background: '#1d293d' }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: mod.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.8, delay: i * 0.07 }}
                />
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {mod.topics.map(topicId => {
                  const t = TOPICS[topicId]
                  const isMastered = progress[topicId]?.mastered
                  const isStarted = progress[topicId]?.started
                  return (
                    <button
                      key={topicId}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs"
                      style={{
                        background: isMastered ? `${mod.color}20` : 'rgba(29,41,61,0.6)',
                        border: `0.75px solid ${isMastered ? mod.color : '#1d293d'}`,
                        color: isMastered ? mod.color : '#90a1b9',
                      }}
                      onClick={() => navigate(`/lesson/${topicId}`)}
                    >
                      {isMastered ? <CheckCircle size={10} /> : isStarted ? <Zap size={10} /> : <Circle size={10} />}
                      {t.title}
                    </button>
                  )
                })}
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
