/**
 * PageHeader — unified compact iPhone header for secondary screens.
 *
 * Research basis:
 *   - Predictable navigation anchor: autism UX requirement (UXPA Designing for Autism)
 *   - Persistent chrome location: ADHD executive function support (Din Studio)
 *   - 44×44px back button: WCAG 2.5.5 Target Size
 *
 * Props:
 *   title     {string | ReactNode}  — screen title (string gets styled automatically)
 *   subtitle  {string | ReactNode}  — secondary line below title (optional)
 *   onBack    {function}            — back button handler; omit to hide back button
 *   rightSlot {ReactNode}           — optional element(s) pinned to the right
 */
import { CaretLeft } from '@phosphor-icons/react'

export default function PageHeader({
  title,
  subtitle,
  onBack,
  backLabel = 'Go back',
  rightSlot,
  rightElement,
  sticky = true,
  className = '',
  style,
}) {
  const actionSlot = rightSlot ?? rightElement

  return (
    <div
      className={[
        'flex items-center gap-3 px-5 py-3 z-10 shrink-0',
        sticky ? 'sticky top-0' : '',
        className,
      ].filter(Boolean).join(' ')}
      style={{
        background: 'rgba(8,15,30,0.72)',
        backdropFilter: 'blur(12px) saturate(180%)',
        WebkitBackdropFilter: 'blur(12px) saturate(180%)',
        borderBottom: '0.75px solid var(--np-border)',
        minHeight: 64,
        ...style,
      }}
    >
      {onBack && (
        <button
          className="w-11 h-11 rounded-[12px] flex items-center justify-center shrink-0 active:opacity-75"
          style={{ background: 'rgba(255,255,255,0.07)', border: '0.75px solid var(--np-border)' }}
          onClick={onBack}
          aria-label={backLabel}
        >
          <CaretLeft size={18} color="var(--np-text-muted)" weight="bold" />
        </button>
      )}

      <div className="flex-1 min-w-0">
        {typeof title === 'string' ? (
          <div
            className="font-display font-bold truncate"
            style={{ color: 'var(--np-text)', fontSize: 18 }}
          >
            {title}
          </div>
        ) : (
          title
        )}
        {subtitle != null && (
          typeof subtitle === 'string' ? (
            <div className="text-xs mt-0.5 truncate" style={{ color: 'var(--np-text-muted)' }}>
              {subtitle}
            </div>
          ) : (
            subtitle
          )
        )}
      </div>

      {actionSlot}
    </div>
  )
}
