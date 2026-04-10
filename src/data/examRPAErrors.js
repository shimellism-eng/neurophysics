/**
 * examRPAErrors.js — Grade 9 discriminator: "Too high / too low" error direction questions
 *
 * These appear in every AQA Physics paper. The student must:
 *   [1 mark] identify the source of error
 *   [1 mark] state the direction it affects the calculated value (too high / too low / no effect)
 *
 * Schema:
 * {
 *   type: 'rpa-error',
 *   rpaRef: string,          // e.g. 'RPA3'
 *   rpaName: string,         // e.g. 'Resistance of a wire'
 *   experiment: string,      // brief description of what the student did
 *   question: string,        // the actual question text
 *   questionSubtitle: string,
 *   errorSource: string,     // the cause of the error [mark 1]
 *   direction: 'high'|'low'|'no effect',  // direction of effect on result [mark 2]
 *   markScheme: [string, string],  // [mark 1 text, mark 2 text]
 *   tier: 3,
 *   marks: 2,
 *   senNote: string,
 * }
 */

const examRPAErrors = [

  // ─── RPA 3: Resistance of a Wire ──────────────────────────────────────────
  {
    type: 'rpa-error',
    rpaRef: 'RPA3',
    rpaName: 'Resistance of a wire',
    experiment: 'A student connects a nichrome wire in a circuit and measures the voltage across it and the current through it to calculate resistance (R = V/I). The student takes readings quickly without waiting between readings.',
    question: 'The wire gets hot during the experiment. Explain why this causes the student\'s value of resistance to be too high or too low.',
    questionSubtitle: '[2 marks] — identify the source of error and state the direction',
    errorSource: 'The wire heats up, which increases the resistance of the wire above its room-temperature value.',
    direction: 'high',
    markScheme: [
      '[1 mark] The resistance of the wire increases as the wire heats up / temperature causes increased resistance',
      '[1 mark] The measured resistance is too HIGH — the hot wire has higher resistance than at room temperature',
    ],
    tier: 3,
    marks: 2,
    senNote: 'Think: what happens to resistance when temperature rises? Metal resistance increases with temperature.',
  },

  {
    type: 'rpa-error',
    rpaRef: 'RPA3',
    rpaName: 'Resistance of a wire',
    experiment: 'A student uses crocodile clips to connect to a nichrome wire. The clips are positioned at 0 cm and 100 cm to measure a 100 cm length. However, the clips are placed on the wire 2 cm inside each end.',
    question: 'Explain why placing the crocodile clips 2 cm inside each end means the student\'s calculated resistance per metre is too high or too low.',
    questionSubtitle: '[2 marks]',
    errorSource: 'The effective length of wire being measured is shorter than intended — 96 cm instead of 100 cm.',
    direction: 'high',
    markScheme: [
      '[1 mark] The actual length of wire between the clips is shorter than recorded / the student measures a shorter length than intended',
      '[1 mark] The resistance per metre calculated is too HIGH — dividing the same resistance by a smaller length gives a larger value',
    ],
    tier: 3,
    marks: 2,
    senNote: 'Shorter length → same resistance for fewer metres → resistance per metre appears larger → too high.',
  },

  // ─── RPA 5: Density ───────────────────────────────────────────────────────
  {
    type: 'rpa-error',
    rpaRef: 'RPA5',
    rpaName: 'Density of materials',
    experiment: 'A student measures the volume of an irregular solid using a displacement measuring cylinder. The measuring cylinder has a resolution of 2 cm³ (graduations every 2 cm³). The student reads the volume to the nearest 2 cm³.',
    question: 'Explain how the resolution of the measuring cylinder affects the student\'s calculated value of density.',
    questionSubtitle: '[2 marks]',
    errorSource: 'The coarse resolution means the volume reading has a significant uncertainty — it could be up to 1 cm³ too high or too low.',
    direction: 'high',
    markScheme: [
      '[1 mark] The volume measurement has a large uncertainty / the resolution (2 cm³) is large relative to the object\'s volume / random error in reading',
      '[1 mark] If the volume is read as too LOW, the calculated density is too HIGH (ρ = m/V — smaller V gives larger ρ) / could be too high or too low depending on reading error',
    ],
    tier: 3,
    marks: 2,
    senNote: 'Density = mass ÷ volume. If volume is measured as too small, density comes out too large. Resolution error affects volume, which affects density.',
  },

  {
    type: 'rpa-error',
    rpaRef: 'RPA5',
    rpaName: 'Density of materials',
    experiment: 'A student measures the mass of an irregular stone using a top-pan balance, then lowers the stone into a measuring cylinder using a piece of string to find its volume by displacement. The student forgot to account for the mass of the string.',
    question: 'The student included the mass of the string in the recorded mass. Explain whether this makes the calculated density too high or too low.',
    questionSubtitle: '[2 marks]',
    errorSource: 'The string adds extra mass to the reading, making the recorded mass larger than the actual mass of the stone.',
    direction: 'high',
    markScheme: [
      '[1 mark] The recorded mass includes the string, so the mass value used is greater than the actual mass of the stone alone',
      '[1 mark] Density = m/V — with mass too high and correct volume, the calculated density is too HIGH',
    ],
    tier: 3,
    marks: 2,
    senNote: 'ρ = m/V. If m is too large and V is correct, ρ is too large → too high.',
  },

  // ─── RPA 4: I-V Characteristics ───────────────────────────────────────────
  {
    type: 'rpa-error',
    rpaRef: 'RPA4',
    rpaName: 'I-V characteristics',
    experiment: 'A student investigates the I-V characteristic of a filament lamp. They only take readings with current flowing in one direction (positive values only) and do not reverse the connections.',
    question: 'Explain why not reversing the connections means the student\'s graph cannot fully represent the I-V characteristic of the lamp. State the effect on the conclusion.',
    questionSubtitle: '[2 marks]',
    errorSource: 'Without reversing connections, the student only plots the positive half of the I-V characteristic — the graph is incomplete.',
    direction: 'no effect',
    markScheme: [
      '[1 mark] The characteristic curve should be plotted for both positive and negative values of current and voltage / the student only has data for one direction',
      '[1 mark] The characteristic shows the lamp is a non-ohmic component only with positive values — the result is incomplete / the student cannot confirm the curve is symmetric',
    ],
    tier: 3,
    marks: 2,
    senNote: 'I-V characteristics should include both positive and negative values to show the full behaviour of the component.',
  },

  // ─── RPA 9: Refraction (Glass Block) ─────────────────────────────────────
  {
    type: 'rpa-error',
    rpaRef: 'RPA9',
    rpaName: 'Refraction of light through a glass block',
    experiment: 'A student traces the outline of a glass block and marks the incident and emergent rays. When measuring the angle of refraction, the student measures the angle from the surface of the glass instead of from the normal.',
    question: 'Explain whether measuring from the surface instead of the normal makes the student\'s calculated refractive index too high or too low.',
    questionSubtitle: '[2 marks]',
    errorSource: 'Angles measured from the surface are the complement of angles measured from the normal. So the angle of refraction recorded is 90° minus the true angle.',
    direction: 'low',
    markScheme: [
      '[1 mark] The angle of refraction measured from the surface is the complement of the true angle / angles from surface = 90° − angle from normal, so the recorded angle is too large',
      '[1 mark] n = sin(i)/sin(r) — if r is recorded as too large, sin(r) is larger, so n is too LOW',
    ],
    tier: 3,
    marks: 2,
    senNote: 'All angles in optics are measured from the normal (perpendicular to surface), not from the surface itself.',
  },

  {
    type: 'rpa-error',
    rpaRef: 'RPA9',
    rpaName: 'Refraction of light through a glass block',
    experiment: 'A student uses a protractor to measure the angle of incidence and angle of refraction for a light ray passing through a glass block. The student\'s eye is not directly above the protractor when reading.',
    question: 'Explain why this causes a parallax error and state how it would affect the refractive index calculated.',
    questionSubtitle: '[2 marks]',
    errorSource: 'Parallax error occurs when the eye is not directly above the scale being read, causing the reading to be consistently shifted in one direction.',
    direction: 'high',
    markScheme: [
      '[1 mark] Viewing from an angle causes parallax error — the angle appears different from its true value / the angle reading is systematically shifted',
      '[1 mark] This is a systematic error that affects all readings consistently / the calculated refractive index will be consistently too high or too low depending on the direction of the parallax',
    ],
    tier: 3,
    marks: 2,
    senNote: 'Parallax error: always view scales from directly above. In optics, a small angle error has a big effect because you are taking sin of the angle.',
  },

  // ─── RPA 1: Specific Heat Capacity ────────────────────────────────────────
  {
    type: 'rpa-error',
    rpaRef: 'RPA1',
    rpaName: 'Specific heat capacity',
    experiment: 'A student heats a metal block using an immersion heater and records temperature rise. The heater is rated at 48 W. They measure the time and use E = Pt to find energy. However, some energy is lost to the surroundings.',
    question: 'Explain whether energy loss to the surroundings makes the student\'s calculated specific heat capacity too high or too low.',
    questionSubtitle: '[2 marks]',
    errorSource: 'The energy supplied by the heater (E = Pt) is greater than the energy actually absorbed by the metal block, because some is lost as heat to the surroundings.',
    direction: 'high',
    markScheme: [
      '[1 mark] Not all the energy from the heater is transferred to the metal block / some energy is lost to the surroundings / the temperature rise is smaller than it would be if all energy went into the block',
      '[1 mark] c = E/(mΔθ) — the temperature rise is smaller, so c is calculated as larger than its true value / too HIGH',
    ],
    tier: 3,
    marks: 2,
    senNote: 'c = E/(mΔθ). If the temperature rise is smaller than expected (because heat is lost), the equation gives a larger value of c → too high.',
  },

  // ─── RPA 7: Acceleration (Newton's 2nd Law) ──────────────────────────────
  {
    type: 'rpa-error',
    rpaRef: 'RPA7',
    rpaName: 'Acceleration and Newton\'s second law',
    experiment: 'A student investigates F = ma using a trolley on a runway with a hanging mass providing the force. The student does not compensate for friction between the trolley and the runway.',
    question: 'Explain whether friction causes the student\'s calculated acceleration to be too high or too low.',
    questionSubtitle: '[2 marks]',
    errorSource: 'Friction acts opposite to the direction of motion, reducing the net force on the trolley below the recorded value (the weight of the hanging mass).',
    direction: 'low',
    markScheme: [
      '[1 mark] Friction acts in the opposite direction to motion, reducing the net force below the value of the weight of the hanging mass',
      '[1 mark] A smaller net force → smaller acceleration → the measured acceleration is too LOW compared to the theoretical value (a = F/m)',
    ],
    tier: 3,
    marks: 2,
    senNote: 'Friction reduces the actual driving force. Less net force → less acceleration → result is too low.',
  },

  // ─── RPA 6: Specific Latent Heat ─────────────────────────────────────────
  {
    type: 'rpa-error',
    rpaRef: 'RPA6',
    rpaName: 'Specific latent heat',
    experiment: 'A student measures the specific latent heat of fusion of ice by placing ice in a funnel above a beaker and measuring the mass of water collected in a set time. A heater supplies a known power. However, some ice melts due to the room temperature (not just the heater).',
    question: 'Explain whether room-temperature melting of ice makes the student\'s value of specific latent heat too high or too low.',
    questionSubtitle: '[2 marks]',
    errorSource: 'Additional ice melts due to room temperature, so more water is collected than the heater alone would produce.',
    direction: 'low',
    markScheme: [
      '[1 mark] Some ice melts due to energy from the room (not just the heater), so more water is collected than expected from the heater energy alone',
      '[1 mark] L = E/(m) — the mass of water (m) is larger than it should be for the energy supplied, so L is calculated as too LOW',
    ],
    tier: 3,
    marks: 2,
    senNote: 'L = E/m. If extra water is collected (m is too big), and E is the same, then L comes out too small → too low.',
  },

  // ─── Pressure Measurement Error ───────────────────────────────────────────
  {
    type: 'rpa-error',
    rpaRef: 'RPA5',
    rpaName: 'Density (fluid)',
    experiment: 'A student measures the density of a liquid by weighing a measuring cylinder empty and then full of liquid. The student reads the volume at the top of the meniscus (the curved surface) rather than the bottom.',
    question: 'Explain whether reading at the top of the meniscus instead of the bottom makes the calculated density too high or too low.',
    questionSubtitle: '[2 marks]',
    errorSource: 'Reading at the top of the meniscus records a larger volume than the actual volume of liquid present.',
    direction: 'low',
    markScheme: [
      '[1 mark] Reading at the top of the meniscus gives a volume that is too large / the true volume is at the bottom of the meniscus',
      '[1 mark] ρ = m/V — if V is too large and m is correct, density is calculated as too LOW',
    ],
    tier: 3,
    marks: 2,
    senNote: 'Always read the bottom of a meniscus for liquids in a measuring cylinder. Reading the top gives a larger V → density too low.',
  },

  // ─── Wave Speed Error ─────────────────────────────────────────────────────
  {
    type: 'rpa-error',
    rpaRef: 'RPA8',
    rpaName: 'Waves on a string',
    experiment: 'A student measures the frequency of a vibrating string using a stopwatch, timing 10 oscillations. The student starts the stopwatch on the first oscillation and stops it on the 10th, but counts the first oscillation as "1" at time 0.',
    question: 'Explain whether this counting error makes the calculated frequency too high or too low.',
    questionSubtitle: '[2 marks]',
    errorSource: 'The student counted 10 oscillations but actually only timed 9 (they began counting from "1" at t=0, missing one oscillation period).',
    direction: 'high',
    markScheme: [
      '[1 mark] The student times only 9 complete oscillations instead of 10 / they start counting at "1" rather than "0"',
      '[1 mark] f = n/t — the number n appears as 10 but only 9 periods elapsed, so t is smaller than for 10 oscillations → f is calculated too HIGH',
    ],
    tier: 3,
    marks: 2,
    senNote: 'Always start counting at "0" not "1" when timing oscillations. Starting at "1" loses one full period.',
  },

  // ─── Thermometer Resolution ───────────────────────────────────────────────
  {
    type: 'rpa-error',
    rpaRef: 'RPA1',
    rpaName: 'Specific heat capacity',
    experiment: 'A student uses a liquid-in-glass thermometer with a resolution of 1 °C to measure a temperature change of 4 °C. A classmate suggests using a digital thermometer with a resolution of 0.1 °C.',
    question: 'Explain why using a digital thermometer with smaller resolution would improve the reliability of the specific heat capacity result.',
    questionSubtitle: '[2 marks]',
    errorSource: 'A 1 °C resolution thermometer has an uncertainty of ±0.5 °C on each reading, giving a potential uncertainty of ±1 °C in the temperature change — a 25% error on a 4 °C rise.',
    direction: 'high',
    markScheme: [
      '[1 mark] The uncertainty in temperature change is ±1 °C with a 1 °C resolution thermometer (±0.5 on each reading) — this is a large % of a small temperature change (25%)',
      '[1 mark] A 0.1 °C resolution thermometer has much smaller uncertainty (±0.1 °C total), so c = E/(mΔθ) is more accurate / the percentage uncertainty is greatly reduced',
    ],
    tier: 3,
    marks: 2,
    senNote: '% uncertainty = (uncertainty/value) × 100. Smaller resolution = smaller uncertainty = more reliable result.',
  },

]

export default examRPAErrors
