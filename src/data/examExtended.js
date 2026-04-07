const examExtended = {

  // ===== Energy =====
  energy_resources: [
    {
      type: "extended-answer",
      question: "Evaluate the use of nuclear power stations as a source of electricity for the UK. Your answer should include advantages, disadvantages and an overall conclusion. [6 marks]",
      questionSubtitle: "6 marks — write a structured evaluation",
      markScheme: [
        "Award 1 mark: nuclear fuel (uranium) releases very large amounts of energy per kg / high energy density",
        "Award 1 mark: nuclear power stations do not emit CO₂ during operation / low carbon during generation",
        "Award 1 mark: reliable / not dependent on weather conditions / generates continuously",
        "Award 1 mark: radioactive waste is produced and must be stored safely for thousands of years",
        "Award 1 mark: risk of serious accident (meltdown) releasing radioactive material",
        "Award 1 mark: overall judgement with justification — e.g. suitable for baseload given low carbon output but concerns over waste/cost must be managed",
      ],
      modelAnswer: "Nuclear power stations use uranium fuel through **nuclear fission** to generate large amounts of electricity. They have several advantages: they produce **very large amounts of energy per kilogram** of fuel and do **not emit CO₂** during operation, making them a low-carbon source. They are also **reliable and weather-independent**, providing consistent baseload power. However, the process produces **highly radioactive waste** that must be stored securely for thousands of years, posing long-term environmental risks. There is also a small but serious risk of a **nuclear accident** releasing radioactive material. Overall, nuclear power is a valuable low-carbon source, though the waste and safety concerns require careful management and significant cost.",
      tier: 3,
      senNote: "Structure your answer: advantages (2-3 points) → disadvantages (2-3 points) → conclusion. Use connectives: 'however', 'on the other hand', 'overall'."
    },
    {
      type: "extended-answer",
      question: "Compare the use of wind turbines and fossil fuel power stations as sources of electrical energy. Your answer should refer to reliability, environmental impact and cost. [6 marks]",
      questionSubtitle: "6 marks — compare both sources across three criteria",
      markScheme: [
        "Award 1 mark: wind turbines are intermittent / dependent on wind speed / unreliable",
        "Award 1 mark: fossil fuel stations are reliable / generate continuously on demand",
        "Award 1 mark: wind turbines produce no CO₂ / no greenhouse gases during operation",
        "Award 1 mark: fossil fuels release CO₂ and SO₂ contributing to climate change and acid rain",
        "Award 1 mark: wind turbines have high upfront construction cost but low running costs / no fuel cost",
        "Award 1 mark: fossil fuels have ongoing fuel costs and contribute to resource depletion",
      ],
      modelAnswer: "Wind turbines and fossil fuel stations both generate electricity but differ significantly. Wind turbines are **intermittent** — they only generate when the wind is blowing, making them **unreliable** for continuous supply. Fossil fuel stations are **dispatchable** and can generate electricity on demand, providing reliable baseload power. Environmentally, wind turbines produce **no CO₂ or pollutants** during operation, whereas fossil fuels release **CO₂** (contributing to global warming) and **SO₂** (causing acid rain). Wind turbines have **high installation costs** but near-zero running costs since wind is free. Fossil fuels have lower upfront costs but significant ongoing **fuel costs** and contribute to resource depletion. Overall, wind is better for the environment but needs backup generation due to intermittency.",
      tier: 3,
      senNote: "Use a comparison structure: 'Wind turbines... whereas fossil fuel stations...' for each criterion."
    },
    {
      type: "extended-answer",
      question: "Explain how energy is transferred from chemical energy stored in coal to electrical energy in the national grid, and describe the energy losses at each stage. [6 marks]",
      questionSubtitle: "6 marks — trace the energy through the system",
      markScheme: [
        "Award 1 mark: coal burned → chemical energy transferred to thermal store of steam/water",
        "Award 1 mark: steam drives turbine → thermal/kinetic energy transfer",
        "Award 1 mark: turbine drives generator → kinetic to electrical energy via electromagnetic induction",
        "Award 1 mark: energy lost as heat/sound in the turbine/generator (friction/resistance losses)",
        "Award 1 mark: step-up transformer raises voltage to reduce current in cables / reduces I²R losses",
        "Award 1 mark: cables still lose energy as heat / overall efficiency less than 100% / wasted energy dissipated to surroundings",
      ],
      modelAnswer: "In a coal power station, **chemical energy** in coal is released by combustion, heating water to produce steam. The steam drives a **turbine**, converting thermal energy to **kinetic energy**. The turbine drives a **generator** where **electromagnetic induction** converts kinetic to **electrical energy**. At each stage, energy is wasted — **friction** in turbines and **resistance heating** in generators — so efficiency is below 100%. The electricity is then passed through a **step-up transformer** which increases voltage and reduces current. Since power loss in cables = I²R, **lower current greatly reduces heat loss** in the transmission cables. A step-down transformer then reduces the voltage back to 230 V for homes. Overall, only about **30–40%** of the original chemical energy reaches consumers as useful electrical energy.",
      tier: 3,
      senNote: "Trace in order: coal → heat → steam → turbine → generator → transformer → cables → home. Name the energy store at each stage."
    },
  ],

  // ===== Electricity =====
  circuit_basics: [
    {
      type: "extended-answer",
      question: "A student investigates how resistance varies with the length of a wire. Describe a method the student could use to carry out this investigation. Include the variables to control and how to improve accuracy. [6 marks]",
      questionSubtitle: "6 marks — describe a full experimental method",
      markScheme: [
        "Award 1 mark: set up a circuit with ammeter in series and voltmeter in parallel across the wire",
        "Award 1 mark: measure and record the length of wire using a ruler / start at a fixed length (e.g. 10 cm) and increase in steps",
        "Award 1 mark: record current (I) and voltage (V) for each length / calculate resistance using R = V/I",
        "Award 1 mark: control variables: same wire material, same cross-sectional area, same temperature",
        "Award 1 mark: repeat each measurement and calculate a mean to reduce random error",
        "Award 1 mark: plot a graph of resistance against length / expect a straight line through the origin (R ∝ L)",
      ],
      modelAnswer: "Set up a circuit with a **power supply**, the wire connected in series with an **ammeter**, and a **voltmeter** connected in parallel across the wire. Use a ruler to measure lengths from 10 cm to 100 cm in 10 cm steps, recording the current (I) and voltage (V) for each. Calculate resistance using **R = V/I**. Keep the wire material, **cross-sectional area** and temperature constant to ensure a fair test. Repeat each measurement **three times** and take the mean to reduce random error. Plot a graph of **resistance against length** — if R ∝ L the graph should be a straight line through the origin. Clip the wire to the ruler and use a new piece of wire if it heats up significantly.",
      tier: 3,
      senNote: "Remember: ammeter in series, voltmeter in parallel. State independent variable (length), dependent variable (resistance), and control variables."
    },
    {
      type: "extended-answer",
      question: "Explain how the national grid transmits electrical energy efficiently from power stations to homes. Include the role of transformers in your answer. [6 marks]",
      questionSubtitle: "6 marks — explain the system with reference to P = I²R",
      markScheme: [
        "Award 1 mark: electricity generated at ~25,000 V at the power station",
        "Award 1 mark: step-up transformer increases voltage to ~400,000 V",
        "Award 1 mark: higher voltage means lower current for the same power (P = IV)",
        "Award 1 mark: power loss in cables P = I²R — lower current greatly reduces power loss as heat",
        "Award 1 mark: step-down transformer reduces voltage to 230 V for safe use in homes",
        "Award 1 mark: transformers work on AC / AC needed for transformer operation / explanation of alternating flux",
      ],
      modelAnswer: "Power stations generate electricity at around **25,000 V**. A **step-up transformer** increases this to approximately **400,000 V** for transmission. Since power P = IV, increasing voltage means the **current is proportionally reduced**. Cable power loss is given by **P = I²R** — because the current is squared, even a small reduction in current causes a large reduction in heat losses. The electricity travels across the country through cables and then reaches a **step-down transformer** which reduces the voltage back to **230 V** for safe use in homes and businesses. The entire system uses **alternating current (AC)** because transformers only work with changing magnetic flux produced by AC. This system reduces energy waste significantly — without high-voltage transmission, much more energy would be wasted heating the cables.",
      tier: 3,
      senNote: "Key equation: P = I²R. Doubling voltage halves current, and halving current reduces power loss by factor of 4."
    },
    {
      type: "extended-answer",
      question: "Explain the dangers of static electricity and describe a situation where these dangers are important. Include what precautions can be taken. [6 marks]",
      questionSubtitle: "6 marks — explain danger, example, and precautions",
      markScheme: [
        "Award 1 mark: static charge builds up by friction / electron transfer between materials",
        "Award 1 mark: a large build-up of charge can cause a sudden discharge / spark",
        "Award 1 mark: sparks can ignite flammable vapours / cause explosions (e.g. fuelling aircraft or tankers)",
        "Award 1 mark: relevant example — aircraft refuelling / paint spraying / grain silos",
        "Award 1 mark: earthing / bonding with a conducting wire removes charge safely",
        "Award 1 mark: anti-static clothing / wristbands / mats used in electronics manufacturing",
      ],
      modelAnswer: "Static electricity builds up when **friction causes electron transfer** between materials, leaving one surface positively charged and one negatively charged. If charge accumulates significantly, a sudden **electrostatic discharge (spark)** can occur. Sparks are dangerous near **flammable substances** — for example, when refuelling aircraft, fuel vapour can be ignited by a spark caused by charge build-up on the aircraft. To prevent this, the aircraft is **earthed by connecting it to the ground with a conducting wire** before refuelling, allowing charge to dissipate safely. In electronics manufacturing, workers wear **anti-static wristbands and work on anti-static mats** to prevent charge build-up that could damage sensitive components. Earthing and bonding are the key precautions in all industrial settings.",
      tier: 3,
      senNote: "Structure: what causes it → what the danger is → real example → what precautions are taken."
    },
  ],

  // ===== Particle Model =====
  gas_pressure: [
    {
      type: "extended-answer",
      question: "Explain, in terms of particles, why the pressure of a gas increases when its temperature is raised at constant volume. [6 marks]",
      questionSubtitle: "6 marks — particle-level explanation",
      markScheme: [
        "Award 1 mark: gas consists of particles in constant random motion",
        "Award 1 mark: temperature increase → particles gain kinetic energy / move faster",
        "Award 1 mark: particles hit the walls of the container more frequently",
        "Award 1 mark: particles hit the walls with greater force / greater momentum change per collision",
        "Award 1 mark: pressure = force per unit area / more frequent harder collisions increase pressure",
        "Award 1 mark: volume is constant so the increased collision rate/force leads directly to increased pressure",
      ],
      modelAnswer: "A gas consists of **particles in constant random motion**. When the temperature increases, the particles gain **kinetic energy** and move **faster**. These faster-moving particles hit the walls of the container **more frequently** and with **greater force** (greater change in momentum per collision). Since pressure is defined as **force per unit area**, both the increased frequency and increased force of collisions contribute to a higher pressure. Because the **volume is constant** (the container doesn't change size), the same area of wall receives more and harder impacts, so the pressure increases. This relationship is described by the pressure-temperature law: at constant volume, pressure is proportional to absolute temperature (P ∝ T in kelvin).",
      tier: 3,
      senNote: "Use these key phrases: 'particles gain kinetic energy', 'more frequent collisions', 'greater force', 'pressure = force per unit area'."
    },
    {
      type: "extended-answer",
      question: "Describe an experiment to determine the specific heat capacity of a metal block. Include the measurements you would take and how you would calculate the specific heat capacity. [6 marks]",
      questionSubtitle: "6 marks — required practical method",
      markScheme: [
        "Award 1 mark: measure mass of block using a balance",
        "Award 1 mark: insert electric heater and thermometer into holes in the block",
        "Award 1 mark: record initial temperature and connect heater to joulemeter/power supply",
        "Award 1 mark: heat for a set time / record energy supplied (E) from joulemeter",
        "Award 1 mark: record final temperature / calculate temperature change ΔT",
        "Award 1 mark: calculate c using ΔE = mcΔT → c = ΔE ÷ (m × ΔT)",
      ],
      modelAnswer: "First, **measure the mass (m)** of the metal block using a balance. Drill two holes in the block and insert an **electric immersion heater** and a **thermometer**. Add insulating material around the block to reduce heat loss. Connect the heater to a **joulemeter** and power supply. Record the **initial temperature (T₁)**, then switch the heater on for a set time. Record the **energy supplied (ΔE)** from the joulemeter and the **final temperature (T₂)**. Calculate the temperature change: **ΔT = T₂ − T₁**. Use the equation **ΔE = mcΔT** to calculate specific heat capacity: **c = ΔE ÷ (m × ΔT)**. Repeat with the same block cooled to the same starting temperature to check reproducibility.",
      tier: 3,
      senNote: "The equation is ΔE = mcΔT. Rearrange to c = ΔE ÷ (m × ΔT). Use a joulemeter for accurate energy measurement."
    },
    {
      type: "extended-answer",
      question: "Explain why the temperature of a substance does not change while it is changing state, even though energy is being supplied. [6 marks]",
      questionSubtitle: "6 marks — particle-level explanation of latent heat",
      markScheme: [
        "Award 1 mark: during a change of state, energy is being supplied continuously",
        "Award 1 mark: temperature remains constant / does not rise during the state change",
        "Award 1 mark: energy is used to break intermolecular bonds/forces between particles",
        "Award 1 mark: breaking bonds does not increase kinetic energy of particles",
        "Award 1 mark: temperature is a measure of mean kinetic energy of particles",
        "Award 1 mark: since kinetic energy is unchanged, temperature is unchanged / energy stored as potential energy",
      ],
      modelAnswer: "When a substance changes state (e.g. from solid to liquid), energy is continuously supplied but the **temperature remains constant**. This is because the energy is used to **break the intermolecular bonds** (forces of attraction) between particles rather than increasing their motion. Temperature is a measure of the **mean kinetic energy** of the particles — since the energy goes into breaking bonds rather than speeding up particles, the kinetic energy stays the same, and therefore the **temperature does not rise**. The energy is stored as **increased potential energy** as particles are separated further apart. Only once all the bonds have been broken (the state change is complete) does the supplied energy begin to increase the kinetic energy of particles and raise the temperature again.",
      tier: 3,
      senNote: "Key point: energy breaks bonds (potential energy), not increases speed (kinetic energy). Temperature = kinetic energy. So temperature stays flat."
    },
  ],

  // ===== Atomic Structure =====
  radiation_hazards: [
    {
      type: "extended-answer",
      question: "Compare the hazards of irradiation and contamination from radioactive sources, and explain which type of radiation poses the greatest risk in each case. [6 marks]",
      questionSubtitle: "6 marks — compare irradiation vs contamination",
      markScheme: [
        "Award 1 mark: irradiation is exposure to a source outside the body / stops when source removed",
        "Award 1 mark: contamination is radioactive material inside or on the body / continues to expose tissues",
        "Award 1 mark: contamination is generally more dangerous / continuous exposure",
        "Award 1 mark: alpha most dangerous when inhaled/ingested (contamination) — highly ionising at close range to tissues",
        "Award 1 mark: gamma most dangerous for irradiation — penetrates body easily from outside",
        "Award 1 mark: beta moderately dangerous in both cases — penetrates skin, stopped by aluminium",
      ],
      modelAnswer: "**Irradiation** occurs when a radioactive source outside the body exposes it to radiation. It stops as soon as the source is removed or you move away. **Contamination** means radioactive material is on or inside the body, causing continuous exposure even after leaving the source. Contamination is generally **more dangerous** because the radiation acts directly on internal tissues. For irradiation from outside, **gamma radiation** is most hazardous because it penetrates deeply into the body. For contamination (material inhaled or swallowed), **alpha radiation** is most dangerous — though it is stopped by paper, inside the body it causes **intense ionisation of nearby cells**, damaging DNA and increasing cancer risk. Beta is moderately hazardous in both scenarios. Protective measures include wearing gloves, masks, and handling sources with tongs.",
      tier: 3,
      senNote: "Remember the flip: gamma worst outside the body (penetrating), alpha worst inside (highly ionising at close range)."
    },
    {
      type: "extended-answer",
      question: "Explain how scientists' understanding of the structure of the atom changed between 1897 and 1932. Refer to specific models and the evidence for each. [6 marks]",
      questionSubtitle: "6 marks — describe the development of atomic models",
      markScheme: [
        "Award 1 mark: Thomson's plum pudding model (1897) — negative electrons embedded in a positive sphere",
        "Award 1 mark: Geiger-Marsden alpha scattering experiment fired alpha particles at gold foil",
        "Award 1 mark: most passed straight through / small number deflected through large angles / very few reflected",
        "Award 1 mark: Rutherford concluded atom is mostly empty space with a small, dense positive nucleus",
        "Award 1 mark: Bohr refined the model — electrons orbit in fixed energy levels/shells",
        "Award 1 mark: Chadwick discovered neutron (1932) — completing the nuclear model with protons and neutrons in nucleus",
      ],
      modelAnswer: "In 1897, **J.J. Thomson** proposed the plum pudding model: a ball of positive charge with **electrons embedded throughout**. This was challenged by the **Geiger-Marsden experiment (1909)**, in which alpha particles were fired at a thin gold foil. Most passed straight through, but **some were deflected at large angles** and a tiny fraction bounced back. Thomson's model could not explain this. **Rutherford concluded** that the atom was **mostly empty space** with a tiny, dense, positively charged **nucleus** at the centre. **Bohr** later refined this model, proposing that electrons orbit in **fixed energy shells**. Finally, **Chadwick discovered the neutron** in 1932, completing the nuclear model by explaining the extra mass in nuclei without adding positive charge.",
      tier: 3,
      senNote: "Chronological order: Thomson (plum pudding) → Rutherford (nuclear, from gold foil) → Bohr (shells) → Chadwick (neutron)."
    },
    {
      type: "extended-answer",
      question: "Explain how nuclear fission in a reactor is controlled and how the energy released is converted to electricity. [6 marks]",
      questionSubtitle: "6 marks — explain fission chain reaction and energy conversion",
      markScheme: [
        "Award 1 mark: uranium-235 nucleus absorbs a neutron and becomes unstable / splits into two smaller nuclei",
        "Award 1 mark: fission releases 2-3 neutrons and a large amount of energy",
        "Award 1 mark: these neutrons trigger further fissions — chain reaction",
        "Award 1 mark: control rods (boron) absorb neutrons to slow or stop the reaction",
        "Award 1 mark: moderator (water/graphite) slows neutrons to the right speed for fission",
        "Award 1 mark: heat from fission heats water to steam → steam drives turbine → turbine drives generator → electrical energy",
      ],
      modelAnswer: "In a nuclear reactor, a **uranium-235 nucleus** absorbs a slow-moving neutron and becomes unstable. It then undergoes **fission**, splitting into two smaller daughter nuclei and releasing **2–3 new neutrons** along with a large amount of energy. These neutrons trigger further fission events, creating a **self-sustaining chain reaction**. To control the rate of reaction, **control rods made of boron** are inserted into the reactor — boron absorbs neutrons, slowing or stopping the chain reaction. A **moderator** (usually water or graphite) slows the neutrons to the correct speed for further fission. The enormous heat produced heats water into **steam**, which drives a **turbine** connected to a **generator** that converts kinetic energy into **electrical energy** via electromagnetic induction.",
      tier: 3,
      senNote: "Chain reaction controlled by: control rods (absorb neutrons) + moderator (slow neutrons). Energy path: heat → steam → turbine → generator → electricity."
    },
  ],

  // ===== Forces =====
  equations_of_motion: [
    {
      type: "extended-answer",
      question: "A car brakes from 30 m/s and stops in 75 m. Using physics, calculate the deceleration and then explain how the braking distance would change if the car's speed had been 60 m/s. [6 marks]",
      questionSubtitle: "6 marks — calculate then explain the v² relationship",
      markScheme: [
        "Award 1 mark: correct substitution into v² = u² + 2as: 0 = 900 + 2a×75",
        "Award 1 mark: correct rearrangement: a = −900/150 = −6 m/s²",
        "Award 1 mark: deceleration = 6 m/s² stated",
        "Award 1 mark: if speed doubles, v² is 4× larger (60² = 3600 vs 30² = 900)",
        "Award 1 mark: same braking force → same deceleration → s = v² ÷ 2a → distance 4× larger",
        "Award 1 mark: braking distance would be 300 m (or 4 × 75 m) with justification",
      ],
      modelAnswer: "Using **v² = u² + 2as**: 0 = 30² + 2 × a × 75 → 0 = 900 + 150a → **a = −6 m/s²** (deceleration = 6 m/s²). If the car had been travelling at **60 m/s** (double the speed), v² = 60² = **3600** — which is four times 900. Since the braking force (and therefore deceleration) stays the same, rearranging v² = u² + 2as gives s = u² ÷ 2|a|. With **v² four times larger**, the stopping distance is **four times greater**: s = 3600 ÷ 12 = **300 m**. This demonstrates that **braking distance is proportional to the square of speed** — doubling speed quadruples braking distance, which is why speed limits near schools are so important.",
      tier: 3,
      senNote: "Key relationship: braking distance ∝ v². Double speed → 4× braking distance. Use v² = u² + 2as to prove it."
    },
    {
      type: "extended-answer",
      question: "Explain Newton's three laws of motion and give a real-life example of each. [6 marks]",
      questionSubtitle: "6 marks — state, explain, and apply all three laws",
      markScheme: [
        "Award 1 mark: 1st law — object remains at rest or constant velocity unless acted on by a resultant force",
        "Award 1 mark: relevant example of 1st law (e.g. puck on ice, object in space)",
        "Award 1 mark: 2nd law — resultant force = mass × acceleration (F = ma) / greater force gives greater acceleration for same mass",
        "Award 1 mark: relevant example of 2nd law (e.g. same engine force in lighter car → greater acceleration)",
        "Award 1 mark: 3rd law — for every action there is an equal and opposite reaction / forces act on different objects",
        "Award 1 mark: relevant example of 3rd law (e.g. book on table: book pushes table, table pushes book upward with equal force)",
      ],
      modelAnswer: "**Newton's 1st Law**: an object stays at rest or moves at constant velocity unless acted on by a **resultant force**. Example: a puck on an ice rink slides at constant speed because friction is very small — no resultant force. **Newton's 2nd Law**: the resultant force equals mass times acceleration (**F = ma**). Example: a sports car (small mass) with the same engine force as a lorry accelerates much faster. **Newton's 3rd Law**: for every action force there is an **equal and opposite reaction force acting on a different object**. Example: a book resting on a table — the book pushes down on the table (gravity/weight) and the table pushes up on the book with an **equal normal contact force**. The 3rd law forces always act on different objects and are of the same type.",
      tier: 3,
      senNote: "1st: no force = no change in motion. 2nd: F=ma. 3rd: equal/opposite forces on DIFFERENT objects."
    },
    {
      type: "extended-answer",
      question: "Explain the factors affecting stopping distance of a car, and explain why modern cars have ABS (anti-lock braking systems). [6 marks]",
      questionSubtitle: "6 marks — factors affecting stopping + explain ABS",
      markScheme: [
        "Award 1 mark: stopping distance = thinking distance + braking distance",
        "Award 1 mark: thinking distance increases with speed / tiredness / alcohol / distractions",
        "Award 1 mark: braking distance increases with speed (v² relationship) / wet or icy roads / worn tyres / worn brakes",
        "Award 1 mark: braking distance proportional to v² — doubling speed quadruples braking distance",
        "Award 1 mark: ABS prevents wheels from locking during emergency braking",
        "Award 1 mark: wheels that roll have more friction than locked/sliding wheels / ABS allows driver to steer while braking",
      ],
      modelAnswer: "**Stopping distance** = thinking distance + braking distance. **Thinking distance** (distance travelled during reaction time) increases with **speed, tiredness, alcohol, and distractions** — all of which increase reaction time. **Braking distance** is affected by **speed** (proportional to v²), **road conditions** (wet or icy roads reduce friction), and **vehicle condition** (worn tyres or brakes). Since braking distance ∝ v², **doubling speed quadruples braking distance**. **ABS (Anti-lock Braking System)** prevents wheels from locking and sliding during hard braking. When wheels lock, kinetic friction is replaced by sliding friction which is **lower**, increasing stopping distance. ABS **pulses the brakes** to keep wheels rolling, maintaining maximum friction. It also allows the driver to **steer while braking**, helping avoid obstacles.",
      tier: 3,
      senNote: "Two parts to stopping distance. Think + Brake. ABS prevents locking → rolling friction > sliding friction → shorter stop."
    },
  ],

  // ===== Waves =====
  em_spectrum: [
    {
      type: "extended-answer",
      question: "Describe how X-rays are used in medicine and explain the precautions taken to protect patients and medical staff. [6 marks]",
      questionSubtitle: "6 marks — uses, how they work, and precautions",
      markScheme: [
        "Award 1 mark: X-rays are part of the electromagnetic spectrum / travel at the speed of light",
        "Award 1 mark: X-rays are absorbed by dense materials (bone/metal) but pass through soft tissue",
        "Award 1 mark: used to create images of bones / detect fractures or tumours",
        "Award 1 mark: CT scans use multiple X-ray images to build a 3D picture",
        "Award 1 mark: X-rays are ionising radiation / can damage DNA / cause cancer",
        "Award 1 mark: lead aprons worn by patients / staff leave the room / minimum dose used / benefits outweigh risks",
      ],
      modelAnswer: "X-rays are part of the **electromagnetic spectrum** and travel at the speed of light (3×10⁸ m/s). They are absorbed by **dense materials like bone and metal** but pass through soft tissue. When directed at the body, they create a **shadow image** on a detector — bones appear white and soft tissue appears grey. They are used to **detect fractures**, identify foreign objects, and in **CT scans** (computed tomography) which combine multiple X-ray images to create a detailed **3D image**. However, X-rays are **ionising radiation** — they can damage DNA and increase the **risk of cancer**. Precautions include **lead aprons** to shield uninvolved areas, **staff leaving the room** during imaging, and using the **minimum effective dose**. The medical benefits of diagnosis are weighed against the small radiation risk.",
      tier: 3,
      senNote: "Structure: what X-rays are → how they work in the body → medical uses → risks → precautions."
    },
    {
      type: "extended-answer",
      question: "Explain how optical fibres use total internal reflection to transmit data and why this is preferable to copper cables for long-distance communication. [6 marks]",
      questionSubtitle: "6 marks — explain TIR and compare to copper cables",
      markScheme: [
        "Award 1 mark: light travels along the fibre and hits the boundary at an angle greater than the critical angle",
        "Award 1 mark: total internal reflection occurs — all the light is reflected back into the fibre",
        "Award 1 mark: light carries digital data as pulses of light / high frequency allows high data rate",
        "Award 1 mark: optical fibres have lower signal loss than copper cables over long distances",
        "Award 1 mark: optical fibres are not affected by electrical interference / more secure",
        "Award 1 mark: cladding surrounds the core to prevent light escaping at joins / protect the fibre",
      ],
      modelAnswer: "Optical fibres transmit data as **pulses of light**. The fibre consists of a glass or plastic **core** surrounded by **cladding** of lower refractive index. Light travels through the core and hits the core-cladding boundary at an angle **greater than the critical angle**, causing **total internal reflection** — all the light bounces back into the core and travels along the fibre with very little loss. Light has a very **high frequency**, allowing it to carry a **large amount of data** at very high speeds. Compared to copper cables, optical fibres have **much lower signal attenuation** over long distances, meaning less amplification is needed. They are also immune to **electromagnetic interference** and are more difficult to intercept. Cladding prevents light leaking out at bends or joints, maintaining signal integrity.",
      tier: 3,
      senNote: "Key: angle > critical angle → TIR. Light bounces along the fibre. Compare to copper: less signal loss, no EM interference, faster data rate."
    },
    {
      type: "extended-answer",
      question: "Explain how the Earth's surface temperature is maintained and describe the role of greenhouse gases in global warming. [6 marks]",
      questionSubtitle: "6 marks — black body radiation and greenhouse effect",
      markScheme: [
        "Award 1 mark: Sun emits mainly visible light / short-wavelength radiation reaches Earth",
        "Award 1 mark: Earth's surface absorbs radiation and warms up / re-emits as infrared radiation",
        "Award 1 mark: at steady state, energy absorbed = energy emitted / temperature stays constant",
        "Award 1 mark: greenhouse gases (CO₂, methane, water vapour) absorb infrared radiation emitted by Earth",
        "Award 1 mark: greenhouse gases re-emit radiation in all directions / some back towards Earth",
        "Award 1 mark: increased greenhouse gas concentration → more IR trapped → Earth's temperature rises / global warming",
      ],
      modelAnswer: "The **Sun emits mainly visible light** (short-wavelength radiation) which passes through the atmosphere and is absorbed by the **Earth's surface**, warming it. The Earth then re-emits this energy as **infrared (IR) radiation** of longer wavelength. In a steady state, the **energy absorbed = energy emitted**, so the temperature remains constant. **Greenhouse gases** such as CO₂, methane, and water vapour **absorb the outgoing infrared radiation** emitted by Earth, rather than letting it escape into space. They then **re-emit this radiation in all directions**, including back towards Earth — effectively trapping energy and warming the surface. As human activity increases the concentration of CO₂ and methane in the atmosphere, more IR radiation is trapped, causing the **Earth's average temperature to rise** — this is the **enhanced greenhouse effect** and drives global climate change.",
      tier: 3,
      senNote: "Sun → visible → absorbed by Earth → re-emitted as IR → greenhouse gases absorb IR → trap heat → warming."
    },
  ],

  // ===== Magnetism =====
  motor_effect: [
    {
      type: "extended-answer",
      question: "Explain how an electric motor works. Include reference to the motor effect, Fleming's left-hand rule, and how the motor produces continuous rotation. [6 marks]",
      questionSubtitle: "6 marks — explain the motor effect and continuous rotation",
      markScheme: [
        "Award 1 mark: current-carrying conductor in a magnetic field experiences a force (motor effect)",
        "Award 1 mark: F = BIL — force depends on flux density, current and length of conductor",
        "Award 1 mark: Fleming's left-hand rule — thumb=force, index=field, middle finger=current",
        "Award 1 mark: coil of wire in a magnetic field — opposite sides experience forces in opposite directions",
        "Award 1 mark: this creates a turning effect / torque / the coil rotates",
        "Award 1 mark: split-ring commutator reverses current direction every half turn to maintain rotation in the same direction",
      ],
      modelAnswer: "A **current-carrying conductor** placed in a magnetic field experiences a force — the **motor effect**. The force is given by **F = BIL** (force = flux density × current × length). **Fleming's left-hand rule** predicts the direction: point the index finger in the direction of the magnetic field (N to S), the middle finger in the direction of current, and the thumb shows the direction of the force. In a motor, a **rectangular coil** is placed between the poles of a magnet. Opposite sides of the coil carry current in opposite directions, so they experience forces in **opposite directions**, creating a **turning effect (torque)** that rotates the coil. A **split-ring commutator** reverses the current direction every half turn, ensuring the coil continues to rotate in the **same direction** rather than oscillating back and forth.",
      tier: 3,
      senNote: "Key: force on wire (F=BIL) → two wires in opposite directions → turning effect → commutator keeps it spinning same way."
    },
    {
      type: "extended-answer",
      question: "Describe how a simple AC generator works and explain how you would increase the size of the EMF it produces. [6 marks]",
      questionSubtitle: "6 marks — explain AC generation and increasing EMF",
      markScheme: [
        "Award 1 mark: coil rotates in a magnetic field / conductor cuts through field lines",
        "Award 1 mark: changing flux linkage / rate of cutting field lines induces an EMF (Faraday's law)",
        "Award 1 mark: as coil rotates, the direction of cutting reverses every half turn → alternating EMF/current",
        "Award 1 mark: slip rings and brushes allow current to flow in the external circuit without twisting",
        "Award 1 mark: increase EMF by increasing rotation speed / stronger magnet / more turns in the coil",
        "Award 1 mark: max EMF when coil plane is parallel to field / zero EMF when coil plane is perpendicular to field",
      ],
      modelAnswer: "In an AC generator, a **coil of wire rotates inside a magnetic field** (or a magnet rotates inside a fixed coil). As the coil rotates, its sides **cut through magnetic field lines**, and by **Faraday's law of electromagnetic induction**, an **EMF is induced**. Because the coil sides alternate between moving through the field in one direction then the other, the induced current is **alternating (AC)** — its direction reverses every half turn. **Slip rings and brushes** maintain contact between the rotating coil and the external circuit without the wires twisting. The EMF is at a **maximum** when the coil is parallel to the field (cutting field lines at the fastest rate) and **zero** when perpendicular. To increase the peak EMF: use a **stronger magnet**, rotate the coil **faster**, or use a **coil with more turns**.",
      tier: 3,
      senNote: "Generator = opposite of motor. Motion → cutting field lines → induced EMF. Slip rings (not commutator) give AC output."
    },
    {
      type: "extended-answer",
      question: "Explain how a transformer works and derive why a step-up transformer increases voltage. [6 marks]",
      questionSubtitle: "6 marks — transformer principle and ratio equation",
      markScheme: [
        "Award 1 mark: alternating current in the primary coil creates a changing magnetic field in the iron core",
        "Award 1 mark: the changing magnetic field links to the secondary coil / mutual induction",
        "Award 1 mark: a changing flux induces an EMF in the secondary coil (Faraday's law)",
        "Award 1 mark: the ratio of voltages equals the ratio of turns: Vs/Vp = Ns/Np",
        "Award 1 mark: step-up transformer has more turns on secondary than primary → higher output voltage",
        "Award 1 mark: transformers only work on AC / DC produces a static field which does not induce an EMF",
      ],
      modelAnswer: "A transformer works by **electromagnetic induction**. **Alternating current (AC)** in the primary coil creates a continuously **changing magnetic field** in the soft iron core. This changing field passes through the core and links with the **secondary coil**, inducing an **alternating EMF** in it (Faraday's law). The ratio of voltages equals the ratio of turns: **Vs/Vp = Ns/Np**. A **step-up transformer** has more turns on the secondary coil than the primary (Ns > Np), so the output voltage is **higher** than the input. Transformers only work with **AC** — a DC current produces a static (non-changing) magnetic field, which cannot induce an EMF by Faraday's law. In an ideal transformer, power is conserved: Vp×Ip = Vs×Is, so higher voltage means proportionally lower current.",
      tier: 3,
      senNote: "Transformer equation: Vs/Vp = Ns/Np. More turns on secondary → higher voltage. Only works with AC (needs changing field)."
    },
  ],

  // ===== Space =====
  redshift: [
    {
      type: "extended-answer",
      question: "Explain the Big Bang theory and describe the evidence that supports it. [6 marks]",
      questionSubtitle: "6 marks — explain the theory and give two types of evidence",
      markScheme: [
        "Award 1 mark: the Big Bang theory states the universe began from a very small, hot, dense point approximately 13.8 billion years ago",
        "Award 1 mark: the universe has been expanding ever since / all galaxies moving apart",
        "Award 1 mark: redshift — light from distant galaxies is shifted towards longer wavelengths / galaxies moving away from us",
        "Award 1 mark: the further away the galaxy, the greater the redshift / Hubble's law",
        "Award 1 mark: cosmic microwave background radiation (CMBR) — low-energy microwave radiation detected from all directions",
        "Award 1 mark: CMBR is the remnant heat from the Big Bang / predicted by the theory and detected in 1965",
      ],
      modelAnswer: "The **Big Bang theory** states the universe began approximately **13.8 billion years ago** from a single, extremely hot and dense point, and has been **expanding** ever since. The evidence includes: (1) **Redshift** — light from distant galaxies is shifted towards **longer wavelengths** (red end of the spectrum), showing that galaxies are moving **away from us**. The more distant the galaxy, the **greater the redshift** (Hubble's Law). This suggests all galaxies were once much closer together. (2) **Cosmic Microwave Background Radiation (CMBR)** — a faint microwave radiation detected uniformly from all directions in the sky. This is the **remnant thermal radiation** from the very early, hot universe, which has been stretched to microwave wavelengths as the universe expanded. Both pieces of evidence strongly support an explosive beginning to the universe.",
      tier: 3,
      senNote: "Two key evidences: redshift (galaxies moving apart) + CMBR (remnant heat from the Big Bang). Mention Hubble's Law for extra credit."
    },
    {
      type: "extended-answer",
      question: "Describe the life cycle of a star similar in mass to the Sun, from formation to its final state. [6 marks]",
      questionSubtitle: "6 marks — trace the full stellar life cycle",
      markScheme: [
        "Award 1 mark: nebula — cloud of gas and dust pulled together by gravity",
        "Award 1 mark: protostar — temperature rises as gas is compressed / nuclear fusion not yet started",
        "Award 1 mark: main sequence star — hydrogen fusion produces helium / outward radiation pressure balances inward gravity",
        "Award 1 mark: red giant — hydrogen fuel runs out / outer layers expand and cool",
        "Award 1 mark: planetary nebula — outer layers shed / core exposed",
        "Award 1 mark: white dwarf — hot dense core cools slowly / no more fusion / final state for Sun-like stars",
      ],
      modelAnswer: "A star like the Sun begins as a **nebula** — a cloud of hydrogen and dust. **Gravity** pulls the gas inward, forming a **protostar** where temperatures rise. When the core is hot enough, **nuclear fusion** begins, fusing hydrogen into helium and releasing enormous energy. This is the **main sequence** stage, lasting billions of years, where outward **radiation pressure** from fusion balances inward gravitational compression. When hydrogen runs out, the core contracts while outer layers expand and cool, forming a **red giant**. The red giant fuses helium into heavier elements until these run out. The outer layers are then expelled as a **planetary nebula**, leaving the dense hot core as a **white dwarf** — an Earth-sized remnant that cools over billions of years. It produces no more energy through fusion.",
      tier: 3,
      senNote: "Order: Nebula → Protostar → Main Sequence → Red Giant → Planetary Nebula → White Dwarf (for Sun-mass stars)."
    },
    {
      type: "extended-answer",
      question: "Explain why the Universe is thought to be expanding, and describe what this tells us about its origin and age. [6 marks]",
      questionSubtitle: "6 marks — redshift, expansion, and Big Bang implications",
      markScheme: [
        "Award 1 mark: light from distant galaxies shows redshift / longer wavelength than expected",
        "Award 1 mark: redshift indicates galaxies are moving away from Earth / universe is expanding",
        "Award 1 mark: the further away the galaxy, the faster it moves away / Hubble's constant",
        "Award 1 mark: if we extrapolate backwards, all matter was once in one point",
        "Award 1 mark: this suggests the universe began with the Big Bang approximately 13.8 billion years ago",
        "Award 1 mark: the age can be estimated from Hubble's constant: age ≈ 1/H₀ / approximately 13.8 billion years",
      ],
      modelAnswer: "When scientists observe **light from distant galaxies**, they find the spectral lines are **shifted towards the red end** of the spectrum — this is **redshift**. It occurs because the galaxies are **moving away** from us, stretching the light waves to longer wavelengths (like a receding ambulance). **The further away the galaxy, the faster it recedes** — described by **Hubble's Law** (recession speed ∝ distance). This means the universe is **expanding in all directions**. If we extrapolate this expansion **backwards in time**, all matter in the universe was once concentrated in a single, infinitely hot and dense point. The universe then began with the **Big Bang** approximately **13.8 billion years ago**. The age can be estimated from Hubble's constant (H₀) as approximately 1/H₀. The Big Bang theory is further supported by cosmic microwave background radiation.",
      tier: 3,
      senNote: "Redshift → galaxies moving apart → universe expanding → reverse to find it all started from one point (Big Bang) ~13.8 billion years ago."
    },
  ],

};

export default examExtended;
