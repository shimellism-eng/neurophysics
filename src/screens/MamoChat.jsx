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
  content: "Hi! I'm **Mamo**. Ask a GCSE Physics question and I'll explain it step by step.",
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
        <span className="text-xs" style={{ color: 'var(--np-accent-strong)' }}>Thinking…</span>
      </div>
    )
  }
  return (
    <div className="flex gap-1 items-center h-5 px-1">
      {[0, 1, 2].map(i => (
        <motion.div
          key={i}
          className="w-2 h-2 rounded-full"
          style={{ background: 'var(--np-accent)' }}
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
  const [keyboardInset, setKeyboardInset] = useState(0)
  const messagesRef = useRef(null)
  const inputRef  = useRef(null)
  const abortRef  = useRef(null)

  const effectiveTopicLabel = topicLabel
  const guestLocked = session === null
  const keyboardOpen = keyboardInset > 120
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

  useEffect(() => {
    const viewport = window.visualViewport
    if (!viewport) return undefined

    const handleViewport = () => {
      const inset = Math.max(0, window.innerHeight - (viewport.height + viewport.offsetTop))
      setKeyboardInset(inset)
    }

    handleViewport()
    viewport.addEventListener('resize', handleViewport)
    viewport.addEventListener('scroll', handleViewport)
    return () => {
      viewport.removeEventListener('resize', handleViewport)
      viewport.removeEventListener('scroll', handleViewport)
    }
  }, [])

  useEffect(() => {
    if (!keyboardOpen || !messagesRef.current) return
    messagesRef.current.scrollTop = messagesRef.current.scrollHeight
  }, [keyboardOpen, messages.length])

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
        navigate('/auth')
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
    <div className="flex flex-col h-full overflow-hidden np-shell-gradient">
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <PageHeader
        onBack={() => navigate(-1)}
        title="Mamo"
        subtitle={`Physics support · ${getSelectedBoard().name}`}
      />

      {/* ── Scrollable area: sign-in card + messages + suggestions + disclaimer ── */}
      <div
        ref={messagesRef}
        className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
        style={{ minHeight: 0, paddingBottom: keyboardOpen ? keyboardInset + 92 : 112 }}
        role="log"
        aria-live="polite"
        aria-label="Chat messages"
      >
        {/* Sign-in card — shown once at top when guest */}
        {guestLocked && (
          <div
            className="np-card-study px-4 py-3 flex items-start gap-3"
          >
            <Sparkle size={18} color="var(--np-accent-strong)" style={{ flexShrink: 0, marginTop: 2 }} />
            <div>
              <p className="text-sm font-semibold" style={{ color: 'var(--np-text)' }}>Sign in to use Mamo</p>
              <p className="text-xs mt-0.5" style={{ color: 'var(--np-text-muted)' }}>Create a free account to ask questions, keep chat history across devices, and save your study progress.</p>
              <button
                className="mt-3 px-3 py-2 rounded-[10px] text-xs font-semibold"
                style={{ background: 'var(--np-accent)', color: '#07111d' }}
                onClick={() => navigate('/auth')}
              >
                Sign in to use Mamo
              </button>
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
                style={{ background: 'var(--np-accent-soft)', border: '1px solid rgba(94,167,161,0.24)' }}
              >
                <Sparkle size={12} color="var(--np-accent-strong)" />
              </div>
            )}
            <div style={{ maxWidth: '82%' }}>
              <div
                className="rounded-[16px] px-4 py-3 text-sm leading-relaxed"
                style={{
                  background: msg.role === 'user'
                    ? 'var(--np-accent)'
                    : msg.isError ? 'rgba(239,68,68,0.08)' : 'var(--surface-panel)',
                  border: msg.role === 'user' ? 'none'
                    : msg.isError ? '0.75px solid rgba(239,68,68,0.3)'
                    : '0.75px solid rgba(255,255,255,0.08)',
                  color: msg.role === 'user' ? '#07111d' : '#f8fafc',
                  boxShadow: msg.role === 'user' ? '0 8px 20px rgba(0,0,0,0.18)' : 'none',
                }}
              >
                {renderContent(msg.content)}
                {msg.streaming && msg.content && (
                  <span
                    className="inline-block w-0.5 h-4 ml-0.5 align-middle rounded-full"
                    style={{ background: 'var(--np-accent)', animation: 'blink 0.8s step-end infinite' }}
                  />
                )}
              </div>

              {msg.streaming && !msg.content && (
                <div
                  className="rounded-[16px] px-4 py-3 mt-1"
                  style={{ background: 'var(--surface-panel)', border: 'var(--border-quiet)' }}
                >
                  <TypingDots />
                </div>
              )}

              {msg.isError && lastUserMsg && (
                <button
                  className="mt-2 px-4 py-2.5 rounded-[12px] text-xs font-semibold min-h-[44px] flex items-center gap-2"
                  style={{
                    background: 'var(--surface-quiet)',
                    border: 'var(--border-quiet)',
                    color: 'var(--np-accent-strong)',
                  }}
              onClick={() => {
                if (guestLocked) {
                  navigate('/auth')
                  return
                }
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
        {!keyboardOpen && (
        <div className="flex flex-col gap-2 pt-1">
          {effectiveTopicLabel ? (
            <div className="flex items-center gap-2 px-1 mb-1">
              <div className="text-xs" style={{ color: 'var(--np-text-dim)' }}>Topic:</div>
              <div
                className="text-xs font-semibold px-2 py-0.5 rounded-full"
                style={{ background: 'var(--np-accent-soft)', color: 'var(--np-accent-strong)' }}
              >
                {effectiveTopicLabel}
              </div>
            </div>
          ) : (
            <div className="text-xs px-1 mb-1" style={{ color: 'var(--np-text-dim)' }}>Try one of these:</div>
          )}
          {getStarters(effectiveTopicLabel).slice(0, 3).map((q, i) => (
            <motion.button
              key={i}
              className="text-left px-4 py-3 rounded-[12px] text-sm leading-snug"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: 'var(--border-quiet)',
                color: guestLocked ? 'var(--np-text-muted)' : 'var(--np-text-mid)',
                minHeight: 48,
                opacity: guestLocked ? 0.7 : 1,
              }}
              onClick={() => {
                if (guestLocked) {
                  navigate('/auth')
                  return
                }
                sendMessage(q)
              }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
            >
              {q}
            </motion.button>
          ))}
        </div>
        )}

        {/* AI disclaimer */}
        <p className="text-center pt-2 pb-1" style={{ fontSize: 11, color: 'var(--np-text-dim)' }}>
          Study support · Check important answers with your teacher
        </p>
      </div>

      {/* ── Input bar — fixed above bottom nav, always visible ─────────────────── */}
      <div
        className="flex gap-2 items-end px-4"
        style={{
          position: 'fixed',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          maxWidth: 480,
          bottom: keyboardOpen ? `${Math.max(8, keyboardInset + 8)}px` : 'var(--bottom-chrome-height, 76px)',
          zIndex: 20,
          borderTop: '0.75px solid rgba(255,255,255,0.07)',
          background: 'rgba(7,17,29,0.96)',
          paddingTop: 12,
          paddingBottom: 8,
        }}
      >
        <textarea
          ref={inputRef}
          className="flex-1 px-4 py-3 rounded-[10px] text-sm outline-none resize-none"
          style={{
            background: 'var(--surface-quiet)',
            border: 'var(--border-quiet)',
            color: '#f8fafc',
            minHeight: 48,
            maxHeight: 120,
            lineHeight: 1.5,
            overflowY: 'auto',
          }}
          placeholder={guestLocked ? 'Sign in to ask Mamo a question' : 'Ask a physics question...'}
          disabled={guestLocked || streaming}
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
            background: input.trim() && !streaming && !guestLocked ? 'var(--np-accent)' : 'rgba(255,255,255,0.08)',
            boxShadow: input.trim() && !streaming && !guestLocked ? '0 8px 18px rgba(0,0,0,0.18)' : 'none',
            border: input.trim() && !streaming && !guestLocked ? '0.75px solid rgba(255,255,255,0.08)' : '0.75px solid rgba(255,255,255,0.06)',
          }}
          onClick={() => sendMessage()}
          whileTap={{ scale: 0.92 }}
          disabled={!input.trim() || streaming || guestLocked}
        >
          <PaperPlaneTilt size={18} color={input.trim() && !streaming && !guestLocked ? '#07111d' : 'var(--np-text-muted)'} />
        </motion.button>
      </div>

      {/* Cursor blink keyframe */}
      <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
    </div>
  )
}
