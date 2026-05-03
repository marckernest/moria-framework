import React, { useState, useRef, useEffect } from 'react'
import { stages } from '../../data/stages'
import './ContentPanel.css'

const MORIA_LETTERS = [
  { letter: 'M', id: 'map' },
  { letter: 'O', id: 'orientate' },
  { letter: 'R', id: 'reason' },
  { letter: 'I', id: 'implement' },
  { letter: 'A', id: 'amplify' },
]

export default function ContentPanel({ stageId, originX, originY, onClose, onNavigate }) {
  const stage      = stages.find(s => s.id === stageId)
  const stageIndex = stages.findIndex(s => s.id === stageId)
  const prevStage  = stageIndex > 0 ? stages[stageIndex - 1] : null
  const nextStage  = stageIndex < stages.length - 1 ? stages[stageIndex + 1] : null

  const pages     = stage ? [null, ...stage.content.steps] : []
  const pagesRef  = useRef(pages)
  pagesRef.current = pages

  const [open, setOpen]             = useState(false)
  const [page, setPage]             = useState(0)
  const [dragOffset, setDragOffset] = useState(0)

  const closing      = useRef(false)
  const trackWrapRef = useRef(null)
  const dragRef      = useRef({ offset: 0 })  // mirrors dragOffset for event handlers

  // Open animation
  useEffect(() => {
    const raf = requestAnimationFrame(() => setOpen(true))
    return () => cancelAnimationFrame(raf)
  }, [])

  // Reset page when stage changes
  useEffect(() => {
    setPage(0)
    setDragOffset(0)
    dragRef.current.offset = 0
  }, [stageId])

  // Escape key
  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') handleClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Touch swipe (non-passive so we can preventDefault on horizontal)
  useEffect(() => {
    const el = trackWrapRef.current
    if (!el) return

    const state = { x0: 0, y0: 0, dir: null }

    function start(e) {
      state.x0  = e.touches[0].clientX
      state.y0  = e.touches[0].clientY
      state.dir = null
    }

    function move(e) {
      const dx = e.touches[0].clientX - state.x0
      const dy = e.touches[0].clientY - state.y0
      if (state.dir === null && (Math.abs(dx) > 6 || Math.abs(dy) > 6)) {
        state.dir = Math.abs(dx) >= Math.abs(dy) ? 'h' : 'v'
      }
      if (state.dir === 'h') {
        e.preventDefault()
        dragRef.current.offset = dx
        setDragOffset(dx)
      }
    }

    function end(e) {
      if (state.dir === 'h') {
        const dx    = e.changedTouches[0].clientX - state.x0
        const limit = pagesRef.current.length - 1
        const threshold = window.innerWidth * 0.2
        setPage(p => dx < -threshold ? Math.min(p + 1, limit) : dx > threshold ? Math.max(p - 1, 0) : p)
        dragRef.current.offset = 0
        setDragOffset(0)
      }
      state.dir = null
    }

    el.addEventListener('touchstart', start, { passive: true })
    el.addEventListener('touchmove',  move,  { passive: false })
    el.addEventListener('touchend',   end,   { passive: true })
    return () => {
      el.removeEventListener('touchstart', start)
      el.removeEventListener('touchmove',  move)
      el.removeEventListener('touchend',   end)
    }
  }, [])

  function handleClose() {
    if (closing.current) return
    closing.current = true
    setOpen(false)
    setTimeout(onClose, 650)
  }

  // Mouse drag
  const mouseDown = useRef(false)
  const mouseX0   = useRef(0)

  function onMouseDown(e) {
    if (e.button !== 0) return
    mouseDown.current = true
    mouseX0.current   = e.clientX
  }

  function onMouseMove(e) {
    if (!mouseDown.current) return
    const dx = e.clientX - mouseX0.current
    dragRef.current.offset = dx
    setDragOffset(dx)
  }

  function onMouseUp() {
    if (!mouseDown.current) return
    mouseDown.current = false
    const dx        = dragRef.current.offset
    const limit     = pagesRef.current.length - 1
    const threshold = window.innerWidth * 0.2
    setPage(p => dx < -threshold ? Math.min(p + 1, limit) : dx > threshold ? Math.max(p - 1, 0) : p)
    dragRef.current.offset = 0
    setDragOffset(0)
  }

  function goToPage(n) {
    setPage(Math.max(0, Math.min(pagesRef.current.length - 1, n)))
  }

  if (!stage) return null

  return (
    <div
      className={`content-panel${open ? ' is-open' : ''}`}
      style={{ '--ox': `${originX}px`, '--oy': `${originY}px` }}
    >
      <div className="content-panel__grain"   aria-hidden="true" />
      <div className="content-panel__vignette" aria-hidden="true" />

      <header className="content-panel__header">
        <button className="content-panel__close" onClick={handleClose} aria-label="Close panel">✕</button>
        <nav className="content-panel__moria" aria-label="MORIA stages">
          {MORIA_LETTERS.map(({ letter, id }, i) => (
            <React.Fragment key={id}>
              {i > 0 && <span className="content-panel__moria-dot" aria-hidden="true">·</span>}
              <button
                className={`content-panel__moria-letter${id === stageId ? ' is-active' : ''}`}
                onClick={() => onNavigate(id)}
                aria-label={stages.find(s => s.id === id)?.moiraStage}
              >
                {letter}
              </button>
            </React.Fragment>
          ))}
        </nav>
      </header>

      <div
        ref={trackWrapRef}
        className="content-panel__track-wrap"
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        <div
          className="content-panel__track"
          style={{
            transform: `translateX(calc(${-page * 100}vw + ${dragOffset}px))`,
            transition: mouseDown.current ? 'none' : 'transform 0.38s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          {/* Intro page */}
          <div className="content-panel__page">
            <div className="content-panel__page-inner">
              <p className="content-panel__stage-label">{stage.moiraStage.toUpperCase()}</p>
              <h2 className="content-panel__stage-name">{stage.name}</h2>
              <p className="content-panel__location">{stage.content.subtitle}</p>
              <div className="content-panel__rule" />
              <p className="content-panel__intro">{stage.content.intro}</p>
            </div>
          </div>

          {/* Step pages */}
          {stage.content.steps.map((step, i) => (
            <div key={i} className="content-panel__page">
              <div className="content-panel__page-inner">
                <p className="content-panel__step-num">{i + 1} / {stage.content.steps.length}</p>
                <h3 className="content-panel__step-heading">{step.heading}</h3>
                <div className="content-panel__rule" />
                <p className="content-panel__step-body">{step.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer className="content-panel__footer">
        <button
          className="content-panel__nav-city content-panel__nav-city--prev"
          onClick={() => prevStage && onNavigate(prevStage.id)}
          disabled={!prevStage}
          aria-label={prevStage ? `Navigate to ${prevStage.name}` : undefined}
        >
          {prevStage ? `← ${prevStage.name}` : ''}
        </button>

        <div className="content-panel__nav-center">
          <button
            className="content-panel__nav-btn"
            onClick={() => goToPage(page - 1)}
            disabled={page === 0}
            aria-label="Previous page"
          >‹</button>
          <span className="content-panel__nav-count">{page + 1} / {pages.length}</span>
          <button
            className="content-panel__nav-btn"
            onClick={() => goToPage(page + 1)}
            disabled={page === pages.length - 1}
            aria-label="Next page"
          >›</button>
        </div>

        <button
          className="content-panel__nav-city content-panel__nav-city--next"
          onClick={() => nextStage && onNavigate(nextStage.id)}
          disabled={!nextStage}
          aria-label={nextStage ? `Navigate to ${nextStage.name}` : undefined}
        >
          {nextStage ? `${nextStage.name} →` : ''}
        </button>
      </footer>
    </div>
  )
}
