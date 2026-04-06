const examParticleModel = {
  gas_pressure: [
    {
      type: "fill-steps",
      question: "Complete this explanation: Why does gas pressure increase when temperature rises at constant volume?",
      questionSubtitle: "Fill in the missing words",
      template: [
        { text: "When temperature increases, the particles have greater mean ", blank: "kinetic energy" },
        { text: ". This means they move ", blank: "faster" },
        { text: " and hit the walls of the container more often. The ", blank: "frequency" },
        { text: " of collisions increases. Each collision has a greater ", blank: "force" },
        { text: ". So the pressure (force per unit ", blank: "area", text2: ") increases." }
      ],
      wordBank: ["kinetic energy", "faster", "frequency", "force", "area", "slower", "potential energy", "mass", "volume"],
      tier: 3,
      senNote: "Think about individual particles, not the whole gas"
    },
    {
      type: "fill-steps",
      question: "Complete this explanation: Why does gas pressure decrease when volume increases at constant temperature?",
      questionSubtitle: "Fill in the missing words",
      template: [
        { text: "When the volume increases, the particles have ", blank: "further" },
        { text: " to travel between the walls. The particles hit the walls less ", blank: "often" },
        { text: ". So the ", blank: "frequency" },
        { text: " of collisions decreases. The same total ", blank: "force" },
        { text: " is spread over a larger ", blank: "area", text2: ". So the pressure decreases." }
      ],
      wordBank: ["further", "often", "frequency", "force", "area", "faster", "closer", "energy", "temperature"],
      tier: 3,
      senNote: "More space means particles take longer to reach the walls"
    }
  ],

  internal_energy: [
    {
      type: "fill-steps",
      question: "Complete this explanation: What happens to particles during melting at constant temperature?",
      questionSubtitle: "Fill in the missing words",
      template: [
        { text: "During melting, the temperature stays ", blank: "constant" },
        { text: ". Energy is being supplied but the ", blank: "kinetic energy" },
        { text: " of the particles does not increase. Instead, the energy increases the ", blank: "potential energy" },
        { text: " of the particles. The particles ", blank: "overcome" },
        { text: " some of the forces of ", blank: "attraction", text2: " between them, allowing them to move more freely." }
      ],
      wordBank: ["constant", "kinetic energy", "potential energy", "overcome", "attraction", "increases", "thermal energy", "repulsion", "decreases"],
      tier: 3,
      senNote: "Temperature is constant during a change of state -- energy goes into breaking bonds"
    },
    {
      type: "fill-steps",
      question: "Complete this explanation: Why is specific heat capacity different for different materials?",
      questionSubtitle: "Fill in the missing words",
      template: [
        { text: "Specific heat capacity is the energy needed to raise the temperature of ", blank: "1 kg" },
        { text: " of a substance by ", blank: "1 degree", text2: " Celsius." },
        { text: " Materials with stronger ", blank: "bonds" },
        { text: " between particles need more energy to increase the ", blank: "kinetic energy" },
        { text: " of the particles. So they have a ", blank: "higher", text2: " specific heat capacity." }
      ],
      wordBank: ["1 kg", "1 degree", "bonds", "kinetic energy", "higher", "lower", "10 g", "potential energy", "weaker"],
      tier: 3,
      senNote: "Stronger bonds between particles means more energy is needed per degree"
    }
  ],

  states_density: [
    {
      type: "fill-steps",
      question: "Complete this explanation: Describe the particle arrangement in solid, liquid and gas.",
      questionSubtitle: "Fill in the missing words",
      template: [
        { text: "In a solid, particles are held in fixed positions in a regular ", blank: "pattern" },
        { text: ". They ", blank: "vibrate" },
        { text: " about their fixed positions. In a liquid, particles are close together but can ", blank: "slide" },
        { text: " past each other. In a gas, particles are far ", blank: "apart" },
        { text: " and move in ", blank: "random", text2: " directions at high speed." }
      ],
      wordBank: ["pattern", "vibrate", "slide", "apart", "random", "rotate", "together", "regular", "identical"],
      tier: 3,
      senNote: "Solid = fixed, liquid = close but free, gas = far apart and fast"
    },
    {
      type: "fill-steps",
      question: "Complete this explanation: Why are solids generally denser than liquids?",
      questionSubtitle: "Fill in the missing words",
      template: [
        { text: "In a solid, the particles are packed closely in a ", blank: "regular" },
        { text: " arrangement. There are very small ", blank: "gaps" },
        { text: " between the particles. In a liquid, particles are still close but slightly ", blank: "further" },
        { text: " apart. Since density equals ", blank: "mass" },
        { text: " divided by ", blank: "volume", text2: ", the solid has a higher density because more particles fit in the same space." }
      ],
      wordBank: ["regular", "gaps", "further", "mass", "volume", "closer", "irregular", "weight", "area"],
      tier: 3,
      senNote: "More particles packed into the same space means higher density"
    }
  ],

  energy_stores: [
    {
      type: "fill-steps",
      question: "Complete this explanation: Describe the energy transfers when a ball is thrown upwards.",
      questionSubtitle: "Fill in the missing words",
      template: [
        { text: "When the ball is thrown, it starts with energy in the ", blank: "kinetic" },
        { text: " energy store. As it rises, energy is transferred to the ", blank: "gravitational potential" },
        { text: " energy store. At the highest point, the ball is momentarily ", blank: "stationary" },
        { text: ". As it falls back down, energy is transferred back to the kinetic energy store. Some energy is ", blank: "dissipated" },
        { text: " to the ", blank: "thermal", text2: " energy store of the surroundings due to air resistance." }
      ],
      wordBank: ["kinetic", "gravitational potential", "stationary", "dissipated", "thermal", "elastic", "accelerating", "chemical", "nuclear"],
      tier: 3,
      senNote: "Kinetic goes to gravitational potential on the way up, and back again on the way down"
    },
    {
      type: "fill-steps",
      question: "Complete this explanation: Describe the energy transfers when brakes are applied to a moving car.",
      questionSubtitle: "Fill in the missing words",
      template: [
        { text: "Before braking, the car has energy in its ", blank: "kinetic" },
        { text: " energy store. When the brakes are applied, ", blank: "friction" },
        { text: " acts between the brake pads and the disc. Energy is transferred by ", blank: "heating" },
        { text: " to the ", blank: "thermal" },
        { text: " energy store of the brakes and surroundings. The car ", blank: "decelerates", text2: " and slows down." }
      ],
      wordBank: ["kinetic", "friction", "heating", "thermal", "decelerates", "accelerates", "chemical", "elastic", "gravitational"],
      tier: 3,
      senNote: "Brakes convert kinetic energy into thermal energy through friction"
    }
  ],

  atomic_structure: [
    {
      type: "fill-steps",
      question: "Complete this explanation: Describe what happens during alpha decay.",
      questionSubtitle: "Fill in the missing words",
      template: [
        { text: "In alpha decay, the unstable nucleus emits an ", blank: "alpha" },
        { text: " particle. This consists of ", blank: "2" },
        { text: " protons and 2 ", blank: "neutrons" },
        { text: " (the same as a helium nucleus). The mass number decreases by ", blank: "4" },
        { text: " and the atomic number decreases by ", blank: "2", text2: "." }
      ],
      wordBank: ["alpha", "2", "neutrons", "4", "electrons", "beta", "1", "protons", "3"],
      tier: 3,
      senNote: "Alpha particle = 2 protons + 2 neutrons = helium nucleus"
    },
    {
      type: "fill-steps",
      question: "Complete this explanation: Describe what happens when an electron changes energy level in an atom.",
      questionSubtitle: "Fill in the missing words",
      template: [
        { text: "Electrons orbit the nucleus at specific ", blank: "energy levels" },
        { text: ". When an electron ", blank: "absorbs" },
        { text: " electromagnetic radiation, it moves to a ", blank: "higher" },
        { text: " energy level. When it drops back down, it ", blank: "emits" },
        { text: " electromagnetic radiation of a specific ", blank: "frequency", text2: "." }
      ],
      wordBank: ["energy levels", "absorbs", "higher", "emits", "frequency", "lower", "reflects", "wavelength", "amplitude"],
      tier: 3,
      senNote: "Absorb = go up a level. Emit = drop down a level."
    }
  ],

  wave_types: [
    {
      type: "fill-steps",
      question: "Complete this explanation: Explain the difference between transverse and longitudinal waves.",
      questionSubtitle: "Fill in the missing words",
      template: [
        { text: "In a transverse wave, the oscillations are ", blank: "perpendicular" },
        { text: " to the direction of energy transfer. Examples include light and ", blank: "water" },
        { text: " waves. In a longitudinal wave, the oscillations are ", blank: "parallel" },
        { text: " to the direction of energy transfer. These create regions of ", blank: "compressions" },
        { text: " and ", blank: "rarefactions", text2: "." }
      ],
      wordBank: ["perpendicular", "water", "parallel", "compressions", "rarefactions", "diagonal", "sound", "reflections", "refractions"],
      tier: 3,
      senNote: "Transverse = up and down. Longitudinal = back and forth along the direction."
    },
    {
      type: "fill-steps",
      question: "Complete this explanation: Explain how sound travels through a medium.",
      questionSubtitle: "Fill in the missing words",
      template: [
        { text: "Sound is a ", blank: "longitudinal" },
        { text: " wave. The vibrating source pushes particles ", blank: "closer" },
        { text: " together, creating a region of high pressure called a ", blank: "compression" },
        { text: ". Particles then spread apart, creating a region of low pressure called a ", blank: "rarefaction" },
        { text: ". Energy is transferred from particle to particle, but the particles themselves return to their ", blank: "original", text2: " positions." }
      ],
      wordBank: ["longitudinal", "closer", "compression", "rarefaction", "original", "transverse", "further", "reflection", "new"],
      tier: 3,
      senNote: "Sound needs a medium -- particles pass energy along but don't travel themselves"
    }
  ]
};

export default examParticleModel;
