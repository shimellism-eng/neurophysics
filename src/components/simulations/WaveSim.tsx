import { useState, useRef, useEffect, useCallback } from 'react';
import { useSettings } from '../../context/SettingsContext';
import './WaveSim.css';

interface WaveSimProps {
  onComplete?: () => void;
}

type SpeedMode = 'slow' | 'normal' | 'fast';

const SPEED_CONFIG: Record<SpeedMode, { freq: number; label: string }> = {
  slow:   { freq: 2,  label: 'Slow' },
  normal: { freq: 5,  label: 'Normal' },
  fast:   { freq: 10, label: 'Fast' },
};

const WAVE_SPEED = 340; // m/s (speed of sound, constant)
const AMPLITUDE = 36;   // px
const SVG_WIDTH  = 600;
const SVG_HEIGHT = 100;

export default function WaveSim({ onComplete }: WaveSimProps) {
  const { settings } = useSettings();
  const animDisabled = settings.animations === 'none';

  const [mode, setMode] = useState<SpeedMode>('normal');
  const [frozen, setFrozen] = useState(false);
  const [triedModes, setTriedModes] = useState<Set<SpeedMode>>(new Set(['normal']));
  const completeFired = useRef(false);

  const phaseRef  = useRef(0);
  const rafRef    = useRef<number>(0);
  const lastTimeRef = useRef<number | null>(null);

  // SVG path state — we update this via requestAnimationFrame
  const [pathD, setPathD] = useState('');

  const buildPath = useCallback((phase: number, freq: number): string => {
    const wavelengthPx = SVG_WIDTH / freq; // pixels per cycle
    const points: string[] = [];
    for (let x = 0; x <= SVG_WIDTH; x += 2) {
      const y = SVG_HEIGHT / 2 - AMPLITUDE * Math.sin((2 * Math.PI * x) / wavelengthPx - phase);
      points.push(`${x.toFixed(1)},${y.toFixed(1)}`);
    }
    return 'M ' + points.join(' L ');
  }, []);

  useEffect(() => {
    if (animDisabled || frozen) {
      // Static snapshot
      setPathD(buildPath(0, SPEED_CONFIG[mode].freq));
      return;
    }

    function tick(ts: number) {
      if (lastTimeRef.current === null) lastTimeRef.current = ts;
      const dt = (ts - lastTimeRef.current) / 1000;
      lastTimeRef.current = ts;

      // Phase advances so the wave scrolls left
      phaseRef.current += 2 * Math.PI * SPEED_CONFIG[mode].freq * dt * 0.3;
      setPathD(buildPath(phaseRef.current, SPEED_CONFIG[mode].freq));
      rafRef.current = requestAnimationFrame(tick);
    }

    lastTimeRef.current = null;
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafRef.current);
      lastTimeRef.current = null;
    };
  }, [mode, frozen, animDisabled, buildPath]);

  // Fire onComplete after all three speeds tried
  useEffect(() => {
    if (triedModes.size >= 3 && !completeFired.current) {
      completeFired.current = true;
      onComplete?.();
    }
  }, [triedModes, onComplete]);

  const selectMode = (m: SpeedMode) => {
    setMode(m);
    setFrozen(false);
    setTriedModes(prev => new Set([...prev, m]));
  };

  const freq       = SPEED_CONFIG[mode].freq;
  const wavelength = parseFloat((WAVE_SPEED / freq).toFixed(1));

  // Wavelength arrow positions (pixels, based on first full cycle)
  const wavelengthPx = SVG_WIDTH / freq;
  const arrowY      = SVG_HEIGHT / 2 + AMPLITUDE + 14;
  const arrow1X     = 0;
  const arrow2X     = wavelengthPx;

  return (
    <div className="wave-sim">
      {/* Explanation */}
      <p className="wave-sim__explanation">
        Watch how wavelength (spacing between peaks) changes as you change frequency.
        The wave speed stays the same!
      </p>

      {/* SVG canvas */}
      <div className="wave-sim__canvas">
        <svg
          viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT + 40}`}
          preserveAspectRatio="none"
          className="wave-sim__svg"
          aria-label="Animated sine wave"
        >
          {/* Amplitude arrow */}
          <line
            x1={16} y1={SVG_HEIGHT / 2}
            x2={16} y2={SVG_HEIGHT / 2 - AMPLITUDE}
            className="wave-sim__amp-arrow"
          />
          <polygon
            points={`10,${SVG_HEIGHT / 2 - AMPLITUDE} 22,${SVG_HEIGHT / 2 - AMPLITUDE} 16,${SVG_HEIGHT / 2 - AMPLITUDE - 7}`}
            className="wave-sim__amp-arrowhead"
          />
          <text x={20} y={SVG_HEIGHT / 2 - AMPLITUDE / 2} className="wave-sim__label-small">A</text>

          {/* Wave path */}
          <path d={pathD} className="wave-sim__path" />

          {/* Wavelength double-headed arrow */}
          {wavelengthPx <= SVG_WIDTH && (
            <g>
              <line
                x1={arrow1X} y1={arrowY}
                x2={arrow2X} y2={arrowY}
                className="wave-sim__lambda-arrow"
              />
              {/* Left arrowhead */}
              <polygon
                points={`${arrow1X},${arrowY - 4} ${arrow1X},${arrowY + 4} ${arrow1X - 7},${arrowY}`}
                className="wave-sim__lambda-arrowhead"
              />
              {/* Right arrowhead */}
              <polygon
                points={`${arrow2X},${arrowY - 4} ${arrow2X},${arrowY + 4} ${arrow2X + 7},${arrowY}`}
                className="wave-sim__lambda-arrowhead"
              />
              <text
                x={(arrow1X + arrow2X) / 2}
                y={arrowY - 6}
                className="wave-sim__label-lambda"
                textAnchor="middle"
              >
                {'\u03bb'} = {wavelength} m
              </text>
            </g>
          )}
        </svg>
      </div>

      {/* Tap buttons */}
      <div className="wave-sim__speed-btns" role="group" aria-label="Wave frequency">
        {(['slow', 'normal', 'fast'] as SpeedMode[]).map(m => (
          <button
            key={m}
            className={`wave-sim__speed-btn ${mode === m ? 'wave-sim__speed-btn--active' : ''} ${triedModes.has(m) ? 'wave-sim__speed-btn--tried' : ''}`}
            onClick={() => selectMode(m)}
            aria-pressed={mode === m}
          >
            {SPEED_CONFIG[m].label}
            {triedModes.has(m) && <span className="wave-sim__tried-dot" aria-hidden="true" />}
          </button>
        ))}
        <button
          className={`wave-sim__freeze-btn ${frozen ? 'wave-sim__freeze-btn--active' : ''}`}
          onClick={() => setFrozen(f => !f)}
          aria-pressed={frozen}
        >
          {frozen ? 'Unfreeze' : 'Freeze'}
        </button>
      </div>

      {/* Readouts */}
      <div className="wave-sim__readouts">
        <div className="wave-sim__readout wave-sim__readout--purple">
          <span className="wave-sim__readout-label">Frequency</span>
          <span className="wave-sim__readout-value">{freq} Hz</span>
        </div>
        <div className="wave-sim__readout wave-sim__readout--amber">
          <span className="wave-sim__readout-label">Wavelength</span>
          <span className="wave-sim__readout-value">{wavelength} m</span>
        </div>
        <div className="wave-sim__readout wave-sim__readout--cyan">
          <span className="wave-sim__readout-label">Wave speed</span>
          <span className="wave-sim__readout-value">{WAVE_SPEED} m/s</span>
        </div>
      </div>

      {/* Live equation */}
      <div className="wave-sim__equation">
        <span className="wave-sim__eq-part wave-sim__eq-cyan">v</span>
        <span className="wave-sim__eq-op">=</span>
        <span className="wave-sim__eq-part wave-sim__eq-purple">f</span>
        <span className="wave-sim__eq-op">&times;</span>
        <span className="wave-sim__eq-part wave-sim__eq-amber">&#955;</span>
        <span className="wave-sim__eq-sep" />
        <span className="wave-sim__eq-values">
          <span className="wave-sim__eq-cyan">{WAVE_SPEED}</span>
          {' = '}
          <span className="wave-sim__eq-purple">{freq}</span>
          {' \u00d7 '}
          <span className="wave-sim__eq-amber">{wavelength}</span>
        </span>
      </div>

      {triedModes.size < 3 && (
        <p className="wave-sim__hint">
          Try all three speeds to complete this simulation ({triedModes.size}/3 tried)
        </p>
      )}
    </div>
  );
}
