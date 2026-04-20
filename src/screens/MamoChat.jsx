import { motion, AnimatePresence } from 'motion/react'
import { useState, useRef, useEffect, useCallback } from 'react'
import { PaperPlaneTilt, Sparkle, ArrowCounterClockwise } from '@phosphor-icons/react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { getSelectedBoard } from '../utils/boardConfig'
import PageHeader from '../components/PageHeader'
import { useReducedMotion } from '../hooks/useReducedMotion'

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
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    return (
      <div className="flex gap-1 items-center h-5 px-1">
        <span className="text-xs" style={{ color: 'var(--np-indigo)' }}>Thinking…</span>
      </div>
    )
  }
  return (
    <div className="flex gap-1 items-center h-5 px-1">
      {[0, 1, 2].map(i => (
        <motion.div
          key={i}
          className="w-2 h-2 rounded-full"
          style={{ background: 'var(--np-indigo)' }}
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
  const topicSlug    = searchParams.get('topic') || ''
  const rawLabel     = searchParams.get('label') || topicSlug
  // Humanise underscore slugs: "energy_stores" → "Energy Stores"
  const topicLabel   = rawLabel
    ? rawLabel.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
    : ''
  // Diagnostic context when arriving from a wrong answer
  const questionText  = searchParams.get('question') || ''
  const wrongAnswer   = searchParams.get('wrong') || ''
  const correctAnswer = searchParams.get('correct') || ''

  // Per-topic localStorage key (falls back to 'general')
  const storageKey = `mamo_thread_${topicSlug || 'general'}`

  const [messages, setMessages] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(storageKey) || 'null')
      if (stored && Array.isArray(stored) && stored.length > 0) return stored
    } catch {}
    return [INITIAL_MSG]
  })

  const [input, setInput] = useState(() => {
    if (questionText) {
      return `I got this question wrong: "${questionText}" — I chose "${wrongAnswer}" but the correct answer is "${correctAnswer}". Can you explain why?`
    }
    return ''
  })
  const [streaming, setStreaming]       = useState(false)
  const [lastUserMsg, setLastUserMsg]   = useState('')
  const [session, setSession]           = useState(undefined) // undefined = loading
  const messagesRef = useRef(null)
  const inputRef  = useRef(null)
  const abortRef  = useRef(null)

  const effectiveTopicLabel = topicLabel
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

  // Load session once on mount
  useEffect(() => {
    supabase?.auth.getSession().then(({ data }) => setSession(data?.session ?? null))
  }, [])

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

      // Guest users have no session — sign-in card shown above messages, just bail
      if (!session?.access_token) {
        setStreaming(false)
        setMessages(prev => prev.filter(m => !m.streaming))
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
        title="Mamo"
        subtitle={`AI-powered physics tutor · ${getSelectedBoard().name}`}
      />

      {/* ── Scrollable area: sign-in card + messages + suggestions + disclaimer ── */}
      <div
        ref={messagesRef}
        className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
        style={{ minHeight: 0, paddingBottom: 24 }}
        role="log"
        aria-live="polite"
        aria-label="Chat messages"
      >
        {/* Sign-in card — shown once at top when guest */}
        {session === null && (
          <div
            className="rounded-[14px] px-4 py-3 flex items-start gap-3"
            style={{ background: 'rgba(99,102,241,0.07)', border: '0.75px solid rgba(99,102,241,0.2)' }}
          >
            <span style={{ fontSize: 18 }}>🔒</span>
            <div>
              <p className="text-sm font-semibold" style={{ color: '#e2e8f0' }}>Sign in to use Mamo</p>
              <p className="text-xs mt-0.5" style={{ color: '#a8b8cc' }}>Create a free account to unlock the AI tutor. Your progress will be saved across devices.</p>
            </div>
          </div>
        )}

        {/* Messages */}
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
                style={{ background: 'var(--np-indigo)20', border: '1px solid var(--np-indigo)40' }}
              >
                <Sparkle size={12} color="var(--np-indigo)" />
              </div>
            )}
            <div style={{ maxWidth: '82%' }}>
              <div
                className="rounded-[16px] px-4 py-3 text-sm leading-relaxed"
                style={{
                  background: msg.role === 'user'
                    ? 'var(--np-indigo)'
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
                    style={{ background: 'var(--np-indigo)', animation: 'blink 0.8s step-end infinite' }}
                  />
                )}
              </div>

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
                  <ArrowCounterClockwise size={13} />
                  Retry
                </button>
              )}
            </div>
          </motion.div>
        ))}

        {/* Suggested questions — always inside scroll, directly after messages */}
        <div className="flex flex-col gap-2 pt-1">
          {effectiveTopicLabel ? (
            <div className="flex items-center gap-2 px-1 mb-1">
              <div className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>Asking about:</div>
              <div
                className="text-xs font-semibold px-2 py-0.5 rounded-full"
                style={{ background: 'rgba(99,102,241,0.15)', color: '#a5b4fc' }}
              >
                {effectiveTopicLabel}
              </div>
            </div>
          ) : (
            <div className="text-xs px-1 mb-1" style={{ color: 'rgba(255,255,255,0.35)' }}>Try asking:</div>
          )}
          {getStarters(effectiveTopicLabel).slice(0, 4).map((q, i) => (
            <motion.button
              key={i}
              className="text-left px-4 py-3 rounded-[12px] text-sm leading-snug"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '0.75px solid rgba(255,255,255,0.08)',
                color: '#cad5e2',
                minHeight: 48,
              }}
              onClick={() => sendMessage(q)}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
            >
              {q}
            </motion.button>
          ))}
        </div>

        {/* AI disclaimer */}
        <p className="text-center pt-2 pb-1" style={{ fontSize: 11, color: 'rgba(255,255,255,0.22)' }}>
          AI-generated · Always verify with your teacher
        </p>
      </div>

      {/* ── Input bar — always visible, pinned above tab nav ─────────────────── */}
      <div
        className="px-4 py-3 shrink-0 flex gap-2 items-end"
        style={{
          borderTop: '0.75px solid rgba(255,255,255,0.07)',
          background: 'rgba(8,15,30,0.98)',
          paddingBottom: 'calc(12px + env(safe-area-inset-bottom, 0px))',
        }}
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
          placeholder="Ask me anything about physics..."
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
            background: input.trim() && !streaming ? 'var(--np-indigo)' : 'rgba(255,255,255,0.08)',
            boxShadow: input.trim() && !streaming ? '0 4px 16px rgba(99,102,241,0.4)' : 'none',
          }}
          onClick={() => sendMessage()}
          whileTap={{ scale: 0.92 }}
          disabled={!input.trim() || streaming}
        >
          <PaperPlaneTilt size={18} color={input.trim() && !streaming ? '#fff' : '#a8b8cc'} />
        </motion.button>
      </div>

      {/* Cursor blink keyframe */}
      <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
    </div>
  )
}
