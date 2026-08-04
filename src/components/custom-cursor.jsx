'use client'

import { useEffect, useRef, useState } from 'react'
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from 'motion/react'

/*
 * Custom Motion cursor.
 *
 * Three GPU-composited layers, each on its own spring so the pointer reads as
 * a single moving object with real inertia rather than a stack of parallel
 * dots:
 *
 *   1. Glow  — soft red radial bloom, slowest spring. Ambient depth.
 *   2. Trail — angular red blade, medium spring. Directional: rotates with
 *              the smoothed velocity vector, stretches along its axis on
 *              fast motion, and picks up a real `filter: blur()` motion-blur
 *              proportional to speed.
 *   3. Core  — sharp foreground-fill diamond, fastest spring. Always
 *              on-target so clicking feels precise.
 *
 * Hover intelligence:
 *   - button  — anchors, buttons, [role="button"], data-cursor="link"/"button".
 *               Every layer scales up, the trail glow intensifies, the
 *               velocity-driven stretch continues to give a "magnetic drag"
 *               feel that composes with useMagnetic on the CTA buttons.
 *   - view    — data-cursor="view"/"media". Trail expands into a soft red
 *               halo behind a VIEW pill; core shrinks to a small tick so it
 *               reads as a badge, not a cursor.
 *   - text    — <p> and data-cursor="text". Core shrinks and glow dims so
 *               the cursor stays out of the way while reading. Text
 *               selection is unaffected (browser handles that with
 *               mousedown+drag regardless of the visible cursor style).
 *   - image   — <img> and data-cursor="image". Everything scales up and the
 *               glow brightens for a "preview" feel.
 *
 * Fine-pointer only. On coarse-pointer devices the component returns null
 * and nothing mounts, so touch behaviour is unchanged. While the pointer is
 * over a form-input (input, textarea, select, contenteditable), every layer
 * fades out so the browser's native I-beam owns the surface.
 */

// Springs — the entire feel of the cursor lives in these constants.
const CORE_SPRING = { damping: 30, stiffness: 500, mass: 0.5 }
const TRAIL_SPRING = { damping: 25, stiffness: 260, mass: 0.85 }
const GLOW_SPRING = { damping: 22, stiffness: 170, mass: 1.1 }
const ROTATE_SPRING = { damping: 24, stiffness: 260, mass: 0.4 }
const SCALE_SPRING = { damping: 22, stiffness: 320, mass: 0.5 }
const STRETCH_SPRING = { damping: 25, stiffness: 400, mass: 0.4 }
const BLUR_SPRING = { damping: 22, stiffness: 400, mass: 0.4 }

const MODES = {
  default: { coreScale: 1, trailScale: 1, glowOpacity: 0.32, showPill: false },
  button: {
    coreScale: 1.4,
    trailScale: 1.9,
    glowOpacity: 0.85,
    showPill: false,
  },
  view: {
    coreScale: 0.45,
    trailScale: 4.2,
    glowOpacity: 0.65,
    showPill: true,
    label: 'VIEW',
  },
  text: {
    coreScale: 0.35,
    trailScale: 0.65,
    glowOpacity: 0.12,
    showPill: false,
  },
  image: {
    coreScale: 1.9,
    trailScale: 2.8,
    glowOpacity: 0.75,
    showPill: false,
  },
}

const EDITABLE = 'input, textarea, select, [contenteditable="true"]'

const CustomCursor = () => {
  const [fine, setFine] = useState(false)
  const [mode, setMode] = useState('default')
  const [suppressed, setSuppressed] = useState(false)

  const rawX = useMotionValue(-200)
  const rawY = useMotionValue(-200)

  // Three follow springs — deliberately different characters so the layers
  // don't move as one glob.
  const coreX = useSpring(rawX, CORE_SPRING)
  const coreY = useSpring(rawY, CORE_SPRING)
  const trailX = useSpring(rawX, TRAIL_SPRING)
  const trailY = useSpring(rawY, TRAIL_SPRING)
  const glowX = useSpring(rawX, GLOW_SPRING)
  const glowY = useSpring(rawY, GLOW_SPRING)

  // Rotation & scale springs.
  const rotate = useSpring(0, ROTATE_SPRING)
  const coreScale = useSpring(1, SCALE_SPRING)
  const trailScale = useSpring(1, SCALE_SPRING)
  const glowOpacity = useSpring(0, SCALE_SPRING)

  // Velocity-driven directional stretch + motion blur.
  const stretch = useSpring(1, STRETCH_SPRING)
  const blur = useSpring(0, BLUR_SPRING)

  // Composed motion values.
  const blurFilter = useMotionTemplate`blur(${blur}px)`
  const trailScaleX = useTransform(
    [trailScale, stretch],
    ([s, x]) => s * x,
  )
  const trailScaleY = useTransform(
    [trailScale, stretch],
    ([s, x]) => s * (2 - x),
  )

  const modeRef = useRef(mode)
  const suppressedRef = useRef(suppressed)
  const lastSample = useRef({ x: -200, y: -200, t: 0 })

  useEffect(() => {
    modeRef.current = mode
  }, [mode])
  useEffect(() => {
    suppressedRef.current = suppressed
  }, [suppressed])

  // Fine-pointer gate.
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined
    const mq = window.matchMedia('(pointer: fine)')
    const check = () => setFine(mq.matches)
    check()
    mq.addEventListener('change', check)
    return () => mq.removeEventListener('change', check)
  }, [])

  // While the custom cursor is active, mark <html> so globals.css can hide
  // the native cursor. Doing it from JS (rather than relying on
  // `@media (pointer: fine)` at the CSS layer) means the rule applies
  // exactly when the component is actually drawing a pointer, and reverts
  // cleanly on unmount / coarse-pointer switch.
  useEffect(() => {
    if (typeof document === 'undefined') return undefined
    if (!fine) return undefined
    const root = document.documentElement
    root.dataset.customCursor = 'true'
    return () => {
      delete root.dataset.customCursor
    }
  }, [fine])

  useEffect(() => {
    if (!fine) return undefined

    const resolveMode = (t) => {
      if (!(t instanceof Element)) return 'default'
      if (t.closest('[data-cursor="view"], [data-cursor="media"]')) return 'view'
      if (t.closest('[data-cursor="image"], img')) return 'image'
      if (
        t.closest(
          'button, [role="button"], a, [data-cursor="link"], [data-cursor="button"]',
        )
      )
        return 'button'
      if (t.closest('p, [data-cursor="text"]')) return 'text'
      return 'default'
    }

    const isEditable = (t) =>
      t instanceof Element && !!t.closest(EDITABLE)

    const handleMove = (event) => {
      rawX.set(event.clientX)
      rawY.set(event.clientY)
      const target = event.target
      if (isEditable(target)) {
        if (!suppressedRef.current) setSuppressed(true)
        return
      }
      if (suppressedRef.current) setSuppressed(false)
      const next = resolveMode(target)
      if (next !== modeRef.current) setMode(next)
    }

    window.addEventListener('mousemove', handleMove, { passive: true })

    // rAF loop sampling the smoothed core spring — feeds rotation, stretch,
    // and motion-blur values from the *visible* motion, not the raw pointer.
    // That way tiny mouse jitter doesn't rotate/stretch the cursor; only
    // real, sustained motion does.
    let rafId = 0
    const step = () => {
      const now = performance.now()
      const cx = coreX.get()
      const cy = coreY.get()
      const last = lastSample.current
      const dt = Math.max(1, now - last.t)
      const dx = cx - last.x
      const dy = cy - last.y
      const speed = Math.hypot(dx, dy) / dt

      if (speed > 0.05) {
        const angleDeg = (Math.atan2(dy, dx) * 180) / Math.PI
        // Shortest-path unwrap so the spring never spins the long way around.
        const cur = rotate.get()
        const wrap = angleDeg + Math.round((cur - angleDeg) / 360) * 360
        rotate.set(wrap)
      }

      // Stretch peaks at 1.35 on fast moves — trail elongates along motion.
      stretch.set(1 + Math.min(0.35, speed * 0.15))
      // Motion blur peaks at ~6px on fast moves.
      blur.set(Math.min(6, speed * 3))

      lastSample.current = { x: cx, y: cy, t: now }
      rafId = requestAnimationFrame(step)
    }
    rafId = requestAnimationFrame(step)

    return () => {
      window.removeEventListener('mousemove', handleMove)
      cancelAnimationFrame(rafId)
    }
  }, [fine, rawX, rawY, coreX, coreY, rotate, stretch, blur])

  // Push mode-dependent scale/opacity into their springs.
  useEffect(() => {
    const m = MODES[mode] ?? MODES.default
    coreScale.set(m.coreScale)
    trailScale.set(m.trailScale)
    glowOpacity.set(suppressed ? 0 : m.glowOpacity)
  }, [mode, suppressed, coreScale, trailScale, glowOpacity])

  if (!fine) return null

  const state = MODES[mode] ?? MODES.default
  const showPill = !suppressed && state.showPill

  return (
    <>
      {/* Layer 1 — soft red glow, slowest spring */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9998] h-0 w-0"
        style={{ x: glowX, y: glowY }}
      >
        <motion.span
          className="absolute h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              'radial-gradient(closest-side, var(--color-accent) 0%, transparent 72%)',
            opacity: glowOpacity,
            scale: trailScale,
            willChange: 'transform, opacity',
          }}
        />
      </motion.div>

      {/* Layer 2 — angular red blade with motion blur + directional stretch */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-0 w-0"
        style={{ x: trailX, y: trailY }}
      >
        <motion.svg
          viewBox="-10 -6 20 12"
          className="absolute h-4 w-6 -translate-x-1/2 -translate-y-1/2"
          style={{
            rotate,
            scaleX: trailScaleX,
            scaleY: trailScaleY,
            filter: blurFilter,
            willChange: 'transform, filter, opacity',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: suppressed ? 0 : 0.55 }}
          transition={{ opacity: { duration: 0.2, ease: 'easeOut' } }}
        >
          <path d="M -9 0 L 0 -4 L 9 0 L 0 4 Z" fill="var(--color-accent)" />
        </motion.svg>
      </motion.div>

      {/* Layer 3 — sharp core diamond, fastest spring, always precise */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[10000] h-0 w-0"
        style={{ x: coreX, y: coreY }}
      >
        <motion.svg
          viewBox="-8 -6 16 12"
          className="absolute h-3 w-4 -translate-x-1/2 -translate-y-1/2"
          style={{
            rotate,
            scale: coreScale,
            willChange: 'transform, opacity',
            filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.35))',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: suppressed ? 0 : 1 }}
          transition={{ opacity: { duration: 0.22, ease: 'easeOut' } }}
        >
          <path
            d="M -7 0 L 0 -3.5 L 7 0 L 0 3.5 Z"
            fill="var(--color-foreground)"
            stroke="var(--color-accent)"
            strokeWidth="1"
            strokeLinejoin="miter"
          />
        </motion.svg>

        {/* View pill — morphs in on portfolio / preview surfaces */}
        <motion.span
          className="absolute flex items-center gap-2 whitespace-nowrap rounded-full bg-foreground px-4 py-2 text-[0.7rem] font-black uppercase tracking-[0.28em] text-background shadow-[0_10px_30px_rgba(191,10,48,0.35)]"
          style={{
            left: 22,
            top: -18,
            willChange: 'transform, opacity',
            transformOrigin: '0 50%',
          }}
          initial={false}
          animate={{
            opacity: showPill ? 1 : 0,
            scale: showPill ? 1 : 0.55,
            x: showPill ? 0 : -12,
          }}
          transition={{ type: 'spring', damping: 22, stiffness: 320 }}
        >
          <motion.span
            className="block h-1.5 w-1.5 rounded-full bg-accent"
            animate={showPill ? { scale: [1, 1.4, 1] } : { scale: 1 }}
            transition={
              showPill
                ? { duration: 1.6, repeat: Infinity, ease: 'easeInOut' }
                : { duration: 0.2 }
            }
          />
          {state.label || 'VIEW'}
        </motion.span>
      </motion.div>
    </>
  )
}

export default CustomCursor
