import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useSpacedRepetition, type SRSCard } from '../hooks/useSpacedRepetition';
import { useSettings } from '../context/SettingsContext';
import { useHaptics } from '../hooks/useHaptics';
import { ScreenWrapper } from '../components/layout/ScreenWrapper';
import './Review.css';

/* ── Concept display data ──────────────────────────────────────── */

const CONCEPT_LABELS: Record<string, string> = {
  'resultant-forces': 'Resultant Forces',
  'newtons-first-law': "Newton's First Law",
  'newtons-second-law': "Newton's Second Law",
  'newtons-third-law': "Newton's Third Law",
  'weight-and-gravity': 'Weight and Gravity',
  'momentum': 'Momentum',
  'work-and-energy': 'Work and Energy',
};

const CONCEPT_QUESTIONS: Record<string, string> = {
  'resultant-forces':
    'Two forces act on an object: 20 N right and 8 N left. What is the resultant force and direction?',
  'newtons-first-law':
    'An object moves at constant velocity. What can you say about the forces acting on it?',
  'newtons-second-law':
    'A 5 kg object has a resultant force of 20 N. What is its acceleration?',
  'newtons-third-law':
    'You push a wall with 50 N. What does Newton\'s Third Law tell you about the wall\'s force on you?',
  'weight-and-gravity':
    'What is the weight of a 70 kg person on Earth? (g = 9.8 N/kg)',
  'momentum':
    'A 2 kg ball moves at 3 m/s. What is its momentum and what are the units?',
  'work-and-energy':
    'A force of 10 N moves an object 5 m. How much work is done?',
};

const CONCEPT_HINTS: Record<string, string> = {
  'resultant-forces': 'Think about direction: same = add, opposite = subtract.',
  'newtons-first-law': 'No resultant force means no change in motion.',
  'newtons-second-law': 'F = m x a. Rearrange for acceleration.',
  'newtons-third-law': 'Equal and opposite, on different objects.',
  'weight-and-gravity': 'W = m x g',
  'momentum': 'p = m x v, measured in kg m/s.',
  'work-and-energy': 'W = F x d',
};

/* ── Helpers ───────────────────────────────────────────────────── */

function formatInterval(days: number): string {
  if (days === 1) return '1d';
  if (days < 30) return `${days}d`;
  if (days < 365) return `${Math.round(days / 30)}mo`;
  return `${Math.round(days / 365)}y`;
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

/** Preview what the interval would be after a given quality rating */
function previewInterval(card: SRSCard, quality: number): number {
  const { interval, easeFactor } = card;
  if (quality <= 2) return 1;
  if (quality === 3) return Math.max(1, Math.round(interval * 1.2));
  if (quality === 4) return Math.max(1, Math.round(interval * easeFactor));
  return Math.max(1, Math.round(interval * easeFactor * 1.3));
}

/* ── Animation variants ────────────────────────────────────────── */

const cardVariants = {
  enter: { x: 80, opacity: 0 },
  center: { x: 0, opacity: 1 },
  exit: { x: -80, opacity: 0 },
};

/* ── Component ─────────────────────────────────────────────────── */

export function Review() {
  const { getDueCards, reviewCard, getStats } = useSpacedRepetition();
  const { settings } = useSettings();
  const { lightTap } = useHaptics();
  const navigate = useNavigate();
  const noAnims = settings.animations === 'none';

  const dueCards = useMemo(() => getDueCards(), [getDueCards]);
  const [queue] = useState<SRSCard[]>(() => [...dueCards]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [reviewedCount, setReviewedCount] = useState(0);
  const [done, setDone] = useState(dueCards.length === 0);

  const stats = useMemo(() => getStats(), [getStats]);

  /* Rate the current card and move to next */
  function handleRate(quality: 0 | 1 | 2 | 3 | 4 | 5) {
    const card = queue[currentIdx];
    if (!card) return;

    reviewCard(card.conceptId, quality);
    lightTap();
    setReviewedCount(prev => prev + 1);

    if (currentIdx + 1 >= queue.length) {
      setDone(true);
    } else {
      setCurrentIdx(prev => prev + 1);
    }
  }

  const currentCard = queue[currentIdx] ?? null;

  /* Empty state — nothing to review */
  if (dueCards.length === 0) {
    return (
      <ScreenWrapper>
        <div className="review">
          <div className="review__header">
            <h1 className="review__title">Review</h1>
            <span className="review__due-badge review__due-badge--empty">0 due</span>
          </div>
          <div className="review__empty">
            <span className="review__empty-icon" aria-hidden="true">🧠</span>
            <h2 className="review__empty-title">Nothing to review!</h2>
            <p className="review__empty-text">
              {stats.totalCards === 0
                ? 'Complete lessons to add concepts for spaced review.'
                : 'All caught up. Come back later to keep your memory strong.'}
            </p>
            {stats.nextReviewDate && (
              <div className="review__empty-next">
                Next review: {formatDate(stats.nextReviewDate)}
              </div>
            )}
          </div>
        </div>
      </ScreenWrapper>
    );
  }

  /* Completion state — session finished */
  if (done) {
    const updatedStats = getStats();
    return (
      <ScreenWrapper>
        <div className="review">
          <div className="review__header">
            <h1 className="review__title">Review</h1>
          </div>
          <motion.div
            className="review__complete"
            initial={noAnims ? false : { scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', damping: 15, stiffness: 200 }}
          >
            <span className="review__complete-icon" aria-hidden="true">🎉</span>
            <h2 className="review__complete-title">Session complete!</h2>
            <p className="review__complete-sub">Great work reviewing your concepts.</p>
            <div className="review__complete-stats">
              <div className="review__complete-stat">
                <span className="review__complete-stat-val">{reviewedCount}</span>
                <span className="review__complete-stat-label">Reviewed</span>
              </div>
              <div className="review__complete-stat">
                <span className="review__complete-stat-val">{updatedStats.totalCards}</span>
                <span className="review__complete-stat-label">Total cards</span>
              </div>
            </div>
            {updatedStats.nextReviewDate && (
              <div className="review__empty-next">
                Next review: {formatDate(updatedStats.nextReviewDate)}
              </div>
            )}
            <button className="review__complete-btn" onClick={() => navigate('/home')}>
              Back to Home
            </button>
          </motion.div>
        </div>
      </ScreenWrapper>
    );
  }

  /* Active review */
  const conceptName = CONCEPT_LABELS[currentCard.conceptId] ?? currentCard.conceptId;
  const question = CONCEPT_QUESTIONS[currentCard.conceptId] ?? 'Can you recall the key idea for this concept?';
  const hint = CONCEPT_HINTS[currentCard.conceptId] ?? '';
  const progressPercent = queue.length > 0 ? Math.round((currentIdx / queue.length) * 100) : 0;

  return (
    <ScreenWrapper>
      <div className="review">
        {/* Header */}
        <div className="review__header">
          <h1 className="review__title">Review</h1>
          <span className="review__due-badge">{queue.length - currentIdx} due</span>
        </div>

        {/* Progress bar */}
        <div
          className="review__progress-bar"
          role="progressbar"
          aria-valuenow={currentIdx}
          aria-valuemin={0}
          aria-valuemax={queue.length}
          aria-label="Review session progress"
        >
          <div className="review__progress-fill" style={{ width: `${progressPercent}%` }} />
        </div>

        {/* Card */}
        <div className="review__card-area">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIdx}
              className="review__card"
              variants={noAnims ? undefined : cardVariants}
              initial={noAnims ? false : 'enter'}
              animate="center"
              exit={noAnims ? undefined : 'exit'}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <span className="review__card-label">Concept</span>
              <h2 className="review__card-concept">{conceptName}</h2>
              <div className="review__card-divider" />
              <span className="review__card-question-label">Key question</span>
              <p className="review__card-question">{question}</p>
              {hint && <p className="review__card-hint">{hint}</p>}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Rating buttons */}
        <div className="review__ratings">
          <button
            className="review__rate-btn review__rate-btn--forgot"
            onClick={() => handleRate(1)}
            aria-label="Forgot"
          >
            <span className="review__rate-label">Forgot</span>
            <span className="review__rate-interval">{formatInterval(previewInterval(currentCard, 1))}</span>
          </button>
          <button
            className="review__rate-btn review__rate-btn--hard"
            onClick={() => handleRate(3)}
            aria-label="Hard"
          >
            <span className="review__rate-label">Hard</span>
            <span className="review__rate-interval">{formatInterval(previewInterval(currentCard, 3))}</span>
          </button>
          <button
            className="review__rate-btn review__rate-btn--good"
            onClick={() => handleRate(4)}
            aria-label="Good"
          >
            <span className="review__rate-label">Good</span>
            <span className="review__rate-interval">{formatInterval(previewInterval(currentCard, 4))}</span>
          </button>
          <button
            className="review__rate-btn review__rate-btn--easy"
            onClick={() => handleRate(5)}
            aria-label="Easy"
          >
            <span className="review__rate-label">Easy</span>
            <span className="review__rate-interval">{formatInterval(previewInterval(currentCard, 5))}</span>
          </button>
        </div>
      </div>
    </ScreenWrapper>
  );
}
