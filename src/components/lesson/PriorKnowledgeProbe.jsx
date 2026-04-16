/**
 * PriorKnowledgeProbe — Step 3
 * Activates existing schemas and quietly flags misconceptions before
 * concept instruction — without reinforcing them.
 * Research: CLT prior knowledge activation; Rosenshine Principle 1;
 * autistic learners benefit from explicit "where is this going?" maps.
 */
import { motion, AnimatePresence } from 'motion/react'
import { useState } from 'react'
import { ChevronRight, Map, CheckCircle2, XCircle } from 'lucide-react'
import { useMamoReaction } from '../../context/MamoContext'
import { useSound } from '../../hooks/useSound'

export default function PriorKnowledgeProbe({ probe, moduleColor, topicMapHint, onComplete, onWrongAnswer, alreadyCompleted = false }) {
  if (!probe || !probe.questions?.length) { onComplete?.(); return null }
  const { questions } = probe
  const [qIndex, setQIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [showFeedback, setShowFeedback] = useState(false)
  // If coming back to this step after completing it, skip straight to done view
  const [done, setDone] = useState(alreadyCompleted)
  const triggerReaction = useMamoReaction()
  const { playCorrect, playWrong } = useSound()

  const current = questions[qIndex]

  const handleSelect = (idx) => {
    if (selected !== null) return
    setSelected(idx)
    setShowFeedback(true)
    triggerReaction(idx === current.correct ? 'correct' : 'wrong')
    if (idx === current.correct) {
      playCorrect()
    } else {
      playWrong()
    }
    if (idx !== current.correct && onWrongAnswer) {
      onWrongAnswer()
    }
  }

  const handleNext = () => {
    if (qIndex + 1 < questions.length) {
      setQIndex(i => i + 1)
      setSelected(null)
      setShowFeedback(false)
    } else {
      setDone(true)
    }
  }

  if (done) {
    return (
      <motion.div
        className="px-5 py-6 flex flex-col gap-5"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Topic map */}
        {topicMapHint && (
          <div
            className="rounded-[18px] px-4 py-4"
            style={{
              background: `${moduleColor}10`,
              border: `1px solid ${moduleColor}30`,
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Map size={13} color={moduleColor} />
              <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: moduleColor }}>
                Where this fits
              </span>
            </div>
            <div className="flex flex-col gap-1.5">
              {topicMapHint.before && topicMapHint.before.length > 0 && (
                <div className="flex items-start gap-2">
                  <span className="text-[10px] font-bold mt-0.5 shrink-0" style={{ color: 'rgba(255,255,255,0.3)' }}>BEFORE</span>
                  <div className="flex flex-wrap gap-1">
                    {topicMapHint.before.map((t, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.4)' }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold shrink-0" style={{ color: moduleColor }}>TODAY</span>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ background: `${moduleColor}25`, color: moduleColor }}>
                  {topicMapHint.current}
                </span>
              </div>
              {topicMapHint.after && topicMapHint.after.length > 0 && (
                <div className="flex items-start gap-2">
                  <span className="text-[10px] font-bold mt-0.5 shrink-0" style={{ color: 'rgba(255,255,255,0.3)' }}>NEXT</span>
                  <div className="flex flex-wrap gap-1">
                    {topicMapHint.after.map((t, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.4)' }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
          Good — that's what you're building on. Now let's add the new piece.
        </p>

        <motion.button
          className="font-display w-full py-4 rounded-[16px] font-bold text-sm"
          style={{
            minHeight: 56,
            background: `linear-gradient(135deg, ${moduleColor}, ${moduleColor}bb)`,
            boxShadow: `0 6px 0 rgba(0,0,0,0.25), 0 12px 28px ${moduleColor}35`,
            color: '#fff',
          }}
          onClick={() => { triggerReaction('complete'); onComplete() }}
          whileTap={{ y: 4, boxShadow: `0 2px 0 rgba(0,0,0,0.15), 0 4px 10px ${moduleColor}20` }}
        >
          See it in action
          <span className="ml-2">→</span>
        </motion.button>
      </motion.div>
    )
  }

  return (
    <div className="px-5 py-5">
      {/* Step counter */}
      <div className="flex items-center gap-1.5 mb-5">
        <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.35)' }}>
          Quick recall — {qIndex + 1} of {questions.length}
        </span>
        <div className="flex-1 h-px ml-1" style={{ background: 'rgba(255,255,255,0.08)' }} />
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={qIndex}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.2 }}
        >
          <p className="font-display text-base font-semibold mb-5 leading-snug" style={{ color: '#f8fafc' }}>
            {current.question}
          </p>

          <div className="flex flex-col gap-2 mb-4">
            {current.answers.map((ans, i) => {
              const isSelected = selected === i
              const isCorrect = i === current.correct
              const bg = showFeedback
                ? isCorrect
                  ? 'rgba(34,197,94,0.15)'
                  : isSelected
                    ? 'rgba(239,68,68,0.1)'
                    : 'rgba(255,255,255,0.03)'
                : 'rgba(255,255,255,0.04)'
              const border = showFeedback
                ? isCorrect
                  ? '1px solid rgba(34,197,94,0.5)'
                  : isSelected
                    ? '1px solid rgba(239,68,68,0.35)'
                    : '1px solid rgba(255,255,255,0.07)'
                : '1px solid rgba(255,255,255,0.1)'

              const showIcon = showFeedback && (isCorrect || isSelected)
              return (
                <button
                  key={i}
                  className="font-display w-full text-left px-4 py-3.5 rounded-[14px] text-sm"
                  style={{ background: bg, border, color: '#cad5e2', minHeight: 44, transition: 'background 0.2s, border 0.2s' }}
                  onClick={() => handleSelect(i)}
                >
                  <span className="flex items-center gap-2">
                    {showIcon && isCorrect && <CheckCircle2 size={15} color="#4ade80" style={{ flexShrink: 0 }} />}
                    {showIcon && !isCorrect && isSelected && <XCircle size={15} color="#ef4444" style={{ flexShrink: 0 }} />}
                    <span>{ans}</span>
                  </span>
                </button>
              )
            })}
          </div>

          {/* Feedback + answer reveal */}
          <AnimatePresence>
            {showFeedback && (
              <motion.div
                className="flex flex-col gap-2 mb-4"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {selected !== current.correct && (
                  <div
                    className="rounded-[14px] px-4 py-3"
                    style={{
                      background: 'rgba(34,197,94,0.08)',
                      border: '1px solid rgba(34,197,94,0.3)',
                    }}
                  >
                    <p className="text-xs font-bold mb-0.5" style={{ color: '#4ade80' }}>Correct answer</p>
                    <p className="text-sm font-semibold" style={{ color: '#f8fafc' }}>
                      {current.answers[current.correct]}
                    </p>
                  </div>
                )}
                <div
                  className="rounded-[14px] px-4 py-3"
                  style={{
                    background: selected === current.correct
                      ? 'rgba(34,197,94,0.08)'
                      : 'rgba(99,102,241,0.1)',
                    border: selected === current.correct
                      ? '1px solid rgba(34,197,94,0.25)'
                      : '1px solid rgba(99,102,241,0.3)',
                  }}
                >
                  <p className="text-xs leading-relaxed" style={{
                    color: selected === current.correct ? '#4ade80' : '#a5b4fc'
                  }}>
                    {current.feedback}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {showFeedback && (
            <motion.button
              className="font-display w-full py-4 rounded-[16px] font-bold text-sm flex items-center justify-center gap-2 sticky bottom-4"
              style={{
                minHeight: 56,
                background: `linear-gradient(135deg, ${moduleColor}, ${moduleColor}bb)`,
                boxShadow: `0 6px 0 rgba(0,0,0,0.25), 0 12px 28px ${moduleColor}35`,
                color: '#fff',
              }}
              onClick={handleNext}
              whileTap={{ y: 4, boxShadow: `0 2px 0 rgba(0,0,0,0.15), 0 4px 10px ${moduleColor}20` }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {qIndex + 1 < questions.length ? 'Next question' : 'See where this fits'}
              <ChevronRight size={16} strokeWidth={2.5} />
            </motion.button>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
