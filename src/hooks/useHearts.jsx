import { useState, useCallback } from 'react'

const MAX_HEARTS = 3

export function useHearts() {
  const [hearts, setHearts] = useState(MAX_HEARTS)
  const [lost, setLost] = useState(false) // true when hearts = 0

  const loseHeart = useCallback(() => {
    setHearts(h => {
      const next = Math.max(0, h - 1)
      if (next === 0) setLost(true)
      return next
    })
  }, [])

  const resetHearts = useCallback(() => {
    setHearts(MAX_HEARTS)
    setLost(false)
  }, [])

  return { hearts, maxHearts: MAX_HEARTS, lost, loseHeart, resetHearts }
}
