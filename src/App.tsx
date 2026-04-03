import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useUser } from './context/UserContext';
import { NavBar } from './components/ui/NavBar';

const NAVBAR_ROUTES = ['/home', '/topics', '/equations', '/papers', '/settings'];

export function App() {
  const { isOnboarded } = useUser();
  const location = useLocation();

  if (!isOnboarded) {
    return <Navigate to="/onboarding" replace />;
  }

  const showNav = NAVBAR_ROUTES.some(r => location.pathname.startsWith(r));

  return (
    <>
      <Outlet />
      {showNav && <NavBar />}
    </>
  );
}
