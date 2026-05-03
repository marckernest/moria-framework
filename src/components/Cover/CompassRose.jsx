import React from 'react'

export default function CompassRose({ size = 110 }) {
  // viewBox: 100×108, center at (50, 62)
  // Arms are 40px from center to tip, ~7px wide at the broadest point
  const stroke = 'var(--color-rule)'
  const sw = 1

  return (
    <svg
      width={size}
      height={size * 1.08}
      viewBox="0 0 100 108"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Compass rose"
      role="img"
    >
      {/* N label */}
      <text
        x="50"
        y="14"
        textAnchor="middle"
        fontFamily="IM Fell English, Georgia, serif"
        fontSize="9"
        fill="var(--fg-secondary)"
        letterSpacing="0.06em"
      >
        N
      </text>

      {/* North arm */}
      <path d="M50,22 L53.5,42 L50,56 L46.5,42 Z"
        stroke={stroke} strokeWidth={sw} />

      {/* South arm */}
      <path d="M50,102 L53.5,82 L50,68 L46.5,82 Z"
        stroke={stroke} strokeWidth={sw} />

      {/* East arm */}
      <path d="M90,62 L70,58.5 L56,62 L70,65.5 Z"
        stroke={stroke} strokeWidth={sw} />

      {/* West arm */}
      <path d="M10,62 L30,65.5 L44,62 L30,58.5 Z"
        stroke={stroke} strokeWidth={sw} />

      {/* Center ring */}
      <circle cx="50" cy="62" r="5.5"
        stroke={stroke} strokeWidth={sw} />

      {/* Center dot */}
      <circle cx="50" cy="62" r="1.8"
        fill={stroke} />
    </svg>
  )
}
