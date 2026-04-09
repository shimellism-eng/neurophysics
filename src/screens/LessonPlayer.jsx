/**
 * LessonPlayer — adaptive lesson flow.
 *
 * NEW 9-step flow (topics with `hook` + `lessonKeywords` data):
 *   0  Hook               — curiosity activation, prior knowledge surface
 *   1  Key Words          — vocabulary pre-teach (removes lexical barriers)
 *   2  Connect            — prior knowledge probe + topic map
 *   3  Explore            — concrete stage (existing lessonVisual)
 *   4  Understand         — worked example stepper + misconception refuter
 *   5  Practise           — 3-tier guided practice with fading
 *   6  Lock It In         — dual coding summary (self-generation)
 *   7  Real World         — existing realityVisual
 *   8  Done               — session close + quiz CTAs
 *
 * LEGACY 4-step fallback (topics without new fields):
 *   0  Explore / 1  Big Idea / 2  Real World / 3  Key Concept
 */
import { motion, AnimatePresence } from 'motion/react'
import { useState, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  ArrowLeft, ChevronRight, BookOpen, FlaskConical,
  GraduationCap, Zap, Globe, Lightbulb, Volume2,
  Layers, Target, Star, CheckCircle2, Map,
} from 'lucide-react'
import { TOPICS } from '../data/topics'
import { useProgress } from '../hooks/useProgress'
import { getExamQuestionCount } from '../data/examIndex'

// New lesson step components
import HookCard from '../components/lesson/HookCard'
import VocabPreTeach from '../components/lesson/VocabPreTeach'
import PriorKnowledgeProbe from '../components/lesson/PriorKnowledgeProbe'
import WorkedExampleStepper from '../components/lesson/WorkedExampleStepper'
import GuidedPracticeFader from '../components/lesson/GuidedPracticeFader'
import DualCodingSummary from '../components/lesson/DualCodingSummary'
import SessionClose from '../components/lesson/SessionClose'

// ─── NEW 9-step flow ─────────────────────────────────────────────────────────

const NEW_STEPS = [
  { id: 'hook',      label: 'Hook',        icon: Zap,          hint: 'Why this matters' },
  { id: 'vocab',     label: 'Key Words',   icon: BookOpen,     hint: 'Learn the language first' },
  { id: 'connect',   label: 'Connect',     icon: Map,          hint: 'What you already know' },
  { id: 'explore',   label: 'Explore',     icon: FlaskConical, hint: 'See it in action' },
  { id: 'understand',label: 'Understand',  icon: Lightbulb,    hint: 'How it really works' },
  { id: 'practise',  label: 'Practise',    icon: Target,       hint: 'Try it yourself' },
  { id: 'lockin',    label: 'Lock It In',  icon: Star,         hint: 'Make it stick' },
  { id: 'realworld', label: 'Real World',  icon: Globe,        hint: 'See it everywhere' },
  { id: 'done',      label: 'Done',        icon: CheckCircle2, hint: 'Session complete' },
]

// ─── LEGACY 4-step flow ──────────────────────────────────────────────────────

const LEGACY_STEPS = [
  { id: 'explore',   label: 'Explore',     icon: Zap,       hint: 'Interact with the diagram' },
  { id: 'idea',      label: 'Big Idea',    icon: Lightbulb, hint: 'Spot the misconception' },
  { id: 'realworld', label: 'Real World',  icon: Globe,     hint: 'See it in action' },
  { id: 'concept',   label: 'Key Concept', icon: BookOpen,  hint: 'Cement your understanding' },
]

// ─── Keyword chip bar (persistent glossary) ──────────────────────────────────

function KeywordGlossaryBar({ keywords, moduleColor }) {
  const [active, setActive] = useState(null)
  if (!keywords || keywords.length === 0) return null

  return (
    <div className="px-4 pb-2 shrink-0">
      {/* Chips */}
      <div className="flex gap-1.5 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
        {keywords.map((kw, i) => (
          <button
            key={i}
            className="shrink-0 px-2.5 py-1 rounded-full text-[10px] font-bold whitespace-nowrap"
            style={{
              background: active === i ? `${moduleColor}25` : 'rgba(255,255,255,0.06)',
              border: active === i ? `1px solid ${moduleColor}50` : '1px solid rgba(255,255,255,0.1)',
              color: active === i ? moduleColor : 'rgba(255,255,255,0.4)',
              transition: 'all 0.15s',
            }}
            onClick={() => setActive(active === i ? null : i)}
          >
            {kw.word}{kw.symbol ? ` (${kw.symbol})` : ''}
          </button>
        ))}
      </div>

      {/* Definition popover */}
      <AnimatePresence>
        {active !== null && (
          <motion.div
            className="mt-2 px-3 py-2.5 rounded-[12px]"
            style={{
              background: `${moduleColor}12`,
              border: `1px solid ${moduleColor}30`,
            }}
            initial={{ opacity: 0, y: -6, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -6, height: 0 }}
            transition={{ duration: 0.18 }}
          >
            <span className="text-xs font-bold" style={{ color: moduleColor }}>
              {keywords[active].word}
              {keywords[active].symbol ? ` (${keywords[active].symbol})` : ''}
              {keywords[active].unit ? ` — ${keywords[active].unit}` : ''}
            </span>
            <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.6)' }}>
              {keywords[active].definition}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Legacy step 3 content (Key Concept) ─────────────────────────────────────

function LegacyConceptStep({ topic }) {
  const ttsEnabled = (() => {
    try { return !!JSON.parse(localStorage.getItem('neurophysics_prefs') || '{}').tts } catch { return false }
  })()

  return (
    <div className="flex flex-col gap-4 px-4 py-4">
      {/* Concept */}
      <div className="rounded-[16px] p-4"
        style={{ background: `${topic.moduleColor}12`, border: `0.75px solid ${topic.moduleColor}40` }}>
        <div className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: topic.moduleColor }}>
          Key Concept
        </div>
        <p className="text-sm leading-relaxed" style={{ color: '#cad5e2' }}>{topic.concept}</p>
      </div>

      {ttsEnabled && (
        <button
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold w-fit"
          style={{ background: 'rgba(99,102,241,0.1)', border: '0.75px solid rgba(99,102,241,0.3)', color: '#818cf8' }}
          onClick={() => {
            if (!('speechSynthesis' in window)) return
            window.speechSynthesis.cancel()
            const utt = new SpeechSynthesisUtterance(topic.concept + '. ' + topic.description)
            utt.rate = 0.9
            window.speechSynthesis.speak(utt)
          }}
        >
          <Volume2 size={12} />
          Read aloud
        </button>
      )}

      {/* Chunked description */}
      <div className="flex flex-col gap-2 px-1">
        {topic.description.split('. ').filter(s => s.trim().length > 0).map((sentence, i) => (
          <div key={i} className="flex items-start gap-2">
            <span className="shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: topic.moduleColor, marginTop: 6 }} />
            <p className="text-sm leading-relaxed flex-1" style={{ color: '#cad5e2' }}>
              {sentence.endsWith('.') ? sentence : sentence + '.'}
            </p>
          </div>
        ))}
      </div>

      {/* Equations */}
      {topic.equations && topic.equations.length > 0 && (
        <div className="rounded-[14px] p-3" style={{ background: 'rgba(14,20,36,0.8)', border: '0.75px solid #1d293d' }}>
          <div className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#64748b' }}>
            Equations
          </div>
          <div className="flex flex-col gap-1.5">
            {topic.equations.map((eq, i) => (
              <div key={i} className="flex items-center justify-between gap-3">
                <span className="text-sm font-mono font-medium" style={{ color: '#f8fafc' }}>{eq.expr}</span>
                <span className="text-xs px-2 py-0.5 rounded-full font-semibold shrink-0"
                  style={eq.given
                    ? { background: 'rgba(34,197,94,0.12)', color: '#4ade80', border: '1px solid rgba(34,197,94,0.3)' }
                    : { background: 'rgba(249,115,22,0.12)', color: '#fb923c', border: '1px solid rgba(249,115,22,0.3)' }
                  }>
                  {eq.given ? 'Given in exam' : 'Must recall'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {topic.specRef && (
        <span className="text-xs px-2.5 py-1 rounded-full font-medium w-fit"
          style={{ background: 'rgba(18,26,47,0.9)', border: '0.75px solid #1d293d', color: '#64748b' }}>
          Spec {topic.specRef}
        </span>
      )}
    </div>
  )
}

// ─── Main screen ─────────────────────────────────────────────────────────────

export default function LessonPlayer() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { markStarted } = useProgress()
  const [step, setStep]           = useState(0)
  const [direction, setDirection] = useState(1)

  const topic = TOPICS[id]
  if (!topic) return (
    <div className="flex items-center justify-center h-full" style={{ color: '#a8b8cc' }}>
      Topic not found
    </div>
  )

  const isNewFlow  = !!(topic.hook && topic.lessonKeywords)
  const STEPS      = isNewFlow ? NEW_STEPS : LEGACY_STEPS
  const totalSteps = STEPS.length
  const currentStep = STEPS[step]
  const StepIcon   = currentStep.icon
  const isLast     = step === totalSteps - 1
  const examCount  = getExamQuestionCount(id)

  const goNext = useCallback(() => {
    if (step < totalSteps - 1) {
      setDirection(1)
      setStep(s => s + 1)
    }
  }, [step, totalSteps])

  const goBack = () => {
    if (step > 0) {
      setDirection(-1)
      setStep(s => s - 1)
    } else {
      navigate('/topics')
    }
  }

  const handleStartQuiz = () => {
    markStarted(id)
    navigate(`/diagnostic/${id}`)
  }

  // ── New flow: step renderers ──────────────────────────────────────────────
  const renderNewStep = () => {
    switch (currentStep.id) {
      case 'hook':
        return (
          <HookCard
            hook={topic.hook}
            moduleColor={topic.moduleColor}
            onReady={goNext}
          />
        )
      case 'vocab':
        return (
          <VocabPreTeach
            keywords={topic.lessonKeywords}
            moduleColor={topic.moduleColor}
            onComplete={goNext}
          />
        )
      case 'connect':
        return (
          <PriorKnowledgeProbe
            probe={topic.prerequisiteCheck}
            moduleColor={topic.moduleColor}
            topicMapHint={topic.topicMapHint}
            onComplete={goNext}
          />
        )
      case 'explore':
        return topic.lessonVisual ? <topic.lessonVisual /> : (
          <div className="px-5 py-8 text-sm text-center" style={{ color: 'rgba(255,255,255,0.4)' }}>
            Interactive diagram coming soon
          </div>
        )
      case 'understand':
        return topic.workedExample ? (
          <WorkedExampleStepper
            workedExample={topic.workedExample}
            moduleColor={topic.moduleColor}
            onComplete={goNext}
          />
        ) : topic.ideaVisual ? <topic.ideaVisual /> : null
      case 'practise':
        return topic.guidedPractice ? (
          <GuidedPracticeFader
            guidedPractice={topic.guidedPractice}
            moduleColor={topic.moduleColor}
            keywords={topic.lessonKeywords}
            onComplete={goNext}
          />
        ) : null
      case 'lockin':
        return topic.summary ? (
          <DualCodingSummary
            summary={topic.summary}
            moduleColor={topic.moduleColor}
            topicTitle={topic.title}
            onComplete={goNext}
          />
        ) : null
      case 'realworld':
        return topic.realityVisual ? <topic.realityVisual /> : null
      case 'done':
        return (
          <SessionClose
            topic={topic}
            topicId={id}
            examCount={examCount}
            onStartQuiz={handleStartQuiz}
            recap={topic.sessionRecap || [
              topic.concept || topic.description.split('.')[0] + '.',
              `Key equation: ${topic.equations?.[0]?.expr || 'see notes'}`,
              'Use spaced repetition to lock this in.',
            ]}
          />
        )
      default:
        return null
    }
  }

  // ── Legacy flow: step renderers ────────────────────────────────────────────
  const renderLegacyStep = () => {
    switch (step) {
      case 0: return topic.lessonVisual  ? <topic.lessonVisual />  : null
      case 1: return topic.ideaVisual    ? <topic.ideaVisual />    : null
      case 2: return topic.realityVisual ? <topic.realityVisual /> : null
      case 3: return <LegacyConceptStep topic={topic} />
      default: return null
    }
  }

  const renderContent = () => isNewFlow ? renderNewStep() : renderLegacyStep()

  // For new flow: steps with their own CTAs (hook, vocab, connect, understand, practise, lockin) don't show the bottom Next button
  const stepHasOwnCTA = isNewFlow && [
    'hook', 'vocab', 'connect', 'understand', 'practise', 'lockin', 'done',
  ].includes(currentStep.id)

  // Legacy last step CTA area
  const showLegacyLastCTA = !isNewFlow && isLast

  return (
    <div className="flex flex-col h-full overflow-hidden" style={{ background: '#080f1e' }}>

      {/* ── Header ── */}
      <div className="px-5 pt-5 pb-3 shrink-0 flex items-center gap-3">
        <button
          onClick={goBack}
          className="w-10 h-10 rounded-[12px] flex items-center justify-center shrink-0"
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
        >
          <ArrowLeft size={17} color="rgba(255,255,255,0.5)" />
        </button>
        <div className="flex-1 min-w-0">
          <div className="text-xs font-bold" style={{ color: topic.moduleColor }}>{topic.module}</div>
          <h1 className="text-base font-bold leading-tight truncate" style={{ color: '#f8fafc' }}>{topic.title}</h1>
        </div>
        <span className="shrink-0 px-2.5 py-1 rounded-full text-xs font-semibold"
          style={topic.course === 'physics-only'
            ? { background: 'rgba(139,92,246,0.15)', color: '#a78bfa', border: '1px solid rgba(139,92,246,0.35)' }
            : { background: 'rgba(34,197,94,0.12)', color: '#4ade80', border: '1px solid rgba(34,197,94,0.3)' }
          }>
          {topic.course === 'physics-only' ? 'Physics Only' : 'Combined'}
        </span>
      </div>

      {/* ── Step progress bar ── */}
      <div className="px-5 pb-3 shrink-0">
        <div className="flex items-center gap-1 mb-2">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex-1 h-1 rounded-full overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.07)' }}>
              <motion.div
                className="h-full rounded-full"
                style={{ background: topic.moduleColor }}
                animate={{ width: i <= step ? '100%' : '0%' }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              />
            </div>
          ))}
        </div>
        <div className="flex items-center gap-1.5">
          <StepIcon size={11} color={topic.moduleColor} />
          <span className="text-xs font-bold" style={{ color: topic.moduleColor }}>
            {currentStep.label}
          </span>
          <span className="text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>
            · {currentStep.hint}
          </span>
          <span className="ml-auto text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>
            {step + 1}/{totalSteps}
          </span>
        </div>
      </div>

      {/* ── Persistent keyword glossary (new flow only, steps 2+) ── */}
      {isNewFlow && step >= 2 && (
        <KeywordGlossaryBar
          keywords={topic.lessonKeywords}
          moduleColor={topic.moduleColor}
        />
      )}

      {/* ── Main content area ── */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-0 mb-2">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              initial={{ opacity: 0, x: direction * 28 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -28 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Required Practical button */}
        {topic.practicalId && (
          <div className="px-5 mb-4">
            <motion.button
              className="w-full py-3 rounded-[14px] flex items-center justify-center gap-2 font-semibold text-sm"
              style={{ background: 'rgba(253,199,0,0.10)', border: '0.75px solid rgba(253,199,0,0.35)', color: '#fdc700' }}
              onClick={() => navigate(`/practical/${topic.practicalId}`)}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              <FlaskConical size={15} />
              Required Practical
            </motion.button>
          </div>
        )}

        {/* Legacy last step CTAs */}
        {showLegacyLastCTA && (
          <div className="px-5 pb-8 flex flex-col gap-3">
            <motion.button
              className="w-full py-4 rounded-[16px] flex items-center justify-center gap-2 font-semibold text-base"
              style={{
                background: `linear-gradient(135deg, ${topic.moduleColor}, ${topic.moduleColor}cc)`,
                boxShadow: `0 8px 24px ${topic.moduleColor}40`,
                color: '#fff',
              }}
              onClick={handleStartQuiz}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Test Your Knowledge
              <ChevronRight size={20} strokeWidth={2.5} />
            </motion.button>
            {examCount > 0 && (
              <motion.button
                className="w-full py-4 rounded-[16px] flex items-center justify-center gap-2 font-semibold text-base"
                style={{ background: 'rgba(99,102,241,0.12)', border: '0.75px solid rgba(99,102,241,0.4)', color: '#818cf8' }}
                onClick={() => navigate(`/exam/${id}`)}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.38 }}
              >
                <GraduationCap size={16} />
                Exam Practice ({examCount} questions)
              </motion.button>
            )}
          </div>
        )}

        <div style={{ height: (isLast || stepHasOwnCTA) ? 0 : 80 }} />
      </div>

      {/* ── Next button — only for steps without their own CTA ── */}
      {!stepHasOwnCTA && !isLast && (
        <motion.div
          className="shrink-0 px-5 pb-8 pt-3"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: '#080f1e' }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <motion.button
            className="w-full py-4 rounded-[16px] font-bold text-base flex items-center justify-center gap-2"
            style={{
              background: `linear-gradient(135deg, ${topic.moduleColor}, ${topic.moduleColor}bb)`,
              boxShadow: `0 8px 24px ${topic.moduleColor}30`,
              color: '#fff',
            }}
            onClick={goNext}
            whileTap={{ scale: 0.97 }}
          >
            {STEPS[step + 1]?.label}
            <ChevronRight size={18} strokeWidth={2.5} />
          </motion.button>
        </motion.div>
      )}
    </div>
  )
}
