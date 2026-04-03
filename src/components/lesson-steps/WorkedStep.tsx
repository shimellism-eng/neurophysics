import type { WorkedExampleStep, BoardId, WorkedExampleData } from '../../types/content';
import { StepTag } from '../ui/StepTag';
import './LessonStep.css';
import './WorkedStep.css';

const AQA_FALLBACK: BoardId = 'aqa';

interface WorkedStepProps {
  step: WorkedExampleStep;
  boardId: BoardId;
  onComplete: () => void;
}

export function WorkedStep({ step, boardId, onComplete }: WorkedStepProps) {
  const example: WorkedExampleData | undefined =
    step.workedExamples[boardId] ?? step.workedExamples[AQA_FALLBACK];
  const isFallback = !step.workedExamples[boardId] && !!step.workedExamples[AQA_FALLBACK];

  if (!example) {
    return (
      <div className="lesson-step">
        <StepTag label={step.uiTag} color={step.uiColor} />
        <p className="text-muted">No worked example available for this board yet.</p>
        <button className="lesson-step__cta" onClick={onComplete}>Continue →</button>
      </div>
    );
  }

  return (
    <div className="lesson-step">
      <div className="lesson-step__header">
        <StepTag label={step.uiTag} color={step.uiColor} />
      </div>

      <div className="worked__source-bar">
        <span className="worked__source">{example.source}</span>
        <span className="worked__marks">{example.totalMarks} marks</span>
      </div>

      {isFallback && (
        <p className="worked__fallback-notice">
          This example is from AQA. Your board uses the same method.
        </p>
      )}

      <div className="worked__question card">
        <p className="worked__q-label">Question</p>
        <p>{example.questionText}</p>
      </div>

      <div className="worked__steps">
        {example.steps.map(s => (
          <div key={s.stepNum} className="worked__step">
            <div className="worked__step-header">
              <span className="worked__step-num">{s.stepNum}</span>
              <span className="worked__step-label">{s.label}</span>
            </div>
            {s.content && <p className="worked__step-content">{s.content}</p>}
            {s.equation && (
              <div className="worked__step-eq">
                <code className="eq">{s.equation}</code>
              </div>
            )}
            {s.markSchemeNote && (
              <p className="worked__step-mark">{s.markSchemeNote}</p>
            )}
          </div>
        ))}
      </div>

      <div className="worked__answer">
        <span>Final answer:</span>
        <span className="worked__answer-value eq">{example.finalAnswer} {example.finalAnswerUnit}</span>
      </div>

      <button className="lesson-step__cta" onClick={onComplete}>
        Now your turn →
      </button>
    </div>
  );
}
