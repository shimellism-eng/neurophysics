// qb-recall-atomic.js — AQA P1 Atomic Structure knowledge recall questions
// Source: AQA teacher-made knowledge question PDFs (atomic_structure_knowledge_questions/answers)
// 34 questions covering: atomic_structure, atomic_model_history, radioactive_decay,
//                        radiation_hazards, nuclear_fission (physics_only), nuclear_fusion (physics_only)

const recallAtomicQuestions = [

  // ── Q1 — atomic_structure ─────────────────────────────────────────────────
  {
    id: 'rc_atomic_01',
    topicId: 'atomic_structure',
    type: 'recall',
    tier: 1,
    marks: 1,
    timeExpected: 30,
    commandWord: 'Describe',
    question: 'Describe the basic structure of an atom.',
    modelAnswer: 'A positively charged nucleus containing protons and neutrons surrounded by negatively charged electrons.',
    senNote: 'Picture a tiny, dense, positive centre (nucleus) with negative electrons orbiting around it — like planets around the Sun but much smaller.',
    boards: ['aqa'],
    course: 'combined',
  },

  // ── Q2 — atomic_structure ─────────────────────────────────────────────────
  {
    id: 'rc_atomic_02',
    topicId: 'atomic_structure',
    type: 'recall',
    tier: 1,
    marks: 2,
    timeExpected: 30,
    commandWord: 'Describe',
    question: 'Compare the size of an atom to the size of its nucleus.',
    modelAnswer: 'The nucleus is much smaller than the atom, with a radius less than 1/10,000 the radius of an atom. Most of the mass of the atom is concentrated in the nucleus.',
    senNote: 'If an atom were the size of a football stadium, the nucleus would be a tiny pea in the centre. Almost all the mass is in that tiny pea.',
    boards: ['aqa'],
    course: 'combined',
  },

  // ── Q3 — atomic_structure ─────────────────────────────────────────────────
  {
    id: 'rc_atomic_03',
    topicId: 'atomic_structure',
    type: 'recall',
    tier: 1,
    marks: 1,
    timeExpected: 30,
    commandWord: 'Describe',
    question: 'Describe the arrangement of electrons in an atom.',
    modelAnswer: 'Electrons are arranged at different distances from the nucleus (different energy levels).',
    senNote: 'Electrons sit in "shells" or energy levels at set distances from the nucleus — like rungs on a ladder, not a random spread.',
    boards: ['aqa'],
    course: 'combined',
  },

  // ── Q4 — atomic_structure ─────────────────────────────────────────────────
  {
    id: 'rc_atomic_04',
    topicId: 'atomic_structure',
    type: 'recall',
    tier: 1,
    marks: 2,
    timeExpected: 30,
    commandWord: 'Explain',
    question: 'Explain how the arrangement of electrons in an atom may change.',
    modelAnswer: 'Electrons may absorb electromagnetic radiation and move to a higher energy level, or emit electromagnetic radiation and move to a lower energy level.',
    senNote: 'Electrons can jump up (absorb energy) or fall down (emit energy) between energy levels. Each jump involves one packet of electromagnetic radiation.',
    boards: ['aqa'],
    course: 'combined',
  },

  // ── Q5 — atomic_structure ─────────────────────────────────────────────────
  {
    id: 'rc_atomic_05',
    topicId: 'atomic_structure',
    type: 'recall',
    tier: 1,
    marks: 1,
    timeExpected: 30,
    commandWord: 'Explain',
    question: "Explain what is meant by the 'atomic number' of an atom.",
    modelAnswer: 'The number of protons in an atom. All atoms of a particular element have the same atomic number.',
    senNote: 'The atomic number = number of protons. It identifies the element — change the atomic number and you change the element entirely.',
    boards: ['aqa'],
    course: 'combined',
  },

  // ── Q6 — atomic_structure ─────────────────────────────────────────────────
  {
    id: 'rc_atomic_06',
    topicId: 'atomic_structure',
    type: 'recall',
    tier: 1,
    marks: 1,
    timeExpected: 30,
    commandWord: 'Explain',
    question: "Explain what is meant by the 'mass number' of an atom.",
    modelAnswer: 'The total number of protons and neutrons in an atom.',
    senNote: 'Mass number = protons + neutrons. Electrons are so light they are ignored. To find the number of neutrons: mass number − atomic number.',
    boards: ['aqa'],
    course: 'combined',
  },

  // ── Q7 — atomic_structure ─────────────────────────────────────────────────
  {
    id: 'rc_atomic_07',
    topicId: 'atomic_structure',
    type: 'recall',
    tier: 1,
    marks: 1,
    timeExpected: 30,
    commandWord: 'Explain',
    question: "Explain what is meant by an 'isotope'.",
    modelAnswer: 'Isotopes are atoms of the same element but which have different numbers of neutrons.',
    senNote: 'Isotopes are siblings — same element (same protons), but different numbers of neutrons. Carbon-12 and Carbon-14 are both carbon, just different isotopes.',
    boards: ['aqa'],
    course: 'combined',
  },

  // ── Q8 — atomic_structure ─────────────────────────────────────────────────
  {
    id: 'rc_atomic_08',
    topicId: 'atomic_structure',
    type: 'recall',
    tier: 1,
    marks: 1,
    timeExpected: 30,
    commandWord: 'Explain',
    question: "Explain what is meant by a 'positive ion'.",
    modelAnswer: 'An atom which has lost one or more electrons.',
    senNote: 'A positive ion has more protons than electrons. It lost electrons, so the positive protons "win" — giving it an overall positive charge.',
    boards: ['aqa'],
    course: 'combined',
  },

  // ── Q9 — atomic_model_history ─────────────────────────────────────────────
  {
    id: 'rc_atomic_09',
    topicId: 'atomic_model_history',
    type: 'recall',
    tier: 1,
    marks: 1,
    timeExpected: 30,
    commandWord: 'Explain',
    question: 'Explain what is meant by a scientific model.',
    modelAnswer: 'A model is a representation (conceptual or mathematical) of an idea, an object or a system.',
    senNote: 'A model is never the "real thing" — it is a simplified picture or description to help us understand something too small or complex to observe directly.',
    boards: ['aqa'],
    course: 'combined',
  },

  // ── Q10 — atomic_model_history ────────────────────────────────────────────
  {
    id: 'rc_atomic_10',
    topicId: 'atomic_model_history',
    type: 'recall',
    tier: 1,
    marks: 1,
    timeExpected: 30,
    commandWord: 'Explain',
    question: 'Explain why a scientific model may be changed or replaced.',
    modelAnswer: 'New experimental evidence proves the old model to be incorrect.',
    senNote: 'Science changes when experiments produce results that the old model cannot explain. The Rutherford scattering experiment replaced the plum pudding model this way.',
    boards: ['aqa'],
    course: 'combined',
  },

  // ── Q11 — atomic_model_history ────────────────────────────────────────────
  {
    id: 'rc_atomic_11',
    topicId: 'atomic_model_history',
    type: 'recall',
    tier: 1,
    marks: 1,
    timeExpected: 30,
    commandWord: 'Describe',
    question: "Describe the 'plum pudding' model of the atom.",
    modelAnswer: 'The atom is a ball of positive charge with negative electrons embedded inside.',
    senNote: 'Picture a round Christmas pudding (positive dough) with raisins (negative electrons) dotted through it. There was no nucleus in this model.',
    boards: ['aqa'],
    course: 'combined',
  },

  // ── Q12 — radioactive_decay ───────────────────────────────────────────────
  {
    id: 'rc_atomic_12',
    topicId: 'radioactive_decay',
    type: 'recall',
    tier: 1,
    marks: 1,
    timeExpected: 30,
    commandWord: 'Explain',
    question: 'Explain what happens to an unstable nucleus.',
    modelAnswer: 'An unstable nucleus gives out radiation as it changes to become more stable. This is a random process called radioactive decay.',
    senNote: 'Unstable nuclei want to become stable — they do this by releasing radiation (alpha, beta or gamma). The decay is random: you cannot predict when any one nucleus will decay.',
    boards: ['aqa'],
    course: 'combined',
  },

  // ── Q13 — radioactive_decay ───────────────────────────────────────────────
  {
    id: 'rc_atomic_13',
    topicId: 'radioactive_decay',
    type: 'recall',
    tier: 1,
    marks: 1,
    timeExpected: 30,
    commandWord: 'Explain',
    question: "Explain what is meant by the 'activity' of a radioactive source.",
    modelAnswer: 'The rate at which a source decays. Activity is measured in becquerel (Bq).',
    senNote: 'Activity tells you how many nuclei are decaying per second. 1 becquerel (Bq) = 1 decay per second. Higher activity = more radiation being emitted.',
    boards: ['aqa'],
    course: 'combined',
  },

  // ── Q14 — radioactive_decay ───────────────────────────────────────────────
  {
    id: 'rc_atomic_14',
    topicId: 'radioactive_decay',
    type: 'recall',
    tier: 1,
    marks: 1,
    timeExpected: 30,
    commandWord: 'State',
    question: 'State the different types of nuclear radiation.',
    modelAnswer: 'Alpha particles, beta particles, gamma rays and neutrons.',
    senNote: 'Four types: alpha (α), beta (β), gamma (γ), and neutrons. Remember A-B-G-N or use the mnemonic: "All Boys Go Now".',
    boards: ['aqa'],
    course: 'combined',
  },

  // ── Q15 — radioactive_decay ───────────────────────────────────────────────
  {
    id: 'rc_atomic_15',
    topicId: 'radioactive_decay',
    type: 'recall',
    tier: 1,
    marks: 2,
    timeExpected: 30,
    commandWord: 'Describe',
    question: 'Describe the structure of the different types of nuclear radiation.',
    modelAnswer: 'Alpha — two protons and two neutrons (a helium nucleus). Beta — a high speed electron. Gamma — electromagnetic radiation. Neutron — a single neutron.',
    senNote: 'Alpha = helium nucleus (2p + 2n). Beta = fast electron. Gamma = electromagnetic wave (no mass, no charge). Neutron = just a neutron. Learn the structure of each.',
    boards: ['aqa'],
    course: 'combined',
  },

  // ── Q16 — radiation_hazards ───────────────────────────────────────────────
  {
    id: 'rc_atomic_16',
    topicId: 'radiation_hazards',
    type: 'recall',
    tier: 1,
    marks: 2,
    timeExpected: 30,
    commandWord: 'Explain',
    question: 'Explain what happens in a nucleus during an alpha decay.',
    modelAnswer: 'The nucleus emits two protons and two neutrons. Its mass number decreases by 4 and its atomic number decreases by 2, meaning it has become a different element.',
    senNote: 'Alpha decay: lose 2 protons and 2 neutrons. Mass number goes down by 4, atomic number goes down by 2. The element changes because the number of protons changes.',
    boards: ['aqa'],
    course: 'combined',
  },

  // ── Q17 — radiation_hazards ───────────────────────────────────────────────
  {
    id: 'rc_atomic_17',
    topicId: 'radiation_hazards',
    type: 'recall',
    tier: 1,
    marks: 2,
    timeExpected: 30,
    commandWord: 'Explain',
    question: 'Explain what happens in a nucleus during a beta decay.',
    modelAnswer: 'A neutron turns into a proton. The atomic number increases by 1, meaning the nucleus has become a different element, but the mass number remains the same.',
    senNote: 'Beta decay: a neutron becomes a proton + the beta particle (electron) is ejected. Mass number stays the same (same total particles) but atomic number goes up by 1.',
    boards: ['aqa'],
    course: 'combined',
  },

  // ── Q18 — radiation_hazards ───────────────────────────────────────────────
  {
    id: 'rc_atomic_18',
    topicId: 'radiation_hazards',
    type: 'recall',
    tier: 1,
    marks: 2,
    timeExpected: 30,
    commandWord: 'Describe',
    question: 'Compare the penetrating power of alpha, beta and gamma radiation.',
    modelAnswer: 'Alpha is weakly penetrating and will be fully absorbed by thin materials such as paper or skin. Beta is moderately penetrating and will be absorbed by materials such as glass or aluminium. Gamma is highly penetrating and requires thick lead or concrete to be significantly absorbed.',
    senNote: 'Penetrating power order: alpha (weakest) < beta < gamma (strongest). Stopped by: paper, aluminium, thick lead. More penetrating = less ionising.',
    boards: ['aqa'],
    course: 'combined',
  },

  // ── Q19 — radiation_hazards ───────────────────────────────────────────────
  {
    id: 'rc_atomic_19',
    topicId: 'radiation_hazards',
    type: 'recall',
    tier: 1,
    marks: 2,
    timeExpected: 30,
    commandWord: 'Describe',
    question: 'Compare the range in air of alpha, beta and gamma radiation.',
    modelAnswer: 'Alpha particles will only travel a few cm in air. Beta particles will travel up to a metre through air. Gamma radiation can travel long distances through air.',
    senNote: 'Range in air: alpha = a few cm, beta = up to 1 m, gamma = very long distances. Alpha is the shortest range — it loses energy quickly by ionising nearby atoms.',
    boards: ['aqa'],
    course: 'combined',
  },

  // ── Q20 — radiation_hazards ───────────────────────────────────────────────
  {
    id: 'rc_atomic_20',
    topicId: 'radiation_hazards',
    type: 'recall',
    tier: 1,
    marks: 1,
    timeExpected: 30,
    commandWord: 'Describe',
    question: 'Compare the ionising ability of alpha, beta and gamma radiation.',
    modelAnswer: 'Alpha is highly ionising, beta is moderately ionising and gamma is weakly ionising.',
    senNote: 'Ionising power is the opposite of penetrating power. Alpha ionises strongly (causes most damage inside the body) but cannot penetrate far. Gamma penetrates well but ionises weakly.',
    boards: ['aqa'],
    course: 'combined',
  },

  // ── Q21 — radiation_hazards ───────────────────────────────────────────────
  {
    id: 'rc_atomic_21',
    topicId: 'radiation_hazards',
    type: 'recall',
    tier: 1,
    marks: 1,
    timeExpected: 30,
    commandWord: 'State',
    question: 'State the symbol used in a decay equation to represent an alpha particle.',
    modelAnswer: '⁴₂He (helium-4 nucleus: mass number 4, atomic number 2)',
    senNote: 'Alpha is always written as ⁴₂He — think of it as a helium nucleus with 2 protons (bottom number) and total mass 4 (top number). You must write both numbers.',
    boards: ['aqa'],
    course: 'combined',
  },

  // ── Q22 — radiation_hazards ───────────────────────────────────────────────
  {
    id: 'rc_atomic_22',
    topicId: 'radiation_hazards',
    type: 'recall',
    tier: 1,
    marks: 1,
    timeExpected: 30,
    commandWord: 'State',
    question: 'State the symbol used in a decay equation to represent a beta particle.',
    modelAnswer: '⁰₋₁e (electron: mass number 0, charge −1)',
    senNote: 'Beta is written as ⁰₋₁e — mass number is 0 (electrons have negligible mass) and the bottom number is −1 (negative charge). The minus sign matters.',
    boards: ['aqa'],
    course: 'combined',
  },

  // ── Q23 — radiation_hazards ───────────────────────────────────────────────
  {
    id: 'rc_atomic_23',
    topicId: 'radiation_hazards',
    type: 'recall',
    tier: 1,
    marks: 1,
    timeExpected: 30,
    commandWord: 'Explain',
    question: 'Explain what happens to the mass and charge of a nucleus when a gamma ray is emitted.',
    modelAnswer: 'When a gamma ray is emitted it causes no change to the mass or charge of a nucleus.',
    senNote: 'Gamma emission does NOT change the nucleus — no protons or neutrons are lost. It just releases excess energy as electromagnetic radiation. Mass and atomic number stay the same.',
    boards: ['aqa'],
    course: 'combined',
  },

  // ── Q24 — radiation_hazards ───────────────────────────────────────────────
  {
    id: 'rc_atomic_24',
    topicId: 'radiation_hazards',
    type: 'recall',
    tier: 1,
    marks: 1,
    timeExpected: 30,
    commandWord: 'Explain',
    question: "Explain what is meant by the 'half-life' of a radioactive isotope.",
    modelAnswer: 'The time it takes for the number of nuclei in a sample to halve, or the time it takes for the count rate (activity) of a sample to fall to half of its initial amount.',
    senNote: 'Half-life = the time for half the atoms to decay. After 1 half-life: 50% remains. After 2: 25%. After 3: 12.5%. You can count either nuclei remaining or activity — both halve in the same time.',
    boards: ['aqa'],
    course: 'combined',
  },

  // ── Q25 — radiation_hazards ───────────────────────────────────────────────
  {
    id: 'rc_atomic_25',
    topicId: 'radiation_hazards',
    type: 'recall',
    tier: 1,
    marks: 1,
    timeExpected: 30,
    commandWord: 'Explain',
    question: "Explain what is meant by the term 'contamination'.",
    modelAnswer: 'The presence of radioactive materials on or in another object. The radioactive materials emit radiation, causing a hazard.',
    senNote: 'Contamination = radioactive material is touching or inside the object (e.g. swallowing radioactive dust). The object itself becomes a source of radiation. Think: the radioactive stuff is physically there.',
    boards: ['aqa'],
    course: 'combined',
  },

  // ── Q26 — radiation_hazards ───────────────────────────────────────────────
  {
    id: 'rc_atomic_26',
    topicId: 'radiation_hazards',
    type: 'recall',
    tier: 1,
    marks: 1,
    timeExpected: 30,
    commandWord: 'Explain',
    question: "Explain what is meant by the term 'irradiation'.",
    modelAnswer: 'When an object is exposed to nuclear radiation. This does not cause the object to become radioactive.',
    senNote: 'Irradiation = being in the path of radiation from a source elsewhere. The object itself does NOT become radioactive. Think: the radiation passes through or hits it, but no radioactive material is left behind.',
    boards: ['aqa'],
    course: 'combined',
  },

  // ── Q27 — radiation_hazards ───────────────────────────────────────────────
  {
    id: 'rc_atomic_27',
    topicId: 'radiation_hazards',
    type: 'recall',
    tier: 1,
    marks: 1,
    timeExpected: 30,
    commandWord: 'Describe',
    question: "Describe what is meant by 'background radiation'.",
    modelAnswer: 'Radiation that is around us all of the time.',
    senNote: 'Background radiation is always present — from rocks, the air, space, and some man-made sources. It must be subtracted from experimental readings when measuring a radioactive source.',
    boards: ['aqa'],
    course: 'combined',
  },

  // ── Q28 — radiation_hazards ───────────────────────────────────────────────
  {
    id: 'rc_atomic_28',
    topicId: 'radiation_hazards',
    type: 'recall',
    tier: 1,
    marks: 2,
    timeExpected: 30,
    commandWord: 'State',
    question: 'State two examples of natural sources of background radiation.',
    modelAnswer: 'Rocks and cosmic rays.',
    senNote: 'Natural sources include: radon gas from rocks/ground, cosmic rays from space, and naturally occurring radioactive isotopes in food. Rocks and cosmic rays are the two main ones to learn.',
    boards: ['aqa'],
    course: 'combined',
  },

  // ── Q29 — radiation_hazards ───────────────────────────────────────────────
  {
    id: 'rc_atomic_29',
    topicId: 'radiation_hazards',
    type: 'recall',
    tier: 1,
    marks: 2,
    timeExpected: 30,
    commandWord: 'State',
    question: 'State two examples of man-made sources of background radiation.',
    modelAnswer: 'Fallout from nuclear weapons testing and nuclear accidents.',
    senNote: 'Man-made sources are things humans created: nuclear weapons tests, nuclear power station accidents (e.g. Chernobyl), and medical uses of radiation. Fallout and accidents are the key two.',
    boards: ['aqa'],
    course: 'combined',
  },

  // ── Q30 — radiation_hazards ───────────────────────────────────────────────
  {
    id: 'rc_atomic_30',
    topicId: 'radiation_hazards',
    type: 'recall',
    tier: 1,
    marks: 2,
    timeExpected: 30,
    commandWord: 'State',
    question: 'State two factors which may affect a person\'s radiation dose from background radiation.',
    modelAnswer: 'Their occupation and location.',
    senNote: 'Occupation (e.g. nuclear worker, radiographer, flight crew) and location (e.g. living near granite rock, altitude) both affect dose. Where you live and what you do matters.',
    boards: ['aqa'],
    course: 'combined',
  },

  // ── Q31 — radiation_hazards ───────────────────────────────────────────────
  {
    id: 'rc_atomic_31',
    topicId: 'radiation_hazards',
    type: 'recall',
    tier: 1,
    marks: 2,
    timeExpected: 30,
    commandWord: 'Describe',
    question: 'Describe two medical uses of nuclear radiation.',
    modelAnswer: 'Exploration of internal organs (radioactive tracers) and destruction of unwanted tissue (radiotherapy).',
    senNote: 'Two medical uses: (1) tracers — swallow/inject a radioactive substance to track it through the body with a scanner; (2) radiotherapy — aim radiation at a tumour to kill cancer cells.',
    boards: ['aqa'],
    course: 'combined',
  },

  // ── Q32 — nuclear_fission ─────────────────────────────────────────────────
  {
    id: 'rc_atomic_32',
    topicId: 'nuclear_fission',
    type: 'recall',
    tier: 1,
    marks: 2,
    timeExpected: 30,
    commandWord: 'Describe',
    question: 'Describe the process of nuclear fission.',
    modelAnswer: 'A large unstable nucleus absorbs a neutron and becomes unstable. The nucleus splits into two smaller nuclei and several neutrons, all of which have kinetic energy. Gamma rays are also emitted.',
    senNote: 'Fission = splitting. A neutron hits a large nucleus (e.g. uranium-235), causing it to split into two smaller nuclei + 2-3 free neutrons + gamma radiation + lots of energy. Those neutrons can cause more fissions.',
    boards: ['aqa'],
    course: 'physics_only',
  },

  // ── Q33 — nuclear_fission ─────────────────────────────────────────────────
  {
    id: 'rc_atomic_33',
    topicId: 'nuclear_fission',
    type: 'recall',
    tier: 1,
    marks: 2,
    timeExpected: 30,
    commandWord: 'Explain',
    question: "Explain what is meant by a 'chain reaction'.",
    modelAnswer: 'When the products of one reaction (neutrons) go on to cause more reactions. In the case of nuclear fission, the neutrons released are absorbed by other large nuclei, causing further fissions.',
    senNote: 'Chain reaction: each fission releases neutrons → those neutrons trigger more fissions → each of those releases more neutrons → and so on. It multiplies rapidly unless controlled.',
    boards: ['aqa'],
    course: 'physics_only',
  },

  // ── Q34 — nuclear_fusion ──────────────────────────────────────────────────
  {
    id: 'rc_atomic_34',
    topicId: 'nuclear_fusion',
    type: 'recall',
    tier: 1,
    marks: 2,
    timeExpected: 30,
    commandWord: 'Describe',
    question: 'Describe the process of nuclear fusion.',
    modelAnswer: 'The joining together of two light nuclei to form a heavier nucleus. During this process some of the mass may be converted into energy.',
    senNote: 'Fusion = joining. Two small nuclei (e.g. hydrogen isotopes) are forced together to form a larger nucleus. The tiny loss of mass becomes a huge amount of energy (E = mc²). This is how the Sun generates energy.',
    boards: ['aqa'],
    course: 'physics_only',
  },

]

export default recallAtomicQuestions
