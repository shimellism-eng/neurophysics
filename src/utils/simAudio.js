import { useRef, useEffect } from 'react'

/**
 * useSimAudio — Web Audio oscillator for sim sonification.
 * Off by default; call startTone() on user toggle.
 * setFreq() smoothly updates pitch while tone is playing.
 */
export function useSimAudio() {
  const ctxRef  = useRef(null)
  const oscRef  = useRef(null)
  const gainRef = useRef(null)

  const getCtx = () => {
    if (!ctxRef.current) {
      ctxRef.current = new (window.AudioContext || window.webkitAudioContext)()
    }
    if (ctxRef.current.state === 'suspended') ctxRef.current.resume()
    return ctxRef.current
  }

  const stopTone = () => {
    if (gainRef.current) {
      try {
        const ctx = ctxRef.current
        gainRef.current.gain.setTargetAtTime(0, ctx.currentTime, 0.05)
        setTimeout(() => {
          try { oscRef.current?.stop(); oscRef.current?.disconnect() } catch {}
          try { gainRef.current?.disconnect() } catch {}
          oscRef.current  = null
          gainRef.current = null
        }, 200)
      } catch {}
    }
  }

  const startTone = (freq, type = 'sine', vol = 0.12) => {
    stopTone()
    setTimeout(() => {
      try {
        const ctx = getCtx()
        const osc  = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = type
        osc.frequency.setValueAtTime(Math.max(20, freq), ctx.currentTime)
        gain.gain.setValueAtTime(0, ctx.currentTime)
        gain.gain.setTargetAtTime(vol, ctx.currentTime, 0.08)
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.start()
        oscRef.current  = osc
        gainRef.current = gain
      } catch {}
    }, 220)
  }

  const setFreq = (freq) => {
    if (oscRef.current && ctxRef.current) {
      oscRef.current.frequency.setTargetAtTime(
        Math.max(20, freq),
        ctxRef.current.currentTime,
        0.08
      )
    }
  }

  // Cleanup on unmount
  useEffect(() => () => {
    try { oscRef.current?.stop() } catch {}
    try { ctxRef.current?.close() } catch {}
  }, [])

  return { startTone, setFreq, stopTone }
}
