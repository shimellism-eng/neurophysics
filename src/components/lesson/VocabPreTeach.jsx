/**
 * VocabPreTeach -- Step 2
 * Removes lexical barriers BEFORE concept learning begins.
 * Research: EEF Improving Secondary Science -- vocabulary is the top
 * attainment barrier in science for SEN students. Unknown words generate
 * extraneous cognitive load that makes concept instruction fail before it starts.
 * One word at a time prevents working memory overload.
 */
import { motion, AnimatePresence } from 'motion/react'
import { useState } from 'react'
import { ChevronRight, Volume2, CheckCircle2, Zap, Link } from 'lucide-react'
import { speak } from '../../utils/tts'

// Micro-check: 2 matching questions at the end
function MicroCheck({ keywords, moduleColor, onPass }) {
  const [pool] = useState(() => {
    const shuffled = [...keywords].sort(() => Math.random() - 0.5).slice(0, 2)
    return shuffled
  })
  const [qIndex, setQIndex] = useState(0)
  const [answered, setAnswered] = useState(null)
  const [correct, setCorrect] = useState(0)
  const [done, setDone] = useState(false)

  const current = pool[qIndex]

  const [options] = useState(() => {
    return pool.map(kw => {
      const distractors = keywords
        .filter(k => k.word !== kw.word)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map(k => k.definition)
      const all = [kw.definition, ...distractors].sort(() => Math.random() - 0.5)
      return { correctDef: kw.definition, options: all }
    })
  })

  const currentOptions = options[qIndex]

  const handleAnswer = (opt) => {
    if (answered !== null) return
    const isCorrect = opt === currentOptions.correctDef
    setAnswered(opt)
    if (isCorrect) setCorrect(c => c + 1)
    // No auto-advance -- user taps "Next" button
  }

  const handleNext = () => {
    if (qIndex + 1 < pool.length) {
      setQIndex(i => i + 1)
      setAnswered(null)
    } else {
      setDone(true)
    }
  }

  if (done) {
    const lastWasCorrect = answered === currentOptions.correctDef
    const finalScore = correct + (lastWasCorrect ? 0 : 0) // correct already includes last answer via handleAnswer
    return (
      <motion.div
        className="flex flex-col items-center gap-5 px-5 py-8"
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Pulsing checkmark circle -- 96x96 */}
        <div className="relative flex items-center justify-center">
          <motion.div
            className="absolute rounded-full"
            style={{
              width: 96,
              height: 96,
              background: `${moduleColor}18`,
            }}
            animate={{ scale: [1, 1.18, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="relative w-24 h-24 rounded-full flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${moduleColor}28, ${moduleColor}10)`,
              border: `2px solid ${moduleColor}60`,
              boxShadow: `0 0 32px ${moduleColor}30`,
            }}
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <CheckCircle2 size={40} color={moduleColor} />
          </motion.div>
        </div>

        <div className="text-center">
          <p className="font-display text-lg font-bold mb-1.5" style={{ color: '#f8fafc', letterSpacing: '-0.02em' }}>
            Words unlocked -- you're ready
          </p>
          <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)', maxWidth: 280 }}>
            These keywords stay available throughout the lesson. Tap any word chip to see its definition again.
          </p>
        </div>

        <motion.button
          className="font-display w-full rounded-[18px] font-bold text-sm flex items-center justify-center gap-2"
          style={{
            background: `linear-gradient(135deg, ${moduleColor}, ${moduleColor}bb)`,
            boxShadow: `0 6px 0 rgba(0,0,0,0.25), 0 12px 28px ${moduleColor}35`,
            color: '#fff',
            minHeight: 56,
            padding: '0 24px',
          }}
          onClick={onPass}
          whileTap={{ y: 4, boxShadow: `0 2px 0 rgba(0,0,0,0.15), 0 4px 10px ${moduleColor}20` }}
        >
          Continue to the lesson
          <ChevronRight size={16} strokeWidth={2.5} />
        </motion.button>
      </motion.div>
    )
  }

  const isAnswered = answered !== null
  const isWrong = isAnswered && answered !== currentOptions.correctDef

  return (
    <div className="px-5 py-5">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div
          className="text-[10px] font-bold uppercase tracking-widest"
          style={{ color: 'rgba(255,255,255,0.35)' }}
        >
          Quick check
        </div>
        <div
          className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
          style={{ background: `${moduleColor}20`, color: moduleColor }}
        >
          {qIndex + 1} of {pool.length}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={qIndex}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-display text-base font-bold mb-5" style={{ color: '#f8fafc' }}>
            What does{' '}
            <span style={{ color: moduleColor }}>{current.word}</span>{' '}
            mean?
          </p>

          <div className="flex flex-col gap-2.5 mb-4">
            {currentOptions.options.map((opt, i) => {
              const isSelected = answered === opt
              const isCorrectOpt = opt === currentOptions.correctDef
              const bg = isAnswered
                ? isCorrectOpt
                  ? 'rgba(34,197,94,0.14)'
                  : isSelected
                    ? 'rgba(239,68,68,0.12)'
                    : 'rgba(255,255,255,0.03)'
                : 'rgba(255,255,255,0.05)'
              const border = isAnswered
                ? isCorrectOpt
                  ? '1.5px solid rgba(34,197,94,0.55)'
                  : isSelected
                    ? '1.5px solid rgba(239,68,68,0.45)'
                    : '1px solid rgba(255,255,255,0.07)'
                : '1px solid rgba(255,255,255,0.1)'
              const textColor = isAnswered
                ? isCorrectOpt
                  ? 'rgba(134,239,172,1)'
                  : isSelected
                    ? 'rgba(252,165,165,0.9)'
                    : 'rgba(255,255,255,0.3)'
                : '#cad5e2'

              return (
                <motion.button
                  key={i}
                  className="font-display w-full text-left px-4 py-3.5 rounded-[14px] text-sm font-medium"
                  style={{
                    background: bg,
                    border,
                    color: textColor,
                    minHeight: 44,
                    transition: 'background 0.25s, border 0.25s, color 0.25s',
                  }}
                  onClick={() => handleAnswer(opt)}
                  whileTap={!isAnswered ? { scale: 0.985 } : {}}
                >
                  {opt}
                </motion.button>
              )
            })}
          </div>

          {/* Wrong answer: show correct answer explicitly */}
          <AnimatePresence>
            {isWrong && (
              <motion.div
                className="rounded-[14px] px-4 py-3.5 mb-4"
                style={{
                  background: 'rgba(34,197,94,0.08)',
                  border: '1.5px solid rgba(34,197,94,0.3)',
                }}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.22 }}
              >
                <div
                  className="text-[10px] font-bold uppercase tracking-widest mb-1.5"
                  style={{ color: 'rgba(134,239,172,0.7)' }}
                >
                  Correct answer:
                </div>
                <p className="text-sm font-semibold" style={{ color: 'rgba(134,239,172,1)' }}>
                  {currentOptions.correctDef}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Next button -- only shows after answering */}
          <AnimatePresence>
            {isAnswered && (
              <motion.button
                className="font-display w-full rounded-[16px] font-bold text-sm flex items-center justify-center gap-2"
                style={{
                  background: `linear-gradient(135deg, ${moduleColor}, ${moduleColor}bb)`,
                  boxShadow: `0 6px 0 rgba(0,0,0,0.25), 0 12px 28px ${moduleColor}35`,
                  color: '#fff',
                  minHeight: 56,
                }}
                onClick={handleNext}
                whileTap={{ y: 4, boxShadow: `0 2px 0 rgba(0,0,0,0.15), 0 4px 10px ${moduleColor}20` }}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.22 }}
              >
                {qIndex + 1 < pool.length ? 'Next question' : 'See results'}
                <ChevronRight size={16} strokeWidth={2.5} />
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default function VocabPreTeach({ keywords, moduleColor, onComplete }) {
  const [wordIndex, setWordIndex] = useState(0)
  const [inCheck, setInCheck] = useState(false)

  const current = keywords[wordIndex]
  const isLast = wordIndex === keywords.length - 1

  const handleNext = () => {
    if (!isLast) {
      setWordIndex(i => i + 1)
    } else {
      setInCheck(true)
    }
  }

  if (inCheck) {
    return (
      <MicroCheck
        keywords={keywords}
        moduleColor={moduleColor}
        onPass={onComplete}
      />
    )
  }

  return (
    <div className="flex flex-col gap-0" style={{ background: '#080f1e', minHeight: '100%' }}>

      {/* Progress dots */}
      <div className="flex items-center justify-center gap-2 pt-6 pb-5">
        {keywords.map((_, i) => {
          const isActive = i === wordIndex
          const isCompleted = i < wordIndex
          return (
            <motion.div
              key={i}
              className="rounded-full"
              animate={{
                width: isActive ? 32 : 10,
                background: isActive
                  ? moduleColor
                  : isCompleted
                    ? moduleColor
                    : 'rgba(255,255,255,0.1)',
                boxShadow: isActive ? `0 0 12px ${moduleColor}80` : 'none',
              }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{ height: 10 }}
            />
          )
        })}
      </div>

      {/* Word card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={wordIndex}
          className="mx-5"
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Word + symbol header */}
          <div
            className="rounded-[22px] px-5 py-5 mb-4"
            style={{
              background: `linear-gradient(135deg, ${moduleColor}1c 0%, ${moduleColor}08 100%)`,
              border: `1.5px solid ${moduleColor}45`,
              minHeight: 120,
            }}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                {/* Numbered badge */}
                <div className="flex items-center gap-2 mb-2.5">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-black shrink-0"
                    style={{
                      background: moduleColor,
                      color: '#080f1e',
                    }}
                  >
                    {wordIndex + 1}
                  </div>
                  <div
                    className="text-[10px] font-bold uppercase tracking-widest"
                    style={{ color: `${moduleColor}cc` }}
                  >
                    of {keywords.length} key words
                  </div>
                </div>

                {/* Word */}
                <div
                  className="font-display text-3xl font-black mb-3"
                  style={{ color: '#f8fafc', letterSpacing: '-0.03em', lineHeight: 1.1 }}
                >
                  {current.word}
                </div>

                {/* Symbol + unit as separate pills */}
                {(current.symbol || current.unit) && (
                  <div className="flex flex-wrap gap-2">
                    {current.symbol && (
                      <div
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold"
                        style={{ background: `${moduleColor}22`, color: moduleColor, border: `1px solid ${moduleColor}30` }}
                      >
                        Symbol: {current.symbol}
                      </div>
                    )}
                    {current.unit && (
                      <div
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold"
                        style={{ background: `${moduleColor}22`, color: moduleColor, border: `1px solid ${moduleColor}30` }}
                      >
                        Unit: {current.unit}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Audio button -- 48x48, prominent */}
              <motion.button
                className="flex items-center justify-center shrink-0 rounded-full"
                style={{
                  width: 48,
                  height: 48,
                  background: `${moduleColor}22`,
                  border: `1.5px solid ${moduleColor}45`,
                  boxShadow: `0 0 16px ${moduleColor}30`,
                }}
                onClick={() => speak(current.word + '. ' + current.definition)}
                aria-label={`Hear ${current.word} pronounced`}
                whileTap={{ scale: 0.92 }}
              >
                <Volume2 size={20} color={moduleColor} />
              </motion.button>
            </div>
          </div>

          {/* Definition card */}
          <div
            className="rounded-[18px] px-5 mb-3"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.09)',
              paddingTop: 20,
              paddingBottom: 20,
            }}
          >
            <div
              className="text-[10px] font-bold uppercase tracking-widest mb-2"
              style={{ color: `${moduleColor}99` }}
            >
              In physics, this means:
            </div>
            <p className="font-semibold leading-relaxed" style={{ color: '#f0f4f8', fontSize: 15 }}>
              {current.definition}
            </p>
          </div>

          {/* Everyday link card */}
          {current.everydayNote && (
            <div
              className="rounded-[18px] px-5 mb-5"
              style={{
                background: 'rgba(253,199,0,0.07)',
                border: '1.5px solid rgba(253,199,0,0.22)',
                paddingTop: 16,
                paddingBottom: 16,
              }}
            >
              <div className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: '#fdc700' }}>
                Everyday link
              </div>
              <div className="flex items-start gap-2">
                <Link size={13} color="#fdc700" style={{ marginTop: 2, flexShrink: 0, opacity: 0.8 }} />
                <p className="text-sm leading-relaxed font-medium" style={{ color: '#fdc700', opacity: 0.9 }}>
                  {current.everydayNote}
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Next button */}
      <div className="px-5 pb-7">
        <motion.button
          className="font-display w-full rounded-[18px] font-bold text-sm flex flex-col items-center justify-center gap-0.5"
          style={{
            background: `linear-gradient(135deg, ${moduleColor}, ${moduleColor}bb)`,
            boxShadow: `0 6px 0 rgba(0,0,0,0.25), 0 12px 28px ${moduleColor}35`,
            color: '#fff',
            minHeight: 56,
          }}
          onClick={handleNext}
          whileTap={{ y: 4, boxShadow: `0 2px 0 rgba(0,0,0,0.15), 0 4px 10px ${moduleColor}20` }}
        >
          <div className="flex items-center gap-2">
            {isLast ? (
              <>
                <Zap size={15} strokeWidth={2.5} />
                Quick check -- are you ready?
              </>
            ) : (
              <>
                Next word
                <ChevronRight size={16} strokeWidth={2.5} />
              </>
            )}
          </div>
          {!isLast && (
            <div
              className="text-[11px] font-semibold"
              style={{ color: 'rgba(255,255,255,0.6)', letterSpacing: '0.01em' }}
            >
              {wordIndex + 2} of {keywords.length}
            </div>
          )}
        </motion.button>
      </div>
    </div>
  )
}
