const examParticleModel = {

  // ===== Energy Pathways =====
  energy_pathways: [
    {
      type: "fill-steps",
      question: "Complete this explanation: What happens to wasted energy in any transfer process?",
      questionSubtitle: "Fill in the missing words",
      template: [
        { text: "In any energy transfer, the total energy is always ", blank: "conserved" },
        { text: ". Wasted energy is usually transferred to the ", blank: "thermal" },
        { text: " store of the surroundings. This causes the surroundings to ", blank: "warm up" },
        { text: ". The energy is not destroyed — it is just ", blank: "dissipated" },
        { text: " and becomes very spread out. It is difficult to use this energy for anything ", blank: "useful", text2: "." }
      ],
      wordBank: ["conserved", "thermal", "warm up", "dissipated", "useful", "created", "electrical", "cool down", "stored"],
      tier: 2,
      senNote: "Energy is never created or destroyed — it is just transferred to less useful stores."
    },
    {
      type: "fill-steps",
      question: "Complete this explanation: How does a Sankey diagram represent energy transfers?",
      questionSubtitle: "Fill in the missing words",
      template: [
        { text: "A Sankey diagram shows energy transfers using arrows. The ", blank: "width" },
        { text: " of each arrow represents the ", blank: "amount" },
        { text: " of energy. The input arrow enters from the ", blank: "left" },
        { text: ". The useful output arrow points to the ", blank: "right" },
        { text: ". Wasted energy arrows point ", blank: "downward", text2: ", showing energy lost to the surroundings." }
      ],
      wordBank: ["width", "amount", "left", "right", "downward", "upward", "colour", "direction", "temperature"],
      tier: 2,
      senNote: "Wider arrow = more energy. In a Sankey diagram all arrows must add up to the total input."
    },
  ],

  // ===== Radioactive Decay =====
  radioactive_decay: [
    {
      type: "fill-steps",
      question: "Complete this comparison of alpha, beta and gamma radiation properties.",
      questionSubtitle: "Fill in the missing words",
      template: [
        { text: "Alpha radiation consists of ", blank: "2 protons and 2 neutrons" },
        { text: " (a helium nucleus). It has a charge of ", blank: "+2" },
        { text: " and is stopped by ", blank: "paper or skin" },
        { text: ". Beta radiation is a high-speed ", blank: "electron" },
        { text: " emitted from the nucleus. It is stopped by thin ", blank: "aluminium" },
        { text: ". Gamma radiation is an electromagnetic ", blank: "wave", text2: " and requires thick lead or concrete to be absorbed." }
      ],
      wordBank: ["2 protons and 2 neutrons", "+2", "paper or skin", "electron", "aluminium", "wave", "4 protons", "−1", "neutron", "glass", "lead"],
      tier: 2,
      senNote: "A-B-G: Alpha (paper), Beta (aluminium), Gamma (lead). More penetrating = less ionising."
    },
    {
      type: "fill-steps",
      question: "Complete this explanation of what happens to the nucleus during alpha decay.",
      questionSubtitle: "Fill in the missing words",
      template: [
        { text: "During alpha decay, an alpha particle is emitted. An alpha particle contains ", blank: "2" },
        { text: " protons and ", blank: "2" },
        { text: " neutrons. The mass number of the nucleus ", blank: "decreases by 4" },
        { text: ". The atomic number ", blank: "decreases by 2" },
        { text: ". The nucleus of a different element is formed because the number of ", blank: "protons", text2: " has changed." }
      ],
      wordBank: ["2", "4", "decreases by 4", "decreases by 2", "protons", "increases by 2", "stays the same", "neutrons", "electrons"],
      tier: 2,
      senNote: "Alpha decay: mass number −4, atomic number −2. Emitting an alpha particle is like losing a helium-4 nucleus."
    },
  ],

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

  specific_latent_heat: [
    {
      type: "fill-steps",
      question: "Complete this explanation: Why does temperature stay constant during a change of state?",
      questionSubtitle: "Fill in the missing words",
      template: [
        { text: "During a change of state, energy is supplied but the temperature stays ", blank: "constant" },
        { text: ". This is because the energy is used to break the ", blank: "bonds" },
        { text: " between particles rather than increasing their ", blank: "kinetic energy" },
        { text: ". Since temperature is a measure of mean ", blank: "kinetic energy" },
        { text: ", it does not ", blank: "rise", text2: " while the state is changing." }
      ],
      wordBank: ["constant", "bonds", "kinetic energy", "rise", "potential energy", "fall", "temperature", "speed", "mass"],
      tier: 3,
      senNote: "Energy breaks bonds, not raises temperature. That's why the graph is flat during state change."
    },
    {
      type: "fill-steps",
      question: "Complete this explanation: Why is the specific latent heat of vaporisation greater than fusion?",
      questionSubtitle: "Fill in the missing words",
      template: [
        { text: "During fusion (melting), particles only need to ", blank: "partially" },
        { text: " overcome the forces of attraction to become a liquid. During vaporisation, particles must be completely ", blank: "separated" },
        { text: " from each other. The particles in a gas are ", blank: "far" },
        { text: " apart, so much more energy is needed to overcome the ", blank: "intermolecular" },
        { text: " forces. This means L_vaporisation is much ", blank: "greater", text2: " than L_fusion." }
      ],
      wordBank: ["partially", "separated", "far", "intermolecular", "greater", "fully", "closer", "smaller", "atomic"],
      tier: 3,
      senNote: "Gas particles are completely separated — far more energy needed than for melting."
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

  radiation_hazards: [
    {
      type: "fill-steps",
      question: "Complete this explanation: How does ionising radiation damage living cells?",
      questionSubtitle: "Fill in the missing words",
      template: [
        { text: "Ionising radiation carries enough energy to ", blank: "ionise" },
        { text: " atoms in living cells. This can break ", blank: "chemical bonds" },
        { text: " in molecules such as DNA. Damage to DNA can cause ", blank: "mutations" },
        { text: " in the genetic code. This may lead to ", blank: "cancer" },
        { text: ". At very high doses, radiation can kill cells directly, causing ", blank: "radiation sickness", text2: "." }
      ],
      wordBank: ["ionise", "chemical bonds", "mutations", "cancer", "radiation sickness", "excite", "hydrogen bonds", "duplications", "infection", "sunburn"],
      tier: 3,
      senNote: "Ionising radiation → breaks DNA bonds → mutations → cancer or cell death."
    }
  ],

  nuclear_fission: [
    {
      type: "fill-steps",
      question: "Complete this explanation: Describe the chain reaction in nuclear fission.",
      questionSubtitle: "Fill in the missing words",
      template: [
        { text: "A slow-moving ", blank: "neutron" },
        { text: " is absorbed by a uranium-235 or plutonium-239 nucleus. The nucleus becomes unstable and ", blank: "splits" },
        { text: " into two smaller nuclei (fission fragments). This releases energy and ", blank: "2 or 3" },
        { text: " more neutrons. These neutrons can be absorbed by other ", blank: "fuel" },
        { text: " nuclei, causing further fission events. This is called a ", blank: "chain reaction", text2: "." }
      ],
      wordBank: ["neutron", "splits", "2 or 3", "fuel", "chain reaction", "proton", "joins", "1", "waste", "single event"],
      tier: 3,
      senNote: "One fission releases neutrons → these cause more fissions → chain reaction."
    }
  ],

  nuclear_fusion: [
    {
      type: "fill-steps",
      question: "Complete this explanation: Why is nuclear fusion difficult to achieve on Earth?",
      questionSubtitle: "Fill in the missing words",
      template: [
        { text: "In nuclear fusion, two light nuclei (usually isotopes of ", blank: "hydrogen" },
        { text: ") are forced together to form a heavier nucleus. This releases a large amount of ", blank: "energy" },
        { text: ". However, nuclei are positively charged and repel each other due to the ", blank: "electrostatic force" },
        { text: ". To overcome this repulsion, the nuclei must be given very high ", blank: "kinetic energy" },
        { text: ", which requires temperatures of millions of degrees. Containing a plasma at such temperatures is extremely ", blank: "difficult", text2: "." }
      ],
      wordBank: ["hydrogen", "energy", "electrostatic force", "kinetic energy", "difficult", "oxygen", "mass", "gravitational force", "potential energy", "simple"],
      tier: 3,
      senNote: "Fusion needs extreme temperatures to give nuclei enough energy to overcome electrostatic repulsion."
    }
  ],

  atomic_model_history: [
    {
      type: "fill-steps",
      question: "Complete this explanation: Describe how the model of the atom changed from plum pudding to the nuclear model.",
      questionSubtitle: "Fill in the missing words",
      template: [
        { text: "Thomson's plum pudding model described the atom as a ball of positive charge with ", blank: "electrons" },
        { text: " embedded throughout it. Rutherford fired ", blank: "alpha" },
        { text: " particles at thin gold foil. Most passed straight through but some were ", blank: "deflected" },
        { text: " through large angles and a few bounced back. This showed the positive charge was concentrated in a tiny, dense ", blank: "nucleus" },
        { text: ". Later, Bohr proposed that electrons orbit the nucleus in ", blank: "energy levels", text2: "." }
      ],
      wordBank: ["electrons", "alpha", "deflected", "nucleus", "energy levels", "protons", "beta", "attracted", "cloud", "shells"],
      tier: 3,
      senNote: "Rutherford's gold foil experiment showed most of the atom is empty space with a tiny dense nucleus."
    },
    {
      type: "fill-steps",
      question: "Complete this explanation: What did the alpha particle scattering experiment tell scientists?",
      questionSubtitle: "Fill in the missing words",
      template: [
        { text: "Most alpha particles passed through the gold foil without deflection. This showed the atom is mostly ", blank: "empty space" },
        { text: ". A small number of alpha particles were deflected through large angles. This showed the nucleus is ", blank: "positively charged" },
        { text: " and very ", blank: "small" },
        { text: " compared to the atom. Some alpha particles bounced almost straight back. This showed the nucleus is very ", blank: "dense", text2: "." }
      ],
      wordBank: ["empty space", "positively charged", "small", "dense", "full", "negatively charged", "large", "hollow"],
      tier: 3,
      senNote: "Most through = mostly empty. Large deflections = tiny positive nucleus. Some bounce back = dense nucleus."
    }
  ],

  half_life: [
    {
      type: "fill-steps",
      question: "Complete this explanation: What does the term half-life mean?",
      questionSubtitle: "Fill in the missing words",
      template: [
        { text: "The half-life of a radioactive isotope is the time taken for the number of ", blank: "undecayed nuclei" },
        { text: " to fall to half its original value. After one half-life, the count rate falls to ", blank: "half" },
        { text: " of the original. After two half-lives it falls to ", blank: "one quarter" },
        { text: ". The half-life is a fixed property of the isotope and cannot be changed by ", blank: "temperature" },
        { text: " or chemical reaction. Radioactive decay is a ", blank: "random", text2: " process." }
      ],
      wordBank: ["undecayed nuclei", "half", "one quarter", "temperature", "random", "decayed nuclei", "double", "one third", "pressure", "predictable"],
      tier: 2,
      senNote: "Half-life = time for half the nuclei to decay. Fixed for each isotope. Cannot be changed."
    }
  ],

  nuclear_equations: [
    {
      type: "fill-steps",
      question: "Complete this explanation: How do you balance a nuclear equation for alpha decay?",
      questionSubtitle: "Fill in the missing words",
      template: [
        { text: "In a nuclear equation, both the mass number (top) and the atomic number (bottom) must be ", blank: "conserved" },
        { text: ". An alpha particle has mass number ", blank: "4" },
        { text: " and atomic number ", blank: "2" },
        { text: ". In alpha decay, the mass number of the parent nucleus decreases by ", blank: "4" },
        { text: " and the atomic number decreases by ", blank: "2", text2: ". The remaining nucleus is a different element." }
      ],
      wordBank: ["conserved", "4", "2", "1", "0", "changed", "3", "doubled"],
      tier: 3,
      senNote: "Alpha decay: mass number −4, atomic number −2. Check both sides balance."
    },
    {
      type: "fill-steps",
      question: "Complete this explanation: How do you balance a nuclear equation for beta decay?",
      questionSubtitle: "Fill in the missing words",
      template: [
        { text: "In beta-minus decay, a ", blank: "neutron" },
        { text: " in the nucleus changes into a proton and an electron (beta particle). The mass number stays the ", blank: "same" },
        { text: " because the total number of nucleons does not change. The atomic number ", blank: "increases by 1" },
        { text: " because there is now one more proton. A beta particle has mass number ", blank: "0" },
        { text: " and atomic number ", blank: "-1", text2: "." }
      ],
      wordBank: ["neutron", "same", "increases by 1", "0", "-1", "proton", "changes", "decreases by 1", "4", "1"],
      tier: 3,
      senNote: "Beta decay: mass number unchanged, atomic number +1. A neutron becomes a proton."
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
  ],

  // ───── PRIORITY 3: DEEPER CONTENT ─────────────────────────────────────

  energy_resources: [
    {
      type: "fill-steps",
      question: "Complete this explanation: Compare the advantages and disadvantages of wind energy versus fossil fuels.",
      questionSubtitle: "Fill in the missing words — 6-mark style",
      template: [
        { text: "Wind turbines are a ", blank: "renewable" },
        { text: " energy source — they do not use up natural resources. They produce no ", blank: "carbon dioxide" },
        { text: " when generating electricity, so they do not contribute to ", blank: "climate change" },
        { text: ". However, they only generate electricity when the wind ", blank: "blows" },
        { text: ". Fossil fuels are ", blank: "reliable" },
        { text: " — they can generate electricity on demand, but they release ", blank: "greenhouse gases", text2: " and are finite." }
      ],
      wordBank: ["renewable", "carbon dioxide", "climate change", "blows", "reliable", "greenhouse gases", "non-renewable", "oxygen", "global cooling", "stops", "unreliable", "clean gases"],
      tier: 3,
      senNote: "Evaluate both sides: advantages AND disadvantages for each source."
    },
    {
      type: "fill-steps",
      question: "Complete this explanation: Why is nuclear power considered a low-carbon energy source, and what are its main drawbacks?",
      questionSubtitle: "Fill in the missing words",
      template: [
        { text: "Nuclear power stations produce electricity by using the heat from ", blank: "fission" },
        { text: " to drive turbines. They produce very little ", blank: "carbon dioxide" },
        { text: " during operation, so they do not contribute greatly to ", blank: "global warming" },
        { text: ". However, they produce ", blank: "radioactive waste" },
        { text: " which remains hazardous for thousands of years and is difficult to ", blank: "store safely", text2: ". Building nuclear stations is also very expensive." }
      ],
      wordBank: ["fission", "carbon dioxide", "global warming", "radioactive waste", "store safely", "fusion", "oxygen", "cooling", "clean waste", "dispose cheaply"],
      tier: 3,
      senNote: "Nuclear: low CO₂ but produces long-lived radioactive waste. Expensive to build and decommission."
    },
    {
      type: "fill-steps",
      question: "Complete this explanation: Evaluate solar panels as an energy resource for the UK.",
      questionSubtitle: "Fill in the missing words — consider reliability and environmental impact",
      template: [
        { text: "Solar panels convert light energy into electrical energy using the ", blank: "photovoltaic" },
        { text: " effect. They produce no ", blank: "pollution" },
        { text: " during operation and use a ", blank: "renewable" },
        { text: " energy source — sunlight. However, in the UK, solar panels are less effective in ", blank: "winter" },
        { text: " when days are shorter and cloudier. They cannot generate electricity at ", blank: "night" },
        { text: ", so energy storage (e.g. batteries) is needed to make them fully ", blank: "reliable", text2: "." }
      ],
      wordBank: ["photovoltaic", "pollution", "renewable", "winter", "night", "reliable", "thermoelectric", "radiation", "non-renewable", "summer", "midday", "unreliable"],
      tier: 3,
      senNote: "Always discuss reliability, environmental impact, cost, and suitability for the UK climate."
    }
  ],

  em_spectrum: [
    {
      type: "fill-steps",
      question: "Complete this explanation: Describe the uses and hazards of X-rays and gamma rays.",
      questionSubtitle: "Fill in the missing words — ionising radiation",
      template: [
        { text: "X-rays and gamma rays are both ", blank: "ionising" },
        { text: " forms of radiation — they carry enough energy to remove electrons from atoms. X-rays are used in medical ", blank: "imaging" },
        { text: " and to treat ", blank: "cancer" },
        { text: ". Gamma rays are used in ", blank: "radiotherapy" },
        { text: " to destroy tumour cells. Both can damage ", blank: "DNA" },
        { text: " in cells, which can cause ", blank: "mutations", text2: " and increase cancer risk." }
      ],
      wordBank: ["ionising", "imaging", "cancer", "radiotherapy", "DNA", "mutations", "non-ionising", "bones", "infections", "chemotherapy", "RNA", "duplications"],
      tier: 3,
      senNote: "X-rays and gamma = ionising = can damage DNA. Used carefully in medicine but handled with shielding."
    },
    {
      type: "fill-steps",
      question: "Complete this explanation: Describe the uses and hazards of ultraviolet radiation.",
      questionSubtitle: "Fill in the missing words",
      template: [
        { text: "Ultraviolet (UV) radiation has a shorter wavelength than ", blank: "visible light" },
        { text: " and higher ", blank: "frequency" },
        { text: ". UV causes ", blank: "fluorescence" },
        { text: " in some materials and is used in security pens and ", blank: "banknote" },
        { text: " detection. It is also used in ", blank: "sun beds" },
        { text: ". However, UV can damage ", blank: "skin cells" },
        { text: " and increase the risk of ", blank: "skin cancer", text2: "." }
      ],
      wordBank: ["visible light", "frequency", "fluorescence", "banknote", "sun beds", "skin cells", "skin cancer", "infrared", "amplitude", "reflection", "passport", "hospitals", "bone cells", "tooth decay"],
      tier: 3,
      senNote: "UV: uses include fluorescence and banknote detection. Hazards: skin damage and skin cancer."
    },
    {
      type: "fill-steps",
      question: "Complete this explanation: Describe how microwaves and infrared radiation are used and any hazards.",
      questionSubtitle: "Fill in the missing words",
      template: [
        { text: "Microwaves are used in ", blank: "communications" },
        { text: " (e.g. mobile phones, satellites) and in ", blank: "cooking" },
        { text: ". Microwaves can cause ", blank: "internal heating" },
        { text: " of body tissue if absorbed. Infrared (IR) radiation is emitted by all objects above ", blank: "absolute zero" },
        { text: " and is used in ", blank: "thermal imaging" },
        { text: " and TV remote controls. IR can cause ", blank: "skin burns", text2: " at high intensities." }
      ],
      wordBank: ["communications", "cooking", "internal heating", "absolute zero", "thermal imaging", "skin burns", "X-ray imaging", "lighting", "external cooling", "0 K", "MRI scanning", "eye damage"],
      tier: 3,
      senNote: "Microwaves: comms + cooking, heats tissue. IR: all objects emit it, used in thermal cameras, can burn skin."
    }
  ]
};

export default examParticleModel;
