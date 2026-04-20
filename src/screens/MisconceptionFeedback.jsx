import { motion, AnimatePresence } from 'motion/react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { ArrowLeft, CheckCircle, XCircle, ArrowClockwise, CaretRight } from '@phosphor-icons/react'
import { useEffect, useRef, useState } from 'react'
import { TOPICS } from '../data/topics'
import { useProgress } from '../hooks/useProgress'
import { saveQuizResult } from '../hooks/useInsights'
import { useReducedMotion } from '../hooks/useReducedMotion'

function ConfettiParticle({ color, delay, x, rot }) {
  return (
    <motion.div
      className="absolute top-0 rounded-sm"
      style={{ left: `${x}%`, width: 8, height: 10, background: color, originX: 0.5 }}
      initial={{ y: -20, opacity: 1, rotate: rot }}
      animate={{ y: 320, opacity: [1, 1, 0], rotate: rot + 360 }}
      transition={{ duration: 1.6, delay, ease: 'easeIn' }}
    />
  )
}

const CONFETTI_COLORS = ['#f97316', '#155dfc', '#c084fc', '#00bc7d', '#fdc700', '#6366f1', '#10b981']

function Confetti() {
  const particles = Array.from({ length: 28 }, (_, i) => ({
    color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
    delay: (i * 0.05) % 0.8,
    x: (i * 37 + 11) % 90 + 5,
    rot: (i * 47) % 360,
  }))
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 50 }}>
      {particles.map((p, i) => <ConfettiParticle key={i} {...p} />)}
    </div>
  )
}

export default function MisconceptionFeedback() {
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { markMastered } = useProgress()
  const reducedMotion = useReducedMotion()
  const topic = TOPICS[id]
  const isCorrect = searchParams.get('result') === 'correct'
  const score = parseInt(searchParams.get('score') ?? '-1', 10)
  const total = parseInt(searchParams.get('total') ?? '0', 10)
  const hasScore = score >= 0 && total > 0
  const [xpEarned, setXpEarned] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)
  const [showMisconception, setShowMisconception] = useState(false)
  const [showConcept, setShowConcept] = useState(false)
  const didMark = useRef(false)

  useEffect(() => {
    if (hasScore && !didMark.current) {
      didMark.current = true
      saveQuizResult(id, score, total)
      window.dispatchEvent(new Event('storage'))
    }
    if (isCorrect && didMark.current) {
      const xp = markMastered(id)
      if (xp > 0) {
        setXpEarned(xp)
        if (!reducedMotion) {
          setShowConfetti(true)
          setTimeout(() => setShowConfetti(false), 2200)
        }
      }
    }
  }, [reducedMotion]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!topic) return null

  const IdeaVisual = topic.ideaVisual
  const RealityVisual = topic.realityVisual

  const handleContinue = () => navigate('/learn')
  const handleRetry = () => navigate(`/diagnostic/${id}`)

  // Growth-framed result text
  const resultHeading = isCorrect
    ? 'Excellent work!'
    : hasScore && score > 0
      ? `You already know ${score} concept${score !== 1 ? 's' : ''}!`
      : "This is a tricky one — let's break it down."

  const resultSub = isCorrect
    ? "You've mastered this concept."
    : hasScore && score > 0
      ? `That's ${score} of ${total} solid — here's the last piece.`
      : 'Understanding why builds stronger memory than just re-reading.'

  return (
    <div className="flex flex-col h-full overflow-hidden" style={{ background: '#0b1121' }}>
      {showConfetti && <Confetti />}

      {/* Header */}
      <div className="px-5 pt-5 pb-3 shrink-0 flex items-center gap-3">
        <button
          onClick={() => navigate('/learn')}
          className="w-11 h-11 rounded-[12px] flex items-center justify-center"
          style={{ background: 'rgba(18,26,47,0.9)', border: '0.75px solid #1d293d' }}
        >
          <ArrowLeft size={18} color="#a8b8cc" />
        </button>
        <div className="flex-1">
          <div className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.35)' }}>Feedback</div>
          <h1 className="text-base font-bold" style={{ color: '#f8fafc' }}>{topic.title}</h1>
        </div>
        <motion.div
          className="w-9 h-9 rounded-[12px] flex items-center justify-center"
          style={{
            background: isCorrect ? 'rgba(34,197,94,0.12)' : 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          {isCorrect
            ? <CheckCircle size={16} color="#4ade80" />
            : <XCircle size={16} color="rgba(255,255,255,0.45)" />
          }
        </motion.div>
      </div>

      {/* Scrollable */}
      <div className="flex-1 overflow-y-auto px-5 pb-5" style={{ minHeight: 0 }}>
        {/* Result banner — growth framing, amber/neutral for wrong */}
        <motion.div
          className="rounded-[16px] p-4 mb-4"
          style={{
            background: isCorrect ? 'rgba(34,197,94,0.08)' : 'rgba(255,255,255,0.04)',
            border: `0.75px solid ${isCorrect ? 'rgba(34,197,94,0.3)' : 'rgba(255,255,255,0.1)'}`,
          }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-start gap-3">
            <div className="flex-1">
              <div className="text-sm font-bold mb-0.5" style={{ color: isCorrect ? '#4ade80' : '#f8fafc' }}>
                {resultHeading}
              </div>
              <div className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
                {resultSub}
              </div>
            </div>
            <AnimatePresence>
              {isCorrect && xpEarned > 0 && (
                <motion.div
                  className="flex items-center gap-1.5 px-3 py-2 rounded-[12px] shrink-0"
                  aria-live="polite" aria-atomic="true"
                  style={{ background: 'rgba(253,199,0,0.12)', border: '1px solid rgba(253,199,0,0.3)' }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.4 }}
                >
                  <span className="text-sm font-bold" style={{ color: '#fdc700' }}>+{xpEarned} XP</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Side-by-side comparison */}
        <div className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: 'rgba(255,255,255,0.35)' }}>
          Common Idea vs Physics Reality
        </div>

        <div className="flex flex-col gap-3 mb-5">
          {/* Common Idea — neutral, muted */}
          <motion.div
            className="rounded-[16px] overflow-hidden"
            style={{ border: '0.75px solid rgba(255,255,255,0.08)', background: 'rgba(18,26,47,0.5)' }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 0.75, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="px-3 pt-3 pb-1 flex items-center gap-1.5">
              <XCircle size={11} color="rgba(255,255,255,0.3)" />
              <span className="text-xs font-semibold" style={{ color: 'rgba(255,255,255,0.4)' }}>Common Idea</span>
            </div>
            {IdeaVisual ? <IdeaVisual /> : null}
          </motion.div>

          {/* Physics Reality — subtle green, no glow */}
          <motion.div
            className="rounded-[16px] overflow-hidden"
            style={{
              border: '1px solid rgba(34,197,94,0.25)',
              background: 'rgba(18,26,47,0.9)',
            }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="px-3 pt-3 pb-1 flex items-center gap-1.5">
              <CheckCircle size={11} color="#4ade80" />
              <span className="text-xs font-semibold" style={{ color: '#4ade80' }}>Physics Reality</span>
            </div>
            {RealityVisual ? <RealityVisual /> : null}
          </motion.div>
        </div>

        {/* Common Misconception — neutral/amber, no red */}
        <motion.div
          className="rounded-[16px] mb-4 overflow-hidden"
          style={{ border: '0.75px solid rgba(255,255,255,0.1)' }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <button
            className="w-full flex items-center justify-between px-4 py-3"
            style={{ background: 'rgba(255,255,255,0.03)' }}
            onClick={() => setShowMisconception(v => !v)}
          >
            <span className="text-xs font-semibold" style={{ color: 'rgba(255,255,255,0.55)' }}>Common Misconception</span>
            <motion.span
              animate={{ rotate: showMisconception ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              style={{ color: 'rgba(255,255,255,0.35)', fontSize: 14 }}
            >
              ▼
            </motion.span>
          </button>
          <AnimatePresence>
            {showMisconception && (
              <motion.div
                className="px-4 pb-3"
                style={{ background: 'rgba(255,255,255,0.02)' }}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.22 }}
              >
                <p className="text-sm pt-2 leading-relaxed" style={{ color: '#cad5e2' }}>{topic.misconception}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Core Concept — neutral border */}
        <motion.div
          className="rounded-[16px] mb-6 overflow-hidden"
          style={{ border: '0.75px solid rgba(255,255,255,0.1)' }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <button
            className="w-full flex items-center justify-between px-4 py-3"
            style={{ background: 'rgba(255,255,255,0.03)' }}
            onClick={() => setShowConcept(v => !v)}
          >
            <span className="text-xs font-semibold" style={{ color: 'rgba(255,255,255,0.55)' }}>Core Concept</span>
            <motion.span
              animate={{ rotate: showConcept ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              style={{ color: 'rgba(255,255,255,0.35)', fontSize: 14 }}
            >
              ▼
            </motion.span>
          </button>
          <AnimatePresence>
            {showConcept && (
              <motion.div
                className="px-4 pb-3"
                style={{ background: 'rgba(255,255,255,0.02)' }}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.22 }}
              >
                <p className="text-sm leading-relaxed pt-2" style={{ color: '#cad5e2' }}>{topic.concept}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* CTAs — ONE primary indigo, ONE text link */}
        <div className="flex flex-col gap-3 pb-6">
          <motion.button
            className="font-display w-full py-4 rounded-[16px] flex items-center justify-center gap-2 font-bold text-sm"
            style={{ background: '#6366f1', color: '#fff', border: 'none', minHeight: 56 }}
            onClick={handleContinue}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            Continue
            <CaretRight size={16} />
          </motion.button>

          {!isCorrect && (
            <motion.button
              className="w-full py-3 flex items-center justify-center gap-2 text-sm font-semibold"
              style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.45)' }}
              onClick={handleRetry}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <ArrowClockwise size={14} />
              Try again
            </motion.button>
          )}
        </div>
      </div>
    </div>
  )
}
