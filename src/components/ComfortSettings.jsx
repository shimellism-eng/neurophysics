/**
 * ComfortSettings — slide-up drawer for all accessibility & comfort preferences.
 * Opened via the floating accessibility icon in App.jsx OR from SettingsScreen.
 */
import { useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { X, Type, Palette, Volume2, BookOpen, Brain, RotateCcw } from 'lucide-react'
import { useComfort, COMFORT_PRESETS, COMFORT_DEFAULTS } from '../context/ComfortContext'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { useAuth } from '../context/AuthContext'

// ── Primitive controls ────────────────────────────────────────────────────────

function Row({ label, hint, children, stacked = false }) {
  if (stacked) {
    return (
      <div className="py-3" style={{ borderBottom: '0.75px solid var(--np-border)' }}>
        <div className="text-sm font-semibold mb-0.5" style={{ color: 'var(--np-text)' }}>{label}</div>
        {hint && <div className="text-xs mb-2" style={{ color: 'var(--np-text-muted)' }}>{hint}</div>}
        {children}
      </div>
    )
  }
  return (
    <div className="flex items-center justify-between gap-4 py-3"
      style={{ borderBottom: '0.75px solid var(--np-border)' }}>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold" style={{ color: 'var(--np-text)' }}>{label}</div>
        {hint && <div className="text-xs mt-0.5" style={{ color: 'var(--np-text-muted)' }}>{hint}</div>}
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  )
}

function Toggle({ on, onChange, label }) {
  return (
    <button
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={() => onChange(!on)}
      className="relative shrink-0"
      style={{ width: 44, height: 26 }}
    >
      <span
        className="absolute inset-0 rounded-full transition-colors"
        style={{
          background: on ? 'var(--np-cyan)' : 'rgba(255,255,255,0.15)',
          transition: 'background 200ms',
        }}
      />
      <span
        className="absolute top-1 rounded-full transition-transform"
        style={{
          width: 18, height: 18, left: 4,
          background: '#fff',
          transform: on ? 'translateX(18px)' : 'translateX(0)',
          transition: 'transform 200ms',
          boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
        }}
      />
    </button>
  )
}

function Slider({ value, min, max, step = 0.1, onChange, label, format }) {
  const pct = ((value - min) / (max - min)) * 100
  return (
    <div className="flex items-center gap-2" style={{ minWidth: 160 }}>
      <button
        aria-label={`Decrease ${label}`}
        className="w-12 h-12 rounded-lg flex items-center justify-center text-lg font-bold active:opacity-70"
        style={{ background: 'rgba(255,255,255,0.08)', color: 'var(--np-text)', flexShrink: 0 }}
        onClick={() => onChange(Math.max(min, Math.round((value - step) * 100) / 100))}
      >−</button>
      <div className="relative flex-1" style={{ height: 20 }}>
        <div className="absolute top-1/2 -translate-y-1/2 w-full rounded-full"
          style={{ height: 4, background: 'rgba(255,255,255,0.12)' }} />
        <div className="absolute top-1/2 -translate-y-1/2 rounded-full"
          style={{ height: 4, width: `${pct}%`, background: 'var(--np-cyan)' }} />
        <input
          type="range" min={min} max={max} step={step} value={value}
          aria-label={label}
          onChange={e => onChange(parseFloat(e.target.value))}
          className="absolute inset-0 w-full opacity-0 cursor-pointer"
          style={{ height: '100%' }}
        />
      </div>
      <button
        aria-label={`Increase ${label}`}
        className="w-12 h-12 rounded-lg flex items-center justify-center text-lg font-bold active:opacity-70"
        style={{ background: 'rgba(255,255,255,0.08)', color: 'var(--np-text)', flexShrink: 0 }}
        onClick={() => onChange(Math.min(max, Math.round((value + step) * 100) / 100))}
      >+</button>
      <span className="text-xs font-mono w-10 text-right" style={{ color: 'var(--np-text-muted)' }}>
        {format ? format(value) : value}
      </span>
    </div>
  )
}

function ChipGroup({ options, value, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map(opt => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className="px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors"
          style={{
            background: value === opt.value ? 'var(--np-cyan)' : 'rgba(255,255,255,0.08)',
            color:      value === opt.value ? '#080f1e'        : 'var(--np-text)',
            border:     `0.75px solid ${value === opt.value ? 'var(--np-cyan)' : 'var(--np-border)'}`,
          }}
        >
          {opt.icon && <span className="mr-1">{opt.icon}</span>}
          {opt.label}
        </button>
      ))}
    </div>
  )
}

function Section({ icon: Icon, title, children }) {
  return (
    <div className="mb-2">
      <div className="flex items-center gap-2 pt-4 pb-1">
        <Icon size={14} style={{ color: 'var(--np-cyan)' }} />
        <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--np-cyan)' }}>
          {title}
        </span>
      </div>
      {children}
    </div>
  )
}

// ── Main drawer ───────────────────────────────────────────────────────────────

export default function ComfortSettings() {
  const { prefs, setPref, applyPreset, resetToDefaults, settingsOpen, setSettingsOpen } = useComfort()
  const reduced = useReducedMotion()
  const sheetRef = useRef(null)

  // Trap focus & close on Escape
  useEffect(() => {
    if (!settingsOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') setSettingsOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [settingsOpen, setSettingsOpen])

  const bgOptions = [
    { value: 'dark',        label: 'Dark',        icon: '🌑' },
    { value: 'cream',       label: 'Cream',       icon: '🌕' },
    { value: 'lightblue',   label: 'Light Blue',  icon: '💧' },
    { value: 'lightyellow', label: 'Light Yellow', icon: '🌞' },
  ]

  const overlayOptions = [
    { value: 'none',   label: 'Off' },
    { value: 'yellow', label: 'Yellow', icon: '🟡' },
    { value: 'blue',   label: 'Blue',   icon: '🔵' },
    { value: 'pink',   label: 'Pink',   icon: '🩷' },
    { value: 'green',  label: 'Green',  icon: '🟢' },
  ]

  const fontOptions = [
    { value: 'system',     label: 'Default' },
    { value: 'atkinson',   label: 'Atkinson' },
    { value: 'opendyslexic', label: 'OpenDyslexic' },
  ]

  const sessionOptions = [
    { value: 5,  label: '5 min' },
    { value: 10, label: '10 min' },
    { value: 15, label: '15 min' },
    { value: 25, label: '25 min' },
  ]

  const slideVariants = reduced
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        hidden:  { y: '100%', opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { type: 'spring', damping: 30, stiffness: 350 } },
        exit:    { y: '100%', opacity: 0, transition: { duration: 0.2 } },
      }

  return (
    <AnimatePresence>
      {settingsOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-[998]"
            style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSettingsOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.div
            key="drawer"
            ref={sheetRef}
            role="dialog"
            aria-modal="true"
            aria-label="Comfort Settings"
            className="fixed left-0 right-0 bottom-0 z-[999] rounded-t-[24px] overflow-hidden"
            style={{
              background: 'var(--np-card-deep)',
              border: '0.75px solid var(--np-border)',
              maxHeight: '88vh',
              display: 'flex',
              flexDirection: 'column',
            }}
            variants={slideVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Drag handle */}
            <div className="flex justify-center pt-3 pb-1 shrink-0">
              <div className="rounded-full" style={{ width: 36, height: 4, background: 'rgba(255,255,255,0.2)' }} />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3 shrink-0"
              style={{ borderBottom: '0.75px solid var(--np-border)' }}>
              <div>
                <h2 className="font-bold text-lg" style={{ color: 'var(--np-text)', fontFamily: 'var(--font-display)' }}>
                  Comfort Settings
                </h2>
                <p className="text-xs mt-0.5" style={{ color: 'var(--np-text-muted)' }}>
                  Personalise how the app looks and feels
                </p>
              </div>
              <button
                className="w-10 h-10 rounded-xl flex items-center justify-center active:opacity-70"
                style={{ background: 'rgba(255,255,255,0.07)', border: '0.75px solid var(--np-border)' }}
                onClick={() => setSettingsOpen(false)}
                aria-label="Close comfort settings"
              >
                <X size={18} style={{ color: 'var(--np-text-muted)' }} />
              </button>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto px-5 pb-8" style={{ overscrollBehavior: 'contain' }}>

              {/* Presets */}
              <Section icon={Brain} title="Quick Presets">
                <div className="grid grid-cols-2 gap-2 py-3">
                  {Object.entries(COMFORT_PRESETS).map(([key, preset]) => (
                    <button
                      key={key}
                      onClick={() => applyPreset(key)}
                      className="flex items-center gap-2 px-3 py-3 rounded-xl text-left active:opacity-75"
                      style={{
                        background: 'rgba(255,255,255,0.06)',
                        border: '0.75px solid var(--np-border)',
                      }}
                    >
                      <span style={{ fontSize: 20 }}>{preset.icon}</span>
                      <span className="text-sm font-semibold leading-tight" style={{ color: 'var(--np-text)' }}>
                        {preset.label}
                      </span>
                    </button>
                  ))}
                </div>
              </Section>

              {/* Text & Reading */}
              <Section icon={Type} title="Text & Reading">
                <Row label="Font size" hint="0.8 – 1.6 rem">
                  <Slider
                    value={prefs.fontSize} min={0.8} max={1.6} step={0.05}
                    onChange={v => setPref('fontSize', v)}
                    label="Font size"
                    format={v => `${v.toFixed(2)}x`}
                  />
                </Row>
                <Row label="Font family" stacked>
                  <ChipGroup options={fontOptions} value={prefs.fontFamily}
                    onChange={v => setPref('fontFamily', v)} />
                </Row>
                <Row label="Line spacing" hint="1.5 – 2.5">
                  <Slider
                    value={prefs.lineSpacing} min={1.5} max={2.5} step={0.1}
                    onChange={v => setPref('lineSpacing', v)}
                    label="Line spacing"
                    format={v => v.toFixed(1)}
                  />
                </Row>
              </Section>

              {/* Display */}
              <Section icon={Palette} title="Display">
                <Row label="Background" stacked>
                  <ChipGroup options={bgOptions} value={prefs.background}
                    onChange={v => setPref('background', v)} />
                </Row>
                <Row label="Colour overlay" hint="Tints the text area to reduce glare" stacked>
                  <ChipGroup options={overlayOptions} value={prefs.colourOverlay}
                    onChange={v => setPref('colourOverlay', v)} />
                </Row>
                <Row label="Reading ruler" hint="Horizontal bar that follows your scroll">
                  <Toggle on={prefs.readingRuler} onChange={v => setPref('readingRuler', v)}
                    label="Reading ruler" />
                </Row>
                <Row label="High contrast" hint="Removes blur, boosts text contrast">
                  <Toggle on={prefs.highContrast} onChange={v => setPref('highContrast', v)}
                    label="High contrast" />
                </Row>
              </Section>

              {/* Motion & Sound */}
              <Section icon={Volume2} title="Motion & Sound">
                <Row label="Reduced motion" hint="Disables animations and transitions">
                  <Toggle on={prefs.reduceMotion} onChange={v => setPref('reduceMotion', v)}
                    label="Reduced motion" />
                </Row>
                <Row label="Sound effects">
                  <Toggle on={prefs.sounds} onChange={v => setPref('sounds', v)}
                    label="Sound effects" />
                </Row>
                <Row label="Celebrations" hint="Confetti, cheers, level-up animations">
                  <Toggle on={prefs.celebrations} onChange={v => setPref('celebrations', v)}
                    label="Celebrations" />
                </Row>
              </Section>

              {/* Reading Assistance */}
              <Section icon={BookOpen} title="Read Aloud (TTS)">
                <Row label="Text-to-speech">
                  <Toggle on={prefs.tts} onChange={v => setPref('tts', v)}
                    label="Text-to-speech" />
                </Row>
                <Row label="Reading speed" hint="0.5× – 2.0×">
                  <Slider
                    value={prefs.ttsSpeed} min={0.5} max={2.0} step={0.1}
                    onChange={v => setPref('ttsSpeed', v)}
                    label="TTS speed"
                    format={v => `${v.toFixed(1)}×`}
                  />
                </Row>
                <Row label="Auto-read questions" hint="Reads each question automatically">
                  <Toggle on={prefs.ttsAutoRead} onChange={v => setPref('ttsAutoRead', v)}
                    label="Auto-read questions" />
                </Row>
              </Section>

              {/* Learning Mode */}
              <Section icon={Brain} title="Learning Mode">
                <Row label="Challenge mode (hearts)" hint="Off = unlimited attempts, no penalty">
                  <Toggle on={prefs.challengeMode} onChange={v => setPref('challengeMode', v)}
                    label="Challenge mode" />
                </Row>
                <Row label="Session length" stacked>
                  <ChipGroup options={sessionOptions} value={prefs.sessionLength}
                    onChange={v => setPref('sessionLength', v)} />
                </Row>
                <Row label="Pomodoro timer" hint="Gentle break suggestion at end of session">
                  <Toggle on={prefs.pomodoroTimer} onChange={v => setPref('pomodoroTimer', v)}
                    label="Pomodoro timer" />
                </Row>
              </Section>

              {/* Reset */}
              <div className="pt-4 pb-2">
                <button
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl active:opacity-70"
                  style={{
                    background: 'rgba(239,68,68,0.1)',
                    border: '0.75px solid rgba(239,68,68,0.3)',
                    color: '#ef4444',
                  }}
                  onClick={resetToDefaults}
                  aria-label="Reset all comfort settings to defaults"
                >
                  <RotateCcw size={16} />
                  <span className="text-sm font-semibold">Reset to Defaults</span>
                </button>
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// ── First-time prompt ─────────────────────────────────────────────────────────

export function ComfortFirstTimePrompt() {
  const { firstTimePrompt, dismissFirstTimePrompt, setSettingsOpen } = useComfort()
  const { user } = useAuth()
  const reduced = useReducedMotion()

  if (!firstTimePrompt || !user) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-x-4 z-[997] rounded-2xl p-5"
        style={{
          bottom: 'calc(96px + env(safe-area-inset-bottom, 0px) + 12px)',
          background: 'var(--np-card)',
          border: '0.75px solid var(--np-cyan)',
          boxShadow: '0 0 24px rgba(99,102,241,0.15)',
        }}
        initial={reduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
        animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
      >
        <div className="flex items-start gap-3">
          <span style={{ fontSize: 28, lineHeight: 1 }}>♿</span>
          <div className="flex-1">
            <p className="font-bold text-sm" style={{ color: 'var(--np-text)' }}>
              Set up your learning preferences
            </p>
            <p className="text-xs mt-1" style={{ color: 'var(--np-text-muted)' }}>
              Adjust fonts, colours, motion, and more for the way you learn best.
            </p>
            <div className="flex gap-2 mt-3">
              <button
                className="flex-1 py-2 rounded-xl text-sm font-semibold active:opacity-70"
                style={{ background: 'var(--np-cyan)', color: '#080f1e' }}
                onClick={() => {
                  dismissFirstTimePrompt()
                  setSettingsOpen(true)
                }}
              >
                Set up now
              </button>
              <button
                className="flex-1 py-2 rounded-xl text-sm font-semibold active:opacity-70"
                style={{ background: 'rgba(255,255,255,0.07)', color: 'var(--np-text-muted)', border: '0.75px solid var(--np-border)' }}
                onClick={dismissFirstTimePrompt}
              >
                Maybe later
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
