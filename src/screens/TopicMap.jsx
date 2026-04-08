import { motion, AnimatePresence } from 'motion/react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle, Zap, Circle } from 'lucide-react'
import { MODULES, TOPICS } from '../data/topics'
import { useProgress } from '../hooks/useProgress'

// ─── Circular progress ring ─────────────────────────────────────────────────

function ProgressRing({ pct, color, size = 56 }) {
  const r = (size - 8) / 2        // radius, 4px inset each side
  const circ = 2 * Math.PI * r
  const dash = (pct / 100) * circ

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ flexShrink: 0 }}>
      {/* Track */}
      <circle
        cx={size / 2} cy={size / 2} r={r}
        fill="none"
        stroke="#1d293d"
        strokeWidth={4}
      />
      {/* Progress arc */}
      <circle
        cx={size / 2} cy={size / 2} r={r}
        fill="none"
        stroke={color}
        strokeWidth={4}
        strokeLinecap="round"
        strokeDasharray={`${dash} ${circ}`}
        strokeDashoffset={0}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{ transition: 'stroke-dasharray 0.8s ease' }}
      />
      {/* Percentage label */}
      <text
        x={size / 2} y={size / 2}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={pct === 100 ? 10 : 11}
        fontWeight={700}
        fill={pct > 0 ? color : '#4a5a72'}
      >
        {Math.round(pct)}%
      </text>
    </svg>
  )
}

// ─── Topic tile ──────────────────────────────────────────────────────────────

function TopicTile({ topicId, topic, moduleColor, masteryState, masteryPct, index, onTap }) {
  const isMastered = masteryState === 'mastered'
  const isStarted  = masteryState === 'started'

  const bg = isMastered
    ? `${moduleColor}15`
    : isStarted
      ? 'rgba(18,26,47,0.95)'
      : 'rgba(14,20,36,0.9)'

  const border = isMastered
    ? `0.75px solid ${moduleColor}50`
    : '0.75px solid #1d293d'

  return (
    <motion.button
      className="w-full text-left p-3 rounded-[14px] flex flex-col gap-1.5"
      style={{ background: bg, border }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.04, duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      whileTap={{ scale: 0.97 }}
      onClick={onTap}
    >
      {/* Row: status icon + title */}
      <div className="flex items-center gap-2">
        {/* Status indicator */}
        <div className="shrink-0">
          {isMastered ? (
            <div
              className="w-5 h-5 rounded-full flex items-center justify-center"
              style={{ background: '#22c55e' }}
            >
              <CheckCircle size={12} color="#fff" strokeWidth={3} />
            </div>
          ) : isStarted ? (
            <div
              className="w-5 h-5 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(251,191,36,0.2)', border: '1.5px solid #fbbf24' }}
            >
              <Zap size={10} color="#fbbf24" strokeWidth={2.5} />
            </div>
          ) : (
            <div
              className="w-5 h-5 rounded-full flex items-center justify-center"
              style={{ border: '1.5px solid #2d3d55' }}
            >
              <Circle size={8} color="#4a5a72" strokeWidth={2} />
            </div>
          )}
        </div>

        {/* Topic title */}
        <span
          className="text-xs font-medium truncate leading-tight"
          style={{ color: '#cad5e2' }}
        >
          {topic.title}
        </span>
      </div>

      {/* Mastery progress bar */}
      <div className="h-[3px] rounded-full" style={{ background: '#1d293d' }}>
        <div
          className="h-full rounded-full"
          style={{
            background: moduleColor,
            width: `${masteryPct}%`,
            transition: 'width 0.6s ease',
          }}
        />
      </div>
    </motion.button>
  )
}

// ─── Module card ─────────────────────────────────────────────────────────────

function ModuleCard({ module, moduleIndex, progress }) {
  const navigate = useNavigate()
  const [expanded, setExpanded] = useState(moduleIndex === 0)

  const masteredCount = module.topics.filter(t => progress[t]?.mastered).length
  const startedCount  = module.topics.filter(t => progress[t]?.started && !progress[t]?.mastered).length
  const totalTopics   = module.topics.length
  const pct           = totalTopics > 0 ? (masteredCount / totalTopics) * 100 : 0
  const barPct        = pct

  const getState = (id) => {
    if (progress[id]?.mastered) return 'mastered'
    if (progress[id]?.started)  return 'started'
    return 'untouched'
  }

  const getMasteryPct = (id) => {
    if (progress[id]?.mastered) return 100
    if (progress[id]?.started)  return 40
    return 0
  }

  return (
    <motion.div
      className="rounded-[24px] overflow-hidden"
      style={{
        background: 'rgba(18,26,47,0.9)',
        borderTop: `0.75px solid ${expanded ? module.color + '40' : '#1d293d'}`,
        borderRight: `0.75px solid ${expanded ? module.color + '40' : '#1d293d'}`,
        borderBottom: `0.75px solid ${expanded ? module.color + '40' : '#1d293d'}`,
        borderLeft: `4px solid ${module.color}`,
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: moduleIndex * 0.07, duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* ── Card header (always visible) ── */}
      <button
        className="w-full flex items-center gap-4 px-4 pt-4 pb-3"
        onClick={() => setExpanded(prev => !prev)}
        style={{ background: expanded ? `${module.color}08` : 'transparent' }}
      >
        {/* Module icon */}
        <div
          className="w-10 h-10 rounded-[14px] flex items-center justify-center shrink-0"
          style={{
            background: `${module.color}20`,
            border: `1px solid ${module.color}40`,
          }}
        >
          <module.icon size={20} color={module.color} strokeWidth={2} />
        </div>

        {/* Module info */}
        <div className="flex-1 text-left min-w-0">
          <div className="text-base font-bold leading-tight truncate" style={{ color: '#f8fafc' }}>
            {module.name}
          </div>
          <div className="text-xs mt-0.5" style={{ color: '#a8b8cc' }}>
            {totalTopics} topics
            {masteredCount > 0 && (
              <span style={{ color: module.color }}> · {masteredCount} mastered</span>
            )}
            {startedCount > 0 && (
              <span style={{ color: '#a8b8cc' }}> · {startedCount} in progress</span>
            )}
          </div>
        </div>

        {/* Circular progress ring */}
        <ProgressRing pct={pct} color={module.color} size={56} />
      </button>

      {/* ── Bottom progress bar (always visible) ── */}
      <div className="px-4 pb-4">
        <div className="h-[3px] rounded-full" style={{ background: '#1d293d' }}>
          <motion.div
            className="h-full rounded-full"
            style={{ background: module.color }}
            initial={{ width: 0 }}
            animate={{ width: `${barPct}%` }}
            transition={{ duration: 0.9, delay: moduleIndex * 0.08, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      </div>

      {/* ── Expanded topic grid ── */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="topics"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            {/* Divider */}
            <div className="mx-4 mb-3 h-px" style={{ background: `${module.color}25` }} />

            <div className="px-3 pb-4 grid grid-cols-2 gap-2">
              {module.topics.map((topicId, i) => {
                const topic = TOPICS[topicId]
                if (!topic) return null
                return (
                  <TopicTile
                    key={topicId}
                    topicId={topicId}
                    topic={topic}
                    moduleColor={module.color}
                    masteryState={getState(topicId)}
                    masteryPct={getMasteryPct(topicId)}
                    index={i}
                    onTap={() => navigate(`/lesson/${topicId}`)}
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

// ─── Screen ──────────────────────────────────────────────────────────────────

export default function TopicMap() {
  const { progress } = useProgress()

  const totalTopics   = Object.keys(TOPICS).length
  const masteredTotal = Object.values(progress).filter(p => p?.mastered).length
  const overallPct    = totalTopics > 0 ? Math.round((masteredTotal / totalTopics) * 100) : 0

  return (
    <div className="flex flex-col h-full overflow-hidden" style={{ background: '#0b1121' }}>

      {/* ── Header ── */}
      <div className="px-5 pt-6 pb-4 shrink-0">
        <h1 className="text-2xl font-bold" style={{ color: '#f8fafc' }}>GCSE Physics</h1>
        <p className="text-sm leading-relaxed mt-1" style={{ color: '#cad5e2' }}>
          {totalTopics} topics
          <span style={{ color: '#4a5a72' }}> · </span>
          {MODULES.length} modules
          {overallPct > 0 && (
            <>
              <span style={{ color: '#4a5a72' }}> · </span>
              <span style={{ color: '#22c55e', fontWeight: 600 }}>{overallPct}% mastered</span>
            </>
          )}
        </p>
      </div>

      {/* ── Scrollable module cards ── */}
      <div className="flex-1 overflow-y-auto px-4 pb-8 space-y-3">
        {MODULES.map((module, i) => (
          <ModuleCard
            key={module.name}
            module={module}
            moduleIndex={i}
            progress={progress}
          />
        ))}
      </div>

    </div>
  )
}
