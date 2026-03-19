export const GRID_COLS = 12
export const GRID_ROWS = 8

/*
  Grid layout (12×8):
  ┌──────────────────────────────────────────────────┐
  │  GOLD  GOLD  GOLD  GOLD  GOLD  GOLD  ... (row 0) │
  │  GOLD  GOLD  GOLD  GOLD  GOLD  GOLD  ... (row 1) │
  │ BOND│BOND│BOND│ CITY  CITY  CITY  CITY│STCK│STCK│STCK │ (rows 2-5)
  │  CRYPTO  CRYPTO  CRYPTO  CRYPTO  ...  (rows 6-7) │
  └──────────────────────────────────────────────────┘
*/
export const DISTRICT_OF = Array.from({ length: GRID_COLS * GRID_ROWS }, (_, i) => {
  const row = Math.floor(i / GRID_COLS)
  const col = i % GRID_COLS
  if (row <= 1) return 'gold'
  if (row >= 6) return 'crypto'
  if (col <= 2) return 'bonds'
  if (col >= 9) return 'stocks'
  return 'city'
})

export const DISTRICTS = {
  gold:   { label: 'Gold District',  emoji: '🪙', description: 'Safe haven assets' },
  bonds:  { label: 'Bond District',  emoji: '🏘️', description: 'Stable fixed income' },
  city:   { label: 'City Center',    emoji: '🏛️', description: 'PostFinance HQ' },
  stocks: { label: 'Stock District', emoji: '🏢', description: 'High growth equity' },
  crypto: { label: 'Crypto Zone',    emoji: '⚡', description: 'High risk, high reward' },
}

// cost   = CHF needed to place
// assetKey  = which portfolio key it adds to (null for special buildings)
// portfolioAdd = CHF added to portfolio on placement
// riskWeight   = how much it contributes to risk score (0-100)
export const BUILDINGS = {
  rathaus: { emoji: '🏛️', label: 'Rathaus',     cost: 0,   district: 'city',   assetKey: null,     portfolioAdd: 0,   riskWeight: 0  },
  library: { emoji: '📚', label: 'Library',      cost: 0,   district: 'city',   assetKey: null,     portfolioAdd: 0,   riskWeight: 0  },
  bond:    { emoji: '🏘️', label: 'Bond House',   cost: 100, district: 'bonds',  assetKey: 'bonds',  portfolioAdd: 100, riskWeight: 10 },
  stock:   { emoji: '🏢', label: 'Skyscraper',   cost: 200, district: 'stocks', assetKey: 'stocks', portfolioAdd: 200, riskWeight: 60 },
  gold:    { emoji: '🪙', label: 'Gold Vault',   cost: 150, district: 'gold',   assetKey: 'gold',   portfolioAdd: 150, riskWeight: 30 },
  crypto:  { emoji: '⚡', label: 'Crypto Tower', cost: 300, district: 'crypto', assetKey: 'crypto', portfolioAdd: 300, riskWeight: 90 },
  etf:     { emoji: '📊', label: 'ETF Center',   cost: 120, district: 'stocks', assetKey: 'etf',    portfolioAdd: 120, riskWeight: 35 },
}

// Lessons — each unlocks an asset class after quiz
export const LESSONS = [
  {
    id: 'stocks',
    title: 'What are Stocks?',
    body: 'A stock is a share of ownership in a company. When the company grows, your investment grows. But companies can also fail — making stocks riskier than bonds.',
    quiz: {
      question: 'What does buying a stock give you?',
      options: ['A loan to the company', 'Part ownership of a company', 'A guaranteed return', 'A government guarantee'],
      answer: 1,
    },
    unlocks: 'stocks',
    badge: '📈 Stock Trader',
  },
  {
    id: 'gold',
    title: 'Gold as a Safe Haven',
    body: 'Gold has been a store of value for thousands of years. During crises, investors flee to gold. It does not pay dividends, but it preserves wealth well over time.',
    quiz: {
      question: 'When does gold tend to perform best?',
      options: ['During economic booms', 'During crises and high inflation', 'Only in summer', 'When interest rates are very high'],
      answer: 1,
    },
    unlocks: 'gold',
    badge: '🪙 Gold Collector',
  },
  {
    id: 'etf',
    title: 'ETFs — Instant Diversification',
    body: 'An ETF (Exchange-Traded Fund) bundles many assets into one product. You get automatic diversification at low cost. Ideal for long-term investors who want broad exposure.',
    quiz: {
      question: 'What is the main advantage of an ETF?',
      options: ['Guaranteed profits', 'Instant diversification at low cost', 'No market risk', 'Higher returns than individual stocks'],
      answer: 1,
    },
    unlocks: 'etf',
    badge: '📊 ETF Certified',
  },
  {
    id: 'crypto',
    title: 'Cryptocurrency',
    body: 'Crypto can multiply your investment — or wipe it out. Extreme volatility means large swings up AND down. Only invest what you can afford to lose completely.',
    quiz: {
      question: 'What is the biggest risk of cryptocurrency?',
      options: ['Low liquidity', 'Extreme price volatility', 'Government over-regulation', 'Slow transaction speed'],
      answer: 1,
    },
    unlocks: 'crypto',
    badge: '⚡ Crypto Pioneer',
  },
]

// Financial events — applied as portfolio multipliers
export const EVENTS = [
  {
    id: 'crisis',
    emoji: '📉',
    label: 'Financial Crisis!',
    description: 'Markets crash. Diversified portfolios resist better.',
    effect: { stocks: -0.30, crypto: -0.40, bonds: +0.05, gold: +0.15, etf: -0.20 },
    isNegative: true,
  },
  {
    id: 'techboom',
    emoji: '🚀',
    label: 'Tech Boom!',
    description: 'Tech stocks surge. Crypto follows. Bonds underperform.',
    effect: { stocks: +0.30, crypto: +0.50, bonds: -0.02, gold: -0.05, etf: +0.20 },
    isNegative: false,
  },
  {
    id: 'inflation',
    emoji: '💸',
    label: 'Inflation Spike!',
    description: 'Prices rise fast. Gold shines. Bonds lose value.',
    effect: { gold: +0.25, bonds: -0.15, stocks: +0.05, crypto: +0.10, etf: 0 },
    isNegative: true,
  },
  {
    id: 'recovery',
    emoji: '🌅',
    label: 'Market Recovery!',
    description: 'Economy rebounds. Most assets grow.',
    effect: { bonds: +0.08, stocks: +0.15, gold: +0.05, crypto: +0.20, etf: +0.12 },
    isNegative: false,
  },
]

export function computeMetrics(portfolio) {
  const total = Object.values(portfolio).reduce((a, b) => a + b, 0)
  if (total === 0) return { risk: 0, diversification: 0 }

  const RISK_WEIGHTS = { bonds: 10, stocks: 60, gold: 30, crypto: 90, etf: 35 }
  const risk = Object.entries(portfolio).reduce(
    (sum, [k, v]) => sum + (v / total) * (RISK_WEIGHTS[k] ?? 0), 0
  )
  const nonZero = Object.values(portfolio).filter(v => v > 0).length
  return {
    risk: Math.round(risk),
    diversification: Math.round((nonZero / Object.keys(portfolio).length) * 100),
  }
}
