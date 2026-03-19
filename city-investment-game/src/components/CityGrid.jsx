import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import { DISTRICT_OF, BUILDINGS, GRID_COLS, GRID_ROWS } from '../constants/game'
import { BUILDING_SVG } from './Buildings'

/* ── District visual config ─────────────────────────────────────── */
const DISTRICT_STYLE = {
  gold:   { bg: '#1e1408', hover: '#2c1e0c', border: '#4a3210', label: 'Gold District',  labelColor: '#a07020' },
  bonds:  { bg: '#08121e', hover: '#0e1c30', border: '#1a3050', label: 'Bond District',  labelColor: '#2060a0' },
  city:   { bg: '#111118', hover: '#1a1a28', border: '#2c2c40', label: 'City Center',    labelColor: '#6060a0' },
  stocks: { bg: '#081408', hover: '#0c1e0c', border: '#1a3a1a', label: 'Stock District', labelColor: '#207820' },
  crypto: { bg: '#120818', hover: '#1c0c26', border: '#3a1060', label: 'Crypto Zone',    labelColor: '#6020a0' },
}

/* ── Building shadow/glow colors ────────────────────────────────── */
const BUILDING_GLOW = {
  rathaus: '0 0 12px rgba(180,140,50,0.4)',
  library: '0 0 10px rgba(20,160,160,0.35)',
  bond:    '0 0 10px rgba(37,100,180,0.4)',
  stock:   '0 0 10px rgba(30,140,60,0.4)',
  gold:    '0 0 12px rgba(200,150,20,0.45)',
  crypto:  '0 0 14px rgba(140,40,220,0.5)',
  etf:     '0 0 10px rgba(8,145,178,0.4)',
}

export default function CityGrid({ grid, onLibraryClick }) {
  return (
    <main className="flex-1 relative overflow-hidden" style={{ background: '#0a0e1a' }}>
      <TransformWrapper
        initialScale={1}
        minScale={0.4}
        maxScale={4}
        wheel={{ step: 0.1 }}
        doubleClick={{ disabled: false, step: 0.7 }}
        panning={{ velocityDisabled: true }}
      >
        <TransformComponent
          wrapperStyle={{ width: '100%', height: '100%' }}
          contentStyle={{ width: '100%', height: '100%' }}
        >
          {/* District background bands */}
          <DistrictBands />

          {/* The grid — fills full area */}
          <div
            className="absolute inset-0"
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${GRID_COLS}, 1fr)`,
              gridTemplateRows: `repeat(${GRID_ROWS}, 1fr)`,
              gap: '1px',
              padding: '2px',
            }}
          >
            {grid.map((cell, i) => {
              const district = DISTRICT_OF[i]
              const ds = DISTRICT_STYLE[district]
              const BuildingComp = cell ? BUILDING_SVG[cell] : null
              const isLibrary = cell === 'library'
              const building = cell ? BUILDINGS[cell] : null

              return (
                <div
                  key={i}
                  onClick={isLibrary ? onLibraryClick : undefined}
                  title={building ? building.label : `${ds.label} — empty lot`}
                  className="relative group transition-all duration-150 cursor-pointer overflow-hidden"
                  style={{
                    background: BuildingComp ? 'transparent' : ds.bg,
                    border: `1px solid ${ds.border}`,
                    borderRadius: '2px',
                    boxShadow: BuildingComp ? BUILDING_GLOW[cell] : 'none',
                  }}
                  onMouseEnter={e => { if (!BuildingComp) e.currentTarget.style.background = ds.hover }}
                  onMouseLeave={e => { if (!BuildingComp) e.currentTarget.style.background = ds.bg }}
                >
                  {BuildingComp ? (
                    <div className="w-full h-full flex items-end justify-center p-[6%]"
                      style={{ background: ds.bg }}>
                      <BuildingComp />
                    </div>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg viewBox="0 0 20 20" width="30%" height="30%">
                        <line x1="10" y1="2" x2="10" y2="18" stroke={ds.labelColor} strokeWidth="1" opacity="0.5"/>
                        <line x1="2" y1="10" x2="18" y2="10" stroke={ds.labelColor} strokeWidth="1" opacity="0.5"/>
                        <circle cx="10" cy="10" r="2" fill={ds.labelColor} opacity="0.4"/>
                      </svg>
                    </div>
                  )}

                  {BuildingComp && (
                    <div className="absolute bottom-0 left-0 right-0 text-center text-[9px] font-medium opacity-0 group-hover:opacity-100 transition-opacity pb-0.5 leading-tight"
                      style={{ color: '#ffffff99', background: 'rgba(0,0,0,0.5)' }}>
                      {building?.label}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* District name overlays */}
          <DistrictLabels />
        </TransformComponent>
      </TransformWrapper>
    </main>
  )
}

/* Colored background bands per district region */
function DistrictBands() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-0 left-0 right-0" style={{
        height: `${(2 / GRID_ROWS) * 100}%`,
        background: 'linear-gradient(180deg, #1e1408 0%, #160f06 100%)',
        borderBottom: '2px solid #4a3210',
      }}/>
      <div className="absolute bottom-0 left-0 right-0" style={{
        height: `${(2 / GRID_ROWS) * 100}%`,
        background: 'linear-gradient(0deg, #120818 0%, #0e0614 100%)',
        borderTop: '2px solid #3a1060',
      }}/>
      <div className="absolute" style={{
        top: `${(2 / GRID_ROWS) * 100}%`,
        bottom: `${(2 / GRID_ROWS) * 100}%`,
        left: 0,
        width: `${(3 / GRID_COLS) * 100}%`,
        background: 'linear-gradient(90deg, #08121e 0%, #0a1828 100%)',
        borderRight: '2px solid #1a3050',
      }}/>
      <div className="absolute" style={{
        top: `${(2 / GRID_ROWS) * 100}%`,
        bottom: `${(2 / GRID_ROWS) * 100}%`,
        right: 0,
        width: `${(3 / GRID_COLS) * 100}%`,
        background: 'linear-gradient(270deg, #081408 0%, #0a1a0a 100%)',
        borderLeft: '2px solid #1a3a1a',
      }}/>
    </div>
  )
}

/* Floating district name labels */
function DistrictLabels() {
  const w = 100 / GRID_COLS
  const h = 100 / GRID_ROWS

  const labels = [
    { label: 'GOLD DISTRICT',  x: 50,       y: h * 0.5,  color: '#a07020' },
    { label: 'BOND DISTRICT',  x: w * 1.5,  y: 50,       color: '#2060a0', rotate: true },
    { label: 'CITY CENTER',    x: w * 6,    y: 50,       color: '#4a4a80' },
    { label: 'STOCK DISTRICT', x: w * 10.5, y: 50,       color: '#207820', rotate: true },
    { label: 'CRYPTO ZONE',    x: 50,       y: h * 7.5,  color: '#6020a0' },
  ]

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {labels.map(({ label, x, y, color, rotate }) => (
        <div
          key={label}
          className="absolute text-[10px] font-bold tracking-[0.2em] uppercase select-none whitespace-nowrap"
          style={{
            left: `${x}%`,
            top: `${y}%`,
            transform: `translate(-50%, -50%)${rotate ? ' rotate(-90deg)' : ''}`,
            color,
            opacity: 0.35,
            letterSpacing: '0.2em',
          }}
        >
          {label}
        </div>
      ))}
    </div>
  )
}
