import { useState } from 'react'
import { CheckCircle2, RefreshCw } from 'lucide-react'
import { speak } from '../../utils/tts'

// Spec: velocity=cyan, force=amber, energy=green, time=pink, mass=purple
const VAR_COLOR = {
  F: '#f39c12', W: '#f39c12', N: '#f39c12',           // force / weight
  m: '#9b59b6',                                         // mass
  v: '#00d4ff', u: '#00d4ff', s: '#00d4ff', d: '#00d4ff', // velocity / speed / displacement / distance
  a: '#e67e22',                                         // acceleration
  t: '#e91e8c',                                         // time
  E: '#27ae60', KE: '#27ae60', PE: '#27ae60', Ek: '#27ae60', Ep: '#27ae60', // energy
  P: '#f1c40f',                                         // power
  I: '#3498db',                                         // current
  V: '#00d4ff', R: '#e74c3c',                          // voltage / resistance
  g: '#9b59b6', h: '#27ae60',                          // gravity / height
  k: '#e67e22', e: '#e91e8c',                          // spring constant / extension
}
const colorOf = (sym) => VAR_COLOR[sym] || 'rgba(255,255,255,0.7)'

// Render a formula string with coloured variable spans
function ColorFormula({ formula, size = 18 }) {
  // Match variable symbols (1-2 chars, starting with uppercase or known lowercase)
  const tokens = formula.split(/(\b[A-Za-z]{1,2}\b)/)
  return (
    <span style={{ fontSize: size, fontWeight: 700, letterSpacing: '0.04em', fontFamily: 'monospace' }}>
      {tokens.map((tok, i) => {
        const col = VAR_COLOR[tok]
        return col
          ? <span key={i} style={{ color: col }}>{tok}</span>
          : <span key={i} style={{ color: 'rgba(255,255,255,0.75)' }}>{tok}</span>
      })}
    </span>
  )
}

// Formula triangle: top = product of left × right (or left / right for rearrangements)
function FormulaTriangle({ triangle, selectedUnknown, onSelect }) {
  const { top, left, right } = triangle
  const parts = [
    { ...top, pos: 'top' },
    { ...left, pos: 'left' },
    { ...right, pos: 'right' },
  ]
  return (
    <div style={{ position: 'relative', width: 160, height: 120, margin: '0 auto', userSelect: 'none' }}>
      {/* Triangle SVG */}
      <svg width="160" height="120" style={{ position: 'absolute', inset: 0 }}>
        <polygon
          points="80,8 156,112 4,112"
          fill="rgba(255,255,255,0.04)"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="1.5"
        />
        {/* Dividing line — separates top from bottom two */}
        <line x1="4" y1="72" x2="156" y2="72" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        {/* Vertical divider in bottom half */}
        <line x1="80" y1="72" x2="80" y2="112" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
      </svg>

      {/* Top variable */}
      <button
        onClick={() => onSelect(top.sym)}
        style={{
          position: 'absolute', top: 20, left: '50%', transform: 'translateX(-50%)',
          width: 40, height: 40, borderRadius: 10, border: 'none', cursor: 'pointer',
          background: selectedUnknown === top.sym ? `${colorOf(top.sym)}30` : 'transparent',
          outline: selectedUnknown === top.sym ? `2px solid ${colorOf(top.sym)}` : 'none',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        }}
      >
        <span style={{ color: colorOf(top.sym), fontSize: 18, fontWeight: 800 }}>{top.sym}</span>
      </button>

      {/* Bottom left */}
      <button
        onClick={() => onSelect(left.sym)}
        style={{
          position: 'absolute', bottom: 10, left: 20,
          width: 48, height: 36, borderRadius: 8, border: 'none', cursor: 'pointer',
          background: selectedUnknown === left.sym ? `${colorOf(left.sym)}30` : 'transparent',
          outline: selectedUnknown === left.sym ? `2px solid ${colorOf(left.sym)}` : 'none',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        }}
      >
        <span style={{ color: colorOf(left.sym), fontSize: 16, fontWeight: 800 }}>{left.sym}</span>
      </button>

      {/* Bottom right */}
      <button
        onClick={() => onSelect(right.sym)}
        style={{
          position: 'absolute', bottom: 10, right: 20,
          width: 48, height: 36, borderRadius: 8, border: 'none', cursor: 'pointer',
          background: selectedUnknown === right.sym ? `${colorOf(right.sym)}30` : 'transparent',
          outline: selectedUnknown === right.sym ? `2px solid ${colorOf(right.sym)}` : 'none',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        }}
      >
        <span style={{ color: colorOf(right.sym), fontSize: 16, fontWeight: 800 }}>{right.sym}</span>
      </button>

      {/* Cover hint if selected */}
      {selectedUnknown && (
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', marginTop: 80 }}>
            tap a variable to find it
          </span>
        </div>
      )}
    </div>
  )
}

export default function EquationBuilder({ equationData, moduleColor, onComplete }) {
  const { name, triangle, rearrangements, practice } = equationData

  const [selectedUnknown, setSelectedUnknown] = useState(null)
  const [inputs, setInputs]       = useState({})
  const [solved, setSolved]       = useState(false)
  const [answer, setAnswer]       = useState(null)
  const [practiceIdx, setPracticeIdx] = useState(0)
  const [practiceMode, setPracticeMode] = useState(false)
  const [done, setDone]           = useState(false)

  const ttsOn = (() => { try { return !!JSON.parse(localStorage.getItem('neurophysics_prefs') || '{}').tts } catch { return false } })()

  const activeRearrangement = rearrangements.find(r => r.unknown === selectedUnknown)
  const currentPractice = practice?.[practiceIdx]

  const knownSymbols = selectedUnknown
    ? [triangle.top, triangle.left, triangle.right].map(v => v.sym).filter(s => s !== selectedUnknown)
    : []

  const handleCalculate = () => {
    if (!activeRearrangement) return
    const vals = {}
    knownSymbols.forEach(s => { vals[s] = parseFloat(inputs[s] || '0') })
    const result = activeRearrangement.calc(vals)
    if (!isFinite(result)) return
    const rounded = Math.round(result * 1000) / 1000
    setAnswer(rounded)
    setSolved(true)
    if (ttsOn) speak(activeRearrangement.spokenSteps?.(vals, rounded) || `Answer: ${rounded} ${activeRearrangement.unit}`)
  }

  const handleReset = () => {
    setSelectedUnknown(null)
    setInputs({})
    setSolved(false)
    setAnswer(null)
  }

  const handlePracticeStart = () => {
    if (!currentPractice) { setDone(true); onComplete?.(); return }
    setSelectedUnknown(currentPractice.find)
    const prefilled = {}
    Object.entries(currentPractice.given).forEach(([sym, { value }]) => {
      prefilled[sym] = String(value)
    })
    setInputs(prefilled)
    setSolved(false)
    setAnswer(null)
    setPracticeMode(true)
  }

  const handleNextPractice = () => {
    const next = practiceIdx + 1
    if (next >= (practice?.length || 0)) {
      setDone(true)
      onComplete?.()
    } else {
      setPracticeIdx(next)
      const np = practice[next]
      setSelectedUnknown(np.find)
      const prefilled = {}
      Object.entries(np.given).forEach(([sym, { value }]) => { prefilled[sym] = String(value) })
      setInputs(prefilled)
      setSolved(false)
      setAnswer(null)
    }
  }

  if (done) return null

  const allVars = [triangle.top, triangle.left, triangle.right]

  return (
    <div className="px-4 pb-4">
      {/* Header */}
      <div className="mb-4">
        <div className="text-xs font-bold mb-1" style={{ color: moduleColor, letterSpacing: '0.08em' }}>
          EQUATION BUILDER
        </div>
        <div className="text-base font-bold" style={{ color: '#f8fafc' }}>{name}</div>
      </div>

      {/* Triangle + variable table */}
      <div className="rounded-[16px] p-4 mb-4" style={{ background: 'rgba(255,255,255,0.04)', border: '0.75px solid rgba(255,255,255,0.08)' }}>
        <div className="text-xs mb-3 text-center" style={{ color: 'rgba(255,255,255,0.4)' }}>
          Tap a variable in the triangle to see the rearrangement
        </div>
        <FormulaTriangle
          triangle={triangle}
          selectedUnknown={selectedUnknown}
          onSelect={(sym) => { setSelectedUnknown(s => s === sym ? null : sym); setSolved(false); setInputs({}) }}
        />

        {/* Selected rearrangement */}
        {selectedUnknown && activeRearrangement && (
          <div className="mt-3 text-center">
            <ColorFormula formula={activeRearrangement.formula} size={20} />
          </div>
        )}
        {!selectedUnknown && (
          <div className="mt-3 text-center">
            <ColorFormula formula={rearrangements[0].formula} size={20} />
          </div>
        )}
      </div>

      {/* Variable reference table */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {allVars.map(v => (
          <div
            key={v.sym}
            className="flex-1 min-w-[90px] rounded-[12px] px-3 py-2"
            style={{ background: `${colorOf(v.sym)}12`, border: `1px solid ${colorOf(v.sym)}30` }}
          >
            <div style={{ color: colorOf(v.sym), fontSize: 18, fontWeight: 800 }}>{v.sym}</div>
            <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 11, fontWeight: 600 }}>{v.name}</div>
            <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 10 }}>{v.unit}</div>
          </div>
        ))}
      </div>

      {/* Input section — only when unknown is selected */}
      {selectedUnknown && !practiceMode && (
        <div className="rounded-[16px] p-4 mb-4" style={{ background: 'rgba(255,255,255,0.04)', border: '0.75px solid rgba(255,255,255,0.08)' }}>
          <div className="text-xs font-semibold mb-3" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Enter known values:
          </div>
          <div className="flex flex-col gap-3">
            {knownSymbols.map(sym => {
              const varDef = allVars.find(v => v.sym === sym)
              return (
                <div key={sym} className="flex items-center gap-3">
                  <span style={{ color: colorOf(sym), fontSize: 18, fontWeight: 800, width: 28 }}>{sym}</span>
                  <input
                    type="number"
                    inputMode="decimal"
                    value={inputs[sym] || ''}
                    onChange={e => setInputs(prev => ({ ...prev, [sym]: e.target.value }))}
                    placeholder="0"
                    style={{
                      flex: 1, height: 44, borderRadius: 10, border: `1.5px solid ${colorOf(sym)}50`,
                      background: `${colorOf(sym)}10`, color: '#f8fafc', fontSize: 16, fontWeight: 600,
                      padding: '0 12px', outline: 'none',
                    }}
                  />
                  <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12, minWidth: 40 }}>
                    {varDef?.unit}
                  </span>
                </div>
              )
            })}
          </div>

          {!solved ? (
            <button
              onClick={handleCalculate}
              disabled={knownSymbols.some(s => !inputs[s])}
              className="w-full mt-4 font-bold"
              style={{
                height: 48, borderRadius: 12,
                background: knownSymbols.some(s => !inputs[s]) ? 'rgba(255,255,255,0.08)' : moduleColor,
                color: knownSymbols.some(s => !inputs[s]) ? 'rgba(255,255,255,0.3)' : '#080f1e',
                border: 'none', cursor: 'pointer', fontSize: 15,
              }}
            >
              Calculate →
            </button>
          ) : (
            <div className="mt-4">
              {/* Step-by-step solution */}
              <div className="rounded-[12px] p-3 mb-3" style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.25)' }}>
                <div className="text-xs font-bold mb-2" style={{ color: '#22c55e' }}>Step by step:</div>
                <div className="flex flex-col gap-1.5 text-sm" style={{ color: 'rgba(255,255,255,0.75)' }}>
                  <div>1. Write the formula: <ColorFormula formula={activeRearrangement.formula} size={14} /></div>
                  <div>2. Substitute: <span style={{ fontFamily: 'monospace', color: '#f8fafc' }}>
                    {knownSymbols.map((s, i) => `${s} = ${inputs[s]}`).join(', ')}
                  </span></div>
                  <div>3. Answer: <span style={{ color: colorOf(selectedUnknown), fontWeight: 800, fontSize: 16 }}>
                    {selectedUnknown} = {answer} {activeRearrangement.unit}
                  </span></div>
                </div>
              </div>
              <button
                onClick={handleReset}
                className="flex items-center gap-2 mx-auto text-sm"
                style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', padding: '4px 8px' }}
              >
                <RefreshCw size={13} /> Try another rearrangement
              </button>
            </div>
          )}
        </div>
      )}

      {/* Practice mode inputs (pre-filled known values) */}
      {practiceMode && currentPractice && !solved && (
        <div className="rounded-[16px] p-4 mb-4" style={{ background: 'rgba(255,255,255,0.04)', border: '0.75px solid rgba(255,255,255,0.08)' }}>
          <div className="text-xs font-bold mb-1" style={{ color: moduleColor }}>PRACTICE</div>
          <div className="text-sm mb-3" style={{ color: 'rgba(255,255,255,0.8)' }}>{currentPractice.label}</div>
          <div className="flex flex-col gap-2 mb-4">
            {Object.entries(currentPractice.given).map(([sym, { value, unit }]) => (
              <div key={sym} className="flex items-center gap-2">
                <span style={{ color: colorOf(sym), fontSize: 16, fontWeight: 800, width: 24 }}>{sym}</span>
                <span style={{ color: '#f8fafc', fontWeight: 600 }}>=</span>
                <span style={{ color: colorOf(sym), fontWeight: 700 }}>{value}</span>
                <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12 }}>{unit}</span>
              </div>
            ))}
            <div className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Find: <span style={{ color: colorOf(currentPractice.find), fontWeight: 800, fontSize: 15 }}>{currentPractice.find}</span>
            </div>
          </div>
          <button
            onClick={handleCalculate}
            className="w-full font-bold"
            style={{ height: 48, borderRadius: 12, background: moduleColor, color: '#080f1e', border: 'none', cursor: 'pointer', fontSize: 15 }}
          >
            Show solution
          </button>
        </div>
      )}

      {/* Practice mode — solved */}
      {practiceMode && solved && (
        <div className="rounded-[16px] p-4 mb-4" style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.3)' }}>
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 size={18} color="#22c55e" />
            <span className="font-bold text-sm" style={{ color: '#22c55e' }}>Solution</span>
          </div>
          <div className="flex flex-col gap-1.5 text-sm" style={{ color: 'rgba(255,255,255,0.75)' }}>
            <div>Formula: <ColorFormula formula={activeRearrangement.formula} size={14} /></div>
            <div>Substitute: <span style={{ fontFamily: 'monospace', color: '#f8fafc' }}>
              {Object.entries(currentPractice.given).map(([s, {value}]) => `${s} = ${value}`).join(', ')}
            </span></div>
            <div style={{ marginTop: 4 }}>
              <span style={{ color: colorOf(currentPractice.find), fontWeight: 800, fontSize: 18 }}>
                {currentPractice.find} = {answer} {activeRearrangement.unit}
              </span>
            </div>
          </div>
          <button
            onClick={handleNextPractice}
            className="w-full mt-4 font-bold"
            style={{ height: 48, borderRadius: 12, background: moduleColor, color: '#080f1e', border: 'none', cursor: 'pointer', fontSize: 15 }}
          >
            {practiceIdx + 1 < (practice?.length || 0) ? 'Next question →' : 'Got it! ✓'}
          </button>
        </div>
      )}

      {/* CTA when no unknown is selected and not in practice mode */}
      {!selectedUnknown && !practiceMode && (
        <div className="flex gap-3">
          <button
            onClick={handlePracticeStart}
            className="flex-1 font-bold"
            style={{ height: 48, borderRadius: 12, background: moduleColor, color: '#080f1e', border: 'none', cursor: 'pointer', fontSize: 15 }}
          >
            Try a question →
          </button>
          {onComplete && (
            <button
              onClick={onComplete}
              style={{ height: 48, paddingInline: 20, borderRadius: 12, background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.5)', border: '0.75px solid rgba(255,255,255,0.1)', cursor: 'pointer', fontSize: 14 }}
            >
              Skip
            </button>
          )}
        </div>
      )}
    </div>
  )
}
