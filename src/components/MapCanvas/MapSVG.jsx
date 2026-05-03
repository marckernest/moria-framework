import React from 'react'
import { stages } from '../../data/stages'

const INK   = '#1a1a18'
const RULE  = '#c8c2b0'
const WATER = 'rgba(180, 170, 148, 0.55)'

// Wandering journey path.
// Moria → Lothlorien: shoots southeast, curves clockwise east then south,
// then sweeps back north to arrive at Lothlorien from below.
// The loop sits clearly south of Lothlorien — a visible detour before arrival.
const PATH_D = `
  M 450,1360
  C 550,900 900,960 1050,840
  C 1150,720 1420,580 1560,560
  C 1540,800 1680,1180 1950,1160
  C 2050,1320 2300,1550 2500,1580
  C 2700,1600 2820,1760 2720,1880
  C 2610,1960 2340,1250 2400,760
`

// ── Terrain components ───────────────────────────────────────────────────────

function Hills({ cx, cy, s = 1 }) {
  const sw = Math.min(1.0 * s * 0.55, 2.8)
  return (
    <g transform={`translate(${cx},${cy})`} opacity="0.58" fill="none" stroke={RULE} strokeWidth={sw}>
      <path d={`M${-28*s},0 q${13*s},${-20*s} ${26*s},0`} />
      <path d={`M${-16*s},2 q${10*s},${-15*s} ${20*s},0`} />
      <path d={`M${8*s},1  q${10*s},${-13*s} ${20*s},0`} />
    </g>
  )
}

function Mountains({ cx, cy, s = 1 }) {
  const sw = (n) => Math.min(n * s * 0.45, 3.5)
  return (
    <g transform={`translate(${cx},${cy})`} opacity="0.72" fill="none" stroke={INK} strokeLinejoin="miter">
      <path d={`M${-42*s},${12*s} L${-22*s},${-20*s} L${-6*s},${12*s}`}  strokeWidth={sw(1.0)} />
      <path d={`M${-18*s},${12*s} L0,${-32*s} L${18*s},${12*s}`}         strokeWidth={sw(1.2)} />
      <path d={`M${6*s},${12*s}   L${24*s},${-18*s} L${40*s},${12*s}`}   strokeWidth={sw(1.0)} />
      <path d={`M${-5*s},${-20*s} L0,${-32*s} L${5*s},${-20*s}`}         strokeWidth={sw(0.65)} opacity="0.4" />
    </g>
  )
}

function Trees({ cx, cy, count = 3, gap = 20, size = 1 }) {
  const r  = 5.5 * size
  const h  = 13  * size
  const sw = Math.min(0.9 * size, 2.5)
  return (
    <>
      {Array.from({ length: count }, (_, i) => {
        const ox = (i - (count - 1) / 2) * gap
        const oy = i % 2 === 0 ? 0 : 5 * size
        return (
          <g key={i} transform={`translate(${cx + ox},${cy + oy})`} opacity="0.60"
            fill="none" stroke={RULE} strokeWidth={sw}>
            <line x1="0" y1="0" x2="0" y2={-h} />
            <circle cx="0" cy={-(h + r * 0.9)} r={r} />
          </g>
        )
      })}
    </>
  )
}

function Pines({ cx, cy, count = 3, gap = 26, size = 1, opacity = 0.72 }) {
  const h  = 24 * size
  const w  = 11 * size
  const sw = Math.min(0.8 * size * 0.55, 1.8)
  return (
    <>
      {Array.from({ length: count }, (_, i) => {
        const ox = (i - (count - 1) / 2) * gap
        const oy = i % 2 === 0 ? 0 : 6 * size
        return (
          <g key={i} transform={`translate(${cx + ox},${cy + oy})`}
            opacity={opacity} fill="none" stroke={INK} strokeWidth={sw} strokeLinejoin="miter">
            <line x1="0" y1="0" x2="0" y2={-h * 0.15} />
            <path d={`M0,${-h} L${-w*0.35},${-h*0.52} L${w*0.35},${-h*0.52} Z`} />
            <path d={`M0,${-h*0.58} L${-w*0.5},${-h*0.12} L${w*0.5},${-h*0.12} Z`} />
          </g>
        )
      })}
    </>
  )
}

function Columns({ cx, cy, count = 4, gap = 20, s = 1 }) {
  const h   = 28 * s
  const capW = 7 * s
  const basW = 5.5 * s
  const sw  = Math.min(0.9 * s * 0.55, 2.2)
  const xs  = Array.from({ length: count }, (_, i) => (i - (count - 1) / 2) * gap * s)

  return (
    <g opacity="0.70" stroke={INK} fill="none" strokeLinecap="butt">
      {/* Entablature */}
      <line
        x1={cx + xs[0] - capW} y1={cy - h}
        x2={cx + xs[count - 1] + capW} y2={cy - h}
        strokeWidth={sw * 2.4}
      />
      {/* Shafts */}
      {xs.map((ox, i) => (
        <line key={i} x1={cx + ox} y1={cy - h + sw * 1.2} x2={cx + ox} y2={cy - basW * 0.4} strokeWidth={sw} />
      ))}
      {/* Stylobate */}
      <line
        x1={cx + xs[0] - basW} y1={cy}
        x2={cx + xs[count - 1] + basW} y2={cy}
        strokeWidth={sw * 1.8}
      />
    </g>
  )
}

// ── City marker ──────────────────────────────────────────────────────────────

const OUTER_R    = 40
const INNER_R    = 24
const TICK_START = 45
const TICK_END   = 58

const TICKS = [
  [0, -TICK_START, 0, -TICK_END],
  [0,  TICK_START, 0,  TICK_END],
  [-TICK_START, 0, -TICK_END, 0],
  [ TICK_START, 0,  TICK_END, 0],
]

function CityMarker({ stage, W, H, onClick, active }) {
  const cx     = stage.position.x / 100 * W
  const cy     = stage.position.y / 100 * H
  const accent = '#2a5c45'
  const color  = active ? accent : INK

  return (
    <g
      transform={`translate(${cx},${cy})`}
      onClick={(e) => onClick(stage.id, e.clientX, e.clientY)}
      style={{ cursor: 'pointer' }}
      role="button"
      aria-label={`${stage.name} — ${stage.moiraStage}`}
    >
      {/* Hit target */}
      <circle r="72" fill="transparent" />

      {/* Outer ring */}
      <circle r={OUTER_R} stroke={color} strokeWidth={active ? 2 : 1.4}
        fill="var(--color-paper)" opacity={active ? 1 : 0.88} />

      {/* Compass ticks */}
      {TICKS.map(([x1, y1, x2, y2], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
          stroke={color} strokeWidth={active ? 1.6 : 1}
          opacity={active ? 0.8 : 0.55} />
      ))}

      {/* Inner ring */}
      <circle r={INNER_R} stroke={color} strokeWidth={active ? 1.2 : 0.9}
        fill="var(--color-paper)" opacity={active ? 0.9 : 0.7} />

      {/* Stage letter */}
      <text textAnchor="middle" dominantBaseline="central"
        fontFamily="'IM Fell English', Georgia, serif"
        fontSize="26" fill={color} opacity={active ? 1 : 0.72}>
        {stage.letter}
      </text>

      {/* Place name — secondary, above */}
      <text y={-(TICK_END + 16)} textAnchor="middle"
        fontFamily="'Courier New', Courier, monospace"
        fontSize="14" letterSpacing="2.5"
        fill={RULE}
        stroke="var(--color-paper)" strokeWidth="6" paintOrder="stroke">
        {stage.name}
      </text>

      {/* Framework name — primary, below */}
      <text y={TICK_END + 30} textAnchor="middle"
        fontFamily="'IM Fell English', Georgia, serif"
        fontSize="38" letterSpacing="0.5"
        fill={active ? accent : INK}
        stroke="var(--color-paper)" strokeWidth="10" paintOrder="stroke">
        {stage.moiraStage}
      </text>
    </g>
  )
}

// ── Main SVG ─────────────────────────────────────────────────────────────────

export default function MapSVG({ canvasW: W, canvasH: H, onCityClick, activeStage }) {
  return (
    <svg
      width={W} height={H}
      viewBox={`0 0 ${W} ${H}`}
      xmlns="http://www.w3.org/2000/svg"
      style={{ position: 'absolute', top: 0, left: 0, display: 'block' }}
    >

      {/* ── The Shire — rolling hills, pastoral trees ── */}
      <Hills cx={310}  cy={1275} s={3.2} />
      <Hills cx={555}  cy={1250} s={2.6} />
      <Hills cx={390}  cy={1465} s={2.3} />
      <Hills cx={480}  cy={1420} s={1.8} />
      <Trees cx={285}  cy={1360} count={4} gap={52} size={2.6} />
      <Trees cx={540}  cy={1435} count={5} gap={46} size={2.2} />
      <Trees cx={375}  cy={1490} count={3} gap={58} size={1.8} />

      {/* ── Rivendell — dense intimidating pine forest closing in ── */}
      <Pines cx={752}  cy={792} count={2} gap={94} size={7.0} opacity={0.80} />
      <Pines cx={912}  cy={748} count={4} gap={44} size={3.5} opacity={0.48} />
      <Pines cx={1205} cy={774} count={3} gap={78} size={6.0} opacity={0.65} />
      <Pines cx={806}  cy={960} count={3} gap={72} size={5.5} opacity={0.72} />
      <Pines cx={998}  cy={934} count={5} gap={40} size={3.0} opacity={0.42} />
      <Pines cx={1172} cy={910} count={3} gap={62} size={4.5} opacity={0.58} />

      {/* ── Council of Elrond — formal colonnade, place of gathering ── */}
      <Columns cx={1380} cy={492} count={5} gap={20} s={2.8} />
      <Columns cx={1690} cy={516} count={3} gap={18} s={2.0} />
      <Hills   cx={1260} cy={574} s={2.9} />

      {/* ── Mines of Moria — imposing, surrounding range ── */}
      <Mountains cx={1700} cy={1110} s={5.2} />
      <Mountains cx={1955} cy={1030} s={4.8} />
      <Mountains cx={2110} cy={1130} s={4.2} />
      <Mountains cx={1800} cy={1245} s={3.4} />
      <Mountains cx={2170} cy={1058} s={3.0} />
      <Mountains cx={1640} cy={1200} s={2.6} />

      {/* ── Lothlorien — the golden wood ── */}
      <Trees cx={2265} cy={672} count={6} gap={58} size={3.2} />
      <Trees cx={2458} cy={650} count={5} gap={54} size={2.8} />
      <Trees cx={2320} cy={858} count={5} gap={56} size={2.6} />
      <Trees cx={2500} cy={840} count={4} gap={50} size={2.2} />
      <Trees cx={2230} cy={778} count={3} gap={62} size={2.0} />

      {/* ── River — runs from west through Rivendell, Moria, northeast to Lothlorien ── */}
      <path
        d="M 50,580
           C 350,608 660,678 930,750
           C 972,782 1012,768 1055,792
           C 1098,816 1140,800 1195,828
           C 1320,870 1500,980 1680,1075
           C 1820,1125 1940,1148 2060,1152
           C 2200,1155 2350,1040 2480,880
           C 2600,730 2780,685 3000,668"
        stroke={WATER} strokeWidth="4.5" fill="none" opacity="0.38"
        strokeLinecap="round"
      />

      {/* ── Journey path ── */}
      <path
        d={PATH_D}
        stroke={INK}
        strokeWidth="2.2"
        fill="none"
        strokeDasharray="6 11"
        opacity="0.42"
        strokeLinecap="round"
      />

      {/* ── City markers ── */}
      {stages.map(stage => (
        <CityMarker
          key={stage.id}
          stage={stage}
          W={W} H={H}
          onClick={onCityClick || (() => {})}
          active={activeStage === stage.id}
        />
      ))}
    </svg>
  )
}
