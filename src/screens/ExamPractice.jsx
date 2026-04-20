/**
 * ExamPractice — exam-style questions screen.
 * Separate from the diagnostic quiz. Pulls from exam data files.
 * Reuses existing interactive component pattern + new components.
 */
import { motion, AnimatePresence } from 'motion/react'
import { useNavigate, useParams } from 'react-router-dom'
import { useState, useMemo, useCallback, useRef, useEffect } from 'react'
import { ArrowLeft, GraduationCap, CaretRight, Medal, SpeakerHigh, CaretDown } from '@phosphor-icons/react'
import { speak } from '../utils/tts'
import { useSessionTimer } from '../hooks/useSessionTimer'
import { useReducedMotion } from '../hooks/useReducedMotion'
import BreakNudge from '../components/BreakNudge'
import { TOPICS } from '../data/topics'
import { getExamQuestions } from '../data/examIndex'
import { saveQuizResult } from '../hooks/useInsights'
import { getSelectedBoard } from '../utils/boardConfig'
import {
  TapMatchQuestion,
  HotspotQuestion,
  SequenceSortQuestion,
  MisconceptionQuestion,
  ConfidenceQuestion,
  CalculationQuestion,
  FillStepsQuestion,
  GraphQuestion,
  ExtendedAnswerQuestion,
  DiagramQuestion,
  NovelContextQuestion,
} from '../components/questions'

// ── Inline bold markdown renderer ────────────────────────────────────────────
function renderWithBold(text) {
  if (!text) return null
  const parts = text.split(/\*\*(.*?)\*\*/g)
  return parts.map((part, i) =>
    i % 2 === 1 ? <strong key={i}>{part}</strong> : part
  )
}

// ── RPA Error Direction Question ─────────────────────────────────────────────
function RPAErrorQuestion({ data, moduleColor, onComplete }) {
  const [selected, setSelected] = useState(null)
  const [submitted, setSubmitted] = useState(false)

  const options = [
    { value: 'high', label: 'Too high', color: '#ef4444' },
    { value: 'low',  label: 'Too low',  color: '#3b82f6' },
    { value: 'no effect', label: 'No effect', color: '#6b7280' },
  ]

  const handleSubmit = () => {
    if (!selected || submitted) return
    setSubmitted(true)
    onComplete(selected === data.direction)
  }

  return (
    <div className="space-y-3">
      {/* RPA badge */}
      <div className="flex items-center gap-2">
        <span className="px-2 py-0.5 rounded-full text-xs font-bold"
          style={{ background: 'rgba(99,102,241,0.15)', color: '#818cf8', border: '0.75px solid rgba(99,102,241,0.3)' }}>
          {data.rpaRef}
        </span>
        <span className="text-xs" style={{ color: '#8899b0' }}>{data.rpaName}</span>
      </div>

      {/* Experiment context */}
      <div className="px-3 py-2.5 rounded-[12px]"
        style={{ background: 'rgba(18,26,47,0.9)', border: '0.75px solid #1d293d' }}>
        <div className="text-xs font-semibold mb-1" style={{ color: '#a8b8cc' }}>The experiment</div>
        <p className="text-sm leading-relaxed" style={{ color: '#cad5e2' }}>{data.experiment}</p>
      </div>

      {/* Direction selector */}
      <div>
        <div className="text-xs font-semibold mb-2" style={{ color: '#a8b8cc' }}>
          The calculated value is:
        </div>
        <div className="flex gap-2">
          {options.map(opt => {
            const isCorrect = submitted && opt.value === data.direction
            const isWrong   = submitted && opt.value === selected && selected !== data.direction
            return (
              <motion.button key={opt.value}
                className="flex-1 py-3 rounded-[12px] text-sm font-bold min-h-[44px]"
                style={{
                  background: isCorrect ? 'rgba(0,188,125,0.15)' : isWrong ? 'rgba(239,68,68,0.15)' : selected === opt.value ? 'rgba(99,102,241,0.15)' : 'rgba(18,26,47,0.9)',
                  border: isCorrect ? '1.5px solid #00bc7d' : isWrong ? '1.5px solid #ef4444' : selected === opt.value ? `1.5px solid ${moduleColor}` : '0.75px solid #1d293d',
                  color: isCorrect ? '#00bc7d' : isWrong ? '#ef4444' : '#f8fafc',
                }}
                onClick={() => { if (!submitted) setSelected(opt.value) }}
                whileTap={submitted ? {} : { scale: 0.96 }}>
                {opt.label}
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Submit */}
      {!submitted && (
        <motion.button
          className="w-full py-3 rounded-[14px] text-sm font-bold"
          style={{ background: selected ? moduleColor : '#1d293d', color: selected ? '#fff' : '#8899b0' }}
          onClick={handleSubmit}
          disabled={!selected}
          whileTap={{ scale: 0.97 }}>
          Check answer
        </motion.button>
      )}

      {/* Mark scheme reveal */}
      {submitted && (
        <motion.div className="space-y-2" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
          {data.markScheme.map((m, i) => (
            <div key={i} className="flex items-start gap-2 px-3 py-2 rounded-[10px]"
              style={{ background: 'rgba(0,188,125,0.06)', border: '0.75px solid rgba(0,188,125,0.15)' }}>
              <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5"
                style={{ background: 'rgba(0,188,125,0.2)', color: '#00bc7d' }}>{i + 1}</span>
              <span className="text-xs leading-relaxed" style={{ color: '#cad5e2' }}>{m}</span>
            </div>
          ))}
          {data.senNote && (
            <div className="px-3 py-2 rounded-[10px]"
              style={{ background: 'rgba(253,199,0,0.07)', border: '0.75px solid rgba(253,199,0,0.2)' }}>
              <span className="text-xs" style={{ color: '#fdc700' }}>{data.senNote}</span>
            </div>
          )}
        </motion.div>
      )}
    </div>
  )
}

// ── Worked Solution Card ─────────────────────────────────────────────────────

function WorkedSolutionCard({ question, correct }) {
  const hasContent = !!(question.explanation || question.markScheme || question.worked || question.steps)
  const [open, setOpen] = useState(!correct) // auto-expand on incorrect
  const reducedMotion = useReducedMotion()

  if (!hasContent) return null

  const steps = question.worked || question.steps || null
  const markScheme = question.markScheme
  const explanation = question.explanation

  return (
    <motion.div
      className="mt-3 rounded-[12px] overflow-hidden"
      style={{ background: 'rgba(255,255,255,0.04)', border: '0.75px solid rgba(255,255,255,0.08)' }}
      initial={reducedMotion ? {} : { opacity: 0, y: 6 }}
      animate={reducedMotion ? {} : { opacity: 1, y: 0 }}
      transition={{ delay: reducedMotion ? 0 : 0.15 }}
    >
      {/* Header */}
      <button
        className="w-full flex items-center justify-between px-4 py-3"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        style={{ color: open ? '#6366f1' : '#a8b8cc' }}
      >
        <span className="text-xs font-bold flex items-center gap-1.5">
          <span>📖</span>
          {markScheme && !explanation ? 'Mark Scheme' : 'Why?'}
        </span>
        <motion.span animate={{ rotate: reducedMotion ? 0 : (open ? 180 : 0) }} transition={{ duration: reducedMotion ? 0 : 0.2 }}>
          <CaretDown size={14} />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={reducedMotion ? {} : { opacity: 0, height: 0 }}
            animate={reducedMotion ? {} : { opacity: 1, height: 'auto' }}
            exit={reducedMotion ? {} : { opacity: 0, height: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.2 }}
            style={{ overflow: 'hidden' }}
          >
            <div className="px-4 pb-4 space-y-3">
              {/* Explanation prose */}
              {explanation && (
                <p className="text-xs leading-relaxed" style={{ color: '#cad5e2' }}>{renderWithBold(explanation)}</p>
              )}

              {/* Worked / steps */}
              {Array.isArray(steps) && steps.length > 0 && (
                <div className="space-y-2">
                  {steps.map((step, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span
                        className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5"
                        style={{ background: 'rgba(99,102,241,0.15)', color: '#6366f1' }}
                      >
                        {i + 1}
                      </span>
                      <span className="text-xs leading-relaxed" style={{ color: '#cad5e2' }}>
                        {typeof step === 'object' ? renderWithBold(step.text || step.label || JSON.stringify(step)) : renderWithBold(step)}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Mark scheme points */}
              {Array.isArray(markScheme) && markScheme.length > 0 && (
                <div className="space-y-1.5">
                  {markScheme.map((point, i) => (
                    <div key={i} className="flex items-start gap-2 px-3 py-2 rounded-[8px]"
                      style={{ background: 'rgba(0,188,125,0.06)', border: '0.75px solid rgba(0,188,125,0.15)' }}>
                      <span className="w-4 h-4 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5"
                        style={{ background: 'rgba(0,188,125,0.2)', color: '#00bc7d' }}>✓</span>
                      <span className="text-xs leading-relaxed" style={{ color: '#cad5e2' }}>{renderWithBold(point)}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Mark scheme as string */}
              {typeof markScheme === 'string' && markScheme && (
                <p className="text-xs leading-relaxed" style={{ color: '#cad5e2' }}>{renderWithBold(markScheme)}</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ── Command word decoder ─────────────────────────────────────────────────────

const COMMAND_WORDS = {
  'state':    { action: 'Give ONE fact. No explanation needed.', example: 'State the unit of force → "Newton"' },
  'name':     { action: 'Give ONE word or phrase. No explanation needed.', example: 'Name the particle → "electron"' },
  'give':     { action: 'Provide a specific value, name, or fact.', example: 'Give the equation → "F = ma"' },
  'identify': { action: 'Pick out or name something from the context given.', example: 'Identify the dependent variable → "current"' },
  'describe': { action: 'Say WHAT happens. Use the context. No "because" needed.', example: 'Describe the motion → "The object accelerates then reaches a constant speed"' },
  'explain':  { action: 'Say WHAT happens AND WHY. Use "because", "so", "therefore".', example: 'Explain why → "The current increases because resistance decreases"' },
  'suggest':  { action: 'Apply your knowledge to an unfamiliar situation. Justify your answer.', example: 'Suggest a reason → "The anomalous result may be because..."' },
  'calculate':{ action: 'Show ALL working. Write the equation first, then substitute, then answer with units.', example: 'Calculate the force → F = ma = 5 × 3 = 15 N' },
  'determine':{ action: 'Use the data given to work out a value. Show working.', example: 'Determine the gradient → rise/run = ...' },
  'estimate': { action: 'Give an approximate answer using the data available. Show reasoning.', example: 'Estimate the speed → roughly 10 m/s because...' },
  'evaluate': { action: 'Give advantages AND disadvantages. Reach a conclusion.', example: 'Evaluate → "Advantage: ... Disadvantage: ... Overall..."' },
  'compare':  { action: 'Say how two things are SIMILAR and how they are DIFFERENT.', example: 'Compare A and B → "Both... However A... whereas B..."' },
  'justify':  { action: 'Give reasons/evidence that support your answer.', example: 'Justify → "This is correct because the data shows..."' },
  'predict':  { action: 'Say what you expect to happen and give a reason.', example: 'Predict → "I predict X will happen because..."' },
  'sketch':   { action: 'Draw a simple, labelled diagram. Accuracy matters more than beauty.', example: 'Sketch the graph → label axes, show the correct shape' },
  'plot':     { action: 'Draw data points precisely on the axes given. Then draw a line of best fit.', example: 'Plot the points → use a cross (×) for each data point' },
  'draw':     { action: 'Produce an accurate diagram with labels.', example: 'Draw a circuit diagram → use correct circuit symbols' },
  'show':     { action: 'Provide working that proves the statement. Include every step.', example: 'Show that v = 30 m/s → write all steps to reach 30' },
}

// ── Board-specific extended response guides ───────────────────────────────────

const EXTENDED_GUIDES = {
  aqa: {
    label: 'AQA 6-mark structure',
    steps: [
      '① State the physics principle relevant to the question',
      '② Apply it directly to the scenario given',
      '③ Use an equation or quantitative comparison',
      '④ Make a second linked point',
      '⑤ Connect to the context / draw a conclusion',
      '⑥ Use precise terminology throughout (no synonyms)',
    ],
    tip: 'AQA mark schemes award each point separately — even 2/6 correct earns marks.',
  },
  edexcel: {
    label: 'Edexcel 6-mark structure',
    steps: [
      '① Point 1: State a relevant fact',
      '② Linked reason 1: Explain WHY (because...)',
      '③ Point 2: State a second relevant fact',
      '④ Linked reason 2: Explain WHY (because...)',
      '⑤ Point 3: State a third relevant fact',
      '⑥ Linked reason 3: Explain WHY / conclusion',
    ],
    tip: 'Edexcel expects "Point + Reason" pairs. Each pair earns 2 marks. Unlinked points earn 0.',
  },
  'ocr-a': {
    label: 'OCR Gateway 6-mark structure',
    steps: [
      '① Identify the physics concept being tested',
      "② Apply physics to the NOVEL context given (don't just define terms)",
      '③ Use evidence from the scenario to support your answer',
      '④ Make a second application point',
      '⑤ Quantify using an equation where possible',
      '⑥ Evaluate / conclude based on the context',
    ],
    tip: "OCR often uses unfamiliar scenarios. Apply physics you know — don't panic.",
  },
  'ocr-b': {
    label: 'OCR 21C 6-mark structure',
    steps: [
      '① State the core physics principle',
      '② Apply it to the real-world context',
      '③ Link to another physics idea (interconnected approach)',
      '④ Use a relevant equation',
      '⑤ Evaluate benefits/limitations',
      '⑥ Conclude with reference to the context',
    ],
    tip: 'OCR-B values interconnected thinking — show how one physics idea links to another.',
  },
  wjec: {
    label: 'WJEC 6-mark structure',
    steps: [
      '① State the relevant law or principle',
      '② Define key terms used',
      '③ Apply the law to the scenario',
      '④ Include a calculation or numerical comparison',
      '⑤ Make a second point with explanation',
      '⑥ Conclusion referencing the question',
    ],
    tip: 'WJEC mark schemes are specific — use exact terminology from the specification.',
  },
  ccea: {
    label: 'CCEA 6-mark structure',
    steps: [
      '① Name the physics principle',
      '② State the relevant equation',
      '③ Apply to the specific scenario',
      '④ Calculate or compare values',
      '⑤ Make a second linked point',
      '⑥ Conclusion / evaluation',
    ],
    tip: 'CCEA rewards multi-step reasoning with calculations. Show all working.',
  },
}

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const TYPE_LABELS = {
  'calculation': '🧮 Calculation',
  'sequence': '🔢 Put in order',
  'fill-steps': '📝 Complete the explanation',
  'graph-read': '📈 Read the graph',
  'tap-match': '🔗 Match',
  'hotspot': '📍 Tap the right area',
  'misconception': '🤔 True or false?',
  'confidence': '💭 How confident are you?',
  'equation-recall': '📐 Recall the equation',
  'extended-answer': '✍️ 6-mark question',
  'diagram-question': '📊 Diagram question',
}

const getProgressLabel = (current, total) => {
  const pct = current / total;
  if (pct === 0) return "Let's go! 🚀";
  if (pct < 0.35) return 'Good start! ⚡';
  if (pct < 0.6) return 'Halfway there 💪';
  if (pct < 0.85) return 'Nearly done! 🔥';
  return 'Last few! 🏁';
}

export default function ExamPractice() {
  const { id } = useParams()
  const navigate = useNavigate()
  const topic = TOPICS[id]

  const questions = useMemo(() => {
    const raw = getExamQuestions(id)
    return shuffle(raw)
  }, [id])

  const total = questions.length

  const [qIndex, setQIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [completed, setCompleted] = useState(false)
  const [showResults, setShowResults] = useState(false)

  // MCQ state (for equation-recall type)
  const [selected, setSelected] = useState(null)
  const [mcqSubmitted, setMcqSubmitted] = useState(false)

  // Feature 1: Timed Mode — per-question stopwatch
  const [elapsed, setElapsed] = useState(0)
  const intervalRef = useRef(null)

  useEffect(() => {
    setElapsed(0)
    clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => setElapsed(s => s + 1), 1000)
    return () => clearInterval(intervalRef.current)
  }, [qIndex])

  // Feature 2: 6-mark writing scaffold
  const [scaffoldOpen, setScaffoldOpen] = useState(false)

  // Command word decoder — open by default; collapsible but always re-openable
  const [cmdWordOpen, setCmdWordOpen] = useState(true)
  // Track which question index last triggered auto-expand for extended-answer
  const extendedAutoExpandedRef = useRef(-1)

  // Last correct state tracking for WorkedSolutionCard
  const [lastCorrect, setLastCorrect] = useState(null)

  // F10/F12: session timer for ADHD pacing
  const { showNudge, nudgeLevel, dismissBreak } = useSessionTimer(true)

  // Derive current question values (safe even before early return guard)
  const q = questions[qIndex] || {}
  const qType = q.type || 'mcq'
  const isLast = qIndex === total - 1

  // All hooks must be declared before any early return (Rules of Hooks)
  const handleInteractiveComplete = useCallback((correct) => {
    if (correct) setScore(s => s + 1)
    setLastCorrect(!!correct)
    setCompleted(true)
  }, [])

  // Per-question reset: re-open decoder whenever question changes and has a command word
  useEffect(() => {
    if (!topic || total === 0) return
    const qLower = (questions[qIndex]?.question || '').toLowerCase()
    const hasCommandWord = Object.keys(COMMAND_WORDS).some(w =>
      qLower.startsWith(w + ' ') || qLower.startsWith(w + ',') ||
      qLower.includes(' ' + w + ' ') || qLower.includes('\n' + w + ' ')
    )
    if (hasCommandWord) setCmdWordOpen(true)
    // Also auto-expand for extended-answer / 6-mark questions regardless
    const isExtended = qType === 'extended-answer' || qType === 'extended' || (questions[qIndex]?.marks ?? 0) >= 6
    if (isExtended && extendedAutoExpandedRef.current !== qIndex) {
      extendedAutoExpandedRef.current = qIndex
      setCmdWordOpen(true)
    }
  }, [qIndex, qType, topic, total, questions])

  if (!topic || total === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full px-6" style={{ background: '#0b1121', color: '#a8b8cc' }}>
        <GraduationCap size={48} style={{ marginBottom: 16, opacity: 0.4 }} />
        <p className="text-center text-sm">No exam practice questions available for this topic yet.</p>
        <button
          className="mt-4 px-6 py-3 rounded-[14px] text-sm font-semibold"
          style={{ background: 'rgba(18,26,47,0.9)', border: '1px solid #2d3e55', color: '#a8b8cc' }}
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    )
  }

  // MCQ handler for equation-recall
  const handleMcqSelect = (idx) => { if (!mcqSubmitted) setSelected(idx) }
  const handleMcqSubmit = () => {
    if (selected === null || mcqSubmitted) return
    setMcqSubmitted(true)
    const isCorrect = selected === q.correctAnswer
    if (isCorrect) setScore(s => s + 1)
    setLastCorrect(isCorrect)
    setCompleted(true)
  }

  const handleNext = () => {
    if (isLast) {
      // Save result and show results screen
      saveQuizResult(id, score, total)
      try { window.dispatchEvent(new Event('storage')) } catch (e) {}
      setShowResults(true)
    } else {
      setQIndex(i => i + 1)
      setCompleted(false)
      setSelected(null)
      setMcqSubmitted(false)
      setCmdWordOpen(false)
      setLastCorrect(null)
    }
  }

  const optionLabels = ['A', 'B', 'C', 'D']

  // Command word decoder
  const questionLower = (q?.question || '').toLowerCase()
  const detectedWord = Object.keys(COMMAND_WORDS).find(w =>
    questionLower.startsWith(w + ' ') ||
    questionLower.startsWith(w + ',') ||
    questionLower.includes(' ' + w + ' ') ||
    questionLower.includes('\n' + w + ' ')
  )

  const renderQuestion = () => {
    const props = { data: q, moduleColor: topic.moduleColor, onComplete: handleInteractiveComplete }

    switch (qType) {
      case 'calculation':    return <CalculationQuestion {...props} />
      case 'fill-steps':     return <FillStepsQuestion {...props} />
      case 'graph-read':     return <GraphQuestion {...props} />
      case 'tap-match':      return <TapMatchQuestion {...props} />
      case 'hotspot':        return <HotspotQuestion {...props} />
      case 'sequence':       return <SequenceSortQuestion {...props} />
      case 'misconception':  return <MisconceptionQuestion {...props} />
      case 'confidence':     return <ConfidenceQuestion {...props} />
      case 'extended-answer': return <ExtendedAnswerQuestion {...props} />
      case 'diagram-question': return <DiagramQuestion {...props} />
      // Grade 9 types
      case 'calculation-chained': return <CalculationQuestion {...props} />
      case 'novel-context': return <NovelContextQuestion {...props} />
      case 'rpa-error': return <RPAErrorQuestion {...props} />
      case 'equation-recall':
        // Render as MCQ
        return (
          <div className="space-y-2">
            {(q.options || []).map((opt, idx) => {
              const getStyle = () => {
                if (!mcqSubmitted) {
                  return selected === idx
                    ? { background: `${topic.moduleColor}20`, border: `1.5px solid ${topic.moduleColor}`, color: '#f8fafc' }
                    : { background: 'rgba(18,26,47,0.9)', border: '0.75px solid #1d293d', color: '#cad5e2' }
                }
                if (idx === q.correctAnswer) return { background: 'rgba(0,188,125,0.15)', border: '1.5px solid #00bc7d', color: '#f8fafc' }
                if (idx === selected) return { background: 'rgba(239,68,68,0.15)', border: '1.5px solid #ef4444', color: '#f8fafc' }
                return { background: 'rgba(18,26,47,0.5)', border: '0.75px solid #1d293d', color: '#a8b8cc' }
              }
              return (
                <motion.button
                  key={idx}
                  className="w-full text-left rounded-[16px] p-4 flex items-center gap-3 min-h-[44px]"
                  style={getStyle()}
                  onClick={() => handleMcqSelect(idx)}
                  whileTap={mcqSubmitted ? {} : { scale: 0.98 }}
                >
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                    style={{
                      background: selected === idx && !mcqSubmitted ? topic.moduleColor
                        : mcqSubmitted && idx === q.correctAnswer ? '#00bc7d'
                        : mcqSubmitted && idx === selected ? '#ef4444'
                        : '#1d293d',
                      color: '#fff',
                    }}>
                    {optionLabels[idx]}
                  </div>
                  <span className="text-sm font-medium flex-1">{opt}</span>
                </motion.button>
              )
            })}
            {mcqSubmitted && q.senNote && (
              <motion.div className="mt-3 px-4 py-3 rounded-[12px] flex items-start gap-2"
                style={{ background: 'rgba(253,199,0,0.07)', border: '0.75px solid rgba(253,199,0,0.25)' }}
                initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
                <span className="text-xs leading-relaxed" style={{ color: '#fdc700' }}>{q.senNote}</span>
              </motion.div>
            )}
            {/* Memory tip card */}
            <motion.div
              className="mt-4 px-4 py-3 rounded-[14px] flex items-start gap-3"
              style={{ background: 'rgba(99,102,241,0.07)', border: '0.75px solid rgba(99,102,241,0.22)' }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span style={{ fontSize: 16 }}>📐</span>
              <div>
                <div className="text-xs font-semibold mb-0.5" style={{ color: '#818cf8' }}>
                  {q.onSheet ? 'On the equation sheet' : 'Must be memorised'}
                </div>
                <div className="text-xs leading-relaxed" style={{ color: '#a8b8cc' }}>
                  {q.onSheet
                    ? 'This equation is given to you in the exam. Focus on knowing when and how to use it.'
                    : 'This equation is NOT provided in the exam. Write it out a few times to commit it to memory.'}
                </div>
              </div>
            </motion.div>
          </div>
        )
      default: return null
    }
  }

  // Results screen
  if (showResults) {
    const pct = Math.round((score / total) * 100)
    const passed = pct >= 60
    return (
      <div className="flex flex-col h-full overflow-hidden" style={{ background: '#0b1121' }}>
        <div className="px-5 pt-5 pb-3 shrink-0">
          <button
            onClick={() => navigate(`/lesson/${id}`)}
            className="w-11 h-11 rounded-[12px] flex items-center justify-center"
            style={{ background: 'rgba(18,26,47,0.9)', border: '0.75px solid #1d293d' }}
          >
            <ArrowLeft size={18} color="#a8b8cc" />
          </button>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center px-6">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.2 }}>
            <Medal size={64} color={passed ? '#00bc7d' : topic.moduleColor} />
          </motion.div>
          <motion.h1 className="text-2xl font-bold mt-4" style={{ color: '#f8fafc' }}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            Exam practice complete
          </motion.h1>
          <motion.div className="mt-3 px-6 py-3 rounded-[16px]"
            aria-live="polite" aria-atomic="true"
            style={{ background: passed ? 'rgba(0,188,125,0.12)' : 'rgba(239,68,68,0.12)', border: passed ? '1px solid rgba(0,188,125,0.3)' : '1px solid rgba(239,68,68,0.3)' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            <span className="text-lg font-bold" style={{ color: passed ? '#00bc7d' : '#ef4444' }}>
              {score} / {total} ({pct}%)
            </span>
          </motion.div>
          <motion.p className="text-sm mt-4 text-center" style={{ color: '#a8b8cc' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            {pct >= 80 ? 'Excellent exam technique!' : pct >= 60 ? 'Good effort — keep practising the tricky ones.' : 'Keep going — review the worked solutions to improve.'}
          </motion.p>
          <motion.div className="flex gap-3 mt-6" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
            <button
              className="px-5 py-3 rounded-[14px] text-sm font-semibold"
              style={{ background: 'rgba(18,26,47,0.9)', border: '1px solid #2d3e55', color: '#a8b8cc' }}
              onClick={() => navigate(`/lesson/${id}`)}
            >
              Back to Lesson
            </button>
            <button
              className="px-5 py-3 rounded-[14px] text-sm font-semibold"
              style={{ background: `${topic.moduleColor}`, color: '#fff', boxShadow: `0 6px 20px ${topic.moduleColor}40` }}
              onClick={() => navigate('/learn')}
            >
              All Topics
            </button>
          </motion.div>
        </div>
      </div>
    )
  }

  // Whether to show the check/next button
  const showFooter = qType === 'equation-recall'
    ? (selected !== null)
    : completed

  return (
    <div className="flex flex-col h-full overflow-hidden" style={{ background: '#0b1121' }}>
      {/* F10/F12: Break nudge */}
      {showNudge && <BreakNudge nudgeLevel={nudgeLevel} onDismiss={dismissBreak} />}

      {/* Header */}
      <div className="px-5 pt-5 pb-3 shrink-0 flex items-center gap-3 sticky top-0 z-10" style={{ background: 'rgba(8,15,30,0.96)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderBottom: '0.75px solid rgba(255,255,255,0.07)', paddingTop: '12px' }}>
        <button
          onClick={() => navigate('/learn')}
          className="w-11 h-11 rounded-[12px] flex items-center justify-center"
          style={{ background: 'rgba(255,255,255,0.07)', border: '0.75px solid rgba(255,255,255,0.1)' }}
        >
          <ArrowLeft size={18} color="#a8b8cc" />
        </button>
        <div className="flex-1 min-w-0">
          <div className="text-xs font-medium" style={{ color: topic.moduleColor }}>Exam practice</div>
          <h1 className="text-base font-bold leading-tight truncate" style={{ color: '#f8fafc' }}>{topic.title}</h1>
        </div>
        <div className="px-3 py-1 rounded-full text-xs font-semibold"
          style={{ background: 'rgba(99,102,241,0.12)', color: '#818cf8', border: '1px solid rgba(99,102,241,0.3)' }}>
          <GraduationCap size={12} className="inline mr-1" style={{ verticalAlign: -1 }} />
          Exam
        </div>
      </div>

      {/* Progress */}
      <div className="px-5 pb-3 shrink-0">
        <div className="flex items-center gap-2">
          <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: '#818cf8' }}
              animate={{ width: `${((qIndex + (completed ? 1 : 0)) / total) * 100}%` }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
          </div>
          <div className="flex flex-col items-end shrink-0">
            <span className="text-xs font-semibold" style={{ color: '#a8b8cc' }}>
              {qIndex + 1} / {total}
            </span>
            <span style={{ fontSize: 11, color: '#8899b0', fontStyle: 'italic' }}>
              {getProgressLabel(qIndex, total)}
            </span>
          </div>
          {/* Topic breadcrumb pill — persistent context for ADHD/working-memory support */}
          <span style={{
            fontSize: 11,
            color: '#8899b0',
            background: 'rgba(255,255,255,0.05)',
            border: '0.75px solid rgba(255,255,255,0.08)',
            borderRadius: 20,
            padding: '3px 10px',
            fontWeight: 500,
            flexShrink: 0,
            maxWidth: 120,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}>
            {topic.title}
          </span>
          {/* Feature 1: per-question timer badge */}
          {(() => {
            const markCount = q.marks ?? (q.parts?.reduce((s, p) => s + p.marks, 0)) ?? 3
            const overtime = elapsed > markCount * 60
            return (
              <span
                className="text-xs font-mono font-semibold shrink-0 px-2 py-0.5 rounded-full"
                style={{
                  background: overtime ? 'rgba(249,115,22,0.12)' : 'rgba(100,116,139,0.12)',
                  color: overtime ? '#f97316' : '#8899b0',
                  border: `1px solid ${overtime ? 'rgba(249,115,22,0.3)' : 'rgba(100,116,139,0.25)'}`,
                  transition: 'color 0.3s, background 0.3s, border-color 0.3s',
                }}
              >
                {Math.floor(elapsed / 60)}:{String(elapsed % 60).padStart(2, '0')}
              </span>
            )
          })()}
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto px-5" style={{ minHeight: 0 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={qIndex}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
          >
            {/* Type badge */}
            {TYPE_LABELS[qType] && (
              <div className="mb-2">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full"
                  style={{ background: 'rgba(99,102,241,0.1)', color: '#818cf8', border: '1px solid rgba(99,102,241,0.25)' }}>
                  {TYPE_LABELS[qType]}
                </span>
              </div>
            )}

            {/* Question — F7: text-base + leading-relaxed for readability */}
            <div className="mb-4">
              <div className="flex items-start gap-2">
                <h2 className="flex-1 text-base font-semibold leading-relaxed" style={{ color: '#f8fafc' }}>
                  {/* Inline command word highlight */}
                  {detectedWord ? (() => {
                    const raw = q.question || ''
                    // Case-insensitive replace of first occurrence of the command word
                    const regex = new RegExp(`(${detectedWord})`, 'i')
                    const parts = raw.split(regex)
                    return parts.map((part, i) =>
                      regex.test(part)
                        ? (
                          <span
                            key={i}
                            style={{ color: '#6366f1', fontWeight: 700, textDecoration: 'underline dotted', cursor: 'pointer' }}
                            onClick={() => setCmdWordOpen(v => !v)}
                            title="Tap for exam technique help"
                          >
                            {part}
                          </span>
                        )
                        : <span key={i}>{part}</span>
                    )
                  })() : q.question}
                </h2>
                {/* Command word decoder button */}
                <button
                  className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold"
                  style={{ background: 'rgba(99,102,241,0.1)', border: '0.75px solid rgba(99,102,241,0.3)', color: '#818cf8' }}
                  onClick={() => setCmdWordOpen(v => !v)}
                  aria-label="What is this question asking me?"
                >
                  ?
                </button>
                {/* F6: TTS speak button */}
                {(() => { try { return !!JSON.parse(localStorage.getItem('neurophysics_prefs') || '{}').tts } catch { return false } })() && (
                  <button
                    className="w-9 h-9 rounded-[10px] flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: 'rgba(99,102,241,0.10)', border: '0.75px solid rgba(99,102,241,0.25)' }}
                    onClick={() => speak(q.question + (q.questionSubtitle ? '. ' + q.questionSubtitle : ''))}
                    aria-label="Read question aloud"
                  >
                    <SpeakerHigh size={14} color="#818cf8" />
                  </button>
                )}
              </div>

              {/* Re-open pill — shown when decoder is collapsed and a command word exists */}
              {detectedWord && !cmdWordOpen && (
                <button
                  className="mt-1.5 text-xs px-2.5 py-1 rounded-full self-start"
                  style={{ background: 'rgba(99,102,241,0.10)', border: '0.75px solid rgba(99,102,241,0.25)', color: '#818cf8' }}
                  onClick={() => setCmdWordOpen(true)}
                >
                  💡 Exam tip
                </button>
              )}

              {cmdWordOpen && (
                <div className="mt-2 px-3 py-2.5 rounded-[10px]" style={{ background: 'rgba(99,102,241,0.08)', border: '0.75px solid rgba(99,102,241,0.25)' }}>
                  <p className="text-xs font-bold mb-1" style={{ color: '#818cf8' }}>
                    {detectedWord ? `"${detectedWord.charAt(0).toUpperCase() + detectedWord.slice(1)}" means:` : 'Reading the question:'}
                  </p>
                  <p className="text-xs leading-relaxed" style={{ color: '#cad5e2' }}>
                    {detectedWord ? COMMAND_WORDS[detectedWord].action : 'Identify the command word at the start of the question to know what type of answer is expected.'}
                  </p>
                  {detectedWord && (
                    <p className="text-xs mt-1 italic" style={{ color: '#8899b0' }}>e.g. {COMMAND_WORDS[detectedWord].example}</p>
                  )}
                </div>
              )}
              {q.questionSubtitle && (
                <p className="text-xs mt-1 leading-relaxed" style={{ color: '#a8b8cc' }}>{q.questionSubtitle}</p>
              )}
            </div>

            {/* Feature 2: 6-mark writing scaffold — shown for extended / ≥5-mark questions */}
            {(qType === 'extended' || qType === 'extended-answer' || (q.marks ?? 0) >= 5) && (
              <div className="mb-4">
                <button
                  className="w-full flex items-center justify-between px-3 py-2 rounded-[12px] text-xs font-semibold"
                  style={{
                    background: 'rgba(99,102,241,0.08)',
                    border: '1px solid rgba(99,102,241,0.25)',
                    color: '#818cf8',
                  }}
                  onClick={() => setScaffoldOpen(o => !o)}
                >
                  <span>📝 Writing Guide</span>
                  <span style={{ transform: scaffoldOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s', display: 'inline-block' }}>
                    ▾
                  </span>
                </button>
                <AnimatePresence>
                  {scaffoldOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div
                        className="mt-1 px-4 py-3 rounded-[12px] text-xs leading-relaxed space-y-3"
                        style={{
                          background: 'rgba(99,102,241,0.08)',
                          border: '1px solid rgba(99,102,241,0.25)',
                          color: '#94a3b8',
                        }}
                      >
                        <div>
                          <div className="font-bold mb-1.5" style={{ color: '#818cf8' }}>STRUCTURE YOUR ANSWER:</div>
                          <div>① <span className="font-semibold" style={{ color: '#c7d2fe' }}>Describe</span> — What is happening? (name the physics)</div>
                          <div>② <span className="font-semibold" style={{ color: '#c7d2fe' }}>Explain</span> — Why does it happen? (link cause to effect)</div>
                          <div>③ <span className="font-semibold" style={{ color: '#c7d2fe' }}>Apply</span> — How does this link to the question context?</div>
                          <div>④ <span className="font-semibold" style={{ color: '#c7d2fe' }}>Evaluate</span> — Weigh up evidence or compare factors</div>
                          <div>⑤ <span className="font-semibold" style={{ color: '#c7d2fe' }}>Conclude</span> — Give a clear final statement</div>
                        </div>
                        <div>
                          <div className="font-bold mb-1.5" style={{ color: '#818cf8' }}>COMMAND WORDS:</div>
                          <div>• <span style={{ color: '#c7d2fe' }}>"State"</span> → one fact, no explanation needed</div>
                          <div>• <span style={{ color: '#c7d2fe' }}>"Explain"</span> → must include 'because' or 'therefore'</div>
                          <div>• <span style={{ color: '#c7d2fe' }}>"Evaluate"</span> → pros/cons + conclusion</div>
                          <div>• <span style={{ color: '#c7d2fe' }}>"Calculate"</span> → show working with units</div>
                        </div>

                        {/* Board-specific extended response guide */}
                        {(() => {
                          const board = getSelectedBoard()
                          const guide = EXTENDED_GUIDES[board.id] || EXTENDED_GUIDES.aqa
                          return (
                            <div className="mt-3 rounded-[12px] overflow-hidden" style={{ border: '0.75px solid rgba(99,102,241,0.3)', background: 'rgba(99,102,241,0.06)' }}>
                              <div className="px-4 py-2.5 flex items-center gap-2" style={{ borderBottom: '0.75px solid rgba(99,102,241,0.2)' }}>
                                <span style={{ fontSize: 13, fontWeight: 700, color: '#818cf8' }}>📝 {guide.label}</span>
                              </div>
                              <div className="px-4 py-3 space-y-1.5">
                                {guide.steps.map((step, i) => (
                                  <p key={i} style={{ fontSize: 12, color: '#cbd5e1', lineHeight: 1.5 }}>{step}</p>
                                ))}
                                <p className="mt-2 pt-2" style={{ fontSize: 11, color: '#818cf8', fontStyle: 'italic', borderTop: '0.75px solid rgba(99,102,241,0.2)' }}>
                                  💡 {guide.tip}
                                </p>
                              </div>
                            </div>
                          )
                        })()}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Question content */}
            {renderQuestion()}

            {/* FIX 1: Worked solution card — shown after answer submitted */}
            {completed && qType !== 'extended-answer' && qType !== 'novel-context' && (
              <WorkedSolutionCard question={q} correct={lastCorrect ?? true} />
            )}
          </motion.div>
        </AnimatePresence>
        <div style={{ height: 24 }} />
      </div>

      {/* Footer */}
      <AnimatePresence>
        {showFooter && (
          <motion.div
            className="shrink-0 px-5 pt-3"
            style={{ background: '#0b1121', borderTop: '0.75px solid #1d293d', paddingBottom: 'calc(16px + var(--safe-bottom))' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            {/* Equation-recall: check first, then next */}
            {qType === 'equation-recall' && !mcqSubmitted ? (
              <motion.button
                className="w-full py-4 rounded-[16px] font-semibold text-base"
                style={{
                  background: '#6366f1',
                  boxShadow: '0px 8px 24px rgba(99,102,241,0.4)',
                  color: '#fff',
                }}
                onClick={handleMcqSubmit}
                whileTap={{ scale: 0.97 }}
              >Check answer</motion.button>
            ) : (
              completed && (
                <motion.button
                  className="w-full py-4 rounded-[16px] font-semibold text-base flex items-center justify-center gap-2"
                  style={{
                    background: isLast
                      ? '#6366f1'
                      : `${topic.moduleColor}`,
                    boxShadow: isLast
                      ? '0px 8px 24px rgba(99,102,241,0.4)'
                      : `0px 8px 24px ${topic.moduleColor}40`,
                    color: '#fff',
                  }}
                  onClick={handleNext}
                  whileTap={{ scale: 0.97 }}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  {isLast ? 'See Results' : 'Next →'}
                </motion.button>
              )
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
