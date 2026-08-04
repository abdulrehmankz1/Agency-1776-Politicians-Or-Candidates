'use client'

import { useLayoutEffect, useRef } from 'react'
import { ScrollSmoother } from 'gsap/ScrollSmoother'

import { gsap, ScrollTrigger } from '@/utils/register-gsap'

if (typeof window !== 'undefined' && !gsap.core.globals().ScrollSmoother) {
  gsap.registerPlugin(ScrollSmoother)
}

/*
 * GSAP ScrollSmoother wrapper. Requires the child DOM to sit inside a
 * two-tier wrapper/content pair. Fixed-position elements (top bar, navbar,
 * custom cursor) MUST live OUTSIDE this provider — ScrollSmoother uses a
 * translate on `#smooth-content`, and any `position: fixed` inside would
 * silently become `position: absolute` relative to the transformed parent.
 *
 * After creation we `ScrollTrigger.refresh()` so all pre-existing triggers
 * from sections (mounted before this parent effect ran) re-associate with the
 * smoothed scroller.
 */

const SmoothScrollProvider = ({ children }) => {
  const wrapperRef = useRef(null)
  const contentRef = useRef(null)

  useLayoutEffect(() => {
    if (!wrapperRef.current || !contentRef.current) return undefined
    if (typeof window === 'undefined' || !window.matchMedia) return undefined

    /*
     * ScrollSmoother is desktop-only. On touch/mobile it did continuous
     * main-thread work (normalizeScroll intercepts every touch move) for no
     * real payoff — `smoothTouch` is 0, and the scroll-reveal animations it
     * coordinates are themselves gated off on mobile (see use-section-reveal).
     * Skipping it lets phones use lightweight native scrolling, a clear
     * performance win, and keeps this in sync with the CSS that only makes
     * `#smooth-wrapper` a fixed scroller at the same breakpoint.
     */
    const mq = window.matchMedia('(min-width: 1024px) and (pointer: fine)')
    let smoother = null

    const enable = () => {
      if (smoother) return
      smoother = ScrollSmoother.create({
        wrapper: wrapperRef.current,
        content: contentRef.current,
        smooth: 1.2,
        effects: true,
        normalizeScroll: true,
        ignoreMobileResize: true,
        smoothTouch: 0,
      })
      ScrollTrigger.refresh()
    }

    const disable = () => {
      if (!smoother) return
      smoother.kill()
      smoother = null
      ScrollTrigger.refresh()
    }

    const sync = () => (mq.matches ? enable() : disable())
    sync()
    mq.addEventListener('change', sync)

    return () => {
      mq.removeEventListener('change', sync)
      disable()
    }
  }, [])

  return (
    <div id="smooth-wrapper" ref={wrapperRef}>
      <div id="smooth-content" ref={contentRef}>
        {children}
      </div>
    </div>
  )
}

export default SmoothScrollProvider
