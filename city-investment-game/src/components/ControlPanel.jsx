import { BUILDINGS } from '../constants/game'

const BUY_BUTTONS = [
  { buildingType: 'bond',   label: '🏘️ Gov. Bond',  colorOn: 'bg-blue-800 hover:bg-blue-600 border-blue-600',     colorOff: 'bg-slate-700 border-slate-600 opacity-40' },
  { buildingType: 'stock',  label: '🏢 Stock',       colorOn: 'bg-green-800 hover:bg-green-600 border-green-600',   colorOff: 'bg-slate-700 border-slate-600 opacity-40' },
  { buildingType: 'gold',   label: '🪙 Gold',        colorOn: 'bg-yellow-700 hover:bg-yellow-500 border-yellow-500',colorOff: 'bg-slate-700 border-slate-600 opacity-40' },
  { buildingType: 'etf',    label: '📊 ETF',         colorOn: 'bg-cyan-800 hover:bg-cyan-600 border-cyan-600',      colorOff: 'bg-slate-700 border-slate-600 opacity-40' },
  { buildingType: 'crypto', label: '⚡ Crypto',      colorOn: 'bg-purple-800 hover:bg-purple-600 border-purple-600',colorOff: 'bg-slate-700 border-slate-600 opacity-40' },
]

export default function ControlPanel({ balance, unlockedAssets, onBuy, onTriggerEvent }) {
  return (
    <footer className="shrink-0 bg-slate-800 border-t border-slate-700 px-6 py-3">
      <div className="flex items-center justify-between max-w-4xl mx-auto">

        {/* Balance */}
        <div className="text-sm min-w-[100px]">
          <span className="text-slate-400 text-[10px] uppercase tracking-wider block">Balance</span>
          <span className="font-bold text-white">CHF {balance.toLocaleString('de-CH')}</span>
        </div>

        {/* Buy buttons */}
        <div className="flex gap-2">
          {BUY_BUTTONS.map(({ buildingType, label, colorOn, colorOff }) => {
            const assetKey = BUILDINGS[buildingType].assetKey
            const isUnlocked = unlockedAssets.includes(assetKey)
            const cost = BUILDINGS[buildingType].cost
            const canAfford = balance >= cost

            return (
              <button
                key={buildingType}
                onClick={() => isUnlocked && canAfford && onBuy(buildingType)}
                disabled={!isUnlocked || !canAfford}
                className={`
                  flex flex-col items-center px-4 py-1.5 rounded-lg border text-xs font-medium
                  transition-colors min-w-[90px]
                  ${isUnlocked && canAfford ? colorOn : colorOff}
                  ${!isUnlocked || !canAfford ? 'cursor-not-allowed' : 'cursor-pointer'}
                `}
              >
                <span>{isUnlocked ? label : `🔒 ${label.split(' ').slice(1).join(' ')}`}</span>
                <span className="text-white/50 text-[10px] mt-0.5 font-normal">
                  {isUnlocked ? `CHF ${cost}` : 'Study to unlock'}
                </span>
              </button>
            )
          })}
        </div>

        {/* Event trigger */}
        <button
          onClick={onTriggerEvent}
          className="text-xs px-3 py-2 bg-red-900/60 hover:bg-red-700 border border-red-800 rounded-lg transition-colors"
        >
          🎲 Random Event
        </button>
      </div>
    </footer>
  )
}
