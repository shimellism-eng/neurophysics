import { motion, AnimatePresence } from 'motion/react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { CaretDown, CaretUp } from '@phosphor-icons/react'
import { MODULES, TOPICS, PHYSICS_ONLY_TOPICS } from '../data/topics'
import { useProgress } from '../hooks/useProgress'
import { getSelectedBoard, isAvailableForBoard, getSelectedCourse } from '../utils/boardConfig'

const BODY  = "'Atkinson Hyperlegible', sans-serif"
const INDIGO = '#6366f1'
const MUTED  = 'rgba(255,255,255,0.36)'
const WHITE  = '#f1f5f9'

// ── Sub-topic row ─────────────────────────────────────────────────────────────

function TopicRow({ topic, masteryState, isLast, onTap }) {
  const isMastered = masteryState === 'mastered'
  const isStarted  = masteryState === 'started'
  const ctaText    = isMastered ? 'Review' : isStarted ? 'Continue' : 'Start'

  return (
    <button
      type="button"
      onClick={onTap}
      className="w-full flex items-center text-left"
      style={{
        paddingTop: 13,
        paddingBottom: 13,
        paddingLeft: 54,
        paddingRight: 16,
        background: 'transparent',
        borderBottom: isLast ? 'none' : '1px solid rgba(255,255,255,0.05)',
        minHeight: 48,
      }}
    >
      <div
        className="shrink-0 rounded-full"
        style={{
          width: 8,
          height: 8,
          marginRight: 14,
          background: isMastered ? INDIGO : isStarted ? 'rgba(99,102,241,0.45)' : 'rgba(255,255,255,0.14)',
        }}
      />
      <span
        className="flex-1 leading-snug"
        style={{ fontFamily: BODY, fontSize: 15, fontWeight: 500, color: isMastered ? 'rgba(255,255,255,0.42)' : WHITE }}
      >
        {topic.title}
      </span>
      <span
        style={{ fontFamily: BODY, fontSize: 12, fontWeight: 600, color: isStarted ? INDIGO : MUTED, marginLeft: 12, flexShrink: 0 }}
      >
        {ctaText}
      </span>
    </button>
  )
}

// ── Module row ────────────────────────────────────────────────────────────────

function ModuleRow({ module, moduleIndex, progress, expanded, onToggle, selectedBoard, selectedCourse }) {
  const navigate = useNavigate()

  const visibleTopics = module.topics.filter(id => {
    const t = TOPICS[id]
    if (!t) return false
    if (t.boards && t.boards.length > 0 && !t.boards.includes(selectedBoard.id)) return false
    if (selectedCourse === 'combined' && PHYSICS_ONLY_TOPICS.has(id)) return false
    return true
  })

  const masteredCount = visibleTopics.filter(id => progress[id]?.mastered).length
  const totalCount    = visibleTopics.length
  const pct           = totalCount > 0 ? (masteredCount / totalCount) * 100 : 0

  const getState = (id) => {
    if (progress[id]?.mastered) return 'mastered'
    if (progress[id]?.started)  return 'started'
    return 'untouched'
  }

  const handleTopicTap = (topicId) => {
    const t = TOPICS[topicId]
    if (!t) return
    if (t.hook || (t.lessonSteps && t.lessonSteps.length > 0)) navigate(`/lesson/${topicId}`)
    else if (t.practicalId) navigate(`/practical/${t.practicalId}`)
    else navigate(`/practice/${topicId}`)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: moduleIndex * 0.04, duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Module header row */}
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center text-left"
        style={{ background: 'transparent', paddingLeft: 16, paddingRight: 16, minHeight: 44 }}
      >
        <div
          className="flex items-center justify-center shrink-0"
          style={{ width: 40, height: 40, borderRadius: '50%', background: `${module.color}1e`, marginRight: 14 }}
        >
          <module.icon size={20} color={module.color} />
        </div>

        <div className="flex-1 min-w-0">
          <div style={{ fontFamily: BODY, fontSize: 18, fontWeight: 700, letterSpacing: '-0.01em', color: WHITE, lineHeight: 1.2 }}>
            {module.name}
          </div>
          <div style={{ fontFamily: BODY, fontSize: 13, color: MUTED, marginTop: 3 }}>
            {masteredCount > 0 ? `${masteredCount} of ${totalCount} done` : `${totalCount} topics`}
          </div>
        </div>

        <div style={{ marginLeft: 12, flexShrink: 0, color: MUTED }}>
          {expanded ? <CaretUp size={15} /> : <CaretDown size={15} />}
        </div>
      </button>

      {/* Progress bar */}
      <div
        style={{
          marginLeft: 70,
          marginRight: 16,
          marginTop: 10,
          height: 2,
          borderRadius: 99,
          background: 'rgba(255,255,255,0.06)',
          overflow: 'hidden',
        }}
      >
        <motion.div
          style={{ height: '100%', borderRadius: 99, background: INDIGO }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1, delay: moduleIndex * 0.05, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      {/* Expanded topic list */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="topics"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ marginTop: 10 }}>
              {visibleTopics.map((topicId, i) => {
                const topic = TOPICS[topicId]
                if (!topic) return null
                return (
                  <TopicRow
                    key={topicId}
                    topic={topic}
                    masteryState={getState(topicId)}
                    isLast={i === visibleTopics.length - 1}
                    onTap={() => handleTopicTap(topicId)}
                  />
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ── Screen ────────────────────────────────────────────────────────────────────

export default function LearnScreen() {
  const { progress } = useProgress()
  const [selectedBoard, setSelectedBoard] = useState(() => getSelectedBoard())
  const [selectedCourse, setSelectedCourse] = useState(() => getSelectedCourse())

  useEffect(() => {
    const sync = () => {
      setSelectedBoard(getSelectedBoard())
      setSelectedCourse(getSelectedCourse())
    }
    window.addEventListener('storage', sync)
    window.addEventListener('focus', sync)
    return () => {
      window.removeEventListener('storage', sync)
      window.removeEventListener('focus', sync)
    }
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
    } catch {
      return []
    }
  })

  const toggleModule = (name) => {
    setOpenModules(prev => {
      const next = prev.includes(name) ? prev.filter(x => x !== name) : [...prev, name]
      sessionStorage.setItem('np_open_modules', JSON.stringify(next))
      return next
    })
  }

  return (
    <div className="flex flex-col h-full overflow-hidden" style={{ background: 'var(--np-bg)' }}>
      <div className="flex-1 overflow-y-auto" style={{ minHeight: 0, paddingBottom: 'var(--page-bottom-gap)' }}>

        {/* Heading */}
        <div style={{ padding: '28px 16px 32px' }}>
          <h1
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontSize: 28,
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              color: WHITE,
            }}
          >
            GCSE Physics
          </h1>
        </div>

        {/* Module list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28, paddingBottom: 16 }}>
          {boardModules.map((module, i) => (
            <ModuleRow
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

      </div>
    </div>
  )
}
