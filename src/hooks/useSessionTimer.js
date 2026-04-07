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
  const startRef = useRef(Date.now())

  useEffect(() => {
    if (!enabled) return
    const interval = setInterval(() => {
      const mins = Math.floor((Date.now() - startRef.current) / 60000)
      setElapsedMinutes(mins)
      if (mins >= 25 && !longBreakDue) setLongBreakDue(true)
      else if (mins >= 15 && !breakDue) setBreakDue(true)
    }, 30000) // check every 30s
    return () => clearInterval(interval)
  }, [enabled, breakDue, longBreakDue])

  const dismissBreak = () => {
    setBreakDue(false)
    setLongBreakDue(false)
    setDismissed(true)
    startRef.current = Date.now() // reset clock after dismiss
  }

  const showNudge = !dismissed && (breakDue || longBreakDue)
  const nudgeLevel = longBreakDue ? 'long' : 'short'

  return { elapsedMinutes, showNudge, nudgeLevel, dismissBreak }
}
