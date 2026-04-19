import { motion } from 'motion/react'
import { useState } from 'react'
import { Car, Zap, TrendingDown, DollarSign } from 'lucide-react'
import { MisconceptionCard, RealWorldCard, FormulaBox, SimSlider, SimNarration } from './visuals-helpers'

const GC_RAD = '#f59e0b'  // amber for radiation & risk

const GC = '#10b981'  // green for global challenges

// ─── Transport Safety Visuals ────────────────────────────────────────────────

function TransportSafetyLesson() {
  const [speed, setSpeed] = useState(15)
  const mass = 70
  const momentum = mass * speed
  const timeWithout = 0.05
  const timeWith = 0.3
  const forceWithout = Math.round(momentum / timeWithout)
  const forceWith = Math.round(momentum / timeWith)
  const maxForce = 70 * 30 / 0.05  // max possible ~ 42000
  const barMaxPx = 180
  const barWithout = Math.round((forceWithout / maxForce) * barMaxPx)
  const barWith = Math.round((forceWith / maxForce) * barMaxPx)

  return (
    <div className="w-full h-full flex flex-col justify-start gap-2 px-3 py-2" style={{ background: '#0b1121' }}>
      <SimSlider label="Speed" min={5} max={30} step={1} value={speed} onChange={setSpeed} unit="m/s" color={GC} />

      {/* SVG comparison */}
      <svg width="100%" viewBox="0 0 260 148" role="img" aria-label={`Bar chart comparing impact force with and without crumple zone at ${speed} m/s: ${forceWithout.toLocaleString()} N without vs ${forceWith.toLocaleString()} N with crumple zone`} style={{ borderRadius: 10, border: '1.5px solid #1d293d', background: '#0f1829' }}>
        {/* Column headers */}
        <text x="70" y="16" textAnchor="middle" fill="#ef4444" fontSize={8} fontWeight="bold">WITHOUT crumple zone</text>
        <text x="190" y="16" textAnchor="middle" fill={GC} fontSize={8} fontWeight="bold">WITH crumple zone</text>
        <line x1="130" y1="8" x2="130" y2="148" stroke="#1d293d" strokeWidth="1" />

        {/* Left car icon — squished */}
        <rect x="22" y="24" width="36" height="20" rx="4" fill="#1d293d" stroke="#ef4444" strokeWidth="1.5" />
        <rect x="28" y="19" width="24" height="10" rx="2" fill="#1d293d" stroke="#ef4444" strokeWidth="1" />
        <circle cx="27" cy="44" r="4" fill="#334155" stroke="#ef4444" strokeWidth="1" />
        <circle cx="49" cy="44" r="4" fill="#334155" stroke="#ef4444" strokeWidth="1" />
        {/* wall */}
        <rect x="60" y="22" width="6" height="26" rx="2" fill="#ef4444" opacity="0.8" />
        {/* stop distance arrow – short = fast stop */}
        <line x1="58" y1="56" x2="22" y2="56" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2" />
        <text x="40" y="65" textAnchor="middle" fill="#ef4444" fontSize={7}>Δt = {timeWithout} s</text>

        {/* Right car icon — crumple zone shown */}
        <rect x="140" y="24" width="36" height="20" rx="4" fill="#1d293d" stroke={GC} strokeWidth="1.5" />
        <rect x="146" y="19" width="24" height="10" rx="2" fill="#1d293d" stroke={GC} strokeWidth="1" />
        <circle cx="145" cy="44" r="4" fill="#334155" stroke={GC} strokeWidth="1" />
        <circle cx="167" cy="44" r="4" fill="#334155" stroke={GC} strokeWidth="1" />
        {/* crumple zone (corrugated) */}
        <path d="M176,26 L180,30 L184,26 L188,30 L192,26 L196,30" fill="none" stroke={GC} strokeWidth="1.5" />
        {/* wall */}
        <rect x="196" y="22" width="6" height="26" rx="2" fill={GC} opacity="0.7" />
        {/* stop distance arrow – longer = slower stop */}
        <line x1="194" y1="56" x2="140" y2="56" stroke={GC} strokeWidth="1.5" strokeDasharray="3 2" />
        <text x="167" y="65" textAnchor="middle" fill={GC} fontSize={7}>Δt = {timeWith} s</text>

        {/* Force bars */}
        <text x="10" y="82" fill="#a8b8cc" fontSize={7}>Force on passenger (F = Δp/Δt):</text>

        {/* Without bar */}
        <motion.rect x="10" y="88" height="14" rx="3" fill="#ef4444"
          animate={{ width: barWithout }} transition={{ duration: 0.35 }} />
        <motion.text y="99" fill="#fff" fontSize={7} fontWeight="bold"
          animate={{ x: barWithout > 40 ? barWithout - 2 : barWithout + 4 }} transition={{ duration: 0.35 }}
          textAnchor={barWithout > 40 ? 'end' : 'start'}
        >{forceWithout.toLocaleString()} N</motion.text>

        {/* With bar */}
        <motion.rect x="10" y="108" height="14" rx="3" fill={GC}
          animate={{ width: barWith }} transition={{ duration: 0.35 }} />
        <motion.text y="119" fill="#fff" fontSize={7} fontWeight="bold"
          animate={{ x: barWith > 40 ? barWith - 2 : barWith + 4 }} transition={{ duration: 0.35 }}
          textAnchor={barWith > 40 ? 'end' : 'start'}
        >{forceWith.toLocaleString()} N</motion.text>

        {/* Momentum display */}
        <text x="130" y="140" textAnchor="middle" fill="#a8b8cc" fontSize={7.5}>
          Δp = {mass}×{speed} = {momentum} kg·m/s   |   F = Δp/Δt
        </text>
        <text x="130" y="148" textAnchor="middle" fill={GC} fontSize={7} fontWeight="bold">
          Crumple zone: {Math.round(forceWithout / forceWith)}× less force on passenger
        </text>
      </svg>
      <SimNarration text={`At ${speed} m/s, momentum is ${momentum} kg·m/s. Without a crumple zone the stop takes 0.05 s — force on passenger: ${forceWithout.toLocaleString()} N. With a crumple zone the stop takes 0.3 s — force drops to ${forceWith.toLocaleString()} N, about ${Math.round(forceWithout / forceWith)}× less.`} />
    </div>
  )
}

function TransportSafetyIdea() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 px-4 py-3">
      <MisconceptionCard
        wrong="Seatbelts just stop you moving forward in a crash — their main purpose is to keep you in your seat."
        right="Seatbelts increase the time over which your momentum changes, reducing the force on your body (F = Δp/Δt). Longer stopping time → smaller force → less injury."
        wrongLabel="Common misconception"
        rightLabel="Physics of seatbelts"
      />
    </div>
  )
}

function TransportSafetyReality() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 px-4 py-3">
      <RealWorldCard
        icon="🏎️"
        title="Formula 1 survival cells"
        desc="F1 cars crash at 300 km/h and drivers survive. Crumple zones extend impact time from milliseconds to ~0.6 s — reducing force on the driver by up to 6×."
        color={GC}
        delay={0}
      />
      <RealWorldCard
        icon="💨"
        title="Air bags — force spread & time"
        desc="Air bags inflate in 0.03 s and deflate as you hit them, increasing stopping time AND spreading force over a larger area of your body — both reduce peak pressure."
        color="#3b82f6"
        delay={0.1}
      />
      <RealWorldCard
        icon="🚶"
        title="Pedestrian hood air bags"
        desc="Some modern cars (Volvo, Honda) have external air bags that deploy under the bonnet when a pedestrian is struck, cushioning impact and increasing stopping time."
        color="#f97316"
        delay={0.2}
      />
    </div>
  )
}

// ─── Electricity Costs Visuals ───────────────────────────────────────────────

function ElectricityCostsLesson() {
  const [powerKw, setPowerKw] = useState(2)
  const [hours, setHours] = useState(3)
  const [rateP, setRateP] = useState(28)
  const energyKwh = +(powerKw * hours).toFixed(2)
  const costP = +(energyKwh * rateP).toFixed(1)
  const costPounds = (costP / 100).toFixed(2)

  return (
    <div className="w-full h-full flex flex-col justify-start gap-2 px-3 py-2" style={{ background: '#0b1121' }}>
      {/* Formula display */}
      <div className="rounded-[10px] px-3 py-2 font-mono text-center" style={{ background: '#1d293d', border: `1px solid ${GC}30` }}>
        <span style={{ fontSize: 10, color: '#a8b8cc' }}>E (kWh) = </span>
        <span style={{ fontSize: 11, fontWeight: 700, color: GC }}>{powerKw} kW</span>
        <span style={{ fontSize: 10, color: '#a8b8cc' }}> × </span>
        <span style={{ fontSize: 11, fontWeight: 700, color: '#fdc700' }}>{hours} h</span>
        <span style={{ fontSize: 10, color: '#a8b8cc' }}> = </span>
        <motion.span key={energyKwh} style={{ fontSize: 13, fontWeight: 800, color: GC }}
          initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.2 }}>
          {energyKwh} kWh
        </motion.span>
      </div>

      {/* Sliders */}
      <div className="rounded-[12px] px-3 py-2 flex flex-col gap-1.5" style={{ background: '#1d293d' }}>
        <SimSlider label="Power" min={0.1} max={3} step={0.1} value={powerKw} onChange={setPowerKw} unit="kW" color={GC} />
        <SimSlider label="Time" min={1} max={24} step={1} value={hours} onChange={setHours} unit="h" color="#fdc700" />
        <SimSlider label="Unit rate" min={20} max={35} step={1} value={rateP} onChange={setRateP} unit="p/kWh" color="#c084fc" />
      </div>

      {/* Result box */}
      <div className="rounded-[12px] px-3 py-2 flex items-center justify-between" style={{ background: `${GC}15`, border: `1.5px solid ${GC}40` }}>
        <div style={{ fontSize: 10, color: '#a8b8cc' }}>
          Cost = {energyKwh} × {rateP}p
        </div>
        <motion.div key={costP} style={{ fontSize: 18, fontWeight: 800, color: GC, fontFamily: 'monospace' }}
          initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.2 }}>
          {costP}p <span style={{ fontSize: 11, color: '#a8b8cc', fontWeight: 500 }}>(£{costPounds})</span>
        </motion.div>
      </div>
      <SimNarration text={`A ${powerKw} kW appliance running for ${hours} hour${hours !== 1 ? 's' : ''} uses ${energyKwh} kWh of energy. At ${rateP}p per kWh, that costs ${costP}p (£${costPounds}).`} />
    </div>
  )
}

function ElectricityCostsIdea() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 px-4 py-3">
      <MisconceptionCard
        wrong="Electricity is measured in watts — so a bill showing 350 kWh means 350 watts used."
        right="Watts measure POWER (energy per second). Electricity bills measure ENERGY used, in kilowatt-hours (kWh). 1 kWh = 3,600,000 J — it's a unit of energy, not power."
        wrongLabel="Watts vs kilowatt-hours"
        rightLabel="Power × time = energy"
      />
    </div>
  )
}

function ElectricityCostsReality() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 px-4 py-3">
      <RealWorldCard
        icon="📱"
        title="Smart meters — real-time kWh"
        desc="Smart meters display energy used in kWh and cost in real time. The UK government's goal: every home has one by 2026. Understanding kWh means you can read your own meter."
        color={GC}
        delay={0}
      />
      <RealWorldCard
        icon="⚡"
        title="National Grid — high voltage, low loss"
        desc="The Grid transmits at 400,000 V to keep current low. P_loss = I²R — low current means much less energy wasted as heat in cables across hundreds of miles."
        color="#fdc700"
        delay={0.1}
      />
      <RealWorldCard
        icon="💡"
        title="LED vs filament bulbs"
        desc="A 60 W filament vs 9 W LED: same brightness, same 8 h/day. Old bulb: 60×8=480 Wh = 0.48 kWh/day. LED: 9×8=72 Wh = 0.072 kWh/day — 85% less energy, 85% lower bill."
        color="#3b82f6"
        delay={0.2}
      />
    </div>
  )
}

// ─── Radiation and Risk Visuals ─────────────────────────────────────────────

function RadiationRiskLesson() {
  const sources = [
    { label: 'Radon gas', pct: 50, color: '#ef4444' },
    { label: 'Medical', pct: 15, color: '#3b82f6' },
    { label: 'Ground/buildings', pct: 14, color: '#8b5cf6' },
    { label: 'Food & drink', pct: 12, color: GC_RAD },
    { label: 'Cosmic rays', pct: 10, color: '#06b6d4' },
    { label: 'Nuclear industry', pct: 1, color: '#94a3b8' },
  ]
  const barWidth = 200
  return (
    <div className="w-full h-full flex flex-col justify-start gap-2 px-3 py-2" style={{ background: '#0b1121' }}>
      <div style={{ fontSize: 10, color: GC_RAD, fontWeight: 700, textAlign: 'center', letterSpacing: 1 }}>
        UK average background dose: ~2.7 mSv/year
      </div>
      <svg width="100%" viewBox="0 0 260 148" role="img" aria-label="Bar chart of UK background radiation sources: radon 50%, medical 15%, ground/buildings 14%, food and drink 12%, cosmic rays 10%, nuclear industry 1%" style={{ borderRadius: 10, border: `1.5px solid #1d293d`, background: '#0f1829' }}>
        <text x="8" y="14" fill="#a8b8cc" fontSize={7.5} fontWeight="bold">Sources of background radiation in the UK:</text>
        {sources.map((s, i) => {
          const barPx = Math.round((s.pct / 50) * barWidth)
          const y = 22 + i * 20
          return (
            <g key={s.label}>
              <text x="8" y={y + 9} fill="#a8b8cc" fontSize={7.5}>{s.label}</text>
              <rect x="90" y={y} width={barPx} height="12" rx="3" fill={s.color} opacity={0.85} />
              <text x={90 + barPx + 4} y={y + 9} fill={s.color} fontSize={7.5} fontWeight="bold">{s.pct}%</text>
            </g>
          )
        })}
        <text x="130" y="146" textAnchor="middle" fill="#475569" fontSize={6.5}>
          Source: Public Health England / UKHSA
        </text>
      </svg>
    </div>
  )
}

function RadiationRiskIdea() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 px-4 py-3">
      <MisconceptionCard
        wrong="Contamination and irradiation are the same thing — if you are near a radioactive source, you become radioactive."
        right="Irradiation: you are exposed to radiation from an external source, but the source is NOT on or in you — you are not radioactive afterwards. Contamination: radioactive material gets onto or inside your body, making you a source of radiation."
        wrongLabel="Common misconception"
        rightLabel="Contamination vs Irradiation"
      />
    </div>
  )
}

function RadiationRiskReality() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 px-4 py-3">
      <RealWorldCard
        icon="🏥"
        title="Medical X-rays — justified risk"
        desc="A chest X-ray gives ~0.02 mSv — about 2.5 days of background radiation. Doctors use ALARA: as low as reasonably achievable. The benefit (detecting disease) almost always outweighs the tiny risk."
        color={GC_RAD}
        delay={0}
      />
      <RealWorldCard
        icon="🏠"
        title="Radon — the invisible indoor risk"
        desc="Radon seeps from granite rocks. In Cornwall, homes can have 10× the UK average radon level. The fix: underfloor ventilation or a radon sump — simple and cheap, saving lives."
        color="#ef4444"
        delay={0.1}
      />
      <RealWorldCard
        icon="☢️"
        title="Nuclear workers — dose limits"
        desc="UK nuclear workers are limited to 20 mSv/year (averaged over 5 years). They wear film badges or TLDs (thermoluminescent dosimeters) to track cumulative exposure. Compare: a CT scan gives ~10 mSv."
        color="#8b5cf6"
        delay={0.2}
      />
    </div>
  )
}

// ─── Electric Fields Visuals ─────────────────────────────────────────────────

const EF = '#3b82f6'  // blue for electric fields

function ElectricFieldsLesson() {
  const [voltageV, setVoltageV] = useState(200)
  const [sepMm, setSepMm] = useState(10)
  const sepM = sepMm / 1000
  const fieldStrength = Math.round(voltageV / sepM)
  const numLines = Math.min(8, Math.max(3, Math.round(fieldStrength / 10000)))

  return (
    <div className="w-full h-full flex flex-col justify-start gap-2 px-3 py-2" style={{ background: '#0b1121' }}>
      {/* Formula display */}
      <div className="rounded-[10px] px-3 py-2 font-mono text-center" style={{ background: '#1d293d', border: `1px solid ${EF}30` }}>
        <span style={{ fontSize: 10, color: '#a8b8cc' }}>E = V / d = </span>
        <span style={{ fontSize: 11, fontWeight: 700, color: EF }}>{voltageV} V</span>
        <span style={{ fontSize: 10, color: '#a8b8cc' }}> / </span>
        <span style={{ fontSize: 11, fontWeight: 700, color: '#fdc700' }}>{sepMm} mm</span>
        <span style={{ fontSize: 10, color: '#a8b8cc' }}> = </span>
        <motion.span key={fieldStrength} style={{ fontSize: 13, fontWeight: 800, color: EF }}
          initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.2 }}>
          {fieldStrength.toLocaleString()} V/m
        </motion.span>
      </div>

      {/* Sliders */}
      <div className="rounded-[12px] px-3 py-2 flex flex-col gap-1.5" style={{ background: '#1d293d' }}>
        <SimSlider label="Voltage" min={50} max={500} step={10} value={voltageV} onChange={setVoltageV} unit="V" color={EF} />
        <SimSlider label="Plate separation" min={2} max={20} step={1} value={sepMm} onChange={setSepMm} unit="mm" color="#fdc700" />
      </div>

      {/* SVG field diagram */}
      <svg width="100%" viewBox="0 0 260 80" role="img" aria-label={`Uniform electric field diagram: ${numLines} parallel field lines between plates ${sepMm} mm apart at ${voltageV} V`} style={{ borderRadius: 10, border: `1.5px solid #1d293d`, background: '#0f1829' }}>
        {/* Plates */}
        <rect x="10" y="10" width="10" height="60" rx="2" fill="#ef4444" opacity="0.9" />
        <text x="15" y="8" textAnchor="middle" fill="#ef4444" fontSize={7} fontWeight="bold">+</text>
        <rect x="240" y="10" width="10" height="60" rx="2" fill="#3b82f6" opacity="0.9" />
        <text x="245" y="8" textAnchor="middle" fill="#3b82f6" fontSize={7} fontWeight="bold">−</text>

        {/* Field lines */}
        {Array.from({ length: numLines }).map((_, i) => {
          const y = 14 + i * (60 / (numLines - 1 || 1))
          return (
            <g key={i}>
              <line x1="20" y1={y} x2="240" y2={y} stroke={EF} strokeWidth={1} strokeOpacity={0.7} />
              {/* Arrow heads at midpoint */}
              <polygon
                points={`${130},${y - 4} ${138},${y} ${130},${y + 4}`}
                fill={EF} opacity={0.8}
              />
            </g>
          )
        })}

        {/* Labels */}
        <text x="130" y="78" textAnchor="middle" fill="#a8b8cc" fontSize={6.5}>
          Uniform field — parallel lines, equally spaced, perpendicular to plates
        </text>
      </svg>
      <SimNarration text={`Voltage: ${voltageV} V across plates ${sepMm} mm apart. Field strength E = ${voltageV} ÷ ${sepMm / 1000} = ${fieldStrength.toLocaleString()} V/m. ${fieldStrength > 20000 ? 'Strong field — lines are densely packed.' : 'Weaker field — lines are more spread out.'}`} />
    </div>
  )
}

function ElectricFieldsIdea() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 px-4 py-3">
      <MisconceptionCard
        wrong="Electric field strength increases if you put a bigger charge in the field."
        right="E = F/Q — if you double Q, the force F also doubles, so E = F/Q stays the same. The field is a property of the space, not of the test charge placed there. E = V/d: field depends only on voltage and plate separation."
        wrongLabel="Common misconception"
        rightLabel="Field strength is independent of test charge"
      />
    </div>
  )
}

function ElectricFieldsReality() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 px-4 py-3">
      <RealWorldCard
        icon="⚡"
        title="Inkjet printers — electric field deflection"
        desc="Inkjet printers fire tiny charged ink droplets between deflector plates. A uniform electric field between the plates exerts a force F = EQ on each droplet, steering it to the exact position needed on the paper."
        color={EF}
        delay={0}
      />
      <RealWorldCard
        icon="🔬"
        title="Cathode ray tubes — electron steering"
        desc="Old TV screens and oscilloscopes use uniform electric fields between plates to deflect electron beams. The voltage controls the field (E = V/d) and therefore the force on each electron (F = EQ = eV/d)."
        color="#8b5cf6"
        delay={0.1}
      />
      <RealWorldCard
        icon="🌩️"
        title="Lightning — electric field breakdown"
        desc="Air breaks down (conducts) when E exceeds ~3 × 10⁶ V/m. In a thunderstorm, charge separation creates field strengths high enough to ionise air — creating the conducting plasma channel we see as a lightning bolt."
        color="#f59e0b"
        delay={0.2}
      />
    </div>
  )
}

// ─── Topic Data Export ───────────────────────────────────────────────────────

export const GLOBAL_CHALLENGES_TOPICS = {

  transport_safety: {
    id: 'transport_safety',
    module: 'Global Challenges',
    moduleColor: GC,
    course: 'combined',
    boards: ['ocr-a'],
    title: 'Transport Safety',
    subtitle: 'Crumple Zones, Seatbelts & Impact Forces',
    description: 'In a crash, momentum changes rapidly. Force = change in momentum / time (F = Δp/Δt). Crumple zones increase the time of impact, reducing the force on passengers. Seatbelts stretch to increase stopping time. Air bags inflate to spread force over a larger area and increase stopping time. Safety features reduce the rate of change of momentum. Kinetic energy on impact: Eₖ = ½mv². Braking force × braking distance = kinetic energy removed. Thinking distance = speed × reaction time. Braking distance depends on speed² and friction.',
    lessonVisual: TransportSafetyLesson,
    ideaVisual: TransportSafetyIdea,
    realityVisual: TransportSafetyReality,
    question: 'A 70 kg passenger in a crash changes velocity from 20 m/s to 0 m/s in 0.1 s. What is the force on them?',
    questionSubtitle: 'Use F = Δp / Δt = mΔv / Δt',
    options: ['700 N', '14 000 N', '1 400 N', '140 N'],
    correctAnswer: 1,
    keywords: ['momentum', 'crumple zone', 'stopping time', 'impact force', 'seatbelt', 'rate of change of momentum', 'braking distance', 'thinking distance', 'F = Δp/Δt', 'impulse', 'kinetic energy', 'reaction time'],
    sentenceStarters: [
      'Using F = Δp/Δt, I first find Δp = mΔv = ...',
      'Crumple zones increase stopping time, which reduces force because...',
      'The rate of change of momentum equals...',
      'Braking distance depends on speed squared because...',
      'Thinking distance increases if reaction time increases because...',
    ],
    modelAnswers: [
      'Using F = Δp/Δt: Δp = mΔv = **70 × 20 = 1400 kg·m/s**, then F = 1400 / 0.1 = **14 000 N**.',
      'Crumple zones increase stopping time, which reduces force because **F = Δp/Δt — if Δt is larger and Δp stays the same, F must be smaller**.',
      'The rate of change of momentum equals **the resultant force (Newton\'s 2nd Law: F = Δp/Δt)**.',
      'Braking distance depends on speed squared because **KE = ½mv², so doubling speed quadruples the KE that braking must remove**.',
      'Thinking distance increases if reaction time increases because **thinking distance = speed × reaction time — they are directly proportional**.',
    ],
    misconception: 'The force on a passenger depends on HOW FAST momentum changes, not just the size of momentum. A slow stop is safe; an instant stop is lethal — even with the same initial momentum.',
    concept: 'F = Δp/Δt = mΔv/Δt = 70 × 20 / 0.1 = 14 000 N. Crumple zones, seatbelts, and airbags all increase Δt, reducing F. Braking distance ∝ v² because KE = ½mv².',

    // ── 9-STEP LESSON DATA ──────────────────────────────────────────────────

    hook: {
      hookFact: 'In 2015, a Volvo FH truck was crash-tested at 56 km/h. The driver survived because crumple zones extended the impact from 0.1 s to 0.6 s — reducing the force on the driver by 6×. The same momentum change, but spread over 6× longer. Physics literally saved a life.',
      hookQuestion: 'A 70 kg person is travelling at 15 m/s in a car that stops in 0.05 s in a crash. Calculate the force on them. How does a seatbelt change this?',
      hookEmoji: '🚗',
    },

    lessonKeywords: [
      {
        word: 'Momentum',
        symbol: 'p',
        unit: 'kg·m/s',
        definition: 'The product of an object\'s mass and velocity: p = mv.',
        everydayNote: 'A lorry at 10 m/s has much more momentum than a car at 10 m/s — harder to stop.',
      },
      {
        word: 'Crumple Zone',
        symbol: '',
        unit: '',
        definition: 'A region of a vehicle designed to deform in a collision, increasing the time over which momentum changes.',
        everydayNote: 'The front and rear of modern cars are deliberately weak — they sacrifice structure to protect the passenger cell.',
      },
      {
        word: 'Stopping Time',
        symbol: 'Δt',
        unit: 's',
        definition: 'The time taken to go from initial velocity to rest in a collision.',
        everydayNote: 'Longer stopping time = smaller force. This is why falling onto soft grass hurts less than falling onto concrete.',
      },
      {
        word: 'Impact Force',
        symbol: 'F',
        unit: 'N',
        definition: 'The force experienced during a collision: F = Δp / Δt.',
        everydayNote: 'Impact force is what breaks bones — not momentum itself. A slow stop is safe; an instant stop is lethal.',
      },
      {
        word: 'Rate of Change of Momentum',
        symbol: 'Δp/Δt',
        unit: 'N (= kg·m/s²)',
        definition: 'How quickly momentum changes — equal to the resultant force (Newton\'s 2nd Law).',
        everydayNote: 'F = Δp/Δt is just Newton\'s 2nd Law rewritten. F = ma = m(Δv/Δt) = Δ(mv)/Δt = Δp/Δt.',
      },
      {
        word: 'Thinking Distance',
        symbol: '',
        unit: 'm',
        definition: 'Distance travelled during the driver\'s reaction time before braking begins.',
        everydayNote: 'Thinking distance = speed × reaction time. Doubling speed doubles thinking distance.',
      },
      {
        word: 'Braking Distance',
        symbol: '',
        unit: 'm',
        definition: 'Distance travelled while braking after the driver has reacted.',
        everydayNote: 'Braking distance ∝ v². Double your speed, quadruple your braking distance.',
      },
      {
        word: 'Kinetic Energy',
        symbol: 'Eₖ',
        unit: 'J',
        definition: 'Energy of a moving object: Eₖ = ½mv².',
        everydayNote: 'All kinetic energy must be removed by braking. More speed = much more KE to remove.',
      },
    ],

    prerequisiteCheck: {
      questions: [
        {
          question: 'What is the formula for momentum?',
          answers: ['p = mv', 'p = ma', 'p = Ft', 'p = ½mv²'],
          correct: 0,
          feedback: 'Momentum p = mv: mass × velocity. Units are kg·m/s. A large mass or high speed both give large momentum.',
        },
        {
          question: 'What happens to impact force if stopping time increases but the change in momentum stays the same?',
          answers: ['Force decreases', 'Force increases', 'Force stays the same', 'Cannot tell without more information'],
          correct: 0,
          feedback: 'F = Δp/Δt. If Δt increases and Δp is unchanged, F must decrease. This is exactly what crumple zones and seatbelts do.',
        },
      ],
    },

    topicMapHint: {
      before: ['Momentum (p = mv)', "Newton's 2nd Law (F = ma)"],
      current: 'Transport Safety',
      after: ['Car design engineering', 'Road safety statistics'],
    },

    workedExample: {
      title: 'Calculate force on a passenger in a crash — with and without seatbelt',
      equation: 'F = Δp / Δt = m × Δv / Δt',
      context: 'A 60 kg passenger travelling at 20 m/s stops in 0.4 s due to their seatbelt. Find the force on them. Compare to stopping in 0.05 s without a seatbelt.',
      steps: [
        {
          step: 1,
          action: 'Calculate momentum change',
          content: 'Δp = mΔv = 60 × 20 = 1200 kg·m/s',
          annotation: 'Δv = 20 – 0 = 20 m/s. Same for both scenarios — the momentum change is always 1200 kg·m/s.',
        },
        {
          step: 2,
          action: 'Write the equation',
          content: 'F = Δp / Δt',
          annotation: 'This is Newton\'s 2nd Law: the resultant force equals the rate of change of momentum.',
        },
        {
          step: 3,
          action: 'Calculate force with seatbelt',
          content: 'F = 1200 / 0.4 = 3000 N',
          annotation: 'Still a large force, but survivable. The seatbelt stretches to increase Δt.',
        },
        {
          step: 4,
          action: 'Calculate force without seatbelt',
          content: 'F = 1200 / 0.05 = 24 000 N — 8× greater',
          annotation: 'At 24 000 N, this is likely fatal. The same person, same crash speed — but 8× more force because Δt is 8× smaller.',
        },
      ],
      misconceptionAfter: {
        claim: 'The force in a crash only depends on speed — the faster you go, the more force.',
        reality: 'Force = Δp / Δt. Both momentum AND stopping time determine the force. A slow stop from high speed can be safer than a fast stop from moderate speed. That\'s why car safety features focus on extending Δt.',
        visual: 'Jumping onto a hard floor vs a crash mat from the same height: same momentum, but the crash mat multiplies stopping time — force drops dramatically.',
      },
    },

    guidedPractice: {
      tier1: {
        question: 'An 80 kg person is travelling at 15 m/s and stops in 0.3 s. Find the force on them.',
        allSteps: [
          'Write: m = 80 kg, Δv = 15 m/s, Δt = 0.3 s',
          'Find Δp: Δp = mΔv = 80 × 15 = 1200 kg·m/s',
          'Equation: F = Δp / Δt',
          '??? — substitute and calculate F',
        ],
        missingStep: 3,
        missingHint: 'F = 1200 / 0.3 = ?',
        answer: 4000,
        answerUnit: 'N',
      },
      tier2: {
        question: 'A 1200 kg car is travelling at 25 m/s. (a) Find its momentum. (b) If it stops in 2.5 s, find the braking force.',
        shownEquation: 'p = mv   then   F = Δp / Δt',
        shownStep1: 'p = 1200 × 25 = 30 000 kg·m/s',
        hint: 'F = 30 000 / 2.5',
        answer: 12000,
        answerUnit: 'N',
      },
      tier3: {
        question: 'A 75 kg cyclist stops from 12 m/s. Without helmet foam: Δt = 0.008 s. With helmet foam: Δt = 0.06 s. Find both forces and calculate the % reduction in force.',
        hint: 'Find Δp first. Then F = Δp/Δt for each. % reduction = (F_without – F_with) / F_without × 100.',
        methodHint: 'Δp = 75 × 12 = 900 kg·m/s. F_without = 900/0.008 = 112 500 N. F_with = 900/0.06 = 15 000 N.',
        answer: 87,
        answerUnit: '% reduction',
      },
    },

    summary: {
      equation: 'F = Δp / Δt = m × Δv / Δt',
      sentence: 'Increasing stopping time decreases impact force — this is the physics behind crumple zones, seatbelts, and air bags.',
      promptText: 'Without looking: state F = Δp/Δt in words. Name three safety features and explain how each increases stopping time.',
    },

    sessionRecap: [
      'F = Δp/Δt = mΔv/Δt. The force in a crash depends on momentum change AND stopping time. Same momentum change over a longer time = much smaller force.',
      'Crumple zones, seatbelts, and airbags all increase stopping time (Δt), reducing peak force (F) on passengers. This is why cars are deliberately designed to deform.',
      'Braking distance ∝ v² (because Eₖ = ½mv²). Thinking distance ∝ v (= speed × reaction time). Doubling speed quadruples braking distance but only doubles thinking distance.',
    ],
  },

  electricity_costs: {
    id: 'electricity_costs',
    module: 'Global Challenges',
    moduleColor: GC,
    course: 'combined',
    boards: ['ocr-a'],
    title: 'Electricity Costs',
    subtitle: 'Energy, kWh, Meter Readings & Bills',
    description: 'Electrical energy transferred: E = P × t (where E is in joules if t is in seconds, or kWh if t is in hours and P is in kW). 1 kWh = 3 600 000 J = 3.6 MJ. Cost of electricity: cost = energy (kWh) × unit rate (pence per kWh). Reading meters: subtract previous reading from current reading to find units used. The National Grid transmits electricity at high voltage (low current) to reduce energy wasted as heat in transmission lines (P = I²R).',
    lessonVisual: ElectricityCostsLesson,
    ideaVisual: ElectricityCostsIdea,
    realityVisual: ElectricityCostsReality,
    question: 'A 2 kW washing machine runs for 1.5 hours. At 28p per kWh, what is the cost?',
    questionSubtitle: 'First find energy: E = P × t',
    options: ['56p', '84p', '42p', '28p'],
    correctAnswer: 1,
    keywords: ['kilowatt-hour', 'kWh', 'unit rate', 'meter reading', 'power', 'energy', 'National Grid', 'transmission', 'E = Pt', 'cost = E × rate', '1 kWh = 3.6 MJ'],
    sentenceStarters: [
      'Using E = P × t, the energy used is ...',
      'Cost = energy × unit rate = ...',
      'To read a meter, I subtract the previous reading from...',
      'The National Grid uses high voltage to reduce...',
      '1 kWh = 3,600,000 J because...',
    ],
    modelAnswers: [
      'Using E = P × t: E = **2 kW × 1.5 h = 3 kWh**. Cost = 3 × 28 = **84p**.',
      'Cost = energy × unit rate = **3 kWh × 28p/kWh = 84p = £0.84**.',
      'To read a meter, I subtract the previous reading from **the current reading — the difference is the units (kWh) used in that period**.',
      'The National Grid uses high voltage to reduce **current, because power lost = I²R — lower current means much less energy wasted as heat in transmission cables**.',
      '1 kWh = 3,600,000 J because **1 kW = 1000 W = 1000 J/s, and 1 hour = 3600 s, so 1000 × 3600 = 3,600,000 J**.',
    ],
    misconception: 'kWh is NOT "kilowatts per hour" — it is kilowatts MULTIPLIED BY hours. It is a unit of energy (like joules), not a rate of energy use.',
    concept: 'E = 2 × 1.5 = 3 kWh. Cost = 3 × 28 = 84p. The National Grid uses step-up transformers to increase voltage (step-down current), reducing I²R losses in cables. 1 kWh = 3.6 MJ.',

    // ── 9-STEP LESSON DATA ──────────────────────────────────────────────────

    hook: {
      hookFact: 'The average UK household uses about 3,100 kWh of electricity per year. At 28p per kWh, that is £868 per year — or £2.38 per day. A single electric shower (10 kW) used for 8 minutes costs about 37p. Understanding kWh can save you hundreds of pounds a year.',
      hookQuestion: 'Your phone charger uses 5 W. If you leave it plugged in (but not charging) for 24 hours, how much does it cost? Assume 28p per kWh. Can you work it out?',
      hookEmoji: '⚡',
    },

    lessonKeywords: [
      {
        word: 'Kilowatt-hour',
        symbol: 'kWh',
        unit: 'kWh (= 3.6 MJ)',
        definition: 'A unit of energy equal to using 1 kilowatt of power for 1 hour. 1 kWh = 3,600,000 J.',
        everydayNote: 'Your electricity bill charges per kWh. It\'s not a rate — it\'s a quantity of energy.',
      },
      {
        word: 'Unit Rate',
        symbol: '',
        unit: 'p/kWh',
        definition: 'The price charged for each kilowatt-hour of electrical energy used, in pence per kWh.',
        everydayNote: 'Typical UK rate is 24–35 p/kWh. This changes with energy tariffs and wholesale prices.',
      },
      {
        word: 'Meter Reading',
        symbol: '',
        unit: 'kWh',
        definition: 'The cumulative total energy used, displayed on a domestic electricity meter.',
        everydayNote: 'Energy used = current reading – previous reading. The difference tells you kWh consumed.',
      },
      {
        word: 'Power',
        symbol: 'P',
        unit: 'W or kW',
        definition: 'The rate of energy transfer. P = E/t. 1 kW = 1000 W.',
        everydayNote: 'A kettle is typically 2–3 kW; a phone charger is ~5 W (= 0.005 kW).',
      },
      {
        word: 'National Grid',
        symbol: '',
        unit: '',
        definition: 'The network of pylons, cables, and transformers that transmits electrical energy from power stations to homes and industry across the UK.',
        everydayNote: 'The Grid transmits at up to 400,000 V (400 kV) to keep current — and therefore heat loss — low.',
      },
      {
        word: 'Transmission Loss',
        symbol: 'P_loss',
        unit: 'W',
        definition: 'Energy wasted as heat in transmission cables: P_loss = I²R.',
        everydayNote: 'High voltage → low current → I²R loss is tiny. This is why the Grid uses transformers to step voltage up before long-distance transmission.',
      },
    ],

    prerequisiteCheck: {
      questions: [
        {
          question: '1 kW is equal to how many watts?',
          answers: ['1000 W', '100 W', '10 W', '10 000 W'],
          correct: 0,
          feedback: '1 kilowatt = 1000 watts. The "kilo" prefix always means ×1000. A typical kettle uses 2–3 kW = 2000–3000 W.',
        },
        {
          question: 'A 2 kW heater runs for 3 hours. How many kWh of energy does it use?',
          answers: ['6 kWh', '5 kWh', '2 kWh', '1.5 kWh'],
          correct: 0,
          feedback: 'E = P × t = 2 kW × 3 h = 6 kWh. Multiply power in kilowatts by time in hours to get energy in kilowatt-hours.',
        },
      ],
    },

    topicMapHint: {
      before: ['Electrical power (P = IV)', 'Energy and power (P = E/t)'],
      current: 'Electricity Costs',
      after: ['National Grid', 'Renewable energy economics'],
    },

    workedExample: {
      title: 'Calculate the cost of running a washing machine',
      equation: 'E (kWh) = P (kW) × t (h)     cost = E × unit rate',
      context: 'A 2 kW washing machine runs for 1.5 hours. The unit rate is 28p/kWh. Find the cost of one wash.',
      steps: [
        {
          step: 1,
          action: 'Check the power is in kW',
          content: 'P = 2 kW (already in kW — no conversion needed)',
          annotation: 'If given in watts, divide by 1000 first. 2000 W ÷ 1000 = 2 kW.',
        },
        {
          step: 2,
          action: 'Calculate energy in kWh',
          content: 'E = P × t = 2 × 1.5 = 3 kWh',
          annotation: 'Multiply power (kW) by time (hours). If you use seconds, you get joules — not kWh.',
        },
        {
          step: 3,
          action: 'Calculate cost',
          content: 'cost = E × unit rate = 3 × 28 = 84p',
          annotation: 'Units: kWh × p/kWh = p. The kWh cancels, leaving pence.',
        },
        {
          step: 4,
          action: 'Sense check',
          content: '84p = £0.84 ✓ — reasonable for one wash cycle',
          annotation: '3 kWh is about a typical wash. At 28p/kWh, 84p is a realistic energy cost.',
        },
      ],
      misconceptionAfter: {
        claim: 'A 100 W lightbulb left on for 10 hours uses 1000 kWh of electricity.',
        reality: '100 W = 0.1 kW. E = 0.1 kW × 10 h = 1 kWh — not 1000. Convert to kW first. 1000 kWh would cost £280 and would power a house for weeks.',
        visual: 'Think of it in steps: watts → divide by 1000 → kilowatts → multiply by hours → kilowatt-hours.',
      },
    },

    guidedPractice: {
      tier1: {
        question: 'A 0.5 kW TV is used for 4 hours. At 28p/kWh, what is the cost?',
        allSteps: [
          'Write: P = 0.5 kW, t = 4 h',
          'Calculate energy: E = 0.5 × 4 = 2 kWh',
          'Cost = E × unit rate = 2 × 28',
          '??? — calculate the cost',
        ],
        missingStep: 3,
        missingHint: '2 × 28 = ? pence',
        answer: 56,
        answerUnit: 'p',
      },
      tier2: {
        question: 'A meter reads 14 523 kWh on 1 March, and 14 561 kWh on 1 April. At 30p/kWh, what is the bill for March?',
        shownEquation: 'Units used = current – previous    cost = units × rate',
        shownStep1: 'Units used = 14 561 – 14 523 = 38 kWh',
        hint: 'Cost = 38 × 30p',
        answer: 1140,
        answerUnit: 'p (= £11.40)',
      },
      tier3: {
        question: 'Compare the daily cost of a 60 W filament bulb vs a 9 W LED, both used 8 h/day at 28p/kWh. Show all working and find the daily saving.',
        hint: 'Convert watts to kW first (÷1000). Then E = P × t for each. Cost = E × 28.',
        methodHint: 'Filament: 0.06 kW × 8 h = 0.48 kWh × 28p = 13.4p/day. LED: 0.009 kW × 8 h = 0.072 kWh × 28p = 2.0p/day.',
        answer: 11,
        answerUnit: 'p saving per day (≈ £40/year)',
      },
    },

    summary: {
      equation: 'E (kWh) = P (kW) × t (h)     cost = E (kWh) × unit rate (p/kWh)',
      sentence: 'Energy in kWh = power in kW multiplied by time in hours. Cost = energy × unit rate.',
      promptText: 'Without looking: write the formula for energy in kWh. Name one example of how the National Grid reduces energy loss in transmission.',
    },

    sessionRecap: [
      'E (kWh) = P (kW) × t (h). Always convert watts to kilowatts (÷1000) and minutes to hours (÷60) before using this formula. 1 kWh = 3,600,000 J = 3.6 MJ.',
      'Cost = energy (kWh) × unit rate (p/kWh). To find units used from a meter, subtract previous reading from current reading.',
      'The National Grid transmits at high voltage to keep current low. Power loss = I²R — reducing current 10× reduces I²R losses 100×. This is why step-up transformers are used before long-distance transmission.',
    ],
  },

  radiation_risk: {
    id: 'radiation_risk',
    module: 'Global Challenges',
    moduleColor: GC_RAD,
    course: 'combined',
    boards: ['ocr-a'],
    title: 'Radiation and Risk',
    subtitle: 'Background Radiation, Dose & Contamination',
    description: 'Ionising radiation has enough energy to remove electrons from atoms, creating ions. Background radiation is always present — in the UK it averages ~2.7 mSv/year from radon gas (50%), medical procedures (15%), ground/buildings (14%), food/drink (12%), cosmic rays (10%), and the nuclear industry (<1%). Risk = probability × consequence. Radiation dose is measured in sieverts (Sv) or millisieverts (mSv). Irradiation is exposure from an external source — you are not radioactive afterwards. Contamination is when radioactive material gets onto or inside the body — the person becomes a source. The ALARA principle (As Low As Reasonably Achievable) governs medical and industrial use of radiation.',
    lessonVisual: RadiationRiskLesson,
    ideaVisual: RadiationRiskIdea,
    realityVisual: RadiationRiskReality,
    question: 'A patient receives a chest X-ray (0.02 mSv) and a CT scan (7 mSv). How many times greater is the CT scan dose compared to the X-ray?',
    questionSubtitle: 'Divide the larger dose by the smaller dose',
    options: ['35×', '350×', '7×', '140×'],
    correctAnswer: 1,
    keywords: ['ionising radiation', 'background radiation', 'radon', 'dose', 'millisievert', 'mSv', 'risk', 'contamination', 'irradiation', 'ALARA', 'justification', 'optimisation', 'dose limits'],
    sentenceStarters: [
      'Background radiation comes from sources including...',
      'The difference between contamination and irradiation is...',
      'Risk is calculated as probability × ...',
      'The ALARA principle means that radiation dose should be...',
      'Radon is the largest source of background radiation in the UK because...',
    ],
    modelAnswers: [
      'Background radiation comes from sources including **radon gas (50%), medical procedures (15%), gamma rays from ground and buildings (14%), food and drink (12%), and cosmic rays (10%)**.',
      'The difference between contamination and irradiation is **that contamination means radioactive material is on or inside the body (making you a source), whereas irradiation is exposure from an external source — you are not radioactive afterwards**.',
      'Risk is calculated as probability × **consequence (severity of harm)**.',
      'The ALARA principle means that radiation dose should be **kept as low as reasonably achievable — balancing benefits against risks using shielding, distance, and minimising exposure time**.',
      'Radon is the largest source of background radiation in the UK because **it seeps naturally from granite and other rocks in the ground, accumulates in buildings, and is inhaled**.',
    ],
    misconception: 'Irradiation does NOT make you radioactive. A patient who has an X-ray or radiotherapy is irradiated (exposed to radiation), but the source is external — they do not become radioactive. Contamination is different: that is when radioactive material is physically on or in the body.',
    concept: 'Average UK dose: ~2.7 mSv/year. Radon = 50% of background. Irradiation ≠ contamination. Risk = probability × consequence. ALARA principle. Dose limits: 20 mSv/year for nuclear workers, 1 mSv/year for public (above background).',

    // ── 9-STEP LESSON DATA ──────────────────────────────────────────────────

    hook: {
      hookFact: 'Every year, the average UK person receives ~2.7 mSv of radiation from natural and artificial sources — mainly radon gas seeping up from the ground. A single CT scan of the chest gives about 7 mSv. Yet CT scans save thousands of lives a year. The same radiation that can cause cancer can also detect it early enough to cure it.',
      hookQuestion: 'A hospital radiographer performs X-rays every day. Should they be worried about radiation exposure? What factors would you consider when deciding if the risk is acceptable?',
      hookEmoji: '☢️',
    },

    lessonKeywords: [
      {
        word: 'Ionising Radiation',
        symbol: '',
        unit: '',
        definition: 'Radiation with enough energy to remove electrons from atoms, creating ions that can damage living cells.',
        everydayNote: 'Alpha, beta, and gamma radiation are all ionising. UV light is borderline ionising. Visible light and radio waves are non-ionising.',
      },
      {
        word: 'Background Radiation',
        symbol: '',
        unit: 'mSv/year',
        definition: 'The low-level ionising radiation always present in the environment from natural and artificial sources.',
        everydayNote: 'UK average is ~2.7 mSv/year. You cannot avoid background radiation — it comes from the ground, air, food, and even space.',
      },
      {
        word: 'Radon',
        symbol: 'Rn-222',
        unit: '',
        definition: 'A naturally occurring radioactive gas produced by the decay of uranium in rocks and soil. It seeps into buildings and is inhaled.',
        everydayNote: 'Radon is colourless, odourless, and tasteless. It is the largest single source of background radiation exposure in the UK, contributing about 50% of the average annual dose.',
      },
      {
        word: 'Dose',
        symbol: 'H',
        unit: 'Sv or mSv',
        definition: 'The amount of radiation energy absorbed by body tissue, weighted by radiation type and tissue sensitivity. Measured in sieverts (Sv).',
        everydayNote: '1 mSv = 0.001 Sv. Typical medical doses: X-ray ~0.02 mSv, CT scan ~7–10 mSv. Radiation sickness begins above ~1000 mSv (1 Sv).',
      },
      {
        word: 'Risk',
        symbol: '',
        unit: '',
        definition: 'The probability of harm occurring, multiplied by the severity of that harm.',
        everydayNote: 'Risk assessment always weighs benefits against risks. A CT scan has a small increased cancer risk, but detecting a tumour early saves life.',
      },
      {
        word: 'Irradiation',
        symbol: '',
        unit: '',
        definition: 'Exposure to radiation from an external source. The exposed person does not become radioactive.',
        everydayNote: 'A patient receiving an X-ray is irradiated. When they leave the room, there is no ongoing risk to others — they are not a radioactive source.',
      },
      {
        word: 'Contamination',
        symbol: '',
        unit: '',
        definition: 'When radioactive material is deposited on the skin or inside the body, making the person a source of radiation.',
        everydayNote: 'Contamination is more dangerous than irradiation because the source stays with you, continuing to irradiate your tissues. Nuclear workers wear full protective suits to avoid contamination.',
      },
      {
        word: 'ALARA',
        symbol: '',
        unit: '',
        definition: 'As Low As Reasonably Achievable — the principle that radiation exposure should be minimised as far as practical, balancing cost and benefit.',
        everydayNote: 'ALARA is used by hospitals, nuclear plants, and radiographers to keep doses as small as possible while still getting the clinical benefit.',
      },
    ],

    prerequisiteCheck: {
      questions: [
        {
          question: 'Which type of radiation has the highest ionising power?',
          answers: ['Alpha', 'Beta', 'Gamma', 'X-ray'],
          correct: 0,
          feedback: 'Alpha particles are the most strongly ionising — they are large (2 protons + 2 neutrons) and slow-moving, so they interact intensely with matter. They are stopped by a few cm of air or a sheet of paper.',
        },
        {
          question: 'What does "background radiation" mean?',
          answers: [
            'Radiation that is always present in the environment',
            'Radiation produced only in nuclear power stations',
            'Radiation from medical X-rays',
            'Radiation absorbed by lead shielding',
          ],
          correct: 0,
          feedback: 'Background radiation is always present — from rocks, air, food, cosmic rays, and some artificial sources. It existed long before nuclear power stations.',
        },
      ],
    },

    topicMapHint: {
      before: ['Radioactive decay (alpha, beta, gamma)', 'Half-life'],
      current: 'Radiation and Risk',
      after: ['Nuclear fission and fusion', 'Uses of radiation (medical, industrial)'],
    },

    workedExample: {
      title: 'Compare radiation doses and evaluate risk vs benefit',
      equation: 'Risk = probability × consequence     Dose comparison: ratio = larger dose / smaller dose',
      context: 'A 45-year-old patient needs a chest X-ray (0.02 mSv) or a CT chest scan (7 mSv). The CT is better at detecting early-stage lung cancer. Evaluate which should be used.',
      steps: [
        {
          step: 1,
          action: 'Calculate the dose ratio',
          content: 'CT dose / X-ray dose = 7 / 0.02 = 350×',
          annotation: 'The CT gives 350 times more radiation than the X-ray — a significantly higher dose.',
        },
        {
          step: 2,
          action: 'Identify the risks',
          content: 'Additional cancer risk from 7 mSv ≈ 1 in 2000',
          annotation: 'As a rough rule, 10 mSv adds ~1 in 1000 lifetime cancer risk. So 7 mSv ≈ 1 in 1400–2000.',
        },
        {
          step: 3,
          action: 'Identify the benefits',
          content: 'CT detects early-stage cancer with ~90% 5-year survival. Missed detection: ~15% 5-year survival.',
          annotation: 'The benefit (catching cancer early) is enormous compared to the small additional risk from the scan.',
        },
        {
          step: 4,
          action: 'Apply ALARA and make a justified decision',
          content: 'Use CT. Justify: benefit greatly outweighs risk. Apply ALARA: use lowest dose CT protocol available.',
          annotation: 'ALARA does not mean "use as little as possible regardless of benefit" — it means minimise dose while still getting the diagnostic information needed.',
        },
      ],
      misconceptionAfter: {
        claim: 'Any exposure to radiation is dangerous and should always be avoided.',
        reality: 'All radiation exposure carries some risk, but many medical uses of radiation have enormous benefits that far outweigh the risk. Background radiation (which we cannot avoid) is ~2.7 mSv/year. A CT scan is ~7 mSv — equivalent to a few years of background radiation.',
        visual: 'Think of crossing the road: there is always a risk, but the benefit of getting to the other side justifies taking the (small) risk. Radiation risk is similar — it must be justified and minimised, not simply avoided.',
      },
    },

    guidedPractice: {
      tier1: {
        question: 'A person receives 0.02 mSv from a chest X-ray. The UK average annual background dose is 2.7 mSv. How many chest X-rays would equal one year of background radiation?',
        allSteps: [
          'Write: background = 2.7 mSv, X-ray = 0.02 mSv',
          'Divide: number = 2.7 ÷ 0.02',
          '??? — calculate the number of X-rays',
        ],
        missingStep: 2,
        missingHint: '2.7 ÷ 0.02 = ?',
        answer: 135,
        answerUnit: 'X-rays',
      },
      tier2: {
        question: 'A nuclear power station worker receives 8 mSv in their first year. The legal limit is 20 mSv/year. By how many mSv are they under the limit? As a percentage of the limit, what is their dose?',
        shownEquation: 'Margin = limit – dose     Percentage = (dose / limit) × 100',
        shownStep1: 'Margin = 20 – 8 = 12 mSv under the limit',
        hint: 'Percentage = (8 / 20) × 100 = ?',
        answer: 40,
        answerUnit: '% of the annual limit',
      },
      tier3: {
        question: 'A student claims: "A radiographer who takes X-rays all day must be radioactive." Explain why this is wrong, using the terms irradiation and contamination correctly. Then explain what safety measures a radiographer uses and why.',
        hint: 'Define irradiation vs contamination. X-rays are external beams — they do not make the person radioactive. Safety measures: lead apron, distance, leaving the room.',
        methodHint: 'Irradiation = external exposure, does not make you radioactive. Contamination = radioactive material on/in body. A radiographer is irradiated by scattered X-rays, not contaminated.',
        answer: 0,
        answerUnit: 'extended answer — see mark scheme',
      },
    },

    summary: {
      equation: 'Risk = probability × consequence     Dose ratio = larger dose ÷ smaller dose',
      sentence: 'Background radiation is always present. Irradiation (external exposure) does not make you radioactive. Contamination (radioactive material on/in body) does. Dose is measured in mSv. ALARA: minimise dose while achieving the benefit.',
      promptText: 'Without looking: name 3 sources of background radiation. Explain the difference between contamination and irradiation. State what ALARA stands for.',
    },

    sessionRecap: [
      'Background radiation in the UK averages ~2.7 mSv/year. The biggest source is radon gas (50%) — a naturally occurring radioactive gas that seeps from rocks, especially granite. Regional variation is significant.',
      'Irradiation = exposure from an external source; you do not become radioactive. Contamination = radioactive material on or in the body; you become a source. Contamination is more dangerous because the source stays with you.',
      'Risk = probability × consequence. ALARA (As Low As Reasonably Achievable) governs all medical and industrial use of radiation. Dose limits: 20 mSv/year for nuclear workers, 1 mSv/year for the public above background.',
    ],
  },

  electric_fields: {
    id: 'electric_fields',
    module: 'Global Challenges',
    moduleColor: EF,
    course: 'physics_only',
    boards: ['ocr-a'],
    title: 'Electric Fields',
    subtitle: 'E = F/Q, E = V/d & Uniform Fields',
    description: 'An electric field is a region where a charged object experiences a force. Electric field strength E = F/Q (force per unit charge, N/C). For a uniform field between parallel plates: E = V/d (potential difference ÷ plate separation, V/m). N/C and V/m are equivalent units. Field lines in a uniform field are parallel, equally spaced, and perpendicular to the plates. Doubling V doubles E. Halving d doubles E (for constant V). Force on a charge in a field: F = EQ.',
    lessonVisual: ElectricFieldsLesson,
    ideaVisual: ElectricFieldsIdea,
    realityVisual: ElectricFieldsReality,
    question: 'Two parallel plates are 4 mm apart with a potential difference of 200 V. What is the electric field strength between them?',
    questionSubtitle: 'Use E = V/d — remember to convert mm to m',
    options: ['800 V/m', '50 000 V/m', '0.02 V/m', '5000 V/m'],
    correctAnswer: 1,
    keywords: ['electric field', 'field strength', 'E = F/Q', 'E = V/d', 'uniform field', 'field lines', 'parallel plates', 'N/C', 'V/m', 'potential difference', 'force on charge'],
    sentenceStarters: [
      'Electric field strength is defined as...',
      'In a uniform field between parallel plates, E = V/d means...',
      'Field lines in a uniform field are...',
      'If the plate separation is halved while V stays constant...',
      'The force on a charge Q in a field E is...',
    ],
    modelAnswers: [
      'Electric field strength is defined as **the force per unit charge: E = F/Q, measured in N/C (or V/m)**.',
      'In a uniform field between parallel plates, E = V/d means **the field strength equals the potential difference divided by the plate separation — larger V or smaller d both increase E**.',
      'Field lines in a uniform field are **parallel, equally spaced, and perpendicular to the surface of the plates — this shows the field is the same strength throughout**.',
      'If the plate separation is halved while V stays constant, **E = V/(d/2) = 2V/d — the field strength doubles, so the force on any charge in the field also doubles**.',
      'The force on a charge Q in a field E is **F = EQ (rearranging E = F/Q). Double the charge → double the force; double the field → double the force**.',
    ],
    misconception: 'E = V/d: 4 mm = 0.004 m. E = 200 / 0.004 = 50 000 V/m. Common error: forgetting to convert mm → m. The answer in mm would be 200/4 = 50 — off by a factor of 1000.',
    concept: 'E = V/d = 200/0.004 = 50 000 V/m. N/C ≡ V/m. F = EQ. Uniform field: parallel, equally-spaced field lines perpendicular to the plates. E ∝ V (constant d); E ∝ 1/d (constant V).',

    // ── 9-STEP LESSON DATA ──────────────────────────────────────────────────

    hook: {
      hookFact: 'An inkjet printer fires ink droplets at 10 metres per second through a tiny uniform electric field. The field — created by just a few hundred volts across a 1 mm gap (E = 300 000 V/m) — deflects each droplet by fractions of a millimetre, building up an image dot by dot at 600 dots per inch. The same physics steered electrons in every TV screen made before 2000.',
      hookQuestion: 'Two plates are 2 mm apart and connected to a 100 V battery. A charge of 5 × 10⁻⁹ C sits between them. Can you find the field strength and the force on the charge? What two equations do you need?',
      hookEmoji: '⚡',
    },

    lessonKeywords: [
      {
        word: 'Electric Field',
        symbol: 'E',
        unit: 'N/C or V/m',
        definition: 'A region of space in which a charged particle experiences a force.',
        everydayNote: 'Any charged object — like a proton or electron — in an electric field experiences a push or pull. The field tells you how strong that push is per unit of charge.',
      },
      {
        word: 'Electric Field Strength',
        symbol: 'E',
        unit: 'N/C (= V/m)',
        definition: 'The force experienced per unit positive charge at a point in a field: E = F/Q.',
        everydayNote: 'E is a property of the field at a point in space — not of the test charge. Doubling the charge doubles the force, but E stays the same.',
      },
      {
        word: 'Uniform Electric Field',
        symbol: '',
        unit: '',
        definition: 'A field with the same strength and direction at every point — created between two parallel charged plates.',
        everydayNote: 'Field lines are parallel, equally spaced, perpendicular to the plates. The field is identical anywhere between the plates (ignoring edge effects).',
      },
      {
        word: 'Potential Difference',
        symbol: 'V',
        unit: 'V (volts)',
        definition: 'The work done moving one coulomb of charge between two points. Between parallel plates: V = E × d.',
        everydayNote: 'A 200 V battery connected to plates maintains 200 V between them. That voltage divided by the separation gives the field strength.',
      },
      {
        word: 'Plate Separation',
        symbol: 'd',
        unit: 'm',
        definition: 'The distance between the two parallel plates in a uniform field arrangement.',
        everydayNote: 'E = V/d — halve the separation, double the field strength (for the same voltage). Always convert mm to m before calculating.',
      },
      {
        word: 'Field Lines',
        symbol: '',
        unit: '',
        definition: 'Lines drawn to represent the direction and relative strength of an electric field. Arrows point from + to −.',
        everydayNote: 'In a uniform field, lines are parallel and equally spaced — they never cross. Where lines are closer together, the field is stronger.',
      },
    ],

    prerequisiteCheck: {
      questions: [
        {
          question: 'What is the formula for electric field strength?',
          answers: ['E = F/Q', 'E = mv²', 'E = QV', 'E = P/t'],
          correct: 0,
          feedback: 'E = F/Q — force (N) divided by charge (C). The unit is N/C, which is the same as V/m. Electric field strength is the force on each coulomb of charge at that point.',
        },
        {
          question: 'Two plates are 10 mm apart with 500 V across them. What is the electric field strength?',
          answers: ['50 000 V/m', '5 V/m', '500 V/m', '5000 V/m'],
          correct: 0,
          feedback: 'E = V/d = 500 / 0.01 = 50 000 V/m. Convert mm to m first: 10 mm = 0.010 m. This is the most common error in electric field calculations.',
        },
      ],
    },

    topicMapHint: {
      before: ['Potential difference (V = W/Q)', 'Force (F = ma)'],
      current: 'Electric Fields',
      after: ['Particle accelerators', 'Cathode ray tubes', 'Capacitors'],
    },

    workedExample: {
      title: 'Find E using E = V/d, then force using F = EQ',
      equation: 'E = V / d     F = E × Q',
      context: 'Two parallel plates are separated by 8 mm. The potential difference between them is 400 V. A charge of 3 × 10⁻⁶ C is placed between the plates. Find (a) the electric field strength, (b) the force on the charge.',
      steps: [
        {
          step: 1,
          action: 'Convert separation to metres',
          content: 'd = 8 mm = 8 × 10⁻³ m = 0.008 m',
          annotation: 'Always convert mm → m before substituting. Missing this step gives an answer 1000× too large.',
        },
        {
          step: 2,
          action: 'Calculate field strength',
          content: 'E = V / d = 400 / 0.008 = 50 000 V/m',
          annotation: 'Units: V/m (volts per metre) — identical to N/C. The field is uniform everywhere between the plates.',
        },
        {
          step: 3,
          action: 'Calculate force on the charge',
          content: 'F = E × Q = 50 000 × 3 × 10⁻⁶ = 0.15 N',
          annotation: 'Rearranging E = F/Q gives F = EQ. Units: (V/m) × C = (N/C) × C = N. ✓',
        },
        {
          step: 4,
          action: 'Sense-check direction',
          content: 'Force acts from + plate toward − plate (for a positive charge)',
          annotation: 'Field lines point from + to −. A positive charge feels a force in the direction of the field lines. A negative charge feels a force in the opposite direction.',
        },
      ],
      misconceptionAfter: {
        claim: 'If I put a larger charge between the plates, the field strength increases.',
        reality: 'E = V/d — field strength depends only on the voltage and the plate separation, not on the charge placed there. Larger charge → larger force (F = EQ), but E is unchanged. The field is a property of the plates and the voltage, not of the test charge.',
        visual: 'Think of a river current: doubling the size of a boat does not speed up the river. The current (field) is independent of the object in it. A bigger boat experiences more force — but the current itself is unchanged.',
      },
    },

    guidedPractice: {
      tier1: {
        question: 'Two plates are 5 mm apart with 100 V across them. Calculate the electric field strength.',
        allSteps: [
          'Convert separation: 5 mm = 0.005 m',
          'Write equation: E = V / d',
          'Substitute: E = 100 / 0.005',
          '??? — calculate E',
        ],
        missingStep: 3,
        missingHint: '100 / 0.005 = ?',
        answer: 20000,
        answerUnit: 'V/m',
      },
      tier2: {
        question: 'The electric field strength between two plates is 40 000 V/m. A charge of 2 × 10⁻⁶ C is placed between them. (a) Find the force on the charge. (b) If the charge is doubled, what happens to E and F?',
        shownEquation: 'F = E × Q',
        shownStep1: 'F = 40 000 × 2 × 10⁻⁶ = 0.08 N',
        hint: 'For (b): E is unchanged (it depends on V and d, not Q). F = EQ — double Q → double F.',
        answer: 0.16,
        answerUnit: 'N (when Q doubled)',
      },
      tier3: {
        question: 'Plates are 6 mm apart at 300 V. (a) Find E. (b) The separation is reduced to 3 mm while V stays at 300 V. Find the new E. (c) A charge of 4 × 10⁻⁶ C is placed between the plates at 3 mm separation. Find the force on it.',
        hint: '(a) E = V/d = 300/0.006. (b) New d = 0.003 m → E = 300/0.003. (c) F = E × Q.',
        methodHint: '(a) 50 000 V/m. (b) 100 000 V/m — halving d doubles E. (c) F = 100 000 × 4×10⁻⁶ = 0.4 N.',
        answer: 0.4,
        answerUnit: 'N',
      },
    },

    summary: {
      equation: 'E = F/Q = V/d     F = EQ     Units: N/C ≡ V/m',
      sentence: 'Electric field strength is force per unit charge (E = F/Q). Between parallel plates, E = V/d. Halving separation or doubling voltage both double the field strength.',
      promptText: 'Without looking: write E = F/Q and E = V/d. State two ways to increase the field strength between parallel plates. Describe what the field lines look like in a uniform field.',
    },

    sessionRecap: [
      'E = F/Q: electric field strength = force per unit charge. Units are N/C or V/m (identical). Field strength is a property of the space — not of the test charge. Larger charge → larger force, but same E.',
      'E = V/d for a uniform field between parallel plates. Always convert mm → m for d. Increase V or decrease d → stronger field. Field lines are parallel, equally spaced, perpendicular to the plates.',
      'F = EQ: the force on a charge Q in field E. Combining: F = (V/d) × Q. Doubling Q doubles F. Halving d doubles E, so also doubles F. This is how inkjet printers, CRT screens, and particle accelerators steer charged particles.',
    ],
  },
}
