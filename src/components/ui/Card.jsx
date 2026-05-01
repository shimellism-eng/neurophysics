// src/components/ui/Card.jsx
// Quiet premium surface card. Renders a <div> by default.
// Pass onClick to get an accessible <button> (full-width, text-left).
//
// Props:
//   accent   (string)  — CSS colour; adds a subtle tinted border
//   padding  (string)  — Tailwind padding class, default 'p-4'
//   onClick  (fn)      — makes the card a tappable button

export default function Card({
  children,
  className = '',
  style,
  onClick,
  accent,
  padding = 'p-4',
}) {
  const baseStyle = {
    background: 'var(--surface-panel)',
    border: `0.75px solid ${accent ? `${accent}30` : 'var(--np-border)'}`,
    borderRadius: 'var(--radius-xl)',
    boxShadow: 'var(--shadow-card)',
    ...style,
  };

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`w-full text-left ${padding} ${className}`}
        style={baseStyle}
      >
        {children}
      </button>
    );
  }

  return (
    <div className={`${padding} ${className}`} style={baseStyle}>
      {children}
    </div>
  );
}
