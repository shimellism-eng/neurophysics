import { motion } from 'motion/react'
import { ArrowLeft, X } from '@phosphor-icons/react'

/**
 * Minimal lesson header — ≤65px tall.
 * Back/X | Topic title | nothing on right
 * Smooth 3px progress bar
 * "Step label · About X min left" context line
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
        background: 'var(--np-card-deep)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '0.75px solid var(--np-border)',
        paddingTop: 'max(10px, env(safe-area-inset-top, 0px))',
        paddingInline: 20,
        paddingBottom: 10,
      }}
    >
      {/* Row 1: back | title | settings */}
      <div className="flex items-center gap-3" style={{ marginBottom: 9 }}>
        <button
          onClick={onBack}
          aria-label={step > 0 ? 'Previous step' : 'Exit lesson'}
          style={{
            width: 38, height: 38, borderRadius: 10, flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(255,255,255,0.05)',
            border: '0.75px solid var(--np-border)',
            cursor: 'pointer',
          }}
        >
          {step > 0
            ? <ArrowLeft size={16} color="rgba(255,255,255,0.5)" weight="bold" />
            : <X size={16} color="rgba(255,255,255,0.5)" weight="bold" />
          }
        </button>

        <h1
          className="font-display font-bold flex-1"
          style={{
            fontSize: 15,
            lineHeight: 1.25,
            color: 'var(--np-text)',
            letterSpacing: '-0.02em',
            wordBreak: 'break-word',
          }}
        >
          {topic.title}
        </h1>

      </div>

      {/* Segmented pill progress */}
      <div className="flex gap-1" style={{ marginBottom: 7 }}>
        {Array.from({ length: totalSteps }).map((_, i) => {
          const isCompleted = i < step
          const isCurrent   = i === step
          return (
            <motion.div
              key={i}
              style={{
                flex: isCurrent ? 2 : 1,
                height: 4,
                borderRadius: 999,
                background: isCompleted ? topic.moduleColor
                  : isCurrent ? topic.moduleColor
                  : 'rgba(255,255,255,0.1)',
                opacity: isCompleted ? 0.6 : isCurrent ? 1 : 1,
              }}
              animate={{ flex: isCurrent ? 2 : 1 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            />
          )
        })}
      </div>

      {/* Context line */}
      <div style={{ fontSize: 11, lineHeight: 1, color: 'rgba(255,255,255,0.38)' }}>
        <span style={{ color: topic.moduleColor, fontWeight: 600 }}>{currentStep.label}</span>
        {!isLast && remainingMinutes > 0 && (
          <span> · About {remainingMinutes} min left</span>
        )}
      </div>
    </header>
  )
}
