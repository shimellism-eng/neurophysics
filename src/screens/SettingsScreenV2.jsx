/**
 * SettingsScreenV2 — redesigned Profile/Settings screen
 *
 * Behind feature flag `np_ui_v2` (localStorage === '1') or `?v2=1` query param.
 * V1 (SettingsScreen.jsx) remains untouched — flip the flag to revert instantly.
 *
 * Design ported from /Users/mamo/neurophysics-web/app/profile/page.tsx
 * with the existing app's cyan (#00d4ff) / indigo (#6366f1) palette, not the
 * new-project orange — keeps visual consistency with other screens still on V1.
 */
import { motion, AnimatePresence } from 'motion/react'
import { useState, useEffect, useMemo } from 'react'
import {
  Sparkles, UserCircle, Settings as SettingsIcon, ChevronRight,
  Sun, Bell, Accessibility, Info, Trash2, Shield, FileText,
  Pencil, Check, X, LogOut, Type, Clock, Volume2, BookOpen,
  GraduationCap, Calendar,
} from 'lucide-react'
import { BOARDS, BOARD_ORDER, getSelectedBoard, saveSelectedBoard } from '../utils/boardConfig'
import AtomIcon from '../components/AtomIcon'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'
import {
  requestNotificationPermission, scheduleDailyReminder,
  cancelDailyReminder, checkNotificationPermission,
} from '../utils/notifications'
import { useProgress } from '../hooks/useProgress'

// ─── Persistence (duplicated from V1 so V1 stays untouched) ──────────────────
const PROFILE_KEY = 'neurophysics_profile'
const PREFS_KEY = 'neurophysics_prefs'
const AVATARS = ['🧠', '⚛️', '🔬', '🚀', '⚡', '🌊', '🔭', '💡', '🧲', '🌡️']

const loadProfile = () => { try { return JSON.parse(localStorage.getItem(PROFILE_KEY) || '{}') } catch { return {} } }
const saveProfile = p => localStorage.setItem(PROFILE_KEY, JSON.stringify(p))
const loadPrefs = () => { try { return JSON.parse(localStorage.getItem(PREFS_KEY) || '{}') } catch { return {} } }
const savePrefs = p => localStorage.setItem(PREFS_KEY, JSON.stringify(p))

// ─── Effect appliers (duplicated from V1) ────────────────────────────────────
const RM_STYLE_ID = 'np-reduce-motion'
function applyReduceMotion(on) {
  let el = document.getElementById(RM_STYLE_ID)
  if (on) {
    if (!el) {
      el = document.createElement('style')
      el.id = RM_STYLE_ID
      el.textContent = '* { transition-duration: 100ms !important; transition-delay: 0ms !important; animation-duration: 100ms !important; animation-iteration-count: 1 !important; }'
      document.head.appendChild(el)
    }
  } else { el?.remove() }
}
function applyDyslexicFont(on) {
  document.getElementById('np-dyslexic-link')?.remove()
  document.getElementById('np-dyslexic-apply')?.remove()
  if (on) {
    const link = document.createElement('link')
    link.id = 'np-dyslexic-link'; link.rel = 'stylesheet'
    link.href = 'https://fonts.cdnfonts.com/css/opendyslexic'
    document.head.appendChild(link)
    const style = document.createElement('style')
    style.id = 'np-dyslexic-apply'
    style.textContent = 'body, button, input, textarea, p, h1, h2, h3, span { font-family: "OpenDyslexic", sans-serif !important; letter-spacing: 0.05em !important; line-height: 1.7 !important; }'
    document.head.appendChild(style)
  }
}
function applyHighContrast(on) {
  document.documentElement.style.filter = on ? 'contrast(1.2) brightness(1.06)' : ''
}
function applyFontSize(size) {
  const isLarge = size === 'Large' || size === 'large'
  document.body.classList.toggle('text-large', isLarge)
  document.documentElement.style.fontSize = isLarge ? '18px' : ''
}
const BG_THEMES = {
  dark:  { bg: '#080f1e', card: 'rgba(15,22,41,0.95)', text: '#f8fafc', label: 'Dark (default)' },
  cream: { bg: '#f5f0e8', card: 'rgba(245,240,232,0.95)', text: '#1a1a1a', label: 'Cream' },
  blue:  { bg: '#e8f0f8', card: 'rgba(232,240,248,0.95)', text: '#1a1a1a', label: 'Soft Blue' },
}
function applyBgTheme(theme) {
  const t = BG_THEMES[theme] || BG_THEMES.dark
  document.documentElement.style.setProperty('--np-bg', t.bg)
  document.documentElement.style.setProperty('--np-card', t.card)
  document.body.style.background = t.bg
  try { localStorage.setItem('np_bg_theme', theme) } catch {}
}

// ─── Toggle (cyan accent to match rest of V1 app) ────────────────────────────
function Toggle({ on, onToggle, disabled = false, label }) {
  return (
    <motion.button
      role="switch"
      aria-checked={!!on}
      aria-label={label}
      onClick={disabled ? undefined : (e) => { e.stopPropagation(); onToggle() }}
      className="w-12 h-6 rounded-full relative shrink-0 outline-none"
      style={{
        background: on ? '#00d4ff' : '#1d293d',
        border: `1px solid ${on ? '#00d4ff' : '#2d3e55'}`,
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

// ─── Main screen ─────────────────────────────────────────────────────────────
export default function SettingsScreenV2() {
  const navigate = useNavigate()
  const { signOut, user } = useAuth()
  const { stats: progressStats, progress } = useProgress()

  const [signingOut, setSigningOut] = useState(false)
  const [selectedBoardId, setSelectedBoardId] = useState(() => getSelectedBoard().id)
  const [showBoardPicker, setShowBoardPicker] = useState(false)
  const [showExamDatePicker, setShowExamDatePicker] = useState(false)

  const handleSelectBoard = (id) => {
    if (id === selectedBoardId) return
    saveSelectedBoard(id)
    setSelectedBoardId(id)
    showToast(`Switched to ${BOARDS[id].name}`, BOARDS[id].color)
    setTimeout(() => window.location.reload(), 300)
  }

  const handleSignOut = async () => {
    if (signingOut) return
    setSigningOut(true)
    try {
      await signOut()
      navigate('/auth', { replace: true })
    } catch (e) {
      console.error(e)
      setSigningOut(false)
    }
  }

  // Profile (avatar + name)
  const [profile, setProfile] = useState(loadProfile())
  const [editingProfile, setEditingProfile] = useState(false)
  const [editName, setEditName] = useState('')
  const [editAvatar, setEditAvatar] = useState('🧠')
  const [examDate, setExamDate] = useState(profile.examDate || '')

  const handleExamDateChange = (e) => {
    const v = e.target.value
    setExamDate(v)
    const updated = { ...loadProfile(), examDate: v }
    saveProfile(updated)
    setProfile(updated)
  }
  const startEditProfile = () => {
    setEditName(profile.name || '')
    setEditAvatar(profile.avatar || '🧠')
    setEditingProfile(true)
  }
  const saveEditProfile = () => {
    const name = (editName || '').trim().slice(0, 30)
    const updated = { ...profile, name, avatar: editAvatar }
    saveProfile(updated); setProfile(updated); setEditingProfile(false)
    showToast('Profile saved', '#00d4ff')
  }

  // Prefs
  const [prefs, setPrefs] = useState(loadPrefs())
  useEffect(() => {
    applyReduceMotion(!!prefs.reduceMotion)
    applyDyslexicFont(!!prefs.dyslexicFont)
    applyHighContrast(!!prefs.highContrast)
    applyFontSize(prefs.fontSize || 'Normal')
    applyBgTheme(prefs.bgTheme || 'dark')
  }, [])
  const [toast, setToast] = useState(null)
  const showToast = (msg, color = '#00d4ff') => {
    setToast({ msg, color })
    setTimeout(() => setToast(null), 2200)
  }
  const setPref = (key, value, sideEffect) => {
    const next = { ...prefs, [key]: value }
    setPrefs(next); savePrefs(next); sideEffect?.(value)
  }
  const toggleReduceMotion   = () => setPref('reduceMotion',   !prefs.reduceMotion,   applyReduceMotion)
  const toggleHighContrast   = () => setPref('highContrast',   !prefs.highContrast,   applyHighContrast)
  const toggleDyslexicFont   = () => setPref('dyslexicFont',   !prefs.dyslexicFont,   applyDyslexicFont)
  const toggleTTS            = () => setPref('tts',            !prefs.tts)
  const toggleAutoTTS        = () => setPref('autoTTS',        !prefs.autoTTS)
  const toggleHideMamo       = () => setPref('hideMamo',       !prefs.hideMamo)
  const toggleExploreMode    = () => setPref('exploreMode',    !(prefs.exploreMode !== false))
  const toggleSounds         = () => setPref('sounds',         !(prefs.sounds !== false))
  const setFontSize          = (s) => setPref('fontSize', s, applyFontSize)
  const cycleBgTheme         = () => {
    const keys = Object.keys(BG_THEMES)
    const next = keys[(keys.indexOf(prefs.bgTheme || 'dark') + 1) % keys.length]
    setPref('bgTheme', next, applyBgTheme)
  }

  // Reminders
  const [reminderHour, setReminderHour] = useState(prefs.reminderHour ?? 20)
  const [reminderMinute, setReminderMinute] = useState(prefs.reminderMinute ?? 0)
  const [showTimePicker, setShowTimePicker] = useState(false)
  useEffect(() => {
    setReminderHour(prefs.reminderHour ?? 20)
    setReminderMinute(prefs.reminderMinute ?? 0)
  }, [prefs.reminders])
  const handleSaveReminderTime = () => {
    const next = { ...prefs, reminderHour, reminderMinute }
    setPrefs(next); savePrefs(next)
    if (prefs.reminders) scheduleDailyReminder(reminderHour, reminderMinute)
    setShowTimePicker(false)
    showToast(`Reminders at ${String(reminderHour).padStart(2,'0')}:${String(reminderMinute).padStart(2,'0')}`, '#00d4ff')
  }
  const toggleReminders = async () => {
    if (!prefs.reminders) {
      const ok = await requestNotificationPermission()
      if (!ok) { showToast('Permission denied', '#ef4444'); return }
      scheduleDailyReminder(reminderHour, reminderMinute)
      setPref('reminders', true)
    } else {
      cancelDailyReminder()
      setPref('reminders', false)
    }
  }

  // Delete account
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const handleDeleteData = async () => {
    if (isDeleting) return
    setIsDeleting(true)
    try {
      const { data: { session } } = await supabase.auth.getSession()
      const token = session?.access_token
      if (token) {
        await fetch('/api/delete-account', {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
        })
      }
      Object.keys(localStorage).filter(k => k.startsWith('neurophysics_') || k.startsWith('np_') || k.startsWith('mamo_')).forEach(k => localStorage.removeItem(k))
      await signOut()
      navigate('/auth', { replace: true })
    } catch (e) {
      console.error(e); setIsDeleting(false)
      showToast('Delete failed — try again', '#ef4444')
    }
  }

  // Stats for the 4-cell grid
  const masteredCount = useMemo(
    () => Object.values(progress || {}).filter(p => p?.mastered).length,
    [progress]
  )
  const streakCount = progressStats?.streak || 0
  const xpCount = progressStats?.xp || 0
  const activeDays = (progressStats?.streakDates || []).length

  const board = BOARDS[selectedBoardId]
  const displayName = profile.name || user?.user_metadata?.full_name || 'Physics Learner'
  const avatarChar = profile.avatar || '🧠'

  // Exam date urgency
  const examMeta = useMemo(() => {
    if (!examDate) return null
    const d = new Date(examDate)
    const today = new Date(); today.setHours(0,0,0,0)
    const daysLeft = Math.ceil((d - today) / 86400000)
    const passed = daysLeft < 0
    const urgent = daysLeft <= 14
    const soon = daysLeft <= 42
    const color = passed ? '#64748b' : urgent ? '#ef4444' : soon ? '#f39c12' : '#10b981'
    const label = passed ? 'Exam passed' : urgent ? 'Very soon!' : soon ? 'Coming up' : 'On track'
    return { d, daysLeft, passed, color, label }
  }, [examDate])

  return (
    <div className="flex flex-col h-full overflow-y-auto" style={{ background: '#080f1e' }}>
      <div
        className="px-5 pt-6 pb-2 flex flex-col gap-6"
        style={{ paddingBottom: 'calc(96px + env(safe-area-inset-bottom, 0px))' }}
      >
        {/* Identity */}
        <section className="flex flex-col items-center gap-3 pt-2">
          {!editingProfile ? (
            <>
              <button
                onClick={startEditProfile}
                aria-label="Edit avatar"
                className="h-20 w-20 rounded-full flex items-center justify-center text-[32px] relative"
                style={{
                  background: 'radial-gradient(circle at 30% 30%, #33e0ff 0%, #00d4ff 55%, #007a94 100%)',
                  color: '#0b2530',
                  boxShadow: '0 10px 32px -8px rgba(0,212,255,0.45), inset 0 -4px 12px rgba(0,0,0,0.18)',
                }}
              >
                {avatarChar}
                <span
                  className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center"
                  style={{ background: '#080f1e', border: '1.5px solid rgba(255,255,255,0.12)' }}
                >
                  <Pencil size={12} color="#a8b8cc" />
                </span>
              </button>
              <div className="flex flex-col items-center gap-1">
                <h1 className="text-[22px] font-bold" style={{ color: '#f8fafc' }}>{displayName}</h1>
                <span className="flex items-center gap-1.5 text-[13px] font-semibold" style={{ color: '#00d4ff' }}>
                  <Sparkles size={13} strokeWidth={2.25} />
                  {board?.name || 'Learner'} · {streakCount}-day streak
                </span>
                <span className="text-[12px]" style={{ color: '#a8b8cc' }}>
                  {user?.isGuest
                    ? 'Browsing as guest — progress saved locally'
                    : user?.email}
                </span>
              </div>
            </>
          ) : (
            <div
              className="w-full rounded-[20px] p-5"
              style={{ background: 'rgba(15,22,41,0.95)', border: '0.75px solid rgba(255,255,255,0.08)' }}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold" style={{ color: '#f8fafc' }}>Edit Profile</span>
                <button onClick={() => setEditingProfile(false)} aria-label="Cancel" className="w-11 h-11 flex items-center justify-center">
                  <X size={16} color="#a8b8cc" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                {AVATARS.map(em => (
                  <button
                    key={em}
                    onClick={() => setEditAvatar(em)}
                    aria-label={`Select avatar ${em}`}
                    className="w-11 h-11 rounded-[12px] text-xl flex items-center justify-center"
                    style={{
                      background: editAvatar === em ? 'rgba(0,212,255,0.18)' : 'rgba(255,255,255,0.06)',
                      border: editAvatar === em ? '2px solid #00d4ff' : '0.75px solid rgba(255,255,255,0.1)',
                      transform: editAvatar === em ? 'scale(1.1)' : 'scale(1)',
                      transition: 'all 0.15s',
                    }}
                  >{em}</button>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={editName}
                  onChange={e => setEditName(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && saveEditProfile()}
                  placeholder="Your name"
                  maxLength={30}
                  aria-label="Your name"
                  className="flex-1 px-3 py-2.5 rounded-[10px] text-sm outline-none"
                  style={{ background: 'rgba(255,255,255,0.06)', color: '#f8fafc', border: '0.75px solid rgba(255,255,255,0.1)' }}
                />
                <button
                  onClick={saveEditProfile}
                  className="w-10 h-10 rounded-[10px] flex items-center justify-center"
                  style={{ background: '#00d4ff' }}
                  aria-label="Save profile"
                >
                  <Check size={16} color="#0b2530" />
                </button>
              </div>
            </div>
          )}
        </section>

        {/* Stats grid (4-cell) */}
        <section
          className="grid grid-cols-4 rounded-[16px] overflow-hidden"
          style={{ background: 'rgba(15,22,41,0.95)', border: '0.75px solid rgba(255,255,255,0.08)' }}
        >
          {[
            { label: 'Mastered', value: masteredCount },
            { label: 'Streak',   value: streakCount },
            { label: 'XP',       value: xpCount },
            { label: 'Days',     value: activeDays },
          ].map((s, i) => (
            <div
              key={s.label}
              className="flex flex-col items-center py-3 px-1"
              style={{ borderLeft: i === 0 ? 'none' : '0.75px solid rgba(255,255,255,0.06)' }}
            >
              <span className="font-bold text-[18px] tabular-nums" style={{ color: '#00d4ff' }}>{s.value}</span>
              <span className="text-[11px] mt-0.5" style={{ color: '#a8b8cc' }}>{s.label}</span>
            </div>
          ))}
        </section>

        {/* Accessibility */}
        <section className="flex flex-col gap-3">
          <SectionHeader icon={UserCircle} label="Accessibility" />
          <div className="rounded-[16px] overflow-hidden" style={{ border: '0.75px solid rgba(255,255,255,0.08)' }}>
            {[
              { icon: BookOpen,      label: 'Explore Mode',           hint: 'Learn without hearts — no pressure',           on: prefs.exploreMode !== false,   onToggle: toggleExploreMode },
              { icon: Accessibility, label: 'Reduce Motion',          hint: 'Minimises animations',                         on: !!prefs.reduceMotion,          onToggle: toggleReduceMotion },
              { icon: Sun,           label: 'High Contrast',          hint: 'Stronger colour contrast',                     on: !!prefs.highContrast,          onToggle: toggleHighContrast },
              { icon: Type,          label: 'Dyslexia-Friendly Font', hint: 'OpenDyslexic — wider letter shapes',           on: !!prefs.dyslexicFont,          onToggle: toggleDyslexicFont },
              { icon: Info,          label: 'Read Questions Aloud',   hint: 'Shows a 🔊 button on questions',                on: !!prefs.tts,                   onToggle: toggleTTS },
              { icon: Volume2,       label: 'Auto-read Questions',    hint: 'Reads questions automatically',                on: !!prefs.autoTTS,               onToggle: toggleAutoTTS },
              { icon: AtomIcon,      label: 'Hide Mamo Button',       hint: 'Removes the floating AI tutor button',          on: !!prefs.hideMamo,              onToggle: toggleHideMamo },
              { icon: Volume2,       label: 'Sound Effects',          hint: 'Soft sound for correct / wrong answers',       on: prefs.sounds !== false,        onToggle: toggleSounds },
            ].map((r, i, arr) => (
              <div
                key={r.label}
                className="flex items-center gap-3 px-4 py-3.5"
                style={{
                  background: 'rgba(15,22,41,0.95)',
                  borderTop: i === 0 ? 'none' : '0.75px solid rgba(255,255,255,0.06)',
                }}
              >
                <r.icon size={18} color={r.on ? '#00d4ff' : '#a8b8cc'} />
                <div className="flex-1 min-w-0">
                  <div className="text-[14px] font-medium leading-tight" style={{ color: '#f8fafc' }}>{r.label}</div>
                  <div className="text-[12px] mt-0.5" style={{ color: '#a8b8cc' }}>{r.hint}</div>
                </div>
                <Toggle on={r.on} onToggle={r.onToggle} label={r.label} />
              </div>
            ))}
            {/* Text size */}
            <div
              className="flex items-center justify-between px-4 py-3.5"
              style={{ background: 'rgba(15,22,41,0.95)', borderTop: '0.75px solid rgba(255,255,255,0.06)' }}
            >
              <div className="flex-1 min-w-0 pr-4">
                <div className="text-[14px] font-medium" style={{ color: '#f8fafc' }}>Text size</div>
                <div className="text-[12px] mt-0.5" style={{ color: '#a8b8cc' }}>Larger text helps with low vision</div>
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
                        padding: '8px 18px', borderRadius: 20,
                        background: active ? 'rgba(0,212,255,0.15)' : 'rgba(255,255,255,0.06)',
                        border: active ? '0.75px solid rgba(0,212,255,0.4)' : '0.75px solid rgba(255,255,255,0.1)',
                        color: active ? '#00d4ff' : '#94a3b8',
                        fontSize: 13, fontWeight: active ? 700 : 400, cursor: 'pointer',
                      }}
                    >{size}</button>
                  )
                })}
              </div>
            </div>
            {/* Background colour */}
            <div
              className="flex items-center justify-between px-4 py-3.5"
              style={{ background: 'rgba(15,22,41,0.95)', borderTop: '0.75px solid rgba(255,255,255,0.06)' }}
            >
              <div className="flex-1 min-w-0 pr-4">
                <div className="text-[14px] font-medium" style={{ color: '#f8fafc' }}>Background Colour</div>
                <div className="text-[12px] mt-0.5" style={{ color: '#a8b8cc' }}>Cream / soft blue reduce visual stress</div>
                <div className="flex items-center gap-2 mt-2">
                  {Object.entries(BG_THEMES).map(([key, t]) => (
                    <div
                      key={key}
                      title={t.label}
                      className="w-5 h-5 rounded-full shrink-0"
                      style={{
                        background: t.bg,
                        border: (prefs.bgTheme || 'dark') === key ? '2px solid #00d4ff' : '2px solid rgba(255,255,255,0.12)',
                        boxShadow: (prefs.bgTheme || 'dark') === key ? '0 0 0 1px #00d4ff' : 'none',
                      }}
                    />
                  ))}
                </div>
              </div>
              <button
                onClick={cycleBgTheme}
                className="px-3 py-1.5 rounded-[8px] text-xs font-semibold shrink-0"
                style={{ background: 'rgba(0,212,255,0.12)', border: '0.75px solid rgba(0,212,255,0.3)', color: '#00d4ff' }}
              >
                {BG_THEMES[prefs.bgTheme || 'dark'].label}
              </button>
            </div>
          </div>
        </section>

        {/* General */}
        <section className="flex flex-col gap-3">
          <SectionHeader icon={SettingsIcon} label="General" />
          <div className="rounded-[16px] overflow-hidden" style={{ border: '0.75px solid rgba(255,255,255,0.08)' }}>
            {/* Exam Board row */}
            <button
              className="w-full flex items-center gap-3 px-4 py-3.5 text-left"
              style={{ background: 'rgba(15,22,41,0.95)' }}
              onClick={() => setShowBoardPicker(v => !v)}
              aria-label="Change exam board"
            >
              <GraduationCap size={18} color="#a8b8cc" />
              <div className="flex-1 min-w-0">
                <div className="text-[14px] font-medium" style={{ color: '#f8fafc' }}>Exam Board</div>
                <div className="text-[12px] mt-0.5" style={{ color: '#a8b8cc' }}>
                  {board?.flag} {board?.name}
                </div>
              </div>
              <ChevronRight size={18} color="#a8b8cc" style={{ transform: showBoardPicker ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }} />
            </button>
            <AnimatePresence>
              {showBoardPicker && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ overflow: 'hidden', background: 'rgba(8,15,30,0.98)', borderTop: '0.75px solid rgba(255,255,255,0.06)' }}
                >
                  <div className="grid grid-cols-2 gap-2 px-4 py-3">
                    {BOARD_ORDER.map(id => {
                      const b = BOARDS[id]
                      const sel = selectedBoardId === id
                      return (
                        <motion.button
                          key={id}
                          onClick={() => handleSelectBoard(id)}
                          className="flex flex-col items-start px-3 py-2.5 rounded-[12px] text-left"
                          style={{
                            background: sel ? `${b.color}18` : 'rgba(255,255,255,0.03)',
                            border: sel ? `1.5px solid ${b.color}60` : '0.75px solid rgba(255,255,255,0.08)',
                          }}
                          whileTap={{ scale: 0.97 }}
                        >
                          <div className="flex items-center gap-1.5 mb-0.5">
                            <span style={{ fontSize: 13 }}>{b.flag}</span>
                            <span className="text-xs font-bold" style={{ color: sel ? b.color : '#f8fafc' }}>{b.name}</span>
                            {sel && <div className="w-1.5 h-1.5 rounded-full ml-auto" style={{ background: b.color }} />}
                          </div>
                          <span className="text-[10px] leading-tight" style={{ color: '#556677' }}>{b.description}</span>
                        </motion.button>
                      )
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Exam Date row */}
            <button
              className="w-full flex items-center gap-3 px-4 py-3.5 text-left"
              style={{ background: 'rgba(15,22,41,0.95)', borderTop: '0.75px solid rgba(255,255,255,0.06)' }}
              onClick={() => setShowExamDatePicker(v => !v)}
              aria-label="Change exam date"
            >
              <Calendar size={18} color="#a8b8cc" />
              <div className="flex-1 min-w-0">
                <div className="text-[14px] font-medium" style={{ color: '#f8fafc' }}>Exam Date</div>
                <div className="text-[12px] mt-0.5" style={{ color: examMeta?.color || '#a8b8cc' }}>
                  {examMeta
                    ? `${examMeta.passed ? '✓' : examMeta.daysLeft + ' days'} · ${examMeta.label}`
                    : 'Not set — tap to add'}
                </div>
              </div>
              <ChevronRight size={18} color="#a8b8cc" style={{ transform: showExamDatePicker ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }} />
            </button>
            <AnimatePresence>
              {showExamDatePicker && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ overflow: 'hidden', background: 'rgba(8,15,30,0.98)', borderTop: '0.75px solid rgba(255,255,255,0.06)' }}
                >
                  <div className="px-4 py-3 flex flex-col gap-2">
                    <div className="relative">
                      <div
                        className="flex items-center gap-3 px-4 py-3 rounded-[14px]"
                        style={{
                          background: examMeta ? `${examMeta.color}14` : 'rgba(0,212,255,0.08)',
                          border: `1px solid ${examMeta ? examMeta.color + '33' : 'rgba(0,212,255,0.2)'}`,
                        }}
                      >
                        <div
                          className="flex flex-col items-center justify-center w-12 h-12 rounded-[10px] shrink-0"
                          style={{ background: examMeta ? `${examMeta.color}22` : 'rgba(0,212,255,0.15)' }}
                        >
                          {examMeta ? (
                            <>
                              <span className="text-lg font-black leading-none" style={{ color: examMeta.color }}>
                                {examMeta.passed ? '✓' : examMeta.daysLeft}
                              </span>
                              {!examMeta.passed && <span className="text-[9px] font-bold" style={{ color: examMeta.color }}>days</span>}
                            </>
                          ) : <Calendar size={22} color="#00d4ff" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-bold" style={{ color: '#f8fafc' }}>
                            {examMeta
                              ? examMeta.d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' })
                              : 'Set your exam date'}
                          </div>
                          <div className="text-xs mt-0.5 font-semibold" style={{ color: examMeta?.color || '#a8b8cc' }}>
                            {examMeta ? examMeta.label : 'Get a personalised revision plan'}
                          </div>
                        </div>
                        <Pencil size={14} color="#64748b" />
                      </div>
                      <input
                        type="date"
                        value={examDate}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={handleExamDateChange}
                        onFocus={e => { e.target.style.fontSize = '16px' }}
                        style={{ position: 'absolute', inset: 0, opacity: 0, width: '100%', height: '100%', cursor: 'pointer' }}
                      />
                    </div>
                    {examDate && (
                      <button
                        onClick={() => {
                          setExamDate('')
                          const updated = { ...loadProfile(), examDate: null }
                          saveProfile(updated); setProfile(updated)
                        }}
                        className="w-full text-xs text-center py-1"
                        style={{ color: '#3a4a5a' }}
                      >Clear date</button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Daily reminders */}
            <div
              className="flex items-center gap-3 px-4 py-3.5"
              style={{ background: 'rgba(15,22,41,0.95)', borderTop: '0.75px solid rgba(255,255,255,0.06)' }}
            >
              <Bell size={18} color={prefs.reminders ? '#00d4ff' : '#a8b8cc'} />
              <div className="flex-1 min-w-0">
                <div className="text-[14px] font-medium" style={{ color: '#f8fafc' }}>Daily Reminders</div>
                <div className="text-[12px] mt-0.5" style={{ color: '#a8b8cc' }}>
                  {prefs.reminders
                    ? `Every day at ${String(prefs.reminderHour ?? 20).padStart(2,'0')}:${String(prefs.reminderMinute ?? 0).padStart(2,'0')}`
                    : 'Get a nudge to keep your streak'}
                </div>
              </div>
              <Toggle on={!!prefs.reminders} onToggle={toggleReminders} label="Daily reminders" />
            </div>
            {prefs.reminders && (
              <button
                className="w-full flex items-center gap-3 px-4 py-3.5 text-left"
                style={{ background: 'rgba(15,22,41,0.95)', borderTop: '0.75px solid rgba(255,255,255,0.06)' }}
                onClick={() => setShowTimePicker(v => !v)}
                aria-label="Change reminder time"
              >
                <Clock size={18} color="#a8b8cc" />
                <div className="flex-1 min-w-0">
                  <div className="text-[14px] font-medium" style={{ color: '#f8fafc' }}>Reminder time</div>
                  <div className="text-[12px] mt-0.5" style={{ color: '#a8b8cc' }}>
                    Currently {String(prefs.reminderHour ?? 20).padStart(2,'0')}:{String(prefs.reminderMinute ?? 0).padStart(2,'0')}
                  </div>
                </div>
                <ChevronRight size={18} color="#a8b8cc" style={{ transform: showTimePicker ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }} />
              </button>
            )}
            <AnimatePresence>
              {showTimePicker && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.22 }}
                  style={{ overflow: 'hidden', background: 'rgba(8,15,30,0.98)', borderTop: '0.75px solid rgba(255,255,255,0.06)' }}
                >
                  <div className="px-4 py-4 flex items-center gap-3">
                    <div className="flex flex-col items-center gap-1">
                      <button onClick={() => setReminderHour(h => (h + 1) % 24)} aria-label="Increase hour"
                        className="w-11 h-11 rounded-[10px] flex items-center justify-center text-xs font-bold"
                        style={{ background: 'rgba(0,212,255,0.15)', color: '#00d4ff' }}>▲</button>
                      <div className="w-14 h-11 rounded-[10px] flex items-center justify-center text-xl font-bold tabular-nums"
                        style={{ background: 'rgba(255,255,255,0.06)', border: '0.75px solid rgba(255,255,255,0.1)', color: '#f8fafc' }}>
                        {String(reminderHour).padStart(2,'0')}
                      </div>
                      <button onClick={() => setReminderHour(h => (h + 23) % 24)} aria-label="Decrease hour"
                        className="w-11 h-11 rounded-[10px] flex items-center justify-center text-xs font-bold"
                        style={{ background: 'rgba(0,212,255,0.15)', color: '#00d4ff' }}>▼</button>
                    </div>
                    <span className="text-2xl font-bold" style={{ color: '#f8fafc' }}>:</span>
                    <div className="flex flex-col items-center gap-1">
                      <button onClick={() => setReminderMinute(m => (m + 15) % 60)} aria-label="Increase minute"
                        className="w-11 h-11 rounded-[10px] flex items-center justify-center text-xs font-bold"
                        style={{ background: 'rgba(0,212,255,0.15)', color: '#00d4ff' }}>▲</button>
                      <div className="w-14 h-11 rounded-[10px] flex items-center justify-center text-xl font-bold tabular-nums"
                        style={{ background: 'rgba(255,255,255,0.06)', border: '0.75px solid rgba(255,255,255,0.1)', color: '#f8fafc' }}>
                        {String(reminderMinute).padStart(2,'0')}
                      </div>
                      <button onClick={() => setReminderMinute(m => (m + 45) % 60)} aria-label="Decrease minute"
                        className="w-11 h-11 rounded-[10px] flex items-center justify-center text-xs font-bold"
                        style={{ background: 'rgba(0,212,255,0.15)', color: '#00d4ff' }}>▼</button>
                    </div>
                    <button
                      className="flex-1 py-3 rounded-[12px] text-sm font-bold"
                      style={{ background: 'linear-gradient(135deg, #00d4ff, #0099bb)', color: '#0b2530', boxShadow: '0 4px 16px rgba(0,212,255,0.3)' }}
                      onClick={handleSaveReminderTime}
                    >Save</button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Spec Checklist */}
            <button
              className="w-full flex items-center gap-3 px-4 py-3.5 text-left"
              style={{ background: 'rgba(15,22,41,0.95)', borderTop: '0.75px solid rgba(255,255,255,0.06)' }}
              onClick={() => navigate('/spec-checklist')}
              aria-label="Spec Checklist"
            >
              <BookOpen size={18} color="#a8b8cc" />
              <span className="flex-1 text-[14px] font-medium" style={{ color: '#f8fafc' }}>Spec Checklist</span>
              <ChevronRight size={18} color="#a8b8cc" />
            </button>
            {/* Privacy */}
            <button
              className="w-full flex items-center gap-3 px-4 py-3.5 text-left"
              style={{ background: 'rgba(15,22,41,0.95)', borderTop: '0.75px solid rgba(255,255,255,0.06)' }}
              onClick={() => navigate('/privacy')}
              aria-label="Privacy Policy"
            >
              <Shield size={18} color="#a8b8cc" />
              <span className="flex-1 text-[14px] font-medium" style={{ color: '#f8fafc' }}>Privacy Policy</span>
              <ChevronRight size={18} color="#a8b8cc" />
            </button>
            {/* Terms */}
            <button
              className="w-full flex items-center gap-3 px-4 py-3.5 text-left"
              style={{ background: 'rgba(15,22,41,0.95)', borderTop: '0.75px solid rgba(255,255,255,0.06)' }}
              onClick={() => navigate('/terms')}
              aria-label="Terms of Service"
            >
              <FileText size={18} color="#a8b8cc" />
              <span className="flex-1 text-[14px] font-medium" style={{ color: '#f8fafc' }}>Terms of Service</span>
              <ChevronRight size={18} color="#a8b8cc" />
            </button>
            {/* Version */}
            <div
              className="flex items-center gap-3 px-4 py-3.5"
              style={{ background: 'rgba(15,22,41,0.95)', borderTop: '0.75px solid rgba(255,255,255,0.06)' }}
            >
              <Info size={18} color="#a8b8cc" />
              <div className="flex-1">
                <div className="text-[14px] font-medium" style={{ color: '#f8fafc' }}>NeuroPhysics v1.0</div>
                <div className="text-[12px]" style={{ color: '#a8b8cc' }}>GCSE Physics for neurodivergent learners</div>
              </div>
            </div>
          </div>
        </section>

        {/* Account */}
        <section className="flex flex-col gap-3">
          <SectionHeader icon={UserCircle} label="Account" />
          <div className="rounded-[16px] overflow-hidden" style={{ border: '0.75px solid rgba(255,255,255,0.08)' }}>
            <div className="flex items-center gap-3 px-4 py-3" style={{ background: 'rgba(15,22,41,0.95)', borderBottom: '0.75px solid rgba(255,255,255,0.06)' }}>
              <div className="w-2 h-2 rounded-full" style={{ background: user?.isGuest ? '#f59e0b' : '#00bc7d' }} />
              <div className="text-xs" style={{ color: '#a8b8cc' }}>
                {user?.isGuest
                  ? <span>Browsing as <strong style={{ color: '#f8fafc' }}>Guest</strong> — progress saved locally</span>
                  : <>Signed in as <strong style={{ color: '#f8fafc' }}>{user?.email}</strong></>}
              </div>
            </div>
            <button
              className="w-full flex items-center gap-3 px-4 py-3.5 text-left"
              style={{ background: 'rgba(15,22,41,0.95)', opacity: signingOut ? 0.6 : 1 }}
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
              ) : <LogOut size={18} color="#a8b8cc" />}
              <div className="flex-1">
                <div className="text-[14px] font-medium" style={{ color: '#f8fafc' }}>
                  {signingOut ? 'Signing out…' : 'Sign Out'}
                </div>
                <div className="text-[12px]" style={{ color: '#a8b8cc' }}>Your progress is saved locally</div>
              </div>
            </button>
          </div>
        </section>

        {/* Danger zone */}
        {!user?.isGuest && (
          <section className="flex flex-col gap-3">
            <SectionHeader icon={Trash2} label="Data" />
            <div className="rounded-[16px] overflow-hidden" style={{ border: '0.75px solid rgba(239,68,68,0.25)' }}>
              {!showDeleteConfirm ? (
                <button
                  className="w-full flex items-center gap-3 px-4 py-3.5 text-left"
                  style={{ background: 'rgba(15,22,41,0.95)' }}
                  onClick={() => setShowDeleteConfirm(true)}
                  aria-label="Delete account"
                >
                  <Trash2 size={18} color="#ef4444" />
                  <div className="flex-1">
                    <div className="text-[14px] font-medium" style={{ color: '#ef4444' }}>Delete Account</div>
                    <div className="text-[12px]" style={{ color: '#a8b8cc' }}>Permanently deletes your account and all data</div>
                  </div>
                  <ChevronRight size={18} color="#ef444480" />
                </button>
              ) : (
                <div className="px-4 py-4" style={{ background: 'rgba(239,68,68,0.07)' }}>
                  <p className="text-sm font-semibold mb-1" style={{ color: '#ef4444' }}>Delete your account?</p>
                  <p className="text-xs mb-3" style={{ color: '#a8b8cc' }}>This permanently deletes your account, progress and preferences. Cannot be undone.</p>
                  <div className="flex gap-2">
                    <button
                      className="flex-1 py-2.5 rounded-[10px] text-xs font-bold"
                      style={{ background: isDeleting ? 'rgba(239,68,68,0.5)' : '#ef4444', color: '#fff' }}
                      onClick={handleDeleteData}
                      disabled={isDeleting}
                      aria-label="Confirm delete"
                    >{isDeleting ? 'Deleting…' : 'Yes, delete everything'}</button>
                    <button
                      className="flex-1 py-2.5 rounded-[10px] text-xs font-semibold"
                      style={{ background: 'rgba(255,255,255,0.07)', color: '#a8b8cc', border: '0.75px solid rgba(255,255,255,0.08)' }}
                      onClick={() => setShowDeleteConfirm(false)}
                      disabled={isDeleting}
                      aria-label="Cancel"
                    >Cancel</button>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* V1 fallback link */}
        <button
          onClick={() => { localStorage.removeItem('np_ui_v2'); window.location.reload() }}
          className="text-[11px] self-center py-2"
          style={{ color: '#3a4a5a' }}
          aria-label="Switch back to classic Settings"
        >Use classic Settings</button>
      </div>

      {/* Toast */}
      <AnimatePresence>
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
          >{toast.msg}</motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function SectionHeader({ icon: Icon, label }) {
  return (
    <div className="flex items-center gap-2 px-1">
      <Icon size={14} strokeWidth={2.25} color="#a8b8cc" />
      <span className="text-[13px] font-semibold" style={{ color: '#a8b8cc' }}>{label}</span>
    </div>
  )
}
