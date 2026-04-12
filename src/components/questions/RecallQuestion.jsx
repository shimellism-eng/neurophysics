/**
 * RecallQuestion — flashcard-style knowledge recall component.
 * Used in RecallScreen for AO1 (State/Describe/Explain/Define) questions.
 *
 * Props:
 *   data        {object}  — recall question object from qb-recall-*.js
 *   moduleColor {string}  — hex colour for the topic module
 *   onComplete  {fn}      — called with (correct: boolean) when student self-rates
 */
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { CheckCircle2, Circle, Minus, ChevronDown, Lightbulb } from 'lucide-react'
import { speak } from '../../utils/tts'

// Command word colour coding (research: visual cues help ADHD processing)
const COMMAND_COLORS = {
  State:    { bg: 'rgba(99,102,241,0.15)',  border: 'rgba(99,102,241,0.35)',  text: '#818cf8' },
  Describe: { bg: 'rgba(0,188,125,0.12)',   border: 'rgba(0,188,125,0.3)',    text: '#00bc7d' },
  Explain:  { bg: 'rgba(249,115,22,0.12)',  border: 'rgba(249,115,22,0.3)',   text: '#fb923c' },
  Define:   { bg: 'rgba(168,85,247,0.12)',  border: 'rgba(168,85,247,0.3)',   text: '#c084fc' },
}

export default function RecallQuestion({ data, moduleColor, onComplete }) {
  const [answer, setAnswer]       = useState('')
  const [revealed, setRevealed]   = useState(false)
  const [showSenHint, setShowSenHint] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('np_auto_tts') === 'true' && data?.question) {
      setTimeout(() => speak(data.question), 400)
    }
  }, []) // eslint-disable-line

  if (!data) return null

  const cmdStyle = COMMAND_COLORS[data.commandWord] || COMMAND_COLORS.State
  const accent   = moduleColor || '#6366f1'

  const handleReveal = () => setRevealed(true)

  const handleRate = (rating) => {
    // rating: 'correct' | 'partial' | 'wrong'
    onComplete(rating === 'correct')
  }

  return (
    <div className="flex flex-col gap-4">

      {/* Command word chip */}
      <div className="flex items-center gap-2">
        <span
          className="text-xs font-bold px-3 py-1 rounded-full"
          style={{ background: cmdStyle.bg, border: `0.75px solid ${cmdStyle.border}`, color: cmdStyle.text }}
        >
          {data.commandWord}
        </span>
        {data.marks > 1 && (
          <span className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
            {data.marks} marks
          </span>
        )}
      </div>

      {/* Question */}
      <div
        className="rounded-[16px] px-5 py-5"
        style={{ background: 'rgba(15,22,41,0.95)', border: `0.75px solid rgba(255,255,255,0.08)` }}
      >
        <p className="text-base font-medium leading-relaxed" style={{ color: '#f8fafc' }}>
          {data.question}
        </p>
      </div>

      {/* SEN hint (collapsible) */}
      {data.senNote && (
        <button
          className="flex items-center gap-2 text-xs text-left"
          style={{ color: 'rgba(255,255,255,0.4)' }}
          onClick={() => setShowSenHint(p => !p)}
        >
          <Lightbulb size={13} />
          <span>{showSenHint ? 'Hide hint' : 'Show hint'}</span>
          <ChevronDown
            size={12}
            style={{ transform: showSenHint ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
          />
        </button>
      )}
      <AnimatePresence>
        {showSenHint && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div
              className="rounded-[12px] px-4 py-3 text-sm"
              style={{ background: 'rgba(255,193,7,0.08)', border: '0.75px solid rgba(255,193,7,0.2)', color: '#fbbf24' }}
            >
              💡 {data.senNote}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Answer input (before reveal) */}
      {!revealed && (
        <div className="flex flex-col gap-3">
          <textarea
            className="w-full rounded-[12px] px-4 py-3 text-sm resize-none outline-none"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '0.75px solid rgba(255,255,255,0.1)',
              color: '#f8fafc',
              minHeight: 90,
            }}
            placeholder="Write your answer here, or just tap 'Show answer' to check..."
            value={answer}
            onChange={e => setAnswer(e.target.value)}
          />
          <motion.button
            className="w-full py-3.5 rounded-[14px] text-sm font-bold"
            style={{ background: accent, color: '#fff' }}
            onClick={handleReveal}
            whileTap={{ scale: 0.97 }}
          >
            Show model answer
          </motion.button>
        </div>
      )}

      {/* Model answer reveal */}
      <AnimatePresence>
        {revealed && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-3"
          >
            {/* Student answer (if they typed one) */}
            {answer.trim().length > 0 && (
              <div
                className="rounded-[12px] px-4 py-3"
                style={{ background: 'rgba(255,255,255,0.04)', border: '0.75px solid rgba(255,255,255,0.07)' }}
              >
                <div className="text-xs font-semibold mb-1" style={{ color: 'rgba(255,255,255,0.3)' }}>
                  Your answer
                </div>
                <p className="text-sm" style={{ color: '#a8b8cc' }}>{answer}</p>
              </div>
            )}

            {/* Model answer */}
            <div
              className="rounded-[14px] px-4 py-4"
              style={{ background: 'rgba(0,188,125,0.08)', border: '0.75px solid rgba(0,188,125,0.25)' }}
            >
              <div className="text-xs font-bold mb-2" style={{ color: '#00bc7d' }}>
                ✓ Model answer
              </div>
              <p className="text-sm font-medium leading-relaxed" style={{ color: '#f8fafc' }}>
                {data.modelAnswer}
              </p>
            </div>

            {/* Self-rating */}
            <div
              className="rounded-[14px] px-4 py-4"
              style={{ background: 'rgba(15,22,41,0.95)', border: '0.75px solid rgba(255,255,255,0.08)' }}
            >
              <p className="text-xs font-semibold mb-3 text-center" style={{ color: 'rgba(255,255,255,0.4)' }}>
                How did you do?
              </p>
              <div className="flex gap-2">
                <motion.button
                  className="flex-1 flex flex-col items-center gap-1 py-3 rounded-[12px] text-xs font-bold"
                  style={{ background: 'rgba(0,188,125,0.12)', border: '0.75px solid rgba(0,188,125,0.3)', color: '#00bc7d' }}
                  onClick={() => handleRate('correct')}
                  whileTap={{ scale: 0.96 }}
                >
                  <CheckCircle2 size={20} />
                  Got it
                </motion.button>
                <motion.button
                  className="flex-1 flex flex-col items-center gap-1 py-3 rounded-[12px] text-xs font-bold"
                  style={{ background: 'rgba(245,158,11,0.1)', border: '0.75px solid rgba(245,158,11,0.3)', color: '#f59e0b' }}
                  onClick={() => handleRate('partial')}
                  whileTap={{ scale: 0.96 }}
                >
                  <Minus size={20} />
                  Nearly
                </motion.button>
                <motion.button
                  className="flex-1 flex flex-col items-center gap-1 py-3 rounded-[12px] text-xs font-bold"
                  style={{ background: 'rgba(239,68,68,0.1)', border: '0.75px solid rgba(239,68,68,0.3)', color: '#f87171' }}
                  onClick={() => handleRate('wrong')}
                  whileTap={{ scale: 0.96 }}
                >
                  <Circle size={20} />
                  Not yet
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
