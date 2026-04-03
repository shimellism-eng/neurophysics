import { Suspense } from 'react';
import type { SimulationStep as SimulationStepType } from '../../types/content';
import { StepTag } from '../ui/StepTag';
import { SimRegistry } from '../simulations/SimRegistry';
import './LessonStep.css';
import './SimulationStep.css';

interface SimulationStepProps {
  step: SimulationStepType;
  onComplete: () => void;
}

function SimLoader() {
  return <div className="sim-loader">Loading simulation…</div>;
}

export function SimulationStep({ step, onComplete }: SimulationStepProps) {
  const SimComponent = SimRegistry[step.simId];

  return (
    <div className="lesson-step">
      <div className="lesson-step__header">
        <StepTag label={step.uiTag} color={step.uiColor} />
        <h2 className="lesson-step__title">{step.title}</h2>
      </div>

      <p className="sim-step__instruction">{step.instruction}</p>

      <div className="sim-step__canvas">
        {SimComponent ? (
          <Suspense fallback={<SimLoader />}>
            <SimComponent config={step.simConfig} />
          </Suspense>
        ) : (
          <div className="sim-step__missing">
            Simulation <code>{step.simId}</code> not found
          </div>
        )}
      </div>

      <button className="lesson-step__cta" onClick={onComplete}>
        Done exploring →
      </button>
    </div>
  );
}
