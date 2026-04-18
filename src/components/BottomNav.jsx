import { motion } from 'motion/react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Home, BookOpen, MessageCircle, Settings } from 'lucide-react'

const NAV_ITEMS = [
  { label: 'Home',     icon: Home,          path: '/' },
  { label: 'Learn',    icon: BookOpen,       path: '/learn' },
  { label: 'Mamo',     icon: MessageCircle,  path: '/mamo' },
  { label: 'Settings', icon: Settings,       path: '/settings' },
]

const ACTIVE_COLOR = 'var(--np-indigo)'

export default function BottomNav() {
  const navigate = useNavigate()
  const location = useLocation()

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/'
    if (path === '/learn') {
      // Highlight Learn for lesson, exam, practical, diagnostic, and feedback routes too
      return location.pathname.startsWith('/learn')
        || location.pathname.startsWith('/lesson/')
        || location.pathname.startsWith('/exam/')
        || location.pathname.startsWith('/practical/')
        || location.pathname.startsWith('/diagnostic/')
        || location.pathname.startsWith('/feedback/')
        || location.pathname.startsWith('/practice/')
    }
    return location.pathname.startsWith(path)
  }

  return (
    <div
      className="fixed bottom-0 z-50"
      style={{
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: 480,
        background: 'var(--np-card-deep)',
        borderTop: '1px solid var(--np-border)',
        backdropFilter: 'blur(28px)',
        WebkitBackdropFilter: 'blur(28px)',
        paddingBottom: 'var(--safe-bottom)',
        boxShadow: '0 -1px 0 rgba(255,255,255,0.04), 0 -8px 32px rgba(8,15,30,0.8)',
      }}
    >
      <div className="flex items-center justify-around px-2 py-2">
        {NAV_ITEMS.map((item) => {
          const active = isActive(item.path)
          return (
            <button
              key={item.path}
              className="flex flex-col items-center gap-1 px-5 py-2 rounded-[16px] relative"
              onClick={() => navigate(item.path)}
              aria-label={item.label}
              aria-current={active ? 'page' : undefined}
            >
              {active && (
                <motion.div
                  className="absolute inset-0 rounded-[16px]"
                  style={{ background: 'rgba(99,102,241,0.20)' }}
                  layoutId="nav-active"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <item.icon
                size={20}
                color={active ? ACTIVE_COLOR : 'rgba(255,255,255,0.25)'}
                strokeWidth={active ? 2.5 : 1.8}
                fill={active ? `${ACTIVE_COLOR}22` : 'none'}
              />
              <span
                style={{
                  fontSize: 10,
                  fontWeight: active ? 600 : 400,
                  color: active ? ACTIVE_COLOR : 'var(--np-text-dim)',
                }}
              >
                {item.label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
