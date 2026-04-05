import { motion } from 'motion/react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Home, Map, Star, Settings } from 'lucide-react'

const NAV_ITEMS = [
  { label: 'Home', icon: Home, path: '/' },
  { label: 'Topics', icon: Map, path: '/topics' },
  { label: 'Mastery', icon: Star, path: '/mastery' },
  { label: 'Settings', icon: Settings, path: '/settings' },
]

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
        background: 'rgba(11,17,33,0.92)',
        borderTop: '0.75px solid #1d293d',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
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
              {active && (
                <motion.div
                  className="absolute inset-0 rounded-[14px]"
                  style={{ background: 'rgba(21,93,252,0.12)' }}
                  layoutId="nav-active"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <item.icon
                size={22}
                color={active ? '#155dfc' : '#90a1b9'}
                strokeWidth={active ? 2.5 : 1.8}
              />
              <span className="text-xs font-medium" style={{ color: active ? '#155dfc' : '#90a1b9' }}>
                {item.label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
