/**
 * ComfortContext — global accessibility & comfort preferences.
 *
 * Research basis: BDA Style Guide, WCAG 2.2 AA, Rosenshine principles,
 * PhET accessibility research, neurodivergent UX best practices.
 *
 * Storage:
 *   - Primary: localStorage key 'neurophysics_prefs' (same key used by all
 *     existing components — backward compatible, no migrations needed).
 *   - Sync: Supabase 'user_preferences' table (best-effort, offline-safe).
 *
 * Supabase table required (run once in dashboard):
 *   CREATE TABLE IF NOT EXISTS user_preferences (
 *     user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
 *     preferences jsonb NOT NULL DEFAULT '{}',
 *     updated_at timestamptz DEFAULT now()
 *   );
 *   ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;
 *   CREATE POLICY "own prefs" ON user_preferences FOR ALL USING (auth.uid() = user_id);
 */
import {
  createContext, useContext, useEffect, useState,
  useCallback, useRef, useMemo,
} from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from './AuthContext'

const PREFS_KEY = 'neurophysics_prefs'
const SEEN_KEY  = 'np_comfort_seen'

export const COMFORT_DEFAULTS = {
  // Text & Reading
  fontSize:      1.0,          // rem, 0.8–1.6
  fontFamily:    'system',     // 'system' | 'atkinson' | 'opendyslexic'
  lineSpacing:   1.7,          // 1.5–2.5
  // Display
  background:    'dark',       // 'dark' | 'cream' | 'lightblue' | 'lightyellow'
  colourOverlay: 'none',       // 'none' | 'yellow' | 'blue' | 'pink' | 'green'
  readingRuler:  false,
  highContrast:  false,
  // Motion & Sound
  reduceMotion:  false,
  sounds:        true,
  celebrations:  true,
  // Reading Assistance (TTS)
  tts:           false,
  ttsSpeed:      1.0,          // 0.5–2.0
  ttsAutoRead:   false,
  // Learning Mode
  challengeMode: false,        // true = hearts/lives on
  sessionLength: 15,           // 5 | 10 | 15 | 25 minutes
  // Legacy keys kept for backward compat with existing components
  exploreMode:   true,
  autoTTS:       false,
  dyslexicFont:  false,
}

export const COMFORT_PRESETS = {
  dyslexiaFriendly: {
    label: 'Dyslexia-friendly',
    icon:  '📖',
    prefs: {
      fontFamily:    'opendyslexic',
      lineSpacing:   2.0,
      background:    'cream',
      colourOverlay: 'yellow',
      readingRuler:  true,
    },
  },
  adhdFriendly: {
    label: 'ADHD-friendly',
    icon:  '⚡',
    prefs: {
      celebrations:  false,
      sessionLength: 10,
      fontSize:      1.1,
    },
  },
  lowSensory: {
    label: 'Low sensory',
    icon:  '🌙',
    prefs: {
      reduceMotion:  true,
      sounds:        false,
      celebrations:  false,
      background:    'dark',
    },
  },
  highContrast: {
    label: 'High contrast',
    icon:  '◐',
    prefs: {
      highContrast:  true,
      fontSize:      1.2,
    },
  },
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function readLocal() {
  try {
    return JSON.parse(localStorage.getItem(PREFS_KEY) || '{}')
  } catch {
    return {}
  }
}

function writeLocal(prefs) {
  try {
    localStorage.setItem(PREFS_KEY, JSON.stringify(prefs))
    // Keep legacy flat key consumed by question components without parsing full prefs
    localStorage.setItem('np_auto_tts', prefs.ttsAutoRead || prefs.autoTTS ? 'true' : 'false')
  } catch { /* quota or private-mode */ }
}

function mergeWithDefaults(stored) {
  const merged = { ...COMFORT_DEFAULTS, ...stored }
  // Reconcile legacy fontSize ('normal'/'large' strings) to number
  if (merged.fontSize === 'normal') merged.fontSize = 1.0
  if (merged.fontSize === 'large')  merged.fontSize = 1.15
  // Coerce all numeric prefs to actual numbers (localStorage can return strings on some WebViews)
  for (const key of ['fontSize', 'lineSpacing', 'ttsSpeed', 'sessionLength']) {
    const n = parseFloat(merged[key])
    merged[key] = isNaN(n) ? COMFORT_DEFAULTS[key] : n
  }
  // Reconcile legacy dyslexicFont bool → fontFamily
  if (merged.dyslexicFont && merged.fontFamily === 'system') {
    merged.fontFamily = 'opendyslexic'
  }
  // Reconcile legacy exploreMode ↔ challengeMode
  if (!('challengeMode' in stored)) {
    merged.challengeMode = stored.exploreMode === false
  }
  merged.exploreMode = !merged.challengeMode
  return merged
}

// ── CSS application ───────────────────────────────────────────────────────────

function applyToDom(prefs) {
  const root = document.documentElement
  const body = document.body

  // Font size
  root.style.fontSize = `${prefs.fontSize}rem`

  // Font family
  body.dataset.font = prefs.fontFamily
  if (prefs.fontFamily === 'opendyslexic') {
    body.style.fontFamily = "'OpenDyslexic', sans-serif"
    body.style.lineHeight  = String(prefs.lineSpacing)
    body.style.letterSpacing = '0.05em'
    body.dataset.dyslexic = 'true'
  } else if (prefs.fontFamily === 'atkinson') {
    body.style.fontFamily = "'Atkinson Hyperlegible', 'Bricolage Grotesque', sans-serif"
    body.style.lineHeight  = String(prefs.lineSpacing)
    body.style.letterSpacing = '0.02em'
    body.dataset.dyslexic = ''
  } else {
    body.style.fontFamily  = ''
    body.style.lineHeight  = String(prefs.lineSpacing)
    body.style.letterSpacing = ''
    body.dataset.dyslexic  = ''
  }

  // Background theme
  body.dataset.theme = prefs.background || 'dark'

  // High contrast
  body.classList.toggle('high-contrast', !!prefs.highContrast)
  if (prefs.highContrast) {
    root.style.setProperty('--np-glass-blur', '0px')
  } else {
    root.style.setProperty('--np-glass-blur', '28px')
  }

  // Reduced motion
  body.classList.toggle('reduce-motion', !!prefs.reduceMotion)
  if (prefs.reduceMotion) {
    root.style.setProperty('--np-motion-duration', '0ms')
  } else {
    root.style.removeProperty('--np-motion-duration')
  }

  // TTS speed (consumed by tts.js utility)
  root.style.setProperty('--np-tts-speed', String(prefs.ttsSpeed || 1.0))
  localStorage.setItem('np_tts_speed', String(prefs.ttsSpeed || 1.0))
}

// ── Context ───────────────────────────────────────────────────────────────────

const ComfortContext = createContext(null)

export function ComfortProvider({ children }) {
  const { user } = useAuth()
  const [prefs, setPrefsState] = useState(() => mergeWithDefaults(readLocal()))
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [firstTimePrompt, setFirstTimePrompt] = useState(false)
  const syncTimer = useRef(null)
  const loaded = useRef(false)

  // Apply to DOM whenever prefs change
  useEffect(() => {
    applyToDom(prefs)
  }, [prefs])

  // On mount: load from Supabase if logged in, then show first-time prompt if needed
  useEffect(() => {
    if (loaded.current) return
    loaded.current = true

    async function loadRemote() {
      if (!user || !supabase) return
      try {
        const { data, error } = await supabase
          .from('user_preferences')
          .select('preferences')
          .eq('user_id', user.id)
          .maybeSingle()
        if (!error && data?.preferences) {
          const merged = mergeWithDefaults({ ...readLocal(), ...data.preferences })
          setPrefsState(merged)
          writeLocal(merged)
        }
      } catch { /* table may not exist yet — silently continue */ }
    }

    loadRemote().then(() => {
      if (!localStorage.getItem(SEEN_KEY)) {
        setFirstTimePrompt(true)
      }
    })
  }, [user])

  // Sync to Supabase (debounced 1.5s)
  const syncToSupabase = useCallback((nextPrefs) => {
    if (!user || !supabase) return
    clearTimeout(syncTimer.current)
    syncTimer.current = setTimeout(async () => {
      try {
        await supabase.from('user_preferences').upsert(
          { user_id: user.id, preferences: nextPrefs, updated_at: new Date().toISOString() },
          { onConflict: 'user_id' }
        )
      } catch { /* best-effort */ }
    }, 1500)
  }, [user])

  const setPref = useCallback((key, value) => {
    setPrefsState(prev => {
      const next = { ...prev, [key]: value }
      // Keep legacy keys in sync
      if (key === 'challengeMode') next.exploreMode = !value
      if (key === 'exploreMode')   next.challengeMode = !value
      if (key === 'ttsAutoRead')   next.autoTTS = value
      if (key === 'fontFamily')    next.dyslexicFont = value === 'opendyslexic'
      writeLocal(next)
      syncToSupabase(next)
      return next
    })
  }, [syncToSupabase])

  const setPrefs = useCallback((updates) => {
    setPrefsState(prev => {
      const next = { ...prev, ...updates }
      // Reconcile legacy keys
      if ('challengeMode' in updates) next.exploreMode = !updates.challengeMode
      if ('exploreMode'   in updates) next.challengeMode = !updates.exploreMode
      if ('ttsAutoRead'   in updates) next.autoTTS = updates.ttsAutoRead
      if ('fontFamily'    in updates) next.dyslexicFont = updates.fontFamily === 'opendyslexic'
      writeLocal(next)
      syncToSupabase(next)
      return next
    })
  }, [syncToSupabase])

  const applyPreset = useCallback((presetKey) => {
    const preset = COMFORT_PRESETS[presetKey]
    if (preset) setPrefs(preset.prefs)
  }, [setPrefs])

  const resetToDefaults = useCallback(() => {
    const next = { ...COMFORT_DEFAULTS }
    writeLocal(next)
    syncToSupabase(next)
    setPrefsState(next)
  }, [syncToSupabase])

  const dismissFirstTimePrompt = useCallback(() => {
    localStorage.setItem(SEEN_KEY, '1')
    setFirstTimePrompt(false)
  }, [])

  const value = useMemo(() => ({
    prefs,
    setPref,
    setPrefs,
    applyPreset,
    resetToDefaults,
    settingsOpen,
    setSettingsOpen,
    firstTimePrompt,
    dismissFirstTimePrompt,
  }), [
    prefs, setPref, setPrefs, applyPreset, resetToDefaults,
    settingsOpen, firstTimePrompt, dismissFirstTimePrompt,
  ])

  return (
    <ComfortContext.Provider value={value}>
      {children}
    </ComfortContext.Provider>
  )
}

export function useComfort() {
  const ctx = useContext(ComfortContext)
  if (!ctx) throw new Error('useComfort must be used inside ComfortProvider')
  return ctx
}
