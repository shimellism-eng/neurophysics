import { motion } from 'motion/react'
import { useState } from 'react'
import { Car, Zap, TrendingDown, DollarSign } from 'lucide-react'
import { MisconceptionCard, RealWorldCard, FormulaBox } from './visuals-helpers'

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
      {/* Speed slider */}
      <div className="flex items-center gap-2 w-full">
        <span style={{ fontSize: 10, color: '#a8b8cc', whiteSpace: 'nowrap' }}>Speed (m/s)</span>
        <input
          type="range" min="5" max="30" step="1" value={speed}
          onChange={e => setSpeed(+e.target.value)}
          className="flex-1" style={{ accentColor: GC }}
        />
        <span style={{ fontSize: 11, fontWeight: 700, color: GC, fontFamily: 'monospace', minWidth: 32, textAlign: 'right' }}>{speed} m/s</span>
      </div>

      {/* SVG comparison */}
      <svg width="100%" viewBox="0 0 260 148" style={{ borderRadius: 10, border: '1.5px solid #1d293d', background: '#0f1829' }}>
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
        {/* Power */}
        <div className="flex justify-between text-xs mb-0.5">
          <span style={{ color: '#a8b8cc' }}>Power</span>
          <span style={{ color: GC, fontWeight: 700 }}>{powerKw} kW</span>
        </div>
        <input type="range" min="0.1" max="3" step="0.1" value={powerKw}
          onChange={e => setPowerKw(+e.target.value)} className="w-full" style={{ accentColor: GC }} />

        {/* Time */}
        <div className="flex justify-between text-xs mb-0.5">
          <span style={{ color: '#a8b8cc' }}>Time</span>
          <span style={{ color: '#fdc700', fontWeight: 700 }}>{hours} h</span>
        </div>
        <input type="range" min="1" max="24" step="1" value={hours}
          onChange={e => setHours(+e.target.value)} className="w-full" style={{ accentColor: '#fdc700' }} />

        {/* Unit rate */}
        <div className="flex justify-between text-xs mb-0.5">
          <span style={{ color: '#a8b8cc' }}>Unit rate</span>
          <span style={{ color: '#c084fc', fontWeight: 700 }}>{rateP} p/kWh</span>
        </div>
        <input type="range" min="20" max="35" step="1" value={rateP}
          onChange={e => setRateP(+e.target.value)} className="w-full" style={{ accentColor: '#c084fc' }} />
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
}
