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
};

export default examPracticals;
