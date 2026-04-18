// src/components/ui/PageHeader.jsx
// Consistent screen header: optional back button, title, optional subtitle,
// optional right-side element (e.g. icon button, "Done" label).

import { ChevronLeft } from 'lucide-react';

export default function PageHeader({
  title,
  subtitle,
  onBack,
  backLabel = 'Go back',
  rightElement,
  className = '',
  style,
}) {
  return (
    <div
      className={`flex items-center gap-3 px-5 py-3 shrink-0 ${className}`}
      style={style}
    >
      {onBack && (
        <button
          onClick={onBack}
          aria-label={backLabel}
          className="flex items-center justify-center shrink-0 transition-opacity active:opacity-60"
          style={{
            width: 40,
            height: 40,
            borderRadius: 12,
            background: 'rgba(255,255,255,0.06)',
            border: '0.75px solid var(--np-border)',
          }}
        >
          <ChevronLeft size={20} color="var(--np-text)" strokeWidth={2} />
        </button>
      )}

      <div className="flex-1 min-w-0">
        <h1
          className="font-bold leading-tight truncate"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.1875rem',
            color: 'var(--np-text)',
            letterSpacing: '-0.02em',
          }}
        >
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm truncate mt-0.5" style={{ color: 'var(--np-text-muted)' }}>
            {subtitle}
          </p>
        )}
      </div>

      {rightElement && <div className="shrink-0">{rightElement}</div>}
    </div>
  );
}
