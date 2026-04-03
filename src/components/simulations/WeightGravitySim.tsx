import { useState, useCallback, useMemo } from 'react';
import type { SimulationStep } from '../../types/content';
import './WeightGravitySim.css';

type SimConfig = SimulationStep['simConfig'];

interface WeightGravitySimProps {
  config: SimConfig;
}

interface Planet {
  id: string;
  name: string;
  emoji: string;
  g: number;
}

const PLANETS: Planet[] = [
  { id: 'earth',   name: 'Earth',   emoji: '\u{1F30D}', g: 9.8  },
  { id: 'moon',    name: 'Moon',    emoji: '\u{1F319}', g: 1.6  },
  { id: 'mars',    name: 'Mars',    emoji: '\u{1F534}', g: 3.7  },
  { id: 'jupiter', name: 'Jupiter', emoji: '\u{1F7E0}', g: 24.8 },
];

const MAX_WEIGHT = 100 * 24.8; // max mass * max g — used for arrow scaling

export default function WeightGravitySim({ config: _config }: WeightGravitySimProps) {
  const [mass, setMass] = useState(50);
  const [selectedPlanet, setSelectedPlanet] = useState<string>('earth');
  const [comparePlanet, setComparePlanet] = useState<string | null>(null);
  const [visitedPlanets, setVisitedPlanets] = useState<Set<string>>(new Set(['earth']));

  const planet = PLANETS.find(p => p.id === selectedPlanet)!;
  const compareObj = comparePlanet ? PLANETS.find(p => p.id === comparePlanet) : null;

  const weight = parseFloat((mass * planet.g).toFixed(1));
  const compareWeight = compareObj ? parseFloat((mass * compareObj.g).toFixed(1)) : null;

  const interacted = visitedPlanets.size >= 2;

  const handlePlanetChange = useCallback((id: string) => {
    setSelectedPlanet(id);
    setVisitedPlanets(prev => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  }, []);

  const handleCompareToggle = useCallback(() => {
    if (comparePlanet) {
      setComparePlanet(null);
    } else {
      // Default compare to moon if primary isn't moon, else earth
      const defaultCompare = selectedPlanet !== 'moon' ? 'moon' : 'earth';
      setComparePlanet(defaultCompare);
      setVisitedPlanets(prev => {
        const next = new Set(prev);
        next.add(defaultCompare);
        return next;
      });
    }
  }, [comparePlanet, selectedPlanet]);

  const handleComparePlanetChange = useCallback((id: string) => {
    setComparePlanet(id);
    setVisitedPlanets(prev => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  }, []);

  const arrowHeight = useMemo(
    () => Math.max(20, Math.min(160, (weight / MAX_WEIGHT) * 160)),
    [weight]
  );

  const compareArrowHeight = useMemo(
    () => compareWeight != null ? Math.max(20, Math.min(160, (compareWeight / MAX_WEIGHT) * 160)) : 0,
    [compareWeight]
  );

  return (
    <div className="wg-sim">
      {/* Planet selector */}
      <div className="wg-sim__planets" role="radiogroup" aria-label="Select planet">
        {PLANETS.map(p => (
          <button
            key={p.id}
            className={`wg-sim__planet-btn${p.id === selectedPlanet ? ' wg-sim__planet-btn--active' : ''}`}
            onClick={() => handlePlanetChange(p.id)}
            role="radio"
            aria-checked={p.id === selectedPlanet}
            aria-label={`${p.name}, g = ${p.g} N/kg`}
          >
            <span className="wg-sim__planet-emoji">{p.emoji}</span>
            <span className="wg-sim__planet-name">{p.name}</span>
            <span className="wg-sim__planet-g">g = {p.g}</span>
          </button>
        ))}
      </div>

      {/* Visual area */}
      <div className={`wg-sim__visual${comparePlanet ? ' wg-sim__visual--compare' : ''}`}>
        <WeightScene
          planet={planet}
          mass={mass}
          weight={weight}
          arrowHeight={arrowHeight}
        />
        {compareObj && compareWeight != null && (
          <WeightScene
            planet={compareObj}
            mass={mass}
            weight={compareWeight}
            arrowHeight={compareArrowHeight}
          />
        )}
      </div>

      {/* Mass slider */}
      <div className="wg-sim__control">
        <div className="wg-sim__control-header">
          <label htmlFor="wg-mass-slider" className="wg-sim__label wg-sim__label--mass">
            Mass
          </label>
          <span className="wg-sim__value wg-sim__value--mass eq">
            {mass} kg
          </span>
        </div>
        <input
          id="wg-mass-slider"
          type="range"
          min={0.1}
          max={100}
          step={0.1}
          value={mass}
          onChange={e => setMass(Number(e.target.value))}
          className="wg-sim__slider"
          style={{ '--thumb-color': 'var(--purple)' } as React.CSSProperties}
          aria-label={`Mass: ${mass} kg`}
        />
        <div className="wg-sim__slider-range">
          <span>0.1 kg</span>
          <span>100 kg</span>
        </div>
      </div>

      {/* Equation readout */}
      <div className="wg-sim__equation">
        <span className="wg-sim__eq-label">W = m &times; g</span>
        <span className="wg-sim__eq-values eq">
          <span className="wg-sim__eq-w">W</span> ={' '}
          <span className="wg-sim__eq-m">{mass} kg</span> &times;{' '}
          <span className="wg-sim__eq-g">{planet.g} N/kg</span> ={' '}
          <span className="wg-sim__eq-result">{weight} N</span>
        </span>
      </div>

      {/* Compare toggle */}
      <button
        className={`wg-sim__compare-btn${comparePlanet ? ' wg-sim__compare-btn--active' : ''}`}
        onClick={handleCompareToggle}
      >
        {comparePlanet ? 'Hide comparison' : 'Compare two planets'}
      </button>

      {/* Compare planet selector */}
      {comparePlanet && (
        <div className="wg-sim__compare-selector">
          <span className="wg-sim__compare-label">Compare with:</span>
          <div className="wg-sim__compare-options">
            {PLANETS.filter(p => p.id !== selectedPlanet).map(p => (
              <button
                key={p.id}
                className={`wg-sim__planet-btn wg-sim__planet-btn--sm${p.id === comparePlanet ? ' wg-sim__planet-btn--active' : ''}`}
                onClick={() => handleComparePlanetChange(p.id)}
                aria-label={`Compare with ${p.name}`}
              >
                <span className="wg-sim__planet-emoji">{p.emoji}</span>
                <span className="wg-sim__planet-name">{p.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Interaction hint */}
      {!interacted && (
        <p className="wg-sim__hint">
          Try at least 2 different planets to see how weight changes!
        </p>
      )}
    </div>
  );
}

/* ---- Sub-component: single planet weight scene ---- */

interface WeightSceneProps {
  planet: Planet;
  mass: number;
  weight: number;
  arrowHeight: number;
}

function WeightScene({ planet, mass, weight, arrowHeight }: WeightSceneProps) {
  return (
    <div className="wg-scene">
      <span className="wg-scene__planet-label">
        {planet.emoji} {planet.name}
      </span>

      <div className="wg-scene__canvas">
        {/* Object */}
        <div className="wg-scene__object">
          <span className="wg-scene__object-mass">{mass} kg</span>
        </div>

        {/* Weight arrow pointing down */}
        <div
          className="wg-scene__arrow"
          style={{ height: arrowHeight }}
          title={`Weight: ${weight} N`}
        >
          <div className="wg-scene__arrow-shaft" />
          <div className="wg-scene__arrow-head" />
        </div>
      </div>

      {/* Scale readout */}
      <div className="wg-scene__scale">
        <span className="wg-scene__scale-label">Scale reads:</span>
        <span className="wg-scene__scale-value eq">{weight} N</span>
      </div>
    </div>
  );
}
