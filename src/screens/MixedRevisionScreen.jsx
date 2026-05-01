/**
 * MixedRevisionScreen — 15-question SRS-weighted interleaved practice (3.3)
 * Questions span multiple topics; due-for-review items appear first.
 */
import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { CheckCircle, XCircle, CaretRight, BookOpen, ChatCircleDots } from '@phosphor-icons/react'
import { ALL_QUESTIONS } from '../data/questionBank/index'
import { useSRS } from '../hooks/useSRS'
import { MODULES, TOPICS } from '../data/topics'
import { trackMisconception } from '../utils/misconceptions'
import { getSelectedCourse } from '../utils/boardConfig'
import SafeAreaPage from '../components/ui/SafeAreaPage'
import PageHeader from '../components/PageHeader'
import { navigateToTopicStudy } from '../features/lesson/routing'

const MIXED_COUNT = 15

// ── Helpers ───────────────────────────────────────────────────────────────────

const _colorCache = {}
function topicColor(topicId) {
  if (topicId in _colorCache) return _colorCache[topicId]
  const mod = MODULES.find(m => m.topics.includes(topicId))
  _colorCache[topicId] = mod?.color || '#6366f1'
  return _colorCache[topicId]
}

function topicLabel(q) {
  return TOPICS[q.topicId]?.title || q.topicId
}

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function pickQuestions(dueQuestionIds) {
  const course = getSelectedCourse()
  const mcqs    = ALL_QUESTIONS.filter(q =>
    q.type === 'mcq' && q.options?.length >= 2 && q.correctIndex != null &&
    (course === 'physics_only' || q.course === 'combined')
  )
  const dueSet  = new Set(dueQuestionIds)
  const due     = dueQuestionIds.map(id => mcqs.find(q => q.id === id)).filter(Boolean)
  const rest    = shuffle(mcqs.filter(q => !dueSet.has(q.id)))
  const combined = [...due, ...rest]

  // Max 3 per topic for variety (looser than QuickWin's 2)
  const topicCounts = {}
  const picked = []
  for (const q of combined) {
    if (picked.length >= MIXED_COUNT) break
    topicCounts[q.topicId] = (topicCounts[q.topicId] || 0) + 1
    if (topicCounts[q.topicId] <= 3) picked.push(q)
  }
  if (picked.length < MIXED_COUNT) {
    const pickedIds = new Set(picked.map(q => q.id))
    for (const q of combined) {
      if (picked.length >= MIXED_COUNT) break
      if (!pickedIds.has(q.id)) { picked.push(q); pickedIds.add(q.id) }
    }
  }
  return picked
}

// ── Result screen ─────────────────────────────────────────────────────────────

function ResultScreen({ questions, answers, onDone }) {
  const correct = answers.filter((a, i) => a === questions[i].correctIndex).length
  const pct     = Math.round((correct / questions.length) * 100)

  const headline =
    correct === questions.length ? 'Perfect!' :
    pct >= 80 ? 'Excellent work!' :
    pct >= 60 ? 'Good effort!' : 'Keep practising!'

  // Per-topic summary
  const byTopic = {}
  questions.forEach((q, i) => {
    if (!byTopic[q.topicId]) byTopic[q.topicId] = { total: 0, correct: 0 }
    byTopic[q.topicId].total++
    if (answers[i] === q.correctIndex) byTopic[q.topicId].correct++
  })

  return (
    <motion.div
      className="flex flex-col px-5 pt-6 pb-10"
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Score ring */}
      <div className="flex flex-col items-center mb-6">
        <div className="flex flex-col items-center justify-center rounded-full mb-4"
          style={{
            width: 120, height: 120,
            background: `conic-gradient(#6366f1 ${pct * 3.6}deg, rgba(255,255,255,0.07) 0deg)`,
            boxShadow: '0 0 0 4px rgba(99,102,241,0.12)',
          }}>
          <div className="flex flex-col items-center justify-center rounded-full"
            style={{ width: 100, height: 100, background: '#0d1629' }}>
            <div className="font-bold" style={{ fontSize: 26, color: '#f8fafc', letterSpacing: '-0.02em' }}>
              {correct}/{questions.length}
            </div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', fontWeight: 600 }}>{pct}%</div>
          </div>
        </div>
        <h2 className="font-bold" style={{ fontSize: 22, color: '#f8fafc', letterSpacing: '-0.02em' }}>
          {headline}
        </h2>
      </div>

      {/* Per-topic breakdown */}
      <div className="w-full rounded-[18px] overflow-hidden mb-6"
        style={{ background: 'rgba(255,255,255,0.04)', border: '0.75px solid rgba(255,255,255,0.07)' }}>
        <div className="px-4 py-3" style={{ borderBottom: '0.75px solid rgba(255,255,255,0.07)' }}>
          <span className="font-bold" style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            By topic
          </span>
        </div>
        {Object.entries(byTopic).map(([topicId, { total, correct: c }], i) => {
          const pctTopic = Math.round((c / total) * 100)
          const color = topicColor(topicId)
          return (
            <div key={topicId} className="flex items-center gap-3 px-4 py-3"
              style={{ borderTop: i === 0 ? 'none' : '0.75px solid rgba(255,255,255,0.06)' }}>
              <div style={{ width: 8, height: 8, borderRadius: 4, background: color, flexShrink: 0 }} />
              <div className="flex-1 min-w-0">
                <div className="truncate" style={{ fontSize: 13, color: '#f8fafc', fontWeight: 600 }}>
                  {TOPICS[topicId]?.title || topicId}
                </div>
                <div className="w-full h-1.5 rounded-full mt-1 overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
                  <div className="h-full rounded-full" style={{ width: `${pctTopic}%`, background: color, transition: 'width 0.6s ease' }} />
                </div>
              </div>
              <span className="font-bold shrink-0" style={{ fontSize: 12, color }}>
                {c}/{total}
              </span>
            </div>
          )
        })}
      </div>

      <motion.button
        className="w-full font-bold"
        style={{ height: 56, borderRadius: 16, background: '#6366f1', color: '#080f1e', fontSize: 16, border: 'none', cursor: 'pointer' }}
        whileTap={{ y: 3 }}
        onClick={onDone}
      >
        Done
      </motion.button>
    </motion.div>
  )
}

// ── Main screen ───────────────────────────────────────────────────────────────

export default function MixedRevisionScreen() {
  const navigate = useNavigate()
  const { getDueQuestions, updateProgress } = useSRS()

  const questions = useMemo(() => pickQuestions(getDueQuestions()), []) // eslint-disable-line react-hooks/exhaustive-deps

  const [idx, setIdx]               = useState(0)
  const [selected, setSelected]     = useState(null)
  const [revealed, setRevealed]     = useState(false)
  const [answers, setAnswers]       = useState([])
  const [done, setDone]             = useState(false)
  const [sessionStreak, setSessionStreak] = useState(0)

  if (!questions.length) {
    return (
      <SafeAreaPage>
        <PageHeader title="Mixed Revision" onBack={() => navigate('/')} />
        <div className="flex items-center justify-center h-full" style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14 }}>
          No questions available
        </div>
      </SafeAreaPage>
    )
  }

  const q = questions[idx]
  const color = topicColor(q.topicId)

  function handleSelect(optIdx) {
    if (revealed) return
    const correct = optIdx === q.correctIndex
    setSelected(optIdx)
    setRevealed(true)
    setSessionStreak(s => correct ? s + 1 : 0)
    updateProgress(q.id, correct)
    if (!correct) trackMisconception(q.topicId, q.options[optIdx])
  }

  function handleNext() {
    const nextAnswers = [...answers, selected]
    if (idx + 1 >= questions.length) {
      setAnswers(nextAnswers)
      setDone(true)
    } else {
      setAnswers(nextAnswers)
      setIdx(idx + 1)
      setSelected(null)
      setRevealed(false)
    }
  }

  function goToTopic(topicId) {
    const t = TOPICS[topicId]
    if (!t) return
    navigateToTopicStudy(navigate, t, topicId)
  }

  if (done) {
    return (
      <SafeAreaPage>
        <PageHeader title="Mixed Revision" onBack={() => navigate('/')} />
        <div className="overflow-y-auto flex-1" style={{ minHeight: 0 }}>
          <ResultScreen questions={questions} answers={answers} onDone={() => navigate('/')} />
        </div>
      </SafeAreaPage>
    )
  }

  const isCorrect = revealed && selected === q.correctIndex

  return (
    <SafeAreaPage>
      <PageHeader title="Mixed Revision" onBack={() => navigate('/')} />

      {/* Progress bar */}
      <div className="px-5 mb-5">
        <div className="w-full rounded-full overflow-hidden" style={{ height: 4, background: 'rgba(255,255,255,0.07)' }}>
          <div className="h-full rounded-full" style={{
            width: `${(idx / questions.length) * 100}%`,
            background: 'linear-gradient(90deg, #6366f1, #0099bb)',
            transition: 'width 0.3s ease',
          }} />
        </div>
        <div className="flex items-center justify-between mt-1.5">
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', fontWeight: 600 }}>
            {idx + 1} of {questions.length}
          </span>
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', fontWeight: 600 }}>
            ~{Math.round((questions.length - idx) * 0.5)} min left
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-6" style={{ minHeight: 0 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Colour-coded topic pill */}
            <div className="flex items-center gap-1.5 mb-2">
              <span style={{ width: 8, height: 8, borderRadius: 4, background: color, display: 'inline-block', flexShrink: 0 }} />
              <span style={{ fontSize: 12, fontWeight: 700, color, textTransform: 'uppercase', letterSpacing: '0.07em' }}>
                {topicLabel(q)}
              </span>
            </div>

            {/* Question */}
            <p className="mb-5" style={{ fontSize: 17, fontWeight: 600, color: '#f8fafc', lineHeight: 1.5, letterSpacing: '-0.01em' }}>
              {q.question}
            </p>

            {/* Options */}
            <div className="space-y-3 mb-5">
              {q.options.map((opt, i) => {
                let bg = 'rgba(255,255,255,0.05)'
                let border = '1px solid rgba(255,255,255,0.1)'
                let optColor = '#f8fafc'

                if (revealed) {
                  if (i === q.correctIndex) {
                    bg = 'rgba(74,222,128,0.12)'; border = '1px solid #4ade80'; optColor = '#4ade80'
                  } else if (i === selected && selected !== q.correctIndex) {
                    bg = 'rgba(248,113,113,0.12)'; border = '1px solid #f87171'; optColor = '#f87171'
                  } else {
                    optColor = 'rgba(255,255,255,0.3)'
                  }
                } else if (selected === i) {
                  bg = `${color}1a`; border = `1px solid ${color}`
                }

                return (
                  <motion.button key={i}
                    className="w-full text-left px-4 py-4 rounded-[14px]"
                    style={{ background: bg, border, color: optColor, fontSize: 15, lineHeight: 1.4, cursor: revealed ? 'default' : 'pointer', transition: 'background 0.2s, border 0.2s, color 0.2s' }}
                    whileTap={revealed ? {} : { scale: 0.98 }}
                    onClick={() => handleSelect(i)}
                  >
                    {opt}
                  </motion.button>
                )
              })}
            </div>

            {/* 3-layer diagnostic feedback */}
            <AnimatePresence>
              {revealed && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  aria-live="polite" aria-atomic="true"
                  className="rounded-[14px] px-4 py-4 mb-4 space-y-3"
                  style={{
                    background: isCorrect ? 'rgba(74,222,128,0.08)' : 'rgba(248,113,113,0.08)',
                    border: `0.75px solid ${isCorrect ? 'rgba(74,222,128,0.25)' : 'rgba(248,113,113,0.25)'}`,
                  }}
                >
                  {/* Layer 1 — result + streak */}
                  <div>
                    <div className="font-bold" style={{ fontSize: 13, color: isCorrect ? '#4ade80' : '#f87171' }}>
                      {isCorrect
                        ? sessionStreak >= 3 ? `✓ Correct! 🔥 ${sessionStreak} in a row!` : '✓ Correct! Got it!'
                        : '✗ Not quite'}
                    </div>
                    {!isCorrect && (
                      <div className="mt-1" style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>
                        The answer is: <span style={{ color: '#4ade80', fontWeight: 600 }}>{q.options[q.correctIndex]}</span>
                      </div>
                    )}
                  </div>

                  {/* Layer 2 — explanation (senNote) */}
                  {q.senNote && (
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', paddingTop: 8, borderTop: '0.75px solid rgba(255,255,255,0.08)', lineHeight: 1.6 }}>
                      {q.senNote}
                    </div>
                  )}

                  {/* Layer 3 — action buttons */}
                  <div className="flex gap-2 pt-1">
                    <button
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-[10px] font-semibold"
                      style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.55)', border: '0.75px solid rgba(255,255,255,0.1)', fontSize: 12, cursor: 'pointer' }}
                      onClick={() => goToTopic(q.topicId)}
                    >
                      <BookOpen size={13} />
                      Show concept
                    </button>
                    {!isCorrect && (
                      <button
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-[10px] font-semibold"
                        style={{ background: 'rgba(99,102,241,0.08)', color: '#6366f1', border: '0.75px solid rgba(99,102,241,0.2)', fontSize: 12, cursor: 'pointer' }}
                        onClick={() => {
                          const params = new URLSearchParams({
                            topic: q.topicId,
                            label: topicLabel(q),
                            question: q.question,
                            wrong: q.options[selected],
                            correct: q.options[q.correctIndex],
                          })
                          navigate(`/mamo?${params.toString()}`)
                        }}
                      >
                        <ChatCircleDots size={13} />
                        Ask Mamo
                      </button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Next button */}
      <AnimatePresence>
        {revealed && (
          <motion.div className="px-5 pb-6"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
          >
            <motion.button
              className="w-full flex items-center justify-center gap-2 font-bold"
              style={{ height: 56, borderRadius: 16, background: '#6366f1', color: '#080f1e', fontSize: 16, border: 'none', cursor: 'pointer' }}
              whileTap={{ y: 3 }}
              onClick={handleNext}
            >
              {idx + 1 >= questions.length ? 'See results' : 'Next question'}
              <CaretRight size={20} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </SafeAreaPage>
  )
}
