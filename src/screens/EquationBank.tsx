import { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { ScreenWrapper } from '../components/layout/ScreenWrapper';
import { EquationTriangle } from '../components/ui/EquationTriangle';
import type { Equation, BoardId } from '../types/content';
import './EquationBank.css';

export function EquationBank() {
  const { progress } = useUser();
  const [equations, setEquations] = useState<Equation[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);
  const boardId = (progress?.board ?? 'aqa') as BoardId;

  useEffect(() => {
    import('../../content/equations/forces.json')
      .then(mod => setEquations((mod.default as any).equations as Equation[]))
      .catch(console.error);
  }, []);

  return (
    <ScreenWrapper>
      <h1>Equation Bank</h1>

      <div className="eqbank__list">
        {equations.map(eq => {
          const onSheet = eq.onFormulaSheet[boardId] ?? true;
          const isOpen = expanded === eq.id;
          return (
            <div key={eq.id} className={`eqbank__item card ${isOpen ? 'eqbank__item--open' : ''}`}>
              <button
                className="eqbank__row"
                onClick={() => setExpanded(isOpen ? null : eq.id)}
                aria-expanded={isOpen}
              >
                <div className="eqbank__row-left">
                  <code className={`eqbank__canonical eq color-${eq.color}`}>{eq.canonical}</code>
                  <span className="eqbank__name">{eq.name}</span>
                </div>
                <div className="eqbank__row-right">
                  {!onSheet && <span className="eqbank__memorise">⚠️</span>}
                  {eq.higherOnly && <span className="badge eqbank__higher">H</span>}
                  <span className={`eqbank__chevron ${isOpen ? 'eqbank__chevron--open' : ''}`}>›</span>
                </div>
              </button>

              {isOpen && (
                <div className="eqbank__detail">
                  <div className="eqbank__vars">
                    {eq.variables.map(v => (
                      <div key={v.symbol} className="eqbank__var">
                        <code className="eq">{v.symbol}</code>
                        <span>{v.name}</span>
                        <span className="text-muted text-sm">{v.unit}</span>
                        {v.constant !== undefined && (
                          <span className="eqbank__const">= {v.constant}</span>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="eqbank__rearrangements">
                    {eq.rearrangements.map(r => (
                      <code key={r.solveFor} className="eqbank__rearrangement eq">{r.formula}</code>
                    ))}
                  </div>

                  {!onSheet && (
                    <p className="eqbank__memorise-note">
                      ⚠️ Not on {boardId.toUpperCase()} formula sheet — must memorise
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </ScreenWrapper>
  );
}
