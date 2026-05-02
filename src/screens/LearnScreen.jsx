import { motion, AnimatePresence } from 'motion/react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { MagnifyingGlass, CaretDown } from '@phosphor-icons/react'
import { MODULES, TOPICS } from '../data/topics'
import { useProgress } from '../hooks/useProgress'
import { getSelectedBoard, getSelectedCourse } from '../utils/boardConfig'
import { getVisibleTopicIdsForSelection, isModuleAvailableForSelection, isTopicAvailableForSelection } from '../utils/curriculumFilters'
import { getCurriculumModules } from '../features/curriculum/curriculumOrder'

function TopicRow({ topic, state, onTap, isLast }) {
  const label = state === 'mastered' ? 'Review' : state === 'started' ? 'Continue' : 'Start'
  const color = state === 'mastered' ? 'var(--np-success)' : state === 'started' ? 'var(--np-accent-strong)' : 'var(--np-text-dim)'

  return (
    <button
      type="button"
      onClick={onTap}
      className="w-full flex items-center gap-3 px-4 py-3 text-left"
      style={{
        minHeight: 46,
        background: 'transparent',
        borderBottom: isLast ? 'none' : '1px solid rgba(255,255,255,0.05)',
      }}
    >
      <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: color }} />
      <span className="flex-1 text-sm leading-snug" style={{ color: 'var(--np-text)' }}>
        {topic.title}
      </span>
      <span className="text-[11px] font-semibold shrink-0" style={{ color }}>
        {label}
      </span>
    </button>
  )
}

function ModuleCard({ module, progress, expanded, onToggle, selectedBoard, selectedCourse, onTopicTap }) {
  const visibleTopics = getVisibleTopicIdsForSelection(module.topics, selectedBoard.id, selectedCourse)

  const masteredCount = visibleTopics.filter(id => progress[id]?.mastered).length
  const startedCount = visibleTopics.filter(id => progress[id]?.started && !progress[id]?.mastered).length
  const subtitle = masteredCount > 0
    ? `${masteredCount} of ${visibleTopics.length} complete`
    : startedCount > 0
      ? `${startedCount} in progress`
      : `${visibleTopics.length} topics`

  return (
    <motion.div
      className="rounded-[20px] overflow-hidden"
      style={{ background: 'var(--surface-panel)', border: 'var(--border-quiet)', boxShadow: 'var(--shadow-card)' }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
    >
      <button
        type="button"
        onClick={onToggle}
        className="w-full text-left px-4 py-4"
        aria-expanded={expanded}
        style={{ background: 'transparent' }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-11 h-11 rounded-full flex items-center justify-center shrink-0"
            style={{ background: `${module.color}20`, color: module.color }}
          >
            <module.icon size={20} />
          </div>

          <div className="flex-1 min-w-0">
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, letterSpacing: '-0.025em', color: 'var(--np-text)', lineHeight: 1.15 }}>
              {module.name}
            </div>
            <div className="text-xs mt-1" style={{ color: 'var(--np-text-muted)' }}>
              {subtitle}
            </div>
          </div>

          <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <CaretDown
              size={18}
              color="var(--np-text-dim)"
              style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 180ms ease' }}
            />
          </div>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ height: 1, margin: '0 16px', background: 'rgba(255,255,255,0.05)' }} />
            {visibleTopics.map((topicId, index) => {
              const topic = TOPICS[topicId]
              if (!topic) return null
              const state = progress[topicId]?.mastered ? 'mastered' : progress[topicId]?.started ? 'started' : 'untouched'
              return (
                <TopicRow
                  key={topicId}
                  topic={topic}
                  state={state}
                  isLast={index === visibleTopics.length - 1}
                  onTap={() => onTopicTap(topicId)}
                />
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function LearnScreen() {
  const navigate = useNavigate()
  const { progress } = useProgress()
  const [selectedBoard, setSelectedBoard] = useState(() => getSelectedBoard())
  const [selectedCourse, setSelectedCourse] = useState(() => getSelectedCourse())
  const [searchQuery, setSearchQuery] = useState('')

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

  const boardModules = getCurriculumModules(MODULES, selectedBoard.id, selectedCourse)
    .filter(module => isModuleAvailableForSelection(module, selectedBoard.id, selectedCourse))

  const [openModule, setOpenModule] = useState(() => {
    try {
      return sessionStorage.getItem('np_open_module') || boardModules[0]?.name || ''
    } catch {
      return boardModules[0]?.name || ''
    }
  })

  const toggleModule = (name) => {
    setOpenModule(current => {
      const next = current === name ? '' : name
      sessionStorage.setItem('np_open_module', next)
      return next
    })
  }

  const handleTopicTap = (topicId) => {
    const topic = TOPICS[topicId]
    if (!topic) return
    if (topic.hook || topic.lessonSteps?.length > 0) navigate(`/lesson/${topicId}`)
    else if (topic.practicalId) navigate(`/practical/${topic.practicalId}`)
    else navigate(`/practice/${topicId}`)
  }

  const trimmedSearch = searchQuery.trim().toLowerCase()
  const searchResults = trimmedSearch.length < 2
    ? []
    : boardModules
      .flatMap(module => module.topics
        .filter(id => {
          const topic = TOPICS[id]
          if (!topic) return false
          if (!isTopicAvailableForSelection(topic, selectedBoard.id, selectedCourse)) return false
          return topic.title.toLowerCase().includes(trimmedSearch) || module.name.toLowerCase().includes(trimmedSearch)
        })
        .map(id => ({ id, topic: TOPICS[id], module })))
      .slice(0, 6)

  return (
    <div
      className="flex flex-col min-h-full np-shell-gradient"
      style={{
        paddingTop: 'var(--safe-top)',
        paddingBottom: 'calc(var(--bottom-chrome-height) + var(--page-bottom-gap))',
      }}
    >
      <div style={{ minHeight: 0 }}>
        <div style={{ padding: '24px 16px 18px' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.06, color: 'var(--np-text)', marginBottom: 8 }}>
            Learn
          </h1>
          <p style={{ fontSize: 14, color: 'var(--np-text-muted)', marginBottom: 16 }}>
            Find a topic and start when you are ready.
          </p>

          <label
            className="flex items-center gap-3 rounded-[18px] px-4"
            style={{ minHeight: 50, background: 'var(--surface-panel)', border: 'var(--border-quiet)', boxShadow: 'var(--shadow-card)' }}
          >
            <MagnifyingGlass size={17} color="var(--np-text-dim)" />
            <input
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search topics"
              aria-label="Search topics"
              className="flex-1 bg-transparent outline-none text-sm"
              style={{ color: 'var(--np-text)' }}
            />
          </label>

          <button
            onClick={() => navigate('/settings')}
            className="mt-3 inline-flex items-center rounded-full px-3 py-1.5"
            style={{ fontSize: 11, fontWeight: 600, color: 'var(--np-accent-strong)', background: 'rgba(94,167,161,0.08)', border: '1px solid rgba(94,167,161,0.18)' }}
          >
            {selectedBoard.name}
          </button>
        </div>

        <div aria-live="polite" aria-atomic="true" className="sr-only">
          {searchResults.length > 0 ? `${searchResults.length} matching topic${searchResults.length === 1 ? '' : 's'} found` : ''}
        </div>

        {searchResults.length > 0 && (
          <div style={{ padding: '0 12px 14px' }}>
            <div className="np-card-quiet" style={{ overflow: 'hidden' }}>
              <div className="px-4 pt-4 pb-2 text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: 'var(--np-text-dim)' }}>
                Matching topics
              </div>
              {searchResults.map(({ id, topic, module }, index) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => handleTopicTap(id)}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left"
                  style={{ background: 'transparent', borderTop: index === 0 ? 'none' : '1px solid rgba(255,255,255,0.05)' }}
                >
                  <div className="w-9 h-9 rounded-[12px] flex items-center justify-center shrink-0" style={{ background: `${module.color}18`, color: module.color }}>
                    <module.icon size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold leading-snug" style={{ color: 'var(--np-text)', overflowWrap: 'anywhere' }}>{topic.title}</div>
                    <div className="text-xs mt-0.5" style={{ color: 'var(--np-text-muted)' }}>{module.name}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        <div style={{ padding: '0 12px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {boardModules.map(module => (
            <ModuleCard
              key={module.name}
              module={module}
              progress={progress}
              expanded={openModule === module.name}
              onToggle={() => toggleModule(module.name)}
              selectedBoard={selectedBoard}
              selectedCourse={selectedCourse}
              onTopicTap={handleTopicTap}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
