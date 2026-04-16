import { motion, AnimatePresence } from 'motion/react'
import { useState, useRef, useEffect, useCallback } from 'react'
import { Send, Sparkles, Trash2, RotateCcw } from 'lucide-react'
import AtomIcon from '../components/AtomIcon'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { getSelectedBoard } from '../utils/boardConfig'
import PageHeader from '../components/PageHeader'

const GENERAL_STARTERS = [
  'What is the difference between speed and velocity?',
  'How does radioactive decay work?',
  'Can you explain waves in simple steps?',
  'What is the conservation of energy?',
  'How do I rearrange physics equations?',
  'What is the difference between scalar and vector?',
  'Explain Newton\'s third law',
  'How does the transformer equation work?',
]

function getStarters(label) {
  if (!label) return GENERAL_STARTERS
  const t = label.replace(/-/g, ' ')
  return [
    `Explain ${t} in simple terms`,
    `What equations do I need for ${t}?`,
    `Give me a typical exam question on ${t}`,
    `What mistakes do students make with ${t}?`,
    `Create a quick revision checklist for ${t}`,
    `What are the key definitions for ${t}?`,
    `How do I get full marks on a ${t} question?`,
    `What links ${t} to other topics?`,
  ]
}

const INITIAL_MSG = {
  role: 'assistant',
  content: "Hi! I'm **Mamo**, your physics tutor 🔬\n\nAsk me anything about GCSE Physics — I'll break it down step by step.",
}

// ── Friendly error messages ───────────────────────────────────────────────────
function friendlyError(code) {
  switch (code) {
    case 'TOO_MANY_REQUESTS': return "You're sending messages too fast! Wait a moment and try again."
    case 'SERVICE_UNAVAILABLE': return "Mamo is taking a quick break. Try again in a moment."
    case 'MISCONFIGURED': return "There's a setup issue — let your teacher know."
    case 'NETWORK_ERROR': return "No internet connection. Check your Wi-Fi and try again."
    default: return "Mamo couldn't respond. Tap retry to try again."
  }
}

// ── Typing dots animation ─────────────────────────────────────────────────────
function TypingDots() {
  const reduceMotion = (() => {
    try { return !!JSON.parse(localStorage.getItem('neurophysics_prefs') || '{}').reduceMotion } catch { return false }
  })() || (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches)

  if (reduceMotion) {
    return (
      <div className="flex gap-1 items-center h-5 px-1">
        <span className="text-xs" style={{ color: '#6366f1' }}>Thinking…</span>
      </div>
    )
  }
  return (
    <div className="flex gap-1 items-center h-5 px-1">
      {[0, 1, 2].map(i => (
        <motion.div
          key={i}
          className="w-2 h-2 rounded-full"
          style={{ background: '#6366f1' }}
          animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 0.9, delay: i * 0.2, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

// ── Simple markdown renderer (bold + line breaks) ─────────────────────────────
function renderContent(text) {
  return text.split('\n').map((line, i) => {
    const parts = line.split(/\*\*(.+?)\*\*/g)
    return (
      <p key={i} className={line === '' ? 'mb-2' : 'mb-0.5'}>
        {parts.map((part, j) => j % 2 === 1 ? <strong key={j}>{part}</strong> : part)}
      </p>
    )
  })
}

// ── Main component ─────────────────────────────────────────────────────────────
export default function MamoChat() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  // Topic context from URL: /mamo?topic=waves&label=Waves
  const topicSlug  = searchParams.get('topic') || ''
  const rawLabel   = searchParams.get('label') || topicSlug
  // Humanise underscore slugs: "energy_stores" → "Energy Stores"
  const topicLabel = rawLabel
    ? rawLabel.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
    : ''

  // Per-topic localStorage key (falls back to 'general')
  const storageKey = `mamo_thread_${topicSlug || 'general'}`

  const [messages, setMessages] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(storageKey) || 'null')
      if (stored && Array.isArray(stored) && stored.length > 0) return stored
    } catch {}
    return [INITIAL_MSG]
  })

  const [input, setInput]               = useState('')
  const [streaming, setStreaming]       = useState(false)
  const [lastUserMsg, setLastUserMsg]   = useState('')
  const [selectedTopic, setSelectedTopic] = useState(null)
  const messagesRef = useRef(null)
  const inputRef  = useRef(null)
  const abortRef  = useRef(null)

  // Quick-pick topics for the topic selector (hardcoded for speed)
  const QUICK_TOPICS = [
    'Energy Stores', 'Forces', 'Waves', 'Electricity',
    'Atomic Structure', 'Particle Model', 'Magnetism', 'Space Physics',
    'Motion', 'Radiation', 'Pressure', 'Circuits',
  ]

  // Effective topic label: URL param takes priority, then manual picker
  const effectiveTopicLabel = topicLabel || selectedTopic
  // Persist messages to localStorage (skip the initial welcome msg)
  useEffect(() => {
    if (messages.length <= 1) return
    const newData = JSON.stringify(messages.slice(-50))
    // Evict oldest mamo thread(s) if total localStorage usage is approaching 4MB
    try {
      let total = 0
      for (let k in localStorage) total += (localStorage[k]?.length || 0)
      if (total > 4 * 1024 * 1024) {
        const mamoKeys = Object.keys(localStorage).filter(k => k.startsWith('mamo_thread_') && k !== storageKey)
        // Remove oldest keys (not the current thread) until under limit
        for (const key of mamoKeys) {
          localStorage.removeItem(key)
          let newTotal = 0
          for (let k in localStorage) newTotal += (localStorage[k]?.length || 0)
          if (newTotal <= 3.5 * 1024 * 1024) break
        }
      }
      localStorage.setItem(storageKey, newData)
    } catch (e) {
      console.warn('localStorage full, skipping save')
    }
  }, [messages, storageKey])

  // Cancel any in-flight stream on unmount to prevent setState-after-unmount
  useEffect(() => {
    return () => {
      abortRef.current?.abort()
    }
  }, [])

  // Auto-scroll to bottom on new messages — direct scrollTop avoids iOS scrollIntoView bug
  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight
    }
  }, [messages, streaming])

  const clearThread = () => {
    localStorage.removeItem(storageKey)
    setMessages([INITIAL_MSG])
  }

  // ── Send message with SSE streaming ─────────────────────────────────────────
  const sendMessage = useCallback(async (text) => {
    const raw = (text || input).trim()
    if (!raw || streaming) return

    // Sanitise: cap at 1000 chars, strip injected role markers
    const userMsg = raw
      .slice(0, 1000)
      .replace(/\bsystem\s*:/gi, '')
      .replace(/\bassistant\s*:/gi, '')

    setLastUserMsg(userMsg)
    setInput('')

    const history = [...messages, { role: 'user', content: userMsg }]
    setMessages(history)
    setStreaming(true)

    // Filter out welcome msg from history sent to API
    const apiMessages = history
      .filter(m => !(m.role === 'assistant' && m.content === INITIAL_MSG.content))
      .map(m => ({ role: m.role, content: m.content }))

    const apiBase = import.meta.env.VITE_API_BASE || 'https://neurophysics.vercel.app'
    const controller = new AbortController()
    abortRef.current = controller

    // Append a streaming placeholder
    setMessages(prev => [...prev, { role: 'assistant', content: '', streaming: true }])

    let accumulated = ''
    let errorCode = null

    try {
      const session = supabase ? (await supabase.auth.getSession()).data?.session : null

      // Guest users have no session — show sign-in prompt instead of a silent 401
      if (!session?.access_token) {
        setStreaming(false)
        setMessages(prev => {
          const withoutPlaceholder = prev.filter(m => !m.streaming)
          return [...withoutPlaceholder, {
            role: 'assistant',
            content: '🔒 **Sign in to use Mamo.** Create a free account to unlock the AI tutor and your progress will be saved across devices.',
          }]
        })
        return
      }

      const res = await fetch(`${apiBase}/api/gemini`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          ...(session?.access_token ? { 'Authorization': `Bearer ${session.access_token}` } : {}),
        },
        signal: controller.signal,
        body: JSON.stringify({
          messages: apiMessages,
          topicContext: effectiveTopicLabel || undefined,
          boardName: getSelectedBoard().name,
          gValue: getSelectedBoard().g || 9.8,
        }),
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        errorCode = err.error || `HTTP_${res.status}`
        throw new Error(errorCode)
      }

      const reader = res.body.getReader()
      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value, { stream: true })
        const lines = chunk.split('\n')

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue
          const data = line.slice(6).trim()
          if (data === '[DONE]') break

          try {
            const parsed = JSON.parse(data)

            // Check for error payload from our proxy
            if (parsed.error) {
              errorCode = parsed.error
              throw new Error(errorCode)
            }

            // Extract text delta from Gemini SSE
            const text = parsed.candidates?.[0]?.content?.parts?.[0]?.text || ''
            if (text) {
              accumulated += text
              setMessages(prev => {
                const updated = [...prev]
                updated[updated.length - 1] = { role: 'assistant', content: accumulated, streaming: true }
                return updated
              })
            }
          } catch (parseErr) {
            if (parseErr.message !== data) throw parseErr // re-throw real errors
          }
        }
      }
    } catch (e) {
      if (e.name === 'AbortError') {
        // User cancelled — keep partial text if any
        setMessages(prev => {
          const updated = [...prev]
          if (accumulated) {
            updated[updated.length - 1] = { role: 'assistant', content: accumulated }
          } else {
            updated.splice(-1, 1) // remove empty placeholder
          }
          return updated
        })
        setStreaming(false)
        return
      }

      // Error state
      const msg = errorCode ? friendlyError(errorCode) : friendlyError(null)
      setMessages(prev => {
        const updated = [...prev]
        updated[updated.length - 1] = { role: 'assistant', content: msg, isError: true }
        return updated
      })
      setStreaming(false)
      return
    }

    // Finalise streaming message
    setMessages(prev => {
      const updated = [...prev]
      updated[updated.length - 1] = {
        role: 'assistant',
        content: accumulated || "Sorry, I couldn't generate a response.",
      }
      return updated
    })
    setStreaming(false)

  }, [input, streaming, messages, effectiveTopicLabel])

  return (
    <div className="flex flex-col h-full overflow-hidden" style={{ background: '#080f1e' }}>
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <PageHeader
        onBack={() => navigate(-1)}
        title={
          <div className="flex items-center gap-2 min-w-0">
            <div
              className="w-10 h-10 rounded-[14px] flex items-center justify-center shrink-0"
              style={{ background: 'linear-gradient(135deg, #6366f120, #c084fc20)', border: '1px solid #6366f150' }}
            >
              <AtomIcon size={20} color="#6366f1" />
            </div>
            <div className="flex items-center gap-2 min-w-0">
              <div className="text-base font-bold" style={{ color: '#f8fafc' }}>Mamo</div>
              <div className="text-xs px-1.5 py-0.5 rounded-md shrink-0" style={{ color: '#a8b8cc', background: 'rgba(168,184,204,0.1)', border: '0.75px solid rgba(168,184,204,0.2)' }}>
                {getSelectedBoard().name}
              </div>
            </div>
          </div>
        }
        subtitle={
          effectiveTopicLabel ? (
            <div className="text-xs truncate" style={{ color: '#6366f1' }}>
              Studying: {effectiveTopicLabel}
            </div>
          ) : (
            <div className="text-xs" style={{ color: '#00bc7d' }}>● AI-powered physics tutor</div>
          )
        }
        rightSlot={
          <button
            className="w-11 h-11 rounded-[12px] flex items-center justify-center shrink-0"
            style={{ background: 'rgba(255,255,255,0.07)', border: '0.75px solid rgba(255,255,255,0.1)' }}
            onClick={clearThread}
            aria-label="Clear conversation"
          >
            <Trash2 size={15} color="#a8b8cc" />
          </button>
        }
      />

      {/* ── AI disclosure banner ────────────────────────────────────────────── */}
      <div
        className="px-4 py-2 shrink-0 flex items-center gap-2"
        style={{ background: 'rgba(99,102,241,0.07)', borderBottom: '0.75px solid rgba(99,102,241,0.15)' }}
        role="note"
        aria-label="AI-generated content disclosure"
      >
        <Sparkles size={11} color="#818cf8" />
        <span className="text-xs" style={{ color: '#818cf8' }}>
          Mamo's responses are <strong>AI-generated</strong> by Gemini (Google). Always verify with your teacher.
        </span>
      </div>

      {/* ── Messages ─────────────────────────────────────────────────────────── */}
      <div ref={messagesRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3" style={{ minHeight: 0 }}>
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} gap-2`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.04 }}
          >
            {msg.role === 'assistant' && (
              <div
                className="w-7 h-7 rounded-full shrink-0 flex items-center justify-center mt-1"
                style={{ background: '#6366f120', border: '1px solid #6366f140' }}
              >
                <Sparkles size={12} color="#6366f1" />
              </div>
            )}
            <div style={{ maxWidth: '82%' }}>
              <div
                className="rounded-[16px] px-4 py-3 text-sm leading-relaxed"
                style={{
                  background: msg.role === 'user'
                    ? 'linear-gradient(135deg, #6366f1, #6366f1cc)'
                    : msg.isError ? 'rgba(239,68,68,0.08)' : 'rgba(15,22,41,0.95)',
                  border: msg.role === 'user' ? 'none'
                    : msg.isError ? '0.75px solid rgba(239,68,68,0.3)'
                    : '0.75px solid rgba(255,255,255,0.08)',
                  color: '#f8fafc',
                  boxShadow: msg.role === 'user' ? '0 4px 16px rgba(99,102,241,0.3)' : 'none',
                }}
              >
                {renderContent(msg.content)}
                {msg.streaming && msg.content && (
                  <span
                    className="inline-block w-0.5 h-4 ml-0.5 align-middle rounded-full"
                    style={{ background: '#6366f1', animation: 'blink 0.8s step-end infinite' }}
                  />
                )}
              </div>

              {/* Streaming loading dots (empty placeholder) */}
              {msg.streaming && !msg.content && (
                <div
                  className="rounded-[16px] px-4 py-3 mt-1"
                  style={{ background: 'rgba(15,22,41,0.95)', border: '0.75px solid rgba(255,255,255,0.08)' }}
                >
                  <TypingDots />
                </div>
              )}

              {msg.isError && lastUserMsg && (
                <button
                  className="mt-2 px-4 py-2.5 rounded-[12px] text-xs font-semibold min-h-[44px] flex items-center gap-2"
                  style={{
                    background: 'rgba(99,102,241,0.1)',
                    border: '0.75px solid rgba(99,102,241,0.3)',
                    color: '#818cf8',
                  }}
                  onClick={() => {
                    setMessages(prev => prev.slice(0, -1))
                    sendMessage(lastUserMsg)
                  }}
                >
                  <RotateCcw size={13} />
                  Retry
                </button>
              )}
            </div>
          </motion.div>
        ))}

        {/* Suggested questions (empty state — wrapping chip grid) */}
        {messages.length === 1 && (
          <motion.div
            className="mt-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="text-xs px-1 mb-2" style={{ color: '#a8b8cc' }}>Try asking:</div>
            <div className="flex flex-wrap gap-2">
              {getStarters(effectiveTopicLabel).map((q, i) => (
                <motion.button
                  key={i}
                  className="text-left px-3 py-2 rounded-[12px] text-xs"
                  style={{
                    background: 'rgba(99,102,241,0.08)',
                    border: '0.75px solid rgba(99,102,241,0.25)',
                    color: '#cad5e2',
                  }}
                  onClick={() => sendMessage(q)}
                  whileTap={{ scale: 0.97 }}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 + i * 0.05 }}
                >
                  {q}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

      </div>

      {/* ── Quick-starter chip rail (always visible, wraps to 2 rows max) ──── */}
      {messages.length > 1 && (
        <div
          className="px-4 py-2 shrink-0 flex flex-wrap gap-2"
          style={{ borderTop: '0.75px solid rgba(255,255,255,0.07)', background: 'rgba(8,15,30,0.97)' }}
        >
          {getStarters(effectiveTopicLabel).map((q, i) => (
            <button
              key={i}
              className="shrink-0 px-3 py-2.5 rounded-full text-xs font-medium whitespace-nowrap"
              style={{
                background: 'rgba(99,102,241,0.10)',
                border: '0.75px solid rgba(99,102,241,0.25)',
                color: '#818cf8',
              }}
              onClick={() => sendMessage(q)}
            >
              {q.slice(0, 32)}{q.length > 32 ? '…' : ''}
            </button>
          ))}
        </div>
      )}

      {/* ── Topic selector (shown when no URL topic is set) ─────────────────── */}
      {!topicLabel && (
        <div
          className="px-4 pt-2.5 pb-1 shrink-0"
          style={{ borderTop: '0.75px solid rgba(255,255,255,0.06)', background: 'rgba(8,15,30,0.98)' }}
        >
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs" style={{ color: '#a8b8cc' }}>What are you studying?</span>
            {selectedTopic && (
              <button
                className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold"
                style={{ background: 'rgba(0,212,255,0.12)', border: '0.75px solid rgba(0,212,255,0.35)', color: '#00d4ff' }}
                onClick={() => setSelectedTopic(null)}
              >
                {selectedTopic}
                <span style={{ fontSize: 10, lineHeight: 1 }}>✕</span>
              </button>
            )}
          </div>
          {!selectedTopic && (
            <div className="flex gap-1.5 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
              {QUICK_TOPICS.map(t => (
                <button
                  key={t}
                  className="shrink-0 px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap"
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '0.75px solid rgba(255,255,255,0.12)',
                    color: '#a8b8cc',
                  }}
                  onClick={() => setSelectedTopic(t)}
                >
                  {t}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── Input bar ────────────────────────────────────────────────────────── */}
      <div
        className="px-4 py-3 shrink-0 flex gap-2 items-end"
        style={{ borderTop: '0.75px solid rgba(255,255,255,0.07)', background: 'rgba(8,15,30,0.98)' }}
      >
        <textarea
          ref={inputRef}
          className="flex-1 px-4 py-3 rounded-[10px] text-sm outline-none resize-none"
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: '0.75px solid rgba(255,255,255,0.1)',
            color: '#f8fafc',
            minHeight: 48,
            maxHeight: 120,
            lineHeight: 1.5,
            overflowY: 'auto',
          }}
          placeholder="Ask Mamo a physics question..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              sendMessage()
            }
          }}
          enterKeyHint="send"
          rows={1}
        />
        <motion.button
          className="w-12 h-12 rounded-[14px] flex items-center justify-center shrink-0"
          style={{
            background: input.trim() && !streaming
              ? 'linear-gradient(135deg, #6366f1, #6366f1cc)'
              : 'rgba(255,255,255,0.08)',
            boxShadow: input.trim() && !streaming ? '0 4px 16px rgba(99,102,241,0.4)' : 'none',
          }}
          onClick={() => sendMessage()}
          whileTap={{ scale: 0.92 }}
          disabled={!input.trim() || streaming}
        >
          <Send size={18} color={input.trim() && !streaming ? '#fff' : '#a8b8cc'} />
        </motion.button>
      </div>

      {/* Cursor blink keyframe */}
      <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
    </div>
  )
}
