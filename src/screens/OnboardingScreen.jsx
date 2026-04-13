import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import { Check, ArrowRight, User, Zap, Brain, Trophy, GraduationCap, CalendarDays, Pencil, Target, ChevronLeft } from 'lucide-react'
import { BOARDS, BOARD_ORDER, saveSelectedBoard } from '../utils/boardConfig'

const AVATARS = ['🧠', '⚛️', '🔬', '🚀', '⚡', '🌊', '🔭', '💡', '🧲', '🌡️']

const OPTIONS = [
  {
    id: 'sounds',
    title: 'Sound Effects',
    desc: 'Plays a soft sound for correct and wrong answers.',
    defaultOn: true,
  },
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
        <div className="text-sm leading-snug" style={{ color: '#a8b8cc' }}>{option.desc}</div>
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

// ─── Step 0: Value Proposition ───────────────────────────────────────────────
function StepValueProp({ onNext }) {
  const features = [
    {
      icon: Brain,
      color: '#6366f1',
      title: 'Built for every brain',
      desc: 'Dyslexia-friendly fonts, TTS, focus mode, and spaced repetition — all built in.',
    },
    {
      icon: Zap,
      color: '#f97316',
      title: 'AI tutor on tap',
      desc: 'Mamo explains concepts in plain English, 24/7 — no judgement, no rush.',
    },
    {
      icon: Trophy,
      color: '#fdc700',
      title: 'Exam-ready',
      desc: 'Every topic mapped to GCSE Physics. Practice papers. Top-grade challenge.',
    },
  ]

  return (
    <motion.div
      className="flex flex-col h-full"
      key="step-value"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex-1 overflow-y-auto px-6">
        <div className="pt-12 pb-6">
          {/* Step indicator (1/5) */}
          <div className="flex items-center gap-2 mb-8">
            <div className="w-6 h-1.5 rounded-full" style={{ background: '#6366f1' }} />
            <div className="w-6 h-1.5 rounded-full" style={{ background: '#1d293d' }} />
            <div className="w-6 h-1.5 rounded-full" style={{ background: '#1d293d' }} />
            <div className="w-6 h-1.5 rounded-full" style={{ background: '#1d293d' }} />
            <div className="w-6 h-1.5 rounded-full" style={{ background: '#1d293d' }} />
          </div>

          {/* Atom icon */}
          <motion.div
            className="w-20 h-20 rounded-[24px] flex items-center justify-center mb-6"
            style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(129,140,248,0.1))', border: '1px solid rgba(99,102,241,0.3)' }}
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.15, type: 'spring', stiffness: 300, damping: 22 }}
          >
            <span style={{ fontSize: 40 }}>⚛️</span>
          </motion.div>

          <motion.h1
            className="text-4xl font-extrabold leading-tight mb-3"
            style={{ color: '#f8fafc', letterSpacing: '-0.025em' }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Physics that fits{'\n'}
            <span style={{ color: '#6366f1' }}>your brain.</span>
          </motion.h1>
          <motion.p
            className="text-base leading-relaxed mb-8"
            style={{ color: '#a8b8cc' }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28 }}
          >
            GCSE Physics — adapted for neurodivergent learners, built by people who get it.
          </motion.p>
        </div>

        {/* Feature cards */}
        <div className="flex flex-col gap-3 pb-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              className="flex items-start gap-4 rounded-[18px] px-5 py-4"
              style={{ background: 'rgba(18,26,47,0.9)', border: '0.75px solid #1d293d' }}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35 + i * 0.08 }}
            >
              <div
                className="w-10 h-10 rounded-[12px] flex items-center justify-center shrink-0"
                style={{ background: `${f.color}18`, border: `1px solid ${f.color}30` }}
              >
                <f.icon size={18} color={f.color} />
              </div>
              <div>
                <div className="text-sm font-bold mb-0.5" style={{ color: '#f8fafc' }}>{f.title}</div>
                <div className="text-xs leading-snug" style={{ color: '#a8b8cc' }}>{f.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <motion.div
        className="px-6 pt-3 pb-10 shrink-0"
        style={{ borderTop: '0.75px solid #1d293d', background: '#0b1121' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <motion.button
          className="w-full py-4 rounded-[18px] text-base font-bold flex items-center justify-center gap-2"
          style={{
            background: 'linear-gradient(135deg, #4f6ef7, #6366f1)',
            color: '#fff',
            boxShadow: '0 8px 28px rgba(99,102,241,0.4)',
          }}
          onClick={onNext}
          whileTap={{ scale: 0.97 }}
          aria-label="Get started"
        >
          Get started
          <ArrowRight size={18} />
        </motion.button>
      </motion.div>
    </motion.div>
  )
}

// ─── Step 3 (last, optional): Profile / Avatar ────────────────────────────────
function StepProfile({ onNext, onSkip }) {
  const [name, setName] = useState('')
  const [avatar, setAvatar] = useState('🧠')
  const [error, setError] = useState(false)
  const [ageGroup, setAgeGroup] = useState('')
  const canContinue = name.trim() && ageGroup

  const handleNext = () => {
    const trimmed = name.trim()
    if (!trimmed) { setError(true); return }
    if (!ageGroup) return
    onNext({ name: trimmed, avatar, ageGroup })
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
          {/* No numbered dots — this is a bonus optional step */}
          <div className="flex items-center gap-2 mb-6">
            <div className="w-6 h-1.5 rounded-full" style={{ background: '#6366f1' }} />
            <div className="w-6 h-1.5 rounded-full" style={{ background: '#6366f1' }} />
            <div className="w-6 h-1.5 rounded-full" style={{ background: '#6366f1' }} />
          </div>

          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-10 h-10 rounded-[14px] flex items-center justify-center"
              style={{ background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)' }}
            >
              <User size={18} color="#6366f1" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#6366f1' }}>Almost done!</span>
          </div>

          <h1
            className="text-4xl font-extrabold leading-tight mb-3"
            style={{ color: '#f8fafc', letterSpacing: '-0.02em' }}
          >
            Personalise{'\n'}your profile
          </h1>
          <p className="text-base leading-relaxed" style={{ color: '#a8b8cc' }}>
            Optional — you can always update this in Settings later.
          </p>
        </motion.div>

        {/* Avatar picker */}
        <motion.div
          className="mb-5"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <div className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: '#a8b8cc' }}>
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
          <div className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#a8b8cc' }}>
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

        {/* Age group */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          <p className="text-sm font-semibold mb-2" style={{ color: 'rgba(255,255,255,0.55)' }}>How old are you?</p>
          <div className="grid grid-cols-2 gap-2">
            {['13–15', '16–17', '18+'].map(ag => (
              <button
                key={ag}
                onClick={() => setAgeGroup(ag)}
                className="py-3 rounded-[14px] text-sm font-semibold transition-all"
                style={{
                  background: ageGroup === ag ? 'rgba(99,102,241,0.2)' : 'rgba(18,26,47,0.9)',
                  border: ageGroup === ag ? '1.5px solid #6366f1' : '0.75px solid #1d293d',
                  color: ageGroup === ag ? '#818cf8' : '#a8b8cc',
                }}
              >
                {ag}
              </button>
            ))}
          </div>

          {/* 13–17: GDPR notice */}
          {(ageGroup === '13–15' || ageGroup === '16–17') && (
            <motion.div
              className="mt-4 rounded-[16px] p-3"
              style={{ background: 'rgba(99,102,241,0.06)', border: '0.75px solid rgba(99,102,241,0.2)' }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
                🔒 Your data is protected under <strong style={{ color: '#818cf8' }}>UK GDPR</strong>. We never sell your data. You can delete your account at any time in Settings.
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Next + Skip buttons */}
      <motion.div
        className="px-6 pt-3 pb-10 shrink-0 flex flex-col gap-3"
        style={{ borderTop: '0.75px solid #1d293d', background: '#0b1121' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
      >
        <motion.button
          className="w-full py-4 rounded-[18px] text-base font-bold flex items-center justify-center gap-2"
          style={{
            background: canContinue ? 'linear-gradient(135deg, #4f6ef7, #6366f1)' : 'rgba(99,102,241,0.3)',
            color: '#fff',
            boxShadow: canContinue ? '0 8px 28px rgba(99,102,241,0.4)' : 'none',
            transition: 'all 0.2s',
          }}
          onClick={handleNext}
          whileTap={{ scale: 0.97 }}
          aria-label="Save profile and enter app"
        >
          Let's go
          <ArrowRight size={18} />
        </motion.button>
        <motion.button
          className="w-full py-3 rounded-[18px] text-sm font-semibold"
          style={{ color: 'rgba(255,255,255,0.35)', background: 'transparent' }}
          onClick={onSkip}
          whileTap={{ scale: 0.97 }}
          aria-label="Skip profile setup"
        >
          Skip for now
        </motion.button>
      </motion.div>
    </motion.div>
  )
}

// ─── Step 2: Accessibility / Neurodivergent Needs — skippable ────────────────
const ACCESSIBILITY_OPTIONS = [
  {
    id: 'adhd',
    label: 'ADHD',
    desc: 'Break reminders every 20 min, larger tap targets',
    icon: '⚡',
  },
  {
    id: 'dyslexia',
    label: 'Dyslexia',
    desc: 'OpenDyslexic font, cream background, relaxed line-height',
    icon: '📖',
  },
  {
    id: 'autism',
    label: 'Autism / sensory sensitivity',
    desc: 'Reduce motion, muted animations',
    icon: '🔇',
  },
  {
    id: 'visual',
    label: 'Visual sensitivity',
    desc: 'High contrast, reduce brightness',
    icon: '👁',
  },
  {
    id: 'none',
    label: 'None of these',
    desc: 'No adjustments needed',
    icon: '✓',
  },
]

function StepAccessibility({ onNext, onSkip }) {
  const [selected, setSelected] = useState([])

  const toggle = (id) => {
    if (id === 'none') {
      setSelected(sel => sel.includes('none') ? [] : ['none'])
    } else {
      setSelected(sel => {
        const withoutNone = sel.filter(s => s !== 'none')
        return withoutNone.includes(id)
          ? withoutNone.filter(s => s !== id)
          : [...withoutNone, id]
      })
    }
  }

  const applyAndContinue = () => {
    const existing = (() => {
      try { return JSON.parse(localStorage.getItem('neurophysics_prefs') || '{}') } catch { return {} }
    })()
    let updated = { ...existing }
    if (selected.includes('adhd'))    updated = { ...updated, breakInterval: 20 }
    if (selected.includes('dyslexia')) updated = { ...updated, dyslexicFont: true, colorTheme: 'cream', lineHeight: 'relaxed' }
    if (selected.includes('autism'))  updated = { ...updated, reduceMotion: true }
    if (selected.includes('visual'))  updated = { ...updated, highContrast: true }
    localStorage.setItem('neurophysics_prefs', JSON.stringify(updated))
    onNext()
  }

  return (
    <motion.div
      className="flex flex-col h-full"
      key="step-accessibility"
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
          {/* Step indicator (3/4) */}
          <div className="flex items-center gap-2 mb-6">
            <div className="w-6 h-1.5 rounded-full" style={{ background: '#6366f1' }} />
            <div className="w-6 h-1.5 rounded-full" style={{ background: '#6366f1' }} />
            <div className="w-6 h-1.5 rounded-full" style={{ background: '#6366f1' }} />
            <div className="w-6 h-1.5 rounded-full" style={{ background: '#1d293d' }} />
          </div>

          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-10 h-10 rounded-[14px] flex items-center justify-center"
              style={{ background: 'rgba(0,212,255,0.12)', border: '1px solid rgba(0,212,255,0.25)' }}
            >
              <Brain size={18} color="#00d4ff" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#00d4ff' }}>Accessibility</span>
          </div>

          <h1
            className="text-4xl font-extrabold leading-tight mb-3"
            style={{ color: '#f8fafc', letterSpacing: '-0.02em' }}
          >
            How do you{'\n'}
            <span style={{ color: '#00d4ff' }}>learn best?</span>
          </h1>
          <p className="text-base leading-relaxed" style={{ color: '#a8b8cc' }}>
            We'll set up the app to suit you — you can always change this in Settings.
          </p>
        </motion.div>

        <div className="flex flex-col gap-3 pb-6">
          {ACCESSIBILITY_OPTIONS.map((opt, i) => {
            const isSelected = selected.includes(opt.id)
            return (
              <motion.button
                key={opt.id}
                className="w-full text-left rounded-[12px] px-5 py-4 flex items-center gap-4"
                style={{
                  background: isSelected ? 'rgba(0,212,255,0.08)' : 'rgba(18,26,47,0.9)',
                  border: isSelected
                    ? '1.5px solid rgba(0,212,255,0.55)'
                    : '0.75px solid rgba(255,255,255,0.1)',
                  transition: 'background 0.2s, border-color 0.2s',
                }}
                onClick={() => toggle(opt.id)}
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.07, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                whileTap={{ scale: 0.98 }}
              >
                <span style={{ fontSize: 22, lineHeight: 1 }}>{opt.icon}</span>
                <div className="flex-1 min-w-0">
                  <div
                    className="text-base font-semibold mb-0.5"
                    style={{ color: isSelected ? '#00d4ff' : '#f8fafc' }}
                  >
                    {opt.label}
                  </div>
                  <div className="text-sm leading-snug" style={{ color: '#a8b8cc' }}>{opt.desc}</div>
                </div>
                <div
                  className="w-7 h-7 rounded-full shrink-0 flex items-center justify-center transition-all"
                  style={{
                    background: isSelected ? '#00d4ff' : 'rgba(255,255,255,0.07)',
                    border: isSelected ? 'none' : '0.75px solid rgba(255,255,255,0.18)',
                  }}
                >
                  {isSelected && <Check size={14} color="#0b1121" strokeWidth={2.5} />}
                </div>
              </motion.button>
            )
          })}
        </div>
      </div>

      <motion.div
        className="px-6 pt-3 pb-10 shrink-0 flex flex-col gap-3"
        style={{ borderTop: '0.75px solid #1d293d', background: '#0b1121' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <motion.button
          className="w-full py-4 rounded-[18px] text-base font-bold flex items-center justify-center gap-2"
          style={{
            background: 'linear-gradient(135deg, #00a8cc, #00d4ff)',
            color: '#0b1121',
            boxShadow: '0 8px 28px rgba(0,212,255,0.3)',
          }}
          onClick={applyAndContinue}
          whileTap={{ scale: 0.97 }}
          aria-label="Save accessibility preferences and continue"
        >
          Continue
          <ArrowRight size={18} />
        </motion.button>
        <motion.button
          className="w-full py-3 rounded-[18px] text-sm font-semibold"
          style={{ color: 'rgba(255,255,255,0.35)', background: 'transparent' }}
          onClick={onSkip}
          whileTap={{ scale: 0.97 }}
          aria-label="Skip accessibility preferences"
        >
          Skip for now
        </motion.button>
      </motion.div>
    </motion.div>
  )
}

// ─── Step 3 (new): Learning Prefs — skippable ────────────────────────────────
function StepPrefs({ onNext, onSkip }) {
  const [prefs, setPrefs] = useState(() =>
    Object.fromEntries(OPTIONS.map(o => [o.id, o.defaultOn ?? false]))
  )

  const toggle = id => setPrefs(p => ({ ...p, [id]: !p[id] }))

  const defaultPrefs = Object.fromEntries(OPTIONS.map(o => [o.id, o.defaultOn ?? false]))

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
          {/* Step indicator (4/4) */}
          <div className="flex items-center gap-2 mb-6">
            <div className="w-6 h-1.5 rounded-full" style={{ background: '#6366f1' }} />
            <div className="w-6 h-1.5 rounded-full" style={{ background: '#6366f1' }} />
            <div className="w-6 h-1.5 rounded-full" style={{ background: '#6366f1' }} />
            <div className="w-6 h-1.5 rounded-full" style={{ background: '#6366f1' }} />
          </div>

          <h1
            className="text-4xl font-extrabold leading-tight mb-3"
            style={{ color: '#f8fafc', letterSpacing: '-0.02em' }}
          >
            How do{'\n'}
            <span style={{ color: '#6366f1' }}>you learn best?</span>
          </h1>
          <p className="text-base leading-relaxed" style={{ color: '#a8b8cc' }}>
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
        className="px-6 pt-3 pb-10 shrink-0 flex flex-col gap-3"
        style={{ borderTop: '0.75px solid #1d293d', background: '#0b1121' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <motion.button
          className="w-full py-4 rounded-[18px] text-base font-bold flex items-center justify-center gap-2"
          style={{
            background: 'linear-gradient(135deg, #4f6ef7, #6366f1)',
            color: '#fff',
            boxShadow: '0 8px 28px rgba(99,102,241,0.4)',
          }}
          onClick={() => onNext(prefs)}
          whileTap={{ scale: 0.97 }}
          aria-label="Save preferences and continue"
        >
          Save &amp; Continue
          <ArrowRight size={18} />
        </motion.button>
        <motion.button
          className="w-full py-3 rounded-[18px] text-sm font-semibold"
          style={{ color: 'rgba(255,255,255,0.35)', background: 'transparent' }}
          onClick={() => onSkip(defaultPrefs)}
          whileTap={{ scale: 0.97 }}
          aria-label="Skip preferences"
        >
          Skip for now
        </motion.button>
      </motion.div>
    </motion.div>
  )
}

// ─── Step 0: How it Works ─────────────────────────────────────────────────────
function StepHowItWorks({ onNext }) {
  return (
    <motion.div
      key="howitworks"
      className="flex flex-col h-full"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.28 }}
    >
      <div className="flex-1 overflow-y-auto px-5 pt-12 pb-6">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: '0 4px' }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: '#f8fafc', margin: 0 }}>
            How NeuroPhysics works
          </h2>
          <p style={{ fontSize: 14, color: '#94a3b8', margin: 0, lineHeight: 1.6 }}>
            Built for the way <em>your</em> brain learns — not a textbook brain.
          </p>
          {[
            { icon: '🧠', title: 'Spaced repetition', desc: 'Topics come back at the perfect moment — just before you forget. Science-proven to double retention.' },
            { icon: '⚡', title: 'Bite-sized lessons', desc: '5-minute sessions. One concept at a time. No walls of text. Your working memory will thank you.' },
            { icon: '🤖', title: 'Mamo, your AI tutor', desc: 'Stuck? Ask Mamo anything, any time. No judgement. No waiting for a teacher.' },
          ].map(({ icon, title, desc }) => (
            <div key={title} style={{
              background: 'rgba(15,22,41,0.95)',
              border: '0.75px solid rgba(255,255,255,0.08)',
              borderRadius: 16, padding: '16px 18px',
              display: 'flex', gap: 14, alignItems: 'flex-start'
            }}>
              <span style={{ fontSize: 28, lineHeight: 1 }}>{icon}</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15, color: '#f8fafc', marginBottom: 4 }}>{title}</div>
                <div style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.5 }}>{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="px-5 pb-10">
        <motion.button
          className="w-full py-4 rounded-[18px] text-base font-bold flex items-center justify-center gap-2"
          style={{ background: 'linear-gradient(135deg, #6366f1, #818cf8)', color: '#fff' }}
          onClick={onNext}
          whileTap={{ scale: 0.97 }}>
          Let's get started <ArrowRight size={18} />
        </motion.button>
      </div>
    </motion.div>
  )
}

// ─── Step 3: Exam Board ───────────────────────────────────────────────────────
function StepBoard({ onNext, reducedMotion }) {
  const [selected, setSelected] = useState('aqa')

  const handleNext = () => {
    saveSelectedBoard(selected)
    // Notify any already-mounted screens (e.g. LearnScreen listener)
    window.dispatchEvent(new Event('storage'))
    onNext(selected)
  }

  return (
    <motion.div
      className="flex flex-col h-full"
      key="step-board"
      initial={reducedMotion ? false : { opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={reducedMotion ? {} : { opacity: 0, x: -40 }}
      transition={{ duration: reducedMotion ? 0 : 0.35, ease: [0.16, 1, 0.3, 1] }}
      style={{
        background: `radial-gradient(ellipse 130% 55% at 50% 0%, ${BOARDS[selected].color}10 0%, transparent 55%)`,
        transition: 'background 0.4s',
      }}
    >
      <div className="flex-1 overflow-y-auto px-6">
        <motion.div
          className="pt-7 pb-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Step indicator (1/2) */}
          <div className="flex items-center gap-2 mb-6">
            <div className="w-6 h-1.5 rounded-full" style={{ background: '#6366f1' }} />
            <div className="w-6 h-1.5 rounded-full" style={{ background: '#1d293d' }} />
          </div>

          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-10 h-10 rounded-[14px] flex items-center justify-center"
              style={{ background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)' }}
            >
              <GraduationCap size={18} color="#6366f1" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#6366f1' }}>Exam Board</span>
          </div>

          <h1 className="text-4xl font-extrabold leading-tight mb-3" style={{ color: '#f8fafc', letterSpacing: '-0.02em' }}>
            Which board{'\n'}<span style={{ color: '#6366f1' }}>are you sitting?</span>
          </h1>
          <p className="text-base leading-relaxed" style={{ color: '#a8b8cc' }}>
            NeuroPhysics will show only the topics and content relevant to your spec.
          </p>
        </motion.div>

        {/* Board list with scroll-fade */}
        <div style={{ position: 'relative' }}>
          <motion.div
            className="flex flex-col gap-3 pb-6"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {BOARD_ORDER.map((boardId, i) => {
              const board = BOARDS[boardId]
              const isSelected = selected === boardId
              return (
                <motion.button
                  key={boardId}
                  className="w-full text-left rounded-[18px] px-4 py-4 flex items-center gap-4"
                  style={{
                    background: isSelected ? `${board.color}12` : 'rgba(18,26,47,0.9)',
                    border: isSelected ? `1.5px solid ${board.color}60` : '0.75px solid #1d293d',
                    transition: 'background 0.18s, border-color 0.18s',
                  }}
                  onClick={() => setSelected(boardId)}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.06, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Colour dot */}
                  <div
                    className="w-4 h-4 rounded-full shrink-0"
                    style={{
                      background: isSelected ? board.color : 'rgba(255,255,255,0.1)',
                      border: isSelected ? `2px solid ${board.color}` : '1.5px solid rgba(255,255,255,0.18)',
                      transition: 'all 0.15s',
                      boxShadow: isSelected ? `0 0 8px ${board.color}60` : 'none',
                    }}
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-base font-bold" style={{ color: isSelected ? '#f8fafc' : '#c8d4e3' }}>
                        {board.flag} {board.name}
                      </span>
                      {board.gradeSystem === 'A*-G' && (
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full"
                          style={{ background: 'rgba(232,121,249,0.12)', color: '#e879f9', border: '1px solid rgba(232,121,249,0.3)' }}>
                          A*–G
                        </span>
                      )}
                    </div>
                    <div className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.52)' }}>
                      {board.description}
                    </div>
                  </div>

                  {isSelected && (
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: board.color }}
                    >
                      <Check size={13} color="#fff" strokeWidth={2.5} />
                    </div>
                  )}
                </motion.button>
              )
            })}
          </motion.div>
          {/* Scroll-fade hint — signals more content below */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: 40,
            background: 'linear-gradient(to bottom, transparent, #080f1e)',
            pointerEvents: 'none',
          }} />
        </div>
      </div>

      {/* Next button */}
      <motion.div
        className="px-6 shrink-0"
        style={{ borderTop: '0.75px solid #1d293d', background: '#0b1121',
          paddingTop: 12, paddingBottom: 'calc(28px + env(safe-area-inset-bottom, 0px))' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <motion.button
          className="w-full py-4 rounded-[18px] text-base font-bold flex items-center justify-center gap-2"
          style={{
            background: `linear-gradient(135deg, ${BOARDS[selected].color}cc, ${BOARDS[selected].color})`,
            color: '#fff',
            boxShadow: `0 8px 28px ${BOARDS[selected].color}40`,
            transition: 'all 0.2s',
          }}
          onClick={handleNext}
          whileTap={{ scale: 0.97 }}
        >
          {BOARDS[selected].flag} {BOARDS[selected].name} — that's me
          <ArrowRight size={18} />
        </motion.button>
      </motion.div>
    </motion.div>
  )
}

// ─── Step 2: Setup (Exam Date + Age) ─────────────────────────────────────────
const GRADE_OPTIONS_91 = [
  { value: '4', label: 'Grade 4', sub: 'Pass',         color: '#f59e0b' },
  { value: '5', label: 'Grade 5', sub: 'Strong Pass',  color: '#22c55e' },
  { value: '6', label: 'Grade 6', sub: 'Merit',        color: '#10b981' },
  { value: '7', label: 'Grade 7', sub: 'Good',         color: '#6366f1' },
  { value: '8', label: 'Grade 8', sub: 'Distinction',  color: '#8b5cf6' },
  { value: '9', label: 'Grade 9', sub: 'Top Grade',    color: '#e91e8c' },
]
const GRADE_OPTIONS_CCEA = [
  { value: 'C',  label: 'Grade C',  sub: 'Pass',        color: '#f59e0b' },
  { value: 'B',  label: 'Grade B',  sub: 'Merit',       color: '#22c55e' },
  { value: 'A',  label: 'Grade A',  sub: 'Distinction', color: '#6366f1' },
  { value: 'A*', label: 'Grade A*', sub: 'Top Grade',   color: '#e91e8c' },
]

function StepSetup({ onNext, boardId, onBack, reducedMotion }) {
  const [examDate, setExamDate] = useState('')
  const [grade, setGrade] = useState('')

  const isCCEA = boardId === 'ccea'
  const gradeOptions = isCCEA ? GRADE_OPTIONS_CCEA : GRADE_OPTIONS_91

  const today = new Date(); today.setHours(0,0,0,0)
  const examD = examDate ? new Date(examDate) : null
  const daysLeft = examD ? Math.ceil((examD - today) / 86400000) : null
  const passed = daysLeft !== null && daysLeft <= 0
  const urgency = daysLeft === null ? null
    : passed    ? { color: '#94a3b8', bg: 'rgba(148,163,184,0.08)', border: 'rgba(148,163,184,0.18)', label: 'Passed' }
    : daysLeft <= 14 ? { color: '#ef4444', bg: 'rgba(239,68,68,0.08)',  border: 'rgba(239,68,68,0.22)',  label: 'Very soon' }
    : daysLeft <= 42 ? { color: '#f59e0b', bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.22)', label: 'Coming up' }
    : { color: '#22c55e', bg: 'rgba(34,197,94,0.08)', border: 'rgba(34,197,94,0.2)', label: 'On track' }
  const fmtDate = examD ? examD.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : ''

  const selectedGradeOption = gradeOptions.find(g => g.value === grade)

  return (
    <motion.div
      className="flex flex-col h-full"
      key="step-setup"
      initial={reducedMotion ? false : { opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={reducedMotion ? {} : { opacity: 0, x: -40 }}
      transition={{ duration: reducedMotion ? 0 : 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex-1 overflow-y-auto px-6 pb-4" style={{ minHeight: 0 }}>
        {/* Header */}
        <motion.div
          className="pt-10 pb-5"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Back button — iOS HIG: always provide a clear way back */}
          <button
            onClick={onBack}
            className="w-11 h-11 flex items-center justify-center rounded-[12px] mb-4"
            style={{ background: 'rgba(255,255,255,0.05)', border: '0.75px solid rgba(255,255,255,0.08)' }}
            aria-label="Go back to board selection"
          >
            <ChevronLeft size={20} color="#a8b8cc" />
          </button>
          <div className="flex items-center gap-2 mb-6">
            <div className="w-6 h-1.5 rounded-full" style={{ background: '#6366f1' }} />
            <div className="w-6 h-1.5 rounded-full" style={{ background: '#6366f1' }} />
          </div>
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-10 h-10 rounded-[14px] flex items-center justify-center"
              style={{ background: 'rgba(0,212,255,0.12)', border: '1px solid rgba(0,212,255,0.25)' }}
            >
              <Target size={18} color="#00d4ff" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#00d4ff' }}>Almost there</span>
          </div>
          <h1 className="font-extrabold leading-tight mb-2" style={{ fontSize: 34, color: '#f8fafc', letterSpacing: '-0.03em' }}>
            Set your details
          </h1>
          <p className="text-sm leading-relaxed" style={{ color: '#8fa8bf' }}>
            Two quick things and you're in.
          </p>
        </motion.div>

        {/* ── Exam date card ── */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          <div className="flex items-center gap-2 mb-2.5">
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#a8b8cc' }}>Exam date</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
              style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.28)' }}>optional</span>
          </div>
          <div
            className="rounded-[20px] relative overflow-hidden"
            style={{
              background: urgency ? urgency.bg : 'rgba(15,22,41,0.95)',
              border: `0.75px solid ${urgency ? urgency.border : 'rgba(255,255,255,0.08)'}`,
            }}
          >
            {examDate ? (
              <div className="px-5 py-4 flex items-center gap-4">
                <div
                  className="flex flex-col items-center justify-center rounded-[14px] shrink-0"
                  style={{ width: 60, height: 60, background: `${urgency.color}18`, border: `0.75px solid ${urgency.color}40` }}
                >
                  <span className="font-black leading-none" style={{ fontSize: 20, color: urgency.color }}>
                    {passed ? '✓' : daysLeft}
                  </span>
                  <span className="font-semibold" style={{ fontSize: 9, color: `${urgency.color}cc`, marginTop: 2 }}>
                    {passed ? 'done' : daysLeft === 1 ? 'day' : 'days'}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold" style={{ fontSize: 16, color: '#f8fafc', letterSpacing: '-0.02em' }}>{fmtDate}</div>
                  <div className="mt-1 inline-flex px-2 py-0.5 rounded-full"
                    style={{ background: `${urgency.color}18`, fontSize: 11, fontWeight: 600, color: urgency.color }}>
                    {urgency.label}
                  </div>
                </div>
                <div className="w-9 h-9 rounded-[10px] flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(255,255,255,0.07)', border: '0.75px solid rgba(255,255,255,0.1)' }}>
                  <Pencil size={13} color="#a8b8cc" />
                </div>
              </div>
            ) : (
              <div className="px-5 py-4 flex items-center gap-3">
                <div className="w-11 h-11 rounded-[12px] flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(0,212,255,0.1)', border: '0.75px solid rgba(0,212,255,0.22)' }}>
                  <CalendarDays size={18} color="#00d4ff" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-bold" style={{ color: '#f8fafc' }}>When's your exam?</div>
                  <div className="text-xs mt-0.5" style={{ color: '#7b9ab8' }}>We'll count down to it on your home screen</div>
                </div>
                <div className="px-3 py-1.5 rounded-full text-xs font-bold shrink-0"
                  style={{ background: 'rgba(0,212,255,0.1)', border: '0.75px solid rgba(0,212,255,0.25)', color: '#00d4ff' }}>
                  Set
                </div>
              </div>
            )}
            <input type="date" value={examDate} min={new Date().toISOString().split('T')[0]}
              tabIndex={-1} onFocus={e => { e.target.style.fontSize = '16px' }}
              onChange={e => setExamDate(e.target.value)}
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer', fontSize: '16px' }}
              aria-label="Set exam date" />
          </div>
        </motion.div>

        {/* ── Target grade ── */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.4 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#a8b8cc' }}>Target grade</span>
            {selectedGradeOption && (
              <motion.span
                key={selectedGradeOption.value}
                className="text-[10px] px-2 py-0.5 rounded-full font-bold"
                style={{ background: `${selectedGradeOption.color}18`, color: selectedGradeOption.color, border: `0.75px solid ${selectedGradeOption.color}40` }}
                initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
              >
                {selectedGradeOption.sub}
              </motion.span>
            )}
          </div>
          <div className={`grid gap-2.5 ${isCCEA ? 'grid-cols-2' : 'grid-cols-3'}`}>
            {gradeOptions.map(({ value, label, sub, color }, idx) => {
              const sel = grade === value
              const isTop = !isCCEA && (value === '8' || value === '9')
              return (
                <motion.button
                  key={value}
                  className="rounded-[18px] py-4 px-3 flex flex-col items-center justify-center gap-1 relative overflow-hidden"
                  style={{
                    background: sel ? `${color}18` : 'rgba(15,22,41,0.9)',
                    border: sel ? `1.5px solid ${color}70` : '0.75px solid rgba(255,255,255,0.08)',
                    boxShadow: sel ? `0 0 24px ${color}30, 0 4px 12px ${color}15` : 'none',
                    transition: 'all 0.18s',
                    minHeight: 80,
                  }}
                  onClick={() => setGrade(value)}
                  whileTap={{ scale: 0.96 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.22 + idx * 0.04 }}
                >
                  {/* Top-grade sparkle */}
                  {isTop && !sel && (
                    <span style={{ position: 'absolute', top: 6, right: 8, fontSize: 10, color: `${color}80` }}>★</span>
                  )}
                  {sel && (
                    <div className="absolute top-2.5 right-2.5 w-4 h-4 rounded-full flex items-center justify-center"
                      style={{ background: color }}>
                      <Check size={9} color="#fff" strokeWidth={3} />
                    </div>
                  )}
                  <span className="font-black leading-none" style={{ fontSize: 26, color: sel ? color : 'rgba(255,255,255,0.75)', letterSpacing: '-0.03em' }}>
                    {value}
                  </span>
                  <span className="font-semibold text-center leading-tight" style={{ fontSize: 10, color: sel ? `${color}cc` : 'rgba(255,255,255,0.45)' }}>
                    {sub}
                  </span>
                </motion.button>
              )
            })}
          </div>
          <p className="text-center text-xs mt-3" style={{ color: 'rgba(255,255,255,0.22)' }}>
            You can update this any time in Settings.
          </p>
        </motion.div>
      </div>

      {/* ── CTA ── */}
      <motion.div
        className="px-6 shrink-0"
        style={{ borderTop: '0.75px solid rgba(255,255,255,0.06)', background: '#080f1e',
          paddingTop: 14, paddingBottom: 'calc(28px + env(safe-area-inset-bottom, 0px))' }}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <motion.button
          className="w-full py-4 rounded-[20px] text-base font-bold flex items-center justify-center gap-2"
          style={{
            background: 'linear-gradient(135deg, #00c4ee 0%, #6366f1 60%, #9b59b6 100%)',
            color: '#fff',
            boxShadow: '0 6px 28px rgba(0,212,255,0.2), 0 2px 8px rgba(99,102,241,0.25)',
            letterSpacing: '-0.01em',
            transition: 'all 0.2s',
          }}
          onClick={() => onNext({ grade: grade || '7', examDate: examDate || null })}
          whileTap={{ scale: 0.97 }}
        >
          Let's go
          <ArrowRight size={18} strokeWidth={2.5} />
        </motion.button>
        {!grade && (
          <p className="text-center text-xs mt-2" style={{ color: '#6b7d8f' }}>Grade 7 selected by default — tap a tile to change</p>
        )}
      </motion.div>
    </motion.div>
  )
}

// ─── Main Onboarding ──────────────────────────────────────────────────────────
// Streamlined flow: 0 Board → 1 Goal → Home
// Research shows ADHD/neurodivergent users drop off 10-20% per screen beyond step 3.
// Steps removed from active flow (kept as components above for potential re-use):
//   StepHowItWorks → converted to HomeScreen first-run overlay (shows value AFTER entry)
//   StepAccessibility → 100% duplicated in SettingsScreen; deferred with in-app nudge
//   StepPrefs → 100% duplicated in SettingsScreen; deferred with in-app nudge
//   StepProfile → cosmetic; SettingsScreen allows editing name/avatar
export default function OnboardingScreen() {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [boardId, setBoardId] = useState('aqa')

  // Respect system accessibility setting — suppress animations if user prefers reduced motion
  const reducedMotion = typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const handleBoardNext = (id) => {
    setBoardId(id)
    setStep(1)
  }

  const handleSetupNext = ({ grade, examDate }) => {
    finishOnboarding({ grade, examDate })
  }

  const finishOnboarding = ({ grade, examDate }) => {
    localStorage.setItem('neurophysics_onboarded', '1')
    localStorage.setItem('neurophysics_profile', JSON.stringify({
      name: '', avatar: '🧠', ageGroup: null,
      grade: grade || '7', examDate: examDate || null, boardId,
    }))
    navigate('/', { replace: true })
  }

  return (
    <div className="flex flex-col h-full" style={{ background: '#0b1121' }}>
      <AnimatePresence mode="wait">
        {step === 0 && <StepBoard key="board" onNext={handleBoardNext} reducedMotion={reducedMotion} />}
        {step === 1 && <StepSetup key="setup" onNext={handleSetupNext} boardId={boardId} onBack={() => setStep(0)} reducedMotion={reducedMotion} />}
      </AnimatePresence>
    </div>
  )
}
