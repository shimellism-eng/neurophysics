import { useState } from 'react'
import { motion } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import { Warning } from '@phosphor-icons/react'
import AtomIcon from '../components/AtomIcon'

export default function SplashScreen() {
  const navigate = useNavigate()
  const [ageConfirmed, setAgeConfirmed] = useState(false)
  const [showAgeError, setShowAgeError] = useState(false)

  const handleGetStarted = () => {
    if (!ageConfirmed) { setShowAgeError(true); return }
    navigate('/onboarding')
  }

  return (
    <div
      className="flex flex-col h-full np-shell-gradient"
    >
      {/* Logo + tagline */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 gap-6">
        <motion.div
          className="relative flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="absolute rounded-full"
            style={{ width: 140, height: 140, border: '1px solid rgba(94,167,161,0.22)' }}
            animate={{ scale: [1, 1.18, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          />
          <div
            className="w-28 h-28 rounded-full flex items-center justify-center"
            style={{
              background: 'radial-gradient(circle at 40% 35%, rgba(94,167,161,0.22), #0b1121)',
              boxShadow: '0 18px 44px rgba(0,0,0,0.32)',
              border: '1px solid rgba(94,167,161,0.28)',
            }}
          >
            <AtomIcon size={72} color="var(--np-accent-strong)" />
          </div>
        </motion.div>

        <motion.div
          className="flex flex-col items-center gap-2"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1
            className="text-5xl font-extrabold tracking-tight text-center"
            style={{ color: '#f8fafc', letterSpacing: '-0.02em' }}
          >
            NeuroPhysics
          </h1>
          <p className="text-base text-center leading-relaxed max-w-xs" style={{ color: '#a8b8cc' }}>
            Master GCSE Physics step by step.{'\n'}Calm, clear, and ready when you are.
          </p>
        </motion.div>
      </div>

      {/* CTA + legal */}
      <motion.div
        className="px-6 pb-10 flex flex-col gap-4 shrink-0"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Age confirmation checkbox */}
        <button
          className="flex items-start gap-3 px-4 py-3 rounded-[14px] text-left"
          style={{
            background: ageConfirmed ? 'var(--np-accent-soft)' : 'rgba(18,26,47,0.9)',
            border: showAgeError && !ageConfirmed
              ? '1px solid rgba(239,68,68,0.6)'
              : ageConfirmed ? '1px solid rgba(116,188,181,0.4)' : 'var(--border-quiet)',
            transition: 'all 0.2s',
          }}
          onClick={() => { setAgeConfirmed(v => !v); setShowAgeError(false) }}
          role="checkbox"
          aria-checked={ageConfirmed}
          aria-label="I confirm I am 13 years or older"
        >
          <div
            className="w-5 h-5 rounded-[6px] flex items-center justify-center shrink-0 mt-0.5"
            style={{
              background: ageConfirmed ? 'var(--np-accent)' : 'transparent',
              border: ageConfirmed ? 'none' : '1.5px solid #4a5a72',
              transition: 'all 0.15s',
            }}
          >
            {ageConfirmed && (
              <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                <path d="M1 4L3.5 6.5L9 1" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </div>
          <span className="text-sm leading-snug" style={{ color: ageConfirmed ? '#f8fafc' : '#a8b8cc' }}>
            I confirm I am <strong style={{ color: '#f8fafc' }}>13 years or older</strong>
            {' '}(or have parental consent to use this app)
          </span>
        </button>

        {showAgeError && !ageConfirmed && (
          <motion.div
            className="flex items-center gap-2 px-3 py-2 rounded-[10px]"
            style={{ background: 'rgba(239,68,68,0.1)', border: '0.75px solid rgba(239,68,68,0.4)' }}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Warning size={14} color="#ef4444" />
            <span className="text-xs" style={{ color: '#ef4444' }}>Please confirm your age to continue</span>
          </motion.div>
        )}

        {/* Get Started */}
        <motion.button
          className="w-full py-4 rounded-[18px] text-base font-bold"
          style={{
            background: ageConfirmed ? 'var(--np-accent)' : 'rgba(94,167,161,0.28)',
            color: '#07111d',
            boxShadow: ageConfirmed ? 'var(--shadow-raised)' : 'none',
            transition: 'all 0.2s',
          }}
          onClick={handleGetStarted}
          whileTap={{ scale: 0.97 }}
          aria-label="Continue to NeuroPhysics"
        >
          Continue
        </motion.button>

        {/* Legal links — fully tappable */}
        <p className="text-center text-xs leading-relaxed px-4" style={{ color: '#4a5a72' }}>
          By continuing you agree to our{' '}
          <button
            style={{ color: 'var(--np-accent-strong)', background: 'none', border: 'none', padding: 0, cursor: 'pointer', textDecoration: 'underline', fontSize: 'inherit' }}
            onClick={() => navigate('/terms')}
            aria-label="Read Terms of service"
          >
            Terms of service
          </button>
          {' '}and{' '}
          <button
            style={{ color: 'var(--np-accent-strong)', background: 'none', border: 'none', padding: 0, cursor: 'pointer', textDecoration: 'underline', fontSize: 'inherit' }}
            onClick={() => navigate('/privacy')}
            aria-label="Read Privacy policy"
          >
            Privacy policy
          </button>
        </p>
      </motion.div>
    </div>
  )
}
