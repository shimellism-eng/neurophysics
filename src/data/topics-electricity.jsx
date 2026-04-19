import { motion, AnimatePresence } from 'motion/react'
import { useState, useEffect } from 'react'
import { IdeaCaption, RealityBadge, FormulaBox, MisconceptionCard, RealWorldCard, SimSlider, SimNarration } from './visuals-helpers'
import { useSimAudio } from '../utils/simAudio'

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

      <svg width="260" height="120" viewBox="0 0 260 120" style={{ display: 'block' }} role="img" aria-label="Simple circuit diagram with switch, battery and bulb">
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
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 px-4 py-3">
      <MisconceptionCard
        wrong="Conventional current flows from − to + (the same direction electrons actually move)."
        right="Conventional current flows from + to −. Electrons move the opposite way: − to +. The convention was set before electrons were discovered."
        wrongLabel="Historical confusion"
        rightLabel="The convention"
      />
    </div>
  )
}

function CircuitBasicsReality() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 px-4 py-3">
      <RealWorldCard icon="🔬" title="Electron discovery — too late" desc="Benjamin Franklin defined conventional current in 1752. Electrons were discovered in 1897 — the convention was already universal and impossible to reverse." color="#155dfc" delay={0} />
      <RealWorldCard icon="⚡" title="Oscilloscopes & CRT screens" desc="In cathode ray tubes, electrons fired from − to + create the beam. Engineers use electron flow direction; physicists use conventional current." color="#fdc700" delay={0.1} />
      <RealWorldCard icon="🏥" title="ECG heart monitors" desc="ECG machines measure the tiny currents from the heart. Doctors use conventional current (+ to −) consistently across all medical devices." color="#10b981" delay={0.2} />
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
    // LDR — oval enclosure with resistor inside + diagonal arrows into it
    () => (
      <g>
        <line x1={-18} y1={0} x2={18} y2={0} stroke="#cad5e2" strokeWidth="1.5" />
        {/* Oval enclosure */}
        <ellipse cx={0} cy={0} rx={16} ry={11} fill="none" stroke="#a855f7" strokeWidth="1.5" />
        {/* Resistor rectangle inside oval */}
        <rect x={-10} y={-4} width={20} height={8} fill="none" stroke="#a855f7" strokeWidth="1.2" />
        {/* Diagonal arrows pointing into component (incoming light) */}
        <line x1={-14} y1={-20} x2={-7} y2={-12} stroke="#fdc700" strokeWidth="1.2" strokeLinecap="round" />
        <polygon points="-7,-12 -14,-14 -11,-7" fill="#fdc700" />
        <line x1={-6} y1={-20} x2={1} y2={-12} stroke="#fdc700" strokeWidth="1.2" strokeLinecap="round" />
        <polygon points="1,-12 -6,-14 -3,-7" fill="#fdc700" />
      </g>
    ),
    // Thermistor — rectangle with diagonal line (IEC standard)
    () => (
      <g>
        <line x1={-14} y1={0} x2={14} y2={0} stroke="#cad5e2" strokeWidth="1.5" />
        <rect x={-10} y={-5} width={20} height={10} fill="none" stroke="#ef4444" strokeWidth="1.5" />
        {/* Diagonal line through rectangle: bottom-left to top-right */}
        <line x1={-10} y1={5} x2={10} y2={-5} stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" />
      </g>
    ),
  ]

  const cols = 4
  const s = sel !== null ? symbols[sel] : null

  return (
    <div className="w-full flex flex-col gap-2 px-3 pt-3 pb-3">
      <svg width="280" height="92" viewBox="0 0 280 92" style={{ display: 'block', width: '100%' }} role="img" aria-label="Grid of circuit component symbols including resistor, LED, diode, LDR and thermistor">
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
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 px-4 py-3">
      <MisconceptionCard
        wrong="An ammeter in parallel works fine — it just measures current from both sides of the circuit."
        right="An ammeter in parallel creates a short circuit (near-zero resistance path). Current bypasses the component and may destroy the ammeter or power source."
        wrongLabel="Dangerous mistake"
        rightLabel="Why placement matters"
      />
    </div>
  )
}

function CircuitComponentsReality() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 px-4 py-3">
      <RealWorldCard icon="🔌" title="Fuse — series protection" desc="A fuse must be in series so all current flows through it. If current exceeds rating, the fuse melts and breaks the circuit, preventing fires." color="#ef4444" delay={0} />
      <RealWorldCard icon="🌡️" title="Thermistor — sensor circuits" desc="NTC thermistors drop in resistance as temperature rises. Used in series with a fixed resistor as a voltage divider to detect temperature changes." color="#f59e0b" delay={0.1} />
      <RealWorldCard icon="💡" title="LDR — light-sensitive switch" desc="A light-dependent resistor has high resistance in the dark. Paired with a relay in series, it can automatically switch street lights on at dusk." color="#10b981" delay={0.2} />
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
        <svg width="260" height="120" viewBox="0 0 260 120" style={{ display: 'block' }} role="img" aria-label="Series circuit diagram with two bulbs connected in a single loop">
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
        <svg width="260" height="130" viewBox="0 0 260 130" style={{ display: 'block' }} role="img" aria-label="Parallel circuit diagram with two bulbs connected in separate branches">
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
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 px-4 py-3">
      <MisconceptionCard
        wrong="Adding more bulbs in series makes them all brighter — more components means more energy available."
        right="In series, the supply voltage is shared between all components. Each extra bulb gets a smaller share of the voltage, making all of them dimmer."
        wrongLabel="Intuition error"
        rightLabel="Voltage sharing"
      />
    </div>
  )
}

function SeriesParallelReality() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 px-4 py-3">
      <RealWorldCard icon="🎄" title="Old Christmas lights" desc="Old fairy lights wired in series — one bulb fails and the whole chain goes dark. Every modern string uses parallel wiring so each bulb gets full voltage." color="#ef4444" delay={0} />
      <RealWorldCard icon="🏠" title="Home ring main" desc="Every socket in a house is wired in parallel. Plugging in an extra device doesn't affect voltage at other sockets — each gets the full 230 V." color="#155dfc" delay={0.1} />
      <RealWorldCard icon="🔦" title="Series battery packs" desc="Batteries in series add voltages. Two 1.5 V cells in series give 3 V — used in torches, TV remotes, and older power tools." color="#fdc700" delay={0.2} />
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
        <svg width="260" height="120" viewBox="0 0 260 120" style={{ display: 'block' }} role="img" aria-label="AC voltage waveform showing sinusoidal oscillation at 50 Hz">
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
        <svg width="260" height="130" viewBox="0 0 260 130" style={{ display: 'block' }} role="img" aria-label="UK mains plug diagram showing live, neutral and earth pins with colour coding">
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
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 px-4 py-3">
      <MisconceptionCard
        wrong="AC mains and DC battery are the same — just different voltages. Either would work to power appliances."
        right="AC constantly reverses direction (50 times/s in the UK). DC flows one way only. Transformers only work with AC — that's why the National Grid uses AC, not DC."
        wrongLabel="Not just voltage"
        rightLabel="Fundamentally different"
      />
    </div>
  )
}

function DomesticElectricityReality() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 px-4 py-3">
      <RealWorldCard icon="🔌" title="Plug wiring — why 3 pins" desc="Live (brown): 230V AC. Neutral (blue): return path. Earth (green/yellow): safety — connects metal casing to ground so a fault blows the fuse, not you." color="#155dfc" delay={0} />
      <RealWorldCard icon="📱" title="Chargers — AC to DC conversion" desc="Your phone charger contains a transformer + rectifier that converts 230V AC → 5V DC. The IC inside needs steady DC, not oscillating AC." color="#fdc700" delay={0.1} />
      <RealWorldCard icon="🚗" title="EV charging" desc="Electric cars store energy in DC batteries. Rapid chargers convert grid AC to DC externally; slow 'type 2' chargers let the car's onboard converter do it." color="#10b981" delay={0.2} />
    </div>
  )
}

// ─── 11. Electrical Power ─────────────────────────────────────────────────────
function ElectricalPowerLesson() {
  const [voltage, setVoltage] = useState(12)
  const [current, setCurrent] = useState(2)
  const [sonOn, setSonOn] = useState(false)
  const power = (voltage * current).toFixed(0)
  const resistance = (voltage / current).toFixed(1)
  const { startTone, setFreq, stopTone } = useSimAudio()

  // Hum pitch ∝ current (sine, 110–550 Hz: 0.5A→110Hz, 10A→550Hz)
  useEffect(() => {
    if (sonOn) startTone(current * 55, 'sine', 0.10)
    else stopTone()
  }, [sonOn])

  useEffect(() => {
    if (sonOn) setFreq(current * 55)
  }, [current, sonOn])

  return (
    <div className="w-full flex flex-col justify-center gap-2 px-3 py-2">
      <div className="flex gap-2 justify-center">
        <FormulaBox formula="P = IV" color={EC} />
        <FormulaBox formula="P = I²R" color="#f97316" />
      </div>
      <div className="rounded-[12px] p-2.5" style={{ background: `${EC}10`, border: `1px solid ${EC}30` }}>
        <div className="flex justify-end mb-1">
          <button type="button" onClick={() => setSonOn(o => !o)}
            aria-label={sonOn ? 'Stop sonification' : 'Play sonification — pitch maps to current'}
            title={sonOn ? 'Stop sound' : 'Hear current as pitch'}
            style={{ fontSize: 16, background: 'none', border: 'none', cursor: 'pointer', opacity: sonOn ? 1 : 0.4, padding: 2 }}>
            🔊
          </button>
        </div>
        <SimSlider label="Voltage" min={1} max={24} value={voltage} onChange={setVoltage} unit="V" color={EC} />
        <SimSlider label="Current" min={0.5} max={10} step={0.5} value={current} onChange={setCurrent} unit="A" color="#f97316" />
        <div className="flex justify-between mt-2 pt-1.5 text-sm font-bold" style={{ borderTop: '1px solid #1d293d' }}>
          <span style={{ color: '#a8b8cc' }}>P = {voltage} × {current} =</span>
          <motion.span key={power} style={{ color: EC }} initial={{ scale: 0.85 }} animate={{ scale: 1 }}>{power} W</motion.span>
        </div>
        <div className="flex justify-between text-xs mt-1" style={{ color: '#637b96' }}>
          <span>R = V/I = {resistance} Ω</span>
          <span>Energy/s = {power} J/s</span>
        </div>
      </div>
      <SimNarration text={`Power = ${current} A × ${voltage} V = ${power} W transferred per second. Resistance = ${resistance} Ω.${Number(power) > 1000 ? ' High power — significant energy transfer.' : ' Moderate power draw.'}`} />
    </div>
  )
}

function ElectricalPowerIdea() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 px-4 py-3">
      <MisconceptionCard
        wrong="A 100 W appliance uses 100 joules of energy per hour — it's a small device so it can't use much."
        right="Watts means joules per second. A 100 W bulb uses 100 J every second — in one hour that's 360 000 J (0.1 kWh)."
        wrongLabel="Unit confusion"
        rightLabel="Joules per second"
      />
    </div>
  )
}

function ElectricalPowerReality() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 px-4 py-3">
      <RealWorldCard icon="🍵" title="Electric kettle — 2 kW" desc="Boils 1 litre in ~2 min. Uses 2000 J/s × 120 s = 240 000 J. At UK electricity prices (~30p/kWh) that's about 2p per boil." color="#f97316" delay={0} />
      <RealWorldCard icon="🖥️" title="Gaming PC — 500 W" desc="P = IV, so at 230V the current drawn is ~2.2 A. Run for 4 hours: 500 × 14 400 = 7 200 000 J = 2 kWh ≈ 60p of electricity." color="#155dfc" delay={0.1} />
      <RealWorldCard icon="💨" title="Wind turbine — 2 MW" desc="A large offshore turbine generates 2 000 000 W — 20 000 times an LED bulb. P = I²R losses mean cables must carry current efficiently." color="#10b981" delay={0.2} />
    </div>
  )
}

// ─── 11b. National Grid ───────────────────────────────────────────────────────
function NationalGridLesson() {
  const [selected, setSelected] = useState(null)

  const stages = [
    { id: 'station',   label: 'Power Station',        voltage: '~25 kV',   desc: 'Generates electricity by burning fuel or using renewables. Output voltage ~25 kV AC.' },
    { id: 'stepup',    label: 'Step-up Transformer',  voltage: '400 kV',   desc: 'Increases voltage from ~25 kV to 400 kV. This reduces current, minimising energy loss in cables.' },
    { id: 'cables',    label: 'Transmission Cables',  voltage: '400 kV',   desc: 'High-voltage cables carry electricity across the country. High V = low I = less heat wasted (P = I²R).' },
    { id: 'stepdown',  label: 'Step-down Transformer', voltage: '33 kV → 230 V', desc: 'Reduces voltage in stages back to 230 V for safe use in homes and businesses.' },
    { id: 'home',      label: 'Home / Business',       voltage: '230 V',    desc: 'Consumers receive 230 V AC — safe for appliances. Mains frequency is 50 Hz.' },
  ]

  const sel = stages.find(s => s.id === selected)

  return (
    <div className="w-full flex flex-col items-center gap-2 px-2 pt-3 pb-2">
      {/* Flow diagram */}
      <svg width="280" height="72" viewBox="0 0 280 72" style={{ display: 'block', overflow: 'visible' }} role="img" aria-label="National Grid flow diagram from power station through step-up transformer, transmission cables, step-down transformer to homes">
        {/* Connecting arrows */}
        {[56, 112, 168, 224].map((x, i) => (
          <g key={i}>
            <line x1={x} y1={36} x2={x + 12} y2={36} stroke="#2d3e55" strokeWidth="1.5" />
            <polygon points={`${x + 12},32 ${x + 20},36 ${x + 12},40`} fill="#2d3e55" />
          </g>
        ))}
        {/* Stage boxes */}
        {stages.map((stage, i) => {
          const x = i * 56 + 2
          const isSelected = selected === stage.id
          return (
            <g key={stage.id} style={{ cursor: 'pointer' }} onClick={() => setSelected(selected === stage.id ? null : stage.id)}>
              <rect x={x} y={16} width={50} height={40} rx={5}
                fill={isSelected ? `${EC}22` : '#0b1121'}
                stroke={isSelected ? EC : '#2d3e55'}
                strokeWidth={isSelected ? 1.5 : 1} />
              <text x={x + 25} y={31} textAnchor="middle" fontSize={6} fontWeight="bold" fill={isSelected ? EC : '#a8b8cc'}>
                {stage.label.split(' ').slice(0, 2).join(' ')}
              </text>
              <text x={x + 25} y={41} textAnchor="middle" fontSize={5.5} fill={isSelected ? EC : '#637b96'}>
                {stage.voltage.split(' ')[0]}
              </text>
              <text x={x + 25} y={50} textAnchor="middle" fontSize={5} fill={isSelected ? `${EC}cc` : '#4a5a72'}>
                {stage.voltage.includes('→') ? '→ 230 V' : ''}
              </text>
            </g>
          )
        })}
      </svg>

      {/* Info panel */}
      <div className="w-full rounded-[10px] px-3 py-2 min-h-[52px]"
        style={{ background: sel ? `${EC}12` : '#0b1121', border: `1px solid ${sel ? EC + '50' : '#1d293d'}` }}>
        {sel ? (
          <>
            <p className="text-xs font-bold mb-0.5" style={{ color: EC }}>{sel.label} — {sel.voltage}</p>
            <p className="text-xs leading-relaxed" style={{ color: '#cad5e2' }}>{sel.desc}</p>
          </>
        ) : (
          <p className="text-xs text-center" style={{ color: '#637b96' }}>Tap a stage to learn what it does</p>
        )}
      </div>

      <p className="text-xs text-center" style={{ color: '#637b96' }}>
        Power station → step-up → cables → step-down → home
      </p>
    </div>
  )
}

function NationalGridIdea() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 px-4 py-3">
      <MisconceptionCard
        wrong="The National Grid transmits electricity at high current to deliver more power to homes quickly."
        right="High current wastes energy in cables (P_loss = I²R). High voltage with low current delivers the same power with far less loss — that's why transformers are essential."
        wrongLabel="Current confusion"
        rightLabel="Why high voltage wins"
      />
    </div>
  )
}

function NationalGridReality() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 px-4 py-3">
      <RealWorldCard icon="🗼" title="UK transmission — 400 000 V" desc="The UK National Grid transmits at 275 kV–400 kV. At this voltage, the current in cables is tiny, so I²R heating losses are less than 2% of generated power." color="#155dfc" delay={0} />
      <RealWorldCard icon="🏘️" title="Step-down to your home" desc="Grid voltage is stepped down in stages: 400 kV → 132 kV → 33 kV → 11 kV → 230 V at your street transformer. Each step serves a different part of the network." color="#10b981" delay={0.1} />
      <RealWorldCard icon="🌐" title="HVDC long-distance links" desc="For very long undersea cables (e.g. UK–Norway), DC is used instead of AC — no reactive power losses over thousands of km." color="#f59e0b" delay={0.2} />
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

      <svg width="260" height="130" viewBox="0 0 260 130" style={{ display: 'block' }} role="img" aria-label="Static electricity diagram showing two charged balloons with negative charge symbols and repulsion">
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
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 px-4 py-3">
      <MisconceptionCard
        wrong="Rubbing objects together creates electric charge — friction generates new charge from nothing."
        right="Charge is transferred, not created. Electrons move from one surface to the other. Total charge is conserved — one object gains electrons, the other loses the same number."
        wrongLabel="Creation myth"
        rightLabel="Conservation of charge"
      />
    </div>
  )
}

function StaticElectricityReality() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 px-4 py-3">
      <RealWorldCard icon="⛽" title="Fuel tanker earthing" desc="When pumping fuel, static build-up can cause a spark. Tankers are earthed via a wire before opening valves — charge flows safely to ground." color="#ef4444" delay={0} />
      <RealWorldCard icon="🖨️" title="Laser printer drum" desc="A laser printer charges a drum with static, then uses a laser to neutralise parts of it. Toner (charged powder) sticks only to charged areas — printing your document." color="#6366f1" delay={0.1} />
      <RealWorldCard icon="🌩️" title="Lightning" desc="Charge separation in storm clouds builds up millions of volts. When the electric field exceeds air's breakdown strength (~3 MV/m), a spark discharges cloud to ground." color="#fdc700" delay={0.2} />
    </div>
  )
}

// ─── Exports ──────────────────────────────────────────────────────────────────
export const ELECTRICITY_TOPICS = {
  circuit_basics: {
    id: 'circuit_basics', module: 'Electricity', moduleColor: EC, course: 'combined',
    title: 'Circuit Basics',
    subtitle: 'Current, Voltage, Charge & Complete Circuits',
    description: 'An electric circuit is a closed loop through which current can flow. Current (I) is the rate of flow of charge, measured in amperes (A). Charge flow: Q = It (charge in coulombs = current × time). Voltage (V) is the energy transferred per unit charge: V = W/Q (volts = joules per coulomb). A circuit must be complete for current to flow — any break stops it.',
    lessonVisual: CircuitBasicsLesson, ideaVisual: CircuitBasicsIdea, realityVisual: CircuitBasicsReality,
    equations: [{ expr: 'V = IR', given: false }, { expr: 'Q = It', given: false }, { expr: 'V = W/Q', given: true }],
    question: 'A current of 2 A flows for 30 seconds. What charge passes through the circuit?',
    questionSubtitle: 'Use Q = I × t',
    options: ['15 C', '60 C', '32 C', '0.067 C'],
    correctAnswer: 1,
    keywords: ['circuit', 'charge', 'Q = It', 'current', 'coulombs', 'V = W/Q', 'voltage', 'amperes', 'complete loop', 'conventional current'],
    sentenceStarters: ['Using Q = It, I substitute...', 'Q = 2 × 30 = ...', 'Charge is measured in coulombs (C)...', 'Voltage is defined as energy per unit charge: V = W/Q...', 'Current is the rate of flow of charge, so I = Q/t...'],
    modelAnswers: [
      'Using Q = It, I substitute **I = 2 A and t = 30 s to get Q = 2 × 30 = 60 C**.',
      'Q = 2 × 30 = **60 coulombs**.',
      'Charge is measured in coulombs (C) — **1 coulomb passes when 1 amp flows for 1 second**.',
      'Voltage is defined as energy per unit charge: V = W/Q, **so 1 volt means 1 joule of energy transferred per coulomb of charge**.',
      'Current is the rate of flow of charge, so I = Q/t — **rearranging gives Q = It**.',
    ],
    misconception: 'Charge and current are not the same: current is the rate of charge flow (I = Q/t); charge is the total amount that has moved (Q = It).',
    concept: 'Q = It = 2 × 30 = 60 C. Every second, 2 coulombs of charge pass any point. V = W/Q tells you how much energy each coulomb gains from the supply — a 6 V battery gives 6 J to every coulomb.',

    // ── 9-STEP LESSON DATA ────────────────────────────────────────────────────

    hook: {
      hookFact: 'A bolt of lightning carries around 300 million volts. Your phone charger uses just 5 volts. Both use the exact same physics you\'re about to learn.',
      hookQuestion: 'Before we start — what do you think is actually happening inside a wire when you flick a light switch on?',
      hookEmoji: '⚡',
    },

    lessonKeywords: [
      {
        word: 'Current',
        symbol: 'I',
        unit: 'amperes (A)',
        definition: 'The rate at which electric charge flows past a point in a circuit.',
        everydayNote: 'Think of water flowing through a pipe — current is how fast the water is moving.',
      },
      {
        word: 'Voltage',
        symbol: 'V',
        unit: 'volts (V)',
        definition: 'The energy given to each unit of charge by the power supply.',
        everydayNote: 'Voltage is like water pressure — it\'s what pushes the current around the circuit.',
      },
      {
        word: 'Resistance',
        symbol: 'R',
        unit: 'ohms (Ω)',
        definition: 'How much a component opposes the flow of current through it.',
        everydayNote: 'A narrow pipe is harder to push water through — that\'s what resistance does to current.',
      },
      {
        word: 'Charge',
        symbol: 'Q',
        unit: 'coulombs (C)',
        definition: 'The total amount of electricity that has passed a point. Q = It.',
        everydayNote: 'If current is the flow rate, charge is the total volume of water that has flowed.',
      },
      {
        word: 'Ohm\'s Law',
        symbol: 'V = IR',
        unit: '',
        definition: 'The relationship between voltage (V), current (I) and resistance (R): V = I × R.',
        everydayNote: 'More pressure (voltage) → more flow (current), unless the pipe is narrow (high resistance).',
      },
    ],

    prerequisiteCheck: {
      questions: [
        {
          question: 'What must a circuit have for current to flow around it?',
          answers: ['A battery only', 'A complete, unbroken loop', 'At least two components', 'A resistor'],
          correct: 1,
          feedback: 'Correct — current needs a closed, unbroken path. Any break (like an open switch) stops it completely.',
        },
        {
          question: 'Which of these is current measured in?',
          answers: ['Volts (V)', 'Watts (W)', 'Amperes (A)', 'Joules (J)'],
          correct: 2,
          feedback: 'Amperes (A) — named after André-Marie Ampère. Current tells you the rate of charge flow.',
        },
      ],
    },

    topicMapHint: {
      before: ['Energy Stores', 'Energy Transfer'],
      current: 'Circuit Basics',
      after: ['Circuit Components', 'Series & Parallel', 'Electrical Power'],
    },

    workedExample: {
      title: 'Finding resistance using V = IR',
      equation: 'V = I × R   →   R = V ÷ I',
      context: 'A resistor in a circuit has a voltage of 12 V across it and a current of 3 A flowing through it. What is its resistance?',
      steps: [
        {
          step: 1,
          action: 'Write what you know',
          content: 'V = 12 V,   I = 3 A,   R = ?',
          annotation: 'Always list your given values first. It shows the examiner you\'ve understood the question and prevents silly substitution errors.',
        },
        {
          step: 2,
          action: 'Write the equation',
          content: 'V = I × R',
          annotation: 'Ohm\'s Law — this is a must-recall equation. No formula sheet for this one.',
        },
        {
          step: 3,
          action: 'Rearrange for R',
          content: 'R = V ÷ I',
          annotation: 'Divide both sides by I to make R the subject. Tip: use a VAR triangle — V on top, I×R on the bottom.',
        },
        {
          step: 4,
          action: 'Substitute the values',
          content: 'R = 12 ÷ 3 = 4',
          annotation: 'Put the numbers in. Always check: does a bigger resistance mean less current? Yes — so 4 Ω makes sense here.',
        },
        {
          step: 5,
          action: 'State with the correct unit',
          content: 'R = 4 Ω',
          annotation: 'Always write the unit — Ω for ohms, named after Georg Ohm. No unit = no marks in the exam.',
        },
      ],
      misconceptionAfter: {
        claim: 'If you double the voltage, the resistance doubles too.',
        reality: 'Wrong. Resistance is a fixed property of the component (at constant temperature). Doubling the voltage doubles the current — not the resistance. R stays the same in V = IR.',
        visual: 'The pipe width (resistance) doesn\'t change when you increase the pump pressure (voltage) — only the flow rate (current) changes.',
      },
    },

    guidedPractice: {
      tier1: {
        question: 'A component has 6 V across it and 2 A flowing through it. What is its resistance?',
        allSteps: [
          'Write what you know: V = 6 V, I = 2 A',
          'Write the equation: V = I × R → R = V ÷ I',
          'Substitute: R = 6 ÷ 2',
          '??? — what is 6 ÷ 2?',
        ],
        missingStep: 3,
        missingHint: 'Calculate: 6 ÷ 2 = ?',
        answer: 3,
        answerUnit: 'Ω',
      },
      tier2: {
        question: 'A resistor has R = 10 Ω and current I = 0.5 A flows through it. What is the voltage across it?',
        shownEquation: 'V = I × R',
        shownStep1: 'Write what you know: R = 10 Ω, I = 0.5 A',
        hint: 'Multiply I by R: 0.5 × 10 = ?',
        answer: 5,
        answerUnit: 'V',
      },
      tier3: {
        question: 'A lamp has resistance 24 Ω and is connected to a 12 V supply. What current flows through it?',
        hint: 'You need I. Rearrange V = IR → I = V ÷ R',
        methodHint: 'Start with V = IR. You know V and R — rearrange to find I. Make sure you divide, not multiply.',
        answer: 0.5,
        answerUnit: 'A',
      },
    },

    summary: {
      equation: 'V = I × R',
      sentence: 'Voltage drives current through resistance — double the voltage, double the current (as long as resistance stays the same).',
      promptText: 'Explain what Ohm\'s Law tells us, in one sentence, as if explaining it to a friend who\'s never heard of it.',
    },

    sessionRecap: [
      'Current (I) is the rate of charge flow — measured in amperes (A).',
      'Voltage (V) drives current through a circuit — measured in volts (V).',
      'Ohm\'s Law: V = IR — resistance opposes the flow of current.',
    ],
  },

  circuit_components: {
    id: 'circuit_components', module: 'Electricity', moduleColor: EC, course: 'combined',
    title: 'Circuit Symbols & I-V Characteristics',
    subtitle: 'Ohmic Conductors, Filament Lamps, Diodes & Sensors',
    description: 'Ammeters (low resistance) connect in series; voltmeters (very high resistance) connect in parallel. I-V characteristics show how current varies with voltage: an ohmic resistor (at constant temperature) gives a straight line through the origin — resistance is constant (R = V/I). A filament lamp gives a curved line — as current increases, the filament heats up, ions vibrate more, electrons collide more often, so resistance increases. A diode only allows current in one direction — below the threshold voltage (~0.7 V) resistance is very high; above it, resistance is very low. An LDR\'s resistance decreases in bright light. A thermistor\'s resistance decreases with temperature.',
    lessonVisual: CircuitComponentsLesson, ideaVisual: CircuitComponentsIdea, realityVisual: CircuitComponentsReality,
    question: 'A filament lamp\'s I-V graph curves away from a straight line. Why does resistance increase as current increases?',
    questionSubtitle: 'Think about what happens inside the filament as it heats up',
    options: ['More electrons are created at higher voltages', 'The filament gets hotter, ions vibrate more, increasing collisions with electrons', 'The filament gets shorter, reducing current', 'Resistance decreases at high current — the curve is due to measurement error'],
    correctAnswer: 1,
    keywords: ['I-V characteristic', 'ohmic conductor', 'filament lamp', 'diode', 'resistance', 'R = V/I', 'non-ohmic', 'thermistor', 'LDR', 'threshold voltage', 'ammeter', 'voltmeter'],
    sentenceStarters: ['As the filament heats up, ions vibrate more so...', 'The I-V graph for an ohmic resistor is a straight line because...', 'A diode only conducts in one direction because...', 'Resistance of the filament increases because...', 'An LDR\'s resistance decreases in light because...'],
    modelAnswers: [
      'As the filament heats up, ions vibrate more so **electrons collide with them more frequently, increasing resistance**.',
      'The I-V graph for an ohmic resistor is a straight line because **resistance stays constant — doubling voltage doubles current**.',
      'A diode only conducts in one direction because **below the threshold voltage its resistance is extremely high; above it, current flows freely**.',
      'Resistance of the filament increases because **higher current → more heating → more ion vibration → more electron collisions → higher resistance**.',
      'An LDR\'s resistance decreases in light because **photons free more charge carriers (electrons), making the material more conductive**.',
    ],
    misconception: 'A curved I-V graph does NOT mean resistance is decreasing — for a filament lamp, the curve bends because resistance is increasing (gradient decreases).',
    concept: 'Ohmic: straight I-V line, constant R. Filament lamp: curved I-V line, R increases with temperature. Diode: one-way, very high R below threshold. For any component, R = V/I at any point on the graph.',

    // -- 9-STEP LESSON DATA ----------------------------------------------------

    hook: {
      hookFact: 'Hospitals use thermistors inside patient temperature probes. A 1 degree C rise in body temperature shifts the thermistor\'s resistance by enough to trigger an alert - that is how sensitive the R-T relationship is.',
      hookQuestion: 'If you push more current through a wire, what do you think happens to its resistance - and why?',
      hookEmoji: '📉',
    },

    lessonKeywords: [
      {
        word: 'Ohmic conductor',
        symbol: '',
        unit: '',
        definition: 'A component whose resistance stays constant at constant temperature, giving a straight-line I-V graph through the origin.',
        everydayNote: 'A fixed resistor in a circuit behaves like this - double the voltage and you exactly double the current.',
      },
      {
        word: 'Resistance',
        symbol: 'R',
        unit: 'ohms (Ω)',
        definition: 'The ratio of voltage across a component to the current through it: R = V/I.',
        everydayNote: 'A thick water pipe has low resistance to flow; a thin, narrow pipe has high resistance - same idea applies to electrons in a conductor.',
      },
      {
        word: 'I-V characteristic',
        symbol: '',
        unit: '',
        definition: 'A graph of current (y-axis) against voltage (x-axis) that shows how a component\'s resistance behaves.',
        everydayNote: 'Think of it as a fingerprint for each component type - a straight line for a resistor, a curve for a lamp.',
      },
      {
        word: 'Thermistor',
        symbol: '',
        unit: '',
        definition: 'A resistor whose resistance decreases as temperature increases.',
        everydayNote: 'Used in car engines and medical thermometers - gets easier to conduct current as things heat up.',
      },
      {
        word: 'LDR',
        symbol: '',
        unit: '',
        definition: 'Light-dependent resistor - resistance decreases when light intensity increases.',
        everydayNote: 'Used in automatic street lights: as daylight fades, resistance rises and the circuit switches the lamp on.',
      },
    ],

    prerequisiteCheck: {
      questions: [
        {
          question: 'What equation links voltage, current and resistance?',
          answers: ['V = I + R', 'V = I × R', 'V = I / R', 'V = I² × R'],
          correct: 1,
          feedback: 'V = I × R (Ohm\'s Law). Rearranged: R = V/I and I = V/R. This equation is on the formula sheet and is used to find resistance from any I-V graph.',
        },
        {
          question: 'What happens to the resistance of a metal wire as its temperature increases?',
          answers: ['It stays the same', 'It decreases', 'It increases', 'It first increases then decreases'],
          correct: 2,
          feedback: 'Resistance increases. Higher temperature makes the metal ions vibrate more, causing more collisions with conduction electrons - this is exactly why the filament lamp\'s I-V graph curves.',
        },
      ],
    },

    topicMapHint: {
      before: ['Charge and current', 'Potential difference and resistance'],
      current: 'Circuit Symbols & I-V Characteristics',
      after: ['Series & Parallel Circuits', 'Electrical Power'],
    },

    workedExample: {
      title: 'Finding resistance from an I-V graph using R = V / I',
      equation: 'R = V / I',
      context: 'A point on an I-V graph shows V = 6 V and I = 0.3 A. Find the resistance of the component at that point.',
      steps: [
        {
          step: 1,
          action: 'Write what you know',
          content: 'V = 6 V, I = 0.3 A',
          annotation: 'Always read the graph carefully - pick a clearly marked point. State units with each value.',
        },
        {
          step: 2,
          action: 'Write the equation',
          content: 'R = V / I',
          annotation: 'This equation is on the formula sheet. Use it at any single point on the graph to find resistance at that moment.',
        },
        {
          step: 3,
          action: 'Substitute values',
          content: 'R = 6 / 0.3',
          annotation: 'Common error: confusing which value is V and which is I. Voltage is always on the x-axis of an I-V graph.',
        },
        {
          step: 4,
          action: 'Calculate',
          content: 'R = 20',
          annotation: 'Sense check: 6 divided by 0.3 - think of it as 6 ÷ 0.3 = 60 ÷ 3 = 20. That is a reasonable resistance for a component.',
        },
        {
          step: 5,
          action: 'State with unit',
          content: 'R = 20 Ω',
          annotation: 'Unit is ohms (Ω). Never leave out the unit in an exam answer.',
        },
      ],
      misconceptionAfter: {
        claim: 'A curved I-V graph means resistance is decreasing as voltage increases.',
        reality: 'For a filament lamp, the curve bends away from the current axis - the slope gets shallower, meaning less current per volt. That means resistance is increasing, not decreasing.',
        visual: 'Imagine a straight ramp (ohmic) vs a ramp that gradually gets steeper uphill (filament) - the filament makes it harder to push current through as it heats up.',
      },
    },

    guidedPractice: {
      tier1: {
        question: 'A component has 4 V across it and 0.5 A flowing through it. Find its resistance.',
        allSteps: [
          'Step 1: Write what you know - V = 4 V, I = 0.5 A',
          'Step 2: Write the equation - R = V / I',
          'Step 3: Substitute - R = 4 / 0.5',
          '??? - Calculate R',
        ],
        missingStep: 3,
        missingHint: 'Calculate: 4 ÷ 0.5 = ?',
        answer: 8,
        answerUnit: 'Ω',
      },
      tier2: {
        question: 'A resistor has 9 V across it and a resistance of 30 Ω. What current flows through it?',
        shownEquation: 'R = V / I  ->  I = V / R',
        shownStep1: 'Step 1: V = 9 V, R = 30 Ω',
        hint: 'Calculate: 9 ÷ 30 = ?',
        answer: 0.3,
        answerUnit: 'A',
      },
      tier3: {
        question: 'A current of 0.2 A flows through a component with resistance 45 Ω. What is the voltage across it?',
        hint: 'Use V = I × R and substitute both values.',
        methodHint: 'Start with V = I × R. You know I = 0.2 A and R = 45 Ω. Multiply them together.',
        answer: 9,
        answerUnit: 'V',
      },
    },

    summary: {
      equation: 'R = V / I',
      sentence: 'Resistance equals voltage divided by current - you can find it at any point on an I-V graph, and for a filament lamp it increases as the component heats up.',
      promptText: 'Explain the difference between an ohmic conductor and a filament lamp\'s I-V graph, as if telling a friend who has never seen one before.',
    },

    sessionRecap: [
      'R = V/I works at any single point on an I-V graph - straight line means constant R (ohmic), curved line means R is changing.',
      'Filament lamp: resistance increases as temperature rises because hotter ions vibrate more and cause more electron collisions.',
      'Thermistor and LDR are the opposite of the lamp - their resistance decreases as temperature or light increases.',
    ],
  },

  series_parallel: {
    id: 'series_parallel', module: 'Electricity', moduleColor: EC, course: 'combined',
    title: 'Series & Parallel Circuits',
    subtitle: 'Current, Voltage & Resistance in Each',
    description: 'Series circuits: current is the same everywhere; voltages add up (V_total = V1 + V2); total resistance adds up (R_total = R1 + R2). Parallel circuits: voltage is the same across each branch; currents add up at junctions (I_total = I1 + I2); total resistance is less than the smallest branch — found by 1/R_total = 1/R1 + 1/R2. Most household wiring uses parallel so each appliance gets full mains voltage and can be switched independently.',
    lessonVisual: SeriesParallelLesson, ideaVisual: SeriesParallelIdea, realityVisual: SeriesParallelReality,
    question: 'Two resistors of 4 Ω and 6 Ω are connected in series. What is the total resistance?',
    questionSubtitle: 'Series: R_total = R1 + R2',
    options: ['2.4 Ω', '10 Ω', '5 Ω', '24 Ω'],
    correctAnswer: 1,
    keywords: ['series resistance', 'parallel resistance', 'R_total = R1 + R2', '1/R = 1/R1 + 1/R2', 'voltage', 'current', 'junction', 'branches', 'total resistance', 'household wiring'],
    sentenceStarters: ['In series, total resistance = R1 + R2 = ...', 'In parallel, 1/R_total = 1/R1 + 1/R2...', 'In a parallel circuit, each branch receives the full voltage because...', 'Adding resistors in series increases total resistance because...', 'Adding resistors in parallel decreases total resistance because...'],
    modelAnswers: [
      'In series, total resistance = R1 + R2 = **4 + 6 = 10 Ω**.',
      'In parallel, 1/R_total = 1/R1 + 1/R2 — **for the same two resistors: 1/R = 1/4 + 1/6 = 5/12, so R = 2.4 Ω (less than either individual resistor)**.',
      'In a parallel circuit, each branch receives the full voltage because **both ends connect directly to the battery terminals**.',
      'Adding resistors in series increases total resistance because **each extra component adds another barrier to current flow**.',
      'Adding resistors in parallel decreases total resistance because **each extra branch provides another path for current, increasing total flow**.',
    ],
    misconception: 'Adding resistors in parallel does NOT increase resistance — it decreases it by providing extra current paths.',
    concept: 'Series: R = 4 + 6 = 10 Ω. Parallel: 1/R = 1/4 + 1/6 → R = 2.4 Ω. In parallel, more paths = less total resistance. Series: current same everywhere, voltage shared. Parallel: voltage same everywhere, current splits.',

    // -- 9-STEP LESSON DATA ----------------------------------------------------

    hook: {
      hookFact: 'Old-style Christmas lights were wired in series - one bulb blew and the whole string went dark because the circuit was broken. Modern strings use parallel wiring, so one failed bulb leaves every other bulb still lit.',
      hookQuestion: 'If you add another resistor to a circuit, do you think the total resistance always goes up? What might change your answer?',
      hookEmoji: '💡',
    },

    lessonKeywords: [
      {
        word: 'Series circuit',
        symbol: '',
        unit: '',
        definition: 'A circuit where components are connected in a single loop - current is the same through every component.',
        everydayNote: 'Like a single lane road with traffic lights: every car passes every light, one after the other.',
      },
      {
        word: 'Parallel circuit',
        symbol: '',
        unit: '',
        definition: 'A circuit where components are connected across separate branches - each branch has the full supply voltage.',
        everydayNote: 'Like a road splitting into multiple lanes: each car chooses a lane, and every lane starts and ends at the same junction.',
      },
      {
        word: 'Total resistance (series)',
        symbol: 'R_total',
        unit: 'Ω',
        definition: 'In a series circuit, total resistance = R1 + R2 + ... - all resistances add up.',
        everydayNote: 'Adding more traffic lights on one road always slows traffic more.',
      },
      {
        word: 'Total resistance (parallel)',
        symbol: 'R_total',
        unit: 'Ω',
        definition: 'In a parallel circuit, 1/R_total = 1/R1 + 1/R2 - total resistance is always less than the smallest branch resistance.',
        everydayNote: 'Opening more checkout lanes at a supermarket always speeds up the queue, even if the new lane is slow.',
      },
    ],

    prerequisiteCheck: {
      questions: [
        {
          question: 'In a simple circuit with one battery and one resistor, where is the current largest - before the resistor, inside it, or after it?',
          answers: ['Before the resistor', 'After the resistor', 'The current is the same everywhere', 'Largest inside the resistor'],
          correct: 2,
          feedback: 'Current is the same everywhere in a simple single-loop circuit. Charge is conserved - none is used up by the resistor. This principle extends to series circuits.',
        },
        {
          question: 'A 9 V battery is connected to a single 3 Ω resistor. What is the current?',
          answers: ['0.33 A', '3 A', '27 A', '6 A'],
          correct: 1,
          feedback: 'I = V/R = 9/3 = 3 A. This is the baseline skill needed before working with combinations of resistors in series or parallel.',
        },
      ],
    },

    topicMapHint: {
      before: ['Circuit Symbols & I-V Characteristics', 'Potential difference and resistance'],
      current: 'Series & Parallel Circuits',
      after: ['Domestic Electricity', 'Electrical Power'],
    },

    workedExample: {
      title: 'Finding total resistance for two resistors in parallel using 1/R = 1/R1 + 1/R2',
      equation: '1/R_total = 1/R1 + 1/R2',
      context: 'Two resistors, 6 Ω and 12 Ω, are connected in parallel. Find the total resistance.',
      steps: [
        {
          step: 1,
          action: 'Write what you know',
          content: 'R1 = 6 Ω, R2 = 12 Ω, connected in parallel',
          annotation: 'Identifying the circuit type (series vs parallel) is the most important first step. Getting this wrong means using the wrong formula.',
        },
        {
          step: 2,
          action: 'Write the equation',
          content: '1/R_total = 1/R1 + 1/R2',
          annotation: 'This formula is given on the formula sheet. It always gives a total resistance smaller than the smallest individual resistor.',
        },
        {
          step: 3,
          action: 'Substitute values',
          content: '1/R_total = 1/6 + 1/12 = 2/12 + 1/12 = 3/12',
          annotation: 'Common error: forgetting to find a common denominator before adding fractions. Here 1/6 = 2/12.',
        },
        {
          step: 4,
          action: 'Invert to find R',
          content: 'R_total = 12/3 = 4 Ω',
          annotation: 'The most common mistake is stopping at 3/12 and writing 0.25 Ω. You must flip the fraction: R_total = 12/3, not 3/12.',
        },
        {
          step: 5,
          action: 'State with unit',
          content: 'R_total = 4 Ω',
          annotation: '4 Ω is less than 6 Ω (the smaller resistor) - this is your sense-check. Parallel always gives lower total resistance.',
        },
      ],
      misconceptionAfter: {
        claim: 'Adding resistors in parallel increases total resistance because there are more components.',
        reality: 'Adding resistors in parallel always decreases total resistance. Each new branch gives current another path to flow through, making the overall opposition to current smaller.',
        visual: 'Think of adding a second checkout lane at a supermarket. Even if the new cashier is slow, more lanes always speeds up the queue.',
      },
    },

    guidedPractice: {
      tier1: {
        question: 'Two resistors of 4 Ω and 6 Ω are connected in series. Find the total resistance.',
        allSteps: [
          'Step 1: Identify circuit type - series',
          'Step 2: Write the equation - R_total = R1 + R2',
          'Step 3: Substitute - R_total = 4 + 6',
          '??? - Calculate R_total',
        ],
        missingStep: 3,
        missingHint: 'Calculate: 4 + 6 = ?',
        answer: 10,
        answerUnit: 'Ω',
      },
      tier2: {
        question: 'Two resistors of 4 Ω and 12 Ω are connected in parallel. Find the total resistance.',
        shownEquation: '1/R_total = 1/R1 + 1/R2  ->  R_total = 1 / (1/R1 + 1/R2)',
        shownStep1: 'Step 1: 1/R_total = 1/4 + 1/12 = 3/12 + 1/12 = 4/12',
        hint: 'Invert 4/12 to find R_total: R = 12/4 = ?',
        answer: 3,
        answerUnit: 'Ω',
      },
      tier3: {
        question: 'Three resistors of 3 Ω, 4 Ω and 5 Ω are connected in series to a 24 V supply. What current flows?',
        hint: 'First find total resistance, then use I = V/R.',
        methodHint: 'Start with R_total = 3 + 4 + 5. Then use I = V/R_total with V = 24 V.',
        answer: 2,
        answerUnit: 'A',
      },
    },

    summary: {
      equation: 'Series: R_total = R1 + R2 | Parallel: 1/R_total = 1/R1 + 1/R2',
      sentence: 'In series, resistances add up and current is shared; in parallel, resistance falls below the smallest branch value and voltage is shared.',
      promptText: 'Explain to a friend what the key difference is between a series and a parallel circuit, and why household appliances are wired in parallel.',
    },

    sessionRecap: [
      'Series: R_total = R1 + R2 - total always rises. Current is the same everywhere. Voltage splits across components.',
      'Parallel: 1/R_total = 1/R1 + 1/R2 - total always falls below the smallest branch. Voltage is the same across all branches. Current splits.',
      'Household wiring is parallel so every appliance gets full 230 V and can be switched on or off independently.',
    ],
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

    // -- 9-STEP LESSON DATA ----------------------------------------------------

    hook: {
      hookFact: 'The UK officially switched from 240 V to 230 V in 1995 to match European standards - but most UK sockets still deliver closer to 240 V. Appliances are built to tolerate anywhere between 216 V and 253 V, so both voltages work fine.',
      hookQuestion: 'Why do you think the three wires in a plug have different colours - what problem would arise if they were all the same?',
      hookEmoji: '🔌',
    },

    lessonKeywords: [
      {
        word: 'Alternating current (AC)',
        symbol: 'AC',
        unit: '',
        definition: 'Current that repeatedly reverses direction, completing 50 full cycles every second in the UK mains supply.',
        everydayNote: 'UK mains electricity is AC at 50 Hz - the current changes direction 100 times per second (twice per cycle).',
      },
      {
        word: 'Live wire',
        symbol: '',
        unit: '',
        definition: 'The brown wire in a UK plug, at 230 V - it carries the alternating voltage and is the source of dangerous shock.',
        everydayNote: 'Even when a switch is off, the live wire remains at 230 V up to the switch - only switching the live wire (not neutral) makes the appliance truly safe.',
      },
      {
        word: 'Neutral wire',
        symbol: '',
        unit: '',
        definition: 'The blue wire in a UK plug, at 0 V - it completes the circuit back to the substation.',
        everydayNote: 'Though it is at 0 V, the neutral wire can still carry dangerous current - never assume it is safe to touch.',
      },
      {
        word: 'Earth wire',
        symbol: '',
        unit: '',
        definition: 'The green and yellow striped wire, connected to the metal casing of an appliance - provides a safe, low-resistance path if a fault makes the casing live.',
        everydayNote: 'Toasters, washing machines and ovens have metal cases connected to earth - if a wire inside touches the casing, current takes the earth path and blows the fuse rather than going through you.',
      },
      {
        word: 'Fuse',
        symbol: '',
        unit: 'A',
        definition: 'A thin wire in a plug that melts if the current exceeds its rated value, breaking the circuit and preventing fire.',
        everydayNote: 'UK plug fuses come in 3 A and 13 A ratings - always choose the one just above the normal operating current of the appliance.',
      },
    ],

    prerequisiteCheck: {
      questions: [
        {
          question: 'What equation links power, current and voltage?',
          answers: ['P = V / I', 'P = I × V', 'P = I + V', 'P = V² / I'],
          correct: 1,
          feedback: 'P = IV. You need this to calculate the normal operating current of an appliance from its power rating and the mains voltage - essential for choosing the right fuse.',
        },
        {
          question: 'What does frequency mean for an AC supply?',
          answers: ['The peak voltage', 'The number of complete cycles per second', 'The direction the current flows', 'The resistance of the cable'],
          correct: 1,
          feedback: 'Frequency is the number of complete cycles per second, measured in hertz (Hz). UK mains is 50 Hz - the current goes back and forth 50 times every second.',
        },
      ],
    },

    topicMapHint: {
      before: ['Series & Parallel Circuits', 'Circuit Symbols & I-V Characteristics'],
      current: 'Domestic Electricity',
      after: ['Electrical Power', 'The National Grid'],
    },

    workedExample: {
      title: 'Choosing the correct fuse rating using I = P / V',
      equation: 'I = P / V',
      context: 'A toaster is rated 1380 W. The mains voltage is 230 V. What fuse should be fitted - 3 A or 13 A?',
      steps: [
        {
          step: 1,
          action: 'Write what you know',
          content: 'P = 1380 W, V = 230 V',
          annotation: 'The power rating is printed on every appliance. Always use the mains voltage of 230 V for UK domestic appliances.',
        },
        {
          step: 2,
          action: 'Write the equation',
          content: 'I = P / V',
          annotation: 'This is a rearrangement of P = IV. It gives the normal operating current - the value you compare to fuse ratings.',
        },
        {
          step: 3,
          action: 'Substitute values',
          content: 'I = 1380 / 230',
          annotation: 'Common error: dividing the wrong way round. P is on top because we are rearranging P = IV to find I.',
        },
        {
          step: 4,
          action: 'Calculate',
          content: 'I = 6 A',
          annotation: 'The toaster normally draws 6 A. A 3 A fuse would blow immediately - too low. A 13 A fuse is the next standard rating above 6 A.',
        },
        {
          step: 5,
          action: 'State the answer',
          content: 'Fit a 13 A fuse',
          annotation: 'Always choose the fuse rated just above normal operating current. If the fuse is too high, a fault current might not blow it in time.',
        },
      ],
      misconceptionAfter: {
        claim: 'The neutral wire is safe to touch because it is at 0 V.',
        reality: 'The neutral wire can carry the full operating current of the appliance. Current, not voltage, causes fatal electric shock - and the neutral carries as much current as the live wire.',
        visual: 'Imagine two pipes in a water loop - both carry the same flow rate, even though one is labelled "high pressure" and the other "return".',
      },
    },

    guidedPractice: {
      tier1: {
        question: 'A kettle is rated 2300 W. The mains voltage is 230 V. Find the operating current.',
        allSteps: [
          'Step 1: Write what you know - P = 2300 W, V = 230 V',
          'Step 2: Write the equation - I = P / V',
          'Step 3: Substitute - I = 2300 / 230',
          '??? - Calculate I',
        ],
        missingStep: 3,
        missingHint: 'Calculate: 2300 ÷ 230 = ?',
        answer: 10,
        answerUnit: 'A',
      },
      tier2: {
        question: 'A lamp is rated 460 W at 230 V. Find the current and suggest an appropriate fuse rating.',
        shownEquation: 'I = P / V',
        shownStep1: 'Step 1: P = 460 W, V = 230 V',
        hint: 'Calculate I = 460 / 230, then choose the fuse just above that value.',
        answer: 2,
        answerUnit: 'A',
      },
      tier3: {
        question: 'An appliance draws 4 A from a 230 V mains supply. What is its power rating?',
        hint: 'Use P = IV with I = 4 A and V = 230 V.',
        methodHint: 'Start with P = IV. You know I = 4 A and V = 230 V. Multiply them together.',
        answer: 920,
        answerUnit: 'W',
      },
    },

    summary: {
      equation: 'I = P / V',
      sentence: 'Normal operating current equals power divided by voltage - use this to choose the correct fuse for any appliance.',
      promptText: 'Explain to a friend what the three wires in a UK plug each do, and why the fuse is in the live wire rather than the neutral.',
    },

    sessionRecap: [
      'UK mains: 230 V AC at 50 Hz. Live = brown (230 V), Neutral = blue (0 V), Earth = green/yellow (safety).',
      'Fuse selection: use I = P/V to find operating current, then choose the fuse rated just above that value.',
      'The earth wire + fuse work together: a fault makes casing live, large current flows to earth, fuse blows, circuit breaks.',
    ],
  },

  electrical_power: {
    id: 'electrical_power', module: 'Electricity', moduleColor: EC, course: 'combined',
    title: 'Electrical Power',
    subtitle: 'P = IV, P = I²R and Energy Transfer',
    description: 'Power (P) is the rate of energy transfer in watts (W). P = IV (power = current × voltage). P = I²R (useful when voltage is unknown). Energy transferred: E = Pt (joules = watts × seconds). A 60 W bulb transfers 60 J every second. Doubling the current quadruples the power (P = I²R).',
    lessonVisual: ElectricalPowerLesson, ideaVisual: ElectricalPowerIdea, realityVisual: ElectricalPowerReality,
    equations: [{ expr: 'P = IV', given: true }, { expr: 'P = I²R', given: true }, { expr: 'P = V²/R', given: true }, { expr: 'E = Pt', given: true }],
    equationData: {
      name: 'Electrical Power  P = IV',
      triangle: {
        top:   { sym: 'P', name: 'Power',   unit: 'W', },
        left:  { sym: 'I', name: 'Current', unit: 'A', },
        right: { sym: 'V', name: 'Voltage', unit: 'V', },
      },
      rearrangements: [
        { unknown: 'P', formula: 'P = I × V', unit: 'W', calc: ({ I, V }) => I * V },
        { unknown: 'I', formula: 'I = P ÷ V', unit: 'A', calc: ({ P, V }) => P / V },
        { unknown: 'V', formula: 'V = P ÷ I', unit: 'V', calc: ({ P, I }) => P / I },
      ],
      practice: [
        { label: 'A current of 3 A flows through a 12 V supply. What is the power?', find: 'P', given: { I: { value: 3, unit: 'A' }, V: { value: 12, unit: 'V' } } },
        { label: 'A 60 W bulb runs on 230 V mains. What current flows?',             find: 'I', given: { P: { value: 60, unit: 'W' }, V: { value: 230, unit: 'V' } } },
      ],
    },
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

    // -- 9-STEP LESSON DATA ----------------------------------------------------

    hook: {
      hookFact: 'A hair dryer on full power (2000 W) running for 3 minutes transfers more energy than a typical phone charger (5 W) running for 24 hours straight. The hair dryer uses 360,000 J; the phone charger uses only 432,000 J - actually they are comparable, but the dryer does it 480 times faster.',
      hookQuestion: 'A phone charger and a kettle are both plugged in. Which transfers more energy per second - and how could you tell without measuring the current?',
      hookEmoji: '⚡',
    },

    lessonKeywords: [
      {
        word: 'Power',
        symbol: 'P',
        unit: 'watts (W)',
        definition: 'The rate of energy transfer - 1 watt means 1 joule transferred every second.',
        everydayNote: 'A 100 W bulb transfers 100 J of energy every second. A 2000 W kettle transfers 2000 J every second - 20 times more.',
      },
      {
        word: 'P = IV',
        symbol: '',
        unit: 'W',
        definition: 'Power equals current multiplied by voltage.',
        everydayNote: 'A car battery at 12 V delivering 50 A produces P = 12 × 50 = 600 W - enough to power a starter motor.',
      },
      {
        word: 'P = I²R',
        symbol: '',
        unit: 'W',
        definition: 'Power equals current squared multiplied by resistance - useful when voltage is not given.',
        everydayNote: 'This equation explains why overhead transmission cables get hot: even small currents in high-resistance cables waste significant power as heat.',
      },
      {
        word: 'Energy transferred',
        symbol: 'E',
        unit: 'joules (J)',
        definition: 'E = Pt - energy equals power multiplied by time.',
        everydayNote: 'A 60 W bulb left on for 100 seconds transfers E = 60 × 100 = 6000 J of electrical energy to light and heat.',
      },
    ],

    prerequisiteCheck: {
      questions: [
        {
          question: 'What is the unit of power?',
          answers: ['Joules', 'Volts', 'Watts', 'Amperes'],
          correct: 2,
          feedback: 'Power is measured in watts (W). 1 watt = 1 joule per second. This is the rate of energy transfer, not the total energy stored or used.',
        },
        {
          question: 'A resistor has 6 V across it and 2 A through it. What is its resistance?',
          answers: ['12 Ω', '3 Ω', '4 Ω', '8 Ω'],
          correct: 1,
          feedback: 'R = V/I = 6/2 = 3 Ω. You need to be comfortable with R = V/I before working with P = IV and P = I²R, as the three equations are closely linked.',
        },
      ],
    },

    topicMapHint: {
      before: ['Domestic Electricity', 'Circuit Symbols & I-V Characteristics'],
      current: 'Electrical Power',
      after: ['The National Grid', 'Energy and efficiency'],
    },

    workedExample: {
      title: 'Finding power dissipated using P = I²R',
      equation: 'P = I² × R',
      context: 'A current of 5 A flows through a resistor of 4 Ω. Calculate the power dissipated.',
      steps: [
        {
          step: 1,
          action: 'Write what you know',
          content: 'I = 5 A, R = 4 Ω',
          annotation: 'Use P = I²R when you are given current and resistance but not voltage. This is common in National Grid questions.',
        },
        {
          step: 2,
          action: 'Write the equation',
          content: 'P = I² × R',
          annotation: 'This equation is on the formula sheet. The key feature: power goes up with the square of current - doubling I multiplies P by 4.',
        },
        {
          step: 3,
          action: 'Square the current',
          content: 'I² = 5² = 25',
          annotation: 'Common error: multiplying I by 2 instead of squaring it. I² means I × I, not 2 × I.',
        },
        {
          step: 4,
          action: 'Multiply by R',
          content: 'P = 25 × 4 = 100',
          annotation: 'Sense check: 25 × 4 = 100. A current of 5 A through 4 Ω producing 100 W is physically plausible.',
        },
        {
          step: 5,
          action: 'State with unit',
          content: 'P = 100 W',
          annotation: 'Unit is watts (W). This component transfers 100 joules of energy every second - mostly as heat.',
        },
      ],
      misconceptionAfter: {
        claim: 'Doubling the current doubles the power.',
        reality: 'Power depends on current squared (P = I²R). Doubling the current multiplies the power by 4, not 2. This is why even a small increase in current causes a large increase in heating.',
        visual: 'Think of the current as the side of a square: if the side doubles from 1 to 2, the area (power) goes from 1 to 4 - four times bigger, not twice.',
      },
    },

    guidedPractice: {
      tier1: {
        question: 'A device has a current of 4 A flowing through it and a voltage of 12 V across it. Find the power.',
        allSteps: [
          'Step 1: Write what you know - I = 4 A, V = 12 V',
          'Step 2: Write the equation - P = IV',
          'Step 3: Substitute - P = 4 × 12',
          '??? - Calculate P',
        ],
        missingStep: 3,
        missingHint: 'Calculate: 4 × 12 = ?',
        answer: 48,
        answerUnit: 'W',
      },
      tier2: {
        question: 'A current of 3 A flows through a resistor of 8 Ω. Calculate the power dissipated.',
        shownEquation: 'P = I² × R',
        shownStep1: 'Step 1: I = 3 A, R = 8 Ω, so I² = 9',
        hint: 'Calculate: 9 × 8 = ?',
        answer: 72,
        answerUnit: 'W',
      },
      tier3: {
        question: 'A 60 W bulb is switched on for 5 minutes. How much energy does it transfer?',
        hint: 'Use E = Pt. Convert time to seconds first.',
        methodHint: 'Start with E = Pt. P = 60 W. Convert t: 5 minutes = 5 × 60 = 300 s. Then multiply P × t.',
        answer: 18000,
        answerUnit: 'J',
      },
    },

    summary: {
      equation: 'P = IV | P = I²R | E = Pt',
      sentence: 'Power is the rate of energy transfer in watts - use P = IV when you have voltage, P = I²R when you only have current and resistance, and E = Pt to find total energy over a time period.',
      promptText: 'Explain to a friend why doubling the current in a resistor does not just double the power - what actually happens, and why does it matter for electricity transmission?',
    },

    sessionRecap: [
      'P = IV: power in watts = current × voltage. A 3 A current at 12 V produces 36 W.',
      'P = I²R: power increases with the square of current. Double the current - four times the power wasted as heat.',
      'E = Pt: total energy in joules = power × time in seconds. A 60 W bulb for 300 s transfers 18,000 J.',
    ],
  },

  national_grid: {
    id: 'national_grid',
    module: 'Electricity',
    moduleColor: EC,
    course: 'combined',
    title: 'The National Grid',
    subtitle: 'Efficient Electricity Transmission',
    description: 'The National Grid distributes electricity from power stations to consumers. Step-up transformers increase voltage before long-distance transmission, reducing current. Since power loss = I²R, lower current means far less energy wasted as heat in cables. Step-down transformers then reduce voltage to safe levels for homes (230 V). Transformers only work with alternating current (AC).',
    lessonVisual: NationalGridLesson,
    ideaVisual: NationalGridIdea,
    realityVisual: NationalGridReality,
    question: 'Why is electricity transmitted at high voltage in the National Grid?',
    questionSubtitle: 'Think about the relationship between current and power loss',
    options: [
      'High voltage makes electricity travel faster',
      'High voltage means lower current, reducing power loss in cables (P = I²R)',
      'High voltage is safer for long distances',
      'High voltage prevents the cables from overheating by increasing resistance',
    ],
    correctAnswer: 1,
    keywords: ['national grid', 'step-up transformer', 'step-down transformer', 'transmission', 'power loss', 'P = I²R', 'high voltage', 'low current', 'alternating current', 'efficiency'],
    sentenceStarters: [
      'The National Grid uses high voltage because...',
      'A step-up transformer increases voltage so that...',
      'Power loss in cables is given by P = I²R, so...',
      'Transformers only work with AC because...',
      'A step-down transformer is needed at the consumer end because...',
    ],
    modelAnswers: [
      'The National Grid uses high voltage because **high voltage means low current (for the same power), and since P_loss = I²R, less current means far less energy wasted as heat in cables**.',
      'A step-up transformer increases voltage so that **the current in transmission lines is very small, minimising resistive heating losses over long distances**.',
      'Power loss in cables is given by P = I²R, so **doubling the current quadruples the power lost — high voltage keeps current low to minimise this**.',
      'Transformers only work with AC because **a changing magnetic flux is needed to induce a voltage in the secondary coil — DC creates a constant flux with no induction**.',
      'A step-down transformer is needed at the consumer end because **400,000 V would be lethal — it reduces voltage to 230 V for safe use in homes**.',
    ],
    misconception: 'High voltage is not used because it is safer — it is actually more dangerous. It is used because it reduces current, which reduces energy loss (P = I²R).',
    concept: 'P_loss = I²R means power wasted in cables depends on current squared. Step-up transformers reduce current for transmission; step-down transformers make it safe for consumers. Only works with AC.',

    // -- 9-STEP LESSON DATA ----------------------------------------------------

    hook: {
      hookFact: 'The UK transmits electricity at up to 400,000 V across the country. If the same power were transmitted at 230 V (normal mains voltage), the current would need to be over 1700 times larger - and the cables would vaporise within metres due to resistive heating.',
      hookQuestion: 'Power stations are often far from cities. What problem does that create, and what would you need to solve it?',
      hookEmoji: '🔋',
    },

    lessonKeywords: [
      {
        word: 'Step-up transformer',
        symbol: '',
        unit: '',
        definition: 'Increases voltage (and decreases current proportionally) before electricity is transmitted over long distances.',
        everydayNote: 'Located at the power station exit - takes 25,000 V up to 400,000 V to reduce the current in transmission lines.',
      },
      {
        word: 'Step-down transformer',
        symbol: '',
        unit: '',
        definition: 'Decreases voltage to safe levels at the consumer end of the grid.',
        everydayNote: 'The small green metal boxes in residential streets are step-down transformers, reducing 11,000 V to 230 V for homes.',
      },
      {
        word: 'Power loss in cables',
        symbol: 'P_loss',
        unit: 'W',
        definition: 'Energy wasted as heat in transmission cables: P_loss = I²R.',
        everydayNote: 'Because of the squared relationship, halving the current reduces cable heating to one quarter - this is the core reason for using high voltage.',
      },
      {
        word: 'Alternating current (AC)',
        symbol: 'AC',
        unit: '',
        definition: 'Current that reverses direction periodically - the only type that can be transformed to different voltages.',
        everydayNote: 'Transformers work by changing magnetic fields. DC creates a static field with no change, so no voltage is induced in the secondary coil.',
      },
    ],

    prerequisiteCheck: {
      questions: [
        {
          question: 'Power lost in a cable is given by P = I²R. If the current is 10 A and cable resistance is 2 Ω, what is the power loss?',
          answers: ['20 W', '200 W', '40 W', '100 W'],
          correct: 1,
          feedback: 'P = I²R = 10² × 2 = 100 × 2 = 200 W. Squaring the current is the critical step - this is exactly the calculation used to compare transmission losses at different voltages.',
        },
        {
          question: 'A transformer has 100 turns on the primary coil and 1000 turns on the secondary. What happens to the voltage?',
          answers: ['It decreases by a factor of 10', 'It stays the same', 'It increases by a factor of 10', 'It doubles'],
          correct: 2,
          feedback: 'The turns ratio is 1:10, so the secondary voltage is 10 times the primary. More turns on the secondary = step-up transformer.',
        },
      ],
    },

    topicMapHint: {
      before: ['Electrical Power', 'Domestic Electricity'],
      current: 'The National Grid',
      after: ['Energy resources', 'Electromagnetic induction'],
    },

    workedExample: {
      title: 'Comparing power loss at low and high transmission voltage using P_loss = I²R',
      equation: 'P_loss = I² × R',
      context: 'A power station outputs 10,000,000 W. Cable resistance = 2 Ω. Compare power loss when transmitting at 25,000 V versus 400,000 V.',
      steps: [
        {
          step: 1,
          action: 'Find current at 25,000 V',
          content: 'I = P/V = 10,000,000 / 25,000 = 400 A',
          annotation: 'Use I = P/V to find transmission current. Power is fixed - only voltage and current change.',
        },
        {
          step: 2,
          action: 'Calculate power loss at 400 A',
          content: 'P_loss = 400² × 2 = 160,000 × 2 = 320,000 W',
          annotation: '320,000 W wasted - that is 3.2% of the total power, just in cable heating.',
        },
        {
          step: 3,
          action: 'Find current at 400,000 V',
          content: 'I = P/V = 10,000,000 / 400,000 = 25 A',
          annotation: 'Step-up transformer reduces current from 400 A to 25 A - a factor of 16.',
        },
        {
          step: 4,
          action: 'Calculate power loss at 25 A',
          content: 'P_loss = 25² × 2 = 625 × 2 = 1250 W',
          annotation: '1250 W wasted - compared to 320,000 W before. The current dropped by 16, so power loss dropped by 16² = 256 times.',
        },
        {
          step: 5,
          action: 'State the conclusion',
          content: 'High voltage reduces power loss from 320,000 W to 1250 W',
          annotation: 'This is why every national grid in the world uses high-voltage transmission.',
        },
      ],
      misconceptionAfter: {
        claim: 'High voltage is used because it makes electricity travel faster or further.',
        reality: 'Electricity always travels at close to the speed of light regardless of voltage. High voltage is used purely because it reduces current, and lower current means far less energy wasted as heat (P = I²R).',
        visual: 'Imagine pumping water through a leaky pipe: the leak rate depends on the flow rate squared. Use a thinner flow at high pressure and most water arrives; use a gushing low-pressure flow and most leaks away.',
      },
    },

    guidedPractice: {
      tier1: {
        question: 'A transmission cable has resistance 5 Ω and carries a current of 10 A. Find the power loss.',
        allSteps: [
          'Step 1: Write what you know - I = 10 A, R = 5 Ω',
          'Step 2: Write the equation - P_loss = I² × R',
          'Step 3: Square the current - I² = 10² = 100',
          '??? - Calculate P_loss',
        ],
        missingStep: 3,
        missingHint: 'Calculate: 100 × 5 = ?',
        answer: 500,
        answerUnit: 'W',
      },
      tier2: {
        question: 'A cable carries 50 A and has resistance 3 Ω. Calculate the power wasted as heat.',
        shownEquation: 'P_loss = I² × R',
        shownStep1: 'Step 1: I = 50 A, R = 3 Ω, so I² = 2500',
        hint: 'Calculate: 2500 × 3 = ?',
        answer: 7500,
        answerUnit: 'W',
      },
      tier3: {
        question: 'Current in a cable doubles from 5 A to 10 A. Cable resistance = 4 Ω. What is the new power loss?',
        hint: 'Use P_loss = I²R with the new current of 10 A.',
        methodHint: 'Calculate P = I²R with I = 10 A and R = 4 Ω. Square 10 first, then multiply by 4.',
        answer: 400,
        answerUnit: 'W',
      },
    },

    summary: {
      equation: 'P_loss = I²R',
      sentence: 'Power wasted in transmission cables depends on current squared - stepping up voltage reduces current, so far less energy is lost as heat over long distances.',
      promptText: 'Explain to a friend why the National Grid uses 400,000 V rather than the 230 V that comes out of a household socket.',
    },

    sessionRecap: [
      'P_loss = I²R: power wasted in cables goes up with the square of current. Double the current - four times the waste.',
      'Step-up transformers (at power stations) increase voltage, reduce current, and so dramatically cut cable losses.',
      'Step-down transformers reduce voltage back to 230 V for homes. Transformers only work with AC.',
    ],
  },

  static_electricity: {
    id: 'static_electricity', module: 'Electricity', moduleColor: EC, course: 'physics-only',
    title: 'Static Electricity',
    subtitle: 'Charging by Friction, Electric Fields & Discharge',
    description: 'Static electricity is caused by the transfer of electrons between materials when rubbed together. The material that gains electrons becomes negatively charged; the one that loses electrons becomes positively charged. Like charges repel; unlike charges attract. An electric field is the region around a charged object where another charge experiences a force. Electric field lines point from positive to negative (in the direction a positive charge would move). Around an isolated positive charge, field lines radiate outward; around a negative charge, they point inward. Between two parallel oppositely-charged plates, the field is uniform (parallel lines). Large charge builds up on storm clouds — lightning is rapid discharge.',
    lessonVisual: StaticElectricityLesson, ideaVisual: StaticElectricityIdea, realityVisual: StaticElectricityReality,
    question: 'A plastic rod is rubbed with a cloth. The rod becomes negatively charged. What has happened?',
    questionSubtitle: 'Think about which particles move when materials are rubbed together',
    options: ['Protons moved from cloth to rod', 'Electrons moved from cloth to rod', 'New electrons were created by friction', 'Neutrons transferred between materials'],
    correctAnswer: 1,
    keywords: ['static electricity', 'electrons', 'friction', 'negative charge', 'positive charge', 'transfer', 'electric field', 'field lines', 'repel', 'attract', 'insulator', 'discharge', 'uniform field'],
    sentenceStarters: ['The rod is negatively charged because it has...', 'Electrons transferred from the cloth to the rod, so...', 'Electric field lines show the direction a positive charge would move...', 'Like charges repel means that two negative objects will...', 'The cloth must be positively charged because...'],
    modelAnswers: [
      'The rod is negatively charged because it has **gained extra electrons from the cloth**.',
      'Electrons transferred from the cloth to the rod, so **the rod has more electrons (negative) and the cloth has fewer (positive)**.',
      'Electric field lines show the direction **a positive test charge would move — they go from positive to negative**.',
      'Like charges repel means that two negative objects will **push each other apart with an electrostatic force**.',
      'The cloth must be positively charged because **it lost electrons to the rod — it now has more protons than electrons**.',
    ],
    misconception: 'Friction does not create charge — it only transfers electrons from one material to the other. Electric field lines never cross.',
    concept: 'Electrons move from cloth to rod. Rod → negative; cloth → positive. Electric field lines go from + to −, showing direction a positive charge would be pushed. Between parallel plates, the field is uniform — equally-spaced parallel lines.',

    // -- 9-STEP LESSON DATA ----------------------------------------------------

    hook: {
      hookFact: 'Van de Graaff generators in school labs build up to around 300,000 V - enough to make hair stand on end. That same charge-separation process, scaled up massively in storm clouds, produces lightning bolts that briefly heat surrounding air to 30,000 K: five times hotter than the surface of the Sun.',
      hookQuestion: 'When you pull a jumper off over your head in the dark, you sometimes see sparks. What do you think is happening, and where does the charge come from?',
      hookEmoji: '⚡',
    },

    lessonKeywords: [
      {
        word: 'Static electricity',
        symbol: '',
        unit: '',
        definition: 'A build-up of charge on an insulating surface, caused by the transfer of electrons from one material to another during friction.',
        everydayNote: 'Rubbing a balloon on a woolly jumper transfers electrons to the balloon, giving it a negative charge - enough to stick to a wall.',
      },
      {
        word: 'Electron transfer',
        symbol: '',
        unit: '',
        definition: 'When two materials are rubbed together, electrons (not protons) move from one surface to the other - protons are fixed in atomic nuclei.',
        everydayNote: 'Rubbing a plastic rod with cloth: the cloth loses electrons (becomes positive); the rod gains them (becomes negative). Charge is conserved - total stays the same.',
      },
      {
        word: 'Electric field',
        symbol: 'E',
        unit: 'N/C',
        definition: 'The region around a charged object where another charge experiences a force. Field strength E = F/Q (force per unit charge).',
        everydayNote: 'Just as a gravitational field pulls masses together, an electric field exerts forces on charges - pulling unlike charges together and pushing like charges apart.',
      },
      {
        word: 'Electric field lines',
        symbol: '',
        unit: '',
        definition: 'Lines drawn to show the direction of an electric field - they point from positive to negative, in the direction a positive test charge would move.',
        everydayNote: 'Around an isolated positive charge, field lines radiate outward like spokes. Between two parallel plates, they are evenly spaced parallel lines - this is a uniform field.',
      },
      {
        word: 'Uniform electric field',
        symbol: '',
        unit: '',
        definition: 'A field of constant strength and direction throughout a region, produced between two parallel oppositely charged plates.',
        everydayNote: 'The field between the plates of a capacitor or in a cathode ray tube is uniform - a charged particle experiences the same force wherever it sits between the plates.',
      },
    ],

    prerequisiteCheck: {
      questions: [
        {
          question: 'A plastic rod is rubbed with a cloth and the rod becomes negatively charged. What has happened?',
          answers: ['Protons moved from cloth to rod', 'Electrons moved from rod to cloth', 'Electrons moved from cloth to rod', 'Neutrons transferred during rubbing'],
          correct: 2,
          feedback: 'Electrons moved from the cloth to the rod. The rod gained electrons so it is negative; the cloth lost electrons so it is positive. Protons are fixed in nuclei and never move during friction.',
        },
        {
          question: 'Two charged rods repel each other. What can you conclude?',
          answers: ['One is positive and one is negative', 'Both have the same type of charge', 'One is charged and one is neutral', 'The charges are equal in size'],
          correct: 1,
          feedback: 'Like charges repel, unlike charges attract. If both rods repel, they must both carry the same type of charge - either both positive or both negative.',
        },
      ],
    },

    topicMapHint: {
      before: ['Electrical Power', 'Charge and current'],
      current: 'Static Electricity',
      after: ['Electromagnetic induction', 'Electric fields (A-level)'],
    },

    workedExample: {
      title: 'Finding electric field strength using E = F / Q',
      equation: 'E = F / Q',
      context: 'A small charge of 0.002 C placed between two parallel plates experiences a force of 0.006 N. Calculate the electric field strength.',
      steps: [
        {
          step: 1,
          action: 'Write what you know',
          content: 'F = 0.006 N, Q = 0.002 C',
          annotation: 'Electric field strength E is defined as force per unit charge. Identify the force acting on the known charge.',
        },
        {
          step: 2,
          action: 'Write the equation',
          content: 'E = F / Q',
          annotation: 'E = F/Q gives field strength in newtons per coulomb (N/C). This equation may or may not be on the formula sheet - worth memorising.',
        },
        {
          step: 3,
          action: 'Substitute values',
          content: 'E = 0.006 / 0.002',
          annotation: 'Common error: dividing Q by F instead of F by Q. The field E is force divided by charge, not charge divided by force.',
        },
        {
          step: 4,
          action: 'Calculate',
          content: 'E = 3',
          annotation: 'Sense check: 0.006 ÷ 0.002 = 6 ÷ 2 = 3. That is straightforward if you multiply both numbers by 1000 first.',
        },
        {
          step: 5,
          action: 'State with unit',
          content: 'E = 3 N/C',
          annotation: 'Unit is newtons per coulomb (N/C). This means every coulomb of charge placed here experiences a 3 N force.',
        },
      ],
      misconceptionAfter: {
        claim: 'Friction creates electric charge from nothing.',
        reality: 'Friction never creates charge - it only transfers electrons from one material to the other. The total charge across both objects stays exactly the same before and after rubbing. This is conservation of charge.',
        visual: 'Think of electrons like coins moving between two pockets. Moving coins from left pocket to right pocket changes both balances, but the total number of coins stays the same.',
      },
    },

    guidedPractice: {
      tier1: {
        question: 'A charge of 0.002 C in an electric field experiences a force of 0.006 N. Find the electric field strength.',
        allSteps: [
          'Step 1: Write what you know - F = 0.006 N, Q = 0.002 C',
          'Step 2: Write the equation - E = F / Q',
          'Step 3: Substitute - E = 0.006 / 0.002',
          '??? - Calculate E',
        ],
        missingStep: 3,
        missingHint: 'Calculate: 0.006 ÷ 0.002 = ?',
        answer: 3,
        answerUnit: 'N/C',
      },
      tier2: {
        question: 'An electric field has strength 500 N/C. A charge placed in it experiences a force of 0.25 N. Find the size of the charge.',
        shownEquation: 'E = F / Q  ->  Q = F / E',
        shownStep1: 'Step 1: E = 500 N/C, F = 0.25 N',
        hint: 'Calculate: 0.25 ÷ 500 = ?',
        answer: 0.0005,
        answerUnit: 'C',
      },
      tier3: {
        question: 'An electric field has strength 200 N/C. A charge of 0.004 C is placed in it. What force does it experience?',
        hint: 'Rearrange E = F/Q to find F = EQ.',
        methodHint: 'Start with E = F/Q. Rearrange to F = E × Q. You know E = 200 N/C and Q = 0.004 C. Multiply them.',
        answer: 0.8,
        answerUnit: 'N',
      },
    },

    summary: {
      equation: 'E = F / Q',
      sentence: 'Electric field strength is force per unit charge - friction transfers electrons between materials, building up charge that creates a field exerting forces on other charges in the region.',
      promptText: 'Explain to a friend what happens when a plastic rod is rubbed with a cloth, where the charge comes from, and how that charge creates an electric field.',
    },

    sessionRecap: [
      'Friction transfers electrons (not protons). The object gaining electrons becomes negative; the object losing electrons becomes positive. Total charge is conserved.',
      'Electric field lines go from positive to negative - they show the direction a positive test charge would move. Between parallel plates, the field is uniform: parallel, equally spaced lines.',
      'E = F/Q: field strength in N/C. Rearrange to find force on a charge: F = EQ.',
    ],
  },
}
