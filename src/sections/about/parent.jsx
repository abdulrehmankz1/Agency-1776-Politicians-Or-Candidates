'use client'

import CtaButton from '@/components/cta-button'
import Icon from '@/components/icon'
import LineBackdrop from '@/components/line-backdrop'
import RevealBorder from '@/components/reveal-border'
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
        <div className="grid grid-cols-12 gap-10 lg:gap-12">
          {/* Left rail — eyebrow, index, framed accent plate. */}
          <div className="col-span-12 flex flex-col justify-between gap-10 lg:col-span-4">
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

            <div className="relative hidden bg-background p-8 lg:block">
              <RevealBorder tone="accent" />
              <Icon
                name="star"
                className="h-8 w-8 text-accent"
                strokeWidth={1.25}
              />
              <div
                data-reveal="icon"
                className="mt-10 font-display text-[4rem] leading-none tracking-[0.005em] text-foreground/85"
              >
                17<span className="text-accent">76</span>
              </div>
              <div className="mt-6 flex items-center gap-3 border-t border-muted pt-4 text-[0.72rem] uppercase tracking-[0.28em] text-foreground/60">
                <Icon name="scroll" className="h-4 w-4" strokeWidth={1.5} />
                <span>Ops 1776 Group</span>
              </div>
            </div>
          </div>

          {/* Right column — heading, paragraphs, quoted role line, close, CTA. */}
          <div className="col-span-12 lg:col-span-8">
            <h2
              ref={headingRef}
              className="text-balance text-[clamp(2.5rem,5.5vw,5rem)] leading-[0.95] tracking-[0.005em]"
            >
              <SplitText mode="words">{ABOUT.parent.heading}</SplitText>
            </h2>

            <div className="mt-12 space-y-6 text-lg leading-relaxed text-foreground/80 lg:text-xl">
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
                <CtaButton
                  href={ABOUT.parent.cta.href}
                  variant="primary"
                >
                  {ABOUT.parent.cta.label}
                </CtaButton>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Parent
