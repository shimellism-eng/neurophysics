/**
 * SVG diagram for RP6: Force and Extension (Hooke's Law)
 * Shows a clamp stand with a spring, hanging masses, metre ruler,
 * and a pointer on the spring.
 */
export function HookesLawDiagram() {
  return (
    <svg
      viewBox="0 0 360 400"
      width="100%"
      aria-label="Hooke's Law apparatus: clamp stand holding a spring vertically with mass hangers below. A metre ruler is beside the spring. A pointer is attached to the bottom of the spring."
      role="img"
      style={{ display: 'block', maxWidth: '360px', margin: '0 auto' }}
    >
      <rect width="360" height="400" fill="var(--bg2)" rx="10" />

      {/* === BENCH / BASE === */}
      <rect x="20" y="355" width="320" height="14" rx="4"
        fill="var(--bg4)" stroke="var(--muted)" strokeWidth="1.5" />

      {/* Safety mat */}
      <rect x="130" y="345" width="80" height="12" rx="3"
        fill="var(--red-dim)" stroke="var(--red)" strokeWidth="1" strokeDasharray="3,2" />
      <text x="170" y="356" textAnchor="middle" fill="var(--red)" fontSize="8" fontFamily="sans-serif">
        Safety mat
      </text>

      {/* === CLAMP STAND === */}
      {/* Vertical rod */}
      <rect x="68" y="40" width="8" height="318" rx="2"
        fill="var(--bg4)" stroke="var(--muted)" strokeWidth="1.5" />
      {/* Base */}
      <rect x="30" y="348" width="80" height="10" rx="3"
        fill="var(--bg4)" stroke="var(--muted)" strokeWidth="1.5" />

      {/* Horizontal clamp arm */}
      <rect x="74" y="52" width="90" height="10" rx="2"
        fill="var(--bg4)" stroke="var(--muted)" strokeWidth="1.5" />
      {/* Boss */}
      <rect x="62" y="48" width="20" height="20" rx="3"
        fill="var(--bg3)" stroke="var(--muted)" strokeWidth="1.5" />
      <text x="72" y="61" textAnchor="middle" fill="var(--muted)" fontSize="8" fontFamily="sans-serif">B</text>

      {/* === SPRING === */}
      {/* Spring attached at 162, 62 (below clamp arm end) */}
      {(() => {
        const x = 162;
        const yTop = 62;
        const coils = 10;
        const coilHeight = 14;
        const amplitude = 10;
        const points: string[] = [];
        for (let i = 0; i <= coils * 8; i++) {
          const t = (i / (coils * 8)) * coils * Math.PI * 2;
          const px = x + Math.sin(t) * amplitude;
          const py = yTop + (i / (coils * 8)) * coils * coilHeight;
          points.push(`${px},${py}`);
        }
        return (
          <polyline
            points={points.join(' ')}
            fill="none"
            stroke="var(--cyan)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        );
      })()}

      {/* Spring top hook */}
      <line x1="162" y1="58" x2="162" y2="62" stroke="var(--cyan)" strokeWidth="2.5" />
      {/* Spring bottom (at yTop + 10*14 = 202) */}
      {/* Pointer attached at spring bottom */}
      <line x1="162" y1="202" x2="185" y2="202"
        stroke="var(--amber)" strokeWidth="2" />
      <polygon points="185,199 193,202 185,205" fill="var(--amber)" />
      <text x="196" y="206" fill="var(--amber)" fontSize="9" fontFamily="sans-serif">Pointer</text>

      {/* === METRE RULER === */}
      <rect x="210" y="50" width="18" height="300" rx="3"
        fill="var(--bg4)" stroke="var(--muted)" strokeWidth="1.5" />
      {/* Ruler markings */}
      {Array.from({ length: 16 }, (_, i) => (
        <g key={i}>
          <line
            x1="210" y1={50 + i * 20}
            x2={i % 5 === 0 ? 204 : 207} y2={50 + i * 20}
            stroke="var(--muted)" strokeWidth="1"
          />
          {i % 5 === 0 && (
            <text
              x="200" y={54 + i * 20}
              textAnchor="end" fill="var(--muted)"
              fontSize="8" fontFamily="sans-serif"
            >
              {i * 10}
            </text>
          )}
        </g>
      ))}
      <text x="219" y="42" textAnchor="middle" fill="var(--muted)" fontSize="8" fontFamily="sans-serif">cm</text>

      {/* === MASS HANGER + SLOTTED MASSES === */}
      {/* Hook connecting to spring bottom */}
      <line x1="162" y1="202" x2="162" y2="220" stroke="var(--text)" strokeWidth="2" />
      {/* Hanger cross bar */}
      <rect x="145" y="220" width="34" height="8" rx="2"
        fill="var(--bg4)" stroke="var(--amber)" strokeWidth="1.5" />
      {/* Slotted masses */}
      <rect x="148" y="228" width="28" height="14" rx="2"
        fill="var(--bg3)" stroke="var(--amber)" strokeWidth="1.5" />
      <rect x="148" y="242" width="28" height="14" rx="2"
        fill="var(--bg3)" stroke="var(--amber)" strokeWidth="1.5" />
      <rect x="148" y="256" width="28" height="14" rx="2"
        fill="var(--bg3)" stroke="var(--amber)" strokeWidth="1.5" />

      {/* Weight label */}
      <text x="162" y="284" textAnchor="middle" fill="var(--amber)" fontSize="10" fontFamily="sans-serif">
        Masses
      </text>
      <text x="162" y="296" textAnchor="middle" fill="var(--muted)" fontSize="9" fontFamily="sans-serif">
        F = mg
      </text>

      {/* Double-headed arrow for extension */}
      <line x1="135" y1="62" x2="135" y2="202" stroke="var(--purple)" strokeWidth="1.5" strokeDasharray="4,3" />
      <line x1="131" y1="62" x2="139" y2="62" stroke="var(--purple)" strokeWidth="1.5" />
      <line x1="131" y1="202" x2="139" y2="202" stroke="var(--purple)" strokeWidth="1.5" />
      <text x="128" y="135" textAnchor="middle" fill="var(--purple)" fontSize="9" fontFamily="sans-serif"
        transform="rotate(-90, 128, 135)">
        Extension x
      </text>

      {/* Labels */}
      <text x="100" y="38" fill="var(--muted)" fontSize="9" fontFamily="sans-serif">Clamp stand</text>
      <text x="232" y="38" fill="var(--muted)" fontSize="9" fontFamily="sans-serif">Ruler</text>

      {/* Caption */}
      <text x="10" y="392" fill="var(--muted)" fontSize="9" fontFamily="sans-serif">
        Measure extension = stretched length minus natural length.
      </text>
    </svg>
  );
}
