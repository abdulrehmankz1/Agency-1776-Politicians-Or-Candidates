'use client'

import Icon from '@/components/icon'
import RevealBorder from '@/components/reveal-border'
import SplitText from '@/components/split-text'
import { SOLUTIONS } from '@/constants/campaign'
import { useScrubHeading } from '@/hooks/use-scrub-heading'
import { useSectionReveal } from '@/hooks/use-section-reveal'

const Outcomes = () => {
  const scopeRef = useSectionReveal()
  const headingRef = useScrubHeading()

  return (
    <section
      ref={scopeRef}
      id="solutions-outcomes"
      className="relative isolate overflow-hidden bg-background py-32"
    >
      <div className="relative mx-auto max-w-[1600px] px-6 lg:px-10">
        <div className="grid grid-cols-12 gap-10 lg:gap-16">
          {/* Header column — eyebrow, heading, intro. Sticky on lg so it
              anchors the outcomes list scrolling next to it. */}
          <div className="col-span-12 lg:col-span-5">
            <div className="lg:sticky lg:top-[8rem]">
              <div className="flex items-center gap-3 text-[0.82rem] uppercase tracking-[0.28em] text-foreground/60">
                <span className="border border-muted px-2 py-0.5 font-mono text-[0.8rem] text-foreground/80">
                  05
                </span>
                <span
                  className="h-px w-8 bg-muted"
                  data-reveal="icon"
                  aria-hidden="true"
                />
                <span>{SOLUTIONS.outcomes.eyebrow}</span>
              </div>

              <h2
                ref={headingRef}
                className="mt-8 text-balance text-[clamp(2.5rem,5.5vw,4.75rem)] leading-[0.95] tracking-[0.005em]"
              >
                <SplitText mode="words">{SOLUTIONS.outcomes.heading}</SplitText>
              </h2>

              <div className="relative mt-10 bg-surface p-6 lg:p-8">
                <RevealBorder tone="accent" />
                <p className="text-base leading-relaxed text-foreground/85 lg:text-lg">
                  <SplitText mode="block">{SOLUTIONS.outcomes.intro}</SplitText>
                </p>
              </div>
            </div>
          </div>

          {/* Outcomes list — hairline stacked. Each entry is a full-width
              row with an accent arrow, numeric index, and the verbatim
              outcome statement in display type. */}
          <div className="col-span-12 lg:col-span-7">
            <ol className="flex flex-col">
              {SOLUTIONS.outcomes.items.map((outcome, i) => (
                <li
                  key={outcome}
                  className="group relative flex items-center gap-6 border-t border-muted/50 py-6 last:border-b lg:gap-8 lg:py-8"
                >
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
                    className="flex h-8 w-8 shrink-0 items-center justify-center border border-accent text-accent"
                  >
                    <Icon name="arrow" className="h-4 w-4" strokeWidth={1.75} />
                  </span>
                  <p className="font-display text-[clamp(1.25rem,2.4vw,2rem)] leading-[1.05] tracking-[0.005em] text-foreground">
                    <SplitText mode="words">{outcome}</SplitText>
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Outcomes
