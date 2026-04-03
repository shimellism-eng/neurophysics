import { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, type PanInfo } from 'framer-motion';
import { useConcept } from '../hooks/useContent';
import { useProgress } from '../hooks/useProgress';
import { useUser } from '../context/UserContext';
import { useSettings } from '../context/SettingsContext';
import { useSpacedRepetition } from '../hooks/useSpacedRepetition';
import { StepDots } from '../components/ui/StepDots';
import { Confetti } from '../components/ui/Confetti';
import { AiChat } from '../components/ui/AiChat';
import { useHaptics } from '../hooks/useHaptics';
import { DiagnosticStep } from '../components/lesson-steps/DiagnosticStep';
import { ConceptStep } from '../components/lesson-steps/ConceptStep';
import { SimulationStep } from '../components/lesson-steps/SimulationStep';
import { WorkedStep } from '../components/lesson-steps/WorkedStep';
import { YourTurnStep } from '../components/lesson-steps/YourTurnStep';
import { EquationCardStep } from '../components/lesson-steps/EquationCardStep';
import type { LessonStep, BoardId } from '../types/content';
import './Lesson.css';

const CONCEPT_TOPIC_MAP: Record<string, string> = {
  'newtons-second-law': 'forces',
  'newtons-first-law':  'forces',
  'newtons-third-law':  'forces',
  'weight-and-gravity': 'forces',
  'resultant-forces':   'forces',
  'momentum':           'forces',
  'work-and-energy':    'forces',
  'transverse-and-longitudinal': 'waves',
  'wave-properties':             'waves',
  'wave-equation':               'waves',
  'reflection-and-refraction':   'waves',
  'sound-waves':                 'waves',
  'electromagnetic-spectrum':    'waves',
  'light-and-colour':            'waves',
  'energy-stores-and-transfers': 'energy',
  'kinetic-energy':              'energy',
  'gravitational-pe':            'energy',
  'elastic-pe':                  'energy',
  'conservation-of-energy':      'energy',
  'efficiency':                  'energy',
  'power':                       'energy',
  'charge-and-current':          'electricity',
  'potential-difference':        'electricity',
  'resistance':                  'electricity',
  'ohms-law':                    'electricity',
  'series-circuits':             'electricity',
  'parallel-circuits':           'electricity',
  'power-and-energy':            'electricity',
};

const STEP_COLORS = ['red', 'blue', 'green', 'amber', 'purple', 'pink'];

const SWIPE_THRESHOLD = 50;

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? '-100%' : '100%',
    opacity: 0,
  }),
};

export function Lesson() {
  const { conceptId } = useParams<{ conceptId: string }>();
  const navigate = useNavigate();
  const topicId = CONCEPT_TOPIC_MAP[conceptId ?? ''] ?? 'forces';
  const { data: concept, loading, error } = useConcept(topicId, conceptId ?? null);
  const { logQuestion, logMisconception, markConceptComplete } = useProgress();
  const { progress } = useUser();
  const { settings } = useSettings();
  const { addCard } = useSpacedRepetition();
  const { successBuzz } = useHaptics();
  const [stepIdx, setStepIdx] = useState(0);
  const [direction, setDirection] = useState(1);
  const [completed, setCompleted] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const boardId = (progress?.board ?? 'aqa') as BoardId;
  const noAnims = settings.animations === 'none';

  if (loading) {
    return (
      <div className="lesson lesson--loading">
        <div className="lesson__spinner" />
        <p className="text-muted">Loading lesson…</p>
      </div>
    );
  }

  if (error || !concept) {
    return (
      <div className="lesson lesson--error">
        <p>Lesson not found.</p>
        <button className="lesson-complete__btn" onClick={() => navigate(-1)}>Go back</button>
      </div>
    );
  }

  const steps = concept.steps;
  const currentStep = steps[stepIdx];
  const isLast = stepIdx === steps.length - 1;

  function goNext() {
    if (isLast) {
      markConceptComplete(concept!.id);
      addCard(concept!.id);
      successBuzz();
      setCompleted(true);
    } else {
      setDirection(1);
      setStepIdx(i => i + 1);
      scrollRef.current?.scrollTo(0, 0);
    }
  }

  function handleDragEnd(_: unknown, info: PanInfo) {
    // Only allow swipe-back (right swipe to go to previous step)
    if (info.offset.x > SWIPE_THRESHOLD && info.velocity.x > 0 && stepIdx > 0) {
      setDirection(-1);
      setStepIdx(i => i - 1);
      scrollRef.current?.scrollTo(0, 0);
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
        <Confetti show={true} />
        <motion.div
          className="lesson-complete__inner"
          initial={noAnims ? false : { scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 15, stiffness: 200 }}
        >
          <div className="lesson-complete__icon" aria-hidden="true">🎉</div>
          <h1>Lesson complete!</h1>
          <p className="text-muted">{concept.title}: done</p>
          <div className="lesson-complete__stats">
            <div className="lesson-complete__stat">
              <span className="lesson-complete__stat-val">{steps.length}</span>
              <span className="lesson-complete__stat-label">Steps</span>
            </div>
            <div className="lesson-complete__stat">
              <span className="lesson-complete__stat-val">~{concept.estimatedMinutes}</span>
              <span className="lesson-complete__stat-label">Minutes</span>
            </div>
          </div>
          <div className="lesson-complete__actions">
            <button className="lesson-complete__btn lesson-complete__btn--primary" onClick={() => navigate(`/topic/${topicId}`)}>
              Back to topic
            </button>
            <button className="lesson-complete__btn" onClick={() => navigate('/home')}>
              Home
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  const chatContext = concept
    ? `We are learning "${concept.title}". The student is on step ${stepIdx + 1} of ${steps.length}. Step type: ${currentStep?.type ?? 'unknown'}.`
    : '';

  return (
    <div className="lesson">
      {/* Ask Alex floating button — hidden when chat is open */}
      {!chatOpen && (
        <button
          className="ask-alex-btn"
          onClick={() => setChatOpen(true)}
          aria-label="Ask Alex, your AI tutor"
        >
          <span className="ask-alex-btn__avatar" aria-hidden="true">A</span>
          Ask Alex
        </button>
      )}

      {/* AI Chat panel */}
      <AiChat
        context={chatContext}
        isOpen={chatOpen}
        onClose={() => setChatOpen(false)}
      />

      {/* Top bar */}
      <div className="lesson__topbar safe-top">
        <button className="lesson__close" onClick={() => navigate(-1)} aria-label="Exit lesson">✕</button>
        <div className="lesson__title-wrap">
          <p className="lesson__concept-title">{concept.title}</p>
          <p className="lesson__step-of">{stepIdx + 1} of {steps.length}</p>
        </div>
        <span className="lesson__time">~{concept.estimatedMinutes}min</span>
      </div>

      {/* Progress bar */}
      <div
        className="lesson__progress-bar"
        role="progressbar"
        aria-valuenow={stepIdx + 1}
        aria-valuemin={1}
        aria-valuemax={steps.length}
        aria-label={`Lesson progress: step ${stepIdx + 1} of ${steps.length}`}
      >
        <div
          className="lesson__progress-fill"
          style={{ width: `${((stepIdx + 1) / steps.length) * 100}%` }}
        />
      </div>

      {/* Step dots */}
      <div className="lesson__dots">
        <StepDots total={steps.length} current={stepIdx} colors={STEP_COLORS} />
      </div>

      {/* Step content with swipe */}
      <div className="lesson__content scroll-area" ref={scrollRef}>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={stepIdx}
            custom={direction}
            variants={noAnims ? undefined : variants}
            initial={noAnims ? false : 'enter'}
            animate="center"
            exit={noAnims ? undefined : 'exit'}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            drag={noAnims ? false : 'x'}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            className="lesson__step-wrapper"
          >
            {renderStep(currentStep)}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
