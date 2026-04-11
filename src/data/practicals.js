export const PRACTICALS = {
  shc: {
    id: 'shc',
    number: 'RP1',
    title: 'Specific Heat Capacity',
    topicId: 'internal_energy',
    aim: 'To determine the specific heat capacity of a solid material (e.g. copper or aluminium block) by measuring temperature rise when electrical energy is supplied.',
    specRef: '4.1.1.3',
    equipment: ['Metal block (copper/aluminium) with two holes','Immersion heater (30W)','Thermometer','12V power supply','Ammeter','Voltmeter','Stopwatch','Insulating material','Connecting leads','Balance'],
    variables: {
      independent: 'Time (s) — energy derived from E = P × t',
      dependent: 'Temperature rise (°C)',
      control: ['Mass of block (kg)','Power supply voltage','Starting temperature','Type of metal block','Immersion heater used']
    },
    method: [
      'Measure and record the mass of the metal block in kg',
      'Insert the immersion heater into the larger hole',
      'Connect ammeter, power supply and heater in series; voltmeter across the heater (not the power supply)',
      'Add a drop of water to the thermometer hole for good thermal contact',
      'Wrap the block tightly in insulating material (e.g. foam/cotton wool) to reduce heat loss',
      'Record the initial temperature, then switch on the power supply',
      'Record current (A) and voltage (V) at each time step  -  calculate power P = IV',
      'Record temperature every 60 seconds for 10 minutes; switch off at end',
      'Calculate energy E = P × t for each reading',
      'Plot temperature (°C) vs energy (J)  -  gradient = 1/(m × c)',
      'Rearrange: c = 1 / (mass × gradient) to find SHC'
    ],
    resultsTable: {
      headers: ['Time (s)', 'Voltage V (V)', 'Current I (A)', 'Power P=IV (W)', 'Energy E=Pt (J)', 'Temperature θ (°C)'],
      sampleData: [[0,12,2.5,30,0,20],[60,12,2.5,30,1800,22.2],[120,12,2.5,30,3600,24.4],[180,12,2.5,30,5400,26.6],[240,12,2.5,30,7200,28.8],[300,12,2.5,30,9000,31.0],[360,12,2.5,30,10800,33.2],[420,12,2.5,30,12600,35.4],[480,12,2.5,30,14400,37.6],[540,12,2.5,30,16200,39.8],[600,12,2.5,30,18000,42.0]]
    },
    analysis: 'Plot temperature (y-axis) vs energy supplied (x-axis). Draw line of best fit (ignore curved start due to thermal lag). Gradient = ΔT/ΔE. SHC: c = 1 / (m × gradient). Compare to accepted values: Al = 900 J/kg°C, Cu = 385 J/kg°C, Fe = 450 J/kg°C.',
    errors: [
      'Heat loss to surroundings → insulate block, wrap in foam/cotton wool',
      'Thermal lag: thermometer reading lags behind block temperature → add water droplet to thermometer hole; draw line of best fit through linear middle section, ignoring initial curve',
      'Energy lost to heater itself (heater has own mass and heat capacity) → systematic error that makes calculated c larger than true value',
      'Contact resistance in circuit → check all connections are tight',
      'Heater may not be fully embedded → ensure snug fit',
      'Parallax error when reading thermometer → eye level with scale'
    ],
    hazards: [
      { hazard: 'Hot immersion heater (~80°C)', risk: 'Burns', precaution: 'Do not touch heater; switch off after use; allow to cool before handling' },
      { hazard: 'Electrical equipment', risk: 'Electric shock', precaution: 'Check leads for damage; keep away from water' },
      { hazard: 'Hot metal block', risk: 'Burns', precaution: 'Use heatproof mat; allow to cool before handling' }
    ],
    sim: { type: 'shc', power: 30, mass: 1.0, shc: 385, startTemp: 20 }
  },

  insulation: {
    id: 'insulation',
    number: 'RP2',
    title: 'Thermal Insulation',
    topicId: 'efficiency',
    aim: 'To investigate the effectiveness of different materials as thermal insulators by measuring the rate of cooling of hot water.',
    specRef: '4.1.1.4',
    equipment: ['100ml beaker (×5)','800ml beaker (×5)','Thermometer','Kettle','Cardboard lid with hole','Stopwatch','Insulating materials: bubble wrap, newspaper, polystyrene, sawdust','Scissors','Rubber bands'],
    variables: {
      independent: 'Type of insulating material (or number of layers)',
      dependent: 'Temperature of water over time (°C)',
      control: ['Volume of water (80 ml)','Starting temperature','Room temperature','Beaker size','Thickness/amount of insulating material (must be equal for fair comparison)','Whether a lid is used']
    },
    method: [
      'Place small beaker inside larger beaker',
      'Fill the gap between beakers with the insulating material being tested',
      'Boil water in kettle; allow to cool to a fixed starting temperature (e.g. 80°C), then add 80 ml to the small beaker',
      'Place cardboard lid with thermometer through hole',
      'Record starting temperature and start stopwatch',
      'Record temperature every 3 minutes for 20 minutes',
      'Repeat with different insulating materials (same thickness each time)',
      'Include a control trial with no insulating material between the beakers',
      'Plot cooling curves (temperature vs time) for each material',
      'The material with the slowest cooling rate is the best insulator'
    ],
    resultsTable: {
      headers: ['Time (min)', 'No insulation (°C)', 'Bubble wrap (°C)', 'Newspaper (°C)', 'Polystyrene (°C)'],
      sampleData: [[0,80,80,80,80],[3,72,76,75,77],[6,65,72,71,74],[9,59,69,67,71],[12,54,66,64,69],[15,50,63,61,67],[18,46,61,58,65],[20,43,59,56,63]]
    },
    analysis: 'Plot temperature (y-axis) vs time (x-axis) for all materials on the same axes. The material with the least steep gradient (slowest temperature drop) is the best insulator. The temperature difference between start and end = total heat lost.',
    errors: [
      'Starting temperature not the same for each trial → boil fresh water each time, check thermometer at start',
      'Volume of water not exactly the same → use measuring cylinder precisely',
      'Room temperature changes between trials → do all trials in same session',
      'Thermometer not in centre of water → position carefully',
      'Heat loss from the top of the beaker through the lid hole → evaporation and convection reduce accuracy; use a well-fitting lid',
      'Removing thermometer to read it causes heat loss → use a temperature probe/data logger for continuous readings without disturbance'
    ],
    hazards: [
      { hazard: 'Near-boiling water (100°C)', risk: 'Scalds/burns', precaution: 'Use oven gloves or a cloth when handling hot beakers; pour carefully; immediately cool burns with cold water' },
      { hazard: 'Hot glassware', risk: 'Burns', precaution: 'Allow to cool before handling; use heatproof mat' }
    ],
    sim: { type: 'insulation', materials: ['none','bubble_wrap','newspaper','polystyrene'] }
  },

  resistance: {
    id: 'resistance',
    number: 'RP3',
    title: 'Resistance of a Wire',
    topicId: 'circuit_basics',
    aim: 'To investigate how the resistance of a wire depends on its length.',
    specRef: '4.2.1.3',
    equipment: ['Power supply (low voltage)','Ammeter','Voltmeter','Constantan resistance wire (≥1m)','Metre ruler','Crocodile clips (×2)','Connecting leads','Heatproof mat'],
    variables: {
      independent: 'Length of wire (cm)',
      dependent: 'Resistance (Ω) = V/I',
      control: ['Material of wire (constantan)','Thickness/diameter of wire','Temperature (keep low voltage to prevent heating)','Starting position of crocodile clip']
    },
    method: [
      'Attach resistance wire to metre ruler using tape',
      'Connect one crocodile clip to the zero end of the wire (to ammeter)',
      'Connect the other crocodile clip to the wire (this is the movable one)',
      'Connect ammeter in series with the wire and power supply',
      'Connect voltmeter across (in parallel with) the wire',
      'Set to a low voltage (e.g. 2V) BEFORE closing the circuit to prevent wire heating',
      'Record wire length, voltage, and current',
      'Switch off the power supply between readings to prevent the wire heating up',
      'Move the crocodile clip to a new length and repeat',
      'Calculate resistance: R = V/I for each length',
      'Plot resistance (y-axis) vs length (x-axis)  -  should be straight line through origin'
    ],
    resultsTable: {
      headers: ['Length (cm)', 'Voltage V (V)', 'Current I (A)', 'Resistance R=V/I (Ω)'],
      sampleData: [[10,1.0,0.45,2.2],[20,1.0,0.22,4.5],[30,1.0,0.15,6.7],[40,1.0,0.11,9.1],[50,1.0,0.09,11.1],[60,1.0,0.075,13.3],[70,1.0,0.064,15.6],[80,1.0,0.056,17.9],[90,1.0,0.049,20.4],[100,1.0,0.045,22.2]]
    },
    analysis: 'Plot resistance (Ω) vs length (cm). Draw line of best fit  -  should be straight through origin. Gradient = resistance per cm. R ∝ L (resistance proportional to length). Longer wire = higher resistance because electrons undergo more collisions.',
    errors: [
      'Wire heats up at higher voltages → use low voltage; re-measure after cooling',
      'Contact resistance at crocodile clips → zero error; graph may not pass through origin',
      'Crocodile clip not precisely at zero → measure carefully',
      'Wire not perfectly uniform diameter → average multiple readings'
    ],
    hazards: [
      { hazard: 'Wire heats up (especially at short lengths)', risk: 'Burns', precaution: 'Use low voltage; switch off between readings; use heatproof mat' },
      { hazard: 'Electrical circuit', risk: 'Electric shock', precaution: 'Check leads for damage; use low voltage power supply' }
    ],
    sim: { type: 'resistance', resistivityPerCm: 0.22, maxLength: 100 }
  },

  iv_characteristics: {
    id: 'iv_characteristics',
    number: 'RP4',
    title: 'I-V Characteristics',
    topicId: 'circuit_components',
    aim: 'To investigate the I-V characteristics of a resistor, filament lamp, and diode by measuring current at different potential differences.',
    specRef: '4.2.1.4',
    equipment: ['Power supply (variable, 0–6V)','Ammeter / milliammeter','Voltmeter','100Ω resistor','Filament lamp (6V or 12V)','Diode + protective 100Ω resistor (minimum — 10Ω is insufficient and will destroy the diode)','Variable resistor (rheostat)','Component holders','Connecting leads'],
    variables: {
      independent: 'Potential difference V (V)',
      dependent: 'Current I (A or mA)',
      control: ['Temperature (for resistor)','Component being tested']
    },
    method: [
      'Connect the component (resistor first) in series with ammeter and variable resistor',
      'Connect voltmeter in parallel across the component',
      'Set variable resistor to maximum resistance (minimum current)',
      'Switch on and record voltage and current',
      'Reduce variable resistance to increase voltage; record at several values',
      'Reverse battery connections to get negative values',
      'Plot I-V graph: current (y) vs voltage (x)',
      'Repeat with filament lamp (expect curved graph as R increases with temperature)',
      'Repeat with diode (only conducts in one direction; add protective resistor)'
    ],
    resultsTable: {
      headers: ['Voltage V (V)', 'Current (Resistor) (A)', 'Current (Lamp) (A)', 'Current (Diode) (mA)'],
      sampleData: [[-6,-0.06,-0.035,0],[-4,-0.04,-0.029,0],[-2,-0.02,-0.017,0],[0,0,0,0],[1,0.01,0.009,0],[2,0.02,0.017,0.1],[3,0.03,0.024,1],[4,0.04,0.029,10],[5,0.05,0.032,50],[6,0.06,0.035,100]]
    },
    analysis: 'Resistor: straight line through origin in both directions (I ∝ V, constant resistance, Ohmic — symmetric graph). Filament lamp: curved line that levels off with increasing V (R increases as temperature increases, non-Ohmic) — graph is also symmetric (same shape for negative V). Diode: no current for negative V; rapid increase past ~0.6–0.7V (threshold voltage for silicon diode) — only conducts one way; highly asymmetric graph. For the diode, a potential divider circuit (rather than a simple rheostat) gives better control of voltage down to 0V, which is essential to see the turn-on region clearly.',
    errors: [
      'Lamp gets hot → resistance changes with temperature; take readings quickly',
      'Ammeter resistance affects results → use voltmeter in correct position',
      'Diode damaged by too much current → use protective resistor',
      'Connection errors → double check circuit before switching on'
    ],
    hazards: [
      { hazard: 'Hot filament lamp', risk: 'Burns', precaution: 'Do not touch lamp; allow to cool; switch off when not in use' },
      { hazard: 'Electrical circuit', risk: 'Electric shock', precaution: 'Check leads; do not exceed rated voltage for components' },
      { hazard: 'Diode without protection', risk: 'Component damage/sparks', precaution: 'Always use protective resistor in series with diode' }
    ],
    sim: { type: 'iv', components: ['resistor','lamp','diode'] }
  },

  density: {
    id: 'density',
    number: 'RP5',
    title: 'Density of Materials',
    topicId: 'states_density',
    aim: 'To determine the density of regular solid objects, irregular solid objects, and liquids using appropriate apparatus.',
    specRef: '4.3.1.1',
    equipment: ['Digital balance','30cm ruler (mm graduations)','Vernier callipers (optional)','Displacement can','Measuring cylinders (10, 50, 100 ml)','String/cotton','Regular shaped objects (aluminium, copper, iron blocks)','Irregular shaped objects','250ml beaker','Water'],
    variables: {
      independent: 'Object/material being measured',
      dependent: 'Dimensions (length/width/height in cm) for regular solids; volume of water displaced (cm³) for irregular solids',
      control: ['Temperature (density varies with T)','Technique used (ruler vs displacement)']
    },
    method: [
      'Activity 1 – Regular solid: measure length, width, height with ruler (mm precision)',
      'Calculate volume: V = l × w × h (in cm³)',
      'Measure mass on digital balance',
      'Calculate density: ρ = m/V',
      'Activity 2 – Irregular solid: measure mass on balance',
      'Fill displacement can with water until dripping stops',
      'Place measuring cylinder under spout',
      'Lower object into can on string  -  collect displaced water',
      'Volume of water = volume of object',
      'Activity 3 – Liquid: measure mass of empty measuring cylinder on balance; tare/record mass',
      'Add approximately 100 ml of liquid directly to the measuring cylinder; read the volume accurately at eye level (meniscus)',
      'Measure mass of measuring cylinder + liquid; subtract empty mass to find mass of liquid (do not transfer liquid — this loses material on the walls)',
      'Calculate density: ρ = mass / volume. Note: 1 g/cm³ = 1000 kg/m³'
    ],
    resultsTable: {
      headers: ['Object', 'Length (cm)', 'Width (cm)', 'Height (cm)', 'Volume (cm³)', 'Mass (g)', 'Density (g/cm³)'],
      sampleData: [['Block A',5.0,3.0,2.0,30.0,81.0,2.70],['Block B',4.0,2.5,2.5,25.0,222.5,8.90],['Block C',4.5,3.0,2.0,27.0,213.3,7.90]]
    },
    analysis: 'Compare calculated density with known values: Al = 2.7 g/cm³, Cu = 8.9 g/cm³, Fe = 7.9 g/cm³. Density = mass/volume. Unit conversion: 1 g/cm³ = 1000 kg/m³ (e.g. Al = 2700 kg/m³). Percentage error = |calculated − accepted| / accepted × 100%. For irregular solids, measure dimensions of regular part if possible to cross-check displacement method.',
    errors: [
      'Parallax error reading ruler → align eye with measurement edge-on',
      'Air bubbles trapped on irregular object → tap object to release bubbles',
      'Water not fully displaced → ensure object is fully submerged',
      'Balance not zeroed → tare before each measurement',
      'Measuring cylinder precision → use smallest cylinder that fits object'
    ],
    hazards: [
      { hazard: 'Heavy metal blocks', risk: 'Crush injury', precaution: 'Handle carefully; do not drop' },
      { hazard: 'Water spill', risk: 'Slip hazard', precaution: 'Mop up spills immediately; work over a tray' },
      { hazard: 'Sharp edges on metal', risk: 'Cuts', precaution: 'Handle with care; check for sharp edges' }
    ],
    sim: { type: 'density', objects: ['aluminium','copper','iron'] }
  },

  latent_heat: {
    id: 'latent_heat',
    number: 'RP6',
    title: 'Specific Latent Heat',
    topicId: 'specific_latent_heat',
    aim: 'To determine the specific latent heat of fusion of ice by measuring the energy supplied by an immersion heater as it melts.',
    specRef: '4.3.2.3',
    equipment: ['Crushed ice in a funnel or beaker','Immersion heater','12V power supply','Ammeter','Voltmeter','Stopwatch','Mass balance','Beaker to collect meltwater','Insulating jacket'],
    variables: {
      independent: 'Time (s) — energy derived from E = P × t',
      dependent: 'Mass of water melted by heater (kg) — after subtracting control',
      control: ['Power of heater (keep V and I constant)', 'Starting temperature of ice (0°C)', 'Same equipment setup', 'Same duration for heater and control experiment']
    },
    method: [
      'Set up funnel with crushed ice; place beaker underneath to collect meltwater',
      'Run a control experiment first: leave ice melting for same time WITHOUT heater to measure background melt',
      'Insert immersion heater into ice, connect ammeter in series and voltmeter in parallel',
      'Switch on heater; record current I and voltage V; calculate power P = IV',
      'Run heater for measured time t (e.g. 5 minutes = 300 s); calculate energy E = P × t',
      'Measure mass of water collected in beaker (m kg)',
      'Subtract mass from control experiment to find mass melted by heater alone',
      'Calculate: L = E ÷ m (J/kg)',
      'Compare to accepted value: Lf(water) = 334,000 J/kg'
    ],
    resultsTable: {
      headers: ['Voltage V (V)', 'Current I (A)', 'Power P=IV (W)', 'Time t (s)', 'Energy E=Pt (J)', 'Mass of water m (kg)', 'L = E/m (J/kg)'],
      sampleData: [[12, 2.5, 30, 300, 9000, 0.032, 281000]]
    },
    analysis: 'Calculate L = E ÷ m (using mass melted by heater only, after subtracting control). Compare to 334,000 J/kg. Results are typically LOWER than 334,000 J/kg because heat losses from surroundings melt additional ice not accounted for, increasing m and reducing calculated L. The graph method (energy on x, mass on y; gradient = 1/L) is an A-level extension; at GCSE calculate L directly from a single set of readings.',
    errors: [
      'Heat loss from surroundings also melts ice → run a control experiment without the heater and subtract background melt',
      'Water clinging to heater or funnel → dry apparatus and weigh carefully',
      'Not all ice at 0°C → use crushed ice and allow to stand briefly',
      'Heater not fully in ice → ensure heater is surrounded by ice throughout',
      'Parallax error reading ammeter/voltmeter → read at eye level'
    ],
    hazards: [
      { hazard: 'Immersion heater gets very hot', risk: 'Burns', precaution: 'Do not touch heater directly; switch off after use; allow to cool before handling' },
      { hazard: 'Electrical equipment near water (melting ice)', risk: 'Electric shock', precaution: 'Check all connections are secure before switching on; keep power supply away from water' },
      { hazard: 'Wet bench surface', risk: 'Slip/electrical hazard', precaution: 'Keep meltwater beaker secure; mop up spills immediately' }
    ],
    examTips: [
      'Always explain WHY you run a control: without it, background melting (from warm air/bench) would add extra water, making m too large and L appear too small',
      'There is NO temperature change during melting — L = E/m, not E/ΔT. The "flat section on a heating curve" is a separate heating-curve experiment, not this practical',
      'Lv (2,260,000 J/kg) >> Lf (334,000 J/kg) — vaporisation needs about 7× more energy than melting',
      'Typical results give L slightly below 334,000 J/kg — this is expected and explained by heat losses'
    ]
  },

  light: {
    id: 'light',
    number: 'RP11',
    title: 'Reflection & Refraction of Light',
    topicId: 'wave_reflection',
    aim: 'To investigate the reflection of light from a plane mirror and the refraction of light through a rectangular glass/Perspex block.',
    specRef: '4.6.1.3',
    equipment: ['Ray box with power supply','Collimating slit and lens','Rectangular transparent block (glass or Perspex)','Plane mirror','30cm ruler','Protractor','A3 plain paper','Pencil'],
    variables: {
      independent: 'Angle of incidence (degrees)',
      dependent: 'Angle of reflection / angle of refraction (degrees)',
      control: ['Material of block','Colour/wavelength of light','Distance of ray box from block']
    },
    method: [
      'Part A – Plane mirror (reflection):',
      'Place a plane mirror vertically on A3 paper; draw a line along the mirror base',
      'Draw a normal line perpendicular to the mirror at the point of incidence',
      'Place two object pins in front of the mirror at an angle to the normal',
      'Look from the other side; align two image pins to appear coincident with the virtual image of the object pins',
      'Remove mirror; join pin marks to trace incident and reflected rays; measure angles from normal',
      'Verify: angle of incidence = angle of reflection. Measure image distance behind mirror = object distance in front',
      'Part B – Glass block (refraction):',
      'Draw a straight line on A3 paper (boundary); draw a normal perpendicular to it',
      'Place the glass block with one face along the boundary line; draw around it before starting',
      'Darken the room; set up ray box to produce a narrow ray',
      'Direct the ray at the point where normal meets the block',
      'Mark the incident ray path with × marks (one far, one near block)',
      'Mark the emergent ray on the far side of the block with × marks',
      'Remove block; join marks to draw incident and emergent rays; draw line through block between exit/entry points',
      'Measure angle of incidence (i) from normal (in air, at entry face) and angle of refraction (θᵣ) from normal inside the glass at entry face',
      'Repeat for 5 different angles of incidence; calculate n = sin(i)/sin(θᵣ) for each'
    ],
    resultsTable: {
      headers: ['Angle of incidence i (°)', 'Angle of reflection (°)', 'Angle of refraction θᵣ (°)', 'sin(i)', 'sin(θᵣ)', 'n = sin(i)/sin(θᵣ)'],
      sampleData: [[20,20,13,0.34,0.22,1.52],[30,30,19,0.50,0.33,1.52],[40,40,25,0.64,0.42,1.52],[50,50,31,0.77,0.51,1.51],[60,60,35,0.87,0.57,1.52]]
    },
    analysis: "Part A — Reflection: angle of incidence = angle of reflection (law of reflection verified). Image is the same distance behind the mirror as the object is in front. Part B — Refraction: when entering denser medium (glass), ray bends TOWARD normal (θᵣ < i). Plot sin(i) vs sin(θᵣ) — gradient = refractive index n ≈ 1.5 for glass. Snell's law: n = sin(i)/sin(θᵣ). Note: θᵣ is measured inside the glass at the point of entry — not the exit angle (which equals i for parallel-sided block).",
    errors: [
      'Wide ray from ray box → difficult to mark path precisely; use single slit collimator',
      'Block moves during experiment → draw around block before starting',
      'Parallax when marking ray → hold pencil vertical',
      'Faint reflected ray → darken room completely',
      'Protractor reading error → measure to nearest degree; repeat and average'
    ],
    hazards: [
      { hazard: 'Ray box gets very hot', risk: 'Burns', precaution: 'Switch off when not in use; do not touch bulb; allow to cool' },
      { hazard: 'Reduced lighting', risk: 'Trip/fall hazard', precaution: 'Clear area of obstacles before darkening room; supervisor must be able to see students' },
      { hazard: 'Laser (if used)', risk: 'Eye damage', precaution: 'Only use class 2 laser; never point at eyes; follow CLEAPSS PS52' }
    ],
    sim: { type: 'light', defaultAngle: 40 }
  },

  spring: {
    id: 'spring',
    number: 'RP7',
    title: "Force and Extension (Hooke's Law)",
    topicId: 'hookes_law',
    aim: "To investigate the relationship between force applied to a spring and its extension, and to verify Hooke's Law.",
    specRef: '4.5.3',
    equipment: ['Spring (capable of extending >1cm per Newton)','Metre ruler','Clamp stand × 2 with bosses and clamps','Weight stack (10N in 1N steps)','Pointer (splint + tape)','G-clamp','Unknown object to weigh'],
    variables: {
      independent: 'Force / weight applied (N)',
      dependent: 'Extension of spring (cm)',
      control: ['Spring used (same spring throughout)','Room temperature','Original length of spring']
    },
    method: [
      'Set up clamp stand near edge of bench; secure with G-clamp',
      'Hang spring from top clamp; attach metre ruler to lower clamp (zero at top)',
      'Attach pointer (splint) to bottom of spring  -  reads against ruler',
      'Record natural (unstretched) length of spring',
      'Add one 100g mass (≈1N) and record new length; calculate extension = new length − original length',
      'Add another 100g mass; record length and extension',
      'Continue adding masses; also take readings whilst unloading (removing masses) to check for hysteresis',
      'Continue up to ~10N (or until spring deforms permanently — required to find elastic limit)',
      'Note the point where the graph stops being linear (limit of proportionality / elastic limit)',
      'Plot force (y-axis) vs extension (x-axis)  -  straight line through origin up to elastic limit; gradient = k (in N/m if SI units used)',
      'Use graph to find the weight of the unknown object (read extension, find force from graph)'
    ],
    resultsTable: {
      headers: ['Force F (N)', 'Length (cm)', 'Extension e (m)', 'k = F/e (N/m)'],
      sampleData: [[0,10.0,0,'-'],[1,11.8,0.018,56],[2,13.6,0.036,56],[3,15.4,0.054,56],[4,17.2,0.072,56],[5,19.0,0.090,56],[6,20.8,0.108,56],[7,22.6,0.126,56],[8,25.0,0.150,53],[9,27.8,0.178,51],[10,31.2,0.212,47]]
    },
    analysis: "Plot force F (y-axis) vs extension e (x-axis). Straight line through origin confirms Hooke's Law: F = ke. Gradient = k (spring constant, in N/m when extension in metres). Beyond elastic limit, the line curves upward — spring permanently deformed. When unloading, if readings differ from loading, the elastic limit has been exceeded. To find unknown weight: measure extension, read force from graph or use F = ke.",
    errors: [
      'Spring oscillates when weight added → wait for spring to stop moving before reading',
      'Parallax error reading ruler → read pointer at eye level',
      'Spring not vertical → ensure setup is plumb; ruler aligned with spring',
      'Spring exceeds elastic limit → only use values from linear region',
      'Pointer slips on spring → secure firmly with tape at start'
    ],
    hazards: [
      { hazard: 'Falling weights', risk: 'Crush/injury to feet', precaution: 'Stand to side; place padding under spring; wear closed shoes' },
      { hazard: 'Clamp stand tipping', risk: 'Equipment falls', precaution: 'Use G-clamp to secure stand to bench; place near edge' },
      { hazard: 'Spring snapping', risk: 'Eye injury', precaution: 'Do not overload spring; wear safety goggles if near elastic limit' }
    ],
    sim: { type: 'spring', k: 5.5, maxForce: 10, elasticLimit: 7 }
  },

  acceleration: {
    id: 'acceleration',
    number: 'RP8',
    title: "Newton's 2nd Law (Acceleration)",
    topicId: 'newtons_laws',
    aim: 'To investigate the effect of varying force on the acceleration of a constant mass, and the effect of varying mass at constant force.',
    specRef: '4.5.6.2.2',
    equipment: ['Dynamics trolley','Flat dynamics runway (≥1m)','Bench pulley + string','Weight stack (100g masses)','Card (10cm width, attached to trolley)','2× light gates + data logger/computer','2× clamp stands','G-clamp to secure runway','Metre ruler','Protractor (for runway tilt)'],
    variables: {
      independent: 'Force (N) [or mass (kg) for second part]',
      dependent: 'Acceleration (m/s²)',
      control: ['Total mass of system (add unused weights to glider)','Air track level','Card length (10cm)']
    },
    method: [
      'Set up runway; compensate for friction by tilting slightly (raise one end slightly until trolley moves at constant speed with no hanging mass — verified by equal light-gate readings)',
      'Attach 10cm card to trolley; set up two light gates connected to data logger; input card length 10cm',
      'Attach pulley at far end of runway; thread string from trolley, parallel to runway, over pulley to weight stack',
      'Place all masses on the trolley at the start (total system mass = trolley + all masses)',
      'Transfer one 100g mass (≈1N) from trolley to the hanging stack',
      'Release trolley; record acceleration from data logger',
      'Repeat 3 times; calculate mean acceleration',
      'Transfer another mass from trolley to stack; repeat (keep total system mass constant)',
      'For Part 2 (mass): return to starting mass; keep hanging force constant; add extra mass to trolley',
      'Plot acceleration vs force (straight line through origin expected)',
      'Plot acceleration vs 1/mass (straight line through origin expected)'
    ],
    resultsTable: {
      headers: ['Force F (N)', 'Run 1 a (m/s²)', 'Run 2 a (m/s²)', 'Run 3 a (m/s²)', 'Mean a (m/s²)', 'F/a = mass (kg)'],
      sampleData: [[0.2,0.20,0.21,0.19,0.20,1.0],[0.4,0.40,0.41,0.38,0.40,1.0],[0.6,0.60,0.59,0.61,0.60,1.0],[0.8,0.81,0.79,0.80,0.80,1.0],[1.0,1.01,0.99,1.00,1.00,1.0]]
    },
    analysis: 'Plot a (y) vs F (x)  -  straight line through origin confirms F = ma. Gradient = 1/mass. Plot a (y) vs 1/m (x)  -  straight line confirms a ∝ 1/m at constant force. Calculate F/a for each row  -  should give same constant value (= total mass of system).',
    errors: [
      'Friction not fully compensated → tilt runway more carefully; re-check with zero hanging mass',
      'String not parallel to runway → angle means tension is less than hanging weight; keep string horizontal from trolley to pulley',
      'Weight hits ground before passing second gate → adjust gate position or reduce drop distance',
      'Total system mass not kept constant → always move "unused" masses to trolley, not removed from system',
      'Card tilted → ensure card is horizontal on trolley so it cuts light gate cleanly'
    ],
    hazards: [
      { hazard: 'Trolley hitting end of runway at speed', risk: 'Equipment damage / injury', precaution: 'Use a soft stop/buffer at end of runway; do not use large hanging masses' },
      { hazard: 'Falling weight stack', risk: 'Crush injury to feet', precaution: 'Keep feet away from below the pulley; use a catch tray' },
      { hazard: 'Runway falling from bench', risk: 'Injury', precaution: 'Secure runway to bench with G-clamp' }
    ],
    sim: { type: 'acceleration', mass: 1.0, maxForce: 1.0 }
  },

  waves: {
    id: 'waves',
    number: 'RP9',
    title: 'Waves (Ripple Tank & String)',
    topicId: 'wave_properties',
    aim: 'To measure the frequency, wavelength, and speed of waves in a ripple tank and on a stretched string.',
    specRef: '4.6.1.2',
    equipment: ['Ripple tank + accessories (wooden rod, motor, lamp)','Low voltage power supply','Metre ruler','White card (for floor)','Vibration generator','Variable frequency power supply (signal generator)','String or elasticated cord','Set of 100g masses + hanger','Wooden bridge','Pulley on clamp','Slinky spring (for longitudinal wave demonstration)'],
    variables: {
      independent: 'Frequency of vibration (Hz)',
      dependent: 'Wavelength (m) — wave speed is derived from v = fλ',
      control: ['Depth of water in ripple tank (5mm)','Tension in string','Length of string between bridge and end']
    },
    method: [
      'Part 1 – Ripple Tank:',
      'Set up ripple tank; fill to 5mm depth',
      'Place white card on floor below tank',
      'Set wooden rod to just touch water surface; switch on motor',
      'Adjust lamp height for clear wave pattern on card',
      'Measure wavelength: ruler at right angles to waves; measure across 5 waves; divide by 5 for mean λ',
      'Read frequency directly from the signal generator/power supply display (more accurate than counting by eye)',
      'Calculate wave speed: v = f × λ',
      'Part 2 – String (transverse waves):',
      'Set up vibration generator with string over pulley to hanging masses',
      'Switch on at low frequency; adjust frequency or tension until standing wave forms',
      'Count loops; measure total length; calculate λ = 2L/n (n = number of loops)',
      'Read frequency from power supply display',
      'Calculate wave speed: v = f × λ',
      'Part 3 – Slinky (longitudinal waves):',
      'Stretch slinky along the floor between two people (or one end fixed)',
      'Push and pull one end back and forth along the slinky axis to create compressions and rarefactions',
      'Observe that energy travels along the spring direction — this is a longitudinal wave (unlike string/water = transverse)'
    ],
    resultsTable: {
      headers: ['Measurement', 'Trial 1', 'Trial 2', 'Trial 3', 'Mean'],
      sampleData: [['Wavelength λ (m)','0.035','0.036','0.034','0.035'],['Frequency f (Hz)','8','8','8','8'],['Wave speed v=fλ (m/s)','0.28','0.29','0.27','0.28']]
    },
    analysis: 'Wave speed v = f × λ. In ripple tank, measuring across more waves gives a more accurate wavelength. In string: λ = 2L/n where L is length between supports and n is number of loops. Wave speed depends on the medium, not frequency.',
    errors: [
      'Wavelength difficult to measure accurately → measure across as many waves as possible and divide',
      'Standing wave not stable → adjust tension (hanging mass) and/or frequency carefully',
      'Water ripples not clear → adjust lamp height; darken room',
      'Frequency measured by counting waves by eye → always read directly from the signal generator display; eye-counting introduces large errors',
      'Wave speed appears to vary with frequency → check that λ measurement is accurate; v = fλ should be constant for a given medium'
    ],
    hazards: [
      { hazard: 'Water spillage', risk: 'Slip / electrical hazard', precaution: 'Mop up spills immediately; power supplies on bench, not floor' },
      { hazard: 'Stroboscope (if used)', risk: 'Epileptic fit (7-15Hz)', precaution: 'Do NOT use stroboscopes in school practical — safe to describe in exam answers as a technique, but never used in lab due to photosensitive epilepsy risk' },
      { hazard: 'Vibrating string', risk: 'Eye injury', precaution: 'Wear goggles; sit behind safety screen if close to string' }
    ],
    sim: { type: 'waves', defaultFreq: 5, defaultDepth: 5 }
  },

  radiation: {
    id: 'radiation',
    number: 'RP10',
    title: 'Radiation and Absorption',
    topicId: 'black_body',
    aim: 'To investigate how the amount of infrared radiation emitted (and absorbed) by a surface depends on the nature of that surface.',
    specRef: '4.6.2.2',
    equipment: ['Leslie cube (4-sided metal cube: matt black, matt white, shiny silver, polished/dull metal)','Kettle / boiling water','Infrared detector (thermopile or IR thermometer)','Heatproof mat','Ruler (to measure equal distances)','Stopwatch'],
    variables: {
      independent: 'Type of surface (matt black, matt white, shiny silver, shiny/polished metal)',
      dependent: 'Infrared radiation detected (detector reading)',
      control: ['Distance from cube to detector (equal for each face)','Temperature of water in cube','Same detector used throughout','Do all readings quickly before cube cools significantly']
    },
    method: [
      'Place Leslie cube on heatproof mat',
      'Fill with near-boiling water from kettle',
      'Place infrared detector at a fixed distance (e.g. 10cm) from each face',
      'Wait ~20–30 seconds for detector reading to stabilise before recording',
      'Record detector reading for all four faces: matt black, matt white, shiny silver, and the fourth (polished/dull) face',
      'Repeat and take mean readings',
      'For absorption: place two metal sheets equidistant from IR source',
      'One sheet has black paint facing source, other is shiny silver',
      'Attach a small coin with candle wax to the back of each sheet',
      'Switch on IR source; observe which coin falls first (better absorber loses wax faster)',
      'Record and compare results for each surface'
    ],
    resultsTable: {
      headers: ['Surface', 'Reading 1', 'Reading 2', 'Reading 3', 'Mean', 'Relative emission'],
      sampleData: [['Matt black','87','88','86','87','Highest'],['Matt white','72','71','73','72','High'],['Polished/dull metal','55','54','56','55','Intermediate'],['Shiny silver','41','40','42','41','Lowest']]
    },
    analysis: 'Matt black surfaces are the best emitters AND best absorbers of infrared radiation. Shiny silver surfaces are the worst emitters and poorest absorbers (best reflectors). Matt white and polished surfaces are intermediate. Real-world examples: solar panels are black (maximum absorption); survival blankets are silver (reflects IR back to body, minimising heat loss); teapots are silver/shiny (minimises emission, keeps tea hot). Note: domestic radiators are white for aesthetic reasons and work mainly by convection — white is NOT chosen for its radiation properties.',
    errors: [
      'Distance to detector not equal for all faces → measure carefully with ruler each time',
      'Water cools during experiment → do all readings quickly; refill with hot water if needed',
      'Detector drifts over time → re-zero between readings',
      'Background radiation → measure background first and subtract'
    ],
    hazards: [
      { hazard: 'Near-boiling water (100°C)', risk: 'Scalds', precaution: 'Pour carefully; use tongs; fill the cube before placing on bench' },
      { hazard: 'Hot surfaces of Leslie cube', risk: 'Burns', precaution: 'Do not touch surfaces; use heatproof mat' },
      { hazard: 'Infrared source (for absorption part)', risk: 'Burns', precaution: 'Keep hands away from source; switch off after use' }
    ],
    sim: { type: 'radiation', surfaces: ['matt_black','matt_white','shiny_silver'] }
  }
}

export const PRACTICAL_LIST = Object.values(PRACTICALS)
