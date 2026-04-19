import { motion } from 'motion/react'
import { useState } from 'react'
import { Ruler, Compass, Wrench } from 'lucide-react'
import { IdeaCaption, RealityBadge, FormulaBox, MisconceptionCard, RealWorldCard, SimSlider, SimNarration } from './visuals-helpers'

const KC = '#00d4ff'

// ─── Topic 1: SI Units & Standard Form ───────────────────────────────────────

function KeyConceptsUnitsLesson() {
  const [tab, setTab] = useState('prefixes')
  const [exp, setExp] = useState(4)
  const [coeff, setCoeff] = useState(3.5)

  const prefixes = [
    { name: 'giga', symbol: 'G', power: '10⁹', value: '1 000 000 000', color: '#e91e8c' },
    { name: 'mega', symbol: 'M', power: '10⁶', value: '1 000 000', color: '#9b59b6' },
    { name: 'kilo', symbol: 'k', power: '10³', value: '1 000', color: KC },
    { name: 'milli', symbol: 'm', power: '10⁻³', value: '0.001', color: '#f39c12' },
    { name: 'micro', symbol: 'μ', power: '10⁻⁶', value: '0.000 001', color: '#f97316' },
    { name: 'nano', symbol: 'n', power: '10⁻⁹', value: '0.000 000 001', color: '#ef4444' },
  ]

  const [revealed, setRevealed] = useState({})
  const toggleReveal = (name) => setRevealed(r => ({ ...r, [name]: !r[name] }))

  const stdFormValue = (coeff * Math.pow(10, exp)).toLocaleString('en-GB', { maximumSignificantDigits: 6 })

  return (
    <div className="w-full h-full flex flex-col gap-2 px-3 py-2" style={{ background: '#0b1121' }}>
      {/* Tabs */}
      <div className="flex gap-1.5">
        {['prefixes', 'standard form'].map(t => (
          <button key={t} onClick={() => setTab(t)}
            className="px-3 py-1 rounded-[8px] text-xs font-semibold capitalize"
            style={{ background: tab === t ? `${KC}22` : '#1d293d', color: tab === t ? KC : '#a8b8cc', border: `1px solid ${tab === t ? KC : '#1d293d'}` }}>
            {t}
          </button>
        ))}
      </div>

      {tab === 'prefixes' && (
        <div className="flex flex-col gap-1.5 overflow-auto">
          <p className="text-xs" style={{ color: '#a8b8cc' }}>Tap each prefix to reveal its meaning</p>
          {prefixes.map(p => (
            <button key={p.name} onClick={() => toggleReveal(p.name)}
              className="flex items-center justify-between px-3 py-1.5 rounded-[10px] w-full text-left"
              style={{ background: revealed[p.name] ? `${p.color}18` : '#1d293d', border: `1px solid ${revealed[p.name] ? p.color : '#2a3a52'}` }}>
              <div className="flex items-center gap-2">
                <span style={{ fontSize: 13, fontWeight: 700, color: p.color, fontFamily: 'monospace', width: 20 }}>{p.symbol}</span>
                <span style={{ fontSize: 11, color: '#e2e8f0' }}>{p.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <span style={{ fontSize: 11, fontWeight: 700, color: p.color, fontFamily: 'monospace' }}>{p.power}</span>
                {revealed[p.name] && (
                  <motion.span
                    initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }}
                    style={{ fontSize: 10, color: '#a8b8cc', fontFamily: 'monospace' }}>{p.value}
                  </motion.span>
                )}
              </div>
            </button>
          ))}
        </div>
      )}

      {tab === 'standard form' && (
        <div className="flex flex-col gap-2">
          <p className="text-xs" style={{ color: '#a8b8cc' }}>Drag the sliders to build a number in standard form</p>
          {/* Live display */}
          <div className="rounded-[12px] px-4 py-3 text-center"
            style={{ background: `${KC}12`, border: `1.5px solid ${KC}40` }}>
            <span style={{ fontSize: 22, fontWeight: 700, color: KC, fontFamily: 'monospace', letterSpacing: '-0.02em' }}>
              {coeff} × 10<sup>{exp}</sup>
            </span>
            <div style={{ fontSize: 11, color: '#a8b8cc', marginTop: 4 }}>= {stdFormValue}</div>
          </div>
          <SimSlider label="Coefficient A (1 ≤ A < 10)" min={1} max={9.9} step={0.1} value={coeff}
            onChange={v => setCoeff(parseFloat(v.toFixed(1)))} color={KC} />
          <SimSlider label="Power of 10 (n)" min={-9} max={9} step={1} value={exp}
            onChange={setExp} color="#9b59b6" />
          <SimNarration text={`${coeff} × 10^${exp} = ${stdFormValue}. ${exp >= 0 ? 'Positive exponent — number is large.' : 'Negative exponent — number is a small fraction.'}`} />
          <div className="text-xs text-center px-2 py-1 rounded-[8px]"
            style={{ background: '#1d293d', color: '#a8b8cc' }}>
            Standard form requires <span style={{ color: KC, fontWeight: 700 }}>1 ≤ A &lt; 10</span>
          </div>
        </div>
      )}
    </div>
  )
}

function KeyConceptsUnitsIdea() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 px-4 py-3">
      <MisconceptionCard
        wrong="To convert 5 kg to mg, just multiply by 1000 twice: 5 kg → 5000 g → 5000000 mg. That's fine for any prefix chain."
        right="Prefix chaining works numerically, but students often lose track of the exponent. The safest method: always convert to the base SI unit first (5 kg = 5000 g = 5 × 10⁶ mg). Check: k = 10³, m = 10⁻³, so kg→mg is a factor of 10⁶."
        wrongLabel="Prefix chaining error"
        rightLabel="Base unit method"
      />
    </div>
  )
}

function KeyConceptsUnitsReality() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 px-4 py-3">
      <RealWorldCard icon="⚛️" title="Atom diameter" desc="A hydrogen atom is about 1 × 10⁻¹⁰ m across — or 0.1 nm. Standard form makes this manageable; written out it would be 0.0000000001 m." color={KC} delay={0} />
      <RealWorldCard icon="☀️" title="Distance to the Sun" desc="About 1.5 × 10¹¹ m. In kilometres that's 1.5 × 10⁸ km. Standard form lets scientists write huge distances without pages of zeros." color="#f39c12" delay={0.1} />
      <RealWorldCard icon="⚡" title="Electron charge" desc="The charge of one electron is 1.6 × 10⁻¹⁹ C. Standard form is essential here — the full decimal has 19 zeros before the 16." color="#9b59b6" delay={0.2} />
    </div>
  )
}

// ─── Topic 2: Scalars and Vectors ────────────────────────────────────────────

function KeyConceptsScalarsLesson() {
  const [eastF, setEastF] = useState(3)
  const [northF, setNorthF] = useState(4)
  const R = Math.sqrt(eastF * eastF + northF * northF).toFixed(2)

  // SVG geometry: origin at (50, 140), east goes right, north goes up
  const scale = 18  // px per unit
  const ox = 50
  const oy = 140
  const ex = ox + eastF * scale
  const ey = oy
  const nx = ex
  const ny = oy - northF * scale

  return (
    <div className="w-full h-full flex flex-col gap-2 px-3 py-2" style={{ background: '#0b1121' }}>
      <p className="text-xs" style={{ color: '#a8b8cc' }}>Drag sliders — the resultant updates live using Pythagoras</p>

      <svg width="260" height="180" viewBox="0 0 260 180" role="img" aria-label={`Vector diagram: ${eastF} N east and ${northF} N north combine to give resultant ${R} N`}>
        {/* Axes hint */}
        <text x={ox - 10} y={oy + 14} fill="#334155" fontSize={8}>origin</text>
        {/* East arrow */}
        <line x1={ox} y1={oy} x2={ex} y2={ey} stroke={KC} strokeWidth="2.5" strokeLinecap="round" />
        <polygon points={`${ex - 2},${ey - 5} ${ex - 2},${ey + 5} ${ex + 8},${ey}`} fill={KC} />
        <text x={(ox + ex) / 2} y={ey + 14} textAnchor="middle" fill={KC} fontSize={9} fontWeight="bold">{eastF} N east</text>

        {/* North arrow */}
        <line x1={ex} y1={oy} x2={nx} y2={ny} stroke="#f39c12" strokeWidth="2.5" strokeLinecap="round" />
        <polygon points={`${nx - 5},${ny + 2} ${nx + 5},${ny + 2} ${nx},${ny - 8}`} fill="#f39c12" />
        <text x={nx + 22} y={(oy + ny) / 2 + 4} textAnchor="middle" fill="#f39c12" fontSize={9} fontWeight="bold">{northF} N north</text>

        {/* Resultant (hypotenuse) */}
        <line x1={ox} y1={oy} x2={nx} y2={ny} stroke="#00bc7d" strokeWidth="2.5" strokeDasharray="5 3" strokeLinecap="round" />
        <polygon points={`${nx - 5},${ny + 8} ${nx + 5},${ny + 8} ${nx},${ny - 2}`} fill="#00bc7d" />
        <text x={(ox + nx) / 2 - 18} y={(oy + ny) / 2} fill="#00bc7d" fontSize={9} fontWeight="bold"
          transform={`rotate(${-Math.atan2(northF, eastF) * 180 / Math.PI}, ${(ox + nx) / 2}, ${(oy + ny) / 2})`}>
          R = {R} N
        </text>

        {/* Right angle marker */}
        <path d={`M${ex - 8},${oy} L${ex - 8},${oy - 8} L${ex},${oy - 8}`} fill="none" stroke="#334155" strokeWidth="1" />

        {/* Formula */}
        <text x="180" y="30" textAnchor="middle" fill="#a8b8cc" fontSize={9}>R² = a² + b²</text>
        <text x="180" y="44" textAnchor="middle" fill={KC} fontSize={9} fontWeight="bold">R = √({eastF}² + {northF}²) = {R} N</text>
      </svg>

      <div className="flex flex-col gap-1.5" style={{ background: '#1d293d', borderRadius: 10, padding: '8px 12px' }}>
        <SimSlider label="East force" min={1} max={10} step={1} value={eastF} onChange={setEastF} unit="N" color={KC} />
        <SimSlider label="North force" min={1} max={10} step={1} value={northF} onChange={setNorthF} unit="N" color="#f39c12" />
        <div className="flex justify-between text-xs mt-1.5 pt-1.5 font-bold" style={{ borderTop: '1px solid #0b1121' }}>
          <span style={{ color: '#a8b8cc' }}>Resultant = √({eastF}² + {northF}²)</span>
          <span style={{ color: '#00bc7d' }}>{R} N</span>
        </div>
      </div>
      <SimNarration text={`Two forces: ${eastF} N east and ${northF} N north. Using Pythagoras, the resultant is ${R} N at an angle — this is the single force that has the same effect as both.`} />
    </div>
  )
}

function KeyConceptsScalarsIdea() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 px-4 py-3">
      <MisconceptionCard
        wrong="Speed and velocity are the same thing — velocity is just the technical word for how fast something moves."
        right="Speed is a scalar: it has magnitude only (e.g. 30 m/s). Velocity is a vector: it needs a direction too (e.g. 30 m/s north). A car at 30 m/s north and one at 30 m/s south have the same speed but opposite velocities."
        wrongLabel="Common mix-up"
        rightLabel="Scalar vs vector — direction matters"
      />
    </div>
  )
}

function KeyConceptsScalarsReality() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 px-4 py-3">
      <RealWorldCard icon="🛰️" title="GPS navigation" desc="GPS calculates your displacement vector — distance plus direction from start. Total distance driven is useless for navigation; you need both magnitude and direction." color={KC} delay={0} />
      <RealWorldCard icon="🏊" title="Swimmer crossing a river" desc="A swimmer heading north at 2 m/s in a river flowing east at 1.5 m/s has a resultant velocity of 2.5 m/s at an angle — found using R² = 2² + 1.5²." color="#00bc7d" delay={0.1} />
      <RealWorldCard icon="✈️" title="Plane in a crosswind" desc="A plane flying at 250 m/s south in a 50 m/s westerly wind has a resultant velocity calculated by Pythagoras. Pilots must account for this to land on the runway." color="#f39c12" delay={0.2} />
    </div>
  )
}

// ─── Topic 3: Rearranging Equations ──────────────────────────────────────────

function KeyConceptsEquationsLesson() {
  const [formula, setFormula] = useState('vuat')
  const [currentStep, setCurrentStep] = useState(0)

  const formulas = {
    vuat: {
      label: 'v = u + at → find t',
      steps: [
        { label: 'Start', eq: 'v = u + at', note: 'We want to make t the subject' },
        { label: '− u', eq: 'v − u = at', note: 'Subtract u from both sides to isolate the at term' },
        { label: '÷ a', eq: '(v − u) / a = t', note: 'Divide both sides by a to get t on its own' },
        { label: 'Write answer', eq: 't = (v − u) / a', note: 'Flip sides — t is now the subject. Substitute values.' },
      ],
    },
    piv: {
      label: 'P = IV → find I',
      steps: [
        { label: 'Start', eq: 'P = IV', note: 'We want to make I the subject' },
        { label: '÷ V', eq: 'P / V = I', note: 'Divide both sides by V to isolate I' },
        { label: 'Write answer', eq: 'I = P / V', note: 'Flip sides — I is now the subject. Units: A = W ÷ V.' },
      ],
    },
    ek: {
      label: 'Eₖ = ½mv² → find v',
      steps: [
        { label: 'Start', eq: 'Eₖ = ½mv²', note: 'We want to make v the subject' },
        { label: '× 2', eq: '2Eₖ = mv²', note: 'Multiply both sides by 2 to clear the ½' },
        { label: '÷ m', eq: '2Eₖ / m = v²', note: 'Divide both sides by m to isolate v²' },
        { label: '√', eq: 'v = √(2Eₖ / m)', note: 'Square root both sides — remember the √ applies to the whole fraction' },
      ],
    },
  }

  const selected = formulas[formula]
  const step = selected.steps[currentStep]

  const handleFormulaChange = (f) => {
    setFormula(f)
    setCurrentStep(0)
  }

  return (
    <div className="w-full h-full flex flex-col gap-2 px-3 py-2" style={{ background: '#0b1121' }}>
      {/* Formula picker */}
      <div className="flex gap-1 flex-wrap">
        {Object.entries(formulas).map(([key, f]) => (
          <button key={key} onClick={() => handleFormulaChange(key)}
            className="px-2.5 py-1 rounded-[8px] text-xs font-semibold"
            style={{ background: formula === key ? `${KC}22` : '#1d293d', color: formula === key ? KC : '#a8b8cc', border: `1px solid ${formula === key ? KC : '#1d293d'}` }}>
            {f.label.split('→')[0].trim()}
          </button>
        ))}
      </div>

      {/* Step display */}
      <div className="flex-1 flex flex-col gap-2">
        <div className="text-xs px-2 py-1 rounded-[8px]"
          style={{ background: `${KC}10`, color: KC, border: `1px solid ${KC}30` }}>
          Goal: <strong>{selected.label}</strong>
        </div>

        {/* Step pills */}
        <div className="flex gap-1 flex-wrap">
          {selected.steps.map((s, i) => (
            <button key={i} onClick={() => setCurrentStep(i)}
              className="px-2 py-0.5 rounded-[6px] text-xs font-semibold"
              style={{ background: currentStep === i ? `${KC}22` : '#1d293d', color: currentStep === i ? KC : '#a8b8cc', border: `1px solid ${currentStep === i ? KC : '#2a3a52'}` }}>
              {i + 1}. {s.label}
            </button>
          ))}
        </div>

        {/* Equation display */}
        <motion.div
          key={`${formula}-${currentStep}`}
          initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
          className="rounded-[14px] px-4 py-4 text-center"
          style={{ background: `${KC}10`, border: `1.5px solid ${KC}40` }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: KC, fontFamily: 'monospace', letterSpacing: '-0.01em' }}>
            {step.eq}
          </div>
        </motion.div>

        {/* Annotation */}
        <motion.div
          key={`note-${formula}-${currentStep}`}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
          className="rounded-[10px] px-3 py-2"
          style={{ background: '#1d293d', border: '1px solid #2a3a52' }}>
          <div style={{ fontSize: 11, color: '#cad5e2', lineHeight: 1.5 }}>{step.note}</div>
        </motion.div>

        {/* Navigation */}
        <div className="flex gap-2">
          <button onClick={() => setCurrentStep(s => Math.max(0, s - 1))}
            disabled={currentStep === 0}
            className="flex-1 py-2 rounded-[8px] text-xs font-bold"
            style={{ background: currentStep === 0 ? '#1a2435' : '#1d293d', color: currentStep === 0 ? '#3d5278' : '#a8b8cc', border: '1px solid #2a3a52' }}>
            ← Back
          </button>
          <button onClick={() => setCurrentStep(s => Math.min(selected.steps.length - 1, s + 1))}
            disabled={currentStep === selected.steps.length - 1}
            className="flex-1 py-2 rounded-[8px] text-xs font-bold"
            style={{ background: currentStep === selected.steps.length - 1 ? '#1a2435' : `${KC}18`, color: currentStep === selected.steps.length - 1 ? '#3d5278' : KC, border: `1px solid ${currentStep === selected.steps.length - 1 ? '#2a3a52' : KC + '50'}` }}>
            Next →
          </button>
        </div>
      </div>
    </div>
  )
}

function KeyConceptsEquationsIdea() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 px-4 py-3">
      <MisconceptionCard
        wrong="Equation triangles always work — just cover the quantity you want and read the answer."
        right="Equation triangles ONLY work for equations of the form y = x × z (pure multiplication/division). For equations like v = u + at or Eₖ = ½mv², the triangle fails completely. You must use proper algebraic rearrangement."
        wrongLabel="Triangle trap"
        rightLabel="Algebra is the only safe method"
      />
    </div>
  )
}

function KeyConceptsEquationsReality() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 px-4 py-3">
      <RealWorldCard icon="🏗️" title="Structural engineers" desc="Rearrange F = ma for mass to find how heavy a beam can be before a joint fails. Same equation, different subject every time." color={KC} delay={0} />
      <RealWorldCard icon="💊" title="Medicine — drug dosing" desc="Dose = concentration × volume. Doctors rearrange to find the volume needed for a target concentration. Wrong rearrangement = dangerous overdose." color="#ef4444" delay={0.1} />
      <RealWorldCard icon="🔭" title="Astronomy — distances" desc="v = d/t rearranged to d = v × t lets astronomers calculate how far away a galaxy is from its recession speed and the age of the universe." color="#9b59b6" delay={0.2} />
    </div>
  )
}

// ─── Exported Topic Map ───────────────────────────────────────────────────────

export const KEY_CONCEPTS_TOPICS = {

  // ─── 1. SI Units & Standard Form ──────────────────────────────────────────
  key_concepts_units: {
    id: 'key_concepts_units',
    module: 'Key Concepts',
    moduleColor: KC,
    course: 'combined',
    boards: ['edexcel'],
    title: 'SI Units & Standard Form',
    subtitle: 'Measurements, Prefixes & Scientific Notation',
    description: 'The seven base SI units are: metre (m), kilogram (kg), second (s), ampere (A), kelvin (K), mole (mol) and candela (cd). Derived units are combinations of base units: N = kg·m/s², J = kg·m²/s², W = J/s. SI prefixes scale units by powers of 10: nano (n) = 10⁻⁹, micro (μ) = 10⁻⁶, milli (m) = 10⁻³, kilo (k) = 10³, mega (M) = 10⁶, giga (G) = 10⁹. Standard form writes any number as A × 10ⁿ where 1 ≤ A < 10. Significant figures indicate precision — the number of meaningful digits in a measurement.',
    lessonVisual: KeyConceptsUnitsLesson,
    ideaVisual: KeyConceptsUnitsIdea,
    realityVisual: KeyConceptsUnitsReality,
    question: 'Which of the following correctly expresses 0.0000045 m in standard form?',
    questionSubtitle: 'Standard form: A × 10ⁿ where 1 ≤ A < 10',
    options: ['45 × 10⁻⁷ m', '4.5 × 10⁻⁶ m', '0.45 × 10⁻⁵ m', '4.5 × 10⁶ m'],
    correctAnswer: 1,
    keywords: ['SI unit', 'base unit', 'derived unit', 'prefix', 'standard form', 'significant figures', 'nano', 'micro', 'milli', 'kilo', 'mega', 'giga', 'metre', 'kilogram', 'second', 'ampere', 'kelvin'],
    sentenceStarters: [
      'The seven base SI units are...',
      'A derived unit is formed by combining base units, for example Newton is...',
      'The prefix kilo means...',
      'To write 0.00045 in standard form I...',
      'Standard form is useful because...',
    ],
    modelAnswers: [
      'The seven base SI units include the **metre (m), kilogram (kg), second (s) and ampere (A)**.',
      'A derived unit is formed by combining base units; for example, Newton is **kg·m/s² — mass times acceleration**.',
      'The prefix kilo means **10³, so 1 km = 1000 m and 1 kg = 1000 g**.',
      'To write 0.00045 in standard form I **move the decimal point until one digit is before it: 4.5 × 10⁻⁴**.',
      'Standard form is useful because **it lets scientists write very large or very small numbers without pages of zeros**.',
    ],
    misconception: 'When converting between prefixes, always go through the base SI unit first to avoid chaining errors.',
    concept: 'Base SI units: m, kg, s, A, K, mol, cd. Prefixes: n=10⁻⁹, μ=10⁻⁶, m=10⁻³, k=10³, M=10⁶, G=10⁹. Standard form: A × 10ⁿ (1 ≤ A < 10).',

    hook: {
      hookFact: 'In 1999, NASA lost a $327 million Mars Climate Orbiter because one engineering team used metric units and another used imperial. The spacecraft received the wrong trajectory data, entered the atmosphere at the wrong angle, and burned up. One consistent set of SI units would have saved it.',
      hookQuestion: 'A wavelength of visible light is 0.0000005 m. Write this in standard form. Which SI prefix and unit would make this number easiest to work with?',
      hookEmoji: '📏',
    },

    lessonKeywords: [
      {
        word: 'SI unit',
        symbol: '',
        unit: '',
        definition: 'An internationally agreed standard unit of measurement. There are 7 base SI units.',
        everydayNote: 'Every country uses SI units in science — it is the shared language of measurement worldwide.',
      },
      {
        word: 'Base unit',
        symbol: '',
        unit: '',
        definition: 'One of the seven fundamental units from which all other units are derived: m, kg, s, A, K, mol, cd.',
        everydayNote: 'You cannot simplify a base unit further — it is the most fundamental measure of that quantity.',
      },
      {
        word: 'Derived unit',
        symbol: '',
        unit: '',
        definition: 'A unit formed by combining two or more base units using multiplication or division.',
        everydayNote: 'Newton (N) = kg·m/s² — it combines mass, length, and time in one unit.',
      },
      {
        word: 'Unit prefix',
        symbol: '',
        unit: '',
        definition: 'Prefixes scale SI units: nano(n)=10⁻⁹, micro(μ)=10⁻⁶, milli(m)=10⁻³, kilo(k)=10³, mega(M)=10⁶, giga(G)=10⁹',
        everydayNote: 'Your phone stores data in gigabytes (GB) — giga means 10⁹, so 1 GB = 1 000 000 000 bytes.',
      },
      {
        word: 'Standard form',
        symbol: 'A × 10ⁿ',
        unit: '',
        definition: 'Writing a number as A × 10ⁿ where 1 ≤ A < 10. e.g. 0.000045 = 4.5 × 10⁻⁵',
        everydayNote: 'The distance to the Sun is 1.5 × 10¹¹ m — far easier than writing 150 000 000 000 m.',
      },
      {
        word: 'Significant figures',
        symbol: 's.f.',
        unit: '',
        definition: 'The number of meaningful digits in a measurement. Round to the number of sig figs in the least precise measurement.',
        everydayNote: 'Worked example: 2.4 × 3.15 = 7.56 → round to 2 sig figs (fewest in the data) = 7.6. Leading zeros are never significant.',
      },
      {
        word: 'Order of magnitude',
        symbol: '',
        unit: '',
        definition: 'The power of 10 closest to a value. Used to compare sizes. 1 nm = 10⁻⁹ m is 9 orders of magnitude smaller than 1 m.',
        everydayNote: 'A nucleus (10⁻¹⁵ m) is 5 orders of magnitude smaller than an atom (10⁻¹⁰ m) — that means 100 000 times smaller.',
      },
    ],

    prerequisiteCheck: {
      questions: [
        {
          question: 'What is 1 km in metres?',
          answers: ['1000 m', '100 m', '10 m', '10 000 m'],
          correct: 0,
          feedback: 'Kilo means 10³ = 1000. So 1 km = 1000 m. Remember: k = 10³ — multiply by 1000 to convert from km to m.',
        },
        {
          question: 'Which is larger: 1 × 10³ or 5 × 10²?',
          answers: ['1 × 10³', '5 × 10²', 'They are equal', 'Cannot be compared'],
          correct: 0,
          feedback: '1 × 10³ = 1000. 5 × 10² = 500. So 1 × 10³ is larger. Compare by first converting to ordinary numbers.',
        },
      ],
    },

    topicMapHint: {
      before: ['Measurement and equipment', 'Basic arithmetic and powers of 10'],
      current: 'SI Units & Standard Form',
      after: ['Scalars and Vectors', 'Rearranging Equations', 'Any calculation topic'],
    },

    workedExample: {
      title: 'Convert 4.5 × 10⁻⁶ m to nanometres (nm)',
      equation: '1 nm = 10⁻⁹ m  →  nm = m ÷ 10⁻⁹',
      context: 'Express a wavelength of 4.5 × 10⁻⁶ m in nanometres.',
      steps: [
        {
          step: 1,
          action: 'Write the prefix relationship',
          content: '1 nm = 10⁻⁹ m, so 1 m = 10⁹ nm',
          annotation: 'Always start by stating how many of the target unit equals 1 base unit. Nano means 10⁻⁹.',
        },
        {
          step: 2,
          action: 'Set up the conversion',
          content: 'nm = m × 10⁹  →  nm = 4.5 × 10⁻⁶ × 10⁹',
          annotation: 'Multiply by 10⁹ to convert metres into nanometres. To multiply powers: add exponents.',
        },
        {
          step: 3,
          action: 'Add the exponents',
          content: '10⁻⁶ × 10⁹ = 10⁻⁶⁺⁹ = 10³',
          annotation: 'When multiplying powers of 10, add the indices: −6 + 9 = +3.',
        },
        {
          step: 4,
          action: 'State the answer with unit',
          content: '4.5 × 10³ nm = 4500 nm',
          annotation: 'Check: 4.5 × 10⁻⁶ m is in the micro range; nano is smaller, so we expect a larger number. ✓',
        },
      ],
      misconceptionAfter: {
        claim: 'To convert from micro to nano, just change the prefix label — the number stays the same.',
        reality: 'Changing prefix changes the number. 4.5 μm = 4500 nm, not 4.5 nm. The quantity is the same; the numerical value changes when the unit changes.',
        visual: 'Think of money: £4.50 = 450p. Same amount, different number because the unit is smaller.',
      },
    },

    guidedPractice: {
      tier1: {
        question: 'Convert 3000 m to kilometres.',
        allSteps: ['Write the prefix: kilo = 10³, so 1 km = 1000 m', 'Set up: km = m ÷ 1000', 'Substitute: km = 3000 ÷ 1000', '??? — calculate the answer'],
        missingStep: 3,
        missingHint: 'Divide 3000 by 1000',
        answer: 3,
        answerUnit: 'km',
      },
      tier2: {
        question: 'Write 0.000045 in standard form.',
        shownEquation: 'A × 10ⁿ where 1 ≤ A < 10',
        shownStep1: 'Move decimal right until one digit is before it: 0.000045 → 4.5',
        hint: 'Count how many places you moved the decimal: 5 places to the right → exponent is −5',
        answer: 4.5,
        answerUnit: '× 10⁻⁵',
      },
      tier3: {
        question: 'A Wi-Fi signal broadcasts at 2.4 GHz. Express this frequency in Hz using standard form.',
        hint: 'Giga = 10⁹. Multiply 2.4 by 10⁹.',
        methodHint: '2.4 × 10⁹ Hz — check: is 1 ≤ 2.4 < 10? Yes. ✓',
        answer: 2.4,
        answerUnit: '× 10⁹ Hz',
      },
    },

    summary: {
      equation: 'A × 10ⁿ  (where 1 ≤ A < 10)',
      sentence: 'Standard form keeps very large or very small numbers manageable by expressing them as a number between 1 and 10 multiplied by a power of 10.',
      promptText: 'Without looking: name the 4 most common SI prefixes and their powers of 10. Then write 0.0000072 in standard form.',
    },

    sessionRecap: [
      'The seven base SI units (m, kg, s, A, K, mol, cd) are the building blocks of all measurements in physics. Derived units like N, J, and W are combinations of these.',
      'SI prefixes scale units by powers of 10: nano (10⁻⁹), micro (10⁻⁶), milli (10⁻³), kilo (10³), mega (10⁶), giga (10⁹). Always convert through the base unit to avoid errors.',
      'Standard form writes numbers as A × 10ⁿ where 1 ≤ A < 10. It is essential for very large quantities (distance to stars) and very small ones (atomic sizes, electron charge).',
      'Always round your final answer to the same number of sig figs as your least precise data. Order of magnitude compares sizes using the power of 10 — a nucleus is 5 orders of magnitude smaller than an atom.',
    ],
  },

  // ─── 2. Scalars and Vectors ───────────────────────────────────────────────
  key_concepts_scalars: {
    id: 'key_concepts_scalars',
    module: 'Key Concepts',
    moduleColor: KC,
    course: 'combined',
    boards: ['edexcel'],
    title: 'Scalars and Vectors',
    subtitle: 'Magnitude, Direction and Resultant Forces',
    description: 'Scalar quantities have magnitude only: speed, distance, mass, temperature, energy, time. Vector quantities have both magnitude and direction: velocity, displacement, force, acceleration, momentum, weight. Vectors are drawn as arrows — the length represents magnitude and the arrowhead shows direction. For two perpendicular vectors, find the resultant using Pythagoras: R² = a² + b². Vectors in the same direction are added; in opposite directions they are subtracted. Scale diagrams can also represent vectors.',
    lessonVisual: KeyConceptsScalarsLesson,
    ideaVisual: KeyConceptsScalarsIdea,
    realityVisual: KeyConceptsScalarsReality,
    question: 'A 5 N force acts east and a 12 N force acts north. What is the magnitude of the resultant force?',
    questionSubtitle: 'Use Pythagoras: R² = 5² + 12²',
    options: ['17 N', '13 N', '7 N', '8.5 N'],
    correctAnswer: 1,
    keywords: ['scalar', 'vector', 'resultant', 'displacement', 'magnitude', 'direction', 'Pythagoras', 'perpendicular', 'velocity', 'speed', 'momentum', 'weight'],
    sentenceStarters: [
      'A scalar quantity only has magnitude, for example...',
      'A vector quantity has both magnitude and direction, for example...',
      'Speed and velocity are different because...',
      'To find the resultant of two perpendicular forces I use...',
      'The resultant of a 3 N east force and a 4 N north force is...',
    ],
    modelAnswers: [
      'A scalar quantity only has magnitude; for example, **speed (30 m/s) or temperature (20°C) — no direction is stated**.',
      'A vector quantity has both magnitude and direction; for example, **velocity (30 m/s north) or force (50 N downward)**.',
      'Speed and velocity are different because **velocity specifies a direction as well as how fast — a car at 30 m/s north has a different velocity to one at 30 m/s south**.',
      'To find the resultant of two perpendicular forces I use **Pythagoras: R² = a² + b², then take the square root**.',
      'The resultant of a 3 N east force and 4 N north force is **R = √(3² + 4²) = √25 = 5 N**.',
    ],
    misconception: 'Speed and velocity are not the same — velocity requires a direction. A car going round a roundabout at constant speed has changing velocity.',
    concept: 'Scalar = magnitude only (speed, mass, energy, temperature, distance, time). Vector = magnitude + direction (velocity, force, acceleration, displacement, momentum, weight). Perpendicular resultant: R = √(a² + b²).',

    hook: {
      hookFact: 'In 2001, a British Airways plane flying from New York to London had such a powerful tailwind (jet stream) that it arrived 45 minutes early — the ground speed exceeded 800 mph. The crew calculated the scalar speed of the aircraft, but the actual velocity over the ground combined aircraft thrust and wind as vectors.',
      hookQuestion: 'A ball is thrown horizontally at 5 m/s while the wind blows it sideways at 12 m/s at right angles. What is the actual speed of the ball through the air? Think about which theorem you would use.',
      hookEmoji: '🧭',
    },

    lessonKeywords: [
      {
        word: 'Scalar',
        symbol: '',
        unit: '',
        definition: 'A quantity described by magnitude (size) only — no direction needed.',
        everydayNote: 'Temperature is a scalar: 20°C tells you exactly how hot it is — direction is meaningless.',
      },
      {
        word: 'Vector',
        symbol: '',
        unit: '',
        definition: 'A quantity described by both magnitude and direction.',
        everydayNote: '30 m/s north is a velocity (vector). Without "north", it is only a speed (scalar).',
      },
      {
        word: 'Resultant',
        symbol: 'R',
        unit: 'N or m/s (depends on context)',
        definition: 'The single vector that has the same effect as all the individual vectors combined.',
        everydayNote: 'A swimmer fighting a current: the resultant velocity tells you where they actually end up.',
      },
      {
        word: 'Displacement',
        symbol: 's',
        unit: 'm',
        definition: 'Distance moved in a specific direction — a vector quantity.',
        everydayNote: 'Walking 400 m around a square brings you back to the start: distance = 400 m, displacement = 0 m.',
      },
      {
        word: 'Magnitude',
        symbol: '',
        unit: '',
        definition: 'The size or amount of a quantity, without considering direction.',
        everydayNote: 'The magnitude of a velocity of 30 m/s north is simply 30 m/s.',
      },
      {
        word: 'Direction',
        symbol: '',
        unit: '',
        definition: 'The line along which a vector acts — north/south/east/west, up/down, or given as an angle.',
        everydayNote: 'Without direction, you can\'t navigate — GPS needs both your speed AND which way you\'re going.',
      },
    ],

    prerequisiteCheck: {
      questions: [
        {
          question: 'A right-angled triangle has sides of 5 cm and 12 cm. What is the hypotenuse?',
          answers: ['13 cm', '17 cm', '7 cm', '8.5 cm'],
          correct: 0,
          feedback: 'Pythagoras: 5² + 12² = 25 + 144 = 169. √169 = 13 cm. This is the 5-12-13 Pythagorean triple — worth remembering.',
        },
        {
          question: 'Which of these is a vector quantity?',
          answers: ['Speed', 'Mass', 'Temperature', 'Force'],
          correct: 3,
          feedback: 'Force is a vector — it has both size (e.g. 10 N) and direction (e.g. downward). Speed, mass, and temperature are all scalars: they need only a number and a unit.',
        },
      ],
    },

    topicMapHint: {
      before: ['SI Units & Standard Form', 'Basic arithmetic'],
      current: 'Scalars and Vectors',
      after: ['Forces and free body diagrams', 'Equations of Motion (SUVAT)', 'Momentum'],
    },

    workedExample: {
      title: 'Two forces at right angles — find the resultant',
      equation: 'R² = a² + b²  →  R = √(a² + b²)',
      context: 'A 3 N force acts east and a 4 N force acts north. Find the magnitude of the resultant force.',
      steps: [
        {
          step: 1,
          action: 'Draw and label a right-angle triangle',
          content: 'East = 3 N (horizontal side). North = 4 N (vertical side). Resultant = hypotenuse.',
          annotation: 'The two forces are perpendicular — that is the key condition for using Pythagoras.',
        },
        {
          step: 2,
          action: 'Write the equation',
          content: 'R² = a² + b²',
          annotation: 'This is Pythagoras. Only valid when the two vectors are at exactly 90° to each other.',
        },
        {
          step: 3,
          action: 'Substitute and calculate R²',
          content: 'R² = 3² + 4² = 9 + 16 = 25',
          annotation: 'Common error: 3 + 4 = 7. You must square each value first, then add. Never add before squaring.',
        },
        {
          step: 4,
          action: 'Square root and state the unit',
          content: 'R = √25 = 5 N',
          annotation: 'Sense check: 5 N is greater than 4 N but less than 3 + 4 = 7 N. The resultant must lie between the larger component and their sum. ✓',
        },
      ],
      misconceptionAfter: {
        claim: 'Just add the two forces: 3 N + 4 N = 7 N.',
        reality: 'Adding magnitudes only works if both vectors point in the same direction. For perpendicular vectors, Pythagoras gives 5 N, not 7 N — the direction matters.',
        visual: 'If you walk 3 m east then 4 m north, you are 5 m from your starting point — not 7 m. Pythagoras, not addition.',
      },
    },

    guidedPractice: {
      tier1: {
        question: 'A 6 N force acts east and an 8 N force acts north. Find the resultant force.',
        allSteps: ['Write: a = 6 N, b = 8 N (perpendicular)', 'Equation: R² = a² + b²', 'Substitute: R² = 6² + 8² = 36 + 64 = 100', '??? — calculate R'],
        missingStep: 3,
        missingHint: 'Calculate R = √100 = ?',
        answer: 10,
        answerUnit: 'N',
      },
      tier2: {
        question: 'A plane flies east at 5 m/s. A wind blows north at 12 m/s. Find the resultant speed.',
        shownEquation: 'R² = a² + b²  →  R = √(a² + b²)',
        shownStep1: 'Write what you know: east = 5 m/s, north = 12 m/s (perpendicular)',
        hint: 'R² = 5² + 12² = 25 + 144 = 169',
        answer: 13,
        answerUnit: 'm/s',
      },
      tier3: {
        question: 'A 9 N force acts east and a 40 N force acts north. Find the resultant force.',
        hint: 'Use R² = a² + b². Calculate 9² and 40² separately first.',
        methodHint: 'R² = 81 + 1600 = 1681. Find √1681.',
        answer: 41,
        answerUnit: 'N',
      },
    },

    summary: {
      equation: 'R² = a² + b²  →  R = √(a² + b²)',
      sentence: 'Scalars have magnitude only; vectors have magnitude and direction. For two perpendicular vectors, find the resultant using Pythagoras.',
      promptText: 'Without looking: name three scalars and three vectors. Then state the rule for combining two perpendicular vectors and give the formula.',
    },

    sessionRecap: [
      'Scalars have magnitude only — examples include speed, distance, mass, temperature, energy, and time. Vectors have both magnitude and direction — examples include velocity, displacement, force, acceleration, momentum, and weight.',
      'The resultant of two perpendicular vectors is found using Pythagoras: R = √(a² + b²). The resultant is always less than the arithmetic sum of the two magnitudes.',
      'Vectors are represented as arrows: the length shows the magnitude and the arrowhead shows the direction. Scale diagrams can be used to find resultants when vectors are not perpendicular.',
    ],
  },

  // ─── 3. Rearranging Equations ─────────────────────────────────────────────
  key_concepts_equations: {
    id: 'key_concepts_equations',
    module: 'Key Concepts',
    moduleColor: KC,
    course: 'combined',
    boards: ['edexcel'],
    title: 'Rearranging Equations',
    subtitle: 'Making Any Variable the Subject',
    description: 'To rearrange an equation, perform the same inverse operation on both sides. The key steps are: identify what you want to find (the subject), identify the operation connecting it to other terms, then apply the inverse (÷→×, ×→÷, +→−, −→+, x²→√x). Equation triangles only work for equations of the form y = x × z. For any equation containing addition or subtraction (e.g. v = u + at, Eₖ = ½mv²), you must use proper algebraic rearrangement. Always include units in your final answer and check the result makes physical sense.',
    lessonVisual: KeyConceptsEquationsLesson,
    ideaVisual: KeyConceptsEquationsIdea,
    realityVisual: KeyConceptsEquationsReality,
    question: 'The equation v = u + at is rearranged to make t the subject. Which is correct?',
    questionSubtitle: 'Perform inverse operations on both sides',
    options: ['t = v + u / a', 't = (v − u) / a', 't = v / a − u', 't = v − u − a'],
    correctAnswer: 1,
    keywords: ['subject', 'rearrange', 'inverse operation', 'equation triangle', 'formula', 'substitute', 'SUVAT', 'algebraic rearrangement', 'making the subject'],
    sentenceStarters: [
      'To rearrange an equation, I need to...',
      'An inverse operation reverses an operation, for example...',
      'Equation triangles only work when...',
      'To make t the subject of v = u + at, I first...',
      'After rearranging, I check my answer by...',
    ],
    modelAnswers: [
      'To rearrange an equation, I need to **perform the same inverse operation on both sides to isolate the variable I want**.',
      'An inverse operation reverses an operation; for example, **division is the inverse of multiplication, and subtraction is the inverse of addition**.',
      'Equation triangles only work when **the equation has the form y = x × z — pure multiplication or division. They fail for equations with addition or subtraction**.',
      'To make t the subject of v = u + at, I first **subtract u from both sides to get v − u = at, then divide both sides by a to get t = (v − u) / a**.',
      'After rearranging, I check my answer by **substituting numbers back into the original equation to confirm both sides are equal**.',
    ],
    misconception: 'Equation triangles only work for y = x × z equations. Never use a triangle for v = u + at or Eₖ = ½mv².',
    concept: 'Rearranging rule: perform inverse operations on both sides to isolate the subject. Inverse pairs: ×↔÷, +↔−, x²↔√x. Always substitute numbers and include units after rearranging.',

    hook: {
      hookFact: 'There are 23 physics equations on the Edexcel GCSE formula sheet. Every single one can be rearranged using the same technique — perform inverse operations on both sides. Master this once and it works for all of them.',
      hookQuestion: 'The equation for kinetic energy is Eₖ = ½mv². You know Eₖ = 100 J and m = 2 kg. How would you find v? You need to rearrange for v — try to write down the steps before starting the lesson.',
      hookEmoji: '🔧',
    },

    lessonKeywords: [
      {
        word: 'Subject',
        symbol: '',
        unit: '',
        definition: 'The variable on its own on one side of an equation — what you are solving for.',
        everydayNote: 'In v = u + at, v is the subject. If you want t, you need to rearrange to make t the subject.',
      },
      {
        word: 'Rearrange',
        symbol: '',
        unit: '',
        definition: 'To manipulate an equation so that a different variable becomes the subject.',
        everydayNote: 'Rearranging is the same as solving — you isolate the unknown quantity on one side.',
      },
      {
        word: 'Inverse operation',
        symbol: '',
        unit: '',
        definition: 'The operation that undoes another: ÷ undoes ×, − undoes +, √ undoes x².',
        everydayNote: 'To undo "multiply by 4", divide by 4. Inverse operations always come in pairs.',
      },
      {
        word: 'Equation triangle',
        symbol: '',
        unit: '',
        definition: 'A memory aid for simple y = x × z equations — cover the unknown to read off the rearrangement.',
        everydayNote: 'The speed triangle (v = d/t) works because it is pure multiplication/division. The kinetic energy formula does NOT work as a triangle.',
      },
      {
        word: 'Formula',
        symbol: '',
        unit: '',
        definition: 'A mathematical relationship between physical quantities, expressed as an equation.',
        everydayNote: 'F = ma is a formula connecting force, mass and acceleration — every quantity is linked.',
      },
      {
        word: 'Substitute',
        symbol: '',
        unit: '',
        definition: 'To replace a symbol with its numerical value (including units) to calculate the answer.',
        everydayNote: 'After rearranging to t = (v − u)/a, substitute the given numbers with units to get the answer.',
      },
    ],

    prerequisiteCheck: {
      questions: [
        {
          question: 'If 12 = 3 × x, what is x?',
          answers: ['4', '9', '15', '36'],
          correct: 0,
          feedback: 'Divide both sides by 3: x = 12 ÷ 3 = 4. Division is the inverse of multiplication — apply it to both sides.',
        },
        {
          question: 'Rearrange y = mx to make m the subject.',
          answers: ['m = y / x', 'm = xy', 'm = x / y', 'm = y − x'],
          correct: 0,
          feedback: 'Divide both sides by x: m = y / x. x is multiplying m, so the inverse (division by x) isolates m.',
        },
      ],
    },

    topicMapHint: {
      before: ['SI Units', 'Basic algebra (solving equations)'],
      current: 'Rearranging Equations',
      after: ['Every calculation topic in GCSE Physics', 'F = ma', 'v = u + at', 'Eₖ = ½mv²'],
    },

    workedExample: {
      title: 'Rearrange v = u + at to find t',
      equation: 't = (v − u) / a',
      context: 'A car accelerates from u = 5 m/s to v = 25 m/s with a = 4 m/s². Find the time taken.',
      steps: [
        {
          step: 1,
          action: 'Identify the subject you want',
          content: 'We want t. Currently, t is on the right side multiplied by a and added to u.',
          annotation: 'Always start by deciding what you are solving for. Here, t is hidden inside the expression u + at.',
        },
        {
          step: 2,
          action: 'Subtract u from both sides',
          content: 'v − u = u + at − u  →  v − u = at',
          annotation: 'Subtraction is the inverse of addition. Subtracting u from both sides removes it from the right side.',
        },
        {
          step: 3,
          action: 'Divide both sides by a',
          content: '(v − u) / a = at / a  →  t = (v − u) / a',
          annotation: 'Division is the inverse of multiplication. Dividing by a isolates t. Flip sides so t is on the left.',
        },
        {
          step: 4,
          action: 'Substitute and calculate',
          content: 't = (25 − 5) / 4 = 20 / 4 = 5 s',
          annotation: 'Substitute numbers with units: (25 m/s − 5 m/s) ÷ 4 m/s² = 20/4 = 5 s. Units cancel correctly. ✓',
        },
      ],
      misconceptionAfter: {
        claim: 'I can use an equation triangle for v = u + at: cover t, read off v/ua.',
        reality: 'Equation triangles only work for y = x × z. Here, at = v − u (not v × u). A triangle would give the wrong answer. Use algebra only.',
        visual: 'Triangle: covers t → reads v/(ua) which is wrong. Algebra: t = (v − u)/a which is correct.',
      },
    },

    guidedPractice: {
      tier1: {
        question: 'Rearrange P = IV to find I. Then calculate I when P = 60 W and V = 230 V.',
        allSteps: ['P = IV — we want I', 'Divide both sides by V: I = P / V', 'Substitute: I = 60 / 230', '??? — calculate I (give answer to 2 s.f.)'],
        missingStep: 3,
        missingHint: 'Calculate 60 ÷ 230 and round to 2 s.f.',
        answer: 0.26,
        answerUnit: 'A',
      },
      tier2: {
        question: 'Rearrange Eₖ = ½mv² to find m. Then calculate m when Eₖ = 1800 J and v = 6 m/s.',
        shownEquation: 'Eₖ = ½mv²',
        shownStep1: 'Multiply both sides by 2: 2Eₖ = mv²',
        hint: 'Divide both sides by v²: m = 2Eₖ / v². Then substitute numbers.',
        answer: 100,
        answerUnit: 'kg',
      },
      tier3: {
        question: 'Rearrange Q = mcΔT to find c. Then calculate c when Q = 84 000 J, m = 2 kg, ΔT = 20°C.',
        hint: 'Divide both sides by mΔT to isolate c: c = Q / (mΔT)',
        methodHint: 'c = 84 000 / (2 × 20) = 84 000 / 40 = 2100 J/kg°C',
        answer: 2100,
        answerUnit: 'J/kg°C',
      },
    },

    summary: {
      equation: 'Perform the same inverse operation on both sides',
      sentence: 'To rearrange an equation: isolate the subject by applying inverse operations to both sides (÷→×, +→−, x²→√). Then substitute numbers and always include units.',
      promptText: 'Without looking: state the two-step method for rearranging any equation. Then rearrange F = ma to find m, and rearrange P = IV to find V.',
    },

    sessionRecap: [
      'To rearrange any equation, perform the same inverse operation on both sides: division undoes multiplication, subtraction undoes addition, and square roots undo squaring.',
      'Equation triangles only work for equations of the form y = x × z. They fail for v = u + at, Eₖ = ½mv², and Q = mcΔT — these require proper algebraic rearrangement.',
      'After rearranging, always substitute the numerical values with their units, check the answer has the correct unit, and sense-check that the magnitude is physically reasonable.',
    ],
  },
}
