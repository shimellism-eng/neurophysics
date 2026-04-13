/**
 * useSessionTimer — tracks how long a study session has been active
 * and surfaces a break nudge at 15 and 25 minutes.
 * F10/F12: ADHD pacing scaffold.
 */
import { useState, useEffect, useRef } from 'react'

export function useSessionTimer(enabled = true) {
  const [elapsedMinutes, setElapsedMinutes] = useState(0)
  const [breakDue, setBreakDue] = useState(false) // first nudge at 15 min
  const [longBreakDue, setLongBreakDue] = useState(false) // second nudge at 25 min
  const [dismissed, setDismissed] = useState(false)
  // Persist start time in sessionStorage so a page refresh within the same
  // browser session doesn't reset the clock (fixes ADHD break-nudge reliability)
  const startRef = useRef(null)
  if (startRef.current === null) {
    try {
      const stored = sessionStorage.getItem('_np_session_start')
      startRef.current = stored ? parseInt(stored, 10) : Date.now()
      if (!stored) sessionStorage.setItem('_np_session_start', String(startRef.current))
    } catch {
      startRef.current = Date.now()
    }
  }

  // Refs mirror the state values so the interval callback never has stale closures
  // and the effect dep array stays stable — no interval reset on every nudge fire.
  const breakDueRef = useRef(false)
  const longBreakDueRef = useRef(false)

  useEffect(() => {
    if (!enabled) return
    const interval = setInterval(() => {
      const mins = Math.floor((Date.now() - startRef.current) / 60000)
      setElapsedMinutes(mins)
      if (mins >= 25 && !longBreakDueRef.current) {
        longBreakDueRef.current = true
        setLongBreakDue(true)
      } else if (mins >= 15 && !breakDueRef.current) {
        breakDueRef.current = true
        setBreakDue(true)
      }
    }, 30000) // check every 30s
    return () => clearInterval(interval)
  }, [enabled]) // stable dep — no interval reset on nudge state changes

  const dismissBreak = () => {
    setBreakDue(false)
    setLongBreakDue(false)
    setDismissed(true)
    // Reset refs so next nudge cycle can fire again
    breakDueRef.current = false
    longBreakDueRef.current = false
    // Reset clock after dismiss so next nudge fires fresh from now
    const now = Date.now()
    startRef.current = now
    try { sessionStorage.setItem('_np_session_start', String(now)) } catch {}
  }

  const showNudge = !dismissed && (breakDue || longBreakDue)
  const nudgeLevel = longBreakDue ? 'long' : 'short'

  return { elapsedMinutes, showNudge, nudgeLevel, dismissBreak }
}
