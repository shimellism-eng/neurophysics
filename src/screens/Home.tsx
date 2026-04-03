import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { useStreak } from '../hooks/useStreak';
import { ScreenWrapper } from '../components/layout/ScreenWrapper';
import { ProgressRing } from '../components/ui/ProgressRing';
import './Home.css';

const BOARD_NAMES: Record<string, string> = {
  aqa: 'AQA', edexcel: 'Edexcel', 'ocr-gateway': 'OCR Gateway',
  'ocr-21c': 'OCR 21st Century', wjec: 'WJEC',
};

// Quick-access topics (v1: forces only)
const QUICK_TOPICS = [
  { id: 'forces', name: 'Forces', emoji: '⚡', color: 'var(--cyan)', concepts: 7, paper: 'Paper 2' },
];

export function Home() {
  const { progress } = useUser();
  const { streak } = useStreak();
  const navigate = useNavigate();

  if (!progress) return null;

  const boardName = BOARD_NAMES[progress.board] ?? progress.board;
  const done = progress.completedConcepts.length;

  return (
    <ScreenWrapper>
      {/* Header */}
      <div className="home__header">
        <div>
          <p className="home__greeting">Welcome back</p>
          <h1 className="home__title">NeuroPhysics</h1>
          <p className="home__board">{boardName} · {progress.tier}</p>
        </div>
        <div className="home__streak">
          <span className="home__streak-fire">🔥</span>
          <span className="home__streak-count">{streak}</span>
          <span className="home__streak-label">day{streak !== 1 ? 's' : ''}</span>
        </div>
      </div>

      {/* Continue card */}
      <button
        className="home__continue card"
        onClick={() => navigate('/topic/forces')}
      >
        <div className="home__continue-left">
          <span className="home__continue-label">Continue</span>
          <h2 className="home__continue-topic">Forces</h2>
          <p className="home__continue-sub">{done} concept{done !== 1 ? 's' : ''} complete</p>
        </div>
        <ProgressRing percent={done > 0 ? Math.round((done / 7) * 100) : 0} size={64} />
      </button>

      {/* Topic grid */}
      <section>
        <h2 className="home__section-title">Topics</h2>
        <div className="home__topics">
          {QUICK_TOPICS.map(t => (
            <button
              key={t.id}
              className="home__topic-card card"
              onClick={() => navigate(`/topic/${t.id}`)}
              style={{ '--topic-color': t.color } as React.CSSProperties}
            >
              <span className="home__topic-emoji">{t.emoji}</span>
              <div>
                <p className="home__topic-name">{t.name}</p>
                <p className="home__topic-meta">{t.concepts} concepts · {t.paper}</p>
              </div>
            </button>
          ))}
          {/* Phase 2 stubs */}
          {['Electricity', 'Waves', 'Radioactivity', 'Energy'].map(name => (
            <div key={name} className="home__topic-card home__topic-card--locked card">
              <span className="home__topic-emoji">🔒</span>
              <div>
                <p className="home__topic-name">{name}</p>
                <p className="home__topic-meta">Coming soon</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick actions */}
      <section>
        <h2 className="home__section-title">Quick access</h2>
        <div className="home__quick-actions">
          <button className="home__qa-btn" onClick={() => navigate('/equations')}>
            <span>∑</span>
            <span>Equations</span>
          </button>
          <button className="home__qa-btn" onClick={() => navigate('/papers')}>
            <span>📝</span>
            <span>Past papers</span>
          </button>
          <button className="home__qa-btn" onClick={() => navigate('/settings')}>
            <span>⚙</span>
            <span>Settings</span>
          </button>
        </div>
      </section>
    </ScreenWrapper>
  );
}
