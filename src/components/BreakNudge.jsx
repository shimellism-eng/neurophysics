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
          className="np-interruption-card px-5 py-4 flex items-start gap-4"
          style={{
            background: isLong
              ? 'linear-gradient(180deg, rgba(94,167,161,0.09), rgba(255,255,255,0.015)), var(--surface-raised)'
              : 'linear-gradient(180deg, rgba(216,139,45,0.08), rgba(255,255,255,0.015)), var(--surface-raised)',
            border: isLong
              ? '1px solid rgba(116,188,181,0.24)'
              : '1px solid rgba(216,139,45,0.22)',
          }}
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.14em] shrink-0" style={{ color: isLong ? 'var(--np-accent-strong)' : 'var(--np-amber)', paddingTop: 4 }}>Break</span>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold" style={{ color: isLong ? 'var(--np-text)' : 'var(--np-text)' }}>
              {isLong ? 'You\'ve been studying for 25 minutes.' : 'You\'ve been going for 15 minutes.'}
            </p>
            <p className="text-xs mt-1 leading-relaxed" style={{ color: 'var(--np-text-muted)' }}>
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
                  color: 'var(--np-text-muted)',
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
