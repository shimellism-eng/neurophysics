/**
 * EquationDrillScreen — AQA Equation Recall Drill
 * Route: /equation-drill
 *
 * MCQ format. Student selects a topic group, answers equation recall Qs,
 * sees "must memorise" vs "on equation sheet" labels, and gets a session
 * summary at the end. Optimised for AQA but useful for all boards.
 */
import { useState, useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { CaretRight, CheckCircle, XCircle, Lightbulb, ArrowCounterClockwise, BookmarkSimple } from '@phosphor-icons/react'
import examEquations from '../data/examEquations'
import PageHeader from '../components/PageHeader'

// ── Helpers ───────────────────────────────────────────────────────────────────
function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// Friendly display names for each equation group
const GROUP_LABELS = {
  energy_equations:       'Energy Equations',
  efficiency:             'Efficiency',
  power_calc:             'Power',
  circuit_basics:         'Circuit Basics (V = IR)',
  electrical_power:       'Electrical Power',
  wave_properties:        'Wave Properties',
  fluid_pressure:         'Pressure',
  newtons_laws:           "Newton's Laws",
  momentum:               'Momentum',
  specific_latent_heat:   'Specific Latent Heat',
  national_grid:          'National Grid',
  total_internal_reflection: 'Total Internal Reflection',
  electromagnetism:       'Electromagnetism',
  ac_generators:          'AC Generators',
  series_parallel:        'Series & Parallel Circuits',
  domestic_electricity:   'Domestic Electricity',
  static_electricity:     'Static Electricity',
  force_interactions:     'Force Interactions',
  work_done:              'Work Done',
  moments:                'Moments',
  sound_ultrasound:       'Sound & Ultrasound',
  em_spectrum:            'EM Spectrum',
  lenses:                 'Lenses',
  magnetism_fields:       'Magnetism & Fields',
  motor_effect:           'Motor Effect',
  transformers:           'Transformers',
  energy_pathways:        'Energy Pathways',
  radioactive_decay:      'Radioactive Decay',
}

// Accent colour per broad topic area
const GROUP_COLORS = {
  energy_equations: '#f59e0b',
  efficiency: '#f59e0b',
  power_calc: '#f59e0b',
  circuit_basics: '#00bc7d',
  electrical_power: '#00bc7d',
  series_parallel: '#00bc7d',
  domestic_electricity: '#00bc7d',
  static_electricity: '#00bc7d',
  national_grid: '#00bc7d',
  wave_properties: '#38bdf8',
  sound_ultrasound: '#38bdf8',
  em_spectrum: '#38bdf8',
  lenses: '#38bdf8',
  total_internal_reflection: '#38bdf8',
  fluid_pressure: '#fb923c',
  newtons_laws: '#fb923c',
  momentum: '#fb923c',
  work_done: '#fb923c',
  moments: '#fb923c',
  force_interactions: '#fb923c',
  specific_latent_heat: '#a78bfa',
  electromagnetism: '#f472b6',
  ac_generators: '#f472b6',
  magnetism_fields: '#f472b6',
  motor_effect: '#f472b6',
  transformers: '#f472b6',
  energy_pathways: '#f59e0b',
  radioactive_decay: '#6366f1',
}

const ALL_KEY = '__all__'

export default function EquationDrillScreen() {
  const navigate = useNavigate()

  // ── Phase: 'pick' → 'quiz' → 'done'
  const [phase, setPhase] = useState('pick')
  const [selectedGroup, setSelectedGroup] = useState(null)

  // ── Quiz state
  const [questions, setQuestions] = useState([])
  const [qIndex, setQIndex] = useState(0)
  const [chosen, setChosen] = useState(null)      // index the student tapped
  const [revealed, setRevealed] = useState(false)
  const [showSen, setShowSen] = useState(false)
  const [results, setResults] = useState([])       // { correct: bool }

  const accent = selectedGroup ? (GROUP_COLORS[selectedGroup] || '#6366f1') : '#6366f1'

  // ── Build question list when group is chosen
  const startDrill = useCallback((groupKey) => {
    let qs
    if (groupKey === ALL_KEY) {
      qs = Object.values(examEquations).flat()
    } else {
      qs = examEquations[groupKey] || []
    }
    setSelectedGroup(groupKey)
    setQuestions(shuffle(qs))
    setQIndex(0)
    setChosen(null)
    setRevealed(false)
    setShowSen(false)
    setResults([])
    setPhase('quiz')
  }, [])

  const currentQ = questions[qIndex]

  // ── Handle option tap
  const handleChoose = useCallback((idx) => {
    if (revealed) return
    setChosen(idx)
    setRevealed(true)
  }, [revealed])

  // ── Move to next question or finish
  const handleNext = useCallback(() => {
    const isCorrect = chosen === currentQ.correctAnswer
    const newResults = [...results, { correct: isCorrect }]
    setResults(newResults)

    if (qIndex + 1 >= questions.length) {
      setPhase('done')
    } else {
      setQIndex(i => i + 1)
      setChosen(null)
      setRevealed(false)
      setShowSen(false)
    }
  }, [chosen, currentQ, qIndex, questions.length, results])

  // ── Summary stats
  const correct = results.filter(r => r.correct).length
  const total = results.length
  const pct = total > 0 ? Math.round((correct / total) * 100) : 0

  // ── Group list for picker
  const groups = useMemo(() =>
    Object.keys(examEquations).filter(k => examEquations[k]?.length > 0),
  [])

  // ─────────────────────────────────────────────────────────────────────────────
  // PHASE: PICK
  // ─────────────────────────────────────────────────────────────────────────────
  if (phase === 'pick') {
    return (
      <div className="flex flex-col h-full overflow-hidden" style={{ background: '#080f1e' }}>
        <PageHeader
          title="Equation Drill"
          subtitle="Choose a topic to practise"
          onBack={() => navigate(-1)}
        />
        <div
          className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-3"
          style={{ minHeight: 0, paddingBottom: 'calc(var(--safe-bottom) + var(--page-bottom-gap))' }}
        >
          {/* All equations option */}
          <motion.button
            className="w-full flex items-center justify-between px-5 py-4 rounded-[16px] text-left"
            style={{
              background: 'rgba(99,102,241,0.1)',
              border: '0.75px solid rgba(99,102,241,0.3)',
            }}
            onClick={() => startDrill(ALL_KEY)}
            whileTap={{ scale: 0.97 }}
          >
            <div>
              <div className="font-bold text-sm" style={{ color: '#6366f1' }}>All Equations</div>
              <div className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>
                {Object.values(examEquations).flat().length} questions — mixed shuffle
              </div>
            </div>
            <CaretRight size={16} color="rgba(99,102,241,0.6)" />
          </motion.button>

          {/* Divider */}
          <div className="text-xs font-semibold px-1" style={{ color: 'rgba(255,255,255,0.3)' }}>
            BY TOPIC
          </div>

          {/* Individual groups */}
          {groups.map(key => {
            const color = GROUP_COLORS[key] || '#6366f1'
            const count = examEquations[key].length
            return (
              <motion.button
                key={key}
                className="w-full flex items-center justify-between px-5 py-4 rounded-[16px] text-left"
                style={{
                  background: 'rgba(15,22,41,0.95)',
                  border: '0.75px solid rgba(255,255,255,0.07)',
                }}
                onClick={() => startDrill(key)}
                whileTap={{ scale: 0.97 }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ background: color }}
                  />
                  <div>
                    <div className="font-semibold text-sm" style={{ color: '#f8fafc' }}>
                      {GROUP_LABELS[key] || key}
                    </div>
                    <div className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>
                      {count} question{count !== 1 ? 's' : ''}
                    </div>
                  </div>
                </div>
                <CaretRight size={14} color="rgba(255,255,255,0.2)" />
              </motion.button>
            )
          })}
        </div>
      </div>
    )
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // PHASE: DONE (summary)
  // ─────────────────────────────────────────────────────────────────────────────
  if (phase === 'done') {
    const groupLabel = selectedGroup === ALL_KEY ? 'All Equations' : (GROUP_LABELS[selectedGroup] || selectedGroup)
    return (
      <div className="flex flex-col h-full overflow-hidden" style={{ background: '#080f1e' }}>
        <PageHeader
          title="Equation Drill"
          subtitle="Session complete"
          onBack={() => setPhase('pick')}
        />
        <div
          className="flex-1 overflow-y-auto px-5 py-6 flex flex-col gap-5"
          style={{ minHeight: 0, paddingBottom: 'calc(var(--safe-bottom) + var(--page-bottom-gap))' }}
        >
          {/* Score card */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-[20px] px-6 py-6 text-center"
            style={{ background: 'rgba(15,22,41,0.95)', border: '0.75px solid rgba(255,255,255,0.08)' }}
          >
            <div className="text-5xl font-bold mb-1" style={{ color: accent }}>{pct}%</div>
            <div className="text-sm mb-1" style={{ color: 'rgba(255,255,255,0.5)' }}>
              {correct} of {total} correct — {groupLabel}
            </div>
            {pct === 100 && (
              <div className="mt-3 text-sm font-semibold" style={{ color: '#00bc7d' }}>
                🎉 Perfect! You know these equations cold.
              </div>
            )}
            {pct >= 70 && pct < 100 && (
              <div className="mt-3 text-sm font-semibold" style={{ color: '#a8b8cc' }}>
                Good — a few to brush up on. Try again!
              </div>
            )}
            {pct < 70 && (
              <div className="mt-3 text-sm font-semibold" style={{ color: '#f87171' }}>
                Keep drilling — equation recall is a skill.
              </div>
            )}
          </motion.div>

          {/* Stats row */}
          <div className="flex gap-3">
            <div
              className="flex-1 rounded-[14px] px-4 py-3 text-center"
              style={{ background: 'rgba(0,188,125,0.08)', border: '0.75px solid rgba(0,188,125,0.2)' }}
            >
              <div className="text-2xl font-bold" style={{ color: '#00bc7d' }}>{correct}</div>
              <div className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>Correct</div>
            </div>
            <div
              className="flex-1 rounded-[14px] px-4 py-3 text-center"
              style={{ background: 'rgba(239,68,68,0.08)', border: '0.75px solid rgba(239,68,68,0.2)' }}
            >
              <div className="text-2xl font-bold" style={{ color: '#f87171' }}>{total - correct}</div>
              <div className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>To review</div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col gap-3">
            <motion.button
              className="w-full py-3.5 rounded-[14px] text-sm font-bold"
              style={{ background: accent, color: '#fff' }}
              onClick={() => startDrill(selectedGroup)}
              whileTap={{ scale: 0.97 }}
            >
              <ArrowCounterClockwise size={14} className="inline mr-2" />
              Drill again
            </motion.button>
            <motion.button
              className="w-full py-3.5 rounded-[14px] text-sm font-bold"
              style={{
                background: 'rgba(255,255,255,0.07)',
                border: '0.75px solid rgba(255,255,255,0.1)',
                color: '#a8b8cc',
              }}
              onClick={() => setPhase('pick')}
              whileTap={{ scale: 0.97 }}
            >
              Choose different topic
            </motion.button>
          </div>
        </div>
      </div>
    )
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // PHASE: QUIZ
  // ─────────────────────────────────────────────────────────────────────────────
  const progress = questions.length > 0 ? qIndex / questions.length : 0
  const isCorrect = revealed && chosen === currentQ.correctAnswer
  const isWrong = revealed && chosen !== currentQ.correctAnswer
  const groupLabel = selectedGroup === ALL_KEY ? 'All Equations' : (GROUP_LABELS[selectedGroup] || selectedGroup)

  return (
    <div className="flex flex-col h-full overflow-hidden" style={{ background: '#080f1e' }}>

      {/* Header */}
      <PageHeader
        title="Equation Drill"
        subtitle={groupLabel}
        onBack={() => setPhase('pick')}
      />

      {/* Progress bar */}
      <div className="px-5 py-2 shrink-0">
        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
          <motion.div
            className="h-full rounded-full"
            style={{ background: accent }}
            animate={{ width: `${progress * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
            Question {qIndex + 1} of {questions.length}
          </span>
          <span className="text-xs" style={{ color: accent }}>
            {results.filter(r => r.correct).length} correct
          </span>
        </div>
      </div>

      {/* Question area */}
      <div
        className="flex-1 overflow-y-auto px-5 py-4"
        style={{ minHeight: 0, paddingBottom: 'calc(var(--safe-bottom) + var(--page-bottom-gap))' }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={qIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.18 }}
            className="flex flex-col gap-4"
          >
            {/* On-sheet badge */}
            {currentQ.onSheet !== undefined && (
              <div className="flex items-center gap-2">
                <span
                  className="text-xs font-bold px-3 py-1 rounded-full"
                  style={
                    currentQ.onSheet
                      ? { background: 'rgba(99,102,241,0.15)', border: '0.75px solid rgba(99,102,241,0.35)', color: '#818cf8' }
                      : { background: 'rgba(239,68,68,0.1)', border: '0.75px solid rgba(239,68,68,0.3)', color: '#f87171' }
                  }
                >
                  {currentQ.onSheet ? 'On equation sheet' : 'Must memorise'}
                </span>
              </div>
            )}

            {/* Question card */}
            <div
              className="rounded-[16px] px-5 py-5"
              style={{ background: 'rgba(15,22,41,0.95)', border: '0.75px solid rgba(255,255,255,0.08)' }}
            >
              <p className="text-base font-medium leading-relaxed" style={{ color: '#f8fafc' }}>
                {currentQ.question}
              </p>
              {currentQ.questionSubtitle && (
                <p className="text-xs mt-2" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  {currentQ.questionSubtitle}
                </p>
              )}
            </div>

            {/* SEN hint */}
            {currentQ.senNote && (
              <>
                <button
                  className="flex items-center gap-2 text-xs text-left"
                  style={{ color: 'rgba(255,255,255,0.4)' }}
                  onClick={() => setShowSen(p => !p)}
                >
                  <Lightbulb size={13} />
                  <span>{showSen ? 'Hide hint' : 'Show hint'}</span>
                </button>
                <AnimatePresence>
                  {showSen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div
                        className="rounded-[12px] px-4 py-3 text-sm"
                        style={{
                          background: 'rgba(255,193,7,0.08)',
                          border: '0.75px solid rgba(255,193,7,0.2)',
                          color: '#fbbf24',
                        }}
                      >
                        {currentQ.senNote}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            )}

            {/* Options */}
            <div className="flex flex-col gap-2">
              {currentQ.options.map((opt, idx) => {
                const isChosen = chosen === idx
                const isAnswer = idx === currentQ.correctAnswer

                let bg = 'rgba(255,255,255,0.04)'
                let border = 'rgba(255,255,255,0.08)'
                let textColor = '#f8fafc'

                if (revealed) {
                  if (isAnswer) {
                    bg = 'rgba(0,188,125,0.1)'
                    border = 'rgba(0,188,125,0.4)'
                    textColor = '#00bc7d'
                  } else if (isChosen && !isAnswer) {
                    bg = 'rgba(239,68,68,0.1)'
                    border = 'rgba(239,68,68,0.4)'
                    textColor = '#f87171'
                  }
                } else if (isChosen) {
                  bg = `rgba(99,102,241,0.08)`
                  border = `rgba(99,102,241,0.3)`
                }

                return (
                  <motion.button
                    key={idx}
                    className="w-full flex items-center gap-3 px-4 py-4 rounded-[14px] text-left"
                    style={{ background: bg, border: `0.75px solid ${border}` }}
                    onClick={() => handleChoose(idx)}
                    whileTap={!revealed ? { scale: 0.98 } : {}}
                  >
                    {/* Icon after reveal */}
                    {revealed && isAnswer && <CheckCircle size={16} color="#00bc7d" className="shrink-0" />}
                    {revealed && isChosen && !isAnswer && <XCircle size={16} color="#f87171" className="shrink-0" />}
                    {(!revealed || (!isAnswer && !isChosen)) && (
                      <span
                        className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                        style={{
                          background: 'rgba(255,255,255,0.06)',
                          color: 'rgba(255,255,255,0.4)',
                          minWidth: '1.25rem',
                        }}
                      >
                        {['A','B','C','D'][idx]}
                      </span>
                    )}
                    <span className="text-sm font-medium leading-snug" style={{ color: textColor }}>
                      {opt}
                    </span>
                  </motion.button>
                )
              })}
            </div>

            {/* Feedback + Next button */}
            <AnimatePresence>
              {revealed && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col gap-3"
                >
                  {/* Feedback label */}
                  <div
                    className="rounded-[12px] px-4 py-3 text-sm font-semibold text-center"
                    style={
                      isCorrect
                        ? { background: 'rgba(0,188,125,0.1)', color: '#00bc7d', border: '0.75px solid rgba(0,188,125,0.25)' }
                        : { background: 'rgba(239,68,68,0.08)', color: '#f87171', border: '0.75px solid rgba(239,68,68,0.2)' }
                    }
                  >
                    {isCorrect ? '✓ Correct!' : `✗ The correct answer is: ${currentQ.options[currentQ.correctAnswer]}`}
                  </div>

                  {/* Next button */}
                  <motion.button
                    className="w-full py-3.5 rounded-[14px] text-sm font-bold"
                    style={{ background: accent, color: '#fff' }}
                    onClick={handleNext}
                    whileTap={{ scale: 0.97 }}
                  >
                    {qIndex + 1 >= questions.length ? 'See results' : 'Next question →'}
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
