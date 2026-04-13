/**
 * SequenceSortQuestion — tap items to build the correct order.
 * Max 4 items. Tap-to-add, tap-to-remove. No drag. SEN-friendly.
 */
import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { CheckCircle, XCircle, RotateCcw } from 'lucide-react'

export default function SequenceSortQuestion({ data, moduleColor, onComplete }) {
  if (!data) return null
  const { items = [], correctOrder = [], senNote } = data
  const [order, setOrder] = useState([])           // indices the user tapped
  const [submitted, setSubmitted] = useState(false)

  // Proper Fisher-Yates shuffle using Math.random() — prevents position memorisation
  const [displayOrder] = useState(() => {
    const indices = items.map((_, i) => i)
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[indices[i], indices[j]] = [indices[j], indices[i]]
    }
    return indices
  })

  const isCorrect = JSON.stringify(order) === JSON.stringify(correctOrder)
  const isInOrder = (idx) => order.includes(idx)
  const orderPosition = (idx) => order.indexOf(idx) + 1

  const handleTapItem = (idx) => {
    if (submitted) return
    if (isInOrder(idx)) {
      // Remove from order (only if it's the last one added)
      if (order[order.length - 1] === idx) {
        setOrder(order.slice(0, -1))
      }
    } else {
      setOrder([...order, idx])
    }
  }

  const handleReset = () => {
    if (submitted) return
    setOrder([])
  }

  const handleSubmit = () => {
    if (order.length !== items.length) return
    setSubmitted(true)
    setTimeout(() => onComplete(isCorrect), 800)
  }

  return (
    <div className="space-y-3">
      {/* Ordered slots — shows what user has built */}
      <div className="rounded-[16px] p-3" style={{ background: 'rgba(18,26,47,0.6)', border: `0.75px solid ${moduleColor}25` }}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#a8b8cc' }}>Your order</span>
          {order.length > 0 && !submitted && (
            <button
              className="flex items-center gap-1 text-xs"
              style={{ color: '#a8b8cc', background: 'none', border: 'none' }}
              onClick={handleReset}
            >
              <RotateCcw size={11} />
              Reset
            </button>
          )}
        </div>

        <div className="flex flex-col gap-2 min-h-[48px]">
          {order.length === 0 ? (
            <div className="text-xs text-center py-3" style={{ color: '#4a5a72' }}>
              Tap items below in the correct order
            </div>
          ) : (
            order.map((idx, pos) => {
              const isRight = submitted && correctOrder[pos] === idx
              const isWrong = submitted && correctOrder[pos] !== idx
              return (
                <motion.div
                  key={`ordered-${idx}`}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-[10px]"
                  style={{
                    background: isRight ? 'rgba(0,188,125,0.12)' : isWrong ? 'rgba(239,68,68,0.12)' : `${moduleColor}12`,
                    border: isRight ? '1px solid #00bc7d' : isWrong ? '1px solid #ef4444' : `1px solid ${moduleColor}40`,
                  }}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <span
                    className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                    style={{
                      background: isRight ? '#00bc7d' : isWrong ? '#ef4444' : moduleColor,
                      color: '#fff',
                    }}
                  >
                    {pos + 1}
                  </span>
                  <span className="text-xs font-medium flex-1" style={{ color: '#f8fafc' }}>{items[idx]}</span>
                  {isRight && <CheckCircle size={13} color="#00bc7d" />}
                  {isWrong && <XCircle size={13} color="#ef4444" />}
                </motion.div>
              )
            })
          )}
        </div>
      </div>

      {/* Available items — tap to add */}
      {!submitted && (
        <div className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#a8b8cc' }}>
            Tap to add
          </span>
          <div className="grid grid-cols-2 gap-2">
            {displayOrder.map((idx) => {
              const used = isInOrder(idx)
              return (
                <motion.button
                  key={`avail-${idx}`}
                  className="px-3 py-3 rounded-[12px] text-xs font-medium text-center"
                  style={{
                    background: used ? 'rgba(18,26,47,0.4)' : 'rgba(18,26,47,0.9)',
                    border: used ? '0.75px solid #1d293d' : `0.75px solid ${moduleColor}40`,
                    color: used ? '#4a5a72' : '#f8fafc',
                    textDecoration: used ? 'line-through' : 'none',
                  }}
                  onClick={() => handleTapItem(idx)}
                  whileTap={!used ? { scale: 0.95 } : {}}
                  disabled={used}
                >
                  {items[idx]}
                </motion.button>
              )
            })}
          </div>
        </div>
      )}

      {/* Correct order shown after wrong answer */}
      {submitted && !isCorrect && (
        <motion.div
          className="rounded-[12px] p-3"
          style={{ background: 'rgba(0,188,125,0.07)', border: '0.75px solid rgba(0,188,125,0.25)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="text-xs font-semibold mb-1.5" style={{ color: '#00bc7d' }}>Correct order:</div>
          {correctOrder.map((idx, pos) => (
            <div key={pos} className="text-xs py-0.5" style={{ color: '#cad5e2' }}>
              {pos + 1}. {items[idx]}
            </div>
          ))}
        </motion.div>
      )}

      {/* Submit button */}
      {order.length === items.length && !submitted && (
        <motion.button
          className="w-full py-3.5 rounded-[14px] font-semibold text-sm"
          style={{
            background: `linear-gradient(135deg, ${moduleColor}, ${moduleColor}cc)`,
            boxShadow: `0px 6px 20px ${moduleColor}40`,
            color: '#fff',
          }}
          onClick={handleSubmit}
          whileTap={{ scale: 0.97 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Check Order
        </motion.button>
      )}

      {/* SEN note */}
      <AnimatePresence>
        {submitted && senNote && (
          <motion.div
            className="px-4 py-3 rounded-[12px]"
            style={{ background: 'rgba(253,199,0,0.07)', border: '0.75px solid rgba(253,199,0,0.25)' }}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-xs leading-relaxed" style={{ color: '#fdc700' }}>{senNote}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
