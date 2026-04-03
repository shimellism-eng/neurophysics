/**
 * SVG diagram for RP1: Specific Heat Capacity
 * Shows metal block with immersion heater + thermometer, ammeter, voltmeter, power supply.
 */
export function ShcDiagram() {
  return (
    <svg
      viewBox="0 0 520 320"
      width="100%"
      aria-label="Specific heat capacity apparatus: metal block with immersion heater and thermometer connected to ammeter, voltmeter, and power supply"
      role="img"
      style={{ display: 'block', maxWidth: '520px', margin: '0 auto' }}
    >
      {/* Background */}
      <rect width="520" height="320" fill="var(--bg2)" rx="10" />

      {/* === METAL BLOCK === */}
      <rect x="170" y="130" width="120" height="100" rx="6"
        fill="var(--bg4)" stroke="var(--cyan)" strokeWidth="2" />
      <text x="230" y="190" textAnchor="middle" fill="var(--muted)" fontSize="11" fontFamily="sans-serif">
        Metal
      </text>
      <text x="230" y="204" textAnchor="middle" fill="var(--muted)" fontSize="11" fontFamily="sans-serif">
        block
      </text>

      {/* Immersion heater hole + heater coil */}
      <rect x="198" y="138" width="20" height="50" rx="3"
        fill="var(--bg3)" stroke="var(--amber)" strokeWidth="1.5" />
      <line x1="208" y1="140" x2="208" y2="186" stroke="var(--amber)" strokeWidth="1.5" strokeDasharray="3,2" />
      <text x="208" y="200" textAnchor="middle" fill="var(--amber)" fontSize="9" fontFamily="sans-serif">
        Heater
      </text>

      {/* Thermometer hole + thermometer */}
      <rect x="248" y="130" width="10" height="60" rx="3"
        fill="var(--bg3)" stroke="var(--cyan)" strokeWidth="1.5" />
      <line x1="253" y1="132" x2="253" y2="188" stroke="var(--cyan)" strokeWidth="1.5" />
      {/* bulb */}
      <circle cx="253" cy="190" r="5" fill="var(--pink)" />
      <text x="266" y="145" fill="var(--cyan)" fontSize="9" fontFamily="sans-serif">T</text>

      {/* Insulating foam around block */}
      <rect x="158" y="118" width="144" height="126" rx="10"
        fill="none" stroke="var(--muted)" strokeWidth="1" strokeDasharray="5,3" />
      <text x="305" y="115" fill="var(--muted)" fontSize="9" fontFamily="sans-serif">Insulating foam</text>

      {/* === CIRCUIT WIRES === */}
      {/* From top of heater up to ammeter rail */}
      <line x1="208" y1="138" x2="208" y2="60" stroke="var(--text)" strokeWidth="1.5" />
      <line x1="208" y1="60" x2="310" y2="60" stroke="var(--text)" strokeWidth="1.5" />

      {/* From ammeter down to power supply */}
      <line x1="360" y1="60" x2="440" y2="60" stroke="var(--text)" strokeWidth="1.5" />
      <line x1="440" y1="60" x2="440" y2="240" stroke="var(--text)" strokeWidth="1.5" />

      {/* Return from power supply to block base */}
      <line x1="170" y1="240" x2="130" y2="240" stroke="var(--text)" strokeWidth="1.5" />
      <line x1="130" y1="240" x2="130" y2="180" stroke="var(--text)" strokeWidth="1.5" />
      <line x1="130" y1="180" x2="170" y2="180" stroke="var(--text)" strokeWidth="1.5" />

      {/* === AMMETER === */}
      <circle cx="335" cy="60" r="22" fill="var(--bg3)" stroke="var(--green)" strokeWidth="2" />
      <text x="335" y="57" textAnchor="middle" fill="var(--green)" fontSize="13" fontWeight="bold" fontFamily="sans-serif">A</text>
      <text x="335" y="71" textAnchor="middle" fill="var(--muted)" fontSize="9" fontFamily="sans-serif">(series)</text>

      {/* === VOLTMETER (parallel across block heater) === */}
      {/* V+ tap from top heater wire */}
      <line x1="208" y1="90" x2="208" y2="90" stroke="none" />
      {/* Drop a tap from the top rail to voltmeter */}
      <line x1="230" y1="60" x2="230" y2="30" stroke="var(--text)" strokeWidth="1.5" />
      <line x1="230" y1="30" x2="380" y2="30" stroke="var(--text)" strokeWidth="1.5" />
      <line x1="380" y1="30" x2="380" y2="60" stroke="var(--text)" strokeWidth="1.5" />

      {/* Bottom of voltmeter tap from return wire */}
      <line x1="175" y1="180" x2="175" y2="290" stroke="var(--text)" strokeWidth="1.5" />
      <line x1="175" y1="290" x2="370" y2="290" stroke="var(--text)" strokeWidth="1.5" />
      <line x1="370" y1="290" x2="370" y2="260" stroke="var(--text)" strokeWidth="1.5" />

      {/* Voltmeter box */}
      <circle cx="375" cy="238" r="22" fill="var(--bg3)" stroke="var(--blue)" strokeWidth="2" />
      <text x="375" y="235" textAnchor="middle" fill="var(--blue)" fontSize="13" fontWeight="bold" fontFamily="sans-serif">V</text>
      <text x="375" y="249" textAnchor="middle" fill="var(--muted)" fontSize="9" fontFamily="sans-serif">(parallel)</text>

      {/* === POWER SUPPLY === */}
      <rect x="405" y="210" width="60" height="50" rx="6"
        fill="var(--bg4)" stroke="var(--purple)" strokeWidth="2" />
      <text x="435" y="232" textAnchor="middle" fill="var(--purple)" fontSize="9" fontWeight="bold" fontFamily="sans-serif">Power</text>
      <text x="435" y="245" textAnchor="middle" fill="var(--purple)" fontSize="9" fontFamily="sans-serif">supply</text>

      {/* Connect power supply into circuit */}
      <line x1="440" y1="210" x2="440" y2="82" stroke="var(--text)" strokeWidth="1.5" />
      <line x1="405" y1="240" x2="370" y2="240" stroke="var(--text)" strokeWidth="1.5" />

      {/* === LABELS === */}
      <text x="12" y="310" fill="var(--muted)" fontSize="10" fontFamily="sans-serif">
        Ammeter in series · Voltmeter in parallel · Block wrapped in insulating foam
      </text>
    </svg>
  );
}
