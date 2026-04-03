import { lazy, type ComponentType } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SimRegistry: Record<string, React.LazyExoticComponent<ComponentType<any>>> = {
  'fma-slider':      lazy(() => import('./FmaSlider')),
  // Phase 2 — scaffold only:
  // 'circuit-builder': lazy(() => import('./CircuitBuilder')),
  // 'wave-sim':        lazy(() => import('./WaveSim')),
  // 'decay-counter':   lazy(() => import('./DecayCounter')),
};
