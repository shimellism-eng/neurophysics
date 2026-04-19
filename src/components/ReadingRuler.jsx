import { useEffect, useRef, useState } from 'react'
import { useComfort } from '../context/ComfortContext'

const COLOUR_MAP = {
  yellow: 'rgba(255,249,180,0.45)',
  blue:   'rgba(180,220,255,0.40)',
  pink:   'rgba(255,200,220,0.40)',
  green:  'rgba(200,240,210,0.40)',
}

const MIN_H = 20
const MAX_H = 120
const STEP_H = 10
const DEFAULT_H = 44

function load(key, fallback) {
  try { const v = Number(localStorage.getItem(key)); return isNaN(v) || v === 0 ? fallback : v } catch { return fallback }
}
function save(key, val) { try { localStorage.setItem(key, val) } catch {} }

export default function ReadingRuler() {
  const { prefs } = useComfort()

  const [y, setY] = useState(() => load('np_ruler_y', typeof window !== 'undefined' ? Math.round(window.innerHeight * 0.38) : 200))
  const [height, setHeight] = useState(() => load('np_ruler_h', DEFAULT_H))

  const dragging   = useRef(false)
  const startY     = useRef(0)
  const startRuler = useRef(0)

  useEffect(() => { save('np_ruler_y', y) }, [y])
  useEffect(() => { save('np_ruler_h', height) }, [height])

  // ── Global move/up listeners ──────────────────────────────────────────────
  useEffect(() => {
    const move = (e) => {
      if (!dragging.current) return
      const cy = e.touches ? e.touches[0].clientY : e.clientY
      const next = startRuler.current + (cy - startY.current)
      setY(Math.max(0, Math.min(window.innerHeight - height, next)))
    }
    const up = () => { dragging.current = false }

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseup', up)
    window.addEventListener('touchmove', move, { passive: false })
    window.addEventListener('touchend', up)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseup', up)
      window.removeEventListener('touchmove', move)
      window.removeEventListener('touchend', up)
    }
  }, [height])

  const beginDrag = (e) => {
    // Don't start drag when tapping the +/- buttons
    if (e.target.closest('[data-ruler-btn]')) return
    e.preventDefault()
    dragging.current = true
    startY.current     = e.touches ? e.touches[0].clientY : e.clientY
    startRuler.current = y
  }

  const thinner = () => setHeight(h => Math.max(MIN_H, h - STEP_H))
  const wider   = () => setHeight(h => Math.min(MAX_H, h + STEP_H))

  if (!prefs.readingRuler) return null

  const bg = COLOUR_MAP[prefs.colourOverlay] || COLOUR_MAP.yellow
  const btnStyle = {
    width: 44, height: 44,
    borderRadius: 12,
    background: 'rgba(10,16,34,0.82)',
    border: '1px solid rgba(255,255,255,0.20)',
    color: 'rgba(255,255,255,0.85)',
    fontSize: 20, fontWeight: 800, lineHeight: 1,
    cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    flexShrink: 0,
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
    touchAction: 'manipulation',
  }

  return (
    <>
      {/* ── Ruler bar — full width, draggable ── */}
      <div
        aria-hidden="true"
        onMouseDown={beginDrag}
        onTouchStart={beginDrag}
        style={{
          position: 'fixed',
          top: y,
          left: 0,
          right: 60,          // leave room for control buttons on the right
          height,
          background: bg,
          zIndex: 9000,
          borderTop: '1.5px solid rgba(255,255,255,0.14)',
          borderBottom: '1.5px solid rgba(255,255,255,0.14)',
          cursor: 'grab',
          touchAction: 'none',
          userSelect: 'none',
        }}
      >
        {/* Subtle grip lines in the middle */}
        <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', display: 'flex', flexDirection: 'column', gap: 4, pointerEvents: 'none' }}>
          {[0,1].map(i => (
            <div key={i} style={{ width: 32, height: 2, borderRadius: 999, background: 'rgba(0,0,0,0.22)' }} />
          ))}
        </div>
      </div>

      {/* ── Control buttons — always outside the ruler, always tappable ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: y + height / 2 - 48,   // vertically centred on the ruler
          right: 8,
          zIndex: 9001,
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
        }}
      >
        <button data-ruler-btn onClick={thinner} aria-label="Make ruler thinner" style={btnStyle}>−</button>
        <button data-ruler-btn onClick={wider}   aria-label="Make ruler wider"   style={btnStyle}>+</button>
      </div>
    </>
  )
}
