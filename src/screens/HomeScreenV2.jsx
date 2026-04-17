import { useMemo, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle2, Clock, Sparkles, Target, ArrowRight, Settings, Flame, Zap } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useProgress } from '../hooks/useProgress'
import { MODULES, TOPICS } from '../data/topics'
import { getSelectedBoard, isAvailableForBoard } from '../utils/boardConfig'

// Visual-only redesign of Home.
// All pedagogy unchanged: lesson routing, mastery, streaks, XP. Mood picker
// is a new UI-only affordance (stored in localStorage) — doesn't gate anything.

const MOODS = [
  { key:'great', label:'Great', from:'#34d17c', to:'#0fa35c' },
  { key:'good',  label:'Good',  from:'#9be3b0', to:'#5ec184' },
  { key:'okay',  label:'Okay',  from:'#f5d84a', to:'#d9b00a' },
  { key:'tired', label:'Tired', from:'#ff9a3c', to:'#e87600' },
  { key:'tough', label:'Tough', from:'#ff6a55', to:'#d93c15' },
]

function greetingFor() {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}

function loadProfile() {
  try { return JSON.parse(localStorage.getItem('neurophysics_profile') || '{}') } catch { return {} }
}

function todayISO() { return new Date().toISOString().slice(0, 10) }

export default function HomeScreenV2() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { progress, stats } = useProgress()
  const board = getSelectedBoard()
  const profile = loadProfile()

  const rawName = profile.name || user?.user_metadata?.full_name || user?.user_metadata?.name || 'there'
  const displayName = String(rawName).split(' ')[0]
  const greeting = greetingFor()

  const [mood, setMood] = useState(() => {
    try {
      const raw = JSON.parse(localStorage.getItem('np_mood_today') || '{}')
      return raw.date === todayISO() ? raw.key : null
    } catch { return null }
  })
  useEffect(() => {
    if (!mood) return
    try { localStorage.setItem('np_mood_today', JSON.stringify({ date: todayISO(), key: mood })) } catch {}
  }, [mood])

  // Pick the next recommended topic (first unmastered in first board-available module).
  const nextStep = useMemo(() => {
    const visibleModules = MODULES.filter(m => isAvailableForBoard(m.boards, board.id))
    for (const mod of visibleModules) {
      const topics = mod.topics.map(id => TOPICS[id]).filter(t => t && isAvailableForBoard(t.boards, board.id))
      const total = topics.length
      const complete = topics.filter(t => progress?.[t.id]?.mastered).length
      const next = topics.find(t => !progress?.[t.id]?.mastered)
      if (next) {
        return {
          topic: next,
          moduleName: mod.name,
          lessonProgress: `${complete + 1} of ${total} lessons`,
          value: total ? complete / total : 0,
        }
      }
    }
    return null
  }, [board.id, progress])

  const openNextStep = () => {
    if (!nextStep) { navigate('/learn'); return }
    const t = nextStep.topic
    if (t.hook || (t.lessonSteps && t.lessonSteps.length > 0)) navigate(`/lesson/${t.id}`)
    else if (t.practicalId) navigate(`/practical/${t.practicalId}`)
    else navigate(`/practice/${t.id}`)
  }

  // Today stats — everything comes from existing hooks, same numbers the old
  // HomeScreen uses. No new tracking.
  const masteredCount = Object.values(progress || {}).filter(p => p?.mastered).length
  const streak = stats?.streak || 0
  const xp = stats?.xp || 0
  const daysActive = stats?.streakDates?.length || 0

  const statRows = [
    { key:'lessons', label:'Topics mastered',   value: String(masteredCount), Icon: CheckCircle2 },
    { key:'streak',  label:'Current streak',    value: `${streak} day${streak === 1 ? '' : 's'}`, Icon: Flame },
    { key:'xp',      label:'Total XP',          value: String(xp), Icon: Target },
    { key:'time',    label:'Active days',       value: String(daysActive), Icon: Clock },
  ]

  return (
    <div className="flex flex-col h-full overflow-y-auto" style={{ background:'#080f1e', color:'#e6ecf8' }}>
      {/* Header with settings pill */}
      <div className="px-5 pt-[calc(env(safe-area-inset-top,0px)+16px)] flex flex-col gap-6"
        style={{ paddingBottom: 'calc(96px + env(safe-area-inset-bottom, 0px))' }}>

        <header className="flex items-start justify-between gap-3">
          <div className="flex flex-col gap-1">
            <p className="text-[13px]" style={{ color:'#9fa7bd' }}>{greeting}</p>
            <h1 className="text-[28px] font-semibold leading-tight">{displayName}</h1>
            <p className="text-[13px] mt-1" style={{ color:'#9fa7bd' }}>How are you feeling today?</p>
          </div>
          <button onClick={() => navigate('/settings')} aria-label="Settings"
            className="w-11 h-11 rounded-[12px] flex items-center justify-center active:opacity-80"
            style={{ background:'rgba(255,255,255,0.06)', border:'0.75px solid rgba(255,255,255,0.08)' }}>
            <Settings size={18} />
          </button>
        </header>

        {/* Mood row */}
        <div className="flex items-start justify-between">
          {MOODS.map(m => {
            const active = mood === m.key
            return (
              <button key={m.key} type="button" onClick={() => setMood(m.key)}
                className="flex flex-col items-center gap-2 active:scale-95 transition-transform"
                aria-pressed={active}>
                <span className="block rounded-full transition-all"
                  style={{
                    width: 40, height: 40,
                    background: `radial-gradient(circle at 30% 30%, ${m.from} 0%, ${m.to} 100%)`,
                    boxShadow: active ? `0 0 0 2px #080f1e, 0 0 0 4px ${m.to}, 0 6px 16px -4px ${m.to}` : `0 4px 10px -4px ${m.to}`,
                    transform: active ? 'scale(1.08)' : 'scale(1)',
                  }} />
                <span className="text-[11px] font-medium" style={{ color: active ? '#e6ecf8' : '#9fa7bd' }}>{m.label}</span>
              </button>
            )
          })}
        </div>

        {/* Your Next Step card */}
        <section className="rounded-[16px] border"
          style={{
            borderColor:'rgba(0,212,255,0.25)', borderWidth:'0.75px',
            background:'linear-gradient(145deg, rgba(0,212,255,0.09) 0%, rgba(15,22,41,0.95) 55%)',
          }}>
          <div className="p-5 flex flex-col gap-4">
            <span className="font-mono text-[11px] font-semibold tracking-[0.12em]" style={{ color:'#4ad0ff' }}>
              YOUR NEXT STEP
            </span>
            <h2 className="text-[22px] font-semibold leading-tight">
              {nextStep ? nextStep.topic.title : 'You\'ve mastered everything!'}
            </h2>
            <div className="flex items-center justify-between text-[13px]" style={{ color:'#9fa7bd' }}>
              <span>{nextStep ? nextStep.lessonProgress : 'Browse topics'}</span>
              <span className="flex items-center gap-1.5"><Clock size={13} strokeWidth={2.25} /> ~10 min</span>
            </div>
            <div className="h-1.5 rounded-full overflow-hidden" style={{ background:'rgba(255,255,255,0.08)' }}>
              <div className="h-full rounded-full transition-all"
                style={{ width: `${Math.round((nextStep?.value || 0) * 100)}%`, background:'#00d4ff' }} />
            </div>
            <button onClick={openNextStep}
              className="h-12 rounded-full font-semibold text-[15px] flex items-center justify-center gap-2 active:opacity-90"
              style={{ background:'#00d4ff', color:'#042031' }}>
              {nextStep ? 'Continue Studying' : 'Explore Topics'} <ArrowRight size={16} />
            </button>
          </div>
        </section>

        {/* Today's Progress */}
        <section className="flex flex-col gap-3">
          <h3 className="text-[17px] font-semibold">Your Progress</h3>
          <div className="rounded-[16px] border overflow-hidden"
            style={{ background:'rgba(15,22,41,0.95)', borderColor:'rgba(255,255,255,0.08)', borderWidth:'0.75px' }}>
            {statRows.map((s, i) => (
              <div key={s.key} className="flex items-center gap-3 px-4 py-3.5"
                style={{ borderTop: i === 0 ? 'none' : '0.75px solid rgba(255,255,255,0.06)' }}>
                <s.Icon size={18} strokeWidth={2} color="#9fa7bd" />
                <span className="flex-1 text-[14px]">{s.label}</span>
                <span className="font-semibold text-[14px]" style={{ color:'#00d4ff' }}>{s.value}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Quick actions */}
        <section className="grid grid-cols-2 gap-3">
          <button onClick={() => navigate('/papers')}
            className="rounded-[16px] border p-4 text-left flex flex-col gap-1.5 active:opacity-90"
            style={{ background:'rgba(15,22,41,0.95)', borderColor:'rgba(255,255,255,0.08)', borderWidth:'0.75px' }}>
            <div className="w-9 h-9 rounded-[10px] flex items-center justify-center"
              style={{ background:'rgba(155,89,182,0.18)' }}>
              <Target size={18} color="#c792e7" />
            </div>
            <div className="text-[14px] font-semibold mt-1">Past Papers</div>
            <div className="text-[12px]" style={{ color:'#9fa7bd' }}>Timed 35-mark mini-papers</div>
          </button>
          <button onClick={() => navigate('/grade9')}
            className="rounded-[16px] border p-4 text-left flex flex-col gap-1.5 active:opacity-90"
            style={{ background:'rgba(15,22,41,0.95)', borderColor:'rgba(255,255,255,0.08)', borderWidth:'0.75px' }}>
            <div className="w-9 h-9 rounded-[10px] flex items-center justify-center"
              style={{ background:'rgba(233,30,140,0.14)' }}>
              <Zap size={18} color="#ff6fb2" />
            </div>
            <div className="text-[14px] font-semibold mt-1">Grade 9 Challenge</div>
            <div className="text-[12px]" style={{ color:'#9fa7bd' }}>Stretch yourself</div>
          </button>
        </section>

        {/* Focus banner */}
        {streak > 0 && (
          <section className="rounded-[16px] border p-4 flex items-start gap-3"
            style={{ background:'rgba(182,255,206,0.08)', borderColor:'rgba(182,255,206,0.18)', borderWidth:'0.75px' }}>
            <div className="h-9 w-9 rounded-full flex items-center justify-center shrink-0"
              style={{ background:'rgba(182,255,206,0.12)' }}>
              <Sparkles size={18} strokeWidth={2.25} color="#b6ffce" />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-[14px]" style={{ color:'#b6ffce' }}>
                {streak}-day streak — keep it going!
              </div>
              <div className="text-[12px] mt-0.5" style={{ color:'rgba(182,255,206,0.75)' }}>
                Short daily sessions beat long cram ones.
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
