const font = "'Bricolage Grotesque', sans-serif";

// Build a sine wave path for two full cycles
function sineWavePath(
  startX: number,
  startY: number,
  cycles: number,
  cycleWidth: number,
  amplitude: number
): string {
  const steps = cycles * 100;
  const totalWidth = cycles * cycleWidth;
  let d = `M ${startX} ${startY}`;
  for (let i = 1; i <= steps; i++) {
    const t = i / steps;
    const x = startX + t * totalWidth;
    const y = startY - Math.sin(t * cycles * 2 * Math.PI) * amplitude;
    d += ` L ${x} ${y.toFixed(2)}`;
  }
  return d;
}

export function WaveDiagram() {
  // Layout constants
  const ox = 30;   // left margin
  const oy = 120;  // equilibrium y
  const cycleW = 160;
  const amp = 48;
  const cycles = 2;

  // Key x positions
  const waveEnd = ox + cycles * cycleW;  // 350

  // Crest: quarter cycle in
  const crest1X = ox + cycleW * 0.25;
  const crest1Y = oy - amp;

  // Trough: 3/4 cycle in
  const trough1X = ox + cycleW * 0.75;
  const trough1Y = oy + amp;

  // Wavelength bracket: from crest1 to crest of second cycle
  const crest2X = ox + cycleW * 1.25;

  return (
    <svg
      viewBox="0 0 400 240"
      width="100%"
      height="auto"
      aria-label="Wave diagram showing amplitude, wavelength, crest and trough"
      role="img"
      style={{ display: 'block' }}
    >
      <defs>
        {/* Cyan double-headed arrowhead (right) */}
        <marker id="w-ah-r" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill="var(--cyan)" />
        </marker>
        {/* Cyan arrowhead left */}
        <marker id="w-ah-l" markerWidth="8" markerHeight="8" refX="2" refY="3" orient="auto-start-reverse">
          <path d="M8,0 L8,6 L0,3 z" fill="var(--cyan)" />
        </marker>
        {/* Purple double-headed: up */}
        <marker id="w-ah-u" markerWidth="8" markerHeight="8" refX="3" refY="2" orient="270">
          <path d="M0,0 L6,0 L3,8 z" fill="var(--purple)" />
        </marker>
        {/* Purple: down */}
        <marker id="w-ah-d" markerWidth="8" markerHeight="8" refX="3" refY="6" orient="90">
          <path d="M0,8 L6,8 L3,0 z" fill="var(--purple)" />
        </marker>
        {/* Amber arrowhead right */}
        <marker id="w-ah-amber-r" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill="var(--amber)" />
        </marker>
      </defs>

      {/* Equilibrium line (dashed) */}
      <line
        x1={ox} y1={oy} x2={waveEnd} y2={oy}
        stroke="var(--muted)"
        strokeWidth="1"
        strokeDasharray="6,4"
      />
      <text x={waveEnd + 4} y={oy + 4} fill="var(--muted)" fontSize="9" fontFamily={font}>rest</text>

      {/* Sine wave */}
      <path
        d={sineWavePath(ox, oy, cycles, cycleW, amp)}
        fill="none"
        stroke="var(--text)"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />

      {/* Crest label */}
      <text x={crest1X} y={crest1Y - 8} textAnchor="middle" fill="var(--text)" fontSize="10" fontFamily={font} fontWeight="600">
        Crest
      </text>

      {/* Trough label */}
      <text x={trough1X} y={trough1Y + 16} textAnchor="middle" fill="var(--text)" fontSize="10" fontFamily={font} fontWeight="600">
        Trough
      </text>

      {/* Amplitude bracket: from equilibrium down to trough */}
      {/* Vertical line at trough1X */}
      <line
        x1={trough1X - 22} y1={oy}
        x2={trough1X - 22} y2={trough1Y}
        stroke="var(--purple)"
        strokeWidth="1.8"
        markerEnd="url(#w-ah-d)"
        markerStart="url(#w-ah-u)"
      />
      <text
        x={trough1X - 30} y={(oy + trough1Y) / 2 + 4}
        textAnchor="end"
        fill="var(--purple)"
        fontSize="11"
        fontFamily={font}
        fontWeight="700"
      >
        A
      </text>
      <text
        x={trough1X - 30} y={(oy + trough1Y) / 2 + 16}
        textAnchor="end"
        fill="var(--purple)"
        fontSize="9"
        fontFamily={font}
      >
        amplitude
      </text>

      {/* Wavelength bracket: crest1 to crest2, above wave */}
      <line
        x1={crest1X} y1={crest1Y - 22}
        x2={crest2X} y2={crest1Y - 22}
        stroke="var(--cyan)"
        strokeWidth="1.8"
        markerStart="url(#w-ah-l)"
        markerEnd="url(#w-ah-r)"
      />
      {/* tick down from bracket to crest1 */}
      <line x1={crest1X} y1={crest1Y - 22} x2={crest1X} y2={crest1Y - 4} stroke="var(--cyan)" strokeWidth="1" />
      <line x1={crest2X} y1={crest1Y - 22} x2={crest2X} y2={crest1Y - 4} stroke="var(--cyan)" strokeWidth="1" />
      <text
        x={(crest1X + crest2X) / 2} y={crest1Y - 27}
        textAnchor="middle"
        fill="var(--cyan)"
        fontSize="13"
        fontFamily={font}
        fontWeight="700"
      >
        {'\u03bb'}
      </text>
      <text
        x={(crest1X + crest2X) / 2} y={crest1Y - 14}
        textAnchor="middle"
        fill="var(--cyan)"
        fontSize="9"
        fontFamily={font}
      >
        wavelength
      </text>

      {/* Direction of travel arrow */}
      <line
        x1={waveEnd - 50} y1={oy + 30}
        x2={waveEnd} y2={oy + 30}
        stroke="var(--amber)"
        strokeWidth="2"
        markerEnd="url(#w-ah-amber-r)"
      />
      <text x={waveEnd - 25} y={oy + 44} textAnchor="middle" fill="var(--amber)" fontSize="9.5" fontFamily={font} fontWeight="600">
        direction of travel
      </text>

      {/* Caption */}
      <text x={200} y={228} textAnchor="middle" fill="var(--muted)" fontSize="10" fontFamily={font}>
        Amplitude (A) is measured from rest position to crest or trough
      </text>
    </svg>
  );
}
