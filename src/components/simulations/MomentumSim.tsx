import { useState, useCallback, useRef, useEffect } from 'react';
import './MomentumSim.css';

interface MomentumSimConfig {
  visualType: string;
  mass1?: { min: number; max: number; default: number; step: number };
  mass2?: { min: number; max: number; default: number; step: number };
  vel1?: { min: number; max: number; default: number; step: number };
  vel2?: { min: number; max: number; default: number; step: number };
}

interface MomentumSimProps {
  config: MomentumSimConfig;
  onComplete?: () => void;
}

const COLOR_MAP: Record<string, string> = {
  cyan: 'var(--cyan)',
  purple: 'var(--purple)',
  amber: 'var(--amber)',
  green: 'var(--green)',
  red: 'var(--red)',
};

/** Compute block size (px) proportional to mass. */
function blockSize(mass: number): number {
  return Math.round(40 + mass * 5);
}

/** Compute arrow width (px) proportional to |momentum|. Max ~120px. */
function arrowWidth(momentum: number): number {
  return Math.min(120, Math.max(0, Math.abs(momentum) * 3));
}

export default function MomentumSim({ config, onComplete }: MomentumSimProps) {
  const m1Cfg = config.mass1 ?? { min: 0.5, max: 10, default: 2, step: 0.5 };
  const m2Cfg = config.mass2 ?? { min: 0.5, max: 10, default: 3, step: 0.5 };
  const v1Cfg = config.vel1 ?? { min: -10, max: 10, default: 5, step: 0.5 };
  const v2Cfg = config.vel2 ?? { min: -10, max: 10, default: -2, step: 0.5 };

  const [mass1, setMass1] = useState(m1Cfg.default);
  const [mass2, setMass2] = useState(m2Cfg.default);
  const [vel1, setVel1] = useState(v1Cfg.default);
  const [vel2, setVel2] = useState(v2Cfg.default);
  const [elastic, setElastic] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [collisionCount, setCollisionCount] = useState(0);
  const [afterVel1, setAfterVel1] = useState<number | null>(null);
  const [afterVel2, setAfterVel2] = useState<number | null>(null);
  const [showAfter, setShowAfter] = useState(false);

  // Positions for animation (0-100 percent of track)
  const [pos1, setPos1] = useState(25);
  const [pos2, setPos2] = useState(75);
  const animRef = useRef<number>(0);
  const completeFired = useRef(false);

  // Fire onComplete after 2 collisions
  useEffect(() => {
    if (collisionCount >= 2 && !completeFired.current && onComplete) {
      completeFired.current = true;
      onComplete();
    }
  }, [collisionCount, onComplete]);

  const resetPositions = useCallback(() => {
    setPos1(25);
    setPos2(75);
    setShowAfter(false);
    setAfterVel1(null);
    setAfterVel2(null);
  }, []);

  const handleCollide = useCallback(() => {
    if (animating) return;

    // Calculate post-collision velocities
    let v1After: number;
    let v2After: number;

    if (elastic) {
      // Elastic: both momentum and kinetic energy conserved
      v1After = ((mass1 - mass2) * vel1 + 2 * mass2 * vel2) / (mass1 + mass2);
      v2After = ((mass2 - mass1) * vel2 + 2 * mass1 * vel1) / (mass1 + mass2);
    } else {
      // Perfectly inelastic: objects stick together
      const vCombined = (mass1 * vel1 + mass2 * vel2) / (mass1 + mass2);
      v1After = vCombined;
      v2After = vCombined;
    }

    setAfterVel1(parseFloat(v1After.toFixed(2)));
    setAfterVel2(parseFloat(v2After.toFixed(2)));

    // Animate approach
    setAnimating(true);
    let p1 = 25;
    let p2 = 75;
    const approachFrames = 40;
    let frame = 0;

    function animateApproach() {
      frame++;
      // Move objects toward each other proportional to their velocities
      const speed1 = vel1 * 0.8;
      const speed2 = vel2 * 0.8;
      p1 += speed1 / approachFrames * 15;
      p2 += speed2 / approachFrames * 15;

      // Clamp
      p1 = Math.max(5, Math.min(95, p1));
      p2 = Math.max(5, Math.min(95, p2));

      setPos1(p1);
      setPos2(p2);

      // Check if they've met (or passed)
      if (Math.abs(p1 - p2) < 8 || frame >= approachFrames) {
        // Snap to collision point
        const collisionPoint = (p1 + p2) / 2;
        setPos1(collisionPoint - 4);
        setPos2(collisionPoint + 4);

        // Show results after a brief pause
        setTimeout(() => {
          setShowAfter(true);

          // Animate separation
          let sepFrame = 0;
          const sepFrames = 30;
          let sp1 = collisionPoint - 4;
          let sp2 = collisionPoint + 4;

          function animateSeparation() {
            sepFrame++;
            sp1 += v1After / sepFrames * 12;
            sp2 += v2After / sepFrames * 12;
            sp1 = Math.max(2, Math.min(98, sp1));
            sp2 = Math.max(2, Math.min(98, sp2));

            // In inelastic, keep them together
            if (!elastic) {
              const avg = (sp1 + sp2) / 2;
              sp1 = avg - 2;
              sp2 = avg + 2;
            }

            setPos1(sp1);
            setPos2(sp2);

            if (sepFrame < sepFrames) {
              animRef.current = requestAnimationFrame(animateSeparation);
            } else {
              setAnimating(false);
              setCollisionCount(prev => prev + 1);
            }
          }

          animRef.current = requestAnimationFrame(animateSeparation);
        }, 300);
        return;
      }

      animRef.current = requestAnimationFrame(animateApproach);
    }

    animRef.current = requestAnimationFrame(animateApproach);
  }, [animating, mass1, mass2, vel1, vel2, elastic]);

  // Cleanup animation on unmount
  useEffect(() => {
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  // Calculated values
  const p1Before = mass1 * vel1;
  const p2Before = mass2 * vel2;
  const totalBefore = p1Before + p2Before;

  const p1After = afterVel1 !== null ? mass1 * afterVel1 : null;
  const p2After = afterVel2 !== null ? mass2 * afterVel2 : null;
  const totalAfter = p1After !== null && p2After !== null ? p1After + p2After : null;

  const momentumDir = (p: number) => (p >= 0 ? 'positive' : 'negative');
  const momentumColor = (p: number) => (p >= 0 ? COLOR_MAP.cyan : COLOR_MAP.red);

  return (
    <div className="momentum-sim">
      {/* Visual canvas */}
      <div className="momentum-sim__canvas">
        <div className="momentum-sim__track">
          {/* Object 1 */}
          <div
            className={`momentum-sim__object ${animating ? 'momentum-sim__object--animating' : ''}`}
            style={{ left: `${pos1}%`, transform: 'translateX(-50%)' }}
          >
            <div className="momentum-sim__arrow-wrap">
              <span className={`momentum-sim__arrow-label momentum-sim__arrow-label--${momentumDir(p1Before)}`}>
                p = {p1Before.toFixed(1)}
              </span>
              {p1Before !== 0 && (
                <div
                  className={`momentum-sim__arrow momentum-sim__arrow--${momentumDir(p1Before)}`}
                  style={{ width: arrowWidth(p1Before) }}
                />
              )}
            </div>
            <div
              className="momentum-sim__block momentum-sim__block--1"
              style={{
                width: blockSize(mass1),
                height: blockSize(mass1),
              }}
            >
              <span>A</span>
              <span className="momentum-sim__block-mass">{mass1} kg</span>
            </div>
          </div>

          {/* Object 2 */}
          <div
            className={`momentum-sim__object ${animating ? 'momentum-sim__object--animating' : ''}`}
            style={{ left: `${pos2}%`, transform: 'translateX(-50%)' }}
          >
            <div className="momentum-sim__arrow-wrap">
              <span className={`momentum-sim__arrow-label momentum-sim__arrow-label--${momentumDir(p2Before)}`}>
                p = {p2Before.toFixed(1)}
              </span>
              {p2Before !== 0 && (
                <div
                  className={`momentum-sim__arrow momentum-sim__arrow--${momentumDir(p2Before)}`}
                  style={{ width: arrowWidth(p2Before) }}
                />
              )}
            </div>
            <div
              className="momentum-sim__block momentum-sim__block--2"
              style={{
                width: blockSize(mass2),
                height: blockSize(mass2),
              }}
            >
              <span>B</span>
              <span className="momentum-sim__block-mass">{mass2} kg</span>
            </div>
          </div>

          <div className="momentum-sim__ground" />
        </div>
      </div>

      {/* Sliders — Object A */}
      <div className="momentum-sim__controls">
        <div className="momentum-sim__control-group">
          <span className="momentum-sim__group-label" style={{ color: COLOR_MAP.purple }}>
            Object A
          </span>

          <div className="momentum-sim__control">
            <div className="momentum-sim__control-header">
              <label htmlFor="slider-m1" style={{ color: COLOR_MAP.purple }}>Mass</label>
              <span className="momentum-sim__control-value" style={{ color: COLOR_MAP.purple }}>
                {mass1} kg
              </span>
            </div>
            <input
              id="slider-m1"
              type="range"
              min={m1Cfg.min}
              max={m1Cfg.max}
              step={m1Cfg.step}
              value={mass1}
              onChange={e => { setMass1(Number(e.target.value)); resetPositions(); }}
              className="momentum-sim__slider"
              style={{ '--thumb-color': COLOR_MAP.purple } as React.CSSProperties}
              aria-label={`Object A mass: ${mass1} kg`}
              disabled={animating}
            />
            <div className="momentum-sim__slider-range">
              <span>{m1Cfg.min} kg</span>
              <span>{m1Cfg.max} kg</span>
            </div>
          </div>

          <div className="momentum-sim__control">
            <div className="momentum-sim__control-header">
              <label htmlFor="slider-v1" style={{ color: COLOR_MAP.purple }}>Velocity</label>
              <span className="momentum-sim__control-value" style={{ color: COLOR_MAP.purple }}>
                {vel1} m/s
              </span>
            </div>
            <input
              id="slider-v1"
              type="range"
              min={v1Cfg.min}
              max={v1Cfg.max}
              step={v1Cfg.step}
              value={vel1}
              onChange={e => { setVel1(Number(e.target.value)); resetPositions(); }}
              className="momentum-sim__slider"
              style={{ '--thumb-color': COLOR_MAP.purple } as React.CSSProperties}
              aria-label={`Object A velocity: ${vel1} m/s`}
              disabled={animating}
            />
            <div className="momentum-sim__slider-range">
              <span>{v1Cfg.min} m/s</span>
              <span>{v1Cfg.max} m/s</span>
            </div>
          </div>
        </div>

        {/* Object B */}
        <div className="momentum-sim__control-group">
          <span className="momentum-sim__group-label" style={{ color: COLOR_MAP.cyan }}>
            Object B
          </span>

          <div className="momentum-sim__control">
            <div className="momentum-sim__control-header">
              <label htmlFor="slider-m2" style={{ color: COLOR_MAP.cyan }}>Mass</label>
              <span className="momentum-sim__control-value" style={{ color: COLOR_MAP.cyan }}>
                {mass2} kg
              </span>
            </div>
            <input
              id="slider-m2"
              type="range"
              min={m2Cfg.min}
              max={m2Cfg.max}
              step={m2Cfg.step}
              value={mass2}
              onChange={e => { setMass2(Number(e.target.value)); resetPositions(); }}
              className="momentum-sim__slider"
              style={{ '--thumb-color': COLOR_MAP.cyan } as React.CSSProperties}
              aria-label={`Object B mass: ${mass2} kg`}
              disabled={animating}
            />
            <div className="momentum-sim__slider-range">
              <span>{m2Cfg.min} kg</span>
              <span>{m2Cfg.max} kg</span>
            </div>
          </div>

          <div className="momentum-sim__control">
            <div className="momentum-sim__control-header">
              <label htmlFor="slider-v2" style={{ color: COLOR_MAP.cyan }}>Velocity</label>
              <span className="momentum-sim__control-value" style={{ color: COLOR_MAP.cyan }}>
                {vel2} m/s
              </span>
            </div>
            <input
              id="slider-v2"
              type="range"
              min={v2Cfg.min}
              max={v2Cfg.max}
              step={v2Cfg.step}
              value={vel2}
              onChange={e => { setVel2(Number(e.target.value)); resetPositions(); }}
              className="momentum-sim__slider"
              style={{ '--thumb-color': COLOR_MAP.cyan } as React.CSSProperties}
              aria-label={`Object B velocity: ${vel2} m/s`}
              disabled={animating}
            />
            <div className="momentum-sim__slider-range">
              <span>{v2Cfg.min} m/s</span>
              <span>{v2Cfg.max} m/s</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action row */}
      <div className="momentum-sim__actions">
        <button
          className="momentum-sim__collide-btn"
          onClick={handleCollide}
          disabled={animating}
        >
          {animating ? 'Colliding...' : 'Collide'}
        </button>
        <button
          className={`momentum-sim__toggle ${elastic ? 'momentum-sim__toggle--active' : ''}`}
          onClick={() => { setElastic(prev => !prev); resetPositions(); }}
          disabled={animating}
        >
          {elastic ? 'Elastic' : 'Inelastic (stick together)'}
        </button>
      </div>

      {/* Readouts — Before */}
      <div className="momentum-sim__readouts">
        <span className="momentum-sim__group-label">Before collision</span>
        <div className="momentum-sim__readout-row">
          <div className="momentum-sim__readout" style={{ borderColor: COLOR_MAP.purple }}>
            <span className="momentum-sim__readout-label">p(A)</span>
            <span className="momentum-sim__readout-value eq" style={{ color: momentumColor(p1Before) }}>
              {p1Before.toFixed(1)} kg·m/s
            </span>
          </div>
          <div className="momentum-sim__readout" style={{ borderColor: COLOR_MAP.cyan }}>
            <span className="momentum-sim__readout-label">p(B)</span>
            <span className="momentum-sim__readout-value eq" style={{ color: momentumColor(p2Before) }}>
              {p2Before.toFixed(1)} kg·m/s
            </span>
          </div>
        </div>
        <div className="momentum-sim__readout" style={{ borderColor: COLOR_MAP.green }}>
          <span className="momentum-sim__readout-label">Total momentum before</span>
          <span className="momentum-sim__readout-value eq" style={{ color: COLOR_MAP.green }}>
            {totalBefore.toFixed(1)} kg·m/s
          </span>
        </div>
      </div>

      {/* Readouts — After (only shown post-collision) */}
      {showAfter && totalAfter !== null && (
        <div className="momentum-sim__readouts">
          <span className="momentum-sim__group-label">After collision</span>
          <div className="momentum-sim__readout-row">
            <div className="momentum-sim__readout" style={{ borderColor: COLOR_MAP.purple }}>
              <span className="momentum-sim__readout-label">p(A)</span>
              <span className="momentum-sim__readout-value eq" style={{ color: momentumColor(p1After!) }}>
                {p1After!.toFixed(1)} kg·m/s
              </span>
            </div>
            <div className="momentum-sim__readout" style={{ borderColor: COLOR_MAP.cyan }}>
              <span className="momentum-sim__readout-label">p(B)</span>
              <span className="momentum-sim__readout-value eq" style={{ color: momentumColor(p2After!) }}>
                {p2After!.toFixed(1)} kg·m/s
              </span>
            </div>
          </div>
          <div className="momentum-sim__readout" style={{ borderColor: COLOR_MAP.green }}>
            <span className="momentum-sim__readout-label">Total momentum after</span>
            <span className="momentum-sim__readout-value eq" style={{ color: COLOR_MAP.green }}>
              {totalAfter.toFixed(1)} kg·m/s
            </span>
          </div>

          {/* Conservation banner */}
          <div
            className={`momentum-sim__conservation ${
              Math.abs(totalAfter - totalBefore) < 0.1
                ? 'momentum-sim__conservation--conserved'
                : 'momentum-sim__conservation--violated'
            }`}
          >
            {Math.abs(totalAfter - totalBefore) < 0.1
              ? 'Momentum is conserved! Total before = Total after'
              : 'Check: momentum should always be conserved'}
          </div>
        </div>
      )}
    </div>
  );
}
