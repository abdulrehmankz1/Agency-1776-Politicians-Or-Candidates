'use client'

import CtaButton from '@/components/cta-button'
import LineBackdrop from '@/components/line-backdrop'
import SplitText from '@/components/split-text'
import { ABOUT } from '@/constants/campaign'
import { useScrubHeading } from '@/hooks/use-scrub-heading'
import { useSectionReveal } from '@/hooks/use-section-reveal'

const Parent = () => {
  const scopeRef = useSectionReveal()
  const headingRef = useScrubHeading()

  return (
    <section
      ref={scopeRef}
      id="about-parent"
      className="relative isolate overflow-hidden bg-surface py-32"
    >
      <LineBackdrop tone="muted" columns={12} pulses={3} />

      <div className="relative mx-auto max-w-[1600px] px-6 lg:px-10">
        {/* Eyebrow + heading, left-aligned top-down (no empty left rail). */}
        <header className="max-w-[1180px]">
          <div className="flex items-center gap-3 text-[0.82rem] uppercase tracking-[0.28em] text-accent">
            <span className="border border-accent px-2 py-0.5 font-mono text-[0.8rem] text-accent">
              02
            </span>
            <span
              className="h-px w-8 bg-accent"
              data-reveal="icon"
              aria-hidden="true"
            />
            <span>{ABOUT.parent.eyebrow}</span>
          </div>

          <h2
            ref={headingRef}
            className="mt-8 text-balance text-[clamp(2.5rem,5.5vw,5rem)] leading-[0.95] tracking-[0.005em]"
          >
            <SplitText mode="words">{ABOUT.parent.heading}</SplitText>
          </h2>
        </header>

        <div className="mt-12 max-w-4xl space-y-6 text-lg leading-relaxed text-foreground/80 lg:text-xl">
          {ABOUT.parent.body.map((paragraph, i) => (
            <p key={i}>
              <SplitText mode="block">{paragraph}</SplitText>
            </p>
          ))}
        </div>

        {/* Framed role statement — quoted verbatim, no additional copy. */}
        <div className="relative mt-10 border-l-2 border-accent pl-8">
          <p className="font-display text-[clamp(1.75rem,3.2vw,2.75rem)] leading-[1.05] tracking-[0.005em] text-foreground">
            <SplitText mode="block">{ABOUT.parent.role}</SplitText>
          </p>
        </div>

        <p className="mt-10 max-w-2xl text-base leading-relaxed text-foreground/75 lg:text-lg">
          <SplitText mode="block">{ABOUT.parent.close}</SplitText>
        </p>

        {/*
         * `EXPLORE OPS 1776 GROUP` — no destination URL available for the
         * parent company site, so the CTA is intentionally omitted rather
         * than shipping a dead link. Restore this block when a URL exists
         * on ABOUT.parent.cta.href.
         */}
        {ABOUT.parent.cta.href && (
          <div className="mt-12">
            <CtaButton href={ABOUT.parent.cta.href} variant="primary">
              {ABOUT.parent.cta.label}
            </CtaButton>
          </div>
        )}
      </div>
    </section>
  )
}

export default Parent
