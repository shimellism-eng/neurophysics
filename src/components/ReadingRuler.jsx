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

  const [y, setY] = useState(() =>
    load('np_ruler_y', typeof window !== 'undefined' ? Math.round(window.innerHeight * 0.38) : 200)
  )
  const [height, setHeight] = useState(() => load('np_ruler_h', DEFAULT_H))

  const rulerRef   = useRef(null)
  const dragging   = useRef(false)
  const startCY    = useRef(0)
  const startRuler = useRef(0)

  // Persist
  useEffect(() => { save('np_ruler_y', y) }, [y])
  useEffect(() => { save('np_ruler_h', height) }, [height])

  // ── Native listeners on the ruler bar (passive:false required for preventDefault) ──
  useEffect(() => {
    const el = rulerRef.current
    if (!el) return

    const onStart = (e) => {
      e.preventDefault()                          // stops iOS scroll taking over
      dragging.current  = true
      startCY.current   = e.touches ? e.touches[0].clientY : e.clientY
      // read current ruler Y from element top (avoids stale closure)
      startRuler.current = parseInt(el.style.top, 10) || 0
    }

    el.addEventListener('mousedown',  onStart, { passive: false })
    el.addEventListener('touchstart', onStart, { passive: false })
    return () => {
      el.removeEventListener('mousedown',  onStart)
      el.removeEventListener('touchstart', onStart)
    }
  }, [])   // mount/unmount only — reads live values via refs

  // ── Global move / up (window-level so drag works outside the element) ──
  useEffect(() => {
    const onMove = (e) => {
      if (!dragging.current) return
      if (e.cancelable) e.preventDefault()
      const cy   = e.touches ? e.touches[0].clientY : e.clientY
      const next = startRuler.current + (cy - startCY.current)
      setY(Math.max(0, Math.min(window.innerHeight - height, next)))
    }
    const onUp = () => { dragging.current = false }

    window.addEventListener('mousemove',  onMove, { passive: false })
    window.addEventListener('mouseup',    onUp)
    window.addEventListener('touchmove',  onMove, { passive: false })
    window.addEventListener('touchend',   onUp)
    return () => {
      window.removeEventListener('mousemove',  onMove)
      window.removeEventListener('mouseup',    onUp)
      window.removeEventListener('touchmove',  onMove)
      window.removeEventListener('touchend',   onUp)
    }
  }, [height])

  const thinner = () => setHeight(h => Math.max(MIN_H, h - STEP_H))
  const wider   = () => setHeight(h => Math.min(MAX_H, h + STEP_H))

  if (!prefs.readingRuler) return null

  const bg = COLOUR_MAP[prefs.colourOverlay] || COLOUR_MAP.yellow

  const btnStyle = {
    width: 44, height: 44,
    borderRadius: 12,
    background: 'rgba(10,16,34,0.85)',
    border: '1px solid rgba(255,255,255,0.22)',
    color: 'rgba(255,255,255,0.9)',
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
      {/* Ruler bar */}
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
          borderTop:    '1.5px solid rgba(255,255,255,0.15)',
          borderBottom: '1.5px solid rgba(255,255,255,0.15)',
          cursor: 'grab',
          touchAction: 'none',
          userSelect: 'none',
        }}
      >
        {/* Grip indicator */}
        <div style={{
          position: 'absolute', left: '50%', top: '50%',
          transform: 'translate(-50%,-50%)',
          display: 'flex', flexDirection: 'column', gap: 4,
          pointerEvents: 'none',
        }}>
          {[0,1].map(i => (
            <div key={i} style={{ width: 28, height: 2, borderRadius: 999, background: 'rgba(0,0,0,0.25)' }} />
          ))}
        </div>
      </div>

      {/* +/- controls — float outside the ruler so always tappable */}
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
