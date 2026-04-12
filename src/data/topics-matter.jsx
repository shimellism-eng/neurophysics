import { motion } from 'motion/react'
import { useState, useEffect } from 'react'
import { Atom, AlertTriangle, Zap, Shield } from 'lucide-react'
import { IdeaCaption, RealityBadge, FormulaBox, MisconceptionCard, RealWorldCard } from './visuals-helpers'

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
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 px-4 py-3">
      <MisconceptionCard
        wrong="Heavy objects always sink and light objects always float — it depends on how much the object weighs."
        right="Floating depends on average density, not total mass. A steel ship floats because its hull shape gives it a low average density (mostly air). A solid steel ball sinks."
        wrongLabel="Weight confusion"
        rightLabel="Average density vs fluid"
      />
    </div>
  )
}
function StatesDensityReality() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 px-4 py-3">
      <RealWorldCard icon="🚢" title="Aircraft carrier — 100,000 tonnes" desc="Despite being made of steel, its hull displaces enough water to create upthrust equal to its weight (Archimedes' Principle). ρ_average < ρ_water." color="#c084fc" delay={0} />
      <RealWorldCard icon="🧊" title="Ice floats on water" desc="Ice (ρ ≈ 917 kg/m³) is less dense than liquid water (ρ ≈ 1000 kg/m³) because the crystal structure is more spread out. This is why icebergs float." color="#3b82f6" delay={0.1} />
      <RealWorldCard icon="🪨" title="Pumice stone" desc="Volcanic pumice is full of tiny gas bubbles, giving it a density below 1000 kg/m³ — making solid rock float in water." color="#f97316" delay={0.2} />
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
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 px-4 py-3">
      <MisconceptionCard
        wrong="Temperature and internal energy are the same thing — a hotter substance always has more internal energy."
        right="Internal energy = kinetic energy + potential energy of particles. 100°C steam has more internal energy than 100°C water — same temperature, but bonds were broken during boiling (latent heat)."
        wrongLabel="Temperature ≠ internal energy"
        rightLabel="Kinetic + potential energy"
      />
    </div>
  )
}
function InternalEnergyReality() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 px-4 py-3">
      <RealWorldCard icon="♨️" title="Steam burn worse than boiling water" desc="Steam at 100°C has ~2260 kJ/kg more internal energy than water at 100°C (latent heat of vaporisation). Condensing on skin releases all that extra energy." color="#c084fc" delay={0} />
      <RealWorldCard icon="🧊" title="Ice water vs warm water" desc="A cup of ice water (0°C) has less internal energy than warm water (60°C) of the same mass — fewer particle vibrations and lower PE." color="#3b82f6" delay={0.1} />
      <RealWorldCard icon="🌡️" title="Thermometer vs calorimeter" desc="A thermometer measures temperature (average KE). A calorimeter measures heat energy (total internal energy change). They measure different things." color="#f97316" delay={0.2} />
    </div>
  )
}

// ─── 13b. Specific Latent Heat ──────────────────────────────────────────────
function SpecificLatentHeatLesson() {
  const sections = [
    { label: 'Solid', color: '#60a5fa' },
    { label: 'Melting (flat = latent heat)', color: PART_C },
    { label: 'Liquid', color: '#34d399' },
    { label: 'Boiling (flat = latent heat)', color: PART_C },
    { label: 'Gas', color: '#f97316' },
  ]
  const [active, setActive] = useState(null)

  // Heating curve points: rise, flat, rise, flat, rise
  // SVG 260×150, x: 24–240, y: 130 (cold) to 14 (hot)
  const pts = [
    [24, 130], [60, 88],   // solid rising
    [60, 88],  [100, 88],  // melting flat
    [100, 88], [150, 50],  // liquid rising
    [150, 50], [190, 50],  // boiling flat
    [190, 50], [240, 20],  // gas rising
  ]
  // Each section occupies a path segment pair
  const segPaths = [
    `M${pts[0][0]},${pts[0][1]} L${pts[1][0]},${pts[1][1]}`,
    `M${pts[2][0]},${pts[2][1]} L${pts[3][0]},${pts[3][1]}`,
    `M${pts[4][0]},${pts[4][1]} L${pts[5][0]},${pts[5][1]}`,
    `M${pts[6][0]},${pts[6][1]} L${pts[7][0]},${pts[7][1]}`,
    `M${pts[8][0]},${pts[8][1]} L${pts[9][0]},${pts[9][1]}`,
  ]

  return (
    <div className="w-full h-full flex flex-col items-center gap-2 pt-2 px-3" style={{ maxWidth: 480 }}>
      <div className="text-xs font-semibold" style={{ color: PART_C }}>Heating Curve — tap a section</div>
      <svg width="260" height="150" viewBox="0 0 260 150" style={{ display: 'block' }}>
        {/* axes */}
        <line x1="24" y1="136" x2="248" y2="136" stroke="#2a3a52" strokeWidth="1.2" />
        <line x1="24" y1="10" x2="24" y2="136" stroke="#2a3a52" strokeWidth="1.2" />
        <text x="136" y="148" textAnchor="middle" fill="#637b96" fontSize={8}>Energy added →</text>
        <text x="10" y="73" textAnchor="middle" fill="#637b96" fontSize={8} transform="rotate(-90,10,73)">Temperature</text>
        {/* flat plateau shading */}
        <rect x="60" y="82" width="40" height="12" fill={PART_C} fillOpacity="0.12" rx="2" />
        <rect x="150" y="44" width="40" height="12" fill={PART_C} fillOpacity="0.12" rx="2" />
        {/* curve segments */}
        {segPaths.map((d, i) => (
          <path key={i} d={d} fill="none"
            stroke={active === i ? sections[i].color : '#2a3a52'}
            strokeWidth={active === i ? 3.5 : 2.2}
            strokeLinecap="round"
            style={{ cursor: 'pointer', transition: 'stroke 0.2s, stroke-width 0.2s' }}
            onClick={() => setActive(active === i ? null : i)}
          />
        ))}
        {/* labels */}
        <text x="42" y="115" textAnchor="middle" fill="#a8b8cc" fontSize={6.5}>Solid</text>
        <text x="80" y="80" textAnchor="middle" fill={PART_C} fontSize={6}>Melting</text>
        <text x="125" y="72" textAnchor="middle" fill="#a8b8cc" fontSize={6.5}>Liquid</text>
        <text x="170" y="42" textAnchor="middle" fill={PART_C} fontSize={6}>Boiling</text>
        <text x="222" y="16" textAnchor="middle" fill="#a8b8cc" fontSize={6.5}>Gas</text>
      </svg>
      {/* Section info panel */}
      <div className="w-full min-h-[36px] flex items-center justify-center px-3 py-1 rounded-[10px] text-xs text-center"
        style={{ background: active !== null ? `${sections[active].color}18` : '#1d293d', border: `1px solid ${active !== null ? sections[active].color : '#2a3a52'}`, color: active !== null ? sections[active].color : '#637b96' }}>
        {active !== null ? sections[active].label : 'Tap a section of the curve'}
      </div>
      <div className="px-3 py-1 rounded-[10px] font-mono font-bold text-sm" style={{ background: `${PART_C}18`, border: `1px solid ${PART_C}44`, color: PART_C }}>
        Q = mL
      </div>
    </div>
  )
}

function SpecificLatentHeatIdea() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 px-4 py-3">
      <MisconceptionCard
        wrong="When you heat ice to melt it, the temperature rises the whole time — the energy goes into making it hotter."
        right="During melting, temperature stays at 0°C. All energy goes into breaking bonds (latent heat of fusion = 334 000 J/kg). Temperature only rises again once fully melted."
        wrongLabel="Heating plateau confusion"
        rightLabel="Bond-breaking, not warming"
      />
    </div>
  )
}

function SpecificLatentHeatReality() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 px-4 py-3">
      <RealWorldCard icon="🧊" title="Drinks stay cold longer with ice" desc="Ice stays at 0°C while melting, absorbing 334 000 J/kg as latent heat. This keeps the drink cool far longer than frozen water at –10°C would." color="#3b82f6" delay={0} />
      <RealWorldCard icon="💦" title="Sweating — body's cooling system" desc="Evaporation of sweat takes 2 260 000 J per kg from the skin's surface. The huge latent heat of vaporisation makes sweating extremely effective at cooling." color="#c084fc" delay={0.1} />
      <RealWorldCard icon="🌡️" title="Pressure cooker" desc="Increased pressure raises water's boiling point above 100°C. Food cooks faster because the higher-temperature steam transfers more energy per second." color="#f97316" delay={0.2} />
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
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 px-4 py-3">
      <MisconceptionCard
        wrong="Gas pressure is caused by the weight of gas particles pressing down — like water pressure, it acts downward."
        right="Gas pressure is caused by billions of particles hitting the container walls in all directions. More collisions per second (higher temperature or lower volume) = higher pressure."
        wrongLabel="Weight confusion"
        rightLabel="Particle collisions"
      />
    </div>
  )
}
function GasPressureReality() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 px-4 py-3">
      <RealWorldCard icon="🚗" title="Tyre pressure" desc="Compressing air into a tyre increases particle collisions per second on the walls. Low tyre pressure = fewer collisions, less support — dangerous at speed." color="#c084fc" delay={0} />
      <RealWorldCard icon="🌡️" title="Aerosol cans — heat warning" desc="Heating an aerosol can increases particle speed → more collisions → higher pressure. Can explode if heated above 50°C (pV/T = constant)." color="#ef4444" delay={0.1} />
      <RealWorldCard icon="🏔️" title="Altitude and pressure" desc="At high altitude, fewer air molecules are above you. Atmospheric pressure drops — boiling point of water falls below 100°C on Everest (~70°C at summit)." color="#3b82f6" delay={0.2} />
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
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 px-4 py-3">
      <MisconceptionCard
        wrong="The atom is a solid ball with positive and negative charges mixed evenly throughout (like a plum pudding)."
        right="The atom is mostly empty space. A tiny, dense, positive nucleus sits at the centre, with electrons orbiting far away. Proven by Rutherford's gold foil experiment (1909)."
        wrongLabel="Thomson's plum pudding"
        rightLabel="Rutherford's nuclear atom"
      />
    </div>
  )
}
function AtomicStructureReality() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 px-4 py-3">
      <RealWorldCard icon="⚽" title="Scale of the atom" desc="If an atom were the size of a football stadium, the nucleus would be a marble in the centre. The atom is 99.9999999% empty space — all mass in the tiny nucleus." color="#e879f9" delay={0} />
      <RealWorldCard icon="🔬" title="Rutherford's gold foil (1909)" desc="Most alpha particles passed straight through gold foil. A few deflected sharply back — proving a small, dense, positive nucleus. Disproved the plum pudding model." color="#f97316" delay={0.1} />
      <RealWorldCard icon="💡" title="Bohr's electron shells (1913)" desc="Bohr added quantised electron orbits to Rutherford's model. Each shell has a fixed energy — electrons emit photons when dropping to lower shells." color="#3b82f6" delay={0.2} />
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
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 px-4 py-3">
      <MisconceptionCard
        wrong="The plum pudding model was replaced because scientists thought of a better theory — not because of any experiment."
        right="The Geiger-Marsden experiment (1909) fired alpha particles at gold foil. Large deflections were unexpected — this experimental evidence directly contradicted the plum pudding model and forced a new model."
        wrongLabel="Theory-first thinking"
        rightLabel="Experiment drove the change"
      />
    </div>
  )
}
function AtomicModelReality() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 px-4 py-3">
      <RealWorldCard icon="🥇" title="Thomson → Rutherford (1909)" desc="Thomson's plum pudding predicted all particles would pass through. When 1 in 8000 deflected back, Rutherford said it was 'like firing shells at tissue paper and them bouncing back'." color="#e879f9" delay={0} />
      <RealWorldCard icon="🔭" title="Rutherford → Bohr (1913)" desc="Bohr added quantised electron orbits to explain why atoms emit specific wavelengths of light — another experimental observation driving model improvement." color="#c084fc" delay={0.1} />
      <RealWorldCard icon="🔬" title="Science is self-correcting" desc="Each atomic model was accepted until experiment proved it wrong. This is the scientific method — models are updated when evidence demands it." color="#3b82f6" delay={0.2} />
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
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 px-4 py-3">
      <MisconceptionCard
        wrong="Alpha radiation is the least dangerous because it can only travel a few centimetres in air."
        right="Alpha is the most ionising — inside the body (inhaled or ingested) it causes severe damage to DNA. Outside the body it's stopped by skin. Context determines danger level."
        wrongLabel="Penetration ≠ danger"
        rightLabel="Depends on exposure route"
      />
    </div>
  )
}
function RadioactiveDecayReality() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 px-4 py-3">
      <RealWorldCard icon="☢️" title="Smoke detectors — alpha source" desc="Americium-241 emits alpha particles inside the detector. Smoke interrupts the ionisation current, triggering the alarm. Safe because alpha can't penetrate the casing." color="#f97316" delay={0} />
      <RealWorldCard icon="🏥" title="Medical imaging — gamma rays" desc="Technetium-99m emits gamma rays that pass through the body and can be detected externally. Doctors use it to image organs. Short half-life (6 hours) limits dose." color="#e879f9" delay={0.1} />
      <RealWorldCard icon="🎯" title="Cancer radiotherapy — beta/gamma" desc="High-energy gamma or beta radiation is targeted at tumour cells to destroy DNA. Surrounding healthy tissue must be shielded — that's why lead aprons are used." color="#3b82f6" delay={0.2} />
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
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 px-4 py-3">
      <MisconceptionCard
        wrong="In nuclear equations, you only need to balance the mass numbers (top numbers) — atomic numbers don't matter."
        right="Both mass number (top) AND atomic number (bottom) must balance on each side. The atomic number determines what element is produced — missing this fails the equation."
        wrongLabel="Half the equation"
        rightLabel="Both numbers must balance"
      />
    </div>
  )
}
function NuclearEquationsReality() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 px-4 py-3">
      <RealWorldCard icon="⚛️" title="Alpha decay — Ra to Rn" desc="²²⁶₈₈Ra → ²²²₈₆Rn + ⁴₂α. Mass: 226 = 222+4 ✓. Atomic number: 88 = 86+2 ✓. Both balance — element changes from radium to radon." color="#e879f9" delay={0} />
      <RealWorldCard icon="⚡" title="Beta decay — changes element" desc="In β⁻ decay, a neutron becomes a proton. Atomic number increases by 1 — the element changes! Mass number stays the same." color="#c084fc" delay={0.1} />
      <RealWorldCard icon="☀️" title="Gamma emission — no change" desc="Gamma emission doesn't change mass number or atomic number — the nucleus just loses energy as a photon. The element stays the same." color="#3b82f6" delay={0.2} />
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
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 px-4 py-3">
      <MisconceptionCard
        wrong="After 2 half-lives, all the radioactive material is used up — the substance is no longer radioactive."
        right="Half-life halves the remaining activity each time. After 2 half-lives: 25% remains. After 10 half-lives: ~0.1% remains. It asymptotically approaches zero, never reaching it."
        wrongLabel="Complete decay myth"
        rightLabel="Asymptotic decay"
      />
    </div>
  )
}
function HalfLifeReality() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 px-4 py-3">
      <RealWorldCard icon="🦴" title="Carbon-14 dating" desc="C-14 has a half-life of 5730 years. Measuring remaining C-14 in organic material lets archaeologists date objects up to ~50 000 years old (about 9 half-lives)." color="#e879f9" delay={0} />
      <RealWorldCard icon="🏥" title="Technetium-99m — medical tracer" desc="Half-life of 6 hours — short enough to minimise radiation dose to patients, long enough to complete imaging. Activity halves every 6 hours, making it safe quickly." color="#c084fc" delay={0.1} />
      <RealWorldCard icon="☢️" title="Chernobyl — long-lived isotopes" desc="Caesium-137 (half-life 30 years) still contaminates land near Chernobyl. After 90 years (3 half-lives), only 12.5% of the original activity will remain." color="#ef4444" delay={0.2} />
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
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 px-4 py-3">
      <MisconceptionCard
        wrong="A radioactive source outside the body is always more dangerous than one inside — distance gives protection."
        right="An alpha source inside the body (inhaled or swallowed) is far more dangerous. Alpha particles can't penetrate skin from outside, but directly irradiate cells from within, causing severe DNA damage."
        wrongLabel="Outside = more dangerous?"
        rightLabel="Contamination vs irradiation"
      />
    </div>
  )
}
function RadiationHazardsReality() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 px-4 py-3">
      <RealWorldCard icon="🫁" title="Radon gas — home hazard" desc="Radon-222 seeps from granite rock into buildings. When inhaled, alpha particles irradiate lung cells from inside — the leading cause of lung cancer in non-smokers in the UK." color="#ef4444" delay={0} />
      <RealWorldCard icon="🏥" title="X-rays — external irradiation" desc="Medical X-rays (gamma-like) pass through the body briefly. Lead shields protect staff from repeated exposure. A single X-ray is far less dangerous than long-term radon exposure." color="#c084fc" delay={0.1} />
      <RealWorldCard icon="🔒" title="Nuclear worker protection" desc="Workers use film badges to monitor gamma/beta exposure (irradiation). They wear respirators to prevent inhaling alpha-emitting dust (contamination) — different risks, different controls." color="#3b82f6" delay={0.2} />
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
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 px-4 py-3">
      <MisconceptionCard
        wrong="Nuclear fission just splits the atom in half — producing two equal pieces and nothing else."
        right="Fission produces two unequal daughter nuclei, 2–3 neutrons, and gamma radiation. The released neutrons can trigger further fissions — this is the chain reaction that makes reactors (and bombs) work."
        wrongLabel="Clean split myth"
        rightLabel="Neutrons enable chain reaction"
      />
    </div>
  )
}
function NuclearFissionReality() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 px-4 py-3">
      <RealWorldCard icon="⚛️" title="Nuclear power stations" desc="Control rods absorb excess neutrons to slow the chain reaction. Removing rods speeds it up. The reactor maintains a carefully controlled, self-sustaining chain reaction." color="#e879f9" delay={0} />
      <RealWorldCard icon="💣" title="Atomic bomb — uncontrolled fission" desc="Without control rods, a supercritical mass of U-235 or Pu-239 undergoes a runaway chain reaction. Every fission triggers 2–3 more — exponential energy release." color="#ef4444" delay={0.1} />
      <RealWorldCard icon="🌡️" title="E = mc² — where does energy come from?" desc="The total mass of products is slightly less than the original nucleus. This mass deficit (Δm) converts to energy: E = Δmc². Even tiny masses release enormous energy." color="#f97316" delay={0.2} />
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
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 px-4 py-3">
      <MisconceptionCard
        wrong="Nuclear fusion and fission are the same process — both split atoms to release energy."
        right="Fission splits heavy nuclei (e.g. uranium) apart. Fusion joins light nuclei (e.g. hydrogen) together. Both release energy, but fusion releases far more per kg and produces less radioactive waste."
        wrongLabel="Opposite processes"
        rightLabel="Split vs join"
      />
    </div>
  )
}
function NuclearFusionReality() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 px-4 py-3">
      <RealWorldCard icon="☀️" title="The Sun — fusion reactor" desc="The Sun fuses 620 million tonnes of hydrogen into helium every second. The mass deficit (E = mc²) releases 3.8 × 10²⁶ W — powering all life on Earth." color="#fdc700" delay={0} />
      <RealWorldCard icon="💥" title="Hydrogen bomb — uncontrolled fusion" desc="A fission bomb triggers extreme temperature and pressure, initiating fusion of hydrogen isotopes. The energy release dwarfs fission bombs by orders of magnitude." color="#ef4444" delay={0.1} />
      <RealWorldCard icon="🔬" title="ITER — fusion power future" desc="The ITER reactor under construction in France aims to achieve net energy gain from D-T fusion by the 2030s. The challenge: confining plasma at 150 million °C." color="#3b82f6" delay={0.2} />
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

    // ── 9-STEP LESSON DATA ────────────────────────────────────────────────────

    hook: {
      hookFact: 'A teaspoon of material from a neutron star would weigh about 10 million tonnes — because its particles are packed together with almost no space between them. Density is one of the most extreme properties in the universe.',
      hookQuestion: 'Why do you think a huge steel ship floats, but a small solid steel ball sinks?',
      hookEmoji: '⚓',
    },

    lessonKeywords: [
      {
        word: 'Density',
        symbol: 'ρ',
        unit: 'kg/m³ or g/cm³',
        definition: 'How much mass is packed into a given volume. ρ = m/V.',
        everydayNote: 'Lead is denser than feathers — not because of their mass, but because lead packs more mass into the same space.',
      },
      {
        word: 'Mass',
        symbol: 'm',
        unit: 'kilograms (kg) or grams (g)',
        definition: 'The amount of matter in an object.',
        everydayNote: 'Mass doesn\'t change with location — an object has the same mass on Earth and on the Moon.',
      },
      {
        word: 'Volume',
        symbol: 'V',
        unit: 'm³ or cm³',
        definition: 'The amount of space an object occupies.',
        everydayNote: 'You can measure the volume of an irregular object by lowering it into water and measuring how much water it displaces.',
      },
      {
        word: 'Particle Model',
        symbol: '',
        unit: '',
        definition: 'A model that explains properties of matter using the arrangement and movement of tiny particles.',
        everydayNote: 'Solids: tightly packed, vibrating. Liquids: close but flowing. Gases: spread far apart, moving fast.',
      },
      {
        word: 'States of Matter',
        symbol: '',
        unit: '',
        definition: 'The three forms matter can take: solid, liquid, and gas — determined by particle arrangement and energy.',
        everydayNote: 'Water is unique — it exists as ice (solid), water (liquid), and steam (gas) at everyday temperatures.',
      },
    ],

    prerequisiteCheck: {
      questions: [
        {
          question: 'In which state of matter are particles most closely packed together?',
          answers: ['Gas', 'Liquid', 'Solid', 'Plasma'],
          correct: 2,
          feedback: 'Solid — particles are tightly packed in a fixed lattice structure. This is why solids have the highest density.',
        },
        {
          question: 'An object has mass 500 g and volume 250 cm³. Which equation gives its density?',
          answers: ['ρ = 250 ÷ 500', 'ρ = 500 × 250', 'ρ = 500 ÷ 250', 'ρ = 500 + 250'],
          correct: 2,
          feedback: 'ρ = m ÷ V = 500 ÷ 250 = 2 g/cm³. Density = mass divided by volume.',
        },
      ],
    },

    topicMapHint: {
      before: ['Energy Stores', 'Forces Basics'],
      current: 'States of Matter & Density',
      after: ['Internal Energy & SHC', 'Specific Latent Heat', 'Gas Pressure'],
    },

    workedExample: {
      title: 'Calculating density using ρ = m/V',
      equation: 'ρ = m ÷ V',
      context: 'A block of metal has a mass of 810 g and a volume of 300 cm³. What is its density?',
      steps: [
        {
          step: 1,
          action: 'Write what you know',
          content: 'm = 810 g,   V = 300 cm³,   ρ = ?',
          annotation: 'List your values. Check units are consistent — both in grams and cm³, or both in kg and m³.',
        },
        {
          step: 2,
          action: 'Write the equation',
          content: 'ρ = m ÷ V',
          annotation: 'Density equation — given on the exam formula sheet. ρ is the Greek letter rho, always used for density.',
        },
        {
          step: 3,
          action: 'Substitute',
          content: 'ρ = 810 ÷ 300',
          annotation: 'Replace m and V with the numbers from step 1.',
        },
        {
          step: 4,
          action: 'Calculate and state with unit',
          content: 'ρ = 2.7 g/cm³',
          annotation: 'The unit is g/cm³ (since mass was in g and volume in cm³). This is aluminium — its density is 2.7 g/cm³.',
        },
      ],
      misconceptionAfter: {
        claim: 'A heavier object always has a higher density.',
        reality: 'Wrong — density depends on mass AND volume. A huge block of polystyrene is much heavier than a small ball bearing, but polystyrene has far lower density (0.015 g/cm³ vs 7.8 g/cm³ for steel). Density = mass per unit volume.',
        visual: 'A ship is heavier than a pebble, but floats — because its average density (including the hollow interior full of air) is less than water (1 g/cm³).',
      },
    },

    guidedPractice: {
      tier1: {
        question: 'A stone has mass 450 g and volume 150 cm³. What is its density?',
        allSteps: [
          'Write what you know: m = 450 g, V = 150 cm³',
          'Write the equation: ρ = m ÷ V',
          'Substitute: ρ = 450 ÷ 150',
          '??? — what is 450 ÷ 150?',
        ],
        missingStep: 3,
        missingHint: 'Calculate: 450 ÷ 150 = ?',
        answer: 3,
        answerUnit: 'g/cm³',
      },
      tier2: {
        question: 'An object has density 8 g/cm³ and volume 50 cm³. What is its mass?',
        shownEquation: 'ρ = m/V  →  m = ρ × V',
        shownStep1: 'Write what you know: ρ = 8 g/cm³, V = 50 cm³',
        hint: 'Multiply: m = 8 × 50 = ?',
        answer: 400,
        answerUnit: 'g',
      },
      tier3: {
        question: 'A liquid has mass 1200 g and density 0.8 g/cm³. What is its volume?',
        hint: 'Rearrange ρ = m/V to make V the subject: V = m ÷ ρ',
        methodHint: 'Start with ρ = m/V. You know ρ and m. Rearrange to V = m ÷ ρ, then divide.',
        answer: 1500,
        answerUnit: 'cm³',
      },
    },

    summary: {
      equation: 'ρ = m / V',
      sentence: 'Density measures how much mass is packed into a given volume — objects float when their density is less than the fluid they are in.',
      promptText: 'Explain in one sentence why a steel ship floats even though steel is denser than water.',
    },

    sessionRecap: [
      'Density = mass ÷ volume (ρ = m/V) — measured in g/cm³ or kg/m³.',
      'Solids are densest (particles tightly packed); gases least dense (particles far apart).',
      'Objects float if their density is less than the fluid — it\'s average density that matters, not total mass.',
    ],
  },
  internal_energy: {
    id: 'internal_energy', module: 'Particle Model', moduleColor: PART_C, practicalId: 'shc', course: 'combined',
    title: 'Internal Energy & Specific Heat Capacity (SHC)', subtitle: 'ΔE = mcΔT and Latent Heat',
    description: 'Internal energy is the total kinetic and potential energy of all particles in a system. Heating raises internal energy. If temperature increases: ΔE = mcΔT (specific heat capacity). During a change of state, temperature stays constant while energy goes into breaking/forming bonds - this is latent heat: E = mL.',
    lessonVisual: InternalEnergyLesson, ideaVisual: InternalEnergyIdea, realityVisual: InternalEnergyReality,
    equations: [{ expr: 'E = mcΔθ', given: true }],
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

    // -- 9-STEP LESSON DATA ----------------------------------------------------

    hook: {
      hookFact: 'It takes 4200 J to raise 1 kg of water by 1°C, but only 385 J to raise 1 kg of copper by the same amount. This is why oceans store enormous amounts of heat and keep coastal towns warmer in winter than inland areas.',
      hookQuestion: 'Why does the sea stay warm long after summer ends, while a metal bench in the sun cools down in minutes?',
      hookEmoji: '🌊',
    },

    lessonKeywords: [
      {
        word: 'Internal Energy',
        symbol: 'U',
        unit: 'J',
        definition: 'The total kinetic and potential energy of all the particles in a substance.',
        everydayNote: 'When you heat a pan of water, you are increasing the internal energy of all those water molecules.',
      },
      {
        word: 'Specific Heat Capacity',
        symbol: 'c',
        unit: 'J/kg°C',
        definition: 'The energy needed to raise the temperature of 1 kg of a substance by 1°C.',
        everydayNote: 'Water has c = 4200 J/kg°C. Copper has c = 385 J/kg°C. Copper heats up about 11 times faster than water for the same energy input.',
      },
      {
        word: 'Temperature Change',
        symbol: 'ΔT',
        unit: '°C',
        definition: 'The difference between the final and initial temperature of a substance.',
        everydayNote: 'If water goes from 20°C to 45°C, ΔT = 25°C - this is what you substitute into E = mcΔT.',
      },
      {
        word: 'Thermal Energy',
        symbol: 'E',
        unit: 'J',
        definition: 'The energy transferred to or from a substance by heating or cooling.',
        everydayNote: 'A kettle rated at 2000 W transfers 2000 J of energy per second into the water.',
      },
    ],

    prerequisiteCheck: {
      questions: [
        {
          question: 'What is the difference between temperature and thermal energy?',
          answers: [
            'They are the same thing',
            'Temperature measures hotness; thermal energy is the total energy of all particles',
            'Thermal energy measures hotness; temperature is the total energy',
            'Temperature depends on mass; thermal energy does not',
          ],
          correct: 1,
          feedback: 'Temperature is a measure of average kinetic energy per particle. Thermal (internal) energy is the total energy of all particles - it depends on both temperature and the number of particles.',
        },
        {
          question: 'Which state of matter has particles with the highest kinetic energy on average?',
          answers: ['Solid', 'Liquid', 'Gas', 'All states have equal kinetic energy'],
          correct: 2,
          feedback: 'Gas particles move fastest and have the highest average kinetic energy. This is why gases expand rapidly when heated.',
        },
      ],
    },

    topicMapHint: {
      before: ['States of Matter and Density', 'Energy Stores and Transfers'],
      current: 'Internal Energy and Specific Heat Capacity',
      after: ['Specific Latent Heat', 'Gas Pressure'],
    },

    workedExample: {
      title: 'Calculating energy using E = mcΔT',
      equation: 'E = mcΔT | rearranges to ΔT = E/(mc) or m = E/(cΔT)',
      context: 'A kettle heats 3 kg of water from 20°C to 45°C. The specific heat capacity of water is 4200 J/kg°C. How much energy is transferred?',
      steps: [
        {
          step: 1,
          action: 'Write what you know',
          content: 'm = 3 kg, c = 4200 J/kg°C, ΔT = 45 - 20 = 25°C',
          annotation: 'Always calculate ΔT first. It is final temperature minus initial temperature.',
        },
        {
          step: 2,
          action: 'Write the equation',
          content: 'E = mcΔT',
          annotation: 'This equation is given on the formula sheet. You do not need to memorise it.',
        },
        {
          step: 3,
          action: 'Substitute',
          content: 'E = 3 × 4200 × 25',
          annotation: 'Common error: forgetting to calculate ΔT and just using the final temperature (45) instead of the change (25).',
        },
        {
          step: 4,
          action: 'Calculate and state with unit',
          content: 'E = 315,000 J',
          annotation: 'Sense check: 3 kg of water, heated 25°C - 315 kJ is a reasonable answer for a kettle.',
        },
      ],
      misconceptionAfter: {
        claim: 'A higher temperature always means more thermal energy.',
        reality: 'A large cold lake can have more total thermal (internal) energy than a small hot cup of tea - because internal energy depends on both temperature and the number of particles.',
        visual: 'Think of it as: temperature = energy per particle. Internal energy = energy per particle × number of particles. More particles can mean more total energy even at lower temperature.',
      },
    },

    guidedPractice: {
      tier1: {
        question: 'How much energy is needed to heat 2 kg of water by 10°C? (c = 4200 J/kg°C)',
        allSteps: [
          'Write what you know: m = 2 kg, c = 4200 J/kg°C, ΔT = 10°C',
          'Write the equation: E = mcΔT',
          'Substitute: E = 2 × 4200 × 10',
          '??? - calculate E',
        ],
        missingStep: 3,
        missingHint: 'Calculate: 2 × 4200 × 10 = ?',
        answer: 84000,
        answerUnit: 'J',
      },
      tier2: {
        question: 'A 0.5 kg block of aluminium (c = 900 J/kg°C) is heated by 40°C. How much energy was transferred?',
        shownEquation: 'E = mcΔT',
        shownStep1: 'Write what you know: m = 0.5 kg, c = 900 J/kg°C, ΔT = 40°C',
        hint: 'Multiply all three values together.',
        answer: 18000,
        answerUnit: 'J',
      },
      tier3: {
        question: '63,000 J of energy raises the temperature of 1.5 kg of water. Find the temperature rise. (c = 4200 J/kg°C)',
        hint: 'Rearrange E = mcΔT to find ΔT.',
        methodHint: 'Start with E = mcΔT. Rearrange to ΔT = E / (mc). Then substitute E = 63,000, m = 1.5, c = 4200.',
        answer: 10,
        answerUnit: '°C',
      },
    },

    summary: {
      equation: 'E = mcΔT',
      sentence: 'The energy needed to heat a substance depends on its mass, its specific heat capacity, and the temperature change.',
      promptText: 'Without looking at notes: write out E = mcΔT and explain what each letter stands for.',
    },

    sessionRecap: [
      'Internal energy = total KE + PE of all particles. Heating raises internal energy.',
      'E = mcΔT links energy transferred, mass, specific heat capacity, and temperature change.',
      'Water has a high specific heat capacity (4200 J/kg°C) - it takes a lot of energy to heat up or cool down.',
    ],
  },
  specific_latent_heat: {
    id: 'specific_latent_heat',
    module: 'Particle Model',
    moduleColor: PART_C,
    practicalId: 'latent_heat',
    course: 'combined',
    title: 'Specific Latent Heat',
    subtitle: 'Energy to Change State',
    description: 'Specific latent heat is the energy needed to change the state of 1 kg of a substance without changing its temperature. Q = mL, where L is the specific latent heat in J/kg. Latent heat of fusion (melting/freezing) and latent heat of vaporisation (boiling/condensing) are different values. Water: Lf = 334,000 J/kg, Lv = 2,260,000 J/kg.',
    lessonVisual: SpecificLatentHeatLesson,
    ideaVisual: SpecificLatentHeatIdea,
    realityVisual: SpecificLatentHeatReality,
    equations: [{ expr: 'E = mL', given: true }],
    question: 'How much energy is needed to melt 2 kg of ice? (Latent heat of fusion of water = 334,000 J/kg)',
    questionSubtitle: 'Use Q = mL',
    options: ['167,000 J', '334,000 J', '668,000 J', '1,336,000 J'],
    correctAnswer: 2,
    keywords: ['specific latent heat', 'latent heat of fusion', 'latent heat of vaporisation', 'Q = mL', 'state change', 'melting', 'boiling', 'flat section', 'heating curve', 'joules per kilogram'],
    sentenceStarters: [
      'Specific latent heat is the energy needed to...',
      'Using Q = mL, I substitute m = 2 kg and L = 334,000 J/kg to get...',
      'During a state change, temperature does not change because...',
      'The flat section on a heating curve shows...',
      'Latent heat of vaporisation is greater than fusion because...',
    ],
    modelAnswers: [
      'Specific latent heat is the energy needed to **change the state of 1 kg of a substance without changing its temperature**.',
      'Using Q = mL, I substitute **m = 2 kg and L = 334,000 J/kg to get Q = 2 × 334,000 = 668,000 J**.',
      'During a state change, temperature does not change because **all the energy is used to break intermolecular bonds, not to increase kinetic energy of particles**.',
      'The flat section on a heating curve shows **the substance is changing state — energy is being absorbed but temperature stays constant**.',
      'Latent heat of vaporisation is greater than fusion because **more bonds need to be broken to fully separate particles from liquid to gas than from solid to liquid**.',
    ],
    misconception: 'Temperature does not rise during a state change — energy goes into breaking bonds, not heating the substance.',
    concept: 'Specific latent heat (Q = mL) is the energy needed to change state without temperature change. The flat sections on a heating/cooling curve represent state changes. Lv > Lf because more bonds are broken going from liquid to gas.',

    // -- 9-STEP LESSON DATA ----------------------------------------------------

    hook: {
      hookFact: 'To boil away 1 kg of water already at 100°C takes 2,260,000 J - the same energy needed to raise that same kilogram of ice from -269°C all the way to 100°C. Most of a kettle\'s energy goes into vaporisation, not heating.',
      hookQuestion: 'When you boil a kettle, why does it take so long to boil the water off completely once it has reached 100°C?',
      hookEmoji: '💧',
    },

    lessonKeywords: [
      {
        word: 'Specific Latent Heat',
        symbol: 'L',
        unit: 'J/kg',
        definition: 'The energy needed to change the state of 1 kg of a substance without changing its temperature.',
        everydayNote: 'For water: L of fusion = 334,000 J/kg (melting ice); L of vaporisation = 2,260,000 J/kg (boiling water).',
      },
      {
        word: 'Latent Heat of Fusion',
        symbol: 'Lf',
        unit: 'J/kg',
        definition: 'The energy needed to change 1 kg of solid to liquid (or liquid to solid) at constant temperature.',
        everydayNote: 'When you melt 1 kg of ice at 0°C, it absorbs 334,000 J without changing temperature.',
      },
      {
        word: 'Latent Heat of Vaporisation',
        symbol: 'Lv',
        unit: 'J/kg',
        definition: 'The energy needed to change 1 kg of liquid to gas (or gas to liquid) at constant temperature.',
        everydayNote: 'Lv for water (2,260,000 J/kg) is about 6.8 times bigger than Lf - more bonds must be broken to go from liquid to gas.',
      },
      {
        word: 'State Change',
        symbol: '',
        unit: '',
        definition: 'A transition between solid, liquid, and gas phases. Temperature stays constant during any state change.',
        everydayNote: 'On a heating curve, the flat sections (plateau regions) are where state changes happen - energy in, no temperature rise.',
      },
    ],

    prerequisiteCheck: {
      questions: [
        {
          question: 'During a state change (e.g. melting), what happens to the temperature of a substance?',
          answers: [
            'It rises steadily',
            'It stays constant',
            'It falls',
            'It rises then falls',
          ],
          correct: 1,
          feedback: 'Temperature stays constant during a state change. All the energy goes into breaking intermolecular bonds, not into increasing the kinetic energy of particles.',
        },
        {
          question: 'What does the equation E = mcΔT calculate?',
          answers: [
            'Energy to change state',
            'Energy to change temperature',
            'Energy stored in bonds',
            'Energy released during decay',
          ],
          correct: 1,
          feedback: 'E = mcΔT gives the energy needed when temperature changes. For state changes (no temperature change), you use E = mL instead.',
        },
      ],
    },

    topicMapHint: {
      before: ['States of Matter and Density', 'Internal Energy and SHC'],
      current: 'Specific Latent Heat',
      after: ['Gas Pressure', 'Thermal Energy Transfers'],
    },

    workedExample: {
      title: 'Calculating energy to evaporate water using E = mL',
      equation: 'E = mL | rearranges to m = E/L or L = E/m',
      context: 'How much energy is needed to completely evaporate 0.3 kg of water already at 100°C? (Lv = 2,260,000 J/kg)',
      steps: [
        {
          step: 1,
          action: 'Write what you know',
          content: 'm = 0.3 kg, Lv = 2,260,000 J/kg',
          annotation: 'The water is already at 100°C so you only need latent heat - no E = mcΔT needed here.',
        },
        {
          step: 2,
          action: 'Write the equation',
          content: 'E = mL',
          annotation: 'This equation is given on the formula sheet. Use Lv for boiling/condensing, Lf for melting/freezing.',
        },
        {
          step: 3,
          action: 'Substitute',
          content: 'E = 0.3 × 2,260,000',
          annotation: 'Common error: using Lf (334,000) instead of Lv (2,260,000) for boiling. Check which state change is described.',
        },
        {
          step: 4,
          action: 'Calculate and state with unit',
          content: 'E = 678,000 J',
          annotation: 'Sense check: 678 kJ to evaporate just 300 g of water - this is why steam burns are so dangerous. Steam carries huge latent heat.',
        },
      ],
      misconceptionAfter: {
        claim: 'Boiling just means the water reaches 100°C.',
        reality: 'Reaching 100°C is only the start. You then need an additional 2,260,000 J per kilogram to actually convert the liquid water to steam. Most of the energy used in boiling goes into this latent heat, not the temperature rise.',
        visual: 'Heating curve: rising slope = E = mcΔT. Flat plateau at 100°C = E = mLv. The plateau is the expensive part.',
      },
    },

    guidedPractice: {
      tier1: {
        question: 'How much energy is needed to melt 2 kg of ice? (Lf = 334,000 J/kg)',
        allSteps: [
          'Write what you know: m = 2 kg, Lf = 334,000 J/kg',
          'Write the equation: E = mL',
          'Substitute: E = 2 × 334,000',
          '??? - calculate E',
        ],
        missingStep: 3,
        missingHint: 'Calculate: 2 × 334,000 = ?',
        answer: 668000,
        answerUnit: 'J',
      },
      tier2: {
        question: 'How much energy is needed to evaporate 0.5 kg of water at 100°C? (Lv = 2,260,000 J/kg)',
        shownEquation: 'E = mL',
        shownStep1: 'Write what you know: m = 0.5 kg, Lv = 2,260,000 J/kg',
        hint: 'Multiply mass by Lv.',
        answer: 1130000,
        answerUnit: 'J',
      },
      tier3: {
        question: '167,000 J of energy melts some ice. (Lf = 334,000 J/kg). What mass of ice was melted?',
        hint: 'Rearrange E = mL to find m.',
        methodHint: 'Start with E = mL. Rearrange to m = E/L. Substitute E = 167,000 and L = 334,000.',
        answer: 0.5,
        answerUnit: 'kg',
      },
    },

    summary: {
      equation: 'E = mL',
      sentence: 'During a state change, temperature stays constant - all the energy goes into breaking or forming bonds between particles.',
      promptText: 'Without looking at notes: explain why the temperature stays constant during melting, even though energy is being added.',
    },

    sessionRecap: [
      'E = mL gives the energy for a state change. L is the specific latent heat in J/kg.',
      'Lv (vaporisation) is always bigger than Lf (fusion) - going from liquid to gas breaks more bonds.',
      'On a heating curve, flat sections = state changes. Rising sections = temperature increasing (use E = mcΔT).',
    ],
  },
  gas_pressure: {
    id: 'gas_pressure', module: 'Particle Model', moduleColor: PART_C, course: 'physics-only',
    title: 'Gas Pressure', subtitle: 'Boyle\'s Law, Temperature & Combined Gas Law (HT)',
    description: 'Gas pressure is caused by particles colliding with the walls of their container. At constant temperature: pV = constant — Boyle\'s Law (p₁V₁ = p₂V₂). At constant volume, increasing temperature increases the average kinetic energy of particles — they collide more frequently and forcefully → pressure increases. HT: The combined gas law links all three variables using absolute temperature in Kelvin: p₁V₁/T₁ = p₂V₂/T₂. Convert: T(K) = T(°C) + 273. At constant volume: p/T = constant (p₁/T₁ = p₂/T₂). Temperature in Kelvin must always be used — using °C gives wrong answers. This is why sealed containers (e.g. aerosols) must not be heated — pressure could build to a dangerous level.',
    lessonVisual: GasPressureLesson, ideaVisual: GasPressureIdea, realityVisual: GasPressureReality,
    equations: [{ expr: 'p₁V₁ = p₂V₂', given: true }, { expr: 'p₁/T₁ = p₂/T₂', given: true }],
    question: 'A gas at 2 atm has a volume of 6 L. If the volume is halved to 3 L, what is the new pressure?',
    questionSubtitle: 'Use p₁V₁ = p₂V₂ (constant temperature)',
    options: ['1 atm', '4 atm', '3 atm', '12 atm'],
    correctAnswer: 1,
    keywords: ["Boyle's Law", 'P₁V₁ = P₂V₂', 'combined gas law', 'p₁V₁/T₁ = p₂V₂/T₂', 'Kelvin', 'T(K) = T(°C) + 273', 'pressure', 'volume', 'inversely proportional', 'constant temperature', 'absolute temperature', 'kinetic energy', 'collision frequency'],
    sentenceStarters: ["Using Boyle's Law: P₁V₁ = P₂V₂...", 'Temperature must be in Kelvin: T(K) = T(°C) + 273...', 'Using the combined gas law: p₁V₁/T₁ = p₂V₂/T₂...', 'At constant volume, increasing temperature increases pressure because...', 'Heating a sealed gas increases pressure because particles...'],
    modelAnswers: [
      "Using Boyle's Law: P₁V₁ = P₂V₂, **so 2 × 6 = P₂ × 3, giving P₂ = 4 atm**.",
      'Temperature must be in Kelvin: T(K) = T(°C) + 273 — **using °C in the combined gas law gives incorrect answers**.',
      'Using the combined gas law: p₁V₁/T₁ = p₂V₂/T₂ — **this links pressure, volume and absolute temperature simultaneously**.',
      'At constant volume, increasing temperature increases pressure because **particles gain kinetic energy, move faster, and collide more frequently and forcefully**.',
      'Heating a sealed gas increases pressure because particles **move faster (higher KE) and hit the walls more often and harder — never heat sealed containers**.',
    ],
    misconception: 'Gas pressure is caused by particle collisions, not particle weight. Temperature must be in Kelvin (not °C) in the combined gas law — 0°C = 273 K, not 0 K.',
    concept: 'Boyle: p₁V₁ = p₂V₂ = 12. Combined gas law (HT): p₁V₁/T₁ = p₂V₂/T₂ with T in Kelvin. At constant V: p₁/T₁ = p₂/T₂. Always convert °C → K before substituting.',

    // -- 9-STEP LESSON DATA ----------------------------------------------------

    hook: {
      hookFact: 'Aerosol cans warn: do not expose to temperatures above 50°C. At 50°C (323 K) versus 20°C (293 K), pressure rises by about 10% - enough to rupture the can. Boyle\'s and Charles\' Laws predict this exactly.',
      hookQuestion: 'Why do tyres feel harder in cold weather and why should you never put an aerosol can on a radiator?',
      hookEmoji: '🎈',
    },

    lessonKeywords: [
      {
        word: 'Gas Pressure',
        symbol: 'p',
        unit: 'Pa',
        definition: 'The force per unit area exerted by gas particles colliding with the walls of their container.',
        everydayNote: 'More collisions or harder collisions = higher pressure. Squashing a gas into a smaller volume means more collisions per second.',
      },
      {
        word: "Boyle's Law",
        symbol: 'p₁V₁ = p₂V₂',
        unit: '',
        definition: 'At constant temperature, pressure and volume are inversely proportional - doubling one halves the other.',
        everydayNote: 'Squeeze a sealed syringe to half its volume and the pressure doubles. The gas particles hit the walls twice as often.',
      },
      {
        word: 'Kelvin Temperature',
        symbol: 'T',
        unit: 'K',
        definition: 'Absolute temperature scale starting at absolute zero (0 K = -273°C). Always use Kelvin in gas law calculations.',
        everydayNote: 'Convert: T(K) = T(°C) + 273. So 20°C = 293 K. Using °C in gas law equations gives wrong answers.',
      },
      {
        word: 'Combined Gas Law',
        symbol: 'p₁V₁/T₁ = p₂V₂/T₂',
        unit: '',
        definition: 'Higher tier: links pressure, volume, and absolute temperature for a fixed mass of gas.',
        everydayNote: 'This combines Boyle\'s Law and Charles\' Law into one equation. T must always be in Kelvin.',
      },
    ],

    prerequisiteCheck: {
      questions: [
        {
          question: 'What causes gas pressure on the walls of a container?',
          answers: [
            'The weight of the gas pushing down',
            'Gas particles colliding with the container walls',
            'The temperature of the gas',
            'Chemical reactions between gas molecules',
          ],
          correct: 1,
          feedback: 'Gas pressure is caused by particles colliding with the container walls. More collisions, or faster-moving particles, means higher pressure.',
        },
        {
          question: 'What is 27°C converted to Kelvin?',
          answers: ['246 K', '300 K', '27 K', '327 K'],
          correct: 1,
          feedback: 'T(K) = T(°C) + 273. So 27 + 273 = 300 K. This conversion is essential - never use °C in gas law equations.',
        },
      ],
    },

    topicMapHint: {
      before: ['States of Matter and Density', 'Internal Energy and SHC'],
      current: 'Gas Pressure',
      after: ['Thermal Energy Transfers', 'Atomic Structure'],
    },

    workedExample: {
      title: "Applying Boyle's Law to find new pressure",
      equation: 'p₁V₁ = p₂V₂ | rearranges to p₂ = p₁V₁/V₂',
      context: 'A gas at 100,000 Pa occupies 0.5 m³. It is compressed at constant temperature to 0.25 m³. Find the new pressure.',
      steps: [
        {
          step: 1,
          action: 'Write what you know',
          content: 'p₁ = 100,000 Pa, V₁ = 0.5 m³, V₂ = 0.25 m³',
          annotation: 'Temperature is constant, so Boyle\'s Law applies. No need for Kelvin conversion here.',
        },
        {
          step: 2,
          action: 'Write the equation',
          content: 'p₁V₁ = p₂V₂',
          annotation: 'This is Boyle\'s Law. It is given on the formula sheet.',
        },
        {
          step: 3,
          action: 'Substitute and rearrange',
          content: 'p₂ = p₁V₁ / V₂ = (100,000 × 0.5) / 0.25 = 50,000 / 0.25',
          annotation: 'Common error: dividing by V₁ instead of V₂. Rearrange first, then substitute.',
        },
        {
          step: 4,
          action: 'Calculate and state with unit',
          content: 'p₂ = 200,000 Pa',
          annotation: 'Sense check: volume halved, so pressure doubled. This is exactly what Boyle\'s Law predicts.',
        },
      ],
      misconceptionAfter: {
        claim: 'You can use temperature in °C in gas law equations.',
        reality: 'You must use Kelvin. At 0°C (273 K) a gas has significant pressure and kinetic energy. If you used 0°C directly in p/T = constant, you would get division by zero at -273°C, which is physically nonsensical.',
        visual: 'Think of Kelvin as starting the temperature scale at true zero movement. Celsius starts at the freezing point of water - an arbitrary choice that breaks the maths in gas laws.',
      },
    },

    guidedPractice: {
      tier1: {
        question: 'A gas at 200,000 Pa has a volume of 2 L. Volume expands to 4 L at constant temperature. Find the new pressure.',
        allSteps: [
          'Write what you know: p₁ = 200,000 Pa, V₁ = 2 L, V₂ = 4 L',
          'Write the equation: p₁V₁ = p₂V₂',
          'Rearrange: p₂ = p₁V₁ / V₂ = (200,000 × 2) / 4',
          '??? - calculate p₂',
        ],
        missingStep: 3,
        missingHint: 'Calculate: (200,000 × 2) / 4 = ?',
        answer: 100000,
        answerUnit: 'Pa',
      },
      tier2: {
        question: 'A gas at 100 kPa has volume 6 m³. It is compressed until pressure reaches 300 kPa at constant temperature. What is the new volume?',
        shownEquation: 'p₁V₁ = p₂V₂ -> V₂ = p₁V₁ / p₂',
        shownStep1: 'Write what you know: p₁ = 100 kPa, V₁ = 6 m³, p₂ = 300 kPa',
        hint: 'V₂ = (100 × 6) / 300',
        answer: 2,
        answerUnit: 'm³',
      },
      tier3: {
        question: 'At constant volume, a gas at 150,000 Pa and 300 K is heated to 450 K. Find the new pressure.',
        hint: 'At constant volume, use p₁/T₁ = p₂/T₂. T must be in Kelvin - it already is here.',
        methodHint: 'Start with p₁/T₁ = p₂/T₂. Rearrange to p₂ = p₁ × T₂/T₁ = 150,000 × 450/300.',
        answer: 225000,
        answerUnit: 'Pa',
      },
    },

    summary: {
      equation: 'p₁V₁ = p₂V₂ (Boyle\'s Law) | p₁V₁/T₁ = p₂V₂/T₂ (HT: combined gas law)',
      sentence: 'Gas pressure is caused by particle collisions with walls. Compressing a gas or heating it at constant volume both increase pressure.',
      promptText: 'Without looking at notes: explain in one sentence why squashing a gas into a smaller volume increases its pressure.',
    },

    sessionRecap: [
      'Gas pressure = particle collisions with walls. More/faster collisions = higher pressure.',
      "Boyle's Law: p₁V₁ = p₂V₂. At constant temperature, doubling volume halves pressure.",
      'Always convert °C to Kelvin (add 273) before using the combined gas law.',
    ],
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

    // ── 9-STEP LESSON DATA ────────────────────────────────────────────────────

    hook: {
      hookFact: 'If an atom were the size of a football stadium, the nucleus would be smaller than a pea at the centre — and the electrons would be tiny specks orbiting near the outer walls. The atom is almost entirely empty space.',
      hookQuestion: 'Everything around you — this screen, your hands, the air — is made of atoms. What do you think is inside them?',
      hookEmoji: '⚛️',
    },

    lessonKeywords: [
      {
        word: 'Proton',
        symbol: 'p',
        unit: 'charge: +1',
        definition: 'A positively charged particle found in the nucleus of every atom. The number of protons defines which element an atom is.',
        everydayNote: 'Every carbon atom has exactly 6 protons. Change the proton count and you change the element entirely.',
      },
      {
        word: 'Neutron',
        symbol: 'n',
        unit: 'charge: 0',
        definition: 'An uncharged particle found in the nucleus alongside protons. Neutrons add mass but no charge.',
        everydayNote: 'Isotopes of the same element have the same protons but different neutron counts — like carbon-12 and carbon-14.',
      },
      {
        word: 'Electron',
        symbol: 'e',
        unit: 'charge: −1',
        definition: 'A negatively charged particle in shells around the nucleus. Electrons are responsible for chemistry and electrical conduction.',
        everydayNote: 'In a neutral atom, the number of electrons equals the number of protons — balancing the charge.',
      },
      {
        word: 'Atomic Number',
        symbol: 'Z',
        unit: '',
        definition: 'The number of protons in the nucleus of an atom. This uniquely identifies the element.',
        everydayNote: 'Carbon always has atomic number 6. Oxygen always has 8. The periodic table is ordered by atomic number.',
      },
      {
        word: 'Mass Number',
        symbol: 'A',
        unit: '',
        definition: 'The total number of protons and neutrons in the nucleus. Mass number = protons + neutrons.',
        everydayNote: 'Carbon-12 has mass number 12 (6 protons + 6 neutrons). Carbon-14 has mass number 14 (6 protons + 8 neutrons).',
      },
    ],

    prerequisiteCheck: {
      questions: [
        {
          question: 'Where is almost all of the mass of an atom found?',
          answers: ['In the electron shells', 'Evenly throughout the atom', 'In the nucleus', 'On the outer surface'],
          correct: 2,
          feedback: 'The nucleus — containing protons and neutrons — holds virtually all the atom\'s mass. Electrons have negligible mass (about 1/2000 of a proton).',
        },
        {
          question: 'An atom has atomic number 8 and mass number 16. How many neutrons does it have?',
          answers: ['8', '16', '24', '2'],
          correct: 0,
          feedback: 'Neutrons = mass number − atomic number = 16 − 8 = 8 neutrons. This is oxygen-16.',
        },
      ],
    },

    topicMapHint: {
      before: ['Particle Model', 'States of Matter'],
      current: 'Structure of the Atom',
      after: ['History of the Atomic Model', 'Radioactive Decay', 'Nuclear Equations', 'Half-Life'],
    },

    workedExample: {
      title: 'Finding protons, neutrons and electrons from notation',
      equation: 'Neutrons = mass number − atomic number',
      context: 'An atom is written as ²³₁₁Na (sodium-23). How many protons, neutrons, and electrons does it have?',
      steps: [
        {
          step: 1,
          action: 'Identify the atomic number (bottom number)',
          content: 'Atomic number = 11 → protons = 11',
          annotation: 'The bottom number is always the atomic number = number of protons. This is what makes it sodium.',
        },
        {
          step: 2,
          action: 'Identify the mass number (top number)',
          content: 'Mass number = 23',
          annotation: 'The top number is always the mass number = total protons + neutrons.',
        },
        {
          step: 3,
          action: 'Calculate neutrons',
          content: 'Neutrons = 23 − 11 = 12',
          annotation: 'Neutrons = mass number − atomic number. Always subtract atomic number from mass number.',
        },
        {
          step: 4,
          action: 'Find electrons (neutral atom)',
          content: 'Electrons = protons = 11',
          annotation: 'In a neutral atom, electrons always equal protons — the charges cancel out. If it\'s an ion, this changes.',
        },
      ],
      misconceptionAfter: {
        claim: 'The mass number tells you the number of protons.',
        reality: 'Wrong — mass number = protons + neutrons. The ATOMIC number tells you the number of protons. Mixing these two up is one of the most common exam errors in this topic.',
        visual: 'Atomic number (bottom) = protons only. Mass number (top) = protons + neutrons. Neutrons = top − bottom.',
      },
    },

    guidedPractice: {
      tier1: {
        question: 'An atom of chlorine is written as ³⁵₁₇Cl. How many neutrons does it have?',
        allSteps: [
          'Identify the atomic number: bottom number = 17 (protons = 17)',
          'Identify the mass number: top number = 35',
          'Write the equation: Neutrons = mass number − atomic number',
          '??? — what is 35 − 17?',
        ],
        missingStep: 3,
        missingHint: 'Calculate: 35 − 17 = ?',
        answer: 18,
        answerUnit: 'neutrons',
      },
      tier2: {
        question: 'An atom has 20 protons and mass number 40. How many neutrons does it have? What element is it?',
        shownEquation: 'Neutrons = mass number − atomic number',
        shownStep1: 'Write what you know: protons (atomic number) = 20, mass number = 40',
        hint: 'Neutrons = 40 − 20 = ?',
        answer: 20,
        answerUnit: 'neutrons (calcium)',
      },
      tier3: {
        question: 'Uranium-238 has atomic number 92. How many neutrons does it have? How many electrons in a neutral atom?',
        hint: 'Neutrons = mass number − atomic number. Electrons = protons (in a neutral atom).',
        methodHint: 'Mass number = 238, atomic number = 92. Neutrons = 238 − 92. Electrons = protons = 92.',
        answer: 146,
        answerUnit: 'neutrons',
      },
    },

    summary: {
      equation: 'Neutrons = A − Z',
      sentence: 'The atomic number (protons) defines the element; the mass number is protons plus neutrons; a neutral atom has equal protons and electrons.',
      promptText: 'Explain what the atomic number and mass number tell you about an atom, in one sentence.',
    },

    sessionRecap: [
      'Nucleus: protons (+) and neutrons (0). Electrons (−) orbit in shells.',
      'Atomic number (Z) = protons. Mass number (A) = protons + neutrons. Neutrons = A − Z.',
      'Isotopes: same element (same Z), different neutron count (different A).',
    ],
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

    // -- 9-STEP LESSON DATA ----------------------------------------------------

    hook: {
      hookFact: 'Rutherford expected alpha particles to pass straight through the gold foil. He described the few that bounced back as like firing artillery shells at tissue paper and having them return. That single surprise changed our entire picture of the atom.',
      hookQuestion: 'Before 1911, scientists thought the atom was a positive sphere with electrons dotted through it. What experiment could prove that wrong?',
      hookEmoji: '🔬',
    },

    lessonKeywords: [
      {
        word: 'Plum Pudding Model',
        symbol: '',
        unit: '',
        definition: 'Thomson\'s 1904 model: electrons embedded in a diffuse positive sphere, like raisins in a pudding.',
        everydayNote: 'This model predicted alpha particles should pass straight through with tiny deflections - the gold foil experiment proved it wrong.',
      },
      {
        word: 'Alpha Scattering',
        symbol: '',
        unit: '',
        definition: 'Rutherford\'s 1911 experiment: firing alpha particles at thin gold foil. Most passed through; a few were deflected or bounced back.',
        everydayNote: 'The back-scattered alphas were the clue - only a tiny, dense, positive nucleus could repel them so strongly.',
      },
      {
        word: 'Nuclear Model',
        symbol: '',
        unit: '',
        definition: 'Rutherford\'s 1911 model: a tiny, dense, positively charged nucleus at the centre, with electrons in the surrounding space.',
        everydayNote: 'The atom is mostly empty space. The nucleus is about 10,000 times smaller than the whole atom.',
      },
      {
        word: 'Bohr Model',
        symbol: '',
        unit: '',
        definition: 'Bohr\'s 1913 refinement: electrons occupy fixed shells at specific energy levels around the nucleus.',
        everydayNote: 'This model explains emission spectra - electrons jumping between shells release photons of specific energies.',
      },
    ],

    prerequisiteCheck: {
      questions: [
        {
          question: 'What is an alpha particle?',
          answers: [
            'A fast-moving electron',
            'A helium nucleus (2 protons + 2 neutrons)',
            'An electromagnetic wave',
            'A single proton',
          ],
          correct: 1,
          feedback: 'An alpha particle is a helium-4 nucleus: 2 protons and 2 neutrons, charge +2. This makes it positively charged, so a positive nucleus repels it.',
        },
        {
          question: 'What charge does the nucleus of an atom carry?',
          answers: ['Negative', 'Neutral', 'Positive', 'It varies'],
          correct: 2,
          feedback: 'The nucleus is always positively charged - it contains protons (+1 each) and neutrons (0 charge). Electrons (negative) are outside the nucleus.',
        },
      ],
    },

    topicMapHint: {
      before: ['Structure of the Atom', 'Atomic Number and Mass Number'],
      current: 'History of the Atomic Model',
      after: ['Radioactive Decay', 'Nuclear Equations', 'Half-Life'],
    },

    workedExample: {
      title: 'Interpreting alpha scattering results as evidence',
      equation: 'Atomic radius / Nuclear radius = ~10,000',
      context: 'In the Rutherford experiment, most alpha particles passed through, a small fraction deflected at small angles, and a very small fraction bounced back (deflected > 90°). Explain what each observation tells us.',
      steps: [
        {
          step: 1,
          action: 'Observation 1 - most pass straight through',
          content: 'The atom is mostly empty space - particles miss the nucleus entirely',
          annotation: 'This rules out the plum pudding model, where positive charge was spread throughout.',
        },
        {
          step: 2,
          action: 'Observation 2 - small deflections',
          content: 'Some alphas pass near the nucleus and are deflected by electrostatic repulsion',
          annotation: 'Positive alpha repelled by positive nucleus - the closer the pass, the bigger the deflection.',
        },
        {
          step: 3,
          action: 'Observation 3 - a very few bounce straight back',
          content: 'A head-on collision with the nucleus - the nucleus must be very dense and very small',
          annotation: 'Only a concentrated mass and charge could repel an alpha particle back the way it came.',
        },
        {
          step: 4,
          action: 'Conclusion',
          content: 'Nucleus is tiny, dense, positively charged. Most of the atom is empty space.',
          annotation: 'The nuclear radius is about 10,000 times smaller than the atom\'s radius.',
        },
      ],
      misconceptionAfter: {
        claim: 'Rutherford\'s result confirmed the plum pudding model.',
        reality: 'The opposite - the bouncing-back of some alphas directly contradicted the plum pudding model. Rutherford\'s own expectation was that all alphas would pass through. The surprising result forced a new model.',
        visual: 'Plum pudding predicts: all pass through (charge spread out, nothing dense to stop them). Rutherford found: some bounce back - so charge and mass must be concentrated in a tiny nucleus.',
      },
    },

    guidedPractice: {
      tier1: {
        question: 'Atomic radius = 1×10⁻¹⁰ m. Nuclear radius = 1×10⁻¹⁴ m. How many times wider is the atom than the nucleus?',
        allSteps: [
          'Write what you know: atom radius = 1×10⁻¹⁰ m, nucleus radius = 1×10⁻¹⁴ m',
          'Write the calculation: ratio = atom radius / nucleus radius',
          'Substitute: ratio = 1×10⁻¹⁰ / 1×10⁻¹⁴',
          '??? - calculate the ratio',
        ],
        missingStep: 3,
        missingHint: 'Calculate: 10⁻¹⁰ / 10⁻¹⁴ = 10^(−10−(−14)) = 10⁴ = ?',
        answer: 10000,
        answerUnit: 'times wider',
      },
      tier2: {
        question: 'If the atom were scaled up to 1 m diameter, what would the nucleus diameter be in mm?',
        shownEquation: 'Scale factor = 1 / 10,000',
        shownStep1: 'Write what you know: atom = 1 m, nucleus is 10,000 times smaller',
        hint: 'Nucleus size = 1 m / 10,000 = 0.0001 m. Convert to mm.',
        answer: 0.1,
        answerUnit: 'mm',
      },
      tier3: {
        question: 'If the radius ratio is 10,000, what is the volume ratio of atom to nucleus? (Volume scales as radius cubed.)',
        hint: 'Volume ratio = (radius ratio)³',
        methodHint: 'Start with radius ratio = 10,000. Volume ratio = 10,000³ = 10¹².',
        answer: 1000000000000,
        answerUnit: '(atom volume is 10¹² times larger)',
      },
    },

    summary: {
      equation: 'Dalton (1803) -> Thomson (1904) -> Rutherford (1911) -> Bohr (1913)',
      sentence: 'Each atomic model replaced the last when new experimental evidence could not be explained by the existing model.',
      promptText: 'Without looking at notes: describe the Rutherford experiment and state two conclusions he drew from the results.',
    },

    sessionRecap: [
      'Plum pudding model (Thomson, 1904): electrons in a positive sphere. Replaced when it could not explain back-scattering.',
      'Rutherford (1911): most of atom is empty space. Tiny, dense, positive nucleus proven by alpha scattering.',
      'Bohr (1913): electrons in fixed shells at set energy levels around the nucleus.',
    ],
  },
  radioactive_decay: {
    id: 'radioactive_decay', module: 'Atomic Structure', moduleColor: ATOM_C, course: 'combined',
    title: 'Radioactive Decay', subtitle: 'α, β, γ - Properties & Penetration',
    description: 'Unstable nuclei randomly emit radiation to become more stable. Alpha (α): helium nucleus (2p + 2n), highly ionising, stopped by paper. Beta-minus (β⁻): fast electron AND antineutrino (ν̄) emitted when a neutron converts to a proton; medium ionising, stopped by aluminium. Gamma (γ): EM radiation from nucleus, least ionising, reduced by lead/concrete. Activity measured in Becquerels (Bq).',
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

    // -- 9-STEP LESSON DATA ----------------------------------------------------

    hook: {
      hookFact: 'Smoke detectors use a tiny amount of Americium-241, an alpha emitter, to ionise the air between two electrodes and create a small current. When smoke enters, it absorbs the alpha particles, the current drops, and the alarm triggers. The source is completely safe because a sheet of paper stops alpha radiation.',
      hookQuestion: 'Three types of radiation exist: alpha, beta, and gamma. What do you think determines whether radiation is dangerous?',
      hookEmoji: '☢️',
    },

    lessonKeywords: [
      {
        word: 'Alpha Radiation',
        symbol: 'α',
        unit: '',
        definition: 'A helium nucleus (2 protons + 2 neutrons) emitted from an unstable nucleus. Highly ionising, stopped by a sheet of paper or 5 cm of air.',
        everydayNote: 'Alpha\'s large size and +2 charge means it interacts strongly with air molecules, losing energy quickly. High ionising power, very short range.',
      },
      {
        word: 'Beta Radiation',
        symbol: 'β',
        unit: '',
        definition: 'A fast electron emitted from the nucleus when a neutron converts to a proton. An antineutrino (ν̄) is also emitted. Medium ionising power, stopped by 3-5 mm of aluminium.',
        everydayNote: 'Beta particles are fast and small - they travel further than alpha but are stopped by a few millimetres of metal. The antineutrino that accompanies beta emission carries away energy but has no charge and barely interacts with matter.',
      },
      {
        word: 'Antineutrino',
        symbol: 'ν̄',
        unit: '',
        definition: 'A particle with near-zero mass and no charge emitted alongside an electron in beta-minus decay. Carries away some of the decay energy.',
        everydayNote: 'Antineutrinos barely interact with matter at all — trillions pass through your body every second from the Sun without doing anything. They were only confirmed to exist because energy seemed to go "missing" in beta decay.',
      },
      {
        word: 'Gamma Radiation',
        symbol: 'γ',
        unit: '',
        definition: 'High-energy electromagnetic radiation emitted from an excited nucleus. Least ionising, only significantly reduced by thick lead or concrete.',
        everydayNote: 'Gamma has no mass or charge - it passes straight through most materials without interacting. This gives it very high penetrating power.',
      },
      {
        word: 'Activity',
        symbol: 'A',
        unit: 'Bq (Becquerels)',
        definition: 'The number of nuclear decays per second in a radioactive sample.',
        everydayNote: '1 Bq = 1 decay per second. A typical smoke detector source has activity of around 30,000 Bq.',
      },
    ],

    prerequisiteCheck: {
      questions: [
        {
          question: 'Which particle makes up an alpha particle?',
          answers: [
            '2 protons and 2 electrons',
            '2 protons and 2 neutrons',
            '1 proton and 1 neutron',
            '4 protons',
          ],
          correct: 1,
          feedback: 'An alpha particle is identical to a helium-4 nucleus: 2 protons and 2 neutrons, giving it a mass number of 4 and atomic number of 2.',
        },
        {
          question: 'What does unstable mean for a nucleus?',
          answers: [
            'It has too many electrons',
            'It will explode immediately',
            'It may spontaneously emit radiation to become more stable',
            'It has equal protons and neutrons',
          ],
          correct: 2,
          feedback: 'An unstable nucleus has an unfavourable proton-to-neutron ratio. It emits radiation randomly to reach a more stable configuration - this is radioactive decay.',
        },
      ],
    },

    topicMapHint: {
      before: ['Structure of the Atom', 'History of the Atomic Model'],
      current: 'Radioactive Decay',
      after: ['Nuclear Equations', 'Half-Life', 'Radiation Hazards'],
    },

    workedExample: {
      title: 'Comparing alpha, beta, and gamma properties',
      equation: 'Ionising power is inversely related to penetrating power',
      context: 'A source emits alpha particles. Explain why it is dangerous if inhaled but safe to handle with tongs at arm\'s length.',
      steps: [
        {
          step: 1,
          action: 'State what alpha radiation is',
          content: 'Alpha = helium nucleus (2p + 2n), charge +2, relatively large and slow',
          annotation: 'The +2 charge and large size cause strong interactions with any matter it passes through.',
        },
        {
          step: 2,
          action: 'Explain external safety',
          content: 'Alpha is stopped by a few cm of air or a sheet of paper - skin easily stops it',
          annotation: 'Holding it at arm\'s length means the alpha loses all energy before reaching your skin.',
        },
        {
          step: 3,
          action: 'Explain internal danger',
          content: 'Inside the body, alpha has no skin barrier. All its energy is deposited directly into lung or gut tissue.',
          annotation: 'High ionising power + direct tissue contact = high cancer risk. Radon gas at home is a concern for this reason.',
        },
        {
          step: 4,
          action: 'Contrast with gamma',
          content: 'Gamma is most dangerous externally - it penetrates through the body. Alpha is most dangerous internally.',
          annotation: 'This is why the choice of radiation type matters for both uses and hazards.',
        },
      ],
      misconceptionAfter: {
        claim: 'The most ionising radiation is always the most dangerous.',
        reality: 'It depends on how you are exposed. Alpha is most ionising but stopped by skin (safe externally). If ingested or inhaled, it is extremely dangerous. Gamma is least ionising but penetrates the body from outside - more dangerous externally.',
        visual: 'External source: gamma most dangerous. Internal contamination: alpha most dangerous. This is why context always matters in radiation hazard questions.',
      },
    },

    misconceptionCards: [
      {
        wrong: 'Beta decay emits only an electron.',
        right: 'Beta-minus decay emits an electron AND an antineutrino (ν̄). The antineutrino carries away energy but has no charge and barely interacts with matter. It was discovered because energy seemed to disappear in beta decay — the antineutrino was carrying it away invisibly.',
      },
    ],

    guidedPractice: {
      tier1: {
        question: 'An alpha source has activity 5000 Bq. Activity halves with each half-life. What is the activity after 3 half-lives?',
        allSteps: [
          'Start: activity = 5000 Bq',
          'After 1 half-life: 5000 / 2 = 2500 Bq',
          'After 2 half-lives: 2500 / 2 = 1250 Bq',
          '??? - what is activity after 3 half-lives?',
        ],
        missingStep: 3,
        missingHint: 'Calculate: 1250 / 2 = ?',
        answer: 625,
        answerUnit: 'Bq',
      },
      tier2: {
        question: 'A source starts at 8000 Bq with a half-life of 2 days. What is the activity after 8 days?',
        shownEquation: 'Activity = initial / 2^n, where n = number of half-lives',
        shownStep1: 'Write what you know: initial = 8000 Bq, t½ = 2 days, time = 8 days, so n = 8/2 = 4 half-lives',
        hint: 'Calculate: 8000 / 2⁴ = 8000 / 16',
        answer: 500,
        answerUnit: 'Bq',
      },
      tier3: {
        question: 'Activity falls from 1600 Bq to 100 Bq in 20 years. What is the half-life?',
        hint: 'Count how many halvings get from 1600 to 100. Then divide total time by that number.',
        methodHint: 'Start: 1600 -> 800 -> 400 -> 200 -> 100. Count the steps. Then half-life = 20 years / number of steps.',
        answer: 5,
        answerUnit: 'years',
      },
    },

    summary: {
      equation: 'Alpha (α): stopped by paper. Beta (β): stopped by aluminium. Gamma (γ): reduced by lead/concrete.',
      sentence: 'Ionising power and penetrating power are inversely related - the radiation that ionises most strongly loses energy fastest and travels the shortest distance.',
      promptText: 'Without looking at notes: list alpha, beta, and gamma in order of ionising power (most to least) and state what stops each one.',
    },

    sessionRecap: [
      'Alpha (2p + 2n): most ionising, stopped by paper. Beta-minus (fast electron + antineutrino): medium, stopped by aluminium. Gamma (EM wave): least ionising, needs lead to reduce.',
      'Beta-minus decay: n → p + e⁻ + ν̄. Two particles are emitted — an electron AND an antineutrino.',
      'Activity (Bq) = number of decays per second. Short half-life = high activity.',
      'Ionising power and penetrating power are inversely related. High ionising power = short range.',
    ],
  },
  nuclear_equations: {
    id: 'nuclear_equations', module: 'Atomic Structure', moduleColor: ATOM_C, course: 'combined',
    title: 'Nuclear Equations', subtitle: 'Balancing Mass & Atomic Numbers',
    description: 'In nuclear equations, both the mass number (top) and atomic number (bottom) must balance on each side. Alpha decay: mass number decreases by 4, atomic number by 2. Beta-minus decay: neutron → proton + electron + antineutrino (ν̄); mass number unchanged, atomic number increases by 1. Gamma emission: no change to mass or atomic number.',
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

    // -- 9-STEP LESSON DATA ----------------------------------------------------

    hook: {
      hookFact: 'When uranium-238 decays, it turns into thorium-234 - a completely different element. That thorium then beta decays into protactinium-234, another new element. Each step in the decay chain converts one element into another - exactly what alchemists spent centuries trying to achieve by hand.',
      hookQuestion: 'Can one element change into a completely different element naturally? What would have to happen inside the nucleus?',
      hookEmoji: '⚗️',
    },

    lessonKeywords: [
      {
        word: 'Mass Number',
        symbol: 'A',
        unit: '',
        definition: 'The total number of protons and neutrons in a nucleus. Written as the top number in nuclear notation.',
        everydayNote: 'In alpha decay, mass number drops by 4. In beta decay, mass number stays the same.',
      },
      {
        word: 'Atomic Number',
        symbol: 'Z',
        unit: '',
        definition: 'The number of protons in a nucleus. Written as the bottom number in nuclear notation. Determines which element it is.',
        everydayNote: 'In alpha decay, atomic number drops by 2. In beta decay, atomic number rises by 1 (a neutron becomes a proton).',
      },
      {
        word: 'Alpha Decay',
        symbol: 'α',
        unit: '',
        definition: 'A nucleus emits an alpha particle (⁴₂He), losing 4 from its mass number and 2 from its atomic number.',
        everydayNote: 'U-238 (Z=92) -> Th-234 (Z=90): atomic number drops by 2, mass number drops by 4.',
      },
      {
        word: 'Beta Decay',
        symbol: 'β⁻',
        unit: '',
        definition: 'A neutron in the nucleus converts to a proton, emitting a fast electron (beta particle) AND an antineutrino (ν̄). Mass number stays the same; atomic number increases by 1.',
        everydayNote: 'C-14 (Z=6) → N-14 (Z=7): same mass number, atomic number rises by 1. The element changes. The antineutrino carries away energy but has no charge — it passes through matter almost without interacting.',
      },
    ],

    prerequisiteCheck: {
      questions: [
        {
          question: 'In nuclear notation ²³⁸₉₂U, what does 92 represent?',
          answers: ['Mass number', 'Neutron number', 'Atomic number (proton number)', 'Electron number'],
          correct: 2,
          feedback: 'The bottom number is always the atomic number - the number of protons. The top number (238) is the mass number. Neutrons = 238 - 92 = 146.',
        },
        {
          question: 'An alpha particle has atomic number 2 and mass number 4. If a nucleus with atomic number 88 and mass number 226 emits an alpha, what is the new atomic number?',
          answers: ['86', '90', '84', '88'],
          correct: 0,
          feedback: 'Alpha decay: atomic number decreases by 2. 88 - 2 = 86. Mass number would decrease by 4: 226 - 4 = 222.',
        },
      ],
    },

    topicMapHint: {
      before: ['Structure of the Atom', 'Radioactive Decay'],
      current: 'Nuclear Equations',
      after: ['Half-Life', 'Radiation Hazards', 'Nuclear Fission'],
    },

    workedExample: {
      title: 'Writing a balanced nuclear equation for alpha decay',
      equation: 'Mass numbers balance. Atomic numbers balance.',
      context: 'Uranium-238 (atomic number 92) undergoes alpha decay. Write the full nuclear equation and identify the daughter nucleus.',
      steps: [
        {
          step: 1,
          action: 'Write what you know',
          content: 'Parent: ²³⁸₉₂U. Alpha particle: ⁴₂He',
          annotation: 'Always write the alpha particle as ⁴₂He - it has mass number 4 and atomic number 2.',
        },
        {
          step: 2,
          action: 'Calculate the daughter mass number',
          content: '238 - 4 = 234',
          annotation: 'Mass numbers must balance: 238 = 234 + 4.',
        },
        {
          step: 3,
          action: 'Calculate the daughter atomic number',
          content: '92 - 2 = 90. Element 90 is Thorium (Th).',
          annotation: 'Atomic numbers must balance: 92 = 90 + 2. Use a periodic table to identify the element from atomic number.',
        },
        {
          step: 4,
          action: 'Write the full equation',
          content: '²³⁸₉₂U -> ²³⁴₉₀Th + ⁴₂He',
          annotation: 'Check: top numbers 238 = 234 + 4. Bottom numbers 92 = 90 + 2. Both sides balance.',
        },
      ],
      misconceptionAfter: {
        claim: 'In beta decay, the mass number increases because an electron is added.',
        reality: 'The mass number stays the same in beta decay. A neutron converts to a proton - the total number of particles in the nucleus is unchanged. Only atomic number increases by 1.',
        visual: 'Neutron (mass 1, charge 0) -> Proton (mass 1, charge +1) + Beta particle (mass ~0, charge -1). Mass number: 1 stays as 1. Atomic number: adds 1 proton, loses 0 - net gain of +1.',
      },
    },

    guidedPractice: {
      tier1: {
        question: 'Radium-226 (atomic number 88) undergoes alpha decay. What is the mass number of the daughter nucleus?',
        allSteps: [
          'Write what you know: Radium: mass number = 226, atomic number = 88',
          'Alpha particle: mass number = 4, atomic number = 2',
          'Daughter mass number = 226 - 4',
          '??? - calculate the daughter mass number',
        ],
        missingStep: 3,
        missingHint: 'Calculate: 226 - 4 = ?',
        answer: 222,
        answerUnit: '(mass number of daughter nucleus)',
      },
      tier2: {
        question: 'Carbon-14 (atomic number 6) undergoes beta decay. What is the atomic number of the daughter nucleus?',
        shownEquation: 'Beta decay: atomic number increases by 1, mass number unchanged',
        shownStep1: 'Write what you know: Carbon-14, atomic number = 6, mass number = 14',
        hint: 'Atomic number after beta decay = 6 + 1 = ?',
        answer: 7,
        answerUnit: '(which is nitrogen)',
      },
      tier3: {
        question: 'Thorium-234 (atomic number 90) undergoes beta decay. Write the atomic number of the daughter nucleus.',
        hint: 'Beta decay: atomic number increases by 1. Mass number stays the same.',
        methodHint: 'Start with atomic number = 90. Beta decay adds 1 to atomic number. What is 90 + 1?',
        answer: 91,
        answerUnit: '(which is protactinium)',
      },
    },

    summary: {
      equation: 'Alpha: A-4, Z-2. Beta: A unchanged, Z+1. Gamma: A and Z unchanged.',
      sentence: 'In any nuclear equation, the mass numbers must balance and the atomic numbers must balance on both sides.',
      promptText: 'Without looking at notes: write the rules for how mass number and atomic number change in alpha decay and in beta decay.',
    },

    sessionRecap: [
      'Both mass number (top) and atomic number (bottom) must balance on each side of a nuclear equation.',
      'Alpha decay: mass number -4, atomic number -2. Emits ⁴₂He.',
      'Beta decay: mass number unchanged, atomic number +1. A neutron becomes a proton inside the nucleus.',
    ],
  },
  half_life: {
    id: 'half_life', module: 'Atomic Structure', moduleColor: ATOM_C, course: 'combined',
    title: 'Half-Life', subtitle: 'Random Decay, t½ & Reading Graphs',
    description: 'Half-life is the time for half of the radioactive nuclei in a sample to decay (or for activity to halve). Decay is random — you cannot predict when any individual nucleus will decay, but large samples follow a predictable exponential pattern. To find half-life from a graph: read the activity at any point, find the time when activity reaches half that value — the difference is one half-life. Repeat from a different starting point to confirm. The graph of activity vs time is an exponential decay curve — it never reaches zero. The shorter the half-life, the more rapidly active the source.',
    lessonVisual: HalfLifeLesson, ideaVisual: HalfLifeIdea, realityVisual: HalfLifeReality,
    question: 'A sample has an activity of 800 Bq. After 3 half-lives, what is its activity?',
    questionSubtitle: 'Each half-life halves the activity',
    options: ['400 Bq', '200 Bq', '100 Bq', '266 Bq'],
    correctAnswer: 2,
    keywords: ['half-life', 'activity', 'becquerels', 'radioactive decay', 'exponential decay', 'halved', 'three half-lives', '÷ 2³', 'reading a graph', 'activity-time graph'],
    sentenceStarters: ['After each half-life, the activity halves...', 'To find half-life from a graph, I read the activity then find when it reaches half...', 'After 3 half-lives, the activity = 800 ÷ 8 = ...', 'The graph is an exponential decay because...', 'The activity after 3 half-lives = 800 ÷ 2³ = ...'],
    modelAnswers: [
      'After each half-life, the activity halves: **800 → 400 → 200 → 100 Bq after 3 half-lives**.',
      'After 3 half-lives, the activity = 800 ÷ 8 = **100 Bq**.',
      'To find half-life from a graph, I read the activity then find when it reaches half — **the time interval between these two readings is one half-life**.',
      'The graph is an exponential decay because **the activity halves in equal time intervals — not by equal amounts each time**.',
      'The activity after 3 half-lives = 800 ÷ 2³ = **800 ÷ 8 = 100 Bq**.',
    ],
    misconception: 'After a number of half-lives the activity never reaches exactly zero — it approaches zero asymptotically. Exponential decay means halving in equal time steps, not decreasing by equal amounts.',
    concept: '800 → 400 → 200 → 100 Bq. Graph method: pick any activity value, halve it, find the time difference → that is t½. The curve is exponential: equal time intervals give equal fractional decreases.',

    // -- 9-STEP LESSON DATA ----------------------------------------------------

    hook: {
      hookFact: 'Carbon-14 has a half-life of 5,730 years. Archaeologists can use this to date organic objects up to about 50,000 years old - around 9 half-lives. Beyond that, less than 0.2% of the original Carbon-14 remains, too little to measure reliably.',
      hookQuestion: 'How could you figure out the age of a piece of ancient wood using radioactivity? What would you need to know?',
      hookEmoji: '🦴',
    },

    lessonKeywords: [
      {
        word: 'Half-Life',
        symbol: 't½',
        unit: 's, min, hours, years',
        definition: 'The time for the activity of a radioactive source (or the number of undecayed nuclei) to halve.',
        everydayNote: 'Carbon-14: t½ = 5,730 years. Iodine-131 (used in medical imaging): t½ = 8 days. Shorter half-life = faster decay = more active.',
      },
      {
        word: 'Activity',
        symbol: 'A',
        unit: 'Bq',
        definition: 'The number of nuclear decays per second. Activity falls exponentially over time.',
        everydayNote: 'After one half-life, activity halves. After two half-lives, it is a quarter. It never truly reaches zero.',
      },
      {
        word: 'Exponential Decay',
        symbol: '',
        unit: '',
        definition: 'A pattern where quantity halves in equal time steps - not by equal amounts each time.',
        everydayNote: 'After 1 half-life: 50% remains. After 2: 25%. After 3: 12.5%. The decrease slows down as less material is left.',
      },
      {
        word: 'Random Decay',
        symbol: '',
        unit: '',
        definition: 'Individual nuclear decays cannot be predicted - each nucleus has the same probability of decaying per unit time, regardless of how long it has existed.',
        everydayNote: 'Like rolling dice: you cannot know when a specific nucleus will decay, but large samples follow predictable statistics.',
      },
    ],

    prerequisiteCheck: {
      questions: [
        {
          question: 'A source has activity 800 Bq. After two half-lives, what is the activity?',
          answers: ['400 Bq', '200 Bq', '100 Bq', '600 Bq'],
          correct: 1,
          feedback: 'After one half-life: 800 / 2 = 400 Bq. After two half-lives: 400 / 2 = 200 Bq. Each half-life halves the activity.',
        },
        {
          question: 'Can you predict exactly when a specific nucleus will decay?',
          answers: [
            'Yes, using the half-life formula',
            'Yes, if you know the activity',
            'No, radioactive decay is random and cannot be predicted for individual nuclei',
            'Only if the half-life is very short',
          ],
          correct: 2,
          feedback: 'Radioactive decay is fundamentally random. You cannot predict when any individual nucleus will decay. The half-life only tells you the statistical behaviour of a large number of nuclei.',
        },
      ],
    },

    topicMapHint: {
      before: ['Radioactive Decay', 'Nuclear Equations'],
      current: 'Half-Life',
      after: ['Radiation Hazards', 'Nuclear Fission', 'Nuclear Fusion'],
    },

    workedExample: {
      title: 'Calculating activity after multiple half-lives',
      equation: 'Activity after n half-lives = initial activity / 2ⁿ',
      context: 'A radioactive source has initial activity 6400 Bq and a half-life of 3 hours. What is the activity after 12 hours?',
      steps: [
        {
          step: 1,
          action: 'Write what you know',
          content: 'Initial activity = 6400 Bq, t½ = 3 hours, total time = 12 hours',
          annotation: 'Work out the number of half-lives first: n = total time / half-life.',
        },
        {
          step: 2,
          action: 'Calculate number of half-lives',
          content: 'n = 12 / 3 = 4 half-lives',
          annotation: 'Always divide total time by half-life. Do not just count to 12.',
        },
        {
          step: 3,
          action: 'Halve the activity 4 times',
          content: '6400 -> 3200 -> 1600 -> 800 -> 400 Bq',
          annotation: 'Or use: activity = 6400 / 2⁴ = 6400 / 16 = 400 Bq.',
        },
        {
          step: 4,
          action: 'State the answer with unit',
          content: 'Activity after 12 hours = 400 Bq',
          annotation: 'Sense check: 4 halvings of 6400 gives 400. Each step: ÷2.',
        },
      ],
      misconceptionAfter: {
        claim: 'After enough half-lives, the activity reaches exactly zero.',
        reality: 'The activity gets smaller and smaller but never reaches exactly zero. This is the mathematical property of exponential decay - it is asymptotic to zero. In practice, at some point the count rate is indistinguishable from background radiation.',
        visual: 'Graph: activity-time curve keeps halving but the curve never actually touches the x-axis. It gets flatter and flatter, approaching zero.',
      },
    },

    guidedPractice: {
      tier1: {
        question: 'A source has activity 4800 Bq. What is the activity after 2 half-lives?',
        allSteps: [
          'Start: activity = 4800 Bq',
          'After 1 half-life: 4800 / 2 = 2400 Bq',
          'After 2 half-lives: 2400 / 2 = ???',
          '??? - state the final answer',
        ],
        missingStep: 2,
        missingHint: 'Calculate: 2400 / 2 = ?',
        answer: 1200,
        answerUnit: 'Bq',
      },
      tier2: {
        question: 'A source starts at 2560 Bq. After 4 half-lives, what is the activity?',
        shownEquation: 'Activity = initial / 2ⁿ',
        shownStep1: 'Write what you know: initial = 2560 Bq, n = 4 half-lives',
        hint: 'Calculate: 2560 / 2⁴ = 2560 / 16',
        answer: 160,
        answerUnit: 'Bq',
      },
      tier3: {
        question: 'Activity falls from 3200 Bq to 400 Bq in 6 minutes. What is the half-life?',
        hint: 'Count how many halvings get from 3200 to 400. Then divide total time by that number.',
        methodHint: 'Start: 3200 -> 1600 -> 800 -> 400. Count the steps = 3 half-lives. Half-life = 6 / 3.',
        answer: 2,
        answerUnit: 'minutes',
      },
    },

    summary: {
      equation: 'Activity after n half-lives = A₀ / 2ⁿ',
      sentence: 'Half-life is the time for activity to halve. Decay is random for individual nuclei but predictable for large samples. The graph is an exponential curve that never reaches zero.',
      promptText: 'Without looking at notes: explain how you would find the half-life of a source from an activity-time graph.',
    },

    sessionRecap: [
      'Half-life = time for activity (or undecayed nuclei) to halve. Each half-life gives another factor of 2 reduction.',
      'Decay is random - cannot predict individual nuclei. Large samples follow exponential decay curves.',
      'Graph method: pick an activity, halve it, read off the time difference. That time difference is the half-life.',
    ],
  },
  radiation_hazards: {
    id: 'radiation_hazards', module: 'Atomic Structure', moduleColor: ATOM_C, course: 'physics-only',
    title: 'Background Radiation, Uses & Hazards', subtitle: 'Contamination vs Irradiation & Uses of Each Type',
    description: 'Background radiation is low-level radiation from natural sources (rocks, cosmic rays, radon gas) and man-made sources (medical, nuclear industry). Irradiation is exposure to a source outside the body — stops when source removed. Contamination means radioactive material inside or on the body — more dangerous as it continues to irradiate internal tissue. Uses: Alpha — smoke detectors (ionises air in detector; smoke absorbs alpha, triggering alarm). Beta — paper/metal thickness monitoring (beta passes through thin material; too little detected = too thick); medical tracers. Gamma — sterilising surgical equipment and food (kills bacteria); cancer radiotherapy (targeted beam kills tumour cells); medical imaging tracers (e.g. technetium-99m). Alpha is most dangerous when inhaled or ingested; gamma most dangerous from outside.',
    lessonVisual: RadiationHazardsLesson, ideaVisual: RadiationHazardsIdea, realityVisual: RadiationHazardsReality,
    question: 'Why is internal contamination by an alpha source more dangerous than external irradiation?',
    questionSubtitle: 'Think about what stops alpha particles',
    options: ['Alpha is more penetrating than other types', 'Alpha cannot be stopped by any material', 'Inside the body, alpha cannot be blocked by skin so directly damages cells', 'Alpha has the longest range'],
    correctAnswer: 2,
    keywords: ['contamination', 'irradiation', 'smoke detector', 'alpha uses', 'beta uses', 'gamma uses', 'sterilisation', 'radiotherapy', 'thickness monitoring', 'medical tracer', 'skin barrier', 'ionisation', 'cancer risk'],
    sentenceStarters: ['Alpha is used in smoke detectors because...', 'Beta is used for thickness monitoring because...', 'Gamma is used to sterilise surgical equipment because...', 'Inside the body, alpha radiation causes more damage because...', 'Contamination means radioactive material is inside the body, whereas irradiation means...'],
    modelAnswers: [
      'Alpha is used in smoke detectors because **it ionises the air between two electrodes, creating a small current; smoke absorbs alpha, reducing the current and triggering the alarm**.',
      'Beta is used for thickness monitoring because **it passes through thin material — if too little reaches the detector, the material is too thick, triggering a roller adjustment**.',
      'Gamma is used to sterilise surgical equipment because **it penetrates packaging and kills bacteria without heating the equipment**.',
      'Inside the body, alpha radiation causes more damage because **it cannot be blocked by skin and deposits all its energy into nearby tissue**.',
      'Contamination means radioactive material is inside the body, whereas irradiation means **you are exposed to radiation from an external source — irradiation stops when you move away**.',
    ],
    misconception: 'External irradiation from alpha is not very dangerous — skin stops it. Alpha is only dangerous when ingested or inhaled (contamination). Gamma is most dangerous externally because it penetrates deeply.',
    concept: 'Alpha: smoke detectors. Beta: thickness gauges, tracers. Gamma: sterilisation, radiotherapy, imaging. Contamination (source inside body) is more dangerous than irradiation (source outside) because you cannot move away from internal sources.',

    // -- 9-STEP LESSON DATA ----------------------------------------------------

    hook: {
      hookFact: 'Every year the average UK person receives about 2.7 millisieverts (mSv) of background radiation. Living next to a nuclear power station contributes less than 0.0001 mSv - far less than a single chest X-ray (0.02 mSv) or a transatlantic flight (0.08 mSv).',
      hookQuestion: 'Where do you think most of the radiation you are exposed to every year comes from?',
      hookEmoji: '🏥',
    },

    lessonKeywords: [
      {
        word: 'Background Radiation',
        symbol: '',
        unit: 'mSv/year',
        definition: 'Low-level radiation present everywhere from natural sources (radon gas, cosmic rays, rocks) and man-made sources (medical, nuclear industry).',
        everydayNote: 'Average UK background dose: 2.7 mSv/year. Most (about 50%) comes from radon gas in the ground.',
      },
      {
        word: 'Irradiation',
        symbol: '',
        unit: '',
        definition: 'Exposure to radiation from a source outside the body. Risk stops when you move away from the source.',
        everydayNote: 'A dental X-ray irradiates you briefly - when the machine switches off, the exposure ends completely.',
      },
      {
        word: 'Contamination',
        symbol: '',
        unit: '',
        definition: 'Radioactive material is deposited on or inside the body. Exposure continues even after removing the source from the environment.',
        everydayNote: 'Swallowing a radioactive particle is contamination - the source remains inside you, continuously irradiating nearby tissue.',
      },
      {
        word: 'Sievert',
        symbol: 'Sv',
        unit: 'Sv or mSv',
        definition: 'The unit of radiation dose that accounts for the biological effect on human tissue. Different radiations cause different amounts of damage per joule absorbed.',
        everydayNote: 'Annual dose limit for radiation workers: 20 mSv. UK public average: 2.7 mSv. Radiation therapy doses can reach thousands of mSv locally.',
      },
    ],

    prerequisiteCheck: {
      questions: [
        {
          question: 'Which type of radiation is most dangerous if a source is inhaled or ingested?',
          answers: ['Gamma, because it is most penetrating', 'Beta, because it moves fast', 'Alpha, because it is highly ionising with no tissue barrier to stop it', 'All are equally dangerous'],
          correct: 2,
          feedback: 'Alpha is most dangerous internally because it is highly ionising and, once inside the body, there is no skin or tissue barrier to stop it. All its energy is deposited in nearby cells.',
        },
        {
          question: 'Why is gamma radiation most dangerous from an external source?',
          answers: [
            'It is most ionising',
            'It penetrates deeply through the body and cannot be easily blocked',
            'It travels fastest',
            'It has the most mass',
          ],
          correct: 1,
          feedback: 'Gamma can penetrate through the body from outside, reaching internal organs. Alpha and beta are stopped by skin or clothing, so external exposure to them is less dangerous.',
        },
      ],
    },

    topicMapHint: {
      before: ['Radioactive Decay', 'Half-Life'],
      current: 'Background Radiation, Uses and Hazards',
      after: ['Nuclear Fission', 'Nuclear Fusion'],
    },

    workedExample: {
      title: 'Comparing contamination and irradiation risk',
      equation: 'Risk depends on: type of radiation + whether source is internal or external',
      context: 'A worker is near an alpha source. In Scenario A, they stand 1 m away holding tongs. In Scenario B, they inhale dust from the alpha source. Compare the risk.',
      steps: [
        {
          step: 1,
          action: 'Scenario A - external irradiation from alpha',
          content: 'Alpha is stopped by a few cm of air and by skin. At 1 m, barely any alpha reaches the worker.',
          annotation: 'This is why alpha sources in smoke detectors are safe to have in your home. The short range of alpha protects you.',
        },
        {
          step: 2,
          action: 'Scenario B - internal contamination from alpha',
          content: 'Inhaled alpha particles land directly on lung tissue. No skin barrier. All ionising energy deposited into cells.',
          annotation: 'This is why radon gas (an alpha emitter) in homes is a real cancer risk - it decays inside lung tissue.',
        },
        {
          step: 3,
          action: 'Compare the risks',
          content: 'Scenario A: very low risk. Scenario B: high cancer risk despite using the same source.',
          annotation: 'Same radiation type, completely different risk level. The key factor is irradiation (external) vs contamination (internal).',
        },
        {
          step: 4,
          action: 'Apply to gamma',
          content: 'Gamma from external source: high risk (penetrates body). Gamma if ingested: less extra risk than alpha (poor ioniser).',
          annotation: 'Gamma is most dangerous externally. Alpha is most dangerous internally. This is the key exam distinction.',
        },
      ],
      misconceptionAfter: {
        claim: 'Radiation from nuclear power stations is the biggest source of background radiation.',
        reality: 'The nuclear industry contributes less than 1% of the average person\'s radiation dose. Natural sources dominate: radon gas from the ground accounts for about 50%, with cosmic rays, food, and building materials making up most of the rest.',
        visual: 'UK background radiation sources: Radon (50%), Medical (15%), Cosmic rays (12%), Gamma from ground/buildings (14%), Food (12%), Nuclear industry (<1%).',
      },
    },

    guidedPractice: {
      tier1: {
        question: 'A person receives 0.5 mSv from background radiation and 0.08 mSv from a transatlantic flight. What is their total dose?',
        allSteps: [
          'Write what you know: background = 0.5 mSv, flight = 0.08 mSv',
          'Total dose = background + flight',
          'Total = 0.5 + 0.08',
          '??? - calculate total dose',
        ],
        missingStep: 3,
        missingHint: 'Calculate: 0.5 + 0.08 = ?',
        answer: 0.58,
        answerUnit: 'mSv',
      },
      tier2: {
        question: 'Annual dose limit for radiation workers = 20 mSv. Background dose = 2.7 mSv/year. What additional dose is allowed from work?',
        shownEquation: 'Remaining allowance = limit - background dose',
        shownStep1: 'Write what you know: limit = 20 mSv, background = 2.7 mSv',
        hint: 'Calculate: 20 - 2.7 = ?',
        answer: 17.3,
        answerUnit: 'mSv',
      },
      tier3: {
        question: 'A radiation worker is exposed to a dose rate of 0.4 mSv/hour for 30 minutes. What is the total dose received?',
        hint: 'Total dose = dose rate × time. Convert 30 minutes to hours first.',
        methodHint: 'Start: time = 30 min = 0.5 hours. Total dose = 0.4 mSv/h × 0.5 h.',
        answer: 0.2,
        answerUnit: 'mSv',
      },
    },

    summary: {
      equation: 'Risk = type of radiation + internal (contamination) or external (irradiation)',
      sentence: 'Background radiation is always present from natural and man-made sources. Alpha is most dangerous internally; gamma is most dangerous externally. Contamination is harder to control than irradiation.',
      promptText: 'Without looking at notes: explain the difference between contamination and irradiation and which is more difficult to protect against.',
    },

    sessionRecap: [
      'Background radiation comes from radon (largest source), cosmic rays, rocks, food, and man-made sources. Nuclear industry contributes very little.',
      'Irradiation: external exposure, stops when you move away. Contamination: source inside/on body, continuous exposure - much harder to remove.',
      'Alpha most dangerous internally (highly ionising, no barrier). Gamma most dangerous externally (penetrates deeply through tissue).',
    ],
  },
  nuclear_fission: {
    id: 'nuclear_fission', module: 'Atomic Structure', moduleColor: ATOM_C, course: 'physics-only',
    title: 'Nuclear Fission', subtitle: 'Chain Reactions, Reactors & Moderator',
    description: 'Nuclear fission occurs when a large unstable nucleus (e.g. U-235) absorbs a neutron and splits into two smaller nuclei, releasing 2-3 neutrons and a large amount of energy. These neutrons can trigger further fissions — a chain reaction. In a nuclear reactor: the moderator (usually water or graphite) slows down fast neutrons to the thermal speeds needed for U-235 to absorb them efficiently. Control rods (boron or cadmium) absorb neutrons to control the reaction rate — inserting them further slows the reaction; withdrawing them speeds it up.',
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

    // -- 9-STEP LESSON DATA ----------------------------------------------------

    hook: {
      hookFact: 'The bomb dropped on Hiroshima used 64 kg of uranium-235, but only about 1 kg actually underwent fission before the explosion. That 1 kg, via E = mc², released the same energy as about 15,000 tonnes of TNT.',
      hookQuestion: 'How could splitting the nucleus of a single atom release millions of times more energy than burning a molecule of fuel?',
      hookEmoji: '⚡',
    },

    lessonKeywords: [
      {
        word: 'Nuclear Fission',
        symbol: '',
        unit: '',
        definition: 'A large unstable nucleus (e.g. U-235) absorbs a neutron and splits into two smaller nuclei, releasing 2-3 neutrons and a large amount of energy.',
        everydayNote: 'Each U-235 fission releases about 200 MeV of energy - around 50 million times more than burning one carbon atom.',
      },
      {
        word: 'Chain Reaction',
        symbol: '',
        unit: '',
        definition: 'The neutrons released by one fission trigger further fissions in other nuclei, creating a self-sustaining cascade of reactions.',
        everydayNote: 'Uncontrolled chain reaction = nuclear weapon. Controlled chain reaction (1 neutron per fission on average) = nuclear reactor.',
      },
      {
        word: 'Moderator',
        symbol: '',
        unit: '',
        definition: 'A material (water or graphite) that slows fast neutrons to thermal speeds, at which U-235 can absorb them efficiently.',
        everydayNote: 'Fast neutrons tend to pass through U-235 without being absorbed. The moderator slows them down enough for absorption to occur.',
      },
      {
        word: 'Control Rods',
        symbol: '',
        unit: '',
        definition: 'Rods of boron or cadmium inserted into the reactor core to absorb neutrons and control the reaction rate.',
        everydayNote: 'Inserting rods further absorbs more neutrons - reaction slows. Withdrawing rods allows more neutrons to cause fission - reaction speeds up.',
      },
    ],

    prerequisiteCheck: {
      questions: [
        {
          question: 'What triggers a fission event in U-235?',
          answers: [
            'A proton hitting the nucleus',
            'A neutron being absorbed by the nucleus',
            'An electron being removed',
            'A gamma ray hitting the nucleus',
          ],
          correct: 1,
          feedback: 'U-235 absorbs a neutron, becomes U-236 (unstable), and immediately splits. The incoming neutron triggers the fission.',
        },
        {
          question: 'What is the role of the moderator in a nuclear reactor?',
          answers: [
            'To absorb excess neutrons',
            'To cool the reactor',
            'To slow fast neutrons to thermal speeds for efficient absorption by U-235',
            'To generate electricity',
          ],
          correct: 2,
          feedback: 'The moderator (water or graphite) slows fast neutrons so they can be absorbed by U-235 nuclei. Without the moderator, most neutrons would pass straight through.',
        },
      ],
    },

    topicMapHint: {
      before: ['Nuclear Equations', 'Radiation Hazards'],
      current: 'Nuclear Fission',
      after: ['Nuclear Fusion'],
    },

    workedExample: {
      title: 'Understanding chain reaction control in a reactor',
      equation: 'Controlled reaction: exactly 1 neutron per fission causes the next fission',
      context: 'A fission releases 2.5 neutrons on average. Explain what happens if the chain reaction is uncontrolled versus controlled.',
      steps: [
        {
          step: 1,
          action: 'Uncontrolled: each fission releases 2.5 neutrons, all cause further fissions',
          content: 'Generation 1: 1 fission. Generation 2: ~2.5. Generation 10: 2.5¹⁰ ≈ 9,500.',
          annotation: 'Exponential growth: each generation is 2.5 times bigger. Within 80 generations, energy release becomes explosive.',
        },
        {
          step: 2,
          action: 'Controlled: exactly 1 neutron per fission reaches another nucleus',
          content: 'Each fission causes exactly 1 more fission. Rate stays constant.',
          annotation: 'Control rods absorb the excess 1.5 neutrons (on average), leaving only 1 free to cause the next fission.',
        },
        {
          step: 3,
          action: 'Role of control rods',
          content: 'Boron or cadmium rods absorb neutrons. Insert deeper = absorb more = reaction slows. Withdraw = fewer absorbed = reaction speeds up.',
          annotation: 'Emergency shutdown: push all control rods fully in. Reaction stops within seconds.',
        },
        {
          step: 4,
          action: 'Energy output',
          content: 'Heat from fission heats water to produce steam. Steam drives a turbine connected to a generator.',
          annotation: 'The physics is the same as a coal plant - the only difference is the heat source.',
        },
      ],
      misconceptionAfter: {
        claim: 'A nuclear reactor could explode like a nuclear bomb.',
        reality: 'Impossible in a power reactor. A nuclear weapon requires weapons-grade uranium (>90% U-235) assembled precisely. A reactor uses only 3-5% enriched uranium and is deliberately designed so that the reaction self-limits if temperature rises too far.',
        visual: 'Bomb: almost all U-235, extremely fast uncontrolled chain reaction in microseconds. Reactor: low enrichment, controlled to exactly 1 neutron per fission, reaction takes seconds to change.',
      },
    },

    guidedPractice: {
      tier1: {
        question: 'Each fission releases 2 neutrons and both cause further fissions. How many fissions occur in generation 3?',
        allSteps: [
          'Generation 1: 1 fission, releases 2 neutrons',
          'Generation 2: 2 fissions, each releases 2 neutrons = 4 neutrons total',
          'Generation 3: each of the 4 neutrons causes a fission = ???',
          '??? - how many fissions in generation 3?',
        ],
        missingStep: 2,
        missingHint: 'Calculate: 2² = 4 in generation 2, so generation 3 = 2³ = ?',
        answer: 8,
        answerUnit: 'fissions',
      },
      tier2: {
        question: 'Each fission releases 2 neutrons, both cause fissions. How many fissions in generation 4?',
        shownEquation: 'Fissions in generation n = 2ⁿ',
        shownStep1: 'Write what you know: 2 neutrons per fission, each causes a fission, generation n = 4',
        hint: 'Calculate: 2⁴ = ?',
        answer: 16,
        answerUnit: 'fissions',
      },
      tier3: {
        question: 'In a controlled reactor, exactly 1 neutron per fission causes the next fission. Starting with 1 fission, how many fissions occur per generation after 5 generations?',
        hint: 'If exactly 1 neutron per fission reaches another nucleus, the rate stays constant.',
        methodHint: 'Start: 1 fission generates 1 neutron that causes 1 more fission. This repeats every generation: 1⁵ = 1. Steady state.',
        answer: 1,
        answerUnit: 'fissions per generation (steady state)',
      },
    },

    summary: {
      equation: 'U-235 + n -> fission products + 2-3 n + energy',
      sentence: 'Fission releases energy and neutrons. Control rods absorb neutrons to keep exactly one neutron per fission causing the next - a steady, controlled chain reaction.',
      promptText: 'Without looking at notes: explain the difference between the role of the moderator and the role of the control rods in a nuclear reactor.',
    },

    sessionRecap: [
      'Fission: U-235 absorbs a neutron, splits into two smaller nuclei + 2-3 neutrons + large energy release.',
      'Chain reaction: released neutrons trigger more fissions. Controlled (1 neutron per fission) in a reactor; uncontrolled in a weapon.',
      'Moderator (water/graphite) slows neutrons. Control rods (boron/cadmium) absorb neutrons to set reaction rate.',
    ],
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

    // -- 9-STEP LESSON DATA ----------------------------------------------------

    hook: {
      hookFact: 'The Sun fuses about 600 million tonnes of hydrogen into helium every second. Around 4 million tonnes of that is converted directly into energy via E = mc². Despite losing 4 million tonnes per second, the Sun has enough hydrogen fuel for another 5 billion years.',
      hookQuestion: 'Stars like the Sun have been burning for billions of years without any fuel being added. What kind of process could possibly sustain that?',
      hookEmoji: '☀️',
    },

    lessonKeywords: [
      {
        word: 'Nuclear Fusion',
        symbol: '',
        unit: '',
        definition: 'Two light nuclei combine to form a heavier nucleus, releasing energy. The product nucleus has slightly less mass than the two inputs combined - this mass difference is converted to energy.',
        everydayNote: 'Fusion powers every star. The Sun fuses hydrogen (H-1 and H-2) into helium-4, releasing enormous energy in the process.',
      },
      {
        word: 'Electrostatic Repulsion',
        symbol: '',
        unit: '',
        definition: 'The repulsive force between two positively charged nuclei. Fusion can only occur if the nuclei can get close enough to overcome this force.',
        everydayNote: 'Like trying to push two north poles of magnets together. At extreme temperatures, particles have enough kinetic energy to overcome the repulsion.',
      },
      {
        word: 'Plasma',
        symbol: '',
        unit: '',
        definition: 'A state of matter at extreme temperatures where electrons are stripped from nuclei, leaving a gas of free charged particles.',
        everydayNote: 'Fusion reactors on Earth (e.g. JET, ITER) contain hydrogen plasma at over 100 million °C - hotter than the Sun\'s core.',
      },
      {
        word: 'Mass-Energy Equivalence',
        symbol: 'E = mc²',
        unit: 'J',
        definition: 'Mass and energy are interchangeable. A small mass converts to a very large amount of energy because c² (9×10¹⁶) is enormous.',
        everydayNote: '1 gram of mass fully converted = 9×10¹³ J = enough energy to run a 1 kW heater for about 2,850 years.',
      },
    ],

    prerequisiteCheck: {
      questions: [
        {
          question: 'What is the main difference between nuclear fission and nuclear fusion?',
          answers: [
            'Fission uses hydrogen; fusion uses uranium',
            'Fission joins nuclei; fusion splits them',
            'Fission splits heavy nuclei; fusion joins light nuclei',
            'They are the same process at different scales',
          ],
          correct: 2,
          feedback: 'Fission: a heavy nucleus (like U-235) splits into smaller pieces. Fusion: light nuclei (like hydrogen isotopes) join together. Both release energy via E = mc².',
        },
        {
          question: 'Why do fusion nuclei need extremely high temperatures to fuse?',
          answers: [
            'High temperature makes the nuclei larger',
            'Nuclei need enough kinetic energy to overcome electrostatic repulsion and get close enough to fuse',
            'High temperature creates the neutrons needed',
            'Temperature determines the mass of the nuclei',
          ],
          correct: 1,
          feedback: 'Nuclei are positively charged and repel each other strongly. Very high temperatures give particles enough kinetic energy to get close enough for the strong nuclear force to overcome the electrostatic repulsion.',
        },
      ],
    },

    topicMapHint: {
      before: ['Nuclear Fission', 'Radiation Hazards'],
      current: 'Nuclear Fusion',
      after: ['Energy Resources (revisit)', 'Particle Physics (further study)'],
    },

    workedExample: {
      title: 'Comparing fission and fusion: energy and conditions',
      equation: 'E = mc² (applies to both fission and fusion)',
      context: 'Explain why fusion releases more energy per kilogram of fuel than fission, and why achieving fusion on Earth is so difficult.',
      steps: [
        {
          step: 1,
          action: 'Energy comparison',
          content: 'Fusion of 1 kg of hydrogen fuel releases roughly 4 times more energy than fission of 1 kg of uranium.',
          annotation: 'Per kilogram, fusion wins on energy output. This is why fusion is seen as the holy grail of energy research.',
        },
        {
          step: 2,
          action: 'Temperature requirement for fusion',
          content: 'Fusion requires temperatures above 10⁷ K (10 million °C) to overcome electrostatic repulsion.',
          annotation: 'The Sun achieves this through gravitational compression. On Earth, we need magnetic confinement (tokamak reactors) or inertial confinement (lasers).',
        },
        {
          step: 3,
          action: 'Mass converted to energy',
          content: 'In fusion, the product nucleus has less mass than the sum of the inputs. This "missing" mass is converted to energy via E = mc².',
          annotation: 'The same principle applies in fission. Mass difference × c² gives the energy released.',
        },
        {
          step: 4,
          action: 'Why fusion is difficult to achieve on Earth',
          content: 'Containing plasma at 100 million °C without it touching the reactor walls is an enormous engineering challenge.',
          annotation: 'No material can withstand that temperature - fusion reactors use powerful magnetic fields to keep the plasma away from the walls.',
        },
      ],
      misconceptionAfter: {
        claim: 'Fusion is dangerous like fission because it produces radioactive waste.',
        reality: 'Fusion produces far less long-lived radioactive waste than fission. The main product of hydrogen fusion is helium - a safe, non-radioactive gas. Some reactor materials become mildly radioactive, but for much shorter periods than fission waste.',
        visual: 'Fission waste: some isotopes remain dangerously radioactive for thousands of years. Fusion waste: reactor components activated for decades, but the fuel product (helium) is completely safe.',
      },
    },

    guidedPractice: {
      tier1: {
        question: 'The Sun converts 4×10⁻³ kg of mass to energy per second. Using E = mc², find the energy released. (c = 3×10⁸ m/s)',
        allSteps: [
          'Write what you know: m = 4×10⁻³ kg, c = 3×10⁸ m/s',
          'Write the equation: E = mc²',
          'Substitute: E = 4×10⁻³ × (3×10⁸)²',
          '??? - calculate E',
        ],
        missingStep: 3,
        missingHint: 'Calculate: c² = (3×10⁸)² = 9×10¹⁶. Then E = 4×10⁻³ × 9×10¹⁶ = ?',
        answer: 3.6,
        answerUnit: '×10¹⁴ J',
      },
      tier2: {
        question: 'A fusion reaction converts m = 1×10⁻³ kg of mass to energy. Find E. (c = 3×10⁸ m/s)',
        shownEquation: 'E = mc²',
        shownStep1: 'Write what you know: m = 1×10⁻³ kg, c² = 9×10¹⁶ m²/s²',
        hint: 'E = 1×10⁻³ × 9×10¹⁶ = ?',
        answer: 9,
        answerUnit: '×10¹³ J',
      },
      tier3: {
        question: 'A fusion reaction releases E = 4.5×10¹⁴ J. Find the mass converted. (c = 3×10⁸ m/s)',
        hint: 'Rearrange E = mc² to m = E/c².',
        methodHint: 'Start with E = mc². Rearrange: m = E/c² = 4.5×10¹⁴ / (9×10¹⁶). Calculate the result.',
        answer: 0.005,
        answerUnit: 'kg',
      },
    },

    summary: {
      equation: 'E = mc² | Fusion: light nuclei + extreme temperature -> heavier nucleus + energy',
      sentence: 'Fusion joins light nuclei at temperatures above 10 million °C, converting a tiny amount of mass into a very large amount of energy. It powers every star in the universe.',
      promptText: 'Without looking at notes: explain why fusion requires such high temperatures and why it releases more energy per kg of fuel than fission.',
    },

    sessionRecap: [
      'Fusion: two light nuclei join to form a heavier nucleus + energy. Requires temperatures above 10⁷ K to overcome electrostatic repulsion.',
      'Mass is converted to energy via E = mc². The tiny mass difference between reactants and products becomes a huge energy release.',
      'Fusion releases more energy per kg of fuel than fission. Stars sustain fusion by gravity; Earth-based reactors use magnetic confinement.',
    ],
  },
}
