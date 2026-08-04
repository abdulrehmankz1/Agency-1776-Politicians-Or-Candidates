'use client'

import { useEffect } from 'react'

import { scrollToId } from '@/utils/scroll-to'

/*
 * Cross-page deep-link into the contact form. Other pages send the reader here
 * with `/contact?to=form` (e.g. the Solutions closer CTA). A plain `#hash`
 * can't be used: ScrollSmoother drives scrolling with a transform on
 * `#smooth-content`, so the browser's native anchor jump lands at the wrong
 * place (it was dropping people at the page footer). Instead we read the query
 * param on mount and scroll with the smoother-aware `scrollToId`, which already
 * offsets for the fixed navbar so the form's top isn't hidden behind it.
 *
 * Renders nothing. Lives on the contact page only.
 */
const ScrollToForm = () => {
  useEffect(() => {
    if (typeof window === 'undefined') return undefined

    const params = new URLSearchParams(window.location.search)
    if (params.get('to') !== 'form') return undefined

    // The smoother is created in a parent layout effect and needs a beat to
    // settle its size for the freshly-navigated page. Retry across a few
    // frames until both the form and the smoother are ready, then scroll.
    let frame = 0
    let raf
    let timer

    const attempt = () => {
      const el = document.getElementById('contact-form')
      const smoother = window.ScrollSmoother?.get?.()
      // Scroll once the form exists and either the smoother is up or we've
      // waited long enough that it clearly isn't in play (reduced-motion /
      // touch builds fall back to native scroll inside scrollToId).
      if (el && (smoother || frame > 12)) {
        scrollToId('contact-form')
        return
      }
      if (frame < 40) {
        frame += 1
        raf = requestAnimationFrame(attempt)
      }
    }

    // Small delay first so ScrollSmoother finishes its own initial refresh
    // before we measure the form's position.
    timer = setTimeout(() => {
      raf = requestAnimationFrame(attempt)
    }, 120)

    return () => {
      clearTimeout(timer)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return null
}

export default ScrollToForm
