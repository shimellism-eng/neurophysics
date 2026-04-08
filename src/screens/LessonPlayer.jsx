/**
 * LessonPlayer — 4-step guided lesson flow.
 *
 * Step 0: Explore     — interactive lessonVisual simulation
 * Step 1: Big Idea    — ideaVisual (MisconceptionCard)
 * Step 2: Real World  — realityVisual (RealWorldCards)
 * Step 3: Key Concept — concept text + quiz CTA
 */
import { motion, AnimatePresence } from 'motion/react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, ChevronRight, BookOpen, FlaskConical, GraduationCap, Zap, Globe, Lightbulb } from 'lucide-react'
import { TOPICS } from '../data/topics'
import { useProgress } from '../hooks/useProgress'
import { getExamQuestionCount } from '../data/examIndex'

const STEPS = [
  { id: 'explore',   label: 'Explore',     icon: Zap,       hint: 'Interact with the diagram' },
  { id: 'idea',      label: 'Big Idea',    icon: Lightbulb, hint: 'Spot the misconception' },
  { id: 'realworld', label: 'Real World',  icon: Globe,     hint: 'See it in action' },
  { id: 'concept',   label: 'Key Concept', icon: BookOpen,  hint: 'Cement your understanding' },
]

export default function LessonPlayer() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { markStarted } = useProgress()
  const [step, setStep]         = useState(0)
  const [direction, setDirection] = useState(1) // 1=forward, -1=back

  const topic = TOPICS[id]
  if (!topic) return (
    <div className="flex items-center justify-center h-full" style={{ color: '#a8b8cc' }}>
      Topic not found
    </div>
  )

  const examCount   = getExamQuestionCount(id)
  const totalSteps  = STEPS.length
  const currentStep = STEPS[step]
  const StepIcon    = currentStep.icon
  const isLast      = step === totalSteps - 1

  const goNext = () => {
    if (step < totalSteps - 1) {
      setDirection(1)
      setStep(s => s + 1)
    }
  }
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

  // Render the visual for the current step
  const renderStepContent = () => {
    switch (step) {
      case 0: return topic.lessonVisual   ? <topic.lessonVisual />   : null
      case 1: return topic.ideaVisual     ? <topic.ideaVisual />     : null
      case 2: return topic.realityVisual  ? <topic.realityVisual />  : null
      case 3: return (
        <div className="flex flex-col gap-4 px-4 py-4">
          {/* Concept */}
          <div className="rounded-[16px] p-4"
            style={{ background: `${topic.moduleColor}12`, border: `0.75px solid ${topic.moduleColor}40` }}>
            <div className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: topic.moduleColor }}>
              Key Concept
            </div>
            <p className="text-sm leading-relaxed" style={{ color: '#cad5e2' }}>
              {topic.concept}
            </p>
          </div>
          {/* Description */}
          <p className="text-sm leading-relaxed px-1" style={{ color: '#cad5e2' }}>
            {topic.description}
          </p>
          {/* Spec ref */}
          {topic.specRef && (
            <div className="flex items-center gap-2">
              <span className="text-xs px-2.5 py-1 rounded-full font-medium"
                style={{ background: 'rgba(18,26,47,0.9)', border: '0.75px solid #1d293d', color: '#64748b' }}>
                AQA Spec {topic.specRef}
              </span>
            </div>
          )}
        </div>
      )
      default: return null
    }
  }

  return (
    <div className="flex flex-col h-full overflow-hidden" style={{ background: '#0b1121' }}>

      {/* ── Header ── */}
      <div className="px-5 pt-5 pb-3 shrink-0 flex items-center gap-3">
        <button
          onClick={goBack}
          className="w-10 h-10 rounded-[12px] flex items-center justify-center shrink-0"
          style={{ background: 'rgba(18,26,47,0.9)', border: '0.75px solid #1d293d' }}
        >
          <ArrowLeft size={17} color="#a8b8cc" />
        </button>
        <div className="flex-1 min-w-0">
          <div className="text-xs font-semibold" style={{ color: topic.moduleColor }}>{topic.module}</div>
          <h1 className="text-base font-bold leading-tight truncate" style={{ color: '#f8fafc' }}>{topic.title}</h1>
        </div>
        {/* Combined / Physics Only badge */}
        <span className="shrink-0 px-2.5 py-1 rounded-full text-xs font-semibold"
          style={topic.course === 'physics-only'
            ? { background: 'rgba(139,92,246,0.15)', color: '#a78bfa', border: '1px solid rgba(139,92,246,0.35)' }
            : { background: 'rgba(34,197,94,0.12)',  color: '#4ade80', border: '1px solid rgba(34,197,94,0.3)' }
          }>
          {topic.course === 'physics-only' ? 'Physics Only' : 'Combined'}
        </span>
      </div>

      {/* ── Step progress bar ── */}
      <div className="px-5 pb-3 shrink-0">
        <div className="flex items-center gap-1.5 mb-2">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex-1 h-1 rounded-full overflow-hidden"
              style={{ background: '#1d293d' }}>
              <motion.div
                className="h-full rounded-full"
                style={{ background: topic.moduleColor }}
                animate={{ width: i <= step ? '100%' : '0%' }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              />
            </div>
          ))}
        </div>
        {/* Step label */}
        <div className="flex items-center gap-1.5">
          <StepIcon size={11} color={topic.moduleColor} />
          <span className="text-xs font-semibold" style={{ color: topic.moduleColor }}>
            {currentStep.label}
          </span>
          <span className="text-xs" style={{ color: '#475569' }}>
            · {currentStep.hint}
          </span>
          <span className="ml-auto text-xs" style={{ color: '#475569' }}>
            {step + 1} / {totalSteps}
          </span>
        </div>
      </div>

      {/* ── Visual / Content area ── */}
      <div className="flex-1 overflow-y-auto">
        {/* Card wrapper */}
        <div className="px-5 mb-4">
          <motion.div
            className="w-full rounded-[22px] overflow-hidden"
            style={{
              background: 'rgba(18,26,47,0.9)',
              border: `0.75px solid ${topic.moduleColor}40`,
              boxShadow: `0 0 32px ${topic.moduleColor}18`,
              minHeight: step === 3 ? 'auto' : 220,
            }}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={step}
                custom={direction}
                initial={{ opacity: 0, x: direction * 32 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -32 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
              >
                {renderStepContent()}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* ── Required Practical button (all steps) ── */}
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

        {/* ── Last step: Quiz CTAs ── */}
        {isLast && (
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

        <div style={{ height: isLast ? 0 : 80 }} />
      </div>

      {/* ── Next button (steps 0–2) ── */}
      {!isLast && (
        <motion.div
          className="shrink-0 px-5 pb-8 pt-3"
          style={{ borderTop: '0.75px solid #1d293d', background: '#0b1121' }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <motion.button
            className="w-full py-4 rounded-[16px] font-semibold text-base flex items-center justify-center gap-2"
            style={{
              background: `linear-gradient(135deg, ${topic.moduleColor}, ${topic.moduleColor}bb)`,
              boxShadow: `0 8px 24px ${topic.moduleColor}35`,
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
