const examSpace = {

  // ===== Stellar Evolution =====
  stellar_evolution: [
    {
      type: "sequence",
      question: "Put the life cycle of a Sun-sized star in the correct order.",
      questionSubtitle: "From birth to death of a star like our Sun.",
      items: [
        "Nebula — a cloud of dust and gas pulls together",
        "Protostar — gravity compresses the cloud and it heats up",
        "Main sequence star — hydrogen fuses into helium for billions of years",
        "Red giant — the star swells as it runs out of hydrogen",
        "White dwarf — the core shrinks and cools over time",
      ],
      correctOrder: [0, 1, 2, 3, 4],
      tier: 2,
      senNote: "Small stars have a gentle death. They do NOT explode.",
    },
    {
      type: "sequence",
      question: "Put the life cycle of a massive star in the correct order.",
      questionSubtitle: "Stars much bigger than the Sun end very differently.",
      items: [
        "Nebula — a large cloud of dust and gas collapses under gravity",
        "Protostar — the cloud heats up as it compresses",
        "Main sequence star — hydrogen fuses in the core",
        "Red supergiant — the star expands hugely as fuel runs low",
        "Supernova — the star explodes violently, scattering elements into space",
        "Neutron star or black hole — the dense core left behind after the explosion",
      ],
      correctOrder: [0, 1, 2, 3, 4, 5],
      tier: 2,
      senNote: "Massive stars explode as a supernova. The leftover core becomes a neutron star or black hole.",
    },
    {
      type: "tap-match",
      question: "Match each stage of a star's life to its description.",
      questionSubtitle: "Tap an item, then tap its match.",
      pairs: [
        { item: "Nebula", match: "A cloud of dust and gas in space" },
        { item: "Protostar", match: "A collapsing cloud that heats up before fusion starts" },
        { item: "Main sequence", match: "A stable star where hydrogen fuses into helium" },
        { item: "Red giant", match: "An expanded star that has run low on hydrogen" },
        { item: "White dwarf", match: "A small, hot, dense remnant that slowly cools" },
      ],
      tier: 2,
      senNote: "Main sequence is the longest and most stable stage of a star's life.",
    },
  ],

  // ===== Solar System =====
  solar_system: [
    {
      type: "misconception",
      question: "Is this statement correct?",
      questionSubtitle: "Think carefully about what orbits what.",
      statement: "The Sun orbits the Earth.",
      isCorrect: false,
      explanation:
        "The Earth orbits the Sun, not the other way around. The Sun is at the centre of our solar system and all planets orbit around it due to gravity.",
      tier: 2,
      senNote: "The Sun stays in the centre. The Earth moves around the Sun once a year.",
    },
    {
      type: "misconception",
      question: "Is this statement correct?",
      questionSubtitle: "Think about what keeps planets in orbit.",
      statement: "Planets stay in orbit because there is no gravity in space.",
      isCorrect: false,
      explanation:
        "Gravity is what keeps planets in orbit. The Sun's gravitational pull acts on the planets even across millions of kilometres. There is gravity in space — it just gets weaker with distance.",
      tier: 2,
      senNote: "Gravity acts over huge distances. It is the force that holds orbits together.",
    },
    {
      type: "tap-match",
      question: "Match each object to its correct category.",
      questionSubtitle: "Tap an item, then tap its match.",
      pairs: [
        { item: "Earth", match: "Planet" },
        { item: "Pluto", match: "Dwarf planet" },
        { item: "The Moon", match: "Natural satellite" },
        { item: "The Sun", match: "Star" },
      ],
      tier: 2,
      senNote: "Pluto was reclassified as a dwarf planet in 2006.",
    },
  ],

  // ===== Red-shift =====
  redshift: [
    {
      type: "misconception",
      question: "Is this statement correct?",
      questionSubtitle: "Think about what red-shift actually means.",
      statement: "Red-shift means that galaxies emit red light.",
      isCorrect: false,
      explanation:
        "Red-shift does not mean galaxies glow red. It means the light from distant galaxies is stretched to longer wavelengths as they move away from us, shifting towards the red end of the spectrum.",
      tier: 2,
      senNote: "Red-shift = wavelength stretched longer. The galaxy is moving AWAY from us.",
    },
    {
      type: "misconception",
      question: "Is this statement correct?",
      questionSubtitle: "This is known as Hubble's Law.",
      statement: "The further away a galaxy is, the faster it is moving away from us.",
      isCorrect: true,
      explanation:
        "This is correct and is called Hubble's Law. More distant galaxies show greater red-shift, meaning they are receding faster. This is key evidence that the universe is expanding.",
      tier: 2,
      senNote: "Greater distance = greater speed = greater red-shift. This is Hubble's Law.",
    },
    {
      type: "tap-match",
      question: "Match each piece of evidence to its conclusion.",
      questionSubtitle: "Tap an item, then tap its match.",
      pairs: [
        { item: "Light from galaxies is red-shifted", match: "Galaxies are moving away from us" },
        { item: "More distant galaxies have greater red-shift", match: "The universe is expanding" },
        { item: "Cosmic microwave background radiation", match: "Leftover energy from the Big Bang" },
        { item: "All galaxies move away from each other", match: "There is no centre to the expansion" },
      ],
      tier: 2,
      senNote: "Red-shift and CMBR are the two main pieces of evidence for the Big Bang.",
    },
    {
      type: "misconception",
      question: "Is this statement correct?",
      questionSubtitle: "Think about what cosmic microwave background radiation (CMBR) is.",
      statement: "The cosmic microwave background radiation is emitted by distant stars.",
      isCorrect: false,
      explanation:
        "CMBR is not from stars. It is the thermal radiation left over from the very early universe, shortly after the Big Bang. It fills the entire universe and is one of the strongest pieces of evidence that the Big Bang occurred.",
      tier: 2,
      senNote: "CMBR = leftover energy from the Big Bang itself. It comes from all directions, not from stars.",
    },
    {
      type: "sequence",
      question: "Put these statements about Big Bang evidence in a logical order, starting from the observation.",
      questionSubtitle: "From observation to conclusion.",
      items: [
        "Light from distant galaxies is observed to be red-shifted",
        "The amount of red-shift is greater for more distant galaxies",
        "This means galaxies are moving away from us, and the further away, the faster",
        "Therefore the universe must be expanding",
        "If we trace this expansion backwards, the universe began from a single point — the Big Bang",
      ],
      correctOrder: [0, 1, 2, 3, 4],
      tier: 3,
      senNote: "Observation → pattern → interpretation → conclusion → Big Bang theory.",
    },
  ],
};

export default examSpace;
