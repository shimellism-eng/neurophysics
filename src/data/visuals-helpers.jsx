import { motion } from 'motion/react'
import { useState } from 'react'

// ─── IdeaCaption (legacy alias — kept for any remaining direct uses) ──────────
export function IdeaCaption({ children }) {
  return (
    <div className="text-center px-3 py-2 rounded-[10px] leading-snug w-full"
      style={{ fontSize: 11, background: 'rgba(239,68,68,0.08)', color: '#cad5e2', border: '1px solid rgba(239,68,68,0.2)', lineHeight: 1.5 }}>
      {children}
    </div>
  )
}

// ─── ScaffoldTabs — concrete → visual → abstract 3-step wrapper ──────────────
const SCAFFOLD_TABS = [
  { id: 'concrete', label: 'Real World', icon: '🌍' },
  { id: 'visual',   label: 'Explore',   icon: '🔬' },
  { id: 'abstract', label: 'The Maths', icon: '🔣' },
]
export function ScaffoldTabs({ concrete, visual, abstract, color = '#00d4ff' }) {
  const [tab, setTab] = useState('concrete')
  const content = tab === 'concrete' ? concrete : tab === 'visual' ? visual : abstract
  return (
    <div className="w-full flex flex-col gap-3">
      <div className="flex gap-1.5" role="tablist" aria-label="Learning scaffold">
        {SCAFFOLD_TABS.map(t => {
          const active = tab === t.id
          return (
            <button
              key={t.id}
              role="tab"
              aria-selected={active}
              onClick={() => setTab(t.id)}
              style={{
                flex: 1, minHeight: 44, borderRadius: 10, border: active ? `1.5px solid ${color}` : '1px solid rgba(168,184,204,0.2)',
                background: active ? `${color}18` : 'rgba(15,22,41,0.6)',
                color: active ? color : '#a8b8cc', fontSize: 11, fontWeight: active ? 700 : 500,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                gap: 1, cursor: 'pointer', transition: 'all 0.18s',
              }}
            >
              <span style={{ fontSize: 16 }}>{t.icon}</span>
              <span>{t.label}</span>
            </button>
          )
        })}
      </div>
      <div role="tabpanel" aria-label={SCAFFOLD_TABS.find(t => t.id === tab)?.label}>
        {content}
      </div>
    </div>
  )
}

// ─── MisconceptionCard — premium ✗/✓ split card ──────────────────────────────
export function MisconceptionCard({ wrong, right, wrongLabel = 'Common mistake', rightLabel = 'Correct thinking' }) {
  return (
    <div className="w-full flex flex-col gap-2">
      <motion.div
        className="rounded-[12px] px-3 py-2.5 flex gap-2.5 items-start"
        style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)' }}
        initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.35 }}
      >
        <div className="flex items-center justify-center rounded-full shrink-0 mt-0.5"
          style={{ width: 20, height: 20, background: 'rgba(239,68,68,0.15)', border: '1px solid #ef4444' }}>
          <span style={{ fontSize: 10, color: '#ef4444', fontWeight: 900, lineHeight: 1 }}>✗</span>
        </div>
        <div>
          <div style={{ fontSize: 9, fontWeight: 700, color: '#ef4444', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 2 }}>{wrongLabel}</div>
          <div style={{ fontSize: 11, color: '#cad5e2', lineHeight: 1.45 }}>{wrong}</div>
        </div>
      </motion.div>
      <motion.div
        className="rounded-[12px] px-3 py-2.5 flex gap-2.5 items-start"
        style={{ background: 'rgba(0,188,125,0.08)', border: '1px solid rgba(0,188,125,0.25)' }}
        initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.35, delay: 0.12 }}
      >
        <div className="flex items-center justify-center rounded-full shrink-0 mt-0.5"
          style={{ width: 20, height: 20, background: 'rgba(0,188,125,0.15)', border: '1px solid #00bc7d' }}>
          <span style={{ fontSize: 10, color: '#00bc7d', fontWeight: 900, lineHeight: 1 }}>✓</span>
        </div>
        <div>
          <div style={{ fontSize: 9, fontWeight: 700, color: '#00bc7d', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 2 }}>{rightLabel}</div>
          <div style={{ fontSize: 11, color: '#cad5e2', lineHeight: 1.45 }}>{right}</div>
        </div>
      </motion.div>
    </div>
  )
}

// ─── RealWorldCard — rich application card ────────────────────────────────────
export function RealWorldCard({ icon, title, desc, color = '#00bc7d', delay = 0 }) {
  return (
    <motion.div
      className="rounded-[12px] px-3 py-2.5 flex gap-3 items-start w-full"
      style={{ background: `${color}0f`, border: `1px solid ${color}30` }}
      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      <div className="flex items-center justify-center rounded-[8px] shrink-0"
        style={{ width: 34, height: 34, background: `${color}18`, border: `1px solid ${color}30`, fontSize: 18 }}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div style={{ fontSize: 12, fontWeight: 700, color, marginBottom: 2 }}>{title}</div>
        <div style={{ fontSize: 10, color: '#a8b8cc', lineHeight: 1.45 }}>{desc}</div>
      </div>
    </motion.div>
  )
}

// ─── RealityBadge (legacy) ────────────────────────────────────────────────────
export function RealityBadge({ children, color = '#00bc7d', emoji, title, desc }) {
  if (title || desc) {
    return (
      <motion.div className="px-3 py-2.5 rounded-[12px] text-xs w-full"
        style={{ background: `${color}10`, border: `1px solid ${color}30` }}
        initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <div className="font-bold mb-1" style={{ color }}>
          {emoji && <span className="mr-1">{emoji}</span>}{title}
        </div>
        <div style={{ color: '#a8b8cc', lineHeight: 1.5 }}>{desc}</div>
      </motion.div>
    )
  }
  return (
    <motion.div className="px-3 py-2 rounded-[12px] text-xs w-full text-center"
      style={{ background: `${color}10`, color: '#cad5e2', border: `1px solid ${color}30`, lineHeight: 1.5 }}
      initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
      {children}
    </motion.div>
  )
}

// ─── FormulaBox — premium animated equation display ───────────────────────────
export function FormulaBox({ formula, color, subtitle }) {
  return (
    <motion.div
      className="px-4 py-3 rounded-[14px] font-bold text-center w-full"
      style={{
        background: `linear-gradient(135deg, ${color}18 0%, ${color}08 100%)`,
        border: `1.5px solid ${color}45`,
        color,
        fontSize: 20,
        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
        letterSpacing: '-0.01em',
        boxShadow: `0 4px 16px ${color}12`,
      }}
      initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {formula}
      {subtitle && (
        <div style={{ fontSize: 10, color: '#a8b8cc', fontFamily: 'system-ui, sans-serif', fontWeight: 500, marginTop: 4 }}>
          {subtitle}
        </div>
      )}
    </motion.div>
  )
}

// ─── AnimBar — animated percentage bar ───────────────────────────────────────
export function AnimBar({ value, max = 100, color, label, delay = 0, showPct = false }) {
  const pct = Math.round((value / max) * 100)
  return (
    <div className="flex items-center gap-2 w-full">
      <span style={{ fontSize: 10, color: '#a8b8cc', width: 72, flexShrink: 0, textAlign: 'right', lineHeight: 1.3 }}>{label}</span>
      <div className="flex-1 rounded-full overflow-hidden" style={{ height: 10, background: '#1d293d' }}>
        <motion.div className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}cc, ${color})` }}
          initial={{ width: 0 }} animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, delay, ease: 'easeOut' }} />
      </div>
      <span style={{ fontSize: 10, color, fontWeight: 700, width: 28, textAlign: 'right', fontFamily: 'monospace' }}>
        {showPct ? `${pct}%` : value}
      </span>
    </div>
  )
}

// ─── LabelledArrow — force/pathway arrow with label ──────────────────────────
export function LabelledArrow({ label, color, direction = 'right', width = 60 }) {
  const isRight = direction === 'right'
  const isUp = direction === 'up'
  const isDown = direction === 'down'
  if (isUp || isDown) {
    return (
      <div className="flex flex-col items-center gap-1">
        {isDown && <div style={{ width: 0, height: 0, borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderTop: `10px solid ${color}` }} />}
        <div style={{ width: 3, height: width, background: color, borderRadius: 2 }} />
        {isUp && <div style={{ width: 0, height: 0, borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderBottom: `10px solid ${color}` }} />}
        <span style={{ fontSize: 10, fontWeight: 700, color }}>{label}</span>
      </div>
    )
  }
  return (
    <div className={`flex items-center gap-1 ${!isRight ? 'flex-row-reverse' : ''}`}>
      {!isRight && <div style={{ width: 0, height: 0, borderTop: '7px solid transparent', borderBottom: '7px solid transparent', borderRight: `12px solid ${color}` }} />}
      <div style={{ width, height: 3, background: color, borderRadius: 2 }} />
      {isRight && <div style={{ width: 0, height: 0, borderTop: '7px solid transparent', borderBottom: '7px solid transparent', borderLeft: `12px solid ${color}` }} />}
      <span style={{ fontSize: 10, fontWeight: 700, color }}>{label}</span>
    </div>
  )
}

// ─── Dot — glowing particle dot ───────────────────────────────────────────────
export function Dot({ color, size = 10, glow = false, pulse = false }) {
  return (
    <motion.div
      style={{
        width: size, height: size, borderRadius: '50%', background: color, flexShrink: 0,
        boxShadow: glow ? `0 0 ${size}px ${color}80` : 'none',
      }}
      animate={pulse ? { scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] } : {}}
      transition={pulse ? { repeat: Infinity, duration: 1.5 } : {}}
    />
  )
}

// ─── CompareRow — side-by-side comparison ────────────────────────────────────
export function CompareRow({ left, right, leftColor = '#ef4444', rightColor = '#00bc7d' }) {
  return (
    <div className="flex gap-2 w-full">
      <motion.div className="flex-1 rounded-[12px] px-3 py-2.5"
        style={{ background: `${leftColor}0d`, border: `1px solid ${leftColor}30` }}
        initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
        <div style={{ fontSize: 9, fontWeight: 700, color: leftColor, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 3 }}>✗ Wrong</div>
        <div style={{ fontSize: 11, color: '#cad5e2', lineHeight: 1.4 }}>{left}</div>
      </motion.div>
      <motion.div className="flex-1 rounded-[12px] px-3 py-2.5"
        style={{ background: `${rightColor}0d`, border: `1px solid ${rightColor}30` }}
        initial={{ opacity: 0, x: 6 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: 0.1 }}>
        <div style={{ fontSize: 9, fontWeight: 700, color: rightColor, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 3 }}>✓ Correct</div>
        <div style={{ fontSize: 11, color: '#cad5e2', lineHeight: 1.4 }}>{right}</div>
      </motion.div>
    </div>
  )
}

// ─── PhysicsStat — animated calculation display ───────────────────────────────
export function PhysicsStat({ label, value, unit, color, large = false }) {
  return (
    <div className="flex items-center justify-between px-3 py-2 rounded-[10px] w-full"
      style={{ background: `${color}10`, border: `1px solid ${color}25` }}>
      <span style={{ fontSize: 11, color: '#a8b8cc' }}>{label}</span>
      <motion.span
        key={String(value)}
        style={{ fontSize: large ? 18 : 13, fontWeight: 700, color, fontFamily: 'monospace' }}
        initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}>
        {value}{unit && <span style={{ fontSize: large ? 12 : 10, marginLeft: 2, fontWeight: 500 }}>{unit}</span>}
      </motion.span>
    </div>
  )
}

// ─── InfoBadge — small pill for labelling ─────────────────────────────────────
export function InfoBadge({ children, color }) {
  return (
    <div className="inline-flex items-center px-2.5 py-1 rounded-full"
      style={{ background: `${color}15`, border: `1px solid ${color}40`, fontSize: 10, fontWeight: 600, color }}>
      {children}
    </div>
  )
}

// ─── SimSlider — accessible range input with ± step buttons ──────────────────
// Wraps every sim slider: aria-label, aria-live value, 32px ± tap targets.
export function SimSlider({ label, min, max, step = 1, value, onChange, unit = '', color = '#00a8e8' }) {
  const clamp = v => Math.max(min, Math.min(max, v))
  const btnStyle = {
    width: 32, height: 32, borderRadius: 8, background: '#1d293d',
    color: '#a8b8cc', border: '1px solid #2d3f5a', flexShrink: 0,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 16, fontWeight: 700, cursor: 'pointer', lineHeight: 1,
  }
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-0.5" style={{ fontSize: 11 }}>
        <span style={{ color: '#a8b8cc' }}>{label}</span>
        <span aria-live="polite" style={{ color, fontWeight: 700 }}>{value}{unit ? ` ${unit}` : ''}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <button type="button" onClick={() => onChange(clamp(value - step))} style={btnStyle}
          aria-label={`Decrease ${label}`}>−</button>
        <input
          type="range" min={min} max={max} step={step} value={value}
          onChange={e => onChange(+e.target.value)}
          style={{ flex: 1, accentColor: color }}
          aria-label={`${label}`}
          aria-valuemin={min} aria-valuemax={max}
          aria-valuenow={value} aria-valuetext={`${value}${unit ? ' ' + unit : ''}`}
        />
        <button type="button" onClick={() => onChange(clamp(value + step))} style={btnStyle}
          aria-label={`Increase ${label}`}>+</button>
      </div>
    </div>
  )
}

// ─── SimNarration — "What's happening" plain-English panel with aria-live ─────
export function SimNarration({ text }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderTop: '0.75px solid rgba(255,255,255,0.07)', paddingTop: 5, marginTop: 4, width: '100%' }}>
      <button type="button" onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 10, color: '#64748b',
          background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontFamily: 'inherit' }}>
        <span style={{ fontSize: 11 }}>{open ? '▾' : '▸'}</span>
        What's happening
      </button>
      {open && (
        <p aria-live="polite"
          style={{ margin: '4px 0 0', fontSize: 10, color: '#94a3b8', lineHeight: 1.55 }}>
          {text}
        </p>
      )}
    </div>
  )
}
