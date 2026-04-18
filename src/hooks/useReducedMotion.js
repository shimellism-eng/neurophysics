import { useEffect, useState } from 'react'

/**
 * useReducedMotion — reactive hook that returns true when the user has
 * opted into reduced motion via the OS accessibility setting OR the
 * in-app preference stored in neurophysics_prefs.
 *
 * Updates live when the OS setting changes (e.g. user toggles in
 * System Settings while the app is open).
 */
export function useReducedMotion() {
  const getReduced = () => {
    const sysPref =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const appPref = (() => {
      try {
        return !!JSON.parse(
          localStorage.getItem('neurophysics_prefs') || '{}'
        ).reduceMotion
      } catch {
        return false
      }
    })()
    return sysPref || appPref
  }

  const [reduced, setReduced] = useState(getReduced)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handler = () => setReduced(getReduced())
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return reduced
}
