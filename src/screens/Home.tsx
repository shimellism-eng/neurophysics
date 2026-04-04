import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useUser } from '../context/UserContext';
import { useStreak } from '../hooks/useStreak';
import { useAchievements } from '../hooks/useAchievements';
import { useSettings } from '../context/SettingsContext';
import { ScreenWrapper } from '../components/layout/ScreenWrapper';
import { ProgressRing } from '../components/ui/ProgressRing';
import {
  IconForces, IconElectricity, IconWaves, IconEnergy,
  IconMagnetism, IconParticles, IconAtomic, IconSpace, IconMotion,
  IconPracticals, IconEquations, IconPapers, IconAchievements, IconSettings,
  IconSearch,
} from '../components/ui/Icons';
import './Home.css';

const FORCES_CONCEPTS = [
  'resultant-forces', 'newtons-first-law', 'newtons-second-law',
  'newtons-third-law', 'weight-and-gravity', 'momentum', 'work-and-energy',
  'hookes-law', 'pressure-in-fluids',
];

const ELECTRICITY_CONCEPTS = [
  'charge-and-current', 'potential-difference', 'resistance',
  'ohms-law', 'series-circuits', 'parallel-circuits', 'power-and-energy',
  'iv-characteristics', 'domestic-electricity',
];

const WAVES_CONCEPTS = [
  'transverse-and-longitudinal', 'wave-properties', 'wave-equation',
  'reflection-and-refraction', 'sound-waves', 'electromagnetic-spectrum', 'light-and-colour',
];

const ENERGY_CONCEPTS = [
  'energy-stores-and-transfers', 'kinetic-energy', 'gravitational-pe',
  'elastic-pe', 'conservation-of-energy', 'efficiency', 'power',
  'renewable-energy-sources',
];

const MAGNETISM_CONCEPTS = [
  'permanent-temporary-magnets', 'magnetic-fields', 'electromagnetism',
  'motor-effect', 'flemings-left-hand-rule', 'generators-and-induction', 'transformers',
  'national-grid',
];

const PARTICLES_CONCEPTS = [
  'states-of-matter', 'particle-model', 'density',
  'changes-of-state', 'internal-energy', 'specific-heat-capacity', 'specific-latent-heat',
  'gas-pressure-temperature',
];

const ATOMIC_CONCEPTS = [
  'atomic-structure', 'isotopes', 'radioactive-decay',
  'alpha-beta-gamma', 'half-life', 'uses-of-radiation', 'nuclear-fission-fusion',
  'history-of-atomic-models',
];

const SPACE_CONCEPTS = [
  'solar-system', 'life-cycle-of-stars', 'orbital-motion',
  'red-shift', 'big-bang', 'dark-matter-energy', 'satellites',
];

const MOTION_CONCEPTS = [
  'speed-velocity-acceleration', 'distance-time-graphs', 'velocity-time-graphs',
  'equations-of-motion', 'terminal-velocity', 'newtons-laws-motion', 'stopping-distances',
];

const ALL_CONCEPTS = [
  ...FORCES_CONCEPTS, ...ELECTRICITY_CONCEPTS, ...WAVES_CONCEPTS, ...ENERGY_CONCEPTS,
  ...MAGNETISM_CONCEPTS, ...PARTICLES_CONCEPTS, ...ATOMIC_CONCEPTS, ...SPACE_CONCEPTS,
  ...MOTION_CONCEPTS,
];

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
  'transverse-and-longitudinal': 'Transverse and Longitudinal Waves',
  'wave-properties': 'Wave Properties',
  'wave-equation': 'The Wave Equation',
  'reflection-and-refraction': 'Reflection and Refraction',
  'sound-waves': 'Sound Waves',
  'electromagnetic-spectrum': 'Electromagnetic Spectrum',
  'light-and-colour': 'Light and Colour',
  'energy-stores-and-transfers': 'Energy Stores and Transfers',
  'kinetic-energy': 'Kinetic Energy',
  'gravitational-pe': 'Gravitational Potential Energy',
  'elastic-pe': 'Elastic Potential Energy',
  'conservation-of-energy': 'Conservation of Energy',
  'efficiency': 'Efficiency',
  'power': 'Power',
  'permanent-temporary-magnets': 'Permanent and Temporary Magnets',
  'magnetic-fields': 'Magnetic Fields',
  'electromagnetism': 'Electromagnetism',
  'motor-effect': 'The Motor Effect',
  'flemings-left-hand-rule': "Fleming's Left-Hand Rule",
  'generators-and-induction': 'Generators and Induction',
  'transformers': 'Transformers',
  'states-of-matter': 'States of Matter',
  'particle-model': 'The Particle Model',
  'density': 'Density',
  'changes-of-state': 'Changes of State',
  'internal-energy': 'Internal Energy',
  'specific-heat-capacity': 'Specific Heat Capacity',
  'specific-latent-heat': 'Specific Latent Heat',
  'atomic-structure': 'Atomic Structure',
  'isotopes': 'Isotopes and Ions',
  'radioactive-decay': 'Radioactive Decay',
  'alpha-beta-gamma': 'Alpha, Beta and Gamma',
  'half-life': 'Half-Life',
  'uses-of-radiation': 'Uses of Radiation',
  'nuclear-fission-fusion': 'Nuclear Fission and Fusion',
  'solar-system': 'The Solar System',
  'life-cycle-of-stars': 'Life Cycle of Stars',
  'orbital-motion': 'Orbital Motion',
  'red-shift': 'Red-Shift',
  'big-bang': 'The Big Bang',
  'dark-matter-energy': 'Dark Matter and Dark Energy',
  'satellites': 'Satellites',
  'hookes-law': "Hooke's Law",
  'pressure-in-fluids': 'Pressure in Fluids',
  'iv-characteristics': 'I–V Characteristics',
  'domestic-electricity': 'Domestic Electricity',
  'renewable-energy-sources': 'Renewable Energy Sources',
  'national-grid': 'The National Grid',
  'gas-pressure-temperature': 'Gas Pressure and Temperature',
  'history-of-atomic-models': 'History of the Atomic Model',
  'speed-velocity-acceleration': 'Speed, Velocity and Acceleration',
  'distance-time-graphs': 'Distance–Time Graphs',
  'velocity-time-graphs': 'Velocity–Time Graphs',
  'equations-of-motion': 'Equations of Motion',
  'terminal-velocity': 'Terminal Velocity',
  'newtons-laws-motion': "Newton's Laws of Motion",
  'stopping-distances': 'Stopping Distances',
};

type TopicConfig = {
  id: string;
  name: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement> & { size?: number }>;
  color: string;
  bg: string;
  concepts: number;
  paper: string;
  available: boolean;
};

const TOPICS: TopicConfig[] = [
  { id: 'forces',      name: 'Forces',                       Icon: IconForces,      color: 'var(--topic-forces)',      bg: 'rgba(124,58,237,0.06)',  concepts: 9,  paper: 'Paper 2', available: true  },
  { id: 'electricity', name: 'Electricity',                  Icon: IconElectricity, color: 'var(--topic-electricity)', bg: 'rgba(37,99,235,0.06)',   concepts: 9,  paper: 'Paper 1', available: true  },
  { id: 'waves',       name: 'Waves',                        Icon: IconWaves,       color: 'var(--topic-waves)',       bg: 'rgba(8,145,178,0.06)',   concepts: 7,  paper: 'Paper 2', available: true  },
  { id: 'energy',      name: 'Energy',                       Icon: IconEnergy,      color: 'var(--topic-energy)',      bg: 'rgba(234,88,12,0.06)',   concepts: 8,  paper: 'Paper 1', available: true  },
  { id: 'magnetism',   name: 'Magnetism',                    Icon: IconMagnetism,   color: 'var(--topic-magnetism)',   bg: 'rgba(219,39,119,0.06)',  concepts: 8,  paper: 'Paper 2', available: true },
  { id: 'particles',   name: 'Particle Model',               Icon: IconParticles,   color: 'var(--topic-particles)',   bg: 'rgba(22,163,74,0.06)',   concepts: 8,  paper: 'Paper 1', available: true },
  { id: 'atomic',      name: 'Atomic Structure',             Icon: IconAtomic,      color: 'var(--topic-nuclear)',     bg: 'rgba(220,38,38,0.06)',   concepts: 8,  paper: 'Paper 2', available: true },
  { id: 'space',       name: 'Space Physics',                Icon: IconSpace,       color: 'var(--topic-space)',       bg: 'rgba(79,70,229,0.06)',   concepts: 7,  paper: 'Paper 2', available: true },
  { id: 'motion',      name: 'Motion',                       Icon: IconMotion,      color: 'var(--topic-motion)',      bg: 'rgba(2,132,199,0.06)',   concepts: 7,  paper: 'Paper 2', available: true },
];

const TOPIC_CONCEPTS: Record<string, string[]> = {
  forces: FORCES_CONCEPTS,
  electricity: ELECTRICITY_CONCEPTS,
  waves: WAVES_CONCEPTS,
  energy: ENERGY_CONCEPTS,
  magnetism: MAGNETISM_CONCEPTS,
  particles: PARTICLES_CONCEPTS,
  atomic: ATOMIC_CONCEPTS,
  space: SPACE_CONCEPTS,
  motion: MOTION_CONCEPTS,
};

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

function getWeekHeatmap(): { day: string; active: boolean }[] {
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const today = new Date().getDay();
  const mondayOffset = today === 0 ? 6 : today - 1;
  return days.map((day, i) => ({ day, active: i <= mondayOffset }));
}

type QuickAction = {
  Icon: React.FC<React.SVGProps<SVGSVGElement> & { size?: number }>;
  label: string;
  accessibleLabel: string;
  path: string;
  dynamic?: string;
};

export function Home() {
  const { progress } = useUser();
  const { streak } = useStreak();
  const { unlockedCount, totalCount, checkAchievements } = useAchievements();
  const { settings } = useSettings();
  const navigate = useNavigate();
  const noAnims = settings.animations === 'none';

  useEffect(() => {
    if (progress) checkAchievements(progress, streak);
  }, [progress, streak, checkAchievements]);

  const nextConcept = useMemo(() => {
    if (!progress) return ALL_CONCEPTS[0];
    return ALL_CONCEPTS.find(c => !progress.completedConcepts.includes(c)) ?? ALL_CONCEPTS[0];
  }, [progress]);

  if (!progress) return null;

  const getTopicDone = (topicId: string) =>
    (TOPIC_CONCEPTS[topicId] ?? []).filter(c => progress.completedConcepts.includes(c)).length;

  const done = progress.completedConcepts.length;
  const totalQuestions = progress.attemptedQuestions.length;
  const correctQuestions = progress.attemptedQuestions.filter(q => q.correct).length;
  const accuracy = totalQuestions > 0 ? Math.round((correctQuestions / totalQuestions) * 100) : 0;
  const weekMap = getWeekHeatmap();

  const stagger = noAnims ? {} : {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
  };

  const quickActions: QuickAction[] = [
    { Icon: IconPracticals,   label: 'Practicals',  accessibleLabel: 'Required practicals', path: '/practicals' },
    { Icon: IconEquations,    label: 'Equations',   accessibleLabel: 'Equations',            path: '/equations'  },
    { Icon: IconPapers,       label: 'Papers',      accessibleLabel: 'Past papers',          path: '/papers'     },
    { Icon: IconAchievements, label: `${unlockedCount}/${totalCount}`, accessibleLabel: `Achievements: ${unlockedCount} of ${totalCount} unlocked`, path: '/achievements' },
    { Icon: IconSettings,     label: 'Settings',    accessibleLabel: 'Settings',             path: '/settings'   },
  ];

  return (
    <ScreenWrapper>
      {/* Header */}
      <div className="home__header">
        <div>
          <p className="home__greeting">{getGreeting()}</p>
          <h1 className="home__title">NeuroPhysics</h1>
          <p className="home__board">GCSE Physics</p>
        </div>
        <div className="home__header-right">
          <button
            className="home__search-btn"
            onClick={() => navigate('/search')}
            aria-label="Search"
          >
            <IconSearch size={18} aria-hidden="true" />
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
        <ProgressRing percent={Math.round((done / ALL_CONCEPTS.length) * 100)} size={56} />
      </motion.button>

      {/* Topics */}
      <section>
        <h2 className="home__section-title">Topics</h2>
        <div className="home__topics">
          {TOPICS.map(t => {
            const topicDone = getTopicDone(t.id);
            return (
              <motion.button
                key={t.id}
                className={`home__topic-card card ${!t.available ? 'home__topic-card--locked' : 'home__topic-card--unlocked'}`}
                onClick={() => t.available && navigate(`/topic/${t.id}`)}
                disabled={!t.available}
                style={{ '--topic-color': t.color, '--topic-bg': t.bg } as React.CSSProperties}
                whileTap={t.available && !noAnims ? { scale: 0.98 } : undefined}
              >
                <div className="home__topic-icon-wrap" aria-hidden="true">
                  <t.Icon size={22} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p className="home__topic-name">{t.name}</p>
                  <p className="home__topic-meta">
                    {t.available ? `${t.concepts} concepts · ${t.paper}` : 'Coming soon'}
                  </p>
                </div>
                {t.available && (
                  <ProgressRing
                    percent={Math.round((topicDone / t.concepts) * 100)}
                    size={36}
                    strokeWidth={3}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </section>

      {/* Quick actions */}
      <section>
        <h2 className="home__section-title">Quick access</h2>
        <div className="home__quick-actions">
          {quickActions.map(a => (
            <motion.button
              key={a.path}
              className="home__qa-btn"
              onClick={() => navigate(a.path)}
              whileTap={noAnims ? undefined : { scale: 0.95 }}
              aria-label={a.accessibleLabel}
            >
              <a.Icon size={22} aria-hidden="true" />
              <span>{a.label}</span>
            </motion.button>
          ))}
        </div>
      </section>
    </ScreenWrapper>
  );
}
