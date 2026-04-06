import { motion, AnimatePresence } from 'motion/react'
import { useState, useEffect } from 'react'
import { Zap, Flame, Battery, Wind, Sun, Waves, AlertTriangle, Lightbulb, FlaskConical, ArrowDown, Maximize2, Atom, Magnet } from 'lucide-react'
import { IdeaCaption, RealityBadge, AnimBar, FormulaBox, Dot } from './visuals-helpers'

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
      label: 'Nuclear', Icon: Atom, color: '#ef4444',
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
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-4">
      <div className="flex items-center gap-3">
        <div className="flex flex-col items-center gap-1">
          <motion.div className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: '#f9731630', border: '2px solid #f97316' }}
            animate={{ scale: [1, 1.1, 1], opacity: [1, 0.6, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}>
            <Flame size={18} color="#f97316" />
          </motion.div>
          <span className="text-xs" style={{ color: '#f97316' }}>Energy</span>
        </div>
        <motion.span className="text-xl font-bold" style={{ color: '#ef4444' }}
          animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 1 }}>→ ∅</motion.span>
        <div className="flex flex-col items-center gap-1">
          <div className="w-10 h-10 rounded-full" style={{ background: '#1d293d', border: '2px dashed #2d3e55' }} />
          <span className="text-xs" style={{ color: '#a8b8cc' }}>Gone?</span>
        </div>
      </div>
      <IdeaCaption>Energy is "used up" and disappears as it travels  -  there's no pathway, it just vanishes</IdeaCaption>
    </div>
  )
}
function EnergyPathwaysReality() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-4">
      <div className="flex items-center gap-2">
        <div className="flex flex-col items-center gap-1">
          <div className="w-9 h-9 rounded-[10px] flex items-center justify-center"
            style={{ background: '#fdc70020', border: '1.5px solid #fdc700' }}>
            <Battery size={18} color="#fdc700" />
          </div>
          <span style={{ fontSize: 8, color: '#fdc700', fontWeight: 600 }}>Chemical</span>
        </div>
        <div className="flex flex-col items-center">
          <motion.div animate={{ x: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.2 }}>
            <Zap size={14} color="#fdc700" />
          </motion.div>
          <span style={{ fontSize: 7, color: '#a8b8cc' }}>electrical</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="w-9 h-9 rounded-[10px] flex items-center justify-center"
            style={{ background: '#fdc70020', border: '1.5px solid #fdc700' }}>
            <Lightbulb size={18} color="#fdc700" />
          </div>
          <span style={{ fontSize: 8, color: '#fdc700', fontWeight: 600 }}>Bulb</span>
        </div>
        <div className="flex flex-col items-center">
          <motion.div animate={{ x: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0.3 }}>
            <Flame size={14} color="#f97316" />
          </motion.div>
          <span style={{ fontSize: 7, color: '#a8b8cc' }}>heating</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="w-9 h-9 rounded-[10px] flex items-center justify-center"
            style={{ background: '#f9731620', border: '1.5px solid #f97316' }}>
            <Flame size={18} color="#f97316" />
          </div>
          <span style={{ fontSize: 8, color: '#f97316', fontWeight: 600 }}>Thermal</span>
        </div>
      </div>
      <RealityBadge>Energy always travels via a defined pathway  -  it is never created or destroyed</RealityBadge>
    </div>
  )
}
function EnergyStoresIdea() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 p-4">
      <div className="flex items-center gap-3">
        <div className="flex flex-col items-center gap-1">
          <motion.div className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: '#f9731630', border: '2px solid #f97316' }}
            animate={{ scale: [1, 1.1, 1], opacity: [1, 0.6, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}>
            <Flame size={18} color="#f97316" />
          </motion.div>
          <span className="text-xs" style={{ color: '#f97316' }}>Energy</span>
        </div>
        <motion.span className="text-xl font-bold" style={{ color: '#ef4444' }}
          animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 1 }}>→ ∅</motion.span>
        <div className="flex flex-col items-center gap-1">
          <div className="w-10 h-10 rounded-full" style={{ background: '#1d293d', border: '2px dashed #2d3e55' }} />
          <span className="text-xs" style={{ color: '#a8b8cc' }}>Gone?</span>
        </div>
      </div>
      <IdeaCaption>Energy is used up and disappears when things heat up or slow down</IdeaCaption>
    </div>
  )
}
function EnergyStoresReality() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-4">
      <div className="flex items-center gap-2">
        <Battery size={22} color="#00bc7d" />
        <motion.div animate={{ x: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1 }}>
          <Zap size={18} color="#f97316" />
        </motion.div>
        <Flame size={22} color="#fdc700" />
      </div>
      <div className="text-xs text-center" style={{ color: '#cad5e2' }}>Chemical → Electrical → Thermal</div>
      <RealityBadge>Energy transfers between stores - never disappears</RealityBadge>
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
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 p-4">
      <div className="flex gap-4 items-end">
        {[{ v: '1×', ke: '1×', h: 24, col: '#a8b8cc' }, { v: '2×', ke: '2×', h: 48, col: '#fdc700' }].map((d, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <span className="text-xs font-bold" style={{ color: d.col }}>KE {d.ke}</span>
            <motion.div className="w-8 rounded-t-[6px]" style={{ height: d.h, background: d.col, opacity: 0.8 }}
              initial={{ height: 0 }} animate={{ height: d.h }} transition={{ delay: i * 0.2, duration: 0.5 }} />
            <span className="text-xs" style={{ color: '#a8b8cc' }}>v = {d.v}</span>
          </div>
        ))}
        <span className="text-xs font-bold mb-4" style={{ color: '#ef4444' }}>← WRONG</span>
      </div>
      <IdeaCaption>Doubling speed only doubles kinetic energy - not quadruples it</IdeaCaption>
    </div>
  )
}
function EnergyEquationsReality() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-4">
      <FormulaBox formula="KE = ½mv²" color={C} />
      <div className="text-xs text-center" style={{ color: '#cad5e2' }}>Speed is <strong>squared</strong> - doubling speed quadruples KE</div>
      <RealityBadge>2× speed → 4× kinetic energy</RealityBadge>
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
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 p-4">
      <div className="relative w-24 h-16 rounded-[10px] flex items-center justify-center"
        style={{ background: '#00bc7d15', border: '2px solid #00bc7d' }}>
        <span className="text-lg font-bold" style={{ color: '#00bc7d' }}>100%</span>
        <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center"
          style={{ background: '#00bc7d', color: '#fff', fontSize: 11, fontWeight: 'bold' }}>✓</div>
      </div>
      <div className="text-xs font-semibold" style={{ color: '#ef4444' }}>Perfectly efficient? ✗</div>
      <IdeaCaption>A 100% efficient machine is possible if we design it carefully enough</IdeaCaption>
    </div>
  )
}
function EfficiencyReality() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-4">
      <div className="flex gap-4">
        <div className="flex flex-col items-center gap-1">
          <div className="h-16 w-5 rounded" style={{ background: 'linear-gradient(#ef4444 60%, #00bc7d 40%)' }} />
          <span className="text-xs" style={{ color: '#a8b8cc' }}>LED 10%</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="h-16 w-5 rounded" style={{ background: 'linear-gradient(#ef4444 5%, #00bc7d 95%)' }} />
          <span className="text-xs" style={{ color: '#a8b8cc' }}>LED 95%</span>
        </div>
      </div>
      <RealityBadge>Wasted energy is always lost as heat - 100% impossible</RealityBadge>
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
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 p-4">
      <div className="flex items-center gap-2 px-3 py-2 rounded-[10px]"
        style={{ background: '#ef444415', border: '1px solid #ef444440' }}>
        <span className="text-sm font-bold" style={{ color: C }}>Power (W)</span>
        <span className="text-base" style={{ color: '#ef4444' }}>=</span>
        <span className="text-sm font-bold" style={{ color: '#fdc700' }}>Energy (J)</span>
      </div>
      <div className="flex gap-3 text-xs">
        <div className="px-2 py-1 rounded" style={{ background: `${C}15`, color: C }}>2000W kettle</div>
        <div className="px-2 py-1 rounded" style={{ background: '#fdc70015', color: '#fdc700' }}>= 2000J?</div>
      </div>
      <IdeaCaption>Power and energy are the same thing - a high-power device uses more total energy</IdeaCaption>
    </div>
  )
}
function PowerReality() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-4">
      <div className="flex gap-6">
        <div className="flex flex-col items-center gap-1">
          <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: `${C}20`, border: `1px solid ${C}` }}>
            <Zap size={18} color={C} />
          </div>
          <span className="text-xs text-center" style={{ color: '#cad5e2' }}>100W for 1s<br/><span style={{ color: C }}>= 100J</span></span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: '#2b7fff20', border: '1px solid #2b7fff' }}>
            <Battery size={18} color="#2b7fff" />
          </div>
          <span className="text-xs text-center" style={{ color: '#cad5e2' }}>10W for 10s<br/><span style={{ color: '#2b7fff' }}>= 100J</span></span>
        </div>
      </div>
      <RealityBadge>Power = rate of energy transfer, not total energy</RealityBadge>
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
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 p-4">
      <div className="flex items-center gap-3">
        <div className="flex flex-col items-center gap-1">
          <motion.div animate={{ opacity: [1, 0.1, 1] }} transition={{ repeat: Infinity, duration: 3 }}>
            <Sun size={28} color="#fdc700" />
          </motion.div>
          <span className="text-xs" style={{ color: '#fdc700' }}>Solar ✓</span>
          <span className="text-xs" style={{ color: '#ef4444' }}>at night?</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Wind size={28} color="#00a8e8" />
          <span className="text-xs" style={{ color: '#00a8e8' }}>Wind ✓</span>
          <span className="text-xs" style={{ color: '#ef4444' }}>no wind?</span>
        </div>
      </div>
      <IdeaCaption>Renewable energy is always better - we should switch everything to renewables immediately</IdeaCaption>
    </div>
  )
}
function EnergyResourcesReality() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-4">
      <div className="flex gap-4">
        <div className="flex flex-col items-center gap-1">
          <Sun size={22} color="#fdc700" />
          <span className="text-xs" style={{ color: '#fdc700' }}>Intermittent</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <AlertTriangle size={22} color="#e879f9" />
          <span className="text-xs" style={{ color: '#e879f9' }}>Reliable</span>
        </div>
      </div>
      <RealityBadge>Each resource has trade-offs: reliability, cost, environment</RealityBadge>
    </div>
  )
}

// ─── 6. Circuit Basics ───────────────────────────────────────────────────────
const ELEC_C = '#155dfc'

function CircuitBasicsLesson() {
  const [mode, setMode] = useState('series')
  const W = '#94a3b8'  // wire colour
  const r = 12        // bulb radius

  // ── Reusable circuit symbols ──────────────────────────────────────────────
  // Bulb: circle with ⊗ (cross inside)
  const Bulb = ({ cx, cy }) => (
    <g>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={W} strokeWidth={1.8}/>
      <line x1={cx - r * 0.7} y1={cy - r * 0.7} x2={cx + r * 0.7} y2={cy + r * 0.7} stroke={W} strokeWidth={1.5}/>
      <line x1={cx + r * 0.7} y1={cy - r * 0.7} x2={cx - r * 0.7} y2={cy + r * 0.7} stroke={W} strokeWidth={1.5}/>
    </g>
  )
  // Cell on a HORIZONTAL wire: vertical lines perpendicular to wire
  // Long thin line = +, short thick line = −
  const CellH = ({ cx, cy }) => (
    <g>
      <line x1={cx - 5} y1={cy - 13} x2={cx - 5} y2={cy + 13} stroke={W} strokeWidth={1.6}/>
      <line x1={cx + 5} y1={cy - 7}  x2={cx + 5} y2={cy + 7}  stroke={W} strokeWidth={3.5}/>
    </g>
  )
  // Cell on a VERTICAL wire: horizontal lines perpendicular to wire
  const CellV = ({ cx, cy }) => (
    <g>
      <line x1={cx - 13} y1={cy - 5} x2={cx + 13} y2={cy - 5} stroke={W} strokeWidth={1.6}/>
      <line x1={cx - 7}  y1={cy + 5} x2={cx + 7}  y2={cy + 5} stroke={W} strokeWidth={3.5}/>
    </g>
  )
  // Open switch: two small circles + angled lever
  const Switch = ({ x1, y1, x2, y2 }) => {
    const mx = (x1 + x2) / 2
    return (
      <g>
        <circle cx={x1} cy={y1} r={2.5} fill="none" stroke={W} strokeWidth={1.5}/>
        <circle cx={x2} cy={y2} r={2.5} fill="none" stroke={W} strokeWidth={1.5}/>
        <line x1={x1} y1={y1} x2={mx + 6} y2={y1 - 12} stroke={W} strokeWidth={1.5}/>
      </g>
    )
  }

  return (
    <div className="w-full h-full flex flex-col justify-center gap-2 px-3 py-2">
      <div className="flex gap-1.5 justify-center">
        {['series', 'parallel'].map(m => (
          <button key={m} onClick={() => setMode(m)}
            className="px-3 py-1 rounded-[8px] text-xs font-semibold capitalize"
            style={{ background: mode === m ? `${ELEC_C}22` : '#1d293d', color: mode === m ? ELEC_C : '#a8b8cc', border: `1px solid ${mode === m ? ELEC_C : '#2d3e55'}` }}>
            {m}
          </button>
        ))}
      </div>

      {mode === 'series' ? (
        /* ── SERIES: switch top-left, cell top-right, two bulbs bottom ── */
        <svg width="100%" viewBox="0 0 260 148" style={{ display: 'block', flex: 1, minHeight: 0 }}>
          {/* Outer rectangle wires */}
          {/* Top rail: left → switch → cell → right */}
          <line x1={52} y1={28} x2={82} y2={28} stroke={W} strokeWidth={1.8}/>
          <line x1={106} y1={28} x2={138} y2={28} stroke={W} strokeWidth={1.8}/>
          <line x1={160} y1={28} x2={208} y2={28} stroke={W} strokeWidth={1.8}/>
          {/* Right vertical */}
          <line x1={208} y1={28} x2={208} y2={120} stroke={W} strokeWidth={1.8}/>
          {/* Bottom rail: right → bulb2 → bulb1 → left */}
          <line x1={208} y1={120} x2={170} y2={120} stroke={W} strokeWidth={1.8}/>
          <line x1={146} y1={120} x2={114} y2={120} stroke={W} strokeWidth={1.8}/>
          <line x1={90}  y1={120} x2={52}  y2={120} stroke={W} strokeWidth={1.8}/>
          {/* Left vertical */}
          <line x1={52} y1={120} x2={52} y2={28} stroke={W} strokeWidth={1.8}/>

          {/* Open switch (top-left) */}
          <Switch x1={82} y1={28} x2={106} y2={28}/>

          {/* Cell on top horizontal rail — vertical lines perpendicular to wire */}
          <CellH cx={149} cy={28}/>

          {/* Bulb 1 (bottom-left) */}
          <Bulb cx={102} cy={120}/>
          {/* Bulb 2 (bottom-right) */}
          <Bulb cx={158} cy={120}/>
        </svg>
      ) : (
        /* ── PARALLEL: cell top-left, switch top-right, two bulbs in parallel ── */
        <svg width="100%" viewBox="0 0 260 148" style={{ display: 'block', flex: 1, minHeight: 0 }}>
          {/* Outer rectangle — left rail broken for cell */}
          <line x1={36}  y1={28}  x2={224} y2={28}  stroke={W} strokeWidth={1.8}/>
          <line x1={224} y1={28}  x2={224} y2={120} stroke={W} strokeWidth={1.8}/>
          <line x1={224} y1={120} x2={36}  y2={120} stroke={W} strokeWidth={1.8}/>
          {/* Left rail top section (above cell) */}
          <line x1={36} y1={28}  x2={36} y2={62}  stroke={W} strokeWidth={1.8}/>
          {/* Left rail bottom section (below cell) */}
          <line x1={36} y1={82}  x2={36} y2={120} stroke={W} strokeWidth={1.8}/>
          {/* Cell on left vertical rail — horizontal lines perpendicular to wire */}
          <CellV cx={36} cy={72}/>

          {/* Junction dots */}
          <circle cx={92}  cy={28}  r={3} fill={W}/>
          <circle cx={168} cy={28}  r={3} fill={W}/>
          <circle cx={92}  cy={120} r={3} fill={W}/>
          <circle cx={168} cy={120} r={3} fill={W}/>

          {/* Branch 1: bulb */}
          <line x1={92} y1={28}  x2={92} y2={52}  stroke={W} strokeWidth={1.8}/>
          <Bulb cx={92} cy={64}/>
          <line x1={92} y1={76}  x2={92} y2={120} stroke={W} strokeWidth={1.8}/>

          {/* Branch 2: bulb */}
          <line x1={168} y1={28}  x2={168} y2={52}  stroke={W} strokeWidth={1.8}/>
          <Bulb cx={168} cy={64}/>
          <line x1={168} y1={76}  x2={168} y2={120} stroke={W} strokeWidth={1.8}/>


          {/* Switch (right of top rail) */}
          <Switch x1={192} y1={28} x2={216} y2={28}/>

          {/* Labels */}
          <text x={34}  y={84} textAnchor="middle" fontSize={7} fill="#a8b8cc">I</text>
          <text x={71}  y={74} textAnchor="end"    fontSize={7} fill="#a8b8cc">I₁</text>
          <text x={190} y={74} textAnchor="start"  fontSize={7} fill="#a8b8cc">I₂</text>
        </svg>
      )}

      <div className="rounded-[10px] p-2 flex flex-col gap-0.5" style={{ background: '#1d293d' }}>
        <FormulaBox formula="V = IR" color={ELEC_C} />
        <div style={{ fontSize: 9, color: '#a8b8cc', textAlign: 'center', marginTop: 4 }}>Conventional current flows + to -</div>
      </div>
    </div>
  )
}
function CircuitBasicsIdea() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 p-4">
      <div className="flex items-center gap-1">
        <Battery size={18} color={ELEC_C} />
        {[3, 2, 1].map((n, i) => (
          <div key={i} className="flex items-center gap-0.5">
            <motion.div className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
              style={{ background: ELEC_C, opacity: 1 - i * 0.3, color: '#fff' }}
              animate={{ opacity: [1 - i * 0.3, (1 - i * 0.3) * 0.5, 1 - i * 0.3] }}
              transition={{ repeat: Infinity, duration: 2, delay: i * 0.2 }}>{n}A</motion.div>
            {i < 2 && <div style={{ width: 10, height: 2, background: '#1d293d' }} />}
          </div>
        ))}
        <div className="w-5 h-5 rounded" style={{ background: '#1d293d', border: '1px dashed #2d3e55' }} />
      </div>
      <div className="text-xs" style={{ color: '#ef4444' }}>Current gets "used up"?</div>
      <IdeaCaption>Current decreases as it flows around a circuit - the components use it up</IdeaCaption>
    </div>
  )
}
function CircuitBasicsReality() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-4">
      <div className="flex items-center gap-2 text-sm font-mono font-bold">
        <span style={{ color: ELEC_C }}>3A</span>
        <span style={{ color: '#a8b8cc' }}>→</span>
        <div className="w-8 h-6 rounded" style={{ background: '#fdc70030', border: '1px solid #fdc700' }} />
        <span style={{ color: '#a8b8cc' }}>→</span>
        <span style={{ color: ELEC_C }}>3A</span>
      </div>
      <div className="text-xs text-center" style={{ color: '#cad5e2' }}>Current is the same in series - voltage is shared</div>
      <RealityBadge color={ELEC_C}>Charge is conserved - current doesn't decrease</RealityBadge>
    </div>
  )
}

// ─── 7. Circuit Components (I-V) ─────────────────────────────────────────────
function CircuitComponentsLesson() {
  const [comp, setComp] = useState(0)
  const comps = [
    {
      name: 'Resistor', color: '#c084fc', xLabel: 'Voltage (V)', yLabel: 'Current (A)',
      path: 'M10 90 L90 10',
      desc: 'Straight line through origin  -  constant R (ohmic)',
    },
    {
      name: 'Bulb', color: '#fdc700', xLabel: 'Voltage (V)', yLabel: 'Current (A)',
      path: 'M10 90 C30 70 50 55 70 40 C80 33 86 28 90 22',
      desc: 'Curve levels off  -  R increases as filament heats',
    },
    {
      name: 'Diode', color: '#22c55e', xLabel: 'Voltage (V)', yLabel: 'Current (A)',
      path: 'M10 87 L50 87 L52 85 C55 80 60 60 65 30 L68 10',
      desc: 'No current for V < 0.6 V, then near-vertical rise',
    },
    {
      name: 'LDR', color: '#06b6d4', xLabel: 'Light intensity', yLabel: 'Resistance (Ω)',
      path: 'M10 15 C20 16 35 22 50 38 C65 55 78 72 90 85',
      desc: 'R decreases as light intensity increases',
    },
    {
      name: 'Thermistor', color: '#f97316', xLabel: 'Temperature (°C)', yLabel: 'Resistance (Ω)',
      path: 'M10 15 C18 17 30 24 45 42 C60 58 75 72 90 83',
      desc: 'R decreases as temperature increases',
    },
  ]
  const c = comps[comp]
  return (
    <div className="w-full h-full flex flex-col justify-center gap-2 px-3 py-2">
      <div className="flex gap-1 justify-center flex-wrap">
        {comps.map((cc, i) => (
          <button key={i} onClick={() => setComp(i)}
            className="px-2 py-0.5 rounded-[7px] font-medium"
            style={{ fontSize: 10, background: comp === i ? `${cc.color}22` : '#1d293d', color: comp === i ? cc.color : '#a8b8cc', border: `1px solid ${comp === i ? cc.color : '#2d3e55'}` }}>
            {cc.name}
          </button>
        ))}
      </div>
      <svg width="100%" viewBox="0 0 110 100" style={{ display: 'block', maxHeight: 120 }} className="mx-auto">
        {/* Axes */}
        <line x1="10" y1="8" x2="10" y2="92" stroke="#2d3e55" strokeWidth="1.5" />
        <line x1="10" y1="92" x2="98" y2="92" stroke="#2d3e55" strokeWidth="1.5" />
        {/* Arrowheads */}
        <polygon points="10,5 7,11 13,11" fill="#2d3e55" />
        <polygon points="101,92 95,89 95,95" fill="#2d3e55" />
        <text x="54" y="100" textAnchor="middle" fill="#a8b8cc" fontSize={7}>{c.xLabel}</text>
        <text x="4" y="50" textAnchor="middle" fill="#a8b8cc" fontSize={7} transform="rotate(-90,4,50)">{c.yLabel}</text>
        <motion.path d={c.path} fill="none" stroke={c.color} strokeWidth="2.5" strokeLinecap="round"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8 }} key={comp} />
      </svg>
      <div className="rounded-[8px] px-2 py-1 text-center" style={{ background: `${c.color}12`, fontSize: 10, color: '#cad5e2' }}>{c.desc}</div>
    </div>
  )
}
function CircuitComponentsIdea() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 p-4">
      <div className="flex gap-2">
        {[['Ω', '#c084fc', 'Resistor'], ['L', '#fdc700', 'Filament'], ['D', '#00bc7d', 'Diode']].map(([sym, col, name]) => (
          <div key={name} className="flex flex-col items-center gap-1">
            <div className="w-8 h-8 rounded flex items-center justify-center"
              style={{ background: `${col}20`, border: `1px solid ${col}` }}>
              <span className="text-xs font-bold" style={{ color: col }}>{sym}</span>
            </div>
            <div className="text-xs font-bold" style={{ color: col }}>= same</div>
          </div>
        ))}
      </div>
      <IdeaCaption>All resistors always have the same resistance regardless of temperature or voltage</IdeaCaption>
    </div>
  )
}
function CircuitComponentsReality() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-4">
      <div className="flex gap-3">
        {[['Ohmic', 'constant R', '#c084fc'], ['Lamp', 'R increases', '#fdc700'], ['Diode', '1-direction', '#00bc7d']].map(([n, d, col], i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <div className="w-10 h-10 rounded-[8px] flex items-center justify-center text-xs font-bold"
              style={{ background: `${col}15`, border: `1px solid ${col}`, color: col }}>{n}</div>
            <span className="text-xs text-center" style={{ color: '#a8b8cc' }}>{d}</span>
          </div>
        ))}
      </div>
      <RealityBadge color={ELEC_C}>Different components have different I-V relationships</RealityBadge>
    </div>
  )
}

// ─── 8. Series & Parallel ────────────────────────────────────────────────────
function SeriesParallelLesson() {
  const [mode, setMode] = useState('series')
  // Worked example: R1=4Ω, R2=6Ω, V=10V
  const R1 = 4, R2 = 6, Vsrc = 10
  const Rtotal_s = R1 + R2
  const I_s = (Vsrc / Rtotal_s).toFixed(2)
  const V1_s = (I_s * R1).toFixed(1)
  const V2_s = (I_s * R2).toFixed(1)
  const I1_p = (Vsrc / R1).toFixed(2)
  const I2_p = (Vsrc / R2).toFixed(2)
  const Itotal_p = (+I1_p + +I2_p).toFixed(2)
  const Rp = (1 / (1 / R1 + 1 / R2)).toFixed(2)
  return (
    <div className="w-full h-full flex flex-col justify-center gap-2 px-3 py-2">
      <div className="flex gap-1.5 justify-center">
        {['series', 'parallel'].map(m => (
          <button key={m} onClick={() => setMode(m)}
            className="px-3 py-1 rounded-[8px] text-xs font-semibold capitalize"
            style={{ background: mode === m ? `${ELEC_C}22` : '#1d293d', color: mode === m ? ELEC_C : '#a8b8cc', border: `1px solid ${mode === m ? ELEC_C : '#2d3e55'}` }}>
            {m}
          </button>
        ))}
      </div>
      {mode === 'series' ? (
        <>
          <svg width="100%" viewBox="0 0 260 90" style={{ display: 'block', maxHeight: 90 }}>
            <path d="M20 45 L20 15 L240 15 L240 45 L240 75 L20 75 L20 45" fill="none" stroke={ELEC_C} strokeWidth="2" strokeLinecap="round" />
            {/* Cell */}
            <line x1="12" y1="38" x2="28" y2="38" stroke={ELEC_C} strokeWidth="3" />
            <line x1="15" y1="47" x2="25" y2="47" stroke="#a8b8cc" strokeWidth="2" />
            <text x="20" y="62" textAnchor="middle" fill="#a8b8cc" fontSize={7}>10V</text>
            {/* Bulb R1 */}
            <rect x="75" y="7" width="28" height="16" rx="3" fill="#fdc70015" stroke="#fdc700" strokeWidth="1.5" />
            <text x="89" y="18" textAnchor="middle" fill="#fdc700" fontSize={8}>R₁=4Ω</text>
            {/* Bulb R2 */}
            <rect x="148" y="7" width="28" height="16" rx="3" fill="#fdc70015" stroke="#fdc700" strokeWidth="1.5" />
            <text x="162" y="18" textAnchor="middle" fill="#fdc700" fontSize={8}>R₂=6Ω</text>
            {/* Ammeter */}
            <circle cx="130" cy="75" r="9" fill="#00a8e815" stroke="#00a8e8" strokeWidth="1.5" />
            <text x="130" y="78" textAnchor="middle" fill="#00a8e8" fontSize={8}>A</text>
            {/* Arrows */}
            <text x="50" y="12" fill={ELEC_C} fontSize={7}>→</text>
            <text x="200" y="12" fill={ELEC_C} fontSize={7}>→</text>
          </svg>
          <div className="rounded-[10px] p-2 flex flex-col gap-1" style={{ background: '#1d293d' }}>
            <div style={{ fontSize: 9, color: '#a8b8cc' }}>R₁=4Ω, R₂=6Ω, V=10V</div>
            <div style={{ fontSize: 9, color: ELEC_C }}>R_total = R₁+R₂ = {Rtotal_s}Ω</div>
            <div style={{ fontSize: 9, color: '#22c55e' }}>I = V/R = {Vsrc}/{Rtotal_s} = {I_s} A (same everywhere)</div>
            <div style={{ fontSize: 9, color: '#fdc700' }}>V₁ = {V1_s} V · V₂ = {V2_s} V (V₁+V₂ = {Vsrc}V)</div>
          </div>
        </>
      ) : (
        <>
          <svg width="100%" viewBox="0 0 260 90" style={{ display: 'block', maxHeight: 90 }}>
            <path d="M20 45 L20 15 L240 15 L240 45 L240 75 L20 75 L20 45" fill="none" stroke={ELEC_C} strokeWidth="2" strokeLinecap="round" />
            <line x1="80" y1="15" x2="80" y2="75" stroke={ELEC_C} strokeWidth="1.5" strokeDasharray="3 2" />
            <line x1="170" y1="15" x2="170" y2="75" stroke={ELEC_C} strokeWidth="1.5" strokeDasharray="3 2" />
            {/* Cell */}
            <line x1="12" y1="38" x2="28" y2="38" stroke={ELEC_C} strokeWidth="3" />
            <line x1="15" y1="47" x2="25" y2="47" stroke="#a8b8cc" strokeWidth="2" />
            <text x="20" y="62" textAnchor="middle" fill="#a8b8cc" fontSize={7}>10V</text>
            {/* Branch bulbs */}
            <rect x="108" y="8" width="28" height="14" rx="3" fill="#fdc70015" stroke="#fdc700" strokeWidth="1.5" />
            <text x="122" y="18" textAnchor="middle" fill="#fdc700" fontSize={8}>R₁=4Ω</text>
            <rect x="108" y="66" width="28" height="14" rx="3" fill="#f9731615" stroke="#f97316" strokeWidth="1.5" />
            <text x="122" y="76" textAnchor="middle" fill="#f97316" fontSize={8}>R₂=6Ω</text>
            <text x="55" y="12" fill={ELEC_C} fontSize={7}>I= {Itotal_p}A →</text>
            <text x="185" y="24" fill="#22c55e" fontSize={7}>I₁={I1_p}A</text>
            <text x="185" y="72" fill="#22c55e" fontSize={7}>I₂={I2_p}A</text>
          </svg>
          <div className="rounded-[10px] p-2 flex flex-col gap-1" style={{ background: '#1d293d' }}>
            <div style={{ fontSize: 9, color: '#a8b8cc' }}>R₁=4Ω, R₂=6Ω, V=10V</div>
            <div style={{ fontSize: 9, color: '#fdc700' }}>V same across each branch = 10V</div>
            <div style={{ fontSize: 9, color: '#22c55e' }}>I₁={I1_p}A · I₂={I2_p}A · I_total={Itotal_p}A</div>
            <div style={{ fontSize: 9, color: ELEC_C }}>1/R = 1/R₁+1/R₂ → R_total={Rp}Ω</div>
          </div>
        </>
      )}
    </div>
  )
}
function SeriesParallelIdea() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-4">
      <div className="flex items-center gap-3">
        <div className="flex flex-col items-center gap-1">
          <Lightbulb size={22} color="#fdc700" fill="#fdc70020" />
          <span style={{ fontSize: 9, color: '#fdc700' }}>12V</span>
        </div>
        <div style={{ width: 16, height: 2, background: '#1d293d' }} />
        <div className="flex flex-col items-center gap-1">
          <Lightbulb size={22} color="#fdc700" fill="#fdc70020" />
          <span style={{ fontSize: 9, color: '#fdc700' }}>12V</span>
        </div>
        <div className="px-2 py-0.5 rounded-[6px] ml-1" style={{ background: '#ef444415', border: '1px solid #ef4444' }}>
          <span style={{ fontSize: 9, color: '#ef4444', fontWeight: 700 }}>Parallel</span>
        </div>
      </div>
      <div style={{ fontSize: 10, color: '#ef4444' }}>claimed: parallel = dimmer?</div>
      <IdeaCaption>Parallel bulbs share voltage, so they are dimmer</IdeaCaption>
    </div>
  )
}
function SeriesParallelReality() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-4">
      <div className="flex gap-4 text-xs">
        <div className="flex flex-col items-center gap-1 p-2 rounded-[10px]" style={{ background: `${ELEC_C}10`, border: `1px solid ${ELEC_C}` }}>
          <span style={{ color: ELEC_C }}>Series</span>
          <span style={{ color: '#fdc700' }}>Voltage shared</span>
          <span style={{ color: '#cad5e2' }}>→ dimmer</span>
        </div>
        <div className="flex flex-col items-center gap-1 p-2 rounded-[10px]" style={{ background: '#00bc7d10', border: '1px solid #00bc7d' }}>
          <span style={{ color: '#00bc7d' }}>Parallel</span>
          <span style={{ color: '#fdc700' }}>Same voltage</span>
          <span style={{ color: '#cad5e2' }}>→ same bright</span>
        </div>
      </div>
      <RealityBadge color={ELEC_C}>Parallel: same voltage across each branch</RealityBadge>
    </div>
  )
}

// ─── 9. Domestic Electricity ─────────────────────────────────────────────────
function DomesticElecLesson() {
  return (
    <div className="w-full h-full flex flex-col justify-center gap-2 px-3 py-2">
      <div style={{ fontSize: 10, fontWeight: 700, color: ELEC_C, textAlign: 'center' }}>UK 3-Pin Plug  -  230V AC, 50Hz</div>
      {/* Plug SVG */}
      <svg width="100%" viewBox="0 0 260 148" style={{ display: 'block', maxHeight: 148 }}>
        {/* Plug body outline */}
        <rect x="60" y="10" width="140" height="95" rx="12" fill="#1d293d" stroke="#2d3e55" strokeWidth="2" />
        {/* Plug cable entry top */}
        <rect x="115" y="4" width="30" height="10" rx="4" fill="#2d3e55" />
        {/* Fuse on live wire */}
        <rect x="108" y="28" width="20" height="10" rx="3" fill="#fdc70020" stroke="#fdc700" strokeWidth="1.5" />
        <text x="118" y="36" textAnchor="middle" fill="#fdc700" fontSize={7}>fuse</text>
        {/* Live wire  -  brown  -  to left pin */}
        <path d="M118 14 L118 28" fill="none" stroke="#92400e" strokeWidth="3" strokeLinecap="round" />
        <path d="M108 33 L85 60" fill="none" stroke="#92400e" strokeWidth="3" strokeLinecap="round" />
        {/* Neutral wire  -  blue  -  to right pin */}
        <path d="M142 14 L142 50 L175 60" fill="none" stroke="#2b7fff" strokeWidth="3" strokeLinecap="round" />
        {/* Earth wire  -  green/yellow  -  to bottom centre pin */}
        <path d="M130 14 L130 50 L130 68" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" />
        {/* Earth pin (large, centre bottom) */}
        <rect x="118" y="70" width="24" height="28" rx="5" fill="#22c55e30" stroke="#22c55e" strokeWidth="2" />
        <text x="130" y="88" textAnchor="middle" fill="#22c55e" fontSize={8}>E</text>
        {/* Live pin (left) */}
        <rect x="72" y="62" width="20" height="22" rx="4" fill="#92400e30" stroke="#92400e" strokeWidth="1.5" />
        <text x="82" y="76" textAnchor="middle" fill="#f97316" fontSize={8}>L</text>
        {/* Neutral pin (right) */}
        <rect x="167" y="62" width="20" height="22" rx="4" fill="#2b7fff25" stroke="#2b7fff" strokeWidth="1.5" />
        <text x="177" y="76" textAnchor="middle" fill="#2b7fff" fontSize={8}>N</text>
        {/* Labels right side */}
        <text x="212" y="74" fill="#f97316" fontSize={8} fontWeight="bold">Live (brown)</text>
        <text x="212" y="83" fill="#f97316" fontSize={7}>230V  -  dangerous</text>
        <line x1="187" y1="73" x2="210" y2="73" stroke="#f97316" strokeWidth="0.8" strokeDasharray="2 2" />
        <text x="212" y="96" fill="#2b7fff" fontSize={8} fontWeight="bold">Neutral (blue)</text>
        <text x="212" y="105" fill="#2b7fff" fontSize={7}>0V  -  return path</text>
        <line x1="187" y1="73" x2="210" y2="73" stroke="#f97316" strokeWidth="0.8" strokeDasharray="2 2" />
        {/* Earth label below */}
        <text x="130" y="110" textAnchor="middle" fill="#22c55e" fontSize={8} fontWeight="bold">Earth (green/yellow)</text>
        <text x="130" y="120" textAnchor="middle" fill="#22c55e" fontSize={7}>Safety  -  0V unless fault</text>
        <text x="130" y="132" textAnchor="middle" fill="#a8b8cc" fontSize={7}>Protects metal case from becoming live</text>
      </svg>
    </div>
  )
}
function DomesticElecIdea() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 p-4">
      <div className="flex items-center gap-2">
        <div className="text-xs font-semibold px-2 py-1 rounded" style={{ background: '#fdc70020', color: '#fdc700', border: '1px solid #fdc700' }}>Mains</div>
        <span style={{ color: '#ef4444', fontWeight: 'bold' }}>=</span>
        <div className="flex flex-col items-center">
          <svg width="60" height="20" viewBox="0 0 60 20">
            <line x1="0" y1="10" x2="60" y2="10" stroke="#fdc700" strokeWidth="2" />
          </svg>
          <span className="text-xs font-mono" style={{ color: '#fdc700' }}>DC  -  - </span>
        </div>
      </div>
      <IdeaCaption>Mains electricity is direct current (DC) like a battery</IdeaCaption>
    </div>
  )
}
function DomesticElecReality() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-4">
      <div className="flex gap-3">
        <div className="flex flex-col items-center gap-1 p-2 rounded-[10px]" style={{ border: '1px solid #155dfc' }}>
          <span className="text-xs font-mono font-bold" style={{ color: '#155dfc' }}>AC</span>
          <span className="text-xs" style={{ color: '#cad5e2' }}>Mains 230V</span>
          <span className="text-xs" style={{ color: '#a8b8cc' }}>50 Hz</span>
        </div>
        <div className="flex flex-col items-center gap-1 p-2 rounded-[10px]" style={{ border: '1px solid #fdc700' }}>
          <span className="text-xs font-mono font-bold" style={{ color: '#fdc700' }}>DC</span>
          <span className="text-xs" style={{ color: '#cad5e2' }}>Battery 1.5V</span>
          <span className="text-xs" style={{ color: '#a8b8cc' }}>0 Hz</span>
        </div>
      </div>
      <RealityBadge color={ELEC_C}>Mains is AC - alternates direction 50 times per second</RealityBadge>
    </div>
  )
}

// ─── 10. Electrical Power ────────────────────────────────────────────────────
function ElecPowerLesson() {
  const [tab, setTab] = useState(0)
  const [iv_I, setIvI] = useState(2)
  const [iv_V, setIvV] = useState(12)
  const [ir_I, setIrI] = useState(2)
  const [ir_R, setIrR] = useState(50)
  const [vr_V, setVrV] = useState(12)
  const [vr_R, setVrR] = useState(50)
  const [tHours, setTHours] = useState(2)
  const pIV = (iv_I * iv_V).toFixed(1)
  const pIR = (ir_I * ir_I * ir_R).toFixed(1)
  const pVR = (vr_V * vr_V / vr_R).toFixed(1)
  const pCurrent = tab === 0 ? +pIV : tab === 1 ? +pIR : +pVR
  const energyKWh = ((pCurrent * tHours) / 1000).toFixed(3)
  const costPence = (energyKWh * 30).toFixed(1)
  const tabs = ['P=IV', 'P=I²R', 'P=V²/R']
  const colors = [ELEC_C, '#c084fc', '#f97316']
  return (
    <div className="w-full h-full flex flex-col justify-center gap-1.5 px-3 py-2">
      <div className="flex gap-1.5 justify-center">
        {tabs.map((t, i) => (
          <button key={i} onClick={() => setTab(i)}
            className="px-2 py-0.5 rounded-[7px] font-bold"
            style={{ fontSize: 10, background: tab === i ? `${colors[i]}22` : '#1d293d', color: tab === i ? colors[i] : '#a8b8cc', border: `1px solid ${tab === i ? colors[i] : '#2d3e55'}` }}>
            {t}
          </button>
        ))}
      </div>
      {tab === 0 && (
        <div className="rounded-[11px] p-2" style={{ background: `${ELEC_C}10`, border: `1px solid ${ELEC_C}30` }}>
          <FormulaBox formula="P = IV" color={ELEC_C} />
          <div className="flex justify-between text-xs mt-1.5 mb-0.5"><span style={{ color: '#a8b8cc' }}>Current I</span><span style={{ color: ELEC_C, fontWeight: 700 }}>{iv_I} A</span></div>
          <input type="range" min="0.1" max="10" step="0.1" value={iv_I} onChange={e => setIvI(+e.target.value)} className="w-full mb-1" style={{ accentColor: ELEC_C }} />
          <div className="flex justify-between text-xs mb-0.5"><span style={{ color: '#a8b8cc' }}>Voltage V</span><span style={{ color: '#fdc700', fontWeight: 700 }}>{iv_V} V</span></div>
          <input type="range" min="1" max="230" step="1" value={iv_V} onChange={e => setIvV(+e.target.value)} className="w-full" style={{ accentColor: '#fdc700' }} />
          <div className="flex justify-between mt-1.5 pt-1 font-bold" style={{ borderTop: '1px solid #1d293d', fontSize: 13 }}>
            <span style={{ color: '#a8b8cc' }}>P =</span>
            <motion.span key={pIV} style={{ color: ELEC_C }} initial={{ scale: 0.85 }} animate={{ scale: 1 }}>{pIV} W</motion.span>
          </div>
        </div>
      )}
      {tab === 1 && (
        <div className="rounded-[11px] p-2" style={{ background: '#c084fc10', border: '1px solid #c084fc30' }}>
          <FormulaBox formula="P = I²R" color="#c084fc" />
          <div className="flex justify-between text-xs mt-1.5 mb-0.5"><span style={{ color: '#a8b8cc' }}>Current I</span><span style={{ color: '#c084fc', fontWeight: 700 }}>{ir_I} A</span></div>
          <input type="range" min="0.1" max="10" step="0.1" value={ir_I} onChange={e => setIrI(+e.target.value)} className="w-full mb-1" style={{ accentColor: '#c084fc' }} />
          <div className="flex justify-between text-xs mb-0.5"><span style={{ color: '#a8b8cc' }}>Resistance R</span><span style={{ color: '#fdc700', fontWeight: 700 }}>{ir_R} Ω</span></div>
          <input type="range" min="1" max="1000" step="1" value={ir_R} onChange={e => setIrR(+e.target.value)} className="w-full" style={{ accentColor: '#fdc700' }} />
          <div className="flex justify-between mt-1.5 pt-1 font-bold" style={{ borderTop: '1px solid #1d293d', fontSize: 13 }}>
            <span style={{ color: '#a8b8cc' }}>P =</span>
            <motion.span key={pIR} style={{ color: '#c084fc' }} initial={{ scale: 0.85 }} animate={{ scale: 1 }}>{pIR} W</motion.span>
          </div>
        </div>
      )}
      {tab === 2 && (
        <div className="rounded-[11px] p-2" style={{ background: '#f9731610', border: '1px solid #f9731630' }}>
          <FormulaBox formula="P = V²/R" color="#f97316" />
          <div className="flex justify-between text-xs mt-1.5 mb-0.5"><span style={{ color: '#a8b8cc' }}>Voltage V</span><span style={{ color: '#f97316', fontWeight: 700 }}>{vr_V} V</span></div>
          <input type="range" min="1" max="230" step="1" value={vr_V} onChange={e => setVrV(+e.target.value)} className="w-full mb-1" style={{ accentColor: '#f97316' }} />
          <div className="flex justify-between text-xs mb-0.5"><span style={{ color: '#a8b8cc' }}>Resistance R</span><span style={{ color: '#fdc700', fontWeight: 700 }}>{vr_R} Ω</span></div>
          <input type="range" min="1" max="1000" step="1" value={vr_R} onChange={e => setVrR(+e.target.value)} className="w-full" style={{ accentColor: '#fdc700' }} />
          <div className="flex justify-between mt-1.5 pt-1 font-bold" style={{ borderTop: '1px solid #1d293d', fontSize: 13 }}>
            <span style={{ color: '#a8b8cc' }}>P =</span>
            <motion.span key={pVR} style={{ color: '#f97316' }} initial={{ scale: 0.85 }} animate={{ scale: 1 }}>{pVR} W</motion.span>
          </div>
        </div>
      )}
      {/* Energy cost calculator */}
      <div className="rounded-[10px] p-2" style={{ background: '#1d293d', border: '1px solid #2d3e55' }}>
        <div style={{ fontSize: 9, color: '#a8b8cc', marginBottom: 3 }}>Energy cost: P={pCurrent}W for <span style={{ color: '#fdc700', fontWeight: 700 }}>{tHours}h</span></div>
        <input type="range" min="0.5" max="24" step="0.5" value={tHours} onChange={e => setTHours(+e.target.value)} className="w-full mb-1" style={{ accentColor: '#fdc700' }} />
        <div className="flex justify-between" style={{ fontSize: 9 }}>
          <span style={{ color: '#a8b8cc' }}>E = {energyKWh} kWh</span>
          <span style={{ color: '#22c55e', fontWeight: 700 }}>Cost ≈ {costPence}p</span>
        </div>
      </div>
    </div>
  )
}
function ElecPowerIdea() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 p-4">
      <div className="flex gap-3 items-center">
        <div className="flex flex-col items-center gap-1 p-2 rounded-[8px]" style={{ background: `${ELEC_C}10`, border: `1px solid ${ELEC_C}` }}>
          <span className="text-sm font-bold" style={{ color: ELEC_C }}>240V</span>
          <Zap size={14} color={ELEC_C} />
          <span className="text-xs" style={{ color: '#ef4444' }}>= most power?</span>
        </div>
        <span className="text-base" style={{ color: '#ef4444' }}>→</span>
        <div className="flex flex-col items-center gap-1 p-2 rounded-[8px]" style={{ background: '#fdc70010', border: '1px solid #fdc700' }}>
          <span className="text-sm font-bold" style={{ color: '#fdc700' }}>12V</span>
          <Zap size={14} color="#fdc700" />
          <span className="text-xs" style={{ color: '#a8b8cc' }}>= less power?</span>
        </div>
      </div>
      <IdeaCaption>A device with higher voltage always uses more power than one with lower voltage</IdeaCaption>
    </div>
  )
}
function ElecPowerReality() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-4">
      <div className="font-mono text-sm" style={{ color: ELEC_C }}>P = V × I</div>
      <div className="text-xs text-center" style={{ color: '#cad5e2' }}>Power depends on <em>both</em> voltage and current</div>
      <div className="text-xs p-2 rounded-[10px] text-center" style={{ background: `${ELEC_C}10`, color: '#cad5e2' }}>
        6V × 4A = 24W &gt; 12V × 1A = 12W
      </div>
      <RealityBadge color={ELEC_C}>High voltage alone doesn't mean high power</RealityBadge>
    </div>
  )
}

// ─── 11. Static Electricity ──────────────────────────────────────────────────
function StaticElecLesson() {
  const [stage, setStage] = useState('before')
  const after = stage === 'after'
  return (
    <div className="w-full h-full flex flex-col justify-center gap-2 px-3 py-2">
      <div className="flex gap-1.5 justify-center">
        {['before', 'after'].map(s => (
          <button key={s} onClick={() => setStage(s)}
            className="px-3 py-1 rounded-[8px] text-xs font-semibold capitalize"
            style={{ background: stage === s ? `${ELEC_C}22` : '#1d293d', color: stage === s ? ELEC_C : '#a8b8cc', border: `1px solid ${stage === s ? ELEC_C : '#2d3e55'}` }}>
            {s === 'before' ? 'Before rubbing' : 'After rubbing'}
          </button>
        ))}
      </div>
      <svg width="100%" viewBox="0 0 260 110" style={{ display: 'block', maxHeight: 110 }}>
        {/* Rod */}
        <rect x="20" y="30" width="90" height="30" rx="5" fill={after ? '#ec489920' : '#1d293d'} stroke={after ? '#ec4899' : '#2d3e55'} strokeWidth="1.5" />
        <text x="65" y="42" textAnchor="middle" fill={after ? '#ec4899' : '#cad5e2'} fontSize={9} fontWeight="bold">Rod (plastic)</text>
        {after ? (
          <text x="65" y="56" textAnchor="middle" fill="#ec4899" fontSize={10} fontWeight="bold">− − − − −</text>
        ) : (
          <text x="65" y="56" textAnchor="middle" fill="#a8b8cc" fontSize={9}>+ − + − +</text>
        )}
        {/* Cloth */}
        <rect x="148" y="30" width="90" height="30" rx="5" fill={after ? '#fdc70020' : '#1d293d'} stroke={after ? '#fdc700' : '#2d3e55'} strokeWidth="1.5" />
        <text x="193" y="42" textAnchor="middle" fill={after ? '#fdc700' : '#cad5e2'} fontSize={9} fontWeight="bold">Cloth (wool)</text>
        {after ? (
          <text x="193" y="56" textAnchor="middle" fill="#fdc700" fontSize={10} fontWeight="bold">+ + + + +</text>
        ) : (
          <text x="193" y="56" textAnchor="middle" fill="#a8b8cc" fontSize={9}>+ − + − +</text>
        )}
        {/* Electron transfer arrow */}
        {after && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
            <line x1="148" y1="45" x2="110" y2="45" stroke={ELEC_C} strokeWidth="1.5" markerEnd="url(#arrowhead)" />
            <text x="129" y="40" textAnchor="middle" fill={ELEC_C} fontSize={7}>e⁻ transfer</text>
          </motion.g>
        )}
        {/* Paper attraction diagram */}
        <line x1="65" y1="62" x2="65" y2="78" stroke={after ? '#ec4899' : '#2d3e55'} strokeWidth="1" strokeDasharray="2 2" />
        {after && (
          <motion.g initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <rect x="52" y="78" width="12" height="6" rx="1" fill="#fdc70030" stroke="#fdc700" strokeWidth="1" />
            <rect x="67" y="80" width="10" height="5" rx="1" fill="#fdc70030" stroke="#fdc700" strokeWidth="1" />
            <text x="65" y="95" textAnchor="middle" fill="#a8b8cc" fontSize={7}>Charged rod attracts</text>
            <text x="65" y="103" textAnchor="middle" fill="#a8b8cc" fontSize={7}>neutral paper scraps</text>
          </motion.g>
        )}
        <defs>
          <marker id="arrowhead" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
            <path d="M0,0 L0,6 L6,3 z" fill={ELEC_C} />
          </marker>
        </defs>
      </svg>
      <div className="flex flex-col gap-1">
        <div style={{ fontSize: 9, color: '#a8b8cc', textAlign: 'center' }}>
          {after ? 'Electrons transferred cloth → rod · Rod: negative · Cloth: positive' : 'Both objects are neutral before rubbing'}
        </div>
        <div style={{ fontSize: 9, color: '#cad5e2', textAlign: 'center' }}>Like charges repel · Unlike charges attract · Insulators charged by friction</div>
      </div>
      <FormulaBox formula="Q = It   (Charge in Coulombs C)" color={ELEC_C} />
    </div>
  )
}
function StaticElecIdea() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 p-4">
      <div className="flex items-center gap-2">
        <div className="flex flex-col items-center gap-1">
          <div className="w-10 h-6 rounded" style={{ background: '#1d293d', border: '1px solid #2d3e55' }} />
          <span className="text-xs" style={{ color: '#a8b8cc' }}>Neutral</span>
        </div>
        <motion.span animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 0.5 }}>
          <span style={{ color: '#e879f9', fontSize: 16 }}>↔</span>
        </motion.span>
        <div className="flex flex-col items-center gap-1">
          <div className="w-10 h-6 rounded flex items-center justify-center"
            style={{ background: '#e879f920', border: '1px solid #e879f9' }}>
            <span className="text-xs font-bold" style={{ color: '#e879f9' }}>+++</span>
          </div>
          <span className="text-xs" style={{ color: '#ef4444' }}>New charge?</span>
        </div>
      </div>
      <IdeaCaption>Rubbing creates positive and negative charges from nothing - static generates new charge</IdeaCaption>
    </div>
  )
}
function StaticElecReality() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-4">
      <div className="flex items-center gap-4 text-xs">
        <div className="flex flex-col items-center gap-1">
          <span className="font-bold text-sm" style={{ color: '#e879f9' }}>+</span>
          <span style={{ color: '#cad5e2' }}>Loses e⁻</span>
        </div>
        <motion.div animate={{ x: [0, 20, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
          <span style={{ color: ELEC_C, fontSize: 18 }}>e⁻</span>
        </motion.div>
        <div className="flex flex-col items-center gap-1">
          <span className="font-bold text-sm" style={{ color: ELEC_C }}>-</span>
          <span style={{ color: '#cad5e2' }}>Gains e⁻</span>
        </div>
      </div>
      <RealityBadge color={ELEC_C}>Electrons are transferred - total charge is always conserved</RealityBadge>
    </div>
  )
}

export const ENERGY_TOPICS = {
  energy_stores: {
    id: 'energy_stores', module: 'Energy', moduleColor: C, course: 'combined',
    title: 'Energy Stores', subtitle: 'Systems & Conservation of Energy',
    description: 'A system is an object or group of objects being studied. Energy is stored in kinetic, thermal, chemical, gravitational potential, elastic potential and nuclear stores. When a system changes, energy is transferred between stores - it is never created or destroyed (conservation of energy).',
    lessonVisual: EnergyStoresLesson, ideaVisual: EnergyStoresIdea, realityVisual: EnergyStoresReality,
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
  },
  energy_pathways: {
    id: 'energy_pathways', module: 'Energy', moduleColor: C, course: 'combined',
    title: 'Energy Pathways', subtitle: 'Four Ways Energy is Transferred',
    description: 'Energy is transferred between stores by four pathways: mechanically (a force doing work), electrically (charge moving through a potential difference), by heating (from hotter to cooler regions), and by radiation (electromagnetic or sound waves). Energy is always conserved  -  it moves between stores, never disappearing.',
    lessonVisual: EnergyPathwaysLesson, ideaVisual: EnergyPathwaysIdea, realityVisual: EnergyPathwaysReality,
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
    title: 'Power', subtitle: 'P = E/t and P = W/t',
    description: 'Power is the rate of energy transfer. P = E/t (power = energy ÷ time) or P = W/t (power = work done ÷ time). The unit of power is the watt (W), where 1 W = 1 J/s. A 100 W bulb transfers 100 joules every second.',
    lessonVisual: PowerLesson, ideaVisual: PowerIdea, realityVisual: PowerReality,
    question: 'An appliance transfers 3000 J in 60 seconds. What is its power?',
    questionSubtitle: 'Use P = E ÷ t',
    options: ['50 W', '180000 W', '0.02 W', '3060 W'],
    correctAnswer: 0,
    keywords: ['power', 'P = E/t', 'energy', 'time', 'watts', 'joules per second', 'rate', 'divide'],
    sentenceStarters: ['Using P = E ÷ t, I divide...', 'Power is the rate of energy transfer, so...', 'P = 3000 ÷ 60 = ...', 'The unit of power is the watt (W), which means...', 'A watt is one joule per second, so...'],
    modelAnswers: [
      'Using P = E ÷ t, I divide **3000 J by 60 s to get P = 50 W**.',
      'Power is the rate of energy transfer, so **P = 3000 ÷ 60 = 50 W  -  it transfers 50 joules every second**.',
      'P = 3000 ÷ 60 = **50 W**.',
      'The unit of power is the watt (W), which means **one joule transferred per second  -  this device transfers 50 J/s**.',
      'A watt is one joule per second, so **50 W means 50 joules are transferred every second**.',
    ],
    misconception: 'Power and energy are not the same quantity.',
    concept: 'P = 3000 ÷ 60 = 50 W. Power measures the rate of energy transfer, not total energy. A 50 W device uses energy more slowly than a 1000 W device.',
  },
  energy_resources: {
    id: 'energy_resources', module: 'Energy', moduleColor: C, course: 'combined',
    title: 'Energy Resources', subtitle: 'Renewable vs Non-Renewable',
    description: 'Renewable resources (solar, wind, tidal, hydroelectric, geothermal, wave, biomass) are replenished naturally and produce little/no CO₂. Non-renewable resources (coal, oil, gas, nuclear) will eventually run out. Each has advantages and disadvantages for reliability, environmental impact and cost.',
    lessonVisual: EnergyResourcesLesson, ideaVisual: EnergyResourcesIdea, realityVisual: EnergyResourcesReality,
    question: 'Which energy resource is most reliable for continuous electricity generation?',
    questionSubtitle: 'Think about which resources are not weather-dependent',
    options: ['Solar panels', 'Wind turbines', 'Nuclear power station', 'Wave power'],
    correctAnswer: 2,
    keywords: ['renewable', 'non-renewable', 'intermittent', 'nuclear', 'solar', 'wind', 'reliability', 'weather-dependent'],
    sentenceStarters: ['The most reliable resource is... because...', 'Renewable resources are intermittent, which means...', 'Nuclear power stations are reliable because...', 'Solar and wind are not reliable for continuous generation because...', 'Weather-dependent resources cannot provide... electricity...'],
    modelAnswers: [
      'The most reliable resource is **nuclear** because **it generates electricity continuously, independent of weather conditions**.',
      'Renewable resources are intermittent, which means **their output varies with weather  -  solar needs sunshine, wind needs wind**.',
      'Nuclear power stations are reliable because **they burn fuel (uranium) to generate steam regardless of the weather**.',
      'Solar and wind are not reliable for continuous generation because **they depend on weather, which is unpredictable**.',
      'Weather-dependent resources cannot provide **continuous electricity  -  they only generate when conditions are suitable**.',
    ],
    misconception: 'Renewable does not automatically mean most practical for all uses.',
    concept: 'Nuclear and fossil fuel power stations can generate electricity continuously regardless of weather. Renewables like solar and wind are intermittent - their output varies with conditions.',
  },
  circuit_basics: {
    id: 'circuit_basics', module: 'Electricity', moduleColor: ELEC_C, practicalId: 'resistance', course: 'combined',
    title: 'Current, PD & Resistance', subtitle: 'Q = It and V = IR',
    description: 'Electric current is the rate of flow of charge (Q = It). Potential difference (voltage) drives the current around a circuit. Resistance opposes current flow. Ohm\'s Law: V = IR. In a closed loop, charge is conserved - current does not get "used up".',
    lessonVisual: CircuitBasicsLesson, ideaVisual: CircuitBasicsIdea, realityVisual: CircuitBasicsReality,
    question: 'A resistor has 6V across it and 2A flowing through it. What is its resistance?',
    questionSubtitle: 'Rearrange V = IR to find R',
    options: ['12 Ω', '3 Ω', '4 Ω', '0.33 Ω'],
    correctAnswer: 1,
    keywords: ['V = IR', 'voltage', 'current', 'resistance', 'ohms', 'potential difference', "Ohm's Law", 'rearrange'],
    sentenceStarters: ['Using V = IR, I rearrange to get R = V ÷ I...', 'The voltage is... V and the current is... A...', 'Resistance is measured in ohms (Ω)...', 'R = 6 ÷ 2 = ...', "Ohm's Law states that..."],
    modelAnswers: [
      "Using V = IR, I rearrange to get R = V ÷ I **= 6 ÷ 2 = 3 Ω**.",
      'The voltage is **6 V** and the current is **2 A**, so **R = 6 ÷ 2 = 3 Ω**.',
      'Resistance is measured in ohms (Ω) **and is found by dividing voltage by current: R = V ÷ I**.',
      'R = 6 ÷ 2 = **3 Ω**.',
      "Ohm's Law states that **V = IR, so resistance R = V ÷ I = 6 ÷ 2 = 3 Ω**.",
    ],
    misconception: 'Current is not consumed by components - charge is conserved.',
    concept: 'R = V ÷ I = 6 ÷ 2 = 3 Ω. Current stays the same throughout a series loop - it is the energy (voltage) that is shared between components.',
  },
  circuit_components: {
    id: 'circuit_components', module: 'Electricity', moduleColor: ELEC_C, practicalId: 'iv_characteristics', course: 'combined',
    title: 'Circuit Components', subtitle: 'I-V Characteristics',
    description: 'An ohmic conductor (e.g. resistor at constant temperature) has constant resistance - a straight I-V graph. A filament lamp has increasing resistance as temperature rises - a curved graph. A diode only allows current in one direction. Thermistors decrease resistance with temperature; LDRs decrease resistance with light intensity.',
    lessonVisual: CircuitComponentsLesson, ideaVisual: CircuitComponentsIdea, realityVisual: CircuitComponentsReality,
    question: 'Which component produces a straight I-V graph through the origin?',
    questionSubtitle: 'Think about which has constant resistance',
    options: ['Filament lamp', 'Diode', 'Ohmic resistor (at constant temperature)', 'Thermistor'],
    correctAnswer: 2,
    keywords: ['I-V graph', 'ohmic conductor', 'constant resistance', 'filament lamp', 'diode', 'thermistor', 'straight line', 'non-linear'],
    sentenceStarters: ['An ohmic conductor has constant resistance, so its I-V graph is...', 'A straight I-V graph through the origin means the resistance is...', 'The filament lamp has a curved graph because...', 'A diode only allows current in one direction, so...', 'I know the answer is an ohmic resistor because...'],
    modelAnswers: [
      'An ohmic conductor has constant resistance, so its I-V graph is **a straight line through the origin  -  current is proportional to voltage**.',
      'A straight I-V graph through the origin means the resistance is **constant at all values of current and voltage**.',
      'The filament lamp has a curved graph because **it heats up as current increases, raising its resistance**.',
      'A diode only allows current in one direction, so **its I-V graph shows current only when forward biased**.',
      'I know the answer is an ohmic resistor because **it is the only component with a linear I-V relationship at constant temperature**.',
    ],
    misconception: 'Not all resistors obey Ohm\'s Law at all conditions.',
    concept: 'An ohmic conductor keeps constant resistance regardless of current, giving a straight-line I-V graph. A filament lamp heats up, increasing resistance, causing the curve to flatten at higher currents.',
  },
  series_parallel: {
    id: 'series_parallel', module: 'Electricity', moduleColor: ELEC_C, course: 'combined',
    title: 'Series & Parallel Circuits', subtitle: 'Current, Voltage & Resistance Rules',
    description: 'Series: current is the same at all points; voltage is shared between components; total resistance = R1 + R2. Parallel: voltage is the same across each branch; current splits between branches; total resistance is less than the smallest individual resistor.',
    lessonVisual: SeriesParallelLesson, ideaVisual: SeriesParallelIdea, realityVisual: SeriesParallelReality,
    question: 'In a parallel circuit with two identical 4Ω resistors connected to a 12V battery, what is the current through each resistor?',
    questionSubtitle: 'In parallel, voltage is the same across each branch',
    options: ['1.5 A', '3 A', '6 A', '0.75 A'],
    correctAnswer: 1,
    keywords: ['parallel circuit', 'voltage', 'current', 'V = IR', 'branch', 'same voltage', 'current splits', 'I = V/R'],
    sentenceStarters: ['In a parallel circuit, each branch has the same voltage as the supply...', 'Using I = V ÷ R for each branch: I = ... ÷ ...', 'The voltage across each 4Ω resistor is 12V because...', 'In parallel, voltage is the same across every branch, so...', 'The current through each resistor is... A because...'],
    modelAnswers: [
      'In a parallel circuit, each branch has the same voltage as the supply, **so each 4 Ω resistor has 12 V across it**.',
      'Using I = V ÷ R for each branch: I = **12 ÷ 4 = 3 A through each resistor**.',
      'The voltage across each 4 Ω resistor is 12 V because **in parallel, voltage is the same across every branch**.',
      'In parallel, voltage is the same across every branch, so **I = V/R = 12/4 = 3 A through each**.',
      'The current through each resistor is **3 A** because **each branch sees the full 12 V supply and I = 12 ÷ 4**.',
    ],
    misconception: 'In parallel, voltage is NOT shared - it is the same across every branch.',
    concept: 'In parallel, each branch has the full 12V. Using V = IR: I = 12 ÷ 4 = 3A through each resistor. Adding more parallel branches increases total current from the supply.',
  },
  domestic_electricity: {
    id: 'domestic_electricity', module: 'Electricity', moduleColor: ELEC_C, course: 'combined',
    title: 'Domestic Uses & Safety', subtitle: 'Mains AC, 3-Core Cable, Earth Wire',
    description: 'UK mains electricity is AC at approximately 230V and 50Hz. 3-core cable has: live (brown) - alternating pd from supply; neutral (blue) - completes the circuit; earth (yellow/green) - safety wire, only carries current if there is a fault. AC reverses direction 50 times per second (50Hz).',
    lessonVisual: DomesticElecLesson, ideaVisual: DomesticElecIdea, realityVisual: DomesticElecReality,
    question: 'What colour is the earth wire in a UK plug?',
    questionSubtitle: 'The earth wire is a safety feature',
    options: ['Blue', 'Brown', 'Yellow and green', 'Red'],
    correctAnswer: 2,
    keywords: ['earth wire', 'live wire', 'neutral wire', 'yellow and green', 'brown', 'blue', '3-core cable', 'fault'],
    sentenceStarters: ['The earth wire colour is... and its job is...', 'In a UK plug, the three wires are... and they are coloured...', 'The earth wire only carries current when...', 'A fault in an appliance causes the casing to become live, and the earth wire...', 'Live (brown), neutral (blue) and earth (yellow/green)...'],
    modelAnswers: [
      'The earth wire colour is **yellow and green** and its job is **to carry current safely to earth if a fault makes the casing live**.',
      'In a UK plug, the three wires are **live, neutral and earth** and they are coloured **brown, blue and yellow/green respectively**.',
      'The earth wire only carries current when **there is a fault  -  for example if the live wire touches the metal casing**.',
      'A fault in an appliance causes the casing to become live, and the earth wire **carries the fault current to earth, blowing the fuse and cutting the circuit**.',
      'Live (brown), neutral (blue) and earth (yellow/green) **are the three wires in a standard UK 3-core cable**.',
    ],
    misconception: 'UK mains electricity is NOT direct current like a battery.',
    concept: 'UK mains is alternating current (AC) at 230V, 50Hz. AC means current reverses direction 50 times per second. The earth wire (yellow/green) only carries current if a fault causes the casing to become live.',
  },
  electrical_power: {
    id: 'electrical_power', module: 'Electricity', moduleColor: ELEC_C, course: 'combined',
    title: 'Electrical Power & Energy', subtitle: 'P = VI, P = I²R, E = QV',
    description: 'Electrical power: P = VI (power = voltage × current) or P = I²R. Energy transferred: E = Pt = QV. The National Grid transmits electricity at high voltage to reduce current and therefore reduce energy lost as heat in the wires (P = I²R). Step-up transformers increase voltage before transmission; step-down reduce it for homes.',
    lessonVisual: ElecPowerLesson, ideaVisual: ElecPowerIdea, realityVisual: ElecPowerReality,
    question: 'A toaster operates at 230V and draws 4A. What is its power rating?',
    questionSubtitle: 'Use P = VI',
    options: ['57.5 W', '920 W', '234 W', '1150 W'],
    correctAnswer: 1,
    keywords: ['P = VI', 'power', 'voltage', 'current', 'watts', 'P = I²R', 'National Grid', 'energy transfer'],
    sentenceStarters: ['Using P = V × I, I multiply...', 'P = 230 × 4 = ...', 'The unit of electrical power is the watt (W)...', 'The National Grid uses high voltage to reduce current because P_loss = I²R...', 'Power is the rate of energy transfer, so...'],
    modelAnswers: [
      'Using P = V × I, I multiply **230 V × 4 A = 920 W**.',
      'P = 230 × 4 = **920 W**.',
      'The unit of electrical power is the watt (W), **where 1 W = 1 J/s  -  this toaster transfers 920 joules every second**.',
      'The National Grid uses high voltage to reduce current because P_loss = I²R, **so lower current means much less power wasted as heat in cables**.',
      'Power is the rate of energy transfer, so **920 W means 920 joules of electrical energy are transferred every second**.',
    ],
    misconception: 'High voltage alone does not determine power consumption.',
    concept: 'P = V × I = 230 × 4 = 920 W. The National Grid uses high voltage (and therefore low current) to minimise power lost as heat in cables, since P_loss = I²R.',
  },
  static_electricity: {
    id: 'static_electricity', module: 'Electricity', moduleColor: ELEC_C, course: 'physics-only',
    title: 'Static Electricity', subtitle: 'Charging by Friction & Electric Fields',
    description: 'When insulating materials are rubbed together, electrons are transferred. The material gaining electrons becomes negatively charged; the one losing electrons becomes positively charged. Like charges repel; unlike charges attract. A charged object creates an electric field - another charged object in this field experiences a force.',
    lessonVisual: StaticElecLesson, ideaVisual: StaticElecIdea, realityVisual: StaticElecReality,
    question: 'A plastic rod is rubbed with a cloth and the rod becomes negatively charged. What happened?',
    questionSubtitle: 'Think about electron transfer direction',
    options: ['Positive charges moved from cloth to rod', 'Electrons moved from cloth to rod', 'Protons moved from rod to cloth', 'Both gained electrons'],
    correctAnswer: 1,
    keywords: ['electrons', 'electron transfer', 'friction', 'negatively charged', 'positively charged', 'insulator', 'static charge', 'conservation of charge'],
    sentenceStarters: ['The rod became negative because electrons moved...', 'Friction causes electron transfer, not creation of charge...', 'The cloth becomes positively charged because it...', 'Only electrons can move in this process, not protons, because...', 'Charging by friction works by transferring electrons from... to...'],
    modelAnswers: [
      'The rod became negative because electrons moved **from the cloth onto the rod  -  gaining electrons makes it negative**.',
      'Friction causes electron transfer, not creation of charge, **so the total charge of rod + cloth stays zero**.',
      'The cloth becomes **positively charged** because it **loses electrons to the rod, leaving it with a net positive charge**.',
      'Only electrons can move in this process, not protons, because **protons are fixed in the nucleus and cannot transfer**.',
      'Charging by friction works by transferring electrons from **the cloth to the rod  -  the rod gains electrons and becomes negative**.',
    ],
    misconception: 'Friction does not create charge - it transfers electrons.',
    concept: 'Electrons (negative) moved from the cloth onto the rod. The rod gains electrons → becomes negative. The cloth loses electrons → becomes positive. Total charge of the system stays zero.',
  },
}
