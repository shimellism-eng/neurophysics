/**
 * GraphQuestion — interactive velocity-time (or other) graph questions.
 * Renders SVG graph, asks for area/gradient/value reading.
 */
import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { CheckCircle, XCircle, Lightbulb, Calculator } from 'lucide-react'

const GRAPH_W = 300
const GRAPH_H = 180
const PAD = { top: 15, right: 20, bottom: 35, left: 45 }
const PLOT_W = GRAPH_W - PAD.left - PAD.right
const PLOT_H = GRAPH_H - PAD.top - PAD.bottom

function buildScale(points, key) {
  const vals = points.map(p => p[key])
  const max = Math.max(...vals)
  return { min: 0, max: max || 1 }
}

function toSvg(point, xScale, yScale) {
  const x = PAD.left + (point.t / xScale.max) * PLOT_W
  const y = PAD.top + PLOT_H - (point.v / yScale.max) * PLOT_H
  return { x, y }
}

export default function GraphQuestion({ data, moduleColor, onComplete }) {
  if (!data) return null
  const { points = [], xLabel, yLabel, answer, answerUnit, steps = [], commonMistake, senNote, taskType } = data
  const [input, setInput] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const xScale = useMemo(() => buildScale(points, 't'), [points])
  const yScale = useMemo(() => buildScale(points, 'v'), [points])
  const svgPoints = useMemo(() => points.map(p => toSvg(p, xScale, yScale)), [points, xScale, yScale])

  const pathD = svgPoints.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ')

  // Shaded area for distance questions
  const areaD = useMemo(() => {
    if (taskType !== 'area') return ''
    const baseline = PAD.top + PLOT_H
    const pts = svgPoints.map(p => `${p.x},${p.y}`).join(' ')
    return `M${svgPoints[0].x},${baseline} ${pts} L${svgPoints[svgPoints.length - 1].x},${baseline} Z`
  }, [svgPoints, taskType])

  const numericAnswer = parseFloat(input)
  const tolerance = Math.abs(answer * 0.05) || 0.5
  const isCorrect = submitted && Math.abs(numericAnswer - answer) <= tolerance

  const handleSubmit = () => {
    if (input.trim() === '' || submitted) return
    setSubmitted(true)
    const correct = Math.abs(numericAnswer - answer) <= tolerance
    onComplete(correct)
  }

  // Grid lines
  const xTicks = []
  const xStep = xScale.max <= 10 ? 1 : xScale.max <= 50 ? 5 : 10
  for (let v = 0; v <= xScale.max; v += xStep) xTicks.push(v)

  const yTicks = []
  const yStep = yScale.max <= 10 ? 1 : yScale.max <= 50 ? 5 : yScale.max <= 100 ? 10 : 50
  for (let v = 0; v <= yScale.max; v += yStep) yTicks.push(v)

  return (
    <div>
      {/* Graph */}
      <motion.div
        className="rounded-[16px] p-3 mb-4 flex justify-center"
        style={{ background: 'rgba(18,26,47,0.95)', border: '1px solid #2d3e55' }}
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <svg viewBox={`0 0 ${GRAPH_W} ${GRAPH_H}`} width="100%" style={{ maxWidth: GRAPH_W }}>
          {/* Grid */}
          {xTicks.map(v => {
            const x = PAD.left + (v / xScale.max) * PLOT_W
            return <line key={`xg${v}`} x1={x} y1={PAD.top} x2={x} y2={PAD.top + PLOT_H} stroke="#1d293d" strokeWidth={0.5} />
          })}
          {yTicks.map(v => {
            const y = PAD.top + PLOT_H - (v / yScale.max) * PLOT_H
            return <line key={`yg${v}`} x1={PAD.left} y1={y} x2={PAD.left + PLOT_W} y2={y} stroke="#1d293d" strokeWidth={0.5} />
          })}

          {/* Axes */}
          <line x1={PAD.left} y1={PAD.top} x2={PAD.left} y2={PAD.top + PLOT_H} stroke="#556" strokeWidth={1} />
          <line x1={PAD.left} y1={PAD.top + PLOT_H} x2={PAD.left + PLOT_W} y2={PAD.top + PLOT_H} stroke="#556" strokeWidth={1} />

          {/* X-axis ticks + labels */}
          {xTicks.map(v => {
            const x = PAD.left + (v / xScale.max) * PLOT_W
            return (
              <g key={`xt${v}`}>
                <line x1={x} y1={PAD.top + PLOT_H} x2={x} y2={PAD.top + PLOT_H + 4} stroke="#556" strokeWidth={1} />
                <text x={x} y={PAD.top + PLOT_H + 15} fill="#8899aa" fontSize={9} textAnchor="middle">{v}</text>
              </g>
            )
          })}

          {/* Y-axis ticks + labels */}
          {yTicks.map(v => {
            const y = PAD.top + PLOT_H - (v / yScale.max) * PLOT_H
            return (
              <g key={`yt${v}`}>
                <line x1={PAD.left - 4} y1={y} x2={PAD.left} y2={y} stroke="#556" strokeWidth={1} />
                <text x={PAD.left - 8} y={y + 3} fill="#8899aa" fontSize={9} textAnchor="end">{v}</text>
              </g>
            )
          })}

          {/* Axis labels */}
          <text x={PAD.left + PLOT_W / 2} y={GRAPH_H - 2} fill="#a8b8cc" fontSize={10} textAnchor="middle">{xLabel}</text>
          <text x={12} y={PAD.top + PLOT_H / 2} fill="#a8b8cc" fontSize={10} textAnchor="middle" transform={`rotate(-90, 12, ${PAD.top + PLOT_H / 2})`}>{yLabel}</text>

          {/* Shaded area */}
          {taskType === 'area' && areaD && (
            <path d={areaD} fill={`${moduleColor}20`} stroke="none" />
          )}

          {/* Data line */}
          <path d={pathD} fill="none" stroke={moduleColor} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />

          {/* Data points */}
          {svgPoints.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r={3.5} fill={moduleColor} stroke="#0b1121" strokeWidth={1.5} />
          ))}
        </svg>
      </motion.div>

      {/* Task type hint */}
      <div className="flex items-center gap-2 mb-3">
        <Calculator size={14} color={moduleColor} />
        <span className="text-xs font-semibold" style={{ color: moduleColor }}>
          {taskType === 'area' && 'Hint: distance = area under the graph'}
          {taskType === 'gradient' && 'Hint: acceleration = gradient of the line'}
          {taskType === 'read-value' && 'Hint: read the value carefully from the axes'}
        </span>
      </div>

      {/* Answer input */}
      <div className="mb-4">
        <div
          className="flex items-center gap-2 rounded-[14px] overflow-hidden"
          style={{
            background: submitted
              ? isCorrect ? 'rgba(0,188,125,0.1)' : 'rgba(239,68,68,0.1)'
              : 'rgba(18,26,47,0.9)',
            border: submitted
              ? isCorrect ? '1.5px solid #00bc7d' : '1.5px solid #ef4444'
              : '1px solid #2d3e55',
          }}
        >
          <input
            type="number"
            inputMode="decimal"
            value={input}
            onChange={e => !submitted && setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            placeholder="Your answer"
            disabled={submitted}
            className="flex-1 bg-transparent px-4 py-4 text-base font-semibold outline-none"
            style={{ color: '#f8fafc', WebkitAppearance: 'none', MozAppearance: 'textfield' }}
          />
          {answerUnit && (
            <span className="pr-4 text-sm font-semibold" style={{ color: '#a8b8cc' }}>{answerUnit}</span>
          )}
        </div>
        {!submitted && (
          <motion.button
            className="w-full mt-3 py-3.5 rounded-[14px] font-semibold text-sm"
            style={{
              background: input.trim() ? `linear-gradient(135deg, ${moduleColor}, ${moduleColor}cc)` : 'rgba(18,26,47,0.5)',
              color: input.trim() ? '#fff' : '#556',
              boxShadow: input.trim() ? `0 6px 20px ${moduleColor}40` : 'none',
            }}
            onClick={handleSubmit}
            whileTap={input.trim() ? { scale: 0.97 } : {}}
          >
            Check Answer
          </motion.button>
        )}
      </div>

      {/* Feedback */}
      <AnimatePresence>
        {submitted && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
            <div
              className="flex items-center gap-2 px-4 py-3 rounded-[12px]"
              style={{
                background: isCorrect ? 'rgba(0,188,125,0.12)' : 'rgba(239,68,68,0.12)',
                border: isCorrect ? '1px solid rgba(0,188,125,0.3)' : '1px solid rgba(239,68,68,0.3)',
              }}
            >
              {isCorrect ? <CheckCircle size={18} color="#00bc7d" /> : <XCircle size={18} color="#ef4444" />}
              <span className="text-sm font-semibold" style={{ color: isCorrect ? '#00bc7d' : '#ef4444' }}>
                {isCorrect ? 'Correct!' : `The answer is ${answer}${answerUnit ? ' ' + answerUnit : ''}`}
              </span>
            </div>

            {/* Worked steps */}
            {!isCorrect && steps && (
              <div className="rounded-[14px] p-4" style={{ background: 'rgba(18,26,47,0.9)', border: '1px solid #2d3e55' }}>
                <div className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: moduleColor }}>
                  Worked Solution
                </div>
                <div className="space-y-1.5">
                  {steps.map((step, i) => (
                    <motion.div key={i} className="text-xs leading-relaxed" style={{ color: '#cad5e2' }}
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.15 }}>
                      <span style={{ color: moduleColor, fontWeight: 700 }}>{i + 1}.</span> {step}
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {!isCorrect && commonMistake && (
              <div className="flex items-start gap-2 px-4 py-3 rounded-[12px]"
                style={{ background: 'rgba(239,68,68,0.06)', border: '0.75px solid rgba(239,68,68,0.2)' }}>
                <XCircle size={14} color="#ef4444" style={{ marginTop: 1, flexShrink: 0 }} />
                <p className="text-xs" style={{ color: '#ef9a9a' }}>{commonMistake}</p>
              </div>
            )}

            {senNote && (
              <div className="flex items-start gap-2 px-4 py-3 rounded-[12px]"
                style={{ background: 'rgba(253,199,0,0.07)', border: '0.75px solid rgba(253,199,0,0.25)' }}>
                <Lightbulb size={14} color="#fdc700" style={{ marginTop: 1, flexShrink: 0 }} />
                <p className="text-xs" style={{ color: '#fdc700' }}>{senNote}</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
