import { motion, AnimatePresence } from 'motion/react'
import { useState, useRef, useEffect } from 'react'
import { Send, Sparkles, Key, ArrowLeft, RotateCcw } from 'lucide-react'
import AtomIcon from '../components/AtomIcon'
import { useNavigate } from 'react-router-dom'
import { secureGet, secureSet } from '../utils/secureStorage'

const SUGGESTED = [
  'What is the difference between speed and velocity?',
  'How does radioactive decay work?',
  'Can you explain waves in simple steps?',
  'What is the conservation of energy?',
]

function TypingDots() {
  // F4: stop infinite animation when reduce-motion is on
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

export default function MamoChat() {
  const navigate = useNavigate()
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm **Mamo**, your physics tutor 🔬\n\nAsk me anything about GCSE Physics - I'll break it down step by step. You can also use the buttons below to get started.",
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [apiKey, setApiKey] = useState('')
  const [showKeyInput, setShowKeyInput] = useState(false)
  const [lastUserMessage, setLastUserMessage] = useState('')
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  // Load API key from secure storage on mount
  useEffect(() => {
    secureGet('mamo_api_key').then(v => { if (v) setApiKey(v) })
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const saveKey = (k) => {
    setApiKey(k)
    secureSet('mamo_api_key', k)
  }

  const sendMessage = async (text) => {
    const raw = (text || input).trim()
    if (!raw || loading) return
    // No client key needed — server uses ANTHROPIC_API_KEY env var.
    // If a user has entered their own key in Settings it will be used instead.

    // Sanitise: hard cap at 1000 chars and strip any injected role/system markers
    const userMsg = raw
      .slice(0, 1000)
      .replace(/\bsystem\s*:/gi, '')
      .replace(/\bassistant\s*:/gi, '')

    setLastUserMessage(userMsg)
    setInput('')
    const newMessages = [...messages, { role: 'user', content: userMsg }]
    setMessages(newMessages)
    setLoading(true)

    try {
      const body = {
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 600,
        // System prompt is enforced server-side in api/anthropic.js
        messages: newMessages
          .filter(m => m.role !== 'assistant' || !m.content.startsWith("Hi! I'm **Mamo**"))
          .map(m => ({ role: m.role, content: m.content })),
      }
      const apiBase = import.meta.env.VITE_API_BASE || 'https://neurophysics.vercel.app'
      const res = await fetch(`${apiBase}/api/anthropic`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          ...(apiKey ? { 'x-api-key': apiKey } : {}),
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify(body),
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err?.error?.message || `HTTP ${res.status}`)
      }

      const data = await res.json()
      const reply = data.content?.[0]?.text || 'Sorry, I couldn\'t generate a response.'
      setMessages(prev => [...prev, { role: 'assistant', content: reply }])
    } catch (e) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `Couldn't reach Mamo right now.\n\n**Error:** ${e.message}`,
        isError: true,
      }])
    } finally {
      setLoading(false)
    }
  }

  const renderContent = (text) => {
    return text.split('\n').map((line, i) => {
      const parts = line.split(/\*\*(.+?)\*\*/g)
      return (
        <p key={i} className={line === '' ? 'mb-2' : 'mb-0.5'}>
          {parts.map((part, j) => j % 2 === 1 ? <strong key={j}>{part}</strong> : part)}
        </p>
      )
    })
  }

  return (
    <div className="flex flex-col h-full overflow-hidden" style={{ background: '#0b1121' }}>
      {/* Header */}
      <div
        className="px-5 pt-5 pb-4 shrink-0 flex items-center gap-3"
        style={{ borderBottom: '0.75px solid #1d293d' }}
      >
        <button
          className="w-11 h-11 rounded-[12px] flex items-center justify-center shrink-0"
          style={{ background: 'rgba(18,26,47,0.9)', border: '0.75px solid #1d293d' }}
          onClick={() => navigate(-1)}
          aria-label="Go back"
        >
          <ArrowLeft size={18} color="#a8b8cc" />
        </button>
        <div
          className="w-10 h-10 rounded-[14px] flex items-center justify-center shrink-0"
          style={{ background: 'linear-gradient(135deg, #6366f120, #c084fc20)', border: '1px solid #6366f150' }}
        >
          <AtomIcon size={20} color="#6366f1" />
        </div>
        <div className="flex-1">
          <div className="text-base font-bold" style={{ color: '#f8fafc' }}>Mamo</div>
          <div className="text-xs" style={{ color: '#00bc7d' }}>● Physics Tutor · Always here</div>
        </div>
        <button
          className="w-11 h-11 rounded-[12px] flex items-center justify-center"
          style={{ background: 'rgba(18,26,47,0.9)', border: '0.75px solid #1d293d' }}
          onClick={() => setShowKeyInput(v => !v)}
        >
          <Key size={15} color={apiKey ? '#00bc7d' : '#a8b8cc'} />
        </button>
      </div>

      {/* AI disclosure banner — required by App Store guideline 2.5.18 */}
      <div
        className="px-4 py-2 shrink-0 flex items-center gap-2"
        style={{ background: 'rgba(99,102,241,0.07)', borderBottom: '0.75px solid rgba(99,102,241,0.15)' }}
        role="note"
        aria-label="AI-generated content disclosure"
      >
        <Sparkles size={11} color="#818cf8" />
        <span className="text-xs" style={{ color: '#818cf8' }}>
          Mamo's responses are <strong>AI-generated</strong> by Claude (Anthropic). Always verify with your teacher.
        </span>
      </div>

      {/* API key input (collapsible) */}
      <AnimatePresence>
        {showKeyInput && (
          <motion.div
            className="px-5 py-3 shrink-0"
            style={{ background: 'rgba(18,26,47,0.9)', borderBottom: '0.75px solid #1d293d' }}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            <div className="text-xs mb-2" style={{ color: '#a8b8cc' }}>
              Anthropic API key - stored locally, never sent anywhere except to Anthropic.
            </div>
            <div className="flex gap-2">
              <input
                type="password"
                placeholder="sk-ant-..."
                value={apiKey}
                onChange={e => saveKey(e.target.value)}
                className="flex-1 px-3 py-2 rounded-[10px] text-sm font-mono outline-none"
                style={{ background: '#1d293d', color: '#f8fafc', border: '0.75px solid #2d3e55' }}
              />
              <button
                className="px-3 py-2 rounded-[10px] text-xs font-semibold"
                style={{ background: '#6366f1', color: '#fff' }}
                onClick={() => setShowKeyInput(false)}
              >
                Save
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} gap-2`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
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
                    : msg.isError ? 'rgba(239,68,68,0.08)' : 'rgba(18,26,47,0.9)',
                  border: msg.role === 'user' ? 'none' : msg.isError ? '0.75px solid rgba(239,68,68,0.3)' : '0.75px solid #1d293d',
                  color: '#f8fafc',
                  boxShadow: msg.role === 'user' ? '0 4px 16px rgba(99,102,241,0.3)' : 'none',
                }}
              >
                {renderContent(msg.content)}
              </div>
              {msg.isError && lastUserMessage && (
                <button
                  className="mt-2 px-4 py-2.5 rounded-[12px] text-xs font-semibold min-h-[44px] flex items-center gap-2"
                  style={{
                    background: 'rgba(99,102,241,0.1)',
                    border: '0.75px solid rgba(99,102,241,0.3)',
                    color: '#818cf8',
                  }}
                  onClick={() => {
                    setMessages(prev => prev.slice(0, -1))
                    sendMessage(lastUserMessage)
                  }}
                >
                  <RotateCcw size={13} />
                  Retry
                </button>
              )}
            </div>
          </motion.div>
        ))}

        {loading && (
          <motion.div className="flex justify-start gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div
              className="w-7 h-7 rounded-full shrink-0 flex items-center justify-center mt-1"
              style={{ background: '#6366f120', border: '1px solid #6366f140' }}
            >
              <Sparkles size={12} color="#6366f1" />
            </div>
            <div
              className="rounded-[16px] px-4 py-3"
              style={{ background: 'rgba(18,26,47,0.9)', border: '0.75px solid #1d293d' }}
            >
              <TypingDots />
            </div>
          </motion.div>
        )}

        {/* Suggested questions (shown at start, collapsed to chips after first message) */}
        {messages.length === 1 ? (
          <motion.div
            className="space-y-2 mt-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="text-xs px-1 mb-1" style={{ color: '#a8b8cc' }}>Try asking:</div>
            {SUGGESTED.map((q, i) => (
              <motion.button
                key={i}
                className="w-full text-left px-4 py-3 rounded-[14px] text-sm"
                style={{
                  background: 'rgba(99,102,241,0.08)',
                  border: '0.75px solid rgba(99,102,241,0.25)',
                  color: '#cad5e2',
                }}
                onClick={() => sendMessage(q)}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 + i * 0.06 }}
              >
                {q}
              </motion.button>
            ))}
          </motion.div>
        ) : null}

        <div ref={bottomRef} />
      </div>

      {/* F13: Persistent quick-starters chip rail — always visible */}
      {messages.length > 1 && (
        <div
          className="px-4 py-2 shrink-0 flex gap-2 overflow-x-auto"
          style={{ borderTop: '0.75px solid #1d293d', background: 'rgba(11,17,33,0.9)' }}
        >
          {SUGGESTED.map((q, i) => (
            <button
              key={i}
              className="shrink-0 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap"
              style={{ background: 'rgba(99,102,241,0.10)', border: '0.75px solid rgba(99,102,241,0.25)', color: '#818cf8' }}
              onClick={() => sendMessage(q)}
            >
              {q.slice(0, 28)}{q.length > 28 ? '…' : ''}
            </button>
          ))}
        </div>
      )}

      {/* Input bar */}
      <div
        className="px-4 py-3 shrink-0 flex gap-2 items-end"
        style={{ borderTop: '0.75px solid #1d293d', background: 'rgba(11,17,33,0.95)' }}
      >
        <textarea
          ref={inputRef}
          className="flex-1 px-4 py-3 rounded-[16px] text-sm outline-none resize-none"
          style={{
            background: 'rgba(18,26,47,0.9)',
            border: '0.75px solid #1d293d',
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
          rows={1}
        />
        <motion.button
          className="w-12 h-12 rounded-[14px] flex items-center justify-center shrink-0"
          style={{
            background: input.trim() && !loading
              ? 'linear-gradient(135deg, #6366f1, #6366f1cc)'
              : '#1d293d',
            boxShadow: input.trim() && !loading ? '0 4px 16px rgba(99,102,241,0.4)' : 'none',
          }}
          onClick={() => sendMessage()}
          whileTap={{ scale: 0.92 }}
          disabled={!input.trim() || loading}
        >
          <Send size={18} color={input.trim() && !loading ? '#fff' : '#a8b8cc'} />
        </motion.button>
      </div>
    </div>
  )
}
