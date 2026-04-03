/**
 * SVG diagram for RP3: Resistance of a Wire
 * Shows constantan wire on a metre ruler with crocodile clips,
 * ammeter in series, voltmeter in parallel, and power supply.
 */
export function ResistanceWireDiagram() {
  return (
    <svg
      viewBox="0 0 520 300"
      width="100%"
      aria-label="Resistance of a wire apparatus: constantan wire on ruler with crocodile clips, ammeter in series, voltmeter in parallel, and power supply"
      role="img"
      style={{ display: 'block', maxWidth: '520px', margin: '0 auto' }}
    >
      <rect width="520" height="300" fill="var(--bg2)" rx="10" />

      {/* === METRE RULER === */}
      <rect x="50" y="148" width="380" height="18" rx="3"
        fill="var(--bg4)" stroke="var(--muted)" strokeWidth="1.5" />
      {/* Ruler markings */}
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => (
        <g key={i}>
          <line
            x1={50 + i * 38} y1="148"
            x2={50 + i * 38} y2={i % 5 === 0 ? 141 : 144}
            stroke="var(--muted)" strokeWidth="1"
          />
          {i % 2 === 0 && (
            <text
              x={50 + i * 38} y="138"
              textAnchor="middle" fill="var(--muted)"
              fontSize="9" fontFamily="sans-serif"
            >
              {i * 10}
            </text>
          )}
        </g>
      ))}
      <text x="240" y="135" textAnchor="middle" fill="var(--muted)" fontSize="8" fontFamily="sans-serif">cm</text>

      {/* === CONSTANTAN WIRE === */}
      <line x1="50" y1="157" x2="430" y2="157"
        stroke="var(--amber)" strokeWidth="2.5" />
      <text x="240" y="178" textAnchor="middle" fill="var(--amber)" fontSize="10" fontFamily="sans-serif">
        Constantan wire
      </text>

      {/* === FIXED CROCODILE CLIP (0 cm) === */}
      <polygon points="50,150 62,144 62,164 50,158" fill="var(--cyan)" />
      <text x="50" y="200" textAnchor="middle" fill="var(--cyan)" fontSize="9" fontFamily="sans-serif">
        Clip A
      </text>
      <text x="50" y="210" textAnchor="middle" fill="var(--muted)" fontSize="9" fontFamily="sans-serif">
        (fixed 0 cm)
      </text>

      {/* === MOVEABLE CROCODILE CLIP (e.g. 60 cm) === */}
      <polygon points="278,150 266,144 266,164 278,158" fill="var(--pink)" />
      <text x="272" y="200" textAnchor="middle" fill="var(--pink)" fontSize="9" fontFamily="sans-serif">
        Clip B
      </text>
      <text x="272" y="210" textAnchor="middle" fill="var(--muted)" fontSize="9" fontFamily="sans-serif">
        (moveable)
      </text>
      {/* Arrow showing clip B can move */}
      <line x1="240" y1="220" x2="310" y2="220" stroke="var(--muted)" strokeWidth="1" markerEnd="url(#arrowR)" />
      <defs>
        <marker id="arrowR" markerWidth="6" markerHeight="6" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="var(--muted)" />
        </marker>
      </defs>

      {/* === CIRCUIT WIRES === */}
      {/* From clip A upward to switch / ammeter / power supply */}
      <line x1="50" y1="148" x2="50" y2="70" stroke="var(--text)" strokeWidth="1.5" />
      <line x1="50" y1="70" x2="160" y2="70" stroke="var(--text)" strokeWidth="1.5" />

      {/* Switch */}
      <rect x="160" y="58" width="40" height="24" rx="4"
        fill="var(--bg3)" stroke="var(--muted)" strokeWidth="1.5" />
      <text x="180" y="74" textAnchor="middle" fill="var(--muted)" fontSize="10" fontFamily="sans-serif">SW</text>
      <line x1="200" y1="70" x2="250" y2="70" stroke="var(--text)" strokeWidth="1.5" />

      {/* Ammeter */}
      <circle cx="275" cy="70" r="20" fill="var(--bg3)" stroke="var(--green)" strokeWidth="2" />
      <text x="275" y="67" textAnchor="middle" fill="var(--green)" fontSize="13" fontWeight="bold" fontFamily="sans-serif">A</text>
      <text x="275" y="79" textAnchor="middle" fill="var(--muted)" fontSize="8" fontFamily="sans-serif">series</text>

      <line x1="295" y1="70" x2="400" y2="70" stroke="var(--text)" strokeWidth="1.5" />
      {/* Power supply */}
      <rect x="400" y="50" width="60" height="40" rx="6"
        fill="var(--bg4)" stroke="var(--purple)" strokeWidth="2" />
      <text x="430" y="68" textAnchor="middle" fill="var(--purple)" fontSize="9" fontWeight="bold" fontFamily="sans-serif">Power</text>
      <text x="430" y="80" textAnchor="middle" fill="var(--purple)" fontSize="9" fontFamily="sans-serif">supply</text>

      {/* Return from power supply down to clip B */}
      <line x1="430" y1="90" x2="430" y2="148" stroke="var(--text)" strokeWidth="1.5" />
      <line x1="430" y1="148" x2="278" y2="148" stroke="var(--text)" strokeWidth="1.5" />

      {/* === VOLTMETER (parallel across the wire section) === */}
      {/* Top tap from fixed clip wire */}
      <line x1="100" y1="70" x2="100" y2="245" stroke="var(--text)" strokeWidth="1.5" />
      {/* Bottom tap from moveable clip */}
      <line x1="272" y1="148" x2="272" y2="245" stroke="var(--text)" strokeWidth="1.5" />
      <line x1="100" y1="245" x2="186" y2="245" stroke="var(--text)" strokeWidth="1.5" />
      <line x1="226" y1="245" x2="272" y2="245" stroke="var(--text)" strokeWidth="1.5" />
      {/* Voltmeter */}
      <circle cx="206" cy="255" r="20" fill="var(--bg3)" stroke="var(--blue)" strokeWidth="2" />
      <text x="206" y="252" textAnchor="middle" fill="var(--blue)" fontSize="13" fontWeight="bold" fontFamily="sans-serif">V</text>
      <text x="206" y="264" textAnchor="middle" fill="var(--muted)" fontSize="8" fontFamily="sans-serif">parallel</text>

      {/* Brace for measured length */}
      <line x1="50" y1="168" x2="272" y2="168" stroke="var(--cyan)" strokeWidth="1" strokeDasharray="4,3" />
      <line x1="50" y1="164" x2="50" y2="172" stroke="var(--cyan)" strokeWidth="1" />
      <line x1="272" y1="164" x2="272" y2="172" stroke="var(--cyan)" strokeWidth="1" />
      <text x="161" y="184" textAnchor="middle" fill="var(--cyan)" fontSize="9" fontFamily="sans-serif">
        Length L (variable)
      </text>

      {/* Caption */}
      <text x="10" y="292" fill="var(--muted)" fontSize="9.5" fontFamily="sans-serif">
        Move clip B to change length. Switch off between readings to prevent overheating.
      </text>
    </svg>
  );
}
