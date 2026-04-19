import { motion } from 'motion/react'
import { useState, useEffect } from 'react'
import { ArrowRight, ArrowLeft, ArrowUp, ArrowDown, Scale, Gauge, Activity, TrendingDown } from 'lucide-react'
import { IdeaCaption, RealityBadge, FormulaBox, LabelledArrow, MisconceptionCard, RealWorldCard, SimSlider, SimNarration } from './visuals-helpers'

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
      <svg width="260" height="178" viewBox="0 0 260 178" role="img" aria-label="Free body diagram showing forces acting on an object: normal force, weight, thrust, and friction">
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
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 px-4 py-3">
      <MisconceptionCard
        wrong="If you push a wall and it doesn't move, the wall pushes back with less force — because the wall is stationary."
        right="Newton's 3rd Law: the wall always pushes back with exactly equal and opposite force, regardless of whether anything moves. Action–reaction pairs are always equal."
        wrongLabel="Newton's 3rd misconception"
        rightLabel="Equal & opposite always"
      />
    </div>
  )
}
function ForceInteractionsReality() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 px-4 py-3">
      <RealWorldCard icon="🚀" title="Rocket propulsion" desc="Exhaust gases are pushed backward (action). The rocket is pushed forward with equal force (reaction). No ground needed — works in space." color="#00a8e8" delay={0} />
      <RealWorldCard icon="🏊" title="Swimming" desc="Swimmer's hands push water backward. Water pushes the swimmer forward with exactly equal force — Newton's 3rd pair in action." color="#10b981" delay={0.1} />
      <RealWorldCard icon="🔫" title="Gun recoil" desc="Bullet fired forward at high speed. Rifle kicks backward with the same impulse. Equal forces, but the heavier rifle accelerates less (F = ma)." color="#f97316" delay={0.2} />
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
      <svg width="260" height="108" viewBox="0 0 260 108" role="img" aria-label="Animated diagram showing a box being pushed along a surface by an applied force">
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
        <SimSlider label="Force" min={1} max={50} value={force} onChange={setForce} unit="N" color={FC} />
        <SimSlider label="Distance" min={1} max={10} value={dist} onChange={setDist} unit="m" color="#fdc700" />
        <div className="flex justify-between mt-1.5 pt-1.5 text-xs font-bold" style={{ borderTop: '1px solid #0b1121' }}>
          <span style={{ color: '#a8b8cc' }}>W = {force} × {dist}</span>
          <motion.span key={work} style={{ color: FC }} initial={{ scale: 0.85 }} animate={{ scale: 1 }}>{work} J</motion.span>
        </div>
      </div>
      <SimNarration text={`Applying ${force} N over ${dist} m transfers ${work} J of energy. ${work > 200 ? "That's a large amount of work — like pushing a heavy object a long way." : work > 50 ? "That's a moderate amount of work." : "That's a small amount of work — low force or short distance."}`} />
    </div>
  )
}
function WorkDoneIdea() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 px-4 py-3">
      <MisconceptionCard
        wrong="Holding a heavy bag is hard work — you're exerting a force the whole time, so you must be doing lots of work."
        right="Work = force × distance moved in the direction of force. If the bag doesn't move, displacement = 0, so W = F × 0 = 0 J. Muscles tire, but no physics work is done."
        wrongLabel="Everyday vs physics"
        rightLabel="W = Fd"
      />
    </div>
  )
}
function WorkDoneReality() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 px-4 py-3">
      <RealWorldCard icon="🏗️" title="Crane lifting steel" desc="W = Fd = 50 000 N × 20 m = 1 000 000 J = 1 MJ. All that energy is stored as gravitational PE in the load." color="#00a8e8" delay={0} />
      <RealWorldCard icon="🎿" title="Ski slope friction" desc="Friction does negative work on a skier, transferring kinetic energy to thermal energy. W = friction force × slope length." color="#f97316" delay={0.1} />
      <RealWorldCard icon="💪" title="Weight-lifter holding still" desc="Muscles burn fuel but do zero physics work — the bar doesn't move so displacement = 0 and W = 0 J." color="#a855f7" delay={0.2} />
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
        <svg width="52" height={svgH} viewBox={`0 0 52 ${svgH}`} role="img" aria-label="Spring stretching diagram showing extension and load">
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
            <SimSlider label="Extension" min={1} max={8} value={ext} onChange={setExt} unit="cm" color={FC} />
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
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 px-4 py-3">
      <MisconceptionCard
        wrong="Doubling the force always doubles the extension — Hooke's Law applies no matter how much force you apply."
        right="Hooke's Law (F = ke) only holds up to the elastic limit. Beyond it, the spring deforms permanently — extension is no longer proportional to force."
        wrongLabel="Ignoring the limit"
        rightLabel="Elastic limit matters"
      />
    </div>
  )
}
function HookesLawReality() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 px-4 py-3">
      <RealWorldCard icon="🏹" title="Bow and arrow" desc="Archer's bow acts as a spring: F = ke stores elastic PE. Beyond elastic limit, the bow cracks — experienced archers know the safe draw weight." color="#00a8e8" delay={0} />
      <RealWorldCard icon="🚗" title="Car suspension springs" desc="Designed with a high spring constant k to support the car's weight within elastic range. Overloading permanently deforms the spring." color="#f97316" delay={0.1} />
      <RealWorldCard icon="🏥" title="Medical compression bandages" desc="Elastic bandages obey Hooke's Law at low force. Stretched beyond elastic limit, they lose their compression and must be replaced." color="#10b981" delay={0.2} />
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
      <svg width="260" height="138" viewBox="0 0 260 138" role="img" aria-label="See-saw balance diagram showing moments about a pivot">
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
        <SimSlider label="F₁" min={1} max={20} value={f1} onChange={setF1} unit="N" color="#e879f9" />
        <div className="flex justify-between text-xs mt-1.5">
          <span style={{ color: '#a8b8cc' }}>Moment = F × d (N·m)</span>
          <span style={{ color: FC }} className="font-mono font-bold">{f1}×70 = {f1 * 70}</span>
        </div>
      </div>
      <SimNarration text={`F₁ = ${f1} N at 70 cm from pivot → moment = ${f1 * 70} N·cm. F₂ = 10 N at 70 cm → moment = ${10 * 70} N·cm. ${isBalanced ? 'The beam is balanced — clockwise equals anticlockwise moments.' : 'The beam tips — moments are not equal.'}`} />
    </div>
  )
}
function MomentsIdea() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 px-4 py-3">
      <MisconceptionCard
        wrong="The heavier child always wins on a see-saw — only weight matters, not where you sit."
        right="Moment = force × perpendicular distance from pivot. A lighter child sitting further from the pivot creates a larger moment and can balance (or beat) a heavier child sitting close."
        wrongLabel="Weight-only thinking"
        rightLabel="Moment = F × d"
      />
    </div>
  )
}
function MomentsReality() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 px-4 py-3">
      <RealWorldCard icon="🔧" title="Spanner and bolt" desc="A long spanner handle gives a large distance from pivot, creating a bigger moment with the same force. Mechanic tricks: use a longer spanner for a stubborn bolt." color="#00a8e8" delay={0} />
      <RealWorldCard icon="🏗️" title="Construction crane" desc="Cranes use a counterbalance on the opposite side to prevent tipping. Moment of load = moment of counterbalance about the tower pivot." color="#f97316" delay={0.1} />
      <RealWorldCard icon="🚪" title="Door handle placement" desc="Door handles are placed far from the hinge to maximise the moment with minimal force. A handle near the hinge would require much more force to open." color="#10b981" delay={0.2} />
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
      <svg width="260" height="138" viewBox="0 0 260 138" role="img" aria-label="Fluid pressure diagram showing pressure increasing with depth in a liquid container">
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
        <SimSlider label="Depth" min={1} max={10} step={1} value={depth} onChange={setDepth} unit="m" color="#fdc700" />
      </div>
      <SimNarration text={`At ${depth} m depth in water: P = ρgh = 1000 × 10 × ${depth} = ${p.toLocaleString()} Pa (${(p/1000).toFixed(0)} kPa). ${depth >= 8 ? 'Very high pressure — equivalent to deep-sea conditions.' : depth >= 5 ? 'Significant pressure — noticeable on a submerged object.' : 'Relatively low pressure near the surface.'}`} />
    </div>
  )
}
function FluidPressureIdea() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 px-4 py-3">
      <MisconceptionCard
        wrong="Pressure in a liquid only acts downward — like gravity, it pushes things to the bottom."
        right="Fluid pressure acts equally in all directions at a given depth (Pascal's Law). That's why a dam wall bulges outward, not just downward, and why submarines need thick hulls on all sides."
        wrongLabel="Gravity confusion"
        rightLabel="All directions equally"
      />
    </div>
  )
}
function FluidPressureReality() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 px-4 py-3">
      <RealWorldCard icon="🌊" title="Deep-sea submarines" desc="At 1000 m depth, pressure = ρgh = 1000 × 10 × 1000 = 10 MPa — 100× atmospheric pressure — acting on every surface of the hull equally." color="#00a8e8" delay={0} />
      <RealWorldCard icon="🩸" title="Blood pressure cuff" desc="Inflated cuff squeezes the arm to briefly stop blood flow. Pressure in the cuff is transmitted in all directions — Pascal's Law in medicine." color="#ef4444" delay={0.1} />
      <RealWorldCard icon="🛞" title="Hydraulic brakes" desc="Pressing the brake pedal increases fluid pressure everywhere in the system simultaneously. Equal pressure acts on all four brake pistons — p = F/A." color="#f97316" delay={0.2} />
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
      <svg width="260" height="148" viewBox="0 0 260 148" role="img" aria-label="Distance-time and velocity-time graph showing motion with three segments at different speeds">
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
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 px-4 py-3">
      <MisconceptionCard
        wrong="A flat horizontal line on a velocity-time graph means the object has stopped — the line isn't going up or down."
        right="A flat line on a v-t graph means constant velocity (not zero velocity). Only if the flat line is on the x-axis (v = 0) is the object stationary."
        wrongLabel="Graph reading error"
        rightLabel="Flat = constant, not zero"
      />
    </div>
  )
}
function MotionGraphsReality() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 px-4 py-3">
      <RealWorldCard icon="🚆" title="Train between stations" desc="A v-t graph shows a flat line at 50 m/s between stations — the train is moving at constant speed, not stationary. Area under line = distance covered." color="#00a8e8" delay={0} />
      <RealWorldCard icon="📈" title="d-t graph slope = speed" desc="On a distance-time graph, gradient = speed. A steeper line means faster motion. A flat line on a d-t graph means stationary." color="#10b981" delay={0.1} />
      <RealWorldCard icon="🚗" title="v-t area = displacement" desc="The area under a velocity-time graph gives displacement. A trapezoid shape under a v-t graph means the object was accelerating then moving at constant speed." color="#f97316" delay={0.2} />
    </div>
  )
}

// ─── 28b. Terminal Velocity ──────────────────────────────────────────────────
function TerminalVelocityLesson() {
  const [stage, setStage] = useState(0)
  const stages = [
    { label: 'Accelerating', desc: 'Weight > Drag. Resultant force downward. Object speeds up rapidly.', color: '#00a8e8' },
    { label: 'Decelerating rate', desc: 'As speed increases, drag increases. Resultant force reduces. Still accelerating but more slowly.', color: '#6366f1' },
    { label: 'Terminal velocity', desc: 'Drag = Weight. Resultant force = 0. Constant velocity (Newton\'s 1st Law).', color: '#10b981' },
    { label: 'Parachute opens', desc: 'Drag suddenly >> Weight. Upward resultant force. Object decelerates.', color: '#ef4444' },
    { label: 'New terminal', desc: 'Drag again equals Weight at a much lower speed. New, lower terminal velocity.', color: '#fdc700' },
  ]
  // SVG path for the V-T curve
  // Stage 0-2: curve up and flatten; stage 3: drop; stage 4: flatten at lower level
  const fullPath = 'M20,105 C40,85 55,55 80,42 C95,35 105,32 120,32 L140,32 C142,32 144,28 146,50 C150,65 155,70 175,72 L240,72'
  return (
    <div className="w-full flex flex-col gap-2 px-3 pt-2 pb-2">
      <svg width="100%" viewBox="0 0 260 120" style={{ background: '#0f1829', borderRadius: 10, border: '1.5px solid #1d293d' }} role="img" aria-label="Velocity-time graph showing terminal velocity stages: acceleration, parachute opening, and new lower terminal velocity">
        <line x1="18" y1="10" x2="18" y2="110" stroke="#2d3e55" strokeWidth="1.2" />
        <line x1="18" y1="110" x2="250" y2="110" stroke="#2d3e55" strokeWidth="1.2" />
        <text x="4" y="60" fill="#4a5a72" fontSize="7" textAnchor="middle" transform="rotate(-90,4,60)">Velocity</text>
        <text x="134" y="120" fill="#4a5a72" fontSize="7" textAnchor="middle">Time</text>
        <path d={fullPath} fill="none" stroke={stages[stage].color} strokeWidth="2.5" strokeLinecap="round" />
        {/* Force arrows at terminal velocity stage */}
        {stage === 2 && <>
          <text x="190" y="28" fill="#ef4444" fontSize="8" fontWeight="700">↑ Drag</text>
          <text x="190" y="42" fill="#6366f1" fontSize="8" fontWeight="700">↓ Weight</text>
          <text x="185" y="56" fill="#10b981" fontSize="7">= balanced</text>
        </>}
        {stage === 3 && <text x="140" y="44" fill="#ef4444" fontSize="7" fontWeight="700">Parachute!</text>}
        {/* Terminal velocity dashed line */}
        {(stage >= 2) && <line x1="18" y1="32" x2={stage >= 3 ? 140 : 240} y2="32" stroke="#10b981" strokeWidth="1" strokeDasharray="4 3" strokeOpacity="0.5" />}
        {(stage >= 4) && <line x1="18" y1="72" x2="240" y2="72" stroke="#fdc700" strokeWidth="1" strokeDasharray="4 3" strokeOpacity="0.5" />}
      </svg>
      {/* Stage buttons */}
      <div className="flex flex-wrap gap-1">
        {stages.map((s, i) => (
          <button key={i} onClick={() => setStage(i)}
            className="px-2 py-0.5 rounded-[6px] text-xs font-semibold"
            style={{ background: stage === i ? `${s.color}25` : '#1d293d', color: stage === i ? s.color : '#a8b8cc', border: `1px solid ${stage === i ? s.color : '#2a3a52'}`, fontSize: 9 }}>
            {s.label}
          </button>
        ))}
      </div>
      <div className="px-3 py-2 rounded-[10px] text-xs" style={{ background: `${stages[stage].color}12`, border: `1px solid ${stages[stage].color}30`, color: '#e2e8f0' }}>
        {stages[stage].desc}
      </div>
    </div>
  )
}
function TerminalVelocityIdea() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 px-4 py-3">
      <MisconceptionCard
        wrong="At terminal velocity, the object has no forces acting on it — that's why it stops accelerating."
        right="At terminal velocity, weight and drag are equal and opposite — the resultant force is zero, so acceleration is zero. Both forces are still acting; they balance."
        wrongLabel="Forces disappear?"
        rightLabel="Forces balance, not vanish"
      />
    </div>
  )
}
function TerminalVelocityReality() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 px-4 py-3">
      <RealWorldCard icon="🪂" title="Skydiver" desc="Without parachute: terminal velocity ≈ 60 m/s (216 km/h). Opening the parachute massively increases drag, decelerating the skydiver to a safe ~6 m/s." color="#00a8e8" delay={0} />
      <RealWorldCard icon="🍂" title="Falling leaves" desc="A leaf's large surface area relative to mass creates high drag. Terminal velocity is just a few m/s — much lower than a dense acorn from the same tree." color="#f97316" delay={0.1} />
      <RealWorldCard icon="🌧️" title="Raindrops" desc="Large raindrops hit terminal velocity (~9 m/s) before reaching the ground. Without air resistance they'd hit at ~100 m/s — enough to cause serious injury." color="#3b82f6" delay={0.2} />
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
        <svg width="260" height="118" viewBox="0 0 260 118" key="law1" role="img" aria-label="Newton's First Law diagram: object at rest with balanced forces, and object moving at constant velocity">
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
          <svg width="260" height="90" viewBox="0 0 260 90" role="img" aria-label="Newton's Second Law force diagram showing F=ma with adjustable mass and force">
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
            <SimSlider label="Mass" min={1} max={10} value={mass} onChange={setMass} unit="kg" color="#c084fc" />
            <SimSlider label="Force" min={1} max={50} value={fN} onChange={setFN} unit="N" color={FC} />
            <div className="flex justify-between text-xs mt-1.5 pt-1.5 font-bold" style={{ borderTop: '1px solid #0b1121' }}>
              <span style={{ color: '#a8b8cc' }}>a = F/m = {fN}/{mass}</span>
              <span style={{ color: '#fdc700' }}>{accel} m/s²</span>
            </div>
          </div>
        </div>
      )}

      {law === 3 && (
        <svg width="260" height="118" viewBox="0 0 260 118" key="law3" role="img" aria-label="Newton's Third Law diagram showing equal and opposite action-reaction forces between two objects">
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
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 px-4 py-3">
      <MisconceptionCard
        wrong="Heavier objects fall faster — gravity pulls them with more force, so they accelerate more quickly."
        right="F = ma. A heavier object has more weight (force) but also more mass to accelerate. These cancel: a = F/m = mg/m = g for all objects. All objects fall at the same rate in a vacuum."
        wrongLabel="Aristotle's error"
        rightLabel="Newton's 2nd law"
      />
    </div>
  )
}
function NewtonsLawsReality() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 px-4 py-3">
      <RealWorldCard icon="🌙" title="Apollo 15 feather drop" desc="On the Moon (no air), astronaut David Scott dropped a hammer and feather simultaneously. They hit the ground at exactly the same time — proving Galileo right." color="#00a8e8" delay={0} />
      <RealWorldCard icon="🚗" title="Car crash safety" desc="F = ma — in a crash, the car decelerates rapidly. Seatbelts and crumple zones increase stopping time (Δt), reducing the force on passengers." color="#ef4444" delay={0.1} />
      <RealWorldCard icon="🛸" title="Rocket in deep space" desc="In space with no air resistance, a constant thrust produces constant acceleration (Newton's 1st and 2nd). The rocket keeps speeding up indefinitely." color="#a855f7" delay={0.2} />
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
      <SimSlider label="Speed" min={10} max={30} step={1} value={speed} onChange={setSpeed} unit="m/s" color={FC} />

      {/* SVG bar diagram */}
      <svg width="280" height="128" viewBox="0 0 280 128" role="img" aria-label="Bar diagram showing thinking distance and braking distance at the selected speed">
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
      <SimNarration text={`At ${speed} m/s: thinking distance ${thinking} m + braking distance ${braking} m = ${total} m total. ${speed >= 25 ? 'High speed — braking distance dominates (v² relationship).' : 'Moderate speed — thinking and braking distances are comparable.'}`} />
    </div>
  )
}
function StoppingDistanceIdea() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 px-4 py-3">
      <MisconceptionCard
        wrong="Doubling a car's speed doubles the stopping distance — it's a simple proportional relationship."
        right="Braking distance ∝ v². Doubling speed quadruples braking distance (KE = ½mv², all converted by friction). Reaction distance doubles, so total stopping distance more than doubles."
        wrongLabel="Linear assumption"
        rightLabel="Squared relationship"
      />
    </div>
  )
}
function StoppingDistanceReality() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 px-4 py-3">
      <RealWorldCard icon="🚗" title="30 mph vs 60 mph" desc="At 30 mph: typical stopping distance ~23 m. At 60 mph (2× speed): ~73 m — over 3× longer, not 2×. This is why 20 mph zones halve pedestrian fatalities." color="#ef4444" delay={0} />
      <RealWorldCard icon="🌧️" title="Wet roads — higher risk" desc="Reduced friction means braking force is lower, so it takes more distance to lose the same KE. Highway Code stopping distances assume dry conditions." color="#3b82f6" delay={0.1} />
      <RealWorldCard icon="😴" title="Reaction distance" desc="Reaction time ~0.7 s. At 30 mph (13.4 m/s), you travel 9.4 m before braking starts. Tiredness, drugs, or distractions increase reaction time significantly." color="#f97316" delay={0.2} />
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
      <svg width="260" height="116" viewBox="0 0 260 116" role="img" aria-label="Collision diagram showing two balls before, during, and after a collision with momentum labels">
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
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 px-4 py-3">
      <MisconceptionCard
        wrong="In a collision, the moving object always stops and transfers all its momentum to the stationary object."
        right="Momentum is conserved (p_before = p_after), but how it's shared depends on masses. A heavier moving object won't stop — it continues with reduced velocity after the collision."
        wrongLabel="Only true for equal masses"
        rightLabel="Conservation of momentum"
      />
    </div>
  )
}
function MomentumReality() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 px-4 py-3">
      <RealWorldCard icon="🎱" title="Snooker — Newton's cradle" desc="In an elastic collision between equal-mass snooker balls, momentum transfers completely. But a cue ball hitting two clustered balls shares momentum — both balls move." color="#00a8e8" delay={0} />
      <RealWorldCard icon="🚀" title="Rocket exhaust" desc="p = mv is conserved. Rocket throws mass backward at high speed, gaining forward momentum. No contact needed — this is how spacecraft manoeuvre in empty space." color="#f97316" delay={0.1} />
      <RealWorldCard icon="🚗" title="Car safety — crumple zones" desc="Impulse = Δp = FΔt. Crumple zones increase collision time Δt, reducing peak force F on passengers — same change in momentum, less deadly." color="#ef4444" delay={0.2} />
    </div>
  )
}

// ─── Vectors & Scalars ───────────────────────────────────────────────────────
function VectorsScalarsLesson() {
  const [mode, setMode] = useState('scalars')
  const scalars = mode === 'scalars'
  const scalarList = ['Speed', 'Distance', 'Mass', 'Temperature', 'Energy', 'Time']
  const vectorList = ['Velocity', 'Displacement', 'Force', 'Acceleration', 'Momentum', 'Weight']
  return (
    <div className="p-4">
      <div className="flex gap-2 mb-4">
        {[['scalars', 'Scalars'], ['vectors', 'Vectors'], ['resultant', 'Resultant']].map(([key, label]) => (
          <button key={key} onClick={() => setMode(key)}
            className="flex-1 py-2 rounded-[10px] text-xs font-semibold"
            style={{ background: mode === key ? FC : 'rgba(18,26,47,0.8)', color: mode === key ? '#fff' : '#a8b8cc', border: `1px solid ${mode === key ? FC : '#2d3e55'}` }}>
            {label}
          </button>
        ))}
      </div>
      {mode === 'scalars' && (
        <div>
          <p className="text-xs mb-3" style={{ color: '#a8b8cc' }}>Scalars have <strong style={{ color: FC }}>magnitude only</strong> — no direction needed.</p>
          <div className="flex flex-wrap gap-2">
            {scalarList.map(s => (
              <motion.div key={s} className="px-3 py-1.5 rounded-full text-xs font-semibold"
                style={{ background: `${FC}18`, color: FC, border: `1px solid ${FC}40` }}
                initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
                {s}
              </motion.div>
            ))}
          </div>
          <FormulaBox formula="Speed = distance ÷ time  (no direction)" color={FC} />
        </div>
      )}
      {mode === 'vectors' && (
        <div>
          <p className="text-xs mb-3" style={{ color: '#a8b8cc' }}>Vectors have <strong style={{ color: '#f97316' }}>magnitude AND direction</strong>.</p>
          <div className="flex flex-wrap gap-2">
            {vectorList.map(v => (
              <motion.div key={v} className="px-3 py-1.5 rounded-full text-xs font-semibold"
                style={{ background: 'rgba(249,115,22,0.15)', color: '#f97316', border: '1px solid rgba(249,115,22,0.4)' }}
                initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
                {v}
              </motion.div>
            ))}
          </div>
          <FormulaBox formula="Velocity = displacement ÷ time  (needs direction)" color="#f97316" />
        </div>
      )}
      {mode === 'resultant' && (
        <div>
          <p className="text-xs mb-3" style={{ color: '#a8b8cc' }}>Add perpendicular vectors using <strong style={{ color: FC }}>Pythagoras' theorem</strong>.</p>
          <svg viewBox="0 0 240 160" width="100%" style={{ maxHeight: 160 }} role="img" aria-label="Vector addition diagram showing a 3N horizontal force and 4N vertical force combining to give a 5N resultant using Pythagoras">
            <defs><marker id="ah" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill={FC}/></marker>
            <marker id="av" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#f97316"/></marker>
            <marker id="ar" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#00bc7d"/></marker></defs>
            <line x1="40" y1="120" x2="160" y2="120" stroke={FC} strokeWidth="2.5" markerEnd="url(#ah)"/>
            <text x="95" y="138" textAnchor="middle" fill={FC} fontSize="9">3 N →</text>
            <line x1="160" y1="120" x2="160" y2="40" stroke="#f97316" strokeWidth="2.5" markerEnd="url(#av)"/>
            <text x="178" y="84" textAnchor="middle" fill="#f97316" fontSize="9">4 N ↑</text>
            <line x1="40" y1="120" x2="160" y2="40" stroke="#00bc7d" strokeWidth="2.5" strokeDasharray="4,2" markerEnd="url(#ar)"/>
            <text x="88" y="72" fill="#00bc7d" fontSize="9" transform="rotate(-33,88,72)">5 N resultant</text>
            <text x="120" y="118" fill="#a8b8cc" fontSize="7">90°</text>
          </svg>
          <FormulaBox formula="R = √(3² + 4²) = √25 = 5 N" color="#00bc7d" />
          <RealityBadge color="#00bc7d">Pythagoras: R² = a² + b²</RealityBadge>
        </div>
      )}
    </div>
  )
}
function VectorsScalarsIdea() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 px-4 py-3">
      <MisconceptionCard
        wrong="Speed and velocity are the same thing — velocity is just the technical word for how fast something moves."
        right="Speed is a scalar (magnitude only). Velocity is a vector (magnitude + direction). A car driving at 60 km/h north has the same speed as one going 60 km/h south, but opposite velocities."
        wrongLabel="Same word, different meaning"
        rightLabel="Scalar vs vector"
      />
    </div>
  )
}
function VectorsScalarsReality() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 px-4 py-3">
      <RealWorldCard icon="🛰️" title="GPS navigation" desc="GPS calculates your displacement vector (distance + direction from start). Knowing total distance driven is useless for navigation — direction is essential." color="#00a8e8" delay={0} />
      <RealWorldCard icon="✈️" title="Aircraft crosswind landing" desc="A plane flying at 250 km/h south into a 50 km/h crosswind from the west has a resultant velocity vector — pilots must calculate this to land on the runway." color="#f97316" delay={0.1} />
      <RealWorldCard icon="🌀" title="Circular motion" desc="An object moving in a circle at constant speed is still accelerating — its direction changes continuously, so velocity changes even though speed stays the same." color="#a855f7" delay={0.2} />
    </div>
  )
}

// ─── Equations of Motion (SUVAT) ─────────────────────────────────────────────
function EquationsOfMotionLesson() {
  const [active, setActive] = useState(0)
  const eqs = [
    { eq: 'v = u + at', name: 'Velocity', desc: 'Final velocity from initial velocity, acceleration and time', missing: 'v or u or a or t' },
    { eq: 'v² = u² + 2as', name: 'No time', desc: 'Useful when time is not given or needed', missing: 'v, u, a or s — no t' },
    { eq: 's = ut + ½at²', name: 'Displacement', desc: 'Distance covered when accelerating from rest or a speed', missing: 's, u, a or t' },
    { eq: 's = ½(u+v)t', name: 'Average', desc: 'Displacement using average velocity × time', missing: 's, u, v or t' },
  ]
  const eq = eqs[active]
  return (
    <div className="p-4">
      <p className="text-xs mb-3" style={{ color: '#a8b8cc' }}>
        <strong style={{ color: FC }}>s</strong> = displacement &nbsp;
        <strong style={{ color: '#f97316' }}>u</strong> = initial velocity &nbsp;
        <strong style={{ color: '#00bc7d' }}>v</strong> = final velocity &nbsp;
        <strong style={{ color: '#c084fc' }}>a</strong> = acceleration &nbsp;
        <strong style={{ color: '#fdc700' }}>t</strong> = time
      </p>
      <div className="flex gap-1.5 mb-3 flex-wrap">
        {eqs.map((e, i) => (
          <button key={i} onClick={() => setActive(i)}
            className="px-3 py-1.5 rounded-[8px] text-xs font-bold"
            style={{ background: active === i ? FC : 'rgba(18,26,47,0.8)', color: active === i ? '#fff' : '#a8b8cc', border: `1px solid ${active === i ? FC : '#2d3e55'}` }}>
            {e.name}
          </button>
        ))}
      </div>
      <FormulaBox formula={eq.eq} color={FC} />
      <p className="text-xs mt-2" style={{ color: '#cad5e2' }}>{eq.desc}</p>
      <p className="text-xs mt-1" style={{ color: '#a8b8cc' }}>Use when: can find <em>{eq.missing}</em></p>
      <div className="mt-3 p-3 rounded-[12px]" style={{ background: 'rgba(0,168,232,0.08)', border: '0.75px solid rgba(0,168,232,0.25)' }}>
        <p className="text-xs font-semibold mb-1" style={{ color: FC }}>Example</p>
        <p className="text-xs" style={{ color: '#a8b8cc' }}>
          {active === 0 && 'Car from 0 m/s, a = 2 m/s², t = 5 s → v = 0 + 2×5 = 10 m/s'}
          {active === 1 && 'Car from 0 m/s, a = 2 m/s², s = 25 m → v² = 0 + 2×2×25 = 100 → v = 10 m/s'}
          {active === 2 && 'Car from 0 m/s, a = 2 m/s², t = 5 s → s = 0×5 + ½×2×25 = 25 m'}
          {active === 3 && 'Car u=0, v=10 m/s, t=5 s → s = ½×(0+10)×5 = 25 m'}
        </p>
      </div>
    </div>
  )
}
function EquationsOfMotionIdea() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 px-4 py-3">
      <MisconceptionCard
        wrong="SUVAT equations work for any motion — you just need to pick the right one for what you're given."
        right="SUVAT equations only work for uniform (constant) acceleration. For variable acceleration (e.g. a car with changing engine force), you need calculus or motion graphs."
        wrongLabel="Critical limitation"
        rightLabel="Uniform acceleration only"
      />
    </div>
  )
}
function EquationsOfMotionReality() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 px-4 py-3">
      <RealWorldCard icon="🎯" title="Projectile motion" desc="A ball launched horizontally: horizontal motion uses s = ut (a=0, constant velocity). Vertical uses s = ½at². Two SUVAT analyses — one for each direction." color="#00a8e8" delay={0} />
      <RealWorldCard icon="🚀" title="Spacecraft re-entry" desc="As a capsule enters atmosphere, drag increases with speed — acceleration isn't constant. SUVAT fails here; engineers use numerical integration to track motion." color="#f97316" delay={0.1} />
      <RealWorldCard icon="⚡" title="v² = u² + 2as — no time needed" desc="When time isn't given (or isn't needed), v² = u² + 2as is the fastest route. Find final speed after decelerating from 30 m/s over 45 m in one step." color="#10b981" delay={0.2} />
    </div>
  )
}

export const FORCES_TOPICS = {
  vectors_scalars: {
    id: 'vectors_scalars', module: 'Forces', moduleColor: FC, course: 'combined', boards: ['aqa','edexcel','ocr-a','ocr-b','wjec','ccea'],
    title: 'Vectors & Scalars', subtitle: 'Magnitude, Direction & Resultant Forces',
    description: 'Scalar quantities have magnitude only (e.g. speed, distance, mass, temperature, energy, time). Vector quantities have both magnitude and direction (e.g. velocity, displacement, force, acceleration, momentum, weight). To find the resultant of two perpendicular forces, use Pythagoras: R² = a² + b². Vectors are represented by arrows — the length shows magnitude, the direction shows the direction of the quantity.',
    lessonVisual: VectorsScalarsLesson, ideaVisual: VectorsScalarsIdea, realityVisual: VectorsScalarsReality,
    question: 'Which of the following is a vector quantity?',
    questionSubtitle: 'Vectors have both magnitude AND direction',
    options: ['Speed', 'Mass', 'Temperature', 'Velocity'],
    correctAnswer: 3,
    keywords: ['vector', 'scalar', 'magnitude', 'direction', 'resultant', 'velocity', 'displacement', 'Pythagoras', 'perpendicular', 'speed'],
    sentenceStarters: ['A vector has both magnitude and direction, for example...', 'Speed is a scalar because it only tells you how fast, not...', 'To find the resultant of two perpendicular forces I use Pythagoras...', 'The difference between speed and velocity is that velocity also has...', 'A scalar quantity only needs a number and a unit, such as...'],
    modelAnswers: [
      'Velocity is a vector because **it has both magnitude (speed) and direction  -  e.g. 30 m/s north**.',
      'Speed is a scalar because **it only tells you how fast something is moving, not which way**.',
      'To find the resultant of two perpendicular forces I use Pythagoras: **R² = a² + b²**.',
      'The difference between speed and velocity is that **velocity also specifies direction  -  they are equal in magnitude but velocity is a vector**.',
      'A scalar quantity only needs a number and a unit, such as **5 kg, 100 J or 20°C**.',
    ],
    misconception: 'Speed and velocity are not the same — velocity requires direction.',
    concept: 'Scalar = magnitude only (speed, mass). Vector = magnitude + direction (velocity, force, acceleration). Resultant of perpendicular forces: R² = a² + b² (Pythagoras).',

    // -- 9-STEP LESSON DATA ----------------------------------------------------

    hook: {
      hookFact: 'In 1999, NASA lost a $327 million Mars orbiter because one engineering team used metric units and another used imperial. The spacecraft received the wrong velocity vector and burned up in the Martian atmosphere.',
      hookQuestion: 'If a plane flies at 200 m/s and a crosswind blows at 90 degrees to its path, is its actual speed over the ground more or less than 200 m/s? How would you find out?',
      hookEmoji: '🚀',
    },

    lessonKeywords: [
      {
        word: 'Scalar',
        symbol: '',
        unit: '',
        definition: 'A quantity with magnitude only - no direction.',
        everydayNote: 'Temperature is a scalar: 20°C tells you how hot, not which way.',
      },
      {
        word: 'Vector',
        symbol: '',
        unit: '',
        definition: 'A quantity with both magnitude and direction.',
        everydayNote: 'Velocity is a vector: 30 m/s north tells you how fast AND which way.',
      },
      {
        word: 'Resultant',
        symbol: 'R',
        unit: 'N or m/s (depends on context)',
        definition: 'The single force or velocity that has the same effect as two or more combined.',
        everydayNote: 'A river current and a swimmer combine to give one resultant direction of travel.',
      },
      {
        word: 'Displacement',
        symbol: 's',
        unit: 'm',
        definition: 'Distance moved in a specific direction - a vector.',
        everydayNote: 'Walking 5 m north and then 5 m south gives zero displacement, but 10 m of distance.',
      },
      {
        word: 'Perpendicular',
        symbol: '',
        unit: '',
        definition: 'At right angles (90°) to each other.',
        everydayNote: 'East and north are perpendicular directions - use Pythagoras to find their resultant.',
      },
    ],

    prerequisiteCheck: {
      questions: [
        {
          question: 'A right-angled triangle has sides of 3 cm and 4 cm. What is the hypotenuse?',
          answers: ['5 cm', '7 cm', '3.5 cm', '12 cm'],
          correct: 0,
          feedback: 'Pythagoras: 3² + 4² = 9 + 16 = 25. Square root of 25 = 5 cm. This is the classic 3-4-5 triangle.',
        },
        {
          question: 'Which of these is NOT a vector quantity?',
          answers: ['Force', 'Speed', 'Acceleration', 'Velocity'],
          correct: 1,
          feedback: 'Speed has magnitude only (e.g. 30 m/s) with no direction stated - it is a scalar. Velocity is the vector version: 30 m/s north.',
        },
      ],
    },

    topicMapHint: {
      before: ['Forces - basic push/pull', 'Speed and distance'],
      current: 'Vectors & Scalars',
      after: ['Free Body Diagrams', 'Equations of Motion'],
    },

    workedExample: {
      title: 'Boat crossing a river - finding resultant velocity',
      equation: 'R² = a² + b²  →  R = √(a² + b²)',
      context: 'A boat moves east at 3 m/s. The river current flows south at 4 m/s. Find the resultant speed.',
      steps: [
        { step: 1, action: 'Write what you know', content: 'East velocity: 3 m/s. South velocity: 4 m/s. These are perpendicular.', annotation: 'Draw a right-angled vector triangle - east along one side, south along the other.' },
        { step: 2, action: 'Write the equation', content: 'R² = a² + b²', annotation: 'Pythagoras only works for perpendicular (right-angled) components.' },
        { step: 3, action: 'Substitute', content: 'R² = 3² + 4² = 9 + 16 = 25', annotation: 'Common error: adding the values before squaring. Always square first, then add.' },
        { step: 4, action: 'Calculate and state with unit', content: 'R = √25 = 5 m/s', annotation: 'Sense check: 5 m/s is bigger than 3 m/s but less than 3 + 4 = 7 m/s. That is correct.' },
      ],
      misconceptionAfter: {
        claim: 'You just add the two speeds together: 3 + 4 = 7 m/s.',
        reality: 'That only works if both velocities point in the same direction. Perpendicular vectors combine by Pythagoras, giving 5 m/s - not 7.',
        visual: 'Think of walking 3 m east then 4 m south - you end up 5 m from the start, not 7 m.',
      },
    },

    guidedPractice: {
      tier1: {
        question: 'A force of 6 N acts east and a force of 8 N acts north. Find the resultant force.',
        allSteps: ['Write: a = 6 N, b = 8 N (perpendicular)', 'Equation: R² = a² + b²', 'Substitute: R² = 6² + 8² = 36 + 64 = 100', '??? - calculate R'],
        missingStep: 3,
        missingHint: 'Calculate: R = √100 = ?',
        answer: 10,
        answerUnit: 'N',
      },
      tier2: {
        question: 'A plane flies east at 5 m/s. A wind blows north at 12 m/s. Find the resultant speed.',
        shownEquation: 'R² = a² + b²  →  R = √(a² + b²)',
        shownStep1: 'Write what you know: east = 5 m/s, north = 12 m/s',
        hint: 'R² = 5² + 12² = 25 + 144 = 169',
        answer: 13,
        answerUnit: 'm/s',
      },
      tier3: {
        question: 'A 9 N force acts east and a 40 N force acts north. Find the resultant force.',
        hint: 'Use R² = a² + b². Calculate 9² and 40² separately first.',
        methodHint: 'Start with R² = 81 + 1600. Find the square root of the total.',
        answer: 41,
        answerUnit: 'N',
      },
    },

    summary: {
      equation: 'R² = a² + b²  →  R = √(a² + b²)',
      sentence: 'To find the resultant of two perpendicular vectors, square both, add them, then take the square root.',
      promptText: 'Without looking: name three scalars and three vectors. Then state the rule for combining perpendicular vectors.',
    },

    sessionRecap: [
      'Scalars have magnitude only (speed, mass, temperature, energy, distance). Vectors have magnitude AND direction (velocity, force, acceleration, displacement, momentum, weight).',
      'The resultant of two perpendicular forces is found using Pythagoras: R = √(a² + b²). The resultant is always smaller than the simple sum of the two forces.',
      'Vectors are drawn as arrows: length represents magnitude, and the arrowhead shows direction.',
    ],
  },
  force_interactions: {
    id: 'force_interactions', module: 'Forces', moduleColor: FC, course: 'combined', boards: ['aqa','edexcel','ocr-a','ocr-b','wjec','ccea'],
    title: 'Free Body Diagrams & Resultant Forces',
    subtitle: 'Drawing Forces, Finding Resultants & Equilibrium',
    description: 'A free body diagram shows all forces acting on an object as arrows — the length represents magnitude, the direction represents the direction of the force. Contact forces include friction, normal reaction, tension and air resistance. Non-contact forces include gravity (weight), magnetic and electrostatic. Weight = mg. The resultant force is the single force that has the same effect as all the individual forces combined. If forces are in the same line: add or subtract. If two forces are perpendicular: use Pythagoras (R² = F1² + F2²). For HT: use scale drawing (tip-to-tail triangle) to find resultant of non-perpendicular forces. When resultant force = 0, the object is in equilibrium (at rest or constant velocity).',
    lessonVisual: ForceInteractionsLesson, ideaVisual: ForceInteractionsIdea, realityVisual: ForceInteractionsReality,
    question: 'An object has a 30 N force acting right and a 40 N force acting upward. What is the magnitude of the resultant force?',
    questionSubtitle: 'Use Pythagoras: R² = 30² + 40²',
    options: ['35 N', '50 N', '70 N', '10 N'],
    correctAnswer: 1,
    keywords: ['free body diagram', 'resultant force', 'equilibrium', 'Pythagoras', 'perpendicular forces', 'weight = mg', 'contact force', 'non-contact force', 'scale drawing', 'vector addition', 'arrow length'],
    sentenceStarters: ['The resultant force is found using Pythagoras: R² = ...', 'R² = 30² + 40² = 900 + 1600 = ...', 'When resultant force = 0, the object is in equilibrium, which means...', 'A free body diagram shows all forces as arrows where...', 'For non-perpendicular forces, use a scale drawing (tip-to-tail) to find...'],
    modelAnswers: [
      'The resultant force is found using Pythagoras: R² = **30² + 40² = 900 + 1600 = 2500, so R = 50 N**.',
      'R² = 30² + 40² = 900 + 1600 = **2500; R = √2500 = 50 N**.',
      'When resultant force = 0, the object is in equilibrium, which means **it is either stationary or moving at constant velocity**.',
      'A free body diagram shows all forces as arrows where **the length of each arrow is proportional to the size of the force**.',
      'For non-perpendicular forces, use a scale drawing (tip-to-tail) to find **the resultant by measuring the closing line of the triangle**.',
    ],
    misconception: 'Equilibrium does NOT mean no forces are acting — it means the forces balance so the resultant is zero.',
    concept: 'R = √(30² + 40²) = √2500 = 50 N. This is a 3-4-5 triangle scaled by 10. Free body diagrams must show all forces with correct directions and relative magnitudes. Resultant = zero → equilibrium (no acceleration).',

    // -- 9-STEP LESSON DATA ----------------------------------------------------

    hook: {
      hookFact: 'A skydiver falling at terminal velocity has two forces above 700 N acting on them in opposite directions - weight down and drag up. The resultant is zero, yet both forces are large. They feel as though they are floating.',
      hookQuestion: 'If a car is moving at constant speed on a motorway, does that mean no forces are acting on it? What does "balanced forces" actually mean?',
      hookEmoji: '⚖️',
    },

    lessonKeywords: [
      {
        word: 'Free Body Diagram',
        symbol: '',
        unit: '',
        definition: 'A diagram showing all forces acting on an object as arrows, with length proportional to magnitude.',
        everydayNote: 'Every arrow on a free body diagram must start at the object - not floating nearby.',
      },
      {
        word: 'Resultant Force',
        symbol: 'F_net',
        unit: 'N',
        definition: 'The single force that has the same effect as all the individual forces combined.',
        everydayNote: 'Two people pulling a rope in opposite directions with 50 N each - resultant is 0 N, not 100 N.',
      },
      {
        word: 'Equilibrium',
        symbol: '',
        unit: '',
        definition: 'The state where the resultant force on an object is zero - it stays at rest or continues at constant velocity.',
        everydayNote: 'A book sitting still on a desk is in equilibrium: weight down, normal force up, both equal.',
      },
      {
        word: 'Contact Force',
        symbol: '',
        unit: '',
        definition: 'A force that requires physical contact between objects, such as friction, normal reaction, or tension.',
        everydayNote: 'Friction between your shoes and the floor is a contact force - remove contact and friction disappears.',
      },
      {
        word: 'Non-contact Force',
        symbol: '',
        unit: '',
        definition: 'A force that acts at a distance without physical contact - gravity, magnetic, electrostatic.',
        everydayNote: 'Gravity pulls the Moon toward Earth across 384,000 km of empty space.',
      },
    ],

    prerequisiteCheck: {
      questions: [
        {
          question: 'A car travels at 60 mph at constant speed. What is the resultant force on it?',
          answers: ['60 N', 'The same as the engine thrust', '0 N', 'Equal to its weight'],
          correct: 2,
          feedback: 'Constant speed means zero acceleration. By Newton\'s Second Law, F = ma = m × 0 = 0 N. The engine force and friction exactly balance.',
        },
        {
          question: 'Which of these is a contact force?',
          answers: ['Gravity', 'Magnetic force', 'Friction', 'Electrostatic force'],
          correct: 2,
          feedback: 'Friction only acts when two surfaces are in contact and one slides or tries to slide over the other. Gravity, magnetism, and electrostatic forces all act at a distance.',
        },
      ],
    },

    topicMapHint: {
      before: ['Vectors & Scalars', 'Forces - basic push/pull'],
      current: 'Free Body Diagrams & Resultant Forces',
      after: ['Work Done', "Newton's Laws of Motion"],
    },

    workedExample: {
      title: 'Finding the resultant of two perpendicular forces',
      equation: 'R² = F1² + F2²  →  R = √(F1² + F2²)',
      context: 'An object has 30 N acting east and 40 N acting north. Find the magnitude of the resultant.',
      steps: [
        { step: 1, action: 'Write what you know', content: 'F1 = 30 N east, F2 = 40 N north. Forces are perpendicular.', annotation: 'Draw the free body diagram first - arrows from the object, lengths proportional to force.' },
        { step: 2, action: 'Write the equation', content: 'R² = F1² + F2²', annotation: 'This is Pythagoras. It only works when the two forces are at 90° to each other.' },
        { step: 3, action: 'Substitute', content: 'R² = 30² + 40² = 900 + 1600 = 2500', annotation: 'Common error: writing 30 + 40 = 70. You must square first.' },
        { step: 4, action: 'Calculate and state with unit', content: 'R = √2500 = 50 N', annotation: 'This is a 3-4-5 triangle scaled by 10. Remember: 50 N, not 70 N.' },
      ],
      misconceptionAfter: {
        claim: 'If the resultant force is zero, there are no forces acting on the object.',
        reality: 'Zero resultant means forces are balanced - not absent. A skydiver at terminal velocity has 700 N weight and 700 N drag both acting. Resultant is zero, but the forces are very real.',
        visual: 'Two people in a tug of war both pulling hard - if the rope doesn\'t move, forces are balanced but enormous. Zero resultant, not zero forces.',
      },
    },

    guidedPractice: {
      tier1: {
        question: 'An object has 3 N east and 4 N north. Find the resultant force.',
        allSteps: ['Write: F1 = 3 N, F2 = 4 N (perpendicular)', 'Equation: R² = F1² + F2²', 'Substitute: R² = 3² + 4² = 9 + 16 = 25', '??? - calculate R'],
        missingStep: 3,
        missingHint: 'Calculate: R = √25 = ?',
        answer: 5,
        answerUnit: 'N',
      },
      tier2: {
        question: 'An object has 8 N acting east and 15 N acting north. Find the resultant.',
        shownEquation: 'R² = F1² + F2²  →  R = √(F1² + F2²)',
        shownStep1: 'Write what you know: F1 = 8 N, F2 = 15 N',
        hint: 'R² = 8² + 15² = 64 + 225 = 289',
        answer: 17,
        answerUnit: 'N',
      },
      tier3: {
        question: 'A 5 N force acts north and a 12 N force acts east. Find the resultant.',
        hint: 'Use R² = a² + b². Calculate 5² and 12² first.',
        methodHint: 'Start with R² = 25 + 144. Find the square root.',
        answer: 13,
        answerUnit: 'N',
      },
    },

    summary: {
      equation: 'R² = F1² + F2²  →  R = √(F1² + F2²)',
      sentence: 'Free body diagrams show all forces as arrows. The resultant is the net effect. When the resultant is zero, the object is in equilibrium.',
      promptText: 'Without looking: draw a free body diagram for a book on a table. Name each force. State what equilibrium means in terms of resultant force.',
    },

    sessionRecap: [
      'A free body diagram shows every force as an arrow from the object - arrow length shows magnitude, direction shows direction. Missing or wrong-direction arrows are the most common exam errors.',
      'Resultant force = zero means equilibrium: the object is either stationary or moving at constant velocity. Zero resultant does NOT mean zero forces.',
      'Contact forces (friction, normal, tension) require physical contact. Non-contact forces (gravity, magnetic, electrostatic) act at a distance.',
    ],
  },
  work_done: {
    id: 'work_done', module: 'Forces', moduleColor: FC, course: 'combined', boards: ['aqa','edexcel','ocr-a','ocr-b','wjec','ccea'],
    title: 'Work Done & Energy Transfer', subtitle: 'W = Fd and Energy Pathways',
    description: 'Work is done when a force causes an object to move in the direction of the force. W = Fd (work done = force × distance moved). Work is measured in joules. When work is done against friction, kinetic energy is transferred to thermal energy - the object and surroundings warm up.',
    lessonVisual: WorkDoneLesson, ideaVisual: WorkDoneIdea, realityVisual: WorkDoneReality,
    equations: [{ expr: 'W = Fd', given: true }, { expr: 'P = Fv', given: false }],
    equationData: {
      name: 'Work Done',
      triangle: {
        top:   { sym: 'W', name: 'Work Done', unit: 'J',  },
        left:  { sym: 'F', name: 'Force',     unit: 'N',  },
        right: { sym: 'd', name: 'Distance',  unit: 'm',  },
      },
      rearrangements: [
        { unknown: 'W', formula: 'W = F × d', unit: 'J', calc: ({ F, d }) => F * d },
        { unknown: 'F', formula: 'F = W ÷ d', unit: 'N', calc: ({ W, d }) => W / d },
        { unknown: 'd', formula: 'd = W ÷ F', unit: 'm', calc: ({ W, F }) => W / F },
      ],
      practice: [
        { label: 'A 200 N force moves a crate 5 m. How much work is done?', find: 'W', given: { F: { value: 200, unit: 'N' }, d: { value: 5, unit: 'm' } } },
        { label: '600 J of work is done over 12 m. What was the force?',    find: 'F', given: { W: { value: 600, unit: 'J' }, d: { value: 12, unit: 'm' } } },
      ],
    },
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

    // -- 9-STEP LESSON DATA ----------------------------------------------------

    hook: {
      hookFact: 'The world record for the heaviest weight lifted by a human is 2850 kg, lifted 40 cm. The work done = F × d = (2850 × 10) × 0.4 = 11,400 J - the same as climbing roughly 19 flights of stairs.',
      hookQuestion: 'If you hold a heavy bag completely still for 10 minutes, have you done any work on it in the physics sense? Why or why not?',
      hookEmoji: '💪',
    },

    lessonKeywords: [
      {
        word: 'Work Done',
        symbol: 'W',
        unit: 'joules (J)',
        definition: 'Energy transferred when a force moves an object in the direction of the force.',
        everydayNote: 'Lifting a 1 kg bag 1 m upward does about 10 J of work against gravity.',
      },
      {
        word: 'Force',
        symbol: 'F',
        unit: 'newtons (N)',
        definition: 'A push or pull acting on an object.',
        everydayNote: 'A 1 kg object has a weight (gravitational force) of about 10 N downward.',
      },
      {
        word: 'Distance',
        symbol: 'd',
        unit: 'metres (m)',
        definition: 'The length of path moved in the direction of the applied force.',
        everydayNote: 'Only the component of movement parallel to the force counts - pushing sideways while moving sideways: full credit.',
      },
      {
        word: 'Joule',
        symbol: 'J',
        unit: '',
        definition: '1 joule = 1 newton of force acting through 1 metre of displacement.',
        everydayNote: 'Lifting a small apple (about 100 g) by 1 metre requires roughly 1 J of work.',
      },
    ],

    prerequisiteCheck: {
      questions: [
        {
          question: 'A force of 20 N moves an object 3 m. Which calculation gives the work done?',
          answers: ['20 + 3 = 23 J', '20 × 3 = 60 J', '20 ÷ 3 = 6.7 J', '20² × 3 = 1200 J'],
          correct: 1,
          feedback: 'W = F × d = 20 × 3 = 60 J. Work is always force multiplied by distance, not added or divided.',
        },
        {
          question: 'You push a brick wall with 100 N for 30 seconds and it does not move. How much work have you done on the wall?',
          answers: ['3000 J', '100 J', '0 J', '30 J'],
          correct: 2,
          feedback: 'W = F × d = 100 × 0 = 0 J. No displacement means no work in the physics definition, regardless of effort or time.',
        },
      ],
    },

    topicMapHint: {
      before: ['Free Body Diagrams', 'Forces - basic push/pull'],
      current: 'Work Done & Energy Transfer',
      after: ['Kinetic & Gravitational PE', 'Power'],
    },

    workedExample: {
      title: 'Calculating work done moving a box',
      equation: 'W = F × d',
      context: 'A 200 N force moves a box 5 m along the floor. Calculate the work done.',
      steps: [
        { step: 1, action: 'Write what you know', content: 'F = 200 N, d = 5 m', annotation: 'Check the force is in the direction of movement - if it is at an angle, you only use the horizontal component.' },
        { step: 2, action: 'Write the equation', content: 'W = F × d', annotation: 'This equation is not on the formula sheet in all specs - know it by heart.' },
        { step: 3, action: 'Substitute', content: 'W = 200 × 5', annotation: 'Common error: mixing up units. F must be in newtons, d in metres, then W is automatically in joules.' },
        { step: 4, action: 'Calculate and state with unit', content: 'W = 1000 J', annotation: 'Sense check: 1000 J is 1 kJ - a reasonable amount for pushing a box across a room.' },
      ],
      misconceptionAfter: {
        claim: 'Holding a heavy bag for a long time is doing a lot of work.',
        reality: 'Physics work requires displacement in the direction of the force. Holding a bag still means d = 0, so W = F × 0 = 0 J. Your muscles tire, but no physics work is done on the bag.',
        visual: 'A security guard standing still holding a 10 kg parcel for 1 hour does zero joules of work on it. A delivery person who carries it 100 m does 1000 J.',
      },
    },

    guidedPractice: {
      tier1: {
        question: 'A force of 150 N pushes a crate 4 m. Calculate the work done.',
        allSteps: ['Write: F = 150 N, d = 4 m', 'Equation: W = F × d', 'Substitute: W = 150 × 4', '??? - calculate W'],
        missingStep: 3,
        missingHint: 'Calculate: W = 150 × 4 = ?',
        answer: 600,
        answerUnit: 'J',
      },
      tier2: {
        question: 'A 800 N force lifts a load through 0.5 m. Calculate the work done.',
        shownEquation: 'W = F × d',
        shownStep1: 'Write what you know: F = 800 N, d = 0.5 m',
        hint: 'Multiply force by distance. Be careful with 0.5 m - do not ignore the decimal.',
        answer: 400,
        answerUnit: 'J',
      },
      tier3: {
        question: '2400 J of work is done moving a box 6 m. What force was applied?',
        hint: 'Rearrange W = F × d to find F = W ÷ d.',
        methodHint: 'Start with W = F × d. Divide both sides by d to get F = W ÷ d = 2400 ÷ 6.',
        answer: 400,
        answerUnit: 'N',
      },
    },

    summary: {
      equation: 'W = F × d',
      sentence: 'Work done equals force multiplied by the distance moved in the direction of the force, measured in joules.',
      promptText: 'Without looking: state the equation for work done, name the units, and explain why pushing a stationary wall does zero work.',
    },

    sessionRecap: [
      'Work done = force × distance (W = Fd). Units: joules (J). 1 J = 1 N × 1 m.',
      'Work is only done when there is displacement in the direction of the force. No movement = no work, regardless of the size of the force.',
      'When friction acts, kinetic energy is transferred to thermal energy - the surfaces warm up. This is work done against friction.',
    ],
  },
  hookes_law: {
    id: 'hookes_law', module: 'Forces', moduleColor: FC, practicalId: 'spring', course: 'combined', boards: ['aqa','edexcel','ocr-a','ocr-b','wjec','ccea'],
    title: 'Forces & Elasticity (Hooke\'s Law)', subtitle: 'F = ke and Elastic Deformation',
    description: 'A spring obeys Hooke\'s Law: force is directly proportional to extension (F = ke) up to the elastic limit. The spring constant k (N/m) measures stiffness. Beyond the elastic limit, deformation is inelastic - the spring doesn\'t return to its original shape. Elastic PE stored: Ee = ½ke².',
    lessonVisual: HookesLawLesson, ideaVisual: HookesLawIdea, realityVisual: HookesLawReality,
    equations: [{ expr: 'F = ke', given: true }, { expr: 'Ee = ½ke²', given: true }],
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

    // ── 9-STEP LESSON DATA ────────────────────────────────────────────────────

    hook: {
      hookFact: 'Every time you sit on a car seat, walk on a carpeted floor, or press a key on a keyboard, Hooke\'s Law is at work — the material deforms in direct proportion to the force you apply.',
      hookQuestion: 'If you hang twice as much weight on a spring, what do you think happens to how much it stretches?',
      hookEmoji: '🌀',
    },

    lessonKeywords: [
      {
        word: 'Force',
        symbol: 'F',
        unit: 'newtons (N)',
        definition: 'A push or pull acting on an object.',
        everydayNote: 'The weight of a 100 g mass applies a force of about 1 N downward.',
      },
      {
        word: 'Extension',
        symbol: 'e',
        unit: 'metres (m)',
        definition: 'How much a spring (or elastic object) has been stretched beyond its natural length.',
        everydayNote: 'If a spring is 10 cm long normally and 16 cm when stretched, the extension is 6 cm = 0.06 m.',
      },
      {
        word: 'Spring Constant',
        symbol: 'k',
        unit: 'N/m',
        definition: 'A measure of how stiff a spring is — how much force is needed to extend it by 1 metre.',
        everydayNote: 'A stiff mattress spring has a high k. A soft toy spring has a low k.',
      },
      {
        word: 'Elastic Limit',
        symbol: '',
        unit: '',
        definition: 'The maximum extension beyond which a spring will no longer return to its original shape.',
        everydayNote: 'Stretch a hair elastic too far and it won\'t spring back — it\'s gone past its elastic limit.',
      },
      {
        word: 'Proportional',
        symbol: '',
        unit: '',
        definition: 'Two quantities are proportional if doubling one doubles the other. Force and extension are proportional below the elastic limit.',
        everydayNote: 'A graph of F against e is a straight line through the origin — that\'s what proportional looks like.',
      },
    ],

    prerequisiteCheck: {
      questions: [
        {
          question: 'A spring is stretched from 10 cm to 16 cm. What is the extension?',
          answers: ['16 cm', '10 cm', '6 cm', '26 cm'],
          correct: 2,
          feedback: 'Correct — extension = stretched length − natural length = 16 − 10 = 6 cm. Always measure from the natural (unstretched) length.',
        },
        {
          question: 'Force is measured in which unit?',
          answers: ['Joules (J)', 'Newtons (N)', 'Pascals (Pa)', 'Metres (m)'],
          correct: 1,
          feedback: 'Newtons (N) — named after Isaac Newton. 1 N is roughly the weight of a 100 g mass.',
        },
      ],
    },

    topicMapHint: {
      before: ['Vectors & Scalars', 'Free Body Diagrams'],
      current: "Forces & Elasticity (Hooke's Law)",
      after: ['Work Done', 'Moments', 'Pressure'],
    },

    workedExample: {
      title: "Using Hooke's Law: F = ke",
      equation: 'F = k × e',
      context: 'A spring with spring constant k = 30 N/m is stretched by 0.4 m. What force is being applied?',
      steps: [
        {
          step: 1,
          action: 'Write what you know',
          content: 'k = 30 N/m,   e = 0.4 m,   F = ?',
          annotation: 'List your values. Make sure extension is in metres — convert from cm if needed (divide by 100).',
        },
        {
          step: 2,
          action: 'Write the equation',
          content: "F = k × e  (Hooke's Law)",
          annotation: "Hooke's Law — this is given on the exam formula sheet. F = force, k = spring constant, e = extension.",
        },
        {
          step: 3,
          action: 'Substitute',
          content: 'F = 30 × 0.4',
          annotation: 'Replace k and e with the numbers from step 1.',
        },
        {
          step: 4,
          action: 'Calculate and state with unit',
          content: 'F = 12 N',
          annotation: 'The unit is newtons (N). A spring constant in N/m × extension in m = force in N. Units always balance.',
        },
      ],
      misconceptionAfter: {
        claim: "Hooke's Law applies to all materials no matter how far you stretch them.",
        reality: "Wrong — Hooke's Law only applies within the elastic region, up to the elastic limit. Beyond it, force and extension are no longer proportional — the graph curves and the material is permanently deformed.",
        visual: 'On a force-extension graph: straight line through origin = Hooke\'s Law obeyed. Where the line starts to curve = elastic limit exceeded.',
      },
    },

    guidedPractice: {
      tier1: {
        question: 'A spring has k = 25 N/m and is extended by 0.2 m. What force is applied?',
        allSteps: [
          'Write what you know: k = 25 N/m, e = 0.2 m',
          "Write the equation: F = k × e (Hooke's Law)",
          'Substitute: F = 25 × 0.2',
          '??? — what is 25 × 0.2?',
        ],
        missingStep: 3,
        missingHint: 'Calculate: 25 × 0.2 = ?',
        answer: 5,
        answerUnit: 'N',
      },
      tier2: {
        question: 'A force of 15 N extends a spring by 0.5 m. What is the spring constant?',
        shownEquation: 'F = ke  →  k = F ÷ e',
        shownStep1: 'Write what you know: F = 15 N, e = 0.5 m',
        hint: 'Divide: k = 15 ÷ 0.5 = ?',
        answer: 30,
        answerUnit: 'N/m',
      },
      tier3: {
        question: 'A spring with k = 40 N/m has a force of 6 N applied to it. What is the extension?',
        hint: 'Rearrange F = ke to make e the subject: e = F ÷ k',
        methodHint: 'Start with F = ke. You have F and k — rearrange to find e. Divide, not multiply.',
        answer: 0.15,
        answerUnit: 'm',
      },
    },

    summary: {
      equation: 'F = ke',
      sentence: "Force and extension are proportional — double the force, double the extension — but only up to the elastic limit.",
      promptText: "Explain Hooke's Law in one sentence, as if explaining it to a friend who's never stretched a spring.",
    },

    sessionRecap: [
      "Hooke's Law: F = ke — force is proportional to extension below the elastic limit.",
      'Spring constant k (N/m) measures stiffness — higher k means stiffer spring.',
      'Beyond the elastic limit, the spring is permanently deformed and the law no longer applies.',
    ],
  },
  moments: {
    id: 'moments', module: 'Forces', moduleColor: FC, course: 'physics-only', boards: ['aqa','edexcel','ocr-a','ocr-b','wjec','ccea'],
    title: 'Moments, Levers & Gears', subtitle: 'Moment = F × d from Pivot',
    description: 'A moment (turning effect) = force × perpendicular distance from pivot. For a balanced system: clockwise moments = anticlockwise moments. Levers multiply force (effort × effort arm = load × load arm). Gears transmit rotational force - a larger gear turns more slowly but with more force.',
    lessonVisual: MomentsLesson, ideaVisual: MomentsIdea, realityVisual: MomentsReality,
    equations: [{ expr: 'M = Fd', given: false }],
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

    // -- 9-STEP LESSON DATA ----------------------------------------------------

    hook: {
      hookFact: 'Your bicep muscle attaches only 5 cm from the elbow pivot, but your hand is about 35 cm away. This means your bicep must exert roughly 7 times the force you apply with your hand just to hold an object still.',
      hookQuestion: 'Why is it easier to open a door by pushing near the handle than near the hinge? What is happening physically?',
      hookEmoji: '🦾',
    },

    lessonKeywords: [
      {
        word: 'Moment',
        symbol: 'M',
        unit: 'newton-metres (N·m)',
        definition: 'The turning effect of a force about a pivot, equal to force multiplied by perpendicular distance from the pivot.',
        everydayNote: 'A 10 N force applied 0.5 m from a pivot creates a 5 N·m moment - same turning effect as 5 N at 1 m.',
      },
      {
        word: 'Pivot',
        symbol: '',
        unit: '',
        definition: 'The fixed point around which an object rotates.',
        everydayNote: 'The hinge of a door is the pivot. The nut on a bolt is the pivot when you use a spanner.',
      },
      {
        word: 'Perpendicular Distance',
        symbol: 'd',
        unit: 'm',
        definition: 'The shortest distance from the pivot to the line of action of the force, measured at 90°.',
        everydayNote: 'If you push a door at an angle, only the component at 90° to the door counts toward the turning effect.',
      },
      {
        word: 'Principle of Moments',
        symbol: '',
        unit: '',
        definition: 'For a balanced system, the sum of clockwise moments equals the sum of anticlockwise moments about any pivot.',
        everydayNote: 'A balanced seesaw with unequal weights: the heavier person sits closer to the middle.',
      },
      {
        word: 'Lever',
        symbol: '',
        unit: '',
        definition: 'A rigid bar that rotates around a pivot, allowing a small effort force to overcome a large load by increasing the distance.',
        everydayNote: 'A crowbar lets you lift heavy paving slabs with one hand by applying force far from the pivot.',
      },
    ],

    prerequisiteCheck: {
      questions: [
        {
          question: 'A force of 10 N acts 3 m from a pivot. What is the moment?',
          answers: ['3.3 N·m', '30 N·m', '10 N·m', '13 N·m'],
          correct: 1,
          feedback: 'M = F × d = 10 × 3 = 30 N·m. Units are newton-metres (N·m), not just newtons.',
        },
        {
          question: 'For a seesaw to be balanced, which condition must be true?',
          answers: ['Both sides must have the same weight', 'Both sides must be the same length', 'Clockwise moments = anticlockwise moments', 'The pivot must be at the exact centre'],
          correct: 2,
          feedback: 'The principle of moments: balanced means sum of clockwise moments = sum of anticlockwise moments. A heavier person can balance a lighter person by sitting closer to the pivot.',
        },
      ],
    },

    topicMapHint: {
      before: ['Forces - basic push/pull', 'Work Done'],
      current: 'Moments, Levers & Gears',
      after: ['Pressure', 'Fluid Pressure'],
    },

    workedExample: {
      title: 'Finding the balancing force on a seesaw',
      equation: 'M = F × d  →  Clockwise moment = Anticlockwise moment',
      context: 'A 400 N weight sits 3 m from a pivot. What weight must sit 2 m from the pivot on the other side to balance it?',
      steps: [
        { step: 1, action: 'Write what you know', content: 'F1 = 400 N, d1 = 3 m (clockwise). d2 = 2 m (anticlockwise). Find F2.', annotation: 'Always label which side is clockwise and which is anticlockwise before calculating.' },
        { step: 2, action: 'Write the equation', content: 'F1 × d1 = F2 × d2 (principle of moments)', annotation: 'This equation is not on the formula sheet - you must recall it.' },
        { step: 3, action: 'Substitute', content: '400 × 3 = F2 × 2  →  1200 = F2 × 2', annotation: 'Common error: dividing 400 by 3 instead of multiplying. Always multiply F × d.' },
        { step: 4, action: 'Calculate and state with unit', content: 'F2 = 1200 ÷ 2 = 600 N', annotation: 'Sense check: 600 N is larger than 400 N. The heavier object sits further from the pivot - that is correct.' },
      ],
      misconceptionAfter: {
        claim: 'A heavier weight always tips a seesaw down.',
        reality: 'The moment (turning effect) depends on BOTH force and distance. A lighter person sitting further from the pivot can balance a heavier person sitting closer. Weight alone does not determine the outcome.',
        visual: 'A 30 kg child at 3 m: moment = 300 × 3 = 900 N·m. A 45 kg child at 2 m: moment = 450 × 2 = 900 N·m. Balanced, even though the masses are different.',
      },
    },

    guidedPractice: {
      tier1: {
        question: 'A 50 N force acts 4 m from a pivot (clockwise). What force at 2 m on the other side balances it?',
        allSteps: ['Calculate clockwise moment: 50 × 4 = 200 N·m', 'Set anticlockwise moment equal: F2 × 2 = 200', 'Rearrange: F2 = 200 ÷ 2', '??? - calculate F2'],
        missingStep: 3,
        missingHint: 'Calculate: F2 = 200 ÷ 2 = ?',
        answer: 100,
        answerUnit: 'N',
      },
      tier2: {
        question: 'A 30 N force acts 6 m from a pivot. What force at 4 m on the other side balances it?',
        shownEquation: 'F1 × d1 = F2 × d2',
        shownStep1: 'Write what you know: F1 = 30 N, d1 = 6 m, d2 = 4 m',
        hint: 'Clockwise moment = 30 × 6 = 180 N·m. Then F2 × 4 = 180.',
        answer: 45,
        answerUnit: 'N',
      },
      tier3: {
        question: 'A clockwise moment of 240 N·m acts on a balanced lever. What force acts 3 m from the pivot on the anticlockwise side?',
        hint: 'Use principle of moments: anticlockwise moment = 240 N·m. Then M = F × d.',
        methodHint: 'Start with F × d = 240. Substitute d = 3. Rearrange to find F = 240 ÷ 3.',
        answer: 80,
        answerUnit: 'N',
      },
    },

    summary: {
      equation: 'M = F × d  |  Clockwise moments = Anticlockwise moments',
      sentence: 'A moment is the turning effect of a force. Bigger force or bigger distance from the pivot means a bigger moment.',
      promptText: 'Without looking: write the equation for a moment, give the units, and explain the principle of moments in one sentence.',
    },

    sessionRecap: [
      'Moment = force × perpendicular distance from pivot (M = Fd). Units: newton-metres (N·m). A larger distance multiplies the turning effect.',
      'Principle of moments: for equilibrium, sum of clockwise moments = sum of anticlockwise moments. You can have unequal forces balanced by unequal distances.',
      'Levers use the principle of moments to multiply force - a small effort far from the pivot can overcome a large load close to the pivot.',
    ],
  },
  fluid_pressure: {
    id: 'fluid_pressure', module: 'Forces', moduleColor: FC, course: 'physics-only', boards: ['aqa','edexcel','ocr-a','ocr-b','wjec','ccea'],
    title: 'Pressure & Upthrust', subtitle: 'P = F/A, p = ρgh and Upthrust',
    description: 'Pressure on a solid surface: P = F/A (force ÷ area, in Pascals). A larger contact area spreads the same force over more surface, reducing pressure — this is why snowshoes prevent sinking. Pressure in a fluid acts in all directions. Pressure increases with depth: p = ρgh (density × g × height). The atmosphere is a fluid — atmospheric pressure decreases with altitude as there is less air above. Upthrust occurs because pressure at the bottom of a submerged object is greater than at the top, creating a net upward force equal to the weight of fluid displaced (Archimedes\' principle).',
    lessonVisual: FluidPressureLesson, ideaVisual: FluidPressureIdea, realityVisual: FluidPressureReality,
    equations: [{ expr: 'P = F/A', given: false }, { expr: 'p = ρgh', given: true }],
    question: 'What is the pressure at a depth of 5 m in water? (ρ = 1000 kg/m³, g = 10 N/kg)',
    questionSubtitle: 'Use p = ρgh',
    options: ['5000 Pa', '50000 Pa', '500 Pa', '1000 Pa'],
    correctAnswer: 1,
    keywords: ['P = F/A', 'solid pressure', 'fluid pressure', 'P = ρgh', 'depth', 'density', 'gravitational field strength', 'pascals', 'water column', 'increases with depth', 'upthrust', 'Archimedes'],
    sentenceStarters: ['Using P = ρgh, I substitute the values...', 'P = 1000 × 10 × 5 = ...', 'Pressure increases with depth because...', 'ρ = 1000 kg/m³, g = 10 N/kg, h = 5 m...', 'P = ρ × g × h = ... × ... × ... = ...'],
    modelAnswers: [
      'Using P = ρgh, I substitute **ρ = 1000, g = 10, h = 5 to get P = 1000 × 10 × 5 = 50 000 Pa**.',
      'P = 1000 × 10 × 5 = **50 000 Pa**.',
      'Pressure increases with depth because **the weight of water above increases  -  more water pressing down means greater pressure**.',
      'ρ = 1000 kg/m³, g = 10 N/kg, h = 5 m, **so P = ρgh = 1000 × 10 × 5 = 50 000 Pa**.',
      'P = ρ × g × h = **1000 × 10 × 5 = 50 000 Pa**.',
    ],
    misconception: 'P = F/A applies to solid surfaces; p = ρgh applies to fluids at depth. Fluid pressure acts in all directions — not just downward. Upthrust is NOT the same as pressure; it is the net upward force due to the pressure difference between top and bottom of a submerged object.',
    concept: 'Solid pressure: P = F/A (Pa). Fluid pressure: p = ρgh = 1000×10×5 = 50 000 Pa. Larger area → less pressure (snowshoes, wide tyres). Upthrust = weight of fluid displaced. Atmospheric pressure decreases with altitude.',

    // -- 9-STEP LESSON DATA ----------------------------------------------------

    hook: {
      hookFact: 'At the Mariana Trench (11 km deep), water pressure reaches about 110 million Pascals - over 1000 times atmospheric pressure. Submarines designed to reach it need steel walls 12 cm thick just to survive.',
      hookQuestion: 'Why do your ears "pop" when you go up in a plane or drive up a mountain? What is changing physically?',
      hookEmoji: '🌊',
    },

    lessonKeywords: [
      {
        word: 'Pressure',
        symbol: 'P',
        unit: 'pascals (Pa)',
        definition: 'Force per unit area acting on a surface.',
        everydayNote: 'A stiletto heel exerts enormous pressure because the same force acts over a tiny area.',
      },
      {
        word: 'Pascal',
        symbol: 'Pa',
        unit: '',
        definition: '1 pascal = 1 newton of force per 1 square metre of area.',
        everydayNote: 'Atmospheric pressure at sea level is about 100,000 Pa - 100,000 N pressing on every square metre.',
      },
      {
        word: 'Density',
        symbol: 'ρ (rho)',
        unit: 'kg/m³',
        definition: 'Mass per unit volume of a substance.',
        everydayNote: 'Water has a density of 1000 kg/m³. Mercury is about 13,600 kg/m³ - 13.6 times denser than water.',
      },
      {
        word: 'Upthrust',
        symbol: '',
        unit: 'N',
        definition: 'The upward force on a submerged object caused by pressure being greater at the bottom than the top.',
        everydayNote: 'A ship floats because the upthrust from displaced water equals its weight. Remove the water and it falls.',
      },
      {
        word: 'Fluid Pressure',
        symbol: 'p',
        unit: 'Pa',
        definition: 'Pressure at a depth in a fluid: p = ρgh. It increases with depth and acts in all directions.',
        everydayNote: 'Deep-sea fish have bodies adapted to enormous pressure - bring them to the surface too fast and they die.',
      },
    ],

    prerequisiteCheck: {
      questions: [
        {
          question: 'A force of 400 N acts on an area of 2 m². What is the pressure?',
          answers: ['800 Pa', '200 Pa', '402 Pa', '0.005 Pa'],
          correct: 1,
          feedback: 'P = F ÷ A = 400 ÷ 2 = 200 Pa. Pressure = force divided by area, not multiplied.',
        },
        {
          question: 'As you go deeper underwater, what happens to the water pressure acting on you?',
          answers: ['It decreases', 'It stays the same', 'It increases', 'It only increases sideways'],
          correct: 2,
          feedback: 'p = ρgh - pressure increases with depth (h). More water above means more weight pressing down, increasing pressure in all directions.',
        },
      ],
    },

    topicMapHint: {
      before: ['Moments & Levers', 'Forces - basic push/pull'],
      current: 'Pressure & Upthrust',
      after: ['Floating & Sinking', 'Atmospheric Pressure'],
    },

    workedExample: {
      title: 'Calculating fluid pressure at depth in seawater',
      equation: 'p = ρ × g × h',
      context: 'Find the water pressure at 8 m depth in seawater (ρ = 1025 kg/m³, g = 10 N/kg).',
      steps: [
        { step: 1, action: 'Write what you know', content: 'ρ = 1025 kg/m³, g = 10 N/kg, h = 8 m', annotation: 'Note: this gives pressure due to the water only. Total pressure would add atmospheric pressure (100,000 Pa) on top.' },
        { step: 2, action: 'Write the equation', content: 'p = ρ × g × h', annotation: 'This equation IS on the formula sheet. Do not confuse lowercase p (fluid pressure) with uppercase P (solid pressure = F/A).' },
        { step: 3, action: 'Substitute', content: 'p = 1025 × 10 × 8', annotation: 'Common error: using g = 9.8 when the question uses g = 10. Always use the value given.' },
        { step: 4, action: 'Calculate and state with unit', content: 'p = 82,000 Pa', annotation: 'Sense check: 82 kPa is about 82% of atmospheric pressure - reasonable for 8 m depth.' },
      ],
      misconceptionAfter: {
        claim: 'Fluid pressure only acts downward, like weight.',
        reality: 'Fluid pressure acts equally in all directions at a given depth. This is why a submarine hull must be equally strong on all sides - the pressure pushing inward is the same from below as from the sides.',
        visual: 'Hold a sealed bag of water and squeeze it - water squirts in all directions equally, not just downward.',
      },
    },

    guidedPractice: {
      tier1: {
        question: 'Find the fluid pressure at 3 m depth in fresh water (ρ = 1000 kg/m³, g = 10 N/kg).',
        allSteps: ['Write: ρ = 1000 kg/m³, g = 10, h = 3 m', 'Equation: p = ρ × g × h', 'Substitute: p = 1000 × 10 × 3', '??? - calculate p'],
        missingStep: 3,
        missingHint: 'Calculate: p = 1000 × 10 × 3 = ?',
        answer: 30000,
        answerUnit: 'Pa',
      },
      tier2: {
        question: 'A force of 600 N acts on an area of 0.04 m². Calculate the pressure.',
        shownEquation: 'P = F ÷ A',
        shownStep1: 'Write what you know: F = 600 N, A = 0.04 m²',
        hint: 'Divide F by A. Check your decimal place - 0.04 is a small area, so pressure will be large.',
        answer: 15000,
        answerUnit: 'Pa',
      },
      tier3: {
        question: 'The fluid pressure at a certain depth is 40,000 Pa. The fluid density is 800 kg/m³ and g = 10 N/kg. Find the depth.',
        hint: 'Rearrange p = ρgh to find h = p ÷ (ρ × g).',
        methodHint: 'Start with p = ρgh. Divide both sides by ρ × g. h = 40,000 ÷ (800 × 10).',
        answer: 5,
        answerUnit: 'm',
      },
    },

    summary: {
      equation: 'P = F/A  |  p = ρgh',
      sentence: 'Pressure on a solid surface is force divided by area. Pressure in a fluid increases with depth: p = ρgh. Fluid pressure acts in all directions.',
      promptText: 'Without looking: write both pressure equations, state their units, and explain why upthrust occurs.',
    },

    sessionRecap: [
      'Solid surface pressure: P = F ÷ A (Pa). Larger area = less pressure for the same force. Snowshoes and wide tyres use this principle.',
      'Fluid pressure at depth: p = ρgh. Pressure increases with depth because more fluid is pushing down from above. Fluid pressure acts in all directions, not just downward.',
      'Upthrust = weight of fluid displaced (Archimedes). A floating object displaces its own weight of fluid. Atmospheric pressure decreases with altitude because there is less air above.',
    ],
  },
  motion_graphs: {
    id: 'motion_graphs', module: 'Forces', moduleColor: FC, course: 'combined', boards: ['aqa','edexcel','ocr-a','ocr-b','wjec','ccea'],
    title: 'Forces & Motion', subtitle: 'Distance-Time & Velocity-Time Graphs',
    description: 'Distance-time graphs: gradient = speed; flat line = stationary; curved line = accelerating. Velocity-time graphs: gradient = acceleration; flat line = constant velocity; area under graph = distance. Deceleration = negative gradient. Terminal velocity: when air resistance equals driving force.',
    lessonVisual: MotionGraphsLesson, ideaVisual: MotionGraphsIdea, realityVisual: MotionGraphsReality,
    equations: [{ expr: 'a = Δv/Δt', given: false }, { expr: 'gradient = acceleration', given: false }],
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

    // -- 9-STEP LESSON DATA ----------------------------------------------------

    hook: {
      hookFact: 'Average speed cameras calculate your speed using exactly the same method as reading the gradient of a distance-time graph: distance between two points divided by time taken. If two cameras are 2 miles apart and you took 1.2 minutes, your average speed = 2 ÷ 0.02 hours = 100 mph.',
      hookQuestion: 'On a velocity-time graph, what does a downward slope mean? And what does the area under the line actually represent?',
      hookEmoji: '📈',
    },

    lessonKeywords: [
      {
        word: 'Gradient',
        symbol: '',
        unit: 'depends on graph type',
        definition: 'The steepness of a line on a graph, calculated as rise divided by run (change in y divided by change in x).',
        everydayNote: 'A steeper slope on a distance-time graph means faster speed. A flat section means the object has stopped.',
      },
      {
        word: 'Acceleration',
        symbol: 'a',
        unit: 'm/s²',
        definition: 'The rate of change of velocity - how quickly speed or direction changes each second.',
        everydayNote: 'A car accelerating at 3 m/s² gains 3 m/s of speed every second: 0, 3, 6, 9 m/s...',
      },
      {
        word: 'Deceleration',
        symbol: '',
        unit: 'm/s²',
        definition: 'Negative acceleration - the object is slowing down. Shown as a downward (negative) gradient on a v-t graph.',
        everydayNote: 'A car braking from 20 m/s to 0 m/s in 4 s has deceleration = 20 ÷ 4 = 5 m/s².',
      },
      {
        word: 'Distance-Time Graph',
        symbol: '',
        unit: '',
        definition: 'A graph where gradient = speed. A flat horizontal line means stationary.',
        everydayNote: 'Gradient = change in distance ÷ change in time = speed. Steep = fast, flat = stopped.',
      },
      {
        word: 'Velocity-Time Graph',
        symbol: '',
        unit: '',
        definition: 'A graph where gradient = acceleration and area under the line = distance travelled.',
        everydayNote: 'A flat line at 15 m/s means constant velocity. Area of the rectangle = 15 × time = distance.',
      },
    ],

    prerequisiteCheck: {
      questions: [
        {
          question: 'On a distance-time graph, what does a horizontal (flat) line mean?',
          answers: ['The object is accelerating', 'The object is at constant speed', 'The object is stationary', 'The object is decelerating'],
          correct: 2,
          feedback: 'A flat line means distance is not changing with time - the object is not moving. Speed = gradient = 0.',
        },
        {
          question: 'A velocity-time graph shows a straight line from 0 m/s to 30 m/s over 6 seconds. What is the acceleration?',
          answers: ['180 m/s²', '5 m/s²', '36 m/s²', '0.2 m/s²'],
          correct: 1,
          feedback: 'Acceleration = gradient = change in velocity ÷ time = (30 - 0) ÷ 6 = 5 m/s². The gradient of a v-t graph gives acceleration.',
        },
      ],
    },

    topicMapHint: {
      before: ['Speed, Distance, Time', 'Vectors & Scalars'],
      current: 'Distance-Time & Velocity-Time Graphs',
      after: ['Equations of Motion (SUVAT)', 'Terminal Velocity'],
    },

    workedExample: {
      title: 'Acceleration and distance from a velocity-time graph',
      equation: 'a = gradient = Δv ÷ Δt  |  distance = area under graph',
      context: 'A v-t graph shows an object accelerating from 0 to 20 m/s in 5 seconds. Find the acceleration and distance travelled.',
      steps: [
        { step: 1, action: 'Write what you know', content: 'v increases from 0 to 20 m/s. Time = 5 s. Shape under graph is a triangle.', annotation: 'Identify the shape first: triangle (accelerating from rest), rectangle (constant velocity), or trapezium (mixed).' },
        { step: 2, action: 'Calculate acceleration', content: 'a = gradient = (20 - 0) ÷ (5 - 0) = 20 ÷ 5 = 4 m/s²', annotation: 'Gradient = rise ÷ run. Rise = change in velocity. Run = change in time.' },
        { step: 3, action: 'Calculate distance (area)', content: 'Area = ½ × base × height = ½ × 5 × 20 = 50 m', annotation: 'Common error: using full rectangle instead of triangle. If the line starts at 0 velocity, the shape is a triangle.' },
        { step: 4, action: 'State with units', content: 'Acceleration = 4 m/s². Distance = 50 m.', annotation: 'Sense check: 4 m/s² for 5 s gives 20 m/s final speed. Consistent with the graph.' },
      ],
      misconceptionAfter: {
        claim: 'A flat line on a velocity-time graph means the object is stationary.',
        reality: 'A flat (horizontal) line on a v-t graph means constant velocity - the object is moving but neither speeding up nor slowing down. Stationary means zero on the vertical axis AND flat.',
        visual: 'A car on a motorway at a steady 30 m/s: flat line at v = 30 m/s on the v-t graph. The car is moving - it is just not accelerating.',
      },
    },

    guidedPractice: {
      tier1: {
        question: 'A v-t graph shows velocity increasing from 0 to 30 m/s in 6 seconds. Find the acceleration.',
        allSteps: ['Write: initial v = 0 m/s, final v = 30 m/s, t = 6 s', 'Equation: a = gradient = Δv ÷ Δt', 'Substitute: a = (30 - 0) ÷ (6 - 0)', '??? - calculate a'],
        missingStep: 3,
        missingHint: 'Calculate: a = 30 ÷ 6 = ?',
        answer: 5,
        answerUnit: 'm/s²',
      },
      tier2: {
        question: 'A v-t graph shows a horizontal line at 8 m/s for 10 seconds. What distance is covered?',
        shownEquation: 'distance = area under graph = base × height',
        shownStep1: 'Write what you know: v = 8 m/s (constant), t = 10 s. Shape is a rectangle.',
        hint: 'Area of rectangle = base × height = time × velocity.',
        answer: 80,
        answerUnit: 'm',
      },
      tier3: {
        question: 'A v-t graph shows velocity increasing from 0 to 15 m/s in 6 seconds (triangle shape). Find the distance covered.',
        hint: 'Distance = area under graph = ½ × base × height for a triangle.',
        methodHint: 'Area = ½ × time × final velocity = ½ × 6 × 15.',
        answer: 45,
        answerUnit: 'm',
      },
    },

    summary: {
      equation: 'gradient of d-t graph = speed  |  gradient of v-t graph = acceleration  |  area under v-t graph = distance',
      sentence: 'Distance-time graphs give speed from gradient. Velocity-time graphs give acceleration from gradient and distance from area.',
      promptText: 'Without looking: state what the gradient and area represent for both types of motion graph. Describe what a flat line means on each.',
    },

    sessionRecap: [
      'Distance-time graph: gradient = speed. Flat line = stationary. Curved (increasing gradient) = accelerating. Gradient units: m ÷ s = m/s.',
      'Velocity-time graph: gradient = acceleration. Flat line = constant velocity (NOT stationary). Area under graph = distance. Negative gradient = deceleration.',
      'To find area: rectangle = base × height; triangle = ½ × base × height; trapezium = ½ × (sum of parallel sides) × height.',
    ],
  },
  equations_of_motion: {
    id: 'equations_of_motion', module: 'Forces', moduleColor: FC, course: 'combined', boards: ['aqa','edexcel','ocr-a','ocr-b','wjec','ccea'],
    title: 'Equations of Motion', subtitle: 'SUVAT — Uniform Acceleration',
    description: 'Four equations link the five variables s (displacement), u (initial velocity), v (final velocity), a (acceleration) and t (time) for uniform acceleration: v = u + at; v² = u² + 2as; s = ut + ½at²; s = ½(u+v)t. Choose the equation that contains the three known variables and the one unknown. These equations only work for constant acceleration. Starting from rest means u = 0.',
    lessonVisual: EquationsOfMotionLesson, ideaVisual: EquationsOfMotionIdea, realityVisual: EquationsOfMotionReality,
    equations: [{ expr: 'v = u + at', given: true }, { expr: 'v² = u² + 2as', given: true }, { expr: 's = ut + ½at²', given: true }, { expr: 's = ½(u+v)t', given: true }],
    question: 'A car starts from rest and accelerates at 3 m/s² for 4 seconds. Which equation gives its final velocity?',
    questionSubtitle: 'Identify the known values: u=0, a=3, t=4',
    options: ['v² = u² + 2as', 'v = u + at', 's = ut + ½at²', 's = ½(u+v)t'],
    correctAnswer: 1,
    keywords: ['SUVAT', 'uniform acceleration', 'displacement', 'initial velocity', 'final velocity', 'acceleration', 'time', 'v=u+at', 'v²=u²+2as', 'equations of motion'],
    sentenceStarters: ['The SUVAT variables are s, u, v, a and t where...', 'I choose v = u + at when I know u, a and t and need to find...', 'v² = u² + 2as is useful when time is not given because...', 'Starting from rest means u = 0, so the equation simplifies to...', 'Uniform acceleration means the acceleration is constant throughout...'],
    modelAnswers: [
      'The SUVAT variables are s (displacement), u (initial velocity), v (final velocity), a (acceleration) and t (time).',
      'I choose v = u + at when I know u, a and t and need to find **v  -  v = 0 + 3×4 = 12 m/s**.',
      'v² = u² + 2as is useful when time is not given because **it links v, u, a and s without needing t**.',
      'Starting from rest means u = 0, so the equation simplifies to **v = at or v² = 2as**.',
      'Uniform acceleration means **the acceleration value is constant — these equations do not work for changing acceleration**.',
    ],
    misconception: 'These equations only work for uniform (constant) acceleration — not for changing acceleration.',
    concept: 'SUVAT: choose the equation with 3 knowns and 1 unknown. v = u + at (no s); v² = u² + 2as (no t); s = ut + ½at² (no v); s = ½(u+v)t (no a). Starting from rest: u = 0.',

    // -- 9-STEP LESSON DATA ----------------------------------------------------

    hook: {
      hookFact: 'An F1 car accelerates from 0 to 100 mph (44.7 m/s) in about 2 seconds. Using v = u + at: 44.7 = 0 + a × 2, so a = 22.35 m/s² - over twice the acceleration of a free-falling object (g = 10 m/s²). The driver feels more than 2g pushing them into the seat.',
      hookQuestion: 'If you know a ball starts from rest, accelerates at 5 m/s² for 4 seconds, how could you find how far it travels without drawing a graph?',
      hookEmoji: '🏎️',
    },

    lessonKeywords: [
      {
        word: 'Displacement',
        symbol: 's',
        unit: 'm',
        definition: 'Distance moved in a specific direction - a vector quantity.',
        everydayNote: 'Running 400 m around a track gives 400 m distance but 0 m displacement (you end where you started).',
      },
      {
        word: 'Initial Velocity',
        symbol: 'u',
        unit: 'm/s',
        definition: 'The velocity of an object at the start of the time period being analysed.',
        everydayNote: 'Starting from rest means u = 0. Throwing a ball already moving means u is the speed at the moment it leaves your hand.',
      },
      {
        word: 'Final Velocity',
        symbol: 'v',
        unit: 'm/s',
        definition: 'The velocity of an object at the end of the time period being analysed.',
        everydayNote: 'v is what you want to find if the question asks "how fast is it going after X seconds?"',
      },
      {
        word: 'Uniform Acceleration',
        symbol: 'a',
        unit: 'm/s²',
        definition: 'Constant acceleration - the rate of change of velocity does not itself change during the motion.',
        everydayNote: 'A ball rolling down a smooth ramp has (approximately) uniform acceleration. A car with varying engine power does not.',
      },
      {
        word: 'SUVAT',
        symbol: '',
        unit: '',
        definition: 'The five variables linked by the equations of motion: s, u, v, a, t. Each equation uses four of the five.',
        everydayNote: 'Write down what you know, identify what is missing, pick the equation that has those four variables.',
      },
    ],

    prerequisiteCheck: {
      questions: [
        {
          question: 'A car starts from rest and accelerates at 4 m/s² for 3 seconds. Which equation directly gives the final velocity?',
          answers: ['v² = u² + 2as', 'v = u + at', 's = ut + ½at²', 's = ½(u+v)t'],
          correct: 1,
          feedback: 'v = u + at uses s (displacement), u (initial velocity), a (acceleration) and t (time) - no s needed. With u = 0: v = 0 + 4 × 3 = 12 m/s.',
        },
        {
          question: 'When does u = 0 in a SUVAT problem?',
          answers: ['When there is no acceleration', 'When the object starts from rest', 'When the object is moving at constant velocity', 'When the object is decelerating'],
          correct: 1,
          feedback: 'u = 0 when the object starts from rest - it has zero initial velocity. A decelerating or constant velocity object still has a non-zero u.',
        },
      ],
    },

    topicMapHint: {
      before: ['Motion Graphs (v-t)', 'Acceleration'],
      current: 'Equations of Motion (SUVAT)',
      after: ['Terminal Velocity', "Newton's Laws"],
    },

    workedExample: {
      title: 'Finding velocity and displacement using SUVAT',
      equation: 'v = u + at  |  s = ut + ½at²',
      context: 'A car starts from rest and accelerates uniformly at 3 m/s² for 8 seconds. Find its final velocity and distance travelled.',
      steps: [
        { step: 1, action: 'Write what you know', content: 'u = 0 m/s (from rest), a = 3 m/s², t = 8 s. Find v and s.', annotation: '"Starts from rest" always means u = 0. Write this out explicitly so you do not forget.' },
        { step: 2, action: 'Find final velocity', content: 'v = u + at = 0 + 3 × 8 = 24 m/s', annotation: 'v = u + at is the equation to use when s is not involved and t is given.' },
        { step: 3, action: 'Find displacement', content: 's = ut + ½at² = 0 + ½ × 3 × 8² = ½ × 3 × 64 = 96 m', annotation: 'Common error: forgetting to square the t. 8² = 64, not 16. Always write the squared step out.' },
        { step: 4, action: 'State with units', content: 'v = 24 m/s. s = 96 m.', annotation: 'Sense check: 24 m/s for 8 s covers on average 12 m/s × 8 s = 96 m. Consistent.' },
      ],
      misconceptionAfter: {
        claim: 'I can use SUVAT equations for any motion, including a car with changing speed.',
        reality: 'SUVAT equations ONLY work for uniform (constant) acceleration. If acceleration changes - for example, a car with increasing engine force - these equations give wrong answers. Variable acceleration requires calculus or numerical methods.',
        visual: 'A ball rolling down a straight ramp: uniform acceleration, SUVAT works. A ball on a rollercoaster: constantly changing acceleration, SUVAT fails.',
      },
    },

    guidedPractice: {
      tier1: {
        question: 'A car starts from rest and accelerates at 4 m/s² for 5 seconds. Find the final velocity.',
        allSteps: ['Write: u = 0 m/s (from rest), a = 4 m/s², t = 5 s', 'Equation: v = u + at', 'Substitute: v = 0 + 4 × 5', '??? - calculate v'],
        missingStep: 3,
        missingHint: 'Calculate: v = 0 + 4 × 5 = ?',
        answer: 20,
        answerUnit: 'm/s',
      },
      tier2: {
        question: 'A train accelerates from 10 m/s to 30 m/s in 4 seconds. Find the acceleration.',
        shownEquation: 'v = u + at  →  a = (v - u) ÷ t',
        shownStep1: 'Write what you know: u = 10 m/s, v = 30 m/s, t = 4 s',
        hint: 'Rearrange v = u + at: a = (v - u) ÷ t = (30 - 10) ÷ 4.',
        answer: 5,
        answerUnit: 'm/s²',
      },
      tier3: {
        question: 'A ball starts from rest and accelerates at 2 m/s² over a distance of 25 m. Find the final velocity.',
        hint: 'Use v² = u² + 2as. There is no t given, so this is the correct equation.',
        methodHint: 'Start with v² = u² + 2as = 0 + 2 × 2 × 25 = 100. Then v = √100.',
        answer: 10,
        answerUnit: 'm/s',
      },
    },

    summary: {
      equation: 'v = u + at  |  v² = u² + 2as  |  s = ut + ½at²  |  s = ½(u+v)t',
      sentence: 'SUVAT equations link five variables for uniform acceleration. Write down what you know, identify the missing one, then pick the equation containing only those variables.',
      promptText: 'Without looking: write all four SUVAT equations and state which variable is absent from each. Then state when u = 0.',
    },

    sessionRecap: [
      'SUVAT variables: s (displacement), u (initial velocity), v (final velocity), a (acceleration), t (time). Each equation uses four of these five. Choose the equation that matches what you know and what you need.',
      'Starting from rest: u = 0. Uniform acceleration only - these equations fail if acceleration changes during the motion.',
      'v² = u² + 2as is the equation to use when time is not given and not needed. s = ut + ½at² is used when final velocity is not given.',
    ],
  },
  terminal_velocity: {
    id: 'terminal_velocity', module: 'Forces', moduleColor: FC, course: 'combined', boards: ['aqa','edexcel','ocr-a','ocr-b','wjec','ccea'],
    title: 'Terminal Velocity', subtitle: 'When Drag Equals Weight',
    description: 'A falling object accelerates because weight acts downward. As speed increases, drag (air resistance) increases. When drag equals weight, resultant force is zero and the object reaches terminal velocity — falling at constant speed. On a velocity-time graph, terminal velocity is a horizontal line. A parachute increases drag suddenly, causing deceleration to a new, lower terminal velocity.',
    lessonVisual: TerminalVelocityLesson, ideaVisual: TerminalVelocityIdea, realityVisual: TerminalVelocityReality,
    question: 'A skydiver is falling at terminal velocity. What can be said about the forces acting on them?',
    questionSubtitle: 'Think about resultant force at constant velocity',
    options: ['Weight is greater than drag', 'Drag is greater than weight', 'Weight equals drag — resultant force is zero', 'There are no forces acting on the skydiver'],
    correctAnswer: 2,
    keywords: ['terminal velocity', 'drag', 'air resistance', 'weight', 'resultant force', 'constant velocity', 'deceleration', 'parachute', 'velocity-time graph', 'streamlining'],
    sentenceStarters: ['At terminal velocity, the resultant force is zero because...', 'As the object speeds up, drag increases because...', 'The velocity-time graph shows a curve that flattens because...', 'When a parachute opens, the drag force suddenly...', 'Terminal velocity is reached when...'],
    modelAnswers: [
      'At terminal velocity, the resultant force is zero because **drag force equals weight — these two forces are balanced**.',
      'As the object speeds up, drag increases because **drag force increases with speed, so faster motion means more air resistance**.',
      'The velocity-time graph shows a curve that flattens because **as drag approaches weight, acceleration decreases, so the rate of speed increase slows until it reaches zero at terminal velocity**.',
      'When a parachute opens, the drag force suddenly **becomes much larger than weight, creating an upward resultant force that decelerates the skydiver to a new, lower terminal velocity**.',
      'Terminal velocity is reached when **drag exactly equals weight, giving zero resultant force, so by Newton\'s First Law the velocity stays constant**.',
    ],
    misconception: 'At terminal velocity, there are still forces acting — weight and drag both act but they are equal and opposite, giving zero resultant force.',
    concept: 'Terminal velocity: drag = weight → zero resultant force → constant speed. V-T graph curves then flattens. Parachute opens → deceleration → new lower terminal velocity.',

    // -- 9-STEP LESSON DATA ----------------------------------------------------

    hook: {
      hookFact: 'A skydiver in a headfirst dive reaches terminal velocity of about 90 m/s (200 mph). Switching to a belly-to-earth position gives terminal velocity of about 55 m/s - the larger frontal area creates more drag at a lower speed.',
      hookQuestion: 'If a skydiver is falling at terminal velocity and then opens a parachute, what happens to the resultant force and what does the velocity-time graph look like?',
      hookEmoji: '🪂',
    },

    lessonKeywords: [
      {
        word: 'Drag',
        symbol: '',
        unit: 'N',
        definition: 'A resistive force opposing motion through a fluid (air or water). Drag increases with speed.',
        everydayNote: 'Cup your hand out of a car window at 30 mph then 60 mph - the force nearly quadruples because drag increases with speed squared.',
      },
      {
        word: 'Weight',
        symbol: 'W',
        unit: 'N',
        definition: 'The gravitational force on an object, equal to mass × gravitational field strength (W = mg).',
        everydayNote: 'A 70 kg person has weight = 70 × 10 = 700 N downward at all times during a skydive.',
      },
      {
        word: 'Terminal Velocity',
        symbol: '',
        unit: 'm/s',
        definition: 'The constant speed reached when drag equals weight, giving zero resultant force and zero acceleration.',
        everydayNote: 'Different objects have different terminal velocities: a raindrop reaches about 9 m/s; a skydiver about 55 m/s.',
      },
      {
        word: 'Resultant Force',
        symbol: 'F_net',
        unit: 'N',
        definition: 'The net force after combining all forces acting on an object. Zero resultant means zero acceleration.',
        everydayNote: 'At terminal velocity, weight (down) = drag (up), so resultant = 0. The skydiver does not accelerate.',
      },
    ],

    prerequisiteCheck: {
      questions: [
        {
          question: 'A 70 kg skydiver falls. What is their weight (use g = 10 N/kg)?',
          answers: ['7 N', '70 N', '700 N', '7000 N'],
          correct: 2,
          feedback: 'W = mg = 70 × 10 = 700 N. Weight is a force in newtons, not a mass in kg.',
        },
        {
          question: 'At terminal velocity, what is the resultant force on the falling object?',
          answers: ['Equal to the weight', 'Equal to the drag', '0 N', 'Greater than the weight'],
          correct: 2,
          feedback: 'At terminal velocity, drag = weight, so resultant force = weight - drag = 0 N. Zero resultant means zero acceleration - the speed stays constant.',
        },
      ],
    },

    topicMapHint: {
      before: ['Motion Graphs', "Newton's Laws (F = ma)"],
      current: 'Terminal Velocity',
      after: ['Stopping Distance', 'Forces in Space (Orbit)'],
    },

    workedExample: {
      title: 'Analysing a skydiver reaching terminal velocity',
      equation: 'At terminal velocity: drag = weight  →  resultant = 0  →  a = 0',
      context: 'A 70 kg skydiver is in free fall. Describe the forces at terminal velocity and the shape of the v-t graph.',
      steps: [
        { step: 1, action: 'Write what you know', content: 'Mass = 70 kg, g = 10 N/kg. Weight = mg = 70 × 10 = 700 N downward.', annotation: 'Weight acts downward throughout the fall. It does not change with speed.' },
        { step: 2, action: 'State the condition for terminal velocity', content: 'Terminal velocity when drag = weight = 700 N upward. Resultant = 700 - 700 = 0 N.', annotation: 'Drag increases with speed. As the skydiver speeds up, drag grows until it reaches 700 N.' },
        { step: 3, action: 'Apply Newton\'s Second Law', content: 'F = ma → 0 = 70 × a → a = 0. Acceleration is zero.', annotation: 'Zero resultant force means zero acceleration. The speed stops increasing.' },
        { step: 4, action: 'Describe the v-t graph', content: 'v-t graph: curves upward (acceleration decreasing as drag grows), then flattens to a horizontal line at terminal velocity.', annotation: 'The curve flattens, not suddenly stops. The approach to terminal velocity is gradual.' },
      ],
      misconceptionAfter: {
        claim: 'At terminal velocity the skydiver feels weightless because gravity has turned off.',
        reality: 'Gravity is still 90% of surface strength at skydiving altitude. The skydiver feels weight pressing them into the harness. They feel no NET force - not zero weight. Weightlessness (as in orbit) is entirely different.',
        visual: 'Standing in a lift at constant speed: you feel normal - no net force. But gravity has not switched off. Same idea for terminal velocity.',
      },
    },

    guidedPractice: {
      tier1: {
        question: 'An 80 kg skydiver reaches terminal velocity. What is the drag force at this point (g = 10 N/kg)?',
        allSteps: ['Calculate weight: W = mg = 80 × 10 = 800 N', 'At terminal velocity: drag = weight', 'Drag = 800 N', '??? - state the direction of drag'],
        missingStep: 3,
        missingHint: 'Drag acts upward, opposite to the direction of fall.',
        answer: 800,
        answerUnit: 'N',
      },
      tier2: {
        question: 'A skydiver (weight 600 N) is falling and drag = 400 N. What is the resultant force and what does this tell you about their motion?',
        shownEquation: 'Resultant = weight - drag (both in newtons)',
        shownStep1: 'Write what you know: weight = 600 N down, drag = 400 N up',
        hint: 'Resultant = 600 - 400 = 200 N downward. This is not yet terminal velocity.',
        answer: 200,
        answerUnit: 'N (downward)',
      },
      tier3: {
        question: 'A 5 kg object falls until it reaches terminal velocity. What is the drag force at terminal velocity (g = 10 N/kg)?',
        hint: 'At terminal velocity, drag = weight. Calculate weight first using W = mg.',
        methodHint: 'W = 5 × 10 = 50 N. At terminal velocity, drag = 50 N upward.',
        answer: 50,
        answerUnit: 'N',
      },
    },

    summary: {
      equation: 'At terminal velocity: drag = weight  →  resultant = 0  →  a = 0  →  constant speed',
      sentence: 'As a falling object speeds up, drag increases. When drag equals weight, the resultant is zero and speed stays constant - this is terminal velocity.',
      promptText: 'Without looking: describe the three phases of a skydiver\'s fall (accelerating, approaching terminal velocity, at terminal velocity) and draw the shape of the v-t graph.',
    },

    sessionRecap: [
      'Falling object: weight acts down, drag acts up. As speed increases, drag increases. When drag = weight, resultant = 0, acceleration = 0, speed = constant = terminal velocity.',
      'V-T graph shape: curves upward with decreasing gradient (acceleration reducing as drag grows), then flattens to horizontal at terminal velocity.',
      'Parachute opens: drag suddenly increases far above weight - large upward resultant force - deceleration. Speed drops to a new, much lower terminal velocity where drag again equals weight.',
    ],
  },
  newtons_laws: {
    id: 'newtons_laws', module: 'Forces', moduleColor: FC, practicalId: 'acceleration', course: 'combined', boards: ['aqa','edexcel','ocr-a','ocr-b','wjec','ccea'],
    title: "Newton's Laws of Motion", subtitle: 'Inertia, F = ma, Inertial Mass & Action-Reaction',
    description: "Newton's 1st: an object remains at rest or at constant velocity unless acted on by a resultant force (inertia). 2nd: F = ma — resultant force = mass × acceleration. Inertial mass measures resistance to acceleration (m = F/a); gravitational mass determines weight (W = mg). Both are equal, so all objects fall at the same rate in a vacuum. 3rd: whenever object A exerts a force on object B, object B exerts an equal and opposite force on object A. N3L pairs ALWAYS: act on different objects; are the same type of force; are equal in magnitude and opposite in direction. Key distinction — N3L pairs are NOT the same as balanced forces on one object (N1L equilibrium). Example: a book on a table — weight of book on table (gravitational) and normal reaction of table on book (contact) are NOT a N3L pair because they are different force types. The true N3L pair of the book's weight is Earth's gravitational pull on the book paired with the book's gravitational pull on the Earth.",
    lessonVisual: NewtonsLawsLesson, ideaVisual: NewtonsLawsIdea, realityVisual: NewtonsLawsReality,
    equations: [{ expr: 'F = ma', given: true }, { expr: 'W = mg', given: false }],
    equationData: {
      name: "Newton's Second Law",
      triangle: {
        top:   { sym: 'F', name: 'Force',        unit: 'N',    },
        left:  { sym: 'm', name: 'Mass',          unit: 'kg',   },
        right: { sym: 'a', name: 'Acceleration',  unit: 'm/s²', },
      },
      rearrangements: [
        { unknown: 'F', formula: 'F = m × a', unit: 'N',    calc: ({ m, a }) => m * a },
        { unknown: 'm', formula: 'm = F ÷ a', unit: 'kg',   calc: ({ F, a }) => F / a },
        { unknown: 'a', formula: 'a = F ÷ m', unit: 'm/s²', calc: ({ F, m }) => F / m },
      ],
      practice: [
        { label: 'A 5 kg trolley accelerates at 3 m/s². What is the resultant force?', find: 'F', given: { m: { value: 5, unit: 'kg' }, a: { value: 3, unit: 'm/s²' } } },
        { label: 'A 24 N force causes an acceleration of 4 m/s². What is the mass?',   find: 'm', given: { F: { value: 24, unit: 'N'  }, a: { value: 4, unit: 'm/s²' } } },
      ],
    },
    question: 'A 1200 kg car accelerates at 3 m/s². What is the resultant force?',
    questionSubtitle: 'Use F = ma',
    options: ['400 N', '3600 N', '1203 N', '0.0025 N'],
    correctAnswer: 1,
    keywords: ["Newton's Second Law", 'F = ma', 'resultant force', 'inertial mass', 'gravitational mass', 'mass', 'acceleration', 'newtons', 'net force', 'proportional', 'inertia'],
    sentenceStarters: ["Using Newton's Second Law: F = m × a...", 'F = 1200 × 3 = ...', 'Inertial mass is defined as the ratio of force to acceleration: m = F/a...', 'Greater mass requires a greater force for the same acceleration...', 'Inertial and gravitational mass are equal, which is why...'],
    modelAnswers: [
      "Using Newton's Second Law: F = m × a, **F = 1200 × 3 = 3600 N**.",
      'F = 1200 × 3 = **3600 N**.',
      'Inertial mass is defined as the ratio of force to acceleration: m = F/a — **it measures resistance to acceleration, not the pull of gravity**.',
      'Greater mass requires a greater force for the same acceleration ** -  doubling mass doubles the force needed (F = ma)**.',
      'Inertial and gravitational mass are equal, which is why **all objects fall at the same rate in a vacuum regardless of their mass**.',
    ],
    misconception: "N3L pairs act on DIFFERENT objects — they can never cancel each other out. Balanced forces (N1L) act on the SAME object. The weight of a book and the table's normal reaction are NOT a N3L pair — they are different force types. A N3L pair must be the same type of force acting between the same two objects. Also: inertial mass ≠ gravitational mass conceptually, but they are numerically equal.",
    concept: "F = 1200 × 3 = 3600 N. N3L pair checklist: same force type ✓ same magnitude ✓ opposite direction ✓ act on different objects ✓. Inertial mass (m = F/a) = gravitational mass — all objects fall at g in a vacuum. N1L (same object, balanced) ≠ N3L (different objects, paired).",

    // -- 9-STEP LESSON DATA ----------------------------------------------------

    hook: {
      hookFact: 'The International Space Station weighs 420,000 kg on Earth. In orbit, astronauts appear weightless - not because gravity has switched off (at ISS altitude, gravity is still about 90% of surface gravity), but because they are in continuous free-fall alongside the station.',
      hookQuestion: 'If you push a wall and it pushes back with equal force, why can you still move things by pushing them? What is the key difference?',
      hookEmoji: '🛸',
    },

    lessonKeywords: [
      {
        word: "Newton's First Law",
        symbol: 'N1L',
        unit: '',
        definition: 'An object stays at rest or at constant velocity unless a resultant force acts on it (inertia).',
        everydayNote: 'A curling stone slides across ice at near-constant velocity because friction is very small - tiny resultant force.',
      },
      {
        word: "Newton's Second Law",
        symbol: 'N2L',
        unit: '',
        definition: 'The resultant force on an object equals its mass times its acceleration: F = ma.',
        everydayNote: 'The same engine force accelerates a small car more than a large lorry - less mass means more acceleration.',
      },
      {
        word: "Newton's Third Law",
        symbol: 'N3L',
        unit: '',
        definition: 'When object A exerts a force on object B, object B exerts an equal and opposite force on object A.',
        everydayNote: 'A rocket exhaust pushes gas backward; the gas pushes the rocket forward with equal force.',
      },
      {
        word: 'Inertial Mass',
        symbol: 'm',
        unit: 'kg',
        definition: 'A measure of how much an object resists acceleration: m = F ÷ a.',
        everydayNote: 'A shopping trolley loaded with 50 kg of goods is harder to start moving and harder to stop - it has more inertia.',
      },
      {
        word: 'N3L Pair',
        symbol: '',
        unit: '',
        definition: 'A pair of forces that are equal in magnitude, opposite in direction, the same type, and act on two different objects.',
        everydayNote: 'Earth pulls you down (gravity). You pull Earth up with the same force. These are on different objects - a true N3L pair.',
      },
    ],

    prerequisiteCheck: {
      questions: [
        {
          question: 'A 900 kg car accelerates at 2 m/s². What is the resultant force?',
          answers: ['450 N', '902 N', '1800 N', '4500 N'],
          correct: 2,
          feedback: 'F = ma = 900 × 2 = 1800 N. Always multiply mass and acceleration - do not add or divide.',
        },
        {
          question: 'A N3L force pair MUST act on...',
          answers: ['The same object, in the same direction', 'The same object, in opposite directions', 'Two different objects, same type of force', 'Two different objects, different types of force'],
          correct: 2,
          feedback: 'N3L pairs always act on two different objects, are the same type of force, and are equal in magnitude but opposite in direction.',
        },
      ],
    },

    topicMapHint: {
      before: ['Forces - basic push/pull', 'Terminal Velocity', 'Equations of Motion'],
      current: "Newton's Laws of Motion",
      after: ['Stopping Distance', 'Momentum'],
    },

    workedExample: {
      title: "Applying Newton's Second Law: F = ma",
      equation: 'F = m × a  →  a = F ÷ m  →  m = F ÷ a',
      context: 'A 900 kg car has a resultant force of 2250 N. Calculate its acceleration.',
      steps: [
        { step: 1, action: 'Write what you know', content: 'm = 900 kg, F = 2250 N (resultant). Find a.', annotation: 'Make sure F is the RESULTANT force - not just the engine force. Subtract friction if both are given.' },
        { step: 2, action: 'Write the equation', content: 'F = m × a  →  rearranged: a = F ÷ m', annotation: 'F = ma is on the formula sheet. Rearrange by dividing both sides by m.' },
        { step: 3, action: 'Substitute', content: 'a = 2250 ÷ 900', annotation: 'Common error: putting mass on top. a = F ÷ m, not m ÷ F.' },
        { step: 4, action: 'Calculate and state with unit', content: 'a = 2.5 m/s²', annotation: 'Sense check: 2.5 m/s² is reasonable for a car. 10 m/s² would be very high (close to freefall).' },
      ],
      misconceptionAfter: {
        claim: "Newton's Third Law means forces always cancel - so nothing can ever accelerate.",
        reality: 'N3L pairs act on DIFFERENT objects - they cannot cancel because cancellation requires forces on the same object. When you push a box, the box pushes you back equally, but the net force on the BOX is the push you applied - it does accelerate.',
        visual: 'You push a box: 50 N from you on the box (box accelerates). Box pushes 50 N on you (you feel it). Two objects, two forces - they do NOT cancel.',
      },
    },

    guidedPractice: {
      tier1: {
        question: 'A 1500 kg car accelerates at 2 m/s². Find the resultant force.',
        allSteps: ['Write: m = 1500 kg, a = 2 m/s²', 'Equation: F = m × a', 'Substitute: F = 1500 × 2', '??? - calculate F'],
        missingStep: 3,
        missingHint: 'Calculate: F = 1500 × 2 = ?',
        answer: 3000,
        answerUnit: 'N',
      },
      tier2: {
        question: 'A resultant force of 4500 N acts on a 750 kg object. Find the acceleration.',
        shownEquation: 'F = ma  →  a = F ÷ m',
        shownStep1: 'Write what you know: F = 4500 N, m = 750 kg',
        hint: 'Rearrange F = ma to get a = F ÷ m = 4500 ÷ 750.',
        answer: 6,
        answerUnit: 'm/s²',
      },
      tier3: {
        question: 'A resultant force of 360 N produces an acceleration of 1.5 m/s². Find the mass of the object.',
        hint: 'Rearrange F = ma to find m = F ÷ a.',
        methodHint: 'Start with F = ma. Divide both sides by a: m = 360 ÷ 1.5.',
        answer: 240,
        answerUnit: 'kg',
      },
    },

    summary: {
      equation: 'F = ma  |  N1L: constant velocity unless resultant ≠ 0  |  N3L: equal, opposite, different objects',
      sentence: "Newton's Second Law: resultant force = mass × acceleration. The bigger the mass, the more force needed for the same acceleration.",
      promptText: "Without looking: state all three of Newton's Laws in plain English. Then write the N3L pair checklist (4 conditions).",
    },

    sessionRecap: [
      "N1L: an object stays at rest or constant velocity unless a resultant force acts. Inertia is resistance to change in motion - bigger mass means more inertia.",
      "N2L: F = ma. Resultant force (not just one force) equals mass × acceleration. Double the mass, halve the acceleration for the same force. Inertial mass = F ÷ a = gravitational mass.",
      "N3L pairs: equal magnitude, opposite direction, same force type, on two different objects. They CANNOT cancel because they act on different objects.",
    ],
  },
  stopping_distance: {
    id: 'stopping_distance', module: 'Forces', moduleColor: FC, course: 'combined', boards: ['aqa','edexcel','ocr-a','ocr-b','wjec','ccea'],
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

    // -- 9-STEP LESSON DATA ----------------------------------------------------

    hook: {
      hookFact: 'At 30 mph (13 m/s), total stopping distance is about 23 m. At 70 mph (31 m/s), braking distance alone is about 75 m - longer than a standard football pitch from goal to goal (68 m). That is why motorway crashes are so deadly.',
      hookQuestion: 'If a car\'s speed doubles from 30 mph to 60 mph, does the braking distance double, triple, or quadruple? Why?',
      hookEmoji: '🚗',
    },

    lessonKeywords: [
      {
        word: 'Stopping Distance',
        symbol: '',
        unit: 'm',
        definition: 'Total distance travelled from when the driver sees a hazard to when the car stops: thinking distance plus braking distance.',
        everydayNote: 'At 30 mph: about 23 m. At 70 mph: about 96 m. Speed has a huge effect because braking distance grows with speed squared.',
      },
      {
        word: 'Thinking Distance',
        symbol: '',
        unit: 'm',
        definition: 'Distance the car travels during the driver\'s reaction time before brakes are applied.',
        everydayNote: 'Thinking distance = speed × reaction time. At 20 m/s with a 0.7 s reaction time: 20 × 0.7 = 14 m.',
      },
      {
        word: 'Braking Distance',
        symbol: '',
        unit: 'm',
        definition: 'Distance the car travels from when the brakes are applied to when the car stops.',
        everydayNote: 'Braking distance depends on speed squared - double the speed, quadruple the braking distance.',
      },
      {
        word: 'Reaction Time',
        symbol: 't_r',
        unit: 's',
        definition: 'The time between seeing a hazard and pressing the brakes. Typical: 0.2 s to 0.9 s.',
        everydayNote: 'Tiredness, alcohol, distractions and drugs all increase reaction time, directly increasing thinking distance.',
      },
      {
        word: 'Kinetic Energy',
        symbol: 'KE',
        unit: 'J',
        definition: 'Energy stored in a moving object: KE = ½mv². Braking removes this energy as heat.',
        everydayNote: 'A 1000 kg car at 20 m/s has KE = 200,000 J. At 40 m/s it has 800,000 J - four times more.',
      },
    ],

    prerequisiteCheck: {
      questions: [
        {
          question: 'A driver has a reaction time of 0.5 s and is driving at 30 m/s. What is the thinking distance?',
          answers: ['60 m', '15 m', '30 m', '0.5 m'],
          correct: 1,
          feedback: 'Thinking distance = speed × reaction time = 30 × 0.5 = 15 m.',
        },
        {
          question: 'A car\'s speed doubles. What happens to its kinetic energy (and therefore its braking distance)?',
          answers: ['Doubles', 'Triples', 'Quadruples', 'Stays the same'],
          correct: 2,
          feedback: 'KE = ½mv². If speed doubles (v → 2v), then KE goes to ½m(2v)² = ½m × 4v² = 4 × KE. Four times the energy means four times the braking distance.',
        },
      ],
    },

    topicMapHint: {
      before: ["Newton's Laws (F = ma)", 'Kinetic Energy'],
      current: 'Stopping Distance',
      after: ['Momentum & Impulse', 'Road Safety (Applied)'],
    },

    workedExample: {
      title: 'Why doubling speed quadruples braking distance',
      equation: 'KE = ½mv²  |  thinking distance = speed × reaction time',
      context: 'A 1000 kg car at 20 m/s: find KE. Then at 40 m/s: find KE. Compare braking distances.',
      steps: [
        { step: 1, action: 'Calculate KE at 20 m/s', content: 'KE = ½ × 1000 × 20² = ½ × 1000 × 400 = 200,000 J', annotation: 'Square the speed first: 20² = 400. Then multiply by ½ × mass.' },
        { step: 2, action: 'Calculate KE at 40 m/s', content: 'KE = ½ × 1000 × 40² = ½ × 1000 × 1600 = 800,000 J', annotation: '40² = 1600. Four times 400. So KE is four times larger.' },
        { step: 3, action: 'Compare braking distances', content: 'Same braking force must remove 4× the energy → 4× the distance. If braking distance at 20 m/s = d, at 40 m/s it is 4d.', annotation: 'Work done by brakes = braking force × distance. Same force, 4× energy → 4× distance.' },
        { step: 4, action: 'State the conclusion', content: 'Doubling speed quadruples braking distance. Thinking distance only doubles (linear with speed).', annotation: 'This is the key exam point: braking distance ∝ v², thinking distance ∝ v.' },
      ],
      misconceptionAfter: {
        claim: 'Doubling speed doubles the braking distance.',
        reality: 'Braking distance depends on kinetic energy (KE = ½mv²). Speed appears squared - so doubling speed multiplies KE by 4, and the same braking force needs 4× the distance to remove that energy. Only thinking distance doubles (linear relationship).',
        visual: 'At 20 m/s: braking distance ~14 m. At 40 m/s: ~56 m (4× not 2×). This is why speed limits save lives even in small reductions.',
      },
    },

    guidedPractice: {
      tier1: {
        question: 'A driver has a reaction time of 0.7 s and a speed of 20 m/s. Find the thinking distance.',
        allSteps: ['Write: reaction time = 0.7 s, speed = 20 m/s', 'Equation: thinking distance = speed × reaction time', 'Substitute: thinking distance = 20 × 0.7', '??? - calculate thinking distance'],
        missingStep: 3,
        missingHint: 'Calculate: 20 × 0.7 = ?',
        answer: 14,
        answerUnit: 'm',
      },
      tier2: {
        question: 'A driver with reaction time 0.6 s drives at 30 m/s. Find the thinking distance.',
        shownEquation: 'thinking distance = speed × reaction time',
        shownStep1: 'Write what you know: speed = 30 m/s, reaction time = 0.6 s',
        hint: 'Multiply speed by reaction time. Check your answer is in metres.',
        answer: 18,
        answerUnit: 'm',
      },
      tier3: {
        question: 'A car\'s braking distance at 15 m/s is 12 m. If speed doubles to 30 m/s, what is the new braking distance?',
        hint: 'Braking distance is proportional to speed squared. If speed doubles, braking distance multiplies by 4.',
        methodHint: 'New braking distance = original × 4 = 12 × 4.',
        answer: 48,
        answerUnit: 'm',
      },
    },

    summary: {
      equation: 'Stopping distance = thinking distance + braking distance  |  KE = ½mv²',
      sentence: 'Thinking distance is proportional to speed. Braking distance is proportional to speed squared - double the speed means four times the braking distance.',
      promptText: 'Without looking: state the two components of stopping distance, name three factors affecting each, and explain why braking distance quadruples when speed doubles.',
    },

    sessionRecap: [
      'Stopping distance = thinking distance + braking distance. Thinking distance = speed × reaction time. Increased by: tiredness, alcohol, drugs, distractions.',
      'Braking distance is proportional to speed squared (from KE = ½mv²). Double speed → 4× braking distance. Increased by: wet/icy roads, worn tyres, worn brakes.',
      'With the same braking force, 4× the kinetic energy requires 4× the distance to dissipate as heat. This is why motorway speeds are so much more dangerous than urban speeds.',
    ],
  },
  momentum: {
    id: 'momentum', module: 'Forces', moduleColor: FC, course: 'physics-only', boards: ['aqa','edexcel','ocr-a','ocr-b','wjec','ccea'],
    title: 'Momentum & Impulse', subtitle: 'p = mv, Conservation & Impulse = FΔt',
    description: 'Momentum p = mv (kg·m/s). In a closed system, total momentum is conserved: total before = total after any collision or explosion. Impulse = force × time = change in momentum: FΔt = Δp = Δ(mv). This means a large force for a short time OR a small force for a long time can produce the same change in momentum. The area under a force-time (F-t) graph equals the impulse (change in momentum). Safety features (airbags, crumple zones) increase collision time (Δt), which reduces force for the same change in momentum (F = Δp/Δt).',
    lessonVisual: MomentumLesson, ideaVisual: MomentumIdea, realityVisual: MomentumReality,
    equations: [{ expr: 'p = mv', given: true }, { expr: 'F = Δ(mv)/Δt', given: true }],
    question: 'Why do airbags reduce injury in a crash?',
    questionSubtitle: 'Think about force = change in momentum ÷ time',
    options: ['They absorb all the momentum', 'They increase the time of the collision, reducing the force', 'They prevent the passenger from decelerating', 'They increase the stopping distance of the car'],
    correctAnswer: 1,
    keywords: ['momentum', 'impulse', 'FΔt = Δp', 'force-time graph', 'area under graph', 'F = Δp/Δt', 'change in momentum', 'conservation of momentum', 'airbag', 'crumple zone', 'longer time'],
    sentenceStarters: ['Impulse = FΔt = Δp, so if time increases...', 'The area under a force-time graph represents...', 'Airbags increase the time of the collision, which reduces...', 'The change in momentum stays the same, but if time is longer...', 'Conservation of momentum: total before = total after...'],
    modelAnswers: [
      'Impulse = FΔt = Δp, so if time increases, **force must decrease for the same change in momentum — airbags do exactly this**.',
      'The area under a force-time graph represents **the impulse, which equals the change in momentum (Δp = FΔt)**.',
      'Airbags increase the time of the collision, which reduces **the force experienced by the passenger (F = Δp/Δt)**.',
      'The change in momentum stays the same, but if time is longer **the force required is smaller, reducing injury**.',
      'Conservation of momentum: total before = total after — **momentum is not lost in a collision, just redistributed between objects**.',
    ],
    misconception: 'Momentum is not destroyed in a collision — it is conserved. The area under an F-t graph is impulse (Δp), not distance.',
    concept: 'Impulse = FΔt = Δp. Area under F-t graph = impulse = change in momentum. Airbag: same Δp, larger Δt → smaller F. Conservation: p_before = p_after in any closed system.',

    // -- 9-STEP LESSON DATA ----------------------------------------------------

    hook: {
      hookFact: 'A 0.05 kg golf ball hit at 70 m/s has momentum of 3.5 kg m/s. The club contacts it for about 0.0005 seconds. Average force = Δp ÷ Δt = 3.5 ÷ 0.0005 = 7000 N - about 700 times the weight of the ball itself.',
      hookQuestion: 'Why do athletes bend their knees when landing from a jump? How does this reduce injury using physics?',
      hookEmoji: '🎱',
    },

    lessonKeywords: [
      {
        word: 'Momentum',
        symbol: 'p',
        unit: 'kg m/s',
        definition: 'The product of mass and velocity: p = mv. Momentum is a vector quantity.',
        everydayNote: 'A slow-moving lorry can have more momentum than a fast-moving bicycle because of its much greater mass.',
      },
      {
        word: 'Conservation of Momentum',
        symbol: '',
        unit: '',
        definition: 'In a closed system, the total momentum before a collision equals the total momentum after.',
        everydayNote: 'Snooker: the cue ball stops and the target ball moves off with the same speed - momentum is transferred, not lost.',
      },
      {
        word: 'Impulse',
        symbol: 'J',
        unit: 'N s (same as kg m/s)',
        definition: 'The product of force and time: impulse = F × Δt. Impulse equals the change in momentum.',
        everydayNote: 'A cricket bat hitting a ball applies a large force for a short time. The impulse = change in momentum of the ball.',
      },
      {
        word: 'Change in Momentum',
        symbol: 'Δp',
        unit: 'kg m/s',
        definition: 'Final momentum minus initial momentum: Δp = mv - mu. Equal to the impulse applied.',
        everydayNote: 'A car going from 20 m/s to 0 m/s: Δp = m × (0 - 20) = -20m kg m/s (negative = deceleration).',
      },
      {
        word: 'Force-Time Graph',
        symbol: '',
        unit: '',
        definition: 'A graph of force against time. The area under the graph equals the impulse (change in momentum).',
        everydayNote: 'A spike on an F-t graph shows a short, large force (hard impact). A broad, low curve shows the same impulse spread over more time (airbag effect).',
      },
    ],

    prerequisiteCheck: {
      questions: [
        {
          question: 'A 5 kg object moves at 4 m/s. What is its momentum?',
          answers: ['0.8 kg m/s', '9 kg m/s', '20 kg m/s', '1.25 kg m/s'],
          correct: 2,
          feedback: 'p = mv = 5 × 4 = 20 kg m/s. Momentum = mass × velocity. Units are kg m/s.',
        },
        {
          question: 'Why do airbags in cars reduce injury?',
          answers: ['They absorb all the momentum', 'They increase collision time, reducing the average force', 'They prevent any change in momentum', 'They reduce the mass of the passenger'],
          correct: 1,
          feedback: 'F = Δp ÷ Δt. The change in momentum (Δp) is fixed by the crash. Airbags increase Δt (collision time), so the force F is smaller. Same impulse, smaller force.',
        },
      ],
    },

    topicMapHint: {
      before: ["Newton's Laws (F = ma)", 'Stopping Distance'],
      current: 'Momentum & Impulse',
      after: ['Forces in Collisions', 'Safety Features (Applied)'],
    },

    workedExample: {
      title: 'Conservation of momentum in a collision',
      equation: 'p = mv  |  total p before = total p after',
      context: 'A 3 kg ball moving at 4 m/s hits a stationary 1 kg ball. After the collision, the 3 kg ball moves at 1 m/s. Find the velocity of the 1 kg ball.',
      steps: [
        { step: 1, action: 'Calculate total momentum before', content: 'p_before = (3 × 4) + (1 × 0) = 12 + 0 = 12 kg m/s', annotation: 'The stationary ball has zero velocity, so zero momentum. Always include it explicitly.' },
        { step: 2, action: 'Write total momentum after', content: 'p_after = (3 × 1) + (1 × v) = 3 + v', annotation: 'v is the unknown velocity of the 1 kg ball after the collision.' },
        { step: 3, action: 'Apply conservation', content: 'p_before = p_after → 12 = 3 + v → v = 9 m/s', annotation: 'Common error: forgetting the 3 kg ball still moves after the collision. It now moves at 1 m/s, not 0.' },
        { step: 4, action: 'State with unit', content: 'v = 9 m/s (in the original direction of travel)', annotation: 'Sense check: 9 m/s is faster than the original 4 m/s. That is fine - the lighter ball carries most of the momentum.' },
      ],
      misconceptionAfter: {
        claim: 'Momentum is destroyed in a collision - the objects slow down so momentum must be lost.',
        reality: 'Momentum is always conserved in a closed system. When the moving ball slows down, it transfers momentum to the other ball. Total momentum before = total momentum after - it is redistributed, not lost.',
        visual: 'Newton\'s cradle: one ball swings in, one ball swings out with the same speed. Momentum is transferred through the row, not destroyed.',
      },
    },

    guidedPractice: {
      tier1: {
        question: 'A 5 kg object moves at 6 m/s. Calculate its momentum.',
        allSteps: ['Write: m = 5 kg, v = 6 m/s', 'Equation: p = m × v', 'Substitute: p = 5 × 6', '??? - calculate p'],
        missingStep: 3,
        missingHint: 'Calculate: p = 5 × 6 = ?',
        answer: 30,
        answerUnit: 'kg m/s',
      },
      tier2: {
        question: 'A force of 400 N acts on an object for 0.05 seconds. Calculate the impulse.',
        shownEquation: 'Impulse = F × Δt',
        shownStep1: 'Write what you know: F = 400 N, Δt = 0.05 s',
        hint: 'Multiply force by time. Check units: N × s = N s (equivalent to kg m/s).',
        answer: 20,
        answerUnit: 'N s',
      },
      tier3: {
        question: 'A 4 kg object at 3 m/s collides with a stationary 2 kg object. They stick together. Find the combined velocity.',
        hint: 'Use conservation of momentum: total p before = total p after. Combined mass = 4 + 2 = 6 kg.',
        methodHint: 'p before = 4 × 3 + 2 × 0 = 12 kg m/s. After: 6 × v = 12. Solve for v.',
        answer: 2,
        answerUnit: 'm/s',
      },
    },

    summary: {
      equation: 'p = mv  |  Impulse = FΔt = Δp  |  p_before = p_after',
      sentence: 'Momentum = mass × velocity. In any closed system, total momentum is conserved. Impulse = force × time = change in momentum.',
      promptText: 'Without looking: write the equation for momentum, state the principle of conservation of momentum, and explain how airbags reduce force using the impulse equation.',
    },

    sessionRecap: [
      'Momentum p = mv (kg m/s). It is a vector - direction matters. A 2 kg object at 5 m/s has the same magnitude of momentum as a 10 kg object at 1 m/s.',
      'Conservation of momentum: total momentum before = total momentum after in a closed system. In collisions, momentum is transferred between objects, not destroyed.',
      'Impulse = F × Δt = Δp. Area under F-t graph = impulse. Airbags, crumple zones and bent knees all increase Δt for the same Δp, reducing the average force and injury.',
    ],
  },

  circular_motion: {
    id: 'circular_motion',
    title: 'Circular Motion',
    emoji: '🔄',
    color: '#f59e0b',
    module: 'Forces',
    moduleColor: FC,
    paper: 2,
    boards: ['wjec'],
    course: 'physics-only',
    hook: {
      hookFact: 'A car going round a roundabout at constant speed is still accelerating — because its direction keeps changing.',
      hookQuestion: 'If speed is constant, how can a circular object be accelerating?',
      hookEmoji: '🎡',
    },
    lessonKeywords: [
      { word: 'Centripetal force', symbol: 'F', unit: 'N', definition: 'The resultant force directed towards the centre of a circular path, causing circular motion', everydayNote: 'Provided by friction (car on bend), tension (swinging ball), or gravity (satellite orbit).' },
      { word: 'Centripetal acceleration', symbol: 'a', unit: 'm/s²', definition: 'Acceleration directed towards the centre of circular motion; a = v²/r', everydayNote: 'Even at constant speed, direction change means acceleration always exists.' },
      { word: 'Angular velocity', symbol: 'ω', unit: 'rad/s', definition: 'Rate of change of angle; ω = 2π/T = 2πf', everydayNote: 'Earth\'s angular velocity ω ≈ 2×10⁻⁷ rad/s — very slow but constant.' },
      { word: 'Radian', symbol: 'rad', unit: '', definition: 'Unit of angle; 2π radians = 360°; one radian is the angle where arc length equals radius', everydayNote: 'One complete revolution = 2π ≈ 6.28 radians.' },
      { word: 'Period', symbol: 'T', unit: 's', definition: 'Time for one complete revolution, in seconds', everydayNote: 'Earth\'s orbital period T = 3.15×10⁷ s (one year).' },
      { word: 'Linear speed', symbol: 'v', unit: 'm/s', definition: 'Speed along the circular path; v = ωr = 2πr/T', everydayNote: 'Points further from the centre move faster for the same angular velocity.' },
    ],
    lessonSteps: [
      {
        type: 'concept',
        title: 'What is centripetal force?',
        content: 'Any object moving in a circle must have a resultant force directed toward the centre. This is centripetal force. It is NOT a new type of force — it is the name for whatever force is pointing inward (gravity for orbits, friction for cars on bends, tension for a swinging ball). Without it, the object would travel in a straight line (Newton\'s 1st Law).',
      },
      {
        type: 'concept',
        title: 'F = mv²/r and F = mω²r',
        content: 'Centripetal force F = mv²/r (using linear speed) or F = mω²r (using angular velocity). Both are correct. v = ωr links them. Key insight: doubling speed quadruples F needed (v is squared). Doubling radius halves F needed.',
      },
      {
        type: 'concept',
        title: 'Angular velocity and radians',
        content: 'Angular velocity ω (omega) measures how fast the angle changes. ω = 2π/T where T is the period in seconds. ω = 2πf where f is frequency. Units: rad/s. Relationship to linear speed: v = ωr. Example: Earth orbits in T = 3.15×10⁷ s, so ω = 2π/3.15×10⁷ = 2.0×10⁻⁷ rad/s.',
      },
      {
        type: 'worked_example',
        title: 'Car on a roundabout',
        content: 'A 1200 kg car travels at 15 m/s around a roundabout of radius 40 m. Calculate: (a) centripetal acceleration, (b) centripetal force.\na = v²/r = 15²/40 = 225/40 = 5.625 m/s²\nF = ma = 1200 × 5.625 = 6750 N\nThis force is provided by friction between tyres and road.',
      },
    ],
    topicMapHint: {
      before: ['Momentum'],
      current: 'Circular Motion',
      after: [],
    },
    description: 'An object moving in a circle at constant speed is still accelerating because its direction continuously changes. Centripetal acceleration a = v²/r always points toward the centre. Centripetal force F = mv²/r (or F = mω²r) is the name for whichever real force provides this inward pull. Angular velocity ω = 2π/T = 2πf (rad/s). Linear speed v = ωr.',
    equations: [{ expr: 'F = mv²/r', given: true }, { expr: 'a = v²/r', given: true }, { expr: 'v = ωr', given: true }],
    question: 'A car travels at constant speed around a circular roundabout. Which statement is correct?',
    options: ['The car has zero acceleration because speed is constant', 'The car accelerates towards the centre of the circle', 'The centripetal force pushes the car outward', 'The car has no resultant force acting on it'],
    correctAnswer: 1,
    keywords: ['centripetal force', 'centripetal acceleration', 'circular motion', 'angular velocity', 'radian', 'period', 'v = ωr', 'F = mv²/r'],

    lessonVisual: null,
    ideaVisual: null,
    realityVisual: null,

    prerequisiteCheck: {
      questions: [
        {
          question: 'An object is moving in a straight line at constant speed. What must be true about the forces on it?',
          answers: ['There must be a large force pushing it forward', 'The resultant force is zero', 'There must be a centripetal force', 'Gravity must be acting on it'],
          correct: 1,
          feedback: 'Newton\'s 1st Law: if an object moves at constant velocity (constant speed in a straight line), the resultant force is zero. To change direction, a resultant force is needed.',
        },
        {
          question: 'A car drives at constant speed around a roundabout. In which direction does its acceleration point?',
          answers: ['In the direction of travel', 'Away from the centre (outward)', 'Towards the centre (inward)', 'There is no acceleration'],
          correct: 2,
          feedback: 'Even at constant speed, the car\'s direction is changing. Acceleration is the rate of change of velocity (a vector), so changing direction = acceleration. This centripetal acceleration always points towards the centre of the circle.',
        },
      ],
    },

    workedExample: {
      title: 'Car on a roundabout — centripetal force',
      equation: 'F = mv²/r  |  a = v²/r',
      context: 'A 1200 kg car travels at 15 m/s around a roundabout of radius 40 m. Calculate (a) the centripetal acceleration and (b) the centripetal force.',
      steps: [
        { step: 1, action: 'Write what you know', content: 'm = 1200 kg, v = 15 m/s, r = 40 m', annotation: 'Always list the known values before substituting. Identify which equation to use — we have v and r, so use a = v²/r.' },
        { step: 2, action: 'Calculate centripetal acceleration', content: 'a = v²/r = 15² / 40 = 225 / 40 = 5.625 m/s²', annotation: 'Square the speed first: 15² = 225. Then divide by radius. Direction is always toward the centre.' },
        { step: 3, action: 'Calculate centripetal force', content: 'F = ma = 1200 × 5.625 = 6750 N', annotation: 'Or use F = mv²/r = 1200 × 225 / 40 = 6750 N directly. Both routes give the same answer.' },
        { step: 4, action: 'Interpret the result', content: 'The 6750 N centripetal force is provided by friction between the tyres and the road surface.', annotation: 'Centripetal force is not a new type of force — it is the label for whatever real force acts inward. On a wet road, if friction cannot supply 6750 N, the car skids outward.' },
      ],
      misconceptionAfter: {
        claim: 'Centrifugal force pushes objects outward in circular motion.',
        reality: 'There is no outward "centrifugal force" in an inertial frame. Objects feel as if they are pushed outward only because of their inertia (tendency to travel in a straight line). The only real force is centripetal — directed inward toward the centre.',
        visual: 'Spin a ball on a string: if the string breaks, the ball flies off tangentially (straight line), NOT outward. This shows the inward tension (centripetal force) was what kept it on the circular path.',
      },
    },

    guidedPractice: {
      tier1: {
        question: 'A 2 kg ball moves at 4 m/s in a circle of radius 2 m. Calculate the centripetal force.',
        allSteps: ['Write: m = 2 kg, v = 4 m/s, r = 2 m', 'Equation: F = mv²/r', 'Substitute: F = 2 × 4² / 2 = 2 × 16 / 2', '??? - calculate F'],
        missingStep: 3,
        missingHint: 'Calculate: 2 × 16 / 2 = 16 N',
        answer: 16,
        answerUnit: 'N',
      },
      tier2: {
        question: 'A 0.5 kg stone on a string moves in a horizontal circle of radius 1.2 m. The centripetal force is 24 N. Find the speed of the stone.',
        shownEquation: 'F = mv²/r  →  v² = Fr/m',
        shownStep1: 'Write what you know: F = 24 N, r = 1.2 m, m = 0.5 kg',
        hint: 'Rearrange F = mv²/r to get v² = Fr/m. Calculate v², then square-root for v.',
        answer: 7.59,
        answerUnit: 'm/s',
      },
      tier3: {
        question: 'A wheel of radius 0.3 m completes one revolution every 0.5 s. Calculate (a) the angular velocity ω and (b) the linear speed of a point on the rim.',
        hint: 'Use ω = 2π/T to find angular velocity, then v = ωr to find linear speed.',
        methodHint: 'ω = 2π / 0.5 = 4π ≈ 12.57 rad/s. Then v = ωr = 12.57 × 0.3 ≈ 3.77 m/s.',
        answer: 3.77,
        answerUnit: 'm/s',
      },
    },

    summary: {
      equation: 'F = mv²/r  |  a = v²/r  |  ω = 2π/T  |  v = ωr',
      sentence: 'An object in circular motion accelerates toward the centre. Centripetal force F = mv²/r is provided by a real inward force (friction, tension, or gravity). Angular velocity ω = 2π/T links period to rotation rate.',
      promptText: 'Without looking: write the equation for centripetal force, state what provides it for a car on a bend, and explain why a faster speed requires a larger centripetal force.',
    },

    sessionRecap: [
      'Circular motion at constant speed still involves acceleration, because direction changes continuously. Centripetal acceleration a = v²/r always points toward the centre of the circle.',
      'Centripetal force F = mv²/r (or F = mω²r) is not a new force — it is whichever real force acts inward (friction for cars, tension for strings, gravity for satellites). Doubling speed quadruples the force needed.',
      'Angular velocity ω = 2π/T = 2πf (rad/s). Linear speed v = ωr — points further from the centre move faster for the same ω.',
    ],
  },
}
