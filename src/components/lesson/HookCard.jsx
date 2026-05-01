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
  const { hookFact, hookQuestion } = hook
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
      {/* "Did you know?" fact card — calmer study-card treatment */}
      <div
        style={{
          borderRadius: 22,
          padding: '24px 20px',
          minHeight: 180,
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(180deg, rgba(216,139,45,0.08), rgba(255,255,255,0.015)), var(--surface-raised)',
          border: '1px solid rgba(216,139,45,0.18)',
        }}
      >
        {/* Label row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
          <span style={{ fontFamily: BODY, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--np-amber)', flex: 1 }}>
            Did you know?
          </span>
          {ttsEnabled && (
            <button
              style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 10px', borderRadius: 999, background: 'rgba(255,255,255,0.06)', color: 'var(--np-accent-strong)', fontFamily: BODY, fontSize: 10, fontWeight: 600, border: '1px solid rgba(116,188,181,0.18)', cursor: 'pointer' }}
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
        <div style={{ background: 'var(--surface-panel)', border: 'var(--border-quiet)', borderRadius: 16, padding: 16 }}>
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
          width: '100%', minHeight: 56, background: 'var(--np-accent)',
          border: 'none', borderRadius: 16, cursor: 'pointer',
          fontFamily: BODY, fontSize: 16, fontWeight: 700, color: '#07111d',
          letterSpacing: '-0.01em',
          boxShadow: 'var(--shadow-raised)',
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
