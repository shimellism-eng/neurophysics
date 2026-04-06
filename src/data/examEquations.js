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
