import { useLocation, useNavigate } from 'react-router-dom';
import { useHaptics } from '../../hooks/useHaptics';
import {
  IconHome, IconReview, IconTopics, IconPracticals,
  IconEquations, IconPapers, IconSettings,
} from './Icons';
import './NavBar.css';

type NavItem = {
  path: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement> & { size?: number }>;
  label: string;
};

const NAV_ITEMS: NavItem[] = [
  { path: '/home',       Icon: IconHome,       label: 'Home'       },
  { path: '/review',     Icon: IconReview,     label: 'Review'     },
  { path: '/topics',     Icon: IconTopics,     label: 'Topics'     },
  { path: '/practicals', Icon: IconPracticals, label: 'Practicals' },
  { path: '/equations',  Icon: IconEquations,  label: 'Equations'  },
  { path: '/papers',     Icon: IconPapers,     label: 'Papers'     },
  { path: '/settings',   Icon: IconSettings,   label: 'Settings'   },
];

export function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { lightTap } = useHaptics();

  return (
    <nav className="navbar safe-bot" role="navigation" aria-label="Main navigation">
      {NAV_ITEMS.map(item => {
        const active = location.pathname === item.path;
        return (
          <button
            key={item.path}
            className={`navbar-item${active ? ' navbar-item--active' : ''}`}
            onClick={() => { lightTap(); navigate(item.path); }}
            aria-label={item.label}
            aria-current={active ? 'page' : undefined}
          >
            <span className="navbar-icon-wrap" aria-hidden="true">
              <item.Icon size={20} className="navbar-icon" />
            </span>
            <span className="navbar-label">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
