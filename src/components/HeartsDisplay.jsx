import { motion, AnimatePresence } from 'motion/react'

export default function HeartsDisplay({ hearts, maxHearts = 3 }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: maxHearts }).map((_, i) => (
        <motion.div
          key={i}
          animate={i >= hearts ? { scale: [1, 0.6, 1] } : { scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <span
            style={{
              fontSize: 16,
              opacity: i < hearts ? 1 : 0.2,
              filter: i < hearts ? 'none' : 'grayscale(1)',
              display: 'block',
              lineHeight: 1,
            }}
          >
            ❤️
          </span>
        </motion.div>
      ))}
    </div>
  )
}
