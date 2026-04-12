import { HashRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { useState, useEffect, lazy, Suspense } from 'react'
import AtomIcon from './components/AtomIcon'
import { AuthProvider, useAuth } from './context/AuthContext'
import { MamoProvider, useMamoState } from './context/MamoContext'
import BottomNav from './components/BottomNav'

// ── Restore accessibility prefs on cold start (before React mounts) ──────────
;(() => {
  try {
    const prefs = JSON.parse(localStorage.getItem('neurophysics_prefs') || '{}')
    const isLarge = prefs.fontSize === 'Large' || prefs.fontSize === 'large'
    if (isLarge) {
      document.body.classList.add('text-large')
      document.documentElement.style.fontSize = '18px'
    }
  } catch { /* ignore */ }
})()

// ── Eagerly loaded (needed at startup / auth flow) ────────────────────────────
import HomeScreen from './screens/HomeScreen'
import AuthScreen from './screens/AuthScreen'
import OnboardingScreen from './screens/OnboardingScreen'

// ── Lazily loaded (deferred until first navigation) ───────────────────────────
const LearnScreen       = lazy(() => import('./screens/LearnScreen'))
const TopicMap          = lazy(() => import('./screens/TopicMap'))
const LessonPlayer      = lazy(() => import('./screens/LessonPlayer'))
const DiagnosticQuestion = lazy(() => import('./screens/DiagnosticQuestion'))
const MisconceptionFeedback = lazy(() => import('./screens/MisconceptionFeedback'))
const MasteryScreen     = lazy(() => import('./screens/MasteryScreen'))
const SettingsScreen    = lazy(() => import('./screens/SettingsScreen'))
const MamoChat          = lazy(() => import('./screens/MamoChat'))
const PracticalScreen   = lazy(() => import('./screens/PracticalScreen'))
const ExamPractice      = lazy(() => import('./screens/ExamPractice'))
const Grade9Challenge   = lazy(() => import('./screens/Grade9Challenge'))
const TimedPaper        = lazy(() => import('./screens/TimedPaper'))
const PaperResults      = lazy(() => import('./screens/PaperResults'))
const PrivacyPolicyScreen = lazy(() => import('./screens/PrivacyPolicyScreen'))
const TermsScreen       = lazy(() => import('./screens/TermsScreen'))
const AdaptivePractice   = lazy(() => import('./screens/AdaptivePractice'))
const ConsentScreen     = lazy(() => import('./screens/ConsentScreen'))
const LandingScreen     = lazy(() => import('./screens/LandingScreen'))
const SpecChecklist     = lazy(() => import('./screens/SpecChecklist'))
const StudyPlanScreen   = lazy(() => import('./screens/StudyPlanScreen'))

// ── Suspense fallback ─────────────────────────────────────────────────────────
function RouteLoader() {
  const reduceMotion = (() => {
    try { return !!JSON.parse(localStorage.getItem('neurophysics_prefs') || '{}').reduceMotion } catch { return false }
  })() || (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  return (
    <div className="flex items-center justify-center h-full" style={{ background: '#080f1e' }}>
      <motion.div
        className="w-8 h-8 rounded-full border-2"
        style={{ borderColor: 'rgba(99,102,241,0.3)', borderTopColor: '#6366f1' }}
        animate={reduceMotion ? {} : { rotate: 360 }}
        transition={reduceMotion ? { duration: 0 } : { repeat: Infinity, duration: 0.8, ease: 'linear' }}
      />
    </div>
  )
}

function PulseRing() {
  const reduceMotion = (() => {
    try {
      const prefs = JSON.parse(localStorage.getItem('neurophysics_prefs') || '{}')
      return prefs.reduceMotion
    } catch { return false }
  })()
  const systemReduceMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false

  if (reduceMotion || systemReduceMotion) return null

  return (
    <motion.div
      className="absolute inset-0 rounded-full"
      style={{ border: '2px solid rgba(99,102,241,0.35)' }}
      animate={{ scale: [1, 1.4], opacity: [0.4, 0] }}
      transition={{ repeat: Infinity, duration: 3, ease: 'easeOut', repeatDelay: 1.5 }}
    />
  )
}

function FloatingMamo() {
  const location = useLocation()
  const navigate = useNavigate()
  const reaction = useMamoState()
  const hiddenByRoute = SHELL_ROUTES.includes(location.pathname)
  const hiddenByExam = ['/timed-paper', '/exam', '/practice', '/lesson', '/diagnostic', '/grade9'].some(
    p => location.pathname.startsWith(p)
  )
  const hiddenByPref = (() => {
    try { return !!JSON.parse(localStorage.getItem('neurophysics_prefs') || '{}').hideMamo } catch { return false }
  })()
  const hide = hiddenByRoute || hiddenByExam || hiddenByPref
  const reduceMotion = (() => {
    try { return !!JSON.parse(localStorage.getItem('neurophysics_prefs') || '{}').reduceMotion } catch { return false }
  })() || (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches)

  // Topic context from lesson/exam/practical routes
  const topicMatch = location.pathname.match(/^\/(?:lesson|exam|practical)\/(.+)/)
  const topicSlug  = topicMatch ? topicMatch[1] : ''

  const mamoPath = topicSlug
    ? `/mamo?topic=${encodeURIComponent(topicSlug)}&label=${encodeURIComponent(topicSlug.replace(/-/g, ' '))}`
    : '/mamo'

  // Badge: show pulsing dot when a saved conversation exists for this topic
  const hasHistory = (() => {
    try {
      const key = `mamo_thread_${topicSlug || 'general'}`
      const stored = JSON.parse(localStorage.getItem(key) || 'null')
      return Array.isArray(stored) && stored.length > 1
    } catch { return false }
  })()

  // Reaction animations
  const reactionAnimate = reaction === 'correct'
    ? { scale: [1, 1.35, 0.9, 1.15, 1], y: [0, -10, 2, -5, 0] }
    : reaction === 'wrong'
      ? { x: [0, -6, 6, -4, 4, 0], scale: [1, 0.92, 1] }
      : reaction === 'complete'
        ? { scale: [1, 1.5, 0.85, 1.2, 1], y: [0, -16, 4, -8, 0], rotate: [0, -12, 12, -6, 0] }
        : { scale: 1, x: 0, y: 0 }

  const reactionTransition = reaction
    ? { duration: reaction === 'complete' ? 0.7 : 0.4, ease: [0.16, 1, 0.3, 1] }
    : {}

  return (
    <AnimatePresence>
      {!hide && (
        <motion.div
          className="fixed z-40"
          style={{
            bottom: 'calc(64px + env(safe-area-inset-bottom) + 16px)',
            right: 20,
          }}
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.6, opacity: 0, transition: { duration: 0.18, ease: 'easeIn' } }}
          transition={{ type: 'spring', stiffness: 380, damping: 22, mass: 0.8, delay: 0.15 }}
        >
          <motion.button
            className="relative flex items-center justify-center rounded-full"
            style={{
              width: 60,
              height: 60,
              background: 'linear-gradient(135deg, #6366f1, #818cf8)',
              boxShadow: '0 4px 24px rgba(99,102,241,0.55)',
            }}
            onClick={() => navigate(mamoPath)}
            whileTap={{ scale: 0.9 }}
            animate={reactionAnimate}
            transition={reactionTransition}
          >
            {reaction && (
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: reaction === 'correct' ? 'rgba(34,197,94,0.35)'
                    : reaction === 'wrong' ? 'rgba(239,68,68,0.35)'
                    : 'rgba(253,199,0,0.45)',
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={reduceMotion ? { opacity: 1, scale: 1 } : { opacity: [0, 1, 0], scale: [0.8, 1.4, 1.8] }}
                transition={reduceMotion ? { duration: 0 } : { duration: reaction === 'complete' ? 0.7 : 0.5 }}
              />
            )}
            <AtomIcon size={24} color="#fff" />
            <PulseRing />

            {/* Conversation-presence badge */}
            {hasHistory && (
              <motion.div
                className="absolute rounded-full"
                style={{
                  width: 12,
                  height: 12,
                  top: 2,
                  right: 2,
                  background: '#a5b4fc',
                  border: '2px solid #080f1e',
                }}
                animate={reduceMotion ? {} : { scale: [1, 1.3, 1] }}
                transition={reduceMotion ? { duration: 0 } : { repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              />
            )}
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Routes that show the bottom nav
const SHELL_ROUTES = ['/', '/learn', '/mamo', '/settings']
// Routes accessible without auth
const PUBLIC_ROUTES = ['/', '/auth', '/privacy', '/terms', '/consent']

// True when running inside the Capacitor native shell (iOS / Android)
// Web visitors get the landing page; app installs go straight to /auth
const IS_NATIVE = typeof window !== 'undefined' && !!window.Capacitor?.isNativePlatform?.()

function AppShell() {
  const location = useLocation()
  const { user, loading } = useAuth()

  // Offline detection
  const [isOffline, setIsOffline] = useState(!navigator.onLine)
  useEffect(() => {
    const goOffline = () => setIsOffline(true)
    const goOnline  = () => setIsOffline(false)
    window.addEventListener('offline', goOffline)
    window.addEventListener('online',  goOnline)
    return () => {
      window.removeEventListener('offline', goOffline)
      window.removeEventListener('online',  goOnline)
    }
  }, [])

  // Reset scroll on route change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])
  const isPublic = PUBLIC_ROUTES.includes(location.pathname)
  const showShell = !!user && SHELL_ROUTES.includes(location.pathname)

  // Show nothing while auth state loads
  if (loading) {
    const rmLoading = (() => {
      try { return !!JSON.parse(localStorage.getItem('neurophysics_prefs') || '{}').reduceMotion } catch { return false }
    })() || (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    return (
      <div className="flex flex-col h-full items-center justify-center" style={{ background: '#080f1e' }}>
        <motion.div
          className="w-8 h-8 rounded-full border-2"
          style={{ borderColor: 'rgba(99,102,241,0.3)', borderTopColor: '#6366f1' }}
          animate={rmLoading ? {} : { rotate: 360 }}
          transition={rmLoading ? { duration: 0 } : { repeat: Infinity, duration: 0.8, ease: 'linear' }}
        />
      </div>
    )
  }

  // First-time user — show consent/age gate before anything else
  const hasConsented = !!localStorage.getItem('neurophysics_consent')
  if (!hasConsented && location.pathname !== '/consent' && location.pathname !== '/privacy' && location.pathname !== '/terms') {
    return <Navigate to="/consent" replace />
  }

  // Native app + not logged in at / → skip landing page, go straight to auth
  if (!user && IS_NATIVE && location.pathname === '/') {
    return <Navigate to="/auth" replace />
  }

  // Not logged in → force to auth (except public routes)
  if (!user && !isPublic) {
    return <Navigate to="/auth" replace />
  }

  // Logged in + hitting /auth → go to app
  if (user && location.pathname === '/auth') {
    const onboarded = !!localStorage.getItem('neurophysics_onboarded')
    return <Navigate to={onboarded ? '/' : '/onboarding'} replace />
  }

  return (
    <div
      className="relative flex flex-col"
      style={{
        height: '100vh',
        width: '100%',
        maxWidth: 480,
        margin: '0 auto',
        background: '#080f1e',
        overflow: 'hidden',
      }}
    >
      {/* Top safe-area spacer */}
      <div style={{ height: 'env(safe-area-inset-top)', background: '#080f1e', flexShrink: 0 }} />
      <div className="flex-1 overflow-hidden relative" style={{ paddingBottom: showShell ? 'calc(64px + env(safe-area-inset-bottom))' : 0 }}>
        <Suspense fallback={<RouteLoader />}>
          <Routes>
            <Route path="/auth" element={<AuthScreen />} />
            <Route path="/onboarding" element={<OnboardingScreen />} />
            <Route path="/" element={user ? <HomeScreen /> : <LandingScreen />} />
            <Route path="/learn" element={<LearnScreen />} />
            <Route path="/topics" element={<Navigate to="/learn" replace />} />
            <Route path="/mastery" element={<Navigate to="/learn" replace />} />
            <Route path="/lesson/:id" element={<LessonPlayer />} />
            <Route path="/diagnostic/:id" element={<DiagnosticQuestion />} />
            <Route path="/feedback/:id" element={<MisconceptionFeedback />} />
            <Route path="/mamo" element={<MamoChat />} />
            <Route path="/practical/:id" element={<PracticalScreen />} />
            <Route path="/exam/:id" element={<ExamPractice />} />
            <Route path="/grade9" element={<Grade9Challenge />} />
            <Route path="/timed-paper" element={<TimedPaper />} />
            <Route path="/paper-results" element={<PaperResults />} />
            <Route path="/settings" element={<SettingsScreen />} />
            <Route path="/consent" element={<ConsentScreen />} />
            <Route path="/privacy" element={<PrivacyPolicyScreen />} />
            <Route path="/terms" element={<TermsScreen />} />
            <Route path="/practice/:topicId" element={<AdaptivePractice />} />
            <Route path="/spec-checklist" element={<SpecChecklist />} />
            <Route path="/study-plan" element={<StudyPlanScreen />} />
            <Route path="*" element={<Navigate to={user ? '/' : '/auth'} replace />} />
          </Routes>
        </Suspense>
      </div>

      {showShell && (
        <>
          <FloatingMamo />
          <BottomNav />
        </>
      )}

      {/* Offline overlay — WCAG 1.4.3, no silent failure */}
      {isOffline && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 9999,
          background: '#080f1e',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          gap: 16, padding: 32, textAlign: 'center',
          fontFamily: 'Bricolage Grotesque, sans-serif',
        }}>
          <div style={{ fontSize: 48 }}>📡</div>
          <h2 style={{ color: '#f8fafc', fontSize: 20, fontWeight: 700, margin: 0 }}>No connection</h2>
          <p style={{ color: '#94a3b8', fontSize: 14, margin: 0 }}>
            Check your internet and try again.<br />Your progress is saved locally.
          </p>
          <button onClick={() => window.location.reload()} style={{
            marginTop: 8, padding: '12px 24px',
            background: '#00d4ff', color: '#080f1e',
            border: 'none', borderRadius: 12,
            fontSize: 14, fontWeight: 700, cursor: 'pointer',
          }}>Try again</button>
        </div>
      )}
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <MamoProvider>
        <HashRouter>
          <AppShell />
        </HashRouter>
      </MamoProvider>
    </AuthProvider>
  )
}
