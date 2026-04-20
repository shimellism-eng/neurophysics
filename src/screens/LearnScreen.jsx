import { motion, AnimatePresence } from 'motion/react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { MODULES, TOPICS, PHYSICS_ONLY_TOPICS } from '../data/topics'
import { useProgress } from '../hooks/useProgress'
import { getSelectedBoard, isAvailableForBoard, getSelectedCourse } from '../utils/boardConfig'

const BODY = "'Atkinson Hyperlegible', sans-serif"
const HEAD = "'Bricolage Grotesque', sans-serif"

// ── Mastery ring (Khan Academy style) ─────────────────────────────────────────

function Ring({ pct, color, size = 40 }) {
  const stroke = 3.5
  const r      = (size - stroke * 2) / 2
  const circ   = 2 * Math.PI * r
  const dash   = (pct / 100) * circ

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true" style={{ flexShrink: 0 }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth={stroke} />
      {pct > 0 && (
        <circle
          cx={size / 2} cy={size / 2} r={r} fill="none"
          stroke={color} strokeWidth={stroke} strokeLinecap="round"
          strokeDasharray={`${dash} ${circ}`}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ transition: 'stroke-dasharray 0.9s cubic-bezier(0.16,1,0.3,1)' }}
        />
      )}
      {pct > 0 && (
        <text
          x={size / 2} y={size / 2}
          textAnchor="middle" dominantBaseline="central"
          fontSize={pct === 100 ? 12 : 9} fontWeight={700}
          fill={color}
        >
          {pct === 100 ? '✓' : `${Math.round(pct)}%`}
        </text>
      )}
    </svg>
  )
}

// ── Topic row ─────────────────────────────────────────────────────────────────

function TopicRow({ topic, masteryState, moduleColor, isLast, onTap }) {
  const isMastered = masteryState === 'mastered'
  const isStarted  = masteryState === 'started'

  return (
    <button
      type="button"
      onClick={onTap}
      className="w-full flex items-center text-left"
      style={{
        minHeight: 48,
        paddingTop: 13,
        paddingBottom: 13,
        paddingLeft: 20,
        paddingRight: 16,
        background: 'transparent',
        borderBottom: isLast ? 'none' : '1px solid rgba(255,255,255,0.05)',
      }}
    >
      {/* State dot */}
      <div
        style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          flexShrink: 0,
          marginRight: 14,
          background: isMastered ? moduleColor
            : isStarted ? `${moduleColor}80`
            : 'rgba(255,255,255,0.14)',
        }}
      />

      {/* Topic name — wraps naturally */}
      <span
        className="flex-1 leading-snug"
        style={{ fontFamily: BODY, fontSize: 15, fontWeight: 500, color: isMastered ? 'rgba(255,255,255,0.42)' : '#f1f5f9' }}
      >
        {topic.title}
      </span>

      {/* Status */}
      <span
        style={{
          fontFamily: BODY,
          fontSize: 12,
          fontWeight: 600,
          marginLeft: 12,
          flexShrink: 0,
          color: isMastered ? '#22c55e' : isStarted ? '#6366f1' : 'rgba(255,255,255,0.28)',
        }}
      >
        {isMastered ? 'Review' : isStarted ? 'Continue' : 'Start'}
      </span>
    </button>
  )
}

// ── Module card ───────────────────────────────────────────────────────────────

function ModuleCard({ module, moduleIndex, progress, expanded, onToggle, selectedBoard, selectedCourse }) {
  const navigate = useNavigate()

  const visibleTopics = module.topics.filter(id => {
    const t = TOPICS[id]
    if (!t) return false
    if (t.boards?.length > 0 && !t.boards.includes(selectedBoard.id)) return false
    if (selectedCourse === 'combined' && PHYSICS_ONLY_TOPICS.has(id)) return false
    return true
  })

  const masteredCount = visibleTopics.filter(id => progress[id]?.mastered).length
  const startedCount  = visibleTopics.filter(id => progress[id]?.started && !progress[id]?.mastered).length
  const totalCount    = visibleTopics.length
  const pct           = totalCount > 0 ? (masteredCount / totalCount) * 100 : 0

  const getState = id => {
    if (progress[id]?.mastered) return 'mastered'
    if (progress[id]?.started)  return 'started'
    return 'untouched'
  }

  const handleTopicTap = topicId => {
    const t = TOPICS[topicId]
    if (!t) return
    if (t.hook || t.lessonSteps?.length > 0) navigate(`/lesson/${topicId}`)
    else if (t.practicalId) navigate(`/practical/${t.practicalId}`)
    else navigate(`/practice/${topicId}`)
  }

  return (
    <motion.div
      className="rounded-[20px] overflow-hidden"
      style={{ background: `${module.color}0f`, border: '1px solid rgba(255,255,255,0.06)' }}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: moduleIndex * 0.04, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* ── Card header ── */}
      <button
        type="button"
        onClick={onToggle}
        className="w-full text-left"
        style={{ padding: '16px 16px 0', background: 'transparent' }}
        aria-expanded={expanded}
      >
        <div className="flex items-center gap-3">
          {/* Icon circle */}
          <div
            className="flex items-center justify-center shrink-0 rounded-full"
            style={{ width: 48, height: 48, background: `${module.color}22` }}
          >
            <module.icon size={22} color={module.color} />
          </div>

          {/* Name + count */}
          <div className="flex-1 min-w-0">
            <div style={{ fontFamily: BODY, fontSize: 17, fontWeight: 700, letterSpacing: '-0.01em', color: '#f1f5f9', lineHeight: 1.2 }}>
              {module.name}
            </div>
            <div style={{ fontFamily: BODY, fontSize: 13, color: 'rgba(255,255,255,0.38)', marginTop: 3 }}>
              {masteredCount > 0
                ? `${masteredCount} of ${totalCount} completed`
                : startedCount > 0
                  ? `${startedCount} in progress`
                  : `${totalCount} topics`}
            </div>
          </div>

          {/* Mastery ring */}
          <Ring pct={pct} color={module.color} size={40} />
        </div>

        {/* Progress bar */}
        <div style={{ height: 2, borderRadius: 99, background: 'rgba(255,255,255,0.07)', overflow: 'hidden', margin: '14px 0' }}>
          <motion.div
            style={{ height: '100%', borderRadius: 99, background: module.color }}
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 1, delay: moduleIndex * 0.05, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      </button>

      {/* ── Expanded content ── */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="expanded"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', margin: '0 16px' }} />

            {visibleTopics.map((topicId, i) => {
              const topic = TOPICS[topicId]
              if (!topic) return null
              return (
                <TopicRow
                  key={topicId}
                  topic={topic}
                  masteryState={getState(topicId)}
                  moduleColor={module.color}
                  isLast={i === visibleTopics.length - 1}
                  onTap={() => handleTopicTap(topicId)}
                />
              )
            })}

            {/* Practice + Exam buttons */}
            <div style={{ padding: '12px 16px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
              <button
                type="button"
                onClick={() => { const first = visibleTopics[0]; if (first) navigate(`/practice/${first}`) }}
                style={{
                  width: '100%', minHeight: 44, background: 'transparent',
                  border: '1px solid rgba(99,102,241,0.4)', borderRadius: 12,
                  fontFamily: BODY, fontSize: 14, fontWeight: 600, color: '#818cf8', cursor: 'pointer',
                }}
              >
                Practice questions
              </button>
              <button
                type="button"
                onClick={() => navigate('/timed-paper')}
                style={{
                  width: '100%', minHeight: 44, background: 'transparent',
                  border: '1px solid rgba(99,102,241,0.3)', borderRadius: 12,
                  fontFamily: BODY, fontSize: 14, fontWeight: 600, color: '#818cf8', cursor: 'pointer',
                }}
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

// ── Screen ────────────────────────────────────────────────────────────────────

export default function LearnScreen() {
  const navigate                            = useNavigate()
  const { progress }                        = useProgress()
  const [selectedBoard, setSelectedBoard]   = useState(() => getSelectedBoard())
  const [selectedCourse, setSelectedCourse] = useState(() => getSelectedCourse())

  useEffect(() => {
    const sync = () => { setSelectedBoard(getSelectedBoard()); setSelectedCourse(getSelectedCourse()) }
    window.addEventListener('storage', sync)
    window.addEventListener('focus', sync)
    return () => { window.removeEventListener('storage', sync); window.removeEventListener('focus', sync) }
  }, [])

  const boardModules = MODULES.filter(m => {
    if (!isAvailableForBoard(m.boards, selectedBoard.id)) return false
    if (selectedCourse === 'combined' && m.topics.every(t => PHYSICS_ONLY_TOPICS.has(t))) return false
    return true
  })

  const [openModules, setOpenModules] = useState(() => {
    try {
      const saved = sessionStorage.getItem('np_open_modules')
      return saved ? JSON.parse(saved) : [boardModules[0]?.name].filter(Boolean)
    } catch { return [] }
  })

  const toggleModule = name => {
    setOpenModules(prev => {
      const next = prev.includes(name) ? prev.filter(x => x !== name) : [...prev, name]
      sessionStorage.setItem('np_open_modules', JSON.stringify(next))
      return next
    })
  }

  const totalTopics   = boardModules.flatMap(m => m.topics).filter(id => TOPICS[id]).length
  const masteredTotal = Object.values(progress).filter(p => p?.mastered).length
  const overallPct    = totalTopics > 0 ? (masteredTotal / totalTopics) * 100 : 0

  return (
    <div className="flex flex-col h-full overflow-hidden" style={{ background: 'var(--np-bg)' }}>
      <div className="flex-1 overflow-y-auto" style={{ minHeight: 0, paddingBottom: 'var(--page-bottom-gap)' }}>

        {/* ── Heading area ── */}
        <div style={{ padding: '28px 16px 20px' }}>
          <h1 style={{ fontFamily: HEAD, fontSize: 28, fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, color: '#f1f5f9', marginBottom: 16 }}>
            GCSE Physics
          </h1>

          {/* Overall progress bar */}
          <div style={{ height: 2, borderRadius: 99, background: 'rgba(255,255,255,0.07)', overflow: 'hidden', marginBottom: 10 }}>
            <motion.div
              style={{ height: '100%', borderRadius: 99, background: '#6366f1' }}
              initial={{ width: 0 }}
              animate={{ width: `${overallPct}%` }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>

          {/* Board label — tiny, muted, tappable to go to settings */}
          <button
            onClick={() => navigate('/settings')}
            style={{ fontFamily: BODY, fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.24)', background: 'transparent', padding: 0 }}
          >
            {selectedBoard.flag} {selectedBoard.name}
          </button>
        </div>

        {/* ── Module cards ── */}
        <div style={{ padding: '0 12px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {boardModules.map((module, i) => (
            <ModuleCard
              key={module.name}
              module={module}
              moduleIndex={i}
              progress={progress}
              expanded={openModules.includes(module.name)}
              onToggle={() => toggleModule(module.name)}
              selectedBoard={selectedBoard}
              selectedCourse={selectedCourse}
            />
          ))}
        </div>

        {/* ── Quick Win ── */}
        <div style={{ textAlign: 'center', padding: '28px 16px 8px' }}>
          <button
            onClick={() => navigate('/quickwin')}
            style={{ fontFamily: BODY, fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.28)', background: 'transparent', padding: '8px 0' }}
          >
            Quick Win · 5 questions
          </button>
        </div>

      </div>
    </div>
  )
}
