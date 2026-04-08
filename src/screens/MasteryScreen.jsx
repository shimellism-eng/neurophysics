import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle, Circle, Zap, Trophy, Star, Award } from 'lucide-react'
import { TOPICS, MODULES } from '../data/topics'
import { useProgress } from '../hooks/useProgress'

// ---------------------------------------------------------------------------
// Badge definitions
// ---------------------------------------------------------------------------
const BADGES = [
  {
    id: 'first_step',
    emoji: '🔬',
    label: 'First Step',
    color: '#00bc7d',
    check: (mastered, progress, modules) => mastered.length >= 1,
  },
  {
    id: 'momentum',
    emoji: '⚡',
    label: 'Momentum',
    color: '#fdc700',
    check: (mastered) => mastered.length >= 5,
  },
  {
    id: 'force_field',
    emoji: '🧲',
    label: 'Force Field',
    color: '#00a8e8',
    check: (mastered) => mastered.length >= 10,
  },
  {
    id: 'wave_rider',
    emoji: '🌊',
    label: 'Wave Rider',
    color: '#fdc700',
    check: (mastered, progress, modules) => {
      const waveMod = modules.find(m => m.name === 'Waves')
      if (!waveMod) return false
      return waveMod.topics.every(t => progress[t]?.mastered)
    },
  },
  {
    id: 'nuclear',
    emoji: '⚛️',
    label: 'Nuclear',
    color: '#e879f9',
    check: (mastered, progress, modules) => {
      const atomMod = modules.find(m => m.name === 'Atomic Structure')
      if (!atomMod) return false
      return atomMod.topics.every(t => progress[t]?.mastered)
    },
  },
  {
    id: 'grade9',
    emoji: '🏆',
    label: 'Grade 9',
    color: '#f97316',
    check: (mastered, progress, modules, allTopics) => mastered.length >= allTopics.length,
  },
]

// ---------------------------------------------------------------------------
// Burst dots around the progress ring
// ---------------------------------------------------------------------------
const BURST_COUNT = 8
const BURST_RADIUS = 58 // distance from ring centre (px)

function BurstDots({ percent }) {
  if (percent <= 0) return null
  return (
    <div className="absolute inset-0 pointer-events-none" style={{ width: 96, height: 96 }}>
      {Array.from({ length: BURST_COUNT }).map((_, i) => {
        const angle = (i / BURST_COUNT) * 2 * Math.PI - Math.PI / 2
        const x = 48 + BURST_RADIUS * Math.cos(angle) - 1 // centre on 1px dot
        const y = 48 + BURST_RADIUS * Math.sin(angle) - 1
        return (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              left: x,
              top: y,
              width: 2,
              height: 2,
              borderRadius: '50%',
              background: '#155dfc',
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.4, 1], opacity: [0, 1, 0.6] }}
            transition={{
              duration: 1.2,
              delay: 0.6 + i * 0.08,
              ease: 'easeOut',
            }}
          />
        )
      })}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Badge card
// ---------------------------------------------------------------------------
function BadgeCard({ badge, unlocked }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: unlocked ? 1 : 0.4, scale: 1 }}
      transition={{ duration: 0.4 }}
      style={{
        width: 72,
        height: 88,
        borderRadius: 18,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        background: unlocked ? `${badge.color}15` : 'rgba(18,26,47,0.5)',
        border: `0.75px solid ${unlocked ? `${badge.color}50` : '#1d293d'}`,
        boxShadow: unlocked ? `0 0 12px ${badge.color}30` : 'none',
        cursor: 'default',
      }}
    >
      <span style={{ fontSize: 26, lineHeight: 1 }}>{badge.emoji}</span>
      <span
        className="text-xs text-center leading-tight px-1"
        style={{ color: unlocked ? badge.color : '#4a5a6e', fontWeight: 500 }}
      >
        {badge.label}
      </span>
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// Main screen
// ---------------------------------------------------------------------------
export default function MasteryScreen() {
  const navigate = useNavigate()
  const { progress } = useProgress()

  const allTopics = Object.values(TOPICS)
  const mastered = allTopics.filter(t => progress[t.id]?.mastered)
  const started = allTopics.filter(t => progress[t.id]?.started && !progress[t.id]?.mastered)
  const percent = Math.round((mastered.length / allTopics.length) * 100)

  // Celebration banner — show when mastered count hits a multiple of 5
  const [bannerVisible, setBannerVisible] = useState(false)
  const [bannerCount, setBannerCount] = useState(0)

  useEffect(() => {
    if (mastered.length > 0 && mastered.length % 5 === 0) {
      setBannerCount(mastered.length)
      setBannerVisible(true)
      const timer = setTimeout(() => setBannerVisible(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [mastered.length])

  return (
    <div className="flex flex-col h-full overflow-y-auto" style={{ background: '#0b1121' }}>

      {/* Celebration banner */}
      <AnimatePresence>
        {bannerVisible && (
          <motion.div
            key="banner"
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -60, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            style={{
              position: 'sticky',
              top: 0,
              zIndex: 50,
              background: '#00bc7d',
              padding: '10px 20px',
              textAlign: 'center',
            }}
          >
            <span className="text-sm font-semibold" style={{ color: '#0b1121' }}>
              🎉 {bannerCount} topics mastered! Keep going!
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="px-5 pt-6 pb-4">
        <h1 className="text-2xl font-bold" style={{ color: '#f8fafc' }}>Mastery</h1>
        <p className="text-sm leading-relaxed mt-1" style={{ color: '#cad5e2' }}>Track your physics knowledge</p>
      </div>

      {/* Overall progress ring */}
      <div className="px-5 mb-4">
        <div
          className="rounded-[24px] p-6 flex items-center gap-6"
          style={{ background: 'rgba(18,26,47,0.9)', border: '0.75px solid #1d293d' }}
        >
          <div className="relative shrink-0" style={{ width: 96, height: 96 }}>
            <svg width="96" height="96" viewBox="0 0 96 96">
              <circle cx="48" cy="48" r="40" fill="none" stroke="#1d293d" strokeWidth="8" />
              <motion.circle
                cx="48" cy="48" r="40"
                fill="none"
                stroke="#155dfc"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 40}`}
                initial={{ strokeDashoffset: 2 * Math.PI * 40 }}
                animate={{ strokeDashoffset: 2 * Math.PI * 40 * (1 - percent / 100) }}
                transition={{ duration: 1.1, ease: 'easeOut' }}
                transform="rotate(-90 48 48)"
              />
            </svg>
            {/* Burst dots */}
            <BurstDots percent={percent} />
            {/* Centre label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xl font-bold" style={{ color: '#f8fafc' }}>{percent}%</span>
            </div>
          </div>

          <div>
            <div className="text-xl font-bold" style={{ color: '#f8fafc' }}>
              {mastered.length}/{allTopics.length}
            </div>
            <div className="text-sm leading-relaxed" style={{ color: '#cad5e2' }}>Topics mastered</div>
            <div className="flex gap-3 mt-3">
              <div className="flex items-center gap-1.5">
                <CheckCircle size={12} color="#00bc7d" />
                <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#64748b' }}>{mastered.length} done</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap size={12} color="#fdc700" />
                <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#64748b' }}>{started.length} active</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Milestone badges strip */}
      <div className="mb-6">
        <div className="px-5 mb-3">
          <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#64748b' }}>
            Milestones
          </span>
        </div>
        <div
          className="flex gap-3 overflow-x-auto"
          style={{ paddingLeft: 20, paddingRight: 20, scrollbarWidth: 'none' }}
        >
          {BADGES.map(badge => {
            const unlocked = badge.check(mastered, progress, MODULES, allTopics)
            return <BadgeCard key={badge.id} badge={badge} unlocked={unlocked} />
          })}
        </div>
      </div>

      {/* Per-module breakdown */}
      <div className="px-5 pb-8 space-y-3">
        {MODULES.map((mod, i) => {
          const masteredCount = mod.topics.filter(t => progress[t]?.mastered).length
          const pct = Math.round((masteredCount / mod.topics.length) * 100)
          const isComplete = masteredCount === mod.topics.length

          return (
            <motion.div
              key={mod.name}
              className="rounded-[16px] p-4"
              style={{ background: 'rgba(18,26,47,0.9)', border: '0.75px solid #1d293d' }}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
            >
              {/* Module header */}
              <div className="flex items-center gap-3 mb-3">
                <mod.icon size={20} color={mod.color} strokeWidth={2} />
                <div className="flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-semibold" style={{ color: '#f8fafc' }}>{mod.name}</span>
                    {isComplete && <span style={{ fontSize: 14 }}>🎉</span>}
                  </div>
                  <div className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#64748b' }}>
                    {masteredCount}/{mod.topics.length} mastered
                  </div>
                </div>
                <span className="text-xs font-bold" style={{ color: mod.color }}>{pct}%</span>
              </div>

              {/* Progress bar */}
              <div className="h-2 rounded-full" style={{ background: '#1d293d' }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: mod.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.8, delay: i * 0.07 }}
                />
              </div>

              {/* Topic pills */}
              <div className="flex flex-wrap gap-2 mt-3">
                {mod.topics.map(topicId => {
                  const t = TOPICS[topicId]
                  const isMastered = progress[topicId]?.mastered
                  const isStarted = progress[topicId]?.started
                  const isIdle = !isMastered && !isStarted

                  return (
                    <button
                      key={topicId}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
                      style={{
                        background: isMastered ? `${mod.color}20` : isIdle ? 'rgba(18,26,47,0.7)' : 'rgba(29,41,61,0.6)',
                        border: `0.75px solid ${isMastered ? mod.color : isIdle ? '#1d293d' : '#2d3e55'}`,
                        color: isMastered ? mod.color : isIdle ? '#4a5a6e' : '#cad5e2',
                        opacity: isIdle ? 0.65 : 1,
                      }}
                      onClick={() => navigate(`/lesson/${topicId}`)}
                    >
                      {isMastered
                        ? <CheckCircle size={11} />
                        : isStarted
                          ? <Zap size={11} />
                          : <Circle size={11} />}
                      {t.title}
                    </button>
                  )
                })}
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
