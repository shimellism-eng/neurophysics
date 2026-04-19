import { motion, AnimatePresence } from 'motion/react'
import { useState, useEffect } from 'react'
import { Zap, Flame, Battery, Wind, Sun, Waves, AlertTriangle, Lightbulb, FlaskConical, ArrowDown, Maximize2, Magnet } from 'lucide-react'
import AtomIcon from '../components/AtomIcon'
import { IdeaCaption, RealityBadge, AnimBar, FormulaBox, Dot, MisconceptionCard, RealWorldCard, CompareRow, SimSlider, SimNarration } from './visuals-helpers'

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
            <SimSlider label="Mass m" min={1} max={50} value={mKE} onChange={setMKE} unit="kg" color={C} />
            <SimSlider label="Speed v" min={1} max={20} value={vKE} onChange={setVKE} unit="m/s" color="#3b82f6" />
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
            <SimSlider label="Mass m" min={1} max={50} value={mGPE} onChange={setMGPE} unit="kg" color="#22c55e" />
            <SimSlider label="Height h" min={1} max={100} value={hGPE} onChange={setHGPE} unit="m" color="#3b82f6" />
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
            <SimSlider label="Spring const k" min={1} max={100} value={kEl} onChange={setKEl} unit="N/m" color="#a855f7" />
            <SimSlider label="Extension e" min={0.1} max={2} step={0.1} value={eEl} onChange={setEEl} unit="m" color="#3b82f6" />
            <div className="flex justify-between mt-2 pt-1.5 text-sm font-bold" style={{ borderTop: '1px solid #1d293d' }}>
              <span style={{ color: '#a8b8cc' }}>Eₑ =</span>
              <motion.span key={eelVal} style={{ color: '#a855f7' }} initial={{ scale: 0.85 }} animate={{ scale: 1 }}>{eelVal} J</motion.span>
            </div>
          </div>
        </div>
      )}
      <SimNarration text={
        tab === 0
          ? `Kinetic energy: ½ × ${mKE} kg × (${vKE} m/s)² = ${keVal} J. ${+keVal > 5000 ? 'Large KE — like a fast heavy object.' : 'Moderate KE.'}`
          : tab === 1
          ? `Gravitational PE: ${mGPE} kg × 10 × ${hGPE} m = ${gpeVal} J. ${+gpeVal > 10000 ? 'Large GPE — a heavy object at significant height.' : 'Moderate GPE.'}`
          : `Elastic PE: ½ × ${kEl} N/m × (${eEl} m)² = ${eelVal} J. ${+eelVal > 50 ? 'Large elastic store — stiff spring or large extension.' : 'Moderate elastic store.'}`
      } />
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
      <svg width="100%" viewBox={`0 0 ${W} ${svgH}`} style={{ display: 'block', flex: 1, minHeight: 0 }} role="img" aria-label="Sankey diagram showing useful energy output and wasted energy for the selected efficiency">
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
      <SimSlider label="Efficiency" min={10} max={90} value={eff} onChange={setEff} unit="%" color="#00bc7d" />
      <SimNarration text={`Efficiency ${eff}%: from 100 J input, ${useful} J is useful output and ${wasted} J is wasted as heat or sound. ${eff >= 70 ? 'High efficiency — most energy is usefully transferred.' : eff >= 40 ? 'Moderate efficiency — significant waste.' : 'Low efficiency — most energy is wasted.'}`} />
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
        <SimSlider label="Energy" min={100} max={10000} step={100} value={energy} onChange={setEnergy} unit="J" color={C} />
        <SimSlider label="Time" min={1} max={100} step={1} value={time} onChange={setTime} unit="s" color="#3b82f6" />
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
      <SimNarration text={`Transferring ${energy} J in ${time} s → power = ${powerNum >= 1000 ? (powerNum / 1000).toFixed(2) + ' kW' : power + ' W'}. ${powerNum >= 2000 ? 'That matches a high-power appliance like a kettle.' : powerNum >= 100 ? 'Similar to a laptop or TV.' : 'Low power — like a phone charger or LED bulb.'}`} />
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

    // -- 9-STEP LESSON DATA ----------------------------------------------------

    hook: {
      hookFact: 'The Sun transfers 3.8 × 10²⁶ joules of energy every second entirely by radiation - electromagnetic waves crossing 150 million km of empty space with no particles to carry them.',
      hookQuestion: 'If energy always travels from one store to another, what store does sunlight fill when it warms your skin?',
      hookEmoji: '☀️',
    },

    lessonKeywords: [
      {
        word: 'Mechanical pathway',
        symbol: '',
        unit: 'J',
        definition: 'Energy transferred when a force does work on an object, causing it to move.',
        everydayNote: 'Kicking a football transfers energy from your leg muscles (chemical store) to the ball (kinetic store) by the mechanical pathway.',
      },
      {
        word: 'Electrical pathway',
        symbol: '',
        unit: 'J',
        definition: 'Energy transferred by electric charge moving through a potential difference.',
        everydayNote: 'A phone charger moves energy from the mains supply to the battery by the electrical pathway.',
      },
      {
        word: 'Heating pathway',
        symbol: '',
        unit: 'J',
        definition: 'Energy transferred from a region at higher temperature to one at lower temperature.',
        everydayNote: 'A hot pan handle warms your hand through the heating pathway - energy always flows from hotter to cooler.',
      },
      {
        word: 'Radiation pathway',
        symbol: '',
        unit: 'J',
        definition: 'Energy transferred by electromagnetic waves (e.g. infrared, light) or by sound waves.',
        everydayNote: 'A bonfire warms you from a distance by radiating infrared - no air contact needed.',
      },
      {
        word: 'Energy store',
        symbol: '',
        unit: 'J',
        definition: 'A place where energy is held, such as kinetic, gravitational PE, thermal, chemical, elastic PE, nuclear, electrostatic or magnetic.',
        everydayNote: 'A stretched rubber band holds energy in its elastic store - it is not itself a pathway.',
      },
    ],

    prerequisiteCheck: {
      questions: [
        {
          question: 'Which of the following is an energy PATHWAY, not an energy STORE?',
          answers: ['Kinetic', 'Thermal', 'Electrical', 'Chemical'],
          correct: 2,
          feedback: 'Electrical is a pathway - energy moves when charge flows through a potential difference. Kinetic, thermal and chemical are all stores.',
        },
        {
          question: 'A battery-powered fan converts chemical energy to kinetic energy. Which pathway transfers the energy inside the fan motor?',
          answers: ['Heating', 'Mechanical', 'Radiation', 'Electrical'],
          correct: 3,
          feedback: 'The battery drives current through the motor wires, so the transfer from chemical store to the motor is by the electrical pathway. The motor then uses the mechanical pathway to spin the blades.',
        },
      ],
    },

    topicMapHint: {
      before: ['Conservation of energy', 'Energy stores'],
      current: 'Energy Pathways',
      after: ['Energy Equations', 'Power'],
    },

    workedExample: {
      title: 'Identifying stores and pathways for a toaster',
      equation: 'E = P × t',
      context: 'A 1000 W toaster runs for 60 s. Identify the energy stores and pathways involved, then calculate the energy transferred.',
      steps: [
        { step: 1, action: 'Identify the starting store', content: 'Chemical store (mains supply / fuel burned at power station)', annotation: 'Examiners want you to name the store, not just say "electricity".' },
        { step: 2, action: 'Identify the pathway into the element', content: 'Electrical pathway - charge flows through the element at a potential difference', annotation: 'This is the pathway, not a store.' },
        { step: 3, action: 'Identify the store and onward pathway', content: 'Thermal store (element) - then heating and radiation pathways to the bread (thermal store)', annotation: 'Two pathways can act simultaneously: conduction (heating) and infrared (radiation).' },
        { step: 4, action: 'Calculate energy transferred', content: 'E = P × t = 1000 × 60 = 60 000 J', annotation: 'Check unit: watts × seconds = joules.' },
      ],
      misconceptionAfter: {
        claim: '"Electricity" is an energy store.',
        reality: 'Electricity is an energy pathway, not a store. Energy is stored chemically (in fuel) or in a gravitational store (reservoir for hydro). The electrical pathway moves it.',
        visual: 'Think of a river (electrical pathway) carrying water from a reservoir (chemical/gravitational store) to a turbine - the river is the route, not the container.',
      },
    },

    guidedPractice: {
      tier1: {
        question: 'A 500 W electric heater runs for 4 s. How much energy is transferred?',
        allSteps: [
          'Write what you know: P = 500 W, t = 4 s',
          'Write the equation: E = P × t',
          'Substitute: E = 500 × 4',
          '??? - Calculate E in joules.',
        ],
        missingStep: 3,
        missingHint: 'Calculate: 500 × 4 = ?',
        answer: 2000,
        answerUnit: 'J',
      },
      tier2: {
        question: 'A 1500 W kettle runs for 3 minutes. Calculate the energy transferred.',
        shownEquation: 'E = P × t',
        shownStep1: 'Write what you know: P = 1500 W, t = 3 min = 180 s',
        hint: 'Multiply 1500 by 180.',
        answer: 270000,
        answerUnit: 'J',
      },
      tier3: {
        question: 'A lamp transfers 8400 J of energy in 2 minutes. Calculate its power output.',
        hint: 'Rearrange E = Pt to find P. Convert minutes to seconds first.',
        methodHint: 'Start with E = 8400 J and t = 120 s. Rearrange E = Pt to P = E/t, then divide.',
        answer: 70,
        answerUnit: 'W',
      },
    },

    summary: {
      equation: 'E = P × t',
      sentence: 'Energy transferred equals power multiplied by time - measured in joules when power is in watts and time is in seconds.',
      promptText: 'Without looking, name the four energy pathways and give one example of each. Then name three energy stores.',
    },

    sessionRecap: [
      'The four energy transfer pathways are mechanical, electrical, heating and radiation - they describe HOW energy moves, not where it is held.',
      'Energy stores (kinetic, thermal, chemical, gravitational PE, elastic PE, nuclear, electrostatic, magnetic) describe WHERE energy is held.',
      'E = P × t lets you calculate energy transferred in joules once you know power (W) and time (s).',
    ],
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

    // -- 9-STEP LESSON DATA ----------------------------------------------------

    hook: {
      hookFact: 'A 1 kg cricket ball bowled at 40 m/s carries 800 J of kinetic energy. Bowl it at 80 m/s and it has 3200 J - four times as much from twice the speed, because KE depends on speed squared.',
      hookQuestion: 'Why does a car crash at 60 mph cause so much more damage than one at 30 mph, even though the speed only doubled?',
      hookEmoji: '🏏',
    },

    lessonKeywords: [
      {
        word: 'Kinetic energy',
        symbol: 'KE',
        unit: 'J',
        definition: 'Energy stored in a moving object, calculated as half the mass multiplied by speed squared.',
        everydayNote: 'A cycling commuter at 6 m/s carries four times the kinetic energy of the same cyclist at 3 m/s.',
      },
      {
        word: 'Gravitational potential energy',
        symbol: 'GPE',
        unit: 'J',
        definition: 'Energy stored in an object due to its height above a reference point, equal to mass × gravitational field strength × height.',
        everydayNote: 'A diver on a 10 m platform has more GPE than on a 5 m platform - lifting them doubled their stored energy.',
      },
      {
        word: 'Elastic potential energy',
        symbol: 'EPE',
        unit: 'J',
        definition: 'Energy stored in a stretched or compressed spring, equal to half the spring constant multiplied by the extension squared.',
        everydayNote: 'Stretching a catapult elastic stores EPE - release it and that energy transfers to kinetic energy of the projectile.',
      },
      {
        word: 'Work done',
        symbol: 'W',
        unit: 'J',
        definition: 'Energy transferred when a force moves an object through a distance in the direction of the force: W = F × d.',
        everydayNote: 'Pushing a shopping trolley 20 m with a 50 N force does 1000 J of work - that energy comes from your chemical store.',
      },
      {
        word: 'Spring constant',
        symbol: 'k',
        unit: 'N/m',
        definition: 'A measure of stiffness: how many newtons of force are needed to extend a spring by one metre.',
        everydayNote: 'A stiff car spring might have k = 20 000 N/m; a soft mattress spring might be 200 N/m.',
      },
    ],

    prerequisiteCheck: {
      questions: [
        {
          question: 'A 2 kg ball moves at 3 m/s. What is its kinetic energy?',
          answers: ['6 J', '9 J', '18 J', '36 J'],
          correct: 1,
          feedback: 'KE = ½ × 2 × 3² = ½ × 2 × 9 = 9 J. Remember to square the speed first, then multiply by ½ and mass.',
        },
        {
          question: 'Doubling the speed of an object multiplies its kinetic energy by:',
          answers: ['2', '3', '4', '8'],
          correct: 2,
          feedback: 'KE ∝ v², so doubling v gives (2v)² = 4v² - four times the original KE. This is why road speed limits matter so much for stopping distances.',
        },
      ],
    },

    topicMapHint: {
      before: ['Energy Pathways', 'Forces and motion basics'],
      current: 'Energy Equations',
      after: ['Efficiency', 'Power'],
    },

    workedExample: {
      title: 'Calculating kinetic energy of a moving ball',
      equation: 'KE = ½mv²',
      context: 'A 0.5 kg ball is kicked at 6 m/s. Calculate its kinetic energy.',
      steps: [
        { step: 1, action: 'Write what you know', content: 'm = 0.5 kg, v = 6 m/s', annotation: 'Always list given values before touching an equation.' },
        { step: 2, action: 'Write the equation', content: 'KE = ½mv²', annotation: 'KE = ½mv² is on the formula sheet - write it out in full.' },
        { step: 3, action: 'Substitute', content: 'KE = ½ × 0.5 × 6²', annotation: 'Square the speed first: 6² = 36. Do not multiply speed by mass before squaring.' },
        { step: 4, action: 'Calculate and state with unit', content: 'KE = 0.5 × 0.5 × 36 = 9 J', annotation: 'Unit is joules (J). Check: ½ × 0.5 = 0.25, then 0.25 × 36 = 9 J.' },
      ],
      misconceptionAfter: {
        claim: 'Doubling the speed doubles the kinetic energy.',
        reality: 'Kinetic energy depends on speed squared. Doubling speed quadruples KE. A car at 60 mph has four times the KE of the same car at 30 mph - stopping distance increases by much more than double.',
        visual: 'Think of KE as the area of a square with side = speed. Double the side and you get four times the area.',
      },
    },

    guidedPractice: {
      tier1: {
        question: 'A 2 kg toy car moves at 4 m/s. Calculate its kinetic energy.',
        allSteps: [
          'Write what you know: m = 2 kg, v = 4 m/s',
          'Write the equation: KE = ½mv²',
          'Square the speed: v² = 4² = 16',
          '??? - Complete: KE = ½ × 2 × 16 = ?',
        ],
        missingStep: 3,
        missingHint: 'Calculate: ½ × 2 × 16 = ?',
        answer: 16,
        answerUnit: 'J',
      },
      tier2: {
        question: 'A 3 kg ball rolls at 10 m/s. Calculate its kinetic energy.',
        shownEquation: 'KE = ½mv² → KE = ½ × 3 × 10²',
        shownStep1: 'Write what you know: m = 3 kg, v = 10 m/s',
        hint: 'Square the speed first: 10² = 100. Then multiply ½ × 3 × 100.',
        answer: 150,
        answerUnit: 'J',
      },
      tier3: {
        question: 'An object has kinetic energy of 200 J and mass 4 kg. Calculate its speed.',
        hint: 'Rearrange KE = ½mv² to find v. Isolate v² first, then square root.',
        methodHint: 'Start with KE = 200 J and m = 4 kg. Rearrange to v² = 2KE/m, calculate v², then take the square root.',
        answer: 10,
        answerUnit: 'm/s',
      },
    },

    summary: {
      equation: 'KE = ½mv²',
      sentence: 'Kinetic energy equals half the mass multiplied by the speed squared - doubling speed quadruples KE.',
      promptText: 'Without looking, write down the four energy equations from this topic. Then explain in one sentence why speed is squared in the KE formula.',
    },

    sessionRecap: [
      'KE = ½mv² - speed is squared, so doubling speed quadruples kinetic energy.',
      'GPE = mgh and EPE = ½ke² - both depend on squared terms (height vs h directly, extension vs e²).',
      'Work done = F × d - energy transferred equals force multiplied by distance moved in the direction of the force.',
    ],
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

    // -- 9-STEP LESSON DATA ----------------------------------------------------

    hook: {
      hookFact: 'Edison\'s first power station in New York (1882) converted only about 2.5% of fuel energy into electricity - 97.5% was wasted as heat. A modern gas power station converts around 60%.',
      hookQuestion: 'Where does the wasted energy in a light bulb actually go, and why can it never be zero?',
      hookEmoji: '💡',
    },

    lessonKeywords: [
      {
        word: 'Efficiency',
        symbol: 'η',
        unit: '%',
        definition: 'The fraction of input energy that is transferred as useful output energy, expressed as a percentage.',
        everydayNote: 'An LED bulb is about 90% efficient at converting electrical energy to light; an old filament bulb was only about 5% efficient.',
      },
      {
        word: 'Useful output energy',
        symbol: '',
        unit: 'J',
        definition: 'The energy that is transferred to the intended store or pathway.',
        everydayNote: 'For a loudspeaker, the useful output is sound energy - the rest becomes waste heat in the coil.',
      },
      {
        word: 'Wasted energy',
        symbol: '',
        unit: 'J',
        definition: 'Energy transferred to stores or pathways that are not useful - most often thermal energy due to friction or resistance.',
        everydayNote: 'A car engine wastes energy as heat in the exhaust, which is why the exhaust pipe gets hot.',
      },
      {
        word: 'Total input energy',
        symbol: '',
        unit: 'J',
        definition: 'All the energy supplied to a device, regardless of how much is useful.',
        everydayNote: 'The total input to a kettle is everything drawn from the mains - useful output is heating the water, wasted output is heating the kettle body.',
      },
    ],

    prerequisiteCheck: {
      questions: [
        {
          question: 'A device uses 400 J of input energy and produces 100 J of useful output. What is its efficiency?',
          answers: ['25%', '40%', '75%', '100%'],
          correct: 0,
          feedback: 'Efficiency = (100 ÷ 400) × 100 = 25%. Three-quarters of the energy is wasted.',
        },
        {
          question: 'Why can no real machine ever reach 100% efficiency?',
          answers: [
            'Because energy is created during operation',
            'Because some energy is always dissipated as heat due to friction and resistance',
            'Because useful output can exceed input energy',
            'Because efficiency only applies to electrical devices',
          ],
          correct: 1,
          feedback: 'Every real machine has friction or electrical resistance, which always dissipates some energy as heat. Conservation of energy means total output equals input, but some of that output is always wasted.',
        },
      ],
    },

    topicMapHint: {
      before: ['Energy Pathways', 'Energy Equations'],
      current: 'Efficiency',
      after: ['Power', 'Energy Resources'],
    },

    workedExample: {
      title: 'Calculating efficiency of an electric motor',
      equation: 'Efficiency = (useful output ÷ total input) × 100',
      context: 'A motor uses 800 J of electrical energy. 320 J does useful mechanical work. Calculate the efficiency and the wasted energy.',
      steps: [
        { step: 1, action: 'Write what you know', content: 'Total input = 800 J, useful output = 320 J', annotation: 'Identify which figure is input and which is useful output before substituting.' },
        { step: 2, action: 'Write the equation', content: 'Efficiency = (useful output ÷ total input) × 100', annotation: 'This equation is on the formula sheet. Write it in full before substituting.' },
        { step: 3, action: 'Substitute', content: 'Efficiency = (320 ÷ 800) × 100', annotation: 'Do not multiply by 100 before dividing - get the fraction first: 320/800 = 0.4.' },
        { step: 4, action: 'Calculate and state with unit', content: 'Efficiency = 40%. Wasted = 800 - 320 = 480 J', annotation: 'Efficiency is a percentage. Always subtract to find wasted energy - examiners often ask for it.' },
      ],
      misconceptionAfter: {
        claim: 'If efficiency is 40%, the rest of the energy is destroyed.',
        reality: 'Energy is always conserved. The remaining 60% (480 J) is transferred to thermal stores (heat from friction) and sound - it is not destroyed, just no longer useful.',
        visual: 'Think of a leaking bucket: the water that drips out is not gone, it is just on the floor and no longer useful. Energy is the same.',
      },
    },

    guidedPractice: {
      tier1: {
        question: 'A device has a total input of 1000 J and produces 300 J of useful output. What is its efficiency?',
        allSteps: [
          'Write what you know: useful output = 300 J, total input = 1000 J',
          'Write the equation: Efficiency = (useful output ÷ total input) × 100',
          'Substitute: Efficiency = (300 ÷ 1000) × 100',
          '??? - Calculate the efficiency in %.',
        ],
        missingStep: 3,
        missingHint: 'Calculate: (300 ÷ 1000) × 100 = ?',
        answer: 30,
        answerUnit: '%',
      },
      tier2: {
        question: 'A motor has an efficiency of 25% and a total input of 600 J. What is the useful output energy?',
        shownEquation: 'Efficiency = useful output / total input → useful output = efficiency × total input',
        shownStep1: 'Write what you know: efficiency = 0.25 (25%), total input = 600 J',
        hint: 'Rearrange: useful output = 0.25 × 600.',
        answer: 150,
        answerUnit: 'J',
      },
      tier3: {
        question: 'A machine has a useful power output of 45 W and wastes 15 W. Calculate its efficiency.',
        hint: 'Find total input power first, then use efficiency = (useful output / total input) × 100.',
        methodHint: 'Start with useful = 45 W and wasted = 15 W. Add to get total input. Then divide 45 by the total and multiply by 100.',
        answer: 75,
        answerUnit: '%',
      },
    },

    summary: {
      equation: 'Efficiency = (useful output ÷ total input) × 100',
      sentence: 'Efficiency tells you what percentage of input energy is actually useful - the rest is wasted, almost always as heat.',
      promptText: 'Without looking, write the efficiency equation and give one example of a device with high efficiency and one with low efficiency. State where the wasted energy goes in each case.',
    },

    sessionRecap: [
      'Efficiency = (useful output ÷ total input) × 100 - answer in percent.',
      'Wasted energy = total input minus useful output - it is not destroyed, just transferred to less useful stores (usually thermal).',
      'No real machine reaches 100% efficiency because friction and resistance always produce unwanted heat.',
    ],
  },
  power_calc: {
    id: 'power_calc', module: 'Energy', moduleColor: C, course: 'combined',
    title: 'Power', subtitle: 'P = E/t, P = W/t and P = Fv',
    description: 'Power is the rate of energy transfer. P = E/t (power = energy ÷ time) or P = W/t (power = work done ÷ time). Also P = Fv (power = force × velocity) — useful when a force acts on a moving object (e.g. a car engine). The unit of power is the watt (W), where 1 W = 1 J/s. A 100 W bulb transfers 100 joules every second.',
    lessonVisual: PowerLesson, ideaVisual: PowerIdea, realityVisual: PowerReality,
    equations: [{ expr: 'P = W/t', given: true }, { expr: 'P = Fv', given: false }],
    equationData: {
      name: 'Power  P = E ÷ t',
      triangle: {
        top:   { sym: 'P', name: 'Power',  unit: 'W', },
        left:  { sym: 'E', name: 'Energy', unit: 'J', },
        right: { sym: 't', name: 'Time',   unit: 's', },
      },
      rearrangements: [
        { unknown: 'P', formula: 'P = E ÷ t', unit: 'W', calc: ({ E, t }) => E / t },
        { unknown: 'E', formula: 'E = P × t', unit: 'J', calc: ({ P, t }) => P * t },
        { unknown: 't', formula: 't = E ÷ P', unit: 's', calc: ({ E, P }) => E / P },
      ],
      practice: [
        { label: 'A motor transfers 600 J of energy in 30 s. What is its power output?', find: 'P', given: { E: { value: 600, unit: 'J' }, t: { value: 30, unit: 's' } } },
        { label: 'A 50 W heater runs for 120 s. How much energy is transferred?',        find: 'E', given: { P: { value: 50, unit: 'W' }, t: { value: 120, unit: 's' } } },
      ],
    },
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

    // -- 9-STEP LESSON DATA ----------------------------------------------------

    hook: {
      hookFact: 'Usain Bolt\'s average power output during his 9.58 s 100 m world record was about 2619 W - roughly 26 times a standard 100 W light bulb. His peak power for a fraction of a second was around 3500 W.',
      hookQuestion: 'Why does a slow lorry engine produce more power than a fast sports car engine under some conditions?',
      hookEmoji: '⚡',
    },

    lessonKeywords: [
      {
        word: 'Power',
        symbol: 'P',
        unit: 'W',
        definition: 'The rate of energy transfer - how much energy is transferred per second.',
        everydayNote: 'A 1000 W microwave transfers 1000 joules of energy every second. A 60 W bulb transfers 60 joules per second.',
      },
      {
        word: 'Watt',
        symbol: 'W',
        unit: 'W',
        definition: 'The SI unit of power, equal to one joule per second.',
        everydayNote: 'A standard kettle is about 2000 W (2 kW) - it transfers 2000 joules of thermal energy every second.',
      },
      {
        word: 'P = E/t',
        symbol: 'P',
        unit: 'W',
        definition: 'Power equals energy transferred divided by time taken.',
        everydayNote: 'If a 60 J torch battery lasts 30 s, the power is 60/30 = 2 W.',
      },
      {
        word: 'P = Fv',
        symbol: 'P',
        unit: 'W',
        definition: 'Power equals force multiplied by velocity - useful when a constant force acts on a moving object.',
        everydayNote: 'A cyclist pedalling with 80 N of force at 5 m/s produces 400 W of power.',
      },
    ],

    prerequisiteCheck: {
      questions: [
        {
          question: 'A light bulb transfers 900 J of energy in 15 s. What is its power?',
          answers: ['13 500 W', '60 W', '900 W', '15 W'],
          correct: 1,
          feedback: 'P = E/t = 900 ÷ 15 = 60 W. Power is energy per second, so divide total energy by total time.',
        },
        {
          question: 'Which equation should you use when given force and velocity?',
          answers: ['P = E/t', 'P = Fv', 'P = W/d', 'P = mv'],
          correct: 1,
          feedback: 'P = Fv is derived from P = W/t and W = Fd combined with v = d/t. Use it whenever you know the driving force and the speed of the object.',
        },
      ],
    },

    topicMapHint: {
      before: ['Energy Equations', 'Efficiency'],
      current: 'Power',
      after: ['Energy Resources', 'Specific Heat Capacity'],
    },

    workedExample: {
      title: 'Calculating engine power using P = Fv',
      equation: 'P = Fv',
      context: 'A lorry engine exerts a driving force of 8000 N while moving at 25 m/s at constant velocity. Calculate the engine\'s power output.',
      steps: [
        { step: 1, action: 'Write what you know', content: 'F = 8000 N, v = 25 m/s', annotation: 'Constant velocity means resultant force = 0, so driving force equals drag. The engine does work at rate P = Fv.' },
        { step: 2, action: 'Write the equation', content: 'P = Fv', annotation: 'P = Fv is NOT on the formula sheet in some specifications - learn it. It is derived from P = W/t and W = Fd.' },
        { step: 3, action: 'Substitute', content: 'P = 8000 × 25', annotation: 'Units: N × m/s = J/s = W. No conversion needed here.' },
        { step: 4, action: 'Calculate and state with unit', content: 'P = 200 000 W = 200 kW', annotation: 'Convert to kW for large values: 200 000 ÷ 1000 = 200 kW. Examiners accept either form.' },
      ],
      misconceptionAfter: {
        claim: 'A higher driving force always means higher power.',
        reality: 'Power depends on both force AND speed (P = Fv). A slow lorry with a large force can have the same power as a fast car with a small force. Power is the product of the two.',
        visual: 'Think of carrying shopping: one heavy bag up one flight of stairs vs. many light bags up many flights at speed - similar power, different force and speed combinations.',
      },
    },

    guidedPractice: {
      tier1: {
        question: 'A motor transfers 4500 J of energy in 15 s. Calculate its power.',
        allSteps: [
          'Write what you know: E = 4500 J, t = 15 s',
          'Write the equation: P = E/t',
          'Substitute: P = 4500 ÷ 15',
          '??? - Calculate P in watts.',
        ],
        missingStep: 3,
        missingHint: 'Calculate: 4500 ÷ 15 = ?',
        answer: 300,
        answerUnit: 'W',
      },
      tier2: {
        question: 'A cyclist pedals with a force of 600 N at a constant speed of 12 m/s. Calculate the power output.',
        shownEquation: 'P = Fv',
        shownStep1: 'Write what you know: F = 600 N, v = 12 m/s',
        hint: 'Multiply force by velocity: 600 × 12.',
        answer: 7200,
        answerUnit: 'W',
      },
      tier3: {
        question: 'A 2400 W pump runs for 45 s. How much energy does it transfer?',
        hint: 'Rearrange P = E/t to find E. Multiply power by time.',
        methodHint: 'Start with P = 2400 W and t = 45 s. Rearrange P = E/t to E = P × t, then calculate.',
        answer: 108000,
        answerUnit: 'J',
      },
    },

    summary: {
      equation: 'P = E/t  or  P = Fv',
      sentence: 'Power is the rate of energy transfer - use P = E/t when you have energy and time, and P = Fv when you have force and speed.',
      promptText: 'Without looking, write both power equations and give a real example for each. State the unit of power and what it means in joules per second.',
    },

    sessionRecap: [
      'Power = energy ÷ time (P = E/t) in watts, where 1 W = 1 J/s.',
      'P = Fv is used when a force acts on a moving object at constant speed - for example, a car engine overcoming drag.',
      'To find energy from power: rearrange to E = P × t. Always convert time to seconds before calculating.',
    ],
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

    // -- 9-STEP LESSON DATA ----------------------------------------------------

    hook: {
      hookFact: 'In 2023 the UK went over a year without burning coal for electricity for the first time since 1882. Wind farms now generate more electricity than coal on average across the year.',
      hookQuestion: 'If wind is free and produces no CO2 during operation, why do countries still build gas and nuclear power stations?',
      hookEmoji: '🌬️',
    },

    lessonKeywords: [
      {
        word: 'Renewable resource',
        symbol: '',
        unit: '',
        definition: 'An energy resource that is naturally replenished at a rate faster than it is used, such as solar, wind, tidal, hydroelectric, geothermal, wave and biomass.',
        everydayNote: 'Solar panels on a school roof keep generating electricity as long as the Sun shines - no fuel is consumed and no CO2 is emitted during operation.',
      },
      {
        word: 'Non-renewable resource',
        symbol: '',
        unit: '',
        definition: 'An energy resource that will eventually run out because it forms far more slowly than it is consumed, such as coal, oil, gas and nuclear fuel.',
        everydayNote: 'Coal takes millions of years to form from compressed organic material - once burned, that energy source is gone permanently.',
      },
      {
        word: 'Intermittent',
        symbol: '',
        unit: '',
        definition: 'Not continuously available - output depends on weather or tidal conditions rather than human demand.',
        everydayNote: 'A wind turbine produces no electricity on a calm day, even if millions of homes need power at that moment.',
      },
      {
        word: 'Base-load power',
        symbol: '',
        unit: 'W or MW',
        definition: 'Continuous, reliable electrical power generation that meets minimum demand at all times, regardless of weather.',
        everydayNote: 'Nuclear and gas stations provide base-load because they generate at full capacity on demand - hospitals and data centres depend on this.',
      },
      {
        word: 'Evaluate',
        symbol: '',
        unit: '',
        definition: 'To weigh evidence for and against each option across multiple criteria, then reach a justified conclusion that acknowledges trade-offs.',
        everydayNote: 'Choosing between resources is like choosing a phone: you weigh cost, battery life and camera quality before deciding - no single choice wins on every criterion.',
      },
    ],

    prerequisiteCheck: {
      questions: [
        {
          question: 'Which resource is renewable but intermittent?',
          answers: ['Nuclear', 'Coal', 'Wind', 'Gas'],
          correct: 2,
          feedback: 'Wind is renewable because the wind keeps blowing naturally, but it is intermittent because output depends entirely on wind speed - there is no generation on calm days.',
        },
        {
          question: 'A 6-mark evaluate answer must do which of the following?',
          answers: [
            'List as many energy resources as possible',
            'Weigh evidence for and against across at least two criteria and reach a justified conclusion',
            'State that renewable energy is always better than non-renewable',
            'Give exactly three advantages and three disadvantages',
          ],
          correct: 1,
          feedback: 'Evaluate means weigh evidence on both sides across criteria such as reliability, environmental impact and cost, then reach a conclusion with a reason. Simply listing facts scores low.',
        },
      ],
    },

    topicMapHint: {
      before: ['Efficiency', 'Power'],
      current: 'Energy Resources',
      after: ['Specific Heat Capacity', 'Thermal insulation'],
    },

    workedExample: {
      title: 'Evaluating wind power for a 6-mark answer',
      equation: 'Energy (MWh) = Power (MW) × Time (h)',
      context: 'A wind farm is proposed to supply a town. Evaluate wind power as an energy resource. (6 marks)',
      steps: [
        { step: 1, action: 'Reliability - for and against', content: 'FOR: wind is free and available most days. AGAINST: output is intermittent - on calm days output is zero, requiring backup from gas or storage.', annotation: 'Name the criterion explicitly. Examiners award marks for each developed point.' },
        { step: 2, action: 'Environmental impact - for and against', content: 'FOR: no CO2 during operation, helping reduce global warming. AGAINST: turbines require large areas, cause visual impact, and construction disturbs habitats.', annotation: 'Distinguish between operation (no CO2) and construction (some carbon cost and habitat loss).' },
        { step: 3, action: 'Cost - for and against', content: 'FOR: near-zero fuel costs once built - wind is free. AGAINST: high initial capital cost; expensive offshore installation; grid infrastructure needed.', annotation: 'Cost must distinguish between setup and running costs - examiners look for this nuance.' },
        { step: 4, action: 'Reasoned conclusion', content: 'Wind is suitable for reducing carbon emissions long-term but cannot be the only source due to intermittency. A mix with gas or storage is needed to guarantee supply.', annotation: 'A conclusion without a reason scores no marks. Always link your conclusion to specific evidence from the criteria above.' },
      ],
      misconceptionAfter: {
        claim: '"Renewable" means the same as "reliable".',
        reality: 'Renewable means the resource is naturally replenished. Reliable means it generates consistently on demand. Wind is renewable but not reliable. Nuclear is reliable but not renewable.',
        visual: 'A renewable source is like a river that keeps flowing - but a river can run low in a drought. Reliable power is like a tap you turn on and it always works at the same pressure.',
      },
    },

    guidedPractice: {
      tier1: {
        question: 'A wind farm produces 500 MW for 6 hours, then 200 MW for 18 hours. Calculate the total energy generated in MWh.',
        allSteps: [
          'Energy in first period: 500 MW × 6 h = 3000 MWh',
          'Energy in second period: 200 MW × 18 h = 3600 MWh',
          'Total energy = 3000 + 3600',
          '??? - Calculate the total in MWh.',
        ],
        missingStep: 3,
        missingHint: 'Add the two periods: 3000 + 3600 = ?',
        answer: 6600,
        answerUnit: 'MWh',
      },
      tier2: {
        question: 'A coal power station runs at 1200 MW continuously for 24 hours. Calculate the total electrical energy generated in MWh.',
        shownEquation: 'Energy (MWh) = Power (MW) × Time (h)',
        shownStep1: 'Write what you know: P = 1200 MW, t = 24 h',
        hint: 'Multiply 1200 by 24.',
        answer: 28800,
        answerUnit: 'MWh',
      },
      tier3: {
        question: 'A gas power station has an efficiency of 35% and burns fuel supplying 80 000 MWh of input energy. Calculate the useful electrical energy output.',
        hint: 'Use: useful output = efficiency × total input. Convert percentage to a decimal first.',
        methodHint: 'Start with efficiency = 0.35 and input = 80 000 MWh. Multiply efficiency by input to find useful output.',
        answer: 28000,
        answerUnit: 'MWh',
      },
    },

    summary: {
      equation: 'Evaluate = reliability + environmental impact + cost + justified conclusion',
      sentence: 'No single energy resource is best on every criterion - evaluation means weighing trade-offs and reaching a conclusion backed by evidence.',
      promptText: 'Without looking, name five renewable and two non-renewable resources. Then state one advantage and one disadvantage of wind power and one advantage and one disadvantage of nuclear power.',
    },

    sessionRecap: [
      'Renewable resources are replenished naturally (solar, wind, tidal, hydro, geothermal, wave, biomass) but many are intermittent - output depends on weather.',
      'Non-renewable resources (coal, oil, gas, nuclear) provide reliable base-load power but produce CO2 (fossil fuels) or radioactive waste (nuclear) and will eventually run out.',
      'A 6-mark evaluate answer must cover at least two criteria (reliability, environmental impact, cost), weigh evidence on both sides, and end with a reasoned conclusion.',
    ],
  },
}
