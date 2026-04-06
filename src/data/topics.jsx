import { ENERGY_TOPICS } from './topics-energy'
import { ELECTRICITY_TOPICS } from './topics-electricity'
import { MATTER_TOPICS } from './topics-matter'
import { FORCES_TOPICS } from './topics-forces'
import { WAVES_TOPICS } from './topics-waves'
import {
  Zap, Battery, Flame, Wind, Atom, Activity,
  Waves, Radio, Magnet, Globe2
} from 'lucide-react'

export const TOPICS = {
  ...ENERGY_TOPICS,
  ...ELECTRICITY_TOPICS,
  ...MATTER_TOPICS,
  ...FORCES_TOPICS,
  ...WAVES_TOPICS,
}

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
    icon: Atom,
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
      'force_interactions',
      'work_done',
      'hookes_law',
      'moments',
      'fluid_pressure',
      'motion_graphs',
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
]
