import { motion } from 'motion/react'
import { useNavigate, useLocation } from 'react-router-dom'
import { House, BookOpen, ChatCircle, Gear } from '@phosphor-icons/react'

const NAV_ITEMS = [
  { label: 'Home',     Icon: House,       path: '/' },
  { label: 'Learn',    Icon: BookOpen,    path: '/learn' },
  { label: 'Mamo',     Icon: ChatCircle,  path: '/mamo' },
  { label: 'Settings', Icon: Gear,        path: '/settings' },
]

export default function BottomNav() {
  const navigate = useNavigate()
  const location = useLocation()

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/'
    if (path === '/learn') {
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
        background: 'rgba(8,15,30,0.82)',
        borderTop: '0.75px solid var(--np-border)',
        backdropFilter: 'blur(var(--np-glass-blur)) saturate(180%)',
        WebkitBackdropFilter: 'blur(var(--np-glass-blur)) saturate(180%)',
        paddingBottom: 'var(--safe-bottom)',
        boxShadow: '0 -1px 0 rgba(255,255,255,0.04), 0 -8px 32px rgba(8,15,30,0.8)',
      }}
    >
      <div className="flex items-center justify-around px-2" style={{ minHeight: 'var(--nav-height)' }}>
        {NAV_ITEMS.map(({ label, Icon, path }) => {
          const active = isActive(path)
          return (
            <button
              key={path}
              className="flex flex-col items-center justify-center relative"
              style={{ minWidth: 72, height: 52, gap: 4 }}
              onClick={() => navigate(path)}
              aria-label={label}
              aria-current={active ? 'page' : undefined}
            >
              <Icon
                size={22}
                weight={active ? 'fill' : 'regular'}
                color={active ? '#6366f1' : 'rgba(255,255,255,0.35)'}
              />

              {/* Small indigo dot under active icon */}
              {active && (
                <motion.div
                  layoutId="nav-dot"
                  style={{
                    width: 4,
                    height: 4,
                    borderRadius: '50%',
                    background: '#6366f1',
                    position: 'absolute',
                    bottom: 6,
                  }}
                  transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
