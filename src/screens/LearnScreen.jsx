import { motion, AnimatePresence } from 'motion/react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CheckCircle2, Zap, ChevronDown, ChevronUp,
  ArrowRight, Trophy, Clock, ChevronRight, Star, Search, X,
} from 'lucide-react'
import { MODULES, TOPICS } from '../data/topics'
import { useProgress } from '../hooks/useProgress'

// ─── Badge definitions (for next milestone) ──────────────────────────────────

const BADGES = [
  { id: 'first_step', emoji: '🔬', label: 'First Step',  color: '#00bc7d', hint: 'Complete 1 topic',        check: (m)         => m >= 1 },
  { id: 'momentum',   emoji: '⚡', label: 'Momentum',    color: '#fdc700', hint: 'Master 5 topics',         check: (m)         => m >= 5 },
  { id: 'force_field',emoji: '🧲', label: 'Force Field', color: '#00a8e8', hint: 'Master 10 topics',        check: (m)         => m >= 10 },
  { id: 'grade9',     emoji: '🏆', label: 'Grade 9',     color: '#f97316', hint: 'Master all 55 topics',   check: (m, total)  => m >= total },
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
  const isMastered  = masteryState === 'mastered'
  const isStarted   = masteryState === 'started'

  return (
    <motion.button
      className="w-full text-left rounded-[16px] overflow-hidden"
      style={{
        background: isMastered
          ? `linear-gradient(135deg, ${moduleColor}22, ${moduleColor}10)`
          : isStarted ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.03)',
        border: isMastered
          ? `1px solid ${moduleColor}45`
          : isStarted ? '1px solid rgba(251,191,36,0.3)' : '1px solid rgba(255,255,255,0.09)',
        minHeight: 44,
      }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03, duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      whileTap={{ scale: 0.96 }}
      onClick={onTap}
    >
      <div style={{ height: 3, background: isMastered ? moduleColor : isStarted ? '#fbbf24' : 'transparent', opacity: 0.65 }} />
      <div className="px-3 py-3 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          {isMastered ? (
            <div className="w-6 h-6 rounded-full flex items-center justify-center"
              style={{ background: `${moduleColor}25`, border: `1.5px solid ${moduleColor}60` }}>
              <CheckCircle2 size={13} color={moduleColor} strokeWidth={2.5} />
            </div>
          ) : isStarted ? (
            <div className="w-6 h-6 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(251,191,36,0.15)', border: '1.5px solid rgba(251,191,36,0.5)' }}>
              <Zap size={11} color="#fbbf24" strokeWidth={2.5} />
            </div>
          ) : (
            <div className="w-6 h-6 rounded-full"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1.5px solid rgba(255,255,255,0.14)' }} />
          )}
          {isMastered && (
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
              style={{ background: `${moduleColor}20`, color: moduleColor }}>Done</span>
          )}
          {isStarted && (
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
              style={{ background: 'rgba(251,191,36,0.15)', color: '#fbbf24' }}>In progress</span>
          )}
        </div>
        <span className="text-xs font-semibold leading-snug"
          style={{ color: isMastered ? '#f8fafc' : isStarted ? '#cad5e2' : 'rgba(255,255,255,0.5)' }}>
          {topic.title}
        </span>
      </div>
    </motion.button>
  )
}

// ─── Module card ──────────────────────────────────────────────────────────────

function ModuleCard({ module, moduleIndex, progress }) {
  const navigate = useNavigate()
  const [expanded, setExpanded] = useState(moduleIndex === 0)

  const masteredCount = module.topics.filter(t => progress[t]?.mastered).length
  const startedCount  = module.topics.filter(t => progress[t]?.started && !progress[t]?.mastered).length
  const totalTopics   = module.topics.length
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
        background: 'rgba(15,22,41,0.95)',
        border: `1px solid ${pct > 0 ? module.color + '35' : 'rgba(255,255,255,0.08)'}`,
        boxShadow: pct > 0 ? `0 4px 24px ${module.color}10` : 'none',
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: moduleIndex * 0.05, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      <button className="w-full" onClick={() => setExpanded(p => !p)} style={{ textAlign: 'left' }}>
        <div className="px-4 pt-4 pb-3 flex items-center gap-3"
          style={{ background: `linear-gradient(135deg, ${module.color}18 0%, ${module.color}06 100%)` }}>
          <div className="w-11 h-11 rounded-[14px] flex items-center justify-center shrink-0"
            style={{ background: `${module.color}25`, border: `1.5px solid ${module.color}50` }}>
            <module.icon size={22} color={module.color} strokeWidth={2} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-bold leading-tight truncate" style={{ color: '#f8fafc' }}>
              {module.name}
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
                    onTap={() => navigate(
                      progress[topicId]?.mastered
                        ? `/diagnostic/${topicId}`
                        : `/lesson/${topicId}`
                    )}
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
  { id: 'all',    label: 'All',     color: '#6366f1' },
  { id: 'paper1', label: 'Paper 1', color: '#f97316' },
  { id: 'paper2', label: 'Paper 2', color: '#00a8e8' },
]

export default function LearnScreen() {
  const navigate     = useNavigate()
  const { progress } = useProgress()
  const [paperFilter, setPaperFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const totalTopics   = Object.keys(TOPICS).length
  const masteredTotal = Object.values(progress).filter(p => p?.mastered).length
  const overallPct    = totalTopics > 0 ? (masteredTotal / totalTopics) * 100 : 0
  const isNewUser     = masteredTotal === 0

  // Next milestone
  const nextBadge = BADGES.find(b => !b.check(masteredTotal, totalTopics))

  // First unmastered topic for "Start here" banner
  const allModuleTopics  = MODULES.flatMap(m => m.topics)
  const firstUnmastered  = allModuleTopics.find(id => !progress[id]?.mastered)
  const firstTopic       = firstUnmastered ? TOPICS[firstUnmastered] : null
  const firstModule      = firstUnmastered ? MODULES.find(m => m.topics.includes(firstUnmastered)) : null

  const filteredModules = MODULES.filter(m => {
    if (paperFilter === 'paper1') return PAPER1_MODULES.includes(m.name)
    if (paperFilter === 'paper2') return PAPER2_MODULES.includes(m.name)
    return true
  })

  // Search: flat results across all topics
  const searchResults = searchQuery.trim().length > 1
    ? MODULES.flatMap(m =>
        m.topics
          .filter(id => {
            const t = TOPICS[id]
            return t && t.title.toLowerCase().includes(searchQuery.toLowerCase())
          })
          .map(id => ({ id, topic: TOPICS[id], module: m }))
      )
    : []
  const isSearching = searchQuery.trim().length > 1

  return (
    <div className="flex flex-col h-full overflow-hidden" style={{ background: '#080f1e' }}>

      {/* ── Header: compact progress ── */}
      <div className="px-5 pt-6 pb-4 shrink-0">
        <div className="flex items-center justify-between mb-1">
          <h1 className="text-[22px] font-bold tracking-tight" style={{ color: '#f8fafc', letterSpacing: '-0.02em' }}>
            GCSE Physics
          </h1>
          {masteredTotal > 0 && (
            <span className="text-xs font-bold" style={{ color: '#6366f1' }}>
              {masteredTotal}/{totalTopics} mastered
            </span>
          )}
        </div>

        {/* Overall progress bar */}
        <div className="w-full rounded-full overflow-hidden mb-4" style={{ height: 5, background: 'rgba(255,255,255,0.06)' }}>
          <motion.div
            className="h-full rounded-full"
            style={{ background: 'linear-gradient(90deg, #6366f1, #818cf8)' }}
            initial={{ width: 0 }}
            animate={{ width: `${overallPct}%` }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
          />
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
              color: '#f8fafc',
            }}
          />
          {searchQuery.length > 0 && (
            <button onClick={() => setSearchQuery('')}
              style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)' }}>
              <X size={14} color="rgba(255,255,255,0.3)" />
            </button>
          )}
        </div>

        {/* Filter tabs + exam quick access */}
        <div className="flex items-center gap-2">
          {FILTERS.map(f => {
            const isActive = paperFilter === f.id
            return (
              <motion.button
                key={f.id}
                onClick={() => setPaperFilter(f.id)}
                className="flex items-center gap-1.5 px-4 rounded-full text-xs font-bold"
                style={{
                  height: 36,
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

          {/* Pinned exam shortcuts */}
          <div className="flex gap-1.5 ml-auto shrink-0">
            <motion.button
              onClick={() => navigate('/grade9')}
              className="flex items-center gap-1 px-3 rounded-full text-xs font-bold"
              style={{ height: 36, background: 'rgba(168,85,247,0.12)', border: '1px solid rgba(168,85,247,0.3)', color: '#c084fc' }}
              whileTap={{ scale: 0.95 }}
              title="Grade 9 Challenge"
            >
              <Trophy size={12} /> G9
            </motion.button>
            <motion.button
              onClick={() => navigate('/timed-paper')}
              className="flex items-center gap-1 px-3 rounded-full text-xs font-bold"
              style={{ height: 36, background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.3)', color: '#818cf8' }}
              whileTap={{ scale: 0.95 }}
              title="Timed Paper"
            >
              <Clock size={12} /> Paper
            </motion.button>
          </div>
        </div>
      </div>

      {/* ── Scrollable body ── */}
      <div className="flex-1 overflow-y-auto px-4 pb-10 space-y-3">

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
                        background: 'rgba(15,22,41,0.95)',
                        border: `1px solid ${state === 'mastered' ? mod.color + '45' : 'rgba(255,255,255,0.08)'}`,
                        minHeight: 56,
                      }}
                      onClick={() => navigate(`/lesson/${id}`)}
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
                        <div className="text-sm font-bold" style={{ color: '#f8fafc' }}>{topic.title}</div>
                        <div className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>{mod.name}</div>
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
            className="rounded-[18px] px-4 py-3.5 flex items-center gap-3"
            style={{ background: `${nextBadge.color}0d`, border: `1px solid ${nextBadge.color}25` }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <span style={{ fontSize: 22 }}>{nextBadge.emoji}</span>
            <div className="flex-1 min-w-0">
              <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: nextBadge.color }}>
                Next milestone
              </span>
              <div className="text-sm font-bold" style={{ color: '#f8fafc' }}>{nextBadge.label}</div>
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
              onClick={() => navigate(`/lesson/${firstUnmastered}`)}
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
                  <div className="font-bold text-white opacity-75 uppercase tracking-wider mb-0.5" style={{ fontSize: 10 }}>
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
              <ModuleCard module={module} moduleIndex={i} progress={progress} />
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
              <span className="text-xs font-bold uppercase tracking-wider"
                style={{ color: 'rgba(255,255,255,0.28)' }}>
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
                  <p className="text-sm font-bold" style={{ color: '#f8fafc' }}>Grade 9 Challenge</p>
                  <p className="text-xs mt-0.5" style={{ color: '#a855f7' }}>Chained calcs · RPA errors · Novel context</p>
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
                  <p className="text-sm font-bold" style={{ color: '#f8fafc' }}>Timed Paper</p>
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
