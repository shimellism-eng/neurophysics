/**
 * ConfidenceQuestion — quick self-reflection after learning.
 * Low pressure, icon-based, stores response. SEN-friendly.
 */
import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { speak } from '../../utils/tts'

const LEVELS = [
  { value: 'guessed', label: 'I guessed', emoji: '🤔', color: '#ef4444', bg: 'rgba(239,68,68,0.1)', border: 'rgba(239,68,68,0.3)' },
  { value: 'unsure', label: "I'm not sure", emoji: '😐', color: '#f97316', bg: 'rgba(249,115,22,0.1)', border: 'rgba(249,115,22,0.3)' },
  { value: 'confident', label: "I'm confident", emoji: '😊', color: '#00bc7d', bg: 'rgba(0,188,125,0.1)', border: 'rgba(0,188,125,0.3)' },
]

export default function ConfidenceQuestion({ data, moduleColor, onComplete }) {
  if (!data) return null
  const { senNote } = data
  const [selected, setSelected] = useState(null)
  const [submitted, setSubmitted] = useState(false)

  // Auto-TTS: read question text on mount if user has opted in
  useEffect(() => {
    if (localStorage.getItem('np_auto_tts') === 'true') {
      const text = data.question || data.text || 'How confident did you feel about this question?'
      setTimeout(() => speak(text), 400)
    }
  }, []) // eslint-disable-line

  const handleSelect = (value) => {
    if (submitted) return
    setSelected(value)
  }

  const handleSubmit = () => {
    if (!selected) return
    setSubmitted(true)

    // Save confidence to localStorage
    try {
      const key = 'np_confidence_log'
      const log = JSON.parse(localStorage.getItem(key) || '[]')
      log.push({ value: selected, ts: Date.now() })
      // Keep last 100 entries
      if (log.length > 100) log.splice(0, log.length - 100)
      localStorage.setItem(key, JSON.stringify(log))
    } catch {}

    // Confidence checks always "pass" — they're self-reflection
    setTimeout(() => onComplete(true), 600)
  }

  return (
    <div className="space-y-4">
      {/* F18: explain what confidence logging is for */}
      <div className="px-4 py-3 rounded-[14px]" style={{ background: 'rgba(99,102,241,0.07)', border: '0.75px solid rgba(99,102,241,0.2)' }}>
        <p className="text-xs font-semibold" style={{ color: '#818cf8' }}>What is this?</p>
        <p className="text-xs mt-1 leading-relaxed" style={{ color: '#a8b8cc' }}>
          Your answer here tells the app how well this topic is landing. Topics you feel unsure about will be surfaced again more often to help them stick.
        </p>
      </div>

      {/* Confidence levels */}
      <div className="space-y-3">
        {LEVELS.map((level, i) => {
          const isSelected = selected === level.value
          return (
            <motion.button
              key={level.value}
              className="w-full flex items-center gap-4 px-5 py-4 rounded-[16px]"
              style={{
                background: isSelected ? level.bg : 'rgba(18,26,47,0.9)',
                border: isSelected ? `2px solid ${level.border}` : '1.5px solid #2d3e55',
                transition: 'all 0.15s',
              }}
              onClick={() => handleSelect(level.value)}
              aria-label={level.label}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <span className="text-2xl" aria-hidden="true">{level.emoji}</span>
              <span
                className="text-sm font-semibold flex-1 text-left"
                style={{ color: isSelected ? level.color : '#cad5e2' }}
              >
                {level.label}
              </span>
              {isSelected && (
                <motion.div
                  className="w-5 h-5 rounded-full flex items-center justify-center"
                  style={{ background: level.color }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                >
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M1 4L3.5 6.5L9 1" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.div>
              )}
            </motion.button>
          )
        })}
      </div>

      {/* Submit button */}
      {selected && !submitted && (
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
          Continue
        </motion.button>
      )}

      {/* Thank-you after submission */}
      {submitted && (
        <motion.div
          className="text-center py-3 rounded-[14px]"
          style={{ background: 'rgba(99,102,241,0.08)', border: '0.75px solid rgba(99,102,241,0.25)' }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <p className="text-sm font-semibold" style={{ color: '#818cf8' }}>Thanks for reflecting!</p>
          {senNote && (
            <p className="text-xs mt-1" style={{ color: '#a8b8cc' }}>{senNote}</p>
          )}
        </motion.div>
      )}
    </div>
  )
}
