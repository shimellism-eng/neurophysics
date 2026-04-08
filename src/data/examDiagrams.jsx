// examDiagrams.jsx
// Library of ~48 premium SVG diagram components for GCSE Physics revision
// Dark-theme optimised — transparent background, renders on #0b1121 / #121a2f cards

import React from 'react';

// ─── ENERGY GROUP (accent: #f97316) ──────────────────────────────────────────

export function SankeyLightBulb() {
  return (
    <div className="w-full">
      <svg viewBox="0 0 300 200" className="w-full h-auto">
        {/* Input arrow: wide orange trapezoid on left */}
        <polygon points="10,60 10,140 80,110 80,90" fill="#f97316" opacity="0.85" />
        {/* Shaft continuing right (represents 10 J light) */}
        <polygon points="80,90 80,110 200,105 200,95" fill="#f97316" opacity="0.85" />
        {/* Light output: thin yellow arrow right */}
        <polygon points="200,95 200,105 270,102 270,98" fill="#facc15" opacity="0.9" />
        <polygon points="270,100 260,96 265,100 260,104" fill="#facc15" />
        {/* Heat output: wide red arrow downward */}
        <polygon points="80,110 200,105 200,175 80,175" fill="#ef4444" opacity="0.8" />
        <polygon points="140,175 130,165 150,165" fill="#ef4444" />
        {/* Arrow heads */}
        <polygon points="270,100 260,95 260,105" fill="#facc15" />
        {/* Labels */}
        <text x="35" y="105" fontSize={8} fill="#fed7aa" textAnchor="middle" fontWeight="600">100 J</text>
        <text x="35" y="115" fontSize={7} fill="#fed7aa" textAnchor="middle">input</text>
        <text x="230" y="99" fontSize={8} fill="#fef08a" textAnchor="middle" fontWeight="600">10 J</text>
        <text x="230" y="108" fontSize={7} fill="#fef08a" textAnchor="middle">light</text>
        <text x="140" y="148" fontSize={8} fill="#fca5a5" textAnchor="middle" fontWeight="600">90 J heat</text>
        <text x="140" y="158" fontSize={7} fill="#fca5a5" textAnchor="middle">(wasted)</text>
        <text x="150" y="18" fontSize={9} fill="#94a3b8" textAnchor="middle">Sankey Diagram — Light Bulb</text>
      </svg>
    </div>
  );
}

export function SankeyCarEngine() {
  return (
    <div className="w-full">
      <svg viewBox="0 0 300 200" className="w-full h-auto">
        {/* Input: very wide orange arrow */}
        <polygon points="10,40 10,160 80,130 80,70" fill="#f97316" opacity="0.85" />
        {/* Kinetic output shaft: medium green right */}
        <polygon points="80,70 80,100 270,100 270,75" fill="#22c55e" opacity="0.85" />
        <polygon points="270,87 258,80 258,94" fill="#22c55e" />
        {/* Thermal waste: wide red downward */}
        <polygon points="80,100 80,130 270,130 270,105" fill="#ef4444" opacity="0.8" />
        <polygon points="175,130 165,120 185,120" fill="#ef4444" />
        {/* Labels */}
        <text x="40" y="100" fontSize={8} fill="#fed7aa" textAnchor="middle" fontWeight="600">1000 J</text>
        <text x="40" y="110" fontSize={7} fill="#fed7aa" textAnchor="middle">input</text>
        <text x="185" y="92" fontSize={8} fill="#86efac" textAnchor="middle" fontWeight="600">250 J kinetic</text>
        <text x="185" y="122" fontSize={8} fill="#fca5a5" textAnchor="middle" fontWeight="600">750 J thermal</text>
        <text x="185" y="132" fontSize={7} fill="#fca5a5" textAnchor="middle">(waste heat)</text>
        <text x="150" y="18" fontSize={9} fill="#94a3b8" textAnchor="middle">Sankey Diagram — Car Engine</text>
      </svg>
    </div>
  );
}

export function EnergyChainCoal() {
  const boxes = [
    { x: 5,   label1: "Chemical", label2: "store", label3: "(coal)" },
    { x: 80,  label1: "Thermal",  label2: "store",  label3: "(steam)" },
    { x: 155, label1: "Kinetic",  label2: "store",  label3: "(turbine)" },
    { x: 230, label1: "Electrical",label2:"store",  label3: "(generator)" },
  ];
  return (
    <div className="w-full">
      <svg viewBox="0 0 300 200" className="w-full h-auto">
        <text x="150" y="18" fontSize={9} fill="#94a3b8" textAnchor="middle">Energy Transfer Chain — Coal Power</text>
        {boxes.map((b, i) => (
          <g key={i}>
            <rect x={b.x} y={70} width={60} height={60} rx={6} ry={6}
              fill="#1e293b" stroke="#f97316" strokeWidth={1.5} />
            <text x={b.x + 30} y={90} fontSize={7} fill="#f97316" textAnchor="middle" fontWeight="600">{b.label1}</text>
            <text x={b.x + 30} y={100} fontSize={7} fill="#f97316" textAnchor="middle" fontWeight="600">{b.label2}</text>
            <text x={b.x + 30} y={112} fontSize={7} fill="#94a3b8" textAnchor="middle">{b.label3}</text>
          </g>
        ))}
        {/* Arrows between boxes */}
        {[65, 140, 215].map((ax, i) => (
          <g key={i}>
            <line x1={ax} y1={100} x2={ax + 10} y2={100} stroke="#f97316" strokeWidth={1.5} />
            <polygon points={`${ax + 10},100 ${ax + 5},97 ${ax + 5},103`} fill="#f97316" />
          </g>
        ))}
        <text x="150" y="170" fontSize={7} fill="#64748b" textAnchor="middle">Energy is conserved throughout each transfer</text>
      </svg>
    </div>
  );
}

export function HeatingCurveWater() {
  return (
    <div className="w-full">
      <svg viewBox="0 0 300 200" className="w-full h-auto">
        <text x="150" y="14" fontSize={9} fill="#94a3b8" textAnchor="middle">Heating Curve — Water</text>
        {/* Axes */}
        <line x1={40} y1={170} x2={280} y2={170} stroke="#475569" strokeWidth={1.2} />
        <line x1={40} y1={170} x2={40} y2={20} stroke="#475569" strokeWidth={1.2} />
        {/* Grid lines */}
        {[50, 80, 110, 140].map(y => (
          <line key={y} x1={40} y1={y} x2={280} y2={y} stroke="#1e293b" strokeWidth={0.5} />
        ))}
        {/* Axis labels */}
        <text x="160" y="187" fontSize={8} fill="#94a3b8" textAnchor="middle">Energy Supplied (J)</text>
        <text x="12" y="100" fontSize={8} fill="#94a3b8" textAnchor="middle" transform="rotate(-90,12,100)">Temperature (°C)</text>
        {/* 100 degree C marker */}
        <line x1={35} y1={80} x2={40} y2={80} stroke="#f97316" strokeWidth={1} />
        <text x={30} y={83} fontSize={7} fill="#f97316" textAnchor="end">100°C</text>
        {/* Heating curve: rises, flat, rises */}
        <polyline points="40,155 100,80 170,80 230,30" fill="none" stroke="#f97316" strokeWidth={2} strokeLinejoin="round" />
        {/* Flat section label */}
        <text x="135" y="73" fontSize={7} fill="#fbbf24" textAnchor="middle">Boiling point /</text>
        <text x="135" y="82" fontSize={7} fill="#fbbf24" textAnchor="middle">latent heat</text>
        {/* Dashed lines to flat */}
        <line x1={100} y1={80} x2={100} y2={170} stroke="#475569" strokeWidth={0.8} strokeDasharray="3,3" />
        <line x1={170} y1={80} x2={170} y2={170} stroke="#475569" strokeWidth={0.8} strokeDasharray="3,3" />
        {/* Region labels */}
        <text x="70" y="125" fontSize={7} fill="#94a3b8" textAnchor="middle">Heating</text>
        <text x="70" y="133" fontSize={7} fill="#94a3b8" textAnchor="middle">liquid</text>
        <text x="200" y="55" fontSize={7} fill="#94a3b8" textAnchor="middle">Heating</text>
        <text x="200" y="63" fontSize={7} fill="#94a3b8" textAnchor="middle">steam</text>
      </svg>
    </div>
  );
}

// ─── ELECTRICITY GROUP (accent: #3b82f6 / blue) ───────────────────────────────

export function SeriesCircuitAV() {
  return (
    <div className="w-full">
      <svg viewBox="0 0 300 200" className="w-full h-auto">
        <text x="150" y="14" fontSize={9} fill="#94a3b8" textAnchor="middle">Series Circuit with Ammeter &amp; Voltmeter</text>
        {/* Outer wire rectangle */}
        <polyline points="30,40 270,40 270,160 30,160 30,40" fill="none" stroke="#cbd5e1" strokeWidth={1.5} />
        {/* Cell symbol at left side (top segment) */}
        <line x1={30} y1={40} x2={70} y2={40} stroke="#cbd5e1" strokeWidth={1.5} />
        {/* Cell: two vertical lines */}
        <line x1={55} y1={33} x2={55} y2={47} stroke="#cbd5e1" strokeWidth={2.5} />
        <line x1={62} y1={35} x2={62} y2={45} stroke="#cbd5e1" strokeWidth={1} />
        <text x={58} y={28} fontSize={7} fill="#94a3b8" textAnchor="middle">1.5 V cell</text>
        {/* Resistor R1 on top wire */}
        <rect x={100} y={32} width={36} height={16} rx={2} fill="#1e293b" stroke="#3b82f6" strokeWidth={1.5} />
        <text x={118} y={43} fontSize={8} fill="#93c5fd" textAnchor="middle">R₁</text>
        {/* Resistor R2 on top wire */}
        <rect x={160} y={32} width={36} height={16} rx={2} fill="#1e293b" stroke="#3b82f6" strokeWidth={1.5} />
        <text x={178} y={43} fontSize={8} fill="#93c5fd" textAnchor="middle">R₂</text>
        {/* Ammeter on right vertical wire */}
        <circle cx={270} cy={100} r={12} fill="#0b1121" stroke="#10b981" strokeWidth={1.5} />
        <text x={270} y={104} fontSize={9} fill="#10b981" textAnchor="middle" fontWeight="700">A</text>
        {/* Voltmeter in parallel across both resistors */}
        <line x1={100} y1={40} x2={100} y2={70} stroke="#cbd5e1" strokeWidth={1.2} strokeDasharray="4,2" />
        <line x1={196} y1={40} x2={196} y2={70} stroke="#cbd5e1" strokeWidth={1.2} strokeDasharray="4,2" />
        <line x1={100} y1={70} x2={140} y2={70} stroke="#cbd5e1" strokeWidth={1.2} strokeDasharray="4,2" />
        <line x1={156} y1={70} x2={196} y2={70} stroke="#cbd5e1" strokeWidth={1.2} strokeDasharray="4,2" />
        <circle cx={148} cy={70} r={12} fill="#0b1121" stroke="#f59e0b" strokeWidth={1.5} />
        <text x={148} y={74} fontSize={9} fill="#f59e0b" textAnchor="middle" fontWeight="700">V</text>
        <text x={148} y={58} fontSize={7} fill="#f59e0b" textAnchor="middle">(parallel)</text>
      </svg>
    </div>
  );
}

export function ParallelCircuitLamps() {
  return (
    <div className="w-full">
      <svg viewBox="0 0 300 200" className="w-full h-auto">
        <text x="150" y="14" fontSize={9} fill="#94a3b8" textAnchor="middle">Parallel Circuit — Two Lamps</text>
        {/* Main wires: left and right bus */}
        <line x1={40} y1={30} x2={40} y2={170} stroke="#cbd5e1" strokeWidth={1.5} />
        <line x1={260} y1={30} x2={260} y2={170} stroke="#cbd5e1" strokeWidth={1.5} />
        {/* Top and bottom connections */}
        <line x1={40} y1={30} x2={260} y2={30} stroke="#cbd5e1" strokeWidth={1.5} />
        <line x1={40} y1={170} x2={260} y2={170} stroke="#cbd5e1" strokeWidth={1.5} />
        {/* Cell on left wire */}
        <line x1={33} y1={95} x2={47} y2={95} stroke="#cbd5e1" strokeWidth={2.5} />
        <line x1={33} y1={102} x2={47} y2={102} stroke="#cbd5e1" strokeWidth={1} />
        <text x={22} y={100} fontSize={7} fill="#94a3b8" textAnchor="middle">Cell</text>
        {/* Branch 1 (top): switch S1 and lamp L1 */}
        <line x1={40} y1={70} x2={100} y2={70} stroke="#cbd5e1" strokeWidth={1.5} />
        {/* Switch S1 */}
        <circle cx={110} cy={70} r={3} fill="#3b82f6" />
        <line x1={113} y1={68} x2={135} y2={60} stroke="#cbd5e1" strokeWidth={1.2} />
        <circle cx={138} cy={70} r={3} fill="#3b82f6" />
        <text x={120} y={58} fontSize={7} fill="#93c5fd" textAnchor="middle">S₁</text>
        <line x1={138} y1={70} x2={175} y2={70} stroke="#cbd5e1" strokeWidth={1.5} />
        {/* Lamp L1: circle with cross */}
        <circle cx={190} cy={70} r={14} fill="#1e293b" stroke="#3b82f6" strokeWidth={1.5} />
        <line x1={180} y1={60} x2={200} y2={80} stroke="#3b82f6" strokeWidth={1.2} />
        <line x1={200} y1={60} x2={180} y2={80} stroke="#3b82f6" strokeWidth={1.2} />
        <text x={190} y={52} fontSize={7} fill="#93c5fd" textAnchor="middle">L₁</text>
        <line x1={204} y1={70} x2={260} y2={70} stroke="#cbd5e1" strokeWidth={1.5} />
        {/* Branch 2 (bottom): switch S2 and lamp L2 */}
        <line x1={40} y1={130} x2={100} y2={130} stroke="#cbd5e1" strokeWidth={1.5} />
        {/* Switch S2 */}
        <circle cx={110} cy={130} r={3} fill="#3b82f6" />
        <line x1={113} y1={128} x2={135} y2={120} stroke="#cbd5e1" strokeWidth={1.2} />
        <circle cx={138} cy={130} r={3} fill="#3b82f6" />
        <text x={120} y={118} fontSize={7} fill="#93c5fd" textAnchor="middle">S₂</text>
        <line x1={138} y1={130} x2={175} y2={130} stroke="#cbd5e1" strokeWidth={1.5} />
        {/* Lamp L2 */}
        <circle cx={190} cy={130} r={14} fill="#1e293b" stroke="#3b82f6" strokeWidth={1.5} />
        <line x1={180} y1={120} x2={200} y2={140} stroke="#3b82f6" strokeWidth={1.2} />
        <line x1={200} y1={120} x2={180} y2={140} stroke="#3b82f6" strokeWidth={1.2} />
        <text x={190} y={112} fontSize={7} fill="#93c5fd" textAnchor="middle">L₂</text>
        <line x1={204} y1={130} x2={260} y2={130} stroke="#cbd5e1" strokeWidth={1.5} />
      </svg>
    </div>
  );
}

export function IVGraphThreeComponents() {
  const vToX = v => 40 + (v + 6) * (220 / 12);
  const iToY = i => 100 - i * (70 / 60);

  const resistorPoints = [[-6, -60], [6, 60]].map(([v, i]) => `${vToX(v)},${iToY(i)}`).join(' ');

  const lampPts = [
    [-6, -45], [-4, -35], [-2, -20], [-1, -10], [0, 0],
    [1, 10], [2, 20], [4, 35], [6, 45]
  ].map(([v, i]) => `${vToX(v)},${iToY(i)}`).join(' ');

  const diodePts = [
    [-6, -0.5], [-0.5, -0.5], [0, 0], [0.6, 0], [1, 8], [2, 25], [3, 45], [4, 58]
  ].map(([v, i]) => `${vToX(v)},${iToY(i)}`).join(' ');

  return (
    <div className="w-full">
      <svg viewBox="0 0 300 200" className="w-full h-auto">
        <text x="150" y="13" fontSize={9} fill="#94a3b8" textAnchor="middle">I-V Characteristics</text>
        {/* Grid */}
        {[-4, -2, 0, 2, 4].map(v => (
          <line key={v} x1={vToX(v)} y1={25} x2={vToX(v)} y2={175} stroke="#1e293b" strokeWidth={0.8} />
        ))}
        {[-40, -20, 0, 20, 40].map(i => (
          <line key={i} x1={35} y1={iToY(i)} x2={265} y2={iToY(i)} stroke="#1e293b" strokeWidth={0.8} />
        ))}
        {/* Axes */}
        <line x1={40} y1={175} x2={260} y2={175} stroke="#475569" strokeWidth={1.2} />
        <line x1={40} y1={175} x2={40} y2={25} stroke="#475569" strokeWidth={1.2} />
        <line x1={40} y1={100} x2={260} y2={100} stroke="#475569" strokeWidth={1} />
        <line x1={150} y1={175} x2={150} y2={25} stroke="#475569" strokeWidth={1} />
        {/* Axis labels */}
        <text x="155" y="188" fontSize={7} fill="#94a3b8">V (volts)</text>
        <text x="12" y="105" fontSize={7} fill="#94a3b8" transform="rotate(-90,12,105)">I (mA)</text>
        {/* Tick labels */}
        <text x={vToX(-6)} y={183} fontSize={6} fill="#64748b" textAnchor="middle">-6</text>
        <text x={vToX(6)} y={183} fontSize={6} fill="#64748b" textAnchor="middle">+6</text>
        <text x={35} y={iToY(60)} fontSize={6} fill="#64748b" textAnchor="end">+60</text>
        <text x={35} y={iToY(-60)} fontSize={6} fill="#64748b" textAnchor="end">-60</text>
        {/* Curves */}
        <polyline points={resistorPoints} fill="none" stroke="#3b82f6" strokeWidth={1.8} />
        <polyline points={lampPts} fill="none" stroke="#f59e0b" strokeWidth={1.8} />
        <polyline points={diodePts} fill="none" stroke="#10b981" strokeWidth={1.8} />
        {/* Legend */}
        <line x1={165} y1={35} x2={185} y2={35} stroke="#3b82f6" strokeWidth={2} />
        <text x={187} y={38} fontSize={7} fill="#3b82f6">Resistor</text>
        <line x1={165} y1={47} x2={185} y2={47} stroke="#f59e0b" strokeWidth={2} />
        <text x={187} y={50} fontSize={7} fill="#f59e0b">Lamp</text>
        <line x1={165} y1={59} x2={185} y2={59} stroke="#10b981" strokeWidth={2} />
        <text x={187} y={62} fontSize={7} fill="#10b981">Diode</text>
      </svg>
    </div>
  );
}

export function TransformerStepUp() {
  return (
    <div className="w-full">
      <svg viewBox="0 0 300 200" className="w-full h-auto">
        <text x="150" y="14" fontSize={9} fill="#94a3b8" textAnchor="middle">Step-Down Transformer</text>
        {/* Iron core */}
        <rect x={115} y={50} width={70} height={110} rx={4} fill="#1e293b" stroke="#475569" strokeWidth={1.5} />
        <text x={150} y={110} fontSize={7} fill="#64748b" textAnchor="middle">Iron</text>
        <text x={150} y={119} fontSize={7} fill="#64748b" textAnchor="middle">core</text>
        {/* Primary coil (left, many turns) */}
        {[0,1,2,3,4,5,6].map(i => (
          <ellipse key={i} cx={110} cy={65 + i * 13} rx={18} ry={8}
            fill="none" stroke="#3b82f6" strokeWidth={1.5} />
        ))}
        <line x1={92} y1={65} x2={50} y2={65} stroke="#3b82f6" strokeWidth={1.2} />
        <line x1={92} y1={148} x2={50} y2={148} stroke="#3b82f6" strokeWidth={1.2} />
        {/* AC source on left */}
        <circle cx={35} cy={107} r={15} fill="#1e293b" stroke="#3b82f6" strokeWidth={1.2} />
        <path d="M27,107 Q31,100 35,107 Q39,114 43,107" fill="none" stroke="#3b82f6" strokeWidth={1} />
        <line x1={50} y1={65} x2={50} y2={92} stroke="#3b82f6" strokeWidth={1.2} />
        <line x1={50} y1={122} x2={50} y2={148} stroke="#3b82f6" strokeWidth={1.2} />
        {/* Secondary coil (right, fewer turns) */}
        {[0,1,2,3].map(i => (
          <ellipse key={i} cx={190} cy={75 + i * 20} rx={18} ry={9}
            fill="none" stroke="#f59e0b" strokeWidth={1.5} />
        ))}
        <line x1={208} y1={75} x2={250} y2={75} stroke="#f59e0b" strokeWidth={1.2} />
        <line x1={208} y1={135} x2={250} y2={135} stroke="#f59e0b" strokeWidth={1.2} />
        {/* Labels */}
        <text x={90} y={175} fontSize={7} fill="#93c5fd" textAnchor="middle">Primary, Vp</text>
        <text x={90} y={184} fontSize={7} fill="#93c5fd" textAnchor="middle">(many turns)</text>
        <text x={210} y={175} fontSize={7} fill="#fbbf24" textAnchor="middle">Secondary, Vs</text>
        <text x={210} y={184} fontSize={7} fill="#fbbf24" textAnchor="middle">(fewer turns)</text>
      </svg>
    </div>
  );
}

export function DomesticPlugWires() {
  return (
    <div className="w-full">
      <svg viewBox="0 0 300 200" className="w-full h-auto">
        <text x="150" y="14" fontSize={9} fill="#94a3b8" textAnchor="middle">UK Domestic Plug — Wiring</text>
        {/* Plug outline */}
        <rect x={60} y={30} width={180} height={130} rx={20} fill="#1e293b" stroke="#475569" strokeWidth={2} />
        {/* Three pins */}
        <rect x={133} y={20} width={34} height={16} rx={3} fill="#64748b" stroke="#475569" strokeWidth={1} />
        <text x={150} y={31} fontSize={7} fill="#e2e8f0" textAnchor="middle">Earth</text>
        <rect x={78} y={148} width={30} height={16} rx={3} fill="#64748b" stroke="#475569" strokeWidth={1} />
        <text x={93} y={159} fontSize={7} fill="#e2e8f0" textAnchor="middle">Live</text>
        <rect x={192} y={148} width={30} height={16} rx={3} fill="#64748b" stroke="#475569" strokeWidth={1} />
        <text x={207} y={159} fontSize={7} fill="#e2e8f0" textAnchor="middle">Neutral</text>
        {/* Wires inside plug */}
        {/* Earth wire: green/yellow */}
        <line x1={150} y1={36} x2={150} y2={110} stroke="#84cc16" strokeWidth={3} />
        <text x={162} y={75} fontSize={7} fill="#84cc16">Green/Yellow</text>
        <text x={162} y={84} fontSize={7} fill="#84cc16">(Earth)</text>
        {/* Live wire: brown */}
        <line x1={93} y1={148} x2={93} y2={100} stroke="#b45309" strokeWidth={3} />
        <line x1={93} y1={100} x2={130} y2={100} stroke="#b45309" strokeWidth={3} />
        <text x={68} y={130} fontSize={7} fill="#d97706">Brown</text>
        <text x={68} y={139} fontSize={7} fill="#d97706">(Live)</text>
        {/* Neutral wire: blue */}
        <line x1={207} y1={148} x2={207} y2={115} stroke="#3b82f6" strokeWidth={3} />
        <line x1={207} y1={115} x2={175} y2={115} stroke="#3b82f6" strokeWidth={3} />
        <text x={195} y={130} fontSize={7} fill="#93c5fd">Blue</text>
        <text x={195} y={139} fontSize={7} fill="#93c5fd">(Neutral)</text>
        {/* Fuse */}
        <rect x={125} y={96} width={28} height={10} rx={3} fill="#fbbf24" stroke="#f59e0b" strokeWidth={1} />
        <text x={139} y={104} fontSize={6} fill="#1e293b" textAnchor="middle" fontWeight="700">Fuse</text>
      </svg>
    </div>
  );
}

export function NationalGridFlow() {
  const items = [
    { x: 10,  w: 50, label1: "Power",    label2: "Station",   color: "#3b82f6" },
    { x: 75,  w: 50, label1: "Step-up",  label2: "Transformer", color: "#60a5fa" },
    { x: 145, w: 50, label1: "400 kV",   label2: "Cables",    color: "#94a3b8" },
    { x: 210, w: 50, label1: "Step-down",label2: "Transformer", color: "#60a5fa" },
    { x: 275, w: 50, label1: "230 V",    label2: "Homes",     color: "#3b82f6" },
  ];
  return (
    <div className="w-full">
      <svg viewBox="0 0 340 200" className="w-full h-auto">
        <text x="170" y="14" fontSize={9} fill="#94a3b8" textAnchor="middle">The National Grid</text>
        {items.map((item, i) => (
          <g key={i}>
            <rect x={item.x} y={70} width={item.w} height={50} rx={5} fill="#1e293b" stroke={item.color} strokeWidth={1.5} />
            <text x={item.x + item.w / 2} y={90} fontSize={6.5} fill={item.color} textAnchor="middle" fontWeight="600">{item.label1}</text>
            <text x={item.x + item.w / 2} y={101} fontSize={6.5} fill={item.color} textAnchor="middle" fontWeight="600">{item.label2}</text>
          </g>
        ))}
        {/* Wavy line for cables section */}
        <path d="M170,95 Q177,88 184,95 Q191,102 198,95" fill="none" stroke="#94a3b8" strokeWidth={1} />
        {/* Arrows between boxes */}
        {[60, 125, 195, 260].map((ax, i) => (
          <g key={i}>
            <line x1={ax} y1={95} x2={ax + 12} y2={95} stroke="#3b82f6" strokeWidth={1.5} />
            <polygon points={`${ax + 12},95 ${ax + 7},92 ${ax + 7},98`} fill="#3b82f6" />
          </g>
        ))}
        <text x="170" y="148" fontSize={7} fill="#64748b" textAnchor="middle">High voltage reduces energy loss (P = I^2 R)</text>
        <text x="170" y="160" fontSize={7} fill="#64748b" textAnchor="middle">Transformers use electromagnetic induction (AC only)</text>
      </svg>
    </div>
  );
}

export function StaticChargeDiagram() {
  return (
    <div className="w-full">
      <svg viewBox="0 0 300 200" className="w-full h-auto">
        <text x="150" y="14" fontSize={9} fill="#94a3b8" textAnchor="middle">Static Charge — Friction and Induction</text>
        {/* Left: Perspex rod */}
        <rect x={20} y={60} width={80} height={25} rx={5} fill="#dbeafe" stroke="#3b82f6" strokeWidth={1.2} opacity="0.7" />
        <text x={60} y={74} fontSize={7} fill="#1e3a5f" textAnchor="middle">Perspex rod</text>
        {/* Cloth */}
        <rect x={20} y={88} width={80} height={20} rx={3} fill="#fef3c7" stroke="#f59e0b" strokeWidth={1} opacity="0.7" />
        <text x={60} y={101} fontSize={7} fill="#78350f" textAnchor="middle">Cloth</text>
        {/* + charges on rod */}
        {[30,45,60,75,90].map(cx => (
          <text key={cx} x={cx} y={68} fontSize={8} fill="#ef4444" textAnchor="middle">+</text>
        ))}
        {/* - charges on cloth */}
        {[30,45,60,75,90].map(cx => (
          <text key={cx} x={cx} y={100} fontSize={8} fill="#3b82f6" textAnchor="middle">-</text>
        ))}
        {/* Arrow showing electron transfer */}
        <text x={60} y={55} fontSize={7} fill="#94a3b8" textAnchor="middle">e- transferred to cloth</text>
        {/* Right: charged rod near neutral sphere */}
        <rect x={175} y={60} width={40} height={20} rx={4} fill="#dbeafe" stroke="#3b82f6" strokeWidth={1.2} opacity="0.7" />
        {[180,190,200,210].map(cx => (
          <text key={cx} x={cx} y={74} fontSize={7} fill="#ef4444" textAnchor="middle">+</text>
        ))}
        <text x={195} y={55} fontSize={7} fill="#94a3b8" textAnchor="middle">Charged rod</text>
        {/* Sphere */}
        <circle cx={245} cy={100} r={30} fill="#1e293b" stroke="#475569" strokeWidth={1.5} />
        {/* Induced charges: - near rod, + far side */}
        {[225,230,232].map((cx,i) => (
          <text key={i} x={cx} y={100 + (i-1)*8} fontSize={8} fill="#3b82f6">-</text>
        ))}
        {[255,258,260].map((cx,i) => (
          <text key={i} x={cx} y={100 + (i-1)*8} fontSize={8} fill="#ef4444">+</text>
        ))}
        <text x={245} y={142} fontSize={7} fill="#94a3b8" textAnchor="middle">Neutral sphere</text>
        <text x={245} y={151} fontSize={7} fill="#64748b" textAnchor="middle">(charge induced)</text>
        {/* Labels */}
        <text x={60} y={125} fontSize={7} fill="#94a3b8" textAnchor="middle">Friction transfers</text>
        <text x={60} y={134} fontSize={7} fill="#94a3b8" textAnchor="middle">electrons to cloth</text>
      </svg>
    </div>
  );
}

// ─── FORCES GROUP (accent: #00a8e8 / cyan) ───────────────────────────────────

export function FreeBodyStationary() {
  return (
    <div className="w-full">
      <svg viewBox="0 0 300 200" className="w-full h-auto">
        <text x="150" y="14" fontSize={9} fill="#94a3b8" textAnchor="middle">Free Body Diagram — Stationary Object</text>
        {/* Box */}
        <rect x={120} y={80} width={60} height={50} rx={4} fill="#1e293b" stroke="#475569" strokeWidth={1.5} />
        {/* Weight arrow down */}
        <line x1={150} y1={130} x2={150} y2={165} stroke="#00a8e8" strokeWidth={2} />
        <polygon points="150,168 146,160 154,160" fill="#00a8e8" />
        <text x={162} y={155} fontSize={7} fill="#00a8e8">Weight 10 N</text>
        {/* Normal reaction up */}
        <line x1={150} y1={80} x2={150} y2={45} stroke="#00a8e8" strokeWidth={2} />
        <polygon points="150,42 146,50 154,50" fill="#00a8e8" />
        <text x={155} y={62} fontSize={7} fill="#00a8e8">Normal 10 N</text>
        {/* Friction left */}
        <line x1={120} y1={105} x2={85} y2={105} stroke="#f97316" strokeWidth={2} />
        <polygon points="82,105 90,101 90,109" fill="#f97316" />
        <text x={65} y={101} fontSize={7} fill="#f97316">Friction</text>
        <text x={65} y={110} fontSize={7} fill="#f97316">5 N</text>
        {/* Applied right */}
        <line x1={180} y1={105} x2={215} y2={105} stroke="#f97316" strokeWidth={2} />
        <polygon points="218,105 210,101 210,109" fill="#f97316" />
        <text x={218} y={101} fontSize={7} fill="#f97316">Applied</text>
        <text x={218} y={110} fontSize={7} fill="#f97316">5 N</text>
        {/* Resultant label */}
        <text x={150} y={187} fontSize={8} fill="#94a3b8" textAnchor="middle">Resultant = 0 N (equilibrium)</text>
      </svg>
    </div>
  );
}

export function FreeBodyAccelerating() {
  return (
    <div className="w-full">
      <svg viewBox="0 0 300 200" className="w-full h-auto">
        <text x="150" y="14" fontSize={9} fill="#94a3b8" textAnchor="middle">Free Body Diagram — Accelerating Object</text>
        {/* Box */}
        <rect x={115} y={80} width={60} height={50} rx={4} fill="#1e293b" stroke="#475569" strokeWidth={1.5} />
        {/* Applied force (large, right) */}
        <line x1={175} y1={105} x2={240} y2={105} stroke="#00a8e8" strokeWidth={2.5} />
        <polygon points="243,105 233,100 233,110" fill="#00a8e8" />
        <text x={210} y={97} fontSize={7} fill="#00a8e8">Applied</text>
        <text x={210} y={106} fontSize={7} fill="#00a8e8">15 N</text>
        {/* Friction (smaller, left) */}
        <line x1={115} y1={105} x2={80} y2={105} stroke="#f97316" strokeWidth={2} />
        <polygon points="77,105 87,100 87,110" fill="#f97316" />
        <text x={60} y={100} fontSize={7} fill="#f97316">Friction</text>
        <text x={60} y={109} fontSize={7} fill="#f97316">5 N</text>
        {/* Acceleration arrow above box */}
        <line x1={120} y1={68} x2={175} y2={68} stroke="#22c55e" strokeWidth={2} />
        <polygon points="178,68 168,64 168,72" fill="#22c55e" />
        <text x={148} y={62} fontSize={7} fill="#22c55e" textAnchor="middle">Acceleration</text>
        {/* Resultant label */}
        <text x={150} y={165} fontSize={8} fill="#94a3b8" textAnchor="middle">Resultant = 15 - 5 = 10 N</text>
        <text x={150} y={178} fontSize={7} fill="#64748b" textAnchor="middle">F = ma so object accelerates right</text>
      </svg>
    </div>
  );
}

export function MomentArmSpanner() {
  return (
    <div className="w-full">
      <svg viewBox="0 0 300 200" className="w-full h-auto">
        <text x="150" y="14" fontSize={9} fill="#94a3b8" textAnchor="middle">Moment and Moment Arm</text>
        {/* Bolt/nut at pivot */}
        <circle cx={80} cy={100} r={14} fill="#475569" stroke="#64748b" strokeWidth={2} />
        <circle cx={80} cy={100} r={6} fill="#1e293b" stroke="#94a3b8" strokeWidth={1} />
        <text x={80} y={123} fontSize={7} fill="#94a3b8" textAnchor="middle">Pivot</text>
        {/* Spanner handle */}
        <rect x={80} y={93} width={160} height={14} rx={5} fill="#334155" stroke="#475569" strokeWidth={1.5} />
        {/* Force arrow downward at end of handle */}
        <line x1={240} y1={107} x2={240} y2={150} stroke="#00a8e8" strokeWidth={2} />
        <polygon points="240,153 236,145 244,145" fill="#00a8e8" />
        <text x={255} y={130} fontSize={7} fill="#00a8e8">F (force)</text>
        {/* Perpendicular dashed line (moment arm) from pivot to force line */}
        <line x1={80} y1={100} x2={240} y2={100} stroke="#00a8e8" strokeWidth={1} strokeDasharray="5,3" />
        {/* Dimension arrow */}
        <line x1={80} y1={74} x2={240} y2={74} stroke="#00a8e8" strokeWidth={1} />
        <polygon points="80,74 88,70 88,78" fill="#00a8e8" />
        <polygon points="240,74 232,70 232,78" fill="#00a8e8" />
        <text x={160} y={70} fontSize={7} fill="#00a8e8" textAnchor="middle">d (perpendicular distance)</text>
        {/* Formula */}
        <text x={150} y={180} fontSize={8} fill="#94a3b8" textAnchor="middle">Moment (N m) = F x d</text>
        <text x={150} y={192} fontSize={7} fill="#64748b" textAnchor="middle">Larger d means larger turning effect</text>
      </svg>
    </div>
  );
}

export function HookesLawGraph() {
  return (
    <div className="w-full">
      <svg viewBox="0 0 300 200" className="w-full h-auto">
        <text x="150" y="14" fontSize={9} fill="#94a3b8" textAnchor="middle">Hooke's Law Graph</text>
        {/* Axes */}
        <line x1={40} y1={170} x2={270} y2={170} stroke="#475569" strokeWidth={1.2} />
        <line x1={40} y1={170} x2={40} y2={25} stroke="#475569" strokeWidth={1.2} />
        <text x={155} y={187} fontSize={8} fill="#94a3b8" textAnchor="middle">Extension (cm)</text>
        <text x={12} y={100} fontSize={8} fill="#94a3b8" textAnchor="middle" transform="rotate(-90,12,100)">Force (N)</text>
        {/* Grid */}
        {[50,80,110,140].map(y => (
          <line key={y} x1={40} y1={y} x2={270} y2={y} stroke="#1e293b" strokeWidth={0.6} />
        ))}
        {/* Linear Hooke's law region */}
        <line x1={40} y1={170} x2={170} y2={70} stroke="#00a8e8" strokeWidth={2} />
        {/* Plastic region (curve away after elastic limit) */}
        <path d="M170,70 Q200,55 240,45 Q255,42 265,45" fill="none" stroke="#ef4444" strokeWidth={2} />
        {/* Elastic limit marker */}
        <circle cx={170} cy={70} r={4} fill="#fbbf24" stroke="#f59e0b" strokeWidth={1} />
        <line x1={170} y1={70} x2={170} y2={170} stroke="#fbbf24" strokeWidth={0.8} strokeDasharray="4,3" />
        <text x={175} y={52} fontSize={7} fill="#fbbf24">Elastic limit</text>
        {/* Labels */}
        <text x={100} y={130} fontSize={7} fill="#00a8e8">Linear region</text>
        <text x={100} y={139} fontSize={7} fill="#00a8e8">(Hooke's Law)</text>
        <text x={230} y={60} fontSize={7} fill="#ef4444">Plastic</text>
        <text x={230} y={69} fontSize={7} fill="#ef4444">region</text>
        <text x={155} y={185} fontSize={7} fill="#64748b" textAnchor="middle">F = ke (spring constant x extension)</text>
      </svg>
    </div>
  );
}

export function VTGraphUniform() {
  return (
    <div className="w-full">
      <svg viewBox="0 0 300 200" className="w-full h-auto">
        <text x="150" y="14" fontSize={9} fill="#94a3b8" textAnchor="middle">Velocity-Time Graph (Uniform Acceleration)</text>
        {/* Shaded area under line */}
        <polygon points="40,170 260,50 260,170" fill="#00a8e8" opacity="0.12" />
        {/* Axes */}
        <line x1={40} y1={170} x2={270} y2={170} stroke="#475569" strokeWidth={1.2} />
        <line x1={40} y1={170} x2={40} y2={25} stroke="#475569" strokeWidth={1.2} />
        <text x={155} y={187} fontSize={8} fill="#94a3b8" textAnchor="middle">Time (s)</text>
        <text x={12} y={100} fontSize={8} fill="#94a3b8" textAnchor="middle" transform="rotate(-90,12,100)">Velocity (m/s)</text>
        {/* Grid */}
        {[80,110,140].map(y => (
          <line key={y} x1={40} y1={y} x2={270} y2={y} stroke="#1e293b" strokeWidth={0.6} />
        ))}
        {[100,160,220].map(x => (
          <line key={x} x1={x} y1={170} x2={x} y2={25} stroke="#1e293b" strokeWidth={0.6} />
        ))}
        {/* V-T line */}
        <line x1={40} y1={170} x2={260} y2={50} stroke="#00a8e8" strokeWidth={2.5} />
        {/* Axis labels */}
        <text x={40} y={180} fontSize={6} fill="#64748b" textAnchor="middle">0</text>
        <text x={260} y={180} fontSize={6} fill="#64748b" textAnchor="middle">6 s</text>
        <text x={32} y={53} fontSize={6} fill="#64748b" textAnchor="end">30</text>
        {/* Gradient label */}
        <text x={175} y={125} fontSize={7} fill="#94a3b8" textAnchor="middle">Gradient = acceleration</text>
        <text x={175} y={134} fontSize={7} fill="#94a3b8" textAnchor="middle">(a = dv/dt)</text>
        {/* Area label */}
        <text x={195} y={162} fontSize={7} fill="#00a8e8" textAnchor="middle">Area = displacement</text>
      </svg>
    </div>
  );
}

export function VTGraphTerminalVelocity() {
  return (
    <div className="w-full">
      <svg viewBox="0 0 300 200" className="w-full h-auto">
        <text x="150" y="14" fontSize={9} fill="#94a3b8" textAnchor="middle">V-T Graph — Terminal Velocity</text>
        {/* Axes */}
        <line x1={40} y1={170} x2={270} y2={170} stroke="#475569" strokeWidth={1.2} />
        <line x1={40} y1={170} x2={40} y2={25} stroke="#475569" strokeWidth={1.2} />
        <text x={155} y={187} fontSize={8} fill="#94a3b8" textAnchor="middle">Time (s)</text>
        <text x={12} y={100} fontSize={8} fill="#94a3b8" textAnchor="middle" transform="rotate(-90,12,100)">Velocity (m/s)</text>
        {/* Terminal velocity dashed line */}
        <line x1={40} y1={55} x2={270} y2={55} stroke="#00a8e8" strokeWidth={1} strokeDasharray="6,3" />
        <text x={272} y={58} fontSize={7} fill="#00a8e8">vT</text>
        {/* Curve */}
        <path d="M40,170 Q70,80 120,62 Q160,52 200,55 Q230,55 270,55"
          fill="none" stroke="#00a8e8" strokeWidth={2.5} />
        {/* Labels on curve */}
        <text x={75} y={105} fontSize={7} fill="#22c55e">Accelerating</text>
        <text x={75} y={114} fontSize={7} fill="#22c55e">(resultant F down)</text>
        <text x={200} y={44} fontSize={7} fill="#00a8e8" textAnchor="middle">Terminal velocity</text>
        <text x={200} y={38} fontSize={7} fill="#64748b" textAnchor="middle">(weight = drag)</text>
        {/* Arrow pointing to flat section */}
        <line x1={200} y1={46} x2={218} y2={55} stroke="#00a8e8" strokeWidth={0.8} />
      </svg>
    </div>
  );
}

export function STGraphTypes() {
  return (
    <div className="w-full">
      <svg viewBox="0 0 300 200" className="w-full h-auto">
        <text x="150" y="14" fontSize={9} fill="#94a3b8" textAnchor="middle">Distance-Time Graph Types</text>
        {/* Axes */}
        <line x1={40} y1={165} x2={260} y2={165} stroke="#475569" strokeWidth={1.2} />
        <line x1={40} y1={165} x2={40} y2={30} stroke="#475569" strokeWidth={1.2} />
        <text x={150} y={182} fontSize={8} fill="#94a3b8" textAnchor="middle">Time (s)</text>
        <text x={12} y={100} fontSize={8} fill="#94a3b8" textAnchor="middle" transform="rotate(-90,12,100)">Distance (m)</text>
        {/* Stationary: horizontal */}
        <line x1={40} y1={120} x2={260} y2={120} stroke="#64748b" strokeWidth={1.8} />
        {/* Constant velocity: diagonal */}
        <line x1={40} y1={165} x2={260} y2={55} stroke="#3b82f6" strokeWidth={1.8} />
        {/* Accelerating: curve */}
        <path d="M40,165 Q100,155 160,130 Q210,110 260,55" fill="none" stroke="#00a8e8" strokeWidth={1.8} />
        {/* Legend */}
        <line x1={50} y1={30} x2={70} y2={30} stroke="#64748b" strokeWidth={2} />
        <text x={73} y={33} fontSize={7} fill="#64748b">Stationary</text>
        <line x1={50} y1={42} x2={70} y2={42} stroke="#3b82f6" strokeWidth={2} />
        <text x={73} y={45} fontSize={7} fill="#3b82f6">Constant velocity</text>
        <line x1={50} y1={54} x2={70} y2={54} stroke="#00a8e8" strokeWidth={2} />
        <text x={73} y={57} fontSize={7} fill="#00a8e8">Accelerating</text>
        <text x={150} y={195} fontSize={7} fill="#64748b" textAnchor="middle">Gradient of s-t graph = velocity</text>
      </svg>
    </div>
  );
}

export function StoppingDistanceSplit() {
  return (
    <div className="w-full">
      <svg viewBox="0 0 300 200" className="w-full h-auto">
        <text x="150" y="14" fontSize={9} fill="#94a3b8" textAnchor="middle">Stopping Distance</text>
        {/* 30 mph row */}
        <text x={25} y={68} fontSize={8} fill="#94a3b8" textAnchor="end">30 mph</text>
        {/* Thinking distance */}
        <rect x={30} y={55} width={70} height={22} rx={3} fill="#f59e0b" opacity={0.8} />
        <text x={65} y={69} fontSize={7} fill="#1e293b" textAnchor="middle" fontWeight="700">Thinking 9 m</text>
        {/* Braking distance */}
        <rect x={100} y={55} width={80} height={22} rx={3} fill="#ef4444" opacity={0.8} />
        <text x={140} y={69} fontSize={7} fill="#fff" textAnchor="middle" fontWeight="700">Braking 14 m</text>
        {/* Total brace */}
        <line x1={30} y1={83} x2={180} y2={83} stroke="#94a3b8" strokeWidth={0.8} />
        <text x={105} y={93} fontSize={7} fill="#94a3b8" textAnchor="middle">Total: 23 m</text>
        {/* 60 mph row */}
        <text x={25} y={128} fontSize={8} fill="#94a3b8" textAnchor="end">60 mph</text>
        {/* Thinking distance */}
        <rect x={30} y={115} width={90} height={22} rx={3} fill="#f59e0b" opacity={0.8} />
        <text x={75} y={129} fontSize={7} fill="#1e293b" textAnchor="middle" fontWeight="700">Thinking 18 m</text>
        {/* Braking distance */}
        <rect x={120} y={115} width={145} height={22} rx={3} fill="#ef4444" opacity={0.8} />
        <text x={192} y={129} fontSize={7} fill="#fff" textAnchor="middle" fontWeight="700">Braking 55 m</text>
        {/* Total brace */}
        <line x1={30} y1={143} x2={265} y2={143} stroke="#94a3b8" strokeWidth={0.8} />
        <text x={148} y={153} fontSize={7} fill="#94a3b8" textAnchor="middle">Total: 73 m</text>
        {/* Legend */}
        <rect x={30} y={168} width={12} height={8} fill="#f59e0b" opacity={0.8} rx={1} />
        <text x={45} y={175} fontSize={7} fill="#f59e0b">Thinking distance (reaction time)</text>
        <rect x={30} y={180} width={12} height={8} fill="#ef4444" opacity={0.8} rx={1} />
        <text x={45} y={187} fontSize={7} fill="#ef4444">Braking distance</text>
      </svg>
    </div>
  );
}

export function MomentumCollision() {
  return (
    <div className="w-full">
      <svg viewBox="0 0 300 200" className="w-full h-auto">
        <text x="150" y="14" fontSize={9} fill="#94a3b8" textAnchor="middle">Conservation of Momentum</text>
        {/* Before */}
        <text x={150} y={32} fontSize={8} fill="#94a3b8" textAnchor="middle">Before Collision</text>
        {/* Block A (left, moving right) */}
        <rect x={30} y={50} width={50} height={35} rx={4} fill="#1e293b" stroke="#00a8e8" strokeWidth={1.5} />
        <text x={55} y={68} fontSize={8} fill="#00a8e8" textAnchor="middle" fontWeight="700">2 kg</text>
        <line x1={80} y1={67} x2={105} y2={67} stroke="#22c55e" strokeWidth={2} />
        <polygon points="108,67 99,63 99,71" fill="#22c55e" />
        <text x={90} y={60} fontSize={7} fill="#22c55e">8 m/s</text>
        {/* Block B (right, moving left) */}
        <rect x={190} y={50} width={50} height={35} rx={4} fill="#1e293b" stroke="#f97316" strokeWidth={1.5} />
        <text x={215} y={68} fontSize={8} fill="#f97316" textAnchor="middle" fontWeight="700">3 kg</text>
        <line x1={190} y1={67} x2={165} y2={67} stroke="#ef4444" strokeWidth={2} />
        <polygon points="162,67 171,63 171,71" fill="#ef4444" />
        <text x={178} y={60} fontSize={7} fill="#ef4444">4 m/s</text>
        {/* After */}
        <text x={150} y={112} fontSize={8} fill="#94a3b8" textAnchor="middle">After Collision</text>
        {/* Combined block */}
        <rect x={90} y={125} width={120} height={35} rx={4} fill="#1e293b" stroke="#a855f7" strokeWidth={1.5} />
        <text x={150} y={140} fontSize={8} fill="#a855f7" textAnchor="middle" fontWeight="700">5 kg (combined)</text>
        <text x={150} y={151} fontSize={7} fill="#a855f7" textAnchor="middle">1.6 m/s right</text>
        <line x1={210} y1={142} x2={230} y2={142} stroke="#a855f7" strokeWidth={2} />
        <polygon points="233,142 224,138 224,146" fill="#a855f7" />
        {/* Conservation note */}
        <text x={150} y={180} fontSize={7} fill="#64748b" textAnchor="middle">p_before = (2x8)+(3x-4) = 4 kg m/s</text>
        <text x={150} y={190} fontSize={7} fill="#64748b" textAnchor="middle">p_after = 5 x 1.6 = 4 kg m/s</text>
      </svg>
    </div>
  );
}

export function FluidPressureDepth() {
  return (
    <div className="w-full">
      <svg viewBox="0 0 300 200" className="w-full h-auto">
        <text x="150" y="14" fontSize={9} fill="#94a3b8" textAnchor="middle">Fluid Pressure vs Depth</text>
        {/* Beaker outline */}
        <rect x={70} y={30} width={160} height={150} rx={4} fill="#0e1f3a" stroke="#475569" strokeWidth={1.5} />
        {/* Water label */}
        <text x={150} y={52} fontSize={8} fill="#60a5fa" textAnchor="middle">Water</text>
        {/* Pressure arrows at different depths */}
        {[
          { y: 65,  len: 18 },
          { y: 95,  len: 28 },
          { y: 125, len: 38 },
          { y: 155, len: 52 },
        ].map(({ y, len }) => (
          <g key={y}>
            {/* Left arrow pointing inward */}
            <line x1={72} y1={y} x2={72 + len} y2={y} stroke="#3b82f6" strokeWidth={1.8} />
            <polygon points={`${72},${y} ${72+8},${y-3} ${72+8},${y+3}`} fill="#3b82f6" />
            {/* Right arrow pointing inward */}
            <line x1={228} y1={y} x2={228 - len} y2={y} stroke="#3b82f6" strokeWidth={1.8} />
            <polygon points={`${228},${y} ${228-8},${y-3} ${228-8},${y+3}`} fill="#3b82f6" />
          </g>
        ))}
        {/* Depth bracket */}
        <line x1={248} y1={30} x2={248} y2={180} stroke="#00a8e8" strokeWidth={1} />
        <line x1={244} y1={30} x2={252} y2={30} stroke="#00a8e8" strokeWidth={1} />
        <line x1={244} y1={180} x2={252} y2={180} stroke="#00a8e8" strokeWidth={1} />
        <text x={260} y={100} fontSize={7} fill="#00a8e8" transform="rotate(90,260,100)">Depth h</text>
        {/* Formula */}
        <text x={150} y={193} fontSize={8} fill="#3b82f6" textAnchor="middle">P = rho * g * h</text>
      </svg>
    </div>
  );
}

// ─── WAVES GROUP (accent: #fdc700) ───────────────────────────────────────────

export function TransverseWaveLabelled() {
  const wavePoints = [];
  for (let x = 30; x <= 270; x += 2) {
    const t = (x - 30) / (240 / 2);
    const y = 100 - 45 * Math.sin(t * Math.PI);
    wavePoints.push(`${x},${y}`);
  }
  return (
    <div className="w-full">
      <svg viewBox="0 0 300 200" className="w-full h-auto">
        <text x="150" y="14" fontSize={9} fill="#94a3b8" textAnchor="middle">Transverse Wave</text>
        {/* Midline */}
        <line x1={30} y1={100} x2={270} y2={100} stroke="#334155" strokeWidth={1} strokeDasharray="4,3" />
        {/* Wave */}
        <polyline points={wavePoints.join(' ')} fill="none" stroke="#fdc700" strokeWidth={2} />
        {/* Amplitude arrow: from midline to crest at x~60 */}
        <line x1={60} y1={100} x2={60} y2={55} stroke="#f97316" strokeWidth={1.5} />
        <polygon points="60,52 56,60 64,60" fill="#f97316" />
        <polygon points="60,103 56,96 64,96" fill="#f97316" />
        <text x={18} y={78} fontSize={7} fill="#f97316">Amplitude</text>
        {/* Wavelength arrow: crest to crest (x~60 to x~180) */}
        <line x1={60} y1={44} x2={180} y2={44} stroke="#fdc700" strokeWidth={1.2} />
        <polygon points="60,44 68,40 68,48" fill="#fdc700" />
        <polygon points="180,44 172,40 172,48" fill="#fdc700" />
        <text x={120} y={40} fontSize={7} fill="#fdc700" textAnchor="middle">Wavelength lambda</text>
        {/* Crest label */}
        <text x={60} y={50} fontSize={7} fill="#94a3b8" textAnchor="middle">Crest</text>
        {/* Trough label */}
        <text x={120} y={158} fontSize={7} fill="#94a3b8" textAnchor="middle">Trough</text>
        <line x1={120} y1={150} x2={120} y2={146} stroke="#94a3b8" strokeWidth={0.8} />
        {/* Direction */}
        <text x={150} y={183} fontSize={7} fill="#94a3b8" textAnchor="middle">Direction of energy transfer</text>
      </svg>
    </div>
  );
}

export function LongitudinalWaveLabelled() {
  const lines = [];
  for (let i = 0; i <= 40; i++) {
    const baseX = 30 + i * 6;
    const t = (baseX - 30) / 240 * 4 * Math.PI;
    const displacement = 10 * Math.sin(t);
    lines.push(baseX + displacement);
  }
  return (
    <div className="w-full">
      <svg viewBox="0 0 300 200" className="w-full h-auto">
        <text x="150" y="14" fontSize={9} fill="#94a3b8" textAnchor="middle">Longitudinal Wave</text>
        {lines.map((x, i) => (
          <line key={i} x1={x} y1={60} x2={x} y2={140} stroke="#fdc700" strokeWidth={1.2} opacity={0.7} />
        ))}
        {/* Compression labels */}
        <text x={55} y={155} fontSize={7} fill="#fdc700" textAnchor="middle">Compression</text>
        <line x1={55} y1={143} x2={55} y2={140} stroke="#fdc700" strokeWidth={0.8} />
        <text x={155} y={155} fontSize={7} fill="#fdc700" textAnchor="middle">Compression</text>
        <line x1={155} y1={143} x2={155} y2={140} stroke="#fdc700" strokeWidth={0.8} />
        {/* Rarefaction labels */}
        <text x={105} y={52} fontSize={7} fill="#94a3b8" textAnchor="middle">Rarefaction</text>
        <line x1={105} y1={54} x2={105} y2={60} stroke="#94a3b8" strokeWidth={0.8} />
        <text x={205} y={52} fontSize={7} fill="#94a3b8" textAnchor="middle">Rarefaction</text>
        <line x1={205} y1={54} x2={205} y2={60} stroke="#94a3b8" strokeWidth={0.8} />
        {/* Wavelength arrow */}
        <line x1={55} y1={170} x2={155} y2={170} stroke="#fdc700" strokeWidth={1.2} />
        <polygon points="55,170 63,166 63,174" fill="#fdc700" />
        <polygon points="155,170 147,166 147,174" fill="#fdc700" />
        <text x={105} y={183} fontSize={7} fill="#fdc700" textAnchor="middle">Wavelength lambda</text>
        <text x={150} y={195} fontSize={7} fill="#64748b" textAnchor="middle">Direction of oscillation = direction of energy</text>
      </svg>
    </div>
  );
}

export function RefractionGlassBlock() {
  return (
    <div className="w-full">
      <svg viewBox="0 0 300 200" className="w-full h-auto">
        <text x="150" y="14" fontSize={9} fill="#94a3b8" textAnchor="middle">Refraction at a Glass Block</text>
        {/* Glass block */}
        <rect x={80} y={70} width={140} height={80} rx={4} fill="#1e3a5f" stroke="#3b82f6" strokeWidth={1.2} opacity="0.7" />
        <text x={150} y={112} fontSize={8} fill="#60a5fa" textAnchor="middle">Glass block</text>
        {/* Normal (dashed) */}
        <line x1={150} y1={20} x2={150} y2={180} stroke="#475569" strokeWidth={1} strokeDasharray="5,3" />
        <text x={260} y={68} fontSize={7} fill="#475569">Normal</text>
        {/* Incident ray */}
        <line x1={80} y1={30} x2={150} y2={70} stroke="#fdc700" strokeWidth={2} />
        <polygon points="150,70 141,63 147,75" fill="#fdc700" />
        <text x={85} y={45} fontSize={7} fill="#fdc700">Incident ray</text>
        {/* Angle i */}
        <path d="M150,70 A20,20 0 0,0 140,55" fill="none" stroke="#fdc700" strokeWidth={1} />
        <text x={133} y={60} fontSize={7} fill="#fdc700">i</text>
        {/* Refracted ray inside glass */}
        <line x1={150} y1={70} x2={165} y2={150} stroke="#fdc700" strokeWidth={2} />
        <polygon points="165,150 159,142 169,145" fill="#fdc700" />
        {/* Angle r */}
        <path d="M150,70 A22,22 0 0,1 163,83" fill="none" stroke="#22c55e" strokeWidth={1} />
        <text x={162} y={78} fontSize={7} fill="#22c55e">r</text>
        {/* Exit ray */}
        <line x1={165} y1={150} x2={210} y2={185} stroke="#fdc700" strokeWidth={2} />
        <polygon points="210,185 200,178 208,174" fill="#fdc700" />
        <text x={220} y={180} fontSize={7} fill="#fdc700">Refracted ray</text>
        {/* Label */}
        <text x={150} y={195} fontSize={7} fill="#64748b" textAnchor="middle">r is less than i: ray bends toward normal</text>
      </svg>
    </div>
  );
}

export function TotalInternalReflection() {
  return (
    <div className="w-full">
      <svg viewBox="0 0 300 200" className="w-full h-auto">
        <text x="150" y="14" fontSize={9} fill="#94a3b8" textAnchor="middle">Total Internal Reflection</text>
        {/* Semi-circular glass shape */}
        <path d="M50,140 A100,100 0 0,1 250,140 Z" fill="#1e3a5f" stroke="#3b82f6" strokeWidth={1.5} opacity="0.8" />
        <line x1={50} y1={140} x2={250} y2={140} stroke="#3b82f6" strokeWidth={1.5} />
        <text x={150} y={130} fontSize={7} fill="#60a5fa" textAnchor="middle">Glass</text>
        {/* Normal at flat surface */}
        <line x1={150} y1={100} x2={150} y2={165} stroke="#475569" strokeWidth={1} strokeDasharray="4,3" />
        {/* Incident ray from inside */}
        <line x1={75} y1={95} x2={150} y2={140} stroke="#fdc700" strokeWidth={2} />
        <polygon points="150,140 141,138 145,130" fill="#fdc700" />
        {/* TIR reflected ray */}
        <line x1={150} y1={140} x2={225} y2={95} stroke="#fdc700" strokeWidth={2} />
        <polygon points="225,95 218,101 222,108" fill="#fdc700" />
        <text x={108} y={110} fontSize={7} fill="#fdc700">TIR occurs</text>
        {/* Critical angle ray (dotted) */}
        <line x1={110} y1={110} x2={150} y2={140} stroke="#f97316" strokeWidth={1.2} strokeDasharray="4,3" />
        <line x1={150} y1={140} x2={250} y2={140} stroke="#f97316" strokeWidth={1.2} strokeDasharray="4,3" />
        <text x={205} y={136} fontSize={6} fill="#f97316">Critical angle</text>
        {/* Labels */}
        <text x={150} y={172} fontSize={7} fill="#94a3b8" textAnchor="middle">Fibre optic cable: TIR keeps light inside</text>
        <text x={150} y={183} fontSize={7} fill="#64748b" textAnchor="middle">sin(theta_c) = 1/n</text>
      </svg>
    </div>
  );
}

export function ConvergingLensRealImage() {
  return (
    <div className="w-full">
      <svg viewBox="0 0 300 200" className="w-full h-auto">
        <text x="150" y="14" fontSize={9} fill="#94a3b8" textAnchor="middle">Converging Lens — Real Image</text>
        {/* Principal axis */}
        <line x1={15} y1={100} x2={285} y2={100} stroke="#334155" strokeWidth={1} />
        {/* Biconvex lens (two arcs) */}
        <path d="M148,55 Q168,100 148,145 Q130,100 148,55 Z" fill="#1e3a5f" stroke="#fdc700" strokeWidth={1.5} opacity="0.8" />
        <path d="M152,55 Q172,100 152,145 Q134,100 152,55 Z" fill="#1e3a5f" stroke="#fdc700" strokeWidth={1.5} opacity="0.8" />
        {/* F and 2F markers left */}
        <line x1={60} y1={96} x2={60} y2={104} stroke="#fdc700" strokeWidth={1} />
        <text x={60} y={112} fontSize={7} fill="#fdc700" textAnchor="middle">2F</text>
        <line x1={105} y1={96} x2={105} y2={104} stroke="#fdc700" strokeWidth={1} />
        <text x={105} y={112} fontSize={7} fill="#fdc700" textAnchor="middle">F</text>
        {/* F and 2F markers right */}
        <line x1={195} y1={96} x2={195} y2={104} stroke="#fdc700" strokeWidth={1} />
        <text x={195} y={112} fontSize={7} fill="#fdc700" textAnchor="middle">F</text>
        <line x1={240} y1={96} x2={240} y2={104} stroke="#fdc700" strokeWidth={1} />
        <text x={240} y={112} fontSize={7} fill="#fdc700" textAnchor="middle">2F</text>
        {/* Object (upward arrow) at x=75 */}
        <line x1={75} y1={100} x2={75} y2={65} stroke="#22c55e" strokeWidth={2} />
        <polygon points="75,62 71,71 79,71" fill="#22c55e" />
        <text x={75} y={58} fontSize={7} fill="#22c55e" textAnchor="middle">Object</text>
        {/* Ray 1: parallel to axis through F on right */}
        <line x1={75} y1={65} x2={150} y2={65} stroke="#fdc700" strokeWidth={1.2} />
        <line x1={150} y1={65} x2={195} y2={100} stroke="#fdc700" strokeWidth={1.2} />
        <line x1={195} y1={100} x2={220} y2={128} stroke="#fdc700" strokeWidth={1.2} />
        {/* Ray 2: through optical centre */}
        <line x1={75} y1={65} x2={220} y2={128} stroke="#f97316" strokeWidth={1.2} strokeDasharray="4,2" />
        {/* Image (downward arrow) at x=220 */}
        <line x1={220} y1={100} x2={220} y2={128} stroke="#ef4444" strokeWidth={2} />
        <polygon points="220,131 216,122 224,122" fill="#ef4444" />
        <text x={232} y={118} fontSize={7} fill="#ef4444">Image</text>
        <text x={232} y={127} fontSize={7} fill="#ef4444">(real, inv)</text>
      </svg>
    </div>
  );
}

export function EMSpectrumBar() {
  const segments = [
    { label: "Radio",      color: "#6366f1", freq: "10^3 Hz" },
    { label: "Microwave",  color: "#8b5cf6", freq: "10^9" },
    { label: "Infrared",   color: "#f97316", freq: "10^12" },
    { label: "Visible",    color: "#fdc700", freq: "10^14" },
    { label: "UV",         color: "#a855f7", freq: "10^15" },
    { label: "X-ray",      color: "#60a5fa", freq: "10^17" },
    { label: "Gamma",      color: "#ec4899", freq: "10^20" },
  ];
  const segW = 36;
  const startX = 20;
  return (
    <div className="w-full">
      <svg viewBox="0 0 300 200" className="w-full h-auto">
        <text x="150" y="14" fontSize={9} fill="#94a3b8" textAnchor="middle">Electromagnetic Spectrum</text>
        {segments.map((seg, i) => (
          <g key={i}>
            <rect x={startX + i * segW} y={55} width={segW} height={35} rx={2}
              fill={seg.color} opacity={0.7} />
            <text x={startX + i * segW + segW / 2} y={69} fontSize={5.5} fill="#fff"
              textAnchor="middle" fontWeight="700">{seg.label}</text>
            <text x={startX + i * segW + segW / 2} y={81} fontSize={5} fill="#ffffffbb"
              textAnchor="middle">{seg.freq}</text>
          </g>
        ))}
        {/* Frequency arrow */}
        <line x1={20} y1={105} x2={272} y2={105} stroke="#94a3b8" strokeWidth={1.2} />
        <polygon points="272,105 263,101 263,109" fill="#94a3b8" />
        <text x={146} y={118} fontSize={7} fill="#94a3b8" textAnchor="middle">Increasing frequency</text>
        {/* Wavelength arrow */}
        <line x1={272} y1={128} x2={20} y2={128} stroke="#64748b" strokeWidth={1.2} />
        <polygon points="20,128 29,124 29,132" fill="#64748b" />
        <text x={146} y={141} fontSize={7} fill="#64748b" textAnchor="middle">Increasing wavelength</text>
        {/* Note */}
        <text x={150} y={158} fontSize={7.5} fill="#94a3b8" textAnchor="middle">All travel at c = 3 x 10^8 m/s in vacuum</text>
        <text x={150} y={170} fontSize={7} fill="#64748b" textAnchor="middle">v = f * lambda</text>
      </svg>
    </div>
  );
}

export function ReflectionMirror() {
  return (
    <div className="w-full">
      <svg viewBox="0 0 300 200" className="w-full h-auto">
        <text x="150" y="14" fontSize={9} fill="#94a3b8" textAnchor="middle">Law of Reflection</text>
        {/* Flat mirror */}
        <line x1={40} y1={130} x2={260} y2={130} stroke="#94a3b8" strokeWidth={2.5} />
        {/* Hatch marks on mirror */}
        {[50,70,90,110,130,150,170,190,210,230,250].map(x => (
          <line key={x} x1={x} y1={130} x2={x - 8} y2={142} stroke="#475569" strokeWidth={1} />
        ))}
        {/* Normal (dashed) */}
        <line x1={150} y1={80} x2={150} y2={170} stroke="#475569" strokeWidth={1} strokeDasharray="5,3" />
        <text x={165} y={90} fontSize={7} fill="#475569">Normal</text>
        {/* Incident ray */}
        <line x1={80} y1={65} x2={150} y2={130} stroke="#fdc700" strokeWidth={2} />
        <polygon points="150,130 141,120 150,127" fill="#fdc700" />
        {/* Reflected ray */}
        <line x1={150} y1={130} x2={220} y2={65} stroke="#fdc700" strokeWidth={2} />
        <polygon points="220,65 213,75 223,75" fill="#fdc700" />
        {/* Angle i */}
        <path d="M150,130 A30,30 0 0,0 128,109" fill="none" stroke="#fdc700" strokeWidth={1} />
        <text x={127} y={108} fontSize={8} fill="#fdc700">i</text>
        {/* Angle r */}
        <path d="M150,130 A30,30 0 0,1 172,109" fill="none" stroke="#fdc700" strokeWidth={1} />
        <text x={172} y={108} fontSize={8} fill="#fdc700">r</text>
        {/* Labels */}
        <text x={90} y={80} fontSize={7} fill="#fdc700">Incident ray</text>
        <text x={210} y={80} fontSize={7} fill="#fdc700">Reflected ray</text>
        <text x={150} y={160} fontSize={8} fill="#94a3b8" textAnchor="middle">Angle i = Angle r</text>
        <text x={150} y={172} fontSize={7} fill="#64748b" textAnchor="middle">Measured from the normal, not the surface</text>
      </svg>
    </div>
  );
}

// ─── PARTICLE MODEL GROUP (accent: #c084fc / purple) ─────────────────────────

export function ParticleThreeStates() {
  const solidPositions = [
    [20,30],[40,30],[60,30],[80,30],
    [20,50],[40,50],[60,50],[80,50],
    [20,70],[40,70],[60,70],[80,70],
  ];
  const liquidPositions = [
    [23,32],[45,28],[65,34],[83,30],
    [18,52],[42,55],[63,49],[80,55],
    [25,72],[48,68],[68,74],[82,68],
  ];
  const gasPositions = [
    [15,25],[55,18],[85,30],
    [25,55],[70,50],
    [10,80],[48,78],[82,72],
  ];
  return (
    <div className="w-full">
      <svg viewBox="0 0 300 200" className="w-full h-auto">
        <text x="150" y="14" fontSize={9} fill="#94a3b8" textAnchor="middle">Three States of Matter</text>
        {/* Solid panel */}
        <rect x={10} y={22} width={95} height={80} rx={5} fill="#1e293b" stroke="#c084fc" strokeWidth={1.2} />
        {solidPositions.map(([cx, cy], i) => (
          <circle key={i} cx={cx + 10} cy={cy + 22} r={8} fill="#a855f7" opacity={0.7} stroke="#c084fc" strokeWidth={0.5} />
        ))}
        <text x={57} y={118} fontSize={8} fill="#c084fc" textAnchor="middle">Solid</text>
        <text x={57} y={128} fontSize={6.5} fill="#64748b" textAnchor="middle">Regular, vibrate</text>
        {/* Liquid panel */}
        <rect x={112} y={22} width={82} height={80} rx={5} fill="#1e293b" stroke="#c084fc" strokeWidth={1.2} />
        {liquidPositions.map(([cx, cy], i) => (
          <circle key={i} cx={cx + 112} cy={cy + 22} r={8} fill="#7c3aed" opacity={0.65} stroke="#c084fc" strokeWidth={0.5} />
        ))}
        <text x={153} y={118} fontSize={8} fill="#c084fc" textAnchor="middle">Liquid</text>
        <text x={153} y={128} fontSize={6.5} fill="#64748b" textAnchor="middle">Close, random</text>
        {/* Gas panel */}
        <rect x={202} y={22} width={90} height={80} rx={5} fill="#1e293b" stroke="#c084fc" strokeWidth={1.2} />
        {gasPositions.map(([cx, cy], i) => (
          <g key={i}>
            <circle cx={cx + 202} cy={cy + 22} r={7} fill="#6d28d9" opacity={0.6} stroke="#c084fc" strokeWidth={0.5} />
            <line x1={cx + 202 + 7} y1={cy + 22} x2={cx + 202 + 13} y2={cy + 22 - 4} stroke="#c084fc" strokeWidth={0.8} />
          </g>
        ))}
        <text x={247} y={118} fontSize={8} fill="#c084fc" textAnchor="middle">Gas</text>
        <text x={247} y={128} fontSize={6.5} fill="#64748b" textAnchor="middle">Widely spaced</text>
        {/* Notes */}
        <text x={150} y={148} fontSize={7} fill="#94a3b8" textAnchor="middle">Energy input: melting then boiling (state changes)</text>
        <text x={150} y={160} fontSize={7} fill="#64748b" textAnchor="middle">Density: solid &gt; liquid &gt;&gt; gas</text>
      </svg>
    </div>
  );
}

export function LatentHeatGraph() {
  return (
    <div className="w-full">
      <svg viewBox="0 0 300 200" className="w-full h-auto">
        <text x="150" y="14" fontSize={9} fill="#94a3b8" textAnchor="middle">Temperature vs Energy — Latent Heat</text>
        {/* Axes */}
        <line x1={40} y1={170} x2={270} y2={170} stroke="#475569" strokeWidth={1.2} />
        <line x1={40} y1={170} x2={40} y2={25} stroke="#475569" strokeWidth={1.2} />
        <text x={155} y={187} fontSize={8} fill="#94a3b8" textAnchor="middle">Energy Supplied (J)</text>
        <text x={12} y={100} fontSize={8} fill="#94a3b8" textAnchor="middle" transform="rotate(-90,12,100)">Temperature (°C)</text>
        {/* Markers */}
        <line x1={35} y1={130} x2={40} y2={130} stroke="#c084fc" strokeWidth={1} />
        <text x={30} y={133} fontSize={6.5} fill="#c084fc" textAnchor="end">0</text>
        <line x1={35} y1={80} x2={40} y2={80} stroke="#c084fc" strokeWidth={1} />
        <text x={30} y={83} fontSize={6.5} fill="#c084fc" textAnchor="end">100</text>
        {/* Curve: rise flat rise flat rise */}
        <polyline
          points="40,165 70,130 110,130 140,80 180,80 220,35 255,25"
          fill="none" stroke="#c084fc" strokeWidth={2} strokeLinejoin="round" />
        {/* Flat section labels */}
        <text x={90} y={122} fontSize={7} fill="#e879f9" textAnchor="middle">Latent heat</text>
        <text x={90} y={131} fontSize={7} fill="#e879f9" textAnchor="middle">(melting)</text>
        <text x={160} y={72} fontSize={7} fill="#e879f9" textAnchor="middle">Latent heat</text>
        <text x={160} y={81} fontSize={7} fill="#e879f9" textAnchor="middle">(boiling)</text>
        {/* Region labels */}
        <text x={55} y={155} fontSize={6.5} fill="#94a3b8" textAnchor="middle">Ice</text>
        <text x={127} y={105} fontSize={6.5} fill="#94a3b8" textAnchor="middle">Water</text>
        <text x={237} y={50} fontSize={6.5} fill="#94a3b8" textAnchor="middle">Steam</text>
      </svg>
    </div>
  );
}

export function BoyleLawGraph() {
  const points = [];
  for (let v = 0.5; v <= 5; v += 0.1) {
    const p = 2.5 / v;
    const x = 50 + (v - 0.5) / 4.5 * 200;
    const y = 170 - (p - 0.5) / 4.5 * 140;
    if (y > 25 && y < 170) points.push(`${x},${y}`);
  }
  const p1x = 50 + (1 - 0.5) / 4.5 * 200;
  const p1y = 170 - (2.5 - 0.5) / 4.5 * 140;
  const p2x = 50 + (2.5 - 0.5) / 4.5 * 200;
  const p2y = 170 - (1 - 0.5) / 4.5 * 140;
  return (
    <div className="w-full">
      <svg viewBox="0 0 300 200" className="w-full h-auto">
        <text x="150" y="14" fontSize={9} fill="#94a3b8" textAnchor="middle">Boyle's Law — Pressure vs Volume</text>
        {/* Axes */}
        <line x1={50} y1={170} x2={260} y2={170} stroke="#475569" strokeWidth={1.2} />
        <line x1={50} y1={170} x2={50} y2={25} stroke="#475569" strokeWidth={1.2} />
        <text x={155} y={187} fontSize={8} fill="#94a3b8" textAnchor="middle">Volume (m^3)</text>
        <text x={14} y={100} fontSize={8} fill="#94a3b8" textAnchor="middle" transform="rotate(-90,14,100)">Pressure (Pa)</text>
        {/* Hyperbola */}
        <polyline points={points.join(' ')} fill="none" stroke="#c084fc" strokeWidth={2} />
        {/* Point P1 */}
        <circle cx={p1x} cy={p1y} r={3.5} fill="#e879f9" />
        <line x1={p1x} y1={p1y} x2={p1x} y2={170} stroke="#c084fc" strokeWidth={0.8} strokeDasharray="3,2" />
        <line x1={p1x} y1={p1y} x2={50} y2={p1y} stroke="#c084fc" strokeWidth={0.8} strokeDasharray="3,2" />
        <text x={p1x} y={180} fontSize={6} fill="#c084fc" textAnchor="middle">V1</text>
        <text x={42} y={p1y+2} fontSize={6} fill="#c084fc" textAnchor="end">P1</text>
        {/* Point P2 */}
        <circle cx={p2x} cy={p2y} r={3.5} fill="#e879f9" />
        <line x1={p2x} y1={p2y} x2={p2x} y2={170} stroke="#c084fc" strokeWidth={0.8} strokeDasharray="3,2" />
        <line x1={p2x} y1={p2y} x2={50} y2={p2y} stroke="#c084fc" strokeWidth={0.8} strokeDasharray="3,2" />
        <text x={p2x} y={180} fontSize={6} fill="#c084fc" textAnchor="middle">V2</text>
        <text x={42} y={p2y+2} fontSize={6} fill="#c084fc" textAnchor="end">P2</text>
        {/* Equation */}
        <text x={200} y={60} fontSize={8} fill="#e879f9" textAnchor="middle">P1V1 = P2V2</text>
        <text x={200} y={72} fontSize={7} fill="#64748b" textAnchor="middle">P is proportional to 1/V</text>
        <text x={150} y={195} fontSize={7} fill="#64748b" textAnchor="middle">Temperature constant (isothermal)</text>
      </svg>
    </div>
  );
}

export function GasSyringePressure() {
  return (
    <div className="w-full">
      <svg viewBox="0 0 300 200" className="w-full h-auto">
        <text x="150" y="14" fontSize={9} fill="#94a3b8" textAnchor="middle">Gas Syringe — Boyle's Law</text>
        {/* Left syringe: larger volume */}
        <rect x={20} y={50} width={110} height={60} rx={4} fill="#1e293b" stroke="#c084fc" strokeWidth={1.5} />
        {/* Piston */}
        <rect x={118} y={45} width={14} height={70} rx={3} fill="#475569" stroke="#64748b" strokeWidth={1} />
        {/* Handle */}
        <line x1={132} y1={80} x2={150} y2={80} stroke="#94a3b8" strokeWidth={2} />
        {/* Gas molecules scattered */}
        {[[35,65],[60,75],[85,65],[45,90],[70,90],[95,80],[40,78],[80,78]].map(([cx,cy],i) => (
          <circle key={i} cx={cx} cy={cy} r={4} fill="#c084fc" opacity={0.6} />
        ))}
        <text x={70} y={130} fontSize={7} fill="#c084fc" textAnchor="middle">Large volume</text>
        <text x={70} y={140} fontSize={7} fill="#64748b" textAnchor="middle">Low pressure</text>
        {/* Arrow: push piston */}
        <line x1={155} y1={80} x2={185} y2={80} stroke="#f97316" strokeWidth={2} />
        <polygon points="185,80 175,76 175,84" fill="#f97316" />
        <text x={170} y={72} fontSize={7} fill="#f97316" textAnchor="middle">Push</text>
        {/* Right syringe: smaller volume */}
        <rect x={190} y={50} width={60} height={60} rx={4} fill="#1e293b" stroke="#c084fc" strokeWidth={1.5} />
        {/* Piston */}
        <rect x={238} y={45} width={14} height={70} rx={3} fill="#475569" stroke="#64748b" strokeWidth={1} />
        {/* Handle */}
        <line x1={252} y1={80} x2={275} y2={80} stroke="#94a3b8" strokeWidth={2} />
        {/* Gas molecules crowded */}
        {[[200,60],[215,75],[230,60],[205,85],[220,90],[235,80],[210,70],[228,72]].map(([cx,cy],i) => (
          <circle key={i} cx={cx} cy={cy} r={4} fill="#e879f9" opacity={0.7} />
        ))}
        <text x={220} y={130} fontSize={7} fill="#c084fc" textAnchor="middle">Small volume</text>
        <text x={220} y={140} fontSize={7} fill="#64748b" textAnchor="middle">High pressure</text>
        {/* Labels */}
        <text x={150} y={165} fontSize={7} fill="#94a3b8" textAnchor="middle">Volume decreases: collisions with walls increase</text>
        <text x={150} y={177} fontSize={7} fill="#64748b" textAnchor="middle">P1V1 = P2V2 (temperature constant)</text>
      </svg>
    </div>
  );
}

// ─── ATOMIC / NUCLEAR GROUP (accent: #e879f9 / pink) ─────────────────────────

export function NuclearAtomModel() {
  return (
    <div className="w-full">
      <svg viewBox="0 0 300 200" className="w-full h-auto">
        <text x="150" y="14" fontSize={9} fill="#94a3b8" textAnchor="middle">Nuclear Atom Model</text>
        {/* Electron orbits */}
        <ellipse cx={150} cy={105} rx={100} ry={60} fill="none" stroke="#475569" strokeWidth={1} strokeDasharray="4,3" />
        <ellipse cx={150} cy={105} rx={70} ry={42} fill="none" stroke="#334155" strokeWidth={0.8} strokeDasharray="3,3" />
        {/* Nucleus: protons (red) and neutrons (grey) */}
        {[
          [148,103],[158,98],[140,98],[152,110],[144,110],
          [154,103],[146,104],[150,97],[150,113],[142,107]
        ].map(([cx,cy],i) => (
          <circle key={i} cx={cx} cy={cy} r={6}
            fill={i % 2 === 0 ? "#ef4444" : "#94a3b8"}
            opacity={0.85} stroke="#1e293b" strokeWidth={0.5} />
        ))}
        <text x={150} y={108} fontSize={5} fill="#fff" textAnchor="middle">Nucleus</text>
        {/* Electrons */}
        <circle cx={250} cy={105} r={4} fill="#e879f9" />
        <circle cx={112} cy={68} r={4} fill="#e879f9" />
        <circle cx={188} cy={150} r={4} fill="#e879f9" />
        {/* Labels */}
        <text x={260} y={102} fontSize={7} fill="#e879f9">Electron (-)</text>
        <text x={150} y={178} fontSize={7} fill="#ef4444" textAnchor="middle">Proton (+)</text>
        <text x={150} y={188} fontSize={7} fill="#94a3b8" textAnchor="middle">Neutron (neutral)</text>
        <text x={50} y={60} fontSize={7} fill="#64748b">Electrons orbit</text>
        <text x={50} y={69} fontSize={7} fill="#64748b">in shells</text>
      </svg>
    </div>
  );
}

export function AlphaDecayEquation() {
  return (
    <div className="w-full">
      <svg viewBox="0 0 300 200" className="w-full h-auto">
        <text x="150" y="18" fontSize={9} fill="#94a3b8" textAnchor="middle">Alpha Decay — Nuclear Equation</text>
        {/* Ra */}
        <text x={60} y={90} fontSize={22} fill="#e879f9" textAnchor="middle" fontWeight="700">Ra</text>
        <text x={42} y={75} fontSize={11} fill="#f9a8d4" textAnchor="middle">226</text>
        <text x={42} y={103} fontSize={11} fill="#f9a8d4" textAnchor="middle">88</text>
        {/* Arrow */}
        <line x1={88} y1={88} x2={118} y2={88} stroke="#94a3b8" strokeWidth={1.5} />
        <polygon points="118,88 110,84 110,92" fill="#94a3b8" />
        {/* Rn */}
        <text x={155} y={90} fontSize={22} fill="#e879f9" textAnchor="middle" fontWeight="700">Rn</text>
        <text x={137} y={75} fontSize={11} fill="#f9a8d4" textAnchor="middle">222</text>
        <text x={137} y={103} fontSize={11} fill="#f9a8d4" textAnchor="middle">86</text>
        {/* Plus */}
        <text x={190} y={93} fontSize={18} fill="#94a3b8" textAnchor="middle">+</text>
        {/* Alpha particle */}
        <text x={230} y={90} fontSize={22} fill="#fbbf24" textAnchor="middle" fontWeight="700">a</text>
        <text x={215} y={75} fontSize={11} fill="#fcd34d" textAnchor="middle">4</text>
        <text x={215} y={103} fontSize={11} fill="#fcd34d" textAnchor="middle">2</text>
        {/* Labels below */}
        <text x={60} y={120} fontSize={7} fill="#94a3b8" textAnchor="middle">Radium-226</text>
        <text x={155} y={120} fontSize={7} fill="#94a3b8" textAnchor="middle">Radon-222</text>
        <text x={230} y={120} fontSize={7} fill="#fbbf24" textAnchor="middle">Alpha particle</text>
        <text x={230} y={130} fontSize={7} fill="#64748b" textAnchor="middle">(helium nucleus)</text>
        {/* Conservation check */}
        <text x={150} y={150} fontSize={7} fill="#94a3b8" textAnchor="middle">Mass number: 226 = 222 + 4</text>
        <text x={150} y={161} fontSize={7} fill="#94a3b8" textAnchor="middle">Atomic number: 88 = 86 + 2</text>
        <text x={150} y={178} fontSize={7} fill="#64748b" textAnchor="middle">Alpha radiation: 2 protons + 2 neutrons</text>
        <text x={150} y={189} fontSize={7} fill="#64748b" textAnchor="middle">Stopped by paper or a few cm of air</text>
      </svg>
    </div>
  );
}

export function RadioactiveDecayGraph() {
  const tToX = t => 50 + t / 6 * 210;
  const nToY = n => 30 + (1 - n) * 130;
  const decayPts = [];
  for (let t = 0; t <= 6; t += 0.1) {
    decayPts.push(`${tToX(t)},${nToY(Math.exp(-Math.log(2) * t / 2))}`);
  }
  return (
    <div className="w-full">
      <svg viewBox="0 0 300 200" className="w-full h-auto">
        <text x="150" y="14" fontSize={9} fill="#94a3b8" textAnchor="middle">Radioactive Decay Curve</text>
        {/* Axes */}
        <line x1={50} y1={160} x2={265} y2={160} stroke="#475569" strokeWidth={1.2} />
        <line x1={50} y1={160} x2={50} y2={25} stroke="#475569" strokeWidth={1.2} />
        <text x={155} y={177} fontSize={8} fill="#94a3b8" textAnchor="middle">Time</text>
        <text x={14} y={95} fontSize={8} fill="#94a3b8" textAnchor="middle" transform="rotate(-90,14,95)">Count Rate</text>
        {/* Horizontal dashed lines */}
        <line x1={45} y1={nToY(1)} x2={265} y2={nToY(1)} stroke="#e879f9" strokeWidth={0.8} strokeDasharray="4,3" />
        <text x={42} y={nToY(1)+3} fontSize={6} fill="#e879f9" textAnchor="end">N0</text>
        <line x1={45} y1={nToY(0.5)} x2={265} y2={nToY(0.5)} stroke="#e879f9" strokeWidth={0.8} strokeDasharray="4,3" />
        <text x={42} y={nToY(0.5)+3} fontSize={6} fill="#e879f9" textAnchor="end">N0/2</text>
        <line x1={45} y1={nToY(0.25)} x2={265} y2={nToY(0.25)} stroke="#e879f9" strokeWidth={0.8} strokeDasharray="4,3" />
        <text x={42} y={nToY(0.25)+3} fontSize={6} fill="#e879f9" textAnchor="end">N0/4</text>
        {/* Vertical dashed lines */}
        <line x1={tToX(2)} y1={25} x2={tToX(2)} y2={160} stroke="#475569" strokeWidth={0.8} strokeDasharray="4,3" />
        <text x={tToX(2)} y={168} fontSize={6} fill="#94a3b8" textAnchor="middle">t1/2</text>
        <line x1={tToX(4)} y1={25} x2={tToX(4)} y2={160} stroke="#475569" strokeWidth={0.8} strokeDasharray="4,3" />
        <text x={tToX(4)} y={168} fontSize={6} fill="#94a3b8" textAnchor="middle">2*t1/2</text>
        {/* Decay curve */}
        <polyline points={decayPts.join(' ')} fill="none" stroke="#e879f9" strokeWidth={2} />
        {/* Half-life annotation */}
        <text x={160} y={62} fontSize={7} fill="#e879f9" textAnchor="middle">Half-life (t1/2)</text>
        <line x1={tToX(2)} y1={nToY(0.5)} x2={160} y2={65} stroke="#e879f9" strokeWidth={0.8} />
      </svg>
    </div>
  );
}

export function FissionChainReaction() {
  return (
    <div className="w-full">
      <svg viewBox="0 0 300 200" className="w-full h-auto">
        <text x="150" y="14" fontSize={9} fill="#94a3b8" textAnchor="middle">Nuclear Fission Chain Reaction</text>
        {/* First U-235 nucleus */}
        <circle cx={60} cy={95} r={18} fill="#1e293b" stroke="#e879f9" strokeWidth={1.5} />
        <text x={60} y={92} fontSize={6} fill="#e879f9" textAnchor="middle">U-235</text>
        <text x={60} y={101} fontSize={6} fill="#94a3b8" textAnchor="middle">nucleus</text>
        {/* Incoming neutron */}
        <circle cx={25} cy={95} r={5} fill="#fbbf24" />
        <line x1={30} y1={95} x2={42} y2={95} stroke="#fbbf24" strokeWidth={1.5} />
        <polygon points="42,95 35,91 35,99" fill="#fbbf24" />
        <text x={25} y={108} fontSize={6} fill="#fbbf24" textAnchor="middle">n</text>
        {/* Fission products */}
        <circle cx={115} cy={75} r={12} fill="#1e293b" stroke="#f97316" strokeWidth={1.2} />
        <text x={115} y={79} fontSize={6} fill="#f97316" textAnchor="middle">Fission</text>
        <circle cx={115} cy={115} r={12} fill="#1e293b" stroke="#f97316" strokeWidth={1.2} />
        <text x={115} y={119} fontSize={6} fill="#f97316" textAnchor="middle">product</text>
        {/* 3 neutrons out */}
        <line x1={78} y1={87} x2={105} y2={67} stroke="#fbbf24" strokeWidth={1.2} />
        <polygon points="105,67 97,68 100,76" fill="#fbbf24" />
        <line x1={78} y1={95} x2={140} y2={95} stroke="#fbbf24" strokeWidth={1.2} />
        <line x1={78} y1={103} x2={105} y2={123} stroke="#fbbf24" strokeWidth={1.2} />
        <polygon points="105,123 98,116 106,113" fill="#fbbf24" />
        {/* Second generation U-235 targets */}
        <circle cx={185} cy={58} r={14} fill="#1e293b" stroke="#e879f9" strokeWidth={1.2} />
        <text x={185} y={55} fontSize={5.5} fill="#e879f9" textAnchor="middle">U-235</text>
        <text x={185} y={63} fontSize={5.5} fill="#94a3b8" textAnchor="middle">fissions</text>
        <circle cx={185} cy={135} r={14} fill="#1e293b" stroke="#e879f9" strokeWidth={1.2} />
        <text x={185} y={132} fontSize={5.5} fill="#e879f9" textAnchor="middle">U-235</text>
        <text x={185} y={140} fontSize={5.5} fill="#94a3b8" textAnchor="middle">fissions</text>
        {/* Neutrons to second gen */}
        <line x1={140} y1={95} x2={171} y2={64} stroke="#fbbf24" strokeWidth={1} />
        <line x1={140} y1={95} x2={171} y2={130} stroke="#fbbf24" strokeWidth={1} />
        {/* More products */}
        <circle cx={248} cy={45} r={9} fill="#1e293b" stroke="#f97316" strokeWidth={1} />
        <circle cx={248} cy={70} r={9} fill="#1e293b" stroke="#f97316" strokeWidth={1} />
        <circle cx={248} cy={120} r={9} fill="#1e293b" stroke="#f97316" strokeWidth={1} />
        <circle cx={248} cy={148} r={9} fill="#1e293b" stroke="#f97316" strokeWidth={1} />
        <line x1={199} y1={53} x2={239} y2={46} stroke="#fbbf24" strokeWidth={0.8} />
        <line x1={199} y1={62} x2={239} y2={70} stroke="#fbbf24" strokeWidth={0.8} />
        <line x1={199} y1={128} x2={239} y2={120} stroke="#fbbf24" strokeWidth={0.8} />
        <line x1={199} y1={140} x2={239} y2={148} stroke="#fbbf24" strokeWidth={0.8} />
        {/* Labels */}
        <text x={150} y={180} fontSize={7} fill="#94a3b8" textAnchor="middle">Each fission releases ~3 neutrons: chain reaction</text>
        <text x={150} y={191} fontSize={7} fill="#64748b" textAnchor="middle">Controlled in reactors; uncontrolled in bombs</text>
      </svg>
    </div>
  );
}

export function RutherfordScattering() {
  return (
    <div className="w-full">
      <svg viewBox="0 0 300 200" className="w-full h-auto">
        <text x="150" y="14" fontSize={9} fill="#94a3b8" textAnchor="middle">Rutherford Scattering Experiment</text>
        {/* Gold foil */}
        <rect x={140} y={25} width={8} height={155} rx={2} fill="#fbbf24" opacity={0.5} stroke="#fdc700" strokeWidth={1} />
        <text x={144} y={190} fontSize={6.5} fill="#fdc700" textAnchor="middle">Gold foil</text>
        {/* Alpha source */}
        <rect x={10} y={88} width={30} height={24} rx={3} fill="#1e293b" stroke="#e879f9" strokeWidth={1.2} />
        <text x={25} y={102} fontSize={6} fill="#e879f9" textAnchor="middle">a source</text>
        {/* Most alphas pass straight through */}
        {[50,70,90,110,130].map(y => (
          <g key={y}>
            <line x1={40} y1={y} x2={140} y2={y} stroke="#e879f9" strokeWidth={1} opacity={0.6} />
            <line x1={148} y1={y} x2={270} y2={y} stroke="#e879f9" strokeWidth={1} opacity={0.6} />
            <polygon points={`270,${y} 261,${y-3} 261,${y+3}`} fill="#e879f9" opacity={0.6} />
          </g>
        ))}
        {/* Slight deflections */}
        <path d="M40,75 L140,80 L200,60" fill="none" stroke="#f97316" strokeWidth={1.5} />
        <polygon points="200,60 193,64 196,72" fill="#f97316" />
        <path d="M40,115 L140,115 L195,140" fill="none" stroke="#f97316" strokeWidth={1.5} />
        <polygon points="195,140 192,131 200,133" fill="#f97316" />
        {/* Back-scatter (rare) */}
        <path d="M40,100 L130,100 L45,55" fill="none" stroke="#ef4444" strokeWidth={2} />
        <polygon points="45,55 50,65 42,63" fill="#ef4444" />
        <text x={30} y={50} fontSize={7} fill="#ef4444">Back-scatter</text>
        <text x={30} y={59} fontSize={7} fill="#ef4444">(rare!)</text>
        {/* Labels */}
        <text x={220} y={100} fontSize={7} fill="#94a3b8">Most pass</text>
        <text x={220} y={109} fontSize={7} fill="#94a3b8">straight</text>
        <text x={220} y={118} fontSize={7} fill="#94a3b8">through</text>
        <text x={150} y={185} fontSize={7} fill="#64748b" textAnchor="middle">Conclusion: nucleus is tiny, dense, positive</text>
      </svg>
    </div>
  );
}

export function HalfLifeDecayGraph() {
  const tToX = t => 50 + t / 6 * 210;
  const cToY = c => 30 + (1 - c / 800) * 140;
  const steps = [[0,800],[2,400],[4,200],[6,100]];
  return (
    <div className="w-full">
      <svg viewBox="0 0 300 200" className="w-full h-auto">
        <text x="150" y="14" fontSize={9} fill="#94a3b8" textAnchor="middle">Half-Life Decay (Count Rate)</text>
        {/* Axes */}
        <line x1={50} y1={170} x2={265} y2={170} stroke="#475569" strokeWidth={1.2} />
        <line x1={50} y1={170} x2={50} y2={25} stroke="#475569" strokeWidth={1.2} />
        <text x={155} y={187} fontSize={8} fill="#94a3b8" textAnchor="middle">Time (hours)</text>
        <text x={14} y={95} fontSize={7} fill="#94a3b8" textAnchor="middle" transform="rotate(-90,14,95)">Count Rate (cps)</text>
        {/* Y-axis ticks */}
        {[800,400,200,100].map(c => (
          <g key={c}>
            <line x1={45} y1={cToY(c)} x2={50} y2={cToY(c)} stroke="#e879f9" strokeWidth={1} />
            <text x={42} y={cToY(c)+3} fontSize={6} fill="#e879f9" textAnchor="end">{c}</text>
          </g>
        ))}
        {/* X-axis ticks */}
        {[0,2,4,6].map(t => (
          <g key={t}>
            <line x1={tToX(t)} y1={170} x2={tToX(t)} y2={175} stroke="#94a3b8" strokeWidth={1} />
            <text x={tToX(t)} y={182} fontSize={6} fill="#94a3b8" textAnchor="middle">{t}</text>
          </g>
        ))}
        {/* Step bars */}
        {steps.map(([t,c], i) => {
          const nextT = steps[i+1]?.[0] ?? 8;
          return (
            <rect key={t}
              x={tToX(t)} y={cToY(c)}
              width={tToX(nextT) - tToX(t)}
              height={170 - cToY(c)}
              fill="#e879f9" opacity={0.25} stroke="#e879f9" strokeWidth={1} />
          );
        })}
        {/* Smooth exponential overlay */}
        <polyline
          points={Array.from({length:61},(_,i)=>{
            const t=i*6/60;
            const c=800*Math.exp(-Math.log(2)*t/2);
            return `${tToX(t)},${cToY(c)}`;
          }).join(' ')}
          fill="none" stroke="#e879f9" strokeWidth={2} />
        {/* Half-life labels */}
        <text x={tToX(2)} y={22} fontSize={6.5} fill="#e879f9" textAnchor="middle">t1/2 = 2 h</text>
        <line x1={tToX(2)} y1={25} x2={tToX(2)} y2={cToY(400)} stroke="#475569" strokeWidth={0.8} strokeDasharray="3,2" />
        <line x1={50} y1={cToY(400)} x2={tToX(2)} y2={cToY(400)} stroke="#475569" strokeWidth={0.8} strokeDasharray="3,2" />
      </svg>
    </div>
  );
}

// ─── MAGNETISM GROUP (accent: #10b981 / green) ───────────────────────────────

export function MotorEffectWire() {
  return (
    <div className="w-full">
      <svg viewBox="0 0 300 200" className="w-full h-auto">
        <text x="150" y="14" fontSize={9} fill="#94a3b8" textAnchor="middle">Motor Effect — Force on a Wire</text>
        {/* North magnet (top) */}
        <rect x={80} y={25} width={140} height={40} rx={5} fill="#ef4444" opacity={0.7} stroke="#dc2626" strokeWidth={1.5} />
        <text x={150} y={50} fontSize={12} fill="#fff" textAnchor="middle" fontWeight="700">N</text>
        {/* South magnet (bottom) */}
        <rect x={80} y={140} width={140} height={40} rx={5} fill="#3b82f6" opacity={0.7} stroke="#2563eb" strokeWidth={1.5} />
        <text x={150} y={165} fontSize={12} fill="#fff" textAnchor="middle" fontWeight="700">S</text>
        {/* Magnetic field lines downward */}
        {[110,135,160,185,210].map(x => (
          <g key={x}>
            <line x1={x} y1={65} x2={x} y2={140} stroke="#475569" strokeWidth={0.8} strokeDasharray="3,2" />
            <polygon points={`${x},140 ${x-3},132 ${x+3},132`} fill="#475569" />
          </g>
        ))}
        <text x={235} y={105} fontSize={7} fill="#94a3b8">B field</text>
        <text x={235} y={114} fontSize={7} fill="#64748b">downward</text>
        {/* Wire cross-section: current into page */}
        <circle cx={150} cy={102} r={16} fill="#0b1121" stroke="#10b981" strokeWidth={2} />
        <line x1={139} y1={91} x2={161} y2={113} stroke="#10b981" strokeWidth={1.5} />
        <line x1={161} y1={91} x2={139} y2={113} stroke="#10b981" strokeWidth={1.5} />
        <text x={150} y={128} fontSize={6.5} fill="#10b981" textAnchor="middle">I into page</text>
        {/* Force arrow left */}
        <line x1={134} y1={102} x2={90} y2={102} stroke="#fdc700" strokeWidth={2.5} />
        <polygon points="90,102 99,98 99,106" fill="#fdc700" />
        <text x={78} y={95} fontSize={7} fill="#fdc700">F</text>
        <text x={78} y={104} fontSize={7} fill="#fdc700">(force)</text>
        <text x={150} y={190} fontSize={7} fill="#64748b" textAnchor="middle">F = BIL (Fleming's Left Hand Rule)</text>
      </svg>
    </div>
  );
}

export function TransformerCoils() {
  return (
    <div className="w-full">
      <svg viewBox="0 0 300 200" className="w-full h-auto">
        <text x="150" y="14" fontSize={9} fill="#94a3b8" textAnchor="middle">Transformer — Step Up (Coils)</text>
        {/* Iron core */}
        <rect x={105} y={45} width={90} height={120} rx={4} fill="#1e293b" stroke="#475569" strokeWidth={1.5} />
        <rect x={118} y={58} width={64} height={94} rx={3} fill="#0b1121" />
        <text x={150} y={108} fontSize={7} fill="#64748b" textAnchor="middle">Soft iron</text>
        <text x={150} y={117} fontSize={7} fill="#64748b" textAnchor="middle">core</text>
        {/* Primary coil: 4 turns (left) */}
        {[0,1,2,3].map(i => (
          <ellipse key={i} cx={105} cy={68 + i * 26} rx={18} ry={10}
            fill="none" stroke="#10b981" strokeWidth={1.8} />
        ))}
        <line x1={87} y1={68} x2={50} y2={68} stroke="#10b981" strokeWidth={1.2} />
        <line x1={87} y1={146} x2={50} y2={146} stroke="#10b981" strokeWidth={1.2} />
        {/* AC source */}
        <circle cx={35} cy={107} r={15} fill="#1e293b" stroke="#10b981" strokeWidth={1.2} />
        <path d="M28,107 Q31,100 35,107 Q39,114 42,107" fill="none" stroke="#10b981" strokeWidth={1} />
        <line x1={50} y1={68} x2={50} y2={92} stroke="#10b981" strokeWidth={1.2} />
        <line x1={50} y1={122} x2={50} y2={146} stroke="#10b981" strokeWidth={1.2} />
        <text x={80} y={170} fontSize={7} fill="#10b981" textAnchor="middle">Np = 4</text>
        {/* Secondary coil: 8 turns (right) */}
        {[0,1,2,3,4,5,6,7].map(i => (
          <ellipse key={i} cx={195} cy={58 + i * 13} rx={18} ry={7}
            fill="none" stroke="#f59e0b" strokeWidth={1.5} />
        ))}
        <line x1={213} y1={58} x2={255} y2={58} stroke="#f59e0b" strokeWidth={1.2} />
        <line x1={213} y1={149} x2={255} y2={149} stroke="#f59e0b" strokeWidth={1.2} />
        <text x={220} y={170} fontSize={7} fill="#f59e0b" textAnchor="middle">Ns = 8</text>
        {/* Flux arrows inside core */}
        {[75,100,125].map(y => (
          <g key={y}>
            <line x1={120} y1={y} x2={178} y2={y} stroke="#475569" strokeWidth={0.8} />
            <polygon points={`178,${y} 171,${y-2} 171,${y+2}`} fill="#475569" />
          </g>
        ))}
        {/* Step-up label */}
        <text x={150} y={188} fontSize={7.5} fill="#f59e0b" textAnchor="middle">Step-up: Vs = 2Vp (Ns/Np = 2)</text>
      </svg>
    </div>
  );
}

export function ACGeneratorCoil() {
  return (
    <div className="w-full">
      <svg viewBox="0 0 300 200" className="w-full h-auto">
        <text x="150" y="14" fontSize={9} fill="#94a3b8" textAnchor="middle">AC Generator — Rotating Coil</text>
        {/* Magnets N/S */}
        <rect x={20} y={50} width={50} height={110} rx={5} fill="#ef4444" opacity={0.7} stroke="#dc2626" strokeWidth={1.5} />
        <text x={45} y={108} fontSize={14} fill="#fff" textAnchor="middle" fontWeight="700">N</text>
        <rect x={230} y={50} width={50} height={110} rx={5} fill="#3b82f6" opacity={0.7} stroke="#2563eb" strokeWidth={1.5} />
        <text x={255} y={108} fontSize={14} fill="#fff" textAnchor="middle" fontWeight="700">S</text>
        {/* Rotating coil */}
        <rect x={90} y={65} width={120} height={80} rx={3} fill="none" stroke="#10b981" strokeWidth={2} transform="rotate(-10,150,105)" />
        <text x={150} y={102} fontSize={7} fill="#10b981" textAnchor="middle">Coil</text>
        {/* Rotation arrow */}
        <path d="M150,55 A30,12 0 0,1 180,58" fill="none" stroke="#10b981" strokeWidth={1.5} />
        <polygon points="180,58 174,52 178,62" fill="#10b981" />
        <text x={150} y={42} fontSize={7} fill="#10b981" textAnchor="middle">Rotation</text>
        {/* Slip rings */}
        <ellipse cx={150} cy={158} rx={12} ry={5} fill="none" stroke="#94a3b8" strokeWidth={1.2} />
        <ellipse cx={150} cy={165} rx={12} ry={5} fill="none" stroke="#94a3b8" strokeWidth={1.2} />
        <text x={175} y={162} fontSize={7} fill="#94a3b8">Slip rings</text>
        {/* External circuit with galvanometer */}
        <line x1={138} y1={160} x2={110} y2={160} stroke="#cbd5e1" strokeWidth={1.2} />
        <line x1={110} y1={160} x2={110} y2={180} stroke="#cbd5e1" strokeWidth={1.2} />
        <line x1={110} y1={180} x2={190} y2={180} stroke="#cbd5e1" strokeWidth={1.2} />
        <line x1={190} y1={180} x2={190} y2={163} stroke="#cbd5e1" strokeWidth={1.2} />
        <line x1={190} y1={163} x2={162} y2={163} stroke="#cbd5e1" strokeWidth={1.2} />
        {/* Galvanometer */}
        <circle cx={150} cy={185} r={10} fill="#1e293b" stroke="#10b981" strokeWidth={1.2} />
        <text x={150} y={189} fontSize={7} fill="#10b981" textAnchor="middle">G</text>
        {/* Labels */}
        <text x={45} y={168} fontSize={7} fill="#94a3b8" textAnchor="middle">Magnets</text>
        <text x={255} y={168} fontSize={7} fill="#94a3b8" textAnchor="middle">Magnets</text>
      </svg>
    </div>
  );
}

export function EMInductionMagnet() {
  return (
    <div className="w-full">
      <svg viewBox="0 0 300 200" className="w-full h-auto">
        <text x="150" y="14" fontSize={9} fill="#94a3b8" textAnchor="middle">Electromagnetic Induction</text>
        {/* Bar magnet */}
        <rect x={20} y={80} width={80} height={40} rx={5} fill="#1e293b" stroke="#10b981" strokeWidth={1.5} />
        <rect x={20} y={80} width={40} height={40} rx={5} fill="#ef4444" opacity={0.7} />
        <rect x={60} y={80} width={40} height={40} rx={5} fill="#3b82f6" opacity={0.7} />
        <text x={40} y={104} fontSize={12} fill="#fff" textAnchor="middle" fontWeight="700">N</text>
        <text x={80} y={104} fontSize={12} fill="#fff" textAnchor="middle" fontWeight="700">S</text>
        {/* Arrow: magnet moving into coil */}
        <line x1={100} y1={100} x2={125} y2={100} stroke="#10b981" strokeWidth={2} />
        <polygon points="125,100 116,96 116,104" fill="#10b981" />
        <text x={75} y={72} fontSize={7} fill="#10b981" textAnchor="middle">Magnet moving in</text>
        {/* Coil (wound around a core) */}
        {[0,1,2,3,4].map(i => (
          <ellipse key={i} cx={148} cy={100} rx={22} ry={14 - i * 1.5}
            fill="none" stroke="#cbd5e1" strokeWidth={1.2} opacity={0.7 - i*0.1} />
        ))}
        <rect x={148} y={86} width={30} height={28} rx={2} fill="#1e293b" stroke="#475569" strokeWidth={1} />
        {/* Induced current circuit */}
        <line x1={178} y1={90} x2={220} y2={90} stroke="#10b981" strokeWidth={1.2} />
        <line x1={220} y1={90} x2={220} y2={140} stroke="#10b981" strokeWidth={1.2} />
        <line x1={220} y1={140} x2={155} y2={140} stroke="#10b981" strokeWidth={1.2} />
        <line x1={155} y1={140} x2={155} y2={114} stroke="#10b981" strokeWidth={1.2} />
        {/* Galvanometer */}
        <circle cx={222} cy={115} r={12} fill="#1e293b" stroke="#10b981" strokeWidth={1.2} />
        <text x={222} y={119} fontSize={8} fill="#10b981" textAnchor="middle">G</text>
        {/* Current direction arrow */}
        <polygon points="210,90 202,86 202,94" fill="#10b981" />
        <text x={195} y={83} fontSize={7} fill="#10b981" textAnchor="middle">Induced current</text>
        {/* Labels */}
        <text x={163} y={168} fontSize={7} fill="#94a3b8" textAnchor="middle">Induced EMF (Faraday's Law)</text>
        <text x={163} y={180} fontSize={7} fill="#64748b" textAnchor="middle">Faster motion or stronger magnet = larger EMF</text>
      </svg>
    </div>
  );
}

export function MagneticFieldLines() {
  return (
    <div className="w-full">
      <svg viewBox="0 0 300 200" className="w-full h-auto">
        <text x="150" y="14" fontSize={9} fill="#94a3b8" textAnchor="middle">Magnetic Field Lines — Bar Magnet</text>
        {/* Bar magnet */}
        <rect x={100} y={82} width={100} height={36} rx={4} fill="#1e293b" stroke="#475569" strokeWidth={1.5} />
        <rect x={100} y={82} width={50} height={36} rx={4} fill="#ef4444" opacity={0.7} />
        <rect x={150} y={82} width={50} height={36} rx={4} fill="#3b82f6" opacity={0.7} />
        <text x={125} y={104} fontSize={14} fill="#fff" textAnchor="middle" fontWeight="700">N</text>
        <text x={175} y={104} fontSize={14} fill="#fff" textAnchor="middle" fontWeight="700">S</text>
        {/* Field lines from N around to S — top arcs */}
        <path d="M125,82 Q150,55 175,82" fill="none" stroke="#10b981" strokeWidth={1.2} />
        <polygon points="162,66 158,74 166,72" fill="#10b981" />
        <path d="M125,82 Q150,35 175,82" fill="none" stroke="#10b981" strokeWidth={1} opacity={0.7} />
        <path d="M115,90 Q80,50 185,50 Q220,50 185,90" fill="none" stroke="#10b981" strokeWidth={1} opacity={0.6} />
        <polygon points="170,53 166,61 174,60" fill="#10b981" opacity={0.6} />
        {/* Bottom arcs */}
        <path d="M125,118 Q150,145 175,118" fill="none" stroke="#10b981" strokeWidth={1.2} />
        <polygon points="162,134 158,126 166,128" fill="#10b981" />
        <path d="M125,118 Q150,165 175,118" fill="none" stroke="#10b981" strokeWidth={1} opacity={0.7} />
        <path d="M115,110 Q80,150 185,150 Q220,150 185,110" fill="none" stroke="#10b981" strokeWidth={1} opacity={0.6} />
        <polygon points="170,147 166,139 174,140" fill="#10b981" opacity={0.6} />
        {/* Labels */}
        <text x={80} y={60} fontSize={7} fill="#10b981">Field lines</text>
        <text x={80} y={69} fontSize={7} fill="#10b981">N to S outside</text>
        <text x={150} y={185} fontSize={7} fill="#64748b" textAnchor="middle">Closer lines = stronger field (near poles)</text>
      </svg>
    </div>
  );
}

// ─── SPACE GROUP (accent: #6366f1 / indigo) ───────────────────────────────────

export function StellarEvolutionPath() {
  return (
    <div className="w-full">
      <svg viewBox="0 0 300 200" className="w-full h-auto">
        <text x="150" y="14" fontSize={9} fill="#94a3b8" textAnchor="middle">Stellar Evolution</text>
        {/* Nebula */}
        <rect x={5} y={80} width={52} height={30} rx={5} fill="#1e293b" stroke="#6366f1" strokeWidth={1.2} />
        <text x={31} y={97} fontSize={6.5} fill="#6366f1" textAnchor="middle">Nebula</text>
        {/* Arrow */}
        <line x1={57} y1={95} x2={72} y2={95} stroke="#6366f1" strokeWidth={1.2} />
        <polygon points="72,95 64,91 64,99" fill="#6366f1" />
        {/* Main sequence */}
        <rect x={73} y={80} width={70} height={30} rx={5} fill="#1e293b" stroke="#fdc700" strokeWidth={1.2} />
        <text x={108} y={93} fontSize={6} fill="#fdc700" textAnchor="middle">Main sequence</text>
        <text x={108} y={103} fontSize={6} fill="#64748b" textAnchor="middle">star (like Sun)</text>
        {/* Upper branch: Sun-like */}
        <line x1={143} y1={90} x2={155} y2={70} stroke="#6366f1" strokeWidth={1.2} />
        {/* Red giant */}
        <rect x={156} y={55} width={55} height={25} rx={5} fill="#1e293b" stroke="#f97316" strokeWidth={1.2} />
        <text x={183} y={65} fontSize={6} fill="#f97316" textAnchor="middle">Red giant</text>
        <text x={183} y={74} fontSize={5.5} fill="#64748b" textAnchor="middle">expands</text>
        <line x1={211} y1={67} x2={226} y2={67} stroke="#6366f1" strokeWidth={1.2} />
        <polygon points="226,67 218,63 218,71" fill="#6366f1" />
        {/* White dwarf */}
        <rect x={227} y={55} width={65} height={25} rx={5} fill="#1e293b" stroke="#e2e8f0" strokeWidth={1.2} />
        <text x={259} y={65} fontSize={6} fill="#e2e8f0" textAnchor="middle">White dwarf</text>
        <text x={259} y={74} fontSize={5.5} fill="#64748b" textAnchor="middle">Black dwarf</text>
        {/* Lower branch: massive star */}
        <line x1={143} y1={100} x2={155} y2={125} stroke="#6366f1" strokeWidth={1.2} />
        {/* Red supergiant */}
        <rect x={156} y={113} width={60} height={25} rx={5} fill="#1e293b" stroke="#ef4444" strokeWidth={1.2} />
        <text x={186} y={123} fontSize={6} fill="#ef4444" textAnchor="middle">Red supergiant</text>
        <text x={186} y={132} fontSize={5.5} fill="#64748b" textAnchor="middle">(massive star)</text>
        {/* Arrow to Supernova */}
        <line x1={216} y1={125} x2={230} y2={125} stroke="#6366f1" strokeWidth={1.2} />
        <polygon points="230,125 222,121 222,129" fill="#6366f1" />
        {/* Supernova */}
        <rect x={231} y={113} width={55} height={25} rx={5} fill="#1e293b" stroke="#fbbf24" strokeWidth={1.2} />
        <text x={258} y={126} fontSize={6} fill="#fbbf24" textAnchor="middle">Supernova!</text>
        {/* Neutron star or black hole */}
        <line x1={258} y1={138} x2={258} y2={155} stroke="#6366f1" strokeWidth={1.2} />
        <polygon points="258,155 254,147 262,147" fill="#6366f1" />
        <rect x={230} y={156} width={58} height={25} rx={5} fill="#1e293b" stroke="#6366f1" strokeWidth={1.2} />
        <text x={259} y={166} fontSize={5.5} fill="#6366f1" textAnchor="middle">Neutron star</text>
        <text x={259} y={175} fontSize={5.5} fill="#e879f9" textAnchor="middle">or Black hole</text>
        {/* Note */}
        <text x={80} y={175} fontSize={6.5} fill="#64748b" textAnchor="middle">Upper: low-mass (Sun-like)</text>
        <text x={80} y={185} fontSize={6.5} fill="#64748b" textAnchor="middle">Lower: massive star</text>
      </svg>
    </div>
  );
}

export function RedshiftSpectra() {
  return (
    <div className="w-full">
      <svg viewBox="0 0 300 200" className="w-full h-auto">
        <text x="150" y="14" fontSize={9} fill="#94a3b8" textAnchor="middle">Redshift — Galaxy Recession Evidence</text>
        {/* Spectrum gradients */}
        <defs>
          <linearGradient id="visSpectrum1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="20%" stopColor="#3b82f6" />
            <stop offset="40%" stopColor="#22c55e" />
            <stop offset="60%" stopColor="#fdc700" />
            <stop offset="80%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#ef4444" />
          </linearGradient>
          <linearGradient id="visSpectrum2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="20%" stopColor="#3b82f6" />
            <stop offset="40%" stopColor="#22c55e" />
            <stop offset="60%" stopColor="#fdc700" />
            <stop offset="80%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#ef4444" />
          </linearGradient>
        </defs>
        {/* Lab spectrum */}
        <text x={30} y={55} fontSize={7} fill="#94a3b8">Lab spectrum:</text>
        <rect x={30} y={60} width={240} height={28} rx={3} fill="url(#visSpectrum1)" opacity={0.7} />
        {/* Absorption lines at fixed positions */}
        {[90, 130, 165, 200].map(x => (
          <rect key={x} x={x} y={60} width={3} height={28} fill="#0b1121" opacity={0.9} />
        ))}
        <text x={150} y={100} fontSize={7} fill="#94a3b8" textAnchor="middle">Absorption lines at fixed wavelengths</text>
        {/* Galaxy spectrum */}
        <text x={30} y={120} fontSize={7} fill="#94a3b8">Galaxy spectrum:</text>
        <rect x={30} y={125} width={240} height={28} rx={3} fill="url(#visSpectrum2)" opacity={0.7} />
        {/* Same lines shifted right (redshifted) */}
        {[110, 150, 185, 220].map(x => (
          <rect key={x} x={x} y={125} width={3} height={28} fill="#0b1121" opacity={0.9} />
        ))}
        {/* Redshift arrow */}
        <line x1={30} y1={165} x2={270} y2={165} stroke="#ef4444" strokeWidth={1.2} />
        <polygon points="270,165 260,161 260,169" fill="#ef4444" />
        <text x={150} y={175} fontSize={7} fill="#ef4444" textAnchor="middle">Redshift: lines shift to longer wavelength</text>
        <text x={150} y={186} fontSize={7} fill="#6366f1" textAnchor="middle">Evidence for Big Bang: universe is expanding</text>
        {/* Shift arrows on lines */}
        <line x1={93} y1={73} x2={113} y2={138} stroke="#ef4444" strokeWidth={0.8} strokeDasharray="3,2" />
        <line x1={133} y1={73} x2={153} y2={138} stroke="#ef4444" strokeWidth={0.8} strokeDasharray="3,2" />
      </svg>
    </div>
  );
}

export function SolarSystemOrbits() {
  return (
    <div className="w-full">
      <svg viewBox="0 0 300 200" className="w-full h-auto">
        <text x="150" y="14" fontSize={9} fill="#94a3b8" textAnchor="middle">Solar System — Orbits</text>
        {/* Sun */}
        <circle cx={150} cy={105} r={18} fill="#fdc700" opacity={0.9} />
        <text x={150} y={109} fontSize={7} fill="#1e293b" textAnchor="middle" fontWeight="700">Sun</text>
        {/* Orbits */}
        <ellipse cx={150} cy={105} rx={35} ry={22} fill="none" stroke="#6366f1" strokeWidth={0.8} opacity={0.6} />
        <ellipse cx={150} cy={105} rx={55} ry={35} fill="none" stroke="#6366f1" strokeWidth={0.8} opacity={0.6} />
        <ellipse cx={150} cy={105} rx={78} ry={50} fill="none" stroke="#6366f1" strokeWidth={0.8} opacity={0.6} />
        <ellipse cx={150} cy={105} rx={105} ry={68} fill="none" stroke="#6366f1" strokeWidth={0.8} opacity={0.6} />
        {/* Mercury */}
        <circle cx={185} cy={105} r={3.5} fill="#94a3b8" />
        <text x={185} y={95} fontSize={6} fill="#94a3b8" textAnchor="middle">Mercury</text>
        {/* Venus */}
        <circle cx={150} cy={70} r={4.5} fill="#f59e0b" />
        <text x={165} y={69} fontSize={6} fill="#f59e0b">Venus</text>
        {/* Earth */}
        <circle cx={228} cy={105} r={5} fill="#3b82f6" />
        <text x={240} y={101} fontSize={6} fill="#3b82f6">Earth</text>
        {/* Mars */}
        <circle cx={150} cy={37} r={4} fill="#ef4444" />
        <text x={165} y={38} fontSize={6} fill="#ef4444">Mars</text>
        {/* Label */}
        <text x={150} y={188} fontSize={7} fill="#6366f1" textAnchor="middle">Gravity provides centripetal force for orbit</text>
      </svg>
    </div>
  );
}

// ─── LENSES / OPTICS GROUP ────────────────────────────────────────────────────

export function DivertingLensImage() {
  return (
    <div className="w-full">
      <svg viewBox="0 0 300 200" className="w-full h-auto">
        <text x="150" y="14" fontSize={9} fill="#94a3b8" textAnchor="middle">Diverging Lens — Virtual Image</text>
        {/* Principal axis */}
        <line x1={15} y1={100} x2={285} y2={100} stroke="#334155" strokeWidth={1} />
        {/* Biconcave lens */}
        <path d="M148,50 Q130,100 148,150 Q158,100 148,50 Z" fill="#1e3a5f" stroke="#fdc700" strokeWidth={1.5} opacity="0.8" />
        <path d="M152,50 Q134,100 152,150 Q162,100 152,50 Z" fill="#1e3a5f" stroke="#fdc700" strokeWidth={1.5} opacity="0.8" />
        {/* Virtual focal point on LEFT */}
        <line x1={100} y1={96} x2={100} y2={104} stroke="#fdc700" strokeWidth={1} />
        <text x={100} y={113} fontSize={7} fill="#fdc700" textAnchor="middle">F (virtual)</text>
        {/* Object (upward arrow) to left */}
        <line x1={70} y1={100} x2={70} y2={65} stroke="#22c55e" strokeWidth={2} />
        <polygon points="70,62 66,71 74,71" fill="#22c55e" />
        <text x={70} y={58} fontSize={7} fill="#22c55e" textAnchor="middle">Object</text>
        {/* Ray 1: parallel to axis, diverges from F */}
        <line x1={70} y1={65} x2={150} y2={65} stroke="#fdc700" strokeWidth={1.2} />
        <line x1={150} y1={65} x2={250} y2={90} stroke="#fdc700" strokeWidth={1.2} />
        {/* Dashed extension back to F */}
        <line x1={150} y1={65} x2={100} y2={100} stroke="#fdc700" strokeWidth={0.8} strokeDasharray="4,3" />
        {/* Ray 2: through optical centre straight */}
        <line x1={70} y1={65} x2={250} y2={115} stroke="#f97316" strokeWidth={1.2} strokeDasharray="4,2" />
        {/* Virtual image (upright, smaller) */}
        <line x1={110} y1={100} x2={110} y2={80} stroke="#ef4444" strokeWidth={1.8} />
        <polygon points="110,77 106,86 114,86" fill="#ef4444" />
        <text x={110} y={70} fontSize={7} fill="#ef4444" textAnchor="middle">Virtual</text>
        <text x={110} y={79} fontSize={7} fill="#ef4444" textAnchor="middle">image</text>
        <text x={150} y={185} fontSize={7} fill="#64748b" textAnchor="middle">Virtual image: upright, smaller, same side as object</text>
      </svg>
    </div>
  );
}

export function ColourFilter() {
  return (
    <div className="w-full">
      <svg viewBox="0 0 300 200" className="w-full h-auto">
        <text x="150" y="14" fontSize={9} fill="#94a3b8" textAnchor="middle">Colour Filters</text>
        {/* Row 1: White light through red filter */}
        <text x={20} y={58} fontSize={7} fill="#94a3b8">White</text>
        <text x={20} y={67} fontSize={7} fill="#94a3b8">light</text>
        {/* White arrow in */}
        <line x1={42} y1={62} x2={75} y2={62} stroke="#e2e8f0" strokeWidth={3} />
        <polygon points="75,62 66,58 66,66" fill="#e2e8f0" />
        {/* Red filter */}
        <rect x={80} y={45} width={35} height={35} rx={4} fill="#ef4444" opacity={0.6} stroke="#dc2626" strokeWidth={1.2} />
        <text x={97} y={63} fontSize={7} fill="#fff" textAnchor="middle">Red</text>
        <text x={97} y={72} fontSize={6} fill="#fff" textAnchor="middle">filter</text>
        {/* Red light out */}
        <line x1={115} y1={62} x2={160} y2={62} stroke="#ef4444" strokeWidth={3} />
        <polygon points="160,62 151,58 151,66" fill="#ef4444" />
        <text x={185} y={58} fontSize={7} fill="#ef4444">Only red</text>
        <text x={185} y={67} fontSize={7} fill="#ef4444">light passes</text>
        {/* Absorbed colours label */}
        <text x={97} y={88} fontSize={6.5} fill="#64748b" textAnchor="middle">Absorbs all</text>
        <text x={97} y={97} fontSize={6.5} fill="#64748b" textAnchor="middle">other colours</text>
        {/* Row 2: White light through blue filter */}
        <text x={20} y={130} fontSize={7} fill="#94a3b8">White</text>
        <text x={20} y={139} fontSize={7} fill="#94a3b8">light</text>
        {/* White arrow in */}
        <line x1={42} y1={134} x2={75} y2={134} stroke="#e2e8f0" strokeWidth={3} />
        <polygon points="75,134 66,130 66,138" fill="#e2e8f0" />
        {/* Blue filter */}
        <rect x={80} y={117} width={35} height={35} rx={4} fill="#3b82f6" opacity={0.6} stroke="#2563eb" strokeWidth={1.2} />
        <text x={97} y={135} fontSize={7} fill="#fff" textAnchor="middle">Blue</text>
        <text x={97} y={144} fontSize={6} fill="#fff" textAnchor="middle">filter</text>
        {/* Blue light out */}
        <line x1={115} y1={134} x2={160} y2={134} stroke="#3b82f6" strokeWidth={3} />
        <polygon points="160,134 151,130 151,138" fill="#3b82f6" />
        <text x={185} y={130} fontSize={7} fill="#3b82f6">Only blue</text>
        <text x={185} y={139} fontSize={7} fill="#3b82f6">light passes</text>
        {/* Absorbed label */}
        <text x={97} y={160} fontSize={6.5} fill="#64748b" textAnchor="middle">Absorbs red,</text>
        <text x={97} y={169} fontSize={6.5} fill="#64748b" textAnchor="middle">green, yellow...</text>
        {/* Bottom note */}
        <text x={150} y={188} fontSize={7} fill="#94a3b8" textAnchor="middle">Filters transmit only their own colour of light</text>
      </svg>
    </div>
  );
}

// ─── DEFAULT EXPORT MAP ───────────────────────────────────────────────────────

export const EXAM_DIAGRAMS = {
  sankey_light_bulb: SankeyLightBulb,
  sankey_car_engine: SankeyCarEngine,
  energy_chain_coal: EnergyChainCoal,
  heating_curve_water: HeatingCurveWater,
  series_circuit_av: SeriesCircuitAV,
  parallel_circuit_lamps: ParallelCircuitLamps,
  iv_graph_three_components: IVGraphThreeComponents,
  transformer_step_up: TransformerStepUp,
  domestic_plug_wires: DomesticPlugWires,
  national_grid_flow: NationalGridFlow,
  static_charge_diagram: StaticChargeDiagram,
  free_body_stationary: FreeBodyStationary,
  free_body_accelerating: FreeBodyAccelerating,
  moment_arm_spanner: MomentArmSpanner,
  hookes_law_graph: HookesLawGraph,
  vt_graph_uniform: VTGraphUniform,
  vt_graph_terminal_velocity: VTGraphTerminalVelocity,
  st_graph_types: STGraphTypes,
  stopping_distance_split: StoppingDistanceSplit,
  momentum_collision: MomentumCollision,
  fluid_pressure_depth: FluidPressureDepth,
  transverse_wave_labelled: TransverseWaveLabelled,
  longitudinal_wave_labelled: LongitudinalWaveLabelled,
  refraction_glass_block: RefractionGlassBlock,
  total_internal_reflection: TotalInternalReflection,
  converging_lens_real_image: ConvergingLensRealImage,
  em_spectrum_bar: EMSpectrumBar,
  reflection_mirror: ReflectionMirror,
  particle_three_states: ParticleThreeStates,
  latent_heat_graph: LatentHeatGraph,
  boyle_law_graph: BoyleLawGraph,
  gas_syringe_pressure: GasSyringePressure,
  nuclear_atom_model: NuclearAtomModel,
  alpha_decay_equation: AlphaDecayEquation,
  radioactive_decay_graph: RadioactiveDecayGraph,
  fission_chain_reaction: FissionChainReaction,
  rutherford_scattering: RutherfordScattering,
  half_life_decay_graph: HalfLifeDecayGraph,
  motor_effect_wire: MotorEffectWire,
  transformer_coils: TransformerCoils,
  ac_generator_coil: ACGeneratorCoil,
  em_induction_magnet: EMInductionMagnet,
  magnetic_field_lines: MagneticFieldLines,
  stellar_evolution_path: StellarEvolutionPath,
  redshift_spectra: RedshiftSpectra,
  solar_system_orbits: SolarSystemOrbits,
  diverging_lens_image: DivertingLensImage,
  colour_filter: ColourFilter,
};

export default EXAM_DIAGRAMS;
