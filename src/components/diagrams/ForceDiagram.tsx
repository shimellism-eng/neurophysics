interface ForceDiagramProps {
  type: 'balanced' | 'unbalanced' | 'weight-only';
}

const font = "'Bricolage Grotesque', sans-serif";

// Arrowhead marker defs — one per colour
function Defs() {
  return (
    <defs>
      {/* cyan */}
      <marker id="ah-cyan" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
        <path d="M0,0 L0,6 L8,3 z" fill="var(--cyan)" />
      </marker>
      {/* purple */}
      <marker id="ah-purple" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
        <path d="M0,0 L0,6 L8,3 z" fill="var(--purple)" />
      </marker>
      {/* amber */}
      <marker id="ah-amber" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
        <path d="M0,0 L0,6 L8,3 z" fill="var(--amber)" />
      </marker>
    </defs>
  );
}

interface ArrowProps {
  x1: number; y1: number;
  x2: number; y2: number;
  color: 'cyan' | 'purple' | 'amber';
  label: string;
  labelX: number;
  labelY: number;
  textAnchor?: string;
}

function Arrow({ x1, y1, x2, y2, color, label, labelX, labelY, textAnchor = 'middle' }: ArrowProps) {
  return (
    <>
      <line
        x1={x1} y1={y1} x2={x2} y2={y2}
        stroke={`var(--${color})`}
        strokeWidth="2.5"
        markerEnd={`url(#ah-${color})`}
      />
      <text
        x={labelX} y={labelY}
        fill={`var(--${color})`}
        fontSize="11"
        fontFamily={font}
        fontWeight="600"
        textAnchor={textAnchor}
      >
        {label}
      </text>
    </>
  );
}

export function ForceDiagram({ type }: ForceDiagramProps) {
  // Box centred at (200, 120) in a 400x230 viewBox
  const cx = 200;
  const cy = 120;
  const bw = 60;
  const bh = 50;

  // Arrow lengths
  const weightLen = 65;
  const normalLen = type === 'balanced' ? 65 : 65;
  const frictionLen = 55;
  const appliedLen = type === 'unbalanced' ? 85 : 55;

  return (
    <svg
      viewBox="0 0 400 230"
      width="100%"
      height="auto"
      aria-label="Force diagram"
      role="img"
      style={{ display: 'block' }}
    >
      <Defs />

      {/* Object box */}
      <rect
        x={cx - bw / 2} y={cy - bh / 2}
        width={bw} height={bh}
        rx="4"
        fill="var(--bg3)"
        stroke="var(--muted)"
        strokeWidth="1.5"
      />
      <text x={cx} y={cy + 5} textAnchor="middle" fill="var(--text)" fontSize="12" fontFamily={font} fontWeight="600">
        object
      </text>

      {/* Weight (down, purple) */}
      <Arrow
        x1={cx} y1={cy + bh / 2}
        x2={cx} y2={cy + bh / 2 + weightLen}
        color="purple"
        label="Weight (W)"
        labelX={cx + 6} labelY={cy + bh / 2 + weightLen / 2 + 5}
        textAnchor="start"
      />

      {/* Normal reaction (up, cyan) */}
      <Arrow
        x1={cx} y1={cy - bh / 2}
        x2={cx} y2={cy - bh / 2 - normalLen}
        color="cyan"
        label="Normal (N)"
        labelX={cx + 6} labelY={cy - bh / 2 - normalLen / 2}
        textAnchor="start"
      />

      {/* Friction (left, amber) - hidden for weight-only */}
      {type !== 'weight-only' && (
        <Arrow
          x1={cx - bw / 2} y1={cy}
          x2={cx - bw / 2 - frictionLen} y2={cy}
          color="amber"
          label="Friction"
          labelX={cx - bw / 2 - frictionLen / 2} labelY={cy - 10}
          textAnchor="middle"
        />
      )}

      {/* Applied force (right, cyan) - hidden for weight-only */}
      {type !== 'weight-only' && (
        <Arrow
          x1={cx + bw / 2} y1={cy}
          x2={cx + bw / 2 + appliedLen} y2={cy}
          color="cyan"
          label={type === 'unbalanced' ? 'Applied (larger)' : 'Applied (F)'}
          labelX={cx + bw / 2 + appliedLen / 2} labelY={cy - 10}
          textAnchor="middle"
        />
      )}

      {/* Caption */}
      <text
        x={cx} y={218}
        textAnchor="middle"
        fill="var(--muted)"
        fontSize="10"
        fontFamily={font}
      >
        {type === 'balanced' && 'Balanced forces: resultant = 0 N, motion unchanged'}
        {type === 'unbalanced' && 'Unbalanced forces: net force to the right, object accelerates'}
        {type === 'weight-only' && 'Weight and normal reaction: equal and opposite when stationary'}
      </text>
    </svg>
  );
}
