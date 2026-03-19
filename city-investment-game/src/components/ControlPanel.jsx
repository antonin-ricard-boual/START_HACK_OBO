import { BUILDINGS } from '../constants/game'

const BUY_BUTTONS = [
  { buildingType: 'bond',   label: 'Gov. Bond',     activeStyle: { background: '#0f2d5c', border: '1px solid #1e4d8c', color: '#60a5fa' } },
  { buildingType: 'stock',  label: 'Stock',         activeStyle: { background: '#0a2818', border: '1px solid #1a5c30', color: '#4ade80' } },
  { buildingType: 'gold',   label: 'Gold',          activeStyle: { background: '#2a1a06', border: '1px solid #6b4a10', color: '#f0c040' } },
  { buildingType: 'etf',    label: 'ETF / Index',   activeStyle: { background: '#061830', border: '1px solid #0c4060', color: '#06b6d4' } },
  { buildingType: 'crypto', label: 'Crypto',        activeStyle: { background: '#1a0630', border: '1px solid #4a1060', color: '#a855f7' } },
]

export default function ControlPanel({ balance, unlockedAssets, onBuy, onTriggerEvent }) {
  return (
    <footer className="shrink-0 flex items-center justify-between px-5 py-2.5"
      style={{ background: '#0d1117', borderTop: '1px solid #1e2535' }}>

      {/* Balance */}
      <div className="min-w-[110px]">
        <div className="text-[9px] uppercase tracking-widest" style={{ color: '#374151' }}>Balance</div>
        <div className="text-sm font-bold" style={{ color: '#e2c87a' }}>
          CHF {balance.toLocaleString('de-CH')}
        </div>
      </div>

      {/* Buy buttons */}
      <div className="flex items-center gap-2">
        {BUY_BUTTONS.map(({ buildingType, label, activeStyle }) => {
          const assetKey = BUILDINGS[buildingType].assetKey
          const isUnlocked = unlockedAssets.includes(assetKey)
          const cost = BUILDINGS[buildingType].cost
          const canAfford = balance >= cost
          const active = isUnlocked && canAfford

          return (
            <button
              key={buildingType}
              onClick={() => active && onBuy(buildingType)}
              disabled={!active}
              className="flex flex-col items-center px-4 py-1.5 rounded transition-all text-xs font-medium min-w-[90px]"
              style={active ? activeStyle : {
                background: '#0d1117',
                border: '1px solid #1e2535',
                color: '#2a3040',
                cursor: isUnlocked ? 'not-allowed' : 'not-allowed',
              }}
            >
              <span>{isUnlocked ? label : `\u{1F512} ${label}`}</span>
              <span className="text-[10px] mt-0.5 font-normal" style={{ opacity: 0.6 }}>
                {isUnlocked ? `CHF ${cost}` : 'Study to unlock'}
              </span>
            </button>
          )
        })}
      </div>

      {/* Random event */}
      <button
        onClick={onTriggerEvent}
        className="text-xs px-3 py-2 rounded transition-colors"
        style={{ background: '#1a0a0a', border: '1px solid #4a1010', color: '#f87171' }}
      >
        &#127922; Event
      </button>
    </footer>
  )
}
