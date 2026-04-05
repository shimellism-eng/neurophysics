import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import { Check, ArrowRight, User } from 'lucide-react'

const AVATARS = ['🧠', '⚛️', '🔬', '🚀', '⚡', '🌊', '🔭', '💡', '🧲', '🌡️']

const OPTIONS = [
  {
    id: 'focus',
    title: 'Focus Mode',
    desc: 'Reduces distractions and simplifies the layout.',
  },
  {
    id: 'visual',
    title: 'Visual-Rich Mode',
    desc: 'Uses more diagrams, simulations, and visual metaphors.',
    defaultOn: true,
  },
  {
    id: 'tts',
    title: 'Text-to-Speech',
    desc: 'Adds a button to read explanations aloud.',
  },
  {
    id: 'dyslexia',
    title: 'Dyslexia-friendly Font',
    desc: 'Switches to a font designed for easier reading.',
  },
]

function OptionCard({ option, enabled, onToggle, index }) {
  return (
    <motion.button
      className="w-full text-left rounded-[18px] px-5 py-4 flex items-center justify-between gap-4"
      style={{
        background: enabled ? 'rgba(99,102,241,0.1)' : 'rgba(18,26,47,0.9)',
        border: enabled ? '1px solid rgba(99,102,241,0.55)' : '0.75px solid #1d293d',
        transition: 'background 0.2s, border-color 0.2s',
      }}
      onClick={onToggle}
      initial={{ opacity: 0, x: -18 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.15 + index * 0.07, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex-1 min-w-0">
        <div className="text-base font-semibold mb-0.5" style={{ color: enabled ? '#818cf8' : '#f8fafc' }}>
          {option.title}
        </div>
        <div className="text-sm leading-snug" style={{ color: '#90a1b9' }}>{option.desc}</div>
      </div>
      <div
        className="w-7 h-7 rounded-full shrink-0 flex items-center justify-center transition-all"
        style={{
          background: enabled ? '#6366f1' : 'rgba(255,255,255,0.07)',
          border: enabled ? 'none' : '0.75px solid #2d3e55',
        }}
      >
        {enabled && <Check size={14} color="#fff" strokeWidth={2.5} />}
      </div>
    </motion.button>
  )
}

// ─── Step 1: Profile ──────────────────────────────────────────────────────────
function StepProfile({ onNext }) {
  const [name, setName] = useState('')
  const [avatar, setAvatar] = useState('🧠')
  const [error, setError] = useState(false)

  const handleNext = () => {
    const trimmed = name.trim()
    if (!trimmed) { setError(true); return }
    onNext({ name: trimmed, avatar })
  }

  return (
    <motion.div
      className="flex flex-col h-full"
      key="step-profile"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex-1 overflow-y-auto px-6">
        <motion.div
          className="pt-10 pb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Step indicator */}
          <div className="flex items-center gap-2 mb-6">
            <div className="w-6 h-1.5 rounded-full" style={{ background: '#6366f1' }} />
            <div className="w-6 h-1.5 rounded-full" style={{ background: '#1d293d' }} />
          </div>

          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-10 h-10 rounded-[14px] flex items-center justify-center"
              style={{ background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)' }}
            >
              <User size={18} color="#6366f1" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#6366f1' }}>Create Profile</span>
          </div>

          <h1
            className="text-4xl font-extrabold leading-tight mb-3"
            style={{ color: '#f8fafc', letterSpacing: '-0.02em' }}
          >
            Who's{'\n'}studying today?
          </h1>
          <p className="text-base leading-relaxed" style={{ color: '#90a1b9' }}>
            Your progress is saved locally on this device, private and secure.
          </p>
        </motion.div>

        {/* Avatar picker */}
        <motion.div
          className="mb-5"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <div className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: '#90a1b9' }}>
            Pick an avatar
          </div>
          <div className="flex flex-wrap gap-2">
            {AVATARS.map(emoji => (
              <button
                key={emoji}
                className="w-12 h-12 rounded-[14px] text-2xl flex items-center justify-center transition-all"
                style={{
                  background: avatar === emoji ? 'rgba(99,102,241,0.2)' : 'rgba(18,26,47,0.9)',
                  border: avatar === emoji ? '2px solid #6366f1' : '0.75px solid #1d293d',
                  transform: avatar === emoji ? 'scale(1.08)' : 'scale(1)',
                  transition: 'all 0.15s',
                }}
                onClick={() => setAvatar(emoji)}
                aria-label={`Select avatar ${emoji}`}
              >
                {emoji}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Name input */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <div className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#90a1b9' }}>
            Your first name
          </div>
          <input
            type="text"
            placeholder="e.g. Alex"
            value={name}
            onChange={e => { setName(e.target.value); setError(false) }}
            onKeyDown={e => e.key === 'Enter' && handleNext()}
            maxLength={30}
            className="w-full px-4 py-4 rounded-[16px] text-base outline-none"
            style={{
              background: 'rgba(18,26,47,0.9)',
              border: error ? '1px solid rgba(239,68,68,0.6)' : '0.75px solid #2d3e55',
              color: '#f8fafc',
              transition: 'border-color 0.2s',
            }}
            aria-label="Enter your first name"
            autoComplete="given-name"
          />
          {error && (
            <motion.p
              className="text-xs mt-2"
              style={{ color: '#ef4444' }}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Please enter your name to continue
            </motion.p>
          )}
        </motion.div>
      </div>

      {/* Next button */}
      <motion.div
        className="px-6 pt-3 pb-10 shrink-0"
        style={{ borderTop: '0.75px solid #1d293d', background: '#0b1121' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
      >
        <motion.button
          className="w-full py-4 rounded-[18px] text-base font-bold flex items-center justify-center gap-2"
          style={{
            background: name.trim() ? 'linear-gradient(135deg, #4f6ef7, #6366f1)' : 'rgba(99,102,241,0.3)',
            color: '#fff',
            boxShadow: name.trim() ? '0 8px 28px rgba(99,102,241,0.4)' : 'none',
            transition: 'all 0.2s',
          }}
          onClick={handleNext}
          whileTap={{ scale: 0.97 }}
          aria-label="Continue to learning preferences"
        >
          Continue
          <ArrowRight size={18} />
        </motion.button>
      </motion.div>
    </motion.div>
  )
}

// ─── Step 2: Learning Prefs ───────────────────────────────────────────────────
function StepPrefs({ profileData, onFinish }) {
  const [prefs, setPrefs] = useState(() =>
    Object.fromEntries(OPTIONS.map(o => [o.id, o.defaultOn ?? false]))
  )

  const toggle = id => setPrefs(p => ({ ...p, [id]: !p[id] }))

  return (
    <motion.div
      className="flex flex-col h-full"
      key="step-prefs"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex-1 overflow-y-auto px-6">
        <motion.div
          className="pt-10 pb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Step indicator */}
          <div className="flex items-center gap-2 mb-6">
            <div className="w-6 h-1.5 rounded-full" style={{ background: '#6366f1' }} />
            <div className="w-6 h-1.5 rounded-full" style={{ background: '#6366f1' }} />
          </div>

          <div
            className="w-14 h-14 rounded-[18px] flex items-center justify-center text-3xl mb-4"
            style={{ background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)' }}
          >
            {profileData.avatar}
          </div>

          <h1
            className="text-4xl font-extrabold leading-tight mb-3"
            style={{ color: '#f8fafc', letterSpacing: '-0.02em' }}
          >
            Hey {profileData.name}!{'\n'}
            <span style={{ color: '#6366f1' }}>How do you learn?</span>
          </h1>
          <p className="text-base leading-relaxed" style={{ color: '#90a1b9' }}>
            Customise NeuroPhysics to match your needs. Change these anytime in Settings.
          </p>
        </motion.div>

        <div className="flex flex-col gap-3 pb-6">
          {OPTIONS.map((opt, i) => (
            <OptionCard
              key={opt.id}
              option={opt}
              enabled={prefs[opt.id]}
              onToggle={() => toggle(opt.id)}
              index={i}
            />
          ))}
        </div>
      </div>

      <motion.div
        className="px-6 pt-3 pb-10 shrink-0"
        style={{ borderTop: '0.75px solid #1d293d', background: '#0b1121' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <motion.button
          className="w-full py-4 rounded-[18px] text-base font-bold"
          style={{
            background: 'linear-gradient(135deg, #4f6ef7, #6366f1)',
            color: '#fff',
            boxShadow: '0 8px 28px rgba(99,102,241,0.4)',
          }}
          onClick={() => onFinish(prefs)}
          whileTap={{ scale: 0.97 }}
          aria-label="Start learning"
        >
          Start Learning 🚀
        </motion.button>
      </motion.div>
    </motion.div>
  )
}

// ─── Main Onboarding ──────────────────────────────────────────────────────────
export default function OnboardingScreen() {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [profileData, setProfileData] = useState(null)

  const handleProfileNext = (data) => {
    setProfileData(data)
    setStep(1)
  }

  const handleFinish = (prefs) => {
    localStorage.setItem('neurophysics_onboarded', '1')
    localStorage.setItem('neurophysics_prefs', JSON.stringify(prefs))
    localStorage.setItem('neurophysics_profile', JSON.stringify(profileData))
    navigate('/', { replace: true })
  }

  return (
    <div className="flex flex-col h-full" style={{ background: '#0b1121' }}>
      <AnimatePresence mode="wait">
        {step === 0
          ? <StepProfile key="profile" onNext={handleProfileNext} />
          : <StepPrefs key="prefs" profileData={profileData} onFinish={handleFinish} />
        }
      </AnimatePresence>
    </div>
  )
}
