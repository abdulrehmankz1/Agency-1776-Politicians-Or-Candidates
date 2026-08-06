'use client'

import dynamic from 'next/dynamic'

import CtaButton from '@/components/cta-button'
import SplitText from '@/components/split-text'
import { AGENCY, HERO } from '@/constants/campaign'
import { useIsDesktop } from '@/hooks/use-is-desktop'
import { useSectionReveal } from '@/hooks/use-section-reveal'

/*
 * HeroBeams renders a WebGL (three.js + react-three-fiber) shader — by far the
 * heaviest thing on the landing page. Load it in its own client-only chunk and
 * only mount it on desktop, so phones never download three.js or run the WebGL
 * loop. The decorative beams are a pure enhancement; the hero reads perfectly
 * on its solid background without them.
 */
const HeroBeams = dynamic(() => import('@/components/hero-beams'), {
  ssr: false,
})

const Hero = () => {
  const isDesktop = useIsDesktop()

  // Above the fold — pack the border → icon → text sequence tight so the
  // display headline lands within ~1s of first paint, not 2s.
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
      id="home"
      className="relative isolate flex min-h-[100dvh] flex-col overflow-hidden bg-background pt-[7rem]"
    >
      {isDesktop && <HeroBeams />}

      <div className="relative mx-auto flex w-full max-w-[1600px] flex-1 flex-col justify-center px-6 pb-16 lg:px-10">
        {/* Headline only. Nothing else — no invented stat lines, no
            supplementary copy. Content is entirely driven by the HERO
            constant. */}
        <div className="grid grid-cols-12 gap-6 lg:gap-8">
          <div className="col-span-12 flex flex-col justify-center">
            <div className="flex items-center gap-3 text-[0.82rem] uppercase tracking-[0.28em] text-foreground/60">
              <span className="border border-muted px-2 py-0.5 font-mono text-[0.8rem] text-foreground/80">
                01
              </span>
              <span
                className="h-px w-8 bg-muted"
                data-reveal="icon"
                aria-hidden="true"
              />
              <span>{AGENCY.brand}</span>
            </div>

            <h1 className="mt-8 text-balance text-[clamp(3rem,8.5vw,7.5rem)] leading-[0.92] tracking-[0.005em]">
              <SplitText mode="words">{HERO.heading}</SplitText>
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-foreground/70 lg:text-xl">
              <SplitText mode="block">{HERO.tagline}</SplitText>
            </p>

            <div className="mt-12 flex flex-wrap items-center gap-4">
              {HERO.ctas.map((c) => (
                <CtaButton key={c.label} href={c.href} variant={c.variant}>
                  {c.label}
                </CtaButton>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
