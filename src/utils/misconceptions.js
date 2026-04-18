// Tracks which wrong options students choose per topic.
// Structure: { [topicId]: { [wrongOptionText]: count } }
// Used for future teacher analytics; Supabase sync to be added with the class dashboard.

const KEY = 'np_misconceptions'

function load() {
  try { return JSON.parse(localStorage.getItem(KEY) || '{}') } catch { return {} }
}

export function trackMisconception(topicId, wrongOption) {
  try {
    const store = load()
    if (!store[topicId]) store[topicId] = {}
    store[topicId][wrongOption] = (store[topicId][wrongOption] || 0) + 1
    localStorage.setItem(KEY, JSON.stringify(store))
  } catch {}
}

export function getMisconceptions(topicId) {
  return load()[topicId] || {}
}
