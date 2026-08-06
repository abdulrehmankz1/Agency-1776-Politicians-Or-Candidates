'use client'

import Link from 'next/link'

import Footer from '@/components/footer'
import Icon from '@/components/icon'
import RevealBorder from '@/components/reveal-border'
import SplitText from '@/components/split-text'
import { AGENCY } from '@/constants/campaign'
import { LEGAL_EFFECTIVE_DATE } from '@/constants/legal'
import { useSectionReveal } from '@/hooks/use-section-reveal'

/*
 * Shared layout for the legal documents (Privacy Policy, Terms of Service).
 * Reads a `doc` object from `@/constants/legal` and renders it in the site's
 * visual language — a display hero, then always-visible prose.
 *
 * Body copy is intentionally NOT wrapped in the scroll-reveal (which hides
 * content until a ScrollTrigger fires): legal text must be readable, printable,
 * and findable (Ctrl+F) the moment the page loads. Only the hero animates.
 */

// Turn a section heading into a stable, linkable anchor id.
const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/[’'“”"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

/*
 * Split copy on `[[ ... ]]` review placeholders and render those tokens as a
 * visible flag so anything left to confirm before publishing is obvious both
 * on the page and in review. Plain text passes through untouched.
 */
const renderCopy = (text) => {
  const parts = text.split(/(\[\[[^\]]+\]\])/g)
  return parts.map((part, i) => {
    const match = part.match(/^\[\[(.+)\]\]$/)
    if (!match) return part
    return (
      <mark
        key={i}
        className="mx-0.5 rounded-none bg-accent/15 px-1.5 py-0.5 font-mono text-[0.85em] uppercase tracking-[0.12em] text-accent"
      >
        {match[1]}
      </mark>
    )
  })
}

const LegalPage = ({ doc }) => {
  const heroRef = useSectionReveal({
    start: 'top 95%',
    charDuration: 0.7,
    charStagger: 0.016,
    lineDuration: 0.65,
    overlap: 0.35,
  })

  return (
    <main className="relative">
      {/* Hero */}
      <section
        ref={heroRef}
        className="relative isolate overflow-hidden bg-background px-6 pb-16 pt-[9rem] lg:px-10 lg:pb-20 lg:pt-[11rem]"
      >
        <div className="mx-auto max-w-[1600px] text-center">
          <div className="flex items-center justify-center gap-3 text-[0.82rem] uppercase tracking-[0.28em] text-foreground/60">
            <span className="border border-muted px-2 py-0.5 font-mono text-[0.8rem] text-foreground/80">
              §
            </span>
            <span
              data-reveal="icon"
              aria-hidden="true"
              className="h-px w-8 bg-muted"
            />
            <span>{doc.eyebrow}</span>
          </div>

          <h1 className="mx-auto mt-8 max-w-4xl text-balance text-[clamp(2.75rem,7vw,6rem)] leading-[0.92] tracking-[0.005em]">
            <SplitText mode="chars">{doc.title}</SplitText>
          </h1>

          <div className="mt-8 flex items-center justify-center gap-3 text-[0.78rem] uppercase tracking-[0.28em] text-foreground/55">
            <span
              data-reveal="icon"
              aria-hidden="true"
              className="block h-2 w-[3px] bg-accent"
            />
            <span>Last updated — {LEGAL_EFFECTIVE_DATE}</span>
          </div>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-foreground/75 lg:text-xl">
            <SplitText mode="block">{doc.intro}</SplitText>
          </p>
        </div>
      </section>

      {/* Body — always-visible prose. */}
      <section className="relative bg-background px-6 pb-28 lg:px-10 lg:pb-36">
        <div className="mx-auto max-w-[1600px]">
          <div className="grid grid-cols-12 gap-x-10">
            <div className="col-span-12 lg:col-span-8 lg:col-start-3">
              {doc.sections.map((section, index) => (
                <article
                  key={section.heading}
                  id={slugify(section.heading)}
                  className="scroll-mt-32 border-t border-muted py-12 first:border-t-0 first:pt-0 lg:py-14"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-[0.8rem] text-foreground/45">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h2 className="text-[clamp(1.6rem,3vw,2.4rem)] leading-[1] tracking-[0.01em]">
                      {section.heading}
                    </h2>
                  </div>

                  <div className="mt-6 max-w-[68ch] space-y-5 text-base leading-relaxed text-foreground/80 lg:text-[1.05rem]">
                    {section.body.map((paragraph, i) => (
                      <p key={i}>{renderCopy(paragraph)}</p>
                    ))}

                    {section.list && (
                      <ul className="mt-2 space-y-3">
                        {section.list.map((item) => (
                          <li key={item} className="flex items-start gap-3">
                            <span
                              aria-hidden="true"
                              className="mt-[0.55em] block h-px w-4 shrink-0 bg-accent"
                            />
                            <span>{renderCopy(item)}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </article>
              ))}

              {/* Closing CTA back to the live contact channel. */}
              <div className="relative mt-12 overflow-hidden border border-muted bg-surface p-8 lg:p-10">
                <RevealBorder tone="accent" />
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center gap-4">
                    <Icon
                      name="scroll"
                      className="h-8 w-8 text-accent"
                      strokeWidth={1.25}
                    />
                    <p className="text-base leading-relaxed text-foreground/80">
                      Questions about this page? Reach the {AGENCY.brand} team
                      directly.
                    </p>
                  </div>
                  <Link
                    href="/contact"
                    data-cursor="link"
                    className="group inline-flex items-center gap-3 whitespace-nowrap text-[0.82rem] uppercase tracking-[0.28em] text-foreground transition-colors hover:text-accent"
                  >
                    <span>Go to Contact</span>
                    <span
                      aria-hidden="true"
                      className="h-px w-8 origin-left scale-x-100 bg-accent transition-transform duration-500 ease-out group-hover:scale-x-150"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

export default LegalPage
