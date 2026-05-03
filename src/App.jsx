import React, { useState } from 'react'
import Cover from './components/Cover'
import MapCanvas from './components/MapCanvas'
import ContentPanel from './components/ContentPanel'
import { useIsMobile } from './hooks/useIsMobile'

export default function App() {
  const isMobile = useIsMobile()

  const [coverOpen, setCoverOpen] = useState(false)
  const [activeStage, setActiveStage] = useState(null)
  const [activeOrigin, setActiveOrigin] = useState({ x: 0, y: 0 })

  function handleCityClick(id, x, y) {
    setActiveOrigin({ x, y })
    setActiveStage(id)
  }

  function handleReturnToCover() {
    setCoverOpen(false)
  }

  return (
    <div className="app-shell">
      <MapCanvas
        revealed={coverOpen}
        activeStage={activeStage}
        onCityClick={handleCityClick}
        onReturnToCover={handleReturnToCover}
      />
      {coverOpen && (
        <button className="flip-map-btn" onClick={() => setCoverOpen(false)}>
          ← cover
        </button>
      )}
      <Cover
        onOpen={() => setCoverOpen(true)}
        coverOpen={coverOpen}
        isMobile={isMobile}
      />
      {activeStage && (
        <ContentPanel
          stageId={activeStage}
          originX={activeOrigin.x}
          originY={activeOrigin.y}
          onClose={() => setActiveStage(null)}
          onNavigate={(id) => setActiveStage(id)}
        />
      )}
    </div>
  )
}
