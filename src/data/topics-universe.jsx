import { motion } from 'motion/react'
import { useState } from 'react'
import { Telescope, Star, History } from 'lucide-react'
import { MisconceptionCard, RealWorldCard, FormulaBox } from './visuals-helpers'

const UC = '#9b59b6'  // purple for universe/space

// ─── Telescope Optics ────────────────────────────────────────────────────────
function TelescopeOpticsLesson() {
  const [fObj, setFObj] = useState(900)
  const [fEye, setFEye] = useState(30)
  const mag = Math.round(fObj / fEye)

  // SVG ray diagram dimensions
  const W = 260, H = 160
  const objLensX = 60
  const eyeLensX = 190
  const focalX = (objLensX + eyeLensX) / 2  // shared focal point ~125
  const axisY = H / 2

  return (
    <div className="w-full h-full flex flex-col items-center justify-start gap-2 px-3 py-2" style={{ background: '#0b1121' }}>
      {/* Ray diagram */}
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
        {/* Optical axis */}
        <line x1="10" y1={axisY} x2={W - 10} y2={axisY} stroke="#334155" strokeWidth="1" strokeDasharray="4 3" />

        {/* Incoming parallel rays from left */}
        <line x1="10" y1={axisY - 22} x2={objLensX} y2={axisY - 22} stroke={UC} strokeWidth="1.5" strokeLinecap="round" />
        <line x1="10" y1={axisY} x2={objLensX} y2={axisY} stroke={UC} strokeWidth="1.5" strokeLinecap="round" />
        <line x1="10" y1={axisY + 22} x2={objLensX} y2={axisY + 22} stroke={UC} strokeWidth="1.5" strokeLinecap="round" />

        {/* Rays converge to focal point */}
        <line x1={objLensX} y1={axisY - 22} x2={focalX} y2={axisY} stroke={UC} strokeWidth="1.5" strokeLinecap="round" />
        <line x1={objLensX} y1={axisY} x2={focalX} y2={axisY} stroke={UC} strokeWidth="1.5" strokeLinecap="round" />
        <line x1={objLensX} y1={axisY + 22} x2={focalX} y2={axisY} stroke={UC} strokeWidth="1.5" strokeLinecap="round" />

        {/* Rays diverge from focal point then re-converge at eyepiece */}
        <line x1={focalX} y1={axisY} x2={eyeLensX} y2={axisY - 18} stroke="#00d4ff" strokeWidth="1.5" strokeLinecap="round" />
        <line x1={focalX} y1={axisY} x2={eyeLensX} y2={axisY} stroke="#00d4ff" strokeWidth="1.5" strokeLinecap="round" />
        <line x1={focalX} y1={axisY} x2={eyeLensX} y2={axisY + 18} stroke="#00d4ff" strokeWidth="1.5" strokeLinecap="round" />

        {/* Eye */}
        <line x1={eyeLensX} y1={axisY - 18} x2={W - 18} y2={axisY - 6} stroke="#00d4ff" strokeWidth="1.5" strokeLinecap="round" />
        <line x1={eyeLensX} y1={axisY} x2={W - 18} y2={axisY} stroke="#00d4ff" strokeWidth="1.5" strokeLinecap="round" />
        <line x1={eyeLensX} y1={axisY + 18} x2={W - 18} y2={axisY + 6} stroke="#00d4ff" strokeWidth="1.5" strokeLinecap="round" />
        {/* Eye icon */}
        <ellipse cx={W - 12} cy={axisY} rx="8" ry="6" fill="#1d293d" stroke="#00d4ff" strokeWidth="1.2" />
        <circle cx={W - 12} cy={axisY} r="3" fill="#00d4ff" />

        {/* Objective lens (large) */}
        <line x1={objLensX} y1={axisY - 32} x2={objLensX} y2={axisY + 32} stroke={UC} strokeWidth="3" strokeLinecap="round" />
        <text x={objLensX} y={axisY - 36} textAnchor="middle" fill={UC} fontSize={8} fontWeight="bold">Objective</text>
        <text x={objLensX} y={axisY - 27} textAnchor="middle" fill={UC} fontSize={7}>(large, long f)</text>

        {/* Eyepiece lens (small) */}
        <line x1={eyeLensX} y1={axisY - 22} x2={eyeLensX} y2={axisY + 22} stroke="#00d4ff" strokeWidth="2.5" strokeLinecap="round" />
        <text x={eyeLensX} y={axisY - 26} textAnchor="middle" fill="#00d4ff" fontSize={8} fontWeight="bold">Eyepiece</text>
        <text x={eyeLensX} y={axisY - 17} textAnchor="middle" fill="#00d4ff" fontSize={7}>(small, short f)</text>

        {/* Focal point dot */}
        <circle cx={focalX} cy={axisY} r="4" fill="#fdc700" />
        <text x={focalX} y={axisY + 14} textAnchor="middle" fill="#fdc700" fontSize={7}>focal point</text>

        {/* Magnification badge */}
        <rect x="88" y="8" width="84" height="22" rx="6" fill={`${UC}22`} stroke={`${UC}55`} strokeWidth="1" />
        <motion.text key={mag} x="130" y="23" textAnchor="middle" fill={UC} fontSize={11} fontWeight="bold"
          initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.2 }}>
          M = {mag}×
        </motion.text>
      </svg>

      {/* Sliders */}
      <div className="w-full rounded-[12px] px-3 py-2" style={{ background: '#1d293d' }}>
        <div className="flex justify-between text-xs mb-0.5">
          <span style={{ color: '#a8b8cc' }}>Objective focal length</span>
          <span style={{ color: UC }} className="font-bold">{fObj} mm</span>
        </div>
        <input type="range" min="200" max="2000" step="100" value={fObj}
          onChange={e => setFObj(+e.target.value)} className="w-full mb-2" style={{ accentColor: UC }} />
        <div className="flex justify-between text-xs mb-0.5">
          <span style={{ color: '#a8b8cc' }}>Eyepiece focal length</span>
          <span style={{ color: '#00d4ff' }} className="font-bold">{fEye} mm</span>
        </div>
        <input type="range" min="5" max="50" step="5" value={fEye}
          onChange={e => setFEye(+e.target.value)} className="w-full" style={{ accentColor: '#00d4ff' }} />
        <div className="flex justify-between mt-1.5 pt-1.5 text-xs font-bold font-mono"
          style={{ borderTop: '1px solid #0b1121' }}>
          <span style={{ color: '#a8b8cc' }}>M = {fObj} ÷ {fEye} =</span>
          <motion.span key={mag} style={{ color: UC }} initial={{ scale: 0.85 }} animate={{ scale: 1 }}>{mag}×</motion.span>
        </div>
      </div>
    </div>
  )
}

function TelescopeOpticsIdea() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 px-4 py-3">
      <MisconceptionCard
        wrong="Bigger telescopes magnify more — that's the whole point of making them larger."
        right="The KEY advantage of a bigger telescope is collecting MORE LIGHT and achieving BETTER RESOLUTION. Magnification depends on the lens focal lengths chosen, not the telescope size."
        wrongLabel="Common misconception"
        rightLabel="Size = light + resolution"
      />
    </div>
  )
}

function TelescopeOpticsReality() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 px-4 py-3">
      <RealWorldCard icon="🌌" title="James Webb Space Telescope" desc="Infrared space telescope — avoids atmosphere absorbing IR wavelengths. 6.5 m mirror collects 100× more light than Hubble." color={UC} delay={0} />
      <RealWorldCard icon="🔭" title="Hubble Space Telescope" desc="Optical space-based telescope — placed above the atmosphere to avoid blurring. Produced the deepest images of the universe ever taken." color="#00d4ff" delay={0.1} />
      <RealWorldCard icon="📡" title="Jodrell Bank Radio Telescope" desc="76 m dish needed because radio wavelengths are huge — resolution ∝ λ/D, so a very large D is needed to compensate for large λ." color="#f39c12" delay={0.2} />
      <RealWorldCard icon="🛸" title="Chandra X-ray Observatory" desc="X-rays absorbed by Earth's atmosphere, so this space-based telescope detects high-energy events like black hole jets and supernovae remnants." color="#e91e8c" delay={0.3} />
    </div>
  )
}

// ─── HR Diagram & Stellar Types ──────────────────────────────────────────────
const HR_STARS = [
  { id: 'sun', label: 'The Sun', cx: 142, cy: 148, r: 7, color: '#fdc700', temp: '5 800 K', lum: '1 L☉', type: 'G-type yellow dwarf', region: 'Main sequence' },
  { id: 'sirius', label: 'Sirius A', cx: 105, cy: 118, r: 7, color: '#a8c8ff', temp: '9 940 K', lum: '25 L☉', type: 'A-type white star', region: 'Main sequence' },
  { id: 'proxima', label: 'Proxima Cen', cx: 200, cy: 185, r: 5, color: '#ff6b4a', temp: '3 050 K', lum: '0.002 L☉', type: 'M-type red dwarf', region: 'Main sequence' },
  { id: 'betelgeuse', label: 'Betelgeuse', cx: 215, cy: 68, r: 10, color: '#ff3d00', temp: '3 500 K', lum: '~100 000 L☉', type: 'Red supergiant', region: 'Supergiant' },
  { id: 'rigel', label: 'Rigel', cx: 72, cy: 48, r: 9, color: '#c8dfff', temp: '12 000 K', lum: '~120 000 L☉', type: 'Blue supergiant', region: 'Supergiant' },
  { id: 'whitedwarf', label: 'White Dwarf', cx: 96, cy: 198, r: 5, color: '#e8f4ff', temp: '25 000 K', lum: '0.01 L☉', type: 'White dwarf remnant', region: 'White dwarf' },
]

function StellarClassificationLesson() {
  const [selected, setSelected] = useState(null)
  const star = HR_STARS.find(s => s.id === selected)

  return (
    <div className="w-full h-full flex flex-col items-center justify-start gap-1 px-2 py-1" style={{ background: '#0b1121' }}>
      <svg width="260" height="220" viewBox="0 0 260 220" style={{ flexShrink: 0 }}>
        {/* Background gradient: hot (blue-left) to cool (red-right) */}
        <defs>
          <linearGradient id="hrBg" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#1a1a3e" />
            <stop offset="40%" stopColor="#1a1228" />
            <stop offset="100%" stopColor="#2a1010" />
          </linearGradient>
        </defs>
        <rect x="34" y="8" width="214" height="198" rx="4" fill="url(#hrBg)" stroke="#334155" strokeWidth="1" />

        {/* Axis labels */}
        <text x="141" y="215" textAnchor="middle" fill="#a8b8cc" fontSize={8}>Surface Temperature (hot → cool)</text>
        <text x="10" y="110" textAnchor="middle" fill="#a8b8cc" fontSize={8} transform="rotate(-90, 10, 110)">Luminosity (L☉)</text>

        {/* Temperature tick labels */}
        {[
          { x: 52, label: '>25k K' },
          { x: 100, label: '10k K' },
          { x: 148, label: '6k K' },
          { x: 196, label: '4k K' },
          { x: 236, label: '~3k K' },
        ].map(t => (
          <text key={t.x} x={t.x} y="210" textAnchor="middle" fill="#a8b8cc" fontSize={6.5}>{t.label}</text>
        ))}

        {/* Luminosity tick labels */}
        {[
          { y: 20, label: '10⁶' },
          { y: 60, label: '10³' },
          { y: 108, label: '1' },
          { y: 155, label: '10⁻²' },
          { y: 196, label: '10⁻⁴' },
        ].map(t => (
          <text key={t.y} x="32" y={t.y + 3} textAnchor="end" fill="#a8b8cc" fontSize={6.5}>{t.label}</text>
        ))}

        {/* Region shading: Main Sequence band */}
        <path d="M52,42 L88,68 L128,108 L168,145 L215,188 L215,196 L168,160 L128,122 L88,82 L52,55 Z"
          fill={`${UC}22`} stroke={`${UC}55`} strokeWidth="1" />
        <text x="155" y="130" fill={UC} fontSize={7.5} fontWeight="bold" transform="rotate(-30, 155, 130)">Main Sequence</text>

        {/* Region shading: Red Giants */}
        <ellipse cx="210" cy="88" rx="28" ry="28" fill="rgba(255,61,0,0.12)" stroke="rgba(255,61,0,0.35)" strokeWidth="1" />
        <text x="210" y="60" textAnchor="middle" fill="#ff6b4a" fontSize={7}>Red Giants</text>

        {/* Region shading: Supergiants */}
        <rect x="40" y="12" width="220" height="48" rx="4" fill="rgba(200,200,255,0.07)" stroke="rgba(200,200,255,0.2)" strokeWidth="1" />
        <text x="130" y="26" textAnchor="middle" fill="#c8dfff" fontSize={7}>Supergiants</text>

        {/* Region shading: White Dwarfs */}
        <ellipse cx="100" cy="196" rx="34" ry="14" fill="rgba(232,244,255,0.1)" stroke="rgba(232,244,255,0.3)" strokeWidth="1" />
        <text x="100" y="199" textAnchor="middle" fill="#e8f4ff" fontSize={7}>White Dwarfs</text>

        {/* Star dots — clickable */}
        {HR_STARS.map(s => (
          <g key={s.id} onClick={() => setSelected(selected === s.id ? null : s.id)} style={{ cursor: 'pointer' }}>
            {selected === s.id && (
              <circle cx={s.cx} cy={s.cy} r={s.r + 5} fill="none" stroke={s.color} strokeWidth="1.5"
                style={{ filter: `drop-shadow(0 0 4px ${s.color})` }} />
            )}
            <circle cx={s.cx} cy={s.cy} r={s.r} fill={s.color}
              style={{ filter: `drop-shadow(0 0 ${s.r}px ${s.color}80)` }} />
            <text x={s.cx} y={s.cy - s.r - 3} textAnchor="middle" fill={s.color} fontSize={6.5} fontWeight="bold">{s.label}</text>
          </g>
        ))}
      </svg>

      {/* Info panel */}
      {star ? (
        <motion.div
          key={star.id}
          className="w-full rounded-[10px] px-3 py-2"
          style={{ background: `${star.color}18`, border: `1px solid ${star.color}55` }}
          initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-2">
            <div className="rounded-full shrink-0" style={{ width: 10, height: 10, background: star.color, boxShadow: `0 0 6px ${star.color}` }} />
            <span style={{ fontSize: 11, fontWeight: 700, color: star.color }}>{star.label}</span>
            <span style={{ fontSize: 9, color: '#a8b8cc', marginLeft: 'auto' }}>{star.region}</span>
          </div>
          <div className="grid grid-cols-3 gap-1 mt-1">
            {[['Temp', star.temp], ['Lum', star.lum], ['Type', star.type]].map(([k, v]) => (
              <div key={k} className="rounded-[6px] px-1.5 py-1 text-center" style={{ background: '#1d293d' }}>
                <div style={{ fontSize: 7, color: '#a8b8cc' }}>{k}</div>
                <div style={{ fontSize: 8, fontWeight: 700, color: '#cad5e2' }}>{v}</div>
              </div>
            ))}
          </div>
        </motion.div>
      ) : (
        <div className="w-full rounded-[10px] px-3 py-2 text-center" style={{ background: '#1d293d' }}>
          <span style={{ fontSize: 10, color: '#a8b8cc' }}>Tap a star to see its properties</span>
        </div>
      )}
    </div>
  )
}

function StellarClassificationIdea() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 px-4 py-3">
      <MisconceptionCard
        wrong="Red stars are hotter than blue stars — red means hot, like a fire or a hot cooker ring."
        right="In stellar physics, BLUE = hottest (>25 000 K) and RED = coolest (~3 000 K). The 'red = hot' everyday intuition is the exact opposite of how stars work."
        wrongLabel="Everyday intuition — wrong here"
        rightLabel="Blue hottest, red coolest"
      />
    </div>
  )
}

function StellarClassificationReality() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 px-4 py-3">
      <RealWorldCard icon="🔴" title="Betelgeuse — red supergiant" desc="Visible in Orion's shoulder. It will eventually go supernova — possibly within 100 000 years. It's already 700× larger than the Sun and 100 000× more luminous." color="#ff6b4a" delay={0} />
      <RealWorldCard icon="⚡" title="Sirius A — brightest in night sky" desc="A-type white/blue star, 25× more luminous than the Sun, 8.6 light-years away. Hot enough (~10 000 K) to appear blue-white to the naked eye." color="#a8c8ff" delay={0.1} />
      <RealWorldCard icon="🔬" title="HR diagram in practice" desc="Astronomers use a star cluster's HR diagram to estimate the cluster's age — stars peel off the main sequence from top-left as they age and become giants." color={UC} delay={0.2} />
      <RealWorldCard icon="💀" title="White dwarfs — stellar remnants" desc="The eventual fate of Sun-like stars: core of compressed carbon/oxygen, size of Earth, no more fusion, slowly cooling over billions of years." color="#e8f4ff" delay={0.3} />
    </div>
  )
}

// ─── History of Astronomy ─────────────────────────────────────────────────────
const TIMELINE_EVENTS = [
  { year: '~350 BC', label: 'Aristotle/Ptolemy', short: 'Geocentric', desc: 'Earth at the centre of the universe — geocentric model. Ptolemy refined it with epicycles to predict planetary motion. Used for 1500 years.', color: '#f39c12' },
  { year: '1543', label: 'Copernicus', short: 'Heliocentric', desc: 'Published heliocentric model — Sun at the centre. Controversial because it contradicted the Church and ancient authority.', color: UC },
  { year: '1610', label: 'Galileo', short: "Jupiter's moons", desc: "Galileo observed Jupiter's four largest moons orbiting Jupiter — proof that not everything orbits Earth. Also observed phases of Venus.", color: '#00d4ff' },
  { year: '1687', label: 'Newton', short: 'Gravity', desc: "Newton's Law of Universal Gravitation explained WHY planets orbit the Sun — gravity as a universal force acting at a distance.", color: '#00bc7d' },
  { year: '1781', label: 'Herschel', short: 'Uranus', desc: "William Herschel discovered Uranus using a telescope — first planet found in recorded history. Also mapped the Milky Way's structure.", color: '#e91e8c' },
  { year: '1920', label: 'Great Debate', short: 'Island universes?', desc: "Shapley vs Curtis: is the Milky Way the entire universe, or are spiral nebulae separate 'island universes'? Curtis was correct.", color: '#ff6b4a' },
  { year: '1924', label: 'Hubble', short: 'Andromeda distant', desc: 'Hubble measured Cepheid variables in Andromeda — proved it was far outside the Milky Way. Universe is vast beyond imagination.', color: UC },
  { year: '1965', label: 'CMB discovered', short: 'Big Bang evidence', desc: 'Penzias and Wilson accidentally detected the Cosmic Microwave Background — thermal afterglow of the Big Bang. Nobel Prize 1978.', color: '#fdc700' },
  { year: '1998', label: 'Dark energy', short: 'Accelerating expansion', desc: "Supernova observations showed the universe's expansion is ACCELERATING — dark energy discovered. Nobel Prize 2011.", color: '#ef4444' },
  { year: '2021', label: 'James Webb', short: 'JWST launched', desc: 'James Webb Space Telescope launched — can see the first galaxies formed ~300 million years after the Big Bang in infrared.', color: '#00bc7d' },
]

function HistoryAstronomyLesson() {
  const [selected, setSelected] = useState(null)
  const event = TIMELINE_EVENTS.find(e => e.year === selected)

  const W = 260, H = 80
  const padL = 18, padR = 18
  const usableW = W - padL - padR
  const n = TIMELINE_EVENTS.length
  const xPos = i => padL + (i / (n - 1)) * usableW

  return (
    <div className="w-full h-full flex flex-col items-center justify-start gap-2 px-2 py-2" style={{ background: '#0b1121' }}>
      {/* Timeline SVG */}
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
        {/* Timeline axis */}
        <line x1={padL} y1="42" x2={W - padR} y2="42" stroke="#334155" strokeWidth="2" strokeLinecap="round" />

        {/* Events */}
        {TIMELINE_EVENTS.map((ev, i) => {
          const x = xPos(i)
          const above = i % 2 === 0
          const isSelected = selected === ev.year
          return (
            <g key={ev.year} onClick={() => setSelected(selected === ev.year ? null : ev.year)} style={{ cursor: 'pointer' }}>
              {/* Tick stem */}
              <line x1={x} y1={above ? 42 : 42} x2={x} y2={above ? 26 : 58}
                stroke={ev.color} strokeWidth="1.2" />
              {/* Dot */}
              <circle cx={x} cy="42" r={isSelected ? 6 : 4}
                fill={isSelected ? ev.color : `${ev.color}88`}
                stroke={ev.color} strokeWidth={isSelected ? 1.5 : 0}
                style={{ filter: isSelected ? `drop-shadow(0 0 4px ${ev.color})` : 'none', transition: 'r 0.15s' }} />
              {/* Year label */}
              <text x={x} y={above ? 20 : 67} textAnchor="middle"
                fill={isSelected ? ev.color : '#a8b8cc'} fontSize={5.5} fontWeight={isSelected ? 'bold' : 'normal'}>
                {ev.year}
              </text>
            </g>
          )
        })}

        {/* Left/right labels */}
        <text x={padL} y="76" fill="#a8b8cc" fontSize={6}>Ancient</text>
        <text x={W - padR} y="76" textAnchor="end" fill="#a8b8cc" fontSize={6}>Present</text>
      </svg>

      {/* Detail panel */}
      {event ? (
        <motion.div
          key={event.year}
          className="w-full rounded-[10px] px-3 py-2 flex-1"
          style={{ background: `${event.color}14`, border: `1px solid ${event.color}45` }}
          initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-baseline gap-2 mb-1">
            <span style={{ fontSize: 12, fontWeight: 700, color: event.color }}>{event.label}</span>
            <span style={{ fontSize: 9, color: '#a8b8cc' }}>{event.year}</span>
          </div>
          <div style={{ fontSize: 10, color: '#cad5e2', lineHeight: 1.5 }}>{event.desc}</div>
        </motion.div>
      ) : (
        <div className="w-full flex-1 rounded-[10px] px-3 py-2 flex items-center justify-center" style={{ background: '#1d293d' }}>
          <span style={{ fontSize: 10, color: '#a8b8cc' }}>Tap an event on the timeline above</span>
        </div>
      )}

      {/* Quick legend */}
      <div className="flex flex-wrap gap-1 w-full">
        {TIMELINE_EVENTS.map(ev => (
          <button key={ev.year} onClick={() => setSelected(selected === ev.year ? null : ev.year)}
            className="px-2 py-0.5 rounded-full"
            style={{
              background: selected === ev.year ? `${ev.color}30` : '#1d293d',
              border: `1px solid ${selected === ev.year ? ev.color : '#334155'}`,
              color: selected === ev.year ? ev.color : '#a8b8cc',
              fontSize: 7, fontWeight: 600,
            }}>
            {ev.short}
          </button>
        ))}
      </div>
    </div>
  )
}

function HistoryAstronomyIdea() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 px-4 py-3">
      <MisconceptionCard
        wrong="Galileo invented the heliocentric model — he's the one who said the Earth goes round the Sun."
        right="Copernicus proposed heliocentrism in 1543. Galileo provided observational evidence 67 years later — Jupiter's moons and phases of Venus confirmed it. Galileo confirmed it; Copernicus conceived it."
        wrongLabel="Galileo gets the credit wrongly"
        rightLabel="Copernicus first, Galileo proved"
      />
    </div>
  )
}

function HistoryAstronomyReality() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 px-4 py-3">
      <RealWorldCard icon="🌌" title="Hubble Deep Field" desc="In 1995, Hubble pointed at a tiny dark patch of sky for 10 days — it contained over 3 000 galaxies. One image changed our understanding of the universe's scale." color="#00d4ff" delay={0} />
      <RealWorldCard icon="📡" title="CMB — accidental discovery" desc="Penzias and Wilson (1965) detected a persistent hiss in their radio antenna they couldn't explain. It was the thermal afterglow of the Big Bang — 2.7 K radiation from all directions." color="#fdc700" delay={0.1} />
      <RealWorldCard icon="⭐" title="Cepheid variables as rulers" desc="Cepheid stars pulsate with a period directly related to their true luminosity. Compare true vs apparent brightness to find distance — Hubble used this to measure Andromeda." color={UC} delay={0.2} />
      <RealWorldCard icon="🔬" title="Dark energy — biggest mystery" desc="In 1998, supernovae data showed the universe expanding faster over time. Something — 'dark energy' — makes up ~68% of the universe and drives accelerating expansion. We still don't know what it is." color="#ef4444" delay={0.3} />
    </div>
  )
}

// ─── EXPORT ──────────────────────────────────────────────────────────────────
export const UNIVERSE_TOPICS = {
  telescope_optics: {
    id: 'telescope_optics',
    module: 'Studying the Universe',
    moduleColor: UC,
    course: 'physics_only',
    boards: ['ocr-b'],
    title: 'Telescope Optics',
    subtitle: 'Lenses, Magnification & Resolution',
    description: 'A refracting telescope uses two converging lenses: the objective lens (long focal length, large diameter, collects light) and the eyepiece lens (short focal length, magnifies the image). Magnification M = focal length of objective ÷ focal length of eyepiece. The larger objective lens collects more light. Angular magnification makes distant objects appear larger. Resolution is the ability to distinguish two close objects as separate — resolution ∝ λ/D (wavelength divided by aperture diameter). Larger telescopes have better resolution and collect more light. Non-optical telescopes (radio, infrared, X-ray, UV) detect different parts of the EM spectrum. Some wavelengths are absorbed by Earth\'s atmosphere, requiring space telescopes.',
    lessonVisual: TelescopeOpticsLesson,
    ideaVisual: TelescopeOpticsIdea,
    realityVisual: TelescopeOpticsReality,
    question: 'A telescope has an objective focal length of 900 mm and an eyepiece focal length of 30 mm. What is the magnification?',
    questionSubtitle: 'Use M = f_objective ÷ f_eyepiece',
    options: ['15×', '30×', '270×', '870×'],
    correctAnswer: 1,
    keywords: ['objective lens', 'eyepiece lens', 'focal length', 'magnification', 'resolution', 'angular magnification', 'converging lens', 'refracting telescope', 'aperture', 'wavelength'],
    sentenceStarters: [
      'The magnification of a telescope is calculated using M = ...',
      'A larger objective lens is better because it collects more...',
      'Resolution improves when the aperture diameter increases because...',
      'Space telescopes are needed because the atmosphere absorbs...',
      'A radio telescope needs a very large dish because radio wavelengths are...',
    ],
    modelAnswers: [
      'The magnification of a telescope is calculated using **M = f_obj / f_eye = 900 / 30 = 30×**.',
      'A larger objective lens is better because it **collects more light, making faint objects visible, and improves resolution**.',
      'Resolution improves when aperture diameter D increases because **resolution ∝ λ/D — a larger D gives smaller angular resolution limit**.',
      'Space telescopes are needed because **the atmosphere absorbs certain wavelengths (IR, UV, X-ray) so they must be detected from space**.',
      'A radio telescope needs a very large dish because **radio wavelengths are much larger than visible light — resolution ∝ λ/D, so a huge D is needed**.',
    ],
    misconception: 'Bigger telescopes are not primarily about magnification — their key advantage is collecting more light and achieving better resolution.',
    concept: 'M = f_obj / f_eye. Resolution ∝ λ/D. Larger D → more light collected AND better resolution. Space telescopes needed for wavelengths absorbed by the atmosphere.',

    hook: {
      hookFact: 'The James Webb Space Telescope, launched in 2021, has a mirror 6.5 metres wide — giving it 100× more light-collecting area than Hubble. It can see galaxies that formed just 300 million years after the Big Bang — light that has been travelling for 13.5 billion years.',
      hookQuestion: 'A telescope has an objective lens with focal length 900 mm and an eyepiece with focal length 30 mm. What is its magnification? If you swapped the eyepiece for one with focal length 10 mm, what happens to the magnification?',
      hookEmoji: '🔭',
    },

    lessonKeywords: [
      {
        word: 'Objective Lens',
        symbol: 'f_obj',
        unit: 'mm or m',
        definition: 'The large lens at the front of a refracting telescope — long focal length, collects incoming light.',
        everydayNote: 'Bigger objective = more light collected = fainter objects visible.',
      },
      {
        word: 'Eyepiece Lens',
        symbol: 'f_eye',
        unit: 'mm or m',
        definition: 'The small lens you look through — short focal length, magnifies the image formed by the objective.',
        everydayNote: 'Swapping to a shorter-focal-length eyepiece increases magnification.',
      },
      {
        word: 'Focal Length',
        symbol: 'f',
        unit: 'mm or m',
        definition: 'The distance from a converging lens to its focal point where parallel rays are brought to focus.',
        everydayNote: 'A long focal length lens is less curved and bends light less sharply.',
      },
      {
        word: 'Magnification',
        symbol: 'M',
        unit: 'no unit (ratio)',
        definition: 'How many times larger the image appears compared to the naked eye — M = f_obj / f_eye.',
        everydayNote: 'M = 30 means the Moon appears 30× wider through the telescope.',
      },
      {
        word: 'Resolution',
        symbol: '',
        unit: '',
        definition: 'The ability to distinguish two close objects as separate — resolution ∝ λ/D.',
        everydayNote: 'The larger the telescope aperture D, the finer the detail that can be resolved.',
      },
      {
        word: 'Angular Magnification',
        symbol: 'M',
        unit: 'no unit',
        definition: 'The ratio of the angle subtended by the image at the eye to the angle subtended by the object with the naked eye.',
        everydayNote: 'Distant objects subtend tiny angles — angular magnification makes them appear larger.',
      },
      {
        word: 'Converging Lens',
        symbol: '',
        unit: '',
        definition: 'A lens that bends parallel light rays inward to meet at a focal point.',
        everydayNote: 'Both lenses in a refracting telescope are converging lenses.',
      },
      {
        word: 'Refracting Telescope',
        symbol: '',
        unit: '',
        definition: 'A telescope that uses lenses (not mirrors) to collect and focus light.',
        everydayNote: 'The first telescopes built by Galileo were refracting telescopes.',
      },
    ],

    prerequisiteCheck: {
      questions: [
        {
          question: 'A converging lens focuses parallel rays — where do they meet?',
          answers: ['At the focal point', 'At infinity', 'Behind the lens', 'At the centre of the lens'],
          correct: 0,
          feedback: 'A converging lens bends parallel rays inward so they all meet at the focal point — a distance f from the lens. This is where an image of a distant object forms.',
        },
        {
          question: 'What does resolution mean in optics?',
          answers: ['Ability to distinguish two close objects as separate', 'Making objects appear bigger', 'Collecting more light', 'The speed of observation'],
          correct: 0,
          feedback: 'Resolution is about the fineness of detail — can you tell two close stars apart as two separate points, or do they blur into one? Better resolution means finer detail is visible.',
        },
      ],
    },

    topicMapHint: {
      before: ['Converging lenses', 'EM spectrum'],
      current: 'Telescope Optics',
      after: ['HR Diagram & Stellar Types', 'History of Astronomy'],
    },

    workedExample: {
      title: 'Compare magnifications for two different eyepieces',
      equation: 'M = f_obj / f_eye',
      context: 'A telescope has an objective focal length of 1200 mm. Compare eyepieces of 40 mm and 20 mm focal length.',
      steps: [
        {
          step: 1,
          action: 'Write the equation',
          content: 'M = f_obj / f_eye',
          annotation: 'Magnification is always objective focal length divided by eyepiece focal length.',
        },
        {
          step: 2,
          action: 'Calculate for eyepiece A (40 mm)',
          content: 'M_A = 1200 / 40 = 30×',
          annotation: 'Longer eyepiece focal length → lower magnification.',
        },
        {
          step: 3,
          action: 'Calculate for eyepiece B (20 mm)',
          content: 'M_B = 1200 / 20 = 60×',
          annotation: 'Shorter eyepiece focal length → higher magnification.',
        },
        {
          step: 4,
          action: 'State conclusion',
          content: 'Eyepiece B gives 2× higher magnification because halving the eyepiece focal length doubles M.',
          annotation: 'To increase magnification: either increase f_obj or decrease f_eye.',
        },
      ],
      misconceptionAfter: {
        claim: 'A telescope with a larger diameter always magnifies more.',
        reality: 'Diameter determines light-gathering and resolution. Magnification is set by the ratio of focal lengths — you can change magnification just by swapping the eyepiece.',
        visual: 'Same telescope body, two different eyepieces: 40 mm gives M = 30, 20 mm gives M = 60.',
      },
    },

    guidedPractice: {
      tier1: {
        question: 'A telescope has objective focal length 600 mm and eyepiece focal length 30 mm. What is the magnification?',
        allSteps: ['Write: M = f_obj / f_eye', 'Substitute: M = 600 / 30', '??? - calculate M'],
        missingStep: 2,
        missingHint: 'Divide: 600 ÷ 30 = ?',
        answer: 20,
        answerUnit: '×',
      },
      tier2: {
        question: 'A telescope gives magnification 25× using an eyepiece of focal length 20 mm. What is the objective focal length?',
        shownEquation: 'M = f_obj / f_eye  →  f_obj = M × f_eye',
        shownStep1: 'Rearrange: f_obj = 25 × 20',
        hint: 'Multiply 25 by 20',
        answer: 500,
        answerUnit: 'mm',
      },
      tier3: {
        question: 'A radio telescope needs a diameter of 76 m to match the resolution of a 10 m optical telescope. Explain why using resolution ∝ λ/D.',
        hint: 'Radio wavelengths are roughly 10 million times longer than visible light wavelengths.',
        methodHint: 'For equal resolution: λ_radio/D_radio = λ_opt/D_opt. So D_radio = D_opt × (λ_radio/λ_opt). Since λ_radio >> λ_opt, D_radio must be much larger.',
        answer: 0,
        answerUnit: '(explanation question)',
      },
    },

    summary: {
      equation: 'M = f_obj / f_eye     and     resolution ∝ λ/D',
      sentence: 'A refracting telescope uses an objective lens to collect light and an eyepiece to magnify. Magnification equals objective focal length divided by eyepiece focal length. Larger aperture = better resolution and more light.',
      promptText: 'Without looking: write the magnification formula. State TWO advantages of a large telescope diameter. Explain why some telescopes must be in space.',
    },

    sessionRecap: [
      'Magnification M = f_objective / f_eyepiece. A shorter eyepiece focal length gives higher magnification.',
      'Resolution ∝ λ/D — larger aperture diameter D gives finer resolution. Bigger telescopes also collect more light, making faint objects visible.',
      'Different parts of the EM spectrum require different types of telescope. Some wavelengths (IR, UV, X-ray) are absorbed by the atmosphere — these telescopes must be in space.',
    ],
  },

  stellar_classification: {
    id: 'stellar_classification',
    module: 'Studying the Universe',
    moduleColor: UC,
    course: 'physics_only',
    boards: ['ocr-b'],
    title: 'HR Diagram & Stellar Types',
    subtitle: 'Temperature, Luminosity & Stellar Evolution',
    description: 'The Hertzsprung-Russell (HR) diagram plots stellar luminosity (y-axis, in solar luminosities) against surface temperature (x-axis, decreasing from left to right). The main sequence is a diagonal band where stars spend most of their lives fusing hydrogen. Hot blue main-sequence stars sit top-left; cool red main-sequence stars sit bottom-right. Red giants have high luminosity but low temperature (top-right). White dwarfs have low luminosity but high temperature (bottom-left). Supergiants sit at the top. Star colour indicates temperature: blue (hottest, >25 000 K), white, yellow, orange, red (coolest, ~3 000 K). Stellar evolution for low-mass stars: main sequence → red giant → white dwarf. For high-mass stars: main sequence → supergiant → supernova → neutron star or black hole.',
    lessonVisual: StellarClassificationLesson,
    ideaVisual: StellarClassificationIdea,
    realityVisual: StellarClassificationReality,
    question: 'A star has a surface temperature of 4 000 K and luminosity 1 000 times greater than the Sun. Where is it on the HR diagram?',
    questionSubtitle: 'Think about temperature (left–right) and luminosity (up–down)',
    options: ['Top-left — blue supergiant', 'Bottom-right — red dwarf', 'Top-right — red giant', 'Bottom-left — white dwarf'],
    correctAnswer: 2,
    keywords: ['luminosity', 'main sequence', 'red giant', 'white dwarf', 'supergiant', 'surface temperature', 'Hertzsprung-Russell diagram', 'stellar evolution', 'nuclear fusion', 'stellar classification'],
    sentenceStarters: [
      'On the HR diagram, temperature increases from right to left, so...',
      'The main sequence is where stars spend most of their lives because...',
      'A red giant has high luminosity but low temperature because...',
      'Blue stars are hotter than red stars — they have a surface temperature of...',
      'After the main sequence, a Sun-like star will become a...',
    ],
    modelAnswers: [
      'On the HR diagram, temperature increases from right to left, so **blue stars (>25 000 K) are on the left and red stars (~3 000 K) are on the right**.',
      'The main sequence is where stars spend most of their lives because **they are steadily fusing hydrogen into helium in their cores — a stable phase lasting billions of years**.',
      'A red giant has high luminosity but low temperature because **it has expanded enormously — the larger surface area radiates much more total power despite being cooler per unit area**.',
      'Blue stars are hotter than red stars — they have a surface temperature of **over 25 000 K compared to ~3 000 K for red dwarf stars**.',
      'After the main sequence, a Sun-like star will become a **red giant, then shed its outer layers to leave a white dwarf remnant**.',
    ],
    misconception: 'Red stars are not hotter than blue stars — in stellar physics, blue means hottest and red means coolest, the opposite of everyday experience.',
    concept: 'HR diagram: x-axis = temperature (hot left, cool right); y-axis = luminosity. Main sequence diagonal band. Top-right = giants/supergiants. Bottom-left = white dwarfs. Blue = hottest. Red = coolest.',

    hook: {
      hookFact: 'In 1910, Ejnar Hertzsprung and Henry Russell independently noticed that most stars fall on a diagonal band when you plot their brightness against their colour and temperature. This single diagram reveals where a star is in its entire life cycle — a cosmic timeline hidden in starlight.',
      hookQuestion: 'A star has a surface temperature of 4 000 K and is 1 000 times more luminous than the Sun. Is it a main sequence star, red giant, or white dwarf? How do you know — which region of the HR diagram does it fall in?',
      hookEmoji: '⭐',
    },

    lessonKeywords: [
      {
        word: 'Luminosity',
        symbol: 'L',
        unit: 'L☉ (solar luminosities) or W',
        definition: 'The total power output of a star — how much energy it radiates per second in all directions.',
        everydayNote: 'Luminosity is the true power of a star, not how bright it looks from Earth.',
      },
      {
        word: 'Main Sequence',
        symbol: '',
        unit: '',
        definition: 'The diagonal band on the HR diagram where stars spend most of their lives, fusing hydrogen into helium.',
        everydayNote: 'Our Sun has been on the main sequence for ~4.6 billion years and has about 5 billion years left.',
      },
      {
        word: 'Red Giant',
        symbol: '',
        unit: '',
        definition: 'A star that has left the main sequence — it has expanded to be very large, cool, and luminous.',
        everydayNote: 'When the Sun becomes a red giant in ~5 billion years, it will engulf the Earth.',
      },
      {
        word: 'White Dwarf',
        symbol: '',
        unit: '',
        definition: 'The hot, dense core left after a low-mass star sheds its outer layers — no more fusion occurs.',
        everydayNote: 'A white dwarf is about the size of Earth but with a mass similar to the Sun.',
      },
      {
        word: 'Supergiant',
        symbol: '',
        unit: '',
        definition: 'The most massive, most luminous stars — they sit at the very top of the HR diagram.',
        everydayNote: 'Supergiants like Betelgeuse are so large that the entire Solar System would fit inside them.',
      },
      {
        word: 'Surface Temperature',
        symbol: 'T',
        unit: 'K (Kelvin)',
        definition: 'The temperature of the outer layer of a star — determines its colour (blue hot, red cool).',
        everydayNote: 'Blue stars exceed 25 000 K. The Sun is 5 800 K. Red dwarfs are around 3 000 K.',
      },
      {
        word: 'Hertzsprung-Russell Diagram',
        symbol: '',
        unit: '',
        definition: 'A scatter plot of stellar luminosity vs surface temperature used to classify stars and understand stellar evolution.',
        everydayNote: 'The HR diagram is one of the most important tools in all of astrophysics.',
      },
      {
        word: 'Stellar Evolution',
        symbol: '',
        unit: '',
        definition: 'The life cycle of a star, from nebula through main sequence to eventual death as a white dwarf, neutron star, or black hole.',
        everydayNote: 'A star\'s mass at birth determines its entire life story and eventual fate.',
      },
    ],

    prerequisiteCheck: {
      questions: [
        {
          question: 'Which colour star is the hottest?',
          answers: ['Blue', 'Red', 'Yellow', 'Orange'],
          correct: 0,
          feedback: 'Blue stars are the hottest, with surface temperatures above 25 000 K. Red stars are the coolest at around 3 000 K. This is the opposite of the everyday "red = hot" intuition.',
        },
        {
          question: 'What does luminosity measure?',
          answers: ['Total power output of a star', 'Apparent brightness seen from Earth', 'Surface temperature', 'Colour of a star'],
          correct: 0,
          feedback: 'Luminosity is the intrinsic total power output — how much energy the star radiates per second in all directions. A star can be highly luminous but appear dim if it is very far away.',
        },
      ],
    },

    topicMapHint: {
      before: ['EM spectrum', 'Nuclear fusion in stars'],
      current: 'HR Diagram & Stellar Types',
      after: ['History of Astronomy', 'Cepheid variables & distance'],
    },

    workedExample: {
      title: 'Classify a star using its HR diagram position',
      equation: 'Colour: blue > white > yellow > orange > red (hottest → coolest)',
      context: 'A star has surface temperature 30 000 K and luminosity 10⁵ solar luminosities. Classify it.',
      steps: [
        {
          step: 1,
          action: 'Locate temperature on x-axis',
          content: '30 000 K is far left — this is a very hot, blue star.',
          annotation: 'Remember: temperature axis runs hot (left) to cool (right) on the HR diagram.',
        },
        {
          step: 2,
          action: 'Locate luminosity on y-axis',
          content: '10⁵ solar luminosities is near the top of the diagram.',
          annotation: 'The Sun has luminosity 1 L☉ — this star is 100 000 times more luminous.',
        },
        {
          step: 3,
          action: 'Identify the HR diagram region',
          content: 'Top-left position: high temperature AND high luminosity.',
          annotation: 'The top of the diagram contains supergiants and very massive main sequence stars.',
        },
        {
          step: 4,
          action: 'State classification',
          content: 'Classification: blue supergiant (or upper O/B-type main sequence star).',
          annotation: 'These stars are extremely rare and short-lived — they burn through fuel in millions (not billions) of years.',
        },
      ],
      misconceptionAfter: {
        claim: 'A star with 10⁵ times the Sun\'s luminosity must be on the main sequence — all stars are on the main sequence.',
        reality: 'Only about 90% of stars are on the main sequence. High luminosity at extreme temperatures places this star in the supergiant region — it is far from a typical main sequence star.',
        visual: 'On the HR diagram, supergiants sit far above the main sequence band — very high luminosity for a given temperature.',
      },
    },

    guidedPractice: {
      tier1: {
        question: 'Classify the Sun (5 800 K, 1 L☉). Which region of the HR diagram does it occupy?',
        allSteps: ['Temperature 5 800 K → mid-range, yellow star', 'Luminosity 1 L☉ → middle of y-axis', '??? - identify the HR diagram region'],
        missingStep: 2,
        missingHint: 'Middle temperature, middle luminosity → which region?',
        answer: 0,
        answerUnit: 'Main sequence G-type yellow dwarf',
      },
      tier2: {
        question: 'A star has temperature 3 500 K and luminosity 100 L☉. Classify it.',
        shownEquation: 'Low temperature → right side of HR. High luminosity → top of HR.',
        shownStep1: 'Plot position: right (cool, red) AND high on y-axis (luminous)',
        hint: 'Which region is top-right of the HR diagram?',
        answer: 0,
        answerUnit: 'Red giant',
      },
      tier3: {
        question: 'Describe the complete evolutionary path of a star with the mass of the Sun, giving HR diagram positions at each stage.',
        hint: 'Start at nebula → main sequence → what happens when hydrogen runs out?',
        methodHint: 'Main sequence (centre-left diagonal) → red giant (top-right) → white dwarf (bottom-left). Explain what causes each transition.',
        answer: 0,
        answerUnit: '(explanation question)',
      },
    },

    summary: {
      equation: 'Main sequence: L ∝ T⁴ (roughly).   Blue = hot = top-left.   Red = cool = bottom-right.',
      sentence: 'The HR diagram plots luminosity against temperature. Most stars sit on the main sequence diagonal. Red giants are top-right; white dwarfs are bottom-left; supergiants are at the top.',
      promptText: 'Without looking: sketch the HR diagram and label the main sequence, red giant region, white dwarf region, and supergiant region. State the colour of the hottest stars.',
    },

    sessionRecap: [
      'The HR diagram plots luminosity (y-axis) against surface temperature (x-axis, decreasing left to right). Blue = hottest; red = coolest — opposite to everyday intuition.',
      'The main sequence is a diagonal band where stars fuse hydrogen. Our Sun is a G-type yellow dwarf on the main sequence. About 90% of all stars are main sequence stars.',
      'Stellar evolution: Sun-like stars → red giant → white dwarf. Massive stars → supergiant → supernova → neutron star or black hole. A star\'s mass determines its fate.',
    ],
  },

  history_astronomy: {
    id: 'history_astronomy',
    module: 'Studying the Universe',
    moduleColor: UC,
    course: 'physics_only',
    boards: ['ocr-b'],
    title: 'History of Astronomy',
    subtitle: 'From Geocentrism to the Expanding Universe',
    description: 'Historical models: geocentric model (Earth at centre, Ptolemy) was replaced by the heliocentric model (Sun at centre, Copernicus, 1543), confirmed by Galileo\'s observations of Jupiter\'s moons (1610) and phases of Venus. The Great Debate (1920): Harlow Shapley vs Heber Curtis — Curtis was correct that spiral nebulae are separate galaxies. Edwin Hubble measured Cepheid variables in Andromeda to prove it lies far outside the Milky Way. Cepheid variables pulsate with a period proportional to their luminosity — used as "standard candles" to measure cosmic distances. Hubble\'s Law: recession velocity ∝ distance (v = H₀d), showing the universe is expanding. Evidence for the Big Bang: redshift of galaxies and the cosmic microwave background (CMB). Dark matter: evidence from galactic rotation curves. Dark energy: drives accelerating expansion of the universe.',
    lessonVisual: HistoryAstronomyLesson,
    ideaVisual: HistoryAstronomyIdea,
    realityVisual: HistoryAstronomyReality,
    question: 'Who first provided observational evidence that the Earth moves around the Sun, by observing Jupiter\'s moons?',
    questionSubtitle: 'Distinguish between proposing a model and providing evidence for it',
    options: ['Isaac Newton', 'Nicolaus Copernicus', 'Galileo Galilei', 'Edwin Hubble'],
    correctAnswer: 2,
    keywords: ['geocentric', 'heliocentric', 'Cepheid variable', "Hubble's Law", 'redshift', 'dark matter', 'dark energy', 'cosmic microwave background', 'standard candle', 'Big Bang'],
    sentenceStarters: [
      'The geocentric model was replaced by the heliocentric model because...',
      'Hubble\'s Law states that recession velocity is proportional to distance, which means...',
      'Cepheid variables are used as standard candles because...',
      'The cosmic microwave background (CMB) is evidence for the Big Bang because...',
      'Evidence for dark matter comes from galactic rotation curves, which show...',
    ],
    modelAnswers: [
      'The geocentric model was replaced by the heliocentric model because **Galileo\'s observations of Jupiter\'s moons proved that not everything orbits Earth, and Copernicus\'s model made more accurate predictions**.',
      'Hubble\'s Law states that recession velocity is proportional to distance, which means **more distant galaxies move away faster — evidence that the universe is expanding**.',
      'Cepheid variables are used as standard candles because **their period of pulsation is directly linked to their true luminosity — compare true luminosity to apparent brightness to find distance**.',
      'The CMB is evidence for the Big Bang because **it is thermal radiation from ~380 000 years after the Big Bang, predicted by the theory and detected uniformly from all directions**.',
      'Evidence for dark matter comes from galactic rotation curves, which show **stars near the edges of galaxies orbit faster than expected — there must be additional invisible mass holding them in orbit**.',
    ],
    misconception: 'Galileo did not invent the heliocentric model — Copernicus proposed it in 1543. Galileo provided the observational evidence 67 years later.',
    concept: 'v = H₀ × d (Hubble\'s Law). Geocentric → heliocentric (Copernicus 1543, Galileo evidence 1610). Cepheid variables measure distance. CMB and redshift both support Big Bang.',

    hook: {
      hookFact: 'For 1 500 years, everyone believed Ptolemy\'s geocentric model — Earth at the centre — because it predicted planetary motions accurately enough to convince everyone. It took Copernicus, Galileo, and eventually Newton to overturn it. Today we know the Milky Way alone contains 200–400 billion stars, and the observable universe contains over 2 trillion galaxies.',
      hookQuestion: 'If you see a galaxy whose light has been redshifted so that wavelengths are 10% longer than normal, what can you calculate about it? How did Hubble use this information — combined with distance measurements — to discover that the universe is expanding?',
      hookEmoji: '🌌',
    },

    lessonKeywords: [
      {
        word: 'Geocentric',
        symbol: '',
        unit: '',
        definition: 'The model in which Earth is at the centre of the universe and all other bodies orbit it.',
        everydayNote: 'Ptolemy\'s geocentric model worked well enough to be accepted for 1 500 years.',
      },
      {
        word: 'Heliocentric',
        symbol: '',
        unit: '',
        definition: 'The model in which the Sun is at the centre of the solar system and the planets orbit it.',
        everydayNote: 'Copernicus proposed heliocentrism in 1543 — Galileo confirmed it with observations in 1610.',
      },
      {
        word: 'Cepheid Variable',
        symbol: '',
        unit: '',
        definition: 'A type of pulsating star whose period of brightness variation is directly related to its true luminosity — used as a standard candle to measure distance.',
        everydayNote: 'Hubble used Cepheids in Andromeda to show it was far outside our galaxy.',
      },
      {
        word: "Hubble's Law",
        symbol: 'v = H₀d',
        unit: 'v in km/s, d in Mpc',
        definition: 'Recession velocity of a galaxy is proportional to its distance — evidence the universe is expanding.',
        everydayNote: 'H₀ ≈ 70 km/s/Mpc — for every extra megaparsec of distance, galaxies recede 70 km/s faster.',
      },
      {
        word: 'Redshift',
        symbol: 'z',
        unit: 'no unit (ratio)',
        definition: 'The stretching of light wavelengths from a source moving away — light shifts toward the red end of the spectrum.',
        everydayNote: 'All distant galaxies show redshift — evidence the universe is expanding.',
      },
      {
        word: 'Dark Matter',
        symbol: '',
        unit: '',
        definition: 'Invisible matter that does not emit or absorb light — detected only through its gravitational effects on visible matter.',
        everydayNote: 'Galactic rotation curves show stars orbit too fast at the edge — dark matter provides the extra gravitational pull.',
      },
      {
        word: 'Dark Energy',
        symbol: '',
        unit: '',
        definition: 'A mysterious form of energy that causes the universe\'s expansion to accelerate — makes up about 68% of the total energy content of the universe.',
        everydayNote: 'Discovered in 1998 using supernova observations — the universe is not just expanding but speeding up.',
      },
      {
        word: 'Cosmic Microwave Background',
        symbol: 'CMB',
        unit: '',
        definition: 'Thermal radiation left over from ~380 000 years after the Big Bang — detected uniformly from all directions at about 2.7 K.',
        everydayNote: 'Discovered accidentally by Penzias and Wilson in 1965 — a persistent hiss they thought was noise.',
      },
      {
        word: 'Redshift formula',
        symbol: 'Δλ/λ ≈ v/c',
        unit: 'no unit (ratio)',
        definition: 'Δλ/λ ≈ v/c — the fractional change in wavelength equals the recession speed divided by the speed of light. Valid for v << c.',
        everydayNote: 'Rearranged: v = c × (Δλ/λ). If a hydrogen line shifts from 656 nm to 689 nm, Δλ = 33 nm.',
      },
      {
        word: 'Recession speed',
        symbol: 'v',
        unit: 'm/s or km/s',
        definition: 'The speed at which a galaxy moves away from us, calculated from its redshift: v = c × (Δλ/λ)',
        everydayNote: 'Most galaxies recede at millions of km/s. The further away, the faster they recede (Hubble\'s Law).',
      },
      {
        word: 'Inverse square law (brightness)',
        symbol: 'I ∝ 1/d²',
        unit: 'W/m²',
        definition: 'The apparent brightness of a star decreases with the square of distance: intensity ∝ 1/d². Doubling distance reduces brightness by factor 4.',
        everydayNote: 'This is why Cepheid variables work as standard candles: known luminosity L + measured brightness I → distance d = √(L/4πI).',
      },
    ],

    prerequisiteCheck: {
      questions: [
        {
          question: 'What does redshift tell us about a galaxy?',
          answers: ['It is moving away from us', 'It is moving towards us', 'It is hotter than normal', 'It is cooler than normal'],
          correct: 0,
          feedback: 'Redshift means the wavelength of light has been stretched — like the Doppler effect for sound. Longer wavelength = galaxy moving away. All distant galaxies show redshift, showing the universe is expanding.',
        },
        {
          question: 'Who first proposed that the Sun was at the centre of the solar system?',
          answers: ['Copernicus', 'Galileo', 'Newton', 'Hubble'],
          correct: 0,
          feedback: 'Copernicus published his heliocentric model in 1543. Galileo provided observational evidence in 1610. Newton explained WHY it works (gravity) in 1687. Hubble discovered the universe is expanding in the 1920s.',
        },
      ],
    },

    topicMapHint: {
      before: ['EM spectrum', 'The Universe & Space Physics'],
      current: 'History of Astronomy',
      after: ['Cosmology & Big Bang', 'Evidence for dark matter'],
    },

    workedExample: {
      title: "Use Hubble's Law to find the distance to a galaxy",
      equation: 'v = H₀ × d     →     d = v / H₀     (H₀ ≈ 70 km/s/Mpc)',
      context: 'A galaxy has a recession velocity of 4 900 km/s. Find its distance in Mpc.',
      steps: [
        {
          step: 1,
          action: 'Write the equation and rearrange',
          content: 'v = H₀ × d   →   d = v / H₀',
          annotation: 'We want distance d, so rearrange by dividing both sides by H₀.',
        },
        {
          step: 2,
          action: 'Substitute values',
          content: 'd = 4 900 / 70',
          annotation: 'v = 4 900 km/s, H₀ = 70 km/s/Mpc.',
        },
        {
          step: 3,
          action: 'Calculate',
          content: 'd = 70 Mpc',
          annotation: 'Sense check: 4 900 / 70 = 70. Units: (km/s) / (km/s/Mpc) = Mpc. ✓',
        },
        {
          step: 4,
          action: 'Convert to appreciate the scale',
          content: '1 Mpc = 3.09 × 10²² m ≈ 3.26 million light-years. This galaxy is 228 million light-years away.',
          annotation: 'Astronomical distances are so large that even our fastest spacecraft would take billions of years to reach it.',
        },
      ],
      misconceptionAfter: {
        claim: "Hubble's Law gives exact distances to galaxies.",
        reality: 'H₀ is known to about ±2 km/s/Mpc uncertainty, and the value is still debated (the "Hubble tension"). Distances calculated this way have ~5% uncertainty at minimum, increasing for peculiar velocities at short ranges.',
        visual: 'For nearby galaxies, local gravity can cause blueshift — Hubble\'s Law only works reliably for distant galaxies where recession dominates.',
      },
    },

    guidedPractice: {
      tier1: {
        question: 'A galaxy has a recession velocity of 2 800 km/s. Use H₀ = 70 km/s/Mpc to find its distance.',
        allSteps: ['Write: d = v / H₀', 'Substitute: d = 2 800 / 70', '??? - calculate distance in Mpc'],
        missingStep: 2,
        missingHint: 'Divide: 2 800 ÷ 70 = ?',
        answer: 40,
        answerUnit: 'Mpc',
      },
      tier2: {
        question: 'Describe how Hubble used Cepheid variables to prove that Andromeda is outside the Milky Way.',
        shownEquation: 'Period of Cepheid → true luminosity (known). Apparent brightness (measured) → distance by inverse square law.',
        shownStep1: 'Measure the period of pulsation of a Cepheid star in Andromeda.',
        hint: 'Use the period-luminosity relationship to find the true luminosity, then compare to apparent brightness.',
        answer: 0,
        answerUnit: '(explanation question)',
      },
      tier3: {
        question: 'Explain two pieces of evidence for the Big Bang and why neither alone is conclusive.',
        hint: 'Consider: redshift of galaxies AND the cosmic microwave background (CMB). What does each show? What could each be explained by separately?',
        methodHint: 'Redshift → universe expanding (but could have another cause). CMB → thermal afterglow (but could be another source). Together they strongly support the Big Bang.',
        answer: 0,
        answerUnit: '(extended answer)',
      },
    },

    summary: {
      equation: 'v = H₀ × d     (Hubble\'s Law — recession speed proportional to distance)',
      sentence: 'The geocentric model was replaced by heliocentrism (Copernicus 1543, Galileo evidence 1610). Hubble proved the universe is expanding using Cepheid variables and redshift. The CMB is thermal afterglow of the Big Bang.',
      promptText: 'Without looking: state Hubble\'s Law as an equation. Name two pieces of evidence for the Big Bang. Explain the difference between what Copernicus did and what Galileo did.',
    },

    sessionRecap: [
      'Geocentric (Ptolemy) → heliocentric (Copernicus 1543). Galileo confirmed it with Jupiter\'s moons (1610). Newton explained WHY (gravity, 1687). Hubble proved universe is vast and expanding (1924–1929).',
      "Hubble's Law: v = H₀ × d (H₀ ≈ 70 km/s/Mpc). All distant galaxies show redshift — the universe is expanding. More distant galaxies recede faster.",
      'Evidence for the Big Bang: (1) redshift of all distant galaxies, (2) cosmic microwave background radiation at 2.7 K. Dark matter explains fast galactic rotation curves. Dark energy explains the accelerating expansion observed since 1998.',
      'Redshift formula: Δλ/λ ≈ v/c. Find Δλ = observed λ − rest λ, then v = c × (Δλ/λ). Example: hydrogen at 656 nm observed at 689 nm → Δλ = 33 nm → v = 3×10⁸ × (33/656) ≈ 1.51×10⁷ m/s.',
      'Inverse square law for stellar brightness: I ∝ 1/d². Tripling distance → brightness drops by factor 9. Cepheid standard candles: known luminosity L, measured intensity I → d = √(L / 4πI).',
      'Doppler connection: redshift is the light version of the Doppler effect. Receding source → wavelengths stretched → redshift. Approaching source → wavelengths compressed → blueshift. Andromeda shows blueshift — it is moving toward us and will collide with the Milky Way in ~4.5 billion years.',
    ],

    conceptSteps: [
      {
        type: 'concept',
        title: 'Redshift formula and recession speed',
        content: 'When a galaxy recedes, its light is redshifted. The fractional wavelength change: Δλ/λ ≈ v/c, where Δλ = observed λ − rest λ, v = recession speed, c = 3×10⁸ m/s.\n\nExample: A galaxy emits hydrogen light at λ₀ = 656 nm. Observed at 689 nm. Δλ = 33 nm.\nv = c × (Δλ/λ) = 3×10⁸ × (33/656) = 1.51×10⁷ m/s ≈ 15,100 km/s',
      },
      {
        type: 'concept',
        title: 'Inverse square law for stellar brightness',
        content: 'A star\'s apparent brightness depends on distance. If intensity at distance d₁ is I₁, then at distance d₂: I₂/I₁ = d₁²/d₂².\n\nExample: Star A is twice as far as star B but has the same luminosity. Star A appears 4× dimmer.\n\nThis is why Cepheid variables work as standard candles: we know their true luminosity (from period), so we can calculate d from measured apparent brightness using: d = √(L/4πI)',
      },
      {
        type: 'concept',
        title: 'Doppler effect — the connection between sound and light',
        content: 'Redshift is the light version of the Doppler effect you studied in waves. For sound: a moving source compresses wavefronts ahead (higher pitch) and stretches them behind (lower pitch). For light: a receding galaxy stretches wavefronts → longer wavelength → redshift. An approaching galaxy: blueshift. This is why Andromeda (approaching us) shows BLUESHIFT.',
      },
    ],
  },
}
