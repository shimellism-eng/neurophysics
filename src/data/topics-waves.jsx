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
    id: 'wave_types', module: 'Waves', moduleColor: WC, course: 'combined', boards: ['aqa','edexcel','ocr-a','ocr-b','wjec','ccea'],
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

    // -- 9-STEP LESSON DATA ----------------------------------------------------

    hook: {
      hookFact: 'In space, no one can hear you scream - and that is literally true. Sound cannot travel through a vacuum because there are no particles to vibrate. Yet light (a transverse EM wave) crosses the 150 million km to Earth from the Sun in just 8 minutes through empty space.',
      hookQuestion: 'If you hit a bell on the Moon, what do you think would happen to the sound? Would anyone nearby hear it?',
      hookEmoji: '🔔',
    },

    lessonKeywords: [
      {
        word: 'Transverse Wave',
        symbol: '',
        unit: '',
        definition: 'A wave in which particles vibrate perpendicular (at 90 degrees) to the direction of wave travel.',
        everydayNote: 'Light and all EM waves are transverse. Shake a rope up and down - the wave travels sideways while the rope moves up and down.',
      },
      {
        word: 'Longitudinal Wave',
        symbol: '',
        unit: '',
        definition: 'A wave in which particles vibrate parallel to (in the same direction as) the wave travel.',
        everydayNote: 'Sound is longitudinal. Push and pull a slinky along its length - that is the same motion as a sound wave.',
      },
      {
        word: 'Compression',
        symbol: '',
        unit: '',
        definition: 'A region in a longitudinal wave where particles are pushed together (higher pressure).',
        everydayNote: 'In a sound wave, compressions are the "loud" pressure peaks - the parts where air molecules are densest.',
      },
      {
        word: 'Rarefaction',
        symbol: '',
        unit: '',
        definition: 'A region in a longitudinal wave where particles are spread apart (lower pressure).',
        everydayNote: 'Between each compression in a sound wave is a rarefaction - a low-pressure zone.',
      },
      {
        word: 'Seismic Waves',
        symbol: '',
        unit: '',
        definition: 'Waves of energy that travel through the Earth caused by earthquakes. P-waves (longitudinal) travel through solids and liquids; S-waves (transverse) only travel through solids.',
        everydayNote: 'S-waves not reaching the far side of Earth proved the outer core is liquid - a discovery made purely from wave physics.',
      },
    ],

    prerequisiteCheck: {
      questions: [
        {
          question: 'Which type of wave can travel through a vacuum?',
          answers: ['Sound waves', 'Seismic S-waves', 'Light waves', 'P-waves'],
          correct: 2,
          feedback: 'Light is a transverse electromagnetic wave and needs no medium - it travels at 3×10⁸ m/s through a vacuum. Sound cannot travel through a vacuum.',
        },
        {
          question: 'In a transverse wave, how do particles move relative to the direction of wave travel?',
          answers: ['Parallel - in the same direction', 'Perpendicular - at 90 degrees', 'In circles', 'They do not move'],
          correct: 1,
          feedback: 'Transverse wave particles vibrate at 90 degrees (perpendicular) to the direction of travel. Longitudinal wave particles vibrate parallel to the direction of travel.',
        },
      ],
    },

    topicMapHint: {
      before: ['Energy Transfer', 'Properties of Waves (v = fλ)'],
      current: 'Transverse and Longitudinal Waves',
      after: ['Sound and Ultrasound', 'Seismic Waves', 'EM Spectrum'],
    },

    workedExample: {
      title: 'Comparing P-waves and S-waves to find evidence for liquid outer core',
      equation: 'P-waves: longitudinal (solid + liquid). S-waves: transverse (solid only).',
      context: 'An earthquake occurs. Seismometers on the far side of Earth detect P-waves but NOT S-waves. What does this tell us about Earth\'s interior?',
      steps: [
        { step: 1, action: 'Recall wave types', content: 'P-waves are longitudinal. S-waves are transverse.', annotation: 'This distinction is the key fact - make sure you know it.' },
        { step: 2, action: 'Recall what each wave can travel through', content: 'P-waves: solids and liquids. S-waves: solids only, cannot pass through liquids.', annotation: 'S-waves cannot travel through liquids - this is why this matters.' },
        { step: 3, action: 'Apply to the observation', content: 'S-waves are not detected on the far side → they are blocked somewhere inside Earth.', annotation: 'The blocked zone corresponds to the outer core region.' },
        { step: 4, action: 'State the conclusion', content: 'The outer core must be liquid, because only a liquid layer could block S-waves completely.', annotation: 'This is one of the best examples of indirect evidence in all of physics.' },
      ],
      misconceptionAfter: {
        claim: 'P-waves are faster so they arrive first - that is why we only detect them.',
        reality: 'P-waves do arrive first (they are faster), but S-waves are not just slow - they are completely absent on the far side. Absence, not lateness, is the evidence for a liquid outer core.',
        visual: 'If S-waves were merely slow, seismometers would eventually detect them after a delay. They never arrive at all - they are blocked entirely.',
      },
    },

    guidedPractice: {
      tier1: {
        question: 'A longitudinal sound wave has frequency 250 Hz and travels at 340 m/s in air. Find its wavelength.',
        allSteps: [
          'Write what you know: f = 250 Hz, v = 340 m/s, λ = ?',
          'Write the equation: v = fλ',
          'Rearrange: λ = v / f',
          '??? - calculate λ = 340 / 250',
        ],
        missingStep: 3,
        missingHint: 'Divide: 340 / 250 = ?',
        answer: 1.36,
        answerUnit: 'm',
      },
      tier2: {
        question: 'A transverse wave on a string has frequency 5 Hz and wavelength 0.4 m. Calculate the wave speed.',
        shownEquation: 'v = fλ',
        shownStep1: 'Write what you know: f = 5 Hz, λ = 0.4 m',
        hint: 'Multiply f × λ directly. No rearrangement needed.',
        answer: 2,
        answerUnit: 'm/s',
      },
      tier3: {
        question: 'Sound travels at 1500 m/s in water. The wavelength of a particular sound in water is 0.3 m. Calculate the frequency.',
        hint: 'Use v = fλ. Rearrange to find f = v / λ.',
        methodHint: 'Start with v = fλ. Rearrange to f = v / λ. Substitute v = 1500 and λ = 0.3.',
        answer: 5000,
        answerUnit: 'Hz',
      },
    },

    summary: {
      equation: 'v = fλ (applies to all wave types)',
      sentence: 'Transverse waves vibrate at 90 degrees to travel direction (light, S-waves); longitudinal waves vibrate parallel (sound, P-waves).',
      promptText: 'Without looking at your notes, explain one piece of evidence that proves Earth has a liquid outer core.',
    },

    sessionRecap: [
      'Transverse waves: vibration perpendicular to direction of travel - examples include light and seismic S-waves.',
      'Longitudinal waves: vibration parallel to direction of travel - examples include sound and seismic P-waves.',
      'S-waves cannot pass through liquids - their absence on the far side of Earth from an earthquake is evidence for a liquid outer core.',
    ],
  },
  wave_properties: {
    id: 'wave_properties', module: 'Waves', moduleColor: WC, practicalId: 'waves', course: 'combined', boards: ['aqa','edexcel','ocr-a','ocr-b','wjec','ccea'],
    title: 'Properties of Waves', subtitle: 'Amplitude, Wavelength, Frequency & v = fλ',
    description: 'Key wave properties: amplitude (A) - maximum displacement; wavelength (λ) - distance between two identical points; frequency (f) - oscillations per second (Hz); period (T = 1/f) - time for one complete oscillation. Wave speed: v = fλ. Speed depends on the medium - not the frequency. Diffraction: waves spread out as they pass through a gap or around an obstacle. Diffraction is most significant when the gap or obstacle size is similar to the wavelength (λ ≈ gap size). If gap >> λ: almost no diffraction (light through a doorway). If gap ≈ λ: maximum diffraction (sound around a corner, radio waves around hills). Bigger wavelength = more diffraction for the same gap size.',
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
    misconception: 'Wave speed does not depend on frequency - it depends on the medium. For diffraction: bigger wavelength = more diffraction for the same gap size. Radio waves (λ ≈ metres) diffract around hills; visible light (λ ≈ 500 nm) barely diffracts through a door because its wavelength is far smaller than the gap.',
    concept: 'v = 200 × 1.5 = 300 m/s. In a given medium, all waves of that type travel at the same speed. Changing frequency changes wavelength proportionally (v = fλ), not the speed. Diffraction is greatest when gap size ≈ wavelength.',

    // ── 9-STEP LESSON DATA ────────────────────────────────────────────────────

    hook: {
      hookFact: 'The song you\'re listening to travels to your eardrums as a wave at 340 metres per second. The same physics governs light (300 million m/s), microwaves in your oven, and X-rays at the hospital.',
      hookQuestion: 'If you double the frequency of a wave but keep the same speed, what do you think happens to the wavelength?',
      hookEmoji: '🌊',
    },

    lessonKeywords: [
      {
        word: 'Wavelength',
        symbol: 'λ',
        unit: 'metres (m)',
        definition: 'The distance between two successive identical points on a wave — e.g. crest to crest.',
        everydayNote: 'Radio waves have wavelengths of metres. Visible light has wavelengths of about 0.0000005 m.',
      },
      {
        word: 'Frequency',
        symbol: 'f',
        unit: 'hertz (Hz)',
        definition: 'The number of complete waves passing a fixed point per second.',
        everydayNote: 'A 440 Hz sound wave (the note A) produces 440 complete oscillations every second.',
      },
      {
        word: 'Amplitude',
        symbol: 'A',
        unit: 'metres (m)',
        definition: 'The maximum displacement of a point on the wave from its rest position.',
        everydayNote: 'Louder sounds have greater amplitude. Brighter light has greater amplitude.',
      },
      {
        word: 'Wave Speed',
        symbol: 'v',
        unit: 'm/s',
        definition: 'How fast the wave travels through the medium. v = fλ.',
        everydayNote: 'Sound travels at ~340 m/s in air. Light travels at 300,000,000 m/s in a vacuum.',
      },
      {
        word: 'Period',
        symbol: 'T',
        unit: 'seconds (s)',
        definition: 'The time taken for one complete wave to pass a fixed point. T = 1/f.',
        everydayNote: 'A wave with frequency 50 Hz has period T = 1/50 = 0.02 seconds.',
      },
    ],

    prerequisiteCheck: {
      questions: [
        {
          question: 'What does frequency measure?',
          answers: ['The height of a wave', 'The distance between two crests', 'The number of complete waves per second', 'The speed of the wave'],
          correct: 2,
          feedback: 'Correct — frequency (Hz) counts how many complete waves pass a point every second.',
        },
        {
          question: 'If a wave has a frequency of 5 Hz, how many complete waves pass a point each second?',
          answers: ['1', '0.2', '5', '50'],
          correct: 2,
          feedback: '5 Hz means 5 complete waves per second. Hertz just means "per second".',
        },
      ],
    },

    topicMapHint: {
      before: ['Wave Types (transverse and longitudinal)'],
      current: 'Properties of Waves',
      after: ['Reflection & Refraction', 'Sound & Ultrasound', 'EM Spectrum'],
    },

    workedExample: {
      title: 'Calculating wave speed using v = fλ',
      equation: 'v = f × λ',
      context: 'A water wave has a frequency of 4 Hz and a wavelength of 0.5 m. What is its speed?',
      steps: [
        {
          step: 1,
          action: 'Write what you know',
          content: 'f = 4 Hz,   λ = 0.5 m,   v = ?',
          annotation: 'List your values. λ is the Greek letter lambda — always used for wavelength.',
        },
        {
          step: 2,
          action: 'Write the equation',
          content: 'v = f × λ',
          annotation: 'The wave equation — given on the exam formula sheet. v = wave speed, f = frequency, λ = wavelength.',
        },
        {
          step: 3,
          action: 'Substitute',
          content: 'v = 4 × 0.5',
          annotation: 'Replace f and λ with the numbers from step 1.',
        },
        {
          step: 4,
          action: 'Calculate and state with unit',
          content: 'v = 2 m/s',
          annotation: 'Hz × m = m/s. The units work out to metres per second — wave speed. Always include the unit.',
        },
      ],
      misconceptionAfter: {
        claim: 'Increasing the frequency of a wave makes it travel faster.',
        reality: 'Wrong — wave speed depends on the medium (what the wave is travelling through), NOT the frequency. If speed stays constant and frequency increases, the wavelength decreases (they are inversely proportional: λ = v/f).',
        visual: 'Think of cars on a motorway at fixed speed. If cars (waves) leave more frequently, the gaps between them (wavelength) shrink — but the speed stays the same.',
      },
    },

    guidedPractice: {
      tier1: {
        question: 'A wave has frequency f = 10 Hz and wavelength λ = 3 m. What is its speed?',
        allSteps: [
          'Write what you know: f = 10 Hz, λ = 3 m',
          'Write the equation: v = f × λ',
          'Substitute: v = 10 × 3',
          '??? — what is 10 × 3?',
        ],
        missingStep: 3,
        missingHint: 'Calculate: 10 × 3 = ?',
        answer: 30,
        answerUnit: 'm/s',
      },
      tier2: {
        question: 'A sound wave travels at 340 m/s and has a wavelength of 0.5 m. What is its frequency?',
        shownEquation: 'v = fλ  →  f = v ÷ λ',
        shownStep1: 'Write what you know: v = 340 m/s, λ = 0.5 m',
        hint: 'Divide: f = 340 ÷ 0.5 = ?',
        answer: 680,
        answerUnit: 'Hz',
      },
      tier3: {
        question: 'A radio wave has a frequency of 100 MHz (100,000,000 Hz) and travels at 300,000,000 m/s. What is its wavelength?',
        hint: 'Rearrange v = fλ to make λ the subject: λ = v ÷ f',
        methodHint: 'Start with v = fλ. You know v and f. Rearrange to get λ = v ÷ f, then divide.',
        answer: 3,
        answerUnit: 'm',
      },
    },

    summary: {
      equation: 'v = fλ',
      sentence: 'Wave speed equals frequency times wavelength — in a given medium, speed is fixed, so higher frequency means shorter wavelength.',
      promptText: 'Explain what happens to wavelength if you double the frequency of a wave, in one sentence.',
    },

    sessionRecap: [
      'Key wave properties: amplitude, wavelength (λ), frequency (f), period (T = 1/f).',
      'Wave equation: v = fλ — wave speed = frequency × wavelength.',
      'Wave speed depends on the medium, not the frequency — higher f means shorter λ.',
      'Diffraction: waves spread through a gap most when gap ≈ λ. Bigger wavelength = more diffraction. Radio waves (λ ≈ metres) diffract around hills; visible light (λ ≈ 500 nm) barely diffracts through a door.',
    ],
  },
  wave_reflection: {
    id: 'wave_reflection', module: 'Waves', moduleColor: WC, practicalId: 'light', course: 'physics-only', boards: ['aqa','edexcel','ocr-a','ocr-b','wjec','ccea'],
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

    // -- 9-STEP LESSON DATA ----------------------------------------------------

    hook: {
      hookFact: 'The mirage you see on a hot road is real refraction - not an illusion. Light from the sky bends near the hot road surface (where air is less dense) and curves upward to your eyes, making it look like a pool of water reflecting the sky.',
      hookQuestion: 'Why does a straw in a glass of water look bent or broken at the surface? What do you think is happening to the light?',
      hookEmoji: '🌅',
    },

    lessonKeywords: [
      {
        word: 'Reflection',
        symbol: '',
        unit: '',
        definition: 'When a wave bounces off a surface. The angle of incidence equals the angle of reflection, both measured from the normal.',
        everydayNote: 'A mirror reflects light specularly - all rays bounce at the same angle, producing a clear image.',
      },
      {
        word: 'Refraction',
        symbol: '',
        unit: '',
        definition: 'When a wave changes speed at a boundary between two media, causing it to change direction.',
        everydayNote: 'Light slows from 3×10⁸ m/s in air to about 2×10⁸ m/s in glass - this speed change bends the ray.',
      },
      {
        word: 'Normal',
        symbol: '',
        unit: '',
        definition: 'An imaginary line drawn perpendicular (at 90 degrees) to a surface at the point where a ray meets it. Angles of incidence and refraction are measured from the normal.',
        everydayNote: 'Always draw the normal first in any reflection or refraction diagram - all angles are measured from it, not from the surface.',
      },
      {
        word: 'Angle of Incidence',
        symbol: 'i',
        unit: 'degrees',
        definition: 'The angle between the incoming ray and the normal at the point of incidence.',
        everydayNote: 'A ray hitting a mirror straight on (perpendicular) has angle of incidence = 0 degrees and reflects straight back.',
      },
      {
        word: 'Optical Density',
        symbol: '',
        unit: '',
        definition: 'A measure of how much a medium slows light. A denser medium slows light more and bends it towards the normal on entry.',
        everydayNote: 'Glass is more optically dense than air. Water is more optically dense than air but less than glass.',
      },
    ],

    prerequisiteCheck: {
      questions: [
        {
          question: 'When a ray of light enters a glass block from air, it slows down. Which way does it bend?',
          answers: ['Away from the normal', 'Towards the normal', 'Along the surface', 'It does not bend'],
          correct: 1,
          feedback: 'Entering a denser medium (air to glass): light slows down and bends towards the normal. Leaving a denser medium (glass to air): light speeds up and bends away from the normal.',
        },
        {
          question: 'Angle of incidence = 40 degrees. A ray reflects off a flat mirror. What is the angle of reflection?',
          answers: ['50 degrees', '40 degrees', '80 degrees', '90 degrees'],
          correct: 1,
          feedback: 'The law of reflection: angle of incidence = angle of reflection. Both are measured from the normal. So angle of reflection = 40 degrees.',
        },
      ],
    },

    topicMapHint: {
      before: ['Wave Types (transverse vs longitudinal)', 'Properties of Waves'],
      current: 'Reflection and Refraction',
      after: ['Total Internal Reflection', 'Lenses', 'Visible Light and Colour'],
    },

    workedExample: {
      title: 'Tracing a ray through a glass block',
      equation: 'Angle of incidence = angle of reflection. Into denser medium: bends towards normal.',
      context: 'A ray of light hits the flat side of a glass block. Angle of incidence = 30 degrees. The glass is denser than air. Describe what happens and state whether the refracted angle is greater or smaller than 30 degrees.',
      steps: [
        { step: 1, action: 'Draw the normal', content: 'Draw a line perpendicular to the glass surface at the point of incidence.', annotation: 'All angles are measured from the normal - never from the surface.' },
        { step: 2, action: 'Identify the media', content: 'Air (less dense) to glass (more dense).', annotation: 'Less dense to more dense = slows down = bends towards normal.' },
        { step: 3, action: 'State the direction of bending', content: 'Ray bends towards the normal. Angle of refraction is less than 30 degrees.', annotation: 'A common error: students bend away from the normal instead of towards it when entering glass.' },
        { step: 4, action: 'Apply at exit face', content: 'When leaving glass to air: speeds up, bends away from normal. Angle increases back towards original direction.', annotation: 'For a parallel-sided block, the exit ray is parallel to the incident ray - just displaced sideways.' },
      ],
      misconceptionAfter: {
        claim: 'Light bends away from the normal when entering glass because glass slows it down.',
        reality: 'Wrong - entering a denser medium means bending TOWARDS the normal. The mnemonic: "Slow = towards normal. Fast = away from normal."',
        visual: 'Think of a car driving at an angle from tarmac onto mud. The wheel that hits the mud first slows down, swinging the front of the car toward the mud side - that is bending towards the normal.',
      },
    },

    guidedPractice: {
      tier1: {
        question: 'A ray hits a flat mirror at an angle of incidence of 35 degrees (measured from the normal). What is the angle of reflection?',
        allSteps: [
          'Write what you know: angle of incidence = 35 degrees',
          'State the law: angle of incidence = angle of reflection',
          'Apply it: angle of reflection = 35 degrees',
          '??? - state your answer with units',
        ],
        missingStep: 3,
        missingHint: 'The answer is just the angle of incidence. State it.',
        answer: 35,
        answerUnit: 'degrees',
      },
      tier2: {
        question: 'A ray hits a flat mirror at an angle of incidence of 50 degrees. What is the angle of reflection?',
        shownEquation: 'angle of incidence = angle of reflection',
        shownStep1: 'Angle of incidence = 50 degrees',
        hint: 'No calculation needed - just apply the law of reflection.',
        answer: 50,
        answerUnit: 'degrees',
      },
      tier3: {
        question: 'A ray of light hits a flat mirror at 25 degrees to the SURFACE (not the normal). What is the angle of reflection from the normal?',
        hint: 'First find the angle of incidence from the normal. The surface and normal are at 90 degrees to each other.',
        methodHint: 'Angle from normal = 90 - 25 = 65 degrees. Then apply: angle of reflection = angle of incidence.',
        answer: 65,
        answerUnit: 'degrees',
      },
    },

    summary: {
      equation: 'Angle of incidence = angle of reflection (both from normal). Into denser medium: bends towards normal.',
      sentence: 'Reflection bounces waves off surfaces; refraction bends waves when they change speed at a boundary between different media.',
      promptText: 'Explain in one sentence why a ray bends towards the normal when entering glass from air.',
    },

    sessionRecap: [
      'Angle of incidence = angle of reflection - both measured from the normal, not the surface.',
      'Refraction: light bends towards the normal when entering a denser medium (slowing down) and away from the normal when leaving it (speeding up).',
      'Mirages are caused by real refraction: hot air near the ground is less dense, bending light upward so distant sky looks like a puddle on the road.',
    ],
  },
  total_internal_reflection: {
    id: 'total_internal_reflection', module: 'Waves', moduleColor: WC, course: 'physics-only', boards: ['aqa','edexcel','ocr-a','ocr-b','wjec','ccea'],
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

    // -- 9-STEP LESSON DATA ----------------------------------------------------

    hook: {
      hookFact: 'The entire internet backbone - the cables running under oceans between continents - is built on total internal reflection. Light pulses travel at 200,000 km/s inside glass fibres, bouncing along by TIR, carrying billions of messages per second.',
      hookQuestion: 'If you shone a laser into one end of a bent glass fibre, where do you think the light would come out - and why?',
      hookEmoji: '💡',
    },

    lessonKeywords: [
      {
        word: 'Critical Angle',
        symbol: 'c',
        unit: 'degrees',
        definition: 'The angle of incidence (measured from the normal) at which the refracted ray travels exactly along the boundary. Above this angle, TIR occurs.',
        everydayNote: 'For glass (n = 1.5), the critical angle is about 42 degrees. Any ray hitting the glass-air boundary at more than 42 degrees from the normal reflects completely.',
      },
      {
        word: 'Total Internal Reflection',
        symbol: 'TIR',
        unit: '',
        definition: 'The complete reflection of a light ray at the boundary inside a denser medium when the angle of incidence exceeds the critical angle.',
        everydayNote: 'TIR makes optical fibres work - light bounces along the inside of glass without leaking out, even around bends.',
      },
      {
        word: 'Refractive Index',
        symbol: 'n',
        unit: '',
        definition: 'A measure of how much a material slows light compared to a vacuum. sin(c) = 1/n, where c is the critical angle.',
        everydayNote: 'Glass has n ≈ 1.5. Diamond has n ≈ 2.4, giving a critical angle of only 24 degrees - this is why cut diamonds sparkle so much.',
      },
      {
        word: 'Optical Fibre',
        symbol: '',
        unit: '',
        definition: 'A thin strand of glass or plastic that guides light along its length by repeated total internal reflection.',
        everydayNote: 'Optical fibres carry data as pulses of light. They are also used in endoscopes to see inside the human body without surgery.',
      },
      {
        word: 'Endoscope',
        symbol: '',
        unit: '',
        definition: 'A medical instrument that uses optical fibres to transmit light and images inside the body.',
        everydayNote: 'Doctors use endoscopes to examine the stomach, colon, and lungs - a long flexible tube with a camera tip guided by TIR.',
      },
    ],

    prerequisiteCheck: {
      questions: [
        {
          question: 'For TIR to occur, in which direction must light be travelling?',
          answers: ['From air into glass', 'From glass into air (denser to less dense)', 'Parallel to the surface', 'Directly towards the normal'],
          correct: 1,
          feedback: 'TIR only happens when light travels from a denser medium (like glass) to a less dense medium (like air). Light going from air to glass cannot undergo TIR.',
        },
        {
          question: 'What are the two conditions required for TIR?',
          answers: ['High frequency and low wavelength', 'Dense to less dense medium AND angle exceeds critical angle', 'Smooth surface AND parallel rays', 'Monochromatic light AND a glass surface'],
          correct: 1,
          feedback: 'Both conditions must be met: (1) light travels from denser to less dense medium, and (2) angle of incidence must exceed the critical angle. If only one is met, TIR does not occur.',
        },
      ],
    },

    topicMapHint: {
      before: ['Refraction', 'Wave Reflection and Boundary Behaviour'],
      current: 'Total Internal Reflection',
      after: ['Optical Fibres (applications)', 'Lenses and Optics'],
    },

    workedExample: {
      title: 'Calculating the critical angle for glass',
      equation: 'sin(c) = 1/n, rearranged: c = arcsin(1/n)',
      context: 'Glass has refractive index n = 1.5. Calculate the critical angle.',
      steps: [
        { step: 1, action: 'Write what you know', content: 'n = 1.5, c = ?', annotation: 'The refractive index is given. You need sin(c) = 1/n.' },
        { step: 2, action: 'Write the equation', content: 'sin(c) = 1/n', annotation: 'This equation is not always on the formula sheet - learn it. It comes from setting the refracted angle to 90 degrees at the boundary.' },
        { step: 3, action: 'Substitute', content: 'sin(c) = 1/1.5 = 0.667', annotation: 'Divide 1 by the refractive index. A common error is inverting this to get n/1 = 1.5 - wrong direction.' },
        { step: 4, action: 'Calculate and state with unit', content: 'c = arcsin(0.667) ≈ 42 degrees', annotation: 'Use the inverse sine button on your calculator (sin⁻¹ or arcsin). Answer is in degrees.' },
      ],
      misconceptionAfter: {
        claim: 'TIR happens because the glass is too thick for light to pass through.',
        reality: 'TIR is about the angle of the ray, not the thickness of the glass. Even a razor-thin piece of glass will cause TIR if the angle exceeds the critical angle.',
        visual: 'A ray at 41 degrees (just below critical angle for glass) partially refracts and escapes. The same ray at 43 degrees reflects completely - thickness is irrelevant.',
      },
    },

    guidedPractice: {
      tier1: {
        question: 'A material has refractive index n = 2.0. Calculate the critical angle.',
        allSteps: [
          'Write what you know: n = 2.0, c = ?',
          'Write the equation: sin(c) = 1/n',
          'Substitute: sin(c) = 1/2.0 = 0.5',
          '??? - find c = arcsin(0.5)',
        ],
        missingStep: 3,
        missingHint: 'arcsin(0.5) = ? degrees. Use your calculator or recall that sin(30) = 0.5.',
        answer: 30,
        answerUnit: 'degrees',
      },
      tier2: {
        question: 'A material has refractive index n = 1.4. Calculate the critical angle.',
        shownEquation: 'sin(c) = 1/n -> c = arcsin(1/n)',
        shownStep1: 'Write what you know: n = 1.4',
        hint: 'sin(c) = 1/1.4 = 0.714. Then use arcsin.',
        answer: 46,
        answerUnit: 'degrees',
      },
      tier3: {
        question: 'A glass fibre has refractive index n = 1.6. Calculate the critical angle.',
        hint: 'Use sin(c) = 1/n. Calculate 1/1.6 first, then use arcsin.',
        methodHint: 'sin(c) = 1/1.6 = 0.625. c = arcsin(0.625). Use your calculator.',
        answer: 39,
        answerUnit: 'degrees',
      },
    },

    summary: {
      equation: 'sin(c) = 1/n',
      sentence: 'TIR occurs when light goes from dense to less dense medium and the angle of incidence exceeds the critical angle - used in optical fibres and endoscopes.',
      promptText: 'State the two conditions for TIR and explain why optical fibres can carry light around bends.',
    },

    sessionRecap: [
      'TIR requires two conditions: light travelling from denser to less dense medium, AND angle of incidence exceeding the critical angle.',
      'Critical angle formula: sin(c) = 1/n. For glass (n = 1.5): c ≈ 42 degrees.',
      'Optical fibres use TIR to carry internet data and medical imaging - light bounces along with no leakage if the angle always exceeds the critical angle.',
    ],
  },
  sound_ultrasound: {
    id: 'sound_ultrasound', module: 'Waves', moduleColor: WC, course: 'physics-only', boards: ['aqa','edexcel','ocr-a','ocr-b','wjec','ccea'],
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

    // -- 9-STEP LESSON DATA ----------------------------------------------------

    hook: {
      hookFact: 'Hospital ultrasound scanners use sound at 2-15 MHz - up to 750 times higher than the highest frequency a human can hear (20,000 Hz). Bats echolocate at 20-120 kHz and can detect objects as thin as a human hair by listening to the reflected pulse.',
      hookQuestion: 'If sound travels faster in solids than in air, why do you think doctors use sound waves (not light) to image a baby inside the womb?',
      hookEmoji: '🔊',
    },

    lessonKeywords: [
      {
        word: 'Ultrasound',
        symbol: '',
        unit: 'Hz',
        definition: 'Sound with frequency above 20,000 Hz (20 kHz) - above the upper limit of human hearing.',
        everydayNote: 'Medical scanners use 2-15 MHz. Bats use 20-120 kHz. The higher the frequency, the smaller the detail that can be detected.',
      },
      {
        word: 'Echo',
        symbol: '',
        unit: '',
        definition: 'A reflected sound wave. The time taken for an echo to return is used to calculate distance.',
        everydayNote: 'Depth = (speed x time) / 2. The divide-by-2 is because sound travels to the object AND back.',
      },
      {
        word: 'P-wave',
        symbol: '',
        unit: '',
        definition: 'A longitudinal seismic wave that travels through both solids and liquids.',
        everydayNote: 'P-waves travel at about 6-8 km/s in the Earth\'s crust and can pass through the liquid outer core.',
      },
      {
        word: 'S-wave',
        symbol: '',
        unit: '',
        definition: 'A transverse seismic wave that can only travel through solids - it is blocked by liquids.',
        everydayNote: 'S-waves do not reach the far side of Earth from an earthquake. This absence proved the outer core is liquid.',
      },
      {
        word: 'Hearing Range',
        symbol: '',
        unit: 'Hz',
        definition: 'The range of frequencies detectable by the human ear: 20 Hz to 20,000 Hz (20 kHz).',
        everydayNote: 'The ear drum and inner ear structures only vibrate efficiently in this range. Above 20 kHz = ultrasound; below 20 Hz = infrasound.',
      },
    ],

    prerequisiteCheck: {
      questions: [
        {
          question: 'In which medium does sound travel fastest?',
          answers: ['Air', 'Water', 'Steel', 'A vacuum'],
          correct: 2,
          feedback: 'Sound travels fastest in solids (e.g. steel at ~5100 m/s) because particles are closest together and pass on vibrations most rapidly. It cannot travel in a vacuum at all.',
        },
        {
          question: 'A sound pulse is sent into water and returns as an echo after 0.04 s. The speed of sound in water is 1500 m/s. What is the depth?',
          answers: ['60 m', '30 m', '15 m', '120 m'],
          correct: 1,
          feedback: 'Depth = (speed x time) / 2 = (1500 x 0.04) / 2 = 60 / 2 = 30 m. Divide by 2 because the pulse travels down AND back up.',
        },
      ],
    },

    topicMapHint: {
      before: ['Wave Types (longitudinal vs transverse)', 'Wave Properties (v = fλ)'],
      current: 'Sound Waves and Ultrasound',
      after: ['EM Spectrum', 'Echo Sounding and Sonar (applied)'],
    },

    workedExample: {
      title: 'Echo sounding - calculating water depth',
      equation: 'depth = (speed x time) / 2',
      context: 'A ship sends an ultrasound pulse straight down. The echo returns after 0.04 s. The speed of sound in seawater is 1500 m/s. Calculate the depth of the water.',
      steps: [
        { step: 1, action: 'Write what you know', content: 'v = 1500 m/s, t = 0.04 s, depth = ?', annotation: 'The time is the total round-trip time - sound goes down and back up.' },
        { step: 2, action: 'Write the equation', content: 'depth = (v x t) / 2', annotation: 'Divide by 2 because the sound travels twice the depth (down and back). This is the most common error in this topic.' },
        { step: 3, action: 'Substitute', content: 'depth = (1500 x 0.04) / 2 = 60 / 2', annotation: 'Calculate the numerator first: 1500 x 0.04 = 60 m. Then halve it.' },
        { step: 4, action: 'Calculate and state with unit', content: 'depth = 30 m', annotation: 'Sense check: 30 m is a reasonable ocean depth near shore. Check units are in metres.' },
      ],
      misconceptionAfter: {
        claim: 'The time in the formula is the time for sound to travel to the bottom.',
        reality: 'The measured time is the total round-trip time - sound travels down to the seabed and back up again. That is why you divide by 2. If you forget to halve, your answer doubles the true depth.',
        visual: 'Think of a ball dropped and caught: the ball falls for half the total time and rises for the other half. The seabed is at the halfway point in time.',
      },
    },

    guidedPractice: {
      tier1: {
        question: 'A sonar pulse returns after 0.06 s. Speed of sound in water = 1500 m/s. Calculate the depth.',
        allSteps: [
          'Write what you know: v = 1500 m/s, t = 0.06 s',
          'Write the equation: depth = (v x t) / 2',
          'Substitute: depth = (1500 x 0.06) / 2 = 90 / 2',
          '??? - calculate the depth',
        ],
        missingStep: 3,
        missingHint: '90 / 2 = ?',
        answer: 45,
        answerUnit: 'm',
      },
      tier2: {
        question: 'A pulse echoes back in 0.02 s. Speed of sound = 340 m/s. Calculate the depth.',
        shownEquation: 'depth = (v x t) / 2',
        shownStep1: 'Write what you know: v = 340 m/s, t = 0.02 s',
        hint: 'Calculate (340 x 0.02) first, then divide by 2.',
        answer: 3.4,
        answerUnit: 'm',
      },
      tier3: {
        question: 'The depth of water is 120 m. Speed of sound = 1500 m/s. How long does the echo take to return?',
        hint: 'Rearrange depth = (v x t) / 2 to find t. Multiply depth by 2, then divide by speed.',
        methodHint: 'Start with: depth = (v x t) / 2. Rearrange: t = (2 x depth) / v = (2 x 120) / 1500.',
        answer: 0.16,
        answerUnit: 's',
      },
    },

    summary: {
      equation: 'depth = (speed x time) / 2',
      sentence: 'Ultrasound above 20 kHz is used in medical imaging and echo sounding; sound travels faster in denser media (solids > liquids > gases).',
      promptText: 'Explain in two sentences why S-waves not reaching the far side of Earth is evidence for a liquid outer core.',
    },

    sessionRecap: [
      'Sound travels faster in denser media: steel (5100 m/s) > water (1500 m/s) > air (340 m/s).',
      'Echo sounding: depth = (speed x time) / 2 - divide by 2 because sound travels to the object and back.',
      'Ultrasound (above 20 kHz) is used in medical imaging and flaw detection; S-waves cannot pass through liquids, which is evidence for Earth\'s liquid outer core.',
    ],
  },
  em_spectrum: {
    id: 'em_spectrum', module: 'Waves', moduleColor: WC, course: 'combined', boards: ['aqa','edexcel','ocr-a','ocr-b','wjec','ccea'],
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

    // -- 9-STEP LESSON DATA ----------------------------------------------------

    hook: {
      hookFact: 'Your WiFi router emits microwaves at 2.4 GHz or 5 GHz. Your microwave oven uses 2.45 GHz - almost exactly the same frequency - but at 700-1200 watts instead of the router\'s 0.1 watts. The difference between warming your food and browsing the internet is purely a matter of power.',
      hookQuestion: 'All EM waves travel at the same speed in a vacuum. If radio waves and gamma rays travel at the same speed, what do you think makes them so different from each other?',
      hookEmoji: '📡',
    },

    lessonKeywords: [
      {
        word: 'Electromagnetic Spectrum',
        symbol: '',
        unit: '',
        definition: 'The family of all transverse EM waves, ordered by frequency (or wavelength). All travel at 3×10⁸ m/s in a vacuum.',
        everydayNote: 'From low to high frequency: radio, microwave, infrared, visible, UV, X-ray, gamma. A useful mnemonic: "Raging Martians Invaded Venus Using X-ray Guns".',
      },
      {
        word: 'Ionising Radiation',
        symbol: '',
        unit: '',
        definition: 'EM radiation with enough energy to remove electrons from atoms, potentially damaging DNA. UV, X-rays, and gamma rays are ionising.',
        everydayNote: 'Ionising radiation can cause cancer with repeated exposure. This is why X-ray technicians leave the room during scans.',
      },
      {
        word: 'Radiation Dose',
        symbol: '',
        unit: 'sieverts (Sv)',
        definition: 'A measure of the harm risk from exposure to ionising radiation, taking into account both the amount and type of radiation.',
        everydayNote: 'A chest X-ray gives about 0.1 mSv. Background radiation in the UK is about 2.7 mSv per year. 1000 mSv = 1 Sv.',
      },
      {
        word: 'Frequency',
        symbol: 'f',
        unit: 'hertz (Hz)',
        definition: 'The number of wave oscillations per second. Higher frequency means shorter wavelength and more energy per photon.',
        everydayNote: 'Radio waves: ~10⁶ Hz. Visible light: ~5×10¹⁴ Hz. Gamma rays: above 10¹⁹ Hz.',
      },
      {
        word: 'Wavelength',
        symbol: 'λ',
        unit: 'metres (m)',
        definition: 'The distance between two successive identical points on a wave. As frequency increases, wavelength decreases (v = fλ).',
        everydayNote: 'Radio waves: metres to km long. Visible light: ~500 nm (0.0000005 m). Gamma rays: smaller than an atomic nucleus.',
      },
    ],

    prerequisiteCheck: {
      questions: [
        {
          question: 'All EM waves travel at the same speed in a vacuum. What is that speed?',
          answers: ['340 m/s', '3×10⁶ m/s', '3×10⁸ m/s', '1500 m/s'],
          correct: 2,
          feedback: 'All EM waves travel at 3×10⁸ m/s (300,000,000 m/s or 300,000 km/s) in a vacuum. This is the speed of light.',
        },
        {
          question: 'Which EM wave has the highest frequency?',
          answers: ['Radio waves', 'Infrared', 'Visible light', 'Gamma rays'],
          correct: 3,
          feedback: 'Gamma rays have the highest frequency, shortest wavelength, and most energy. The order low to high frequency: radio, microwave, infrared, visible, UV, X-ray, gamma.',
        },
      ],
    },

    topicMapHint: {
      before: ['Wave Properties (v = fλ)', 'Wave Types (transverse)'],
      current: 'The Electromagnetic Spectrum',
      after: ['Lenses', 'Visible Light and Colour', 'Black Body Radiation'],
    },

    workedExample: {
      title: 'Calculating wavelength of a radio wave',
      equation: 'v = fλ, rearranged: λ = v / f',
      context: 'A radio station broadcasts at 100 MHz (1×10⁸ Hz). Calculate the wavelength of the radio waves. (Speed of light = 3×10⁸ m/s)',
      steps: [
        { step: 1, action: 'Write what you know', content: 'v = 3×10⁸ m/s, f = 1×10⁸ Hz (100 MHz), λ = ?', annotation: 'Convert MHz to Hz: 100 MHz = 100×10⁶ = 1×10⁸ Hz. Always convert to base units.' },
        { step: 2, action: 'Write the equation', content: 'v = fλ, so λ = v / f', annotation: 'This equation is on the formula sheet. Rearrange by dividing both sides by f.' },
        { step: 3, action: 'Substitute', content: 'λ = (3×10⁸) / (1×10⁸)', annotation: 'Divide the coefficients: 3/1 = 3. Subtract the powers: 10⁸ / 10⁸ = 10⁰ = 1.' },
        { step: 4, action: 'Calculate and state with unit', content: 'λ = 3 m', annotation: 'Sense check: radio waves should have wavelengths of metres. 3 m is correct for 100 MHz FM radio.' },
      ],
      misconceptionAfter: {
        claim: 'Higher frequency EM waves travel faster.',
        reality: 'All EM waves travel at the same speed in a vacuum (3×10⁸ m/s). Higher frequency means shorter wavelength - not higher speed. v = fλ stays constant because as f increases, λ decreases proportionally.',
        visual: 'Think of 10 waves passing a point per second versus 5 waves per second at the same speed - the 10 Hz waves must be shorter (half the wavelength) to all fit past at the same speed.',
      },
    },

    guidedPractice: {
      tier1: {
        question: 'Visible light has frequency 6×10¹⁴ Hz. Speed = 3×10⁸ m/s. Calculate the wavelength.',
        allSteps: [
          'Write what you know: f = 6×10¹⁴ Hz, v = 3×10⁸ m/s',
          'Write the equation: λ = v / f',
          'Substitute: λ = (3×10⁸) / (6×10¹⁴)',
          '??? - divide to find λ',
        ],
        missingStep: 3,
        missingHint: 'Divide 3 by 6 = 0.5. Subtract powers: 10⁸ / 10¹⁴ = 10⁻⁶. So λ = 0.5×10⁻⁶ = 5×10⁻⁷ m.',
        answer: 5e-7,
        answerUnit: 'm',
      },
      tier2: {
        question: 'A microwave has wavelength 0.12 m. Speed = 3×10⁸ m/s. Calculate the frequency.',
        shownEquation: 'v = fλ → f = v / λ',
        shownStep1: 'Write what you know: λ = 0.12 m, v = 3×10⁸ m/s',
        hint: 'Divide: f = 3×10⁸ / 0.12. Calculate 3/0.12 = 25, then multiply by 10⁸.',
        answer: 2.5e9,
        answerUnit: 'Hz',
      },
      tier3: {
        question: 'An EM wave has frequency 1.5×10⁹ Hz. Speed = 3×10⁸ m/s. Calculate the wavelength.',
        hint: 'Use λ = v / f. Divide 3×10⁸ by 1.5×10⁹.',
        methodHint: 'Divide coefficients: 3 / 1.5 = 2. Subtract powers: 10⁸ / 10⁹ = 10⁻¹ = 0.1. So λ = 2 × 0.1 = 0.2 m.',
        answer: 0.2,
        answerUnit: 'm',
      },
    },

    summary: {
      equation: 'v = fλ (v = 3×10⁸ m/s for all EM waves in vacuum)',
      sentence: 'All EM waves are transverse and travel at 3×10⁸ m/s; higher frequency means shorter wavelength and more energy - ionising above UV.',
      promptText: 'List the 7 types of EM radiation in order of increasing frequency and name one use and one hazard.',
    },

    sessionRecap: [
      'EM spectrum order (low to high frequency): radio, microwave, infrared, visible, UV, X-ray, gamma - all travel at 3×10⁸ m/s in vacuum.',
      'Higher frequency = shorter wavelength = more energy. UV, X-rays and gamma rays are ionising and can damage DNA.',
      'Radiation dose is measured in sieverts (Sv). Radio waves are produced by oscillating currents and induce AC in a receiving conductor.',
    ],
  },
  lenses: {
    id: 'lenses', module: 'Waves', moduleColor: WC, course: 'physics-only', boards: ['aqa','edexcel','ocr-a','ocr-b','wjec','ccea'],
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

    // -- 9-STEP LESSON DATA ----------------------------------------------------

    hook: {
      hookFact: 'The human eye\'s lens changes shape - squeezed by ciliary muscles - to focus on objects from 25 cm to infinity. This is called accommodation. Around age 40, the lens stiffens and people need reading glasses for the first time because it can no longer bulge enough to focus on near objects.',
      hookQuestion: 'Hold a finger close to your face and focus on it, then look past it at the wall. What happens to your finger? Why do you think your eye has to physically change to switch focus?',
      hookEmoji: '🔍',
    },

    lessonKeywords: [
      {
        word: 'Convex Lens',
        symbol: '',
        unit: '',
        definition: 'A converging lens that is thicker in the middle. It brings parallel rays to a focal point on the far side.',
        everydayNote: 'A magnifying glass is a convex lens. Cameras, telescopes, and the human eye all use convex lenses to form images.',
      },
      {
        word: 'Concave Lens',
        symbol: '',
        unit: '',
        definition: 'A diverging lens that is thinner in the middle. It spreads parallel rays outward - they appear to come from a focal point on the same side as the incoming light.',
        everydayNote: 'Glasses for short-sightedness (myopia) use concave lenses to reduce the converging power of the eye.',
      },
      {
        word: 'Focal Length',
        symbol: 'f',
        unit: 'metres (m)',
        definition: 'The distance from the lens to the point where parallel rays converge (convex) or appear to diverge from (concave).',
        everydayNote: 'A lens with f = 0.1 m has power 10 D. A lens with f = 0.5 m has power 2 D. Shorter focal length = more powerful.',
      },
      {
        word: 'Power of a Lens',
        symbol: 'P',
        unit: 'dioptres (D)',
        definition: 'A measure of how strongly a lens bends light. P = 1/f, where f is in metres.',
        everydayNote: 'A typical reading glasses prescription might be +2 D (converging, f = 0.5 m). Stronger prescriptions have higher dioptre values.',
      },
      {
        word: 'Magnification',
        symbol: 'm',
        unit: 'no units',
        definition: 'The ratio of image size to object size. Magnification = image height / object height = image distance / object distance.',
        everydayNote: 'Magnification of 3 means the image is 3 times the size of the object. Magnification below 1 means the image is smaller than the object.',
      },
    ],

    prerequisiteCheck: {
      questions: [
        {
          question: 'A convex lens has focal length 0.5 m. What is its power?',
          answers: ['0.5 D', '2 D', '5 D', '50 D'],
          correct: 1,
          feedback: 'P = 1/f = 1/0.5 = 2 D. Power is in dioptres. The shorter the focal length, the higher the power - a 0.1 m focal length lens has power 10 D.',
        },
        {
          question: 'A concave lens always produces what type of image?',
          answers: ['Real and inverted', 'Virtual and magnified', 'Virtual, upright and diminished', 'Real and upright'],
          correct: 2,
          feedback: 'A concave (diverging) lens always produces a virtual, upright, diminished image regardless of object distance. Only convex lenses can produce real images.',
        },
      ],
    },

    topicMapHint: {
      before: ['Refraction', 'Total Internal Reflection'],
      current: 'Lenses and Optics',
      after: ['Visible Light and Colour', 'The Eye and Sight Correction (applied)'],
    },

    workedExample: {
      title: 'Calculating lens power and magnification',
      equation: 'P = 1/f (dioptres). Magnification = image height / object height.',
      context: 'A converging lens has focal length f = 0.1 m. An object 4 cm tall is placed 0.2 m from the lens and produces an image 4 cm tall. Calculate lens power and magnification.',
      steps: [
        { step: 1, action: 'Write what you know', content: 'f = 0.1 m, object height = 4 cm, image height = 4 cm', annotation: 'Focal length must be in metres for the power formula. Check units before substituting.' },
        { step: 2, action: 'Calculate power', content: 'P = 1/f = 1/0.1 = 10 D', annotation: 'Dioptres (D) is the unit of lens power. No need to convert - just divide 1 by the focal length in metres.' },
        { step: 3, action: 'Calculate magnification', content: 'magnification = image height / object height = 4 / 4 = 1', annotation: 'Magnification has no units. A value of 1 means the image is the same size as the object.' },
        { step: 4, action: 'Interpret the result', content: 'Magnification = 1 means image and object are the same size. Power = 10 D is a relatively strong lens.', annotation: 'Sense check: an image the same size as the object with a 10 D lens - this is consistent with object at 2f distance.' },
      ],
      misconceptionAfter: {
        claim: 'A more powerful lens always produces a bigger image.',
        reality: 'Magnification depends on where the object is placed relative to the focal length, not just on lens power. A powerful lens with the object far beyond its focal length can produce a tiny, highly diminished real image.',
        visual: 'A 20 D lens (f = 0.05 m) with an object 1 m away produces a nearly life-size image near the focal point - the object is so far away the rays are almost parallel, giving low magnification despite high power.',
      },
    },

    guidedPractice: {
      tier1: {
        question: 'A converging lens has focal length f = 0.5 m. Calculate its power.',
        allSteps: [
          'Write what you know: f = 0.5 m',
          'Write the equation: P = 1/f',
          'Substitute: P = 1/0.5',
          '??? - calculate P',
        ],
        missingStep: 3,
        missingHint: '1 divided by 0.5 = ?',
        answer: 2,
        answerUnit: 'D',
      },
      tier2: {
        question: 'A lens has focal length f = 0.04 m. Calculate its power.',
        shownEquation: 'P = 1/f',
        shownStep1: 'Write what you know: f = 0.04 m',
        hint: 'P = 1/0.04. Think: how many 0.04s fit into 1?',
        answer: 25,
        answerUnit: 'D',
      },
      tier3: {
        question: 'An image is 6 cm tall and the object is 2 cm tall. Calculate the magnification.',
        hint: 'Use magnification = image height / object height. No units in the answer.',
        methodHint: 'Magnification = 6 / 2. The result is unitless.',
        answer: 3,
        answerUnit: '',
      },
    },

    summary: {
      equation: 'P = 1/f (D). Magnification = image height / object height.',
      sentence: 'Convex lenses converge light to form real or virtual images depending on object position; concave lenses always form virtual, diminished images; lens power is the reciprocal of focal length.',
      promptText: 'Without notes, state what type of image a convex lens forms when the object is (a) beyond the focal point and (b) inside the focal point.',
    },

    sessionRecap: [
      'Lens power: P = 1/f in dioptres. Shorter focal length = more powerful lens.',
      'Convex lens: real, inverted image when object is beyond focal point; virtual, upright, magnified when object is inside focal point.',
      'Concave lens: always virtual, upright, diminished image. Magnification = image height / object height (no units).',
    ],
  },
  black_body: {
    id: 'black_body', module: 'Waves', moduleColor: WC, practicalId: 'radiation', course: 'physics-only', boards: ['aqa','edexcel','ocr-a','ocr-b','wjec','ccea'],
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

    // -- 9-STEP LESSON DATA ----------------------------------------------------

    hook: {
      hookFact: 'The cosmic microwave background is the echo of the Big Bang, still filling every corner of space 13.8 billion years later. It corresponds to a temperature of just 2.7 K - and it is detectable because even at that tiny temperature, every object radiates. Your phone detects it as faint static between TV channels.',
      hookQuestion: 'A thermal camera can see animals in complete darkness. What do you think the camera is actually detecting - and why would a warmer animal appear brighter?',
      hookEmoji: '🌡️',
    },

    lessonKeywords: [
      {
        word: 'Black Body',
        symbol: '',
        unit: '',
        definition: 'A theoretical perfect absorber and emitter. It absorbs all incoming radiation and emits the maximum possible radiation at every wavelength for its temperature.',
        everydayNote: 'A black body is an idealisation. The Sun is close to a black body. A matt black surface is a better emitter than a shiny one at the same temperature.',
      },
      {
        word: 'Infrared Radiation',
        symbol: 'IR',
        unit: '',
        definition: 'EM radiation emitted by all objects above absolute zero. Hotter objects emit more IR at shorter wavelengths.',
        everydayNote: 'Thermal cameras detect IR from objects. The human body emits IR at around 9-10 micrometres wavelength.',
      },
      {
        word: 'Absolute Zero',
        symbol: '',
        unit: '0 K (-273 degrees C)',
        definition: 'The lowest possible temperature, at which particles have minimum vibrational energy. At 0 K, an object would theoretically stop emitting radiation.',
        everydayNote: 'Nothing in practice reaches absolute zero. The coldest recorded temperature in a lab is about 100 picokelvin - still not zero.',
      },
      {
        word: 'Thermal Equilibrium',
        symbol: '',
        unit: '',
        definition: 'When an object\'s temperature is constant because the rate of absorption equals the rate of emission.',
        everydayNote: 'Earth maintains a roughly constant temperature because the rate of solar energy absorbed equals the rate of IR emitted to space - this is the basis of climate science.',
      },
      {
        word: 'Intensity of Radiation',
        symbol: '',
        unit: 'W/m²',
        definition: 'The power of emitted radiation per unit area. Rises steeply with temperature - proportional to T⁴ (Stefan-Boltzmann law, not required at GCSE).',
        everydayNote: 'An object at 600 K emits 16 times more radiation than the same object at 300 K (2⁴ = 16), not just twice as much.',
      },
    ],

    prerequisiteCheck: {
      questions: [
        {
          question: 'At what temperature does an object stop emitting infrared radiation?',
          answers: ['0 degrees C', '-100 degrees C', 'Never - all objects above 0 K emit IR', '100 degrees C'],
          correct: 2,
          feedback: 'All objects above absolute zero (0 K / -273 degrees C) continuously emit infrared radiation. The colder the object, the less it emits - but it never stops entirely unless at 0 K.',
        },
        {
          question: 'A hotter object emits infrared radiation at shorter or longer wavelengths than a cooler object?',
          answers: ['Longer wavelengths', 'Shorter wavelengths', 'The same wavelengths', 'No wavelengths'],
          correct: 1,
          feedback: 'Hotter objects emit more radiation AND at shorter wavelengths (higher frequencies). The Sun at 5800 K emits peak radiation in the visible range. Earth at 288 K emits peak radiation in the infrared.',
        },
      ],
    },

    topicMapHint: {
      before: ['EM Spectrum', 'Infrared as part of EM spectrum'],
      current: 'Black Body Radiation',
      after: ['Climate Science (Earth energy balance)', 'Red-shift and the CMB'],
    },

    workedExample: {
      title: 'Comparing radiation emission from objects at different temperatures',
      equation: 'Emission rate is proportional to T⁴ (Stefan-Boltzmann). If temperature doubles: emission × 2⁴ = 16.',
      context: 'Object A is at 300 K. Object B is at 600 K (twice as hot). How many times more radiation does object B emit per second compared to object A?',
      steps: [
        { step: 1, action: 'Write what you know', content: 'T_A = 300 K, T_B = 600 K. Temperature ratio = 600/300 = 2.', annotation: 'Temperatures must be in Kelvin, not Celsius. K = °C + 273.' },
        { step: 2, action: 'State the relationship', content: 'Emission is proportional to T⁴ (Stefan-Boltzmann law).', annotation: 'At GCSE you need to know that hotter objects emit much more - the T⁴ relationship explains why small temperature increases have big effects.' },
        { step: 3, action: 'Calculate the ratio', content: 'Emission ratio = (T_B / T_A)⁴ = 2⁴ = 16.', annotation: 'Doubling temperature gives 16 times more emission, not 2 times. This is why the Sun is so much more intense than Earth despite being only 20 times hotter.' },
        { step: 4, action: 'State the answer', content: 'Object B emits 16 times more radiation than object A.', annotation: 'Sense check: a small change in temperature can make a large difference in emission rate - this is why Earth\'s temperature is so sensitive to changes in atmospheric absorption.' },
      ],
      misconceptionAfter: {
        claim: 'If an object is twice as hot, it emits twice as much radiation.',
        reality: 'Emission scales with T⁴. Double the temperature gives 16 times (2⁴) more emission. This is why the Sun, at only about 20 times Earth\'s absolute temperature, emits about 20⁴ = 160,000 times more radiation per unit area.',
        visual: 'A stovetop burner going from 400 K to 800 K doubles in temperature but emits 16 times more radiation - that is why it glows visibly red-hot at the higher temperature.',
      },
    },

    guidedPractice: {
      tier1: {
        question: 'Object X is at 300 K. Object Y is at 600 K. Using the T⁴ rule, how many times more radiation does Y emit than X?',
        allSteps: [
          'Write the temperatures: T_X = 300 K, T_Y = 600 K',
          'Find the temperature ratio: 600 / 300 = 2',
          'Apply T⁴: emission ratio = 2⁴',
          '??? - calculate 2⁴',
        ],
        missingStep: 3,
        missingHint: '2⁴ = 2 × 2 × 2 × 2 = ?',
        answer: 16,
        answerUnit: 'times more',
      },
      tier2: {
        question: 'Object P is at 200 K. Object Q is at 400 K. Using the T⁴ rule, how many times more radiation does Q emit than P?',
        shownEquation: 'emission ratio = (T_Q / T_P)⁴',
        shownStep1: 'Temperature ratio = 400 / 200 = 2',
        hint: 'Calculate 2⁴.',
        answer: 16,
        answerUnit: 'times more',
      },
      tier3: {
        question: 'Object A is at 250 K. Object B is at 500 K. How many times more radiation does B emit than A? Use the T⁴ rule.',
        hint: 'Find the temperature ratio first. Then raise to the power 4.',
        methodHint: 'Ratio = 500/250 = 2. Emission ratio = 2⁴ = 16.',
        answer: 16,
        answerUnit: 'times more',
      },
    },

    summary: {
      equation: 'Emission proportional to T⁴. Hotter = more emission + shorter wavelength peak.',
      sentence: 'All objects above absolute zero emit infrared radiation - hotter objects emit far more and at shorter wavelengths; a perfect black body absorbs all radiation and emits the maximum possible.',
      promptText: 'Explain in two sentences why Earth\'s temperature stays roughly constant despite constant energy input from the Sun.',
    },

    sessionRecap: [
      'All objects above 0 K (-273 degrees C) emit infrared radiation - the hotter the object, the more it emits and the shorter the peak wavelength.',
      'At thermal equilibrium, absorption rate = emission rate. Earth\'s temperature is governed by this balance with solar radiation.',
      'Doubling an object\'s absolute temperature increases its emission by a factor of 2⁴ = 16 - small temperature changes have a large effect on radiation output.',
    ],
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

    // ── 9-STEP LESSON DATA ────────────────────────────────────────────────────

    hook: {
      hookFact: 'Migratory birds like robins navigate thousands of miles by sensing Earth\'s magnetic field lines — the same invisible lines you\'ll draw in this lesson. Without magnetism, your credit card, MRI scanner, and electric motor wouldn\'t exist.',
      hookQuestion: 'Have you ever felt two magnets push each other apart? What do you think is happening between them — even before they touch?',
      hookEmoji: '🧲',
    },

    lessonKeywords: [
      {
        word: 'Magnetic Field',
        symbol: 'B',
        unit: 'tesla (T)',
        definition: 'The region around a magnet (or current-carrying wire) where a magnetic force can be felt.',
        everydayNote: 'You can\'t see a magnetic field — but iron filings reveal it by lining up along field lines.',
      },
      {
        word: 'Field Lines',
        symbol: '',
        unit: '',
        definition: 'Lines drawn to show the direction and shape of a magnetic field — they go from north to south pole outside the magnet.',
        everydayNote: 'Where lines are closer together, the field is stronger. Further apart = weaker field.',
      },
      {
        word: 'North Pole',
        symbol: 'N',
        unit: '',
        definition: 'The end of a magnet from which field lines emerge. Like poles repel; unlike poles attract.',
        everydayNote: 'The north-seeking end of a compass needle points toward geographic north — which is actually Earth\'s magnetic south pole.',
      },
      {
        word: 'Induced Magnetism',
        symbol: '',
        unit: '',
        definition: 'When a magnetic material (e.g. iron) becomes temporarily magnetised when placed in a magnetic field.',
        everydayNote: 'A paperclip picks up other paperclips when it\'s been near a magnet — it has been temporarily induced.',
      },
      {
        word: 'Non-contact Force',
        symbol: '',
        unit: '',
        definition: 'A force that acts between objects without them touching — like magnetic attraction or repulsion.',
        everydayNote: 'Gravity and electrostatic forces are also non-contact. Friction is a contact force.',
      },
    ],

    prerequisiteCheck: {
      questions: [
        {
          question: 'What happens when two south poles of magnets are brought together?',
          answers: ['They attract', 'They repel', 'Nothing happens', 'The weaker one reverses'],
          correct: 1,
          feedback: 'Like poles (S-S or N-N) always repel each other. Unlike poles (N-S) attract.',
        },
        {
          question: 'Which of these materials is magnetic?',
          answers: ['Copper', 'Aluminium', 'Iron', 'Gold'],
          correct: 2,
          feedback: 'Iron is a magnetic material. The magnetic materials are iron, steel, nickel, and cobalt — remember with "FINC".',
        },
      ],
    },

    topicMapHint: {
      before: ['Forces & Fields (general)'],
      current: 'Permanent & Induced Magnetism',
      after: ['Motor Effect', 'Electromagnetism', 'EM Induction', 'Transformers'],
    },

    workedExample: {
      title: 'Drawing and interpreting magnetic field lines',
      equation: 'Field lines: N → S (outside magnet)',
      context: 'Describe the magnetic field pattern around a bar magnet and explain what the spacing of field lines tells you.',
      steps: [
        {
          step: 1,
          action: 'Identify the poles',
          content: 'North pole (N) on left, South pole (S) on right',
          annotation: 'Always label north and south poles first. Field lines always leave the north pole and enter the south pole — outside the magnet.',
        },
        {
          step: 2,
          action: 'Draw field line direction',
          content: 'Lines curve from N → S outside the magnet',
          annotation: 'Field lines NEVER cross each other. They are continuous loops — inside the magnet they go from S to N.',
        },
        {
          step: 3,
          action: 'Describe spacing at different points',
          content: 'Close together near poles, spread out further away',
          annotation: 'Closer spacing = stronger field. The field is strongest at the poles — this is where lines are most concentrated.',
        },
        {
          step: 4,
          action: 'State the key rule',
          content: 'Like poles repel (lines push apart); unlike poles attract (lines merge)',
          annotation: 'When two N poles face each other, field lines push outward between them — that\'s why they repel. N-S: lines connect directly, drawing poles together.',
        },
      ],
      misconceptionAfter: {
        claim: 'Magnetic forces only work when two magnets touch each other.',
        reality: 'Wrong — magnetism is a non-contact force. It acts through space (and through non-magnetic materials like paper or plastic) without physical contact. This is what "field" means — the force exists throughout the region around the magnet.',
        visual: 'A compass needle deflects when held near a magnet without touching it — the field is reaching across the gap.',
      },
    },

    guidedPractice: {
      tier1: {
        question: 'Two magnets are placed with their north poles facing each other. What will happen?',
        allSteps: [
          'Identify the poles facing each other: N and N',
          'Apply the rule: like poles ___',
          'Like poles → repel',
          '??? — what force will the magnets experience?',
        ],
        missingStep: 3,
        missingHint: 'Like poles repel — so the magnets will be pushed ___?',
        answer: 0,
        answerUnit: '(repulsion)',
      },
      tier2: {
        question: 'A compass is placed next to the north pole of a bar magnet. In which direction does the compass needle point?',
        shownEquation: 'Field lines: from N → S (away from north pole)',
        shownStep1: 'Near the north pole, field lines point AWAY from the magnet',
        hint: 'A compass aligns with the field direction — its north end follows the field line direction',
        answer: 0,
        answerUnit: '(away from magnet\'s N pole)',
      },
      tier3: {
        question: 'Explain why a piece of iron is attracted to both poles of a magnet.',
        hint: 'Think about induced magnetism — what happens to the iron in the magnetic field?',
        methodHint: 'Iron is a magnetic material — it becomes an induced magnet when in a field. Which pole forms nearest the magnet?',
        answer: 0,
        answerUnit: '(unlike poles attract — induced opposite pole always forms nearest)',
      },
    },

    summary: {
      equation: 'Field: N → S (outside)',
      sentence: 'Magnetic fields exert non-contact forces — like poles repel, unlike attract — and field line density shows field strength.',
      promptText: 'Explain what magnetic field lines show, in one sentence, as if describing it to someone who has never seen iron filings.',
    },

    sessionRecap: [
      'Like poles repel; unlike poles attract — magnetism is a non-contact force.',
      'Field lines run from N to S outside the magnet — closer = stronger field.',
      'Magnetic materials (iron, steel, nickel, cobalt) can become induced magnets in a field.',
    ],
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

    // -- 9-STEP LESSON DATA ----------------------------------------------------

    hook: {
      hookFact: 'MRI scanners use magnetic fields about 60,000 times stronger than Earth\'s field (around 1.5-3 T compared to Earth\'s 0.00005 T). The force on current-carrying wires in these fields is so strong that metal objects brought near them become dangerous projectiles. The same physics as F = BIL, but at industrial scale.',
      hookQuestion: 'When you play music through a loudspeaker, how do you think electrical signals from your phone turn into vibrations in air? What physics do you think is involved?',
      hookEmoji: '🔊',
    },

    lessonKeywords: [
      {
        word: 'Motor Effect',
        symbol: '',
        unit: '',
        definition: 'The force experienced by a current-carrying conductor placed in a magnetic field.',
        everydayNote: 'Electric motors use this effect. Every motor in your home - fridge compressor, washing machine drum, electric window in a car - uses the motor effect.',
      },
      {
        word: 'Magnetic Flux Density',
        symbol: 'B',
        unit: 'tesla (T)',
        definition: 'The strength of a magnetic field. 1 T is a strong lab magnet; Earth\'s field is only 0.00005 T.',
        everydayNote: 'MRI scanners use 1.5-3 T. A fridge magnet is about 0.005 T. The stronger the field, the greater the force on a current-carrying wire.',
      },
      {
        word: 'F = BIL',
        symbol: 'F',
        unit: 'newtons (N)',
        definition: 'Force on a current-carrying conductor: F = magnetic flux density x current x length of conductor in the field.',
        everydayNote: 'B in tesla, I in amps, L in metres. Double any one of these and the force doubles.',
      },
      {
        word: "Fleming's Left Hand Rule",
        symbol: '',
        unit: '',
        definition: "Hold the left hand with thumb, index finger, and middle finger mutually perpendicular. Thumb = force (motion), index = field (N to S), middle = current direction.",
        everydayNote: "Use the LEFT hand for motors (force from current). The right hand is for generators. A handy memory: motor cars drive on the Left.",
      },
      {
        word: 'Loudspeaker',
        symbol: '',
        unit: '',
        definition: 'A device that converts electrical signals to sound using the motor effect. AC through a voice coil in a magnetic field creates alternating forces, vibrating a cone.',
        everydayNote: 'The cone of a loudspeaker moves back and forth millions of times per second for high-frequency sounds, driven by the alternating force from AC current.',
      },
    ],

    prerequisiteCheck: {
      questions: [
        {
          question: 'Using F = BIL, if the current through a conductor doubles (B and L unchanged), what happens to the force?',
          answers: ['Force stays the same', 'Force halves', 'Force doubles', 'Force quadruples'],
          correct: 2,
          feedback: 'F = BIL. Force is directly proportional to current. Double I, double F. If all three quantities (B, I, L) doubled, the force would be 8 times larger.',
        },
        {
          question: "In Fleming's Left Hand Rule, what does the thumb represent?",
          answers: ['Current direction', 'Magnetic field direction', 'Force/motion direction', 'Voltage'],
          correct: 2,
          feedback: "Thumb = Force (motion/thrust). Index finger = Field (B, from N to S). Middle finger = Current direction. A helpful mnemonic: ThuMb = Motion, First = Field, seCond = Current.",
        },
      ],
    },

    topicMapHint: {
      before: ['Magnetism and Magnetic Fields', 'Current and Circuits'],
      current: 'The Motor Effect',
      after: ['Electromagnetism (solenoids)', 'EM Induction', 'AC Generators'],
    },

    workedExample: {
      title: 'Calculating force on a current-carrying conductor',
      equation: 'F = BIL',
      context: 'A wire of length 0.4 m carries a current of 3 A. It is placed in a magnetic field of flux density 0.5 T, perpendicular to the field. Calculate the force.',
      steps: [
        { step: 1, action: 'Write what you know', content: 'B = 0.5 T, I = 3 A, L = 0.4 m, F = ?', annotation: 'Check that the wire is perpendicular to the field. If the current is parallel to B, the force is zero.' },
        { step: 2, action: 'Write the equation', content: 'F = BIL', annotation: 'F = BIL is given in the equation sheet. No rearrangement needed here.' },
        { step: 3, action: 'Substitute', content: 'F = 0.5 x 3 x 0.4', annotation: 'Multiply all three values together. Order does not matter for multiplication.' },
        { step: 4, action: 'Calculate and state with unit', content: 'F = 0.6 N', annotation: 'Sense check: 0.6 N is a small force - about the weight of a 60 g object. That is realistic for a small wire in a lab magnet.' },
      ],
      misconceptionAfter: {
        claim: 'The force is maximum when the current is parallel to the magnetic field.',
        reality: 'The force is ZERO when the current runs parallel to the field. The force is maximum when the current is perpendicular (90 degrees) to the field. F = BIL only gives the maximum force at 90 degrees.',
        visual: 'Think of swimming with the current versus across it - you only get pushed sideways if you cross the current. A wire running along the field direction feels no force.',
      },
    },

    guidedPractice: {
      tier1: {
        question: 'B = 0.2 T, I = 5 A, L = 0.3 m. Calculate the force on the wire.',
        allSteps: [
          'Write what you know: B = 0.2 T, I = 5 A, L = 0.3 m',
          'Write the equation: F = BIL',
          'Substitute: F = 0.2 x 5 x 0.3',
          '??? - calculate F',
        ],
        missingStep: 3,
        missingHint: '0.2 x 5 x 0.3 = ? Multiply step by step.',
        answer: 0.3,
        answerUnit: 'N',
      },
      tier2: {
        question: 'B = 0.4 T, I = 2 A, L = 0.5 m. Calculate the force.',
        shownEquation: 'F = BIL',
        shownStep1: 'Write what you know: B = 0.4 T, I = 2 A, L = 0.5 m',
        hint: 'Multiply B x I x L. Do 0.4 x 2 first, then multiply by 0.5.',
        answer: 0.4,
        answerUnit: 'N',
      },
      tier3: {
        question: 'F = 1.2 N, B = 0.6 T, L = 0.5 m. Calculate the current I.',
        hint: 'Rearrange F = BIL to find I = F / (B x L).',
        methodHint: 'I = F / (BL) = 1.2 / (0.6 x 0.5) = 1.2 / 0.3.',
        answer: 4,
        answerUnit: 'A',
      },
    },

    summary: {
      equation: 'F = BIL (force in N, B in T, I in A, L in m)',
      sentence: 'A current-carrying conductor in a magnetic field experiences a force - this motor effect drives loudspeakers, electric motors, and is predicted by F = BIL.',
      promptText: "Describe how a loudspeaker uses the motor effect to produce sound, mentioning AC current, voice coil, and cone.",
    },

    sessionRecap: [
      'F = BIL: force on a current-carrying conductor. Doubling B, I, or L each doubles the force.',
      "Fleming's Left Hand Rule: thumb = force, index = field (N to S), middle = current direction.",
      'Loudspeaker: AC current through a voice coil in a permanent magnetic field creates alternating forces, vibrating the cone to produce sound waves.',
    ],
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

    // -- 9-STEP LESSON DATA ----------------------------------------------------

    hook: {
      hookFact: 'Scrapyard electromagnets lift cars weighing over 1000 kg using a coil of wire and an electric current. Switch off the current - the car drops instantly. A permanent magnet could never do that. This instant on/off controllability is why electromagnets are so useful in industry.',
      hookQuestion: 'A doorbell uses an electromagnet that switches on and off rapidly. What do you think happens to the metal clapper inside - and how does the bell keep ringing automatically?',
      hookEmoji: '🧲',
    },

    lessonKeywords: [
      {
        word: 'Solenoid',
        symbol: '',
        unit: '',
        definition: 'A coil of wire that, when carrying current, produces a magnetic field similar to a bar magnet, with distinct north and south poles.',
        everydayNote: 'The field inside a solenoid is uniform (same strength throughout). Adding more turns or more current strengthens the field.',
      },
      {
        word: 'Electromagnet',
        symbol: '',
        unit: '',
        definition: 'A temporary magnet made from a solenoid with a soft iron core. The magnetism can be switched on and off by controlling the current.',
        everydayNote: 'Car scrapyards use electromagnets to lift vehicles. Hospital MRI scanners use superconducting electromagnets to create very strong, controlled fields.',
      },
      {
        word: 'Soft Iron Core',
        symbol: '',
        unit: '',
        definition: 'A piece of soft iron placed inside a solenoid to greatly increase the strength of the magnetic field by becoming temporarily magnetised.',
        everydayNote: 'Soft iron is used because it magnetises and demagnetises easily. Steel would retain magnetism after the current is switched off.',
      },
      {
        word: 'Relay',
        symbol: '',
        unit: '',
        definition: 'An electromagnetic switch that uses a small current to control a much larger current in a separate circuit, safely.',
        everydayNote: 'Car starter motors use relays. A small current from the ignition key activates the electromagnet, which closes the high-current circuit to the starter motor.',
      },
      {
        word: 'Right-Hand Rule',
        symbol: '',
        unit: '',
        definition: 'Wrap the right hand around a solenoid with fingers pointing in the direction of conventional current - the thumb points to the north pole.',
        everydayNote: 'This rule tells you which end of a solenoid is the north pole. Reverse the current and the poles swap.',
      },
    ],

    prerequisiteCheck: {
      questions: [
        {
          question: 'Which change would NOT increase the strength of an electromagnet?',
          answers: ['Increasing the current', 'Adding a soft iron core', 'Increasing the number of turns', 'Using thicker copper wire'],
          correct: 3,
          feedback: 'Thicker wire carries the same current without increasing field strength. Only three things increase field strength: more current, more turns, and adding a soft iron core.',
        },
        {
          question: 'Why is soft iron (not steel) used as the core of an electromagnet?',
          answers: ['Soft iron is cheaper', 'Soft iron demagnetises when the current stops; steel retains magnetism', 'Soft iron conducts electricity better', 'Steel is too heavy'],
          correct: 1,
          feedback: 'Soft iron is used because it magnetises and demagnetises easily. Steel would remain magnetised after the current is switched off, which would ruin the on/off controllability.',
        },
      ],
    },

    topicMapHint: {
      before: ['Permanent Magnets and Magnetic Fields', 'Current and Circuits'],
      current: 'Electromagnetism',
      after: ['Motor Effect (F = BIL)', 'EM Induction', 'AC Generators'],
    },

    workedExample: {
      title: 'Predicting the effect of changing current and turns on electromagnet strength',
      equation: 'Field strength is proportional to N x I (number of turns x current)',
      context: 'A solenoid has 200 turns and carries 2 A. Calculate the relative field strength. Then predict the new field strength if both turns and current are doubled.',
      steps: [
        { step: 1, action: 'Calculate original N x I', content: 'Original: N x I = 200 x 2 = 400', annotation: 'N x I is proportional to field strength. The actual field in tesla depends on geometry and core, but the ratio tells us how it changes.' },
        { step: 2, action: 'Find new values', content: 'New N = 400 turns, new I = 4 A', annotation: 'Both doubled.' },
        { step: 3, action: 'Calculate new N x I', content: 'New: N x I = 400 x 4 = 1600', annotation: 'When both quantities double, the product quadruples.' },
        { step: 4, action: 'Find the ratio', content: 'New / Old = 1600 / 400 = 4. Field is 4 times stronger.', annotation: 'Doubling turns AND doubling current each doubles the field, giving an overall factor of 4.' },
      ],
      misconceptionAfter: {
        claim: 'Using thicker wire increases the magnetic field strength of a solenoid.',
        reality: 'Thicker wire has no effect on field strength. It reduces resistance and allows higher current if connected to the same supply voltage - but the field depends only on the current flowing, the number of turns, and whether there is an iron core.',
        visual: 'Replace thin wire with thick wire but keep the current the same: the field is identical. The wire is just a conductor for current - its thickness is irrelevant to field production.',
      },
    },

    guidedPractice: {
      tier1: {
        question: 'A solenoid has N = 100 turns, I = 2 A. The number of turns is doubled to 200 (current unchanged). By what factor does the field strength increase?',
        allSteps: [
          'Original N x I = 100 x 2 = 200',
          'New N x I = 200 x 2 = 400',
          'Ratio = new / old = 400 / 200',
          '??? - calculate the ratio',
        ],
        missingStep: 3,
        missingHint: '400 / 200 = ?',
        answer: 2,
        answerUnit: 'times stronger',
      },
      tier2: {
        question: 'N = 150, I = 3 A. Current is increased to 6 A (N unchanged). By what factor does the field change?',
        shownEquation: 'Field proportional to N x I. Ratio = new (N x I) / old (N x I)',
        shownStep1: 'Original N x I = 150 x 3 = 450',
        hint: 'New N x I = 150 x 6. Then find the ratio.',
        answer: 2,
        answerUnit: 'times stronger',
      },
      tier3: {
        question: 'N = 50, I = 4 A. New: N = 100, I = 2 A. By what factor does the field change?',
        hint: 'Calculate N x I for both old and new. Divide new by old.',
        methodHint: 'Old = 50 x 4 = 200. New = 100 x 2 = 200. Ratio = 200/200.',
        answer: 1,
        answerUnit: '(unchanged)',
      },
    },

    summary: {
      equation: 'Field strength proportional to N x I. P = 1/f does not apply here.',
      sentence: 'A current-carrying solenoid behaves like a bar magnet - field strength increases with more turns, more current, or a soft iron core.',
      promptText: 'Explain in two sentences why a relay switch is useful in electrical circuits, mentioning electromagnets and current.',
    },

    sessionRecap: [
      'A solenoid with current acts like a bar magnet. Field strength increases with more turns, more current, or a soft iron core - thicker wire has no effect.',
      'Applications: electric bells (electromagnet pulls clapper), relay switches (small current controls large current), loudspeakers (varying current creates varying force).',
      'Soft iron is used as the core because it magnetises and demagnetises easily, allowing the electromagnet to be switched on and off cleanly.',
    ],
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

    // -- 9-STEP LESSON DATA ----------------------------------------------------

    hook: {
      hookFact: 'Every power station on Earth - whether coal, nuclear, wind, or hydro - uses the same principle Michael Faraday discovered in 1831 with a piece of wire, a magnet, and a sensitive galvanometer. He found that moving the magnet near the wire briefly deflected the meter. Every electron powering your home traces back to that discovery.',
      hookQuestion: 'If you push a bar magnet in and out of a coil of wire connected to a light bulb, what do you think would happen to the bulb - and what would happen if you stopped moving the magnet?',
      hookEmoji: '⚡',
    },

    lessonKeywords: [
      {
        word: 'Generator Effect',
        symbol: '',
        unit: '',
        definition: 'The induction of a potential difference (and current, if the circuit is complete) when a conductor moves relative to a magnetic field, or when the magnetic field changes.',
        everydayNote: 'All power stations use the generator effect. A wind turbine blade pushes a magnet past coils, inducing a current. A microphone uses the same principle.',
      },
      {
        word: 'Induced EMF',
        symbol: 'EMF',
        unit: 'volts (V)',
        definition: 'The potential difference created by electromagnetic induction. It increases with faster movement, stronger field, or more turns.',
        everydayNote: 'Faraday\'s Law: the faster the change in magnetic flux, the greater the induced EMF. Move a magnet slowly = small voltage; move it fast = large voltage.',
      },
      {
        word: 'Transformer',
        symbol: '',
        unit: '',
        definition: 'A device that uses electromagnetic induction to change the voltage of an AC supply. Uses two coils wound on an iron core.',
        everydayNote: 'The black box in your phone charger is a transformer stepping 230 V mains down to 5 V. It only works because the mains supply is AC.',
      },
      {
        word: 'Turns Ratio',
        symbol: 'Np/Ns',
        unit: '',
        definition: 'The ratio of primary to secondary coil turns in a transformer. Vp/Vs = Np/Ns.',
        everydayNote: 'If the secondary has 10 times more turns than the primary, the secondary voltage is 10 times higher (step-up transformer).',
      },
      {
        word: 'National Grid',
        symbol: '',
        unit: '',
        definition: 'The network of cables and transformers that distributes electrical power from power stations to homes. Step-up transformers increase voltage to ~400 kV for transmission; step-down reduces it to 230 V for homes.',
        everydayNote: 'High voltage means low current (P = VI). Low current means less P = I²R heating in the cables. This is why the Grid uses 400,000 V, not 230 V, for transmission.',
      },
    ],

    prerequisiteCheck: {
      questions: [
        {
          question: 'What must change to induce an EMF in a coil of wire?',
          answers: ['The number of turns must increase', 'The magnetic field must be changing or the conductor must be moving', 'The resistance must decrease', 'The temperature must increase'],
          correct: 1,
          feedback: 'EM induction requires a changing magnetic flux - either the field changes (as in a transformer with AC) or the conductor moves through a field. A static field next to a stationary conductor induces nothing.',
        },
        {
          question: 'A transformer steps voltage from 12 V up to 60 V. The primary has 100 turns. How many turns does the secondary have?',
          answers: ['20', '500', '100', '600'],
          correct: 1,
          feedback: 'Vp/Vs = Np/Ns. Rearrange: Ns = Np x (Vs/Vp) = 100 x (60/12) = 100 x 5 = 500 turns.',
        },
      ],
    },

    topicMapHint: {
      before: ['Electromagnetism (solenoids)', 'Motor Effect (F = BIL)'],
      current: 'EM Induction and Transformers',
      after: ['AC Generators', 'Transformers (dedicated topic)', 'National Grid'],
    },

    workedExample: {
      title: 'Transformer voltage and current calculation',
      equation: 'Vp/Vs = Np/Ns and VpIp = VsIs (100% efficient)',
      context: 'A transformer has Np = 100 turns, Ns = 500 turns, Vp = 12 V. Find Vs. Then find Is if Ip = 5 A.',
      steps: [
        { step: 1, action: 'Write what you know', content: 'Np = 100, Ns = 500, Vp = 12 V, Ip = 5 A', annotation: 'Identify whether this is step-up or step-down. Ns > Np means step-up (voltage increases).' },
        { step: 2, action: 'Find secondary voltage', content: 'Vs = Vp x (Ns/Np) = 12 x (500/100) = 12 x 5 = 60 V', annotation: 'Vs/Vp = Ns/Np. Rearrange: Vs = Vp x (Ns/Np). This is the turns ratio applied to voltage.' },
        { step: 3, action: 'Use power conservation', content: 'VpIp = VsIs. So Is = (VpIp) / Vs = (12 x 5) / 60 = 60/60 = 1 A', annotation: 'Power in = power out for ideal transformer. Higher voltage on secondary means lower current.' },
        { step: 4, action: 'Check power balance', content: 'Primary: 12 x 5 = 60 W. Secondary: 60 x 1 = 60 W. Power conserved.', annotation: 'Always check: P_primary = P_secondary for an ideal transformer. If they differ, you have made an error.' },
      ],
      misconceptionAfter: {
        claim: 'A transformer increases both voltage and current, giving more power.',
        reality: 'A transformer does not create energy. It trades voltage for current. If voltage doubles, current halves - total power stays the same (for ideal 100% efficient transformer). VpIp = VsIs always.',
        visual: 'A step-up transformer is like a gearbox: it trades speed for torque. More voltage means less current; less voltage means more current. The power stays the same.',
      },
    },

    guidedPractice: {
      tier1: {
        question: 'Np = 200, Ns = 1000, Vp = 10 V. Calculate the secondary voltage Vs.',
        allSteps: [
          'Write what you know: Np = 200, Ns = 1000, Vp = 10 V',
          'Write the equation: Vp/Vs = Np/Ns, rearranged: Vs = Vp x (Ns/Np)',
          'Substitute: Vs = 10 x (1000/200) = 10 x 5',
          '??? - calculate Vs',
        ],
        missingStep: 3,
        missingHint: '10 x 5 = ?',
        answer: 50,
        answerUnit: 'V',
      },
      tier2: {
        question: 'Np = 400, Ns = 100, Vp = 240 V. Calculate Vs.',
        shownEquation: 'Vs = Vp x (Ns/Np)',
        shownStep1: 'Write what you know: Np = 400, Ns = 100, Vp = 240 V',
        hint: 'Find Ns/Np first: 100/400 = 0.25. Then multiply by Vp.',
        answer: 60,
        answerUnit: 'V',
      },
      tier3: {
        question: 'Vp = 25 V, Ip = 8 A, Vs = 100 V. Assuming 100% efficiency, find Is.',
        hint: 'Use VpIp = VsIs. Rearrange to Is = (VpIp) / Vs.',
        methodHint: 'Is = (25 x 8) / 100 = 200 / 100.',
        answer: 2,
        answerUnit: 'A',
      },
    },

    summary: {
      equation: 'Vp/Vs = Np/Ns and VpIp = VsIs (ideal transformer)',
      sentence: 'A changing magnetic field induces an EMF; transformers use this to change AC voltage, with power conserved - higher voltage means lower current.',
      promptText: 'Explain in two sentences why the National Grid transmits electricity at 400 kV rather than 230 V, using P = I²R in your answer.',
    },

    sessionRecap: [
      'Generator effect: a conductor moving in a magnetic field (or a changing field near a conductor) induces a potential difference.',
      'Transformer equations: Vp/Vs = Np/Ns (turns ratio) and VpIp = VsIs (power conservation for ideal transformer).',
      'National Grid: step-up to 400 kV reduces current, minimising P = I²R losses in cables; step-down to 230 V for safe domestic use.',
    ],
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

    // -- 9-STEP LESSON DATA ----------------------------------------------------

    hook: {
      hookFact: 'Modern wind turbines rotate at only 10-20 rpm - far too slow to generate 50 Hz AC directly. The raw electrical output varies in frequency and voltage with wind speed. Electronic inverters convert this into stable 50 Hz AC before it enters the National Grid. The generator physics is still Faraday\'s 1831 discovery, but controlled by 21st-century electronics.',
      hookQuestion: 'When a coil spins inside a magnetic field, the current reverses every half-turn. How do you think engineers convert this alternating current into direct current for devices that need a steady, one-direction supply?',
      hookEmoji: '🌬️',
    },

    lessonKeywords: [
      {
        word: 'AC Generator (Alternator)',
        symbol: '',
        unit: '',
        definition: 'A device that converts kinetic energy to electrical energy. A coil rotates in a magnetic field, inducing an EMF that reverses every half-turn. Slip rings maintain contact and preserve the AC output.',
        everydayNote: 'All mains electricity is generated by alternators. The output is AC at 50 Hz in the UK, meaning the current reverses direction 100 times per second.',
      },
      {
        word: 'Slip Rings',
        symbol: '',
        unit: '',
        definition: 'Continuous rings in an AC generator that maintain electrical contact with the rotating coil without reversing the current. They preserve the naturally alternating output.',
        everydayNote: 'Slip rings do NOT reverse the current - they just keep the circuit connected as the coil spins. The alternating nature comes from the coil reversing direction of cutting through field lines.',
      },
      {
        word: 'Dynamo',
        symbol: '',
        unit: '',
        definition: 'A DC generator. Uses a split-ring commutator to reverse the external circuit connections every half-turn, so current in the external circuit always flows in the same direction.',
        everydayNote: 'Bicycle dynamos are DC generators. They power lights without a battery by using a wheel-driven dynamo.',
      },
      {
        word: 'Split-Ring Commutator',
        symbol: '',
        unit: '',
        definition: 'A device in a DC generator (dynamo) that swaps connections every half-turn, converting the naturally AC output into DC for the external circuit.',
        everydayNote: 'The split-ring commutator is also used in DC electric motors to keep the rotation going in one direction.',
      },
      {
        word: 'Peak EMF',
        symbol: '',
        unit: 'volts (V)',
        definition: 'The maximum voltage in one AC cycle. It increases if rotation speed increases, magnetic field strength increases, or more turns are added.',
        everydayNote: 'Mains voltage in the UK is 230 V RMS (root mean square) - the equivalent DC value. The peak EMF is actually about 325 V.',
      },
    ],

    prerequisiteCheck: {
      questions: [
        {
          question: 'In an AC generator, what happens to the induced EMF when the coil is parallel to the magnetic field (coil sides moving perpendicular to field)?',
          answers: ['EMF is zero', 'EMF is at maximum', 'EMF is constant', 'EMF reverses direction'],
          correct: 1,
          feedback: 'EMF is maximum when the coil sides move perpendicular to the field (cutting field lines at the fastest rate). EMF is zero when the coil is perpendicular to the field (coil sides moving parallel to field lines, not cutting them).',
        },
        {
          question: 'What is the key difference between slip rings (alternator) and a split-ring commutator (dynamo)?',
          answers: ['Slip rings increase voltage; commutator decreases it', 'Slip rings maintain AC output; commutator reverses connections to produce DC', 'Slip rings only work with permanent magnets', 'There is no difference'],
          correct: 1,
          feedback: 'Slip rings just maintain contact without changing the current direction - output stays AC. The split-ring commutator reverses connections every half-turn, so the external circuit always gets current in the same direction - DC output.',
        },
      ],
    },

    topicMapHint: {
      before: ['EM Induction (generator effect)', 'Electromagnetism (solenoids)'],
      current: 'AC Generators and Dynamos',
      after: ['Transformers', 'National Grid', 'Motor Effect (reverse process)'],
    },

    workedExample: {
      title: 'Predicting the effect of doubling rotation speed on generator output',
      equation: 'Output frequency = rotation frequency. Peak EMF proportional to rotation speed.',
      context: 'An AC generator produces 12 V peak at 25 Hz (coil rotating 25 times per second). The rotation speed doubles to 50 Hz. Find the new peak voltage and output frequency.',
      steps: [
        { step: 1, action: 'Write what you know', content: 'Original: peak V = 12 V, f = 25 Hz. New: rotation speed doubled to 50 Hz.', annotation: 'Output frequency = rotation frequency. This is a direct relationship.' },
        { step: 2, action: 'Find new frequency', content: 'New output frequency = 50 Hz (same as rotation frequency).', annotation: 'Frequency and rotation speed are directly proportional. Double speed = double frequency.' },
        { step: 3, action: 'Find new peak EMF', content: 'Peak EMF is proportional to rotation speed. New peak V = 12 x 2 = 24 V.', annotation: 'Faster rotation = faster cutting of field lines = greater rate of change of flux = greater induced EMF.' },
        { step: 4, action: 'State the results', content: 'New output: 24 V peak, 50 Hz.', annotation: 'Sense check: both frequency and voltage doubled - consistent with doubled rotation speed.' },
      ],
      misconceptionAfter: {
        claim: 'Slip rings in an alternator reverse the current to produce DC.',
        reality: 'Slip rings do NOT reverse the current - they are continuous rings that just maintain electrical contact. The output from an alternator with slip rings is naturally AC because the coil itself reverses which side cuts which direction of field line every half-turn. The split-ring commutator in a dynamo is what produces DC.',
        visual: 'Slip rings: like a rotating wheel always touching two fixed contacts - no interruption, no reversal. Commutator: split into two halves that swap contacts each half-turn, flipping the circuit connections.',
      },
    },

    guidedPractice: {
      tier1: {
        question: 'A coil rotates at 25 Hz in an alternator. What is the output frequency? If the rotation speed doubles, what is the new frequency?',
        allSteps: [
          'Output frequency = rotation frequency = 25 Hz',
          'Rotation speed doubles: new rotation frequency = 25 x 2 = 50 Hz',
          'Output frequency = rotation frequency',
          '??? - state the new output frequency',
        ],
        missingStep: 3,
        missingHint: 'Output frequency = new rotation frequency = ?',
        answer: 50,
        answerUnit: 'Hz',
      },
      tier2: {
        question: 'An alternator produces 12 V peak at 50 Hz. The rotation speed doubles. What is the new peak voltage?',
        shownEquation: 'Peak EMF is proportional to rotation speed',
        shownStep1: 'Original peak V = 12 V, rotation speed doubles',
        hint: 'Double the speed = double the peak voltage.',
        answer: 24,
        answerUnit: 'V',
      },
      tier3: {
        question: 'An AC generator produces 6 V peak. The number of turns is increased so that the output rises to 18 V. By what factor did the turns increase?',
        hint: 'Peak voltage is proportional to number of turns. Find the ratio of new voltage to old voltage.',
        methodHint: 'Turns ratio = new V / old V = 18 / 6.',
        answer: 3,
        answerUnit: 'times',
      },
    },

    summary: {
      equation: 'Output frequency = rotation frequency. Peak EMF increases with speed, field strength, or turns.',
      sentence: 'AC generators use slip rings to produce alternating current; dynamos use a split-ring commutator to produce direct current - both convert kinetic energy to electrical energy.',
      promptText: 'Describe in three steps how an AC generator produces electricity, starting with the rotating coil.',
    },

    sessionRecap: [
      'AC generator (alternator): coil rotates in magnetic field, slip rings maintain contact, output is AC. Frequency = rotation frequency.',
      'Dynamo (DC generator): split-ring commutator reverses connections every half-turn, so external circuit always gets current in one direction - DC.',
      'Increase output (both types): rotate faster (also increases frequency for AC), use stronger magnet, add more turns.',
    ],
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

    // -- 9-STEP LESSON DATA ----------------------------------------------------

    hook: {
      hookFact: 'The black box in your phone charger steps 230 V mains down to 5 V. Because the voltage ratio equals the turns ratio, the secondary coil has only about 1/46 as many turns as the primary. Transformers are why we can have both 230 V national transmission and 5 V device charging from the same electricity supply.',
      hookQuestion: 'If a transformer increases voltage from 25 V to 100 V, what do you predict happens to the current - and why does it have to change?',
      hookEmoji: '🔌',
    },

    lessonKeywords: [
      {
        word: 'Step-Up Transformer',
        symbol: '',
        unit: '',
        definition: 'A transformer where Ns > Np. Secondary voltage is greater than primary voltage; secondary current is smaller than primary current.',
        everydayNote: 'Power stations use step-up transformers to raise voltage to 400 kV for national transmission. High voltage = low current = less P = I²R heating in cables.',
      },
      {
        word: 'Step-Down Transformer',
        symbol: '',
        unit: '',
        definition: 'A transformer where Ns < Np. Secondary voltage is less than primary voltage; secondary current is greater than primary current.',
        everydayNote: 'Substations and phone chargers use step-down transformers. Your charger steps 230 V down to 5 V for your phone.',
      },
      {
        word: 'Turns Ratio',
        symbol: 'Np/Ns',
        unit: '',
        definition: 'The ratio of primary to secondary turns. Vp/Vs = Np/Ns. The voltage ratio equals the turns ratio.',
        everydayNote: 'A turns ratio of 1:10 (Np:Ns) gives a voltage ratio of 1:10 - a step-up transformer increasing voltage tenfold.',
      },
      {
        word: 'Power Conservation',
        symbol: '',
        unit: '',
        definition: 'For an ideal (100% efficient) transformer, power in = power out. VpIp = VsIs.',
        everydayNote: 'A transformer cannot create energy. If voltage doubles, current must halve to keep power constant. VpIp = VsIs always holds for an ideal transformer.',
      },
      {
        word: 'AC Requirement',
        symbol: '',
        unit: '',
        definition: 'Transformers only work with alternating current (AC). DC creates a static magnetic field that cannot induce an EMF in the secondary coil.',
        everydayNote: 'This is why the National Grid uses AC - and why early DC power networks (like Edison\'s) could not use transformers and were replaced by AC systems.',
      },
    ],

    prerequisiteCheck: {
      questions: [
        {
          question: 'A transformer has Np = 500 and Ns = 2000. Vp = 25 V. Calculate Vs.',
          answers: ['6.25 V', '100 V', '50 V', '12.5 V'],
          correct: 1,
          feedback: 'Vs = Vp x (Ns/Np) = 25 x (2000/500) = 25 x 4 = 100 V. This is a step-up transformer - Ns > Np, so Vs > Vp.',
        },
        {
          question: 'Why do transformers NOT work with DC (direct current)?',
          answers: ['DC has too high a voltage', 'DC creates a static (unchanging) magnetic field that cannot induce an EMF', 'DC damages the iron core', 'DC has no frequency'],
          correct: 1,
          feedback: 'Transformers work by electromagnetic induction. Induction requires a CHANGING magnetic field. DC creates a static field - so once the current is steady, there is no change and no induction in the secondary coil.',
        },
      ],
    },

    topicMapHint: {
      before: ['EM Induction (generator effect)', 'AC Generators'],
      current: 'Transformers',
      after: ['National Grid (application)', 'Power Transmission and Energy Losses'],
    },

    workedExample: {
      title: 'Step-up transformer - voltage and current calculation',
      equation: 'Vp/Vs = Np/Ns and VpIp = VsIs',
      context: 'A transformer has Np = 500, Ns = 2000, Vp = 25 V, Ip = 4 A. Find Vs and Is. Confirm power is conserved.',
      steps: [
        { step: 1, action: 'Write what you know', content: 'Np = 500, Ns = 2000, Vp = 25 V, Ip = 4 A', annotation: 'Ns > Np so this is step-up. Voltage will increase; current will decrease.' },
        { step: 2, action: 'Calculate Vs', content: 'Vs = Vp x (Ns/Np) = 25 x (2000/500) = 25 x 4 = 100 V', annotation: 'Turns ratio = 2000/500 = 4. Voltage multiplied by same factor.' },
        { step: 3, action: 'Calculate Is', content: 'Is = (VpIp) / Vs = (25 x 4) / 100 = 100 / 100 = 1 A', annotation: 'From VpIp = VsIs. Rearrange: Is = VpIp / Vs.' },
        { step: 4, action: 'Confirm power conserved', content: 'Primary: 25 x 4 = 100 W. Secondary: 100 x 1 = 100 W. Power conserved.', annotation: 'Always check: input power = output power for ideal transformer. If not equal, you have made an error.' },
      ],
      misconceptionAfter: {
        claim: 'A step-up transformer increases both voltage and current, delivering more power.',
        reality: 'Power is conserved. Increasing voltage decreases current by the same ratio. A step-up transformer trading 25 V at 4 A for 100 V at 1 A delivers the same 100 W - it does not create energy.',
        visual: 'Think of a water pipe: narrow high-pressure pipe (high voltage, low current) versus wide low-pressure pipe (low voltage, high current). Same flow rate (same power), different pressure-flow balance.',
      },
    },

    guidedPractice: {
      tier1: {
        question: 'Np = 100, Ns = 400, Vp = 50 V. Calculate the secondary voltage Vs.',
        allSteps: [
          'Write what you know: Np = 100, Ns = 400, Vp = 50 V',
          'Write the equation: Vs = Vp x (Ns/Np)',
          'Substitute: Vs = 50 x (400/100) = 50 x 4',
          '??? - calculate Vs',
        ],
        missingStep: 3,
        missingHint: '50 x 4 = ?',
        answer: 200,
        answerUnit: 'V',
      },
      tier2: {
        question: 'Np = 600, Ns = 150, Vp = 120 V. Calculate Vs.',
        shownEquation: 'Vs = Vp x (Ns/Np)',
        shownStep1: 'Write what you know: Np = 600, Ns = 150, Vp = 120 V',
        hint: 'Find Ns/Np: 150/600 = 0.25. Then multiply by Vp.',
        answer: 30,
        answerUnit: 'V',
      },
      tier3: {
        question: 'Vp = 20 V, Ip = 5 A, Vs = 100 V. Assume 100% efficiency. Find Is.',
        hint: 'Use VpIp = VsIs. Rearrange to Is = (VpIp) / Vs.',
        methodHint: 'Is = (20 x 5) / 100 = 100 / 100.',
        answer: 1,
        answerUnit: 'A',
      },
    },

    summary: {
      equation: 'Vp/Vs = Np/Ns and VpIp = VsIs',
      sentence: 'Transformers change AC voltage using the turns ratio; power is conserved, so higher voltage means lower current; they require AC because DC cannot create a changing magnetic field.',
      promptText: 'Explain in two sentences why the National Grid steps voltage up to 400 kV before transmission, using both P = I²R and VpIp = VsIs in your answer.',
    },

    sessionRecap: [
      'Vp/Vs = Np/Ns: voltage ratio equals turns ratio. More secondary turns = higher secondary voltage (step-up).',
      'VpIp = VsIs: power is conserved. Higher voltage on secondary means lower current - a transformer cannot create energy.',
      'Transformers only work with AC. The National Grid steps up to 400 kV (reducing current) to minimise I²R cable losses, then steps back down to 230 V for homes.',
    ],
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

    // ── 9-STEP LESSON DATA ────────────────────────────────────────────────────

    hook: {
      hookFact: 'If you drove at motorway speed (70 mph) without stopping, it would take 170 years to reach the Sun. Yet Earth completes the entire 940-million-km journey around it every single year.',
      hookQuestion: 'What do you think keeps the planets moving in circles around the Sun — rather than flying off into space in a straight line?',
      hookEmoji: '🪐',
    },

    lessonKeywords: [
      {
        word: 'Orbit',
        symbol: '',
        unit: '',
        definition: 'The curved path of an object around another, due to the gravitational attraction between them.',
        everydayNote: 'The Moon orbits Earth; Earth orbits the Sun; satellites orbit Earth.',
      },
      {
        word: 'Orbital Speed',
        symbol: 'v',
        unit: 'm/s',
        definition: 'How fast an object moves along its orbital path. v = 2πr/T.',
        everydayNote: 'Earth orbits the Sun at about 30,000 m/s (108,000 km/h) — you\'re moving that fast right now.',
      },
      {
        word: 'Orbital Period',
        symbol: 'T',
        unit: 'seconds (s)',
        definition: 'The time taken for one complete orbit.',
        everydayNote: 'Earth\'s orbital period = 1 year. The Moon\'s orbital period = 27.3 days.',
      },
      {
        word: 'Centripetal Force',
        symbol: 'F',
        unit: 'newtons (N)',
        definition: 'The inward force needed to keep an object moving in a circle. For orbits, gravity provides this force.',
        everydayNote: 'Spin a ball on a string — the string tension is the centripetal force. Cut the string and the ball flies off in a straight line.',
      },
      {
        word: 'Geostationary',
        symbol: '',
        unit: '',
        definition: 'An orbit at ~36,000 km altitude where the satellite takes exactly 24 hours — so it stays above the same point on Earth.',
        everydayNote: 'TV satellite dishes always point at the same spot in the sky because the satellite is in geostationary orbit.',
      },
    ],

    prerequisiteCheck: {
      questions: [
        {
          question: 'What provides the centripetal force to keep a planet in its orbit?',
          answers: ['The planet\'s engine', 'Gravity from the Sun', 'Magnetic force', 'Air resistance'],
          correct: 1,
          feedback: 'Gravity from the Sun continuously pulls the planet inward — this is the centripetal force that curves its path into an orbit.',
        },
        {
          question: 'What would happen to a planet if gravity suddenly switched off?',
          answers: ['It would fall toward the Sun', 'It would stop moving', 'It would travel in a straight line', 'It would move in a tighter circle'],
          correct: 2,
          feedback: 'Newton\'s First Law: without a force, an object continues in a straight line. Gravity is what curves the path into a circle.',
        },
      ],
    },

    topicMapHint: {
      before: ['Forces & Newton\'s Laws', 'Circular Motion (concept)'],
      current: 'Solar System & Orbital Motion',
      after: ['Stellar Evolution', 'Red-shift & Expanding Universe'],
    },

    workedExample: {
      title: 'Calculating orbital speed using v = 2πr/T',
      equation: 'v = 2πr ÷ T',
      context: 'The Moon orbits Earth at a radius of 3.84 × 10⁸ m with an orbital period of 2.36 × 10⁶ s. What is the Moon\'s orbital speed?',
      steps: [
        {
          step: 1,
          action: 'Write what you know',
          content: 'r = 3.84 × 10⁸ m,   T = 2.36 × 10⁶ s,   v = ?',
          annotation: 'List the values. r = orbital radius (not diameter). T must be in seconds — convert days/years if needed.',
        },
        {
          step: 2,
          action: 'Write the equation',
          content: 'v = 2πr / T',
          annotation: '2πr is the circumference of the orbit (distance for one full circle). Dividing by T gives speed. This equation is given in the exam.',
        },
        {
          step: 3,
          action: 'Calculate the numerator (2πr)',
          content: '2 × π × 3.84 × 10⁸ = 2.41 × 10⁹ m',
          annotation: 'Always calculate the top line first. 2 × 3.14159 × 3.84 × 10⁸ ≈ 2.41 × 10⁹ m. This is the full orbital circumference.',
        },
        {
          step: 4,
          action: 'Divide by T',
          content: 'v = 2.41 × 10⁹ ÷ 2.36 × 10⁶',
          annotation: 'Divide top by bottom. With standard form: divide the numbers (2.41 ÷ 2.36 ≈ 1.02) and subtract the powers (10⁹ ÷ 10⁶ = 10³).',
        },
        {
          step: 5,
          action: 'State with unit',
          content: 'v ≈ 1020 m/s',
          annotation: 'Orbital speed in m/s. The Moon moves at about 1 km per second. Always round sensibly and include the unit.',
        },
      ],
      misconceptionAfter: {
        claim: 'Satellites in higher orbits move faster because they have more distance to cover.',
        reality: 'Wrong — satellites in higher orbits actually move MORE SLOWLY. Gravity is weaker at greater distances, so a lower orbital speed is needed for a stable orbit. Higher orbit = larger circumference AND longer period — but the period increases more, so speed decreases.',
        visual: 'Jupiter (far from Sun) takes 12 Earth-years per orbit and moves at only 13 km/s. Earth (closer) takes 1 year and moves at 30 km/s.',
      },
    },

    guidedPractice: {
      tier1: {
        question: 'A satellite has orbital radius r = 7 × 10⁶ m and period T = 5.6 × 10³ s. What is its orbital speed? (use 2π ≈ 6.28)',
        allSteps: [
          'Write what you know: r = 7 × 10⁶ m, T = 5.6 × 10³ s',
          'Write the equation: v = 2πr / T',
          'Calculate numerator: 6.28 × 7 × 10⁶ = 4.4 × 10⁷ m',
          '??? — divide 4.4 × 10⁷ by 5.6 × 10³',
        ],
        missingStep: 3,
        missingHint: '4.4 × 10⁷ ÷ 5.6 × 10³ = ? (divide numbers, subtract powers)',
        answer: 7857,
        answerUnit: 'm/s',
      },
      tier2: {
        question: 'A planet orbits at radius r = 1.5 × 10¹¹ m with period T = 3.15 × 10⁷ s. What is its orbital speed? (2π ≈ 6.28)',
        shownEquation: 'v = 2πr / T',
        shownStep1: 'Write what you know: r = 1.5 × 10¹¹ m, T = 3.15 × 10⁷ s',
        hint: 'Numerator: 6.28 × 1.5 × 10¹¹ = 9.42 × 10¹¹. Then divide by T.',
        answer: 29905,
        answerUnit: 'm/s',
      },
      tier3: {
        question: 'A geostationary satellite orbits at r = 4.2 × 10⁷ m with T = 86,400 s. Calculate its orbital speed. (2π ≈ 6.28)',
        hint: 'Use v = 2πr/T. Calculate the numerator first, then divide by T.',
        methodHint: 'Numerator = 6.28 × 4.2 × 10⁷. Then divide that by 86400. Make sure you keep track of the powers of 10.',
        answer: 3054,
        answerUnit: 'm/s',
      },
    },

    summary: {
      equation: 'v = 2πr / T',
      sentence: 'Gravity provides the centripetal force for orbits — closer orbits are faster, higher orbits are slower.',
      promptText: 'Explain in one sentence why satellites in lower orbits move faster than those in higher orbits.',
    },

    sessionRecap: [
      'Gravity provides centripetal force for all orbits — without it, objects travel in straight lines.',
      'Orbital speed: v = 2πr/T — lower orbit = higher speed, higher orbit = lower speed.',
      'Geostationary orbit: ~36,000 km, 24-hour period, stays above the same equatorial point.',
    ],
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

    // -- 9-STEP LESSON DATA ----------------------------------------------------

    hook: {
      hookFact: 'The iron in your blood was forged inside a star that died in a supernova before our solar system existed. Every atom of gold, silver, platinum, and uranium on Earth was made in a stellar explosion and scattered across space. You are, quite literally, made of star stuff.',
      hookQuestion: 'The Sun has been burning for 4.6 billion years and has enough fuel for another 5 billion. What do you think keeps it stable - why doesn\'t it either explode outward or collapse inward?',
      hookEmoji: '⭐',
    },

    lessonKeywords: [
      {
        word: 'Protostar',
        symbol: '',
        unit: '',
        definition: 'The early stage of a star\'s formation. A nebula (cloud of gas and dust) collapses under gravity, heating up until nuclear fusion begins.',
        everydayNote: 'A protostar is not yet a proper star - fusion has not started. The core temperature must reach about 10 million K before hydrogen fusion ignites.',
      },
      {
        word: 'Main Sequence',
        symbol: '',
        unit: '',
        definition: 'The stable stage of a star\'s life when inward gravitational force is balanced by outward radiation pressure from hydrogen fusion. Our Sun has been in this stage for 4.6 billion years.',
        everydayNote: 'The Sun will remain on the main sequence for about 5 more billion years. Main sequence lifetime depends on mass - more massive stars burn much faster.',
      },
      {
        word: 'Red Giant / Red Supergiant',
        symbol: '',
        unit: '',
        definition: 'The stage after the main sequence when hydrogen fuel runs out. The core contracts and heats up while the outer layers expand. Sun-like stars become red giants; massive stars become red supergiants.',
        everydayNote: 'When the Sun becomes a red giant in about 5 billion years, it will expand far enough to swallow the orbits of Mercury and Venus - possibly reaching Earth.',
      },
      {
        word: 'Supernova',
        symbol: '',
        unit: '',
        definition: 'The explosive death of a massive star. When fusion stops, gravity causes rapid collapse then rebound. The explosion releases more energy than the Sun will emit in its entire lifetime.',
        everydayNote: 'Supernovae scatter heavy elements across space. Every heavy element heavier than iron - including gold and uranium - was forged in a supernova explosion.',
      },
      {
        word: 'Neutron Star / Black Hole',
        symbol: '',
        unit: '',
        definition: 'The remnants of a massive star after a supernova. Very massive stars leave black holes (gravity so strong light cannot escape); less massive ones leave neutron stars (incredibly dense - one teaspoon would weigh a billion tonnes).',
        everydayNote: 'Neutron stars rotate up to 700 times per second and emit regular radio pulses (pulsars). Black holes cannot be seen directly but are detected by the orbits of nearby stars.',
      },
    ],

    prerequisiteCheck: {
      questions: [
        {
          question: 'What keeps a main sequence star stable?',
          answers: ['The star is too hot to collapse', 'Inward gravity is balanced by outward radiation pressure from fusion', 'The star is rotating too fast to collapse', 'Magnetic fields prevent collapse'],
          correct: 1,
          feedback: 'Main sequence stability: inward gravitational force = outward radiation pressure from nuclear fusion. This balance can last billions of years. When fuel runs out, the balance breaks.',
        },
        {
          question: 'What is the final stage for a Sun-like star (not a massive star)?',
          answers: ['Supernova then black hole', 'Red giant then white dwarf then black dwarf', 'Neutron star', 'Red supergiant then supernova'],
          correct: 1,
          feedback: 'Sun-like stars: main sequence - red giant - white dwarf - black dwarf (cools over billions of years). Massive stars: main sequence - red supergiant - supernova - neutron star or black hole.',
        },
      ],
    },

    topicMapHint: {
      before: ['Nuclear Fusion (energy source)', 'Solar System and Orbital Motion'],
      current: 'Stellar Evolution',
      after: ['Red-shift and Big Bang', 'Dark Matter and Dark Energy'],
    },

    workedExample: {
      title: 'Main sequence stability - the self-regulating mechanism',
      equation: 'Equilibrium: gravitational force in = radiation pressure out',
      context: 'Explain why a main sequence star is self-regulating. What happens if the fusion rate temporarily increases?',
      steps: [
        { step: 1, action: 'State the equilibrium', content: 'On the main sequence: inward gravity = outward radiation pressure from fusion. Star is in stable equilibrium.', annotation: 'This balance keeps the star at a steady size and temperature. It is what defines the main sequence stage.' },
        { step: 2, action: 'Apply the perturbation', content: 'If fusion rate increases: more outward radiation pressure. Net outward force causes star to expand.', annotation: 'Any increase in fusion makes the star expand slightly - like a balloon being inflated.' },
        { step: 3, action: 'Describe the feedback', content: 'As star expands: core cools (lower pressure), fusion rate decreases back to equilibrium.', annotation: 'This is negative feedback - the expansion counteracts the cause. The star is self-regulating.' },
        { step: 4, action: 'State what happens when fuel runs out', content: 'When hydrogen fuel runs low: fusion rate drops, radiation pressure falls, gravity wins, core contracts, outer layers expand - red giant stage begins.', annotation: 'The equilibrium breaks permanently when fuel runs out. This marks the end of the main sequence.' },
      ],
      misconceptionAfter: {
        claim: 'The Sun will eventually explode in a supernova.',
        reality: 'The Sun is not massive enough to undergo a supernova. Only stars with mass greater than about 8 times the Sun\'s mass have enough gravity to cause the core collapse needed for a supernova. The Sun will become a red giant, eject its outer layers as a planetary nebula, then cool to a white dwarf.',
        visual: 'The Sun\'s fate: Red giant (in 5 billion years) - planetary nebula (outer layers drifting away) - white dwarf (core remains, slowly cooling). No explosion.',
      },
    },

    guidedPractice: {
      tier1: {
        question: 'The Sun has been on the main sequence for 4.6 billion years and has about 5 billion years left. What is the Sun\'s total estimated main sequence lifetime in billion years?',
        allSteps: [
          'Time already spent on main sequence: 4.6 billion years',
          'Time remaining on main sequence: 5 billion years',
          'Total main sequence lifetime = time spent + time remaining',
          '??? - calculate total',
        ],
        missingStep: 3,
        missingHint: '4.6 + 5 = ?',
        answer: 9.6,
        answerUnit: 'billion years',
      },
      tier2: {
        question: 'A star has 10 times the mass of the Sun. It uses fuel approximately 1000 times faster than the Sun. If the Sun lasts 10 billion years, how long does this star last (in millions of years)?',
        shownEquation: 'Star lifetime = Sun lifetime / fuel use rate ratio',
        shownStep1: 'Sun lifetime = 10 billion years = 10,000 million years',
        hint: 'Divide 10,000 million years by 1000.',
        answer: 10,
        answerUnit: 'million years',
      },
      tier3: {
        question: 'The Sun has been on the main sequence for 4.6 billion out of a total 9.6 billion year main sequence lifetime. What percentage of its main sequence life has the Sun already used?',
        hint: 'Percentage = (time used / total time) × 100.',
        methodHint: '(4.6 / 9.6) × 100. Round to one decimal place.',
        answer: 47.9,
        answerUnit: '%',
      },
    },

    summary: {
      equation: 'Main sequence equilibrium: gravity in = radiation pressure out.',
      sentence: 'Stars form from nebulae, spend most of their lives on the main sequence fusing hydrogen, then evolve into red giants or supergiants - Sun-like stars end as white dwarfs; massive stars end as neutron stars or black holes after a supernova.',
      promptText: 'Without notes, write the full life cycle of (a) a Sun-like star and (b) a massive star, naming every stage.',
    },

    sessionRecap: [
      'Main sequence stability: inward gravity balanced by outward radiation pressure from fusion. Self-regulating mechanism keeps star stable for billions of years.',
      'Sun-like star life cycle: nebula - protostar - main sequence - red giant - white dwarf - black dwarf.',
      'Massive star life cycle: nebula - protostar - main sequence - red supergiant - supernova - neutron star or black hole. Supernovae create all elements heavier than iron.',
    ],
  },
  visible_light: {
    id: 'visible_light', module: 'Waves', moduleColor: WC, course: 'physics-only', boards: ['aqa','edexcel','ocr-a','ocr-b','wjec','ccea'],
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

    // -- 9-STEP LESSON DATA ----------------------------------------------------

    hook: {
      hookFact: 'A ripe tomato looks red under white light because it absorbs every colour except red. But take that same tomato into a room lit only by pure green light, and it appears black - there is no red light present for it to reflect. An object cannot create colour, it can only reflect wavelengths already in the incident light.',
      hookQuestion: 'Your school uniform is a certain colour. Under a sodium street lamp (which emits only yellow-orange light), what colour do you think it would appear - and why?',
      hookEmoji: '🎨',
    },

    lessonKeywords: [
      {
        word: 'Specular Reflection',
        symbol: '',
        unit: '',
        definition: 'Reflection from a smooth surface where all incident rays reflect in the same direction (angle of incidence = angle of reflection). Produces a clear, mirror-like image.',
        everydayNote: 'A calm lake gives specular reflection - you see a clear upside-down image. A choppy lake gives diffuse reflection - no image.',
      },
      {
        word: 'Diffuse Reflection',
        symbol: '',
        unit: '',
        definition: 'Reflection from a rough surface where rays scatter in many different directions because different parts of the surface face different ways.',
        everydayNote: 'Most everyday objects reflect diffusely - that is why you can see a white piece of paper from any angle, but cannot see your reflection in it.',
      },
      {
        word: 'Colour Filter',
        symbol: '',
        unit: '',
        definition: 'A transparent material that absorbs all wavelengths except its own colour, which it transmits.',
        everydayNote: 'A red filter absorbs all colours except red. Stage lighting uses colour filters to create dramatic effects. If no red light enters, a red filter transmits nothing.',
      },
      {
        word: 'Object Colour',
        symbol: '',
        unit: '',
        definition: 'The colour of an opaque object is determined by the wavelengths it reflects. White objects reflect all wavelengths; black objects absorb all.',
        everydayNote: 'A blue book reflects blue wavelengths and absorbs all others. Under red light only, the blue book appears black because it absorbs red and has no blue wavelengths to reflect.',
      },
      {
        word: 'Incident Light',
        symbol: '',
        unit: '',
        definition: 'The light that falls on an object or surface. An object can only reflect wavelengths that are present in the incident light.',
        everydayNote: 'This is why colour perception changes under different light sources. Fluorescent lighting, LED, and sunlight each have different spectra.',
      },
    ],

    prerequisiteCheck: {
      questions: [
        {
          question: 'A white light source shines through a blue filter onto a red object. What colour does the object appear?',
          answers: ['Blue', 'Red', 'Purple', 'Black'],
          correct: 3,
          feedback: 'The blue filter only transmits blue light. The red object can only reflect red wavelengths. No red light is present (filtered out), and the red object absorbs blue. Nothing is reflected, so it appears black.',
        },
        {
          question: 'What is the difference between specular and diffuse reflection?',
          answers: ['Specular is from coloured surfaces; diffuse is from white surfaces', 'Specular is from smooth surfaces (rays all reflect same direction); diffuse is from rough surfaces (rays scatter)', 'Specular reflects all wavelengths; diffuse absorbs some', 'There is no difference - both obey angle of incidence = angle of reflection'],
          correct: 1,
          feedback: 'Specular: smooth surface, all rays reflect in one direction - produces a mirror image. Diffuse: rough surface, rays scatter in many directions - no image formed, object visible from all angles.',
        },
      ],
    },

    topicMapHint: {
      before: ['Wave Reflection', 'EM Spectrum (visible light section)'],
      current: 'Visible Light and Colour',
      after: ['Lenses and Optics', 'Colour and Sight (applied)'],
    },

    workedExample: {
      title: 'Predicting the colour of an object under different light sources',
      equation: 'Object colour = wavelengths reflected. Can only reflect wavelengths present in incident light.',
      context: 'White light passes through a green filter. The transmitted light then falls on a blue object. What colour does the blue object appear?',
      steps: [
        { step: 1, action: 'Identify what light the filter transmits', content: 'Green filter transmits only green wavelengths. All other colours are absorbed by the filter.', annotation: 'A filter named after a colour transmits only that colour. All others are absorbed.' },
        { step: 2, action: 'Identify what the object can reflect', content: 'Blue object reflects only blue wavelengths, absorbs all others (including green).', annotation: 'An object\'s colour is fixed by its surface - it can only reflect its own colour.' },
        { step: 3, action: 'Determine what wavelengths reach the object', content: 'Only green light reaches the blue object (everything else was blocked by filter).', annotation: 'No blue light is present - the filter removed it.' },
        { step: 4, action: 'Determine what the object reflects', content: 'Object absorbs the green light. No blue light is present to reflect. Object appears black.', annotation: 'When an object cannot reflect any of the available wavelengths, it appears black - no light is reflected to your eyes.' },
      ],
      misconceptionAfter: {
        claim: 'An object creates its own colour.',
        reality: 'An object cannot create colour - it only reflects certain wavelengths from the incident light. If those wavelengths are absent, the object appears black. Colour is a property of reflected light, not of the object itself.',
        visual: 'A red apple in a red-lit room looks red. In a blue-lit room, the same apple looks black - the apple has not changed, only the available wavelengths have.',
      },
    },

    guidedPractice: {
      tier1: {
        question: 'A ray hits a flat mirror at an angle of incidence of 55 degrees (from the normal). What is the angle of reflection?',
        allSteps: [
          'Write what you know: angle of incidence = 55 degrees',
          'State the law: angle of incidence = angle of reflection',
          'Apply: angle of reflection = 55 degrees',
          '??? - state the answer with units',
        ],
        missingStep: 3,
        missingHint: 'Angle of reflection = angle of incidence = ?',
        answer: 55,
        answerUnit: 'degrees',
      },
      tier2: {
        question: 'A ray hits a mirror at 30 degrees to the SURFACE (not the normal). What is the angle of reflection from the normal?',
        shownEquation: 'Angle from normal = 90 - angle from surface',
        shownStep1: 'Angle from surface = 30 degrees',
        hint: 'First find the angle of incidence from the normal: 90 - 30 = 60 degrees. Then apply the law of reflection.',
        answer: 60,
        answerUnit: 'degrees',
      },
      tier3: {
        question: 'Two mirrors are placed at 90 degrees to each other. A ray hits the first mirror at 40 degrees to the normal. After reflecting, it hits the second mirror. What is the angle of incidence on the second mirror?',
        hint: 'After the first reflection, find the angle the ray makes with the second mirror using geometry.',
        methodHint: 'After first reflection at 40 degrees: the reflected ray makes 40 degrees with the first mirror\'s normal. The two mirrors are at 90 degrees, so the angle on the second mirror = 90 - 40 = 50 degrees.',
        answer: 50,
        answerUnit: 'degrees',
      },
    },

    summary: {
      equation: 'Angle of incidence = angle of reflection (specular). Object colour = reflected wavelengths only.',
      sentence: 'Specular reflection (smooth) gives mirror images; diffuse reflection (rough) scatters light; objects only reflect wavelengths present in the incident light - if those wavelengths are absent, the object appears black.',
      promptText: 'Predict what colour a yellow object would appear under (a) white light, (b) blue light only, and (c) yellow light only. Explain each.',
    },

    sessionRecap: [
      'Specular reflection (smooth surface): all rays reflect in one direction, angle of incidence = angle of reflection. Diffuse reflection (rough surface): rays scatter in many directions.',
      'A colour filter transmits only its own colour and absorbs all others.',
      'Object colour = reflected wavelengths. A object can only reflect wavelengths that are in the incident light - if its colour is absent from the light, it appears black.',
    ],
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

    // -- 9-STEP LESSON DATA ----------------------------------------------------

    hook: {
      hookFact: 'The most distant galaxy ever observed has its light red-shifted so severely that its original ultraviolet emission has been stretched all the way into the infrared by the time it reaches us. That light left the galaxy 13.4 billion years ago, when the universe was only about 300 million years old.',
      hookQuestion: 'You have probably heard the Doppler effect with an ambulance siren - the pitch drops as it passes you. How do you think the same principle might apply to light from a distant galaxy moving away from us?',
      hookEmoji: '🌌',
    },

    lessonKeywords: [
      {
        word: 'Red-shift',
        symbol: 'z',
        unit: '',
        definition: 'The increase in wavelength (shift towards the red end of the spectrum) of light from objects moving away from the observer. z = (observed - rest wavelength) / rest wavelength.',
        everydayNote: 'All distant galaxies show red-shift, meaning all galaxies are moving away from us - evidence that the universe is expanding.',
      },
      {
        word: 'Expanding Universe',
        symbol: '',
        unit: '',
        definition: 'The observation that galaxies are moving away from each other - the universe is getting larger. More distant galaxies recede faster.',
        everydayNote: 'The universe expanding does not mean galaxies are flying through space away from us - space itself is stretching, like dots drawn on an inflating balloon.',
      },
      {
        word: 'Big Bang',
        symbol: '',
        unit: '',
        definition: 'The cosmological model in which the universe began from an extremely hot, dense single point approximately 13.8 billion years ago and has been expanding ever since.',
        everydayNote: 'The cosmic microwave background radiation - faint thermal radiation filling all of space at 2.7 K - is the afterglow of the Big Bang and is the strongest evidence for it.',
      },
      {
        word: 'Dark Matter',
        symbol: '',
        unit: '',
        definition: 'Matter that does not emit or absorb electromagnetic radiation but exerts gravitational force. It accounts for most of the matter in galaxies and holds them together.',
        everydayNote: 'Galaxies rotate faster than they should based on visible matter alone. Dark matter provides the extra gravity needed. About 27% of the universe is dark matter.',
      },
      {
        word: 'Dark Energy',
        symbol: '',
        unit: '',
        definition: 'The unknown cause of the accelerating expansion of the universe. It acts against gravity on the largest scales and accounts for about 68% of the universe\'s total energy content.',
        everydayNote: 'Since 1998, observations of distant supernovae have shown the expansion of the universe is speeding up, not slowing down. Dark energy is the name given to whatever is causing this.',
      },
    ],

    prerequisiteCheck: {
      questions: [
        {
          question: 'What does red-shift in light from a distant galaxy tell us?',
          answers: ['The galaxy contains many red stars', 'The galaxy is moving towards us', 'The galaxy is moving away from us', 'The galaxy is very hot'],
          correct: 2,
          feedback: 'Red-shift means the wavelength of light has increased - stretched towards the red end. This happens when the source moves away from the observer (Doppler effect). All distant galaxies show red-shift, indicating they are all moving away.',
        },
        {
          question: 'A galaxy is further away than another galaxy. How does its red-shift compare?',
          answers: ['It has less red-shift', 'It has the same red-shift', 'It has greater red-shift', 'It shows blue-shift'],
          correct: 2,
          feedback: 'Further galaxies have greater red-shift because they are receding faster. This relationship (further = faster recession) is Hubble\'s Law and is key evidence that the universe began with a Big Bang.',
        },
      ],
    },

    topicMapHint: {
      before: ['Wave Properties (wavelength)', 'Stellar Evolution', 'Solar System'],
      current: 'Red-shift and the Big Bang',
      after: ['Dark Matter and Dark Energy', 'Cosmic Microwave Background'],
    },

    workedExample: {
      title: 'Calculating red-shift from observed and rest wavelengths',
      equation: 'z = (observed wavelength - rest wavelength) / rest wavelength',
      context: 'A galaxy\'s hydrogen spectral line has a rest wavelength of 656 nm. The observed wavelength is 700 nm. Calculate the red-shift z.',
      steps: [
        { step: 1, action: 'Write what you know', content: 'Rest wavelength = 656 nm, observed wavelength = 700 nm, z = ?', annotation: 'Make sure both wavelengths are in the same units (both nm here). The observed wavelength is longer than rest because the galaxy moves away.' },
        { step: 2, action: 'Write the equation', content: 'z = (observed - rest) / rest', annotation: 'This formula gives a dimensionless number. z > 0 means red-shift (recession). z < 0 would mean blue-shift (approaching - rare for distant galaxies).' },
        { step: 3, action: 'Substitute', content: 'z = (700 - 656) / 656 = 44 / 656', annotation: 'Subtract rest from observed first: 700 - 656 = 44 nm. Then divide by rest wavelength.' },
        { step: 4, action: 'Calculate and interpret', content: 'z = 44/656 ≈ 0.067. Galaxy is receding.', annotation: 'z = 0.067 means the galaxy is moving away at about 6.7% of the speed of light. A nearby galaxy might have z = 0.001; the most distant have z > 10.' },
      ],
      misconceptionAfter: {
        claim: 'Red-shift means the galaxy is actually red-coloured or contains only red stars.',
        reality: 'Red-shift is nothing to do with the colour of the stars. It refers to ALL the wavelengths in the spectrum being shifted towards longer (redder) wavelengths. Even blue and green spectral lines are red-shifted - they shift towards longer wavelengths, but may not become visibly red.',
        visual: 'A galaxy\'s spectrum is like a barcode of dark lines. Red-shift slides the whole barcode towards longer wavelengths. Compare the barcode positions to a lab reference to measure z.',
      },
    },

    guidedPractice: {
      tier1: {
        question: 'Rest wavelength = 500 nm. Observed wavelength = 520 nm. Calculate z.',
        allSteps: [
          'Write what you know: rest = 500 nm, observed = 520 nm',
          'Write the equation: z = (observed - rest) / rest',
          'Substitute: z = (520 - 500) / 500 = 20 / 500',
          '??? - calculate z',
        ],
        missingStep: 3,
        missingHint: '20 / 500 = ?',
        answer: 0.04,
        answerUnit: '',
      },
      tier2: {
        question: 'Rest wavelength = 400 nm. Observed wavelength = 440 nm. Calculate z.',
        shownEquation: 'z = (observed - rest) / rest',
        shownStep1: 'Write what you know: rest = 400 nm, observed = 440 nm',
        hint: 'Subtract rest from observed, then divide by rest.',
        answer: 0.1,
        answerUnit: '',
      },
      tier3: {
        question: 'A galaxy has z = 0.05. The rest wavelength of a spectral line is 600 nm. What is the observed wavelength?',
        hint: 'Rearrange z = (observed - rest) / rest to find observed wavelength. observed = rest x (1 + z).',
        methodHint: 'observed = 600 x (1 + 0.05) = 600 x 1.05.',
        answer: 630,
        answerUnit: 'nm',
      },
    },

    summary: {
      equation: 'z = (observed wavelength - rest wavelength) / rest wavelength',
      sentence: 'Red-shift shows galaxies are moving away; further galaxies have greater red-shift; the universe is expanding from a Big Bang 13.8 billion years ago.',
      promptText: 'Explain in two sentences how red-shift observations support the Big Bang theory.',
    },

    sessionRecap: [
      'Red-shift: observed wavelength is longer than rest wavelength. z = (observed - rest) / rest. Positive z means the galaxy is receding.',
      'Further galaxies have greater red-shift and faster recession (Hubble\'s Law). All galaxies show red-shift - the universe is expanding.',
      'Big Bang theory: universe began 13.8 billion years ago from a hot dense point. Dark matter provides extra gravity; dark energy drives accelerating expansion. Together they make up ~95% of the universe.',
    ],
  },

  converging_diverging_lenses: {
    id: 'converging_diverging_lenses', module: 'Waves', moduleColor: '#8b5cf6',
    title: 'Converging & Diverging Lenses', subtitle: 'Ray Diagrams, Power, Vision Correction',
    description: 'A converging (convex) lens bends parallel rays to a focal point. A diverging (concave) lens spreads rays outward. Lens power P = 1/f in dioptres. Converging lenses correct long sight; diverging lenses correct short sight. Magnification = image height / object height.',
    lessonVisual: LensesLesson, ideaVisual: LensesIdea, realityVisual: LensesReality,
    boards: ['ccea', 'ocr-b', 'aqa', 'ocr-a'],
    question: 'A converging lens has a focal length of 0.2 m. What is its power?',
    questionSubtitle: 'Use P = 1/f',
    options: ['0.2 D', '2 D', '5 D', '20 D'],
    correctAnswer: 2,
    keywords: ['converging lens', 'diverging lens', 'focal point', 'focal length', 'power', 'dioptres', 'real image', 'virtual image', 'magnification', 'principal axis', 'myopia', 'hyperopia'],
    sentenceStarters: ['A converging lens bends parallel rays...', 'The focal length is...', 'Using P = 1/f, the power =...', 'A diverging lens always produces...', 'Short sight is corrected using...'],
    modelAnswers: [
      'A converging lens bends parallel rays **towards the principal axis so they meet at the focal point on the far side**.',
      'The focal length is **the distance from the centre of the lens to the focal point, measured in metres**.',
      'Using P = 1/f, the power = **1 ÷ 0.2 = 5 D (dioptres)**.',
      'A diverging lens always produces **a virtual, upright, diminished image — regardless of object position**.',
      'Short sight (myopia) is corrected using **a diverging lens, which spreads rays out before they enter the eye**.',
    ],
    misconception: 'Diverging lenses always form virtual, upright, diminished images — they cannot form real images. A higher power means a shorter focal length, not a longer one.',
    concept: 'P = 1/f. Converging lens: real, inverted image when object is beyond F; virtual, upright, magnified when object is inside F (magnifying glass). Diverging lens: always virtual, upright, diminished. Vision correction: myopia → diverging lens; hyperopia → converging lens.',

    // -- 9-STEP LESSON DATA ----------------------------------------------------

    hook: {
      hookFact: 'A camera phone uses a tiny converging lens just millimetres across. When you tap to focus, software adjusts which sensor pixels are sharpest — but the physics of bending light rays to a focal point is identical to a telescope 10 metres long. The human eye does the same thing by changing the shape of its lens 100,000 times a day without you thinking about it.',
      hookQuestion: 'Hold a finger close to your face and focus on it, then look at the wall behind it — your finger blurs. What must your eye be physically changing to switch focus, and how might a glass lens do the same job?',
      hookEmoji: '🔭',
    },

    lessonKeywords: [
      {
        word: 'Converging Lens',
        symbol: '',
        unit: '',
        definition: 'A lens thicker in the middle (convex shape) that bends parallel rays towards the principal axis so they meet at the focal point on the far side.',
        everydayNote: 'Magnifying glasses, camera lenses, and the human eye lens are all converging lenses.',
      },
      {
        word: 'Diverging Lens',
        symbol: '',
        unit: '',
        definition: 'A lens thinner in the middle (concave shape) that bends parallel rays away from each other, so they appear to come from a virtual focal point on the same side as the incoming light.',
        everydayNote: 'Glasses prescribed for short-sightedness (myopia) use diverging lenses to reduce the converging power of the eye.',
      },
      {
        word: 'Focal Point (F)',
        symbol: 'F',
        unit: '',
        definition: 'The point where parallel rays converge after passing through a converging lens, or appear to diverge from after passing through a diverging lens.',
        everydayNote: 'Hold a magnifying glass in sunlight — the bright dot on the paper is the focal point where parallel sun rays converge.',
      },
      {
        word: 'Focal Length',
        symbol: 'f',
        unit: 'metres (m)',
        definition: 'The distance from the optical centre of the lens to the focal point.',
        everydayNote: 'A short focal length = tight bending = high power lens. Reading glasses might have f = 0.5 m (power = +2 D).',
      },
      {
        word: 'Power of a Lens',
        symbol: 'P',
        unit: 'dioptres (D)',
        definition: 'How strongly a lens bends light. P = 1/f, where f is in metres. Converging lenses have positive power; diverging lenses have negative power.',
        everydayNote: 'An eye test prescription of −2 D means a diverging lens with f = 0.5 m. The minus sign tells you it is diverging.',
      },
      {
        word: 'Real Image',
        symbol: '',
        unit: '',
        definition: 'An image formed where rays actually meet. It can be projected onto a screen and is always inverted (upside down).',
        everydayNote: 'A cinema projector uses a converging lens to throw a real, inverted image onto the screen (the film is loaded upside down).',
      },
      {
        word: 'Virtual Image',
        symbol: '',
        unit: '',
        definition: 'An image formed where rays appear to diverge from — they do not actually meet there. It cannot be projected and is always upright.',
        everydayNote: 'When you use a magnifying glass close to an object, the enlarged image you see is virtual — you cannot project it onto paper.',
      },
      {
        word: 'Magnification',
        symbol: 'm',
        unit: 'no units',
        definition: 'magnification = image height ÷ object height = image distance ÷ object distance. Values greater than 1 mean the image is larger than the object.',
        everydayNote: 'A magnification of 0.5 means the image is half the size of the object (diminished). A magnification of 3 means it is three times larger.',
      },
    ],

    prerequisiteCheck: {
      questions: [
        {
          question: 'Light bends when it passes from air into glass. What is this called?',
          answers: ['Reflection', 'Diffraction', 'Refraction', 'Dispersion'],
          correct: 2,
          feedback: 'Refraction is the bending of light (or any wave) when it crosses a boundary between two media of different optical density. Lenses work entirely because of refraction.',
        },
        {
          question: 'A lens has focal length 0.5 m. What is its power?',
          answers: ['0.5 D', '2 D', '5 D', '50 D'],
          correct: 1,
          feedback: 'P = 1/f = 1/0.5 = 2 D. Dioptres (D) is the unit. The shorter the focal length, the higher the power.',
        },
      ],
    },

    topicMapHint: {
      before: ['Refraction', 'Total Internal Reflection', 'Lenses & Optics'],
      current: 'Converging & Diverging Lenses — ray diagrams and vision correction',
      after: ['Telescopes & Microscopes', 'The Eye (applied optics)'],
    },

    workedExample: {
      title: 'Calculating lens power and identifying image type',
      equation: 'P = 1/f (dioptres). Magnification = image height / object height.',
      context: 'A converging lens has focal length f = 0.25 m. An object is placed 0.5 m from the lens. The image formed is 3 cm tall and the object is 6 cm tall. Calculate (a) lens power, (b) magnification, and (c) state whether the image is real or virtual.',
      steps: [
        { step: 1, action: 'Write what you know', content: 'f = 0.25 m, object distance = 0.5 m, image height = 3 cm, object height = 6 cm', annotation: 'Focal length must be in metres for the power equation. The object distance (0.5 m) is beyond the focal point (0.25 m), which matters for image type.' },
        { step: 2, action: 'Calculate power', content: 'P = 1/f = 1/0.25 = 4 D', annotation: 'Dioptres (D) is equivalent to m⁻¹. Positive power confirms this is a converging lens.' },
        { step: 3, action: 'Calculate magnification', content: 'magnification = image height / object height = 3 / 6 = 0.5', annotation: 'Magnification has no units. A value less than 1 means the image is smaller than the object (diminished).' },
        { step: 4, action: 'State image type and interpret', content: 'Object is beyond F, so the image is real and inverted. Magnification = 0.5 — image is diminished.', annotation: 'For a converging lens: object beyond F → real, inverted image. The magnification confirms it is diminished (0.5 < 1). This matches a camera or the eye when viewing a distant object.' },
      ],
      misconceptionAfter: {
        claim: 'A converging lens always magnifies — that is the whole point of a lens.',
        reality: 'A converging lens only magnifies when the object is inside the focal length (magnifying glass use). When the object is beyond the focal point, the image can be smaller than the object. Cameras and eyes use converging lenses to form diminished real images of distant scenes.',
        visual: 'Think of a projector: a small film frame (object) placed just beyond F produces a large real image on a distant screen. Reverse this: a large scene (object far beyond F) produces a small real image on the film/sensor inside the camera.',
      },
    },

    guidedPractice: {
      tier1: {
        question: 'A converging lens has focal length f = 0.4 m. Calculate its power.',
        allSteps: [
          'Write what you know: f = 0.4 m',
          'Write the equation: P = 1/f',
          'Substitute: P = 1/0.4',
          '??? - calculate P in dioptres',
        ],
        missingStep: 3,
        missingHint: '1 divided by 0.4 = ? Think: 1/0.4 is the same as 10/4.',
        answer: 2.5,
        answerUnit: 'D',
      },
      tier2: {
        question: 'An image is 8 cm tall and the object is 2 cm tall. Calculate the magnification.',
        shownEquation: 'magnification = image height / object height',
        shownStep1: 'Image height = 8 cm, object height = 2 cm',
        hint: 'Divide image height by object height. The answer has no units.',
        answer: 4,
        answerUnit: '',
      },
      tier3: {
        question: 'A person with short sight (myopia) needs a diverging lens of focal length −0.5 m. What is the power of the lens, and what sign does it have?',
        hint: 'Use P = 1/f. Diverging lenses have negative focal lengths and negative powers.',
        methodHint: 'P = 1/(−0.5) = −2 D. The negative sign confirms it is a diverging lens.',
        answer: -2,
        answerUnit: 'D',
      },
    },

    summary: {
      equation: 'P = 1/f (D). Magnification = image height / object height.',
      sentence: 'Converging lenses bring parallel rays to a focal point and can form real or virtual images; diverging lenses always form virtual, upright, diminished images; vision correction uses converging lenses for long sight and diverging lenses for short sight.',
      promptText: 'Without notes, state (a) what type of image a diverging lens always produces, (b) how to correct short sight, and (c) what P = 1/f calculates.',
    },

    sessionRecap: [
      'Converging (convex) lens: thicker in the middle. Parallel rays refract towards the axis and meet at focal point F. P = 1/f in dioptres (D). Positive power.',
      'Object beyond F → real, inverted image (camera, eye, projector). Object inside F → virtual, upright, magnified image (magnifying glass). Magnification = image height / object height.',
      'Diverging (concave) lens: thinner in middle. Always produces virtual, upright, diminished image. Negative power (e.g. −2 D). Used to correct myopia (short sight). Converging lens corrects hyperopia (long sight).',
    ],

    lessonSteps: [
      {
        type: 'concept',
        title: 'Converging Lenses',
        content: 'A converging (convex) lens is thicker in the middle. Parallel rays entering the lens are refracted towards the principal axis and meet at the focal point F on the other side. The focal length f is the distance from the lens to F. Stronger lenses (shorter f) have more power: P = 1/f.',
      },
      {
        type: 'concept',
        title: 'Ray Diagrams — 3 Key Rays',
        content: 'To draw a ray diagram for a converging lens, use 3 construction rays from the top of the object: 1) A ray parallel to the axis → refracts through F on the far side. 2) A ray through the optical centre → continues straight (undeviated). 3) A ray through F on the near side → exits parallel to the axis. Where these rays meet = the image position.',
      },
      {
        type: 'worked_example',
        title: 'Object Beyond 2F — Real, Inverted, Diminished',
        content: 'Object distance = 30 cm, focal length = 10 cm. Using 1/v − 1/u = 1/f (real-is-positive convention): 1/v = 1/10 + 1/(−30) = 3/30 − 1/30 = 2/30, so v = 15 cm. Image is real (positive v), inverted, and diminished (magnification = 15/30 = 0.5×).',
      },
      {
        type: 'concept',
        title: 'Diverging Lenses',
        content: 'A diverging (concave) lens is thinner in the middle. Parallel rays entering are refracted away from the axis, appearing to come from a virtual focal point F on the same side as the object. Diverging lenses always form virtual, upright, diminished images — no matter where the object is. Used in glasses for short-sighted (myopic) people.',
      },
      {
        type: 'concept',
        title: 'Vision Correction',
        content: 'Short sight (myopia): eyeball too long — image forms in front of retina. Corrected with a diverging lens. Long sight (hyperopia): eyeball too short — image forms behind retina. Corrected with a converging lens. The required lens power P = 1/f is chosen to move the image onto the retina.',
      },
      {
        type: 'concept',
        title: 'Power and Focal Length',
        content: 'Power P = 1/f (where f is in metres, P is in dioptres D). A converging lens of f = 0.25 m has P = +4 D (positive = converging). A diverging lens of f = −0.5 m has P = −2 D (negative = diverging). Combining lenses: total power = sum of individual powers.',
      },
    ],
  },
}
