# Full Implementation Prompt: NeuroPhysics Practicals Upgrade

> Paste this entire prompt into Claude Code. It contains everything needed.

---

## Context

Read `CLAUDE.md` and `memory.md` first. This is the NeuroPhysics GCSE Physics PWA. We're upgrading the **PracticalScreen.jsx** to add an 8th "Explore" tab containing curated external simulation links for each Required Practical, plus building enhanced in-app interactive simulations that let students **collect data, plot graphs, and run virtual experiments** — going beyond the current setup diagrams which only show apparatus with basic sliders.

**CRITICAL RULES:**
- Do NOT delete any existing code, diagrams, tabs, or content
- Do NOT add new npm dependencies without asking
- All files are .jsx/.js — NOT TypeScript
- Use CSS custom properties for colours — never hardcode hex
- Prefer small targeted edits over full file rewrites
- Run `npm run build` after changes to catch errors

---

## Part 1: Add "Explore" Tab with External Simulation Links

### What to do

Add an 8th tab called "Explore" (icon: `ExternalLink` from lucide-react) to the existing TABS array in `src/screens/PracticalScreen.jsx`. This tab shows curated, free external simulations for each RP.

### Step 1: Import ExternalLink icon

In the existing lucide-react import at line ~5, add `ExternalLink` to the import list.

### Step 2: Add tab to TABS array

After the existing 7 tabs (around line 14-22), add:
```js
{ id: 'explore', label: 'Explore', icon: ExternalLink },
```

### Step 3: Create the EXTERNAL_SIMS data map

Add this constant AFTER the `DIAGRAMS` object (around line 1114) and BEFORE the tab panel functions:

```js
const EXTERNAL_SIMS = {
  shc: [
    {
      name: 'PhET: Energy Forms and Changes',
      url: 'https://phet.colorado.edu/en/simulations/energy-forms-and-changes',
      desc: 'Watch energy transfer between objects — see how heating a metal block changes its thermal energy store.',
      free: true,
    },
  ],
  insulation: [
    {
      name: 'PhET: Energy Forms and Changes',
      url: 'https://phet.colorado.edu/en/simulations/energy-forms-and-changes',
      desc: 'Explore how insulating materials slow energy transfer from hot to cold objects.',
      free: true,
    },
  ],
  resistance: [
    {
      name: 'PhET: Resistance in a Wire',
      url: 'https://phet.colorado.edu/en/simulations/resistance-in-a-wire',
      desc: 'Change the length, area and resistivity of a wire — watch resistance update live. Perfect for RP3.',
      free: true,
    },
    {
      name: 'Electricity Explained: Circuit Simulation',
      url: 'https://www.electricityexplained.com/simple-circuit-simulation',
      desc: 'Visual circuit sim showing charge flow, current and voltage. See what happens when you change resistance.',
      free: true,
    },
    {
      name: 'WithDiode: 3D Circuit Builder',
      url: 'https://www.withdiode.com/',
      desc: 'Build your own circuit in 3D — add resistors, measure voltage and current. Free browser tool.',
      free: true,
    },
  ],
  iv_characteristics: [
    {
      name: 'PhET: Circuit Construction Kit DC',
      url: 'https://phet.colorado.edu/en/simulations/circuit-construction-kit-dc',
      desc: 'Build circuits with resistors, bulbs and switches. Measure I-V characteristics with virtual meters.',
      free: true,
    },
    {
      name: 'Electricity Explained: Voltage, Current & Resistance',
      url: 'https://www.electricityexplained.com/voltage-current-resistance',
      desc: '18 interactive lessons on electricity. Visual model of charge flow matches neurodivergent-friendly learning.',
      free: true,
    },
    {
      name: 'WithDiode: 3D Circuit Builder',
      url: 'https://www.withdiode.com/',
      desc: 'Drag-and-drop resistors, LEDs and diodes in 3D. See current flow and measure I-V characteristics.',
      free: true,
    },
  ],
  density: [
    {
      name: 'PhET: Density',
      url: 'https://phet.colorado.edu/en/simulations/density',
      desc: 'Compare densities of different objects — see which float or sink. Measure mass and volume interactively.',
      free: true,
    },
  ],
  latent_heat: [
    {
      name: 'PhET: States of Matter',
      url: 'https://phet.colorado.edu/en/simulations/states-of-matter',
      desc: 'Watch particles change state as you add energy. See why temperature stays constant during melting.',
      free: true,
    },
  ],
  spring: [
    {
      name: 'PhET: Hooke\'s Law',
      url: 'https://phet.colorado.edu/en/simulations/hookes-law',
      desc: 'Apply forces to springs — see extension change in real time. Explore the linear region and spring constant.',
      free: true,
    },
    {
      name: 'Physlets: Spring Simulation',
      url: 'https://physlets.org/pp/start.html',
      desc: '800+ HTML5 physics simulations including springs, forces and Hooke\'s Law explorations.',
      free: true,
    },
  ],
  acceleration: [
    {
      name: 'PhET: Forces and Motion: Basics',
      url: 'https://phet.colorado.edu/en/simulations/forces-and-motion-basics',
      desc: 'Push objects with different forces — see acceleration change. Explore F=ma with friction controls.',
      free: true,
    },
  ],
  waves: [
    {
      name: 'PhET: Wave on a String',
      url: 'https://phet.colorado.edu/en/simulations/wave-on-a-string',
      desc: 'Generate transverse waves — change frequency, amplitude and damping. Measure wavelength and speed.',
      free: true,
    },
    {
      name: 'IOP Spark: Water Wave Simulation',
      url: 'https://spark.iop.org/home-experiments-and-simulations-support-remote-teaching-light-sound-and-waves',
      desc: 'IOP collection of wave simulations and home experiments for light, sound and water waves.',
      free: true,
    },
  ],
  light: [
    {
      name: 'PhET: Bending Light',
      url: 'https://phet.colorado.edu/en/simulations/bending-light',
      desc: 'Shine light through glass blocks — see refraction in real time. Measure angles and calculate refractive index.',
      free: true,
    },
    {
      name: 'Teach Physics: Law of Reflection Simulation',
      url: 'https://www.teachphysics.org/home/gcse-light-sow',
      desc: 'Interactive reflection and refraction simulations with teaching notes from Simon Poliakoff.',
      free: true,
    },
  ],
  radiation: [
    {
      name: 'PhET: Blackbody Spectrum',
      url: 'https://phet.colorado.edu/en/simulations/blackbody-spectrum',
      desc: 'See how surface temperature affects infrared radiation emission. Compare black body curves.',
      free: true,
    },
  ],
}
```

### Step 4: Create the TabExplore component

Add this component AFTER TabAnalysis and BEFORE the main PracticalScreen component:

```jsx
function TabExplore({ p, color }) {
  const sims = EXTERNAL_SIMS[p.id] || []

  if (sims.length === 0) {
    return (
      <div className="rounded-[16px] p-6 text-center"
        style={{ background: 'rgba(18,26,47,0.9)', border: '0.75px solid #1d293d' }}>
        <ExternalLink size={24} color="#475569" style={{ margin: '0 auto 8px' }}/>
        <p className="text-sm" style={{ color: '#64748b' }}>
          External simulations coming soon for this practical.
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 px-1">
        <ExternalLink size={14} color={color}/>
        <span className="text-xs font-semibold uppercase tracking-wide" style={{ color }}>
          Try these free simulations
        </span>
      </div>

      {sims.map((sim, i) => (
        <motion.a
          key={i}
          href={sim.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block rounded-[14px] p-4 no-underline"
          style={{
            background: 'rgba(18,26,47,0.9)',
            border: '0.75px solid #1d293d',
            textDecoration: 'none',
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
            <ExternalLink size={14} color="#475569" className="shrink-0 mt-0.5"/>
          </div>
          <p className="text-xs leading-relaxed" style={{ color: '#94a3b8' }}>
            {sim.desc}
          </p>
          {sim.free && (
            <div className="inline-flex items-center gap-1 mt-2 px-2 py-0.5 rounded-full text-xs"
              style={{ background: 'rgba(16,185,129,0.1)', border: '0.75px solid rgba(16,185,129,0.3)', color: '#34d399' }}>
              <CheckCircle2 size={10}/> Free
            </div>
          )}
        </motion.a>
      ))}

      <div className="rounded-[12px] p-3 mt-1"
        style={{ background: 'rgba(99,102,241,0.08)', border: '0.75px solid rgba(99,102,241,0.25)' }}>
        <p className="text-xs leading-relaxed" style={{ color: '#a5b4fc' }}>
          These simulations open in your browser. They supplement — but don't replace — the real practical experience.
        </p>
      </div>
    </div>
  )
}
```

### Step 5: Wire TabExplore into the tab renderer

Find the section in the main PracticalScreen component where tabs are rendered (the switch/conditional that maps tab IDs to components). Add the `explore` case:

```jsx
{tab === 'explore' && <TabExplore p={p} color={color}/>}
```

This goes alongside the existing lines like:
```jsx
{tab === 'overview' && <TabOverview p={p} color={color}/>}
{tab === 'safety' && <TabSafety p={p} color={color}/>}
// ... etc
```

---

## Part 2: Enhanced Interactive Simulations — "Data Collection Mode"

### Overview

For each existing Setup diagram, add a "Collect Data" button that lets students tap to record the current slider value as a data point. Collected data points appear in a mini results table below the diagram, and once 3+ points are collected, a live scatter graph renders automatically.

### Architecture

Create a new reusable hook `src/hooks/useDataCollector.js`:

```js
import { useState, useCallback } from 'react'

/**
 * Hook for collecting virtual experiment data points.
 * Returns data array, add/reset functions, and whether enough points exist to plot.
 */
export function useDataCollector(maxPoints = 12) {
  const [data, setData] = useState([])

  const addPoint = useCallback((point) => {
    setData(prev => {
      if (prev.length >= maxPoints) return prev
      // Prevent duplicate x values
      if (prev.some(p => p.x === point.x)) return prev
      return [...prev, point].sort((a, b) => a.x - b.x)
    })
  }, [maxPoints])

  const reset = useCallback(() => setData([]), [])

  return { data, addPoint, reset, canPlot: data.length >= 3, isFull: data.length >= maxPoints }
}
```

### How to integrate into each Setup function

For each of the 10 Setup functions in PracticalScreen.jsx, add the data collection UI BELOW the existing slider. The pattern is:

1. Import and call `useDataCollector()` at top of the function
2. Add a "Record data point" button below the slider
3. Show collected data as small chips
4. When canPlot is true, render a mini ScatterGraph (reuse the existing ScatterGraph component already in the file)

Here's the exact implementation for **SetupResistance** as the template — apply the same pattern to all 10:

**In SetupResistance**, after the existing slider `</div>` (around current line 533), add:

```jsx
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
      📊 Record: {len} cm → {R} Ω
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
          {pt.x}cm → {pt.y}Ω
        </div>
      ))}
    </div>
  )}

  {canPlot && (
    <div className="mt-3">
      <ScatterGraph
        title="Your Data: Resistance vs Length"
        xLabel="Length (cm)" yLabel="Resistance (Ω)"
        xMax={110} yMax={Math.max(...data.map(d => d.y)) * 1.2}
        xTicks={[0,20,40,60,80,100]}
        yTicks={(() => {
          const max = Math.max(...data.map(d => d.y)) * 1.2
          return [0, Math.round(max/4), Math.round(max/2), Math.round(max*3/4), Math.round(max)]
        })()}
        points={data}
        lobf={data.length >= 2 ? [{x:0,y:0},{x:100,y:data[data.length-1].y * (100/data[data.length-1].x)}] : null}
        lobfLabel="Your line of best fit"
        gradient={data.length >= 2 ? { value: `${(data[data.length-1].y / data[data.length-1].x).toFixed(3)} Ω/cm`, note: 'resistivity per cm' } : null}
        color="#6366f1"
      />
    </div>
  )}
</div>
```

And at the top of SetupResistance, add:
```js
const { data, addPoint, reset, canPlot, isFull } = useDataCollector(10)
```

### Data collection config for ALL 10 practicals

Apply the same pattern to each. Here are the specific x/y values and graph labels for each:

| Setup Function | x value (slider) | y value (calculated) | Graph title | xLabel | yLabel | xMax | xTicks |
|---|---|---|---|---|---|---|---|
| SetupSHC | `time` | `parseFloat(dT)` | "Your Data: ΔT vs Energy" | "Energy (J)" | "ΔT (°C)" | 20000 | [0,4000,8000,12000,16000,20000] |
| SetupInsulation | N/A — skip data collection (it's time-based auto-run) | — | — | — | — | — | — |
| SetupResistance | `len` | `parseFloat(R)` | "Your Data: R vs Length" | "Length (cm)" | "Resistance (Ω)" | 110 | [0,20,40,60,80,100] |
| SetupIV | `volts` | `parseFloat(current) * 1000` | "Your Data: I vs V" | "Voltage (V)" | "Current (mA)" | 7 | [-6,-4,-2,0,2,4,6] |
| SetupDensity | `parseFloat(vol)` | `parseFloat(mass)` | "Your Data: Mass vs Volume" | "Volume (cm³)" | "Mass (g)" | 100 | [0,20,40,60,80,100] |
| SetupLight | `angle` | `r` | "Your Data: sin(i) vs sin(r)" | "sin(i)" | "sin(r)" | 1 | [0,0.2,0.4,0.6,0.8,1.0] |
| SetupSpring | `force` | `parseFloat(ext)` | "Your Data: Extension vs Force" | "Force (N)" | "Extension (cm)" | 11 | [0,2,4,6,8,10] |
| SetupAcceleration | `force` | `parseFloat(acc)` | "Your Data: a vs F" | "Force (N)" | "Acceleration (m/s²)" | 1.2 | [0,0.2,0.4,0.6,0.8,1.0] |
| SetupWaves | `freq` | `parseFloat(lambda) * 100` | "Your Data: λ vs Frequency" | "Frequency (Hz)" | "λ (cm)" | 15 | [0,3,6,9,12,15] |
| SetupRadiation | N/A — skip data collection (it's a surface selector, not a slider) | — | — | — | — | — | — |

**Special cases:**
- **SetupSHC**: The x value for the addPoint should be `power * time` (energy), not raw time. Record button text: `📊 Record: ${(power * time).toLocaleString()} J → +${dT}°C`
- **SetupIV**: x is volts, y is current in mA. The graph needs to handle negative voltages. Use `Math.abs` for xMax calculation or shift the graph.
- **SetupLight**: x is `Math.sin(angle * Math.PI / 180).toFixed(3)`, y is `Math.sin(r * Math.PI / 180).toFixed(3)`. The gradient of sin(i) vs sin(r) = refractive index n.
- **SetupInsulation** and **SetupRadiation**: These don't have a single independent variable slider, so skip the data collection for now.

### Important: ScatterGraph is already defined in PracticalScreen.jsx

The `ScatterGraph` component already exists at around line 1293. Do NOT recreate it. Just reuse it. Make sure it's accessible from within the Setup functions (it's already in the same file scope).

---

## Part 3: Import the hook

At the top of `src/screens/PracticalScreen.jsx`, add:
```js
import { useDataCollector } from '../hooks/useDataCollector'
```

---

## Execution Order

1. Create `src/hooks/useDataCollector.js` (the new hook file)
2. Edit `src/screens/PracticalScreen.jsx`:
   a. Add `ExternalLink` to the lucide-react import
   b. Add `import { useDataCollector } from '../hooks/useDataCollector'`
   c. Add `{ id: 'explore', label: 'Explore', icon: ExternalLink }` to TABS array
   d. Add `EXTERNAL_SIMS` constant after DIAGRAMS
   e. Add `TabExplore` component after TabAnalysis
   f. Wire `{tab === 'explore' && <TabExplore p={p} color={color}/>}` into the renderer
   g. Add `useDataCollector()` + data collection UI to 8 of the 10 Setup functions (skip Insulation & Radiation)
3. Run `npm run build` to verify no errors
4. Run `npx vercel --prod` to deploy
5. `git add` changed files + commit + push
6. `npx cap sync ios`
7. Update CLAUDE.md

---

## Design Rules (from CLAUDE.md)

- Dark theme only: bg `#0a0a0f`, surface `#12121a`, border `#1e1e2e`
- Accent: cyan `#00d4ff`, purple `#9b59b6`, amber `#f39c12`, pink `#e91e8c`
- High contrast 4.5:1 minimum
- Large tap targets 48px minimum
- One concept per screen — no walls of text
- ADHD-friendly: chunked info, no cognitive overload
- The existing code uses Tailwind utility classes + inline styles — follow the same pattern
- Motion/framer-motion is already imported as `motion` from `motion/react`

---

## Testing Checklist

After implementation, verify:
- [ ] All 7 original tabs still render correctly for all 11 practicals
- [ ] 8th "Explore" tab appears and shows links for each RP
- [ ] External links open in new browser tab
- [ ] Data collection works on RP1 (SHC), RP3 (Resistance), RP4 (IV), RP5 (Density), RP7 (Spring), RP8 (Acceleration), RP9 (Waves), RP11 (Light)
- [ ] ScatterGraph renders correctly with 3+ data points
- [ ] "Clear" button resets collected data
- [ ] No console errors
- [ ] Build passes (`npm run build`)
- [ ] Mobile responsive — test on 375px width
