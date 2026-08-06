'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import Icon from '@/components/icon'
import RevealBorder from '@/components/reveal-border'
import SplitText from '@/components/split-text'
import { AGENCY } from '@/constants/campaign'
import { useSectionReveal } from '@/hooks/use-section-reveal'
import { cn } from '@/utils/cn'
import { scrollToTop } from '@/utils/scroll-to'

/*
 * The site's real pages, split across the footer's two navigation columns for
 * a balanced layout. Every entry routes to a real page — home-section anchors
 * (`/#foo`) were removed in the site-wide navigation audit ("page routes
 * only" rule). The old "What we build" column (four identical links to
 * `/solutions`) was dropped; those capabilities live as sections inside the
 * Solutions page, reachable via the Solutions link below.
 */
const NAV_PRIMARY = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Portfolio', href: '/portfolio' },
]

const NAV_SECONDARY = [
  { label: 'Pricing', href: '/pricing' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Contact', href: '/contact' },
]

// Legal pages — surfaced in the meta rail so they're reachable from every page.
const NAV_LEGAL = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms of Service', href: '/terms-of-service' },
]

const YEAR = new Date().getFullYear()

const Footer = () => {
  const scopeRef = useSectionReveal({
    start: 'top 92%',
    borderDuration: 0.6,
    wordDuration: 0.55,
    wordStagger: 0.02,
    overlap: 0.3,
  })

  return (
    <footer
      ref={scopeRef}
      className="relative isolate overflow-hidden border-t border-muted bg-background pb-10 pt-24"
    >
      <div className="relative mx-auto max-w-[1600px] px-6 lg:px-10">
        {/* Big wordmark up top acts as a visual signature. */}
        <div className="grid grid-cols-12 gap-8 border-b border-muted pb-16">
          <div className="col-span-12 lg:col-span-8">
            {/* AGENCY 1776 lockup — light/dark variant swapped by theme */}
            <Link
              href="/"
              data-cursor="link"
              aria-label={`${AGENCY.brand} — home`}
              className="inline-flex items-center"
            >
              <img
                src="/logo-agency.png"
                alt={AGENCY.brand}
                className="logo-light h-12 w-auto"
              />
              <img
                src="/logo-agency-dark.png"
                alt={AGENCY.brand}
                className="logo-dark h-12 w-auto"
              />
            </Link>

            <div className="mt-8 flex items-center gap-3 text-[0.82rem] uppercase tracking-[0.28em] text-foreground/65">
              <span
                data-reveal="icon"
                aria-hidden="true"
                className="h-px w-10 bg-accent"
              />
              <span>Sign-off / 07</span>
            </div>

            <p className="font-display mt-8 text-[clamp(3rem,7.5vw,6.5rem)] leading-[0.9] tracking-[0.005em]">
              <SplitText mode="words">{AGENCY.brand}</SplitText>
            </p>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-foreground/60">
              <SplitText mode="block">
                Digital foundations for campaigns that need to move.
              </SplitText>
            </p>
          </div>

          <div className="col-span-12 lg:col-span-4">
            <div className="relative border border-muted p-8">
              <RevealBorder tone="accent" />
              <div className="flex items-start justify-between">
                <Icon
                  name="star"
                  className="h-10 w-10 text-accent"
                  strokeWidth={1.25}
                />
                <span
                  data-reveal="icon"
                  aria-hidden="true"
                  className="block h-2 w-2 bg-accent"
                />
              </div>
              <div
                data-reveal="icon"
                aria-hidden="true"
                className="font-display mt-8 text-6xl leading-none tracking-[0.005em] text-foreground/90"
              >
                17<span className="text-accent">76</span>
              </div>
              <div className="mt-6 flex items-center gap-3 border-t border-muted pt-4 text-[0.75rem] uppercase tracking-[0.28em] text-foreground/65">
                <Icon name="scroll" className="h-4 w-4" strokeWidth={1.5} />
                <span>Est. 2025</span>
              </div>
            </div>
          </div>
        </div>

        {/* Link groups — hairline three-column set. */}
        <div className="grid grid-cols-1 gap-10 py-16 md:grid-cols-3 lg:gap-16">
          <FooterGroup
            title="Company"
            index="A"
            items={NAV_PRIMARY}
          />
          <FooterGroup
            title="Explore"
            index="B"
            items={NAV_SECONDARY}
          />
          <div>
            <FooterGroupHeader title="Get in touch" index="C" />
            <ul className="mt-6 space-y-3">
              {/* Every link routes to a real page. `Back to top` is a scroll
                  action, not a route — rendered as a `<button>` so no hash
                  href ever ships to the DOM. `See the process` used to point
                  at the removed home `#process` anchor and had no
                  page destination, so it was dropped rather than left as a
                  dead link. */}
              <li>
                <FooterLink href="/contact" label="Start the conversation" />
              </li>
              <li>
                <FooterLink onClick={scrollToTop} label="Back to the top" />
              </li>
            </ul>
          </div>
        </div>

        {/* Meta rail — copyright, legal links, year plate, brand mark. */}
        <div className="flex flex-col gap-6 border-t border-muted pt-8 text-[0.78rem] uppercase tracking-[0.28em] text-foreground/65 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <span
              data-reveal="icon"
              aria-hidden="true"
              className="block h-2 w-[3px] bg-accent"
            />
            <span>© {YEAR} {AGENCY.brand}. All rights reserved.</span>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            {/* Legal pages — required links, always routed to real pages. */}
            <nav
              aria-label="Legal"
              className="flex flex-wrap items-center gap-x-6 gap-y-3"
            >
              {NAV_LEGAL.map((item) => (
                <MetaLink key={item.label} href={item.href} label={item.label} />
              ))}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  )
}

/*
 * Compact link for the meta rail — uppercase, tracked, with an accent
 * underline that swipes in on hover. Matches the rail's typographic scale
 * rather than the larger body-size FooterLink used in the column groups.
 */
const MetaLink = ({ href, label }) => (
  <Link
    href={href}
    data-cursor="link"
    className="group relative inline-block text-foreground/65 transition-colors hover:text-foreground"
  >
    {label}
    <span
      aria-hidden="true"
      className="pointer-events-none absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-500 ease-out group-hover:scale-x-100"
    />
  </Link>
)

const FooterGroupHeader = ({ title, index }) => (
  <div className="flex items-center gap-3 text-[0.75rem] uppercase tracking-[0.28em] text-foreground/65">
    <span className="border border-muted px-2 py-0.5 font-mono text-[0.75rem] text-foreground/70">
      {index}
    </span>
    <span
      data-reveal="icon"
      aria-hidden="true"
      className="h-px w-8 bg-muted"
    />
    <span>{title}</span>
  </div>
)

const FooterGroup = ({ title, index, items }) => (
  <div>
    <FooterGroupHeader title={title} index={index} />
    <ul className="mt-6 space-y-3">
      {items.map((item) => (
        <li key={item.label}>
          <FooterLink href={item.href} label={item.label} />
        </li>
      ))}
    </ul>
  </div>
)

/*
 * Renders as an `<a>` when a route href is provided, or a `<button>` for
 * on-page scroll actions (e.g. Back to top). No component ever ships a
 * hash href — see the site-wide navigation audit.
 */
const FooterLink = ({ href, label, onClick }) => {
  const pathname = usePathname()
  // Active when the link's route matches the current page. Home ("/") only
  // matches exactly; every other route also matches its nested sub-paths
  // (e.g. /portfolio active on /portfolio/some-slug). The scroll button (no href) is
  // never marked active.
  const isActive = href
    ? href === '/'
      ? pathname === '/'
      : pathname === href || pathname?.startsWith(`${href}/`)
    : false

  const className = cn(
    'group inline-flex items-baseline text-left text-base font-medium transition-colors',
    isActive
      ? 'text-accent'
      : 'text-foreground/80 hover:text-foreground',
  )

  const content = (
    <span className="inline-block leading-[1.15]">{label}</span>
  )

  if (href) {
    return (
      <Link
        href={href}
        data-cursor="link"
        aria-current={isActive ? 'page' : undefined}
        className={className}
      >
        {content}
      </Link>
    )
  }
  return (
    <button
      type="button"
      onClick={onClick}
      data-cursor="button"
      className={className}
    >
      {content}
    </button>
  )
}

export default Footer
