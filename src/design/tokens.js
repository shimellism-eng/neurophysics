// src/design/tokens.js
// Single source of truth for NeuroPhysics design decisions.
// CSS custom properties are declared in index.css — keep the two in sync.

export const colors = {
  // Backgrounds
  bg:           '#07111d',
  bgMid:        '#0a1725',
  bgLift:       '#102033',

  // Surfaces
  surface:      'rgba(15,27,43,0.95)',
  surfaceDeep:  'rgba(7,17,29,0.96)',
  surfaceLift:  'rgba(24,43,66,0.90)',

  // Borders
  border:       'rgba(210,225,240,0.085)',
  borderMid:    'rgba(210,225,240,0.14)',
  borderStrong: 'rgba(210,225,240,0.22)',

  // Brand
  accent:      '#5ea7a1',
  cyan:        '#5ea7a1',
  cyanMuted:   'rgba(94,167,161,0.14)',
  purple:      '#8d7aa8',
  amber:       '#d88b2d',
  pink:        '#e91e8c',
  green:       '#22c55e',
  success:     '#22c55e',
  warning:     '#f59e0b',
  danger:      '#ef4444',
  red:         '#ef4444',
  gold:        '#d8a72d',

  // Text
  text:        '#eef4f6',
  textMid:     '#c9d6dc',
  textMuted:   '#8ea0aa',
  textDim:     '#5b6b76',
  textInverse: '#07111d',
};

export const typography = {
  fontBody:    "'Atkinson Hyperlegible', sans-serif",
  fontDisplay: "'Bricolage Grotesque', sans-serif",
  fontMono:    "'JetBrains Mono', monospace",
  fontHand:    "'Kalam', cursive",
};

export const radii = {
  sm:    '10px',
  md:    '14px',
  lg:    '18px',
  xl:    '22px',
  '2xl': '28px',
  full:  '9999px',
};

export const layout = {
  navHeight: '58px',
  pageHPad: '20px',
  pageTopGap: '12px',
  pageBottomGap: '24px',
  bottomChromeHeight: 'calc(var(--nav-height) + var(--safe-bottom))',
};

// Module colours — used by lesson components and HomeScreen CTA.
// The dynamic `moduleColor` prop flow in LessonPlayer is unchanged;
// this map is reference data for any new code that needs a module colour.
export const moduleColors = {
  forces:        '#5ea7a1',
  energy:        '#d88b2d',
  waves:         '#06b6d4',
  electricity:   '#eab308',
  magnetism:     '#8b5cf6',
  particle:      '#ec4899',
  space:         '#3b82f6',
  radioactivity: '#ef4444',
  default:       '#5ea7a1',
};

// Helper: 40%-opacity glow drop-shadow from any hex/rgba colour
export const glowShadow = (color, spread = 20) =>
  `0 0 ${spread}px ${color}40`;
