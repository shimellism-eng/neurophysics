/**
 * FillStepsQuestion — fill in missing words in a physics explanation.
 * SEN-friendly: tap word bank to fill blanks. Builds exam-quality answers.
 */
import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { CheckCircle, XCircle, Lightbulb, RotateCcw } from 'lucide-react'

export default function FillStepsQuestion({ data, moduleColor, onComplete }) {
  if (!data) return null
  const { template = [], wordBank = [], senNote } = data
  const blanks = template.filter(t => t.blank)
  const [filled, setFilled] = useState(Array(blanks.length).fill(null))
  const [bankUsed, setBankUsed] = useState([])
  const [submitted, setSubmitted] = useState(false)

  // Shuffled word bank (computed once)
  const [shuffledBank] = useState(() => {
    const arr = [...wordBank]
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr
  })

  // Track which blank index we're on
  const nextEmptyIdx = filled.findIndex(f => f === null)

  const handleWordTap = (word) => {
    if (submitted || bankUsed.includes(word)) return
    const idx = nextEmptyIdx
    if (idx === -1) return
    const newFilled = [...filled]
    newFilled[idx] = word
    setFilled(newFilled)
    setBankUsed([...bankUsed, word])
  }

  const handleBlankTap = (idx) => {
    if (submitted || filled[idx] === null) return
    const word = filled[idx]
    const newFilled = [...filled]
    newFilled[idx] = null
    setFilled(newFilled)
    setBankUsed(bankUsed.filter(w => w !== word))
  }

  const handleReset = () => {
    setFilled(Array(blanks.length).fill(null))
    setBankUsed([])
  }

  const handleSubmit = () => {
    if (filled.includes(null) || submitted) return
    setSubmitted(true)
    const correct = blanks.every((b, i) => filled[i]?.toLowerCase() === b.blank.toLowerCase())
    onComplete(correct)
  }

  const allFilled = !filled.includes(null)
  let blankCounter = 0

  return (
    <div>
      {/* Explanation template with blanks */}
      <div className="rounded-[16px] p-4 mb-4" style={{ background: 'rgba(18,26,47,0.9)', border: '1px solid #2d3e55' }}>
        <div className="text-sm leading-[1.9]" style={{ color: '#cad5e2' }}>
          {template.map((part, i) => {
            if (!part.blank) {
              return <span key={i}>{part.text}{part.text2 || ''}</span>
            }
            const idx = blankCounter++
            const isCorrectBlank = submitted && filled[idx]?.toLowerCase() === part.blank.toLowerCase()
            const isWrongBlank = submitted && filled[idx]?.toLowerCase() !== part.blank.toLowerCase()
            return (
              <span key={i}>
                {part.text}
                <motion.button
                  className="inline-flex items-center justify-center min-w-[80px] px-3 py-1 mx-1 rounded-[8px] text-sm font-bold align-middle"
                  style={{
                    background: submitted
                      ? isCorrectBlank ? 'rgba(0,188,125,0.15)' : 'rgba(239,68,68,0.15)'
                      : filled[idx]
                        ? `${moduleColor}18`
                        : 'rgba(255,255,255,0.05)',
                    border: submitted
                      ? isCorrectBlank ? '1.5px solid #00bc7d' : '1.5px solid #ef4444'
                      : filled[idx]
                        ? `1.5px solid ${moduleColor}60`
                        : '1.5px dashed #8899b0',
                    color: submitted
                      ? isCorrectBlank ? '#00bc7d' : '#ef4444'
                      : filled[idx]
                        ? '#f8fafc'
                        : '#8899b0',
                    minHeight: 32,
                  }}
                  onClick={() => handleBlankTap(idx)}
                  whileTap={!submitted ? { scale: 0.95 } : {}}
                >
                  {filled[idx] || `___`}
                  {submitted && isWrongBlank && (
                    <span className="ml-1 text-[10px]" style={{ color: '#00bc7d' }}>({part.blank})</span>
                  )}
                </motion.button>
                {part.text2 || ''}
              </span>
            )
          })}
        </div>
      </div>

      {/* Word bank */}
      {!submitted && (
        <div className="mb-4">
          <div className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#a8b8cc' }}>
            Word Bank — tap to fill
          </div>
          <div className="flex flex-wrap gap-2">
            {shuffledBank.map((word, i) => {
              const used = bankUsed.includes(word)
              return (
                <motion.button
                  key={i}
                  className="px-3 py-2 rounded-[10px] text-sm font-semibold"
                  style={{
                    background: used ? 'rgba(18,26,47,0.3)' : `${moduleColor}12`,
                    border: used ? '1px solid #1d293d' : `1px solid ${moduleColor}40`,
                    color: used ? '#445' : moduleColor,
                    opacity: used ? 0.4 : 1,
                  }}
                  onClick={() => handleWordTap(word)}
                  whileTap={!used ? { scale: 0.93 } : {}}
                  disabled={used}
                >
                  {word}
                </motion.button>
              )
            })}
          </div>
        </div>
      )}

      {/* Action buttons */}
      {!submitted && (
        <div className="flex gap-2 mb-4">
          <motion.button
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-[12px] text-xs font-semibold"
            style={{ background: 'rgba(18,26,47,0.9)', border: '1px solid #2d3e55', color: '#a8b8cc' }}
            onClick={handleReset}
            whileTap={{ scale: 0.95 }}
          >
            <RotateCcw size={12} /> Reset
          </motion.button>
          <motion.button
            className="flex-1 py-3 rounded-[12px] font-semibold text-sm"
            style={{
              background: allFilled ? `${moduleColor}` : 'rgba(18,26,47,0.5)',
              color: allFilled ? '#fff' : '#8899b0',
              boxShadow: allFilled ? `0 6px 20px ${moduleColor}40` : 'none',
            }}
            onClick={handleSubmit}
            whileTap={allFilled ? { scale: 0.97 } : {}}
          >Check answer</motion.button>
        </div>
      )}

      {/* Result + SEN note */}
      <AnimatePresence>
        {submitted && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
            {blanks.every((b, i) => filled[i]?.toLowerCase() === b.blank.toLowerCase()) ? (
              <div className="flex items-center gap-2 px-4 py-3 rounded-[12px]"
                style={{ background: 'rgba(0,188,125,0.12)', border: '1px solid rgba(0,188,125,0.3)' }}>
                <CheckCircle size={18} color="#00bc7d" />
                <span className="text-sm font-semibold" style={{ color: '#00bc7d' }}>Perfect explanation!</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 px-4 py-3 rounded-[12px]"
                style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.3)' }}>
                <XCircle size={18} color="#ef4444" />
                <span className="text-sm font-semibold" style={{ color: '#ef4444' }}>
                  Not quite — check the corrections in green above
                </span>
              </div>
            )}
            {senNote && (
              <motion.div className="flex items-start gap-2 px-4 py-3 rounded-[12px]"
                style={{ background: 'rgba(253,199,0,0.07)', border: '0.75px solid rgba(253,199,0,0.25)' }}>
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
