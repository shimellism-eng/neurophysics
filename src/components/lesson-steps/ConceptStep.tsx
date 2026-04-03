import type { ConceptStep as ConceptStepType } from '../../types/content';
import { StepTag } from '../ui/StepTag';
import './LessonStep.css';
import './ConceptStep.css';

interface ConceptStepProps {
  step: ConceptStepType;
  onComplete: () => void;
}

export function ConceptStep({ step, onComplete }: ConceptStepProps) {
  return (
    <div className="lesson-step">
      <div className="lesson-step__header">
        <StepTag label={step.uiTag} color={step.uiColor} />
        <h2 className="lesson-step__title">{step.title}</h2>
      </div>

      {step.keyEquation && (
        <div className="concept__equation">
          <span className="eq">{step.keyEquation}</span>
        </div>
      )}

      <div
        className="concept__body"
        dangerouslySetInnerHTML={{ __html: step.bodyHTML }}
      />

      {step.diagram && step.diagram.variables.length > 0 && (
        <div className="concept__variables">
          {step.diagram.variables.map(v => (
            <div key={v.symbol} className={`concept__var concept__var--${v.color}`}>
              <span className="concept__var-symbol eq">{v.symbol}</span>
              <span className="concept__var-label">{v.label}</span>
              <span className="concept__var-unit">{v.unit}</span>
            </div>
          ))}
          {step.diagram.relationships && step.diagram.relationships.map((r, i) => (
            <p key={i} className="concept__relationship">→ {r}</p>
          ))}
        </div>
      )}

      {step.commonErrors.length > 0 && (
        <div className="concept__errors">
          <p className="concept__errors-title">Common errors to avoid:</p>
          <ul>
            {step.commonErrors.map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      <button className="lesson-step__cta" onClick={onComplete}>
        Got it — next →
      </button>
    </div>
  );
}
