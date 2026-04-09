/**
 * WorkedExampleStepper — Step 5
 * Concept Rep->Abstract + Misconception Refuter.
 *
 * Research:
 * - CRA symbolic stage: full worked example before ANY independent attempt
 * - Self-explanation effect (Chi, Rittle-Johnson): annotating WHY each step is
 *   done dramatically increases retention over just showing the answer
 * - Misconception sequence: correct concept -> name misconception -> refute immediately
 *   Never name misconception without the refutation following on the same screen
 * - Worked example effect: 2+ worked examples to 1 practice attempt for novice learners
 */
import { motion, AnimatePresence } from 'motion/react'
import { useState } from 'react'
import { ChevronRight, AlertTriangle, CheckCircle2 } from 'lucide-react'

function StepBubble({ number, color }) {
  return (
    <div
      className="w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold shrink-0"
      style={{
        background: `linear-gradient(135deg, ${color}, ${color}cc)`,
        color: '#fff',
        boxShadow: `0 4px 12px ${color}40`,
      }}
    >
      {number}
    </div>
  )
}

export default function WorkedExampleStepper({ workedExample, moduleColor, onComplete }) {
  const { title, equation, context, steps, misconceptionAfter } = workedExample
  const [revealed, setRevealed] = useState(0)
  const [showMisconception, setShowMisconception] = useState(false)
  const [misconceptionDone, setMisconceptionDone] = useState(false)

  const allStepsRevealed = revealed >= steps.length

  const revealNext = () => {
    if (revealed < steps.length) {
      setRevealed(r => r + 1)
    } else if (misconceptionAfter && !showMisconception) {
      setShowMisconception(true)
    }
  }

  return (
    <div className="px-5 py-5 flex flex-col gap-4">

      {/* Title + equation banner */}
      <div
        className="rounded-[18px] overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${moduleColor}22, ${moduleColor}08, rgba(8,15,30,0.6))`,
          border: `1.5px solid ${moduleColor}40`,
          borderTop: `3px solid ${moduleColor}`,
        }}
      >
        <div className="px-4 pt-4 pb-3" style={{ minHeight: 100 }}>
          <div className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: moduleColor }}>
            Worked Example
          </div>
          <div className="text-base font-bold" style={{ color: '#f8fafc', letterSpacing: '-0.02em' }}>
            {title}
          </div>
          {context && (
            <p className="text-xs mt-1.5 leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>
              {context}
            </p>
          )}
          <div
            className="mt-3 px-4 py-3 rounded-[12px] font-mono font-bold"
            style={{
              background: 'rgba(0,0,0,0.35)',
              color: moduleColor,
              fontSize: 15,
              boxShadow: `0 0 20px ${moduleColor}25`,
              border: `1px solid ${moduleColor}30`,
            }}
          >
            {equation}
          </div>
        </div>
      </div>

      {/* Steps */}
      <div className="flex flex-col gap-2.5">
        <AnimatePresence initial={false}>
          {steps.slice(0, revealed).map((step, i) => (
            <motion.div
              key={i}
              className="rounded-[16px] overflow-hidden"
              style={{ border: `1px solid ${moduleColor}30` }}
              initial={{ opacity: 0, y: 14, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Action row */}
              <div
                className="flex items-center gap-3 px-4 py-3"
                style={{ background: `${moduleColor}14` }}
              >
                <StepBubble number={step.step} color={moduleColor} />
                <span className="text-sm font-semibold" style={{ color: moduleColor }}>
                  {step.action}
                </span>
              </div>
              {/* Content + annotation */}
              <div className="px-4 py-4" style={{ background: 'rgba(255,255,255,0.025)' }}>
                <div
                  className="text-sm font-bold font-mono mb-3"
                  style={{ color: '#f8fafc' }}
                >
                  {step.content}
                </div>
                <div
                  className="text-xs leading-relaxed px-4 py-3 rounded-[10px]"
                  style={{
                    background: 'rgba(253,199,0,0.08)',
                    borderLeft: '3px solid rgba(253,199,0,0.5)',
                    color: 'rgba(253,199,0,0.85)',
                  }}
                >
                  {step.annotation}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Misconception refuter - only shown after all steps revealed */}
      <AnimatePresence>
        {showMisconception && misconceptionAfter && (
          <motion.div
            className="rounded-[18px] overflow-hidden"
            style={{ border: '1px solid rgba(239,68,68,0.2)' }}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Wrong claim */}
            <div
              className="px-4 py-4 flex items-start gap-3"
              style={{
                background: 'rgba(239,68,68,0.09)',
                borderBottom: '1px solid rgba(239,68,68,0.18)',
              }}
            >
              <div style={{ boxShadow: '0 0 12px rgba(239,68,68,0.3)', borderRadius: 999, flexShrink: 0, marginTop: 2 }}>
                <AlertTriangle size={16} color="#f87171" />
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest mb-1.5" style={{ color: '#f87171' }}>
                  Common misconception
                </div>
                <p className="text-sm font-semibold leading-snug" style={{ color: '#fca5a5' }}>
                  "{misconceptionAfter.claim}"
                </p>
              </div>
            </div>

            {/* Divider with label */}
            <div
              className="flex items-center gap-3 px-4 py-2"
              style={{ background: 'rgba(0,0,0,0.2)' }}
            >
              <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.07)' }} />
              <span className="text-[9px] font-bold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.2)' }}>
                Reality
              </span>
              <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.07)' }} />
            </div>

            {/* Refutation */}
            <div
              className="px-4 py-4 flex items-start gap-3"
              style={{ background: 'rgba(34,197,94,0.07)' }}
            >
              <div style={{ boxShadow: '0 0 12px rgba(34,197,94,0.25)', borderRadius: 999, flexShrink: 0, marginTop: 2 }}>
                <CheckCircle2 size={16} color="#4ade80" />
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest mb-1.5" style={{ color: '#4ade80' }}>
                  Here's why that's wrong
                </div>
                <p className="text-sm leading-relaxed" style={{ color: '#86efac' }}>
                  {misconceptionAfter.reality}
                </p>
                {misconceptionAfter.visual && (
                  <p className="text-xs mt-2 leading-relaxed" style={{ color: 'rgba(134,239,172,0.65)' }}>
                    Think of it this way: {misconceptionAfter.visual}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action button */}
      {!misconceptionDone && (
        <motion.button
          className="w-full rounded-[16px] font-bold text-sm flex items-center justify-center gap-2"
          style={{
            paddingTop: 18,
            paddingBottom: 18,
            background: !allStepsRevealed || (misconceptionAfter && !showMisconception)
              ? `linear-gradient(135deg, ${moduleColor}, ${moduleColor}bb)`
              : 'rgba(255,255,255,0.06)',
            boxShadow: !allStepsRevealed ? `0 8px 28px ${moduleColor}35` : 'none',
            color: '#fff',
            border: allStepsRevealed && (!misconceptionAfter || showMisconception)
              ? '1px solid rgba(255,255,255,0.15)'
              : 'none',
          }}
          onClick={() => {
            if (!allStepsRevealed) {
              revealNext()
            } else if (misconceptionAfter && !showMisconception) {
              setShowMisconception(true)
            } else {
              setMisconceptionDone(true)
              onComplete()
            }
          }}
          whileTap={{ scale: 0.97 }}
        >
          {!allStepsRevealed
            ? `Reveal step ${revealed + 1}`
            : misconceptionAfter && !showMisconception
              ? 'See a common mistake'
              : 'I understand this - let me try'}
          <ChevronRight size={16} strokeWidth={2.5} />
        </motion.button>
      )}
    </div>
  )
}
