/**
 * AtomIcon — shared animated atom, drop-in for lucide-react's <Atom>.
 *
 * Usage:  <AtomIcon size={24} color="#a78bfa" />
 *         icon: AtomIcon   (component-reference slots in topics / settings)
 *
 * Size tiers
 *   ≥ 22px  → animated electrons via requestAnimationFrame
 *   <  22px → static atom (no rAF overhead for tiny list icons)
 *
 * Respects OS and in-app reduceMotion preference automatically.
 */
import { useEffect, useRef } from 'react'

// ─── Reduce-motion helper ─────────────────────────────────────────────────────
function getReduceMotion() {
  try {
    if (typeof window === 'undefined') return false
    const sysPref = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const appPref = !!JSON.parse(localStorage.getItem('neurophysics_prefs') || '{}').reduceMotion
    return sysPref || appPref
  } catch {
    return false
  }
}

// ─── Single electron travelling along a tilted ellipse ───────────────────────
function ElectronDot({ cx, cy, rx, ry, tiltDeg, speed, startAngle, dotR, fill }) {
  const ref = useRef(null)
  const tiltRad = tiltDeg * Math.PI / 180

  // Compute (x, y) on the tilted ellipse for a given angle
  const pos = (angle) => {
    const lx = rx * Math.cos(angle)
    const ly = ry * Math.sin(angle)
    return {
      x: cx + lx * Math.cos(tiltRad) - ly * Math.sin(tiltRad),
      y: cy + lx * Math.sin(tiltRad) + ly * Math.cos(tiltRad),
    }
  }

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let rafId, t0 = null

    const tick = (ts) => {
      if (!t0) t0 = ts
      const { x, y } = pos(startAngle + ((ts - t0) / 1000) * speed)
      el.setAttribute('cx', x)
      el.setAttribute('cy', y)
      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const { x: ix, y: iy } = pos(startAngle)
  return <circle ref={ref} cx={ix} cy={iy} r={dotR} fill={fill} opacity="0.92" />
}

// ─── Main export ──────────────────────────────────────────────────────────────
export default function AtomIcon({
  size = 24,
  color = '#a78bfa',   // orbit ring + electron colour
  reduceMotion,        // optional override; auto-detected if omitted
  // Lucide-compat props — accepted but unused
  strokeWidth, // eslint-disable-line
  ...rest
}) {
  const rm = reduceMotion !== undefined ? reduceMotion : getReduceMotion()
  const animated = !rm && size >= 22

  const cx = size / 2
  const cy = size / 2
  const rx  = size * 0.42           // semi-major axis
  const ry  = size * 0.155          // semi-minor axis
  const dotR = Math.max(1.5, size * 0.034)
  const nucR  = Math.max(1.8, size * 0.09)
  const strokeW = Math.max(0.7, size * 0.009)

  const orbits = [
    { tiltDeg:   0, speed: (2 * Math.PI) / 14, startAngle: 0 },
    { tiltDeg:  60, speed: (2 * Math.PI) / 10, startAngle: (2 * Math.PI) / 3 },
    { tiltDeg: -60, speed: (2 * Math.PI) /  8, startAngle: (4 * Math.PI) / 3 },
  ]

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{ overflow: 'visible', display: 'inline-block', verticalAlign: 'middle', flexShrink: 0 }}
      aria-hidden="true"
      {...rest}
    >
      {/* Static orbit rings */}
      {orbits.map((o, i) => (
        <ellipse
          key={i}
          cx={cx} cy={cy} rx={rx} ry={ry}
          fill="none"
          stroke={color}
          strokeWidth={strokeW}
          opacity="0.55"
          transform={`rotate(${o.tiltDeg} ${cx} ${cy})`}
        />
      ))}

      {/* Electrons — animated or static */}
      {orbits.map((o, i) => {
        if (animated) {
          return (
            <ElectronDot
              key={i}
              cx={cx} cy={cy} rx={rx} ry={ry}
              tiltDeg={o.tiltDeg}
              speed={o.speed}
              startAngle={o.startAngle}
              dotR={dotR}
              fill={color}
            />
          )
        }
        // Static: place dot at its start angle
        const tilt = o.tiltDeg * Math.PI / 180
        const lx = rx * Math.cos(o.startAngle)
        const ly = ry * Math.sin(o.startAngle)
        return (
          <circle
            key={i}
            cx={cx + lx * Math.cos(tilt) - ly * Math.sin(tilt)}
            cy={cy + lx * Math.sin(tilt) + ly * Math.cos(tilt)}
            r={dotR}
            fill={color}
            opacity="0.9"
          />
        )
      })}

      {/* Nucleus */}
      <circle cx={cx} cy={cy} r={nucR} fill={color} opacity="0.95" />
    </svg>
  )
}
