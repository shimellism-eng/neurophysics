import { useEffect, useState, useContext } from 'react'

// Lazy import to avoid circular dep — ComfortContext imports nothing from hooks
let _ComfortContext = null
async function getComfortContext() {
  if (_ComfortContext) return _ComfortContext
  const mod = await import('../context/ComfortContext')
  _ComfortContext = mod.ComfortContext ?? null
  return _ComfortContext
}

/**
 * useReducedMotion — returns true when reduced motion is active.
 * Priority: in-app Comfort Setting > OS prefers-reduced-motion.
 * Updates live when either changes.
 */
export function useReducedMotion() {
  const getReduced = () => {
    const sys = typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    try {
      const app = !!JSON.parse(localStorage.getItem('neurophysics_prefs') || '{}').reduceMotion
      return sys || app
    } catch {
      return sys
    }
  }

  const [reduced, setReduced] = useState(getReduced)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handler = () => setReduced(getReduced())
    mq.addEventListener('change', handler)
    // Also re-check when prefs change
    window.addEventListener('np_prefs_changed', handler)
    return () => {
      mq.removeEventListener('change', handler)
      window.removeEventListener('np_prefs_changed', handler)
    }
  }, [])

  return reduced
}
