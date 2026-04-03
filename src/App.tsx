import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from './context/UserContext';
import { useSettings } from './context/SettingsContext';
import { NavBar } from './components/ui/NavBar';

const NAVBAR_ROUTES = ['/home', '/review', '/topics', '/equations', '/papers', '/settings', '/achievements'];

const pageVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

export function App() {
  const { isOnboarded } = useUser();
  const location = useLocation();
  const { settings } = useSettings();

  if (!isOnboarded) {
    return <Navigate to="/onboarding" replace />;
  }

  const showNav = NAVBAR_ROUTES.some(r => location.pathname.startsWith(r));
  const noAnims = settings.animations === 'none';

  return (
    <>
      {/* Skip to main content link for keyboard / screen-reader users */}
      <a
        href="#main-content"
        className="skip-link"
      >
        Skip to content
      </a>

      <AnimatePresence mode="wait">
        <motion.div
          id="main-content"
          key={location.pathname}
          variants={noAnims ? undefined : pageVariants}
          initial={noAnims ? false : 'initial'}
          animate="animate"
          exit={noAnims ? undefined : 'exit'}
          transition={{ duration: 0.15, ease: 'easeOut' }}
          style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>
      {showNav && <NavBar />}
    </>
  );
}
