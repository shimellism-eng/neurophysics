export const PROFILE_KEY = 'neurophysics_profile'
export const PREFS_KEY = 'neurophysics_prefs'

export function loadProfile(storage = localStorage) {
  try { return JSON.parse(storage.getItem(PROFILE_KEY) || '{}') } catch { return {} }
}

export function saveProfile(profile, storage = localStorage) {
  storage.setItem(PROFILE_KEY, JSON.stringify(profile))
}

export function loadPrefs(storage = localStorage) {
  try { return JSON.parse(storage.getItem(PREFS_KEY) || '{}') } catch { return {} }
}

export function savePrefs(prefs, storage = localStorage) {
  storage.setItem(PREFS_KEY, JSON.stringify(prefs))
}
