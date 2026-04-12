/**
 * RecallScreen — AO1 Knowledge Recall mode.
 * Route: /recall/:topicId
 *
 * Serves recall questions (type:'recall') and sequence_sort questions from
 * the AQA recall question banks. Flashcard-style: student writes answer,
 * reveals model answer, self-rates. Session summary at end.
 */
import { useState, useMemo, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { CheckCircle2, RotateCcw, BookOpen } from 'lucide-react'
import { TOPICS, MODULES } from '../data/topics'
import { getRecallQuestions } from '../data/questionBank/index'
import { getSelectedBoard } from '../utils/boardConfig'
import PageHeader from '../components/PageHeader'
import RecallQuestion from '../components/questions/RecallQuestion'
import SequenceSortQuestion from '../components/questions/SequenceSortQuestion'

// ── Shuffle helper ────────────────────────────────────────────────────────────
function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function RecallScreen() {
  const { topicId } = useParams()
  const navigate    = useNavigate()
  const board       = getSelectedBoard()

  const topic  = TOPICS[topicId]
  const mod    = topic ? MODULES[topic.module] : null
  const moduleColor = topic?.moduleColor || mod?.color || '#6366f1'

  // ── Session state ─────────────────────────────────────────────────────────
  const [qIndex,    setQIndex]    = useState(0)
  const [results,   setResults]   = useState([]) // { id, correct: bool }
  const [done,      setDone]      = useState(false)
  const [missedIds, setMissedIds] = useState(null)

  // ── Load & shuffle questions ───────────────────────────────────────────────
  const questions = useMemo(() => {
    const qs = getRecallQuestions(topicId, board.id)
    const pool = missedIds ? qs.filter(q => missedIds.includes(q.id)) : qs
    return shuffle(pool.length > 0 ? pool : qs)
  }, [topicId, board.id, missedIds])

  const currentQ = questions[qIndex]

  const handleComplete = useCallback((correct) => {
    const newResults = [...results, { id: currentQ.id, correct }]
    setResults(newResults)
    if (qIndex + 1 >= questions.length) {
      setDone(true)
    } else {
      setQIndex(i => i + 1)
    }
  }, [currentQ, results, qIndex, questions.length])

  // ── Summary stats ─────────────────────────────────────────────────────────
  const correct = results.filter(r => r.correct).length
  const total   = results.length
  const pct     = total > 0 ? Math.round((correct / total) * 100) : 0

  // ── Empty state (no recall Qs for this topic / board) ────────────────────
  if (questions.length === 0) {
    return (
      <div className="flex flex-col h-full overflow-hidden" style={{ background: '#080f1e' }}>
        <PageHeader
          title={topic?.title || 'Knowledge Recall'}
          subtitle="Knowledge Recall · AO1"
          onBack={() => navigate(-1)}
        />
        <div className="flex-1 flex flex-col items-center justify-center px-6 gap-4 text-center">
          <BookOpen size={40} color="rgba(255,255,255,0.2)" />
          <div className="font-bold text-lg" style={{ color: '#f8fafc' }}>No recall questions yet</div>
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
            Knowledge recall questions for this topic aren't available for {board.name} yet.
          </p>
          <button
            className="px-6 py-3 rounded-[12px] text-sm font-bold mt-2"
            style={{ background: moduleColor, color: '#fff' }}
            onClick={() => navigate(-1)}
          >
            Go back
          </button>
        </div>
      </div>
    )
  }

  // ── Session complete screen ───────────────────────────────────────────────
  if (done) {
    const wrongIds = results.filter(r => !r.correct).map(r => r.id)
    const missedQs = questions.filter(q => wrongIds.includes(q.id))

    return (
      <div className="flex flex-col h-full overflow-hidden" style={{ background: '#080f1e' }}>
        <PageHeader
          title={topic?.title || 'Knowledge Recall'}
          subtitle="Session complete"
          onBack={() => navigate(-1)}
        />
        <div
          className="flex-1 overflow-y-auto px-5 py-6 flex flex-col gap-5"
          style={{ minHeight: 0, paddingBottom: 'calc(96px + env(safe-area-inset-bottom, 0px))' }}
        >
          {/* Score card */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-[20px] px-6 py-6 text-center"
            style={{ background: 'rgba(15,22,41,0.95)', border: '0.75px solid rgba(255,255,255,0.08)' }}
          >
            <div className="text-5xl font-bold mb-1" style={{ color: moduleColor }}>{pct}%</div>
            <div className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
              {correct} of {total} recalled correctly
            </div>
            {pct === 100 && (
              <div className="mt-3 text-sm font-semibold" style={{ color: '#00bc7d' }}>
                🎉 Perfect recall! You know this topic cold.
              </div>
            )}
            {pct >= 70 && pct < 100 && (
              <div className="mt-3 text-sm font-semibold" style={{ color: '#f59e0b' }}>
                Almost there — review the ones you missed and try again.
              </div>
            )}
            {pct < 70 && (
              <div className="mt-3 text-sm font-semibold" style={{ color: '#f87171' }}>
                Keep practising — recall gets easier with repetition.
              </div>
            )}
          </motion.div>

          {/* Result row breakdown */}
          <div className="flex gap-3">
            <div
              className="flex-1 rounded-[14px] px-4 py-3 text-center"
              style={{ background: 'rgba(0,188,125,0.08)', border: '0.75px solid rgba(0,188,125,0.2)' }}
            >
              <div className="text-2xl font-bold" style={{ color: '#00bc7d' }}>{correct}</div>
              <div className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>Got it</div>
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
            {missedQs.length > 0 && (
              <motion.button
                className="w-full py-3.5 rounded-[14px] text-sm font-bold"
                style={{ background: moduleColor, color: '#fff' }}
                onClick={() => {
                  const ids = results.filter(r => !r.correct).map(r => r.id)
                  setMissedIds(ids)
                  setResults([])
                  setQIndex(0)
                  setDone(false)
                }}
                whileTap={{ scale: 0.97 }}
              >
                <RotateCcw size={14} className="inline mr-2" />
                Practise missed questions
              </motion.button>
            )}
            <motion.button
              className="w-full py-3.5 rounded-[14px] text-sm font-bold"
              style={{ background: 'rgba(255,255,255,0.07)', border: '0.75px solid rgba(255,255,255,0.1)', color: '#a8b8cc' }}
              onClick={() => navigate(-1)}
              whileTap={{ scale: 0.97 }}
            >
              Back to topic
            </motion.button>
          </div>
        </div>
      </div>
    )
  }

  // ── Main quiz screen ──────────────────────────────────────────────────────
  const progress = questions.length > 0 ? ((qIndex) / questions.length) : 0

  return (
    <div className="flex flex-col h-full overflow-hidden" style={{ background: '#080f1e' }}>

      {/* Header */}
      <PageHeader
        title={topic?.title || 'Knowledge Recall'}
        subtitle={`Knowledge Recall · AO1 · ${board.name}`}
        onBack={() => navigate(-1)}
      />

      {/* Progress bar */}
      <div className="px-5 py-2 shrink-0">
        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
          <motion.div
            className="h-full rounded-full"
            style={{ background: moduleColor }}
            animate={{ width: `${progress * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
            Question {qIndex + 1} of {questions.length}
          </span>
          <span className="text-xs" style={{ color: moduleColor }}>
            {results.filter(r => r.correct).length} correct so far
          </span>
        </div>
      </div>

      {/* Question */}
      <div
        className="flex-1 overflow-y-auto px-5 py-4"
        style={{ minHeight: 0, paddingBottom: 'calc(96px + env(safe-area-inset-bottom, 0px))' }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQ.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.18 }}
          >
            {currentQ.type === 'sequence_sort' ? (
              <SequenceSortQuestion
                data={currentQ}
                onComplete={handleComplete}
                moduleColor={moduleColor}
              />
            ) : (
              <RecallQuestion
                data={currentQ}
                moduleColor={moduleColor}
                onComplete={handleComplete}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
