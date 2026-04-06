import { motion, AnimatePresence } from 'motion/react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { ArrowLeft, CheckCircle, XCircle, RefreshCw, Map, Star, Zap } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { TOPICS } from '../data/topics'
import { useProgress } from '../hooks/useProgress'
import { saveQuizResult } from '../hooks/useInsights'

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
  const topic = TOPICS[id]
  const isCorrect = searchParams.get('result') === 'correct'
  const score = parseInt(searchParams.get('score') ?? '-1', 10)
  const total = parseInt(searchParams.get('total') ?? '0', 10)
  const hasScore = score >= 0 && total > 0
  const [xpEarned, setXpEarned] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)
  const didMark = useRef(false)

  useEffect(() => {
    // Save quiz result for insights (once per visit)
    if (hasScore && !didMark.current) {
      saveQuizResult(id, score, total)
      // Trigger storage event so useInsights in other components reacts
      window.dispatchEvent(new Event('storage'))
    }
    if (isCorrect && !didMark.current) {
      didMark.current = true
      const xp = markMastered(id)
      if (xp > 0) {
        setXpEarned(xp)
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        const appReduceMotion = (() => {
          try { return JSON.parse(localStorage.getItem('neurophysics_prefs') || '{}').reduceMotion } catch { return false }
        })()
        if (!prefersReducedMotion && !appReduceMotion) {
          setShowConfetti(true)
          setTimeout(() => setShowConfetti(false), 2200)
        }
      }
    }
  }, [])

  if (!topic) return null

  const IdeaVisual = topic.ideaVisual
  const RealityVisual = topic.realityVisual

  const handleContinue = () => navigate('/topics')
  const handleRetry = () => navigate(`/diagnostic/${id}`)

  return (
    <div className="flex flex-col h-full overflow-hidden" style={{ background: '#0b1121' }}>
      {showConfetti && <Confetti />}

      {/* Header */}
      <div className="px-5 pt-5 pb-3 shrink-0 flex items-center gap-3">
        <button
          onClick={() => navigate('/topics')}
          className="w-11 h-11 rounded-[12px] flex items-center justify-center"
          style={{ background: 'rgba(18,26,47,0.9)', border: '0.75px solid #1d293d' }}
        >
          <ArrowLeft size={18} color="#a8b8cc" />
        </button>
        <div className="flex-1">
          <div className="text-xs font-medium" style={{ color: topic.moduleColor }}>Feedback</div>
          <h1 className="text-base font-bold" style={{ color: '#f8fafc' }}>{topic.title}</h1>
        </div>
        <motion.div
          className="w-9 h-9 rounded-[12px] flex items-center justify-center"
          style={{
            background: isCorrect ? 'rgba(0,188,125,0.2)' : 'rgba(239,68,68,0.2)',
            border: `1px solid ${isCorrect ? '#00bc7d' : '#ef4444'}`,
          }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          {isCorrect
            ? <CheckCircle size={16} color="#00bc7d" />
            : <XCircle size={16} color="#ef4444" />
          }
        </motion.div>
      </div>

      {/* Scrollable */}
      <div className="flex-1 overflow-y-auto px-5 pb-5">
        {/* Result banner */}
        <motion.div
          className="rounded-[16px] p-4 mb-4 flex items-center gap-3"
          style={{
            background: isCorrect ? 'rgba(0,188,125,0.1)' : 'rgba(239,68,68,0.1)',
            border: `0.75px solid ${isCorrect ? '#00bc7d' : '#ef4444'}`,
          }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex-1">
            <div className="text-sm font-bold" style={{ color: isCorrect ? '#00bc7d' : '#ef4444' }}>
              {isCorrect ? 'Correct! Well done.' : "Not quite. Let's look at why."}
            </div>
            <div className="text-xs mt-0.5" style={{ color: '#a8b8cc' }}>
              {hasScore
                ? `You got ${score} out of ${total} correct`
                : isCorrect
                ? "You've mastered this concept."
                : 'Understanding misconceptions helps you learn faster.'}
            </div>
          </div>

          {/* XP earned badge */}
          <AnimatePresence>
            {isCorrect && xpEarned > 0 && (
              <motion.div
                className="flex items-center gap-1.5 px-3 py-2 rounded-[12px]"
                style={{ background: 'rgba(253,199,0,0.15)', border: '1px solid rgba(253,199,0,0.4)' }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.4 }}
              >
                <Zap size={13} color="#fdc700" strokeWidth={2.5} />
                <span className="text-sm font-bold" style={{ color: '#fdc700' }}>+{xpEarned} XP</span>
              </motion.div>
            )}
          </AnimatePresence>

          {isCorrect && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.3, 1] }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Star size={22} color="#fdc700" fill="#fdc700" />
            </motion.div>
          )}
        </motion.div>

        {/* Side-by-side comparison */}
        <div className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: '#a8b8cc' }}>
          Intuition vs Reality
        </div>

        <div className="flex flex-col gap-3 mb-5">
          <motion.div
            className="rounded-[16px] overflow-hidden"
            style={{ border: '0.75px solid #1d293d', background: 'rgba(18,26,47,0.6)' }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 0.75, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="px-3 pt-3 pb-1 flex items-center gap-1.5">
              <XCircle size={11} color="#ef4444" />
              <span className="text-xs font-semibold" style={{ color: '#ef4444' }}>Common Idea</span>
            </div>
            <IdeaVisual />
          </motion.div>

          <motion.div
            className="rounded-[16px] overflow-hidden"
            style={{
              border: '1.5px solid #00bc7d',
              background: 'rgba(18,26,47,0.9)',
              boxShadow: '0px 0px 20px 0px rgba(0,188,125,0.2)',
            }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="px-3 pt-3 pb-1 flex items-center gap-1.5">
              <CheckCircle size={11} color="#00bc7d" />
              <span className="text-xs font-semibold" style={{ color: '#00bc7d' }}>Physics Reality</span>
            </div>
            <RealityVisual />
          </motion.div>
        </div>

        {/* Misconception */}
        <motion.div
          className="rounded-[16px] p-4 mb-4"
          style={{ background: 'rgba(239,68,68,0.08)', border: '0.75px solid rgba(239,68,68,0.3)' }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="text-xs font-semibold mb-1.5" style={{ color: '#ef4444' }}>Misconception</div>
          <p className="text-sm" style={{ color: '#cad5e2' }}>{topic.misconception}</p>
        </motion.div>

        {/* Core concept */}
        <motion.div
          className="rounded-[16px] p-4 mb-6"
          style={{ background: `${topic.moduleColor}10`, border: `0.75px solid ${topic.moduleColor}50` }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="text-xs font-semibold mb-1.5" style={{ color: topic.moduleColor }}>Core Concept</div>
          <p className="text-sm leading-relaxed" style={{ color: '#cad5e2' }}>{topic.concept}</p>
        </motion.div>

        {/* CTAs  -  inside scroll, always reachable */}
        <div className="flex gap-3 pb-6">
          {!isCorrect && (
            <motion.button
              className="flex-1 py-4 rounded-[16px] flex items-center justify-center gap-2 font-semibold text-sm"
              style={{ background: 'rgba(18,26,47,0.9)', border: '0.75px solid #1d293d', color: '#cad5e2' }}
              onClick={handleRetry}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <RefreshCw size={16} />
              Try Again
            </motion.button>
          )}
          <motion.button
            className="flex-1 py-4 rounded-[16px] flex items-center justify-center gap-2 font-semibold text-sm"
            style={{
              background: isCorrect
                ? `linear-gradient(135deg, ${topic.moduleColor}, ${topic.moduleColor}cc)`
                : `${topic.moduleColor}20`,
              boxShadow: isCorrect ? `0px 8px 24px ${topic.moduleColor}40` : 'none',
              color: isCorrect ? '#fff' : topic.moduleColor,
              border: isCorrect ? 'none' : `0.75px solid ${topic.moduleColor}50`,
            }}
            onClick={handleContinue}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
          >
            <Map size={16} />
            Topic Map
          </motion.button>
        </div>
      </div>
    </div>
  )
}
