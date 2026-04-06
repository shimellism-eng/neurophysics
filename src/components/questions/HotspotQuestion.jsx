/**
 * HotspotQuestion — tap the correct labelled area in a simple diagram.
 * Uses text-based labeled areas (no external images needed).
 * Large, forgiving tap targets. SEN-friendly.
 */
import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { CheckCircle, XCircle } from 'lucide-react'

export default function HotspotQuestion({ data, moduleColor, onComplete }) {
  const { areas, senNote } = data
  const [selected, setSelected] = useState(null)
  const [submitted, setSubmitted] = useState(false)

  const correctIdx = areas.findIndex(a => a.correct)

  const handleTap = (idx) => {
    if (submitted) return
    setSelected(idx)
  }

  const handleSubmit = () => {
    if (selected === null) return
    setSubmitted(true)
    setTimeout(() => onComplete(selected === correctIdx), 800)
  }

  const getAreaStyle = (idx) => {
    if (!submitted) {
      return selected === idx
        ? { background: `${moduleColor}20`, border: `2px solid ${moduleColor}`, color: '#f8fafc' }
        : { background: 'rgba(18,26,47,0.9)', border: '1.5px solid #2d3e55', color: '#cad5e2' }
    }
    if (idx === correctIdx) return { background: 'rgba(0,188,125,0.15)', border: '2px solid #00bc7d', color: '#f8fafc' }
    if (idx === selected) return { background: 'rgba(239,68,68,0.15)', border: '2px solid #ef4444', color: '#f8fafc' }
    return { background: 'rgba(18,26,47,0.5)', border: '1.5px solid #1d293d', color: '#a8b8cc' }
  }

  // Arrange areas in a grid (2 columns)
  return (
    <div className="space-y-3">
      {/* Diagram area — grid of tappable labeled zones */}
      <div className="rounded-[20px] p-4" style={{ background: 'rgba(18,26,47,0.6)', border: `0.75px solid ${moduleColor}25` }}>
        <div className="grid grid-cols-2 gap-3">
          {areas.map((area, idx) => (
            <motion.button
              key={idx}
              className="flex flex-col items-center justify-center gap-2 py-5 px-3 rounded-[14px] min-h-[80px]"
              style={getAreaStyle(idx)}
              onClick={() => handleTap(idx)}
              whileTap={!submitted ? { scale: 0.95 } : {}}
            >
              {area.icon && (
                <span className="text-2xl">{area.icon}</span>
              )}
              <span className="text-sm font-semibold text-center leading-snug">{area.label}</span>
              {submitted && idx === correctIdx && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                  <CheckCircle size={16} color="#00bc7d" />
                </motion.div>
              )}
              {submitted && idx === selected && idx !== correctIdx && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                  <XCircle size={16} color="#ef4444" />
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Submit button */}
      {selected !== null && !submitted && (
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
          Confirm
        </motion.button>
      )}

      {/* SEN note */}
      <AnimatePresence>
        {submitted && senNote && (
          <motion.div
            className="px-4 py-3 rounded-[12px] flex items-start gap-2"
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
