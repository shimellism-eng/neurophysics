const font = "'Bricolage Grotesque', sans-serif";

function BatterySymbol() {
  return (
    <g stroke="var(--text)" strokeWidth="1.8" fill="none">
      <line x1="-14" y1="-8" x2="-14" y2="8" />
      <line x1="-6"  y1="-5" x2="-6"  y2="5" />
      <line x1="2"   y1="-8" x2="2"   y2="8" />
      <line x1="10"  y1="-5" x2="10"  y2="5" />
      <line x1="-20" y1="0" x2="-14" y2="0" />
      <line x1="10"  y1="0" x2="16"  y2="0" />
      <text x="-17" y="-12" fill="var(--cyan)" fontSize="9" fontFamily={font} stroke="none" textAnchor="middle">+</text>
    </g>
  );
}

function BulbSymbol({ color = 'var(--amber)' }: { color?: string }) {
  return (
    <g stroke={color} strokeWidth="1.8" fill="none">
      <circle cx="0" cy="0" r="10" />
      <line x1="-7" y1="-7" x2="7" y2="7" />
      <line x1="7"  y1="-7" x2="-7" y2="7" />
      <line x1="-16" y1="0" x2="-10" y2="0" />
      <line x1="10"  y1="0" x2="16"  y2="0" />
    </g>
  );
}

interface ArrowProps { x1: number; y1: number; x2: number; y2: number; color?: string; }
function CurrentArrow({ x1, y1, x2, y2, color = 'var(--cyan)' }: ArrowProps) {
  return (
    <line
      x1={x1} y1={y1} x2={x2} y2={y2}
      stroke={color}
      strokeWidth="1.5"
      markerEnd="url(#pc-ah)"
      strokeDasharray="4,3"
      opacity="0.75"
    />
  );
}

export function ParallelCircuitDiagram() {
  // Outer loop: L=60, R=340, T=40, B=200
  // Branch junction: left junction at x=140, right at x=260
  // Top branch: y=90, Bottom branch: y=150

  const L = 60, R = 340, T = 40, B = 200;
  const jL = 140, jR = 260;
  const branchTop = 95, branchBot = 155;
  const midY = (branchTop + branchBot) / 2;

  return (
    <svg
      viewBox="0 0 400 240"
      width="100%"
      height="auto"
      aria-label="Parallel circuit diagram with battery and two bulb branches"
      role="img"
      style={{ display: 'block' }}
    >
      <defs>
        <marker id="pc-ah" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
          <path d="M0,0 L0,6 L7,3 z" fill="var(--cyan)" />
        </marker>
        <marker id="pc-ah-a" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
          <path d="M0,0 L0,6 L7,3 z" fill="var(--amber)" />
        </marker>
      </defs>

      {/* Outer wires */}
      {/* Top wire: L to R */}
      <line x1={L} y1={T} x2={R} y2={T} stroke="var(--text)" strokeWidth="2" />
      {/* Right outer: T to B */}
      <line x1={R} y1={T} x2={R} y2={B} stroke="var(--text)" strokeWidth="2" />
      {/* Bottom wire: L to R */}
      <line x1={L} y1={B} x2={R} y2={B} stroke="var(--text)" strokeWidth="2" />
      {/* Left outer: T to B */}
      <line x1={L} y1={T} x2={L} y2={B} stroke="var(--text)" strokeWidth="2" />

      {/* Branch wires left side: junction at (jL, T) to (jL, B) */}
      <line x1={jL} y1={T} x2={jL} y2={branchTop}    stroke="var(--text)" strokeWidth="2" />
      <line x1={jL} y1={branchTop} x2={jL} y2={branchBot} stroke="var(--text)" strokeWidth="2" />
      <line x1={jL} y1={branchBot} x2={jL} y2={B}    stroke="var(--text)" strokeWidth="2" />

      {/* Branch wires right side: junction at (jR, T) to (jR, B) */}
      <line x1={jR} y1={T} x2={jR} y2={branchTop}    stroke="var(--text)" strokeWidth="2" />
      <line x1={jR} y1={branchTop} x2={jR} y2={branchBot} stroke="var(--text)" strokeWidth="2" />
      <line x1={jR} y1={branchBot} x2={jR} y2={B}    stroke="var(--text)" strokeWidth="2" />

      {/* Top branch horizontal wires for bulb 1 */}
      <line x1={jL} y1={branchTop} x2={185} y2={branchTop} stroke="var(--text)" strokeWidth="2" />
      <line x1={215} y1={branchTop} x2={jR} y2={branchTop} stroke="var(--text)" strokeWidth="2" />

      {/* Bottom branch horizontal wires for bulb 2 */}
      <line x1={jL} y1={branchBot} x2={185} y2={branchBot} stroke="var(--text)" strokeWidth="2" />
      <line x1={215} y1={branchBot} x2={jR} y2={branchBot} stroke="var(--text)" strokeWidth="2" />

      {/* Battery on left outer wire, centred */}
      <g transform={`translate(${L},${midY}) rotate(90)`}>
        <BatterySymbol />
      </g>

      {/* Bulb 1 (top branch) */}
      <g transform={`translate(200,${branchTop})`}>
        <BulbSymbol color="var(--cyan)" />
      </g>

      {/* Bulb 2 (bottom branch) */}
      <g transform={`translate(200,${branchBot})`}>
        <BulbSymbol color="var(--amber)" />
      </g>

      {/* Junction dots */}
      <circle cx={jL} cy={T} r="4" fill="var(--text)" />
      <circle cx={jR} cy={T} r="4" fill="var(--text)" />
      <circle cx={jL} cy={B} r="4" fill="var(--text)" />
      <circle cx={jR} cy={B} r="4" fill="var(--text)" />

      {/* Current arrows: main loop top */}
      <CurrentArrow x1={80}  y1={T - 10} x2={110} y2={T - 10} />
      {/* splits into 2 */}
      <line
        x1={jL + 6} y1={branchTop - 6}
        x2={jL + 20} y2={branchTop - 6}
        stroke="var(--cyan)" strokeWidth="1.5" strokeDasharray="4,3" opacity="0.7"
        markerEnd="url(#pc-ah)"
      />
      <line
        x1={jL + 6} y1={branchBot + 6}
        x2={jL + 20} y2={branchBot + 6}
        stroke="var(--cyan)" strokeWidth="1.5" strokeDasharray="4,3" opacity="0.7"
        markerEnd="url(#pc-ah)"
      />
      {/* rejoins and goes right to bottom */}
      <CurrentArrow x1={R + 10} y1={70}  x2={R + 10} y2={100} />
      {/* bottom right to left */}
      <CurrentArrow x1={260} y1={B + 10} x2={230} y2={B + 10} />
      {/* up left back to battery */}
      <CurrentArrow x1={L - 10} y1={175} x2={L - 10} y2={140} />

      {/* Labels */}
      <text x="30"   y={midY + 4} fill="var(--text)" fontSize="9.5" fontFamily={font} textAnchor="middle">Bat.</text>
      <text x="200"  y={branchTop - 18} textAnchor="middle" fill="var(--cyan)"  fontSize="10" fontFamily={font}>Bulb 1</text>
      <text x="200"  y={branchBot + 24} textAnchor="middle" fill="var(--amber)" fontSize="10" fontFamily={font}>Bulb 2</text>

      {/* Voltage label for each branch */}
      <text x="356" y={branchTop + 4} fill="var(--purple)" fontSize="9" fontFamily={font}>V</text>
      <text x="356" y={branchBot + 4} fill="var(--purple)" fontSize="9" fontFamily={font}>V</text>
      <text x="370" y={(branchTop + branchBot) / 2 + 4} fill="var(--purple)" fontSize="8.5" fontFamily={font} textAnchor="start">same</text>

      {/* Key rule box */}
      <rect x="20" y="215" width="360" height="20" rx="4" fill="var(--bg3)" />
      <text x="200" y="228" textAnchor="middle" fill="var(--muted)" fontSize="9" fontFamily={font}>
        Parallel: same voltage across each branch, current splits at junctions
      </text>
    </svg>
  );
}
