/**
 * ScreenTransition — 220ms translateX slide wrapper for route changes.
 * Wraps each route's content. Respects prefers-reduced-motion (opacity-only).
 *
 * Usage: wrap the screen component inside a route with this component.
 * The parent AnimatePresence in App.jsx drives enter/exit.
 */
import { motion } from 'motion/react'
import { useReducedMotion } from '../hooks/useReducedMotion'

export default function ScreenTransition({ children, direction = 1 }) {
  const reduced = useReducedMotion()

  const variants = reduced
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit:    { opacity: 0 },
      }
    : {
        initial: { opacity: 0, x: 24 * direction },
        animate: { opacity: 1, x: 0 },
        exit:    { opacity: 0, x: -24 * direction },
      }

  return (
    <motion.div
      className="flex flex-col h-full w-full overflow-hidden"
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  )
}
