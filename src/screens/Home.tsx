import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useUser } from '../context/UserContext';
import { useStreak } from '../hooks/useStreak';
import { useAchievements } from '../hooks/useAchievements';
import { useSettings } from '../context/SettingsContext';
import { ScreenWrapper } from '../components/layout/ScreenWrapper';
import { ProgressRing } from '../components/ui/ProgressRing';
import './Home.css';

const BOARD_NAMES: Record<string, string> = {
  aqa: 'AQA', edexcel: 'Edexcel', 'ocr-gateway': 'OCR Gateway',
  'ocr-21c': 'OCR 21st Century', wjec: 'WJEC',
};

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

const TOPICS = [
  { id: 'forces',      name: 'Forces',      emoji: '⚡', color: 'var(--topic-forces)',      bg: 'rgba(124,58,237,0.06)',  concepts: 7, paper: 'Paper 2', available: true },
  { id: 'electricity', name: 'Electricity', emoji: '🔌', color: 'var(--topic-electricity)', bg: 'rgba(37,99,235,0.06)',   concepts: 7, paper: 'Paper 1', available: true },
  { id: 'waves',       name: 'Waves',       emoji: '〰', color: 'var(--topic-waves)',       bg: 'rgba(8,145,178,0.06)',   concepts: 7, paper: 'Paper 2', available: true },
  { id: 'energy',      name: 'Energy',      emoji: '🔋', color: 'var(--topic-energy)',      bg: 'rgba(234,88,12,0.06)',   concepts: 7, paper: 'Paper 1', available: true },
];

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

function getWeekHeatmap(): { day: string; active: boolean }[] {
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const today = new Date().getDay(); // 0=Sun
  const mondayOffset = today === 0 ? 6 : today - 1;
  return days.map((day, i) => ({ day, active: i <= mondayOffset }));
}

export function Home() {
  const { progress } = useUser();
  const { streak } = useStreak();
  const { unlockedCount, totalCount, checkAchievements } = useAchievements();
  const { settings } = useSettings();
  const navigate = useNavigate();
  const noAnims = settings.animations === 'none';

  // Check achievements whenever progress changes
  useEffect(() => {
    if (progress) checkAchievements(progress, streak);
  }, [progress, streak, checkAchievements]);

  const nextConcept = useMemo(() => {
    if (!progress) return ALL_CONCEPTS[0];
    return ALL_CONCEPTS.find(c => !progress.completedConcepts.includes(c)) ?? ALL_CONCEPTS[0];
  }, [progress]);

  if (!progress) return null;

  const TOPIC_CONCEPTS: Record<string, string[]> = {
    forces: FORCES_CONCEPTS,
    electricity: ELECTRICITY_CONCEPTS,
    waves: WAVES_CONCEPTS,
    energy: ENERGY_CONCEPTS,
  };
  const getTopicDone = (topicId: string) =>
    (TOPIC_CONCEPTS[topicId] ?? []).filter(c => progress!.completedConcepts.includes(c)).length;

  const boardName = BOARD_NAMES[progress.board] ?? progress.board;
  const done = progress.completedConcepts.length;
  const totalQuestions = progress.attemptedQuestions.length;
  const correctQuestions = progress.attemptedQuestions.filter(q => q.correct).length;
  const accuracy = totalQuestions > 0 ? Math.round((correctQuestions / totalQuestions) * 100) : 0;
  const weekMap = getWeekHeatmap();

  const stagger = noAnims ? {} : {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <ScreenWrapper>
      {/* Header */}
      <div className="home__header">
        <div>
          <p className="home__greeting">{getGreeting()}</p>
          <h1 className="home__title">NeuroPhysics</h1>
          <p className="home__board">{boardName} · {progress.tier}</p>
        </div>
        <div className="home__header-right">
          <button
            className="home__search-btn"
            onClick={() => navigate('/search')}
            aria-label="Search"
          >
            <span aria-hidden="true">&#128269;</span>
          </button>
          <div className="home__streak">
            <span className="home__streak-fire" aria-hidden="true">🔥</span>
            <span className="home__streak-count">{streak}</span>
            <span className="home__streak-label">day{streak !== 1 ? 's' : ''}</span>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <motion.div className="home__stats" {...stagger} transition={{ delay: 0.05 }}>
        <div className="home__stat">
          <span className="home__stat-val">{done}/{ALL_CONCEPTS.length}</span>
          <span className="home__stat-label">Concepts</span>
        </div>
        <div className="home__stat-divider" />
        <div className="home__stat">
          <span className="home__stat-val">{totalQuestions}</span>
          <span className="home__stat-label">Questions</span>
        </div>
        <div className="home__stat-divider" />
        <div className="home__stat">
          <span className="home__stat-val">{accuracy}%</span>
          <span className="home__stat-label">Accuracy</span>
        </div>
      </motion.div>

      {/* Weekly heatmap */}
      <motion.div className="home__week" {...stagger} transition={{ delay: 0.1 }}>
        <p className="home__week-title">This week</p>
        <div className="home__week-grid">
          {weekMap.map((d, i) => (
            <div key={i} className="home__week-day">
              <div className={`home__week-dot ${d.active ? 'home__week-dot--active' : ''}`} />
              <span className="home__week-label">{d.day}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Continue card */}
      <motion.button
        className="home__continue card"
        onClick={() => navigate(`/learn/${nextConcept}`)}
        {...stagger}
        transition={{ delay: 0.15 }}
        whileTap={noAnims ? undefined : { scale: 0.98 }}
      >
        <div className="home__continue-left">
          <span className="home__continue-label">Continue learning</span>
          <h2 className="home__continue-topic">{CONCEPT_LABELS[nextConcept] ?? 'Forces'}</h2>
          <p className="home__continue-sub">{done} of {ALL_CONCEPTS.length} concepts complete</p>
        </div>
        <ProgressRing percent={Math.round((done / ALL_CONCEPTS.length) * 100)} size={64} />
      </motion.button>

      {/* Topics */}
      <section>
        <h2 className="home__section-title">Topics</h2>
        <div className="home__topics">
          {TOPICS.map(t => (
            <motion.button
              key={t.id}
              className={`home__topic-card card ${!t.available ? 'home__topic-card--locked' : 'home__topic-card--unlocked'}`}
              onClick={() => t.available && navigate(`/topic/${t.id}`)}
              disabled={!t.available}
              style={{ '--topic-color': t.color, '--topic-bg': t.bg } as React.CSSProperties}
              whileTap={t.available && !noAnims ? { scale: 0.98 } : undefined}
            >
              <div className="home__topic-icon-wrap" aria-hidden="true">
                {t.available ? t.emoji : '🔒'}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p className="home__topic-name">{t.name}</p>
                <p className="home__topic-meta">
                  {t.available ? `${t.concepts} concepts · ${t.paper}` : 'Coming soon'}
                </p>
              </div>
              {t.available && (
                <ProgressRing
                  percent={Math.round((getTopicDone(t.id) / t.concepts) * 100)}
                  size={40}
                  strokeWidth={3}
                />
              )}
            </motion.button>
          ))}
        </div>
      </section>

      {/* Quick actions */}
      <section>
        <h2 className="home__section-title">Quick access</h2>
        <div className="home__quick-actions">
          {[
            { icon: '🔬', label: 'Practicals', accessibleLabel: 'Required practicals', path: '/practicals' },
            { icon: '∑', label: 'Equations', accessibleLabel: 'Equations', path: '/equations' },
            { icon: '📝', label: 'Past papers', accessibleLabel: 'Past papers', path: '/papers' },
            { icon: '🏅', label: `${unlockedCount}/${totalCount}`, accessibleLabel: `Achievements: ${unlockedCount} of ${totalCount} unlocked`, path: '/achievements' },
            { icon: '⚙', label: 'Settings', accessibleLabel: 'Settings', path: '/settings' },
          ].map(a => (
            <motion.button
              key={a.path}
              className="home__qa-btn"
              onClick={() => navigate(a.path)}
              whileTap={noAnims ? undefined : { scale: 0.95 }}
              aria-label={a.accessibleLabel}
            >
              <span aria-hidden="true">{a.icon}</span>
              <span>{a.label}</span>
            </motion.button>
          ))}
        </div>
      </section>
    </ScreenWrapper>
  );
}
