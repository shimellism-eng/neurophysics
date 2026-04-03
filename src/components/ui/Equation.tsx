import katex from 'katex';
import 'katex/dist/katex.min.css';
import './Equation.css';

interface Props {
  tex: string;
  display?: boolean; // block vs inline
  className?: string;
}

export function Equation({ tex, display = false, className }: Props) {
  const html = katex.renderToString(tex, {
    throwOnError: false,
    displayMode: display,
  });
  return (
    <span
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
