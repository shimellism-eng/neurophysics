// NeuroPhysics Question Bank
// 225 questions across 45 subtopics (5 per subtopic)
// Tiers: 1=Remember, 2=Apply, 3=Think
// Auto-generated — paste into src/data/questionBank.js

const questionBank = {
  "energy_stores": [
    {
      "question": "Which of the following is a kinetic energy store?",
      "questionSubtitle": "Kinetic = movement energy",
      "options": [
        "A book on a shelf",
        "A stretched spring",
        "A moving car",
        "A battery"
      ],
      "correctAnswer": 2,
      "tier": 1,
      "senNote": "Think: is the object moving?"
    },
    {
      "question": "What type of energy store does food contain?",
      "questionSubtitle": "Think about what happens when you eat food",
      "options": [
        "Kinetic",
        "Thermal",
        "Chemical",
        "Nuclear"
      ],
      "correctAnswer": 2,
      "tier": 1,
      "senNote": "Food releases energy when digested — that's chemical energy"
    },
    {
      "question": "A ball is at the top of a hill. Which energy store does it have the most of?",
      "questionSubtitle": "It's high up and not moving yet",
      "options": [
        "Kinetic",
        "Elastic potential",
        "Gravitational potential",
        "Thermal"
      ],
      "correctAnswer": 2,
      "tier": 2,
      "senNote": "Height = gravitational potential energy"
    },
    {
      "question": "When a car brakes, kinetic energy is transferred to which store?",
      "questionSubtitle": "Friction heats things up",
      "options": [
        "Chemical",
        "Nuclear",
        "Gravitational potential",
        "Thermal"
      ],
      "correctAnswer": 3,
      "tier": 2,
      "senNote": "Brakes get hot — that's thermal energy"
    },
    {
      "question": "A pendulum swings back and forth. Describe the energy transfers between the highest and lowest points.",
      "questionSubtitle": "Think about height and speed at each point",
      "options": [
        "GPE → KE → GPE repeatedly",
        "KE → thermal only",
        "Chemical → KE only",
        "No energy transfer occurs"
      ],
      "correctAnswer": 0,
      "tier": 3,
      "senNote": "At the top: max GPE. At the bottom: max KE. Then back again."
    }
  ],
  "energy_pathways": [
    {
      "question": "Name the four energy transfer pathways.",
      "questionSubtitle": "How does energy move from one store to another?",
      "options": [
        "Mechanical, electrical, heating, radiation",
        "Kinetic, chemical, thermal, nuclear",
        "Conduction, convection, radiation, evaporation",
        "Friction, gravity, magnetism, electricity"
      ],
      "correctAnswer": 0,
      "tier": 1,
      "senNote": "Pathways are HOW energy moves, not WHERE it is stored"
    },
    {
      "question": "Which energy pathway transfers energy when a kettle heats water?",
      "questionSubtitle": "Think about what's plugged in and what gets hot",
      "options": [
        "Mechanical",
        "Electrical and heating",
        "Radiation only",
        "Nuclear"
      ],
      "correctAnswer": 1,
      "tier": 1,
      "senNote": "Electricity flows in → water heats up"
    },
    {
      "question": "A speaker plays music. Which pathway transfers energy to your ear?",
      "questionSubtitle": "Sound is a type of...",
      "options": [
        "Heating",
        "Electrical",
        "Mechanical (sound waves)",
        "Radiation"
      ],
      "correctAnswer": 2,
      "tier": 2,
      "senNote": "Sound waves are vibrations — that's mechanical transfer"
    },
    {
      "question": "A solar panel converts sunlight into electricity. Which pathways are involved?",
      "questionSubtitle": "Light arrives, then electricity flows",
      "options": [
        "Mechanical then heating",
        "Radiation then electrical",
        "Heating then mechanical",
        "Nuclear then radiation"
      ],
      "correctAnswer": 1,
      "tier": 2,
      "senNote": "Sunlight = radiation. Panel output = electrical."
    },
    {
      "question": "A wind turbine generates electricity. Trace the full energy pathway from wind to the National Grid.",
      "questionSubtitle": "Wind moves blades, blades turn generator...",
      "options": [
        "KE of wind → mechanical → electrical → heating in wires",
        "Chemical → thermal → electrical",
        "Radiation → electrical → mechanical",
        "Nuclear → mechanical → radiation"
      ],
      "correctAnswer": 0,
      "tier": 3,
      "senNote": "Follow the chain: moving air → spinning blades → generator → grid"
    }
  ],
  "energy_equations": [
    {
      "question": "What is the equation for kinetic energy?",
      "questionSubtitle": "It involves mass and speed",
      "options": [
        "KE = mgh",
        "KE = ½mv²",
        "KE = Fs",
        "KE = Pt"
      ],
      "correctAnswer": 1,
      "tier": 1,
      "senNote": "Remember: KE has a ½ and the speed is squared"
    },
    {
      "question": "What is the equation for gravitational potential energy?",
      "questionSubtitle": "It involves mass, gravity and height",
      "options": [
        "GPE = ½mv²",
        "GPE = Pt",
        "GPE = mgh",
        "GPE = Fs"
      ],
      "correctAnswer": 2,
      "tier": 1,
      "senNote": "GPE = mass × gravitational field strength × height"
    },
    {
      "question": "A 2 kg ball is 10 m above the ground. What is its GPE? (g = 10 N/kg)",
      "questionSubtitle": "Use GPE = mgh",
      "options": [
        "20 J",
        "200 J",
        "100 J",
        "2000 J"
      ],
      "correctAnswer": 1,
      "tier": 2,
      "senNote": "GPE = 2 × 10 × 10 = 200 J"
    },
    {
      "question": "A 500 g toy car travels at 4 m/s. What is its kinetic energy?",
      "questionSubtitle": "Convert grams to kg first, then use KE = ½mv²",
      "options": [
        "4 J",
        "1000 J",
        "8 J",
        "2 J"
      ],
      "correctAnswer": 0,
      "tier": 2,
      "senNote": "500 g = 0.5 kg. KE = ½ × 0.5 × 4² = ½ × 0.5 × 16 = 4 J"
    },
    {
      "question": "A 60 kg person runs at 8 m/s. How high could they jump if all KE converted to GPE? (g = 10 N/kg)",
      "questionSubtitle": "Set KE = GPE and rearrange for h",
      "options": [
        "1.92 m",
        "3.2 m",
        "4.8 m",
        "6.4 m"
      ],
      "correctAnswer": 1,
      "tier": 3,
      "senNote": "KE = ½ × 60 × 64 = 1920 J. h = 1920 ÷ (60 × 10) = 3.2 m"
    }
  ],
  "efficiency": [
    {
      "question": "What does efficiency measure?",
      "questionSubtitle": "It's about useful vs wasted energy",
      "options": [
        "How fast a machine works",
        "How much useful energy output compared to total input",
        "How much energy is created",
        "How loud a machine is"
      ],
      "correctAnswer": 1,
      "tier": 1,
      "senNote": "Efficiency = useful output ÷ total input"
    },
    {
      "question": "Can any real machine be 100% efficient?",
      "questionSubtitle": "Think about friction and heating",
      "options": [
        "Yes, electric motors are 100% efficient",
        "No, some energy is always wasted (usually as heat)",
        "Yes, if you remove all friction",
        "Only nuclear machines"
      ],
      "correctAnswer": 1,
      "tier": 1,
      "senNote": "There's always some wasted energy — usually thermal"
    },
    {
      "question": "A light bulb uses 60 J and produces 12 J of useful light. What is its efficiency?",
      "questionSubtitle": "Efficiency = useful output ÷ total input × 100%",
      "options": [
        "5%",
        "20%",
        "48%",
        "72%"
      ],
      "correctAnswer": 1,
      "tier": 2,
      "senNote": "12 ÷ 60 × 100 = 20%"
    },
    {
      "question": "A machine is 80% efficient and receives 500 J of input. How much useful energy does it produce?",
      "questionSubtitle": "Rearrange: useful output = efficiency × total input",
      "options": [
        "400 J",
        "100 J",
        "625 J",
        "80 J"
      ],
      "correctAnswer": 0,
      "tier": 2,
      "senNote": "0.80 × 500 = 400 J"
    },
    {
      "question": "LED bulbs are about 40% efficient. Filament bulbs are about 5% efficient. If both produce the same light, which uses less electrical energy and why?",
      "questionSubtitle": "Higher efficiency = less waste for the same useful output",
      "options": [
        "Filament, because it produces more heat",
        "LED, because more of its input becomes useful light",
        "They use the same amount",
        "Filament, because it's simpler"
      ],
      "correctAnswer": 1,
      "tier": 3,
      "senNote": "LED wastes less energy, so needs less input for the same light output"
    }
  ],
  "power_calc": [
    {
      "question": "What is the unit of power?",
      "questionSubtitle": "Named after James Watt",
      "options": [
        "Joules",
        "Newtons",
        "Watts",
        "Pascals"
      ],
      "correctAnswer": 2,
      "tier": 1,
      "senNote": "Power is measured in watts (W)"
    },
    {
      "question": "What does power tell you?",
      "questionSubtitle": "It's about how quickly energy is transferred",
      "options": [
        "The total energy used",
        "The rate of energy transfer",
        "The force applied",
        "The distance moved"
      ],
      "correctAnswer": 1,
      "tier": 1,
      "senNote": "Power = energy ÷ time. It's about SPEED of transfer."
    },
    {
      "question": "A 2000 W kettle is on for 3 minutes. How much energy does it transfer?",
      "questionSubtitle": "Convert minutes to seconds first, then E = P × t",
      "options": [
        "6000 J",
        "360000 J",
        "666 J",
        "2003 J"
      ],
      "correctAnswer": 1,
      "tier": 2,
      "senNote": "3 min = 180 s. E = 2000 × 180 = 360,000 J"
    },
    {
      "question": "A runner transfers 6000 J of energy in 20 seconds. What is their power output?",
      "questionSubtitle": "Use P = E ÷ t",
      "options": [
        "120000 W",
        "300 W",
        "30 W",
        "120 W"
      ],
      "correctAnswer": 1,
      "tier": 2,
      "senNote": "P = 6000 ÷ 20 = 300 W"
    },
    {
      "question": "Two students lift the same 50 kg weight to the same height. Student A takes 5 s, student B takes 10 s. Compare their power.",
      "questionSubtitle": "Same energy transferred, different times",
      "options": [
        "Student A has double the power of B",
        "Student B has double the power of A",
        "Both have the same power",
        "Cannot tell without knowing the height"
      ],
      "correctAnswer": 0,
      "tier": 3,
      "senNote": "Same work done, but A does it in half the time → double the power"
    }
  ],
  "energy_resources": [
    {
      "question": "Which of these is a non-renewable energy resource?",
      "questionSubtitle": "Non-renewable = will run out one day",
      "options": [
        "Solar",
        "Wind",
        "Natural gas",
        "Tidal"
      ],
      "correctAnswer": 2,
      "tier": 1,
      "senNote": "Fossil fuels (coal, oil, gas) and nuclear are non-renewable"
    },
    {
      "question": "What does 'renewable' mean when talking about energy resources?",
      "questionSubtitle": "Think about whether it can be replaced",
      "options": [
        "It's the cheapest option",
        "It will never run out / is replenished naturally",
        "It doesn't produce any waste",
        "It's the most powerful"
      ],
      "correctAnswer": 1,
      "tier": 1,
      "senNote": "Renewable = naturally replaced, won't run out"
    },
    {
      "question": "Give one advantage and one disadvantage of wind turbines.",
      "questionSubtitle": "Think about reliability and pollution",
      "options": [
        "Advantage: no fuel cost. Disadvantage: intermittent (depends on wind)",
        "Advantage: works at night. Disadvantage: produces CO₂",
        "Advantage: small footprint. Disadvantage: needs uranium",
        "Advantage: constant output. Disadvantage: expensive fuel"
      ],
      "correctAnswer": 0,
      "tier": 2,
      "senNote": "Wind is free and clean, but unreliable — no wind means no power"
    },
    {
      "question": "Why is nuclear power considered non-renewable even though it doesn't burn fossil fuels?",
      "questionSubtitle": "Think about the fuel it uses",
      "options": [
        "Because it produces CO₂",
        "Because uranium is a finite resource that will run out",
        "Because it uses water",
        "Because it needs wind"
      ],
      "correctAnswer": 1,
      "tier": 2,
      "senNote": "Uranium is mined and will eventually run out"
    },
    {
      "question": "A town needs a reliable 24/7 electricity supply with minimal CO₂ emissions. Which combination would you recommend?",
      "questionSubtitle": "Think about which sources are reliable AND low-carbon",
      "options": [
        "Solar + wind only",
        "Nuclear baseload + wind for peak demand",
        "Coal + gas",
        "Tidal only"
      ],
      "correctAnswer": 1,
      "tier": 3,
      "senNote": "Nuclear provides constant baseload; wind adds extra when available"
    }
  ],
  "circuit_basics": [
    {
      "question": "What is electric current?",
      "questionSubtitle": "Think about what flows through a wire",
      "options": [
        "The push from a battery",
        "The flow of charge (electrons) through a conductor",
        "The resistance of a wire",
        "The brightness of a bulb"
      ],
      "correctAnswer": 1,
      "tier": 1,
      "senNote": "Current = flow of charge. Measured in amps (A)."
    },
    {
      "question": "What is the unit of resistance?",
      "questionSubtitle": "Named after Georg Ohm",
      "options": [
        "Volts",
        "Amps",
        "Ohms (Ω)",
        "Watts"
      ],
      "correctAnswer": 2,
      "tier": 1,
      "senNote": "Resistance is measured in ohms (Ω)"
    },
    {
      "question": "A component has 12 V across it and 4 A flowing through. What is its resistance?",
      "questionSubtitle": "Use R = V ÷ I",
      "options": [
        "48 Ω",
        "3 Ω",
        "8 Ω",
        "16 Ω"
      ],
      "correctAnswer": 1,
      "tier": 2,
      "senNote": "R = 12 ÷ 4 = 3 Ω"
    },
    {
      "question": "If the resistance of a component doubles but voltage stays the same, what happens to the current?",
      "questionSubtitle": "Use V = IR. If R doubles...",
      "options": [
        "Current doubles",
        "Current halves",
        "Current stays the same",
        "Current becomes zero"
      ],
      "correctAnswer": 1,
      "tier": 2,
      "senNote": "V = IR → I = V/R. Double R means half the current."
    },
    {
      "question": "A wire carries 0.5 A for 2 minutes. How much charge flows through it?",
      "questionSubtitle": "Q = I × t (convert minutes to seconds)",
      "options": [
        "1 C",
        "60 C",
        "120 C",
        "0.004 C"
      ],
      "correctAnswer": 1,
      "tier": 3,
      "senNote": "2 min = 120 s. Q = 0.5 × 120 = 60 C"
    }
  ],
  "circuit_components": [
    {
      "question": "What happens to the resistance of a thermistor as temperature increases?",
      "questionSubtitle": "Therm- = heat",
      "options": [
        "Increases",
        "Decreases",
        "Stays the same",
        "Fluctuates randomly"
      ],
      "correctAnswer": 1,
      "tier": 1,
      "senNote": "Hot thermistor = low resistance"
    },
    {
      "question": "What does a diode do in a circuit?",
      "questionSubtitle": "Think about a one-way street",
      "options": [
        "Measures voltage",
        "Only allows current to flow in one direction",
        "Increases resistance",
        "Stores charge"
      ],
      "correctAnswer": 1,
      "tier": 1,
      "senNote": "Diode = one-way valve for current"
    },
    {
      "question": "An LDR is in a dark room. What is its resistance?",
      "questionSubtitle": "LDR = Light Dependent Resistor. No light means...",
      "options": [
        "Very low",
        "Very high",
        "Zero",
        "Exactly 1 Ω"
      ],
      "correctAnswer": 1,
      "tier": 2,
      "senNote": "Dark = high resistance. Bright = low resistance."
    },
    {
      "question": "On an I-V graph, a filament lamp curve bends. Why?",
      "questionSubtitle": "Think about what happens as the filament heats up",
      "options": [
        "The voltage drops",
        "Resistance increases as temperature rises",
        "Current flows backwards",
        "The lamp breaks"
      ],
      "correctAnswer": 1,
      "tier": 2,
      "senNote": "Hotter filament = more resistance = curve bends"
    },
    {
      "question": "A thermistor is used in a fire alarm circuit. Explain how it triggers the alarm when temperature rises.",
      "questionSubtitle": "Think about what happens to resistance, then current",
      "options": [
        "Resistance rises → current drops → alarm sounds",
        "Resistance drops → current increases → alarm triggers",
        "Resistance stays the same → voltage drops",
        "Thermistor melts → circuit breaks"
      ],
      "correctAnswer": 1,
      "tier": 3,
      "senNote": "Hot → low resistance → more current flows → triggers alarm"
    }
  ],
  "series_parallel": [
    {
      "question": "In a series circuit, what happens to the current at every point?",
      "questionSubtitle": "There's only one path for current",
      "options": [
        "It increases at each component",
        "It is the same everywhere",
        "It decreases as it goes",
        "It reverses direction"
      ],
      "correctAnswer": 1,
      "tier": 1,
      "senNote": "Series = one loop = same current throughout"
    },
    {
      "question": "In a parallel circuit, what is true about the voltage across each branch?",
      "questionSubtitle": "Each branch connects directly to the battery",
      "options": [
        "Voltage is shared equally",
        "Voltage is the same across each branch",
        "Voltage is zero in one branch",
        "Voltage doubles in each branch"
      ],
      "correctAnswer": 1,
      "tier": 1,
      "senNote": "Parallel branches all get the full supply voltage"
    },
    {
      "question": "Two resistors of 6 Ω each are in series. What is the total resistance?",
      "questionSubtitle": "In series, resistances add up",
      "options": [
        "3 Ω",
        "6 Ω",
        "12 Ω",
        "36 Ω"
      ],
      "correctAnswer": 2,
      "tier": 2,
      "senNote": "Series: R_total = R₁ + R₂ = 6 + 6 = 12 Ω"
    },
    {
      "question": "A 12 V battery is connected to two identical bulbs in series. What voltage does each bulb get?",
      "questionSubtitle": "In series, voltage is shared",
      "options": [
        "12 V each",
        "6 V each",
        "24 V total",
        "0 V each"
      ],
      "correctAnswer": 1,
      "tier": 2,
      "senNote": "Series: voltage shared equally between identical components = 6 V each"
    },
    {
      "question": "You add a third identical bulb in parallel to two bulbs already in parallel. What happens to total current from the battery?",
      "questionSubtitle": "Each branch draws its own current",
      "options": [
        "Total current decreases",
        "Total current increases",
        "Total current stays the same",
        "The battery voltage drops"
      ],
      "correctAnswer": 1,
      "tier": 3,
      "senNote": "More branches = more paths = more total current drawn"
    }
  ],
  "domestic_electricity": [
    {
      "question": "What is the voltage of UK mains electricity?",
      "questionSubtitle": "This is a key number to remember",
      "options": [
        "12 V",
        "50 V",
        "230 V",
        "400 V"
      ],
      "correctAnswer": 2,
      "tier": 1,
      "senNote": "UK mains = 230 V AC at 50 Hz"
    },
    {
      "question": "What colour is the live wire in a UK plug?",
      "questionSubtitle": "The live wire carries the full mains voltage",
      "options": [
        "Blue",
        "Brown",
        "Yellow and green",
        "Red"
      ],
      "correctAnswer": 1,
      "tier": 1,
      "senNote": "Brown = live. Blue = neutral. Yellow/green = earth."
    },
    {
      "question": "Why is the earth wire a safety feature?",
      "questionSubtitle": "Think about what happens if there's a fault",
      "options": [
        "It increases the current",
        "It provides a safe path for current to flow to the ground if there's a fault",
        "It makes the plug waterproof",
        "It increases the voltage"
      ],
      "correctAnswer": 1,
      "tier": 2,
      "senNote": "Fault → current flows through earth wire → fuse blows → circuit off"
    },
    {
      "question": "A fuse is rated at 3 A. The appliance normally draws 2.5 A. Is this fuse suitable?",
      "questionSubtitle": "The fuse should be just above the normal current",
      "options": [
        "No, it's too high",
        "Yes, it's just above the normal current",
        "No, it should be exactly 2.5 A",
        "Yes, but only for 5 minutes"
      ],
      "correctAnswer": 1,
      "tier": 2,
      "senNote": "Fuse must be slightly above normal current. 3 A > 2.5 A ✓"
    },
    {
      "question": "Explain why a double-insulated appliance doesn't need an earth wire.",
      "questionSubtitle": "Think about what material surrounds the wires",
      "options": [
        "Because it uses DC instead of AC",
        "Because all live parts are enclosed in plastic — no metal case to become live",
        "Because it has two fuses",
        "Because it uses a lower voltage"
      ],
      "correctAnswer": 1,
      "tier": 3,
      "senNote": "Plastic casing = no metal to touch = no shock risk = no earth needed"
    }
  ],
  "electrical_power": [
    {
      "question": "What is the equation linking power, current and voltage?",
      "questionSubtitle": "P = ? × ?",
      "options": [
        "P = V ÷ I",
        "P = V × I",
        "P = I ÷ V",
        "P = V²"
      ],
      "correctAnswer": 1,
      "tier": 1,
      "senNote": "P = VI (power = voltage × current)"
    },
    {
      "question": "What unit is electrical energy measured in on your electricity bill?",
      "questionSubtitle": "It's not joules — it's a bigger unit",
      "options": [
        "Watts",
        "Kilowatt-hours (kWh)",
        "Amps",
        "Volts"
      ],
      "correctAnswer": 1,
      "tier": 1,
      "senNote": "Electricity bills use kWh (kilowatt-hours)"
    },
    {
      "question": "A 3 kW heater runs for 2 hours. How many kWh of energy does it use?",
      "questionSubtitle": "Energy (kWh) = power (kW) × time (hours)",
      "options": [
        "1.5 kWh",
        "6 kWh",
        "5 kWh",
        "3000 kWh"
      ],
      "correctAnswer": 1,
      "tier": 2,
      "senNote": "E = 3 × 2 = 6 kWh"
    },
    {
      "question": "An appliance uses 2 A from a 230 V supply. What power does it use?",
      "questionSubtitle": "Use P = VI, then E = Pt",
      "options": [
        "P = 460 W",
        "P = 115 W",
        "P = 460 W",
        "P = 232 W"
      ],
      "correctAnswer": 0,
      "tier": 2,
      "senNote": "P = 230 × 2 = 460 W"
    },
    {
      "question": "Electricity costs 34p per kWh. A 100 W LED TV runs for 5 hours a day for 30 days. What's the cost?",
      "questionSubtitle": "Convert W to kW, find kWh, then multiply by cost",
      "options": [
        "£5.10",
        "£0.51",
        "£51.00",
        "£1.70"
      ],
      "correctAnswer": 0,
      "tier": 3,
      "senNote": "0.1 kW × 5 h × 30 = 15 kWh. 15 × £0.34 = £5.10"
    }
  ],
  "static_electricity": [
    {
      "question": "What particles transfer when objects are rubbed together to create static charge?",
      "questionSubtitle": "Protons don't move",
      "options": [
        "Protons",
        "Neutrons",
        "Electrons",
        "Ions"
      ],
      "correctAnswer": 2,
      "tier": 1,
      "senNote": "Only electrons transfer — protons stay in the nucleus"
    },
    {
      "question": "If an object gains electrons, what charge does it become?",
      "questionSubtitle": "Electrons are negative",
      "options": [
        "Positive",
        "Negative",
        "Neutral",
        "It depends on the material"
      ],
      "correctAnswer": 1,
      "tier": 1,
      "senNote": "Gain electrons → extra negative charge → negatively charged"
    },
    {
      "question": "A balloon is rubbed on hair. The balloon sticks to a wall. Why?",
      "questionSubtitle": "Think about what charge the balloon gained",
      "options": [
        "The balloon becomes magnetic",
        "The charged balloon induces an opposite charge on the wall surface, causing attraction",
        "The wall becomes an insulator",
        "Gravity pulls the balloon to the wall"
      ],
      "correctAnswer": 1,
      "tier": 2,
      "senNote": "Charged balloon → induces opposite charge on wall → attract"
    },
    {
      "question": "Why does static charge only build up on insulators, not conductors?",
      "questionSubtitle": "Think about what happens to electrons on a conductor",
      "options": [
        "Conductors are too heavy",
        "On conductors, electrons flow away immediately — charge can't build up",
        "Insulators are always positive",
        "Conductors don't have electrons"
      ],
      "correctAnswer": 1,
      "tier": 2,
      "senNote": "Conductors let charge flow away. Insulators trap it."
    },
    {
      "question": "A Van de Graaff generator makes your hair stand up. Explain why.",
      "questionSubtitle": "All your hairs get the same charge...",
      "options": [
        "The hairs become magnetic and point north",
        "Each hair gains the same charge, and like charges repel, so hairs push apart",
        "The electricity makes hair lighter",
        "Static removes gravity from hair"
      ],
      "correctAnswer": 1,
      "tier": 3,
      "senNote": "Same charge on each hair → like charges repel → hairs stand up"
    }
  ],
  "states_density": [
    {
      "question": "In which state of matter are particles packed closest together?",
      "questionSubtitle": "Think about solids, liquids and gases",
      "options": [
        "Gas",
        "Liquid",
        "Solid",
        "Plasma"
      ],
      "correctAnswer": 2,
      "tier": 1,
      "senNote": "Solid particles vibrate in fixed positions, packed tightly"
    },
    {
      "question": "What is the equation for density?",
      "questionSubtitle": "ρ = ?",
      "options": [
        "ρ = m × V",
        "ρ = m ÷ V",
        "ρ = V ÷ m",
        "ρ = m + V"
      ],
      "correctAnswer": 1,
      "tier": 1,
      "senNote": "Density = mass ÷ volume"
    },
    {
      "question": "A block has mass 240 g and dimensions 4 cm × 3 cm × 2 cm. What is its density?",
      "questionSubtitle": "Find volume first, then use ρ = m/V",
      "options": [
        "10 g/cm³",
        "24 g/cm³",
        "1 g/cm³",
        "48 g/cm³"
      ],
      "correctAnswer": 0,
      "tier": 2,
      "senNote": "V = 4×3×2 = 24 cm³. ρ = 240/24 = 10 g/cm³"
    },
    {
      "question": "How do you measure the volume of an irregular object like a stone?",
      "questionSubtitle": "You can't measure length × width × height",
      "options": [
        "Use a ruler",
        "Use a displacement can and measuring cylinder",
        "Weigh it",
        "Heat it until it melts"
      ],
      "correctAnswer": 1,
      "tier": 2,
      "senNote": "Submerge it in water and measure the displaced volume"
    },
    {
      "question": "An object has density 0.8 g/cm³. Will it float or sink in water (density 1.0 g/cm³)?",
      "questionSubtitle": "Compare the densities",
      "options": [
        "Sink — it's heavier",
        "Float — its density is less than water's",
        "It stays in the middle",
        "Cannot tell without knowing mass"
      ],
      "correctAnswer": 1,
      "tier": 3,
      "senNote": "Density < water density → it floats"
    }
  ],
  "internal_energy": [
    {
      "question": "What is internal energy?",
      "questionSubtitle": "Think about the energy particles have",
      "options": [
        "The temperature of an object",
        "The total kinetic and potential energy of all particles in a system",
        "The energy stored in chemical bonds",
        "The energy from the Sun"
      ],
      "correctAnswer": 1,
      "tier": 1,
      "senNote": "Internal energy = KE + PE of all particles"
    },
    {
      "question": "What is specific heat capacity?",
      "questionSubtitle": "It tells you how much energy is needed to heat something",
      "options": [
        "The temperature at which a material melts",
        "The energy needed to raise 1 kg of a material by 1°C",
        "The total energy in an object",
        "The speed of heat transfer"
      ],
      "correctAnswer": 1,
      "tier": 1,
      "senNote": "SHC = energy per kg per degree"
    },
    {
      "question": "How much energy is needed to heat 0.5 kg of water by 10°C? (c = 4200 J/kg°C)",
      "questionSubtitle": "Use ΔE = mcΔθ",
      "options": [
        "2100 J",
        "21000 J",
        "42000 J",
        "4200 J"
      ],
      "correctAnswer": 1,
      "tier": 2,
      "senNote": "ΔE = 0.5 × 4200 × 10 = 21,000 J"
    },
    {
      "question": "When a substance changes state, does its temperature change?",
      "questionSubtitle": "Think about what the energy is being used for",
      "options": [
        "Yes, it always increases",
        "No — temperature stays constant during a change of state",
        "It decreases",
        "It depends on the material"
      ],
      "correctAnswer": 1,
      "tier": 2,
      "senNote": "Energy goes into breaking bonds, not raising temperature"
    },
    {
      "question": "3000 J of energy heats 0.2 kg of metal by 50°C. What is the specific heat capacity?",
      "questionSubtitle": "Rearrange ΔE = mcΔθ to find c",
      "options": [
        "300 J/kg°C",
        "750 J/kg°C",
        "150 J/kg°C",
        "30000 J/kg°C"
      ],
      "correctAnswer": 0,
      "tier": 3,
      "senNote": "c = ΔE ÷ (m × Δθ) = 3000 ÷ (0.2 × 50) = 300 J/kg°C"
    }
  ],
  "gas_pressure": [
    {
      "question": "What causes gas pressure?",
      "questionSubtitle": "Think about what gas particles do",
      "options": [
        "Gas is heavy",
        "Gas particles collide with the walls of their container",
        "Gas particles stick together",
        "Gravity pulls gas down"
      ],
      "correctAnswer": 1,
      "tier": 1,
      "senNote": "Particles move randomly → hit container walls → pressure"
    },
    {
      "question": "What happens to gas pressure when temperature increases (at constant volume)?",
      "questionSubtitle": "Hotter particles move faster...",
      "options": [
        "Pressure decreases",
        "Pressure increases",
        "Pressure stays the same",
        "Volume increases"
      ],
      "correctAnswer": 1,
      "tier": 1,
      "senNote": "Faster particles → harder/more frequent collisions → more pressure"
    },
    {
      "question": "A gas has pressure 100 kPa and volume 10 cm³. If compressed to 5 cm³, what is the new pressure?",
      "questionSubtitle": "Use pV = constant",
      "options": [
        "50 kPa",
        "200 kPa",
        "500 kPa",
        "100 kPa"
      ],
      "correctAnswer": 1,
      "tier": 2,
      "senNote": "p₁V₁ = p₂V₂ → 100 × 10 = p₂ × 5 → p₂ = 200 kPa"
    },
    {
      "question": "Why does a sealed container of gas have higher pressure on a hot day?",
      "questionSubtitle": "Temperature increases but volume can't change...",
      "options": [
        "More gas enters the container",
        "Particles move faster, hitting walls harder and more often",
        "The container expands",
        "Gas particles get bigger"
      ],
      "correctAnswer": 1,
      "tier": 2,
      "senNote": "Hotter → faster particles → more forceful collisions → higher pressure"
    },
    {
      "question": "A balloon is taken from a warm room (300 K) to outside (250 K). Its initial volume is 2.4 L. What is its new volume?",
      "questionSubtitle": "Use V₁/T₁ = V₂/T₂",
      "options": [
        "2.0 L",
        "2.88 L",
        "1.2 L",
        "3.0 L"
      ],
      "correctAnswer": 0,
      "tier": 3,
      "senNote": "V₂ = V₁ × T₂/T₁ = 2.4 × 250/300 = 2.0 L"
    }
  ],
  "atomic_structure": [
    {
      "question": "What are the three subatomic particles in an atom?",
      "questionSubtitle": "They're in the nucleus and around it",
      "options": [
        "Protons, neutrons, electrons",
        "Atoms, molecules, ions",
        "Alpha, beta, gamma",
        "Quarks, leptons, bosons"
      ],
      "correctAnswer": 0,
      "tier": 1,
      "senNote": "Protons (+) and neutrons (0) in nucleus; electrons (−) orbit"
    },
    {
      "question": "What is the charge on a proton?",
      "questionSubtitle": "Remember: proton = positive",
      "options": [
        "+1",
        "−1",
        "0",
        "+2"
      ],
      "correctAnswer": 0,
      "tier": 1,
      "senNote": "Proton = +1, Electron = −1, Neutron = 0"
    },
    {
      "question": "An atom has 11 protons and 12 neutrons. What is its mass number?",
      "questionSubtitle": "Mass number = protons + neutrons",
      "options": [
        "11",
        "12",
        "23",
        "1"
      ],
      "correctAnswer": 2,
      "tier": 2,
      "senNote": "Mass number = 11 + 12 = 23"
    },
    {
      "question": "What is an isotope?",
      "questionSubtitle": "Same element, different...",
      "options": [
        "An atom with a different number of electrons",
        "Atoms of the same element with different numbers of neutrons",
        "A completely different element",
        "An atom with no neutrons"
      ],
      "correctAnswer": 1,
      "tier": 2,
      "senNote": "Same protons, different neutrons = isotope"
    },
    {
      "question": "Chlorine has two isotopes: Cl-35 (75%) and Cl-37 (25%). Calculate the relative atomic mass.",
      "questionSubtitle": "Weighted average",
      "options": [
        "36.0",
        "35.5",
        "36.5",
        "35.0"
      ],
      "correctAnswer": 1,
      "tier": 3,
      "senNote": "(35 × 0.75) + (37 × 0.25) = 35.5"
    }
  ],
  "atomic_model_history": [
    {
      "question": "What was the 'plum pudding' model?",
      "questionSubtitle": "Think about plum pudding: a blob with bits in it",
      "options": [
        "Atoms are solid spheres",
        "A ball of positive charge with electrons embedded in it",
        "Electrons orbit a nucleus",
        "Atoms are made of quarks"
      ],
      "correctAnswer": 1,
      "tier": 1,
      "senNote": "Thomson's model: positive 'pudding' with negative 'plums' (electrons)"
    },
    {
      "question": "Who carried out the alpha particle scattering experiment?",
      "questionSubtitle": "His students were Geiger and Marsden",
      "options": [
        "Thomson",
        "Rutherford",
        "Bohr",
        "Dalton"
      ],
      "correctAnswer": 1,
      "tier": 1,
      "senNote": "Rutherford fired alpha at gold foil"
    },
    {
      "question": "Most alpha particles passed straight through the gold foil. What does this tell us?",
      "questionSubtitle": "If most go through, most of the atom is...",
      "options": [
        "The atom is solid",
        "The atom is mostly empty space",
        "Gold is very thin",
        "Alpha particles are very small"
      ],
      "correctAnswer": 1,
      "tier": 2,
      "senNote": "Most of the atom is empty space"
    },
    {
      "question": "How did Bohr improve on Rutherford's model?",
      "questionSubtitle": "Think about where Bohr said electrons are",
      "options": [
        "He discovered neutrons",
        "He said electrons orbit in fixed energy levels (shells)",
        "He split the atom",
        "He discovered protons"
      ],
      "correctAnswer": 1,
      "tier": 2,
      "senNote": "Bohr: electrons in specific shells, not random orbits"
    },
    {
      "question": "Why is the scientific model of the atom always changing?",
      "questionSubtitle": "Think about how science works",
      "options": [
        "Scientists keep making mistakes",
        "New experimental evidence leads to models being revised and improved",
        "Old scientists were less intelligent",
        "Models only change every 100 years"
      ],
      "correctAnswer": 1,
      "tier": 3,
      "senNote": "Science is iterative: new evidence → revised models"
    }
  ],
  "radioactive_decay": [
    {
      "question": "What is radioactive decay?",
      "questionSubtitle": "Unstable nuclei do something...",
      "options": [
        "An atom splitting in half",
        "An unstable nucleus emitting radiation to become more stable",
        "Electrons leaving an atom",
        "Atoms combining together"
      ],
      "correctAnswer": 1,
      "tier": 1,
      "senNote": "Unstable nucleus → emits radiation → becomes more stable"
    },
    {
      "question": "Which type of radiation is stopped by a sheet of paper?",
      "questionSubtitle": "Think about which is the biggest, least penetrating particle",
      "options": [
        "Gamma",
        "Beta",
        "Alpha",
        "X-rays"
      ],
      "correctAnswer": 2,
      "tier": 1,
      "senNote": "Alpha: stopped by paper. Beta: aluminium. Gamma: thick lead."
    },
    {
      "question": "A beta particle is emitted during decay. What has happened inside the nucleus?",
      "questionSubtitle": "A neutron changes into...",
      "options": [
        "A proton has left the nucleus",
        "A neutron has turned into a proton and an electron (beta particle)",
        "An electron has been captured",
        "Two protons have fused"
      ],
      "correctAnswer": 1,
      "tier": 2,
      "senNote": "Neutron → proton + electron. The electron is emitted as beta."
    },
    {
      "question": "Alpha radiation is the most ionising. Why?",
      "questionSubtitle": "Think about its size and charge",
      "options": [
        "It travels the fastest",
        "It has the largest charge (+2) and mass, so interacts strongly",
        "It is the smallest particle",
        "It has no charge"
      ],
      "correctAnswer": 1,
      "tier": 2,
      "senNote": "Big charge + big mass = strong interaction = high ionisation"
    },
    {
      "question": "Gamma radiation is used to treat cancer but alpha would be dangerous. Why can gamma be used safely?",
      "questionSubtitle": "Think about penetration vs ionisation",
      "options": [
        "Gamma is not harmful at all",
        "Gamma penetrates to the tumour from outside; alpha can't get through skin",
        "Gamma is cheaper",
        "Alpha particles are too fast"
      ],
      "correctAnswer": 1,
      "tier": 3,
      "senNote": "Gamma penetrates body → reaches tumour from outside."
    }
  ],
  "nuclear_equations": [
    {
      "question": "In alpha decay, what is emitted?",
      "questionSubtitle": "An alpha particle is the same as a helium nucleus",
      "options": [
        "An electron",
        "A helium nucleus (2 protons + 2 neutrons)",
        "A neutron",
        "A gamma ray"
      ],
      "correctAnswer": 1,
      "tier": 1,
      "senNote": "Alpha particle = ⁴₂He"
    },
    {
      "question": "In beta decay, what happens to the atomic number?",
      "questionSubtitle": "A neutron turns into a proton...",
      "options": [
        "Decreases by 1",
        "Increases by 1",
        "Stays the same",
        "Decreases by 2"
      ],
      "correctAnswer": 1,
      "tier": 1,
      "senNote": "Extra proton → atomic number goes up by 1"
    },
    {
      "question": "Uranium-238 undergoes alpha decay. What are the mass number and atomic number of the daughter nucleus?",
      "questionSubtitle": "Alpha removes 4 from mass number and 2 from atomic number",
      "options": [
        "Mass 234, Atomic 90",
        "Mass 236, Atomic 92",
        "Mass 237, Atomic 91",
        "Mass 234, Atomic 92"
      ],
      "correctAnswer": 0,
      "tier": 2,
      "senNote": "238−4 = 234. 92−2 = 90."
    },
    {
      "question": "Carbon-14 undergoes beta decay. What element does it become?",
      "questionSubtitle": "Atomic number increases by 1. What element has 7 protons?",
      "options": [
        "Boron (5)",
        "Carbon (6)",
        "Nitrogen (7)",
        "Oxygen (8)"
      ],
      "correctAnswer": 2,
      "tier": 2,
      "senNote": "Beta decay: Z goes up by 1. Element 7 = nitrogen."
    },
    {
      "question": "Does gamma emission change the mass number or atomic number?",
      "questionSubtitle": "What IS a gamma ray?",
      "options": [
        "Yes — it removes protons",
        "No — gamma is pure energy with no mass or charge",
        "Yes — it removes neutrons",
        "It depends on the element"
      ],
      "correctAnswer": 1,
      "tier": 3,
      "senNote": "Gamma = EM wave. No particles lost. A and Z unchanged."
    }
  ],
  "half_life": [
    {
      "question": "What is the definition of half-life?",
      "questionSubtitle": "It's about how long it takes for something to halve",
      "options": [
        "The time for all atoms to decay",
        "The time for the number of radioactive nuclei (or activity) to halve",
        "The time for radiation to stop",
        "Half the life of an atom"
      ],
      "correctAnswer": 1,
      "tier": 1,
      "senNote": "Half-life = time for activity or number of undecayed nuclei to halve"
    },
    {
      "question": "Is radioactive decay random or predictable for individual atoms?",
      "questionSubtitle": "Can you predict when ONE atom will decay?",
      "options": [
        "Completely predictable",
        "Random — you can't predict when a specific atom will decay",
        "Only predictable with a computer",
        "It follows a strict pattern"
      ],
      "correctAnswer": 1,
      "tier": 1,
      "senNote": "Random for each atom, but predictable for large numbers"
    },
    {
      "question": "A sample starts with 1200 Bq. After 2 half-lives, what is the activity?",
      "questionSubtitle": "Halve it, then halve again",
      "options": [
        "600 Bq",
        "300 Bq",
        "150 Bq",
        "400 Bq"
      ],
      "correctAnswer": 1,
      "tier": 2,
      "senNote": "1200 → 600 → 300 Bq"
    },
    {
      "question": "A sample takes 30 minutes to drop from 800 Bq to 100 Bq. What is the half-life?",
      "questionSubtitle": "How many halvings? 800→400→200→100",
      "options": [
        "10 minutes",
        "15 minutes",
        "30 minutes",
        "5 minutes"
      ],
      "correctAnswer": 0,
      "tier": 2,
      "senNote": "3 half-lives in 30 mins → half-life = 10 minutes"
    },
    {
      "question": "A radioactive tracer for medical imaging should have a half-life of a few hours. Why not seconds? Why not years?",
      "questionSubtitle": "Think about detection time and patient safety",
      "options": [
        "Seconds: gone before scan. Years: patient exposed for too long.",
        "Seconds: too expensive. Years: too cheap.",
        "Seconds: too penetrating. Years: not penetrating enough.",
        "It doesn't matter — any half-life works."
      ],
      "correctAnswer": 0,
      "tier": 3,
      "senNote": "Needs to last long enough for the scan, but not expose patient too long"
    }
  ],
  "radiation_hazards": [
    {
      "question": "Name two sources of background radiation.",
      "questionSubtitle": "Natural and man-made sources",
      "options": [
        "Wi-Fi and mobile phones",
        "Radon gas from rocks and cosmic rays from space",
        "Microwaves and radio waves",
        "Sound waves and ultrasound"
      ],
      "correctAnswer": 1,
      "tier": 1,
      "senNote": "Natural: radon gas, cosmic rays. Man-made: medical scans."
    },
    {
      "question": "What is irradiation?",
      "questionSubtitle": "Being exposed to radiation without touching the source",
      "options": [
        "Swallowing a radioactive source",
        "Being exposed to radiation from a source outside your body",
        "Becoming radioactive yourself",
        "A type of cooking"
      ],
      "correctAnswer": 1,
      "tier": 1,
      "senNote": "Irradiation = exposed from outside. Contamination = source ON/IN you."
    },
    {
      "question": "Why is contamination generally more dangerous than irradiation?",
      "questionSubtitle": "Think about what happens when the source is INSIDE you",
      "options": [
        "Because the source stays near/inside your body, continuously exposing cells",
        "Because irradiation is always low energy",
        "Because contamination is always gamma",
        "Because irradiation doesn't reach you"
      ],
      "correctAnswer": 0,
      "tier": 2,
      "senNote": "Contamination: source in/on you → continuous, close-range exposure"
    },
    {
      "question": "How can workers reduce their exposure to radiation?",
      "questionSubtitle": "Think about time, distance and shielding",
      "options": [
        "Wear shorts and open windows",
        "Use lead shielding and minimise time near the source",
        "Turn off all electricity",
        "Use rubber gloves only"
      ],
      "correctAnswer": 1,
      "tier": 2,
      "senNote": "Lead shielding + less time + more distance = less exposure"
    },
    {
      "question": "Smoke detectors use americium-241 (alpha emitter, half-life 432 years). Why is alpha suitable?",
      "questionSubtitle": "Think about range, ionisation, and how long it should last",
      "options": [
        "Alpha is easily absorbed so safe outside the detector; long half-life means it works for years",
        "Alpha penetrates walls; short half-life is safer",
        "Alpha is cheapest; half-life doesn't matter",
        "Alpha is most penetrating; long half-life = faster decay"
      ],
      "correctAnswer": 0,
      "tier": 3,
      "senNote": "Alpha: very short range (safe). Long half-life: works for decades."
    }
  ],
  "nuclear_fission": [
    {
      "question": "What is nuclear fission?",
      "questionSubtitle": "Fission = splitting",
      "options": [
        "Two small nuclei joining together",
        "A large unstable nucleus splitting into two smaller nuclei",
        "An electron being emitted",
        "An atom absorbing light"
      ],
      "correctAnswer": 1,
      "tier": 1,
      "senNote": "Big nucleus splits into two smaller ones + neutrons + energy"
    },
    {
      "question": "What triggers fission in a nuclear reactor?",
      "questionSubtitle": "Something is absorbed by the nucleus",
      "options": [
        "Heat",
        "A neutron is absorbed by the nucleus",
        "Gamma radiation",
        "An electric current"
      ],
      "correctAnswer": 1,
      "tier": 1,
      "senNote": "Neutron absorbed → nucleus becomes unstable → splits"
    },
    {
      "question": "What is a chain reaction?",
      "questionSubtitle": "Each fission releases neutrons that can...",
      "options": [
        "A single atom decaying repeatedly",
        "Each fission releases neutrons that cause further fissions",
        "Atoms linking together in a chain",
        "A controlled explosion"
      ],
      "correctAnswer": 1,
      "tier": 2,
      "senNote": "1 fission → 2-3 neutrons → each causes more fission → chain reaction"
    },
    {
      "question": "What do control rods do in a nuclear reactor?",
      "questionSubtitle": "They absorb something to control the reaction",
      "options": [
        "They speed up the reaction",
        "They absorb excess neutrons to control the chain reaction",
        "They cool the reactor",
        "They produce electricity"
      ],
      "correctAnswer": 1,
      "tier": 2,
      "senNote": "Control rods absorb neutrons → fewer fissions → controlled rate"
    },
    {
      "question": "Why does fission release so much energy compared to chemical reactions?",
      "questionSubtitle": "Think about what force is involved",
      "options": [
        "Because nuclear fuels are heavier",
        "Because nuclear forces are much stronger than chemical bonds",
        "Because fission happens faster",
        "Because nuclear fuel burns hotter"
      ],
      "correctAnswer": 1,
      "tier": 3,
      "senNote": "Nuclear strong force >> chemical bonds. Tiny mass lost → huge energy (E=mc²)"
    }
  ],
  "nuclear_fusion": [
    {
      "question": "What is nuclear fusion?",
      "questionSubtitle": "Fusion = joining together",
      "options": [
        "A large nucleus splitting apart",
        "Two small nuclei joining to form a larger nucleus",
        "An electron being absorbed",
        "Radioactive decay"
      ],
      "correctAnswer": 1,
      "tier": 1,
      "senNote": "Two light nuclei combine → larger nucleus + energy"
    },
    {
      "question": "Where does nuclear fusion naturally occur?",
      "questionSubtitle": "Think about what powers the stars",
      "options": [
        "Inside nuclear reactors",
        "In the core of stars (including our Sun)",
        "Underground in volcanoes",
        "In lightning strikes"
      ],
      "correctAnswer": 1,
      "tier": 1,
      "senNote": "Stars are powered by hydrogen fusing into helium"
    },
    {
      "question": "Why does fusion require extremely high temperatures?",
      "questionSubtitle": "Think about the charges on nuclei",
      "options": [
        "To melt the nuclei first",
        "To give nuclei enough kinetic energy to overcome electrostatic repulsion",
        "To create neutrons",
        "To boil the hydrogen"
      ],
      "correctAnswer": 1,
      "tier": 2,
      "senNote": "Both nuclei positive → repel → need massive KE to overcome this"
    },
    {
      "question": "Why is fusion difficult to achieve on Earth?",
      "questionSubtitle": "Think about the conditions needed",
      "options": [
        "We don't have the right fuel",
        "Maintaining the extreme temperature and pressure needed is very difficult",
        "Fusion doesn't release enough energy",
        "We need special atoms from space"
      ],
      "correctAnswer": 1,
      "tier": 2,
      "senNote": "Plasma must be contained at ~100 million °C — incredibly hard"
    },
    {
      "question": "Compare fission and fusion: which produces more energy per kg?",
      "questionSubtitle": "Think about the products of each reaction",
      "options": [
        "Fission produces more energy; fusion produces more waste",
        "Fusion produces more energy per kg; fission produces long-lived radioactive waste",
        "Both produce the same energy and waste",
        "Neither produces waste"
      ],
      "correctAnswer": 1,
      "tier": 3,
      "senNote": "Fusion: more energy per kg, less dangerous waste."
    }
  ],
  "force_interactions": [
    {
      "question": "What is the difference between a contact force and a non-contact force?",
      "questionSubtitle": "Does the object need to touch?",
      "options": [
        "Contact forces are stronger",
        "Contact forces require physical touching; non-contact forces act at a distance",
        "Non-contact forces don't exist",
        "There is no difference"
      ],
      "correctAnswer": 1,
      "tier": 1,
      "senNote": "Contact: friction. Non-contact: gravity, magnetism."
    },
    {
      "question": "Is weight a scalar or vector quantity?",
      "questionSubtitle": "Weight has a direction",
      "options": [
        "Scalar",
        "Vector",
        "Neither",
        "Both"
      ],
      "correctAnswer": 1,
      "tier": 1,
      "senNote": "Weight = force due to gravity. Has direction (downward) → vector."
    },
    {
      "question": "A 5 kg object is on Earth (g = 10 N/kg). What is its weight?",
      "questionSubtitle": "Use W = mg",
      "options": [
        "50 N",
        "5 N",
        "0.5 N",
        "500 N"
      ],
      "correctAnswer": 0,
      "tier": 2,
      "senNote": "W = 5 × 10 = 50 N"
    },
    {
      "question": "A car has a driving force of 2000 N and friction of 800 N. What is the resultant force?",
      "questionSubtitle": "Resultant = difference when opposite",
      "options": [
        "2800 N forward",
        "1200 N forward",
        "800 N backward",
        "2000 N forward"
      ],
      "correctAnswer": 1,
      "tier": 2,
      "senNote": "2000 − 800 = 1200 N forward"
    },
    {
      "question": "An object has zero resultant force. Does this mean it must be stationary?",
      "questionSubtitle": "Think about Newton's first law",
      "options": [
        "Yes — no force means no movement",
        "No — it could be moving at constant velocity",
        "Yes — it will always slow down",
        "No — it must be accelerating"
      ],
      "correctAnswer": 1,
      "tier": 3,
      "senNote": "Zero resultant → no acceleration. Could be stationary OR constant velocity."
    }
  ],
  "work_done": [
    {
      "question": "What is work done?",
      "questionSubtitle": "It involves force and distance",
      "options": [
        "The same as power",
        "Energy transferred when a force moves an object",
        "The speed of an object",
        "The weight of an object"
      ],
      "correctAnswer": 1,
      "tier": 1,
      "senNote": "Work done = energy transferred by a force over a distance"
    },
    {
      "question": "What is the unit of work done?",
      "questionSubtitle": "Same as energy",
      "options": [
        "Newtons",
        "Joules",
        "Watts",
        "Metres"
      ],
      "correctAnswer": 1,
      "tier": 1,
      "senNote": "Work done is measured in joules (J)"
    },
    {
      "question": "A force of 20 N pushes a box 5 m. How much work is done?",
      "questionSubtitle": "W = F × d",
      "options": [
        "4 J",
        "25 J",
        "100 J",
        "0.25 J"
      ],
      "correctAnswer": 2,
      "tier": 2,
      "senNote": "W = 20 × 5 = 100 J"
    },
    {
      "question": "1500 J of work is done with a force of 50 N. How far did it move?",
      "questionSubtitle": "Rearrange W = Fd → d = W/F",
      "options": [
        "75000 m",
        "30 m",
        "1450 m",
        "3 m"
      ],
      "correctAnswer": 1,
      "tier": 2,
      "senNote": "d = 1500 ÷ 50 = 30 m"
    },
    {
      "question": "A person pushes a 200 N box up a 3 m ramp. The box gains 400 J of GPE. How much energy was wasted?",
      "questionSubtitle": "Total work in vs useful energy out",
      "options": [
        "200 J",
        "600 J",
        "100 J",
        "400 J"
      ],
      "correctAnswer": 0,
      "tier": 3,
      "senNote": "Work = 200 × 3 = 600 J. Useful = 400 J. Wasted = 200 J."
    }
  ],
  "hookes_law": [
    {
      "question": "What does Hooke's Law state?",
      "questionSubtitle": "It's about springs and stretching",
      "options": [
        "Force = mass × acceleration",
        "Extension is directly proportional to force (up to the limit of proportionality)",
        "Energy = force × distance",
        "Pressure = force ÷ area"
      ],
      "correctAnswer": 1,
      "tier": 1,
      "senNote": "F = ke"
    },
    {
      "question": "What is the limit of proportionality?",
      "questionSubtitle": "Beyond this point, the spring doesn't obey Hooke's Law",
      "options": [
        "When the spring breaks",
        "The point beyond which force and extension are no longer proportional",
        "When extension equals zero",
        "When the spring returns to normal"
      ],
      "correctAnswer": 1,
      "tier": 1,
      "senNote": "Past this point, the graph curves"
    },
    {
      "question": "A spring extends by 0.1 m when a 5 N force is applied. What is the spring constant?",
      "questionSubtitle": "Use k = F ÷ e",
      "options": [
        "0.5 N/m",
        "0.02 N/m",
        "50 N/m",
        "500 N/m"
      ],
      "correctAnswer": 2,
      "tier": 2,
      "senNote": "k = 5 ÷ 0.1 = 50 N/m"
    },
    {
      "question": "A spring has k = 40 N/m and is extended by 0.25 m. How much elastic PE is stored?",
      "questionSubtitle": "Use Ee = ½ke²",
      "options": [
        "10 J",
        "5 J",
        "1.25 J",
        "2.5 J"
      ],
      "correctAnswer": 2,
      "tier": 2,
      "senNote": "Ee = ½ × 40 × 0.25² = 1.25 J"
    },
    {
      "question": "Two identical springs (k = 30 N/m each) in series. A 15 N weight is hung. What is total extension?",
      "questionSubtitle": "In series, each spring stretches fully",
      "options": [
        "0.25 m",
        "0.5 m",
        "1.0 m",
        "0.75 m"
      ],
      "correctAnswer": 2,
      "tier": 3,
      "senNote": "Each: e = 15/30 = 0.5 m. Total = 1.0 m"
    }
  ],
  "moments": [
    {
      "question": "What is a moment?",
      "questionSubtitle": "It's the turning effect of a force",
      "options": [
        "A very short time",
        "The turning effect of a force about a pivot",
        "The speed of rotation",
        "The weight of an object"
      ],
      "correctAnswer": 1,
      "tier": 1,
      "senNote": "Moment = force × distance from pivot"
    },
    {
      "question": "What is the unit of a moment?",
      "questionSubtitle": "Force × distance",
      "options": [
        "Joules",
        "Newtons",
        "Newton-metres (Nm)",
        "Watts"
      ],
      "correctAnswer": 2,
      "tier": 1,
      "senNote": "Measured in Nm"
    },
    {
      "question": "A 40 N force acts 0.5 m from a pivot. What is the moment?",
      "questionSubtitle": "Moment = F × d",
      "options": [
        "80 Nm",
        "20 Nm",
        "39.5 Nm",
        "40.5 Nm"
      ],
      "correctAnswer": 1,
      "tier": 2,
      "senNote": "M = 40 × 0.5 = 20 Nm"
    },
    {
      "question": "For a seesaw to be balanced, what must be true?",
      "questionSubtitle": "Clockwise vs anticlockwise",
      "options": [
        "Both sides must be the same length",
        "Clockwise moment must equal anticlockwise moment",
        "Both people must weigh the same",
        "The pivot must be at the end"
      ],
      "correctAnswer": 1,
      "tier": 2,
      "senNote": "Balanced: clockwise moment = anticlockwise moment"
    },
    {
      "question": "A door handle is far from the hinge. Why does this make the door easier to open?",
      "questionSubtitle": "moment = F × d",
      "options": [
        "It makes the door lighter",
        "Greater distance from pivot means a larger moment for the same force",
        "It changes the direction of the force",
        "It reduces friction"
      ],
      "correctAnswer": 1,
      "tier": 3,
      "senNote": "Same push × bigger distance = bigger moment = easier to open"
    }
  ],
  "fluid_pressure": [
    {
      "question": "What is the equation for pressure?",
      "questionSubtitle": "Pressure involves force and area",
      "options": [
        "P = F × A",
        "P = F ÷ A",
        "P = A ÷ F",
        "P = m × g"
      ],
      "correctAnswer": 1,
      "tier": 1,
      "senNote": "Pressure = force ÷ area"
    },
    {
      "question": "Why do deep-sea fish experience more pressure?",
      "questionSubtitle": "Think about the weight of water above them",
      "options": [
        "Because the water is colder",
        "Because there is more water above them, pushing down",
        "Because they swim faster",
        "Because salt increases pressure"
      ],
      "correctAnswer": 1,
      "tier": 1,
      "senNote": "More depth = more water above = more pressure"
    },
    {
      "question": "A person weighing 600 N stands on one foot (area 0.02 m²). What pressure?",
      "questionSubtitle": "P = F/A",
      "options": [
        "12 Pa",
        "30000 Pa",
        "12000 Pa",
        "0.00003 Pa"
      ],
      "correctAnswer": 1,
      "tier": 2,
      "senNote": "P = 600 ÷ 0.02 = 30,000 Pa"
    },
    {
      "question": "Calculate pressure at 20 m depth in seawater. (ρ = 1025 kg/m³, g = 10 N/kg)",
      "questionSubtitle": "Use P = ρgh",
      "options": [
        "205000 Pa",
        "20500 Pa",
        "512.5 Pa",
        "2050 Pa"
      ],
      "correctAnswer": 0,
      "tier": 2,
      "senNote": "P = 1025 × 10 × 20 = 205,000 Pa"
    },
    {
      "question": "Explain why a drawing pin has a sharp point and a flat head.",
      "questionSubtitle": "Same force, different areas...",
      "options": [
        "The sharp point looks better",
        "Sharp point: small area → high pressure. Flat head: large area → low pressure on thumb.",
        "The metal is stronger at the point",
        "It's easier to manufacture"
      ],
      "correctAnswer": 1,
      "tier": 3,
      "senNote": "Same force. Small area at tip = high pressure. Large area at head = comfortable."
    }
  ],
  "motion_graphs": [
    {
      "question": "On a distance-time graph, what does a horizontal line mean?",
      "questionSubtitle": "Distance isn't changing...",
      "options": [
        "Moving at constant speed",
        "Stationary (not moving)",
        "Accelerating",
        "Decelerating"
      ],
      "correctAnswer": 1,
      "tier": 1,
      "senNote": "Flat line = not moving"
    },
    {
      "question": "On a velocity-time graph, what does the gradient represent?",
      "questionSubtitle": "Change in velocity over time...",
      "options": [
        "Distance",
        "Acceleration",
        "Speed",
        "Force"
      ],
      "correctAnswer": 1,
      "tier": 1,
      "senNote": "Gradient of v-t graph = acceleration"
    },
    {
      "question": "A car accelerates from 0 to 20 m/s in 10 seconds. What is its acceleration?",
      "questionSubtitle": "a = Δv ÷ t",
      "options": [
        "200 m/s²",
        "2 m/s²",
        "10 m/s²",
        "0.5 m/s²"
      ],
      "correctAnswer": 1,
      "tier": 2,
      "senNote": "a = (20−0) ÷ 10 = 2 m/s²"
    },
    {
      "question": "A car travels at 15 m/s for 20 seconds. What distance?",
      "questionSubtitle": "distance = speed × time",
      "options": [
        "300 m",
        "35 m",
        "0.75 m",
        "1.33 m"
      ],
      "correctAnswer": 0,
      "tier": 2,
      "senNote": "d = 15 × 20 = 300 m"
    },
    {
      "question": "A v-t graph shows a triangle with base 8 s and height 12 m/s. What distance?",
      "questionSubtitle": "Area under v-t graph = distance",
      "options": [
        "96 m",
        "48 m",
        "20 m",
        "4 m"
      ],
      "correctAnswer": 1,
      "tier": 3,
      "senNote": "Area = ½ × 8 × 12 = 48 m"
    }
  ],
  "newtons_laws": [
    {
      "question": "State Newton's First Law.",
      "questionSubtitle": "What happens when forces are balanced?",
      "options": [
        "F = ma",
        "An object stays at rest or constant velocity unless acted on by a resultant force",
        "Every action has an equal and opposite reaction",
        "Force = rate of change of momentum"
      ],
      "correctAnswer": 1,
      "tier": 1,
      "senNote": "No resultant force → no change in motion"
    },
    {
      "question": "What does Newton's Second Law tell us?",
      "questionSubtitle": "F = ?",
      "options": [
        "Objects resist changes in motion",
        "Resultant force = mass × acceleration (F = ma)",
        "Every force has an equal opposite",
        "Gravity always pulls down"
      ],
      "correctAnswer": 1,
      "tier": 1,
      "senNote": "F = ma"
    },
    {
      "question": "A 800 kg car has a resultant force of 2400 N. What is its acceleration?",
      "questionSubtitle": "a = F/m",
      "options": [
        "1920000 m/s²",
        "3 m/s²",
        "0.33 m/s²",
        "3200 m/s²"
      ],
      "correctAnswer": 1,
      "tier": 2,
      "senNote": "a = 2400 ÷ 800 = 3 m/s²"
    },
    {
      "question": "A book pushes a table down with 5 N. According to Newton's Third Law, what is the reaction force?",
      "questionSubtitle": "Equal and opposite, on a different object",
      "options": [
        "The table pushes the book up with 5 N",
        "The book pushes harder with 10 N",
        "There is no reaction force",
        "Gravity pushes the table down"
      ],
      "correctAnswer": 0,
      "tier": 2,
      "senNote": "Third Law: book pushes table down 5 N → table pushes book up 5 N"
    },
    {
      "question": "A skydiver reaches terminal velocity. Explain in terms of forces.",
      "questionSubtitle": "Terminal velocity = constant speed while falling",
      "options": [
        "All forces have disappeared",
        "Weight equals air resistance — zero resultant force — no acceleration",
        "The parachute has opened",
        "They are no longer falling"
      ],
      "correctAnswer": 1,
      "tier": 3,
      "senNote": "Weight = drag → zero resultant → constant velocity"
    }
  ],
  "stopping_distance": [
    {
      "question": "What two distances make up stopping distance?",
      "questionSubtitle": "Before brakes + after brakes",
      "options": [
        "Starting + ending distance",
        "Thinking distance + braking distance",
        "Acceleration + deceleration distance",
        "Speed + force distance"
      ],
      "correctAnswer": 1,
      "tier": 1,
      "senNote": "Stopping = thinking + braking"
    },
    {
      "question": "Name one factor that increases thinking distance.",
      "questionSubtitle": "What slows your reaction time?",
      "options": [
        "Worn tyres",
        "Tiredness, alcohol, or distractions",
        "Wet roads",
        "Old brakes"
      ],
      "correctAnswer": 1,
      "tier": 1,
      "senNote": "Thinking distance depends on the DRIVER"
    },
    {
      "question": "Name two factors that increase braking distance.",
      "questionSubtitle": "Think about road and car",
      "options": [
        "Speed and being tired",
        "Speed and poor road conditions or worn brakes/tyres",
        "Mass and colour of car",
        "Time of day and passengers"
      ],
      "correctAnswer": 1,
      "tier": 2,
      "senNote": "Braking distance: speed, road surface, brake/tyre condition"
    },
    {
      "question": "Why does braking distance increase with speed squared?",
      "questionSubtitle": "Think about KE and braking force",
      "options": [
        "Cars are heavier at high speed",
        "KE = ½mv² — double speed quadruples KE, needing 4× distance to stop",
        "Friction is less at high speed",
        "Reaction time increases"
      ],
      "correctAnswer": 1,
      "tier": 2,
      "senNote": "Double speed → 4× KE → 4× braking distance"
    },
    {
      "question": "A car at 20 m/s takes 0.7 s to react. Braking distance is 30 m. Total stopping distance?",
      "questionSubtitle": "Thinking = speed × reaction time. Then add braking.",
      "options": [
        "30.7 m",
        "44 m",
        "50.7 m",
        "14 m"
      ],
      "correctAnswer": 1,
      "tier": 3,
      "senNote": "Thinking = 20 × 0.7 = 14 m. Total = 14 + 30 = 44 m"
    }
  ],
  "momentum": [
    {
      "question": "What is the equation for momentum?",
      "questionSubtitle": "p = ?",
      "options": [
        "p = F × t",
        "p = m × v",
        "p = m × a",
        "p = F × d"
      ],
      "correctAnswer": 1,
      "tier": 1,
      "senNote": "Momentum = mass × velocity"
    },
    {
      "question": "What is the unit of momentum?",
      "questionSubtitle": "Mass × velocity",
      "options": [
        "N",
        "kg m/s",
        "J",
        "m/s²"
      ],
      "correctAnswer": 1,
      "tier": 1,
      "senNote": "kg m/s"
    },
    {
      "question": "A 1500 kg car travels at 20 m/s. What is its momentum?",
      "questionSubtitle": "p = mv",
      "options": [
        "75 kg m/s",
        "30000 kg m/s",
        "1520 kg m/s",
        "1480 kg m/s"
      ],
      "correctAnswer": 1,
      "tier": 2,
      "senNote": "p = 1500 × 20 = 30,000 kg m/s"
    },
    {
      "question": "What is the conservation of momentum principle?",
      "questionSubtitle": "Total momentum before = ...",
      "options": [
        "Conservation of energy",
        "Total momentum before = total momentum after in a closed system",
        "Newton's second law",
        "The law of inertia"
      ],
      "correctAnswer": 1,
      "tier": 2,
      "senNote": "Conservation of momentum"
    },
    {
      "question": "A 2 kg ball at 5 m/s hits a stationary 3 kg ball. They stick together. What velocity?",
      "questionSubtitle": "Total momentum before = total momentum after",
      "options": [
        "2 m/s",
        "5 m/s",
        "3.33 m/s",
        "10 m/s"
      ],
      "correctAnswer": 0,
      "tier": 3,
      "senNote": "Before: 2×5 = 10 kg m/s. After: (2+3)×v = 10 → v = 2 m/s"
    }
  ],
  "wave_types": [
    {
      "question": "In a transverse wave, how do particles move relative to wave direction?",
      "questionSubtitle": "Think about a Mexican wave",
      "options": [
        "Parallel to wave direction",
        "Perpendicular (at right angles)",
        "In circles",
        "They don't move"
      ],
      "correctAnswer": 1,
      "tier": 1,
      "senNote": "Transverse: particles oscillate at 90° to wave direction"
    },
    {
      "question": "Give an example of a longitudinal wave.",
      "questionSubtitle": "Particles push back and forth in same direction",
      "options": [
        "Light",
        "Sound",
        "Water waves",
        "Microwaves"
      ],
      "correctAnswer": 1,
      "tier": 1,
      "senNote": "Sound is longitudinal"
    },
    {
      "question": "What are compressions and rarefactions?",
      "questionSubtitle": "In a longitudinal wave, particles bunch up and spread out",
      "options": [
        "Types of transverse wave",
        "Regions where particles are close together and far apart",
        "The crest and trough of a wave",
        "Types of EM radiation"
      ],
      "correctAnswer": 1,
      "tier": 2,
      "senNote": "Compression = squashed. Rarefaction = spread apart."
    },
    {
      "question": "Are electromagnetic waves transverse or longitudinal?",
      "questionSubtitle": "Think about light, radio waves...",
      "options": [
        "Longitudinal",
        "Transverse",
        "Both",
        "Neither"
      ],
      "correctAnswer": 1,
      "tier": 2,
      "senNote": "All EM waves are transverse"
    },
    {
      "question": "P-waves (longitudinal) pass through Earth's liquid outer core but S-waves (transverse) don't. Why?",
      "questionSubtitle": "What can't travel through liquids?",
      "options": [
        "P-waves are faster",
        "Transverse waves cannot travel through liquids",
        "S-waves are absorbed by iron",
        "P-waves are stronger"
      ],
      "correctAnswer": 1,
      "tier": 3,
      "senNote": "Liquids can't support the shearing motion for transverse waves"
    }
  ],
  "wave_properties": [
    {
      "question": "What is wavelength?",
      "questionSubtitle": "The distance of one complete wave",
      "options": [
        "The height of a wave",
        "The distance from one peak to the next",
        "How fast the wave travels",
        "Number of waves per second"
      ],
      "correctAnswer": 1,
      "tier": 1,
      "senNote": "Wavelength (λ) = distance of one full cycle"
    },
    {
      "question": "What is frequency measured in?",
      "questionSubtitle": "Named after Heinrich Hertz",
      "options": [
        "Metres",
        "Hertz (Hz)",
        "Seconds",
        "Joules"
      ],
      "correctAnswer": 1,
      "tier": 1,
      "senNote": "Frequency = waves per second, measured in Hz"
    },
    {
      "question": "A wave has frequency 500 Hz and wavelength 0.6 m. What is its speed?",
      "questionSubtitle": "v = f × λ",
      "options": [
        "833.3 m/s",
        "300 m/s",
        "500.6 m/s",
        "499.4 m/s"
      ],
      "correctAnswer": 1,
      "tier": 2,
      "senNote": "v = 500 × 0.6 = 300 m/s"
    },
    {
      "question": "A wave has speed 340 m/s and frequency 170 Hz. What is its wavelength?",
      "questionSubtitle": "λ = v/f",
      "options": [
        "57800 m",
        "2 m",
        "0.5 m",
        "170 m"
      ],
      "correctAnswer": 1,
      "tier": 2,
      "senNote": "λ = 340 ÷ 170 = 2 m"
    },
    {
      "question": "10 waves pass a point in 5 seconds. Distance between first and last crest is 20 m. Wave speed?",
      "questionSubtitle": "Find frequency and wavelength first",
      "options": [
        "100 m/s",
        "40 m/s",
        "4 m/s",
        "2 m/s"
      ],
      "correctAnswer": 2,
      "tier": 3,
      "senNote": "f = 10/5 = 2 Hz. λ = 20/10 = 2 m. v = 2 × 2 = 4 m/s"
    }
  ],
  "wave_reflection": [
    {
      "question": "What is the law of reflection?",
      "questionSubtitle": "Angle of incidence...",
      "options": [
        "Light always reflects at 90°",
        "Angle of incidence = angle of reflection",
        "Light bends towards the normal",
        "Reflection only works on mirrors"
      ],
      "correctAnswer": 1,
      "tier": 1,
      "senNote": "i = r"
    },
    {
      "question": "What happens when light passes from air into glass?",
      "questionSubtitle": "Glass is denser — light slows down",
      "options": [
        "It speeds up and bends away",
        "It slows down and bends towards the normal",
        "Nothing happens",
        "It stops completely"
      ],
      "correctAnswer": 1,
      "tier": 1,
      "senNote": "Air → glass: slows down → bends towards normal"
    },
    {
      "question": "What is total internal reflection?",
      "questionSubtitle": "Happens when light exits a denser material at a large angle",
      "options": [
        "When all light is absorbed",
        "When light at an angle greater than the critical angle is completely reflected back",
        "When light passes straight through",
        "When light is refracted twice"
      ],
      "correctAnswer": 1,
      "tier": 2,
      "senNote": "Angle > critical angle → all light reflects back"
    },
    {
      "question": "Name one use of total internal reflection.",
      "questionSubtitle": "Think about fibre optics",
      "options": [
        "Solar panels",
        "Optical fibres",
        "Magnifying glasses",
        "Thermometers"
      ],
      "correctAnswer": 1,
      "tier": 2,
      "senNote": "Optical fibres use TIR to carry light signals"
    },
    {
      "question": "Light enters glass at 30° to the normal. It refracts to 19°. What is the refractive index?",
      "questionSubtitle": "n = sin(i) / sin(r)",
      "options": [
        "1.53",
        "0.65",
        "1.58",
        "0.63"
      ],
      "correctAnswer": 0,
      "tier": 3,
      "senNote": "n = sin30°/sin19° = 0.5/0.326 ≈ 1.53"
    }
  ],
  "sound_ultrasound": [
    {
      "question": "Can sound travel through a vacuum?",
      "questionSubtitle": "Sound needs particles",
      "options": [
        "Yes, but slowly",
        "No — sound needs a medium to travel",
        "Yes, at the speed of light",
        "Only ultrasound can"
      ],
      "correctAnswer": 1,
      "tier": 1,
      "senNote": "No medium = no particles = no sound"
    },
    {
      "question": "What is ultrasound?",
      "questionSubtitle": "Ultra = beyond",
      "options": [
        "Very loud sound",
        "Sound above 20,000 Hz (above human hearing)",
        "Sound from underwater",
        "Sound that travels through walls"
      ],
      "correctAnswer": 1,
      "tier": 1,
      "senNote": "Ultrasound = frequency > 20 kHz"
    },
    {
      "question": "Name one medical use of ultrasound.",
      "questionSubtitle": "What do doctors scan?",
      "options": [
        "X-ray imaging",
        "Pre-natal (pregnancy) scanning",
        "Setting broken bones",
        "Treating infections"
      ],
      "correctAnswer": 1,
      "tier": 2,
      "senNote": "Ultrasound scans are safe for unborn babies"
    },
    {
      "question": "Sound travels at 340 m/s in air and 1500 m/s in water. Why faster in water?",
      "questionSubtitle": "Think about particle spacing",
      "options": [
        "Water is warmer",
        "Water particles are closer together, so vibrations pass faster",
        "Water has less friction",
        "Sound is louder in water"
      ],
      "correctAnswer": 1,
      "tier": 2,
      "senNote": "Closer particles → faster energy transfer"
    },
    {
      "question": "An ultrasound pulse takes 0.0002 s to return from a foetus. Speed in tissue = 1540 m/s. How far?",
      "questionSubtitle": "Pulse travels there AND back",
      "options": [
        "0.308 m",
        "0.154 m",
        "0.0154 m",
        "1.54 m"
      ],
      "correctAnswer": 1,
      "tier": 3,
      "senNote": "Total = 1540 × 0.0002 = 0.308 m. One way = 0.154 m"
    }
  ],
  "em_spectrum": [
    {
      "question": "List the EM spectrum in order from longest to shortest wavelength.",
      "questionSubtitle": "Radio is longest, gamma shortest",
      "options": [
        "Gamma, X-ray, UV, visible, IR, microwave, radio",
        "Radio, microwave, infrared, visible, ultraviolet, X-ray, gamma",
        "Visible, UV, IR, radio, microwave, X-ray, gamma",
        "Radio, visible, gamma, X-ray, UV, microwave, IR"
      ],
      "correctAnswer": 1,
      "tier": 1,
      "senNote": "Radio, Micro, IR, Visible, UV, X, Gamma"
    },
    {
      "question": "What do all EM waves have in common?",
      "questionSubtitle": "Think about their speed in a vacuum",
      "options": [
        "Same wavelength",
        "They all travel at the speed of light in a vacuum",
        "Same frequency",
        "They all need a medium"
      ],
      "correctAnswer": 1,
      "tier": 1,
      "senNote": "All EM waves: 3×10⁸ m/s in vacuum, transverse"
    },
    {
      "question": "Which EM wave is used for cooking food?",
      "questionSubtitle": "Not a conventional oven",
      "options": [
        "Radio waves",
        "Microwaves",
        "Infrared",
        "Gamma rays"
      ],
      "correctAnswer": 1,
      "tier": 2,
      "senNote": "Microwaves make water molecules vibrate → heat"
    },
    {
      "question": "Why can UV radiation be harmful?",
      "questionSubtitle": "Think about your skin",
      "options": [
        "It makes you cold",
        "It can damage cells and DNA, causing sunburn and skin cancer",
        "It makes things invisible",
        "It causes deafness"
      ],
      "correctAnswer": 1,
      "tier": 2,
      "senNote": "UV damages DNA → mutations → skin cancer risk"
    },
    {
      "question": "Infrared cameras detect heat. Explain how.",
      "questionSubtitle": "All objects above absolute zero emit...",
      "options": [
        "IR cameras detect visible light",
        "All objects emit IR; hotter objects emit more; camera maps IR to a visible image",
        "IR cameras use radio waves",
        "Only hot objects emit radiation"
      ],
      "correctAnswer": 1,
      "tier": 3,
      "senNote": "Everything emits IR. Camera detects IR intensity → thermal image."
    }
  ],
  "lenses": [
    {
      "question": "What does a convex lens do to parallel light rays?",
      "questionSubtitle": "Convex = bulging outward",
      "options": [
        "Spreads them apart",
        "Focuses them to a point (converges them)",
        "Blocks them",
        "Reflects them"
      ],
      "correctAnswer": 1,
      "tier": 1,
      "senNote": "Convex = converging"
    },
    {
      "question": "What is a concave lens also called?",
      "questionSubtitle": "It spreads light out",
      "options": [
        "A converging lens",
        "A diverging lens",
        "A magnifying lens",
        "A reflecting lens"
      ],
      "correctAnswer": 1,
      "tier": 1,
      "senNote": "Concave = diverging"
    },
    {
      "question": "An object is 3 cm tall and its image is 9 cm tall. What is the magnification?",
      "questionSubtitle": "M = image height ÷ object height",
      "options": [
        "0.33",
        "3",
        "12",
        "6"
      ],
      "correctAnswer": 1,
      "tier": 2,
      "senNote": "M = 9 ÷ 3 = 3"
    },
    {
      "question": "Where must an object be placed for a convex lens to form a magnified, virtual image?",
      "questionSubtitle": "Think about a magnifying glass",
      "options": [
        "Beyond 2F",
        "Between the lens and the focal point",
        "At the focal point exactly",
        "At infinity"
      ],
      "correctAnswer": 1,
      "tier": 2,
      "senNote": "Object between F and lens → magnified, upright, virtual image"
    },
    {
      "question": "Convex lens, focal length 10 cm. Object at 15 cm. Real or virtual? Magnified?",
      "questionSubtitle": "Object beyond F but inside 2F...",
      "options": [
        "Virtual and diminished",
        "Real, inverted, and magnified",
        "Real, inverted, and diminished",
        "Virtual, upright, and magnified"
      ],
      "correctAnswer": 1,
      "tier": 3,
      "senNote": "Object between F and 2F → real, inverted, magnified"
    }
  ],
  "black_body": [
    {
      "question": "What is a perfect black body?",
      "questionSubtitle": "It absorbs all radiation...",
      "options": [
        "A body painted black",
        "An object that absorbs all radiation and is the best possible emitter",
        "An object that reflects all radiation",
        "A body at absolute zero"
      ],
      "correctAnswer": 1,
      "tier": 1,
      "senNote": "Perfect absorber AND perfect emitter"
    },
    {
      "question": "Do all objects emit radiation?",
      "questionSubtitle": "Think about temperature",
      "options": [
        "Only hot objects",
        "Yes — all objects above absolute zero emit IR",
        "Only black objects",
        "No objects emit radiation"
      ],
      "correctAnswer": 1,
      "tier": 1,
      "senNote": "Everything above 0 K emits thermal radiation"
    },
    {
      "question": "As temperature increases, what happens to emitted radiation?",
      "questionSubtitle": "Think about amount AND wavelength",
      "options": [
        "It emits less",
        "It emits more at shorter wavelengths",
        "Same amount but longer wavelengths",
        "It stops emitting"
      ],
      "correctAnswer": 1,
      "tier": 2,
      "senNote": "Hotter → more radiation AND shorter peak wavelength"
    },
    {
      "question": "Why does Earth's temperature remain roughly constant?",
      "questionSubtitle": "Energy in vs energy out",
      "options": [
        "The atmosphere traps all heat",
        "Rate of absorbed solar radiation ≈ rate of emitted IR",
        "Earth is getting cooler",
        "Oceans absorb all radiation"
      ],
      "correctAnswer": 1,
      "tier": 2,
      "senNote": "Energy balance: absorbed ≈ emitted"
    },
    {
      "question": "How do greenhouse gases contribute to rising temperatures?",
      "questionSubtitle": "Think about what happens to Earth's emitted IR",
      "options": [
        "They block sunlight",
        "They absorb and re-emit IR emitted by Earth, reducing energy loss to space",
        "They increase Sun's output",
        "They reflect UV"
      ],
      "correctAnswer": 1,
      "tier": 3,
      "senNote": "Earth emits IR → gases absorb + re-emit → less escapes → warming"
    }
  ],
  "magnetism_fields": [
    {
      "question": "What is a magnetic field?",
      "questionSubtitle": "Area around a magnet where...",
      "options": [
        "A type of radiation",
        "The region where a magnetic force acts on magnetic materials",
        "The inside of a magnet",
        "A field made of iron filings"
      ],
      "correctAnswer": 1,
      "tier": 1,
      "senNote": "Region where magnetic materials experience a force"
    },
    {
      "question": "Permanent vs induced magnet — what's the difference?",
      "questionSubtitle": "Permanent stays magnetic. Induced...",
      "options": [
        "No difference",
        "Permanent: always magnetic. Induced: only magnetic when near another magnet",
        "Induced magnets are stronger",
        "Permanent magnets only work in one direction"
      ],
      "correctAnswer": 1,
      "tier": 1,
      "senNote": "Induced magnets lose magnetism when removed from the field"
    },
    {
      "question": "How can you tell where a magnetic field is strongest from a diagram?",
      "questionSubtitle": "Look at field lines",
      "options": [
        "Lines furthest apart",
        "Lines closest together",
        "Where lines cross",
        "At the midpoint"
      ],
      "correctAnswer": 1,
      "tier": 2,
      "senNote": "Closer field lines = stronger field"
    },
    {
      "question": "What happens when you place iron near a magnet?",
      "questionSubtitle": "Iron is magnetic",
      "options": [
        "Nothing",
        "Iron becomes an induced magnet and is attracted",
        "Iron repels the magnet",
        "The magnet becomes weaker"
      ],
      "correctAnswer": 1,
      "tier": 2,
      "senNote": "Iron becomes temporarily magnetised → attracted"
    },
    {
      "question": "A compass near a bar magnet — which way does the needle point?",
      "questionSubtitle": "Compasses follow field lines",
      "options": [
        "Always north",
        "Along field lines — N to S outside the magnet",
        "Towards nearest pole",
        "Perpendicular to the field"
      ],
      "correctAnswer": 1,
      "tier": 3,
      "senNote": "Compass aligns with local field direction"
    }
  ],
  "motor_effect": [
    {
      "question": "What is the motor effect?",
      "questionSubtitle": "A wire carrying current in a magnetic field...",
      "options": [
        "A motor spinning",
        "A current-carrying conductor in a magnetic field experiences a force",
        "Electricity making light",
        "A magnet generating electricity"
      ],
      "correctAnswer": 1,
      "tier": 1,
      "senNote": "Current + magnetic field → force on wire"
    },
    {
      "question": "What equation links force, magnetic flux density, current and length?",
      "questionSubtitle": "F = ?",
      "options": [
        "F = ma",
        "F = BIL",
        "F = qv",
        "F = ke"
      ],
      "correctAnswer": 1,
      "tier": 1,
      "senNote": "F = BIL"
    },
    {
      "question": "A 0.5 m wire carries 3 A in a 0.2 T field. What is the force?",
      "questionSubtitle": "F = BIL",
      "options": [
        "0.3 N",
        "3.7 N",
        "30 N",
        "0.03 N"
      ],
      "correctAnswer": 0,
      "tier": 2,
      "senNote": "F = 0.2 × 3 × 0.5 = 0.3 N"
    },
    {
      "question": "How can you increase the force on a motor coil?",
      "questionSubtitle": "Look at F = BIL",
      "options": [
        "Longer wire or weaker magnet",
        "Increase current or stronger magnet",
        "Fewer coils or less voltage",
        "Thinner wire or smaller battery"
      ],
      "correctAnswer": 1,
      "tier": 2,
      "senNote": "Increase I, B, or number of turns"
    },
    {
      "question": "Fleming's Left Hand Rule: what do thumb, first and second finger represent?",
      "questionSubtitle": "Direction of force, field and current",
      "options": [
        "Thumb=temp, First=freq, Second=speed",
        "Thumb=force, First=field, Second=current",
        "Thumb=current, First=force, Second=field",
        "Thumb=field, First=current, Second=force"
      ],
      "correctAnswer": 1,
      "tier": 3,
      "senNote": "ThuMb=Motion, First=Field, SeCond=Current"
    }
  ],
  "em_induction": [
    {
      "question": "What is electromagnetic induction?",
      "questionSubtitle": "A changing magnetic field near a wire...",
      "options": [
        "A magnet attracting iron",
        "Generating a voltage by changing the magnetic field through a conductor",
        "A wire becoming magnetic",
        "Using electricity to make a magnet"
      ],
      "correctAnswer": 1,
      "tier": 1,
      "senNote": "Changing magnetic field → induced voltage"
    },
    {
      "question": "What are the two types of transformer?",
      "questionSubtitle": "Step-up and step-...",
      "options": [
        "AC and DC",
        "Step-up (increases voltage) and step-down (decreases voltage)",
        "Iron and copper",
        "Primary and secondary"
      ],
      "correctAnswer": 1,
      "tier": 1,
      "senNote": "Step-up: more secondary turns. Step-down: fewer."
    },
    {
      "question": "Step-up: 100 primary turns, 500 secondary. Input 12 V. Output?",
      "questionSubtitle": "Vs/Vp = Ns/Np",
      "options": [
        "2.4 V",
        "60 V",
        "600 V",
        "24 V"
      ],
      "correctAnswer": 1,
      "tier": 2,
      "senNote": "Vs = 12 × (500/100) = 60 V"
    },
    {
      "question": "Why do transformers only work with AC, not DC?",
      "questionSubtitle": "Think about what needs to change",
      "options": [
        "DC is too powerful",
        "AC creates a constantly changing magnetic field needed to induce voltage in secondary",
        "DC damages the iron core",
        "Transformers need high current"
      ],
      "correctAnswer": 1,
      "tier": 2,
      "senNote": "AC → changing current → changing field → induced voltage. DC = constant → no change."
    },
    {
      "question": "Why does the National Grid transmit at very high voltages?",
      "questionSubtitle": "If P stays the same, increasing V does what to I?",
      "options": [
        "Higher voltage = faster electricity",
        "P=IV: higher V = lower I = less heat loss in cables (P_loss = I²R)",
        "Higher voltage is cheaper to produce",
        "Legal requirement"
      ],
      "correctAnswer": 1,
      "tier": 3,
      "senNote": "High V → low I → less heating in cables → less wasted energy"
    }
  ],
  "solar_system": [
    {
      "question": "What keeps planets in orbit around the Sun?",
      "questionSubtitle": "Which force acts at a distance?",
      "options": [
        "Magnetic force",
        "Gravitational force",
        "Friction",
        "Electrical force"
      ],
      "correctAnswer": 1,
      "tier": 1,
      "senNote": "Gravity from the Sun"
    },
    {
      "question": "Order from smallest to largest: galaxy, star, planet, universe.",
      "questionSubtitle": "What contains what?",
      "options": [
        "Star, planet, galaxy, universe",
        "Planet, star, galaxy, universe",
        "Galaxy, star, planet, universe",
        "Universe, galaxy, star, planet"
      ],
      "correctAnswer": 1,
      "tier": 1,
      "senNote": "Planet < star < galaxy < universe"
    },
    {
      "question": "Why do planets closer to the Sun orbit faster?",
      "questionSubtitle": "Strength of gravity at different distances",
      "options": [
        "They are smaller",
        "Stronger gravitational pull means they need higher speed",
        "Less atmosphere",
        "Sun pushes them harder"
      ],
      "correctAnswer": 1,
      "tier": 2,
      "senNote": "Closer → stronger gravity → faster orbit needed"
    },
    {
      "question": "Natural vs artificial satellite — what's the difference?",
      "questionSubtitle": "Natural = nature. Artificial = humans.",
      "options": [
        "Natural are bigger",
        "Natural: Moon. Artificial: GPS satellites, made by humans",
        "No difference",
        "Artificial orbit faster"
      ],
      "correctAnswer": 1,
      "tier": 2,
      "senNote": "Moon = natural. ISS = artificial."
    },
    {
      "question": "A satellite in higher orbit moves slower. Explain why.",
      "questionSubtitle": "Gravity is weaker further away...",
      "options": [
        "More air resistance",
        "Weaker gravity at greater distance means lower speed needed to maintain orbit",
        "Higher satellites are heavier",
        "More friction in higher orbits"
      ],
      "correctAnswer": 1,
      "tier": 3,
      "senNote": "Greater distance → weaker gravity → lower orbital speed for balance"
    }
  ],
  "stellar_evolution": [
    {
      "question": "What is a protostar?",
      "questionSubtitle": "First stage of a star's life",
      "options": [
        "A dead star",
        "A cloud of gas and dust collapsing under gravity, before fusion begins",
        "A planet forming",
        "An exploding star"
      ],
      "correctAnswer": 1,
      "tier": 1,
      "senNote": "Gas cloud collapses → gets hot → protostar"
    },
    {
      "question": "What process produces energy in a main sequence star?",
      "questionSubtitle": "Small nuclei joining...",
      "options": [
        "Fission",
        "Nuclear fusion (hydrogen → helium)",
        "Combustion",
        "Radioactive decay"
      ],
      "correctAnswer": 1,
      "tier": 1,
      "senNote": "Stars fuse hydrogen into helium"
    },
    {
      "question": "Life cycle of a Sun-sized star?",
      "questionSubtitle": "Nebula → protostar → main sequence → ...",
      "options": [
        "Nebula → main sequence → supernova → black hole",
        "Nebula → protostar → main sequence → red giant → white dwarf → black dwarf",
        "Nebula → main sequence → red giant → neutron star",
        "Nebula → supergiant → supernova → white dwarf"
      ],
      "correctAnswer": 1,
      "tier": 2,
      "senNote": "Sun-sized: → red giant → white dwarf → black dwarf"
    },
    {
      "question": "What is a supernova?",
      "questionSubtitle": "Happens to massive stars at end of life",
      "options": [
        "A star forming",
        "The explosive death of a massive star",
        "A very bright planet",
        "A type of galaxy"
      ],
      "correctAnswer": 1,
      "tier": 2,
      "senNote": "Core collapses → massive explosion → supernova"
    },
    {
      "question": "Why do more massive stars have shorter lifetimes?",
      "questionSubtitle": "Think about fuel consumption rate",
      "options": [
        "Less fuel",
        "They burn fuel much faster due to higher core temperatures",
        "They cool faster",
        "More asteroids hit them"
      ],
      "correctAnswer": 1,
      "tier": 3,
      "senNote": "Bigger → hotter core → faster fusion → fuel used up quicker"
    }
  ],
  "redshift": [
    {
      "question": "What is red-shift?",
      "questionSubtitle": "Wavelength of light from a galaxy moving away",
      "options": [
        "When light turns red",
        "The increase in wavelength of light from objects moving away from us",
        "When stars become red giants",
        "A type of sunset"
      ],
      "correctAnswer": 1,
      "tier": 1,
      "senNote": "Galaxy moving away → light stretched → longer wavelength → red-shift"
    },
    {
      "question": "What evidence supports the Big Bang theory?",
      "questionSubtitle": "Two key pieces",
      "options": [
        "Only the expanding universe",
        "Red-shift of galaxies and cosmic microwave background radiation",
        "The Moon's orbit",
        "The colour of the Sun"
      ],
      "correctAnswer": 1,
      "tier": 1,
      "senNote": "Red-shift + CMBR"
    },
    {
      "question": "Further galaxies have greater red-shift. What does this tell us?",
      "questionSubtitle": "More red-shift = moving away faster",
      "options": [
        "Distant galaxies are hotter",
        "More distant galaxies move away faster — universe expanding",
        "Distant galaxies are younger",
        "Closer galaxies are brighter"
      ],
      "correctAnswer": 1,
      "tier": 2,
      "senNote": "Greater distance → greater red-shift → expanding universe"
    },
    {
      "question": "What is the CMBR?",
      "questionSubtitle": "Radiation left over from long ago...",
      "options": [
        "Radiation from phone masts",
        "Low-frequency EM radiation filling the universe, left over from the Big Bang",
        "Radiation from the Sun",
        "Radiation from rocks"
      ],
      "correctAnswer": 1,
      "tier": 2,
      "senNote": "CMBR = cooled remnant of the hot early universe"
    },
    {
      "question": "Dark energy is causing expansion to accelerate. Why is this significant?",
      "questionSubtitle": "If accelerating, something must drive it",
      "options": [
        "Universe is shrinking",
        "There is an unknown force making up ~68% of the universe",
        "Proves Big Bang didn't happen",
        "All galaxies will collide"
      ],
      "correctAnswer": 1,
      "tier": 3,
      "senNote": "Accelerating expansion → dark energy → we don't understand most of the universe"
    }
  ]
};

export default questionBank;
