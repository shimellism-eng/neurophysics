/**
 * useAdaptive — adaptive difficulty engine for the question bank.
 *
 * Storage key: np_adaptive
 * Shape: { [topicId]: { tier: 1|2|3, streak: number, totalAttempts: number } }
 *
 * Algorithm:
 *   - correct + time ≤ timeExpected × 1.5 → "confident": streak++; if streak ≥ 2: tier up, streak = 0
 *   - correct + time > timeExpected × 1.5 → "slow correct": streak = 0, stay same tier
 *   - wrong → tier down (min 1), streak = 0
 */
import { useState, useCallback } from 'react'

const STORAGE_KEY = 'np_adaptive'

function load() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') } catch { return {} }
}

function save(data) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)) } catch {}
}

export function getAdaptiveState(topicId) {
  const data = load()
  return data[topicId] || { tier: 1, streak: 0, totalAttempts: 0 }
}

export function useAdaptive(topicId) {
  const [state, setState] = useState(() => getAdaptiveState(topicId))

  const submit = useCallback((correct, timeMs, timeExpected) => {
    setState(prev => {
      const data = load()
      let { tier, streak, totalAttempts } = prev
      totalAttempts++

      if (correct) {
        const fast = timeMs <= timeExpected * 1000 * 1.5 // timeExpected is in seconds, timeMs in ms
        if (fast) {
          streak++
          if (streak >= 2) {
            tier = Math.min(tier + 1, 3)
            streak = 0
          }
        } else {
          streak = 0 // slow correct: stay
        }
      } else {
        tier = Math.max(tier - 1, 1)
        streak = 0
      }

      const next = { tier, streak, totalAttempts }
      data[topicId] = next
      save(data)
      return next
    })
  }, [topicId])

  const reset = useCallback(() => {
    const data = load()
    data[topicId] = { tier: 1, streak: 0, totalAttempts: 0 }
    save(data)
    setState({ tier: 1, streak: 0, totalAttempts: 0 })
  }, [topicId])

  return { ...state, submit, reset }
}

export function getAllAdaptiveStates() {
  return load()
}
