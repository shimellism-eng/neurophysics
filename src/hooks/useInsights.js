/**
 * useInsights — derives learning insights from saved quiz results.
 *
 * Storage key: np_quiz_results
 * Shape: { [subtopicId]: [{ score, total, ts }] }
 */
import { useState, useEffect } from 'react'
import { MODULES, TOPICS } from '../data/topics'

const PROGRESS_KEY = 'np_progress'

function loadProgress() {
  try { return JSON.parse(localStorage.getItem(PROGRESS_KEY) || '{}') } catch { return {} }
}

const STORAGE_KEY = 'np_quiz_results'

// ── helpers ──────────────────────────────────────────────────────────────────

function load() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') } catch { return {} }
}

export function saveQuizResult(subtopicId, score, total) {
  const data = load()
  if (!data[subtopicId]) data[subtopicId] = []
  data[subtopicId].push({ score, total, ts: Date.now() })
  // Keep only last 5 attempts per subtopic
  if (data[subtopicId].length > 5) data[subtopicId] = data[subtopicId].slice(-5)
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)) } catch {}
}

function accuracy(attempts) {
  if (!attempts || attempts.length === 0) return null
  const total = attempts.reduce((sum, a) => sum + a.total, 0)
  const correct = attempts.reduce((sum, a) => sum + a.score, 0)
  return total > 0 ? correct / total : null
}

// ── hook ─────────────────────────────────────────────────────────────────────

export function useInsights() {
  const [results, setResults] = useState(load)
  const [progressSnap, setProgressSnap] = useState(loadProgress)

  // Re-read whenever storage changes (e.g. after quiz completes)
  useEffect(() => {
    const onStorage = () => {
      setResults(load())
      setProgressSnap(loadProgress())
    }
    // Cross-tab: storage event fires when another tab writes
    window.addEventListener('storage', onStorage)
    // Same-tab: custom event dispatched by useProgress after every save
    window.addEventListener('np_progress_updated', onStorage)
    // Also poll once on mount in case same-tab update happened before this mounted
    setResults(load())
    setProgressSnap(loadProgress())
    return () => {
      window.removeEventListener('storage', onStorage)
      window.removeEventListener('np_progress_updated', onStorage)
    }
  }, [])

  const allTopicIds = MODULES.flatMap(m => m.topics)

  // Compute per-topic accuracy
  const accuracyMap = {}
  allTopicIds.forEach(id => {
    const a = accuracy(results[id])
    if (a !== null) accuracyMap[id] = a
  })

  const attempted = Object.keys(accuracyMap)

  // Weak: attempted, accuracy < 0.6, sorted worst first
  const weakTopics = attempted
    .filter(id => accuracyMap[id] < 0.6)
    .sort((a, b) => accuracyMap[a] - accuracyMap[b])
    .slice(0, 3)
    .map(id => ({ id, topic: TOPICS[id], accuracy: accuracyMap[id] }))
    .filter(x => x.topic)

  // Strong: accuracy >= 0.8
  const strongTopics = attempted
    .filter(id => accuracyMap[id] >= 0.8)
    .sort((a, b) => accuracyMap[b] - accuracyMap[a])
    .slice(0, 3)
    .map(id => ({ id, topic: TOPICS[id], accuracy: accuracyMap[id] }))
    .filter(x => x.topic)

  // Suggested practice: weak topics first, then first unattempted topic
  const unattempted = allTopicIds.filter(id => !accuracyMap[id])
  const suggestions = [
    ...weakTopics.map(x => ({ ...x, reason: 'needs work' })),
    ...unattempted.slice(0, Math.max(0, 3 - weakTopics.length)).map(id => ({
      id,
      topic: TOPICS[id],
      accuracy: null,
      reason: 'not tried yet',
    })),
  ].filter(x => x.topic).slice(0, 3)

  // Overall accuracy across all attempts
  const allAttempts = Object.values(results).flat()
  const overallAccuracy = accuracy(allAttempts)

  // Topic with most attempts (most studied)
  const mostStudied = attempted.length > 0
    ? [...attempted].sort((a, b) => (results[b]?.length || 0) - (results[a]?.length || 0))[0]
    : null

  // Spaced repetition: topics that are due for review today
  const now = Date.now()
  const reviewDue = allTopicIds
    .filter(id => {
      const p = progressSnap[id]
      return p?.mastered && p.nextReviewAt && p.nextReviewAt <= now
    })
    .map(id => {
      const p = progressSnap[id]
      return {
        id,
        topic: TOPICS[id],
        masteredAt: p?.masteredAt || null,
        nextReviewAt: p?.nextReviewAt || null,
      }
    })
    .filter(x => x.topic)

  return {
    results,
    accuracyMap,
    weakTopics,
    strongTopics,
    suggestions,
    attempted: attempted.length,
    overallAccuracy,
    mostStudied: mostStudied ? TOPICS[mostStudied] : null,
    hasData: attempted.length > 0,
    reviewDue,
  }
}
