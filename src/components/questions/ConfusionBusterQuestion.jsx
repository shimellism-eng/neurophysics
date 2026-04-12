/**
 * ConfusionBusterQuestion — sort statements into two commonly confused concepts.
 * Student taps [A] or [B] button on each statement card to assign it.
 * "Check" appears when all statements are assigned.
 * After check: green/red per statement, then onComplete(correct) fires.
 */
import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { CheckCircle, XCircle } from 'lucide-react'

export default function ConfusionBusterQuestion({ data, moduleColor, onComplete }) {
  if (!data) return null

  const { conceptA, conceptB, statements = [], senNote } = data

  // assignments: { [statementId]: 'A' | 'B' | null }
  const [assignments, setAssignments] = useState(() =>
    Object.fromEntries(statements.map(s => [s.id, null]))
  )
  const [revealed, setRevealed] = useState(false)
  const [allCorrect, setAllCorrect] = useState(false)

  const CONCEPT_B_COLOR = '#a855f7'

  const allAssigned = statements.every(s => assignments[s.id] !== null)

  const handleAssign = (id, side) => {
    if (revealed) return
    setAssignments(prev => ({
      ...prev,
      [id]: prev[id] === side ? null : side,   // toggle off if already selected
    }))
  }

  const handleCheck = () => {
    if (!allAssigned || revealed) return
    const correct = statements.every(s => assignments[s.id] === s.correct)
    setRevealed(true)
    setAllCorrect(correct)
    setTimeout(() => onComplete(correct), 900)
  }

  return (
    <div className="space-y-4">
      {/* Column headers */}
      <div className="grid grid-cols-2 gap-2">
        <div
          className="text-center py-2 rounded-[10px] text-xs font-bold uppercase tracking-wide"
          style={{
            background: `${moduleColor}18`,
            border: `0.75px solid ${moduleColor}55`,
            color: moduleColor,
          }}
        >
          {conceptA}
        </div>
        <div
          className="text-center py-2 rounded-[10px] text-xs font-bold uppercase tracking-wide"
          style={{
            background: 'rgba(168,85,247,0.10)',
            border: '0.75px solid rgba(168,85,247,0.35)',
            color: CONCEPT_B_COLOR,
          }}
        >
          {conceptB}
        </div>
      </div>

      {/* Statement cards */}
      <div className="space-y-2.5">
        {statements.map((stmt) => {
          const assigned = assignments[stmt.id]
          const isA = assigned === 'A'
          const isB = assigned === 'B'

          // Reveal state
          const isCorrect = revealed && assigned === stmt.correct
          const isWrong   = revealed && assigned !== stmt.correct

          const cardBg = isCorrect
            ? 'rgba(0,188,125,0.10)'
            : isWrong
            ? 'rgba(239,68,68,0.10)'
            : 'rgba(15,22,41,0.95)'

          const cardBorder = isCorrect
            ? '0.75px solid rgba(0,188,125,0.5)'
            : isWrong
            ? '0.75px solid rgba(239,68,68,0.5)'
            : '0.75px solid rgba(255,255,255,0.08)'

          return (
            <motion.div
              key={stmt.id}
              className="rounded-[14px] px-4 py-3"
              style={{ background: cardBg, border: cardBorder }}
              animate={isWrong ? { x: [0, -5, 5, -3, 3, 0] } : {}}
              transition={{ duration: 0.35 }}
            >
              {/* Statement text + reveal icon */}
              <div className="flex items-start gap-2 mb-2.5">
                {revealed && (
                  isCorrect
                    ? <CheckCircle size={14} color="#00bc7d" className="mt-0.5 shrink-0" />
                    : <XCircle size={14} color="#f87171" className="mt-0.5 shrink-0" />
                )}
                <p
                  className="text-sm leading-snug flex-1"
                  style={{ color: isCorrect ? '#00bc7d' : isWrong ? '#f87171' : '#f8fafc' }}
                >
                  {stmt.text}
                </p>
              </div>

              {/* A / B buttons */}
              {!revealed && (
                <div className="flex gap-2">
                  {/* A button */}
                  <motion.button
                    className="flex-1 py-2 rounded-[10px] text-xs font-bold"
                    style={{
                      background: isA ? `${moduleColor}28` : 'rgba(255,255,255,0.04)',
                      border: isA ? `1.5px solid ${moduleColor}` : `0.75px solid rgba(255,255,255,0.10)`,
                      color: isA ? moduleColor : '#94a3b8',
                    }}
                    onClick={() => handleAssign(stmt.id, 'A')}
                    whileTap={{ scale: 0.95 }}
                    aria-label={`Assign "${stmt.text}" to ${conceptA}`}
                  >
                    {conceptA}
                  </motion.button>

                  {/* B button */}
                  <motion.button
                    className="flex-1 py-2 rounded-[10px] text-xs font-bold"
                    style={{
                      background: isB ? 'rgba(168,85,247,0.18)' : 'rgba(255,255,255,0.04)',
                      border: isB ? `1.5px solid ${CONCEPT_B_COLOR}` : `0.75px solid rgba(255,255,255,0.10)`,
                      color: isB ? CONCEPT_B_COLOR : '#94a3b8',
                    }}
                    onClick={() => handleAssign(stmt.id, 'B')}
                    whileTap={{ scale: 0.95 }}
                    aria-label={`Assign "${stmt.text}" to ${conceptB}`}
                  >
                    {conceptB}
                  </motion.button>
                </div>
              )}

              {/* Reveal: correct category label */}
              {revealed && (
                <div
                  className="mt-1 text-xs font-semibold"
                  style={{ color: isCorrect ? '#00bc7d' : '#f87171' }}
                >
                  {isCorrect
                    ? `Correct — ${stmt.correct === 'A' ? conceptA : conceptB}`
                    : `Should be: ${stmt.correct === 'A' ? conceptA : conceptB}`}
                </div>
              )}
            </motion.div>
          )
        })}
      </div>

      {/* Check button */}
      <AnimatePresence>
        {allAssigned && !revealed && (
          <motion.button
            className="w-full py-3.5 rounded-[16px] text-sm font-bold"
            style={{
              background: `linear-gradient(135deg, ${moduleColor}, ${moduleColor}cc)`,
              color: '#fff',
            }}
            onClick={handleCheck}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            whileTap={{ scale: 0.97 }}
          >
            Check answers
          </motion.button>
        )}
      </AnimatePresence>

      {/* SEN note after reveal */}
      <AnimatePresence>
        {revealed && senNote && (
          <motion.div
            className="px-4 py-3 rounded-[12px] flex items-start gap-2"
            style={{
              background: 'rgba(253,199,0,0.07)',
              border: '0.75px solid rgba(253,199,0,0.25)',
            }}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-lg leading-none shrink-0">💡</span>
            <span className="text-xs leading-relaxed" style={{ color: '#fdc700' }}>
              {senNote}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
