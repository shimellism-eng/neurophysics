import { ENERGY_TOPICS } from './topics-energy'
import { ELECTRICITY_TOPICS } from './topics-electricity'
import { MATTER_TOPICS } from './topics-matter'
import { FORCES_TOPICS } from './topics-forces'
import { WAVES_TOPICS } from './topics-waves'
import { PRACTICALS_TOPICS } from './topics-practicals'
import {
  Zap, Battery, Flame, Wind, Activity,
  Waves, Radio, Magnet, Globe2, FlaskConical,
  BookOpen, Globe, Telescope,
} from 'lucide-react'
import AtomIcon from '../components/AtomIcon'

export const TOPICS = {
  ...ENERGY_TOPICS,
  ...ELECTRICITY_TOPICS,
  ...MATTER_TOPICS,
  ...FORCES_TOPICS,
  ...WAVES_TOPICS,
  ...PRACTICALS_TOPICS,

  // ── Edexcel: Key Concepts of Physics (Topic 1) ────────────────────────────
  key_concepts_units: {
    id: 'key_concepts_units',
    title: 'SI Units & Standard Form',
    boards: ['edexcel'],
    lessonSteps: [],
  },
  key_concepts_scalars: {
    id: 'key_concepts_scalars',
    title: 'Scalars and Vectors',
    boards: ['edexcel'],
    lessonSteps: [],
  },
  key_concepts_equations: {
    id: 'key_concepts_equations',
    title: 'Rearranging Equations',
    boards: ['edexcel'],
    lessonSteps: [],
  },

  // ── OCR Gateway A: Global Challenges (P8) ────────────────────────────────
  transport_safety: {
    id: 'transport_safety',
    title: 'Transport Safety',
    boards: ['ocr-a'],
    lessonSteps: [],
  },
  electricity_costs: {
    id: 'electricity_costs',
    title: 'Electricity Costs',
    boards: ['ocr-a'],
    lessonSteps: [],
  },

  // ── OCR 21st Century B: Studying the Universe (P7) ───────────────────────
  telescope_optics: {
    id: 'telescope_optics',
    title: 'Telescope Optics',
    boards: ['ocr-b'],
    lessonSteps: [],
  },
  stellar_classification: {
    id: 'stellar_classification',
    title: 'HR Diagram & Stellar Types',
    boards: ['ocr-b'],
    lessonSteps: [],
  },
  history_astronomy: {
    id: 'history_astronomy',
    title: 'History of Astronomy',
    boards: ['ocr-b'],
    lessonSteps: [],
  },
}

// Topics that are GCSE Physics only (NOT in Combined Science Trilogy)
export const PHYSICS_ONLY_TOPICS = new Set([
  'moments',
  'fluid_pressure',
  'nuclear_fission',
  'nuclear_fusion',
  'lenses',
  'ac_generators',
  'transformers',
  'solar_system',
  'stellar_evolution',
  'redshift',
])

export const MODULES = [
  {
    name: 'Energy',
    color: '#f97316',
    icon: Zap,
    topics: [
      'energy_stores',
      'energy_pathways',
      'energy_equations',
      'efficiency',
      'power_calc',
      'energy_resources',
    ],
  },
  {
    name: 'Electricity',
    color: '#155dfc',
    icon: Battery,
    topics: [
      'circuit_basics',
      'circuit_components',
      'series_parallel',
      'domestic_electricity',
      'electrical_power',
      'national_grid',
      'static_electricity',
    ],
  },
  {
    name: 'Particle Model',
    color: '#c084fc',
    icon: Flame,
    topics: [
      'states_density',
      'internal_energy',
      'specific_latent_heat',
      'gas_pressure',
    ],
  },
  {
    name: 'Atomic Structure',
    color: '#e879f9',
    icon: AtomIcon,
    topics: [
      'atomic_structure',
      'atomic_model_history',
      'radioactive_decay',
      'nuclear_equations',
      'half_life',
      'radiation_hazards',
      'nuclear_fission',
      'nuclear_fusion',
    ],
  },
  {
    name: 'Forces',
    color: '#00a8e8',
    icon: Activity,
    topics: [
      'vectors_scalars',
      'force_interactions',
      'work_done',
      'hookes_law',
      'moments',
      'fluid_pressure',
      'motion_graphs',
      'equations_of_motion',
      'terminal_velocity',
      'newtons_laws',
      'stopping_distance',
      'momentum',
    ],
  },
  {
    name: 'Waves',
    color: '#fdc700',
    icon: Waves,
    topics: [
      'wave_types',
      'wave_properties',
      'wave_reflection',
      'total_internal_reflection',
      'sound_ultrasound',
      'em_spectrum',
      'visible_light',
      'lenses',
      'black_body',
    ],
  },
  {
    name: 'Magnetism & Electromagnetism',
    color: '#10b981',
    icon: Magnet,
    topics: [
      'magnetism_fields',
      'electromagnetism',
      'motor_effect',
      'em_induction',
      'ac_generators',
      'transformers',
    ],
  },
  {
    name: 'Space Physics',
    color: '#6366f1',
    icon: Globe2,
    topics: [
      'solar_system',
      'stellar_evolution',
      'redshift',
    ],
  },
  {
    name: 'Required Practicals',
    color: '#14b8a6',
    icon: FlaskConical,
    topics: [
      'shc',
      'insulation',
      'resistance',
      'iv_characteristics',
      'density',
      'spring',
      'acceleration',
      'waves',
      'radiation',
      'latent_heat',
      'light',
    ],
  },

  // ── Board-specific modules ─────────────────────────────────────────────────
  // boards: [] restricts the module to those boards only.
  // When not set, a module shows for all boards.

  {
    name: 'Key Concepts',
    color: '#f97316',
    icon: BookOpen,
    boards: ['edexcel'],
    boardLabel: 'Edexcel Topic 1',
    topics: [
      'key_concepts_units',
      'key_concepts_scalars',
      'key_concepts_equations',
    ],
  },
  {
    name: 'Global Challenges',
    color: '#10b981',
    icon: Globe,
    boards: ['ocr-a'],
    boardLabel: 'OCR Gateway A — P8',
    topics: [
      'transport_safety',
      'electricity_costs',
    ],
  },
  {
    name: 'Studying the Universe',
    color: '#06b6d4',
    icon: Telescope,
    boards: ['ocr-b'],
    boardLabel: 'OCR 21st Century — P7',
    topics: [
      'telescope_optics',
      'stellar_classification',
      'history_astronomy',
    ],
  },
]
