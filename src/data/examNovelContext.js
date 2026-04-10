/**
 * examNovelContext.js — Grade 9 discriminator: unfamiliar context 6-mark questions
 *
 * AQA constructs these by presenting a scenario the student has never seen,
 * then asking them to apply standard GCSE equations to it. The physics is
 * always within the spec — only the context is unfamiliar.
 *
 * Schema:
 * {
 *   type: 'novel-context',
 *   topic: string,           // AQA topic area for filtering
 *   scenario: string,        // 2–4 sentence context paragraph
 *   question: string,        // the question stem
 *   questionSubtitle: string,
 *   markScheme: [string],    // 6 individual mark criteria
 *   modelAnswer: string,     // full model answer with **bold** key terms
 *   tier: 3,
 *   marks: 6,
 *   senNote: string,
 * }
 */

const examNovelContext = [

  // ─── ENERGY ───────────────────────────────────────────────────────────────
  {
    type: 'novel-context',
    topic: 'energy_equations',
    scenario: 'Engineers are testing a regenerative braking system for an electric bus. When the bus brakes, the electric motor runs in reverse and acts as a generator, converting kinetic energy back into electrical energy stored in the battery. The bus has a mass of 14 000 kg and travels at 18 m/s before braking. The regenerative system recovers 65% of the kinetic energy.',
    question: 'Evaluate whether regenerative braking is a significant improvement over conventional friction braking. Your answer should include a calculation of the energy recovered. [6 marks]',
    questionSubtitle: '6 marks — calculate, then evaluate with a justified conclusion',
    markScheme: [
      'Award 1 mark: KE = ½mv² = ½ × 14 000 × 18² = ½ × 14 000 × 324 = 2 268 000 J',
      'Award 1 mark: energy recovered = 0.65 × 2 268 000 = 1 474 200 J ≈ 1.47 MJ',
      'Award 1 mark: conventional friction braking dissipates all KE as heat / no energy is recovered',
      'Award 1 mark: regenerative braking reduces overall energy consumption / extends range of the bus',
      'Award 1 mark: limitation — only 65% efficiency / some energy still lost as heat in the motor/generator',
      'Award 1 mark: overall justified conclusion — e.g. significant improvement because 1.47 MJ per stop is returned to the battery, but the system is not perfect due to conversion losses',
    ],
    modelAnswer: '**Kinetic energy** of the bus = ½ × 14 000 × 18² = **2 268 000 J** (2.27 MJ). The regenerative system recovers 65% of this: 0.65 × 2 268 000 = **1 474 200 J ≈ 1.47 MJ** per braking event. In **conventional friction braking**, all of this kinetic energy is wasted as **heat** in the brake pads — none is recovered. Regenerative braking is a significant improvement because it **returns energy to the battery**, reducing the total electrical energy needed from the grid. However, it is not 100% efficient — 35% of kinetic energy (≈ 0.79 MJ) is still lost as heat. Overall, regenerative braking is worthwhile: recovering 1.47 MJ per stop across hundreds of stops per day substantially reduces running costs and carbon emissions.',
    tier: 3,
    marks: 6,
    senNote: 'Structure: (1) calculate KE, (2) calculate energy recovered, (3) compare to friction braking, (4) state the limitation, (5) give an overall conclusion.',
  },

  {
    type: 'novel-context',
    topic: 'energy_resources',
    scenario: 'A tidal lagoon generates electricity by trapping seawater at high tide, then releasing it through turbines as the tide falls. A proposed lagoon will hold 1.2 × 10¹⁰ kg of seawater at an average height of 4.5 m above the turbine outlet. The turbines and generators operate at 28% efficiency. (g = 10 N/kg)',
    question: 'Evaluate the tidal lagoon as a method of generating electricity, using a calculation of the electrical energy output per tidal cycle. [6 marks]',
    questionSubtitle: '6 marks — calculate GPE, apply efficiency, then evaluate',
    markScheme: [
      'Award 1 mark: GPE = mgh = 1.2 × 10¹⁰ × 10 × 4.5 = 5.4 × 10¹¹ J',
      'Award 1 mark: electrical energy = 0.28 × 5.4 × 10¹¹ = 1.512 × 10¹¹ J ≈ 1.5 × 10¹¹ J',
      'Award 1 mark: advantage — no fuel required / renewable / zero CO₂ during operation',
      'Award 1 mark: advantage — predictable / tidal cycles are known in advance unlike wind/solar',
      'Award 1 mark: disadvantage — low efficiency (28%) / only generates twice per day (tidal cycle)',
      'Award 1 mark: justified conclusion — suitable as reliable baseload contribution but cannot meet continuous demand alone',
    ],
    modelAnswer: '**GPE stored** = mgh = 1.2 × 10¹⁰ × 10 × 4.5 = **5.4 × 10¹¹ J**. With 28% efficiency, **electrical energy output** = 0.28 × 5.4 × 10¹¹ = **1.51 × 10¹¹ J** per tidal cycle. This is a substantial amount of energy. Advantages: **no fuel cost**, **no CO₂ emissions** during operation, and — unlike wind or solar — the tidal cycle is **highly predictable**, making output reliable. Disadvantages: the 28% efficiency means **72% of potential energy is wasted**, and generation only occurs **twice per day**. Overall, a tidal lagoon is a valuable **renewable** and **predictable** source, suitable as one part of a diverse energy mix, but insufficient as a sole electricity source due to its intermittent generation pattern.',
    tier: 3,
    marks: 6,
    senNote: 'GPE = mgh (mass in kg, g = 10, h in m). Multiply by efficiency (as a decimal) to get electrical output. Then evaluate advantages and disadvantages.',
  },

  // ─── FORCES ───────────────────────────────────────────────────────────────
  {
    type: 'novel-context',
    topic: 'momentum',
    scenario: 'In a car crash test, a dummy (mass 75 kg) travels at 15 m/s. The car crumples on impact, bringing the dummy to rest in 0.12 s. A second test uses an airbag, increasing the stopping time to 0.45 s.',
    question: 'Compare the force experienced by the dummy in each test and evaluate the safety benefit of the airbag. [6 marks]',
    questionSubtitle: '6 marks — calculate both forces, then evaluate',
    markScheme: [
      'Award 1 mark: change in momentum = m × Δv = 75 × 15 = 1125 kg m/s (same in both tests)',
      'Award 1 mark: force without airbag = Δp/t = 1125 ÷ 0.12 = 9375 N',
      'Award 1 mark: force with airbag = Δp/t = 1125 ÷ 0.45 = 2500 N',
      'Award 1 mark: airbag reduces force by 9375 − 2500 = 6875 N / force is 3.75× smaller with airbag',
      'Award 1 mark: the change in momentum is the same in both cases — airbag does not change Δp, only the time over which it acts',
      'Award 1 mark: longer stopping time → smaller force → less injury / airbag significantly reduces risk of serious injury or death',
    ],
    modelAnswer: '**Change in momentum** = m × Δv = 75 × 15 = **1125 kg m/s** in both tests. **Without airbag:** F = Δp/t = 1125 ÷ 0.12 = **9375 N**. **With airbag:** F = Δp/t = 1125 ÷ 0.45 = **2500 N**. The airbag reduces the force by **6875 N** — making it **3.75 times smaller**. Crucially, the **change in momentum is identical** in both cases — the airbag does not change how much the dummy must decelerate. What it changes is the **time** over which the force is applied. By spreading the same impulse over a longer time, the force is drastically reduced. This is the key safety principle: a longer stopping time produces a smaller force, greatly reducing the risk of injury to internal organs, ribs, and the skull.',
    tier: 3,
    marks: 6,
    senNote: 'F = Δp/t. Both dummies have the same Δp. The airbag increases t → reduces F. Calculate both forces and compare.',
  },

  {
    type: 'novel-context',
    topic: 'equations_of_motion',
    scenario: 'Scientists study the motion of asteroids approaching Earth. An asteroid is detected 2.4 × 10⁶ km from Earth travelling at 18 km/s directly towards Earth. It decelerates due to gravitational interaction with a nearby moon at 0.006 m/s² for the first 50 000 s of its journey.',
    question: 'Calculate the velocity of the asteroid after 50 000 s of deceleration and the distance it travels in this time. State any assumptions you make. [6 marks]',
    questionSubtitle: '6 marks — apply SUVAT equations to an unfamiliar astronomical context',
    markScheme: [
      'Award 1 mark: correct identification of u = 18 000 m/s (convert km/s to m/s), a = −0.006 m/s², t = 50 000 s',
      'Award 1 mark: v = u + at = 18 000 + (−0.006 × 50 000) = 18 000 − 300 = 17 700 m/s',
      'Award 1 mark: s = ut + ½at² = 18 000 × 50 000 + ½ × (−0.006) × 50 000²',
      'Award 1 mark: s = 9 × 10⁸ − 7.5 × 10⁶ = 8.925 × 10⁸ m ≈ 8.93 × 10⁸ m',
      'Award 1 mark: assumption stated — deceleration is constant/uniform throughout the 50 000 s',
      'Award 1 mark: assumption — no other forces act on the asteroid / gravitational effects from Earth negligible during this period',
    ],
    modelAnswer: '**Given:** u = 18 km/s = **18 000 m/s**, a = **−0.006 m/s²** (deceleration), t = **50 000 s**. Using **v = u + at**: v = 18 000 + (−0.006 × 50 000) = 18 000 − 300 = **17 700 m/s**. Using **s = ut + ½at²**: s = (18 000 × 50 000) + ½ × (−0.006) × (50 000)² = 9 × 10⁸ − 7.5 × 10⁶ = **8.925 × 10⁸ m ≈ 8.93 × 10⁸ m**. **Assumptions:** (1) the deceleration is constant throughout the 50 000 s; (2) no other significant forces act on the asteroid during this period.',
    tier: 3,
    marks: 6,
    senNote: 'Convert km/s to m/s first (× 1000). Deceleration is negative a. Apply v = u + at then s = ut + ½at². State your assumptions.',
  },

  // ─── ELECTRICITY ──────────────────────────────────────────────────────────
  {
    type: 'novel-context',
    topic: 'circuit_components',
    scenario: 'A coin validator in a vending machine works by passing a small current through a coin and measuring its resistance. Genuine coins have specific resistance values. A 20p coin has a resistance of 0.026 Ω. The validator applies a voltage of 0.065 V across the coin.',
    question: 'Evaluate whether a single resistance measurement is sufficient to identify a genuine coin. Your answer should include a calculation of the current through the coin and the power dissipated. [6 marks]',
    questionSubtitle: '6 marks — two calculations plus a critical evaluation',
    markScheme: [
      'Award 1 mark: I = V/R = 0.065 ÷ 0.026 = 2.5 A',
      'Award 1 mark: P = IV = 2.5 × 0.065 = 0.1625 W ≈ 0.16 W (or P = I²R = 6.25 × 0.026 = 0.1625 W)',
      'Award 1 mark: a single resistance measurement may not be sufficient — a fake coin could have the same resistance',
      'Award 1 mark: resistance depends on material AND dimensions (length, cross-section) — a fake of the correct size and material would pass',
      'Award 1 mark: additional checks could include mass, diameter, thickness, or magnetic properties',
      'Award 1 mark: overall evaluation — resistance alone is not sufficient; a combination of physical measurements is needed for reliable identification',
    ],
    modelAnswer: '**Current:** I = V/R = 0.065 ÷ 0.026 = **2.5 A**. **Power:** P = IV = 2.5 × 0.065 = **0.163 W**. A single resistance measurement is **not sufficient** to guarantee a genuine coin. Resistance depends on both **material and dimensions** (R = ρL/A): a fake coin made from a different alloy but with different dimensions could produce the same resistance. For reliable identification, additional measurements are needed — such as **mass** (to detect hollow fakes), **diameter and thickness** (to confirm geometry), and **magnetic susceptibility** (genuine coins have specific ferromagnetic properties). **Conclusion:** resistance is a useful first check but must be combined with other measurements for a reliable coin-validation system.',
    tier: 3,
    marks: 6,
    senNote: 'Calculate I = V/R and P = IV first. Then critically evaluate: what could fool the system? What additional checks would help?',
  },

  // ─── WAVES ────────────────────────────────────────────────────────────────
  {
    type: 'novel-context',
    topic: 'sound_ultrasound',
    scenario: 'Bats use echolocation to navigate and hunt. A bat emits a pulse of ultrasound at 50 000 Hz and detects the echo from an insect 0.008 s later. The speed of sound in air is 340 m/s. The bat can detect frequency shifts in the returning echo due to the Doppler effect — if the insect is moving towards the bat, the returned frequency is higher than emitted.',
    question: 'Calculate the distance to the insect and explain how the bat can determine whether the insect is moving towards or away from it using only sound. [6 marks]',
    questionSubtitle: '6 marks — calculation plus conceptual explanation',
    markScheme: [
      'Award 1 mark: total distance = speed × time = 340 × 0.008 = 2.72 m',
      'Award 1 mark: distance to insect = 2.72 ÷ 2 = 1.36 m (divide by 2 — echo travels there and back)',
      'Award 1 mark: the Doppler effect causes a change in observed frequency when source or observer moves',
      'Award 1 mark: if the insect moves towards the bat, the returning echo has a higher frequency than emitted',
      'Award 1 mark: if the insect moves away from the bat, the returning echo has a lower frequency than emitted',
      'Award 1 mark: the bat\'s brain compares emitted and received frequency — the direction and speed of movement can be determined from the magnitude and sign of the frequency shift',
    ],
    modelAnswer: '**Distance:** total distance = v × t = 340 × 0.008 = 2.72 m. Since the pulse travels to the insect and back: distance = 2.72 ÷ 2 = **1.36 m**. The bat uses the **Doppler effect** to detect movement. When the insect **moves towards** the bat, the returning sound waves are compressed — the bat receives a **higher frequency** than emitted. When the insect **moves away**, the waves are stretched — a **lower frequency** is received. By comparing the emitted frequency (50 000 Hz) with the received frequency, the bat can determine: (1) whether the insect is approaching or retreating (from the direction of frequency shift), and (2) the speed of movement (from the magnitude of the shift). This allows the bat to predict the insect\'s future position and intercept it accurately.',
    tier: 3,
    marks: 6,
    senNote: 'Divide total distance by 2 (sound travels there AND back). Doppler: moving towards → higher frequency returned; moving away → lower frequency.',
  },

  // ─── ATOMIC STRUCTURE ─────────────────────────────────────────────────────
  {
    type: 'novel-context',
    topic: 'nuclear_fission',
    scenario: 'Scientists are investigating the use of small modular reactors (SMRs) — compact nuclear fission reactors that can be factory-built and transported to remote locations. An SMR produces 300 MW of electrical power and operates at 33% efficiency. The uranium fuel rods are replaced every 3 years.',
    question: 'Evaluate the use of SMRs as an alternative to large traditional nuclear power stations for providing electricity to remote communities. [6 marks]',
    questionSubtitle: '6 marks — include a power calculation in your evaluation',
    markScheme: [
      'Award 1 mark: thermal power = electrical power ÷ efficiency = 300 MW ÷ 0.33 = 909 MW ≈ 910 MW thermal',
      'Award 1 mark: or: energy wasted as heat = 910 − 300 = 610 MW',
      'Award 1 mark: advantage — compact and factory-built / can be transported to remote locations without large construction infrastructure',
      'Award 1 mark: advantage — no CO₂ emissions during operation / low-carbon electricity for communities off the main grid',
      'Award 1 mark: disadvantage — produces radioactive waste requiring safe disposal / security risk of nuclear material in remote locations',
      'Award 1 mark: justified conclusion — SMRs are suitable for remote communities that cannot connect to the national grid and need reliable low-carbon power, despite waste management challenges',
    ],
    modelAnswer: '**Thermal power** = electrical power ÷ efficiency = 300 ÷ 0.33 = **909 MW** (approximately). This means **609 MW is wasted as heat**. **Advantages of SMRs:** their compact, modular design allows them to be **factory-built and transported** to locations where large-scale construction is impossible. They produce **no CO₂** during operation, providing low-carbon electricity to remote communities. The 3-year refuelling cycle minimises disruption. **Disadvantages:** they produce **radioactive waste** requiring secure long-term storage — particularly challenging in remote locations. There are also **security concerns** about transporting nuclear fuel to dispersed sites. **Overall conclusion:** SMRs are well-suited to remote communities needing reliable, low-carbon power independent of the national grid, provided that waste management and security protocols are rigorously enforced. The high efficiency (33%) is comparable to traditional large nuclear stations, making the technology viable.',
    tier: 3,
    marks: 6,
    senNote: 'Calculate thermal power first (electrical ÷ efficiency). Then structure: advantage 1, advantage 2, disadvantage 1, disadvantage 2, conclusion.',
  },

  // ─── PARTICLE MODEL ───────────────────────────────────────────────────────
  {
    type: 'novel-context',
    topic: 'gas_pressure',
    scenario: 'A scientist is studying a sealed gas syringe used in a chemistry experiment. The syringe contains 80 cm³ of gas at a pressure of 1.0 × 10⁵ Pa and a temperature of 300 K. The syringe is heated to 360 K while the volume is kept constant by locking the plunger.',
    question: 'Calculate the new pressure of the gas and explain, in terms of particle behaviour, why the pressure increases when temperature rises at constant volume. [6 marks]',
    questionSubtitle: '6 marks — calculation using gas law plus particle-level explanation',
    markScheme: [
      'Award 1 mark: use P₁/T₁ = P₂/T₂ (pressure law at constant volume)',
      'Award 1 mark: P₂ = P₁ × T₂/T₁ = 1.0 × 10⁵ × 360/300 = 1.2 × 10⁵ Pa',
      'Award 1 mark: when temperature increases, the kinetic energy of the gas particles increases',
      'Award 1 mark: particles move faster / have greater average speed',
      'Award 1 mark: particles collide with the walls more frequently',
      'Award 1 mark: particles hit the walls with greater force / greater momentum change per collision → pressure increases',
    ],
    modelAnswer: '**Calculation:** Using the pressure law (constant volume): P₁/T₁ = P₂/T₂. P₂ = P₁ × T₂/T₁ = 1.0 × 10⁵ × (360/300) = **1.2 × 10⁵ Pa**. **Particle explanation:** When temperature rises, the gas particles gain **kinetic energy** and move with **greater average speed**. At constant volume, the same number of particles occupy the same space, so they collide with the container walls **more frequently**. Each collision also involves a **greater change in momentum**, exerting a larger force on the wall. Since pressure = force ÷ area, and both the frequency and force of collisions increase, the **pressure rises** proportionally with absolute temperature.',
    tier: 3,
    marks: 6,
    senNote: 'Use temperatures in KELVIN. P₁/T₁ = P₂/T₂. Then explain: more temperature → more KE → faster particles → more frequent collisions → more force → higher pressure.',
  },

  // ─── SPACE PHYSICS ────────────────────────────────────────────────────────
  {
    type: 'novel-context',
    topic: 'stellar_evolution',
    scenario: 'Astronomers observe a distant galaxy and notice that the absorption lines in its spectrum are all shifted towards longer wavelengths compared to the same lines measured in a laboratory on Earth. The hydrogen line that appears at 656 nm in the lab is observed at 689 nm from the galaxy.',
    question: 'Calculate the recessional speed of the galaxy and explain what this observation tells us about the origin and fate of the universe. [6 marks]',
    questionSubtitle: '6 marks — redshift calculation plus cosmological explanation',
    markScheme: [
      'Award 1 mark: redshift z = (observed − emitted) / emitted = (689 − 656) / 656 = 33/656 = 0.0503',
      'Award 1 mark: recessional speed v = z × c = 0.0503 × 3 × 10⁸ = 1.51 × 10⁷ m/s ≈ 1.5 × 10⁷ m/s',
      'Award 1 mark: all distant galaxies show redshift — they are all moving away from us',
      'Award 1 mark: more distant galaxies have greater redshift / are receding faster (Hubble\'s law)',
      'Award 1 mark: this is evidence that the universe is expanding / supports the Big Bang theory',
      'Award 1 mark: if the universe is expanding now, it must have been smaller in the past / extrapolating back leads to the Big Bang / the ultimate fate depends on the density of the universe (could expand forever or eventually contract)',
    ],
    modelAnswer: '**Redshift:** z = (λ_obs − λ_emit) / λ_emit = (689 − 656) / 656 = 33/656 = **0.0503**. **Recessional speed:** v = z × c = 0.0503 × 3 × 10⁸ = **1.51 × 10⁷ m/s** (about 5% of the speed of light). This galaxy is moving away from Earth at 15 million m/s. **Cosmological significance:** observations show that **virtually all galaxies are redshifted**, meaning they are all receding from us. Furthermore, **more distant galaxies recede faster** — this is **Hubble\'s Law**. This is strong evidence that the **universe is expanding**. Tracing this expansion backwards in time suggests the universe originated from an extremely hot, dense point approximately 13.8 billion years ago — the **Big Bang**. The ultimate fate of the universe depends on its total mass-energy density: it may expand forever or eventually reverse (the Big Crunch), though current evidence favours continued expansion.',
    tier: 3,
    marks: 6,
    senNote: 'Redshift z = (observed − emitted) / emitted. Speed v = z × c (c = 3 × 10⁸ m/s). Then explain: galaxies moving apart → universe expanding → Big Bang evidence.',
  },

]

export default examNovelContext
