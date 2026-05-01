import { useState, useEffect, useCallback } from 'react'
import { supabase, supabaseConfigured } from '../lib/supabase'
import { getQuestionMap } from '../lib/questionRepository'
import { BOARD_ORDER } from '../utils/boardConfig'

const STORAGE_KEY = 'np_srs'
const INTERVALS = [1, 3, 7, 14, 30, 60] // SM-2 fixed progression (days)

// Lazy singleton Map for O(1) question lookup backed by runtime JSON
let _qMap = new Map()
let _qMapLoadPromise = null

async function ensureQuestionMapLoaded() {
  if (_qMap.size > 0) return _qMap
  if (!_qMapLoadPromise) {
    _qMapLoadPromise = Promise.all(
      BOARD_ORDER.map(async (examBoard) => {
        try {
          return await getQuestionMap({ examBoard })
        } catch {
          return new Map()
        }
      }),
    ).then((maps) => {
      const merged = new Map()
      for (const map of maps) {
        for (const [id, question] of map.entries()) {
          if (!merged.has(id)) merged.set(id, question)
        }
      }
      _qMap = merged
      return _qMap
    }).finally(() => {
      _qMapLoadPromise = null
    })
  }
  return _qMapLoadPromise
}

function qMap() {
  return _qMap
}

// SM-2 update — returns next SRS entry for a question
function sm2Next(prev, correct) {
  const e = prev ?? { ease_factor: 2.5, interval_days: 1, repetition_count: 0, correct_streak: 0, total_attempts: 0, total_correct: 0 }

  let { ease_factor, interval_days, repetition_count } = e
  const total_attempts = e.total_attempts + 1
  const total_correct  = e.total_correct + (correct ? 1 : 0)
  const correct_streak = correct ? e.correct_streak + 1 : 0

  if (correct) {
    repetition_count += 1
    interval_days = INTERVALS[Math.min(repetition_count - 1, INTERVALS.length - 1)]
    ease_factor   = Math.min(3.0, ease_factor + 0.1)
  } else {
    repetition_count = 0
    interval_days    = 1
    ease_factor      = Math.max(1.3, ease_factor - 0.2)
  }

  const last_reviewed = Date.now()
  const next_due      = last_reviewed + interval_days * 24 * 60 * 60 * 1000

  return { ease_factor, interval_days, repetition_count, last_reviewed, next_due, correct_streak, total_attempts, total_correct }
}

// ── Persistence ───────────────────────────────────────────────────────────────

function loadStore() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') } catch { return {} }
}
function saveStore(s) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(s)) } catch {}
}

async function syncOne(questionId, entry) {
  if (!supabaseConfigured) return
  try {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) return
    await supabase.from('user_question_progress').upsert({
      user_id:          session.user.id,
      question_id:      questionId,
      ease_factor:      entry.ease_factor,
      interval_days:    entry.interval_days,
      repetition_count: entry.repetition_count,
      last_reviewed:    new Date(entry.last_reviewed).toISOString(),
      next_due:         new Date(entry.next_due).toISOString(),
      correct_streak:   entry.correct_streak,
      total_attempts:   entry.total_attempts,
      total_correct:    entry.total_correct,
    }, { onConflict: 'user_id,question_id' })
  } catch {
    // Offline — localStorage already persisted; will sync on next updateProgress call
  }
}

// ── Module-level store (same pattern as useProgress) ─────────────────────────

let srsStore = loadStore()
const srsListeners = new Set()

function notifySRS() {
  srsListeners.forEach(fn => fn())
}

// ── Hook ──────────────────────────────────────────────────────────────────────

export function useSRS() {
  const [store, setStore] = useState(() => ({ ...srsStore }))

  useEffect(() => {
    const sync = () => setStore({ ...srsStore })
    srsListeners.add(sync)
    ensureQuestionMapLoaded().then(() => {
      notifySRS()
    }).catch(() => {})
    return () => srsListeners.delete(sync)
  }, [])

  // Record a question answer — updates SM-2 state and queues Supabase sync
  const updateProgress = useCallback((questionId, correct) => {
    srsStore = { ...srsStore, [questionId]: sm2Next(srsStore[questionId], correct) }
    saveStore(srsStore)
    notifySRS()
    syncOne(questionId, srsStore[questionId])
  }, [])

  // Question IDs due for review — overdue first, then lowest ease_factor
  const getDueQuestions = useCallback(() => {
    const now = Date.now()
    const map = qMap()
    return Object.entries(store)
      .filter(([qId, e]) => {
        if (!e.next_due || e.next_due > now) return false
        const q = map.get(qId)
        return q && q.options?.length >= 2 && q.correctIndex != null
      })
      .sort(([, a], [, b]) => a.next_due !== b.next_due ? a.next_due - b.next_due : a.ease_factor - b.ease_factor)
      .map(([qId]) => qId)
  }, [store])

  // Count of due questions per topicId — for dashboard badges
  const getDueCountByTopic = useCallback(() => {
    const now = Date.now()
    const map = qMap()
    const counts = {}
    for (const [qId, e] of Object.entries(store)) {
      if (!e.next_due || e.next_due > now) continue
      const q = map.get(qId)
      if (q) counts[q.topicId] = (counts[q.topicId] || 0) + 1
    }
    return counts
  }, [store])

  const totalDue = Object.values(store).filter(e => e.next_due && e.next_due <= Date.now()).length

  return { updateProgress, getDueQuestions, getDueCountByTopic, totalDue }
}
