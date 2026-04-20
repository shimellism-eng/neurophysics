import { motion, AnimatePresence } from 'motion/react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { CaretDown, CaretUp, ArrowRight, Trophy, Clock, CaretRight, MagnifyingGlass, X } from '@phosphor-icons/react'
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
        background: 'rgba(99,102,241,0.06)',
        border: '1px solid rgba(99,102,241,0.1)',
        borderRadius: 12,
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
        className="w-2 h-2 rounded-full shrink-0"
        style={{ background: isMastered ? moduleColor : isStarted ? '#6366f1' : 'rgba(255,255,255,0.18)' }}
      />

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
        border: '1px solid rgba(255,255,255,0.08)',
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: moduleIndex * 0.05, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      <button className="w-full" onClick={onToggle} style={{ textAlign: 'left' }}>
        <div className="px-4 pt-4 pb-3 flex items-center gap-3">
          <div className="w-11 h-11 rounded-[14px] flex items-center justify-center shrink-0"
            style={{ background: `${module.color}25`, border: `1.5px solid ${module.color}50` }}>
            <module.icon size={22} color={module.color} strokeWidth={2} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <div style={{ fontSize: 16, fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.01em', color: 'var(--np-text)' }}>
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
                ? `${masteredCount} mastered`
                : startedCount > 0
                  ? `${startedCount} started`
                  : `${totalTopics} topics`}
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <ProgressRing pct={pct} color={module.color} size={50} />
            <div className="w-6 h-6 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(255,255,255,0.05)' }}>
              {expanded
                ? <CaretUp size={13} color="rgba(255,255,255,0.4)" />
                : <CaretDown size={13} color="rgba(255,255,255,0.4)" />}
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
  const [searchOpen, setSearchOpen] = useState(false)
  const [filterOpen, setFilterOpen] = useState(false)
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

      {/* ── Header ── */}
      <div className="px-5 shrink-0" style={{ paddingTop: '18px', paddingBottom: '12px' }}>

        {/* Title row */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <button
              onClick={() => navigate('/settings')}
              style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)', display: 'block', marginBottom: 6 }}
            >
              {selectedBoard.flag} {selectedBoard.name}
            </button>
            <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 30, fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, color: 'var(--np-text)' }}>
              GCSE Physics
            </h1>
          </div>
          <button
            onClick={() => { if (searchOpen) setSearchQuery(''); setSearchOpen(v => !v) }}
            className="w-10 h-10 rounded-[12px] flex items-center justify-center shrink-0 mt-1"
            style={{ background: searchOpen ? 'rgba(99,102,241,0.15)' : 'rgba(255,255,255,0.05)', border: `1px solid ${searchOpen ? 'rgba(99,102,241,0.3)' : 'rgba(255,255,255,0.08)'}` }}
            aria-label={searchOpen ? 'Close search' : 'Search topics'}
          >
            {searchOpen ? <X size={16} color="#818cf8" /> : <MagnifyingGlass size={16} color="rgba(255,255,255,0.42)" />}
          </button>
        </div>

        {/* Progress bar */}
        {masteredTotal > 0 && (
          <div className="mb-4 h-[2px] rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: '#6366f1' }}
              initial={{ width: 0 }}
              animate={{ width: `${overallPct}%` }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        )}

        {/* Collapsible search */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              key="search-bar"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              style={{ overflow: 'hidden' }}
            >
              <div className="relative mb-3">
                <MagnifyingGlass size={14} color="rgba(255,255,255,0.25)"
                  style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                <input
                  type="search"
                  placeholder="Search topics…"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full pl-9 pr-9 py-2.5 rounded-[14px] text-sm outline-none"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)', color: 'var(--np-text)' }}
                />
                {searchQuery.length > 0 && (
                  <button onClick={() => setSearchQuery('')} aria-label="Clear search"
                    style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)' }}>
                    <X size={14} color="rgba(255,255,255,0.3)" />
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Filter row — single button + equations */}
        <div className="flex items-center gap-2">
          <motion.button
            onClick={() => setFilterOpen(v => !v)}
            className="flex items-center gap-2 px-3 rounded-full text-[11px] font-bold shrink-0"
            style={{
              height: 34,
              background: paperFilter !== 'all' ? 'rgba(99,102,241,0.15)' : 'rgba(255,255,255,0.04)',
              border: `1px solid ${paperFilter !== 'all' ? 'rgba(99,102,241,0.35)' : 'rgba(255,255,255,0.08)'}`,
              color: paperFilter !== 'all' ? '#818cf8' : 'rgba(255,255,255,0.38)',
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span style={{ display: 'flex', flexDirection: 'column', gap: 2.5, width: 11 }}>
              <span style={{ height: 1.5, background: 'currentColor', borderRadius: 1, display: 'block' }} />
              <span style={{ height: 1.5, background: 'currentColor', borderRadius: 1, display: 'block', width: '70%' }} />
              <span style={{ height: 1.5, background: 'currentColor', borderRadius: 1, display: 'block', width: '40%' }} />
            </span>
            {paperFilter === 'all' ? 'All topics' : FILTERS.find(f => f.id === paperFilter)?.label ?? 'Filter'}
          </motion.button>
          <motion.button
            onClick={() => navigate('/equation-drill')}
            className="flex items-center gap-1 px-3 rounded-full text-[11px] font-bold shrink-0"
            style={{ height: 34, background: 'rgba(99,102,241,0.07)', border: '1px solid rgba(99,102,241,0.2)', color: '#818cf8' }}
            whileTap={{ scale: 0.95 }}
          >
            ⚡ Equations
          </motion.button>
        </div>

        {/* Filter pills — collapsible */}
        <AnimatePresence>
          {filterOpen && (
            <motion.div
              key="filter-pills"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              style={{ overflow: 'hidden' }}
            >
              <div className="flex items-center gap-1.5 pt-2 pb-1 overflow-x-auto -mx-1 px-1" style={{ scrollbarWidth: 'none' }}>
                {FILTERS.map(f => {
                  const isActive = paperFilter === f.id
                  return (
                    <motion.button
                      key={f.id}
                      onClick={() => { setPaperFilter(f.id); setFilterOpen(false) }}
                      className="flex items-center gap-1 px-3 rounded-full text-[11px] font-bold shrink-0 whitespace-nowrap"
                      style={{
                        height: 34,
                        background: isActive ? `${f.color}20` : 'rgba(255,255,255,0.04)',
                        border: isActive ? `1px solid ${f.color}50` : '1px solid rgba(255,255,255,0.08)',
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
              </div>
            </motion.div>
          )}
        </AnimatePresence>

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
                        border: '1px solid rgba(255,255,255,0.09)',
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
                      <span className="text-[11px] font-medium shrink-0" style={{ color: state === 'mastered' ? 'rgba(255,255,255,0.3)' : state === 'started' ? '#818cf8' : 'rgba(255,255,255,0.18)' }}>
                        {state === 'mastered' ? 'Mastered' : state === 'started' ? 'Started' : 'Start'}
                      </span>
                    </motion.button>
                  )
                })}
              </>
            )}
          </motion.div>
        )}

        {/* ── Normal content (hidden while searching) ── */}
        {!isSearching && <>

{/* ── Start here CTA (new users) ── */}
        <AnimatePresence>
          {isNewUser && firstTopic && firstModule && (
            <motion.button
              key="start-here"
              className="w-full rounded-[20px] flex items-center justify-between px-5"
              style={{
                paddingTop: 18, paddingBottom: 18,
                background: 'var(--np-card)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
              onClick={() => {
                const t = TOPICS[firstUnmastered]
                if (t?.hook || (t?.lessonSteps && t.lessonSteps.length > 0)) navigate(`/lesson/${firstUnmastered}`)
                else navigate(`/practice/${firstUnmastered}`)
              }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-3">
                <div className="rounded-[12px] flex items-center justify-center shrink-0"
                  style={{ width: 44, height: 44, background: `${firstModule.color}22`, border: `1px solid ${firstModule.color}40` }}>
                  <firstModule.icon size={22} color={firstModule.color} strokeWidth={1.8} />
                </div>
                <div className="text-left">
                  <div className="font-semibold mb-0.5" style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>
                    Start here
                  </div>
                  <div className="font-bold" style={{ fontSize: 16, letterSpacing: '-0.02em', color: 'var(--np-text)' }}>
                    {firstTopic.title}
                  </div>
                  <div className="mt-0.5" style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>
                    {firstModule.name} · 5 min
                  </div>
                </div>
              </div>
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              >
                <ArrowRight size={22} color="#6366f1" />
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
                background: 'var(--np-card)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
              onClick={() => navigate('/grade9')}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center shrink-0"
                  style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(168,85,247,0.12)', border: '1px solid rgba(168,85,247,0.25)' }}>
                  <Trophy size={18} color="#a855f7" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold" style={{ color: 'var(--np-text)' }}>{topGradeLabel} Challenge</p>
                  <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>Hard exam questions · Unusual scenarios</p>
                </div>
              </div>
              <CaretRight size={18} color="rgba(255,255,255,0.2)" />
            </motion.button>

            <motion.button
              className="w-full rounded-[18px] flex items-center justify-between px-5"
              style={{
                minHeight: 64,
                background: 'var(--np-card)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
              onClick={() => navigate('/timed-paper')}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center shrink-0"
                  style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.25)' }}>
                  <Clock size={18} color="#6366f1" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold" style={{ color: 'var(--np-text)' }}>Timed paper</p>
                  <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>Exam-style 35 marks · 55 minutes</p>
                </div>
              </div>
              <CaretRight size={18} color="rgba(255,255,255,0.2)" />
            </motion.button>
          </motion.div>
        )}

        </> /* end !isSearching */}

      </div>
    </div>
  )
}
