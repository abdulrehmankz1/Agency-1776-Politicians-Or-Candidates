'use client'

import { useEffect, useState } from 'react'

/*
 * True only on desktop-class devices: a wide viewport AND a fine (mouse)
 * pointer. Used to gate expensive, purely-decorative work — WebGL/canvas hero
 * animations, ScrollSmoother — so phones and tablets never pay for it.
 *
 * Starts `false` so the server render and the first client render agree (no
 * hydration mismatch) and mobile never mounts the heavy path at all; desktop
 * flips it to `true` right after mount. The same media query is used by the
 * scroll-reveal gate (see use-section-reveal), so behaviour stays consistent.
 */
export const useIsDesktop = () => {
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined
    const mq = window.matchMedia('(min-width: 1024px) and (pointer: fine)')
    const update = () => setIsDesktop(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  return isDesktop
}
