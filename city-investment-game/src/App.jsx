import { useState } from 'react'
import TopBar from './components/TopBar'
import CityGrid from './components/CityGrid'
import ControlPanel from './components/ControlPanel'
import Library from './components/Library'
import EventBanner from './components/EventBanner'
import AssetPicker from './components/AssetPicker'
import { GRID_COLS, GRID_ROWS, DISTRICT_OF, BUILDINGS, EVENTS, computeMetrics } from './constants/game'

// City center rows 2-5, cols 3-8. Rathaus row 3 col 5, Library row 4 col 6.
const RATHAUS_INDEX = 3 * GRID_COLS + 5   // 41
const LIBRARY_INDEX = 4 * GRID_COLS + 6   // 54

function createGrid() {
  const grid = Array(GRID_COLS * GRID_ROWS).fill(null)
  grid[RATHAUS_INDEX] = 'rathaus'
  grid[LIBRARY_INDEX] = 'library'
  return grid
}

const INITIAL_PORTFOLIO = { bonds: 1000, stocks: 0, gold: 0, crypto: 0, etf: 0 }

export default function App() {
  const [grid, setGrid] = useState(createGrid)
  const [portfolio, setPortfolio] = useState(INITIAL_PORTFOLIO)
  const [balance, setBalance] = useState(500)
  const [unlockedAssets, setUnlockedAssets] = useState(['bonds'])
  const [badges, setBadges] = useState([])
  const [showLibrary, setShowLibrary] = useState(false)
  const [activeEvent, setActiveEvent] = useState(null)
  const [picker, setPicker] = useState(null)

  const total = Object.values(portfolio).reduce((a, b) => a + b, 0)
  const metrics = computeMetrics(portfolio)

  function openPicker(buildingType) {
    const building = BUILDINGS[buildingType]
    if (balance < building.cost) return
    setPicker({ buildingType })
  }

  function confirmPurchase(buildingType, chosenAsset) {
    const building = BUILDINGS[buildingType]
    setPicker(null)
    setGrid(prev => {
      const i = prev.findIndex(
        (cell, idx) => cell === null && DISTRICT_OF[idx] === building.district
      )
      if (i === -1) return prev
      const next = [...prev]
      next[i] = buildingType
      return next
    })
    setBalance(b => b - building.cost)
    if (building.assetKey) {
      setPortfolio(p => ({
        ...p,
        [building.assetKey]: p[building.assetKey] + (chosenAsset?.price ?? building.portfolioAdd),
      }))
    }
  }

  function unlockAsset(assetId, badge) {
    setUnlockedAssets(prev => prev.includes(assetId) ? prev : [...prev, assetId])
    if (badge) setBadges(prev => prev.includes(badge) ? prev : [...prev, badge])
  }

  function triggerRandomEvent() {
    const event = EVENTS[Math.floor(Math.random() * EVENTS.length)]
    setActiveEvent(event)
    setPortfolio(prev => {
      const next = { ...prev }
      for (const [key, multiplier] of Object.entries(event.effect)) {
        if (next[key] !== undefined) next[key] = Math.max(0, Math.round(next[key] * (1 + multiplier)))
      }
      return next
    })
    setTimeout(() => setActiveEvent(null), 4000)
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden" style={{ background: '#0a0e1a' }}>
      <TopBar total={total} portfolio={portfolio} metrics={metrics} badges={badges} />
      {activeEvent && <EventBanner event={activeEvent} />}
      <CityGrid grid={grid} onLibraryClick={() => setShowLibrary(true)} />
      <ControlPanel
        balance={balance}
        unlockedAssets={unlockedAssets}
        onBuy={openPicker}
        onTriggerEvent={triggerRandomEvent}
      />

      {picker && (
        <AssetPicker
          buildingType={picker.buildingType}
          cost={BUILDINGS[picker.buildingType].cost}
          onConfirm={(asset) => confirmPurchase(picker.buildingType, asset)}
          onClose={() => setPicker(null)}
        />
      )}

      {showLibrary && (
        <Library
          unlockedAssets={unlockedAssets}
          badges={badges}
          onUnlock={unlockAsset}
          onClose={() => setShowLibrary(false)}
        />
      )}
    </div>
  )
}
