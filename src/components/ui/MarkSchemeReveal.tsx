import { useState } from 'react';
import './MarkSchemeReveal.css';

interface MarkSchemeRevealProps {
  steps: string[];
  award: string;
  commonMistake?: string;
}

export function MarkSchemeReveal({ steps, award, commonMistake }: MarkSchemeRevealProps) {
  const [revealed, setRevealed] = useState(false);

  if (!revealed) {
    return (
      <button className="ms-reveal-btn" onClick={() => setRevealed(true)}>
        <span>Show mark scheme</span>
        <span className="ms-reveal-btn__icon">👁</span>
      </button>
    );
  }

  return (
    <div className="ms-reveal">
      <div className="ms-reveal__header">
        <span className="ms-reveal__title">Mark Scheme</span>
        <button className="ms-reveal__close" onClick={() => setRevealed(false)}>Hide</button>
      </div>
      <ol className="ms-reveal__steps">
        {steps.map((step, i) => (
          <li key={i} className="ms-reveal__step">
            <span className="ms-reveal__mark">✓</span>
            <span>{step}</span>
          </li>
        ))}
      </ol>
      <p className="ms-reveal__award">{award}</p>
      {commonMistake && (
        <div className="ms-reveal__mistake">
          <span>⚠️</span>
          <span><strong>Common mistake:</strong> {commonMistake}</span>
        </div>
      )}
    </div>
  );
}
