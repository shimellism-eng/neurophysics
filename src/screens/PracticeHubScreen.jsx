import { useCallback, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { BookOpen, Lightning, Shuffle, Target } from '@phosphor-icons/react'
import PageHeader from '../components/PageHeader'
import SafeAreaPage from '../components/ui/SafeAreaPage'
import { MODULES, TOPICS } from '../data/topics'
import { getSelectedBoard, getSelectedCourse } from '../utils/boardConfig'
import { getVisibleTopicIdsForSelection, isModuleAvailableForSelection } from '../utils/curriculumFilters'

const RUNTIME_ADAPTIVE_TOPIC_IDS_BY_BOARD = {
  aqa: new Set([
    'ac_generators',
    'atomic_structure',
    'circuit_basics',
    'circuit_components',
    'efficiency',
    'em_spectrum',
    'energy_equations',
    'energy_pathways',
    'energy_stores',
    'force_interactions',
    'hookes_law',
    'internal_energy',
    'magnetism_fields',
    'motion_graphs',
    'national_grid',
    'newtons_laws',
    'nuclear_equations',
    'power_calc',
    'radiation_hazards',
    'radioactive_decay',
    'redshift',
    'series_parallel',
    'solar_system',
    'sound_ultrasound',
    'specific_latent_heat',
    'states_density',
    'stellar_evolution',
    'transformers',
    'visible_light',
    'wave_properties',
    'work_done',
  ]),
  edexcel: new Set([
    'atomic_structure',
    'circuit_components',
    'domestic_electricity',
    'efficiency',
    'electrical_power',
    'electromagnetism',
    'em_induction',
    'energy_equations',
    'energy_resources',
    'energy_stores',
    'equations_of_motion',
    'fluid_pressure',
    'gas_pressure',
    'half_life',
    'lenses',
    'moments',
    'momentum',
    'motor_effect',
    'nuclear_fission',
    'radiation_hazards',
    'series_parallel',
    'solar_system',
    'sound_ultrasound',
    'specific_latent_heat',
    'states_density',
    'stellar_evolution',
    'stopping_distance',
    'wave_properties',
    'wave_reflection',
    'wave_types',
  ]),
}

function ToolCard({ icon: Icon, title, body, accent, border, onClick, actionLabel = 'Open' }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full rounded-[20px] p-4 text-left transition-opacity active:opacity-85"
      style={{
        background: 'var(--surface-panel)',
        border,
        boxShadow: 'var(--shadow-card)',
      }}
    >
      <div className="flex items-start gap-3">
        <div
          className="w-11 h-11 rounded-[14px] flex items-center justify-center shrink-0"
          style={{ background: accent }}
        >
          <Icon size={18} color="var(--np-text)" />
        </div>
        <div className="min-w-0 flex-1">
          <div
            className="text-[1rem] font-semibold leading-tight"
            style={{ color: 'var(--np-text)', fontFamily: 'var(--font-display)', letterSpacing: '-0.025em' }}
          >
            {title}
          </div>
          <div className="text-xs mt-1 leading-snug" style={{ color: 'var(--np-text-muted)' }}>
            {body}
          </div>
          <div className="text-xs font-semibold mt-3" style={{ color: 'var(--np-accent-strong)' }}>
            {actionLabel}
          </div>
        </div>
      </div>
    </button>
  )
}

export default function PracticeHubScreen() {
  const navigate = useNavigate()
  const location = useLocation()
  const [showAdaptiveTopics, setShowAdaptiveTopics] = useState(false)
  const board = getSelectedBoard()
  const course = getSelectedCourse()
  const supportedAdaptiveTopicIds = RUNTIME_ADAPTIVE_TOPIC_IDS_BY_BOARD[board.id] || new Set()

  const safeExit = useCallback(() => {
    const from = location.state?.from
    if (typeof from === 'string' && from.startsWith('/')) {
      navigate(from, { replace: true })
      return
    }

    const historyIndex = window.history?.state?.idx
    if (typeof historyIndex === 'number' && historyIndex > 0) {
      navigate(-1)
      return
    }

    navigate('/', { replace: true })
  }, [location.state, navigate])

  const adaptiveModules = useMemo(() => (
    MODULES
      .filter((module) => isModuleAvailableForSelection(module, board.id, course))
      .map((module) => ({
        ...module,
        topicIds: getVisibleTopicIdsForSelection(module.topics, board.id, course)
          .filter((id) => supportedAdaptiveTopicIds.has(id))
          .filter((id) => Boolean(TOPICS[id])),
      }))
      .filter((module) => module.topicIds.length > 0)
  ), [board.id, course, supportedAdaptiveTopicIds])

  return (
    <SafeAreaPage
      hasNav
      ownsTopInset
      className="min-h-screen"
      style={{ background: 'radial-gradient(circle at 50% -18%, rgba(94,167,161,0.12), transparent 34%), linear-gradient(180deg, #07111d 0%, #091420 52%, #07111d 100%)' }}
    >
      <PageHeader
        onBack={safeExit}
        title="Practice"
        subtitle={`${board.name} · ${course === 'physics_only' ? 'Physics only' : 'Combined science'}`}
      />

      <div className="px-5 pt-4 pb-6 space-y-4">
        <div className="np-card-quiet p-4">
          <div className="text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: 'var(--np-text-dim)' }}>
            Practice tools
          </div>
          <div
            className="text-[1.05rem] font-semibold mt-2"
            style={{ color: 'var(--np-text)', fontFamily: 'var(--font-display)', letterSpacing: '-0.025em' }}
          >
            Pick a short burst, a mixed set, or a focused adaptive session.
          </div>
          <div className="text-xs mt-2" style={{ color: 'var(--np-text-muted)' }}>
            These tools use your current board and course settings automatically.
          </div>
        </div>

        <div className="space-y-3">
          <ToolCard
            icon={Lightning}
            title="Quick Win"
            body="A short confidence-building set when you want a fast revision boost."
            accent="rgba(94,167,161,0.16)"
            border="1px solid rgba(94,167,161,0.18)"
            onClick={() => navigate('/quickwin', { state: { from: '/practice-tools' } })}
          />

          <ToolCard
            icon={Shuffle}
            title="Mixed Practice"
            body="Interleaved questions across topics so you can switch and retrieve ideas flexibly."
            accent="rgba(216,139,45,0.14)"
            border="1px solid rgba(216,139,45,0.2)"
            onClick={() => navigate('/mixed-revision', { state: { from: '/practice-tools' } })}
          />

          <ToolCard
            icon={Target}
            title="Adaptive Practice"
            body="Choose one topic and let the app keep practice close to your current level."
            accent="rgba(129,140,248,0.14)"
            border="1px solid rgba(129,140,248,0.2)"
            actionLabel={showAdaptiveTopics ? 'Hide topics' : 'Choose a topic'}
            onClick={() => setShowAdaptiveTopics((value) => !value)}
          />
        </div>

        {showAdaptiveTopics && (
          <div className="np-card-quiet p-4 space-y-4">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: 'var(--np-text-dim)' }}>
                Adaptive topics
              </div>
              <div className="text-sm mt-1" style={{ color: 'var(--np-text-muted)' }}>
                Pick a topic to open focused practice. Learn still keeps its lesson-first flow.
              </div>
            </div>

            <div className="space-y-4">
              {adaptiveModules.length ? adaptiveModules.map((module) => (
                <div key={module.name} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: `${module.color}1a`, border: `1px solid ${module.color}2a` }}
                    >
                      {module.icon ? <module.icon size={14} color={module.color} /> : <BookOpen size={14} color={module.color} />}
                    </div>
                    <div className="text-sm font-semibold" style={{ color: 'var(--np-text)' }}>
                      {module.name}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {module.topicIds.map((id) => (
                      <button
                        key={id}
                        type="button"
                        onClick={() => navigate(`/practice/${id}`, { state: { from: '/practice-tools' } })}
                        className="px-3 py-2 rounded-full text-xs font-semibold transition-opacity active:opacity-85"
                        style={{
                          background: 'rgba(255,255,255,0.04)',
                          border: '1px solid rgba(255,255,255,0.08)',
                          color: 'var(--np-text)',
                        }}
                      >
                        {TOPICS[id]?.title || id}
                      </button>
                    ))}
                  </div>
                </div>
              )) : (
                <div className="rounded-[16px] px-4 py-4" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <div className="text-sm font-semibold" style={{ color: 'var(--np-text)' }}>
                    No adaptive topics available yet
                  </div>
                  <div className="text-xs mt-1" style={{ color: 'var(--np-text-muted)' }}>
                    Adaptive Practice is currently available only for topics that already have runtime-backed question support for {board.name}.
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </SafeAreaPage>
  )
}
