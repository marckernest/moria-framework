import React, { useRef, useEffect, useCallback } from 'react'
import MapSVG from './MapSVG'
import { stages } from '../../data/stages'
import './MapCanvas.css'

const SCALE_MIN = 0.3
const SCALE_MAX = 2.0

function getInitialTransform() {
  // Behind the cover: journey centred, zoomed out
  const scale = 0.45
  const vw = window.innerWidth
  const vh = window.innerHeight
  const journeyCx = (450 + 2720) / 2
  const journeyCy = (560 + 1900) / 2
  return {
    x: vw / 2 - journeyCx * scale,
    y: vh / 2 - journeyCy * scale,
    scale,
  }
}

function getShireTransform() {
  // On reveal: The Shire horizontally centred, same scale
  const scale = 0.45
  const vw = window.innerWidth
  const vh = window.innerHeight
  return {
    x: vw / 2 - 450 * scale,
    y: vh / 2 - 1360 * scale,
    scale,
  }
}

const MAP_WIDTH = 3000

export default function MapCanvas({ onCityClick, activeStage, revealed, onReturnToCover }) {
  const viewportRef        = useRef(null)
  const canvasRef          = useRef(null)
  const t                  = useRef(getInitialTransform())
  const panning            = useRef(false)
  const lastPos            = useRef({ x: 0, y: 0 })
  const pinchDist          = useRef(null)
  const touchStart         = useRef({ x: 0, y: 0, time: 0 })
  const onReturnToCoverRef = useRef(onReturnToCover)

  useEffect(() => { onReturnToCoverRef.current = onReturnToCover }, [onReturnToCover])

  function applyTransform() {
    if (!canvasRef.current) return
    const { x, y, scale } = t.current
    canvasRef.current.style.transform = `translate(${x}px, ${y}px) scale(${scale})`
  }

  useEffect(() => { applyTransform() }, [])

  // On reveal: start at the journey-centred position, then animate to The Shire.
  useEffect(() => {
    if (!revealed) return
    t.current = getInitialTransform()
    applyTransform()

    const raf = requestAnimationFrame(() => {
      if (canvasRef.current) {
        canvasRef.current.style.transition = 'transform 1.6s cubic-bezier(0.4, 0, 0.2, 1)'
      }
      t.current = getShireTransform()
      applyTransform()

      const id = setTimeout(() => {
        if (canvasRef.current) canvasRef.current.style.transition = ''
      }, 1700)
      return () => clearTimeout(id)
    })

    return () => cancelAnimationFrame(raf)
  }, [revealed])

  // Pan camera to the active city whenever it changes
  useEffect(() => {
    if (!activeStage) return
    const stage = stages.find(s => s.id === activeStage)
    if (!stage) return
    const vw = window.innerWidth
    const vh = window.innerHeight
    const cx = stage.position.x / 100 * 3000
    const cy = stage.position.y / 100 * 2000
    if (canvasRef.current) {
      canvasRef.current.style.transition = 'transform 0.9s cubic-bezier(0.4, 0, 0.2, 1)'
    }
    t.current = { ...t.current, x: vw / 2 - cx * t.current.scale, y: vh / 2 - cy * t.current.scale }
    applyTransform()
    const id = setTimeout(() => {
      if (canvasRef.current) canvasRef.current.style.transition = ''
    }, 950)
    return () => clearTimeout(id)
  }, [activeStage])

  // ── Mouse (desktop) ─────────────────────────────────────────────────────────

  const onMouseDown = useCallback((e) => {
    panning.current = true
    lastPos.current = { x: e.clientX, y: e.clientY }
    viewportRef.current.style.cursor = 'grabbing'
  }, [])

  const onMouseMove = useCallback((e) => {
    if (!panning.current) return
    t.current.x += e.clientX - lastPos.current.x
    t.current.y += e.clientY - lastPos.current.y
    lastPos.current = { x: e.clientX, y: e.clientY }
    applyTransform()
  }, [])

  const onMouseUp = useCallback(() => {
    panning.current = false
    viewportRef.current.style.cursor = 'grab'
  }, [])

  // ── Wheel + touch (non-passive, registered via useEffect) ───────────────────

  useEffect(() => {
    const el = viewportRef.current
    if (!el) return

    function zoom(factor, pivotX, pivotY) {
      const newScale = Math.max(SCALE_MIN, Math.min(SCALE_MAX, t.current.scale * factor))
      const ratio = newScale / t.current.scale
      t.current = {
        scale: newScale,
        x: pivotX - (pivotX - t.current.x) * ratio,
        y: pivotY - (pivotY - t.current.y) * ratio,
      }
      applyTransform()
    }

    function handleWheel(e) {
      e.preventDefault()
      const delta = e.deltaMode === 1 ? e.deltaY * 20 : e.deltaY
      const factor = Math.pow(0.999, delta)
      const rect = el.getBoundingClientRect()
      zoom(factor, e.clientX - rect.left, e.clientY - rect.top)
    }

    function handleTouchStart(e) {
      if (e.touches.length === 2) {
        panning.current = false
        const dx = e.touches[0].clientX - e.touches[1].clientX
        const dy = e.touches[0].clientY - e.touches[1].clientY
        pinchDist.current = Math.hypot(dx, dy)
      } else {
        panning.current = true
        lastPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
        touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY, time: Date.now() }
      }
    }

    function handleTouchMove(e) {
      e.preventDefault()
      if (e.touches.length === 2 && pinchDist.current !== null) {
        const dx = e.touches[0].clientX - e.touches[1].clientX
        const dy = e.touches[0].clientY - e.touches[1].clientY
        const dist = Math.hypot(dx, dy)
        const midX = (e.touches[0].clientX + e.touches[1].clientX) / 2
        const midY = (e.touches[0].clientY + e.touches[1].clientY) / 2
        const rect = el.getBoundingClientRect()
        zoom(dist / pinchDist.current, midX - rect.left, midY - rect.top)
        pinchDist.current = dist
      } else if (e.touches.length === 1 && panning.current) {
        t.current.x += e.touches[0].clientX - lastPos.current.x
        t.current.y += e.touches[0].clientY - lastPos.current.y
        lastPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
        applyTransform()
      }
    }

    function handleTouchEnd(e) {
      if (e.touches.length < 2) pinchDist.current = null
      if (e.touches.length === 0) {
        panning.current = false

        // Detect left-swipe at right edge → return to cover
        if (onReturnToCoverRef.current && e.changedTouches.length === 1) {
          const dx = e.changedTouches[0].clientX - touchStart.current.x
          const dy = e.changedTouches[0].clientY - touchStart.current.y
          const dt = Date.now() - touchStart.current.time
          const vx = dx / dt // px/ms

          // Require: strongly horizontal, fast, and map's right edge visibly in frame
          const isHardLeftSwipe = dx < -80 && Math.abs(dx) > Math.abs(dy) * 2 && vx < -0.9
          const mapRight        = t.current.x + MAP_WIDTH * t.current.scale
          const atRightEdge     = mapRight <= window.innerWidth

          if (isHardLeftSwipe && atRightEdge) {
            onReturnToCoverRef.current()
          }
        }
      }
    }

    el.addEventListener('wheel',      handleWheel,      { passive: false })
    el.addEventListener('touchstart', handleTouchStart, { passive: false })
    el.addEventListener('touchmove',  handleTouchMove,  { passive: false })
    el.addEventListener('touchend',   handleTouchEnd,   { passive: false })

    return () => {
      el.removeEventListener('wheel',      handleWheel)
      el.removeEventListener('touchstart', handleTouchStart)
      el.removeEventListener('touchmove',  handleTouchMove)
      el.removeEventListener('touchend',   handleTouchEnd)
    }
  }, [])

  return (
    <div
      ref={viewportRef}
      className="map-viewport"
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
    >
      <div ref={canvasRef} className="map-canvas">
        <div className="map-canvas__grain"   aria-hidden="true" />
        <div className="map-canvas__vignette" aria-hidden="true" />
        <div className="map-canvas__fold map-canvas__fold--v1" aria-hidden="true" />
        <div className="map-canvas__fold map-canvas__fold--v2" aria-hidden="true" />
        <MapSVG
          canvasW={3000}
          canvasH={2000}
          onCityClick={onCityClick}
          activeStage={activeStage}
        />
      </div>
    </div>
  )
}
