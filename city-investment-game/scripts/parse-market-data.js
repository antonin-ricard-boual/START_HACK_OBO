// Run: node scripts/parse-market-data.js
// Outputs: src/data/marketData.js

import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DATA_DIR = resolve(__dirname, '../../PostFinance-START-Hack-2026')
const OUT_DIR  = resolve(__dirname, '../src/data')

function parseCSVLine(line) {
  const fields = []
  let cur = '', inQuote = false
  for (let i = 0; i < line.length; i++) {
    const ch = line[i]
    if (ch === '"') { inQuote = !inQuote }
    else if (ch === ',' && !inQuote) { fields.push(cur.trim()); cur = '' }
    else { cur += ch }
  }
  fields.push(cur.trim())
  return fields
}

function parseCSV(filename) {
  const raw = readFileSync(resolve(DATA_DIR, filename), 'utf8')
  return raw.split('\n').map(parseCSVLine)
}

function toNum(s) {
  if (!s || s === '#N/A' || s === '') return null
  const n = parseFloat(s.replace(/[, ]/g, ''))
  return isNaN(n) ? null : n
}

function pct(start, end) {
  if (!start || !end) return null
  return +((end - start) / start * 100).toFixed(2)
}

// -- STOCKS (DJIA) -----------------------------------------------------------
function parseStocks(filename, market) {
  const rows = parseCSV(filename)
  const names   = rows[0].slice(1)
  const tickers = rows[1].slice(1)
  const dataRows = rows.slice(2).filter(r => r[0] && r.length > 1)

  return tickers.map((ticker, i) => {
    const prices = dataRows
      .map(row => ({ date: row[0], price: toNum(row[i + 1]) }))
      .filter(p => p.price !== null)

    if (prices.length < 2) return null

    const latest  = prices[prices.length - 1].price
    const oneYAgo = prices[Math.max(0, prices.length - 52)]?.price
    const fiveYAgo = prices[Math.max(0, prices.length - 260)]?.price

    // keep last 52 weekly prices for sparkline
    const history = prices.slice(-52).map(p => p.price)

    return {
      id: ticker,
      name: names[i],
      ticker,
      market,
      price: +latest.toFixed(2),
      return1Y: pct(oneYAgo, latest),
      return5Y: pct(fiveYAgo, latest),
      history,
    }
  }).filter(Boolean)
}

// -- BONDS -------------------------------------------------------------------
function parseBonds() {
  const rows = parseCSV('Market_Data - Bonds.csv')
  const dataRows = rows.slice(2).filter(r => r[0])

  // Col 0 = date, 1 = Swiss Bond AAA-BBB, 2 = Bloomberg Global Agg, 3 = CH Gov 10Y yield
  function series(colIndex) {
    return dataRows.map(r => toNum(r[colIndex])).filter(v => v !== null)
  }

  const bond = (id, name, colIndex, description) => {
    const prices = series(colIndex)
    if (prices.length < 2) return null
    const latest   = prices[prices.length - 1]
    const oneYAgo  = prices[Math.max(0, prices.length - 52)]
    const fiveYAgo = prices[Math.max(0, prices.length - 260)]
    return {
      id, name, description,
      price: +latest.toFixed(2),
      return1Y: pct(oneYAgo, latest),
      return5Y: pct(fiveYAgo, latest),
      history: prices.slice(-52),
    }
  }

  return [
    bond('CH-AAA', 'Swiss Bond AAA-BBB', 1, 'Swiss investment-grade bonds total return index'),
    bond('GLOBAL-AGG', 'Bloomberg Global Agg', 2, 'Global bonds, CHF hedged'),
    bond('CH-GOV-10Y', 'CH Gov. Bond 10Y', 3, 'Swiss government 10-year yield'),
  ].filter(Boolean)
}

// -- GOLD --------------------------------------------------------------------
function parseGold() {
  const rows = parseCSV('Market_Data - Gold.csv')
  const dataRows = rows.slice(1).filter(r => r[0])

  const prices = dataRows.map(r => toNum(r[2])).filter(v => v !== null) // col 2 = CHF
  if (prices.length < 2) return []
  const latest   = prices[prices.length - 1]
  const oneYAgo  = prices[Math.max(0, prices.length - 52)]
  const fiveYAgo = prices[Math.max(0, prices.length - 260)]

  return [{
    id: 'GOLD-CHF',
    name: 'Gold (CHF)',
    description: 'Physical gold priced in CHF/oz',
    price: +latest.toFixed(2),
    return1Y: pct(oneYAgo, latest),
    return5Y: pct(fiveYAgo, latest),
    history: prices.slice(-52),
  }]
}

// -- INDICES -----------------------------------------------------------------
function parseIndices() {
  const rows = parseCSV('Market_Data - Equity Indices.csv')
  const names    = rows[0].slice(1)
  const dataRows = rows.slice(1).filter(r => r[0])

  return names.map((name, i) => {
    const prices = dataRows.map(r => toNum(r[i + 1])).filter(v => v !== null)
    if (prices.length < 2) return null
    const latest   = prices[prices.length - 1]
    const oneYAgo  = prices[Math.max(0, prices.length - 52)]
    const fiveYAgo = prices[Math.max(0, prices.length - 260)]
    return {
      id: `IDX-${i}`,
      name: name.trim(),
      description: 'Equity index (ETF)',
      price: +latest.toFixed(2),
      return1Y: pct(oneYAgo, latest),
      return5Y: pct(fiveYAgo, latest),
      history: prices.slice(-52),
    }
  }).filter(Boolean)
}

// -- ASSEMBLE & WRITE --------------------------------------------------------
const djia = parseStocks('Market_Data - DJIA_Single Stocks.csv', 'US')
const smi  = parseStocks('Market_Data - SMI_Single Stocks.csv',  'CH')
const bonds   = parseBonds()
const gold    = parseGold()
const indices = parseIndices()

const out = { stocks: [...djia, ...smi], bonds, gold, etf: indices }

mkdirSync(OUT_DIR, { recursive: true })
writeFileSync(
  resolve(OUT_DIR, 'marketData.js'),
  `// Auto-generated by scripts/parse-market-data.js — do not edit manually\nexport const MARKET_DATA = ${JSON.stringify(out, null, 2)}\n`
)

console.log(`✅ Written to src/data/marketData.js`)
console.log(`   Stocks : ${out.stocks.length} (${djia.length} US + ${smi.length} CH)`)
console.log(`   Bonds  : ${out.bonds.length}`)
console.log(`   Gold   : ${out.gold.length}`)
console.log(`   ETF/Idx: ${out.etf.length}`)
