'use client'

import CtaButton from '@/components/cta-button'
import Icon from '@/components/icon'
import LineBackdrop from '@/components/line-backdrop'
import RevealBorder from '@/components/reveal-border'
import SplitText from '@/components/split-text'
import { REALITY } from '@/constants/campaign'
import { useScrubHeading } from '@/hooks/use-scrub-heading'
import { useSectionReveal } from '@/hooks/use-section-reveal'

const Reality = () => {
  const scopeRef = useSectionReveal()
  const headingRef = useScrubHeading()

  return (
    <section
      ref={scopeRef}
      id="reality"
      className="relative isolate overflow-hidden bg-surface py-32"
    >
      <LineBackdrop tone="muted" columns={12} pulses={3} />

      <div className="relative mx-auto max-w-[1600px] px-6 lg:px-10">
        {/* Editorial split — big oversize index on the left, pull-quote body
            on the right. No aspect tile, no repeated card treatment. */}
        <div className="grid grid-cols-12 gap-8">
          <aside
            aria-hidden="true"
            className="col-span-12 flex flex-col justify-between border-l border-accent pl-6 lg:col-span-3"
          >
            <div className="flex items-center gap-3 text-[0.82rem] uppercase tracking-[0.28em] text-accent">
              <span className="border border-accent px-2 py-0.5 font-mono text-[0.8rem] text-accent">
                03
              </span>
              <span
                className="h-px w-8 bg-accent"
                data-reveal="icon"
                aria-hidden="true"
              />
            </div>

            <div
              data-reveal="icon"
              className="font-display hidden text-[clamp(7rem,12vw,12rem)] leading-[0.85] tracking-[0.005em] text-accent lg:block"
            >
              /03
            </div>

            <div className="mt-6 hidden items-center gap-3 text-[0.78rem] uppercase tracking-[0.28em] text-foreground/65 lg:flex">
              <Icon name="pulse" className="h-5 w-5 text-accent" strokeWidth={1.5} />
              <span>{REALITY.eyebrow}</span>
            </div>
          </aside>

          <div className="col-span-12 lg:col-span-9">
            <div className="text-[0.82rem] uppercase tracking-[0.28em] text-accent lg:hidden">
              {REALITY.eyebrow}
            </div>

            <h2
              ref={headingRef}
              className="mt-4 text-balance text-[clamp(2.75rem,6vw,5.5rem)] leading-[0.95] tracking-[0.005em] lg:mt-0"
            >
              <SplitText mode="words">{REALITY.heading}</SplitText>
            </h2>

            {/* Body reads as a full-width pull-quote against the section. */}
            <div className="relative mt-12 bg-background p-8 lg:p-12">
              <RevealBorder tone="foreground" />

              <div
                data-reveal="icon"
                aria-hidden="true"
                className="absolute left-0 top-0 h-full w-1 bg-accent"
              />

              <p className="text-lg leading-relaxed text-foreground/85 lg:text-xl">
                <SplitText mode="block">{REALITY.body}</SplitText>
              </p>
            </div>

            <div className="mt-12">
              <CtaButton href={REALITY.cta.href} variant="primary">
                {REALITY.cta.label}
              </CtaButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Reality
