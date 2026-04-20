/**
 * DiagramQuestion — Multi-part exam question with an embedded SVG diagram.
 * Modelled on real past paper (2018-2024) question structure.
 *
 * data shape:
 * {
 *   type: "diagram-question",
 *   marks: 5,
 *   diagramId: "series_circuit_av",
 *   source: "Paper 1 2022 style",
 *   context: "The diagram shows...",
 *   parts: [
 *     { part: "a", question: "...", marks: 1, answer: "..." },
 *     { part: "b", question: "...", marks: 2, answer: "..." },
 *   ],
 *   hint: "...",
 *   senNote: "...",
 *   tier: 2,
 * }
 */
import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { CaretDown, CaretUp, Eye, EyeSlash, Lightbulb, CheckCircle, MagnifyingGlassPlus } from '@phosphor-icons/react'
import { EXAM_DIAGRAMS } from '../../data/examDiagrams'

export default function DiagramQuestion({ data, moduleColor, onComplete }) {
  if (!data) return null
  const {
    marks = 0,
    diagramId,
    source,
    context,
    parts = [],
    hint,
    senNote,
  } = data

  const [revealed, setRevealed]   = useState({})   // { "a": true, "b": false }
  const [showHint, setShowHint]   = useState(false)
  const [done, setDone]           = useState(false)
  const [zoomed, setZoomed]       = useState(false)

  const DiagramComponent = EXAM_DIAGRAMS?.[diagramId]

  const allRevealed = parts.length > 0 && parts.every(p => revealed[p.part])

  const toggleReveal = (part) => {
    setRevealed(prev => ({ ...prev, [part]: !prev[part] }))
  }

  const handleDone = () => {
    setDone(true)
    onComplete(true)
  }

  const totalAnswerMarks = parts.reduce((s, p) => s + (p.marks || 0), 0)

  return (
    <div>
      {/* ── Source badge ── */}
      {source && (
        <motion.div
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold mb-3"
          style={{
            background: `${moduleColor}14`,
            border: `0.75px solid ${moduleColor}35`,
            color: moduleColor,
          }}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
        >
          📄 {source}
        </motion.div>
      )}

      {/* ── Diagram card ── */}
      <motion.div
        className="rounded-[18px] overflow-hidden mb-4"
        style={{
          background: '#121a2f',
          border: `1px solid ${moduleColor}35`,
          boxShadow: `0 4px 24px ${moduleColor}18`,
        }}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
      >
        {/* Card header */}
        <div
          className="flex items-center justify-between px-4 py-2"
          style={{
            background: `${moduleColor}10`,
            borderBottom: `0.75px solid ${moduleColor}25`,
          }}
        >
          <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: moduleColor }}>
            Diagram
          </span>
          <button
            className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full"
            style={{ color: moduleColor, background: `${moduleColor}18`, border: `0.75px solid ${moduleColor}30` }}
            onClick={() => setZoomed(z => !z)}
          >
            <MagnifyingGlassPlus size={10} />
            {zoomed ? 'Shrink' : 'Zoom'}
          </button>
        </div>

        {/* SVG diagram */}
        <div className={`p-3 transition-all duration-300 ${zoomed ? 'scale-125 origin-top' : 'scale-100'}`}>
          {DiagramComponent ? (
            <DiagramComponent />
          ) : (
            <div
              className="flex items-center justify-center rounded-[12px] py-8"
              style={{ background: '#0b1121', border: '0.75px solid #1d293d', color: '#475569', fontSize: 13 }}
            >
              Diagram: <code className="ml-2 text-xs" style={{ color: '#8899b0' }}>{diagramId}</code>
            </div>
          )}
        </div>
      </motion.div>

      {/* ── Context ── */}
      {context && (
        <motion.p
          className="text-sm italic leading-relaxed mb-4 px-1"
          style={{ color: '#94a3b8' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {context}
        </motion.p>
      )}

      {/* ── Mark total ── */}
      <motion.div
        className="flex items-center justify-between mb-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.12 }}
      >
        <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#8899b0' }}>
          Question Parts
        </span>
        <span
          className="text-xs font-bold px-2.5 py-1 rounded-full"
          style={{
            background: `${moduleColor}15`,
            border: `0.75px solid ${moduleColor}40`,
            color: moduleColor,
          }}
        >
          {totalAnswerMarks} marks total
        </span>
      </motion.div>

      {/* ── Parts ── */}
      <div className="flex flex-col gap-3 mb-4">
        {parts.map((p, i) => (
          <motion.div
            key={p.part}
            className="rounded-[14px] overflow-hidden"
            style={{ border: `0.75px solid ${revealed[p.part] ? moduleColor + '50' : '#1d293d'}` }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 + i * 0.06 }}
          >
            {/* Part header */}
            <div
              className="flex items-start gap-3 px-4 py-3"
              style={{ background: revealed[p.part] ? `${moduleColor}0a` : 'rgba(18,26,47,0.9)' }}
            >
              {/* Part label */}
              <span
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5"
                style={{
                  background: revealed[p.part] ? moduleColor : '#1d293d',
                  color: revealed[p.part] ? '#fff' : '#8899b0',
                }}
              >
                {p.part}
              </span>

              <div className="flex-1 min-w-0">
                {/* Question text */}
                <p className="text-sm leading-relaxed" style={{ color: '#e2e8f0' }}>
                  {p.question}
                </p>

                {/* Marks badge */}
                <span
                  className="inline-block mt-1 text-[10px] font-semibold px-1.5 py-0.5 rounded-full"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '0.75px solid #1d293d',
                    color: '#8899b0',
                  }}
                >
                  [{p.marks} mark{p.marks !== 1 ? 's' : ''}]
                </span>
              </div>

              {/* Toggle button */}
              <button
                className="shrink-0 mt-0.5 flex items-center gap-1 px-2.5 py-1 rounded-[8px] text-xs font-semibold"
                style={{
                  background: revealed[p.part] ? `${moduleColor}20` : 'rgba(18,26,47,0.9)',
                  border: `0.75px solid ${revealed[p.part] ? moduleColor + '60' : '#2d3e55'}`,
                  color: revealed[p.part] ? moduleColor : '#8899b0',
                }}
                onClick={() => toggleReveal(p.part)}
              >
                {revealed[p.part]
                  ? <><EyeSlash size={11} /> Hide</>
                  : <><Eye size={11} /> Answer</>
                }
              </button>
            </div>

            {/* Answer reveal */}
            <AnimatePresence>
              {revealed[p.part] && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ borderTop: `0.75px solid ${moduleColor}30` }}
                >
                  <div
                    className="px-4 py-3"
                    style={{ background: `${moduleColor}08` }}
                  >
                    <p className="text-[11px] uppercase tracking-wide font-semibold mb-1.5" style={{ color: moduleColor }}>
                      Mark scheme
                    </p>
                    <p className="text-sm leading-relaxed" style={{ color: '#cad5e2' }}>
                      {p.answer}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* ── Hint ── */}
      {hint && (
        <motion.div
          className="mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <button
            className="w-full flex items-center gap-2 px-4 py-2.5 rounded-[12px] text-sm"
            style={{
              background: showHint ? 'rgba(253,199,0,0.07)' : 'rgba(18,26,47,0.7)',
              border: showHint ? '0.75px solid rgba(253,199,0,0.3)' : '0.75px solid #1d293d',
              color: showHint ? '#fdc700' : '#8899b0',
            }}
            onClick={() => setShowHint(h => !h)}
          >
            <Lightbulb size={13} />
            <span className="flex-1 text-left text-xs font-semibold">
              {showHint ? 'Hide hint' : 'Show hint'}
            </span>
            {showHint ? <CaretUp size={13} /> : <CaretDown size={13} />}
          </button>
          <AnimatePresence>
            {showHint && (
              <motion.div
                className="mt-1 px-4 py-3 rounded-[10px] text-xs leading-relaxed"
                style={{
                  background: 'rgba(253,199,0,0.05)',
                  border: '0.75px solid rgba(253,199,0,0.2)',
                  color: '#fde68a',
                }}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                {hint}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}

      {/* ── SEN note ── */}
      {senNote && allRevealed && (
        <motion.div
          className="flex items-start gap-2 px-4 py-3 rounded-[12px] mb-4"
          style={{ background: 'rgba(253,199,0,0.07)', border: '0.75px solid rgba(253,199,0,0.25)' }}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Lightbulb size={14} color="#fdc700" style={{ marginTop: 1, flexShrink: 0 }} />
          <p className="text-xs leading-relaxed" style={{ color: '#fdc700' }}>{senNote}</p>
        </motion.div>
      )}

      {/* ── Done button — appears once all answers revealed ── */}
      <AnimatePresence>
        {allRevealed && !done && (
          <motion.button
            className="w-full py-4 rounded-[16px] font-semibold text-base flex items-center justify-center gap-2"
            style={{
              background: `${moduleColor}`,
              boxShadow: `0 8px 24px ${moduleColor}40`,
              color: '#fff',
            }}
            onClick={handleDone}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <CheckCircle size={18} />
            Mark as Done
          </motion.button>
        )}
      </AnimatePresence>

      {done && (
        <motion.div
          className="flex items-center gap-3 px-4 py-3 rounded-[12px]"
          style={{ background: 'rgba(0,188,125,0.10)', border: '1px solid rgba(0,188,125,0.3)' }}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <CheckCircle size={18} color="#00bc7d" />
          <p className="text-sm font-semibold" style={{ color: '#00bc7d' }}>
            Question reviewed — tap Next to continue.
          </p>
        </motion.div>
      )}
    </div>
  )
}
