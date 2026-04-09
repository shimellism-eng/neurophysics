import { motion, AnimatePresence } from 'motion/react'
import { useState, useEffect } from 'react'
import { Zap, Flame, Battery, Wind, Sun, Waves, AlertTriangle, Lightbulb, FlaskConical, ArrowDown, Maximize2, Magnet } from 'lucide-react'
import AtomIcon from '../components/AtomIcon'
import { IdeaCaption, RealityBadge, AnimBar, FormulaBox, Dot, MisconceptionCard, RealWorldCard, CompareRow } from './visuals-helpers'

const C = '#f97316'

// ─── 1. Energy Stores ────────────────────────────────────────────────────────
function EnergyStoresLesson() {
  const [selected, setSelected] = useState(null)
  const stores = [
    {
      label: 'Kinetic', Icon: Zap, color: '#3b82f6',
      def: 'Energy of moving objects  -  the faster and heavier, the more energy.',
      example: 'A rolling ball, a flying bird, a moving car',
      formula: 'Eₖ = ½mv²',
    },
    {
      label: 'Thermal', Icon: Flame, color: '#f97316',
      def: 'Energy stored due to the random vibration of particles.',
      example: 'A hot cup of tea, a radiator, body heat',
      formula: 'Q = mcΔT',
    },
    {
      label: 'Chemical', Icon: FlaskConical, color: '#fdc700',
      def: 'Energy stored in chemical bonds, released in reactions.',
      example: 'Food, batteries, petrol, explosives',
      formula: 'Released in reactions',
    },
    {
      label: 'Gravitational', Icon: ArrowDown, color: '#22c55e',
      def: 'Energy due to an object\'s height in a gravitational field.',
      example: 'A book on a shelf, a skier at the top of a slope',
      formula: 'Eₚ = mgh',
    },
    {
      label: 'Elastic', Icon: Maximize2, color: '#a855f7',
      def: 'Energy stored when an object is stretched or compressed.',
      example: 'A stretched rubber band, a compressed spring, a bent bow',
      formula: 'Eₑ = ½ke²',
    },
    {
      label: 'Nuclear', Icon: AtomIcon, color: '#ef4444',
      def: 'Energy stored in the nucleus of atoms  -  released by fission or fusion.',
      example: 'Nuclear power stations, the Sun, nuclear weapons',
      formula: 'E = mc²',
    },
    {
      label: 'Electrostatic', Icon: Zap, color: '#06b6d4',
      def: 'Energy stored between separated electric charges.',
      example: 'A charged capacitor, storm clouds before lightning',
      formula: 'W = QV',
    },
    {
      label: 'Magnetic', Icon: Magnet, color: '#ec4899',
      def: 'Energy stored in magnetic fields around magnets or wires.',
      example: 'Electromagnets, MRI machines, generators',
      formula: 'Stored in field lines',
    },
  ]

  const sel = selected !== null ? stores[selected] : null

  return (
    <div className="w-full flex flex-col gap-2 px-3 pt-3 pb-3">
      {/* 4×2 icon grid */}
      <div className="grid grid-cols-4 gap-2">
        {stores.map((s, i) => {
          const active = selected === i
          return (
            <motion.button
              key={i}
              onClick={() => setSelected(active ? null : i)}
              whileTap={{ scale: 0.92 }}
              className="flex flex-col items-center gap-1 rounded-[12px] py-2.5 px-1"
              style={{
                background: active ? `${s.color}20` : '#1a2640',
                border: `1.5px solid ${active ? s.color : '#253348'}`,
              }}
            >
              <div
                className="flex items-center justify-center rounded-[8px]"
                style={{ width: 32, height: 32, background: `${s.color}18` }}
              >
                <s.Icon size={17} color={s.color} strokeWidth={1.8} />
              </div>
              <span style={{
                fontSize: 9,
                fontWeight: 700,
                color: active ? s.color : '#a8b8cc',
                lineHeight: 1.2,
                textAlign: 'center',
              }}>
                {s.label}
              </span>
            </motion.button>
          )
        })}
      </div>

      {/* Detail panel */}
      <AnimatePresence mode="wait">
        {sel ? (
          <motion.div
            key={selected}
            className="rounded-[14px] px-3 py-3"
            style={{ background: `${sel.color}12`, border: `1px solid ${sel.color}40` }}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
          >
            {/* Header */}
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center justify-center rounded-[7px]" style={{ width: 26, height: 26, background: `${sel.color}20` }}>
                <sel.Icon size={13} color={sel.color} strokeWidth={2} />
              </div>
              <span style={{ fontSize: 13, fontWeight: 700, color: sel.color }}>{sel.label} Energy</span>
            </div>
            {/* Definition */}
            <p style={{ fontSize: 11, color: '#cad5e2', lineHeight: 1.5, marginBottom: 8 }}>{sel.def}</p>
            {/* Example */}
            <div className="flex items-start gap-1.5 mb-2.5">
              <span style={{ fontSize: 11 }}>🌍</span>
              <p style={{ fontSize: 10, color: '#a8b8cc', lineHeight: 1.4 }}>{sel.example}</p>
            </div>
            {/* Formula */}
            <div className="inline-flex items-center px-2.5 py-1.5 rounded-[8px]" style={{ background: `${sel.color}18`, border: `0.75px solid ${sel.color}40` }}>
              <span style={{ fontSize: 12, fontFamily: 'monospace', fontWeight: 700, color: sel.color }}>{sel.formula}</span>
            </div>
          </motion.div>
        ) : (
          <motion.p
            key="hint"
            style={{ fontSize: 10, color: '#a8b8cc', textAlign: 'center', paddingTop: 4 }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          >
            Tap a store to see its definition, example &amp; formula
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}
// ─── Energy Pathways ──────────────────────────────────────────────────────────
function EnergyPathwaysLesson() {
  const [active, setActive] = useState(null)
  const pathways = [
    {
      id: 'mechanical', label: 'Mechanical', Icon: Wind, color: '#3b82f6',
      desc: 'A force doing work  -  pushes, pulls, and compressions all transfer energy mechanically.',
      example: 'Pushing a box, stretching a spring, a bat hitting a ball',
      stores: 'Kinetic ↔ Elastic ↔ Gravitational PE',
    },
    {
      id: 'electrical', label: 'Electrical', Icon: Zap, color: '#fdc700',
      desc: 'Charge flowing through a potential difference (voltage) carries energy along wires.',
      example: 'Current through a wire powering a motor, bulb, or heater',
      stores: 'Chemical → Electrical → Thermal / Light',
    },
    {
      id: 'heating', label: 'Heating', Icon: Flame, color: '#f97316',
      desc: 'Energy moves from hotter regions to cooler ones by conduction, convection or radiation.',
      example: 'Metal rod in a flame, boiling water, body heat spreading',
      stores: 'Thermal → Thermal (spreads to surroundings)',
    },
    {
      id: 'radiation', label: 'Radiation', Icon: Sun, color: '#ec4899',
      desc: 'Energy carried by electromagnetic waves (light, infrared, UV) or sound waves.',
      example: 'Sunlight warming Earth, infrared from a heater, sound from a speaker',
      stores: 'Nuclear / Thermal → Radiation → Thermal / Chemical',
    },
  ]

  const sel = active !== null ? pathways[active] : null

  return (
    <div className="w-full flex flex-col gap-2 px-3 pt-3 pb-3">
      <div className="grid grid-cols-2 gap-2">
        {pathways.map((p, i) => {
          const isActive = active === i
          return (
            <motion.button
              key={p.id}
              onClick={() => setActive(isActive ? null : i)}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2.5 rounded-[12px] p-3 text-left"
              style={{
                background: isActive ? `${p.color}20` : '#1a2640',
                border: `1.5px solid ${isActive ? p.color : '#253348'}`,
              }}
            >
              <div className="flex items-center justify-center rounded-[8px] shrink-0"
                style={{ width: 34, height: 34, background: `${p.color}18` }}>
                <p.Icon size={18} color={p.color} strokeWidth={1.8} />
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: isActive ? p.color : '#f8fafc' }}>{p.label}</div>
                <div style={{ fontSize: 9, color: '#a8b8cc', lineHeight: 1.3 }}>
                  {isActive ? 'tap to close' : 'tap to explore'}
                </div>
              </div>
            </motion.button>
          )
        })}
      </div>

      <AnimatePresence mode="wait">
        {sel ? (
          <motion.div
            key={active}
            className="rounded-[14px] px-3 py-3"
            style={{ background: `${sel.color}12`, border: `1px solid ${sel.color}40` }}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center justify-center rounded-[7px]"
                style={{ width: 26, height: 26, background: `${sel.color}20` }}>
                <sel.Icon size={13} color={sel.color} strokeWidth={2} />
              </div>
              <span style={{ fontSize: 13, fontWeight: 700, color: sel.color }}>{sel.label} Pathway</span>
            </div>
            <p style={{ fontSize: 11, color: '#cad5e2', lineHeight: 1.5, marginBottom: 8 }}>{sel.desc}</p>
            <div className="flex items-start gap-1.5 mb-2">
              <span style={{ fontSize: 11 }}>🌍</span>
              <p style={{ fontSize: 10, color: '#a8b8cc', lineHeight: 1.4 }}>{sel.example}</p>
            </div>
            <div className="flex items-start gap-1.5">
              <span style={{ fontSize: 11 }}>🔄</span>
              <p style={{ fontSize: 10, color: sel.color, lineHeight: 1.4, fontWeight: 600 }}>{sel.stores}</p>
            </div>
          </motion.div>
        ) : (
          <motion.p
            key="hint"
            style={{ fontSize: 10, color: '#a8b8cc', textAlign: 'center', paddingTop: 4 }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          >
            Tap a pathway to see how energy moves between stores
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}
function EnergyPathwaysIdea() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 px-4 py-3">
      <MisconceptionCard
        wrong="A pathway carries energy from A to B — the pathway itself stores the energy while it travels."
        right="Pathways are the mechanism of transfer only. Energy is always held in a store, not in the pathway."
        wrongLabel="Common confusion"
        rightLabel="The distinction"
      />
    </div>
  )
}
function EnergyPathwaysReality() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 px-4 py-3">
      <RealWorldCard icon="🚴" title="Cycling uphill" desc="Mechanical pathway — muscles do work via a force, transferring chemical energy from food into kinetic and gravitational PE." color="#3b82f6" delay={0} />
      <RealWorldCard icon="🔌" title="Phone charging" desc="Electrical pathway — current flows through the wire, carrying energy from the mains into the chemical store of the battery." color="#fdc700" delay={0.1} />
      <RealWorldCard icon="☀️" title="Sun warming Earth" desc="Radiation pathway — infrared waves carry energy from the Sun's nuclear store to Earth's thermal store across 150 million km." color="#f97316" delay={0.2} />
    </div>
  )
}
function EnergyStoresIdea() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 px-4 py-3">
      <MisconceptionCard
        wrong="Energy is 'used up' and disappears when things slow down or cool down."
        right="Energy always moves between stores — it is never created or destroyed (conservation of energy)."
      />
    </div>
  )
}
function EnergyStoresReality() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 px-4 py-3">
      <RealWorldCard icon="🚗" title="Petrol engine" desc="Chemical → kinetic + thermal stores. Most energy dissipates as heat — that's why engines have coolants." color="#f97316" delay={0} />
      <RealWorldCard icon="💡" title="LED bulb" desc="Chemical (battery) → electrical → light. Far less thermal waste than an incandescent bulb." color="#fdc700" delay={0.1} />
      <RealWorldCard icon="🌊" title="Hydroelectric dam" desc="Gravitational PE of water → kinetic → electrical. Highly efficient — ~90% of stored energy used." color="#22c55e" delay={0.2} />
    </div>
  )
}

// ─── 2. Energy Equations ─────────────────────────────────────────────────────
function EnergyEquationsLesson() {
  const [tab, setTab] = useState(0)
  const [mKE, setMKE] = useState(5)
  const [vKE, setVKE] = useState(6)
  const [mGPE, setMGPE] = useState(10)
  const [hGPE, setHGPE] = useState(20)
  const [kEl, setKEl] = useState(50)
  const [eEl, setEEl] = useState(0.5)
  const keVal = (0.5 * mKE * vKE * vKE).toFixed(1)
  const gpeVal = (mGPE * 10 * hGPE).toFixed(0)
  const eelVal = (0.5 * kEl * eEl * eEl).toFixed(2)
  const tabs = ['Kinetic', 'Gravitational', 'Elastic']
  const colors = [C, '#22c55e', '#a855f7']
  return (
    <div className="w-full h-full flex flex-col justify-center gap-2 px-3 py-2">
      <div className="flex gap-1.5 justify-center">
        {tabs.map((t, i) => (
          <button key={i} onClick={() => setTab(i)}
            className="px-3 py-1 rounded-[8px] text-xs font-semibold"
            style={{ background: tab === i ? `${colors[i]}20` : '#1d293d', color: tab === i ? colors[i] : '#a8b8cc', border: `1px solid ${tab === i ? colors[i] : '#2d3e55'}` }}>
            {t}
          </button>
        ))}
      </div>
      {tab === 0 && (
        <div className="flex flex-col gap-2">
          <FormulaBox formula="Eₖ = ½mv²" color={C} />
          <div className="rounded-[12px] p-2.5" style={{ background: `${C}10`, border: `1px solid ${C}30` }}>
            <div className="flex justify-between text-xs mb-0.5"><span style={{ color: '#a8b8cc' }}>Mass m</span><span style={{ color: C, fontWeight: 700 }}>{mKE} kg</span></div>
            <input type="range" min="1" max="50" value={mKE} onChange={e => setMKE(+e.target.value)} className="w-full mb-1.5" style={{ accentColor: C }} />
            <div className="flex justify-between text-xs mb-0.5"><span style={{ color: '#a8b8cc' }}>Speed v</span><span style={{ color: '#3b82f6', fontWeight: 700 }}>{vKE} m/s</span></div>
            <input type="range" min="1" max="20" value={vKE} onChange={e => setVKE(+e.target.value)} className="w-full" style={{ accentColor: '#3b82f6' }} />
            <div className="flex justify-between mt-2 pt-1.5 text-sm font-bold" style={{ borderTop: '1px solid #1d293d' }}>
              <span style={{ color: '#a8b8cc' }}>Eₖ =</span>
              <motion.span key={keVal} style={{ color: C }} initial={{ scale: 0.85 }} animate={{ scale: 1 }}>{keVal} J</motion.span>
            </div>
          </div>
        </div>
      )}
      {tab === 1 && (
        <div className="flex flex-col gap-2">
          <FormulaBox formula="Eₚ = mgh" color="#22c55e" />
          <div className="rounded-[12px] p-2.5" style={{ background: '#22c55e10', border: '1px solid #22c55e30' }}>
            <div className="flex justify-between text-xs mb-0.5"><span style={{ color: '#a8b8cc' }}>Mass m</span><span style={{ color: '#22c55e', fontWeight: 700 }}>{mGPE} kg</span></div>
            <input type="range" min="1" max="50" value={mGPE} onChange={e => setMGPE(+e.target.value)} className="w-full mb-1.5" style={{ accentColor: '#22c55e' }} />
            <div className="flex justify-between text-xs mb-0.5"><span style={{ color: '#a8b8cc' }}>Height h</span><span style={{ color: '#3b82f6', fontWeight: 700 }}>{hGPE} m</span></div>
            <input type="range" min="1" max="100" value={hGPE} onChange={e => setHGPE(+e.target.value)} className="w-full" style={{ accentColor: '#3b82f6' }} />
            <div className="flex justify-between mt-2 pt-1.5 text-sm font-bold" style={{ borderTop: '1px solid #1d293d' }}>
              <span style={{ color: '#a8b8cc' }}>Eₚ =</span>
              <motion.span key={gpeVal} style={{ color: '#22c55e' }} initial={{ scale: 0.85 }} animate={{ scale: 1 }}>{gpeVal} J</motion.span>
            </div>
          </div>
        </div>
      )}
      {tab === 2 && (
        <div className="flex flex-col gap-2">
          <FormulaBox formula="Eₑ = ½ke²" color="#a855f7" />
          <div className="rounded-[12px] p-2.5" style={{ background: '#a855f710', border: '1px solid #a855f730' }}>
            <div className="flex justify-between text-xs mb-0.5"><span style={{ color: '#a8b8cc' }}>Spring const k</span><span style={{ color: '#a855f7', fontWeight: 700 }}>{kEl} N/m</span></div>
            <input type="range" min="1" max="100" value={kEl} onChange={e => setKEl(+e.target.value)} className="w-full mb-1.5" style={{ accentColor: '#a855f7' }} />
            <div className="flex justify-between text-xs mb-0.5"><span style={{ color: '#a8b8cc' }}>Extension e</span><span style={{ color: '#3b82f6', fontWeight: 700 }}>{eEl} m</span></div>
            <input type="range" min="0.1" max="2" step="0.1" value={eEl} onChange={e => setEEl(+e.target.value)} className="w-full" style={{ accentColor: '#3b82f6' }} />
            <div className="flex justify-between mt-2 pt-1.5 text-sm font-bold" style={{ borderTop: '1px solid #1d293d' }}>
              <span style={{ color: '#a8b8cc' }}>Eₑ =</span>
              <motion.span key={eelVal} style={{ color: '#a855f7' }} initial={{ scale: 0.85 }} animate={{ scale: 1 }}>{eelVal} J</motion.span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
function EnergyEquationsIdea() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 px-4 py-3">
      <MisconceptionCard
        wrong="Doubling the speed of a car doubles its kinetic energy — so twice the speed needs twice the braking distance."
        right="Speed is squared in KE = ½mv². Doubling speed gives 4× the KE — needing 4× the braking distance, not 2×."
        wrongLabel="Dangerous assumption"
        rightLabel="The physics"
      />
    </div>
  )
}
function EnergyEquationsReality() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 px-4 py-3">
      <RealWorldCard icon="🚗" title="Car braking distance" desc="At 30 mph KE ≈ 135 kJ. At 60 mph (2× speed) KE ≈ 540 kJ — 4× greater. That's why speed limits save lives." color="#f97316" delay={0} />
      <RealWorldCard icon="🎿" title="Ski jumper" desc="GPE = mgh converts to KE on the slope. A 70 kg skier dropping 40 m gains 27 400 J of kinetic energy." color="#3b82f6" delay={0.1} />
      <RealWorldCard icon="🏹" title="Elastic catapult" desc="Eₑ = ½ke². A spring with k = 200 N/m stretched 0.3 m stores 9 J — all released as kinetic energy on launch." color="#a855f7" delay={0.2} />
    </div>
  )
}

// ─── 3. Efficiency ───────────────────────────────────────────────────────────
function EfficiencyLesson() {
  const [eff, setEff] = useState(60)
  const useful = eff
  const wasted = 100 - eff

  // ── Sankey geometry ──────────────────────────────────────────────
  const W = 260
  const svgH = 138
  const topY = 14
  const totalBandH = 62        // total band height (= 100 J)
  const splitX = 110           // where the band splits
  const arrowEndX = 238        // where useful arrow ends

  const usefulBH = Math.max(7, (eff / 100) * totalBandH)
  const wastedBH = Math.max(7, totalBandH - usefulBH)

  const ySplit   = topY + usefulBH            // useful / wasted divide
  const yBottom  = topY + usefulBH + wastedBH // bottom of full input band
  const xWRight  = splitX + wastedBH          // right edge of downward wasted band
  const xWMid    = (splitX + xWRight) / 2     // centre of downward wasted band
  const yWBot    = svgH - 16                  // bottom of downward band (before arrowhead)

  // Wasted path: inner-corner curve at splitX, vertical drop, down-arrow
  const wastedPath = [
    `M ${splitX} ${ySplit}`,
    `L ${xWRight} ${ySplit}`,
    `L ${xWRight} ${yBottom}`,
    `L ${xWRight} ${yWBot}`,
    `L ${xWMid} ${yWBot + 12}`,   // arrow tip (pointing down)
    `L ${splitX} ${yWBot}`,
    `L ${splitX} ${yBottom}`,
    'Z',
  ].join(' ')

  return (
    <div className="w-full h-full flex flex-col justify-center gap-2 px-3 py-2">
      <div className="px-4 py-3 rounded-[14px] flex items-center justify-center gap-2"
        style={{ background: '#00bc7d15', border: '1px solid #00bc7d50', fontFamily: "'Kalam', cursive", color: '#00bc7d' }}>
        <span style={{ fontSize: 18, fontWeight: 700, fontStyle: 'italic' }}>efficiency</span>
        <span style={{ fontSize: 20, fontWeight: 400 }}>=</span>
        <span style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
          <span style={{ fontSize: 13, fontStyle: 'italic', fontWeight: 700, paddingBottom: 2 }}>useful energy transferred</span>
          <span style={{ width: '100%', height: 1.5, background: '#00bc7d', borderRadius: 1 }} />
          <span style={{ fontSize: 13, fontStyle: 'italic', fontWeight: 700, paddingTop: 2 }}>total energy supplied</span>
        </span>
      </div>
      {/* Textbook-style Sankey diagram */}
      <svg width="100%" viewBox={`0 0 ${W} ${svgH}`} style={{ display: 'block', flex: 1, minHeight: 0 }}>
        {/* ── Input section: full green band left of split ── */}
        <rect x={0} y={topY} width={splitX} height={usefulBH + wastedBH}
          fill="#00bc7d40" stroke="#00bc7d" strokeWidth="1.2" />
        {/* ── Useful band (green) right of split → rightward arrow ── */}
        <polygon
          points={`${splitX},${topY} ${arrowEndX},${topY} ${arrowEndX + 14},${topY + usefulBH / 2} ${arrowEndX},${ySplit} ${splitX},${ySplit}`}
          fill="#00bc7d40" stroke="#00bc7d" strokeWidth="1.2"
        />
        {/* ── Wasted band (red): 90° bend at split → vertical drop ── */}
        <path d={wastedPath} fill="#ef444440" stroke="#ef4444" strokeWidth="1.2" />

        {/* ── Split divider line ── */}
        <line x1={splitX} y1={topY} x2={splitX} y2={yBottom} stroke="#1d293d" strokeWidth="1" strokeDasharray="3,2" />

        {/* ── Labels ── */}
        {/* Input label (left section) */}
        <text x={splitX / 2} y={topY - 4} textAnchor="middle" fill="#a8b8cc" fontSize={7.5}>Input: 100 J</text>
        {/* Useful label (above arrow on right) */}
        <text x={(splitX + arrowEndX) / 2} y={topY - 4} textAnchor="middle" fill="#00bc7d" fontSize={7.5} fontWeight="bold">Useful: {useful} J</text>
        {/* Wasted label (right of downward band) */}
        <text x={xWRight + 5} y={(yBottom + yWBot) / 2 + 4} fill="#ef4444" fontSize={7.5} dominantBaseline="middle">Wasted: {wasted} J</text>
      </svg>
      <div className="flex flex-col gap-1">
        <div className="flex justify-between text-xs">
          <span style={{ color: '#a8b8cc' }}>Efficiency: <span style={{ color: '#00bc7d', fontWeight: 700 }}>{eff}%</span></span>
          <span style={{ color: '#ef4444', fontSize: 10 }}>Wasted: {wasted} J</span>
        </div>
        <input type="range" min="10" max="90" value={eff} onChange={e => setEff(+e.target.value)} className="w-full" style={{ accentColor: '#00bc7d' }} />
      </div>
    </div>
  )
}
function EfficiencyIdea() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 px-4 py-3">
      <MisconceptionCard
        wrong="A well-engineered machine can reach 100% efficiency if we remove all friction and waste."
        right="The Second Law of Thermodynamics means energy always dissipates — no real machine can ever be 100% efficient."
        wrongLabel="Engineering myth"
        rightLabel="Thermodynamics"
      />
    </div>
  )
}
function EfficiencyReality() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 px-4 py-3">
      <RealWorldCard icon="💡" title="Incandescent vs LED" desc="Old bulbs are ~5% efficient — 95% of energy wasted as heat. LEDs are ~95% efficient — same brightness for 19× less waste." color="#fdc700" delay={0} />
      <RealWorldCard icon="🚂" title="Steam locomotives" desc="Only ~8% efficient — most energy lost boiling water and in friction. Modern electric trains reach ~85% efficiency." color="#f97316" delay={0.1} />
      <RealWorldCard icon="🫀" title="Human heart" desc="The human heart is ~25% efficient — a remarkable feat of biology, yet most energy still dissipates as body heat." color="#22c55e" delay={0.2} />
    </div>
  )
}

// ─── 4. Power ────────────────────────────────────────────────────────────────
function PowerLesson() {
  const [energy, setEnergy] = useState(2000)
  const [time, setTime] = useState(10)
  const power = (energy / time).toFixed(1)
  const powerNum = energy / time
  const devices = [
    { label: 'LED bulb', w: 10, color: '#fdc700' },
    { label: 'Phone charger', w: 20, color: '#22c55e' },
    { label: 'Kettle', w: 2000, color: '#ef4444' },
  ]
  const maxW = 2000
  return (
    <div className="w-full h-full flex flex-col justify-center gap-2 px-3 py-2">
      <div className="flex gap-2">
        <FormulaBox formula="P = E/t" color={C} />
        <FormulaBox formula="P = W/t" color="#3b82f6" />
      </div>
      <div className="rounded-[12px] p-2.5" style={{ background: `${C}10`, border: `1px solid ${C}30` }}>
        <div className="flex justify-between text-xs mb-0.5"><span style={{ color: '#a8b8cc' }}>Energy (J)</span><span style={{ color: C, fontWeight: 700 }}>{energy} J</span></div>
        <input type="range" min="100" max="10000" step="100" value={energy} onChange={e => setEnergy(+e.target.value)} className="w-full mb-1.5" style={{ accentColor: C }} />
        <div className="flex justify-between text-xs mb-0.5"><span style={{ color: '#a8b8cc' }}>Time (s)</span><span style={{ color: '#3b82f6', fontWeight: 700 }}>{time} s</span></div>
        <input type="range" min="1" max="100" step="1" value={time} onChange={e => setTime(+e.target.value)} className="w-full" style={{ accentColor: '#3b82f6' }} />
        <div className="flex justify-between mt-1.5 pt-1.5 font-bold text-sm" style={{ borderTop: '1px solid #1d293d' }}>
          <span style={{ color: '#a8b8cc' }}>Power</span>
          <motion.span key={power} style={{ color: C }} initial={{ scale: 0.85 }} animate={{ scale: 1 }}>
            {powerNum >= 1000 ? (powerNum / 1000).toFixed(2) + ' kW' : power + ' W'}
          </motion.span>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        {devices.map((d, i) => (
          <div key={i} className="flex items-center gap-2">
            <span style={{ fontSize: 9, color: '#a8b8cc', width: 72, flexShrink: 0 }}>{d.label}</span>
            <div className="flex-1 rounded-full" style={{ height: 7, background: '#1d293d' }}>
              <motion.div style={{ height: 7, borderRadius: 999, background: d.color, width: `${(d.w / maxW) * 100}%` }}
                initial={{ width: 0 }} animate={{ width: `${(d.w / maxW) * 100}%` }} transition={{ delay: i * 0.1 + 0.2 }} />
            </div>
            <span style={{ fontSize: 9, color: d.color, fontWeight: 700, width: 36, textAlign: 'right' }}>{d.w}W</span>
          </div>
        ))}
      </div>
      <div style={{ fontSize: 9, color: '#a8b8cc', textAlign: 'center' }}>1 kW = 1000 W · 1 kWh = using 1 kW for 1 hour</div>
    </div>
  )
}
function PowerIdea() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 px-4 py-3">
      <MisconceptionCard
        wrong="Power and energy are the same thing — a high-power device always uses more total energy."
        right="Power is the rate of energy transfer (P = E/t). A low-power device running for a long time can use more total energy than a high-power device running briefly."
        wrongLabel="Common mix-up"
        rightLabel="Rate vs total"
      />
    </div>
  )
}
function PowerReality() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 px-4 py-3">
      <RealWorldCard icon="🔋" title="Phone vs kettle" desc="A 2 000 W kettle boils in 2 min (240 kJ). A 5 W phone charger left on all night uses 3 600 J — the kettle is 67× more powerful but used far less total energy." color="#f97316" delay={0} />
      <RealWorldCard icon="🚀" title="Rocket engine" desc="Saturn V produced 180 GW — 180 billion watts. But it burned for only ~8 minutes, limiting total energy to a feasible amount." color="#3b82f6" delay={0.1} />
      <RealWorldCard icon="🧠" title="Human brain" desc="The brain runs on just 20 W — less than a dim bulb — yet processes more information per second than any supercomputer." color="#a855f7" delay={0.2} />
    </div>
  )
}

// ─── 5. Energy Resources ─────────────────────────────────────────────────────
function EnergyResourcesLesson() {
  const [selected, setSelected] = useState(null)
  const resources = [
    { name: 'Solar', color: '#fdc700', type: 'renewable', desc: 'Panels on roofs', pros: ['Free fuel', 'No CO₂'], cons: ['Varies with weather', 'Costly to install'] },
    { name: 'Wind', color: '#06b6d4', type: 'renewable', desc: 'Turbines', pros: ['Free fuel', 'No CO₂'], cons: ['Variable output', 'Noise / visual'] },
    { name: 'Nuclear', color: '#ef4444', type: 'non-renewable', desc: 'Uranium fission', pros: ['Very reliable', 'Low CO₂'], cons: ['Radioactive waste', 'Slow to build'] },
    { name: 'Fossil fuels', color: '#f97316', type: 'non-renewable', desc: 'Coal / oil / gas', pros: ['Reliable', 'Cheap short-term'], cons: ['CO₂ emissions', 'Finite supply'] },
    { name: 'Hydroelectric', color: '#22c55e', type: 'renewable', desc: 'Dam / reservoir', pros: ['Reliable', 'Controllable'], cons: ['Habitat disruption', 'Few sites'] },
    { name: 'Tidal', color: '#a855f7', type: 'renewable', desc: 'Tidal barrage', pros: ['Predictable', 'No CO₂'], cons: ['Few suitable sites', 'High cost'] },
  ]
  return (
    <div className="w-full h-full flex flex-col justify-center gap-2 px-3 py-2">
      <div className="grid grid-cols-3 gap-1.5">
        {resources.map((r, i) => (
          <motion.button key={i} whileTap={{ scale: 0.94 }}
            onClick={() => setSelected(selected === i ? null : i)}
            className="rounded-[10px] p-1.5 text-left"
            style={{ background: selected === i ? `${r.color}20` : '#1d293d', border: `1px solid ${selected === i ? r.color : '#2d3e55'}` }}>
            <div className="flex items-center gap-1 mb-0.5">
              <span style={{ fontSize: 8, fontWeight: 700, color: selected === i ? r.color : '#cad5e2' }}>{r.name}</span>
            </div>
            <div style={{ fontSize: 7.5, color: r.type === 'renewable' ? '#22c55e' : '#ef4444', fontWeight: 600, marginBottom: 2 }}>
              {r.type === 'renewable' ? '♻ Renewable' : '⚠ Non-renew'}
            </div>
            {selected === i && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
                <div style={{ fontSize: 7.5, color: '#a8b8cc', marginBottom: 2 }}>{r.desc}</div>
                {r.pros.map((p, j) => <div key={j} style={{ fontSize: 7, color: '#22c55e' }}>+ {p}</div>)}
                {r.cons.map((c, j) => <div key={j} style={{ fontSize: 7, color: '#ef4444' }}>− {c}</div>)}
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>
      <div style={{ fontSize: 9, color: '#a8b8cc', textAlign: 'center' }}>Tap each resource to see pros and cons</div>
    </div>
  )
}
function EnergyResourcesIdea() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 px-4 py-3">
      <MisconceptionCard
        wrong="Renewable energy is always better than fossil fuels — we should switch everything to renewables immediately."
        right="Each energy resource involves trade-offs: cost, reliability, land use, and environmental impact. A balanced mix is needed while the grid transitions."
        wrongLabel="Oversimplification"
        rightLabel="The trade-offs"
      />
    </div>
  )
}
function EnergyResourcesReality() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 px-4 py-3">
      <RealWorldCard icon="🇩🇰" title="Denmark — wind leader" desc="Wind turbines supply >50% of Denmark's electricity. But on calm days, they import from neighbouring coal plants." color="#06b6d4" delay={0} />
      <RealWorldCard icon="🇫🇷" title="France — nuclear baseload" desc="France gets ~70% of electricity from nuclear — very low CO₂, highly reliable, but produces radioactive waste for 10 000 years." color="#ef4444" delay={0.1} />
      <RealWorldCard icon="🌍" title="Global energy mix" desc="In 2023, fossil fuels still supplied ~80% of world energy. Transition requires massive investment in storage and grid infrastructure." color="#22c55e" delay={0.2} />
    </div>
  )
}

export const ENERGY_TOPICS = {
  energy_stores: {
    id: 'energy_stores', module: 'Energy', moduleColor: C, course: 'combined',
    title: 'Energy Stores', subtitle: 'Systems & Conservation of Energy',
    description: 'A system is an object or group of objects being studied. Energy is stored in kinetic, thermal, chemical, gravitational potential, elastic potential and nuclear stores. When a system changes, energy is transferred between stores - it is never created or destroyed (conservation of energy).',
    lessonVisual: EnergyStoresLesson, ideaVisual: EnergyStoresIdea, realityVisual: EnergyStoresReality,
    equations: [{ expr: 'KE = ½mv²', given: true }, { expr: 'Ep = mgh', given: true }, { expr: 'Ee = ½ke²', given: true }],
    question: 'A ball is thrown upward and slows down. Which energy store increases?',
    questionSubtitle: 'Think about what changes as height increases',
    options: ['Kinetic energy increases', 'Thermal energy increases', 'Gravitational potential energy increases', 'Elastic potential energy increases'],
    correctAnswer: 2,
    keywords: ['gravitational potential energy', 'kinetic energy', 'energy store', 'conservation', 'height', 'GPE = mgh', 'transfer', 'system'],
    sentenceStarters: ['As the ball rises, the gravitational potential energy...', 'Kinetic energy decreases because...', 'The energy store that increases is... because...', 'At maximum height, all kinetic energy has transferred to...', 'Using GPE = mgh, when height increases...'],
    modelAnswers: [
      'As the ball rises, the gravitational potential energy **increases because the ball gains height (GPE = mgh)**.',
      'Kinetic energy decreases because **the ball slows down as it converts KE into GPE**.',
      'The energy store that increases is **gravitational potential energy** because **height increases as the ball rises**.',
      'At maximum height, all kinetic energy has transferred to **gravitational potential energy  -  the ball is momentarily stationary**.',
      'Using GPE = mgh, when height increases **the GPE increases proportionally, so the answer is gravitational potential energy**.',
    ],
    misconception: 'Energy does not disappear when a ball slows down.',
    concept: 'As the ball rises and slows, kinetic energy is transferred to gravitational potential energy (GPE = mgh). At maximum height, all kinetic energy has converted to GPE.',

    // ── 9-STEP LESSON DATA ────────────────────────────────────────────────────

    hook: {
      hookFact: 'When a skydiver jumps from 4,000 m, their body stores enough gravitational potential energy to power a house for over an hour — all of it converts to kinetic energy before they open their parachute.',
      hookQuestion: 'Think about a rollercoaster at its highest point. What do you think is happening to its energy before it drops?',
      hookEmoji: '🎢',
    },

    lessonKeywords: [
      {
        word: 'Energy Store',
        symbol: 'E',
        unit: 'joules (J)',
        definition: 'A place where energy is held — such as a moving object, a raised object, a stretched spring, or a battery.',
        everydayNote: 'Think of energy stores like buckets — energy sits in one until something transfers it to another.',
      },
      {
        word: 'Gravitational PE',
        symbol: 'Ep',
        unit: 'joules (J)',
        definition: 'Energy stored in an object because of its height above the ground. Ep = mgh.',
        everydayNote: 'A ball held high up has lots of GPE — drop it and all that energy becomes kinetic.',
      },
      {
        word: 'Kinetic Energy',
        symbol: 'KE',
        unit: 'joules (J)',
        definition: 'Energy stored in a moving object. KE = ½mv².',
        everydayNote: 'A car at 60 mph has more kinetic energy than at 30 mph — four times as much (speed is squared).',
      },
      {
        word: 'Conservation',
        symbol: '',
        unit: '',
        definition: 'Energy cannot be created or destroyed — it can only be transferred between stores.',
        everydayNote: 'Energy never disappears. When a ball stops bouncing, its KE has transferred to thermal energy in the ball and floor.',
      },
      {
        word: 'Joule',
        symbol: 'J',
        unit: '',
        definition: 'The unit of energy, named after James Prescott Joule.',
        everydayNote: 'Lifting an apple 1 metre takes about 1 joule of energy.',
      },
    ],

    prerequisiteCheck: {
      questions: [
        {
          question: 'A ball is thrown upwards and slows down. What is happening to its energy?',
          answers: ['Energy is destroyed as the ball slows', 'Kinetic energy is transferred to gravitational potential energy', 'Gravitational PE is transferred to kinetic energy', 'Energy stays the same in kinetic form'],
          correct: 1,
          feedback: 'Correct — as the ball rises and slows, KE transfers to GPE. Energy is never destroyed, just moved between stores.',
        },
        {
          question: 'What unit is energy measured in?',
          answers: ['Watts (W)', 'Newtons (N)', 'Joules (J)', 'Metres (m)'],
          correct: 2,
          feedback: 'Joules (J) — named after James Joule. Power is measured in watts, force in newtons.',
        },
      ],
    },

    topicMapHint: {
      before: ['Introduction to Physics'],
      current: 'Energy Stores',
      after: ['Energy Pathways', 'Energy Equations', 'Efficiency', 'Power'],
    },

    workedExample: {
      title: 'Calculating gravitational potential energy',
      equation: 'Ep = m × g × h',
      context: 'A 60 kg student climbs to the top of a 10 m climbing wall. How much gravitational PE have they gained? (g = 10 N/kg)',
      steps: [
        {
          step: 1,
          action: 'Write what you know',
          content: 'm = 60 kg,   g = 10 N/kg,   h = 10 m',
          annotation: 'List the given values first. g = 10 N/kg is given in the exam — always check your equation sheet.',
        },
        {
          step: 2,
          action: 'Write the equation',
          content: 'Ep = m × g × h',
          annotation: 'GPE equation — given on the exam formula sheet. Ep = gravitational potential energy.',
        },
        {
          step: 3,
          action: 'Substitute the values',
          content: 'Ep = 60 × 10 × 10',
          annotation: 'Replace m, g, and h with the numbers from step 1. Multiply all three together.',
        },
        {
          step: 4,
          action: 'Calculate',
          content: 'Ep = 6000',
          annotation: '60 × 10 = 600, then 600 × 10 = 6000. Always do it step by step to avoid errors.',
        },
        {
          step: 5,
          action: 'State with unit',
          content: 'Ep = 6000 J',
          annotation: 'The unit is joules (J). No unit = no marks in the exam. You could also write 6 kJ (kilojoules).',
        },
      ],
      misconceptionAfter: {
        claim: 'A heavier person always has more GPE than a lighter person.',
        reality: 'Wrong — GPE depends on mass AND height. A lighter person at a greater height can have more GPE than a heavier person at a small height. GPE = mgh.',
        visual: 'A 10 kg ball at 100 m has Ep = 10 × 10 × 100 = 10,000 J. A 60 kg person at 1 m has only Ep = 600 J.',
      },
    },

    guidedPractice: {
      tier1: {
        question: 'A 5 kg ball is raised to a height of 8 m. What is its gravitational PE? (g = 10 N/kg)',
        allSteps: [
          'Write what you know: m = 5 kg, g = 10 N/kg, h = 8 m',
          'Write the equation: Ep = m × g × h',
          'Substitute: Ep = 5 × 10 × 8',
          '??? — what is 5 × 10 × 8?',
        ],
        missingStep: 3,
        missingHint: 'Calculate: 5 × 10 × 8 = ?',
        answer: 400,
        answerUnit: 'J',
      },
      tier2: {
        question: 'A 2 kg book is placed on a shelf 1.5 m high. What is its gravitational PE? (g = 10 N/kg)',
        shownEquation: 'Ep = m × g × h',
        shownStep1: 'Write what you know: m = 2 kg, g = 10 N/kg, h = 1.5 m',
        hint: 'Multiply: 2 × 10 × 1.5 = ?',
        answer: 30,
        answerUnit: 'J',
      },
      tier3: {
        question: 'A drone of mass 0.8 kg hovers at 25 m. What is its gravitational PE? (g = 10 N/kg)',
        hint: 'Use Ep = mgh. All three values are given.',
        methodHint: 'You need Ep = m × g × h. Identify m (0.8 kg), g (10 N/kg) and h (25 m), then multiply all three.',
        answer: 200,
        answerUnit: 'J',
      },
    },

    summary: {
      equation: 'Ep = mgh',
      sentence: 'The higher and heavier an object, the more gravitational potential energy it stores — and that energy converts to kinetic energy as it falls.',
      promptText: 'Explain what happens to the energy of a ball as it falls, in one sentence, as if telling a friend.',
    },

    sessionRecap: [
      'Energy is stored in different stores: kinetic, gravitational PE, thermal, chemical, elastic PE.',
      'GPE = mgh — depends on mass, gravitational field strength, and height.',
      'Energy is always conserved — it transfers between stores, never disappears.',
    ],
  },
  energy_pathways: {
    id: 'energy_pathways', module: 'Energy', moduleColor: C, course: 'combined',
    title: 'Energy Pathways', subtitle: 'Four Ways Energy is Transferred',
    description: 'Energy is transferred between stores by four pathways: mechanically (a force doing work), electrically (charge moving through a potential difference), by heating (from hotter to cooler regions), and by radiation (electromagnetic or sound waves). Energy is always conserved  -  it moves between stores, never disappearing.',
    lessonVisual: EnergyPathwaysLesson, ideaVisual: EnergyPathwaysIdea, realityVisual: EnergyPathwaysReality,
    equations: [{ expr: 'Efficiency = useful output ÷ total input', given: true }],
    question: 'Which of the following is an energy STORE, not an energy transfer PATHWAY?',
    questionSubtitle: 'Think about the difference between where energy is held vs. how it moves',
    options: ['Heating', 'Mechanical', 'Chemical', 'Radiation'],
    correctAnswer: 2,
    keywords: ['energy pathway', 'mechanical', 'electrical', 'heating', 'radiation', 'transfer', 'store', 'conservation'],
    sentenceStarters: ['Energy is transferred by the... pathway when...', 'The four energy pathways are...', 'Chemical is a store, not a pathway, because...', 'Mechanical energy transfer happens when...', 'The difference between a store and a pathway is...'],
    modelAnswers: [
      'Energy is transferred by the **electrical pathway** when **charge flows through a wire carrying energy from a battery to a bulb**.',
      'The four energy pathways are **mechanical, electrical, heating and radiation**.',
      'Chemical is a store, not a pathway, because **it describes where energy is held (in bonds), not how it moves**.',
      'Mechanical energy transfer happens when **a force does work on an object, such as pushing a box or stretching a spring**.',
      'The difference between a store and a pathway is **a store holds energy (e.g. kinetic, thermal) while a pathway describes how energy moves between stores**.',
    ],
    misconception: 'Chemical is an energy store, not a transfer pathway.',
    concept: 'The four energy transfer pathways are: mechanical (by a force), electrical (by current), heating (from hot to cold) and radiation (by waves). Chemical, kinetic, thermal and gravitational PE are energy STORES  -  where energy is held, not how it moves.',
  },
  energy_equations: {
    id: 'energy_equations', module: 'Energy', moduleColor: C, course: 'combined',
    title: 'Energy Equations', subtitle: 'KE, GPE, EPE and Work Done',
    description: 'Key energy equations: Kinetic energy = ½mv², Gravitational PE = mgh, Elastic PE = ½ke², Work done = Fd. These allow you to calculate energy stored in or transferred by a system. Note that KE depends on the square of speed.',
    lessonVisual: EnergyEquationsLesson, ideaVisual: EnergyEquationsIdea, realityVisual: EnergyEquationsReality,
    equations: [{ expr: 'E = mcΔθ', given: true }, { expr: 'P = E/t', given: true }, { expr: 'E = Pt', given: true }],
    question: 'A 4 kg object moves at 3 m/s. What is its kinetic energy?',
    questionSubtitle: 'Use KE = ½mv²',
    options: ['12 J', '18 J', '24 J', '36 J'],
    correctAnswer: 1,
    keywords: ['kinetic energy', 'KE = ½mv²', 'mass', 'velocity', 'speed squared', 'joules', 'substitution', 'squared'],
    sentenceStarters: ['Using KE = ½mv², I substitute...', 'The mass is... kg and the velocity is... m/s, so...', 'Speed is squared in the formula, meaning...', 'KE = ½ × ... × ...² = ...', 'The answer is... J because...'],
    modelAnswers: [
      'Using KE = ½mv², I substitute **m = 4 kg and v = 3 m/s to get KE = ½ × 4 × 9 = 18 J**.',
      'The mass is **4 kg** and the velocity is **3 m/s**, so **KE = ½ × 4 × 3² = 18 J**.',
      'Speed is squared in the formula, meaning **doubling speed quadruples KE  -  here 3² = 9**.',
      'KE = ½ × **4** × **3**² = **18 J**.',
      'The answer is **18 J** because **KE = ½ × 4 × 9 = 18 J using the formula KE = ½mv²**.',
    ],
    misconception: 'Doubling speed does not simply double kinetic energy.',
    concept: 'KE = ½ × 4 × 3² = ½ × 4 × 9 = 18 J. Speed is squared in the formula, so doubling speed quadruples kinetic energy.',
  },
  efficiency: {
    id: 'efficiency', module: 'Energy', moduleColor: C, practicalId: 'insulation', course: 'combined',
    title: 'Efficiency', subtitle: 'Useful Output ÷ Total Input × 100',
    description: 'Efficiency measures how much of the input energy becomes useful output energy. Efficiency = (useful output energy ÷ total input energy) × 100%. Wasted energy is usually dissipated as heat. No real machine is 100% efficient due to friction and heating.',
    lessonVisual: EfficiencyLesson, ideaVisual: EfficiencyIdea, realityVisual: EfficiencyReality,
    equations: [{ expr: 'Efficiency = useful output / total input', given: true }, { expr: 'Efficiency = useful power / total power', given: true }],
    question: 'A motor uses 500 J of electrical energy and does 200 J of useful work. What is its efficiency?',
    questionSubtitle: 'Efficiency = useful output ÷ total input × 100%',
    options: ['40%', '60%', '25%', '80%'],
    correctAnswer: 0,
    keywords: ['efficiency', 'useful output', 'total input', 'wasted energy', 'percentage', 'thermal energy', 'friction', '÷ × 100'],
    sentenceStarters: ['Efficiency = useful output ÷ total input × 100, so...', 'The useful output is... J and the total input is... J...', 'The wasted energy is... J, which is transferred as...', 'Efficiency cannot exceed 100% because...', 'I calculate efficiency by dividing... by... then multiplying by 100...'],
    modelAnswers: [
      'Efficiency = useful output ÷ total input × 100, so **efficiency = 200 ÷ 500 × 100 = 40%**.',
      'The useful output is **200 J** and the total input is **500 J**, so **efficiency = 40%**.',
      'The wasted energy is **300 J**, which is transferred as **thermal energy due to friction and heating**.',
      'Efficiency cannot exceed 100% because **some energy is always wasted as heat  -  no real machine is perfect**.',
      'I calculate efficiency by dividing **200** by **500** then multiplying by 100 **to get 40%**.',
    ],
    misconception: 'A 100% efficient machine is not possible in practice.',
    concept: 'Efficiency = (200 ÷ 500) × 100 = 40%. The remaining 300 J is wasted, usually as thermal energy due to friction.',
  },
  power_calc: {
    id: 'power_calc', module: 'Energy', moduleColor: C, course: 'combined',
    title: 'Power', subtitle: 'P = E/t, P = W/t and P = Fv',
    description: 'Power is the rate of energy transfer. P = E/t (power = energy ÷ time) or P = W/t (power = work done ÷ time). Also P = Fv (power = force × velocity) — useful when a force acts on a moving object (e.g. a car engine). The unit of power is the watt (W), where 1 W = 1 J/s. A 100 W bulb transfers 100 joules every second.',
    lessonVisual: PowerLesson, ideaVisual: PowerIdea, realityVisual: PowerReality,
    equations: [{ expr: 'P = W/t', given: true }, { expr: 'P = Fv', given: false }],
    question: 'A car engine exerts a driving force of 4000 N while the car travels at 20 m/s. What is the engine\'s power output?',
    questionSubtitle: 'Use P = F × v',
    options: ['200 W', '80 000 W', '4020 W', '200 000 W'],
    correctAnswer: 1,
    keywords: ['power', 'P = E/t', 'P = Fv', 'force', 'velocity', 'watts', 'joules per second', 'rate', 'engine power'],
    sentenceStarters: ['Using P = Fv, I multiply...', 'P = 4000 × 20 = ...', 'Power is the rate of energy transfer, so...', 'P = Fv applies when a constant force moves an object at constant speed...', 'The unit of power is the watt (W), where 1 W = ...'],
    modelAnswers: [
      'Using P = Fv, I multiply **4000 N × 20 m/s = 80 000 W (80 kW)**.',
      'P = 4000 × 20 = **80 000 W**.',
      'Power is the rate of energy transfer, so **P = Fv gives the rate at which the engine does work against resistive forces**.',
      'P = Fv applies when a constant force moves an object at constant speed — **in this case the engine overcomes air resistance at 20 m/s**.',
      'The unit of power is the watt (W), where **1 W = 1 J/s — so this engine transfers 80 000 joules every second**.',
    ],
    misconception: 'P = Fv only applies when the object moves at constant velocity (resultant force = 0). If accelerating, the engine power goes into both KE and overcoming resistance.',
    concept: 'P = Fv = 4000 × 20 = 80 000 W = 80 kW. This equation is equivalent to P = W/t because W = Fd and v = d/t, so P = Fd/t = Fv. Use P = E/t for energy; P = Fv for forces and speed.',
  },
  energy_resources: {
    id: 'energy_resources', module: 'Energy', moduleColor: C, course: 'combined',
    title: 'Energy Resources', subtitle: 'Renewable vs Non-Renewable — Evaluate for 6 Marks',
    description: 'Renewable resources (solar, wind, tidal, hydroelectric, geothermal, wave, biomass) are replenished naturally and produce little/no CO₂ during operation. Non-renewable resources (coal, oil, gas, nuclear) will eventually run out. Key criteria for evaluation: Reliability — fossil fuels and nuclear provide continuous (base-load) power; solar, wind, wave and tidal are intermittent (weather/tide-dependent). Environmental impact — fossil fuels release CO₂ (global warming) and pollutants; nuclear produces radioactive waste; renewables have low carbon emissions but visual/habitat impact. Cost — fossil fuel and nuclear plants have high setup and decommissioning costs; solar/wind have high initial cost but near-zero fuel costs. Land/resource use — wind and solar farms require large areas; hydroelectric floods valleys. Social factors — energy security (not dependent on imports), local employment. A 6-mark evaluate answer must weigh at least two criteria, reach a reasoned conclusion, and acknowledge trade-offs.',
    lessonVisual: EnergyResourcesLesson, ideaVisual: EnergyResourcesIdea, realityVisual: EnergyResourcesReality,
    question: 'Which energy resource is most reliable for continuous electricity generation?',
    questionSubtitle: 'Think about which resources are not weather-dependent',
    options: ['Solar panels', 'Wind turbines', 'Nuclear power station', 'Wave power'],
    correctAnswer: 2,
    keywords: ['renewable', 'non-renewable', 'intermittent', 'base-load', 'nuclear', 'solar', 'wind', 'reliability', 'weather-dependent', 'CO₂', 'radioactive waste', 'evaluate', 'trade-off', 'environmental impact', 'cost'],
    sentenceStarters: ['Nuclear is reliable because...however a disadvantage is...', 'Solar is renewable and produces no CO₂, but...', 'To evaluate, I must consider reliability, cost and environmental impact...', 'Wind power is renewable but intermittent, which means...', 'On balance, [resource] is most suitable for [purpose] because...'],
    modelAnswers: [
      'Nuclear is reliable because **it generates continuously regardless of weather — however it produces radioactive waste that remains hazardous for thousands of years**.',
      'Solar is renewable and produces no CO₂, but **it is intermittent — output depends on sunshine, so it cannot guarantee continuous supply without storage**.',
      'To evaluate, I must consider reliability, cost and environmental impact — **nuclear scores high on reliability and low on carbon, but waste and decommissioning costs are significant**.',
      'Wind power is renewable but intermittent, which means **it cannot be used as the sole source of electricity — it works best combined with base-load sources**.',
      'On balance, for a country prioritising low-carbon base-load power, **nuclear is most suitable; for reducing running costs and carbon over time, a mix of renewables is preferable — but no single resource is ideal for all criteria**.',
    ],
    misconception: '"Renewable" does not mean "reliable" — solar and wind are renewable but intermittent. "Clean" energy still has environmental costs (manufacturing, land use, waste).',
    concept: 'Evaluate = weigh evidence for AND against, then reach a reasoned conclusion. Grade 9 answers cover at least two criteria (e.g. reliability AND environmental impact), acknowledge trade-offs, and justify a conclusion rather than just listing facts.',
  },
}
