import { useState, useCallback } from 'react';
import './FmaSlider.css';

interface FmaVariable {
  id: string;
  label: string;
  unit: string;
  min: number;
  max: number;
  step: number;
  default: number;
  color: string;
}

interface FmaDerived {
  id: string;
  label: string;
  unit: string;
  formula: string;
  decimalPlaces: number;
  color: string;
}

interface FmaSliderConfig {
  variables: FmaVariable[];
  derived: FmaDerived[];
  arrowVariable?: string;
  blockLabel?: string;
}

interface FmaSliderProps {
  config: FmaSliderConfig;
}

const COLOR_MAP: Record<string, string> = {
  cyan: 'var(--cyan)',
  purple: 'var(--purple)',
  amber: 'var(--amber)',
  pink: 'var(--pink)',
  blue: 'var(--blue)',
  green: 'var(--green)',
  red: 'var(--red)',
};

function evalFormula(formula: string, vars: Record<string, number>): number {
  try {
    const fn = new Function(...Object.keys(vars), `return ${formula};`);
    return fn(...Object.values(vars));
  } catch {
    return 0;
  }
}

export default function FmaSlider({ config }: FmaSliderProps) {
  const initValues = Object.fromEntries(
    config.variables.map(v => [v.id, v.default])
  );
  const [values, setValues] = useState<Record<string, number>>(initValues);

  const derived = config.derived.map(d => {
    const val = evalFormula(d.formula, values);
    return { ...d, value: parseFloat(val.toFixed(d.decimalPlaces)) };
  });

  const forceVar = config.variables.find(v => v.id === config.arrowVariable);
  const arrowWidth = forceVar
    ? Math.max(24, Math.min(140, (values[forceVar.id] / forceVar.max) * 140))
    : 80;

  const handleChange = useCallback((id: string, val: number) => {
    setValues(prev => ({ ...prev, [id]: val }));
  }, []);

  return (
    <div className="fma-sim">
      {/* Visual */}
      <div className="fma-sim__visual">
        <div className="fma-sim__track">
          <div
            className="fma-sim__arrow"
            style={{ width: arrowWidth }}
            title={`Force: ${forceVar ? values[forceVar.id] : 0} N`}
          />
          <div className="fma-sim__block">
            <span>{config.blockLabel ?? 'm'}</span>
            {config.variables.find(v => v.id === 'mass') && (
              <span className="fma-sim__block-mass">
                {values['mass']} kg
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Sliders */}
      <div className="fma-sim__controls">
        {config.variables.map(v => (
          <div key={v.id} className="fma-sim__control">
            <div className="fma-sim__control-header">
              <label htmlFor={`slider-${v.id}`} style={{ color: COLOR_MAP[v.color] }}>
                {v.label}
              </label>
              <span className="fma-sim__control-value" style={{ color: COLOR_MAP[v.color] }}>
                {values[v.id]} {v.unit}
              </span>
            </div>
            <input
              id={`slider-${v.id}`}
              type="range"
              min={v.min}
              max={v.max}
              step={v.step}
              value={values[v.id]}
              onChange={e => handleChange(v.id, Number(e.target.value))}
              className="fma-sim__slider"
              style={{ '--thumb-color': COLOR_MAP[v.color] } as React.CSSProperties}
              aria-label={`${v.label}: ${values[v.id]} ${v.unit}`}
            />
            <div className="fma-sim__slider-range">
              <span>{v.min} {v.unit}</span>
              <span>{v.max} {v.unit}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Derived readouts */}
      <div className="fma-sim__readouts">
        {derived.map(d => (
          <div key={d.id} className="fma-sim__readout" style={{ borderColor: COLOR_MAP[d.color] }}>
            <span className="fma-sim__readout-label">{d.label}</span>
            <span className="fma-sim__readout-value eq" style={{ color: COLOR_MAP[d.color] }}>
              {d.value} {d.unit}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
