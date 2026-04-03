import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useConcept } from '../hooks/useContent';
import { useProgress } from '../hooks/useProgress';
import { useUser } from '../context/UserContext';
import { StepDots } from '../components/ui/StepDots';
import { DiagnosticStep } from '../components/lesson-steps/DiagnosticStep';
import { ConceptStep } from '../components/lesson-steps/ConceptStep';
import { SimulationStep } from '../components/lesson-steps/SimulationStep';
import { WorkedStep } from '../components/lesson-steps/WorkedStep';
import { YourTurnStep } from '../components/lesson-steps/YourTurnStep';
import { EquationCardStep } from '../components/lesson-steps/EquationCardStep';
import type { LessonStep, BoardId } from '../types/content';
import './Lesson.css';

// Concept→topic mapping (v1: forces only)
const CONCEPT_TOPIC_MAP: Record<string, string> = {
  'newtons-second-law': 'forces',
  'newtons-first-law':  'forces',
  'newtons-third-law':  'forces',
  'weight-and-gravity': 'forces',
  'resultant-forces':   'forces',
  'momentum':           'forces',
  'work-and-energy':    'forces',
};

const STEP_COLORS = ['red', 'blue', 'green', 'amber', 'purple', 'pink'];

export function Lesson() {
  const { conceptId } = useParams<{ conceptId: string }>();
  const navigate = useNavigate();
  const topicId = CONCEPT_TOPIC_MAP[conceptId ?? ''] ?? 'forces';
  const { data: concept, loading, error } = useConcept(topicId, conceptId ?? null);
  const { logQuestion, logMisconception, markConceptComplete } = useProgress();
  const { progress } = useUser();
  const [stepIdx, setStepIdx] = useState(0);
  const [completed, setCompleted] = useState(false);

  const boardId = (progress?.board ?? 'aqa') as BoardId;

  if (loading) {
    return (
      <div className="lesson lesson--loading">
        <p className="text-muted">Loading lesson…</p>
      </div>
    );
  }

  if (error || !concept) {
    return (
      <div className="lesson lesson--error">
        <p>Lesson not found.</p>
        <button onClick={() => navigate(-1)}>Go back</button>
      </div>
    );
  }

  const steps = concept.steps;
  const currentStep = steps[stepIdx];
  const isLast = stepIdx === steps.length - 1;

  function goNext() {
    if (isLast) {
      markConceptComplete(concept!.id);
      setCompleted(true);
    } else {
      setStepIdx(i => i + 1);
    }
  }

  function renderStep(step: LessonStep) {
    switch (step.type) {
      case 'diagnostic':
        return (
          <DiagnosticStep
            key={step.id}
            step={step}
            boardId={boardId}
            conceptId={concept!.id}
            onComplete={goNext}
            onLog={(answer, correct) => logMisconception(concept!.id, answer, correct)}
          />
        );
      case 'concept':
        return <ConceptStep key={step.id} step={step} onComplete={goNext} />;
      case 'simulation':
        return <SimulationStep key={step.id} step={step} onComplete={goNext} />;
      case 'worked':
        return <WorkedStep key={step.id} step={step} boardId={boardId} onComplete={goNext} />;
      case 'yourTurn':
        return (
          <YourTurnStep
            key={step.id}
            step={step}
            boardId={boardId}
            onComplete={goNext}
            onLog={logQuestion}
          />
        );
      case 'equationCard':
        return <EquationCardStep key={step.id} step={step} boardId={boardId} onComplete={goNext} />;
      default:
        return <div>Unknown step type</div>;
    }
  }

  if (completed) {
    return (
      <div className="lesson lesson--complete">
        <div className="lesson-complete__inner">
          <div className="lesson-complete__icon">🎉</div>
          <h1>Lesson complete!</h1>
          <p className="text-muted">{concept.title} — done</p>
          <div className="lesson-complete__actions">
            <button className="lesson-complete__btn lesson-complete__btn--primary" onClick={() => navigate(`/topic/${topicId}`)}>
              Back to topic
            </button>
            <button className="lesson-complete__btn" onClick={() => navigate('/home')}>
              Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="lesson">
      {/* Top bar */}
      <div className="lesson__topbar safe-top">
        <button className="lesson__close" onClick={() => navigate(-1)} aria-label="Exit lesson">✕</button>
        <div className="lesson__title-wrap">
          <p className="lesson__concept-title">{concept.title}</p>
          <p className="lesson__step-of">{stepIdx + 1} of {steps.length}</p>
        </div>
        <span className="lesson__time">~{concept.estimatedMinutes}min</span>
      </div>

      {/* Step dots */}
      <div className="lesson__dots">
        <StepDots total={steps.length} current={stepIdx} colors={STEP_COLORS} />
      </div>

      {/* Step content */}
      <div className="lesson__content scroll-area">
        {renderStep(currentStep)}
      </div>
    </div>
  );
}
