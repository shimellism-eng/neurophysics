/**
 * ExtendedAnswerQuestion — open-ended exam question with AI marking.
 * Student types their answer, Gemini marks it against the mark scheme,
 * and returns a per-point breakdown with feedback.
 * Falls back to self-rating if AI is unavailable.
 */
import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Lightbulb, CheckCircle, XCircle, Loader2, AlertCircle } from 'lucide-react'
import { supabase } from '../../lib/supabase'

const API_BASE = import.meta.env.VITE_API_BASE || 'https://neurophysics.vercel.app'
const MAX_CHARS = 600
const MIN_CHARS = 10

// idle → marking → marked | error
function useAIMarking() {
  const [status, setStatus] = useState('idle')   // 'idle' | 'marking' | 'marked' | 'error'
  const [result, setResult] = useState(null)

  const mark = async ({ question, studentAnswer, markScheme, marks }) => {
    setStatus('marking')
    try {
      const session = supabase ? (await supabase.auth.getSession()).data?.session : null
      const res = await fetch(`${API_BASE}/api/mark`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          ...(session?.access_token ? { 'Authorization': `Bearer ${session.access_token}` } : {}),
        },
        body: JSON.stringify({ question, studentAnswer, markScheme, marks }),
      })
      const data = await res.json()
      if (data.error || !data.breakdown) {
        setStatus('error')
        return null
      }
      setResult(data)
      setStatus('marked')
      return data
    } catch {
      setStatus('error')
      return null
    }
  }

  const reset = () => { setStatus('idle'); setResult(null) }

  return { status, result, mark, reset }
}

function ScoreBadge({ awarded, total, moduleColor }) {
  const pct = awarded / total
  const color = pct >= 0.8 ? '#00bc7d' : pct >= 0.5 ? '#fbbf24' : '#ef4444'
  return (
    <motion.div
      className="flex items-center justify-center gap-2 px-5 py-3 rounded-[16px]"
      style={{ background: `${color}12`, border: `1.5px solid ${color}40` }}
      initial={{ scale: 0.85, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
    >
      <span className="text-2xl font-black" style={{ color }}>{awarded}</span>
      <span className="text-sm font-semibold" style={{ color: 'rgba(255,255,255,0.35)' }}>/ {total} marks</span>
    </motion.div>
  )
}

export default function ExtendedAnswerQuestion({ data, moduleColor, onComplete }) {
  const { question, questionSubtitle, markScheme, senNote, marks = 6 } = data
  const [answer, setAnswer] = useState('')
  const [showFallback, setShowFallback] = useState(false)
  const [fallbackScore, setFallbackScore] = useState(null)
  const { status, result, mark } = useAIMarking()

  const handleSubmit = async () => {
    if (answer.trim().length < MIN_CHARS) return
    const res = await mark({ question, studentAnswer: answer, markScheme, marks })
    if (!res) setShowFallback(true)
  }

  const handleFallbackScore = (score) => {
    setFallbackScore(score)
    onComplete(score >= Math.ceil(marks / 2))
  }

  const handleContinue = () => {
    onComplete(result.marksAwarded >= Math.ceil(marks / 2))
  }

  return (
    <div>
      {/* Question subtitle badge */}
      {questionSubtitle && (
        <motion.div
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full mb-4 text-xs font-semibold"
          style={{ background: `${moduleColor}18`, color: moduleColor, border: `1px solid ${moduleColor}30` }}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
        >
          ✍️ {questionSubtitle}
        </motion.div>
      )}

      <AnimatePresence mode="wait">

        {/* ── IDLE / TYPING STATE ─────────────────────────────────────────── */}
        {status === 'idle' && (
          <motion.div
            key="idle"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="space-y-3"
          >
            <textarea
              value={answer}
              onChange={e => setAnswer(e.target.value.slice(0, MAX_CHARS))}
              placeholder="Write your answer here... Use key physics terms and units where needed."
              rows={6}
              style={{
                width: '100%',
                background: 'rgba(18,26,47,0.9)',
                border: `1px solid ${answer.length >= MIN_CHARS ? moduleColor + '60' : '#2d3e55'}`,
                borderRadius: 14,
                padding: '12px 14px',
                color: '#f8fafc',
                fontSize: 14,
                lineHeight: 1.6,
                resize: 'none',
                outline: 'none',
                transition: 'border-color 0.2s',
                fontFamily: 'inherit',
              }}
            />
            <div style={{ color: '#556677', fontSize: 11, textAlign: 'right', marginTop: -4 }}>
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
                color: answer.trim().length >= MIN_CHARS ? '#fff' : '#556677',
                boxShadow: answer.trim().length >= MIN_CHARS ? `0 6px 20px ${moduleColor}40` : 'none',
                cursor: answer.trim().length >= MIN_CHARS ? 'pointer' : 'not-allowed',
              }}
              whileTap={answer.trim().length >= MIN_CHARS ? { scale: 0.97 } : {}}
            >
              Submit for AI marking
            </motion.button>

            {/* SEN note visible from the start */}
            {senNote && (
              <div className="flex items-start gap-2 px-4 py-3 rounded-[12px]"
                style={{ background: 'rgba(253,199,0,0.07)', border: '0.75px solid rgba(253,199,0,0.25)' }}>
                <Lightbulb size={14} color="#fdc700" style={{ marginTop: 1, flexShrink: 0 }} />
                <p className="text-xs leading-relaxed" style={{ color: '#fdc700' }}>{senNote}</p>
              </div>
            )}
          </motion.div>
        )}

        {/* ── MARKING STATE ───────────────────────────────────────────────── */}
        {status === 'marking' && (
          <motion.div
            key="marking"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-4 py-8"
          >
            <Loader2 size={32} color={moduleColor} className="animate-spin" />
            <p className="text-sm font-semibold" style={{ color: '#a8b8cc' }}>
              Mamo is marking your answer…
            </p>
          </motion.div>
        )}

        {/* ── MARKED STATE ────────────────────────────────────────────────── */}
        {status === 'marked' && result && (
          <motion.div
            key="marked"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {/* Score badge */}
            <ScoreBadge awarded={result.marksAwarded} total={marks} moduleColor={moduleColor} />

            {/* Per-point breakdown */}
            <div className="rounded-[14px] overflow-hidden"
              style={{ background: 'rgba(18,26,47,0.9)', border: '1px solid #2d3e55' }}>
              <div className="px-4 pt-3 pb-1">
                <p className="text-[11px] uppercase tracking-wide font-semibold" style={{ color: '#556677' }}>
                  Mark scheme breakdown
                </p>
              </div>
              <div className="px-4 pb-4 space-y-3 mt-2">
                {markScheme.map((point, i) => {
                  const item = result.breakdown[i] || { awarded: false, reason: '' }
                  return (
                    <motion.div
                      key={i}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.07 }}
                    >
                      {item.awarded
                        ? <CheckCircle size={18} color="#00bc7d" style={{ flexShrink: 0, marginTop: 1 }} />
                        : <XCircle size={18} color="#ef4444" style={{ flexShrink: 0, marginTop: 1 }} />
                      }
                      <div>
                        <p className="text-xs leading-relaxed" style={{ color: '#cad5e2' }}>
                          {point.replace(/\s*\(1\)\s*$/, '')}
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
              <motion.div
                className="flex items-start gap-2 px-4 py-3 rounded-[12px]"
                style={{ background: 'rgba(253,199,0,0.07)', border: '0.75px solid rgba(253,199,0,0.25)' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Lightbulb size={14} color="#fdc700" style={{ marginTop: 1, flexShrink: 0 }} />
                <p className="text-xs leading-relaxed" style={{ color: '#fdc700' }}>{result.feedback}</p>
              </motion.div>
            )}

            {/* SEN note */}
            {senNote && (
              <div className="flex items-start gap-2 px-4 py-3 rounded-[12px]"
                style={{ background: 'rgba(255,255,255,0.04)', border: '0.75px solid rgba(255,255,255,0.1)' }}>
                <Lightbulb size={14} color="#a8b8cc" style={{ marginTop: 1, flexShrink: 0 }} />
                <p className="text-xs leading-relaxed" style={{ color: '#a8b8cc' }}>{senNote}</p>
              </div>
            )}

            {/* AI marking disclaimer */}
            <p className="text-[10px] text-center" style={{ color: '#3a4a5a' }}>
              AI marking is for practice only — not official exam board marking. Verify with your teacher.
            </p>

            {/* Continue button */}
            <motion.button
              onClick={handleContinue}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-[14px] font-semibold text-sm"
              style={{
                background: `linear-gradient(135deg, ${moduleColor}, ${moduleColor}cc)`,
                color: '#fff',
                boxShadow: `0 6px 20px ${moduleColor}40`,
              }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Continue
            </motion.button>
          </motion.div>
        )}

        {/* ── ERROR / FALLBACK STATE ───────────────────────────────────────── */}
        {(status === 'error' || showFallback) && (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2 px-4 py-3 rounded-[12px]"
              style={{ background: 'rgba(239,68,68,0.08)', border: '0.75px solid rgba(239,68,68,0.25)' }}>
              <AlertCircle size={15} color="#ef4444" style={{ flexShrink: 0 }} />
              <p className="text-xs" style={{ color: '#ef4444' }}>
                AI marking unavailable — self-rate your answer instead.
              </p>
            </div>

            {/* Show the mark scheme for self-rating */}
            <div className="rounded-[14px] overflow-hidden"
              style={{ background: 'rgba(18,26,47,0.9)', border: '1px solid #2d3e55' }}>
              <div className="px-4 pt-3 pb-1">
                <p className="text-[11px] uppercase tracking-wide font-semibold" style={{ color: '#556677' }}>
                  Mark scheme
                </p>
              </div>
              <div className="px-4 pb-4 space-y-2 mt-2">
                {markScheme.map((point, i) => (
                  <div key={i} className="flex items-start gap-2 px-3 py-2.5 rounded-[10px]"
                    style={{ background: `${moduleColor}08`, border: `0.75px solid ${moduleColor}20` }}>
                    <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5"
                      style={{ background: moduleColor, color: '#fff' }}>{i + 1}</span>
                    <p className="text-xs leading-relaxed" style={{ color: '#cad5e2' }}>
                      {point.replace(/^Award 1 mark:\s*/i, '')}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {fallbackScore === null ? (
              <div>
                <p className="text-sm font-semibold text-center mb-3" style={{ color: '#a8b8cc' }}>
                  How many marks would you award yourself?
                </p>
                <div className="flex gap-2 flex-wrap justify-center">
                  {Array.from({ length: marks + 1 }, (_, i) => i).map(score => (
                    <motion.button
                      key={score}
                      className="px-4 py-2.5 rounded-[12px] font-bold text-sm"
                      style={{
                        background: score >= Math.ceil(marks * 0.8) ? `${moduleColor}20`
                          : score >= Math.ceil(marks * 0.5) ? 'rgba(251,191,36,0.12)'
                          : 'rgba(239,68,68,0.10)',
                        border: score >= Math.ceil(marks * 0.8) ? `1.5px solid ${moduleColor}50`
                          : score >= Math.ceil(marks * 0.5) ? '1.5px solid rgba(251,191,36,0.35)'
                          : '1.5px solid rgba(239,68,68,0.3)',
                        color: score >= Math.ceil(marks * 0.8) ? moduleColor
                          : score >= Math.ceil(marks * 0.5) ? '#fbbf24'
                          : '#ef4444',
                      }}
                      onClick={() => handleFallbackScore(score)}
                      whileTap={{ scale: 0.92 }}
                    >
                      {score}/{marks}
                    </motion.button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3 px-4 py-3 rounded-[12px]"
                style={{
                  background: fallbackScore >= Math.ceil(marks / 2) ? 'rgba(0,188,125,0.10)' : 'rgba(253,199,0,0.08)',
                  border: fallbackScore >= Math.ceil(marks / 2) ? '1px solid rgba(0,188,125,0.3)' : '1px solid rgba(253,199,0,0.3)',
                }}>
                <CheckCircle size={18} color={fallbackScore >= Math.ceil(marks / 2) ? '#00bc7d' : '#fbbf24'} />
                <p className="text-sm font-semibold"
                  style={{ color: fallbackScore >= Math.ceil(marks / 2) ? '#00bc7d' : '#fbbf24' }}>
                  You marked yourself {fallbackScore}/{marks}
                </p>
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
