import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Sparkles, Clock } from 'lucide-react'
import { MODULES, TOPICS } from '../data/topics'
import { getSelectedBoard, isAvailableForBoard } from '../utils/boardConfig'
import { useProgress } from '../hooks/useProgress'

// Visual-only redesign of the Topics screen.
// Routing, board filtering, lesson gating — all unchanged. Tapping a module
// card takes you to the existing /learn screen so the 9-step lesson flow,
// mastery gating, practical links, and recall are all preserved.

const ACCENT = {
  orange: { bg: 'rgba(255,132,0,0.15)',  fg: '#ff8400' },
  violet: { bg: 'rgba(155,89,182,0.15)', fg: '#b07cd9' },
  cyan:   { bg: 'rgba(0,212,255,0.14)',  fg: '#4ad0ff' },
  pink:   { bg: 'rgba(233,30,140,0.12)', fg: '#ff6fb2' },
  green:  { bg: 'rgba(103,212,142,0.12)',fg: '#8be3a9' },
  amber:  { bg: 'rgba(253,199,0,0.15)',  fg: '#ffd94a' },
  blue:   { bg: 'rgba(21,93,252,0.18)',  fg: '#7aa8ff' },
}

// Map existing module colour to a named accent (for consistent look).
function accentFromColor(c) {
  const h = (c || '').toLowerCase()
  if (h.includes('f97316')) return 'orange'
  if (h.includes('155dfc') || h.includes('00a8e8')) return 'blue'
  if (h.includes('c084fc') || h.includes('e879f9')) return 'violet'
  if (h.includes('fdc700')) return 'amber'
  if (h.includes('00d4ff')) return 'cyan'
  return 'green'
}

function Progress({ value, fg }) {
  return (
    <div className="h-1.5 rounded-full overflow-hidden" style={{ background:'rgba(255,255,255,0.08)' }}>
      <div className="h-full rounded-full transition-all"
        style={{ width: `${Math.round(Math.max(0, Math.min(1, value)) * 100)}%`, background: fg }} />
    </div>
  )
}

export default function TopicsScreenV2() {
  const navigate = useNavigate()
  const { progress } = useProgress()
  const board = getSelectedBoard()

  // Filter modules for current board (pedagogy rule preserved)
  const visibleModules = useMemo(
    () => MODULES.filter(m => isAvailableForBoard(m.boards, board.id)),
    [board.id]
  )

  // Per-module stats + recommended topic
  const moduleStats = useMemo(() => {
    return visibleModules.map(m => {
      const topicsAvail = m.topics
        .map(id => TOPICS[id])
        .filter(t => t && isAvailableForBoard(t.boards, board.id))
      const total = topicsAvail.length
      const complete = topicsAvail.filter(t => progress?.[t.id]?.mastered).length
      return {
        mod: m,
        total,
        complete,
        percent: total ? complete / total : 0,
        topics: topicsAvail,
        accent: accentFromColor(m.color),
        Icon: m.icon,
      }
    })
  }, [visibleModules, progress, board.id])

  // Recommended = first unmastered topic from the first module with progress
  const recommended = useMemo(() => {
    for (const ms of moduleStats) {
      const next = ms.topics.find(t => !progress?.[t.id]?.mastered)
      if (next) return { mod: ms.mod, topic: next, accent: ms.accent, Icon: ms.Icon, percent: ms.percent, lessonLabel: `Lesson ${ms.complete + 1} of ${ms.total}` }
    }
    return null
  }, [moduleStats, progress])

  const openTopic = (topic) => {
    if (!topic) return
    if (topic.hook || (topic.lessonSteps && topic.lessonSteps.length > 0)) navigate(`/lesson/${topic.id}`)
    else if (topic.practicalId) navigate(`/practical/${topic.practicalId}`)
    else navigate(`/practice/${topic.id}`)
  }

  return (
    <div className="flex flex-col h-full overflow-y-auto" style={{ background:'#080f1e', color:'#e6ecf8' }}>
      {/* Sticky header */}
      <div className="sticky top-0 z-20 px-5 pt-[calc(env(safe-area-inset-top,0px)+16px)] pb-3"
        style={{
          background:'rgba(8,15,30,0.75)',
          backdropFilter:'blur(12px)',
          WebkitBackdropFilter:'blur(12px)',
          borderBottom:'0.75px solid rgba(255,255,255,0.06)',
        }}>
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} aria-label="Back"
            className="w-11 h-11 rounded-[12px] flex items-center justify-center active:opacity-80"
            style={{ background:'rgba(255,255,255,0.06)', border:'0.75px solid rgba(255,255,255,0.08)' }}>
            <ArrowLeft size={18} />
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="text-[22px] font-semibold leading-tight">Topics</h1>
            <p className="text-[12px]" style={{ color:'#9fa7bd' }}>{board.name}</p>
          </div>
          <span className="px-2.5 h-7 rounded-full text-[11px] font-medium flex items-center gap-1"
            style={{ background:'rgba(0,212,255,0.15)', color:'#4ad0ff' }}>
            <Sparkles size={11} strokeWidth={2.25} /> Focus
          </span>
        </div>
      </div>

      <div className="px-5 pt-4 flex flex-col gap-5"
        style={{ paddingBottom: 'calc(96px + env(safe-area-inset-bottom, 0px))' }}>

        {/* Recommended card */}
        {recommended && (() => {
          const a = ACCENT[recommended.accent]
          const Icon = recommended.Icon
          return (
            <button type="button" onClick={() => openTopic(recommended.topic)}
              className="text-left rounded-[20px] border p-4 flex flex-col gap-3 active:opacity-90"
              style={{ background:'rgba(15,22,41,0.95)', borderColor:'rgba(255,255,255,0.08)', borderWidth:'0.75px' }}>
              <div className="flex items-center justify-between">
                <span className="text-[10.5px] font-semibold tracking-[0.12em]" style={{ color:'#9fa7bd' }}>RECOMMENDED FOR YOU</span>
                <span className="text-[11px]" style={{ color:'#9fa7bd' }}>{recommended.lessonLabel}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-[14px] flex items-center justify-center shrink-0"
                  style={{ background: a.bg }}>
                  <Icon size={22} color={a.fg} strokeWidth={2} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-[17px] font-semibold leading-tight">{recommended.topic.title}</h3>
                  <div className="flex items-center gap-2 mt-1 text-[12px]" style={{ color:'#9fa7bd' }}>
                    <span className="px-2 py-0.5 rounded-full" style={{ background:a.bg, color:a.fg }}>Continue</span>
                    <span className="inline-flex items-center gap-1"><Clock size={11} /> ~10 min</span>
                  </div>
                </div>
                <ArrowRight size={18} color={a.fg} />
              </div>
              <Progress value={recommended.percent} fg={a.fg} />
            </button>
          )
        })()}

        <div className="flex items-center justify-between">
          <h2 className="text-[15px] font-semibold">All Topics</h2>
          <span className="text-[12px]" style={{ color:'#9fa7bd' }}>{moduleStats.length} modules</span>
        </div>

        {/* Module list */}
        <div className="flex flex-col gap-3">
          {moduleStats.map(({ mod, total, complete, percent, accent, Icon, topics }) => {
            const a = ACCENT[accent]
            // Next unmastered in this module, routed through real lesson gating
            const next = topics.find(t => !progress?.[t.id]?.mastered) || topics[0]
            return (
              <button key={mod.name} type="button" onClick={() => openTopic(next)}
                className="text-left rounded-[16px] border p-4 flex items-center gap-3 active:opacity-90"
                style={{ background:'rgba(15,22,41,0.95)', borderColor:'rgba(255,255,255,0.08)', borderWidth:'0.75px' }}>
                <div className="w-11 h-11 rounded-[12px] flex items-center justify-center shrink-0"
                  style={{ background:a.bg }}>
                  <Icon size={20} color={a.fg} strokeWidth={2} />
                </div>
                <div className="flex-1 min-w-0 flex flex-col gap-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-[15px] font-semibold truncate">{mod.name}</h3>
                    <span className="text-[11px] shrink-0" style={{ color:'#9fa7bd' }}>
                      {complete}/{total} · {Math.round(percent * 100)}%
                    </span>
                  </div>
                  <Progress value={percent} fg={a.fg} />
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
