// src/design/tokens.js
// Single source of truth for NeuroPhysics design decisions.
// CSS custom properties are declared in index.css — keep the two in sync.

export const colors = {
  // Backgrounds
  bg:           '#080f1e',
  bgMid:        '#0d1526',
  bgLift:       '#111827',

  // Surfaces (glassmorphism)
  surface:      'rgba(15,22,41,0.95)',
  surfaceDeep:  'rgba(8,15,30,0.96)',
  surfaceLift:  'rgba(20,30,55,0.90)',

  // Borders
  border:       'rgba(255,255,255,0.08)',
  borderMid:    'rgba(255,255,255,0.12)',
  borderStrong: 'rgba(255,255,255,0.18)',

  // Brand
  accent:      '#6366f1',
  cyan:        '#6366f1',
  cyanMuted:   'rgba(99,102,241,0.14)',
  indigo:      '#6366f1',
  indigoMuted: 'rgba(99,102,241,0.14)',
  purple:      '#9b59b6',
  amber:       '#f39c12',
  pink:        '#e91e8c',
  green:       '#22c55e',
  success:     '#22c55e',
  warning:     '#f59e0b',
  danger:      '#ef4444',
  red:         '#ef4444',
  gold:        '#fdc700',

  // Text
  text:        '#e2e8f0',
  textMid:     '#cbd5e1',
  textMuted:   '#94a3b8',
  textDim:     '#64748b',
  textInverse: '#080f1e',
};

export const typography = {
  fontBody:    "'Atkinson Hyperlegible', sans-serif",
  fontDisplay: "'Bricolage Grotesque', sans-serif",
  fontMono:    "'IBM Plex Mono', monospace",
  fontHand:    "'Kalam', cursive",
};

export const radii = {
  sm:    '8px',
  md:    '10px',
  lg:    '12px',
  xl:    '16px',
  '2xl': '20px',
  full:  '9999px',
};

export const layout = {
  navHeight: '60px',
  pageHPad: '20px',
  pageTopGap: '12px',
  pageBottomGap: '24px',
  bottomChromeHeight: 'calc(var(--nav-height) + var(--safe-bottom))',
};

// Module colours — used by lesson components and HomeScreen CTA.
// The dynamic `moduleColor` prop flow in LessonPlayer is unchanged;
// this map is reference data for any new code that needs a module colour.
export const moduleColors = {
  forces:        '#6366f1',
  energy:        '#f59e0b',
  waves:         '#06b6d4',
  electricity:   '#eab308',
  magnetism:     '#8b5cf6',
  particle:      '#ec4899',
  space:         '#3b82f6',
  radioactivity: '#ef4444',
  default:       '#6366f1',
};

// Helper: 40%-opacity glow drop-shadow from any hex/rgba colour
export const glowShadow = (color, spread = 20) =>
  `0 0 ${spread}px ${color}40`;
