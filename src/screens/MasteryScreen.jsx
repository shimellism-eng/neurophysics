import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle, Circle, Zap, Trophy, Star, Clock, ChevronRight } from 'lucide-react'
import { TOPICS, MODULES } from '../data/topics'
import { useProgress } from '../hooks/useProgress'
import { getSelectedBoard, isAvailableForBoard } from '../utils/boardConfig'

// ---------------------------------------------------------------------------
// Badge definitions
// ---------------------------------------------------------------------------
const BADGES = [
  {
    id: 'first_step',
    emoji: '🔬',
    label: 'First Step',
    color: '#00bc7d',
    hint: 'Complete 1 topic',
    check: (mastered) => mastered.length >= 1,
  },
  {
    id: 'momentum',
    emoji: '⚡',
    label: 'Momentum',
    color: '#fdc700',
    hint: 'Master 5 topics',
    check: (mastered) => mastered.length >= 5,
  },
  {
    id: 'force_field',
    emoji: '🧲',
    label: 'Force Field',
    color: '#00a8e8',
    hint: 'Master 10 topics',
    check: (mastered) => mastered.length >= 10,
  },
  {
    id: 'wave_rider',
    emoji: '🌊',
    label: 'Wave Rider',
    color: '#fdc700',
    hint: 'Complete all Waves topics',
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
    hint: 'Complete all Atomic Structure topics',
    check: (mastered, progress, modules) => {
      const atomMod = modules.find(m => m.name === 'Atomic Structure')
      if (!atomMod) return false
      return atomMod.topics.every(t => progress[t]?.mastered)
    },
  },
  {
    id: 'grade9',
    emoji: '🏆',
    label: 'Top Grade',
    color: '#f97316',
    hint: 'Master all topics',
    check: (mastered, progress, modules, allTopics) => mastered.length >= allTopics.length,
  },
]

// ---------------------------------------------------------------------------
// Badge card
// ---------------------------------------------------------------------------
function BadgeCard({ badge, unlocked }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: unlocked ? 1 : 0.42, scale: 1 }}
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
// Next milestone card (shown when nothing earned yet)
// ---------------------------------------------------------------------------
function NextMilestoneCard({ badge }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-[18px] px-5 py-4 flex items-center gap-4"
      style={{
        background: `${badge.color}0d`,
        border: `1px solid ${badge.color}28`,
      }}
    >
      <div
        className="flex items-center justify-center shrink-0"
        style={{
          width: 52, height: 52, borderRadius: 14,
          background: `${badge.color}14`,
          border: `1.5px solid ${badge.color}35`,
          fontSize: 24,
        }}
      >
        {badge.emoji}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-xs font-bold uppercase tracking-wider mb-0.5" style={{ color: badge.color }}>
          Next milestone
        </div>
        <div className="text-sm font-bold" style={{ color: '#f8fafc' }}>{badge.label}</div>
        <div className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.38)' }}>{badge.hint}</div>
      </div>
      <Star size={16} color={badge.color} strokeWidth={1.5} />
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// Main screen
// ---------------------------------------------------------------------------
export default function MasteryScreen() {
  const navigate = useNavigate()
  const { progress, stats } = useProgress()

  const board = getSelectedBoard()
  const allTopics = Object.values(TOPICS).filter(t => isAvailableForBoard(t.boards, board.id))
  const mastered = allTopics.filter(t => progress[t.id]?.mastered)
  const started  = allTopics.filter(t => progress[t.id]?.started && !progress[t.id]?.mastered)
  const percent  = Math.round((mastered.length / allTopics.length) * 100)
  const hasProgress = mastered.length > 0

  // Badge logic — board-aware grade label
  const topGradeLabel = board.gradeSystem === 'A*-G' ? 'Grade A*' : 'Grade 9'
  const labelBadge = (b) => b.id === 'grade9' ? { ...b, label: topGradeLabel } : b
  const unlockedBadgeIds = BADGES
    .filter(b => b.check(mastered, progress, MODULES, allTopics))
    .map(b => b.id)
  const earnedBadges = BADGES.filter(b => unlockedBadgeIds.includes(b.id)).map(labelBadge)
  const nextBadge    = (() => { const b = BADGES.find(b => !unlockedBadgeIds.includes(b.id)); return b ? labelBadge(b) : null })()

  // Celebration banner
  // (share modal removed)
  const generateReport_unused = () => {
    const name = JSON.parse(localStorage.getItem('neurophysics_profile') || '{}').name || 'Student'
    const date = new Date().toLocaleDateString('en-GB')
    const moduleEmoji = {
      'Energy': '⚡',
      'Electricity': '🔋',
      'Particle Model': '💧',
      'Atomic Structure': '⚛️',
      'Forces': '🏃',
      'Waves': '🌊',
      'Magnetism & Electromagnetism': '🧲',
      'Space Physics': '🚀',
    }
    const sep = '─────────────────────────────'
    const lines = [
      sep,
      'NeuroPhysics Progress Report',
      `${name} · ${date}`,
      sep,
      `Overall: ${mastered.length}/${allTopics.length} topics mastered (${percent}%)`,
      '',
      'Per module:',
      ...MODULES.map(mod => {
        const count = mod.topics.filter(t => progress[t]?.mastered).length
        const icon  = moduleEmoji[mod.name] || '📘'
        return `${icon} ${mod.name}: ${count}/${mod.topics.length} mastered`
      }),
      '',
      `Badges earned: ${earnedBadges.map(b => b.label).join(', ') || 'None yet'}`,
      `Current streak: ${stats?.streak ?? 0} day${(stats?.streak ?? 0) === 1 ? '' : 's'}`,
      `Total XP: ${stats?.xp ?? 0}`,
      sep,
      'Generated by NeuroPhysics',
    ]
    return lines.join('\n')
  }

  // First-use intro card — shows once, dismissed to localStorage
  const [showIntro, setShowIntro] = useState(() =>
    localStorage.getItem('np_mastery_intro_seen') !== 'true'
  )
  const dismissIntro = () => {
    localStorage.setItem('np_mastery_intro_seen', 'true')
    setShowIntro(false)
  }

  // Celebration banner
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
    <div className="flex flex-col h-full overflow-y-auto" style={{ background: '#080f1e' }}>

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
              position: 'sticky', top: 0, zIndex: 50,
              background: '#00bc7d', padding: '10px 20px', textAlign: 'center',
            }}
          >
            <span className="text-sm font-semibold" style={{ color: '#0b1121' }}>
              🎉 {bannerCount} topics mastered! Keep going!
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Header ── */}
      <div className="px-5 pt-6 pb-4">
        <h1 className="text-2xl font-bold" style={{ color: '#f8fafc' }}>Mastery</h1>
        <p className="text-sm leading-relaxed mt-1" style={{ color: 'rgba(255,255,255,0.38)' }}>
          Track your physics knowledge
        </p>
      </div>

      {/* ── Overall progress hero ── */}
      <div className="px-5 mb-5">
        <motion.div
          className="rounded-[24px] p-6"
          style={{ background: 'rgba(15,22,41,0.95)', border: '0.75px solid rgba(255,255,255,0.08)' }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {hasProgress ? (
            /* ── Active state: ring + stats ── */
            <div className="flex items-center gap-6">
              <div className="relative shrink-0" style={{ width: 96, height: 96 }}>
                <svg width="96" height="96" viewBox="0 0 96 96">
                  <circle cx="48" cy="48" r="40" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="8" />
                  <motion.circle
                    cx="48" cy="48" r="40"
                    fill="none" stroke="#155dfc" strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 40}`}
                    initial={{ strokeDashoffset: 2 * Math.PI * 40 }}
                    animate={{ strokeDashoffset: 2 * Math.PI * 40 * (1 - percent / 100) }}
                    transition={{ duration: 1.1, ease: 'easeOut' }}
                    transform="rotate(-90 48 48)"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xl font-bold" style={{ color: '#f8fafc' }}>{percent}%</span>
                </div>
              </div>
              <div>
                <div className="text-xl font-bold" style={{ color: '#f8fafc' }}>
                  {mastered.length}/{allTopics.length}
                </div>
                <div className="text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>Topics mastered</div>
                <div className="flex gap-3 mt-3">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle size={12} color="#00bc7d" />
                    <span className="text-xs font-semibold" style={{ color: '#64748b' }}>{mastered.length} done</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Zap size={12} color="#fdc700" />
                    <span className="text-xs font-semibold" style={{ color: '#64748b' }}>{started.length} active</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* ── Zero state: welcoming, no percentage ── */
            <div className="flex flex-col items-center text-center py-2">
              <div
                className="flex items-center justify-center mb-4"
                style={{
                  width: 72, height: 72, borderRadius: 20,
                  background: 'linear-gradient(135deg, rgba(21,93,252,0.2), rgba(99,102,241,0.12))',
                  border: '1.5px solid rgba(99,102,241,0.3)',
                  fontSize: 32,
                }}
              >
                🧬
              </div>
              <h2 className="text-lg font-bold mb-1" style={{ color: '#f8fafc' }}>Your journey begins here</h2>
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.38)', maxWidth: 240, lineHeight: 1.5 }}>
                Complete your first topic to start building mastery
              </p>
              <motion.button
                className="mt-4 px-6 py-3 rounded-[14px] text-sm font-bold"
                style={{
                  background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
                  color: '#fff',
                  boxShadow: '0 4px 0 rgba(0,0,0,0.18)',
                }}
                onClick={() => navigate('/learn')}
                whileTap={{ y: 2, boxShadow: '0 1px 0 rgba(0,0,0,0.1)' }}
              >
                Browse topics
              </motion.button>
            </div>
          )}
        </motion.div>
      </div>

      {/* ── Milestones ── */}
      <div className="px-5 mb-5">
        {earnedBadges.length === 0 ? (
          /* Show only the next milestone card */
          nextBadge && <NextMilestoneCard badge={nextBadge} />
        ) : (
          /* Show earned badges + next unlockable */
          <div>
            <div className="mb-3">
              <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.3)' }}>
                Badges earned
              </span>
            </div>
            <div
              className="flex gap-3 overflow-x-auto pb-1"
              style={{ scrollbarWidth: 'none' }}
            >
              {earnedBadges.map(badge => (
                <BadgeCard key={badge.id} badge={badge} unlocked={true} />
              ))}
              {nextBadge && (
                <div className="relative shrink-0">
                  <BadgeCard badge={nextBadge} unlocked={false} />
                  <div
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] font-bold px-2 py-0.5 rounded-full"
                    style={{ background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.35)' }}
                  >
                    Next
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ── First-use intro card ── */}
      {showIntro && (
        <div className="px-5 mb-2">
          <div style={{
            background: 'rgba(0,212,255,0.08)',
            border: '0.75px solid rgba(0,212,255,0.2)',
            borderRadius: 16, padding: '14px 16px',
            marginBottom: 16, display: 'flex', gap: 12,
          }}>
            <span style={{ fontSize: 24 }}>⭐</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: '#f8fafc', marginBottom: 6 }}>
                How mastery works
              </div>
              <div style={{ fontSize: 12, color: '#94a3b8', lineHeight: 1.6 }}>
                ⭐⭐⭐ = Mastered · ⭐⭐ = Getting there · ⭐ = Just started<br/>
                Complete lessons and practice questions to earn stars and XP.<br/>
                Topics you master come back for spaced repetition review.
              </div>
              <button onClick={dismissIntro} style={{
                marginTop: 10, background: 'none', border: 'none',
                color: '#00d4ff', fontSize: 12, fontWeight: 600,
                cursor: 'pointer', padding: 0,
              }}>Got it →</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Per-module breakdown ── */}
      <div className="px-5 pb-4 space-y-3">
        {MODULES.map((mod, i) => {
          const masteredCount = mod.topics.filter(t => progress[t]?.mastered).length
          const pct = Math.round((masteredCount / mod.topics.length) * 100)
          const isComplete = masteredCount === mod.topics.length
          const hasAny = masteredCount > 0

          return (
            <motion.div
              key={mod.name}
              className="rounded-[18px] p-4"
              style={{
                background: 'rgba(15,22,41,0.95)',
                border: `0.75px solid ${hasAny ? mod.color + '30' : 'rgba(255,255,255,0.07)'}`,
              }}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              {/* Module header */}
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="flex items-center justify-center shrink-0"
                  style={{
                    width: 36, height: 36, borderRadius: 10,
                    background: `${mod.color}18`,
                    border: `1.5px solid ${mod.color}35`,
                  }}
                >
                  <mod.icon size={18} color={mod.color} strokeWidth={2} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-sm font-semibold" style={{ color: '#f8fafc' }}>{mod.name}</span>
                    {isComplete && <span style={{ fontSize: 14 }}>🎉</span>}
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.32)' }}>
                    {hasAny
                      ? `${masteredCount} of ${mod.topics.length} mastered`
                      : `${mod.topics.length} to explore`}
                  </div>
                </div>
                {hasAny && (
                  <span className="text-xs font-bold shrink-0" style={{ color: mod.color }}>{pct}%</span>
                )}
              </div>

              {/* Progress bar */}
              <div className="h-1.5 rounded-full mb-3" style={{ background: 'rgba(255,255,255,0.06)' }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: mod.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.8, delay: i * 0.05 }}
                />
              </div>

              {/* Topic pills — 44px min touch target */}
              <div className="flex flex-wrap gap-2">
                {mod.topics.map(topicId => {
                  const t = TOPICS[topicId]
                  const isMastered = progress[topicId]?.mastered
                  const isStarted  = progress[topicId]?.started
                  const isIdle     = !isMastered && !isStarted

                  return (
                    <motion.button
                      key={topicId}
                      className="flex items-center rounded-full font-medium"
                      style={{
                        gap: 6,
                        padding: '8px 14px',
                        fontSize: 13,
                        lineHeight: 1.4,
                        height: 'auto',
                        minHeight: 44,
                        background: isMastered
                          ? `${mod.color}20`
                          : isStarted
                            ? 'rgba(251,191,36,0.1)'
                            : 'rgba(255,255,255,0.04)',
                        border: `0.75px solid ${
                          isMastered ? mod.color + '60'
                          : isStarted ? 'rgba(251,191,36,0.3)'
                          : 'rgba(255,255,255,0.1)'}`,
                        color: isMastered
                          ? mod.color
                          : isStarted
                            ? '#fbbf24'
                            : 'rgba(255,255,255,0.45)',
                      }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => navigate(`/lesson/${topicId}`)}
                    >
                      {isMastered
                        ? <CheckCircle size={11} />
                        : isStarted
                          ? <Zap size={11} />
                          : <Circle size={11} strokeWidth={1.5} />}
                      {t?.title}
                    </motion.button>
                  )
                })}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* ── Exam modes — advanced features, below module list ── */}
      <div className="px-5 pb-3 space-y-3">
        <div className="mb-2">
          <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.28)' }}>
            Exam practice
          </span>
        </div>

        <motion.button
          className="w-full py-4 rounded-[16px] flex items-center justify-between px-5"
          style={{
            background: 'linear-gradient(135deg, rgba(168,85,247,0.18), rgba(99,102,241,0.18))',
            border: '1px solid rgba(168,85,247,0.35)',
            minHeight: 64,
          }}
          onClick={() => navigate('/grade9')}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center shrink-0"
              style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(168,85,247,0.15)', border: '1px solid rgba(168,85,247,0.3)' }}>
              <Trophy size={18} color="#a855f7" />
            </div>
            <div className="text-left">
              <p className="text-sm font-bold" style={{ color: '#f8fafc' }}>{topGradeLabel} Challenge</p>
              <p className="text-xs mt-0.5" style={{ color: '#a855f7' }}>Chained calcs · RPA errors · Novel context</p>
            </div>
          </div>
          <ChevronRight size={18} color="rgba(168,85,247,0.6)" />
        </motion.button>

        <motion.button
          className="w-full py-4 rounded-[16px] flex items-center justify-between px-5"
          style={{
            background: 'rgba(99,102,241,0.1)',
            border: '0.75px solid rgba(99,102,241,0.28)',
            minHeight: 64,
          }}
          onClick={() => navigate('/timed-paper')}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center shrink-0"
              style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.3)' }}>
              <Clock size={18} color="#6366f1" />
            </div>
            <div className="text-left">
              <p className="text-sm font-bold" style={{ color: '#f8fafc' }}>Timed Paper</p>
              <p className="text-xs mt-0.5" style={{ color: '#818cf8' }}>Exam-style 35 marks · 55 minutes</p>
            </div>
          </div>
          <ChevronRight size={18} color="rgba(99,102,241,0.5)" />
        </motion.button>
      </div>

    </div>
  )
}
