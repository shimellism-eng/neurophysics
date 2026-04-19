import { useNavigate } from 'react-router-dom'
import AtomIcon from './AtomIcon'

export default function PublicHeader() {
  const navigate = useNavigate()

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        height: 56,
        background: 'rgba(10,10,15,0.95)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 16,
        paddingRight: 16,
      }}
    >
      {/* Logo */}
      <button
        onClick={() => navigate('/')}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
        }}
      >
        <AtomIcon size={22} color="#6366f1" />
        <span
          style={{
            color: '#fff',
            fontWeight: 700,
            fontSize: 16,
            letterSpacing: '-0.02em',
            fontFamily: 'inherit',
          }}
        >
          NeuroPhysics
        </span>
      </button>

      {/* Nav actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <button
          onClick={() => navigate('/auth')}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'rgba(255,255,255,0.75)',
            fontSize: 14,
            fontWeight: 500,
            fontFamily: 'inherit',
            padding: '6px 10px',
          }}
        >
          Sign in
        </button>
        <button
          onClick={() => navigate('/auth')}
          style={{
            background: '#6366f1',
            border: 'none',
            cursor: 'pointer',
            color: '#0a0a0f',
            fontSize: 14,
            fontWeight: 700,
            fontFamily: 'inherit',
            padding: '7px 16px',
            borderRadius: 9999,
            letterSpacing: '-0.01em',
            whiteSpace: 'nowrap',
          }}
        >
          Start free →
        </button>
      </div>
    </header>
  )
}
