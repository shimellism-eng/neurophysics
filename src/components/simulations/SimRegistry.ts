import { lazy, type ComponentType } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SimRegistry: Record<string, React.LazyExoticComponent<ComponentType<any>>> = {
  'fma-slider':          lazy(() => import('./FmaSlider')),
  'weight-gravity-sim':  lazy(() => import('./WeightGravitySim')),
  'momentum-sim':        lazy(() => import('./MomentumSim')),
  'wave-sim':            lazy(() => import('./WaveSim')),
  'circuit-sim':         lazy(() => import('./CircuitSim')),
  'hookes-law-sim':      lazy(() => import('./HookesLawSim')),
  'phet':                lazy(() => import('./PhETSimWrapper')),
  // Phase 2 — scaffold only:
  // 'circuit-builder': lazy(() => import('./CircuitBuilder')),
  // 'decay-counter':   lazy(() => import('./DecayCounter')),
};
