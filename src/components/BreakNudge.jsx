/**
 * BreakNudge — gentle session pacing prompt for ADHD learners.
 * F10/F12: surfaces at 15 min (short) and 25 min (long).
 */
import { motion, AnimatePresence } from 'motion/react'
import { X } from '@phosphor-icons/react'

export default function BreakNudge({ nudgeLevel, onDismiss, onSnooze }) {
  const isLong = nudgeLevel === 'long'

  return (
    <AnimatePresence>
      <motion.div
        className="fixed bottom-24 left-4 right-4 z-50 max-w-[440px] mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ type: 'spring', stiffness: 320, damping: 28 }}
      >
        <div
          className="rounded-[20px] px-5 py-4 flex items-start gap-4"
          style={{
            background: isLong ? 'rgba(99,102,241,0.15)' : 'rgba(253,199,0,0.10)',
            border: isLong ? '1px solid rgba(99,102,241,0.4)' : '1px solid rgba(253,199,0,0.35)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <span style={{ fontSize: 28, lineHeight: 1 }}>{isLong ? '🧘' : '☕'}</span>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold" style={{ color: isLong ? '#818cf8' : '#fdc700' }}>
              {isLong ? 'You\'ve been studying for 25 minutes.' : 'You\'ve been going for 15 minutes.'}
            </p>
            <p className="text-xs mt-1 leading-relaxed" style={{ color: '#a8b8cc' }}>
              {isLong
                ? 'Your brain needs a rest to consolidate memory. Take a 10-minute break before continuing.'
                : 'Good progress! A short 5-minute break now will help you remember more.'}
            </p>
          </div>
          <div className="flex flex-col items-end gap-2 shrink-0">
            <button
              className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(255,255,255,0.07)', border: '0.75px solid rgba(255,255,255,0.15)' }}
              onClick={onDismiss}
              aria-label="Dismiss break reminder"
            >
              <X size={14} color="#a8b8cc" />
            </button>
            {onSnooze && (
              <button
                className="text-[11px] font-medium px-2.5 py-1 rounded-full whitespace-nowrap"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '0.75px solid rgba(255,255,255,0.12)',
                  color: 'rgba(255,255,255,0.45)',
                }}
                onClick={onSnooze}
                aria-label="Snooze break reminder for 5 minutes"
              >
                Snooze 5 min
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
