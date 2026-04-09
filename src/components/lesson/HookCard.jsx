/**
 * HookCard — Step 1
 * Activates curiosity and personal relevance BEFORE cognitive work begins.
 * Research: ADHD motivation (Barkley novelty/interest model), UDL affective network,
 * autistic learners need the "why" before investing attention.
 */
import { motion } from 'motion/react'
import { Zap } from 'lucide-react'

export default function HookCard({ hook, moduleColor, onReady }) {
  const { hookFact, hookQuestion, hookEmoji = '⚡' } = hook

  return (
    <motion.div
      className="flex flex-col gap-5 px-5 py-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Fact card */}
      <div
        className="rounded-[20px] px-5 py-5 relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${moduleColor}22 0%, ${moduleColor}08 100%)`,
          border: `1.5px solid ${moduleColor}40`,
        }}
      >
        {/* Large background emoji */}
        <div
          className="absolute right-4 top-3 text-6xl select-none pointer-events-none"
          style={{ opacity: 0.15 }}
          aria-hidden="true"
        >
          {hookEmoji}
        </div>

        <div
          className="text-[10px] font-bold uppercase tracking-widest mb-3 flex items-center gap-1.5"
          style={{ color: moduleColor }}
        >
          <Zap size={11} />
          Did you know?
        </div>

        <p
          className="text-base font-semibold leading-snug"
          style={{ color: '#f8fafc', letterSpacing: '-0.01em' }}
        >
          {hookFact}
        </p>
      </div>

      {/* Prior knowledge question */}
      <div>
        <div
          className="text-[10px] font-bold uppercase tracking-widest mb-3"
          style={{ color: 'rgba(255,255,255,0.35)' }}
        >
          Before we start — just for you
        </div>
        <div
          className="rounded-[16px] px-4 py-4"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <p className="text-sm leading-relaxed" style={{ color: '#cad5e2' }}>
            {hookQuestion}
          </p>
          <p
            className="text-xs mt-2"
            style={{ color: 'rgba(255,255,255,0.3)' }}
          >
            No right or wrong answer — this is just for you.
          </p>
        </div>
      </div>

      {/* Ready CTA */}
      <motion.button
        className="w-full py-4 rounded-[16px] font-bold text-sm flex items-center justify-center gap-2"
        style={{
          background: `linear-gradient(135deg, ${moduleColor}, ${moduleColor}bb)`,
          boxShadow: `0 8px 24px ${moduleColor}35`,
          color: '#fff',
        }}
        onClick={onReady}
        whileTap={{ scale: 0.97 }}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        I'm ready — let's learn this
      </motion.button>
    </motion.div>
  )
}
