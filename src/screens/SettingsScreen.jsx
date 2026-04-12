import { motion, AnimatePresence } from 'motion/react'
import { useState, useEffect } from 'react'
import { Sun, Bell, Accessibility, Info, ChevronRight, Trash2, Shield, FileText, Pencil, Check, X, LogOut, Type, Clock, Volume2, BookOpen, GraduationCap, CalendarDays } from 'lucide-react'
import { BOARDS, BOARD_ORDER, getSelectedBoard, getValidatedBoard, saveSelectedBoard } from '../utils/boardConfig'
import AtomIcon from '../components/AtomIcon'
import { useNavigate } from 'react-router-dom'
import { secureRemove } from '../utils/secureStorage'
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
  // size: 'Normal' | 'Large' (capitalised) or legacy 'normal' | 'large'
  const isLarge = size === 'Large' || size === 'large'
  document.body.classList.toggle('text-large', isLarge)
  document.documentElement.style.fontSize = isLarge ? '18px' : ''
}

// ── Background theme (SEN: coloured backgrounds) ────────────────────────────
const BG_THEMES = {
  dark:  { bg: '#080f1e', card: 'rgba(15,22,41,0.95)', text: '#f8fafc', label: 'Dark (default)' },
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
function Toggle({ on, onToggle, disabled = false, label }) {
  return (
    <motion.button
      role="switch"
      aria-checked={!!on}
      aria-label={label}
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
  const [selectedBoardId, setSelectedBoardId] = useState(() => getValidatedBoard())

  const handleSelectBoard = (boardId) => {
    saveSelectedBoard(boardId)
    setSelectedBoardId(boardId)
    showToast(`Switched to ${BOARDS[boardId]?.name} ✓`, BOARDS[boardId]?.color || '#6366f1')
    // Fire a storage event so LearnScreen updates without a full reload
    try { window.dispatchEvent(new Event('storage')) } catch {}
  }

  const handleSignOut = () => {
    setSigningOut(true)
    // Clear local session data synchronously
    localStorage.removeItem('neurophysics_profile')
    try { secureRemove('mamo_api_key') } catch {}
    // signOut() calls setUser(null) synchronously → AppShell redirects to /auth.
    // Fire-and-forget: don't await so a slow/offline Supabase call never blocks.
    signOut().catch(console.error)
  }
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
    // Sync flat np_auto_tts key so question components can read it without parsing PREFS_KEY
    localStorage.setItem('np_auto_tts', prefs.autoTTS ? 'true' : 'false')
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

  // ── Font Size (segmented: 'Normal' | 'Large')
  const setFontSize = (size) => {
    applyFontSize(size)
    setPref('fontSize', size)
    showToast(size === 'Large' ? 'Large text on' : 'Normal text restored', size === 'Large' ? '#10b981' : '#a8b8cc')
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

  // ── Auto-TTS (reads question text on mount)
  const toggleAutoTTS = () => {
    const next = !prefs.autoTTS
    setPref('autoTTS', next)
    // Mirror to the flat np_auto_tts key consumed by question components
    localStorage.setItem('np_auto_tts', next ? 'true' : 'false')
    showToast(next ? 'Auto-read on — questions will be read aloud automatically' : 'Auto-read off', next ? '#10b981' : '#a8b8cc')
  }

  // ── Hide floating Mamo (F9)
  const toggleHideMamo = () => {
    const next = !prefs.hideMamo
    setPref('hideMamo', next)
    // Notify FloatingMamo in App.jsx to sync its dismissed state reactively
    window.dispatchEvent(new Event('np_prefs_changed'))
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
    localStorage.removeItem('neurophysics_consent')
    localStorage.removeItem('np_progress')
    localStorage.removeItem('np_stats')
    localStorage.removeItem('np_board')
    localStorage.removeItem('np_auto_tts')
    localStorage.removeItem('np_bg_theme')
    localStorage.removeItem('np_pace_override')
    // Clear all Mamo chat history (may contain personal discussions)
    Object.keys(localStorage).filter(k => k.startsWith('mamo_thread_') || k.startsWith('np_lesson_progress_')).forEach(k => localStorage.removeItem(k))
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
          icon: Volume2,
          label: 'Auto-read questions aloud',
          hint: 'Automatically reads question text when it appears',
          on: !!prefs.autoTTS,
          onToggle: toggleAutoTTS,
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
      title: 'Study Tools',
      items: [
        {
          icon: BookOpen,
          label: 'Spec Checklist',
          hint: "Track all your specification topics",
          chevron: true,
          onPress: () => navigate('/spec-checklist'),
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
    <div className="flex flex-col h-full overflow-y-auto" style={{ background: '#080f1e' }}>
      <div className="px-5 pt-6 pb-4">
        <h1 className="text-2xl font-bold" style={{ color: '#f8fafc' }}>Settings</h1>
        <p className="text-sm mt-1" style={{ color: '#a8b8cc' }}>Customise your experience</p>
      </div>

      {/* Profile card */}
      <div className="px-5 mb-6">
        <motion.div
          className="rounded-[20px] p-5"
          style={{ background: 'rgba(15,22,41,0.95)', border: '0.75px solid rgba(255,255,255,0.08)' }}
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
                      background: editAvatar === em ? 'rgba(99,102,241,0.2)' : 'rgba(255,255,255,0.06)',
                      border: editAvatar === em ? '2px solid #6366f1' : '0.75px solid rgba(255,255,255,0.1)',
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
                  style={{ background: 'rgba(255,255,255,0.06)', color: '#f8fafc', border: '0.75px solid rgba(255,255,255,0.1)' }}
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

      {/* ── Exam Date ── */}
      {(() => {
        const examDateStr = profile.examDate || ''
        const today = new Date(); today.setHours(0,0,0,0)
        const examD = examDateStr ? new Date(examDateStr) : null
        const daysLeft = examD ? Math.ceil((examD - today) / 86400000) : null
        const passed = daysLeft !== null && daysLeft <= 0
        const urgency = daysLeft === null ? null
          : passed ? { color: '#94a3b8', bg: 'rgba(148,163,184,0.08)', border: 'rgba(148,163,184,0.18)', label: 'Passed' }
          : daysLeft <= 14 ? { color: '#ef4444', bg: 'rgba(239,68,68,0.08)', border: 'rgba(239,68,68,0.22)', label: 'Very soon' }
          : daysLeft <= 42 ? { color: '#f59e0b', bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.22)', label: 'Coming up' }
          : { color: '#22c55e', bg: 'rgba(34,197,94,0.08)', border: 'rgba(34,197,94,0.2)', label: 'On track' }
        const fmtDate = examD ? examD.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : ''
        return (
          <div className="px-5 mb-5">
            <div className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#a8b8cc' }}>
              Exam Date
            </div>
            {/* Card — native date input overlaid invisibly so tapping anywhere opens picker */}
            <div
              className="rounded-[20px] relative overflow-hidden"
              style={{
                background: urgency ? urgency.bg : 'rgba(15,22,41,0.95)',
                border: `0.75px solid ${urgency ? urgency.border : 'rgba(255,255,255,0.08)'}`,
              }}
            >
              {examDateStr ? (
                /* ── Date set: rich display ── */
                <div className="px-5 py-4 flex items-center gap-4">
                  {/* Countdown bubble */}
                  <div
                    className="flex flex-col items-center justify-center rounded-[14px] shrink-0"
                    style={{ width: 64, height: 64, background: `${urgency.color}18`, border: `0.75px solid ${urgency.color}40` }}
                  >
                    <span className="font-black leading-none" style={{ fontSize: 22, color: urgency.color }}>
                      {passed ? '✓' : daysLeft}
                    </span>
                    <span className="font-semibold" style={{ fontSize: 10, color: `${urgency.color}cc`, marginTop: 2 }}>
                      {passed ? 'done' : daysLeft === 1 ? 'day' : 'days'}
                    </span>
                  </div>
                  {/* Date text */}
                  <div className="flex-1 min-w-0">
                    <div className="font-bold" style={{ fontSize: 17, color: '#f8fafc', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                      {fmtDate}
                    </div>
                    <div
                      className="mt-1 inline-flex items-center gap-1 px-2 py-0.5 rounded-full"
                      style={{ background: `${urgency.color}18`, fontSize: 11, fontWeight: 600, color: urgency.color }}
                    >
                      {urgency.label}
                    </div>
                  </div>
                  {/* Edit icon */}
                  <div
                    className="w-9 h-9 rounded-[10px] flex items-center justify-center shrink-0"
                    style={{ background: 'rgba(255,255,255,0.07)', border: '0.75px solid rgba(255,255,255,0.1)' }}
                  >
                    <Pencil size={13} color="#a8b8cc" />
                  </div>
                </div>
              ) : (
                /* ── No date: prompt ── */
                <div className="px-5 py-5 flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-[12px] flex items-center justify-center shrink-0"
                    style={{ background: 'rgba(99,102,241,0.12)', border: '0.75px solid rgba(99,102,241,0.25)' }}
                  >
                    <CalendarDays size={20} color="#6366f1" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-bold" style={{ color: '#f8fafc' }}>Set your exam date</div>
                    <div className="text-xs mt-0.5" style={{ color: '#a8b8cc' }}>We'll build your study plan around it</div>
                  </div>
                  <div
                    className="px-3 py-1.5 rounded-full text-xs font-bold"
                    style={{ background: 'rgba(99,102,241,0.15)', border: '0.75px solid rgba(99,102,241,0.35)', color: '#818cf8' }}
                  >
                    Set date
                  </div>
                </div>
              )}
              {/* Invisible native date input stretched over entire card — tapping opens OS picker */}
              {/* tabIndex={-1} + onFocus blur prevents iOS from scrolling to keep input in view */}
              <input
                type="date"
                value={examDateStr}
                min={new Date().toISOString().split('T')[0]}
                tabIndex={-1}
                onFocus={e => {
                  // Immediately re-blur to stop iOS scrolling to the input,
                  // but let the click/tap still open the native date picker
                  e.target.style.fontSize = '16px' // prevent iOS zoom
                }}
                onChange={e => {
                  const updated = { ...profile, examDate: e.target.value }
                  setProfile(updated)
                  saveProfile(updated)
                  showToast('Exam date saved ✓', '#10b981')
                }}
                style={{
                  position: 'absolute', inset: 0, width: '100%', height: '100%',
                  opacity: 0, cursor: 'pointer',
                  fontSize: '16px', // prevent iOS auto-zoom on focus
                }}
                aria-label="Set exam date"
              />
            </div>
          </div>
        )
      })()}

      {/* ── Exam Board Picker ── */}
      <div className="px-5 mb-5">
        <div className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#a8b8cc' }}>
          Exam Board
        </div>
        <div className="rounded-[16px] p-4 space-y-2" style={{ background: 'rgba(15,22,41,0.95)', border: '0.75px solid rgba(255,255,255,0.08)' }}>
          <div className="flex items-center gap-2 mb-3">
            <GraduationCap size={15} color="#6366f1" />
            <span className="text-sm font-semibold" style={{ color: '#f8fafc' }}>Your exam board</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {BOARD_ORDER.map(boardId => {
              const board = BOARDS[boardId]
              const isSelected = selectedBoardId === boardId
              return (
                <motion.button
                  key={boardId}
                  onClick={() => handleSelectBoard(boardId)}
                  className="flex flex-col items-start px-3 py-2.5 rounded-[12px] text-left"
                  style={{
                    background: isSelected ? `${board.color}18` : 'rgba(255,255,255,0.03)',
                    border: isSelected ? `1.5px solid ${board.color}60` : '0.75px solid rgba(255,255,255,0.08)',
                    transition: 'all 0.15s ease',
                  }}
                  whileTap={{ scale: 0.97 }}
                >
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span style={{ fontSize: 13 }}>{board.flag}</span>
                    <span className="text-xs font-bold" style={{ color: isSelected ? board.color : '#f8fafc' }}>
                      {board.name}
                    </span>
                    {isSelected && (
                      <div className="w-1.5 h-1.5 rounded-full ml-auto" style={{ background: board.color }} />
                    )}
                  </div>
                  <span className="text-[10px] leading-tight" style={{ color: '#556677' }}>
                    {board.description}
                  </span>
                </motion.button>
              )
            })}
          </div>
          <p className="text-[10px] text-center pt-1" style={{ color: '#3a4a5a' }}>
            This filters topics to match your exam board's specification
          </p>
        </div>
      </div>

      {/* Sections */}
      <div className="px-5 space-y-5" style={{ paddingBottom: 'calc(96px + env(safe-area-inset-bottom, 0px))' }}>
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
            <div className="rounded-[16px] overflow-hidden" style={{ border: '0.75px solid rgba(255,255,255,0.08)' }}>
              {section.items.map((item, ii) => (
                <button
                  key={item.label}
                  className="w-full flex items-center gap-3 px-4 py-4 text-left"
                  style={{
                    background: 'rgba(15,22,41,0.95)',
                    borderBottom: ii < section.items.length - 1 || (section.title === 'Notifications' && showTimePicker) ? '0.75px solid rgba(255,255,255,0.06)' : 'none',
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
                    : item.onToggle ? <Toggle on={!!item.on} onToggle={item.onToggle} label={item.label} />
                    : null
                  }
                </button>
              ))}
              {/* Text Size — segmented pill control, shown inline in Accessibility section */}
              {section.title === 'Accessibility' && (
                <div
                  className="flex items-center justify-between px-4 py-4"
                  style={{ background: 'rgba(15,22,41,0.95)', borderTop: '0.75px solid rgba(255,255,255,0.06)' }}
                >
                  <div className="flex-1 min-w-0 pr-4">
                    <div className="text-sm font-medium" style={{ color: '#f8fafc' }}>Text size</div>
                    <div className="text-xs mt-0.5" style={{ color: '#64748b' }}>
                      Larger text helps with low vision and reading fatigue
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    {['Normal', 'Large'].map(size => {
                      const current = prefs.fontSize === 'Large' || prefs.fontSize === 'large' ? 'Large' : 'Normal'
                      const active = current === size
                      return (
                        <button
                          key={size}
                          onClick={() => setFontSize(size)}
                          style={{
                            padding: '8px 18px',
                            borderRadius: 20,
                            background: active ? 'rgba(0,212,255,0.15)' : 'rgba(255,255,255,0.06)',
                            border: active ? '0.75px solid rgba(0,212,255,0.4)' : '0.75px solid rgba(255,255,255,0.1)',
                            color: active ? '#00d4ff' : '#94a3b8',
                            fontSize: 13,
                            fontWeight: active ? 700 : 400,
                            cursor: 'pointer',
                          }}
                        >{size}</button>
                      )
                    })}
                  </div>
                </div>
              )}
              {/* Background Colour — shown inline in Accessibility section */}
              {section.title === 'Accessibility' && (
                <div
                  className="flex items-center justify-between px-4 py-4"
                  style={{ background: 'rgba(15,22,41,0.95)', borderTop: '0.75px solid rgba(255,255,255,0.06)' }}
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
                              : '2px solid rgba(255,255,255,0.12)',
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
                    style={{ overflow: 'hidden', background: 'rgba(8,15,30,0.98)' }}
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
                            style={{ background: 'rgba(255,255,255,0.06)', border: '0.75px solid rgba(255,255,255,0.1)', color: '#f8fafc' }}>
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
                            style={{ background: 'rgba(255,255,255,0.06)', border: '0.75px solid rgba(255,255,255,0.1)', color: '#f8fafc' }}>
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
          <div className="rounded-[16px] overflow-hidden" style={{ border: '0.75px solid rgba(255,255,255,0.08)' }}>
            <div className="flex items-center gap-3 px-4 py-3" style={{ background: 'rgba(15,22,41,0.95)', borderBottom: '0.75px solid rgba(255,255,255,0.06)' }}>
              <div className="w-2 h-2 rounded-full" style={{ background: user?.isGuest ? '#f59e0b' : '#00bc7d' }} />
              <div className="text-xs" style={{ color: '#a8b8cc' }}>
                {user?.isGuest
                  ? <span>Browsing as <strong style={{ color: '#f8fafc' }}>Guest</strong> — progress saved locally</span>
                  : <>Signed in as <strong style={{ color: '#f8fafc' }}>{user?.email}</strong></>
                }
              </div>
            </div>
            <button
              className="w-full flex items-center gap-3 px-4 py-4 text-left"
              style={{ background: 'rgba(15,22,41,0.95)', opacity: signingOut ? 0.6 : 1, transition: 'opacity 0.15s' }}
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

        {/* Delete all data — hidden for guest users (no Supabase account) */}
        {!user?.isGuest && <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}>
          <div className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#a8b8cc' }}>
            Data
          </div>
          <div className="rounded-[16px] overflow-hidden" style={{ border: '0.75px solid rgba(239,68,68,0.25)' }}>
            {!showDeleteConfirm ? (
              <button
                className="w-full flex items-center gap-3 px-4 py-4 text-left"
                style={{ background: 'rgba(15,22,41,0.95)' }}
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
                    style={{ background: 'rgba(255,255,255,0.07)', color: '#a8b8cc', border: '0.75px solid rgba(255,255,255,0.08)' }}
                    onClick={() => setShowDeleteConfirm(false)}
                    aria-label="Cancel data deletion"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>}
      </div>

      {/* Toast */}
      {toast && (
        <motion.div
          className="fixed bottom-24 left-4 right-4 py-3 px-4 rounded-[14px] text-sm font-medium text-center"
          style={{
            background: 'rgba(15,22,41,0.98)',
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
