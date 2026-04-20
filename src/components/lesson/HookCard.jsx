/**
 * HookCard — Step 1 (Spark)
 * Activates curiosity before cognitive work. Research: ADHD motivation
 * (Barkley novelty/interest model), UDL affective network, autistic
 * learners need the "why" before investing attention.
 */
import { motion } from 'motion/react'
import { SpeakerHigh } from '@phosphor-icons/react'
import { speak } from '../../utils/tts'

const BODY = "'Atkinson Hyperlegible', sans-serif"
const HEAD = "'Bricolage Grotesque', sans-serif"

export default function HookCard({ hook, moduleColor, onReady }) {
  const { hookFact, hookQuestion, hookEmoji = '⚡' } = hook
  const ttsEnabled = (() => {
    try { return !!JSON.parse(localStorage.getItem('neurophysics_prefs') || '{}').tts }
    catch { return false }
  })()

  return (
    <motion.div
      className="flex flex-col gap-5 px-5 py-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* "Did you know?" fact card — subtle tint, no coloured border */}
      <div
        style={{
          borderRadius: 22,
          padding: '24px 20px',
          minHeight: 180,
          position: 'relative',
          overflow: 'hidden',
          background: `${moduleColor}0f`,
          border: '1px solid rgba(255,255,255,0.07)',
        }}
      >
        {/* Decorative emoji — bottom-right, very faint */}
        <div
          aria-hidden="true"
          style={{ position: 'absolute', right: 12, bottom: -8, fontSize: 110, lineHeight: 1, opacity: 0.09, userSelect: 'none', pointerEvents: 'none' }}
        >
          {hookEmoji}
        </div>

        {/* Label row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
          <span style={{ fontFamily: BODY, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: moduleColor, flex: 1 }}>
            Did you know?
          </span>
          {ttsEnabled && (
            <button
              style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 10px', borderRadius: 999, background: `${moduleColor}20`, color: moduleColor, fontFamily: BODY, fontSize: 10, fontWeight: 600, border: 'none', cursor: 'pointer' }}
              onClick={() => speak(hookFact + '. ' + hookQuestion)}
              aria-label="Read aloud"
            >
              <SpeakerHigh size={10} />
              Read
            </button>
          )}
        </div>

        {/* Hook fact — display font for impact */}
        <p style={{ fontFamily: HEAD, fontSize: 18, fontWeight: 700, lineHeight: 1.45, letterSpacing: '-0.02em', color: '#f8fafc', position: 'relative' }}>
          {hookFact}
        </p>
      </div>

      {/* Prior knowledge question */}
      <div>
        <div style={{ fontFamily: BODY, fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.35)', marginBottom: 10 }}>
          Before we start
        </div>
        <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 16 }}>
          <p style={{ fontFamily: BODY, fontSize: 15, fontWeight: 600, lineHeight: 1.55, color: '#cad5e2' }}>
            {hookQuestion}
          </p>
          <p style={{ fontFamily: BODY, fontSize: 12, color: 'rgba(255,255,255,0.28)', marginTop: 8 }}>
            No right or wrong answer — this is just for you.
          </p>
        </div>
      </div>

      {/* Single primary CTA */}
      <motion.button
        style={{
          width: '100%', minHeight: 56, background: '#6366f1',
          border: 'none', borderRadius: 16, cursor: 'pointer',
          fontFamily: BODY, fontSize: 16, fontWeight: 700, color: '#fff',
          letterSpacing: '-0.01em',
        }}
        onClick={onReady}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        I'm ready
      </motion.button>
    </motion.div>
  )
}
