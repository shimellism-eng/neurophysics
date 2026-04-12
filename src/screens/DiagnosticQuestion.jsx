import { motion, AnimatePresence } from 'motion/react'
import { useNavigate, useParams } from 'react-router-dom'
import { useState, useMemo, useCallback } from 'react'
import { ArrowLeft, HelpCircle, BookOpen, ChevronDown, AlignLeft, Lightbulb, Eye, EyeOff, Volume2 } from 'lucide-react'
import { speak } from '../utils/tts'
import { useSessionTimer } from '../hooks/useSessionTimer'
import BreakNudge from '../components/BreakNudge'
import { TOPICS } from '../data/topics'
import questionBank from '../data/questionBank'
import { getInteractiveQuestions } from '../data/interactiveIndex'
import {
  TapMatchQuestion,
  HotspotQuestion,
  SequenceSortQuestion,
  MisconceptionQuestion,
  ConfidenceQuestion,
} from '../components/questions'

// ── Physics glossary (tap-to-define) ────────────────────────────────────────

const PHYSICS_GLOSSARY = {
  'acceleration': 'How quickly velocity changes. Measured in m/s². a = Δv/t',
  'amplitude': 'The maximum displacement of a wave from its rest position.',
  'atom': 'The smallest unit of an element. Has a nucleus (protons + neutrons) with electrons orbiting around it.',
  'centripetal force': 'The force directed towards the centre of a circular path that keeps an object moving in a circle.',
  'charge': 'A property of matter. Positive (protons) or negative (electrons). Measured in Coulombs (C).',
  'compression': 'A region in a longitudinal wave where particles are pushed together (higher pressure).',
  'conductor': 'A material that allows electric current (or heat) to flow through it easily.',
  'conservation of energy': 'Energy cannot be created or destroyed — only transferred between stores.',
  'conservation of momentum': 'The total momentum of a closed system stays constant before and after a collision.',
  'current': 'The rate of flow of electric charge. Measured in Amperes (A). I = Q/t',
  'density': 'Mass per unit volume. ρ = m/V. Measured in kg/m³.',
  'diffraction': 'The spreading out of waves as they pass through a gap or around an obstacle.',
  'directly proportional': 'As one quantity doubles, the other doubles. Graph is a straight line through the origin.',
  'displacement': 'Distance moved in a specific direction. A vector quantity. Measured in metres (m).',
  'efficiency': 'The proportion of input energy that is usefully transferred. efficiency = useful output ÷ total input.',
  'elastic': 'A material returns to its original shape after a force is removed. Obeys Hooke\'s Law.',
  'electromagnetic induction': 'A voltage (EMF) is induced when a conductor moves through a magnetic field or the field changes.',
  'electron': 'A negatively charged particle found in shells around the nucleus. Mass ≈ 0. Charge = -1.',
  'force': 'A push or pull that can cause acceleration. Measured in Newtons (N). F = ma.',
  'frequency': 'The number of complete waves passing a point per second. Measured in Hz. f = 1/T.',
  'friction': 'A contact force that opposes motion between surfaces.',
  'gravitational field strength': 'The force per unit mass due to gravity. On Earth g ≈ 10 N/kg.',
  'half-life': 'The time taken for the activity (or number of undecayed nuclei) to halve.',
  'inertia': 'The tendency of an object to resist changes in its state of motion.',
  'insulator': 'A material that does not allow electric current (or heat) to flow through it easily.',
  'inversely proportional': 'As one quantity doubles, the other halves. Graph is a curve (hyperbola).',
  'ionisation': 'Removing an electron from an atom, giving it a net positive charge.',
  'isotope': 'Atoms of the same element with different numbers of neutrons.',
  'kinetic energy': 'Energy due to motion. KE = ½mv².',
  'magnetic field': 'A region where a magnetic force is experienced. Shown by field lines from N to S.',
  'mass': 'The amount of matter in an object. Measured in kg. NOT the same as weight.',
  'momentum': 'Mass × velocity. p = mv. A vector quantity. Conserved in closed systems.',
  'neutron': 'A neutral particle found in the nucleus. Mass = 1. Charge = 0.',
  'nuclear fission': 'A heavy nucleus splits into two smaller nuclei, releasing energy and neutrons.',
  'nuclear fusion': 'Two light nuclei join to form a heavier nucleus, releasing energy.',
  'nucleus': 'The small, dense, positively charged centre of an atom. Contains protons and neutrons.',
  'ohm\'s law': 'V = IR — voltage is proportional to current if resistance and temperature are constant.',
  'parallax': 'The apparent shift in position of an object when viewed from different angles.',
  'power': 'The rate of energy transfer. P = E/t = W/t. Measured in Watts (W).',
  'pressure': 'Force per unit area. P = F/A. Measured in Pascals (Pa).',
  'proton': 'A positively charged particle found in the nucleus. Mass = 1. Charge = +1.',
  'radiation': 'Energy transferred as waves or particles. Types: alpha, beta, gamma.',
  'rarefaction': 'A region in a longitudinal wave where particles are spread apart (lower pressure).',
  'refraction': 'The bending of a wave as it crosses the boundary between two materials at an angle.',
  'resistance': 'How much a component opposes the flow of current. R = V/I. Measured in Ohms (Ω).',
  'resultant force': 'The single force that has the same effect as all forces acting on an object combined.',
  'scalar': 'A quantity with magnitude only (no direction). e.g. speed, mass, temperature.',
  'specific heat capacity': 'The energy needed to raise 1 kg of a substance by 1°C. E = mcΔθ.',
  'specific latent heat': 'The energy needed to change the state of 1 kg of a substance without changing temperature.',
  'terminal velocity': 'The constant velocity reached when drag force equals weight (zero resultant force).',
  'transformer': 'A device that uses electromagnetic induction to change the voltage of AC. Vp/Vs = Np/Ns.',
  'vector': 'A quantity with both magnitude and direction. e.g. velocity, force, acceleration.',
  'velocity': 'Speed in a given direction. A vector quantity. Measured in m/s.',
  'voltage': 'The energy transferred per unit charge. Also called potential difference. V = W/Q. Measured in Volts (V).',
  'watt': 'The unit of power. 1 W = 1 J/s.',
  'wavelength': 'The distance between two consecutive points in phase on a wave (e.g. crest to crest). Symbol λ.',
  'weight': 'The gravitational force on an object. W = mg. Measured in Newtons (N). NOT the same as mass.',
  'work done': 'Energy transferred when a force moves through a distance. W = Fd. Measured in Joules (J).',
}

function findDefinition(keyword) {
  const lower = keyword.toLowerCase()
  if (PHYSICS_GLOSSARY[lower]) return PHYSICS_GLOSSARY[lower]
  const partialKey = Object.keys(PHYSICS_GLOSSARY).find(k => lower.includes(k) || k.includes(lower))
  if (partialKey) return PHYSICS_GLOSSARY[partialKey]
  return 'Keep this term in mind — it appears in exam mark schemes for this topic.'
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

// ── Helpers ──────────────────────────────────────────────────────────────────

function parseHighlighted(text, color) {
  const parts = text.split(/\*\*(.*?)\*\*/g)
  return parts.map((part, i) =>
    i % 2 === 1
      ? <span key={i} style={{ color, fontWeight: 700, background: `${color}22`, borderRadius: 4, padding: '1px 4px' }}>{part}</span>
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
  return ['The answer is...', 'This happens because...', 'An example of this is...', 'The key equation is...', 'I think the correct answer is... because...']
}

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// ── SEN Panel ────────────────────────────────────────────────────────────────

function SENPanel({ topic, activeTab, onTab }) {
  const [showModelAnswers, setShowModelAnswers] = useState(false)
  const [activeKeyword, setActiveKeyword] = useState(null)
  const keywords = getKeywords(topic)
  const starters = getSentenceStarters(topic)
  const modelAnswers = topic.modelAnswers || []

  return (
    <div className="rounded-[16px] overflow-hidden mb-4" style={{ background: 'rgba(18,26,47,0.95)', border: '0.75px solid #2d3e55' }}>
      <div className="flex border-b" style={{ borderColor: '#1d293d' }}>
        {[
          { id: 'keywords', label: 'Keyword Bank', icon: BookOpen },
          { id: 'starters', label: 'Sentence Starters', icon: AlignLeft },
        ].map(tab => (
          <button
            key={tab.id}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-semibold"
            style={{ color: activeTab === tab.id ? '#155dfc' : '#a8b8cc', borderBottom: activeTab === tab.id ? '2px solid #155dfc' : '2px solid transparent' }}
            onClick={() => onTab(tab.id)}
          >
            <tab.icon size={13} />
            {tab.label}
          </button>
        ))}
      </div>
      <div className="p-3">
        {activeTab === 'keywords' && (
          <div>
            <div className="flex flex-wrap gap-2">
              {keywords.map((kw, i) => {
                const hasDef = !!findDefinition(kw) && findDefinition(kw) !== 'Keep this term in mind — it appears in exam mark schemes for this topic.'
                const isActive = activeKeyword === kw
                return (
                  <motion.button
                    key={kw}
                    className="px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5"
                    style={{
                      background: isActive ? `${topic.moduleColor}30` : `${topic.moduleColor}18`,
                      color: topic.moduleColor,
                      border: isActive ? `1.5px solid ${topic.moduleColor}` : `1px solid ${topic.moduleColor}40`,
                    }}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.04 }}
                    whileTap={{ scale: 0.94 }}
                    onClick={() => setActiveKeyword(prev => prev === kw ? null : kw)}
                  >
                    {kw}
                    {hasDef && (
                      <span
                        className="inline-block rounded-full"
                        style={{ width: 5, height: 5, background: topic.moduleColor, opacity: isActive ? 1 : 0.55, flexShrink: 0 }}
                      />
                    )}
                  </motion.button>
                )
              })}
            </div>
            {activeKeyword && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 px-3 py-2.5 rounded-[10px]"
                style={{ background: 'rgba(14,20,36,0.9)', border: '0.75px solid #334155' }}
              >
                <p className="text-xs font-bold mb-1" style={{ color: '#f8fafc' }}>{activeKeyword}</p>
                <p className="text-xs leading-relaxed" style={{ color: '#94a3b8' }}>
                  {findDefinition(activeKeyword)}
                </p>
              </motion.div>
            )}
          </div>
        )}
        {activeTab === 'starters' && (
          <div>
            <div className="space-y-2">
              {starters.map((s, i) => (
                <motion.div key={i} className="px-3 py-2 rounded-[10px] text-xs" style={{ background: 'rgba(99,102,241,0.08)', border: '0.75px solid rgba(99,102,241,0.2)', color: '#cad5e2' }} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                  {s}
                </motion.div>
              ))}
            </div>
            {modelAnswers.length > 0 && (
              <div className="mt-3">
                <motion.button className="w-full flex items-center gap-2 px-3 py-2.5 rounded-[10px] text-xs font-semibold" style={{ background: 'rgba(253,199,0,0.07)', border: '0.75px solid rgba(253,199,0,0.28)', color: '#fdc700' }} onClick={() => setShowModelAnswers(v => !v)} whileTap={{ scale: 0.97 }}>
                  <Lightbulb size={12} color="#fdc700" />
                  <span className="flex-1 text-left">Want to see model answers?</span>
                  <motion.div animate={{ rotate: showModelAnswers ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown size={11} color="#fdc700" />
                  </motion.div>
                </motion.button>
                <AnimatePresence>
                  {showModelAnswers && (
                    <motion.div className="mt-2 space-y-2" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.22 }}>
                      {modelAnswers.map((answer, i) => (
                        <motion.div key={i} className="px-3 py-2.5 rounded-[10px] text-xs leading-relaxed" style={{ background: 'rgba(11,17,33,0.7)', border: `0.75px solid ${topic.moduleColor}30`, color: '#a8b8cc' }} initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
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

// ── Interactive question type label ──────────────────────────────────────────

const TYPE_LABELS = {
  'tap-match': '🔗 Match',
  'hotspot': '📍 Tap the right area',
  'sequence': '🔢 Put in order',
  'misconception': '🤔 True or false?',
  'confidence': '💭 How confident are you?',
}

// ── Main component ───────────────────────────────────────────────────────────

export default function DiagnosticQuestion() {
  const { id } = useParams()
  const navigate = useNavigate()
  const topic = TOPICS[id]

  // Merge MCQ questions (shuffled) + interactive questions (fixed order at end)
  const questions = useMemo(() => {
    const mcqs = (questionBank && questionBank[id]) || []
    const interactive = getInteractiveQuestions(id)
    const shuffledMcqs = mcqs.length > 0 ? shuffle(mcqs) : []
    // MCQs first, then interactive in defined order
    return [...shuffledMcqs, ...interactive]
  }, [id])

  const total = questions.length

  const [qIndex, setQIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  const [interactiveCompleted, setInteractiveCompleted] = useState(false)
  const [showSEN, setShowSEN] = useState(false)
  const [senTab, setSenTab] = useState('keywords')
  const [showHint, setShowHint] = useState(false)
  const [showDecoder, setShowDecoder] = useState(false)

  // F10/F12: session timer for ADHD pacing
  const { showNudge, nudgeLevel, dismissBreak } = useSessionTimer(true)

  if (!topic || total === 0) return (
    <div className="flex flex-col items-center justify-center h-full px-6" style={{ background: '#0b1121', color: '#a8b8cc' }}>
      <BookOpen size={48} strokeWidth={1.2} style={{ marginBottom: 16, opacity: 0.4 }} />
      <p className="text-center text-sm">No questions available for this topic yet.</p>
      <button
        className="mt-4 px-6 py-3 rounded-[14px] text-sm font-semibold"
        style={{ background: 'rgba(18,26,47,0.9)', border: '1px solid #2d3e55', color: '#a8b8cc' }}
        onClick={() => navigate(-1)}
      >
        Go Back
      </button>
    </div>
  )

  const q = questions[qIndex] || {}
  const qType = q.type || 'mcq'
  const isInteractive = qType !== 'mcq'
  const isLast = qIndex === total - 1
  const isCorrect = !isInteractive ? selected === q.correctAnswer : false

  const VisualComponent = topic.lessonVisual

  // F6: TTS — read question aloud
  const ttsEnabled = (() => { try { return !!JSON.parse(localStorage.getItem('neurophysics_prefs') || '{}').tts } catch { return false } })()
  const speakQuestion = () => {
    speak(q.question + (q.questionSubtitle ? '. ' + q.questionSubtitle : ''))
  }

  // MCQ handlers
  const handleSelect = (idx) => { if (!submitted) setSelected(idx) }
  const handleSubmit = () => {
    if (selected === null) return
    setSubmitted(true)
    if (selected === q.correctAnswer) {
      setScore(s => s + 1)
    }
  }

  // Interactive question callback
  const handleInteractiveComplete = useCallback((correct) => {
    if (correct) setScore(s => s + 1)
    setInteractiveCompleted(true)
  }, [])

  // Next / finish
  const handleNext = () => {
    const correctThisQ = !isInteractive ? selected === q.correctAnswer : false
    // Score already updated via handleSubmit or handleInteractiveComplete
    if (isLast) {
      const finalScore = score // already includes this Q if correct
      navigate(`/feedback/${id}?result=${finalScore >= Math.ceil(total * 0.6) ? 'correct' : 'wrong'}&score=${finalScore}&total=${total}`, { replace: true })
    } else {
      setQIndex(i => i + 1)
      setSelected(null)
      setSubmitted(false)
      setInteractiveCompleted(false)
      setShowHint(false)
      setShowSEN(false) // always collapse support panel on each new question
    }
  }

  const optionLabels = ['A', 'B', 'C', 'D']

  const getOptionStyle = (idx) => {
    if (!submitted) {
      return selected === idx
        ? { background: `${topic.moduleColor}20`, border: `1.5px solid ${topic.moduleColor}`, color: '#f8fafc' }
        : { background: 'rgba(18,26,47,0.9)', border: '0.75px solid #1d293d', color: '#cad5e2' }
    }
    if (idx === q.correctAnswer) return { background: 'rgba(0,188,125,0.15)', border: '1.5px solid #00bc7d', color: '#f8fafc' }
    if (idx === selected) return { background: 'rgba(239,68,68,0.15)', border: '1.5px solid #ef4444', color: '#f8fafc' }
    return { background: 'rgba(18,26,47,0.5)', border: '0.75px solid #1d293d', color: '#a8b8cc' }
  }

  // Which interactive component to render
  const renderInteractive = () => {
    const props = { data: q, moduleColor: topic.moduleColor, onComplete: handleInteractiveComplete }
    switch (qType) {
      case 'tap-match':    return <TapMatchQuestion {...props} />
      case 'hotspot':      return <HotspotQuestion {...props} />
      case 'sequence':     return <SequenceSortQuestion {...props} />
      case 'misconception': return <MisconceptionQuestion {...props} />
      case 'confidence':   return <ConfidenceQuestion {...props} />
      default:             return null
    }
  }

  // Command word decoder
  const questionLower = (q?.question || '').toLowerCase()
  const detectedWord = Object.keys(COMMAND_WORDS).find(w => questionLower.startsWith(w + ' ') || questionLower.startsWith(w + ','))

  // Should footer show?
  const showFooter = isInteractive ? interactiveCompleted : selected !== null

  return (
    <div className="flex flex-col h-full overflow-hidden" style={{ background: '#0b1121' }}>

      {/* F10/F12: Break nudge */}
      {showNudge && <BreakNudge nudgeLevel={nudgeLevel} onDismiss={dismissBreak} />}

      {/* ── Header ── */}
      <div className="px-5 pt-5 pb-3 shrink-0 flex items-center gap-3 sticky top-0 z-10" style={{ background: 'rgba(8,15,30,0.96)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderBottom: '0.75px solid rgba(255,255,255,0.07)' }}>
        <button
          onClick={() => navigate(-1)}
          className="w-11 h-11 rounded-[12px] flex items-center justify-center"
          style={{ background: 'rgba(18,26,47,0.9)', border: '0.75px solid #1d293d' }}
        >
          <ArrowLeft size={18} color="#a8b8cc" />
        </button>
        <div className="flex-1 min-w-0">
          <div className="text-xs font-medium" style={{ color: topic.moduleColor }}>Knowledge Check</div>
          <h1 className="text-base font-bold leading-tight truncate" style={{ color: '#f8fafc' }}>{topic.title}</h1>
        </div>
        <motion.button
          className="flex items-center gap-1.5 px-3 py-2.5 min-h-[44px] rounded-[12px]"
          style={{
            background: showSEN ? 'rgba(21,93,252,0.15)' : 'rgba(18,26,47,0.9)',
            border: showSEN ? '1px solid #155dfc80' : '0.75px solid #1d293d',
          }}
          onClick={() => setShowSEN(v => !v)}
          whileTap={{ scale: 0.95 }}
        >
          <HelpCircle size={14} color={showSEN ? '#155dfc' : '#a8b8cc'} />
          <span className="text-xs font-semibold" style={{ color: showSEN ? '#155dfc' : '#a8b8cc' }}>Need help? 💡</span>
          <motion.div animate={{ rotate: showSEN ? 180 : 0 }}>
            <ChevronDown size={12} color={showSEN ? '#155dfc' : '#a8b8cc'} />
          </motion.div>
        </motion.button>
      </div>

      {/* ── Progress bar ── */}
      <div className="px-5 pb-3 shrink-0">
        <div className="flex items-center gap-2">
          <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: topic.moduleColor }}
              animate={{ width: `${((qIndex + (showFooter ? 1 : 0)) / total) * 100}%` }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
          </div>
          <span className="text-xs font-semibold shrink-0" style={{ color: '#a8b8cc' }}>
            {qIndex + 1} / {total}
          </span>
        </div>
      </div>

      {/* ── Scrollable body ── */}
      <div className="flex-1 overflow-y-auto px-5">

        {/* Support panel */}
        <AnimatePresence>
          {showSEN && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.25 }} style={{ overflow: 'hidden' }}>
              <SENPanel topic={topic} activeTab={senTab} onTab={setSenTab} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Collapsible hint — replaces full visual on quiz screen */}
        {!isInteractive && (
          <div className="mb-4">
            <button
              className="w-full flex items-center gap-2 px-4 py-2.5 rounded-[12px] text-xs font-semibold"
              style={{
                background: showHint ? `${topic.moduleColor}15` : 'rgba(18,26,47,0.6)',
                border: `0.75px solid ${showHint ? topic.moduleColor + '50' : '#1d293d'}`,
                color: showHint ? topic.moduleColor : '#a8b8cc',
              }}
              onClick={() => setShowHint(v => !v)}
            >
              {showHint ? <EyeOff size={13} /> : <Eye size={13} />}
              <span className="flex-1 text-left">{showHint ? 'Hide visual' : '💡 Show visual hint'}</span>
              <motion.div animate={{ rotate: showHint ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronDown size={12} />
              </motion.div>
            </button>
            <AnimatePresence>
              {showHint && (
                <motion.div
                  className="w-full rounded-[20px] mt-2 overflow-hidden"
                  style={{ background: 'rgba(18,26,47,0.9)', border: `0.75px solid ${topic.moduleColor}30` }}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <VisualComponent />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Sticky question header — ADHD/working-memory support: question stays visible while options scroll */}
        <div style={{
          position: 'sticky',
          top: 0,
          zIndex: 10,
          background: '#0b1121',
          paddingTop: 12,
          paddingBottom: 12,
          borderBottom: '0.75px solid rgba(255,255,255,0.07)',
          marginBottom: 16,
          marginLeft: -20,
          marginRight: -20,
          paddingLeft: 20,
          paddingRight: 20,
        }}>
          {/* Question type badge for interactive */}
          {isInteractive && TYPE_LABELS[qType] && (
            <div className="mb-2">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: `${topic.moduleColor}15`, color: topic.moduleColor, border: `1px solid ${topic.moduleColor}30` }}>
                {TYPE_LABELS[qType]}
              </span>
            </div>
          )}

          <div className="flex items-start gap-2">
            <h2 className="flex-1 text-base font-semibold leading-relaxed" style={{ color: '#f8fafc' }}>
              {q.question}
            </h2>
            {/* Command word decoder button */}
            <button
              className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold"
              style={{ background: 'rgba(99,102,241,0.1)', border: '0.75px solid rgba(99,102,241,0.3)', color: '#818cf8' }}
              onClick={() => setShowDecoder(v => !v)}
              aria-label="What is this question asking me?"
            >
              ?
            </button>
            {/* F6: TTS speak button */}
            {ttsEnabled && (
              <button
                className="w-9 h-9 rounded-[10px] flex items-center justify-center shrink-0 mt-0.5"
                style={{ background: 'rgba(99,102,241,0.10)', border: '0.75px solid rgba(99,102,241,0.25)' }}
                onClick={speakQuestion}
                aria-label="Read question aloud"
              >
                <Volume2 size={14} color="#818cf8" />
              </button>
            )}
          </div>
          {showDecoder && (
            <div className="mt-2 px-3 py-2.5 rounded-[10px]" style={{ background: 'rgba(99,102,241,0.08)', border: '0.75px solid rgba(99,102,241,0.25)' }}>
              <p className="text-xs font-bold mb-1" style={{ color: '#818cf8' }}>
                {detectedWord ? `"${detectedWord.charAt(0).toUpperCase() + detectedWord.slice(1)}" means:` : 'Reading the question:'}
              </p>
              <p className="text-xs leading-relaxed" style={{ color: '#cad5e2' }}>
                {detectedWord ? COMMAND_WORDS[detectedWord].action : 'Identify the command word at the start of the question to know what type of answer is expected.'}
              </p>
              {detectedWord && (
                <p className="text-xs mt-1 italic" style={{ color: '#64748b' }}>e.g. {COMMAND_WORDS[detectedWord].example}</p>
              )}
            </div>
          )}
          {q.questionSubtitle && (
            <p className="text-xs mt-1" style={{ color: '#a8b8cc' }}>{q.questionSubtitle}</p>
          )}
        </div>

        {/* Question content — animated on qIndex change */}
        <AnimatePresence mode="wait">
          <motion.div
            key={qIndex}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
          >
            {/* MCQ options */}
            {!isInteractive && (
              <>
                <div className="space-y-2">
                  {(q.options || []).map((opt, idx) => (
                    <motion.button
                      key={idx}
                      className="w-full text-left rounded-[16px] p-4 flex items-center gap-3"
                      style={getOptionStyle(idx)}
                      onClick={() => handleSelect(idx)}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + idx * 0.06 }}
                      whileTap={submitted ? {} : { scale: 0.98 }}
                    >
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                        style={{
                          background: selected === idx && !submitted ? topic.moduleColor
                            : submitted && idx === q.correctAnswer ? '#00bc7d'
                            : submitted && idx === selected ? '#ef4444'
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

                {/* F8/F15: Growth framing after MCQ submission */}
                <AnimatePresence>
                  {submitted && (
                    <motion.div
                      className="mt-3 px-4 py-3 rounded-[12px] flex items-center gap-2"
                      style={isCorrect
                        ? { background: 'rgba(0,188,125,0.08)', border: '0.75px solid rgba(0,188,125,0.25)' }
                        : { background: 'rgba(99,102,241,0.08)', border: '0.75px solid rgba(99,102,241,0.25)' }}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <span style={{ fontSize: 16 }}>{isCorrect ? '🌟' : '💡'}</span>
                      <p className="text-xs leading-relaxed font-medium" style={{ color: isCorrect ? '#00bc7d' : '#818cf8' }}>
                        {isCorrect
                          ? 'Spot on! That\'s exactly right.'
                          : 'Great attempt — the correct answer is highlighted in green. Check the sentence starters below for how to explain it.'}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* SEN note after MCQ submission */}
                <AnimatePresence>
                  {submitted && q.senNote && (
                    <motion.div
                      className="mt-3 px-4 py-3 rounded-[12px] flex items-start gap-2"
                      style={{ background: 'rgba(253,199,0,0.07)', border: '0.75px solid rgba(253,199,0,0.25)' }}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <Lightbulb size={14} color="#fdc700" style={{ marginTop: 1, flexShrink: 0 }} />
                      <p className="text-xs leading-relaxed" style={{ color: '#fdc700' }}>{q.senNote}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            )}

            {/* Interactive question component */}
            {isInteractive && renderInteractive()}
          </motion.div>
        </AnimatePresence>

        <div style={{ height: 24 }} />
      </div>

      {/* ── Footer ── */}
      <AnimatePresence>
        {showFooter && (
          <motion.div
            className="shrink-0 px-5 pb-8 pt-3"
            style={{ background: '#0b1121', borderTop: '0.75px solid #1d293d' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            {/* MCQ: Check Answer first, then Next */}
            {!isInteractive && !submitted ? (
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
            ) : (
              /* Next / See Results for both MCQ (after submit) and interactive (after complete) */
              (submitted || interactiveCompleted) && (
                <motion.button
                  className="w-full py-4 rounded-[16px] font-semibold text-base flex items-center justify-center gap-2"
                  style={{
                    background: isLast
                      ? 'linear-gradient(135deg, #6366f1, #818cf8)'
                      : `linear-gradient(135deg, ${topic.moduleColor}, ${topic.moduleColor}cc)`,
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
