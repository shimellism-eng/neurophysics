import { HashRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { useState } from 'react'
import { Atom, Minus } from 'lucide-react'
import { AuthProvider, useAuth } from './context/AuthContext'
import BottomNav from './components/BottomNav'
import HomeScreen from './screens/HomeScreen'
import TopicMap from './screens/TopicMap'
import LessonPlayer from './screens/LessonPlayer'
import DiagnosticQuestion from './screens/DiagnosticQuestion'
import MisconceptionFeedback from './screens/MisconceptionFeedback'
import MasteryScreen from './screens/MasteryScreen'
import SettingsScreen from './screens/SettingsScreen'
import MamoChat from './screens/MamoChat'
import PracticalScreen from './screens/PracticalScreen'
import AuthScreen from './screens/AuthScreen'
import OnboardingScreen from './screens/OnboardingScreen'
import PrivacyPolicyScreen from './screens/PrivacyPolicyScreen'
import TermsScreen from './screens/TermsScreen'

function FloatingMamo() {
  const location = useLocation()
  const navigate = useNavigate()
  const hide = location.pathname === '/mamo'
  const [minimized, setMinimized] = useState(false)

  return (
    <AnimatePresence>
      {!hide && (
        <motion.div
          drag
          dragMomentum={false}
          dragElastic={0}
          className="fixed z-40"
          style={{ bottom: 84, right: 18, touchAction: 'none' }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
        >
          <AnimatePresence mode="wait">
            {minimized ? (
              <motion.button
                key="mini"
                className="flex items-center gap-2 px-3 h-9 rounded-full"
                style={{
                  background: 'linear-gradient(135deg, #6366f1, #818cf8)',
                  boxShadow: '0 2px 14px rgba(99,102,241,0.45)',
                }}
                onClick={() => setMinimized(false)}
                whileTap={{ scale: 0.94 }}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
              >
                <Atom size={14} color="#fff" />
                <span className="text-xs font-semibold" style={{ color: '#fff' }}>Mamo</span>
              </motion.button>
            ) : (
              <motion.div
                key="fab"
                className="relative"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
              >
                <motion.button
                  className="w-12 h-12 rounded-full flex items-center justify-center relative"
                  style={{
                    background: 'linear-gradient(135deg, #6366f1, #818cf8)',
                    boxShadow: '0 4px 20px rgba(99,102,241,0.5)',
                  }}
                  onClick={() => navigate('/mamo')}
                  whileTap={{ scale: 0.9 }}
                >
                  <Atom size={20} color="#fff" />
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{ border: '2px solid rgba(99,102,241,0.4)' }}
                    animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                    transition={{ repeat: Infinity, duration: 2.2, ease: 'easeOut' }}
                  />
                </motion.button>
                <button
                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center"
                  style={{ background: '#0b1121', border: '1.5px solid rgba(99,102,241,0.5)', zIndex: 1 }}
                  onPointerDown={e => e.stopPropagation()}
                  onClick={e => { e.stopPropagation(); setMinimized(true) }}
                >
                  <Minus size={8} color="#a5b4fc" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Routes that show the bottom nav + floating Mamo
const SHELL_ROUTES = ['/', '/topics', '/mastery', '/settings']
// Routes accessible without auth
const PUBLIC_ROUTES = ['/auth', '/privacy', '/terms']

function AppShell() {
  const location = useLocation()
  const { user, loading } = useAuth()
  const isPublic = PUBLIC_ROUTES.includes(location.pathname)
  const showShell = SHELL_ROUTES.includes(location.pathname)

  // Show nothing while auth state loads
  if (loading) {
    return (
      <div className="flex flex-col h-full items-center justify-center" style={{ background: '#0b1121' }}>
        <motion.div
          className="w-8 h-8 rounded-full border-2"
          style={{ borderColor: 'rgba(99,102,241,0.3)', borderTopColor: '#6366f1' }}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
        />
      </div>
    )
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
        background: '#0b1121',
        overflow: 'hidden',
      }}
    >
      {/* Top safe-area spacer */}
      <div style={{ height: 'env(safe-area-inset-top)', background: '#0b1121', flexShrink: 0 }} />
      <div className="flex-1 overflow-hidden relative" style={{ paddingBottom: showShell ? 'calc(64px + env(safe-area-inset-bottom))' : 0 }}>
        <Routes>
          <Route path="/auth" element={<AuthScreen />} />
          <Route path="/onboarding" element={<OnboardingScreen />} />
          <Route path="/" element={<HomeScreen />} />
          <Route path="/topics" element={<TopicMap />} />
          <Route path="/lesson/:id" element={<LessonPlayer />} />
          <Route path="/diagnostic/:id" element={<DiagnosticQuestion />} />
          <Route path="/feedback/:id" element={<MisconceptionFeedback />} />
          <Route path="/mastery" element={<MasteryScreen />} />
          <Route path="/mamo" element={<MamoChat />} />
          <Route path="/practical/:id" element={<PracticalScreen />} />
          <Route path="/settings" element={<SettingsScreen />} />
          <Route path="/privacy" element={<PrivacyPolicyScreen />} />
          <Route path="/terms" element={<TermsScreen />} />
          <Route path="*" element={<Navigate to={user ? '/' : '/auth'} replace />} />
        </Routes>
      </div>

      {showShell && (
        <>
          <FloatingMamo />
          <BottomNav />
        </>
      )}
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <AppShell />
      </HashRouter>
    </AuthProvider>
  )
}
