/**
 * ExtendedAnswerQuestion — 6-mark open-ended exam question.
 * Student reads the question, optionally views the mark scheme points,
 * then reveals a model answer and self-rates their response.
 */
import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ChevronDown, ChevronUp, Lightbulb, Eye, CheckCircle } from 'lucide-react'

function renderMarkdown(text) {
  // Convert **bold** to <strong>
  const parts = text.split(/\*\*(.*?)\*\*/g)
  return parts.map((part, i) =>
    i % 2 === 1
      ? <strong key={i} style={{ color: '#f8fafc' }}>{part}</strong>
      : part
  )
}

export default function ExtendedAnswerQuestion({ data, moduleColor, onComplete }) {
  const { question, questionSubtitle, markScheme, modelAnswer, senNote } = data
  const [showMarkScheme, setShowMarkScheme] = useState(false)
  const [revealed, setRevealed] = useState(false)
  const [selfScore, setSelfScore] = useState(null)

  const scores = [0, 2, 4, 6]

  const handleScore = (score) => {
    setSelfScore(score)
    onComplete(score >= 4) // 4+ marks = pass
  }

  return (
    <div>
      {/* Question subtitle badge */}
      {questionSubtitle && (
        <motion.div
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full mb-4 text-xs font-semibold"
          style={{ background: `${moduleColor}18`, color: moduleColor, border: `1px solid ${moduleColor}30` }}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
        >
          ✍️ {questionSubtitle}
        </motion.div>
      )}

      {/* Mark scheme toggle */}
      <motion.button
        className="w-full flex items-center justify-between px-4 py-3 rounded-[14px] mb-4 text-sm font-semibold"
        style={{
          background: showMarkScheme ? `${moduleColor}12` : 'rgba(18,26,47,0.6)',
          border: `1px solid ${showMarkScheme ? moduleColor + '40' : '#2d3e55'}`,
          color: showMarkScheme ? moduleColor : '#8899aa',
        }}
        onClick={() => setShowMarkScheme(s => !s)}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
      >
        <span className="flex items-center gap-2">
          <Lightbulb size={15} />
          Marking points (6 marks)
        </span>
        {showMarkScheme ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
      </motion.button>

      <AnimatePresence>
        {showMarkScheme && (
          <motion.div
            className="mb-4 rounded-[14px] overflow-hidden"
            style={{ background: 'rgba(18,26,47,0.85)', border: '1px solid #2d3e55' }}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="px-4 pt-3 pb-1">
              <p className="text-[11px] uppercase tracking-wide font-semibold mb-2" style={{ color: '#556677' }}>
                Award 1 mark for each of the following:
              </p>
            </div>
            <div className="px-4 pb-4 space-y-2">
              {markScheme.map((point, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2 px-3 py-2.5 rounded-[10px]"
                  style={{ background: `${moduleColor}08`, border: `0.75px solid ${moduleColor}20` }}
                >
                  <span
                    className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5"
                    style={{ background: moduleColor, color: '#fff' }}
                  >
                    {i + 1}
                  </span>
                  <p className="text-xs leading-relaxed" style={{ color: '#cad5e2' }}>
                    {point.replace(/^Award 1 mark:\s*/i, '')}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reveal model answer */}
      {!revealed && (
        <motion.button
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-[14px] font-semibold text-sm mb-4"
          style={{
            background: `linear-gradient(135deg, ${moduleColor}, ${moduleColor}cc)`,
            color: '#fff',
            boxShadow: `0 6px 20px ${moduleColor}40`,
          }}
          onClick={() => setRevealed(true)}
          whileTap={{ scale: 0.97 }}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Eye size={16} />
          Reveal Model Answer
        </motion.button>
      )}

      <AnimatePresence>
        {revealed && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {/* Model answer */}
            <div
              className="rounded-[14px] p-4"
              style={{ background: 'rgba(18,26,47,0.9)', border: '1px solid #2d3e55' }}
            >
              <p className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: moduleColor }}>
                Model Answer
              </p>
              <p className="text-sm leading-relaxed" style={{ color: '#cad5e2' }}>
                {renderMarkdown(modelAnswer)}
              </p>
            </div>

            {/* SEN note */}
            {senNote && (
              <motion.div
                className="flex items-start gap-2 px-4 py-3 rounded-[12px]"
                style={{ background: 'rgba(253,199,0,0.07)', border: '0.75px solid rgba(253,199,0,0.25)' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 }}
              >
                <Lightbulb size={14} color="#fdc700" style={{ marginTop: 1, flexShrink: 0 }} />
                <p className="text-xs leading-relaxed" style={{ color: '#fdc700' }}>{senNote}</p>
              </motion.div>
            )}

            {/* Self-rating */}
            {selfScore === null ? (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <p className="text-sm font-semibold text-center mb-3" style={{ color: '#a8b8cc' }}>
                  How many marks would you award yourself?
                </p>
                <div className="grid grid-cols-4 gap-2">
                  {scores.map(score => (
                    <motion.button
                      key={score}
                      className="py-3 rounded-[12px] font-bold text-base"
                      style={{
                        background: score >= 4
                          ? `${moduleColor}20`
                          : score >= 2
                            ? 'rgba(253,199,0,0.12)'
                            : 'rgba(239,68,68,0.10)',
                        border: score >= 4
                          ? `1.5px solid ${moduleColor}50`
                          : score >= 2
                            ? '1.5px solid rgba(253,199,0,0.35)'
                            : '1.5px solid rgba(239,68,68,0.3)',
                        color: score >= 4 ? moduleColor : score >= 2 ? '#fdc700' : '#ef4444',
                      }}
                      onClick={() => handleScore(score)}
                      whileTap={{ scale: 0.93 }}
                    >
                      {score}/6
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                className="flex items-center gap-3 px-4 py-3 rounded-[12px]"
                style={{
                  background: selfScore >= 4 ? 'rgba(0,188,125,0.10)' : 'rgba(253,199,0,0.08)',
                  border: selfScore >= 4 ? '1px solid rgba(0,188,125,0.3)' : '1px solid rgba(253,199,0,0.3)',
                }}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <CheckCircle size={18} color={selfScore >= 4 ? '#00bc7d' : '#fdc700'} />
                <div>
                  <p className="text-sm font-semibold" style={{ color: selfScore >= 4 ? '#00bc7d' : '#fdc700' }}>
                    You marked yourself {selfScore}/6
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: '#8899aa' }}>
                    {selfScore >= 4 ? 'Great work — aim for all 6 mark points next time.' : 'Keep practising — use the mark scheme to improve.'}
                  </p>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
