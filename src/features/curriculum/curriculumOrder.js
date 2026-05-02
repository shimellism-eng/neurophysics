import {
  getVisibleTopicIdsForSelection,
  isModuleAvailableForSelection,
} from '../../utils/curriculumFilters'

const AQA_ORDER = [
  {
    name: 'Energy',
    source: 'Energy',
    topics: ['energy_stores', 'energy_equations', 'power_calc', 'energy_pathways', 'efficiency', 'energy_resources', 'shc', 'insulation'],
  },
  {
    name: 'Electricity',
    source: 'Electricity',
    topics: ['circuit_basics', 'circuit_components', 'series_parallel', 'domestic_electricity', 'electrical_power', 'national_grid', 'static_electricity', 'resistance', 'iv_characteristics'],
  },
  {
    name: 'Particle Model',
    source: 'Particle Model',
    topics: ['states_density', 'density', 'internal_energy', 'specific_latent_heat', 'latent_heat', 'gas_pressure'],
  },
  {
    name: 'Atomic Structure',
    source: 'Atomic Structure',
    topics: ['atomic_structure', 'atomic_model_history', 'radioactive_decay', 'nuclear_equations', 'half_life', 'radiation_hazards', 'nuclear_fission', 'nuclear_fusion'],
  },
  {
    name: 'Forces',
    source: 'Forces',
    topics: ['vectors_scalars', 'force_interactions', 'work_done', 'hookes_law', 'spring', 'moments', 'fluid_pressure', 'motion_graphs', 'equations_of_motion', 'acceleration', 'terminal_velocity', 'newtons_laws', 'stopping_distance', 'momentum', 'circular_motion'],
  },
  {
    name: 'Waves',
    source: 'Waves',
    topics: ['wave_types', 'wave_properties', 'waves', 'wave_reflection', 'light', 'total_internal_reflection', 'sound_ultrasound', 'em_spectrum', 'radiation', 'visible_light', 'lenses', 'converging_diverging_lenses', 'black_body'],
  },
  {
    name: 'Magnetism & Electromagnetism',
    source: 'Magnetism & Electromagnetism',
    topics: ['magnetism_fields', 'electromagnetism', 'motor_effect', 'em_induction', 'ac_generators', 'transformers'],
  },
  {
    name: 'Space Physics',
    source: 'Space Physics',
    topics: ['solar_system', 'stellar_evolution', 'redshift'],
  },
]

const EDEXCEL_ORDER = [
  {
    name: 'Topic 1: Key Concepts of Physics',
    source: 'Key Concepts',
    topics: ['key_concepts_units', 'key_concepts_scalars', 'key_concepts_equations'],
  },
  {
    name: 'Topic 2: Motion and Forces',
    source: 'Forces',
    topics: ['vectors_scalars', 'motion_graphs', 'equations_of_motion', 'newtons_laws', 'acceleration', 'stopping_distance', 'momentum'],
  },
  {
    name: 'Topic 3: Conservation of Energy',
    source: 'Energy',
    topics: ['energy_stores', 'energy_equations', 'efficiency', 'energy_resources'],
  },
  {
    name: 'Topic 4: Waves',
    source: 'Waves',
    topics: ['wave_types', 'wave_properties', 'waves', 'wave_reflection', 'sound_ultrasound'],
  },
  {
    name: 'Topic 5: Light and the EM Spectrum',
    source: 'Waves',
    topics: ['visible_light', 'light', 'lenses', 'converging_diverging_lenses', 'em_spectrum', 'radiation', 'black_body'],
  },
  {
    name: 'Topic 6: Radioactivity',
    source: 'Atomic Structure',
    topics: ['atomic_structure', 'atomic_model_history', 'radioactive_decay', 'nuclear_equations', 'half_life', 'radiation_hazards', 'nuclear_fission', 'nuclear_fusion'],
  },
  {
    name: 'Topic 7: Astronomy',
    source: 'Space Physics',
    topics: ['solar_system', 'stellar_evolution', 'redshift'],
  },
  {
    name: 'Topic 8: Energy - Forces Doing Work',
    source: 'Forces',
    topics: ['work_done', 'power_calc'],
  },
  {
    name: 'Topic 9: Forces and Their Effects',
    source: 'Forces',
    topics: ['force_interactions', 'moments'],
  },
  {
    name: 'Topic 10: Electricity and Circuits',
    source: 'Electricity',
    topics: ['circuit_basics', 'circuit_components', 'series_parallel', 'resistance', 'iv_characteristics', 'domestic_electricity', 'electrical_power'],
  },
  {
    name: 'Topic 11: Static Electricity',
    source: 'Electricity',
    topics: ['static_electricity'],
  },
  {
    name: 'Topic 12: Magnetism and the Motor Effect',
    source: 'Magnetism & Electromagnetism',
    topics: ['magnetism_fields', 'electromagnetism', 'motor_effect'],
  },
  {
    name: 'Topic 13: Electromagnetic Induction',
    source: 'Magnetism & Electromagnetism',
    topics: ['em_induction', 'ac_generators', 'transformers', 'national_grid'],
  },
  {
    name: 'Topic 14: Particle Model',
    source: 'Particle Model',
    topics: ['states_density', 'density', 'internal_energy', 'shc', 'specific_latent_heat', 'latent_heat', 'gas_pressure'],
  },
  {
    name: 'Topic 15: Forces and Matter',
    source: 'Forces',
    topics: ['hookes_law', 'spring', 'fluid_pressure'],
  },
]

function sourceModuleFor(baseModules, group) {
  return (
    baseModules.find((module) => module.name === group.source) ||
    baseModules.find((module) => group.topics.some((topicId) => module.topics.includes(topicId)))
  )
}

function buildOrderedModules(baseModules, order, boardId, course) {
  const seen = new Set()

  return order
    .map((group) => {
      const source = sourceModuleFor(baseModules, group)
      if (!source) return null

      const topics = getVisibleTopicIdsForSelection(group.topics, boardId, course)
        .filter((topicId) => {
          if (seen.has(topicId)) return false
          seen.add(topicId)
          return true
        })

      if (!topics.length) return null

      return {
        ...source,
        name: group.name,
        topics,
        sourceModuleName: source.name,
      }
    })
    .filter(Boolean)
}

export function getCurriculumModules(baseModules, boardId, course = 'combined') {
  if (boardId === 'aqa') return buildOrderedModules(baseModules, AQA_ORDER, boardId, course)
  if (boardId === 'edexcel') return buildOrderedModules(baseModules, EDEXCEL_ORDER, boardId, course)
  return baseModules.filter((module) => isModuleAvailableForSelection(module, boardId, course))
}

export function getCurriculumTopicIds(baseModules, boardId, course = 'combined') {
  return getCurriculumModules(baseModules, boardId, course).flatMap((module) => module.topics)
}

