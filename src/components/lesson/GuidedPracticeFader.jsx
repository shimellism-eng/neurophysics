/**
 * GuidedPracticeFader — Step 6
 * Three tiers of progressively independent practice.
 * The most common failure point for SEN learners is the cliff-edge jump from
 * full worked example to independent problem. Fading removes this cliff.
 *
 * Research:
 * - Fading effect (Sweller): gradually remove scaffolding
 * - Rosenshine 80% success rate: learners need success at each tier before progressing
 * - ADHD: hint button without penalty critical — shame avoidance blocks help-seeking
 * - Dyscalculia: "check my method" process feedback (not just answer) prevents
 *   iterating on the wrong method without realising it
 */
import { motion, AnimatePresence } from 'motion/react'
import { useState, useRef } from 'react'
import { ChevronRight, Lightbulb, CheckCircle2, XCircle, Star } from 'lucide-react'

function NumericInput({ value, onChange, unit, placeholder = 'Your answer', disabled }) {
  return (
    <div
      className="flex items-center rounded-[14px] overflow-hidden"
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.12)',
      }}
    >
      <input
        type="number"
        inputMode="decimal"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className="flex-1 bg-transparent px-4 py-4 text-base font-semibold outline-none"
        style={{ color: '#f8fafc', WebkitAppearance: 'none', MozAppearance: 'textfield' }}
      />
      {unit && (
        <span className="pr-4 text-sm font-bold" style={{ color: 'rgba(255,255,255,0.4)' }}>
          {unit}
        </span>
      )}
    </div>
  )
}

function FeedbackBanner({ correct, correctAnswer, answerUnit, moduleColor }) {
  return (
    <motion.div
      className="flex items-center gap-3 px-4 py-3 rounded-[14px]"
      style={{
        background: correct ? 'rgba(34,197,94,0.12)' : 'rgba(99,102,241,0.12)',
        border: correct
          ? '1px solid rgba(34,197,94,0.35)'
          : '1px solid rgba(99,102,241,0.3)',
      }}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {correct
        ? <CheckCircle2 size={18} color="#4ade80" />
        : <XCircle size={18} color="#a5b4fc" />
      }
      <div>
        <div className="text-sm font-bold" style={{ color: correct ? '#4ade80' : '#a5b4fc' }}>
          {correct ? 'Correct!' : `The answer is ${correctAnswer} ${answerUnit || ''}`}
        </div>
        {!correct && (
          <div className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>
            That's fine — the next tier gives you a bit more support.
          </div>
        )}
      </div>
    </motion.div>
  )
}

// ─── TIER 1: Completion problem ──────────────────────────────────────────────
function Tier1({ data, moduleColor, onComplete }) {
  const { question, allSteps, missingStep, missingHint, answer, answerUnit } = data
  const [input, setInput] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const numAnswer = parseFloat(input)
  const isCorrect = submitted && Math.abs(numAnswer - answer) < Math.abs(answer * 0.03 + 0.01)

  return (
    <div className="flex flex-col gap-4">
      <div
        className="rounded-[16px] px-4 py-3"
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
      >
        <div className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: moduleColor }}>
          Tier 1 — Complete the last step
        </div>
        <p className="text-sm leading-relaxed" style={{ color: '#f8fafc' }}>{question}</p>
      </div>

      {/* All steps shown, last one is missing */}
      <div className="flex flex-col gap-2">
        {allSteps.map((step, i) => (
          <div
            key={i}
            className="flex items-center gap-3 px-3 py-2.5 rounded-[12px]"
            style={{
              background: i === missingStep ? `${moduleColor}10` : 'rgba(255,255,255,0.03)',
              border: i === missingStep ? `1px dashed ${moduleColor}50` : '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <div
              className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0"
              style={{ background: i === missingStep ? moduleColor : 'rgba(255,255,255,0.08)', color: '#fff' }}
            >
              {i + 1}
            </div>
            <span className="text-xs" style={{ color: i === missingStep ? moduleColor : 'rgba(255,255,255,0.5)' }}>
              {i === missingStep ? missingHint : step}
            </span>
          </div>
        ))}
      </div>

      <NumericInput
        value={input}
        onChange={setInput}
        unit={answerUnit}
        disabled={submitted}
      />

      {!submitted ? (
        <motion.button
          className="w-full py-3.5 rounded-[14px] font-bold text-sm"
          style={{
            background: input.trim()
              ? `linear-gradient(135deg, ${moduleColor}, ${moduleColor}cc)`
              : 'rgba(255,255,255,0.05)',
            color: input.trim() ? '#fff' : 'rgba(255,255,255,0.3)',
          }}
          onClick={() => input.trim() && setSubmitted(true)}
          whileTap={input.trim() ? { scale: 0.97 } : {}}
        >
          Check
        </motion.button>
      ) : (
        <div className="flex flex-col gap-3">
          <FeedbackBanner
            correct={isCorrect}
            correctAnswer={answer}
            answerUnit={answerUnit}
            moduleColor={moduleColor}
          />
          <motion.button
            className="w-full py-4 rounded-[16px] font-bold text-sm flex items-center justify-center gap-2"
            style={{
              background: `linear-gradient(135deg, ${moduleColor}, ${moduleColor}bb)`,
              color: '#fff',
            }}
            onClick={() => onComplete(isCorrect)}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Next tier
            <ChevronRight size={16} strokeWidth={2.5} />
          </motion.button>
        </div>
      )}
    </div>
  )
}

// ─── TIER 2: Partial scaffold ────────────────────────────────────────────────
function Tier2({ data, moduleColor, onComplete }) {
  const { question, shownEquation, shownStep1, hint, answer, answerUnit } = data
  const [input, setInput] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [hintShown, setHintShown] = useState(false)

  const numAnswer = parseFloat(input)
  const isCorrect = submitted && Math.abs(numAnswer - answer) < Math.abs(answer * 0.03 + 0.01)

  return (
    <div className="flex flex-col gap-4">
      <div
        className="rounded-[16px] px-4 py-3"
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
      >
        <div className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: moduleColor }}>
          Tier 2 — Equation given, you work it out
        </div>
        <p className="text-sm leading-relaxed" style={{ color: '#f8fafc' }}>{question}</p>
      </div>

      {/* Partial scaffold */}
      <div className="flex flex-col gap-2">
        <div
          className="px-3 py-2.5 rounded-[12px] text-xs font-mono font-bold"
          style={{ background: `${moduleColor}10`, border: `1px solid ${moduleColor}25`, color: moduleColor }}
        >
          {shownEquation}
        </div>
        <div
          className="px-3 py-2.5 rounded-[12px] text-xs"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.55)' }}
        >
          {shownStep1}
        </div>
        <div
          className="px-3 py-2 rounded-[12px] text-xs"
          style={{ background: 'rgba(255,255,255,0.02)', border: '1px dashed rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.3)' }}
        >
          Your turn — substitute and calculate…
        </div>
      </div>

      <NumericInput
        value={input}
        onChange={setInput}
        unit={answerUnit}
        disabled={submitted}
      />

      {/* Hint button — no penalty */}
      {!submitted && !hintShown && (
        <button
          className="flex items-center justify-center gap-1.5 py-2.5 rounded-[12px] text-xs font-semibold"
          style={{
            background: 'rgba(253,199,0,0.07)',
            border: '1px solid rgba(253,199,0,0.25)',
            color: '#fdc700',
          }}
          onClick={() => setHintShown(true)}
        >
          <Lightbulb size={12} />
          I need a hint
        </button>
      )}

      <AnimatePresence>
        {hintShown && (
          <motion.div
            className="px-4 py-3 rounded-[12px]"
            style={{ background: 'rgba(253,199,0,0.06)', border: '1px solid rgba(253,199,0,0.2)' }}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
          >
            <p className="text-xs" style={{ color: '#fdc700' }}>💡 {hint}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {!submitted ? (
        <motion.button
          className="w-full py-3.5 rounded-[14px] font-bold text-sm"
          style={{
            background: input.trim()
              ? `linear-gradient(135deg, ${moduleColor}, ${moduleColor}cc)`
              : 'rgba(255,255,255,0.05)',
            color: input.trim() ? '#fff' : 'rgba(255,255,255,0.3)',
          }}
          onClick={() => input.trim() && setSubmitted(true)}
          whileTap={input.trim() ? { scale: 0.97 } : {}}
        >
          Check
        </motion.button>
      ) : (
        <div className="flex flex-col gap-3">
          <FeedbackBanner
            correct={isCorrect}
            correctAnswer={answer}
            answerUnit={answerUnit}
            moduleColor={moduleColor}
          />
          <motion.button
            className="w-full py-4 rounded-[16px] font-bold text-sm flex items-center justify-center gap-2"
            style={{
              background: `linear-gradient(135deg, ${moduleColor}, ${moduleColor}bb)`,
              color: '#fff',
            }}
            onClick={() => onComplete(isCorrect)}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Final tier — on your own
            <ChevronRight size={16} strokeWidth={2.5} />
          </motion.button>
        </div>
      )}
    </div>
  )
}

// ─── TIER 3: Supported independent ──────────────────────────────────────────
function Tier3({ data, moduleColor, keywords, onComplete }) {
  const { question, hint, answer, answerUnit, methodHint } = data
  const [input, setInput] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [methodShown, setMethodShown] = useState(false)
  const [confidence, setConfidence] = useState(0)

  const numAnswer = parseFloat(input)
  const isCorrect = submitted && Math.abs(numAnswer - answer) < Math.abs(answer * 0.03 + 0.01)

  if (submitted && confidence > 0) {
    return (
      <motion.div
        className="flex flex-col items-center gap-5 py-6"
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center"
          style={{
            background: isCorrect ? 'rgba(34,197,94,0.15)' : `${moduleColor}18`,
            border: isCorrect ? '2px solid rgba(34,197,94,0.4)' : `2px solid ${moduleColor}40`,
          }}
        >
          {isCorrect
            ? <CheckCircle2 size={32} color="#4ade80" />
            : <Lightbulb size={32} color={moduleColor} />
          }
        </div>
        <div className="text-center">
          <p className="text-base font-bold" style={{ color: '#f8fafc' }}>
            {isCorrect ? 'Nailed it!' : 'Good effort — keep going'}
          </p>
          <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>
            Practice builds confidence. On to the next step.
          </p>
        </div>
        <motion.button
          className="w-full py-4 rounded-[16px] font-bold text-sm"
          style={{
            background: `linear-gradient(135deg, ${moduleColor}, ${moduleColor}bb)`,
            boxShadow: `0 8px 24px ${moduleColor}30`,
            color: '#fff',
          }}
          onClick={onComplete}
          whileTap={{ scale: 0.97 }}
        >
          Continue
        </motion.button>
      </motion.div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <div
        className="rounded-[16px] px-4 py-3"
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
      >
        <div className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: moduleColor }}>
          Tier 3 — On your own (glossary available above)
        </div>
        <p className="text-sm leading-relaxed" style={{ color: '#f8fafc' }}>{question}</p>
      </div>

      <NumericInput
        value={input}
        onChange={setInput}
        unit={answerUnit}
        disabled={submitted}
      />

      {!submitted && (
        <div className="flex flex-col gap-2">
          {/* Method hint — process feedback, not answer */}
          {methodHint && !methodShown && (
            <button
              className="flex items-center justify-center gap-1.5 py-2.5 rounded-[12px] text-xs font-semibold"
              style={{
                background: 'rgba(99,102,241,0.08)',
                border: '1px solid rgba(99,102,241,0.25)',
                color: '#818cf8',
              }}
              onClick={() => setMethodShown(true)}
            >
              <Lightbulb size={12} />
              Check my method
            </button>
          )}
          <AnimatePresence>
            {methodShown && (
              <motion.div
                className="px-4 py-3 rounded-[12px]"
                style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)' }}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
              >
                <p className="text-xs" style={{ color: '#a5b4fc' }}>🧠 {methodHint}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            className="w-full py-3.5 rounded-[14px] font-bold text-sm"
            style={{
              background: input.trim()
                ? `linear-gradient(135deg, ${moduleColor}, ${moduleColor}cc)`
                : 'rgba(255,255,255,0.05)',
              color: input.trim() ? '#fff' : 'rgba(255,255,255,0.3)',
            }}
            onClick={() => input.trim() && setSubmitted(true)}
            whileTap={input.trim() ? { scale: 0.97 } : {}}
          >
            Check answer
          </motion.button>
        </div>
      )}

      {/* Result + confidence check */}
      <AnimatePresence>
        {submitted && (
          <motion.div
            className="flex flex-col gap-4"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <FeedbackBanner
              correct={isCorrect}
              correctAnswer={answer}
              answerUnit={answerUnit}
              moduleColor={moduleColor}
            />

            {/* Confidence rating */}
            <div
              className="rounded-[16px] px-4 py-4"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <p className="text-xs font-semibold mb-3" style={{ color: 'rgba(255,255,255,0.6)' }}>
                How confident do you feel solving a problem like this without support?
              </p>
              <div className="flex gap-2 justify-center">
                {[1, 2, 3, 4, 5].map(n => (
                  <button
                    key={n}
                    onClick={() => setConfidence(n)}
                    className="flex flex-col items-center gap-1"
                  >
                    <Star
                      size={28}
                      color={n <= confidence ? '#fdc700' : 'rgba(255,255,255,0.15)'}
                      fill={n <= confidence ? '#fdc700' : 'none'}
                      strokeWidth={1.5}
                    />
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-center mt-2" style={{ color: 'rgba(255,255,255,0.25)' }}>
                This shapes your future practice sessions
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Main component ──────────────────────────────────────────────────────────
export default function GuidedPracticeFader({ guidedPractice, moduleColor, keywords, onComplete }) {
  const [tier, setTier] = useState(1)

  return (
    <div className="px-5 py-5 flex flex-col gap-4">
      {/* Tier progress indicators */}
      <div className="flex items-center gap-2">
        {[1, 2, 3].map(t => (
          <div key={t} className="flex items-center gap-2 flex-1">
            <div
              className="flex-1 h-1.5 rounded-full"
              style={{
                background: t <= tier ? moduleColor : 'rgba(255,255,255,0.08)',
                transition: 'background 0.3s',
              }}
            />
            {t < 3 && (
              <ChevronRight size={10} color="rgba(255,255,255,0.2)" />
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-between">
        {['Completion', 'Partial scaffold', 'Independent'].map((label, i) => (
          <span
            key={i}
            className="text-[10px] font-semibold"
            style={{ color: i + 1 === tier ? moduleColor : 'rgba(255,255,255,0.25)' }}
          >
            {label}
          </span>
        ))}
      </div>

      {/* Active tier */}
      <AnimatePresence mode="wait">
        {tier === 1 && (
          <motion.div
            key="tier1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.22 }}
          >
            <Tier1
              data={guidedPractice.tier1}
              moduleColor={moduleColor}
              onComplete={() => setTier(2)}
            />
          </motion.div>
        )}
        {tier === 2 && (
          <motion.div
            key="tier2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.22 }}
          >
            <Tier2
              data={guidedPractice.tier2}
              moduleColor={moduleColor}
              onComplete={() => setTier(3)}
            />
          </motion.div>
        )}
        {tier === 3 && (
          <motion.div
            key="tier3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.22 }}
          >
            <Tier3
              data={guidedPractice.tier3}
              moduleColor={moduleColor}
              keywords={keywords}
              onComplete={onComplete}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
