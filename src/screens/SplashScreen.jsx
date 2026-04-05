import { motion } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import { Atom, Mail } from 'lucide-react'

// ── Brand SVG icons ─────────────────────────────────────────────────────────
function AppleLogo() {
  return (
    <svg width="18" height="18" viewBox="0 0 814 1000" fill="currentColor">
      <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105.6-57.8-155.5-127.4C46 790.7 0 663 0 541.8c0-207.5 135.4-317.3 269-317.3 70.1 0 128.4 46.4 172.5 46.4 42.8 0 109.6-49 192-49 30.8 0 133.2 2.6 198.4 99zM537.6 63.4c28.2-33.2 48.3-79.4 48.3-125.6 0-6.5-.6-13-1.9-18.2-45.9 1.7-101 30.8-134.2 69-26.9 31.4-51.8 77.6-51.8 124.4 0 7.1 1.3 14.2 1.9 16.5 3.2.6 8.4 1.3 13.6 1.3 41.5 0 93.2-27.7 124.1-67.4z"/>
    </svg>
  )
}

function GoogleLogo() {
  return (
    <svg width="18" height="18" viewBox="0 0 533.5 544.3">
      <path d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z" fill="#4285f4"/>
      <path d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z" fill="#34a853"/>
      <path d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z" fill="#fbbc04"/>
      <path d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z" fill="#ea4335"/>
    </svg>
  )
}

// ── Auth button variants ─────────────────────────────────────────────────────
function AuthButton({ icon, label, onClick, style, delay }) {
  return (
    <motion.button
      className="w-full py-[14px] rounded-[16px] flex items-center justify-center gap-3 text-[15px] font-semibold"
      style={style}
      onClick={onClick}
      whileTap={{ scale: 0.97 }}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      {icon}
      {label}
    </motion.button>
  )
}

export default function SplashScreen() {
  const navigate = useNavigate()

  // For now all auth routes go to onboarding — replace with real auth later
  const handleSignUp = () => navigate('/onboarding')
  const handleLogIn = () => {
    localStorage.setItem('neurophysics_onboarded', '1')
    navigate('/', { replace: true })
  }

  return (
    <div
      className="flex flex-col h-full"
      style={{ background: 'radial-gradient(ellipse at 50% 28%, #0d1a35 0%, #0b1121 65%)' }}
    >
      {/* Logo + tagline */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 gap-6">
        <motion.div
          className="relative flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="absolute rounded-full"
            style={{ width: 140, height: 140, border: '1.5px solid rgba(99,102,241,0.25)' }}
            animate={{ scale: [1, 1.18, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          />
          <div
            className="w-28 h-28 rounded-full flex items-center justify-center"
            style={{
              background: 'radial-gradient(circle at 40% 35%, #1e3a6e, #0b1121)',
              boxShadow: '0 0 60px rgba(99,102,241,0.35), 0 0 120px rgba(99,102,241,0.12)',
              border: '1.5px solid rgba(99,102,241,0.4)',
            }}
          >
            <Atom size={58} color="#93c5fd" strokeWidth={1.5} />
          </div>
        </motion.div>

        <motion.div
          className="flex flex-col items-center gap-2"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1
            className="text-5xl font-extrabold tracking-tight text-center"
            style={{ color: '#f8fafc', letterSpacing: '-0.02em' }}
          >
            NeuroPhysics
          </h1>
          <p className="text-base text-center leading-relaxed max-w-xs" style={{ color: '#90a1b9' }}>
            Master GCSE Physics step by step.{'\n'}Calm, focused, and clear.
          </p>
        </motion.div>
      </div>

      {/* Sign-up buttons + log in */}
      <div className="px-6 pb-10 flex flex-col gap-3 shrink-0">

        {/* Section label */}
        <motion.p
          className="text-xs font-semibold text-center uppercase tracking-widest mb-1"
          style={{ color: '#4a5a72' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Create your account
        </motion.p>

        {/* Sign in with Apple */}
        <AuthButton
          delay={0.55}
          icon={<AppleLogo />}
          label="Continue with Apple"
          onClick={handleSignUp}
          style={{
            background: '#f8fafc',
            color: '#0b1121',
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
          }}
        />

        {/* Continue with Google */}
        <AuthButton
          delay={0.62}
          icon={<GoogleLogo />}
          label="Continue with Google"
          onClick={handleSignUp}
          style={{
            background: 'rgba(255,255,255,0.07)',
            color: '#f8fafc',
            border: '0.75px solid rgba(255,255,255,0.14)',
          }}
        />

        {/* Continue with Email */}
        <AuthButton
          delay={0.69}
          icon={<Mail size={17} color="#818cf8" strokeWidth={2} />}
          label="Continue with Email"
          onClick={handleSignUp}
          style={{
            background: 'rgba(99,102,241,0.1)',
            color: '#818cf8',
            border: '0.75px solid rgba(99,102,241,0.3)',
          }}
        />

        {/* Divider */}
        <motion.div
          className="flex items-center gap-3 my-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.75 }}
        >
          <div className="flex-1 h-px" style={{ background: '#1d293d' }} />
          <span className="text-xs font-medium" style={{ color: '#4a5a72' }}>Already have an account?</span>
          <div className="flex-1 h-px" style={{ background: '#1d293d' }} />
        </motion.div>

        {/* Log In */}
        <motion.button
          className="w-full py-[14px] rounded-[16px] text-[15px] font-semibold"
          style={{
            background: 'transparent',
            color: '#6366f1',
            border: '0.75px solid rgba(99,102,241,0.4)',
          }}
          onClick={handleLogIn}
          whileTap={{ scale: 0.97 }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          Log In
        </motion.button>

        {/* Terms */}
        <motion.p
          className="text-center text-xs leading-relaxed px-4"
          style={{ color: '#4a5a72' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          By continuing you agree to our{' '}
          <span style={{ color: '#6366f1' }}>Terms of Service</span>
          {' '}and{' '}
          <span style={{ color: '#6366f1' }}>Privacy Policy</span>
        </motion.p>
      </div>
    </div>
  )
}
