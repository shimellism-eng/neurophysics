// src/components/ui/Card.jsx
// Glassmorphism surface card. Renders a <div> by default.
// Pass onClick to get an accessible <button> (full-width, text-left).
//
// Props:
//   accent   (string)  — CSS colour; adds a subtle glow + tinted border
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
    background: 'var(--np-card)',
    border: `0.75px solid ${accent ? `${accent}28` : 'var(--np-border)'}`,
    borderRadius: '16px',
    ...(accent && { boxShadow: `0 4px 24px ${accent}14` }),
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
