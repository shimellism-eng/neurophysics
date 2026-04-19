import { motion, AnimatePresence } from 'motion/react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CheckCircle2, Zap, ChevronDown, ChevronUp,
  ArrowRight, Trophy, Clock, ChevronRight, Star, Search, X,
} from 'lucide-react'
import { MODULES, TOPICS, PHYSICS_ONLY_TOPICS } from '../data/topics'
import { useProgress } from '../hooks/useProgress'
import { getSelectedBoard, isAvailableForBoard, getSelectedCourse } from '../utils/boardConfig'

// ─── Badge definitions (for next milestone) ──────────────────────────────────

const BADGES = [
  { id: 'first_step', emoji: '🔬', label: 'First Step',  color: '#00bc7d', hint: 'Complete 1 topic',        check: (m)         => m >= 1 },
  { id: 'momentum',   emoji: '⚡', label: 'Momentum',    color: '#fdc700', hint: 'Master 5 topics',         check: (m)         => m >= 5 },
  { id: 'force_field',emoji: '🧲', label: 'Force Field', color: '#00a8e8', hint: 'Master 10 topics',        check: (m)         => m >= 10 },
  { id: 'grade9',     emoji: '🏆', label: 'Top Grade',     color: '#f97316', hint: 'Master all 55 topics',   check: (m, total)  => m >= total },
]

// ─── Circular ring per module ─────────────────────────────────────────────────

function ProgressRing({ pct, color, size = 50 }) {
  const stroke = 4.5
  const r = (size - stroke * 2) / 2
  const circ = 2 * Math.PI * r
  const dash = (pct / 100) * circ
  const hasProgress = pct > 0

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ flexShrink: 0 }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth={stroke} />
      {hasProgress && (
        <circle
          cx={size/2} cy={size/2} r={r} fill="none" stroke={color}
          strokeWidth={stroke} strokeLinecap="round"
          strokeDasharray={`${dash} ${circ}`}
          transform={`rotate(-90 ${size/2} ${size/2})`}
          style={{ transition: 'stroke-dasharray 0.9s cubic-bezier(0.16,1,0.3,1)' }}
        />
      )}
      <text
        x={size/2} y={size/2} textAnchor="middle" dominantBaseline="central"
        fontSize={hasProgress ? 10 : 13} fontWeight={700}
        fill={hasProgress ? color : 'rgba(255,255,255,0.15)'}
      >
        {hasProgress ? `${Math.round(pct)}%` : '—'}
      </text>
    </svg>
  )
}

// ─── Topic tile ───────────────────────────────────────────────────────────────

function TopicTile({ topic, moduleColor, masteryState, index, onTap }) {
  const isMastered = masteryState === 'mastered'
  const isStarted  = masteryState === 'started'
  const ctaLabel   = isMastered ? 'Review' : isStarted ? 'Continue' : 'Start'

  return (
    <motion.button
      type="button"
      className="w-full flex items-center gap-3 px-4 text-left"
      style={{
        minHeight: 52,
        background: 'transparent',
        border: '0.75px solid rgba(255,255,255,0.08)',
        borderRadius: 14,
        paddingTop: 10,
        paddingBottom: 10,
      }}
      onClick={onTap}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03, duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* State dot */}
      <div
        className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
        style={{ background: isMastered ? `${moduleColor}22` : 'rgba(255,255,255,0.05)' }}
      >
        {isMastered ? (
          <CheckCircle2 size={12} color={moduleColor} strokeWidth={2.5} />
        ) : isStarted ? (
          <div className="w-2 h-2 rounded-full" style={{ background: '#6366f1' }} />
        ) : (
          <div className="w-2 h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.18)' }} />
        )}
      </div>

      {/* Title — wraps to second line if needed */}
      <p
        className="flex-1 text-[14px] font-semibold leading-snug"
        style={{ color: isMastered ? 'rgba(255,255,255,0.45)' : '#e2e8f0' }}
      >
        {topic.title}
      </p>

      {/* Status label — plain text, no button shape */}
      <span
        className="text-[12px] font-medium shrink-0"
        style={{ color: isMastered ? 'rgba(255,255,255,0.25)' : isStarted ? '#818cf8' : 'rgba(255,255,255,0.18)' }}
      >
        {ctaLabel}
      </span>
    </motion.button>
  )
}

// ─── Module card ──────────────────────────────────────────────────────────────

function ModuleCard({ module, moduleIndex, progress, expanded, onToggle, selectedBoard, selectedCourse }) {
  const navigate = useNavigate()

  // Only count topics visible to this board + course
  const visibleTopics = module.topics.filter(id => {
    const t = TOPICS[id]
    if (!t) return false
    if (t.boards && t.boards.length > 0 && !t.boards.includes(selectedBoard.id)) return false
    if (selectedCourse === 'combined' && PHYSICS_ONLY_TOPICS.has(id)) return false
    return true
  })
  const masteredCount = visibleTopics.filter(t => progress[t]?.mastered).length
  const startedCount  = visibleTopics.filter(t => progress[t]?.started && !progress[t]?.mastered).length
  const totalTopics   = visibleTopics.length
  const pct           = totalTopics > 0 ? (masteredCount / totalTopics) * 100 : 0
  const isComplete    = masteredCount === totalTopics

  const getState = (id) => {
    if (progress[id]?.mastered) return 'mastered'
    if (progress[id]?.started)  return 'started'
    return 'untouched'
  }

  return (
    <motion.div
      className="rounded-[22px] overflow-hidden"
      style={{
        background: 'var(--np-card)',
        border: `1px solid ${pct > 0 ? module.color + '35' : 'var(--np-border)'}`,
        boxShadow: pct > 0 ? `0 4px 24px ${module.color}10` : 'none',
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: moduleIndex * 0.05, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      <button className="w-full" onClick={onToggle} style={{ textAlign: 'left' }}>
        <div className="px-4 pt-4 pb-3 flex items-center gap-3"
          style={{ background: `linear-gradient(135deg, ${module.color}18 0%, ${module.color}06 100%)` }}>
          <div className="w-11 h-11 rounded-[14px] flex items-center justify-center shrink-0"
            style={{ background: `${module.color}25`, border: `1.5px solid ${module.color}50` }}>
            <module.icon size={22} color={module.color} strokeWidth={2} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <div className="text-sm font-bold leading-tight" style={{ color: 'var(--np-text)' }}>
                {module.name}
              </div>
              {module.topics.every(t => PHYSICS_ONLY_TOPICS.has(t)) && (
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full shrink-0"
                  style={{ background: 'rgba(232,121,249,0.12)', color: '#e879f9', border: '1px solid rgba(232,121,249,0.3)' }}>
                  Physics only
                </span>
              )}
              {module.boardLabel && (
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full shrink-0"
                  style={{ background: `${module.color}15`, color: module.color, border: `1px solid ${module.color}35` }}>
                  {module.boardLabel}
                </span>
              )}
            </div>
            <div className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>
              {masteredCount > 0
                ? `${masteredCount} of ${totalTopics} mastered`
                : startedCount > 0
                  ? `${startedCount} in progress`
                  : `${totalTopics} to explore`}
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <ProgressRing pct={pct} color={module.color} size={50} />
            <div className="w-6 h-6 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(255,255,255,0.05)' }}>
              {expanded
                ? <ChevronUp size={13} color="rgba(255,255,255,0.4)" />
                : <ChevronDown size={13} color="rgba(255,255,255,0.4)" />}
            </div>
          </div>
        </div>
        <div className="px-4 pb-3">
          <div className="h-[5px] rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
            <motion.div className="h-full rounded-full"
              style={{ background: isComplete ? `linear-gradient(90deg, ${module.color}, #22c55e)` : module.color }}
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 1, delay: moduleIndex * 0.07, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div key="topics"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div className="mx-4 h-px mb-3" style={{ background: `${module.color}20` }} />
            <div className="px-3 pb-4 flex flex-col gap-2">
              {module.topics.map((topicId, i) => {
                const topic = TOPICS[topicId]
                if (!topic) return null
                // Hide topics restricted to other boards or course
                if (topic.boards && topic.boards.length > 0 && !topic.boards.includes(selectedBoard.id)) return null
                if (selectedCourse === 'combined' && PHYSICS_ONLY_TOPICS.has(topicId)) return null
                return (
                  <TopicTile
                    key={topicId}
                    topic={topic}
                    moduleColor={module.color}
                    masteryState={getState(topicId)}
                    index={i}
                    onTap={() => {
                      if (topic.hook || (topic.lessonSteps && topic.lessonSteps.length > 0)) {
                        navigate(`/lesson/${topicId}`)
                      } else if (topic.practicalId) {
                        navigate(`/practical/${topic.practicalId}`)
                      } else {
                        navigate(`/practice/${topicId}`)
                      }
                    }}
                  />
                )
              })}
            </div>

            {/* Module-level action buttons */}
            <div className="px-3 pb-4 flex flex-col gap-2 mt-1">
              <button
                type="button"
                className="w-full py-3 rounded-[12px] text-sm font-semibold"
                style={{
                  background: 'transparent',
                  border: '0.75px solid rgba(255,255,255,0.12)',
                  color: '#a8b8cc',
                  minHeight: 44,
                }}
                onClick={() => {
                  const firstTopic = module.topics.find(id => {
                    const t = TOPICS[id]
                    if (!t) return false
                    if (t.boards && t.boards.length > 0 && !t.boards.includes(selectedBoard.id)) return false
                    if (selectedCourse === 'combined' && PHYSICS_ONLY_TOPICS.has(id)) return false
                    return true
                  })
                  if (firstTopic) navigate(`/practice/${firstTopic}`)
                }}
              >
                Practice questions
              </button>
              <button
                type="button"
                className="w-full py-3 rounded-[12px] text-sm font-semibold"
                style={{
                  background: 'transparent',
                  border: '0.75px solid rgba(255,255,255,0.12)',
                  color: '#a8b8cc',
                  minHeight: 44,
                }}
                onClick={() => navigate('/timed-paper')}
              >
                Exam practice
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ─── Screen ───────────────────────────────────────────────────────────────────

const PAPER1_MODULES = ['Energy', 'Electricity', 'Particle Model', 'Atomic Structure']
const PAPER2_MODULES = ['Forces', 'Waves', 'Magnetism & Electromagnetism', 'Space Physics']

const FILTER_COLORS = ['#6366f1', '#f97316', '#00a8e8', '#10b981']

export default function LearnScreen() {
  const navigate     = useNavigate()
  const { progress } = useProgress()
  const [paperFilter, setPaperFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedBoard, setSelectedBoard] = useState(() => getSelectedBoard())
  const [selectedCourse, setSelectedCourseState] = useState(() => getSelectedCourse())

  // Re-read board/course if settings change while component is mounted
  useEffect(() => {
    const onStorage = () => { setSelectedBoard(getSelectedBoard()); setSelectedCourseState(getSelectedCourse()) }
    window.addEventListener('storage', onStorage)
    // Also check on focus (iOS doesn't fire storage events reliably)
    const onFocus = () => { setSelectedBoard(getSelectedBoard()); setSelectedCourseState(getSelectedCourse()) }
    window.addEventListener('focus', onFocus)
    return () => { window.removeEventListener('storage', onStorage); window.removeEventListener('focus', onFocus) }
  }, [])

  // Board + course filtered modules
  const boardModules = MODULES.filter(m => {
    if (!isAvailableForBoard(m.boards, selectedBoard.id)) return false
    // For combined students, hide modules where ALL topics are physics-only
    if (selectedCourse === 'combined' && m.topics.every(t => PHYSICS_ONLY_TOPICS.has(t))) return false
    return true
  })

  // Module expand state — persisted in sessionStorage so back-navigation restores it
  // Uses module.name as the stable key (modules have no id field)
  const [openModules, setOpenModules] = useState(() => {
    try {
      const saved = sessionStorage.getItem('np_open_modules')
      return saved ? JSON.parse(saved) : [boardModules[0]?.name].filter(Boolean)
    } catch { return [] }
  })

  const toggleModule = (name) => {
    setOpenModules(prev => {
      const next = prev.includes(name) ? prev.filter(x => x !== name) : [...prev, name]
      sessionStorage.setItem('np_open_modules', JSON.stringify(next))
      return next
    })
  }

  // Dynamic filter tabs from board's paperLabels
  const paperLabels = selectedBoard.paperLabels || ['All', 'Paper 1', 'Paper 2']
  const FILTERS = [
    { id: 'all', label: paperLabels[0], color: FILTER_COLORS[0] },
    ...paperLabels.slice(1).map((label, i) => ({
      id: `paper${i + 1}`,
      label,
      color: FILTER_COLORS[i + 1] || '#6366f1',
    })),
  ]

  const totalTopics   = boardModules.flatMap(m => m.topics).filter(id => TOPICS[id]).length
  const masteredTotal = Object.values(progress).filter(p => p?.mastered).length
  const overallPct    = totalTopics > 0 ? (masteredTotal / totalTopics) * 100 : 0
  const isNewUser     = masteredTotal === 0

  // Next milestone — compute badge with board-aware grade label
  const topGradeLabel = selectedBoard.gradeSystem === 'A*-G' ? 'Grade A*' : 'Grade 9'
  const nextBadge = (() => {
    const b = BADGES.find(b => !b.check(masteredTotal, totalTopics))
    if (!b) return null
    return b.id === 'grade9' ? { ...b, label: topGradeLabel } : b
  })()

  // First unmastered topic for "Start here" banner
  const allModuleTopics  = boardModules.flatMap(m => m.topics)
  const firstUnmastered  = allModuleTopics.find(id => !progress[id]?.mastered)
  const firstTopic       = firstUnmastered ? TOPICS[firstUnmastered] : null
  const firstModule      = firstUnmastered ? boardModules.find(m => m.topics.includes(firstUnmastered)) : null

  const filteredModules = boardModules.filter(m => {
    if (paperFilter === 'all') return true
    if (paperFilter === 'paper1') return PAPER1_MODULES.includes(m.name)
    if (paperFilter === 'paper2') return PAPER2_MODULES.includes(m.name)
    // paper3+ (e.g. WJEC Unit 3): no module name mapping yet — show all remaining
    return true
  })

  // Search: flat results across board-filtered modules
  const searchResults = searchQuery.trim().length > 1
    ? boardModules.flatMap(m =>
        m.topics
          .filter(id => {
            const t = TOPICS[id]
            if (!t) return false
            // Filter by board at topic level too
            if (t.boards && t.boards.length > 0 && !t.boards.includes(selectedBoard.id)) return false
            if (selectedCourse === 'combined' && PHYSICS_ONLY_TOPICS.has(id)) return false
            return t.title.toLowerCase().includes(searchQuery.toLowerCase())
          })
          .map(id => ({ id, topic: TOPICS[id], module: m }))
      )
    : []
  const isSearching = searchQuery.trim().length > 1

  return (
    <div className="flex flex-col h-full overflow-hidden" style={{ background: 'var(--np-bg)' }}>

      {/* ── Header: compact progress ── */}
      <div className="px-5 pb-4 shrink-0" style={{ paddingTop: '12px' }}>
        <div className="flex items-center justify-between mb-1">
          <div>
            <h1 className="text-[22px] font-bold tracking-tight" style={{ color: 'var(--np-text)', letterSpacing: '-0.02em' }}>
              GCSE Physics
            </h1>
            <button
              onClick={() => navigate('/settings')}
              className="inline-flex items-center gap-1 mt-0.5 px-2 py-0.5 rounded-full text-[10px] font-bold"
              style={{
                background: `${selectedBoard.color}18`,
                border: `1px solid ${selectedBoard.color}40`,
                color: selectedBoard.color,
              }}
            >
              {selectedBoard.flag} {selectedBoard.name}
            </button>
          </div>
          {masteredTotal > 0 && (
            <span className="text-xs font-bold" style={{ color: '#6366f1' }}>
              {masteredTotal}/{totalTopics} mastered
            </span>
          )}
        </div>

        {/* Search bar */}
        <div className="relative mb-3">
          <Search size={14} color="rgba(255,255,255,0.25)"
            style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
          <input
            type="search"
            placeholder="Search topics…"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-9 py-2.5 rounded-[14px] text-sm outline-none"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.09)',
              color: 'var(--np-text)',
            }}
          />
          {searchQuery.length > 0 && (
            <button onClick={() => setSearchQuery('')}
              aria-label="Clear search"
              style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)' }}>
              <X size={14} color="rgba(255,255,255,0.3)" />
            </button>
          )}
        </div>

        {/* Filter tabs + exam quick access */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 -mx-1 px-1" style={{ scrollbarWidth: 'none' }}>
          {FILTERS.map(f => {
            const isActive = paperFilter === f.id
            return (
              <motion.button
                key={f.id}
                onClick={() => setPaperFilter(f.id)}
                className="flex items-center gap-1 px-3 rounded-full text-[11px] font-bold shrink-0 whitespace-nowrap"
                style={{
                  height: 36,
                  background: isActive ? `${f.color}20` : 'rgba(255,255,255,0.04)',
                  border: isActive ? `1px solid ${f.color}50` : '1px solid var(--np-border)',
                  color: isActive ? f.color : 'rgba(255,255,255,0.32)',
                  transition: 'all 0.18s ease',
                }}
                whileTap={{ scale: 0.95 }}
              >
                {isActive && <div className="w-1.5 h-1.5 rounded-full" style={{ background: f.color }} />}
                {f.label}
              </motion.button>
            )
          })}

          {/* Equation Drill chip */}
          <motion.button
            onClick={() => navigate('/equation-drill')}
            className="flex items-center gap-1 px-3 rounded-full text-[11px] font-bold shrink-0 whitespace-nowrap"
            style={{
              height: 36,
              background: 'rgba(99,102,241,0.07)',
              border: '1px solid rgba(99,102,241,0.22)',
              color: '#6366f1',
            }}
            whileTap={{ scale: 0.95 }}
          >
            ⚡ Equations
          </motion.button>
        </div>
      </div>

      {/* ── Scrollable body ── */}
      <div className="flex-1 overflow-y-auto px-4 space-y-3" style={{ minHeight: 0, paddingBottom: 'var(--page-bottom-gap)' }}>

        {/* ── Search results ── */}
        {isSearching && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
            {searchResults.length === 0 ? (
              <div className="py-10 text-center">
                <div className="text-2xl mb-2">🔍</div>
                <p className="text-sm" style={{ color: 'rgba(255,255,255,0.35)' }}>No topics match "{searchQuery}"</p>
              </div>
            ) : (
              <>
                <p className="text-xs font-semibold px-1" style={{ color: 'rgba(255,255,255,0.3)' }}>
                  {searchResults.length} topic{searchResults.length !== 1 ? 's' : ''} found
                </p>
                {searchResults.map(({ id, topic, module: mod }, i) => {
                  const state = progress[id]?.mastered ? 'mastered' : progress[id]?.started ? 'started' : 'untouched'
                  return (
                    <motion.button
                      key={id}
                      className="w-full flex items-center gap-3 px-4 py-3.5 rounded-[16px] text-left"
                      style={{
                        background: 'var(--np-card)',
                        border: `1px solid ${state === 'mastered' ? mod.color + '45' : 'rgba(255,255,255,0.13)'}`,
                        borderRadius: 18,
                        minHeight: 56,
                      }}
                      onClick={() => {
                        if (topic.hook || (topic.lessonSteps && topic.lessonSteps.length > 0)) navigate(`/lesson/${id}`)
                        else if (topic.practicalId) navigate(`/practical/${topic.practicalId}`)
                        else navigate(`/practice/${id}`)
                      }}
                      whileTap={{ scale: 0.97 }}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04 }}
                    >
                      <div className="w-9 h-9 rounded-[12px] flex items-center justify-center shrink-0"
                        style={{ background: `${mod.color}20`, border: `1px solid ${mod.color}35` }}>
                        <mod.icon size={17} color={mod.color} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-bold" style={{ color: 'var(--np-text)' }}>{topic.title}</div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <div className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>{mod.name}</div>
                          {PHYSICS_ONLY_TOPICS.has(id) ? (
                            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full"
                              style={{ background: 'rgba(232,121,249,0.12)', color: '#e879f9', border: '1px solid rgba(232,121,249,0.3)' }}>
                              Physics
                            </span>
                          ) : (
                            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full"
                              style={{ background: 'rgba(99,102,241,0.10)', color: '#818cf8', border: '1px solid rgba(99,102,241,0.25)' }}>
                              Combined
                            </span>
                          )}
                        </div>
                      </div>
                      {state === 'mastered' && (
                        <CheckCircle2 size={16} color={mod.color} />
                      )}
                      {state === 'started' && (
                        <Zap size={14} color="#fbbf24" />
                      )}
                    </motion.button>
                  )
                })}
              </>
            )}
          </motion.div>
        )}

        {/* ── Normal content (hidden while searching) ── */}
        {!isSearching && <>

        {/* ── Next milestone (inline, compact) ── */}
        {nextBadge && (
          <motion.div
            className="rounded-[22px] px-4 py-3.5 flex items-center gap-3"
            style={{ background: `${nextBadge.color}0d`, border: `1px solid ${nextBadge.color}25` }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <span style={{ fontSize: 22 }}>{nextBadge.emoji}</span>
            <div className="flex-1 min-w-0">
              <span className="text-[12px] font-semibold" style={{ color: nextBadge.color }}>
                Next milestone
              </span>
              <div className="text-sm font-bold" style={{ color: 'var(--np-text)' }}>{nextBadge.label}</div>
              <div className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>{nextBadge.hint}</div>
            </div>
            <Star size={15} color={nextBadge.color} strokeWidth={1.5} />
          </motion.div>
        )}

        {/* ── Start here CTA (new users) ── */}
        <AnimatePresence>
          {isNewUser && firstTopic && firstModule && (
            <motion.button
              key="start-here"
              className="w-full rounded-[20px] flex items-center justify-between px-5"
              style={{
                paddingTop: 18, paddingBottom: 18,
                background: `linear-gradient(135deg, ${firstModule.color}d0, ${firstModule.color}70)`,
                boxShadow: `0 6px 0 rgba(0,0,0,0.2), 0 12px 32px ${firstModule.color}28`,
              }}
              onClick={() => {
                const t = TOPICS[firstUnmastered]
                if (t?.hook || (t?.lessonSteps && t.lessonSteps.length > 0)) navigate(`/lesson/${firstUnmastered}`)
                else navigate(`/practice/${firstUnmastered}`)
              }}
              whileTap={{ y: 3, boxShadow: 'none' }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-3">
                <div className="rounded-[12px] flex items-center justify-center shrink-0"
                  style={{ width: 44, height: 44, background: 'rgba(255,255,255,0.18)' }}>
                  <firstModule.icon size={22} color="#fff" strokeWidth={1.8} />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-white opacity-75 mb-0.5" style={{ fontSize: 12 }}>
                    Start here
                  </div>
                  <div className="font-bold text-white" style={{ fontSize: 16, letterSpacing: '-0.02em' }}>
                    {firstTopic.title}
                  </div>
                  <div className="text-white opacity-60 mt-0.5" style={{ fontSize: 12 }}>
                    {firstModule.name} · 5 min
                  </div>
                </div>
              </div>
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              >
                <ArrowRight size={22} color="rgba(255,255,255,0.85)" strokeWidth={2.5} />
              </motion.div>
            </motion.button>
          )}
        </AnimatePresence>

        {/* ── Module cards ── */}
        <AnimatePresence mode="popLayout">
          {filteredModules.map((module, i) => (
            <motion.div
              key={module.name}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.16 }}
            >
              <ModuleCard
                module={module}
                moduleIndex={i}
                progress={progress}
                expanded={openModules.includes(module.name)}
                onToggle={() => toggleModule(module.name)}
                selectedBoard={selectedBoard}
                selectedCourse={selectedCourse}
              />
            </motion.div>
          ))}
        </AnimatePresence>

        {/* ── Exam practice section ── */}
        {paperFilter === 'all' && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="pt-2 space-y-2.5"
          >
            <div className="px-1 mb-1">
              <span className="text-sm font-bold"
                style={{ color: 'rgba(255,255,255,0.4)' }}>
                Exam practice
              </span>
            </div>

            <motion.button
              className="w-full rounded-[18px] flex items-center justify-between px-5"
              style={{
                minHeight: 64,
                background: 'linear-gradient(135deg, rgba(168,85,247,0.18), rgba(99,102,241,0.14))',
                border: '1px solid rgba(168,85,247,0.35)',
              }}
              onClick={() => navigate('/grade9')}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center shrink-0"
                  style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(168,85,247,0.15)', border: '1px solid rgba(168,85,247,0.3)' }}>
                  <Trophy size={18} color="#a855f7" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold" style={{ color: 'var(--np-text)' }}>{topGradeLabel} Challenge</p>
                  <p className="text-xs mt-0.5" style={{ color: '#a855f7' }}>Hard exam questions · Unusual scenarios</p>
                </div>
              </div>
              <ChevronRight size={18} color="rgba(168,85,247,0.6)" />
            </motion.button>

            <motion.button
              className="w-full rounded-[18px] flex items-center justify-between px-5"
              style={{
                minHeight: 64,
                background: 'rgba(99,102,241,0.1)',
                border: '0.75px solid rgba(99,102,241,0.28)',
              }}
              onClick={() => navigate('/timed-paper')}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center shrink-0"
                  style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.3)' }}>
                  <Clock size={18} color="#6366f1" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold" style={{ color: 'var(--np-text)' }}>Timed paper</p>
                  <p className="text-xs mt-0.5" style={{ color: '#818cf8' }}>Exam-style 35 marks · 55 minutes</p>
                </div>
              </div>
              <ChevronRight size={18} color="rgba(99,102,241,0.5)" />
            </motion.button>
          </motion.div>
        )}

        </> /* end !isSearching */}

      </div>
    </div>
  )
}
