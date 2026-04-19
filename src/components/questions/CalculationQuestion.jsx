/**
 * CalculationQuestion — exam-style calculation with step-by-step working.
 * Student enters a numeric answer. If wrong, reveals worked solution.
 */
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { CheckCircle, CheckCircle2, XCircle, Lightbulb, Calculator, ChevronRight, ChevronDown } from 'lucide-react'
import { speak } from '../../utils/tts'

const GROWTH_FRAMES = [
  "Getting it wrong is how the memory forms. 🧠",
  "Every mistake is a learning moment.",
  "Physics is hard — you're doing it anyway. 💪",
  "Wrong answers teach more than right ones.",
]

export default function CalculationQuestion({ data, moduleColor, onComplete }) {
  if (!data) return null
  const { equation, steps = [], answer, answerUnit, acceptableRange, commonMistake, senNote, examinerTip } = data
  const [input, setInput] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [revealStep, setRevealStep] = useState(0)
  const [showExample, setShowExample] = useState(false)
  const inputRef = useRef(null)

  // Auto-TTS: read question text on mount if user has opted in
  useEffect(() => {
    if (localStorage.getItem('np_auto_tts') === 'true') {
      const text = data.question || data.text || equation || ''
      if (text) setTimeout(() => speak(text), 400)
    }
  }, []) // eslint-disable-line

  const numericAnswer = parseFloat(input)
  const isCorrect = submitted && (
    acceptableRange
      ? numericAnswer >= acceptableRange[0] && numericAnswer <= acceptableRange[1]
      // When answer === 0 use a small absolute epsilon (2% of 0 = 0 is meaningless)
      : Math.abs(numericAnswer - answer) < (answer === 0 ? 0.001 : Math.abs(answer * 0.02)) || numericAnswer === answer
  )

  const handleSubmit = () => {
    if (input.trim() === '' || submitted) return
    setSubmitted(true)
    const correct = acceptableRange
      ? numericAnswer >= acceptableRange[0] && numericAnswer <= acceptableRange[1]
      // When answer === 0 use a small absolute epsilon (2% of 0 = 0 is meaningless)
      : Math.abs(numericAnswer - answer) < (answer === 0 ? 0.001 : Math.abs(answer * 0.02)) || numericAnswer === answer
    onComplete(correct)
  }

  const handleRevealNext = () => {
    if (revealStep < steps.length) {
      setRevealStep(s => s + 1)
    }
  }

  return (
    <div>
      {/* Equation reminder */}
      <motion.div
        className="flex items-center gap-2 px-4 py-3 rounded-[14px] mb-4"
        style={{ background: `${moduleColor}12`, border: `1px solid ${moduleColor}30` }}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Calculator size={16} color={moduleColor} />
        <span className="text-sm font-bold" style={{ color: moduleColor }}>{equation}</span>
      </motion.div>

      {/* Examiner tip — shown before student submits */}
      {examinerTip && !submitted && (
        <motion.div
          className="flex items-start gap-2 px-4 py-3 rounded-[12px] mb-4"
          style={{ background: 'rgba(99,102,241,0.06)', border: '0.75px solid rgba(99,102,241,0.2)' }}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <Lightbulb size={14} color="#6366f1" style={{ marginTop: 1, flexShrink: 0 }} />
          <p className="text-xs leading-relaxed" style={{ color: '#7dd3fc' }}>
            <span className="font-semibold" style={{ color: '#6366f1' }}>Examiner tip: </span>
            {examinerTip}
          </p>
        </motion.div>
      )}

      {/* SEN: worked example panel */}
      <div className="mb-3">
        <button
          className="w-full flex items-center justify-between px-4 py-3 rounded-[12px] text-sm font-semibold"
          style={{ background: 'rgba(253,199,0,0.07)', border: '0.75px solid rgba(253,199,0,0.25)', color: '#fdc700' }}
          onClick={() => setShowExample(v => !v)}
        >
          <span className="flex items-center gap-2">
            <span>📐</span> See how this type of question works
          </span>
          <ChevronDown size={14} style={{ transform: showExample ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
        </button>

        {showExample && (
          <div className="mt-2 px-4 py-3 rounded-[12px] space-y-2" style={{ background: 'rgba(14,20,36,0.9)', border: '0.75px solid rgba(253,199,0,0.2)' }}>
            <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#fdc700' }}>How to approach this</p>
            <p className="text-xs font-mono" style={{ color: '#f8fafc' }}>Formula: {equation}</p>
            <div className="space-y-1.5 mt-2">
              {steps.map((step, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-xs font-bold shrink-0 mt-0.5" style={{ color: '#fdc700' }}>Step {i+1}.</span>
                  <div>
                    <p className="text-xs font-medium" style={{ color: '#cad5e2' }}>{step.label}</p>
                    <p className="text-xs" style={{ color: '#8899b0' }}>e.g. {step.hint}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Answer input */}
      <div className="mb-4">
        <div
          className="flex items-center gap-2 rounded-[14px] overflow-hidden"
          style={{
            background: submitted
              ? isCorrect ? 'rgba(0,188,125,0.1)' : 'rgba(239,68,68,0.1)'
              : 'rgba(18,26,47,0.9)',
            border: submitted
              ? isCorrect ? '1.5px solid #00bc7d' : '1.5px solid #ef4444'
              : '1px solid #2d3e55',
          }}
        >
          <input
            ref={inputRef}
            type="number"
            inputMode="decimal"
            value={input}
            onChange={e => !submitted && setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            placeholder="Your answer"
            disabled={submitted}
            aria-label="Your numerical answer"
            className="flex-1 bg-transparent px-4 py-4 text-base font-semibold"
            style={{ color: '#f8fafc', WebkitAppearance: 'none', MozAppearance: 'textfield', fontSize: '16px' }}
          />
          {answerUnit && (
            <span className={submitted ? 'text-sm font-semibold' : 'pr-4 text-sm font-semibold'} style={{ color: '#a8b8cc' }}>{answerUnit}</span>
          )}
          {submitted && (
            <span className="pr-3 shrink-0">
              {isCorrect
                ? <CheckCircle2 size={18} color="#22c55e" />
                : <XCircle size={18} color="#ef4444" />}
            </span>
          )}
        </div>

        {!submitted && (
          <motion.button
            className="w-full mt-3 py-3.5 rounded-[14px] font-semibold text-sm"
            style={{
              background: input.trim() ? `${moduleColor}` : 'rgba(18,26,47,0.7)',
              color: input.trim() ? '#fff' : '#8899aa',
              boxShadow: input.trim() ? `0 6px 20px ${moduleColor}40` : 'none',
            }}
            onClick={handleSubmit}
            whileTap={input.trim() ? { scale: 0.97 } : {}}
          >Check answer</motion.button>
        )}
      </div>

      {/* Result feedback */}
      <AnimatePresence>
        {submitted && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
            {/* Correct / incorrect banner */}
            <div
              className="flex items-center gap-2 px-4 py-3 rounded-[12px]"
              style={{
                background: isCorrect ? 'rgba(0,188,125,0.12)' : 'rgba(239,68,68,0.12)',
                border: isCorrect ? '1px solid rgba(0,188,125,0.3)' : '1px solid rgba(239,68,68,0.3)',
              }}
            >
              {isCorrect ? <CheckCircle2 size={20} color="#22c55e" /> : <XCircle size={20} color="#ef4444" />}
              <div>
                <span className="text-sm font-semibold block" style={{ color: isCorrect ? '#00bc7d' : '#ef4444' }}>
                  {isCorrect ? 'Spot on! 🌟' : 'Great attempt — here\'s how to work it out:'}
                </span>
                {!isCorrect && (
                  <span className="text-xs" style={{ color: '#a8b8cc' }}>
                    The answer is {typeof answer === 'number' && Math.abs(answer) >= 1000 ? answer.toLocaleString() : answer}{answerUnit ? ' ' + answerUnit : ''}
                  </span>
                )}
              </div>
            </div>

            {/* Growth framing — only if wrong */}
            {!isCorrect && (
              <p style={{ fontSize: 12, color: '#94a3b8', fontStyle: 'italic', marginTop: 4 }}>
                {GROWTH_FRAMES[Math.floor(Math.random() * GROWTH_FRAMES.length)]}
              </p>
            )}

            {/* Worked solution — only if wrong */}
            {!isCorrect && (
              <div className="rounded-[14px] p-4" style={{ background: 'rgba(18,26,47,0.9)', border: '1px solid #2d3e55' }}>
                <div className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: moduleColor }}>
                  Worked Solution
                </div>
                <div className="space-y-2">
                  {steps.map((step, i) => (
                    <AnimatePresence key={i}>
                      {i < revealStep && (
                        <motion.div
                          className="flex items-start gap-2 px-3 py-2.5 rounded-[10px]"
                          style={{ background: `${moduleColor}08`, border: `0.75px solid ${moduleColor}20` }}
                          initial={{ opacity: 0, x: -10, height: 0 }}
                          animate={{ opacity: 1, x: 0, height: 'auto' }}
                          transition={{ duration: 0.25 }}
                        >
                          <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5"
                            style={{ background: moduleColor, color: '#fff' }}>
                            {i + 1}
                          </span>
                          <div className="flex-1 min-w-0">
                            <span className="text-xs font-semibold" style={{ color: '#cad5e2' }}>{step.label}: </span>
                            <span className="text-sm font-bold" style={{ color: '#f8fafc' }}>{step.value} {step.unit}</span>
                            {step.hint && (
                              <p className="text-[11px] mt-0.5" style={{ color: '#8899aa' }}>{step.hint}</p>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  ))}
                </div>
                {revealStep < steps.length && (
                  <motion.button
                    className="mt-3 flex items-center gap-1.5 px-3 py-2 rounded-[10px] text-xs font-semibold"
                    style={{ background: `${moduleColor}15`, color: moduleColor, border: `1px solid ${moduleColor}30` }}
                    onClick={handleRevealNext}
                    whileTap={{ scale: 0.96 }}
                  >
                    Show step {revealStep + 1}
                    <ChevronRight size={12} />
                  </motion.button>
                )}
              </div>
            )}

            {/* Common mistake callout */}
            {!isCorrect && commonMistake && revealStep >= steps.length && (
              <motion.div
                className="flex items-start gap-2 px-4 py-3 rounded-[12px]"
                style={{ background: 'rgba(239,68,68,0.06)', border: '0.75px solid rgba(239,68,68,0.2)' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <XCircle size={14} color="#ef4444" style={{ marginTop: 1, flexShrink: 0 }} />
                <p className="text-xs leading-relaxed" style={{ color: '#ef9a9a' }}>{commonMistake}</p>
              </motion.div>
            )}

            {/* Examiner tip — shown again in reveal when wrong */}
            {!isCorrect && examinerTip && revealStep >= steps.length && (
              <motion.div
                className="flex items-start gap-2 px-4 py-3 rounded-[12px]"
                style={{ background: 'rgba(99,102,241,0.06)', border: '0.75px solid rgba(99,102,241,0.2)' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Lightbulb size={14} color="#6366f1" style={{ marginTop: 1, flexShrink: 0 }} />
                <p className="text-xs leading-relaxed" style={{ color: '#7dd3fc' }}>
                  <span className="font-semibold" style={{ color: '#6366f1' }}>Examiner tip: </span>
                  {examinerTip}
                </p>
              </motion.div>
            )}

            {/* SEN note */}
            {senNote && (
              <motion.div
                className="flex items-start gap-2 px-4 py-3 rounded-[12px]"
                style={{ background: 'rgba(253,199,0,0.07)', border: '0.75px solid rgba(253,199,0,0.25)' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Lightbulb size={14} color="#fdc700" style={{ marginTop: 1, flexShrink: 0 }} />
                <p className="text-xs leading-relaxed" style={{ color: '#fdc700' }}>{senNote}</p>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
