const font = "'Bricolage Grotesque', sans-serif";

export function NewtonsThirdDiagram() {
  return (
    <svg
      viewBox="0 0 400 220"
      width="100%"
      height="auto"
      aria-label="Newton's Third Law: two objects with equal and opposite forces"
      role="img"
      style={{ display: 'block' }}
    >
      <defs>
        {/* Arrow pointing right */}
        <marker id="n3-ah-cyan-r" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill="var(--cyan)" />
        </marker>
        {/* Arrow pointing left */}
        <marker id="n3-ah-purple-l" markerWidth="8" markerHeight="8" refX="2" refY="3" orient="auto-start-reverse">
          <path d="M8,0 L8,6 L0,3 z" fill="var(--purple)" />
        </marker>
      </defs>

      {/* Person A - left box */}
      <rect x="20" y="60" width="80" height="60" rx="6" fill="var(--bg3)" stroke="var(--cyan)" strokeWidth="2" />
      <text x="60" y="88" textAnchor="middle" fill="var(--cyan)" fontSize="13" fontFamily={font} fontWeight="700">Person A</text>
      <text x="60" y="105" textAnchor="middle" fill="var(--muted)" fontSize="10" fontFamily={font}>(mass m)</text>

      {/* Wall / Object B - right box */}
      <rect x="300" y="60" width="80" height="60" rx="6" fill="var(--bg3)" stroke="var(--purple)" strokeWidth="2" />
      <text x="340" y="88" textAnchor="middle" fill="var(--purple)" fontSize="13" fontFamily={font} fontWeight="700">Wall B</text>
      <text x="340" y="105" textAnchor="middle" fill="var(--muted)" fontSize="10" fontFamily={font}>(fixed)</text>

      {/* Arrow: A pushes B (right, upper track) */}
      <line x1="105" y1="83" x2="295" y2="83" stroke="var(--cyan)" strokeWidth="2.5" markerEnd="url(#n3-ah-cyan-r)" />
      <text x="200" y="75" textAnchor="middle" fill="var(--cyan)" fontSize="11" fontFamily={font} fontWeight="600">
        Force of A on B
      </text>

      {/* Arrow: B pushes A (left, lower track) */}
      <line x1="295" y1="107" x2="105" y2="107" stroke="var(--purple)" strokeWidth="2.5" markerEnd="url(#n3-ah-purple-l)" />
      <text x="200" y="125" textAnchor="middle" fill="var(--purple)" fontSize="11" fontFamily={font} fontWeight="600">
        Force of B on A
      </text>

      {/* Both arrows same length label */}
      <text x="200" y="157" textAnchor="middle" fill="var(--text)" fontSize="11" fontFamily={font} fontWeight="700">
        Same size -- opposite directions -- DIFFERENT objects
      </text>

      {/* Sub-note */}
      <text x="200" y="175" textAnchor="middle" fill="var(--muted)" fontSize="10" fontFamily={font}>
        These forces do NOT cancel: they act on different bodies
      </text>

      {/* Bottom rule box */}
      <rect x="60" y="186" width="280" height="22" rx="5" fill="var(--cyan-dim)" stroke="var(--cyan)" strokeWidth="1" />
      <text x="200" y="201" textAnchor="middle" fill="var(--cyan)" fontSize="10.5" fontFamily={font} fontWeight="700">
        Equal and opposite forces on DIFFERENT objects
      </text>
    </svg>
  );
}
