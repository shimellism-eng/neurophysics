import { motion, AnimatePresence } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import {
  ChevronRight, Zap, Flame, Target, TrendingUp,
  ArrowRight, Calendar, CheckCircle, Clock,
} from 'lucide-react'
import { MODULES, TOPICS } from '../data/topics'
import { useProgress } from '../hooks/useProgress'
import { useInsights } from '../hooks/useInsights'
import { useAuth } from '../context/AuthContext'

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}

function loadProfile() {
  try { return JSON.parse(localStorage.getItem('neurophysics_profile') || '{}') }
  catch { return {} }
}

// ── 7-day streak calendar ─────────────────────────────────────────────────────
function StreakCalendar({ streak }) {
  const labels  = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const today   = new Date().getDay()
  const todayIdx = today === 0 ? 6 : today - 1

  return (
    <div className="flex items-end gap-1.5 mt-4">
      {labels.map((label, i) => {
        const daysAgo = todayIdx >= i ? todayIdx - i : todayIdx - i + 7
        const filled  = daysAgo < streak
        const isToday = i === todayIdx

        return (
          <div key={i} className="flex flex-col items-center gap-1.5 flex-1">
            <div
              style={{
                width: '100%', height: 28, borderRadius: 6,
                background: filled
                  ? isToday ? '#f97316' : 'rgba(249,115,22,0.45)'
                  : 'rgba(255,255,255,0.07)',
                border: isToday && !filled ? '1.5px solid rgba(249,115,22,0.5)' : 'none',
                boxShadow: filled && isToday ? '0 0 10px rgba(249,115,22,0.5)' : 'none',
                position: 'relative', overflow: 'hidden',
              }}
            >
              {filled && isToday && (
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(180deg, rgba(255,255,255,0.2) 0%, transparent 100%)',
                }} />
              )}
            </div>
            <span style={{
              fontSize: 9, fontWeight: isToday ? 700 : 500,
              color: filled
                ? isToday ? '#f97316' : 'rgba(249,115,22,0.55)'
                : 'rgba(255,255,255,0.2)',
              letterSpacing: '0.02em',
            }}>
              {isToday ? 'Today' : label}
            </span>
          </div>
        )
      })}
    </div>
  )
}

// ─── Screen ───────────────────────────────────────────────────────────────────
export default function HomeScreen() {
  const navigate = useNavigate()
  const { progress, stats } = useProgress()
  const { weakTopics, suggestions, overallAccuracy, hasData, reviewDue } = useInsights()
  const { user } = useAuth()
  const profile  = loadProfile()

  const rawName = profile.name || user?.user_metadata?.full_name || user?.user_metadata?.name
    || user?.email?.split('@')[0] || 'Learner'
  const displayName = rawName.split(' ')[0]
  const avatar   = profile.avatar || '🧠'
  const greeting = getGreeting()

  const masteredCount = Object.values(progress).filter(p => p.mastered).length
  const totalTopics   = Object.keys(TOPICS).length
  const progressPct   = totalTopics > 0 ? Math.round((masteredCount / totalTopics) * 100) : 0
  const streak        = stats.streak || 0
  const xp            = stats.xp || 0

  const allTopicIds     = MODULES.flatMap(m => m.topics)
  const firstUnmastered = allTopicIds.find(id => !progress[id]?.mastered) || allTopicIds[0]
  const resumeTopic     = TOPICS[firstUnmastered]
  const resumeModule    = MODULES.find(m => m.topics.includes(firstUnmastered))
  const moduleColor     = resumeModule?.color || '#6366f1'

  // Exam countdown
  const examDaysLeft = (() => {
    if (!profile.examDate) return null
    const d = Math.ceil((new Date(profile.examDate) - new Date()) / 86400000)
    return d > 0 && d <= 365 ? d : null
  })()

  // Deduplicate: weak topics first, then suggestions that aren't already shown
  const filteredWeak = weakTopics.filter(
    w => w.id !== firstUnmastered && w.accuracy < 0.65
  )
  const weakIds = new Set(filteredWeak.map(w => w.id))
  const filteredSuggestions = suggestions.filter(
    s => s.id !== firstUnmastered && !weakIds.has(s.id)
  )

  return (
    <div
      className="flex flex-col h-full overflow-y-auto"
      style={{ background: '#080f1e', paddingTop: 'env(safe-area-inset-top, 16px)', paddingBottom: 96 }}
    >

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <div
        className="px-5 pt-6 pb-6"
        style={{ background: `radial-gradient(ellipse 130% 90% at 50% -10%, ${moduleColor}16 0%, transparent 65%)` }}
      >
        <motion.div
          className="flex items-center gap-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Avatar */}
          <div
            className="flex items-center justify-center text-3xl shrink-0"
            style={{
              width: 60, height: 60, borderRadius: 18,
              background: 'linear-gradient(135deg, rgba(99,102,241,0.28), rgba(21,93,252,0.15))',
              border: '1.5px solid rgba(99,102,241,0.38)',
              boxShadow: '0 0 0 4px rgba(99,102,241,0.07), 0 8px 20px rgba(99,102,241,0.18)',
            }}
          >
            {avatar}
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-widest mb-0.5" style={{ color: '#6366f1' }}>
              {greeting}
            </p>
            <h1 className="font-bold leading-tight truncate" style={{ color: '#f8fafc', fontSize: 24, letterSpacing: '-0.03em' }}>
              {displayName}
            </h1>

            <div className="flex items-center gap-2 mt-2 flex-wrap">
              {xp >= 5 ? (
                <span className="font-bold px-2.5 py-1 rounded-full flex items-center gap-1"
                  style={{ fontSize: 11, background: 'rgba(253,199,0,0.12)', color: '#fdc700', border: '1px solid rgba(253,199,0,0.22)' }}>
                  <Zap size={11} /> {xp} XP
                </span>
              ) : (
                <span className="font-semibold px-2.5 py-1 rounded-full"
                  style={{ fontSize: 11, background: 'rgba(99,102,241,0.1)', color: '#818cf8' }}>
                  First XP incoming
                </span>
              )}

              {masteredCount > 0 && (
                <span className="font-bold px-2.5 py-1 rounded-full flex items-center gap-1"
                  style={{ fontSize: 11, background: 'rgba(34,197,94,0.1)', color: '#22c55e', border: '1px solid rgba(34,197,94,0.2)' }}>
                  <CheckCircle size={11} /> {masteredCount} mastered
                </span>
              )}

              {examDaysLeft && (
                <span className="font-bold px-2.5 py-1 rounded-full flex items-center gap-1"
                  style={{
                    fontSize: 11,
                    background: examDaysLeft <= 30 ? 'rgba(239,68,68,0.1)' : 'rgba(99,102,241,0.1)',
                    color: examDaysLeft <= 30 ? '#f87171' : '#818cf8',
                    border: `1px solid ${examDaysLeft <= 30 ? 'rgba(239,68,68,0.2)' : 'rgba(99,102,241,0.2)'}`,
                  }}>
                  {examDaysLeft <= 30 ? '🔥' : '📅'} {examDaysLeft}d to exam
                </span>
              )}
            </div>
          </div>
        </motion.div>

        {/* Progress bar — only once started */}
        {progressPct > 0 && (
          <motion.div className="mt-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            <div className="w-full rounded-full overflow-hidden" style={{ height: 6, background: 'rgba(255,255,255,0.06)' }}>
              <motion.div className="h-full rounded-full"
                style={{ background: `linear-gradient(90deg, #6366f1, ${moduleColor})` }}
                initial={{ width: 0 }}
                animate={{ width: `${progressPct}%` }}
                transition={{ delay: 0.5, duration: 1, ease: 'easeOut' }}
              />
            </div>
            <div className="flex items-center justify-between mt-1.5">
              <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.28)', fontWeight: 600, letterSpacing: '0.05em' }}>
                GCSE Physics
              </p>
              <p style={{ fontSize: 11, fontWeight: 700, color: moduleColor }}>
                {masteredCount}/{totalTopics} topics
              </p>
            </div>
          </motion.div>
        )}
      </div>

      {/* ── PRIMARY CTA ──────────────────────────────────────────────────────── */}
      <div className="px-5 mb-5">
        <motion.button
          className="w-full rounded-[22px] flex items-center justify-between"
          style={{
            padding: '20px 20px',
            background: resumeModule
              ? `linear-gradient(135deg, ${resumeModule.color}e8, ${resumeModule.color}88)`
              : 'linear-gradient(135deg, #6366f1, #4f46e5)',
            boxShadow: `0 6px 0 rgba(0,0,0,0.22), 0 16px 36px ${moduleColor}38`,
            color: '#fff',
          }}
          onClick={() => navigate(`/lesson/${firstUnmastered}`)}
          whileTap={{ y: 4, boxShadow: `0 2px 0 rgba(0,0,0,0.15), 0 4px 12px ${moduleColor}22` }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-3.5">
            {resumeModule && (
              <div className="rounded-[14px] flex items-center justify-center shrink-0"
                style={{ width: 48, height: 48, background: 'rgba(255,255,255,0.18)' }}>
                <resumeModule.icon size={24} color="#fff" strokeWidth={1.8} />
              </div>
            )}
            <div className="text-left">
              <div className="font-bold uppercase tracking-wider opacity-75 mb-0.5" style={{ fontSize: 10 }}>
                {masteredCount === 0 ? 'Start here' : 'Continue learning'}
              </div>
              <div className="font-bold" style={{ fontSize: 17, letterSpacing: '-0.02em' }}>
                {resumeTopic?.title || 'Energy Stores'}
              </div>
              {resumeModule && (
                <div className="opacity-65 mt-0.5" style={{ fontSize: 12 }}>{resumeModule.name}</div>
              )}
            </div>
          </div>
          <motion.div
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronRight size={24} strokeWidth={2.5} />
          </motion.div>
        </motion.button>
      </div>

      {/* ── STREAK ───────────────────────────────────────────────────────────── */}
      <div className="px-5 mb-5">
        <motion.div
          className="rounded-[22px] px-5 py-5"
          style={{
            background: streak > 0
              ? 'linear-gradient(135deg, rgba(249,115,22,0.18) 0%, rgba(15,22,41,0.97) 60%)'
              : 'rgba(255,255,255,0.03)',
            border: streak > 0 ? '1px solid rgba(249,115,22,0.35)' : '1px solid rgba(255,255,255,0.07)',
            boxShadow: streak > 0 ? '0 4px 32px rgba(249,115,22,0.1)' : 'none',
          }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-start gap-3.5">
            <motion.div
              animate={streak > 0 ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              style={{ paddingTop: 2 }}
            >
              <Flame
                size={streak > 0 ? 34 : 22}
                color={streak > 0 ? '#f97316' : 'rgba(255,255,255,0.18)'}
                strokeWidth={1.5}
              />
            </motion.div>

            <div className="flex-1 min-w-0">
              {streak > 0 ? (
                <>
                  <div className="font-bold" style={{ color: '#f97316', fontSize: 20, letterSpacing: '-0.02em' }}>
                    {streak} day streak
                  </div>
                  <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.38)' }}>
                    Study today to keep it going
                  </p>
                </>
              ) : (
                <>
                  <div className="font-bold" style={{ color: '#f8fafc', fontSize: 16 }}>
                    Start your streak today
                  </div>
                  <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.32)' }}>
                    Complete one topic to light it up
                  </p>
                </>
              )}
              <StreakCalendar streak={streak} />
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── REVIEW DUE ───────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {reviewDue.length > 0 && (
          <motion.div
            className="px-5 mb-5"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.28 }}
          >
            <div className="rounded-[22px] px-5 py-5"
              style={{ background: 'rgba(99,102,241,0.07)', border: '1px solid rgba(99,102,241,0.2)' }}>
              <div className="flex items-center gap-2 mb-1">
                <Calendar size={13} color="#818cf8" />
                <span style={{ fontSize: 11, fontWeight: 700, color: '#818cf8', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  Time to revisit
                </span>
                <span className="ml-auto text-xs font-bold px-2 py-0.5 rounded-full"
                  style={{ background: 'rgba(99,102,241,0.18)', color: '#a5b4fc' }}>
                  {reviewDue.length}
                </span>
              </div>
              <p className="text-xs mb-3.5" style={{ color: 'rgba(255,255,255,0.32)' }}>
                Spaced practice locks it into long-term memory
              </p>
              <div className="flex flex-wrap gap-2">
                {reviewDue.slice(0, 3).map(({ id, topic }) => (
                  <motion.button
                    key={id}
                    className="flex items-center gap-1.5 px-4 rounded-full text-xs font-semibold"
                    style={{
                      height: 44,
                      background: topic.moduleColor ? `${topic.moduleColor}18` : 'rgba(99,102,241,0.15)',
                      border: `1px solid ${topic.moduleColor ? `${topic.moduleColor}32` : 'rgba(99,102,241,0.28)'}`,
                      color: topic.moduleColor || '#818cf8',
                    }}
                    onClick={() => navigate(`/lesson/${id}`)}
                    whileTap={{ scale: 0.95 }}
                  >
                    {topic.title} <ChevronRight size={10} strokeWidth={2.5} />
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── INSIGHTS — gated: real data + non-empty after dedup ──────────────── */}
      <AnimatePresence>
        {hasData && (filteredWeak.length > 0 || filteredSuggestions.length > 0) && (
          <motion.div
            className="px-5 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.32 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp size={13} color="#6366f1" />
              <span style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.38)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Insights
              </span>
              {overallAccuracy !== null && overallAccuracy > 0 && (
                <span className="ml-auto text-xs font-bold px-2.5 py-0.5 rounded-full"
                  style={{
                    background: overallAccuracy >= 0.7 ? 'rgba(34,197,94,0.1)' : 'rgba(249,115,22,0.1)',
                    color: overallAccuracy >= 0.7 ? '#22c55e' : '#f97316',
                  }}>
                  {Math.round(overallAccuracy * 100)}% accuracy
                </span>
              )}
            </div>

            {/* Ready to practise */}
            {filteredWeak.length > 0 && (
              <div className="mb-4">
                <p className="text-xs font-semibold mb-2" style={{ color: 'rgba(255,255,255,0.35)' }}>
                  Ready to practise
                </p>
                <div className="space-y-2">
                  {filteredWeak.map((x, i) => (
                    <motion.button
                      key={x.id}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-[16px] text-left"
                      style={{ background: 'rgba(249,115,22,0.05)', border: '1px solid rgba(249,115,22,0.18)', minHeight: 56 }}
                      onClick={() => navigate(`/diagnostic/${x.id}`)}
                      whileTap={{ scale: 0.97 }}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.35 + i * 0.05 }}
                    >
                      <div className="w-10 h-10 rounded-[12px] flex items-center justify-center shrink-0 text-xs font-bold"
                        style={{ background: `${x.topic.moduleColor}18`, color: x.topic.moduleColor, border: `1px solid ${x.topic.moduleColor}30` }}>
                        {Math.round(x.accuracy * 100)}%
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-bold truncate" style={{ color: '#f8fafc' }}>{x.topic.title}</div>
                        <div className="text-xs" style={{ color: 'rgba(255,255,255,0.32)' }}>Tap to practise</div>
                      </div>
                      <ArrowRight size={15} color={x.topic.moduleColor} />
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Up next — deduplicated from weak list */}
            {filteredSuggestions.length > 0 && (
              <div>
                <p className="text-xs font-semibold mb-2" style={{ color: 'rgba(255,255,255,0.35)' }}>
                  Up next
                </p>
                <div className="flex gap-2.5 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
                  {filteredSuggestions.slice(0, 4).map((x, i) => (
                    <motion.button
                      key={x.id}
                      className="flex-shrink-0 w-36 flex flex-col gap-2 px-3 py-3 rounded-[16px] text-left"
                      style={{ background: `${x.topic.moduleColor}0d`, border: `1px solid ${x.topic.moduleColor}28`, minHeight: 44 }}
                      onClick={() => navigate(x.reason === 'needs work' ? `/diagnostic/${x.id}` : `/lesson/${x.id}`)}
                      whileTap={{ scale: 0.96 }}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.38 + i * 0.06 }}
                    >
                      <div className="w-7 h-7 rounded-[8px] flex items-center justify-center"
                        style={{ background: `${x.topic.moduleColor}20` }}>
                        <Target size={13} color={x.topic.moduleColor} />
                      </div>
                      <div className="text-xs font-semibold leading-snug" style={{ color: '#f8fafc' }}>
                        {x.topic.title}
                      </div>
                      <div className="text-[10px] px-1.5 py-0.5 rounded-full self-start font-semibold"
                        style={{
                          background: x.reason === 'needs work' ? 'rgba(249,115,22,0.14)' : 'rgba(99,102,241,0.14)',
                          color: x.reason === 'needs work' ? '#f97316' : '#818cf8',
                        }}>
                        {x.reason === 'needs work' ? 'Review' : 'Continue'}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── TIMED PAPER PROMO — unlocked at 10+ topics mastered ─────────────── */}
      {masteredCount >= 10 && (
        <motion.div className="px-5 mb-5" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.38 }}>
          <motion.button
            className="w-full rounded-[22px] flex items-center justify-between px-5 py-4"
            style={{
              background: 'linear-gradient(135deg, rgba(99,102,241,0.2) 0%, rgba(99,102,241,0.08) 100%)',
              border: '1px solid rgba(99,102,241,0.35)',
              boxShadow: '0 4px 24px rgba(99,102,241,0.12)',
            }}
            onClick={() => navigate('/timed-paper')}
            whileTap={{ scale: 0.97 }}
          >
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-[14px] flex items-center justify-center shrink-0"
                style={{ background: 'rgba(99,102,241,0.18)', border: '1px solid rgba(99,102,241,0.35)' }}>
                <Clock size={22} color="#818cf8" strokeWidth={1.8} />
              </div>
              <div className="text-left">
                <div className="text-[10px] font-bold uppercase tracking-wider mb-0.5" style={{ color: '#6366f1' }}>
                  You've mastered {masteredCount} topics
                </div>
                <div className="font-bold" style={{ color: '#f8fafc', fontSize: 16, letterSpacing: '-0.02em' }}>
                  Try a Timed Paper
                </div>
                <div className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.38)' }}>
                  Exam-style · 35 marks · 55 min
                </div>
              </div>
            </div>
            <ChevronRight size={20} color="rgba(99,102,241,0.6)" strokeWidth={2.5} />
          </motion.button>
        </motion.div>
      )}

    </div>
  )
}
