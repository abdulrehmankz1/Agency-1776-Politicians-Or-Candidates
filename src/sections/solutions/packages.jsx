'use client'

import CtaButton from '@/components/cta-button'
import LineBackdrop from '@/components/line-backdrop'
import MagneticCard from '@/components/magnetic-card'
import RevealBorder from '@/components/reveal-border'
import SplitText from '@/components/split-text'
import { SOLUTIONS } from '@/constants/campaign'
import { useScrubHeading } from '@/hooks/use-scrub-heading'
import { useSectionReveal } from '@/hooks/use-section-reveal'

const Packages = () => {
  const scopeRef = useSectionReveal()
  const headingRef = useScrubHeading()

  return (
    <section
      ref={scopeRef}
      id="solutions-packages"
      className="relative isolate overflow-hidden bg-surface py-32"
    >
      <LineBackdrop tone="muted" columns={14} pulses={3} />

      <div className="relative mx-auto max-w-[1600px] px-6 lg:px-10">
        <header className="max-w-[1180px] pb-16">
          <div className="flex items-center gap-3 text-[0.82rem] uppercase tracking-[0.28em] text-foreground/60">
            <span className="border border-muted px-2 py-0.5 font-mono text-[0.8rem] text-foreground/80">
              04
            </span>
            <span
              className="h-px w-8 bg-muted"
              data-reveal="icon"
              aria-hidden="true"
            />
            <span>Support Options</span>
          </div>

          <h2
            ref={headingRef}
            className="mt-8 text-balance text-[clamp(2.75rem,6.5vw,5.75rem)] leading-[0.92] tracking-[0.005em]"
          >
            <SplitText mode="words">{SOLUTIONS.packages.heading}</SplitText>
          </h2>
        </header>

        {/* Four premium package cards side-by-side. Each card carries a big
            index, the package title in Bebas, and the verbatim description. */}
        <ul className="grid grid-cols-1 gap-px bg-muted md:grid-cols-2 lg:grid-cols-4">
          {SOLUTIONS.packages.items.map((pkg, i) => (
            <li key={pkg.title} className="relative flex bg-background">
              {/*
                Top-anchored inner layout (was `justify-between`). Bottom-
                anchoring made the title+body block hug the card bottom, so
                cards with a longer body — or a title that wraps to two lines —
                pushed their heading UP, leaving the four headings starting at
                different heights. Flowing the content from the top beneath the
                fixed-height index row makes every heading start at the same
                vertical position regardless of title/body length; the extra
                whitespace now falls at the bottom of the shorter cards.
              */}
              <MagneticCard
                strength={0.08}
                className="h-full w-full"
                innerClassName="flex h-full flex-col gap-10 p-8 lg:p-10"
              >
                <RevealBorder tone={i === 0 ? 'accent' : 'muted'} />

                <div className="flex items-start justify-between">
                  <span
                    data-reveal="icon"
                    aria-hidden="true"
                    className="font-display text-[3rem] leading-none tracking-[0.005em] text-accent"
                  >
                    0{i + 1}
                  </span>
                  <span
                    data-reveal="icon"
                    aria-hidden="true"
                    className="block h-2 w-2 bg-accent"
                  />
                </div>

                <div>
                  <h3 className="text-[clamp(1.5rem,2vw,2rem)] leading-[1.05] tracking-[0.005em]">
                    <SplitText mode="words">{pkg.title}</SplitText>
                  </h3>
                  <div
                    data-reveal="icon"
                    aria-hidden="true"
                    className="mt-4 h-px w-16 bg-accent"
                  />
                  <p className="mt-6 text-base leading-relaxed text-foreground/75">
                    <SplitText mode="block">{pkg.body}</SplitText>
                  </p>
                </div>
              </MagneticCard>
            </li>
          ))}
        </ul>

        <div className="mt-14 flex justify-center lg:justify-start">
          <CtaButton
            href={SOLUTIONS.packages.cta.href}
            variant="primary"
          >
            {SOLUTIONS.packages.cta.label}
          </CtaButton>
        </div>
      </div>
    </section>
  )
}

export default Packages
