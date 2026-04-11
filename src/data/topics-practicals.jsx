/**
 * topics-practicals.jsx
 * Slim topic metadata for all 11 Required Practicals.
 * These topics navigate to PracticalScreen (/practical/:id) rather than LessonPlayer.
 * The `practicalId` field is the key that LearnScreen uses to route correctly.
 */

const MODULE_COLOR = '#14b8a6' // teal — Required Practicals module colour

export const PRACTICALS_TOPICS = {
  shc: {
    id: 'shc',
    title: 'Specific Heat Capacity',
    subtitle: 'RP1 · Energy',
    course: 'combined',
    practicalId: 'shc',
    moduleColor: MODULE_COLOR,
  },
  insulation: {
    id: 'insulation',
    title: 'Thermal Insulation',
    subtitle: 'RP2 · Energy',
    course: 'combined',
    practicalId: 'insulation',
    moduleColor: MODULE_COLOR,
  },
  resistance: {
    id: 'resistance',
    title: 'Resistance of a Wire',
    subtitle: 'RP3 · Electricity',
    course: 'combined',
    practicalId: 'resistance',
    moduleColor: MODULE_COLOR,
  },
  iv_characteristics: {
    id: 'iv_characteristics',
    title: 'I-V Characteristics',
    subtitle: 'RP4 · Electricity',
    course: 'combined',
    practicalId: 'iv_characteristics',
    moduleColor: MODULE_COLOR,
  },
  density: {
    id: 'density',
    title: 'Density of Materials',
    subtitle: 'RP5 · Particle Model',
    course: 'combined',
    practicalId: 'density',
    moduleColor: MODULE_COLOR,
  },
  spring: {
    id: 'spring',
    title: "Force and Extension",
    subtitle: "RP7 · Forces",
    course: 'combined',
    practicalId: 'spring',
    moduleColor: MODULE_COLOR,
  },
  acceleration: {
    id: 'acceleration',
    title: "Newton's 2nd Law",
    subtitle: 'RP8 · Forces',
    course: 'combined',
    practicalId: 'acceleration',
    moduleColor: MODULE_COLOR,
  },
  waves: {
    id: 'waves',
    title: 'Waves (Ripple Tank)',
    subtitle: 'RP9 · Waves',
    course: 'combined',
    practicalId: 'waves',
    moduleColor: MODULE_COLOR,
  },
  radiation: {
    id: 'radiation',
    title: 'Radiation & Absorption',
    subtitle: 'RP10 · Waves',
    course: 'combined',
    practicalId: 'radiation',
    moduleColor: MODULE_COLOR,
  },
  latent_heat: {
    id: 'latent_heat',
    title: 'Specific Latent Heat',
    subtitle: 'RP6 · Particle Model',
    course: 'physics_only',
    practicalId: 'latent_heat',
    moduleColor: MODULE_COLOR,
  },
  light: {
    id: 'light',
    title: 'Reflection & Refraction',
    subtitle: 'RP11 · Waves',
    course: 'physics_only',
    practicalId: 'light',
    moduleColor: MODULE_COLOR,
  },
}
