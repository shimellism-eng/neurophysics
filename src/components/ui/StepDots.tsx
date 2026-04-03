import './StepDots.css';

interface StepDotsProps {
  total: number;
  current: number;
  colors?: string[];
}

export function StepDots({ total, current, colors }: StepDotsProps) {
  return (
    <div className="step-dots" role="progressbar" aria-valuenow={current + 1} aria-valuemin={1} aria-valuemax={total}>
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`step-dot ${i === current ? 'step-dot--active' : ''} ${i < current ? 'step-dot--done' : ''}`}
          style={i === current && colors?.[i] ? { background: `var(--${colors[i]})` } : undefined}
        />
      ))}
    </div>
  );
}
