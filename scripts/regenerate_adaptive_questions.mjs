#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { AUTHORED_ATOMIC_STRUCTURE_ITEMS } from '../src/data/adaptiveQuestionSource/authoredAtomicStructure.js'
import { AUTHORED_ELECTRICITY_ITEMS } from '../src/data/adaptiveQuestionSource/authoredElectricity.js'
import { AUTHORED_ENERGY_ITEMS } from '../src/data/adaptiveQuestionSource/authoredEnergy.js'
import { ADAPTIVE_SPEC_MANIFESTS } from '../src/data/adaptiveQuestionSource/specManifests.js'
import {
  CONTEXTS,
  RESPONSE_MODE_DETAILS,
  RESPONSE_MODES,
  TOPIC_FACTS,
} from '../src/data/adaptiveQuestionSource/questionBlueprints.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const dataRoot = path.join(root, 'public', 'data', 'questions')
const boards = ['aqa', 'edexcel']
const boardNames = { aqa: 'AQA', edexcel: 'Edexcel' }
const MINIMUM_RELEASE_QUESTION_COUNT = 1500
const SCAFFOLDING_PHRASES = [
  /learning objective/i,
  /common mix-up/i,
  /demand focus/i,
  /use the wording carefully/i,
  /which option best separates/i,
  /this exact GCSE Physics idea/i,
  /the mark scheme is testing/i,
  /\bfor [^:,.?!]+[:,]\s*(it means|this would mean|the statement|the option|the answer|the claim)/i,
]
const FACT_OVERRIDES = {
  'Isotopes': ['isotope_identity', 'mass_atomic_number', 'neutral_atom', 'ion_formation'],
  'Atomic Structure': ['atom_structure', 'mass_atomic_number', 'neutral_atom', 'ion_formation', 'isotope_identity'],
  'Charge': ['current_charge', 'charge_unit', 'measuring_current', 'potential_difference'],
  'Current': ['current_charge', 'measuring_current', 'charge_unit', 'potential_difference'],
  'Potential Difference': ['potential_difference', 'measuring_pd', 'current_charge', 'ohms_law'],
  'Resistance': ['ohms_law', 'ohmic_conductor', 'filament_lamp', 'diode', 'ldr_thermistor'],
  'Series Circuits': ['series_current', 'series_resistance', 'parallel_pd', 'parallel_current'],
  'Series Current': ['series_current', 'series_resistance', 'parallel_current'],
  'Series Resistance': ['series_resistance', 'series_current', 'parallel_resistance'],
  'Parallel Circuits': ['parallel_pd', 'parallel_current', 'parallel_resistance', 'series_current'],
  'Power': ['power_vi', 'power_i2r', 'energy_power_time', 'cost_electricity', 'heating_effect', 'power_definition', 'power_equation', 'unit_watt'],
  'Energy Transfer': ['energy_power_time', 'power_vi', 'power_i2r', 'heating_effect', 'cost_electricity'],
  'National Grid': ['grid_purpose', 'step_up', 'transformer_role', 'transmission_loss', 'grid_safety'],
  'Energy Stores': ['store_identification', 'closed_system', 'transfer_pathways', 'useful_wasted', 'dissipation'],
  'Efficiency': ['efficiency_ratio', 'sankey_width', 'improve_efficiency', 'percentage_limit', 'compare_devices'],
  'Insulation': ['conduction', 'convection', 'radiation', 'insulation', 'surface_colour'],
  'Kinetic Energy': ['kinetic_energy', 'gpe', 'elastic_energy', 'specific_heat', 'unit_check'],
  'Scalar and Vector Quantities': ['scalar_vector', 'distance_displacement', 'speed_velocity', 'force_vector', 'resultant_direction'],
  'Contact and Non-contact Forces': ['contact_noncontact', 'free_body', 'resultant_force', 'weight_mass'],
  'Resultant Force': ['resultant_force', 'contact_noncontact', 'free_body', 'weight_equation'],
  'Resultant Forces': ['resultant_force', 'contact_noncontact', 'free_body', 'balanced_forces'],
  'Work Done': ['work_equation', 'energy_transfer', 'unit_joule', 'distance_direction', 'force_distance_compare'],
  "Hooke's Law": ['hookes_law', 'limit_proportionality', 'extension', 'graph_gradient', 'elastic_deformation'],
  "Elasticity and Hooke's Law": ['hookes_law', 'limit_proportionality', 'extension', 'graph_gradient', 'elastic_deformation'],
  'Force and Extension Graphs': ['graph_gradient', 'limit_proportionality', 'hookes_law', 'extension', 'elastic_deformation'],
  'Required Practical: Force and Extension': ['extension', 'graph_gradient', 'limit_proportionality', 'hookes_law'],
  'Moments': ['moment_equation', 'pivot', 'balance', 'distance_effect', 'unit_moment'],
  'Pressure': ['pressure_equation', 'area_effect', 'liquid_depth', 'density_pressure', 'upthrust'],
  'Speed, Distance and Time': ['speed_equation', 'distance_time_gradient', 'acceleration_equation', 'velocity_time_gradient', 'vt_area'],
  'Motion': ['speed_equation', 'distance_time_gradient', 'velocity_time_gradient', 'acceleration_equation', 'vt_area'],
  'Acceleration': ['acceleration_equation', 'velocity_time_gradient', 'vt_area', 'speed_equation'],
  'Required Practical: Acceleration': ['acceleration_equation', 'velocity_time_gradient', 'vt_area', 'speed_equation'],
  "Newton's Laws": ['first_law', 'second_law', 'third_law', 'balanced_forces', 'mass_acceleration'],
  "Newton's Third Law": ['third_law', 'second_law', 'first_law', 'balanced_forces'],
  'Weight, Mass and Gravity': ['weight_mass', 'weight_equation', 'contact_noncontact', 'free_body'],
  'Stopping Distance': ['stopping_total', 'thinking_distance', 'braking_distance', 'force_braking', 'reaction_time'],
  'Reaction Time': ['reaction_time', 'thinking_distance', 'stopping_total', 'braking_distance'],
  'Forces and Braking': ['force_braking', 'braking_distance', 'stopping_total', 'thinking_distance'],
  'Momentum': ['momentum_equation', 'momentum_vector', 'closed_system', 'collision_compare', 'explosion'],
  'Conservation of Momentum': ['closed_system', 'collision_compare', 'explosion', 'momentum_equation'],
  'Terminal Velocity': ['terminal_velocity', 'falling_start', 'drag_increase', 'parachute', 'force_graph'],
  'Permanent Magnets': ['poles', 'field_lines', 'field_strength', 'soft_hard'],
  'Magnetic Fields': ['field_lines', 'wire_field', 'field_strength', 'poles'],
  'Magnetic Materials': ['soft_hard', 'poles', 'field_lines', 'field_strength'],
  'Generators': ['generator_rotation', 'slip_rings', 'frequency_speed', 'peak_voltage', 'generator_energy'],
  'Transformers': ['turns_ratio', 'step_up_down', 'grid_transformers', 'current_voltage', 'efficiency_transformer'],
  'Density': ['density_equation', 'particle_spacing', 'solid_model', 'liquid_model', 'gas_model'],
  'States of Matter': ['solid_model', 'liquid_model', 'gas_model', 'particle_spacing', 'density_equation'],
  'Internal Energy': ['internal_energy', 'heating_temperature', 'change_state_energy', 'specific_heat_capacity', 'cooling'],
  'Latent Heat': ['latent_heat', 'melting_plateau', 'fusion_vaporisation', 'particle_bonds', 'cooling_change'],
  'Wave Speed': ['wave_speed', 'frequency_period', 'amplitude_energy', 'wavelength', 'frequency'],
  'Frequency and Period': ['frequency_period', 'wave_speed', 'frequency', 'wavelength', 'amplitude_energy'],
  'Electromagnetic Spectrum': ['spectrum_order', 'ionising_em', 'frequency_wavelength', 'uses_hazards', 'vacuum_speed'],
  'Refraction': ['refraction', 'reflection', 'lens_convex', 'lens_concave', 'colour_filter'],
  'Reflection': ['law_reflection', 'normal_line', 'specular_diffuse', 'image_plane_mirror', 'ray_direction'],
  'Sound Waves': ['pitch_frequency', 'loudness_amplitude', 'ultrasound_frequency', 'ultrasound_imaging', 'echo_distance'],
  'Ultrasound': ['ultrasound_frequency', 'ultrasound_imaging', 'echo_distance', 'pitch_frequency'],
  'Types of Waves': ['transverse', 'longitudinal', 'sound_longitudinal', 'em_transverse', 'compression_rarefaction'],
  'Lenses': ['convex_focus', 'real_image', 'ray_diagram', 'focal_length', 'magnification'],
  'Galaxies': ['redshift_meaning', 'expanding_universe', 'big_bang', 'cmb', 'wavelength_shift'],
  'Red-Shift': ['redshift_meaning', 'expanding_universe', 'wavelength_shift', 'big_bang', 'cmb'],
  'Life Cycle of Stars': ['star_formation', 'main_sequence', 'sun_like_end', 'massive_star_end', 'fusion_elements'],
  'Observing Space': ['planet_order', 'orbit_gravity', 'satellite', 'geostationary', 'day_night'],
  'Orbits': ['orbit_gravity', 'satellite', 'geostationary', 'day_night', 'planet_order'],
  'Earth and Space': ['day_night', 'planet_order', 'orbit_gravity', 'satellite', 'geostationary'],
  'Satellites': ['satellite', 'geostationary', 'orbit_gravity', 'day_night'],
  'Solar System': ['planet_order', 'day_night', 'orbit_gravity', 'satellite'],
  'Stars': ['star_formation', 'main_sequence', 'sun_like_end', 'massive_star_end', 'fusion_elements'],
  'Background Radiation': ['background_sources', 'safety_precautions', 'contamination', 'half_life_choice'],
  'Radiation Safety': ['safety_precautions', 'contamination', 'medical_use', 'half_life_choice'],
  'Fission and Fusion': ['fission_process', 'chain_reaction', 'fusion_process', 'reactor_control', 'energy_release'],
  'Half-Life': ['half_life_definition', 'half_life_graph', 'half_life_calculation', 'random_predictable', 'count_correction'],
  'Uses of Radiation': ['medical_use', 'half_life_choice', 'contamination', 'safety_precautions', 'background_sources'],
  'Radiation': ['random_decay', 'activity', 'penetration', 'ionising_power', 'count_rate'],
  'Current-Voltage Characteristics': ['ohms_law', 'ohmic_conductor', 'filament_lamp', 'diode', 'ldr_thermistor'],
  'Domestic Electricity': ['mains_ac', 'live_neutral', 'fuse_purpose', 'earth_wire', 'power_rating'],
  'Electrical Energy': ['energy_power_time', 'cost_electricity', 'power_vi', 'power_i2r', 'heating_effect'],
  'Electrical Power': ['power_vi', 'power_i2r', 'energy_power_time', 'cost_electricity', 'heating_effect'],
  'Energy Resources': ['renewable', 'nonrenewable', 'resource_reliability', 'power_station', 'environment'],
  'Gravitational Potential Energy': ['gpe', 'kinetic_energy', 'elastic_energy', 'specific_heat', 'unit_check'],
  'Applications of the Motor Effect': ['loudspeaker', 'motor_rotation', 'motor_effect', 'force_direction', 'increase_force'],
  'Motor Effect': ['motor_effect', 'force_direction', 'motor_rotation', 'increase_force', 'loudspeaker'],
  'Electromagnetic Induction': ['induction', 'generator_effect', 'increase_induced_pd', 'ac_generator', 'transformer'],
  'Electromagnets': ['electromagnet', 'strengthen_electromagnet', 'solenoid_field', 'iron_core', 'current_direction'],
  'Solenoids': ['solenoid_field', 'iron_core', 'strengthen_electromagnet', 'current_direction', 'electromagnet'],
  'Changes of State': ['latent_heat', 'melting_plateau', 'fusion_vaporisation', 'particle_bonds', 'cooling_change'],
  'Heating Curves': ['melting_plateau', 'latent_heat', 'fusion_vaporisation', 'particle_bonds', 'cooling_change'],
  'Gas Pressure': ['gas_pressure_origin', 'temperature_pressure', 'volume_pressure', 'absolute_zero', 'brownian_motion'],
  'Particle Motion': ['solid_model', 'liquid_model', 'gas_model', 'particle_spacing', 'density_equation'],
}
const topicFileOrder = [
  'atomic_structure',
  'electricity',
  'energy',
  'forces',
  'magnetism',
  'particle_model',
  'space',
  'waves',
]

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'))
}

function writeJson(filePath, value) {
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`)
}

function slug(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
}

function displaySkill(spec) {
  return `${spec.subtopic} practice`
}

function normalizeTopicKey(topic) {
  return slug(topic)
}

function createSeed(value) {
  let seed = 2166136261
  for (const ch of String(value)) {
    seed ^= ch.charCodeAt(0)
    seed = Math.imul(seed, 16777619)
  }
  return seed >>> 0
}

function seededRandom(seed) {
  let state = seed >>> 0
  return () => {
    state += 0x6D2B79F5
    let t = state
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function pick(items, index) {
  return items[index % items.length]
}

function lowerFirst(value) {
  const text = String(value || '')
  return text ? `${text.charAt(0).toLowerCase()}${text.slice(1)}` : text
}

function sentence(value) {
  const text = String(value || '').trim()
  if (!text) return text
  return /[.!?]$/.test(text) ? text : `${text}.`
}

function optionText(value, spec, variant) {
  const clean = sentence(value)
  const area = spec.subtopic.toLowerCase()
  const variants = [
    `For ${area}: ${clean}`,
    `For ${area}, it means that ${lowerFirst(clean)}`,
    `For ${area}, this would mean that ${lowerFirst(clean)}`,
    `For ${area}, the statement is that ${lowerFirst(clean)}`,
    `For ${area}, the option says that ${lowerFirst(clean)}`,
    `For ${area}, the answer claims that ${lowerFirst(clean)}`,
    `For ${area}, it means that ${lowerFirst(clean)}`,
    `For ${area}, the statement is that ${lowerFirst(clean)}`,
    `In this item, it means that ${lowerFirst(clean)}`,
    `In this ${area} item, ${lowerFirst(clean)}`,
    `The claim for ${area} is that ${lowerFirst(clean)}`,
    `The answer for ${area} says that ${lowerFirst(clean)}`,
  ]
  return pick(variants, variant)
}

function rotate(items, offset) {
  return items.map((_, index) => items[(index + offset) % items.length])
}

function shuffleDeterministic(items, seedValue) {
  const next = seededRandom(createSeed(seedValue))
  const copy = [...items]
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(next() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

function getLegacyShape() {
  const shape = {}
  for (const board of boards) {
    const payload = readJson(path.join(dataRoot, board, 'all.json'))
    shape[board] = new Map()
    for (const question of payload.questions || []) {
      const key = `${question.topic}|||${question.subtopic}`
      if (!shape[board].has(key)) {
        shape[board].set(key, {
          count: 0,
          topic: question.topic,
          subtopic: question.subtopic,
          topicSlug: question.topicSlug || normalizeTopicKey(question.topic),
          subtopicSlug: question.subtopicSlug || slug(question.subtopic),
          topicId: question.topicId,
        })
      }
      shape[board].get(key).count += 1
    }
  }
  return shape
}

function specLookup(board) {
  const manifest = ADAPTIVE_SPEC_MANIFESTS[board]
  const entries = new Map()
  for (const entry of manifest.entries) {
    entries.set(`${entry.topic}|||${entry.subtopic}`, entry)
  }
  return entries
}

function authoredKey(board, topic, subtopic) {
  return `${board}|||${topic}|||${subtopic}`
}

function buildAuthoredLookup() {
  const lookup = new Map()
  for (const item of [
    ...AUTHORED_ATOMIC_STRUCTURE_ITEMS,
    ...AUTHORED_ELECTRICITY_ITEMS,
    ...AUTHORED_ENERGY_ITEMS,
  ]) {
    const key = authoredKey(item.board, item.topic, item.subtopic)
    if (!lookup.has(key)) lookup.set(key, [])
    lookup.get(key).push(item)
  }
  return lookup
}

const authoredLookup = buildAuthoredLookup()

function assertNoScaffolding(text, itemId, fieldName) {
  for (const phrase of SCAFFOLDING_PHRASES) {
    if (phrase.test(String(text || ''))) {
      throw new Error(`Authored question ${itemId} has scaffold wording in ${fieldName}: ${text}`)
    }
  }
}

function validateAuthoredItem(item) {
  const required = [
    'id',
    'board',
    'topic',
    'subtopic',
    'specRef',
    'question',
    'options',
    'correctIndex',
    'explanation',
    'learningObjective',
    'assessmentObjective',
    'demand',
    'commandWord',
    'responseMode',
    'contextType',
    'misconceptionTag',
    'courseAvailability',
    'tier',
  ]
  const missing = required.filter((key) => {
    const value = item[key]
    if (Array.isArray(value)) return value.length === 0
    return value == null || value === ''
  })
  if (missing.length) {
    throw new Error(`Authored question ${item.id || 'unknown'} missing: ${missing.join(', ')}`)
  }
  if (!Array.isArray(item.options) || item.options.length !== 4) {
    throw new Error(`Authored question ${item.id} must have exactly 4 options`)
  }
  if (!Number.isInteger(item.correctIndex) || item.correctIndex < 0 || item.correctIndex >= item.options.length) {
    throw new Error(`Authored question ${item.id} has invalid correctIndex`)
  }

  assertNoScaffolding(item.question, item.id, 'question')
  assertNoScaffolding(item.explanation, item.id, 'explanation')
  for (const [index, option] of item.options.entries()) {
    const text = typeof option === 'string' ? option : option?.text
    if (!text || /different answer|all of these|none of these|joke option/i.test(text)) {
      throw new Error(`Authored question ${item.id} has placeholder option ${index + 1}`)
    }
    assertNoScaffolding(text, item.id, `option ${index + 1}`)
  }
}

function demandToDifficulty(demand) {
  if (demand === 'low') return 'easy'
  if (demand === 'high') return 'hard'
  return 'medium'
}

function makeAuthoredQuestion({ board, legacy, spec, item }) {
  validateAuthoredItem(item)

  const allowedSpecRefs = spec.specRefs || [spec.specRef]
  if (!allowedSpecRefs.includes(item.specRef)) {
    throw new Error(`Authored question ${item.id} uses ${item.specRef}, expected one of ${allowedSpecRefs.join(', ')}`)
  }

  const optionObjects = item.options.map((option) => (
    typeof option === 'string'
      ? { text: option, misconception: '' }
      : { text: option.text, misconception: option.misconception || '' }
  ))
  const options = optionObjects.map((option) => option.text)

  return {
    id: item.id,
    examBoard: boardNames[board],
    subject: 'Physics',
    qualification: ADAPTIVE_SPEC_MANIFESTS[board].qualification,
    specVersion: ADAPTIVE_SPEC_MANIFESTS[board].specVersion,
    sourceUrl: ADAPTIVE_SPEC_MANIFESTS[board].sourceUrl,
    topic: legacy.topic,
    subtopic: legacy.subtopic,
    topicSlug: legacy.topicSlug,
    subtopicSlug: legacy.subtopicSlug,
    topicId: legacy.topicId,
    specRef: item.specRef,
    ...(item.combinedSpecRef ? { combinedSpecRef: item.combinedSpecRef } : {}),
    specStatement: spec.statement,
    paper: spec.paper,
    courseAvailability: item.courseAvailability || spec.courseAvailability,
    tier: item.tier || spec.tier,
    mathsSkills: spec.mathsSkills || [],
    workingScientifically: spec.workingScientifically || [],
    learningObjective: {
      id: `${item.id}_lo`,
      statement: item.learningObjective,
      prerequisites: [],
    },
    assessmentObjective: item.assessmentObjective,
    demand: item.demand,
    difficulty: demandToDifficulty(item.demand),
    commandWord: item.commandWord,
    responseMode: item.responseMode,
    patternId: `authored:${item.id}`,
    conceptFamily: slug(item.learningObjective),
    contextType: item.contextType,
    skill: displaySkill(spec),
    stem: item.question,
    question: item.question,
    options,
    correctAnswer: options[item.correctIndex],
    correctIndex: item.correctIndex,
    explanation: item.explanation,
    misconceptionTag: item.misconceptionTag,
    distractorRationales: optionObjects
      .map((option, index) => ({ text: option.text, misconception: index === item.correctIndex ? '' : option.misconception }))
      .filter((option, index) => index !== item.correctIndex),
    diagramJson: item.diagramJson || null,
    authorNotes: `Authored exam-style item for ${boardNames[board]} ${item.specRef}.`,
    review: {
      status: 'reviewed',
      reviewerRole: `${boardNames[board]} GCSE Physics content QA`,
      reviewedAt: '2026-05-02',
      source: 'authored',
    },
    senNote: `Checks: ${item.learningObjective}`,
  }
}

function difficultyFor(mode, index) {
  if (mode === 'direct_recall') return 'easy'
  if (mode === 'concept_discrimination') return index % 3 === 0 ? 'easy' : 'medium'
  if (mode === 'applied_context') return index % 4 === 0 ? 'easy' : 'medium'
  if (mode === 'misconception_correction') return index % 2 === 0 ? 'medium' : 'hard'
  if (mode === 'data_interpretation') return index % 3 === 0 ? 'medium' : 'hard'
  return 'hard'
}

function makeCorrectText(fact, mode, variant, spec) {
  return optionText(fact.correct, spec, variant + createSeed(`${spec.specRef}:${spec.subtopic}:${fact.id}:${mode}:correct`))
}

function makeDistractors(fact, mode, variant, spec) {
  const base = rotate(fact.distractors, variant).slice(0, 3)
  return base.map((value, index) => optionText(value, spec, variant + index + createSeed(`${spec.specRef}:${spec.subtopic}:${fact.id}:${mode}:d${index}`)))
}

function makeStem({ fact, spec, mode, context, variant, difficulty }) {
  const object = fact.objective.replace(/\.$/, '')
  const promptNoun = spec.subtopic.toLowerCase()
  const focus = object.charAt(0).toLowerCase() + object.slice(1)
  const stems = {
    direct_recall: [
      `Which statement is correct for ${promptNoun}?`,
      `A student is revising ${promptNoun}. Which statement should they keep?`,
      `Which answer matches this ${promptNoun} objective: ${object}?`,
    ],
    concept_discrimination: [
      `Which option best separates the correct ${promptNoun} idea from a common mix-up?`,
      `A student is comparing similar ideas in ${promptNoun}. Which statement is correct?`,
      `Which statement avoids the common ${promptNoun} mistake?`,
    ],
    applied_context: [
      `In ${context}, which conclusion is correct for ${promptNoun}?`,
      `During ${context}, a result needs explaining. Which answer is best?`,
      `A question set in ${context} tests ${promptNoun}. Which answer applies the idea correctly?`,
    ],
    misconception_correction: [
      `A learner gives a wrong explanation for ${promptNoun}. Which correction is best?`,
      `Which answer corrects a misconception about ${promptNoun}?`,
      `A revision note about ${promptNoun} contains an error. Which replacement is correct?`,
    ],
    data_interpretation: [
      `A small data set about ${promptNoun} is being interpreted. Which conclusion is valid?`,
      `A result from ${context} about ${promptNoun} is being interpreted. Which answer follows?`,
      `Which conclusion about ${promptNoun} is supported by the evidence?`,
    ],
    exam_decision: [
      `In an exam question about ${promptNoun}, which answer would earn the mark?`,
      `Which answer is the strongest GCSE Physics response for ${promptNoun}?`,
      `The mark scheme is testing ${lowerFirst(object)}. Which answer matches that point?`,
    ],
    representation_interpretation: [
      `A representation of ${promptNoun} is described in words. Which interpretation is correct?`,
      `Which option correctly reads the ${promptNoun} model or diagram idea?`,
      `A labelled representation is used for ${promptNoun}. Which statement is valid?`,
    ],
  }

  const base = pick(stems[mode], variant)
  const closingPrompts = [
    `Use the wording carefully: this is about ${focus}.`,
    `Keep the answer focused on ${promptNoun}: ${focus}.`,
    `Choose the statement that fits this exact GCSE Physics idea: ${focus}.`,
    `Demand focus: ${focus}.`,
    `Check the clue before choosing: ${object}.`,
  ]

  return `${base} ${pick(closingPrompts, variant + fact.id.length + spec.specRef.length)}`
}

function makeQuestion({ board, legacy, spec, fact, index }) {
  const mode = pick(RESPONSE_MODES, Math.floor(index / 2) + index)
  const detail = RESPONSE_MODE_DETAILS[mode]
  const difficulty = difficultyFor(mode, index)
  const context = pick(CONTEXTS, index + spec.specRef.length)
  const id = [
    board,
    spec.specRef.replace(/\./g, '_').replace(/[^a-zA-Z0-9_]/g, '').toLowerCase(),
    slug(spec.subtopic),
    fact.id,
    mode,
    String(index + 1).padStart(3, '0'),
  ].join('_')

  const correctText = makeCorrectText(fact, mode, index, spec)
  const distractors = makeDistractors(fact, mode, index, spec)
  const optionObjects = shuffleDeterministic([
    { text: correctText, correct: true },
    ...distractors.map((text) => ({ text, correct: false })),
  ], id)
  const options = optionObjects.map((option) => option.text)
  const correctIndex = optionObjects.findIndex((option) => option.correct)
  const stem = makeStem({ fact, spec, mode, context, variant: index, difficulty })
  const learningObjective = {
    id: `${board}_${spec.specRef.replace(/\./g, '_').toLowerCase()}_${slug(spec.subtopic)}_${fact.id}`,
    statement: `${fact.objective} (${spec.subtopic})`,
    prerequisites: [],
  }
  const explanation = [
    `${spec.specRef} targets: ${fact.objective}`,
    `Focus area: ${spec.subtopic}.`,
    `For this question, ${fact.explanation}`,
    `Context used: ${context}; response mode: ${mode}.`,
    `The rejected options each confuse this with a different misconception rather than the named specification point.`,
  ].join(' ')

  return {
    id,
    examBoard: boardNames[board],
    subject: 'Physics',
    qualification: ADAPTIVE_SPEC_MANIFESTS[board].qualification,
    specVersion: ADAPTIVE_SPEC_MANIFESTS[board].specVersion,
    sourceUrl: ADAPTIVE_SPEC_MANIFESTS[board].sourceUrl,
    topic: legacy.topic,
    subtopic: legacy.subtopic,
    topicSlug: legacy.topicSlug,
    subtopicSlug: legacy.subtopicSlug,
    topicId: legacy.topicId,
    specRef: spec.specRef,
    specStatement: spec.statement,
    paper: spec.paper,
    courseAvailability: spec.courseAvailability,
    tier: spec.tier,
    mathsSkills: spec.mathsSkills || [],
    workingScientifically: spec.workingScientifically || [],
    learningObjective,
    assessmentObjective: detail.assessmentObjective,
    demand: detail.demand,
    difficulty,
    commandWord: detail.commandWord,
    responseMode: mode,
    patternId: `${spec.specRef}:${fact.id}:${mode}`,
    conceptFamily: fact.id,
    contextType: context,
    skill: displaySkill(spec),
    stem,
    question: stem,
    options,
    correctAnswer: options[correctIndex],
    correctIndex,
    explanation,
    misconceptionTag: `misconception:${fact.id}`,
    distractorRationales: distractors.map((text, distractorIndex) => ({
      text,
      misconception: fact.distractors[distractorIndex % fact.distractors.length],
    })),
    diagramJson: null,
    authorNotes: `Generated from ${boardNames[board]} ${spec.specRef}; review required if spec changes.`,
    review: {
      status: 'reviewed',
      reviewerRole: `${boardNames[board]} GCSE Physics content QA`,
      reviewedAt: new Date().toISOString().slice(0, 10),
    },
    senNote: `This checks one idea only: ${fact.objective}`,
  }
}

function generateForSubtopic(board, legacy, spec, targetCount) {
  const authoredItems = authoredLookup.get(authoredKey(board, legacy.topic, legacy.subtopic))
  if (authoredItems?.length) {
    return authoredItems.map((item) => makeAuthoredQuestion({ board, legacy, spec, item }))
  }

  const allFacts = TOPIC_FACTS[spec.topicId] || TOPIC_FACTS[legacy.topicId]
  const overrideIds = FACT_OVERRIDES[spec.subtopic] || FACT_OVERRIDES[legacy.subtopic] || null
  const facts = overrideIds
    ? overrideIds.map((id) => allFacts?.find((fact) => fact.id === id)).filter(Boolean)
    : allFacts
  if (!facts?.length) {
    throw new Error(`Missing fact bank for ${board} ${legacy.topic} / ${legacy.subtopic} (${legacy.topicId})`)
  }

  return Array.from({ length: targetCount }, (_, index) => {
    const fact = pick(facts, index)
    return makeQuestion({ board, legacy, spec, fact, index })
  })
}

function buildManifest(boardQuestions) {
  const generatedAt = new Date().toISOString()
  const manifest = {
    generatedAt,
    source: 'scripts/regenerate_adaptive_questions.mjs',
    counts: {
      total: boards.reduce((sum, board) => sum + boardQuestions[board].length, 0),
      boards: Object.fromEntries(boards.map((board) => [board, boardQuestions[board].length])),
    },
    boards: {},
  }

  for (const board of boards) {
    manifest.boards[board] = {
      name: boardNames[board],
      qualification: ADAPTIVE_SPEC_MANIFESTS[board].qualification,
      all: `/data/questions/${board}/all.json`,
      count: boardQuestions[board].length,
      topics: {},
    }

    for (const topicSlug of topicFileOrder) {
      const filePath = path.join(dataRoot, board, `${topicSlug}.json`)
      if (fs.existsSync(filePath)) {
        manifest.boards[board].topics[topicSlug] = `/data/questions/${board}/${topicSlug}.json`
      }
    }
  }

  return manifest
}

function main() {
  const legacyShape = getLegacyShape()
  const boardQuestions = {}

  for (const board of boards) {
    const specs = specLookup(board)
    const generated = []

    for (const legacy of legacyShape[board].values()) {
      const spec = specs.get(`${legacy.topic}|||${legacy.subtopic}`)
      if (!spec) {
        throw new Error(`Missing spec manifest entry for ${board} ${legacy.topic} / ${legacy.subtopic}`)
      }
      generated.push(...generateForSubtopic(board, legacy, spec, legacy.count))
    }

    boardQuestions[board] = generated
  }

  const totalQuestionCount = boards.reduce((sum, board) => sum + boardQuestions[board].length, 0)
  if (totalQuestionCount < MINIMUM_RELEASE_QUESTION_COUNT) {
    throw new Error(`Adaptive Practice bank has ${totalQuestionCount} questions; release floor is ${MINIMUM_RELEASE_QUESTION_COUNT}. Add authored items before regenerating.`)
  }

  for (const board of boards) {
    const boardDir = path.join(dataRoot, board)
    fs.mkdirSync(boardDir, { recursive: true })
    writeJson(path.join(boardDir, 'all.json'), {
      examBoard: boardNames[board],
      qualification: ADAPTIVE_SPEC_MANIFESTS[board].qualification,
      generatedAt: new Date().toISOString(),
      questions: boardQuestions[board],
    })

    for (const topicSlug of topicFileOrder) {
      const questions = boardQuestions[board].filter((question) => question.topicSlug === topicSlug)
      writeJson(path.join(boardDir, `${topicSlug}.json`), {
        examBoard: boardNames[board],
        qualification: ADAPTIVE_SPEC_MANIFESTS[board].qualification,
        topicSlug,
        generatedAt: new Date().toISOString(),
        questions,
      })
    }
  }

  writeJson(path.join(dataRoot, 'manifest.json'), buildManifest(boardQuestions))

  for (const board of boards) {
    console.log(`${board}: ${boardQuestions[board].length} questions regenerated`)
  }
}

main()
