import type { EquationCardStep as EquationCardStepType, BoardId } from '../../types/content';
import { StepTag } from '../ui/StepTag';
import { EquationTriangle } from '../ui/EquationTriangle';
import { Equation } from '../ui/Equation';
import './LessonStep.css';
import './EquationCardStep.css';

interface EquationCardStepProps {
  step: EquationCardStepType;
  boardId: BoardId;
  onComplete: () => void;
}

export function EquationCardStep({ step, boardId, onComplete }: EquationCardStepProps) {
  const eq = step.equation;
  const onSheet = eq.onFormulaSheet[boardId] ?? true;
  const boardNote = eq.boardNotes[boardId];

  return (
    <div className="lesson-step">
      <div className="lesson-step__header">
        <StepTag label={step.uiTag} color={step.uiColor} />
        <h2 className="lesson-step__title">{step.title}</h2>
      </div>

      <div className="eq-card__canonical">
        {eq.tex ? (
          <Equation tex={eq.tex} display className="eq" />
        ) : (
          <code className="eq">{eq.canonical}</code>
        )}
        {!onSheet && (
          <span className="eq-card__memorise-badge">⚠️ Must memorise</span>
        )}
      </div>

      <EquationTriangle
        top={eq.triangleLayout.top}
        bottomLeft={eq.triangleLayout.bottomLeft}
        bottomRight={eq.triangleLayout.bottomRight}
        onFormulaSheet={onSheet}
      />

      <div className="eq-card__rearrangements">
        {eq.rearrangements.map(r => (
          <div key={r.solveFor} className="eq-card__rearrangement">
            {r.label && <span className="eq-card__r-label">{r.label}</span>}
            {r.tex ? (
              <Equation tex={r.tex} className="eq eq-card__r-formula" />
            ) : (
              <code className="eq eq-card__r-formula">{r.formula}</code>
            )}
          </div>
        ))}
      </div>

      <div className="eq-card__variables">
        {eq.variables.map(v => (
          <div key={v.symbol} className="eq-card__variable">
            <code className="eq">{v.symbol}</code>
            <span className="eq-card__var-name">{v.name}</span>
            <span className="eq-card__var-unit">{v.unit}{v.abbreviation ? ` (${v.abbreviation})` : ''}</span>
            {v.constant !== undefined && (
              <span className="eq-card__var-const">= {v.constant}</span>
            )}
          </div>
        ))}
      </div>

      {eq.examTip && (
        <div className="eq-card__tip">
          <span className="eq-card__tip-icon">💡</span>
          <p>{eq.examTip}</p>
        </div>
      )}

      {boardNote && (
        <div className={`eq-card__board-note ${!onSheet ? 'eq-card__board-note--warn' : ''}`}>
          <p>{boardNote}</p>
        </div>
      )}

      <button className="lesson-step__cta" onClick={onComplete}>
        Lesson complete! ✓
      </button>
    </div>
  );
}
