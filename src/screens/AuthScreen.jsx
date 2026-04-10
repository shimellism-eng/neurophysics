/**
 * AuthScreen — Aurora design.
 * Deep purple #07041A base, layered glow mesh, animated SVG atom.
 * SEN-optimised: calm pacing, clear hierarchy, reduce-motion respected.
 */
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff, AlertCircle, ArrowLeft, CheckCircle2, Mail } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

// ─── Reduce motion helper ─────────────────────────────────────────────────────
function useReduceMotion() {
  const sysPref =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const appPref = (() => {
    try {
      return !!JSON.parse(localStorage.getItem('neurophysics_prefs') || '{}').reduceMotion
    } catch {
      return false
    }
  })()
  return sysPref || appPref
}

// ─── Brand SVGs ───────────────────────────────────────────────────────────────
function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="M43.6 20.5H42V20H24v8h11.3C33.65 32.65 29.27 36 24 36c-6.63 0-12-5.37-12-12s5.37-12 12-12c3.06 0 5.84 1.15 7.95 3.05L37.9 9.1C34.45 5.9 29.47 4 24 4 12.95 4 4 12.95 4 24s8.95 20 20 20c11.05 0 20-8.95 20-20 0-1.34-.14-2.65-.4-3.5z" fill="#FFC107"/>
      <path d="M6.3 14.69l6.97 5.11C14.99 16.14 19.16 13 24 13c3.06 0 5.84 1.15 7.95 3.05L37.9 9.1C34.45 5.9 29.47 4 24 4 16.31 4 9.66 8.34 6.3 14.69z" fill="#FF3D00"/>
      <path d="M24 44c5.36 0 10.26-1.82 14.04-4.8l-6.48-5.49C29.55 35.52 26.89 36 24 36c-5.25 0-9.62-3.33-11.29-7.96l-6.9 5.32C9.52 39.57 16.22 44 24 44z" fill="#4CAF50"/>
      <path d="M43.6 20.5H42V20H24v8h11.3a12.06 12.06 0 0 1-4.1 5.71l6.48 5.49C37.34 39.25 44 34 44 24c0-1.34-.14-2.65-.4-3.5z" fill="#1976D2"/>
    </svg>
  )
}

function AppleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 170 170" fill="currentColor" aria-hidden="true">
      <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.2-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.93.21-9.84-1.96-14.75-6.52-3.13-2.73-7.04-7.41-11.73-14.04-5.03-7.08-9.17-15.29-12.41-24.65-3.47-10.11-5.21-19.9-5.21-29.38 0-10.86 2.35-20.22 7.05-28.07 3.69-6.3 8.61-11.27 14.75-14.92s12.79-5.51 19.95-5.63c3.91 0 9.05 1.21 15.43 3.59 6.36 2.39 10.45 3.6 12.24 3.6 1.34 0 5.88-1.42 13.57-4.24 7.28-2.62 13.42-3.7 18.45-3.28 13.63 1.1 23.87 6.47 30.68 16.15-12.19 7.39-18.22 17.73-18.1 31 .11 10.34 3.86 18.94 11.23 25.77 3.34 3.17 7.07 5.62 11.22 7.36-.9 2.61-1.85 5.11-2.86 7.51zm-30.26-123c0 8.1-2.96 15.67-8.86 22.67-7.12 8.32-15.73 13.13-25.07 12.38a25.4 25.4 0 0 1-.19-3.07c0-7.78 3.39-16.1 9.4-22.91 3-3.45 6.82-6.31 11.45-8.6 4.62-2.25 8.99-3.5 13.1-3.71.12 1.02.17 2.04.17 3.04z"/>
    </svg>
  )
}

// ─── Electron dot — travels along its ellipse path via rAF maths ─────────────
// The orbit ring is a separate static <ellipse>. This component only
// renders the moving dot, computing its position each frame using the
// parametric ellipse equation rotated by tiltDeg.
function ElectronDot({ cx, cy, rx, ry, tiltDeg, speed, startAngle, reduceMotion }) {
  const ref = useRef(null)
  const tiltRad = tiltDeg * Math.PI / 180

  // Place dot at its initial position (used before rAF starts + reduce-motion)
  const initPos = (angle) => {
    const lx = rx * Math.cos(angle)
    const ly = ry * Math.sin(angle)
    return {
      x: cx + lx * Math.cos(tiltRad) - ly * Math.sin(tiltRad),
      y: cy + lx * Math.sin(tiltRad) + ly * Math.cos(tiltRad),
    }
  }

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (reduceMotion) {
      const { x, y } = initPos(startAngle)
      el.setAttribute('cx', x)
      el.setAttribute('cy', y)
      return
    }

    let rafId
    let startTime = null

    const tick = (ts) => {
      if (!startTime) startTime = ts
      const elapsed = (ts - startTime) / 1000            // seconds
      const angle = startAngle + elapsed * speed          // radians
      const lx = rx * Math.cos(angle)
      const ly = ry * Math.sin(angle)
      const ex = cx + lx * Math.cos(tiltRad) - ly * Math.sin(tiltRad)
      const ey = cy + lx * Math.sin(tiltRad) + ly * Math.cos(tiltRad)
      el.setAttribute('cx', ex)
      el.setAttribute('cy', ey)
      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [reduceMotion]) // eslint-disable-line

  const { x: ix, y: iy } = initPos(startAngle)
  return <circle ref={ref} cx={ix} cy={iy} r="4" fill="#c4b5fd" opacity="0.9" />
}

// ─── Custom SVG Atom ──────────────────────────────────────────────────────────
// Three fixed orbit ellipses + three electrons that travel along them.
// Orbits are STATIC — only the electron dots move (correct physics).
function AtomSVG({ size = 120, reduceMotion = false }) {
  const cx = 60, cy = 60
  const rx = 50, ry = 18

  // tiltDeg: visual angle of the orbital plane
  // speed: radians/s  (2π/duration)
  // startAngle: initial phase offset so electrons aren't bunched together
  const orbits = [
    { tiltDeg:   0, speed: 2 * Math.PI / 14, startAngle: 0 },
    { tiltDeg:  60, speed: 2 * Math.PI / 10, startAngle: (2 * Math.PI) / 3 },
    { tiltDeg: -60, speed: 2 * Math.PI /  8, startAngle: (4 * Math.PI) / 3 },
  ]

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      style={{ overflow: 'visible' }}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="authNucGrad" cx="38%" cy="35%">
          <stop offset="0%"   stopColor="#c4b5fd" />
          <stop offset="100%" stopColor="#4338ca" />
        </radialGradient>
        <radialGradient id="authNucGlow" cx="50%" cy="50%">
          <stop offset="0%"   stopColor="#6366f1" stopOpacity="0.5" />
          <stop offset="55%"  stopColor="#6366f1" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Static orbit rings — tilted via SVG transform, never animated */}
      {orbits.map((o, i) => (
        <ellipse
          key={i}
          cx={cx} cy={cy} rx={rx} ry={ry}
          fill="none" stroke="#a78bfa" strokeWidth="1.1" opacity="0.52"
          transform={`rotate(${o.tiltDeg} ${cx} ${cy})`}
        />
      ))}

      {/* Electron dots — each travels along its own orbit path */}
      {orbits.map((o, i) => (
        <ElectronDot
          key={i}
          cx={cx} cy={cy} rx={rx} ry={ry}
          tiltDeg={o.tiltDeg}
          speed={o.speed}
          startAngle={o.startAngle}
          reduceMotion={reduceMotion}
        />
      ))}

      {/* Nucleus glow */}
      <circle cx={cx} cy={cy} r="26" fill="url(#authNucGlow)" />
      {/* Nucleus body */}
      <circle cx={cx} cy={cy} r="11" fill="url(#authNucGrad)" />
      {/* Specular highlight */}
      <circle cx={cx - 3.5} cy={cy - 3.5} r="4" fill="rgba(255,255,255,0.2)" />
    </svg>
  )
}

// ─── Aurora Background (3 layered glow meshes) ───────────────────────────────
function AuroraBackground({ reduceMotion }) {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true" style={{ zIndex: 0 }}>
      {/* Base deep purple */}
      <div className="absolute inset-0" style={{ background: '#07041A' }} />

      {/* Central bloom — large, slow breathing */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 560, height: 460,
          top: '-8%', left: '50%', marginLeft: -280,
          background:
            'radial-gradient(ellipse, rgba(90,55,230,0.30) 0%, rgba(70,44,185,0.12) 45%, transparent 72%)',
          filter: 'blur(2px)',
        }}
        animate={reduceMotion ? undefined : { scale: [1, 1.12, 1], opacity: [0.75, 1, 0.75] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Top-right violet accent */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 270, height: 270,
          top: -55, right: -35,
          background: 'radial-gradient(circle, rgba(139,92,246,0.24) 0%, transparent 70%)',
        }}
        animate={reduceMotion ? undefined : { scale: [1, 1.22, 1], opacity: [0.5, 0.88, 0.5] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 2.5 }}
      />

      {/* Bottom-left indigo accent */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 320, height: 320,
          bottom: 50, left: -75,
          background: 'radial-gradient(circle, rgba(79,70,229,0.20) 0%, transparent 70%)',
        }}
        animate={reduceMotion ? undefined : { scale: [1, 1.14, 1], opacity: [0.55, 0.9, 0.55] }}
        transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
      />
    </div>
  )
}

// ─── Shared input ─────────────────────────────────────────────────────────────
function Input({ label, type = 'text', value, onChange, placeholder, error, autoComplete, rightSlot }) {
  return (
    <div>
      {label && (
        <label
          className="block text-xs font-semibold uppercase tracking-wide mb-1.5"
          style={{ color: '#a8b8cc' }}
        >
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
            background: 'rgba(14,10,36,0.88)',
            border: error
              ? '1px solid rgba(239,68,68,0.6)'
              : '0.75px solid rgba(110,80,200,0.25)',
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
        background: disabled || loading
          ? 'rgba(99,102,241,0.35)'
          : 'linear-gradient(135deg, #5b5cf6, #6366f1)',
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
      className="w-full rounded-[14px] text-sm font-semibold flex items-center justify-center gap-2.5"
      style={{
        background: dark ? '#000' : '#fff',
        color: dark ? '#fff' : '#1a1a1a',
        border: dark
          ? '1px solid rgba(255,255,255,0.14)'
          : '1px solid rgba(0,0,0,0.1)',
        boxShadow: dark ? 'none' : '0 1px 4px rgba(0,0,0,0.14)',
        cursor: loading ? 'not-allowed' : 'pointer',
        opacity: loading ? 0.6 : 1,
        minHeight: 48,
        paddingTop: 11,
        paddingBottom: 11,
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
          style={{
            borderColor: dark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.2)',
            borderTopColor: dark ? '#fff' : '#333',
          }}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
        />
      ) : icon}
      {!loading && <span>{label}</span>}
    </motion.button>
  )
}

// ─── Divider ──────────────────────────────────────────────────────────────────
function Divider({ label = 'or' }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-px" style={{ background: 'rgba(110,80,200,0.18)' }} />
      <span className="text-xs" style={{ color: '#4a3a6a' }}>{label}</span>
      <div className="flex-1 h-px" style={{ background: 'rgba(110,80,200,0.18)' }} />
    </div>
  )
}

// ─── Back header ──────────────────────────────────────────────────────────────
function BackHeader({ onBack }) {
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
    </div>
  )
}

// ─── Landing ──────────────────────────────────────────────────────────────────
function Landing({ onEmail, onSignIn }) {
  const { signInWithOAuth, continueAsGuest } = useAuth()
  const [oauthLoading, setOauthLoading] = useState(null)
  const [oauthError, setOauthError] = useState('')
  const reduceMotion = useReduceMotion()

  const handleOAuth = async (provider) => {
    setOauthLoading(provider)
    setOauthError('')
    const { error } = await signInWithOAuth(provider)
    if (error) {
      setOauthLoading(null)
      setOauthError(error.message || 'Sign in failed. Please try again.')
    }
  }

  // Shared entrance easing
  const ease = [0.16, 1, 0.3, 1]

  return (
    <div className="relative flex flex-col h-full">
      {/* Layer 0 — aurora glows */}
      <AuroraBackground reduceMotion={reduceMotion} />

      {/* Layer 1 — content */}
      <div className="relative z-10 flex flex-col h-full">

        {/* ── Hero ── */}
        <div className="flex-1 flex flex-col items-center justify-center px-8 gap-6">

          {/* Atom container — frosted glass card */}
          <motion.div
            className="flex items-center justify-center"
            style={{
              width: 168, height: 168,
              borderRadius: 44,
              background: 'rgba(99,60,220,0.07)',
              border: '1px solid rgba(139,92,246,0.18)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
            }}
            initial={reduceMotion ? false : { scale: 0.65, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.75, delay: 0.1, ease }}
          >
            <AtomSVG size={120} reduceMotion={reduceMotion} />
          </motion.div>

          {/* Wordmark + tagline */}
          <motion.div
            className="text-center"
            initial={reduceMotion ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.38, duration: 0.6, ease }}
          >
            <h1
              className="font-extrabold tracking-tight leading-none mb-3"
              style={{ fontSize: 40, letterSpacing: '-0.025em' }}
            >
              <span style={{ color: '#f0ecff' }}>Neuro</span>
              <span style={{ color: '#818cf8' }}>Physics</span>
            </h1>
            <p
              className="text-sm leading-relaxed"
              style={{ color: '#7d6fa8', letterSpacing: '0.01em' }}
            >
              GCSE Physics · Built for every mind.
            </p>
          </motion.div>
        </div>

        {/* ── Auth buttons ── */}
        <motion.div
          className="px-6 pb-10 flex flex-col gap-2.5 shrink-0"
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.62, duration: 0.5, ease }}
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

          <Divider label="or" />

          {/* Email */}
          <OAuthButton
            icon={<Mail size={17} color="#fff" />}
            label="Continue with Email"
            onClick={onEmail}
            style={{
              background: 'linear-gradient(135deg, #5b5cf6, #6366f1)',
              color: '#fff',
              border: 'none',
              boxShadow: '0 6px 24px rgba(99,102,241,0.4)',
            }}
          />

          {/* OAuth error */}
          {oauthError && (
            <motion.div
              className="flex items-center gap-2 px-3 py-2.5 rounded-[12px]"
              style={{
                background: 'rgba(239,68,68,0.1)',
                border: '0.75px solid rgba(239,68,68,0.4)',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <AlertCircle size={14} color="#ef4444" />
              <span className="text-xs" style={{ color: '#ef4444' }}>{oauthError}</span>
            </motion.div>
          )}

          {/* Sign-in link */}
          <p className="text-center text-sm pt-0.5" style={{ color: '#7d6fa8' }}>
            Already have an account?{' '}
            <button
              onClick={onSignIn}
              style={{
                color: '#818cf8',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 700,
                fontSize: 'inherit',
              }}
            >
              Sign In
            </button>
          </p>

          {/* Legal */}
          <p className="text-center text-xs" style={{ color: '#3d2f5c' }}>
            By continuing you agree to our{' '}
            <a href="#/terms" className="underline" style={{ color: '#6366f1' }}>
              Terms
            </a>{' '}
            and{' '}
            <a href="#/privacy" className="underline" style={{ color: '#6366f1' }}>
              Privacy Policy
            </a>
          </p>

          {/* Guest access */}
          <button
            onClick={continueAsGuest}
            className="w-full text-center text-xs pt-1 pb-1"
            style={{ color: '#4a3a6a', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            Continue without an account
          </button>
        </motion.div>
      </div>
    </div>
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
          <h2 className="text-2xl font-extrabold mb-2" style={{ color: '#f8fafc' }}>
            Check your email
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: '#a8b8cc' }}>
            We sent a confirmation link to{' '}
            <strong style={{ color: '#f8fafc' }}>{email}</strong>.
            Open it to activate your account, then sign in.
          </p>
        </div>
        <button
          onClick={onBack}
          className="text-sm font-semibold"
          style={{ color: '#818cf8', background: 'none', border: 'none', cursor: 'pointer' }}
        >
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
          <h1
            className="text-3xl font-extrabold mb-1"
            style={{ color: '#f0ecff', letterSpacing: '-0.02em' }}
          >
            Sign up with email
          </h1>
          <p className="text-sm" style={{ color: '#7d6fa8' }}>
            Start your GCSE Physics journey.
          </p>
        </div>

        <div className="flex flex-col gap-4 pb-6">
          <Input
            label="First name"
            value={name}
            onChange={e => { setName(e.target.value); setErrors(v => ({ ...v, name: '' })) }}
            placeholder="e.g. Alex"
            error={errors.name}
            autoComplete="given-name"
          />
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={e => { setEmail(e.target.value); setErrors(v => ({ ...v, email: '' })) }}
            placeholder="you@example.com"
            error={errors.email}
            autoComplete="email"
          />
          <PasswordInput
            label="Password"
            value={password}
            onChange={e => { setPassword(e.target.value); setErrors(v => ({ ...v, password: '', confirm: '' })) }}
            error={errors.password}
            autoComplete="new-password"
            placeholder="Min 8 characters"
          />
          <PasswordInput
            label="Confirm password"
            value={confirm}
            onChange={e => { setConfirm(e.target.value); setErrors(v => ({ ...v, confirm: '' })) }}
            error={errors.confirm}
            autoComplete="new-password"
          />

          {/* Age gate */}
          <button
            className="flex items-start gap-3 px-4 py-3 rounded-[14px] text-left"
            style={{
              background: ageChecked ? 'rgba(99,102,241,0.1)' : 'rgba(14,10,36,0.88)',
              border:
                errors.age && !ageChecked
                  ? '1px solid rgba(239,68,68,0.6)'
                  : ageChecked
                  ? '1px solid rgba(99,102,241,0.5)'
                  : '0.75px solid rgba(110,80,200,0.22)',
              transition: 'all 0.2s',
            }}
            onClick={() => { setAgeChecked(v => !v); setErrors(v => ({ ...v, age: '' })) }}
            role="checkbox"
            aria-checked={ageChecked}
            aria-label="I confirm I am 13 years or older"
          >
            <div
              className="w-5 h-5 rounded-[6px] flex items-center justify-center shrink-0 mt-0.5"
              style={{
                background: ageChecked ? '#6366f1' : 'transparent',
                border: ageChecked ? 'none' : '1.5px solid #4a3a6a',
                transition: 'all 0.15s',
              }}
            >
              {ageChecked && (
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                  <path d="M1 4L3.5 6.5L9 1" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </div>
            <span className="text-sm leading-snug" style={{ color: ageChecked ? '#f8fafc' : '#a8b8cc' }}>
              I confirm I am <strong style={{ color: '#f8fafc' }}>13 years or older</strong>
            </span>
          </button>
          {errors.age && <p className="text-xs" style={{ color: '#ef4444' }}>{errors.age}</p>}

          {serverError && (
            <motion.div
              className="flex items-center gap-2 px-3 py-2.5 rounded-[12px]"
              style={{ background: 'rgba(239,68,68,0.1)', border: '0.75px solid rgba(239,68,68,0.4)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <AlertCircle size={14} color="#ef4444" />
              <span className="text-xs" style={{ color: '#ef4444' }}>{serverError}</span>
            </motion.div>
          )}
        </div>
      </div>

      <div
        className="px-6 pt-3 pb-10 shrink-0"
        style={{ borderTop: '0.75px solid rgba(110,80,200,0.15)' }}
      >
        <PrimaryButton onClick={handleSignUp} loading={loading}>
          Create Account
        </PrimaryButton>
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
          <h1
            className="text-3xl font-extrabold mb-1"
            style={{ color: '#f0ecff', letterSpacing: '-0.02em' }}
          >
            Welcome back
          </h1>
          <p className="text-sm" style={{ color: '#7d6fa8' }}>
            Sign in to continue your streak.
          </p>
        </div>

        {/* Social sign-in */}
        <div className="flex flex-col gap-2.5 mb-5">
          <OAuthButton
            icon={<GoogleIcon />}
            label="Continue with Google"
            onClick={() => handleOAuth('google')}
            loading={oauthLoading === 'google'}
          />
          <OAuthButton
            icon={<AppleIcon />}
            label="Continue with Apple"
            onClick={() => handleOAuth('apple')}
            loading={oauthLoading === 'apple'}
            dark
          />
        </div>

        <Divider label="or sign in with email" />

        <div className="flex flex-col gap-4 mt-5 pb-6">
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={e => { setEmail(e.target.value); setErrors(v => ({ ...v, email: '' })) }}
            placeholder="you@example.com"
            error={errors.email}
            autoComplete="email"
          />
          <PasswordInput
            label="Password"
            value={password}
            onChange={e => { setPassword(e.target.value); setErrors(v => ({ ...v, password: '' })) }}
            error={errors.password}
            autoComplete="current-password"
          />

          <button
            className="text-xs text-right"
            style={{ color: '#818cf8', background: 'none', border: 'none', cursor: 'pointer' }}
            onClick={() => onForgot(email)}
          >
            Forgot password?
          </button>

          {serverError && (
            <motion.div
              className="flex items-center gap-2 px-3 py-2.5 rounded-[12px]"
              style={{ background: 'rgba(239,68,68,0.1)', border: '0.75px solid rgba(239,68,68,0.4)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <AlertCircle size={14} color="#ef4444" />
              <span className="text-xs" style={{ color: '#ef4444' }}>{serverError}</span>
            </motion.div>
          )}
        </div>
      </div>

      <div
        className="px-6 pt-3 pb-10 shrink-0"
        style={{ borderTop: '0.75px solid rgba(110,80,200,0.15)' }}
      >
        <PrimaryButton onClick={handleSignIn} loading={loading}>
          Sign In
        </PrimaryButton>
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
          <h1
            className="text-3xl font-extrabold mb-1"
            style={{ color: '#f0ecff', letterSpacing: '-0.02em' }}
          >
            Reset password
          </h1>
          <p className="text-sm" style={{ color: '#7d6fa8' }}>
            We'll send a reset link to your email.
          </p>
        </div>

        {sent ? (
          <motion.div
            className="flex flex-col items-center gap-4 pt-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <CheckCircle2 size={48} color="#00bc7d" />
            <p className="text-sm leading-relaxed" style={{ color: '#a8b8cc' }}>
              Reset link sent to{' '}
              <strong style={{ color: '#f8fafc' }}>{email}</strong>. Check your inbox.
            </p>
            <button
              onClick={onBack}
              className="text-sm font-semibold"
              style={{ color: '#818cf8', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              Back to Sign In
            </button>
          </motion.div>
        ) : (
          <div className="flex flex-col gap-4">
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={e => { setEmail(e.target.value); setError('') }}
              placeholder="you@example.com"
              error={error}
              autoComplete="email"
            />
          </div>
        )}
      </div>

      {!sent && (
        <div
          className="px-6 pt-3 pb-10 shrink-0"
          style={{ borderTop: '0.75px solid rgba(110,80,200,0.15)' }}
        >
          <PrimaryButton onClick={handle} loading={loading}>
            Send Reset Link
          </PrimaryButton>
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
    <div className="flex flex-col h-full" style={{ background: '#07041A' }}>
      <AnimatePresence mode="wait">
        {view === 'landing' && (
          <motion.div key="landing" className="flex flex-col h-full">
            <Landing
              onEmail={() => setView('signup-email')}
              onSignIn={() => setView('signin')}
            />
          </motion.div>
        )}
        {view === 'signup-email' && (
          <motion.div key="signup-email" className="flex flex-col h-full">
            <SignUpEmail onBack={() => setView('landing')} onDone={onDone} />
          </motion.div>
        )}
        {view === 'signin' && (
          <motion.div key="signin" className="flex flex-col h-full">
            <SignIn
              onBack={() => setView('landing')}
              onDone={onDone}
              onForgot={(email) => { setForgotEmail(email); setView('forgot') }}
            />
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
