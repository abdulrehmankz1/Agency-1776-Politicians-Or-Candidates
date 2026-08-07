'use client'

import HeroBackdrop from '@/components/hero-backdrop'
import CtaButton from '@/components/cta-button'
import SplitText from '@/components/split-text'
import { AGENCY, SOLUTIONS } from '@/constants/campaign'
import { useSectionReveal } from '@/hooks/use-section-reveal'
import { scrollToId } from '@/utils/scroll-to'

// Inline TOC in the hero right rail — structural framing only, no invented copy.
const TOC = [
  { num: '02', label: 'Who We Support' },
  { num: '03', label: 'What We Build' },
  { num: '04', label: 'Support Options' },
  { num: '05', label: 'How the Work Helps' },
]

const SolutionsHero = () => {
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
      id="solutions-hero"
      className="relative isolate flex min-h-[100dvh] flex-col overflow-hidden bg-background pt-[7rem]"
    >
      <HeroBackdrop />

      <div className="relative z-10 mx-auto flex w-full max-w-[1600px] flex-1 flex-col justify-center px-6 pb-16 lg:px-10">
        <div className="grid grid-cols-12 gap-6 lg:gap-12">
          <div className="col-span-12 flex flex-col justify-center lg:col-span-8">
            <div className="flex items-center gap-3 text-[0.82rem] uppercase tracking-[0.28em] text-foreground/60">
              <span className="border border-muted px-2 py-0.5 font-mono text-[0.8rem] text-foreground/80">
                01
              </span>
              <span
                className="h-px w-8 bg-muted"
                data-reveal="icon"
                aria-hidden="true"
              />
              <span>{AGENCY.brand} / Campaign Solutions</span>
            </div>

            <h1 className="mt-10 text-balance text-[clamp(2.75rem,7.2vw,7rem)] leading-[0.92] tracking-[0.005em]">
              <SplitText mode="words">{SOLUTIONS.hero.heading}</SplitText>
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-foreground/75 lg:text-xl">
              <SplitText mode="block">{SOLUTIONS.hero.tagline}</SplitText>
            </p>

            <div className="mt-12">
              {/* Same-page scroll to the packages section — real `<button>`
                  element (no href), so no section-based link ever ships. */}
              <CtaButton
                onClick={() => scrollToId(SOLUTIONS.hero.cta.scrollTo)}
                variant="primary"
              >
                {SOLUTIONS.hero.cta.label}
              </CtaButton>
            </div>
          </div>

          {/* Right-rail TOC — hairline index of the following sections. Not
              additional copy; just structural wayfinding. */}
          <aside
            aria-hidden="true"
            className="col-span-12 hidden flex-col justify-end lg:col-span-4 lg:flex"
          >
            <div className="flex items-center gap-3 text-[0.8rem] uppercase tracking-[0.28em] text-foreground">
              <span
                data-reveal="icon"
                className="block h-px w-10 bg-accent"
              />
              <span>Index</span>
            </div>
            <ul className="mt-6 grid grid-cols-1 gap-px bg-muted/70">
              {TOC.map((item) => (
                <li
                  key={item.num}
                  className="flex items-center gap-4 bg-background px-4 py-3"
                >
                  <span
                    data-reveal="icon"
                    className="font-mono text-lg uppercase tracking-[0.28em] text-foreground"
                  >
                    {item.num}
                  </span>
                  <span
                    data-reveal="icon"
                    className="h-px w-6 shrink-0 bg-accent/60"
                  />
                  <span className="font-display text-xl leading-none tracking-[0.005em] text-foreground">
                    {item.label}
                  </span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </section>
  )
}

export default SolutionsHero
