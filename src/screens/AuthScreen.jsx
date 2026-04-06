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
    <svg width="20" height="20" viewBox="0 0 170 170" fill="currentColor">
      <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.2-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.93.21-9.84-1.96-14.75-6.52-3.13-2.73-7.04-7.41-11.73-14.04-5.03-7.08-9.17-15.29-12.41-24.65-3.47-10.11-5.21-19.9-5.21-29.38 0-10.86 2.35-20.22 7.05-28.07 3.69-6.3 8.61-11.27 14.75-14.92s12.79-5.51 19.95-5.63c3.91 0 9.05 1.21 15.43 3.59 6.36 2.39 10.45 3.6 12.24 3.6 1.34 0 5.88-1.42 13.57-4.24 7.28-2.62 13.42-3.7 18.45-3.28 13.63 1.1 23.87 6.47 30.68 16.15-12.19 7.39-18.22 17.73-18.1 31 .11 10.34 3.86 18.94 11.23 25.77 3.34 3.17 7.07 5.62 11.22 7.36-.9 2.61-1.85 5.11-2.86 7.51zm-30.26-123c0 8.1-2.96 15.67-8.86 22.67-7.12 8.32-15.73 13.13-25.07 12.38a25.4 25.4 0 0 1-.19-3.07c0-7.78 3.39-16.1 9.4-22.91 3-3.45 6.82-6.31 11.45-8.6 4.62-2.25 8.99-3.5 13.1-3.71.12 1.02.17 2.04.17 3.04z"/>
    </svg>
  )
}

// ─── Shared input ─────────────────────────────────────────────────────────────
function Input({ label, type = 'text', value, onChange, placeholder, error, autoComplete, rightSlot }) {
  return (
    <div>
      {label && (
        <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: '#a8b8cc' }}>
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
          style={{ color: '#a8b8cc', background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
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
function OAuthButton({ icon, label, onClick, loading, dark = false, style: extraStyle = {} }) {
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
        ...extraStyle,
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
        style={{ color: '#a8b8cc', background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
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
function Landing({ onEmail, onSignIn }) {
  const { signInWithOAuth } = useAuth()
  const [oauthLoading, setOauthLoading] = useState(null)
  const [oauthError, setOauthError] = useState('')

  const handleOAuth = async (provider) => {
    setOauthLoading(provider)
    setOauthError('')
    const { error } = await signInWithOAuth(provider)
    if (error) {
      setOauthLoading(null)
      setOauthError(error.message || 'Sign in failed. Please try again.')
    }
  }

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
          <p className="text-sm leading-relaxed" style={{ color: '#a8b8cc' }}>
            GCSE Physics · Calm, focused, and clear.
          </p>
        </motion.div>
      </div>

      {/* Auth options */}
      <motion.div
        className="px-6 pb-10 flex flex-col gap-3 shrink-0"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.45 }}
      >
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

        <Divider label="Or" />

        {/* Email */}
        <OAuthButton
          icon={<Mail size={18} color="#fff" />}
          label="Continue with Email"
          onClick={onEmail}
          style={{ background: 'linear-gradient(135deg, #4f6ef7, #6366f1)', color: '#fff', border: 'none', boxShadow: '0 8px 24px rgba(99,102,241,0.35)' }}
        />

        {oauthError && (
          <motion.div className="flex items-center gap-2 px-3 py-2.5 rounded-[12px]" style={{ background: 'rgba(239,68,68,0.1)', border: '0.75px solid rgba(239,68,68,0.4)' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <AlertCircle size={14} color="#ef4444" />
            <span className="text-xs" style={{ color: '#ef4444' }}>{oauthError}</span>
          </motion.div>
        )}

        {/* Sign in link */}
        <p className="text-center text-sm pt-1" style={{ color: '#a8b8cc' }}>
          Already have an account?{' '}
          <button
            onClick={onSignIn}
            style={{ color: '#6366f1', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 'inherit' }}
          >
            Sign In
          </button>
        </p>

        <p className="text-center text-xs" style={{ color: '#4a5a72' }}>
          By continuing you agree to our{' '}
          <a href="#/terms" className="underline" style={{ color: '#6366f1' }}>Terms</a>
          {' '}and{' '}
          <a href="#/privacy" className="underline" style={{ color: '#6366f1' }}>Privacy Policy</a>
        </p>
      </motion.div>
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
          <p className="text-sm leading-relaxed" style={{ color: '#a8b8cc' }}>
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
          <p className="text-sm" style={{ color: '#a8b8cc' }}>Start your GCSE Physics journey.</p>
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
            <span className="text-sm leading-snug" style={{ color: ageChecked ? '#f8fafc' : '#a8b8cc' }}>
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
          <p className="text-sm" style={{ color: '#a8b8cc' }}>Sign in to continue your streak.</p>
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
          <p className="text-sm" style={{ color: '#a8b8cc' }}>We'll send a reset link to your email.</p>
        </div>

        {sent ? (
          <motion.div className="flex flex-col items-center gap-4 pt-8 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <CheckCircle2 size={48} color="#00bc7d" />
            <p className="text-sm leading-relaxed" style={{ color: '#a8b8cc' }}>
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
// views: 'landing' | 'signup-email' | 'signin' | 'forgot'
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
            <Landing onEmail={() => setView('signup-email')} onSignIn={() => setView('signin')} />
          </motion.div>
        )}
        {view === 'signup-email' && (
          <motion.div key="signup-email" className="flex flex-col h-full">
            <SignUpEmail onBack={() => setView('landing')} onDone={onDone} />
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
