'use client'

import CtaButton from '@/components/cta-button'
import Icon from '@/components/icon'
import RevealBorder from '@/components/reveal-border'
import SplitText from '@/components/split-text'
import { AGENCY, SOLUTIONS } from '@/constants/campaign'
import { useScrubHeading } from '@/hooks/use-scrub-heading'
import { useSectionReveal } from '@/hooks/use-section-reveal'

const Closer = () => {
  const scopeRef = useSectionReveal()
  const headingRef = useScrubHeading()

  return (
    <section
      ref={scopeRef}
      id="solutions-closer"
      className="relative isolate overflow-hidden bg-background py-32 lg:py-40"
    >
      <div className="relative mx-auto max-w-[1600px] px-6 lg:px-10">
        <div className="relative isolate overflow-hidden bg-surface p-10 lg:p-20">
          <RevealBorder tone="accent" />

          <div className="relative grid grid-cols-12 items-start gap-10 lg:gap-14">
            <div className="col-span-12 lg:col-span-8">
              <div className="flex items-center gap-3 text-[0.82rem] uppercase tracking-[0.28em] text-foreground/60">
                <span className="border border-muted px-2 py-0.5 font-mono text-[0.8rem] text-foreground/80">
                  06
                </span>
                <span
                  className="h-px w-8 bg-muted"
                  data-reveal="icon"
                  aria-hidden="true"
                />
                <span>{AGENCY.brand}</span>
              </div>

              <h2
                ref={headingRef}
                className="mt-8 text-balance text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] tracking-[0.005em]"
              >
                <SplitText mode="words">{SOLUTIONS.closer.heading}</SplitText>
              </h2>

              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-foreground/80 lg:text-xl">
                <SplitText mode="block">{SOLUTIONS.closer.body}</SplitText>
              </p>

              <div className="mt-12 flex flex-wrap items-center gap-4">
                {SOLUTIONS.closer.ctas.map((c) => (
                  <CtaButton key={c.label} href={c.href} variant={c.variant}>
                    {c.label}
                  </CtaButton>
                ))}
              </div>
            </div>

            <aside
              aria-hidden="true"
              className="col-span-12 hidden lg:col-span-4 lg:flex lg:justify-end"
            >
              <div className="relative flex aspect-square w-full max-w-[240px] flex-col justify-between border border-accent p-6">
                <div className="flex items-start justify-between">
                  <Icon
                    name="star"
                    className="h-6 w-6 text-accent"
                    strokeWidth={1.5}
                  />
                  <span
                    data-reveal="icon"
                    aria-hidden="true"
                    className="block h-1.5 w-1.5 bg-accent"
                  />
                </div>
                <div
                  data-reveal="icon"
                  className="font-display text-[3.75rem] leading-none tracking-[0.005em] text-foreground/90"
                >
                  17<span className="text-accent">76</span>
                </div>
                <div className="flex items-center gap-2 border-t border-muted/60 pt-3">
                  <Icon
                    name="arrow"
                    className="h-4 w-4 text-accent"
                    strokeWidth={1.75}
                  />
                  <span className="text-[0.72rem] uppercase tracking-[0.28em] text-foreground/60">
                    {AGENCY.brand}
                  </span>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Closer
