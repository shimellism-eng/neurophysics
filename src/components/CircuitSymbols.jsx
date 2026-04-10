// IEC 60617 circuit symbols for GCSE Physics
// All symbols are centred at (0,0) and should be placed with transform="translate(cx,cy)"

const D = '#cad5e2' // default wire/symbol colour — matches textbook black on white

// Cell — one long thick line (+ terminal) and one short thin line (− terminal)
// Wire enters/exits horizontally; symbol is perpendicular
export function CellSym({ color = D }) {
  return (
    <g>
      <line x1={-3} y1={-8} x2={-3} y2={8} stroke={color} strokeWidth={2.5} strokeLinecap="round" />
      <line x1={3} y1={-5} x2={3} y2={5} stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    </g>
  )
}

// Battery — two cells in series
export function BatterySym({ color = D }) {
  return (
    <g>
      <line x1={-9} y1={-8} x2={-9} y2={8} stroke={color} strokeWidth={2.5} strokeLinecap="round" />
      <line x1={-3} y1={-5} x2={-3} y2={5} stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      <line x1={5} y1={-8} x2={5} y2={8} stroke={color} strokeWidth={2.5} strokeLinecap="round" />
      <line x1={11} y1={-5} x2={11} y2={5} stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    </g>
  )
}

// Resistor — plain rectangle (IEC/UK standard; NOT zigzag)
export function ResistorSym({ color = D }) {
  return (
    <g>
      <rect x={-12} y={-5} width={24} height={10} fill="none" stroke={color} strokeWidth={1.5} strokeLinejoin="round" />
    </g>
  )
}

// Variable Resistor (rheostat) — rectangle with diagonal arrow through it
export function VariableResistorSym({ color = D }) {
  return (
    <g>
      <rect x={-12} y={-5} width={24} height={10} fill="none" stroke={color} strokeWidth={1.5} />
      {/* Diagonal arrow: bottom-left to top-right */}
      <line x1={-10} y1={7} x2={9} y2={-8} stroke={color} strokeWidth={1.2} />
      {/* Arrowhead at top-right */}
      <polygon points="9,-8 3,-7 7,-3" fill={color} />
    </g>
  )
}

// Lamp — circle with X inside (IEC 60617)
export function LampSym({ color = D }) {
  return (
    <g>
      <circle cx={0} cy={0} r={11} fill="none" stroke={color} strokeWidth={1.5} />
      <line x1={-7} y1={-7} x2={7} y2={7} stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      <line x1={7} y1={-7} x2={-7} y2={7} stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    </g>
  )
}

// Switch (open) — two small open circles with tilted blade line
export function SwitchSym({ color = D }) {
  return (
    <g>
      <circle cx={-10} cy={0} r={2.5} fill="none" stroke={color} strokeWidth={1.5} />
      <circle cx={10} cy={0} r={2.5} fill="none" stroke={color} strokeWidth={1.5} />
      {/* Blade: hinged at left contact, angled ~30° upward */}
      <line x1={-7.5} y1={0} x2={8} y2={-7} stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    </g>
  )
}

// Ammeter — circle with A
export function AmmeterSym({ color = '#10b981' }) {
  return (
    <g>
      <circle cx={0} cy={0} r={12} fill="#0b1121" stroke={color} strokeWidth={1.5} />
      <text x={0} y={4} textAnchor="middle" fontSize={11} fontWeight="bold" fill={color}>A</text>
    </g>
  )
}

// Voltmeter — circle with V
export function VoltmeterSym({ color = '#f59e0b' }) {
  return (
    <g>
      <circle cx={0} cy={0} r={12} fill="#0b1121" stroke={color} strokeWidth={1.5} />
      <text x={0} y={4} textAnchor="middle" fontSize={11} fontWeight="bold" fill={color}>V</text>
    </g>
  )
}

// Diode — solid triangle pointing right + vertical bar (IEC 60617)
export function DiodeSym({ color = D }) {
  return (
    <g>
      {/* Triangle: base on left, apex on right */}
      <polygon points="-10,-8 -10,8 10,0" fill="none" stroke={color} strokeWidth={1.5} strokeLinejoin="round" />
      {/* Bar at apex (right) */}
      <line x1={10} y1={-9} x2={10} y2={9} stroke={color} strokeWidth={2} strokeLinecap="round" />
    </g>
  )
}

// LED — diode + two outward arrows (light emission)
export function LEDSym({ color = D }) {
  return (
    <g>
      <polygon points="-10,-8 -10,8 10,0" fill="none" stroke={color} strokeWidth={1.5} strokeLinejoin="round" />
      <line x1={10} y1={-9} x2={10} y2={9} stroke={color} strokeWidth={2} strokeLinecap="round" />
      {/* Arrow 1 */}
      <line x1={14} y1={-4} x2={20} y2={-11} stroke={color} strokeWidth={1.2} strokeLinecap="round" />
      <polygon points="20,-11 15,-9 18,-5" fill={color} />
      {/* Arrow 2 */}
      <line x1={18} y1={2} x2={24} y2={-5} stroke={color} strokeWidth={1.2} strokeLinecap="round" />
      <polygon points="24,-5 19,-3 22,1" fill={color} />
    </g>
  )
}

// LDR — resistor rectangle with TWO arrows pointing INTO it (light absorbed)
export function LDRSym({ color = D }) {
  return (
    <g>
      <rect x={-12} y={-5} width={24} height={10} fill="none" stroke={color} strokeWidth={1.5} />
      {/* Arrows pointing DOWN into the component */}
      <line x1={-5} y1={-15} x2={-5} y2={-7} stroke={color} strokeWidth={1.2} strokeLinecap="round" />
      <polygon points="-5,-7 -8,-12 -2,-12" fill={color} />
      <line x1={4} y1={-15} x2={4} y2={-7} stroke={color} strokeWidth={1.2} strokeLinecap="round" />
      <polygon points="4,-7 1,-12 7,-12" fill={color} />
    </g>
  )
}

// Thermistor — rectangle with diagonal line through it (IEC 60617-2, Symbol T)
export function ThermistorSym({ color = D }) {
  return (
    <g>
      <rect x={-12} y={-5} width={24} height={10} fill="none" stroke={color} strokeWidth={1.5} />
      {/* Diagonal line: bottom-left corner to top-right corner */}
      <line x1={-12} y1={5} x2={12} y2={-5} stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    </g>
  )
}

// Fuse — thin rectangle (IEC 60617; can also be shown as wire-in-box)
export function FuseSym({ color = D }) {
  return (
    <g>
      <rect x={-13} y={-4} width={26} height={8} fill="none" stroke={color} strokeWidth={1.5} />
    </g>
  )
}

// Motor — circle with M
export function MotorSym({ color = D }) {
  return (
    <g>
      <circle cx={0} cy={0} r={12} fill="#0b1121" stroke={color} strokeWidth={1.5} />
      <text x={0} y={4} textAnchor="middle" fontSize={11} fontWeight="bold" fill={color}>M</text>
    </g>
  )
}

// Generator — circle with G
export function GeneratorSym({ color = D }) {
  return (
    <g>
      <circle cx={0} cy={0} r={12} fill="#0b1121" stroke={color} strokeWidth={1.5} />
      <text x={0} y={4} textAnchor="middle" fontSize={11} fontWeight="bold" fill={color}>G</text>
    </g>
  )
}

// Power Supply (PSU) — two cells stacked (battery symbol)
// For a variable PSU, use VariableResistorSym in series with BatterySym
// Simple battery symbol used for a PSU
export function PSUSym({ color = D, label = '6V' }) {
  return (
    <g>
      {/* Battery symbol: long + short perpendicular lines */}
      <line x1={-3} y1={-10} x2={-3} y2={10} stroke={color} strokeWidth={2.5} strokeLinecap="round" />
      <line x1={3} y1={-6} x2={3} y2={6} stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      {/* Voltage label below */}
      {label && <text x={0} y={18} textAnchor="middle" fontSize={8} fill={color}>{label}</text>}
    </g>
  )
}
