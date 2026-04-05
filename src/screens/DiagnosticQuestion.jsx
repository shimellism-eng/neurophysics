import { motion, AnimatePresence } from 'motion/react'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import { ArrowLeft, HelpCircle, BookOpen, ChevronDown, AlignLeft, Lightbulb } from 'lucide-react'
import { TOPICS } from '../data/topics'

// Parse **highlighted** segments in model answer strings
function parseHighlighted(text, color) {
  const parts = text.split(/\*\*(.*?)\*\*/g)
  return parts.map((part, i) =>
    i % 2 === 1
      ? (
        <span
          key={i}
          style={{
            color,
            fontWeight: 700,
            background: `${color}22`,
            borderRadius: 4,
            padding: '1px 4px',
          }}
        >
          {part}
        </span>
      )
      : <span key={i}>{part}</span>
  )
}

function getKeywords(topic) {
  if (topic.keywords) return topic.keywords
  const raw = `${topic.title} ${topic.subtitle} ${topic.concept}`
  const words = raw.match(/\b[A-Z][a-z]{3,}\b|\b[a-z]{5,}\b/g) || []
  const unique = [...new Set(words)].filter(w => !['this', 'that', 'from', 'with', 'when', 'where', 'which', 'their', 'there', 'these', 'about', 'have', 'into', 'been', 'will'].includes(w))
  return unique.slice(0, 8)
}

function getSentenceStarters(topic) {
  if (topic.sentenceStarters) return topic.sentenceStarters
  return [
    'The answer is...',
    'This happens because...',
    'An example of this is...',
    'The key equation is...',
    'I think the correct answer is... because...',
  ]
}

function SENPanel({ topic, activeTab, onTab }) {
  const [showModelAnswers, setShowModelAnswers] = useState(false)
  const keywords = getKeywords(topic)
  const starters = getSentenceStarters(topic)
  const modelAnswers = topic.modelAnswers || []

  return (
    <div
      className="rounded-[16px] overflow-hidden mb-4"
      style={{ background: 'rgba(18,26,47,0.95)', border: '0.75px solid #2d3e55' }}
    >
      {/* Tabs */}
      <div className="flex border-b" style={{ borderColor: '#1d293d' }}>
        {[
          { id: 'keywords', label: 'Keyword Bank', icon: BookOpen },
          { id: 'starters', label: 'Sentence Starters', icon: AlignLeft },
        ].map(tab => (
          <button
            key={tab.id}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-semibold"
            style={{
              color: activeTab === tab.id ? '#155dfc' : '#90a1b9',
              borderBottom: activeTab === tab.id ? '2px solid #155dfc' : '2px solid transparent',
            }}
            onClick={() => onTab(tab.id)}
          >
            <tab.icon size={13} />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="p-3">
        {activeTab === 'keywords' && (
          <div className="flex flex-wrap gap-2">
            {keywords.map((kw, i) => (
              <motion.span
                key={kw}
                className="px-3 py-1.5 rounded-full text-xs font-semibold"
                style={{ background: `${topic.moduleColor}18`, color: topic.moduleColor, border: `1px solid ${topic.moduleColor}40` }}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.04 }}
              >
                {kw}
              </motion.span>
            ))}
          </div>
        )}

        {activeTab === 'starters' && (
          <div>
            <div className="space-y-2">
              {starters.map((s, i) => (
                <motion.div
                  key={i}
                  className="px-3 py-2 rounded-[10px] text-xs"
                  style={{ background: 'rgba(99,102,241,0.08)', border: '0.75px solid rgba(99,102,241,0.2)', color: '#cad5e2' }}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  {s}
                </motion.div>
              ))}
            </div>

            {modelAnswers.length > 0 && (
              <div className="mt-3">
                <motion.button
                  className="w-full flex items-center gap-2 px-3 py-2.5 rounded-[10px] text-xs font-semibold"
                  style={{
                    background: 'rgba(253,199,0,0.07)',
                    border: '0.75px solid rgba(253,199,0,0.28)',
                    color: '#fdc700',
                  }}
                  onClick={() => setShowModelAnswers(v => !v)}
                  whileTap={{ scale: 0.97 }}
                >
                  <Lightbulb size={12} color="#fdc700" />
                  <span className="flex-1 text-left">Want to see model answers?</span>
                  <motion.div animate={{ rotate: showModelAnswers ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown size={11} color="#fdc700" />
                  </motion.div>
                </motion.button>

                <AnimatePresence>
                  {showModelAnswers && (
                    <motion.div
                      className="mt-2 space-y-2"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.22 }}
                    >
                      {modelAnswers.map((answer, i) => (
                        <motion.div
                          key={i}
                          className="px-3 py-2.5 rounded-[10px] text-xs leading-relaxed"
                          style={{
                            background: 'rgba(11,17,33,0.7)',
                            border: `0.75px solid ${topic.moduleColor}30`,
                            color: '#90a1b9',
                          }}
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.05 }}
                        >
                          {parseHighlighted(answer, topic.moduleColor)}
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default function DiagnosticQuestion() {
  const { id } = useParams()
  const navigate = useNavigate()
  const topic = TOPICS[id]
  const [selected, setSelected] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [showSEN, setShowSEN] = useState(false)
  const [senTab, setSenTab] = useState('keywords')

  if (!topic) return null

  const VisualComponent = topic.lessonVisual

  const handleSelect = (idx) => {
    if (submitted) return
    setSelected(idx)
  }

  const handleSubmit = () => {
    if (selected === null) return
    setSubmitted(true)
    setTimeout(() => {
      navigate(`/feedback/${id}?result=${selected === topic.correctAnswer ? 'correct' : 'wrong'}`)
    }, 900)
  }

  const optionLabels = ['A', 'B', 'C', 'D']

  const getOptionStyle = (idx) => {
    if (!submitted) {
      return selected === idx
        ? { background: `${topic.moduleColor}20`, border: `1.5px solid ${topic.moduleColor}`, color: '#f8fafc' }
        : { background: 'rgba(18,26,47,0.9)', border: '0.75px solid #1d293d', color: '#cad5e2' }
    }
    if (idx === topic.correctAnswer) return { background: 'rgba(0,188,125,0.15)', border: '1.5px solid #00bc7d', color: '#f8fafc' }
    if (idx === selected) return { background: 'rgba(239,68,68,0.15)', border: '1.5px solid #ef4444', color: '#f8fafc' }
    return { background: 'rgba(18,26,47,0.5)', border: '0.75px solid #1d293d', color: '#90a1b9' }
  }

  return (
    <div className="flex flex-col h-full overflow-hidden" style={{ background: '#0b1121' }}>

      {/* ── Header ── */}
      <div className="px-5 pt-5 pb-3 shrink-0 flex items-center gap-3">
        <button
          onClick={() => navigate(`/lesson/${id}`)}
          className="w-9 h-9 rounded-[12px] flex items-center justify-center"
          style={{ background: 'rgba(18,26,47,0.9)', border: '0.75px solid #1d293d' }}
        >
          <ArrowLeft size={18} color="#90a1b9" />
        </button>
        <div className="flex-1 min-w-0">
          <div className="text-xs font-medium" style={{ color: topic.moduleColor }}>Knowledge Check</div>
          <h1 className="text-base font-bold leading-tight truncate" style={{ color: '#f8fafc' }}>{topic.title}</h1>
        </div>
        <motion.button
          className="flex items-center gap-1.5 px-3 py-2 rounded-[12px]"
          style={{
            background: showSEN ? 'rgba(21,93,252,0.15)' : 'rgba(18,26,47,0.9)',
            border: showSEN ? '1px solid #155dfc80' : '0.75px solid #1d293d',
          }}
          onClick={() => setShowSEN(v => !v)}
          whileTap={{ scale: 0.95 }}
        >
          <HelpCircle size={14} color={showSEN ? '#155dfc' : '#90a1b9'} />
          <span className="text-xs font-semibold" style={{ color: showSEN ? '#155dfc' : '#90a1b9' }}>Support</span>
          <motion.div animate={{ rotate: showSEN ? 180 : 0 }}>
            <ChevronDown size={12} color={showSEN ? '#155dfc' : '#90a1b9'} />
          </motion.div>
        </motion.button>
      </div>

      {/* ── Single scroll container  -  everything below header ── */}
      <div className="flex-1 overflow-y-auto px-5">

        {/* Support panel  -  inline, expands naturally */}
        <AnimatePresence>
          {showSEN && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              style={{ overflow: 'hidden' }}
            >
              <SENPanel topic={topic} activeTab={senTab} onTab={setSenTab} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Visual */}
        <motion.div
          className="w-full rounded-[24px] mb-5 overflow-hidden"
          style={{
            minHeight: 140,
            background: 'rgba(18,26,47,0.9)',
            border: `0.75px solid ${topic.moduleColor}30`,
            boxShadow: 'inset 0px 2px 4px 0px rgba(0,0,0,0.05)',
          }}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <VisualComponent />
        </motion.div>

        {/* Question */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-4"
        >
          <h2 className="text-base font-semibold leading-snug" style={{ color: '#f8fafc' }}>
            {topic.question}
          </h2>
          {topic.questionSubtitle && (
            <p className="text-xs mt-1" style={{ color: '#90a1b9' }}>{topic.questionSubtitle}</p>
          )}
        </motion.div>

        {/* Options */}
        <div className="space-y-2">
          {topic.options.map((opt, idx) => (
            <motion.button
              key={idx}
              className="w-full text-left rounded-[16px] p-4 flex items-center gap-3"
              style={getOptionStyle(idx)}
              onClick={() => handleSelect(idx)}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + idx * 0.07 }}
              whileTap={submitted ? {} : { scale: 0.98 }}
            >
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                style={{
                  background: selected === idx && !submitted
                    ? topic.moduleColor
                    : submitted && idx === topic.correctAnswer
                    ? '#00bc7d'
                    : submitted && idx === selected
                    ? '#ef4444'
                    : '#1d293d',
                  color: '#fff',
                }}
              >
                {optionLabels[idx]}
              </div>
              <span className="text-sm font-medium flex-1 min-w-0 text-left">{opt}</span>
            </motion.button>
          ))}
        </div>

        {/* Extra bottom padding so last option isn't hidden behind button */}
        <div style={{ height: 24 }} />
      </div>

      {/* ── Check Answer  -  sticky footer, only shows when needed ── */}
      <AnimatePresence>
        {selected !== null && !submitted && (
          <motion.div
            className="shrink-0 px-5 pb-8 pt-3"
            style={{ background: '#0b1121', borderTop: '0.75px solid #1d293d' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <motion.button
              className="w-full py-4 rounded-[16px] font-semibold text-base"
              style={{
                background: `linear-gradient(135deg, ${topic.moduleColor}, ${topic.moduleColor}cc)`,
                boxShadow: `0px 8px 24px ${topic.moduleColor}40`,
                color: '#fff',
              }}
              onClick={handleSubmit}
              whileTap={{ scale: 0.97 }}
            >
              Check Answer
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}
