export default function TopBar({ total, portfolio, metrics, badges }) {
  const formatted = total.toLocaleString('de-CH', { style: 'currency', currency: 'CHF' })
  const riskColor =
    metrics.risk < 30 ? 'text-green-400' :
    metrics.risk < 60 ? 'text-yellow-400' :
                        'text-red-400'

  return (
    <header className="flex items-center justify-between px-6 py-2.5 bg-slate-800 border-b border-slate-700 shrink-0">
      {/* Branding */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-yellow-400 rounded flex items-center justify-center font-bold text-slate-900 text-xs leading-none">
          PF
        </div>
        <div>
          <div className="font-semibold text-sm leading-tight">PostFinance Tower</div>
          <div className="text-slate-400 text-xs">Level {badges.length + 1}</div>
        </div>
      </div>

      {/* Portfolio metrics */}
      <div className="flex gap-5 text-xs">
        <Stat label="Total Value" value={formatted} valueClass="text-white text-sm font-bold" />
        <Stat label="Risk Score" value={`${metrics.risk}/100`} valueClass={riskColor} />
        <Stat label="Diversification" value={`${metrics.diversification}%`} valueClass="text-blue-400" />
        <Stat label="Bonds" value={fmtN(portfolio.bonds)} valueClass="text-blue-300" />
        <Stat label="Stocks" value={fmtN(portfolio.stocks)} valueClass="text-green-300" />
        <Stat label="Gold" value={fmtN(portfolio.gold)} valueClass="text-yellow-300" />
        <Stat label="Crypto" value={fmtN(portfolio.crypto)} valueClass="text-purple-300" />
        <Stat label="ETF" value={fmtN(portfolio.etf)} valueClass="text-cyan-300" />
      </div>

      {/* Badges */}
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <span>🏅 {badges.length} badge{badges.length !== 1 ? 's' : ''}</span>
        <div className="w-7 h-7 rounded-full bg-slate-600 flex items-center justify-center text-xs">👤</div>
      </div>
    </header>
  )
}

function Stat({ label, value, valueClass }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-slate-400 text-[10px] uppercase tracking-wider">{label}</span>
      <span className={`font-semibold ${valueClass}`}>{value}</span>
    </div>
  )
}

function fmtN(n) {
  return n === 0 ? '—' : n.toLocaleString('de-CH')
}
