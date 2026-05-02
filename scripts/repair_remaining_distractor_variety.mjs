#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const dataRoot = path.join(root, 'public', 'data', 'questions')
const manifestPath = path.join(dataRoot, 'manifest.json')
const boardsToRepair = ['edexcel', 'aqa']
const energyResourceOptions = [
  'Coal',
  'Natural gas',
  'Oil',
  'Petrol',
  'Diesel',
  'Uranium fuel',
  'A gas-fired power station',
  'A coal-fired power station',
  'Solar power',
  'Wind',
  'Hydroelectric power',
  'Geothermal energy',
  'Tidal power',
  'Wave power',
  'Biofuel',
]
const renewableOptions = [
  'Solar power',
  'Wind',
  'Hydroelectric power',
  'Geothermal energy',
  'Tidal power',
  'Wave power',
  'Biofuel',
]
const nonRenewableOptions = [
  'Coal',
  'Natural gas',
  'Oil',
  'Petrol',
  'Diesel',
  'Uranium fuel',
  'A gas-fired power station',
  'A coal-fired power station',
]

const pool = {
  'Energy Resources': [
    'It always gives the same power output.',
    'It never needs any equipment.',
    'It can be used without any cost at all.',
    'It produces no environmental impact anywhere.',
    'It works only when fossil fuels are burned.',
    'It stores unlimited energy without losses.',
    'It is guaranteed to be available every second.',
    'It changes chemical energy directly into sound.',
    'It removes the need for a national grid.',
    'It can never affect habitats or land use.',
    'It produces electricity without any energy transfer.',
    'It is always cheaper than every non-renewable source.',
    'Coal',
    'Natural gas',
    'Oil',
    'Petrol',
    'Diesel',
    'Uranium fuel',
    'A gas-fired power station',
    'A coal-fired power station',
  ],
  Isotopes: [
    'Atoms with no nucleus.',
    'Atoms with no electrons.',
    'Molecules with the same formula.',
    'Atoms with different proton numbers.',
    'Atoms from different elements.',
    'Ions with opposite charges.',
    'Atoms with identical neutron numbers only.',
    'Atoms that have split in half.',
    'Atoms with the same neutron number but different proton numbers.',
    'Atoms that have gained extra electrons only.',
    'Molecules made from different elements.',
    'Atoms with no mass number.',
  ],
  'Uses of Radiation': [
    'It blocks all radiation.',
    'It cools the equipment.',
    'It turns microbes into steam.',
    'It makes packaging magnetic.',
    'It removes gravity from microbes.',
    'It washes the equipment with water.',
    'It lowers the room pressure.',
    'It changes metal into plastic.',
    'It checks the object mass only.',
    'It finds the melting point.',
    'It measures colour fading.',
    'It compares sound waves.',
    'It counts living cells.',
    'It uses magnet strength.',
    'It measures air pressure.',
    'It measures temperature change.',
    'It stops all ionising radiation from existing.',
    'It makes the object radioactive forever.',
  ],
  'Gas Pressure': [
    'The gas particles become heavier.',
    'The particles stop colliding with the walls.',
    'The number of particles must decrease.',
    'The particles lose all kinetic energy.',
    'The container walls become softer.',
    'The particles are pulled to one side by gravity only.',
    'The particles turn into a liquid immediately.',
    'The gas pressure is always zero in a syringe.',
    'The particles collide with the walls less often.',
    'The particles disappear from the container.',
    'The gas molecules become solid particles.',
    'The particles only move when heated by light.',
  ],
  'Current-Voltage Characteristics': [
    'Its resistance falls to zero because the lamp glows.',
    'Its resistance stays constant because it is ohmic.',
    'Its resistance changes only if the potential difference is zero.',
    'The current stops because the filament emits light.',
    'The lamp becomes a perfect conductor at high temperature.',
    'The resistance is removed by the power supply.',
    'The filament cools as current increases.',
    'The graph must be a straight line through the origin.',
    'The resistance becomes negative at high current.',
    'The potential difference is used up inside the filament.',
    'The filament becomes superconducting.',
    'The lamp has no resistance once it is bright.',
  ],
  'Domestic Electricity': [
    'It keeps the neutral wire at a higher voltage.',
    'It increases the current to start the appliance.',
    'It stores charge so the appliance works longer.',
    'It protects the appliance by making the earth wire live.',
    'It makes the cable hotter so it melts safely.',
    'It stops the plug from using any energy.',
    'It is fitted so the neutral wire breaks first.',
    'It reduces the supply voltage to zero at all times.',
    'It prevents electrons from entering the appliance.',
    'It makes the casing become positively charged.',
    'It replaces the need for insulation.',
    'It forces current to flow through the user.',
  ],
  'Parallel Circuits': [
    'The supply voltage becomes zero in each branch.',
    'The current is the same in each branch because the voltage changes.',
    'The voltage is shared equally only in a series circuit.',
    'Each branch receives half the supply voltage automatically.',
    'Components in different branches must have the same current.',
    'Opening one branch always switches every branch off.',
    'The battery current is zero when branches are added.',
    'The potential difference only exists before the junction.',
    'The cells share charge equally between electrons.',
    'The voltage across a branch depends only on wire length.',
    'Every branch must contain identical components.',
    'A parallel circuit cannot have a complete path.',
  ],
  'Internal Energy': [
    'The particles lose mass.',
    'The particles stop moving.',
    'The particles become a different element.',
    'The substance loses all potential energy.',
    'The particles become fixed in a perfect lattice.',
    'Heating removes kinetic energy from the particles.',
    'The atoms split into smaller nuclei.',
    'The temperature falls whenever energy is transferred in.',
    'The particles stop colliding with each other.',
    'The material becomes radioactive.',
    'The particles turn into electrons only.',
    'The bonds disappear without any energy transfer.',
  ],
  'Stopping Distance': [
    'Only thinking distance changes; braking distance is fixed.',
    'The car stops instantly when the driver sees danger.',
    'Wet roads reduce stopping distance in every case.',
    'Higher speed always reduces braking distance.',
    'Worn tyres improve the grip on the road.',
    'Reaction time has no effect on stopping distance.',
    'The brakes remove the need for friction.',
    'Ice increases grip between the tyres and road.',
    'A tired driver reacts more quickly.',
    'Mass has no effect on the kinetic energy to remove.',
    'Braking distance is the distance before the driver reacts.',
    'Thinking distance is the distance after the brakes are applied.',
  ],
  'Electromagnetic Induction': [
    'A conductor becomes a permanent magnet whenever a battery is removed.',
    'A current is made by heating a wire until it glows.',
    'A magnetic field is destroyed when iron is placed near it.',
    'A potential difference is made only when the conductor is stationary.',
    'The coil produces charge without any energy transfer.',
    'The magnet must touch the wire for a voltage to appear.',
    'The field lines are used up by the moving conductor.',
    'The conductor becomes radioactive when it moves.',
    'The current is caused by gravity pulling electrons down.',
    'A voltage appears only if the wire is plastic.',
    'The coil stops all magnetic fields passing through it.',
    'The induced potential difference is unrelated to motion.',
  ],
  Electromagnets: [
    'Use fewer turns on the coil.',
    'Remove the iron core.',
    'Decrease the current in the coil.',
    'Replace the core with plastic.',
    'Disconnect the power supply.',
    'Make the wire insulation thicker only.',
    'Use a non-magnetic aluminium core.',
    'Reduce the number of cells.',
    'Put the coil further from the core.',
    'Reverse the battery once then remove it.',
    'Cool the wire until no current flows.',
    'Use a shorter coil with no turns.',
  ],
  'Motor Effect': [
    'A magnetic field always stops current flowing in a conductor.',
    'The conductor gains mass when current passes through it.',
    'A stationary conductor produces no magnetic field and so creates gravity.',
    'The force is caused only by heating the wire.',
    'The wire moves because electrons become protons.',
    'The field disappears when the current starts.',
    'The conductor is pulled only by Earth gravity.',
    'The motor effect happens without a magnetic field.',
    'Current makes the wire radioactive.',
    'The force is always zero when current flows.',
    'The wire must be made of plastic to move.',
    'The battery pushes the wire mechanically.',
  ],
  'Applications of the Motor Effect': [
    'The cone moves because air pressure charges the coil.',
    'The coil heats up and expands without a force.',
    'The magnet switches off and on by itself.',
    'Gravity pulls the cone backwards and forwards.',
    'The current turns the paper cone into a permanent magnet.',
    'The sound wave pushes electrons around the coil.',
    'The coil moves because it is in a magnetic field.',
    'The cone moves only when there is no current.',
    'The speaker works by nuclear radiation.',
    'The alternating current has no effect on force direction.',
    'The magnetic field removes all resistance.',
    'The cone vibrates because the wire melts repeatedly.',
  ],
  Solenoids: [
    'The iron core blocks the magnetic field.',
    'The field is weaker because iron is non-magnetic.',
    'The core removes current from the coil.',
    'The solenoid becomes an electric insulator.',
    'The field lines disappear inside the coil.',
    'The iron core makes the coil colder only.',
    'The core turns the current into sound.',
    'The magnetic domains become completely random.',
    'The field exists only outside the solenoid.',
    'The core cancels the battery voltage.',
    'The turns of wire stop acting together.',
    'The solenoid works only without a core.',
  ],
  'Changes of State': [
    'The particles stop moving completely.',
    'The particles become a different element.',
    'The mass disappears during melting.',
    'The particles lose all their energy.',
    'The temperature must keep rising during the change.',
    'The particles become fixed closer together like a solid.',
    'The substance becomes radioactive.',
    'The particles turn into light energy only.',
    'The bonds form a stronger solid lattice.',
    'The particles stop attracting each other forever.',
    'The material changes its proton number.',
    'The molecules split into separate atoms only.',
  ],
  'Particle Motion': [
    'The particles are pulled by fields in the air.',
    'The particles are heavy so they stop moving quickly.',
    'The particles only move when light shines on them.',
    'The visible particles move because they are alive.',
    'The liquid has no molecules between the visible particles.',
    'Gravity pushes each particle in a random direction.',
    'The particles move only because the microscope vibrates.',
    'The visible particles are hit evenly from every side at once.',
    'The particles move because they are magnetic.',
    'The liquid molecules are completely still.',
    'The motion proves there are no small particles.',
    'The particles travel in identical straight lines.',
  ],
  'Heating Curves': [
    'The temperature rises quickly throughout boiling.',
    'The substance becomes colder while it boils.',
    'The particles stop moving during boiling.',
    'The energy is used only to increase kinetic energy.',
    'The mass of the substance increases during boiling.',
    'The substance changes into a different element.',
    'The graph line must slope downwards at boiling.',
    'The particles lose all potential energy.',
    'The heater stops transferring energy.',
    'The temperature becomes zero during boiling.',
    'The bonds get stronger without energy transfer.',
    'The particles form a solid lattice.',
  ],
  Orbits: [
    'Air resistance above Earth pushes the satellite around the orbit.',
    'The satellite engine must keep firing all the time to hold the orbit.',
    'There is no gravity in space, so the satellite floats in a straight line.',
    'Magnetism from Earth keeps every satellite moving.',
    'The satellite is pulled outward by gravity.',
    'The Moon pushes the satellite around Earth.',
    'The satellite has no mass while in orbit.',
    'The orbit is caused by friction with the atmosphere.',
    'The satellite stops moving forward in orbit.',
    'The engine cancels all gravitational force.',
    'The satellite is outside all fields.',
    'The Sun pulls every satellite into a circle around Earth.',
  ],
  Satellites: [
    'To measure the mass of atoms in the air.',
    'To stop gravity acting on objects.',
    'To make planets move faster.',
    'To remove the need for radio waves.',
    'To change day length on Earth.',
    'To heat the upper atmosphere only.',
    'To reflect all sunlight away from Earth.',
    'To keep aircraft from needing engines.',
    'To create tides without the Moon.',
    'To make stars easier to see in daylight.',
    'To block cosmic radiation completely.',
    'To generate gravity for buildings.',
  ],
  'Solar System': [
    'Earth',
    'Mars',
    'Jupiter',
    'Saturn',
    'Neptune',
    'Uranus',
    'The Moon',
    'An asteroid belt object',
    'A comet in the outer Solar System',
    'A geostationary satellite',
    'A distant galaxy',
    'A red giant star',
  ],
  Stars: [
    'Red stars are usually the hottest.',
    'Yellow stars always have the highest surface temperature.',
    'All stars have the same surface temperature.',
    'Blue stars are usually the coolest.',
    'Star colour tells us only the star mass.',
    'White stars must be colder than red stars.',
    'Temperature cannot affect the light from a star.',
    'A hotter star always looks darker.',
    'Surface temperature is measured from orbit speed only.',
    'Colour depends only on distance from Earth.',
    'Every star changes colour once per day.',
    'A cool star gives out no light.',
  ],
  'Earth and Space': [
    'The Sun moves around Earth once per day.',
    'Earth moves closer to and further from the Sun each day.',
    'The Moon blocks the Sun every night.',
    'Earth stops spinning during the night.',
    'Clouds cover the Sun on the night side.',
    'The stars push Earth into shadow.',
    'The atmosphere switches sunlight off.',
    'Earth changes direction every twelve hours.',
    'The Sun gives out light only in daytime.',
    'The Moon produces darkness by reflection.',
    'Earth orbits the Moon once per day.',
    'The Solar System rotates around Earth daily.',
  ],
  'Frequency and Period': [
    'The frequency is the same as the period.',
    'The frequency is found by multiplying by the period.',
    'The unit must be metres per second.',
    'The answer must increase when the period increases.',
    'The period is measured in hertz.',
    'The wave speed is equal to period divided by frequency.',
    'The amplitude decides the frequency directly.',
    'The wavelength is the same number as frequency.',
    'The period has no link to frequency.',
    'The frequency is always zero for a transverse wave.',
    'The period is measured in newtons.',
    'The frequency can only be measured for sound.',
  ],
  Reflection: [
    'The angle of reflection is always zero.',
    'The angle of reflection is twice the angle of incidence.',
    'The angle is measured from the mirror surface only.',
    'The reflected ray travels back along the normal.',
    'The angle of incidence changes the mirror into a lens.',
    'The normal is parallel to the mirror surface.',
    'The angle of reflection is half the incidence angle.',
    'The ray is absorbed instead of reflected.',
    'The reflected ray must bend towards the normal.',
    'The angle depends only on the colour of light.',
    'The mirror changes the wave speed in air.',
    'The reflected ray has no direction.',
  ],
  'Sound Waves': [
    'Decrease the amplitude.',
    'Decrease the frequency.',
    'Increase the wavelength only.',
    'Change the wave from longitudinal to transverse.',
    'Remove the particles from the medium.',
    'Lower the energy carried by the wave.',
    'Make the period longer only.',
    'Stop the source vibrating.',
    'Make the sound travel through a vacuum.',
    'Reduce the vibration size.',
    'Make the oscilloscope trace shorter vertically.',
    'Use a smaller pressure variation.',
  ],
  Lenses: [
    'The image is always virtual and behind the lens.',
    'The rays never meet after passing through the lens.',
    'The focal point is on the same side as the object.',
    'A convex lens always spreads parallel rays apart.',
    'The image forms only if the object touches the lens.',
    'The lens changes light into sound.',
    'The image is formed by reflection from the lens surface only.',
    'Parallel rays pass through without changing direction.',
    'The lens has no focal length.',
    'The image is always larger than the object.',
    'The rays meet at the centre of the lens material.',
    'The lens blocks all rays except the central ray.',
  ],
  'Types of Waves': [
    'All waves are transverse in air.',
    'Sound waves are transverse and light waves are longitudinal.',
    'Light waves need particles to carry them.',
    'All waves must travel through a solid.',
    'Longitudinal waves have vibrations at right angles to travel.',
    'Transverse waves vibrate parallel to their direction of travel.',
    'Sound in air can travel through a vacuum.',
    'Light is a longitudinal pressure wave.',
    'Water waves prove all waves are identical.',
    'The direction of vibration never matters.',
    'Mechanical waves need no medium.',
    'Electromagnetic waves need air particles.',
  ],
  'Electrical Power': [
    'Add the voltage and current.',
    'Divide the voltage by the current.',
    'Divide the current by the voltage.',
    'Multiply resistance by time.',
    'Use charge divided by voltage.',
    'Use energy divided by current.',
    'Subtract current from voltage.',
    'Multiply voltage by time only.',
    'Use current squared without resistance.',
    'Use power equals force times distance.',
    'Use voltage divided by time.',
    'Use current divided by energy.',
  ],
  Power: [
    'Add the energy and time.',
    'Multiply energy by time.',
    'Divide time by energy.',
    'Use force divided by distance.',
    'Use current multiplied by voltage for every context.',
    'Use mass multiplied by acceleration.',
    'Subtract time from energy.',
    'Use work done multiplied by distance.',
    'Use speed divided by time.',
    'Use charge divided by voltage.',
    'Use pressure multiplied by area.',
    'Use frequency divided by period.',
  ],
  Efficiency: [
    'Use total input divided by useful output.',
    'Add useful output to wasted output.',
    'Use wasted energy divided by useful energy.',
    'Efficiency is always 100%.',
    'Efficiency is measured in joules.',
    'Use power multiplied by time.',
    'Ignore wasted energy completely.',
    'Use useful output minus total input.',
    'Efficiency is unrelated to energy transfers.',
    'Use the largest number as the percentage.',
    'Efficiency cannot be written as a percentage.',
    'Use mass divided by volume.',
  ],
  'Series Circuits': [
    'Current is used up by each component.',
    'Current becomes zero after the first lamp.',
    'The current is different in every part of a series circuit.',
    'Each component receives a completely separate current supply.',
    'The battery sends more current to the final component.',
    'Current is shared equally only in parallel circuits.',
    'The current depends only on the wire colour.',
    'The first component stores all the charge.',
    'Current flows only before the first resistor.',
    'The current is larger after every component.',
    'The last lamp creates extra charge.',
    'The current reverses after each component.',
  ],
  Motion: [
    'The object is stationary.',
    'The object moves at constant speed.',
    'The object has zero acceleration.',
    'The distance travelled is always zero.',
    'The velocity is decreasing uniformly.',
    'The object moves backwards only.',
    'The graph shows no motion.',
    'The speed is unrelated to gradient.',
    'The acceleration is found from total distance only.',
    'The motion has no resultant force.',
    'The object changes direction every second.',
    'The speed is measured in newtons.',
  ],
  "Newton's Third Law": [
    'The larger object always exerts the larger force.',
    'The forces act on the same object.',
    'The forces act in the same direction.',
    'One force happens later than the other.',
    'Only moving objects can exert force pairs.',
    'The smaller object has no effect.',
    'The forces cancel because they act on one object.',
    'The force pair needs contact in every case.',
    'Gravity cannot form a force pair.',
    'The reaction force is always friction.',
    'The action force is always larger.',
    'The forces have different sizes.',
  ],
  'Magnetic Fields': [
    'Field lines cross each other at the poles.',
    'Field lines point from south to north outside the magnet.',
    'The field exists only inside the magnet.',
    'A compass points randomly in a magnetic field.',
    'The field is strongest halfway between the poles.',
    'The field disappears near the poles.',
    'Field lines show the path of electric current.',
    'Only plastic objects can show field patterns.',
    'The field has no direction.',
    'Field lines are physical wires.',
    'The magnetic field is caused by gravity only.',
    'The poles have no effect on the field.',
  ],
  'Permanent Magnets': [
    'A permanent magnet needs a current all the time.',
    'A permanent magnet loses its field as soon as it is moved.',
    'A permanent magnet is made only from copper.',
    'A permanent magnet has no north or south pole.',
    'It becomes magnetic only when heated.',
    'Its domains are always completely random.',
    'It works because it stores electric charge.',
    'It attracts every material equally.',
    'It has a field only when touching iron.',
    'It is the same as an electromagnet.',
    'It cannot repel another magnet.',
    'It needs a battery to keep its field.',
  ],
  Generators: [
    'The generator stores charge without moving parts.',
    'The coil must stay still in a magnetic field.',
    'The magnet is heated until current appears.',
    'Chemical energy directly creates alternating current.',
    'The field lines are destroyed by the coil.',
    'A generator works only with plastic coils.',
    'The current is caused by friction with air.',
    'The coil becomes radioactive.',
    'There is no energy transfer in a generator.',
    'The output is unrelated to motion.',
    'The generator removes resistance from the circuit.',
    'The magnet must touch both ends of the wire.',
  ],
  'Life Cycle of Stars': [
    'It stops all nuclear change instantly.',
    'It turns into a planet.',
    'It changes into a galaxy.',
    'It becomes a black hole at once.',
    'It stays red forever.',
    'It explodes as every type of supernova.',
    'It becomes a comet.',
    'It becomes a moon.',
    'It turns into a solar system.',
    'It becomes a meteorite.',
    'It cools into an asteroid immediately.',
    'It stops giving out energy but remains unchanged.',
  ],
  'Observing Space': [
    'Space removes the need for detectors.',
    'Stars become closer.',
    'Mirrors stop reflecting.',
    'The Sun powers every image.',
    'Lenses become weightless.',
    'The telescope makes its own stars.',
    'Gravity bends no light at all.',
    'The Moon blocks all clouds.',
    'Telescopes work only in daylight.',
    'The atmosphere creates all telescope images.',
    'A telescope changes radio waves into planets.',
    'Every telescope must use visible light only.',
  ],
  'Electromagnetic Spectrum': [
    'Water waves',
    'Microwaves',
    'Ultraviolet',
    'Radio waves',
    'Infrared',
    'X-rays',
    'Sound waves',
    'Seismic P-waves',
    'Ripples on water',
    'A stretched spring wave',
    'A pressure wave in air',
    'A wave on a rope',
  ],
  Ultrasound: [
    'It needs radioactive tracer.',
    'It is ionising gamma radiation.',
    'It uses visible light.',
    'It changes tissue into bone.',
    'It makes no reflections.',
    'It can only travel through a vacuum.',
    'It is below the range of human hearing.',
    'It works by nuclear fission.',
    'It uses ultraviolet radiation.',
    'It cannot travel through soft tissue.',
    'It always damages DNA.',
    'It measures magnetic field strength only.',
  ],
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'))
}

function writeJson(filePath, payload) {
  const next = `${JSON.stringify(payload, null, 2)}\n`
  const current = fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : ''
  if (current === next) return false
  fs.writeFileSync(filePath, next)
  return true
}

function isNumericAnswer(value) {
  return /^-?\d+(?:\.\d+)?\s+/.test(String(value || '').trim())
}

function numericValue(value) {
  const match = String(value || '').match(/^-?\d+(?:\.\d+)?/)
  return match ? Number(match[0]) : null
}

function unit(value) {
  return String(value || '').replace(/^-?\d+(?:\.\d+)?\s*/, '')
}

function formatNumber(value) {
  if (Math.abs(value) >= 100) return String(Math.round(value))
  return Number(value.toFixed(2)).toString()
}

function numericDistractors(question, index) {
  const correct = numericValue(question.correctAnswer)
  if (!Number.isFinite(correct)) return []
  const suffix = unit(question.correctAnswer)
  const factors = [
    0.25 + ((index * 3) % 11) * 0.05,
    1.5 + ((index * 5) % 13) * 0.1,
    0.65 + ((index * 7) % 9) * 0.08,
  ]
  return factors
    .map((factor) => `${formatNumber(correct * factor)} ${suffix}`.trim())
    .filter((option) => option !== question.correctAnswer)
}

function textDistractors(question, index) {
  const candidates = question.subtopic === 'Energy Resources' && renewableOptions.includes(question.correctAnswer)
    ? nonRenewableOptions
    : question.subtopic === 'Energy Resources' && nonRenewableOptions.includes(question.correctAnswer)
      ? renewableOptions
      : question.subtopic === 'Energy Resources' && energyResourceOptions.includes(question.correctAnswer)
        ? energyResourceOptions
    : (pool[question.subtopic] || pool[question.topic] || [])
  const valid = candidates.filter((option) => option !== question.correctAnswer)
  const combinations = []

  for (let a = 0; a < valid.length; a += 1) {
    for (let b = a + 1; b < valid.length; b += 1) {
      for (let c = b + 1; c < valid.length; c += 1) {
        combinations.push([valid[a], valid[b], valid[c]])
      }
    }
  }

  if (!combinations.length) return []
  return combinations[index % combinations.length]
}

function replacementWrongOptions(question, index) {
  const wrong = isNumericAnswer(question.correctAnswer)
    ? numericDistractors(question, index)
    : textDistractors(question, index)

  if (wrong.length >= 3) return wrong
  return question.options.filter((option) => option !== question.correctAnswer)
}

function repairQuestion(question, index) {
  const wrongOptions = replacementWrongOptions(question, index)
  if (wrongOptions.length < 3) return question

  const options = [...question.options]
  let wrongIndex = 0
  for (let optionIndex = 0; optionIndex < options.length; optionIndex += 1) {
    if (optionIndex === question.correctIndex) {
      options[optionIndex] = question.correctAnswer
    } else {
      options[optionIndex] = wrongOptions[wrongIndex]
      wrongIndex += 1
    }
  }

  return {
    ...question,
    options,
    correctIndex: options.findIndex((option) => option === question.correctAnswer),
  }
}

function optionSetKey(question) {
  return JSON.stringify(question.options || [])
}

function repeatedIds(questions) {
  const groups = new Map()
  for (const question of questions) {
    const key = optionSetKey(question)
    if (!groups.has(key)) groups.set(key, [])
    groups.get(key).push(question)
  }
  return new Set([...groups.values()].filter((group) => group.length > 1).flat().map((question) => question.id))
}

function repairBoardQuestions(questions) {
  let repaired = questions.map((question) => ({ ...question, options: [...question.options] }))
  let changed = 0

  const indexBySubtopic = new Map()
  repaired = repaired.map((question) => {
    const canRepair = isNumericAnswer(question.correctAnswer) || pool[question.subtopic] || pool[question.topic]
    if (!canRepair) return question

    const counterKey = `${question.topic}/${question.subtopic}`
    const index = indexBySubtopic.get(counterKey) || 0
    indexBySubtopic.set(counterKey, index + 1)

    const next = repairQuestion(question, index)
    if (JSON.stringify(next.options) !== JSON.stringify(question.options)) changed += 1
    return next
  })

  for (let pass = 0; pass < 3; pass += 1) {
    const targets = repeatedIds(repaired)
    if (!targets.size) break
    let fallbackIndex = 0
    repaired = repaired.map((question) => {
      if (!targets.has(question.id)) return question
      const next = repairQuestion(question, fallbackIndex + pass + 100)
      fallbackIndex += 1
      if (JSON.stringify(next.options) !== JSON.stringify(question.options)) changed += 1
      return next
    })
  }

  return { questions: repaired, changed }
}

function main() {
  const manifest = readJson(manifestPath)
  let wroteFiles = false
  let changedRows = 0

  for (const boardId of boardsToRepair) {
    const board = manifest.boards?.[boardId]
    if (!board) throw new Error(`Missing ${boardId}`)

    const allPath = path.join(root, 'public', board.all.replace(/^\//, ''))
    const allPayload = readJson(allPath)
    const { questions, changed } = repairBoardQuestions(allPayload.questions || [])
    const byId = new Map(questions.map((question) => [question.id, question]))
    changedRows += changed

    wroteFiles = writeJson(allPath, { ...allPayload, questions }) || wroteFiles

    for (const topicPath of Object.values(board.topics || {})) {
      const filePath = path.join(root, 'public', topicPath.replace(/^\//, ''))
      const payload = readJson(filePath)
      wroteFiles = writeJson(filePath, {
        ...payload,
        questions: (payload.questions || []).map((question) => byId.get(question.id) || question),
      }) || wroteFiles
    }
  }

  if (wroteFiles) {
    manifest.generatedAt = new Date().toISOString()
    writeJson(manifestPath, manifest)
  }

  console.log(`${wroteFiles ? 'Repaired' : 'Already repaired'} ${changedRows} remaining repeated distractor rows.`)
}

main()
