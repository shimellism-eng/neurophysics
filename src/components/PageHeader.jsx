/**
 * PageHeader — unified sticky frosted-glass header for secondary screens.
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
import { ChevronLeft } from 'lucide-react'

export default function PageHeader({ title, subtitle, onBack, rightSlot }) {
  return (
    <div
      className="flex items-center gap-3 px-5 pt-5 pb-4 sticky top-0 z-10 shrink-0"
      style={{
        background: 'var(--np-card-deep)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '0.75px solid var(--np-border)',
        paddingTop: '12px',
      }}
    >
      {onBack && (
        <button
          className="w-11 h-11 rounded-[12px] flex items-center justify-center shrink-0"
          style={{ background: 'rgba(255,255,255,0.07)', border: '0.75px solid var(--np-border)' }}
          onClick={onBack}
          aria-label="Go back"
        >
          <ChevronLeft size={18} color="#a8b8cc" />
        </button>
      )}

      <div className="flex-1 min-w-0">
        {typeof title === 'string' ? (
          <div
            className="font-display font-bold"
            style={{ color: 'var(--np-text)', fontSize: 18, letterSpacing: '-0.02em' }}
          >
            {title}
          </div>
        ) : (
          title
        )}
        {subtitle != null && (
          typeof subtitle === 'string' ? (
            <div className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>
              {subtitle}
            </div>
          ) : (
            subtitle
          )
        )}
      </div>

      {rightSlot}
    </div>
  )
}
