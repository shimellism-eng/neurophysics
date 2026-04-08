import { motion } from 'motion/react'
import { useState, useEffect } from 'react'
import { Waves, Radio, Eye, Sun } from 'lucide-react'
import { IdeaCaption, RealityBadge, FormulaBox, MisconceptionCard, RealWorldCard } from './visuals-helpers'

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
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 px-4 py-3">
      <MisconceptionCard
        wrong="Sound waves are transverse — particles vibrate up and down, perpendicular to the wave direction, like water waves."
        right="Sound is a longitudinal wave — air particles vibrate back and forth parallel to the direction the wave travels, creating compressions and rarefactions."
        wrongLabel="Transverse confusion"
        rightLabel="Longitudinal: parallel vibration"
      />
    </div>
  )
}
function WaveTypesReality() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 px-4 py-3">
      <RealWorldCard icon="🎵" title="Concert hall acoustics" desc="Sound travels as longitudinal pressure waves through air at 343 m/s. Engineers design hall shapes to control reflections and prevent echoes — all based on longitudinal wave behaviour." color="#fdc700" delay={0} />
      <RealWorldCard icon="🌊" title="Seismic waves — earthquake detection" desc="P-waves (longitudinal) travel through Earth's core; S-waves (transverse) cannot. The absence of S-waves in the shadow zone proved Earth has a liquid outer core." color="#3b82f6" delay={0.1} />
      <RealWorldCard icon="🌞" title="Light — transverse EM wave" desc="Light waves vibrate perpendicular to their direction of travel — that's why they can be polarised. Longitudinal waves cannot be polarised (polaroid sunglasses work only on transverse waves)." color="#f97316" delay={0.2} />
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
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 px-4 py-3">
      <MisconceptionCard
        wrong="Higher frequency waves travel faster — more oscillations per second must mean the wave covers more ground."
        right="Wave speed depends on the medium, not the frequency. v = fλ means if frequency doubles, wavelength halves — speed stays the same. All EM waves travel at c = 3×10⁸ m/s in vacuum."
        wrongLabel="Frequency ≠ speed"
        rightLabel="v = fλ, speed fixed by medium"
      />
    </div>
  )
}
function WavePropertiesReality() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 px-4 py-3">
      <RealWorldCard icon="🎸" title="Guitar strings — pitch vs speed" desc="Plucking harder increases amplitude (louder), not speed. A thinner string vibrates at higher frequency, giving shorter wavelength at the same speed — higher pitch." color="#fdc700" delay={0} />
      <RealWorldCard icon="📻" title="Radio stations — same speed, different λ" desc="BBC Radio 4 (198 kHz) and Radio 1 (97.6 MHz) both travel at c = 3×10⁸ m/s. Their wavelengths differ: Radio 4 λ ≈ 1500 m, Radio 1 λ ≈ 3 m." color="#3b82f6" delay={0.1} />
      <RealWorldCard icon="🌊" title="Ripple tank — refraction" desc="Water waves slow down in shallower water. Frequency stays constant (same source), so wavelength decreases — the waves bunch up and change direction." color="#10b981" delay={0.2} />
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
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 px-4 py-3">
      <MisconceptionCard
        wrong="When light enters glass it speeds up — glass is transparent so light passes through more easily and faster."
        right="Light slows down in denser media (glass, water). The refractive index n = c/v, so n > 1 for glass means v < c. It bends towards the normal because it slows down."
        wrongLabel="Transparency ≠ speed"
        rightLabel="Denser medium → slower light"
      />
    </div>
  )
}
function WaveReflectionReality() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 px-4 py-3">
      <RealWorldCard icon="💎" title="Diamond sparkle — high refractive index" desc="Diamond has n = 2.42 — much higher than glass (n = 1.5). Light slows dramatically, bends sharply, and undergoes total internal reflection multiple times, creating brilliance." color="#fdc700" delay={0} />
      <RealWorldCard icon="🌈" title="Rainbows — dispersion in raindrops" desc="White light refracts on entering a raindrop, separating wavelengths (violet bends most). Each colour exits at a slightly different angle — creating the colour arc." color="#ef4444" delay={0.1} />
      <RealWorldCard icon="🔭" title="Astronomical refraction" desc="Stars near the horizon appear slightly higher than they are. Earth's atmosphere acts as a lens — light bends as it passes through layers of increasing density." color="#3b82f6" delay={0.2} />
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
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 px-4 py-3">
      <MisconceptionCard
        wrong="Total internal reflection happens when light hits any boundary — you just need a reflective surface."
        right="TIR requires TWO conditions: (1) light travelling from denser to less dense medium, AND (2) angle of incidence exceeding the critical angle. Both must be met — neither alone is enough."
        wrongLabel="Missing the conditions"
        rightLabel="Two conditions required"
      />
    </div>
  )
}

function TotalInternalReflectionReality() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 px-4 py-3">
      <RealWorldCard icon="🌐" title="Fibre optic internet" desc="Light pulses bounce along glass fibres by repeated TIR at near c = 2×10⁸ m/s in glass. One hair-thin fibre carries billions of bits per second — the backbone of the internet." color="#fdc700" delay={0} />
      <RealWorldCard icon="🏥" title="Medical endoscopes" desc="Surgeons use fibre bundles to image inside the body without surgery. One bundle carries light in; another carries the image out — all via TIR. Critical angle of glass ≈ 42°." color="#10b981" delay={0.1} />
      <RealWorldCard icon="💎" title="Sparkling jewellery" desc="Diamonds and cut glass are shaped so that most incident light undergoes TIR internally, bouncing multiple times before exiting — creating the characteristic sparkle." color="#3b82f6" delay={0.2} />
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
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 px-4 py-3">
      <MisconceptionCard
        wrong="Sound travels fastest through air — air is easy to compress, so the waves move quickly through it."
        right="Sound travels fastest through solids (steel ~5000 m/s), then liquids (~1500 m/s), then gases (~340 m/s). Closer-packed particles pass vibrations on more quickly."
        wrongLabel="Compression confusion"
        rightLabel="Solids fastest"
      />
    </div>
  )
}
function SoundWavesReality() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 px-4 py-3">
      <RealWorldCard icon="🏊" title="Underwater communication" desc="Sound travels at ~1500 m/s in water — 4× faster than air. Whales communicate across ocean basins using deep-water acoustic channels. Navy sonar exploits this." color="#3b82f6" delay={0} />
      <RealWorldCard icon="🌍" title="Seismology — Earth's interior" desc="P-waves travel through Earth at ~8000 m/s through rock. By timing arrivals at different stations, seismologists map the Earth's layers — including the liquid outer core." color="#f97316" delay={0.1} />
      <RealWorldCard icon="🩺" title="Ultrasound scanning" desc="Medical ultrasound (1–20 MHz) reflects off tissue boundaries. The echo timing reveals depth: v = 1540 m/s in tissue, so distance = v × t/2. No radiation risk." color="#10b981" delay={0.2} />
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
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 px-4 py-3">
      <MisconceptionCard
        wrong="Visible light is the entire electromagnetic spectrum — the different colours are just different types of radiation."
        right="Visible light (400–700 nm) is a tiny slice of the EM spectrum. Radio waves can be kilometres long; gamma rays are smaller than an atom. All travel at c = 3×10⁸ m/s in vacuum."
        wrongLabel="Human perception limits"
        rightLabel="7 types, vast range"
      />
    </div>
  )
}
function EMSpectrumReality() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 px-4 py-3">
      <RealWorldCard icon="📡" title="Radio waves — TV & communications" desc="FM radio λ ≈ 3 m. The wavelength is large enough to diffract around hills, which is why you can get radio signal without line-of-sight to the transmitter." color="#6366f1" delay={0} />
      <RealWorldCard icon="🔬" title="X-rays — medical imaging" desc="X-ray wavelengths (0.01–10 nm) are similar in size to atoms. They pass through soft tissue but are absorbed by denser bone — creating contrast in images." color="#3b82f6" delay={0.1} />
      <RealWorldCard icon="🌞" title="Infrared — heat cameras" desc="Everything above absolute zero emits infrared. Heat cameras detect temperature differences as small as 0.05°C — used in building insulation checks and medical diagnosis." color="#f97316" delay={0.2} />
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
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 px-4 py-3">
      <MisconceptionCard
        wrong="Concave lenses produce small, inverted (upside-down) images — just like convex lenses do when the object is far away."
        right="Concave (diverging) lenses always produce virtual, upright, diminished images — regardless of object distance. Only convex lenses can produce real, inverted images."
        wrongLabel="Lens type confusion"
        rightLabel="Concave = always virtual & upright"
      />
    </div>
  )
}
function LensesReality() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 px-4 py-3">
      <RealWorldCard icon="📷" title="Camera — convex lens" desc="A camera lens converges light onto the sensor, forming a real, inverted, diminished image. Moving the lens changes focal distance — further lens = closer subject in focus." color="#fdc700" delay={0} />
      <RealWorldCard icon="👓" title="Glasses — correcting eyesight" desc="Short-sighted (myopia): concave lens diverges light before it reaches the eye, moving the focal point back onto the retina. Long-sighted: convex lens converges early." color="#10b981" delay={0.1} />
      <RealWorldCard icon="🔬" title="Microscope — compound lenses" desc="Two convex lenses in series: the objective forms a real, magnified image; the eyepiece magnifies it again as a virtual image. Total magnification = product of both." color="#3b82f6" delay={0.2} />
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
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 px-4 py-3">
      <MisconceptionCard
        wrong="Only very hot objects like the Sun emit radiation — cold objects don't emit anything at all."
        right="Every object above absolute zero (−273°C) emits infrared radiation. At room temperature, objects emit IR but not visible light. A human body emits about 100 W of infrared continuously."
        wrongLabel="Only hot things radiate?"
        rightLabel="All objects above 0 K radiate"
      />
    </div>
  )
}
function BlackBodyReality() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 px-4 py-3">
      <RealWorldCard icon="🌡️" title="Thermal cameras — seeing body heat" desc="Military and medical thermal cameras detect IR emitted by warm bodies (~37°C). The human body emits ~100 W of IR — visible to night-vision cameras even in total darkness." color="#fdc700" delay={0} />
      <RealWorldCard icon="🏠" title="House insulation — IR loss" desc="Thermal imaging shows where heat escapes through poorly insulated walls and roofs. Darker = cooler = better insulated. Warmer patches show energy waste." color="#f97316" delay={0.1} />
      <RealWorldCard icon="⭐" title="Star colours — Wien's Law" desc="Hotter stars emit shorter wavelength (bluer). The Sun (5500°C) peaks in yellow-green. Betelgeuse (3000°C) peaks in red-orange. Peak λ = 2.9×10⁻³/T." color="#3b82f6" delay={0.2} />
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
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 px-4 py-3">
      <MisconceptionCard
        wrong="Magnetic force only acts when magnets physically touch each other — they need contact to attract or repel."
        right="Magnetic force is a non-contact force that acts through a field extending through space. Magnets attract or repel across a gap — like gravity, no contact is needed."
        wrongLabel="Contact force myth"
        rightLabel="Non-contact field force"
      />
    </div>
  )
}
function MagnetismReality() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 px-4 py-3">
      <RealWorldCard icon="🧭" title="Compass navigation" desc="Earth's magnetic field extends thousands of km into space. A compass needle aligns with the field without touching anything — purely non-contact field interaction." color="#10b981" delay={0} />
      <RealWorldCard icon="🏥" title="MRI scanners" desc="MRI machines use superconducting electromagnets generating fields 30,000× stronger than Earth's — strong enough to pull loose metal objects across the room without contact." color="#e879f9" delay={0.1} />
      <RealWorldCard icon="🚄" title="Maglev trains" desc="Magnetic levitation (maglev) trains float above the track using repulsion between superconducting magnets — no contact, no friction, speeds exceeding 600 km/h." color="#fdc700" delay={0.2} />
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
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 px-4 py-3">
      <MisconceptionCard
        wrong="Maximum force on a current-carrying wire occurs when the current flows in the same direction as the magnetic field."
        right="Force is maximum when current is perpendicular to the field (F = BIL). When current is parallel to the field, the force is zero. Fleming's Left Hand Rule gives the direction."
        wrongLabel="Parallel = max force?"
        rightLabel="Perpendicular = max force"
      />
    </div>
  )
}
function MotorEffectReality() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 px-4 py-3">
      <RealWorldCard icon="⚡" title="Electric motors in EVs" desc="Tesla Model 3 uses a 3-phase AC motor where rotating magnetic fields exert forces on rotor windings (F = BIL). No brushes needed — highly reliable and efficient." color="#10b981" delay={0} />
      <RealWorldCard icon="🔊" title="Loudspeaker" desc="Current through the voice coil (in a magnetic field) creates a force: F = BIL. Varying the current with the audio signal makes the cone vibrate — producing sound waves." color="#fdc700" delay={0.1} />
      <RealWorldCard icon="🏥" title="Moving-coil galvanometer" desc="Sensitive current meters use F = BIL to deflect a coil against a spring. The deflection angle is proportional to current — the basis of most analogue meters." color="#e879f9" delay={0.2} />
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
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 px-4 py-3">
      <MisconceptionCard
        wrong="A thicker wire makes a stronger electromagnet — more metal means a stronger magnetic field."
        right="Electromagnet strength depends on current, number of turns, and core material — not wire thickness. Thicker wire reduces resistance (allowing more current), but at the same current it makes no difference."
        wrongLabel="Wire thickness myth"
        rightLabel="Current, turns & core material"
      />
    </div>
  )
}

function ElectromagnetismReality() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 px-4 py-3">
      <RealWorldCard icon="🧲" title="MRI scanners" desc="Superconducting electromagnets cooled to −269°C carry huge currents with zero resistance, producing fields 30 000× Earth's. Increasing turns and current achieves this without heat loss." color="#10b981" delay={0} />
      <RealWorldCard icon="🔔" title="Electric bell — relay action" desc="The electromagnet attracts the iron armature, striking the bell. This breaks the circuit, de-energising the magnet — the spring resets it, and it repeats ~50× per second." color="#fdc700" delay={0.1} />
      <RealWorldCard icon="🚗" title="Scrapyard electromagnet" desc="Electromagnets in scrap yards can lift several tonnes of steel. The current is switched off to drop the load — permanent magnets couldn't be turned off to release the steel." color="#ef4444" delay={0.2} />
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
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 px-4 py-3">
      <MisconceptionCard
        wrong="Transformers work on any type of electricity — DC from a battery can be stepped up or down just like AC."
        right="Transformers only work with AC. A changing magnetic flux is required to induce an EMF. DC creates a constant flux — no change, no induction, no output voltage."
        wrongLabel="DC works too?"
        rightLabel="Changing flux = changing current = AC only"
      />
    </div>
  )
}
function EMInductionReality() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 px-4 py-3">
      <RealWorldCard icon="⚡" title="National Grid transformers" desc="Step-up transformers at power stations convert ~25 kV to 400 kV AC for transmission. Step-down transformers near homes reduce it to 230 V. All require AC." color="#10b981" delay={0} />
      <RealWorldCard icon="📱" title="Wireless charging" desc="Phone wireless chargers use induction between two coils. High-frequency AC (100–200 kHz) in the base coil creates changing flux — inducing current in the phone coil." color="#fdc700" delay={0.1} />
      <RealWorldCard icon="🎸" title="Electric guitar pickup" desc="Guitar strings vibrate near a magnet and coil. The vibrating string changes the magnetic flux through the coil — inducing an AC voltage proportional to the note played." color="#e879f9" delay={0.2} />
    </div>
  )
}

// ─── Transformers ─────────────────────────────────────────────────────────────
function TransformersLesson() {
  const [type, setType] = useState('step-up')
  const isStepUp = type === 'step-up'
  const Np = isStepUp ? 100 : 400
  const Ns = isStepUp ? 400 : 100
  const Vp = 25
  const Vs = Math.round(Vp * (Ns / Np))
  const accentP = '#2b7fff'
  const accentS = isStepUp ? '#ef4444' : '#10b981'
  return (
    <div className="w-full flex flex-col gap-2 px-3 pt-2 pb-2">
      <div className="flex gap-2 justify-center">
        {[['step-up', 'Step Up (Vs > Vp)'], ['step-down', 'Step Down (Vs < Vp)']].map(([val, label]) => (
          <button key={val} onClick={() => setType(val)}
            className="px-3 py-1 rounded-[6px] text-xs font-semibold"
            style={{ background: type === val ? `${MC}25` : '#1d293d', color: type === val ? MC : '#a8b8cc', border: `1px solid ${type === val ? MC : '#2d3f5c'}` }}>
            {label}
          </button>
        ))}
      </div>
      <svg width="100%" viewBox="0 0 260 120" style={{ background: '#0f1829', borderRadius: 10, border: '1.5px solid #1d293d' }}>
        <rect x="10" y="35" width="70" height="50" rx="5" fill="#0d1e35" stroke={accentP} strokeWidth="1.8" />
        {[15,22,29,36,43,50,57,64].map((x,i) => (
          <path key={i} d={`M${x},35 Q${x+3},26 ${x+7},35`} fill="none" stroke={accentP} strokeWidth="1.5"/>
        ))}
        <text x="44" y="66" textAnchor="middle" fill={accentP} fontSize="7.5" fontWeight="700">Primary</text>
        <text x="44" y="76" textAnchor="middle" fill={accentP} fontSize="7">{`Np = ${Np}`}</text>
        <text x="44" y="86" textAnchor="middle" fill={accentP} fontSize="7">{`Vp = ${Vp} V`}</text>
        <rect x="80" y="45" width="98" height="30" rx="3" fill="#64748b30" stroke="#64748b" strokeWidth="1" />
        <text x="129" y="64" textAnchor="middle" fill="#94a3b8" fontSize="7">iron core</text>
        <path d="M88,60 Q129,40 170,60" fill="none" stroke={MC} strokeWidth="1.2" strokeDasharray="3 2" />
        <polygon points="168,57 174,61 168,65" fill={MC} />
        <text x="129" y="36" textAnchor="middle" fill={MC} fontSize="6.5">changing flux (AC only)</text>
        <rect x="178" y="35" width="70" height="50" rx="5" fill="#0d1e35" stroke={accentS} strokeWidth="1.8" />
        {[183,190,197,204,211,218,225,232].map((x,i) => (
          <path key={i} d={`M${x},35 Q${x+3},26 ${x+7},35`} fill="none" stroke={accentS} strokeWidth="1.5"/>
        ))}
        <text x="213" y="66" textAnchor="middle" fill={accentS} fontSize="7.5" fontWeight="700">Secondary</text>
        <text x="213" y="76" textAnchor="middle" fill={accentS} fontSize="7">{`Ns = ${Ns}`}</text>
        <text x="213" y="86" textAnchor="middle" fill={accentS} fontSize="7">{`Vs = ${Vs} V`}</text>
        <text x="5" y="25" fill={accentP} fontSize="6.5">AC in</text>
        <line x1="10" y1="60" x2="2" y2="60" stroke={accentP} strokeWidth="1.2" />
        <text x="250" y="25" fill={accentS} fontSize="6.5">out</text>
        <line x1="248" y1="60" x2="256" y2="60" stroke={accentS} strokeWidth="1.2" />
        <text x="129" y="112" textAnchor="middle" fill="#fdc700" fontSize="9" fontWeight="700">Vp/Vs = Np/Ns</text>
      </svg>
      <div className="px-2 py-1.5 rounded-[8px] text-xs" style={{ background: `${MC}10`, border: `1px solid ${MC}25`, color: '#e2e8f0' }}>
        {isStepUp
          ? `Step-up: Ns (${Ns}) > Np (${Np}) \u2192 Vs (${Vs} V) > Vp (${Vp} V). Current decreases \u2014 power conserved (VpIp\u00a0=\u00a0VsIs).`
          : `Step-down: Ns (${Ns}) < Np (${Np}) \u2192 Vs (${Vs} V) < Vp (${Vp} V). Current increases \u2014 power conserved (VpIp\u00a0=\u00a0VsIs).`}
      </div>
    </div>
  )
}

function TransformersIdea() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 px-4 py-3">
      <MisconceptionCard
        wrong="Transformers work with any type of current — you can use a DC battery to step up or step down voltage."
        right="Transformers only work with AC. A changing current is needed to create a changing magnetic flux in the iron core. DC creates a static field — no change in flux, no induction, no output voltage."
        wrongLabel="DC works too?"
        rightLabel="AC only — changing flux required for induction"
      />
    </div>
  )
}

function TransformersReality() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 px-4 py-3">
      <RealWorldCard icon="🗼" title="National Grid — step-up to 400 kV" desc="Power stations use step-up transformers to raise voltage to ~400 kV for transmission. Higher voltage means lower current (I = P/V), dramatically reducing resistive heat losses (P = I²R) in the cables." color="#10b981" delay={0} />
      <RealWorldCard icon="📱" title="Phone charger — step-down to 5 V" desc="A phone charger contains a step-down transformer that converts 230 V mains AC to 5 V for safe charging. The secondary coil has far fewer turns than the primary." color="#3b82f6" delay={0.1} />
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
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 px-4 py-3">
      <MisconceptionCard
        wrong="A stronger magnet in a generator increases the frequency of the AC output — more magnetic force = faster oscillations."
        right="Frequency depends only on rotation speed. A stronger magnet (or more turns) increases peak voltage/EMF, not frequency. Frequency = rotations per second only."
        wrongLabel="Magnet affects frequency?"
        rightLabel="Frequency = rotation speed only"
      />
    </div>
  )
}

function ACGeneratorsReality() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 px-4 py-3">
      <RealWorldCard icon="🏭" title="UK power stations — 50 Hz" desc="Every generator in the UK spins at exactly 50 rotations/second to produce 50 Hz AC. Coal, gas, nuclear, and pumped-hydro stations must stay synchronised with the grid frequency." color="#10b981" delay={0} />
      <RealWorldCard icon="💨" title="Wind turbine generator" desc="Wind turns blades → shaft spins an alternator. Stronger wind = higher rotational speed = higher frequency AND higher voltage. A gearbox maintains optimal generator speed." color="#3b82f6" delay={0.1} />
      <RealWorldCard icon="🚗" title="Car alternator — charges battery" desc="The engine spins an alternator via a belt. It generates AC, which is rectified to DC to charge the 12 V battery and power headlights, ignition, and electronics." color="#fdc700" delay={0.2} />
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
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 px-4 py-3">
      <MisconceptionCard
        wrong="Gravity stops at Earth's atmosphere — planets and satellites beyond it float freely in empty space with no gravitational force."
        right="Gravity has infinite range, decreasing with distance (F ∝ 1/r²). The ISS at 400 km altitude still feels ~89% of surface gravity — it's in freefall, not zero gravity."
        wrongLabel="Gravity has a boundary?"
        rightLabel="Infinite range, decreasing with r²"
      />
    </div>
  )
}
function SolarSystemReality() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 px-4 py-3">
      <RealWorldCard icon="🚀" title="ISS — not zero gravity" desc="The ISS orbits at 400 km. Gravity there is ~89% of surface gravity. Astronauts feel weightless because they're in continuous freefall, not because gravity has stopped." color="#6366f1" delay={0} />
      <RealWorldCard icon="🌍" title="Moon's orbit — gravity across space" desc="The Moon is 384 000 km away yet Earth's gravity holds it in orbit. Gravity here is ~0.3% of surface gravity — still enough to curve the Moon's path around Earth." color="#3b82f6" delay={0.1} />
      <RealWorldCard icon="🔭" title="Voyager 1 — still feeling gravity" desc="Voyager 1 launched in 1977 and is now 23 billion km from Earth. The Sun's gravity still slows it — gravity truly has infinite range, just diminishing as 1/r²." color="#f97316" delay={0.2} />
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
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 px-4 py-3">
      <MisconceptionCard
        wrong="The Sun will eventually explode in a supernova when it runs out of hydrogen fuel."
        right="Only massive stars (>8 solar masses) end in supernovae. The Sun will expand to a red giant, then gently shed its outer layers as a planetary nebula, leaving a white dwarf — no explosion."
        wrongLabel="All stars explode?"
        rightLabel="Only massive stars go supernova"
      />
    </div>
  )
}
function StellarEvolutionReality() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 px-4 py-3">
      <RealWorldCard icon="☀️" title="The Sun — 5 billion years left" desc="The Sun will exhaust hydrogen in ~5 billion years, expanding to a red giant (engulfing Mercury, Venus, maybe Earth). Then: planetary nebula → white dwarf. No supernova." color="#fdc700" delay={0} />
      <RealWorldCard icon="💥" title="Betelgeuse — imminent supernova" desc="Betelgeuse (in Orion) is a red supergiant ~700× the Sun's radius. It could go supernova any time in the next 100,000 years — briefly visible in daytime from Earth." color="#ef4444" delay={0.1} />
      <RealWorldCard icon="🌑" title="Neutron stars & black holes" desc="A supernova of a very massive star (>20 solar masses) creates a black hole. Less massive: a neutron star (teaspoon weighs a billion tonnes) rotating as a pulsar." color="#6366f1" delay={0.2} />
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
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 px-4 py-3">
      <MisconceptionCard
        wrong="A blue object illuminated by red light still looks blue — the object's colour is fixed and doesn't change with the light source."
        right="An object can only reflect wavelengths present in the incident light. A blue object illuminated only by red light absorbs the red and has no blue to reflect — it looks black."
        wrongLabel="Colour is intrinsic?"
        rightLabel="Colour = what's reflected"
      />
    </div>
  )
}
function VisibleLightReality() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 px-4 py-3">
      <RealWorldCard icon="🎭" title="Stage lighting — colour control" desc="Red costume under blue stage lighting looks black — no red wavelengths in the source to reflect. Lighting designers exploit this: a single filter can make objects vanish." color="#fdc700" delay={0} />
      <RealWorldCard icon="🌱" title="Chlorophyll — green reflection" desc="Grass absorbs red and blue light for photosynthesis; green is reflected. Under red/blue grow lights, plants absorb almost everything — leaves appear very dark." color="#10b981" delay={0.1} />
      <RealWorldCard icon="🔬" title="Fluorescence microscopy" desc="Scientists illuminate samples with specific wavelengths. Fluorescent dyes absorb one wavelength and emit another — allowing individual proteins to be tracked in living cells." color="#3b82f6" delay={0.2} />
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
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 px-4 py-3">
      <MisconceptionCard
        wrong="Red-shift means a galaxy is moving towards us — it looks redder because it's hotter and closer, emitting more low-frequency light."
        right="Red-shift means the galaxy is moving away — the wavelength is stretched (like a receding ambulance siren drops in pitch). All distant galaxies are red-shifted: evidence the universe is expanding."
        wrongLabel="Moving closer = redder?"
        rightLabel="Moving away = stretched wavelength"
      />
    </div>
  )
}
function RedshiftReality() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 px-4 py-3">
      <RealWorldCard icon="🌌" title="Hubble's Law — expansion rate" desc="Edwin Hubble (1929) found recession speed ∝ distance (v = Hd). The further the galaxy, the faster it recedes. Extrapolating backwards gives the Big Bang ~13.8 billion years ago." color="#6366f1" delay={0} />
      <RealWorldCard icon="📡" title="CMB — echo of the Big Bang" desc="The Cosmic Microwave Background is highly red-shifted radiation from 380,000 years after the Big Bang. Detected in 1965 as background radio noise — the strongest evidence for the Big Bang." color="#e879f9" delay={0.1} />
      <RealWorldCard icon="🚨" title="Doppler effect analogy" desc="An ambulance siren drops in pitch as it passes — sound waves stretch behind the moving source. Red-shift is the same for light: galaxy receding → wavelengths stretched toward red end." color="#f97316" delay={0.2} />
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
    equations: [{ expr: 'v = fλ', given: true }, { expr: 'T = 1/f', given: false }],
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
  transformers: {
    id: 'transformers', module: 'Magnetism & Electromagnetism', moduleColor: MC, course: 'physics-only',
    title: 'Transformers', subtitle: 'Step-Up, Step-Down & The National Grid',
    specRef: '4.7.5',
    description: 'A transformer changes the voltage of an alternating current. It works by electromagnetic induction: AC in the primary coil creates a changing magnetic field in the iron core, which induces an alternating voltage in the secondary coil. Step-up transformers increase voltage (more secondary turns); step-down transformers decrease voltage (fewer secondary turns). The turns ratio equation: Vp/Vs = Np/Ns. For an ideal (100% efficient) transformer, power is conserved: VpIp = VsIs, so increasing voltage decreases current proportionally. Transformers ONLY work with AC — a DC current produces a static magnetic field, which cannot induce an EMF in the secondary coil. The National Grid uses step-up transformers (to ~400 kV) to reduce current, minimising resistive heating losses (P = I²R). Step-down transformers then reduce voltage for safe domestic use (230 V).',
    lessonVisual: TransformersLesson, ideaVisual: TransformersIdea, realityVisual: TransformersReality,
    equations: [{ expr: 'Vp/Vs = Np/Ns', given: true }, { expr: 'VpIp = VsIs', given: true }],
    question: 'A transformer has 500 turns on the primary and 2000 turns on the secondary. The primary voltage is 25 V. What is the secondary voltage?',
    questionSubtitle: 'Use Vp/Vs = Np/Ns',
    options: ['6.25 V', '100 V', '50 V', '12.5 V'],
    correctAnswer: 1,
    keywords: ['transformer', 'step-up', 'step-down', 'turns ratio', 'Vp/Vs = Np/Ns', 'VpIp = VsIs', 'electromagnetic induction', 'iron core', 'primary coil', 'secondary coil', 'AC only', 'National Grid', 'power conservation', '400 kV', 'P = I²R losses'],
    sentenceStarters: ['A transformer works by electromagnetic induction because...', 'Vp/Vs = Np/Ns, so to find Vs I rearrange...', 'Transformers only work with AC because...', 'The National Grid steps up voltage to reduce...', 'Power conservation means VpIp = VsIs, so increasing voltage...'],
    modelAnswers: [
      'A transformer works by electromagnetic induction because **AC in the primary creates a changing magnetic field in the iron core, which induces an AC voltage in the secondary coil**.',
      'Vp/Vs = Np/Ns, so to find Vs I rearrange: **Vs = Vp × (Ns/Np) = 25 × (2000/500) = 25 × 4 = 100 V**.',
      'Transformers only work with AC because **DC creates a static (non-changing) magnetic field which cannot induce an EMF — a changing field is required for induction**.',
      'The National Grid steps up voltage to reduce **the current (I = P/V), which minimises resistive heating losses (P = I²R) in the transmission cables**.',
      'Power conservation means VpIp = VsIs, so increasing voltage **decreases current proportionally — a transformer does not create energy, it trades voltage for current**.',
    ],
    misconception: 'Transformers do NOT work with DC — they require AC to create a changing magnetic field. A transformer does not create or destroy energy — it only converts between high-voltage/low-current and low-voltage/high-current.',
    concept: 'Vp/Vs = Np/Ns. For ideal transformer: VpIp = VsIs (power conserved). Step-up: Ns > Np → Vs > Vp, Is < Ip. National Grid: step-up to 400 kV → low I → low I²R losses → step-down to 230 V for homes. AC only — DC gives static field, no induction.',
  },
  solar_system: {
    id: 'solar_system', module: 'Space', moduleColor: SC, course: 'physics-only',
    title: 'Solar System & Orbital Motion', subtitle: 'Gravity, Circular Orbits & Satellites',
    description: 'Our solar system: Sun, 8 planets, dwarf planets, moons, asteroids, comets. Gravity provides the centripetal force for orbital motion. In a circular orbit, speed is constant but velocity direction continuously changes — the object always accelerates towards the centre (centripetal acceleration). Orbital speed: v = 2πr/T, where r = orbital radius and T = orbital period. A planet further from the Sun has a larger orbit and moves more slowly (longer T). Artificial satellites: low Earth orbit (~200 km, short period — imaging/weather); geostationary orbit (~36 000 km, 24 h period, stays above same equatorial point — communications/TV). Comets have highly elliptical orbits — fastest at perihelion (closest to Sun), slowest at aphelion.',
    lessonVisual: SolarSystemLesson, ideaVisual: SolarSystemIdea, realityVisual: SolarSystemReality,
    equations: [{ expr: 'v = 2πr/T', given: true }],
    question: 'What force keeps a planet in its orbit around the Sun?',
    questionSubtitle: 'Think about what provides the centripetal force',
    options: ['The planet\'s own momentum', 'Gravitational attraction towards the Sun', 'Magnetic force from the Sun', 'Atmospheric pressure'],
    correctAnswer: 1,
    keywords: ['gravity', 'gravitational attraction', 'orbit', 'centripetal force', 'v = 2πr/T', 'orbital speed', 'orbital period', 'geostationary', 'low Earth orbit', 'centripetal acceleration', 'comet', 'perihelion', 'lower orbit faster', 'higher orbit slower'],
    sentenceStarters: ['Gravity provides the centripetal force that keeps the planet in orbit...', 'In a circular orbit, speed is constant but velocity is not because...', 'A satellite in a higher orbit must travel more slowly because...', 'Without gravity, the planet would travel in a straight line...', 'The planet orbits because gravity constantly changes its direction of travel, so...'],
    modelAnswers: [
      'Gravity provides the centripetal force that keeps the planet in orbit ** -  it always pulls the planet towards the Sun**.',
      'In a circular orbit, speed is constant but velocity is not because **velocity is a vector — its direction continuously changes as the planet curves around the Sun**.',
      'A satellite in a higher orbit must travel more slowly because **at a greater distance, the gravitational force is weaker, requiring a lower orbital speed for a stable path**.',
      'Without gravity, the planet would travel in **a straight line at constant speed  -  gravity curves its path into an orbit**.',
      'The planet orbits because gravity constantly changes its direction of travel, so **although speed is unchanged, velocity changes — there is centripetal acceleration towards the Sun**.',
    ],
    misconception: 'Speed is constant in a circular orbit but velocity is NOT (direction changes). Geostationary satellites are NOT stationary — they orbit at the same rate as Earth rotates. Gravity does not switch off in space — it acts at all distances, just weakens with distance².',
    concept: 'v = 2πr/T. Gravity = centripetal force. Circular orbit: speed constant, velocity direction changes → centripetal acceleration. Geostationary: 36 000 km, 24 h, above equator. LEO: ~200 km, fast, short period. Comet: elliptical — fastest at perihelion, slowest at aphelion.',
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
