import { motion, AnimatePresence } from 'motion/react'
import { useState, useEffect } from 'react'
import { Sun, Bell, Accessibility, Info, ChevronRight, Trash2, Shield, FileText, Pencil, Check, X, LogOut, Type, Clock, Volume2, BookOpen, Share2 } from 'lucide-react'
import AtomIcon from '../components/AtomIcon'
import { useNavigate } from 'react-router-dom'
import { secureGet, secureSet, secureRemove } from '../utils/secureStorage'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'
import { requestNotificationPermission, scheduleDailyReminder, cancelDailyReminder, checkNotificationPermission } from '../utils/notifications'

// ─── Profile helpers ──────────────────────────────────────────────────────────
const PROFILE_KEY = 'neurophysics_profile'
const AVATARS = ['🧠', '⚛️', '🔬', '🚀', '⚡', '🌊', '🔭', '💡', '🧲', '🌡️']

function loadProfile() {
  try { return JSON.parse(localStorage.getItem(PROFILE_KEY) || '{}') } catch { return {} }
}
function saveProfile(p) {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(p))
}

// ─── Persistence ──────────────────────────────────────────────────────────────
const PREFS_KEY = 'neurophysics_prefs'

function loadPrefs() {
  try { return JSON.parse(localStorage.getItem(PREFS_KEY) || '{}') } catch { return {} }
}

function savePrefs(prefs) {
  localStorage.setItem(PREFS_KEY, JSON.stringify(prefs))
}

// ─── Effect appliers ─────────────────────────────────────────────────────────
const RM_STYLE_ID = 'np-reduce-motion'

function applyReduceMotion(on) {
  let el = document.getElementById(RM_STYLE_ID)
  if (on) {
    if (!el) {
      el = document.createElement('style')
      el.id = RM_STYLE_ID
      // Use 100ms (not 0.01ms) so layouts still transition but motion is minimal (F4/F9)
      el.textContent = [
        '* {',
        '  transition-duration: 100ms !important;',
        '  transition-delay: 0ms !important;',
        '  animation-duration: 100ms !important;',
        '  animation-iteration-count: 1 !important;',
        '}',
      ].join('\n')
      document.head.appendChild(el)
    }
  } else {
    el?.remove()
  }
}

// ── Dyslexic font (F1/F5) ─────────────────────────────────────────────────
function applyDyslexicFont(on) {
  document.getElementById('np-dyslexic-link')?.remove()
  document.getElementById('np-dyslexic-apply')?.remove()
  if (on) {
    const link = document.createElement('link')
    link.id = 'np-dyslexic-link'
    link.rel = 'stylesheet'
    link.href = 'https://fonts.cdnfonts.com/css/opendyslexic'
    document.head.appendChild(link)
    const style = document.createElement('style')
    style.id = 'np-dyslexic-apply'
    style.textContent = 'body, button, input, textarea, p, h1, h2, h3, span { font-family: "OpenDyslexic", sans-serif !important; letter-spacing: 0.05em !important; line-height: 1.7 !important; }'
    document.head.appendChild(style)
  }
}

// ── Hide floating Mamo (F9) ───────────────────────────────────────────────
function applyHideMamo(on) {
  // Write a data attribute that FloatingMamo in App.jsx reads via localStorage
  // (it re-reads prefs on each render via the same PREFS_KEY)
  // No DOM side-effect needed — the pref key is checked in App.jsx FloatingMamo
}

// ── Text-to-speech (F6) ───────────────────────────────────────────────────
// Actual speech triggered from question screens via useTTS hook
// This setting just stores the pref so question screens show the speak button

function applyHighContrast(on) {
  document.documentElement.style.filter = on ? 'contrast(1.2) brightness(1.06)' : ''
}

function applyFontSize(size) {
  // size: 'normal' | 'large'
  document.documentElement.style.fontSize = size === 'large' ? '18px' : ''
}

// ── Background theme (SEN: coloured backgrounds) ────────────────────────────
const BG_THEMES = {
  dark:  { bg: '#0b1121', card: 'rgba(18,26,47,0.9)', text: '#f8fafc', label: 'Dark (default)' },
  cream: { bg: '#f5f0e8', card: 'rgba(245,240,232,0.95)', text: '#1a1a1a', label: 'Cream' },
  blue:  { bg: '#e8f0f8', card: 'rgba(232,240,248,0.95)', text: '#1a1a1a', label: 'Soft Blue' },
}

function applyBgTheme(theme) {
  const t = BG_THEMES[theme] || BG_THEMES.dark
  document.documentElement.style.setProperty('--np-bg', t.bg)
  document.documentElement.style.setProperty('--np-card', t.card)
  // Apply background to root immediately
  document.body.style.background = t.bg
  // Store for use by any screen
  try { localStorage.setItem('np_bg_theme', theme) } catch {}
}

// Notification helpers moved to src/utils/notifications.js

// ─── Toggle component ─────────────────────────────────────────────────────────
function Toggle({ on, onToggle, disabled = false }) {
  return (
    <motion.button
      onClick={disabled ? undefined : (e) => { e.stopPropagation(); onToggle() }}
      className="w-12 h-6 rounded-full relative shrink-0 outline-none"
      style={{
        background: on ? '#6366f1' : '#1d293d',
        border: `1px solid ${on ? '#6366f1' : '#2d3e55'}`,
        opacity: disabled ? 0.4 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}
      whileTap={disabled ? {} : { scale: 0.93 }}
      transition={{ duration: 0.15 }}
    >
      <motion.div
        className="absolute top-0.5 w-5 h-5 rounded-full"
        style={{ background: '#fff', boxShadow: '0 1px 4px rgba(0,0,0,0.35)' }}
        animate={{ x: on ? 26 : 2 }}
        transition={{ type: 'spring', stiffness: 600, damping: 38 }}
      />
    </motion.button>
  )
}

// ─── Main screen ──────────────────────────────────────────────────────────────
export default function SettingsScreen() {
  const navigate = useNavigate()
  const { user, signOut } = useAuth()

  const [signingOut, setSigningOut] = useState(false)

  const handleSignOut = () => {
    setSigningOut(true)
    // Clear local session data synchronously
    localStorage.removeItem('neurophysics_profile')
    try { secureRemove('mamo_api_key') } catch {}
    // signOut() calls setUser(null) synchronously → AppShell redirects to /auth.
    // Fire-and-forget: don't await so a slow/offline Supabase call never blocks.
    signOut().catch(console.error)
  }
  const [apiKey, setApiKey] = useState('')
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  // Profile
  const [profile, setProfile] = useState(() => loadProfile())
  const [editingProfile, setEditingProfile] = useState(false)
  const [editName, setEditName] = useState('')
  const [editAvatar, setEditAvatar] = useState('')

  const startEditProfile = () => {
    setEditName(profile.name || '')
    setEditAvatar(profile.avatar || '🧠')
    setEditingProfile(true)
  }

  const saveEditProfile = () => {
    const trimmed = editName.trim()
    if (!trimmed) return
    const updated = { ...profile, name: trimmed, avatar: editAvatar }
    setProfile(updated)
    saveProfile(updated)
    setEditingProfile(false)
    showToast('Profile updated ✓', '#10b981')
  }

  // Load API key from secure storage on mount
  useEffect(() => {
    secureGet('mamo_api_key').then(v => { if (v) setApiKey(v) })
  }, [])
  const [saved, setSaved] = useState(false)
  const [toast, setToast] = useState(null)

  // All toggles live in one prefs object
  const [prefs, setPrefs] = useState(() => loadPrefs())

  // Apply effects on mount (restore saved settings on page load)
  useEffect(() => {
    applyReduceMotion(!!prefs.reduceMotion)
    applyHighContrast(!!prefs.highContrast)
    applyFontSize(prefs.fontSize || 'normal')
    applyDyslexicFont(!!prefs.dyslexicFont)
    applyBgTheme(prefs.bgTheme || 'dark')
  }, []) // eslint-disable-line

  const showToast = (msg, color = '#6366f1') => {
    setToast({ msg, color })
    setTimeout(() => setToast(null), 2800)
  }

  const setPref = (key, value) => {
    const next = { ...prefs, [key]: value }
    setPrefs(next)
    savePrefs(next)
  }

  // ── Reduce Motion
  const toggleReduceMotion = () => {
    const next = !prefs.reduceMotion
    applyReduceMotion(next)
    setPref('reduceMotion', next)
    showToast(next ? 'Reduce Motion on  -  animations minimised' : 'Reduce Motion off', next ? '#10b981' : '#a8b8cc')
  }

  // ── High Contrast
  const toggleHighContrast = () => {
    const next = !prefs.highContrast
    applyHighContrast(next)
    setPref('highContrast', next)
    showToast(next ? 'High Contrast on' : 'High Contrast off', next ? '#10b981' : '#a8b8cc')
  }

  // ── Font Size
  const toggleFontSize = () => {
    const next = prefs.fontSize === 'large' ? 'normal' : 'large'
    applyFontSize(next)
    setPref('fontSize', next)
    showToast(next === 'large' ? 'Large text on' : 'Normal text restored', next === 'large' ? '#10b981' : '#a8b8cc')
  }

  // ── Dyslexic Font (F1/F5)
  const toggleDyslexicFont = () => {
    const next = !prefs.dyslexicFont
    applyDyslexicFont(next)
    setPref('dyslexicFont', next)
    showToast(next ? 'OpenDyslexic font on' : 'Standard font restored', next ? '#10b981' : '#a8b8cc')
  }

  // ── Background Colour (SEN: coloured backgrounds)
  const cycleBgTheme = () => {
    const order = ['dark', 'cream', 'blue']
    const current = prefs.bgTheme || 'dark'
    const next = order[(order.indexOf(current) + 1) % order.length]
    applyBgTheme(next)
    setPref('bgTheme', next)
    showToast(`Background: ${BG_THEMES[next].label}`, '#10b981')
  }

  // ── Text-to-Speech (F6)
  const toggleTTS = () => {
    const next = !prefs.tts
    setPref('tts', next)
    showToast(next ? 'Read-aloud enabled — tap 🔊 on questions' : 'Read-aloud off', next ? '#10b981' : '#a8b8cc')
  }

  // ── Hide floating Mamo (F9)
  const toggleHideMamo = () => {
    const next = !prefs.hideMamo
    setPref('hideMamo', next)
    showToast(next ? 'Mamo button hidden' : 'Mamo button restored', next ? '#10b981' : '#a8b8cc')
  }

  // ── Explore Mode (hearts off)
  const toggleExploreMode = () => {
    const next = prefs.exploreMode === false ? true : false // default is true (explore on = no hearts)
    setPref('exploreMode', next)
    showToast(next ? 'Explore Mode on — learn without hearts' : 'Hearts mode on — challenge yourself!', next ? '#10b981' : '#f59e0b')
  }

  // ── Sound Effects
  const toggleSounds = () => {
    const next = prefs.sounds !== false ? false : true // default on
    setPref('sounds', next)
    showToast(next ? 'Sound effects on' : 'Sound effects off', next ? '#10b981' : '#a8b8cc')
  }

  // ── Share Progress
  const handleShareProgress = () => {
    try {
      const progress = JSON.parse(localStorage.getItem('np_progress') || '{}')
      const stats = JSON.parse(localStorage.getItem('np_stats') || '{}')
      const masteredIds = Object.entries(progress)
        .filter(([, p]) => p.mastered)
        .map(([id]) => id)
      const payload = {
        name: profile.name || user?.user_metadata?.full_name || 'Physics Learner',
        avatar: profile.avatar || '🧠',
        masteredIds,
        streak: stats.streak || 0,
        xp: stats.xp || 0,
      }
      const encoded = btoa(JSON.stringify(payload))
      const url = `${window.location.origin}${window.location.pathname}#/share?d=${encoded}`
      if (navigator.share) {
        navigator.share({ title: 'My GCSE Physics Progress', url })
      } else {
        navigator.clipboard.writeText(url).then(() => showToast('Progress link copied! ✓', '#10b981'))
          .catch(() => showToast('Copy failed — try again', '#ef4444'))
      }
    } catch {
      showToast('Could not generate link', '#ef4444')
    }
  }

  // ── Daily Reminders
  const [showTimePicker, setShowTimePicker] = useState(false)
  const [reminderHour, setReminderHour] = useState(() => prefs.reminderHour ?? 20)
  const [reminderMinute, setReminderMinute] = useState(() => prefs.reminderMinute ?? 0)

  // On mount, check if permission was revoked externally
  useEffect(() => {
    if (prefs.reminders) {
      checkNotificationPermission().then(status => {
        if (status === 'denied') {
          setPref('reminders', false)
          showToast('Notification permission was revoked — reminders disabled', '#ef4444')
        }
      })
    }
  }, []) // eslint-disable-line

  const toggleReminders = async () => {
    const next = !prefs.reminders
    if (next) {
      const status = await requestNotificationPermission()
      if (status === 'granted') {
        const h = prefs.reminderHour ?? 20
        const m = prefs.reminderMinute ?? 0
        const ok = await scheduleDailyReminder(h, m)
        if (ok) {
          setPref('reminders', true)
          const label = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
          showToast(`Daily reminder set for ${label} ✓`, '#10b981')
        }
      } else if (status === 'denied') {
        showToast('Notifications blocked — enable in device settings', '#ef4444')
      } else {
        showToast('Notifications not supported here', '#f59e0b')
      }
    } else {
      await cancelDailyReminder()
      setPref('reminders', false)
      setShowTimePicker(false)
      showToast('Daily reminders off', '#a8b8cc')
    }
  }

  const handleSaveReminderTime = async () => {
    const next = { ...prefs, reminderHour: reminderHour, reminderMinute: reminderMinute }
    setPrefs(next)
    savePrefs(next)
    if (prefs.reminders) {
      await scheduleDailyReminder(reminderHour, reminderMinute)
      const label = `${String(reminderHour).padStart(2, '0')}:${String(reminderMinute).padStart(2, '0')}`
      showToast(`Reminder updated to ${label} ✓`, '#10b981')
    }
    setShowTimePicker(false)
  }

  const handleSaveKey = () => {
    secureSet('mamo_api_key', apiKey)
    setSaved(true)
    showToast('API key saved ✓', '#10b981')
    setTimeout(() => setSaved(false), 2000)
  }

  const handleDeleteData = async () => {
    // Attempt server-side Supabase account deletion (best-effort)
    try {
      // Refresh session first so the token isn't stale
      const { data: refreshData } = await supabase.auth.refreshSession()
      const token = refreshData?.session?.access_token
        ?? (await supabase.auth.getSession()).data?.session?.access_token

      if (token) {
        const apiBase = import.meta.env.VITE_API_BASE || 'https://neurophysics.vercel.app'
        const res = await fetch(`${apiBase}/api/delete-account`, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` },
        })
        if (!res.ok) {
          // Log but don't block — still wipe local data below
          const err = await res.json().catch(() => ({}))
          console.warn('Server-side account deletion failed:', err.error)
        }
      }
    } catch (e) {
      // Network error etc. — still proceed with local wipe
      console.warn('Delete-account request failed:', e.message)
    }

    // Always clear all local data and sign out regardless of server result
    localStorage.removeItem('neurophysics_prefs')
    localStorage.removeItem('neurophysics_onboarded')
    localStorage.removeItem('neurophysics_profile')
    localStorage.removeItem('np_progress')
    localStorage.removeItem('np_stats')
    await secureRemove('mamo_api_key')
    showToast('Account and all data deleted', '#10b981')
    await signOut() // setUser(null) → AppShell redirects automatically
  }

  const sections = [
    {
      title: 'Accessibility',
      items: [
        {
          icon: BookOpen,
          label: 'Explore Mode',
          hint: 'Learn without hearts — no pressure, no game-over overlays',
          on: prefs.exploreMode !== false, // default: on
          onToggle: toggleExploreMode,
        },
        {
          icon: Accessibility,
          label: 'Reduce Motion',
          hint: 'Minimises animations — good for focus and sensory sensitivity',
          on: !!prefs.reduceMotion,
          onToggle: toggleReduceMotion,
        },
        {
          icon: Sun,
          label: 'High Contrast',
          hint: 'Stronger colour contrast',
          on: !!prefs.highContrast,
          onToggle: toggleHighContrast,
        },
        {
          icon: Type,
          label: 'Large Text',
          hint: 'Increase font size throughout the app',
          on: prefs.fontSize === 'large',
          onToggle: toggleFontSize,
        },
        {
          icon: Type,
          label: 'Dyslexia-Friendly Font',
          hint: 'Switches to OpenDyslexic — wider letter shapes for easier reading',
          on: !!prefs.dyslexicFont,
          onToggle: toggleDyslexicFont,
        },
        {
          icon: Info,
          label: 'Read Questions Aloud',
          hint: 'Shows a 🔊 button on questions — tap to hear them read out',
          on: !!prefs.tts,
          onToggle: toggleTTS,
        },
        {
          icon: AtomIcon,
          label: 'Hide Mamo Button',
          hint: 'Removes the floating AI tutor button if it\'s distracting',
          on: !!prefs.hideMamo,
          onToggle: toggleHideMamo,
        },
        {
          icon: Volume2,
          label: 'Sound Effects',
          hint: 'Plays a soft sound for correct and wrong answers',
          on: prefs.sounds !== false,
          onToggle: toggleSounds,
        },
      ],
    },
    {
      title: 'Notifications',
      items: [
        {
          icon: Bell,
          label: 'Daily Reminders',
          hint: prefs.reminders
            ? `Every day at ${String(prefs.reminderHour ?? 20).padStart(2, '0')}:${String(prefs.reminderMinute ?? 0).padStart(2, '0')}`
            : 'Get a nudge to keep your streak going',
          on: !!prefs.reminders,
          onToggle: toggleReminders,
        },
        ...(prefs.reminders ? [{
          icon: Clock,
          label: 'Reminder time',
          hint: `Currently ${String(prefs.reminderHour ?? 20).padStart(2, '0')}:${String(prefs.reminderMinute ?? 0).padStart(2, '0')}`,
          chevron: true,
          onPress: () => setShowTimePicker(v => !v),
        }] : []),
      ],
    },
    {
      title: 'Share',
      items: [
        {
          icon: Share2,
          label: 'Share My Progress',
          hint: 'Copy a link to your progress — send to a teacher or parent',
          chevron: true,
          onPress: handleShareProgress,
        },
      ],
    },
    {
      title: 'Legal',
      items: [
        {
          icon: Shield,
          label: 'Privacy Policy',
          hint: 'How we handle your data',
          chevron: true,
          onPress: () => navigate('/privacy'),
        },
        {
          icon: FileText,
          label: 'Terms of Service',
          hint: 'App usage terms',
          chevron: true,
          onPress: () => navigate('/terms'),
        },
      ],
    },
    {
      title: 'About',
      items: [
        {
          icon: Info,
          label: 'NeuroPhysics v1.0',
          hint: 'GCSE Physics for neurodivergent learners',
          chevron: true,
        },
      ],
    },
  ]

  return (
    <div className="flex flex-col h-full overflow-y-auto" style={{ background: '#0b1121' }}>
      <div className="px-5 pt-6 pb-4">
        <h1 className="text-2xl font-bold" style={{ color: '#f8fafc' }}>Settings</h1>
        <p className="text-sm mt-1" style={{ color: '#a8b8cc' }}>Customise your experience</p>
      </div>

      {/* Profile card */}
      <div className="px-5 mb-6">
        <motion.div
          className="rounded-[24px] p-5"
          style={{ background: 'rgba(18,26,47,0.9)', border: '0.75px solid #1d293d' }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {!editingProfile ? (
            /* View mode */
            <div className="flex items-center gap-4">
              <div
                className="w-16 h-16 rounded-[20px] flex items-center justify-center text-3xl shrink-0"
                style={{ background: 'linear-gradient(135deg, rgba(21,93,252,0.15), rgba(99,102,241,0.15))', border: '1px solid rgba(99,102,241,0.3)' }}
              >
                {profile.avatar || '🧠'}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-base font-bold truncate" style={{ color: '#f8fafc' }}>
                  {profile.name || user?.user_metadata?.full_name || 'Physics Learner'}
                </div>
                <div className="text-xs truncate" style={{ color: '#a8b8cc' }}>{user?.email}</div>
                <div className="flex items-center gap-1 mt-1">
                  <div className="w-2 h-2 rounded-full" style={{ background: '#00bc7d' }} />
                  <span className="text-xs" style={{ color: '#00bc7d' }}>Active learner</span>
                </div>
              </div>
              <button
                onClick={startEditProfile}
                className="w-11 h-11 rounded-[12px] flex items-center justify-center shrink-0"
                style={{ background: 'rgba(99,102,241,0.1)', border: '0.75px solid rgba(99,102,241,0.25)' }}
                aria-label="Edit profile"
              >
                <Pencil size={14} color="#6366f1" />
              </button>
            </div>
          ) : (
            /* Edit mode */
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold" style={{ color: '#f8fafc' }}>Edit Profile</span>
                <button onClick={() => setEditingProfile(false)} aria-label="Cancel editing">
                  <X size={16} color="#a8b8cc" />
                </button>
              </div>
              {/* Avatar picker */}
              <div className="flex flex-wrap gap-2 mb-3">
                {AVATARS.map(em => (
                  <button
                    key={em}
                    className="w-10 h-10 rounded-[12px] text-xl flex items-center justify-center"
                    style={{
                      background: editAvatar === em ? 'rgba(99,102,241,0.2)' : 'rgba(11,17,33,0.8)',
                      border: editAvatar === em ? '2px solid #6366f1' : '0.75px solid #1d293d',
                      transform: editAvatar === em ? 'scale(1.1)' : 'scale(1)',
                      transition: 'all 0.15s',
                    }}
                    onClick={() => setEditAvatar(em)}
                    aria-label={`Select avatar ${em}`}
                  >
                    {em}
                  </button>
                ))}
              </div>
              {/* Name input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={editName}
                  onChange={e => setEditName(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && saveEditProfile()}
                  placeholder="Your name"
                  maxLength={30}
                  className="flex-1 px-3 py-2.5 rounded-[10px] text-sm outline-none"
                  style={{ background: '#1d293d', color: '#f8fafc', border: '0.75px solid #2d3e55' }}
                  aria-label="Enter your name"
                />
                <button
                  onClick={saveEditProfile}
                  className="w-10 h-10 rounded-[10px] flex items-center justify-center"
                  style={{ background: '#6366f1' }}
                  aria-label="Save profile"
                >
                  <Check size={16} color="#fff" />
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Mamo API key */}
      <div className="px-5 mb-6">
        <motion.div
          className="rounded-[16px] p-4"
          style={{ background: 'rgba(18,26,47,0.9)', border: '0.75px solid rgba(99,102,241,0.3)' }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <AtomIcon size={16} color="#6366f1" />
            <div className="text-sm font-bold" style={{ color: '#f8fafc' }}>Mamo AI Key</div>
          </div>
          <p className="text-xs mb-3" style={{ color: '#a8b8cc' }}>
            Your Gemini API key powers Mamo. Stored locally on your device only.
          </p>
          <div className="flex gap-2">
            <input
              type="password"
              placeholder="sk-ant-..."
              value={apiKey}
              onChange={e => setApiKey(e.target.value)}
              className="flex-1 px-3 py-2.5 rounded-[10px] text-sm font-mono outline-none"
              style={{ background: '#1d293d', color: '#f8fafc', border: '0.75px solid #2d3e55' }}
            />
            <button
              className="px-4 py-2.5 rounded-[10px] text-xs font-bold"
              style={{
                background: saved ? 'rgba(0,188,125,0.2)' : '#6366f1',
                color: saved ? '#00bc7d' : '#fff',
                border: saved ? '1px solid #00bc7d40' : 'none',
                transition: 'all 0.2s',
              }}
              onClick={handleSaveKey}
            >
              {saved ? 'Saved ✓' : 'Save'}
            </button>
          </div>
        </motion.div>
      </div>

      {/* Sections */}
      <div className="px-5 pb-8 space-y-5">
        {sections.map((section, si) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + si * 0.08 }}
          >
            <div className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#a8b8cc' }}>
              {section.title}
            </div>
            <div className="rounded-[16px] overflow-hidden" style={{ border: '0.75px solid #1d293d' }}>
              {section.items.map((item, ii) => (
                <button
                  key={item.label}
                  className="w-full flex items-center gap-3 px-4 py-4 text-left"
                  style={{
                    background: 'rgba(18,26,47,0.9)',
                    borderBottom: ii < section.items.length - 1 || (section.title === 'Notifications' && showTimePicker) ? '0.75px solid #1d293d' : 'none',
                  }}
                  onClick={item.onPress || item.onToggle || undefined}
                  aria-label={item.label}
                  aria-pressed={item.onToggle ? !!item.on : undefined}
                  disabled={!item.onPress && !item.onToggle && !item.chevron}
                >
                  <item.icon size={18} color={item.on ? '#6366f1' : '#a8b8cc'} />
                  <div className="flex-1">
                    <div className="text-sm font-medium" style={{ color: '#f8fafc' }}>
                      {item.label}
                    </div>
                    <div className="text-xs" style={{ color: '#a8b8cc' }}>{item.hint}</div>
                  </div>
                  {item.chevron
                    ? <ChevronRight size={14} color={item.label === 'Reminder time' && showTimePicker ? '#6366f1' : '#a8b8cc'} style={{ transform: item.label === 'Reminder time' && showTimePicker ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }} />
                    : item.onToggle ? <Toggle on={!!item.on} onToggle={item.onToggle} />
                    : null
                  }
                </button>
              ))}
              {/* Background Colour — shown inline in Accessibility section */}
              {section.title === 'Accessibility' && (
                <div
                  className="flex items-center justify-between px-4 py-4"
                  style={{ background: 'rgba(18,26,47,0.9)', borderTop: '0.75px solid #1d293d' }}
                >
                  <div className="flex-1 min-w-0 pr-4">
                    <div className="text-sm font-medium" style={{ color: '#f8fafc' }}>Background Colour</div>
                    <div className="text-xs mt-0.5" style={{ color: '#64748b' }}>
                      Cream and soft blue backgrounds help reduce visual stress
                    </div>
                    {/* Colour swatches */}
                    <div className="flex items-center gap-2 mt-2">
                      {Object.entries(BG_THEMES).map(([key, t]) => (
                        <div
                          key={key}
                          title={t.label}
                          className="w-5 h-5 rounded-full shrink-0"
                          style={{
                            background: t.bg,
                            border: (prefs.bgTheme || 'dark') === key
                              ? '2px solid #6366f1'
                              : '2px solid #2d3e55',
                            boxShadow: (prefs.bgTheme || 'dark') === key
                              ? '0 0 0 1px #6366f1'
                              : 'none',
                            transition: 'border 0.15s, box-shadow 0.15s',
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={cycleBgTheme}
                    className="px-3 py-1.5 rounded-[8px] text-xs font-semibold shrink-0"
                    style={{ background: 'rgba(99,102,241,0.12)', border: '0.75px solid rgba(99,102,241,0.3)', color: '#818cf8' }}
                  >
                    {BG_THEMES[prefs.bgTheme || 'dark'].label}
                  </button>
                </div>
              )}
              {/* Time picker — shown inline under Notifications when reminders are on */}
              <AnimatePresence>
                {section.title === 'Notifications' && showTimePicker && (
                  <motion.div
                    key="time-picker"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.22 }}
                    style={{ overflow: 'hidden', background: 'rgba(11,17,33,0.95)' }}
                  >
                    <div className="px-4 py-4 flex flex-col gap-3">
                      <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#a8b8cc' }}>
                        Reminder time
                      </p>
                      <div className="flex items-center gap-3">
                        {/* Hour picker */}
                        <div className="flex flex-col items-center gap-1">
                          <button
                            className="w-11 h-11 rounded-[10px] flex items-center justify-center text-xs font-bold"
                            style={{ background: 'rgba(99,102,241,0.15)', color: '#6366f1' }}
                            onClick={() => setReminderHour(h => (h + 1) % 24)}
                            aria-label="Increase hour"
                          >▲</button>
                          <div className="w-14 h-11 rounded-[10px] flex items-center justify-center text-xl font-bold tabular-nums"
                            style={{ background: 'rgba(18,26,47,0.9)', border: '0.75px solid #2d3e55', color: '#f8fafc' }}>
                            {String(reminderHour).padStart(2, '0')}
                          </div>
                          <button
                            className="w-11 h-11 rounded-[10px] flex items-center justify-center text-xs font-bold"
                            style={{ background: 'rgba(99,102,241,0.15)', color: '#6366f1' }}
                            onClick={() => setReminderHour(h => (h + 23) % 24)}
                            aria-label="Decrease hour"
                          >▼</button>
                        </div>
                        <span className="text-2xl font-bold" style={{ color: '#f8fafc' }}>:</span>
                        {/* Minute picker — 00 / 15 / 30 / 45 */}
                        <div className="flex flex-col items-center gap-1">
                          <button
                            className="w-11 h-11 rounded-[10px] flex items-center justify-center text-xs font-bold"
                            style={{ background: 'rgba(99,102,241,0.15)', color: '#6366f1' }}
                            onClick={() => setReminderMinute(m => (m + 15) % 60)}
                            aria-label="Increase minute"
                          >▲</button>
                          <div className="w-14 h-11 rounded-[10px] flex items-center justify-center text-xl font-bold tabular-nums"
                            style={{ background: 'rgba(18,26,47,0.9)', border: '0.75px solid #2d3e55', color: '#f8fafc' }}>
                            {String(reminderMinute).padStart(2, '0')}
                          </div>
                          <button
                            className="w-11 h-11 rounded-[10px] flex items-center justify-center text-xs font-bold"
                            style={{ background: 'rgba(99,102,241,0.15)', color: '#6366f1' }}
                            onClick={() => setReminderMinute(m => (m + 45) % 60)}
                            aria-label="Decrease minute"
                          >▼</button>
                        </div>
                        <div className="flex flex-col gap-1 ml-auto">
                          <span className="text-xs" style={{ color: '#a8b8cc' }}>
                            {reminderHour < 12 ? 'AM' : 'PM'}
                          </span>
                          <span className="text-xs" style={{ color: '#4a5a72' }}>24h</span>
                        </div>
                      </div>
                      <button
                        className="w-full py-3 rounded-[12px] text-sm font-bold mt-1"
                        style={{ background: 'linear-gradient(135deg, #4f6ef7, #6366f1)', color: '#fff', boxShadow: '0 4px 16px rgba(99,102,241,0.3)' }}
                        onClick={handleSaveReminderTime}
                      >
                        Save time
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}

        {/* Sign out */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <div className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#a8b8cc' }}>
            Account
          </div>
          <div className="rounded-[16px] overflow-hidden" style={{ border: '0.75px solid #1d293d' }}>
            <div className="flex items-center gap-3 px-4 py-3" style={{ background: 'rgba(18,26,47,0.9)', borderBottom: '0.75px solid #1d293d' }}>
              <div className="w-2 h-2 rounded-full" style={{ background: '#00bc7d' }} />
              <div className="text-xs" style={{ color: '#a8b8cc' }}>Signed in as <strong style={{ color: '#f8fafc' }}>{user?.email}</strong></div>
            </div>
            <button
              className="w-full flex items-center gap-3 px-4 py-4 text-left"
              style={{ background: 'rgba(18,26,47,0.9)', opacity: signingOut ? 0.6 : 1, transition: 'opacity 0.15s' }}
              onClick={signingOut ? undefined : handleSignOut}
              disabled={signingOut}
              aria-label="Sign out"
            >
              {signingOut ? (
                <motion.div
                  className="w-[18px] h-[18px] rounded-full border-2 shrink-0"
                  style={{ borderColor: 'rgba(168,184,204,0.3)', borderTopColor: '#a8b8cc' }}
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                />
              ) : (
                <LogOut size={18} color="#a8b8cc" />
              )}
              <div className="flex-1">
                <div className="text-sm font-medium" style={{ color: '#f8fafc' }}>
                  {signingOut ? 'Signing out…' : 'Sign Out'}
                </div>
                <div className="text-xs" style={{ color: '#a8b8cc' }}>Your progress is saved locally</div>
              </div>
            </button>
          </div>
        </motion.div>

        {/* Delete all data */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}>
          <div className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#a8b8cc' }}>
            Data
          </div>
          <div className="rounded-[16px] overflow-hidden" style={{ border: '0.75px solid rgba(239,68,68,0.25)' }}>
            {!showDeleteConfirm ? (
              <button
                className="w-full flex items-center gap-3 px-4 py-4 text-left"
                style={{ background: 'rgba(18,26,47,0.9)' }}
                onClick={() => setShowDeleteConfirm(true)}
                aria-label="Clear all my data"
              >
                <Trash2 size={18} color="#ef4444" />
                <div className="flex-1">
                  <div className="text-sm font-medium" style={{ color: '#ef4444' }}>Delete Account</div>
                  <div className="text-xs" style={{ color: '#a8b8cc' }}>Permanently deletes your account and all data</div>
                </div>
                <ChevronRight size={14} color="#ef444480" />
              </button>
            ) : (
              <div className="px-4 py-4" style={{ background: 'rgba(239,68,68,0.07)' }}>
                <p className="text-sm font-semibold mb-1" style={{ color: '#ef4444' }}>Delete your account?</p>
                <p className="text-xs mb-3" style={{ color: '#a8b8cc' }}>This will permanently delete your account, all progress, preferences and API key. This cannot be undone.</p>
                <div className="flex gap-2">
                  <button
                    className="flex-1 py-2.5 rounded-[10px] text-xs font-bold"
                    style={{ background: '#ef4444', color: '#fff' }}
                    onClick={handleDeleteData}
                    aria-label="Confirm delete all data"
                  >
                    Yes, delete everything
                  </button>
                  <button
                    className="flex-1 py-2.5 rounded-[10px] text-xs font-semibold"
                    style={{ background: 'rgba(255,255,255,0.07)', color: '#a8b8cc', border: '0.75px solid #1d293d' }}
                    onClick={() => setShowDeleteConfirm(false)}
                    aria-label="Cancel data deletion"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Toast */}
      {toast && (
        <motion.div
          className="fixed bottom-24 left-4 right-4 py-3 px-4 rounded-[14px] text-sm font-medium text-center"
          style={{
            background: 'rgba(18,26,47,0.97)',
            border: `0.75px solid ${toast.color}60`,
            color: toast.color,
            boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
            zIndex: 50,
          }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
        >
          {toast.msg}
        </motion.div>
      )}
    </div>
  )
}
