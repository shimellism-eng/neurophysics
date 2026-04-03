import type { ComponentType } from 'react';

import { ForceDiagram } from './ForceDiagram';
import { NewtonsThirdDiagram } from './NewtonsThirdDiagram';
import { WaveDiagram } from './WaveDiagram';
import { EMSpectrumDiagram } from './EMSpectrumDiagram';
import { SeriesCircuitDiagram } from './SeriesCircuitDiagram';
import { ParallelCircuitDiagram } from './ParallelCircuitDiagram';

// Wrappers so each registry entry is a zero-props component

const ForceDiagramBalanced = () => ForceDiagram({ type: 'balanced' });
const ForceDiagramUnbalanced = () => ForceDiagram({ type: 'unbalanced' });
const ForceDiagramWeightOnly = () => ForceDiagram({ type: 'weight-only' });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const DIAGRAM_REGISTRY: Record<string, ComponentType<any>> = {
  'force-diagram-balanced':   ForceDiagramBalanced,
  'force-diagram-unbalanced': ForceDiagramUnbalanced,
  'force-diagram-weight-only': ForceDiagramWeightOnly,
  'newtons-third':            NewtonsThirdDiagram,
  'wave-diagram':             WaveDiagram,
  'em-spectrum':              EMSpectrumDiagram,
  'series-circuit':           SeriesCircuitDiagram,
  'parallel-circuit':         ParallelCircuitDiagram,
};
