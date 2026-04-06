import { motion } from 'motion/react'
import { useState, useEffect } from 'react'
import { ArrowRight, ArrowLeft, ArrowUp, ArrowDown, Scale, Gauge, Activity, TrendingDown } from 'lucide-react'
import { IdeaCaption, RealityBadge, FormulaBox, LabelledArrow } from './visuals-helpers'

const FC = '#00a8e8'

// ─── 23. Force Interactions ──────────────────────────────────────────────────
function ForceInteractionsLesson() {
  const [mode, setMode] = useState('balanced')
  const balanced = mode === 'balanced'
  // Arrow lengths
  const arrLen = 38
  const thrustLen = balanced ? arrLen : 60
  const fricLen = balanced ? arrLen : 28
  return (
    <div className="w-full h-full flex flex-col items-center justify-start gap-2 px-3 py-2" style={{ background: '#0b1121' }}>
      {/* Toggle */}
      <div className="flex gap-2">
        {['balanced', 'unbalanced'].map(m => (
          <button key={m} onClick={() => setMode(m)}
            className="px-3 py-1 rounded-[8px] text-xs font-semibold capitalize"
            style={{ background: mode === m ? `${FC}22` : '#1d293d', color: mode === m ? FC : '#a8b8cc', border: `1px solid ${mode === m ? FC : '#1d293d'}` }}>
            {m.charAt(0).toUpperCase() + m.slice(1)}
          </button>
        ))}
      </div>
      {/* SVG Free Body Diagram */}
      <svg width="260" height="178" viewBox="0 0 260 178">
        {/* Ground line */}
        <line x1="20" y1="122" x2="240" y2="122" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
        {/* Hatch marks for ground */}
        {[30,55,80,105,130,155,180,205,230].map(x => (
          <line key={x} x1={x} y1="122" x2={x - 8} y2="132" stroke="#334155" strokeWidth="1" />
        ))}
        {/* Object rectangle sitting on ground */}
        <rect x="104" y="82" width="52" height="40" rx="5" fill="#1d293d" stroke={FC} strokeWidth="1.5" />
        <text x="130" y="107" textAnchor="middle" fill={FC} fontSize={10} fontWeight="bold">object</text>

        {/* Normal force  -  UP */}
        <line x1="130" y1="82" x2="130" y2={82 - arrLen} stroke="#00bc7d" strokeWidth="2.5" strokeLinecap="round" />
        <polygon points={`124,${82 - arrLen + 2} 136,${82 - arrLen + 2} 130,${82 - arrLen - 8}`} fill="#00bc7d" />
        <text x="130" y={82 - arrLen - 14} fill="#00bc7d" fontSize={9} fontWeight="bold" textAnchor="middle">N (up)</text>

        {/* Weight  -  DOWN */}
        <line x1="130" y1="122" x2="130" y2={122 + arrLen} stroke="#fdc700" strokeWidth="2.5" strokeLinecap="round" />
        <polygon points={`124,${122 + arrLen - 2} 136,${122 + arrLen - 2} 130,${122 + arrLen + 8}`} fill="#fdc700" />
        <text x="136" y={122 + arrLen / 2 + 4} fill="#fdc700" fontSize={9} fontWeight="bold">W=mg</text>

        {/* Friction  -  LEFT */}
        <motion.g animate={{ x: 0 }} key={`fric-${balanced}`}>
          <line x1="104" y1="102" x2={104 - fricLen} y2="102" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />
          <polygon points={`${104 - fricLen + 2},96 ${104 - fricLen + 2},108 ${104 - fricLen - 8},102`} fill="#ef4444" />
          <text x={104 - fricLen - 12} y="97" fill="#ef4444" fontSize={9} fontWeight="bold" textAnchor="middle">Fr</text>
        </motion.g>

        {/* Thrust  -  RIGHT */}
        <motion.g animate={{ x: 0 }} key={`thrust-${balanced}`}>
          <line x1="156" y1="102" x2={156 + thrustLen} y2="102" stroke={FC} strokeWidth="2.5" strokeLinecap="round" />
          <polygon points={`${156 + thrustLen - 2},96 ${156 + thrustLen - 2},108 ${156 + thrustLen + 8},102`} fill={FC} />
          <text x={156 + thrustLen + 14} y="97" fill={FC} fontSize={9} fontWeight="bold" textAnchor="middle">T</text>
        </motion.g>

        {/* Net force arrow for unbalanced */}
        {!balanced && (
          <g>
            <line x1="130" y1="68" x2="172" y2="68" stroke="#facc15" strokeWidth="2" strokeDasharray="4 2" strokeLinecap="round" />
            <polygon points="168,63 168,73 180,68" fill="#facc15" />
            <text x="140" y="62" fill="#facc15" fontSize={9} fontWeight="bold">Fnet → a = F/m</text>
          </g>
        )}

        {/* Bottom caption */}
        <text x="130" y="172" textAnchor="middle" fill="#a8b8cc" fontSize={8}>
          {balanced ? 'Balanced → a = 0 (rest or constant velocity)' : 'Unbalanced → resultant force → acceleration'}
        </text>
      </svg>
    </div>
  )
}
function ForceInteractionsIdea() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 p-4">
      <div className="flex gap-3 text-xs">
        <div className="flex flex-col items-center gap-1 p-2 rounded-[8px]" style={{ background: `${FC}10`, border: `1px solid ${FC}` }}>
          <span className="font-bold" style={{ color: FC }}>Speed</span>
          <span style={{ color: '#ef4444' }}>= vector</span>
          <span style={{ color: '#a8b8cc' }}>60 mph →?</span>
        </div>
        <div className="flex flex-col items-center gap-1 p-2 rounded-[8px]" style={{ background: '#c084fc10', border: '1px solid #c084fc' }}>
          <span className="font-bold" style={{ color: '#c084fc' }}>Velocity</span>
          <span style={{ color: '#a8b8cc' }}>= vector</span>
          <span style={{ color: '#cad5e2' }}>60 mph N</span>
        </div>
      </div>
      <IdeaCaption>Speed is a vector because it tells you how fast something is going in a direction</IdeaCaption>
    </div>
  )
}
function ForceInteractionsReality() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-4">
      <div className="flex gap-3">
        <div className="flex flex-col gap-1 p-2 rounded-[8px]" style={{ background: `${FC}10`, border: `1px solid ${FC}` }}>
          <span className="text-xs font-bold" style={{ color: FC }}>Vectors</span>
          {['Force', 'Velocity', 'Acceleration', 'Displacement', 'Momentum'].map(v => (
            <span key={v} className="text-xs" style={{ color: '#cad5e2' }}>{v}</span>
          ))}
        </div>
        <div className="flex flex-col gap-1 p-2 rounded-[8px]" style={{ background: '#1d293d' }}>
          <span className="text-xs font-bold" style={{ color: '#a8b8cc' }}>Scalars</span>
          {['Speed', 'Distance', 'Mass', 'Time', 'Energy'].map(s => (
            <span key={s} className="text-xs" style={{ color: '#cad5e2' }}>{s}</span>
          ))}
        </div>
      </div>
      <RealityBadge color={FC}>Speed is a scalar - velocity is the vector (speed + direction)</RealityBadge>
    </div>
  )
}

// ─── 24. Work Done ───────────────────────────────────────────────────────────
function WorkDoneLesson() {
  const [force, setForce] = useState(10)
  const [dist, setDist] = useState(5)
  const work = force * dist
  // Box x-position scales with distance for visual
  const boxX = 14 + Math.round((dist / 10) * 120)
  return (
    <div className="w-full h-full flex flex-col justify-center gap-2 px-3 py-2" style={{ background: '#0b1121' }}>
      {/* Diagram */}
      <svg width="260" height="108" viewBox="0 0 260 108">
        {/* Ground */}
        <line x1="14" y1="88" x2="246" y2="88" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
        {[30,55,80,105,130,155,180,205,230].map(x => (
          <line key={x} x1={x} y1="88" x2={x - 7} y2="96" stroke="#334155" strokeWidth="1" />
        ))}
        {/* Box */}
        <motion.g animate={{ x: boxX - 14 }} transition={{ duration: 0.35 }}>
          <rect x="14" y="58" width="42" height="30" rx="5" fill="#1d293d" stroke={FC} strokeWidth="1.5" />
          <text x="35" y="78" textAnchor="middle" fill={FC} fontSize={9} fontWeight="bold">box</text>
        </motion.g>
        {/* Force arrow from box edge */}
        <motion.g animate={{ x: boxX - 14 }} transition={{ duration: 0.35 }}>
          <line x1="56" y1="73" x2="90" y2="73" stroke={FC} strokeWidth="2.5" strokeLinecap="round" />
          <polygon points="86,68 86,78 98,73" fill={FC} />
          <text x="73" y="66" textAnchor="middle" fill={FC} fontSize={9} fontWeight="bold">F={force}N</text>
        </motion.g>
        {/* Distance dashed arrow beneath */}
        <line x1="14" y1="100" x2={14 + boxX} y2="100" stroke="#fdc700" strokeWidth="1.5" strokeDasharray="4 2" />
        <polygon points={`${10 + boxX},95 ${10 + boxX},105 ${18 + boxX},100`} fill="#fdc700" />
        <text x={7 + boxX / 2} y="108" textAnchor="middle" fill="#fdc700" fontSize={8}>d = {dist} m</text>
        {/* Formula label */}
        <text x="200" y="20" textAnchor="middle" fill="#a8b8cc" fontSize={8}>Work Done = F × d</text>
        <text x="200" y="32" textAnchor="middle" fill="#a8b8cc" fontSize={7}>1 J = 1 N × 1 m</text>
      </svg>
      {/* Sliders */}
      <div className="rounded-[12px] p-2" style={{ background: '#1d293d' }}>
        <div className="flex justify-between text-xs mb-0.5">
          <span style={{ color: '#a8b8cc' }}>Force (N)</span>
          <span style={{ color: FC }} className="font-bold">{force} N</span>
        </div>
        <input type="range" min="1" max="50" value={force} onChange={e => setForce(+e.target.value)} className="w-full mb-1.5" style={{ accentColor: FC }} />
        <div className="flex justify-between text-xs mb-0.5">
          <span style={{ color: '#a8b8cc' }}>Distance (m)</span>
          <span style={{ color: '#fdc700' }} className="font-bold">{dist} m</span>
        </div>
        <input type="range" min="1" max="10" value={dist} onChange={e => setDist(+e.target.value)} className="w-full" style={{ accentColor: '#fdc700' }} />
        <div className="flex justify-between mt-1.5 pt-1.5 text-xs font-bold" style={{ borderTop: '1px solid #0b1121' }}>
          <span style={{ color: '#a8b8cc' }}>W = {force} × {dist}</span>
          <motion.span key={work} style={{ color: FC }} initial={{ scale: 0.85 }} animate={{ scale: 1 }}>{work} J</motion.span>
        </div>
      </div>
    </div>
  )
}
function WorkDoneIdea() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-4">
      <div className="flex items-center gap-2">
        <div className="flex flex-col items-center gap-1">
          <div className="w-10 h-10 rounded-[8px] flex items-center justify-center text-xs font-bold"
            style={{ background: '#1d293d', border: `2px solid ${FC}`, color: FC }}>Wall</div>
        </div>
        <div className="flex flex-col items-center gap-1">
          <motion.div animate={{ x: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1, ease: 'easeInOut' }}>
            <div style={{ width: 32, height: 4, background: FC, borderRadius: 2 }} />
          </motion.div>
          <span className="text-xs font-bold" style={{ color: FC }}>Push!</span>
        </div>
        <div className="text-xs font-bold px-2 py-1 rounded-[8px]" style={{ background: '#ef444420', border: '1px solid #ef4444', color: '#ef4444' }}>
          d = 0 m
        </div>
      </div>
      <div className="text-sm font-mono font-bold" style={{ color: '#ef4444' }}>W = F × 0 = 0 J ✗</div>
      <IdeaCaption>Work is done whenever a force is applied - even if the object doesn't move</IdeaCaption>
    </div>
  )
}
function WorkDoneReality() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-4">
      <div className="flex gap-4">
        <div className="flex flex-col items-center gap-1 p-2 rounded-[8px]" style={{ background: `${FC}10`, border: `1px solid ${FC}` }}>
          <ArrowRight size={18} color={FC} />
          <span className="text-xs text-center" style={{ color: '#cad5e2' }}>Force + movement<br/>= work done</span>
        </div>
        <div className="flex flex-col items-center gap-1 p-2 rounded-[8px]" style={{ background: '#1d293d' }}>
          <ArrowUp size={18} color="#a8b8cc" />
          <span className="text-xs text-center" style={{ color: '#a8b8cc' }}>Pushing wall<br/>= zero work</span>
        </div>
      </div>
      <RealityBadge color={FC}>Work = force × distance moved in the direction of force</RealityBadge>
    </div>
  )
}

// ─── 25. Hooke's Law ─────────────────────────────────────────────────────────
function Spring({ halfCoilH, nHalf = 8, x1 = 10, x2 = 40, color = FC }) {
  // Draw spring as alternating sine-wave half-coils: each half-coil is one Q Bezier
  const cx = (x1 + x2) / 2
  let d = `M ${x1} 0`
  for (let i = 0; i < nHalf; i++) {
    const xEnd = i % 2 === 0 ? x2 : x1
    const yCtrl = (i + 0.5) * halfCoilH
    const yEnd = (i + 1) * halfCoilH
    d += ` Q ${cx} ${yCtrl} ${xEnd} ${yEnd}`
  }
  return <path d={d} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
}

function HookesLawLesson() {
  const [ext, setExt] = useState(3)
  const k = 10
  const force = k * ext
  const nHalf = 8
  const halfCoilH = 6 + ext * 1.5   // 7.5px–18px per half-coil
  const springH = nHalf * halfCoilH  // total spring height
  const stemY = 12                   // where stem ends and spring starts
  const weightY = stemY + springH + 4
  const svgH = weightY + 22

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 px-4 py-2">
      <div className="flex gap-6 items-start">
        <svg width="52" height={svgH} viewBox={`0 0 52 ${svgH}`}>
          {/* ceiling bar */}
          <line x1="4" y1="1" x2="48" y2="1" stroke="#a8b8cc" strokeWidth="3" strokeLinecap="round" />
          <line x1="26" y1="1" x2="26" y2={stemY} stroke="#a8b8cc" strokeWidth="2" />
          {/* spring coils via Spring helper, offset to stemY */}
          <g transform={`translate(0, ${stemY})`}>
            <Spring halfCoilH={halfCoilH} x1={10} x2={42} color={FC} />
          </g>
          {/* weight block */}
          <rect x="11" y={weightY} width="30" height="20" rx="4" fill={`${FC}22`} stroke={FC} strokeWidth="1.5" />
          <text x="26" y={weightY + 14} textAnchor="middle" fill={FC} fontSize="9" fontWeight="bold">{force} N</text>
        </svg>
        <div className="flex flex-col justify-center gap-3 flex-1">
          <FormulaBox formula="F = ke" color={FC} />
          <div className="flex flex-col gap-1">
            <div className="flex justify-between text-xs">
              <span style={{ color: '#a8b8cc' }}>Extension</span>
              <span style={{ color: FC }} className="font-bold">{ext} cm</span>
            </div>
            <input type="range" min="1" max="8" value={ext} onChange={e => setExt(+e.target.value)} className="w-full" style={{ accentColor: FC }} />
          </div>
          <div className="font-mono text-xs" style={{ color: '#a8b8cc' }}>
            <div>k = 10 N/m</div>
            <div>F = 10 × {ext} = <span style={{ color: FC, fontWeight: 700 }}>{force} N</span></div>
          </div>
        </div>
      </div>
    </div>
  )
}
function HookesLawIdea() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-4">
      <svg width="180" height="90" viewBox="0 0 180 90">
        {/* "Always linear" wrong claim */}
        <line x1="15" y1="80" x2="165" y2="80" stroke="#1d293d" strokeWidth="1" />
        <line x1="15" y1="10" x2="15" y2="80" stroke="#1d293d" strokeWidth="1" />
        <motion.path d="M15 80 L165 10" fill="none" stroke={FC} strokeWidth="2.5"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1 }} />
        <text x="80" y="88" textAnchor="middle" fill="#a8b8cc" fontSize="7">Force →</text>
        <text x="8" y="45" fill="#a8b8cc" fontSize="7" transform="rotate(-90,8,45)">Ext →</text>
        <text x="130" y="28" fill={FC} fontSize="8">Always</text>
        <text x="130" y="38" fill={FC} fontSize="8">linear?</text>
        <motion.text x="155" y="22" fill="#ef4444" fontSize="14" fontWeight="bold"
          animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 2 }}>✗</motion.text>
      </svg>
      <IdeaCaption>Doubling the force always doubles the extension - no matter how much force is applied</IdeaCaption>
    </div>
  )
}
function HookesLawReality() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-4">
      <svg width="160" height="100" viewBox="0 0 160 100">
        <line x1="15" y1="90" x2="150" y2="90" stroke="#1d293d" strokeWidth="1" />
        <line x1="15" y1="10" x2="15" y2="90" stroke="#1d293d" strokeWidth="1" />
        <motion.path d="M15 90 L70 40 L130 20" fill="none" stroke={FC} strokeWidth="2.5"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1 }} />
        <motion.path d="M130 20 L145 15" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeDasharray="3 2"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.8 }} />
        <text x="85" y="100" fill="#a8b8cc" fontSize="7">Extension →</text>
        <text x="38" y="72" fill={FC} fontSize="7">Linear (elastic)</text>
        <text x="112" y="28" fill="#ef4444" fontSize="7">Inelastic</text>
      </svg>
      <RealityBadge color={FC}>Beyond elastic limit: extension no longer proportional to force</RealityBadge>
    </div>
  )
}

// ─── 26. Moments ─────────────────────────────────────────────────────────────
function MomentsLesson() {
  const [f1, setF1] = useState(10)
  const F2 = 10
  const d1 = 70   // px distance from pivot (left side)
  const d2 = 70   // px distance from pivot (right side)
  const pivotX = 130
  const beamY = 78
  // Tilt angle: positive = left side heavier (tips left = anticlockwise in SVG = negative rotation)
  const moment1 = f1 * d1  // N·px
  const moment2 = F2 * d2
  const tilt = Math.max(-12, Math.min(12, (moment2 - moment1) * 0.03))
  const isBalanced = Math.abs(moment1 - moment2) < 50
  return (
    <div className="w-full h-full flex flex-col items-center justify-start gap-2 px-3 py-2" style={{ background: '#0b1121' }}>
      <svg width="260" height="138" viewBox="0 0 260 138">
        {/* Pivot triangle */}
        <polygon points={`${pivotX - 10},${beamY + 2} ${pivotX + 10},${beamY + 2} ${pivotX},${beamY + 18}`} fill={FC} />
        <line x1={pivotX - 12} y1={beamY + 18} x2={pivotX + 12} y2={beamY + 18} stroke={FC} strokeWidth="2" />

        {/* Beam  -  tilts */}
        <motion.g
          animate={{ rotate: tilt }}
          style={{ originX: `${pivotX}px`, originY: `${beamY}px` }}
          transition={{ type: 'spring', stiffness: 120, damping: 18 }}>
          <line x1="20" y1={beamY} x2="240" y2={beamY} stroke={FC} strokeWidth="4" strokeLinecap="round" />

          {/* Left force (F1) */}
          <line x1={pivotX - d1} y1={beamY} x2={pivotX - d1} y2={beamY + 32} stroke="#e879f9" strokeWidth="2.5" strokeLinecap="round" />
          <polygon points={`${pivotX - d1 - 6},${beamY + 28} ${pivotX - d1 + 6},${beamY + 28} ${pivotX - d1},${beamY + 40}`} fill="#e879f9" />
          <text x={pivotX - d1} y={beamY + 52} textAnchor="middle" fill="#e879f9" fontSize={9} fontWeight="bold">F₁={f1}N</text>

          {/* Right force (F2 fixed) */}
          <line x1={pivotX + d2} y1={beamY} x2={pivotX + d2} y2={beamY + 32} stroke="#fdc700" strokeWidth="2.5" strokeLinecap="round" />
          <polygon points={`${pivotX + d2 - 6},${beamY + 28} ${pivotX + d2 + 6},${beamY + 28} ${pivotX + d2},${beamY + 40}`} fill="#fdc700" />
          <text x={pivotX + d2} y={beamY + 52} textAnchor="middle" fill="#fdc700" fontSize={9} fontWeight="bold">F₂=10N</text>

          {/* Distance labels */}
          <text x={pivotX - d1 / 2} y={beamY - 8} textAnchor="middle" fill="#e879f9" fontSize={8}>d₁=70</text>
          <text x={pivotX + d2 / 2} y={beamY - 8} textAnchor="middle" fill="#fdc700" fontSize={8}>d₂=70</text>
        </motion.g>

        {/* Status */}
        <text x="130" y="128" textAnchor="middle" fill={isBalanced ? '#00bc7d' : '#ef4444'} fontSize={9} fontWeight="bold">
          {isBalanced ? 'F₁d₁ = F₂d₂ → balanced ✓' : `F₁×70=${moment1} | F₂×70=${moment2}`}
        </text>
      </svg>
      {/* Slider */}
      <div className="w-full rounded-[10px] px-3 py-2" style={{ background: '#1d293d' }}>
        <div className="flex justify-between text-xs mb-1">
          <span style={{ color: '#a8b8cc' }}>F₁ (N)</span>
          <span style={{ color: '#e879f9' }} className="font-bold">{f1} N</span>
        </div>
        <input type="range" min="1" max="20" value={f1} onChange={e => setF1(+e.target.value)} className="w-full" style={{ accentColor: '#e879f9' }} />
        <div className="flex justify-between text-xs mt-1.5">
          <span style={{ color: '#a8b8cc' }}>Moment = F × d (N·m)</span>
          <span style={{ color: FC }} className="font-mono font-bold">{f1}×70 = {f1 * 70}</span>
        </div>
      </div>
    </div>
  )
}
function MomentsIdea() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-4">
      <svg width="200" height="80" viewBox="0 0 200 80">
        {/* Tilted seesaw - heavy side down */}
        <motion.g animate={{ rotate: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          style={{ originX: '100px', originY: '40px' }}>
          <line x1="20" y1="35" x2="180" y2="45" stroke={FC} strokeWidth="3" strokeLinecap="round" />
        </motion.g>
        <polygon points="95,46 100,58 105,46" fill={FC} />
        {/* Heavy kid, close to pivot */}
        <circle cx="75" cy="28" r="9" fill={`${FC}30`} stroke={FC} strokeWidth="1.5" />
        <text x="75" y="32" textAnchor="middle" fill={FC} fontSize="8">60kg</text>
        {/* Light kid, close too */}
        <circle cx="130" cy="32" r="6" fill="#c084fc30" stroke="#c084fc" strokeWidth="1.5" />
        <text x="130" y="36" textAnchor="middle" fill="#c084fc" fontSize="8">30kg</text>
        <text x="100" y="74" textAnchor="middle" fill="#ef4444" fontSize="8">Heavier always wins?  ✗</text>
      </svg>
      <IdeaCaption>A heavier weight always tips the see-saw - only the weight matters, not where it is placed</IdeaCaption>
    </div>
  )
}
function MomentsReality() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-4">
      <FormulaBox formula="Moment = F × d" color={FC} />
      <div className="text-xs text-center" style={{ color: '#cad5e2' }}>A small force far from the pivot can balance a large force close to it</div>
      <RealityBadge color={FC}>Balance: clockwise moment = anticlockwise moment</RealityBadge>
    </div>
  )
}

// ─── 27. Fluid Pressure ──────────────────────────────────────────────────────
function FluidPressureLesson() {
  const [depth, setDepth] = useState(5)
  const rho = 1000, g = 10
  const p = rho * g * depth
  // Container dims in SVG
  const cX = 30, cY = 10, cW = 140, cH = 120
  // Each depth unit = cH/10 px
  const depthPx = (depth / 10) * cH
  const selectedY = cY + depthPx
  return (
    <div className="w-full h-full flex flex-col items-center justify-start gap-2 px-3 py-2" style={{ background: '#0b1121' }}>
      <svg width="260" height="138" viewBox="0 0 260 138">
        {/* Container */}
        <rect x={cX} y={cY} width={cW} height={cH} rx="6" fill="rgba(0,120,220,0.12)" stroke={FC} strokeWidth="1.5" />
        {/* Dashed depth lines every 12px (10 divisions) */}
        {Array.from({ length: 9 }, (_, i) => {
          const ly = cY + (i + 1) * (cH / 10)
          return <line key={i} x1={cX + 4} y1={ly} x2={cX + cW - 4} y2={ly} stroke="#2563eb" strokeWidth="1" strokeDasharray="4 3" opacity="0.5" />
        })}
        {/* Selected depth dashed highlight */}
        <motion.line
          x1={cX + 4} y1={selectedY} x2={cX + cW - 4} y2={selectedY}
          stroke="#fdc700" strokeWidth="1.5" strokeDasharray="5 3"
          animate={{ y1: selectedY, y2: selectedY }} transition={{ duration: 0.25 }} />
        {/* Inward pressure arrows at selected depth */}
        <motion.g animate={{ opacity: 1 }} key={depth}>
          {/* Left arrow pointing right */}
          <motion.line x1={cX - 22} y1={selectedY} x2={cX + 2} y2={selectedY}
            stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round"
            animate={{ x1: cX - 22, y1: selectedY, x2: cX + 2, y2: selectedY }} transition={{ duration: 0.25 }} />
          <motion.polygon
            points={`${cX + 1},${selectedY - 5} ${cX + 1},${selectedY + 5} ${cX + 10},${selectedY}`}
            fill="#ef4444"
            animate={{ points: `${cX + 1},${selectedY - 5} ${cX + 1},${selectedY + 5} ${cX + 10},${selectedY}` }} transition={{ duration: 0.25 }} />
          {/* Right arrow pointing left */}
          <motion.line x1={cX + cW + 22} y1={selectedY} x2={cX + cW - 2} y2={selectedY}
            stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round"
            animate={{ x1: cX + cW + 22, y1: selectedY, x2: cX + cW - 2, y2: selectedY }} transition={{ duration: 0.25 }} />
          <motion.polygon
            points={`${cX + cW - 1},${selectedY - 5} ${cX + cW - 1},${selectedY + 5} ${cX + cW - 10},${selectedY}`}
            fill="#ef4444"
            animate={{ points: `${cX + cW - 1},${selectedY - 5} ${cX + cW - 1},${selectedY + 5} ${cX + cW - 10},${selectedY}` }} transition={{ duration: 0.25 }} />
          <text x={cX + cW / 2} y={selectedY - 5} textAnchor="middle" fill="#ef4444" fontSize={8} fontWeight="bold">pressure</text>
        </motion.g>
        {/* Depth indicator on right side */}
        <line x1={cX + cW + 6} y1={cY} x2={cX + cW + 6} y2={cY + cH} stroke="#334155" strokeWidth="1" />
        <motion.line x1={cX + cW + 3} y1={cY} x2={cX + cW + 9} y2={cY} stroke="#a8b8cc" strokeWidth="1.5" animate={{ y1: cY, y2: cY }} />
        <motion.line x1={cX + cW + 3} y1={selectedY} x2={cX + cW + 9} y2={selectedY} stroke="#fdc700" strokeWidth="1.5"
          animate={{ y1: selectedY, y2: selectedY }} transition={{ duration: 0.25 }} />
        <motion.text x={cX + cW + 18} y={cY + depthPx / 2 + 4} fill="#fdc700" fontSize={8} fontWeight="bold"
          animate={{ y: cY + depthPx / 2 + 4 }} transition={{ duration: 0.25 }}>{depth}m</motion.text>

        {/* Formula & result */}
        <text x="210" y="20" textAnchor="middle" fill="#a8b8cc" fontSize={8}>P = ρgh</text>
        <text x="210" y="34" textAnchor="middle" fill="#a8b8cc" fontSize={7}>ρ = 1000 kg/m³</text>
        <text x="210" y="46" textAnchor="middle" fill="#a8b8cc" fontSize={7}>g = 10 N/kg</text>
        <rect x="182" y="56" width="62" height="30" rx="5" fill="#1d293d" />
        <text x="213" y="70" textAnchor="middle" fill={FC} fontSize={9} fontWeight="bold">{(p/1000).toFixed(0)} kPa</text>
        <text x="213" y="82" textAnchor="middle" fill="#a8b8cc" fontSize={7}>{p.toLocaleString()} Pa</text>

        {/* Note */}
        <text x="130" y="132" textAnchor="middle" fill="#a8b8cc" fontSize={7.5}>Pressure acts equally in all directions at a given depth</text>
      </svg>
      {/* Slider */}
      <div className="w-full rounded-[10px] px-3 py-2" style={{ background: '#1d293d' }}>
        <div className="flex justify-between text-xs mb-1">
          <span style={{ color: '#a8b8cc' }}>Depth (m)</span>
          <span style={{ color: '#fdc700' }} className="font-bold">{depth} m</span>
        </div>
        <input type="range" min="1" max="10" step="1" value={depth} onChange={e => setDepth(+e.target.value)} className="w-full" style={{ accentColor: '#fdc700' }} />
      </div>
    </div>
  )
}
function FluidPressureIdea() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-4">
      <div className="relative" style={{ width: 100, height: 90 }}>
        {/* Water container */}
        <div className="absolute rounded-[6px]" style={{ inset: 0, background: `${FC}15`, border: `1.5px solid ${FC}` }} />
        {/* Only downward arrows */}
        {[30, 50, 70].map(x => (
          <motion.div key={x} className="absolute flex flex-col items-center"
            style={{ left: x, top: 12 }}
            animate={{ y: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.2, delay: x / 100 }}>
            <div style={{ width: 2, height: 16, background: FC, borderRadius: 1 }} />
            <div style={{ width: 0, height: 0, borderLeft: '4px solid transparent', borderRight: '4px solid transparent', borderTop: `6px solid ${FC}` }} />
          </motion.div>
        ))}
        <div className="absolute bottom-2 left-0 right-0 text-center text-xs font-bold" style={{ color: '#ef4444' }}>↓ only?</div>
      </div>
      <IdeaCaption>Pressure in a liquid only acts downward - it has no horizontal or upward component</IdeaCaption>
    </div>
  )
}
function FluidPressureReality() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-4">
      <div className="relative w-16 h-20 rounded-[8px]" style={{ background: '#2b7fff20', border: '1px solid #2b7fff' }}>
        {[['↓', 'top: 8px', 'left: 50%', '#a8b8cc'], ['→', 'top: 50%', 'right: -12px', FC], ['↑', 'bottom: 8px', 'left: 50%', '#00bc7d']].map(([arr, t, l, col], i) => (
          <div key={i} className="absolute text-sm font-bold" style={{ top: t, left: l, color: col, transform: 'translate(-50%,-50%)' }}>{arr}</div>
        ))}
      </div>
      <div className="text-xs text-center" style={{ color: '#cad5e2' }}>Fluid pressure acts in all directions - and increases with depth</div>
      <RealityBadge color={FC}>p = ρgh - pressure acts equally in all directions</RealityBadge>
    </div>
  )
}

// ─── 28. Motion Graphs ───────────────────────────────────────────────────────
function MotionGraphsLesson() {
  const [graph, setGraph] = useState('dt')
  const isDT = graph === 'dt'
  return (
    <div className="w-full h-full flex flex-col justify-start gap-2 px-3 py-2" style={{ background: '#0b1121' }}>
      {/* Toggle */}
      <div className="flex gap-2 justify-center">
        {[['dt', 'Distance-Time'], ['vt', 'Velocity-Time']].map(([key, label]) => (
          <button key={key} onClick={() => setGraph(key)}
            className="px-3 py-1 rounded-[8px] text-xs font-semibold"
            style={{ background: graph === key ? `${FC}22` : '#1d293d', color: graph === key ? FC : '#a8b8cc', border: `1px solid ${graph === key ? FC : '#1d293d'}` }}>
            {label}
          </button>
        ))}
      </div>

      {/* SVG graph */}
      <svg width="260" height="148" viewBox="0 0 260 148">
        {/* Axes */}
        <line x1="30" y1="8" x2="30" y2="120" stroke="#334155" strokeWidth="1.5" />
        <line x1="30" y1="120" x2="252" y2="120" stroke="#334155" strokeWidth="1.5" />
        {/* Axis arrows */}
        <polygon points="26,12 34,12 30,4" fill="#334155" />
        <polygon points="248,116 248,124 256,120" fill="#334155" />
        {/* Axis labels */}
        <text x="141" y="134" textAnchor="middle" fill="#a8b8cc" fontSize={8}>Time →</text>
        <text x="14" y="64" fill="#a8b8cc" fontSize={8} textAnchor="middle" transform="rotate(-90,14,64)">{isDT ? 'Distance →' : 'Velocity →'}</text>

        {isDT ? (
          <g key="dt">
            {/* Section 1: constant velocity - diagonal */}
            <motion.path d="M30 120 L90 78" fill="none" stroke={FC} strokeWidth="2.5" strokeLinecap="round"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5 }} />
            {/* Section 2: stationary - horizontal */}
            <motion.path d="M90 78 L140 78" fill="none" stroke="#fdc700" strokeWidth="2.5" strokeLinecap="round"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.4, delay: 0.5 }} />
            {/* Section 3: faster - steeper diagonal */}
            <motion.path d="M140 78 L220 20" fill="none" stroke="#00bc7d" strokeWidth="2.5" strokeLinecap="round"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.9 }} />
            {/* Section labels */}
            <text x="58" y="105" textAnchor="middle" fill={FC} fontSize={8}>constant</text>
            <text x="58" y="114" textAnchor="middle" fill={FC} fontSize={8}>speed</text>
            <text x="115" y="72" textAnchor="middle" fill="#fdc700" fontSize={8}>stationary</text>
            <text x="190" y="42" textAnchor="middle" fill="#00bc7d" fontSize={8}>faster</text>
            {/* Gradient annotation */}
            <text x="140" y="144" textAnchor="middle" fill="#a8b8cc" fontSize={7.5}>gradient = speed   |   curved line = acceleration</text>
          </g>
        ) : (
          <g key="vt">
            {/* Area fill under graph */}
            <motion.path d="M30 120 L30 80 L90 80 L90 50 L160 50 L220 80 L220 120 Z"
              fill={`${FC}12`} stroke="none"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} />
            {/* Section 1: constant - horizontal */}
            <motion.path d="M30 80 L90 80" fill="none" stroke={FC} strokeWidth="2.5" strokeLinecap="round"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.4 }} />
            {/* Section 2: acceleration - diagonal up */}
            <motion.path d="M90 80 L90 50" fill="none" stroke="#00bc7d" strokeWidth="2.5" strokeLinecap="round"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.35, delay: 0.4 }} />
            {/* Section 3: constant at top */}
            <motion.path d="M90 50 L160 50" fill="none" stroke={FC} strokeWidth="2.5" strokeLinecap="round"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.4, delay: 0.75 }} />
            {/* Section 4: deceleration */}
            <motion.path d="M160 50 L220 80" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.4, delay: 1.15 }} />
            {/* Section 5: to zero */}
            <motion.path d="M220 80 L240 120" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.3, delay: 1.55 }} />
            {/* Labels */}
            <text x="60" y="72" textAnchor="middle" fill={FC} fontSize={8}>constant v</text>
            <text x="92" y="44" fill="#00bc7d" fontSize={8}>accel.</text>
            <text x="175" y="45" fill="#ef4444" fontSize={8}>decel.</text>
            <text x="140" y="110" textAnchor="middle" fill={`${FC}90`} fontSize={7.5}>area = displacement</text>
            <text x="140" y="144" textAnchor="middle" fill="#a8b8cc" fontSize={7.5}>gradient = acceleration (a = Δv/Δt)   |   area = displacement</text>
          </g>
        )}
      </svg>
    </div>
  )
}
function MotionGraphsIdea() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-4">
      <svg width="190" height="80" viewBox="0 0 190 80">
        <line x1="15" y1="68" x2="175" y2="68" stroke="#1d293d" strokeWidth="1" />
        <line x1="15" y1="10" x2="15" y2="68" stroke="#1d293d" strokeWidth="1" />
        {/* Flat v-t line at mid-height (constant non-zero velocity) */}
        <motion.line x1="20" y1="35" x2="170" y2="35" stroke={FC} strokeWidth="2.5"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1 }} />
        <text x="93" y="29" textAnchor="middle" fill={FC} fontSize="8">v = 30 m/s (constant)</text>
        {/* Zero line for reference */}
        <line x1="20" y1="63" x2="170" y2="63" stroke="#1d293d" strokeWidth="1" strokeDasharray="3 2" />
        <text x="93" y="77" textAnchor="middle" fill="#a8b8cc" fontSize="7">v = 0 (actual stopped)</text>
        <text x="8" y="40" fill="#a8b8cc" fontSize="7" transform="rotate(-90,8,40)">v →</text>
        {/* "Stopped?" label */}
        <motion.text x="155" y="28" fill="#ef4444" fontSize="12" fontWeight="bold"
          animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 2 }}>✗</motion.text>
      </svg>
      <IdeaCaption>A flat horizontal line on a velocity-time graph means the object is stationary</IdeaCaption>
    </div>
  )
}
function MotionGraphsReality() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 px-3 py-2">
      <svg width="180" height="80" viewBox="0 0 180 80">
        {/* d-t graph (slope = speed) */}
        <text x="10" y="10" fill={FC} fontSize="7" fontWeight="bold">d-t</text>
        <line x1="10" y1="75" x2="10" y2="20" stroke="#1d293d" strokeWidth="1"/>
        <line x1="10" y1="75" x2="75" y2="75" stroke="#1d293d" strokeWidth="1"/>
        <line x1="10" y1="75" x2="70" y2="22" stroke={FC} strokeWidth="2" strokeLinecap="round"/>
        <text x="38" y="82" textAnchor="middle" fill="#a8b8cc" fontSize="6">slope = speed</text>
        {/* v-t graph (flat = constant v) */}
        <text x="98" y="10" fill="#c084fc" fontSize="7" fontWeight="bold">v-t</text>
        <line x1="98" y1="75" x2="98" y2="20" stroke="#1d293d" strokeWidth="1"/>
        <line x1="98" y1="75" x2="175" y2="75" stroke="#1d293d" strokeWidth="1"/>
        <line x1="98" y1="45" x2="170" y2="45" stroke="#c084fc" strokeWidth="2" strokeLinecap="round"/>
        <text x="134" y="56" textAnchor="middle" fill="#c084fc" fontSize="6">constant v</text>
        <text x="134" y="82" textAnchor="middle" fill="#a8b8cc" fontSize="6">flat ≠ stationary</text>
      </svg>
      <div className="text-center text-xs font-semibold" style={{ color: FC }}>Flat v-t = moving at constant speed</div>
    </div>
  )
}

// ─── 29. Newton's Laws ───────────────────────────────────────────────────────
function NewtonsLawsLesson() {
  const [law, setLaw] = useState(1)
  const [mass, setMass] = useState(5)
  const [fN, setFN] = useState(20)
  const accel = (fN / mass).toFixed(2)
  return (
    <div className="w-full h-full flex flex-col justify-start gap-2 px-3 py-2" style={{ background: '#0b1121' }}>
      {/* Law toggle */}
      <div className="flex gap-1.5 justify-center">
        {[1, 2, 3].map(n => (
          <button key={n} onClick={() => setLaw(n)}
            className="px-3 py-1 rounded-[8px] text-xs font-bold"
            style={{ background: law === n ? `${FC}22` : '#1d293d', color: law === n ? FC : '#a8b8cc', border: `1px solid ${law === n ? FC : '#1d293d'}` }}>
            Law {n}
          </button>
        ))}
      </div>

      {law === 1 && (
        <svg width="260" height="118" viewBox="0 0 260 118" key="law1">
          {/* Object at rest  -  balanced arrows */}
          <rect x="20" y="40" width="50" height="36" rx="6" fill="#1d293d" stroke="#a8b8cc" strokeWidth="1.5" />
          <text x="45" y="63" textAnchor="middle" fill="#a8b8cc" fontSize={9}>at rest</text>
          <line x1="45" y1="40" x2="45" y2="18" stroke="#00bc7d" strokeWidth="2" strokeLinecap="round" />
          <polygon points="40,22 50,22 45,12" fill="#00bc7d" />
          <line x1="45" y1="76" x2="45" y2="98" stroke="#fdc700" strokeWidth="2" strokeLinecap="round" />
          <polygon points="40,94 50,94 45,104" fill="#fdc700" />
          <text x="45" y="114" textAnchor="middle" fill="#a8b8cc" fontSize={7.5}>F_net = 0</text>

          {/* Object moving at constant velocity */}
          <motion.g animate={{ x: [0, 30, 0] }} transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}>
            <rect x="150" y="40" width="58" height="36" rx="6" fill="#1d293d" stroke={FC} strokeWidth="1.5" />
            <text x="179" y="58" textAnchor="middle" fill={FC} fontSize={8}>constant</text>
            <text x="179" y="68" textAnchor="middle" fill={FC} fontSize={8}>velocity</text>
          </motion.g>
          <line x1="208" y1="58" x2="236" y2="58" stroke={FC} strokeWidth="2" strokeLinecap="round" />
          <polygon points="232,53 232,63 242,58" fill={FC} />

          <text x="130" y="15" textAnchor="middle" fill="#a8b8cc" fontSize={8}>No net force → constant velocity (or rest)</text>
          <line x1="105" y1="8" x2="155" y2="8" stroke="#334155" strokeWidth="1" strokeDasharray="3 2" />
        </svg>
      )}

      {law === 2 && (
        <div className="flex flex-col gap-2" key="law2">
          <svg width="260" height="90" viewBox="0 0 260 90">
            {/* Box */}
            <rect x="80" y="30" width="56" height="38" rx="6" fill="#1d293d" stroke="#c084fc" strokeWidth="1.5" />
            <text x="108" y="54" textAnchor="middle" fill="#c084fc" fontSize={9} fontWeight="bold">{mass} kg</text>
            {/* Force arrow */}
            <line x1="136" y1="49" x2="170" y2="49" stroke={FC} strokeWidth="2.5" strokeLinecap="round" />
            <polygon points="166,43 166,55 178,49" fill={FC} />
            <text x="162" y="40" fill={FC} fontSize={8} fontWeight="bold">F={fN}N</text>
            {/* Acceleration arrow */}
            <line x1="136" y1="62" x2="196" y2="62" stroke="#fdc700" strokeWidth="2" strokeLinecap="round" strokeDasharray="5 3" />
            <polygon points="192,57 192,67 202,62" fill="#fdc700" />
            <text x="192" y="78" fill="#fdc700" fontSize={8} fontWeight="bold">a={accel} m/s²</text>
            {/* Formula */}
            <text x="35" y="54" textAnchor="middle" fill="#c084fc" fontSize={11} fontWeight="bold">F = ma</text>
          </svg>
          <div className="rounded-[10px] px-3 py-2" style={{ background: '#1d293d' }}>
            <div className="flex justify-between text-xs mb-0.5">
              <span style={{ color: '#a8b8cc' }}>Mass (kg)</span>
              <span style={{ color: '#c084fc' }} className="font-bold">{mass} kg</span>
            </div>
            <input type="range" min="1" max="10" value={mass} onChange={e => setMass(+e.target.value)} className="w-full mb-1.5" style={{ accentColor: '#c084fc' }} />
            <div className="flex justify-between text-xs mb-0.5">
              <span style={{ color: '#a8b8cc' }}>Force (N)</span>
              <span style={{ color: FC }} className="font-bold">{fN} N</span>
            </div>
            <input type="range" min="1" max="50" value={fN} onChange={e => setFN(+e.target.value)} className="w-full" style={{ accentColor: FC }} />
            <div className="flex justify-between text-xs mt-1.5 pt-1.5 font-bold" style={{ borderTop: '1px solid #0b1121' }}>
              <span style={{ color: '#a8b8cc' }}>a = F/m = {fN}/{mass}</span>
              <span style={{ color: '#fdc700' }}>{accel} m/s²</span>
            </div>
          </div>
        </div>
      )}

      {law === 3 && (
        <svg width="260" height="118" viewBox="0 0 260 118" key="law3">
          {/* Object A */}
          <rect x="20" y="44" width="56" height="34" rx="6" fill="#1d293d" stroke="#e879f9" strokeWidth="1.5" />
          <text x="48" y="65" textAnchor="middle" fill="#e879f9" fontSize={9} fontWeight="bold">Object A</text>
          {/* Object B */}
          <rect x="184" y="44" width="56" height="34" rx="6" fill="#1d293d" stroke={FC} strokeWidth="1.5" />
          <text x="212" y="65" textAnchor="middle" fill={FC} fontSize={9} fontWeight="bold">Object B</text>

          {/* Reaction arrow: A gets pushed left */}
          <line x1="20" y1="61" x2="2" y2="61" stroke="#e879f9" strokeWidth="2.5" strokeLinecap="round" />
          <polygon points="6,55 6,67 -4,61" fill="#e879f9" />
          <text x="10" y="80" textAnchor="middle" fill="#e879f9" fontSize={8}>reaction</text>

          {/* Action arrow: B gets pushed right */}
          <line x1="240" y1="61" x2="258" y2="61" stroke={FC} strokeWidth="2.5" strokeLinecap="round" />
          <polygon points="254,55 254,67 264,61" fill={FC} />
          <text x="251" y="80" textAnchor="middle" fill={FC} fontSize={8}>action</text>

          {/* Interaction between them */}
          <line x1="76" y1="61" x2="184" y2="61" stroke="#334155" strokeWidth="1.5" strokeDasharray="4 3" />
          <text x="130" y="55" textAnchor="middle" fill="#a8b8cc" fontSize={8}>interaction</text>

          {/* Equal & opposite labels */}
          <text x="130" y="98" textAnchor="middle" fill="#a8b8cc" fontSize={8}>equal magnitude, opposite direction</text>
          <text x="130" y="112" textAnchor="middle" fill={FC} fontSize={8} fontWeight="bold">every action → equal and opposite reaction</text>

          {/* Rocket example note */}
          <text x="130" y="20" textAnchor="middle" fill="#a8b8cc" fontSize={7.5}>e.g. rocket: thrust down → rocket moves up</text>
        </svg>
      )}
    </div>
  )
}
function NewtonsLawsIdea() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-4">
      <div className="flex items-end gap-8">
        {/* Heavy ball with bigger arrow (wrong: "falls faster") */}
        <div className="flex flex-col items-center gap-1">
          <div className="w-12 h-12 rounded-full flex items-center justify-center text-xs font-bold"
            style={{ background: `${FC}20`, border: `2px solid ${FC}`, color: FC }}>10 kg</div>
          <motion.div className="flex flex-col items-center"
            animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 0.9, ease: 'easeIn' }}>
            <div style={{ width: 3, height: 22, background: FC, borderRadius: 1 }} />
            <div style={{ width: 0, height: 0, borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderTop: `8px solid ${FC}` }} />
          </motion.div>
          <span className="text-xs font-bold" style={{ color: '#ef4444' }}>faster? ✗</span>
        </div>
        {/* Light ball with same speed arrow */}
        <div className="flex flex-col items-center gap-1">
          <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
            style={{ background: '#c084fc20', border: '2px solid #c084fc', color: '#c084fc' }}>1 kg</div>
          <motion.div className="flex flex-col items-center"
            animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 0.9, ease: 'easeIn' }}>
            <div style={{ width: 3, height: 22, background: '#c084fc', borderRadius: 1 }} />
            <div style={{ width: 0, height: 0, borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderTop: '8px solid #c084fc' }} />
          </motion.div>
          <span className="text-xs" style={{ color: '#a8b8cc' }}>slower?</span>
        </div>
      </div>
      <IdeaCaption>Heavier objects fall faster because gravity pulls them with more force</IdeaCaption>
    </div>
  )
}
function NewtonsLawsReality() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-4">
      <div className="flex gap-6 items-end">
        <motion.div className="flex flex-col items-center gap-1"
          animate={{ y: [0, 30, 0] }} transition={{ repeat: Infinity, duration: 1.5, ease: 'easeIn' }}>
          <div className="w-10 h-10 rounded-full" style={{ background: `${FC}30`, border: `2px solid ${FC}` }} />
          <span className="text-xs" style={{ color: FC }}>Heavy</span>
        </motion.div>
        <motion.div className="flex flex-col items-center gap-1"
          animate={{ y: [0, 30, 0] }} transition={{ repeat: Infinity, duration: 1.5, ease: 'easeIn' }}>
          <div className="w-5 h-5 rounded-full" style={{ background: '#c084fc30', border: '2px solid #c084fc' }} />
          <span className="text-xs" style={{ color: '#c084fc' }}>Light</span>
        </motion.div>
      </div>
      <div className="text-xs text-center" style={{ color: '#cad5e2' }}>Both fall at g = 9.8 m/s² in vacuum</div>
      <RealityBadge color={FC}>F = ma - more mass = more weight, same acceleration</RealityBadge>
    </div>
  )
}

// ─── 30. Stopping Distance ───────────────────────────────────────────────────
function StoppingDistanceLesson() {
  const [speed, setSpeed] = useState(20)
  const thinking = +(speed * 0.7).toFixed(1)
  const braking = +(speed * speed / 12).toFixed(1)
  const total = +(thinking + braking).toFixed(1)
  // Bar max is for speed=30: thinking=21, braking=75, total=96 → use 100 as max px scale
  const maxPx = 220
  const maxTotal = 30 * 0.7 + 30 * 30 / 12  // ~96
  const thinkPx = Math.round((thinking / maxTotal) * maxPx)
  const brakePx = Math.round((braking / maxTotal) * maxPx)
  return (
    <div className="w-full h-full flex flex-col justify-start gap-2 px-3 py-2" style={{ background: '#0b1121' }}>
      {/* Speed slider */}
      <div className="flex items-center gap-3">
        <span className="text-xs" style={{ color: '#a8b8cc' }}>Speed</span>
        <input type="range" min="10" max="30" step="1" value={speed} onChange={e => setSpeed(+e.target.value)} className="flex-1" style={{ accentColor: FC }} />
        <span className="text-xs font-bold w-14 text-right" style={{ color: FC }}>{speed} m/s</span>
      </div>

      {/* SVG bar diagram */}
      <svg width="280" height="128" viewBox="0 0 280 128">
        {/* Car icon at left */}
        <rect x="2" y="46" width="28" height="16" rx="4" fill="#1d293d" stroke="#a8b8cc" strokeWidth="1.5" />
        <rect x="7" y="40" width="18" height="10" rx="3" fill="#1d293d" stroke="#a8b8cc" strokeWidth="1" />
        <circle cx="8" cy="62" r="4" fill="#334155" stroke="#a8b8cc" strokeWidth="1" />
        <circle cx="22" cy="62" r="4" fill="#334155" stroke="#a8b8cc" strokeWidth="1" />

        {/* Ground line */}
        <line x1="34" y1="68" x2="276" y2="68" stroke="#334155" strokeWidth="1" />

        {/* Thinking distance bar */}
        <motion.rect x="34" y="42" height="22" rx="3" fill="#fdc700"
          animate={{ width: thinkPx }} transition={{ duration: 0.35 }} />
        {/* Braking distance bar */}
        <motion.rect y="42" height="22" rx="3" fill="#ef4444"
          animate={{ x: 34 + thinkPx, width: brakePx }} transition={{ duration: 0.35 }} />

        {/* Thinking label */}
        <text x="34" y="36" fill="#fdc700" fontSize={8} fontWeight="bold">Thinking: {thinking} m</text>
        {/* Braking label */}
        <motion.text y="36" fill="#ef4444" fontSize={8} fontWeight="bold"
          animate={{ x: 34 + thinkPx + 2 }} transition={{ duration: 0.35 }}>Braking: {braking} m</motion.text>

        {/* Total bracket */}
        <motion.line y1="72" y2="72" stroke="#a8b8cc" strokeWidth="1"
          animate={{ x1: 34, x2: 34 + thinkPx + brakePx }} transition={{ duration: 0.35 }} />
        <line x1="34" y1="70" x2="34" y2="74" stroke="#a8b8cc" strokeWidth="1" />
        <motion.line y1="70" y2="74" stroke="#a8b8cc" strokeWidth="1"
          animate={{ x1: 34 + thinkPx + brakePx, x2: 34 + thinkPx + brakePx }} transition={{ duration: 0.35 }} />
        <text x="34" y="82" fill="#a8b8cc" fontSize={8}>Total: </text>
        <motion.text y="82" fill={FC} fontSize={8} fontWeight="bold"
          animate={{ x: 62 }} transition={{ duration: 0 }}>{total} m</motion.text>

        {/* Notes */}
        <text x="140" y="100" textAnchor="middle" fill="#a8b8cc" fontSize={7.5}>wet/icy road → much greater braking distance (less friction)</text>
        <text x="140" y="114" textAnchor="middle" fill="#fdc700" fontSize={7.5}>2× speed → 4× braking distance (v² relationship)</text>
      </svg>
    </div>
  )
}
function StoppingDistanceIdea() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-4">
      <div className="flex flex-col gap-2 w-full px-2">
        {/* Speed 1× */}
        <div className="flex items-center gap-2">
          <span className="text-xs w-14 shrink-0" style={{ color: '#a8b8cc' }}>Speed 1×</span>
          <div className="h-4 rounded-full" style={{ width: 60, background: FC }} />
          <span className="text-xs font-bold" style={{ color: FC }}>20 m</span>
        </div>
        {/* Speed 2× - wrong: shows 2× not 4× */}
        <div className="flex items-center gap-2">
          <span className="text-xs w-14 shrink-0" style={{ color: '#a8b8cc' }}>Speed 2×</span>
          <div className="h-4 rounded-full" style={{ width: 120, background: '#ef4444' }} />
          <span className="text-xs font-bold" style={{ color: '#ef4444' }}>40 m?</span>
        </div>
        <motion.div className="text-xs text-center font-bold" style={{ color: '#ef4444' }}
          animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 2 }}>
          2× speed = 2× distance?  ✗
        </motion.div>
      </div>
      <IdeaCaption>Doubling speed doubles stopping distance - it's a simple linear relationship</IdeaCaption>
    </div>
  )
}
function StoppingDistanceReality() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 px-3 py-2">
      <div className="font-mono text-base font-bold" style={{ color: FC }}>d ∝ v²</div>
      <svg width="160" height="60" viewBox="0 0 160 60">
        <line x1="10" y1="55" x2="150" y2="55" stroke="#1d293d" strokeWidth="1"/>
        <line x1="10" y1="5" x2="10" y2="55" stroke="#1d293d" strokeWidth="1"/>
        <path d="M10 55 Q80 55 150 5" fill="none" stroke={FC} strokeWidth="2.5" strokeLinecap="round"/>
        <text x="80" y="62" textAnchor="middle" fill="#a8b8cc" fontSize="7">speed →</text>
        <text x="5" y="35" fill="#a8b8cc" fontSize="7" transform="rotate(-90,5,35)">d →</text>
        <text x="120" y="22" fill={FC} fontSize="7">∝ v²</text>
      </svg>
      <div className="text-center" style={{ fontSize: 10, color: '#cad5e2' }}>2× speed → 4× braking distance</div>
    </div>
  )
}

// ─── 31. Momentum ────────────────────────────────────────────────────────────
function MomentumLesson() {
  const [collisionType, setCollisionType] = useState('inelastic')
  const [phase, setPhase] = useState('before') // 'before' | 'colliding' | 'after'
  const inelastic = collisionType === 'inelastic'
  // Masses & velocities
  const m1 = 3, v1 = 4, m2 = 2
  const p_before = m1 * v1  // = 12 kg·m/s
  // After: inelastic → stick together; elastic → objects separate
  const v_after_inelastic = (p_before / (m1 + m2)).toFixed(2)  // 2.40
  const v1_elastic = ((m1 - m2) / (m1 + m2) * v1).toFixed(2)  // 0.80
  const v2_elastic = ((2 * m1) / (m1 + m2) * v1).toFixed(2)   // 4.80

  useEffect(() => {
    const cycle = ['before', 'colliding', 'after']
    let i = 0
    const t = setInterval(() => { i = (i + 1) % cycle.length; setPhase(cycle[i]) }, 1200)
    return () => clearInterval(t)
  }, [collisionType])

  // x-positions
  const ball1Before = 55, ball2Before = 185
  const ball1Collide = 118, ball2Collide = 142
  const ball1AfterInel = 118, ball2AfterInel = 144
  const ball1AfterEl = 70, ball2AfterEl = 195

  const b1x = phase === 'before' ? ball1Before : phase === 'colliding' ? ball1Collide : inelastic ? ball1AfterInel : ball1AfterEl
  const b2x = phase === 'before' ? ball2Before : phase === 'colliding' ? ball2Collide : inelastic ? ball2AfterInel : ball2AfterEl

  return (
    <div className="w-full h-full flex flex-col justify-start gap-2 px-3 py-2" style={{ background: '#0b1121' }}>
      {/* Toggle */}
      <div className="flex gap-2 justify-center">
        {[['inelastic', 'Inelastic (stick)'], ['elastic', 'Elastic (bounce)']].map(([key, label]) => (
          <button key={key} onClick={() => { setCollisionType(key); setPhase('before') }}
            className="px-2 py-1 rounded-[8px] text-xs font-semibold"
            style={{ background: collisionType === key ? `${FC}22` : '#1d293d', color: collisionType === key ? FC : '#a8b8cc', border: `1px solid ${collisionType === key ? FC : '#1d293d'}` }}>
            {label}
          </button>
        ))}
      </div>

      {/* Collision SVG */}
      <svg width="260" height="116" viewBox="0 0 260 116">
        {/* Phase label */}
        <text x="130" y="14" textAnchor="middle" fill="#a8b8cc" fontSize={8} fontWeight="bold" textDecoration="underline">
          {phase === 'before' ? 'Before collision' : phase === 'colliding' ? 'At collision' : 'After collision'}
        </text>

        {/* Ground line */}
        <line x1="20" y1="82" x2="240" y2="82" stroke="#334155" strokeWidth="1" />

        {/* Ball 1 */}
        <motion.g animate={{ x: b1x - ball1Before }} transition={{ duration: 0.5, ease: 'easeInOut' }}>
          <circle cx={ball1Before} cy="58" r="20" fill={`${FC}22`} stroke={FC} strokeWidth="1.5" />
          <text x={ball1Before} y="55" textAnchor="middle" fill={FC} fontSize={9} fontWeight="bold">{m1}kg</text>
          <text x={ball1Before} y="66" textAnchor="middle" fill={FC} fontSize={7}>p={m1*v1}</text>
          {/* Velocity arrow (before) */}
          {phase === 'before' && (
            <g>
              <line x1={ball1Before + 20} y1="58" x2={ball1Before + 36} y2="58" stroke={FC} strokeWidth="2" strokeLinecap="round" />
              <polygon points={`${ball1Before + 32},53 ${ball1Before + 32},63 ${ball1Before + 42},58`} fill={FC} />
              <text x={ball1Before + 30} y="47" textAnchor="middle" fill={FC} fontSize={7}>{v1}m/s</text>
            </g>
          )}
          {/* After elastic: ball 1 moves slower right */}
          {phase === 'after' && !inelastic && (
            <g>
              <line x1={ball1Before + 20} y1="58" x2={ball1Before + 30} y2="58" stroke={FC} strokeWidth="2" strokeLinecap="round" />
              <polygon points={`${ball1Before + 26},53 ${ball1Before + 26},63 ${ball1Before + 36},58`} fill={FC} />
              <text x={ball1Before + 26} y="47" textAnchor="middle" fill={FC} fontSize={7}>{v1_elastic}m/s</text>
            </g>
          )}
        </motion.g>

        {/* Ball 2 */}
        <motion.g animate={{ x: b2x - ball2Before }} transition={{ duration: 0.5, ease: 'easeInOut' }}>
          <circle cx={ball2Before} cy="58" r="16" fill="#c084fc22" stroke="#c084fc" strokeWidth="1.5" />
          <text x={ball2Before} y="55" textAnchor="middle" fill="#c084fc" fontSize={9} fontWeight="bold">{m2}kg</text>
          <text x={ball2Before} y="66" textAnchor="middle" fill="#c084fc" fontSize={7}>p=0</text>
          {/* After elastic: ball 2 moves fast right */}
          {phase === 'after' && !inelastic && (
            <g>
              <line x1={ball2Before + 16} y1="58" x2={ball2Before + 34} y2="58" stroke="#c084fc" strokeWidth="2" strokeLinecap="round" />
              <polygon points={`${ball2Before + 30},53 ${ball2Before + 30},63 ${ball2Before + 40},58`} fill="#c084fc" />
              <text x={ball2Before + 30} y="47" textAnchor="middle" fill="#c084fc" fontSize={7}>{v2_elastic}m/s</text>
            </g>
          )}
          {/* After inelastic: combined moves right */}
          {phase === 'after' && inelastic && (
            <g>
              <line x1={ball2Before + 16} y1="58" x2={ball2Before + 28} y2="58" stroke="#00bc7d" strokeWidth="2" strokeLinecap="round" />
              <polygon points={`${ball2Before + 24},53 ${ball2Before + 24},63 ${ball2Before + 34},58`} fill="#00bc7d" />
              <text x={ball2Before + 24} y="47" textAnchor="middle" fill="#00bc7d" fontSize={7}>{v_after_inelastic}m/s</text>
            </g>
          )}
        </motion.g>

        {/* Conservation statement */}
        <text x="130" y="98" textAnchor="middle" fill="#00bc7d" fontSize={8} fontWeight="bold">
          p_before = {p_before} kg·m/s = p_after (conserved)
        </text>
        <text x="130" y="110" textAnchor="middle" fill="#a8b8cc" fontSize={7.5}>momentum is always conserved in collisions</text>
      </svg>

      {/* Formula */}
      <div className="rounded-[8px] px-3 py-1.5 text-center font-mono text-xs font-bold" style={{ background: '#1d293d', color: FC }}>
        p = mv (kg·m/s)
      </div>
    </div>
  )
}
function MomentumIdea() {
  const [phase, setPhase] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setPhase(p => (p + 1) % 3), 1200)
    return () => clearInterval(t)
  }, [])
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-4">
      <div className="flex flex-col gap-3 w-full">
        {/* Before */}
        <div className="flex items-center gap-2 text-xs" style={{ color: '#a8b8cc' }}>
          <span className="w-12 shrink-0">Before:</span>
          <motion.div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold"
            style={{ background: `${FC}20`, border: `2px solid ${FC}`, color: FC }}
            animate={{ x: phase === 0 ? 0 : phase === 1 ? 30 : 30 }}>→</motion.div>
          <div className="w-7 h-7 rounded-full" style={{ background: '#1d293d', border: '2px solid #c084fc' }} />
        </div>
        {/* After (wrong: first ball "stops") */}
        <div className="flex items-center gap-2 text-xs" style={{ color: '#a8b8cc' }}>
          <span className="w-12 shrink-0">After:</span>
          <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold"
            style={{ background: '#1d293d', border: `2px solid ${FC}`, color: '#a8b8cc' }}>●</div>
          <motion.div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
            style={{ background: '#c084fc20', border: '2px solid #c084fc', color: '#c084fc' }}
            animate={{ x: phase >= 1 ? 14 : 0 }}>→</motion.div>
        </div>
        <div className="text-xs text-center font-bold" style={{ color: '#ef4444' }}>
          Moving ball always stops?  ✗
        </div>
      </div>
      <IdeaCaption>In a collision, the moving object always stops and transfers all momentum to the other</IdeaCaption>
    </div>
  )
}
function MomentumReality() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 px-3 py-2">
      <div className="font-mono text-sm font-bold" style={{ color: FC }}>p = mv</div>
      <svg width="160" height="52" viewBox="0 0 160 52">
        {/* Before */}
        <text x="4" y="14" fill="#a8b8cc" fontSize="7">Before</text>
        <circle cx="50" cy="10" r="10" fill={`${FC}20`} stroke={FC} strokeWidth="1.5"/>
        <text x="50" y="14" textAnchor="middle" fill={FC} fontSize="7">→</text>
        <circle cx="90" cy="10" r="7" fill="#c084fc20" stroke="#c084fc" strokeWidth="1.5"/>
        {/* After */}
        <text x="4" y="44" fill="#a8b8cc" fontSize="7">After</text>
        <circle cx="70" cy="40" r="10" fill={`${FC}20`} stroke={FC} strokeWidth="1.5"/>
        <text x="70" y="44" textAnchor="middle" fill={FC} fontSize="7">→</text>
        <circle cx="110" cy="40" r="7" fill="#c084fc20" stroke="#c084fc" strokeWidth="1.5"/>
        <text x="125" y="44" fill="#c084fc" fontSize="7">→</text>
        {/* conserved arrow */}
        <line x1="140" y1="5" x2="140" y2="48" stroke="#00bc7d" strokeWidth="1.5" strokeDasharray="3 2"/>
        <text x="156" y="28" fill="#00bc7d" fontSize="6" textAnchor="middle" transform="rotate(-90,156,28)">p conserved</text>
      </svg>
      <div className="text-center font-semibold" style={{ fontSize: 10, color: '#00bc7d' }}>p before = p after</div>
    </div>
  )
}

export const FORCES_TOPICS = {
  force_interactions: {
    id: 'force_interactions', module: 'Forces', moduleColor: FC,
    title: 'Forces & Interactions', subtitle: 'Scalars, Vectors & Free Body Diagrams',
    description: 'Scalar quantities have only magnitude (e.g. speed, distance, mass). Vector quantities have both magnitude and direction (e.g. velocity, force, acceleration). Force is a push or pull - contact forces (friction, normal, tension) or non-contact (gravity, magnetic, electrostatic). Weight = mg.',
    lessonVisual: ForceInteractionsLesson, ideaVisual: ForceInteractionsIdea, realityVisual: ForceInteractionsReality,
    question: 'Which of the following is a vector quantity?',
    questionSubtitle: 'Vectors have both magnitude AND direction',
    options: ['Speed', 'Mass', 'Distance', 'Velocity'],
    correctAnswer: 3,
    keywords: ['vector quantity', 'scalar quantity', 'velocity', 'speed', 'mass', 'distance', 'direction', 'magnitude'],
    sentenceStarters: ['A vector quantity has both magnitude and direction...', 'Velocity is a vector because it includes direction...', 'Speed is a scalar because it only has magnitude...', 'The difference between speed and velocity is...', 'Vectors include velocity, force and acceleration...'],
    modelAnswers: [
      'A vector quantity has both magnitude and direction, **so velocity is a vector  -  it tells you speed AND direction**.',
      'Velocity is a vector because it includes **both speed (magnitude) and direction of motion**.',
      'Speed is a scalar because it only has **magnitude  -  it tells you how fast but not which direction**.',
      'The difference between speed and velocity is **that velocity includes direction  -  30 m/s north is velocity, 30 m/s is speed**.',
      'Vectors include velocity, force and acceleration, **while scalars include speed, mass and distance**.',
    ],
    misconception: 'Speed is a scalar - it has no direction. Velocity is the vector equivalent.',
    concept: 'Velocity specifies both how fast and in which direction. Speed only gives how fast. This distinction matters: an object moving in a circle has constant speed but changing velocity (direction changes).',
  },
  work_done: {
    id: 'work_done', module: 'Forces', moduleColor: FC,
    title: 'Work Done & Energy Transfer', subtitle: 'W = Fd and Energy Pathways',
    description: 'Work is done when a force causes an object to move in the direction of the force. W = Fd (work done = force × distance moved). Work is measured in joules. When work is done against friction, kinetic energy is transferred to thermal energy - the object and surroundings warm up.',
    lessonVisual: WorkDoneLesson, ideaVisual: WorkDoneIdea, realityVisual: WorkDoneReality,
    question: 'A 50 N force moves an object 3 m. How much work is done?',
    questionSubtitle: 'Use W = F × d',
    options: ['53 J', '150 J', '16.7 J', '300 J'],
    correctAnswer: 1,
    keywords: ['work done', 'W = Fd', 'force', 'distance', 'joules', 'newtons', 'energy transfer', 'direction of force'],
    sentenceStarters: ['Using W = F × d, I multiply...', 'Work done = force × distance = 50 × 3 = ...', 'Work is done when a force causes a displacement...', 'The unit of work done is the joule (J)...', 'W = 50 × 3 = ... J'],
    modelAnswers: [
      'Using W = F × d, I multiply **50 N × 3 m = 150 J**.',
      'Work done = force × distance = 50 × 3 = **150 J**.',
      'Work is done when a force causes a displacement **in the direction of the force**.',
      'The unit of work done is the joule (J), **where 1 J = 1 N × 1 m**.',
      'W = 50 × 3 = **150 J**.',
    ],
    misconception: 'Work requires movement - pushing a stationary wall does no work.',
    concept: 'W = 50 × 3 = 150 J. Work is only done when there is displacement in the direction of the force. If the wall doesn\'t move, no energy is transferred regardless of how hard you push.',
  },
  hookes_law: {
    id: 'hookes_law', module: 'Forces', moduleColor: FC, practicalId: 'spring',
    title: 'Forces & Elasticity (Hooke\'s Law)', subtitle: 'F = ke and Elastic Deformation',
    description: 'A spring obeys Hooke\'s Law: force is directly proportional to extension (F = ke) up to the elastic limit. The spring constant k (N/m) measures stiffness. Beyond the elastic limit, deformation is inelastic - the spring doesn\'t return to its original shape. Elastic PE stored: Ee = ½ke².',
    lessonVisual: HookesLawLesson, ideaVisual: HookesLawIdea, realityVisual: HookesLawReality,
    question: 'A spring with spring constant 20 N/m is extended by 0.3 m. What is the force applied?',
    questionSubtitle: 'Use F = ke',
    options: ['66.7 N', '20.3 N', '6 N', '0.015 N'],
    correctAnswer: 2,
    keywords: ["Hooke's Law", 'F = ke', 'spring constant', 'extension', 'force', 'elastic limit', 'proportional', 'newtons per metre'],
    sentenceStarters: ["Using Hooke's Law F = ke, I multiply...", 'F = k × e = 20 × 0.3 = ...', 'Spring constant k tells us how stiff the spring is...', 'Extension e is measured in metres from the natural length...', "Hooke's Law only applies as long as the elastic limit is not..."],
    modelAnswers: [
      "Using Hooke's Law F = ke, I multiply **20 N/m × 0.3 m = 6 N**.",
      'F = k × e = 20 × 0.3 = **6 N**.',
      'Spring constant k tells us how stiff the spring is ** -  a higher k means more force is needed for the same extension**.',
      'Extension e is measured in metres from the natural length ** -  0.3 m means the spring is stretched 30 cm beyond its rest length**.',
      "Hooke's Law only applies as long as the elastic limit is not **exceeded  -  beyond it the spring deforms permanently**.",
    ],
    misconception: 'Hooke\'s Law does not apply beyond the elastic limit.',
    concept: 'F = 20 × 0.3 = 6 N. The extension is proportional to force only while in the elastic region. Beyond the elastic limit, the relationship becomes non-linear - the spring is permanently deformed.',
  },
  moments: {
    id: 'moments', module: 'Forces', moduleColor: FC,
    title: 'Moments, Levers & Gears', subtitle: 'Moment = F × d from Pivot',
    description: 'A moment (turning effect) = force × perpendicular distance from pivot. For a balanced system: clockwise moments = anticlockwise moments. Levers multiply force (effort × effort arm = load × load arm). Gears transmit rotational force - a larger gear turns more slowly but with more force.',
    lessonVisual: MomentsLesson, ideaVisual: MomentsIdea, realityVisual: MomentsReality,
    question: 'A 30 N force acts 2 m from a pivot. What force is needed 3 m from the pivot on the other side to balance it?',
    questionSubtitle: 'Clockwise moment = anticlockwise moment',
    options: ['45 N', '20 N', '15 N', '60 N'],
    correctAnswer: 1,
    keywords: ['moment', 'M = Fd', 'pivot', 'clockwise', 'anticlockwise', 'principle of moments', 'balanced', 'newton-metres'],
    sentenceStarters: ['For balance, clockwise moment = anticlockwise moment...', 'Moment = force × distance from pivot = 30 × 2 = ...', 'Using the principle of moments: F₁d₁ = F₂d₂...', '30 × 2 = F × 3, so F = ...', 'The principle of moments states that for equilibrium...'],
    modelAnswers: [
      'For balance, clockwise moment = anticlockwise moment, **so 30 × 2 = F × 3, giving F = 20 N**.',
      'Moment = force × distance from pivot = 30 × 2 = **60 N·m (clockwise)**.',
      'Using the principle of moments: F₁d₁ = F₂d₂, **so 30 × 2 = F × 3, therefore F = 60 ÷ 3 = 20 N**.',
      '30 × 2 = F × 3, so F = **60 ÷ 3 = 20 N**.',
      'The principle of moments states that for equilibrium **the sum of clockwise moments equals the sum of anticlockwise moments**.',
    ],
    misconception: 'The weight alone does not determine balance - position matters equally.',
    concept: '30 × 2 = 60 N·m. To balance: F × 3 = 60, so F = 20 N. A smaller force placed further from the pivot creates the same moment as a larger force close to the pivot.',
  },
  fluid_pressure: {
    id: 'fluid_pressure', module: 'Forces', moduleColor: FC,
    title: 'Pressure in Fluids', subtitle: 'p = ρgh and Upthrust',
    description: 'Pressure in a fluid acts in all directions. Pressure increases with depth: p = ρgh (density × g × height). The atmosphere is a fluid - atmospheric pressure decreases with altitude as less air is above. Upthrust occurs because pressure at the bottom of a submerged object is greater than at the top.',
    lessonVisual: FluidPressureLesson, ideaVisual: FluidPressureIdea, realityVisual: FluidPressureReality,
    question: 'What is the pressure at a depth of 5 m in water? (ρ = 1000 kg/m³, g = 10 N/kg)',
    questionSubtitle: 'Use p = ρgh',
    options: ['5000 Pa', '50000 Pa', '500 Pa', '1000 Pa'],
    correctAnswer: 1,
    keywords: ['fluid pressure', 'P = ρgh', 'depth', 'density', 'gravitational field strength', 'pascals', 'water column', 'increases with depth'],
    sentenceStarters: ['Using P = ρgh, I substitute the values...', 'P = 1000 × 10 × 5 = ...', 'Pressure increases with depth because...', 'ρ = 1000 kg/m³, g = 10 N/kg, h = 5 m...', 'P = ρ × g × h = ... × ... × ... = ...'],
    modelAnswers: [
      'Using P = ρgh, I substitute **ρ = 1000, g = 10, h = 5 to get P = 1000 × 10 × 5 = 50 000 Pa**.',
      'P = 1000 × 10 × 5 = **50 000 Pa**.',
      'Pressure increases with depth because **the weight of water above increases  -  more water pressing down means greater pressure**.',
      'ρ = 1000 kg/m³, g = 10 N/kg, h = 5 m, **so P = ρgh = 1000 × 10 × 5 = 50 000 Pa**.',
      'P = ρ × g × h = **1000 × 10 × 5 = 50 000 Pa**.',
    ],
    misconception: 'Fluid pressure acts in all directions, not just downward.',
    concept: 'p = 1000 × 10 × 5 = 50000 Pa. Pressure increases with depth. This explains why submarines need reinforced hulls and why deep-sea fish have adapted bodies.',
  },
  motion_graphs: {
    id: 'motion_graphs', module: 'Forces', moduleColor: FC,
    title: 'Forces & Motion', subtitle: 'Distance-Time & Velocity-Time Graphs',
    description: 'Distance-time graphs: gradient = speed; flat line = stationary; curved line = accelerating. Velocity-time graphs: gradient = acceleration; flat line = constant velocity; area under graph = distance. Deceleration = negative gradient. Terminal velocity: when air resistance equals driving force.',
    lessonVisual: MotionGraphsLesson, ideaVisual: MotionGraphsIdea, realityVisual: MotionGraphsReality,
    question: 'On a velocity-time graph, what does the area under the line represent?',
    questionSubtitle: 'Think about what v × t gives',
    options: ['Acceleration', 'Speed', 'Distance travelled', 'Force'],
    correctAnswer: 2,
    keywords: ['velocity-time graph', 'area under graph', 'distance travelled', 'gradient', 'acceleration', 'displacement', 'uniform acceleration', 'slope'],
    sentenceStarters: ['The area under a velocity-time graph represents distance (or displacement)...', 'The gradient of a velocity-time graph gives the acceleration...', 'Distance = velocity × time, which equals the area under the graph because...', 'On a velocity-time graph, a straight line means uniform acceleration...', 'To find distance, I calculate the area using ½ × base × height or base × height...'],
    modelAnswers: [
      'The area under a velocity-time graph represents **the distance (or displacement) travelled**.',
      'The gradient of a velocity-time graph gives **the acceleration  -  a steeper slope means greater acceleration**.',
      'Distance = velocity × time, which equals the area under the graph because **area = height × width = velocity × time**.',
      'On a velocity-time graph, a straight line means **uniform (constant) acceleration**.',
      'To find distance, I calculate the area using ½ × base × height or base × height **depending on whether the shape is a triangle or rectangle**.',
    ],
    misconception: 'A horizontal line on a v-t graph means constant velocity, not zero velocity.',
    concept: 'Area under v-t graph = v × t = distance (same as distance = speed × time). A horizontal flat line means constant velocity - the object is moving at steady speed, not stationary.',
  },
  newtons_laws: {
    id: 'newtons_laws', module: 'Forces', moduleColor: FC, practicalId: 'acceleration',
    title: "Newton's Laws of Motion", subtitle: 'Inertia, F = ma & Action-Reaction',
    description: "Newton's 1st: object at rest stays at rest, object moving stays moving at constant velocity, unless acted on by a resultant force (inertia). 2nd: F = ma (resultant force = mass × acceleration). 3rd: every action has an equal and opposite reaction force acting on the other object.",
    lessonVisual: NewtonsLawsLesson, ideaVisual: NewtonsLawsIdea, realityVisual: NewtonsLawsReality,
    question: 'A 1200 kg car accelerates at 3 m/s². What is the resultant force?',
    questionSubtitle: 'Use F = ma',
    options: ['400 N', '3600 N', '1203 N', '0.0025 N'],
    correctAnswer: 1,
    keywords: ["Newton's Second Law", 'F = ma', 'resultant force', 'mass', 'acceleration', 'newtons', 'net force', 'proportional'],
    sentenceStarters: ["Using Newton's Second Law: F = m × a...", 'F = 1200 × 3 = ...', 'Resultant force is the overall (net) force acting on an object...', 'Greater mass requires a greater force for the same acceleration...', 'F = m × a = 1200 × 3 = ...'],
    modelAnswers: [
      "Using Newton's Second Law: F = m × a, **F = 1200 × 3 = 3600 N**.",
      'F = 1200 × 3 = **3600 N**.',
      'Resultant force is the overall (net) force acting on an object ** -  the vector sum of all individual forces**.',
      'Greater mass requires a greater force for the same acceleration ** -  doubling mass doubles the force needed (F = ma)**.',
      'F = m × a = 1200 × 3 = **3600 N**.',
    ],
    misconception: 'In a vacuum, heavy and light objects fall at the same rate.',
    concept: 'F = 1200 × 3 = 3600 N. Air resistance causes heavier objects to appear to fall faster, but in a vacuum (no air resistance) all objects accelerate at g = 9.8 m/s² regardless of mass.',
  },
  stopping_distance: {
    id: 'stopping_distance', module: 'Forces', moduleColor: FC,
    title: 'Stopping Distance', subtitle: 'Thinking Distance + Braking Distance',
    description: 'Total stopping distance = thinking distance + braking distance. Thinking distance = reaction time × speed (affected by: tiredness, alcohol, drugs, distractions). Braking distance depends on speed squared, road/tyre condition, brake condition. When brakes are applied, KE is transferred to thermal energy in brakes.',
    lessonVisual: StoppingDistanceLesson, ideaVisual: StoppingDistanceIdea, realityVisual: StoppingDistanceReality,
    question: 'If a car\'s speed doubles, what happens to its braking distance (assuming same braking force)?',
    questionSubtitle: 'Braking distance ∝ v² (kinetic energy argument)',
    options: ['It doubles', 'It triples', 'It quadruples', 'It stays the same'],
    correctAnswer: 2,
    keywords: ['stopping distance', 'braking distance', 'thinking distance', 'kinetic energy', 'speed squared', 'quadruples', 'reaction time', 'braking force'],
    sentenceStarters: ['Braking distance depends on kinetic energy, and KE = ½mv²...', 'When speed doubles, KE increases by a factor of 4 because...', 'Since KE ∝ v², doubling the speed means KE...', 'Thinking distance is proportional to speed, but braking distance is proportional to speed²...', 'Braking distance quadruples because KE is proportional to speed squared...'],
    modelAnswers: [
      'Braking distance depends on kinetic energy, and KE = ½mv², **so if speed doubles, KE quadruples and braking distance quadruples**.',
      'When speed doubles, KE increases by a factor of 4 because **KE ∝ v²  -  doubling v means v² is 4× larger**.',
      'Since KE ∝ v², doubling the speed means KE **quadruples  -  the same braking force must absorb 4× the energy, so distance quadruples**.',
      'Thinking distance is proportional to speed, but braking distance is proportional to **speed squared  -  so braking distance quadruples when speed doubles**.',
      'Braking distance quadruples because KE is proportional to speed squared ** -  twice the speed = four times the kinetic energy = four times the braking distance**.',
    ],
    misconception: 'Braking distance is proportional to speed squared - not linearly proportional.',
    concept: 'KE = ½mv². If speed doubles, KE quadruples. With the same braking force, four times more distance is needed to remove four times the kinetic energy. Thinking distance doubles (linear with speed).',
  },
  momentum: {
    id: 'momentum', module: 'Forces', moduleColor: FC,
    title: 'Momentum', subtitle: 'p = mv and Conservation',
    description: 'Momentum p = mv (kg·m/s). In a closed system, total momentum is conserved: total before = total after any collision or explosion. A force changes momentum: F = Δ(mv)/t = ma. Safety features (airbags, crumple zones) increase collision time, reducing the force experienced (same change in momentum over longer time).',
    lessonVisual: MomentumLesson, ideaVisual: MomentumIdea, realityVisual: MomentumReality,
    question: 'Why do airbags reduce injury in a crash?',
    questionSubtitle: 'Think about force = change in momentum ÷ time',
    options: ['They absorb all the momentum', 'They increase the time of the collision, reducing the force', 'They prevent the passenger from decelerating', 'They increase the stopping distance of the car'],
    correctAnswer: 1,
    keywords: ['momentum', 'impulse', 'force', 'time of collision', 'F = Δp/Δt', 'change in momentum', 'deceleration', 'longer time'],
    sentenceStarters: ['Airbags increase the time of the collision, which reduces...', 'F = Δp/Δt: if time increases, force...', 'The change in momentum stays the same, but if time is longer...', 'Impulse = force × time = change in momentum...', 'Reducing the force during a crash reduces injury because...'],
    modelAnswers: [
      'Airbags increase the time of the collision, which reduces **the force experienced by the passenger (F = Δp/Δt)**.',
      'F = Δp/Δt: if time increases, force **decreases  -  the same change in momentum spread over longer time means less force**.',
      'The change in momentum stays the same, but if time is longer **the force required is smaller, reducing injury**.',
      'Impulse = force × time = change in momentum, **so increasing time reduces the force needed to cause the same change in momentum**.',
      'Reducing the force during a crash reduces injury because **force = rate of change of momentum  -  longer collision time = lower force**.',
    ],
    misconception: 'Momentum is not destroyed in a collision - it is conserved.',
    concept: 'F = Δp/t. The change in momentum is the same with or without an airbag. But an airbag increases the time over which momentum changes - so force = Δp/t is much smaller, reducing injury.',
  },
}
