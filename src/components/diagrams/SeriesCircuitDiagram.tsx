const font = "'Bricolage Grotesque', sans-serif";

// Standard circuit symbols as SVG groups, centred on (0,0)
// All use var(--text) stroke by default, 1.8px

function BatterySymbol() {
  // Long line (positive) + short line (negative), repeated
  return (
    <g stroke="var(--text)" strokeWidth="1.8" fill="none">
      <line x1="-14" y1="-8" x2="-14" y2="8" />
      <line x1="-6"  y1="-5" x2="-6"  y2="5" />
      <line x1="2"   y1="-8" x2="2"   y2="8" />
      <line x1="10"  y1="-5" x2="10"  y2="5" />
      {/* terminals */}
      <line x1="-20" y1="0" x2="-14" y2="0" />
      <line x1="10"  y1="0" x2="16"  y2="0" />
      {/* + label */}
      <text x="-17" y="-12" fill="var(--cyan)" fontSize="9" fontFamily={font} stroke="none" textAnchor="middle">+</text>
    </g>
  );
}

function BulbSymbol() {
  // Circle with X inside
  return (
    <g stroke="var(--amber)" strokeWidth="1.8" fill="none">
      <circle cx="0" cy="0" r="10" />
      <line x1="-7" y1="-7" x2="7" y2="7" />
      <line x1="7"  y1="-7" x2="-7" y2="7" />
      {/* terminals */}
      <line x1="-16" y1="0" x2="-10" y2="0" />
      <line x1="10"  y1="0" x2="16"  y2="0" />
    </g>
  );
}

function SwitchSymbol() {
  // Open switch: two dots connected by angled line
  return (
    <g stroke="var(--text)" strokeWidth="1.8" fill="none">
      <circle cx="-12" cy="0" r="2" fill="var(--text)" />
      <circle cx="12"  cy="0" r="2" fill="var(--text)" />
      {/* lever at angle */}
      <line x1="-12" y1="0" x2="12" y2="-10" />
      {/* terminals */}
      <line x1="-20" y1="0" x2="-12" y2="0" />
      <line x1="12"  y1="0" x2="20"  y2="0" />
    </g>
  );
}

function AmmeterSymbol() {
  return (
    <g stroke="var(--cyan)" strokeWidth="1.8" fill="none">
      <circle cx="0" cy="0" r="11" />
      <text x="0" y="4" textAnchor="middle" fill="var(--cyan)" fontSize="11" fontFamily={font} fontWeight="700" stroke="none">A</text>
      <line x1="-17" y1="0" x2="-11" y2="0" />
      <line x1="11"  y1="0" x2="17"  y2="0" />
    </g>
  );
}

interface CurrentArrowProps { x1: number; y1: number; x2: number; y2: number; }
function CurrentArrow({ x1, y1, x2, y2 }: CurrentArrowProps) {
  return (
    <line
      x1={x1} y1={y1} x2={x2} y2={y2}
      stroke="var(--cyan)"
      strokeWidth="1.5"
      markerEnd="url(#sc-ah)"
      strokeDasharray="4,3"
      opacity="0.7"
    />
  );
}

export function SeriesCircuitDiagram() {
  // Rectangle circuit: corners at approx (80,40) (320,40) (320,180) (80,180)
  const L = 80, R = 320, T = 40, B = 180;

  return (
    <svg
      viewBox="0 0 400 230"
      width="100%"
      height="auto"
      aria-label="Series circuit diagram with battery, switch, bulb and ammeter"
      role="img"
      style={{ display: 'block' }}
    >
      <defs>
        <marker id="sc-ah" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
          <path d="M0,0 L0,6 L7,3 z" fill="var(--cyan)" />
        </marker>
      </defs>

      {/* Wires - the four sides of the rectangle */}
      {/* Top: battery is centred at (200, T) */}
      <line x1={L} y1={T} x2={R} y2={T} stroke="var(--text)" strokeWidth="2" />
      {/* Right: switch centred at (R, 110) */}
      <line x1={R} y1={T} x2={R} y2={B} stroke="var(--text)" strokeWidth="2" />
      {/* Bottom: bulb centred at (200, B) */}
      <line x1={L} y1={B} x2={R} y2={B} stroke="var(--text)" strokeWidth="2" />
      {/* Left: ammeter centred at (L, 110) */}
      <line x1={L} y1={T} x2={L} y2={B} stroke="var(--text)" strokeWidth="2" />

      {/* Components */}
      {/* Battery top-centre */}
      <g transform="translate(200,40) rotate(90)">
        <BatterySymbol />
      </g>

      {/* Switch right side, vertical */}
      <g transform="translate(320,110) rotate(90)">
        <SwitchSymbol />
      </g>

      {/* Bulb bottom-centre */}
      <g transform="translate(200,180)">
        <BulbSymbol />
      </g>

      {/* Ammeter left side, vertical */}
      <g transform="translate(80,110) rotate(90)">
        <AmmeterSymbol />
      </g>

      {/* Current direction arrows (dashed cyan) -- conventional current */}
      {/* Top: left to right */}
      <CurrentArrow x1={135} y1={T - 10} x2={165} y2={T - 10} />
      {/* Right: top to bottom */}
      <CurrentArrow x1={R + 10} y1={65} x2={R + 10} y2={95} />
      {/* Bottom: right to left */}
      <CurrentArrow x1={265} y1={B + 10} x2={235} y2={B + 10} />
      {/* Left: bottom to top */}
      <CurrentArrow x1={L - 10} y1={155} x2={L - 10} y2={125} />

      {/* Labels */}
      <text x="200" y="28" textAnchor="middle" fill="var(--text)" fontSize="10" fontFamily={font}>Battery</text>
      <text x="347" y="114" fill="var(--text)" fontSize="10" fontFamily={font}>Switch</text>
      <text x="200" y="205" textAnchor="middle" fill="var(--amber)" fontSize="10" fontFamily={font}>Bulb</text>
      <text x="20"  y="114" fill="var(--cyan)" fontSize="10" fontFamily={font}>A</text>

      {/* Key rule box */}
      <rect x="30" y="213" width="340" height="14" rx="4" fill="var(--bg3)" />
      <text x="200" y="223" textAnchor="middle" fill="var(--muted)" fontSize="9" fontFamily={font}>
        Series: same current everywhere, voltage shared between components
      </text>
    </svg>
  );
}
