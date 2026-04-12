/**
 * qb-practicals.js
 * Exam practice questions for all 11 Required Practicals.
 * topicId matches the practical id (e.g. 'shc', 'resistance').
 * Tier 1: recall (MCQ) | Tier 2: application | Tier 3: extended method/evaluation
 */

const practicalsQuestions = [

  // ─────────────────────────────────────────────────────────────────────────────
  // RP1: SPECIFIC HEAT CAPACITY (shc)
  // ─────────────────────────────────────────────────────────────────────────────

  { id: 'shc_t1_01', topicId: 'shc', course: 'combined', tier: 1, type: 'mcq', marks: 1, timeExpected: 30,
    question: 'In the specific heat capacity experiment, what is the independent variable?',
    options: ['Temperature rise of the block', 'Time (from which energy supplied is calculated)', 'Mass of the block', 'Type of metal used'],
    correctIndex: 1,
    senNote: 'The independent variable is what you directly control — you set the time using a stopwatch. Energy is then calculated from E = P × t. Either "time" or "energy supplied" may be accepted, as energy is derived from time.' },

  { id: 'shc_t1_02', topicId: 'shc', course: 'combined', tier: 1, type: 'mcq', marks: 1, timeExpected: 30,
    question: 'In the specific heat capacity experiment, what is the dependent variable?',
    options: ['Mass of the metal block', 'Power of the heater', 'Temperature rise (ΔT)', 'Voltage of the power supply'],
    correctIndex: 2,
    senNote: 'The dependent variable is what you measure — here it is how much the temperature rises.' },

  { id: 'shc_t1_03', topicId: 'shc', course: 'combined', tier: 1, type: 'mcq', marks: 1, timeExpected: 30,
    question: 'Which piece of equipment is used to measure the current in the SHC experiment?',
    options: ['Voltmeter', 'Thermometer', 'Ammeter', 'Stopwatch'],
    correctIndex: 2,
    senNote: 'An ammeter measures current (A). It is always connected in series with the circuit.' },

  { id: 'shc_t1_04', topicId: 'shc', course: 'combined', tier: 1, type: 'mcq', marks: 1, timeExpected: 30,
    question: 'Why is the metal block wrapped in insulating material during the SHC experiment?',
    options: ['To make the block heat up faster', 'To reduce heat loss to the surroundings', 'To prevent the thermometer from breaking', 'To keep the voltage constant'],
    correctIndex: 1,
    senNote: 'Insulation reduces heat escaping to the room — this makes your results more accurate.' },

  { id: 'shc_t1_05', topicId: 'shc', course: 'combined', tier: 1, type: 'mcq', marks: 1, timeExpected: 30,
    question: 'Which formula is used to calculate the energy supplied by the heater?',
    options: ['E = mcΔT', 'E = mgh', 'E = P × t', 'E = ½mv²'],
    correctIndex: 2,
    senNote: 'Energy = Power × time. You read power from the ammeter and voltmeter (P = IV), then multiply by the time in seconds.' },

  { id: 'shc_t1_06', topicId: 'shc', course: 'combined', tier: 1, type: 'mcq', marks: 1, timeExpected: 30,
    question: 'Where should the ammeter be placed in the SHC electrical circuit?',
    options: ['In parallel with the heater', 'In series with the heater', 'In parallel with the power supply', 'Across the metal block'],
    correctIndex: 1,
    senNote: 'Ammeters always go in series — the current flows through them. Voltmeters go in parallel.' },

  { id: 'shc_t1_07', topicId: 'shc', course: 'combined', tier: 1, type: 'mcq', marks: 1, timeExpected: 30,
    question: 'A drop of water is added to the thermometer hole in the metal block. Why?',
    options: ['To cool the block quickly', 'To improve thermal contact between thermometer and block', 'To lubricate the thermometer', 'To measure the volume of the block'],
    correctIndex: 1,
    senNote: 'The water fills any air gap, so heat transfers more easily from the block to the thermometer.' },

  { id: 'shc_t1_08', topicId: 'shc', course: 'combined', tier: 1, type: 'mcq', marks: 1, timeExpected: 30,
    question: 'Which of the following is a control variable in the SHC experiment?',
    options: ['Temperature rise', 'Energy supplied', 'Mass of the metal block', 'Time taken'],
    correctIndex: 2,
    senNote: 'Control variables are kept the same to make the test fair — the mass of the block must not change between trials.' },

  { id: 'shc_t2_01', topicId: 'shc', course: 'combined', tier: 2, type: 'mcq', marks: 1, timeExpected: 60,
    question: 'A student plots temperature rise (y-axis) vs energy supplied (x-axis). The line of best fit has gradient 0.0025 °C/J. The mass of the block is 1.0 kg. What is the specific heat capacity?',
    options: ['250 J/kg°C', '400 J/kg°C', '2500 J/kg°C', '4000 J/kg°C'],
    correctIndex: 1,
    senNote: 'Gradient = 1/(mc), so c = 1/(gradient × m) = 1/(0.0025 × 1.0) = 400 J/kg°C.' },

  { id: 'shc_t2_02', topicId: 'shc', course: 'combined', tier: 2, type: 'mcq', marks: 1, timeExpected: 60,
    question: "A student's first few temperature readings are higher than the line of best fit. What is the most likely explanation?",
    options: ['The thermometer is faulty', 'Thermal lag — the thermometer takes time to reach the block temperature', 'The heater was switched off too early', 'The voltage was too high'],
    correctIndex: 1,
    senNote: 'Thermal lag means the thermometer reading lags behind the true block temperature — it is slow to respond at the start.' },

  { id: 'shc_t2_03', topicId: 'shc', course: 'combined', tier: 2, type: 'short_answer', marks: 2, timeExpected: 60,
    question: 'Suggest one source of error in the specific heat capacity experiment and explain how it would affect the results.',
    markScheme: [
      'Heat loss to surroundings (1) → the calculated SHC will be higher than the true value because less energy than expected goes into heating the block (1)',
      'OR: Thermal lag of thermometer (1) → initial temperature readings appear lower than actual block temperature, affecting the gradient (1)',
      'OR: Heater not fully embedded in block (1) → heater may heat air not the block, so calculated SHC is too high (1)',
    ],
    senNote: 'Think: what goes wrong? Then explain whether it makes your answer too big or too small.' },

  { id: 'shc_t2_04', topicId: 'shc', course: 'combined', tier: 2, type: 'calculation', marks: 3, timeExpected: 60,
    question: 'A 0.5 kg aluminium block is heated using a 30 W heater for 5 minutes. The specific heat capacity of aluminium is 900 J/kg°C. Calculate the expected temperature rise.',
    answer: 20,
    unit: '°C',
    acceptableRange: [19, 21],
    markScheme: ['E = P × t = 30 × 300 = 9000 J (1)', 'ΔT = E / (mc) = 9000 / (0.5 × 900) (1)', 'ΔT = 20 °C (1)'],
    senNote: 'First find the energy using E = Pt. Then rearrange E = mcΔT to get ΔT = E/(mc). Remember to convert 5 minutes to 300 seconds.' },

  { id: 'shc_t3_01', topicId: 'shc', course: 'combined', tier: 3, type: 'extended', marks: 6, timeExpected: 120,
    question: 'Describe how you would use the electrical method to measure the specific heat capacity of a metal block. Include the measurements you would take and explain how you would calculate the SHC from your results.',
    markScheme: [
      'Measure the mass of the metal block using a balance (1)',
      'Insert immersion heater into block and connect in series with ammeter and power supply; connect voltmeter in parallel with heater (1)',
      'Wrap block in insulating material to reduce heat loss (1)',
      'Record initial temperature; switch on power supply and record current (A) and voltage (V) every 60 seconds (1)',
      'Calculate power P = IV and energy E = Pt for each time reading (1)',
      'Plot temperature vs energy supplied; draw line of best fit; calculate gradient; use c = 1/(mass × gradient) (1)',
    ],
    senNote: 'Structure your answer: equipment setup → measurements → calculation. Six marks = six clear points.' },

  { id: 'shc_t3_02', topicId: 'shc', course: 'combined', tier: 3, type: 'extended', marks: 4, timeExpected: 120,
    question: "A student calculates the SHC of aluminium as 1100 J/kg°C. The accepted value is 900 J/kg°C. Evaluate the reliability of the student's results and suggest two reasons for the discrepancy.",
    markScheme: [
      'Result is not reliable / has significant systematic error (1)',
      'Heat loss to surroundings — some energy heated the air not the block, so the student over-estimated energy input per degree rise (1)',
      'Thermal lag — the thermometer reading lagged the true block temperature, especially at the start, making ΔT appear smaller and c appear larger (1)',
      'Heater not fully in contact with block / poor thermal contact (1)',
    ],
    senNote: 'Evaluate means say whether the result is good or bad, and why. 1100 vs 900 is a 22% error — that is significant.' },

  // ─────────────────────────────────────────────────────────────────────────────
  // RP2: THERMAL INSULATION (insulation)
  // ─────────────────────────────────────────────────────────────────────────────

  { id: 'ins_t1_01', topicId: 'insulation', course: 'combined', tier: 1, type: 'mcq', marks: 1, timeExpected: 30,
    question: 'In the thermal insulation experiment, what is the independent variable?',
    options: ['Volume of water', 'Starting temperature of the water', 'Type of insulating material', 'Room temperature'],
    correctIndex: 2,
    senNote: 'You change the insulating material (e.g., bubble wrap, newspaper, polystyrene) to see which is best.' },

  { id: 'ins_t1_02', topicId: 'insulation', course: 'combined', tier: 1, type: 'mcq', marks: 1, timeExpected: 30,
    question: 'In the thermal insulation experiment, what is the dependent variable?',
    options: ['Type of insulating material', 'Temperature of water over time', 'Mass of insulating material', 'Volume of water'],
    correctIndex: 1,
    senNote: 'You measure how quickly the water cools — the temperature at each time point is your dependent variable.' },

  { id: 'ins_t1_03', topicId: 'insulation', course: 'combined', tier: 1, type: 'mcq', marks: 1, timeExpected: 30,
    question: 'Which piece of equipment is used to measure the water temperature in the insulation experiment?',
    options: ['Voltmeter', 'Ammeter', 'Thermometer', 'Pressure gauge'],
    correctIndex: 2,
    senNote: 'A thermometer measures temperature in degrees Celsius (°C).' },

  { id: 'ins_t1_04', topicId: 'insulation', course: 'combined', tier: 1, type: 'mcq', marks: 1, timeExpected: 30,
    question: 'Why is the volume of water kept the same in each trial?',
    options: ['To save water', 'To keep the test fair — it is a control variable', 'Because different volumes have different densities', 'To ensure the thermometer always fits'],
    correctIndex: 1,
    senNote: 'If you change the volume, you do not know if the temperature difference is due to the insulation or the water amount.' },

  { id: 'ins_t1_05', topicId: 'insulation', course: 'combined', tier: 1, type: 'mcq', marks: 1, timeExpected: 30,
    question: 'On a graph of temperature vs time for this experiment, which material would show the shallowest gradient?',
    options: ['No insulation', 'Newspaper', 'Bubble wrap', 'The best insulator'],
    correctIndex: 3,
    senNote: 'The best insulator loses heat most slowly — its temperature drops least steeply on the graph.' },

  { id: 'ins_t1_06', topicId: 'insulation', course: 'combined', tier: 1, type: 'mcq', marks: 1, timeExpected: 30,
    question: 'Why should all trials be done in the same session on the same day?',
    options: ['To save time', 'So that room temperature does not change between trials', 'Because the equipment wears out', 'To reduce the starting temperature'],
    correctIndex: 1,
    senNote: 'Room temperature is a control variable — if it changes between trials, your comparison is unfair.' },

  { id: 'ins_t1_07', topicId: 'insulation', course: 'combined', tier: 1, type: 'mcq', marks: 1, timeExpected: 30,
    question: 'What should you use to pour the hot water into the beaker safely?',
    options: ['Your hands', 'A syringe', 'Tongs and careful pouring from a kettle', 'A magnet'],
    correctIndex: 2,
    senNote: 'Hot water can scald. Use tongs and pour carefully. This is a hazard in the safety section.' },

  { id: 'ins_t1_08', topicId: 'insulation', course: 'combined', tier: 1, type: 'mcq', marks: 1, timeExpected: 30,
    question: 'What does a steeper gradient on a temperature vs time graph indicate?',
    options: ['Better insulation', 'Slower cooling', 'Faster cooling — less effective insulation', 'Higher starting temperature'],
    correctIndex: 2,
    senNote: 'Steeper gradient = temperature drops faster = worse insulator.' },

  { id: 'ins_t2_01', topicId: 'insulation', course: 'combined', tier: 2, type: 'mcq', marks: 1, timeExpected: 60,
    question: "A student's results show one temperature reading that is much higher than expected. What should the student do?",
    options: ['Ignore it and draw the line through it', 'Identify it as an anomalous result and repeat that measurement', 'Restart the whole experiment', 'Change the insulating material'],
    correctIndex: 1,
    senNote: 'An anomalous result is one that does not fit the pattern. You should repeat that reading and exclude it from your line of best fit.' },

  { id: 'ins_t2_02', topicId: 'insulation', course: 'combined', tier: 2, type: 'mcq', marks: 1, timeExpected: 60,
    question: 'Two students use different starting temperatures (80°C and 70°C) for the same insulating material. Why are their results not directly comparable?',
    options: ['The thermometers are different', 'The rate of cooling depends on the temperature difference between the water and the room', 'The insulation works better at lower temperatures', 'Their stopwatches run at different rates'],
    correctIndex: 1,
    senNote: 'Newton\'s Law of Cooling: hotter objects cool faster. Different starting temps = different rates of cooling, so comparison is unfair.' },

  { id: 'ins_t2_03', topicId: 'insulation', course: 'combined', tier: 2, type: 'short_answer', marks: 2, timeExpected: 60,
    question: 'Suggest one improvement to the thermal insulation experiment and explain how it would improve the results.',
    markScheme: [
      'Use a lid on the beaker (1) → reduces heat loss from the top surface, making comparison of insulating materials more accurate (1)',
      'OR: Use a data logger/temperature probe (1) → gives continuous readings without opening the setup, reducing heat loss during measurement (1)',
      'OR: Repeat each trial three times and calculate a mean (1) → reduces the effect of random errors on the results (1)',
    ],
    senNote: 'A good improvement: say what you change AND say why it makes the results better.' },

  { id: 'ins_t2_04', topicId: 'insulation', course: 'combined', tier: 2, type: 'short_answer', marks: 2, timeExpected: 60,
    question: 'Water starts at 80°C and cools to 50°C in 20 minutes with no insulation. With bubble wrap, it cools to 63°C in the same time. Calculate the temperature drop for (a) no insulation and (b) bubble wrap.',
    markScheme: ['(a) No insulation: 80 − 50 = 30°C drop (1)', '(b) Bubble wrap: 80 − 63 = 17°C drop (1)'],
    senNote: 'Temperature drop = starting temperature − final temperature. The smaller the drop, the better the insulator. Bubble wrap kept more heat in — it only lost 17°C compared to 30°C with no insulation.' },

  { id: 'ins_t3_01', topicId: 'insulation', course: 'combined', tier: 3, type: 'extended', marks: 6, timeExpected: 120,
    question: 'Describe how you would investigate the effectiveness of three different insulating materials. Include how you would make the test fair and how you would present your results.',
    markScheme: [
      'Use identical beakers and same volume of hot water (e.g. 80 ml) at the same starting temperature for each trial (1)',
      'Place each insulating material between inner and outer beaker; cover with identical cardboard lid (1)',
      'Insert thermometer through lid; start stopwatch; record temperature every 3 minutes for 20 minutes (1)',
      'Repeat each trial to check for anomalous results (1)',
      'Plot temperature (y-axis) vs time (x-axis) for all materials on one set of axes (1)',
      'The material with the shallowest gradient (smallest temperature drop) is the most effective insulator (1)',
    ],
    senNote: 'Six marks = six points. Include: what you change, what you keep the same, what you measure, and how you conclude.' },

  { id: 'ins_t3_02', topicId: 'insulation', course: 'combined', tier: 3, type: 'extended', marks: 4, timeExpected: 120,
    question: "A student concludes that polystyrene is the best insulator because after 20 minutes its temperature is the highest. Evaluate the student's method and conclusion.",
    markScheme: [
      'The conclusion is valid if all other variables (volume, starting temperature, beaker size, room temperature) were controlled (1)',
      'However the student should state the temperature drop, not just the final temperature, to make the comparison clearer (1)',
      'The experiment should be repeated to check results are reproducible (1)',
      'Anomalous results should be identified and excluded from the comparison (1)',
    ],
    senNote: 'Evaluate means: is the conclusion correct AND was the method good enough to support it?' },

  // ─────────────────────────────────────────────────────────────────────────────
  // RP3: RESISTANCE OF A WIRE (resistance)
  // ─────────────────────────────────────────────────────────────────────────────

  { id: 'res_t1_01', topicId: 'resistance', course: 'combined', tier: 1, type: 'mcq', marks: 1, timeExpected: 30,
    question: 'In the resistance of a wire experiment, what is the independent variable?',
    options: ['Resistance of the wire', 'Current through the wire', 'Length of the wire', 'Type of power supply'],
    correctIndex: 2,
    senNote: 'You change the length of wire between the crocodile clips — that is what you control.' },

  { id: 'res_t1_02', topicId: 'resistance', course: 'combined', tier: 1, type: 'mcq', marks: 1, timeExpected: 30,
    question: 'How is resistance calculated from voltage and current readings?',
    options: ['R = V + I', 'R = V × I', 'R = V / I', 'R = I / V'],
    correctIndex: 2,
    senNote: 'Resistance = Voltage ÷ Current. This is rearranged from Ohm\'s Law V = IR.' },

  { id: 'res_t1_03', topicId: 'resistance', course: 'combined', tier: 1, type: 'mcq', marks: 1, timeExpected: 30,
    question: 'Why is constantan wire used in the resistance experiment rather than copper?',
    options: ['Constantan is cheaper', 'Constantan\'s resistance does not change significantly with temperature', 'Copper is too long', 'Constantan is safer to handle'],
    correctIndex: 1,
    senNote: 'Constantan is chosen because its resistance is almost unchanged by temperature. Copper\'s resistance rises a lot when it warms up, which would give inaccurate results. Constantan also has higher resistance than copper, which helps too.' },

  { id: 'res_t1_04', topicId: 'resistance', course: 'combined', tier: 1, type: 'mcq', marks: 1, timeExpected: 30,
    question: 'Why should a low voltage be used in the resistance of a wire experiment?',
    options: ['Low voltage is cheaper', 'To prevent the wire from heating up and changing its resistance', 'Because ammeters only work at low voltage', 'So that the wire stays rigid'],
    correctIndex: 1,
    senNote: 'If the wire gets hot, its resistance changes — this would make your results inaccurate.' },

  { id: 'res_t1_05', topicId: 'resistance', course: 'combined', tier: 1, type: 'mcq', marks: 1, timeExpected: 30,
    question: 'Where is the voltmeter connected in this experiment?',
    options: ['In series with the wire', 'In parallel with the wire', 'Between the ammeter and the wire', 'Across the power supply terminals'],
    correctIndex: 1,
    senNote: 'Voltmeters always connect in parallel — they measure the potential difference across the component.' },

  { id: 'res_t1_06', topicId: 'resistance', course: 'combined', tier: 1, type: 'mcq', marks: 1, timeExpected: 30,
    question: 'What shape graph would you expect from a resistance vs length experiment?',
    options: ['A curve getting steeper', 'A straight horizontal line', 'A straight line through the origin', 'A U-shaped curve'],
    correctIndex: 2,
    senNote: 'R ∝ L — resistance is directly proportional to length, so the graph is a straight line through the origin.' },

  { id: 'res_t1_07', topicId: 'resistance', course: 'combined', tier: 1, type: 'mcq', marks: 1, timeExpected: 30,
    question: 'Which is a control variable in the resistance of a wire experiment?',
    options: ['Length of wire', 'Current', 'Resistance', 'Diameter of the wire'],
    correctIndex: 3,
    senNote: 'The diameter (thickness) of the wire must stay the same — thicker wire has lower resistance, which would affect your results.' },

  { id: 'res_t1_08', topicId: 'resistance', course: 'combined', tier: 1, type: 'mcq', marks: 1, timeExpected: 30,
    question: "Why might the student's graph not pass exactly through the origin?",
    options: ['The ammeter has zero resistance', 'Contact resistance at the crocodile clips adds a fixed extra resistance', 'The wire is too long', 'The voltmeter is broken'],
    correctIndex: 1,
    senNote: 'Contact resistance is a systematic error — the crocodile clips add a small fixed resistance, shifting the graph upward.' },

  { id: 'res_t2_01', topicId: 'resistance', course: 'combined', tier: 2, type: 'mcq', marks: 1, timeExpected: 60,
    question: 'A student measures V = 1.0 V and I = 0.45 A for a 10 cm wire. What is the resistance?',
    options: ['0.45 Ω', '1.45 Ω', '2.2 Ω', '4.5 Ω'],
    correctIndex: 2,
    senNote: 'R = V/I = 1.0/0.45 = 2.2 Ω (to 2 significant figures).' },

  { id: 'res_t2_02', topicId: 'resistance', course: 'combined', tier: 2, type: 'mcq', marks: 1, timeExpected: 60,
    question: "A student's results show one reading much lower than expected. What should they do?",
    options: ['Include it and draw the line through it', 'Repeat the reading and identify it as anomalous if the repeat is also different', 'Discard all results and start again', 'Change the wire material'],
    correctIndex: 1,
    senNote: 'Always repeat anomalous readings. If the repeat is similar to the original, there may be a reason — investigate it.' },

  { id: 'res_t2_03', topicId: 'resistance', course: 'combined', tier: 2, type: 'short_answer', marks: 2, timeExpected: 60,
    question: 'A student finds that when the length of the wire doubles, the resistance approximately doubles. What does this tell us about the relationship between resistance and length?',
    markScheme: [
      'Resistance is directly proportional to length (1)',
      'Because when length doubles, resistance doubles — consistent with R ∝ L (1)',
    ],
    senNote: 'Proportional means the ratio stays constant. R/L = same value for all readings → R ∝ L.' },

  { id: 'res_t2_04', topicId: 'resistance', course: 'combined', tier: 2, type: 'calculation', marks: 3, timeExpected: 60,
    question: 'A 50 cm piece of constantan wire has a resistance of 11.1 Ω. Calculate the resistance per centimetre of the wire and predict the resistance of a 30 cm length.',
    answer: 6.7,
    unit: 'Ω',
    acceptableRange: [6.4, 7.0],
    markScheme: ['Resistance per cm = 11.1 / 50 = 0.222 Ω/cm (1)', 'Resistance of 30 cm = 0.222 × 30 = 6.7 Ω (1)', 'Correct unit: Ω (1)'],
    senNote: 'Find resistance per unit length first, then multiply by the new length.' },

  { id: 'res_t3_01', topicId: 'resistance', course: 'combined', tier: 3, type: 'extended', marks: 6, timeExpected: 120,
    question: 'Describe how you would carry out an investigation to find out how the resistance of a wire depends on its length. Include all measurements, equipment, and how you would process your results.',
    markScheme: [
      'Attach constantan wire (≥1m) to a metre ruler using tape (1)',
      'Connect one crocodile clip at 0 cm and a second movable clip at a chosen length; connect ammeter in series and voltmeter in parallel with the wire section (1)',
      'Use a low voltage power supply (e.g. 2V) to prevent the wire from heating (1)',
      'Record voltage (V) and current (A); calculate R = V/I for each length (1)',
      'Move the movable clip to new lengths (e.g. every 10 cm) and repeat (1)',
      'Plot resistance (y-axis) vs length (x-axis); straight line through origin shows R ∝ L; calculate gradient = resistance per cm (1)',
    ],
    senNote: 'Remember: ammeter in series, voltmeter in parallel, low voltage, change one variable.' },

  { id: 'res_t3_02', topicId: 'resistance', course: 'combined', tier: 3, type: 'extended', marks: 4, timeExpected: 120,
    question: "A student's resistance vs length graph does not pass through the origin. It has a positive y-intercept of about 1.5 Ω. Explain what this tells us and suggest how the experiment could be improved.",
    markScheme: [
      'The y-intercept indicates a systematic error — contact resistance at the crocodile clips is adding about 1.5 Ω to every reading (1)',
      'This is a zero error — even at length 0, there is still some resistance measured (1)',
      'Improvement: use better quality / cleaner clips; press them firmly onto the wire (1)',
      'OR: subtract the y-intercept value from all readings to correct for the error (1)',
    ],
    senNote: 'A non-zero y-intercept = systematic error. Think: what adds a constant extra resistance regardless of wire length?' },

  // ─────────────────────────────────────────────────────────────────────────────
  // RP4: I-V CHARACTERISTICS (iv_characteristics)
  // ─────────────────────────────────────────────────────────────────────────────

  { id: 'iv_t1_01', topicId: 'iv_characteristics', course: 'combined', tier: 1, type: 'mcq', marks: 1, timeExpected: 30,
    question: 'In the I-V characteristics experiment, what is the independent variable?',
    options: ['Current through the component', 'Voltage across the component', 'Resistance of the component', 'Power dissipated'],
    correctIndex: 1,
    senNote: 'You set the voltage using the power supply — voltage is what you control (independent).' },

  { id: 'iv_t1_02', topicId: 'iv_characteristics', course: 'combined', tier: 1, type: 'mcq', marks: 1, timeExpected: 30,
    question: 'Which component produces a straight-line I-V graph through the origin?',
    options: ['Filament bulb', 'Diode', 'Ohmic resistor (at constant temperature)', 'Thermistor'],
    correctIndex: 2,
    senNote: 'An ohmic resistor obeys Ohm\'s Law — V = IR with R constant, giving a straight line through the origin.' },

  { id: 'iv_t1_03', topicId: 'iv_characteristics', course: 'combined', tier: 1, type: 'mcq', marks: 1, timeExpected: 30,
    question: "Why does a filament bulb's I-V graph curve (become less steep at higher voltages)?",
    options: ['The bulb burns out at high voltages', 'The filament heats up, increasing its resistance', 'The current becomes negative', 'The voltmeter gives incorrect readings at high voltages'],
    correctIndex: 1,
    senNote: 'As the filament heats up, resistance increases. More voltage is needed for the same increase in current — hence the curve.' },

  { id: 'iv_t1_04', topicId: 'iv_characteristics', course: 'combined', tier: 1, type: 'mcq', marks: 1, timeExpected: 30,
    question: 'What happens to current through a diode in the reverse direction?',
    options: ['Current doubles', 'Current is very small / effectively zero', 'Current reverses direction strongly', 'Current is the same as in forward direction'],
    correctIndex: 1,
    senNote: 'A diode only allows current in one direction. In reverse, it blocks current (very high resistance).' },

  { id: 'iv_t1_05', topicId: 'iv_characteristics', course: 'combined', tier: 1, type: 'mcq', marks: 1, timeExpected: 30,
    question: 'How is the voltage varied in the I-V characteristics experiment?',
    options: ['By changing the length of the wire', 'By adjusting a variable resistor or variable power supply', 'By adding more cells', 'By changing the component'],
    correctIndex: 1,
    senNote: 'A variable resistor (rheostat) or variable power supply lets you smoothly change the voltage across the component.' },

  { id: 'iv_t1_06', topicId: 'iv_characteristics', course: 'combined', tier: 1, type: 'mcq', marks: 1, timeExpected: 30,
    question: 'Where is the ammeter placed in the I-V characteristics circuit?',
    options: ['In parallel with the component', 'In series with the component', 'Across the variable resistor', 'Across the power supply'],
    correctIndex: 1,
    senNote: 'Ammeters measure current and must always be in series — the current flows through them.' },

  { id: 'iv_t1_07', topicId: 'iv_characteristics', course: 'combined', tier: 1, type: 'mcq', marks: 1, timeExpected: 30,
    question: 'How do you obtain negative voltage readings in the I-V characteristics experiment?',
    options: ['Use a different power supply', 'Reverse the connections to the power supply', 'Use an AC supply only', 'Increase the resistance'],
    correctIndex: 1,
    senNote: 'To get negative voltages (reverse bias for the diode), you reverse the power supply connections.' },

  { id: 'iv_t1_08', topicId: 'iv_characteristics', course: 'combined', tier: 1, type: 'mcq', marks: 1, timeExpected: 30,
    question: "On a diode's I-V graph, where does significant current start to flow?",
    options: ['At −0.7 V', 'At 0 V', 'At approximately +0.7 V (threshold/turn-on voltage)', 'At exactly +1.0 V'],
    correctIndex: 2,
    senNote: 'The diode\'s threshold voltage is about 0.6–0.7 V for a silicon diode — below this, very little current flows.' },

  { id: 'iv_t2_01', topicId: 'iv_characteristics', course: 'combined', tier: 2, type: 'mcq', marks: 1, timeExpected: 60,
    question: 'A resistor has V = 4.0 V and I = 0.50 A. What is its resistance?',
    options: ['2.0 Ω', '4.5 Ω', '8.0 Ω', '0.125 Ω'],
    correctIndex: 2,
    senNote: 'R = V/I = 4.0/0.50 = 8.0 Ω.' },

  { id: 'iv_t2_02', topicId: 'iv_characteristics', course: 'combined', tier: 2, type: 'mcq', marks: 1, timeExpected: 60,
    question: 'A filament bulb is tested. As voltage increases from 1V to 6V, the current increases but not proportionally. What does this show?',
    options: ['The bulb obeys Ohm\'s Law', 'The resistance is constant', 'The resistance is increasing as temperature increases', 'The current is decreasing'],
    correctIndex: 2,
    senNote: 'Non-linear I-V graph means resistance is NOT constant. For a bulb, resistance increases with temperature.' },

  { id: 'iv_t2_03', topicId: 'iv_characteristics', course: 'combined', tier: 2, type: 'short_answer', marks: 2, timeExpected: 60,
    question: 'Compare the I-V graphs of an ohmic resistor and a filament bulb. State one similarity and one difference.',
    markScheme: [
      'Similarity: both show current increasing as voltage increases (1)',
      'Difference: ohmic resistor gives a straight line (constant resistance); filament bulb gives a curve (resistance increases with temperature/voltage) (1)',
    ],
    senNote: 'Compare means state one point about each. A similarity = something both share. A difference = something that distinguishes them.' },

  { id: 'iv_t2_04', topicId: 'iv_characteristics', course: 'combined', tier: 2, type: 'calculation', marks: 2, timeExpected: 60,
    question: 'From an I-V graph for a filament bulb, a student reads that when V = 4 V, I = 0.029 A. Calculate the resistance of the lamp at this operating point.',
    answer: 138,
    unit: 'Ω',
    acceptableRange: [130, 145],
    markScheme: ['R = V/I = 4.0 / 0.029 (1)', 'R ≈ 138 Ω (accept 130–145) (1)'],
    senNote: 'Even on a curved I-V graph, you can calculate resistance at any single point using R = V/I. The lamp has higher resistance at higher voltages because it gets hotter.' },

  { id: 'iv_t3_01', topicId: 'iv_characteristics', course: 'combined', tier: 3, type: 'extended', marks: 6, timeExpected: 120,
    question: 'Describe how you would obtain the I-V characteristics for a filament bulb. Include circuit setup, measurements, and how you would present your results.',
    markScheme: [
      'Connect the filament bulb in series with an ammeter and variable resistor; connect a voltmeter in parallel with the bulb (1)',
      'Connect to a variable power supply or use a potential divider to allow voltage to vary from 0 V (1)',
      'Adjust the variable resistor/supply to set different voltages; record V and I for each setting (1)',
      'Reverse the supply connections to obtain negative voltage readings (1)',
      'Plot I (y-axis) vs V (x-axis); the graph will be a curve (not straight line) due to increasing resistance (1)',
      'The curve gets less steep at higher voltages, showing resistance increasing with temperature (1)',
    ],
    senNote: 'Six marks → six points. Think: build the circuit, change voltage, record both readings, reverse for negative, plot, interpret.' },

  { id: 'iv_t3_02', topicId: 'iv_characteristics', course: 'combined', tier: 3, type: 'extended', marks: 4, timeExpected: 120,
    question: "Explain why a diode's I-V graph looks very different from an ohmic resistor's. Use ideas about resistance in your answer.",
    markScheme: [
      'A diode has very high resistance in reverse bias — almost no current flows for negative voltages (1)',
      'In forward bias, once the threshold voltage (~0.7 V) is exceeded, resistance drops sharply and current increases rapidly (1)',
      'An ohmic resistor has constant resistance — straight line through origin in both directions (1)',
      'Diode I-V is strongly asymmetric (different forward and reverse); ohmic resistor is symmetric (same in both directions) (1)',
    ],
    senNote: 'Explain = give reasons. Link the shape of the graph to what resistance is doing in each case.' },

  // ─────────────────────────────────────────────────────────────────────────────
  // RP5: DENSITY OF MATERIALS (density)
  // ─────────────────────────────────────────────────────────────────────────────

  { id: 'den_t1_01', topicId: 'density', course: 'combined', tier: 1, type: 'mcq', marks: 1, timeExpected: 30,
    question: 'What is the formula for density?',
    options: ['ρ = V/m', 'ρ = m × V', 'ρ = m/V', 'ρ = m + V'],
    correctIndex: 2,
    senNote: 'Density = mass ÷ volume. Units: kg/m³ or g/cm³.' },

  { id: 'den_t1_02', topicId: 'density', course: 'combined', tier: 1, type: 'mcq', marks: 1, timeExpected: 30,
    question: 'Which piece of equipment is used to measure the mass of an object?',
    options: ['Measuring cylinder', 'Thermometer', 'Balance', 'Metre ruler'],
    correctIndex: 2,
    senNote: 'A balance (or mass balance) measures mass in grams (g) or kilograms (kg).' },

  { id: 'den_t1_03', topicId: 'density', course: 'combined', tier: 1, type: 'mcq', marks: 1, timeExpected: 30,
    question: 'How do you find the volume of an irregularly shaped solid?',
    options: ['Multiply length × width × height', 'Use a measuring cylinder: measure water level before and after submerging the object', 'Weigh it on a balance', 'Use a thermometer'],
    correctIndex: 1,
    senNote: 'Water displacement method: volume of solid = rise in water level (in cm³ or ml).' },

  { id: 'den_t1_04', topicId: 'density', course: 'combined', tier: 1, type: 'mcq', marks: 1, timeExpected: 30,
    question: 'How do you find the volume of a regular cuboid?',
    options: ['V = m/ρ', 'V = length × width × height', 'V = mass ÷ density', 'V = 4/3 πr³'],
    correctIndex: 1,
    senNote: 'For a regular shape (cuboid), measure all three dimensions and multiply them together.' },

  { id: 'den_t1_05', topicId: 'density', course: 'combined', tier: 1, type: 'mcq', marks: 1, timeExpected: 30,
    question: 'A Eureka can is used in the density experiment. What is its purpose?',
    options: ['To heat the water', 'To collect the water displaced by the object so it can be measured accurately', 'To weigh the object', 'To measure temperature'],
    correctIndex: 1,
    senNote: 'The Eureka (displacement) can has a spout — when you submerge an object, the displaced water pours out and can be measured.' },

  { id: 'den_t1_06', topicId: 'density', course: 'combined', tier: 1, type: 'mcq', marks: 1, timeExpected: 30,
    question: 'If two objects have the same volume but object A is denser, what can you say about their masses?',
    options: ['Object A has less mass', 'Object A has the same mass', 'Object A has more mass', 'You cannot compare their masses'],
    correctIndex: 2,
    senNote: 'Since ρ = m/V, if V is the same and ρ is higher, then m must be higher.' },

  { id: 'den_t1_07', topicId: 'density', course: 'combined', tier: 1, type: 'mcq', marks: 1, timeExpected: 30,
    question: 'What unit is density commonly measured in for solids?',
    options: ['kg/m', 'g', 'kg/m³', 'N/m²'],
    correctIndex: 2,
    senNote: 'Density is measured in kg/m³ (SI units) or g/cm³. 1 g/cm³ = 1000 kg/m³.' },

  { id: 'den_t1_08', topicId: 'density', course: 'combined', tier: 1, type: 'mcq', marks: 1, timeExpected: 30,
    question: 'Why should the object be completely submerged when using the displacement method?',
    options: ['So it does not float', 'To ensure all the volume is measured — a partially submerged object gives too small a volume reading', 'To heat the water', 'To clean the object'],
    correctIndex: 1,
    senNote: 'If part of the object sticks out above the water, only part of its volume displaces water — your reading will be too small.' },

  { id: 'den_t2_01', topicId: 'density', course: 'combined', tier: 2, type: 'mcq', marks: 1, timeExpected: 60,
    question: 'A metal block has mass 540 g and volume 200 cm³. What is its density in g/cm³?',
    options: ['0.37 g/cm³', '2.7 g/cm³', '27 g/cm³', '108000 g/cm³'],
    correctIndex: 1,
    senNote: 'ρ = m/V = 540/200 = 2.7 g/cm³ (this is the density of aluminium).' },

  { id: 'den_t2_02', topicId: 'density', course: 'combined', tier: 2, type: 'mcq', marks: 1, timeExpected: 60,
    question: 'A student measures the volume of a stone using a measuring cylinder. The water level before is 50 ml and after is 73 ml. What is the volume of the stone?',
    options: ['50 cm³', '73 cm³', '23 cm³', '123 cm³'],
    correctIndex: 2,
    senNote: 'Volume of stone = final − initial = 73 − 50 = 23 cm³. Note: 1 ml = 1 cm³.' },

  { id: 'den_t2_03', topicId: 'density', course: 'combined', tier: 2, type: 'short_answer', marks: 2, timeExpected: 60,
    question: 'Explain why the displacement method (using a measuring cylinder) is used for irregular solids but not for regular solids like a cuboid.',
    markScheme: [
      'For a regular solid, you can measure length, width and height with a ruler and calculate V = l × w × h (1)',
      'An irregular solid has no simple formula for volume — displacement is easier and more accurate (1)',
    ],
    senNote: 'Think about what you can measure directly for each shape.' },

  { id: 'den_t2_04', topicId: 'density', course: 'combined', tier: 2, type: 'calculation', marks: 3, timeExpected: 60,
    question: 'A wooden block measures 5.0 cm × 4.0 cm × 3.0 cm and has a mass of 42 g. Calculate its density in g/cm³.',
    answer: 0.7,
    unit: 'g/cm³',
    acceptableRange: [0.68, 0.72],
    markScheme: ['V = 5.0 × 4.0 × 3.0 = 60 cm³ (1)', 'ρ = m/V = 42/60 (1)', 'ρ = 0.70 g/cm³ (1)'],
    senNote: 'Volume first, then density. If density < 1 g/cm³, the object floats in water — this wooden block would float!' },

  { id: 'den_t3_01', topicId: 'density', course: 'combined', tier: 3, type: 'extended', marks: 6, timeExpected: 120,
    question: 'Describe how you would find the density of an irregularly shaped stone. Include all measurements and calculations.',
    markScheme: [
      'Measure the mass of the stone using a balance; record in grams (1)',
      'Part-fill a measuring cylinder with water; record the water level (V₁) in cm³ (1)',
      'Gently lower the stone into the measuring cylinder using a thread or forceps (1)',
      'Record the new water level (V₂) when the stone is fully submerged (1)',
      'Volume of stone = V₂ − V₁ (cm³) (1)',
      'Calculate density: ρ = mass / volume; give units (g/cm³ or kg/m³) (1)',
    ],
    senNote: 'Six steps: measure mass → fill cylinder → record level → submerge stone → record new level → calculate ρ = m/V.' },

  { id: 'den_t3_02', topicId: 'density', course: 'combined', tier: 3, type: 'extended', marks: 4, timeExpected: 120,
    question: "A student calculates the density of a metal as 7.2 g/cm³. The accepted value for iron is 7.87 g/cm³. Suggest two reasons for the discrepancy and evaluate whether the student's method was valid.",
    markScheme: [
      'The volume measurement may include air gaps — if the stone was not fully submerged, the volume reading is too large, making density too small (1)',
      'The mass measurement may have parallax error if the balance was not zeroed (1)',
      'The method is valid in principle — it correctly uses ρ = m/V (1)',
      'But the student should repeat measurements and use a more precise measuring cylinder or Eureka can to improve accuracy (1)',
    ],
    senNote: 'State reason → explain how it affects the result (too high or too low). Then evaluate the method itself.' },

  { id: 'den_t1_09', topicId: 'density', course: 'combined', tier: 1, type: 'mcq', marks: 1, timeExpected: 30,
    question: 'Which method would you use to find the density of an irregularly shaped solid, such as a stone?',
    options: [
      'Measure its length, width and height with a ruler',
      'Use a displacement can to measure its volume',
      'Weigh it on a balance and divide by its length',
      'Use a measuring cylinder to measure its mass',
    ],
    correctIndex: 1,
    markScheme: ['Displacement can / submerge in measuring cylinder (1)'],
    senNote: 'Irregular = can\'t use ruler. Use water displacement instead.' },

  { id: 'den_t1_10', topicId: 'density', course: 'combined', tier: 1, type: 'calculation', marks: 3, timeExpected: 60,
    question: 'A wooden block has mass 240 g and volume 300 cm³. Calculate its density in g/cm³.',
    answer: 0.8,
    unit: 'g/cm³',
    acceptableRange: [0.78, 0.82],
    markScheme: ['ρ = m/V (1)', '= 240 / 300 (1)', '= 0.8 g/cm³ (1)'],
    senNote: 'Density = mass ÷ volume. Units must match: g and cm³ give g/cm³.' },

  { id: 'den_t2_05', topicId: 'density', course: 'combined', tier: 2, type: 'calculation', marks: 3, timeExpected: 60,
    question: 'A student pours 50 cm³ of oil into a measuring cylinder. The mass of the cylinder is 85 g before pouring and 131 g after. Calculate the density of the oil in g/cm³.',
    answer: 0.92,
    unit: 'g/cm³',
    acceptableRange: [0.90, 0.94],
    markScheme: ['Mass of oil = 131 − 85 = 46 g (1)', 'ρ = m/V = 46/50 (1)', '= 0.92 g/cm³ (1)'],
    senNote: 'Remember: mass of liquid = (mass with liquid) − (mass of empty container).' },

  { id: 'den_t2_06', topicId: 'density', course: 'combined', tier: 2, type: 'short_answer', marks: 2, timeExpected: 90,
    question: 'A student measures the volume of a stone using a displacement can. Suggest one source of error in this method and explain how it would affect the measured density.',
    markScheme: [
      'Identifies a valid error source, e.g. water remaining on stone / not waiting for drips to stop / air bubbles on surface / object not fully submerged (1)',
      'Correctly links to effect on volume and therefore density, e.g. volume overestimated → density too low (1)',
    ],
    senNote: 'Think: what could go wrong with the water measurement? More water out = bigger volume reading = smaller density.' },

  { id: 'den_t2_07', topicId: 'density', course: 'combined', tier: 2, type: 'calculation', marks: 3, timeExpected: 90,
    question: 'A student measures the density of the same metal cylinder three times: 7.8 g/cm³, 8.1 g/cm³, 7.9 g/cm³. Calculate the mean density and explain why repeating improves reliability.',
    answer: 7.93,
    unit: 'g/cm³',
    acceptableRange: [7.9, 8.0],
    markScheme: [
      'Mean = (7.8 + 8.1 + 7.9) / 3 (1)',
      '= 7.93 g/cm³ (1)',
      'Explains repeating reduces random error / allows anomalies to be spotted (1)',
    ],
    senNote: 'Mean = add all values ÷ number of values. More repeats → more reliable mean.' },

  { id: 'den_t2_08', topicId: 'density', course: 'combined', tier: 2, type: 'calculation', marks: 2, timeExpected: 60,
    question: 'A student calculates a density of 8900 kg/m³. Convert this to g/cm³.',
    answer: 8.9,
    unit: 'g/cm³',
    acceptableRange: [8.85, 8.95],
    markScheme: ['Correct conversion method stated (1)', '8.9 g/cm³ (1)'],
    senNote: 'To convert kg/m³ → g/cm³, divide by 1000. This metal is likely copper (~8900 kg/m³).' },

  { id: 'den_t3_03', topicId: 'density', course: 'physics_only', tier: 3, type: 'short_answer', marks: 3, timeExpected: 90,
    question: 'A student measures the volume of three identical steel balls using water displacement: 16 cm³, 31 cm³, 15 cm³. Identify the anomaly, suggest a reason, and explain how to treat this result when calculating mean volume.',
    markScheme: [
      'Identifies 31 cm³ as anomalous (1)',
      'Gives a valid reason, e.g. bubble trapped / two balls measured simultaneously / reading error (1)',
      'Excludes it from mean: (16 + 15) / 2 = 15.5 cm³ (1)',
    ],
    senNote: 'Anomaly = a result that doesn\'t fit the pattern. Don\'t include it in your mean.' },

  { id: 'den_t3_04', topicId: 'density', course: 'combined', tier: 3, type: 'extended', marks: 6, timeExpected: 300,
    question: 'Describe a method to determine the density of an irregular solid, such as a rock. Include: equipment, measurements taken, how density is calculated, and one precaution to improve accuracy. [6 marks]',
    markScheme: [
      'States use of balance to measure mass (1)',
      'Describes displacement method (displacement can or measuring cylinder) (1)',
      'States volume of water displaced = volume of object (1)',
      'ρ = m ÷ V with correct units (kg/m³ or g/cm³) (1)',
      'Identifies one precaution, e.g. object fully submerged / repeat readings / dry object before mass (1)',
      'Correctly links precaution to how it improves accuracy (1)',
    ],
    senNote: 'Structure your answer: Equipment → Mass measurement → Volume measurement → Calculate density → Precaution.' },

  // ─────────────────────────────────────────────────────────────────────────────
  // RP7: FORCE AND EXTENSION — HOOKE'S LAW (spring)
  // ─────────────────────────────────────────────────────────────────────────────

  { id: 'spr_t1_01', topicId: 'spring', course: 'combined', tier: 1, type: 'mcq', marks: 1, timeExpected: 30,
    question: "In the force and extension experiment, what is the independent variable?",
    options: ['Extension of the spring', 'Mass of the spring', 'Force applied to the spring', 'Natural length of the spring'],
    correctIndex: 2,
    senNote: 'You add masses (weights) to the spring — the force is what you control.' },

  { id: 'spr_t1_02', topicId: 'spring', course: 'combined', tier: 1, type: 'mcq', marks: 1, timeExpected: 30,
    question: "State Hooke's Law.",
    options: ['Extension is inversely proportional to force', 'Extension is proportional to force, up to the limit of proportionality', 'Force equals mass times acceleration', 'Extension equals spring constant times mass'],
    correctIndex: 1,
    senNote: 'F = ke — extension is proportional to force ONLY below the limit of proportionality. Beyond this limit, the spring is permanently deformed.' },

  { id: 'spr_t1_03', topicId: 'spring', course: 'combined', tier: 1, type: 'mcq', marks: 1, timeExpected: 30,
    question: 'What does k represent in the equation F = ke?',
    options: ['The extension of the spring', 'The mass added', 'The spring constant (stiffness)', 'The natural length'],
    correctIndex: 2,
    senNote: 'k is the spring constant — measured in N/m. A large k means a stiff spring.' },

  { id: 'spr_t1_04', topicId: 'spring', course: 'combined', tier: 1, type: 'mcq', marks: 1, timeExpected: 30,
    question: 'What is extension?',
    options: ['The total length of the spring when loaded', 'The increase in length from the natural (unloaded) length', 'The mass added to the spring', 'The force applied'],
    correctIndex: 1,
    senNote: 'Extension = stretched length − natural length. Always subtract the original length.' },

  { id: 'spr_t1_05', topicId: 'spring', course: 'combined', tier: 1, type: 'mcq', marks: 1, timeExpected: 30,
    question: 'What equipment is used to measure the extension of the spring?',
    options: ['Ammeter', 'Metre ruler or millimetre ruler', 'Thermometer', 'Stopwatch'],
    correctIndex: 1,
    senNote: 'Extension is measured with a ruler — read carefully from the bottom of the spring to avoid parallax error.' },

  { id: 'spr_t1_06', topicId: 'spring', course: 'combined', tier: 1, type: 'mcq', marks: 1, timeExpected: 30,
    question: 'What shape is the force-extension graph in the region where Hooke\'s Law applies?',
    options: ['A curve', 'A horizontal line', 'A straight line through the origin', 'A U-shape'],
    correctIndex: 2,
    senNote: 'In the linear (Hooke\'s Law) region, F ∝ e — so the graph is a straight line through the origin.' },

  { id: 'spr_t1_07', topicId: 'spring', course: 'combined', tier: 1, type: 'mcq', marks: 1, timeExpected: 30,
    question: 'What happens to the spring after the elastic limit is exceeded?',
    options: ['It returns to its natural length', 'It permanently deforms and does not return to original length', 'It breaks immediately', 'Its spring constant increases'],
    correctIndex: 1,
    senNote: 'Beyond the elastic limit, the spring is permanently deformed — it will not spring back fully.' },

  { id: 'spr_t1_08', topicId: 'spring', course: 'combined', tier: 1, type: 'mcq', marks: 1, timeExpected: 30,
    question: 'To convert mass in grams to force in Newtons, which relationship do you use?',
    options: ['F = mv', 'F = mg (where g = 10 N/kg)', 'F = ma (where a = 9.8)', 'F = kx'],
    correctIndex: 1,
    senNote: 'Weight = mass × gravitational field strength. W = mg. On Earth, g ≈ 10 N/kg.' },

  { id: 'spr_t2_01', topicId: 'spring', course: 'combined', tier: 2, type: 'mcq', marks: 1, timeExpected: 60,
    question: 'A spring has natural length 10 cm. When a 2 N force is applied, the total length is 14 cm. What is the spring constant?',
    options: ['0.5 N/m', '2 N/m', '5 N/m', '50 N/m'],
    correctIndex: 3,
    senNote: 'Extension = 14 − 10 = 4 cm = 0.04 m. k = F/e = 2/0.04 = 50 N/m.' },

  { id: 'spr_t2_02', topicId: 'spring', course: 'combined', tier: 2, type: 'mcq', marks: 1, timeExpected: 60,
    question: 'A force-extension graph curves upward beyond a certain point. What does this indicate?',
    options: ['The spring is obeying Hooke\'s Law', 'The spring has exceeded its limit of proportionality', 'The mass was measured incorrectly', 'The ruler was not accurate'],
    correctIndex: 1,
    senNote: 'When the graph curves, extension increases faster than force — Hooke\'s Law no longer applies.' },

  { id: 'spr_t2_03', topicId: 'spring', course: 'combined', tier: 2, type: 'short_answer', marks: 2, timeExpected: 60,
    question: 'A student says "I will add masses until the spring reaches its limit of proportionality." Explain what this means and describe what the student would observe.',
    markScheme: [
      'Limit of proportionality: the point beyond which extension is no longer proportional to force (1)',
      'The student would observe: the graph stops being a straight line and begins to curve / the spring does not return to its natural length when weights are removed (1)',
    ],
    senNote: 'The limit of proportionality is where the straight line on the graph becomes a curve.' },

  { id: 'spr_t2_04', topicId: 'spring', course: 'combined', tier: 2, type: 'calculation', marks: 3, timeExpected: 60,
    question: 'A spring has a spring constant of 25 N/m. Calculate the force needed to produce an extension of 8 cm.',
    answer: 2,
    unit: 'N',
    acceptableRange: [1.9, 2.1],
    markScheme: ['Convert: 8 cm = 0.08 m (1)', 'F = ke = 25 × 0.08 (1)', 'F = 2.0 N (1)'],
    senNote: 'Convert extension to metres first. Then F = ke.' },

  { id: 'spr_t3_01', topicId: 'spring', course: 'combined', tier: 3, type: 'extended', marks: 6, timeExpected: 120,
    question: "Describe how you would carry out an experiment to investigate how the extension of a spring depends on the force applied. Include how you would identify the limit of proportionality.",
    markScheme: [
      'Set up a clamp stand with a spring hanging vertically; attach a pointer or set square to the base of the spring (1)',
      'Measure and record the natural length of the unloaded spring with a metre ruler (1)',
      'Add masses in steps (e.g. 100 g = 1 N); record the new total length after each addition (1)',
      'Calculate extension = new length − natural length for each mass (1)',
      'Plot force (y-axis) vs extension (x-axis); draw line of best fit (1)',
      'Identify the limit of proportionality as the point where the graph deviates from a straight line (1)',
    ],
    senNote: 'Six points: setup → measure natural length → add masses → record lengths → calculate extension → plot and identify limit.' },

  { id: 'spr_t3_02', topicId: 'spring', course: 'combined', tier: 3, type: 'extended', marks: 4, timeExpected: 120,
    question: "A student uses two identical springs — one in series (end-to-end) and one in parallel (side-by-side) with the same force applied. Predict and explain the difference in extension.",
    markScheme: [
      'Springs in series: total extension doubles (each spring extends by e, so total = 2e) (1)',
      'This means effective spring constant halves: k_series = k/2 (1)',
      'Springs in parallel: each spring shares the load (F/2 each), so extension halves (1)',
      'Effective spring constant doubles: k_parallel = 2k (1)',
    ],
    senNote: 'Series = weaker/more stretchy. Parallel = stiffer/less stretchy.' },

  // ─────────────────────────────────────────────────────────────────────────────
  // RP8: NEWTON'S 2ND LAW — ACCELERATION (acceleration)
  // ─────────────────────────────────────────────────────────────────────────────

  { id: 'acc_t1_01', topicId: 'acceleration', course: 'combined', tier: 1, type: 'mcq', marks: 1, timeExpected: 30,
    question: "In Newton's 2nd Law experiment, what is the independent variable when investigating force vs acceleration?",
    options: ['Total mass of the trolley system', 'Acceleration of the trolley', 'Force applied to the trolley (hanging mass)', 'Friction on the runway'],
    correctIndex: 2,
    senNote: 'You change the force by adding different hanging masses. Force is the independent variable.' },

  { id: 'acc_t1_02', topicId: 'acceleration', course: 'combined', tier: 1, type: 'mcq', marks: 1, timeExpected: 30,
    question: "What is measured as the dependent variable in Newton's 2nd Law experiment?",
    options: ['The force applied', 'The total mass', 'The acceleration of the trolley', 'The length of the runway'],
    correctIndex: 2,
    senNote: 'You measure how quickly the trolley speeds up — acceleration is what you observe.' },

  { id: 'acc_t1_03', topicId: 'acceleration', course: 'combined', tier: 1, type: 'mcq', marks: 1, timeExpected: 30,
    question: 'Which equipment can be used to measure the acceleration of the trolley?',
    options: ['A thermometer', 'Light gates connected to a data logger', 'A voltmeter', 'A balance'],
    correctIndex: 1,
    senNote: 'Light gates measure the time for a card to pass through — from this you can calculate velocity and acceleration.' },

  { id: 'acc_t1_04', topicId: 'acceleration', course: 'combined', tier: 1, type: 'mcq', marks: 1, timeExpected: 30,
    question: "Why is the runway slightly tilted (compensated) in Newton's 2nd Law experiment?",
    options: ['To increase the acceleration', 'To compensate for friction so that the only net force is the hanging weight', 'To make the trolley move faster', 'To reduce the mass of the trolley'],
    correctIndex: 1,
    senNote: 'A slight tilt makes the component of gravity along the runway exactly cancel friction — so friction does not affect your results.' },

  { id: 'acc_t1_05', topicId: 'acceleration', course: 'combined', tier: 1, type: 'mcq', marks: 1, timeExpected: 30,
    question: "In the experiment, when investigating force vs acceleration, what must be kept constant?",
    options: ['The force applied', 'The acceleration', 'The total mass of the trolley system', 'The length of the string'],
    correctIndex: 2,
    senNote: 'Total mass must stay constant when you change force — otherwise you are changing two variables at once, which is unfair.' },

  { id: 'acc_t1_06', topicId: 'acceleration', course: 'combined', tier: 1, type: 'mcq', marks: 1, timeExpected: 30,
    question: "What is Newton's 2nd Law?",
    options: ['Force = mass + acceleration', 'Force = mass × acceleration', 'Force = mass / acceleration', 'Acceleration = force + mass'],
    correctIndex: 1,
    senNote: 'F = ma. Units: force in Newtons (N), mass in kilograms (kg), acceleration in m/s².' },

  { id: 'acc_t1_07', topicId: 'acceleration', course: 'combined', tier: 1, type: 'mcq', marks: 1, timeExpected: 30,
    question: "When masses are moved from the trolley to the hanging mass, why is this important?",
    options: ['To change the total mass', 'To keep total mass constant while increasing the force', 'To reduce friction', 'To increase the runway length'],
    correctIndex: 1,
    senNote: 'Moving masses (not adding them) keeps total system mass constant — only the driving force changes.' },

  { id: 'acc_t1_08', topicId: 'acceleration', course: 'combined', tier: 1, type: 'mcq', marks: 1, timeExpected: 30,
    question: "If force doubles and mass stays constant, what happens to acceleration?",
    options: ['Acceleration halves', 'Acceleration stays the same', 'Acceleration doubles', 'Acceleration quadruples'],
    correctIndex: 2,
    senNote: 'From F = ma: if F doubles and m is constant, a must double. They are directly proportional.' },

  { id: 'acc_t2_01', topicId: 'acceleration', course: 'combined', tier: 2, type: 'mcq', marks: 1, timeExpected: 60,
    question: "A trolley of total mass 0.8 kg is pulled by a force of 2.4 N. Calculate its acceleration.",
    options: ['0.33 m/s²', '1.6 m/s²', '3.0 m/s²', '1.92 m/s²'],
    correctIndex: 2,
    senNote: 'a = F/m = 2.4/0.8 = 3.0 m/s².' },

  { id: 'acc_t2_02', topicId: 'acceleration', course: 'combined', tier: 2, type: 'mcq', marks: 1, timeExpected: 60,
    question: "A graph of acceleration vs force is plotted. The graph is a straight line through the origin. What does the gradient of this graph represent?",
    options: ['The force', 'The total mass of the system (m = F/a)', '1/mass of the system', 'The acceleration due to gravity'],
    correctIndex: 2,
    senNote: 'a = F/m → gradient of a vs F graph = 1/m. Reciprocal of the gradient gives the mass.' },

  { id: 'acc_t2_03', topicId: 'acceleration', course: 'combined', tier: 2, type: 'short_answer', marks: 2, timeExpected: 60,
    question: "A student finds that their graph of acceleration vs force does not pass through the origin. Suggest one reason for this.",
    markScheme: [
      'Friction was not fully compensated — even with a small force, the trolley does not accelerate (1) because friction opposes the motion (1)',
      'OR: The runway was tilted too much — at zero applied force, the trolley still accelerates slightly (1)',
    ],
    senNote: 'If the line does not pass through the origin, a systematic error is present — usually friction or runway tilt.' },

  { id: 'acc_t2_04', topicId: 'acceleration', course: 'combined', tier: 2, type: 'calculation', marks: 3, timeExpected: 60,
    question: "A trolley accelerates at 1.5 m/s² when a force of 0.6 N is applied. Calculate the mass of the trolley.",
    answer: 0.4,
    unit: 'kg',
    acceptableRange: [0.38, 0.42],
    markScheme: ['F = ma → m = F/a (1)', 'm = 0.6 / 1.5 (1)', 'm = 0.40 kg (1)'],
    senNote: 'Rearrange F = ma to get m = F/a.' },

  { id: 'acc_t3_01', topicId: 'acceleration', course: 'combined', tier: 3, type: 'extended', marks: 6, timeExpected: 120,
    question: "Describe how you would investigate how force affects the acceleration of a trolley on a runway. Include how you would ensure a fair test.",
    markScheme: [
      'Set up trolley on a slightly tilted (friction-compensated) runway with a pulley at the end; attach string from trolley over pulley to hanging masses (1)',
      'Set up two light gates connected to a data logger to measure the acceleration of the trolley (1)',
      'Start with all masses on the trolley; move one mass at a time to the hanging end to increase force while keeping total mass constant (1)',
      'Record the force (= weight of hanging masses = mg) and the acceleration from the data logger for each trial (1)',
      'Plot acceleration (y-axis) vs force (x-axis); expect a straight line through origin (1)',
      'Gradient = 1/total mass; verify by checking gradient × mass ≈ 1 (1)',
    ],
    senNote: 'Key fair test point: move masses, do not add them. Total mass must stay the same throughout.' },

  { id: 'acc_t3_02', topicId: 'acceleration', course: 'combined', tier: 3, type: 'extended', marks: 4, timeExpected: 120,
    question: "A student investigates how mass affects acceleration when force is constant. They find that doubling the mass halves the acceleration. Evaluate this conclusion using Newton's 2nd Law.",
    markScheme: [
      'Newton\'s 2nd Law: F = ma, so a = F/m (1)',
      'If F is constant and m doubles, then a = F/2m — acceleration halves (1)',
      'The student\'s conclusion is consistent with Newton\'s 2nd Law (a ∝ 1/m) (1)',
      'To make conclusion more reliable: repeat each measurement; plot a graph of a vs 1/m and check for a straight line through origin (1)',
    ],
    senNote: 'Evaluate = is the conclusion correct? Use the equation to show mathematically why doubling mass halves acceleration.' },

  // ─────────────────────────────────────────────────────────────────────────────
  // RP9: WAVES — RIPPLE TANK & STRING (waves)
  // ─────────────────────────────────────────────────────────────────────────────

  { id: 'wav_t1_01', topicId: 'waves', course: 'combined', tier: 1, type: 'mcq', marks: 1, timeExpected: 30,
    question: 'What is the wave equation linking wave speed, frequency and wavelength?',
    options: ['v = f + λ', 'v = f / λ', 'v = f × λ', 'v = λ / f'],
    correctIndex: 2,
    senNote: 'Wave speed = frequency × wavelength. v = fλ. Units: m/s, Hz, m.' },

  { id: 'wav_t1_02', topicId: 'waves', course: 'combined', tier: 1, type: 'mcq', marks: 1, timeExpected: 30,
    question: 'In the waves experiment, how is the wavelength of water waves in a ripple tank measured?',
    options: ['By timing how long it takes one wave to travel', 'By measuring the distance between consecutive crests (peaks)', 'By counting the number of waves in 1 minute', 'By measuring the depth of the water'],
    correctIndex: 1,
    senNote: 'Wavelength is the distance from one crest to the next (or trough to trough). Measure on the shadow pattern projected below.' },

  { id: 'wav_t1_03', topicId: 'waves', course: 'combined', tier: 1, type: 'mcq', marks: 1, timeExpected: 30,
    question: 'How is the frequency of waves in a ripple tank controlled?',
    options: ['By changing the depth of water', 'By adjusting the vibration frequency of the motor/dipper', 'By changing the temperature of the water', 'By tilting the tank'],
    correctIndex: 1,
    senNote: 'The signal generator controls the vibrating dipper — higher frequency setting → more waves per second.' },

  { id: 'wav_t1_04', topicId: 'waves', course: 'combined', tier: 1, type: 'mcq', marks: 1, timeExpected: 30,
    question: 'What is the frequency of a wave?',
    options: ['The distance between two crests', 'The number of complete waves passing a point per second', 'The height of a wave above the rest position', 'The speed of the wave'],
    correctIndex: 1,
    senNote: 'Frequency is measured in Hertz (Hz). 1 Hz = 1 complete wave per second.' },

  { id: 'wav_t1_05', topicId: 'waves', course: 'combined', tier: 1, type: 'mcq', marks: 1, timeExpected: 30,
    question: 'In a stationary (standing) wave on a string, what is the distance from one node to the next adjacent node?',
    options: ['One full wavelength', 'Half a wavelength', 'Quarter of a wavelength', 'Two wavelengths'],
    correctIndex: 1,
    senNote: 'Distance between adjacent nodes = λ/2. To get the full wavelength, measure the distance between alternate nodes.' },

  { id: 'wav_t1_06', topicId: 'waves', course: 'combined', tier: 1, type: 'mcq', marks: 1, timeExpected: 30,
    question: 'What type of wave is produced on a vibrating string?',
    options: ['Longitudinal', 'Transverse', 'Electromagnetic', 'Sound'],
    correctIndex: 1,
    senNote: 'Waves on a string are transverse — the string oscillates perpendicular (at right angles) to the direction of energy travel.' },

  { id: 'wav_t1_07', topicId: 'waves', course: 'combined', tier: 1, type: 'mcq', marks: 1, timeExpected: 30,
    question: 'Why is a stroboscope sometimes used in the ripple tank experiment?',
    options: ['To measure the frequency of light', 'To "freeze" the wave pattern so it is easier to measure the wavelength', 'To heat the water', 'To reduce the amplitude'],
    correctIndex: 1,
    senNote: 'A stroboscope flashing at the same frequency as the waves makes them appear stationary — easier to measure.' },

  { id: 'wav_t1_08', topicId: 'waves', course: 'combined', tier: 1, type: 'mcq', marks: 1, timeExpected: 30,
    question: 'If the frequency of waves in a ripple tank doubles but wave speed stays the same, what happens to the wavelength?',
    options: ['It doubles', 'It stays the same', 'It halves', 'It quadruples'],
    correctIndex: 2,
    senNote: 'v = fλ → if v is constant and f doubles, λ must halve to keep the product the same.' },

  { id: 'wav_t2_01', topicId: 'waves', course: 'combined', tier: 2, type: 'mcq', marks: 1, timeExpected: 60,
    question: 'Water waves in a ripple tank have a frequency of 5 Hz and a wavelength of 2 cm. Calculate the wave speed.',
    options: ['0.1 m/s', '0.1 cm/s', '10 cm/s', '10 m/s'],
    correctIndex: 2,
    senNote: 'v = fλ = 5 × 2 = 10 cm/s. Note: keep units consistent — if λ is in cm, v is in cm/s.' },

  { id: 'wav_t2_02', topicId: 'waves', course: 'combined', tier: 2, type: 'mcq', marks: 1, timeExpected: 60,
    question: 'A student measures 5 complete wavelengths as 6.0 cm. What is the wavelength?',
    options: ['30 cm', '5 cm', '1.2 cm', '6.0 cm'],
    correctIndex: 2,
    senNote: '5 wavelengths = 6.0 cm → 1 wavelength = 6.0/5 = 1.2 cm. Measuring multiple wavelengths then dividing reduces measurement error.' },

  { id: 'wav_t2_03', topicId: 'waves', course: 'combined', tier: 2, type: 'short_answer', marks: 2, timeExpected: 60,
    question: 'Explain why a student would measure the length of five wavelengths rather than just one when finding the wavelength of water waves.',
    markScheme: [
      'Measuring five wavelengths gives a larger distance (1)',
      'Dividing by five reduces the effect of the measurement error — the percentage uncertainty is smaller (1)',
    ],
    senNote: 'Bigger measurement → smaller percentage error. Divide by 5 to get one wavelength.' },

  { id: 'wav_t2_04', topicId: 'waves', course: 'combined', tier: 2, type: 'calculation', marks: 3, timeExpected: 60,
    question: 'A vibration generator on a string produces a wave with a frequency of 40 Hz. The distance between two adjacent nodes is 20 cm. Calculate the wave speed on the string.',
    answer: 16,
    unit: 'm/s',
    acceptableRange: [15, 17],
    markScheme: ['Distance between adjacent nodes = λ/2, so λ = 2 × 20 = 40 cm = 0.40 m (1)', 'v = fλ = 40 × 0.40 (1)', 'v = 16 m/s (1)'],
    senNote: 'Node-to-node = half a wavelength. Double it to get λ. Then v = fλ.' },

  { id: 'wav_t3_01', topicId: 'waves', course: 'combined', tier: 3, type: 'extended', marks: 6, timeExpected: 120,
    question: 'Describe how you would use a ripple tank to measure the speed of water waves. Include all measurements and how you would calculate the wave speed.',
    markScheme: [
      'Set up ripple tank with motor and dipper; fill with a shallow layer of water; place a lamp above to project shadows below (1)',
      'Set the signal generator to a known frequency (e.g. 5 Hz); record this value (1)',
      'Use a stroboscope or photograph to "freeze" the wave pattern and measure the wavelength (distance between crests) (1)',
      'Measure the length of several (e.g. 5) wavelengths and divide by 5 to reduce error (1)',
      'Calculate wave speed: v = f × λ (1)',
      'Repeat at different frequencies; wave speed should remain approximately constant (1)',
    ],
    senNote: 'Setup → set frequency → freeze pattern → measure multiple wavelengths → calculate v = fλ → repeat.' },

  { id: 'wav_t3_02', topicId: 'waves', course: 'combined', tier: 3, type: 'extended', marks: 4, timeExpected: 120,
    question: "A student finds that the wave speed changes when they change the frequency of the ripple tank. They conclude: 'higher frequency produces higher wave speed.' Evaluate this conclusion.",
    markScheme: [
      'The conclusion is incorrect — wave speed depends on the medium (depth of water), not on frequency (1)',
      'v = fλ: if v is constant, increasing f must decrease λ — not increase v (1)',
      'The student may have measured the wavelength incorrectly, or not controlled the water depth (1)',
      'To improve: check that water depth is constant; repeat measurements; compare v = fλ for different frequencies (1)',
    ],
    senNote: 'Wave speed in a medium is fixed by the medium, not by frequency. If speed appears to change, look for an error.' },

  // ─────────────────────────────────────────────────────────────────────────────
  // RP10: RADIATION AND ABSORPTION (radiation)
  // ─────────────────────────────────────────────────────────────────────────────

  { id: 'rad_t1_01', topicId: 'radiation', course: 'combined', tier: 1, type: 'mcq', marks: 1, timeExpected: 30,
    question: 'In the radiation experiment using a Leslie cube, what is the independent variable?',
    options: ['Temperature of the water inside', 'Distance from the cube', 'Type of surface (matt black, shiny silver, white)', 'Volume of water used'],
    correctIndex: 2,
    senNote: 'You compare different surfaces — the type of surface is what you change.' },

  { id: 'rad_t1_02', topicId: 'radiation', course: 'combined', tier: 1, type: 'mcq', marks: 1, timeExpected: 30,
    question: 'Which surface emits the most infrared radiation at the same temperature?',
    options: ['Shiny silver', 'White and smooth', 'Matt black', 'Transparent'],
    correctIndex: 2,
    senNote: 'Matt black surfaces are the best emitters and absorbers of infrared radiation.' },

  { id: 'rad_t1_03', topicId: 'radiation', course: 'combined', tier: 1, type: 'mcq', marks: 1, timeExpected: 30,
    question: 'Which surface absorbs the least infrared radiation?',
    options: ['Matt black', 'Dark grey', 'Shiny silver / polished metal', 'Dark blue'],
    correctIndex: 2,
    senNote: 'Shiny/polished surfaces reflect most infrared radiation — they are poor absorbers and poor emitters.' },

  { id: 'rad_t1_04', topicId: 'radiation', course: 'combined', tier: 1, type: 'mcq', marks: 1, timeExpected: 30,
    question: 'What instrument is used to detect infrared radiation from the Leslie cube?',
    options: ['Thermometer only', 'Infrared detector / thermopile / radiation sensor', 'Ammeter', 'Voltmeter'],
    correctIndex: 1,
    senNote: 'An infrared detector (thermopile or infrared sensor) converts infrared radiation into a measurable signal.' },

  { id: 'rad_t1_05', topicId: 'radiation', course: 'combined', tier: 1, type: 'mcq', marks: 1, timeExpected: 30,
    question: 'Why must the distance between the detector and the Leslie cube be kept the same for each surface tested?',
    options: ['To save time', 'Because infrared intensity depends on distance — keeping it constant makes the comparison fair', 'To prevent the cube from cooling', 'Because the detector only works at one distance'],
    correctIndex: 1,
    senNote: 'Distance is a control variable. Infrared radiation spreads out — further away means less detected.' },

  { id: 'rad_t1_06', topicId: 'radiation', course: 'combined', tier: 1, type: 'mcq', marks: 1, timeExpected: 30,
    question: 'What type of energy transfer is being investigated in the Leslie cube experiment?',
    options: ['Conduction', 'Convection', 'Radiation (infrared)', 'All three equally'],
    correctIndex: 2,
    senNote: 'Infrared radiation does not need a medium — it can travel through a vacuum. The Leslie cube investigates radiation only.' },

  { id: 'rad_t1_07', topicId: 'radiation', course: 'combined', tier: 1, type: 'mcq', marks: 1, timeExpected: 30,
    question: "What does a 'black body' emit compared to other objects at the same temperature?",
    options: ['Less radiation', 'The same radiation', 'The maximum possible radiation', 'Only visible light'],
    correctIndex: 2,
    senNote: 'A perfect black body absorbs all radiation that hits it and emits maximum radiation for its temperature.' },

  { id: 'rad_t1_08', topicId: 'radiation', course: 'combined', tier: 1, type: 'mcq', marks: 1, timeExpected: 30,
    question: 'Why is it important that the temperature of the water in the Leslie cube is the same for all four surfaces being compared?',
    options: ['Because hotter water cools faster', 'Because the amount of radiation emitted depends on temperature — same temperature means the only difference is the surface type', 'Because different temperatures cause the cube to expand', 'To save energy'],
    correctIndex: 1,
    senNote: 'Temperature is a control variable. You want to compare only the effect of surface type — keep temperature constant.' },

  { id: 'rad_t2_01', topicId: 'radiation', course: 'combined', tier: 2, type: 'mcq', marks: 1, timeExpected: 60,
    question: 'A student measures infrared output from each face of a Leslie cube at the same temperature. The results are: matt black: 92 units, dark grey: 78 units, white: 45 units, shiny silver: 12 units. What can they conclude?',
    options: ['All surfaces emit equally', 'Matt black is the best emitter; shiny silver is the worst emitter', 'Shiny silver is the best emitter', 'White surfaces emit most radiation'],
    correctIndex: 1,
    senNote: 'Higher detector reading = more radiation emitted. Matt black = 92 (highest) → best emitter.' },

  { id: 'rad_t2_02', topicId: 'radiation', course: 'combined', tier: 2, type: 'mcq', marks: 1, timeExpected: 60,
    question: "A student suggests that painting a radiator with matt black paint would make it more effective. Is this correct? Explain.",
    options: ['Yes — matt black is a better emitter of infrared than shiny metal', 'No — shiny metal radiates more heat', 'No — colour makes no difference to heat radiation', 'Yes — but only if the radiator is above 100°C'],
    correctIndex: 0,
    senNote: 'Matt black emits infrared radiation better than shiny surfaces. A black radiator would transfer more heat to the room.' },

  { id: 'rad_t2_03', topicId: 'radiation', course: 'combined', tier: 2, type: 'short_answer', marks: 2, timeExpected: 60,
    question: 'Explain why solar panels are usually coated in matt black rather than shiny silver.',
    markScheme: [
      'Matt black surfaces are better absorbers of infrared radiation (1)',
      'More infrared is absorbed → more energy transferred to the fluid in the panel → greater efficiency (1)',
    ],
    senNote: 'Best absorber = most heat in. Matt black wins for absorbing; shiny silver is better for reflecting (keeping heat out).' },

  { id: 'rad_t2_04', topicId: 'radiation', course: 'combined', tier: 2, type: 'calculation', marks: 2, timeExpected: 60,
    question: 'A student measures the detector reading from a Matt black surface as 88 units and from a shiny silver surface as 11 units. Calculate the ratio of radiation emitted (matt black : silver).',
    answer: 8,
    unit: ':1 ratio',
    acceptableRange: [7.5, 8.5],
    markScheme: ['Ratio = 88 / 11 = 8 (1)', 'Matt black emits 8 times more radiation than shiny silver at the same temperature (1)'],
    senNote: 'Ratio = large number ÷ small number. Matt black emits far more than silver.' },

  { id: 'rad_t3_01', topicId: 'radiation', course: 'combined', tier: 3, type: 'extended', marks: 6, timeExpected: 120,
    question: 'Describe how you would use a Leslie cube to compare the infrared emission from different surfaces. Include all measurements and how you would make the test fair.',
    markScheme: [
      'Fill the Leslie cube with hot water (e.g. boiling); monitor temperature to ensure it stays constant during the experiment (1)',
      'Place the infrared detector at a fixed distance from one face of the cube (e.g. 10 cm) (1)',
      'Record the detector reading for each surface (matt black, dark grey, white, shiny silver) (1)',
      'Return to the same face/distance for each measurement; keep distance constant (control variable) (1)',
      'Repeat readings for each surface and calculate mean (1)',
      'The surface with the highest detector reading emits the most infrared radiation (1)',
    ],
    senNote: 'Six marks: fill cube → place detector at fixed distance → record each surface → same distance throughout → repeat → compare.' },

  { id: 'rad_t3_02', topicId: 'radiation', course: 'combined', tier: 3, type: 'extended', marks: 4, timeExpected: 120,
    question: "A student concludes: 'Black surfaces are always hotter because they emit more radiation.' Evaluate this conclusion.",
    markScheme: [
      'The conclusion is incorrect — matt black surfaces emit more radiation, which means they also lose heat faster (1)',
      'Whether a surface is hotter depends on both emission and absorption (1)',
      'In sunlight, a black surface absorbs more radiation and may be hotter; in shade, it loses heat faster and may be cooler (1)',
      'The student has confused emission with temperature — emission rate is a property of the surface, not the current temperature (1)',
    ],
    senNote: 'Good emitters are also good absorbers — they gain and lose heat quickly. This doesn\'t mean they are always hotter.' },

  // ─────────────────────────────────────────────────────────────────────────────
  // RP6: SPECIFIC LATENT HEAT (latent_heat) — Physics only
  // ─────────────────────────────────────────────────────────────────────────────

  { id: 'lh_t1_01', topicId: 'latent_heat', course: 'physics_only', tier: 1, type: 'mcq', marks: 1, timeExpected: 30,
    question: 'What is specific latent heat?',
    options: ['The energy needed to raise 1 kg of a substance by 1°C', 'The energy needed to change the state of 1 kg of a substance without changing its temperature', 'The heat stored in 1 litre of water', 'The temperature at which a substance melts'],
    correctIndex: 1,
    senNote: 'Specific latent heat = energy for state change (melting or boiling) per kilogram. Temperature stays constant during this change.' },

  { id: 'lh_t1_02', topicId: 'latent_heat', course: 'physics_only', tier: 1, type: 'mcq', marks: 1, timeExpected: 30,
    question: 'What is the formula linking energy, mass and specific latent heat?',
    options: ['Q = mcΔT', 'Q = mL', 'Q = Pt', 'Q = mgh'],
    correctIndex: 1,
    senNote: 'Q = mL where Q = energy (J), m = mass (kg), L = specific latent heat (J/kg).' },

  { id: 'lh_t1_03', topicId: 'latent_heat', course: 'physics_only', tier: 1, type: 'mcq', marks: 1, timeExpected: 30,
    question: 'What happens to the temperature of melting ice as energy is supplied to it?',
    options: ['It rises steadily', 'It stays at 0°C until all the ice has melted', 'It drops below 0°C', 'It rises then drops'],
    correctIndex: 1,
    senNote: 'During a state change, the energy goes into breaking bonds — temperature stays constant until the change is complete.' },

  { id: 'lh_t1_04', topicId: 'latent_heat', course: 'physics_only', tier: 1, type: 'mcq', marks: 1, timeExpected: 30,
    question: 'Which equipment measures the current in the specific latent heat experiment?',
    options: ['Voltmeter', 'Ammeter', 'Thermometer', 'Stopwatch'],
    correctIndex: 1,
    senNote: 'Ammeter measures current (A). Used with a voltmeter to calculate power: P = IV.' },

  { id: 'lh_t1_05', topicId: 'latent_heat', course: 'physics_only', tier: 1, type: 'mcq', marks: 1, timeExpected: 30,
    question: 'In the latent heat of fusion experiment, what is the independent variable?',
    options: ['Temperature', 'Energy supplied (controlled by timing)', 'Mass of ice', 'Type of container'],
    correctIndex: 1,
    senNote: 'You supply energy over time using a heater (E = Pt). Energy supplied is the independent variable.' },

  { id: 'lh_t1_06', topicId: 'latent_heat', course: 'physics_only', tier: 1, type: 'mcq', marks: 1, timeExpected: 30,
    question: 'How do you find the mass of ice melted during the experiment?',
    options: ['Measure the volume of water', 'Weigh the container before and after melting; difference = mass melted', 'Count the number of ice cubes', 'Measure with a thermometer'],
    correctIndex: 1,
    senNote: 'Mass of ice melted = mass before − mass after (using a balance). The water produced has the same mass as the ice that melted.' },

  { id: 'lh_t1_07', topicId: 'latent_heat', course: 'physics_only', tier: 1, type: 'mcq', marks: 1, timeExpected: 30,
    question: 'Why is a control experiment (without the heater) run alongside the latent heat experiment?',
    options: ['To heat the ice faster', 'To measure the rate at which ice melts due to the surroundings alone, so this can be subtracted', 'To check the ammeter reading', 'To keep the room temperature constant'],
    correctIndex: 1,
    senNote: 'Some ice melts just from the room\'s heat — the control tells you how much. You subtract it to find how much the heater melted.' },

  { id: 'lh_t1_08', topicId: 'latent_heat', course: 'physics_only', tier: 1, type: 'mcq', marks: 1, timeExpected: 30,
    question: 'What units is specific latent heat measured in?',
    options: ['J/kg°C', 'J/kg', 'W/m', 'J/s'],
    correctIndex: 1,
    senNote: 'Specific latent heat: J/kg. (Compare with specific heat capacity: J/kg°C — note no °C for latent heat as temp doesn\'t change.)' },

  { id: 'lh_t2_01', topicId: 'latent_heat', course: 'physics_only', tier: 2, type: 'mcq', marks: 1, timeExpected: 60,
    question: 'A heater supplies 30 W for 4 minutes. Calculate the energy supplied.',
    options: ['120 J', '480 J', '7200 J', '1800 J'],
    correctIndex: 2,
    senNote: 'E = Pt = 30 × (4 × 60) = 30 × 240 = 7200 J. Remember to convert minutes to seconds.' },

  { id: 'lh_t2_02', topicId: 'latent_heat', course: 'physics_only', tier: 2, type: 'mcq', marks: 1, timeExpected: 60,
    question: 'A student runs a control experiment and finds that 20 g of ice melts without the heater in 5 minutes. With the heater on, 65 g melts. How much ice did the heater melt?',
    options: ['65 g', '20 g', '45 g', '85 g'],
    correctIndex: 2,
    senNote: 'Heater melted = total with heater − control = 65 − 20 = 45 g.' },

  { id: 'lh_t2_03', topicId: 'latent_heat', course: 'physics_only', tier: 2, type: 'short_answer', marks: 2, timeExpected: 60,
    question: 'Explain why the temperature of ice stays at 0°C while it is melting, even though energy is being supplied.',
    markScheme: [
      'The energy supplied is used to break the bonds between water molecules (intermolecular bonds) (1)',
      'No energy goes into increasing the kinetic energy of the particles — so temperature stays constant (1)',
    ],
    senNote: 'Temperature measures average kinetic energy of particles. During melting, energy breaks bonds (potential energy), not KE.' },

  { id: 'lh_t2_04', topicId: 'latent_heat', course: 'physics_only', tier: 2, type: 'calculation', marks: 3, timeExpected: 60,
    question: 'A 30 W heater melts 45 g of ice in 5 minutes (after subtracting the control). Calculate the specific latent heat of fusion of water.',
    answer: 200000,
    unit: 'J/kg',
    acceptableRange: [190000, 210000],
    markScheme: ['E = Pt = 30 × 300 = 9000 J (1)', 'L = E/m = 9000 / 0.045 (1)', 'L = 200,000 J/kg (1)'],
    senNote: 'Convert 45 g to 0.045 kg. L = Q/m = energy ÷ mass. The accepted value is 334,000 J/kg — student\'s value is lower due to heat loss.' },

  { id: 'lh_t3_01', topicId: 'latent_heat', course: 'physics_only', tier: 3, type: 'extended', marks: 6, timeExpected: 120,
    question: 'Describe how you would measure the specific latent heat of fusion of water using an electrical method. Include how you would account for melting due to room temperature.',
    markScheme: [
      'Set up a funnel with crushed ice; insert an immersion heater connected to ammeter and power supply; voltmeter in parallel with heater (1)',
      'Run a control experiment alongside: identical funnel with same mass of ice but NO heater; collect water dripping out (1)',
      'Switch on heater; record current and voltage; start stopwatch (1)',
      'After a set time (e.g. 5 min), collect and measure the mass of water from both funnels (1)',
      'Mass melted by heater = mass from heated funnel − mass from control funnel (1)',
      'Calculate E = Pt and L = E / m_heater (1)',
    ],
    senNote: 'The control experiment is the key feature — subtract the background melting from the total.' },

  { id: 'lh_t3_02', topicId: 'latent_heat', course: 'physics_only', tier: 3, type: 'extended', marks: 4, timeExpected: 120,
    question: "Extension — Latent heat of vaporisation: A student measures the latent heat of vaporisation of water (Lv) by heating water with a 50 W heater until it boils and collecting the steam. They calculate Lv = 1.9 × 10⁶ J/kg. The accepted value is 2.26 × 10⁶ J/kg. Suggest two reasons why the student's value is lower, and suggest one improvement.",
    markScheme: [
      'Heat loss to surroundings — some energy heats the air rather than boiling the water, so less steam is produced per joule than expected → L appears too small (1)',
      'Steam condensing in the collection vessel before being weighed — mass of water appears larger than mass vaporised, so L = E/m is underestimated (1)',
      'Improvement: insulate the container; use a condenser to collect all steam; reduce time of experiment to minimise losses (1)',
      'Repeat multiple times and take a mean to reduce random error (1)',
    ],
    senNote: 'If L is too small, it means either too much energy was lost OR the mass of steam collected was too large.' },

  // ─────────────────────────────────────────────────────────────────────────────
  // RP11: REFLECTION & REFRACTION OF LIGHT (light) — Physics only
  // ─────────────────────────────────────────────────────────────────────────────

  { id: 'lgt_t1_01', topicId: 'light', course: 'physics_only', tier: 1, type: 'mcq', marks: 1, timeExpected: 30,
    question: 'What is the law of reflection?',
    options: ['Angle of incidence = angle of refraction', 'Angle of incidence = angle of reflection', 'Angle of reflection = 90°', 'Angle of incidence is always 45°'],
    correctIndex: 1,
    senNote: 'Law of reflection: angle of incidence = angle of reflection. Both angles are measured from the normal line.' },

  { id: 'lgt_t1_02', topicId: 'light', course: 'physics_only', tier: 1, type: 'mcq', marks: 1, timeExpected: 30,
    question: 'What is the normal in a light experiment?',
    options: ['The surface of the glass block', 'A line perpendicular (at 90°) to the surface at the point of incidence', 'The incident ray', 'The refracted ray'],
    correctIndex: 1,
    senNote: 'The normal is a construction line drawn at 90° to the surface. All angles are measured from this line, not from the surface.' },

  { id: 'lgt_t1_03', topicId: 'light', course: 'physics_only', tier: 1, type: 'mcq', marks: 1, timeExpected: 30,
    question: 'When light travels from air into glass, which way does it refract?',
    options: ['Away from the normal', 'Towards the normal', 'It does not change direction', 'It reflects completely'],
    correctIndex: 1,
    senNote: 'Light slows down when entering a denser medium (glass). Slowing down = bending towards the normal.' },

  { id: 'lgt_t1_04', topicId: 'light', course: 'physics_only', tier: 1, type: 'mcq', marks: 1, timeExpected: 30,
    question: 'Which equipment is used to produce a narrow beam of light in the refraction experiment?',
    options: ['A torch only', 'A ray box with a single slit', 'A prism', 'A magnifying glass'],
    correctIndex: 1,
    senNote: 'A ray box with a single-slit card produces a narrow ray of light that is easy to trace on paper.' },

  { id: 'lgt_t1_05', topicId: 'light', course: 'physics_only', tier: 1, type: 'mcq', marks: 1, timeExpected: 30,
    question: 'What is the refractive index formula?',
    options: ['n = sin(r) / sin(i)', 'n = sin(i) / sin(r)', 'n = i / r', 'n = r / i'],
    correctIndex: 1,
    senNote: 'n = sin(i) / sin(r) where i = angle of incidence (in air) and r = angle of refraction (in glass). This is Snell\'s Law.' },

  { id: 'lgt_t1_06', topicId: 'light', course: 'physics_only', tier: 1, type: 'mcq', marks: 1, timeExpected: 30,
    question: 'In the reflection experiment, how do you find the position of the image in a plane mirror?',
    options: ['Measure the distance from the object to the mirror and double it', 'Use two pins: place them in line with the reflected ray viewed from the other side', 'Use a ruler to mark the midpoint', 'Count the grid squares'],
    correctIndex: 1,
    senNote: 'Pin method: look from the reflected side and align two pins with the virtual image. The image is directly behind the mirror, same distance as the object.' },

  { id: 'lgt_t1_07', topicId: 'light', course: 'physics_only', tier: 1, type: 'mcq', marks: 1, timeExpected: 30,
    question: 'Why is each side of the glass block outlined in pencil before shining light through it?',
    options: ['To mark where the refracted ray comes out', 'To record the exact position of the block so you can draw the ray path through it accurately', 'To measure its area', 'To mark the normal line'],
    correctIndex: 1,
    senNote: 'You trace the block\'s outline so you can draw the complete ray path — incident, through the glass, and emergent — on one diagram.' },

  { id: 'lgt_t1_08', topicId: 'light', course: 'physics_only', tier: 1, type: 'mcq', marks: 1, timeExpected: 30,
    question: 'A ray of light passes through a parallel-sided glass block. How does the emergent ray compare to the incident ray?',
    options: ['It is at a different angle', 'It is parallel to the incident ray but displaced sideways', 'It is perpendicular to the incident ray', 'It reverses direction completely'],
    correctIndex: 1,
    senNote: 'Parallel-sided block: light enters and exits at the same angle (refraction reverses at each surface) but is shifted sideways.' },

  { id: 'lgt_t2_01', topicId: 'light', course: 'physics_only', tier: 2, type: 'mcq', marks: 1, timeExpected: 60,
    question: 'A ray hits a glass surface at 30° to the normal. The refracted angle inside the glass is 19°. Calculate the refractive index.',
    options: ['0.64', '1.54', '1.00', '0.35'],
    correctIndex: 1,
    senNote: 'n = sin(30°)/sin(19°) = 0.500/0.326 = 1.53 ≈ 1.5. This is close to the refractive index of glass.' },

  { id: 'lgt_t2_02', topicId: 'light', course: 'physics_only', tier: 2, type: 'mcq', marks: 1, timeExpected: 60,
    question: "A student shines a ray at 0° (along the normal). What happens?",
    options: ['The ray bends towards the normal', 'The ray bends away from the normal', 'The ray passes straight through without bending', 'The ray reflects completely'],
    correctIndex: 2,
    senNote: 'A ray hitting perpendicular to the surface (along the normal) passes straight through — 0° in, 0° out.' },

  { id: 'lgt_t2_03', topicId: 'light', course: 'physics_only', tier: 2, type: 'short_answer', marks: 2, timeExpected: 60,
    question: 'A student measures several pairs of angles of incidence (i) and refraction (r) for a glass block. Explain how they would use these to calculate the refractive index and check their result is reliable.',
    markScheme: [
      'Calculate n = sin(i)/sin(r) for each pair of readings (1)',
      'The refractive index should be approximately constant for all readings — if values are similar, the result is reliable; take a mean (1)',
    ],
    senNote: 'Reliable = consistent across multiple readings. Calculate n each time and check they are similar.' },

  { id: 'lgt_t2_04', topicId: 'light', course: 'physics_only', tier: 2, type: 'calculation', marks: 3, timeExpected: 60,
    question: 'A glass block has refractive index 1.5. A ray hits the glass surface at an angle of incidence of 40°. Calculate the angle of refraction inside the glass.',
    answer: 25,
    unit: '°',
    acceptableRange: [24, 26],
    markScheme: ['sin(r) = sin(i)/n = sin(40°)/1.5 (1)', 'sin(r) = 0.643/1.5 = 0.429 (1)', 'r = arcsin(0.429) ≈ 25° (1)'],
    senNote: 'Rearrange n = sin(i)/sin(r) to get sin(r) = sin(i)/n. Then use inverse sin to find the angle.' },

  { id: 'lgt_t3_01', topicId: 'light', course: 'physics_only', tier: 3, type: 'extended', marks: 6, timeExpected: 120,
    question: 'Describe how you would use a ray box and glass block to determine the refractive index of glass. Include all measurements and how you would calculate the refractive index.',
    markScheme: [
      'Place the glass block on white paper; trace its outline in pencil (1)',
      'Shine a ray from the ray box at an angle to the normal; mark the incident ray, the point of entry, and the emergent ray on the paper (1)',
      'Remove the block; draw a straight line connecting the incident and emergent rays through the block to find the refracted ray inside the glass (1)',
      'Draw the normal at the point of incidence (perpendicular to the glass surface) (1)',
      'Measure the angle of incidence (i) and angle of refraction (r) from the normal using a protractor (1)',
      'Calculate n = sin(i)/sin(r); repeat for several angles and take a mean (1)',
    ],
    senNote: 'Six marks → trace block → shine ray → mark rays → connect through block → measure angles → calculate n = sin(i)/sin(r).' },

  { id: 'lgt_t3_02', topicId: 'light', course: 'physics_only', tier: 3, type: 'extended', marks: 4, timeExpected: 120,
    question: "A student finds that as the angle of incidence increases from 10° to 60°, the refractive index values calculated are: 1.49, 1.51, 1.53, 1.48, 1.50, 1.52. Evaluate the reliability of these results and suggest one source of error.",
    markScheme: [
      'The values are all close to approximately 1.5 — consistent with the accepted refractive index of glass (1)',
      'Results are reliable as there is little variation between readings (range 1.48–1.53) (1)',
      'Source of error: difficulty measuring the angles precisely with a protractor (1)',
      'OR: the refracted ray drawn by joining incident and emergent ray may not be perfectly accurate if the emergent ray was not marked precisely (1)',
    ],
    senNote: 'Evaluate: are the results consistent? Are they close to the accepted value? Identify a specific error — not just "human error".' },

]

export default practicalsQuestions
