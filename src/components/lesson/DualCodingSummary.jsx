/**
 * DualCodingSummary — Step 7
 * Consolidates the schema in both visual and verbal channels simultaneously.
 * The act of producing the summary IS a retrieval event.
 *
 * Research:
 * - Paivio dual coding: visual + verbal channels encode independently and
 *   together produce far more durable memory than either alone
 * - Mayer coherence principle: diagram + equation + one sentence together
 *   (not on separate screens) optimises encoding
 * - Self-generation effect: producing the summary is more powerful than re-reading
 * - Voice input for dyslexic learners: demonstrates understanding without
 *   being penalised for writing speed
 */
import { motion } from 'motion/react'
import { useState } from 'react'
import { BookOpen, Volume2, CheckCircle2, Mic } from 'lucide-react'

export default function DualCodingSummary({ summary, moduleColor, topicTitle, onComplete }) {
  const { equation, sentence, promptText, DiagramComponent } = summary
  const [userSummary, setUserSummary] = useState('')
  const [saved, setSaved] = useState(false)
  const [recording, setRecording] = useState(false)

  const handleSave = () => {
    if (!userSummary.trim()) return
    // Save to sessionStorage so summary is visible if user revisits this step in the same session
    try {
      const key = `np_summary_${topicTitle?.replace(/\s+/g, '_') || 'draft'}`
      sessionStorage.setItem(key, userSummary.trim())
    } catch { /* storage full — non-critical */ }
    setSaved(true)
  }

  const handleSpeak = () => {
    if (!('speechSynthesis' in window)) return
    window.speechSynthesis.cancel()
    const utt = new SpeechSynthesisUtterance(`${equation}. ${sentence}`)
    utt.rate = 0.85
    window.speechSynthesis.speak(utt)
  }

  // Voice note simulation — actual recording would need MediaRecorder API
  const handleVoiceNote = () => {
    setRecording(true)
    setTimeout(() => {
      setRecording(false)
      setUserSummary('[Voice note recorded]')
    }, 2500)
  }

  return (
    <div className="px-5 py-5 flex flex-col gap-5">

      {/* Dual code card: equation + sentence side by side */}
      <div
        className="rounded-[20px] overflow-hidden"
        style={{ border: `1.5px solid ${moduleColor}35` }}
      >
        {/* Header */}
        <div
          className="px-4 py-3 flex items-center gap-2"
          style={{ background: `${moduleColor}15` }}
        >
          <BookOpen size={14} color={moduleColor} />
          <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: moduleColor }}>
            Lock It In
          </span>
          {/* TTS button */}
          <button
            className="ml-auto flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold"
            style={{ background: `${moduleColor}20`, color: moduleColor }}
            onClick={handleSpeak}
            aria-label="Read aloud"
          >
            <Volume2 size={10} />
            Read aloud
          </button>
        </div>

        {/* Diagram (if provided) */}
        {DiagramComponent && (
          <div
            className="px-4 py-3"
            style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
          >
            <DiagramComponent />
          </div>
        )}

        {/* Equation */}
        <div
          className="px-4 py-3 flex items-center gap-3"
          style={{ background: 'rgba(0,0,0,0.2)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div
            className="text-lg font-bold font-mono"
            style={{ color: moduleColor }}
          >
            {equation}
          </div>
        </div>

        {/* Plain-English sentence */}
        <div className="px-4 py-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
          <p className="text-sm leading-relaxed" style={{ color: '#cad5e2' }}>
            {sentence}
          </p>
        </div>
      </div>

      {/* Self-generation prompt */}
      <div
        className="rounded-[18px] px-4 py-4"
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}
      >
        <div className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: 'rgba(255,255,255,0.35)' }}>
          In your own words
        </div>
        <p className="text-xs mb-3" style={{ color: 'rgba(255,255,255,0.5)' }}>
          {promptText || `Explain the key idea of "${topicTitle}" in one sentence, as if telling a friend.`}
        </p>

        {!saved ? (
          <>
            <textarea
              value={userSummary}
              onChange={e => setUserSummary(e.target.value)}
              placeholder="Type your summary here…"
              rows={3}
              className="w-full bg-transparent text-sm resize-none outline-none"
              style={{
                color: '#f8fafc',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 12,
                padding: '10px 14px',
                marginBottom: 8,
              }}
            />
            <div className="flex gap-2">
              {/* Voice note button */}
              <button
                className="flex items-center gap-1.5 px-3 py-2 rounded-[10px] text-xs font-semibold"
                style={{
                  background: recording ? 'rgba(239,68,68,0.12)' : 'rgba(255,255,255,0.06)',
                  border: recording ? '1px solid rgba(239,68,68,0.3)' : '1px solid rgba(255,255,255,0.1)',
                  color: recording ? '#f87171' : 'rgba(255,255,255,0.4)',
                }}
                onClick={handleVoiceNote}
              >
                <Mic size={12} />
                {recording ? 'Recording…' : 'Voice note'}
              </button>

              <motion.button
                className="flex-1 py-2 rounded-[10px] font-bold text-xs"
                style={{
                  background: userSummary.trim()
                    ? `${moduleColor}`
                    : 'rgba(255,255,255,0.05)',
                  color: userSummary.trim() ? '#fff' : 'rgba(255,255,255,0.3)',
                }}
                onClick={handleSave}
                whileTap={userSummary.trim() ? { scale: 0.97 } : {}}
              >
                Save to my cards
              </motion.button>
            </div>
          </>
        ) : (
          <motion.div
            className="flex items-center gap-3 px-4 py-3 rounded-[12px]"
            style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.25)' }}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <CheckCircle2 size={18} color="#4ade80" />
            <div>
              <div className="text-xs font-bold" style={{ color: '#4ade80' }}>Saved for this session ✓</div>
              <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>{userSummary}</p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Skip option for learners who prefer not to write */}
      <motion.button
        className="w-full py-4 rounded-[16px] font-bold text-sm"
        style={{
          background: `${moduleColor}`,
          boxShadow: `0 8px 24px ${moduleColor}30`,
          color: '#fff',
        }}
        onClick={onComplete}
        whileTap={{ scale: 0.97 }}
      >
        {saved ? 'Continue →' : 'Continue (skip for now)'}
      </motion.button>
    </div>
  )
}
