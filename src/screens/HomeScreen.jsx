import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle, CaretRight, Lightning } from '@phosphor-icons/react'
import { MODULES, TOPICS } from '../data/topics'
import { useProgress } from '../hooks/useProgress'
import { useStudyPlan } from '../hooks/useStudyPlan'
import { getSelectedBoard } from '../utils/boardConfig'
import SafeAreaPage from '../components/ui/SafeAreaPage'

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}

export default function HomeScreen() {
  const navigate = useNavigate()
  const { progress } = useProgress()
  const { todayTopicId } = useStudyPlan(progress)
  const board = getSelectedBoard()
  const [userName, setUserName] = useState('')

  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem('neurophysics_profile') || '{}')
    setUserName(profile.name || '')
  }, [])

  const resumeData = (() => {
    try { return JSON.parse(localStorage.getItem('np_lesson_break') || 'null') }
    catch { return null }
  })()

  const visibleModules = MODULES.filter(m => !m.boards || m.boards.includes(board.id))
  const allTopicIds = visibleModules.flatMap(m => m.topics.filter(id => TOPICS[id]))

  const activeTopicId = todayTopicId ||
    allTopicIds.find(id => !progress[id]?.mastered) ||
    null

  function getNodeState(topicId) {
    if (progress[topicId]?.mastered) return 'completed'
    if (topicId === activeTopicId) return 'active'
    if (progress[topicId]?.started) return 'started'
    return 'available'
  }

  function handleNodeTap(topicId) {
    navigate(`/lesson/${topicId}`)
  }

  return (
    <SafeAreaPage className="bg-[#080f1e] min-h-screen">
      <style>{`
        @keyframes np-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(99,102,241,0.45); }
          60% { box-shadow: 0 0 0 9px rgba(99,102,241,0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .np-active-pulse { animation: none !important; }
        }
      `}</style>

      <div className="px-5 pt-10 pb-32">

        {/* Greeting */}
        <div className="mb-8 px-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em]"
             style={{ color: 'oklch(0.55 0.04 265)' }}>
            {getGreeting()}
          </p>
          <h1 className="mt-0.5 text-[1.6rem] font-bold leading-tight"
              style={{ fontFamily: 'var(--font-display)', color: 'oklch(0.97 0.01 265)' }}>
            {userName || 'Welcome back'}
          </h1>
        </div>

        {/* Resume / continue in-progress lesson */}
        {resumeData && TOPICS[resumeData.topicId] && (
          <button
            onClick={() => navigate(`/lesson/${resumeData.topicId}`)}
            className="w-full mb-8 px-4 py-3.5 rounded-2xl flex items-center gap-3 text-left transition-opacity active:opacity-75"
            style={{
              background: 'oklch(0.22 0.06 265 / 0.55)',
              border: '1px solid oklch(0.5 0.18 265 / 0.28)',
            }}
          >
            <Lightning size={17} weight="fill" style={{ color: 'oklch(0.72 0.18 265)', flexShrink: 0 }} />
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.1em] mb-0.5"
                 style={{ color: 'oklch(0.62 0.14 265)' }}>
                Continue where you left off
              </p>
              <p className="text-sm font-medium truncate"
                 style={{ color: 'oklch(0.87 0.08 265)' }}>
                {TOPICS[resumeData.topicId].title}
              </p>
            </div>
          </button>
        )}

        {/* Vertical path */}
        <div className="relative">
          {/* Dotted connector line */}
          <div
            className="absolute top-0 bottom-0 pointer-events-none"
            aria-hidden="true"
            style={{
              left: 19,
              width: 2,
              backgroundImage:
                'repeating-linear-gradient(to bottom, oklch(0.35 0.02 265) 0, oklch(0.35 0.02 265) 4px, transparent 4px, transparent 9px)',
            }}
          />

          {visibleModules.map((module, moduleIdx) => {
            const moduleTopics = module.topics.filter(id => TOPICS[id])
            if (moduleTopics.length === 0) return null

            return (
              <div key={moduleIdx}>
                {/* Module section label */}
                <div className="flex items-center gap-3 mb-3 mt-3" style={{ paddingLeft: 52 }}>
                  <span
                    className="text-[10.5px] font-bold uppercase tracking-[0.13em]"
                    style={{ fontFamily: 'var(--font-display)', color: 'oklch(0.42 0.04 265)' }}
                  >
                    {module.name}
                  </span>
                </div>

                {/* Topic nodes */}
                {moduleTopics.map((topicId) => {
                  const topic = TOPICS[topicId]
                  if (!topic) return null
                  const state = getNodeState(topicId)
                  const isActive    = state === 'active'
                  const isCompleted = state === 'completed'
                  const isStarted   = state === 'started'

                  return (
                    <div
                      key={topicId}
                      className="flex items-center gap-4 mb-4"
                      style={{ minHeight: isActive ? 56 : 48 }}
                    >
                      {/* Node button — always tappable */}
                      <div className="flex items-center justify-center flex-shrink-0" style={{ width: 40 }}>
                        <button
                          onClick={() => handleNodeTap(topicId)}
                          aria-label={`${topic.title}${isCompleted ? ' — completed' : isActive ? ' — suggested next' : isStarted ? ' — in progress' : ''}`}
                          className="np-active-pulse rounded-full flex items-center justify-center transition-transform active:scale-90"
                          style={{
                            width: isActive ? 48 : 36,
                            height: isActive ? 48 : 36,
                            // completed: muted filled circle
                            // active: indigo filled, pulsing
                            // started: indigo outline with faint fill
                            // available: outline only, full opacity
                            background: isCompleted
                              ? 'oklch(0.22 0.03 265 / 0.7)'
                              : isActive
                              ? 'oklch(0.55 0.22 265)'
                              : isStarted
                              ? 'oklch(0.55 0.22 265 / 0.18)'
                              : 'transparent',
                            border: isCompleted
                              ? '1.5px solid oklch(0.38 0.04 265)'
                              : isActive
                              ? 'none'
                              : isStarted
                              ? '1.5px solid oklch(0.55 0.22 265 / 0.7)'
                              : '1.5px solid oklch(0.48 0.06 265)',
                            animation: isActive ? 'np-pulse 2.8s ease-in-out infinite' : 'none',
                          }}
                        >
                          {isCompleted && (
                            <CheckCircle size={17} weight="fill"
                              style={{ color: 'oklch(0.55 0.1 265)' }} />
                          )}
                          {isActive && (
                            <Lightning size={20} weight="fill"
                              style={{ color: 'oklch(0.97 0.01 265)' }} />
                          )}
                          {isStarted && (
                            <CaretRight size={13} weight="bold"
                              style={{ color: 'oklch(0.72 0.18 265)' }} />
                          )}
                        </button>
                      </div>

                      {/* Label — full opacity for all states */}
                      <div className="flex-1 min-w-0">
                        <p
                          className="font-medium text-sm leading-snug"
                          style={{
                            color: isCompleted
                              ? 'oklch(0.5 0.04 265)'
                              : isActive
                              ? 'oklch(0.97 0.01 265)'
                              : 'oklch(0.82 0.04 265)',
                            fontFamily: isActive ? 'var(--font-display)' : undefined,
                            fontSize: isActive ? '0.9375rem' : undefined,
                            fontWeight: isActive ? 600 : undefined,
                          }}
                        >
                          {topic.title}
                        </p>
                        {isCompleted && (
                          <p className="text-[11px] mt-0.5"
                             style={{ color: 'oklch(0.42 0.04 265)' }}>
                            Done
                          </p>
                        )}
                        {isStarted && (
                          <p className="text-[11px] mt-0.5"
                             style={{ color: 'oklch(0.62 0.14 265)' }}>
                            In progress
                          </p>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>

        {/* Quick Win text link */}
        <div className="mt-10 text-center">
          <button
            onClick={() => navigate('/quickwin')}
            className="text-sm transition-colors"
            style={{ color: 'oklch(0.44 0.06 265)' }}
            aria-label="Quick Win — 5 questions, 3 minutes"
          >
            Quick Win · 5 questions, 3 min
          </button>
        </div>

      </div>
    </SafeAreaPage>
  )
}
