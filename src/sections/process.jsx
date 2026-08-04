'use client'

import { useLayoutEffect, useRef } from 'react'

import CtaButton from '@/components/cta-button'
import LineBackdrop from '@/components/line-backdrop'
import SplitText from '@/components/split-text'
import { PROCESS } from '@/constants/campaign'
import { gsap } from '@/utils/register-gsap'
import { useScrubHeading } from '@/hooks/use-scrub-heading'
import { useSectionReveal } from '@/hooks/use-section-reveal'

/*
 * Cinematic scroll-driven timeline for the Launch Fast section.
 *
 * Choreography per step (fires on ScrollTrigger enter):
 *   1. The node marker pops in (scale + opacity, backOut)
 *   2. The SVG icon "draws" via stroke-dashoffset — every path individually
 *   3. The card fades / slides in from the right, once the icon is drawn
 *
 * A single accent rail scrubs from top to bottom of the whole timeline as
 * the reader progresses through the section, so the vertical spine feels
 * continuous rather than staccato.
 */

// Each step gets its own inline SVG so we can draw the paths with GSAP.
// Kept deliberately simple so `path.getTotalLength()` is stable across
// browsers.
const STEP_ICONS = [
  // 01 — Share the Campaign (paper + arrow up)
  (
    <>
      <path d="M6 4h8l4 4v12H6z" />
      <path d="M14 4v4h4" />
      <path d="M9 14h6" />
      <path d="M12 11v6" />
    </>
  ),
  // 02 — Build the Message (speech + spark)
  (
    <>
      <path d="M4 5h13a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-7l-4 3v-3H4Z" />
      <path d="M9 10h5" />
      <path d="M9 13h3" />
    </>
  ),
  // 03 — Create the Website (window + grid)
  (
    <>
      <path d="M3 5h18v14H3z" />
      <path d="M3 9h18" />
      <path d="M7 5v4" />
      <path d="M11 5v4" />
    </>
  ),
  // 04 — Prepare Campaign Assets (layers)
  (
    <>
      <path d="M12 3 3 8l9 5 9-5Z" />
      <path d="M3 12l9 5 9-5" />
      <path d="M3 16l9 5 9-5" />
    </>
  ),
  // 05 — Launch and Move (rocket)
  (
    <>
      <path d="M12 3c3 2 5 5 5 9v4l-5 3-5-3v-4c0-4 2-7 5-9Z" />
      <path d="M9 14h6" />
      <path d="M12 8v3" />
    </>
  ),
]

const Process = () => {
  const scopeRef = useSectionReveal()
  const headingRef = useScrubHeading()
  const timelineRef = useRef(null)

  useLayoutEffect(() => {
    if (!timelineRef.current) return undefined
    const root = timelineRef.current

    /*
     * The timeline hides each step's card + icon and reveals them on scroll.
     * That scroll dependency is unreliable on touch devices and could leave
     * the steps blank, so the whole choreography is gated to desktop (wide
     * viewport + fine pointer). On mobile nothing is hidden and every step
     * renders immediately; matchMedia reverts on a breakpoint change too.
     */
    const mm = gsap.matchMedia()
    mm.add('(min-width: 1024px) and (pointer: fine)', () => {
      const ctx = gsap.context(() => {
      // Overall accent rail — scrubs with scroll through the whole timeline.
      const rail = root.querySelector('[data-timeline="rail"]')
      if (rail) {
        gsap.set(rail, { scaleY: 0, transformOrigin: 'top center' })
        gsap.to(rail, {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: root,
            start: 'top 70%',
            end: 'bottom 55%',
            scrub: 0.8,
          },
        })
      }

      // Per-step choreography — marker → icon-draw → card slide.
      const steps = root.querySelectorAll('[data-timeline="step"]')
      steps.forEach((step) => {
        const marker = step.querySelector('[data-timeline="marker"]')
        const svg = step.querySelector('[data-timeline="icon"]')
        const paths = svg ? svg.querySelectorAll('path') : []
        const card = step.querySelector('[data-timeline="card"]')

        if (marker) gsap.set(marker, { scale: 0.35, opacity: 0 })

        paths.forEach((p) => {
          const len = typeof p.getTotalLength === 'function'
            ? p.getTotalLength()
            : 24
          gsap.set(p, {
            strokeDasharray: len,
            strokeDashoffset: len,
            opacity: 1,
          })
        })

        if (card) gsap.set(card, { opacity: 0, x: 40 })

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: step,
            start: 'top 82%',
            // Fire once and stay revealed — the timeline is a linear
            // narrative, so reversing when the reader scrolls back up
            // just interrupts the reading flow.
            once: true,
          },
        })

        if (marker) {
          tl.to(marker, {
            scale: 1,
            opacity: 1,
            duration: 0.55,
            ease: 'back.out(1.6)',
          })
        }

        if (paths.length) {
          tl.to(
            paths,
            {
              strokeDashoffset: 0,
              duration: 0.85,
              ease: 'power2.out',
              stagger: 0.05,
            },
            '-=0.2',
          )
        }

        if (card) {
          tl.to(
            card,
            {
              opacity: 1,
              x: 0,
              duration: 0.7,
              ease: 'expo.out',
            },
            '-=0.55',
          )
        }
      })
      }, root)

      return () => ctx.revert()
    })

    return () => mm.revert()
  }, [])

  return (
    <section
      ref={scopeRef}
      id="process"
      className="relative isolate overflow-hidden bg-surface py-32"
    >
      <LineBackdrop tone="muted" columns={14} pulses={4} />

      <div className="relative mx-auto max-w-[1600px] px-6 lg:px-10">
        {/* Header — eyebrow → heading, top-down. No invented supporting copy. */}
        <header className="max-w-[1180px] pb-20">
          <div className="flex items-center gap-3 text-[0.82rem] uppercase tracking-[0.28em] text-foreground/60">
            <span className="border border-muted px-2 py-0.5 font-mono text-[0.8rem] text-foreground/80">
              05
            </span>
            <span
              className="h-px w-8 bg-muted"
              data-reveal="icon"
              aria-hidden="true"
            />
          </div>

          <h2
            ref={headingRef}
            className="mt-8 text-balance text-[clamp(3.75rem,10vw,8.5rem)] leading-[0.88] tracking-[0.005em]"
          >
            <SplitText mode="words">{PROCESS.heading}</SplitText>
          </h2>
        </header>

        {/* Timeline */}
        <div ref={timelineRef} className="relative pl-14 sm:pl-20 lg:pl-24">
          {/* Base rail — dim hairline that runs the full stack */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-6 top-3 h-[calc(100%-1.5rem)] w-px bg-muted/70 sm:left-9 lg:left-11"
          />
          {/* Accent rail — scrubs on scroll */}
          <span
            data-timeline="rail"
            aria-hidden="true"
            className="pointer-events-none absolute left-6 top-3 h-[calc(100%-1.5rem)] w-px bg-accent sm:left-9 lg:left-11"
          />

          <ol className="flex flex-col">
            {PROCESS.steps.map((step, i) => {
              const iconIndex = i % STEP_ICONS.length
              const isLast = i === PROCESS.steps.length - 1
              return (
                <li
                  key={step.num}
                  data-timeline="step"
                  className={`relative grid grid-cols-12 gap-6 ${isLast ? 'pb-2' : 'pb-16 lg:pb-24'}`}
                >
                  {/* Marker node — sits ON the rail (nudged into position by
                      the negative-left inset). Contains the drawable icon. */}
                  <div
                    data-timeline="marker"
                    aria-hidden="true"
                    className="absolute -left-14 top-0 flex h-12 w-12 items-center justify-center bg-surface sm:-left-20 lg:-left-24"
                  >
                    <span className="absolute inset-0 border border-accent" />
                    <svg
                      data-timeline="icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="relative h-5 w-5 text-accent"
                    >
                      {STEP_ICONS[iconIndex]}
                    </svg>
                  </div>

                  {/* Card content — heading before body */}
                  <div
                    data-timeline="card"
                    className="col-span-12 lg:col-span-9 xl:col-span-8"
                  >
                    <div className="flex items-center gap-4 font-mono text-[0.78rem] uppercase tracking-[0.28em] text-accent">
                      <span>STAGE 0{step.num}</span>
                      <span
                        aria-hidden="true"
                        className="h-px w-10 bg-accent/50"
                      />
                    </div>

                    <h3 className="mt-4 text-3xl leading-[0.95] tracking-[0.01em] lg:text-5xl">
                      <SplitText mode="words">{step.title}</SplitText>
                    </h3>

                    <p className="mt-5 max-w-2xl text-base leading-relaxed text-foreground/70 lg:text-lg">
                      <SplitText mode="block">{step.body}</SplitText>
                    </p>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>

        <div className="mt-16 flex justify-center lg:justify-start lg:pl-24">
          <CtaButton href={PROCESS.cta.href} variant="primary">
            {PROCESS.cta.label}
          </CtaButton>
        </div>
      </div>
    </section>
  )
}

export default Process
