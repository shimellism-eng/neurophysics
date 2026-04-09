import { createContext, useContext, useState, useCallback } from 'react'

const MamoContext = createContext(null)

export function MamoProvider({ children }) {
  const [reaction, setReaction] = useState(null) // 'correct' | 'wrong' | 'complete' | null

  const triggerReaction = useCallback((type) => {
    setReaction(type)
    // Auto-clear after animation
    const timeout = type === 'complete' ? 2200 : 900
    setTimeout(() => setReaction(null), timeout)
  }, [])

  return (
    <MamoContext.Provider value={{ reaction, triggerReaction }}>
      {children}
    </MamoContext.Provider>
  )
}

export function useMamoReaction() {
  const ctx = useContext(MamoContext)
  return ctx?.triggerReaction ?? (() => {})
}

export function useMamoState() {
  const ctx = useContext(MamoContext)
  return ctx?.reaction ?? null
}
