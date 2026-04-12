import { useState, useCallback } from 'react'

/**
 * Hook for collecting virtual experiment data points.
 * Returns data array, add/reset functions, and whether enough points exist to plot.
 */
export function useDataCollector(maxPoints = 12) {
  const [data, setData] = useState([])

  const addPoint = useCallback((point) => {
    setData(prev => {
      if (prev.length >= maxPoints) return prev
      // Prevent duplicate x values
      if (prev.some(p => p.x === point.x)) return prev
      return [...prev, point].sort((a, b) => a.x - b.x)
    })
  }, [maxPoints])

  const reset = useCallback(() => setData([]), [])

  return { data, addPoint, reset, canPlot: data.length >= 3, isFull: data.length >= maxPoints }
}
