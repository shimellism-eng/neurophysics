import { useState } from 'react';
import type { DiagnosticStep as DiagnosticStepType, BoardId } from '../../types/content';
import { useHaptics } from '../../hooks/useHaptics';
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
  const { lightTap, errorBuzz } = useHaptics();

  function handleSelect(idx: number) {
    if (answered) return;
    const correct = idx === step.correctIndex;
    setSelected(idx);
    setAnswered(true);
    onLog(idx, correct);
    if (correct) lightTap(); else errorBuzz();
  }

  const correct = selected === step.correctIndex;

  return (
    <div className="lesson-step">
      <div className="lesson-step__header">
        <StepTag label={step.uiTag} color={step.uiColor} />
        <h2 className="lesson-step__title">{step.title}</h2>
      </div>

      <div className="diagnostic__question-card">
        <p className="diagnostic__question">{step.question}</p>
      </div>

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
              <span className="diagnostic__option-text">{opt}</span>
              {answered && state === 'correct' && (
                <svg className="diagnostic__option-icon" viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
              {answered && state === 'wrong' && (
                <svg className="diagnostic__option-icon" viewBox="0 0 24 24" fill="none" stroke="var(--red)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              )}
            </button>
          );
        })}
      </div>

      {answered && (
        <div className={`diagnostic__feedback diagnostic__feedback--${correct ? 'correct' : 'wrong'}`}>
          <div className="diagnostic__feedback-row">
            <span className="diagnostic__feedback-emoji" aria-hidden="true">
              {correct ? '✓' : '✗'}
            </span>
            <p className="diagnostic__feedback-body">
              {correct ? step.correctFeedback : step.misconceptionFeedback}
            </p>
          </div>
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
