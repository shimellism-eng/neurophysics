import { motion } from 'motion/react'

export function IdeaCaption({ children }) {
  return (
    <div
      className="text-center px-2 py-1.5 rounded-[8px] italic mx-1 leading-tight"
      style={{ fontSize: 10, background: 'rgba(239,68,68,0.07)', color: '#8090a8', border: '1px solid rgba(239,68,68,0.12)' }}
    >
      {children}
    </div>
  )
}

export function RealityBadge({ children, color = '#00bc7d', emoji, title, desc }) {
  if (title || desc) {
    return (
      <motion.div
        className="px-3 py-2 rounded-[10px] text-xs"
        style={{ background: `${color}18`, border: `1px solid ${color}30` }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="font-bold mb-0.5" style={{ color }}>
          {emoji && <span className="mr-1">{emoji}</span>}{title}
        </div>
        <div style={{ color: '#a8b8cc' }}>{desc}</div>
      </motion.div>
    )
  }
  return (
    <motion.div
      className="px-3 py-1.5 rounded-full text-xs font-semibold text-center"
      style={{ background: `${color}18`, color, border: `1px solid ${color}` }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3 }}
    >
      {children}
    </motion.div>
  )
}

export function AnimBar({ value, max = 100, color, label, delay = 0 }) {
  return (
    <div className="flex items-center gap-2 w-full">
      <span className="text-xs w-20 shrink-0 text-right" style={{ color: '#a8b8cc' }}>{label}</span>
      <div className="flex-1 h-3 rounded-full" style={{ background: '#1d293d' }}>
        <motion.div className="h-full rounded-full" style={{ background: color }}
          initial={{ width: 0 }} animate={{ width: `${(value / max) * 100}%` }}
          transition={{ duration: 0.7, delay, ease: 'easeOut' }} />
      </div>
      <span className="text-xs w-6 text-right font-mono" style={{ color }}>{value}</span>
    </div>
  )
}

export function FormulaBox({ formula, color }) {
  return (
    <div className="px-5 py-3 rounded-[14px] text-2xl font-bold text-center"
      style={{ background: `${color}15`, border: `1px solid ${color}50`, color, fontFamily: "'Kalam', cursive", lineHeight: 1.3 }}>
      {formula}
    </div>
  )
}

export function LabelledArrow({ label, color, direction = 'right', width = 60 }) {
  const isRight = direction === 'right'
  return (
    <div className={`flex items-center gap-1 ${!isRight ? 'flex-row-reverse' : ''}`}>
      {!isRight && <div style={{ width: 0, height: 0, borderTop: '7px solid transparent', borderBottom: '7px solid transparent', borderRight: `12px solid ${color}` }} />}
      <div style={{ width, height: 4, background: color, borderRadius: 2 }} />
      {isRight && <div style={{ width: 0, height: 0, borderTop: '7px solid transparent', borderBottom: '7px solid transparent', borderLeft: `12px solid ${color}` }} />}
      <span className="text-xs font-bold" style={{ color }}>{label}</span>
    </div>
  )
}

export function Dot({ color, size = 10, glow = false }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%', background: color,
      boxShadow: glow ? `0 0 8px ${color}` : 'none', flexShrink: 0,
    }} />
  )
}
