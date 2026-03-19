export default function TopBar({ total, portfolio, metrics, badges }) {
  const formatted = total.toLocaleString('de-CH', { style: 'currency', currency: 'CHF' })
  const riskColor  = metrics.risk < 30 ? '#4ade80' : metrics.risk < 60 ? '#facc15' : '#f87171'
  const riskLabel  = metrics.risk < 30 ? 'Low' : metrics.risk < 60 ? 'Medium' : 'High'

  return (
    <header style={{ background: '#0d1117', borderBottom: '1px solid #1e2535' }}
      className="shrink-0 flex items-center justify-between px-5 py-2 text-white">

      {/* Branding */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded flex items-center justify-center font-black text-xs"
          style={{ background: '#f0c040', color: '#0a0e1a' }}>PF</div>
        <div>
          <div className="font-semibold text-sm leading-tight" style={{ color: '#e2c87a' }}>
            PostFinance Tower
          </div>
          <div className="text-[10px]" style={{ color: '#4a5568' }}>
            Level {badges.length + 1} · {badges.length} badge{badges.length !== 1 ? 's' : ''}
          </div>
        </div>
      </div>

      {/* Central metrics */}
      <div className="flex items-center gap-6">
        {/* Total value — prominent */}
        <div className="flex flex-col items-center">
          <span className="text-[10px] uppercase tracking-widest" style={{ color: '#4a5568' }}>Portfolio</span>
          <span className="text-base font-bold" style={{ color: '#e2c87a' }}>{formatted}</span>
        </div>

        <Divider />

        <StatPill label="Risk" value={`${metrics.risk}/100`} sub={riskLabel} valueColor={riskColor} />
        <StatPill label="Diversif." value={`${metrics.diversification}%`} valueColor="#60a5fa" />

        <Divider />

        <StatPill label="Bonds"  value={fmtN(portfolio.bonds)}  valueColor="#3b82f6" />
        <StatPill label="Stocks" value={fmtN(portfolio.stocks)} valueColor="#22c55e" />
        <StatPill label="Gold"   value={fmtN(portfolio.gold)}   valueColor="#f0c040" />
        <StatPill label="Crypto" value={fmtN(portfolio.crypto)} valueColor="#a855f7" />
        <StatPill label="ETF"    value={fmtN(portfolio.etf)}    valueColor="#06b6d4" />
      </div>

      {/* Avatar */}
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold"
          style={{ background: '#1e2535', color: '#6b7280' }}>
          P
        </div>
        <span className="text-xs" style={{ color: '#4a5568' }}>Investor</span>
      </div>
    </header>
  )
}

function StatPill({ label, value, sub, valueColor }) {
  return (
    <div className="flex flex-col items-center leading-none gap-0.5">
      <span className="text-[9px] uppercase tracking-widest" style={{ color: '#374151' }}>{label}</span>
      <span className="text-xs font-semibold" style={{ color: valueColor }}>{value}</span>
      {sub && <span className="text-[9px]" style={{ color: valueColor, opacity: 0.7 }}>{sub}</span>}
    </div>
  )
}

function Divider() {
  return <div className="w-px h-6" style={{ background: '#1e2535' }} />
}

function fmtN(n) {
  return n === 0 ? '—' : n.toLocaleString('de-CH', { maximumFractionDigits: 0 })
}
