const examEquations = {

  // ===== 1. Energy Equations =====
  energy_equations: [
    {
      type: "equation-recall",
      question: "Which equation links gravitational potential energy, mass, height and gravitational field strength?",
      questionSubtitle: "This equation must be memorised.",
      options: ["Ep = mgh", "Ep = ½mv²", "Ep = mg/h", "Ep = mh/g"],
      correctAnswer: 0,
      onSheet: false,
      tier: 1,
      senNote: "GPE = mass x gravitational field strength x height.",
    },
    {
      type: "equation-recall",
      question: "Which equation links kinetic energy, mass and speed?",
      questionSubtitle: "This equation must be memorised.",
      options: ["Ek = mv²", "Ek = ½mv", "Ek = ½mv²", "Ek = 2mv²"],
      correctAnswer: 2,
      onSheet: false,
      tier: 1,
      senNote: "KE = half x mass x speed SQUARED. Don't forget the half!",
    },
  ],

  // ===== 2. Efficiency =====
  efficiency: [
    {
      type: "equation-recall",
      question: "Which equation links efficiency, useful output and total input energy?",
      questionSubtitle: "This equation must be memorised.",
      options: [
        "Efficiency = total input / useful output",
        "Efficiency = useful output / total input",
        "Efficiency = useful output x total input",
        "Efficiency = total input - useful output",
      ],
      correctAnswer: 1,
      onSheet: false,
      tier: 1,
      senNote: "Efficiency = useful output DIVIDED BY total input. It is always 1 or less.",
    },
    {
      type: "equation-recall",
      question: "An appliance has 300 J input and 210 J useful output. What is the efficiency?",
      questionSubtitle: "Use the efficiency equation.",
      options: ["0.3", "0.7", "1.4", "90"],
      correctAnswer: 1,
      onSheet: false,
      tier: 1,
      senNote: "Divide useful output by total input: 210 / 300 = 0.7.",
    },
  ],

  // ===== 3. Power Calculations =====
  power_calc: [
    {
      type: "equation-recall",
      question: "Which equation links energy transferred, power and time?",
      questionSubtitle: "This equation must be memorised.",
      options: ["E = P/t", "E = Pt", "E = P + t", "E = t/P"],
      correctAnswer: 1,
      onSheet: false,
      tier: 1,
      senNote: "Energy = power x time. Power is how fast energy is transferred.",
    },
    {
      type: "equation-recall",
      question: "Which equation correctly rearranges to find power from energy and time?",
      questionSubtitle: "This equation must be memorised.",
      options: ["P = Et", "P = E/t", "P = t/E", "P = E - t"],
      correctAnswer: 1,
      onSheet: false,
      tier: 1,
      senNote: "Power = energy divided by time. Measured in watts (W).",
    },
  ],

  // ===== 4. Circuit Basics =====
  circuit_basics: [
    {
      type: "equation-recall",
      question: "Which equation links potential difference, current and resistance?",
      questionSubtitle: "This equation must be memorised.",
      options: ["V = I/R", "V = IR", "V = R/I", "V = I + R"],
      correctAnswer: 1,
      onSheet: false,
      tier: 1,
      senNote: "V = I x R. Voltage = current times resistance.",
    },
    {
      type: "equation-recall",
      question: "Which equation links charge, current and time?",
      questionSubtitle: "This equation must be memorised.",
      options: ["Q = I/t", "Q = It", "Q = t/I", "Q = I²t"],
      correctAnswer: 1,
      onSheet: false,
      tier: 1,
      senNote: "Charge = current x time. Current is the rate of flow of charge.",
    },
  ],

  // ===== 5. Electrical Power =====
  electrical_power: [
    {
      type: "equation-recall",
      question: "Which equation links power, current and potential difference?",
      questionSubtitle: "This equation must be memorised.",
      options: ["P = V/I", "P = VI", "P = V²I", "P = I/V"],
      correctAnswer: 1,
      onSheet: false,
      tier: 1,
      senNote: "Power = voltage x current. Both measured in standard units.",
    },
    {
      type: "equation-recall",
      question: "Which equation links power, current and resistance?",
      questionSubtitle: "This equation is on the equation sheet.",
      options: ["P = IR", "P = I²R", "P = IR²", "P = I²/R"],
      correctAnswer: 1,
      onSheet: true,
      tier: 1,
      senNote: "Power = current SQUARED times resistance. Note the squared on the current.",
    },
  ],

  // ===== 6. Wave Properties =====
  wave_properties: [
    {
      type: "equation-recall",
      question: "Which equation links wave speed, frequency and wavelength?",
      questionSubtitle: "This equation must be memorised.",
      options: ["v = f/λ", "v = fλ", "v = λ/f", "v = f + λ"],
      correctAnswer: 1,
      onSheet: false,
      tier: 1,
      senNote: "Wave speed = frequency x wavelength. v = f times lambda.",
    },
    {
      type: "equation-recall",
      question: "A wave has frequency 500 Hz and wavelength 0.4 m. Which calculation gives the wave speed?",
      questionSubtitle: "Apply the wave equation.",
      options: ["500 / 0.4 = 1250 m/s", "500 x 0.4 = 200 m/s", "0.4 / 500 = 0.0008 m/s", "500 + 0.4 = 500.4 m/s"],
      correctAnswer: 1,
      onSheet: false,
      tier: 1,
      senNote: "v = f x lambda = 500 x 0.4 = 200 m/s.",
    },
  ],

  // ===== 7. Fluid Pressure =====
  fluid_pressure: [
    {
      type: "equation-recall",
      question: "Which equation links pressure, force and area?",
      questionSubtitle: "This equation must be memorised.",
      options: ["p = FA", "p = A/F", "p = F/A", "p = F - A"],
      correctAnswer: 2,
      onSheet: false,
      tier: 1,
      senNote: "Pressure = force divided by area. Smaller area means more pressure.",
    },
    {
      type: "equation-recall",
      question: "Which equation links pressure in a column of liquid to depth?",
      questionSubtitle: "This equation is on the equation sheet.",
      options: ["p = ρg/h", "p = ρgh", "p = ρh/g", "p = hg/ρ"],
      correctAnswer: 1,
      onSheet: true,
      tier: 1,
      senNote: "Pressure = density x g x height. Deeper liquid means more pressure.",
    },
  ],

  // ===== 8. Newton's Laws =====
  newtons_laws: [
    {
      type: "equation-recall",
      question: "Which equation links force, mass and acceleration?",
      questionSubtitle: "This equation must be memorised.",
      options: ["F = m/a", "F = ma", "F = a/m", "F = m + a"],
      correctAnswer: 1,
      onSheet: false,
      tier: 1,
      senNote: "Force = mass x acceleration. This is Newton's second law.",
    },
    {
      type: "equation-recall",
      question: "A 1200 kg car accelerates at 2 m/s². Which calculation gives the resultant force?",
      questionSubtitle: "Apply Newton's second law.",
      options: ["1200 / 2 = 600 N", "1200 + 2 = 1202 N", "1200 x 2 = 2400 N", "1200² x 2 = 2880000 N"],
      correctAnswer: 2,
      onSheet: false,
      tier: 1,
      senNote: "F = m x a = 1200 x 2 = 2400 N.",
    },
  ],

  // ===== 9. Momentum =====
  momentum: [
    {
      type: "equation-recall",
      question: "Which equation links momentum, mass and velocity?",
      questionSubtitle: "This equation must be memorised.",
      options: ["p = m/v", "p = mv", "p = v/m", "p = mv²"],
      correctAnswer: 1,
      onSheet: false,
      tier: 1,
      senNote: "Momentum = mass x velocity. Momentum has direction because velocity does.",
    },
    {
      type: "equation-recall",
      question: "A 0.5 kg ball travels at 10 m/s. Which calculation gives its momentum?",
      questionSubtitle: "Apply the momentum equation.",
      options: ["10 / 0.5 = 20 kg m/s", "0.5 x 10 = 5 kg m/s", "0.5 x 10² = 50 kg m/s", "0.5 + 10 = 10.5 kg m/s"],
      correctAnswer: 1,
      onSheet: false,
      tier: 1,
      senNote: "p = m x v = 0.5 x 10 = 5 kg m/s.",
    },
  ],

  // ===== Specific Latent Heat =====
  specific_latent_heat: [
    {
      type: "equation-recall",
      question: "Which equation links thermal energy, mass and specific latent heat?",
      questionSubtitle: "This equation must be memorised.",
      options: ["Q = mcΔT", "Q = mL", "Q = Lm²", "Q = m/L"],
      correctAnswer: 1,
      onSheet: false,
      tier: 1,
      senNote: "Q = mL. Energy = mass × specific latent heat.",
    },
    {
      type: "equation-recall",
      question: "3 kg of ice melts. L_fusion = 334 000 J/kg. Which calculation gives the energy?",
      questionSubtitle: "Apply Q = mL.",
      options: ["3 + 334 000 = 334 003 J", "3 × 334 000 = 1 002 000 J", "334 000 / 3 = 111 333 J", "3² × 334 000 = 3 006 000 J"],
      correctAnswer: 1,
      onSheet: false,
      tier: 1,
      senNote: "Q = m × L = 3 × 334 000 = 1 002 000 J.",
    },
  ],

  // ===== National Grid =====
  national_grid: [
    {
      type: "equation-recall",
      question: "Which equation gives the power lost as heat in a transmission cable?",
      questionSubtitle: "Key equation for the National Grid.",
      options: ["P = IV", "P = I²R", "P = V²/R", "P = IR"],
      correctAnswer: 1,
      onSheet: false,
      tier: 1,
      senNote: "P_loss = I² × R. Doubling current quadruples power loss.",
    },
    {
      type: "equation-recall",
      question: "Which equation links transformer voltages and number of turns?",
      questionSubtitle: "This equation is on the equation sheet.",
      options: ["Vs/Vp = Np/Ns", "Vs/Vp = Ns/Np", "Vp × Vs = Np × Ns", "Vs = Vp + Ns"],
      correctAnswer: 1,
      onSheet: true,
      tier: 1,
      senNote: "Secondary/Primary voltage = Secondary/Primary turns. Step-up: Ns > Np.",
    },
  ],

  // ===== Total Internal Reflection =====
  total_internal_reflection: [
    {
      type: "equation-recall",
      question: "Which equation gives the critical angle c for a material with refractive index n?",
      questionSubtitle: "This equation must be memorised.",
      options: ["sin(c) = n", "sin(c) = 1/n", "c = 1/n", "sin(c) = n²"],
      correctAnswer: 1,
      onSheet: false,
      tier: 1,
      senNote: "sin(c) = 1/n. Then use sin⁻¹ to find angle c.",
    },
    {
      type: "equation-recall",
      question: "Glass has refractive index 1.5. What is sin(critical angle)?",
      questionSubtitle: "Apply sin(c) = 1/n.",
      options: ["1.5", "0.5", "0.667", "1.0"],
      correctAnswer: 2,
      onSheet: false,
      tier: 1,
      senNote: "sin(c) = 1/1.5 = 0.667. So c = 41.8°.",
    },
  ],

  // ===== Electromagnetism =====
  electromagnetism: [
    {
      type: "equation-recall",
      question: "What is the equation for the force between two magnets?",
      questionSubtitle: "Electromagnetism — key concept",
      options: [
        "The force depends on current and distance only",
        "Magnetic field strength B is proportional to current divided by distance",
        "There is no equation — it's qualitative only",
        "F = BIl applies to solenoids"
      ],
      correctAnswer: 2,
      onSheet: false,
      tier: 2,
      senNote: "For GCSE: electromagnet strength is qualitative (more turns, more current, iron core = stronger).",
    },
    {
      type: "equation-recall",
      question: "A solenoid has 200 turns and carries 3 A. Compared to 100 turns and 3 A, the field is approximately:",
      questionSubtitle: "Field is proportional to number of turns",
      options: ["The same", "Twice as strong", "Four times stronger", "Half as strong"],
      correctAnswer: 1,
      onSheet: false,
      tier: 2,
      senNote: "Double the turns → double the field strength (at same current).",
    },
  ],

  // ===== AC Generators =====
  ac_generators: [
    {
      type: "equation-recall",
      question: "Which equation links the induced EMF to the rate of change of magnetic flux?",
      questionSubtitle: "Faraday's law (qualitative understanding needed)",
      options: [
        "EMF = flux × time",
        "Greater the rate of change of flux linkage, greater the induced EMF",
        "EMF = BIl",
        "EMF = NΔΦ only"
      ],
      correctAnswer: 1,
      onSheet: false,
      tier: 2,
      senNote: "Faster change of flux → larger induced EMF. More turns → larger EMF.",
    },
    {
      type: "equation-recall",
      question: "An AC generator coil rotates at 50 rev/s. What is the frequency of the AC output?",
      questionSubtitle: "Frequency of output = rotation frequency",
      options: ["25 Hz", "100 Hz", "50 Hz", "1 Hz"],
      correctAnswer: 2,
      onSheet: false,
      tier: 2,
      senNote: "Each full rotation produces one complete AC cycle. Frequency = rotation rate.",
    },
  ],

  // ===== Series / Parallel Circuits =====
  series_parallel: [
    {
      type: "equation-recall",
      question: "In a series circuit, how is the total resistance calculated?",
      questionSubtitle: "This rule must be memorised.",
      options: [
        "R_total = R1 × R2",
        "R_total = R1 + R2 (+ R3 …)",
        "1/R_total = 1/R1 + 1/R2",
        "R_total = R1 / R2"
      ],
      correctAnswer: 1,
      onSheet: false,
      tier: 1,
      senNote: "Series circuit: add all resistances together. Total is always larger than any single one.",
    },
    {
      type: "equation-recall",
      question: "In a parallel circuit, which statement about total resistance is correct?",
      questionSubtitle: "This rule must be memorised.",
      options: [
        "Total resistance = R1 + R2",
        "Total resistance is greater than the largest branch",
        "1/R_total = 1/R1 + 1/R2 (+ 1/R3 …)",
        "Total resistance equals the smallest branch resistance"
      ],
      correctAnswer: 2,
      onSheet: false,
      tier: 2,
      senNote: "Parallel circuit: use the reciprocal formula. Total resistance is LESS than the smallest branch.",
    },
    {
      type: "equation-recall",
      question: "In a series circuit, two identical bulbs each have resistance 6 Ω. What is the total resistance?",
      questionSubtitle: "Apply the series resistance rule.",
      options: ["3 Ω", "6 Ω", "12 Ω", "36 Ω"],
      correctAnswer: 2,
      onSheet: false,
      tier: 1,
      senNote: "Series: R_total = 6 + 6 = 12 Ω. The total is always bigger than each individual resistor.",
    },
  ],

  // ===== Domestic Electricity =====
  domestic_electricity: [
    {
      type: "equation-recall",
      question: "Which equation links energy transferred, charge and potential difference?",
      questionSubtitle: "This equation must be memorised.",
      options: ["E = QV", "E = Q/V", "E = V/Q", "E = Q + V"],
      correctAnswer: 0,
      onSheet: false,
      tier: 1,
      senNote: "Energy = charge × voltage. E = QV.",
    },
    {
      type: "equation-recall",
      question: "A 2000 W tumble dryer runs for 3 hours. Electricity costs 30p per kWh. Which calculation gives the cost?",
      questionSubtitle: "Energy (kWh) = power (kW) × time (h), then multiply by cost per unit.",
      options: [
        "2000 × 3 × 30 = 180 000p",
        "2 × 3 × 30 = 180p",
        "2000 × 3 / 30 = 200p",
        "2 / 3 × 30 = 20p"
      ],
      correctAnswer: 1,
      onSheet: false,
      tier: 2,
      senNote: "Convert W → kW first (÷1000). Energy = 2 kW × 3 h = 6 kWh. Cost = 6 × 30 = 180p.",
    },
  ],

  // ===== Static Electricity =====
  static_electricity: [
    {
      type: "equation-recall",
      question: "When a plastic rod is rubbed with a cloth, it becomes negatively charged. What has happened?",
      questionSubtitle: "Think about which particles can move.",
      options: [
        "Protons moved from the cloth to the rod",
        "Electrons moved from the rod to the cloth",
        "Electrons moved from the cloth to the rod",
        "Neutrons were shared between the rod and cloth"
      ],
      correctAnswer: 2,
      onSheet: false,
      tier: 1,
      senNote: "Only electrons move during charging. Gain electrons → negative charge.",
    },
    {
      type: "equation-recall",
      question: "Two objects with the same charge are brought close together. What happens?",
      questionSubtitle: "Like charges and unlike charges.",
      options: [
        "They attract each other",
        "They repel each other",
        "Nothing happens",
        "They discharge through the air"
      ],
      correctAnswer: 1,
      onSheet: false,
      tier: 1,
      senNote: "Like charges repel. Unlike charges attract. Same rule as magnets.",
    },
  ],

  // ===== Force Interactions =====
  force_interactions: [
    {
      type: "equation-recall",
      question: "Newton's third law says that when object A exerts a force on object B, what happens?",
      questionSubtitle: "Newton's third law — action and reaction.",
      options: [
        "Object B does not feel a force",
        "Object B exerts an equal and opposite force on object A",
        "Object B exerts a larger force back on object A",
        "Object B exerts a force in the same direction as object A"
      ],
      correctAnswer: 1,
      onSheet: false,
      tier: 1,
      senNote: "Newton's 3rd law: forces come in equal and opposite pairs, acting on DIFFERENT objects.",
    },
    {
      type: "equation-recall",
      question: "A 5 kg object accelerates at 4 m/s². Which calculation gives the resultant force?",
      questionSubtitle: "Apply Newton's second law.",
      options: ["5 / 4 = 1.25 N", "5 + 4 = 9 N", "5 × 4 = 20 N", "4 / 5 = 0.8 N"],
      correctAnswer: 2,
      onSheet: false,
      tier: 1,
      senNote: "F = ma = 5 × 4 = 20 N.",
    },
  ],

  // ===== Work Done =====
  work_done: [
    {
      type: "equation-recall",
      question: "Which equation links work done, force and distance?",
      questionSubtitle: "This equation must be memorised.",
      options: ["W = F/d", "W = Fd", "W = d/F", "W = F + d"],
      correctAnswer: 1,
      onSheet: false,
      tier: 1,
      senNote: "Work done = force × distance. Measured in joules (J).",
    },
    {
      type: "equation-recall",
      question: "A force of 50 N moves an object 8 m. Which calculation gives the work done?",
      questionSubtitle: "Apply W = Fd.",
      options: ["50 / 8 = 6.25 J", "50 + 8 = 58 J", "50 × 8 = 400 J", "8 / 50 = 0.16 J"],
      correctAnswer: 2,
      onSheet: false,
      tier: 1,
      senNote: "W = F × d = 50 × 8 = 400 J.",
    },
  ],

  // ===== Moments =====
  moments: [
    {
      type: "equation-recall",
      question: "Which equation links moment, force and perpendicular distance?",
      questionSubtitle: "This equation must be memorised.",
      options: ["M = F/d", "M = Fd", "M = d/F", "M = F + d"],
      correctAnswer: 1,
      onSheet: false,
      tier: 1,
      senNote: "Moment = force × perpendicular distance from pivot. Measured in N m.",
    },
    {
      type: "equation-recall",
      question: "For a balanced lever, which statement is correct?",
      questionSubtitle: "The principle of moments.",
      options: [
        "Total clockwise moments = total anticlockwise moments",
        "Total clockwise force = total anticlockwise force",
        "The pivot must be at the centre",
        "All forces must be equal"
      ],
      correctAnswer: 0,
      onSheet: false,
      tier: 1,
      senNote: "Balanced lever: clockwise moments = anticlockwise moments. Moments, not forces.",
    },
  ],

  // ===== Sound and Ultrasound =====
  sound_ultrasound: [
    {
      type: "equation-recall",
      question: "Which equation is used to find the distance to a reflecting surface using ultrasound?",
      questionSubtitle: "The pulse travels there and back.",
      options: ["d = vt", "d = vt / 2", "d = 2vt", "d = v / t"],
      correctAnswer: 1,
      onSheet: false,
      tier: 2,
      senNote: "d = vt/2. Divide by 2 because the pulse travels to the surface AND back.",
    },
    {
      type: "equation-recall",
      question: "Ultrasound travels at 1500 m/s in water. An echo returns in 0.04 s. Which calculation gives the depth?",
      questionSubtitle: "Apply d = vt / 2.",
      options: ["1500 × 0.04 = 60 m", "1500 × 0.04 / 2 = 30 m", "1500 / 0.04 = 37 500 m", "0.04 / 1500 = 0.000027 m"],
      correctAnswer: 1,
      onSheet: false,
      tier: 2,
      senNote: "d = vt/2 = 1500 × 0.04 / 2 = 30 m. Halve the total travel time.",
    },
  ],

  // ===== Electromagnetic Spectrum =====
  em_spectrum: [
    {
      type: "equation-recall",
      question: "Which equation links the speed of light, frequency and wavelength for EM waves?",
      questionSubtitle: "All EM waves travel at the same speed in a vacuum.",
      options: ["c = f/λ", "c = fλ", "c = λ/f", "c = f + λ"],
      correctAnswer: 1,
      onSheet: false,
      tier: 1,
      senNote: "c = fλ. Speed of light = frequency × wavelength. c = 3 × 10⁸ m/s.",
    },
    {
      type: "equation-recall",
      question: "Which part of the EM spectrum has the highest frequency?",
      questionSubtitle: "Know the order of the spectrum.",
      options: ["Radio waves", "Visible light", "X-rays", "Gamma rays"],
      correctAnswer: 3,
      onSheet: false,
      tier: 1,
      senNote: "Order from lowest to highest frequency: radio, microwave, infrared, visible, UV, X-ray, gamma.",
    },
  ],

  // ===== Lenses =====
  lenses: [
    {
      type: "equation-recall",
      question: "Which equation gives the magnification produced by a lens?",
      questionSubtitle: "This equation must be memorised.",
      options: [
        "magnification = object height / image height",
        "magnification = image height / object height",
        "magnification = image height × object height",
        "magnification = object distance / image distance"
      ],
      correctAnswer: 1,
      onSheet: false,
      tier: 1,
      senNote: "Magnification = image height ÷ object height. A magnification > 1 means the image is bigger.",
    },
    {
      type: "equation-recall",
      question: "A lens produces an image 6 cm tall of an object 2 cm tall. What is the magnification?",
      questionSubtitle: "Apply the magnification equation.",
      options: ["0.33", "3", "4", "12"],
      correctAnswer: 1,
      onSheet: false,
      tier: 1,
      senNote: "Magnification = 6 / 2 = 3. The image is 3 times bigger than the object.",
    },
  ],

  // ===== Magnetism and Magnetic Fields =====
  magnetism_fields: [
    {
      type: "equation-recall",
      question: "Which statement correctly describes magnetic field lines around a bar magnet?",
      questionSubtitle: "Field lines show the direction of the magnetic force.",
      options: [
        "Field lines go from south to north outside the magnet",
        "Field lines go from north to south outside the magnet",
        "Field lines go in circles around the centre",
        "Field lines only exist inside the magnet"
      ],
      correctAnswer: 1,
      onSheet: false,
      tier: 1,
      senNote: "Outside the magnet: field lines go from North pole to South pole.",
    },
    {
      type: "equation-recall",
      question: "Which rule gives the direction of the force on a current-carrying conductor in a magnetic field?",
      questionSubtitle: "Fleming's left-hand rule.",
      options: [
        "The right-hand grip rule",
        "Fleming's left-hand rule",
        "Lenz's law",
        "The corkscrew rule"
      ],
      correctAnswer: 1,
      onSheet: false,
      tier: 2,
      senNote: "Fleming's left-hand rule: thuMb = Motion, First finger = Field, seCond finger = Current.",
    },
  ],

  // ===== 10. Motor Effect =====
  motor_effect: [
    {
      type: "equation-recall",
      question: "Which equation links force on a conductor, magnetic flux density, current and length?",
      questionSubtitle: "This equation is on the equation sheet.",
      options: ["F = BIl", "F = B/Il", "F = BlI²", "F = BI/l"],
      correctAnswer: 0,
      onSheet: true,
      tier: 1,
      senNote: "Force = magnetic flux density x current x length. F = BIl.",
    },
    {
      type: "equation-recall",
      question: "A 0.2 m wire carries 3 A in a 0.5 T magnetic field. Which calculation gives the force?",
      questionSubtitle: "Apply the motor effect equation.",
      options: ["0.5 x 3 / 0.2 = 7.5 N", "0.5 + 3 + 0.2 = 3.7 N", "0.5 x 3 x 0.2 = 0.3 N", "3 x 0.2 / 0.5 = 1.2 N"],
      correctAnswer: 2,
      onSheet: true,
      tier: 1,
      senNote: "F = B x I x l = 0.5 x 3 x 0.2 = 0.3 N.",
    },
  ],
};

export default examEquations;
