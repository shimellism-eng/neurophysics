/**
 * examChained.js - Grade 9 discriminator: multi-step chained-equation calculations
 *
 * These questions require the student to identify WHICH two (or three) equations
 * to link, without being told - the primary Grade 9 filter in GCSE Physics papers.
 *
 * Schema matches examCalculations.js but type = "calculation-chained" and tier = 3.
 */

const examChained = {

  // ─── ENERGY ───────────────────────────────────────────────────────────────

  energy_equations: [
    {
      type: 'calculation-chained',
      question: 'A spring (spring constant 735 N/m) is compressed by 0.40 m and used to launch a 0.060 kg ball vertically. Assuming all elastic potential energy converts to gravitational potential energy, calculate the maximum height reached by the ball. (g = 10 N/kg)',
      questionSubtitle: 'Chain Ee = ½ke² then GPE = mgh - show both equations [5 marks]',
      equation: 'Ee = ½ke²  →  GPE = mgh',
      steps: [
        { label: 'Calculate elastic PE stored in the spring', value: '58.8', unit: 'J', hint: 'Ee = ½ × 735 × 0.40² = ½ × 735 × 0.16 = 58.8 J' },
        { label: 'Set GPE = Ee (energy conservation)', value: '58.8', unit: 'J', hint: 'All elastic PE → gravitational PE at maximum height' },
        { label: 'Rearrange GPE = mgh for h', value: 'h = GPE ÷ (mg)', unit: '', hint: 'h = E ÷ (m × g)' },
        { label: 'Calculate maximum height', value: '98', unit: 'm', hint: 'h = 58.8 ÷ (0.060 × 10) = 58.8 ÷ 0.60 = 98 m' },
      ],
      answer: 98,
      answerUnit: 'm',
      acceptRange: [96, 100],
      commonMistake: 'Did you forget to set Ee = GPE? The link between the two equations is energy conservation. Also check: extension must be in metres before squaring.',
      tier: 3,
      senNote: 'Step 1: find Ee using the spring. Step 2: that energy becomes GPE. Step 3: rearrange GPE = mgh to find h.',
    },
    {
      type: 'calculation-chained',
      question: 'A 1200 kg car travels at 30 m/s. The driver brakes and the car decelerates uniformly to rest. The braking force is 9000 N. Calculate the braking distance.',
      questionSubtitle: 'Chain KE = ½mv² then work done W = Fs - show both equations [4 marks]',
      equation: 'KE = ½mv²  →  W = Fs',
      steps: [
        { label: 'Calculate kinetic energy of the car', value: '540000', unit: 'J', hint: 'KE = ½ × 1200 × 30² = ½ × 1200 × 900 = 540 000 J' },
        { label: 'Set work done by brakes = KE (energy conservation)', value: '540000', unit: 'J', hint: 'All KE is removed by the braking force: W = KE' },
        { label: 'Rearrange W = Fs for distance s', value: 's = W ÷ F', unit: '', hint: 's = W ÷ F' },
        { label: 'Calculate braking distance', value: '60', unit: 'm', hint: 's = 540 000 ÷ 9000 = 60 m' },
      ],
      answer: 60,
      answerUnit: 'm',
      acceptRange: [59, 61],
      commonMistake: 'The braking force removes the kinetic energy. Set W = KE, then rearrange W = Fs for s. Don\'t use v² = u² + 2as here - the work-energy route is more direct.',
      tier: 3,
      senNote: 'Kinetic energy → work done by brakes. KE = ½mv², W = Fs. The energy is "used up" stopping the car.',
    },
    {
      type: 'calculation-chained',
      question: 'A kettle heats 0.80 kg of water from 20 °C to 100 °C. The specific heat capacity of water is 4200 J/kg°C. The kettle has a power rating of 2800 W. Calculate the time taken to boil the water.',
      questionSubtitle: 'Chain E = mcΔθ then P = E/t - show both equations [4 marks]',
      equation: 'E = mcΔθ  →  P = E/t',
      steps: [
        { label: 'Calculate temperature change', value: '80', unit: '°C', hint: 'Δθ = 100 − 20 = 80 °C' },
        { label: 'Calculate energy needed', value: '268800', unit: 'J', hint: 'E = 0.80 × 4200 × 80 = 268 800 J' },
        { label: 'Rearrange P = E/t for time t', value: 't = E ÷ P', unit: '', hint: 't = E ÷ P' },
        { label: 'Calculate time', value: '96', unit: 's', hint: 't = 268 800 ÷ 2800 = 96 s' },
      ],
      answer: 96,
      answerUnit: 's',
      acceptRange: [94, 98],
      commonMistake: 'Calculate the energy first, then use P = E/t. Don\'t forget Δθ = final − initial temperature.',
      tier: 3,
      senNote: 'Two steps: (1) how much energy? E = mcΔθ. (2) how long? t = E ÷ P.',
    },
  ],

  // ─── FORCES ───────────────────────────────────────────────────────────────

  equations_of_motion: [
    {
      type: 'calculation-chained',
      question: 'A train (mass 240 000 kg) travels at 60 m/s. The braking force is 270 000 N. Calculate the braking distance.',
      questionSubtitle: 'Two valid routes: (A) F = ma then v² = u² + 2as  OR  (B) KE = ½mv² then W = Fs [6 marks]',
      equation: 'F = ma  →  v² = u² + 2as   OR   KE = ½mv²  →  W = Fs',
      steps: [
        { label: 'Route A - Calculate deceleration using F = ma', value: '1.125', unit: 'm/s²', hint: 'a = F ÷ m = 270 000 ÷ 240 000 = 1.125 m/s²' },
        { label: 'Apply v² = u² + 2as with v = 0, u = 60', value: '0 = 3600 − 2.25s', unit: '', hint: 'v² = u² + 2as → 0 = 60² − 2 × 1.125 × s' },
        { label: 'Rearrange for s', value: '1600', unit: 'm', hint: 's = 3600 ÷ 2.25 = 1600 m' },
      ],
      answer: 1600,
      answerUnit: 'm',
      acceptRange: [1580, 1620],
      commonMistake: 'Remember v = 0 (train stops). In v² = u² + 2as, deceleration is negative: a = −1.125 m/s². Rearranging: s = u² ÷ (2 × 1.125).',
      tier: 3,
      senNote: 'Use F = ma to find deceleration first. Then use v² = u² + 2as with v = 0 (stopped) and u = 60 m/s.',
    },
    {
      type: 'calculation-chained',
      question: 'A skydiver (mass 75 kg) falls from rest. After 4 seconds (before reaching terminal velocity), calculate: (a) the velocity and (b) the distance fallen. Assume g = 10 m/s² and no air resistance.',
      questionSubtitle: 'Chain v = u + at then s = ut + ½at² [4 marks]',
      equation: 'v = u + at  →  s = ut + ½at²',
      steps: [
        { label: 'Calculate velocity after 4 s (u = 0)', value: '40', unit: 'm/s', hint: 'v = 0 + 10 × 4 = 40 m/s' },
        { label: 'Calculate distance fallen in 4 s', value: '80', unit: 'm', hint: 's = 0 × 4 + ½ × 10 × 4² = 0 + ½ × 10 × 16 = 80 m' },
      ],
      answer: 80,
      answerUnit: 'm',
      acceptRange: [78, 82],
      commonMistake: 'In s = ut + ½at², u = 0 so the first term disappears. s = ½ × 10 × 16 = 80 m. Don\'t forget to square the time.',
      tier: 3,
      senNote: 'Step 1: v = u + at gives speed. Step 2: s = ut + ½at² gives distance. Here u = 0 (starts from rest).',
    },
  ],

  momentum: [
    {
      type: 'calculation-chained',
      question: 'A 0.16 kg ball hits a wall at 12 m/s and bounces back at 8 m/s. The contact time is 0.004 s. Calculate the force exerted on the ball by the wall.',
      questionSubtitle: 'Chain Δp = m(v − u) then F = Δp/t [5 marks]',
      equation: 'Δp = m(v − u)  →  F = Δp/t',
      steps: [
        { label: 'Define direction: take initial direction as positive', value: 'u = +12, v = −8', unit: 'm/s', hint: 'Bounce back means opposite direction → v is negative' },
        { label: 'Calculate change in momentum', value: '−3.2', unit: 'kg m/s', hint: 'Δp = 0.16 × (−8 − 12) = 0.16 × (−20) = −3.2 kg m/s' },
        { label: 'Calculate magnitude of force', value: '800', unit: 'N', hint: 'F = Δp ÷ t = 3.2 ÷ 0.004 = 800 N' },
      ],
      answer: 800,
      answerUnit: 'N',
      acceptRange: [790, 810],
      commonMistake: 'The ball changes direction - so v is negative if u is positive. Change in velocity = v − u = −8 − 12 = −20 m/s, not −8 − (−12).',
      tier: 3,
      senNote: 'Key: the ball bounces back, so its velocity changes sign. Δv = final − initial = −8 − (+12) = −20 m/s.',
    },
  ],

  hookes_law: [
    {
      type: 'calculation-chained',
      question: 'A spring (k = 50 N/m) is compressed by 0.12 m and used to launch a 0.020 kg toy horizontally on a frictionless surface. Calculate the launch speed of the toy.',
      questionSubtitle: 'Chain Ee = ½ke² then KE = ½mv² [5 marks]',
      equation: 'Ee = ½ke²  →  KE = ½mv²',
      steps: [
        { label: 'Calculate elastic PE stored in the spring', value: '0.36', unit: 'J', hint: 'Ee = ½ × 50 × 0.12² = ½ × 50 × 0.0144 = 0.36 J' },
        { label: 'Set KE = Ee at launch (energy conservation)', value: '0.36', unit: 'J', hint: 'All elastic PE → kinetic energy on launch' },
        { label: 'Rearrange KE = ½mv² for v', value: 'v = √(2KE ÷ m)', unit: '', hint: 'v = √(2 × 0.36 ÷ 0.020)' },
        { label: 'Calculate launch speed', value: '6', unit: 'm/s', hint: 'v = √(0.72 ÷ 0.020) = √36 = 6 m/s' },
      ],
      answer: 6,
      answerUnit: 'm/s',
      acceptRange: [5.9, 6.1],
      commonMistake: 'Don\'t forget to convert mass to kg. Also: rearranging ½mv² = Ee gives v = √(2Ee/m). Square root at the end!',
      tier: 3,
      senNote: 'Spring energy → kinetic energy. Ee = ½ke². Then KE = ½mv², rearrange for v: v = √(2KE/m).',
    },
  ],

  // ─── ELECTRICITY ──────────────────────────────────────────────────────────

  national_grid: [
    {
      type: 'calculation-chained',
      question: 'A transformer steps up voltage from 25 000 V to 400 000 V. The primary coil has 500 turns. The output current is 800 A. Calculate (a) the number of turns in the secondary coil and (b) the input current (assume 100% efficiency).',
      questionSubtitle: 'Chain Vs/Vp = Ns/Np then P = IV [5 marks]',
      equation: 'Vs/Vp = Ns/Np  →  Pout = Vout × Iout = Pin = Vin × Iin',
      steps: [
        { label: 'Calculate secondary turns using turns ratio', value: '8000', unit: 'turns', hint: 'Ns/Np = Vs/Vp → Ns = 500 × (400 000 ÷ 25 000) = 500 × 16 = 8000' },
        { label: 'Calculate output power', value: '320000000', unit: 'W', hint: 'Pout = Vout × Iout = 400 000 × 800 = 3.2 × 10⁸ W' },
        { label: 'Set Pin = Pout (100% efficiency)', value: '320000000', unit: 'W', hint: 'Input power = output power for an ideal transformer' },
        { label: 'Calculate input current', value: '12800', unit: 'A', hint: 'Iin = Pin ÷ Vin = 3.2 × 10⁸ ÷ 25 000 = 12 800 A' },
      ],
      answer: 12800,
      answerUnit: 'A',
      acceptRange: [12700, 12900],
      commonMistake: 'Use P = IV for both sides of the transformer. At 100% efficiency: Pin = Pout. Don\'t mix up which current is input and which is output.',
      tier: 3,
      senNote: 'Step-up transformer: more turns on secondary, higher voltage. Power is conserved: P = IV on both sides.',
    },
    {
      type: 'calculation-chained',
      question: 'A power cable has resistance 4.0 Ω. Electrical power is transmitted at 20 000 V. The current in the cable is 50 A. Calculate the power lost in the cable and express this as a percentage of the total power transmitted.',
      questionSubtitle: 'Chain Ploss = I²R then Ptotal = IV [4 marks]',
      equation: 'Ploss = I²R  →  Ptotal = IV',
      steps: [
        { label: 'Calculate power lost in the cable', value: '10000', unit: 'W', hint: 'Ploss = I² × R = 50² × 4.0 = 2500 × 4.0 = 10 000 W' },
        { label: 'Calculate total power transmitted', value: '1000000', unit: 'W', hint: 'Ptotal = I × V = 50 × 20 000 = 1 000 000 W' },
        { label: 'Calculate percentage power lost', value: '1', unit: '%', hint: '% loss = (10 000 ÷ 1 000 000) × 100 = 1%' },
      ],
      answer: 1,
      answerUnit: '%',
      acceptRange: [0.9, 1.1],
      commonMistake: 'Use Ploss = I²R (not P = V²/R) because you know the current through the cable. Then Ptotal = IV uses the transmission voltage.',
      tier: 3,
      senNote: 'Two separate power calculations: loss in cable (I²R) and total transmitted (IV). The ratio gives % loss.',
    },
  ],

  circuit_basics: [
    {
      type: 'calculation-chained',
      question: 'A charge of 600 C flows through a circuit in 5 minutes. The circuit has a total resistance of 12 Ω. Calculate the voltage of the power supply.',
      questionSubtitle: 'Chain I = Q/t then V = IR [4 marks]',
      equation: 'I = Q/t  →  V = IR',
      steps: [
        { label: 'Convert time to seconds', value: '300', unit: 's', hint: '5 minutes × 60 = 300 s' },
        { label: 'Calculate current using I = Q/t', value: '2', unit: 'A', hint: 'I = 600 ÷ 300 = 2 A' },
        { label: 'Calculate voltage using V = IR', value: '24', unit: 'V', hint: 'V = 2 × 12 = 24 V' },
      ],
      answer: 24,
      answerUnit: 'V',
      acceptRange: [23.5, 24.5],
      commonMistake: 'Convert minutes to seconds first! 5 minutes = 300 s. I = Q/t gives current; then V = IR gives voltage.',
      tier: 3,
      senNote: 'Step 1: find current (I = Q/t, convert minutes → seconds). Step 2: use Ohm\'s law (V = IR).',
    },
  ],

  // ─── PARTICLE MODEL ───────────────────────────────────────────────────────

  specific_latent_heat: [
    {
      type: 'calculation-chained',
      question: 'A 2.5 kW electric hob melts 0.40 kg of ice at 0 °C in 56 seconds. Calculate the specific latent heat of fusion of ice.',
      questionSubtitle: 'Chain E = Pt then L = E/m [4 marks]',
      equation: 'E = Pt  →  L = E/m',
      steps: [
        { label: 'Calculate energy supplied by the hob', value: '140000', unit: 'J', hint: 'E = P × t = 2500 × 56 = 140 000 J' },
        { label: 'Set energy supplied = energy for melting', value: '140000', unit: 'J', hint: 'All energy goes into melting: E = mL' },
        { label: 'Rearrange L = E/m', value: 'L = E ÷ m', unit: '', hint: 'L = 140 000 ÷ 0.40' },
        { label: 'Calculate specific latent heat', value: '350000', unit: 'J/kg', hint: 'L = 140 000 ÷ 0.40 = 350 000 J/kg' },
      ],
      answer: 350000,
      answerUnit: 'J/kg',
      acceptRange: [345000, 355000],
      commonMistake: 'Convert kW to W first: 2.5 kW = 2500 W. Energy = Power × time. Then L = E/m, not E = mL (rearrange it!).',
      tier: 3,
      senNote: 'Power × time = energy supplied. That energy melts the ice: E = mL. Rearrange for L.',
    },
  ],

  // ─── WAVES ────────────────────────────────────────────────────────────────

  wave_properties: [
    {
      type: 'calculation-chained',
      question: 'A sound wave has a frequency of 680 Hz and travels through air at 340 m/s. The wave then enters water where its speed increases to 1500 m/s. Calculate the wavelength of the sound in water.',
      questionSubtitle: 'Frequency is constant across boundaries - use v = fλ twice [4 marks]',
      equation: 'v = fλ  (frequency unchanged at boundary)',
      steps: [
        { label: 'State: frequency is unchanged when wave crosses a boundary', value: '680', unit: 'Hz', hint: 'Frequency always stays the same when a wave crosses a boundary' },
        { label: 'Apply v = fλ in water', value: 'λ = v ÷ f', unit: '', hint: 'λ = 1500 ÷ 680' },
        { label: 'Calculate wavelength in water', value: '2.21', unit: 'm', hint: 'λ = 1500 ÷ 680 = 2.206... ≈ 2.21 m' },
      ],
      answer: 2.21,
      answerUnit: 'm',
      acceptRange: [2.18, 2.24],
      commonMistake: 'Frequency does NOT change when a wave crosses a boundary - only speed and wavelength change. Use the new speed (1500 m/s) with the same frequency.',
      tier: 3,
      senNote: 'Key rule: when a wave crosses a boundary, frequency stays the same. Only speed and wavelength change.',
    },
  ],

  // ─── ATOMIC STRUCTURE ─────────────────────────────────────────────────────

  half_life: [
    {
      type: 'calculation-chained',
      question: 'A radioactive sample has an initial activity of 6400 Bq. After 60 minutes the activity is 200 Bq. Calculate the half-life of the isotope.',
      questionSubtitle: 'Find number of half-lives, then calculate half-life [4 marks]',
      equation: 'A = A₀ ÷ 2ⁿ  →  t½ = total time ÷ n',
      steps: [
        { label: 'Find number of halvings: 6400 → 200', value: '5', unit: 'half-lives', hint: '6400 → 3200 → 1600 → 800 → 400 → 200. That\'s 5 halvings.' },
        { label: 'Calculate half-life', value: '12', unit: 'minutes', hint: 't½ = 60 ÷ 5 = 12 minutes' },
      ],
      answer: 12,
      answerUnit: 'minutes',
      acceptRange: [11.5, 12.5],
      commonMistake: 'Count how many times you halve to get from start to finish: 6400 → 3200 → 1600 → 800 → 400 → 200. That\'s 5 halvings. Half-life = 60 ÷ 5 = 12 min.',
      tier: 3,
      senNote: 'Halve repeatedly until you reach the final value. Count how many steps. Half-life = total time ÷ number of steps.',
    },
  ],

  // ─── MAGNETISM ────────────────────────────────────────────────────────────

  transformers: [
    {
      type: 'calculation-chained',
      question: 'A step-down transformer has 2000 turns on its primary coil and 50 turns on its secondary coil. The primary voltage is 230 V and the transformer is 95% efficient. The secondary current is 6.0 A. Calculate the primary current.',
      questionSubtitle: 'Chain turns ratio → secondary voltage → secondary power → primary power → primary current [6 marks]',
      equation: 'Vs/Vp = Ns/Np  →  Ps = Vs × Is  →  Pp = Ps ÷ efficiency  →  Ip = Pp ÷ Vp',
      steps: [
        { label: 'Calculate secondary voltage', value: '5.75', unit: 'V', hint: 'Vs = Vp × (Ns/Np) = 230 × (50/2000) = 230 × 0.025 = 5.75 V' },
        { label: 'Calculate secondary (output) power', value: '34.5', unit: 'W', hint: 'Ps = Vs × Is = 5.75 × 6.0 = 34.5 W' },
        { label: 'Calculate primary (input) power using efficiency', value: '36.3', unit: 'W', hint: 'Pp = Ps ÷ efficiency = 34.5 ÷ 0.95 = 36.3 W' },
        { label: 'Calculate primary current', value: '0.158', unit: 'A', hint: 'Ip = Pp ÷ Vp = 36.3 ÷ 230 = 0.158 A' },
      ],
      answer: 0.158,
      answerUnit: 'A',
      acceptRange: [0.15, 0.17],
      commonMistake: 'At 95% efficiency, input power ≠ output power. Pp = Ps ÷ 0.95 (you need MORE input to get the same output). Don\'t use P = IV with 100% efficiency assumption.',
      tier: 3,
      senNote: 'Chain: turns ratio → Vs → Ps → Pp (÷ efficiency) → Ip. Each step uses the result of the one before.',
    },
  ],

  // ─── FLUID PRESSURE ───────────────────────────────────────────────────────

  fluid_pressure: [
    {
      type: 'calculation-chained',
      question: 'A submarine hull will be crushed if the pressure difference between inside and outside exceeds 1.1 × 10⁸ Pa. The pressure inside is maintained at 1.0 × 10⁵ Pa. The density of seawater is 1026 kg/m³. Calculate the maximum safe depth. (g = 10 N/kg)',
      questionSubtitle: 'Find pressure difference, then use p = ρgh [5 marks]',
      equation: 'Δp = ρgh  →  h = Δp ÷ (ρg)',
      steps: [
        { label: 'Calculate maximum external pressure', value: '1.101 × 10⁸', unit: 'Pa', hint: 'Max external = internal + limit = 1.0×10⁵ + 1.1×10⁸ ≈ 1.101×10⁸ Pa (the internal is negligible)' },
        { label: 'Approximate: pressure difference ≈ 1.1 × 10⁸ Pa', value: '1.1 × 10⁸', unit: 'Pa', hint: 'Since 1.0×10⁵ << 1.1×10⁸, the pressure difference is approximately 1.1×10⁸ Pa' },
        { label: 'Rearrange p = ρgh for h', value: 'h = p ÷ (ρg)', unit: '', hint: 'h = Δp ÷ (ρ × g)' },
        { label: 'Calculate maximum depth', value: '10700', unit: 'm', hint: 'h = 1.1×10⁸ ÷ (1026 × 10) = 1.1×10⁸ ÷ 10260 ≈ 10 700 m' },
      ],
      answer: 10700,
      answerUnit: 'm',
      acceptRange: [10500, 11000],
      commonMistake: 'The pressure limit is the DIFFERENCE between outside and inside. Inside pressure = 1.0 × 10⁵ Pa is much smaller than 1.1 × 10⁸ Pa, so it\'s approximately just 1.1 × 10⁸ Pa.',
      tier: 3,
      senNote: 'The crushing pressure is the difference: outside − inside. Use p = ρgh and rearrange for depth h.',
    },
  ],

}

export default examChained
