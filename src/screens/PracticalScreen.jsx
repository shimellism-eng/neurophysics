import { useState, useEffect } from 'react'
import { Browser } from '@capacitor/browser'
import { useNavigate, useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { CaretLeft, CaretDown, CaretUp, Flask, ChartBar, Sliders, ListNumbers, Table, BookOpen, ArrowSquareOut, ShieldWarning, CheckCircle, Warning, Lightning } from '@phosphor-icons/react'
import { PRACTICALS } from '../data/practicals'
import { useProgress } from '../hooks/useProgress'
import { getSelectedBoard } from '../utils/boardConfig'
import { useDataCollector } from '../hooks/useDataCollector'

// ─── Tabs ──────────────────────────────────────────────────────────────────────
const TABS = [
  { id: 'overview',   label: 'Overview',   icon: BookOpen },
  { id: 'safety',     label: 'Safety',     icon: ShieldWarning },
  { id: 'variables',  label: 'Variables',  icon: Sliders },
  { id: 'setup',      label: 'Set Up',     icon: Flask },
  { id: 'method',     label: 'Method',     icon: ListNumbers },
  { id: 'results',    label: 'Results',    icon: Table },
  { id: 'analysis',   label: 'Analysis',   icon: ChartBar },
  { id: 'explore',    label: 'Explore',    icon: ArrowSquareOut },
]

// ─── SVG helper atoms ─────────────────────────────────────────────────────────
const W  = ({ x1,y1,x2,y2 }) => <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#cbd5e1" strokeWidth={1.5} strokeLinecap="round"/>
const A  = ({ cx, cy }) => (
  <g>
    <circle cx={cx} cy={cy} r={12} fill="#0b1121" stroke="#10b981" strokeWidth={1.5}/>
    <text x={cx} y={cy+4} textAnchor="middle" fontSize={11} fontWeight="bold" fill="#10b981">A</text>
  </g>
)
const V  = ({ cx, cy }) => (
  <g>
    <circle cx={cx} cy={cy} r={12} fill="#0b1121" stroke="#f59e0b" strokeWidth={1.5}/>
    <text x={cx} y={cy+4} textAnchor="middle" fontSize={11} fontWeight="bold" fill="#f59e0b">V</text>
  </g>
)
const PSU = ({ x, y, label = '12V' }) => (
  <g>
    <rect x={x} y={y} width={40} height={26} rx={3} fill="#1e293b" stroke="#6366f1" strokeWidth={1.5}/>
    <text x={x+20} y={y+15} textAnchor="middle" fontSize={8} fill="#a5b4fc" fontWeight="600">{label}</text>
    <text x={x+20} y={y+24} textAnchor="middle" fontSize={7} fill="#6366f1">PSU</text>
    {/* + terminal top-left, - terminal top-right */}
    <text x={x+4} y={y-2} fontSize={9} fill="#10b981" fontWeight="bold">+</text>
    <text x={x+30} y={y-2} fontSize={9} fill="#ef4444" fontWeight="bold">−</text>
  </g>
)
const Lbl = ({ x, y, t, c = '#94a3b8', a = 'middle', s = 9 }) =>
  <text x={x} y={y} textAnchor={a} fontSize={s} fill={c}>{t}</text>

const Spring = ({ x, y, length, coils = 7 }) => {
  const step = length / coils
  const pts = [`M ${x},${y}`]
  for (let i = 0; i < coils; i++) {
    const yBase = y + i * step
    pts.push(`C ${x + 12},${yBase} ${x + 12},${yBase + step * 0.5} ${x},${yBase + step * 0.5}`)
    pts.push(`C ${x - 12},${yBase + step * 0.5} ${x - 12},${yBase + step} ${x},${yBase + step}`)
  }
  return <path d={pts.join(' ')} fill="none" stroke="#818cf8" strokeWidth={2}/>
}

// ─── Setup Diagrams ────────────────────────────────────────────────────────────

function SetupSHC() {
  const { data, addPoint, reset, canPlot, isFull } = useDataCollector(10)
  const [time, setTime] = useState(0)
  // Aluminium block: SHC = 900 J/kg°C, mass = 1 kg
  // PSU: 12 V, heater: 30 W → I = P/V = 2.5 A
  const mass = 1.0, power = 30, shc = 900, t0 = 20
  const voltage = 12.0, current = (power / voltage).toFixed(1)   // 2.5 A
  const dT   = (power * time / (mass * shc)).toFixed(1)
  const temp = (t0 + parseFloat(dT)).toFixed(1)
  // Thermometer fill: 0°C rise → 0px; 20°C rise → 46px
  const fill = Math.min(46, parseFloat(dT) * 2.3)

  // ── Layout constants ───────────────────────────────────
  // viewBox 400×225 — wide enough for callout labels outside
  // PSU far left | block centre | callouts on both sides
  const blockTop = 108
  const tA = 170   // left  terminal cap centre x
  const tB = 200   // right terminal cap centre x  (30 px apart)

  return (
    <div className="flex flex-col gap-3">
      <svg viewBox="0 0 400 220" width="100%" style={{ display: 'block' }}>

        {/* ── Power Supply — callout line from box to label above-left ── */}
        <PSU x={10} y={128} label="12V"/>
        <line x1={30} y1={128} x2={30} y2={114}
          stroke="#a5b4fc" strokeWidth={0.8} strokeDasharray="2 2"/>
        <Lbl x={30} y={111} t="POWER SUPPLY" c="#a5b4fc" s={7}/>

        {/* ── Insulating foam mat ── */}
        <rect x={150} y={186} width={140} height={7} rx={2}
          fill="#fef3c7" stroke="#fbbf24" strokeWidth={1}/>
        <Lbl x={220} y={202} t="Insulating mat / foam" c="#92400e" s={7}/>

        {/* ── Aluminium block — callout → right, below thermometer callout ── */}
        <rect x={155} y={blockTop} width={130} height={75} rx={3}
          fill="#4b5563" fillOpacity={0.22} stroke="#9ca3af" strokeWidth={2}/>
        {/* Callout from block right edge at y=155 → outside right */}
        <line x1={285} y1={blockTop + 55} x2={296} y2={blockTop + 55}
          stroke="#9ca3af" strokeWidth={0.8} strokeDasharray="2 2"/>
        <Lbl x={298} y={blockTop + 53} t="ALUMINIUM BLOCK" c="#9ca3af" s={8} a="start"/>
        <Lbl x={298} y={blockTop + 63} t="m = 1 kg"         c="#6b7280" s={7} a="start"/>

        {/* ── Heater hole — left side of block ── */}
        {/* Hole: x=163 to x=203 (40 px wide). tA=170, tB=200 */}
        <rect x={163} y={blockTop}     width={40} height={50} rx={2}
          fill="#0b1121" stroke="#f97316" strokeWidth={1.5}/>
        <rect x={166} y={blockTop + 3} width={34} height={44} rx={2}
          fill="#f97316" fillOpacity={0.55}/>
        {/* Connector caps — protrude 9 px above block top */}
        <rect x={166} y={blockTop - 9} width={8} height={10} rx={1}
          fill="#334155" stroke="#94a3b8" strokeWidth={1}/>
        <rect x={196} y={blockTop - 9} width={8} height={10} rx={1}
          fill="#334155" stroke="#94a3b8" strokeWidth={1}/>
        {/* Heater callout → LEFT of block (clear of PSU) */}
        <line x1={163} y1={blockTop + 25} x2={145} y2={blockTop + 25}
          stroke="#f97316" strokeWidth={0.8} strokeDasharray="2 2"/>
        <Lbl x={143} y={blockTop + 23} t="HEATER" c="#f97316" s={8} a="end"/>
        <Lbl x={143} y={blockTop + 34} t="30 W"   c="#f97316" s={7} a="end"/>

        {/* ── Thermometer — right side of block, callout → RIGHT ── */}
        {/* Stem above block */}
        <rect x={243} y={blockTop - 16} width={8} height={18} rx={3}
          fill="#0b1121" stroke="#94a3b8" strokeWidth={1}/>
        {/* Tube inside block */}
        <rect x={243} y={blockTop}      width={8} height={48} rx={3}
          fill="#0b1121" stroke="#94a3b8" strokeWidth={1}/>
        {[0,1,2,3,4].map(i => (
          <line key={i} x1={243} y1={blockTop + 8 + i * 9} x2={246} y2={blockTop + 8 + i * 9}
            stroke="#475569" strokeWidth={0.6}/>
        ))}
        <rect x={244.5} y={blockTop + 4 + (43 - fill)} width={5} height={fill} rx={2}
          fill="#ef4444" fillOpacity={0.9}/>
        <ellipse cx={247} cy={blockTop + 52} rx={6} ry={5} fill="#ef4444" fillOpacity={0.9}/>
        {/* Callout line → right, exits block at x=285 */}
        <line x1={251} y1={blockTop + 20} x2={292} y2={blockTop + 20}
          stroke="#64748b" strokeWidth={0.8} strokeDasharray="2 2"/>
        <Lbl x={294} y={blockTop + 14} t={`${temp} °C`}  c="#ef4444" s={10} a="start"/>
        <Lbl x={294} y={blockTop + 24} t="THERMOMETER"    c="#64748b" s={7}  a="start"/>

        {/* ── CIRCUIT ─────────────────────────────────────── */}
        {/* Top rail y=22: PSU+ → Ammeter → right corner      */}
        {/* Mid rail y=48: right corner → tB cap; tA → PSU−   */}
        {/* V circle between tA=170 & tB=200 at cy=72         */}
        {/* ─────────────────────────────────────────────────── */}

        {/* PSU+ up left rail → top rail → Ammeter */}
        <W x1={14}  y1={128} x2={14}  y2={22}/>
        <W x1={14}  y1={22}  x2={338} y2={22}/>
        <A cx={350} cy={22}/>
        <Lbl x={350} y={8} t="AMMETER" c="#10b981" s={8}/>
        <text x={350} y={38} textAnchor="middle" fontSize={8} fontWeight="700" fill="#10b981" fontFamily="monospace">{current} A</text>
        {/* Ammeter → right corner → down to mid-rail → across to tB */}
        <W x1={362} y1={22}  x2={382} y2={22}/>
        <W x1={382} y1={22}  x2={382} y2={48}/>
        <W x1={382} y1={48}  x2={tB}  y2={48}/>
        <W x1={tB}  y1={48}  x2={tB}  y2={blockTop - 9}/>

        {/* PSU− return: tA → mid-rail → left rail → PSU */}
        <W x1={tA} y1={blockTop - 9} x2={tA} y2={48}/>
        <W x1={tA} y1={48}  x2={40}  y2={48}/>
        <W x1={40} y1={48}  x2={40}  y2={128}/>

        {/* ── Voltmeter — between tA=170 & tB=200, cy=72 ── */}
        {/* V r=12 → left edge 173, right edge 197           */}
        {/* tA=170 is 3 px left  of left  edge → short lead  */}
        {/* tB=200 is 3 px right of right edge → short lead  */}
        <V cx={185} cy={72}/>
        <W x1={173} y1={72} x2={tA} y2={72}/>
        <W x1={197} y1={72} x2={tB} y2={72}/>
        <circle cx={tA} cy={72} r={2.5} fill="#f59e0b"/>
        <circle cx={tB} cy={72} r={2.5} fill="#f59e0b"/>
        {/* Voltmeter callout → right, past tB wire */}
        <line x1={197} y1={72} x2={215} y2={60}
          stroke="#f59e0b" strokeWidth={0.8} strokeDasharray="2 2"/>
        <Lbl x={217} y={58} t="VOLTMETER"       c="#f59e0b" s={8} a="start"/>
        <text x={217} y={68} textAnchor="start" fontSize={8} fontWeight="700" fill="#f59e0b" fontFamily="monospace">{voltage.toFixed(1)} V</text>

      </svg>

      {/* ── Readout tiles — what each instrument reads ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
        {[
          { label: 'Ammeter',     value: current,                         unit: 'A',  accent: '#10b981', bg: '#00251a' },
          { label: 'Voltmeter',   value: voltage.toFixed(1),              unit: 'V',  accent: '#f59e0b', bg: '#251a00' },
          { label: 'Temperature', value: temp,                            unit: '°C', accent: '#ef4444', bg: '#250a0a' },
        ].map(({ label, value, unit, accent, bg }) => (
          <div key={label} style={{ background: bg, border: `1px solid ${accent}50`, borderRadius: 12, padding: '10px 0', textAlign: 'center' }}>
            <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 2, color: accent, textTransform: 'uppercase', marginBottom: 4 }}>{label}</div>
            <div style={{ fontFamily: 'monospace', fontSize: 20, fontWeight: 700, color: accent, lineHeight: 1 }}>{value}</div>
            <div style={{ fontSize: 9, color: accent, marginTop: 3 }}>{unit}</div>
          </div>
        ))}
      </div>

      <div className="px-1">
        <div className="text-xs mb-1" style={{ color: '#a8b8cc' }}>Time: {time} s</div>
        <input type="range" min={0} max={600} step={60} value={time}
          onChange={e => setTime(+e.target.value)} className="w-full accent-indigo-400"/>
        <div className="flex justify-between text-xs mt-0.5" style={{ color: '#475569' }}>
          <span>0 s</span><span>600 s</span>
        </div>
      </div>

      {/* ── Data Collection ── */}
      <div className="px-1 pt-1">
        <div className="flex items-center gap-2">
          <button
            onClick={() => addPoint({ x: Math.round(power * time), y: parseFloat(dT) })}
            disabled={isFull}
            className="flex-1 py-2 rounded-[10px] text-xs font-semibold"
            style={{
              background: 'rgba(99,102,241,0.15)',
              border: '0.75px solid rgba(99,102,241,0.4)',
              color: '#a5b4fc',
              opacity: isFull ? 0.4 : 1,
            }}>
            {`📊 Record: ${(power * time).toLocaleString()} J → +${dT}°C`}
          </button>
          {data.length > 0 && (
            <button onClick={reset}
              className="px-3 py-2 rounded-[10px] text-xs"
              style={{ background: '#1e293b', border: '0.75px solid #334155', color: '#94a3b8' }}>
              Clear
            </button>
          )}
        </div>

        {data.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {data.map((pt, i) => (
              <div key={i} className="px-2 py-0.5 rounded-full text-xs"
                style={{ background: '#6366f120', border: '0.75px solid #6366f140', color: '#a5b4fc' }}>
                {`${pt.x}J → +${pt.y}°C`}
              </div>
            ))}
          </div>
        )}

        {canPlot && (
          <div className="mt-3">
            <ScatterGraph
              title="Your Data: ΔT vs Energy"
              xLabel="Energy (J)" yLabel="ΔT (°C)"
              xMax={18000}
              yMax={data.length > 0 ? Math.max(...data.map(d => d.y)) * 1.2 || 1 : 1}
              xTicks={[0,3000,6000,9000,12000,15000,18000]}
              yTicks={data.length > 0 ? [0,1,2,3,4].map(i => parseFloat((Math.max(...data.map(d => d.y)) * 1.2 * i / 4).toFixed(2))) : [0,1]}
              points={data}
              lobf={data.length >= 4 ? [data[0], data[data.length-1]] : null}
              lobfLabel="Line of best fit"
              color="#6366f1"
            />
          </div>
        )}
      </div>
    </div>
  )
}

function SetupInsulation() {
  const [elapsed, setElapsed] = useState(0)
  const [running, setRunning] = useState(false)

  const mats = [
    { label: 'None',        k: 2.2,  c: '#ef4444' },
    { label: 'Newspaper',   k: 1.1,  c: '#f97316' },
    { label: 'Bubble wrap', k: 0.75, c: '#eab308' },
    { label: 'Polystyrene', k: 0.45, c: '#10b981' },
  ]
  const t0 = 80

  // Real-time ticker: 800ms = 1 simulated minute
  useEffect(() => {
    if (!running) return
    const id = setInterval(() => {
      setElapsed(e => {
        if (e >= 20) { setRunning(false); return 20 }
        return e + 1
      })
    }, 800)
    return () => clearInterval(id)
  }, [running])

  // Thermometer tracks "None" insulation (most dramatic drop)
  const T_ref = Math.round(t0 * Math.exp(-2.2 * 0.05 * elapsed))
  // Map 20–80°C → mercury height 6–72px, bottom-anchored at tube y=146
  const mercuryH = 6 + Math.max(0, (T_ref - 20) / 60) * 66
  const mercuryTop = 146 - mercuryH

  const Tag = ({ lx, ly, tx, ty, label }) => (
    <g>
      <line x1={lx} y1={ly} x2={tx} y2={ty} stroke="#475569" strokeWidth={0.8}/>
      <rect x={tx - 1} y={ty - 6} width={label.length * 5.2 + 6} height={10} rx={2}
        fill="#1e3a5f" stroke="#3b5a80" strokeWidth={0.6}/>
      <text x={tx + 2} y={ty + 2} fontSize={7} fill="#cbd5e1" fontWeight="600">{label}</text>
    </g>
  )

  const mm = String(elapsed).padStart(2, '0')

  return (
    <div className="flex flex-col gap-3">
      <svg viewBox="0 0 300 215" width="100%" style={{ display: 'block' }}>

        {/* ── Large beaker ── */}
        <rect x={28} y={95} width={148} height={100} fill="none" stroke="#94a3b8" strokeWidth={1.8}/>
        <ellipse cx={102} cy={195} rx={74} ry={7} fill="none" stroke="#94a3b8" strokeWidth={1.8}/>
        <ellipse cx={102} cy={95} rx={74} ry={9} fill="none" stroke="#94a3b8" strokeWidth={1.2}/>
        <rect x={29} y={130} width={146} height={65} fill="#bfdbfe18"/>
        <ellipse cx={102} cy={130} rx={73} ry={7} fill="#bfdbfe18"/>
        <ellipse cx={102} cy={195} rx={73} ry={6.5} fill="#7dd3fc12"/>

        {/* ── Small beaker ── */}
        <rect x={62} y={100} width={80} height={92} fill="none" stroke="#7dd3fc" strokeWidth={1.4}/>
        <ellipse cx={102} cy={100} rx={40} ry={5} fill="none" stroke="#7dd3fc" strokeWidth={1.2}/>
        <ellipse cx={102} cy={192} rx={40} ry={4} fill="none" stroke="#7dd3fc" strokeWidth={1}/>
        <rect x={63} y={145} width={78} height={47} fill="#7dd3fc1a"/>
        <ellipse cx={102} cy={145} rx={39} ry={4} fill="#7dd3fc1a"/>

        {/* ── Card lid ── */}
        <polygon points="12,82 168,82 180,95 24,95" fill="#d4a96a" stroke="#a07840" strokeWidth={1}/>
        <line x1={40}  y1={83} x2={44}  y2={94} stroke="#c49050" strokeWidth={0.5} opacity={0.5}/>
        <line x1={80}  y1={83} x2={84}  y2={94} stroke="#c49050" strokeWidth={0.5} opacity={0.5}/>
        <line x1={120} y1={83} x2={124} y2={94} stroke="#c49050" strokeWidth={0.5} opacity={0.5}/>
        <line x1={155} y1={83} x2={159} y2={94} stroke="#c49050" strokeWidth={0.5} opacity={0.5}/>

        {/* ── Thermometer glass tubes ── */}
        <rect x={99} y={32} width={6} height={52} rx={3} fill="#e2e8f015" stroke="#94a3b8" strokeWidth={0.8}/>
        <rect x={99} y={94} width={6} height={52} rx={3} fill="#e2e8f010" stroke="#7dd3fc" strokeWidth={0.8}/>
        {/* Scale marks with labels */}
        {[80, 70, 60, 50, 40, 30, 20].map((temp, i) => (
          <g key={i}>
            <line x1={99} y1={38 + i*8} x2={104} y2={38 + i*8} stroke="#94a3b8" strokeWidth={0.8}/>
            {i % 2 === 0 && (
              <text x={88} y={38 + i*8 + 3} fontSize={5.5} fill="#64748b" textAnchor="end">{temp}</text>
            )}
          </g>
        ))}
        {/* Animated mercury (CSS transition) */}
        <rect x={100.5} y={mercuryTop} width={3} height={mercuryH} rx={1.5}
          fill="#ef4444" fillOpacity={0.85}
          style={{ transition: 'y 0.7s ease, height 0.7s ease' }}
        />

        {/* ── Stopwatch (clickable play/pause) ── */}
        <g onClick={() => {
            if (elapsed >= 20) { setElapsed(0); setRunning(true) }
            else setRunning(r => !r)
          }} style={{ cursor: 'pointer' }}>
          {/* top buttons */}
          <rect x={239} y={26} width={8} height={7} rx={2} fill="#f97316" stroke="#ea6000" strokeWidth={0.7}/>
          <rect x={252} y={26} width={8} height={7} rx={2} fill="#374151" stroke="#1f2937" strokeWidth={0.7}/>
          {/* body – green border when running */}
          <rect x={230} y={32} width={38} height={42} rx={8}
            fill="#374151" stroke={running ? '#22c55e' : '#4b5563'} strokeWidth={1.4}/>
          {/* screen */}
          <rect x={234} y={37} width={30} height={20} rx={3} fill="#1f2937"/>
          <text x={249} y={51} textAnchor="middle" fontSize={9} fill="#f0fdf4"
            fontWeight="bold" fontFamily="monospace">{mm}:00</text>
          {/* play / pause icon */}
          {running
            ? <><rect x={244} y={62} width={3} height={8} rx={1} fill="#94a3b8"/>
                 <rect x={249} y={62} width={3} height={8} rx={1} fill="#94a3b8"/></>
            : <polygon points="244,62 244,70 253,66" fill="#22c55e"/>
          }
        </g>

        {/* ── Labels ── */}
        <Tag lx={99}  ly={36}  tx={188} ty={20}  label="Thermometer"/>
        <Tag lx={249} ly={32}  tx={198} ty={8}   label="Stopwatch"/>
        <Tag lx={158} ly={90}  tx={198} ty={98}  label="Piece of card"/>
        <Tag lx={176} ly={145} tx={198} ty={122} label="Large beaker"/>
        <Tag lx={142} ly={168} tx={198} ty={148} label="Small beaker"/>
      </svg>

      {/* ── Materials temperature legend (2-col HTML, no overlap) ── */}
      <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 px-1">
        {mats.map((m) => {
          const T = Math.round(t0 * Math.exp(-m.k * 0.05 * elapsed))
          return (
            <div key={m.label} className="flex items-center gap-1.5 text-xs">
              <div className="w-2 h-2 rounded-sm shrink-0" style={{ background: m.c }}/>
              <span style={{ color: m.c }}>{m.label}: <strong>{T}°C</strong></span>
            </div>
          )
        })}
      </div>

      {/* ── Status + reset ── */}
      <div className="flex items-center justify-between px-1">
        <span className="text-xs" style={{ color: '#a8b8cc' }}>
          {elapsed >= 20 ? 'Complete - tap stopwatch to restart' : `Elapsed: ${elapsed} min`}
        </span>
        {elapsed > 0 && !running && elapsed < 20 && (
          <button onClick={() => { setElapsed(0); setRunning(false) }}
            className="text-xs px-2 py-0.5 rounded-md"
            style={{ background: '#1e293b', border: '0.75px solid #334155', color: '#94a3b8' }}>
            Reset
          </button>
        )}
      </div>

      {/* ── Cooling curves graph ── */}
      <div className="rounded-[12px] px-2 pt-3 pb-2"
        style={{ background: '#0b1525', border: '0.75px solid #1d293d' }}>
        <div className="text-xs font-semibold mb-1 px-1" style={{ color: '#6366f1' }}>
          Temperature vs Time
        </div>
        <svg viewBox="0 0 300 190" width="100%" style={{ display: 'block' }}>
          {/* Y-axis gridlines + labels */}
          {[0, 20, 40, 60, 80].map(T => {
            const y = 158 - (T / 100) * 148
            return (
              <g key={T}>
                <line x1={38} y1={y} x2={282} y2={y} stroke="#1d293d" strokeWidth={0.6}/>
                <text x={34} y={y + 3.5} fontSize={7} fill="#475569" textAnchor="end">{T}</text>
              </g>
            )
          })}
          {/* X-axis gridlines + labels */}
          {[0, 5, 10, 15, 20].map(t => {
            const x = 40 + t * 12.1
            return (
              <g key={t}>
                <line x1={x} y1={10} x2={x} y2={158} stroke="#1d293d" strokeWidth={0.6} strokeDasharray="3,2"/>
                <text x={x} y={171} fontSize={7} fill="#475569" textAnchor="middle">{t}</text>
              </g>
            )
          })}
          {/* Axes */}
          <line x1={40} y1={8} x2={40} y2={160} stroke="#475569" strokeWidth={1.2}/>
          <line x1={38} y1={158} x2={284} y2={158} stroke="#475569" strokeWidth={1.2}/>
          {/* Arrow heads */}
          <polygon points="40,6 37,13 43,13" fill="#475569"/>
          <polygon points="286,158 279,155 279,161" fill="#475569"/>
          {/* Axis labels */}
          <text x={12} y={84} fontSize={7} fill="#64748b" textAnchor="middle"
            transform="rotate(-90,12,84)">Temperature (°C)</text>
          <text x={162} y={183} fontSize={7} fill="#64748b" textAnchor="middle">Time (mins)</text>

          {/* Cooling curves */}
          {mats.map(m => {
            const pts = Array.from({ length: 21 }, (_, t) => {
              const T = t0 * Math.exp(-m.k * 0.05 * t)
              const x = 40 + t * 12.1
              const y = 158 - (T / 100) * 148
              return `${x},${y}`
            }).join(' ')
            return (
              <polyline key={m.label} points={pts} fill="none"
                stroke={m.c} strokeWidth={1.6} strokeLinejoin="round"/>
            )
          })}

          {/* Dots every 2 minutes on each curve */}
          {mats.map(m =>
            [0,2,4,6,8,10,12,14,16,18,20].map(t => {
              const T = t0 * Math.exp(-m.k * 0.05 * t)
              return (
                <circle key={`${m.label}-${t}`}
                  cx={40 + t * 12.1} cy={158 - (T / 100) * 148}
                  r={2} fill={m.c}/>
              )
            })
          )}

          {/* Current-time vertical cursor */}
          <line x1={40 + elapsed * 12.1} y1={8}
                x2={40 + elapsed * 12.1} y2={158}
            stroke="#ffffff" strokeWidth={0.9} strokeOpacity={0.25}
            style={{ transition: 'x1 0.7s ease, x2 0.7s ease' }}/>

          {/* Live dots at current elapsed */}
          {mats.map(m => {
            const T = t0 * Math.exp(-m.k * 0.05 * elapsed)
            return (
              <circle key={`live-${m.label}`}
                cx={40 + elapsed * 12.1} cy={158 - (T / 100) * 148}
                r={3.5} fill={m.c} stroke="#0b1525" strokeWidth={1}
                style={{ transition: 'cx 0.7s ease, cy 0.7s ease' }}/>
            )
          })}
        </svg>
      </div>
    </div>
  )
}

function SetupResistance() {
  const { data, addPoint, reset, canPlot, isFull } = useDataCollector(10)
  const [len, setLen] = useState(50)
  const R_wire = 0.225 * len            // wire resistance (Ω)
  const r_int  = 0.5                    // cell internal resistance (Ω)
  const I_val  = 1.5 / (R_wire + r_int) // ammeter reading (A)
  const V_val  = I_val * R_wire          // voltmeter reading (V)
  const R      = R_wire.toFixed(1)
  const I      = I_val.toFixed(3)
  const V      = V_val.toFixed(2)

  // Layout constants — circuit centred, room for labels on both sides
  const rulerX0  = 68   // ruler left edge  = 0 cm
  const rulerX1  = 225  // ruler right edge = 100 cm
  const rulerSpan = rulerX1 - rulerX0         // 157 px = 100 cm
  const rulerY   = 170  // top of ruler rect
  const topY     = 28   // top rail y
  const leftX    = 68   // left rail x (fixed clip at 0 cm)
  const rightX   = 225  // outer right corner x

  // Movable clip x position
  const clipX = rulerX0 + (len / 100) * rulerSpan   // 28 – 198

  // Voltmeter centre tracks midpoint of measured section
  const vx = (leftX + clipX) / 2
  const vy = 108   // voltmeter y

  // Wire colour based on resistance
  const wireColor = '#f59e0b'

  // Label tag helper (same as insulation)
  const Tag = ({ lx, ly, tx, ty, label }) => (
    <g>
      <line x1={lx} y1={ly} x2={tx} y2={ty} stroke="#475569" strokeWidth={0.8}/>
      <rect x={tx - 1} y={ty - 6} width={label.length * 5.1 + 6} height={10} rx={2}
        fill="#1e3a5f" stroke="#3b5a80" strokeWidth={0.6}/>
      <text x={tx + 2} y={ty + 2} fontSize={7} fill="#cbd5e1" fontWeight="600">{label}</text>
    </g>
  )

  const wire = (x1,y1,x2,y2) =>
    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#94a3b8" strokeWidth={1.2} strokeLinecap="round"/>

  return (
    <div className="flex flex-col gap-3">
      <svg viewBox="0 0 300 230" width="100%" style={{ display: 'block' }}>

        {/* ── Metre ruler (brown, 0–100 cm) ── */}
        <rect x={rulerX0} y={rulerY} width={rulerSpan} height={16} rx={2}
          fill="#c49050" stroke="#a07840" strokeWidth={1}/>
        {/* Ruler markings & labels */}
        {[0,10,20,30,40,50,60,70,80,90].map(v => {
          const rx = rulerX0 + (v / 100) * rulerSpan
          return (
            <g key={v}>
              <line x1={rx} y1={rulerY} x2={rx} y2={rulerY - 5} stroke="#5b3a0a" strokeWidth={0.8}/>
              <text x={rx + 2} y={rulerY + 11} fontSize={6.5} fill="#5b3a0a">{v}</text>
            </g>
          )
        })}

        {/* ── Thin resistance wire on ruler ── */}
        <line x1={rulerX0} y1={rulerY + 5} x2={rulerX1} y2={rulerY + 5}
          stroke={wireColor} strokeWidth={1.8}/>

        {/* ── Main circuit ── */}
        {/* Top horizontal rail (split by cell symbol) */}
        {wire(leftX, topY, 142, topY)}
        {wire(158, topY, rightX, topY)}
        {/* Left vertical rail (with ammeter) */}
        {wire(leftX, topY, leftX, 70)}
        {wire(leftX, 100, leftX, rulerY)}
        {/* Right outer vertical */}
        {wire(rightX, topY, rightX, vy)}
        {/* Right horizontal from outer corner to movable clip */}
        {wire(rightX, vy, clipX, vy)}
        {/* Right clip vertical drop */}
        {wire(clipX, vy, clipX, rulerY)}

        {/* ── Cell symbol (top centre, 1.5 V) ── */}
        <line x1={146} y1={topY - 10} x2={146} y2={topY + 10} stroke="#94a3b8" strokeWidth={3}/>
        <line x1={154} y1={topY - 5}  x2={154} y2={topY + 5}  stroke="#94a3b8" strokeWidth={1.2}/>
        <text x={138} y={topY - 6} fontSize={7} fill="#94a3b8">+</text>
        <text x={156} y={topY - 6} fontSize={7} fill="#94a3b8">-</text>

        {/* ── Ammeter (A) with live reading ── */}
        <circle cx={leftX} cy={85} r={15} fill="#0b1121" stroke="#10b981" strokeWidth={1.4}/>
        <text x={leftX} y={83} textAnchor="middle" fontSize={8} fontWeight="bold" fill="#10b981">A</text>
        <text x={leftX} y={93} textAnchor="middle" fontSize={7} fill="#6ee7b7">{I} A</text>

        {/* ── Voltmeter (V) with live reading – parallel across wire section ── */}
        {wire(leftX, vy, vx - 15, vy)}
        <circle cx={vx} cy={vy} r={15} fill="#0b1121" stroke="#f59e0b" strokeWidth={1.4}/>
        <text x={vx} y={vy - 2} textAnchor="middle" fontSize={8} fontWeight="bold" fill="#f59e0b">V</text>
        <text x={vx} y={vy + 8} textAnchor="middle" fontSize={7} fill="#fcd34d">{V} V</text>
        {wire(vx + 15, vy, clipX, vy)}

        {/* Junction dots */}
        <circle cx={leftX} cy={vy} r={2.5} fill="#94a3b8"/>
        <circle cx={clipX} cy={vy} r={2.5} fill="#94a3b8"/>

        {/* ── Crocodile clips ── */}
        {/* Left fixed clip (downward arrow at 0 cm) */}
        <polygon points={`${leftX},${rulerY} ${leftX-5},${rulerY-9} ${leftX+5},${rulerY-9}`}
          fill="#10b981"/>
        {/* Right movable clip */}
        <polygon points={`${clipX},${rulerY} ${clipX-5},${rulerY-9} ${clipX+5},${rulerY-9}`}
          fill="#6366f1"/>

        {/* ── Labels with connecting lines ── */}
        <Tag lx={138} ly={topY-2}    tx={148} ty={8}   label="1.5 V CELL"/>
        <Tag lx={leftX} ly={75}      tx={2}   ty={62}  label="AMMETER"/>
        <Tag lx={vx}    ly={vy-15}   tx={232} ty={92}  label="VOLTMETER"/>
        {/* Crocodile clips - two arrow lines, one shared label */}
        <Tag lx={leftX} ly={rulerY}  tx={2}   ty={155} label="CROCODILE CLIPS"/>
        <line x1={clipX} y1={rulerY} x2={2}   y2={155+4} stroke="#475569" strokeWidth={0.7}/>
        <Tag lx={130}   ly={rulerY+5}  tx={220} ty={172} label="Nichrome wire"/>
        <Tag lx={160}   ly={rulerY+16} tx={220} ty={188} label="Metre ruler"/>

      </svg>

      {/* ── Live meter readings ── */}
      <div className="grid grid-cols-3 gap-2 px-1">
        {/* Ammeter */}
        <div className="rounded-[10px] p-2 text-center"
          style={{ background: '#00251a', border: '1px solid #10b98150' }}>
          <div className="text-xs font-bold mb-0.5" style={{ color: '#10b981' }}>AMMETER</div>
          <div className="text-lg font-bold font-mono" style={{ color: '#6ee7b7' }}>{I}</div>
          <div className="text-xs" style={{ color: '#10b981' }}>A</div>
        </div>
        {/* Voltmeter */}
        <div className="rounded-[10px] p-2 text-center"
          style={{ background: '#251a00', border: '1px solid #f59e0b50' }}>
          <div className="text-xs font-bold mb-0.5" style={{ color: '#f59e0b' }}>VOLTMETER</div>
          <div className="text-lg font-bold font-mono" style={{ color: '#fcd34d' }}>{V}</div>
          <div className="text-xs" style={{ color: '#f59e0b' }}>V</div>
        </div>
        {/* Calculated R */}
        <div className="rounded-[10px] p-2 text-center"
          style={{ background: '#0f0a2a', border: '1px solid #6366f150' }}>
          <div className="text-xs font-bold mb-0.5" style={{ color: '#6366f1' }}>R = V/I</div>
          <div className="text-lg font-bold font-mono" style={{ color: '#a5b4fc' }}>{R}</div>
          <div className="text-xs" style={{ color: '#6366f1' }}>Ω</div>
        </div>
      </div>

      {/* ── Slider ── */}
      <div className="px-1">
        <div className="text-xs mb-1" style={{ color: '#a8b8cc' }}>
          Wire length: <strong style={{ color: '#f59e0b' }}>{len} cm</strong>
        </div>
        <input type="range" min={10} max={100} step={10} value={len}
          onChange={e => setLen(+e.target.value)} className="w-full accent-yellow-400"/>
        <div className="flex justify-between text-xs mt-0.5" style={{ color: '#475569' }}>
          <span>10 cm</span><span>100 cm</span>
        </div>
      </div>

      {/* ── Data Collection ── */}
      <div className="px-1 pt-1">
        <div className="flex items-center gap-2">
          <button
            onClick={() => addPoint({ x: len, y: parseFloat(R) })}
            disabled={isFull}
            className="flex-1 py-2 rounded-[10px] text-xs font-semibold"
            style={{
              background: 'rgba(99,102,241,0.15)',
              border: '0.75px solid rgba(99,102,241,0.4)',
              color: '#a5b4fc',
              opacity: isFull ? 0.4 : 1,
            }}>
            {`📊 Record: ${len} cm → ${R} Ω`}
          </button>
          {data.length > 0 && (
            <button onClick={reset}
              className="px-3 py-2 rounded-[10px] text-xs"
              style={{ background: '#1e293b', border: '0.75px solid #334155', color: '#94a3b8' }}>
              Clear
            </button>
          )}
        </div>

        {data.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {data.map((pt, i) => (
              <div key={i} className="px-2 py-0.5 rounded-full text-xs"
                style={{ background: '#6366f120', border: '0.75px solid #6366f140', color: '#a5b4fc' }}>
                {`${pt.x}cm→${pt.y}Ω`}
              </div>
            ))}
          </div>
        )}

        {canPlot && (
          <div className="mt-3">
            <ScatterGraph
              title="Your Data: R vs Length"
              xLabel="Length (cm)" yLabel="Resistance (Ω)"
              xMax={110}
              yMax={data.length > 0 ? Math.max(...data.map(d => d.y)) * 1.2 || 1 : 1}
              xTicks={[0,20,40,60,80,100]}
              yTicks={data.length > 0 ? [0,1,2,3,4].map(i => parseFloat((Math.max(...data.map(d => d.y)) * 1.2 * i / 4).toFixed(2))) : [0,1]}
              points={data}
              lobf={data.length >= 4 ? [data[0], data[data.length-1]] : null}
              lobfLabel="Line of best fit"
              color="#6366f1"
            />
          </div>
        )}
      </div>
    </div>
  )
}

function SetupIV() {
  const { data, addPoint, reset, canPlot, isFull } = useDataCollector(10)
  const [comp, setComp] = useState('resistor')
  const [volts, setVolts] = useState(3)

  const current = comp === 'resistor'
    ? (volts / 100).toFixed(4)
    : comp === 'lamp'
    ? (volts / (100 + volts * 8)).toFixed(4)
    : volts < 0.6 ? '≈0' : ((volts - 0.6) * 0.02).toFixed(4)

  const compLabels = { resistor: '100 Ω resistor', lamp: 'Filament lamp', diode: 'Diode + 100 Ω' }
  const compColor =  { resistor: '#6366f1',         lamp: '#f59e0b',        diode: '#10b981' }
  const c = compColor[comp]

  return (
    <div className="flex flex-col gap-3">
      {/* Component selector */}
      <div className="grid grid-cols-3 gap-1">
        {Object.entries(compLabels).map(([k, label]) => (
          <button key={k} onClick={() => setComp(k)}
            className="py-1.5 rounded-[8px] text-xs font-medium"
            style={{
              background: comp === k ? `${compColor[k]}20` : 'rgba(18,26,47,0.9)',
              border: `0.75px solid ${comp === k ? compColor[k] : '#1d293d'}`,
              color: comp === k ? compColor[k] : '#64748b',
            }}>
            {k.charAt(0).toUpperCase() + k.slice(1)}
          </button>
        ))}
      </div>

      <svg viewBox="0 0 280 165" width="100%" style={{ display: 'block' }}>
        {/* PSU */}
        <PSU x={8} y={68}/>
        <Lbl x={26} y={65} t="Variable" c="#a5b4fc" s={7}/>
        <Lbl x={26} y={58} t="PSU" c="#a5b4fc" s={7}/>

        {/* Variable resistor (rheostat) */}
        <rect x={75} y={68} width={36} height={18} rx={3} fill="#1e293b" stroke="#94a3b8" strokeWidth={1.2}/>
        <line x1={93} y1={64} x2={100} y2={75} stroke="#94a3b8" strokeWidth={1} markerEnd="url(#arr)"/>
        <Lbl x={93} y={60} t="Rheostat" c="#94a3b8" s={8}/>

        {/* Component: proper IEC symbol */}
        <g transform={`translate(173, 77)`}>
          {comp === 'resistor' && (
            <g>
              <rect x={-18} y={-7} width={36} height={14} fill="none" stroke={c} strokeWidth={1.5} />
            </g>
          )}
          {comp === 'lamp' && (
            <g>
              <circle cx={0} cy={0} r={11} fill="none" stroke={c} strokeWidth={1.5} />
              <line x1={-7} y1={-7} x2={7} y2={7} stroke={c} strokeWidth={1.5} strokeLinecap="round" />
              <line x1={7} y1={-7} x2={-7} y2={7} stroke={c} strokeWidth={1.5} strokeLinecap="round" />
            </g>
          )}
          {comp === 'diode' && (
            <g>
              <polygon points="-14,0 0,-10 0,10" fill="none" stroke={c} strokeWidth={1.5} strokeLinejoin="round" />
              <line x1={0} y1={-11} x2={0} y2={11} stroke={c} strokeWidth={2} strokeLinecap="round" />
            </g>
          )}
        </g>
        {/* Component label below */}
        <Lbl x={173} y={99} t={compLabels[comp]} c={c} s={7}/>

        {/* Ammeter */}
        <A cx={232} cy={77}/>

        {/* Voltmeter in parallel with component */}
        <V cx={173} cy={130}/>

        {/* Circuit wires - series loop */}
        <W x1={44} y1={77} x2={75} y2={77}/>
        <W x1={111} y1={77} x2={155} y2={77}/>
        <W x1={191} y1={77} x2={220} y2={77}/>
        <W x1={244} y1={77} x2={260} y2={77}/>
        <W x1={260} y1={77} x2={260} y2={108}/>
        <W x1={260} y1={108} x2={44} y2={108}/>
        <W x1={44} y1={108} x2={44} y2={86}/>

        {/* Voltmeter wires */}
        <W x1={173} y1={118} x2={173} y2={88}/>
        <W x1={161} y1={130} x2={100} y2={130}/>
        <W x1={100} y1={130} x2={100} y2={108}/>
        <W x1={185} y1={130} x2={220} y2={130}/>
        <W x1={220} y1={130} x2={220} y2={108}/>

      </svg>

      {/* ── Readout tiles ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
        {[
          { label: 'Ammeter', value: current === '≈0' ? '≈0' : parseFloat(current).toFixed(3), unit: 'A', accent: '#10b981', bg: '#00251a' },
          { label: 'Voltmeter', value: volts, unit: 'V', accent: '#f59e0b', bg: '#251a00' },
          { label: 'Component', value: comp.charAt(0).toUpperCase() + comp.slice(1), unit: '—', accent: c, bg: `${c}12` },
        ].map(({ label, value, unit, accent, bg }) => (
          <div key={label} style={{ background: bg, border: `1px solid ${accent}50`, borderRadius: 12, padding: '10px 0', textAlign: 'center' }}>
            <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 2, color: accent, textTransform: 'uppercase', marginBottom: 4 }}>{label}</div>
            <div style={{ fontFamily: 'monospace', fontSize: 16, fontWeight: 700, color: accent, lineHeight: 1 }}>{value}</div>
            <div style={{ fontSize: 9, color: accent, marginTop: 3 }}>{unit}</div>
          </div>
        ))}
      </div>

      <div className="px-1">
        <div className="text-xs mb-1" style={{ color: '#a8b8cc' }}>Voltage: {volts} V</div>
        <input type="range" min={-6} max={6} step={0.5} value={volts}
          onChange={e => setVolts(+e.target.value)} className="w-full accent-indigo-400"/>
        <div className="flex justify-between text-xs mt-0.5" style={{ color: '#475569' }}>
          <span>−6 V</span><span>+6 V</span>
        </div>
      </div>

      {/* ── Data Collection ── */}
      <div className="px-1 pt-1">
        <div className="flex items-center gap-2">
          <button
            onClick={() => addPoint({ x: volts, y: Math.round(parseFloat(current) * 1000) })}
            disabled={isFull}
            className="flex-1 py-2 rounded-[10px] text-xs font-semibold"
            style={{
              background: 'rgba(99,102,241,0.15)',
              border: '0.75px solid rgba(99,102,241,0.4)',
              color: '#a5b4fc',
              opacity: isFull ? 0.4 : 1,
            }}>
            {`📊 Record: ${volts} V → ${Math.round(parseFloat(current)*1000)} mA`}
          </button>
          {data.length > 0 && (
            <button onClick={reset}
              className="px-3 py-2 rounded-[10px] text-xs"
              style={{ background: '#1e293b', border: '0.75px solid #334155', color: '#94a3b8' }}>
              Clear
            </button>
          )}
        </div>

        {data.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {data.map((pt, i) => (
              <div key={i} className="px-2 py-0.5 rounded-full text-xs"
                style={{ background: '#6366f120', border: '0.75px solid #6366f140', color: '#a5b4fc' }}>
                {`${pt.x}V→${pt.y}mA`}
              </div>
            ))}
          </div>
        )}

        {canPlot && (
          <div className="mt-3">
            <ScatterGraph
              title="Your Data: I vs Voltage"
              xLabel="Voltage (V)" yLabel="Current (mA)"
              xMax={7}
              yMax={data.length > 0 ? Math.max(Math.max(...data.map(d => Math.abs(d.y))) * 1.2, 1) : 1}
              xTicks={[-6,-3,0,3,6]}
              yTicks={data.length > 0 ? [0,1,2,3,4].map(i => parseFloat((Math.max(Math.max(...data.map(d => Math.abs(d.y))) * 1.2, 1) * i / 4).toFixed(2))) : [0,1]}
              points={data}
              lobf={data.length >= 4 ? [data[0], data[data.length-1]] : null}
              lobfLabel="Line of best fit"
              color="#6366f1"
            />
          </div>
        )}
      </div>
    </div>
  )
}

function SetupDensity() {
  const { data, addPoint, reset, canPlot, isFull } = useDataCollector(10)
  const [obj, setObj] = useState('aluminium')
  const objs = {
    aluminium: { label: 'Aluminium', l: 5.0, w: 3.0, h: 2.0, density: 2.70, color: '#94a3b8' },
    copper:    { label: 'Copper',    l: 4.0, w: 2.5, h: 2.5, density: 8.96, color: '#f97316' },
    iron:      { label: 'Iron',      l: 4.5, w: 3.0, h: 2.0, density: 7.87, color: '#64748b' },
  }
  const o = objs[obj]
  const vol = (o.l * o.w * o.h).toFixed(1)
  const mass = (o.density * parseFloat(vol)).toFixed(0)

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-3 gap-1">
        {Object.entries(objs).map(([k, v]) => (
          <button key={k} onClick={() => setObj(k)}
            className="py-1.5 rounded-[8px] text-xs font-medium"
            style={{
              background: obj === k ? `${v.color}20` : 'rgba(18,26,47,0.9)',
              border: `0.75px solid ${obj === k ? v.color : '#1d293d'}`,
              color: obj === k ? v.color : '#64748b',
            }}>
            {v.label}
          </button>
        ))}
      </div>

      <svg viewBox="0 0 280 180" width="100%" style={{ display: 'block' }}>
        {/* Displacement / Eureka can */}
        <path d="M 40,50 L 40,150 L 140,150 L 140,50" fill="none" stroke="#3b82f6" strokeWidth={1.5}/>
        <line x1={38} y1={50} x2={142} y2={50} stroke="#3b82f6" strokeWidth={1.5}/>
        {/* Spout */}
        <path d="M 140,80 L 165,80 L 165,90 L 140,90" fill="none" stroke="#3b82f6" strokeWidth={1.5}/>
        <Lbl x={90} y={42} t="Eureka / displacement can" c="#60a5fa" s={8}/>

        {/* Water level */}
        <path d="M 41,85 L 41,149 L 139,149 L 139,85 Z" fill="#3b82f615" stroke="none"/>
        <line x1={41} y1={85} x2={139} y2={85} stroke="#3b82f670" strokeWidth={1} strokeDasharray="3 2"/>
        <Lbl x={90} y={125} t="Water" c="#3b82f6" s={8}/>

        {/* Object on string */}
        <line x1={90} y1={10} x2={90} y2={55} stroke="#94a3b8" strokeWidth={1} strokeDasharray="2 2"/>
        <rect x={70} y={55} width={40} height={30} rx={2} fill={o.color} fillOpacity={0.4} stroke={o.color} strokeWidth={1.5}/>
        <Lbl x={90} y={50} t={o.label} c={o.color} s={8}/>

        {/* Measuring cylinder catching overflow */}
        <path d="M 175,90 L 172,155 L 208,155 L 205,90" fill="none" stroke="#94a3b8" strokeWidth={1.5}/>
        <path d="M 174,120 L 172,155 L 208,155 L 206,120 Z" fill="#3b82f615"/>
        <line x1={174} y1={120} x2={206} y2={120} stroke="#3b82f650" strokeWidth={1}/>
        <Lbl x={190} y={168} t={`${vol} ml`} c="#7dd3fc" s={9}/>
        <Lbl x={190} y={85} t="Measuring" c="#94a3b8" s={8}/>
        <Lbl x={190} y={96} t="cylinder" c="#94a3b8" s={8}/>

        {/* Balance */}
        <rect x={5} y={50} width={45} height={25} rx={3} fill="#1e293b" stroke="#475569" strokeWidth={1}/>
        <Lbl x={28} y={67} t={`${mass}g`} c="#10b981" s={9}/>
        <Lbl x={28} y={46} t="Balance" c="#64748b" s={8}/>

      </svg>

      {/* ── Readout tiles ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
        {[
          { label: 'Mass', value: mass, unit: 'g', accent: '#f59e0b', bg: '#251a00' },
          { label: 'Volume', value: vol, unit: 'cm³', accent: '#06b6d4', bg: '#001a25' },
          { label: 'Density', value: o.density.toFixed(2), unit: 'g/cm³', accent: '#6366f1', bg: '#0f0a2a' },
        ].map(({ label, value, unit, accent, bg }) => (
          <div key={label} style={{ background: bg, border: `1px solid ${accent}50`, borderRadius: 12, padding: '10px 0', textAlign: 'center' }}>
            <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 2, color: accent, textTransform: 'uppercase', marginBottom: 4 }}>{label}</div>
            <div style={{ fontFamily: 'monospace', fontSize: 20, fontWeight: 700, color: accent, lineHeight: 1 }}>{value}</div>
            <div style={{ fontSize: 9, color: accent, marginTop: 3 }}>{unit}</div>
          </div>
        ))}
      </div>
      <p className="text-xs text-center" style={{ color: '#475569' }}>ρ = m ÷ V = {mass} ÷ {vol} = {o.density} g/cm³</p>

      {/* ── Data Collection ── */}
      <div className="px-1 pt-1">
        <div className="flex items-center gap-2">
          <button
            onClick={() => addPoint({ x: parseFloat(vol), y: parseFloat(mass) })}
            disabled={isFull}
            className="flex-1 py-2 rounded-[10px] text-xs font-semibold"
            style={{
              background: 'rgba(99,102,241,0.15)',
              border: '0.75px solid rgba(99,102,241,0.4)',
              color: '#a5b4fc',
              opacity: isFull ? 0.4 : 1,
            }}>
            {`📊 Record: ${o.label} — ${vol} cm³, ${mass} g`}
          </button>
          {data.length > 0 && (
            <button onClick={reset}
              className="px-3 py-2 rounded-[10px] text-xs"
              style={{ background: '#1e293b', border: '0.75px solid #334155', color: '#94a3b8' }}>
              Clear
            </button>
          )}
        </div>

        {data.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {data.map((pt, i) => (
              <div key={i} className="px-2 py-0.5 rounded-full text-xs"
                style={{ background: '#6366f120', border: '0.75px solid #6366f140', color: '#a5b4fc' }}>
                {`${pt.x}cm³→${pt.y}g`}
              </div>
            ))}
          </div>
        )}

        {canPlot && (
          <div className="mt-3">
            <ScatterGraph
              title="Your Data: Mass vs Volume"
              xLabel="Volume (cm³)" yLabel="Mass (g)"
              xMax={35}
              yMax={data.length > 0 ? Math.max(...data.map(d => d.y)) * 1.2 || 1 : 1}
              xTicks={[0,10,20,30]}
              yTicks={data.length > 0 ? [0,1,2,3,4].map(i => parseFloat((Math.max(...data.map(d => d.y)) * 1.2 * i / 4).toFixed(2))) : [0,1]}
              points={data}
              lobf={data.length >= 4 ? [data[0], data[data.length-1]] : null}
              lobfLabel="Line of best fit"
              color="#6366f1"
            />
          </div>
        )}
      </div>
    </div>
  )
}

function SetupLight() {
  const { data, addPoint, reset, canPlot, isFull } = useDataCollector(10)
  const [angle, setAngle] = useState(40)
  const n = 1.50
  const r = Math.round(Math.asin(Math.sin((angle * Math.PI) / 180) / n) * (180 / Math.PI))
  const cx = 140, cy = 95, blockH = 60, blockW = 130

  const incRad = (angle * Math.PI) / 180
  const refRad = (r * Math.PI) / 180

  return (
    <div className="flex flex-col gap-3">
      <svg viewBox="0 0 280 200" width="100%" style={{ display: 'block' }}>
        {/* Glass block */}
        <rect x={cx - blockW / 2} y={cy} width={blockW} height={blockH} rx={2}
          fill="rgba(148,163,184,0.12)" stroke="#94a3b8" strokeWidth={1.5}/>
        {/* Label below block, above formula box */}
        <Lbl x={cx} y={cy + blockH + 13} t="Glass block (n = 1.5)" c="#94a3b8" s={8}/>

        {/* Normal line */}
        <line x1={cx} y1={cy - 60} x2={cx} y2={cy + blockH + 50}
          stroke="#475569" strokeWidth={1} strokeDasharray="5 4"/>
        <Lbl x={cx + 6} y={cy - 45} t="Normal" c="#475569" s={8} a="start"/>

        {/* Incident ray */}
        <line
          x1={cx - Math.sin(incRad) * 75} y1={cy - Math.cos(incRad) * 75}
          x2={cx} y2={cy}
          stroke="#fde047" strokeWidth={2}/>
        <Lbl x={cx - Math.sin(incRad) * 80 - 4} y={cy - Math.cos(incRad) * 80}
          t="Incident ray" c="#fde047" s={8} a="end"/>

        {/* Reflected ray */}
        <line x1={cx} y1={cy}
          x2={cx + Math.sin(incRad) * 65} y2={cy - Math.cos(incRad) * 65}
          stroke="#fde04790" strokeWidth={1.5} strokeDasharray="4 3"/>
        <Lbl x={cx + Math.sin(incRad) * 70} y={cy - Math.cos(incRad) * 68}
          t="Reflected" c="#fde04780" s={8} a="start"/>

        {/* Refracted ray (inside block) */}
        <line x1={cx} y1={cy}
          x2={cx + Math.sin(refRad) * 55} y2={cy + Math.cos(refRad) * 55}
          stroke="#38bdf8" strokeWidth={2}/>

        {/* Exiting refracted ray */}
        <line
          x1={cx + Math.sin(refRad) * blockH / Math.cos(refRad)} y1={cy + blockH}
          x2={cx + Math.sin(refRad) * blockH / Math.cos(refRad) + Math.sin(incRad) * 55}
          y2={cy + blockH + Math.cos(incRad) * 55}
          stroke="#38bdf8" strokeWidth={2}/>

        {/* Angle arcs */}
        <path d={`M ${cx} ${cy - 25} A 25 25 0 0 0 ${cx - Math.sin(incRad) * 25} ${cy - Math.cos(incRad) * 25}`}
          fill="none" stroke="#fde047" strokeWidth={1}/>
        <Lbl x={cx - Math.sin(incRad) * 14 - 4} y={cy - 18} t={`${angle}°`} c="#fde047" s={9}/>

        <path d={`M ${cx} ${cy + 22} A 22 22 0 0 1 ${cx + Math.sin(refRad) * 22} ${cy + Math.cos(refRad) * 22}`}
          fill="none" stroke="#38bdf8" strokeWidth={1}/>
        <Lbl x={cx + 16} y={cy + 36} t={`${r}°`} c="#38bdf8" s={9}/>

        {/* Ray box */}
        <path d="M 30,40 L 50,55 L 50,75 L 30,90 Z" fill="#1e293b" stroke="#f59e0b" strokeWidth={1.5}/>
        <Lbl x={54} y={65} t="Ray box" c="#f59e0b" s={8} a="start"/>

      </svg>

      {/* ── Readout tiles ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
        {[
          { label: 'Angle i', value: angle, unit: '°', accent: '#f59e0b', bg: '#251a00' },
          { label: 'Angle r', value: r, unit: '°', accent: '#06b6d4', bg: '#001a25' },
          { label: 'n = sin i / sin r', value: (Math.sin(incRad)/Math.sin(refRad)).toFixed(2), unit: '(unitless)', accent: '#6366f1', bg: '#0f0a2a' },
        ].map(({ label, value, unit, accent, bg }) => (
          <div key={label} style={{ background: bg, border: `1px solid ${accent}50`, borderRadius: 12, padding: '10px 0', textAlign: 'center' }}>
            <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 2, color: accent, textTransform: 'uppercase', marginBottom: 4 }}>{label}</div>
            <div style={{ fontFamily: 'monospace', fontSize: 20, fontWeight: 700, color: accent, lineHeight: 1 }}>{value}</div>
            <div style={{ fontSize: 9, color: accent, marginTop: 3 }}>{unit}</div>
          </div>
        ))}
      </div>
      <p className="text-xs text-center" style={{ color: '#475569' }}>Angle of incidence = angle of reflection</p>

      <div className="px-1">
        <div className="text-xs mb-1" style={{ color: '#a8b8cc' }}>
          Angle of incidence: {angle}°
        </div>
        <input type="range" min={10} max={70} step={5} value={angle}
          onChange={e => setAngle(+e.target.value)} className="w-full accent-sky-400"/>
        <div className="flex justify-between text-xs mt-0.5" style={{ color: '#475569' }}>
          <span>10°</span><span>70°</span>
        </div>
      </div>

      {/* ── Data Collection ── */}
      <div className="px-1 pt-1">
        <div className="flex items-center gap-2">
          <button
            onClick={() => addPoint({ x: parseFloat(Math.sin(angle * Math.PI / 180).toFixed(3)), y: parseFloat(Math.sin(r * Math.PI / 180).toFixed(3)) })}
            disabled={isFull}
            className="flex-1 py-2 rounded-[10px] text-xs font-semibold"
            style={{
              background: 'rgba(99,102,241,0.15)',
              border: '0.75px solid rgba(99,102,241,0.4)',
              color: '#a5b4fc',
              opacity: isFull ? 0.4 : 1,
            }}>
            {`📊 Record: i=${angle}° → r=${r}°`}
          </button>
          {data.length > 0 && (
            <button onClick={reset}
              className="px-3 py-2 rounded-[10px] text-xs"
              style={{ background: '#1e293b', border: '0.75px solid #334155', color: '#94a3b8' }}>
              Clear
            </button>
          )}
        </div>

        {data.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {data.map((pt, i) => (
              <div key={i} className="px-2 py-0.5 rounded-full text-xs"
                style={{ background: '#6366f120', border: '0.75px solid #6366f140', color: '#a5b4fc' }}>
                {`${pt.x}→${pt.y}`}
              </div>
            ))}
          </div>
        )}

        {canPlot && (
          <div className="mt-3">
            <ScatterGraph
              title="Your Data: sin(r) vs sin(i)"
              xLabel="sin(i)" yLabel="sin(r)"
              xMax={1}
              yMax={0.8}
              xTicks={[0,0.2,0.4,0.6,0.8,1.0]}
              yTicks={data.length > 0 ? [0,1,2,3,4].map(i => parseFloat((0.8 * i / 4).toFixed(2))) : [0,0.2,0.4,0.6,0.8]}
              points={data}
              lobf={data.length >= 4 ? [data[0], data[data.length-1]] : null}
              lobfLabel="Line of best fit"
              color="#6366f1"
            />
          </div>
        )}
      </div>
    </div>
  )
}

function SetupSpring() {
  const { data, addPoint, reset, canPlot, isFull } = useDataCollector(10)
  const [force, setForce] = useState(3)
  const k = 5.5
  const elasticLimit = 7
  const beyondLimit = force > elasticLimit
  const ext = beyondLimit
    ? (elasticLimit / k + (force - elasticLimit) * 0.35).toFixed(1)
    : (force / k).toFixed(1)
  const springLen = 40 + parseFloat(ext) * 10

  return (
    <div className="flex flex-col gap-3">
      <svg viewBox="0 0 280 210" width="100%" style={{ display: 'block' }}>
        {/* Clamp stand base */}
        <rect x={60} y={190} width={80} height={12} rx={3} fill="#334155" stroke="#475569" strokeWidth={1.5}/>
        {/* Vertical rod */}
        <rect x={95} y={20} width={10} height={170} rx={2} fill="#475569"/>
        {/* Boss */}
        <rect x={80} y={28} width={40} height={14} rx={3} fill="#334155" stroke="#64748b" strokeWidth={1}/>
        {/* Horizontal bar */}
        <rect x={80} y={28} width={90} height={10} rx={3} fill="#334155" stroke="#64748b" strokeWidth={1}/>
        {/* Top clamp */}
        <rect x={148} y={22} width={30} height={14} rx={3} fill="#1e293b" stroke="#94a3b8" strokeWidth={1}/>
        {/* Spring attached to clamp */}
        <line x1={163} y1={36} x2={163} y2={45} stroke="#cbd5e1" strokeWidth={1.5}/>
        <Spring x={163} y={45} length={springLen} coils={8}/>
        {/* Weight */}
        <rect x={148} y={45 + springLen} width={30} height={14} rx={2}
          fill={beyondLimit ? '#ef444430' : '#1e3a5f'} stroke={beyondLimit ? '#ef4444' : '#3b82f6'} strokeWidth={1.5}/>
        <Lbl x={163} y={56 + springLen} t={`${force}N`} c={beyondLimit ? '#ef4444' : '#93c5fd'} s={9}/>

        {/* Metre ruler */}
        <rect x={200} y={45} width={10} height={150} rx={2} fill="#1e293b" stroke="#334155" strokeWidth={1}/>
        {[0,20,40,60,80,100,120,140].map((y, i) => (
          <g key={i}>
            <line x1={200} y1={45 + y} x2={i % 5 === 0 ? 195 : 197} y2={45 + y} stroke="#475569" strokeWidth={0.8}/>
            {i % 5 === 0 && <Lbl x={194} y={49 + y} t={`${i * 10}`} c="#475569" s={7} a="end"/>}
          </g>
        ))}
        <Lbl x={205} y={42} t="cm" c="#475569" s={7} a="start"/>

        {/* Pointer */}
        <line x1={163} y1={45 + springLen} x2={205} y2={45 + springLen} stroke="#6366f1" strokeWidth={1} strokeDasharray="3 2"/>
        <circle cx={205} cy={45 + springLen} r={3} fill="#6366f1"/>

        {/* Extension label — placed right of ruler to avoid tick-label clash */}
        <line x1={175} y1={45} x2={175} y2={45 + springLen} stroke="#10b981" strokeWidth={1} markerEnd="url(#ar)"/>
        <Lbl x={220} y={45 + springLen / 2} t={`e = ${ext} cm`} c="#10b981" s={9} a="start"/>

        {beyondLimit && (
          <text x={70} y={25} fontSize={9} fill="#ef4444">Beyond elastic limit</text>
        )}

        <Lbl x={163} y={18} t="Clamp stand" c="#64748b" s={8}/>
        <Lbl x={205} y={200} t="Ruler" c="#64748b" s={8} a="start"/>
      </svg>

      {/* ── Readout tiles ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
        {[
          { label: beyondLimit ? 'Force limit' : 'Force', value: force, unit: 'N', accent: beyondLimit ? '#ef4444' : '#3b82f6', bg: beyondLimit ? '#250505' : '#001025' },
          { label: 'Extension', value: ext, unit: 'cm', accent: '#10b981', bg: '#00251a' },
          { label: 'k = F / e', value: force > 0 && parseFloat(ext) > 0 ? (force / parseFloat(ext)).toFixed(1) : '—', unit: 'N/cm', accent: '#6366f1', bg: '#0f0a2a' },
        ].map(({ label, value, unit, accent, bg }) => (
          <div key={label} style={{ background: bg, border: `1px solid ${accent}50`, borderRadius: 12, padding: '10px 0', textAlign: 'center' }}>
            <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 2, color: accent, textTransform: 'uppercase', marginBottom: 4 }}>{label}</div>
            <div style={{ fontFamily: 'monospace', fontSize: 20, fontWeight: 700, color: accent, lineHeight: 1 }}>{value}</div>
            <div style={{ fontSize: 9, color: accent, marginTop: 3 }}>{unit}</div>
          </div>
        ))}
      </div>

      <div className="px-1">
        <div className="text-xs mb-1" style={{ color: beyondLimit ? '#ef4444' : '#a8b8cc' }}>
          Force: {force} N {beyondLimit ? '— beyond elastic limit (permanent deformation!)' : ''}
        </div>
        <input type="range" min={0} max={10} step={0.5} value={force}
          onChange={e => setForce(+e.target.value)}
          style={{ accentColor: beyondLimit ? '#ef4444' : '#10b981' }}
          className="w-full"/>
        <div className="flex justify-between text-xs mt-0.5" style={{ color: '#475569' }}>
          <span>0 N</span>
          <span style={{ color: '#ef444480' }}>↑ elastic limit: {elasticLimit}N</span>
          <span>10 N</span>
        </div>
      </div>

      {/* ── Data Collection ── */}
      <div className="px-1 pt-1">
        <div className="flex items-center gap-2">
          <button
            onClick={() => addPoint({ x: force, y: parseFloat(ext) })}
            disabled={isFull}
            className="flex-1 py-2 rounded-[10px] text-xs font-semibold"
            style={{
              background: 'rgba(99,102,241,0.15)',
              border: '0.75px solid rgba(99,102,241,0.4)',
              color: '#a5b4fc',
              opacity: isFull ? 0.4 : 1,
            }}>
            {`📊 Record: ${force} N → ${ext} cm`}
          </button>
          {data.length > 0 && (
            <button onClick={reset}
              className="px-3 py-2 rounded-[10px] text-xs"
              style={{ background: '#1e293b', border: '0.75px solid #334155', color: '#94a3b8' }}>
              Clear
            </button>
          )}
        </div>

        {data.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {data.map((pt, i) => (
              <div key={i} className="px-2 py-0.5 rounded-full text-xs"
                style={{ background: '#6366f120', border: '0.75px solid #6366f140', color: '#a5b4fc' }}>
                {`${pt.x}N→${pt.y}cm`}
              </div>
            ))}
          </div>
        )}

        {canPlot && (
          <div className="mt-3">
            <ScatterGraph
              title="Your Data: Extension vs Force"
              xLabel="Force (N)" yLabel="Extension (cm)"
              xMax={11}
              yMax={data.length > 0 ? Math.max(...data.map(d => d.y)) * 1.2 || 1 : 1}
              xTicks={[0,2,4,6,8,10]}
              yTicks={data.length > 0 ? [0,1,2,3,4].map(i => parseFloat((Math.max(...data.map(d => d.y)) * 1.2 * i / 4).toFixed(2))) : [0,1]}
              points={data}
              lobf={data.length >= 4 ? [data[0], data[data.length-1]] : null}
              lobfLabel="Line of best fit"
              color="#6366f1"
            />
          </div>
        )}
      </div>
    </div>
  )
}

function SetupAcceleration() {
  const { data, addPoint, reset, canPlot, isFull } = useDataCollector(10)
  const [force, setForce] = useState(0.4)
  const mass = 1.0
  const acc = (force / mass).toFixed(2)
  const gliderOffset = Math.min(140, parseFloat(acc) * 55)

  return (
    <div className="flex flex-col gap-3">
      <svg viewBox="0 0 280 170" width="100%" style={{ display: 'block' }}>
        {/* Runway (slightly tilted to compensate for friction) */}
        <rect x={15} y={98} width={230} height={10} rx={3} fill="#1e293b" stroke="#334155" strokeWidth={1.5}/>
        <Lbl x={130} y={122} t="Runway (tilted to compensate friction)" c="#64748b" s={7}/>

        {/* Dynamics trolley */}
        <motion.g animate={{ x: gliderOffset }} transition={{ duration: 0.35 }}>
          <rect x={25} y={80} width={55} height={18} rx={3} fill="#1e3a5f" stroke="#3b82f6" strokeWidth={1.5}/>
          <Lbl x={52} y={88} t="Trolley" c="#60a5fa" s={7}/>
          <Lbl x={52} y={96} t={`${mass} kg`} c="#93c5fd" s={7}/>
          {/* Interrupt card on top */}
          <rect x={33} y={74} width={35} height={6} rx={1} fill="#6366f1" fillOpacity={0.8}/>
          <Lbl x={50} y={71} t="interrupt card" c="#a5b4fc" s={6}/>
          {/* Wheels */}
          <circle cx={34} cy={98} r={4} fill="#334155" stroke="#475569" strokeWidth={1}/>
          <circle cx={68} cy={98} r={4} fill="#334155" stroke="#475569" strokeWidth={1}/>
        </motion.g>

        {/* Light gates */}
        <rect x={70} y={70} width={6} height={38} rx={1} fill="#10b981" fillOpacity={0.7}/>
        <Lbl x={73} y={65} t="LG1" c="#10b981" s={7}/>
        <rect x={160} y={70} width={6} height={38} rx={1} fill="#10b981" fillOpacity={0.7}/>
        <Lbl x={163} y={65} t="LG2" c="#10b981" s={7}/>

        {/* Pulley */}
        <circle cx={248} cy={97} r={10} fill="#1e293b" stroke="#475569" strokeWidth={1.5}/>
        {/* String */}
        <line x1={80} y1={88} x2={248} y2={88} stroke="#e2e8f020" strokeWidth={1} strokeDasharray="3 2"/>
        <line x1={248} y1={107} x2={248} y2={140} stroke="#e2e8f0" strokeWidth={1}/>

        {/* Hanging weights */}
        <rect x={236} y={140} width={24} height={16} rx={2} fill="#1e3a5f" stroke="#3b82f6" strokeWidth={1}/>
        <Lbl x={248} y={148} t={`${force} N`} c="#93c5fd" s={8}/>
        <Lbl x={248} y={168} t="Slotted" c="#64748b" s={7}/>
        <Lbl x={248} y={176} t="masses" c="#64748b" s={7}/>

        {/* Computer */}
        <rect x={5} y={130} width={55} height={32} rx={4} fill="#1e293b" stroke="#6366f1" strokeWidth={1}/>
        <rect x={9} y={133} width={47} height={20} rx={2} fill="#0b1121"/>
        <Lbl x={32} y={146} t={`a=${acc}`} c="#a5b4fc" s={9}/>
        <Lbl x={32} y={158} t="m/s²" c="#64748b" s={8}/>
        <Lbl x={32} y={128} t="Computer" c="#64748b" s={8}/>

        {/* Acceleration arrow */}
        <defs><marker id="ga" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#10b981"/>
        </marker></defs>
        <line x1={25} y1={55} x2={25 + Math.min(120, parseFloat(acc) * 80)} y2={55}
          stroke="#10b981" strokeWidth={2} markerEnd="url(#ga)"/>
        <Lbl x={85} y={50} t={`a = F/m = ${force}/${mass} = ${acc} m/s²`} c="#10b981" s={8}/>
      </svg>

      {/* ── Readout tiles ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
        {[
          { label: 'Force', value: force, unit: 'N', accent: '#10b981', bg: '#00251a' },
          { label: 'Mass', value: mass.toFixed(1), unit: 'kg', accent: '#64748b', bg: '#0f1a25' },
          { label: 'Acceleration', value: acc, unit: 'm/s²', accent: '#6366f1', bg: '#0f0a2a' },
        ].map(({ label, value, unit, accent, bg }) => (
          <div key={label} style={{ background: bg, border: `1px solid ${accent}50`, borderRadius: 12, padding: '10px 0', textAlign: 'center' }}>
            <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 2, color: accent, textTransform: 'uppercase', marginBottom: 4 }}>{label}</div>
            <div style={{ fontFamily: 'monospace', fontSize: 20, fontWeight: 700, color: accent, lineHeight: 1 }}>{value}</div>
            <div style={{ fontSize: 9, color: accent, marginTop: 3 }}>{unit}</div>
          </div>
        ))}
      </div>

      <div className="px-1">
        <div className="text-xs mb-1" style={{ color: '#a8b8cc' }}>Force (hanging weights): {force} N</div>
        <input type="range" min={0.2} max={1.0} step={0.2} value={force}
          onChange={e => setForce(+e.target.value)} className="w-full accent-emerald-400"/>
        <div className="flex justify-between text-xs mt-0.5" style={{ color: '#475569' }}>
          <span>0.2 N</span><span>1.0 N</span>
        </div>
      </div>

      {/* ── Data Collection ── */}
      <div className="px-1 pt-1">
        <div className="flex items-center gap-2">
          <button
            onClick={() => addPoint({ x: force, y: parseFloat(acc) })}
            disabled={isFull}
            className="flex-1 py-2 rounded-[10px] text-xs font-semibold"
            style={{
              background: 'rgba(99,102,241,0.15)',
              border: '0.75px solid rgba(99,102,241,0.4)',
              color: '#a5b4fc',
              opacity: isFull ? 0.4 : 1,
            }}>
            {`📊 Record: ${force} N → ${acc} m/s²`}
          </button>
          {data.length > 0 && (
            <button onClick={reset}
              className="px-3 py-2 rounded-[10px] text-xs"
              style={{ background: '#1e293b', border: '0.75px solid #334155', color: '#94a3b8' }}>
              Clear
            </button>
          )}
        </div>

        {data.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {data.map((pt, i) => (
              <div key={i} className="px-2 py-0.5 rounded-full text-xs"
                style={{ background: '#6366f120', border: '0.75px solid #6366f140', color: '#a5b4fc' }}>
                {`${pt.x}N→${pt.y}m/s²`}
              </div>
            ))}
          </div>
        )}

        {canPlot && (
          <div className="mt-3">
            <ScatterGraph
              title="Your Data: a vs Force"
              xLabel="Force (N)" yLabel="Acceleration (m/s²)"
              xMax={1.2}
              yMax={data.length > 0 ? Math.max(...data.map(d => d.y)) * 1.2 || 1 : 1}
              xTicks={[0,0.2,0.4,0.6,0.8,1.0,1.2]}
              yTicks={data.length > 0 ? [0,1,2,3,4].map(i => parseFloat((Math.max(...data.map(d => d.y)) * 1.2 * i / 4).toFixed(2))) : [0,1]}
              points={data}
              lobf={data.length >= 4 ? [data[0], data[data.length-1]] : null}
              lobfLabel="Line of best fit"
              color="#6366f1"
            />
          </div>
        )}
      </div>
    </div>
  )
}

function SetupWaves() {
  const { data, addPoint, reset, canPlot, isFull } = useDataCollector(10)
  const [freq, setFreq] = useState(5)
  const speed = 0.28
  const lambda = (speed / freq).toFixed(3)
  // Scale: tank is 0.3 m wide = 210 px → 700 px/m. Caps at 200 px so arrow stays inside viewBox.
  const wl = Math.min(200, Math.max(10, Math.round(parseFloat(lambda) * 700)))

  return (
    <div className="flex flex-col gap-3">
      <svg viewBox="0 0 280 185" width="100%" style={{ display: 'block' }}>
        <defs>
          <marker id="ar" markerWidth="7" markerHeight="6" refX="7" refY="3" orient="auto">
            <path d="M0,0 L7,3 L0,6 Z" fill="#6366f1"/>
          </marker>
          <marker id="al" markerWidth="7" markerHeight="6" refX="0" refY="3" orient="auto-start-reverse">
            <path d="M0,0 L7,3 L0,6 Z" fill="#6366f1"/>
          </marker>
        </defs>
        {/* Ripple tank outline */}
        <rect x={15} y={55} width={210} height={100} rx={4}
          fill="rgba(56,189,248,0.04)" stroke="#3b82f680" strokeWidth={1.5}/>
        <Lbl x={120} y={170} t="Ripple tank (5 mm water depth)" c="#3b82f6" s={8}/>

        {/* Water waves */}
        {Array.from({ length: Math.ceil(210 / wl) + 1 }, (_, i) => (
          <ellipse key={i} cx={15 + i * wl} cy={105} rx={wl * 0.45} ry={35}
            fill="none" stroke="#38bdf8" strokeWidth={1.2} opacity={0.7}/>
        ))}

        {/* Dipper rod at top */}
        <rect x={108} y={48} width={24} height={10} rx={2} fill="#f59e0b" fillOpacity={0.7}/>
        <line x1={120} y1={55} x2={120} y2={70} stroke="#f59e0b" strokeWidth={1.5}/>
        <Lbl x={152} y={58} t="Vibrating dipper" c="#f59e0b" s={8} a="start"/>

        {/* Motor */}
        <circle cx={120} cy={38} r={12} fill="#1e293b" stroke="#f59e0b" strokeWidth={1.5}/>
        <Lbl x={120} y={42} t="M" c="#fbbf24" s={10}/>
        <Lbl x={140} y={36} t="Motor" c="#64748b" s={8} a="start"/>

        {/* Lamp above */}
        <circle cx={50} cy={25} r={8} fill="#fde04730" stroke="#fde047" strokeWidth={1.2}/>
        {/* Lamp filament cross */}
        <line x1={46} y1={21} x2={54} y2={29} stroke="#fde047" strokeWidth={1.2} strokeLinecap="round"/>
        <line x1={54} y1={21} x2={46} y2={29} stroke="#fde047" strokeWidth={1.2} strokeLinecap="round"/>
        {/* Ray spikes */}
        {[0,45,90,135,180,225,270,315].map((deg, i) => {
          const rad = deg * Math.PI / 180
          return <line key={i} x1={50 + Math.cos(rad)*9} y1={25 + Math.sin(rad)*9}
                   x2={50 + Math.cos(rad)*13} y2={25 + Math.sin(rad)*13}
                   stroke="#fde04790" strokeWidth={0.8}/>
        })}
        <Lbl x={50} y={12} t="Lamp" c="#64748b" s={8}/>

        {/* White card below (projection) */}
        <rect x={15} y={158} width={210} height={18} rx={2}
          fill="rgba(248,250,252,0.07)" stroke="#f8fafc40" strokeWidth={1}/>
        <Lbl x={120} y={172} t="White card (shadows show wave pattern)" c="#94a3b8" s={7}/>

        {/* Wavelength arrow */}
        <line x1={15} y1={145} x2={15 + wl} y2={145} stroke="#6366f1" strokeWidth={1.2}
          markerEnd="url(#ar)" markerStart="url(#al)"/>
        <Lbl x={15 + wl / 2} y={155} t={`λ = ${lambda} m`} c="#a5b4fc" s={9}/>

        <Lbl x={240} y={80} t={`f = ${freq} Hz`} c="#94a3b8" s={9}/>
        <Lbl x={240} y={94} t={`v = ${speed} m/s`} c="#94a3b8" s={9}/>
        <Lbl x={240} y={108} t={`λ = v/f`} c="#6366f1" s={9}/>
      </svg>

      {/* ── Readout tiles ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
        {[
          { label: 'Frequency', value: freq, unit: 'Hz', accent: '#6366f1', bg: '#0f0a2a' },
          { label: 'Wavelength', value: lambda, unit: 'm', accent: '#06b6d4', bg: '#001a25' },
          { label: 'Wave speed', value: speed.toFixed(2), unit: 'm/s', accent: '#10b981', bg: '#00251a' },
        ].map(({ label, value, unit, accent, bg }) => (
          <div key={label} style={{ background: bg, border: `1px solid ${accent}50`, borderRadius: 12, padding: '10px 0', textAlign: 'center' }}>
            <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 2, color: accent, textTransform: 'uppercase', marginBottom: 4 }}>{label}</div>
            <div style={{ fontFamily: 'monospace', fontSize: 20, fontWeight: 700, color: accent, lineHeight: 1 }}>{value}</div>
            <div style={{ fontSize: 9, color: accent, marginTop: 3 }}>{unit}</div>
          </div>
        ))}
      </div>

      <div className="px-1">
        <div className="text-xs mb-1" style={{ color: '#a8b8cc' }}>
          Frequency: {freq} Hz
        </div>
        <input type="range" min={1} max={14} step={1} value={freq}
          onChange={e => setFreq(+e.target.value)} className="w-full accent-sky-400"/>
        <div className="flex justify-between text-xs mt-0.5" style={{ color: '#475569' }}>
          <span>1 Hz</span><span>14 Hz</span>
        </div>
      </div>

      {/* ── Data Collection ── */}
      <div className="px-1 pt-1">
        <div className="flex items-center gap-2">
          <button
            onClick={() => addPoint({ x: parseFloat(freq), y: parseFloat((parseFloat(lambda) * 100).toFixed(1)) })}
            disabled={isFull}
            className="flex-1 py-2 rounded-[10px] text-xs font-semibold"
            style={{
              background: 'rgba(99,102,241,0.15)',
              border: '0.75px solid rgba(99,102,241,0.4)',
              color: '#a5b4fc',
              opacity: isFull ? 0.4 : 1,
            }}>
            {`📊 Record: ${freq} Hz → λ=${(parseFloat(lambda)*100).toFixed(0)} cm`}
          </button>
          {data.length > 0 && (
            <button onClick={reset}
              className="px-3 py-2 rounded-[10px] text-xs"
              style={{ background: '#1e293b', border: '0.75px solid #334155', color: '#94a3b8' }}>
              Clear
            </button>
          )}
        </div>

        {data.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {data.map((pt, i) => (
              <div key={i} className="px-2 py-0.5 rounded-full text-xs"
                style={{ background: '#6366f120', border: '0.75px solid #6366f140', color: '#a5b4fc' }}>
                {`${pt.x}Hz→${pt.y}cm`}
              </div>
            ))}
          </div>
        )}

        {canPlot && (
          <div className="mt-3">
            <ScatterGraph
              title="Your Data: λ vs Frequency"
              xLabel="Frequency (Hz)" yLabel="λ (cm)"
              xMax={15}
              yMax={data.length > 0 ? Math.max(...data.map(d => d.y)) * 1.2 || 1 : 1}
              xTicks={[0,3,6,9,12,15]}
              yTicks={data.length > 0 ? [0,1,2,3,4].map(i => parseFloat((Math.max(...data.map(d => d.y)) * 1.2 * i / 4).toFixed(2))) : [0,1]}
              points={data}
              lobf={data.length >= 4 ? [data[0], data[data.length-1]] : null}
              lobfLabel="Line of best fit"
              color="#6366f1"
            />
          </div>
        )}
      </div>
    </div>
  )
}

function SetupRadiation() {
  const [surface, setSurface] = useState('matt_black')
  const surfaces = {
    matt_black:    { label: 'Matt black',   value: 87, color: '#1e293b', stroke: '#e2e8f0', emission: 'Highest' },
    matt_white:    { label: 'Matt white',   value: 72, color: '#f1f5f9', stroke: '#94a3b8', emission: 'High' },
    shiny_silver:  { label: 'Shiny silver', value: 41, color: '#94a3b8', stroke: '#60a5fa', emission: 'Lowest' },
    gloss_black:   { label: 'Gloss black',  value: 60, color: '#334155', stroke: '#818cf8', emission: 'Medium' },
  }
  const s = surfaces[surface]
  const barW = (s.value / 100) * 160

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-1">
        {Object.entries(surfaces).map(([k, v]) => (
          <button key={k} onClick={() => setSurface(k)}
            className="py-1.5 rounded-[8px] text-xs font-medium"
            style={{
              background: surface === k ? `${v.stroke}20` : 'rgba(18,26,47,0.9)',
              border: `0.75px solid ${surface === k ? v.stroke : '#1d293d'}`,
              color: surface === k ? v.stroke : '#64748b',
            }}>
            {v.label}
          </button>
        ))}
      </div>

      <svg viewBox="0 0 280 185" width="100%" style={{ display: 'block' }}>
        {/* Leslie cube - 3D box look */}
        {/* Front face */}
        <rect x={80} y={60} width={80} height={80} rx={2}
          fill={s.color} fillOpacity={0.9} stroke={s.stroke} strokeWidth={2}/>
        <Lbl x={120} y={105} t={s.label} c={s.color === '#f1f5f9' ? '#1e293b' : '#f8fafc'} s={8}/>
        {/* Top face */}
        <path d="M 80,60 L 105,38 L 185,38 L 160,60 Z"
          fill={s.color} fillOpacity={0.6} stroke={s.stroke} strokeWidth={1.2}/>
        {/* Right face (silver — other surfaces) */}
        <path d="M 160,60 L 185,38 L 185,118 L 160,140 Z"
          fill="#94a3b840" stroke="#94a3b8" strokeWidth={1.2}/>
        <Lbl x={175} y={90} t="other" c="#64748b" s={7}/>
        <Lbl x={175} y={100} t="faces" c="#64748b" s={7}/>

        {/* Water inside label */}
        <Lbl x={120} y={90} t="Hot" c={s.color === '#f1f5f9' ? '#1e293b' : '#7dd3fc'} s={8}/>
        <Lbl x={120} y={100} t="water" c={s.color === '#f1f5f9' ? '#1e293b' : '#7dd3fc'} s={8}/>

        {/* IR detector / thermometer */}
        <rect x={16} y={85} width={40} height={30} rx={4} fill="#1e293b" stroke="#10b981" strokeWidth={1.5}/>
        <Lbl x={36} y={101} t={`${s.value}`} c="#10b981" s={11}/>
        <Lbl x={36} y={111} t="mV" c="#6ee7b7" s={7}/>
        <Lbl x={36} y={75} t="IR detector" c="#10b981" s={8}/>

        {/* Ruler showing distance */}
        <rect x={56} y={98} width={24} height={6} rx={1} fill="#1e293b" stroke="#475569" strokeWidth={1}/>
        <Lbl x={68} y={95} t="10 cm" c="#64748b" s={7}/>

        {/* IR rays */}
        {[90, 100, 110].map((y, i) => (
          <line key={i} x1={80} y1={y} x2={56} y2={100 + (i - 1) * 4}
            stroke={`${s.stroke}80`} strokeWidth={1} strokeDasharray="3 2"/>
        ))}

        {/* Bar chart for comparison */}
        {Object.entries(surfaces).map(([k, v], i) => {
          const bw = (v.value / 100) * 100
          return (
            <g key={k}>
              <rect x={168} y={148 - i * 22} width={bw} height={14} rx={2}
                fill={v.stroke} fillOpacity={surface === k ? 0.7 : 0.2}/>
              <Lbl x={166} y={158 - i * 22} t={v.label} c={v.stroke} s={7} a="end"/>
              <Lbl x={170 + bw} y={158 - i * 22} t={`${v.value}`} c={v.stroke} s={7} a="start"/>
            </g>
          )
        })}
        <Lbl x={218} y={168} t="Relative IR emission" c="#64748b" s={8}/>
      </svg>

      {/* ── Readout tiles ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
        {[
          { label: 'Surface', value: s.label.replace(' ', '\u00A0'), unit: s.emission, accent: s.stroke, bg: `${s.stroke}12` },
          { label: 'IR Output', value: s.value, unit: 'mV', accent: '#10b981', bg: '#00251a' },
          { label: 'vs. Matt Black', value: Math.round(s.value / 87 * 100), unit: '%', accent: '#f59e0b', bg: '#251a00' },
        ].map(({ label, value, unit, accent, bg }) => (
          <div key={label} style={{ background: bg, border: `1px solid ${accent}50`, borderRadius: 12, padding: '10px 0', textAlign: 'center' }}>
            <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 2, color: accent, textTransform: 'uppercase', marginBottom: 4 }}>{label}</div>
            <div style={{ fontFamily: 'monospace', fontSize: 18, fontWeight: 700, color: accent, lineHeight: 1 }}>{value}</div>
            <div style={{ fontSize: 9, color: accent, marginTop: 3 }}>{unit}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── External simulation links ────────────────────────────────────────────────
const EXTERNAL_SIMS = {
  shc: [
    { name: 'PhET: Energy Forms and Changes', url: 'https://phet.colorado.edu/en/simulations/energy-forms-and-changes', desc: 'Watch energy transfer between objects — see how heating a metal block changes its thermal energy store.', free: true },
  ],
  insulation: [
    { name: 'PhET: Energy Forms and Changes', url: 'https://phet.colorado.edu/en/simulations/energy-forms-and-changes', desc: 'Explore how insulating materials slow energy transfer from hot to cold objects.', free: true },
  ],
  resistance: [
    { name: 'PhET: Resistance in a Wire', url: 'https://phet.colorado.edu/en/simulations/resistance-in-a-wire', desc: 'Change the length, area and resistivity of a wire — watch resistance update live. Perfect for RP3.', free: true },
    { name: 'WithDiode: 3D Circuit Builder', url: 'https://www.withdiode.com/', desc: 'Build your own circuit in 3D — add resistors, measure voltage and current. Free browser tool.', free: true },
  ],
  iv_characteristics: [
    { name: 'PhET: Circuit Construction Kit DC', url: 'https://phet.colorado.edu/en/simulations/circuit-construction-kit-dc', desc: 'Build circuits with resistors, bulbs and switches. Measure I-V characteristics with virtual meters.', free: true },
    { name: 'WithDiode: 3D Circuit Builder', url: 'https://www.withdiode.com/', desc: 'Drag-and-drop resistors, LEDs and diodes in 3D. See current flow and measure I-V characteristics.', free: true },
  ],
  density: [
    { name: 'PhET: Density', url: 'https://phet.colorado.edu/en/simulations/density', desc: 'Compare densities of different objects — see which float or sink. Measure mass and volume interactively.', free: true },
  ],
  latent_heat: [
    { name: "PhET: States of Matter", url: 'https://phet.colorado.edu/en/simulations/states-of-matter', desc: 'Watch particles change state as you add energy. See why temperature stays constant during melting.', free: true },
  ],
  spring: [
    { name: "PhET: Hooke's Law", url: 'https://phet.colorado.edu/en/simulations/hookes-law', desc: "Apply forces to springs — see extension change in real time. Explore the linear region and spring constant.", free: true },
  ],
  acceleration: [
    { name: 'PhET: Forces and Motion: Basics', url: 'https://phet.colorado.edu/en/simulations/forces-and-motion-basics', desc: 'Push objects with different forces — see acceleration change. Explore F=ma with friction controls.', free: true },
  ],
  waves: [
    { name: 'PhET: Wave on a String', url: 'https://phet.colorado.edu/en/simulations/wave-on-a-string', desc: 'Generate transverse waves — change frequency, amplitude and damping. Measure wavelength and speed.', free: true },
  ],
  light: [
    { name: 'PhET: Bending Light', url: 'https://phet.colorado.edu/en/simulations/bending-light', desc: 'Shine light through glass blocks — see refraction in real time. Measure angles and calculate refractive index.', free: true },
  ],
  radiation: [
    { name: 'PhET: Blackbody Spectrum', url: 'https://phet.colorado.edu/en/simulations/blackbody-spectrum', desc: 'See how surface temperature affects infrared radiation emission. Compare black body curves.', free: true },
  ],
}

const DIAGRAMS = {
  shc:              SetupSHC,
  insulation:       SetupInsulation,
  resistance:       SetupResistance,
  iv_characteristics: SetupIV,
  density:          SetupDensity,
  light:            SetupLight,
  spring:           SetupSpring,
  acceleration:     SetupAcceleration,
  waves:            SetupWaves,
  radiation:        SetupRadiation,
}

// ─── Tab panels ───────────────────────────────────────────────────────────────

function TabOverview({ p, color }) {
  return (
    <div className="flex flex-col gap-4">
      {/* Hazard banner — shown on overview for ADHD/SEN students */}
      {p.hazards && p.hazards.length > 0 && (
        <div className="mb-4 px-4 py-3 rounded-[14px]" style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.3)' }}>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.14em]" style={{ color: '#fbbf24' }}>Risk</span>
            <span className="text-xs font-bold uppercase tracking-wide" style={{ color: '#ef4444' }}>Safety First</span>
          </div>
          <div className="flex flex-col gap-1">
            {(Array.isArray(p.hazards) ? p.hazards : []).map((h, i) => (
              <p key={i} className="text-xs leading-relaxed" style={{ color: '#fca5a5' }}>
                • {typeof h === 'string' ? h : `${h.hazard} — ${h.precaution}`}
              </p>
            ))}
          </div>
        </div>
      )}
      <div className="rounded-[16px] p-4" style={{ background: `${color}10`, border: `0.75px solid ${color}40` }}>
        <div className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color }}>Aim</div>
        <p className="text-sm leading-relaxed" style={{ color: '#cad5e2' }}>{p.aim}</p>
      </div>
      <div>
        <div className="px-3 py-1 rounded-full text-xs font-medium inline-flex"
          style={{ background: `${color}15`, border: `0.75px solid ${color}40`, color }}>
          Spec Ref: {p.specRef}
        </div>
      </div>
      <div>
        <div className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: '#a8b8cc' }}>Equipment</div>
        <div className="flex flex-wrap gap-2">
          {p.equipment.map((eq, i) => (
            <div key={i} className="px-3 py-1.5 rounded-[10px] text-xs"
              style={{ background: 'rgba(18,26,47,0.9)', border: '0.75px solid #1d293d', color: '#cad5e2' }}>
              {eq}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function TabVariables({ p, color }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="rounded-[16px] p-4" style={{ background: 'rgba(59,130,246,0.1)', border: '0.75px solid rgba(59,130,246,0.4)' }}>
        <div className="flex items-center gap-2 mb-2">
          <Sliders size={14} color="#60a5fa"/>
          <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#60a5fa' }}>Independent Variable</span>
        </div>
        <p className="text-sm" style={{ color: '#cad5e2' }}>{p.variables.independent}</p>
      </div>
      <div className="rounded-[16px] p-4" style={{ background: 'rgba(16,185,129,0.1)', border: '0.75px solid rgba(16,185,129,0.4)' }}>
        <div className="flex items-center gap-2 mb-2">
          <ChartBar size={14} color="#34d399"/>
          <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#34d399' }}>Dependent Variable</span>
        </div>
        <p className="text-sm" style={{ color: '#cad5e2' }}>{p.variables.dependent}</p>
      </div>
      <div className="rounded-[16px] p-4" style={{ background: 'rgba(245,158,11,0.1)', border: '0.75px solid rgba(245,158,11,0.4)' }}>
        <div className="flex items-center gap-2 mb-3">
          <CheckCircle size={14} color="#fbbf24"/>
          <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#fbbf24' }}>Control Variables</span>
        </div>
        <div className="flex flex-col gap-2">
          {p.variables.control.map((cv, i) => (
            <div key={i} className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: '#fbbf24' }}/>
              <span className="text-sm" style={{ color: '#cad5e2' }}>{cv}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function TabSetup({ p, color }) {
  const Diagram = DIAGRAMS[p.id]
  return (
    <div className="rounded-[16px] overflow-hidden" style={{ background: '#121a2f', border: `0.75px solid ${color}30` }}>
      <div className="px-4 py-2 text-xs font-semibold uppercase tracking-wide"
        style={{ background: `${color}10`, color, borderBottom: `0.75px solid ${color}20` }}>
        Lab setup
      </div>
      <div className="p-3">
        {Diagram ? <Diagram/> : null}
      </div>
    </div>
  )
}

// Add RP numbers here as infographic images are generated
const INFOGRAPHIC_READY = new Set(['RP1', 'RP2'])

function TabMethod({ p, color }) {
  const showInfographic = INFOGRAPHIC_READY.has(p.number)

  if (showInfographic) {
    return (
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <img
          src={`/practicals/${p.number}.webp`}
          alt={`${p.title} — method infographic`}
          loading="lazy"
          decoding="async"
          style={{ width: '100%', borderRadius: 16, display: 'block' }}
        />
      </motion.div>
    )
  }

  return (
    <div className="flex flex-col gap-2">
      {p.method.map((step, i) => (
        <motion.div key={i} className="flex items-start gap-3 rounded-[12px] p-3"
          style={{ background: 'rgba(18,26,47,0.9)', border: '0.75px solid #1d293d' }}
          initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.04 }}>
          <div className="w-6 h-6 rounded-full shrink-0 flex items-center justify-center text-xs font-bold"
            style={{ background: `${color}20`, border: `0.75px solid ${color}60`, color }}>
            {i + 1}
          </div>
          <p className="text-sm leading-relaxed flex-1" style={{ color: '#cad5e2' }}>{step}</p>
        </motion.div>
      ))}
    </div>
  )
}

function TabResults({ p, color }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs"
        style={{ background: `${color}15`, border: `0.75px solid ${color}40`, color }}>
        <CheckCircle size={10}/> Sample data (auto-filled)
      </div>

      <div className="rounded-[16px] overflow-hidden" style={{ border: '0.75px solid #1d293d' }}>
        {/* horizontal scroll hint */}
        <div className="text-xs px-3 py-1.5 text-right" style={{ color: '#475569', borderBottom: '0.75px solid #1d293d20' }}>
          ← scroll →
        </div>
        <div className="overflow-x-auto" style={{ WebkitOverflowScrolling: 'touch' }}>
          <table style={{ width: 'max-content', minWidth: '100%', borderCollapse: 'collapse', fontSize: 11 }}>
            <thead>
              <tr style={{ background: `${color}20` }}>
                {p.resultsTable.headers.map((h, i) => (
                  <th key={i} className="px-3 py-2 text-left font-semibold whitespace-nowrap"
                    style={{ color, borderBottom: `0.75px solid ${color}40` }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {p.resultsTable.sampleData.map((row, i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? 'rgba(18,26,47,0.9)' : 'rgba(11,17,33,0.9)' }}>
                  {row.map((cell, j) => (
                    <td key={j} className="px-3 py-2 whitespace-nowrap"
                      style={{ color: '#cad5e2', borderBottom: '0.75px solid #1d293d20' }}>
                      {typeof cell === 'number' ? cell.toLocaleString() : cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// ─── Reusable scatter graph ──────────────────────────────────────────────────
function ScatterGraph({ title, xLabel, yLabel, xTicks, yTicks, xMax, yMax, points, lobf, lobfLabel, gradient, color, curved }) {
  const gL = 42, gR = 268, gT = 12, gB = 170
  const gW = gR - gL, gH = gB - gT
  const px = v => gL + (v / xMax) * gW
  const py = v => gB - (v / yMax) * gH
  return (
    <div className="rounded-[16px] p-3" style={{ background: 'rgba(18,26,47,0.9)', border: `0.75px solid ${color}40` }}>
      <div className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color }}>{title}</div>
      <svg viewBox="0 0 310 200" width="100%" style={{ display: 'block' }}>
        {/* Grid */}
        {yTicks.map(v => (
          <g key={v}>
            <line x1={gL} y1={py(v)} x2={gR} y2={py(v)} stroke="#1d293d" strokeWidth={0.7}/>
            <text x={gL - 4} y={py(v) + 3.5} fontSize={6.5} fill="#475569" textAnchor="end">{v}</text>
          </g>
        ))}
        {xTicks.map(v => (
          <g key={v}>
            <line x1={px(v)} y1={gT} x2={px(v)} y2={gB} stroke="#1d293d" strokeWidth={0.7} strokeDasharray="3,2"/>
            <text x={px(v)} y={gB + 12} fontSize={6.5} fill="#475569" textAnchor="middle">{v}</text>
          </g>
        ))}
        {/* Axes */}
        <line x1={gL} y1={gT} x2={gL} y2={gB + 1} stroke="#475569" strokeWidth={1.2}/>
        <line x1={gL - 1} y1={gB} x2={gR} y2={gB} stroke="#475569" strokeWidth={1.2}/>
        <polygon points={`${gL},${gT-2} ${gL-3},${gT+6} ${gL+3},${gT+6}`} fill="#475569"/>
        <polygon points={`${gR+2},${gB} ${gR-6},${gB-3} ${gR-6},${gB+3}`} fill="#475569"/>
        {/* Axis labels */}
        <text x={13} y={gB - gH/2} fontSize={7} fill="#64748b" textAnchor="middle"
          transform={`rotate(-90,13,${gB - gH/2})`}>{yLabel}</text>
        <text x={gL + gW/2} y={196} fontSize={7} fill="#64748b" textAnchor="middle">{xLabel}</text>
        {/* Line of best fit */}
        {lobf && !curved && (
          <>
            <line x1={px(lobf[0].x)} y1={py(lobf[0].y)} x2={px(lobf[1].x)} y2={py(lobf[1].y)}
              stroke={color} strokeWidth={1.8} strokeLinecap="round" opacity={0.75}/>
            <text x={px(lobf[0].x + (lobf[1].x - lobf[0].x) * 0.35)} y={py(lobf[0].y + (lobf[1].y - lobf[0].y) * 0.35) - 8}
              fontSize={6.5} fill={color} opacity={0.9}>{lobfLabel || 'Line of best fit'}</text>
          </>
        )}
        {lobf && curved && (
          <>
            <polyline points={lobf.map(p2 => `${px(p2.x)},${py(p2.y)}`).join(' ')}
              fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" opacity={0.75}/>
            <text x={px(lobf[Math.floor(lobf.length/2)].x)} y={py(lobf[Math.floor(lobf.length/2)].y) - 9}
              fontSize={6.5} fill={color} opacity={0.9}>{lobfLabel || 'Curve of best fit'}</text>
          </>
        )}
        {/* Data points */}
        {points.map((pt, i) => (
          <circle key={i} cx={px(pt.x)} cy={py(pt.y)} r={3.5}
            fill={color} fillOpacity={0.85} stroke="#0b1121" strokeWidth={1}/>
        ))}
      </svg>
      {gradient && (
        <div className="mt-1 px-1 text-xs" style={{ color: '#a8b8cc' }}>
          Gradient = <span style={{ color, fontWeight: 700 }}>{gradient.value}</span>
          {gradient.unit && <span style={{ color: '#64748b' }}> {gradient.unit}</span>}
          {gradient.note && <span style={{ color: '#64748b' }}> — {gradient.note}</span>}
        </div>
      )}
    </div>
  )
}

function TabAnalysis({ p, color }) {
  const formulas = {
    shc: 'c = E / (m × ΔT)',
    insulation: 'Rate of cooling ∝ ΔT',
    resistance: 'R = V / I  ∝  L',
    iv_characteristics: 'V = IR (Ohm\'s Law)',
    density: 'ρ = m / V',
    light: 'n = sin(i) / sin(r)',
    spring: 'F = k × e',
    acceleration: 'F = m × a',
    waves: 'v = f × λ',
    radiation: 'Black body → max emission',
  }

  const graphs = {
    shc: (
      <ScatterGraph
        title="Graph: Temperature vs Energy Supplied"
        xLabel="Energy supplied (J)" yLabel="ΔT (°C)"
        xMax={20000} yMax={55}
        xTicks={[0,4000,8000,12000,16000,20000]} yTicks={[0,10,20,30,40,50]}
        points={[
          {x:2000,y:5.4},{x:4000,y:10.8},{x:6000,y:15.9},{x:8000,y:21.3},
          {x:10000,y:26.1},{x:12000,y:31.5},{x:14000,y:37.0},{x:16000,y:42.0},
          {x:18000,y:47.1},{x:20000,y:52.3},
        ]}
        lobf={[{x:0,y:0},{x:20000,y:52}]}
        lobfLabel="Line of best fit"
        gradient={{ value: '0.0026 °C/J', note: 'gradient = 1/(mc)' }}
        color={color}
      />
    ),
    insulation: (
      <ScatterGraph
        title="Graph: Temperature vs Time (cooling curves)"
        xLabel="Time (min)" yLabel="Temperature (°C)"
        xMax={20} yMax={85}
        xTicks={[0,5,10,15,20]} yTicks={[0,20,40,60,80]}
        points={[
          {x:0,y:80},{x:2,y:69},{x:4,y:59},{x:6,y:52},{x:8,y:46},
          {x:10,y:41},{x:12,y:37},{x:14,y:34},{x:16,y:31},{x:18,y:29},{x:20,y:27},
        ]}
        lobf={[
          {x:0,y:80},{x:2,y:70},{x:4,y:61.3},{x:6,y:53.6},{x:8,y:46.9},
          {x:10,y:41.0},{x:12,y:35.9},{x:14,y:31.4},{x:16,y:27.5},{x:18,y:24.1},{x:20,y:21.1},
        ]}
        lobfLabel="Exponential decay (no insulation)"
        gradient={{ value: 'steeper gradient', note: 'less insulation → faster cooling' }}
        color={color}
        curved
      />
    ),
    resistance: (
      <ScatterGraph
        title="Graph: R vs Length"
        xLabel="Length (cm)" yLabel="Resistance (Ω)"
        xMax={100} yMax={25}
        xTicks={[0,20,40,60,80,100]} yTicks={[0,5,10,15,20,25]}
        points={[
          {x:10,y:2.6},{x:20,y:4.3},{x:30,y:7.1},{x:40,y:8.8},{x:50,y:11.7},
          {x:60,y:13.2},{x:70,y:16.1},{x:80,y:17.9},{x:90,y:20.7},{x:100,y:22.3},
        ]}
        lobf={[{x:0,y:0},{x:100,y:22.5}]}
        lobfLabel="Line of best fit"
        gradient={{ value: '0.225 Ω/cm', note: 'resistance per cm of wire' }}
        color={color}
      />
    ),
    iv_characteristics: (
      <ScatterGraph
        title="Graph: Current vs Voltage (resistor)"
        xLabel="Voltage (V)" yLabel="Current (mA)"
        xMax={6} yMax={65}
        xTicks={[0,1,2,3,4,5,6]} yTicks={[0,10,20,30,40,50,60]}
        points={[
          {x:0,y:0},{x:1,y:10.2},{x:2,y:19.8},{x:3,y:30.1},
          {x:4,y:40.3},{x:5,y:49.7},{x:6,y:60.2},
        ]}
        lobf={[{x:0,y:0},{x:6,y:60}]}
        lobfLabel="Ohmic (straight through origin)"
        gradient={{ value: '10 mA/V', note: 'gradient = 1/R = 1/100Ω' }}
        color={color}
      />
    ),
    density: (
      <ScatterGraph
        title="Graph: Mass vs Volume"
        xLabel="Volume (cm³)" yLabel="Mass (g)"
        xMax={100} yMax={900}
        xTicks={[0,20,40,60,80,100]} yTicks={[0,200,400,600,800]}
        points={[
          {x:10,y:27.1},{x:20,y:54.2},{x:30,y:81.3},{x:40,y:108.4},
          {x:50,y:135.0},{x:60,y:162.1},{x:70,y:189.3},{x:80,y:216.4},
          {x:90,y:243.5},{x:100,y:270.1},
        ]}
        lobf={[{x:0,y:0},{x:100,y:270}]}
        lobfLabel="Line of best fit (aluminium)"
        gradient={{ value: '2.70 g/cm³', note: 'gradient = density' }}
        color={color}
      />
    ),
    light: (
      <ScatterGraph
        title="Graph: sin(r) vs sin(i)"
        xLabel="sin(i)" yLabel="sin(r)"
        xMax={1.0} yMax={0.7}
        xTicks={[0,0.2,0.4,0.6,0.8,1.0]} yTicks={[0,0.1,0.2,0.3,0.4,0.5,0.6]}
        points={[
          {x:0.17,y:0.11},{x:0.34,y:0.22},{x:0.50,y:0.32},{x:0.64,y:0.41},
          {x:0.77,y:0.50},{x:0.87,y:0.56},{x:0.94,y:0.61},
        ]}
        lobf={[{x:0,y:0},{x:1.0,y:0.65}]}
        lobfLabel="Line of best fit"
        gradient={{ value: '0.65', note: 'gradient = 1/n → n = 1.54 (glass)' }}
        color={color}
      />
    ),
    spring: (
      <ScatterGraph
        title="Graph: Extension vs Force"
        xLabel="Force (N)" yLabel="Extension (cm)"
        xMax={10} yMax={22}
        xTicks={[0,2,4,6,8,10]} yTicks={[0,5,10,15,20]}
        points={[
          {x:1,y:2.1},{x:2,y:4.0},{x:3,y:6.2},{x:4,y:8.1},{x:5,y:10.0},
          {x:6,y:12.3},{x:7,y:14.1},{x:8,y:16.0},{x:9,y:18.2},{x:10,y:20.1},
        ]}
        lobf={[{x:0,y:0},{x:10,y:20}]}
        lobfLabel="Linear (elastic region)"
        gradient={{ value: '2.0 cm/N', note: '→ spring constant k = 50 N/m' }}
        color={color}
      />
    ),
    acceleration: (
      <ScatterGraph
        title="Graph: Acceleration vs Force"
        xLabel="Force (N)" yLabel="Acceleration (m/s²)"
        xMax={5} yMax={12}
        xTicks={[0,1,2,3,4,5]} yTicks={[0,2,4,6,8,10]}
        points={[
          {x:0.5,y:1.1},{x:1.0,y:2.0},{x:1.5,y:3.2},{x:2.0,y:4.1},
          {x:2.5,y:5.1},{x:3.0,y:6.0},{x:3.5,y:7.2},{x:4.0,y:8.1},
          {x:4.5,y:9.0},{x:5.0,y:10.2},
        ]}
        lobf={[{x:0,y:0},{x:5,y:10}]}
        lobfLabel="Line of best fit"
        gradient={{ value: '2.0 m/s²/N', note: 'gradient = 1/m → m = 0.5 kg trolley' }}
        color={color}
      />
    ),
    waves: (
      <ScatterGraph
        title="Graph: Wavelength vs 1/Frequency"
        xLabel="1/f (s)" yLabel="λ (m)"
        xMax={1.0} yMax={0.30}
        xTicks={[0,0.2,0.4,0.6,0.8,1.0]} yTicks={[0,0.05,0.10,0.15,0.20,0.25]}
        points={[
          {x:0.071,y:0.020},{x:0.10,y:0.028},{x:0.143,y:0.040},{x:0.20,y:0.056},
          {x:0.25,y:0.070},{x:0.333,y:0.093},{x:0.50,y:0.140},{x:0.667,y:0.187},
          {x:1.0,y:0.280},
        ]}
        lobf={[{x:0,y:0},{x:1.0,y:0.28}]}
        lobfLabel="Line of best fit"
        gradient={{ value: '0.28 m/s', note: 'gradient = wave speed in water' }}
        color={color}
      />
    ),
    radiation: (
      <ScatterGraph
        title="Graph: Emission Rate vs Surface Type"
        xLabel="Surface" yLabel="Emission rate (arbitrary)"
        xMax={5} yMax={100}
        xTicks={[1,2,3,4]} yTicks={[0,20,40,60,80,100]}
        points={[
          {x:1,y:87},{x:2,y:72},{x:3,y:60},{x:4,y:41},
        ]}
        lobf={null}
        gradient={{ value: 'Matt black > Matt white > Gloss black > Shiny silver', unit: '' }}
        color={color}
      />
    ),
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-[16px] p-4 text-center font-mono"
        style={{ background: `${color}12`, border: `0.75px solid ${color}50` }}>
        <div className="text-xs uppercase tracking-wide mb-2" style={{ color: '#a8b8cc' }}>Key Formula</div>
        <div className="text-xl font-bold" style={{ color }}>{formulas[p.id]}</div>
      </div>
      <div className="rounded-[16px] p-4" style={{ background: 'rgba(18,26,47,0.9)', border: `0.75px solid ${color}40` }}>
        <div className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color }}>Analysis</div>
        <p className="text-sm leading-relaxed" style={{ color: '#cad5e2' }}>{p.analysis}</p>
      </div>
      {graphs[p.id]}
    </div>
  )
}

function TabExplore({ p, color }) {
  const sims = EXTERNAL_SIMS[p.id] || []
  const [pending, setPending] = useState(null) // { url, name, domain }

  const handleSimTap = (sim) => {
    let domain = sim.url
    try { domain = new URL(sim.url).hostname } catch {}
    setPending({ url: sim.url, name: sim.name, domain })
  }

  const confirmOpen = async () => {
    if (pending) await Browser.open({ url: pending.url })
    setPending(null)
  }

  if (sims.length === 0) {
    return (
      <div className="rounded-[16px] p-6 text-center"
        style={{ background: 'rgba(18,26,47,0.9)', border: '0.75px solid #1d293d' }}>
        <ArrowSquareOut size={24} color="#475569" style={{ margin: '0 auto 8px' }}/>
        <p className="text-sm" style={{ color: '#64748b' }}>
          External simulations coming soon for this practical.
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 px-1">
        <ArrowSquareOut size={14} color={color}/>
        <span className="text-xs font-semibold uppercase tracking-wide" style={{ color }}>
          Try these free simulations
        </span>
      </div>

      {sims.map((sim, i) => (
        <motion.button
          key={i}
          onClick={() => handleSimTap(sim)}
          className="block w-full text-left rounded-[14px] p-4"
          style={{
            background: 'rgba(18,26,47,0.9)',
            border: '0.75px solid #1d293d',
          }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.06 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-start justify-between gap-2 mb-2">
            <span className="text-sm font-semibold" style={{ color: '#e2e8f0' }}>
              {sim.name}
            </span>
            <ArrowSquareOut size={14} color="#475569" style={{ flexShrink: 0, marginTop: 2 }}/>
          </div>
          <p className="text-xs leading-relaxed" style={{ color: '#94a3b8' }}>
            {sim.desc}
          </p>
          {sim.free && (
            <div className="inline-flex items-center gap-1 mt-2 px-2 py-0.5 rounded-full text-xs"
              style={{ background: 'rgba(16,185,129,0.1)', border: '0.75px solid rgba(16,185,129,0.3)', color: '#34d399' }}>
              <CheckCircle size={10}/> Free
            </div>
          )}
        </motion.button>
      ))}

      <div className="rounded-[12px] p-3 mt-1"
        style={{ background: 'rgba(99,102,241,0.08)', border: '0.75px solid rgba(99,102,241,0.25)' }}>
        <p className="text-xs leading-relaxed" style={{ color: '#a5b4fc' }}>
          External sites are not controlled by NeuroPhysics. Content and availability may change. Always verify information with your teacher or official revision materials.
        </p>
      </div>

      {/* External link interstitial */}
      <AnimatePresence>
        {pending && (
          <motion.div
            className="fixed inset-0 z-50 flex items-end justify-center"
            style={{ background: 'rgba(0,0,0,0.6)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPending(null)}
          >
            <motion.div
              className="w-full rounded-t-[24px] p-6 pb-10"
              style={{
                background: '#12121a',
                border: '0.75px solid #1e1e2e',
                maxWidth: 480,
              }}
              initial={{ y: 80 }}
              animate={{ y: 0 }}
              exit={{ y: 80 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(99,102,241,0.15)', border: '0.75px solid rgba(99,102,241,0.35)' }}>
                  <ArrowSquareOut size={18} color="#818cf8"/>
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: '#e2e8f0' }}>
                    Leaving NeuroPhysics
                  </p>
                  <p className="text-xs" style={{ color: '#64748b' }}>
                    {pending.domain}
                  </p>
                </div>
              </div>
              <p className="text-sm leading-relaxed mb-5" style={{ color: '#94a3b8' }}>
                <span style={{ color: '#e2e8f0', fontWeight: 600 }}>{pending.name}</span> is an external site not controlled by NeuroPhysics. It has its own privacy policy and may collect data independently of us.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setPending(null)}
                  className="flex-1 py-3 rounded-[12px] text-sm font-semibold"
                  style={{ background: 'rgba(255,255,255,0.06)', color: '#94a3b8' }}
                >
                  Cancel
                </button>
                <button
                  onClick={confirmOpen}
                  className="flex-1 py-3 rounded-[12px] text-sm font-semibold"
                  style={{ background: '#6366f1', color: '#fff' }}
                >
                  Open site
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function TabSafety({ p }) {
  return (
    <div className="flex flex-col gap-5">

      {/* Errors & Improvements */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 rounded-full" style={{ background: '#fbbf24' }}/>
          <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#fbbf24' }}>
            Errors & Improvements
          </span>
        </div>
        <div className="flex flex-col gap-2">
          {p.errors.map((err, i) => {
            const [problem, solution] = err.split(' → ')
            return (
              <div key={i} className="rounded-[12px] p-3"
                style={{ background: 'rgba(245,158,11,0.07)', border: '0.75px solid rgba(245,158,11,0.25)' }}>
                <div className="text-xs font-semibold mb-1" style={{ color: '#fbbf24' }}>{problem}</div>
                {solution && (
                  <div className="text-xs" style={{ color: '#cad5e2' }}>
                    <span style={{ color: '#94a3b8' }}>Improvement: </span>{solution}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Hazards */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Warning size={13} color="#f87171"/>
          <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#f87171' }}>
            Hazards, Risks & Precautions
          </span>
        </div>
        <div className="flex flex-col gap-3">
          {p.hazards.map((h, i) => (
            <div key={i} className="rounded-[12px] overflow-hidden"
              style={{ border: '0.75px solid rgba(239,68,68,0.3)' }}>
              {/* Hazard row */}
              <div className="flex items-start gap-2 px-3 py-2"
                style={{ background: 'rgba(239,68,68,0.12)' }}>
                <span className="text-xs font-bold shrink-0" style={{ color: '#ef4444', minWidth: 52 }}>HAZARD</span>
                <span className="text-xs font-medium" style={{ color: '#f8fafc' }}>{h.hazard}</span>
              </div>
              {/* Risk row */}
              <div className="flex items-start gap-2 px-3 py-2"
                style={{ background: 'rgba(239,68,68,0.06)', borderTop: '0.75px solid rgba(239,68,68,0.15)' }}>
                <span className="text-xs font-bold shrink-0" style={{ color: '#f87171', minWidth: 52 }}>RISK</span>
                <span className="text-xs" style={{ color: '#fca5a5' }}>{h.risk}</span>
              </div>
              {/* Precaution row */}
              <div className="flex items-start gap-2 px-3 py-2"
                style={{ background: 'rgba(18,26,47,0.9)', borderTop: '0.75px solid rgba(239,68,68,0.15)' }}>
                <span className="text-xs font-bold shrink-0" style={{ color: '#4ade80', minWidth: 52 }}>ACTION</span>
                <span className="text-xs" style={{ color: '#cad5e2' }}>{h.precaution}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* General safety note */}
      <div className="rounded-[12px] p-3 flex items-start gap-3"
        style={{ background: 'rgba(16,185,129,0.07)', border: '0.75px solid rgba(16,185,129,0.25)' }}>
        <ShieldWarning size={16} color="#34d399" className="shrink-0 mt-0.5"/>
        <p className="text-xs leading-relaxed" style={{ color: '#cad5e2' }}>
          Always: wear safety goggles, tie back hair, use heatproof mats, check
          equipment before switching on, and wash hands after practical work.
        </p>
      </div>
    </div>
  )
}

// ─── Main screen ──────────────────────────────────────────────────────────────

export default function PracticalScreen() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [markedComplete, setMarkedComplete] = useState(false)
  const { progress, markStarted, markMastered } = useProgress()

  const p = PRACTICALS[id]
  const board = getSelectedBoard()
  // Translate "RP1" → board-appropriate label, e.g. "CP1" for Edexcel, "PAG1" for OCR
  const boardPracticalId = p
    ? p.number.replace('RP', board.practicalShort)
    : board.practicalShort

  // Mark as started when practical is first opened
  useEffect(() => {
    if (p && id) markStarted(id)
  }, [id]) // eslint-disable-line react-hooks/exhaustive-deps

  // Reflect already-mastered state on mount
  useEffect(() => {
    if (progress[id]?.mastered) setMarkedComplete(true)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleMarkComplete = () => {
    markMastered(id)
    setMarkedComplete(true)
  }
  if (!p) return (
    <div className="flex items-center justify-center h-full" style={{ color: '#a8b8cc' }}>
      Practical not found
    </div>
  )

  const color = '#6366f1'
  const activeTabDef = TABS.find(t => t.id === activeTab)
  const ActiveIcon = activeTabDef?.icon

  const tabContent = {
    overview:  <TabOverview  p={p} color={color}/>,
    variables: <TabVariables p={p} color={color}/>,
    setup:     <TabSetup     p={p} color={color}/>,
    method:    <TabMethod    p={p} color={color}/>,
    results:   <TabResults   p={p} color={color}/>,
    analysis:  <TabAnalysis  p={p} color={color}/>,
    safety:    <TabSafety    p={p} color={color}/>,
    explore:   <TabExplore   p={p} color={color}/>,
  }

  return (
    <div className="flex flex-col h-full overflow-hidden" style={{ background: '#0b1121' }}>
      {/* Header */}
      <div className="px-4 pt-5 pb-3 shrink-0 flex items-center gap-3"
        style={{ borderBottom: '0.75px solid #1d293d' }}>
        <button onClick={() => navigate(-1)}
          className="w-9 h-9 rounded-[12px] flex items-center justify-center shrink-0"
          style={{ background: 'rgba(18,26,47,0.9)', border: '0.75px solid #1d293d' }}>
          <CaretLeft size={18} color="#a8b8cc"/>
        </button>
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <div className="px-2 py-0.5 rounded-[6px] text-xs font-bold shrink-0"
            style={{ background: `${color}20`, border: `0.75px solid ${color}60`, color }}>
            {boardPracticalId}
          </div>
          <h1 className="text-base font-bold leading-tight" style={{ color: '#f8fafc', overflowWrap: 'anywhere' }}>{p.title}</h1>
        </div>
        <Flask size={18} color={color} className="shrink-0"/>
      </div>

      {/* Section selector  -  dropdown */}
      <div className="shrink-0 px-4 py-2 relative" style={{ borderBottom: '0.75px solid #1d293d', zIndex: 20 }}>
        {/* Trigger button */}
        <button
          onClick={() => setDropdownOpen(v => !v)}
          className="w-full flex items-center justify-between px-4 py-2.5 rounded-[12px]"
          style={{
            background: `${color}15`,
            border: `0.75px solid ${color}50`,
          }}>
          <div className="flex items-center gap-2">
            {ActiveIcon && <ActiveIcon size={14} color={color}/>}
            <span className="text-sm font-semibold" style={{ color }}>{activeTabDef?.label}</span>
          </div>
          {dropdownOpen
            ? <CaretUp size={16} color={color}/>
            : <CaretDown size={16} color={color}/>}
        </button>

        {/* Dropdown list */}
        <AnimatePresence>
          {dropdownOpen && (
            <motion.div
              className="absolute left-4 right-4 top-full mt-1 rounded-[14px] overflow-hidden"
              style={{
                background: '#121a2f',
                border: '0.75px solid #1d293d',
                boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                zIndex: 30,
              }}
              initial={{ opacity: 0, y: -8, scaleY: 0.9 }}
              animate={{ opacity: 1, y: 0, scaleY: 1 }}
              exit={{ opacity: 0, y: -8, scaleY: 0.9 }}
            >
              {TABS.map((tab, i) => {
                const Icon = tab.icon
                const active = activeTab === tab.id
                return (
                  <button
                    key={tab.id}
                    onClick={() => { setActiveTab(tab.id); setDropdownOpen(false) }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-left"
                    style={{
                      background: active ? `${color}15` : 'transparent',
                      borderBottom: i < TABS.length - 1 ? '0.75px solid #1d293d' : 'none',
                      color: active ? color : '#cad5e2',
                    }}>
                    <Icon size={15} color={active ? color : '#64748b'}/>
                    <span className={active ? 'font-semibold' : ''}>{tab.label}</span>
                    {active && (
                      <div className="ml-auto w-1.5 h-1.5 rounded-full" style={{ background: color }}/>
                    )}
                  </button>
                )
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 pt-4" style={{ minHeight: 0, paddingBottom: 'calc(16px + var(--safe-bottom))' }} onClick={() => dropdownOpen && setDropdownOpen(false)}>
        <AnimatePresence mode="wait">
          <motion.div key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18 }}>
            {tabContent[activeTab]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer — mark complete + practice shortcut */}
      <div className="shrink-0 px-4 py-3 flex items-center gap-3"
        style={{ borderTop: '0.75px solid #1d293d' }}>
        <motion.button
          type="button"
          onClick={handleMarkComplete}
          disabled={markedComplete}
          whileTap={markedComplete ? {} : { scale: 0.97 }}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-[14px]"
          style={{
            background: markedComplete ? 'rgba(20,184,166,0.12)' : 'rgba(20,184,166,0.08)',
            border: `0.75px solid ${markedComplete ? '#14b8a6' : 'rgba(20,184,166,0.25)'}`,
          }}>
          <CheckCircle size={15} color={markedComplete ? '#14b8a6' : 'rgba(20,184,166,0.5)'}/>
          <span className="text-sm font-semibold"
            style={{ color: markedComplete ? '#14b8a6' : 'rgba(20,184,166,0.6)' }}>
            {markedComplete ? 'Completed' : 'Mark as complete'}
          </span>
        </motion.button>

        <motion.button
          type="button"
          onClick={() => navigate(`/practice/${id}`)}
          whileTap={{ scale: 0.97 }}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-[14px]"
          style={{
            background: 'rgba(168,85,247,0.08)',
            border: '0.75px solid rgba(168,85,247,0.22)',
          }}>
          <Lightning size={14} color="#a855f7"/>
          <span className="text-sm font-semibold" style={{ color: '#a855f7' }}>Practice</span>
        </motion.button>
      </div>
    </div>
  )
}
