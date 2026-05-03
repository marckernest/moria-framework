import React, { useCallback, useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import CompassRose from './CompassRose'
import './Cover.css'

export default function Cover({ onOpen, coverOpen, isMobile }) {
  const x = useMotionValue(0)
  const bioX = useTransform(x, (val) => val + window.innerWidth)
  const currentPage = useRef(0) // 0 = cover, -1 = bio
  const bioTouch = useRef({ startX: 0, startTime: 0 })

  const [constraints, setConstraints] = useState({
    left: isMobile ? -window.innerWidth : 0,
    right: window.innerWidth,
  })

  // Sync constraints when isMobile changes (e.g. orientation)
  useEffect(() => {
    setConstraints({
      left: isMobile ? -window.innerWidth : 0,
      right: window.innerWidth,
    })
  }, [isMobile])

  // Flip back when cover is closed externally (← cover button or map back-swipe)
  useEffect(() => {
    if (!coverOpen) {
      currentPage.current = 0
      animate(x, 0, { type: 'spring', damping: 35, stiffness: 400 })
    }
  }, [coverOpen])

  // Keep constraints current through resize
  useEffect(() => {
    function handleResize() {
      setConstraints({
        left: isMobile ? -window.innerWidth : 0,
        right: window.innerWidth,
      })
      if (coverOpen) x.set(window.innerWidth * 1.1)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [coverOpen, isMobile, x])

  const handleDragEnd = useCallback((_, info) => {
    const threshold = window.innerWidth * 0.25
    const isRightSwipe = info.offset.x > threshold || info.velocity.x > 600
    const isLeftSwipe  = info.offset.x < -threshold || info.velocity.x < -600

    if (isRightSwipe) {
      if (currentPage.current === -1) {
        // Bio → Cover
        currentPage.current = 0
        animate(x, 0, { type: 'spring', damping: 35, stiffness: 400 })
      } else {
        // Cover → Map
        animate(x, window.innerWidth * 1.1, {
          type: 'spring',
          damping: 28,
          stiffness: 160,
          restSpeed: 0.5,
          onComplete: onOpen,
        })
      }
    } else if (isLeftSwipe && isMobile && currentPage.current === 0) {
      // Cover → Bio (mobile only)
      currentPage.current = -1
      animate(x, -window.innerWidth, { type: 'spring', damping: 28, stiffness: 200 })
    } else {
      // Snap back to current page
      const snapX = currentPage.current === -1 ? -window.innerWidth : 0
      animate(x, snapX, { type: 'spring', damping: 35, stiffness: 400 })
    }
  }, [x, onOpen, isMobile])

  // Bio panel touch handlers — the cover's motion.div is off-screen when bio is visible,
  // so we wire touch events directly on the bio panel to animate the shared x value.
  const handleBioTouchStart = useCallback((e) => {
    bioTouch.current = { startX: e.touches[0].clientX, startTime: Date.now() }
  }, [])

  const handleBioTouchMove = useCallback((e) => {
    const dx = e.touches[0].clientX - bioTouch.current.startX
    if (dx > 0) x.set(-window.innerWidth + dx) // follow finger rightward only
  }, [x])

  const handleBioTouchEnd = useCallback((e) => {
    const dx = e.changedTouches[0].clientX - bioTouch.current.startX
    const dt = Date.now() - bioTouch.current.startTime
    const vx = dx / dt // px/ms, positive = moved right

    if (dx > window.innerWidth * 0.25 || vx > 0.5) {
      currentPage.current = 0
      animate(x, 0, { type: 'spring', damping: 35, stiffness: 400 })
    } else {
      animate(x, -window.innerWidth, { type: 'spring', damping: 35, stiffness: 400 })
    }
  }, [x])

  return (
    <>
      {/* Bio panel — mobile only, always one viewport-width to the right of cover */}
      {isMobile && (
        <motion.div
          className="bio-panel"
          style={{ x: bioX }}
          onTouchStart={handleBioTouchStart}
          onTouchMove={handleBioTouchMove}
          onTouchEnd={handleBioTouchEnd}
        >
          <div className="cover__grain" aria-hidden="true" />
          <div className="cover__vignette" aria-hidden="true" />
          <div className="cover__border" aria-hidden="true" />
          <div className="bio-panel__content">
            <p className="cover__bio-name">Marck Ernest</p>
            <p className="cover__bio-role">Cartographer of Complex Systems</p>
            <div className="cover__bio-rule" />
            <p className="cover__bio-para">
              I have always been drawn to how things work — the sheer mechanics of a system, the physics
              beneath the surface. My father was a carpenter. I learned young that machines operated on
              principles, not magic. Understanding that process has been the constant thread.
            </p>
            <p className="cover__bio-para">
              I believe with enough time and sincere effort, anyone can understand these solutions and
              repeat the process.
            </p>
            <p className="cover__bio-para">
              My partner once joked that I am Gandalf, and that deliverables arrive precisely when they
              mean to.
            </p>
            <p className="cover__bio-closing">
              The MORIA framework is how I navigate complexity. If you are running on empty and looking
              for a path through, this map was made for you.
            </p>
            <div className="cover__bio-rule" />
            <a className="cover__bio-cta" href="mailto:marck.ernestthornton@gmail.com">
              marck.ernestthornton@gmail.com
            </a>
            <p className="cover__hint bio-panel__hint">
              <span aria-hidden="true">←</span>&nbsp;&nbsp;swipe right to return
            </p>
          </div>
        </motion.div>
      )}

      {/* Cover face */}
      <motion.div
        className="cover"
        style={{ x }}
        drag="x"
        dragConstraints={constraints}
        dragElastic={0}
        dragMomentum={false}
        onDragEnd={handleDragEnd}
      >
        <div className="cover__grain" aria-hidden="true" />
        <div className="cover__vignette" aria-hidden="true" />
        <div className="cover__border" aria-hidden="true" />

        {isMobile ? (

          /* ── Mobile layout — single centred column ── */
          <div className="cover__mobile-content">
            <div className="cover__compass" aria-hidden="true">
              <CompassRose size={80} />
            </div>
            <h1 className="cover__title">The MORIA Framework</h1>
            <div className="cover__rule" />
            <p className="cover__tagline">
              A real case study with Joe M.,<br /> 
              guided by the MORIA framework.<br />
              Follow the journey from<br /> 
              broken system to working solution.
            </p>
            <p className="cover__lead">
              Lost in the problem? The map is here.
            </p>
            <p className="cover__hint">
              map&nbsp;&nbsp;<span aria-hidden="true">←</span>&nbsp;&nbsp;·&nbsp;&nbsp;swipe&nbsp;&nbsp;·&nbsp;&nbsp;<span aria-hidden="true">→</span>&nbsp;&nbsp;bio
            </p>
          </div>

        ) : (

          /* ── Desktop layout — tri-fold panels ── */
          <>
            <div className="cover__fold cover__fold--left" aria-hidden="true" />
            <div className="cover__fold cover__fold--right" aria-hidden="true" />

            <div className="cover__left-panel">
              <div className="cover__compass" aria-hidden="true">
                <CompassRose size={110} />
              </div>
              <p className="cover__hint">
                <span aria-hidden="true">→</span>&nbsp;&nbsp;drag to open
              </p>
            </div>

            <div className="cover__content">
              <h1 className="cover__title">The MORIA Framework</h1>
              <div className="cover__rule" />
              <p className="cover__tagline">
                A real case study with Joe M.,<br /> 
                guided by the MORIA framework.<br />
                Follow the journey from<br /> 
                broken system to working solution.
              </p>
              <p className="cover__lead">
                Lost in the problem? The map is here.
              </p>
            </div>

            <div className="cover__right-panel">
              <div className="cover__cartouche">
                <p className="cover__bio-name">Marck Ernest</p>
                <p className="cover__bio-role">Cartographer of Complex Systems</p>
                <div className="cover__bio-rule" />
                <p className="cover__bio-para">
                  I have always been drawn to how things work — the sheer mechanics of a system, the
                  physics beneath the surface. My father was a carpenter. I learned young that machines
                  operated on principles, not magic. Understanding that process has been the constant thread.
                </p>
                <p className="cover__bio-para">
                  I believe with enough time and sincere effort, anyone can understand these solutions and
                  repeat the process.
                </p>
                <p className="cover__bio-para">
                  My partner once joked that I am Gandalf, and that deliverables arrive precisely when
                  they mean to.
                </p>
                <p className="cover__bio-closing">
                  The MORIA framework is how I navigate complexity. If you are running on empty and
                  looking for a path through, this map was made for you.
                </p>
                <div className="cover__bio-rule" />
                <a className="cover__bio-cta" href="mailto:marck.ernestthornton@gmail.com">
                  marck.ernestthornton@gmail.com
                </a>
              </div>
            </div>
          </>

        )}
      </motion.div>
    </>
  )
}
