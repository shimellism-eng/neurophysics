/**
 * TapMatchQuestion — tap an item, then tap its match.
 * Max 4 pairs, large touch targets, SEN-friendly.
 */
import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { CheckCircle, XCircle } from 'lucide-react'

export default function TapMatchQuestion({ data, moduleColor, onComplete }) {
  const { pairs, senNote } = data
  const [selectedItem, setSelectedItem] = useState(null)
  const [matched, setMatched] = useState({})      // { itemIdx: matchIdx }
  const [wrongFlash, setWrongFlash] = useState(null)
  const [done, setDone] = useState(false)

  const items = pairs.map((p, i) => ({ ...p, idx: i }))
  const matches = pairs.map((p, i) => ({ label: p.match, idx: i }))

  // Shuffle matches once (deterministic based on pairs length)
  const [shuffledMatches] = useState(() => {
    const a = [...matches]
    for (let i = a.length - 1; i > 0; i--) {
      const j = (i * 7 + 3) % (i + 1)
      ;[a[i], a[j]] = [a[j], a[i]]
    }
    return a
  })

  const handleItemTap = (idx) => {
    if (done || matched[idx] !== undefined) return
    setSelectedItem(selectedItem === idx ? null : idx)
  }

  const handleMatchTap = (matchIdx) => {
    if (done || selectedItem === null) return
    // Check if this match is already taken
    if (Object.values(matched).includes(matchIdx)) return

    if (matchIdx === selectedItem) {
      // Correct match
      const next = { ...matched, [selectedItem]: matchIdx }
      setMatched(next)
      setSelectedItem(null)
      if (Object.keys(next).length === pairs.length) {
        setDone(true)
        setTimeout(() => onComplete(true), 600)
      }
    } else {
      // Wrong match
      setWrongFlash(matchIdx)
      setTimeout(() => setWrongFlash(null), 500)
    }
  }

  const allCorrect = done

  return (
    <div className="space-y-4">
      {/* Items (left column) */}
      <div className="space-y-2">
        <div className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: '#a8b8cc' }}>
          Tap an item
        </div>
        {items.map((item, i) => {
          const isMatched = matched[item.idx] !== undefined
          const isSelected = selectedItem === item.idx
          return (
            <motion.button
              key={`item-${i}`}
              className="w-full text-left px-4 py-3.5 rounded-[14px] text-sm font-medium"
              style={{
                background: isMatched
                  ? 'rgba(0,188,125,0.12)'
                  : isSelected
                  ? `${moduleColor}20`
                  : 'rgba(18,26,47,0.9)',
                border: isMatched
                  ? '1.5px solid #00bc7d'
                  : isSelected
                  ? `1.5px solid ${moduleColor}`
                  : '0.75px solid #1d293d',
                color: isMatched ? '#00bc7d' : '#f8fafc',
                opacity: isMatched ? 0.7 : 1,
              }}
              onClick={() => handleItemTap(item.idx)}
              whileTap={!isMatched ? { scale: 0.97 } : {}}
            >
              <div className="flex items-center gap-2">
                {isMatched && <CheckCircle size={14} color="#00bc7d" />}
                <span>{item.item}</span>
              </div>
            </motion.button>
          )
        })}
      </div>

      {/* Matches (right column) */}
      <div className="space-y-2">
        <div className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: '#a8b8cc' }}>
          Then tap its match
        </div>
        {shuffledMatches.map((match, i) => {
          const isTaken = Object.values(matched).includes(match.idx)
          const isWrong = wrongFlash === match.idx
          return (
            <motion.button
              key={`match-${i}`}
              className="w-full text-left px-4 py-3.5 rounded-[14px] text-sm font-medium"
              style={{
                background: isTaken
                  ? 'rgba(0,188,125,0.12)'
                  : isWrong
                  ? 'rgba(239,68,68,0.15)'
                  : 'rgba(18,26,47,0.9)',
                border: isTaken
                  ? '1.5px solid #00bc7d'
                  : isWrong
                  ? '1.5px solid #ef4444'
                  : `0.75px solid ${moduleColor}40`,
                color: isTaken ? '#00bc7d' : '#f8fafc',
                opacity: isTaken ? 0.7 : 1,
              }}
              onClick={() => handleMatchTap(match.idx)}
              whileTap={!isTaken ? { scale: 0.97 } : {}}
              animate={isWrong ? { x: [0, -6, 6, -4, 4, 0] } : {}}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-2">
                {isTaken && <CheckCircle size={14} color="#00bc7d" />}
                <span>{match.label}</span>
              </div>
            </motion.button>
          )
        })}
      </div>

      {/* SEN note after completion */}
      <AnimatePresence>
        {done && senNote && (
          <motion.div
            className="px-4 py-3 rounded-[12px] flex items-start gap-2 mt-2"
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
