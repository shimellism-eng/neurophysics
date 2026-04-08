import { useState, useEffect } from 'react'

const XP_STARTED = 5
const XP_MASTERED = 20

const SR_INTERVALS = [1, 3, 7, 14, 30] // days

function load(key, fallback) {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback } catch { return fallback }
}
function save(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)) } catch {}
}

let progressStore = load('np_progress', {})
let statsStore = load('np_stats', { xp: 0, streak: 0, lastActiveDate: null })
const listeners = new Set()

function notify() { listeners.forEach(fn => fn()) }

function updateStreak() {
  const today = new Date().toDateString()
  if (statsStore.lastActiveDate === today) return
  const yesterday = new Date(Date.now() - 86400000).toDateString()
  statsStore.streak = statsStore.lastActiveDate === yesterday ? statsStore.streak + 1 : 1
  statsStore.lastActiveDate = today
}

export function useProgress() {
  const [progress, setProgress] = useState({ ...progressStore })
  const [stats, setStats] = useState({ ...statsStore })

  useEffect(() => {
    const sync = () => { setProgress({ ...progressStore }); setStats({ ...statsStore }) }
    listeners.add(sync)
    return () => listeners.delete(sync)
  }, [])

  const markStarted = (id) => {
    if (progressStore[id]?.started) return
    progressStore[id] = { ...progressStore[id], started: true }
    statsStore.xp = (statsStore.xp || 0) + XP_STARTED
    updateStreak()
    save('np_progress', progressStore)
    save('np_stats', statsStore)
    notify()
  }

  const markMastered = (id) => {
    const alreadyMastered = progressStore[id]?.mastered
    const now = Date.now()
    progressStore[id] = {
      ...progressStore[id],
      started: true,
      mastered: true,
      masteredAt: progressStore[id]?.masteredAt || now,
      reviewCount: progressStore[id]?.reviewCount || 0,
      nextReviewAt: progressStore[id]?.nextReviewAt || (now + SR_INTERVALS[0] * 24 * 60 * 60 * 1000),
    }
    let xpEarned = 0
    if (!alreadyMastered) {
      xpEarned = XP_MASTERED
      statsStore.xp = (statsStore.xp || 0) + XP_MASTERED
      updateStreak()
    }
    save('np_progress', progressStore)
    save('np_stats', statsStore)
    notify()
    return xpEarned
  }

  const markReviewed = (id) => {
    if (!progressStore[id]?.mastered) return
    const reviewCount = (progressStore[id].reviewCount || 0) + 1
    const intervalDays = SR_INTERVALS[reviewCount] ?? SR_INTERVALS[SR_INTERVALS.length - 1]
    const nextReviewAt = Date.now() + intervalDays * 24 * 60 * 60 * 1000
    progressStore[id] = { ...progressStore[id], reviewCount, nextReviewAt }
    save('np_progress', progressStore)
    notify()
  }

  const getDueForReview = () => {
    const now = Date.now()
    return Object.entries(progressStore)
      .filter(([, p]) => p.mastered && p.nextReviewAt && p.nextReviewAt <= now)
      .map(([id]) => id)
  }

  return { progress, stats, markStarted, markMastered, markReviewed, getDueForReview }
}
