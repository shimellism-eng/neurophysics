const examCalculations = {
  // ─── 1. POWER CALCULATIONS: E = P × t ───────────────────────────────
  power_calc: [
    {
      type: "calculation",
      question: "A kettle has a power rating of 2.5 kW. It is switched on for 3 minutes. Calculate the energy transferred.",
      questionSubtitle: "Show your working",
      equation: "E = P × t",
      steps: [
        { label: "Convert power to watts", value: "2500", unit: "W", hint: "kW → W: multiply by 1000" },
        { label: "Convert time to seconds", value: "180", unit: "s", hint: "3 minutes × 60 = 180 s" },
        { label: "Calculate energy", value: "450000", unit: "J", hint: "E = 2500 × 180 = 450 000 J" }
      ],
      answer: 450000,
      answerUnit: "J",
      acceptRange: [449000, 451000],
      commonMistake: "Did you forget to convert kW to W? Using 2.5 instead of 2500 gives an answer 1000× too small.",
      tier: 2,
      senNote: "Always convert units first: kW → W (×1000) and minutes → seconds (×60)"
    },
    {
      type: "calculation",
      question: "A 1.8 kW hair dryer is used for 5 minutes. Calculate the energy transferred in joules.",
      questionSubtitle: "Show your working",
      equation: "E = P × t",
      steps: [
        { label: "Convert power to watts", value: "1800", unit: "W", hint: "1.8 kW × 1000 = 1800 W" },
        { label: "Convert time to seconds", value: "300", unit: "s", hint: "5 minutes × 60 = 300 s" },
        { label: "Calculate energy", value: "540000", unit: "J", hint: "E = 1800 × 300 = 540 000 J" }
      ],
      answer: 540000,
      answerUnit: "J",
      acceptRange: [539000, 541000],
      commonMistake: "Did you forget to convert minutes to seconds? 5 minutes = 300 seconds, not 5.",
      tier: 2,
      senNote: "Convert both units before substituting into the equation"
    },
    {
      type: "calculation",
      question: "A 0.75 kW microwave oven is used for 2 minutes and 30 seconds. Calculate the energy transferred.",
      questionSubtitle: "Show your working",
      equation: "E = P × t",
      steps: [
        { label: "Convert power to watts", value: "750", unit: "W", hint: "0.75 kW × 1000 = 750 W" },
        { label: "Convert time to seconds", value: "150", unit: "s", hint: "2 min 30 s = (2 × 60) + 30 = 150 s" },
        { label: "Calculate energy", value: "112500", unit: "J", hint: "E = 750 × 150 = 112 500 J" }
      ],
      answer: 112500,
      answerUnit: "J",
      acceptRange: [112000, 113000],
      commonMistake: "Did you convert 2 minutes 30 seconds correctly? It is 150 s, not 230 s or 2.5 s.",
      tier: 3,
      senNote: "Break compound times into parts: convert minutes to seconds first, then add remaining seconds"
    }
  ],

  // ─── 2. ENERGY EQUATIONS: Ep = mgh and Ek = ½mv² ────────────────────
  energy_equations: [
    {
      type: "calculation",
      question: "A ball of mass 200 g is dropped from a height of 12 m. Calculate its gravitational potential energy before it is released. Use g = 10 N/kg.",
      questionSubtitle: "Show your working",
      equation: "Ep = m × g × h",
      steps: [
        { label: "Convert mass to kilograms", value: "0.2", unit: "kg", hint: "200 g ÷ 1000 = 0.2 kg" },
        { label: "Calculate Ep", value: "24", unit: "J", hint: "Ep = 0.2 × 10 × 12 = 24 J" }
      ],
      answer: 24,
      answerUnit: "J",
      acceptRange: [23.5, 24.5],
      commonMistake: "Did you convert grams to kilograms? 200 g = 0.2 kg, not 200 kg.",
      tier: 2,
      senNote: "Always convert g → kg by dividing by 1000"
    },
    {
      type: "calculation",
      question: "A car of mass 1200 kg is travelling at 30 m/s. Calculate its kinetic energy.",
      questionSubtitle: "Show your working",
      equation: "Ek = ½ × m × v²",
      steps: [
        { label: "Square the velocity", value: "900", unit: "m²/s²", hint: "30² = 900" },
        { label: "Calculate Ek", value: "540000", unit: "J", hint: "Ek = 0.5 × 1200 × 900 = 540 000 J" }
      ],
      answer: 540000,
      answerUnit: "J",
      acceptRange: [539000, 541000],
      commonMistake: "Did you remember to square the velocity? And did you remember the ½?",
      tier: 2,
      senNote: "Square the speed first, then multiply by ½ × m"
    },
    {
      type: "calculation",
      question: "A rock of mass 500 g falls from a cliff 80 cm high onto a ledge. Calculate the gravitational potential energy lost. Use g = 10 N/kg.",
      questionSubtitle: "Show your working",
      equation: "Ep = m × g × h",
      steps: [
        { label: "Convert mass to kilograms", value: "0.5", unit: "kg", hint: "500 g ÷ 1000 = 0.5 kg" },
        { label: "Convert height to metres", value: "0.8", unit: "m", hint: "80 cm ÷ 100 = 0.8 m" },
        { label: "Calculate Ep", value: "4", unit: "J", hint: "Ep = 0.5 × 10 × 0.8 = 4 J" }
      ],
      answer: 4,
      answerUnit: "J",
      acceptRange: [3.5, 4.5],
      commonMistake: "Did you convert both g → kg AND cm → m? Two unit traps in one question!",
      tier: 3,
      senNote: "Check every quantity for unit conversions before substituting"
    }
  ],

  // ─── 3 & 4. INTERNAL ENERGY: E = mcΔθ and E = mL ────────────────────
  internal_energy: [
    // E = mcΔθ questions
    {
      type: "calculation",
      question: "A 2 kg block of aluminium is heated from 20°C to 170°C. The specific heat capacity of aluminium is 900 J/kg°C. Calculate the energy transferred.",
      questionSubtitle: "Show your working",
      equation: "E = m × c × Δθ",
      steps: [
        { label: "Calculate temperature change", value: "150", unit: "°C", hint: "Δθ = 170 − 20 = 150°C (use the CHANGE, not the final temp)" },
        { label: "Calculate energy", value: "270000", unit: "J", hint: "E = 2 × 900 × 150 = 270 000 J" }
      ],
      answer: 270000,
      answerUnit: "J",
      acceptRange: [269000, 271000],
      commonMistake: "Did you use the temperature CHANGE (150°C), not the final temperature (170°C)?",
      tier: 2,
      senNote: "Δθ means temperature change — always subtract: final − initial"
    },
    {
      type: "calculation",
      question: "500 g of water is heated from 15°C to 65°C. The specific heat capacity of water is 4200 J/kg°C. Calculate the energy transferred.",
      questionSubtitle: "Show your working",
      equation: "E = m × c × Δθ",
      steps: [
        { label: "Convert mass to kilograms", value: "0.5", unit: "kg", hint: "500 g ÷ 1000 = 0.5 kg" },
        { label: "Calculate temperature change", value: "50", unit: "°C", hint: "Δθ = 65 − 15 = 50°C" },
        { label: "Calculate energy", value: "105000", unit: "J", hint: "E = 0.5 × 4200 × 50 = 105 000 J" }
      ],
      answer: 105000,
      answerUnit: "J",
      acceptRange: [104000, 106000],
      commonMistake: "Did you convert grams to kilograms? 500 g = 0.5 kg.",
      tier: 2,
      senNote: "Convert g → kg AND use temperature change, not total temperature"
    },
    {
      type: "calculation",
      question: "0.8 kg of copper is heated and gains 6.16 kJ of energy. The specific heat capacity of copper is 385 J/kg°C. Calculate the temperature change.",
      questionSubtitle: "Show your working",
      equation: "Δθ = E ÷ (m × c)",
      steps: [
        { label: "Convert energy to joules", value: "6160", unit: "J", hint: "6.16 kJ × 1000 = 6160 J" },
        { label: "Calculate m × c", value: "308", unit: "J/°C", hint: "0.8 × 385 = 308" },
        { label: "Calculate temperature change", value: "20", unit: "°C", hint: "Δθ = 6160 ÷ 308 = 20°C" }
      ],
      answer: 20,
      answerUnit: "°C",
      acceptRange: [19.5, 20.5],
      commonMistake: "Did you convert kJ to J? 6.16 kJ = 6160 J, not 6.16.",
      tier: 3,
      senNote: "When energy is given in kJ, multiply by 1000 to convert to J before using the equation"
    },
    // E = mL questions
    {
      type: "calculation",
      question: "Calculate the energy needed to melt 250 g of ice. The specific latent heat of fusion of water is 334 000 J/kg.",
      questionSubtitle: "Show your working",
      equation: "E = m × L",
      steps: [
        { label: "Convert mass to kilograms", value: "0.25", unit: "kg", hint: "250 g ÷ 1000 = 0.25 kg" },
        { label: "Calculate energy", value: "83500", unit: "J", hint: "E = 0.25 × 334 000 = 83 500 J" }
      ],
      answer: 83500,
      answerUnit: "J",
      acceptRange: [83000, 84000],
      commonMistake: "Did you convert grams to kilograms? Using 250 instead of 0.25 gives an answer 1000× too large.",
      tier: 2,
      senNote: "Latent heat uses kg — always convert g → kg first"
    },
    {
      type: "calculation",
      question: "Calculate the energy needed to boil 150 g of water at 100°C. The specific latent heat of vaporisation of water is 2 260 000 J/kg. Give your answer in standard form.",
      questionSubtitle: "Show your working",
      equation: "E = m × L",
      steps: [
        { label: "Convert mass to kilograms", value: "0.15", unit: "kg", hint: "150 g ÷ 1000 = 0.15 kg" },
        { label: "Calculate energy", value: "339000", unit: "J", hint: "E = 0.15 × 2 260 000 = 339 000 J" },
        { label: "Convert to standard form", value: "3.39 × 10⁵", unit: "J", hint: "339 000 = 3.39 × 10⁵ J" }
      ],
      answer: 339000,
      answerUnit: "J",
      acceptRange: [338000, 340000],
      commonMistake: "Did you convert g → kg? And is your standard form correct? 339 000 = 3.39 × 10⁵, not 10⁶.",
      tier: 3,
      senNote: "For standard form: count decimal places carefully. 339 000 has 5 digits after the first."
    },
    {
      type: "calculation",
      question: "A freezer removes 50.1 kJ of energy from 150 g of water at 0°C to turn it into ice. Use this data to calculate the specific latent heat of fusion of water.",
      questionSubtitle: "Show your working",
      equation: "L = E ÷ m",
      steps: [
        { label: "Convert energy to joules", value: "50100", unit: "J", hint: "50.1 kJ × 1000 = 50 100 J" },
        { label: "Convert mass to kilograms", value: "0.15", unit: "kg", hint: "150 g ÷ 1000 = 0.15 kg" },
        { label: "Calculate L", value: "334000", unit: "J/kg", hint: "L = 50 100 ÷ 0.15 = 334 000 J/kg" }
      ],
      answer: 334000,
      answerUnit: "J/kg",
      acceptRange: [333000, 335000],
      commonMistake: "Two conversions needed: kJ → J AND g → kg. Missing either gives the wrong answer.",
      tier: 3,
      senNote: "Rearrange the equation first, then convert both values before dividing"
    }
  ],

  // ─── 5. EFFICIENCY ───────────────────────────────────────────────────
  efficiency: [
    {
      type: "calculation",
      question: "A motor transfers 8 kJ of energy. 6.4 kJ is usefully transferred. Calculate the efficiency of the motor.",
      questionSubtitle: "Show your working",
      equation: "efficiency = useful output ÷ total input",
      steps: [
        { label: "Convert useful output to joules", value: "6400", unit: "J", hint: "6.4 kJ × 1000 = 6400 J" },
        { label: "Convert total input to joules", value: "8000", unit: "J", hint: "8 kJ × 1000 = 8000 J" },
        { label: "Calculate efficiency", value: "0.8", unit: "", hint: "η = 6400 ÷ 8000 = 0.8 (or 80%)" }
      ],
      answer: 0.8,
      answerUnit: "",
      acceptRange: [0.79, 0.81],
      commonMistake: "Both values are in kJ so the ratio works either way — but watch out if they use different units!",
      tier: 2,
      senNote: "Efficiency has no unit. It is a decimal between 0 and 1, or a percentage between 0% and 100%."
    },
    {
      type: "calculation",
      question: "A light bulb is supplied with 60 J of electrical energy each second. It transfers 4.5 kJ of light energy per minute. Calculate its efficiency.",
      questionSubtitle: "Show your working",
      equation: "efficiency = useful output ÷ total input",
      steps: [
        { label: "Calculate total input per minute", value: "3600", unit: "J", hint: "60 J/s × 60 s = 3600 J per minute" },
        { label: "Convert useful output to joules", value: "4500", unit: "J", hint: "4.5 kJ × 1000 = 4500 J per minute" }
      ],
      answer: -1,
      answerUnit: "",
      acceptRange: [-2, -0.5],
      commonMistake: "Wait — the useful output (4500 J) is MORE than the total input (3600 J)? This is impossible. Check the question carefully!",
      tier: 3,
      senNote: "This is a trick — if useful > total, the answer is impossible. Real exam questions test this."
    },
    {
      type: "calculation",
      question: "A crane has an efficiency of 0.35. It lifts a 400 kg load through 15 m. Calculate the total energy input to the crane. Use g = 10 N/kg.",
      questionSubtitle: "Show your working",
      equation: "total input = useful output ÷ efficiency",
      steps: [
        { label: "Calculate useful output (Ep)", value: "60000", unit: "J", hint: "Ep = 400 × 10 × 15 = 60 000 J" },
        { label: "Calculate total input", value: "171429", unit: "J", hint: "Total = 60 000 ÷ 0.35 ≈ 171 429 J" }
      ],
      answer: 171429,
      answerUnit: "J",
      acceptRange: [171000, 172000],
      commonMistake: "Did you divide by the efficiency, not multiply? Total input = useful output ÷ efficiency.",
      tier: 3,
      senNote: "Rearrange: to find total input, divide the useful output by efficiency (not multiply)"
    }
  ],

  // ─── 6. CIRCUIT BASICS: V = IR ──────────────────────────────────────
  circuit_basics: [
    {
      type: "calculation",
      question: "A resistor has a resistance of 4.7 kΩ. The current through it is 2 mA. Calculate the potential difference across it.",
      questionSubtitle: "Show your working",
      equation: "V = I × R",
      steps: [
        { label: "Convert current to amps", value: "0.002", unit: "A", hint: "2 mA ÷ 1000 = 0.002 A" },
        { label: "Convert resistance to ohms", value: "4700", unit: "Ω", hint: "4.7 kΩ × 1000 = 4700 Ω" },
        { label: "Calculate voltage", value: "9.4", unit: "V", hint: "V = 0.002 × 4700 = 9.4 V" }
      ],
      answer: 9.4,
      answerUnit: "V",
      acceptRange: [9.3, 9.5],
      commonMistake: "Did you convert BOTH mA → A and kΩ → Ω? Two conversions are needed here.",
      tier: 3,
      senNote: "mA → A: divide by 1000. kΩ → Ω: multiply by 1000."
    },
    {
      type: "calculation",
      question: "A lamp has a potential difference of 6 V across it. The current flowing through it is 150 mA. Calculate the resistance of the lamp.",
      questionSubtitle: "Show your working",
      equation: "R = V ÷ I",
      steps: [
        { label: "Convert current to amps", value: "0.15", unit: "A", hint: "150 mA ÷ 1000 = 0.15 A" },
        { label: "Calculate resistance", value: "40", unit: "Ω", hint: "R = 6 ÷ 0.15 = 40 Ω" }
      ],
      answer: 40,
      answerUnit: "Ω",
      acceptRange: [39, 41],
      commonMistake: "Did you convert mA to A? Using 150 instead of 0.15 gives R = 0.04 Ω — far too small for a lamp.",
      tier: 2,
      senNote: "Convert mA → A first. Then divide V by I."
    },
    {
      type: "calculation",
      question: "An LED has a resistance of 330 Ω. The potential difference across it is 1.8 V. Calculate the current flowing through it in milliamps (mA).",
      questionSubtitle: "Show your working",
      equation: "I = V ÷ R",
      steps: [
        { label: "Calculate current in amps", value: "0.00545", unit: "A", hint: "I = 1.8 ÷ 330 = 0.00545 A" },
        { label: "Convert to milliamps", value: "5.45", unit: "mA", hint: "0.00545 × 1000 = 5.45 mA" }
      ],
      answer: 5.45,
      answerUnit: "mA",
      acceptRange: [5.3, 5.6],
      commonMistake: "The answer is asked for in mA, not A. Multiply your answer in amps by 1000.",
      tier: 2,
      senNote: "Check the unit the question asks for — convert your final answer if needed"
    }
  ],

  // ─── 7. ELECTRICAL POWER: P = I²R ───────────────────────────────────
  electrical_power: [
    {
      type: "calculation",
      question: "A current of 200 mA flows through a 50 Ω resistor. Calculate the power dissipated in the resistor.",
      questionSubtitle: "Show your working",
      equation: "P = I² × R",
      steps: [
        { label: "Convert current to amps", value: "0.2", unit: "A", hint: "200 mA ÷ 1000 = 0.2 A" },
        { label: "Square the current", value: "0.04", unit: "A²", hint: "0.2² = 0.04 (not 0.2 × 2!)" },
        { label: "Calculate power", value: "2", unit: "W", hint: "P = 0.04 × 50 = 2 W" }
      ],
      answer: 2,
      answerUnit: "W",
      acceptRange: [1.9, 2.1],
      commonMistake: "Did you SQUARE the current (0.2² = 0.04) and not just double it (0.2 × 2 = 0.4)?",
      tier: 2,
      senNote: "I² means I × I, not I × 2. Convert mA to A first."
    },
    {
      type: "calculation",
      question: "A 2.2 kΩ resistor carries a current of 15 mA. Calculate the power dissipated.",
      questionSubtitle: "Show your working",
      equation: "P = I² × R",
      steps: [
        { label: "Convert current to amps", value: "0.015", unit: "A", hint: "15 mA ÷ 1000 = 0.015 A" },
        { label: "Convert resistance to ohms", value: "2200", unit: "Ω", hint: "2.2 kΩ × 1000 = 2200 Ω" },
        { label: "Square the current", value: "0.000225", unit: "A²", hint: "0.015² = 0.000225" },
        { label: "Calculate power", value: "0.495", unit: "W", hint: "P = 0.000225 × 2200 = 0.495 W" }
      ],
      answer: 0.495,
      answerUnit: "W",
      acceptRange: [0.49, 0.50],
      commonMistake: "Did you convert mA → A AND kΩ → Ω? Both conversions are essential.",
      tier: 3,
      senNote: "Two unit conversions needed. Square the current AFTER converting to amps."
    },
    {
      type: "calculation",
      question: "A charge of 350 mC flows through a battery with a potential difference of 12 V. Calculate the energy transferred.",
      questionSubtitle: "Show your working",
      equation: "E = Q × V",
      steps: [
        { label: "Convert charge to coulombs", value: "0.35", unit: "C", hint: "350 mC ÷ 1000 = 0.35 C" },
        { label: "Calculate energy", value: "4.2", unit: "J", hint: "E = 0.35 × 12 = 4.2 J" }
      ],
      answer: 4.2,
      answerUnit: "J",
      acceptRange: [4.1, 4.3],
      commonMistake: "Did you convert mC to C? 350 mC = 0.35 C, not 350 C.",
      tier: 2,
      senNote: "mC → C: divide by 1000. μC → C: divide by 1 000 000."
    }
  ],

  // ─── 9. WAVE PROPERTIES: v = fλ ─────────────────────────────────────
  wave_properties: [
    {
      type: "calculation",
      question: "A sound wave has a frequency of 440 Hz and a wavelength of 75 cm. Calculate the speed of the sound wave.",
      questionSubtitle: "Show your working",
      equation: "v = f × λ",
      steps: [
        { label: "Convert wavelength to metres", value: "0.75", unit: "m", hint: "75 cm ÷ 100 = 0.75 m" },
        { label: "Calculate speed", value: "330", unit: "m/s", hint: "v = 440 × 0.75 = 330 m/s" }
      ],
      answer: 330,
      answerUnit: "m/s",
      acceptRange: [329, 331],
      commonMistake: "Did you convert cm to m? 75 cm = 0.75 m, not 75 m.",
      tier: 2,
      senNote: "Wavelength must be in metres for the speed to come out in m/s"
    },
    {
      type: "calculation",
      question: "A radio wave has a frequency of 98.5 MHz. Radio waves travel at 3.0 × 10⁸ m/s. Calculate the wavelength. Give your answer to 2 significant figures.",
      questionSubtitle: "Show your working",
      equation: "λ = v ÷ f",
      steps: [
        { label: "Convert frequency to Hz", value: "98500000", unit: "Hz", hint: "98.5 MHz = 98.5 × 10⁶ = 9.85 × 10⁷ Hz" },
        { label: "Calculate wavelength", value: "3.05", unit: "m", hint: "λ = 3.0 × 10⁸ ÷ 9.85 × 10⁷ ≈ 3.0 m (2 s.f.)" }
      ],
      answer: 3.05,
      answerUnit: "m",
      acceptRange: [3.0, 3.1],
      commonMistake: "Did you convert MHz to Hz? 1 MHz = 1 000 000 Hz = 10⁶ Hz.",
      tier: 3,
      senNote: "MHz → Hz: multiply by 10⁶. Use standard form to avoid errors with large numbers."
    },
    {
      type: "calculation",
      question: "Red light has a wavelength of 650 nm. The speed of light is 3.0 × 10⁸ m/s. Calculate the frequency of red light. Give your answer in standard form.",
      questionSubtitle: "Show your working",
      equation: "f = v ÷ λ",
      steps: [
        { label: "Convert wavelength to metres", value: "6.5 × 10⁻⁷", unit: "m", hint: "650 nm = 650 × 10⁻⁹ = 6.5 × 10⁻⁷ m" },
        { label: "Calculate frequency", value: "4.62 × 10¹⁴", unit: "Hz", hint: "f = 3.0 × 10⁸ ÷ 6.5 × 10⁻⁷ ≈ 4.62 × 10¹⁴ Hz" }
      ],
      answer: 4.62e14,
      answerUnit: "Hz",
      acceptRange: [4.6e14, 4.65e14],
      commonMistake: "Did you convert nm to m? 1 nm = 10⁻⁹ m. 650 nm = 6.5 × 10⁻⁷ m.",
      tier: 3,
      senNote: "nm → m: multiply by 10⁻⁹. Handle powers of 10 carefully when dividing."
    }
  ],

  // ─── 10. FLUID PRESSURE: p = F/A and p = ρgh ────────────────────────
  fluid_pressure: [
    {
      type: "calculation",
      question: "A box has a weight of 450 N. It rests on a face with dimensions 30 cm × 50 cm. Calculate the pressure the box exerts on the ground.",
      questionSubtitle: "Show your working",
      equation: "p = F ÷ A",
      steps: [
        { label: "Convert length to metres", value: "0.3", unit: "m", hint: "30 cm ÷ 100 = 0.3 m" },
        { label: "Convert width to metres", value: "0.5", unit: "m", hint: "50 cm ÷ 100 = 0.5 m" },
        { label: "Calculate area", value: "0.15", unit: "m²", hint: "A = 0.3 × 0.5 = 0.15 m²" },
        { label: "Calculate pressure", value: "3000", unit: "Pa", hint: "p = 450 ÷ 0.15 = 3000 Pa" }
      ],
      answer: 3000,
      answerUnit: "Pa",
      acceptRange: [2900, 3100],
      commonMistake: "Did you convert cm to m BEFORE calculating area? 30 cm × 50 cm ≠ 1500 m². Convert each side first.",
      tier: 2,
      senNote: "Convert each dimension to metres first, then find the area. Never convert cm² directly."
    },
    {
      type: "calculation",
      question: "A stiletto heel has an area of 1.2 cm². A person weighing 600 N stands on one heel. Calculate the pressure in Pa.",
      questionSubtitle: "Show your working",
      equation: "p = F ÷ A",
      steps: [
        { label: "Convert area to m²", value: "0.00012", unit: "m²", hint: "1.2 cm² ÷ 10 000 = 1.2 × 10⁻⁴ m²" },
        { label: "Calculate pressure", value: "5000000", unit: "Pa", hint: "p = 600 ÷ 0.00012 = 5 000 000 Pa = 5 MPa" }
      ],
      answer: 5000000,
      answerUnit: "Pa",
      acceptRange: [4900000, 5100000],
      commonMistake: "cm² → m²: divide by 10 000 (not 100!). 1 m² = 10 000 cm².",
      tier: 3,
      senNote: "Area conversion is different from length: cm² → m² means divide by 10 000, not 100"
    },
    {
      type: "calculation",
      question: "A diver is 25 m below the surface of the sea. The density of seawater is 1025 kg/m³. Use g = 10 N/kg. Calculate the pressure due to the water. Give your answer in kPa.",
      questionSubtitle: "Show your working",
      equation: "p = ρ × g × h",
      steps: [
        { label: "Calculate pressure in Pa", value: "256250", unit: "Pa", hint: "p = 1025 × 10 × 25 = 256 250 Pa" },
        { label: "Convert to kPa", value: "256.25", unit: "kPa", hint: "256 250 ÷ 1000 = 256.25 kPa" }
      ],
      answer: 256.25,
      answerUnit: "kPa",
      acceptRange: [255, 258],
      commonMistake: "The answer is asked for in kPa. Divide your Pa answer by 1000.",
      tier: 2,
      senNote: "Pa → kPa: divide by 1000. Check what unit the question asks for."
    }
  ],

  // ─── 11. EM INDUCTION (TRANSFORMERS): Vp/Vs = Np/Ns ─────────────────
  em_induction: [
    {
      type: "calculation",
      question: "A transformer has 400 turns on the primary coil and 20 turns on the secondary coil. The input voltage is 230 V. Calculate the output voltage.",
      questionSubtitle: "Show your working",
      equation: "Vp ÷ Vs = Np ÷ Ns",
      steps: [
        { label: "Calculate turns ratio", value: "20", unit: "", hint: "Np ÷ Ns = 400 ÷ 20 = 20" },
        { label: "Calculate Vs", value: "11.5", unit: "V", hint: "Vs = 230 ÷ 20 = 11.5 V" }
      ],
      answer: 11.5,
      answerUnit: "V",
      acceptRange: [11, 12],
      commonMistake: "Make sure you divide Vp by the turns ratio for a step-down transformer, not multiply.",
      tier: 2,
      senNote: "Step-down: more primary turns, so output voltage is smaller. Check your answer makes sense."
    },
    {
      type: "calculation",
      question: "A step-up transformer increases the voltage from 230 V to 11.5 kV. The current in the primary coil is 5 A. Assuming 100% efficiency, calculate the current in the secondary coil.",
      questionSubtitle: "Show your working",
      equation: "Vp × Ip = Vs × Is",
      steps: [
        { label: "Convert secondary voltage to volts", value: "11500", unit: "V", hint: "11.5 kV × 1000 = 11 500 V" },
        { label: "Calculate Vp × Ip", value: "1150", unit: "W", hint: "230 × 5 = 1150 W" },
        { label: "Calculate Is", value: "0.1", unit: "A", hint: "Is = 1150 ÷ 11 500 = 0.1 A" }
      ],
      answer: 0.1,
      answerUnit: "A",
      acceptRange: [0.09, 0.11],
      commonMistake: "Did you convert kV to V? 11.5 kV = 11 500 V, not 11.5 V.",
      tier: 3,
      senNote: "kV → V: multiply by 1000. Higher voltage means lower current for the same power."
    },
    {
      type: "calculation",
      question: "A transformer steps down from 33 kV to 230 V with 12 000 primary turns. Calculate the number of secondary turns. Then calculate the secondary current if the primary current is 7 A.",
      questionSubtitle: "Show your working",
      equation: "Vp ÷ Vs = Np ÷ Ns, then Vp × Ip = Vs × Is",
      steps: [
        { label: "Convert primary voltage", value: "33000", unit: "V", hint: "33 kV × 1000 = 33 000 V" },
        { label: "Calculate turns ratio", value: "143.5", unit: "", hint: "33 000 ÷ 230 ≈ 143.5" },
        { label: "Calculate Ns", value: "83.6", unit: "turns", hint: "Ns = 12 000 ÷ 143.5 ≈ 83.6 ≈ 84 turns" },
        { label: "Calculate secondary current", value: "1004.3", unit: "A", hint: "Is = (33 000 × 7) ÷ 230 ≈ 1004 A" }
      ],
      answer: 1004.3,
      answerUnit: "A",
      acceptRange: [1000, 1010],
      commonMistake: "This is a multi-step problem. Convert kV to V first, then use both transformer equations.",
      tier: 3,
      senNote: "Work through step by step. Convert kV → V at the start to avoid errors later."
    }
  ],

  // ─── 12. MOTOR EFFECT: F = BIl ──────────────────────────────────────
  motor_effect: [
    {
      type: "calculation",
      question: "A wire carrying a current of 3.5 A is placed in a magnetic field of 40 mT. The length of wire in the field is 25 cm. Calculate the force on the wire.",
      questionSubtitle: "Show your working",
      equation: "F = B × I × l",
      steps: [
        { label: "Convert magnetic flux density to tesla", value: "0.04", unit: "T", hint: "40 mT ÷ 1000 = 0.04 T" },
        { label: "Convert length to metres", value: "0.25", unit: "m", hint: "25 cm ÷ 100 = 0.25 m" },
        { label: "Calculate force", value: "0.035", unit: "N", hint: "F = 0.04 × 3.5 × 0.25 = 0.035 N" }
      ],
      answer: 0.035,
      answerUnit: "N",
      acceptRange: [0.034, 0.036],
      commonMistake: "Did you convert mT → T (÷1000) AND cm → m (÷100)? Two conversions needed.",
      tier: 2,
      senNote: "mT → T: divide by 1000. cm → m: divide by 100."
    },
    {
      type: "calculation",
      question: "A wire of length 8 cm carries a current of 250 mA through a magnetic field of 0.6 T. Calculate the force on the wire.",
      questionSubtitle: "Show your working",
      equation: "F = B × I × l",
      steps: [
        { label: "Convert current to amps", value: "0.25", unit: "A", hint: "250 mA ÷ 1000 = 0.25 A" },
        { label: "Convert length to metres", value: "0.08", unit: "m", hint: "8 cm ÷ 100 = 0.08 m" },
        { label: "Calculate force", value: "0.012", unit: "N", hint: "F = 0.6 × 0.25 × 0.08 = 0.012 N" }
      ],
      answer: 0.012,
      answerUnit: "N",
      acceptRange: [0.011, 0.013],
      commonMistake: "Did you convert mA → A and cm → m? Both are needed here.",
      tier: 2,
      senNote: "Convert all values to SI units (A, m, T) before multiplying"
    },
    {
      type: "calculation",
      question: "A 12 cm wire experiences a force of 0.054 N in a uniform magnetic field. The magnetic flux density is 150 mT. Calculate the current in the wire.",
      questionSubtitle: "Show your working",
      equation: "I = F ÷ (B × l)",
      steps: [
        { label: "Convert magnetic flux density to tesla", value: "0.15", unit: "T", hint: "150 mT ÷ 1000 = 0.15 T" },
        { label: "Convert length to metres", value: "0.12", unit: "m", hint: "12 cm ÷ 100 = 0.12 m" },
        { label: "Calculate B × l", value: "0.018", unit: "T·m", hint: "0.15 × 0.12 = 0.018" },
        { label: "Calculate current", value: "3", unit: "A", hint: "I = 0.054 ÷ 0.018 = 3 A" }
      ],
      answer: 3,
      answerUnit: "A",
      acceptRange: [2.9, 3.1],
      commonMistake: "Rearrange the equation first: I = F ÷ (B × l). Convert mT and cm before substituting.",
      tier: 3,
      senNote: "Rearrange, convert, then substitute. Check: 0.15 × 3 × 0.12 = 0.054 N ✓"
    }
  ],

  // ─── 13. HOOKE'S LAW: Ee = ½ke² ─────────────────────────────────────
  hookes_law: [
    {
      type: "calculation",
      question: "A spring has a spring constant of 40 N/m. It is stretched by 15 cm. Calculate the elastic potential energy stored in the spring.",
      questionSubtitle: "Show your working",
      equation: "Ee = ½ × k × e²",
      steps: [
        { label: "Convert extension to metres", value: "0.15", unit: "m", hint: "15 cm ÷ 100 = 0.15 m" },
        { label: "Square the extension", value: "0.0225", unit: "m²", hint: "0.15² = 0.0225" },
        { label: "Calculate Ee", value: "0.45", unit: "J", hint: "Ee = 0.5 × 40 × 0.0225 = 0.45 J" }
      ],
      answer: 0.45,
      answerUnit: "J",
      acceptRange: [0.44, 0.46],
      commonMistake: "Did you convert cm to m BEFORE squaring? 15 cm = 0.15 m, then square it.",
      tier: 2,
      senNote: "Convert cm → m first, then square. If you square 15 and then convert, you get the wrong answer."
    },
    {
      type: "calculation",
      question: "A spring with a spring constant of 80 N/m stores 0.36 J of elastic potential energy. Calculate the extension of the spring in cm.",
      questionSubtitle: "Show your working",
      equation: "e = √(2Ee ÷ k)",
      steps: [
        { label: "Rearrange for e²", value: "0.009", unit: "m²", hint: "e² = 2 × 0.36 ÷ 80 = 0.009" },
        { label: "Square root to find e", value: "0.0949", unit: "m", hint: "e = √0.009 ≈ 0.0949 m" },
        { label: "Convert to cm", value: "9.49", unit: "cm", hint: "0.0949 × 100 ≈ 9.5 cm" }
      ],
      answer: 9.49,
      answerUnit: "cm",
      acceptRange: [9.4, 9.6],
      commonMistake: "The answer is asked for in cm. Calculate in metres first, then multiply by 100.",
      tier: 3,
      senNote: "Work in SI units (metres) throughout, then convert the final answer to cm"
    },
    {
      type: "calculation",
      question: "A spring is stretched from its natural length of 10 cm to a total length of 28 cm. The spring constant is 25 N/m. Calculate the elastic potential energy stored.",
      questionSubtitle: "Show your working",
      equation: "Ee = ½ × k × e²",
      steps: [
        { label: "Calculate extension", value: "18", unit: "cm", hint: "Extension = 28 − 10 = 18 cm (not 28 cm!)" },
        { label: "Convert extension to metres", value: "0.18", unit: "m", hint: "18 cm ÷ 100 = 0.18 m" },
        { label: "Square the extension", value: "0.0324", unit: "m²", hint: "0.18² = 0.0324" },
        { label: "Calculate Ee", value: "0.405", unit: "J", hint: "Ee = 0.5 × 25 × 0.0324 = 0.405 J" }
      ],
      answer: 0.405,
      answerUnit: "J",
      acceptRange: [0.40, 0.41],
      commonMistake: "Extension = stretched length − natural length = 18 cm. NOT the total length of 28 cm!",
      tier: 3,
      senNote: "Extension is how much EXTRA the spring is stretched, not its total length"
    }
  ],

  // ─── 14. STOPPING DISTANCE: v-t graph calculations ──────────────────
  stopping_distance: [
    {
      type: "calculation",
      question: "A car is travelling at 108 km/h. The driver's reaction time is 0.7 s. Calculate the thinking distance in metres.",
      questionSubtitle: "Show your working",
      equation: "thinking distance = speed × reaction time",
      steps: [
        { label: "Convert speed to m/s", value: "30", unit: "m/s", hint: "108 km/h ÷ 3.6 = 30 m/s" },
        { label: "Calculate thinking distance", value: "21", unit: "m", hint: "d = 30 × 0.7 = 21 m" }
      ],
      answer: 21,
      answerUnit: "m",
      acceptRange: [20.5, 21.5],
      commonMistake: "Did you convert km/h to m/s? Divide by 3.6 (or multiply by 1000 and divide by 3600).",
      tier: 2,
      senNote: "km/h → m/s: divide by 3.6. This is because 1 km = 1000 m and 1 h = 3600 s."
    },
    {
      type: "calculation",
      question: "A car travelling at 72 km/h applies the brakes and decelerates uniformly to rest in 4 seconds. Calculate the braking distance.",
      questionSubtitle: "Show your working. Use: distance = average speed × time",
      equation: "d = ½ × (u + v) × t",
      steps: [
        { label: "Convert speed to m/s", value: "20", unit: "m/s", hint: "72 km/h ÷ 3.6 = 20 m/s" },
        { label: "Calculate average speed", value: "10", unit: "m/s", hint: "Average = (20 + 0) ÷ 2 = 10 m/s" },
        { label: "Calculate braking distance", value: "40", unit: "m", hint: "d = 10 × 4 = 40 m" }
      ],
      answer: 40,
      answerUnit: "m",
      acceptRange: [39, 41],
      commonMistake: "Did you convert km/h to m/s first? And did you use the average speed, not the initial speed?",
      tier: 2,
      senNote: "For uniform deceleration: average speed = (initial + final) ÷ 2. Final speed = 0 (it stops)."
    },
    {
      type: "calculation",
      question: "A car is travelling at 90 km/h. The reaction time is 0.6 s. The braking distance is 37.5 m. Calculate the total stopping distance.",
      questionSubtitle: "Show your working",
      equation: "stopping distance = thinking distance + braking distance",
      steps: [
        { label: "Convert speed to m/s", value: "25", unit: "m/s", hint: "90 km/h ÷ 3.6 = 25 m/s" },
        { label: "Calculate thinking distance", value: "15", unit: "m", hint: "d = 25 × 0.6 = 15 m" },
        { label: "Calculate total stopping distance", value: "52.5", unit: "m", hint: "Total = 15 + 37.5 = 52.5 m" }
      ],
      answer: 52.5,
      answerUnit: "m",
      acceptRange: [52, 53],
      commonMistake: "Did you convert km/h to m/s before calculating thinking distance? 90 km/h ≠ 90 m/s.",
      tier: 2,
      senNote: "Stopping distance has two parts: thinking + braking. Convert speed units first."
    }
  ]
};

export default examCalculations;
