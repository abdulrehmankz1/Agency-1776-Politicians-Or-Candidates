'use client'

import CtaButton from '@/components/cta-button'
import RevealBorder from '@/components/reveal-border'
import SplitText from '@/components/split-text'
import { PRICING_COMMIT } from '@/constants/pricing'
import { useScrubHeading } from '@/hooks/use-scrub-heading'
import { useSectionReveal } from '@/hooks/use-section-reveal'
import { scrollToId } from '@/utils/scroll-to'

const PricingCommit = () => {
  const scopeRef = useSectionReveal()
  const headingRef = useScrubHeading()

  return (
    <section
      ref={scopeRef}
      id="commit"
      className="relative isolate overflow-hidden bg-background py-32 lg:py-40"
    >
      <div className="relative mx-auto max-w-[1600px] px-6 lg:px-10">
        <div className="relative isolate overflow-hidden bg-surface p-10 lg:p-20">
          <RevealBorder tone="accent" />

          <div className="relative grid grid-cols-12 items-end gap-10">
            <div className="col-span-12">
              <div className="flex items-center gap-3 text-[0.82rem] uppercase tracking-[0.28em] text-foreground/60">
                <span className="border border-muted px-2 py-0.5 font-mono text-[0.8rem] text-foreground/80">
                  03
                </span>
                <span
                  data-reveal="icon"
                  aria-hidden="true"
                  className="h-px w-8 bg-muted"
                />
              </div>

              <h2
                ref={headingRef}
                className="mt-8 text-balance text-[clamp(2.75rem,7vw,6rem)] leading-[0.95] tracking-[0.005em]"
              >
                <SplitText mode="words">{PRICING_COMMIT.heading}</SplitText>
              </h2>

              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-foreground/85 lg:text-xl">
                <SplitText mode="block">{PRICING_COMMIT.body}</SplitText>
              </p>

              <div className="mt-12 flex flex-wrap items-center gap-4">
                {PRICING_COMMIT.ctas.map((c) => (
                  <CtaButton
                    key={c.label}
                    href={c.href}
                    onClick={c.scrollTo ? () => scrollToId(c.scrollTo) : undefined}
                    variant={c.variant}
                  >
                    {c.label}
                  </CtaButton>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PricingCommit
