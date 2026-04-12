/**
 * GuidedPracticeFader — Step 6
 * Three tiers of progressively independent practice.
 * The most common failure point for SEN learners is the cliff-edge jump from
 * full worked example to independent problem. Fading removes this cliff.
 *
 * Research:
 * - Fading effect (Sweller): gradually remove scaffolding
 * - Rosenshine 80% success rate: learners need success at each tier before progressing
 * - ADHD: hint button without penalty critical - shame avoidance blocks help-seeking
 * - Dyscalculia: "check my method" process feedback (not just answer) prevents
 *   iterating on the wrong method without realising it
 */
import { motion, AnimatePresence } from 'motion/react'
import { useState } from 'react'
import { ChevronRight, Lightbulb, CheckCircle2, XCircle, Star, Volume2 } from 'lucide-react'
import { useMamoReaction } from '../../context/MamoContext'
import { useSound } from '../../hooks/useSound'
import { speak } from '../../utils/tts'

function ttsEnabled() {
  return localStorage.getItem('np_auto_tts') === 'true'
}

// Small TTS button placed top-right of a question card
function TTSButton({ text, moduleColor }) {
  if (!ttsEnabled()) return null
  return (
    <button
      className="flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-semibold shrink-0"
      style={{ background: `${moduleColor}20`, color: moduleColor }}
      onClick={() => speak(text)}
      aria-label="Read question aloud"
    >
      <Volume2 size={10} />
      Read
    </button>
  )
}

const TIER_LABELS = ['Fill the gap', 'With a hint', 'On your own']

// ─── Tier progress indicator ─────────────────────────────────────────────────
function TierProgress({ tier, moduleColor }) {
  return (
    <div className="flex items-start justify-between px-1 mb-2">
      {[1, 2, 3].map((t, i) => {
        const isActive = t === tier
        const isDone = t < tier
        return (
          <div key={t} className="flex flex-col items-center gap-1.5" style={{ flex: 1 }}>
            {/* Connector line - left side */}
            <div className="flex items-center w-full">
              {i > 0 && (
                <div
                  className="flex-1 h-px"
                  style={{
                    background: isDone ? moduleColor : 'rgba(255,255,255,0.1)',
                    transition: 'background 0.4s',
                  }}
                />
              )}
              {/* Circle */}
              <motion.div
                className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm shrink-0"
                style={{
                  background: isActive
                    ? `linear-gradient(135deg, ${moduleColor}, ${moduleColor}cc)`
                    : isDone
                      ? 'rgba(34,197,94,0.2)'
                      : 'transparent',
                  border: isActive
                    ? 'none'
                    : isDone
                      ? '1.5px solid rgba(34,197,94,0.5)'
                      : '1.5px solid rgba(255,255,255,0.15)',
                  color: isActive ? '#fff' : isDone ? '#4ade80' : 'rgba(255,255,255,0.25)',
                  boxShadow: isActive ? `0 0 16px ${moduleColor}50` : 'none',
                  transition: 'all 0.35s ease',
                }}
                animate={isActive ? { scale: [1, 1.07, 1] } : { scale: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                {t}
              </motion.div>
              {/* Right connector */}
              {i < 2 && (
                <div
                  className="flex-1 h-px"
                  style={{
                    background: t < tier ? moduleColor : 'rgba(255,255,255,0.1)',
                    transition: 'background 0.4s',
                  }}
                />
              )}
            </div>
            {/* Label */}
            <span
              className="text-[10px] font-semibold text-center leading-tight"
              style={{
                color: isActive ? moduleColor : isDone ? '#4ade80' : 'rgba(255,255,255,0.22)',
                transition: 'color 0.3s',
              }}
            >
              {TIER_LABELS[i]}
            </span>
          </div>
        )
      })}
    </div>
  )
}

// ─── NumericInput ─────────────────────────────────────────────────────────────
function NumericInput({ value, onChange, unit, placeholder = 'Your answer', disabled, moduleColor }) {
  const [focused, setFocused] = useState(false)
  return (
    <div
      className="flex items-center rounded-[14px] overflow-hidden"
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: focused
          ? `2px solid ${moduleColor}70`
          : '2px solid rgba(255,255,255,0.1)',
        transition: 'border-color 0.2s',
      }}
    >
      <input
        type="number"
        inputMode="decimal"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="flex-1 bg-transparent px-4 text-base font-semibold outline-none"
        style={{
          color: '#f8fafc',
          WebkitAppearance: 'none',
          MozAppearance: 'textfield',
          paddingTop: 18,
          paddingBottom: 18,
        }}
      />
      {unit && (
        <div
          className="px-3 py-1.5 mr-2 rounded-[8px] text-xs font-bold"
          style={{
            background: `${moduleColor}22`,
            color: moduleColor,
            border: `1px solid ${moduleColor}35`,
          }}
        >
          {unit}
        </div>
      )}
    </div>
  )
}

// ─── FeedbackBanner ──────────────────────────────────────────────────────────
function FeedbackBanner({ correct, correctAnswer, answerUnit, moduleColor }) {
  return (
    <motion.div
      className="flex items-start gap-3 px-4 rounded-[14px]"
      style={{
        paddingTop: 16,
        paddingBottom: 16,
        background: correct ? 'rgba(34,197,94,0.1)' : 'rgba(99,102,241,0.1)',
        border: correct
          ? '1px solid rgba(34,197,94,0.35)'
          : '1px solid rgba(99,102,241,0.3)',
        boxShadow: correct ? '0 0 20px rgba(34,197,94,0.08)' : 'none',
      }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      {correct
        ? <CheckCircle2 size={20} color="#4ade80" style={{ flexShrink: 0, marginTop: 1 }} />
        : <XCircle size={20} color="#a5b4fc" style={{ flexShrink: 0, marginTop: 1 }} />
      }
      <div>
        <div className="text-sm font-bold" style={{ color: correct ? '#4ade80' : '#a5b4fc' }}>
          {correct ? 'Correct!' : 'Not quite'}
        </div>
        {!correct && (
          <div className="mt-1">
            <span className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>
              Correct answer:{' '}
            </span>
            <span className="text-sm font-bold font-mono" style={{ color: '#c7d2fe' }}>
              {correctAnswer}
            </span>
            {answerUnit && (
              <span className="text-xs font-semibold ml-1" style={{ color: 'rgba(199,210,254,0.7)' }}>
                {answerUnit}
              </span>
            )}
            <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.35)' }}>
              That's fine - the next tier gives you a bit more support.
            </p>
          </div>
        )}
      </div>
    </motion.div>
  )
}

// ─── TIER 1: Completion problem ──────────────────────────────────────────────
function Tier1({ data, moduleColor, onComplete, triggerReaction, playCorrect, playWrong }) {
  const { question, allSteps, missingStep, missingHint, answer, answerUnit } = data
  const [input, setInput] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const numAnswer = parseFloat(input)
  const isCorrect = submitted && Math.abs(numAnswer - answer) < Math.abs(answer * 0.03 + 0.01)
  const hasInput = input.trim().length > 0

  return (
    <div className="flex flex-col gap-4">
      <div
        className="rounded-[16px] px-4 py-4"
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
      >
        <div className="flex items-start gap-2">
          <p className="font-display text-[15px] leading-relaxed font-medium flex-1" style={{ color: '#f0f4f8' }}>{question}</p>
          <TTSButton text={question} moduleColor={moduleColor} />
        </div>
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
        moduleColor={moduleColor}
      />

      {!submitted ? (
        <motion.button
          className="font-display w-full py-3.5 rounded-[14px] font-bold text-sm"
          style={{
            minHeight: 44,
            background: hasInput
              ? `linear-gradient(135deg, ${moduleColor}, ${moduleColor}cc)`
              : 'rgba(255,255,255,0.05)',
            boxShadow: hasInput ? `0 6px 0 rgba(0,0,0,0.25), 0 12px 28px ${moduleColor}35` : 'none',
            color: hasInput ? '#fff' : 'rgba(255,255,255,0.3)',
          }}
          onClick={() => {
            if (!hasInput) return
            const correct = Math.abs(parseFloat(input) - answer) < Math.abs(answer * 0.03 + 0.01)
            triggerReaction(correct ? 'correct' : 'wrong')
            if (correct) { playCorrect() } else { playWrong() }
            setSubmitted(true)
          }}
          whileTap={hasInput ? { y: 4, boxShadow: `0 2px 0 rgba(0,0,0,0.15), 0 4px 10px ${moduleColor}20` } : {}}
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
            className="font-display w-full py-4 rounded-[16px] font-bold text-sm flex items-center justify-center gap-2"
            style={{
              minHeight: 56,
              background: `linear-gradient(135deg, ${moduleColor}, ${moduleColor}bb)`,
              boxShadow: `0 6px 0 rgba(0,0,0,0.25), 0 12px 28px ${moduleColor}35`,
              color: '#fff',
            }}
            onClick={() => onComplete(isCorrect)}
            whileTap={{ y: 4, boxShadow: `0 2px 0 rgba(0,0,0,0.15), 0 4px 10px ${moduleColor}20` }}
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
function Tier2({ data, moduleColor, onComplete, triggerReaction, playCorrect, playWrong }) {
  const { question, shownEquation, shownStep1, hint, answer, answerUnit } = data
  const [input, setInput] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [hintShown, setHintShown] = useState(false)

  const numAnswer = parseFloat(input)
  const isCorrect = submitted && Math.abs(numAnswer - answer) < Math.abs(answer * 0.03 + 0.01)
  const hasInput = input.trim().length > 0

  return (
    <div className="flex flex-col gap-4">
      <div
        className="rounded-[16px] px-4 py-4"
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
      >
        <div className="flex items-start gap-2">
          <p className="font-display text-[15px] leading-relaxed font-medium flex-1" style={{ color: '#f0f4f8' }}>{question}</p>
          <TTSButton text={question} moduleColor={moduleColor} />
        </div>
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
          Your turn - substitute and calculate...
        </div>
      </div>

      <NumericInput
        value={input}
        onChange={setInput}
        unit={answerUnit}
        disabled={submitted}
        moduleColor={moduleColor}
      />

      {/* Hint button - no penalty */}
      {!submitted && !hintShown && (
        <button
          className="font-display flex items-center justify-center gap-1.5 py-2.5 rounded-[12px] text-xs font-semibold"
          style={{
            minHeight: 44,
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
            <p className="text-xs" style={{ color: '#fdc700' }}>{hint}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {!submitted ? (
        <motion.button
          className="font-display w-full py-3.5 rounded-[14px] font-bold text-sm"
          style={{
            minHeight: 44,
            background: hasInput
              ? `linear-gradient(135deg, ${moduleColor}, ${moduleColor}cc)`
              : 'rgba(255,255,255,0.05)',
            boxShadow: hasInput ? `0 6px 0 rgba(0,0,0,0.25), 0 12px 28px ${moduleColor}35` : 'none',
            color: hasInput ? '#fff' : 'rgba(255,255,255,0.3)',
          }}
          onClick={() => {
            if (!hasInput) return
            const correct = Math.abs(parseFloat(input) - answer) < Math.abs(answer * 0.03 + 0.01)
            triggerReaction(correct ? 'correct' : 'wrong')
            if (correct) { playCorrect() } else { playWrong() }
            setSubmitted(true)
          }}
          whileTap={hasInput ? { y: 4, boxShadow: `0 2px 0 rgba(0,0,0,0.15), 0 4px 10px ${moduleColor}20` } : {}}
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
            className="font-display w-full py-4 rounded-[16px] font-bold text-sm flex items-center justify-center gap-2"
            style={{
              minHeight: 56,
              background: `linear-gradient(135deg, ${moduleColor}, ${moduleColor}bb)`,
              boxShadow: `0 6px 0 rgba(0,0,0,0.25), 0 12px 28px ${moduleColor}35`,
              color: '#fff',
            }}
            onClick={() => onComplete(isCorrect)}
            whileTap={{ y: 4, boxShadow: `0 2px 0 rgba(0,0,0,0.15), 0 4px 10px ${moduleColor}20` }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Final tier - on your own
            <ChevronRight size={16} strokeWidth={2.5} />
          </motion.button>
        </div>
      )}
    </div>
  )
}

// ─── Confidence star labels ───────────────────────────────────────────────────
const STAR_LABELS = ['Not sure', 'Getting it', 'Confident', 'Really sure', 'Got it!']

// ─── TIER 3: Supported independent ──────────────────────────────────────────
function Tier3({ data, moduleColor, keywords, onComplete, onWrongAnswer, triggerReaction, playCorrect, playWrong, playComplete }) {
  const { question, hint, answer, answerUnit, methodHint } = data
  const [input, setInput] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [methodShown, setMethodShown] = useState(false)
  const [confidence, setConfidence] = useState(0)
  const [hoveredStar, setHoveredStar] = useState(0)

  const numAnswer = parseFloat(input)
  const isCorrect = submitted && Math.abs(numAnswer - answer) < Math.abs(answer * 0.03 + 0.01)
  const hasInput = input.trim().length > 0

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
          <p className="font-display text-base font-bold" style={{ color: '#f8fafc' }}>
            {isCorrect ? 'Nailed it!' : 'Good effort - keep going'}
          </p>
          <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>
            Practice builds confidence. On to the next step.
          </p>
        </div>
        <motion.button
          className="font-display w-full py-4 rounded-[16px] font-bold text-sm"
          style={{
            minHeight: 56,
            background: `linear-gradient(135deg, ${moduleColor}, ${moduleColor}bb)`,
            boxShadow: `0 6px 0 rgba(0,0,0,0.25), 0 12px 28px ${moduleColor}35`,
            color: '#fff',
          }}
          onClick={() => { triggerReaction('complete'); playComplete(); onComplete() }}
          whileTap={{ y: 4, boxShadow: `0 2px 0 rgba(0,0,0,0.15), 0 4px 10px ${moduleColor}20` }}
        >
          Continue
        </motion.button>
      </motion.div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <div
        className="rounded-[16px] px-4 py-4"
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
      >
        <div className="flex items-start gap-2">
          <p className="font-display text-[15px] leading-relaxed font-medium flex-1" style={{ color: '#f0f4f8' }}>{question}</p>
          <TTSButton text={question} moduleColor={moduleColor} />
        </div>
      </div>

      <NumericInput
        value={input}
        onChange={setInput}
        unit={answerUnit}
        disabled={submitted}
        moduleColor={moduleColor}
      />

      {!submitted && (
        <div className="flex flex-col gap-2">
          {/* Method hint - process feedback, not answer */}
          {methodHint && !methodShown && (
            <button
              className="font-display flex items-center justify-center gap-1.5 py-2.5 rounded-[12px] text-xs font-semibold"
              style={{
                minHeight: 44,
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
                <p className="text-xs" style={{ color: '#a5b4fc' }}>{methodHint}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            className="font-display w-full py-3.5 rounded-[14px] font-bold text-sm"
            style={{
              minHeight: 44,
              background: hasInput
                ? `linear-gradient(135deg, ${moduleColor}, ${moduleColor}cc)`
                : 'rgba(255,255,255,0.05)',
              boxShadow: hasInput ? `0 6px 0 rgba(0,0,0,0.25), 0 12px 28px ${moduleColor}35` : 'none',
              color: hasInput ? '#fff' : 'rgba(255,255,255,0.3)',
            }}
            onClick={() => {
              if (!hasInput) return
              const num = parseFloat(input)
              const correct = Math.abs(num - answer) < Math.abs(answer * 0.03 + 0.01)
              triggerReaction(correct ? 'correct' : 'wrong')
              if (correct) { playCorrect() } else { playWrong() }
              if (!correct) onWrongAnswer?.()
              setSubmitted(true)
            }}
            whileTap={hasInput ? { y: 4, boxShadow: `0 2px 0 rgba(0,0,0,0.15), 0 4px 10px ${moduleColor}20` } : {}}
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
              <p className="text-xs font-semibold mb-4" style={{ color: 'rgba(255,255,255,0.6)' }}>
                How confident do you feel solving a problem like this without support?
              </p>
              <div className="flex gap-1 justify-center">
                {[1, 2, 3, 4, 5].map(n => {
                  const active = n <= (hoveredStar || confidence)
                  return (
                    <button
                      key={n}
                      onClick={() => setConfidence(n)}
                      onMouseEnter={() => setHoveredStar(n)}
                      onMouseLeave={() => setHoveredStar(0)}
                      className="flex flex-col items-center gap-1.5"
                      style={{ flex: 1, minHeight: 44 }}
                    >
                      <motion.div
                        animate={{ scale: active ? 1.12 : 1 }}
                        transition={{ duration: 0.18 }}
                      >
                        <Star
                          size={32}
                          color={active ? '#fdc700' : 'rgba(255,255,255,0.12)'}
                          fill={active ? '#fdc700' : 'none'}
                          strokeWidth={1.5}
                        />
                      </motion.div>
                      <span
                        className="text-[9px] font-semibold text-center leading-tight"
                        style={{ color: active ? 'rgba(253,199,0,0.8)' : 'rgba(255,255,255,0.2)' }}
                      >
                        {STAR_LABELS[n - 1]}
                      </span>
                    </button>
                  )
                })}
              </div>
              <p className="text-[10px] text-center mt-3" style={{ color: 'rgba(255,255,255,0.22)' }}>
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
export default function GuidedPracticeFader({ guidedPractice, moduleColor, keywords, onComplete, onWrongAnswer }) {
  const [tier, setTier] = useState(1)
  const triggerReaction = useMamoReaction()
  const { playCorrect, playWrong, playComplete } = useSound()
  if (!guidedPractice) return null

  return (
    <div className="px-5 py-5 flex flex-col gap-5">
      {/* Tier progress indicators */}
      <TierProgress tier={tier} moduleColor={moduleColor} />

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
              triggerReaction={triggerReaction}
              playCorrect={playCorrect}
              playWrong={playWrong}
              onComplete={(isCorrect) => {
                if (!isCorrect) onWrongAnswer?.()
                setTier(2)
              }}
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
              triggerReaction={triggerReaction}
              playCorrect={playCorrect}
              playWrong={playWrong}
              onComplete={(isCorrect) => {
                if (!isCorrect) onWrongAnswer?.()
                setTier(3)
              }}
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
              triggerReaction={triggerReaction}
              playCorrect={playCorrect}
              playWrong={playWrong}
              playComplete={playComplete}
              onWrongAnswer={onWrongAnswer}
              onComplete={onComplete}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
