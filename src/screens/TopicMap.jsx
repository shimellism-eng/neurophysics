import { motion, AnimatePresence } from 'motion/react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle, ChevronRight, ChevronDown, Zap } from 'lucide-react'
import { MODULES, TOPICS } from '../data/topics'
import { useProgress } from '../hooks/useProgress'

export default function TopicMap() {
  const navigate = useNavigate()
  const { progress } = useProgress()

  // First module open by default
  const [openModules, setOpenModules] = useState(() => new Set([MODULES[0].name]))

  const toggleModule = (name) => {
    setOpenModules(prev => {
      const next = new Set(prev)
      if (next.has(name)) {
        next.delete(name)
      } else {
        next.add(name)
      }
      return next
    })
  }

  const getTopicState = (topicId) => {
    if (progress[topicId]?.mastered) return 'mastered'
    return 'active'
  }

  return (
    <div className="flex flex-col h-full overflow-hidden" style={{ background: '#0b1121' }}>
      {/* Header */}
      <div className="px-5 pt-6 pb-4 shrink-0">
        <h1 className="text-2xl font-bold" style={{ color: '#f8fafc' }}>GCSE Physics</h1>
        <p className="text-sm mt-1" style={{ color: '#a8b8cc' }}>{Object.keys(TOPICS).length} topics · {MODULES.length} modules</p>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-5 pb-8 space-y-3">
        {MODULES.map((module, moduleIndex) => {
          const isOpen = openModules.has(module.name)
          const masteredInModule = module.topics.filter(t => progress[t]?.mastered).length
          const progressPct = (masteredInModule / module.topics.length) * 100

          return (
            <motion.div
              key={module.name}
              className="rounded-[18px] overflow-hidden"
              style={{ border: `0.75px solid ${isOpen ? module.color + '50' : '#1d293d'}`, background: 'rgba(18,26,47,0.7)' }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: moduleIndex * 0.06 }}
            >
              {/* ── Module header (tap to expand/collapse) ── */}
              <button
                className="w-full flex items-center gap-3 px-4 py-3.5"
                onClick={() => toggleModule(module.name)}
                style={{ background: isOpen ? `${module.color}0d` : 'transparent' }}
              >
                <div
                  className="w-9 h-9 rounded-[12px] flex items-center justify-center shrink-0"
                  style={{ background: `${module.color}20`, border: `1px solid ${module.color}50` }}
                >
                  <module.icon size={18} color={module.color} strokeWidth={2} />
                </div>

                <div className="flex-1 text-left">
                  <div className="text-sm font-semibold" style={{ color: '#f8fafc' }}>{module.name}</div>
                  <div className="text-xs" style={{ color: '#a8b8cc' }}>
                    {masteredInModule}/{module.topics.length} mastered
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-14 h-1.5 rounded-full shrink-0" style={{ background: '#1d293d' }}>
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: module.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPct}%` }}
                    transition={{ duration: 0.8, delay: moduleIndex * 0.1 }}
                  />
                </div>

                {/* Chevron */}
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  className="shrink-0 ml-1"
                >
                  <ChevronDown size={16} color={isOpen ? module.color : '#4a5a72'} strokeWidth={2} />
                </motion.div>
              </button>

              {/* ── Topics (collapsible) ── */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="topics"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div className="px-3 pb-3 space-y-2">
                      {/* Divider */}
                      <div className="h-px mx-1 mb-2" style={{ background: `${module.color}25` }} />

                      {module.topics.map((topicId) => {
                        const topic = TOPICS[topicId]
                        const state = getTopicState(topicId)
                        const isMastered = state === 'mastered'

                        return (
                          <motion.button
                            key={topicId}
                            className="relative w-full text-left flex items-center gap-3 p-3.5 rounded-[14px]"
                            style={{
                              background: isMastered ? `${module.color}15` : 'rgba(11,17,33,0.6)',
                              border: `0.75px solid ${isMastered ? module.color + '80' : module.color + '30'}`,
                              boxShadow: isMastered ? `0 0 16px ${module.color}20` : 'none',
                            }}
                            onClick={() => navigate(`/lesson/${topicId}`)}
                            whileTap={{ scale: 0.97 }}
                          >
                            {/* Status dot */}
                            <div
                              className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center"
                              style={{
                                background: isMastered ? module.color : `${module.color}15`,
                                border: `1.5px solid ${module.color}`,
                              }}
                            >
                              {isMastered
                                ? <CheckCircle size={15} color="#fff" strokeWidth={2.5} />
                                : <Zap size={13} color={module.color} strokeWidth={2} />
                              }
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-semibold truncate" style={{ color: '#f8fafc' }}>
                                {topic.title}
                              </div>
                              <div className="text-xs truncate mt-0.5" style={{ color: '#a8b8cc' }}>
                                {topic.subtitle}
                              </div>
                              {/* Mini progress bar */}
                              <div className="mt-1.5 h-1 rounded-full" style={{ background: '#1d293d' }}>
                                <div
                                  className="h-full rounded-full"
                                  style={{
                                    background: module.color,
                                    width: isMastered ? '100%' : progress[topicId]?.started ? '40%' : '0%',
                                    transition: 'width 0.5s ease',
                                  }}
                                />
                              </div>
                            </div>

                            <ChevronRight size={14} color={module.color + '90'} strokeWidth={2} />
                          </motion.button>
                        )
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
