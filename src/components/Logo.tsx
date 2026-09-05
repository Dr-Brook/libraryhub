import React from 'react'

interface LogoProps {
  size?: number
  className?: string
}

export function Logo({ size = 24, className }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="LibraryHub logo"
    >
      {/* Open book at the bottom */}
      <path
        d="M8 44 Q8 38 16 36 L28 34 Q32 38 32 38 Q32 38 36 34 L48 36 Q56 38 56 44 L56 52 Q56 52 48 50 L32 48 Q32 48 16 50 Q8 52 8 52 Z"
        fill="#1B2A4A"
      />
      {/* Left page */}
      <path
        d="M12 44 L12 40 Q12 38 16 36 L28 34 L28 46 L16 48 Q12 48 12 44 Z"
        fill="#2A4A6B"
      />
      {/* Right page */}
      <path
        d="M52 44 L52 40 Q52 38 48 36 L36 34 L36 46 L48 48 Q52 48 52 44 Z"
        fill="#2A4A6B"
      />
      {/* Book spine line */}
      <path
        d="M32 38 L32 48"
        stroke="#1B2A4A"
        strokeWidth="1.5"
      />

      {/* Network nodes - center top */}
      <circle cx="32" cy="14" r="4" fill="#C5A55A" />
      {/* Left node */}
      <circle cx="16" cy="22" r="3.5" fill="#C5A55A" />
      {/* Right node */}
      <circle cx="48" cy="22" r="3.5" fill="#C5A55A" />
      {/* Far left node */}
      <circle cx="10" cy="32" r="2.5" fill="#D4B76A" />
      {/* Far right node */}
      <circle cx="54" cy="32" r="2.5" fill="#D4B76A" />

      {/* Connection lines */}
      <line x1="32" y1="14" x2="16" y2="22" stroke="#C5A55A" strokeWidth="1.5" />
      <line x1="32" y1="14" x2="48" y2="22" stroke="#C5A55A" strokeWidth="1.5" />
      <line x1="16" y1="22" x2="10" y2="32" stroke="#D4B76A" strokeWidth="1" />
      <line x1="48" y1="22" x2="54" y2="32" stroke="#D4B76A" strokeWidth="1" />
      <line x1="16" y1="22" x2="32" y2="14" stroke="#C5A55A" strokeWidth="1.5" />
      <line x1="48" y1="22" x2="32" y2="14" stroke="#C5A55A" strokeWidth="1.5" />

      {/* Connect nodes to book */}
      <line x1="32" y1="18" x2="32" y2="34" stroke="#C5A55A" strokeWidth="1" strokeDasharray="2 2" />
      <line x1="16" y1="25.5" x2="20" y2="36" stroke="#D4B76A" strokeWidth="1" strokeDasharray="2 2" />
      <line x1="48" y1="25.5" x2="44" y2="36" stroke="#D4B76A" strokeWidth="1" strokeDasharray="2 2" />
    </svg>
  )
}