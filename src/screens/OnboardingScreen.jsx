import { useState } from 'react'
import { motion } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import { Check } from 'lucide-react'

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
      transition={{ delay: 0.25 + index * 0.08, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex-1 min-w-0">
        <div
          className="text-base font-semibold mb-0.5"
          style={{ color: enabled ? '#818cf8' : '#f8fafc' }}
        >
          {option.title}
        </div>
        <div className="text-sm leading-snug" style={{ color: '#90a1b9' }}>
          {option.desc}
        </div>
      </div>

      {/* Toggle indicator */}
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

export default function OnboardingScreen() {
  const navigate = useNavigate()
  const [prefs, setPrefs] = useState(() =>
    Object.fromEntries(OPTIONS.map(o => [o.id, o.defaultOn ?? false]))
  )

  const toggle = id => setPrefs(p => ({ ...p, [id]: !p[id] }))

  const handleContinue = () => {
    localStorage.setItem('neurophysics_onboarded', '1')
    localStorage.setItem('neurophysics_prefs', JSON.stringify(prefs))
    navigate('/', { replace: true })
  }

  return (
    <div
      className="flex flex-col h-full"
      style={{ background: '#0b1121' }}
    >
      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-6">
        {/* Heading */}
        <motion.div
          className="pt-10 pb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1
            className="text-4xl font-extrabold leading-tight mb-3"
            style={{ color: '#f8fafc', letterSpacing: '-0.02em' }}
          >
            How do you{'\n'}learn best?
          </h1>
          <p className="text-base leading-relaxed" style={{ color: '#90a1b9' }}>
            Customise NeuroPhysics to match your needs. You can change these anytime in Settings.
          </p>
        </motion.div>

        {/* Options */}
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

      {/* Sticky Continue button */}
      <motion.div
        className="px-6 pt-3 pb-10 shrink-0"
        style={{ borderTop: '0.75px solid #1d293d', background: '#0b1121' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.button
          className="w-full py-4 rounded-[18px] text-base font-bold"
          style={{
            background: 'linear-gradient(135deg, #4f6ef7, #6366f1)',
            color: '#fff',
            boxShadow: '0 8px 28px rgba(99,102,241,0.4)',
          }}
          onClick={handleContinue}
          whileTap={{ scale: 0.97 }}
        >
          Continue
        </motion.button>
      </motion.div>
    </div>
  )
}
