'use client'

import Icon from '@/components/icon'
import MagneticCard from '@/components/magnetic-card'
import RevealBorder from '@/components/reveal-border'
import SplitText from '@/components/split-text'
import { ABOUT } from '@/constants/campaign'
import { useScrubHeading } from '@/hooks/use-scrub-heading'
import { useSectionReveal } from '@/hooks/use-section-reveal'

const Paths = () => {
  const scopeRef = useSectionReveal()
  const headingRef = useScrubHeading()

  return (
    <section
      ref={scopeRef}
      id="about-paths"
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
            <span>{ABOUT.paths.eyebrow}</span>
          </div>

          <h2
            ref={headingRef}
            className="mt-8 text-balance text-[clamp(3rem,7vw,6rem)] leading-[0.92] tracking-[0.005em]"
          >
            <SplitText mode="words">{ABOUT.paths.heading}</SplitText>
          </h2>

          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-foreground/75 lg:text-xl">
            <SplitText mode="block">{ABOUT.paths.intro}</SplitText>
          </p>
        </header>

        {/* Three-path cards — one per audience, each rendering the verbatim
            sentence supplied by the client. Hairline separators, accent leader
            on each card, magnetic follow. */}
        <ul className="grid grid-cols-1 gap-px bg-muted md:grid-cols-3">
          {ABOUT.paths.items.map((item, i) => (
            <li
              key={i}
              className="relative flex bg-background"
            >
              <MagneticCard
                strength={0.08}
                className="h-full w-full"
                innerClassName="flex h-full flex-col justify-between gap-8 p-8 lg:p-10"
              >
                <RevealBorder tone="muted" />

                <div className="flex items-center justify-between">
                  <Icon
                    name={item.icon}
                    className="h-10 w-10 text-accent"
                    strokeWidth={1.5}
                  />
                  <span
                    data-reveal="icon"
                    aria-hidden="true"
                    className="font-mono text-base uppercase tracking-[0.28em] text-white lg:text-lg"
                  >
                    0{i + 1} / 03
                  </span>
                </div>

                <p className="text-lg leading-relaxed text-foreground/85 lg:text-xl">
                  <SplitText mode="block">{item.text}</SplitText>
                </p>

                <span
                  data-reveal="icon"
                  aria-hidden="true"
                  className="h-px w-24 bg-accent"
                />
              </MagneticCard>
            </li>
          ))}
        </ul>

        {/* Standard statements — hairline-stacked, exactly four lines. */}
        <div className="mt-20 grid grid-cols-1 gap-px bg-muted md:grid-cols-2 lg:grid-cols-4">
          {ABOUT.paths.standard.map((line, i) => (
            <div
              key={i}
              className="relative flex items-start gap-4 bg-background p-8 lg:p-10"
            >
              <RevealBorder tone="muted" />
              <span
                data-reveal="icon"
                aria-hidden="true"
                className="mt-2 block h-2 w-[3px] shrink-0 bg-accent"
              />
              <p className="font-display text-[clamp(1.25rem,1.8vw,1.75rem)] leading-[1.05] tracking-[0.005em] text-foreground/90">
                <SplitText mode="block">{line}</SplitText>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Paths
