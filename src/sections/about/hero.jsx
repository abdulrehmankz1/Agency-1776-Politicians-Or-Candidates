'use client'

import HeroBackdrop from '@/components/hero-backdrop'
import SplitText from '@/components/split-text'
import { AGENCY, ABOUT } from '@/constants/campaign'
import { useSectionReveal } from '@/hooks/use-section-reveal'

const AboutHero = () => {
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
      id="about-hero"
      className="relative isolate flex min-h-[100dvh] flex-col overflow-hidden bg-background pt-[7rem]"
    >
      <HeroBackdrop />

      <div className="relative z-10 mx-auto flex w-full max-w-[1600px] flex-1 flex-col justify-center px-6 pb-16 lg:px-10">
        <div className="grid grid-cols-12 gap-6 lg:gap-8">
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
              <span>{AGENCY.brand} / About</span>
            </div>

            <h1 className="mt-10 text-balance text-[clamp(2.5rem,6.6vw,6.5rem)] leading-[0.94] tracking-[0.005em]">
              <SplitText mode="words">{ABOUT.hero.heading}</SplitText>
            </h1>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutHero
