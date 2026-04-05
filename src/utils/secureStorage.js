/**
 * secureStorage — wraps @capacitor/preferences on native iOS/Android
 * (encrypted Keychain / Keystore) and falls back to sessionStorage on web.
 *
 * Using sessionStorage on web means the key is cleared when the tab closes,
 * reducing the window of exposure versus localStorage which persists forever.
 *
 * To fully secure on native: `npm install @capacitor/preferences` and
 * `npx cap sync` — the dynamic import below will pick it up automatically.
 */

let _prefs = null

async function getPrefs() {
  if (_prefs) return _prefs
  try {
    const mod = await import('@capacitor/preferences')
    _prefs = mod.Preferences
  } catch {
    // Not installed or running on web — use sessionStorage shim
    _prefs = {
      async get({ key }) { return { value: sessionStorage.getItem(key) } },
      async set({ key, value }) { sessionStorage.setItem(key, value) },
      async remove({ key }) { sessionStorage.removeItem(key) },
    }
  }
  return _prefs
}

export async function secureGet(key) {
  const prefs = await getPrefs()
  const { value } = await prefs.get({ key })
  return value ?? null
}

export async function secureSet(key, value) {
  const prefs = await getPrefs()
  await prefs.set({ key, value })
}

export async function secureRemove(key) {
  const prefs = await getPrefs()
  await prefs.remove({ key })
}
