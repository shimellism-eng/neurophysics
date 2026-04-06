import { motion } from 'motion/react'
import { useState, useEffect } from 'react'
import { Atom, AlertTriangle, Zap, Shield } from 'lucide-react'
import { IdeaCaption, RealityBadge, FormulaBox } from './visuals-helpers'

const PART_C = '#c084fc'
const ATOM_C = '#e879f9'

// ─── 12. States of Matter & Density ─────────────────────────────────────────
function StatesDensityLesson() {
  const [state, setState] = useState(0)
  const states = ['Solid', 'Liquid', 'Gas']
  const cols = ['#c084fc', '#2b7fff', '#00a8e8']

  // Solid: 4×4 grid tightly packed
  const solidPos = Array.from({ length: 16 }, (_, i) => ({
    cx: 30 + (i % 4) * 18,
    cy: 16 + Math.floor(i / 4) * 18,
  }))
  // Liquid: ~12 close but irregular
  const liquidPos = [
    {cx:22,cy:18},{cx:40,cy:14},{cx:58,cy:20},{cx:76,cy:15},
    {cx:18,cy:36},{cx:36,cy:34},{cx:54,cy:32},{cx:72,cy:38},
    {cx:24,cy:54},{cx:44,cy:52},{cx:62,cy:56},{cx:78,cy:50},
  ]
  // Gas: ~8 scattered far apart
  const gasPos = [
    {cx:20,cy:16},{cx:70,cy:22},{cx:130,cy:14},{cx:165,cy:40},
    {cx:35,cy:60},{cx:100,cy:58},{cx:155,cy:70},{cx:80,cy:95},
  ]
  const particlesByState = [solidPos, liquidPos, gasPos]
  const particles = particlesByState[state]
  const r = state === 0 ? 7 : state === 1 ? 7 : 6

  const stateInfo = [
    'Solid: high ρ · fixed shape · vibrate in place',
    'Liquid: high ρ · flows · no fixed shape',
    'Gas: low ρ · expands to fill container',
  ]

  return (
    <div className="w-full h-full flex flex-col items-center gap-2 pt-3 px-3" style={{ maxWidth: 480 }}>
      {/* Toggle */}
      <div className="flex gap-2">
        {states.map((s, i) => (
          <button key={i} onClick={() => setState(i)}
            className="px-3 py-1 rounded-[8px] text-xs font-semibold"
            style={{ background: state === i ? `${cols[i]}22` : '#1d293d', color: state === i ? cols[i] : '#a8b8cc', border: `1px solid ${state === i ? cols[i] : '#2a3a52'}` }}>
            {s}
          </button>
        ))}
      </div>

      {/* SVG diagram */}
      <svg width="200" height="110" viewBox="0 0 200 110" style={{ display: 'block', background: '#0f1829', borderRadius: 12, border: `1.5px solid ${cols[state]}` }}>
        {/* container walls */}
        <rect x="4" y="4" width="192" height="102" rx="8" fill="none" stroke={cols[state]} strokeWidth="1.2" strokeOpacity="0.4" />
        {particles.map((p, i) => (
          <motion.circle key={`${state}-${i}`}
            cx={p.cx} cy={p.cy} r={r}
            fill={cols[state]} fillOpacity={0.82}
            animate={
              state === 0
                ? { cx: [p.cx - 1.5, p.cx + 1.5, p.cx - 1, p.cx + 1, p.cx], cy: [p.cy - 1.5, p.cy, p.cy + 1.5, p.cy, p.cy - 1] }
                : state === 1
                ? { cx: [p.cx - 5, p.cx + 4, p.cx - 3, p.cx + 5, p.cx], cy: [p.cy - 4, p.cy + 5, p.cy - 5, p.cy + 3, p.cy] }
                : { cx: [p.cx, p.cx + 20, p.cx + 30, p.cx + 10, p.cx - 10, p.cx - 20, p.cx], cy: [p.cy, p.cy + 15, p.cy - 10, p.cy + 25, p.cy - 15, p.cy + 10, p.cy] }
            }
            transition={{ repeat: Infinity, repeatType: 'loop', duration: state === 0 ? 0.8 + i * 0.08 : state === 1 ? 1.2 + i * 0.12 : 2.5 + i * 0.3, ease: 'easeInOut' }}
          />
        ))}
        {/* State badge */}
        <rect x="132" y="88" width="62" height="16" rx="4" fill={cols[state]} fillOpacity="0.18" />
        <text x="163" y="99" textAnchor="middle" fill={cols[state]} fontSize={9} fontWeight="bold">{states[state]}</text>
      </svg>

      {/* Formula + info row */}
      <div className="flex items-center gap-3 w-full justify-center">
        <div className="px-3 py-1 rounded-[10px] font-mono font-bold text-sm" style={{ background: `${PART_C}18`, border: `1px solid ${PART_C}44`, color: PART_C }}>
          ρ = m/V
        </div>
        <div className="text-xs text-center" style={{ color: '#a8b8cc' }}>{stateInfo[state]}</div>
      </div>
    </div>
  )
}
function StatesDensityIdea() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 p-4">
      <div className="flex gap-4 items-end">
        <div className="flex flex-col items-center gap-1">
          <div className="w-12 h-8 rounded" style={{ background: '#2b7fff20', border: '2px solid #2b7fff' }}>
            <div className="w-full h-full flex items-center justify-center text-xs font-bold" style={{ color: '#2b7fff' }}>Ship</div>
          </div>
          <motion.div className="text-sm" animate={{ y: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1 }}>↓</motion.div>
          <span className="text-xs" style={{ color: '#ef4444' }}>sinks?</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
            style={{ background: '#c084fc20', border: '2px solid #c084fc', color: '#c084fc' }}>W</div>
          <motion.div className="text-sm" animate={{ y: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}>↓</motion.div>
          <span className="text-xs" style={{ color: '#a8b8cc' }}>floats?</span>
        </div>
      </div>
      <IdeaCaption>Heavy objects always sink - light objects always float, regardless of shape</IdeaCaption>
    </div>
  )
}
function StatesDensityReality() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-4">
      <div className="flex gap-4 items-end">
        <div className="flex flex-col items-center gap-1">
          <div className="w-10 h-8 rounded-[6px]" style={{ background: '#00a8e820', border: '1px solid #00a8e8' }} />
          <span className="text-xs" style={{ color: '#00a8e8' }}>Steel ship<br/>floats!</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="w-5 h-5 rounded-full" style={{ background: '#00a8e840', border: '1px solid #00a8e8' }} />
          <span className="text-xs" style={{ color: '#a8b8cc' }}>Steel bolt<br/>sinks</span>
        </div>
      </div>
      <FormulaBox formula="ρ = m/V" color={PART_C} />
      <RealityBadge color={PART_C}>Shape changes average density - density vs fluid determines floating</RealityBadge>
    </div>
  )
}

// ─── 13. Internal Energy & Specific Heat ────────────────────────────────────
function InternalEnergyLesson() {
  // Heating curve path: solid→melt plateau→liquid→boil plateau→gas
  // x: 0→240, y mapped: 0°C at y=108, 100°C at y=40 (SVG top-down)
  // Points: (28,128) solid start → (62,86) 0°C melt start → (100,86) melt end
  //       → (140,44) 100°C boil start → (178,44) boil end → (220,20) gas
  const path = "M28,128 L62,86 L100,86 L140,44 L178,44 L220,20"
  return (
    <div className="w-full h-full flex flex-col items-center gap-2 pt-2 px-3" style={{ maxWidth: 480 }}>
      <div className="text-xs font-semibold" style={{ color: PART_C }}>Heating Curve  -  Water</div>
      <svg width="260" height="150" viewBox="0 0 260 150" style={{ display: 'block' }}>
        {/* axes */}
        <line x1="26" y1="136" x2="240" y2="136" stroke="#2a3a52" strokeWidth="1.2" />
        <line x1="26" y1="10" x2="26" y2="136" stroke="#2a3a52" strokeWidth="1.2" />
        {/* axis labels */}
        <text x="133" y="148" textAnchor="middle" fill="#637b96" fontSize={8}>Energy added / time →</text>
        <text x="10" y="73" textAnchor="middle" fill="#637b96" fontSize={8} transform="rotate(-90,10,73)">Temperature (°C)</text>
        {/* y-axis ticks */}
        <line x1="22" y1="86" x2="26" y2="86" stroke="#2a3a52" strokeWidth="1" />
        <text x="20" y="89" textAnchor="end" fill="#637b96" fontSize={7}>0°C</text>
        <line x1="22" y1="44" x2="26" y2="44" stroke="#2a3a52" strokeWidth="1" />
        <text x="20" y="47" textAnchor="end" fill="#637b96" fontSize={7}>100°C</text>
        {/* plateau shading */}
        <rect x="62" y="80" width="38" height="12" fill="#2b7fff" fillOpacity="0.13" rx="2" />
        <rect x="140" y="38" width="38" height="12" fill="#00a8e8" fillOpacity="0.13" rx="2" />
        {/* animated heating curve */}
        <motion.path d={path}
          fill="none" stroke={PART_C} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: 'easeInOut' }} />
        {/* plateau labels */}
        <text x="81" y="78" textAnchor="middle" fill="#2b7fff" fontSize={7} fontWeight="bold">Melting</text>
        <text x="67" y="75" textAnchor="start" fill="#a8b8cc" fontSize={6.5}>0°C</text>
        <text x="159" y="36" textAnchor="middle" fill="#00a8e8" fontSize={7} fontWeight="bold">Boiling</text>
        <text x="143" y="33" textAnchor="start" fill="#a8b8cc" fontSize={6.5}>100°C</text>
        {/* phase labels */}
        <text x="45" y="114" textAnchor="middle" fill="#a8b8cc" fontSize={6.5}>Solid</text>
        <text x="121" y="68" textAnchor="middle" fill="#a8b8cc" fontSize={6.5}>Liquid</text>
        <text x="210" y="16" textAnchor="middle" fill="#a8b8cc" fontSize={6.5}>Gas</text>
      </svg>
      <div className="flex items-center gap-3 w-full justify-center">
        <div className="px-3 py-1 rounded-[10px] font-mono font-bold text-sm" style={{ background: `${PART_C}18`, border: `1px solid ${PART_C}44`, color: PART_C }}>
          ΔE = mcΔT
        </div>
        <div className="text-xs" style={{ color: '#a8b8cc' }}>Plateau = latent heat<br/>T stays constant</div>
      </div>
      <div className="text-xs text-center px-1" style={{ color: '#637b96' }}>
        During phase changes: energy breaks bonds  -  temperature stays constant
      </div>
    </div>
  )
}
function InternalEnergyIdea() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 p-4">
      <div className="flex items-center gap-2">
        <div className="flex flex-col items-center gap-0.5">
          <span className="text-xs font-bold" style={{ color: '#f97316' }}>100°C</span>
          <span className="text-xs" style={{ color: '#a8b8cc' }}>water</span>
        </div>
        <div className="px-2 py-1 rounded" style={{ background: '#ef444420', color: '#ef4444', fontSize: 12, border: '1px solid #ef4444' }}>=</div>
        <div className="flex flex-col items-center gap-0.5">
          <span className="text-xs font-bold" style={{ color: '#f97316' }}>100°C</span>
          <span className="text-xs" style={{ color: '#a8b8cc' }}>steam?</span>
        </div>
      </div>
      <div className="text-xs" style={{ color: '#ef4444' }}>Same temp → same internal energy?</div>
      <IdeaCaption>Temperature and internal energy mean the same thing - the hotter the higher internal energy</IdeaCaption>
    </div>
  )
}
function InternalEnergyReality() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-4">
      <div className="flex gap-3">
        <div className="flex flex-col items-center gap-1 p-2 rounded-[10px]" style={{ background: `${PART_C}15`, border: `1px solid ${PART_C}` }}>
          <span className="text-xs" style={{ color: PART_C }}>100°C water</span>
          <span className="text-xs text-center" style={{ color: '#cad5e2' }}>Low internal<br/>energy</span>
        </div>
        <div className="flex flex-col items-center gap-1 p-2 rounded-[10px]" style={{ background: '#00bc7d15', border: '1px solid #00bc7d' }}>
          <span className="text-xs" style={{ color: '#00bc7d' }}>100°C steam</span>
          <span className="text-xs text-center" style={{ color: '#cad5e2' }}>Higher internal<br/>energy!</span>
        </div>
      </div>
      <RealityBadge color={PART_C}>Same temperature, different internal energy - latent heat explains this</RealityBadge>
    </div>
  )
}

// ─── 14. Gas Pressure ───────────────────────────────────────────────────────
function GasPressureLesson() {
  const [tab, setTab] = useState(0) // 0=Boyle's, 1=P-T
  const [vol, setVol] = useState(60)  // Boyle slider: 20–100 (%)
  const [tempC, setTempC] = useState(27) // P-T slider: 0–300°C

  const tabs = ["Boyle's Law", 'Pressure–Temperature']

  // Boyle's: P1V1 = P2V2, P1=1, V1=100
  const P1 = 1, V1 = 100
  const P2 = Math.round(P1 * V1 / vol * 10) / 10

  // P-T: P1/T1 = P2/T2, T in Kelvin, P1=1 at T1=300K
  const T1 = 300
  const T2 = tempC + 273
  const PT_P2 = Math.round(P1 * T2 / T1 * 10) / 10

  // Piston x-position: vol=100 → pistonX=170, vol=20 → pistonX=90
  const pistonX = 90 + (vol / 100) * 80

  // Particle positions inside cylinder (relative to 0,0 = cylinder left inner)
  // cylinder inner: x 44–pistonX, y 30–90
  const boyleParticles = [
    {x:0.15,y:0.25},{x:0.45,y:0.15},{x:0.75,y:0.3},{x:0.2,y:0.65},
    {x:0.5,y:0.55},{x:0.8,y:0.7},{x:0.35,y:0.85},{x:0.65,y:0.45},
  ]

  const ptParticles = [
    {x:0.15,y:0.25},{x:0.5,y:0.15},{x:0.8,y:0.3},{x:0.2,y:0.6},
    {x:0.55,y:0.55},{x:0.85,y:0.7},{x:0.4,y:0.85},{x:0.7,y:0.4},
  ]

  return (
    <div className="w-full h-full flex flex-col items-center gap-2 pt-2 px-3" style={{ maxWidth: 480 }}>
      {/* Tab toggle */}
      <div className="flex gap-2">
        {tabs.map((t, i) => (
          <button key={i} onClick={() => setTab(i)}
            className="px-3 py-1 rounded-[8px] text-xs font-semibold"
            style={{ background: tab === i ? `${PART_C}22` : '#1d293d', color: tab === i ? PART_C : '#a8b8cc', border: `1px solid ${tab === i ? PART_C : '#2a3a52'}` }}>
            {t}
          </button>
        ))}
      </div>

      {tab === 0 ? (
        /* ── Boyle's Law ── */
        <div className="w-full flex flex-col items-center gap-2">
          <svg width="260" height="130" viewBox="0 0 260 130" style={{ display: 'block' }}>
            {/* cylinder body */}
            <rect x="40" y="28" width="150" height="64" rx="4" fill="#0f1829" stroke="#2a3a52" strokeWidth="1.5" />
            {/* piston (moves with vol slider) */}
            <motion.rect x={pistonX} y="28" width="12" height="64" rx="2"
              fill="#2a3a52" stroke={PART_C} strokeWidth="1.5"
              animate={{ x: pistonX }} transition={{ duration: 0.3 }} />
            {/* piston handle */}
            <motion.line x1={pistonX + 12} y1="60" x2={pistonX + 28} y2="60"
              stroke={PART_C} strokeWidth="2"
              animate={{ x1: pistonX + 12, x2: pistonX + 28 }} transition={{ duration: 0.3 }} />
            {/* particles bouncing inside */}
            {boyleParticles.map((p, i) => {
              const innerW = pistonX - 44
              const bx = 44 + p.x * innerW
              const by = 32 + p.y * 56
              return (
                <motion.circle key={i} cx={bx} cy={by} r={4}
                  fill={PART_C} fillOpacity={0.8}
                  animate={{ cx: [bx - 6, bx + 6, bx - 3, bx + 5, bx], cy: [by - 5, by + 4, by - 4, by + 6, by] }}
                  transition={{ repeat: Infinity, duration: 1 + i * 0.15, ease: 'easeInOut' }} />
              )
            })}
            {/* pressure label */}
            <rect x="42" y="98" width="60" height="14" rx="3" fill="#1d293d" />
            <text x="72" y="108" textAnchor="middle" fill={PART_C} fontSize={9} fontWeight="bold">P = {P2} atm</text>
            {/* volume label */}
            <text x="120" y="20" textAnchor="middle" fill="#637b96" fontSize={8}>V = {vol}%</text>
          </svg>
          <div className="w-full flex flex-col gap-1 px-2">
            <div className="flex justify-between text-xs">
              <span style={{ color: '#a8b8cc' }}>Volume (piston position)</span>
              <span style={{ color: PART_C }} className="font-bold">{vol}%</span>
            </div>
            <input type="range" min="20" max="100" value={vol} onChange={e => setVol(+e.target.value)} className="w-full" style={{ accentColor: PART_C }} />
          </div>
          <div className="px-3 py-1 rounded-[10px] font-mono font-bold text-sm" style={{ background: `${PART_C}18`, border: `1px solid ${PART_C}44`, color: PART_C }}>
            P₁V₁ = P₂V₂ (constant T)
          </div>
        </div>
      ) : (
        /* ── Pressure-Temperature ── */
        <div className="w-full flex flex-col items-center gap-2">
          <svg width="260" height="130" viewBox="0 0 260 130" style={{ display: 'block' }}>
            {/* fixed cylinder */}
            <rect x="40" y="28" width="160" height="64" rx="4" fill="#0f1829" stroke="#2a3a52" strokeWidth="1.5" />
            {/* sealed right wall (thicker to show fixed) */}
            <rect x="194" y="28" width="8" height="64" rx="2" fill="#2a3a52" stroke="#637b96" strokeWidth="1.5" />
            {/* particles  -  speed increases with T */}
            {ptParticles.map((p, i) => {
              const speed = 0.5 + (tempC / 300) * 2.5
              const bx = 44 + p.x * 148
              const by = 32 + p.y * 56
              return (
                <motion.circle key={i} cx={bx} cy={by} r={4}
                  fill={PART_C} fillOpacity={0.8}
                  animate={{ cx: [bx - 8*speed, bx + 7*speed, bx - 5*speed, bx + 9*speed, bx], cy: [by - 6*speed, by + 5*speed, by - 7*speed, by + 4*speed, by] }}
                  transition={{ repeat: Infinity, duration: Math.max(0.3, 1.4 - speed * 0.25 + i * 0.1), ease: 'easeInOut' }} />
              )
            })}
            {/* pressure label */}
            <rect x="42" y="98" width="60" height="14" rx="3" fill="#1d293d" />
            <text x="72" y="108" textAnchor="middle" fill={PART_C} fontSize={9} fontWeight="bold">P = {PT_P2} atm</text>
            {/* temp label */}
            <text x="130" y="20" textAnchor="middle" fill="#637b96" fontSize={8}>T = {tempC}°C = {T2} K</text>
          </svg>
          <div className="w-full flex flex-col gap-1 px-2">
            <div className="flex justify-between text-xs">
              <span style={{ color: '#a8b8cc' }}>Temperature</span>
              <span style={{ color: PART_C }} className="font-bold">{tempC}°C</span>
            </div>
            <input type="range" min="0" max="300" value={tempC} onChange={e => setTempC(+e.target.value)} className="w-full" style={{ accentColor: PART_C }} />
          </div>
          <div className="px-3 py-1 rounded-[10px] font-mono font-bold text-sm" style={{ background: `${PART_C}18`, border: `1px solid ${PART_C}44`, color: PART_C }}>
            P₁/T₁ = P₂/T₂ (constant V)
          </div>
          <div className="text-xs text-center" style={{ color: '#637b96' }}>T must be in Kelvin: T(K) = T(°C) + 273</div>
        </div>
      )}
    </div>
  )
}
function GasPressureIdea() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 p-4">
      <div className="relative w-20 h-16 rounded-[8px]" style={{ border: `1.5px solid ${PART_C}`, background: `${PART_C}08` }}>
        {[0, 1, 2].map(i => (
          <motion.div key={i} className="absolute w-3 h-3 rounded-full"
            style={{ background: PART_C, top: '15%', left: `${20 + i * 25}%` }}
            animate={{ y: [0, 20, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.2 }} />
        ))}
        <div className="absolute bottom-1 left-0 right-0 text-center text-xs" style={{ color: '#ef4444' }}>↓ only down</div>
      </div>
      <IdeaCaption>Gas pressure is caused by the weight of gas particles pressing down</IdeaCaption>
    </div>
  )
}
function GasPressureReality() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-4">
      <FormulaBox formula="pV = constant" color={PART_C} />
      <div className="text-xs text-center" style={{ color: '#cad5e2' }}>Pressure caused by particle <strong>collisions</strong> with container walls</div>
      <RealityBadge color={PART_C}>Pressure × Volume = constant (at fixed temperature)</RealityBadge>
    </div>
  )
}

// ─── 15. Atomic Structure ────────────────────────────────────────────────────
function AtomicStructureLesson() {
  // Electrons rotate on shells using SVG + motion
  const shells = [
    { r: 38, electrons: 2, period: 2.2 },
    { r: 58, electrons: 3, period: 3.4 },
  ]
  return (
    <div className="w-full h-full flex flex-col items-center gap-1 pt-2 px-2" style={{ maxWidth: 480 }}>
      <svg width="260" height="155" viewBox="0 0 260 155" style={{ display: 'block' }}>
        {/* orbital shells (dashed) */}
        {shells.map((s, si) => (
          <circle key={si} cx="130" cy="80" r={s.r} fill="none" stroke={ATOM_C} strokeWidth="1" strokeOpacity="0.3" strokeDasharray="4 3" />
        ))}
        {/* nucleus */}
        <circle cx="130" cy="80" r="18" fill={ATOM_C} fillOpacity="0.22" stroke={ATOM_C} strokeWidth="1.5" />
        <text x="130" y="76" textAnchor="middle" fill={ATOM_C} fontSize={8} fontWeight="bold">p⁺</text>
        <text x="130" y="87" textAnchor="middle" fill={ATOM_C} fontSize={8} fontWeight="bold">n</text>
        {/* nucleus label */}
        <text x="130" y="106" textAnchor="middle" fill="#637b96" fontSize={7}>Nucleus (protons + neutrons)</text>
        {/* electrons on shells  -  animated rotate via SVG animateTransform is tricky, use foreignObject trick or just static + motion.circle on path */}
        {shells.map((s, si) =>
          Array.from({ length: s.electrons }, (_, ei) => {
            const baseAngle = (2 * Math.PI * ei) / s.electrons
            return (
              <motion.circle key={`${si}-${ei}`}
                cx={130 + s.r * Math.cos(baseAngle)}
                cy={80 + s.r * Math.sin(baseAngle)}
                r={5} fill={ATOM_C} fillOpacity={0.95}
                style={{ filter: `drop-shadow(0 0 4px ${ATOM_C})` }}
                animate={{
                  cx: Array.from({ length: 36 }, (_, k) => 130 + s.r * Math.cos(baseAngle + (k / 35) * 2 * Math.PI)),
                  cy: Array.from({ length: 36 }, (_, k) => 80 + s.r * Math.sin(baseAngle + (k / 35) * 2 * Math.PI)),
                }}
                transition={{ repeat: Infinity, duration: s.period, ease: 'linear' }} />
            )
          })
        )}
        {/* e⁻ label */}
        <text x="174" y="44" fill={ATOM_C} fontSize={7.5}>e⁻</text>
        {/* size labels */}
        <line x1="130" y1="8" x2="188" y2="8" stroke="#2a3a52" strokeWidth="1" strokeDasharray="3 2" />
        <text x="132" y="7" fill="#637b96" fontSize={6.5}>r(atom) ≈ 10⁻¹⁰ m</text>
        <text x="132" y="136" fill="#637b96" fontSize={6.5} textAnchor="middle">r(nucleus) ≈ 10⁻¹⁵ m</text>
        <text x="132" y="145" fill="#637b96" fontSize={6.5} textAnchor="middle">Most of atom is empty space</text>
      </svg>
      {/* Particle table */}
      <div className="flex gap-2 w-full justify-center text-xs">
        {[
          { name: 'Proton', charge: '+1', mass: '1 u', col: '#f97316' },
          { name: 'Neutron', charge: '0', mass: '1 u', col: '#a8b8cc' },
          { name: 'Electron', charge: '−1', mass: '≈0', col: ATOM_C },
        ].map(p => (
          <div key={p.name} className="flex flex-col items-center gap-0.5 px-2 py-1 rounded-[8px]"
            style={{ background: `${p.col}14`, border: `1px solid ${p.col}33` }}>
            <span className="font-semibold" style={{ color: p.col }}>{p.name}</span>
            <span style={{ color: '#cad5e2' }}>Q: {p.charge}</span>
            <span style={{ color: '#a8b8cc' }}>m: {p.mass}</span>
          </div>
        ))}
      </div>
      <div className="text-xs text-center" style={{ color: '#637b96' }}>Z = proton number · A = mass number (A = Z + N)</div>
    </div>
  )
}
function AtomicStructureIdea() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 p-4">
      <div className="w-16 h-16 rounded-full flex items-center justify-center relative"
        style={{ background: 'radial-gradient(circle, #e879f930, #e879f910)', border: '2px solid #e879f9' }}>
        {['+', '−', '+', '−', '+'].map((c, i) => (
          <span key={i} className="absolute text-xs font-bold" style={{
            color: c === '+' ? '#e879f9' : '#2b7fff',
            top: `${15 + (i % 3) * 25}%`,
            left: `${10 + i * 15}%`,
          }}>{c}</span>
        ))}
        <span className="text-xs font-bold z-10" style={{ color: '#a8b8cc' }}>solid</span>
      </div>
      <div className="text-xs" style={{ color: '#ef4444' }}>Solid sphere - charges mixed throughout?</div>
      <IdeaCaption>The atom is a solid sphere with positive and negative charges spread evenly throughout</IdeaCaption>
    </div>
  )
}
function AtomicStructureReality() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-4">
      <div className="flex items-center gap-3">
        <div className="w-5 h-5 rounded-full flex items-center justify-center text-xs" style={{ background: '#e879f9', color: '#fff' }}>N</div>
        <div className="text-xs" style={{ color: '#a8b8cc' }}>tiny dense nucleus</div>
        <div className="w-2 h-2 rounded-full" style={{ background: '#e879f9' }} />
        <div className="text-xs" style={{ color: '#a8b8cc' }}>e⁻ shells</div>
      </div>
      <div className="text-xs text-center" style={{ color: '#cad5e2' }}>Nucleus: 1/10,000 of atom's radius<br/>Atom: mostly empty space</div>
      <RealityBadge color={ATOM_C}>Rutherford proved: tiny dense nucleus + electron shells</RealityBadge>
    </div>
  )
}

// ─── 16. Atomic Model History ─────────────────────────────────────────────────
function AtomicModelLesson() {
  const [active, setActive] = useState(null)

  const models = [
    {
      year: '1803', name: 'Dalton', color: '#a8b8cc',
      detail: 'Indivisible solid sphere. All matter made of tiny indestructible spheres.',
      diagram: (col) => (
        <svg width="40" height="40" viewBox="0 0 40 40">
          <circle cx="20" cy="20" r="16" fill={col} fillOpacity="0.7" stroke={col} strokeWidth="1.5" />
        </svg>
      ),
    },
    {
      year: '1897', name: 'Thomson', color: '#fdc700',
      detail: 'Electrons embedded in positive sphere  -  "plum pudding" model.',
      diagram: (col) => (
        <svg width="40" height="40" viewBox="0 0 40 40">
          <circle cx="20" cy="20" r="16" fill={col} fillOpacity="0.22" stroke={col} strokeWidth="1.5" />
          {[[12,14],[22,10],[28,22],[16,26],[24,28]].map(([x,y],i) => (
            <circle key={i} cx={x} cy={y} r="3" fill={ATOM_C} />
          ))}
        </svg>
      ),
    },
    {
      year: '1911', name: 'Rutherford', color: '#f97316',
      detail: 'Gold foil experiment: tiny dense positive nucleus, electrons at large distances.',
      diagram: (col) => (
        <svg width="40" height="40" viewBox="0 0 40 40">
          <circle cx="20" cy="20" r="14" fill="none" stroke={col} strokeWidth="1" strokeDasharray="3 2" />
          <circle cx="20" cy="20" r="4" fill={col} fillOpacity="0.9" stroke={col} strokeWidth="1.5" />
          <circle cx="34" cy="12" r="3" fill={ATOM_C} fillOpacity="0.9" />
        </svg>
      ),
    },
    {
      year: '1913', name: 'Bohr', color: ATOM_C,
      detail: 'Electrons occupy fixed quantised energy shells around the nucleus.',
      diagram: (col) => (
        <svg width="40" height="40" viewBox="0 0 40 40">
          <circle cx="20" cy="20" r="5" fill={col} fillOpacity="0.8" stroke={col} strokeWidth="1.5" />
          <circle cx="20" cy="20" r="11" fill="none" stroke={col} strokeWidth="1" />
          <circle cx="20" cy="20" r="17" fill="none" stroke={col} strokeWidth="1" strokeOpacity="0.5" />
          <circle cx="20" cy="9" r="3" fill={ATOM_C} />
          <circle cx="31" cy="26" r="3" fill={ATOM_C} fillOpacity="0.7" />
        </svg>
      ),
    },
  ]

  return (
    <div className="w-full h-full flex flex-col gap-2 pt-2 px-3" style={{ maxWidth: 480 }}>
      <div className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: ATOM_C }}>Development of the Atomic Model</div>
      {/* Vertical timeline */}
      <div className="relative flex flex-col gap-1">
        {/* vertical line */}
        <div className="absolute left-[19px] top-0 bottom-0 w-[2px] rounded-full" style={{ background: '#2a3a52' }} />
        {models.map((m, i) => (
          <div key={i}>
            <button className="flex items-center gap-3 w-full text-left rounded-[12px] px-2 py-1.5 transition-all"
              style={{ background: active === i ? `${m.color}18` : 'transparent', border: `1px solid ${active === i ? m.color : 'transparent'}` }}
              onClick={() => setActive(active === i ? null : i)}>
              {/* timeline dot */}
              <div className="w-9 h-9 shrink-0 rounded-full flex items-center justify-center z-10"
                style={{ background: '#0b1121', border: `2px solid ${active === i ? m.color : '#2a3a52'}` }}>
                {m.diagram(m.color)}
              </div>
              <div className="flex-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-xs font-bold" style={{ color: m.color }}>{m.name}</span>
                  <span className="text-xs" style={{ color: '#637b96' }}>{m.year}</span>
                </div>
                {active === i && (
                  <motion.div className="text-xs mt-0.5" style={{ color: '#cad5e2' }}
                    initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                    {m.detail}
                  </motion.div>
                )}
              </div>
              <span className="text-xs" style={{ color: '#637b96' }}>{active === i ? '▲' : '▼'}</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
function AtomicModelIdea() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 p-4">
      <div className="w-16 h-12 rounded-full flex items-center justify-center relative"
        style={{ background: '#e879f915', border: '1px solid #e879f940' }}>
        {['+', '−', '+', '−'].map((c, i) => (
          <span key={i} className="absolute text-xs font-bold" style={{
            color: c === '+' ? '#e879f9' : '#2b7fff',
            top: `${20 + (i % 2) * 40}%`, left: `${15 + i * 20}%`,
          }}>{c}</span>
        ))}
        <span className="text-xs" style={{ color: '#a8b8cc' }}>pudding</span>
      </div>
      <div className="text-xs text-center px-1" style={{ color: '#ef4444' }}>
        Just a theory? No - Geiger-Marsden proved it wrong
      </div>
      <IdeaCaption>The plum pudding model was replaced just because scientists found a better theory - not from any experiment</IdeaCaption>
    </div>
  )
}
function AtomicModelReality() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-4">
      <div className="text-xs text-center p-2 rounded-[10px]" style={{ background: `${ATOM_C}10`, border: `1px solid ${ATOM_C}30`, color: '#cad5e2' }}>
        Rutherford fired α particles at gold foil. Most passed through - a few deflected sharply back. This proved a tiny dense positive nucleus exists.
      </div>
      <RealityBadge color={ATOM_C}>New experimental evidence led directly to model revision</RealityBadge>
    </div>
  )
}

// ─── 17. Radioactive Decay ───────────────────────────────────────────────────
function RadioactiveDecayLesson() {
  // Penetration diagram: 3 rows, animated particles/waves, barriers
  // Row heights: ~38px each, SVG total ~130px tall + table below
  const AC = '#f97316'  // alpha
  const BC = '#c084fc'  // beta
  const GC = '#00a8e8'  // gamma

  return (
    <div className="w-full h-full flex flex-col items-center gap-2 pt-2 px-2" style={{ maxWidth: 480 }}>
      {/* Penetration SVG */}
      <svg width="260" height="155" viewBox="0 0 260 155" style={{ display: 'block' }}>
        {/* barriers: paper, aluminium, lead */}
        {/* Paper: x=100 */}
        <rect x="100" y="4" width="8" height="148" fill="#fdc700" fillOpacity="0.22" stroke="#fdc700" strokeWidth="1" strokeOpacity="0.5" />
        <text x="104" y="156" textAnchor="middle" fill="#fdc700" fontSize={6.5}>Paper</text>
        {/* Aluminium: x=145 */}
        <rect x="145" y="4" width="10" height="148" fill="#a8b8cc" fillOpacity="0.22" stroke="#a8b8cc" strokeWidth="1" strokeOpacity="0.5" />
        <text x="150" y="156" textAnchor="middle" fill="#a8b8cc" fontSize={6.5}>Al</text>
        {/* Lead: x=190 */}
        <rect x="190" y="4" width="14" height="148" fill="#637b96" fillOpacity="0.35" stroke="#637b96" strokeWidth="1.5" strokeOpacity="0.7" />
        <text x="197" y="156" textAnchor="middle" fill="#637b96" fontSize={6.5}>Lead</text>

        {/* Source box */}
        <rect x="6" y="6" width="22" height="142" rx="4" fill="#1d293d" stroke="#2a3a52" strokeWidth="1" />
        <text x="17" y="80" textAnchor="middle" fill="#a8b8cc" fontSize={7} transform="rotate(-90,17,80)">Source</text>

        {/* ── α row (y center = 30) ── */}
        <text x="30" y="33" fill={AC} fontSize={9} fontWeight="bold">α</text>
        {/* animated large circle → stops at paper */}
        <motion.circle cx={50} cy={28} r={7} fill={AC} fillOpacity={0.9}
          animate={{ cx: [50, 100, 100] }}
          transition={{ repeat: Infinity, duration: 2, times: [0, 0.5, 1], ease: 'linear' }} />
        {/* stop marker */}
        <line x1="100" y1="22" x2="100" y2="34" stroke={AC} strokeWidth="2" />
        <text x="118" y="32" fill={AC} fontSize={7}>stopped by paper / skin</text>

        {/* ── β row (y center = 80) ── */}
        <text x="30" y="83" fill={BC} fontSize={9} fontWeight="bold">β</text>
        <motion.circle cx={50} cy={78} r={4} fill={BC} fillOpacity={0.9}
          animate={{ cx: [50, 145, 145] }}
          transition={{ repeat: Infinity, duration: 2.2, times: [0, 0.7, 1], ease: 'linear' }} />
        <line x1="145" y1="72" x2="145" y2="84" stroke={BC} strokeWidth="2" />
        <text x="160" y="82" fill={BC} fontSize={7}>stopped by few mm Al</text>

        {/* ── γ row (y center = 128) ── */}
        <text x="30" y="131" fill={GC} fontSize={9} fontWeight="bold">γ</text>
        {/* wavy line for gamma */}
        <motion.path
          d="M50,128 Q55,122 60,128 Q65,134 70,128 Q75,122 80,128 Q85,134 90,128 Q95,122 100,128 Q105,134 110,128 Q115,122 120,128 Q125,134 130,128 Q135,122 140,128 Q145,134 150,128 Q155,122 160,128 Q165,134 170,128 Q175,122 180,128 Q185,134 190,128"
          fill="none" stroke={GC} strokeWidth="2" strokeLinecap="round"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ repeat: Infinity, duration: 2.5, ease: 'linear' }} />
        <text x="208" y="131" fill={GC} fontSize={7}>reduced by lead</text>
      </svg>

      {/* Comparison mini-table */}
      <div className="flex gap-1.5 w-full justify-center text-xs">
        {[
          { sym: 'α', name: 'He nucleus', charge: '+2', ion: 'Most', col: AC },
          { sym: 'β', name: 'Electron', charge: '±1', ion: 'Moderate', col: BC },
          { sym: 'γ', name: 'EM wave', charge: '0', ion: 'Least', col: GC },
        ].map(r => (
          <div key={r.sym} className="flex flex-col items-center gap-0.5 px-2 py-1 rounded-[8px]"
            style={{ background: `${r.col}14`, border: `1px solid ${r.col}33` }}>
            <span className="font-bold text-sm" style={{ color: r.col }}>{r.sym}</span>
            <span style={{ color: '#cad5e2' }}>{r.name}</span>
            <span style={{ color: '#a8b8cc' }}>Q: {r.charge}</span>
            <span style={{ color: '#fdc700' }}>{r.ion} ionising</span>
          </div>
        ))}
      </div>
    </div>
  )
}
function RadioactiveDecayIdea() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 p-4">
      <div className="flex gap-2">
        {[['α', '#f97316'], ['β', '#2b7fff'], ['γ', '#e879f9']].map(([sym, col]) => (
          <div key={sym} className="flex flex-col items-center gap-1">
            <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm"
              style={{ background: `${col}20`, border: `2px solid ${col}`, color: col }}>{sym}</div>
            <span className="text-xs font-bold" style={{ color: '#ef4444' }}>same!</span>
          </div>
        ))}
      </div>
      <IdeaCaption>All three types of radiation are equally dangerous and can all penetrate the human body</IdeaCaption>
    </div>
  )
}
function RadioactiveDecayReality() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-4">
      <div className="flex gap-2 text-xs">
        {[['α', 'Paper', '#e879f9'], ['β', 'Aluminium', '#c084fc'], ['γ', 'Lead/concrete', '#00a8e8']].map(([s, stop, col]) => (
          <div key={s} className="flex flex-col items-center gap-1 p-2 rounded-[8px]" style={{ background: `${col}10`, border: `1px solid ${col}` }}>
            <span className="font-bold" style={{ color: col }}>{s}</span>
            <span className="text-center" style={{ color: '#cad5e2' }}>stopped by {stop}</span>
          </div>
        ))}
      </div>
      <RealityBadge color={ATOM_C}>Penetration and ionising power are inversely related</RealityBadge>
    </div>
  )
}

// ─── 18. Nuclear Equations ───────────────────────────────────────────────────
function NuclearEquationsLesson() {
  const [tab, setTab] = useState(0)
  const tabs = ['α decay', 'β⁻ decay', 'γ emission']

  // Helper: AZX notation rendered in SVG
  // NuclideSVG renders the AₓZ symbol with A top-left, Z bottom-left, symbol center
  function NuclideBox({ A, Z, sym, col, x, y }) {
    return (
      <g>
        <text x={x - 5} y={y - 5} textAnchor="end" fill={col} fontSize={9} fontWeight="bold">{A}</text>
        <text x={x} y={y + 6} textAnchor="middle" fill={col} fontSize={16} fontWeight="bold">{sym}</text>
        <text x={x - 5} y={y + 9} textAnchor="end" fill={col} fontSize={9}>{Z}</text>
      </g>
    )
  }

  // α decay animation: nucleus splits
  const [anim, setAnim] = useState(false)
  useEffect(() => {
    const t = setInterval(() => setAnim(a => !a), 2200)
    return () => clearInterval(t)
  }, [tab])

  const decayData = [
    {
      svg: (
        <svg width="260" height="110" viewBox="0 0 260 110" style={{ display: 'block' }}>
          {/* U-238 parent */}
          <motion.circle cx={anim ? 30 : 40} cy={55} r={18} fill={`${ATOM_C}30`} stroke={ATOM_C} strokeWidth="1.5"
            animate={{ cx: anim ? 30 : 40 }} transition={{ duration: 0.5 }} />
          <NuclideBox A="238" Z="92" sym="U" col={ATOM_C} x={anim ? 30 : 40} y={55} />
          {/* arrow */}
          <motion.line x1={anim ? 58 : 65} y1={55} x2={anim ? 70 : 65} y2={55}
            stroke="#637b96" strokeWidth="1.5"
            animate={{ x1: anim ? 58 : 65, x2: anim ? 80 : 65 }} transition={{ duration: 0.5 }} />
          <motion.polygon points={`${anim ? 80 : 65},51 ${anim ? 88 : 65},55 ${anim ? 80 : 65},59`}
            fill="#637b96" animate={{ points: `${anim ? 80 : 65},51 ${anim ? 88 : 65},55 ${anim ? 80 : 65},59` }} transition={{ duration: 0.5 }} />
          {/* Th-234 product */}
          <motion.g animate={{ opacity: anim ? 1 : 0.3 }} transition={{ duration: 0.5 }}>
            <circle cx={130} cy={45} r={15} fill="#c084fc30" stroke="#c084fc" strokeWidth="1.5" />
            <NuclideBox A="234" Z="90" sym="Th" col="#c084fc" x={130} y={45} />
          </motion.g>
          {/* + sign */}
          <motion.text x={165} y={55} textAnchor="middle" fill="#637b96" fontSize={14}
            animate={{ opacity: anim ? 1 : 0.3 }} transition={{ duration: 0.5 }}>+</motion.text>
          {/* He-4 alpha */}
          <motion.g animate={{ opacity: anim ? 1 : 0.3, x: anim ? 0 : -20 }} transition={{ duration: 0.5 }}>
            <circle cx={200} cy={65} r={10} fill="#f9731630" stroke="#f97316" strokeWidth="1.5" />
            <NuclideBox A="4" Z="2" sym="He" col="#f97316" x={200} y={65} />
          </motion.g>
          {/* change labels */}
          <text x="130" y="100" textAnchor="middle" fill="#637b96" fontSize={7.5}>A: 238 → 234 (−4) · Z: 92 → 90 (−2)</text>
        </svg>
      ),
      note: 'α decay: A decreases by 4, Z decreases by 2',
    },
    {
      svg: (
        <svg width="260" height="110" viewBox="0 0 260 110" style={{ display: 'block' }}>
          {/* C-14 parent */}
          <circle cx={38} cy={55} r={16} fill={`${ATOM_C}30`} stroke={ATOM_C} strokeWidth="1.5" />
          <NuclideBox A="14" Z="6" sym="C" col={ATOM_C} x={38} y={55} />
          <text x={72} y={59} textAnchor="middle" fill="#637b96" fontSize={16}>→</text>
          {/* N-14 product */}
          <circle cx={110} cy={55} r={16} fill="#00bc7d30" stroke="#00bc7d" strokeWidth="1.5" />
          <NuclideBox A="14" Z="7" sym="N" col="#00bc7d" x={110} y={55} />
          <text x={140} y={59} textAnchor="middle" fill="#637b96" fontSize={14}>+</text>
          {/* electron */}
          <circle cx={175} cy={55} r={8} fill="#c084fc30" stroke="#c084fc" strokeWidth="1.5" />
          <NuclideBox A="0" Z="-1" sym="e" col="#c084fc" x={175} y={55} />
          {/* neutron→proton label */}
          <text x="130" y="92" textAnchor="middle" fill="#637b96" fontSize={7.5}>A: unchanged · Z: 6 → 7 (+1)</text>
          <text x="130" y="103" textAnchor="middle" fill="#637b96" fontSize={7}>neutron → proton + electron (from nucleus)</text>
        </svg>
      ),
      note: 'β⁻ decay: A unchanged, Z increases by 1',
    },
    {
      svg: (
        <svg width="260" height="110" viewBox="0 0 260 110" style={{ display: 'block' }}>
          {/* excited nucleus */}
          <motion.circle cx={70} cy={55} r={18} fill={`${ATOM_C}30`} stroke={ATOM_C} strokeWidth="1.5"
            animate={{ r: [18, 22, 18], fillOpacity: [0.3, 0.55, 0.3] }}
            transition={{ repeat: Infinity, duration: 1.2 }} />
          <text x={70} y={52} textAnchor="middle" fill={ATOM_C} fontSize={8} fontWeight="bold">Excited</text>
          <text x={70} y={63} textAnchor="middle" fill={ATOM_C} fontSize={8}>nucleus</text>
          {/* wavy gamma ray */}
          <motion.path
            d="M92,55 Q98,48 104,55 Q110,62 116,55 Q122,48 128,55 Q134,62 140,55 Q146,48 152,55 Q158,62 164,55 Q170,48 176,55 Q182,62 188,55"
            fill="none" stroke="#00a8e8" strokeWidth="2.2" strokeLinecap="round"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }} />
          <text x={200} y={50} fill="#00a8e8" fontSize={8} fontWeight="bold">γ</text>
          <text x={200} y={62} fill="#00a8e8" fontSize={7}>photon</text>
          {/* product nucleus unchanged */}
          <circle cx={70} cy={55} r={18} fill="none" />
          <text x="130" y="95" textAnchor="middle" fill="#637b96" fontSize={7.5}>A and Z unchanged · only energy released</text>
          <text x="130" y="106" textAnchor="middle" fill="#637b96" fontSize={7}>Often follows α or β decay</text>
        </svg>
      ),
      note: 'γ emission: A and Z unchanged  -  energy only',
    },
  ]

  return (
    <div className="w-full h-full flex flex-col items-center gap-2 pt-2 px-2" style={{ maxWidth: 480 }}>
      <div className="flex gap-2">
        {tabs.map((t, i) => (
          <button key={i} onClick={() => setTab(i)}
            className="px-3 py-1 rounded-[8px] text-xs font-semibold"
            style={{ background: tab === i ? `${ATOM_C}22` : '#1d293d', color: tab === i ? ATOM_C : '#a8b8cc', border: `1px solid ${tab === i ? ATOM_C : '#2a3a52'}` }}>
            {t}
          </button>
        ))}
      </div>
      <div className="rounded-[14px] p-2" style={{ background: `${ATOM_C}08`, border: `1px solid ${ATOM_C}28` }}>
        {decayData[tab].svg}
      </div>
      <div className="text-xs text-center px-2 py-1 rounded-[8px]" style={{ background: '#1d293d', color: '#cad5e2' }}>
        {decayData[tab].note}
      </div>
    </div>
  )
}
function NuclearEquationsIdea() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 p-4">
      <div className="font-mono text-sm p-2 rounded-[8px]" style={{ background: `${ATOM_C}10`, border: `1px solid ${ATOM_C}30`, color: ATOM_C }}>
        ²²⁶Ra → ²²²Rn + α
      </div>
      <div className="flex gap-3 text-xs">
        <div className="px-2 py-1 rounded" style={{ background: '#00bc7d15', color: '#00bc7d' }}>Mass ✓ 226=222+4</div>
        <div className="px-2 py-1 rounded" style={{ background: '#ef444415', color: '#ef4444' }}>Z ignored?</div>
      </div>
      <IdeaCaption>In nuclear equations you only need to balance the mass numbers - atomic numbers don't matter</IdeaCaption>
    </div>
  )
}
function NuclearEquationsReality() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-4">
      <div className="flex gap-4 text-xs">
        <div className="flex flex-col items-center p-2 rounded-[8px]" style={{ background: `${ATOM_C}10`, border: `1px solid ${ATOM_C}` }}>
          <span style={{ color: ATOM_C }}>Mass number</span>
          <span style={{ color: '#cad5e2' }}>top - must balance</span>
        </div>
        <div className="flex flex-col items-center p-2 rounded-[8px]" style={{ background: '#c084fc10', border: '1px solid #c084fc' }}>
          <span style={{ color: '#c084fc' }}>Atomic number</span>
          <span style={{ color: '#cad5e2' }}>bottom - must balance</span>
        </div>
      </div>
      <RealityBadge color={ATOM_C}>Both mass AND atomic numbers must balance on each side</RealityBadge>
    </div>
  )
}

// ─── 19. Half-Life ───────────────────────────────────────────────────────────
function HalfLifeLesson() {
  const [n, setN] = useState(0)  // number of half-lives shown (0–4)
  const [hlEx, setHlEx] = useState(0) // example index

  const examples = [
    { name: 'Carbon-14', t: '5730 years' },
    { name: 'Iodine-131', t: '8 days' },
    { name: 'Uranium-238', t: '4.5×10⁹ years' },
  ]

  // Graph params
  const gx = (xn) => 34 + xn * 46   // x position for half-life tick xn=0..4
  const gy = (pct) => 10 + (1 - pct / 100) * 110  // y position for activity %

  // Exponential curve points N₀×(½)^x from x=0 to 4
  const curvePoints = Array.from({ length: 41 }, (_, i) => {
    const x = i / 10  // 0..4 in 0.1 steps
    return `${gx(x)},${gy(100 * Math.pow(0.5, x))}`
  }).join(' ')

  // Dashed guide lines at y=50,25,12.5 and x=1,2,3
  const dashes = [
    { y: 50, x: 1 }, { y: 25, x: 2 }, { y: 12.5, x: 3 },
  ]

  const activity = Math.round(100 * Math.pow(0.5, n) * 10) / 10

  return (
    <div className="w-full h-full flex flex-col items-center gap-1 pt-2 px-2" style={{ maxWidth: 480 }}>
      <svg width="260" height="140" viewBox="0 0 260 140" style={{ display: 'block' }}>
        {/* axes */}
        <line x1="34" y1="120" x2="240" y2="120" stroke="#2a3a52" strokeWidth="1.2" />
        <line x1="34" y1="10" x2="34" y2="120" stroke="#2a3a52" strokeWidth="1.2" />
        {/* axis labels */}
        <text x="137" y="134" textAnchor="middle" fill="#637b96" fontSize={8}>Number of half-lives (n)</text>
        <text x="12" y="65" textAnchor="middle" fill="#637b96" fontSize={8} transform="rotate(-90,12,65)">Activity (%)</text>
        {/* x ticks */}
        {[0,1,2,3,4].map(x => (
          <g key={x}>
            <line x1={gx(x)} y1="120" x2={gx(x)} y2="124" stroke="#2a3a52" strokeWidth="1" />
            <text x={gx(x)} y="130" textAnchor="middle" fill="#637b96" fontSize={7.5}>{x}</text>
          </g>
        ))}
        {/* y ticks */}
        {[0,25,50,75,100].map(pct => (
          <g key={pct}>
            <line x1="30" y1={gy(pct)} x2="34" y2={gy(pct)} stroke="#2a3a52" strokeWidth="1" />
            <text x="28" y={gy(pct) + 3} textAnchor="end" fill="#637b96" fontSize={7}>{pct}</text>
          </g>
        ))}
        {/* dashed guide lines */}
        {dashes.map(({ y: pct, x: xn }, i) => (
          <g key={i}>
            <line x1="34" y1={gy(pct)} x2={gx(xn)} y2={gy(pct)}
              stroke="#2a3a52" strokeWidth="1" strokeDasharray="3 2" />
            <line x1={gx(xn)} y1={gy(pct)} x2={gx(xn)} y2="120"
              stroke="#2a3a52" strokeWidth="1" strokeDasharray="3 2" />
            <text x={gx(xn) + 2} y={gy(pct) - 2} fill="#637b96" fontSize={6.5}>{pct}%</text>
          </g>
        ))}
        {/* decay curve  -  animated */}
        <motion.polyline points={curvePoints}
          fill="none" stroke="#fdc700" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 1.8, ease: 'easeInOut' }} />
        {/* current n marker */}
        <motion.circle
          cx={gx(n)} cy={gy(activity)}
          r={5} fill="#fdc700" stroke="#0b1121" strokeWidth="1.5"
          animate={{ cx: gx(n), cy: gy(activity) }} transition={{ duration: 0.3 }} />
      </svg>

      {/* Slider + readout */}
      <div className="w-full flex items-center gap-3 px-2">
        <div className="flex-1">
          <div className="flex justify-between text-xs mb-1">
            <span style={{ color: '#a8b8cc' }}>Half-lives elapsed</span>
            <span style={{ color: '#fdc700' }} className="font-bold">{n}</span>
          </div>
          <input type="range" min="0" max="4" step="1" value={n} onChange={e => setN(+e.target.value)} className="w-full" style={{ accentColor: '#fdc700' }} />
        </div>
        <div className="text-center">
          <motion.div key={n} className="text-lg font-bold font-mono" style={{ color: '#fdc700' }}
            initial={{ scale: 0.7 }} animate={{ scale: 1 }}>{activity}%</motion.div>
          <div className="text-xs" style={{ color: '#a8b8cc' }}>activity</div>
        </div>
      </div>

      {/* Formula + examples */}
      <div className="flex items-center gap-2 w-full justify-center">
        <div className="px-2 py-1 rounded-[8px] font-mono text-xs font-bold" style={{ background: `${ATOM_C}18`, border: `1px solid ${ATOM_C}44`, color: ATOM_C }}>
          N = N₀ × (½)ⁿ
        </div>
        <div className="flex gap-1">
          {examples.map((ex, i) => (
            <button key={i} onClick={() => setHlEx(i)}
              className="px-2 py-0.5 rounded-[6px] text-xs"
              style={{ background: hlEx === i ? `${ATOM_C}22` : '#1d293d', color: hlEx === i ? ATOM_C : '#637b96', border: `1px solid ${hlEx === i ? ATOM_C : '#2a3a52'}` }}>
              {ex.name.split('-')[0]}-{ex.name.split('-')[1]?.slice(0,3)}
            </button>
          ))}
        </div>
      </div>
      <div className="text-xs text-center" style={{ color: '#637b96' }}>
        {examples[hlEx].name}: t½ = {examples[hlEx].t}
      </div>
    </div>
  )
}
function HalfLifeIdea() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 p-4">
      <div className="flex gap-2 items-end">
        {[['t=0', 100, '#e879f9'], ['t=1T', 50, '#e879f9'], ['t=2T', 0, '#1d293d']].map(([label, pct, col], i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <div className="w-8 rounded-t-[4px]" style={{ height: Math.max(pct * 0.4, 4), background: col }} />
            <span className="text-xs" style={{ color: '#a8b8cc' }}>{label}</span>
            <span className="text-xs font-bold" style={{ color: i === 2 ? '#ef4444' : ATOM_C }}>{pct}%</span>
          </div>
        ))}
      </div>
      <div className="text-xs" style={{ color: '#ef4444' }}>After 2 half-lives → 0%?</div>
      <IdeaCaption>After 2 half-lives the radioactive material is completely gone - used up</IdeaCaption>
    </div>
  )
}
function HalfLifeReality() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-4">
      <div className="font-mono text-xs" style={{ color: ATOM_C }}>
        Start: 100% → ½-life: 50% → ½-life: 25% → ½-life: 12.5%
      </div>
      <div className="text-xs text-center" style={{ color: '#cad5e2' }}>Each half-life halves the remaining activity - it never reaches exactly zero</div>
      <RealityBadge color={ATOM_C}>Half-life halves remaining activity each time - never reaches 0</RealityBadge>
    </div>
  )
}

// ─── 20. Radiation Hazards & Uses ────────────────────────────────────────────
function RadiationHazardsLesson() {
  const uses = [
    { type: 'α', use: 'Smoke detectors  -  ionises air gap', col: '#f97316' },
    { type: 'β', use: 'Paper thickness gauge (industry)', col: '#c084fc' },
    { type: 'γ', use: 'Cancer radiotherapy (targeted)', col: '#00a8e8' },
    { type: 'γ', use: 'Medical PET scan / β tracers', col: '#00a8e8' },
    { type: 'γ', use: 'Weld inspection (industrial)', col: '#2b7fff' },
  ]

  const hazards = [
    { text: 'Ionising radiation damages cells / DNA', col: '#ef4444' },
    { text: 'Can cause cancer or mutations', col: '#ef4444' },
    { text: 'α most dangerous inside body', col: '#f97316' },
    { text: 'Reduce exposure: ↑ distance, ↓ time, shielding', col: '#fdc700' },
  ]

  return (
    <div className="w-full h-full flex flex-col gap-2 pt-2 px-2" style={{ maxWidth: 480 }}>
      <div className="flex gap-2">
        {/* Uses column */}
        <div className="flex-1">
          <div className="text-xs font-bold mb-1.5" style={{ color: '#00bc7d' }}>Uses</div>
          <div className="flex flex-col gap-1">
            {uses.map((u, i) => (
              <motion.div key={i} className="flex items-start gap-1.5 p-1.5 rounded-[8px]"
                style={{ background: `${u.col}10`, border: `1px solid ${u.col}25` }}
                initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>
                <span className="font-bold text-xs shrink-0" style={{ color: u.col }}>{u.type}</span>
                <span style={{ color: '#cad5e2', fontSize: 10 }}>{u.use}</span>
              </motion.div>
            ))}
          </div>
        </div>
        {/* Hazards column */}
        <div className="flex-1">
          <div className="text-xs font-bold mb-1.5" style={{ color: '#ef4444' }}>Hazards</div>
          <div className="flex flex-col gap-1">
            {hazards.map((h, i) => (
              <motion.div key={i} className="p-1.5 rounded-[8px]"
                style={{ background: `${h.col}0e`, border: `1px solid ${h.col}25` }}
                initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 + 0.2 }}>
                <span style={{ color: '#cad5e2', fontSize: 10 }}>{h.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      {/* Key distinction badge */}
      <div className="flex items-center gap-2 p-2 rounded-[10px] mt-1"
        style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)' }}>
        <Shield size={13} color="#ef4444" />
        <span className="text-xs font-semibold" style={{ color: '#ef4444' }}>Contamination = source ON/IN you · Irradiation = exposed FROM outside</span>
      </div>
    </div>
  )
}
function RadiationHazardsIdea() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 p-4">
      <div className="flex gap-4 items-center">
        <div className="flex flex-col items-center gap-1">
          <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: '#ef444420', border: '2px solid #ef4444' }}>
            <span className="text-base">☢</span>
          </div>
          <span className="text-xs" style={{ color: '#ef4444' }}>Outside</span>
          <span className="text-xs font-bold" style={{ color: '#ef4444' }}>MORE danger</span>
        </div>
        <span style={{ color: '#a8b8cc', fontSize: 18 }}>&gt;</span>
        <div className="flex flex-col items-center gap-1">
          <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: '#a8b8cc20', border: '2px solid #a8b8cc' }}>
            <span className="text-base">💊</span>
          </div>
          <span className="text-xs" style={{ color: '#a8b8cc' }}>Inside</span>
          <span className="text-xs" style={{ color: '#a8b8cc' }}>less?</span>
        </div>
      </div>
      <IdeaCaption>Radiation from a source outside the body is always more dangerous than swallowing a source</IdeaCaption>
    </div>
  )
}
function RadiationHazardsReality() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-4">
      <div className="flex gap-3">
        <div className="flex flex-col items-center gap-1 p-2 rounded-[10px]" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid #ef4444' }}>
          <Shield size={18} color="#ef4444" />
          <span className="text-xs text-center" style={{ color: '#ef4444' }}>Contamination<br/>inside body = more<br/>dangerous</span>
        </div>
        <div className="flex flex-col items-center gap-1 p-2 rounded-[10px]" style={{ background: 'rgba(253,199,0,0.1)', border: '1px solid #fdc700' }}>
          <AlertTriangle size={18} color="#fdc700" />
          <span className="text-xs text-center" style={{ color: '#fdc700' }}>Irradiation<br/>outside body = less<br/>dangerous</span>
        </div>
      </div>
      <RealityBadge color={ATOM_C}>Alpha is most dangerous when inhaled/ingested - but stopped by skin externally</RealityBadge>
    </div>
  )
}

// ─── 21. Nuclear Fission ─────────────────────────────────────────────────────
function NuclearFissionLesson() {
  const [stage, setStage] = useState(0) // 0=ready, 1=neutron moving, 2=fission, 3=chain
  const stages = ['Fire neutron →', 'Fission!', 'Chain reaction', 'Reset']

  function advance() {
    setStage(s => (s + 1) % 4)
  }

  // Neutron moves from x=95 → x=58 (hits U-235 at cx=58)
  const neutronX = stage >= 1 ? 62 : 95

  return (
    <div className="w-full h-full flex flex-col items-center gap-2 pt-2 px-2" style={{ maxWidth: 480 }}>
      <svg width="260" height="185" viewBox="0 0 260 185" style={{ display: 'block' }}>
        {/* ── Stage 0 & 1: Initial U-235 + incoming neutron ── */}
        {stage < 2 && (
          <g>
            <circle cx="58" cy="92" r="20" fill={`${ATOM_C}30`} stroke={ATOM_C} strokeWidth="1.5" />
            <text x="58" y="89" textAnchor="middle" fill={ATOM_C} fontSize={8} fontWeight="bold">U-235</text>
            <text x="58" y="100" textAnchor="middle" fill={ATOM_C} fontSize={7}>nucleus</text>
            {/* incoming neutron */}
            <motion.circle cx={neutronX} cy={92} r={5} fill="#fdc700" stroke="#fdc700" strokeWidth="1"
              animate={{ cx: neutronX }} transition={{ duration: 0.5 }} />
            <text x="115" y="85" fill="#fdc700" fontSize={7.5}>neutron (thermal)</text>
            {stage === 0 && (
              <line x1="70" y1="92" x2="90" y2="92" stroke="#fdc700" strokeWidth="1" strokeDasharray="3 2" />
            )}
          </g>
        )}

        {/* ── Stage 2+: Fission products ── */}
        {stage >= 2 && (
          <g>
            {/* Ba-141 fragment */}
            <motion.circle cx={110} cy={62} r={14}
              fill="#c084fc30" stroke="#c084fc" strokeWidth="1.5"
              initial={{ cx: 58, cy: 92, r: 0 }} animate={{ cx: 110, cy: 62, r: 14 }}
              transition={{ duration: 0.5 }} />
            <text x="110" y="59" textAnchor="middle" fill="#c084fc" fontSize={8} fontWeight="bold">Ba</text>
            <text x="110" y="70" textAnchor="middle" fill="#c084fc" fontSize={7}>141</text>
            <text x="110" y="82" textAnchor="middle" fill="#637b96" fontSize={6.5}>fission fragment</text>

            {/* Kr-92 fragment */}
            <motion.circle cx={108} cy={122} r={11}
              fill="#00a8e820" stroke="#00a8e8" strokeWidth="1.5"
              initial={{ cx: 58, cy: 92, r: 0 }} animate={{ cx: 108, cy: 122, r: 11 }}
              transition={{ duration: 0.5 }} />
            <text x="108" y="119" textAnchor="middle" fill="#00a8e8" fontSize={8} fontWeight="bold">Kr</text>
            <text x="108" y="130" textAnchor="middle" fill="#00a8e8" fontSize={7}>92</text>
            <text x="108" y="142" textAnchor="middle" fill="#637b96" fontSize={6.5}>fission fragment</text>

            {/* 3 outgoing neutrons */}
            {[[160, 48], [165, 92], [160, 136]].map(([nx, ny], i) => (
              <motion.circle key={i} cx={nx} cy={ny} r={4}
                fill="#fdc700"
                initial={{ cx: 90, cy: 92, opacity: 0 }} animate={{ cx: nx, cy: ny, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }} />
            ))}
            <motion.text x="178" y="45" fill="#fdc700" fontSize={7.5} fontWeight="bold"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
              2–3 neutrons
            </motion.text>
            <motion.text x="178" y="55" fill="#fdc700" fontSize={7}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}>
              released
            </motion.text>
          </g>
        )}

        {/* ── Stage 3: Chain reaction  -  2nd generation nuclei ── */}
        {stage >= 3 && (
          <g>
            {[[210, 48], [215, 92], [210, 136]].map(([ux, uy], i) => (
              <g key={i}>
                <motion.circle cx={ux} cy={uy} r={9}
                  fill={`${ATOM_C}25`} stroke={ATOM_C} strokeWidth="1"
                  initial={{ opacity: 0, r: 0 }} animate={{ opacity: 1, r: 9 }}
                  transition={{ delay: 0.3 + i * 0.1 }} />
                <motion.text x={ux} y={uy + 3} textAnchor="middle" fill={ATOM_C} fontSize={6}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 + i * 0.1 }}>
                  U-235
                </motion.text>
              </g>
            ))}
            <motion.text x="130" y="175" textAnchor="middle" fill="#637b96" fontSize={7.5}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
              Each fission triggers more → chain reaction
            </motion.text>
          </g>
        )}

        {/* Labels always visible */}
        {stage < 2 && (
          <text x="130" y="175" textAnchor="middle" fill="#637b96" fontSize={7.5}>
            2–3 neutrons released per fission → chain reaction
          </text>
        )}
      </svg>

      <motion.button className="px-4 py-2 rounded-[10px] text-xs font-semibold"
        style={{ background: `${ATOM_C}20`, border: `1px solid ${ATOM_C}`, color: ATOM_C }}
        onClick={advance} whileTap={{ scale: 0.95 }}>
        {stages[stage]}
      </motion.button>

      <div className="flex gap-2 text-xs w-full justify-center">
        <div className="px-2 py-1 rounded-[6px]" style={{ background: '#1d293d', color: '#a8b8cc' }}>Controlled (reactor): 1 neutron/fission</div>
        <div className="px-2 py-1 rounded-[6px]" style={{ background: '#1d293d', color: '#a8b8cc' }}>E = mc²</div>
      </div>
    </div>
  )
}
function NuclearFissionIdea() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 p-4">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-full" style={{ background: `${ATOM_C}20`, border: `2px solid ${ATOM_C}` }} />
        <span style={{ color: '#ef4444', fontSize: 14 }}>→</span>
        <div className="w-5 h-5 rounded-full" style={{ background: `${ATOM_C}30`, border: `1px solid ${ATOM_C}` }} />
        <span className="text-xs" style={{ color: '#a8b8cc' }}>+</span>
        <div className="w-5 h-5 rounded-full" style={{ background: `${ATOM_C}30`, border: `1px solid ${ATOM_C}` }} />
      </div>
      <div className="text-xs" style={{ color: '#ef4444' }}>Two equal halves only?</div>
      <IdeaCaption>Nuclear fission just splits the atom in half - producing two equal halves and no other products</IdeaCaption>
    </div>
  )
}
function NuclearFissionReality() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-4">
      <div className="text-xs text-center p-2 rounded-[10px]" style={{ background: `${ATOM_C}10`, border: `1px solid ${ATOM_C}30`, color: '#cad5e2' }}>
        U-235 + neutron → Ba-141 + Kr-92 + 2-3 neutrons + energy
      </div>
      <div className="text-xs text-center" style={{ color: '#cad5e2' }}>Released neutrons can trigger further fissions → chain reaction</div>
      <RealityBadge color={ATOM_C}>Fission releases 2-3 neutrons - enabling a chain reaction</RealityBadge>
    </div>
  )
}

// ─── 22. Nuclear Fusion ──────────────────────────────────────────────────────
function NuclearFusionLesson() {
  const [fused, setFused] = useState(false)

  const DC = '#2b7fff'   // deuterium
  const TC = '#f97316'   // tritium
  const HC = '#00bc7d'   // helium

  // Animation: before → deuterium at x=55, tritium at x=205
  //            after  → both approach x=130, helium at x=160, neutron at x=215
  const dX = fused ? 110 : 55
  const tX = fused ? 150 : 205

  return (
    <div className="w-full h-full flex flex-col items-center gap-2 pt-2 px-2" style={{ maxWidth: 480 }}>
      <svg width="260" height="130" viewBox="0 0 260 130" style={{ display: 'block' }}>
        {/* Deuterium (²₁H) */}
        <motion.circle cx={dX} cy={65} r={16}
          fill={`${DC}30`} stroke={DC} strokeWidth="1.8"
          animate={{ cx: dX }} transition={{ duration: 0.6 }} />
        <motion.text x={dX} y={61} textAnchor="middle" fill={DC} fontSize={8} fontWeight="bold"
          animate={{ x: dX }} transition={{ duration: 0.6 }}>²</motion.text>
        <motion.text x={dX} y={70} textAnchor="middle" fill={DC} fontSize={9} fontWeight="bold"
          animate={{ x: dX }} transition={{ duration: 0.6 }}>H</motion.text>
        <motion.text x={dX} y={79} textAnchor="middle" fill={DC} fontSize={7}
          animate={{ x: dX }} transition={{ duration: 0.6 }}>D</motion.text>
        {!fused && (
          <text x="55" y="88" textAnchor="middle" fill="#637b96" fontSize={7}>deuterium</text>
        )}

        {/* Tritium (³₁H) */}
        {!fused && (
          <g>
            <circle cx={205} cy={65} r={16} fill={`${TC}30`} stroke={TC} strokeWidth="1.8" />
            <text x={205} y={61} textAnchor="middle" fill={TC} fontSize={8} fontWeight="bold">³</text>
            <text x={205} y={70} textAnchor="middle" fill={TC} fontSize={9} fontWeight="bold">H</text>
            <text x={205} y={79} textAnchor="middle" fill={TC} fontSize={7}>T</text>
            <text x="205" y="88" textAnchor="middle" fill="#637b96" fontSize={7}>tritium</text>
            {/* approach arrows */}
            <text x="105" y="63" textAnchor="end" fill={DC} fontSize={10}>→</text>
            <text x="155" y="63" textAnchor="start" fill={TC} fontSize={10}>←</text>
          </g>
        )}

        {/* Fusion glow + products */}
        {fused && (
          <g>
            {/* glow at fusion point */}
            <motion.circle cx={130} cy={65} r={22}
              fill="#fdc700" fillOpacity={0.15} stroke="#fdc700" strokeWidth="1" strokeOpacity={0.5}
              initial={{ r: 0, fillOpacity: 0 }} animate={{ r: 22, fillOpacity: 0.15 }}
              transition={{ duration: 0.4 }} />
            {/* He-4 product moving right */}
            <motion.circle cx={160} cy={65} r={18}
              fill={`${HC}30`} stroke={HC} strokeWidth="1.8"
              initial={{ cx: 130, r: 0 }} animate={{ cx: 160, r: 18 }}
              transition={{ duration: 0.5 }} />
            <motion.text x={160} y={61} textAnchor="middle" fill={HC} fontSize={8} fontWeight="bold"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>⁴</motion.text>
            <motion.text x={160} y={70} textAnchor="middle" fill={HC} fontSize={9} fontWeight="bold"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>He</motion.text>
            <motion.text x={160} y={88} textAnchor="middle" fill="#637b96" fontSize={7}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>helium-4</motion.text>

            {/* neutron product */}
            <motion.circle cx={218} cy={65} r={6}
              fill="#a8b8cc" stroke="#a8b8cc" strokeWidth="1"
              initial={{ cx: 130, opacity: 0 }} animate={{ cx: 218, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }} />
            <motion.text x={218} y={79} textAnchor="middle" fill="#a8b8cc" fontSize={7}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>n</motion.text>

            {/* energy rays */}
            {[[-25, -20], [0, -28], [25, -20], [-30, 0], [30, 0]].map(([dx, dy], i) => (
              <motion.line key={i}
                x1={130} y1={65} x2={130 + dx} y2={65 + dy}
                stroke="#fdc700" strokeWidth="1.5"
                initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0.5] }}
                transition={{ delay: 0.3 + i * 0.05, duration: 0.8, repeat: Infinity }} />
            ))}
            <motion.text x={105} y={40} textAnchor="middle" fill="#fdc700" fontSize={8} fontWeight="bold"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>ENERGY</motion.text>
          </g>
        )}
      </svg>

      <motion.button className="px-4 py-2 rounded-[10px] text-xs font-semibold"
        style={{ background: `${ATOM_C}20`, border: `1px solid ${ATOM_C}`, color: ATOM_C }}
        onClick={() => setFused(f => !f)} whileTap={{ scale: 0.95 }}>
        {fused ? 'Reset' : 'Fuse nuclei'}
      </motion.button>

      <div className="px-2 py-1 rounded-[8px] font-mono text-xs text-center font-bold"
        style={{ background: `${ATOM_C}12`, border: `1px solid ${ATOM_C}33`, color: ATOM_C }}>
        ²₁H + ³₁H → ⁴₂He + ¹₀n + ENERGY
      </div>

      <div className="flex gap-2 text-xs justify-center flex-wrap">
        <span className="px-2 py-0.5 rounded-[6px]" style={{ background: '#1d293d', color: '#a8b8cc' }}>Requires ~10⁸ K (plasma)</span>
        <span className="px-2 py-0.5 rounded-[6px]" style={{ background: '#1d293d', color: '#a8b8cc' }}>Powers the Sun</span>
        <span className="px-2 py-0.5 rounded-[6px]" style={{ background: '#1d293d', color: '#a8b8cc' }}>ITER tokamak</span>
      </div>
    </div>
  )
}
function NuclearFusionIdea() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 p-4">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full" style={{ background: `${ATOM_C}20`, border: `2px solid ${ATOM_C}` }} />
        <span style={{ color: '#ef4444', fontSize: 14 }}>→</span>
        <div className="w-4 h-4 rounded-full" style={{ background: `${ATOM_C}20`, border: `1px solid ${ATOM_C}` }} />
        <span className="text-xs font-bold" style={{ color: '#ef4444' }}>split</span>
      </div>
      <div className="text-xs text-center px-1" style={{ color: '#ef4444' }}>Both fusion AND fission split atoms?</div>
      <IdeaCaption>Nuclear fusion and fission are the same process - both split atoms to release energy</IdeaCaption>
    </div>
  )
}
function NuclearFusionReality() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-4">
      <div className="flex gap-3 text-xs">
        <div className="flex flex-col items-center p-2 rounded-[8px]" style={{ background: `${ATOM_C}10`, border: `1px solid ${ATOM_C}` }}>
          <span style={{ color: ATOM_C }}>Fusion</span>
          <span style={{ color: '#cad5e2' }}>Joins nuclei</span>
          <span style={{ color: '#a8b8cc' }}>Stars</span>
        </div>
        <div className="flex flex-col items-center p-2 rounded-[8px]" style={{ background: '#c084fc10', border: '1px solid #c084fc' }}>
          <span style={{ color: '#c084fc' }}>Fission</span>
          <span style={{ color: '#cad5e2' }}>Splits nucleus</span>
          <span style={{ color: '#a8b8cc' }}>Reactors</span>
        </div>
      </div>
      <RealityBadge color={ATOM_C}>Fusion joins nuclei; fission splits them - both release energy</RealityBadge>
    </div>
  )
}

export const MATTER_TOPICS = {
  states_density: {
    id: 'states_density', module: 'Particle Model', moduleColor: PART_C, practicalId: 'density', course: 'combined',
    title: 'States of Matter & Density', subtitle: 'Particle Model and ρ = m/V',
    description: 'The particle model explains the three states of matter. Solids: particles in fixed lattice positions, vibrate only. Liquids: particles close together, flow freely past each other. Gases: particles far apart, move randomly at high speed. Density (ρ = m/V) depends on how closely packed the particles are.',
    lessonVisual: StatesDensityLesson, ideaVisual: StatesDensityIdea, realityVisual: StatesDensityReality,
    question: 'An object has mass 600 g and volume 400 cm³. What is its density?',
    questionSubtitle: 'Use ρ = m ÷ V',
    options: ['240000 g/cm³', '1.5 g/cm³', '0.67 g/cm³', '200 g/cm³'],
    correctAnswer: 1,
    keywords: ['density', 'ρ = m/V', 'mass', 'volume', 'g/cm³', 'kg/m³', 'divide', 'denser than water'],
    sentenceStarters: ['Using ρ = m ÷ V, I divide...', 'Density = mass ÷ volume = 600 ÷ 400 = ...', 'The units of density are g/cm³ or kg/m³...', 'An object floats if its density is less than...', 'The answer is... g/cm³ because...'],
    modelAnswers: [
      'Using ρ = m ÷ V, I divide **600 g by 400 cm³ to get ρ = 1.5 g/cm³**.',
      'Density = mass ÷ volume = 600 ÷ 400 = **1.5 g/cm³**.',
      'The units of density are g/cm³ or kg/m³ ** -  here we use g/cm³ since mass is in grams and volume in cm³**.',
      'An object floats if its density is less than **the fluid it is placed in  -  water has density 1 g/cm³**.',
      'The answer is **1.5 g/cm³** because **ρ = 600 ÷ 400 = 1.5**.',
    ],
    misconception: 'It is not total weight that determines floating - it is density relative to the fluid.',
    concept: 'ρ = 600 ÷ 400 = 1.5 g/cm³. Objects float when their density is less than the fluid\'s. A steel ship floats because its average density (including hollow interior) is less than water.',
  },
  internal_energy: {
    id: 'internal_energy', module: 'Particle Model', moduleColor: PART_C, practicalId: 'shc', course: 'combined',
    title: 'Internal Energy & Specific Heat', subtitle: 'ΔE = mcΔT and Latent Heat',
    description: 'Internal energy is the total kinetic and potential energy of all particles in a system. Heating raises internal energy. If temperature increases: ΔE = mcΔT (specific heat capacity). During a change of state, temperature stays constant while energy goes into breaking/forming bonds - this is latent heat: E = mL.',
    lessonVisual: InternalEnergyLesson, ideaVisual: InternalEnergyIdea, realityVisual: InternalEnergyReality,
    question: 'How much energy is needed to raise 2 kg of water by 5°C? (specific heat capacity of water = 4200 J/kg°C)',
    questionSubtitle: 'Use ΔE = mcΔT',
    options: ['42000 J', '21000 J', '8400 J', '420 J'],
    correctAnswer: 0,
    keywords: ['specific heat capacity', 'Q = mcΔT', 'temperature change', 'joules', 'mass', 'thermal energy', '4200 J/kg°C', 'ΔT'],
    sentenceStarters: ['Using Q = mcΔT, I substitute...', 'Q = 2 × 4200 × 5 = ...', 'The specific heat capacity tells us...', 'A higher specific heat capacity means more energy is needed to...', 'ΔT is the temperature change, which is...'],
    modelAnswers: [
      'Using Q = mcΔT, I substitute **m = 2, c = 4200, ΔT = 5 to get Q = 2 × 4200 × 5 = 42 000 J**.',
      'Q = 2 × 4200 × 5 = **42 000 J**.',
      'The specific heat capacity tells us **how much energy is needed to raise 1 kg of a substance by 1°C**.',
      'A higher specific heat capacity means more energy is needed to **raise the temperature by the same amount**.',
      'ΔT is the temperature change, which is **5°C  -  the difference between the final and initial temperature**.',
    ],
    misconception: 'Temperature and internal energy are not the same quantity.',
    concept: 'ΔE = 2 × 4200 × 5 = 42000 J. Water at 100°C and steam at 100°C have the same temperature but different internal energy - the difference is the latent heat of vaporisation.',
  },
  gas_pressure: {
    id: 'gas_pressure', module: 'Particle Model', moduleColor: PART_C, course: 'physics-only',
    title: 'Gas Pressure', subtitle: 'Particle Collisions and pV = constant',
    description: 'Gas pressure is caused by particles colliding with the walls of their container. The more frequent and forceful the collisions, the higher the pressure. At constant temperature: pV = constant (Boyle\'s Law). Increasing temperature increases particle speed, increasing collision rate and therefore pressure.',
    lessonVisual: GasPressureLesson, ideaVisual: GasPressureIdea, realityVisual: GasPressureReality,
    question: 'A gas at 2 atm has a volume of 6 L. If the volume is halved to 3 L, what is the new pressure?',
    questionSubtitle: 'Use pV = constant (at fixed temperature)',
    options: ['1 atm', '4 atm', '3 atm', '12 atm'],
    correctAnswer: 1,
    keywords: ["Boyle's Law", 'P₁V₁ = P₂V₂', 'pressure', 'volume', 'inversely proportional', 'constant temperature', 'atmosphere', 'compress'],
    sentenceStarters: ["Using Boyle's Law: P₁V₁ = P₂V₂...", 'Pressure and volume are inversely proportional because...', 'When volume decreases, pressure increases because...', '2 × 6 = P₂ × 3, so P₂ = ...', 'At constant temperature, if you halve the volume...'],
    modelAnswers: [
      "Using Boyle's Law: P₁V₁ = P₂V₂, **so 2 × 6 = P₂ × 3, giving P₂ = 4 atm**.",
      'Pressure and volume are inversely proportional because **squeezing the same number of particles into a smaller space increases collisions with the walls**.',
      'When volume decreases, pressure increases because **gas particles collide more frequently with the container walls**.',
      '2 × 6 = P₂ × 3, so P₂ = **12 ÷ 3 = 4 atm**.',
      'At constant temperature, if you halve the volume **the pressure doubles  -  here from 2 atm to 4 atm**.',
    ],
    misconception: 'Gas pressure is not caused by the weight of gas - it is caused by particle collisions.',
    concept: 'p₁V₁ = p₂V₂ → 2 × 6 = p₂ × 3 → p₂ = 4 atm. Halving the volume doubles the frequency of wall collisions, doubling the pressure.',
  },
  atomic_structure: {
    id: 'atomic_structure', module: 'Atomic Structure', moduleColor: ATOM_C, course: 'combined',
    title: 'Structure of the Atom', subtitle: 'Protons, Neutrons, Electrons & Isotopes',
    description: 'An atom has a tiny, dense nucleus containing protons (+1 charge) and neutrons (0 charge), surrounded by electrons (-1 charge) in shells. Atomic number = number of protons. Mass number = protons + neutrons. Isotopes are atoms of the same element with different numbers of neutrons. Atom radius ≈ 1×10⁻¹⁰ m; nucleus radius ≈ 1×10⁻¹⁴ m.',
    lessonVisual: AtomicStructureLesson, ideaVisual: AtomicStructureIdea, realityVisual: AtomicStructureReality,
    question: 'Carbon-14 has 6 protons. How many neutrons does it have?',
    questionSubtitle: 'Neutrons = mass number − atomic number',
    options: ['6', '8', '14', '20'],
    correctAnswer: 1,
    keywords: ['atomic number', 'mass number', 'protons', 'neutrons', 'electrons', 'nucleus', 'isotope', 'Carbon-14'],
    sentenceStarters: ['Mass number = protons + neutrons, so neutrons = ...', 'Carbon-14 has a mass number of 14 and 6 protons...', 'The atomic number tells us the number of protons...', 'Neutrons = mass number − atomic number = 14 − 6 = ...', 'Isotopes have the same number of protons but different numbers of...'],
    modelAnswers: [
      'Mass number = protons + neutrons, so neutrons = **14 − 6 = 8 neutrons**.',
      'Carbon-14 has a mass number of 14 and 6 protons, **so it has 14 − 6 = 8 neutrons in its nucleus**.',
      'The atomic number tells us the number of protons ** -  for carbon-14 that is 6 protons**.',
      'Neutrons = mass number − atomic number = 14 − 6 = **8 neutrons**.',
      'Isotopes have the same number of protons but different numbers of **neutrons  -  carbon-14 has 8 neutrons, carbon-12 has 6**.',
    ],
    misconception: 'The atom is not a solid sphere - it is mostly empty space.',
    concept: 'Neutrons = 14 − 6 = 8. The nucleus (containing all protons and neutrons) occupies only about 1/10,000 of the atom\'s radius. The rest is empty space with electrons in shells.',
  },
  atomic_model_history: {
    id: 'atomic_model_history', module: 'Atomic Structure', moduleColor: ATOM_C, course: 'combined',
    title: 'History of the Atomic Model', subtitle: 'Dalton → Thomson → Rutherford → Bohr',
    description: 'The atomic model evolved as new evidence emerged. Dalton (1803): solid sphere. Thomson (1904): plum pudding - electrons embedded in positive mass. Rutherford (1911): nuclear model from alpha-scattering experiment - tiny dense nucleus. Bohr (1913): electrons in fixed shells at specific energy levels.',
    lessonVisual: AtomicModelLesson, ideaVisual: AtomicModelIdea, realityVisual: AtomicModelReality,
    question: 'What evidence led Rutherford to reject the plum pudding model?',
    questionSubtitle: 'Think about what he observed in the gold foil experiment',
    options: ['All alpha particles passed straight through', 'Some alpha particles were deflected or bounced back', 'Alpha particles sped up through the foil', 'The foil became radioactive'],
    correctAnswer: 1,
    keywords: ['Rutherford', 'gold foil experiment', 'alpha particles', 'deflection', 'nucleus', 'plum pudding model', 'dense', 'positive charge'],
    sentenceStarters: ['Rutherford fired alpha particles at gold foil and found...', 'Most alpha particles passed straight through, but some...', 'This evidence showed that most of the atom is empty space...', 'If the plum pudding model were correct, all particles would...', 'The nucleus must be small, dense and positively charged because...'],
    modelAnswers: [
      'Rutherford fired alpha particles at gold foil and found **that some were deflected or bounced straight back**.',
      'Most alpha particles passed straight through, but some **were deflected or bounced back  -  showing the nucleus is small and dense**.',
      'This evidence showed that most of the atom is **empty space, with a tiny dense positive nucleus at the centre**.',
      'If the plum pudding model were correct, all particles would **pass straight through with only tiny deflections**.',
      'The nucleus must be small, dense and positively charged because **only a concentrated positive charge could repel alpha particles so strongly**.',
    ],
    misconception: 'Scientific models are not replaced without direct experimental evidence.',
    concept: 'Most α particles passed straight through (atom is mostly empty space), but a few bounced back - proving a tiny, dense, positive nucleus. This could not be explained by the plum pudding model.',
  },
  radioactive_decay: {
    id: 'radioactive_decay', module: 'Atomic Structure', moduleColor: ATOM_C, course: 'combined',
    title: 'Radioactive Decay', subtitle: 'α, β, γ - Properties & Penetration',
    description: 'Unstable nuclei randomly emit radiation to become more stable. Alpha (α): helium nucleus (2p + 2n), highly ionising, stopped by paper. Beta (β): fast electron from nucleus, medium ionising, stopped by aluminium. Gamma (γ): EM radiation from nucleus, least ionising, reduced by lead/concrete. Activity measured in Becquerels (Bq).',
    lessonVisual: RadioactiveDecayLesson, ideaVisual: RadioactiveDecayIdea, realityVisual: RadioactiveDecayReality,
    question: 'Which type of radiation is most ionising but has the shortest range in air?',
    questionSubtitle: 'Consider ionising power vs penetrating power',
    options: ['Gamma (γ)', 'Beta (β)', 'Alpha (α)', 'Neutron radiation'],
    correctAnswer: 2,
    keywords: ['alpha radiation', 'beta radiation', 'gamma radiation', 'ionising power', 'penetrating power', 'range in air', 'helium nucleus', 'stopped by paper'],
    sentenceStarters: ['Alpha radiation is most ionising because...', 'Alpha has the shortest range in air because...', 'Alpha particles consist of 2 protons and 2 neutrons and are stopped by...', 'Gamma radiation is least ionising but most penetrating because...', 'The order of ionising ability is alpha > beta >...'],
    modelAnswers: [
      'Alpha radiation is most ionising because **it is a large, slow, doubly-charged particle that interacts strongly with matter**.',
      'Alpha has the shortest range in air because **it loses energy rapidly due to its strong ionising ability**.',
      'Alpha particles consist of 2 protons and 2 neutrons and are stopped by **a sheet of paper or a few centimetres of air**.',
      'Gamma radiation is least ionising but most penetrating because **it is electromagnetic radiation with no charge or mass**.',
      'The order of ionising ability is alpha > beta > **gamma  -  alpha is most ionising, gamma is least**.',
    ],
    misconception: 'High ionising power and high penetrating power do not go together - they are inversely related.',
    concept: 'Alpha is the most ionising (removes electrons from atoms easily) because it is large and slow. But this also means it loses energy quickly, giving it the shortest range and stopping at a sheet of paper.',
  },
  nuclear_equations: {
    id: 'nuclear_equations', module: 'Atomic Structure', moduleColor: ATOM_C, course: 'combined',
    title: 'Nuclear Equations', subtitle: 'Balancing Mass & Atomic Numbers',
    description: 'In nuclear equations, both the mass number (top) and atomic number (bottom) must balance on each side. Alpha decay: mass number decreases by 4, atomic number by 2. Beta decay: mass number unchanged, atomic number increases by 1. Gamma emission: no change to mass or atomic number.',
    lessonVisual: NuclearEquationsLesson, ideaVisual: NuclearEquationsIdea, realityVisual: NuclearEquationsReality,
    question: 'In alpha decay, how does the atomic number of the nucleus change?',
    questionSubtitle: 'An alpha particle contains 2 protons',
    options: ['Increases by 2', 'Decreases by 4', 'Decreases by 2', 'Stays the same'],
    correctAnswer: 2,
    keywords: ['alpha decay', 'atomic number', 'mass number', 'helium-4', 'protons', 'decreases by 2', 'nuclear equation', 'conservation'],
    sentenceStarters: ['In alpha decay, the nucleus emits a helium-4 nucleus (⁴₂He)...', 'An alpha particle contains 2 protons and 2 neutrons, so...', 'The atomic number decreases by 2 because...', 'The mass number changes by 4 in alpha decay...', 'Using conservation of mass number: the new atomic number =...'],
    modelAnswers: [
      'In alpha decay, the nucleus emits a helium-4 nucleus (⁴₂He), **so the atomic number decreases by 2**.',
      'An alpha particle contains 2 protons and 2 neutrons, so **the parent nucleus loses 2 protons  -  the atomic number falls by 2**.',
      'The atomic number decreases by 2 because **an alpha particle carries away 2 protons from the nucleus**.',
      'The mass number changes by 4 in alpha decay ** -  it decreases by 4 because the alpha particle has mass number 4**.',
      'Using conservation of mass number: the new atomic number = **original atomic number − 2**.',
    ],
    misconception: 'Both mass number and atomic number must balance - not just one of them.',
    concept: 'An alpha particle has mass number 4 and atomic number 2. So the parent nucleus loses 4 from mass number and 2 from atomic number. Both sides of the equation must balance for each quantity.',
  },
  half_life: {
    id: 'half_life', module: 'Atomic Structure', moduleColor: ATOM_C, course: 'combined',
    title: 'Half-Life', subtitle: 'Random Decay and t½',
    description: 'Half-life is the time for half of the radioactive nuclei in a sample to decay (or for activity to halve). Decay is random - you cannot predict when any individual nucleus will decay. The shorter the half-life, the more rapidly active the source. Half-life can range from fractions of a second to millions of years.',
    lessonVisual: HalfLifeLesson, ideaVisual: HalfLifeIdea, realityVisual: HalfLifeReality,
    question: 'A sample has an activity of 800 Bq. After 3 half-lives, what is its activity?',
    questionSubtitle: 'Each half-life halves the activity',
    options: ['400 Bq', '200 Bq', '100 Bq', '266 Bq'],
    correctAnswer: 2,
    keywords: ['half-life', 'activity', 'becquerels', 'radioactive decay', 'exponential decay', 'halved', 'three half-lives', '÷ 2³'],
    sentenceStarters: ['After each half-life, the activity halves...', 'After 1 half-life: 800 ÷ 2 = ...', 'After 3 half-lives, the activity = 800 ÷ 8 = ...', 'Half-life is the time taken for the activity to halve...', 'The activity after 3 half-lives = 800 ÷ 2³ = ...'],
    modelAnswers: [
      'After each half-life, the activity halves, **so after 3 half-lives it has halved three times**.',
      'After 1 half-life: 800 ÷ 2 = **400 Bq; after 2: 200 Bq; after 3: 100 Bq**.',
      'After 3 half-lives, the activity = 800 ÷ 8 = **100 Bq**.',
      'Half-life is the time taken for the activity to halve ** -  after 3 half-lives the activity is 800 ÷ 2³ = 100 Bq**.',
      'The activity after 3 half-lives = 800 ÷ 2³ = **800 ÷ 8 = 100 Bq**.',
    ],
    misconception: 'After a number of half-lives the material does not reach zero - it approaches zero but never equals it exactly.',
    concept: '800 → 400 → 200 → 100 Bq. After each half-life, activity halves. After 3 half-lives: 800 × (½)³ = 800 ÷ 8 = 100 Bq.',
  },
  radiation_hazards: {
    id: 'radiation_hazards', module: 'Atomic Structure', moduleColor: ATOM_C, course: 'physics-only',
    title: 'Background Radiation, Uses & Hazards', subtitle: 'Contamination vs Irradiation',
    description: 'Background radiation is low-level radiation from natural sources (rocks, cosmic rays, radon gas) and man-made sources (medical, nuclear industry). Irradiation is exposure to a source outside the body - stops when source removed. Contamination means radioactive material inside the body - more dangerous. Alpha is most dangerous when inhaled; gamma most dangerous from outside.',
    lessonVisual: RadiationHazardsLesson, ideaVisual: RadiationHazardsIdea, realityVisual: RadiationHazardsReality,
    question: 'Why is internal contamination by an alpha source more dangerous than external irradiation?',
    questionSubtitle: 'Think about what stops alpha particles',
    options: ['Alpha is more penetrating than other types', 'Alpha cannot be stopped by any material', 'Inside the body, alpha cannot be blocked by skin so directly damages cells', 'Alpha has the longest range'],
    correctAnswer: 2,
    keywords: ['contamination', 'irradiation', 'alpha radiation', 'skin barrier', 'ionisation', 'internal organs', 'cells', 'cancer risk'],
    sentenceStarters: ['Alpha is stopped by skin when external, but inside the body...', 'Inside the body, alpha radiation causes more damage because...', 'Alpha cannot penetrate skin, so external alpha sources...', 'Contamination means radioactive material is inside the body, whereas irradiation means...', 'Inside the body, there is no protective skin layer to stop alpha...'],
    modelAnswers: [
      'Alpha is stopped by skin when external, but inside the body **there is no barrier, so it directly ionises and damages cells**.',
      'Inside the body, alpha radiation causes more damage because **it cannot be blocked by skin and deposits all its energy into nearby tissue**.',
      'Alpha cannot penetrate skin, so external alpha sources **pose very little risk  -  skin absorbs all the radiation**.',
      'Contamination means radioactive material is inside the body, whereas irradiation means **you are exposed to radiation from an external source**.',
      'Inside the body, there is no protective skin layer to stop alpha, **so it directly damages DNA and surrounding cells**.',
    ],
    misconception: 'External irradiation from alpha is not very dangerous - skin stops it easily.',
    concept: 'Alpha is stopped by skin externally, making it harmless from outside. But if swallowed or inhaled, alpha directly ionises internal cells, causing maximum biological damage with no protective skin barrier.',
  },
  nuclear_fission: {
    id: 'nuclear_fission', module: 'Atomic Structure', moduleColor: ATOM_C, course: 'physics-only',
    title: 'Nuclear Fission', subtitle: 'Chain Reactions & Reactors',
    description: 'Nuclear fission occurs when a large unstable nucleus (e.g. U-235) absorbs a neutron and splits into two smaller nuclei, releasing 2-3 neutrons and a large amount of energy. These neutrons can trigger further fissions - a chain reaction. In a nuclear reactor, control rods absorb neutrons to control the reaction rate.',
    lessonVisual: NuclearFissionLesson, ideaVisual: NuclearFissionIdea, realityVisual: NuclearFissionReality,
    question: 'How is the chain reaction in a nuclear reactor controlled?',
    questionSubtitle: 'Think about what absorbs neutrons',
    options: ['Using water to cool the reactor', 'Inserting control rods that absorb neutrons', 'Removing all the uranium fuel', 'Increasing the temperature'],
    correctAnswer: 1,
    keywords: ['chain reaction', 'control rods', 'neutrons', 'uranium', 'fission', 'boron', 'absorbed', 'moderator'],
    sentenceStarters: ['Control rods (usually boron) absorb neutrons to...', 'The chain reaction is controlled by inserting or removing...', 'Neutrons cause fission, so absorbing them slows down...', 'Control rods absorb neutrons to slow down the chain reaction...', 'Without control rods, the chain reaction would become...'],
    modelAnswers: [
      'Control rods (usually boron) absorb neutrons to **slow down and control the rate of the chain reaction**.',
      'The chain reaction is controlled by inserting or removing **control rods  -  deeper insertion absorbs more neutrons and slows the reaction**.',
      'Neutrons cause fission, so absorbing them slows down **the chain reaction  -  preventing a runaway reaction**.',
      'Control rods absorb neutrons to slow down the chain reaction **and keep it at a safe, steady rate**.',
      'Without control rods, the chain reaction would become **uncontrolled and release energy too rapidly  -  like a nuclear explosion**.',
    ],
    misconception: 'Nuclear fission does not simply split the nucleus into two equal halves.',
    concept: 'Control rods (boron or cadmium) absorb neutrons. Inserting them more deeply reduces the number of available neutrons, slowing the chain reaction. Withdrawing them allows the reaction to speed up.',
  },
  nuclear_fusion: {
    id: 'nuclear_fusion', module: 'Atomic Structure', moduleColor: ATOM_C, course: 'physics-only',
    title: 'Nuclear Fusion', subtitle: 'Joining Nuclei in Stars',
    description: 'Nuclear fusion is when two light nuclei (e.g. hydrogen isotopes) join together to form a heavier nucleus, releasing large amounts of energy. This is the process that powers stars. Fusion requires extremely high temperatures (≥10⁷ K) to overcome the electrostatic repulsion between nuclei. During fusion, some mass is converted into energy (E = mc²).',
    lessonVisual: NuclearFusionLesson, ideaVisual: NuclearFusionIdea, realityVisual: NuclearFusionReality,
    question: 'Why does nuclear fusion require extremely high temperatures?',
    questionSubtitle: 'Think about the forces involved',
    options: ['To make the nuclei large enough', 'To give nuclei enough energy to overcome electrostatic repulsion', 'To slow down the nuclei', 'To create neutrons'],
    correctAnswer: 1,
    keywords: ['nuclear fusion', 'electrostatic repulsion', 'kinetic energy', 'plasma', 'hydrogen', 'helium', 'high temperature', 'overcome repulsion'],
    sentenceStarters: ['High temperatures give nuclei enough kinetic energy to overcome...', 'Electrostatic repulsion between positively charged nuclei means...', 'Fusion requires nuclei to get close enough to...', 'At very high temperatures, particles have enough kinetic energy to...', 'The electrostatic repulsion between two nuclei is overcome when...'],
    modelAnswers: [
      'High temperatures give nuclei enough kinetic energy to overcome **the electrostatic repulsion between their positive charges**.',
      'Electrostatic repulsion between positively charged nuclei means **they need enormous kinetic energy to get close enough to fuse**.',
      'Fusion requires nuclei to get close enough to **experience the strong nuclear force, which then pulls them together**.',
      'At very high temperatures, particles have enough kinetic energy to **overcome the repulsive electrostatic force between nuclei**.',
      'The electrostatic repulsion between two nuclei is overcome when **temperature is high enough (millions of degrees) to give nuclei sufficient kinetic energy**.',
    ],
    misconception: 'Fusion and fission are opposite processes - fusion joins, fission splits.',
    concept: 'Nuclei are positively charged, so they repel each other (electrostatic repulsion). Extremely high temperatures give particles enough kinetic energy to get close enough for the strong nuclear force to take over and fuse them.',
  },
}
