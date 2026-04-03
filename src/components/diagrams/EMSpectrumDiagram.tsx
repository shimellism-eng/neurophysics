const font = "'Bricolage Grotesque', sans-serif";

interface Band {
  label: string;
  shortLabel: string;
  fill: string;
  textColor: string;
}

const BANDS: Band[] = [
  { label: 'Radio',      shortLabel: 'Radio',  fill: '#3b3b8a',       textColor: '#c0c0ff' },
  { label: 'Microwave',  shortLabel: 'Micro',  fill: '#2e6e8e',       textColor: '#a0e8ff' },
  { label: 'Infrared',   shortLabel: 'IR',     fill: '#7a3a00',       textColor: '#ffb97a' },
  { label: 'Visible',    shortLabel: 'Vis',    fill: 'url(#visible)', textColor: '#ffffff' },
  { label: 'UV',         shortLabel: 'UV',     fill: '#4b006e',       textColor: '#e0a0ff' },
  { label: 'X-ray',      shortLabel: 'X-ray',  fill: '#1a1a4a',       textColor: '#9090ff' },
  { label: 'Gamma',      shortLabel: '\u03b3', fill: '#0d0d0d',       textColor: '#ff6b6b' },
];

const BAND_COUNT = BANDS.length;
const BAR_X = 30;
const BAR_W = 340;
const BAR_Y = 60;
const BAR_H = 44;
const BAND_W = BAR_W / BAND_COUNT;

export function EMSpectrumDiagram() {
  return (
    <svg
      viewBox="0 0 400 220"
      width="100%"
      height="auto"
      aria-label="Electromagnetic spectrum from radio waves to gamma rays"
      role="img"
      style={{ display: 'block' }}
    >
      <defs>
        {/* Visible light gradient */}
        <linearGradient id="visible" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#ff0000" />
          <stop offset="20%"  stopColor="#ff8800" />
          <stop offset="40%"  stopColor="#ffff00" />
          <stop offset="60%"  stopColor="#00cc00" />
          <stop offset="80%"  stopColor="#0000ff" />
          <stop offset="100%" stopColor="#8800cc" />
        </linearGradient>
        {/* Arrow right */}
        <marker id="em-ar" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill="var(--muted)" />
        </marker>
        {/* Arrow left */}
        <marker id="em-al" markerWidth="8" markerHeight="8" refX="2" refY="3" orient="auto-start-reverse">
          <path d="M8,0 L8,6 L0,3 z" fill="var(--muted)" />
        </marker>
        {/* Arrow right cyan */}
        <marker id="em-ar-c" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill="var(--cyan)" />
        </marker>
        {/* Arrow left cyan */}
        <marker id="em-al-c" markerWidth="8" markerHeight="8" refX="2" refY="3" orient="auto-start-reverse">
          <path d="M8,0 L8,6 L0,3 z" fill="var(--cyan)" />
        </marker>
        {/* Arrow right amber */}
        <marker id="em-ar-a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill="var(--amber)" />
        </marker>
        {/* Arrow left amber */}
        <marker id="em-al-a" markerWidth="8" markerHeight="8" refX="2" refY="3" orient="auto-start-reverse">
          <path d="M8,0 L8,6 L0,3 z" fill="var(--amber)" />
        </marker>
      </defs>

      {/* Title */}
      <text x="200" y="18" textAnchor="middle" fill="var(--text)" fontSize="13" fontFamily={font} fontWeight="700">
        The Electromagnetic Spectrum
      </text>

      {/* Band rectangles */}
      {BANDS.map((band, i) => {
        const x = BAR_X + i * BAND_W;
        return (
          <g key={band.label}>
            <rect x={x} y={BAR_Y} width={BAND_W} height={BAR_H} fill={band.fill} />
            {/* vertical divider */}
            {i > 0 && (
              <line x1={x} y1={BAR_Y} x2={x} y2={BAR_Y + BAR_H} stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
            )}
            {/* short label inside bar */}
            <text
              x={x + BAND_W / 2}
              y={BAR_Y + BAR_H / 2 + 4}
              textAnchor="middle"
              fill={band.textColor}
              fontSize="9.5"
              fontFamily={font}
              fontWeight="700"
            >
              {band.shortLabel}
            </text>
          </g>
        );
      })}

      {/* Bar border */}
      <rect x={BAR_X} y={BAR_Y} width={BAR_W} height={BAR_H} fill="none" stroke="var(--border2)" strokeWidth="1.5" rx="3" />

      {/* Full labels below bar */}
      {BANDS.map((band, i) => {
        const x = BAR_X + i * BAND_W + BAND_W / 2;
        return (
          <text
            key={`lbl-${band.label}`}
            x={x} y={BAR_Y + BAR_H + 14}
            textAnchor="middle"
            fill="var(--muted)"
            fontSize="8.5"
            fontFamily={font}
          >
            {band.label}
          </text>
        );
      })}

      {/* Wavelength arrow: long (left) to short (right) */}
      <text x={BAR_X} y={135} fill="var(--cyan)" fontSize="9" fontFamily={font}>long</text>
      <line x1={BAR_X + 28} y1={132} x2={BAR_X + BAR_W - 28} y2={132}
        stroke="var(--cyan)" strokeWidth="1.8"
        markerStart="url(#em-al-c)" markerEnd="url(#em-ar-c)" />
      <text x={BAR_X + BAR_W} y={135} fill="var(--cyan)" fontSize="9" fontFamily={font} textAnchor="end">short</text>
      <text x={200} y={147} textAnchor="middle" fill="var(--cyan)" fontSize="9.5" fontFamily={font} fontWeight="600">
        Wavelength ({'\u03bb'})
      </text>

      {/* Frequency arrow: low (left) to high (right) */}
      <text x={BAR_X} y={163} fill="var(--purple)" fontSize="9" fontFamily={font}>low</text>
      <line x1={BAR_X + 20} y1={160} x2={BAR_X + BAR_W - 20} y2={160}
        stroke="var(--purple)" strokeWidth="1.8"
        markerStart="url(#em-al)" markerEnd="url(#em-ar)">
        <animate attributeName="opacity" values="1" dur="0s" />
      </line>
      {/* purple markers via fallback */}
      <line x1={BAR_X + 20} y1={160} x2={BAR_X + BAR_W - 20} y2={160}
        stroke="var(--purple)" strokeWidth="1.8"
        markerStart="url(#em-al)" markerEnd="url(#em-ar)" />
      <text x={BAR_X + BAR_W} y={163} fill="var(--purple)" fontSize="9" fontFamily={font} textAnchor="end">high</text>
      <text x={200} y={175} textAnchor="middle" fill="var(--purple)" fontSize="9.5" fontFamily={font} fontWeight="600">
        Frequency (f)
      </text>

      {/* Energy arrow: low (left) to high (right) */}
      <text x={BAR_X} y={191} fill="var(--amber)" fontSize="9" fontFamily={font}>low</text>
      <line x1={BAR_X + 20} y1={188} x2={BAR_X + BAR_W - 20} y2={188}
        stroke="var(--amber)" strokeWidth="1.8"
        markerStart="url(#em-al-a)" markerEnd="url(#em-ar-a)" />
      <text x={BAR_X + BAR_W} y={191} fill="var(--amber)" fontSize="9" fontFamily={font} textAnchor="end">high</text>
      <text x={200} y={203} textAnchor="middle" fill="var(--amber)" fontSize="9.5" fontFamily={font} fontWeight="600">
        Energy (E)
      </text>

      {/* Bottom note */}
      <text x={200} y={217} textAnchor="middle" fill="var(--muted)" fontSize="9" fontFamily={font}>
        All EM waves travel at 3 x 10^8 m/s in a vacuum
      </text>
    </svg>
  );
}
