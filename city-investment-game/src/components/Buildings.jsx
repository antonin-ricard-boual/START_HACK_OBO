/*
  Custom SVG building components — no system emojis.
  All viewBox: "0 0 40 36"
*/

export function RathausBuilding() {
  return (
    <svg viewBox="0 0 40 36" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      {/* Base platform */}
      <rect x="1" y="29" width="38" height="7" fill="#4a3820" rx="1"/>
      <rect x="3" y="26" width="34" height="4" fill="#5c4a2e"/>
      {/* Wing towers */}
      <rect x="2" y="10" width="9" height="20" fill="#6b5535"/>
      <rect x="29" y="10" width="9" height="20" fill="#6b5535"/>
      {/* Tower caps */}
      <polygon points="2,10 6.5,4 11,10" fill="#5a4428"/>
      <polygon points="29,10 33.5,4 38,10" fill="#5a4428"/>
      {/* Main facade */}
      <rect x="10" y="14" width="20" height="16" fill="#8b7045"/>
      {/* Central dome base */}
      <rect x="15" y="10" width="10" height="6" fill="#9a8050"/>
      {/* Dome */}
      <ellipse cx="20" cy="10" rx="6" ry="5" fill="#7a6035"/>
      <ellipse cx="20" cy="8" rx="3" ry="2.5" fill="#6a5025"/>
      {/* Gold finial */}
      <line x1="20" y1="3" x2="20" y2="6" stroke="#f0c040" strokeWidth="1.5"/>
      <circle cx="20" cy="3" r="1.5" fill="#f0c040"/>
      {/* Columns */}
      {[12, 17, 23, 28].map(x => (
        <rect key={x} x={x} y={16} width="2" height="14" fill="#5a4020" rx="0.5"/>
      ))}
      {/* Entry arch */}
      <path d="M16,30 L16,24 Q20,20 24,24 L24,30" fill="#3a2c14"/>
      {/* Wing windows */}
      <rect x="4" y="13" width="5" height="5" fill="#c8a870" opacity="0.5" rx="0.5"/>
      <rect x="31" y="13" width="5" height="5" fill="#c8a870" opacity="0.5" rx="0.5"/>
      <rect x="4" y="20" width="5" height="4" fill="#c8a870" opacity="0.4" rx="0.5"/>
      <rect x="31" y="20" width="5" height="4" fill="#c8a870" opacity="0.4" rx="0.5"/>
    </svg>
  )
}

export function LibraryBuilding() {
  return (
    <svg viewBox="0 0 40 36" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      {/* Base steps */}
      <rect x="1" y="30" width="38" height="6" fill="#0d4a4a" rx="1"/>
      <rect x="3" y="27" width="34" height="4" fill="#115858"/>
      {/* Main body */}
      <rect x="4" y="13" width="32" height="15" fill="#0a6868"/>
      {/* Roof */}
      <polygon points="1,13 20,3 39,13" fill="#085252"/>
      {/* Arched windows */}
      <path d="M7,21 L7,15 Q11,11 15,15 L15,21 Z" fill="#043838"/>
      <path d="M17,21 L17,15 Q21,11 25,15 L25,21 Z" fill="#043838"/>
      <path d="M27,21 L27,15 Q31,11 35,15 L35,21 Z" fill="#043838"/>
      {/* Window glow */}
      <path d="M7,21 L7,15 Q11,11 15,15 L15,21 Z" fill="#2dd4bf" opacity="0.2"/>
      <path d="M17,21 L17,15 Q21,11 25,15 L25,21 Z" fill="#2dd4bf" opacity="0.2"/>
      <path d="M27,21 L27,15 Q31,11 35,15 L35,21 Z" fill="#2dd4bf" opacity="0.2"/>
      {/* Book spines on base */}
      {[5, 8, 11, 14, 17, 20, 23, 26, 29, 32].map((x, i) => (
        <rect key={x} x={x} y={30} width="2" height="6"
          fill={['#0891b2','#0e7490','#155e75','#0c4a6e','#1e3a5f'][i % 5]} rx="0.3"/>
      ))}
    </svg>
  )
}

export function BondBuilding() {
  return (
    <svg viewBox="0 0 40 36" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      {/* Foundation */}
      <rect x="3" y="28" width="34" height="8" fill="#1a3558" rx="1"/>
      {/* Ground floor */}
      <rect x="5" y="20" width="30" height="9" fill="#1e4a80"/>
      {/* Upper floor */}
      <rect x="8" y="12" width="24" height="9" fill="#2563a0"/>
      {/* Roof */}
      <polygon points="4,12 20,3 36,12" fill="#1a4f8a"/>
      {/* Chimney */}
      <rect x="25" y="5" width="3" height="7" fill="#1a3a6a"/>
      {/* Door */}
      <rect x="16" y="28" width="8" height="8" fill="#0f2d5c" rx="1"/>
      {/* Ground floor windows */}
      <rect x="7" y="22" width="7" height="5" fill="#7ec8e3" opacity="0.7" rx="0.5"/>
      <rect x="26" y="22" width="7" height="5" fill="#7ec8e3" opacity="0.7" rx="0.5"/>
      {/* Upper windows */}
      <rect x="9" y="14" width="5" height="5" fill="#93d6e8" opacity="0.8" rx="0.5"/>
      <rect x="17" y="14" width="6" height="5" fill="#93d6e8" opacity="0.8" rx="0.5"/>
      <rect x="26" y="14" width="5" height="5" fill="#93d6e8" opacity="0.8" rx="0.5"/>
    </svg>
  )
}

export function StockBuilding() {
  return (
    <svg viewBox="0 0 40 36" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      {/* Wide base */}
      <rect x="3" y="29" width="34" height="7" fill="#12402a" rx="1"/>
      {/* Side wings */}
      <rect x="3" y="18" width="8" height="12" fill="#155c38"/>
      <rect x="29" y="18" width="8" height="12" fill="#155c38"/>
      {/* Main tower */}
      <rect x="13" y="5" width="14" height="25" fill="#187040"/>
      {/* Tower cap */}
      <rect x="12" y="3" width="16" height="3" fill="#1a8048"/>
      {/* Antenna */}
      <line x1="20" y1="3" x2="20" y2="0" stroke="#4ade80" strokeWidth="1.5"/>
      <circle cx="20" cy="0" r="1" fill="#86efac"/>
      {/* Main tower windows — grid */}
      {[0,1,2,3,4].flatMap(row =>
        [0,1].map(col => (
          <rect key={`${row}-${col}`}
            x={15 + col * 7} y={7 + row * 4}
            width={5} height={3}
            fill="#4ade80" opacity="0.55" rx="0.3"/>
        ))
      )}
      {/* Wing windows */}
      <rect x="4" y="20" width="6" height="3" fill="#4ade80" opacity="0.4" rx="0.3"/>
      <rect x="4" y="25" width="6" height="3" fill="#4ade80" opacity="0.4" rx="0.3"/>
      <rect x="30" y="20" width="6" height="3" fill="#4ade80" opacity="0.4" rx="0.3"/>
      <rect x="30" y="25" width="6" height="3" fill="#4ade80" opacity="0.4" rx="0.3"/>
      {/* Connecting bridge */}
      <rect x="11" y="20" width="18" height="2" fill="#1a8048" opacity="0.8"/>
    </svg>
  )
}

export function GoldBuilding() {
  return (
    <svg viewBox="0 0 40 36" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      {/* Base steps */}
      <rect x="1" y="30" width="38" height="6" fill="#6b4c10" rx="1"/>
      <rect x="4" y="26" width="32" height="5" fill="#7d5c18"/>
      <rect x="7" y="22" width="26" height="5" fill="#8e6c20"/>
      {/* Main body */}
      <rect x="9" y="13" width="22" height="10" fill="#b8861a"/>
      {/* Pediment */}
      <polygon points="5,13 20,3 35,13" fill="#9a7015"/>
      {/* Pediment highlight */}
      <polygon points="9,13 20,6 31,13" fill="#c4941e" opacity="0.5"/>
      {/* Columns */}
      {[11, 17, 23, 29].map(x => (
        <rect key={x} x={x} y={13} width="2.5" height="10" fill="#6b4c10" rx="0.5"/>
      ))}
      {/* Frieze */}
      <rect x="9" y="11" width="22" height="2.5" fill="#c4941e"/>
      {/* Door */}
      <rect x="16" y="18" width="8" height="5" fill="#4a3008" rx="0.5"/>
      {/* Roof ornament */}
      <circle cx="20" cy="3" r="1.5" fill="#fbbf24"/>
    </svg>
  )
}

export function CryptoBuilding() {
  return (
    <svg viewBox="0 0 40 36" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      {/* Base platform */}
      <rect x="3" y="29" width="34" height="7" fill="#2e0059" rx="1"/>
      {/* Side structures */}
      <polygon points="3,29 10,29 8,18 5,22" fill="#4c0082"/>
      <polygon points="30,29 37,29 35,22 32,18" fill="#4c0082"/>
      {/* Main tower — angled crystal */}
      <polygon points="14,29 26,29 24,5 16,5" fill="#6d28d9"/>
      {/* Tower face highlight */}
      <polygon points="14,29 20,29 18,5 16,5" fill="#7c3aed" opacity="0.6"/>
      {/* Horizontal scan lines */}
      {[10, 15, 20, 25].map(y => (
        <line key={y} x1="15" y1={y} x2="25" y2={y}
          stroke="#c084fc" strokeWidth="0.8" opacity="0.6"/>
      ))}
      {/* Neon accent */}
      <line x1="14" y1="29" x2="16" y2="5" stroke="#a855f7" strokeWidth="0.5" opacity="0.4"/>
      <line x1="26" y1="29" x2="24" y2="5" stroke="#a855f7" strokeWidth="0.5" opacity="0.4"/>
      {/* Top crystal tip */}
      <polygon points="16,5 24,5 20,1" fill="#9333ea"/>
      {/* Top glow */}
      <circle cx="20" cy="1" r="1.5" fill="#e9d5ff" opacity="0.9"/>
      <circle cx="20" cy="1" r="3" fill="#c084fc" opacity="0.2"/>
    </svg>
  )
}

export function ETFBuilding() {
  return (
    <svg viewBox="0 0 40 36" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      {/* Base */}
      <rect x="2" y="29" width="36" height="7" fill="#0c3d4a" rx="1"/>
      {/* Three towers of different heights */}
      <rect x="3" y="18" width="10" height="12" fill="#0e6080"/>
      <rect x="15" y="8" width="10" height="22" fill="#0891b2"/>
      <rect x="27" y="14" width="10" height="16" fill="#0e6080"/>
      {/* Connecting walkways */}
      <rect x="13" y="20" width="14" height="2.5" fill="#06b6d4" opacity="0.7"/>
      {/* Windows */}
      {[[4,20],[4,24],[4,28],[16,10],[16,14],[16,18],[16,22],[16,26],[28,16],[28,20],[28,24],[28,28]].map(([x,y]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width={8} height={3}
          fill="#67e8f9" opacity="0.55" rx="0.3"/>
      ))}
      {/* Roof details */}
      <rect x="14" y="6" width="12" height="2.5" fill="#0ea5e9"/>
    </svg>
  )
}

export const BUILDING_SVG = {
  rathaus: RathausBuilding,
  library: LibraryBuilding,
  bond:    BondBuilding,
  stock:   StockBuilding,
  gold:    GoldBuilding,
  crypto:  CryptoBuilding,
  etf:     ETFBuilding,
}
