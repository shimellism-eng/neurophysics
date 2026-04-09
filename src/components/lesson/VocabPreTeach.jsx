/**
 * VocabPreTeach — Step 2
 * Removes lexical barriers BEFORE concept learning begins.
 * Research: EEF Improving Secondary Science — vocabulary is the top
 * attainment barrier in science for SEN students. Unknown words generate
 * extraneous cognitive load that makes concept instruction fail before it starts.
 * One word at a time prevents working memory overload.
 */
import { motion, AnimatePresence } from 'motion/react'
import { useState } from 'react'
import { ChevronRight, Volume2, CheckCircle2 } from 'lucide-react'

function speak(text) {
  if (!('speechSynthesis' in window)) return
  window.speechSynthesis.cancel()
  const utt = new SpeechSynthesisUtterance(text)
  utt.rate = 0.85
  window.speechSynthesis.speak(utt)
}

// Micro-check: 2 matching questions at the end
function MicroCheck({ keywords, moduleColor, onPass }) {
  // Pick 2 random keywords for the check
  const [pool] = useState(() => {
    const shuffled = [...keywords].sort(() => Math.random() - 0.5).slice(0, 2)
    return shuffled
  })
  const [qIndex, setQIndex] = useState(0)
  const [answered, setAnswered] = useState(null)
  const [correct, setCorrect] = useState(0)
  const [done, setDone] = useState(false)

  const current = pool[qIndex]

  // Build 4 options: correct definition + 3 distractors from other keywords
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

    setTimeout(() => {
      if (qIndex + 1 < pool.length) {
        setQIndex(i => i + 1)
        setAnswered(null)
      } else {
        setDone(true)
      }
    }, 900)
  }

  if (done) {
    const passed = correct + (answered === currentOptions.correctDef ? 1 : 0) >= 1
    return (
      <motion.div
        className="flex flex-col items-center gap-4 px-5 py-6"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center"
          style={{ background: `${moduleColor}20`, border: `2px solid ${moduleColor}50` }}
        >
          <CheckCircle2 size={32} color={moduleColor} />
        </div>
        <p className="text-base font-bold text-center" style={{ color: '#f8fafc' }}>
          Words unlocked — you're ready
        </p>
        <p className="text-sm text-center" style={{ color: 'rgba(255,255,255,0.4)' }}>
          These keywords stay available throughout the lesson. Tap any word chip to see its definition again.
        </p>
        <motion.button
          className="w-full py-4 rounded-[16px] font-bold text-sm"
          style={{
            background: `linear-gradient(135deg, ${moduleColor}, ${moduleColor}bb)`,
            boxShadow: `0 8px 24px ${moduleColor}35`,
            color: '#fff',
          }}
          onClick={onPass}
          whileTap={{ scale: 0.97 }}
        >
          Continue to the lesson
        </motion.button>
      </motion.div>
    )
  }

  return (
    <div className="px-5 py-5">
      <div className="text-[10px] font-bold uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.35)' }}>
        Quick check — {qIndex + 1} of {pool.length}
      </div>
      <p className="text-base font-bold mb-5" style={{ color: '#f8fafc' }}>
        What does <span style={{ color: moduleColor }}>{current.word}</span> mean?
      </p>
      <div className="flex flex-col gap-2">
        {currentOptions.options.map((opt, i) => {
          const isSelected = answered === opt
          const isCorrectOpt = opt === currentOptions.correctDef
          const bg = answered !== null
            ? isCorrectOpt
              ? 'rgba(34,197,94,0.15)'
              : isSelected
                ? 'rgba(239,68,68,0.12)'
                : 'rgba(255,255,255,0.03)'
            : 'rgba(255,255,255,0.04)'
          const border = answered !== null
            ? isCorrectOpt
              ? '1px solid rgba(34,197,94,0.5)'
              : isSelected
                ? '1px solid rgba(239,68,68,0.4)'
                : '1px solid rgba(255,255,255,0.07)'
            : '1px solid rgba(255,255,255,0.1)'

          return (
            <motion.button
              key={i}
              className="w-full text-left px-4 py-3 rounded-[14px] text-sm"
              style={{ background: bg, border, color: '#cad5e2', transition: 'background 0.2s, border 0.2s' }}
              onClick={() => handleAnswer(opt)}
              whileTap={answered === null ? { scale: 0.98 } : {}}
            >
              {opt}
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}

export default function VocabPreTeach({ keywords, moduleColor, onComplete }) {
  const [wordIndex, setWordIndex] = useState(0)
  const [seenAll, setSeenAll] = useState(false)
  const [inCheck, setInCheck] = useState(false)

  const current = keywords[wordIndex]
  const isLast = wordIndex === keywords.length - 1

  const handleNext = () => {
    if (!isLast) {
      setWordIndex(i => i + 1)
    } else {
      setSeenAll(true)
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
    <div className="flex flex-col gap-0">
      {/* Progress dots */}
      <div className="flex items-center justify-center gap-1.5 pt-5 pb-4">
        {keywords.map((_, i) => (
          <div
            key={i}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === wordIndex ? 20 : 6,
              height: 6,
              background: i <= wordIndex ? moduleColor : 'rgba(255,255,255,0.1)',
            }}
          />
        ))}
      </div>

      {/* Word card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={wordIndex}
          className="mx-5"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Word + symbol header */}
          <div
            className="rounded-[20px] px-5 py-5 mb-4"
            style={{
              background: `linear-gradient(135deg, ${moduleColor}18 0%, ${moduleColor}06 100%)`,
              border: `1.5px solid ${moduleColor}40`,
            }}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <div
                  className="text-[10px] font-bold uppercase tracking-widest mb-1"
                  style={{ color: moduleColor }}
                >
                  Word {wordIndex + 1} of {keywords.length}
                </div>
                <div className="text-2xl font-bold" style={{ color: '#f8fafc', letterSpacing: '-0.02em' }}>
                  {current.word}
                </div>
                {current.symbol && (
                  <div
                    className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-xs font-bold"
                    style={{ background: `${moduleColor}20`, color: moduleColor }}
                  >
                    Symbol: {current.symbol}
                    {current.unit ? ` · Unit: ${current.unit}` : ''}
                  </div>
                )}
              </div>

              {/* Audio button */}
              <button
                className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                style={{ background: `${moduleColor}20`, border: `1px solid ${moduleColor}35` }}
                onClick={() => speak(current.word + '. ' + current.definition)}
                aria-label={`Hear ${current.word} pronounced`}
              >
                <Volume2 size={16} color={moduleColor} />
              </button>
            </div>
          </div>

          {/* Definition */}
          <div
            className="rounded-[16px] px-4 py-4 mb-3"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <div className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: 'rgba(255,255,255,0.3)' }}>
              In physics, this means:
            </div>
            <p className="text-sm leading-relaxed font-semibold" style={{ color: '#f8fafc' }}>
              {current.definition}
            </p>
          </div>

          {/* Everyday note */}
          {current.everydayNote && (
            <div
              className="rounded-[16px] px-4 py-3 mb-5"
              style={{ background: 'rgba(253,199,0,0.06)', border: '1px solid rgba(253,199,0,0.2)' }}
            >
              <div className="text-[10px] font-bold uppercase tracking-widest mb-1.5" style={{ color: '#fdc700' }}>
                Everyday link
              </div>
              <p className="text-xs leading-relaxed" style={{ color: '#fdc700', opacity: 0.85 }}>
                {current.everydayNote}
              </p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Next button */}
      <div className="px-5 pb-6">
        <motion.button
          className="w-full py-4 rounded-[16px] font-bold text-sm flex items-center justify-center gap-2"
          style={{
            background: `linear-gradient(135deg, ${moduleColor}, ${moduleColor}bb)`,
            boxShadow: `0 8px 24px ${moduleColor}35`,
            color: '#fff',
          }}
          onClick={handleNext}
          whileTap={{ scale: 0.97 }}
        >
          {isLast ? 'Quick check — ready?' : `Next word`}
          <ChevronRight size={16} strokeWidth={2.5} />
        </motion.button>
      </div>
    </div>
  )
}
