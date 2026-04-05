/**
 * AuthScreen — entry point shown to unauthenticated users.
 * Landing → Sign Up (Google / Apple / Email) or Sign In
 */
import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import { Atom, Eye, EyeOff, AlertCircle, ArrowLeft, CheckCircle2, Mail } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

// ─── Brand SVGs ───────────────────────────────────────────────────────────────
function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 48 48" fill="none">
      <path d="M43.6 20.5H42V20H24v8h11.3C33.65 32.65 29.27 36 24 36c-6.63 0-12-5.37-12-12s5.37-12 12-12c3.06 0 5.84 1.15 7.95 3.05L37.9 9.1C34.45 5.9 29.47 4 24 4 12.95 4 4 12.95 4 24s8.95 20 20 20c11.05 0 20-8.95 20-20 0-1.34-.14-2.65-.4-3.5z" fill="#FFC107"/>
      <path d="M6.3 14.69l6.97 5.11C14.99 16.14 19.16 13 24 13c3.06 0 5.84 1.15 7.95 3.05L37.9 9.1C34.45 5.9 29.47 4 24 4 16.31 4 9.66 8.34 6.3 14.69z" fill="#FF3D00"/>
      <path d="M24 44c5.36 0 10.26-1.82 14.04-4.8l-6.48-5.49C29.55 35.52 26.89 36 24 36c-5.25 0-9.62-3.33-11.29-7.96l-6.9 5.32C9.52 39.57 16.22 44 24 44z" fill="#4CAF50"/>
      <path d="M43.6 20.5H42V20H24v8h11.3a12.06 12.06 0 0 1-4.1 5.71l6.48 5.49C37.34 39.25 44 34 44 24c0-1.34-.14-2.65-.4-3.5z" fill="#1976D2"/>
    </svg>
  )
}

function AppleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 814 1000" fill="currentColor">
      <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4C46 376.8 0 248.4 0 124.9 0 56.1 24.1 4 72.4 4c48.2 0 74.2 29.8 99.8 29.8 24.5 0 55.6-31 99.3-31 38.6 0 72.6 14.4 100.5 42.8 27.9 28.3 43.3 63.9 43.3 63.9s-30.6-11.7-62.9-11.7c-61.9 0-118 53.5-118 127.6 0 73.5 53.4 121.3 122.5 121.3 66.3 0 105-45.9 105-45.9s-2.3 12.6-2.3 39.6c0 19.6 2.3 58.2 20.1 95.7z"/>
    </svg>
  )
}

// ─── Shared input ─────────────────────────────────────────────────────────────
function Input({ label, type = 'text', value, onChange, placeholder, error, autoComplete, rightSlot }) {
  return (
    <div>
      {label && (
        <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: '#90a1b9' }}>
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className="w-full px-4 py-3.5 rounded-[14px] text-sm outline-none"
          style={{
            background: 'rgba(18,26,47,0.9)',
            border: error ? '1px solid rgba(239,68,68,0.6)' : '0.75px solid #2d3e55',
            color: '#f8fafc',
            transition: 'border-color 0.2s',
            paddingRight: rightSlot ? 48 : undefined,
          }}
        />
        {rightSlot && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">{rightSlot}</div>
        )}
      </div>
      {error && (
        <motion.p
          className="flex items-center gap-1.5 text-xs mt-1.5"
          style={{ color: '#ef4444' }}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <AlertCircle size={11} />
          {error}
        </motion.p>
      )}
    </div>
  )
}

// ─── Password input ───────────────────────────────────────────────────────────
function PasswordInput({ label, value, onChange, error, autoComplete, placeholder }) {
  const [show, setShow] = useState(false)
  return (
    <Input
      label={label}
      type={show ? 'text' : 'password'}
      value={value}
      onChange={onChange}
      placeholder={placeholder || '••••••••'}
      error={error}
      autoComplete={autoComplete}
      rightSlot={
        <button
          type="button"
          onClick={() => setShow(v => !v)}
          aria-label={show ? 'Hide password' : 'Show password'}
          style={{ color: '#90a1b9', background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
        >
          {show ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      }
    />
  )
}

// ─── Primary button ───────────────────────────────────────────────────────────
function PrimaryButton({ children, onClick, loading, disabled, style = {} }) {
  return (
    <motion.button
      className="w-full py-4 rounded-[16px] text-sm font-bold flex items-center justify-center gap-2"
      style={{
        background: disabled || loading ? 'rgba(99,102,241,0.35)' : 'linear-gradient(135deg, #4f6ef7, #6366f1)',
        color: '#fff',
        boxShadow: disabled || loading ? 'none' : '0 8px 28px rgba(99,102,241,0.4)',
        transition: 'all 0.2s',
        cursor: disabled || loading ? 'not-allowed' : 'pointer',
        ...style,
      }}
      onClick={!disabled && !loading ? onClick : undefined}
      whileTap={!disabled && !loading ? { scale: 0.97 } : {}}
    >
      {loading ? (
        <motion.div
          className="w-5 h-5 rounded-full border-2"
          style={{ borderColor: 'rgba(255,255,255,0.3)', borderTopColor: '#fff' }}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
        />
      ) : children}
    </motion.button>
  )
}

// ─── OAuth button ─────────────────────────────────────────────────────────────
function OAuthButton({ icon, label, onClick, loading, dark = false }) {
  return (
    <motion.button
      className="w-full py-3.5 rounded-[16px] text-sm font-semibold flex items-center justify-center gap-3"
      style={{
        background: dark ? '#000' : '#fff',
        color: dark ? '#fff' : '#1a1a1a',
        border: dark ? '1px solid rgba(255,255,255,0.15)' : '1px solid rgba(0,0,0,0.12)',
        boxShadow: dark ? 'none' : '0 1px 3px rgba(0,0,0,0.12)',
        cursor: loading ? 'not-allowed' : 'pointer',
        opacity: loading ? 0.6 : 1,
        transition: 'opacity 0.15s',
      }}
      onClick={!loading ? onClick : undefined}
      whileTap={!loading ? { scale: 0.97 } : {}}
      aria-label={label}
    >
      {loading ? (
        <motion.div
          className="w-4 h-4 rounded-full border-2"
          style={{ borderColor: dark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.2)', borderTopColor: dark ? '#fff' : '#333' }}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
        />
      ) : icon}
      {!loading && label}
    </motion.button>
  )
}

// ─── Divider ──────────────────────────────────────────────────────────────────
function Divider({ label = 'or' }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-px" style={{ background: '#1d293d' }} />
      <span className="text-xs" style={{ color: '#4a5a72' }}>{label}</span>
      <div className="flex-1 h-px" style={{ background: '#1d293d' }} />
    </div>
  )
}

// ─── Back header ─────────────────────────────────────────────────────────────
function BackHeader({ onBack, title }) {
  return (
    <div className="pt-10 pb-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 mb-6"
        style={{ color: '#90a1b9', background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
        aria-label="Go back"
      >
        <ArrowLeft size={18} />
        <span className="text-sm">Back</span>
      </button>
      {title && (
        <h1 className="text-3xl font-extrabold mb-1" style={{ color: '#f8fafc', letterSpacing: '-0.02em' }}>
          {title}
        </h1>
      )}
    </div>
  )
}

// ─── Landing ──────────────────────────────────────────────────────────────────
function Landing({ onSignUp, onSignIn }) {
  return (
    <motion.div
      className="flex flex-col h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      {/* Hero */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 gap-6">
        <motion.div
          className="relative flex items-center justify-center"
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="absolute rounded-full"
            style={{ width: 130, height: 130, border: '1.5px solid rgba(99,102,241,0.25)' }}
            animate={{ scale: [1, 1.18, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          />
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center"
            style={{
              background: 'radial-gradient(circle at 40% 35%, #1e3a6e, #0b1121)',
              boxShadow: '0 0 60px rgba(99,102,241,0.35)',
              border: '1.5px solid rgba(99,102,241,0.4)',
            }}
          >
            <Atom size={52} color="#93c5fd" strokeWidth={1.5} />
          </div>
        </motion.div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6 }}
        >
          <h1 className="text-4xl font-extrabold tracking-tight mb-2" style={{ color: '#f8fafc', letterSpacing: '-0.02em' }}>
            NeuroPhysics
          </h1>
          <p className="text-sm leading-relaxed" style={{ color: '#90a1b9' }}>
            GCSE Physics · Calm, focused, and clear.
          </p>
        </motion.div>
      </div>

      {/* CTA */}
      <motion.div
        className="px-6 pb-12 flex flex-col gap-3 shrink-0"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.45 }}
      >
        <PrimaryButton onClick={onSignUp}>Sign Up</PrimaryButton>

        <button
          className="w-full py-4 rounded-[16px] text-sm font-semibold"
          style={{ background: 'rgba(18,26,47,0.9)', border: '0.75px solid #2d3e55', color: '#f8fafc' }}
          onClick={onSignIn}
        >
          Sign In
        </button>

        <p className="text-center text-xs mt-1" style={{ color: '#4a5a72' }}>
          By continuing you agree to our{' '}
          <a href="#/terms" className="underline" style={{ color: '#6366f1' }}>Terms</a>
          {' '}and{' '}
          <a href="#/privacy" className="underline" style={{ color: '#6366f1' }}>Privacy Policy</a>
        </p>
      </motion.div>
    </motion.div>
  )
}

// ─── Sign Up Options ──────────────────────────────────────────────────────────
function SignUpOptions({ onBack, onEmail, onDone }) {
  const { signInWithOAuth } = useAuth()
  const [oauthLoading, setOauthLoading] = useState(null) // 'google' | 'apple' | null

  const handleOAuth = async (provider) => {
    setOauthLoading(provider)
    const { error } = await signInWithOAuth(provider)
    if (error) {
      setOauthLoading(null)
      // error shown via toast-like inline message handled by Supabase redirect
    }
    // on success, Supabase redirects the page — no further action needed
  }

  return (
    <motion.div
      className="flex flex-col h-full"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex-1 overflow-y-auto px-6">
        <BackHeader onBack={onBack} />

        <div className="mb-6">
          <h1 className="text-3xl font-extrabold mb-1" style={{ color: '#f8fafc', letterSpacing: '-0.02em' }}>
            Create account
          </h1>
          <p className="text-sm" style={{ color: '#90a1b9' }}>
            Choose how you'd like to sign up.
          </p>
        </div>

        <div className="flex flex-col gap-3 pb-6">
          {/* Google */}
          <OAuthButton
            icon={<GoogleIcon />}
            label="Continue with Google"
            onClick={() => handleOAuth('google')}
            loading={oauthLoading === 'google'}
          />

          {/* Apple */}
          <OAuthButton
            icon={<AppleIcon />}
            label="Continue with Apple"
            onClick={() => handleOAuth('apple')}
            loading={oauthLoading === 'apple'}
            dark
          />

          <Divider />

          {/* Email */}
          <button
            className="w-full py-3.5 rounded-[16px] text-sm font-semibold flex items-center justify-center gap-3"
            style={{
              background: 'rgba(18,26,47,0.9)',
              border: '0.75px solid rgba(99,102,241,0.35)',
              color: '#a5b4fc',
            }}
            onClick={onEmail}
            aria-label="Sign up with email"
          >
            <Mail size={18} color="#6366f1" />
            Continue with Email
          </button>
        </div>

        <p className="text-center text-xs pb-6" style={{ color: '#4a5a72' }}>
          Already have an account?{' '}
          <button
            onClick={onBack}
            style={{ color: '#6366f1', background: 'none', border: 'none', cursor: 'pointer', fontSize: 'inherit' }}
          >
            Sign In
          </button>
        </p>
      </div>
    </motion.div>
  )
}

// ─── Email Sign Up ────────────────────────────────────────────────────────────
function SignUpEmail({ onBack, onDone }) {
  const { signUp } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [ageChecked, setAgeChecked] = useState(false)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState('')
  const [emailSent, setEmailSent] = useState(false)

  const validate = () => {
    const e = {}
    if (!name.trim()) e.name = 'Name is required'
    if (!email.trim()) e.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Enter a valid email'
    if (!password) e.password = 'Password is required'
    else if (password.length < 8) e.password = 'At least 8 characters'
    if (password !== confirm) e.confirm = 'Passwords do not match'
    if (!ageChecked) e.age = 'Please confirm you are 13 or older'
    return e
  }

  const handleSignUp = async () => {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    setLoading(true)
    setServerError('')
    const { data, error } = await signUp({ email: email.trim(), password, name: name.trim() })
    setLoading(false)
    if (error) {
      setServerError(error.message || 'Sign up failed. Please try again.')
    } else if (data?.user && !data.session) {
      setEmailSent(true)
    } else {
      localStorage.setItem('neurophysics_profile', JSON.stringify({ name: name.trim(), avatar: '🧠' }))
      onDone()
    }
  }

  if (emailSent) {
    return (
      <motion.div
        className="flex flex-col h-full items-center justify-center px-8 text-center gap-5"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(0,188,125,0.15)', border: '1px solid rgba(0,188,125,0.4)' }}
        >
          <CheckCircle2 size={40} color="#00bc7d" />
        </div>
        <div>
          <h2 className="text-2xl font-extrabold mb-2" style={{ color: '#f8fafc' }}>Check your email</h2>
          <p className="text-sm leading-relaxed" style={{ color: '#90a1b9' }}>
            We sent a confirmation link to <strong style={{ color: '#f8fafc' }}>{email}</strong>.
            Open it to activate your account, then sign in.
          </p>
        </div>
        <button onClick={onBack} className="text-sm font-semibold" style={{ color: '#6366f1', background: 'none', border: 'none', cursor: 'pointer' }}>
          Back to Sign In
        </button>
      </motion.div>
    )
  }

  return (
    <motion.div
      className="flex flex-col h-full"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex-1 overflow-y-auto px-6">
        <BackHeader onBack={onBack} />
        <div className="mb-5">
          <h1 className="text-3xl font-extrabold mb-1" style={{ color: '#f8fafc', letterSpacing: '-0.02em' }}>Sign up with email</h1>
          <p className="text-sm" style={{ color: '#90a1b9' }}>Start your GCSE Physics journey.</p>
        </div>

        <div className="flex flex-col gap-4 pb-6">
          <Input label="First name" value={name} onChange={e => { setName(e.target.value); setErrors(v => ({ ...v, name: '' })) }} placeholder="e.g. Alex" error={errors.name} autoComplete="given-name" />
          <Input label="Email" type="email" value={email} onChange={e => { setEmail(e.target.value); setErrors(v => ({ ...v, email: '' })) }} placeholder="you@example.com" error={errors.email} autoComplete="email" />
          <PasswordInput label="Password" value={password} onChange={e => { setPassword(e.target.value); setErrors(v => ({ ...v, password: '', confirm: '' })) }} error={errors.password} autoComplete="new-password" placeholder="Min 8 characters" />
          <PasswordInput label="Confirm password" value={confirm} onChange={e => { setConfirm(e.target.value); setErrors(v => ({ ...v, confirm: '' })) }} error={errors.confirm} autoComplete="new-password" />

          {/* Age gate */}
          <button
            className="flex items-start gap-3 px-4 py-3 rounded-[14px] text-left"
            style={{
              background: ageChecked ? 'rgba(99,102,241,0.1)' : 'rgba(18,26,47,0.9)',
              border: errors.age && !ageChecked ? '1px solid rgba(239,68,68,0.6)' : ageChecked ? '1px solid rgba(99,102,241,0.5)' : '0.75px solid #1d293d',
              transition: 'all 0.2s',
            }}
            onClick={() => { setAgeChecked(v => !v); setErrors(v => ({ ...v, age: '' })) }}
            role="checkbox" aria-checked={ageChecked} aria-label="I confirm I am 13 years or older"
          >
            <div className="w-5 h-5 rounded-[6px] flex items-center justify-center shrink-0 mt-0.5" style={{ background: ageChecked ? '#6366f1' : 'transparent', border: ageChecked ? 'none' : '1.5px solid #4a5a72', transition: 'all 0.15s' }}>
              {ageChecked && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
            </div>
            <span className="text-sm leading-snug" style={{ color: ageChecked ? '#f8fafc' : '#90a1b9' }}>
              I confirm I am <strong style={{ color: '#f8fafc' }}>13 years or older</strong>
            </span>
          </button>
          {errors.age && <p className="text-xs" style={{ color: '#ef4444' }}>{errors.age}</p>}

          {serverError && (
            <motion.div className="flex items-center gap-2 px-3 py-2.5 rounded-[12px]" style={{ background: 'rgba(239,68,68,0.1)', border: '0.75px solid rgba(239,68,68,0.4)' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <AlertCircle size={14} color="#ef4444" />
              <span className="text-xs" style={{ color: '#ef4444' }}>{serverError}</span>
            </motion.div>
          )}
        </div>
      </div>

      <div className="px-6 pt-3 pb-10 shrink-0" style={{ borderTop: '0.75px solid #1d293d' }}>
        <PrimaryButton onClick={handleSignUp} loading={loading}>Create Account</PrimaryButton>
      </div>
    </motion.div>
  )
}

// ─── Sign In ──────────────────────────────────────────────────────────────────
function SignIn({ onBack, onDone, onForgot }) {
  const { signIn, signInWithOAuth } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [oauthLoading, setOauthLoading] = useState(null)
  const [serverError, setServerError] = useState('')

  const validate = () => {
    const e = {}
    if (!email.trim()) e.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Enter a valid email'
    if (!password) e.password = 'Password is required'
    return e
  }

  const handleSignIn = async () => {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    setLoading(true)
    setServerError('')
    const { error } = await signIn({ email: email.trim(), password })
    setLoading(false)
    if (error) setServerError(error.message || 'Sign in failed.')
    else onDone()
  }

  const handleOAuth = async (provider) => {
    setOauthLoading(provider)
    const { error } = await signInWithOAuth(provider)
    if (error) setOauthLoading(null)
  }

  return (
    <motion.div
      className="flex flex-col h-full"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex-1 overflow-y-auto px-6">
        <BackHeader onBack={onBack} />
        <div className="mb-5">
          <h1 className="text-3xl font-extrabold mb-1" style={{ color: '#f8fafc', letterSpacing: '-0.02em' }}>Welcome back</h1>
          <p className="text-sm" style={{ color: '#90a1b9' }}>Sign in to continue your streak.</p>
        </div>

        {/* Social sign-in */}
        <div className="flex flex-col gap-3 mb-5">
          <OAuthButton icon={<GoogleIcon />} label="Continue with Google" onClick={() => handleOAuth('google')} loading={oauthLoading === 'google'} />
          <OAuthButton icon={<AppleIcon />} label="Continue with Apple" onClick={() => handleOAuth('apple')} loading={oauthLoading === 'apple'} dark />
        </div>

        <Divider label="or sign in with email" />

        <div className="flex flex-col gap-4 mt-5 pb-6">
          <Input label="Email" type="email" value={email} onChange={e => { setEmail(e.target.value); setErrors(v => ({ ...v, email: '' })) }} placeholder="you@example.com" error={errors.email} autoComplete="email" />
          <PasswordInput label="Password" value={password} onChange={e => { setPassword(e.target.value); setErrors(v => ({ ...v, password: '' })) }} error={errors.password} autoComplete="current-password" />

          <button className="text-xs text-right" style={{ color: '#6366f1', background: 'none', border: 'none', cursor: 'pointer' }} onClick={() => onForgot(email)}>
            Forgot password?
          </button>

          {serverError && (
            <motion.div className="flex items-center gap-2 px-3 py-2.5 rounded-[12px]" style={{ background: 'rgba(239,68,68,0.1)', border: '0.75px solid rgba(239,68,68,0.4)' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <AlertCircle size={14} color="#ef4444" />
              <span className="text-xs" style={{ color: '#ef4444' }}>{serverError}</span>
            </motion.div>
          )}
        </div>
      </div>

      <div className="px-6 pt-3 pb-10 shrink-0" style={{ borderTop: '0.75px solid #1d293d' }}>
        <PrimaryButton onClick={handleSignIn} loading={loading}>Sign In</PrimaryButton>
      </div>
    </motion.div>
  )
}

// ─── Forgot Password ──────────────────────────────────────────────────────────
function ForgotPassword({ initialEmail, onBack }) {
  const { resetPassword } = useAuth()
  const [email, setEmail] = useState(initialEmail || '')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handle = async () => {
    if (!email.trim()) { setError('Enter your email'); return }
    setLoading(true)
    const { error: err } = await resetPassword(email.trim())
    setLoading(false)
    if (err) { setError(err.message); return }
    setSent(true)
  }

  return (
    <motion.div
      className="flex flex-col h-full"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex-1 overflow-y-auto px-6">
        <BackHeader onBack={onBack} />
        <div className="mb-5">
          <h1 className="text-3xl font-extrabold mb-1" style={{ color: '#f8fafc', letterSpacing: '-0.02em' }}>Reset password</h1>
          <p className="text-sm" style={{ color: '#90a1b9' }}>We'll send a reset link to your email.</p>
        </div>

        {sent ? (
          <motion.div className="flex flex-col items-center gap-4 pt-8 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <CheckCircle2 size={48} color="#00bc7d" />
            <p className="text-sm leading-relaxed" style={{ color: '#90a1b9' }}>
              Reset link sent to <strong style={{ color: '#f8fafc' }}>{email}</strong>. Check your inbox.
            </p>
            <button onClick={onBack} className="text-sm font-semibold" style={{ color: '#6366f1', background: 'none', border: 'none', cursor: 'pointer' }}>
              Back to Sign In
            </button>
          </motion.div>
        ) : (
          <div className="flex flex-col gap-4">
            <Input label="Email" type="email" value={email} onChange={e => { setEmail(e.target.value); setError('') }} placeholder="you@example.com" error={error} autoComplete="email" />
          </div>
        )}
      </div>

      {!sent && (
        <div className="px-6 pt-3 pb-10 shrink-0" style={{ borderTop: '0.75px solid #1d293d' }}>
          <PrimaryButton onClick={handle} loading={loading}>Send Reset Link</PrimaryButton>
        </div>
      )}
    </motion.div>
  )
}

// ─── Main export ──────────────────────────────────────────────────────────────
// views: 'landing' | 'signup-options' | 'signup-email' | 'signin' | 'forgot'
export default function AuthScreen() {
  const [view, setView] = useState('landing')
  const [forgotEmail, setForgotEmail] = useState('')
  const navigate = useNavigate()

  const onDone = () => {
    const onboarded = !!localStorage.getItem('neurophysics_onboarded')
    navigate(onboarded ? '/' : '/onboarding', { replace: true })
  }

  return (
    <div className="flex flex-col h-full" style={{ background: 'radial-gradient(ellipse at 50% 28%, #0d1a35 0%, #0b1121 65%)' }}>
      <AnimatePresence mode="wait">
        {view === 'landing' && (
          <motion.div key="landing" className="flex flex-col h-full">
            <Landing onSignUp={() => setView('signup-options')} onSignIn={() => setView('signin')} />
          </motion.div>
        )}
        {view === 'signup-options' && (
          <motion.div key="signup-options" className="flex flex-col h-full">
            <SignUpOptions onBack={() => setView('landing')} onEmail={() => setView('signup-email')} onDone={onDone} />
          </motion.div>
        )}
        {view === 'signup-email' && (
          <motion.div key="signup-email" className="flex flex-col h-full">
            <SignUpEmail onBack={() => setView('signup-options')} onDone={onDone} />
          </motion.div>
        )}
        {view === 'signin' && (
          <motion.div key="signin" className="flex flex-col h-full">
            <SignIn onBack={() => setView('landing')} onDone={onDone} onForgot={(email) => { setForgotEmail(email); setView('forgot') }} />
          </motion.div>
        )}
        {view === 'forgot' && (
          <motion.div key="forgot" className="flex flex-col h-full">
            <ForgotPassword initialEmail={forgotEmail} onBack={() => setView('signin')} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
