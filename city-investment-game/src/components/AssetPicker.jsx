import { MARKET_DATA } from '../data/marketData'

const ASSET_MAP = {
  bond:   { label: '🏘️ Government Bond', assets: MARKET_DATA.bonds,  currency: 'CHF' },
  stock:  { label: '🏢 Stock',            assets: MARKET_DATA.stocks, currency: '' },
  gold:   { label: '🪙 Gold',             assets: MARKET_DATA.gold,   currency: 'CHF' },
  etf:    { label: '📊 ETF / Index',      assets: MARKET_DATA.etf,    currency: '' },
  crypto: { label: '⚡ Crypto',           assets: [],                 currency: '' },
}

export default function AssetPicker({ buildingType, cost, onConfirm, onClose }) {
  const config = ASSET_MAP[buildingType]
  if (!config) return null

  return (
    <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-xl border border-slate-600 w-full max-w-xl max-h-[75vh] flex flex-col shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-700 shrink-0">
          <div>
            <h2 className="font-bold text-sm">{config.label}</h2>
            <p className="text-slate-400 text-xs mt-0.5">Cost: CHF {cost} · Choose an asset to invest in</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white text-lg">✕</button>
        </div>

        {/* Column headers */}
        <div className="grid grid-cols-[1fr_80px_70px_70px] gap-2 px-5 py-2 text-[10px] text-slate-500 uppercase tracking-wider border-b border-slate-700 shrink-0">
          <span>Asset</span>
          <span className="text-right">Price</span>
          <span className="text-right">1Y return</span>
          <span className="text-right">5Y return</span>
        </div>

        {/* Asset list */}
        <div className="overflow-y-auto flex-1">
          {config.assets.length === 0 ? (
            <div className="p-6 text-center text-slate-500 text-sm">Coming soon</div>
          ) : (
            config.assets.map(asset => (
              <button
                key={asset.id}
                onClick={() => onConfirm(asset)}
                className="w-full grid grid-cols-[1fr_80px_70px_70px] gap-2 items-center px-5 py-2.5 hover:bg-slate-700 transition-colors text-left border-b border-slate-700/50 last:border-0"
              >
                {/* Name + sparkline */}
                <div className="flex items-center gap-3 min-w-0">
                  <Sparkline data={asset.history} />
                  <div className="min-w-0">
                    <div className="text-sm font-medium truncate">{asset.name}</div>
                    {'ticker' in asset && (
                      <div className="text-[10px] text-slate-500">{asset.ticker} · {asset.market}</div>
                    )}
                    {'description' in asset && (
                      <div className="text-[10px] text-slate-500 truncate">{asset.description}</div>
                    )}
                  </div>
                </div>

                <div className="text-right text-xs font-mono">
                  {asset.price.toLocaleString('de-CH', { maximumFractionDigits: 2 })}
                  {config.currency && <span className="text-slate-500 ml-0.5 text-[9px]">{config.currency}</span>}
                </div>

                <ReturnBadge value={asset.return1Y} />
                <ReturnBadge value={asset.return5Y} />
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

function ReturnBadge({ value }) {
  if (value === null) return <span className="text-right text-xs text-slate-600">—</span>
  const color = value >= 0 ? 'text-green-400' : 'text-red-400'
  return (
    <div className={`text-right text-xs font-mono font-medium ${color}`}>
      {value >= 0 ? '+' : ''}{value.toFixed(1)}%
    </div>
  )
}

function Sparkline({ data }) {
  if (!data || data.length < 2) return <div className="w-10 h-6" />
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
  const w = 40, h = 24
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w
    const y = h - ((v - min) / range) * h
    return `${x},${y}`
  }).join(' ')
  const color = data[data.length - 1] >= data[0] ? '#4ade80' : '#f87171'
  return (
    <svg width={w} height={h} className="shrink-0">
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  )
}
