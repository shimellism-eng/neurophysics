import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { BookOpen, ChatCircle, Lightning, Target } from '@phosphor-icons/react'
import { MODULES, TOPICS } from '../data/topics'
import { useProgress } from '../hooks/useProgress'
import { useStudyPlan } from '../hooks/useStudyPlan'
import { getSelectedBoard, getSelectedCourse } from '../utils/boardConfig'
import { getVisibleTopicIdsForSelection, isModuleAvailableForSelection } from '../utils/curriculumFilters'
import { getCurriculumModules } from '../features/curriculum/curriculumOrder'
import SafeAreaPage from '../components/ui/SafeAreaPage'

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}

function QuickAction({ icon: Icon, label, meta, onClick, accent = 'var(--np-accent-soft)', iconColor = 'var(--np-accent-strong)' }) {
  return (
    <button
      onClick={onClick}
      className="rounded-[18px] px-4 py-4 text-left transition-opacity active:opacity-80"
      style={{ background: 'var(--surface-panel)', border: 'var(--border-quiet)', boxShadow: 'var(--shadow-card)' }}
    >
      <div className="w-10 h-10 rounded-[14px] flex items-center justify-center mb-3" style={{ background: accent, color: iconColor }}>
        <Icon size={18} />
      </div>
      <div className="text-[0.98rem] font-semibold leading-tight" style={{ color: 'var(--np-text)', fontFamily: 'var(--font-display)', letterSpacing: '-0.025em' }}>
        {label}
      </div>
      <div className="text-xs mt-1 leading-snug" style={{ color: 'var(--np-text-muted)' }}>
        {meta}
      </div>
    </button>
  )
}

export default function HomeScreen() {
  const navigate = useNavigate()
  const { progress } = useProgress()
  const { todayTopicId } = useStudyPlan(progress)
  const board = getSelectedBoard()
  const course = getSelectedCourse()
  const [userName, setUserName] = useState('')

  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem('neurophysics_profile') || '{}')
    setUserName(profile.name || '')
  }, [])

  const resumeData = (() => {
    try { return JSON.parse(localStorage.getItem('np_lesson_break') || 'null') }
    catch { return null }
  })()

  const visibleModules = getCurriculumModules(MODULES, board.id, course).filter(m => isModuleAvailableForSelection(m, board.id, course))
  const allTopicIds = visibleModules.flatMap(m => getVisibleTopicIdsForSelection(m.topics, board.id, course).filter(id => TOPICS[id]))
  const activeTopicId = todayTopicId || allTopicIds.find(id => !progress[id]?.mastered) || null
  const activeTopic = activeTopicId ? TOPICS[activeTopicId] : null
  const activeModule = visibleModules.find(m => m.topics.includes(activeTopicId))
  const ActiveIcon = activeModule?.icon || BookOpen
  const completedCount = allTopicIds.filter(id => progress[id]?.mastered).length
  const totalTopics = allTopicIds.length
  const progressPct = totalTopics > 0 ? Math.round((completedCount / totalTopics) * 100) : 0
  const remainingCount = Math.max(totalTopics - completedCount, 0)
  const learnerLabel = userName || 'Learner'
  const learnerInitial = learnerLabel.trim().charAt(0).toUpperCase() || 'L'

  return (
    <SafeAreaPage
      hasNav
      ownsTopInset
      className="min-h-screen"
      style={{ background: 'radial-gradient(circle at 50% -18%, rgba(94,167,161,0.12), transparent 34%), linear-gradient(180deg, #07111d 0%, #091420 52%, #07111d 100%)' }}
    >
      <div className="px-5 pt-4 pb-6" style={{ paddingBottom: 'calc(var(--page-bottom-gap) + 8px)' }}>
        <div className="flex items-center gap-4 mb-7">
          <div
            className="w-[64px] h-[64px] rounded-[22px] flex items-center justify-center shrink-0"
            style={{
              background: 'linear-gradient(180deg, rgba(94,167,161,0.18), rgba(94,167,161,0.08))',
              border: '1px solid rgba(94,167,161,0.22)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)',
            }}
          >
            <span style={{ color: 'var(--np-accent-strong)', fontFamily: 'var(--font-display)', fontSize: '1.65rem', fontWeight: 800 }}>
              {learnerInitial}
            </span>
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-[0.82rem] font-semibold mb-1" style={{ color: 'var(--np-accent-strong)', letterSpacing: '-0.01em' }}>
              {getGreeting()}
            </p>
            <h1
              className="text-[1.95rem] font-bold leading-[0.98]"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--np-text)', letterSpacing: '-0.05em' }}
            >
              {learnerLabel}
            </h1>
            <div className="flex flex-wrap gap-2 mt-3">
              <span
                className="inline-flex items-center rounded-full px-3 py-1.5 text-[11px] font-semibold"
                style={{ background: 'rgba(94,167,161,0.10)', color: 'var(--np-accent-strong)', border: '1px solid rgba(94,167,161,0.18)' }}
              >
                {board.name}
              </span>
              <span
                className="inline-flex items-center rounded-full px-3 py-1.5 text-[11px] font-semibold"
                style={{ background: 'rgba(255,255,255,0.04)', color: 'var(--np-text-mid)', border: '1px solid rgba(255,255,255,0.07)' }}
              >
                {completedCount}/{totalTopics} complete
              </span>
            </div>
          </div>
        </div>

        {activeTopic && (
          <button
            onClick={() => navigate(`/lesson/${resumeData?.topicId || activeTopicId}`)}
            className="w-full rounded-[26px] p-5 text-left transition-transform active:scale-[0.99]"
            style={{
              background: 'linear-gradient(135deg, #4d8b86 0%, #346864 100%)',
              color: 'white',
              boxShadow: '0 20px 48px rgba(0,0,0,0.24)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <div className="text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: 'rgba(255,255,255,0.8)' }}>
              {resumeData ? 'Continue' : 'Do this next'}
            </div>
            <div className="grid grid-cols-[52px_minmax(0,1fr)_auto] gap-3 items-center mt-3">
              <div
                className="w-[52px] h-[52px] rounded-[16px] flex items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.14)', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                <ActiveIcon size={24} color="white" />
              </div>
              <div className="min-w-0">
                <div
                  className="text-[1.45rem] font-bold leading-[1.03]"
                  style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.045em', overflowWrap: 'anywhere' }}
                >
                  {activeTopic.title}
                </div>
                <div className="text-[13px] mt-1" style={{ color: 'rgba(255,255,255,0.75)' }}>
                  {activeModule?.name || 'GCSE Physics'}
                </div>
              </div>
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.08)' }}>
                <span style={{ fontSize: '1.4rem', lineHeight: 1, color: 'white' }}>›</span>
              </div>
            </div>
          </button>
        )}

        <div className="grid gap-3 mt-4">
          <div className="np-card-quiet p-4">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: 'var(--np-text-dim)' }}>
                  Progress
                </div>
                <div className="text-[1.05rem] font-semibold mt-1" style={{ color: 'var(--np-text)', fontFamily: 'var(--font-display)', letterSpacing: '-0.025em' }}>
                  {completedCount} complete, {remainingCount} left
                </div>
                <div className="text-xs mt-1" style={{ color: 'var(--np-text-muted)' }}>
                  {progressPct}% of your course is finished.
                </div>
              </div>
              <div
                className="w-[54px] h-[54px] rounded-full flex items-center justify-center shrink-0 text-sm font-bold"
                style={{
                  color: 'var(--np-accent-strong)',
                  background: `conic-gradient(var(--np-accent) 0 ${progressPct * 3.6}deg, rgba(255,255,255,0.08) ${progressPct * 3.6}deg 360deg)`,
                }}
              >
                <div className="w-[42px] h-[42px] rounded-full flex items-center justify-center" style={{ background: 'var(--np-card-deep)' }}>
                  {progressPct}%
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <QuickAction
              icon={BookOpen}
              label="Learn"
              meta="Browse topics"
              onClick={() => navigate('/learn')}
            />
            <QuickAction
              icon={Lightning}
              label="Practice"
              meta="Quick Win, mixed, adaptive"
              onClick={() => navigate('/practice-tools')}
              accent="rgba(129,140,248,0.14)"
              iconColor="#a5b4fc"
            />
            <QuickAction
              icon={Target}
              label="Timed paper"
              meta="Exam timing"
              onClick={() => navigate('/timed-paper')}
              accent="rgba(216,139,45,0.14)"
              iconColor="var(--np-amber)"
            />
            <QuickAction
              icon={ChatCircle}
              label="Mamo"
              meta="Ask for help"
              onClick={() => navigate('/mamo')}
            />
          </div>
        </div>
      </div>
    </SafeAreaPage>
  )
}
