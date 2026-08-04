'use client'

import Icon from '@/components/icon'
import MagneticCard from '@/components/magnetic-card'
import RevealBorder from '@/components/reveal-border'
import SplitText from '@/components/split-text'
import { FORWARD } from '@/constants/campaign'
import { useScrubHeading } from '@/hooks/use-scrub-heading'
import { useSectionReveal } from '@/hooks/use-section-reveal'

// 4x3 bento — first tile is a 2x2 anchor, remaining 8 fill around it.
// The `span` value drives Tailwind's arbitrary col/row-span classes. Kept
// static so Tailwind can pick them up at build time.
const CELLS = [
  { i: 0, span: 'lg:col-span-2 lg:row-span-2', featured: true },
  { i: 1, span: 'lg:col-span-1' },
  { i: 2, span: 'lg:col-span-1' },
  { i: 3, span: 'lg:col-span-1' },
  { i: 4, span: 'lg:col-span-1' },
  { i: 5, span: 'lg:col-span-1' },
  { i: 6, span: 'lg:col-span-1' },
  { i: 7, span: 'lg:col-span-1' },
  { i: 8, span: 'lg:col-span-1' },
]

const Forward = () => {
  const scopeRef = useSectionReveal()
  const headingRef = useScrubHeading()

  return (
    <section
      ref={scopeRef}
      id="forward"
      className="relative isolate overflow-hidden bg-background py-32"
    >
      <div className="relative mx-auto max-w-[1600px] px-6 lg:px-10">
        {/* Header — eyebrow, then heading, then supporting paragraph. A
            single top-down column so the reader always sees the heading
            before its description. */}
        <header className="max-w-[1180px] pb-16">
          <div className="flex items-center gap-3 text-[0.82rem] uppercase tracking-[0.28em] text-foreground/60">
            <span className="border border-muted px-2 py-0.5 font-mono text-[0.8rem] text-foreground/80">
              02
            </span>
            <span
              className="h-px w-8 bg-muted"
              data-reveal="icon"
              aria-hidden="true"
            />
            <span>What we build</span>
          </div>

          <h2
            ref={headingRef}
            className="mt-8 text-balance text-[clamp(3rem,7.5vw,6.5rem)] leading-[0.92] tracking-[0.005em]"
          >
            <SplitText mode="words">{FORWARD.heading}</SplitText>
          </h2>

          <p className="mt-8 max-w-2xl text-base leading-relaxed text-foreground/70 lg:text-lg">
            <SplitText mode="block">{FORWARD.tagline}</SplitText>
          </p>
        </header>

        {/* Bento — 4-col grid on lg, featured tile spans 2x2. */}
        <ul className="grid grid-cols-1 gap-px bg-muted md:grid-cols-2 lg:auto-rows-[minmax(200px,1fr)] lg:grid-cols-4">
          {CELLS.map(({ i, span, featured }) => {
            const item = FORWARD.items[i]
            if (!item) return null
            return (
              <li
                key={item.label}
                className={`relative flex bg-background ${span}`}
              >
                <MagneticCard
                  strength={0.08}
                  className="h-full w-full"
                  innerClassName={`flex ${featured ? 'flex-col justify-between p-10 lg:p-12' : 'flex-col justify-between gap-8 p-8 lg:p-10'}`}
                >
                  <RevealBorder tone={featured ? 'accent' : 'muted'} />

                  {featured ? (
                    <>
                      <div className="flex items-center justify-between">
                        <Icon
                          name={item.icon}
                          className="h-12 w-12 text-accent"
                          strokeWidth={1.25}
                        />
                        <span
                          data-reveal="icon"
                          aria-hidden="true"
                          className="font-mono text-[0.78rem] uppercase tracking-[0.28em] text-accent"
                        >
                          01/09
                        </span>
                      </div>
                      <div>
                        <h3 className="text-[clamp(2.75rem,5vw,4.5rem)] leading-[0.92] tracking-[0.005em]">
                          <SplitText mode="words">{item.label}</SplitText>
                        </h3>
                        <div
                          data-reveal="icon"
                          aria-hidden="true"
                          className="mt-6 h-px w-24 bg-accent"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <Icon
                        name={item.icon}
                        className="h-9 w-9 text-accent"
                        strokeWidth={1.5}
                      />

                      <h3 className="text-2xl leading-[0.95] tracking-[0.01em] lg:text-3xl">
                        <SplitText mode="words">{item.label}</SplitText>
                      </h3>
                    </>
                  )}
                </MagneticCard>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

export default Forward
