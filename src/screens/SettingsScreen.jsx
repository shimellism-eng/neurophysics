import { motion, AnimatePresence } from 'motion/react'
import { useState, useEffect } from 'react'
import { Sun, Bell, Accessibility, Info, ChevronRight, Trash2, Shield, FileText, Pencil, Check, X, LogOut, Type, Clock, Volume2, BookOpen, GraduationCap, Calendar, SlidersHorizontal } from 'lucide-react'
import { BOARDS, BOARD_ORDER, getSelectedBoard, getValidatedBoard, saveSelectedBoard } from '../utils/boardConfig'
import AtomIcon from '../components/AtomIcon'
import { useNavigate } from 'react-router-dom'
import { secureRemove } from '../utils/secureStorage'
import { useAuth } from '../context/AuthContext'
import { useComfort } from '../context/ComfortContext'
import { supabase } from '../lib/supabase'
import { requestNotificationPermission, scheduleDailyReminder, cancelDailyReminder, checkNotificationPermission } from '../utils/notifications'
import SafeAreaPage from '../components/ui/SafeAreaPage.jsx'

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
  // Remove any legacy CDN link/style elements that may have been injected previously
  document.getElementById('np-dyslexic-link')?.remove()
  document.getElementById('np-dyslexic-apply')?.remove()
  if (on) {
    document.body.style.fontFamily = "'OpenDyslexic', sans-serif"
    document.body.style.lineHeight = '1.8'
    document.body.style.letterSpacing = '0.05em'
  } else {
    document.body.style.fontFamily = ''
    document.body.style.lineHeight = ''
    document.body.style.letterSpacing = ''
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
  // Toggle CSS class for solid-surface overrides (WCAG contrast fix)
  document.body.classList.toggle('high-contrast', on)
  // Keep the filter as an additional visual enhancement on top
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
  const { setSettingsOpen: openComfortSettings } = useComfort()

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
    // Clear local session data synchronously (board, role, progress, stats, profile)
    const keysToRemove = [
      'neurophysics_profile', 'np_board', 'np_role',
      'np_progress', 'np_stats',
    ]
    keysToRemove.forEach(k => localStorage.removeItem(k))
    try { secureRemove('mamo_api_key') } catch {}
    // signOut() calls setUser(null) synchronously → AppShell redirects to /auth.
    // Fire-and-forget: don't await so a slow/offline Supabase call never blocks.
    signOut().catch(console.error)
  }
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteCountdown, setDeleteCountdown] = useState(5)

  // Start countdown when confirm panel opens, reset when it closes
  useEffect(() => {
    if (showDeleteConfirm) {
      setDeleteCountdown(5)
      const interval = setInterval(() => {
        setDeleteCountdown(n => {
          if (n <= 1) { clearInterval(interval); return 0 }
          return n - 1
        })
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [showDeleteConfirm])

  // Profile + exam date
  const [profile, setProfile] = useState(() => loadProfile())
  const [editingProfile, setEditingProfile] = useState(false)
  const [editName, setEditName] = useState('')
  const [editAvatar, setEditAvatar] = useState('')
  const [examDate, setExamDate] = useState(() => loadProfile().examDate || '')

  const handleExamDateChange = (e) => {
    const val = e.target.value
    setExamDate(val)
    const updated = { ...loadProfile(), examDate: val || null }
    saveProfile(updated)
    setProfile(updated)
    showToast('Exam date saved ✓', '#10b981')
  }

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
    if (isDeleting) return
    setIsDeleting(true)

    // Attempt server-side Supabase account deletion (best-effort)
    try {
      // Refresh session first so the token isn't stale
      const { data: refreshData } = await supabase.auth.refreshSession()
      const token = refreshData?.session?.access_token
        ?? (await supabase.auth.getSession()).data?.session?.access_token

      if (token) {
        // Use relative URL so it works from neurophysics.co.uk AND neurophysics.vercel.app
        const apiBase = window.location.origin.includes('localhost')
          ? (import.meta.env.VITE_API_BASE || 'http://localhost:3000')
          : window.location.origin
        const res = await fetch(`${apiBase}/api/delete-account`, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` },
        })
        if (!res.ok) {
          const err = await res.json().catch(() => ({}))
          console.warn('Server-side account deletion failed:', err.error)
        }
      }
    } catch (e) {
      console.warn('Delete-account request failed:', e.message)
    }

    // Always clear all local data and sign out regardless of server result
    try {
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
      Object.keys(localStorage)
        .filter(k => k.startsWith('mamo_thread_') || k.startsWith('np_lesson_progress_'))
        .forEach(k => localStorage.removeItem(k))
      await secureRemove('mamo_api_key')
    } catch (e) {
      console.warn('Local data clear failed:', e.message)
    }

    showToast('Account deleted — goodbye 👋', '#10b981')
    // Small delay so toast is visible before redirect
    await new Promise(r => setTimeout(r, 900))
    await signOut()
  }

  const sections = [
    {
      title: 'Accessibility',
      items: [
        {
          icon: AtomIcon,
          label: 'Hide Mamo Button',
          hint: 'Removes the floating AI tutor button if it\'s distracting',
          on: !!prefs.hideMamo,
          onToggle: toggleHideMamo,
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
    <SafeAreaPage hasNav>
      <div className="px-5 pt-3 pb-4">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--np-text)', fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>Settings</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--np-text-muted)' }}>Customise your experience</p>
      </div>

      {/* Profile card */}
      <div className="px-5 mb-6">
        <motion.div
          className="rounded-[20px] p-5"
          style={{ background: 'var(--np-card)', border: '0.75px solid var(--np-border)' }}
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
                <div className="text-base font-bold truncate" style={{ color: 'var(--np-text)' }}>
                  {profile.name || user?.user_metadata?.full_name || 'Physics Learner'}
                </div>
                <div className="text-xs truncate" style={{ color: 'var(--np-text-muted)' }}>{user?.email}</div>
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
                <span className="text-sm font-semibold" style={{ color: 'var(--np-text)' }}>Edit Profile</span>
                <button onClick={() => setEditingProfile(false)} aria-label="Cancel editing" className="w-11 h-11 flex items-center justify-center">
                  <X size={16} color="#a8b8cc" />
                </button>
              </div>
              {/* Avatar picker */}
              <div className="flex flex-wrap gap-2 mb-3">
                {AVATARS.map(em => (
                  <button
                    key={em}
                    className="w-11 h-11 rounded-[12px] text-xl flex items-center justify-center"
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
                  style={{ background: 'rgba(255,255,255,0.06)', color: 'var(--np-text)', border: '0.75px solid rgba(255,255,255,0.1)' }}
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

      {/* ── Exam Board Picker ── */}
      <div className="px-5 mb-5">
        <div className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: 'var(--np-text-muted)' }}>
          Exam Board
        </div>
        <div className="rounded-[16px] p-4 space-y-2" style={{ background: 'var(--np-card)', border: '0.75px solid var(--np-border)' }}>
          <div className="flex items-center gap-2 mb-3">
            <GraduationCap size={15} color="#6366f1" />
            <span className="text-sm font-semibold" style={{ color: 'var(--np-text)' }}>Your exam board</span>
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
                    border: isSelected ? `1.5px solid ${board.color}60` : '0.75px solid var(--np-border)',
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

      {/* ── Exam Date ── */}
      <div className="px-5 mb-5">
        <div className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: 'var(--np-text-muted)' }}>
          Exam Date
        </div>
        <div className="rounded-[16px] p-4" style={{ background: 'var(--np-card)', border: '0.75px solid var(--np-border)' }}>
          <div className="flex items-center gap-2 mb-3">
            <Calendar size={15} color="#6366f1" />
            <span className="text-sm font-semibold" style={{ color: 'var(--np-text)' }}>Your exam date</span>
          </div>
          {/* Invisible native date input overlaid on custom display */}
          <div className="relative">
            {examDate ? (() => {
              const d = new Date(examDate)
              const today = new Date(); today.setHours(0,0,0,0)
              const daysLeft = Math.ceil((d - today) / 86400000)
              const urgent = daysLeft <= 14
              const soon   = daysLeft <= 42
              const passed = daysLeft < 0
              const accentColor = passed ? '#64748b' : urgent ? '#ef4444' : soon ? '#f39c12' : '#10b981'
              const label = passed ? 'Exam passed' : urgent ? 'Very soon!' : soon ? 'Coming up' : 'On track'
              return (
                <div className="flex items-center gap-3 px-4 py-3 rounded-[14px]"
                  style={{ background: `${accentColor}14`, border: `1px solid ${accentColor}33`, pointerEvents: 'none' }}>
                  <div className="flex flex-col items-center justify-center w-12 h-12 rounded-[10px] shrink-0"
                    style={{ background: `${accentColor}22` }}>
                    <span className="text-lg font-black leading-none" style={{ color: accentColor }}>
                      {passed ? '✓' : daysLeft}
                    </span>
                    {!passed && <span className="text-[9px] font-bold" style={{ color: accentColor }}>days</span>}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold" style={{ color: 'var(--np-text)' }}>
                      {d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' })}
                    </div>
                    <div className="text-xs mt-0.5 font-semibold" style={{ color: accentColor }}>{label}</div>
                  </div>
                  <Pencil size={14} color="#64748b" />
                </div>
              )
            })() : (
              <div className="flex items-center gap-3 px-4 py-3 rounded-[14px]"
                style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)', pointerEvents: 'none' }}>
                <div className="w-12 h-12 rounded-[10px] flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(99,102,241,0.15)' }}>
                  <Calendar size={22} color="#6366f1" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-bold" style={{ color: 'var(--np-text)' }}>Set your exam date</div>
                  <div className="text-xs mt-0.5" style={{ color: '#6b7d8f' }}>Get a personalised revision plan</div>
                </div>
                <div className="px-3 py-1.5 rounded-full text-xs font-bold"
                  style={{ background: 'rgba(99,102,241,0.2)', color: '#818cf8', border: '1px solid rgba(99,102,241,0.35)' }}>
                  Set date
                </div>
              </div>
            )}
            {/* Invisible native date input on top */}
            <input
              type="date"
              value={examDate}
              min={new Date().toISOString().split('T')[0]}
              onChange={handleExamDateChange}
              onFocus={e => { e.target.style.fontSize = '16px' }}
              style={{
                position: 'absolute', inset: 0, opacity: 0,
                width: '100%', height: '100%', cursor: 'pointer',
              }}
            />
          </div>
          {examDate && (
            <button
              onClick={() => {
                setExamDate('')
                const updated = { ...loadProfile(), examDate: null }
                saveProfile(updated)
                setProfile(updated)
              }}
              className="mt-2 w-full text-xs text-center py-1"
              style={{ color: '#3a4a5a' }}
            >
              Clear date
            </button>
          )}
        </div>
      </div>

      {/* Comfort Settings CTA */}
      <div className="px-5 mb-5">
        <motion.button
          className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl text-left active:opacity-75"
          style={{
            background: 'linear-gradient(135deg, rgba(0,212,255,0.12) 0%, rgba(99,102,241,0.12) 100%)',
            border: '0.75px solid rgba(0,212,255,0.3)',
          }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={() => openComfortSettings(true)}
        >
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: 'rgba(0,212,255,0.15)' }}>
            <SlidersHorizontal size={18} style={{ color: 'var(--np-cyan)' }} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-bold text-sm" style={{ color: 'var(--np-text)' }}>Comfort Settings</div>
            <div className="text-xs mt-0.5" style={{ color: 'var(--np-text-muted)' }}>
              Font, colours, motion, TTS, reading ruler & more
            </div>
          </div>
          <ChevronRight size={16} style={{ color: 'var(--np-text-muted)' }} />
        </motion.button>
      </div>

      {/* Sections */}
      <div className="px-5 space-y-5" style={{ paddingBottom: 'calc(var(--safe-bottom) + var(--page-bottom-gap))' }}>
        {sections.map((section, si) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + si * 0.08 }}
          >
            <div className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: 'var(--np-text-muted)' }}>
              {section.title}
            </div>
            <div className="rounded-[16px] overflow-hidden" style={{ border: '0.75px solid var(--np-border)' }}>
              {section.items.map((item, ii) => {
                const rowStyle = {
                  background: 'var(--np-card)',
                  borderBottom: ii < section.items.length - 1 || (section.title === 'Notifications' && showTimePicker) ? '0.75px solid var(--np-border)' : 'none',
                }
                const rowInner = (
                  <>
                    <item.icon size={18} color={item.on ? '#6366f1' : '#a8b8cc'} />
                    <div className="flex-1">
                      <div className="text-sm font-medium" style={{ color: 'var(--np-text)' }}>
                        {item.label}
                      </div>
                      <div className="text-xs" style={{ color: 'var(--np-text-muted)' }}>{item.hint}</div>
                    </div>
                    {item.chevron
                      ? <ChevronRight size={14} color={item.label === 'Reminder time' && showTimePicker ? '#6366f1' : '#a8b8cc'} style={{ transform: item.label === 'Reminder time' && showTimePicker ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }} />
                      : item.onToggle ? <Toggle on={!!item.on} onToggle={item.onToggle} label={item.label} />
                      : null
                    }
                  </>
                )
                // Toggle rows: outer must be a div — Toggle is itself a button, can't nest buttons
                if (item.onToggle) {
                  return (
                    <div key={item.label} className="w-full flex items-center gap-3 px-4 py-4" style={rowStyle}>
                      {rowInner}
                    </div>
                  )
                }
                return (
                  <button
                    key={item.label}
                    className="w-full flex items-center gap-3 px-4 py-4 text-left"
                    style={rowStyle}
                    onClick={item.onPress || undefined}
                    aria-label={item.label}
                    disabled={!item.onPress && !item.chevron}
                  >
                    {rowInner}
                  </button>
                )
              })}
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
                      <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--np-text-muted)' }}>
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
                            style={{ background: 'rgba(255,255,255,0.06)', border: '0.75px solid rgba(255,255,255,0.1)', color: 'var(--np-text)' }}>
                            {String(reminderHour).padStart(2, '0')}
                          </div>
                          <button
                            className="w-11 h-11 rounded-[10px] flex items-center justify-center text-xs font-bold"
                            style={{ background: 'rgba(99,102,241,0.15)', color: '#6366f1' }}
                            onClick={() => setReminderHour(h => (h + 23) % 24)}
                            aria-label="Decrease hour"
                          >▼</button>
                        </div>
                        <span className="text-2xl font-bold" style={{ color: 'var(--np-text)' }}>:</span>
                        {/* Minute picker — 00 / 15 / 30 / 45 */}
                        <div className="flex flex-col items-center gap-1">
                          <button
                            className="w-11 h-11 rounded-[10px] flex items-center justify-center text-xs font-bold"
                            style={{ background: 'rgba(99,102,241,0.15)', color: '#6366f1' }}
                            onClick={() => setReminderMinute(m => (m + 15) % 60)}
                            aria-label="Increase minute"
                          >▲</button>
                          <div className="w-14 h-11 rounded-[10px] flex items-center justify-center text-xl font-bold tabular-nums"
                            style={{ background: 'rgba(255,255,255,0.06)', border: '0.75px solid rgba(255,255,255,0.1)', color: 'var(--np-text)' }}>
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
                          <span className="text-xs" style={{ color: 'var(--np-text-muted)' }}>
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
          <div className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: 'var(--np-text-muted)' }}>
            Account
          </div>
          <div className="rounded-[16px] overflow-hidden" style={{ border: '0.75px solid var(--np-border)' }}>
            <div className="flex items-center gap-3 px-4 py-3" style={{ background: 'var(--np-card)', borderBottom: '0.75px solid var(--np-border)' }}>
              <div className="w-2 h-2 rounded-full" style={{ background: user?.isGuest ? '#f59e0b' : '#00bc7d' }} />
              <div className="text-xs" style={{ color: 'var(--np-text-muted)' }}>
                {user?.isGuest
                  ? <span>Browsing as <strong style={{ color: 'var(--np-text)' }}>Guest</strong> — progress saved locally</span>
                  : <>Signed in as <strong style={{ color: 'var(--np-text)' }}>{user?.email}</strong></>
                }
              </div>
            </div>
            <button
              className="w-full flex items-center gap-3 px-4 py-4 text-left"
              style={{ background: 'var(--np-card)', opacity: signingOut ? 0.6 : 1, transition: 'opacity 0.15s' }}
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
                <div className="text-sm font-medium" style={{ color: 'var(--np-text)' }}>
                  {signingOut ? 'Signing out…' : 'Sign Out'}
                </div>
                <div className="text-xs" style={{ color: 'var(--np-text-muted)' }}>Your progress is saved locally</div>
              </div>
            </button>
          </div>
        </motion.div>

        {/* Delete all data — hidden for guest users (no Supabase account) */}
        {!user?.isGuest && <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}>
          <div className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: 'var(--np-text-muted)' }}>
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
                  <div className="text-xs" style={{ color: 'var(--np-text-muted)' }}>Permanently deletes your account and all data</div>
                </div>
                <ChevronRight size={14} color="#ef444480" />
              </button>
            ) : (
              <div className="px-4 py-4" style={{ background: 'rgba(239,68,68,0.07)' }}>
                <p className="text-sm font-semibold mb-1" style={{ color: '#ef4444' }}>Delete your account?</p>
                <p className="text-xs mb-3" style={{ color: 'var(--np-text-muted)' }}>This will permanently delete your account, all progress, preferences and API key. This cannot be undone.</p>
                <div className="flex gap-2">
                  <button
                    className="flex-1 py-2.5 rounded-[10px] text-xs font-bold flex items-center justify-center gap-1.5"
                    style={{
                      background: isDeleting ? 'rgba(239,68,68,0.5)' : deleteCountdown > 0 ? 'rgba(239,68,68,0.35)' : '#ef4444',
                      color: '#fff',
                      opacity: (isDeleting || deleteCountdown > 0) ? 0.7 : 1,
                      transition: 'background 0.3s, opacity 0.3s',
                    }}
                    onClick={handleDeleteData}
                    disabled={isDeleting || deleteCountdown > 0}
                    aria-label="Confirm delete all data"
                  >
                    {isDeleting ? (
                      <>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83">
                            <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="0.8s" repeatCount="indefinite"/>
                          </path>
                        </svg>
                        Deleting…
                      </>
                    ) : deleteCountdown > 0 ? `Wait ${deleteCountdown}s…` : 'Confirm delete'}
                  </button>
                  <button
                    className="flex-1 py-2.5 rounded-[10px] text-xs font-semibold"
                    style={{ background: 'rgba(255,255,255,0.07)', color: 'var(--np-text-muted)', border: '0.75px solid var(--np-border)' }}
                    onClick={() => setShowDeleteConfirm(false)}
                    disabled={isDeleting}
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
            background: 'var(--np-card-deep)',
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
    </SafeAreaPage>
  )
}
