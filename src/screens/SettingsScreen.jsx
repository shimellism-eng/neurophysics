import { motion } from 'motion/react'
import { useState, useEffect } from 'react'
import { Sun, Bell, Accessibility, Info, ChevronRight, Atom, Trash2, Shield, FileText, Pencil, Check, X, LogOut, Type } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { secureGet, secureSet, secureRemove } from '../utils/secureStorage'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'

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
      el.textContent = [
        '* {',
        '  transition-duration: 0.01ms !important;',
        '  transition-delay: 0ms !important;',
        '  animation-duration: 0.01ms !important;',
        '  animation-iteration-count: 1 !important;',
        '}',
      ].join('\n')
      document.head.appendChild(el)
    }
  } else {
    el?.remove()
  }
}

function applyHighContrast(on) {
  document.documentElement.style.filter = on ? 'contrast(1.2) brightness(1.06)' : ''
}

function applyFontSize(size) {
  // size: 'normal' | 'large'
  document.documentElement.style.fontSize = size === 'large' ? '18px' : ''
}

async function requestNotifications() {
  if (!('Notification' in window)) return 'unsupported'
  if (Notification.permission === 'granted') return 'granted'
  const result = await Notification.requestPermission()
  return result
}

function fireTestNotification() {
  if (Notification.permission === 'granted') {
    new Notification('NeuroPhysics 🔬', {
      body: "Don't forget to study today  -  keep your streak going! 🔥",
      icon: '/vite.svg',
    })
  }
}

// ─── Toggle component ─────────────────────────────────────────────────────────
function Toggle({ on, onToggle, disabled = false }) {
  return (
    <motion.button
      onClick={disabled ? undefined : onToggle}
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

  const handleSignOut = async () => {
    localStorage.removeItem('neurophysics_prefs')
    localStorage.removeItem('neurophysics_onboarded')
    localStorage.removeItem('neurophysics_profile')
    localStorage.removeItem('np_progress')
    localStorage.removeItem('np_stats')
    await secureRemove('mamo_api_key')
    await signOut()
    navigate('/auth', { replace: true })
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

  // ── Daily Reminders
  const toggleReminders = async () => {
    const next = !prefs.reminders
    if (next) {
      const result = await requestNotifications()
      if (result === 'granted') {
        setPref('reminders', true)
        fireTestNotification()
        showToast('Reminders on  -  test notification sent ✓', '#10b981')
      } else if (result === 'denied') {
        showToast('Notifications blocked  -  enable in browser settings', '#ef4444')
      } else if (result === 'unsupported') {
        showToast('Notifications not supported in this browser', '#f59e0b')
      }
    } else {
      setPref('reminders', false)
      showToast('Daily reminders off', '#a8b8cc')
    }
  }

  const handleSaveKey = () => {
    secureSet('mamo_api_key', apiKey)
    setSaved(true)
    showToast('API key saved ✓', '#10b981')
    setTimeout(() => setSaved(false), 2000)
  }

  const handleDeleteData = async () => {
    // Delete Supabase account server-side
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.access_token) {
        const apiBase = import.meta.env.VITE_API_BASE || 'https://neurophysics.vercel.app'
        const res = await fetch(`${apiBase}/api/delete-account`, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${session.access_token}` },
        })
        if (!res.ok) {
          const err = await res.json().catch(() => ({}))
          showToast(`Deletion failed: ${err.error || 'Unknown error'}`, '#ef4444')
          return
        }
      }
    } catch (e) {
      showToast(`Deletion failed: ${e.message}`, '#ef4444')
      return
    }
    // Clear local data
    localStorage.removeItem('neurophysics_prefs')
    localStorage.removeItem('neurophysics_onboarded')
    localStorage.removeItem('neurophysics_profile')
    localStorage.removeItem('np_progress')
    localStorage.removeItem('np_stats')
    await secureRemove('mamo_api_key')
    await signOut()
    showToast('Account and all data deleted', '#10b981')
    setTimeout(() => navigate('/auth', { replace: true }), 1500)
  }

  const sections = [
    {
      title: 'Accessibility',
      items: [
        {
          icon: Accessibility,
          label: 'Reduce Motion',
          hint: 'Fewer animations across the app',
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
      ],
    },
    {
      title: 'Notifications',
      items: [
        {
          icon: Bell,
          label: 'Daily Reminders',
          hint: 'Study streak notifications',
          on: !!prefs.reminders,
          onToggle: toggleReminders,
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
            <Atom size={16} color="#6366f1" />
            <div className="text-sm font-bold" style={{ color: '#f8fafc' }}>Mamo AI Key</div>
          </div>
          <p className="text-xs mb-3" style={{ color: '#a8b8cc' }}>
            Your Anthropic API key powers Mamo. Stored locally on your device only.
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
                    borderBottom: ii < section.items.length - 1 ? '0.75px solid #1d293d' : 'none',
                  }}
                  onClick={item.onPress || undefined}
                  aria-label={item.label}
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
                    ? <ChevronRight size={14} color="#a8b8cc" />
                    : item.onToggle ? <Toggle on={!!item.on} onToggle={item.onToggle} />
                    : null
                  }
                </button>
              ))}
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
              style={{ background: 'rgba(18,26,47,0.9)' }}
              onClick={handleSignOut}
              aria-label="Sign out"
            >
              <LogOut size={18} color="#a8b8cc" />
              <div className="flex-1">
                <div className="text-sm font-medium" style={{ color: '#f8fafc' }}>Sign Out</div>
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
