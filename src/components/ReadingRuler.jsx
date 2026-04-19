import { useEffect, useRef, useState } from 'react'
import { useComfort } from '../context/ComfortContext'

const COLOUR_MAP = {
  yellow: 'rgba(255,249,180,0.38)',
  blue:   'rgba(180,220,255,0.32)',
  pink:   'rgba(255,200,220,0.32)',
  green:  'rgba(200,240,210,0.32)',
}

const MIN_H = 16
const MAX_H = 96
const DEFAULT_H = 44

export default function ReadingRuler() {
  const { prefs } = useComfort()
  const [y, setY] = useState(() => {
    if (typeof window === 'undefined') return 200
    try { return Number(localStorage.getItem('np_ruler_y')) || Math.round(window.innerHeight * 0.4) } catch { return 200 }
  })
  const [height, setHeight] = useState(() => {
    try { return Number(localStorage.getItem('np_ruler_h')) || DEFAULT_H } catch { return DEFAULT_H }
  })

  const dragging = useRef(false)
  const dragStartY = useRef(0)
  const dragStartRulerY = useRef(0)

  // Persist position + height
  useEffect(() => {
    try { localStorage.setItem('np_ruler_y', y) } catch {}
  }, [y])
  useEffect(() => {
    try { localStorage.setItem('np_ruler_h', height) } catch {}
  }, [height])

  // ── Handle drag (mouse + touch) ───────────────────────────────────────────
  const onPointerDown = (e) => {
    e.preventDefault()
    dragging.current = true
    dragStartY.current = e.clientY ?? e.touches?.[0]?.clientY ?? 0
    dragStartRulerY.current = y
  }

  useEffect(() => {
    const onMove = (e) => {
      if (!dragging.current) return
      const clientY = e.clientY ?? e.touches?.[0]?.clientY ?? dragStartY.current
      const delta = clientY - dragStartY.current
      setY(prev => {
        const next = dragStartRulerY.current + delta
        return Math.max(0, Math.min(window.innerHeight - height, next))
      })
    }
    const onUp = () => { dragging.current = false }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    window.addEventListener('touchmove', onMove, { passive: true })
    window.addEventListener('touchend', onUp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
      window.removeEventListener('touchmove', onMove)
      window.removeEventListener('touchend', onUp)
    }
  }, [height])

  const thinner = () => setHeight(h => Math.max(MIN_H, h - 8))
  const wider   = () => setHeight(h => Math.min(MAX_H, h + 8))

  if (!prefs.readingRuler) return null

  const bg = COLOUR_MAP[prefs.colourOverlay] || COLOUR_MAP.yellow

  return (
    <>
      {/* Ruler bar — pointer-events: none so it never blocks content */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: y,
          left: 0,
          right: 0,
          height,
          background: bg,
          pointerEvents: 'none',
          zIndex: 9000,
          borderTop: '1px solid rgba(255,255,255,0.10)',
          borderBottom: '1px solid rgba(255,255,255,0.10)',
        }}
      />

      {/* Handle — right edge, pointer-events: auto */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: y,
          right: 0,
          width: 36,
          height,
          zIndex: 9001,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'grab',
          touchAction: 'none',
          userSelect: 'none',
        }}
        onMouseDown={onPointerDown}
        onTouchStart={onPointerDown}
      >
        {/* Thinner button */}
        <button
          onMouseDown={e => e.stopPropagation()}
          onTouchStart={e => e.stopPropagation()}
          onClick={thinner}
          aria-label="Make ruler thinner"
          style={{
            width: 28, height: 18,
            background: 'rgba(0,0,0,0.45)',
            border: '1px solid rgba(255,255,255,0.18)',
            borderRadius: '0 0 6px 6px',
            color: 'rgba(255,255,255,0.7)',
            fontSize: 11, fontWeight: 800, lineHeight: 1,
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}
        >−</button>

        {/* Drag grip dots */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'center', flex: 1, justifyContent: 'center' }}>
          {[0,1,2].map(i => (
            <div key={i} style={{ width: 3, height: 3, borderRadius: 999, background: 'rgba(0,0,0,0.5)' }} />
          ))}
        </div>

        {/* Wider button */}
        <button
          onMouseDown={e => e.stopPropagation()}
          onTouchStart={e => e.stopPropagation()}
          onClick={wider}
          aria-label="Make ruler wider"
          style={{
            width: 28, height: 18,
            background: 'rgba(0,0,0,0.45)',
            border: '1px solid rgba(255,255,255,0.18)',
            borderRadius: '6px 6px 0 0',
            color: 'rgba(255,255,255,0.7)',
            fontSize: 11, fontWeight: 800, lineHeight: 1,
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}
        >+</button>
      </div>
    </>
  )
}
