/**
 * SessionClose — Step 9
 * Plants the next retrieval event, closes the cognitive loop, ends with
 * a sense of genuine completion.
 *
 * Research:
 * - Spacing effect (Cepeda et al.): memory consolidation requires time-spaced
 *   retrieval - a single lesson without future retrieval = ~70% forgetting in 24 hrs
 * - ADHD: procedural memory consolidation is time-dependent; scheduled review
 *   = external executive function scaffold replacing internal one
 * - Bullet-point recap (not sentences) supports ADHD end-of-session fatigue
 * - Autistic learners benefit from closing the cognitive loop explicitly
 */
import { motion, AnimatePresence } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle2, ChevronRight, GraduationCap, CalendarClock } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const CONFETTI_COLORS = [
  '#f87171', '#fdc700', '#4ade80', '#60a5fa',
  '#c084fc', '#fb923c', '#f472b6', '#34d399',
]

const CONFETTI_PARTICLES = Array.from({ length: 24 }, (_, i) => {
  const angle = i * 15
  const isRect = i % 2 === 1
  const color = CONFETTI_COLORS[i % CONFETTI_COLORS.length]
  const distance = 40 + ((i * 37 + 13) % 51)
  return { angle, color, distance, isRect }
})

function ConfettiDots({ moduleColor, reducedMotion }) {
  if (reducedMotion) return null
  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
      {CONFETTI_PARTICLES.map((p, i) => {
        const rad = (p.angle * Math.PI) / 180
        const x = Math.round(Math.cos(rad) * p.distance)
        const y = Math.round(Math.sin(rad) * p.distance)
        return (
          <motion.div
            key={i}
            className={p.isRect ? 'absolute w-3 h-1.5 rounded-sm' : 'absolute w-2 h-2 rounded-full'}
            style={{ background: p.color }}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1, rotate: 0 }}
            animate={{ x, y, opacity: 0, scale: 0.3, rotate: p.isRect ? 360 : 0 }}
            transition={{ duration: 0.75, delay: i * 0.035, ease: [0.16, 1, 0.3, 1] }}
          />
        )
      })}
    </div>
  )
}

export default function SessionClose({
  topic,
  topicId,
  examCount,
  onStartQuiz,
  recap,
  moduleName,
  moduleTopicCount,
  moduleMasteredCount,
}) {
  const navigate = useNavigate()
  const [mounted, setMounted] = useState(false)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="px-5 py-6 flex flex-col gap-5">

      {/* Completion celebration */}
      <motion.div
        className="flex flex-col items-center gap-3 py-6"
        initial={reducedMotion ? {} : { opacity: 0, scale: 0.93 }}
        animate={reducedMotion ? {} : { opacity: 1, scale: 1 }}
        transition={{ duration: reducedMotion ? 0 : 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Checkmark with pulsing ring + confetti */}
        <div className="relative flex items-center justify-center" style={{ width: 120, height: 120 }}>
          {/* Pulsing ring — suppressed when reduced-motion */}
          {!reducedMotion && (
            <motion.div
              className="absolute rounded-full"
              style={{
                width: 96,
                height: 96,
                background: 'transparent',
                border: `2px solid ${topic.moduleColor}50`,
              }}
              animate={{ scale: [1, 1.18, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}
          {/* Outer slow pulse — suppressed when reduced-motion */}
          {!reducedMotion && (
            <motion.div
              className="absolute rounded-full"
              style={{
                width: 96,
                height: 96,
                background: 'transparent',
                border: `1px solid ${topic.moduleColor}30`,
              }}
              animate={{ scale: [1, 1.32, 1], opacity: [0.4, 0, 0.4] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
            />
          )}
          {/* Main circle */}
          <div
            className="relative w-24 h-24 rounded-full flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${topic.moduleColor}20, ${topic.moduleColor}08)`,
              border: `1.5px solid ${topic.moduleColor}35`,
            }}
          >
            <CheckCircle2 size={40} color={topic.moduleColor} strokeWidth={2} />
          </div>
          {/* Confetti dots */}
          <AnimatePresence>
            {mounted && <ConfettiDots moduleColor={topic.moduleColor} reducedMotion={reducedMotion} />}
          </AnimatePresence>
        </div>

        <div className="text-center">
          <h2
            className="font-display font-bold"
            style={{ color: '#f8fafc', fontSize: 22, letterSpacing: '-0.03em' }}
          >
            Lesson complete
          </h2>
          {topic.emoji && (
            <div className="text-2xl mt-1">{topic.emoji}</div>
          )}
          <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>
            {topic.title}
          </p>
        </div>
      </motion.div>

      {/* What you learned today - 3 bullets */}
      <motion.div
        className="rounded-[18px] overflow-hidden"
        style={{
          background: `${topic.moduleColor}0d`,
          border: `1px solid rgba(255,255,255,0.08)`,
        }}
        initial={reducedMotion ? {} : { opacity: 0, y: 14 }}
        animate={reducedMotion ? {} : { opacity: 1, y: 0 }}
        transition={{ delay: reducedMotion ? 0 : 0.18, duration: reducedMotion ? 0 : 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="px-4 pt-4 pb-3">
          <div className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: topic.moduleColor }}>
            What you learned today
          </div>
          <div className="flex flex-col">
            {recap.map((point, i) => (
              <div key={i}>
                <div className="flex items-start gap-3 py-2.5">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 mt-0.5"
                    style={{
                      background: `linear-gradient(135deg, ${topic.moduleColor}40, ${topic.moduleColor}20)`,
                      color: topic.moduleColor,
                    }}
                  >
                    {i + 1}
                  </div>
                  <p className="text-[14px] leading-snug" style={{ color: '#e2e8f0' }}>{point}</p>
                </div>
                {i < recap.length - 1 && (
                  <div
                    className="ml-10"
                    style={{ height: 1, background: `${topic.moduleColor}15` }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Spaced review message */}
      <motion.div
        className="flex items-start gap-3 px-4 py-3.5 rounded-[14px]"
        style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)' }}
        initial={reducedMotion ? {} : { opacity: 0, y: 10 }}
        animate={reducedMotion ? {} : { opacity: 1, y: 0 }}
        transition={{ delay: reducedMotion ? 0 : 0.26, duration: reducedMotion ? 0 : 0.35 }}
      >
        <CalendarClock size={16} color="#818cf8" style={{ marginTop: 2, flexShrink: 0 }} />
        <p className="text-xs leading-relaxed" style={{ color: '#a5b4fc' }}>
          This will come up again in{' '}
          <strong style={{ color: topic.moduleColor }}>1 day</strong>
          {' '}for a quick retrieval check.
          Spaced practice is what moves it from short-term to long-term memory.
        </p>
      </motion.div>


      {/* CTAs */}
      <div className="flex flex-col gap-3">
        <motion.button
          className="font-display w-full rounded-[16px] font-bold flex items-center justify-center gap-2"
          style={{
            height: 56,
            fontSize: 16,
            background: topic.moduleColor,
            color: '#fff',
          }}
          onClick={onStartQuiz}
          whileTap={reducedMotion ? {} : { scale: 0.97 }}
          initial={reducedMotion ? {} : { opacity: 0, y: 18 }}
          animate={reducedMotion ? {} : { opacity: 1, y: 0 }}
          transition={{ delay: reducedMotion ? 0 : 0.33 }}
        >
          Test Your Knowledge
          <ChevronRight size={20} strokeWidth={2.5} />
        </motion.button>

        {examCount > 0 && (
          <motion.button
            className="font-display w-full text-sm font-semibold flex items-center justify-center gap-1.5"
            style={{ height: 44, color: 'rgba(255,255,255,0.45)', background: 'transparent', border: 'none' }}
            onClick={() => navigate(`/exam/${topicId}`)}
            whileTap={reducedMotion ? {} : { scale: 0.98 }}
            initial={reducedMotion ? {} : { opacity: 0 }}
            animate={reducedMotion ? {} : { opacity: 1 }}
            transition={{ delay: reducedMotion ? 0 : 0.45 }}
          >
            <GraduationCap size={14} />
            Exam practice ({examCount} questions)
          </motion.button>
        )}
      </div>
    </div>
  )
}
