'use client'

import CtaButton from '@/components/cta-button'
import LineBackdrop from '@/components/line-backdrop'
import RevealBorder from '@/components/reveal-border'
import SplitText from '@/components/split-text'
import { AGENCY, CONTACT } from '@/constants/campaign'
import { useScrubHeading } from '@/hooks/use-scrub-heading'
import { useSectionReveal } from '@/hooks/use-section-reveal'

const Contact = () => {
  const scopeRef = useSectionReveal()
  const headingRef = useScrubHeading()

  return (
    <section
      ref={scopeRef}
      id="contact"
      className="relative isolate overflow-hidden bg-background py-32 lg:py-40"
    >
      <div className="relative mx-auto max-w-[1600px] px-6 lg:px-10">
        <div className="relative isolate overflow-hidden bg-surface p-10 lg:p-20">
          <RevealBorder tone="accent" />

          {/* Layered lines *inside* the panel — a denser field that sells the
              premium feel without pulling attention off the headline. */}
          <LineBackdrop tone="contrast" columns={20} pulses={3} />

          {/* Heading + CTA, full width. The decorative monogram tile that
              used to sit on the right was removed. */}
          <div className="relative grid grid-cols-12 items-center gap-10 lg:gap-12">
            <div className="col-span-12">
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
                className="mt-8 text-balance text-[clamp(2.75rem,7vw,6.5rem)] leading-[0.95] tracking-[0.005em]"
              >
                <SplitText mode="words">{CONTACT.heading}</SplitText>
              </h2>

              <div className="mt-10">
                <CtaButton href={CONTACT.cta.href} variant="primary">
                  {CONTACT.cta.label}
                </CtaButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
