import { useState, useEffect } from 'react'

const XP_STARTED = 5
const XP_MASTERED = 20

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
    progressStore[id] = { ...progressStore[id], started: true, mastered: true }
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

  return { progress, stats, markStarted, markMastered }
}
