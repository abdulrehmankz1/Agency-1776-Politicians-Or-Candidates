'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'motion/react'

import CtaButton from '@/components/cta-button'
import ThemeToggle from '@/components/theme-toggle'
import { AGENCY, HERO } from '@/constants/campaign'
import { gsap, ScrollTrigger } from '@/utils/register-gsap'
import { cn } from '@/utils/cn'

// Animated variant of Next.js Link so the mobile menu can keep its staggered
// slide-in reveal while still using client-side navigation.
const MotionLink = motion.create(Link)

/*
 * `id` is the DOM id used to derive scroll-active state on the home page.
 * `href` is prefixed with `/` so section links resolve back to the home page
 * from `/about` (or any future route). The About link is a plain page link.
 */
/*
 * `Solutions` now points to the dedicated Solutions page. Its `id` is unique
 * so it never gets confused with the home page's `#solutions` section (still
 * scrollable on home; just no direct nav link).
 */
/*
 * Every nav item points to a real page route. Legacy home-section anchors
 * (Forward / Reality / Process → `/#foo`) were removed as part of the
 * site-wide navigation audit; those sections still exist on the home page
 * and are reachable by scrolling, but they are no longer exposed as nav
 * items (which would have hash-routed and violated the "page routes only"
 * rule).
 */
const LINKS = [
  { id: 'about', label: 'About', href: '/about' },
  { id: 'solutions-page', label: 'Solutions', href: '/solutions' },
  { id: 'portfolio-page', label: 'Portfolio', href: '/portfolio' },
  { id: 'pricing-page', label: 'Pricing', href: '/pricing' },
  { id: 'contact-page', label: 'Contact', href: '/contact' },
]

// The header CTA is pulled from the home hero content, which now uses page
// routes exclusively; this normaliser is retained only as a safety net.
const normaliseCtaHref = (href) =>
  href && href.startsWith('#') ? `/contact` : href

// A nav link is active when its route matches the current page. Home ("/")
// only matches exactly; every other route also matches its nested sub-paths
// (e.g. /portfolio stays active on /portfolio/some-slug).
const isRouteActive = (href, pathname) =>
  href === '/'
    ? pathname === '/'
    : pathname === href || (pathname?.startsWith(`${href}/`) ?? false)

/*
 * Fixed primary navbar. Sits directly below the TopBrandBar.
 *
 * Desktop (lg+):
 *   - Full inline nav row (unchanged behaviour) with hover mask, active
 *     ScrollTrigger dot, theme toggle, primary CTA.
 *
 * Below lg (mobile + tablet):
 *   - Nav labels collapse into a hamburger button.
 *   - Hamburger opens a fullscreen overlay drawer with all links, theme
 *     toggle, and the primary CTA at the bottom.
 *   - Drawer opens/closes via motion/react — same animation stack the rest
 *     of the site uses.
 *   - Body scroll + ScrollSmoother paused while open.
 *   - `Escape` closes the drawer; opening focuses the first link; closing
 *     returns focus to the hamburger button.
 *   - Clicking any drawer link closes the drawer automatically.
 */

const Navbar = () => {
  const rootRef = useRef(null)
  const hamburgerRef = useRef(null)
  const pathname = usePathname()
  const [activeId, setActiveId] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const heroCta = HERO.ctas[0]
  const normalisedCtaHref = normaliseCtaHref(heroCta.href)

  useLayoutEffect(() => {
    if (!rootRef.current) return undefined

    const triggers = LINKS.map((link) => {
      const section = document.getElementById(link.id)
      if (!section) return null
      return ScrollTrigger.create({
        trigger: section,
        start: 'top 40%',
        end: 'bottom 40%',
        onEnter: () => setActiveId(link.id),
        onEnterBack: () => setActiveId(link.id),
      })
    }).filter(Boolean)

    const hero = document.getElementById('home')
    if (hero) {
      triggers.push(
        ScrollTrigger.create({
          trigger: hero,
          start: 'top top',
          end: 'bottom 60%',
          onEnter: () => setActiveId(null),
          onEnterBack: () => setActiveId(null),
        }),
      )
    }

    return () => triggers.forEach((t) => t.kill())
  }, [])

  /*
   * Body / ScrollSmoother scroll lock. When the drawer opens we freeze both
   * the native document scroll (so mobile Safari doesn't overscroll the page
   * behind the overlay) AND the ScrollSmoother instance (so wheel events
   * captured on `#smooth-wrapper` don't push the virtual scroll while the
   * drawer covers the viewport). We restore on close and on unmount.
   */
  useEffect(() => {
    const smoother =
      typeof window !== 'undefined' &&
      window.ScrollSmoother &&
      window.ScrollSmoother.get &&
      window.ScrollSmoother.get()
    if (menuOpen) {
      document.documentElement.style.overflow = 'hidden'
      document.body.style.overflow = 'hidden'
      if (smoother && smoother.paused) smoother.paused(true)
    } else {
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
      if (smoother && smoother.paused) smoother.paused(false)
    }
    return () => {
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
      if (smoother && smoother.paused) smoother.paused(false)
    }
  }, [menuOpen])

  // ESC to close. Both listeners registered with capture so nothing else in
  // the pipeline (ScrollSmoother's Observer, page-level handlers, etc.) can
  // swallow Escape before it reaches us.
  useEffect(() => {
    if (!menuOpen) return undefined
    const handler = (event) => {
      if (event.key === 'Escape' || event.key === 'Esc') {
        setMenuOpen(false)
      }
    }
    window.addEventListener('keydown', handler, true)
    document.addEventListener('keydown', handler, true)
    return () => {
      window.removeEventListener('keydown', handler, true)
      document.removeEventListener('keydown', handler, true)
    }
  }, [menuOpen])

  // Close if the viewport widens past `lg` while the drawer is open — the
  // desktop nav takes over and a stale drawer would double-render.
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined
    const mq = window.matchMedia('(min-width: 1024px)')
    const handle = () => {
      if (mq.matches) setMenuOpen(false)
    }
    mq.addEventListener('change', handle)
    return () => mq.removeEventListener('change', handle)
  }, [])

  const closeMenu = () => {
    setMenuOpen(false)
    // Return focus to the hamburger button — no visible flicker because we
    // do it in the same tick the exit animation starts.
    hamburgerRef.current?.focus()
  }

  return (
    <>
      <div
        ref={rootRef}
        className="fixed inset-x-0 top-10 z-50 border-b border-muted/50 bg-background/80 backdrop-blur-md"
      >
        <div className="mx-auto flex h-[68px] max-w-[1600px] items-center px-6 lg:px-10">
          {/* Brand mark — AGENCY 1776 lockup, light/dark variant swapped by theme */}
          <Link
            href="/"
            className="group flex min-w-0 shrink items-center"
            aria-label={`${AGENCY.brand} — home`}
            data-cursor="link"
          >
            <img
              src="/logo-agency.png"
              alt={AGENCY.brand}
              className="logo-light h-9 w-auto md:h-10"
            />
            <img
              src="/logo-agency-dark.png"
              alt={AGENCY.brand}
              className="logo-dark h-9 w-auto md:h-10"
            />
          </Link>

          {/* Desktop inline nav (lg+) — unchanged. */}
          <nav
            aria-label="Primary"
            className="ml-auto mr-auto hidden items-center gap-10 xl:gap-14 lg:flex"
          >
            {LINKS.map((link) => (
              <NavLink
                key={link.id}
                label={link.label}
                href={link.href}
                active={isRouteActive(link.href, pathname) || activeId === link.id}
              />
            ))}
          </nav>

          {/* Right cluster — theme toggle, CTA (hidden on very small viewports
              so the hamburger + toggle + brand still fit), hamburger (< lg). */}
          <div className="ml-auto flex items-center gap-3 sm:gap-4 lg:ml-0">
            <ThemeToggle />

            <CtaButton
              href={normalisedCtaHref}
              variant="primary"
              className="!hidden !py-3 !px-4 text-xs sm:!inline-flex sm:!px-5 lg:text-[0.95rem]"
            >
              {heroCta.label}
            </CtaButton>

            <button
              ref={hamburgerRef}
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="primary-mobile-menu"
              data-cursor="button"
              className="relative -mr-1 flex h-11 w-11 items-center justify-center lg:hidden"
            >
              <HamburgerIcon open={menuOpen} />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <MobileMenu
            heroCta={heroCta}
            heroCtaHref={normalisedCtaHref}
            activeId={activeId}
            pathname={pathname}
            onClose={closeMenu}
          />
        )}
      </AnimatePresence>
    </>
  )
}

/*
 * Two hairline bars that morph into an X on open. Rectangular language, no
 * circles — matches the site's design rules.
 */
const HamburgerIcon = ({ open }) => (
  <span
    aria-hidden="true"
    className="relative flex h-5 w-6 flex-col items-center justify-center"
  >
    <motion.span
      className="absolute h-[2px] w-6 bg-foreground"
      animate={{ y: open ? 0 : -5, rotate: open ? 45 : 0 }}
      transition={{ duration: 0.28, ease: [0.85, 0, 0, 1] }}
    />
    <motion.span
      className="absolute h-[2px] w-6 bg-foreground"
      animate={{
        y: open ? 0 : 5,
        rotate: open ? -45 : 0,
        opacity: 1,
      }}
      transition={{ duration: 0.28, ease: [0.85, 0, 0, 1] }}
    />
  </span>
)

/*
 * Full-viewport overlay drawer. Fades in with a slight vertical rise; each
 * nav link staggers in on its own delay so the reveal feels intentional. The
 * drawer's own scroll is enabled so long lists still work on landscape phones.
 */
const MobileMenu = ({ heroCta, heroCtaHref, activeId, pathname, onClose }) => {
  const firstLinkRef = useRef(null)

  useEffect(() => {
    // Focus first link once the mount tick settles.
    const id = requestAnimationFrame(() => {
      firstLinkRef.current?.focus()
    })
    return () => cancelAnimationFrame(id)
  }, [])

  return (
    <motion.div
      id="primary-mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Primary navigation"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: [0.85, 0, 0, 1] }}
      className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-background/95 backdrop-blur-xl lg:hidden"
    >
      {/* Top row inside drawer — brand mark + close button.
          Sits BELOW the TopBrandBar (10 px tall) so we push down by that
          amount and by the navbar height so nothing double-stacks. */}
      <div className="flex items-center justify-between px-6 pb-8 pt-[7rem]">
        <span className="flex items-center">
          <img
            src="/logo-agency.png"
            alt={AGENCY.brand}
            className="logo-light h-9 w-auto"
          />
          <img
            src="/logo-agency-dark.png"
            alt={AGENCY.brand}
            className="logo-dark h-9 w-auto"
          />
        </span>
      </div>

      {/* Nav labels — big display type, one line per link, staggered reveal. */}
      <nav
        aria-label="Primary mobile"
        className="flex flex-1 flex-col justify-center gap-1 px-6"
      >
        {LINKS.map((link, i) => {
          const active =
            isRouteActive(link.href, pathname) || activeId === link.id
          return (
          <MotionLink
            key={link.id}
            ref={i === 0 ? firstLinkRef : null}
            href={link.href}
            onClick={onClose}
            data-cursor="link"
            initial={{ opacity: 0, x: -18 }}
            animate={{ opacity: 1, x: 0 }}
            /*
             * No `exit` prop here — otherwise AnimatePresence would wait for
             * every nested link exit to finish before unmounting the drawer,
             * which stretches close to nearly a second with the enter stagger.
             * Skipping child exits lets the parent's 0.25s opacity fade drive
             * the whole unmount cleanly.
             */
            transition={{
              delay: 0.05 + i * 0.05,
              duration: 0.4,
              ease: [0.85, 0, 0, 1],
            }}
            className={cn(
              'font-display group flex items-center gap-5 border-b border-muted/40 py-4 uppercase leading-none tracking-[0.02em] transition-colors',
              'text-[clamp(2.25rem,8vw,3.75rem)]',
              active
                ? 'text-accent'
                : 'text-foreground hover:text-accent',
            )}
          >
            <span className="font-mono text-[0.75rem] tracking-[0.28em] text-foreground/65">
              0{i + 1}
            </span>
            <span>{link.label}</span>
            <span
              aria-hidden="true"
              className={cn(
                'ml-auto h-px w-8 origin-right transition-all duration-500',
                active
                  ? 'scale-x-100 bg-accent'
                  : 'scale-x-0 bg-accent group-hover:scale-x-100',
              )}
            />
          </MotionLink>
          )
        })}
      </nav>

      {/* Footer row — CTA. Border-top matches the desktop chrome. */}
      <div className="flex flex-col gap-4 border-t border-muted/60 px-6 pb-10 pt-6">
        <CtaButton
          href={heroCtaHref}
          variant="primary"
          className="w-full !justify-center !py-4 text-sm"
          onClick={onClose}
        >
          {heroCta.label}
        </CtaButton>
      </div>
    </motion.div>
  )
}

const NavLink = ({ label, href, active }) => {
  const anchorRef = useRef(null)

  const handleEnter = () => {
    const el = anchorRef.current
    if (!el) return
    const top = el.querySelector('[data-nav="top"]')
    const bot = el.querySelector('[data-nav="bot"]')
    const glow = el.querySelector('[data-nav="glow"]')
    gsap.to(top, {
      yPercent: -110,
      duration: 0.45,
      ease: 'expo.out',
    })
    gsap.to(bot, {
      yPercent: -100,
      duration: 0.45,
      ease: 'expo.out',
    })
    gsap.to(glow, {
      opacity: 1,
      scaleX: 1,
      duration: 0.5,
      ease: 'power2.out',
    })
  }

  const handleLeave = () => {
    const el = anchorRef.current
    if (!el) return
    const top = el.querySelector('[data-nav="top"]')
    const bot = el.querySelector('[data-nav="bot"]')
    const glow = el.querySelector('[data-nav="glow"]')
    gsap.to(top, {
      yPercent: 0,
      duration: 0.5,
      ease: 'expo.out',
    })
    gsap.to(bot, {
      yPercent: 0,
      duration: 0.5,
      ease: 'expo.out',
    })
    gsap.to(glow, {
      opacity: 0,
      scaleX: 0.4,
      duration: 0.5,
      ease: 'power2.out',
    })
  }

  return (
    <Link
      ref={anchorRef}
      href={href}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onFocus={handleEnter}
      onBlur={handleLeave}
      data-cursor="link"
      className="group relative flex items-center gap-2 py-1"
    >
      {/* active marker — square accent, matches the site's rectangular language */}
      <span
        aria-hidden="true"
        className={cn(
          'block h-2 w-[3px] transition-all duration-500',
          active
            ? 'scale-100 bg-accent shadow-[0_0_10px_var(--color-accent)]'
            : 'scale-0 bg-transparent',
        )}
      />

      {/* text mask */}
      <span className="font-display relative block overflow-hidden text-base uppercase leading-none tracking-[0.2em]">
        {/* subtle underline accent that swipes in on hover — no blur, no circle */}
        <span
          data-nav="glow"
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -bottom-1 -z-10 h-px bg-accent opacity-0 will-change-transform"
          style={{ transform: 'scaleX(0.4)', transformOrigin: 'left center' }}
        />
        <span
          data-nav="top"
          className={cn(
            'block will-change-transform',
            active ? 'text-foreground' : 'text-foreground/90',
          )}
        >
          {label}
        </span>
        <span
          data-nav="bot"
          aria-hidden="true"
          className="absolute inset-0 block translate-y-full text-accent will-change-transform"
        >
          {label}
        </span>
      </span>
    </Link>
  )
}

export default Navbar
