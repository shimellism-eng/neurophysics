import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { useProgress } from '../hooks/useProgress';
import { ScreenWrapper } from '../components/layout/ScreenWrapper';
import { ProgressRing } from '../components/ui/ProgressRing';
import './Topics.css';

const ALL_TOPICS = [
  { id: 'forces', name: 'Forces', emoji: '⚡', color: '#00e5b4', paper: 'Paper 2', concepts: ['resultant-forces','newtons-first-law','newtons-second-law','newtons-third-law','weight-and-gravity','momentum','work-and-energy'], available: true },
  { id: 'electricity', name: 'Electricity', emoji: '🔌', color: '#60a5fa', paper: 'Paper 1', concepts: [], available: false },
  { id: 'waves', name: 'Waves', emoji: '〰', color: '#a78bfa', paper: 'Paper 2', concepts: [], available: false },
  { id: 'energy', name: 'Energy', emoji: '🔋', color: '#ffb344', paper: 'Paper 1', concepts: [], available: false },
  { id: 'particle-model', name: 'Particle Model', emoji: '⚛', color: '#ff4faa', paper: 'Paper 1', concepts: [], available: false },
  { id: 'magnetism', name: 'Magnetism', emoji: '🧲', color: '#4ade80', paper: 'Paper 2', concepts: [], available: false },
];

export function Topics() {
  const navigate = useNavigate();
  const { progress } = useUser();
  const { topicProgress } = useProgress();

  return (
    <ScreenWrapper>
      <div className="topics__header">
        <h1>Topics</h1>
        {progress && <p className="text-muted text-sm">{progress.board.toUpperCase()} · {progress.tier}</p>}
      </div>

      <div className="topics__list">
        {ALL_TOPICS.map(t => {
          const pct = topicProgress(t.concepts);
          return (
            <button
              key={t.id}
              className={`topics__card card ${!t.available ? 'topics__card--locked' : ''}`}
              onClick={() => t.available && navigate(`/topic/${t.id}`)}
              disabled={!t.available}
              style={{ '--tc': t.color } as React.CSSProperties}
            >
              <div className="topics__card-left">
                <span className="topics__emoji" aria-hidden="true">{t.emoji}</span>
                <div>
                  <p className="topics__name">{t.name}</p>
                  <p className="topics__meta">{t.paper}{!t.available ? ' · Coming soon' : ` · ${t.concepts.length} concepts`}</p>
                </div>
              </div>
              {t.available ? (
                <ProgressRing percent={pct} size={48} />
              ) : (
                <span className="topics__lock" aria-hidden="true">🔒</span>
              )}
            </button>
          );
        })}
      </div>
    </ScreenWrapper>
  );
}
