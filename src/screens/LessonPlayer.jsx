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
import { useState, useCallback, useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  ArrowLeft, ChevronRight, BookOpen, FlaskConical,
  GraduationCap, Zap, Globe, Lightbulb, Volume2,
  Layers, Target, Star, CheckCircle2, Map, Clock, Coffee, LayoutList,
} from 'lucide-react'
import { TOPICS, MODULES } from '../data/topics'
import { useProgress } from '../hooks/useProgress'
import { useHearts } from '../hooks/useHearts'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { useComfort } from '../context/ComfortContext'
import HeartsDisplay from '../components/HeartsDisplay'
import { getExamQuestionCount } from '../data/examIndex'
import { speak } from '../utils/tts'
import { useSessionTimer } from '../hooks/useSessionTimer'
import BreakNudge from '../components/BreakNudge'

// New lesson step components
import HookCard from '../components/lesson/HookCard'
import VocabPreTeach from '../components/lesson/VocabPreTeach'
import PriorKnowledgeProbe from '../components/lesson/PriorKnowledgeProbe'
import WorkedExampleStepper from '../components/lesson/WorkedExampleStepper'
import EquationBuilder from '../components/lesson/EquationBuilder'
import GuidedPracticeFader from '../components/lesson/GuidedPracticeFader'
import DualCodingSummary from '../components/lesson/DualCodingSummary'
import SessionClose from '../components/lesson/SessionClose'

// ─── NEW 9-step flow ─────────────────────────────────────────────────────────

import SessionPreview from '../components/lesson/SessionPreview'

const NEW_STEPS = [
  { id: 'hook',      label: 'Spark',       icon: Zap,          hint: 'Why this matters' },
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
  const reducedMotion = useReducedMotion()
  if (!keywords || keywords.length === 0) return null

  return (
    <div className="px-4 pb-2 shrink-0">
      {/* Chips */}
      <div className="flex gap-1.5 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
        {keywords.map((kw, i) => (
          <button
            key={i}
            className="shrink-0 px-3 py-1 text-[10px] font-bold whitespace-nowrap"
            style={{
              borderRadius: 999,
              background: active === i ? `${moduleColor}22` : 'rgba(255,255,255,0.06)',
              border: active === i ? `1px solid ${moduleColor}55` : '1px solid rgba(255,255,255,0.09)',
              color: active === i ? moduleColor : 'rgba(255,255,255,0.38)',
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
            className="mt-2 px-4 py-3 rounded-[14px]"
            style={{
              background: `${moduleColor}14`,
              border: `1px solid ${moduleColor}40`,
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
            }}
            initial={reducedMotion ? {} : { opacity: 0, y: -6, height: 0 }}
            animate={reducedMotion ? {} : { opacity: 1, y: 0, height: 'auto' }}
            exit={reducedMotion ? {} : { opacity: 0, y: -6, height: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.18 }}
          >
            <span className="text-xs font-bold" style={{ color: moduleColor }}>
              {keywords[active].word}
              {keywords[active].symbol ? ` (${keywords[active].symbol})` : ''}
              {keywords[active].unit ? ` - ${keywords[active].unit}` : ''}
            </span>
            <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.6)' }}>
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
          onClick={() => speak(topic.concept + '. ' + topic.description)}
        >
          <Volume2 size={12} />
          Read aloud
        </button>
      )}

      {/* Chunked description */}
      <div className="flex flex-col gap-2 px-1">
        {(topic.description || '').split('. ').filter(s => s.trim().length > 0).map((sentence, i) => (
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
  const { markStarted, progress } = useProgress()
  const { hearts, maxHearts, lost, loseHeart, resetHearts } = useHearts()

  const savedProgress = (() => {
    try {
      const s = JSON.parse(localStorage.getItem(`np_lesson_progress_${id}`) || 'null')
      if (!s || s.step <= 0) return null
      // Don't resume to the final done/completion step — start fresh instead
      // totalSteps isn't known yet here, so we guard in the resume handler
      return s
    } catch { return null }
  })()

  const [step, setStep]           = useState(0)
  const [direction, setDirection] = useState(1)
  const [showIntro, setShowIntro] = useState(true)
  const [showResume, setShowResume] = useState(!!savedProgress)
  const [xpPop, setXpPop]         = useState(false)
  const [xpKey, setXpKey]         = useState(0)
  // Persist PriorKnowledgeProbe completion so going back doesn't reset it
  const [probeCompleted, setProbeCompleted] = useState(false)
  const [showLessonMap, setShowLessonMap] = useState(false)
  // Idempotency guard: markStarted fires at most once per mount
  const hasStartedRef = useRef(false)

  const reducedMotion = useReducedMotion()

  // ADHD pacing: session timer + break nudges
  const { elapsedMinutes, showNudge, nudgeLevel, dismissBreak } = useSessionTimer(true)

  // ADHD pacing: per-step elapsed time (resets when step changes)
  const [stepStartTime, setStepStartTime] = useState(() => Date.now())
  const [stepElapsed, setStepElapsed] = useState(0)

  // Reset step timer whenever the user moves to a new step
  useEffect(() => {
    setStepStartTime(Date.now())
    setStepElapsed(0)
  }, [step])

  // Tick every 10 seconds — low overhead
  useEffect(() => {
    const iv = setInterval(() => {
      setStepElapsed(Math.floor((Date.now() - stepStartTime) / 1000))
    }, 10000)
    return () => clearInterval(iv)
  }, [stepStartTime])

  // Format helper: "2m" under 5 min, "5m 30s" at or over 5 min
  const fmtStepTime = (s) => s < 300 ? `${Math.floor(s / 60)}m` : `${Math.floor(s / 60)}m ${s % 60}s`

  // Break nudge snooze — hides nudge for 5 minutes then lets it reappear
  const snoozeUntilRef = useRef(0)
  const [snoozed, setSnoozed] = useState(false)
  const snoozeBreak = () => {
    snoozeUntilRef.current = Date.now() + 5 * 60 * 1000
    setSnoozed(true)
    // Re-enable after 5 minutes so the nudge can surface again
    setTimeout(() => setSnoozed(false), 5 * 60 * 1000)
  }
  const nudgeVisible = showNudge && !snoozed

  // Explore mode + Pomodoro: live from ComfortContext
  const { prefs: comfortPrefs } = useComfort()
  const exploreMode = comfortPrefs.exploreMode !== false

  // Pomodoro timer — fires once after sessionLength minutes when enabled
  const [pomoDone, setPomoDone] = useState(false)
  const [pomoDismissed, setPomoDismissed] = useState(false)
  useEffect(() => {
    if (!comfortPrefs.pomodoroTimer || showIntro || pomoDone) return
    const ms = (comfortPrefs.sessionLength || 15) * 60 * 1000
    const t = setTimeout(() => setPomoDone(true), ms)
    return () => clearTimeout(t)
  }, [comfortPrefs.pomodoroTimer, comfortPrefs.sessionLength, showIntro, pomoDone])
  const pomoVisible = pomoDone && !pomoDismissed

  // Compute next unmastered topic (for "Next topic" CTA at lesson end)
  const allTopicIds = MODULES.flatMap(m => m.topics)
  const currentTopicIdx = allTopicIds.indexOf(id)
  const nextTopicId = allTopicIds.slice(currentTopicIdx + 1).find(tid => !progress[tid]?.mastered) ?? null

  const topic = TOPICS[id]
  if (!topic) return (
    <div className="flex items-center justify-center h-full" style={{ color: '#a8b8cc' }}>
      Topic not found
    </div>
  )

  const isNewFlow  = !!topic.hook
  const STEPS      = isNewFlow
    ? NEW_STEPS.filter(s => {
        if (s.id === 'vocab'      && (!topic.lessonKeywords || topic.lessonKeywords.length === 0)) return false
        if (s.id === 'explore'    && !topic.lessonVisual)                          return false
        if (s.id === 'realworld'  && !topic.realityVisual)                         return false
        if (s.id === 'understand' && !topic.workedExample && !topic.ideaVisual)    return false
        if (s.id === 'practise'   && !topic.guidedPractice)                        return false
        if (s.id === 'lockin'     && !topic.summary)                               return false
        if (s.id === 'connect'    && !topic.prerequisiteCheck)                     return false
        return true
      })
    : LEGACY_STEPS
  const totalSteps = STEPS.length
  const currentStep = STEPS[step]
  const StepIcon   = currentStep.icon
  const isLast     = step === totalSteps - 1
  const examCount  = getExamQuestionCount(id)

  const STEP_TIME_EST = { hook: 1, vocab: 2, connect: 2, explore: 3, understand: 3, practise: 4, lockin: 2, realworld: 2, done: 1, idea: 2, concept: 2 }
  const remainingMinutes = STEPS.slice(step).reduce((sum, s) => sum + (STEP_TIME_EST[s.id] || 2), 0)

  const goNext = useCallback(() => {
    if (step < totalSteps - 1) {
      setXpKey(k => k + 1)
      setXpPop(true)
      setTimeout(() => setXpPop(false), 1000)
      setDirection(1)
      setStep(s => s + 1)
    }
  }, [step, totalSteps])

  // Exit lesson — save position so user can resume, then go home
  const exitLesson = () => {
    if (step > 0) {
      try {
        localStorage.setItem(`np_lesson_progress_${id}`, JSON.stringify({ step, ts: Date.now() }))
      } catch {}
    }
    navigate('/learn')
  }

  // "I need a break" — saves step position so user can resume from HomeScreen
  const handleBreak = () => {
    try {
      localStorage.setItem(`np_lesson_progress_${id}`, JSON.stringify({ step, ts: Date.now() }))
    } catch {}
    navigate('/')
  }

  const goBack = () => {
    if (step > 0) {
      setDirection(-1)
      setStep(s => s - 1)
    } else {
      navigate('/learn')
    }
  }

  // Save lesson progress whenever step changes
  useEffect(() => {
    if (step === 0) return // don't save step 0 (fresh start)
    if (step >= totalSteps - 1) {
      // Reached the done/completion step — clear saved progress so next visit starts fresh
      try { localStorage.removeItem(`np_lesson_progress_${id}`) } catch {}
      return
    }
    try {
      localStorage.setItem(`np_lesson_progress_${id}`, JSON.stringify({ step, ts: Date.now() }))
    } catch {}
    // Mark topic as started as soon as the user moves past the hook (idempotent — once per mount)
    if (!hasStartedRef.current) {
      hasStartedRef.current = true
      markStarted(id)
    }
  }, [step, id])

  const handleStartQuiz = () => {
    try { localStorage.removeItem(`np_lesson_progress_${id}`) } catch {}
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
            alreadyCompleted={probeCompleted}
            onComplete={() => { setProbeCompleted(true); goNext() }}
            onWrongAnswer={exploreMode ? undefined : loseHeart}
          />
        )
      case 'explore':
        return topic.lessonVisual ? <topic.lessonVisual /> : (
          <div className="px-5 py-8 text-sm text-center" style={{ color: 'rgba(255,255,255,0.4)' }}>
            Interactive diagram coming soon
          </div>
        )
      case 'understand':
        return (
          <div>
            {topic.equationData && (
              <EquationBuilder
                equationData={topic.equationData}
                moduleColor={topic.moduleColor}
                onComplete={!topic.workedExample && !topic.ideaVisual ? goNext : undefined}
              />
            )}
            {topic.workedExample ? (
              <WorkedExampleStepper
                workedExample={topic.workedExample}
                moduleColor={topic.moduleColor}
                onComplete={goNext}
              />
            ) : topic.ideaVisual ? <topic.ideaVisual /> : null}
          </div>
        )
      case 'practise':
        return topic.guidedPractice ? (
          <GuidedPracticeFader
            guidedPractice={topic.guidedPractice}
            moduleColor={topic.moduleColor}
            keywords={topic.lessonKeywords}
            onComplete={goNext}
            onWrongAnswer={exploreMode ? undefined : loseHeart}
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
      case 'done': {
        // Compute module progress for the completion card
        const topicModule = MODULES.find(m => m.topics.includes(id)) || null
        const moduleTopicCount = topicModule ? topicModule.topics.length : 0
        const moduleMasteredCount = topicModule
          ? topicModule.topics.filter(tid => progress[tid]?.mastered).length
          : 0
        const moduleName = topicModule ? topicModule.name : ''
        return (
          <div>
            <SessionClose
              topic={topic}
              topicId={id}
              examCount={examCount}
              onStartQuiz={handleStartQuiz}
              moduleName={moduleName}
              moduleTopicCount={moduleTopicCount}
              moduleMasteredCount={moduleMasteredCount}
              recap={topic.sessionRecap || [
                topic.concept || (topic.description ? topic.description.split('.')[0] + '.' : `${topic.title} — review your notes.`),
                `Key equation: ${topic.equations?.[0]?.expr || 'see notes'}`,
                'Use spaced repetition to lock this in.',
              ]}
            />
            {/* Next topic / back to topics CTAs */}
            <div className="px-5 flex flex-col gap-3 pb-10">
              {nextTopicId && (
                <motion.button
                  className="w-full py-4 rounded-[16px] font-bold text-base flex items-center justify-center gap-2"
                  style={{
                    background: 'linear-gradient(135deg, #6366f1, #818cf8)',
                    color: '#fff',
                    boxShadow: '0 8px 24px rgba(99,102,241,0.4)',
                  }}
                  onClick={() => navigate(`/lesson/${nextTopicId}`)}
                  whileTap={{ scale: 0.97 }}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex flex-col items-center">
                    <span style={{ fontSize: 11, opacity: 0.7, fontWeight: 500 }}>Coming up next</span>
                    <span>{TOPICS[nextTopicId]?.title || 'Next topic'}</span>
                  </div>
                  <ChevronRight size={18} strokeWidth={2.5} />
                </motion.button>
              )}
              <motion.button
                className="w-full py-3 rounded-[14px] text-sm font-semibold"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '0.75px solid rgba(255,255,255,0.08)',
                  color: 'rgba(255,255,255,0.4)',
                }}
                onClick={() => navigate('/learn')}
                whileTap={{ scale: 0.97 }}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Back to topics
              </motion.button>
            </div>
          </div>
        )
      }
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
    <div className="relative flex flex-col h-full overflow-hidden" style={{ background: 'var(--np-bg)' }}>

      {/* ADHD break nudge */}
      {nudgeVisible && <BreakNudge nudgeLevel={nudgeLevel} onDismiss={dismissBreak} onSnooze={snoozeBreak} />}

      {/* Pomodoro break suggestion */}
      <AnimatePresence>
        {pomoVisible && (
          <motion.div
            className="fixed inset-0 z-50 flex items-end justify-center"
            style={{ background: 'rgba(8,15,30,0.7)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setPomoDismissed(true)}
          >
            <motion.div
              className="w-full max-w-lg rounded-t-[28px] px-6 pt-5 pb-10"
              style={{ background: '#0d1629', border: '0.75px solid rgba(255,255,255,0.07)' }}
              initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-center mb-4">
                <div style={{ width: 40, height: 4, borderRadius: 999, background: 'rgba(255,255,255,0.15)' }} />
              </div>
              <div style={{ fontSize: 32, textAlign: 'center', marginBottom: 8 }}>☕</div>
              <h3 style={{ color: '#f8fafc', fontSize: 20, fontWeight: 800, textAlign: 'center', marginBottom: 6 }}>
                Great work — time for a break!
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, textAlign: 'center', lineHeight: 1.55, marginBottom: 24 }}>
                You've been studying for {comfortPrefs.sessionLength} minutes. A short break helps your brain consolidate what you've learned.
              </p>
              <div className="flex gap-3">
                <motion.button
                  className="flex-1 font-bold"
                  style={{ height: 52, borderRadius: 14, background: 'transparent', color: 'rgba(255,255,255,0.6)', border: '1.5px solid rgba(255,255,255,0.12)', cursor: 'pointer', fontSize: 15 }}
                  whileTap={{ y: 2 }}
                  onClick={() => { setPomoDismissed(true); navigate('/') }}
                >
                  Take a break
                </motion.button>
                <motion.button
                  className="flex-1 font-bold"
                  style={{ height: 52, borderRadius: 14, background: 'linear-gradient(135deg, #00d4ff, #0099bb)', color: '#080f1e', border: 'none', cursor: 'pointer', fontSize: 15 }}
                  whileTap={{ y: 2 }}
                  onClick={() => setPomoDismissed(true)}
                >
                  Keep going
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Resume overlay ── */}
      {showResume && savedProgress && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center"
          style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <motion.div
            className="w-full max-w-[480px] rounded-t-[28px] px-5 pt-6 pb-8"
            style={{ background: 'var(--np-bg-mid)', border: '0.75px solid var(--np-border-mid)' }}
            initial={{ y: 80, pointerEvents: 'none' }}
            animate={{ y: 0, pointerEvents: 'auto' }}
            transition={{ type: 'spring', damping: 25 }}>
            <div style={{ width: 36, height: 5, borderRadius: 3, background: 'rgba(255,255,255,0.25)', margin: '0 auto 12px' }} />
            <div className="text-center mb-5">
              <div className="text-2xl mb-2">📍</div>
              <div className="text-lg font-bold" style={{ color: '#f8fafc' }}>Continue where you left off?</div>
              <div className="text-sm mt-1" style={{ color: '#8899b0' }}>
                You were on step {savedProgress.step + 1} of {totalSteps} in this lesson
              </div>
            </div>
            <div className="flex gap-3">
              <motion.button
                className="flex-1 py-3.5 rounded-[14px] text-sm font-semibold"
                style={{ background: 'rgba(255,255,255,0.06)', border: '0.75px solid rgba(255,255,255,0.12)', color: '#a8b8cc' }}
                onClick={() => {
                  try { localStorage.removeItem(`np_lesson_progress_${id}`) } catch {}
                  setShowResume(false)
                  setStep(0)
                }}
                whileTap={{ scale: 0.97 }}>
                Start over
              </motion.button>
              <motion.button
                className="flex-1 py-3.5 rounded-[14px] text-sm font-bold"
                style={{ background: topic.moduleColor, color: '#fff' }}
                onClick={() => {
                  // Clamp saved step; if it's the done step, restart from 0
                  const resumeStep = Math.min(savedProgress.step, totalSteps - 1)
                  if (resumeStep >= totalSteps - 1) {
                    localStorage.removeItem(`np_lesson_progress_${id}`)
                    setStep(0)
                  } else {
                    setStep(resumeStep)
                  }
                  setShowResume(false)
                  setShowIntro(false)
                }}
                whileTap={{ scale: 0.97 }}>
                Resume →
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* ── Lesson Map overlay ── */}
      <AnimatePresence>
        {showLessonMap && (
          <motion.div
            className="fixed inset-0 z-50 flex items-end justify-center"
            style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(4px)' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setShowLessonMap(false)}
          >
            <motion.div
              className="w-full max-w-[480px] rounded-t-[28px] px-5 pt-5 pb-10"
              style={{ background: '#0d1629', border: '0.75px solid rgba(255,255,255,0.07)', maxHeight: '80vh', overflowY: 'auto' }}
              initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-center mb-4">
                <div style={{ width: 40, height: 4, borderRadius: 999, background: 'rgba(255,255,255,0.15)' }} />
              </div>
              <div className="flex items-center gap-2 mb-5">
                <LayoutList size={16} color={topic.moduleColor} />
                <h3 style={{ color: '#f8fafc', fontSize: 17, fontWeight: 800, margin: 0 }}>Lesson Outline</h3>
                <span className="ml-auto text-xs tabular-nums" style={{ color: 'rgba(255,255,255,0.35)' }}>
                  ~{remainingMinutes} min left
                </span>
              </div>
              <div className="flex flex-col gap-1">
                {STEPS.map((s, i) => {
                  const isCompleted = i < step
                  const isCurrent   = i === step
                  const isUpcoming  = i > step
                  const Icon = s.icon
                  const mins = STEP_TIME_EST[s.id] || 2
                  return (
                    <button
                      key={s.id}
                      disabled={isUpcoming}
                      onClick={() => {
                        if (!isUpcoming) {
                          setDirection(i > step ? 1 : -1)
                          setStep(i)
                          setShowLessonMap(false)
                        }
                      }}
                      className="flex items-center gap-3 px-4 py-3 rounded-[14px] text-left w-full"
                      style={{
                        background: isCurrent ? `${topic.moduleColor}18` : isCompleted ? 'rgba(255,255,255,0.04)' : 'transparent',
                        border: isCurrent ? `1px solid ${topic.moduleColor}44` : isCompleted ? '1px solid rgba(255,255,255,0.07)' : '1px solid transparent',
                        cursor: isUpcoming ? 'default' : 'pointer',
                        opacity: isUpcoming ? 0.38 : 1,
                      }}
                    >
                      <div style={{ width: 34, height: 34, borderRadius: 10, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: isCurrent ? `${topic.moduleColor}28` : isCompleted ? 'rgba(34,197,94,0.12)' : 'rgba(255,255,255,0.06)' }}>
                        {isCompleted
                          ? <CheckCircle2 size={16} color="#22c55e" />
                          : <Icon size={16} color={isCurrent ? topic.moduleColor : 'rgba(255,255,255,0.3)'} />
                        }
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-bold" style={{ color: isCurrent ? topic.moduleColor : isCompleted ? '#f8fafc' : 'rgba(255,255,255,0.45)' }}>
                          {s.label}
                        </div>
                        <div className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>{s.hint}</div>
                      </div>
                      <span className="text-xs tabular-nums shrink-0" style={{ color: 'rgba(255,255,255,0.28)' }}>~{mins}m</span>
                    </button>
                  )
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Header ── */}
      <div
        className="px-5 pt-5 pb-3 shrink-0 flex items-center gap-3 sticky top-0 z-10"
        style={{ background: 'var(--np-card-deep)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderBottom: '0.75px solid var(--np-border)', overflow: 'hidden', paddingTop: '12px' }}
      >
        {/* Radial gradient bloom behind header content */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(ellipse 100% 120% at 50% -10%, ${topic.moduleColor}15 0%, transparent 60%)`,
            pointerEvents: 'none',
          }}
        />

        {/* Back button — goes to previous step, or exits when on step 0 */}
        <button
          onClick={step > 0 ? goBack : exitLesson}
          aria-label={step > 0 ? 'Previous step' : 'Exit lesson'}
          className="w-11 h-11 flex items-center justify-center shrink-0"
          style={{
            borderRadius: 12,
            background: 'rgba(255,255,255,0.06)',
            border: '0.75px solid var(--np-border)',
            position: 'relative',
          }}
        >
          <ArrowLeft size={16} color="rgba(255,255,255,0.45)" />
        </button>

        {/* Title block */}
        <div className="flex-1 min-w-0" style={{ position: 'relative' }}>
          <div className="text-xs font-bold" style={{ color: topic.moduleColor }}>{topic.module}</div>
          <h1
            className="font-display font-bold leading-tight truncate"
            style={{ color: 'var(--np-text)', fontSize: 17, letterSpacing: '-0.02em' }}
          >
            {topic.title}
          </h1>
        </div>

        {/* Step counter pill */}
        <span
          className="shrink-0 tabular-nums"
          style={{
            borderRadius: 20,
            background: 'var(--np-card)',
            padding: '4px 10px',
            fontSize: 12,
            color: 'var(--np-text-muted)',
            fontWeight: 600,
            position: 'relative',
          }}
        >
          {step + 1} / {totalSteps}
        </span>

        {/* Lesson map button */}
        <button
          onClick={() => setShowLessonMap(true)}
          aria-label="View lesson outline"
          className="w-9 h-9 flex items-center justify-center shrink-0"
          style={{ borderRadius: 10, background: 'rgba(255,255,255,0.06)', border: '0.75px solid var(--np-border)', position: 'relative' }}
        >
          <LayoutList size={15} color="rgba(255,255,255,0.45)" />
        </button>

        {/* Course badge */}
        <span
          className="shrink-0 px-3 py-1 text-xs font-semibold"
          style={{
            borderRadius: 999,
            ...(topic.course === 'physics-only'
              ? { background: 'rgba(139,92,246,0.12)', color: '#a78bfa', border: '1px solid rgba(139,92,246,0.28)' }
              : { background: 'rgba(34,197,94,0.10)', color: '#4ade80', border: '1px solid rgba(34,197,94,0.25)' }
            ),
            position: 'relative',
          }}
        >
          {topic.course === 'physics-only' ? 'Physics Only' : 'Combined'}
        </span>

        {/* Hearts display — hidden in explore/revision mode */}
        {!exploreMode ? (
          <div style={{ position: 'relative' }}>
            <HeartsDisplay hearts={hearts} maxHearts={maxHearts} />
          </div>
        ) : (
          <span
            style={{
              fontSize: 10, fontWeight: 700, letterSpacing: '0.04em',
              color: '#22c55e', background: 'rgba(34,197,94,0.12)',
              border: '1px solid rgba(34,197,94,0.25)',
              borderRadius: 20, padding: '2px 8px',
            }}
          >
            REVISION
          </span>
        )}
      </div>

      {/* ── Step progress bar ── */}
      <div className="px-5 pb-4 shrink-0">
        {/* Segment track */}
        <div className="flex items-center gap-1 mb-2.5">
          {STEPS.map((s, i) => {
            const isFilled  = i < step
            const isActive  = i === step
            return (
              <div
                key={s.id}
                className="flex-1 overflow-hidden"
                style={{
                  height: 10,
                  borderRadius: 999,
                  background: 'rgba(255,255,255,0.07)',
                }}
              >
                <motion.div
                  style={{
                    height: '100%',
                    borderRadius: 999,
                    background: isActive
                      ? `linear-gradient(90deg, ${topic.moduleColor}dd, ${topic.moduleColor}ff)`
                      : `linear-gradient(90deg, ${topic.moduleColor}cc, ${topic.moduleColor})`,
                  }}
                  animate={{ width: (isFilled || isActive) ? '100%' : '0%' }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                />
              </div>
            )
          })}
        </div>

        {/* Step label row */}
        <div className="flex items-center gap-1.5">
          <StepIcon size={12} color={topic.moduleColor} />
          <span className="text-[13px] font-bold" style={{ color: topic.moduleColor }}>
            {currentStep.label}
          </span>
          <span className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>
            {currentStep.hint}
          </span>
          <span className="ml-auto text-xs font-semibold tabular-nums" style={{ color: 'rgba(255,255,255,0.45)' }}>
            Step {step + 1} of {totalSteps}
          </span>
          {/* Elapsed time — ADHD self-regulation cue */}
          {elapsedMinutes > 0 && (
            <span
              className="flex items-center gap-1 text-[10px] font-semibold tabular-nums px-2 py-0.5 rounded-full"
              style={{
                background: elapsedMinutes >= 20 ? 'rgba(249,115,22,0.12)' : 'rgba(255,255,255,0.06)',
                color: elapsedMinutes >= 20 ? '#f97316' : 'rgba(255,255,255,0.45)',
                border: elapsedMinutes >= 20 ? '1px solid rgba(249,115,22,0.3)' : '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <Clock size={9} />
              {elapsedMinutes}m
            </span>
          )}
          {/* Per-step elapsed time — only show after 60s; amber nudge after 3 min */}
          {stepElapsed >= 60 && (
            <span
              className="text-[10px] font-medium tabular-nums px-1.5 py-0.5 rounded-full"
              style={{
                background: stepElapsed >= 180 ? 'rgba(243,156,18,0.12)' : 'rgba(255,255,255,0.05)',
                color: stepElapsed >= 180 ? '#f39c12' : 'rgba(255,255,255,0.3)',
                border: stepElapsed >= 180 ? '1px solid rgba(243,156,18,0.25)' : '1px solid rgba(255,255,255,0.06)',
              }}
            >
              {fmtStepTime(stepElapsed)}
            </span>
          )}
        </div>

        {/* "I need a break" — only shown mid-lesson (step > 0, not the last step) */}
        {step > 0 && step < totalSteps - 1 && (
          <button
            onClick={handleBreak}
            className="flex items-center gap-1.5 mx-auto mt-2"
            style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', background: 'none', border: 'none', cursor: 'pointer', padding: '4px 8px' }}
          >
            <Coffee size={11} />
            I need a break — save &amp; resume later
          </button>
        )}
      </div>

      {/* ── Persistent keyword glossary (new flow only, steps 2+) ── */}
      {isNewFlow && step >= 2 && (
        <KeywordGlossaryBar
          keywords={topic.lessonKeywords}
          moduleColor={topic.moduleColor}
        />
      )}

      {/* ── Main content area ── */}
      <div className="flex-1 overflow-y-auto" style={{ minHeight: 0 }}>
        <div className="px-0 mb-2">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              initial={reducedMotion ? { opacity: 0 } : { opacity: 0, x: direction * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reducedMotion ? { opacity: 0 } : { opacity: 0, x: direction * -40 }}
              transition={{ duration: reducedMotion ? 0.12 : 0.22, ease: 'easeOut' }}
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
                Exam practice ({examCount} questions)
              </motion.button>
            )}
          </div>
        )}

        <div style={{ height: (isLast || stepHasOwnCTA) ? 0 : 80 }} />
      </div>

      {/* ── Next button - only for steps without their own CTA ── */}
      {!stepHasOwnCTA && !isLast && (() => {
        const nextStep = STEPS[step + 1]
        const NextIcon = nextStep?.icon
        return (
          <motion.div
            className="shrink-0 px-5 pt-3"
            style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: '#080f1e', paddingBottom: 'calc(16px + var(--safe-bottom))' }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {/* Transition warning — "Coming up next" preview */}
            {nextStep && (
              <div className="flex items-center gap-1.5 mb-3 px-1">
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>Coming up:</span>
                {NextIcon && <NextIcon size={11} color={topic.moduleColor} />}
                <span style={{ fontSize: 12, fontWeight: 700, color: topic.moduleColor }}>{nextStep.label}</span>
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>· {nextStep.hint}</span>
              </div>
            )}
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
              Ready
              <ChevronRight size={18} strokeWidth={2.5} />
            </motion.button>
          </motion.div>
        )
      })()}

      {/* ── XP pop animation ── */}
      <AnimatePresence>
        {xpPop && (
          <motion.div
            key={xpKey}
            className="fixed left-1/2 font-display font-bold text-base pointer-events-none"
            style={{
              color: topic.moduleColor,
              textShadow: `0 0 20px ${topic.moduleColor}80`,
              x: '-50%',
              bottom: 100,
              zIndex: 100,
            }}
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 0, y: -48 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
          >
            +10 XP
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── No hearts overlay — only when hearts mode is active ── */}
      <AnimatePresence>
        {lost && !exploreMode && (
          <motion.div
            className="absolute inset-0 z-50 flex flex-col items-center justify-center px-8 text-center"
            style={{ background: 'rgba(8,15,30,0.95)', backdropFilter: 'blur(12px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="text-6xl mb-4"
              animate={{ rotate: [0, -10, 10, -8, 8, 0] }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              💔
            </motion.div>
            <h2 className="font-display text-2xl font-bold mb-2" style={{ color: '#f8fafc' }}>
              Nearly there!
            </h2>
            <p className="text-sm mb-2" style={{ color: 'rgba(255,255,255,0.65)' }}>
              Those tricky questions are exactly where the learning happens.
            </p>
            <p className="text-xs mb-6" style={{ color: 'rgba(255,255,255,0.4)' }}>
              You can turn off hearts in Comfort Settings for zero-stakes practice.
            </p>
            <motion.button
              className="font-display w-full max-w-xs py-4 rounded-[16px] font-bold text-sm"
              style={{
                background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
                boxShadow: '0 6px 0 rgba(0,0,0,0.25), 0 12px 28px rgba(99,102,241,0.35)',
                color: '#fff',
              }}
              onClick={() => { resetHearts() }}
              whileTap={{ y: 4 }}
            >
              Keep going →
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Pre-lesson intro bottom sheet ── */}
      <SessionPreview
        isOpen={showIntro}
        topic={topic}
        stepCount={totalSteps}
        steps={STEPS}
        onStart={() => setShowIntro(false)}
        onDismiss={() => setShowIntro(false)}
      />

    </div>
  )
}
