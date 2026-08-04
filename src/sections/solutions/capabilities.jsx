'use client'

import MagneticCard from '@/components/magnetic-card'
import RevealBorder from '@/components/reveal-border'
import SplitText from '@/components/split-text'
import { SOLUTIONS } from '@/constants/campaign'
import { useScrubHeading } from '@/hooks/use-scrub-heading'
import { useSectionReveal } from '@/hooks/use-section-reveal'

const Capabilities = () => {
  const scopeRef = useSectionReveal()
  const headingRef = useScrubHeading()

  return (
    <section
      ref={scopeRef}
      id="solutions-capabilities"
      className="relative isolate overflow-hidden bg-background py-32"
    >
      <div className="relative mx-auto max-w-[1600px] px-6 lg:px-10">
        <header className="max-w-[1180px] pb-16">
          <div className="flex items-center gap-3 text-[0.82rem] uppercase tracking-[0.28em] text-foreground/60">
            <span className="border border-muted px-2 py-0.5 font-mono text-[0.8rem] text-foreground/80">
              03
            </span>
            <span
              className="h-px w-8 bg-muted"
              data-reveal="icon"
              aria-hidden="true"
            />
            <span>Capabilities</span>
          </div>

          <h2
            ref={headingRef}
            className="mt-8 text-balance text-[clamp(2.75rem,6.5vw,5.75rem)] leading-[0.92] tracking-[0.005em]"
          >
            <SplitText mode="words">{SOLUTIONS.capabilities.heading}</SplitText>
          </h2>
        </header>

        {/* 2-col bento of ten capabilities on lg, 1-col on smaller viewports.
            Each tile gets a numeric index, big Bebas title, and body copy. */}
        <ul className="grid grid-cols-1 gap-px bg-muted md:grid-cols-2">
          {SOLUTIONS.capabilities.items.map((item, i) => (
            <li key={item.title} className="relative flex bg-background">
              <MagneticCard
                strength={0.06}
                className="h-full w-full"
                innerClassName="flex h-full flex-col gap-6 p-8 lg:p-10"
              >
                <RevealBorder tone="muted" />

                <div className="flex items-center gap-3">
                  <span
                    data-reveal="icon"
                    aria-hidden="true"
                    className="font-mono text-[0.8rem] uppercase tracking-[0.28em] text-accent"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    data-reveal="icon"
                    aria-hidden="true"
                    className="h-px w-10 bg-accent"
                  />
                </div>

                <h3 className="text-[clamp(1.5rem,2.4vw,2.25rem)] leading-[1] tracking-[0.005em]">
                  <SplitText mode="words">{item.title}</SplitText>
                </h3>

                <p className="text-base leading-relaxed text-foreground/75 lg:text-lg">
                  <SplitText mode="block">{item.body}</SplitText>
                </p>
              </MagneticCard>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Capabilities
