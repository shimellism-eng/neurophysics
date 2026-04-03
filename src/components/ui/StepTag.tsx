import type { UIColor } from '../../types/content';
import './StepTag.css';

interface StepTagProps {
  label: string;
  color: UIColor;
}

export function StepTag({ label, color }: StepTagProps) {
  return (
    <span className={`step-tag step-tag--${color}`}>
      {label}
    </span>
  );
}
