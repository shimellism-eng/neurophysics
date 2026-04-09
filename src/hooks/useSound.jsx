import { useCallback, useRef } from 'react'

// Check if user opted into sounds (we'll add a sounds pref toggle)
function isSoundEnabled() {
  try {
    const prefs = JSON.parse(localStorage.getItem('neurophysics_prefs') || '{}')
    return prefs.sounds !== false // default on, can be turned off
  } catch {
    return true
  }
}

function getCtx(ctxRef) {
  if (!ctxRef.current) {
    try {
      ctxRef.current = new (window.AudioContext || window.webkitAudioContext)()
    } catch {
      return null
    }
  }
  // Resume if suspended (iOS requires user gesture first)
  if (ctxRef.current.state === 'suspended') {
    ctxRef.current.resume()
  }
  return ctxRef.current
}

export function useSound() {
  const ctxRef = useRef(null)

  // Pleasant rising two-note "ding" for correct
  const playCorrect = useCallback(() => {
    if (!isSoundEnabled()) return
    const ctx = getCtx(ctxRef)
    if (!ctx) return

    const now = ctx.currentTime
    // First note
    const osc1 = ctx.createOscillator()
    const gain1 = ctx.createGain()
    osc1.connect(gain1)
    gain1.connect(ctx.destination)
    osc1.type = 'sine'
    osc1.frequency.setValueAtTime(523.25, now) // C5
    gain1.gain.setValueAtTime(0, now)
    gain1.gain.linearRampToValueAtTime(0.18, now + 0.01)
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.25)
    osc1.start(now)
    osc1.stop(now + 0.25)
    // Second note
    const osc2 = ctx.createOscillator()
    const gain2 = ctx.createGain()
    osc2.connect(gain2)
    gain2.connect(ctx.destination)
    osc2.type = 'sine'
    osc2.frequency.setValueAtTime(783.99, now + 0.1) // G5
    gain2.gain.setValueAtTime(0, now + 0.1)
    gain2.gain.linearRampToValueAtTime(0.15, now + 0.11)
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.35)
    osc2.start(now + 0.1)
    osc2.stop(now + 0.35)
  }, [])

  // Low soft thud for wrong answer
  const playWrong = useCallback(() => {
    if (!isSoundEnabled()) return
    const ctx = getCtx(ctxRef)
    if (!ctx) return

    const now = ctx.currentTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.type = 'sine'
    osc.frequency.setValueAtTime(200, now)
    osc.frequency.exponentialRampToValueAtTime(80, now + 0.2)
    gain.gain.setValueAtTime(0.2, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22)
    osc.start(now)
    osc.stop(now + 0.22)
  }, [])

  // Triumphant 3-note fanfare for lesson complete
  const playComplete = useCallback(() => {
    if (!isSoundEnabled()) return
    const ctx = getCtx(ctxRef)
    if (!ctx) return

    const now = ctx.currentTime
    const notes = [523.25, 659.25, 783.99] // C5, E5, G5
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.type = 'sine'
      osc.frequency.setValueAtTime(freq, now + i * 0.12)
      gain.gain.setValueAtTime(0, now + i * 0.12)
      gain.gain.linearRampToValueAtTime(0.15, now + i * 0.12 + 0.015)
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.12 + 0.4)
      osc.start(now + i * 0.12)
      osc.stop(now + i * 0.12 + 0.4)
    })
  }, [])

  // Soft tick for navigation
  const playTick = useCallback(() => {
    if (!isSoundEnabled()) return
    const ctx = getCtx(ctxRef)
    if (!ctx) return

    const now = ctx.currentTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.type = 'sine'
    osc.frequency.setValueAtTime(440, now)
    gain.gain.setValueAtTime(0.08, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06)
    osc.start(now)
    osc.stop(now + 0.06)
  }, [])

  return { playCorrect, playWrong, playComplete, playTick }
}
