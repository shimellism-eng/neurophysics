import { useState, useRef, useEffect } from 'react';
import { useSettings } from '../../context/SettingsContext';
import './HookesLawSim.css';

interface HookesLawSimProps {
  onComplete?: () => void;
}

const K          = 25;   // N/m spring constant
const MAX_FORCE  = 6;    // N
const LIMIT      = 5;    // N, limit of proportionality

// Spring SVG constants
const SPRING_TOP_Y   = 30;
const SPRING_REST_LEN = 80; // px at 0 N
const SPRING_MAX_LEN  = 160;

function springLength(force: number): number {
  // Extra stretch beyond rest length = F/k * scale
  const extension = (force / K) * 100; // pixels
  return Math.min(SPRING_MAX_LEN, SPRING_REST_LEN + extension);
}

/** Build a zigzag SVG path for the spring. */
function buildSpringPath(topY: number, bottomY: number, cx: number): string {
  const len = bottomY - topY;
  const coils = 8;
  const coilHeight = len / (coils + 2);
  const amplitude = 14;
  const pts: string[] = [`M ${cx} ${topY}`];
  // Short straight bit at top
  pts.push(`L ${cx} ${topY + coilHeight * 0.5}`);
  for (let i = 0; i < coils; i++) {
    const y0 = topY + coilHeight * (0.5 + i);
    const y1 = y0 + coilHeight * 0.5;
    const xOff = i % 2 === 0 ? amplitude : -amplitude;
    pts.push(`Q ${cx + xOff} ${(y0 + y1) / 2} ${cx} ${y1}`);
  }
  // Short straight bit at bottom
  pts.push(`L ${cx} ${bottomY}`);
  return pts.join(' ');
}

export default function HookesLawSim({ onComplete }: HookesLawSimProps) {
  const { settings } = useSettings();
  const animDisabled = settings.animations === 'none';

  const [force, setForce]     = useState(0);
  const [hadAdded, setHadAdded]   = useState(false);
  const [hadRemoved, setHadRemoved] = useState(false);
  const completeFired = useRef(false);

  const extension = parseFloat((force / K).toFixed(3));
  const exceeded  = force > LIMIT;

  // Graph data: 0..MAX_FORCE
  const graphPoints: { f: number; x: number }[] = [];
  for (let f = 0; f <= MAX_FORCE; f++) {
    graphPoints.push({ f, x: f / K });
  }

  useEffect(() => {
    if (hadAdded && hadRemoved && !completeFired.current) {
      completeFired.current = true;
      onComplete?.();
    }
  }, [hadAdded, hadRemoved, onComplete]);

  const addWeight = () => {
    setForce(prev => {
      const next = Math.min(MAX_FORCE, prev + 1);
      if (next > 0) setHadAdded(true);
      return next;
    });
  };

  const removeWeight = () => {
    setForce(prev => {
      const next = Math.max(0, prev - 1);
      if (next < force) setHadRemoved(true);
      return next;
    });
  };

  // Spring visual
  const springBottomY = SPRING_TOP_Y + springLength(force);
  const cx = 90;
  const svgH = 260;

  // Graph dimensions (SVG coords within a 200x180 area)
  const gX0 = 30, gY0 = 10, gW = 160, gH = 140;
  const xScale = gW / (MAX_FORCE / K); // px per metre of extension
  const yScale = gH / MAX_FORCE;       // px per N of force

  // Plot points so far (0..force)
  const plotPts = graphPoints.filter(p => p.f <= force);
  const polyline = plotPts.map(p => {
    const px = gX0 + p.x * xScale;
    const py = gY0 + gH - p.f * yScale;
    return `${px.toFixed(1)},${py.toFixed(1)}`;
  }).join(' ');

  // Limit of proportionality line position
  const limitX = gX0 + (LIMIT / K) * xScale;
  const limitY = gY0 + gH - LIMIT * yScale;

  return (
    <div className="hookes-sim">
      <p className="hookes-sim__explanation">
        Tap to add weights. Notice the extension is proportional to force - that's
        Hooke's Law! See what happens when you go too far...
      </p>

      <div className="hookes-sim__main">
        {/* Spring + ruler column */}
        <div className="hookes-sim__spring-col">
          <svg
            viewBox={`0 0 180 ${svgH}`}
            className="hookes-sim__spring-svg"
            aria-label="Spring with weights"
          >
            {/* Fixed support */}
            <rect x={60} y={10} width={60} height={10} rx={3} className="hookes-sim__support" />
            <line x1={cx} y1={20} x2={cx} y2={SPRING_TOP_Y} className="hookes-sim__wire-top" />

            {/* Spring */}
            <path
              d={buildSpringPath(SPRING_TOP_Y, springBottomY, cx)}
              className={`hookes-sim__spring ${exceeded ? 'hookes-sim__spring--exceeded' : ''}`}
              style={!animDisabled ? { transition: 'd 0.3s ease' } : {}}
            />

            {/* Weight block */}
            {force > 0 && (
              <g
                transform={`translate(${cx - 28}, ${springBottomY})`}
                style={!animDisabled ? { transition: 'transform 0.3s ease' } : {}}
              >
                <rect x={0} y={0} width={56} height={32} rx={4} className="hookes-sim__weight" />
                <text x={28} y={14} className="hookes-sim__weight-label" textAnchor="middle">{force} N</text>
                <text x={28} y={26} className="hookes-sim__weight-label2" textAnchor="middle">
                  {force === 1 ? '1 weight' : `${force} weights`}
                </text>
              </g>
            )}

            {/* Ruler */}
            <line
              x1={cx + 36} y1={SPRING_TOP_Y}
              x2={cx + 36} y2={svgH - 20}
              className="hookes-sim__ruler"
            />
            {/* Ruler ticks */}
            {Array.from({ length: MAX_FORCE + 1 }, (_, i) => {
              const tickY = SPRING_TOP_Y + (i / MAX_FORCE) * (svgH - 60);
              return (
                <g key={i}>
                  <line x1={cx + 32} y1={tickY} x2={cx + 40} y2={tickY} className="hookes-sim__ruler-tick" />
                  <text x={cx + 44} y={tickY + 4} className="hookes-sim__ruler-label">
                    {((i / MAX_FORCE) * (MAX_FORCE / K) * 100).toFixed(0)} cm
                  </text>
                </g>
              );
            })}

            {/* Extension arrow */}
            {force > 0 && (
              <g>
                <line
                  x1={cx - 36} y1={SPRING_TOP_Y}
                  x2={cx - 36} y2={springBottomY}
                  className="hookes-sim__ext-arrow"
                />
                <polygon
                  points={`${cx - 40},${springBottomY} ${cx - 32},${springBottomY} ${cx - 36},${springBottomY + 7}`}
                  className="hookes-sim__ext-arrowhead"
                />
                <text
                  x={cx - 50}
                  y={(SPRING_TOP_Y + springBottomY) / 2}
                  className="hookes-sim__ext-label"
                  textAnchor="middle"
                  transform={`rotate(-90, ${cx - 50}, ${(SPRING_TOP_Y + springBottomY) / 2})`}
                >
                  x = {(extension * 100).toFixed(1)} cm
                </text>
              </g>
            )}
          </svg>
        </div>

        {/* Graph column */}
        <div className="hookes-sim__graph-col">
          <p className="hookes-sim__graph-title">Force-extension graph</p>
          <svg
            viewBox={`0 0 200 170`}
            className="hookes-sim__graph-svg"
            aria-label="Force extension graph"
          >
            {/* Axes */}
            <line x1={gX0} y1={gY0} x2={gX0} y2={gY0 + gH} className="hookes-sim__axis" />
            <line x1={gX0} y1={gY0 + gH} x2={gX0 + gW} y2={gY0 + gH} className="hookes-sim__axis" />

            {/* Axis labels */}
            <text x={gX0 + gW / 2} y={gY0 + gH + 18} className="hookes-sim__axis-label" textAnchor="middle">
              Extension (m)
            </text>
            <text
              x={10}
              y={gY0 + gH / 2}
              className="hookes-sim__axis-label"
              textAnchor="middle"
              transform={`rotate(-90, 10, ${gY0 + gH / 2})`}
            >
              Force (N)
            </text>

            {/* Grid lines */}
            {graphPoints.map(p => {
              const px = gX0 + p.x * xScale;
              const py = gY0 + gH - p.f * yScale;
              return p.f > 0 ? (
                <g key={p.f}>
                  <line x1={gX0} y1={py} x2={gX0 + gW} y2={py} className="hookes-sim__grid" />
                  <text x={gX0 - 4} y={py + 4} className="hookes-sim__tick-label" textAnchor="end">{p.f}</text>
                  <line x1={px} y1={gY0 + gH} x2={px} y2={gY0} className="hookes-sim__grid" />
                </g>
              ) : null;
            })}

            {/* Limit of proportionality vertical line */}
            <line
              x1={limitX} y1={gY0 + gH}
              x2={limitX} y2={limitY}
              className="hookes-sim__limit-line"
              strokeDasharray="4 3"
            />

            {/* Plotted line */}
            {plotPts.length > 1 && (
              <polyline
                points={polyline}
                className={`hookes-sim__plot ${exceeded ? 'hookes-sim__plot--exceeded' : ''}`}
              />
            )}

            {/* Current point dot */}
            {force > 0 && (
              <circle
                cx={gX0 + extension * xScale}
                cy={gY0 + gH - force * yScale}
                r={5}
                className={`hookes-sim__plot-dot ${exceeded ? 'hookes-sim__plot-dot--exceeded' : ''}`}
              />
            )}

            {/* Limit label */}
            <text x={limitX + 2} y={gY0 + gH - LIMIT * yScale - 4} className="hookes-sim__limit-label">
              Limit
            </text>
          </svg>
        </div>
      </div>

      {/* Warning */}
      {exceeded && (
        <div className="hookes-sim__warning" role="alert">
          Limit of proportionality exceeded! The spring no longer obeys Hooke's Law
          - the extension is no longer proportional to the force.
        </div>
      )}

      {/* Buttons */}
      <div className="hookes-sim__btn-row">
        <button
          className="hookes-sim__add-btn"
          onClick={addWeight}
          disabled={force >= MAX_FORCE}
          aria-label={`Add 1 N weight, current force ${force} N`}
        >
          + Add 1 N weight
        </button>
        <button
          className="hookes-sim__remove-btn"
          onClick={removeWeight}
          disabled={force <= 0}
          aria-label={`Remove weight, current force ${force} N`}
        >
          - Remove weight
        </button>
      </div>

      {/* Readouts */}
      <div className="hookes-sim__readouts">
        <div className="hookes-sim__readout hookes-sim__readout--purple">
          <span className="hookes-sim__readout-label">Force applied</span>
          <span className="hookes-sim__readout-value">{force} N</span>
        </div>
        <div className="hookes-sim__readout hookes-sim__readout--cyan">
          <span className="hookes-sim__readout-label">Extension</span>
          <span className="hookes-sim__readout-value">{(extension * 100).toFixed(1)} cm</span>
        </div>
        <div className="hookes-sim__readout hookes-sim__readout--amber">
          <span className="hookes-sim__readout-label">Spring constant</span>
          <span className="hookes-sim__readout-value">k = {K} N/m</span>
        </div>
      </div>

      {/* Live equation */}
      <div className="hookes-sim__equation">
        <span className="hookes-sim__eq-purple">F</span>
        <span className="hookes-sim__eq-op">=</span>
        <span className="hookes-sim__eq-amber">k</span>
        <span className="hookes-sim__eq-op">&times;</span>
        <span className="hookes-sim__eq-cyan">x</span>
        <span className="hookes-sim__eq-sep" />
        <span className="hookes-sim__eq-values">
          <span className="hookes-sim__eq-purple">{force}</span>
          {' = '}
          <span className="hookes-sim__eq-amber">{K}</span>
          {' \u00d7 '}
          <span className="hookes-sim__eq-cyan">{extension}</span>
        </span>
      </div>
    </div>
  );
}
