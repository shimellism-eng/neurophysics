/**
 * WorkedExampleStepper — Step 5
 * Concept Rep→Abstract + Misconception Refuter.
 *
 * Research:
 * - CRA symbolic stage: full worked example before ANY independent attempt
 * - Self-explanation effect (Chi, Rittle-Johnson): annotating WHY each step is
 *   done dramatically increases retention over just showing the answer
 * - Misconception sequence: correct concept → name misconception → refute immediately
 *   Never name misconception without the refutation following on the same screen
 * - Worked example effect: 2+ worked examples to 1 practice attempt for novice learners
 */
import { motion, AnimatePresence } from 'motion/react'
import { useState } from 'react'
import { ChevronRight, AlertTriangle, CheckCircle2 } from 'lucide-react'

function StepBubble({ number, color }) {
  return (
    <div
      className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0"
      style={{ background: color, color: '#fff' }}
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
        className="rounded-[18px] px-4 py-4"
        style={{
          background: `linear-gradient(135deg, ${moduleColor}18, ${moduleColor}06)`,
          border: `1.5px solid ${moduleColor}35`,
        }}
      >
        <div className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: moduleColor }}>
          Worked Example
        </div>
        <div className="text-base font-bold" style={{ color: '#f8fafc', letterSpacing: '-0.01em' }}>
          {title}
        </div>
        <div
          className="mt-2 px-3 py-2 rounded-[10px] text-sm font-mono font-bold"
          style={{ background: 'rgba(0,0,0,0.3)', color: moduleColor }}
        >
          {equation}
        </div>
        {context && (
          <p className="text-xs mt-2 leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
            {context}
          </p>
        )}
      </div>

      {/* Steps */}
      <div className="flex flex-col gap-2">
        <AnimatePresence initial={false}>
          {steps.slice(0, revealed).map((step, i) => (
            <motion.div
              key={i}
              className="rounded-[14px] overflow-hidden"
              style={{ border: `1px solid ${moduleColor}25` }}
              initial={{ opacity: 0, y: 10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Action row */}
              <div
                className="flex items-center gap-3 px-3 py-2.5"
                style={{ background: `${moduleColor}10` }}
              >
                <StepBubble number={step.step} color={moduleColor} />
                <span className="text-xs font-semibold" style={{ color: moduleColor }}>
                  {step.action}
                </span>
              </div>
              {/* Content + annotation */}
              <div className="px-3 py-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                <div
                  className="text-sm font-bold font-mono mb-2"
                  style={{ color: '#f8fafc' }}
                >
                  {step.content}
                </div>
                <div
                  className="text-xs leading-relaxed px-3 py-2 rounded-[8px]"
                  style={{
                    background: 'rgba(253,199,0,0.06)',
                    borderLeft: '2px solid rgba(253,199,0,0.4)',
                    color: 'rgba(253,199,0,0.8)',
                  }}
                >
                  💡 {step.annotation}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Misconception refuter — only shown after all steps revealed */}
      <AnimatePresence>
        {showMisconception && misconceptionAfter && (
          <motion.div
            className="rounded-[18px] overflow-hidden"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            {/* Wrong claim */}
            <div
              className="px-4 py-3 flex items-start gap-3"
              style={{ background: 'rgba(239,68,68,0.08)', borderBottom: '1px solid rgba(239,68,68,0.15)' }}
            >
              <AlertTriangle size={15} color="#f87171" style={{ marginTop: 1, flexShrink: 0 }} />
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: '#f87171' }}>
                  Common misconception
                </div>
                <p className="text-sm font-semibold" style={{ color: '#fca5a5' }}>
                  "{misconceptionAfter.claim}"
                </p>
              </div>
            </div>
            {/* Refutation */}
            <div
              className="px-4 py-3 flex items-start gap-3"
              style={{ background: 'rgba(34,197,94,0.07)' }}
            >
              <CheckCircle2 size={15} color="#4ade80" style={{ marginTop: 1, flexShrink: 0 }} />
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: '#4ade80' }}>
                  Here's why that's wrong
                </div>
                <p className="text-sm leading-relaxed" style={{ color: '#86efac' }}>
                  {misconceptionAfter.reality}
                </p>
                {misconceptionAfter.visual && (
                  <p className="text-xs mt-1.5" style={{ color: 'rgba(134,239,172,0.7)' }}>
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
          className="w-full py-4 rounded-[16px] font-bold text-sm flex items-center justify-center gap-2"
          style={{
            background: !allStepsRevealed || (misconceptionAfter && !showMisconception)
              ? `linear-gradient(135deg, ${moduleColor}, ${moduleColor}bb)`
              : 'rgba(255,255,255,0.06)',
            boxShadow: !allStepsRevealed ? `0 8px 24px ${moduleColor}30` : 'none',
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
            ? `Show step ${revealed + 1} of ${steps.length}`
            : misconceptionAfter && !showMisconception
              ? 'See a common mistake'
              : "I understand this — let me try"}
          <ChevronRight size={16} strokeWidth={2.5} />
        </motion.button>
      )}
    </div>
  )
}
