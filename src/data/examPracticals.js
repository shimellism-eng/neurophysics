const examPracticals = {

  // ===== RP1: Specific Heat Capacity (internal_energy) =====
  internal_energy: [
    {
      type: "sequence",
      question: "Put the steps for the specific heat capacity experiment in order.",
      questionSubtitle: "Required Practical 1",
      items: [
        "Measure the mass of the metal block using a balance",
        "Insert a thermometer and heater into the holes in the block",
        "Record the starting temperature of the block",
        "Turn on the heater and run it for a set time, recording the energy supplied",
        "Record the final temperature and calculate the temperature change",
      ],
      correctOrder: [0, 1, 2, 3, 4],
      tier: 2,
      senNote: "You need mass, temperature change and energy to find SHC.",
    },
    {
      type: "sequence",
      question: "How do you reduce errors in the SHC experiment?",
      questionSubtitle: "Required Practical 1 — Improving accuracy",
      items: [
        "Wrap the metal block in insulation to reduce heat loss",
        "Add a small amount of oil into the thermometer hole for good thermal contact",
        "Wait for the thermometer reading to stabilise before recording",
        "Repeat the experiment and calculate a mean value",
      ],
      correctOrder: [0, 1, 2, 3],
      tier: 2,
      senNote: "Insulation stops heat escaping. Oil helps the thermometer measure accurately.",
    },
  ],

  // ===== RP6: Specific Latent Heat (specific_latent_heat) =====
  specific_latent_heat: [
    {
      type: "sequence",
      question: "Put the steps for the specific latent heat of fusion experiment in order.",
      questionSubtitle: "Required Practical 6 — Latent heat of ice",
      items: [
        "Crush ice and place it in a funnel over a beaker — allow it to melt at room temperature (control)",
        "Place a second identical mass of ice in a funnel and add an immersion heater — record the energy supplied",
        "Measure the mass of water collected in each beaker over the same time period",
        "Subtract the control mass from the heated mass to find the extra ice melted by the heater",
        "Calculate L using Q = mL → L = Q ÷ m",
      ],
      correctOrder: [0, 1, 2, 3, 4],
      tier: 2,
      senNote: "The control experiment removes the effect of room-temperature melting from the result.",
    },
    {
      type: "sequence",
      question: "How do you improve accuracy in the specific latent heat experiment?",
      questionSubtitle: "Required Practical 6 — Reducing errors",
      items: [
        "Use a joulemeter or record voltage and current to calculate energy accurately",
        "Run both experiments for the same length of time",
        "Use the control beaker to account for background melting at room temperature",
        "Dry the ice first so surface water does not add to the mass",
      ],
      correctOrder: [0, 1, 2, 3],
      tier: 2,
      senNote: "The control removes background melting. Dry ice prevents extra mass from surface water.",
    },
  ],

  // ===== RP3: Resistance of a Wire (circuit_basics) =====
  circuit_basics: [
    {
      type: "sequence",
      question: "Put the steps for the resistance of a wire experiment in order.",
      questionSubtitle: "Required Practical 3",
      items: [
        "Set up a series circuit with a battery, ammeter, wire and crocodile clips",
        "Connect a voltmeter in parallel across the test wire",
        "Clip the wire at a measured length and record the length",
        "Read the current on the ammeter and the voltage on the voltmeter",
        "Calculate resistance using R = V / I and repeat for different lengths",
      ],
      correctOrder: [0, 1, 2, 3, 4],
      tier: 2,
      senNote: "Ammeter in SERIES, voltmeter in PARALLEL.",
    },
    {
      type: "sequence",
      question: "How do you improve accuracy in the resistance of a wire experiment?",
      questionSubtitle: "Required Practical 3 — Improving accuracy",
      items: [
        "Use a ruler to measure the wire length carefully from the inside of each clip",
        "Keep the current low so the wire does not heat up",
        "Turn off the circuit between readings to prevent temperature rise",
        "Repeat each length three times and calculate a mean resistance",
      ],
      correctOrder: [0, 1, 2, 3],
      tier: 2,
      senNote: "If the wire heats up, its resistance changes and results become unfair.",
    },
  ],

  // ===== RP4: I-V Characteristics (circuit_components) =====
  circuit_components: [
    {
      type: "sequence",
      question: "Put the steps for the I-V characteristics experiment in order.",
      questionSubtitle: "Required Practical 4",
      items: [
        "Set up a circuit with a variable resistor, ammeter and the test component",
        "Connect a voltmeter in parallel across the test component",
        "Adjust the variable resistor to change the voltage across the component",
        "Record pairs of current and voltage readings",
        "Plot current (y-axis) against voltage (x-axis) on a graph",
      ],
      correctOrder: [0, 1, 2, 3, 4],
      tier: 2,
      senNote: "Remember: ammeter in SERIES, voltmeter in PARALLEL.",
    },
    {
      type: "sequence",
      question: "How do you get negative readings for an I-V graph?",
      questionSubtitle: "Required Practical 4 — Full I-V curve",
      items: [
        "Take readings with the current flowing in one direction",
        "Turn off the power supply",
        "Swap the connections on the battery to reverse the current direction",
        "Take a new set of readings with reversed current and voltage",
      ],
      correctOrder: [0, 1, 2, 3],
      tier: 2,
      senNote: "Reversing the battery gives you the negative side of the graph.",
    },
  ],

  // ===== RP5: Density of Irregular Solid (states_density) =====
  states_density: [
    {
      type: "sequence",
      question: "Put the steps for finding the density of an irregular solid in order.",
      questionSubtitle: "Required Practical 5",
      items: [
        "Measure the mass of the object using a balance",
        "Fill a eureka can with water until it overflows from the spout",
        "Wait until the water stops dripping from the spout",
        "Lower the object into the water and collect the displaced water",
        "Measure the volume of displaced water using a measuring cylinder",
      ],
      correctOrder: [0, 1, 2, 3, 4],
      tier: 2,
      senNote: "Density = mass divided by volume. The displaced water gives you the volume.",
    },
    {
      type: "sequence",
      question: "How do you reduce errors in the density experiment?",
      questionSubtitle: "Required Practical 5 — Reducing error",
      items: [
        "Dry the object before measuring its mass",
        "Wait for the eureka can to stop dripping before lowering the object",
        "Lower the object gently to avoid splashing",
        "Read the measuring cylinder at eye level to avoid parallax error",
      ],
      correctOrder: [0, 1, 2, 3],
      tier: 2,
      senNote: "Parallax error means reading the scale at an angle. Always read at eye level.",
    },
  ],

  // ===== RP6: Force-Extension of a Spring (hookes_law) =====
  hookes_law: [
    {
      type: "sequence",
      question: "Put the steps for the force-extension experiment in order.",
      questionSubtitle: "Required Practical 6",
      items: [
        "Clamp the spring to a stand and measure its original length",
        "Hang a known weight from the spring",
        "Measure the new length of the spring and calculate the extension",
        "Add more weights one at a time, recording extension each time",
        "Plot a force-extension graph from the results",
      ],
      correctOrder: [0, 1, 2, 3, 4],
      tier: 2,
      senNote: "Extension = new length minus original length.",
    },
    {
      type: "sequence",
      question: "What safety steps should you follow in the spring experiment?",
      questionSubtitle: "Required Practical 6 — Safety precautions",
      items: [
        "Wear safety goggles in case the spring snaps",
        "Place a cushion or mat below the weights to catch them if they fall",
        "Do not add too many weights or the spring may deform permanently",
        "Stand back when the spring is under heavy load",
      ],
      correctOrder: [0, 1, 2, 3],
      tier: 2,
      senNote: "Springs can snap and fly up. Goggles protect your eyes.",
    },
  ],

  // ===== RP7: F=ma Investigation (newtons_laws) =====
  newtons_laws: [
    {
      type: "sequence",
      question: "Put the steps for the force and acceleration experiment in order.",
      questionSubtitle: "Required Practical 7",
      items: [
        "Set up a trolley on a smooth track with a pulley at one end",
        "Attach a string from the trolley over the pulley to a hanging mass",
        "Release the trolley and measure its acceleration using light gates",
        "Change the hanging mass to vary the force and repeat",
        "Plot a graph of acceleration against force",
      ],
      correctOrder: [0, 1, 2, 3, 4],
      tier: 2,
      senNote: "The hanging mass provides the force. Light gates measure acceleration.",
    },
    {
      type: "sequence",
      question: "What are the variables in the F = ma investigation?",
      questionSubtitle: "Required Practical 7 — Identifying variables",
      items: [
        "Independent variable: the force applied (changed by adding masses to the hanger)",
        "Dependent variable: the acceleration of the trolley (measured with light gates)",
        "Control variable: the total mass of the system must stay the same",
        "Move masses from the trolley to the hanger so total mass does not change",
      ],
      correctOrder: [0, 1, 2, 3],
      tier: 2,
      senNote: "You change the force, you measure the acceleration, you keep total mass the same.",
    },
  ],

  // ===== RP9: Refraction Through Glass Block (wave_reflection) =====
  wave_reflection: [
    {
      type: "sequence",
      question: "Put the steps for the refraction experiment in order.",
      questionSubtitle: "Required Practical 9",
      items: [
        "Place the glass block on paper and draw around its outline",
        "Shine a ray of light into the glass block at an angle",
        "Mark the entry point, exit point and the path of the ray",
        "Remove the block and draw the normal line at the boundary",
        "Measure the angle of incidence and angle of refraction with a protractor",
      ],
      correctOrder: [0, 1, 2, 3, 4],
      tier: 2,
      senNote: "The normal is a line at 90 degrees to the surface where the ray hits.",
    },
    {
      type: "sequence",
      question: "How do you draw the ray diagram for refraction?",
      questionSubtitle: "Required Practical 9 — Drawing the diagram",
      items: [
        "Draw the outline of the glass block on the paper",
        "Draw the normal line at right angles to the surface at the point of incidence",
        "Draw the incident ray from the light source to the boundary",
        "Draw the refracted ray inside the block bending towards the normal",
        "Draw the emergent ray leaving the block parallel to the incident ray",
      ],
      correctOrder: [0, 1, 2, 3, 4],
      tier: 2,
      senNote: "Light bends TOWARDS the normal when entering glass, and AWAY when leaving.",
    },
  ],

  // ===== IR Radiation Absorption (black_body) =====
  black_body: [
    {
      type: "sequence",
      question: "Put the steps for the IR radiation absorption experiment in order.",
      questionSubtitle: "Required Practical — IR radiation",
      items: [
        "Set up two metal plates — one painted black, one shiny silver",
        "Place an infrared heater the same distance from each plate",
        "Attach a thermometer to the back of each plate",
        "Turn on the heater and record the temperature every minute",
        "Compare how quickly each plate heats up",
      ],
      correctOrder: [0, 1, 2, 3, 4],
      tier: 2,
      senNote: "Black surfaces absorb more infrared radiation than shiny surfaces.",
    },
    {
      type: "sequence",
      question: "What are the variables in the IR absorption experiment?",
      questionSubtitle: "Required Practical — Identifying variables",
      items: [
        "Independent variable: the colour or surface type of the plate",
        "Dependent variable: the temperature rise of each plate",
        "Control variable: the distance from the heater to each plate",
        "Control variable: the starting temperature and size of each plate",
      ],
      correctOrder: [0, 1, 2, 3],
      tier: 2,
      senNote: "You change the surface, you measure the temperature, you keep distance the same.",
    },
  ],

  // ─── Required Practical: Describe Method ─────────────────────────────────
  // RP1 – Specific Heat Capacity
  internal_energy_describe: [
    {
      type: "sequence",
      question: "Put these steps for measuring specific heat capacity in the correct order.",
      questionSubtitle: "Required Practical RP1",
      items: [
        "Measure and record the mass of the metal block using a balance",
        "Insert the heater and thermometer into the holes in the block",
        "Record the initial temperature and connect the heater to a joulemeter",
        "Switch on the heater and record energy supplied (from joulemeter) and temperature every 30 seconds",
        "Switch off after a set time and record final temperature",
        "Calculate c using ΔE = mcΔT → c = ΔE ÷ (m × ΔT)",
      ],
      correctOrder: [0, 1, 2, 3, 4, 5],
      tier: 2,
      senNote: "Equation: c = energy supplied ÷ (mass × temperature change). Use a joulemeter for accurate energy reading.",
    },
    {
      type: "sequence",
      question: "A student gets a value of c = 520 J/kg°C for copper (actual = 385 J/kg°C). Identify possible sources of error and improvements.",
      questionSubtitle: "Error analysis for RP1",
      items: [
        "Error: heat is lost to the surroundings — block radiates/conducts heat away",
        "Error: thermometer does not reach the full temperature of the block (thermal lag)",
        "Error: not all energy from heater enters the block (heater warms air too)",
        "Improvement: wrap block in insulating material to reduce heat loss",
        "Improvement: use a data logger and temperature probe for more accurate readings",
        "Improvement: stir the block's heat through by waiting longer before reading final temperature",
      ],
      correctOrder: [0, 1, 2, 3, 4, 5],
      tier: 3,
      senNote: "The measured value being too high means too much energy was needed — suggesting heat was lost to the surroundings.",
    },
  ],

  // RP3 – Resistance
  circuit_basics_describe: [
    {
      type: "sequence",
      question: "Describe the correct method for investigating how resistance of a wire varies with length.",
      questionSubtitle: "Required Practical RP3",
      items: [
        "Set up a circuit: battery, ammeter in series, voltmeter in parallel across the wire",
        "Measure the wire and connect it at a length of 10 cm using crocodile clips",
        "Record the current (I) from the ammeter and voltage (V) from the voltmeter",
        "Calculate resistance using R = V/I",
        "Repeat for lengths of 20, 30, 40, 50 cm",
        "Plot a graph of resistance against length and draw the line of best fit",
      ],
      correctOrder: [0, 1, 2, 3, 4, 5],
      tier: 2,
      senNote: "Control variables: same wire material, same cross-sectional area, same temperature (switch off between readings).",
    },
    {
      type: "sequence",
      question: "Put these improvements to the resistance experiment in order of importance.",
      questionSubtitle: "Error analysis for RP3",
      items: [
        "Switch off the circuit between readings to prevent the wire heating up (resistance increases with temperature)",
        "Repeat each measurement three times and calculate the mean",
        "Use a longer range of wire lengths (10–100 cm) for a clearer pattern",
        "Check for anomalous results and exclude them from the line of best fit",
        "Zero the voltmeter and ammeter before starting",
      ],
      correctOrder: [0, 1, 2, 3, 4],
      tier: 3,
      senNote: "Heating is the biggest source of error — switch off between readings to keep temperature constant.",
    },
  ],

  // RP4 – I-V Characteristics
  circuit_components_describe: [
    {
      type: "sequence",
      question: "Describe the method for obtaining the I-V characteristic of a filament lamp.",
      questionSubtitle: "Required Practical RP4",
      items: [
        "Set up a circuit with the lamp, an ammeter in series, a voltmeter in parallel, and a variable resistor",
        "Starting at zero, increase the voltage using the variable resistor in small steps",
        "Record the current (I) and voltage (V) at each step",
        "Reverse the connections to obtain negative values of V and I",
        "Plot current on the y-axis against voltage on the x-axis",
        "The I-V graph for a lamp shows a curve (resistance increases as temperature rises)",
      ],
      correctOrder: [0, 1, 2, 3, 4, 5],
      tier: 2,
      senNote: "Variable resistor controls voltage. Reverse connections to get the negative side of the graph.",
    },
  ],

  // RP5 – Density
  states_density_describe: [
    {
      type: "sequence",
      question: "Describe a method to determine the density of an irregularly shaped stone.",
      questionSubtitle: "Required Practical RP5 — using displacement",
      items: [
        "Measure the mass of the stone using a balance",
        "Fill a displacement can (Eureka can) with water to the level of the spout",
        "Carefully lower the stone into the water and collect the displaced water in a measuring cylinder",
        "Read the volume of displaced water — this equals the volume of the stone",
        "Calculate density using ρ = m/V",
      ],
      correctOrder: [0, 1, 2, 3, 4],
      tier: 2,
      senNote: "Eureka can method: volume of displaced water = volume of object. ρ = m ÷ V.",
    },
    {
      type: "sequence",
      question: "Identify errors in a density experiment and suggest improvements.",
      questionSubtitle: "Error analysis for RP5",
      items: [
        "Error: water sticks to the sides of the measuring cylinder (meniscus) — read from the bottom of the meniscus",
        "Error: the displacement can may not be filled exactly to the spout — overfill then allow to drain before submerging",
        "Error: some displaced water may not reach the collecting cylinder — use a larger collecting cylinder placed directly under spout",
        "Improvement: repeat the experiment and calculate a mean volume",
        "Improvement: use a more precise measuring cylinder (smaller scale divisions)",
      ],
      correctOrder: [0, 1, 2, 3, 4],
      tier: 3,
      senNote: "Main errors are reading the meniscus wrong and not getting all the displaced water. Both reduce accuracy.",
    },
  ],

  // RP6 – Force & Extension (Hooke's Law)
  hookes_law_describe: [
    {
      type: "sequence",
      question: "Describe a method to investigate the relationship between force and extension for a spring.",
      questionSubtitle: "Required Practical RP6",
      items: [
        "Clamp the spring vertically and record its natural length using a ruler",
        "Add 100 g masses one at a time and record the new length after each mass is added",
        "Calculate extension = new length − natural length for each mass",
        "Calculate the force using F = mg (where g = 10 N/kg)",
        "Plot a graph of force (y-axis) against extension (x-axis)",
        "The linear section obeys Hooke's Law: F = ke; the gradient gives the spring constant k",
      ],
      correctOrder: [0, 1, 2, 3, 4, 5],
      tier: 2,
      senNote: "Extension = new length − original length. If the graph is linear, the spring obeys Hooke's Law.",
    },
  ],

  // RP7 – Acceleration (Newton's 2nd Law)
  newtons_laws_describe: [
    {
      type: "sequence",
      question: "Describe a method to investigate how force affects the acceleration of a trolley.",
      questionSubtitle: "Required Practical RP7 — F = ma",
      items: [
        "Set up a trolley on a runway connected to hanging masses via a string over a pulley",
        "Attach a light gate or ticker timer to measure the acceleration of the trolley",
        "Start with one 100 g hanging mass — record the acceleration",
        "Add 100 g masses to the hanger one at a time and record the acceleration for each force",
        "Keep the total mass of the system constant by transferring mass from the trolley to the hanger",
        "Plot a graph of acceleration against force — expect a straight line through the origin (a ∝ F at constant m)",
      ],
      correctOrder: [0, 1, 2, 3, 4, 5],
      tier: 2,
      senNote: "Transfer mass to the hanger (don't add new mass) to keep total system mass constant — this is the key controlled variable.",
    },
    {
      type: "sequence",
      question: "A student finds that the graph of acceleration vs force does not pass through the origin. Explain why and suggest a fix.",
      questionSubtitle: "Error analysis for RP7",
      items: [
        "Reason: friction between the trolley wheels and the runway causes a systematic error",
        "Reason: friction means a small force produces no acceleration until it overcomes friction",
        "Fix: tilt the runway slightly so gravity compensates for friction",
        "Fix: reduce friction by using a smooth runway and well-oiled wheels",
        "Verification: with the correct tilt, the trolley should move at constant speed with no hanging mass",
      ],
      correctOrder: [0, 1, 2, 3, 4],
      tier: 3,
      senNote: "Friction shifts the graph to the right (need more force before motion starts). Compensate by tilting the runway.",
    },
  ],

  // RP8 – Waves in a Ripple Tank
  wave_properties: [
    {
      type: "sequence",
      question: "Describe how to measure the speed of waves in a ripple tank.",
      questionSubtitle: "Required Practical RP8",
      items: [
        "Set up a ripple tank and use a vibrating bar to produce straight water waves",
        "Shine a stroboscope or light above the tank to freeze the wave pattern",
        "Count the number of complete waves across a known distance to find wavelength (λ)",
        "Record the frequency from the vibrator (or count waves per second)",
        "Calculate wave speed using v = fλ",
      ],
      correctOrder: [0, 1, 2, 3, 4],
      tier: 2,
      senNote: "v = fλ. Measure wavelength by counting several waves and dividing by the number.",
    },
  ],

  // RP9 – Reflection and Refraction of Light
  wave_reflection_describe: [
    {
      type: "sequence",
      question: "Describe a method to investigate the refraction of light as it passes from air into glass.",
      questionSubtitle: "Required Practical RP9",
      items: [
        "Place a glass block on paper and trace its outline",
        "Direct a ray box ray at the flat face of the block and trace the incident ray",
        "Mark the point where the ray enters and exits the block",
        "Remove the block and draw the refracted ray inside the block connecting entry and exit points",
        "Draw the normal at the entry point and measure the angle of incidence and angle of refraction",
        "Plot sin(i) against sin(r) — the gradient gives the refractive index n",
      ],
      correctOrder: [0, 1, 2, 3, 4, 5],
      tier: 2,
      senNote: "Snell's law: n = sin(i)/sin(r). Plot sin(i) vs sin(r) — gradient = n.",
    },
  ],

  // RP10 – Radiation (Black Body / Cooling)
  black_body_describe: [
    {
      type: "sequence",
      question: "Describe a method to compare the rates of emission of infrared radiation from different surfaces.",
      questionSubtitle: "Required Practical RP10",
      items: [
        "Set up metal cans with different surfaces: shiny silver, matte black, matte white",
        "Fill each can with the same volume of hot water at the same starting temperature",
        "Place identical infrared detectors (or thermometers) at the same distance from each can",
        "Record the temperature of each can every 2 minutes for 20 minutes",
        "Compare the cooling curves — a steeper drop indicates faster IR emission",
        "Conclusion: matte black surfaces emit IR fastest; shiny silver emit slowest",
      ],
      correctOrder: [0, 1, 2, 3, 4, 5],
      tier: 2,
      senNote: "Control variables: same volume of water, same starting temperature, same distance from detector, same room temperature.",
    },
    {
      type: "sequence",
      question: "Identify sources of error in the radiation experiment and suggest improvements.",
      questionSubtitle: "Error analysis for RP10",
      items: [
        "Error: heat loss through the top of the cans (not just radiation from the sides)",
        "Error: convection from the hot surface of the water affects the detector",
        "Error: the cans may be different sizes, giving different surface areas",
        "Improvement: use identical cans and lids to standardise heat loss paths",
        "Improvement: use an infrared camera or radiometer for more accurate emission measurement",
      ],
      correctOrder: [0, 1, 2, 3, 4],
      tier: 3,
      senNote: "The main issue is that other heat transfer mechanisms (conduction, convection) also operate — you're only trying to compare radiation.",
    },
  ],
};

export default examPracticals;
