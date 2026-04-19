import { useEffect, useRef, useState } from 'react'
import { useComfort } from '../context/ComfortContext'

const COLOUR_MAP = {
  yellow: 'rgba(255,249,180,0.38)',
  blue:   'rgba(180,220,255,0.32)',
  pink:   'rgba(255,200,220,0.32)',
  green:  'rgba(200,240,210,0.32)',
}

const RULER_HEIGHT = 44 // ~2 line-heights at 1.7

export default function ReadingRuler() {
  const { prefs } = useComfort()
  const [y, setY] = useState(null)
  const isMobile = useRef(typeof window !== 'undefined' && 'ontouchstart' in window)
  const touchStartY = useRef(null)
  const rulerY = useRef(null)

  // Desktop: follow mouse Y
  useEffect(() => {
    if (isMobile.current) return
    const onMove = (e) => setY(e.clientY - RULER_HEIGHT / 2)
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  // Mobile: start at 40% viewport height; drag the ruler bar to reposition
  useEffect(() => {
    if (!isMobile.current) return
    if (y === null) setY(window.innerHeight * 0.4 - RULER_HEIGHT / 2)
  }, [])

  const onTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY
    rulerY.current = y
  }
  const onTouchMove = (e) => {
    if (touchStartY.current === null) return
    const delta = e.touches[0].clientY - touchStartY.current
    setY(Math.max(0, Math.min(window.innerHeight - RULER_HEIGHT, rulerY.current + delta)))
  }
  const onTouchEnd = () => { touchStartY.current = null }

  if (!prefs.readingRuler || y === null) return null

  const bg = COLOUR_MAP[prefs.colourOverlay] || COLOUR_MAP.yellow

  return (
    <div
      aria-hidden="true"
      onTouchStart={isMobile.current ? onTouchStart : undefined}
      onTouchMove={isMobile.current ? onTouchMove : undefined}
      onTouchEnd={isMobile.current ? onTouchEnd : undefined}
      style={{
        position: 'fixed',
        top: y,
        left: 0,
        right: 0,
        height: RULER_HEIGHT,
        background: bg,
        pointerEvents: isMobile.current ? 'auto' : 'none',
        zIndex: 9000,
        borderTop: '1px solid rgba(255,255,255,0.08)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        touchAction: 'none',
        cursor: isMobile.current ? 'grab' : 'none',
      }}
    />
  )
}
