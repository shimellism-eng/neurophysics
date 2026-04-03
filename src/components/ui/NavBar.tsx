import { useLocation, useNavigate } from 'react-router-dom';
import './NavBar.css';

const NAV_ITEMS = [
  { path: '/home',      icon: '⚡', label: 'Home'      },
  { path: '/topics',    icon: '📚', label: 'Topics'    },
  { path: '/equations', icon: '∑',  label: 'Equations' },
  { path: '/papers',    icon: '📝', label: 'Papers'    },
  { path: '/settings',  icon: '⚙',  label: 'Settings'  },
];

export function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="navbar safe-bot" role="navigation" aria-label="Main navigation">
      {NAV_ITEMS.map(item => {
        const active = location.pathname === item.path;
        return (
          <button
            key={item.path}
            className={`navbar-item${active ? ' navbar-item--active' : ''}`}
            onClick={() => navigate(item.path)}
            aria-label={item.label}
            aria-current={active ? 'page' : undefined}
          >
            <span className="navbar-icon" aria-hidden="true">{item.icon}</span>
            <span className="navbar-label">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
