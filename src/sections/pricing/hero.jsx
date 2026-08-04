'use client'

import HeroBackdrop from '@/components/hero-backdrop'
import CtaButton from '@/components/cta-button'
import Icon from '@/components/icon'
import RevealBorder from '@/components/reveal-border'
import SplitText from '@/components/split-text'
import { AGENCY } from '@/constants/campaign'
import { PRICING_HERO } from '@/constants/pricing'
import { useSectionReveal } from '@/hooks/use-section-reveal'
import { scrollToId } from '@/utils/scroll-to'

const PricingHero = () => {
  const scopeRef = useSectionReveal({
    start: 'top 95%',
    charDuration: 0.7,
    charStagger: 0.016,
    lineDuration: 0.65,
    overlap: 0.35,
  })

  return (
    <section
      ref={scopeRef}
      id="pricing-hero"
      className="relative isolate flex min-h-[100dvh] flex-col overflow-hidden bg-background pt-[7rem]"
    >
      <HeroBackdrop />

      <div className="relative z-10 mx-auto flex w-full max-w-[1600px] flex-1 flex-col justify-center px-6 pb-16 lg:px-10">
        <div className="grid grid-cols-12 items-end gap-8">
          <div className="col-span-12 lg:col-span-8">
            {/* Eyebrow — brand marker only. No invented descriptor text. */}
            <div className="flex items-center gap-3 text-[0.82rem] uppercase tracking-[0.28em] text-foreground/60">
              <span className="border border-muted px-2 py-0.5 font-mono text-[0.8rem] text-foreground/80">
                01
              </span>
              <span
                data-reveal="icon"
                aria-hidden="true"
                className="h-px w-8 bg-muted"
              />
              <span>{AGENCY.brand}</span>
            </div>

            <h1 className="mt-8 text-balance text-[clamp(3rem,8vw,7rem)] leading-[0.92] tracking-[0.005em]">
              <SplitText mode="words">{PRICING_HERO.heading}</SplitText>
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-foreground/70 lg:text-xl">
              <SplitText mode="block">{PRICING_HERO.subtext}</SplitText>
            </p>

            <div className="mt-12">
              <CtaButton
                onClick={() => scrollToId(PRICING_HERO.cta.scrollTo)}
                variant="primary"
              >
                {PRICING_HERO.cta.label}
              </CtaButton>
            </div>
          </div>

          {/* Right rail — decorative signature plate that mirrors the
              home hero's language so the two pages read as one system.
              No copy is invented: only the brand mark + monogram. */}
          <div
            aria-hidden="true"
            className="col-span-12 hidden lg:col-span-4 lg:block"
          >
            <div className="relative flex aspect-[4/5] max-h-[62vh] flex-col justify-between bg-surface p-8">
              <RevealBorder tone="accent" />

              <div className="flex items-start justify-between">
                <Icon
                  name="star"
                  className="h-10 w-10 text-accent"
                  strokeWidth={1.25}
                />
                <span
                  data-reveal="icon"
                  aria-hidden="true"
                  className="block h-2 w-2 bg-accent"
                />
              </div>

              <div className="pointer-events-none flex flex-1 items-center justify-center">
                <div
                  data-reveal="icon"
                  className="font-display text-[8.5rem] leading-none tracking-[0.005em] text-foreground/90"
                >
                  17
                  <span className="text-accent">76</span>
                </div>
              </div>

              <div className="flex items-center gap-3 border-t border-muted pt-4">
                <Icon name="scroll" className="h-4 w-4" strokeWidth={1.5} />
                <span className="text-[0.82rem] uppercase tracking-[0.24em] text-foreground/70">
                  {AGENCY.brand}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PricingHero
