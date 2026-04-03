import type { UIColor } from '../../types/content';
import './EquationTriangle.css';

interface TriangleSlot {
  symbol: string;
  color: UIColor;
}

interface EquationTriangleProps {
  top: TriangleSlot;
  bottomLeft: TriangleSlot;
  bottomRight: TriangleSlot;
  onFormulaSheet: boolean;
}

export function EquationTriangle({ top, bottomLeft, bottomRight, onFormulaSheet }: EquationTriangleProps) {
  return (
    <div className="eq-triangle">
      <div className="eq-triangle__shape">
        <div className={`eq-slot eq-slot--top eq-slot--${top.color}`}>
          <span>{top.symbol}</span>
        </div>
        <div className="eq-triangle__bottom-row">
          <div className={`eq-slot eq-slot--${bottomLeft.color}`}>
            <span>{bottomLeft.symbol}</span>
          </div>
          <div className="eq-triangle__divider" />
          <div className={`eq-slot eq-slot--${bottomRight.color}`}>
            <span>{bottomRight.symbol}</span>
          </div>
        </div>
      </div>
      {!onFormulaSheet && (
        <p className="eq-triangle__memorise">
          ⚠️ Must memorise — not on formula sheet
        </p>
      )}
    </div>
  );
}
