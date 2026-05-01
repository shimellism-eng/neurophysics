import { motion, AnimatePresence } from 'motion/react'

export default function HeartsDisplay({ hearts, maxHearts = 3 }) {
  return (
    <div className="flex items-center gap-1" role="status" aria-label={`${hearts} of ${maxHearts} hearts remaining`}>
      {Array.from({ length: maxHearts }).map((_, i) => (
        <motion.div
          key={i}
          animate={i >= hearts ? { scale: [1, 0.6, 1] } : { scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <span
            aria-hidden="true"
            style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              opacity: i < hearts ? 1 : 0.25,
              display: 'block',
              background: i < hearts ? '#ef4444' : 'rgba(255,255,255,0.25)',
              boxShadow: i < hearts ? '0 0 0 1px rgba(239,68,68,0.35)' : 'none',
            }}
          />
        </motion.div>
      ))}
    </div>
  )
}
