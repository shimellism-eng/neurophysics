/**
 * SessionPreview — Pre-lesson bottom sheet (1.3 Session Framing)
 * Shows: part count, named step list with per-step time, total estimate.
 * Start / Not now actions. No forced start.
 */
import { motion, AnimatePresence } from 'motion/react'
import { Clock } from 'lucide-react'

// Estimated minutes per step type
const STEP_MINUTES = {
  hook:       2,
  vocab:      2,
  connect:    1.5,
  explore:    3,
  understand: 2.5,
  practise:   2.5,
  lockin:     2,
  realworld:  1.5,
  recall:     2,
  practice:   2.5,
  exam:       2.5,
  summary:    1.5,
}

export function estimateMinutes(steps) {
  if (!steps?.length) return 10
  const total = steps.reduce((sum, s) => sum + (STEP_MINUTES[s.id] || 2), 0)
  return Math.round(total)
}

export default function SessionPreview({
  isOpen,
  topic,
  steps = [],
  onStart,
  onDismiss,
}) {
  if (!isOpen || !topic) return null

  const totalMinutes = estimateMinutes(steps)

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex flex-col justify-end"
          style={{
            background: 'rgba(8,15,30,0.75)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
          }}
          onClick={onDismiss}
        >
          <motion.div
            className="rounded-t-[28px] px-6 pt-5 pb-8"
            style={{
              background: '#0d1629',
              position: 'relative',
              overflow: 'hidden',
              maxHeight: '88vh',
              display: 'flex',
              flexDirection: 'column',
            }}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            onClick={e => e.stopPropagation()}
          >
            {/* Radial bloom */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 180,
                background: `radial-gradient(ellipse 80% 100% at 50% 0%, ${topic.moduleColor}22 0%, transparent 70%)`,
                pointerEvents: 'none',
              }}
            />

            {/* Drag handle */}
            <div className="flex justify-center mb-4" style={{ position: 'relative' }}>
              <div style={{ width: 40, height: 4, borderRadius: 999, background: 'rgba(255,255,255,0.15)' }} />
            </div>

            {/* Module label */}
            <div
              className="uppercase tracking-widest mb-1"
              style={{ color: topic.moduleColor, fontSize: 11, fontWeight: 700, position: 'relative' }}
            >
              {topic.module}
            </div>

            {/* Topic title */}
            <h2
              style={{
                color: '#f8fafc', fontSize: 22, fontWeight: 800,
                letterSpacing: '-0.02em', lineHeight: 1.2,
                marginBottom: 10, position: 'relative',
                fontFamily: 'var(--font-display)',
              }}
            >
              {topic.title}
            </h2>

            {/* Part count + time */}
            <div className="flex items-center gap-2 mb-4" style={{ position: 'relative' }}>
              <span
                style={{
                  fontSize: 12, fontWeight: 600,
                  color: 'rgba(255,255,255,0.5)',
                }}
              >
                {steps.length} part{steps.length !== 1 ? 's' : ''}
              </span>
              <span style={{ color: 'rgba(255,255,255,0.2)' }}>·</span>
              <span className="flex items-center gap-1" style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.5)' }}>
                <Clock size={11} />
                About {totalMinutes} min
              </span>
            </div>

            {/* Step list */}
            {steps.length > 0 && (
              <div
                className="mb-5 overflow-y-auto"
                style={{
                  position: 'relative',
                  borderRadius: 14,
                  background: 'rgba(255,255,255,0.04)',
                  border: '0.75px solid rgba(255,255,255,0.07)',
                  flexShrink: 0,
                  maxHeight: 260,
                }}
              >
                {steps.map((s, i) => {
                  const Icon = s.icon
                  const mins = STEP_MINUTES[s.id] || 2
                  const isFirst = i === 0
                  return (
                    <div
                      key={s.id}
                      className="flex items-center gap-3 px-4"
                      style={{
                        paddingTop: 10, paddingBottom: 10,
                        borderTop: isFirst ? 'none' : '0.75px solid rgba(255,255,255,0.06)',
                      }}
                    >
                      {/* Step number */}
                      <div
                        style={{
                          width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
                          background: i === 0 ? topic.moduleColor : 'rgba(255,255,255,0.08)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}
                      >
                        {Icon
                          ? <Icon size={11} color={i === 0 ? '#fff' : 'rgba(255,255,255,0.4)'} />
                          : <span style={{ fontSize: 10, fontWeight: 700, color: i === 0 ? '#fff' : 'rgba(255,255,255,0.4)' }}>{i + 1}</span>
                        }
                      </div>

                      {/* Label + hint */}
                      <div className="flex-1 min-w-0">
                        <div style={{ fontSize: 13, fontWeight: 600, color: i === 0 ? '#f8fafc' : 'rgba(255,255,255,0.7)' }}>
                          {s.label}
                        </div>
                        {s.hint && (
                          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 1 }}>
                            {s.hint}
                          </div>
                        )}
                      </div>

                      {/* Time */}
                      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', flexShrink: 0 }}>
                        ~{mins % 1 === 0 ? mins : mins.toFixed(1)} min
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            {/* Hook fact preview */}
            {topic.hook?.hookFact && (
              <p
                className="text-sm italic mb-5"
                style={{
                  color: 'rgba(255,255,255,0.45)', lineHeight: 1.55,
                  display: '-webkit-box', WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical', overflow: 'hidden',
                  position: 'relative',
                }}
              >
                {topic.hook.hookFact}
              </p>
            )}

            {/* Actions */}
            <div className="flex gap-3" style={{ position: 'relative', flexShrink: 0 }}>
              <motion.button
                className="flex-1 font-display font-bold text-base"
                style={{
                  height: 56, borderRadius: 16,
                  background: 'transparent',
                  color: 'rgba(255,255,255,0.6)',
                  border: '1.5px solid rgba(255,255,255,0.12)',
                  cursor: 'pointer',
                }}
                whileTap={{ y: 2 }}
                onClick={onDismiss}
              >
                Not now
              </motion.button>

              <motion.button
                className="flex-1 font-display font-bold text-base"
                style={{
                  height: 56, borderRadius: 16,
                  background: `${topic.moduleColor}`,
                  color: '#fff',
                  boxShadow: `0 6px 0 rgba(0,0,0,0.25), 0 12px 28px ${topic.moduleColor}35`,
                  border: 'none', cursor: 'pointer',
                }}
                whileTap={{ y: 4, boxShadow: `0 2px 0 rgba(0,0,0,0.15)` }}
                onClick={onStart}
              >
                Start session
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
