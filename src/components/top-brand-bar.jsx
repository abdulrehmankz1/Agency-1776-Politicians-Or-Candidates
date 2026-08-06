'use client'

import { useLayoutEffect, useRef } from 'react'

import { gsap } from '@/utils/register-gsap'
import { cn } from '@/utils/cn'

/*
 * Theme-locked. This bar is a fixed brand chrome element that must read
 * identically on light and dark modes, so every colour is a hard literal
 * (not a --color-* token). Mirrors the Business site's TopBar exactly so
 * the shared division switcher looks the same across every 1776 site.
 */
const TOPBAR_BG      = 'rgba(0, 0, 0, 0.95)'
const TOPBAR_BORDER  = 'rgba(74, 74, 74, 0.4)'
const TOPBAR_WHITE   = '#ffffff'   // division tabs — full white for readability
const TOPBAR_ACCENT  = '#bf0a30'   // brand crimson (hover feedback)

const TABS = [
  { id: 'business',    label: 'Business',                  active: false, href: 'https://agency-1776-business.vercel.app/' },
  { id: 'politicians', label: 'Politicians or Candidates', active: true,  href: 'https://agency-1776-politicians-or-candidat.vercel.app/' },
  { id: 'nonprofit',   label: 'Nonprofit',                 active: false, href: 'https://agency-1776-nonprofit.vercel.app/' },
]

const TopBrandBar = () => {
  const scopeRef = useRef(null)

  useLayoutEffect(() => {
    if (!scopeRef.current) return
    const scope = scopeRef.current
    const ctx = gsap.context(() => {
      const inactive = scope.querySelectorAll("[data-topbar-tab='inactive']")
      inactive.forEach((el) => {
        const hoverIn  = () => gsap.to(el, { color: TOPBAR_ACCENT, duration: 0.35, ease: 'power2.out' })
        const hoverOut = () => gsap.to(el, { color: TOPBAR_WHITE,  duration: 0.35, ease: 'power2.out' })
        el.addEventListener('mouseenter', hoverIn)
        el.addEventListener('mouseleave', hoverOut)
      })
    }, scope)
    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={scopeRef}
      data-cursor="link"
      data-topbrandbar
      className="fixed inset-x-0 top-0 z-[60] border-b backdrop-blur-md"
      style={{
        backgroundColor: TOPBAR_BG,
        borderBottomColor: TOPBAR_BORDER,
        colorScheme: 'dark',
      }}
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-4 py-2 md:px-12">
        <div className="flex min-w-0 flex-1 items-center gap-1 overflow-x-auto no-scrollbar sm:gap-2 lg:flex-none lg:gap-4">
          {TABS.map((t) => (
            <TopBarTab key={t.id} tab={t} />
          ))}
        </div>
      </div>
    </div>
  )
}

const TopBarTab = ({ tab }) => {
  const isActive = tab.active
  const Wrapper = tab.href ? 'a' : 'span'

  return (
    <Wrapper
      href={tab.href || undefined}
      // Division sites are separate deployments — open them in a new tab
      // rather than replacing the current one.
      target={tab.href ? '_blank' : undefined}
      rel={tab.href ? 'noopener noreferrer' : undefined}
      data-topbar-tab={isActive ? 'active' : 'inactive'}
      data-cursor={tab.href ? 'link' : 'default'}
      aria-current={isActive ? 'page' : undefined}
      role={tab.href ? undefined : 'presentation'}
      className={cn(
        'relative inline-flex select-none items-center whitespace-nowrap px-3 py-2 text-[13px] font-semibold uppercase tracking-[0.2em] md:px-5 md:text-sm',
        tab.href ? 'cursor-pointer' : 'cursor-not-allowed'
      )}
      style={{ color: TOPBAR_WHITE }}
      title={!isActive && !tab.href ? 'Coming soon' : undefined}
    >
      {isActive && (
        <span
          aria-hidden
          className="chamfer chamfer-xs absolute inset-y-1 left-0 right-0 -z-0"
          style={{
            '--chamfer-border-color': 'rgba(191, 10, 48, 0.6)',
            '--chamfer-bg': 'rgba(191, 10, 48, 0.06)',
          }}
        />
      )}
      <span className="relative z-10">{tab.label}</span>
    </Wrapper>
  )
}

export default TopBrandBar
