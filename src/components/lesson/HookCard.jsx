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
        className="rounded-[22px] px-5 py-6 relative overflow-hidden"
        style={{
          minHeight: 200,
          background: `linear-gradient(135deg, ${moduleColor}22 0%, ${moduleColor}08 100%)`,
          border: `1.5px solid ${moduleColor}40`,
        }}
      >
        {/* Second decorative gradient layer */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(ellipse 60% 80% at 80% 120%, ${moduleColor}30, transparent)`,
            pointerEvents: 'none',
          }}
        />

        {/* Huge background emoji - decorative, bottom-right */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            right: 12,
            bottom: -8,
            fontSize: '120px',
            lineHeight: 1,
            opacity: 0.12,
            userSelect: 'none',
            pointerEvents: 'none',
          }}
        >
          {hookEmoji}
        </div>

        {/* "Did you know?" label */}
        <div
          className="flex items-center gap-2 mb-4"
          style={{
            fontSize: 11,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: moduleColor,
          }}
        >
          <Zap size={12} />
          Did you know?
        </div>

        {/* Hook fact */}
        <p
          style={{
            fontSize: 18,
            fontWeight: 700,
            lineHeight: 1.45,
            letterSpacing: '-0.02em',
            color: '#f8fafc',
            position: 'relative',
          }}
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
          Before we start - just for you
        </div>
        <div
          className="rounded-[16px] px-4 py-4"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderLeft: `3px solid ${moduleColor}60`,
          }}
        >
          <p
            className="leading-relaxed"
            style={{ fontSize: 15, fontWeight: 600, color: '#cad5e2' }}
          >
            {hookQuestion}
          </p>
          <p
            className="text-xs mt-2"
            style={{ color: 'rgba(255,255,255,0.3)' }}
          >
            No right or wrong answer - this is just for you.
          </p>
        </div>
      </div>

      {/* Ready CTA with animated glow */}
      <div style={{ position: 'relative' }}>
        {/* Pulsing glow layer behind button */}
        <motion.div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 16,
            background: `${moduleColor}55`,
            filter: 'blur(18px)',
            pointerEvents: 'none',
          }}
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        />

        <motion.button
          className="w-full py-4 rounded-[16px] font-bold flex items-center justify-center gap-2"
          style={{
            fontSize: 15,
            background: `linear-gradient(135deg, ${moduleColor}, ${moduleColor}bb)`,
            boxShadow: `0 8px 28px ${moduleColor}40`,
            color: '#fff',
            position: 'relative',
          }}
          onClick={onReady}
          whileTap={{ scale: 0.97 }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          ✦ I'm ready - show me
        </motion.button>
      </div>
    </motion.div>
  )
}
