import { DISTRICT_OF, BUILDINGS } from '../constants/game'

// Empty district cell backgrounds
const DISTRICT_BG = {
  gold:   'bg-yellow-950/70 border-yellow-800/50 hover:bg-yellow-900/50',
  bonds:  'bg-blue-950/70   border-blue-800/50   hover:bg-blue-900/50',
  city:   'bg-slate-700/50  border-slate-600/50  hover:bg-slate-600/50',
  stocks: 'bg-green-950/70  border-green-800/50  hover:bg-green-900/50',
  crypto: 'bg-purple-950/70 border-purple-800/50 hover:bg-purple-900/50',
}

// Placed building styles
const BUILDING_BG = {
  rathaus: 'bg-amber-600  border-amber-400',
  library: 'bg-teal-700   border-teal-400',
  bond:    'bg-blue-700   border-blue-400',
  stock:   'bg-green-700  border-green-400',
  gold:    'bg-yellow-600 border-yellow-300',
  crypto:  'bg-purple-700 border-purple-400',
  etf:     'bg-cyan-700   border-cyan-400',
}

export default function CityGrid({ grid, onLibraryClick }) {
  return (
    <main className="flex-1 flex flex-col items-center justify-center gap-1 px-4">
      <DistrictLabel label="── Gold District ──" color="text-yellow-600/60" />

      <div className="flex items-center gap-2">
        <DistrictLabel label="Bond District" color="text-blue-500/60" rotate />

        <div className="grid grid-cols-6 gap-1">
          {grid.map((cell, i) => {
            const district = DISTRICT_OF[i]
            const building = cell ? BUILDINGS[cell] : null
            const isLibrary = cell === 'library'

            return (
              <div
                key={i}
                onClick={isLibrary ? onLibraryClick : undefined}
                title={building ? building.label : `Empty — ${district} district`}
                className={`
                  w-[72px] h-[72px] border-2 rounded flex flex-col items-center justify-center gap-0.5
                  transition-all select-none cursor-pointer
                  ${building ? BUILDING_BG[cell] : DISTRICT_BG[district]}
                  ${isLibrary ? 'hover:scale-105 hover:shadow-lg' : ''}
                `}
              >
                {building ? (
                  <>
                    <span className="text-xl leading-none">{building.emoji}</span>
                    <span className="text-[9px] font-medium text-white/80 text-center leading-tight px-0.5">
                      {building.label}
                    </span>
                  </>
                ) : (
                  <span className="text-slate-600 text-lg leading-none">+</span>
                )}
              </div>
            )
          })}
        </div>

        <DistrictLabel label="Stock District" color="text-green-500/60" rotate />
      </div>

      <DistrictLabel label="── Crypto Zone ──" color="text-purple-500/60" />
    </main>
  )
}

function DistrictLabel({ label, color, rotate }) {
  return (
    <div
      className={`text-[10px] font-medium tracking-widest uppercase ${color} ${
        rotate ? 'writing-mode-vertical' : ''
      }`}
      style={rotate ? { writingMode: 'vertical-rl', textOrientation: 'mixed' } : {}}
    >
      {label}
    </div>
  )
}
