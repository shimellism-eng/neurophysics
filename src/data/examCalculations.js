const examCalculations = {
  // ─── 0. ENERGY PATHWAYS ────────────────────────────────────────────
  energy_pathways: [
    {
      type: "calculation",
      question: "A coal power station inputs 1500 MJ of chemical energy. 450 MJ is transferred usefully as electrical energy. Calculate the efficiency of the power station.",
      questionSubtitle: "Show your working",
      equation: "efficiency = useful output ÷ total input",
      steps: [
        { label: "Write the useful energy output", value: "450", unit: "MJ", hint: "Useful output is the electrical energy" },
        { label: "Write the total energy input", value: "1500", unit: "MJ", hint: "Total input is the chemical energy" },
        { label: "Calculate efficiency", value: "0.3", unit: "", hint: "η = 450 ÷ 1500 = 0.3 (or 30%)" }
      ],
      answer: 0.3,
      answerUnit: "",
      acceptRange: [0.29, 0.31],
      commonMistake: "Did you divide the wrong way? Efficiency = useful ÷ total, not total ÷ useful.",
      tier: 2,
      senNote: "Efficiency is always between 0 and 1 (or 0% and 100%). A bigger number is not more efficient."
    },
    {
      type: "calculation",
      question: "A car engine has an efficiency of 0.25. The engine is supplied with 200 kJ of chemical energy. Calculate the useful energy output.",
      questionSubtitle: "Show your working",
      equation: "useful output = efficiency × total input",
      steps: [
        { label: "Write the efficiency", value: "0.25", unit: "", hint: "Efficiency = 0.25 (25%)" },
        { label: "Write the total input", value: "200", unit: "kJ", hint: "Total chemical input = 200 kJ" },
        { label: "Calculate useful output", value: "50", unit: "kJ", hint: "Useful = 0.25 × 200 = 50 kJ" }
      ],
      answer: 50,
      answerUnit: "kJ",
      acceptRange: [49, 51],
      commonMistake: "Did you divide instead of multiply? Useful output = efficiency × total input.",
      tier: 2,
      senNote: "Rearranging: useful output = efficiency × total input. Here: 0.25 × 200 = 50 kJ."
    },
    {
      type: "calculation",
      question: "A Sankey diagram shows a light bulb: 60 J input, 6 J as light, the rest as heat. Calculate the wasted energy and the efficiency.",
      questionSubtitle: "Two-part calculation — find wasted energy first",
      equation: "wasted = total input − useful output; efficiency = useful ÷ total",
      steps: [
        { label: "Calculate wasted energy", value: "54", unit: "J", hint: "Wasted = 60 − 6 = 54 J" },
        { label: "Calculate efficiency", value: "0.1", unit: "", hint: "η = 6 ÷ 60 = 0.1 (10%)" }
      ],
      answer: 0.1,
      answerUnit: "",
      acceptRange: [0.09, 0.11],
      commonMistake: "Don't forget: total energy = useful + wasted. Sankey diagrams show ALL energy, including wasted.",
      tier: 2,
      senNote: "In a Sankey diagram the wide arrow is the total. Thin arrows are the useful and wasted outputs."
    },
  ],

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
  ],

  // ─── SPECIFIC LATENT HEAT: Q = mL ────────────────────────────────────
  specific_latent_heat: [
    {
      type: "calculation",
      question: "Calculate the energy needed to melt 3 kg of ice. Specific latent heat of fusion of water = 334 000 J/kg.",
      questionSubtitle: "Show your working",
      equation: "Q = m × L",
      steps: [
        { label: "Identify values", value: "3 kg and 334 000 J/kg", unit: "", hint: "m = 3 kg, L = 334 000 J/kg" },
        { label: "Calculate energy", value: "1002000", unit: "J", hint: "Q = 3 × 334 000 = 1 002 000 J" }
      ],
      answer: 1002000,
      answerUnit: "J",
      acceptRange: [1001000, 1003000],
      commonMistake: "Did you use L_fusion (334 000 J/kg) not L_vaporisation? Make sure you use the right value.",
      tier: 2,
      senNote: "Q = mL. Multiply mass by specific latent heat."
    },
    {
      type: "calculation",
      question: "0.4 kg of water is completely vaporised. Specific latent heat of vaporisation = 2 260 000 J/kg. Calculate the energy absorbed.",
      questionSubtitle: "Show your working",
      equation: "Q = m × L",
      steps: [
        { label: "Identify values", value: "0.4 kg and 2 260 000 J/kg", unit: "", hint: "m = 0.4 kg, L = 2 260 000 J/kg" },
        { label: "Calculate energy", value: "904000", unit: "J", hint: "Q = 0.4 × 2 260 000 = 904 000 J" }
      ],
      answer: 904000,
      answerUnit: "J",
      acceptRange: [903000, 905000],
      commonMistake: "Did you use L_vaporisation (2 260 000 J/kg)? Vaporisation requires much more energy than melting.",
      tier: 2,
      senNote: "Q = mL. Vaporisation L is about 7× larger than fusion L."
    },
    {
      type: "calculation",
      question: "1200 J of energy causes 0.006 kg of a substance to melt. Calculate the specific latent heat of fusion.",
      questionSubtitle: "Rearrange Q = mL → L = Q/m",
      equation: "L = Q ÷ m",
      steps: [
        { label: "Rearrange equation", value: "L = Q / m", unit: "", hint: "L = Q ÷ m" },
        { label: "Calculate L", value: "200000", unit: "J/kg", hint: "L = 1200 ÷ 0.006 = 200 000 J/kg" }
      ],
      answer: 200000,
      answerUnit: "J/kg",
      acceptRange: [199000, 201000],
      commonMistake: "Did you divide Q by m? Not multiply. L = Q ÷ m.",
      tier: 3,
      senNote: "Rearrange Q = mL → L = Q/m. Divide energy by mass."
    }
  ],

  // ─── NATIONAL GRID: P_loss = I²R, transformer equations ──────────────
  national_grid: [
    {
      type: "calculation",
      question: "A transmission cable has resistance 4 Ω and carries a current of 200 A. Calculate the power lost as heat.",
      questionSubtitle: "Show your working",
      equation: "P = I² × R",
      steps: [
        { label: "Square the current", value: "40000", unit: "A²", hint: "200² = 40 000" },
        { label: "Calculate power lost", value: "160000", unit: "W", hint: "P = 40 000 × 4 = 160 000 W" }
      ],
      answer: 160000,
      answerUnit: "W",
      acceptRange: [159000, 161000],
      commonMistake: "Did you SQUARE the current first? P = I² × R, not I × R.",
      tier: 2,
      senNote: "Square the current first, then multiply by resistance."
    },
    {
      type: "calculation",
      question: "A step-up transformer has 200 primary turns and 10 000 secondary turns. Input voltage = 25 V. Calculate the output voltage.",
      questionSubtitle: "V_s / V_p = N_s / N_p",
      equation: "Vs/Vp = Ns/Np",
      steps: [
        { label: "Write the ratio", value: "10000/200 = 50", unit: "", hint: "Turn ratio = 10 000 ÷ 200 = 50" },
        { label: "Calculate output voltage", value: "1250", unit: "V", hint: "Vs = 25 × 50 = 1250 V" }
      ],
      answer: 1250,
      answerUnit: "V",
      acceptRange: [1249, 1251],
      commonMistake: "Did you multiply Vp by the turn ratio (Ns/Np)? Vs = Vp × (Ns/Np).",
      tier: 3,
      senNote: "Turn ratio = Ns/Np. Multiply input voltage by this ratio."
    }
  ],

  // ─── SERIES / PARALLEL CIRCUITS ─────────────────────────────────────
  series_parallel: [
    {
      type: "calculation",
      question: "Two resistors of 8 Ω and 12 Ω are connected in series. Calculate the total resistance.",
      questionSubtitle: "Show your working",
      equation: "R_total = R1 + R2",
      steps: [
        { label: "Add the resistances", value: "20", unit: "Ω", hint: "R_total = 8 + 12 = 20 Ω" }
      ],
      answer: 20,
      answerUnit: "Ω",
      acceptRange: [19.5, 20.5],
      commonMistake: "In series, simply add all resistances. Do not use the reciprocal formula.",
      tier: 1,
      senNote: "Series: R_total = R1 + R2. The total is always bigger than each individual resistor."
    },
    {
      type: "calculation",
      question: "Two resistors of 6 Ω and 12 Ω are connected in parallel. Calculate the total resistance.",
      questionSubtitle: "Show your working",
      equation: "1/R_total = 1/R1 + 1/R2",
      steps: [
        { label: "Calculate 1/R1 + 1/R2", value: "0.25", unit: "Ω⁻¹", hint: "1/6 + 1/12 = 0.167 + 0.083 = 0.25" },
        { label: "Take the reciprocal", value: "4", unit: "Ω", hint: "R_total = 1 / 0.25 = 4 Ω" }
      ],
      answer: 4,
      answerUnit: "Ω",
      acceptRange: [3.9, 4.1],
      commonMistake: "Don't forget to take the reciprocal at the end. The answer must be less than the smallest resistor (6 Ω).",
      tier: 2,
      senNote: "Parallel: 1/R_total = 1/R1 + 1/R2 — then flip (reciprocal) to find R_total."
    },
    {
      type: "calculation",
      question: "Three resistors of 4 Ω, 6 Ω and 12 Ω are connected in parallel. Calculate the total resistance.",
      questionSubtitle: "Show your working",
      equation: "1/R_total = 1/R1 + 1/R2 + 1/R3",
      steps: [
        { label: "Calculate 1/4 + 1/6 + 1/12", value: "0.5", unit: "Ω⁻¹", hint: "0.25 + 0.167 + 0.083 = 0.5" },
        { label: "Take the reciprocal", value: "2", unit: "Ω", hint: "R_total = 1 / 0.5 = 2 Ω" }
      ],
      answer: 2,
      answerUnit: "Ω",
      acceptRange: [1.9, 2.1],
      commonMistake: "The total must be less than the smallest resistor (4 Ω). If your answer is bigger, you've added instead of using reciprocals.",
      tier: 3,
      senNote: "Sum all reciprocals first, then flip the total. Result must be smaller than the smallest branch."
    }
  ],

  // ─── DOMESTIC ELECTRICITY: E = QV, energy cost ───────────────────────
  domestic_electricity: [
    {
      type: "calculation",
      question: "A charge of 600 C passes through a 230 V mains appliance. Calculate the energy transferred.",
      questionSubtitle: "Show your working",
      equation: "E = Q × V",
      steps: [
        { label: "Identify values", value: "Q = 600 C, V = 230 V", unit: "", hint: "E = Q × V" },
        { label: "Calculate energy", value: "138000", unit: "J", hint: "E = 600 × 230 = 138 000 J" }
      ],
      answer: 138000,
      answerUnit: "J",
      acceptRange: [137000, 139000],
      commonMistake: "Make sure you use the charge in coulombs (C), not milliamps or amps.",
      tier: 2,
      senNote: "E = QV. Charge in coulombs, voltage in volts → energy in joules."
    },
    {
      type: "calculation",
      question: "A 2.5 kW washing machine runs for 2 hours. Electricity costs 28p per kWh. Calculate the cost of running it.",
      questionSubtitle: "Show your working",
      equation: "Energy (kWh) = P (kW) × t (h), Cost = Energy × price per unit",
      steps: [
        { label: "Calculate energy in kWh", value: "5", unit: "kWh", hint: "Energy = 2.5 kW × 2 h = 5 kWh" },
        { label: "Calculate cost", value: "140", unit: "p", hint: "Cost = 5 × 28p = 140p" }
      ],
      answer: 140,
      answerUnit: "p",
      acceptRange: [138, 142],
      commonMistake: "Power must be in kW (not W) and time in hours for the answer to come out in kWh.",
      tier: 2,
      senNote: "kWh = kW × hours. Multiply by cost per unit to get the price."
    },
    {
      type: "calculation",
      question: "An electric oven has a power of 3 kW. It is used for 45 minutes every day for 30 days. Electricity costs 32p per kWh. Calculate the total cost.",
      questionSubtitle: "Show your working",
      equation: "Energy (kWh) = P (kW) × t (h), Cost = Energy × price",
      steps: [
        { label: "Convert time to hours", value: "0.75", unit: "h", hint: "45 min ÷ 60 = 0.75 h per day" },
        { label: "Total hours over 30 days", value: "22.5", unit: "h", hint: "0.75 × 30 = 22.5 h" },
        { label: "Calculate energy in kWh", value: "67.5", unit: "kWh", hint: "3 kW × 22.5 h = 67.5 kWh" },
        { label: "Calculate cost", value: "2160", unit: "p", hint: "67.5 × 32p = 2160p = £21.60" }
      ],
      answer: 2160,
      answerUnit: "p",
      acceptRange: [2140, 2180],
      commonMistake: "Convert minutes to hours FIRST. 45 min = 0.75 h, not 45 h.",
      tier: 3,
      senNote: "Convert minutes to hours before calculating kWh. Then multiply by days, then by cost per unit."
    }
  ],

  // ─── WORK DONE: W = Fd ───────────────────────────────────────────────
  work_done: [
    {
      type: "calculation",
      question: "A person pushes a box with a force of 120 N along a flat surface for 15 m. Calculate the work done.",
      questionSubtitle: "Show your working",
      equation: "W = F × d",
      steps: [
        { label: "Calculate work done", value: "1800", unit: "J", hint: "W = 120 × 15 = 1800 J" }
      ],
      answer: 1800,
      answerUnit: "J",
      acceptRange: [1790, 1810],
      commonMistake: "Work is measured in joules (J). Make sure force is in newtons and distance in metres.",
      tier: 1,
      senNote: "W = F × d. Force × distance = work done. Units: N × m = J."
    },
    {
      type: "calculation",
      question: "A crane lifts a 250 kg load through a height of 12 m. Use g = 10 N/kg. Calculate the work done against gravity.",
      questionSubtitle: "Show your working",
      equation: "W = F × d (where F = weight = mg)",
      steps: [
        { label: "Calculate weight", value: "2500", unit: "N", hint: "W = mg = 250 × 10 = 2500 N" },
        { label: "Calculate work done", value: "30000", unit: "J", hint: "Work = 2500 × 12 = 30 000 J" }
      ],
      answer: 30000,
      answerUnit: "J",
      acceptRange: [29500, 30500],
      commonMistake: "The force needed to lift is equal to the weight (mg), not the mass alone.",
      tier: 2,
      senNote: "Force for lifting = weight = mg. Then W = F × d."
    },
    {
      type: "calculation",
      question: "A car engine does 180 kJ of work to move a car 600 m. Calculate the driving force.",
      questionSubtitle: "Rearrange W = Fd to find force.",
      equation: "F = W ÷ d",
      steps: [
        { label: "Convert energy to joules", value: "180000", unit: "J", hint: "180 kJ × 1000 = 180 000 J" },
        { label: "Calculate force", value: "300", unit: "N", hint: "F = 180 000 ÷ 600 = 300 N" }
      ],
      answer: 300,
      answerUnit: "N",
      acceptRange: [298, 302],
      commonMistake: "Did you convert kJ to J? 180 kJ = 180 000 J.",
      tier: 2,
      senNote: "Rearrange W = Fd → F = W/d. Convert kJ to J first."
    }
  ],

  // ─── MOMENTS: M = Fd ─────────────────────────────────────────────────
  moments: [
    {
      type: "calculation",
      question: "A force of 30 N is applied 0.4 m from a pivot. Calculate the moment.",
      questionSubtitle: "Show your working",
      equation: "M = F × d",
      steps: [
        { label: "Calculate moment", value: "12", unit: "N m", hint: "M = 30 × 0.4 = 12 N m" }
      ],
      answer: 12,
      answerUnit: "N m",
      acceptRange: [11.5, 12.5],
      commonMistake: "Moment is measured in newton metres (N m), not newtons or metres alone.",
      tier: 1,
      senNote: "Moment = force × perpendicular distance from pivot."
    },
    {
      type: "calculation",
      question: "A lever is balanced. A 60 N force acts 2 m to the left of the pivot. A weight acts 1.5 m to the right. Calculate the unknown weight.",
      questionSubtitle: "Use the principle of moments: clockwise = anticlockwise.",
      equation: "F1 × d1 = F2 × d2",
      steps: [
        { label: "Calculate anticlockwise moment", value: "120", unit: "N m", hint: "60 × 2 = 120 N m" },
        { label: "Calculate unknown force", value: "80", unit: "N", hint: "F2 = 120 ÷ 1.5 = 80 N" }
      ],
      answer: 80,
      answerUnit: "N",
      acceptRange: [79, 81],
      commonMistake: "Did you use the principle of moments? Clockwise moment = anticlockwise moment when balanced.",
      tier: 2,
      senNote: "Balanced lever: moment on left = moment on right. Rearrange to find the unknown."
    },
    {
      type: "calculation",
      question: "A door handle is 75 cm from the hinge. A force of 8 N is needed to open it. Calculate the moment produced.",
      questionSubtitle: "Convert cm to m first.",
      equation: "M = F × d",
      steps: [
        { label: "Convert distance to metres", value: "0.75", unit: "m", hint: "75 cm ÷ 100 = 0.75 m" },
        { label: "Calculate moment", value: "6", unit: "N m", hint: "M = 8 × 0.75 = 6 N m" }
      ],
      answer: 6,
      answerUnit: "N m",
      acceptRange: [5.9, 6.1],
      commonMistake: "Convert cm to m before substituting. 75 cm = 0.75 m, not 75 m.",
      tier: 2,
      senNote: "Always convert distance to metres before calculating the moment."
    }
  ],

  // ─── SOUND AND ULTRASOUND: d = vt/2 ─────────────────────────────────
  sound_ultrasound: [
    {
      type: "calculation",
      question: "An ultrasound pulse is sent into the sea and an echo returns after 0.06 s. The speed of sound in water is 1500 m/s. Calculate the depth of the seabed.",
      questionSubtitle: "Show your working",
      equation: "d = v × t ÷ 2",
      steps: [
        { label: "Divide time by 2", value: "0.03", unit: "s", hint: "The pulse travels down AND back: 0.06 ÷ 2 = 0.03 s" },
        { label: "Calculate depth", value: "45", unit: "m", hint: "d = 1500 × 0.03 = 45 m" }
      ],
      answer: 45,
      answerUnit: "m",
      acceptRange: [44, 46],
      commonMistake: "Did you halve the time? The echo takes twice as long because it travels there AND back.",
      tier: 2,
      senNote: "Halve the total time first. The pulse only goes ONE WAY to the bottom."
    },
    {
      type: "calculation",
      question: "An ultrasound scanner sends a pulse into a patient. An echo returns in 80 μs. Speed of ultrasound in tissue = 1540 m/s. Calculate the depth of the reflecting surface.",
      questionSubtitle: "Show your working. 1 μs = 10⁻⁶ s.",
      equation: "d = v × t ÷ 2",
      steps: [
        { label: "Convert time to seconds", value: "0.00008", unit: "s", hint: "80 μs = 80 × 10⁻⁶ = 8 × 10⁻⁵ s" },
        { label: "Halve the time", value: "0.00004", unit: "s", hint: "t/2 = 4 × 10⁻⁵ s" },
        { label: "Calculate depth", value: "0.0616", unit: "m", hint: "d = 1540 × 4 × 10⁻⁵ = 0.0616 m ≈ 6.2 cm" }
      ],
      answer: 0.0616,
      answerUnit: "m",
      acceptRange: [0.06, 0.064],
      commonMistake: "Did you convert μs to seconds? 1 μs = 10⁻⁶ s. Then halve the time before multiplying.",
      tier: 3,
      senNote: "μs → s: multiply by 10⁻⁶. Halve the time before calculating distance."
    }
  ],

  // ─── EM SPECTRUM: c = fλ ─────────────────────────────────────────────
  em_spectrum: [
    {
      type: "calculation",
      question: "Microwaves used in a kitchen have a frequency of 2.45 GHz. The speed of light is 3.0 × 10⁸ m/s. Calculate the wavelength.",
      questionSubtitle: "Show your working",
      equation: "λ = c ÷ f",
      steps: [
        { label: "Convert frequency to Hz", value: "2.45e9", unit: "Hz", hint: "2.45 GHz = 2.45 × 10⁹ Hz" },
        { label: "Calculate wavelength", value: "0.122", unit: "m", hint: "λ = 3.0 × 10⁸ ÷ 2.45 × 10⁹ ≈ 0.122 m" }
      ],
      answer: 0.122,
      answerUnit: "m",
      acceptRange: [0.12, 0.125],
      commonMistake: "Did you convert GHz to Hz? 1 GHz = 10⁹ Hz.",
      tier: 3,
      senNote: "GHz → Hz: multiply by 10⁹. Then λ = c/f."
    },
    {
      type: "calculation",
      question: "X-rays have a wavelength of 1.0 × 10⁻¹⁰ m. The speed of light is 3.0 × 10⁸ m/s. Calculate the frequency of the X-rays. Give your answer in standard form.",
      questionSubtitle: "Show your working",
      equation: "f = c ÷ λ",
      steps: [
        { label: "Apply equation", value: "f = 3.0 × 10⁸ ÷ 1.0 × 10⁻¹⁰", unit: "", hint: "Divide speed by wavelength" },
        { label: "Calculate frequency", value: "3.0 × 10¹⁸", unit: "Hz", hint: "f = 3.0 × 10⁸⁺¹⁰ = 3.0 × 10¹⁸ Hz" }
      ],
      answer: 3.0e18,
      answerUnit: "Hz",
      acceptRange: [2.9e18, 3.1e18],
      commonMistake: "When dividing powers of 10, subtract the exponents: 10⁸ ÷ 10⁻¹⁰ = 10⁸⁻⁽⁻¹⁰⁾ = 10¹⁸.",
      tier: 3,
      senNote: "Dividing powers: subtract exponents. 10⁸ ÷ 10⁻¹⁰ = 10¹⁸ (minus a negative = add)."
    }
  ],

  // ─── LENSES: magnification = image height / object height ────────────
  lenses: [
    {
      type: "calculation",
      question: "A converging lens forms an image 9 cm tall of an object 3 cm tall. Calculate the magnification.",
      questionSubtitle: "Show your working",
      equation: "magnification = image height ÷ object height",
      steps: [
        { label: "Calculate magnification", value: "3", unit: "", hint: "m = 9 ÷ 3 = 3" }
      ],
      answer: 3,
      answerUnit: "",
      acceptRange: [2.9, 3.1],
      commonMistake: "Magnification = image ÷ object (not object ÷ image). If >1, the image is bigger than the object.",
      tier: 1,
      senNote: "Magnification = image height / object height. No unit."
    },
    {
      type: "calculation",
      question: "A lens has a magnification of 4. The object is 2.5 cm tall. Calculate the height of the image.",
      questionSubtitle: "Rearrange the magnification equation.",
      equation: "image height = magnification × object height",
      steps: [
        { label: "Calculate image height", value: "10", unit: "cm", hint: "image height = 4 × 2.5 = 10 cm" }
      ],
      answer: 10,
      answerUnit: "cm",
      acceptRange: [9.8, 10.2],
      commonMistake: "Rearrange: image height = magnification × object height. Multiply, don't divide.",
      tier: 1,
      senNote: "Image height = magnification × object height."
    },
    {
      type: "calculation",
      question: "A microscope lens produces a magnification of 40. The image formed is 8 cm tall. Calculate the height of the actual object in mm.",
      questionSubtitle: "Rearrange the magnification equation and convert units.",
      equation: "object height = image height ÷ magnification",
      steps: [
        { label: "Calculate object height in cm", value: "0.2", unit: "cm", hint: "object height = 8 ÷ 40 = 0.2 cm" },
        { label: "Convert to mm", value: "2", unit: "mm", hint: "0.2 cm × 10 = 2 mm" }
      ],
      answer: 2,
      answerUnit: "mm",
      acceptRange: [1.9, 2.1],
      commonMistake: "Divide image by magnification (not multiply). Then convert cm to mm (×10).",
      tier: 2,
      senNote: "Rearrange for object height, then convert cm → mm by multiplying by 10."
    }
  ],

  // ─── ENERGY RESOURCES: compare, evaluate, cost-benefit ──────────────
  energy_resources: [
    {
      type: "calculation",
      question: "A wind turbine has a power output of 3 MW and runs at 35% efficiency. Calculate the useful power output in watts.",
      questionSubtitle: "Efficiency = useful output ÷ total input",
      equation: "Useful power = efficiency × input power",
      steps: [
        { label: "Convert MW to W", value: "3000000", unit: "W", hint: "3 MW × 1 000 000 = 3 000 000 W" },
        { label: "Calculate useful output", value: "1050000", unit: "W", hint: "0.35 × 3 000 000 = 1 050 000 W" }
      ],
      answer: 1050000,
      answerUnit: "W",
      acceptRange: [1040000, 1060000],
      commonMistake: "Convert MW to W first. Efficiency as a decimal: 35% = 0.35, not 35.",
      tier: 2,
      senNote: "Efficiency as a decimal × input power = useful power out. MW → W: multiply by 1 000 000."
    },
    {
      type: "calculation",
      question: "A coal power station generates 500 MW but only 38% is useful electrical power. How much power is wasted as heat?",
      questionSubtitle: "Wasted = input − useful output",
      equation: "Wasted power = Input − (efficiency × input)",
      steps: [
        { label: "Calculate useful power", value: "190", unit: "MW", hint: "0.38 × 500 = 190 MW" },
        { label: "Calculate wasted power", value: "310", unit: "MW", hint: "500 − 190 = 310 MW" }
      ],
      answer: 310,
      answerUnit: "MW",
      acceptRange: [308, 312],
      commonMistake: "Useful = 38% of input. Wasted = the remaining 62%. Don't confuse useful and wasted.",
      tier: 3,
      senNote: "Wasted = total − useful. If 38% useful, then 62% wasted."
    }
  ],

  // ─── EM SPECTRUM: c = fλ calculations ────────────────────────────────
  em_spectrum: [
    {
      type: "calculation",
      question: "Calculate the frequency of a radio wave with wavelength 300 m. Speed of light = 3 × 10⁸ m/s.",
      questionSubtitle: "c = fλ → f = c ÷ λ",
      equation: "f = c ÷ λ",
      steps: [
        { label: "Identify values", value: "c = 3×10⁸ m/s, λ = 300 m", unit: "", hint: "f = c ÷ λ" },
        { label: "Calculate frequency", value: "1000000", unit: "Hz", hint: "f = 3×10⁸ ÷ 300 = 1 000 000 Hz (1 MHz)" }
      ],
      answer: 1000000,
      answerUnit: "Hz",
      acceptRange: [990000, 1010000],
      commonMistake: "Divide c by λ (not multiply). Speed of light = 3 × 10⁸ m/s.",
      tier: 2,
      senNote: "f = c ÷ λ. All EM waves travel at 3 × 10⁸ m/s in a vacuum."
    },
    {
      type: "calculation",
      question: "A gamma ray has frequency 3 × 10²⁰ Hz. Calculate its wavelength. Speed of light = 3 × 10⁸ m/s.",
      questionSubtitle: "c = fλ → λ = c ÷ f",
      equation: "λ = c ÷ f",
      steps: [
        { label: "Rearrange equation", value: "λ = c ÷ f", unit: "", hint: "λ = 3×10⁸ ÷ 3×10²⁰" },
        { label: "Calculate wavelength", value: "1e-12", unit: "m", hint: "λ = 10⁻¹² m = 1 pm (picometer)" }
      ],
      answer: 1e-12,
      answerUnit: "m",
      acceptRange: [0.9e-12, 1.1e-12],
      commonMistake: "Use the indices: 10⁸ ÷ 10²⁰ = 10⁻¹². Very short wavelength because gamma is very high frequency.",
      tier: 3,
      senNote: "λ = c ÷ f. Gamma: very high frequency → very short wavelength. Use index arithmetic."
    },
    {
      type: "calculation",
      question: "Microwave ovens use radiation of wavelength 0.12 m. Calculate the frequency. Speed of light = 3 × 10⁸ m/s.",
      questionSubtitle: "f = c ÷ λ",
      equation: "f = c ÷ λ",
      steps: [
        { label: "Substitute values", value: "f = 3×10⁸ ÷ 0.12", unit: "", hint: "f = c ÷ λ" },
        { label: "Calculate frequency", value: "2500000000", unit: "Hz", hint: "f = 2.5 × 10⁹ Hz = 2.5 GHz" }
      ],
      answer: 2.5e9,
      answerUnit: "Hz",
      acceptRange: [2.4e9, 2.6e9],
      commonMistake: "Divide c by λ. Be careful dividing by a decimal: 3×10⁸ ÷ 0.12 = 2.5 × 10⁹.",
      tier: 2,
      senNote: "f = c ÷ λ. Microwave ovens use ~2.45 GHz — the frequency that water molecules absorb most efficiently."
    }
  ],

  // ─── TOTAL INTERNAL REFLECTION: n = sin i / sin r, sin c = 1/n ───────
  total_internal_reflection: [
    {
      type: "calculation",
      question: "Glass has a refractive index of 1.5. Calculate the critical angle.",
      questionSubtitle: "sin(c) = 1/n",
      equation: "sin(c) = 1/n",
      steps: [
        { label: "Apply formula", value: "sin(c) = 1/1.5 = 0.667", unit: "", hint: "sin(c) = 1 ÷ n" },
        { label: "Find critical angle", value: "41.8", unit: "°", hint: "c = sin⁻¹(0.667) = 41.8°" }
      ],
      answer: 41.8,
      answerUnit: "°",
      acceptRange: [41, 42.5],
      commonMistake: "Did you use sin(c) = 1/n, not n itself? Then find the inverse sine.",
      tier: 2,
      senNote: "sin(c) = 1/n → c = sin⁻¹(1/n). Use your calculator's inverse sine button."
    },
    {
      type: "calculation",
      question: "Light hits a glass–air boundary at 30°. The refracted angle in air is 48.6°. Calculate the refractive index of the glass.",
      questionSubtitle: "n = sin(r) / sin(i) — but light going from glass to air",
      equation: "n = sin(angle in air) / sin(angle in glass)",
      steps: [
        { label: "Identify angles", value: "i = 30° (glass), r = 48.6° (air)", unit: "", hint: "Light travels from glass to air" },
        { label: "Apply Snell's law", value: "n = sin(48.6°)/sin(30°)", unit: "", hint: "n = 0.75 ÷ 0.5" },
        { label: "Calculate n", value: "1.5", unit: "", hint: "n = 0.75 / 0.5 = 1.5" }
      ],
      answer: 1.5,
      answerUnit: "",
      acceptRange: [1.45, 1.55],
      commonMistake: "When light exits glass into air, use n = sin(air angle)/sin(glass angle).",
      tier: 3,
      senNote: "Snell's law: n₁ sin θ₁ = n₂ sin θ₂. For air n=1, so n_glass = sin(θ_air)/sin(θ_glass)."
    }
  ],
};

export default examCalculations;
