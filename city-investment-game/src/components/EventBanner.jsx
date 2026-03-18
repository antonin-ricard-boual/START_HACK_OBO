export default function EventBanner({ event }) {
  const bg = event.isNegative
    ? 'bg-red-900/90 border-red-700'
    : 'bg-emerald-900/90 border-emerald-700'

  return (
    <div className={`shrink-0 flex items-center justify-center gap-3 px-6 py-2 border-b text-sm animate-pulse ${bg}`}>
      <span className="text-xl">{event.emoji}</span>
      <span className="font-bold">{event.label}</span>
      <span className="text-white/70">{event.description}</span>
      <EffectPills effect={event.effect} />
    </div>
  )
}

function EffectPills({ effect }) {
  return (
    <div className="flex gap-1 ml-2">
      {Object.entries(effect).map(([asset, delta]) => (
        <span
          key={asset}
          className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-bold ${
            delta > 0 ? 'bg-green-800 text-green-300' : 'bg-red-800 text-red-300'
          }`}
        >
          {asset} {delta > 0 ? '+' : ''}{Math.round(delta * 100)}%
        </span>
      ))}
    </div>
  )
}
