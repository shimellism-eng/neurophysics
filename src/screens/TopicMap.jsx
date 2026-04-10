import { motion, AnimatePresence } from 'motion/react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle2, Zap, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react'
import { MODULES, TOPICS } from '../data/topics'
import { useProgress } from '../hooks/useProgress'

// ─── Circular progress ring ──────────────────────────────────────────────────

function ProgressRing({ pct, color, size = 52 }) {
  const stroke = 4.5
  const r = (size - stroke * 2) / 2
  const circ = 2 * Math.PI * r
  const dash = (pct / 100) * circ
  const hasProgress = pct > 0

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ flexShrink: 0 }}>
      <circle
        cx={size / 2} cy={size / 2} r={r}
        fill="none"
        stroke="rgba(255,255,255,0.07)"
        strokeWidth={stroke}
      />
      {hasProgress && (
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circ}`}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ transition: 'stroke-dasharray 0.9s cubic-bezier(0.16,1,0.3,1)' }}
        />
      )}
      <text
        x={size / 2} y={size / 2}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={hasProgress ? (pct === 100 ? 9 : 10) : 13}
        fontWeight={700}
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
  const isUntouched = masteryState === 'untouched'

  return (
    <motion.button
      className="w-full text-left rounded-[16px] overflow-hidden"
      style={{
        background: isMastered
          ? `linear-gradient(135deg, ${moduleColor}22, ${moduleColor}10)`
          : isStarted
            ? 'rgba(255,255,255,0.05)'
            : 'rgba(255,255,255,0.03)',
        border: isMastered
          ? `1px solid ${moduleColor}45`
          : isStarted
            ? '1px solid rgba(251,191,36,0.3)'
            : '1px solid rgba(255,255,255,0.09)',
        minHeight: 44,
      }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.035, duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      whileTap={{ scale: 0.96 }}
      onClick={onTap}
    >
      {/* Status bar — top edge colour strip */}
      <div
        style={{
          height: 3,
          background: isMastered ? moduleColor : isStarted ? '#fbbf24' : 'transparent',
          opacity: isMastered ? 0.7 : 0.5,
        }}
      />

      <div className="px-3 py-3 flex flex-col gap-2">
        {/* Status icon + badge */}
        <div className="flex items-center justify-between">
          {isMastered ? (
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center"
              style={{ background: `${moduleColor}25`, border: `1.5px solid ${moduleColor}60` }}
            >
              <CheckCircle2 size={13} color={moduleColor} strokeWidth={2.5} />
            </div>
          ) : isStarted ? (
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(251,191,36,0.15)', border: '1.5px solid rgba(251,191,36,0.5)' }}
            >
              <Zap size={11} color="#fbbf24" strokeWidth={2.5} />
            </div>
          ) : (
            /* Untouched: open circle — tappable, not "locked" */
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1.5px solid rgba(255,255,255,0.14)' }}
            />
          )}

          {isMastered && (
            <span
              className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
              style={{ background: `${moduleColor}20`, color: moduleColor }}
            >
              Done
            </span>
          )}
          {isStarted && (
            <span
              className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
              style={{ background: 'rgba(251,191,36,0.15)', color: '#fbbf24' }}
            >
              In progress
            </span>
          )}
        </div>

        {/* Topic title */}
        <span
          className="text-xs font-semibold leading-snug"
          style={{
            color: isMastered
              ? '#f8fafc'
              : isStarted
                ? '#cad5e2'
                : 'rgba(255,255,255,0.55)',
          }}
        >
          {topic.title}
        </span>
      </div>
    </motion.button>
  )
}

// ─── Module card ──────────────────────────────────────────────────────────────

function ModuleCard({ module, moduleIndex, progress, isFirstUnstarted }) {
  const navigate = useNavigate()
  const [expanded, setExpanded] = useState(moduleIndex === 0)

  const masteredCount = module.topics.filter(t => progress[t]?.mastered).length
  const startedCount  = module.topics.filter(t => progress[t]?.started && !progress[t]?.mastered).length
  const totalTopics   = module.topics.length
  const pct           = totalTopics > 0 ? (masteredCount / totalTopics) * 100 : 0
  const isComplete    = masteredCount === totalTopics
  const hasNoProgress = masteredCount === 0 && startedCount === 0

  const getState = (id) => {
    if (progress[id]?.mastered) return 'mastered'
    if (progress[id]?.started)  return 'started'
    return 'untouched'
  }

  return (
    <motion.div
      className="rounded-[22px] overflow-hidden"
      style={{
        background: 'rgba(15,22,41,0.95)',
        border: `1px solid ${pct > 0 ? module.color + '35' : 'rgba(255,255,255,0.08)'}`,
        boxShadow: pct > 0 ? `0 4px 24px ${module.color}12` : 'none',
      }}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: moduleIndex * 0.06, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* ── Module header ── */}
      <button
        className="w-full"
        onClick={() => setExpanded(prev => !prev)}
        style={{ textAlign: 'left' }}
      >
        {/* Gradient header area */}
        <div
          className="px-4 pt-4 pb-3 flex items-center gap-3"
          style={{
            background: `linear-gradient(135deg, ${module.color}18 0%, ${module.color}06 100%)`,
          }}
        >
          {/* Module icon */}
          <div
            className="w-11 h-11 rounded-[14px] flex items-center justify-center shrink-0"
            style={{
              background: `${module.color}25`,
              border: `1.5px solid ${module.color}50`,
            }}
          >
            <module.icon size={22} color={module.color} strokeWidth={2} />
          </div>

          {/* Module info */}
          <div className="flex-1 min-w-0">
            <div className="text-sm font-bold leading-tight truncate" style={{ color: '#f8fafc' }}>
              {module.name}
            </div>
            <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
              {masteredCount > 0 ? (
                <>
                  <span className="text-xs font-semibold" style={{ color: module.color }}>
                    {masteredCount} of {totalTopics} mastered
                  </span>
                </>
              ) : startedCount > 0 ? (
                <span className="text-xs" style={{ color: '#fbbf24', opacity: 0.9 }}>
                  {startedCount} in progress
                </span>
              ) : (
                <span className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
                  {totalTopics} topics to explore
                </span>
              )}
            </div>
          </div>

          {/* Right side: ring + chevron */}
          <div className="flex items-center gap-2 shrink-0">
            <ProgressRing pct={pct} color={module.color} size={50} />
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(255,255,255,0.05)' }}
            >
              {expanded
                ? <ChevronUp size={13} color="rgba(255,255,255,0.4)" />
                : <ChevronDown size={13} color="rgba(255,255,255,0.4)" />
              }
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="px-4 pb-3">
          <div
            className="h-[5px] rounded-full overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.06)' }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{
                background: isComplete
                  ? `linear-gradient(90deg, ${module.color}, #22c55e)`
                  : module.color,
              }}
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 1, delay: moduleIndex * 0.07, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        </div>
      </button>

      {/* ── Expanded topic grid ── */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="topics"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            {/* Separator */}
            <div className="mx-4 h-px mb-3" style={{ background: `${module.color}20` }} />

            <div className="px-3 pb-4 grid grid-cols-2 gap-2">
              {module.topics.map((topicId, i) => {
                const topic = TOPICS[topicId]
                if (!topic) return null
                return (
                  <TopicTile
                    key={topicId}
                    topic={topic}
                    moduleColor={module.color}
                    masteryState={getState(topicId)}
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

// ─── Screen ───────────────────────────────────────────────────────────────────

const PAPER1_MODULES = ['Energy', 'Electricity', 'Particle Model', 'Atomic Structure']
const PAPER2_MODULES = ['Forces', 'Waves', 'Magnetism & Electromagnetism', 'Space Physics']

const FILTERS = [
  { id: 'all',    label: 'All Topics',  color: '#6366f1' },
  { id: 'paper1', label: 'Paper 1',     color: '#f97316' },
  { id: 'paper2', label: 'Paper 2',     color: '#00a8e8' },
]

export default function TopicMap() {
  const navigate = useNavigate()
  const { progress } = useProgress()
  const [paperFilter, setPaperFilter] = useState('all')

  const totalTopics   = Object.keys(TOPICS).length
  const masteredTotal = Object.values(progress).filter(p => p?.mastered).length
  const overallPct    = totalTopics > 0 ? Math.round((masteredTotal / totalTopics) * 100) : 0
  const isNewUser     = masteredTotal === 0

  // First unstarted module for the "Start here" banner
  const allModuleTopics = MODULES.flatMap(m => m.topics)
  const firstUnmastered = allModuleTopics.find(id => !progress[id]?.mastered)
  const firstTopic = firstUnmastered ? TOPICS[firstUnmastered] : null
  const firstModule = firstUnmastered ? MODULES.find(m => m.topics.includes(firstUnmastered)) : null

  const filteredModules = MODULES.filter(m => {
    if (paperFilter === 'paper1') return PAPER1_MODULES.includes(m.name)
    if (paperFilter === 'paper2') return PAPER2_MODULES.includes(m.name)
    return true
  })

  return (
    <div className="flex flex-col h-full overflow-hidden" style={{ background: '#080f1e' }}>

      {/* ── Header ── */}
      <div className="px-5 pt-6 pb-4 shrink-0">
        <div className="flex items-end justify-between gap-3 mb-4">
          <div>
            <h1 className="text-[22px] font-bold tracking-tight" style={{ color: '#f8fafc', letterSpacing: '-0.02em' }}>
              GCSE Physics
            </h1>
            <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>
              {totalTopics} topics across {MODULES.length} modules
            </p>
          </div>

          {/* Overall mastery badge — only once started */}
          {overallPct > 0 && (
            <div
              className="shrink-0 px-3 py-1.5 rounded-full flex items-center gap-1.5"
              style={{
                background: 'rgba(34,197,94,0.12)',
                border: '1px solid rgba(34,197,94,0.3)',
              }}
            >
              <CheckCircle2 size={12} color="#22c55e" />
              <span className="text-xs font-bold" style={{ color: '#22c55e' }}>
                {overallPct}% mastered
              </span>
            </div>
          )}
        </div>

        {/* Filter pills */}
        <div className="flex gap-2">
          {FILTERS.map(f => {
            const isActive = paperFilter === f.id
            return (
              <motion.button
                key={f.id}
                onClick={() => setPaperFilter(f.id)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold"
                style={{
                  background: isActive ? `${f.color}20` : 'rgba(255,255,255,0.04)',
                  border: isActive ? `1px solid ${f.color}50` : '1px solid rgba(255,255,255,0.08)',
                  color: isActive ? f.color : 'rgba(255,255,255,0.35)',
                  transition: 'all 0.2s ease',
                  minHeight: 36,
                }}
                whileTap={{ scale: 0.95 }}
              >
                {isActive && (
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: f.color }} />
                )}
                {f.label}
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* ── Module cards ── */}
      <div className="flex-1 overflow-y-auto px-4 pb-10 space-y-3">

        {/* ── Start here banner (new users only) ── */}
        <AnimatePresence>
          {isNewUser && firstTopic && firstModule && (
            <motion.button
              key="start-here"
              className="w-full rounded-[20px] flex items-center justify-between px-5"
              style={{
                paddingTop: 18,
                paddingBottom: 18,
                background: `linear-gradient(135deg, ${firstModule.color}d0, ${firstModule.color}70)`,
                boxShadow: `0 6px 0 rgba(0,0,0,0.2), 0 12px 32px ${firstModule.color}30`,
              }}
              onClick={() => navigate(`/lesson/${firstUnmastered}`)}
              whileTap={{ y: 3, boxShadow: `0 2px 0 rgba(0,0,0,0.1)` }}
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
                  <div className="font-bold text-white opacity-80 uppercase tracking-wider mb-0.5" style={{ fontSize: 10 }}>
                    Start here
                  </div>
                  <div className="font-bold text-white" style={{ fontSize: 16, letterSpacing: '-0.02em' }}>
                    {firstTopic.title}
                  </div>
                  <div className="text-white opacity-65 mt-0.5" style={{ fontSize: 12 }}>
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

        <AnimatePresence mode="popLayout">
          {filteredModules.map((module, i) => (
            <motion.div
              key={module.name}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.18, ease: 'easeInOut' }}
            >
              <ModuleCard
                module={module}
                moduleIndex={i}
                progress={progress}
                isFirstUnstarted={firstUnmastered && module.topics.includes(firstUnmastered)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

    </div>
  )
}
