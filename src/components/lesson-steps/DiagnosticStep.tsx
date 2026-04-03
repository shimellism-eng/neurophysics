import { useState } from 'react';
import type { DiagnosticStep as DiagnosticStepType, BoardId } from '../../types/content';
import { StepTag } from '../ui/StepTag';
import './LessonStep.css';
import './DiagnosticStep.css';

interface DiagnosticStepProps {
  step: DiagnosticStepType;
  boardId: BoardId;
  conceptId: string;
  onComplete: (correct: boolean) => void;
  onLog: (answer: number, correct: boolean) => void;
}

export function DiagnosticStep({ step, onComplete, onLog }: DiagnosticStepProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);

  function handleSelect(idx: number) {
    if (answered) return;
    const correct = idx === step.correctIndex;
    setSelected(idx);
    setAnswered(true);
    onLog(idx, correct);
  }

  const correct = selected === step.correctIndex;

  return (
    <div className="lesson-step">
      <div className="lesson-step__header">
        <StepTag label={step.uiTag} color={step.uiColor} />
        <h2 className="lesson-step__title">{step.title}</h2>
      </div>

      <p className="diagnostic__question">{step.question}</p>

      <div className="diagnostic__options" role="group" aria-label="Answer options">
        {step.options.map((opt, i) => {
          let state = '';
          if (answered) {
            if (i === step.correctIndex) state = 'correct';
            else if (i === selected) state = 'wrong';
            else state = 'dim';
          }
          return (
            <button
              key={i}
              className={`diagnostic__option diagnostic__option--${state || 'idle'}`}
              onClick={() => handleSelect(i)}
              disabled={answered}
              aria-pressed={selected === i}
            >
              <span className="diagnostic__option-letter">{String.fromCharCode(65 + i)}</span>
              <span>{opt}</span>
            </button>
          );
        })}
      </div>

      {answered && (
        <div className={`diagnostic__feedback diagnostic__feedback--${correct ? 'correct' : 'wrong'}`}>
          <p>{correct ? step.correctFeedback : step.misconceptionFeedback}</p>
          {step.bestSource && <p className="diagnostic__source">{step.bestSource}</p>}
        </div>
      )}

      {answered && (
        <button className="lesson-step__cta" onClick={() => onComplete(correct)}>
          Continue →
        </button>
      )}
    </div>
  );
}
