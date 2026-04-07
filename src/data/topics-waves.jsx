import { motion } from 'motion/react'
import { useState, useEffect } from 'react'
import { Waves, Radio, Eye, Sun } from 'lucide-react'
import { IdeaCaption, RealityBadge, FormulaBox } from './visuals-helpers'

const WC = '#fdc700'
const MC = '#10b981'
const SC = '#6366f1'

// ─── 32. Wave Types ──────────────────────────────────────────────────────────
function WaveTypesLesson() {
  const [type, setType] = useState('transverse')
  const wPts = Array.from({ length: 100 }, (_, i) => {
    const x = 10 + i * 2.4
    const y = 55 + 28 * Math.sin((i / 100) * Math.PI * 4)
    return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`
  }).join(' ')
  return (
    <div className="w-full h-full flex flex-col justify-center gap-2 px-3 py-2">
      <div className="flex gap-2 justify-center">
        {[['transverse', 'Transverse'], ['longitudinal', 'Longitudinal']].map(([val, label]) => (
          <button key={val} onClick={() => setType(val)}
            className="px-3 py-1 rounded-[6px] text-xs font-semibold"
            style={{ background: type === val ? `${WC}25` : '#1d293d', color: type === val ? WC : '#a8b8cc', border: `1px solid ${type === val ? WC : '#2d3f5c'}` }}>
            {label}
          </button>
        ))}
      </div>

      {type === 'transverse' ? (
        <svg width="260" height="110" viewBox="0 0 260 110">
          {/* Axis line */}
          <line x1="10" y1="55" x2="250" y2="55" stroke="#2d3f5c" strokeWidth="1" strokeDasharray="4 3" />
          {/* Wave */}
          <motion.path d={wPts} fill="none" stroke={WC} strokeWidth="2.5" strokeLinecap="round"
            key="trans" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.9 }} />
          {/* Amplitude arrow at first peak x≈70 */}
          <line x1="70" y1="27" x2="70" y2="55" stroke="#c084fc" strokeWidth="1.5" />
          <line x1="67" y1="27" x2="73" y2="27" stroke="#c084fc" strokeWidth="1.2" />
          <line x1="67" y1="55" x2="73" y2="55" stroke="#c084fc" strokeWidth="1.2" />
          <text x="75" y="43" fill="#c084fc" fontSize={9}>A</text>
          {/* Wavelength bracket first full cycle x=10→70 */}
          <line x1="10" y1="100" x2="70" y2="100" stroke="#2b7fff" strokeWidth="1.2" />
          <line x1="10" y1="96" x2="10" y2="104" stroke="#2b7fff" strokeWidth="1.2" />
          <line x1="70" y1="96" x2="70" y2="104" stroke="#2b7fff" strokeWidth="1.2" />
          <text x="40" y="108" textAnchor="middle" fill="#2b7fff" fontSize={8}>λ</text>
          {/* Crest / trough labels */}
          <text x="70" y="22" textAnchor="middle" fill="#a8b8cc" fontSize={8}>crest</text>
          <text x="130" y="92" textAnchor="middle" fill="#a8b8cc" fontSize={8}>trough</text>
          {/* Travel arrow */}
          <line x1="200" y1="55" x2="248" y2="55" stroke={WC} strokeWidth="1.5" markerEnd="url(#arrowHead)" />
          <polygon points="248,52 254,55 248,58" fill={WC} />
          <text x="195" y="48" fill={WC} fontSize={8}>→ travel</text>
          {/* Label */}
          <text x="130" y="12" textAnchor="middle" fill="#a8b8cc" fontSize={8}>vibration ⊥ travel direction</text>
        </svg>
      ) : (
        <svg width="260" height="110" viewBox="0 0 260 110">
          {/* Longitudinal particle groups: 3 compressions, 2 rarefactions */}
          {[
            { cx: 22,  type: 'C', count: 5, gap: 4 },
            { cx: 68,  type: 'R', count: 3, gap: 11 },
            { cx: 118, type: 'C', count: 5, gap: 4 },
            { cx: 164, type: 'R', count: 3, gap: 11 },
            { cx: 214, type: 'C', count: 5, gap: 4 },
          ].map((grp, gi) => (
            <motion.g key={gi} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: gi * 0.1 }}>
              {Array.from({ length: grp.count }, (_, j) => (
                <circle key={j}
                  cx={grp.cx - ((grp.count - 1) * grp.gap) / 2 + j * grp.gap}
                  cy={55} r={4}
                  fill={WC} opacity={grp.type === 'C' ? 0.9 : 0.4} />
              ))}
              <text x={grp.cx} y={28} textAnchor="middle" fill={grp.type === 'C' ? WC : '#a8b8cc'} fontSize={8}>
                {grp.type === 'C' ? 'C' : 'R'}
              </text>
            </motion.g>
          ))}
          {/* C and R legend */}
          <text x="10" y="18" fill={WC} fontSize={8}>C = compression</text>
          <text x="140" y="18" fill="#a8b8cc" fontSize={8}>R = rarefaction</text>
          {/* Travel arrow */}
          <line x1="10" y1="80" x2="244" y2="80" stroke={WC} strokeWidth="1.2" />
          <polygon points="244,77 250,80 244,83" fill={WC} />
          <text x="125" y="96" textAnchor="middle" fill={WC} fontSize={8}>→ direction of travel</text>
          {/* Particle vibration arrow */}
          <line x1="90" y1="108" x2="130" y2="108" stroke="#c084fc" strokeWidth="1.5" />
          <polygon points="90,105 84,108 90,111" fill="#c084fc" />
          <polygon points="130,105 136,108 130,111" fill="#c084fc" />
          <text x="175" y="111" fill="#c084fc" fontSize={8}>particle vibration ↔</text>
          {/* Label */}
          <text x="130" y="8" textAnchor="middle" fill="#a8b8cc" fontSize={8}>vibration ∥ travel direction</text>
        </svg>
      )}

      <div className="text-center text-xs" style={{ color: '#a8b8cc' }}>
        <span style={{ color: WC }}>Transverse:</span> EM waves, water &nbsp;|&nbsp; <span style={{ color: '#2b7fff' }}>Longitudinal:</span> sound
      </div>
    </div>
  )
}
function WaveTypesIdea() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-4">
      <div className="flex flex-col gap-2 w-full px-2">
        <div className="text-xs font-bold text-center mb-1" style={{ color: '#ef4444' }}>Sound particles vibrate…</div>
        {/* Wrong: upward arrows like transverse */}
        <div className="flex items-center gap-1 p-2 rounded-[8px]" style={{ background: '#ef444415', border: '1px solid #ef4444' }}>
          <div className="flex gap-2 items-center flex-1">
            {[0,1,2,3,4].map(i => (
              <motion.div key={i} className="flex flex-col items-center"
                animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.12 }}>
                <div style={{ width: 2, height: 10, background: '#ef4444', borderRadius: 1 }} />
                <div style={{ width: 0, height: 0, borderLeft: '4px solid transparent', borderRight: '4px solid transparent', borderBottom: '6px solid #ef4444' }} />
              </motion.div>
            ))}
          </div>
          <span className="text-xs font-bold" style={{ color: '#ef4444' }}>↕ ?  ✗</span>
        </div>
        <div className="text-xs text-center" style={{ color: '#a8b8cc' }}>Sound is NOT transverse (↕)</div>
      </div>
      <IdeaCaption>Sound waves are transverse - vibrating up and down like water waves</IdeaCaption>
    </div>
  )
}
function WaveTypesReality() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-4">
      <div className="flex gap-3">
        <div className="flex flex-col items-center gap-1 p-2 rounded-[8px]" style={{ background: `${WC}10`, border: `1px solid ${WC}` }}>
          <Waves size={18} color={WC} />
          <span className="text-xs" style={{ color: WC }}>Transverse</span>
          <span className="text-xs text-center" style={{ color: '#cad5e2' }}>EM, light<br/>water, seismic S</span>
        </div>
        <div className="flex flex-col items-center gap-1 p-2 rounded-[8px]" style={{ background: '#00a8e820', border: '1px solid #00a8e8' }}>
          <span className="text-lg font-mono" style={{ color: '#00a8e8' }}>≋</span>
          <span className="text-xs" style={{ color: '#00a8e8' }}>Longitudinal</span>
          <span className="text-xs text-center" style={{ color: '#cad5e2' }}>Sound<br/>seismic P</span>
        </div>
      </div>
      <RealityBadge color={WC}>Sound is longitudinal - particles vibrate parallel to wave travel</RealityBadge>
    </div>
  )
}

// ─── 33. Wave Properties ─────────────────────────────────────────────────────
function WavePropertiesLesson() {
  const [freq, setFreq] = useState(2)
  const speed = 300
  const wavelength = (speed / freq).toFixed(0)
  const period = (1 / freq).toFixed(2)

  const xStart = 22, xEnd = 256, yMid = 56, A = 26
  const waveW = xEnd - xStart
  const cycleW = waveW / freq

  // Smooth wave path
  const pts = Array.from({ length: 120 }, (_, i) => {
    const x = xStart + (i / 119) * waveW
    const y = yMid + A * Math.sin((i / 119) * Math.PI * 2 * freq)
    return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`
  }).join(' ')

  // Label positions (first cycle)
  const peak1X = xStart + cycleW / 4
  const trough1X = xStart + 3 * cycleW / 4
  const peak2X = xStart + cycleW + cycleW / 4
  const showFull = cycleW >= 70   // enough room for labels

  return (
    <div className="w-full h-full flex flex-col justify-center gap-2 px-3 py-2">
      <svg width="260" height="108" viewBox="0 0 260 108">
        {/* Wavelength bracket  -  above wave, peak1 to peak2 */}
        {showFull && peak2X <= xEnd && <>
          <line x1={peak1X} y1="10" x2={peak2X} y2="10" stroke="#a8b8cc" strokeWidth="1.2" />
          <line x1={peak1X} y1="7" x2={peak1X} y2="14" stroke="#a8b8cc" strokeWidth="1.2" />
          <line x1={peak2X} y1="7" x2={peak2X} y2="14" stroke="#a8b8cc" strokeWidth="1.2" />
          <text x={(peak1X + peak2X) / 2} y="6" textAnchor="middle" fill="#a8b8cc" fontSize="6">wavelength</text>
          <text x={(peak1X + peak2X) / 2} y="19" textAnchor="middle" fill={WC} fontSize="6.5" fontWeight="bold">λ = {wavelength} m</text>
        </>}

        {/* Dashed centre / equilibrium line */}
        <line x1={xStart} y1={yMid} x2={xEnd} y2={yMid}
          stroke="#ef444455" strokeWidth="1" strokeDasharray="5 4" />

        {/* Wave */}
        <motion.path d={pts} fill="none" stroke={WC} strokeWidth="2.5" strokeLinecap="round"
          key={freq} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5 }} />

        {/* Amplitude  -  vertical double-headed, left of wave */}
        <line x1="11" y1={yMid - A} x2="11" y2={yMid} stroke="#c084fc" strokeWidth="1.5" />
        <line x1="8"  y1={yMid - A} x2="14" y2={yMid - A} stroke="#c084fc" strokeWidth="1.2" />
        <line x1="8"  y1={yMid}     x2="14" y2={yMid}     stroke="#c084fc" strokeWidth="1.2" />
        <text x="4" y={yMid - A / 2 + 3} fill="#c084fc" fontSize="6"
          textAnchor="middle" transform={`rotate(-90,4,${yMid - A / 2})`}>amplitude</text>

        {/* Peak & trough labels */}
        {showFull && <>
          <text x={Math.min(peak1X + 3, 230)} y={yMid - A + 1} fill="#a8b8cc" fontSize="6">peak</text>
          <text x={Math.min(trough1X + 3, 230)} y={yMid + A + 7} fill="#a8b8cc" fontSize="6">trough</text>
        </>}

        {/* "one complete wave" bracket  -  below wave */}
        {showFull && cycleW <= 200 && <>
          <line x1={xStart} y1="100" x2={xStart + cycleW} y2="100" stroke="#a8b8cc" strokeWidth="1" />
          <line x1={xStart}           y1="97" x2={xStart}           y2="103" stroke="#a8b8cc" strokeWidth="1" />
          <line x1={xStart + cycleW}  y1="97" x2={xStart + cycleW}  y2="103" stroke="#a8b8cc" strokeWidth="1" />
          <text x={xStart + cycleW / 2} y="107" textAnchor="middle" fill="#a8b8cc" fontSize="5.5">one complete wave</text>
        </>}
      </svg>

      <div className="flex flex-col gap-1">
        <div className="flex justify-between text-xs">
          <span style={{ color: '#a8b8cc' }}>Frequency (Hz)</span>
          <span style={{ color: WC }} className="font-bold">{freq} Hz</span>
        </div>
        <input type="range" min="1" max="5" step="0.5" value={freq}
          onChange={e => setFreq(+e.target.value)} className="w-full" style={{ accentColor: WC }} />
      </div>
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="p-2 rounded-[8px] text-center" style={{ background: `${WC}10`, color: WC }}>v = fλ = {speed} m/s</div>
        <div className="p-2 rounded-[8px] text-center" style={{ background: '#1d293d', color: '#a8b8cc' }}>T = 1/f = {period} s</div>
      </div>
    </div>
  )
}
function WavePropertiesIdea() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-4">
      <svg width="190" height="80" viewBox="0 0 190 80">
        {/* Two waves: low freq and high freq, same speed label */}
        <text x="8" y="16" fill="#a8b8cc" fontSize="7">Low f</text>
        <motion.path d="M40 15 Q55 5 70 15 Q85 25 100 15 Q115 5 130 15 Q145 25 160 15"
          fill="none" stroke="#c084fc" strokeWidth="2"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8 }} />
        <text x="8" y="46" fill="#a8b8cc" fontSize="7">High f</text>
        <motion.path d="M40 45 Q47 38 54 45 Q61 52 68 45 Q75 38 82 45 Q89 52 96 45 Q103 38 110 45 Q117 52 124 45 Q131 38 138 45 Q145 52 152 45 Q159 38 166 45"
          fill="none" stroke={WC} strokeWidth="2"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, delay: 0.2 }} />
        {/* Wrong "faster" arrow for high freq */}
        <motion.line x1="165" y1="45" x2="185" y2="45" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arr)"
          animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 2 }} />
        <text x="95" y="68" textAnchor="middle" fill="#ef4444" fontSize="8">higher f → faster?  ✗</text>
      </svg>
      <IdeaCaption>Higher frequency waves travel faster - more oscillations per second means higher speed</IdeaCaption>
    </div>
  )
}
function WavePropertiesReality() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-4">
      <FormulaBox formula="v = f × λ" color={WC} />
      <div className="text-xs text-center" style={{ color: '#cad5e2' }}>Speed depends on the medium - NOT on frequency. Higher f → shorter λ (at same speed)</div>
      <div className="text-xs text-center" style={{ color: '#a8b8cc' }}>All EM waves travel at 3×10⁸ m/s in vacuum</div>
      <RealityBadge color={WC}>Speed is fixed by the medium - not frequency</RealityBadge>
    </div>
  )
}

// ─── 34. Reflection & Refraction ────────────────────────────────────────────
function WaveReflectionLesson() {
  const [mode, setMode] = useState('reflection')
  return (
    <div className="w-full h-full flex flex-col justify-center gap-2 px-3 py-2">
      <div className="flex gap-2 justify-center">
        {[['reflection', 'Reflection'], ['refraction', 'Refraction']].map(([val, label]) => (
          <button key={val} onClick={() => setMode(val)}
            className="px-3 py-1 rounded-[6px] text-xs font-semibold"
            style={{ background: mode === val ? `${WC}25` : '#1d293d', color: mode === val ? WC : '#a8b8cc', border: `1px solid ${mode === val ? WC : '#2d3f5c'}` }}>
            {label}
          </button>
        ))}
      </div>

      {mode === 'reflection' ? (
        <svg width="260" height="150" viewBox="0 0 260 150">
          {/* Surface / mirror */}
          <line x1="20" y1="90" x2="240" y2="90" stroke="#a8b8cc" strokeWidth="2" />
          {/* Hatch below surface */}
          {[30,50,70,90,110,130,150,170,190,210].map(x => (
            <line key={x} x1={x} y1="90" x2={x - 8} y2="100" stroke="#2d3f5c" strokeWidth="1" />
          ))}
          {/* Normal dashed line */}
          <line x1="130" y1="10" x2="130" y2="140" stroke="#2d3f5c" strokeWidth="1" strokeDasharray="4 3" />
          <text x="134" y="20" fill="#a8b8cc" fontSize={8}>Normal</text>
          {/* Incident ray */}
          <motion.line x1="55" y1="18" x2="130" y2="90" stroke={WC} strokeWidth="2.5" strokeLinecap="round"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6 }} />
          <polygon points="128,86 132,91 122,89" fill={WC} />
          <text x="62" y="40" fill={WC} fontSize={8}>incident ray</text>
          {/* Reflected ray */}
          <motion.line x1="130" y1="90" x2="205" y2="18" stroke="#00bc7d" strokeWidth="2.5" strokeLinecap="round"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.55, duration: 0.6 }} />
          <polygon points="202,21 206,17 200,24" fill="#00bc7d" />
          <text x="172" y="40" fill="#00bc7d" fontSize={8}>reflected ray</text>
          {/* Angle arcs  -  simple wedge labels */}
          <path d="M 116,90 A 14,14 0 0,1 124,78" fill="none" stroke="#c084fc" strokeWidth="1.2" />
          <text x="104" y="79" fill="#c084fc" fontSize={10} fontWeight="bold">i</text>
          <path d="M 136,78 A 14,14 0 0,1 144,90" fill="none" stroke="#00bc7d" strokeWidth="1.2" />
          <text x="145" y="79" fill="#00bc7d" fontSize={10} fontWeight="bold">r</text>
          {/* Label */}
          <text x="130" y="140" textAnchor="middle" fill="#a8b8cc" fontSize={9}>angle i = angle r</text>
        </svg>
      ) : (
        <svg width="260" height="150" viewBox="0 0 260 150">
          {/* Boundary */}
          <line x1="20" y1="75" x2="240" y2="75" stroke="#2b7fff" strokeWidth="1.5" opacity="0.6" />
          {/* Medium labels */}
          <text x="22" y="66" fill="#a8b8cc" fontSize={8}>air (less dense)</text>
          <text x="22" y="90" fill="#2b7fff" fontSize={8}>glass (more dense)</text>
          {/* Normal */}
          <line x1="130" y1="10" x2="130" y2="148" stroke="#2d3f5c" strokeWidth="1" strokeDasharray="4 3" />
          <text x="134" y="20" fill="#a8b8cc" fontSize={8}>Normal</text>
          {/* Incident ray (steep angle from top-left) */}
          <motion.line x1="55" y1="15" x2="130" y2="75" stroke={WC} strokeWidth="2.5" strokeLinecap="round"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6 }} />
          <polygon points="128,71 132,76 122,74" fill={WC} />
          {/* Refracted ray (less steep, bending toward normal) */}
          <motion.line x1="130" y1="75" x2="170" y2="148" stroke={WC} strokeWidth="2.5" strokeLinecap="round"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.55, duration: 0.5 }} />
          <polygon points="168,144 172,149 163,146" fill={WC} />
          {/* Angle labels */}
          <path d="M 116,75 A 14,14 0 0,1 124,63" fill="none" stroke="#c084fc" strokeWidth="1.2" />
          <text x="104" y="64" fill="#c084fc" fontSize={10} fontWeight="bold">i</text>
          <path d="M 134,84 A 14,14 0 0,0 142,76" fill="none" stroke="#00bc7d" strokeWidth="1.2" />
          <text x="144" y="90" fill="#00bc7d" fontSize={10} fontWeight="bold">r</text>
          <text x="155" y="65" fill="#a8b8cc" fontSize={8}>r &lt; i</text>
          {/* Note */}
          <text x="130" y="142" textAnchor="middle" fill="#a8b8cc" fontSize={8}>entering denser medium → bends toward normal, slows down</text>
        </svg>
      )}
    </div>
  )
}
function WaveReflectionIdea() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-4">
      <svg width="190" height="90" viewBox="0 0 190 90">
        {/* Air | Glass boundary */}
        <line x1="95" y1="5" x2="95" y2="85" stroke="#1d293d" strokeWidth="2" strokeDasharray="4 2" />
        <text x="45" y="15" textAnchor="middle" fill="#a8b8cc" fontSize="7">Air</text>
        <text x="145" y="15" textAnchor="middle" fill="#2b7fff" fontSize="7">Glass</text>
        {/* Incoming ray */}
        <motion.line x1="20" y1="15" x2="95" y2="55" stroke={WC} strokeWidth="2"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6 }} />
        {/* Wrong: ray bends AWAY from normal (as if speeding up) */}
        <motion.line x1="95" y1="55" x2="170" y2="20" stroke="#ef4444" strokeWidth="2"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.5, duration: 0.5 }} />
        {/* Normal line */}
        <line x1="95" y1="10" x2="95" y2="85" stroke="#1d293d" strokeWidth="1" strokeDasharray="3 2" />
        <text x="155" y="38" fill="#ef4444" fontSize="7">speeds up?</text>
        <motion.text x="155" y="50" fill="#ef4444" fontSize="12" fontWeight="bold"
          animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 2 }}>✗</motion.text>
        <text x="95" y="84" textAnchor="middle" fill="#a8b8cc" fontSize="7">Glass is "clearer" = faster?</text>
      </svg>
      <IdeaCaption>When light enters glass it speeds up - glass is more transparent so light goes faster</IdeaCaption>
    </div>
  )
}
function WaveReflectionReality() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-4">
      <div className="flex gap-3 text-xs">
        <div className="flex flex-col items-center gap-1 p-2 rounded-[8px]" style={{ background: `${WC}10`, border: `1px solid ${WC}` }}>
          <span style={{ color: WC }}>Into denser</span>
          <span style={{ color: '#cad5e2' }}>Slows down</span>
          <span style={{ color: '#cad5e2' }}>Bends towards normal</span>
        </div>
        <div className="flex flex-col items-center gap-1 p-2 rounded-[8px]" style={{ background: '#c084fc10', border: '1px solid #c084fc' }}>
          <span style={{ color: '#c084fc' }}>Into less dense</span>
          <span style={{ color: '#cad5e2' }}>Speeds up</span>
          <span style={{ color: '#cad5e2' }}>Bends away from normal</span>
        </div>
      </div>
      <RealityBadge color={WC}>Light slows down in denser media like glass</RealityBadge>
    </div>
  )
}

// ─── Total Internal Reflection ──────────────────────────────────────────────
function TotalInternalReflectionLesson() {
  const [angle, setAngle] = useState(0)
  const cases = [
    { label: 'Below critical', desc: 'Angle < critical angle. Light partially refracts into air AND partially reflects back. Most light escapes.', color: WC },
    { label: 'At critical angle', desc: 'Angle = critical angle. Refracted ray travels along the boundary (90°). This is the threshold.', color: '#fdc700' },
    { label: 'TIR', desc: 'Angle > critical angle. ALL light is reflected back into the glass. No refracted ray. This is Total Internal Reflection!', color: '#10b981' },
  ]
  const c = cases[angle]
  return (
    <div className="w-full flex flex-col gap-2 px-3 pt-2 pb-2">
      <svg width="100%" viewBox="0 0 260 130" style={{ background: '#0f1829', borderRadius: 10, border: '1.5px solid #1d293d' }}>
        {/* Glass block (bottom half) */}
        <rect x="0" y="65" width="260" height="65" fill="#1e3a5f" opacity="0.7" />
        <text x="8" y="125" fill="#60a5fa" fontSize="7">Glass (denser)</text>
        <text x="8" y="18" fill="#a8b8cc" fontSize="7">Air (less dense)</text>
        {/* Boundary line */}
        <line x1="0" y1="65" x2="260" y2="65" stroke="#2d3e55" strokeWidth="1.5" strokeDasharray="6 3" />
        {/* Normal */}
        <line x1="130" y1="10" x2="130" y2="125" stroke="#4a5a72" strokeWidth="1" strokeDasharray="3 3" />
        <text x="133" y="20" fill="#4a5a72" fontSize="6">normal</text>
        {/* Incident ray (always from bottom-left) */}
        <line x1="60" y1="115" x2="130" y2="65" stroke={c.color} strokeWidth="2" markerEnd="url(#arrowhead)" />
        {/* Reflected ray (always back into glass) */}
        <line x1="130" y1="65" x2="200" y2="115" stroke={c.color} strokeWidth={angle === 2 ? "2.5" : "1.5"} strokeOpacity={angle === 2 ? 1 : 0.5} />
        {/* Refracted ray (only if below/at critical) */}
        {angle === 0 && <line x1="130" y1="65" x2="175" y2="20" stroke={c.color} strokeWidth="1.5" strokeOpacity="0.8" />}
        {angle === 1 && <line x1="130" y1="65" x2="255" y2="65" stroke="#fdc700" strokeWidth="1.5" strokeDasharray="4 2" />}
        {angle === 2 && <text x="145" y="45" fill="#10b981" fontSize="9" fontWeight="800">TIR!</text>}
        {angle === 0 && <text x="158" y="28" fill={c.color} fontSize="7">refracted</text>}
        {angle === 1 && <text x="180" y="60" fill="#fdc700" fontSize="7">along boundary</text>}
      </svg>
      <div className="flex gap-2">
        {cases.map((ca, i) => (
          <button key={i} onClick={() => setAngle(i)}
            className="flex-1 py-1.5 rounded-[8px] text-xs font-semibold"
            style={{ background: angle===i ? `${ca.color}25` : '#1d293d', color: angle===i ? ca.color : '#a8b8cc', border: `1px solid ${angle===i ? ca.color : '#2a3a52'}`, fontSize: 9 }}>
            {ca.label}
          </button>
        ))}
      </div>
      <div className="px-3 py-2 rounded-[10px] text-xs" style={{ background: `${c.color}10`, border: `1px solid ${c.color}30`, color: '#e2e8f0' }}>
        {c.desc}
      </div>
    </div>
  )
}

function TotalInternalReflectionIdea() {
  return (
    <div className="w-full flex flex-col gap-3 px-4 pt-3 pb-3">
      <FormulaBox formula="sin c = 1 / n" color={WC} />
      <div className="flex flex-col gap-2">
        <div className="px-3 py-2 rounded-[10px]" style={{ background: 'rgba(253,199,0,0.08)', border: '1px solid rgba(253,199,0,0.25)' }}>
          <div className="text-xs font-semibold mb-1" style={{ color: '#fdc700' }}>Two conditions for TIR:</div>
          <div className="text-xs" style={{ color: '#a8b8cc' }}>1. Light travels from denser → less dense medium</div>
          <div className="text-xs" style={{ color: '#a8b8cc' }}>2. Angle of incidence &gt; critical angle</div>
        </div>
        <div className="px-3 py-2 rounded-[10px]" style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.25)' }}>
          <div className="text-xs font-semibold mb-1" style={{ color: '#10b981' }}>Optical fibre</div>
          <div className="text-xs" style={{ color: '#a8b8cc' }}>Light bounces along fibre by repeated TIR. Used for internet, medical endoscopes.</div>
        </div>
      </div>
      <IdeaCaption>c = critical angle; n = refractive index. Glass: c ≈ 42°</IdeaCaption>
    </div>
  )
}

function TotalInternalReflectionReality() {
  return (
    <div className="w-full flex flex-col gap-3 px-4 pt-3 pb-3">
      <RealityBadge emoji="💡" title="Optical fibres and the internet" desc="Optical fibres carry internet data as pulses of light at nearly the speed of light, using TIR to keep the signal inside the fibre. One fibre thinner than a human hair can carry millions of phone calls simultaneously." />
      <RealityBadge emoji="🏥" title="Endoscopes" desc="Doctors use endoscopes — bundles of optical fibres — to see inside the body without surgery. Light travels down one set of fibres; the image returns along another, all via TIR." />
    </div>
  )
}

// ─── 35. Sound & Ultrasound ──────────────────────────────────────────────────
function SoundWavesLesson() {
  return (
    <div className="w-full h-full flex flex-col justify-center gap-2 px-3 py-2">
      <svg width="260" height="90" viewBox="0 0 260 90">
        <text x="130" y="11" textAnchor="middle" fill={WC} fontSize={9} fontWeight="bold">Sound as a Longitudinal Wave</text>
        {/* 7 groups alternating C and R */}
        {[
          { cx: 18,  kind: 'C', n: 4, sp: 3.5 },
          { cx: 52,  kind: 'R', n: 2, sp: 10 },
          { cx: 88,  kind: 'C', n: 4, sp: 3.5 },
          { cx: 130, kind: 'R', n: 2, sp: 10 },
          { cx: 166, kind: 'C', n: 4, sp: 3.5 },
          { cx: 208, kind: 'R', n: 2, sp: 10 },
          { cx: 244, kind: 'C', n: 4, sp: 3.5 },
        ].map((g, gi) => (
          <g key={gi}>
            {Array.from({ length: g.n }, (_, j) => (
              <motion.circle key={j}
                cx={g.cx - ((g.n - 1) * g.sp) / 2 + j * g.sp}
                cy={45} r={4}
                fill={WC} opacity={g.kind === 'C' ? 0.9 : 0.35}
                initial={{ opacity: 0 }} animate={{ opacity: g.kind === 'C' ? 0.9 : 0.35 }}
                transition={{ delay: gi * 0.1 }} />
            ))}
            <text x={g.cx} y={26} textAnchor="middle" fill={g.kind === 'C' ? WC : '#a8b8cc'} fontSize={8}>{g.kind}</text>
          </g>
        ))}
        {/* Direction of travel arrow */}
        <line x1="10" y1="70" x2="248" y2="70" stroke="#2d3f5c" strokeWidth="1" />
        <polygon points="248,67 254,70 248,73" fill={WC} />
        <text x="130" y="82" textAnchor="middle" fill={WC} fontSize={8}>direction of travel →</text>
        {/* Particle vibration */}
        <line x1="100" y1="56" x2="136" y2="56" stroke="#c084fc" strokeWidth="1.2" />
        <polygon points="100,53 94,56 100,59" fill="#c084fc" />
        <polygon points="136,53 142,56 136,59" fill="#c084fc" />
        <text x="155" y="59" fill="#c084fc" fontSize={7}>particle vibration ↔</text>
      </svg>

      <div className="grid grid-cols-2 gap-2">
        {[
          ['Speed in air', '~340 m/s', '#c084fc'],
          ['Speed in water', '~1500 m/s', '#2b7fff'],
          ['Human hearing', '20 Hz – 20 kHz', WC],
          ['Ultrasound', '> 20 kHz', '#00bc7d'],
        ].map(([label, val, col], i) => (
          <div key={i} className="p-2 rounded-[8px]" style={{ background: '#121a2f' }}>
            <div className="text-xs" style={{ color: '#a8b8cc' }}>{label}</div>
            <div className="text-xs font-semibold" style={{ color: col }}>{val}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
function SoundWavesIdea() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-4">
      <div className="flex flex-col gap-1.5 w-full px-2">
        <div className="text-xs font-bold text-center mb-1" style={{ color: '#ef4444' }}>Speed order (wrong):</div>
        {/* Wrong order: air fastest */}
        {[['Air', 100, WC, '330 m/s - fastest?'], ['Water', 60, '#2b7fff', '1500 m/s'], ['Steel', 20, '#00bc7d', '5000 m/s - slowest?']].map(([label, w, col, note]) => (
          <div key={label} className="flex items-center gap-2">
            <span className="text-xs w-10 shrink-0" style={{ color: '#a8b8cc' }}>{label}</span>
            <div className="h-3 rounded-full" style={{ width: w, background: col }} />
            <span className="text-xs" style={{ color: col }}>{note}</span>
          </div>
        ))}
        <motion.div className="text-xs text-center font-bold mt-1" style={{ color: '#ef4444' }}
          animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 2 }}>
          Air fastest?  ✗
        </motion.div>
      </div>
      <IdeaCaption>Sound travels fastest through air because air can be compressed easily</IdeaCaption>
    </div>
  )
}
function SoundWavesReality() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-4">
      <div className="flex flex-col gap-1 w-full">
        {[['Gas (air)', 330, WC, 35], ['Liquid (water)', 1500, '#2b7fff', 60], ['Solid (steel)', 5000, '#00bc7d', 100]].map(([medium, speed, col, pct]) => (
          <div key={medium} className="flex items-center gap-2">
            <span className="text-xs w-24 shrink-0" style={{ color: '#a8b8cc' }}>{medium}</span>
            <div className="flex-1 h-2 rounded-full" style={{ background: '#1d293d' }}>
              <motion.div className="h-full rounded-full" style={{ background: col }}
                initial={{ width: 0 }} animate={{ width: `${pct}%` }}
                transition={{ duration: 0.6 }} />
            </div>
            <span className="text-xs font-mono w-16" style={{ color: col }}>{speed} m/s</span>
          </div>
        ))}
      </div>
      <RealityBadge color={WC}>Sound travels fastest in solids - particles are closest together</RealityBadge>
    </div>
  )
}

// ─── 36. EM Spectrum ─────────────────────────────────────────────────────────
function EMSpectrumLesson() {
  const [selected, setSelected] = useState(null)
  const bands = [
    { name: 'Radio waves', λ: '> 1 m', use: 'TV & radio broadcasting', color: '#6366f1' },
    { name: 'Micro\u00ADwaves', λ: '1mm – 1m', use: 'Satellite comms, radar, cooking', color: '#2b7fff' },
    { name: 'Infrared', λ: '700nm – 1mm', use: 'Thermal imaging, remote controls', color: '#f97316' },
    { name: 'Visible light', λ: '400 – 700nm', use: 'Sight, photography, lasers', color: null },
    { name: 'Ultraviolet', λ: '10 – 400nm', use: 'Sterilisation, fluorescent lamps', color: '#a855f7' },
    { name: 'X\u2011rays', λ: '0.01 – 10nm', use: 'Medical imaging, security scans', color: '#c084fc' },
    { name: 'Gamma rays', λ: '< 0.01nm', use: 'Cancer treatment, sterilising food', color: '#e879f9' },
  ]
  const visColor = (i) => {
    if (bands[i].color) return bands[i].color
    return '#fdc700'
  }
  return (
    <div className="w-full h-full flex flex-col justify-between px-3 py-3" style={{ gap: 0 }}>
      {/* Title row */}
      <div className="text-center text-xs font-bold mb-1" style={{ color: '#f8fafc', letterSpacing: '0.04em' }}>
        The Electromagnetic Spectrum
      </div>

      {/* Band name labels  -  staggered two rows */}
      <div className="flex w-full mb-0.5">
        {bands.map((b, i) => (
          <div key={i} className="flex-1 flex flex-col items-center" style={{ minWidth: 0 }}>
            {i % 2 === 0 ? (
              <div className="text-center leading-tight" style={{ fontSize: 7.5, color: visColor(i), fontWeight: 700, wordBreak: 'break-word' }}>
                {b.name}
              </div>
            ) : <div style={{ height: 12 }} />}
          </div>
        ))}
      </div>
      <div className="flex w-full mb-0.5">
        {bands.map((b, i) => (
          <div key={i} className="flex-1 flex flex-col items-center" style={{ minWidth: 0 }}>
            {i % 2 === 1 ? (
              <div className="text-center leading-tight" style={{ fontSize: 7.5, color: visColor(i), fontWeight: 700, wordBreak: 'break-word' }}>
                {b.name}
              </div>
            ) : <div style={{ height: 12 }} />}
          </div>
        ))}
      </div>

      {/* Spectrum bar */}
      <div className="flex w-full rounded-[6px] overflow-hidden mb-1" style={{ height: 28 }}>
        {bands.map((b, i) => (
          <button
            key={i}
            className="flex-1"
            style={{
              background: i === 3
                ? 'linear-gradient(to right, #ef4444, #f97316, #fdc700, #00bc7d, #2b7fff, #6366f1, #a855f7)'
                : b.color,
              opacity: selected === null || selected === i ? 1 : 0.45,
              transition: 'opacity 0.15s',
              border: selected === i ? '2px solid #fff' : '2px solid transparent',
              boxSizing: 'border-box',
            }}
            onClick={() => setSelected(selected === i ? null : i)}
          />
        ))}
      </div>

      {/* Wavelength scale */}
      <div className="flex w-full mb-1">
        {bands.map((b, i) => (
          <div key={i} className="flex-1 text-center" style={{ fontSize: 7, color: '#a8b8cc', lineHeight: 1.2 }}>
            {b.λ}
          </div>
        ))}
      </div>

      {/* Direction arrows */}
      <div className="flex justify-between mb-1" style={{ fontSize: 8, color: '#a8b8cc' }}>
        <span>← longer λ, lower f</span>
        <span>shorter λ, higher f →</span>
      </div>

      {/* Selected band details */}
      {selected !== null ? (
        <motion.div
          className="rounded-[10px] px-3 py-2"
          style={{ background: `${visColor(selected)}15`, border: `1px solid ${visColor(selected)}50` }}
          initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-xs font-bold mb-0.5" style={{ color: visColor(selected) }}>{bands[selected].name}</div>
          <div style={{ fontSize: 10, color: '#cad5e2' }}>λ = {bands[selected].λ}</div>
          <div style={{ fontSize: 10, color: '#a8b8cc' }}>Use: {bands[selected].use}</div>
        </motion.div>
      ) : (
        <div className="text-center" style={{ fontSize: 9, color: '#a8b8cc' }}>
          Tap a band for details
        </div>
      )}

      {/* Speed note */}
      <div className="text-center mt-1" style={{ fontSize: 9, color: '#a8b8cc' }}>
        All travel at <span style={{ color: '#f8fafc', fontFamily: 'monospace' }}>3×10⁸ m/s</span> in a vacuum
      </div>
    </div>
  )
}
function EMSpectrumIdea() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-4">
      <div className="flex flex-col items-center gap-2 w-full px-2">
        {/* Tiny visible band claimed to be "all" */}
        <div className="w-full flex rounded-[6px] overflow-hidden h-6 relative">
          {['#8b5cf6','#2b7fff','#00bc7d','#fdc700','#f97316','#ef4444'].map((col, i) => (
            <div key={i} className="flex-1" style={{ background: col }} />
          ))}
        </div>
        <motion.div className="text-xs text-center font-bold px-2 py-1 rounded-[6px]" style={{ background: '#ef444415', border: '1px solid #ef4444', color: '#ef4444' }}
          animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 2 }}>
          This IS the whole EM spectrum?  ✗
        </motion.div>
        <div className="text-xs text-center" style={{ color: '#a8b8cc' }}>7 types - visible is a tiny slice</div>
      </div>
      <IdeaCaption>Visible light is the entire EM spectrum - it's just different colours</IdeaCaption>
    </div>
  )
}
function EMSpectrumReality() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-4">
      <div className="w-full flex rounded-[6px] overflow-hidden h-5">
        {['#6366f1', '#2b7fff', '#f97316', '#00bc7d', '#fdc700', '#c084fc', '#e879f9'].map((col, i) => (
          <div key={i} className="flex-1" style={{ background: col }} />
        ))}
      </div>
      <div className="text-xs text-center" style={{ color: '#cad5e2' }}>Visible light is a tiny slice. Radio waves are millions of times longer than gamma rays</div>
      <RealityBadge color={WC}>EM spectrum spans 7+ types - visible is just 400–700nm</RealityBadge>
    </div>
  )
}

// ─── 37. Lenses ──────────────────────────────────────────────────────────────
function LensesLesson() {
  const [type, setType] = useState('convex')
  return (
    <div className="w-full h-full flex flex-col justify-center gap-2 px-3 py-2">
      <div className="flex gap-2 justify-center">
        {[['convex', 'Convex'], ['concave', 'Concave']].map(([val, label]) => (
          <button key={val} onClick={() => setType(val)}
            className="px-3 py-1 rounded-[6px] text-xs font-semibold"
            style={{ background: type === val ? `${WC}25` : '#1d293d', color: type === val ? WC : '#a8b8cc', border: `1px solid ${type === val ? WC : '#2d3f5c'}` }}>
            {label}
          </button>
        ))}
      </div>

      {type === 'convex' ? (
        <svg width="260" height="150" viewBox="0 0 260 150">
          <text x="130" y="12" textAnchor="middle" fill={WC} fontSize={9} fontWeight="bold">converging lens</text>
          {/* Optical axis */}
          <line x1="10" y1="75" x2="250" y2="75" stroke="#2d3f5c" strokeWidth="1" strokeDasharray="4 3" />
          {/* Biconvex lens shape */}
          <motion.path d="M120 30 Q145 75 120 120 Q95 75 120 30" fill={`${WC}18`} stroke={WC} strokeWidth="2"
            key="cvx" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5 }} />
          {/* 3 parallel incident rays */}
          {[55, 75, 95].map((y, i) => (
            <g key={i}>
              <motion.line x1="10" y1={y} x2="120" y2={y} stroke="#2b7fff" strokeWidth="1.8" strokeLinecap="round"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.3, duration: 0.5 }} />
              <motion.line x1="120" y1={y} x2="200" y2="75" stroke="#2b7fff" strokeWidth="1.8" strokeLinecap="round"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.7, duration: 0.45 }} />
            </g>
          ))}
          {/* Focal point F */}
          <circle cx="200" cy="75" r="5" fill="#ef4444" />
          <text x="207" y="70" fill="#ef4444" fontSize={9} fontWeight="bold">F</text>
          {/* 2F marker */}
          <line x1="240" y1="71" x2="240" y2="79" stroke="#a8b8cc" strokeWidth="1" />
          <text x="236" y="68" fill="#a8b8cc" fontSize={8}>2F</text>
          <text x="130" y="143" textAnchor="middle" fill="#a8b8cc" fontSize={8}>parallel rays converge at focal point F</text>
        </svg>
      ) : (
        <svg width="260" height="150" viewBox="0 0 260 150">
          <text x="130" y="12" textAnchor="middle" fill={WC} fontSize={9} fontWeight="bold">diverging lens</text>
          {/* Optical axis */}
          <line x1="10" y1="75" x2="250" y2="75" stroke="#2d3f5c" strokeWidth="1" strokeDasharray="4 3" />
          {/* Biconcave lens shape */}
          <motion.path d="M120 30 Q108 75 120 120 Q132 75 120 30" fill={`${WC}18`} stroke={WC} strokeWidth="2"
            key="ccv" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5 }} />
          {/* 3 parallel rays that diverge after lens */}
          {[55, 75, 95].map((y, i) => {
            const dy = y - 75
            const endY = 75 + dy * 2.5
            return (
              <g key={i}>
                <motion.line x1="10" y1={y} x2="120" y2={y} stroke="#2b7fff" strokeWidth="1.8" strokeLinecap="round"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.3, duration: 0.5 }} />
                <motion.line x1="120" y1={y} x2="248" y2={Math.min(Math.max(endY, 10), 148)} stroke="#2b7fff" strokeWidth="1.8" strokeLinecap="round"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.7, duration: 0.45 }} />
                {/* Dashed extension back to virtual focal point at x≈60 */}
                <line x1="120" y1={y} x2="60" y2="75" stroke="#2b7fff" strokeWidth="1" strokeDasharray="3 2" opacity="0.5" />
              </g>
            )
          })}
          {/* Virtual focal point */}
          <circle cx="60" cy="75" r="5" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="2 2" />
          <text x="26" y="70" fill="#ef4444" fontSize={8}>F (virtual)</text>
          <text x="130" y="143" textAnchor="middle" fill="#a8b8cc" fontSize={8}>rays diverge  -  virtual focal point on same side</text>
        </svg>
      )}
    </div>
  )
}
function LensesIdea() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-4">
      <div className="flex gap-3 items-start">
        <div className="flex flex-col items-center gap-1 p-2 rounded-[8px]" style={{ background: `${WC}10`, border: `1px solid ${WC}` }}>
          <span className="text-xs font-bold" style={{ color: WC }}>Convex</span>
          <span className="text-lg">🙃</span>
          <span className="text-xs text-center" style={{ color: '#cad5e2' }}>inverted</span>
        </div>
        <div className="flex flex-col items-center gap-1 p-2 rounded-[8px]" style={{ background: '#ef444415', border: '1px solid #ef4444' }}>
          <span className="text-xs font-bold" style={{ color: '#ef4444' }}>Concave</span>
          <span className="text-lg">🙃</span>
          <span className="text-xs text-center" style={{ color: '#ef4444' }}>inverted? ✗</span>
        </div>
      </div>
      <IdeaCaption>Concave lenses produce small, upside-down images - just like convex ones do</IdeaCaption>
    </div>
  )
}
function LensesReality() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-4">
      <div className="flex gap-3">
        <div className="flex flex-col items-center gap-1 p-2 rounded-[8px]" style={{ background: `${WC}10`, border: `1px solid ${WC}` }}>
          <span className="text-xs font-bold" style={{ color: WC }}>Convex</span>
          <span className="text-xs text-center" style={{ color: '#cad5e2' }}>Converging<br/>Real OR virtual<br/>image</span>
        </div>
        <div className="flex flex-col items-center gap-1 p-2 rounded-[8px]" style={{ background: '#c084fc10', border: '1px solid #c084fc' }}>
          <span className="text-xs font-bold" style={{ color: '#c084fc' }}>Concave</span>
          <span className="text-xs text-center" style={{ color: '#cad5e2' }}>Diverging<br/>Always virtual,<br/>upright image</span>
        </div>
      </div>
      <RealityBadge color={WC}>Concave lenses always produce virtual, upright, diminished images</RealityBadge>
    </div>
  )
}

// ─── 38. Black Body Radiation ────────────────────────────────────────────────
function BlackBodyLesson() {
  const [temp, setTemp] = useState(5500)
  const getColor = (t) => {
    if (t < 2000) return { hex: '#8b1a1a', name: 'Red hot' }
    if (t < 3000) return { hex: '#ff6600', name: 'Orange' }
    if (t < 4000) return { hex: '#ffaa00', name: 'Orange-yellow' }
    if (t < 5000) return { hex: '#ffdd00', name: 'Yellow' }
    if (t < 6000) return { hex: '#fffaaa', name: 'Yellow-white' }
    if (t < 8000) return { hex: '#ffffff', name: 'White' }
    return { hex: '#aaddff', name: 'Blue-white' }
  }
  const { hex, name } = getColor(temp)
  // peak wavelength proxy: map 1000K→700nm, 10000K→100nm linearly for spectrum bar
  const peakFrac = 1 - (temp - 1000) / 9000  // 0=blue end, 1=red end
  const peakPct = Math.round(peakFrac * 100)
  return (
    <div className="w-full h-full flex flex-col justify-center gap-2 px-3 py-2">
      <div className="flex items-center gap-4 justify-center">
        <motion.div className="rounded-full flex items-center justify-center shrink-0"
          style={{ width: 60, height: 60, background: `radial-gradient(circle, ${hex}, ${hex}80)`, boxShadow: `0 0 ${Math.round(temp / 300)}px ${hex}` }}
          animate={{ scale: [1, 1.04, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
        </motion.div>
        <div className="flex flex-col gap-1">
          <div className="text-sm font-bold" style={{ color: hex === '#ffffff' ? '#cad5e2' : hex }}>{name}</div>
          <div className="text-xs" style={{ color: '#a8b8cc' }}>{temp.toLocaleString()} K</div>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex justify-between text-xs">
          <span style={{ color: '#a8b8cc' }}>Temperature (K)</span>
          <span style={{ color: WC }}>{temp.toLocaleString()} K</span>
        </div>
        <input type="range" min="1000" max="10000" step="500" value={temp}
          onChange={e => setTemp(+e.target.value)} className="w-full" style={{ accentColor: WC }} />
      </div>

      {/* Spectrum bar with peak marker */}
      <div className="flex flex-col gap-1">
        <div className="text-xs" style={{ color: '#a8b8cc' }}>Peak wavelength position:</div>
        <div className="relative w-full h-5 rounded-[4px] overflow-hidden"
          style={{ background: 'linear-gradient(to right, #7c3aed, #2b7fff, #00bc7d, #fdc700, #f97316, #ef4444)' }}>
          <div className="absolute top-0 bottom-0 w-0.5 bg-white"
            style={{ left: `${100 - peakPct}%`, boxShadow: '0 0 4px white' }} />
        </div>
        <div className="flex justify-between text-xs" style={{ color: '#a8b8cc' }}>
          <span>← UV / short λ</span>
          <span>long λ / IR →</span>
        </div>
      </div>

      <div className="text-xs text-center" style={{ color: '#a8b8cc' }}>
        Wien's law: hotter → shorter peak λ → bluer colour
        {temp >= 5000 && temp <= 6000 && <span style={{ color: WC }}> ☀ Sun ≈ 5500 K → yellow-white</span>}
      </div>
    </div>
  )
}
function BlackBodyIdea() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-4">
      <div className="flex gap-4 items-center">
        {/* Sun: glowing */}
        <div className="flex flex-col items-center gap-1">
          <motion.div className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ background: 'radial-gradient(circle, #fdc700, #f97316)', boxShadow: '0 0 16px #fdc70080' }}
            animate={{ scale: [1, 1.08, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
            <span className="text-xs font-bold text-white">Sun</span>
          </motion.div>
          <span className="text-xs" style={{ color: '#fdc700' }}>✓ radiates</span>
        </div>
        {/* Ice cube: no glow (wrong label) */}
        <div className="flex flex-col items-center gap-1">
          <div className="w-12 h-12 rounded-[8px] flex items-center justify-center"
            style={{ background: '#2b7fff20', border: '2px solid #2b7fff' }}>
            <span className="text-xs font-bold" style={{ color: '#2b7fff' }}>Ice</span>
          </div>
          <span className="text-xs font-bold" style={{ color: '#ef4444' }}>nothing? ✗</span>
        </div>
      </div>
      <IdeaCaption>Only very hot objects like the Sun emit radiation - cold objects don't emit anything</IdeaCaption>
    </div>
  )
}
function BlackBodyReality() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-4">
      <div className="text-xs text-center p-2 rounded-[10px]" style={{ background: `${WC}10`, border: `1px solid ${WC}30`, color: '#cad5e2' }}>
        Every object above absolute zero (−273°C) emits infrared radiation. A human body at 37°C constantly emits IR.
      </div>
      <div className="text-xs text-center" style={{ color: '#a8b8cc' }}>At constant temperature: emission rate = absorption rate</div>
      <RealityBadge color={WC}>All objects emit IR - hotter objects emit more and at shorter wavelengths</RealityBadge>
    </div>
  )
}

// ─── 39. Magnetism ───────────────────────────────────────────────────────────
function MagnetismLesson() {
  const [view, setView] = useState('bar')
  return (
    <div className="w-full h-full flex flex-col justify-center gap-2 px-3 py-2">
      <div className="flex gap-2 justify-center">
        {[['bar', 'Bar Magnet'], ['electro', 'Electromagnet']].map(([val, label]) => (
          <button key={val} onClick={() => setView(val)}
            className="px-3 py-1 rounded-[6px] text-xs font-semibold"
            style={{ background: view === val ? `${MC}25` : '#1d293d', color: view === val ? MC : '#a8b8cc', border: `1px solid ${view === val ? MC : '#2d3f5c'}` }}>
            {label}
          </button>
        ))}
      </div>

      {view === 'bar' ? (
        <svg width="260" height="160" viewBox="0 0 260 160">
          {/* Bar magnet  -  horizontal, centered */}
          <rect x="80" y="67" width="50" height="26" rx="4" fill="#2b7fff30" stroke="#2b7fff" strokeWidth="1.5" />
          <text x="105" y="84" textAnchor="middle" fill="#2b7fff" fontSize={12} fontWeight="bold">N</text>
          <rect x="130" y="67" width="50" height="26" rx="4" fill="#ef444430" stroke="#ef4444" strokeWidth="1.5" />
          <text x="155" y="84" textAnchor="middle" fill="#ef4444" fontSize={12} fontWeight="bold">S</text>
          {/* Field lines  -  curved from N to S outside the magnet */}
          {[
            "M105 67 C105 40 155 40 155 67",
            "M105 67 C85 30 175 30 155 67",
            "M105 93 C105 120 155 120 155 93",
            "M105 93 C85 130 175 130 155 93",
          ].map((d, i) => (
            <motion.path key={i} d={d} fill="none" stroke={MC} strokeWidth="1.5" opacity="0.8"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ delay: i * 0.18, duration: 0.7 }} />
          ))}
          {/* Arrow markers mid-line on top outer curve */}
          <polygon points="132,37 130,32 128,37" fill={MC} opacity="0.8" />
          <polygon points="132,123 130,128 128,123" fill={MC} opacity="0.8" />
          {/* Labels */}
          <text x="130" y="20" textAnchor="middle" fill="#a8b8cc" fontSize={8}>field lines from N to S (outside)</text>
          <text x="130" y="148" textAnchor="middle" fill="#a8b8cc" fontSize={8}>field strongest at poles (lines closer)</text>
        </svg>
      ) : (
        <svg width="260" height="160" viewBox="0 0 260 160">
          {/* Battery symbol */}
          <line x1="18" y1="78" x2="18" y2="68" stroke="#a8b8cc" strokeWidth="2" />
          <line x1="14" y1="68" x2="22" y2="68" stroke="#a8b8cc" strokeWidth="1.5" />
          <line x1="12" y1="74" x2="24" y2="74" stroke="#a8b8cc" strokeWidth="3" />
          <text x="18" y="95" textAnchor="middle" fill="#a8b8cc" fontSize={7}>bat.</text>
          {/* Wire from battery to coil */}
          <line x1="18" y1="78" x2="18" y2="100" stroke="#a8b8cc" strokeWidth="1.5" />
          <line x1="18" y1="100" x2="70" y2="100" stroke="#a8b8cc" strokeWidth="1.5" />
          {/* Iron core */}
          <rect x="70" y="70" width="120" height="20" rx="3" fill="#1d293d" stroke="#a8b8cc" strokeWidth="1.5" />
          <text x="130" y="83" textAnchor="middle" fill="#a8b8cc" fontSize={8}>iron core</text>
          {/* Coil wire squiggles on top */}
          {[75,90,105,120,135,150,165,180].map((x, i) => (
            <path key={i} d={`M${x},70 Q${x+4},62 ${x+8},70`} fill="none" stroke="#f97316" strokeWidth="1.5" />
          ))}
          {/* Coil wire squiggles on bottom */}
          {[75,90,105,120,135,150,165,180].map((x, i) => (
            <path key={i} d={`M${x},90 Q${x+4},98 ${x+8},90`} fill="none" stroke="#f97316" strokeWidth="1.5" />
          ))}
          {/* Field lines outside */}
          {[
            "M70 70 C70 40 190 40 190 70",
            "M70 90 C70 120 190 120 190 90",
          ].map((d, i) => (
            <motion.path key={i} d={d} fill="none" stroke={MC} strokeWidth="1.5" opacity="0.7"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ delay: i * 0.25, duration: 0.8 }} />
          ))}
          <polygon points="132,37 130,32 128,37" fill={MC} opacity="0.8" />
          <polygon points="132,123 130,128 128,123" fill={MC} opacity="0.8" />
          <text x="130" y="18" textAnchor="middle" fill="#a8b8cc" fontSize={8}>current through wire creates magnetic field</text>
          <text x="130" y="148" textAnchor="middle" fill="#a8b8cc" fontSize={7}>more turns / more current = stronger field</text>
        </svg>
      )}
    </div>
  )
}
function MagnetismIdea() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-4">
      <div className="flex items-center gap-3">
        <div className="px-3 py-3 rounded-[8px] font-bold text-sm" style={{ background: '#e879f920', border: '2px solid #e879f9', color: '#e879f9' }}>N</div>
        {/* Gap between magnets */}
        <div className="flex flex-col items-center gap-0.5">
          <span className="text-xs" style={{ color: '#a8b8cc' }}>← gap →</span>
          <motion.div className="text-xs font-bold" style={{ color: '#ef4444' }}
            animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5 }}>
            no force?  ✗
          </motion.div>
        </div>
        <div className="px-3 py-3 rounded-[8px] font-bold text-sm" style={{ background: '#2b7fff20', border: '2px solid #2b7fff', color: '#2b7fff' }}>S</div>
      </div>
      <IdeaCaption>Magnetic force only acts when magnets physically touch - they need contact</IdeaCaption>
    </div>
  )
}
function MagnetismReality() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-4">
      <div className="flex items-center gap-3">
        <div className="px-3 py-2 rounded font-bold text-sm" style={{ background: '#e879f920', color: '#e879f9' }}>N</div>
        <motion.div className="flex gap-1" animate={{ scaleX: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 1 }}>
          {[1, 2, 3].map(i => <div key={i} className="w-1 h-1 rounded-full" style={{ background: MC }} />)}
        </motion.div>
        <div className="px-3 py-2 rounded font-bold text-sm" style={{ background: '#2b7fff20', color: '#2b7fff' }}>S</div>
      </div>
      <div className="text-xs text-center" style={{ color: '#cad5e2' }}>Magnetic field extends through space - no contact needed. Iron, steel, nickel, cobalt are magnetic materials.</div>
      <RealityBadge color={MC}>Magnetic field is a non-contact force - acts at a distance</RealityBadge>
    </div>
  )
}

// ─── 40. Motor Effect ────────────────────────────────────────────────────────
function MotorEffectLesson() {
  return (
    <div className="w-full h-full flex flex-col justify-center gap-2 px-3 py-2">
      <div className="text-xs font-semibold text-center" style={{ color: MC }}>Fleming's Left Hand Rule</div>
      <svg width="250" height="180" viewBox="0 0 250 180">
        {/* Background panel */}
        <rect x="10" y="8" width="230" height="130" rx="10" fill="#1d293d" stroke="#2d3f5c" strokeWidth="1.2" />
        {/* ThuMb arrow  -  pointing UP (Force / Motion) */}
        <line x1="80" y1="110" x2="80" y2="28" stroke="#00bc7d" strokeWidth="4" strokeLinecap="round" />
        <polygon points="74,32 80,18 86,32" fill="#00bc7d" />
        <text x="54" y="16" fill="#00bc7d" fontSize={9} fontWeight="bold">Force</text>
        <text x="56" y="26" fill="#00bc7d" fontSize={8}>(thuMb)</text>
        {/* Index finger arrow  -  pointing RIGHT (Field B) */}
        <line x1="80" y1="110" x2="178" y2="110" stroke="#2b7fff" strokeWidth="4" strokeLinecap="round" />
        <polygon points="174,104 190,110 174,116" fill="#2b7fff" />
        <text x="152" y="103" fill="#2b7fff" fontSize={9} fontWeight="bold">Field B</text>
        <text x="152" y="113" fill="#2b7fff" fontSize={8}>(index)</text>
        {/* Middle finger arrow  -  pointing toward viewer (out of plane) shown as angled */}
        <line x1="80" y1="110" x2="34" y2="130" stroke="#f97316" strokeWidth="4" strokeLinecap="round" />
        <polygon points="38,122 26,138 30,126" fill="#f97316" />
        <text x="10" y="151" fill="#f97316" fontSize={9} fontWeight="bold">Current I</text>
        <text x="10" y="161" fill="#f97316" fontSize={8}>(middle)</text>
        {/* Origin dot */}
        <circle cx="80" cy="110" r="5" fill="#a8b8cc" />
        {/* FBI reminder */}
        <text x="130" y="150" textAnchor="middle" fill="#a8b8cc" fontSize={8}>FBI: Field=Index, Current=Middle, Force=thuMb</text>
      </svg>
      <FormulaBox formula="F = BIL" color={MC} />
      <div className="text-xs text-center" style={{ color: '#a8b8cc' }}>B in Tesla · I in Amps · L in metres</div>
    </div>
  )
}
function MotorEffectIdea() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-4">
      <svg width="190" height="80" viewBox="0 0 190 80">
        {/* Parallel B and I - wrong: claimed to give force */}
        <text x="10" y="18" fill="#e879f9" fontSize="8">B field →</text>
        <line x1="60" y1="15" x2="170" y2="15" stroke="#e879f9" strokeWidth="2" markerEnd="url(#arr)" />
        <text x="10" y="38" fill={MC} fontSize="8">Current →</text>
        <line x1="60" y1="35" x2="170" y2="35" stroke={MC} strokeWidth="2" markerEnd="url(#arr)" />
        {/* Wrong: force arrow pointing up */}
        <motion.line x1="115" y1="35" x2="115" y2="55" stroke="#ef4444" strokeWidth="2"
          animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5 }} />
        <text x="120" y="55" fill="#ef4444" fontSize="7">force?</text>
        <text x="95" y="72" textAnchor="middle" fill="#ef4444" fontSize="8">Same direction = max force?  ✗</text>
      </svg>
      <IdeaCaption>B field and current pointing the same direction creates maximum force</IdeaCaption>
    </div>
  )
}
function MotorEffectReality() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-4">
      <div className="text-xs text-center p-2 rounded-[10px]" style={{ background: `${MC}10`, border: `1px solid ${MC}30`, color: '#cad5e2' }}>
        Force is maximum when current is perpendicular to the magnetic field. Force is zero when current is parallel to the field.
      </div>
      <RealityBadge color={MC}>Force requires current to be at an angle to the field - perpendicular gives maximum force</RealityBadge>
    </div>
  )
}

// ─── Electromagnetism ────────────────────────────────────────────────────────
function ElectromagnetismLesson() {
  const [mode, setMode] = useState(0)
  const modes = [
    { label: 'No current', desc: 'No current → no magnetic field. The wire is just a conductor.', fieldLines: 0 },
    { label: 'Current on', desc: 'Current flows → circular magnetic field forms around the wire. In a solenoid, fields from each turn add together.', fieldLines: 3 },
    { label: '+ Iron core', desc: 'Soft iron core concentrates field lines dramatically — much stronger electromagnet. Used in MRI, relays, motors.', fieldLines: 6 },
  ]
  const m = modes[mode]
  return (
    <div className="w-full flex flex-col gap-2 px-3 pt-2 pb-2">
      {/* Solenoid SVG */}
      <svg width="100%" viewBox="0 0 260 100" style={{ background: '#0f1829', borderRadius: 10, border: '1.5px solid #1d293d' }}>
        {/* Iron core (mode 2) */}
        {mode === 2 && <rect x="40" y="38" width="180" height="24" rx="4" fill="#64748b" opacity="0.6" />}
        {/* Coil turns */}
        {[0,1,2,3,4,5,6,7].map(i => (
          <ellipse key={i} cx={50 + i*22} cy="50" rx="6" ry="16"
            fill="none" stroke={mode > 0 ? MC : '#2d3e55'} strokeWidth={mode > 0 ? "2" : "1.5"} />
        ))}
        {/* Field lines coming out of left end (N pole) */}
        {mode > 0 && Array.from({length: m.fieldLines}).map((_, i) => {
          const spread = (i - (m.fieldLines-1)/2) * (m.fieldLines > 3 ? 10 : 14)
          return <path key={i} d={`M38,${50+spread} Q15,${50+spread*1.5} 5,${50+spread*2}`} fill="none" stroke={MC} strokeWidth="1.2" strokeOpacity="0.7" markerEnd="url(#arr)" />
        })}
        {/* Pole labels */}
        {mode > 0 && <>
          <text x="4" y="28" fill={MC} fontSize="9" fontWeight="800">N</text>
          <text x="226" y="28" fill="#ef4444" fontSize="9" fontWeight="800">S</text>
        </>}
        {mode === 2 && <text x="90" y="54" fill="#e2e8f0" fontSize="7" fontWeight="600">iron core</text>}
      </svg>
      {/* Mode buttons */}
      <div className="flex gap-2">
        {modes.map((mo, i) => (
          <button key={i} onClick={() => setMode(i)}
            className="flex-1 py-1.5 rounded-[8px] text-xs font-semibold"
            style={{ background: mode===i ? `${MC}25` : '#1d293d', color: mode===i ? MC : '#a8b8cc', border: `1px solid ${mode===i ? MC : '#2a3a52'}`, fontSize: 9 }}>
            {mo.label}
          </button>
        ))}
      </div>
      <div className="px-3 py-2 rounded-[10px] text-xs" style={{ background: `${MC}10`, border: `1px solid ${MC}30`, color: '#e2e8f0' }}>
        {m.desc}
      </div>
    </div>
  )
}

function ElectromagnetismIdea() {
  const factors = [
    { factor: '↑ Current', effect: '↑ Field strength', color: '#10b981' },
    { factor: '↑ Turns', effect: '↑ Field strength', color: '#10b981' },
    { factor: 'Iron core', effect: '↑↑ Field strength', color: '#fdc700' },
    { factor: 'Thicker wire', effect: 'No effect', color: '#ef4444' },
  ]
  return (
    <div className="w-full flex flex-col gap-3 px-4 pt-3 pb-3">
      <FormulaBox formula="Solenoid = Bar Magnet" color={MC} />
      <div className="flex flex-col gap-1.5">
        {factors.map((f, i) => (
          <div key={i} className="flex items-center justify-between px-3 py-1.5 rounded-[8px]" style={{ background: 'rgba(18,26,47,0.9)', border: '0.75px solid #1d293d' }}>
            <span className="text-xs font-semibold" style={{ color: '#f8fafc' }}>{f.factor}</span>
            <span className="text-xs font-bold" style={{ color: f.color }}>{f.effect}</span>
          </div>
        ))}
      </div>
      <IdeaCaption>Applications: electric bell, relay switch, loudspeaker, MRI scanner</IdeaCaption>
    </div>
  )
}

function ElectromagnetismReality() {
  return (
    <div className="w-full flex flex-col gap-3 px-4 pt-3 pb-3">
      <RealityBadge emoji="🧲" title="MRI Scanners" desc="MRI machines use superconducting electromagnets producing fields ~30,000× stronger than Earth's. The magnetic field is created by current in coils of wire cooled to near absolute zero." />
      <RealityBadge emoji="🔔" title="Electric bell" desc="When the circuit is closed, the electromagnet attracts the iron hammer, which hits the bell. This breaks the circuit, the electromagnet switches off, the hammer resets — repeating rapidly." />
    </div>
  )
}

// ─── 41. EM Induction & Transformers ────────────────────────────────────────
function EMInductionLesson() {
  const [mode, setMode] = useState('generator')
  const [turns, setTurns] = useState(2)   // ns/np ratio
  const Vs = Math.round(230 * turns)
  const stepType = turns > 1 ? 'step-up' : turns < 1 ? 'step-down' : 'equal'
  return (
    <div className="w-full h-full flex flex-col justify-center gap-2 px-3 py-2">
      <div className="flex gap-2 justify-center">
        {[['generator', 'Generator'], ['transformer', 'Transformer']].map(([val, label]) => (
          <button key={val} onClick={() => setMode(val)}
            className="px-3 py-1 rounded-[6px] text-xs font-semibold"
            style={{ background: mode === val ? `${MC}25` : '#1d293d', color: mode === val ? MC : '#a8b8cc', border: `1px solid ${mode === val ? MC : '#2d3f5c'}` }}>
            {label}
          </button>
        ))}
      </div>

      {mode === 'generator' ? (
        <svg width="260" height="160" viewBox="0 0 260 160">
          {/* N and S poles */}
          <rect x="20" y="50" width="34" height="60" rx="4" fill="#2b7fff25" stroke="#2b7fff" strokeWidth="1.5" />
          <text x="37" y="84" textAnchor="middle" fill="#2b7fff" fontSize={12} fontWeight="bold">N</text>
          <rect x="190" y="50" width="34" height="60" rx="4" fill="#ef444425" stroke="#ef4444" strokeWidth="1.5" />
          <text x="207" y="84" textAnchor="middle" fill="#ef4444" fontSize={12} fontWeight="bold">S</text>
          {/* Rotating coil rectangle */}
          <motion.rect x="98" y="55" width="58" height="50" rx="3" fill="#1d293d" stroke={MC} strokeWidth="2"
            animate={{ scaleX: [1, 0.3, 1, 0.3, 1], scaleY: [1, 1.1, 1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            style={{ transformOrigin: '127px 80px' }} />
          <text x="127" y="83" textAnchor="middle" fill={MC} fontSize={8}>coil</text>
          {/* Curved rotation arrows */}
          <path d="M 108 50 Q 127 35 146 50" fill="none" stroke="#a8b8cc" strokeWidth="1.2" />
          <polygon points="146,50 142,44 150,46" fill="#a8b8cc" />
          {/* AC output line */}
          <line x1="127" y1="105" x2="127" y2="130" stroke={MC} strokeWidth="1.5" />
          <line x1="110" y1="130" x2="250" y2="130" stroke={MC} strokeWidth="1.5" />
          {/* Mini sine wave as AC output */}
          {Array.from({ length: 40 }, (_, i) => {
            const x = 120 + i * 3
            const y = 130 + 6 * Math.sin((i / 40) * Math.PI * 4)
            return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`
          }).join(' ')}
          <motion.path d={Array.from({ length: 40 }, (_, i) => {
            const x = 130 + i * 3
            const y = 142 + 6 * Math.sin((i / 40) * Math.PI * 4)
            return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`
          }).join(' ')} fill="none" stroke={MC} strokeWidth="1.5"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ repeat: Infinity, duration: 1.5 }} />
          <text x="246" y="146" fill={MC} fontSize={8}>AC</text>
          <text x="127" y="18" textAnchor="middle" fill="#a8b8cc" fontSize={8}>rotating coil cuts field lines → EMF induced</text>
          <text x="127" y="30" textAnchor="middle" fill="#a8b8cc" fontSize={7}>faster / stronger field / more turns → greater EMF</text>
        </svg>
      ) : (
        <>
          <svg width="260" height="130" viewBox="0 0 260 130">
            {/* Primary coil */}
            <rect x="15" y="45" width="70" height="40" rx="4" fill="#1d293d" stroke="#2b7fff" strokeWidth="1.8" />
            {[20,30,40,50,60,70,80].map((x, i) => (
              <path key={i} d={`M${x},45 Q${x+4},37 ${x+8},45`} fill="none" stroke="#2b7fff" strokeWidth="1.5" />
            ))}
            <text x="50" y="72" textAnchor="middle" fill="#2b7fff" fontSize={7.5}>Primary (nₚ turns)</text>
            {/* Iron core */}
            <rect x="85" y="55" width="80" height="20" rx="2" fill="#a8b8cc" opacity="0.3" stroke="#a8b8cc" strokeWidth="1" />
            <text x="125" y="68" textAnchor="middle" fill="#a8b8cc" fontSize={7}>iron core</text>
            {/* Secondary coil */}
            <rect x="165" y="45" width="70" height="40" rx="4" fill="#1d293d" stroke="#00bc7d" strokeWidth="1.8" />
            {[170,180,190,200,210,220,230].map((x, i) => (
              <path key={i} d={`M${x},45 Q${x+4},37 ${x+8},45`} fill="none" stroke="#00bc7d" strokeWidth="1.5" />
            ))}
            <text x="200" y="72" textAnchor="middle" fill="#00bc7d" fontSize={7.5}>Secondary (nₛ turns)</text>
            {/* AC supply arrow */}
            <line x1="5" y1="65" x2="15" y2="65" stroke="#2b7fff" strokeWidth="1.5" />
            <polygon points="13,62 18,65 13,68" fill="#2b7fff" />
            <text x="5" y="55" fill="#2b7fff" fontSize={7}>AC in</text>
            {/* Output arrow */}
            <line x1="235" y1="65" x2="252" y2="65" stroke="#00bc7d" strokeWidth="1.5" />
            <polygon points="248,62 254,65 248,68" fill="#00bc7d" />
            <text x="238" y="55" fill="#00bc7d" fontSize={7}>out</text>
            {/* Formula */}
            <text x="130" y="110" textAnchor="middle" fill={WC} fontSize={10} fontWeight="bold">Vₛ/Vₚ = nₛ/nₚ</text>
          </svg>
          {/* Turns ratio slider */}
          <div className="flex flex-col gap-1 px-1">
            <div className="flex justify-between text-xs">
              <span style={{ color: '#a8b8cc' }}>nₛ/nₚ ratio: {turns}×</span>
              <span style={{ color: Vs > 230 ? '#ef4444' : '#00bc7d' }}>Vₛ = {Vs} V ({stepType})</span>
            </div>
            <input type="range" min="0.5" max="4" step="0.5" value={turns}
              onChange={e => setTurns(+e.target.value)} className="w-full" style={{ accentColor: MC }} />
          </div>
        </>
      )}
    </div>
  )
}
function EMInductionIdea() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-4">
      <div className="flex items-center gap-3">
        {/* DC battery */}
        <div className="flex flex-col items-center gap-1 p-2 rounded-[8px]" style={{ background: '#1d293d', border: '1px solid #a8b8cc' }}>
          <span className="text-xs font-bold" style={{ color: '#a8b8cc' }}>DC</span>
          <span className="text-xs font-mono" style={{ color: '#cad5e2' }}>──────</span>
          <span className="text-xs" style={{ color: '#a8b8cc' }}>battery</span>
        </div>
        <span style={{ color: '#a8b8cc', fontSize: 18 }}>→</span>
        {/* Transformer */}
        <div className="flex flex-col items-center gap-1 p-2 rounded-[8px]" style={{ background: `${MC}10`, border: `1px solid ${MC}` }}>
          <span className="text-xs font-bold" style={{ color: MC }}>Transformer</span>
          <motion.span className="text-xs font-bold" style={{ color: '#ef4444' }}
            animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5 }}>
            works?  ✗
          </motion.span>
        </div>
      </div>
      <IdeaCaption>Transformers work on direct current (DC) - they just increase or decrease any voltage</IdeaCaption>
    </div>
  )
}
function EMInductionReality() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-4">
      <div className="text-xs text-center p-2 rounded-[10px]" style={{ background: `${MC}10`, border: `1px solid ${MC}30`, color: '#cad5e2' }}>
        Transformers only work with AC. DC creates a constant magnetic field - no changing flux → no induced EMF. AC constantly changes the field, continuously inducing current in the secondary coil.
      </div>
      <RealityBadge color={MC}>Transformers require AC - a changing magnetic field is essential</RealityBadge>
    </div>
  )
}

// ─── AC Generators ───────────────────────────────────────────────────────────
function ACGeneratorsLesson() {
  const [pos, setPos] = useState(0)
  const positions = [
    { label: '0° (vertical)', emf: 0, desc: 'Coil sides move parallel to field lines — no flux cutting — zero EMF induced.', color: '#6366f1' },
    { label: '90° (horizontal)', emf: 1, desc: 'Coil sides cut field lines at maximum rate — maximum EMF. Current at peak.', color: '#10b981' },
    { label: '180° (vertical)', emf: 0, desc: 'Coil sides again parallel to field — zero EMF again. Half rotation complete.', color: '#6366f1' },
    { label: '270° (horizontal)', emf: -1, desc: 'Coil sides cutting field in opposite direction — maximum EMF in reverse direction.', color: '#ef4444' },
  ]
  const p = positions[pos]
  // AC wave SVG — highlight the current point
  const waveX = [20, 70, 120, 170, 220]
  const waveY = [70, 20, 70, 120, 70] // sine-like
  const wavePath = waveX.map((x,i) => `${i===0?'M':'L'}${x},${waveY[i]}`).join(' ')
  return (
    <div className="w-full flex flex-col gap-2 px-3 pt-2 pb-2">
      <svg width="100%" viewBox="0 0 240 100" style={{ background: '#0f1829', borderRadius: 10, border: '1.5px solid #1d293d' }}>
        {/* Magnets */}
        <rect x="5" y="20" width="30" height="60" rx="4" fill="#ef444430" stroke="#ef4444" strokeWidth="1.2" />
        <text x="12" y="54" fill="#ef4444" fontSize="9" fontWeight="800">N</text>
        <rect x="200" y="20" width="30" height="60" rx="4" fill="#3b82f630" stroke="#3b82f6" strokeWidth="1.2" />
        <text x="208" y="54" fill="#3b82f6" fontSize="9" fontWeight="800">S</text>
        {/* Field lines */}
        {[30,45,60,70].map(y => <line key={y} x1="35" y1={y} x2="200" y2={y} stroke="#4a5a72" strokeWidth="0.8" strokeOpacity="0.5" />)}
        {/* Rotating coil */}
        {pos % 2 === 0
          ? <rect x="105" y="25" width="25" height="50" rx="2" fill="none" stroke={p.color} strokeWidth="2.5" />
          : <rect x="92" y="38" width="50" height="24" rx="2" fill="none" stroke={p.color} strokeWidth="2.5" />
        }
        {/* Slip rings */}
        <circle cx="130" cy="88" r="5" fill="none" stroke="#a8b8cc" strokeWidth="1.2" />
        <circle cx="115" cy="88" r="5" fill="none" stroke="#a8b8cc" strokeWidth="1.2" />
        {/* EMF indicator */}
        <text x="125" y="13" fill={p.color} fontSize="8" fontWeight="700" textAnchor="middle">EMF: {p.emf === 0 ? '0' : p.emf === 1 ? 'MAX +' : 'MAX −'}</text>
      </svg>
      {/* AC output wave */}
      <svg width="100%" viewBox="0 0 240 90" style={{ background: '#0b1121', borderRadius: 8, border: '1px solid #1d293d' }}>
        <line x1="10" y1="70" x2="230" y2="70" stroke="#2d3e55" strokeWidth="1" />
        <line x1="10" y1="10" x2="10" y2="85" stroke="#2d3e55" strokeWidth="1" />
        <text x="115" y="87" fill="#4a5a72" fontSize="6" textAnchor="middle">Time →</text>
        <text x="4" y="40" fill="#4a5a72" fontSize="6" textAnchor="middle" transform="rotate(-90,4,40)">EMF</text>
        <path d="M10,70 Q35,10 60,70 Q85,130 110,70 Q135,10 160,70 Q185,130 210,70" fill="none" stroke="#6366f1" strokeWidth="1.5" />
        {/* Current position dot */}
        <circle cx={[10,60,110,160][pos]} cy={[70,70,70,70][pos]} r="4" fill={p.color} />
      </svg>
      <div className="flex gap-1">
        {positions.map((po, i) => (
          <button key={i} onClick={() => setPos(i)}
            className="flex-1 py-1 rounded-[6px] text-xs font-semibold"
            style={{ background: pos===i ? `${po.color}25` : '#1d293d', color: pos===i ? po.color : '#a8b8cc', border: `1px solid ${pos===i ? po.color : '#2a3a52'}`, fontSize: 8 }}>
            {po.label}
          </button>
        ))}
      </div>
      <div className="px-2 py-1.5 rounded-[8px] text-xs" style={{ background: `${p.color}10`, border: `1px solid ${p.color}25`, color: '#e2e8f0' }}>
        {p.desc}
      </div>
    </div>
  )
}

function ACGeneratorsIdea() {
  return (
    <div className="w-full flex flex-col gap-3 px-4 pt-3 pb-3">
      <FormulaBox formula="KE → Electrical Energy" color={MC} />
      <div className="flex flex-col gap-1.5">
        {[
          { label: 'Slip rings', desc: 'Maintain contact as coil rotates — preserve AC output', color: '#a8b8cc' },
          { label: 'Faster rotation', desc: '↑ frequency AND ↑ peak voltage', color: '#10b981' },
          { label: 'Stronger magnet', desc: '↑ peak voltage only', color: '#fdc700' },
          { label: 'More turns', desc: '↑ peak voltage only', color: '#fdc700' },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-[8px]" style={{ background: '#1d293d', border: '0.75px solid #2a3a52' }}>
            <span className="text-xs font-semibold" style={{ color: item.color }}>{item.label}</span>
            <span className="text-xs" style={{ color: '#a8b8cc' }}>{item.desc}</span>
          </div>
        ))}
      </div>
      <IdeaCaption>Slip rings ≠ split-ring commutator. Slip rings → AC. Commutator → DC (motor).</IdeaCaption>
    </div>
  )
}

function ACGeneratorsReality() {
  return (
    <div className="w-full flex flex-col gap-3 px-4 pt-3 pb-3">
      <RealityBadge emoji="⚡" title="Every UK power station" desc="Nuclear, gas, coal and wind turbines all use AC generators (alternators) spinning at 50 rotations per second to produce 50 Hz AC electricity for the National Grid." />
      <RealityBadge emoji="🚗" title="Car alternator" desc="Your car's engine spins an alternator to generate electricity, charging the battery and powering electronics — all using the same electromagnetic induction principle." />
    </div>
  )
}

// ─── 42. Solar System & Orbital Motion ──────────────────────────────────────
function SolarSystemLesson() {
  const cx = 152, cy = 116
  // angle: 0° = right, clockwise in SVG coords
  const planets = [
    { name: 'Mercury', orbitR: 36,  size: 4.5, color: '#a8a8c0', angle: -50  },
    { name: 'Venus',   orbitR: 60,  size: 6.5, color: '#f97316', angle: 158  },
    { name: 'Earth',   orbitR: 86,  size: 7,   color: '#155dfc', angle: 28   },
    { name: 'Mars',    orbitR: 114, size: 5.5, color: '#ef4444', angle: 222  },
  ]
  return (
    <div className="w-full flex flex-col items-center py-2" style={{ background: '#0b1121' }}>
      <svg width="100%" viewBox="0 0 310 238" style={{ maxWidth: 310 }}>
        <defs>
          <radialGradient id="sunGrad" cx="38%" cy="38%">
            <stop offset="0%" stopColor="#fff7aa" />
            <stop offset="55%" stopColor="#fdc700" />
            <stop offset="100%" stopColor="#f97316" />
          </radialGradient>
        </defs>

        {/* Background stars */}
        {[[18,12],[285,18],[58,218],[292,200],[8,155],[182,6],[252,228],[42,80],[270,90]].map(([sx,sy],i) => (
          <circle key={i} cx={sx} cy={sy} r="1" fill="white" opacity="0.25"/>
        ))}

        {/* Orbit rings – dashed */}
        {planets.map(p => (
          <circle key={p.name} cx={cx} cy={cy} r={p.orbitR}
            fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="0.75" strokeDasharray="3 4"/>
        ))}

        {/* Sun glow + body */}
        <circle cx={cx} cy={cy} r="32" fill="#fdc700" opacity="0.07"/>
        <circle cx={cx} cy={cy} r="19" fill="url(#sunGrad)"/>
        <text x={cx} y={cy + 4} textAnchor="middle" fontSize="8" fontWeight="bold" fill="#1a0800">Sun</text>

        {/* Planets + labels */}
        {planets.map(p => {
          const rad = (p.angle * Math.PI) / 180
          const px = cx + p.orbitR * Math.cos(rad)
          const py = cy + p.orbitR * Math.sin(rad)
          const leaderR = p.orbitR + p.size + 15
          const lx = cx + leaderR * Math.cos(rad)
          const ly = cy + leaderR * Math.sin(rad)
          const anchor = Math.cos(rad) >= 0 ? 'start' : 'end'
          const textX = lx + (Math.cos(rad) >= 0 ? 3 : -3)
          return (
            <g key={p.name}>
              {/* Planet glow */}
              <circle cx={px} cy={py} r={p.size + 3} fill={p.color} opacity="0.15"/>
              {/* Planet body */}
              <circle cx={px} cy={py} r={p.size} fill={p.color}/>
              {/* Leader line */}
              <line x1={px} y1={py} x2={lx} y2={ly}
                stroke={p.color} strokeWidth="0.75" strokeOpacity="0.5"/>
              {/* Label */}
              <text x={textX} y={ly + 3.5}
                fontSize="8.5" fill={p.color} fontWeight="700" textAnchor={anchor}>
                {p.name}
              </text>
            </g>
          )
        })}

        {/* Captions */}
        <text x="155" y="229" textAnchor="middle" fill="#64748b" fontSize="7.5">
          gravity provides centripetal force · closer to Sun → faster orbit
        </text>
      </svg>
    </div>
  )
}
function SolarSystemIdea() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-4">
      <div className="relative flex items-center justify-center" style={{ width: 130, height: 90 }}>
        {/* Earth */}
        <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold"
          style={{ background: '#155dfc20', border: '2px solid #155dfc', color: '#155dfc' }}>Earth</div>
        {/* Atmosphere bubble - "gravity stops here" label */}
        <div className="absolute rounded-full" style={{ width: 70, height: 70, top: '50%', left: '50%', transform: 'translate(-50%,-50%)', border: '2px dashed #2b7fff40' }} />
        <motion.div className="absolute text-xs font-bold" style={{ top: 4, left: '50%', transform: 'translateX(-50%)', color: '#ef4444', whiteSpace: 'nowrap' }}
          animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 2 }}>
          gravity stops here?  ✗
        </motion.div>
        {/* Planet far away, "floating free" */}
        <div className="absolute w-4 h-4 rounded-full" style={{ right: 0, top: '50%', transform: 'translateY(-50%)', background: '#c084fc20', border: '2px solid #c084fc' }} />
      </div>
      <IdeaCaption>Gravity stops at Earth's atmosphere - planets float freely in empty space</IdeaCaption>
    </div>
  )
}
function SolarSystemReality() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-4">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full" style={{ background: '#fdc70030', border: '2px solid #fdc700' }} />
        <motion.div animate={{ x: [-3, 3, -3] }} transition={{ repeat: Infinity, duration: 2 }}>
          <div className="text-xs" style={{ color: SC }}>← gravity →</div>
        </motion.div>
        <div className="w-5 h-5 rounded-full" style={{ background: '#155dfc30', border: '2px solid #155dfc' }} />
      </div>
      <div className="text-xs text-center" style={{ color: '#cad5e2' }}>Gravity acts at infinite range, decreasing with distance². Planets orbit because gravity provides centripetal force.</div>
      <RealityBadge color={SC}>Gravity acts across infinite space - holds orbits together</RealityBadge>
    </div>
  )
}

// ─── 43. Stellar Evolution ───────────────────────────────────────────────────
function StellarEvolutionLesson() {
  return (
    <div className="w-full h-full flex flex-col justify-center gap-0 px-2 py-1">
      <svg width="260" height="230" viewBox="0 0 260 230">
        {/* ── SHARED TOP ── */}
        {/* Nebula */}
        <rect x="90" y="4" width="80" height="18" rx="4" fill="#6366f125" stroke="#6366f1" strokeWidth="1.2" />
        <text x="130" y="16" textAnchor="middle" fill="#6366f1" fontSize={8} fontWeight="bold">Nebula (gas &amp; dust)</text>
        <line x1="130" y1="22" x2="130" y2="30" stroke="#6366f1" strokeWidth="1.2" />
        <polygon points="127,29 130,34 133,29" fill="#6366f1" />

        {/* Protostar */}
        <rect x="95" y="34" width="70" height="16" rx="4" fill="#f9731625" stroke="#f97316" strokeWidth="1.2" />
        <text x="130" y="45" textAnchor="middle" fill="#f97316" fontSize={8}>Protostar</text>
        <line x1="130" y1="50" x2="130" y2="58" stroke="#f97316" strokeWidth="1.2" />
        <polygon points="127,57 130,62 133,57" fill="#f97316" />

        {/* Main Sequence */}
        <rect x="82" y="62" width="96" height="18" rx="4" fill="#fdc70025" stroke={WC} strokeWidth="1.5" />
        <text x="130" y="72" textAnchor="middle" fill={WC} fontSize={8} fontWeight="bold">Main Sequence Star</text>
        <text x="130" y="79" textAnchor="middle" fill="#a8b8cc" fontSize={7}>(billions of years)</text>

        {/* Branch line */}
        <line x1="130" y1="80" x2="130" y2="90" stroke="#a8b8cc" strokeWidth="1" />
        <line x1="62" y1="90" x2="198" y2="90" stroke="#a8b8cc" strokeWidth="1" />
        {/* Left branch  -  Sun-like */}
        <line x1="62" y1="90" x2="62" y2="100" stroke="#a8b8cc" strokeWidth="1" />
        <text x="62" y="98" textAnchor="middle" fill="#a8b8cc" fontSize={7}>small/medium</text>
        {/* Right branch  -  massive */}
        <line x1="198" y1="90" x2="198" y2="100" stroke="#a8b8cc" strokeWidth="1" />
        <text x="198" y="98" textAnchor="middle" fill="#a8b8cc" fontSize={7}>massive</text>

        {/* ── LEFT PATH ── */}
        <line x1="62" y1="100" x2="62" y2="108" stroke="#ef4444" strokeWidth="1" />
        <polygon points="59,107 62,112 65,107" fill="#ef4444" />
        <rect x="20" y="112" width="84" height="16" rx="3" fill="#ef444425" stroke="#ef4444" strokeWidth="1.2" />
        <text x="62" y="123" textAnchor="middle" fill="#ef4444" fontSize={8}>Red Giant</text>

        <line x1="62" y1="128" x2="62" y2="136" stroke="#c084fc" strokeWidth="1" />
        <polygon points="59,135 62,140 65,135" fill="#c084fc" />
        <rect x="16" y="140" width="92" height="16" rx="3" fill="#c084fc25" stroke="#c084fc" strokeWidth="1.2" />
        <text x="62" y="151" textAnchor="middle" fill="#c084fc" fontSize={8}>Planetary Nebula</text>

        <line x1="62" y1="156" x2="62" y2="164" stroke="#cad5e2" strokeWidth="1" />
        <polygon points="59,163 62,168 65,163" fill="#cad5e2" />
        <rect x="22" y="168" width="80" height="16" rx="3" fill="#cad5e225" stroke="#cad5e2" strokeWidth="1.2" />
        <text x="62" y="179" textAnchor="middle" fill="#cad5e2" fontSize={8}>White Dwarf</text>

        <line x1="62" y1="184" x2="62" y2="192" stroke="#2d3f5c" strokeWidth="1" />
        <polygon points="59,191 62,196 65,191" fill="#2d3f5c" />
        <rect x="22" y="196" width="80" height="16" rx="3" fill="#2d3f5c" stroke="#a8b8cc" strokeWidth="1" />
        <text x="62" y="207" textAnchor="middle" fill="#a8b8cc" fontSize={8}>Black Dwarf</text>

        {/* ── RIGHT PATH ── */}
        <line x1="198" y1="100" x2="198" y2="108" stroke="#ef4444" strokeWidth="1" />
        <polygon points="195,107 198,112 201,107" fill="#ef4444" />
        <rect x="148" y="112" width="100" height="16" rx="3" fill="#ef444430" stroke="#ef4444" strokeWidth="1.5" />
        <text x="198" y="123" textAnchor="middle" fill="#ef4444" fontSize={8}>Red Supergiant</text>

        <line x1="198" y1="128" x2="198" y2="136" stroke="#fffaaa" strokeWidth="1" />
        <polygon points="195,135 198,140 201,135" fill="#fffaaa" />
        <rect x="155" y="140" width="86" height="16" rx="3" fill="#fffaaa25" stroke="#fffaaa" strokeWidth="1.5" />
        <text x="198" y="151" textAnchor="middle" fill="#fffaaa" fontSize={8} fontWeight="bold">Supernova</text>

        <line x1="198" y1="156" x2="198" y2="164" stroke="#a8b8cc" strokeWidth="1" />
        <polygon points="195,163 198,168 201,163" fill="#a8b8cc" />
        <rect x="138" y="168" width="120" height="16" rx="3" fill="#a8b8cc25" stroke="#a8b8cc" strokeWidth="1.2" />
        <text x="198" y="179" textAnchor="middle" fill="#a8b8cc" fontSize={8}>Neutron Star / Black Hole</text>
      </svg>
    </div>
  )
}
function StellarEvolutionIdea() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-4">
      <div className="flex items-center gap-2">
        {/* Sun */}
        <motion.div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold"
          style={{ background: 'radial-gradient(circle, #fdc700, #f97316)', color: 'white', boxShadow: '0 0 12px #fdc70080' }}
          animate={{ scale: [1, 1.05, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
          Sun
        </motion.div>
        <span style={{ color: '#a8b8cc' }}>→</span>
        {/* Explosion (wrong) */}
        <motion.div className="text-2xl"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
          💥
        </motion.div>
        <div className="flex flex-col items-center gap-0.5">
          <span className="text-xs font-bold" style={{ color: '#ef4444' }}>Supernova?</span>
          <motion.span className="text-xs font-bold" style={{ color: '#ef4444' }}
            animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 2 }}>✗</motion.span>
        </div>
      </div>
      <IdeaCaption>The Sun will eventually explode in a supernova when it runs out of fuel</IdeaCaption>
    </div>
  )
}
function StellarEvolutionReality() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-4">
      <div className="flex gap-2 text-xs flex-wrap justify-center">
        <span style={{ color: '#fdc700' }}>Sun → Red giant</span>
        <span style={{ color: '#a8b8cc' }}>→</span>
        <span style={{ color: '#cad5e2' }}>White dwarf</span>
        <span style={{ color: '#a8b8cc' }}>not supernova</span>
      </div>
      <div className="flex gap-2 text-xs flex-wrap justify-center">
        <span style={{ color: '#ef4444' }}>Massive star → Red supergiant</span>
        <span style={{ color: '#a8b8cc' }}>→</span>
        <span style={{ color: '#e879f9' }}>Supernova → Neutron star/Black hole</span>
      </div>
      <RealityBadge color={SC}>Sun → white dwarf (no supernova) - only massive stars explode</RealityBadge>
    </div>
  )
}

// ─── 45. Visible Light ───────────────────────────────────────────────────────
function VisibleLightLesson() {
  const [mode, setMode] = useState('reflection')
  return (
    <div className="w-full h-full flex flex-col items-center justify-start gap-2 px-3 py-2" style={{ background: '#0b1121' }}>
      <div className="flex gap-2">
        {[['reflection', 'Reflection'], ['colour', 'Colour']].map(([val, label]) => (
          <button key={val} onClick={() => setMode(val)}
            className="px-3 py-1 rounded-[8px] text-xs font-semibold"
            style={{ background: mode === val ? `${WC}22` : '#1d293d', color: mode === val ? WC : '#a8b8cc', border: `1px solid ${mode === val ? WC : '#1d293d'}` }}>
            {label}
          </button>
        ))}
      </div>
      {mode === 'reflection' ? (
        <svg width="260" height="170" viewBox="0 0 260 170">
          {/* Specular reflection */}
          <text x="10" y="14" fill="#a8b8cc" fontSize={8} fontWeight="bold">Specular (smooth surface)</text>
          <rect x="10" y="18" width="105" height="10" rx="2" fill="#1d293d" stroke="#4a5a72" strokeWidth="1" />
          {[0,1,2,3].map(i => (
            <g key={i}>
              <line x1={20 + i*26} y1="36" x2={32 + i*26} y2="18" stroke={WC} strokeWidth="1.5" strokeLinecap="round" />
              <line x1={32 + i*26} y1="18" x2={44 + i*26} y2="36" stroke={WC} strokeWidth="1.5" strokeLinecap="round" />
            </g>
          ))}
          <text x="62" y="52" textAnchor="middle" fill={WC} fontSize={7}>parallel rays → single direction</text>
          {/* Diffuse reflection */}
          <text x="140" y="14" fill="#a8b8cc" fontSize={8} fontWeight="bold">Diffuse (rough surface)</text>
          <path d="M140,28 Q147,22 154,28 Q161,22 168,28 Q175,22 182,28 Q189,22 196,28 Q203,22 210,28 Q217,22 224,28 Q231,22 238,28" fill="none" stroke="#4a5a72" strokeWidth="1.5" />
          {[0,1,2,3,4].map(i => {
            const cx = 148 + i * 21
            const angles = [-40, -20, 0, 20, 40]
            return (
              <g key={i}>
                <line x1={cx} y1="46" x2={cx} y2="28" stroke={WC} strokeWidth="1.5" strokeLinecap="round" />
                <line x1={cx} y1="28" x2={cx + Math.sin(angles[i] * Math.PI / 180) * 16} y2={28 - Math.cos(angles[i] * Math.PI / 180) * 16} stroke={WC} strokeWidth="1.5" strokeLinecap="round" opacity={0.7 + i*0.05} />
              </g>
            )
          })}
          <text x="192" y="52" textAnchor="middle" fill={WC} fontSize={7}>scattered rays → many directions</text>
          {/* Rule box */}
          <rect x="10" y="60" width="240" height="20" rx="4" fill={`${WC}12`} stroke={`${WC}40`} strokeWidth="1" />
          <text x="130" y="73" textAnchor="middle" fill={WC} fontSize={8} fontWeight="bold">Angle of incidence = Angle of reflection (both from normal)</text>
          {/* Filter demo */}
          <text x="10" y="100" fill="#a8b8cc" fontSize={8} fontWeight="bold">Colour filter</text>
          <defs>
            <linearGradient id="whiteLight" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="#7c3aed" /><stop offset="25%" stopColor="#2b7fff" />
              <stop offset="50%" stopColor="#00bc7d" /><stop offset="75%" stopColor="#fdc700" />
              <stop offset="100%" stopColor="#ef4444" />
            </linearGradient>
          </defs>
          <rect x="10" y="104" width="70" height="16" rx="2" fill="url(#whiteLight)" />
          <text x="45" y="115" textAnchor="middle" fill="#fff" fontSize={7} fontWeight="bold">white light</text>
          <rect x="90" y="100" width="20" height="24" rx="3" fill="#ef444440" stroke="#ef4444" strokeWidth="1.5" />
          <text x="100" y="115" textAnchor="middle" fill="#ef4444" fontSize={7} fontWeight="bold">RED</text>
          <text x="100" y="123" textAnchor="middle" fill="#ef4444" fontSize={6}>filter</text>
          <rect x="120" y="104" width="60" height="16" rx="2" fill="#ef4444" />
          <text x="150" y="115" textAnchor="middle" fill="#fff" fontSize={7} fontWeight="bold">red light only</text>
          <line x1="80" y1="112" x2="90" y2="112" stroke="#cad5e2" strokeWidth="1.5" markerEnd="url(#arr)" />
          <line x1="110" y1="112" x2="120" y2="112" stroke="#cad5e2" strokeWidth="1.5" />
          <text x="130" y="145" textAnchor="middle" fill="#a8b8cc" fontSize={7.5}>Filter absorbs all wavelengths except red — transmits red</text>
          <text x="130" y="156" textAnchor="middle" fill="#a8b8cc" fontSize={7.5}>Blue object under red light → absorbs red → looks BLACK</text>
        </svg>
      ) : (
        <svg width="260" height="170" viewBox="0 0 260 170">
          <text x="10" y="14" fill="#a8b8cc" fontSize={8} fontWeight="bold">Why objects have colour</text>
          {[
            { label: 'Red object', absorbs: ['violet','blue','green','yellow'], reflects: ['red'], fill: '#ef4444', x: 10 },
            { label: 'Blue object', absorbs: ['red','orange','green','yellow'], reflects: ['blue'], fill: '#2b7fff', x: 90 },
            { label: 'White object', absorbs: [], reflects: ['all'], fill: '#f8fafc', x: 170 },
          ].map((obj, oi) => (
            <g key={oi}>
              <rect x={obj.x} y="20" width="65" height="28" rx="4" fill={obj.fill} stroke="#ffffff30" strokeWidth="1" />
              <text x={obj.x + 32} y="38" textAnchor="middle" fill={oi === 2 ? '#0b1121' : '#fff'} fontSize={8} fontWeight="bold">{obj.label}</text>
              <text x={obj.x + 32} y="60" textAnchor="middle" fill="#a8b8cc" fontSize={7}>reflects: {obj.reflects.join(', ')}</text>
              <text x={obj.x + 32} y="70" textAnchor="middle" fill="#ef4444" fontSize={7}>absorbs: {obj.absorbs.length > 0 ? 'others' : 'nothing'}</text>
            </g>
          ))}
          <rect x="10" y="80" width="240" height="14" rx="3" fill="#0b1121" stroke="#ef444450" strokeWidth="1" />
          <text x="130" y="90" textAnchor="middle" fill="#ef4444" fontSize={7.5} fontWeight="bold">Black object absorbs ALL wavelengths — reflects nothing</text>
          <rect x="10" y="100" width="240" height="14" rx="3" fill="#f8fafc15" stroke="#f8fafc40" strokeWidth="1" />
          <text x="130" y="110" textAnchor="middle" fill="#f8fafc" fontSize={7.5} fontWeight="bold">White object reflects ALL wavelengths equally</text>
          <text x="10" y="130" fill="#a8b8cc" fontSize={7.5} fontWeight="bold">Transparent vs Opaque vs Translucent:</text>
          <text x="10" y="142" fill="#cad5e2" fontSize={7}>Transparent: lets light through (clear glass) · Translucent: partial (frosted glass)</text>
          <text x="10" y="154" fill="#cad5e2" fontSize={7}>Opaque: no light passes through · colour = wavelengths reflected</text>
        </svg>
      )}
    </div>
  )
}
function VisibleLightIdea() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-4">
      <div className="w-full p-3 rounded-[10px]" style={{ background: '#2b7fff15', border: '1px solid #2b7fff40' }}>
        <div className="text-xs font-bold mb-1" style={{ color: '#2b7fff' }}>❌ Common mistake</div>
        <div className="text-xs" style={{ color: '#cad5e2' }}>
          "A blue object under red light looks blue"
        </div>
        <div className="text-xs mt-1" style={{ color: '#ef4444' }}>
          ✗ Wrong — a blue object absorbs red light. No blue light to reflect → looks <strong style={{ color: '#ef4444' }}>black</strong>.
        </div>
      </div>
      <div className="w-full p-3 rounded-[10px]" style={{ background: '#10b98115', border: '1px solid #10b98140' }}>
        <div className="text-xs font-bold mb-1" style={{ color: '#10b981' }}>✓ Remember</div>
        <div className="text-xs" style={{ color: '#cad5e2' }}>
          An object can only reflect wavelengths that are present in the light hitting it. If the light source lacks that wavelength, the object cannot reflect it.
        </div>
      </div>
      <IdeaCaption>Colour = reflected wavelengths. No matching wavelength in source → object looks black</IdeaCaption>
    </div>
  )
}
function VisibleLightReality() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-4">
      <RealityBadge emoji="🎭" title="Stage lighting" desc="Lighting designers use coloured filters to control which objects are visible on stage — a red costume looks black under blue stage lighting." color={WC} />
      <RealityBadge emoji="🔬" title="Microscopy" desc="Scientists use filters to block certain wavelengths, making specific structures fluoresce or stand out — specular reflection from smooth cell surfaces gives clean images." color={WC} />
      <RealityBadge emoji="🌈" title="Everyday colour" desc="Grass looks green because chlorophyll absorbs red and blue light and reflects green. In red light only, grass would look black." color={WC} />
    </div>
  )
}

// ─── 44. Red-shift & Big Bang ────────────────────────────────────────────────
function RedshiftLesson() {
  // Animate absorption lines shifting right over time
  const [shift, setShift] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setShift(s => (s + 0.5) % 20), 80)
    return () => clearInterval(id)
  }, [])
  // Lab lines: H-alpha at 65% (red-ish), H-beta at 38% (blue-green), Ca at 52%
  const labLines = [38, 52, 65]
  return (
    <div className="w-full h-full flex flex-col justify-center gap-2 px-3 py-2">
      <svg width="260" height="140" viewBox="0 0 260 140">
        {/* ── Laboratory spectrum ── */}
        <text x="10" y="14" fill="#a8b8cc" fontSize={8} fontWeight="bold">Laboratory spectrum</text>
        <defs>
          <linearGradient id="specGrad" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%"   stopColor="#7c3aed" />
            <stop offset="18%"  stopColor="#2b7fff" />
            <stop offset="35%"  stopColor="#00bc7d" />
            <stop offset="55%"  stopColor="#fdc700" />
            <stop offset="75%"  stopColor="#f97316" />
            <stop offset="100%" stopColor="#ef4444" />
          </linearGradient>
        </defs>
        <rect x="10" y="18" width="240" height="22" fill="url(#specGrad)" rx="2" />
        {/* Lab absorption lines (dark) */}
        {labLines.map((pct, i) => (
          <rect key={i} x={10 + pct / 100 * 240} y="18" width="2" height="22" fill="#0b1121" opacity="0.8" />
        ))}
        <text x="10" y="50" fill="#7c3aed" fontSize={7}>violet</text>
        <text x="225" y="50" fill="#ef4444" fontSize={7}>red</text>
        <text x="130" y="50" textAnchor="middle" fill="#a8b8cc" fontSize={7}>H-β (486nm)   Ca   H-α (656nm)</text>

        {/* ── Distant galaxy spectrum ── */}
        <text x="10" y="68" fill="#a8b8cc" fontSize={8} fontWeight="bold">Distant galaxy spectrum</text>
        <rect x="10" y="72" width="240" height="22" fill="url(#specGrad)" rx="2" />
        {/* Shifted absorption lines  -  animated further right */}
        {labLines.map((pct, i) => {
          const xShift = Math.min(pct + 12 + shift * 0.3, 97)
          return (
            <rect key={i} x={10 + xShift / 100 * 240} y="72" width="2" height="22" fill="#0b1121" opacity="0.8" />
          )
        })}
        {/* Redshift arrow */}
        <line x1="110" y1="100" x2="168" y2="100" stroke="#ef4444" strokeWidth="1.5" />
        <polygon points="165,97 172,100 165,103" fill="#ef4444" />
        <text x="128" y="111" textAnchor="middle" fill="#ef4444" fontSize={8}>→ redshift</text>

        {/* Hubble formula */}
        <rect x="10" y="116" width="240" height="20" rx="4" fill="#6366f115" stroke="#6366f150" strokeWidth="1" />
        <text x="130" y="129" textAnchor="middle" fill={WC} fontSize={9} fontWeight="bold">v = H₀ × d (Hubble's Law)</text>
      </svg>
      <div className="text-xs text-center" style={{ color: '#a8b8cc' }}>
        greater redshift → faster recession → more distant &nbsp;|&nbsp; <span style={{ color: SC }}>v = z × c</span>
      </div>
    </div>
  )
}
function RedshiftIdea() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-4">
      <div className="flex flex-col items-center gap-2 w-full px-2">
        {/* Galaxy moving TOWARD (wrong interpretation) */}
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-center gap-1">
            <div className="text-xs" style={{ color: '#a8b8cc' }}>Galaxy</div>
            <motion.div className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: '#ef444420', border: '2px solid #ef4444' }}
              animate={{ x: [6, 0, 6] }} transition={{ repeat: Infinity, duration: 2 }}>
              <span style={{ color: '#ef4444', fontSize: 10 }}>→</span>
            </motion.div>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="text-xs" style={{ color: '#a8b8cc' }}>Us</div>
            <div className="w-8 h-8 rounded-full" style={{ background: SC + '20', border: `2px solid ${SC}` }} />
          </div>
        </div>
        <motion.div className="text-xs font-bold px-2 py-1 rounded-[6px]" style={{ background: '#ef444415', border: '1px solid #ef4444', color: '#ef4444' }}
          animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 2 }}>
          Red = coming toward us?  ✗
        </motion.div>
      </div>
      <IdeaCaption>Red-shift means galaxies are moving towards us - they look redder because they're hotter</IdeaCaption>
    </div>
  )
}
function RedshiftReality() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-4">
      <div className="text-xs text-center p-2 rounded-[10px]" style={{ background: `${SC}10`, border: `1px solid ${SC}30`, color: '#cad5e2' }}>
        Red-shift means wavelength is stretched - source is moving AWAY. Like the Doppler effect for sound. Galaxies moving away = universe is expanding.
      </div>
      <div className="text-xs text-center" style={{ color: '#a8b8cc' }}>Evidence for Big Bang: all galaxies receding, CMB radiation</div>
      <RealityBadge color={SC}>Red-shift shows galaxies moving away - evidence for expanding universe</RealityBadge>
    </div>
  )
}

export const WAVES_TOPICS = {
  wave_types: {
    id: 'wave_types', module: 'Waves', moduleColor: WC, course: 'combined',
    title: 'Transverse & Longitudinal Waves', subtitle: 'Wave Types and What Transfers',
    description: 'Waves transfer energy without transferring matter. Transverse waves: vibration is perpendicular to direction of travel (e.g. light, EM waves, seismic S-waves). Longitudinal waves: vibration is parallel to direction of travel, with compressions and rarefactions (e.g. sound, seismic P-waves).',
    lessonVisual: WaveTypesLesson, ideaVisual: WaveTypesIdea, realityVisual: WaveTypesReality,
    question: 'Which type of wave does sound travel as?',
    questionSubtitle: 'Think about how particles move relative to wave direction',
    options: ['Transverse', 'Longitudinal', 'Both transverse and longitudinal', 'Neither - sound is not a wave'],
    correctAnswer: 1,
    keywords: ['longitudinal wave', 'transverse wave', 'compression', 'rarefaction', 'vibration direction', 'sound', 'particles', 'parallel'],
    sentenceStarters: ['Sound is a longitudinal wave because particles vibrate...', 'In a longitudinal wave, particles vibrate parallel to the direction of travel...', 'Compressions and rarefactions are features of longitudinal waves...', 'Transverse waves have vibrations perpendicular to the direction of travel...', 'Sound needs a medium to travel because it relies on particle...'],
    modelAnswers: [
      'Sound is a longitudinal wave because particles vibrate **parallel to (in the same direction as) the wave\'s direction of travel**.',
      'In a longitudinal wave, particles vibrate parallel to the direction of travel, **creating compressions (high pressure) and rarefactions (low pressure)**.',
      'Compressions and rarefactions are features of longitudinal waves, **making them different from transverse waves like light**.',
      'Transverse waves have vibrations perpendicular to the direction of travel, **like ripples on water  -  sound is not like this**.',
      'Sound needs a medium to travel because it relies on particle **vibrations  -  it cannot travel through a vacuum**.',
    ],
    misconception: 'Sound waves are longitudinal - not transverse like water waves.',
    concept: 'Sound causes air particles to oscillate back and forth in the same direction as the wave travels, creating areas of compression and rarefaction. This is longitudinal. Transverse waves (like light) vibrate at 90° to the direction of travel.',
  },
  wave_properties: {
    id: 'wave_properties', module: 'Waves', moduleColor: WC, practicalId: 'waves', course: 'combined',
    title: 'Properties of Waves', subtitle: 'Amplitude, Wavelength, Frequency & v = fλ',
    description: 'Key wave properties: amplitude (A) - maximum displacement; wavelength (λ) - distance between two identical points; frequency (f) - oscillations per second (Hz); period (T = 1/f) - time for one complete oscillation. Wave speed: v = fλ. Speed depends on the medium - not the frequency.',
    lessonVisual: WavePropertiesLesson, ideaVisual: WavePropertiesIdea, realityVisual: WavePropertiesReality,
    question: 'A wave has a frequency of 200 Hz and a wavelength of 1.5 m. What is its speed?',
    questionSubtitle: 'Use v = f × λ',
    options: ['133.3 m/s', '201.5 m/s', '300 m/s', '198.5 m/s'],
    correctAnswer: 2,
    keywords: ['wave speed', 'v = fλ', 'frequency', 'wavelength', 'hertz', 'metres per second', 'wave equation', 'period'],
    sentenceStarters: ['Using the wave equation v = f × λ, I multiply...', 'v = 200 × 1.5 = ...', 'Frequency is measured in hertz (Hz), meaning oscillations per second...', 'Wavelength is the distance between two successive...', 'The wave equation v = fλ connects speed, frequency and wavelength...'],
    modelAnswers: [
      'Using the wave equation v = f × λ, I multiply **200 × 1.5 = 300 m/s**.',
      'v = 200 × 1.5 = **300 m/s**.',
      'Frequency is measured in hertz (Hz), meaning **the number of complete waves passing a point per second**.',
      'Wavelength is the distance between **two successive crests (or equivalent points) on a wave**.',
      'The wave equation v = fλ connects speed, frequency and wavelength ** -  here v = 200 × 1.5 = 300 m/s**.',
    ],
    misconception: 'Wave speed does not depend on frequency - it depends on the medium.',
    concept: 'v = 200 × 1.5 = 300 m/s. In a given medium, all waves of that type travel at the same speed. Changing frequency changes wavelength proportionally (v = fλ), not the speed.',
  },
  wave_reflection: {
    id: 'wave_reflection', module: 'Waves', moduleColor: WC, practicalId: 'light', course: 'physics-only',
    title: 'Reflection & Refraction', subtitle: 'Boundary Behaviour of Waves',
    description: 'Reflection: angle of incidence = angle of reflection (measured from the normal). Refraction: waves change speed at a boundary between media, causing a change in direction. Entering a denser medium: slows down, bends towards normal. Entering a less dense medium: speeds up, bends away from normal.',
    lessonVisual: WaveReflectionLesson, ideaVisual: WaveReflectionIdea, realityVisual: WaveReflectionReality,
    question: 'A ray of light enters a glass block and slows down. Which way does it bend?',
    questionSubtitle: 'Think about the relationship between speed change and bending direction',
    options: ['Away from the normal', 'Towards the normal', 'It does not bend', 'Parallel to the surface'],
    correctAnswer: 1,
    keywords: ['refraction', 'normal', 'optical density', 'towards the normal', 'slows down', 'angle of incidence', 'angle of refraction', 'denser medium'],
    sentenceStarters: ['When light slows down (enters a denser medium), it bends towards the normal...', 'Refraction occurs because light changes speed when it enters a denser medium...', 'A ray entering a denser medium bends towards the normal because...', 'When light speeds up (leaving glass), it bends away from the normal...', 'The normal is an imaginary line perpendicular to the surface...'],
    modelAnswers: [
      'When light slows down (enters a denser medium), it bends **towards the normal  -  the angle of refraction is less than the angle of incidence**.',
      'Refraction occurs because light changes speed when it enters a denser medium, **causing it to change direction**.',
      'A ray entering a denser medium bends towards the normal because **it slows down  -  just like a car wheel slowing on the edge of a muddy verge**.',
      'When light speeds up (leaving glass), it bends **away from the normal  -  the angle of refraction is greater than the angle of incidence**.',
      'The normal is an imaginary line perpendicular to the surface **at the point where the ray enters or leaves the medium**.',
    ],
    misconception: 'Light slows down (not speeds up) when entering denser media like glass.',
    concept: 'Glass is optically denser than air. When light slows down entering glass, it bends towards the normal. When leaving glass back into air (speeding up), it bends away from the normal - causing the familiar prism rainbow effect.',
  },
  total_internal_reflection: {
    id: 'total_internal_reflection', module: 'Waves', moduleColor: WC, course: 'physics-only',
    title: 'Total Internal Reflection', subtitle: 'Critical Angle & Optical Fibres',
    description: 'Total internal reflection (TIR) occurs when light travels from a denser medium (e.g. glass) to a less dense medium (e.g. air) and the angle of incidence exceeds the critical angle. At the critical angle, the refracted ray travels along the boundary. Above it, all light reflects internally. Optical fibres exploit TIR to transmit data as light pulses over long distances with minimal energy loss.',
    lessonVisual: TotalInternalReflectionLesson, ideaVisual: TotalInternalReflectionIdea, realityVisual: TotalInternalReflectionReality,
    question: 'What must be true for total internal reflection to occur?',
    questionSubtitle: 'Two conditions must both be met',
    options: ['Light travels from less dense to more dense medium', 'Light travels from more dense to less dense medium AND exceeds the critical angle', 'The angle of incidence must equal exactly 90°', 'The medium must be completely transparent'],
    correctAnswer: 1,
    keywords: ['total internal reflection', 'TIR', 'critical angle', 'optical fibre', 'refractive index', 'dense medium', 'endoscope', 'sin c = 1/n', 'refraction', 'boundary'],
    sentenceStarters: ['Total internal reflection occurs when...', 'The critical angle is the angle at which...', 'Optical fibres use TIR because...', 'For TIR to occur, light must travel from...', 'Above the critical angle, the light...'],
    modelAnswers: [
      'Total internal reflection occurs when **light travels from a more dense to a less dense medium AND the angle of incidence exceeds the critical angle**.',
      'The critical angle is the angle at which **the refracted ray travels exactly along the boundary (refraction angle = 90°) — above this, no refraction occurs**.',
      'Optical fibres use TIR because **light pulses bounce along the fibre by repeated total internal reflection, travelling long distances with very little energy loss**.',
      'For TIR to occur, light must travel from **a more optically dense medium (e.g. glass) into a less optically dense medium (e.g. air)**.',
      'Above the critical angle, the light **is completely reflected back into the denser medium — no refracted ray exits**.',
    ],
    misconception: 'TIR only happens when light goes from denser to less dense (glass to air), NOT the other way around. Light entering glass from air cannot undergo TIR.',
    concept: 'TIR: dense → less dense, angle > critical angle. sin c = 1/n. Used in optical fibres (internet) and endoscopes (medicine). All light reflected — none escapes.',
  },
  sound_ultrasound: {
    id: 'sound_ultrasound', module: 'Waves', moduleColor: WC, course: 'physics-only',
    title: 'Sound Waves & Ultrasound', subtitle: 'Hearing Range, Seismic Waves & Medical Imaging',
    description: 'Sound travels as longitudinal waves - faster in denser media (solids > liquids > gases). Human hearing range: 20 Hz to 20 kHz — the ear drum and inner ear structures only vibrate efficiently within this range; very low or very high frequencies do not produce a response. Ultrasound (>20 kHz) is partially reflected at media boundaries — used in medical imaging and flaw detection. Seismic P-waves are longitudinal and travel through both solids and liquids. Seismic S-waves are transverse and cannot travel through liquids — because S-waves do not reach the far side of Earth, this is evidence that Earth has a liquid outer core. Echo sounding uses high-frequency sound to measure water depth: depth = (speed × time) ÷ 2.',
    lessonVisual: SoundWavesLesson, ideaVisual: SoundWavesIdea, realityVisual: SoundWavesReality,
    question: 'Why does sound travel faster in steel than in air?',
    questionSubtitle: 'Think about particle spacing',
    options: ['Steel is hotter', 'Particles in steel are closer together and can transmit vibrations faster', 'Steel is more elastic', 'Air absorbs sound'],
    correctAnswer: 1,
    keywords: ['sound speed', 'particles', 'closer together', 'solid medium', 'vibrations', 'transmit', 'seismic P-wave', 'seismic S-wave', 'P-wave travels through liquid', 'S-wave cannot travel through liquid', 'liquid outer core', 'echo sounding', 'ultrasound boundary', 'hearing range', 'ear drum', '20 Hz', '20 kHz'],
    sentenceStarters: ['Sound travels faster in steel because particles are closer together...', 'In a solid, particles are closer together so they can transmit vibrations...', 'S-waves cannot travel through liquids, so they do not reach the far side of Earth, which tells us...', 'P-waves are longitudinal seismic waves that travel through both solids and liquids...', 'The human ear can only detect frequencies between 20 Hz and 20 kHz because...'],
    modelAnswers: [
      'Sound travels faster in steel because particles are closer together **and can pass on vibrations more quickly**.',
      'In a solid, particles are closer together so they can transmit vibrations **more rapidly than in a gas like air**.',
      'S-waves cannot travel through liquids, so they do not reach the far side of Earth, which tells us **the outer core of the Earth is liquid**.',
      'P-waves are longitudinal seismic waves that travel through both solids and liquids, **while S-waves are transverse and are blocked by the liquid outer core**.',
      'The human ear can only detect frequencies between 20 Hz and 20 kHz because **the ear drum and inner ear structures only vibrate efficiently within this limited range**.',
    ],
    misconception: 'Sound does NOT travel faster in less dense media - the opposite is true. S-waves not reaching the far side of Earth is key evidence for a liquid outer core.',
    concept: 'Sound travels by passing vibrations between particles — faster in solids (closer particles). P-waves (longitudinal) pass through solid and liquid. S-waves (transverse) are blocked by liquid — evidence for liquid outer core. Human hearing 20 Hz–20 kHz; ultrasound >20 kHz. Echo sounding depth = (speed × time) ÷ 2.',
  },
  em_spectrum: {
    id: 'em_spectrum', module: 'Waves', moduleColor: WC, course: 'combined',
    title: 'The Electromagnetic Spectrum', subtitle: 'Types, Properties, Applications & Hazards',
    description: 'All EM waves are transverse and travel at 3×10⁸ m/s in a vacuum. From low to high frequency: radio, microwave, infrared, visible light, ultraviolet, X-rays, gamma. Higher frequency → shorter wavelength → more energy → more hazardous. Ionising radiation (UV, X-rays, gamma) can damage DNA and cause cancer; radiation dose (measured in sieverts, Sv) quantifies the risk — 1000 mSv = 1 Sv. Radio waves are produced by oscillating currents in electrical circuits; when absorbed by a conductor, they induce an alternating current at the same frequency.',
    lessonVisual: EMSpectrumLesson, ideaVisual: EMSpectrumIdea, realityVisual: EMSpectrumReality,
    question: 'Which type of EM radiation is used to sterilise surgical equipment?',
    questionSubtitle: 'Think about which type is most ionising and energetic',
    options: ['Radio waves', 'Infrared', 'Gamma rays', 'Microwaves'],
    correctAnswer: 2,
    keywords: ['gamma rays', 'electromagnetic spectrum', 'sterilisation', 'ionising radiation', 'wavelength', 'frequency', 'kills bacteria', 'penetrating', 'radiation dose', 'sieverts', 'radio waves inducing current', 'oscillating circuit'],
    sentenceStarters: ['Gamma rays are used for sterilisation because they are highly ionising...', 'Gamma radiation has the shortest wavelength and highest frequency...', 'Radiation dose is measured in sieverts — a higher dose means a greater risk of harm because...', 'Radio waves are produced by oscillating currents, and when absorbed they induce...', 'Sterilisation requires radiation that can kill microorganisms by...'],
    modelAnswers: [
      'Gamma rays are used for sterilisation because they are **highly ionising and can penetrate packaging to kill microorganisms**.',
      'Gamma radiation has the shortest wavelength and highest frequency **of all EM radiation, making it very penetrating**.',
      'Radiation dose is measured in sieverts — a higher dose means a greater risk of harm because **more ionising radiation damages more DNA and body tissue**.',
      'Radio waves are produced by oscillating currents, and when absorbed they induce **an alternating current at the same frequency as the radio wave in the receiving conductor**.',
      'Sterilisation requires radiation that can kill microorganisms by **ionising and destroying their DNA**.',
    ],
    misconception: 'Visible light is only a tiny fraction of the electromagnetic spectrum. Radio waves carry very little energy per photon — they are non-ionising.',
    concept: 'Gamma rays have the highest frequency and energy — sufficient to kill bacteria and sterilise equipment. Radiation dose (sieverts) measures harm risk. Radio waves are generated by oscillating circuits and induce AC when absorbed. The visible spectrum (400–700 nm) is a very narrow band.',
  },
  lenses: {
    id: 'lenses', module: 'Waves', moduleColor: WC, course: 'physics-only',
    title: 'Lenses & Optics', subtitle: 'Convex, Concave, Magnification & Lens Power',
    description: 'Lenses refract (bend) light. Convex (converging) lenses bring parallel rays to a focal point — can produce real inverted images (object beyond focal point) or virtual upright magnified images (object within focal point, like a magnifying glass). Concave (diverging) lenses always produce virtual, upright, diminished images. Magnification = image height ÷ object height = image distance ÷ object distance (no units). Power of a lens: P = 1/f, where f is the focal length in metres — power is measured in dioptres (D). A shorter focal length = more powerful lens = greater bending of light.',
    lessonVisual: LensesLesson, ideaVisual: LensesIdea, realityVisual: LensesReality,
    question: 'A convex lens has a focal length of 0.25 m. What is its power?',
    questionSubtitle: 'Use P = 1/f',
    options: ['0.25 D', '4 D', '25 D', '2.5 D'],
    correctAnswer: 1,
    keywords: ['magnification', 'power of a lens', 'P = 1/f', 'dioptres', 'focal length', 'convex lens', 'concave lens', 'real image', 'virtual image', 'focal point', 'image height', 'object height'],
    sentenceStarters: ['Using P = 1/f, the power = ...', 'P = 1 ÷ 0.25 = ...', 'Power is measured in dioptres (D), where 1 D = ...', 'A shorter focal length means a more powerful lens because...', 'Magnification = image height ÷ object height = ...'],
    modelAnswers: [
      'Using P = 1/f, the power = **1 ÷ 0.25 = 4 D (dioptres)**.',
      'P = 1 ÷ 0.25 = **4 D**.',
      'Power is measured in dioptres (D), where **1 D = 1 m⁻¹ — a lens with f = 1 m has power 1 D**.',
      'A shorter focal length means a more powerful lens because **it bends parallel rays more steeply to converge them sooner**.',
      'Magnification = image height ÷ object height — **a magnification of 3 means the image is three times the size of the object**.',
    ],
    misconception: 'Concave lenses always produce virtual images — never real. A higher power lens has a shorter (not longer) focal length.',
    concept: 'P = 1/f = 1/0.25 = 4 D. Power measures how strongly the lens bends light. Magnification = image/object height (no units). Convex: real image when object > f; virtual magnified when object < f. Concave: always virtual.',
  },
  black_body: {
    id: 'black_body', module: 'Waves', moduleColor: WC, practicalId: 'radiation', course: 'physics-only',
    title: 'Black Body Radiation', subtitle: 'Emission, Absorption & Earth\'s Temperature',
    description: 'All objects above absolute zero emit infrared radiation. Hotter objects emit more radiation at shorter wavelengths. A perfect black body absorbs all radiation and is the best possible emitter. At constant temperature, absorption rate = emission rate. Earth\'s temperature depends on absorption and emission of radiation - basis of climate science.',
    lessonVisual: BlackBodyLesson, ideaVisual: BlackBodyIdea, realityVisual: BlackBodyReality,
    question: 'At what temperature does an object stop emitting infrared radiation?',
    questionSubtitle: 'Think about what absolute zero means',
    options: ['0°C', '−100°C', 'It always emits - never stops', '100°C'],
    correctAnswer: 2,
    keywords: ['infrared radiation', 'thermal emission', 'absolute zero', 'temperature', 'emit', 'wavelength', 'all objects', 'never stops'],
    sentenceStarters: ['All objects above absolute zero emit infrared radiation...', 'Infrared radiation is emitted by all objects because they have thermal energy...', 'The answer is that objects never stop emitting IR  -  they emit at all temperatures above absolute zero...', 'At absolute zero (0 K / −273°C) an object would stop emitting...', 'Temperature affects the amount and wavelength of infrared emitted...'],
    modelAnswers: [
      'All objects above absolute zero emit infrared radiation ** -  every object with thermal energy radiates IR**.',
      'Infrared radiation is emitted by all objects because **they have thermal (internal) energy  -  the hotter the object, the more IR it emits**.',
      'The answer is that objects never stop emitting IR  -  **they emit at all temperatures above absolute zero (0 K / −273°C)**.',
      'At absolute zero (0 K / −273°C) **an object would theoretically stop emitting  -  but nothing in practice reaches absolute zero**.',
      'Temperature affects the amount and wavelength of infrared emitted ** -  hotter objects emit more IR at shorter wavelengths**.',
    ],
    misconception: 'All objects above absolute zero (−273°C) continuously emit infrared radiation.',
    concept: 'Even a block of ice at 0°C emits infrared radiation - less than a warm object, but still emitting. Only at absolute zero (−273°C) would emission theoretically stop. This is why thermal cameras can detect any object warmer than absolute zero.',
  },
  magnetism_fields: {
    id: 'magnetism_fields', module: 'Magnetism', moduleColor: MC, course: 'combined',
    title: 'Permanent & Induced Magnetism', subtitle: 'Magnetic Fields and Compass',
    description: 'Magnets have north and south poles. Like poles repel; unlike poles attract. The region where a magnetic force acts is called a magnetic field. Magnetic field direction: from north to south pole. Magnetic materials: iron, steel, nickel, cobalt. A compass is a small magnet that aligns with the Earth\'s magnetic field.',
    lessonVisual: MagnetismLesson, ideaVisual: MagnetismIdea, realityVisual: MagnetismReality,
    question: 'What happens when two north poles of magnets are brought together?',
    questionSubtitle: 'Like poles...',
    options: ['They attract strongly', 'They repel each other', 'Nothing - magnetism only works at a distance', 'The stronger magnet attracts the weaker one'],
    correctAnswer: 1,
    keywords: ['magnetic poles', 'like poles repel', 'unlike poles attract', 'north pole', 'south pole', 'magnetic field', 'force', 'permanent magnet'],
    sentenceStarters: ['Like poles repel and unlike poles attract...', 'Two north poles repel because they are like poles...', 'Magnetic field lines show that north-north poles...', 'The rule for magnetic poles is: like poles... unlike poles...', 'Two north poles are like poles, so they experience a...'],
    modelAnswers: [
      'Like poles repel and unlike poles attract, **so two north poles will repel each other**.',
      'Two north poles repel because **they are like poles  -  the magnetic field lines push them apart**.',
      'Magnetic field lines show that north-north poles **have lines pointing away from each other  -  indicating repulsion**.',
      'The rule for magnetic poles is: like poles **repel; unlike poles attract**.',
      'Two north poles are like poles, so they experience **a repulsive force pushing them apart**.',
    ],
    misconception: 'Magnetic forces act at a distance - no contact is needed.',
    concept: 'Like poles (N-N or S-S) repel; unlike poles (N-S) attract. The magnetic field extends outward from the poles through space - this is a non-contact force. Iron filings can be used to visualise field lines.',
  },
  motor_effect: {
    id: 'motor_effect', module: 'Magnetism', moduleColor: MC, course: 'combined',
    title: 'The Motor Effect', subtitle: "F = BIL, Fleming's Left Hand Rule & Loudspeakers",
    description: 'A current-carrying conductor in a magnetic field experiences a force (the motor effect). F = BIL (force = magnetic flux density × current × length). Fleming\'s Left Hand Rule: thumb = force/motion, index = magnetic field (N to S), middle finger = current direction. In a loudspeaker, a varying AC current flows through a voice coil inside a permanent magnet — the changing force moves the coil and attached cone in and out, creating pressure variations in air that we hear as sound. Reversing current reverses the force direction, enabling both compressions and rarefactions.',
    lessonVisual: MotorEffectLesson, ideaVisual: MotorEffectIdea, realityVisual: MotorEffectReality,
    question: 'What happens to the force on a current-carrying conductor if the current is doubled?',
    questionSubtitle: 'Use F = BIL',
    options: ['Force halves', 'Force stays the same', 'Force doubles', 'Force quadruples'],
    correctAnswer: 2,
    keywords: ['current-carrying conductor', 'magnetic field', 'force', 'F = BIL', 'current', 'directly proportional', 'motor effect', 'magnetic flux density', 'loudspeaker', 'voice coil', 'cone', 'pressure variations', 'sound'],
    sentenceStarters: ['Using F = BIL, if I doubles then F...', 'Force on a conductor is directly proportional to current...', 'In a loudspeaker, the varying current in the voice coil creates a changing force that...', 'The motor effect occurs when a current-carrying conductor is placed in a...', 'A loudspeaker converts electrical energy to sound by...'],
    modelAnswers: [
      'Using F = BIL, if I doubles then F **doubles  -  force is directly proportional to current**.',
      'Force on a conductor is directly proportional to current, **so doubling current doubles the force**.',
      'In a loudspeaker, the varying current in the voice coil creates a changing force that **moves the cone in and out, creating pressure variations in air that we hear as sound**.',
      'The motor effect occurs when a current-carrying conductor is placed in a **magnetic field  -  it experiences a force**.',
      'A loudspeaker converts electrical energy to sound by **using the motor effect: AC current in a coil creates varying forces, vibrating a cone to produce sound waves**.',
    ],
    misconception: 'Force is zero when current is parallel to the magnetic field, not maximum.',
    concept: 'F = BIL - force is directly proportional to current. Doubling I doubles F. Force is maximum when current is perpendicular (90°) to the field. Loudspeaker: AC current in voice coil → alternating force → cone vibration → sound waves. Microphone does the reverse (generator effect).',
  },
  electromagnetism: {
    id: 'electromagnetism', module: 'Magnetism & Electromagnetism', moduleColor: MC, course: 'combined',
    title: 'Electromagnetism', subtitle: 'Current Creates Magnetic Fields',
    description: 'A current-carrying wire creates a circular magnetic field around it. A solenoid (coil of wire with current) creates a magnetic field similar to a bar magnet, with distinct north and south poles. Strength is increased by: more current, more turns, adding a soft iron core. Applications include electric bells, relay switches and loudspeakers.',
    lessonVisual: ElectromagnetismLesson, ideaVisual: ElectromagnetismIdea, realityVisual: ElectromagnetismReality,
    question: 'Which change would NOT increase the strength of an electromagnet?',
    questionSubtitle: 'Think about what factors affect magnetic field strength',
    options: ['Increasing the current', 'Adding a soft iron core', 'Increasing the number of coil turns', 'Using a thicker copper wire'],
    correctAnswer: 3,
    keywords: ['electromagnet', 'solenoid', 'magnetic field', 'iron core', 'current', 'turns', 'relay', 'electric bell', 'loudspeaker', 'right-hand rule'],
    sentenceStarters: ['A current-carrying wire creates a magnetic field because...', 'The strength of an electromagnet can be increased by...', 'A solenoid behaves like a bar magnet because...', 'An iron core increases field strength because...', 'In a relay switch, the electromagnet...'],
    modelAnswers: [
      'A current-carrying wire creates a magnetic field because **moving electric charges produce a magnetic field around them — the field forms concentric circles around the wire**.',
      'The strength of an electromagnet can be increased by **increasing the current, increasing the number of turns, or inserting a soft iron core**.',
      'A solenoid behaves like a bar magnet because **the fields from each loop of wire add together to create a uniform field inside the coil with distinct north and south poles**.',
      'An iron core increases field strength because **soft iron is easily magnetised and concentrates the magnetic field lines, greatly amplifying the total field**.',
      'In a relay switch, the electromagnet **attracts a soft iron armature when switched on, closing a separate high-current circuit — allowing a small current to control a much larger one safely**.',
    ],
    misconception: 'Thicker wire does not increase magnetic field strength — it is current and number of turns that matter, not wire thickness.',
    concept: 'Solenoid = bar magnet. Strength: ↑ current, ↑ turns, iron core. Applications: bells, relays, loudspeakers. Thicker wire has NO effect on field strength.',
  },
  em_induction: {
    id: 'em_induction', module: 'Magnetism', moduleColor: MC, course: 'physics-only',
    title: 'EM Induction & Transformers', subtitle: 'Generator Effect, Vp/Vs = Np/Ns & VpIp = VsIs',
    description: 'Moving a conductor relative to a magnetic field (or changing the field) induces a potential difference — the generator effect. Factors affecting induced pd: speed of movement, magnetic field strength, number of turns. Transformers use AC to change voltage: Vp/Vs = Np/Ns. For a 100% efficient transformer, power in = power out: VpIp = VsIs. A microphone uses the generator effect: sound waves vibrate a coil in a magnetic field, inducing a current that mirrors the pressure wave — the reverse of a loudspeaker. National Grid uses high voltage (low current) to minimise energy losses (P = I²R).',
    lessonVisual: EMInductionLesson, ideaVisual: EMInductionIdea, realityVisual: EMInductionReality,
    question: 'A transformer steps up 25 V to 250 V. If the secondary current is 0.5 A, what is the primary current? (Assume 100% efficiency)',
    questionSubtitle: 'Use VpIp = VsIs',
    options: ['0.05 A', '5 A', '0.5 A', '50 A'],
    correctAnswer: 1,
    keywords: ['transformer', 'turns ratio', 'Vp/Vs = Np/Ns', 'VpIp = VsIs', 'primary coil', 'secondary coil', 'step-up transformer', 'transformer efficiency', 'microphone', 'generator effect', 'sound to electrical signal', 'electromagnetic induction'],
    sentenceStarters: ['Using VpIp = VsIs, power in = power out, so Ip = ...', 'A 100% efficient transformer conserves power, so VpIp = VsIs gives...', 'A microphone uses the generator effect because...', 'The turns ratio Vp/Vs = Np/Ns means that stepping up voltage by 10× means...', 'In the National Grid, high voltage is used to minimise losses because...'],
    modelAnswers: [
      'Using VpIp = VsIs, power in = power out, so Ip = **VsIs ÷ Vp = (250 × 0.5) ÷ 25 = 5 A**.',
      'A 100% efficient transformer conserves power, so VpIp = VsIs gives **Ip = (250 × 0.5) ÷ 25 = 5 A**.',
      'A microphone uses the generator effect because **sound waves vibrate a coil inside a magnetic field, inducing a current that mirrors the sound wave — the electrical signal matches the pressure variations**.',
      'The turns ratio Vp/Vs = Np/Ns means that stepping up voltage by 10× means **the current is reduced by 10× (if 100% efficient), because power = VI must be conserved**.',
      'In the National Grid, high voltage is used to minimise losses because **P = I²R, so lower current dramatically reduces the power wasted as heat in the cables**.',
    ],
    misconception: 'Transformers require AC - they cannot work with DC. A 100% efficient transformer does not gain energy - it trades voltage for current proportionally.',
    concept: 'Generator effect: moving conductor in field → induced pd. Transformer turns ratio: Vp/Vs = Np/Ns. Power conservation: VpIp = VsIs → Ip = (250 × 0.5) ÷ 25 = 5 A. Microphone = generator effect (sound → electricity). National Grid: high V, low I → minimal I²R losses.',
  },
  ac_generators: {
    id: 'ac_generators', module: 'Magnetism & Electromagnetism', moduleColor: MC, course: 'physics-only',
    title: 'AC Generators & Dynamos', subtitle: 'Alternators (AC) vs Dynamos (DC)',
    description: 'An AC generator (alternator) converts kinetic energy into electrical energy. A coil rotates in a magnetic field — as it cuts through field lines, an EMF is induced. The direction of induced current reverses each half-turn, producing alternating current. Slip rings and brushes maintain continuous electrical contact, preserving the AC. A dynamo uses a split-ring commutator instead — the connections are reversed every half-turn so the current always flows the same way through the external circuit, producing direct current (DC). Output voltage is increased by rotating faster (also increases frequency), using a stronger magnet, or adding more turns.',
    lessonVisual: ACGeneratorsLesson, ideaVisual: ACGeneratorsIdea, realityVisual: ACGeneratorsReality,
    question: 'How does an AC generator produce alternating current?',
    questionSubtitle: 'Think about what happens as the coil rotates',
    options: ['The slip rings reverse the current every half-turn', 'The coil cuts field lines and the direction of induced EMF reverses each half-turn', 'The magnetic field automatically alternates direction', 'The brushes push current in alternating directions'],
    correctAnswer: 1,
    keywords: ['AC generator', 'alternator', 'slip rings', 'brushes', 'rotating coil', 'magnetic field', 'induced EMF', 'alternating current', 'electromagnetic induction', 'frequency', 'dynamo', 'split-ring commutator', 'direct current', 'DC generator'],
    sentenceStarters: ['An AC generator works by...', 'The current alternates because...', 'A dynamo differs from an AC generator because it uses a split-ring commutator, which...', 'Slip rings are used in an alternator because...', 'The output voltage can be increased by...'],
    modelAnswers: [
      'An AC generator works by **rotating a coil in a magnetic field — as the coil cuts through field lines, an EMF is induced by electromagnetic induction**.',
      'The current alternates because **each half-turn the coil sides swap which direction they cut through the field lines, reversing the induced EMF and therefore the current direction**.',
      'A dynamo differs from an AC generator because it uses a split-ring commutator, which **swaps the connections every half-turn, ensuring current always flows the same way through the external circuit, producing DC**.',
      'Slip rings are used in an alternator because **they allow continuous rotation while maintaining contact, preserving the alternating nature of the current**.',
      'The output voltage can be increased by **rotating the coil faster (also increases frequency), using a stronger magnet, or increasing the number of turns on the coil**.',
    ],
    misconception: 'Slip rings do NOT reverse the current — they just maintain contact. It is the split-ring commutator in a dynamo that rectifies the output to DC by reversing connections each half-turn.',
    concept: 'Alternator (AC): slip rings → output alternates naturally with coil rotation. Dynamo (DC): split-ring commutator → reverses connections each half-turn → DC output. Both increase output with speed, field strength, or turns.',
  },
  solar_system: {
    id: 'solar_system', module: 'Space', moduleColor: SC, course: 'physics-only',
    title: 'Solar System & Orbital Motion', subtitle: 'Gravity, Circular Orbits & Satellites',
    description: 'Our solar system: Sun, 8 planets, dwarf planets, moons, asteroids, comets. Gravity provides the centripetal force for orbital motion. In a circular orbit, the speed is constant but the velocity direction continuously changes — the object is always accelerating towards the centre (centripetal acceleration), so velocity is not constant. A satellite moving faster must be in a lower orbit to remain stable; a higher orbit requires a slower speed. Artificial satellites orbit Earth for GPS, communications, and weather monitoring.',
    lessonVisual: SolarSystemLesson, ideaVisual: SolarSystemIdea, realityVisual: SolarSystemReality,
    question: 'What force keeps a planet in its orbit around the Sun?',
    questionSubtitle: 'Think about what provides the centripetal force',
    options: ['The planet\'s own momentum', 'Gravitational attraction towards the Sun', 'Magnetic force from the Sun', 'Atmospheric pressure'],
    correctAnswer: 1,
    keywords: ['gravity', 'gravitational attraction', 'orbit', 'centripetal force', 'mass', 'distance', 'inverse square law', 'Sun', 'speed constant velocity changes', 'lower orbit faster', 'higher orbit slower', 'centripetal acceleration'],
    sentenceStarters: ['Gravity provides the centripetal force that keeps the planet in orbit...', 'In a circular orbit, speed is constant but velocity is not because...', 'A satellite in a higher orbit must travel more slowly because...', 'Without gravity, the planet would travel in a straight line...', 'The planet orbits because gravity constantly changes its direction of travel, so...'],
    modelAnswers: [
      'Gravity provides the centripetal force that keeps the planet in orbit ** -  it always pulls the planet towards the Sun**.',
      'In a circular orbit, speed is constant but velocity is not because **velocity is a vector — its direction continuously changes as the planet curves around the Sun**.',
      'A satellite in a higher orbit must travel more slowly because **at a greater distance, the gravitational force is weaker, requiring a lower orbital speed for a stable path**.',
      'Without gravity, the planet would travel in **a straight line at constant speed  -  gravity curves its path into an orbit**.',
      'The planet orbits because gravity constantly changes its direction of travel, so **although speed is unchanged, velocity changes — there is centripetal acceleration towards the Sun**.',
    ],
    misconception: 'Gravity acts across all of space - not just near planets. In a circular orbit, speed is constant but velocity is NOT constant — direction changes continuously.',
    concept: 'Gravity provides centripetal force. In a circular orbit: speed constant, velocity direction always changing → centripetal acceleration. Higher orbit = slower orbital speed; faster satellite → lower orbit needed for stability.',
  },
  stellar_evolution: {
    id: 'stellar_evolution', module: 'Space', moduleColor: SC, course: 'physics-only',
    title: 'Stellar Evolution', subtitle: 'Life Cycle of Stars & Main Sequence Stability',
    description: 'Stars form from nebulae (clouds of gas and dust) pulled together by gravity — this is the protostar stage. When core temperature is high enough, hydrogen fusion begins: this is the main sequence stage. During main sequence, the star is stable because inward gravitational force is balanced by outward radiation pressure from fusion — this equilibrium can last billions of years. When hydrogen runs out, balance is lost: a Sun-like star expands to a red giant, ejects its outer layers as a planetary nebula, then collapses to a white dwarf (gradually cooling to a black dwarf). Massive stars become red supergiants, then collapse and explode as supernovae — producing all elements heavier than iron — then form neutron stars or black holes.',
    lessonVisual: StellarEvolutionLesson, ideaVisual: StellarEvolutionIdea, realityVisual: StellarEvolutionReality,
    question: 'What is the final stage of a massive star\'s life cycle?',
    questionSubtitle: 'Larger than the Sun - goes through supernova',
    options: ['White dwarf', 'Red giant', 'Black dwarf', 'Neutron star or black hole'],
    correctAnswer: 3,
    keywords: ['protostar', 'main sequence', 'red giant', 'white dwarf', 'red supergiant', 'supernova', 'neutron star', 'black hole', 'stellar evolution', 'nuclear fusion', 'radiation pressure', 'gravitational force', 'equilibrium', 'massive star'],
    sentenceStarters: ['A star is stable on the main sequence because...', 'Radiation pressure from fusion balances...', 'A massive star ends its life as a neutron star or black hole...', 'A supernova explosion occurs when the star runs out of...', 'Elements heavier than iron are formed in...'],
    modelAnswers: [
      'A star is stable on the main sequence because **radiation pressure from fusion outward exactly balances inward gravitational force**.',
      'Radiation pressure from fusion balances **the inward pull of gravity, keeping the star at a steady size and temperature for billions of years**.',
      'A massive star ends its life as a neutron star or **black hole, depending on its mass**.',
      'A supernova explosion occurs when **the star runs out of fuel, fusion stops, radiation pressure drops, and gravity causes rapid collapse then rebound**.',
      'Elements heavier than iron are formed in **supernova explosions — the only events energetic enough to fuse iron into heavier nuclei**.',
    ],
    misconception: 'The Sun will NOT become a supernova — only stars much more massive than the Sun do. Main sequence stability requires both fusion AND gravity to be present.',
    concept: 'Main sequence stability: gravity in = radiation pressure out. When fuel runs out, this balance breaks. Sun-like: red giant → white dwarf → black dwarf. Massive: red supergiant → supernova → neutron star/black hole. Supernovae make all elements heavier than iron.',
  },
  visible_light: {
    id: 'visible_light', module: 'Waves', moduleColor: WC, course: 'physics-only',
    title: 'Visible Light & Colour', subtitle: 'Specular vs Diffuse Reflection, Filters & Colour',
    description: 'Specular reflection occurs at smooth surfaces — incident rays reflect in a single direction (angle of incidence = angle of reflection). Diffuse reflection occurs at rough surfaces — rays scatter in many directions, making objects visible from all angles. A colour filter absorbs all wavelengths except its own colour, which it transmits. An opaque object reflects some wavelengths and absorbs others — the reflected wavelengths determine its colour. A white object reflects all wavelengths; a black object absorbs all. An object can only reflect wavelengths present in the incident light — a blue object under red light looks black because it absorbs red and has no blue to reflect.',
    lessonVisual: VisibleLightLesson, ideaVisual: VisibleLightIdea, realityVisual: VisibleLightReality,
    question: 'A green filter is placed in front of a white light source. A red object is then illuminated. What colour does the red object appear?',
    questionSubtitle: 'Think about which wavelengths the filter transmits, and which the object can reflect',
    options: ['Red', 'Green', 'Yellow', 'Black'],
    correctAnswer: 3,
    keywords: ['specular reflection', 'diffuse reflection', 'colour filter', 'absorb wavelength', 'transmit wavelength', 'opaque', 'transparent', 'translucent', 'white reflects all', 'black absorbs all', 'angle of incidence', 'angle of reflection', 'smooth surface', 'rough surface'],
    sentenceStarters: ['The green filter only transmits green light, so...', 'The red object can only reflect red wavelengths, but...', 'Specular reflection occurs at smooth surfaces because...', 'Diffuse reflection happens at rough surfaces because...', 'An object appears a certain colour because it reflects those wavelengths and...'],
    modelAnswers: [
      'The green filter only transmits green light, so **only green wavelengths reach the red object**.',
      'The red object can only reflect red wavelengths, but **no red light is present (it was absorbed by the filter), so it absorbs the green light and appears black**.',
      'Specular reflection occurs at smooth surfaces because **all rays strike the surface at the same angle and reflect in a single parallel direction**.',
      'Diffuse reflection happens at rough surfaces because **different parts of the surface face different directions, scattering reflected rays in many directions**.',
      'An object appears a certain colour because it reflects those wavelengths and **absorbs all others — the reflected wavelengths reach our eyes and we perceive them as colour**.',
    ],
    misconception: 'An object cannot create colour — it can only reflect wavelengths that are already in the incident light. If the matching wavelength is absent, the object appears black.',
    concept: 'Specular (smooth): one reflection direction. Diffuse (rough): scattered. Filter: absorbs other wavelengths, transmits its colour. Object colour = reflected wavelengths. White = reflects all. Black = absorbs all. Blue object + red light → absorbs red, no blue to reflect → looks black.',
  },
  redshift: {
    id: 'redshift', module: 'Space', moduleColor: SC, course: 'physics-only',
    title: 'Red-shift & The Big Bang', subtitle: 'Expanding Universe, Dark Matter & Dark Energy',
    description: 'Red-shift: light from distant galaxies is shifted towards the red end of the spectrum — their wavelength is stretched. This shows galaxies are moving away from us. Farther galaxies have greater red-shift (moving faster) — evidence the universe is expanding and supports the Big Bang theory (universe began from a single hot, dense point ~13.8 billion years ago). Since 1998, observations of supernovae show distant galaxies are receding ever faster. Much remains unexplained: dark matter (provides extra gravity, holds galaxies together, does not emit EM radiation) and dark energy (drives the ever-faster expansion) together account for about 95% of the universe\'s content.',
    lessonVisual: RedshiftLesson, ideaVisual: RedshiftIdea, realityVisual: RedshiftReality,
    question: 'What does red-shift in light from a distant galaxy tell us?',
    questionSubtitle: 'Think about the Doppler effect analogy',
    options: ['The galaxy is very hot', 'The galaxy is moving towards us', 'The galaxy is moving away from us', 'The galaxy contains red stars'],
    correctAnswer: 2,
    keywords: ['red-shift', 'Doppler effect', 'galaxy', 'moving away', 'wavelength stretched', 'expanding universe', 'Big Bang', 'recession velocity', 'dark matter', 'dark energy', 'supernovae', 'universe accelerating'],
    sentenceStarters: ['Red-shift means the wavelength of light has increased because...', 'If a galaxy shows red-shift, it is moving away from us...', 'Dark matter is matter that does not emit EM radiation but...', 'Dark energy is the name given to the unknown cause of...', 'The further a galaxy is, the greater its red-shift because...'],
    modelAnswers: [
      'Red-shift means the wavelength of light has increased because **the galaxy is moving away from us, stretching the light waves**.',
      'If a galaxy shows red-shift, it is moving **away from us  -  the Doppler effect stretches the wavelength towards the red end**.',
      'Dark matter is matter that does not emit EM radiation but **exerts gravitational force — it holds galaxies together and makes up most of the universe\'s mass**.',
      'Dark energy is the name given to the unknown cause of **the ever-faster expansion of the universe — it appears to oppose gravity on the largest scales**.',
      'The further a galaxy is, the greater its red-shift because **it is moving away faster  -  evidence for the Big Bang and the expanding universe**.',
    ],
    misconception: 'Red-shift means the galaxy is moving AWAY - not towards us. Dark matter is NOT dark energy — dark matter provides extra gravity; dark energy drives expansion.',
    concept: 'Red-shift → galaxies receding → universe expanding → Big Bang. Hubble\'s Law: further = faster recession. Since 1998: expansion accelerating (supernovae evidence). Dark matter: provides gravity, no EM emission; dark energy: drives accelerating expansion. Together ~95% of universe.',
  },
}
