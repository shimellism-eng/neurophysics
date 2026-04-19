import { useEffect, useRef, useState, useCallback } from 'react'
import { useComfort } from '../context/ComfortContext'

// Opaque enough to be visible on the dark #080f1e background
const COLOUR_MAP = {
  yellow: 'rgba(255,240,80,0.55)',
  blue:   'rgba(100,180,255,0.45)',
  pink:   'rgba(255,130,180,0.45)',
  green:  'rgba(80,220,140,0.45)',
}
const DEFAULT_BG = 'rgba(255,240,80,0.55)'

const MIN_H    = 20
const MAX_H    = 120
const STEP_H   = 10
const DEFAULT_H = 44

function load(key, fallback) {
  try { const v = Number(localStorage.getItem(key)); return (isNaN(v) || v === 0) ? fallback : v } catch { return fallback }
}
function save(key, val) { try { localStorage.setItem(key, val) } catch {} }

export default function ReadingRuler() {
  const { prefs } = useComfort()

  const [y, setY] = useState(() =>
    load('np_ruler_y', typeof window !== 'undefined' ? Math.round(window.innerHeight * 0.38) : 200)
  )
  const [height, setHeight] = useState(() => load('np_ruler_h', DEFAULT_H))

  // yRef stays in sync so native listeners never see stale state
  const yRef      = useRef(y)
  const rulerRef  = useRef(null)
  const dragging  = useRef(false)
  const startCY   = useRef(0)
  const startRulerY = useRef(0)

  const updateY = useCallback((newY) => {
    yRef.current = newY
    setY(newY)
  }, [])

  useEffect(() => { save('np_ruler_y', y) }, [y])
  useEffect(() => { save('np_ruler_h', height) }, [height])

  // Native touchstart/mousedown on the ruler element — passive:false so preventDefault works
  useEffect(() => {
    const el = rulerRef.current
    if (!el) return
    const onStart = (e) => {
      e.preventDefault()
      dragging.current    = true
      startCY.current     = e.touches ? e.touches[0].clientY : e.clientY
      startRulerY.current = yRef.current   // always fresh via ref
    }
    el.addEventListener('mousedown',  onStart, { passive: false })
    el.addEventListener('touchstart', onStart, { passive: false })
    return () => {
      el.removeEventListener('mousedown',  onStart)
      el.removeEventListener('touchstart', onStart)
    }
  }, [])

  // Window-level move + up
  useEffect(() => {
    const onMove = (e) => {
      if (!dragging.current) return
      if (e.cancelable) e.preventDefault()
      const cy   = e.touches ? e.touches[0].clientY : e.clientY
      const next = startRulerY.current + (cy - startCY.current)
      updateY(Math.max(0, Math.min(window.innerHeight - height, next)))
    }
    const onUp = () => { dragging.current = false }
    window.addEventListener('mousemove', onMove, { passive: false })
    window.addEventListener('mouseup',   onUp)
    window.addEventListener('touchmove', onMove, { passive: false })
    window.addEventListener('touchend',  onUp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup',   onUp)
      window.removeEventListener('touchmove', onMove)
      window.removeEventListener('touchend',  onUp)
    }
  }, [height, updateY])

  const thinner = () => setHeight(h => Math.max(MIN_H, h - STEP_H))
  const wider   = () => setHeight(h => Math.min(MAX_H, h + STEP_H))

  if (!prefs.readingRuler) return null

  const bg = COLOUR_MAP[prefs.colourOverlay] ?? DEFAULT_BG

  const btnStyle = {
    width: 44, height: 44,
    borderRadius: 12,
    background: 'rgba(10,16,34,0.88)',
    border: '1px solid rgba(255,255,255,0.25)',
    color: 'rgba(255,255,255,0.92)',
    fontSize: 22, fontWeight: 800, lineHeight: 1,
    cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    boxShadow: '0 2px 10px rgba(0,0,0,0.5)',
    touchAction: 'manipulation',
    flexShrink: 0,
  }

  return (
    <>
      {/* Ruler bar — full width minus button gutter */}
      <div
        ref={rulerRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: y,
          left: 0,
          right: 60,
          height,
          background: bg,
          zIndex: 9000,
          cursor: 'grab',
          touchAction: 'none',
          userSelect: 'none',
          // Visible border on both edges
          borderTop:    '2px solid rgba(255,255,255,0.35)',
          borderBottom: '2px solid rgba(255,255,255,0.35)',
          // Subtle drag-hint lines inside
          backgroundImage: 'repeating-linear-gradient(transparent, transparent 50%, rgba(0,0,0,0.06) 50%, rgba(0,0,0,0.06) 100%)',
          backgroundSize: '100% 8px',
        }}
      />

      {/* −/+ controls, centred on the ruler, outside its width so always tappable */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: y + height / 2 - 47,
          right: 8,
          zIndex: 9001,
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
        }}
      >
        <button onClick={thinner} aria-label="Make ruler thinner" style={btnStyle}>−</button>
        <button onClick={wider}   aria-label="Make ruler wider"   style={btnStyle}>+</button>
      </div>
    </>
  )
}
