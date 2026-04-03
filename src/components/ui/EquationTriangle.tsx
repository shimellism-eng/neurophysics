import type { UIColor } from '../../types/content';
import { Equation } from './Equation';
import './EquationTriangle.css';

interface TriangleSlot {
  symbol: string;
  tex?: string;
  color: UIColor;
}

interface EquationTriangleProps {
  top: TriangleSlot;
  bottomLeft: TriangleSlot;
  bottomRight: TriangleSlot;
  onFormulaSheet: boolean;
}

function SlotContent({ slot }: { slot: TriangleSlot }) {
  if (slot.tex) {
    return <Equation tex={slot.tex} />;
  }
  return <span>{slot.symbol}</span>;
}

export function EquationTriangle({ top, bottomLeft, bottomRight, onFormulaSheet }: EquationTriangleProps) {
  return (
    <div className="eq-triangle">
      <div className="eq-triangle__shape">
        <div className={`eq-slot eq-slot--top eq-slot--${top.color}`}>
          <SlotContent slot={top} />
        </div>
        <div className="eq-triangle__bottom-row">
          <div className={`eq-slot eq-slot--${bottomLeft.color}`}>
            <SlotContent slot={bottomLeft} />
          </div>
          <div className="eq-triangle__divider" />
          <div className={`eq-slot eq-slot--${bottomRight.color}`}>
            <SlotContent slot={bottomRight} />
          </div>
        </div>
      </div>
      {!onFormulaSheet && (
        <p className="eq-triangle__memorise">
          ⚠️ Must memorise, not on formula sheet
        </p>
      )}
    </div>
  );
}
