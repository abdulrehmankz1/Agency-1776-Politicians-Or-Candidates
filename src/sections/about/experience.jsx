'use client'

import LineBackdrop from '@/components/line-backdrop'
import RevealBorder from '@/components/reveal-border'
import SplitText from '@/components/split-text'
import { ABOUT } from '@/constants/campaign'
import { useScrubHeading } from '@/hooks/use-scrub-heading'
import { useSectionReveal } from '@/hooks/use-section-reveal'

const Experience = () => {
  const scopeRef = useSectionReveal()
  const headingRef = useScrubHeading()

  return (
    <section
      ref={scopeRef}
      id="about-experience"
      className="relative isolate overflow-hidden bg-surface py-32"
    >
      <LineBackdrop tone="muted" columns={14} pulses={3} />

      <div className="relative mx-auto max-w-[1600px] px-6 lg:px-10">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-4">
            <div className="flex items-center gap-3 text-[0.82rem] uppercase tracking-[0.28em] text-foreground/60">
              <span className="border border-muted px-2 py-0.5 font-mono text-[0.8rem] text-foreground/80">
                04
              </span>
              <span
                className="h-px w-8 bg-muted"
                data-reveal="icon"
                aria-hidden="true"
              />
            </div>
          </div>

          <div className="col-span-12 lg:col-span-8">
            <h2
              ref={headingRef}
              className="text-balance text-[clamp(2.75rem,6.5vw,6rem)] leading-[0.92] tracking-[0.005em]"
            >
              <SplitText mode="words">{ABOUT.experience.heading}</SplitText>
            </h2>

            <div className="relative mt-12 bg-background p-8 lg:p-12">
              <RevealBorder tone="foreground" />
              <span
                data-reveal="icon"
                aria-hidden="true"
                className="absolute left-0 top-0 h-full w-1 bg-accent"
              />
              <p className="text-lg leading-relaxed text-foreground/85 lg:text-xl">
                <SplitText mode="block">{ABOUT.experience.body}</SplitText>
              </p>
            </div>

            {/* Two-line closer — each line rendered verbatim, big display type. */}
            <div className="mt-16 grid grid-cols-1 gap-6 border-t border-muted pt-10 md:grid-cols-2 md:gap-10">
              {ABOUT.experience.lines.map((line, i) => (
                <div key={i} className="flex items-start gap-4">
                  <span
                    data-reveal="icon"
                    aria-hidden="true"
                    className="mt-3 block h-2 w-[3px] shrink-0 bg-accent"
                  />
                  <p className="font-display text-[clamp(1.5rem,2.4vw,2.25rem)] leading-[1.05] tracking-[0.005em] text-foreground">
                    <SplitText mode="block">{line}</SplitText>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience
