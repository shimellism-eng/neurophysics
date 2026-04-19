/**
 * MisconceptionQuestion — present a common wrong idea, ask if correct.
 * Calm correction after answering. SEN-friendly.
 */
import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { AlertTriangle, CheckCircle, XCircle } from 'lucide-react'

export default function MisconceptionQuestion({ data, moduleColor, onComplete }) {
  if (!data) return null
  const { statement, isCorrect, explanation, senNote } = data
  const [answer, setAnswer] = useState(null)    // true or false
  const [submitted, setSubmitted] = useState(false)

  const userCorrect = answer === isCorrect

  const handleTap = (val) => {
    if (submitted) return
    setAnswer(val)
  }

  const handleSubmit = () => {
    if (answer === null) return
    setSubmitted(true)
    setTimeout(() => onComplete(userCorrect), 1200)
  }

  return (
    <div className="space-y-4">
      {/* Statement card */}
      <div
        className="rounded-[16px] p-5"
        style={{
          background: 'rgba(18,26,47,0.9)',
          border: `1px solid ${moduleColor}30`,
        }}
      >
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle size={14} color="#fdc700" />
          <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#fdc700' }}>
            True or false?
          </span>
        </div>
        <p className="text-base font-semibold leading-relaxed" style={{ color: '#f8fafc' }}>
          "{statement}"
        </p>
      </div>

      {/* True / False buttons */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { val: true, label: 'True', icon: CheckCircle, color: '#00bc7d' },
          { val: false, label: 'False', icon: XCircle, color: '#ef4444' },
        ].map(({ val, label, icon: Icon, color }) => {
          const isSelected = answer === val
          const showCorrect = submitted && val === isCorrect
          const showWrong = submitted && isSelected && val !== isCorrect

          return (
            <motion.button
              key={label}
              className="flex flex-col items-center gap-2 py-5 rounded-[16px]"
              style={{
                background: showCorrect
                  ? 'rgba(0,188,125,0.15)'
                  : showWrong
                  ? 'rgba(239,68,68,0.15)'
                  : isSelected && !submitted
                  ? `${moduleColor}15`
                  : 'rgba(18,26,47,0.9)',
                border: showCorrect
                  ? '2px solid #00bc7d'
                  : showWrong
                  ? '2px solid #ef4444'
                  : isSelected && !submitted
                  ? `2px solid ${moduleColor}`
                  : '1.5px solid #2d3e55',
              }}
              onClick={() => handleTap(val)}
              whileTap={!submitted ? { scale: 0.95 } : {}}
            >
              <Icon size={24} color={showCorrect ? '#00bc7d' : showWrong ? '#ef4444' : isSelected ? moduleColor : '#a8b8cc'} />
              <span
                className="text-sm font-bold"
                style={{ color: showCorrect ? '#00bc7d' : showWrong ? '#ef4444' : isSelected ? '#f8fafc' : '#a8b8cc' }}
              >
                {label}
              </span>
            </motion.button>
          )
        })}
      </div>

      {/* Submit button */}
      {answer !== null && !submitted && (
        <motion.button
          className="w-full py-3.5 rounded-[14px] font-semibold text-sm"
          style={{
            background: `${moduleColor}`,
            boxShadow: `0px 6px 20px ${moduleColor}40`,
            color: '#fff',
          }}
          onClick={handleSubmit}
          whileTap={{ scale: 0.97 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Check
        </motion.button>
      )}

      {/* Explanation after submission */}
      <AnimatePresence>
        {submitted && (
          <motion.div
            className="rounded-[14px] p-4"
            style={{
              background: userCorrect ? 'rgba(0,188,125,0.08)' : 'rgba(249,115,22,0.08)',
              border: `0.75px solid ${userCorrect ? 'rgba(0,188,125,0.3)' : 'rgba(249,115,22,0.3)'}`,
            }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="text-xs font-semibold mb-1.5" style={{ color: userCorrect ? '#00bc7d' : '#f97316' }}>
              {userCorrect ? 'Well spotted!' : 'Not quite — here\'s why:'}
            </div>
            <p className="text-xs leading-relaxed" style={{ color: '#cad5e2' }}>
              {explanation}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SEN note */}
      <AnimatePresence>
        {submitted && senNote && (
          <motion.div
            className="px-4 py-3 rounded-[12px]"
            style={{ background: 'rgba(253,199,0,0.07)', border: '0.75px solid rgba(253,199,0,0.25)' }}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <span className="text-xs leading-relaxed" style={{ color: '#fdc700' }}>{senNote}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
