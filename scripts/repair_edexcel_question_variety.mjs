#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const dataRoot = path.join(root, 'public', 'data', 'questions')
const manifestPath = path.join(dataRoot, 'manifest.json')
const boardId = 'edexcel'

const contextsBySubtopic = {
  'Atomic Structure': [
    'classroom atom model',
    'revision diagram of a lithium atom',
    'student note about nuclei and shells',
    'particle model sketch',
  ],
  'Background Radiation': [
    'Geiger counter demonstration',
    'classroom radiation survey',
    'hospital safety briefing',
    'background count-rate log',
  ],
  'Half-Life': [
    'decay practical data table',
    'medical tracer activity log',
    'laboratory isotope sample',
    'count-rate graph question',
  ],
  'Radiation Safety': [
    'radiographer safety poster',
    'sealed-source demonstration',
    'contamination clean-up note',
    'irradiation safety briefing',
  ],
  'Fission and Fusion': [
    'nuclear power station diagram',
    'star-energy explanation',
    'reactor fuel description',
    'fusion research note',
  ],
  'Electrical Power': [
    'phone charger label',
    'desk lamp rating plate',
    'small fan test',
    'heater circuit reading',
  ],
  'Electrical Energy': [
    'household energy bill',
    'portable heater use case',
    'kitchen appliance meter reading',
    'revision cost calculation',
  ],
  'Current-Voltage Characteristics': [
    'filament lamp graph',
    'component test circuit',
    'I-V practical result',
    'current sensor trace',
  ],
  'Domestic Electricity': [
    'three-pin plug diagram',
    'home wiring safety check',
    'fuse-rating explanation',
    'appliance fault scenario',
  ],
  'Parallel Circuits': [
    'parallel lamp circuit',
    'two-branch circuit diagram',
    'potential difference measurement',
    'circuit board check',
  ],
  Efficiency: [
    'energy-transfer machine',
    'electric motor test',
    'lifting device calculation',
    'useful-output comparison',
  ],
  'Gravitational Potential Energy': [
    'school bag lift',
    'crate raised on a platform',
    'book lifted to a shelf',
    'climbing-wall calculation',
  ],
  'Internal Energy': [
    'heated beaker explanation',
    'particle model description',
    'thermal energy lesson',
    'temperature-change discussion',
  ],
  'Energy Resources': [
    'renewable energy debate',
    'national grid planning meeting',
    'future energy source comparison',
    'low-carbon electricity briefing',
  ],
  Acceleration: [
    'trolley track experiment',
    'skateboard force calculation',
    'model car test run',
    'dynamics practical result',
  ],
  Moments: [
    'spanner turning a nut',
    'seesaw balance problem',
    'door-handle force example',
    'pivoted ruler practical',
  ],
  Pressure: [
    'snowshoe pressure comparison',
    'block resting on a bench',
    'hydraulic platform example',
    'shoe sole calculation',
  ],
  'Stopping Distance': [
    'road safety lesson',
    'driver reaction scenario',
    'tyre-grip comparison',
    'braking distance discussion',
  ],
  Momentum: [
    'trolley collision setup',
    'sports ball calculation',
    'model railway example',
    'moving cart measurement',
  ],
  Electromagnets: [
    'scrapyard electromagnet',
    'school solenoid practical',
    'relay switch example',
    'coil-and-core demonstration',
  ],
  'Motor Effect': [
    'simple motor diagram',
    'current-carrying wire demo',
    'loudspeaker coil explanation',
    'magnetic force practical',
  ],
  'Electromagnetic Induction': [
    'generator demonstration',
    'moving magnet and coil setup',
    'bike dynamo explanation',
    'induction practical trace',
  ],
  Solenoids: [
    'solenoid field pattern',
    'iron-core coil test',
    'electromagnet design note',
    'field-strength comparison',
  ],
  'Applications of the Motor Effect': [
    'loudspeaker cross-section',
    'speaker cone motion explanation',
    'audio driver diagram',
    'coil-in-field example',
  ],
  'Changes of State': [
    'melting ice particle model',
    'solid-to-liquid explanation',
    'heated substance diagram',
    'state-change revision card',
  ],
  'Gas Pressure': [
    'gas syringe compression',
    'sealed container heating',
    'particle collision explanation',
    'pressure sensor reading',
  ],
  'Particle Motion': [
    'smoke-cell observation',
    'Brownian motion video',
    'pollen grain microscope view',
    'random particle motion model',
  ],
  'Heating Curves': [
    'boiling-water graph',
    'heating curve worksheet',
    'state-change graph section',
    'temperature-time practical',
  ],
  'Solar System': [
    'solar system model',
    'planet order revision card',
    'astronomy classroom diagram',
    'orbit map question',
  ],
  Orbits: [
    'satellite orbit diagram',
    'Earth-orbit explanation',
    'spacecraft path model',
    'centripetal-force note',
  ],
  Satellites: [
    'communications satellite case',
    'weather satellite example',
    'geostationary orbit note',
    'space technology briefing',
  ],
  Stars: [
    'star colour chart',
    'surface temperature comparison',
    'stellar classification note',
    'telescope observation table',
  ],
  'Earth and Space': [
    'Earth rotation model',
    'day-night classroom globe',
    'Sun-Earth diagram',
    'astronomy revision note',
  ],
  'Frequency and Period': [
    'oscilloscope trace',
    'wave period measurement',
    'ripple tank observation',
    'signal timing calculation',
  ],
  Reflection: [
    'plane mirror ray diagram',
    'light ray practical',
    'reflection law worksheet',
    'mirror angle measurement',
  ],
  'Sound Waves': [
    'speaker amplitude demonstration',
    'sound sensor trace',
    'volume comparison example',
    'oscilloscope sound display',
  ],
  Lenses: [
    'convex lens ray diagram',
    'camera lens explanation',
    'distant-object image practical',
    'focal point demonstration',
  ],
  'Types of Waves': [
    'slinky wave demonstration',
    'sound and light comparison',
    'wave-type sorting task',
    'transverse-longitudinal model',
  ],
}

const focusFragments = [
  'check the key physics idea',
  'prepare for an exam-style question',
  'test a common misconception',
  'link the context to the GCSE model',
  'review the evidence in the setup',
  'practise choosing the best explanation',
  'focus on the relationship being tested',
  'decide what the data shows',
  'connect the example to the correct rule',
  'spot the answer an examiner would accept',
  'check the calculation carefully',
  'compare the options against the model',
  'avoid the common error in this topic',
  'make the final revision choice',
  'turn the example into a clear answer',
  'match the situation to the correct response',
  'use the values without changing the rule',
  'choose the conclusion supported by the setup',
  'separate the correct idea from the distractors',
  'apply the same physics in a new context',
]

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

function lowerFirst(value) {
  const text = String(value || '').trim()
  if (!text) return text
  return text[0].toLowerCase() + text.slice(1)
}

function upperFirst(value) {
  const text = String(value || '').trim()
  if (!text) return text
  return text[0].toUpperCase() + text.slice(1)
}

function baseQuestionText(value) {
  let text = String(value || '').trim()

  for (let pass = 0; pass < 4; pass += 1) {
    const learnerPrefixMatch = text.match(/^A learner uses a .+?\. (.+)$/)
    if (learnerPrefixMatch) {
      text = learnerPrefixMatch[1].trim()
      continue
    }

    const oldPrefixIndex = text.indexOf(': ')
    if (text.startsWith('In a ') && oldPrefixIndex !== -1) {
      text = text.slice(oldPrefixIndex + 2).trim()
      continue
    }

    break
  }

  return upperFirst(text)
}

function promptFor(question, indexWithinSubtopic) {
  const contexts = contextsBySubtopic[question.subtopic] || [
    `${question.subtopic} revision card`,
    `${question.topic} practice prompt`,
    'exam-style classroom example',
    'focused GCSE Physics check',
  ]
  const context = contexts[indexWithinSubtopic % contexts.length]
  const focus = focusFragments[Math.floor(indexWithinSubtopic / contexts.length) % focusFragments.length]
  return `A learner uses a ${context} to ${focus}. ${baseQuestionText(question.question)}`
}

function repairQuestions(questions) {
  const bySubtopic = new Map()
  const repaired = questions.map((question) => ({ ...question }))

  for (const question of repaired) {
    const key = question.subtopic || '__MISSING__'
    if (!bySubtopic.has(key)) bySubtopic.set(key, [])
    bySubtopic.get(key).push(question)
  }

  for (const [, subtopicQuestions] of bySubtopic) {
    subtopicQuestions.forEach((question, index) => {
      question.question = promptFor(question, index)
    })
  }

  return repaired
}

function main() {
  const manifest = readJson(manifestPath)
  const board = manifest.boards?.[boardId]
  if (!board) throw new Error(`Missing ${boardId} board in question manifest`)

  const allPath = path.join(root, 'public', board.all.replace(/^\//, ''))
  const allPayload = readJson(allPath)
  const repairedAllQuestions = repairQuestions(allPayload.questions || [])
  const repairedById = new Map(repairedAllQuestions.map((question) => [question.id, question]))
  let changed = false

  changed = writeJson(allPath, {
    ...allPayload,
    questions: repairedAllQuestions,
  }) || changed

  for (const topicPath of Object.values(board.topics || {})) {
    const filePath = path.join(root, 'public', topicPath.replace(/^\//, ''))
    const payload = readJson(filePath)
    changed = writeJson(filePath, {
      ...payload,
      questions: (payload.questions || []).map((question) => repairedById.get(question.id) || question),
    }) || changed
  }

  if (changed) {
    manifest.generatedAt = new Date().toISOString()
    writeJson(manifestPath, manifest)
  }

  console.log(`${changed ? 'Repaired' : 'Already repaired'} ${repairedAllQuestions.length} Edexcel question prompts.`)
}

main()
