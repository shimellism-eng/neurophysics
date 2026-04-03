import { useState } from 'react';
import type { YourTurnStep as YourTurnStepType, BoardId } from '../../types/content';
import { StepTag } from '../ui/StepTag';
import { MarkSchemeReveal } from '../ui/MarkSchemeReveal';
import './LessonStep.css';
import './YourTurnStep.css';

const AQA_FALLBACK: BoardId = 'aqa';

interface YourTurnStepProps {
  step: YourTurnStepType;
  boardId: BoardId;
  onComplete: (correct: boolean) => void;
  onLog: (questionId: string, correct: boolean) => void;
}

export function YourTurnStep({ step, boardId, onComplete, onLog }: YourTurnStepProps) {
  const question = step.questions[boardId] ?? step.questions[AQA_FALLBACK];
  const isFallback = !step.questions[boardId] && !!step.questions[AQA_FALLBACK];
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);

  if (!question) {
    return (
      <div className="lesson-step">
        <StepTag label={step.uiTag} color={step.uiColor} />
        <p className="text-muted">No question available for this board yet.</p>
        <button className="lesson-step__cta" onClick={() => onComplete(false)}>Continue →</button>
      </div>
    );
  }

  const qId = `${step.id}-${boardId}`;
  const correct = selected !== null && question.options?.[selected]?.correct === true;

  function handleSelect(idx: number) {
    if (answered) return;
    const isCorrect = question!.options?.[idx]?.correct === true;
    setSelected(idx);
    setAnswered(true);
    onLog(qId, isCorrect);
  }

  return (
    <div className="lesson-step">
      <div className="lesson-step__header">
        <StepTag label={step.uiTag} color={step.uiColor} />
      </div>

      <div className="yourturn__source-bar">
        <span className="yourturn__source">{question.source}</span>
        <span className="yourturn__marks">{question.marks} {question.marks === 1 ? 'mark' : 'marks'}</span>
      </div>

      {isFallback && (
        <p className="yourturn__fallback-notice">
          This question is from AQA — your board uses the same method.
        </p>
      )}

      <div className="yourturn__question card">
        <p>{question.questionText}</p>
      </div>

      {question.questionType === 'multiple-choice' && question.options && (
        <div className="yourturn__options" role="group" aria-label="Answer choices">
          {question.options.map((opt, i) => {
            let state = '';
            if (answered) {
              if (opt.correct) state = 'correct';
              else if (i === selected) state = 'wrong';
              else state = 'dim';
            }
            return (
              <button
                key={i}
                className={`yourturn__option yourturn__option--${state || 'idle'}`}
                onClick={() => handleSelect(i)}
                disabled={answered}
              >
                <span className="yourturn__option-label">{opt.label}</span>
                <span>{opt.text}</span>
              </button>
            );
          })}
        </div>
      )}

      {answered && (
        <div className={`yourturn__result yourturn__result--${correct ? 'correct' : 'wrong'}`}>
          {correct ? '✓ Correct!' : '✗ Not quite — check the mark scheme below.'}
        </div>
      )}

      {answered && (
        <MarkSchemeReveal
          steps={question.markSchemeSteps}
          award={question.markSchemeAward}
          commonMistake={question.commonMistake}
        />
      )}

      {answered && (
        <button className="lesson-step__cta" onClick={() => onComplete(correct)}>
          {correct ? 'Great work! Continue →' : 'Understood — continue →'}
        </button>
      )}
    </div>
  );
}
