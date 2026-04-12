// qb-recall-particles.js — AQA P1 Particle Model knowledge recall questions
// Source: AQA teacher-made knowledge question PDFs (particle_model_knowledge_questions/answers)
// 25 questions covering: internal_energy, states_density, specific_latent_heat, gas_pressure

const recallParticlesQuestions = [

  // ── Q1 — internal_energy ──────────────────────────────────────────────────
  {
    id: 'rc_particle_01',
    topicId: 'internal_energy',
    type: 'recall',
    tier: 1,
    marks: 2,
    timeExpected: 30,
    commandWord: 'Explain',
    question: 'Explain what is meant by internal energy.',
    modelAnswer: 'The energy stored inside a system by the particles (atoms and molecules) that make up the system. Internal energy is the total kinetic energy and potential energy of all of the particles that make up the system.',
    senNote: 'Think of internal energy as the sum of ALL the energy stored in every single particle — both their movement energy (kinetic) and their stored energy (potential).',
    boards: ['aqa'],
    course: 'combined',
  },

  // ── Q2 — internal_energy ──────────────────────────────────────────────────
  {
    id: 'rc_particle_02',
    topicId: 'internal_energy',
    type: 'recall',
    tier: 1,
    marks: 1,
    timeExpected: 30,
    commandWord: 'Explain',
    question: 'Explain the effect that heating has on a system.',
    modelAnswer: 'Heating increases the energy of the particles that make up the system. This either raises the temperature of the system or causes a change of state.',
    senNote: 'Heating always does one of two things — it either warms the substance up, or it changes its state (e.g. melts ice). It cannot do nothing.',
    boards: ['aqa'],
    course: 'combined',
  },

  // ── Q3 — internal_energy ──────────────────────────────────────────────────
  {
    id: 'rc_particle_03',
    topicId: 'internal_energy',
    type: 'recall',
    tier: 1,
    marks: 2,
    timeExpected: 30,
    commandWord: 'Describe',
    question: 'Describe the different changes of state that a system can undergo when heated.',
    modelAnswer: 'Melting — from solid to liquid. Boiling — from liquid to gas. Sublimation — from solid to gas.',
    senNote: 'When heated: solid melts → liquid, liquid boils → gas, or solid can go straight to gas (sublimation). Think of the direction as always going "up" — solid → liquid → gas.',
    boards: ['aqa'],
    course: 'combined',
  },

  // ── Q4 — states_density ───────────────────────────────────────────────────
  {
    id: 'rc_particle_04',
    topicId: 'states_density',
    type: 'recall',
    tier: 1,
    marks: 2,
    timeExpected: 30,
    commandWord: 'Describe',
    question: 'Describe the different changes of state that a system can undergo when it cools.',
    modelAnswer: 'Freezing — from liquid to solid. Condensation — from gas to liquid. Deposition — from gas to solid.',
    senNote: 'When cooling: gas condenses → liquid, liquid freezes → solid, or gas can go straight to solid (deposition). The direction is always going "down" — gas → liquid → solid.',
    boards: ['aqa'],
    course: 'combined',
  },

  // ── Q5 — internal_energy ──────────────────────────────────────────────────
  {
    id: 'rc_particle_05',
    topicId: 'internal_energy',
    type: 'recall',
    tier: 1,
    marks: 2,
    timeExpected: 30,
    commandWord: 'Describe',
    question: 'Describe the factors that affect how much the temperature of a substance increases when it is heated.',
    modelAnswer: 'The mass of the substance, the type of material and the energy input to the system.',
    senNote: 'Three factors: how much stuff there is (mass), what it is made of (material/SHC), and how much heat energy you put in. More mass = smaller rise.',
    boards: ['aqa'],
    course: 'combined',
  },

  // ── Q6 — internal_energy ──────────────────────────────────────────────────
  {
    id: 'rc_particle_06',
    topicId: 'internal_energy',
    type: 'recall',
    tier: 1,
    marks: 1,
    timeExpected: 30,
    commandWord: 'Explain',
    question: "Explain what is meant by the 'specific heat capacity' of a substance.",
    modelAnswer: 'The amount of energy required to raise the temperature of one kilogram of the substance by one degree Celsius.',
    senNote: 'Specific heat capacity always refers to exactly 1 kg being heated by exactly 1°C. It tells you how "hard" a substance is to heat up.',
    boards: ['aqa'],
    course: 'combined',
  },

  // ── Q7 — internal_energy ──────────────────────────────────────────────────
  {
    id: 'rc_particle_07',
    topicId: 'internal_energy',
    type: 'recall',
    tier: 1,
    marks: 1,
    timeExpected: 30,
    commandWord: 'Describe',
    question: 'Describe what happens to the internal energy and temperature of a substance when it is changing state.',
    modelAnswer: 'The internal energy increases but the temperature stays the same.',
    senNote: 'During a change of state, energy goes into breaking bonds between particles — not into making them move faster. So temperature stays flat on a heating curve.',
    boards: ['aqa'],
    course: 'combined',
  },

  // ── Q8 — specific_latent_heat ─────────────────────────────────────────────
  {
    id: 'rc_particle_08',
    topicId: 'specific_latent_heat',
    type: 'recall',
    tier: 1,
    marks: 1,
    timeExpected: 30,
    commandWord: 'Explain',
    question: "Explain what is meant by 'latent heat'.",
    modelAnswer: 'The energy needed for a substance to change state.',
    senNote: '"Latent" means hidden — the energy is used to break particle bonds, so you can\'t see it as a temperature rise. It is "hidden" in the state change.',
    boards: ['aqa'],
    course: 'combined',
  },

  // ── Q9 — specific_latent_heat ─────────────────────────────────────────────
  {
    id: 'rc_particle_09',
    topicId: 'specific_latent_heat',
    type: 'recall',
    tier: 1,
    marks: 1,
    timeExpected: 30,
    commandWord: 'Explain',
    question: "Explain what is meant by the 'specific latent heat' of a substance.",
    modelAnswer: 'The amount of energy required to change the state of one kilogram of the substance with no change in temperature.',
    senNote: 'Like specific heat capacity, the "specific" part always means per 1 kg. Specific latent heat is the energy to change state — not to change temperature.',
    boards: ['aqa'],
    course: 'combined',
  },

  // ── Q10 — specific_latent_heat ────────────────────────────────────────────
  {
    id: 'rc_particle_10',
    topicId: 'specific_latent_heat',
    type: 'recall',
    tier: 1,
    marks: 1,
    timeExpected: 30,
    commandWord: 'Explain',
    question: "Explain what is meant by the 'specific latent heat of fusion'.",
    modelAnswer: 'The amount of energy required to change the state of one kilogram of the substance from solid to liquid.',
    senNote: '"Fusion" = melting. Specific latent heat of fusion is always solid → liquid (or liquid → solid when freezing). Remember: fusion = fusing/joining — like liquid coming together when freezing.',
    boards: ['aqa'],
    course: 'combined',
  },

  // ── Q11 — specific_latent_heat ────────────────────────────────────────────
  {
    id: 'rc_particle_11',
    topicId: 'specific_latent_heat',
    type: 'recall',
    tier: 1,
    marks: 1,
    timeExpected: 30,
    commandWord: 'Explain',
    question: "Explain what is meant by the 'specific latent heat of vaporisation'.",
    modelAnswer: 'The amount of energy required to change the state of one kilogram of the substance from liquid to gas.',
    senNote: '"Vaporisation" = turning into vapour/gas. This is always liquid → gas (boiling) or gas → liquid (condensing). It is much larger than latent heat of fusion because you fully separate the particles.',
    boards: ['aqa'],
    course: 'combined',
  },

  // ── Q12 — states_density ──────────────────────────────────────────────────
  {
    id: 'rc_particle_12',
    topicId: 'states_density',
    type: 'recall',
    tier: 1,
    marks: 1,
    timeExpected: 30,
    commandWord: 'Describe',
    question: 'Describe the motion of molecules in a gas.',
    modelAnswer: 'Molecules move in random directions at a range of speeds.',
    senNote: 'Gas particles move completely randomly — no fixed direction and a mixture of speeds. Think of a room full of people all running in different directions.',
    boards: ['aqa'],
    course: 'combined',
  },

  // ── Q13 — states_density ──────────────────────────────────────────────────
  {
    id: 'rc_particle_13',
    topicId: 'states_density',
    type: 'recall',
    tier: 1,
    marks: 1,
    timeExpected: 30,
    commandWord: 'Describe',
    question: 'Describe the arrangement of molecules in a gas.',
    modelAnswer: 'Molecules are far apart.',
    senNote: 'Gas particles are spread far apart — mostly empty space. That is why gases are much less dense than solids or liquids.',
    boards: ['aqa'],
    course: 'combined',
  },

  // ── Q14 — states_density ──────────────────────────────────────────────────
  {
    id: 'rc_particle_14',
    topicId: 'states_density',
    type: 'recall',
    tier: 1,
    marks: 1,
    timeExpected: 30,
    commandWord: 'Describe',
    question: 'Describe the motion of molecules in a liquid.',
    modelAnswer: 'Molecules move around each other.',
    senNote: 'Liquid particles are free to move but stay close together — like people in a crowd shuffling past each other.',
    boards: ['aqa'],
    course: 'combined',
  },

  // ── Q15 — states_density ──────────────────────────────────────────────────
  {
    id: 'rc_particle_15',
    topicId: 'states_density',
    type: 'recall',
    tier: 1,
    marks: 1,
    timeExpected: 30,
    commandWord: 'Describe',
    question: 'Describe the arrangement of molecules in a liquid.',
    modelAnswer: 'Molecules are close together, randomly arranged.',
    senNote: 'Liquid particles are packed close (like a solid) but with no fixed pattern — randomly jumbled rather than in neat rows.',
    boards: ['aqa'],
    course: 'combined',
  },

  // ── Q16 — states_density ──────────────────────────────────────────────────
  {
    id: 'rc_particle_16',
    topicId: 'states_density',
    type: 'recall',
    tier: 1,
    marks: 1,
    timeExpected: 30,
    commandWord: 'Describe',
    question: 'Describe the motion of molecules in a solid.',
    modelAnswer: 'Molecules vibrate in a fixed position.',
    senNote: 'Solid particles cannot move around — they are locked in place but constantly wobbling (vibrating). Think of a crowd of people standing still but shaking on the spot.',
    boards: ['aqa'],
    course: 'combined',
  },

  // ── Q17 — states_density ──────────────────────────────────────────────────
  {
    id: 'rc_particle_17',
    topicId: 'states_density',
    type: 'recall',
    tier: 1,
    marks: 1,
    timeExpected: 30,
    commandWord: 'Describe',
    question: 'Describe the arrangement of molecules in a solid.',
    modelAnswer: 'Molecules are in a regular pattern.',
    senNote: 'Solid particles are arranged in a neat, repeating grid — like eggs in an egg box. This regular pattern is what makes solids hold their shape.',
    boards: ['aqa'],
    course: 'combined',
  },

  // ── Q18 — gas_pressure ────────────────────────────────────────────────────
  {
    id: 'rc_particle_18',
    topicId: 'gas_pressure',
    type: 'recall',
    tier: 1,
    marks: 1,
    timeExpected: 30,
    commandWord: 'Describe',
    question: 'Describe what happens to the energy of the molecules in a gas if the temperature of the gas is increased.',
    modelAnswer: 'The kinetic energy of the molecules increases.',
    senNote: 'Higher temperature = faster-moving particles = more kinetic energy. Temperature is a measure of average kinetic energy of particles.',
    boards: ['aqa'],
    course: 'combined',
  },

  // ── Q19 — gas_pressure ────────────────────────────────────────────────────
  {
    id: 'rc_particle_19',
    topicId: 'gas_pressure',
    type: 'recall',
    tier: 1,
    marks: 1,
    timeExpected: 30,
    commandWord: 'Describe',
    question: 'Describe the relationship between the temperature of a gas and the pressure exerted by the gas, if it is held at a constant volume.',
    modelAnswer: 'If the temperature of the gas increases, the pressure exerted increases.',
    senNote: 'At constant volume: temperature up → pressure up. They increase together (directly proportional when measured in kelvin). Think of a sealed can heating up.',
    boards: ['aqa'],
    course: 'combined',
  },

  // ── Q20 — states_density ──────────────────────────────────────────────────
  {
    id: 'rc_particle_20',
    topicId: 'states_density',
    type: 'recall',
    tier: 1,
    marks: 1,
    timeExpected: 30,
    commandWord: 'Explain',
    question: 'Explain why gases and solids have different densities, with reference to the molecules in the substances.',
    modelAnswer: 'Gases are less dense than solids because the molecules are spaced further apart.',
    senNote: 'Density = mass ÷ volume. Gas particles are far apart so they take up much more space (volume) for the same mass — making density low.',
    boards: ['aqa'],
    course: 'combined',
  },

  // ── Q21 — states_density ──────────────────────────────────────────────────
  {
    id: 'rc_particle_21',
    topicId: 'states_density',
    type: 'recall',
    tier: 1,
    marks: 1,
    timeExpected: 30,
    commandWord: 'Explain',
    question: 'Explain why the mass of a substance does not change when it changes state.',
    modelAnswer: 'The number of molecules in the substance does not change.',
    senNote: 'Changing state just rearranges the same particles — no particles are added or lost, so the total mass stays the same.',
    boards: ['aqa'],
    course: 'combined',
  },

  // ── Q22 — gas_pressure ────────────────────────────────────────────────────
  {
    id: 'rc_particle_22',
    topicId: 'gas_pressure',
    type: 'recall',
    tier: 1,
    marks: 2,
    timeExpected: 30,
    commandWord: 'Explain',
    question: 'Explain the difference between specific heat capacity and specific latent heat.',
    modelAnswer: 'Specific heat capacity is the energy required to increase the temperature of 1 kg of a substance by 1°C; specific latent heat is the energy required to change the state of 1 kg of a substance.',
    senNote: 'SHC = temperature change (thermometer goes up). SLH = state change (no temperature change, just a change from solid/liquid/gas). Both are per 1 kg.',
    boards: ['aqa'],
    course: 'combined',
  },

  // ── Q23 — gas_pressure ────────────────────────────────────────────────────
  {
    id: 'rc_particle_23',
    topicId: 'gas_pressure',
    type: 'recall',
    tier: 1,
    marks: 1,
    timeExpected: 30,
    commandWord: 'Explain',
    question: 'Explain why a gas exerts pressure on its container.',
    modelAnswer: 'The molecules of the gas collide with the walls of the container, exerting an outward force at a right angle to the wall of the container.',
    senNote: 'Pressure from a gas is caused by billions of tiny collisions — each particle hits the wall and bounces back, pushing outward. More collisions = more pressure.',
    boards: ['aqa'],
    course: 'combined',
  },

  // ── Q24 — gas_pressure ────────────────────────────────────────────────────
  {
    id: 'rc_particle_24',
    topicId: 'gas_pressure',
    type: 'recall',
    tier: 1,
    marks: 2,
    timeExpected: 30,
    commandWord: 'Explain',
    question: 'Explain why the pressure of a fixed volume of gas increases as its temperature increases.',
    modelAnswer: 'As the temperature increases, the kinetic energy of the molecules increases. This means they move faster, so collide more often with the walls of the container. This increases the force on the walls of the container, increasing the pressure.',
    senNote: 'Chain: temperature up → particles faster → more frequent collisions with walls → greater force → higher pressure. Follow this chain step by step.',
    boards: ['aqa'],
    course: 'combined',
  },

  // ── Q25 — gas_pressure ────────────────────────────────────────────────────
  {
    id: 'rc_particle_25',
    topicId: 'gas_pressure',
    type: 'recall',
    tier: 1,
    marks: 2,
    timeExpected: 30,
    commandWord: 'Explain',
    question: 'Explain why compressing a gas, e.g. in a bicycle pump, leads to an increase in temperature of the gas.',
    modelAnswer: 'A force is exerted on the gas, which transfers energy to the gas. This increases the internal energy of the gas.',
    senNote: 'Work is done on the gas when you compress it. That energy goes into the gas particles, increasing their kinetic energy — which means higher temperature.',
    boards: ['aqa'],
    course: 'combined',
  },

]

export default recallParticlesQuestions
