'use client'

import HeroBackdrop from '@/components/hero-backdrop'
import Icon from '@/components/icon'
import SplitText from '@/components/split-text'
import { AGENCY, WORK } from '@/constants/campaign'
import { useSectionReveal } from '@/hooks/use-section-reveal'

const WorkHero = () => {
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
      id="work-hero"
      className="relative isolate flex min-h-[100dvh] flex-col overflow-hidden bg-background pt-[7rem]"
    >
      <HeroBackdrop />

      <div className="relative z-10 mx-auto flex w-full max-w-[1600px] flex-1 flex-col justify-center px-6 pb-16 lg:px-10">
        <div className="grid grid-cols-12 gap-6 lg:gap-10">
          <div className="col-span-12 lg:col-span-9">
            <div className="flex items-center gap-3 text-[0.82rem] uppercase tracking-[0.28em] text-foreground/60">
              <span className="border border-muted px-2 py-0.5 font-mono text-[0.8rem] text-foreground/80">
                01
              </span>
              <span
                className="h-px w-8 bg-muted"
                data-reveal="icon"
                aria-hidden="true"
              />
              <span>{AGENCY.brand} / Work</span>
            </div>

            <h1 className="mt-10 text-balance text-[clamp(2.75rem,7vw,6.75rem)] leading-[0.92] tracking-[0.005em]">
              <SplitText mode="words">{WORK.hero.heading}</SplitText>
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-foreground/75 lg:text-xl">
              <SplitText mode="block">{WORK.hero.tagline}</SplitText>
            </p>
          </div>

          {/* Right rail — a stack of stat-style hairline plates that hint at
              the section-two showcase without inventing any copy. */}
          <aside
            aria-hidden="true"
            className="col-span-12 hidden flex-col justify-end gap-6 lg:col-span-3 lg:flex"
          >
            <div className="flex items-center gap-3 text-[0.75rem] uppercase tracking-[0.28em] text-foreground/65">
              <span data-reveal="icon" className="block h-px w-10 bg-accent" />
              <span>Portfolio</span>
            </div>
            <div className="grid gap-px bg-muted/60">
              <div className="flex items-center justify-between bg-background px-4 py-4">
                <span
                  data-reveal="icon"
                  className="font-mono text-[0.75rem] uppercase tracking-[0.28em] text-foreground/65"
                >
                  Races
                </span>
                <Icon
                  name="chart"
                  className="h-5 w-5 text-accent"
                  strokeWidth={1.5}
                />
              </div>
              <div className="flex items-center justify-between bg-background px-4 py-4">
                <span
                  data-reveal="icon"
                  className="font-mono text-[0.75rem] uppercase tracking-[0.28em] text-foreground/65"
                >
                  Movements
                </span>
                <Icon
                  name="pulse"
                  className="h-5 w-5 text-accent"
                  strokeWidth={1.5}
                />
              </div>
              <div className="flex items-center justify-between bg-background px-4 py-4">
                <span
                  data-reveal="icon"
                  className="font-mono text-[0.75rem] uppercase tracking-[0.28em] text-foreground/65"
                >
                  Digital
                </span>
                <Icon
                  name="star"
                  className="h-5 w-5 text-accent"
                  strokeWidth={1.5}
                />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}

export default WorkHero
