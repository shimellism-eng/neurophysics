/**
 * SpecChecklist — Specification topic completion tracker
 * Shows all modules and topics with mastery status, board-filtered.
 */
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { ChevronLeft, ChevronDown, ChevronRight, CheckCircle2, Circle } from 'lucide-react'
import { MODULES, TOPICS } from '../data/topics'
import { getSelectedBoard } from '../utils/boardConfig'

// ─── Helper: topic has lesson content ────────────────────────────────────────
function hasLesson(topic) {
  return !!(topic.hook || (topic.lessonSteps && topic.lessonSteps.length > 0))
}

// ─── Status indicator ─────────────────────────────────────────────────────────
function StatusDot({ mastered, started }) {
  if (mastered) {
    return <CheckCircle2 size={20} color="#4ade80" strokeWidth={2} />
  }
  if (started) {
    return (
      <div
        className="rounded-full"
        style={{ width: 16, height: 16, background: '#f97316', boxShadow: '0 0 8px rgba(249,115,22,0.5)' }}
      />
    )
  }
  return <Circle size={18} color="rgba(255,255,255,0.2)" strokeWidth={1.5} />
}

// ─── Module section ───────────────────────────────────────────────────────────
function ModuleSection({ module, topics, progress, boardId }) {
  const [open, setOpen] = useState(true)

  // Filter topics that exist and belong to this board
  const validTopics = topics.filter(t => {
    if (!t) return false
    // If topic has a boards restriction, check it
    if (t.boards && t.boards.length > 0) {
      return t.boards.includes(boardId)
    }
    return true
  })

  if (validTopics.length === 0) return null

  const masteredCount = validTopics.filter(t => progress[t.id]?.mastered).length
  const startedCount = validTopics.filter(t => progress[t.id]?.started && !progress[t.id]?.mastered).length
  const total = validTopics.length

  const navigate = useNavigate()

  const handleTopicTap = (topic) => {
    if (hasLesson(topic)) {
      navigate(`/lesson/${topic.id}`)
    } else {
      navigate(`/practice/${topic.id}`)
    }
  }

  return (
    <motion.div
      className="rounded-[18px] overflow-hidden"
      style={{ border: `1px solid ${module.color}30` }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Module header — tappable to expand/collapse */}
      <button
        className="w-full flex items-center gap-3 px-4 py-3.5 text-left"
        style={{ background: `${module.color}14` }}
        onClick={() => setOpen(o => !o)}
      >
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
          style={{ background: `${module.color}22`, border: `1.5px solid ${module.color}40` }}
        >
          {module.icon && <module.icon size={15} color={module.color} />}
        </div>

        <div className="flex-1 min-w-0">
          <div className="font-display font-bold text-sm leading-tight" style={{ color: '#f8fafc' }}>
            {module.name}
          </div>
          <div className="text-[11px] mt-0.5" style={{ color: `${module.color}cc` }}>
            {masteredCount}/{total} mastered
            {startedCount > 0 && ` · ${startedCount} in progress`}
          </div>
        </div>

        {/* Mini progress bar */}
        <div className="relative rounded-full overflow-hidden shrink-0" style={{ width: 40, height: 6, background: 'rgba(255,255,255,0.1)' }}>
          <div
            className="absolute left-0 top-0 h-full rounded-full"
            style={{
              width: `${(masteredCount / total) * 100}%`,
              background: module.color,
              transition: 'width 0.4s ease',
            }}
          />
        </div>

        <ChevronDown
          size={16}
          color="rgba(255,255,255,0.4)"
          style={{ transform: open ? 'rotate(0deg)' : 'rotate(-90deg)', transition: 'transform 0.25s' }}
        />
      </button>

      {/* Topic rows */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            {validTopics.map((topic, i) => {
              const p = progress[topic.id] || {}
              return (
                <button
                  key={topic.id}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left"
                  style={{
                    background: i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent',
                    borderTop: '0.75px solid rgba(255,255,255,0.05)',
                    minHeight: 52,
                  }}
                  onClick={() => handleTopicTap(topic)}
                >
                  <StatusDot mastered={p.mastered} started={p.started} />

                  <div className="flex-1 min-w-0">
                    <div
                      className="font-display text-sm font-semibold leading-tight truncate"
                      style={{ color: p.mastered ? 'rgba(255,255,255,0.55)' : '#e2e8f0' }}
                    >
                      {topic.emoji && <span className="mr-1.5">{topic.emoji}</span>}
                      {topic.title}
                    </div>
                    {p.score !== undefined && !p.mastered && p.started && (
                      <div className="text-[11px] mt-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>
                        Best score: {Math.round(p.score * 100)}%
                      </div>
                    )}
                  </div>

                  <ChevronRight size={14} color="rgba(255,255,255,0.2)" />
                </button>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ─── Main screen ──────────────────────────────────────────────────────────────
export default function SpecChecklist() {
  const navigate = useNavigate()
  const board = getSelectedBoard()
  const boardId = board.id

  const [progress, setProgress] = useState({})

  useEffect(() => {
    try {
      const raw = localStorage.getItem('neurophysics_progress')
      if (raw) setProgress(JSON.parse(raw))
    } catch {
      setProgress({})
    }
  }, [])

  // Filter modules by board
  const visibleModules = MODULES.filter(mod => {
    if (!mod.boards || mod.boards.length === 0) return true
    return mod.boards.includes(boardId)
  })

  // Build topic list per module, also filter by board
  function getModuleTopics(mod) {
    return mod.topics
      .map(id => TOPICS[id])
      .filter(Boolean)
      .filter(t => {
        if (t.boards && t.boards.length > 0) return t.boards.includes(boardId)
        return true
      })
  }

  // Overall counts
  const allTopics = visibleModules.flatMap(mod => getModuleTopics(mod))
  const totalTopics = allTopics.length
  const masteredTopics = allTopics.filter(t => progress[t.id]?.mastered).length
  const progressPct = totalTopics > 0 ? (masteredTopics / totalTopics) * 100 : 0

  return (
    <div
      className="flex flex-col h-full overflow-y-auto"
      style={{ background: '#080f1e', paddingBottom: 90 }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-3 px-5 pt-5 pb-4 sticky top-0 z-10 shrink-0"
        style={{
          background: 'rgba(8,15,30,0.96)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '0.75px solid rgba(255,255,255,0.07)',
        }}
      >
        <button
          className="w-11 h-11 flex items-center justify-center rounded-[12px] shrink-0"
          style={{ background: 'rgba(255,255,255,0.07)', border: '0.75px solid rgba(255,255,255,0.1)' }}
          onClick={() => navigate(-1)}
          aria-label="Go back"
        >
          <ChevronLeft size={18} color="#a8b8cc" />
        </button>
        <div className="flex-1">
          <h1 className="font-display font-bold text-lg" style={{ color: '#f8fafc', letterSpacing: '-0.02em' }}>
            Spec Checklist
          </h1>
          <div className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
            {board.name} · {masteredTopics} of {totalTopics} mastered
          </div>
        </div>
      </div>

      {/* Overall progress bar */}
      <div className="px-4 py-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Overall progress
          </span>
          <span className="text-xs font-bold" style={{ color: '#00d4ff' }}>
            {Math.round(progressPct)}%
          </span>
        </div>
        <div
          className="relative rounded-full overflow-hidden"
          style={{ height: 8, background: 'rgba(255,255,255,0.08)' }}
        >
          <motion.div
            className="absolute left-0 top-0 h-full rounded-full"
            style={{ background: 'linear-gradient(90deg, #00d4ff, #9b59b6)' }}
            initial={{ width: 0 }}
            animate={{ width: `${progressPct}%` }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          />
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 mt-3">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 size={13} color="#4ade80" />
            <span className="text-[11px]" style={{ color: 'rgba(255,255,255,0.4)' }}>Mastered</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="rounded-full" style={{ width: 11, height: 11, background: '#f97316' }} />
            <span className="text-[11px]" style={{ color: 'rgba(255,255,255,0.4)' }}>In progress</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Circle size={13} color="rgba(255,255,255,0.2)" />
            <span className="text-[11px]" style={{ color: 'rgba(255,255,255,0.4)' }}>Not started</span>
          </div>
        </div>
      </div>

      {/* Module sections */}
      <div className="px-4 flex flex-col gap-3">
        {visibleModules.map((mod, i) => (
          <motion.div
            key={mod.name}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <ModuleSection
              module={mod}
              topics={getModuleTopics(mod)}
              progress={progress}
              boardId={boardId}
            />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
