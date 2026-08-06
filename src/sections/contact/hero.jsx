'use client'

import HeroBackdrop from '@/components/hero-backdrop'
import CtaButton from '@/components/cta-button'
import SplitText from '@/components/split-text'
import { AGENCY, CONTACT_PAGE } from '@/constants/campaign'
import { useSectionReveal } from '@/hooks/use-section-reveal'
import { scrollToId } from '@/utils/scroll-to'

const ContactHero = () => {
  const scopeRef = useSectionReveal({
    start: 'top 95%',
    borderDuration: 0.55,
    iconDuration: 0.4,
    iconStagger: 0.05,
    wordDuration: 0.55,
    wordStagger: 0.02,
    overlap: 0.35,
  })

  return (
    <section
      ref={scopeRef}
      id="contact-hero"
      className="relative isolate flex min-h-[100dvh] flex-col overflow-hidden bg-background pt-[7rem]"
    >
      <HeroBackdrop />

      <div className="relative z-10 mx-auto flex w-full max-w-[1600px] flex-1 flex-col justify-center px-6 pb-16 lg:px-10">
        <div className="grid grid-cols-12 gap-6 lg:gap-12">
          <div className="col-span-12">
            <div className="flex items-center gap-3 text-[0.82rem] uppercase tracking-[0.28em] text-foreground/60">
              <span className="border border-muted px-2 py-0.5 font-mono text-[0.8rem] text-foreground/80">
                01
              </span>
              <span
                className="h-px w-8 bg-muted"
                data-reveal="icon"
                aria-hidden="true"
              />
              <span>{AGENCY.brand} / Contact</span>
            </div>

            <h1 className="mt-10 text-balance text-[clamp(2.75rem,7.2vw,7rem)] leading-[0.92] tracking-[0.005em]">
              <SplitText mode="words">{CONTACT_PAGE.hero.heading}</SplitText>
            </h1>

            {/* Three-line subtext — each paragraph gets its own reveal so the
                "Start here." beat stands alone visually. */}
            <div className="mt-10 flex flex-col gap-5 text-lg leading-relaxed text-foreground/75 lg:text-xl">
              <p>
                <SplitText mode="block">
                  {CONTACT_PAGE.hero.subtext[0]}
                </SplitText>
              </p>
              <p className="font-display text-[clamp(1.75rem,3vw,2.5rem)] leading-[1] tracking-[0.005em] text-foreground">
                <SplitText mode="words">
                  {CONTACT_PAGE.hero.subtext[1]}
                </SplitText>
              </p>
              <p className="max-w-2xl">
                <SplitText mode="block">
                  {CONTACT_PAGE.hero.subtext[2]}
                </SplitText>
              </p>
            </div>

            <div className="mt-12">
              {/* Same-page scroll to the form section — real `<button>`
                  element (no href), so no section-based link ever ships. */}
              <CtaButton
                onClick={() => scrollToId(CONTACT_PAGE.hero.cta.scrollTo)}
                variant="primary"
              >
                {CONTACT_PAGE.hero.cta.label}
              </CtaButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactHero
