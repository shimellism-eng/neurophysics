import { useParams, useNavigate } from 'react-router-dom';
import { useTopicMeta } from '../hooks/useContent';
import { useProgress } from '../hooks/useProgress';
import { useUser } from '../context/UserContext';
import { ScreenWrapper } from '../components/layout/ScreenWrapper';
import { ProgressRing } from '../components/ui/ProgressRing';
import './TopicDetail.css';

export function TopicDetail() {
  const { topicId } = useParams<{ topicId: string }>();
  const navigate = useNavigate();
  const { data: meta, loading } = useTopicMeta(topicId ?? null);
  const { isConceptComplete, topicProgress } = useProgress();
  const { progress } = useUser();

  if (loading) return <ScreenWrapper><p className="text-muted">Loading…</p></ScreenWrapper>;
  if (!meta)   return <ScreenWrapper><p className="text-muted">Topic not found.</p></ScreenWrapper>;

  const pct = topicProgress(meta.conceptOrder);
  const boardNote = progress?.board ? meta.boardNotes[progress.board] : undefined;

  const CONCEPT_LABELS: Record<string, string> = {
    // Forces
    'resultant-forces':   'Resultant Forces',
    'newtons-first-law':  "Newton's First Law",
    'newtons-second-law': "Newton's Second Law",
    'newtons-third-law':  "Newton's Third Law",
    'weight-and-gravity': 'Weight and Gravity',
    'momentum':           'Momentum',
    'work-and-energy':    'Work and Energy',
    'hookes-law':         "Hooke's Law",
    'pressure-in-fluids': 'Pressure in Fluids',
    // Electricity
    'charge-and-current':    'Charge and Current',
    'potential-difference':  'Potential Difference',
    'resistance':            'Resistance',
    'ohms-law':              "Ohm's Law",
    'series-circuits':       'Series Circuits',
    'parallel-circuits':     'Parallel Circuits',
    'power-and-energy':      'Electrical Power and Energy',
    'iv-characteristics':    'I–V Characteristics',
    'domestic-electricity':  'Domestic Electricity',
    // Waves
    'transverse-and-longitudinal': 'Transverse and Longitudinal Waves',
    'wave-properties':       'Wave Properties',
    'wave-equation':         'The Wave Equation',
    'reflection-and-refraction': 'Reflection and Refraction',
    'sound-waves':           'Sound Waves',
    'electromagnetic-spectrum': 'Electromagnetic Spectrum',
    'light-and-colour':      'Light and Colour',
    // Energy
    'energy-stores-and-transfers': 'Energy Stores and Transfers',
    'kinetic-energy':        'Kinetic Energy',
    'gravitational-pe':      'Gravitational Potential Energy',
    'elastic-pe':            'Elastic Potential Energy',
    'conservation-of-energy': 'Conservation of Energy',
    'efficiency':            'Efficiency',
    'power':                 'Power',
    'renewable-energy-sources': 'Renewable Energy Sources',
    // Magnetism
    'permanent-temporary-magnets': 'Permanent and Temporary Magnets',
    'magnetic-fields':       'Magnetic Fields',
    'electromagnetism':      'Electromagnetism',
    'motor-effect':          'The Motor Effect',
    'flemings-left-hand-rule': "Fleming's Left-Hand Rule",
    'generators-and-induction': 'Generators and Induction',
    'transformers':          'Transformers',
    'national-grid':         'The National Grid',
    // Particles
    'states-of-matter':      'States of Matter',
    'particle-model':        'The Particle Model',
    'density':               'Density',
    'changes-of-state':      'Changes of State',
    'internal-energy':       'Internal Energy',
    'specific-heat-capacity': 'Specific Heat Capacity',
    'specific-latent-heat':  'Specific Latent Heat',
    'gas-pressure-temperature': 'Gas Pressure and Temperature',
    // Atomic
    'atomic-structure':      'Atomic Structure',
    'isotopes':              'Isotopes and Ions',
    'radioactive-decay':     'Radioactive Decay',
    'alpha-beta-gamma':      'Alpha, Beta and Gamma',
    'half-life':             'Half-Life',
    'uses-of-radiation':     'Uses of Radiation',
    'nuclear-fission-fusion': 'Nuclear Fission and Fusion',
    'history-of-atomic-models': 'History of the Atomic Model',
    // Space
    'solar-system':          'The Solar System',
    'life-cycle-of-stars':   'Life Cycle of Stars',
    'orbital-motion':        'Orbital Motion',
    'red-shift':             'Red-Shift',
    'big-bang':              'The Big Bang',
    'dark-matter-energy':    'Dark Matter and Dark Energy',
    'satellites':            'Satellites',
    // Motion
    'speed-velocity-acceleration': 'Speed, Velocity and Acceleration',
    'distance-time-graphs':  'Distance–Time Graphs',
    'velocity-time-graphs':  'Velocity–Time Graphs',
    'equations-of-motion':   'Equations of Motion',
    'terminal-velocity':     'Terminal Velocity',
    'newtons-laws-motion':   "Newton's Laws of Motion",
    'stopping-distances':    'Stopping Distances',
  };

  return (
    <ScreenWrapper>
      <button className="topic-detail__back" onClick={() => navigate('/topics')} aria-label="Back to topics">← Topics</button>

      <div className="topic-detail__header">
        <div className="topic-detail__title-row">
          <span className="topic-detail__emoji" aria-hidden="true">{meta.emoji}</span>
          <div>
            <h1 className="topic-detail__title">{meta.name}</h1>
            <p className="text-muted text-sm">{meta.estimatedMinutes} min · {meta.totalConcepts} concepts</p>
          </div>
        </div>
        <ProgressRing percent={pct} size={64} />
      </div>

      {boardNote && (
        <div className="topic-detail__board-note">
          <p>{boardNote}</p>
        </div>
      )}

      <div className="topic-detail__concepts">
        {meta.conceptOrder.map((cId, i) => {
          const done = isConceptComplete(cId);
          const label = CONCEPT_LABELS[cId] ?? cId;
          return (
            <button
              key={cId}
              className={`topic-detail__concept ${done ? 'topic-detail__concept--done' : ''}`}
              onClick={() => navigate(`/learn/${cId}`)}
            >
              <div className="topic-detail__concept-num">
                {done ? '✓' : i + 1}
              </div>
              <div className="topic-detail__concept-info">
                <p className="topic-detail__concept-name">{label}</p>
                <p className="topic-detail__concept-meta">~8 min</p>
              </div>
              <span className="topic-detail__concept-arrow">›</span>
            </button>
          );
        })}
      </div>
    </ScreenWrapper>
  );
}
