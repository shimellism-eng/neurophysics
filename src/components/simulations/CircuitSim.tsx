import { useState, useRef, useEffect, useCallback } from 'react';
import { useSettings } from '../../context/SettingsContext';
import './CircuitSim.css';

interface CircuitSimProps {
  onComplete?: () => void;
}

const RESISTANCE = 10; // ohms, fixed bulb resistance
const VOLTAGES   = [3, 6, 9, 12];

// Circuit path: a closed rectangular loop
// Corners (as % of canvas): TL(10,15) TR(90,15) BR(90,85) BL(10,85)
// Wire segments as fraction along total perimeter:
//   top: 0.0 -> 0.25
//   right: 0.25 -> 0.50
//   bottom: 0.50 -> 0.75
//   left: 0.75 -> 1.0

const CX = { tl: 50, tr: 310, br: 310, bl: 50 };
const CY = { tl: 30,  tr: 30,  br: 170, bl: 170 };
const W  = CX.tr - CX.tl; // 260
const H  = CY.bl - CY.tl; // 140
const PERIMETER = 2 * W + 2 * H; // 800

/** Convert a fraction (0-1) of perimeter to {x, y} in the SVG coord space. */
function perimToXY(t: number): { x: number; y: number } {
  const d = ((t % 1) + 1) % 1 * PERIMETER; // always positive
  // top edge: left -> right
  if (d < W) return { x: CX.tl + d, y: CY.tl };
  // right edge: top -> bottom
  if (d < W + H) return { x: CX.tr, y: CY.tr + (d - W) };
  // bottom edge: right -> left
  if (d < 2 * W + H) return { x: CX.br - (d - W - H), y: CY.br };
  // left edge: bottom -> top
  return { x: CX.bl, y: CY.bl - (d - 2 * W - H) };
}

const NUM_DOTS = 8;

export default function CircuitSim({ onComplete }: CircuitSimProps) {
  const { settings } = useSettings();
  const animDisabled = settings.animations === 'none';

  const [switchClosed, setSwitchClosed] = useState(false);
  const [voltageIdx, setVoltageIdx]     = useState(1); // 6V default
  const [dotPositions, setDotPositions] = useState<number[]>(
    Array.from({ length: NUM_DOTS }, (_, i) => i / NUM_DOTS)
  );

  const hasToggled  = useRef(false);
  const hasChangedV = useRef(false);
  const completeFired = useRef(false);
  const rafRef      = useRef<number>(0);
  const lastTimeRef = useRef<number | null>(null);

  const voltage  = VOLTAGES[voltageIdx];
  const current  = parseFloat((voltage / RESISTANCE).toFixed(2));
  // brightness 0-1 from voltage
  const brightness = voltage / 12;

  // Check completion
  const checkComplete = useCallback(() => {
    if (hasToggled.current && hasChangedV.current && !completeFired.current) {
      completeFired.current = true;
      onComplete?.();
    }
  }, [onComplete]);

  const handleSwitch = () => {
    setSwitchClosed(prev => {
      const next = !prev;
      if (!hasToggled.current) {
        hasToggled.current = true;
        // Check after state update
        setTimeout(checkComplete, 0);
      }
      return next;
    });
  };

  const handleVoltage = (idx: number) => {
    setVoltageIdx(idx);
    if (!hasChangedV.current && idx !== 1) {
      hasChangedV.current = true;
      setTimeout(checkComplete, 0);
    }
  };

  // Animate dots around circuit
  useEffect(() => {
    if (!switchClosed || animDisabled) {
      cancelAnimationFrame(rafRef.current);
      return;
    }

    const speed = 0.04 + 0.03 * (voltageIdx / 3); // faster at higher voltage

    function tick(ts: number) {
      if (lastTimeRef.current === null) lastTimeRef.current = ts;
      const dt = (ts - lastTimeRef.current) / 1000;
      lastTimeRef.current = ts;

      setDotPositions(prev =>
        prev.map(p => (p + speed * dt) % 1)
      );
      rafRef.current = requestAnimationFrame(tick);
    }

    lastTimeRef.current = null;
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafRef.current);
      lastTimeRef.current = null;
    };
  }, [switchClosed, voltageIdx, animDisabled]);

  // Glow intensity CSS var
  const glowPx = switchClosed ? Math.round(brightness * 28) : 0;

  return (
    <div className="circuit-sim">
      <p className="circuit-sim__explanation">
        Tap the switch to complete the circuit. Watch how increasing voltage makes the
        current bigger and the bulb brighter!
      </p>

      {/* SVG circuit diagram */}
      <div className="circuit-sim__canvas">
        <svg
          viewBox={`0 0 360 200`}
          className="circuit-sim__svg"
          aria-label="Series circuit diagram"
        >
          {/* Wires */}
          {/* Top wire */}
          <line x1={CX.tl} y1={CY.tl} x2={CX.tr} y2={CY.tr} className="circuit-sim__wire" />
          {/* Right wire */}
          <line x1={CX.tr} y1={CY.tr} x2={CX.br} y2={CY.br} className="circuit-sim__wire" />
          {/* Bottom wire */}
          <line x1={CX.br} y1={CY.br} x2={CX.bl} y2={CY.bl} className="circuit-sim__wire" />
          {/* Left wire */}
          <line x1={CX.bl} y1={CY.bl} x2={CX.tl} y2={CY.tl} className="circuit-sim__wire" />

          {/* Battery (left side, mid) */}
          <g transform={`translate(${CX.bl},100)`}>
            {/* Positive terminal */}
            <line x1={0} y1={-18} x2={0} y2={-8}  className="circuit-sim__wire" />
            <line x1={-10} y1={-18} x2={10} y2={-18} className="circuit-sim__battery-long" />
            {/* Negative terminal */}
            <line x1={-6}  y1={-8}  x2={6}  y2={-8}  className="circuit-sim__battery-short" />
            <line x1={0}   y1={-8}  x2={0}  y2={8}  className="circuit-sim__wire" />
            <text x={16} y={-10} className="circuit-sim__comp-label">EMF</text>
            <text x={16} y={4}   className="circuit-sim__comp-value">{voltage}V</text>
            <text x={-22} y={-16} className="circuit-sim__pole">+</text>
            <text x={-22} y={0}  className="circuit-sim__pole">-</text>
          </g>

          {/* Switch (top-left area) */}
          <g transform={`translate(120,${CY.tl})`}>
            <line x1={-20} y1={0} x2={20} y2={0} className="circuit-sim__wire" />
            {switchClosed ? (
              <line x1={-8} y1={0} x2={8} y2={0} className="circuit-sim__switch circuit-sim__switch--closed" />
            ) : (
              <line x1={-8} y1={0} x2={4} y2={-14} className="circuit-sim__switch circuit-sim__switch--open" />
            )}
            <circle cx={-8} cy={0} r={3} className="circuit-sim__switch-dot" />
            <circle cx={8}  cy={0} r={3} className="circuit-sim__switch-dot" />
            <text x={0} y={-20} className="circuit-sim__comp-label" textAnchor="middle">Switch</text>
          </g>

          {/* Bulb (right side, mid) */}
          <g transform={`translate(${CX.tr},100)`}>
            {/* Glow halo when on */}
            {switchClosed && (
              <circle
                cx={0} cy={0} r={22}
                className="circuit-sim__bulb-glow"
                style={{ filter: `blur(${glowPx / 2}px)`, opacity: brightness * 0.6 }}
              />
            )}
            <circle cx={0} cy={0} r={16} className="circuit-sim__bulb-body" />
            {/* Filament */}
            <path
              d="M -6,-4 Q -3,4 0,-4 Q 3,4 6,-4"
              className="circuit-sim__filament"
              style={{
                stroke: switchClosed
                  ? `rgba(255,179,68,${0.4 + brightness * 0.6})`
                  : 'var(--muted)',
              }}
            />
            <text x={24} y={-6} className="circuit-sim__comp-label">Bulb</text>
            <text x={24} y={8}  className="circuit-sim__comp-value">{RESISTANCE} {'\u03a9'}</text>
          </g>

          {/* Ammeter (bottom wire) */}
          <g transform={`translate(180,${CY.br})`}>
            <circle cx={0} cy={0} r={12} className="circuit-sim__ammeter" />
            <text x={0} y={5} className="circuit-sim__ammeter-letter" textAnchor="middle">A</text>
            <text x={0} y={-18} className="circuit-sim__comp-value" textAnchor="middle">
              {switchClosed ? `${current} A` : '0 A'}
            </text>
          </g>

          {/* Current dots */}
          {switchClosed && dotPositions.map((pos, i) => {
            const { x, y } = perimToXY(pos);
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r={4}
                className="circuit-sim__electron"
              />
            );
          })}
        </svg>
      </div>

      {/* Switch button */}
      <button
        className={`circuit-sim__switch-btn ${switchClosed ? 'circuit-sim__switch-btn--on' : ''}`}
        onClick={handleSwitch}
        aria-pressed={switchClosed}
      >
        {switchClosed ? 'Switch: CLOSED (tap to open)' : 'Switch: OPEN (tap to close)'}
      </button>

      {/* Voltage selector */}
      <div className="circuit-sim__voltage-row" role="group" aria-label="Battery voltage">
        <span className="circuit-sim__voltage-label">Battery voltage:</span>
        {VOLTAGES.map((v, i) => (
          <button
            key={v}
            className={`circuit-sim__voltage-btn ${voltageIdx === i ? 'circuit-sim__voltage-btn--active' : ''}`}
            onClick={() => handleVoltage(i)}
            aria-pressed={voltageIdx === i}
          >
            {v}V
          </button>
        ))}
      </div>

      {/* Readouts */}
      <div className="circuit-sim__readouts">
        <div className="circuit-sim__readout circuit-sim__readout--purple">
          <span className="circuit-sim__readout-label">Voltage (V)</span>
          <span className="circuit-sim__readout-value">{voltage} V</span>
        </div>
        <div className="circuit-sim__readout circuit-sim__readout--amber">
          <span className="circuit-sim__readout-label">Resistance (R)</span>
          <span className="circuit-sim__readout-value">{RESISTANCE} {'\u03a9'}</span>
        </div>
        <div className="circuit-sim__readout circuit-sim__readout--cyan">
          <span className="circuit-sim__readout-label">Current (I)</span>
          <span className="circuit-sim__readout-value">
            {switchClosed ? `${current} A` : '0 A'}
          </span>
        </div>
      </div>

      {/* Live equation */}
      <div className="circuit-sim__equation">
        <span className="circuit-sim__eq-cyan">I</span>
        <span className="circuit-sim__eq-op">=</span>
        <span className="circuit-sim__eq-purple">V</span>
        <span className="circuit-sim__eq-op">/</span>
        <span className="circuit-sim__eq-amber">R</span>
        <span className="circuit-sim__eq-sep" />
        <span className="circuit-sim__eq-values">
          <span className="circuit-sim__eq-cyan">{switchClosed ? current : 0}</span>
          {' = '}
          <span className="circuit-sim__eq-purple">{voltage}</span>
          {' / '}
          <span className="circuit-sim__eq-amber">{RESISTANCE}</span>
        </span>
      </div>
    </div>
  );
}
