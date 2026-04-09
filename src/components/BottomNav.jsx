import { motion } from 'motion/react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Home, Map, Star, Settings } from 'lucide-react'

const NAV_ITEMS = [
  { label: 'Home',     icon: Home,     path: '/' },
  { label: 'Topics',   icon: Map,      path: '/topics' },
  { label: 'Mastery',  icon: Star,     path: '/mastery' },
  { label: 'Settings', icon: Settings, path: '/settings' },
]

const ACTIVE_COLOR = '#818cf8'

export default function BottomNav() {
  const navigate = useNavigate()
  const location = useLocation()

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/'
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
        background: 'rgba(8,15,30,0.96)',
        borderTop: '1px solid rgba(255,255,255,0.07)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
    >
      <div className="flex items-center justify-around px-2 py-2">
        {NAV_ITEMS.map((item) => {
          const active = isActive(item.path)
          return (
            <button
              key={item.path}
              className="flex flex-col items-center gap-1 px-4 py-2 rounded-[14px] relative"
              onClick={() => navigate(item.path)}
            >
              {/* Active pill indicator */}
              {active && (
                <motion.div
                  className="absolute inset-0 rounded-[14px]"
                  style={{ background: 'rgba(99,102,241,0.14)' }}
                  layoutId="nav-active"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              {/* Active dot above icon */}
              <div style={{ height: 3, width: 20, marginBottom: 2 }}>
                {active && (
                  <motion.div
                    className="mx-auto h-full rounded-full"
                    style={{ background: ACTIVE_COLOR, width: 20 }}
                    layoutId="nav-dot"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </div>
              <item.icon
                size={22}
                color={active ? ACTIVE_COLOR : 'rgba(255,255,255,0.25)'}
                strokeWidth={active ? 2.5 : 1.8}
              />
              <span
                className="text-[10px] font-semibold"
                style={{ color: active ? ACTIVE_COLOR : 'rgba(255,255,255,0.25)' }}
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
