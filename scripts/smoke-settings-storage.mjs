import {
  loadPrefs,
  loadProfile,
  PREFS_KEY,
  PROFILE_KEY,
  savePrefs,
  saveProfile,
} from '../src/features/settings/storage.js'

function createStorage(seed = {}) {
  const data = { ...seed }
  return {
    getItem(key) {
      return Object.prototype.hasOwnProperty.call(data, key) ? data[key] : null
    },
    setItem(key, value) {
      data[key] = String(value)
    },
  }
}

const emptyStorage = createStorage()
if (JSON.stringify(loadProfile(emptyStorage)) !== '{}') {
  throw new Error('Expected empty profile fallback')
}
if (JSON.stringify(loadPrefs(emptyStorage)) !== '{}') {
  throw new Error('Expected empty prefs fallback')
}

const storage = createStorage()
saveProfile({ name: 'Mamo', examDate: '2026-06-01' }, storage)
savePrefs({ dyslexicFont: true, fontSize: 'Large' }, storage)

if (storage.getItem(PROFILE_KEY) !== '{"name":"Mamo","examDate":"2026-06-01"}') {
  throw new Error('Expected profile to use the existing localStorage key')
}
if (storage.getItem(PREFS_KEY) !== '{"dyslexicFont":true,"fontSize":"Large"}') {
  throw new Error('Expected prefs to use the existing localStorage key')
}
if (loadProfile(storage).name !== 'Mamo' || loadPrefs(storage).fontSize !== 'Large') {
  throw new Error('Expected settings storage round trip to preserve values')
}

const invalidStorage = createStorage({ [PROFILE_KEY]: '<not-json>', [PREFS_KEY]: '<not-json>' })
if (JSON.stringify(loadProfile(invalidStorage)) !== '{}' || JSON.stringify(loadPrefs(invalidStorage)) !== '{}') {
  throw new Error('Expected invalid JSON to fall back safely')
}

console.log('settings storage smoke: pass')
