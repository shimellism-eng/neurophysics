/**
 * NovelContextQuestion — Grade 9 / unfamiliar-context 6-mark extended writing.
 * Shows a scenario, student types their answer, Gemini marks it.
 * Falls back to self-rating if AI is unavailable.
 *
 * Props:
 *   data        — { scenario, question, markScheme, marks, modelAnswer, senNote, questionSubtitle }
 *   moduleColor — accent colour for this screen
 *   onComplete  — (passed: boolean) => void
 */
import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Lightbulb, CheckCircle, XCircle, Loader2, AlertCircle } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import { getValidatedBoard } from '../../utils/boardConfig'

const API_BASE = import.meta.env.VITE_API_BASE || 'https://neurophysics.vercel.app'
const MAX_CHARS = 700
const MIN_CHARS = 10

export default function NovelContextQuestion({ data, moduleColor = '#6366f1', onComplete }) {
  if (!data) return null
  const { scenario, question, markScheme = [], marks = 6, senNote, questionSubtitle, modelAnswer } = data

  const [answer, setAnswer]         = useState('')
  const [status, setStatus]         = useState('idle')   // idle | marking | marked | error
  const [result, setResult]         = useState(null)
  const [selfScore, setSelfScore]   = useState(null)

  const half = Math.ceil(marks / 2)

  const handleSubmit = async () => {
    if (answer.trim().length < MIN_CHARS) return
    setStatus('marking')
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 30000)
    try {
      // Pass scenario + question together so the AI has full context
      const fullQuestion = scenario ? `Context: ${scenario}\n\n${question}` : question
      const session = supabase ? (await supabase.auth.getSession()).data?.session : null
      if (!session?.access_token) {
        clearTimeout(timeout)
        setStatus('error')
        return
      }
      const res = await fetch(`${API_BASE}/api/mark`, {
        method: 'POST',
        signal: controller.signal,
        headers: {
          'content-type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          question: fullQuestion,
          studentAnswer: answer,
          markScheme,
          marks,
          boardName: getValidatedBoard(),
        }),
      })
      clearTimeout(timeout)
      const d = await res.json()
      if (d.error || !d.breakdown) { setStatus('error'); return }
      setResult(d)
      setStatus('marked')
    } catch {
      clearTimeout(timeout)
      setStatus('error')
    }
  }

  const handleContinue  = () => onComplete(result.marksAwarded >= half)
  const handleSelfScore = (pts) => { setSelfScore(pts); onComplete(pts >= half) }

  const pct        = result ? result.marksAwarded / marks : 0
  const scoreColor = pct >= 0.8 ? '#00bc7d' : pct >= 0.5 ? '#fbbf24' : '#ef4444'

  return (
    <div className="space-y-3">

      {/* Subtitle badge */}
      {questionSubtitle && (
        <div className="text-xs font-semibold px-3 py-1.5 rounded-full inline-flex"
          style={{ background: `${moduleColor}15`, color: moduleColor, border: `1px solid ${moduleColor}30` }}>
          ✍️ {questionSubtitle}
        </div>
      )}

      {/* Scenario card — always visible */}
      <div className="px-4 py-3 rounded-[14px]"
        style={{ background: `${moduleColor}09`, border: `0.75px solid ${moduleColor}30` }}>
        <div className="text-xs font-semibold mb-1.5" style={{ color: moduleColor }}>Context</div>
        <p className="text-sm leading-relaxed" style={{ color: '#cad5e2' }}>{scenario}</p>
      </div>

      <AnimatePresence mode="wait">

        {/* ── IDLE / TYPING ──────────────────────────────────────────────────── */}
        {status === 'idle' && (
          <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3">
            <textarea
              value={answer}
              onChange={e => setAnswer(e.target.value.slice(0, MAX_CHARS))}
              placeholder="Write your full answer here… include a calculation then evaluate."
              rows={6}
              aria-label="Your answer"
              style={{
                width: '100%',
                background: 'rgba(18,26,47,0.9)',
                border: `1px solid ${answer.length >= MIN_CHARS ? moduleColor + '60' : '#2d3e55'}`,
                borderRadius: 14, padding: '12px 14px', color: '#f8fafc',
                fontSize: 14, lineHeight: 1.6, resize: 'none',
                fontFamily: 'inherit', transition: 'border-color 0.2s',
              }}
            />
            <div style={{ color: '#8899b0', fontSize: 11, textAlign: 'right', marginTop: -8 }}>
              {answer.length} / {MAX_CHARS}
            </div>

            <motion.button
              onClick={handleSubmit}
              disabled={answer.trim().length < MIN_CHARS}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-[14px] font-semibold text-sm"
              style={{
                background: answer.trim().length >= MIN_CHARS
                  ? `linear-gradient(135deg, ${moduleColor}, ${moduleColor}cc)`
                  : 'rgba(255,255,255,0.05)',
                color: answer.trim().length >= MIN_CHARS ? '#fff' : '#8899b0',
                boxShadow: answer.trim().length >= MIN_CHARS ? `0 6px 20px ${moduleColor}40` : 'none',
                cursor: answer.trim().length >= MIN_CHARS ? 'pointer' : 'not-allowed',
              }}
              whileTap={answer.trim().length >= MIN_CHARS ? { scale: 0.97 } : {}}
            >
              Submit for AI marking
            </motion.button>

            {senNote && (
              <div className="flex items-start gap-2 px-4 py-3 rounded-[12px]"
                style={{ background: 'rgba(253,199,0,0.07)', border: '0.75px solid rgba(253,199,0,0.25)' }}>
                <Lightbulb size={14} color="#fdc700" style={{ marginTop: 1, flexShrink: 0 }} />
                <p className="text-xs leading-relaxed" style={{ color: '#fdc700' }}>{senNote}</p>
              </div>
            )}
          </motion.div>
        )}

        {/* ── MARKING ────────────────────────────────────────────────────────── */}
        {status === 'marking' && (
          <motion.div key="marking" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-4 py-8">
            <Loader2 size={32} color={moduleColor} className="animate-spin" />
            <p className="text-sm font-semibold" style={{ color: '#a8b8cc' }}>
              Mamo is marking your answer…
            </p>
          </motion.div>
        )}

        {/* ── MARKED ─────────────────────────────────────────────────────────── */}
        {status === 'marked' && result && (
          <motion.div key="marked" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">

            {/* Score badge */}
            <motion.div className="flex items-center justify-center gap-2 px-5 py-3 rounded-[16px]"
              style={{ background: `${scoreColor}12`, border: `1.5px solid ${scoreColor}40` }}
              initial={{ scale: 0.85 }} animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}>
              <span className="text-2xl font-black" style={{ color: scoreColor }}>{result.marksAwarded}</span>
              <span className="text-sm font-semibold" style={{ color: 'rgba(255,255,255,0.35)' }}>/ {marks} marks</span>
            </motion.div>

            {/* Per-point breakdown */}
            <div className="rounded-[14px] overflow-hidden"
              style={{ background: 'rgba(18,26,47,0.9)', border: '1px solid #2d3e55' }}>
              <div className="px-4 pt-3 pb-1">
                <p className="text-[11px] uppercase tracking-wide font-semibold" style={{ color: '#8899b0' }}>
                  Mark scheme breakdown
                </p>
              </div>
              <div className="px-4 pb-4 space-y-3 mt-2">
                {markScheme.map((point, i) => {
                  const item = result.breakdown[i] || { awarded: false, reason: '' }
                  return (
                    <motion.div key={i} className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.07 }}>
                      {item.awarded
                        ? <CheckCircle size={18} color="#00bc7d" style={{ flexShrink: 0, marginTop: 1 }} />
                        : <XCircle size={18} color="#ef4444" style={{ flexShrink: 0, marginTop: 1 }} />
                      }
                      <div>
                        <p className="text-xs leading-relaxed" style={{ color: '#cad5e2' }}>
                          {point.replace(/^Award 1 mark:\s*/i, '').replace(/\s*\(1\)\s*$/, '')}
                        </p>
                        {item.reason && (
                          <p className="text-[11px] mt-1" style={{ color: item.awarded ? '#00bc7d' : '#ef4444' }}>
                            {item.reason}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>

            {/* AI feedback */}
            {result.feedback && (
              <motion.div className="flex items-start gap-2 px-4 py-3 rounded-[12px]"
                style={{ background: 'rgba(253,199,0,0.07)', border: '0.75px solid rgba(253,199,0,0.25)' }}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                <Lightbulb size={14} color="#fdc700" style={{ marginTop: 1, flexShrink: 0 }} />
                <p className="text-xs leading-relaxed" style={{ color: '#fdc700' }}>{result.feedback}</p>
              </motion.div>
            )}

            {/* Model answer — shown when available so students can compare */}
            {modelAnswer && (
              <motion.div
                className="rounded-[14px] overflow-hidden"
                style={{ border: '0.75px solid rgba(99,102,241,0.3)' }}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
              >
                <div className="px-4 py-2" style={{ background: 'rgba(99,102,241,0.12)' }}>
                  <p className="text-[11px] uppercase tracking-wide font-bold" style={{ color: '#818cf8' }}>
                    Model answer
                  </p>
                </div>
                <div className="px-4 py-3" style={{ background: 'rgba(18,26,47,0.9)' }}>
                  <p className="text-xs leading-relaxed" style={{ color: '#cad5e2' }}>{modelAnswer}</p>
                </div>
              </motion.div>
            )}

            {senNote && (
              <div className="flex items-start gap-2 px-4 py-3 rounded-[12px]"
                style={{ background: 'rgba(255,255,255,0.04)', border: '0.75px solid rgba(255,255,255,0.1)' }}>
                <Lightbulb size={14} color="#a8b8cc" style={{ marginTop: 1, flexShrink: 0 }} />
                <p className="text-xs leading-relaxed" style={{ color: '#a8b8cc' }}>{senNote}</p>
              </div>
            )}

            {/* AI marking disclaimer */}
            <p className="text-[10px] text-center" style={{ color: '#94a3b8' }}>
              AI marking is for practice only — not official exam board marking. Verify with your teacher.
            </p>

            <motion.button onClick={handleContinue}
              className="w-full flex items-center justify-center py-3.5 rounded-[14px] font-semibold text-sm"
              style={{
                background: `linear-gradient(135deg, ${moduleColor}, ${moduleColor}cc)`,
                color: '#fff', boxShadow: `0 6px 20px ${moduleColor}40`,
              }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              Continue
            </motion.button>
          </motion.div>
        )}

        {/* ── ERROR / FALLBACK ────────────────────────────────────────────────── */}
        {status === 'error' && (
          <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
            <div className="flex items-center gap-2 px-4 py-3 rounded-[12px]"
              style={{ background: 'rgba(239,68,68,0.08)', border: '0.75px solid rgba(239,68,68,0.25)' }}>
              <AlertCircle size={15} color="#ef4444" style={{ flexShrink: 0 }} />
              <p className="text-xs" style={{ color: '#ef4444' }}>
                AI marking unavailable — self-rate instead.
              </p>
            </div>

            {/* Show mark scheme */}
            <div className="space-y-2">
              {markScheme.map((m, i) => (
                <div key={i} className="flex items-start gap-2 px-3 py-2 rounded-[10px]"
                  style={{ background: 'rgba(0,188,125,0.06)', border: '0.75px solid rgba(0,188,125,0.15)' }}>
                  <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5"
                    style={{ background: 'rgba(0,188,125,0.2)', color: '#00bc7d' }}>{i + 1}</span>
                  <span className="text-xs leading-relaxed" style={{ color: '#cad5e2' }}>
                    {m.replace(/^Award 1 mark:\s*/i, '')}
                  </span>
                </div>
              ))}
            </div>

            {selfScore === null ? (
              <div>
                <div className="text-xs font-semibold mb-2 text-center" style={{ color: '#a8b8cc' }}>
                  How many marks did you earn?
                </div>
                <div className="flex gap-2 justify-center flex-wrap">
                  {[0, Math.floor(marks / 2), marks].map(pts => (
                    <motion.button key={pts}
                      className="px-5 py-2 rounded-[10px] text-sm font-bold"
                      style={{
                        background: `${moduleColor}12`,
                        border: `0.75px solid ${moduleColor}40`,
                        color: moduleColor,
                      }}
                      onClick={() => handleSelfScore(pts)} whileTap={{ scale: 0.92 }}>
                      {pts}
                    </motion.button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center text-sm font-semibold py-2"
                style={{ color: selfScore >= marks ? '#00bc7d' : selfScore >= half ? '#fbbf24' : '#ef4444' }}>
                {selfScore >= marks ? '★ Full marks!'
                  : selfScore > 0 ? `${selfScore}/${marks} — keep practising`
                  : `0/${marks} — review the mark scheme`}
              </div>
            )}

            {senNote && (
              <div className="flex items-start gap-2 px-4 py-3 rounded-[12px]"
                style={{ background: 'rgba(253,199,0,0.07)', border: '0.75px solid rgba(253,199,0,0.25)' }}>
                <Lightbulb size={14} color="#fdc700" style={{ marginTop: 1, flexShrink: 0 }} />
                <p className="text-xs leading-relaxed" style={{ color: '#fdc700' }}>{senNote}</p>
              </div>
            )}
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  )
}
