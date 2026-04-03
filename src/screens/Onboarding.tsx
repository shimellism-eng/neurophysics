import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { BoardId, Tier } from '../types/content';
import { useUser } from '../context/UserContext';
import './Onboarding.css';

const BOARDS: { id: BoardId; name: string; color: string; spec: string }[] = [
  { id: 'aqa',         name: 'AQA',              color: '#60a5fa', spec: '8463'          },
  { id: 'edexcel',     name: 'Edexcel',           color: '#f472b6', spec: '1PH0'          },
  { id: 'ocr-gateway', name: 'OCR Gateway',       color: '#a78bfa', spec: 'J249'          },
  { id: 'ocr-21c',     name: 'OCR 21st Century',  color: '#34d399', spec: 'J250'          },
  { id: 'wjec',        name: 'WJEC',              color: '#fbbf24', spec: 'WJEC-GCSE-PHY' },
];

const TIERS: Tier[] = ['Foundation', 'Higher'];

export function Onboarding() {
  const [step, setStep] = useState<'welcome' | 'board' | 'tier'>('welcome');
  const [board, setBoard] = useState<BoardId | null>(null);
  const [tier, setTier] = useState<Tier | null>(null);
  const { completeOnboarding } = useUser();
  const navigate = useNavigate();

  function handleBoardSelect(b: BoardId) {
    setBoard(b);
    setStep('tier');
  }

  function handleTierSelect(t: Tier) {
    setTier(t);
  }

  function handleStart() {
    if (board && tier) {
      completeOnboarding(board, tier);
      navigate('/home');
    }
  }

  return (
    <div className="onboarding safe-top safe-bot">
      {step === 'welcome' && (
        <div className="onboarding__screen">
          <div className="onboarding__logo">⚡</div>
          <h1 className="onboarding__headline">NeuroPhysics</h1>
          <p className="onboarding__tagline">Physics. For every brain.</p>
          <p className="onboarding__desc">
            GCSE Physics revision built from the ground up for neurodivergent learners.
            Interactive simulations. Real past paper questions. No flashing. No pressure.
          </p>
          <div className="onboarding__features">
            {['All 5 UK exam boards', 'Interactive simulations', 'ND-first design', 'BEST misconception diagnostics'].map(f => (
              <div key={f} className="onboarding__feature">
                <span className="onboarding__feature-check">✓</span>
                <span>{f}</span>
              </div>
            ))}
          </div>
          <button className="onboarding__cta" onClick={() => setStep('board')}>
            Let's go →
          </button>
        </div>
      )}

      {step === 'board' && (
        <div className="onboarding__screen">
          <button className="onboarding__back" onClick={() => setStep('welcome')}>← Back</button>
          <h2 className="onboarding__step-title">Which exam board are you studying?</h2>
          <p className="onboarding__step-desc">We'll show you the right past paper questions and flag what's on your formula sheet.</p>
          <div className="onboarding__board-list">
            {BOARDS.map(b => (
              <button
                key={b.id}
                className={`onboarding__board-btn ${board === b.id ? 'onboarding__board-btn--selected' : ''}`}
                onClick={() => handleBoardSelect(b.id)}
                style={{ '--board-color': b.color } as React.CSSProperties}
              >
                <span className="onboarding__board-name">{b.name}</span>
                <span className="onboarding__board-spec">{b.spec}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 'tier' && (
        <div className="onboarding__screen">
          <button className="onboarding__back" onClick={() => setStep('board')}>← Back</button>
          <h2 className="onboarding__step-title">Which tier are you sitting?</h2>
          <p className="onboarding__step-desc">Higher includes extra content that Foundation students don't need. You can change this later in Settings.</p>
          <div className="onboarding__tier-list">
            {TIERS.map(t => (
              <button
                key={t}
                className={`onboarding__tier-btn ${tier === t ? 'onboarding__tier-btn--selected' : ''}`}
                onClick={() => handleTierSelect(t)}
              >
                <span className="onboarding__tier-name">{t}</span>
                <span className="onboarding__tier-desc">
                  {t === 'Foundation' ? 'Grades 1–5 — core content' : 'Grades 4–9 — includes all Higher content'}
                </span>
              </button>
            ))}
          </div>
          {tier && (
            <button className="onboarding__cta" onClick={handleStart}>
              Start learning →
            </button>
          )}
        </div>
      )}
    </div>
  );
}
