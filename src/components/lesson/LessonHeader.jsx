import { motion } from 'motion/react'
import { ArrowLeft, X } from '@phosphor-icons/react'

/**
 * Lesson header — under 65px tall (excl. safe-area inset).
 * Progress bar: single smooth fill, absolute at top edge.
 * Layout: X/back | title + context line | nothing on right.
 */
export default function LessonHeader({
  step,
  totalSteps,
  currentStep,
  topic,
  onBack,
  remainingMinutes,
}) {
  const pct = Math.round(((step + 1) / totalSteps) * 100)
  const isLast = step === totalSteps - 1

  return (
    <header
      className="shrink-0 sticky top-0 z-10"
      style={{
        position: 'relative',
        background: 'rgba(7,17,29,0.90)',
        backdropFilter: 'blur(10px) saturate(130%)',
        WebkitBackdropFilter: 'blur(10px) saturate(130%)',
        borderBottom: '0.75px solid var(--np-border)',
        paddingTop: 'max(10px, env(safe-area-inset-top, 0px))',
        paddingInline: 20,
        paddingBottom: 10,
      }}
    >
      {/* Single smooth progress bar — absolute at top edge, no layout space */}
      <div
        aria-hidden="true"
        style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'rgba(255,255,255,0.06)' }}
      >
        <motion.div
          style={{ height: '100%', background: 'var(--np-accent)', borderRadius: '0 999px 999px 0' }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      {/* Single row: back/X | title block */}
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          aria-label={step > 0 ? 'Previous step' : 'Exit lesson'}
          style={{
            width: 34, height: 34, borderRadius: 10, flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'var(--surface-quiet)',
            border: '0.75px solid var(--np-border)',
            cursor: 'pointer',
          }}
        >
          {step > 0
            ? <ArrowLeft size={15} color="rgba(255,255,255,0.5)" weight="bold" />
            : <X size={15} color="rgba(255,255,255,0.5)" weight="bold" />
          }
        </button>

        <div className="flex-1 min-w-0">
          <h1
            className="font-display"
            style={{ fontSize: 15, fontWeight: 700, lineHeight: 1.2, color: 'var(--np-text)', letterSpacing: '-0.02em', wordBreak: 'break-word' }}
          >
            {topic.title}
          </h1>
          {currentStep?.label && (
            <div style={{ fontSize: 11, lineHeight: 1.2, color: 'var(--np-text-muted)', marginTop: 2 }}>
              {currentStep?.label}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
