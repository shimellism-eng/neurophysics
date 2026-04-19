import { HashRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { useState, useEffect, useCallback, useRef, lazy, Suspense } from 'react'
import AtomIcon from './components/AtomIcon'
import { AuthProvider, useAuth } from './context/AuthContext'
import { MamoProvider, useMamoState } from './context/MamoContext'
import { ComfortProvider, useComfort } from './context/ComfortContext'
import ComfortSettings, { ComfortFirstTimePrompt } from './components/ComfortSettings'
import BottomNav from './components/BottomNav'

// ── Mamo FAB pref helpers ─────────────────────────────────────────────────────
const PREFS_KEY = 'neurophysics_prefs'
function _loadPrefs() {
  try { return JSON.parse(localStorage.getItem(PREFS_KEY) || '{}') } catch { return {} }
}
function _setMamoHidden(hidden) {
  try {
    const prefs = _loadPrefs()
    prefs.hideMamo = hidden
    localStorage.setItem(PREFS_KEY, JSON.stringify(prefs))
  } catch { /* ignore */ }
}

// ── Restore accessibility prefs on cold start (before React mounts) ──────────
// ComfortContext applies all prefs reactively once mounted.
// This IIFE only handles the brief pre-mount window to avoid a flash.
;(() => {
  try {
    const prefs = JSON.parse(localStorage.getItem('neurophysics_prefs') || '{}')
    if (prefs.background && prefs.background !== 'dark') {
      document.body.dataset.theme = prefs.background
    }
    if (prefs.fontFamily === 'opendyslexic' || prefs.dyslexicFont) {
      document.body.style.fontFamily = "'OpenDyslexic', sans-serif"
    }
    if (prefs.highContrast) document.body.classList.add('high-contrast')
    if (prefs.reduceMotion) document.body.classList.add('reduce-motion')
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
const RecallScreen      = lazy(() => import('./screens/RecallScreen'))
const EquationDrillScreen = lazy(() => import('./screens/EquationDrillScreen'))
const QuickWinScreen      = lazy(() => import('./screens/QuickWinScreen'))
const MixedRevisionScreen = lazy(() => import('./screens/MixedRevisionScreen'))

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
  const hiddenByExam = ['/timed-paper', '/exam', '/practice', '/lesson', '/diagnostic', '/grade9', '/recall', '/equation-drill'].some(
    p => location.pathname.startsWith(p)
  )
  // Reactive dismissed state — reads hideMamo from neurophysics_prefs
  const [dismissed, setDismissed] = useState(() => !!_loadPrefs().hideMamo)
  const hiddenByPref = dismissed
  const hide = hiddenByRoute || hiddenByExam || hiddenByPref
  const reduceMotion = (() => {
    try { return !!_loadPrefs().reduceMotion } catch { return false }
  })() || (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches)

  // Listen for the Settings toggle re-enabling Mamo (storage event from same tab via custom event)
  useEffect(() => {
    const onStorage = () => setDismissed(!!_loadPrefs().hideMamo)
    window.addEventListener('np_prefs_changed', onStorage)
    return () => window.removeEventListener('np_prefs_changed', onStorage)
  }, [])

  const dismissMamo = useCallback((e) => {
    e.stopPropagation()
    _setMamoHidden(true)
    setDismissed(true)
    // Fire custom event so Settings screen can reflect change if open
    window.dispatchEvent(new Event('np_prefs_changed'))
  }, [])

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
            bottom: 'calc(var(--bottom-chrome-height) + 16px)',
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

          {/* Dismiss × — persistent hide, can re-enable in Settings */}
          {!reaction && (
            <button
              onClick={dismissMamo}
              aria-label="Hide Mamo button"
              style={{
                position: 'absolute',
                top: -8,
                right: -8,
                width: 28,
                height: 28,
                borderRadius: 999,
                background: 'rgba(8,15,30,0.9)',
                border: '0.75px solid rgba(255,255,255,0.15)',
                color: '#64748b',
                fontSize: 10,
                lineHeight: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                padding: 0,
                zIndex: 1,
              }}
            >
              ×
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Routes that show the bottom nav
const SHELL_ROUTES = ['/', '/learn', '/mamo', '/settings']
// Routes accessible without auth
const PUBLIC_ROUTES = ['/', '/auth', '/privacy', '/terms', '/consent']

// ── Colour Overlay ────────────────────────────────────────────────────────────
function ColourOverlay() {
  const { prefs } = useComfort()
  if (!prefs.colourOverlay || prefs.colourOverlay === 'none') return null
  return (
    <div
      aria-hidden="true"
      className={`np-overlay-${prefs.colourOverlay}`}
      style={{
        position: 'fixed', inset: 0,
        pointerEvents: 'none',
        zIndex: 990,
      }}
    />
  )
}

// ── Reading Ruler ─────────────────────────────────────────────────────────────
function ReadingRuler() {
  const { prefs } = useComfort()
  const rulerRef = useRef(null)

  useEffect(() => {
    if (!prefs.readingRuler) return
    const onScroll = () => {
      // Position ruler at 40% of viewport height — a natural reading zone
      if (rulerRef.current) {
        rulerRef.current.style.top = `${window.innerHeight * 0.4}px`
      }
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [prefs.readingRuler])

  if (!prefs.readingRuler) return null
  return <div ref={rulerRef} className="np-reading-ruler" aria-hidden="true" />
}

// ── Comfort FAB (floating accessibility button) ────────────────────────────────
function ComfortFAB() {
  const { setSettingsOpen } = useComfort()
  const location = useLocation()
  const { user } = useAuth()

  // Only show when logged in, hide on auth/onboarding/landing
  const hidden = !user || ['/auth', '/onboarding', '/'].includes(location.pathname) && !user
  if (hidden) return null

  return (
    <button
      className="fixed z-[994] flex items-center justify-center rounded-full active:opacity-70"
      style={{
        right: 16,
        top: 'calc(var(--safe-top) + 10px)',
        width: 38, height: 38,
        background: 'rgba(15,22,41,0.85)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        border: '0.75px solid rgba(0,212,255,0.25)',
        boxShadow: '0 2px 12px rgba(0,0,0,0.25)',
      }}
      onClick={() => setSettingsOpen(true)}
      aria-label="Open comfort settings"
    >
      {/* Accessibility icon — sliders */}
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(0,212,255,0.8)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="4" y1="6" x2="20" y2="6"/>
        <line x1="4" y1="12" x2="20" y2="12"/>
        <line x1="4" y1="18" x2="20" y2="18"/>
        <circle cx="9" cy="6" r="2" fill="rgba(0,212,255,0.8)" stroke="none"/>
        <circle cx="15" cy="12" r="2" fill="rgba(0,212,255,0.8)" stroke="none"/>
        <circle cx="9" cy="18" r="2" fill="rgba(0,212,255,0.8)" stroke="none"/>
      </svg>
    </button>
  )
}

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

  // NOTE: Consent gate removed — absorbed into AuthScreen's inline terms/age checkbox.
  // The /consent route still exists as a privacy reference page but is no longer forced.

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
        height: '100dvh',
        minHeight: '100vh',
        width: '100%',
        maxWidth: 480,
        margin: '0 auto',
        background: 'var(--np-bg)',
        overflow: 'hidden',
      }}
    >
      {/* Top safe-area spacer */}
      <div style={{ height: 'var(--safe-top)', background: 'var(--np-bg)', flexShrink: 0 }} />
      <div className="flex-1 overflow-hidden relative" style={{ paddingBottom: showShell ? 'var(--bottom-chrome-height)' : 0 }}>
        <Suspense fallback={<RouteLoader />}>
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              style={{ position: 'absolute', inset: 0, overflowY: 'auto', willChange: 'transform, opacity' }}
            >
              <Routes location={location}>
                <Route path="/auth" element={<AuthScreen />} />
                <Route path="/onboarding" element={<OnboardingScreen />} />
                <Route path="/" element={user ? <HomeScreen /> : <LandingScreen />} />
                <Route path="/learn" element={<LearnScreen />} />
                <Route path="/topics" element={<Navigate to="/learn" replace />} />
                <Route path="/mastery" element={<MasteryScreen />} />
                <Route path="/topic-map" element={<TopicMap />} />
                <Route path="/lesson/:id" element={<LessonPlayer />} />
                <Route path="/diagnostic/:id" element={<DiagnosticQuestion />} />
                <Route path="/feedback/:id" element={<MisconceptionFeedback />} />
                <Route path="/mamo" element={<MamoChat />} />
                <Route path="/practical/:id" element={<PracticalScreen />} />
                <Route path="/exam/:id" element={<ExamPractice />} />
                <Route path="/grade9" element={<Grade9Challenge />} />
                <Route path="/timed-paper" element={<TimedPaper />} />
                <Route path="/papers" element={<Navigate to="/timed-paper" replace />} />
                <Route path="/paper-results" element={<PaperResults />} />
                <Route path="/settings" element={<SettingsScreen />} />
                <Route path="/consent" element={<ConsentScreen />} />
                <Route path="/privacy" element={<PrivacyPolicyScreen />} />
                <Route path="/terms" element={<TermsScreen />} />
                <Route path="/practice/:topicId" element={<AdaptivePractice />} />
                <Route path="/recall/:topicId" element={<RecallScreen />} />
                <Route path="/equation-drill" element={<EquationDrillScreen />} />
                <Route path="/quickwin" element={<QuickWinScreen />} />
                <Route path="/mixed-revision" element={<MixedRevisionScreen />} />
                <Route path="/spec-checklist" element={<SpecChecklist />} />
                <Route path="/study-plan" element={<StudyPlanScreen />} />
                <Route path="*" element={<Navigate to={user ? '/' : '/auth'} replace />} />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </Suspense>
      </div>

      {showShell && (
        <>
          <FloatingMamo />
          <BottomNav />
        </>
      )}

      {/* Comfort overlays — always above content, below modals */}
      <ColourOverlay />
      <ReadingRuler />
      <ComfortFAB />
      <ComfortSettings />
      <ComfortFirstTimePrompt />

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
        <ComfortProvider>
          <HashRouter>
            <AppShell />
          </HashRouter>
        </ComfortProvider>
      </MamoProvider>
    </AuthProvider>
  )
}
