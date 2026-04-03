import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useUser } from '../context/UserContext';
import { useSettings } from '../context/SettingsContext';
import { useStreak } from '../hooks/useStreak';
import { ScreenWrapper } from '../components/layout/ScreenWrapper';
import { ProgressRing } from '../components/ui/ProgressRing';
import type { UserProgress } from '../types/content';
import './Dashboard.css';

/* ── Topic / concept maps (same as Home) ─────────────────────── */

const FORCES_CONCEPTS = [
  'resultant-forces', 'newtons-first-law', 'newtons-second-law',
  'newtons-third-law', 'weight-and-gravity', 'momentum', 'work-and-energy',
];
const ELECTRICITY_CONCEPTS = [
  'charge-and-current', 'potential-difference', 'resistance',
  'ohms-law', 'series-circuits', 'parallel-circuits', 'power-and-energy',
];
const WAVES_CONCEPTS = [
  'transverse-and-longitudinal', 'wave-properties', 'wave-equation',
  'reflection-and-refraction', 'sound-waves', 'electromagnetic-spectrum', 'light-and-colour',
];
const ENERGY_CONCEPTS = [
  'energy-stores-and-transfers', 'kinetic-energy', 'gravitational-pe',
  'elastic-pe', 'conservation-of-energy', 'efficiency', 'power',
];

const TOPIC_CONCEPTS: Record<string, string[]> = {
  forces: FORCES_CONCEPTS,
  electricity: ELECTRICITY_CONCEPTS,
  waves: WAVES_CONCEPTS,
  energy: ENERGY_CONCEPTS,
};

const ALL_CONCEPTS = [...FORCES_CONCEPTS, ...ELECTRICITY_CONCEPTS, ...WAVES_CONCEPTS, ...ENERGY_CONCEPTS];

const CONCEPT_LABELS: Record<string, string> = {
  'resultant-forces': 'Resultant Forces',
  'newtons-first-law': "Newton's First Law",
  'newtons-second-law': "Newton's Second Law",
  'newtons-third-law': "Newton's Third Law",
  'weight-and-gravity': 'Weight and Gravity',
  'momentum': 'Momentum',
  'work-and-energy': 'Work and Energy',
  'charge-and-current': 'Charge and Current',
  'potential-difference': 'Potential Difference',
  'resistance': 'Resistance',
  'ohms-law': "Ohm's Law",
  'series-circuits': 'Series Circuits',
  'parallel-circuits': 'Parallel Circuits',
  'power-and-energy': 'Electrical Power and Energy',
  'transverse-and-longitudinal': 'Transverse & Longitudinal Waves',
  'wave-properties': 'Wave Properties',
  'wave-equation': 'The Wave Equation',
  'reflection-and-refraction': 'Reflection & Refraction',
  'sound-waves': 'Sound Waves',
  'electromagnetic-spectrum': 'Electromagnetic Spectrum',
  'light-and-colour': 'Light and Colour',
  'energy-stores-and-transfers': 'Energy Stores & Transfers',
  'kinetic-energy': 'Kinetic Energy',
  'gravitational-pe': 'Gravitational PE',
  'elastic-pe': 'Elastic PE',
  'conservation-of-energy': 'Conservation of Energy',
  'efficiency': 'Efficiency',
  'power': 'Power',
};

const TOPIC_META: { id: string; name: string; emoji: string; color: string }[] = [
  { id: 'forces',      name: 'Forces',      emoji: '⚡', color: 'var(--cyan)' },
  { id: 'electricity', name: 'Electricity',  emoji: '🔌', color: 'var(--blue)' },
  { id: 'waves',       name: 'Waves',        emoji: '〰', color: 'var(--purple)' },
  { id: 'energy',      name: 'Energy',       emoji: '🔋', color: 'var(--amber)' },
];

/* Map a concept id to its parent topic id */
function topicForConcept(conceptId: string): string {
  for (const [topicId, concepts] of Object.entries(TOPIC_CONCEPTS)) {
    if (concepts.includes(conceptId)) return topicId;
  }
  return 'unknown';
}

/* ── Analytics helpers ───────────────────────────────────────── */

interface MisconceptionGroup {
  conceptId: string;
  label: string;
  total: number;          // total diagnostic attempts
  incorrect: number;      // times misconception was triggered (wrong answer)
}

function buildMisconceptionMap(progress: UserProgress): MisconceptionGroup[] {
  const map = new Map<string, { total: number; incorrect: number }>();
  for (const m of progress.misconceptionsLogged) {
    const prev = map.get(m.conceptId) ?? { total: 0, incorrect: 0 };
    prev.total += 1;
    if (!m.correct) prev.incorrect += 1;
    map.set(m.conceptId, prev);
  }
  return Array.from(map.entries())
    .map(([conceptId, data]) => ({
      conceptId,
      label: CONCEPT_LABELS[conceptId] ?? conceptId,
      ...data,
    }))
    .sort((a, b) => b.incorrect - a.incorrect);
}

interface TopicStats {
  id: string;
  name: string;
  emoji: string;
  color: string;
  attempted: number;
  correct: number;
  accuracy: number;
  completed: number;
  totalConcepts: number;
}

function buildTopicStats(progress: UserProgress): TopicStats[] {
  return TOPIC_META.map(t => {
    const concepts = TOPIC_CONCEPTS[t.id] ?? [];
    // Questions whose id starts with one of the topic's concept ids
    const topicQs = progress.attemptedQuestions.filter(q =>
      concepts.some(c => q.questionId.startsWith(c))
    );
    const correct = topicQs.filter(q => q.correct).length;
    const completed = concepts.filter(c => progress.completedConcepts.includes(c)).length;
    return {
      ...t,
      attempted: topicQs.length,
      correct,
      accuracy: topicQs.length > 0 ? Math.round((correct / topicQs.length) * 100) : 0,
      completed,
      totalConcepts: concepts.length,
    };
  });
}

interface WeakArea {
  conceptId: string;
  label: string;
  reason: string;
  topicId: string;
}

function findWeakAreas(progress: UserProgress, misconceptions: MisconceptionGroup[]): WeakArea[] {
  // Score each concept: lower = weaker
  const scores = new Map<string, number>();

  // From misconceptions (incorrect = negative)
  for (const m of misconceptions) {
    scores.set(m.conceptId, (scores.get(m.conceptId) ?? 0) - m.incorrect * 2);
  }

  // From questions (accuracy based)
  for (const conceptId of ALL_CONCEPTS) {
    const qs = progress.attemptedQuestions.filter(q => q.questionId.startsWith(conceptId));
    if (qs.length > 0) {
      const acc = qs.filter(q => q.correct).length / qs.length;
      scores.set(conceptId, (scores.get(conceptId) ?? 0) + (acc - 0.5) * 4);
    }
  }

  return Array.from(scores.entries())
    .sort((a, b) => a[1] - b[1])
    .slice(0, 3)
    .map(([conceptId]) => {
      const mc = misconceptions.find(m => m.conceptId === conceptId);
      const qs = progress.attemptedQuestions.filter(q => q.questionId.startsWith(conceptId));
      const acc = qs.length > 0 ? Math.round((qs.filter(q => q.correct).length / qs.length) * 100) : null;
      let reason = '';
      if (mc && mc.incorrect > 0) reason += `${mc.incorrect} misconception${mc.incorrect > 1 ? 's' : ''}`;
      if (acc !== null) reason += (reason ? ' · ' : '') + `${acc}% accuracy`;
      if (!reason) reason = 'Needs practice';
      return {
        conceptId,
        label: CONCEPT_LABELS[conceptId] ?? conceptId,
        reason,
        topicId: topicForConcept(conceptId),
      };
    });
}

interface DayActivity {
  date: string;      // YYYY-MM-DD
  questions: number;
}

function buildWeeklyActivity(progress: UserProgress): { day: string; date: string; active: boolean; questions: number }[] {
  const dayLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const today = new Date();
  const todayDay = today.getDay(); // 0=Sun
  const mondayOffset = todayDay === 0 ? 6 : todayDay - 1;

  // Build map of dates this week
  const activityMap = new Map<string, number>();
  for (const q of progress.attemptedQuestions) {
    const d = q.timestamp.split('T')[0];
    activityMap.set(d, (activityMap.get(d) ?? 0) + 1);
  }
  for (const m of progress.misconceptionsLogged) {
    const d = m.timestamp.split('T')[0];
    activityMap.set(d, (activityMap.get(d) ?? 0) + 1);
  }

  return dayLabels.map((label, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() - mondayOffset + i);
    const dateStr = date.toISOString().split('T')[0];
    const questions = activityMap.get(dateStr) ?? 0;
    return { day: label, date: dateStr, active: questions > 0, questions };
  });
}

function estimateAvgSessionMinutes(progress: UserProgress): number {
  if (progress.attemptedQuestions.length < 2) return 0;
  const timestamps = [
    ...progress.attemptedQuestions.map(q => new Date(q.timestamp).getTime()),
    ...progress.misconceptionsLogged.map(m => new Date(m.timestamp).getTime()),
  ].sort((a, b) => a - b);

  // Group into sessions (gap > 30min = new session)
  const SESSION_GAP = 30 * 60 * 1000;
  const sessions: number[] = [];
  let sessionStart = timestamps[0];
  let sessionEnd = timestamps[0];

  for (let i = 1; i < timestamps.length; i++) {
    if (timestamps[i] - sessionEnd > SESSION_GAP) {
      sessions.push(sessionEnd - sessionStart);
      sessionStart = timestamps[i];
    }
    sessionEnd = timestamps[i];
  }
  sessions.push(sessionEnd - sessionStart);

  const totalMs = sessions.reduce((sum, s) => sum + s, 0);
  const avg = totalMs / sessions.length / 60000; // to minutes
  return Math.max(1, Math.round(avg));
}

/* ── Component ───────────────────────────────────────────────── */

export function Dashboard() {
  const { progress } = useUser();
  const { streak } = useStreak();
  const { settings } = useSettings();
  const navigate = useNavigate();
  const noAnims = settings.animations === 'none';

  const misconceptions = useMemo(() => progress ? buildMisconceptionMap(progress) : [], [progress]);
  const topicStats = useMemo(() => progress ? buildTopicStats(progress) : [], [progress]);
  const weakAreas = useMemo(() => progress ? findWeakAreas(progress, misconceptions) : [], [progress, misconceptions]);
  const weekActivity = useMemo(() => progress ? buildWeeklyActivity(progress) : [], [progress]);
  const avgSession = useMemo(() => progress ? estimateAvgSessionMinutes(progress) : 0, [progress]);

  if (!progress) return null;

  const done = progress.completedConcepts.length;
  const totalQ = progress.attemptedQuestions.length;
  const correctQ = progress.attemptedQuestions.filter(q => q.correct).length;
  const accuracy = totalQ > 0 ? Math.round((correctQ / totalQ) * 100) : 0;
  const activeDaysThisWeek = weekActivity.filter(d => d.active).length;

  const stagger = (delay: number) =>
    noAnims ? {} : { initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, transition: { delay } };

  return (
    <ScreenWrapper className="dashboard">
      {/* Header */}
      <div className="dashboard__header">
        <button className="dashboard__back" onClick={() => navigate(-1)} aria-label="Go back">
          &#8592;
        </button>
        <h1 className="dashboard__title">Teacher Dashboard</h1>
      </div>

      {/* Overall Stats */}
      <motion.section className="dashboard__stats" {...stagger(0.05)}>
        <div className="dashboard__stat card">
          <span className="dashboard__stat-val">{done}/{ALL_CONCEPTS.length}</span>
          <span className="dashboard__stat-label">Concepts done</span>
        </div>
        <div className="dashboard__stat card">
          <span className="dashboard__stat-val">{totalQ}</span>
          <span className="dashboard__stat-label">Questions</span>
        </div>
        <div className="dashboard__stat card">
          <span className="dashboard__stat-val">{accuracy}%</span>
          <span className="dashboard__stat-label">Accuracy</span>
        </div>
        <div className="dashboard__stat card">
          <span className="dashboard__stat-val">{streak}</span>
          <span className="dashboard__stat-label">Streak</span>
        </div>
      </motion.section>

      {/* Performance by Topic */}
      <motion.section className="dashboard__section" {...stagger(0.1)}>
        <h2 className="dashboard__section-title">Performance by Topic</h2>
        <div className="dashboard__topics">
          {topicStats.map(t => (
            <div key={t.id} className="dashboard__topic card">
              <div className="dashboard__topic-header">
                <span className="dashboard__topic-emoji" aria-hidden="true">{t.emoji}</span>
                <span className="dashboard__topic-name">{t.name}</span>
                <ProgressRing percent={Math.round((t.completed / t.totalConcepts) * 100)} size={40} strokeWidth={3} />
              </div>
              <div className="dashboard__topic-bars">
                <div className="dashboard__bar-row">
                  <span className="dashboard__bar-label">Accuracy</span>
                  <div className="dashboard__bar-track">
                    <div
                      className="dashboard__bar-fill"
                      style={{ width: `${t.accuracy}%`, '--bar-color': t.color } as React.CSSProperties}
                    />
                  </div>
                  <span className="dashboard__bar-val">{t.accuracy}%</span>
                </div>
                <div className="dashboard__bar-row">
                  <span className="dashboard__bar-label">Attempted</span>
                  <span className="dashboard__bar-val">{t.attempted} Qs</span>
                </div>
                <div className="dashboard__bar-row">
                  <span className="dashboard__bar-label">Completed</span>
                  <span className="dashboard__bar-val">{t.completed}/{t.totalConcepts}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Misconception Heatmap */}
      <motion.section className="dashboard__section" {...stagger(0.15)}>
        <h2 className="dashboard__section-title">Misconception Heatmap</h2>
        {misconceptions.length === 0 ? (
          <p className="dashboard__empty">No diagnostic data yet. Complete some lessons to see misconceptions here.</p>
        ) : (
          <div className="dashboard__heatmap">
            {misconceptions.map(m => (
              <div key={m.conceptId} className="dashboard__heatmap-row">
                <span className="dashboard__heatmap-label">{m.label}</span>
                <div className="dashboard__heatmap-cells">
                  <div
                    className={`dashboard__heatmap-cell ${
                      m.incorrect === 0
                        ? 'dashboard__heatmap-cell--green'
                        : m.incorrect === 1
                        ? 'dashboard__heatmap-cell--amber'
                        : 'dashboard__heatmap-cell--red'
                    }`}
                    title={`${m.incorrect} misconception${m.incorrect !== 1 ? 's' : ''} out of ${m.total} attempt${m.total !== 1 ? 's' : ''}`}
                  >
                    {m.incorrect > 0 ? m.incorrect : '✓'}
                  </div>
                </div>
                <span className="dashboard__heatmap-meta">
                  {m.incorrect === 0
                    ? 'All correct'
                    : `${m.incorrect} misconception${m.incorrect > 1 ? 's' : ''}`}
                </span>
              </div>
            ))}
          </div>
        )}
      </motion.section>

      {/* Weakest Areas */}
      <motion.section className="dashboard__section" {...stagger(0.2)}>
        <h2 className="dashboard__section-title">Weakest Areas</h2>
        {weakAreas.length === 0 ? (
          <p className="dashboard__empty">Not enough data yet. Keep practising!</p>
        ) : (
          <div className="dashboard__weak-areas">
            {weakAreas.map(w => (
              <button
                key={w.conceptId}
                className="dashboard__weak-card card"
                onClick={() => navigate(`/learn/${w.conceptId}`)}
              >
                <div className="dashboard__weak-info">
                  <span className="dashboard__weak-label">{w.label}</span>
                  <span className="dashboard__weak-reason">{w.reason}</span>
                </div>
                <span className="dashboard__weak-action">Review &rarr;</span>
              </button>
            ))}
          </div>
        )}
      </motion.section>

      {/* Study Patterns */}
      <motion.section className="dashboard__section" {...stagger(0.25)}>
        <h2 className="dashboard__section-title">Study Patterns</h2>
        <div className="dashboard__patterns">
          {/* Weekly calendar */}
          <div className="dashboard__pattern-card card">
            <p className="dashboard__pattern-title">This week</p>
            <div className="dashboard__week-grid">
              {weekActivity.map((d, i) => (
                <div key={i} className="dashboard__week-day">
                  <div
                    className={`dashboard__week-dot ${d.active ? 'dashboard__week-dot--active' : ''}`}
                    title={d.active ? `${d.questions} activities on ${d.date}` : `No activity on ${d.date}`}
                  />
                  <span className="dashboard__week-label">{d.day}</span>
                </div>
              ))}
            </div>
            <p className="dashboard__pattern-sub">{activeDaysThisWeek} of 7 days active</p>
          </div>

          {/* Session length */}
          <div className="dashboard__pattern-card card">
            <p className="dashboard__pattern-title">Avg session</p>
            <span className="dashboard__pattern-big">{avgSession > 0 ? `${avgSession} min` : '--'}</span>
            <p className="dashboard__pattern-sub">Estimated from question timestamps</p>
          </div>

          {/* Streak */}
          <div className="dashboard__pattern-card card">
            <p className="dashboard__pattern-title">Current streak</p>
            <span className="dashboard__pattern-big">{streak} day{streak !== 1 ? 's' : ''}</span>
            <p className="dashboard__pattern-sub">Last active: {progress.lastActiveDate}</p>
          </div>
        </div>
      </motion.section>
    </ScreenWrapper>
  );
}
