import { motion, AnimatePresence } from 'motion/react'
import { useState } from 'react'
import { IdeaCaption, RealityBadge, FormulaBox } from './visuals-helpers'

const EC = '#155dfc'

// ─── SVG helpers ─────────────────────────────────────────────────────────────
const W = ({ x1, y1, x2, y2, col = '#cad5e2' }) =>
  <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={col} strokeWidth="1.5" strokeLinecap="round" />

function AmmSym({ cx, cy }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={11} fill="#0b1121" stroke="#10b981" strokeWidth="1.5" />
      <text x={cx} y={cy + 4} textAnchor="middle" fontSize={10} fontWeight="bold" fill="#10b981">A</text>
    </g>
  )
}
function VoltSym({ cx, cy }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={11} fill="#0b1121" stroke="#f59e0b" strokeWidth="1.5" />
      <text x={cx} y={cy + 4} textAnchor="middle" fontSize={10} fontWeight="bold" fill="#f59e0b">V</text>
    </g>
  )
}

// ─── 7. Circuit Basics ────────────────────────────────────────────────────────
function CircuitBasicsLesson() {
  const [on, setOn] = useState(true)

  return (
    <div className="w-full flex flex-col items-center gap-2 px-3 pt-3 pb-3">
      <button
        onClick={() => setOn(v => !v)}
        className="px-4 py-1.5 rounded-[8px] text-xs font-semibold"
        style={{ background: on ? `${EC}22` : '#1d293d', color: on ? EC : '#a8b8cc', border: `1px solid ${on ? EC : '#2d3e55'}` }}
      >
        Switch: {on ? '▪ Closed' : '/ Open'}
      </button>

      <svg width="260" height="120" viewBox="0 0 260 120" style={{ display: 'block' }}>
        {/* Top rail */}
        <W x1={20} y1={15} x2={90} y2={15} />
        {/* Switch at top centre */}
        <circle cx={98} cy={15} r={3} fill="#4a5a72" />
        {on
          ? <line x1={98} y1={15} x2={142} y2={15} stroke={EC} strokeWidth="1.5" />
          : <line x1={98} y1={15} x2={138} y2={7} stroke="#4a5a72" strokeWidth="1.5" />
        }
        <circle cx={142} cy={15} r={3} fill="#4a5a72" />
        <W x1={142} y1={15} x2={240} y2={15} />
        {/* Right side → bulb */}
        <W x1={240} y1={15} x2={240} y2={48} />
        <circle cx={240} cy={60} r={12} fill={on ? '#fdc70015' : 'none'} stroke={on ? '#fdc700' : '#4a5a72'} strokeWidth="1.5" />
        <line x1={233} y1={53} x2={247} y2={67} stroke={on ? '#fdc700' : '#4a5a72'} strokeWidth="1.5" />
        <line x1={247} y1={53} x2={233} y2={67} stroke={on ? '#fdc700' : '#4a5a72'} strokeWidth="1.5" />
        {on && <circle cx={240} cy={60} r={18} fill="#fdc700" fillOpacity="0.08" />}
        <W x1={240} y1={72} x2={240} y2={105} />
        {/* Bottom rail */}
        <W x1={240} y1={105} x2={20} y2={105} />
        {/* Left side → battery */}
        <W x1={20} y1={105} x2={20} y2={74} />
        {/* Battery symbol (4 lines) */}
        <line x1={12} y1={72} x2={28} y2={72} stroke="#cad5e2" strokeWidth="2.5" strokeLinecap="round" />
        <line x1={15} y1={66} x2={25} y2={66} stroke="#cad5e2" strokeWidth="1.5" />
        <line x1={12} y1={60} x2={28} y2={60} stroke="#cad5e2" strokeWidth="2.5" strokeLinecap="round" />
        <line x1={15} y1={54} x2={25} y2={54} stroke="#cad5e2" strokeWidth="1.5" />
        <W x1={20} y1={52} x2={20} y2={15} />
        {/* Animated current arrows */}
        {on && (
          <>
            <motion.polygon points="125,10 125,20 135,15" fill={EC}
              animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 1.4 }} />
            <motion.polygon points="237,88 243,88 240,98" fill={EC}
              animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 1.4, delay: 0.4 }} />
            <motion.polygon points="80,110 80,100 70,105" fill={EC}
              animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 1.4, delay: 0.8 }} />
          </>
        )}
        {/* Labels */}
        <text x={120} y={10} textAnchor="middle" fill="#a8b8cc" fontSize={7}>switch</text>
        <text x={255} y={63} fill={on ? '#fdc700' : '#4a5a72'} fontSize={7}>lamp</text>
        <text x={6} y={65} textAnchor="end" fill="#a8b8cc" fontSize={7}>6V</text>
      </svg>

      <p className="text-xs text-center" style={{ color: on ? EC : '#a8b8cc' }}>
        {on ? '⚡ Complete circuit — current flows' : '✕ Open circuit — no current'}
      </p>
    </div>
  )
}

function CircuitBasicsIdea() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-4">
      <svg width="200" height="70" viewBox="0 0 200 70">
        <text x={100} y={14} textAnchor="middle" fill="#ef4444" fontSize={8} fontWeight="bold">Electrons flow FROM + TO −</text>
        <line x1={20} y1={35} x2={180} y2={35} stroke="#ef4444" strokeWidth="2" />
        <polygon points="170,30 180,35 170,40" fill="#ef4444" />
        <text x={20} y={32} fill="#cad5e2" fontSize={9} fontWeight="bold">+</text>
        <text x={185} y={39} fill="#cad5e2" fontSize={9} fontWeight="bold">−</text>
        <text x={100} y={56} textAnchor="middle" fill="#ef4444" fontSize={8}>← electron flow</text>
        <line x1={40} y1={58} x2={160} y2={58} stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2" />
        <polygon points="50,53 40,58 50,63" fill="#ef4444" />
      </svg>
      <IdeaCaption>Current (conventional) flows from + to −, the same direction as electron flow</IdeaCaption>
    </div>
  )
}

function CircuitBasicsReality() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-4">
      <div className="flex gap-3 w-full justify-center">
        <div className="flex flex-col items-center gap-1 p-2 rounded-[8px]" style={{ background: `${EC}12`, border: `1px solid ${EC}` }}>
          <span className="text-xs font-bold" style={{ color: EC }}>Conventional current</span>
          <span className="text-xs text-center" style={{ color: '#cad5e2' }}>+ → −<br/>(used in circuit diagrams)</span>
        </div>
        <div className="flex flex-col items-center gap-1 p-2 rounded-[8px]" style={{ background: '#ef444412', border: '1px solid #ef4444' }}>
          <span className="text-xs font-bold" style={{ color: '#ef4444' }}>Electron flow</span>
          <span className="text-xs text-center" style={{ color: '#cad5e2' }}>− → +<br/>(actual particle movement)</span>
        </div>
      </div>
      <RealityBadge color={EC}>Conventional current flows + to −. Electrons actually move − to +. Both are correct in context.</RealityBadge>
    </div>
  )
}

// ─── 8. Circuit Symbols ───────────────────────────────────────────────────────
function CircuitComponentsLesson() {
  const [sel, setSel] = useState(null)

  const symbols = [
    { name: 'Cell',       desc: 'Single voltage source (long line = +, short = −).', color: EC },
    { name: 'Switch',     desc: 'Opens or closes the circuit to control current.', color: EC },
    { name: 'Lamp',       desc: 'Converts electrical energy to light (and heat).', color: '#fdc700' },
    { name: 'Resistor',   desc: 'Reduces current. Resistance measured in ohms (Ω).', color: '#f97316' },
    { name: 'Ammeter',    desc: 'Measures current (A). Connected in series.', color: '#10b981' },
    { name: 'Voltmeter',  desc: 'Measures voltage (V). Connected in parallel.', color: '#f59e0b' },
    { name: 'LDR',        desc: 'Light-Dependent Resistor — resistance falls as light increases.', color: '#a855f7' },
    { name: 'Thermistor', desc: 'Resistance decreases as temperature rises.', color: '#ef4444' },
  ]

  // Returns JSX for each symbol centred at (0,0)
  const draws = [
    // Cell
    () => (
      <g>
        <line x1={-12} y1={0} x2={12} y2={0} stroke="#cad5e2" strokeWidth="1.5" />
        <line x1={-3} y1={-7} x2={-3} y2={7} stroke="#cad5e2" strokeWidth="2.5" strokeLinecap="round" />
        <line x1={3} y1={-4} x2={3} y2={4} stroke="#cad5e2" strokeWidth="1.5" />
      </g>
    ),
    // Switch
    () => (
      <g>
        <circle cx={-10} cy={0} r={3} fill="#4a5a72" />
        <circle cx={10} cy={0} r={3} fill="#4a5a72" />
        <line x1={-7} y1={0} x2={7} y2={-9} stroke="#cad5e2" strokeWidth="1.5" />
      </g>
    ),
    // Lamp
    () => (
      <g>
        <circle cx={0} cy={0} r={10} fill="none" stroke="#fdc700" strokeWidth="1.5" />
        <line x1={-6} y1={-6} x2={6} y2={6} stroke="#fdc700" strokeWidth="1.5" />
        <line x1={6} y1={-6} x2={-6} y2={6} stroke="#fdc700" strokeWidth="1.5" />
      </g>
    ),
    // Resistor
    () => (
      <g>
        <line x1={-14} y1={0} x2={14} y2={0} stroke="#cad5e2" strokeWidth="1.5" />
        <rect x={-10} y={-5} width={20} height={10} fill="none" stroke="#f97316" strokeWidth="1.5" rx={2} />
      </g>
    ),
    // Ammeter
    () => (
      <g>
        <circle cx={0} cy={0} r={11} fill="#0b1121" stroke="#10b981" strokeWidth="1.5" />
        <text x={0} y={4} textAnchor="middle" fontSize={10} fontWeight="bold" fill="#10b981">A</text>
      </g>
    ),
    // Voltmeter
    () => (
      <g>
        <circle cx={0} cy={0} r={11} fill="#0b1121" stroke="#f59e0b" strokeWidth="1.5" />
        <text x={0} y={4} textAnchor="middle" fontSize={10} fontWeight="bold" fill="#f59e0b">V</text>
      </g>
    ),
    // LDR
    () => (
      <g>
        <line x1={-14} y1={0} x2={14} y2={0} stroke="#cad5e2" strokeWidth="1.5" />
        <rect x={-10} y={-5} width={20} height={10} fill="none" stroke="#a855f7" strokeWidth="1.5" rx={2} />
        <line x1={-4} y1={-9} x2={-2} y2={-14} stroke="#fdc700" strokeWidth="1" />
        <line x1={1} y1={-9} x2={3} y2={-14} stroke="#fdc700" strokeWidth="1" />
        <line x1={6} y1={-9} x2={8} y2={-14} stroke="#fdc700" strokeWidth="1" />
      </g>
    ),
    // Thermistor
    () => (
      <g>
        <line x1={-14} y1={0} x2={14} y2={0} stroke="#cad5e2" strokeWidth="1.5" />
        <rect x={-10} y={-5} width={20} height={10} fill="none" stroke="#ef4444" strokeWidth="1.5" rx={2} />
        <text x={0} y={3.5} textAnchor="middle" fontSize={8} fill="#ef4444">t°</text>
      </g>
    ),
  ]

  const cols = 4
  const s = sel !== null ? symbols[sel] : null

  return (
    <div className="w-full flex flex-col gap-2 px-3 pt-3 pb-3">
      <svg width="280" height="92" viewBox="0 0 280 92" style={{ display: 'block', width: '100%' }}>
        {symbols.map((sym, i) => {
          const col = i % cols
          const row = Math.floor(i / cols)
          const cx = 35 + col * 68
          const cy = 28 + row * 48
          const active = sel === i
          return (
            <g key={i} onClick={() => setSel(active ? null : i)} style={{ cursor: 'pointer' }}>
              <rect x={cx - 28} y={cy - 20} width={56} height={40} rx={6}
                fill={active ? `${sym.color}18` : '#1a2640'}
                stroke={active ? sym.color : '#253348'} strokeWidth={1.2} />
              <g transform={`translate(${cx}, ${cy - 4})`}>{draws[i]()}</g>
              <text x={cx} y={cy + 17} textAnchor="middle" fontSize={7} fontWeight="600"
                fill={active ? sym.color : '#a8b8cc'}>{sym.name}</text>
            </g>
          )
        })}
      </svg>

      <AnimatePresence mode="wait">
        {s ? (
          <motion.div className="rounded-[12px] px-3 py-2"
            key={sel}
            style={{ background: `${s.color}12`, border: `1px solid ${s.color}40` }}
            initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: s.color }}>{s.name}: </span>
            <span style={{ fontSize: 11, color: '#cad5e2' }}>{s.desc}</span>
          </motion.div>
        ) : (
          <motion.p key="hint" style={{ fontSize: 10, color: '#a8b8cc', textAlign: 'center', paddingTop: 2 }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            Tap a symbol to learn its function
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

function CircuitComponentsIdea() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-4">
      <div className="flex gap-3">
        <div className="flex flex-col items-center gap-1 p-2 rounded-[8px]" style={{ background: '#ef444412', border: '1px solid #ef4444' }}>
          <span className="text-xs font-bold" style={{ color: '#ef4444' }}>Ammeter</span>
          <span className="text-xs text-center" style={{ color: '#a8b8cc' }}>in parallel?  ✗</span>
        </div>
        <div className="flex flex-col items-center gap-1 p-2 rounded-[8px]" style={{ background: '#ef444412', border: '1px solid #ef4444' }}>
          <span className="text-xs font-bold" style={{ color: '#ef4444' }}>Voltmeter</span>
          <span className="text-xs text-center" style={{ color: '#a8b8cc' }}>in series?  ✗</span>
        </div>
      </div>
      <IdeaCaption>It doesn't matter where you place ammeters or voltmeters — they work anywhere in a circuit</IdeaCaption>
    </div>
  )
}

function CircuitComponentsReality() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-4">
      <div className="flex gap-3">
        <div className="flex flex-col items-center gap-1 p-2 rounded-[8px]" style={{ background: '#10b98112', border: '1px solid #10b981' }}>
          <span className="text-xs font-bold" style={{ color: '#10b981' }}>Ammeter (A)</span>
          <span className="text-xs text-center" style={{ color: '#cad5e2' }}>Series only<br/>Very low resistance</span>
        </div>
        <div className="flex flex-col items-center gap-1 p-2 rounded-[8px]" style={{ background: '#f59e0b12', border: '1px solid #f59e0b' }}>
          <span className="text-xs font-bold" style={{ color: '#f59e0b' }}>Voltmeter (V)</span>
          <span className="text-xs text-center" style={{ color: '#cad5e2' }}>Parallel only<br/>Very high resistance</span>
        </div>
      </div>
      <RealityBadge color={EC}>Ammeter in series (measures current). Voltmeter in parallel (measures voltage).</RealityBadge>
    </div>
  )
}

// ─── 9. Series & Parallel ─────────────────────────────────────────────────────
function SeriesParallelLesson() {
  const [mode, setMode] = useState('series')
  const isSeries = mode === 'series'

  return (
    <div className="w-full flex flex-col items-center gap-2 px-3 pt-3 pb-3">
      <div className="flex gap-2">
        {['series', 'parallel'].map(m => (
          <button key={m} onClick={() => setMode(m)}
            className="px-3 py-1 rounded-[8px] text-xs font-semibold capitalize"
            style={{ background: mode === m ? `${EC}22` : '#1d293d', color: mode === m ? EC : '#a8b8cc', border: `1px solid ${mode === m ? EC : '#2d3e55'}` }}>
            {m.charAt(0).toUpperCase() + m.slice(1)}
          </button>
        ))}
      </div>

      {isSeries ? (
        <svg width="260" height="120" viewBox="0 0 260 120" style={{ display: 'block' }}>
          {/* Rectangle */}
          <W x1={15} y1={15} x2={245} y2={15} />
          <W x1={245} y1={15} x2={245} y2={105} />
          <W x1={245} y1={105} x2={15} y2={105} />
          <W x1={15} y1={105} x2={15} y2={15} />
          {/* Battery left */}
          <line x1={8} y1={55} x2={22} y2={55} stroke="#cad5e2" strokeWidth="2.5" strokeLinecap="round" />
          <line x1={11} y1={63} x2={19} y2={63} stroke="#cad5e2" strokeWidth="1.5" />
          <text x={28} y={60} fill="#a8b8cc" fontSize={8}>6V</text>
          {/* Bulb 1 */}
          <circle cx={90} cy={15} r={10} fill="#fdc70015" stroke="#fdc700" strokeWidth="1.5" />
          <line x1={84} y1={9} x2={96} y2={21} stroke="#fdc700" strokeWidth="1.5" />
          <line x1={96} y1={9} x2={84} y2={21} stroke="#fdc700" strokeWidth="1.5" />
          <text x={90} y={34} textAnchor="middle" fill="#fdc700" fontSize={8}>L₁</text>
          {/* Bulb 2 */}
          <circle cx={170} cy={15} r={10} fill="#fdc70015" stroke="#fdc700" strokeWidth="1.5" />
          <line x1={164} y1={9} x2={176} y2={21} stroke="#fdc700" strokeWidth="1.5" />
          <line x1={176} y1={9} x2={164} y2={21} stroke="#fdc700" strokeWidth="1.5" />
          <text x={170} y={34} textAnchor="middle" fill="#fdc700" fontSize={8}>L₂</text>
          {/* Ammeter */}
          <AmmSym cx={245} cy={60} />
          {/* Facts */}
          <text x={130} y={75} textAnchor="middle" fill="#a8b8cc" fontSize={8}>Same current everywhere</text>
          <text x={130} y={88} textAnchor="middle" fill="#a8b8cc" fontSize={8}>Voltages add up: V = V₁ + V₂</text>
          <text x={130} y={101} textAnchor="middle" fill="#ef4444" fontSize={7}>One bulb fails → all go out</text>
        </svg>
      ) : (
        <svg width="260" height="130" viewBox="0 0 260 130" style={{ display: 'block' }}>
          {/* Outer rectangle */}
          <W x1={15} y1={20} x2={245} y2={20} />
          <W x1={245} y1={20} x2={245} y2={110} />
          <W x1={245} y1={110} x2={15} y2={110} />
          <W x1={15} y1={110} x2={15} y2={20} />
          {/* Junction lines to branch */}
          <W x1={80} y1={20} x2={80} y2={45} />
          <W x1={80} y1={65} x2={80} y2={110} />
          <W x1={170} y1={20} x2={170} y2={45} />
          <W x1={170} y1={65} x2={170} y2={110} />
          {/* Branch wire */}
          <W x1={80} y1={45} x2={170} y2={45} />
          <W x1={80} y1={65} x2={170} y2={65} />
          {/* Bulb 1 (top branch) */}
          <circle cx={125} cy={45} r={10} fill="#fdc70020" stroke="#fdc700" strokeWidth="1.5" />
          <line x1={119} y1={39} x2={131} y2={51} stroke="#fdc700" strokeWidth="1.5" />
          <line x1={131} y1={39} x2={119} y2={51} stroke="#fdc700" strokeWidth="1.5" />
          <text x={125} y={34} textAnchor="middle" fill="#fdc700" fontSize={8}>L₁</text>
          {/* Bulb 2 (bottom branch) */}
          <circle cx={125} cy={65} r={10} fill="#fdc70020" stroke="#fdc700" strokeWidth="1.5" />
          <line x1={119} y1={59} x2={131} y2={71} stroke="#fdc700" strokeWidth="1.5" />
          <line x1={131} y1={59} x2={119} y2={71} stroke="#fdc700" strokeWidth="1.5" />
          <text x={125} y={84} textAnchor="middle" fill="#fdc700" fontSize={8}>L₂</text>
          {/* Battery */}
          <line x1={8} y1={60} x2={22} y2={60} stroke="#cad5e2" strokeWidth="2.5" strokeLinecap="round" />
          <line x1={11} y1={68} x2={19} y2={68} stroke="#cad5e2" strokeWidth="1.5" />
          <text x={28} y={65} fill="#a8b8cc" fontSize={8}>6V</text>
          {/* Ammeter */}
          <AmmSym cx={245} cy={65} />
          {/* Facts */}
          <text x={130} y={102} textAnchor="middle" fill="#a8b8cc" fontSize={8}>Same voltage across each branch</text>
          <text x={130} y={114} textAnchor="middle" fill="#00bc7d" fontSize={7}>One bulb fails → others stay on</text>
        </svg>
      )}

      <p className="text-xs text-center" style={{ color: '#a8b8cc' }}>
        {isSeries ? 'Series: one loop — same current, shared voltage' : 'Parallel: multiple paths — same voltage, shared current'}
      </p>
    </div>
  )
}

function SeriesParallelIdea() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-4">
      <div className="flex items-center gap-3">
        <div className="flex flex-col items-center gap-1 p-2 rounded-[8px]" style={{ background: '#ef444412', border: '1px solid #ef4444' }}>
          <span className="text-xs font-bold" style={{ color: '#ef4444' }}>More bulbs</span>
          <span className="text-xs text-center" style={{ color: '#a8b8cc' }}>= brighter?  ✗</span>
        </div>
        <motion.span className="text-xl" animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 1 }}>→</motion.span>
        <div className="flex flex-col items-center gap-1 p-2 rounded-[8px]" style={{ background: '#1d293d' }}>
          <span className="text-xs font-bold" style={{ color: '#a8b8cc' }}>Series</span>
          <span className="text-xs text-center" style={{ color: '#ef4444' }}>dimmer ✗</span>
        </div>
      </div>
      <IdeaCaption>Adding more bulbs in series makes them all brighter as more energy is available</IdeaCaption>
    </div>
  )
}

function SeriesParallelReality() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-4">
      <div className="flex gap-3">
        <div className="flex flex-col items-center gap-1 p-2 rounded-[8px]" style={{ background: `${EC}12`, border: `1px solid ${EC}` }}>
          <span className="text-xs font-bold" style={{ color: EC }}>Series</span>
          <span className="text-xs text-center" style={{ color: '#cad5e2' }}>More bulbs →<br/>each gets less V →<br/>dimmer</span>
        </div>
        <div className="flex flex-col items-center gap-1 p-2 rounded-[8px]" style={{ background: '#00bc7d12', border: '1px solid #00bc7d' }}>
          <span className="text-xs font-bold" style={{ color: '#00bc7d' }}>Parallel</span>
          <span className="text-xs text-center" style={{ color: '#cad5e2' }}>Each branch gets<br/>full voltage →<br/>same brightness</span>
        </div>
      </div>
      <RealityBadge color={EC}>Series: adding bulbs dims them all. Parallel: each branch keeps full voltage.</RealityBadge>
    </div>
  )
}

// ─── 10. Domestic Electricity ─────────────────────────────────────────────────
function DomesticElectricityLesson() {
  const [tab, setTab] = useState('ac')

  // AC wave points
  const acPts = Array.from({ length: 100 }, (_, i) => {
    const x = 10 + i * 2.4
    const y = 60 + 30 * Math.sin((i / 100) * Math.PI * 4)
    return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`
  }).join(' ')

  return (
    <div className="w-full flex flex-col gap-2 px-3 pt-3 pb-3">
      <div className="flex gap-2 justify-center">
        {[['ac', 'AC Wave'], ['plug', 'UK Plug']].map(([val, label]) => (
          <button key={val} onClick={() => setTab(val)}
            className="px-3 py-1 rounded-[8px] text-xs font-semibold"
            style={{ background: tab === val ? `${EC}22` : '#1d293d', color: tab === val ? EC : '#a8b8cc', border: `1px solid ${tab === val ? EC : '#2d3e55'}` }}>
            {label}
          </button>
        ))}
      </div>

      {tab === 'ac' ? (
        <svg width="260" height="120" viewBox="0 0 260 120" style={{ display: 'block' }}>
          {/* Axes */}
          <line x1={10} y1={60} x2={250} y2={60} stroke="#2a3a52" strokeWidth="1.2" />
          <line x1={10} y1={10} x2={10} y2={110} stroke="#2a3a52" strokeWidth="1.2" />
          {/* AC wave */}
          <path d={acPts} fill="none" stroke={EC} strokeWidth="2.5" strokeLinecap="round" />
          {/* Peak label */}
          <line x1={70} y1={30} x2={70} y2={60} stroke="#c084fc" strokeWidth="1" strokeDasharray="2 2" />
          <text x={75} y={47} fill="#c084fc" fontSize={8}>325 V peak</text>
          {/* RMS label */}
          <line x1={10} y1={39} x2={250} y2={39} stroke="#00bc7d" strokeWidth="1" strokeDasharray="3 2" />
          <text x={200} y={36} fill="#00bc7d" fontSize={8}>230 V rms</text>
          {/* Axis labels */}
          <text x={130} y={112} textAnchor="middle" fill="#637b96" fontSize={8}>Time →</text>
          <text x={6} y={60} textAnchor="end" fill="#637b96" fontSize={7}>0V</text>
          {/* Frequency */}
          <text x={130} y={25} textAnchor="middle" fill="#a8b8cc" fontSize={8}>UK mains: 230 V (rms), 50 Hz</text>
        </svg>
      ) : (
        <svg width="260" height="130" viewBox="0 0 260 130" style={{ display: 'block' }}>
          {/* Plug outline */}
          <rect x={70} y={10} width={120} height={85} rx={12} fill="#1d293d" stroke="#4a5a72" strokeWidth="2" />
          {/* Earth pin (top, larger) */}
          <rect x={113} y={2} width={14} height={24} rx={4} fill="none" stroke="#22c55e" strokeWidth="2" />
          <text x={120} y={36} textAnchor="middle" fill="#22c55e" fontSize={8} fontWeight="bold">E</text>
          <text x={155} y={26} fill="#22c55e" fontSize={8}>Earth (green/yellow)</text>
          {/* Live pin (bottom left) */}
          <rect x={82} y={62} width={14} height={24} rx={4} fill="none" stroke="#ef4444" strokeWidth="2" />
          <text x={89} y={58} textAnchor="middle" fill="#ef4444" fontSize={8} fontWeight="bold">L</text>
          <text x={60} y={102} fill="#ef4444" fontSize={8}>Live (brown)</text>
          {/* Neutral pin (bottom right) */}
          <rect x={164} y={62} width={14} height={24} rx={4} fill="none" stroke="#155dfc" strokeWidth="2" />
          <text x={171} y={58} textAnchor="middle" fill={EC} fontSize={8} fontWeight="bold">N</text>
          <text x={168} y={102} fill={EC} fontSize={8}>Neutral (blue)</text>
          {/* Fuse label */}
          <text x={120} y={75} textAnchor="middle" fill="#fdc700" fontSize={7.5}>Fuse inside</text>
          {/* Bottom note */}
          <text x={130} y={122} textAnchor="middle" fill="#a8b8cc" fontSize={7}>Earth prevents electric shock if Live wire touches case</text>
        </svg>
      )}

      <p className="text-xs text-center" style={{ color: '#a8b8cc' }}>
        {tab === 'ac' ? 'AC alternates 50 times per second (50 Hz) — direction constantly reverses' : 'Three-pin UK plug: Live (brown), Neutral (blue), Earth (green/yellow)'}
      </p>
    </div>
  )
}

function DomesticElectricityIdea() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-4">
      <div className="flex items-center gap-2 p-2 rounded-[8px]" style={{ background: '#ef444412', border: '1px solid #ef4444' }}>
        <span className="text-xs font-bold" style={{ color: '#ef4444' }}>AC and DC are the same</span>
        <span className="text-xs" style={{ color: '#a8b8cc' }}>— just different voltages ✗</span>
      </div>
      <svg width="180" height="50" viewBox="0 0 180 50">
        <line x1={10} y1={25} x2={80} y2={25} stroke="#cad5e2" strokeWidth="2" />
        <text x={45} y={18} textAnchor="middle" fill="#cad5e2" fontSize={8}>DC (battery)</text>
        {[90,100,110,120,130,140,150,160,170].map((x, i) => {
          const y = 25 + (i < 4 ? -12 : 12) * Math.sin(i * Math.PI / 4)
          return null
        })}
        <path d="M100,25 Q110,10 120,25 Q130,40 140,25 Q150,10 160,25 Q170,40 180,25" fill="none" stroke={EC} strokeWidth="2" />
        <text x={140} y={18} textAnchor="middle" fill={EC} fontSize={8}>AC (mains)</text>
      </svg>
      <IdeaCaption>AC (mains) and DC (battery) are the same type of electricity — just different voltages</IdeaCaption>
    </div>
  )
}

function DomesticElectricityReality() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-4">
      <div className="flex gap-3">
        <div className="flex flex-col items-center gap-1 p-2 rounded-[8px]" style={{ background: `${EC}12`, border: `1px solid ${EC}` }}>
          <span className="text-xs font-bold" style={{ color: EC }}>AC (mains)</span>
          <span className="text-xs text-center" style={{ color: '#cad5e2' }}>Direction reverses<br/>230V / 50Hz<br/>Power stations</span>
        </div>
        <div className="flex flex-col items-center gap-1 p-2 rounded-[8px]" style={{ background: '#fdc70012', border: '1px solid #fdc700' }}>
          <span className="text-xs font-bold" style={{ color: '#fdc700' }}>DC (battery)</span>
          <span className="text-xs text-center" style={{ color: '#cad5e2' }}>One direction only<br/>1.5V – 12V<br/>Chemical cells</span>
        </div>
      </div>
      <RealityBadge color={EC}>AC constantly reverses direction. DC flows one way. They behave very differently.</RealityBadge>
    </div>
  )
}

// ─── 11. Electrical Power ─────────────────────────────────────────────────────
function ElectricalPowerLesson() {
  const [voltage, setVoltage] = useState(12)
  const [current, setCurrent] = useState(2)
  const power = (voltage * current).toFixed(0)
  const resistance = (voltage / current).toFixed(1)

  return (
    <div className="w-full flex flex-col justify-center gap-2 px-3 py-2">
      <div className="flex gap-2 justify-center">
        <FormulaBox formula="P = IV" color={EC} />
        <FormulaBox formula="P = I²R" color="#f97316" />
      </div>
      <div className="rounded-[12px] p-2.5" style={{ background: `${EC}10`, border: `1px solid ${EC}30` }}>
        <div className="flex justify-between text-xs mb-0.5">
          <span style={{ color: '#a8b8cc' }}>Voltage V</span>
          <span style={{ color: EC, fontWeight: 700 }}>{voltage} V</span>
        </div>
        <input type="range" min="1" max="24" value={voltage}
          onChange={e => setVoltage(+e.target.value)} className="w-full mb-1.5" style={{ accentColor: EC }} />
        <div className="flex justify-between text-xs mb-0.5">
          <span style={{ color: '#a8b8cc' }}>Current I</span>
          <span style={{ color: '#f97316', fontWeight: 700 }}>{current} A</span>
        </div>
        <input type="range" min="0.5" max="10" step="0.5" value={current}
          onChange={e => setCurrent(+e.target.value)} className="w-full" style={{ accentColor: '#f97316' }} />
        <div className="flex justify-between mt-2 pt-1.5 text-sm font-bold" style={{ borderTop: '1px solid #1d293d' }}>
          <span style={{ color: '#a8b8cc' }}>P = {voltage} × {current} =</span>
          <motion.span key={power} style={{ color: EC }} initial={{ scale: 0.85 }} animate={{ scale: 1 }}>{power} W</motion.span>
        </div>
        <div className="flex justify-between text-xs mt-1" style={{ color: '#637b96' }}>
          <span>R = V/I = {resistance} Ω</span>
          <span>Energy/s = {power} J/s</span>
        </div>
      </div>
    </div>
  )
}

function ElectricalPowerIdea() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-4">
      <div className="flex items-center gap-3">
        <div className="flex flex-col items-center gap-1 p-2 rounded-[8px]" style={{ background: '#ef444412', border: '1px solid #ef4444' }}>
          <span className="text-xs font-bold" style={{ color: '#ef4444' }}>100 W bulb</span>
          <span className="text-xs text-center" style={{ color: '#a8b8cc' }}>uses 100 J<br/>per hour? ✗</span>
        </div>
      </div>
      <IdeaCaption>A 100 W appliance uses 100 joules of energy per hour — not per second</IdeaCaption>
    </div>
  )
}

function ElectricalPowerReality() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-4">
      <div className="text-xs text-center p-2 rounded-[10px]" style={{ background: `${EC}12`, border: `1px solid ${EC}30`, color: '#cad5e2' }}>
        Power is energy transferred <strong style={{ color: EC }}>per second</strong>.<br />
        100 W = 100 J every second.<br />
        In 1 hour: 100 × 3600 = 360 000 J
      </div>
      <RealityBadge color={EC}>1 Watt = 1 Joule per second. Power measures the rate of energy transfer.</RealityBadge>
    </div>
  )
}

// ─── 12. Static Electricity ───────────────────────────────────────────────────
function StaticElectricityLesson() {
  const [charged, setCharged] = useState(false)

  return (
    <div className="w-full flex flex-col items-center gap-2 px-3 pt-3 pb-3">
      <button onClick={() => setCharged(v => !v)}
        className="px-4 py-1.5 rounded-[8px] text-xs font-semibold"
        style={{ background: charged ? '#fdc70022' : '#1d293d', color: charged ? '#fdc700' : '#a8b8cc', border: `1px solid ${charged ? '#fdc700' : '#2d3e55'}` }}>
        {charged ? '⚡ Charged by friction' : 'Rub balloon →'}
      </button>

      <svg width="260" height="130" viewBox="0 0 260 130" style={{ display: 'block' }}>
        {/* Balloon 1 (left) */}
        <ellipse cx={80} cy={60} rx={30} ry={38}
          fill={charged ? '#6366f130' : '#1d293d'}
          stroke={charged ? '#6366f1' : '#4a5a72'} strokeWidth="1.5" />
        <line x1={80} y1={98} x2={80} y2={110} stroke="#4a5a72" strokeWidth="1.5" />
        {/* Balloon 2 (right) */}
        <ellipse cx={180} cy={60} rx={30} ry={38}
          fill={charged ? '#6366f130' : '#1d293d'}
          stroke={charged ? '#6366f1' : '#4a5a72'} strokeWidth="1.5" />
        <line x1={180} y1={98} x2={180} y2={110} stroke="#4a5a72" strokeWidth="1.5" />
        {/* Charge symbols on balloons */}
        {charged && (
          <>
            {[-12, -4, 4, 12].map((dx, i) => (
              <text key={i} x={80 + dx} y={50 + (i % 2) * 18} textAnchor="middle"
                fill="#6366f1" fontSize={10} fontWeight="bold">−</text>
            ))}
            {[-12, -4, 4, 12].map((dx, i) => (
              <text key={i} x={180 + dx} y={50 + (i % 2) * 18} textAnchor="middle"
                fill="#6366f1" fontSize={10} fontWeight="bold">−</text>
            ))}
          </>
        )}
        {/* Repulsion arrows */}
        {charged && (
          <>
            <motion.line x1={110} y1={60} x2={130} y2={60} stroke="#ef4444" strokeWidth="2"
              animate={{ x1: [110, 106, 110], x2: [130, 134, 130] }}
              transition={{ repeat: Infinity, duration: 1.2 }} />
            <polygon points="106,56 100,60 106,64" fill="#ef4444" />
            <polygon points="134,56 140,60 134,64" fill="#ef4444" />
            <text x={120} y={52} textAnchor="middle" fill="#ef4444" fontSize={8}>REPEL</text>
          </>
        )}
        {/* Labels */}
        <text x={80} y={122} textAnchor="middle" fill="#a8b8cc" fontSize={7}>Balloon A</text>
        <text x={180} y={122} textAnchor="middle" fill="#a8b8cc" fontSize={7}>Balloon B</text>
        {charged && <text x={120} y={115} textAnchor="middle" fill="#6366f1" fontSize={8}>Same charge → repulsion force</text>}
      </svg>

      <div className="flex gap-3 text-xs text-center" style={{ color: '#a8b8cc' }}>
        <span>Like charges: <span style={{ color: '#ef4444' }}>repel</span></span>
        <span>Unlike charges: <span style={{ color: '#00bc7d' }}>attract</span></span>
      </div>
    </div>
  )
}

function StaticElectricityIdea() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-4">
      <div className="flex items-center gap-2 p-2 rounded-[8px]" style={{ background: '#ef444412', border: '1px solid #ef4444' }}>
        <span className="text-xs font-bold" style={{ color: '#ef4444' }}>Rubbing creates charge from nothing ✗</span>
      </div>
      <div className="text-xs text-center p-2 rounded-[8px]" style={{ background: '#1d293d', color: '#a8b8cc' }}>
        balloon + jumper<br />
        <motion.span animate={{ x: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1 }} style={{ display: 'inline-block' }}>→</motion.span>
        <span style={{ color: '#ef4444' }}> charge appears?</span>
      </div>
      <IdeaCaption>Friction creates electric charge from nothing — new charge is generated by rubbing</IdeaCaption>
    </div>
  )
}

function StaticElectricityReality() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-4">
      <div className="flex gap-2 items-center text-xs text-center">
        <div className="p-2 rounded-[8px]" style={{ background: '#6366f112', border: '1px solid #6366f1', color: '#cad5e2' }}>
          Jumper<br /><span style={{ color: '#6366f1' }}>loses e⁻</span><br />→ +ve charged
        </div>
        <span style={{ color: '#a8b8cc', fontSize: 16 }}>⇌</span>
        <div className="p-2 rounded-[8px]" style={{ background: '#6366f112', border: '1px solid #6366f1', color: '#cad5e2' }}>
          Balloon<br /><span style={{ color: '#6366f1' }}>gains e⁻</span><br />→ −ve charged
        </div>
      </div>
      <RealityBadge color="#6366f1">Charge is transferred (not created). Electrons move from one material to the other.</RealityBadge>
    </div>
  )
}

// ─── Exports ──────────────────────────────────────────────────────────────────
export const ELECTRICITY_TOPICS = {
  circuit_basics: {
    id: 'circuit_basics', module: 'Electricity', moduleColor: EC, course: 'combined',
    title: 'Circuit Basics',
    subtitle: 'Current, Voltage and Complete Circuits',
    description: 'An electric circuit is a closed loop through which current can flow. Current (I) is the rate of flow of charge, measured in amperes (A). Voltage (V) is the energy transferred per unit charge, measured in volts (V). A circuit must be complete for current to flow — any break stops it.',
    lessonVisual: CircuitBasicsLesson, ideaVisual: CircuitBasicsIdea, realityVisual: CircuitBasicsReality,
    question: 'What happens when a switch is opened in a series circuit?',
    questionSubtitle: 'Think about what a switch physically does to the circuit',
    options: ['Current doubles', 'Current flows backwards', 'Current stops flowing in the whole circuit', 'Only the bulb nearest the switch goes off'],
    correctAnswer: 2,
    keywords: ['circuit', 'switch', 'open circuit', 'current', 'complete loop', 'conventional current', 'electrons', 'amperes'],
    sentenceStarters: ['Opening a switch creates a gap in the circuit, so...', 'Current can only flow when the circuit is...', 'A switch controls current by...', 'When the circuit is broken...', 'In a series circuit, all components share...'],
    modelAnswers: [
      'Opening a switch creates a gap in the circuit, so **current stops flowing throughout the whole circuit**.',
      'Current can only flow when the circuit is **complete — any break stops current everywhere in series**.',
      'A switch controls current by **physically creating or closing a gap in the conducting path**.',
      'When the circuit is broken, **no charge can flow because there is no complete path back to the power supply**.',
      'In a series circuit, all components share **the same single path — breaking it at any point stops all current**.',
    ],
    misconception: 'Opening a switch does not just stop current near the switch — it stops current in the entire series circuit.',
    concept: 'Current flows only in a complete circuit. A switch creates or removes a gap in the circuit. In series, opening the switch breaks the only path available, stopping current everywhere.',
  },

  circuit_components: {
    id: 'circuit_components', module: 'Electricity', moduleColor: EC, course: 'combined',
    title: 'Circuit Symbols & Components',
    subtitle: 'Standard Symbols and How to Use Them',
    description: 'Standard circuit symbols allow engineers and scientists worldwide to draw circuits unambiguously. Key rules: an ammeter (low resistance) is connected in series to measure current. A voltmeter (very high resistance) is connected in parallel to measure voltage. An LDR\'s resistance decreases in light. A thermistor\'s resistance decreases with temperature.',
    lessonVisual: CircuitComponentsLesson, ideaVisual: CircuitComponentsIdea, realityVisual: CircuitComponentsReality,
    question: 'How should an ammeter be connected in a circuit?',
    questionSubtitle: 'An ammeter measures current — think about where current passes through',
    options: ['In parallel with the component', 'In series with the component', 'Directly across the power supply', 'It does not matter — it works either way'],
    correctAnswer: 1,
    keywords: ['ammeter', 'series', 'voltmeter', 'parallel', 'circuit symbol', 'LDR', 'thermistor', 'resistance', 'in series', 'in parallel'],
    sentenceStarters: ['An ammeter must be in series because...', 'If an ammeter were in parallel...', 'A voltmeter is in parallel because it measures...', 'The ammeter has very low resistance so that...', 'The symbol for an ammeter is...'],
    modelAnswers: [
      'An ammeter must be in series because **all the current in the circuit must flow through it to be measured**.',
      'If an ammeter were in parallel, **it would short-circuit the component — its very low resistance would divert almost all current away**.',
      'A voltmeter is in parallel because it measures **the potential difference (voltage) across a component**.',
      'The ammeter has very low resistance so that **it does not significantly change the current it is measuring**.',
      'The symbol for an ammeter is **a circle with the letter A inside**.',
    ],
    misconception: 'An ammeter placed in parallel will short-circuit the component — it must always be in series.',
    concept: 'Ammeters must be in series (to measure current flow). Voltmeters must be in parallel (to measure voltage across). An ammeter has near-zero resistance; a voltmeter has near-infinite resistance — this minimises their effect on the circuit.',
  },

  series_parallel: {
    id: 'series_parallel', module: 'Electricity', moduleColor: EC, course: 'combined',
    title: 'Series & Parallel Circuits',
    subtitle: 'How Current and Voltage Behave in Each',
    description: 'Series circuits have one current path — current is the same everywhere, and voltages add up. Parallel circuits have multiple paths — voltage is the same across each branch, and currents add up at junctions. Most household wiring uses parallel circuits so each appliance receives full mains voltage and can be switched independently.',
    lessonVisual: SeriesParallelLesson, ideaVisual: SeriesParallelIdea, realityVisual: SeriesParallelReality,
    question: 'Two bulbs are connected in parallel to a 6V battery. What voltage does each bulb receive?',
    questionSubtitle: 'In parallel, each branch connects directly across the supply',
    options: ['3 V each', '6 V each', '12 V total', '1.5 V each'],
    correctAnswer: 1,
    keywords: ['parallel circuit', 'series circuit', 'voltage', 'current', 'junction', 'branches', 'same voltage', 'total current', 'household wiring'],
    sentenceStarters: ['In a parallel circuit, each branch receives...', 'The voltage across each branch in parallel equals...', 'In series, the voltages across components...', 'At a junction in a parallel circuit, the current...', 'Parallel circuits are used in homes because...'],
    modelAnswers: [
      'In a parallel circuit, each branch receives **the full supply voltage — so each bulb gets 6 V**.',
      'The voltage across each branch in parallel equals **the supply voltage (6 V) because both ends of each branch connect directly to the battery terminals**.',
      'In series, the voltages across components **add up to the supply voltage, so each would only get 3 V — making them dimmer**.',
      'At a junction in a parallel circuit, the current **splits — some goes each way, recombining at the other junction**.',
      'Parallel circuits are used in homes because **each appliance gets the full 230 V and can be switched on or off independently**.',
    ],
    misconception: 'In parallel circuits, voltage is not shared between branches — each branch receives the full supply voltage.',
    concept: 'Parallel: each branch gets the full 6 V. Series: voltage is shared (3 V each). This is why homes are wired in parallel — every socket gets 230 V regardless of what else is plugged in.',
  },

  domestic_electricity: {
    id: 'domestic_electricity', module: 'Electricity', moduleColor: EC, course: 'combined',
    title: 'Domestic Electricity',
    subtitle: 'AC, Mains Voltage, Plugs & Safety',
    description: 'UK mains electricity is alternating current (AC) at 230 V and 50 Hz. AC reverses direction 50 times per second. A three-pin plug has: Live (brown, 230 V), Neutral (blue, 0 V), Earth (green/yellow, safety). The fuse in a plug melts if current is too high, breaking the circuit and preventing fire or electrocution.',
    lessonVisual: DomesticElectricityLesson, ideaVisual: DomesticElectricityIdea, realityVisual: DomesticElectricityReality,
    question: 'What is the frequency of UK mains electricity?',
    questionSubtitle: 'Frequency = number of complete cycles per second',
    options: ['230 Hz', '12 Hz', '50 Hz', '100 Hz'],
    correctAnswer: 2,
    keywords: ['alternating current', 'AC', 'DC', 'mains voltage', '230V', '50Hz', 'live wire', 'neutral wire', 'earth wire', 'fuse', 'frequency'],
    sentenceStarters: ['UK mains electricity has a frequency of...', 'AC (alternating current) differs from DC because...', 'The live wire is dangerous because...', 'The earth wire protects you by...', 'The fuse melts when...'],
    modelAnswers: [
      'UK mains electricity has a frequency of **50 Hz — it completes 50 full cycles every second**.',
      'AC (alternating current) differs from DC because **it constantly reverses direction, whereas DC flows in only one direction**.',
      'The live wire is dangerous because **it is at 230 V — contact allows current to flow through the body to earth**.',
      'The earth wire protects you by **providing a low-resistance path for current if the casing becomes live, tripping the fuse**.',
      'The fuse melts when **current exceeds the rated value, breaking the circuit and preventing fire**.',
    ],
    misconception: 'The neutral wire is not safe to touch — it can carry dangerous current even though its voltage is near zero.',
    concept: 'UK mains: 230 V AC at 50 Hz. The live wire (brown) alternates between +325 V and −325 V (230 V rms). The earth wire + fuse form the safety system: if a fault occurs, current spikes and blows the fuse.',
  },

  electrical_power: {
    id: 'electrical_power', module: 'Electricity', moduleColor: EC, course: 'combined',
    title: 'Electrical Power',
    subtitle: 'P = IV, P = I²R and Energy Transfer',
    description: 'Power (P) is the rate of energy transfer in watts (W). P = IV (power = current × voltage). P = I²R (useful when voltage is unknown). Energy transferred: E = Pt (joules = watts × seconds). A 60 W bulb transfers 60 J every second. Doubling the current quadruples the power (P = I²R).',
    lessonVisual: ElectricalPowerLesson, ideaVisual: ElectricalPowerIdea, realityVisual: ElectricalPowerReality,
    question: 'A current of 3 A flows through a 12 V supply. What is the power?',
    questionSubtitle: 'Use P = I × V',
    options: ['4 W', '15 W', '36 W', '9 W'],
    correctAnswer: 2,
    keywords: ['electrical power', 'P = IV', 'watts', 'current', 'voltage', 'P = I²R', 'energy per second', 'rate', 'joules'],
    sentenceStarters: ['Using P = IV, I substitute...', 'P = 3 × 12 = ...', 'Power is measured in watts, where 1 W = ...', 'If current doubles, power...', 'The energy transferred in 60 seconds is...'],
    modelAnswers: [
      'Using P = IV, I substitute **I = 3 A and V = 12 V to get P = 3 × 12 = 36 W**.',
      'P = 3 × 12 = **36 W**.',
      'Power is measured in watts, where **1 W = 1 J/s — the device transfers 36 joules every second**.',
      'If current doubles, power **quadruples because P = I²R — doubling I makes I² four times bigger**.',
      'The energy transferred in 60 seconds is **E = Pt = 36 × 60 = 2160 J**.',
    ],
    misconception: 'Power depends on both current AND voltage together — a high voltage with tiny current can mean low power.',
    concept: 'P = IV = 3 × 12 = 36 W. This device transfers 36 J every second. P = I²R shows that power increases with the square of current — doubling current quadruples power dissipated in a resistor.',
  },

  static_electricity: {
    id: 'static_electricity', module: 'Electricity', moduleColor: EC, course: 'physics-only',
    title: 'Static Electricity',
    subtitle: 'Charging by Friction, Electric Fields & Discharge',
    description: 'Static electricity is caused by the transfer of electrons between materials when rubbed together. The material that gains electrons becomes negatively charged; the one that loses electrons becomes positively charged. Like charges repel; unlike charges attract. Large charge builds up on storm clouds — lightning is rapid discharge.',
    lessonVisual: StaticElectricityLesson, ideaVisual: StaticElectricityIdea, realityVisual: StaticElectricityReality,
    question: 'A plastic rod is rubbed with a cloth. The rod becomes negatively charged. What has happened?',
    questionSubtitle: 'Think about which particles move when materials are rubbed together',
    options: ['Protons moved from cloth to rod', 'Electrons moved from cloth to rod', 'New electrons were created by friction', 'Neutrons transferred between materials'],
    correctAnswer: 1,
    keywords: ['static electricity', 'electrons', 'friction', 'negative charge', 'positive charge', 'transfer', 'repel', 'attract', 'insulator', 'discharge'],
    sentenceStarters: ['The rod is negatively charged because it has...', 'Electrons transferred from the cloth to the rod, so...', 'Charge is not created — it is...', 'Like charges repel means that two negative objects will...', 'The cloth must be positively charged because...'],
    modelAnswers: [
      'The rod is negatively charged because it has **gained extra electrons from the cloth**.',
      'Electrons transferred from the cloth to the rod, so **the rod has more electrons (negative) and the cloth has fewer (positive)**.',
      'Charge is not created — it is **transferred: total charge before = total charge after (conservation of charge)**.',
      'Like charges repel means that two negative objects will **push each other apart with an electrostatic force**.',
      'The cloth must be positively charged because **it lost electrons to the rod — it now has more protons than electrons**.',
    ],
    misconception: 'Friction does not create charge — it only transfers electrons from one material to the other.',
    concept: 'Electrons move from cloth to rod during rubbing. The rod gains electrons → negative. Cloth loses electrons → positive. Total charge is always conserved. Only electrons can transfer — protons stay fixed in nuclei.',
  },
}
