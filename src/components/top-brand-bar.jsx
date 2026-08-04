'use client'

import { useLayoutEffect, useRef } from 'react'

import { gsap } from '@/utils/register-gsap'
import { cn } from '@/utils/cn'

/*
 * Theme-locked. This bar is a fixed brand chrome element that must read
 * identically on light and dark modes, so every colour is a hard literal
 * (not a --color-* token). The rest of the site still swaps freely.
 */
const TOPBAR_BG          = '#050505'
const TOPBAR_BG_95       = 'rgba(5,5,5,0.95)'
const TOPBAR_BORDER      = 'rgba(58,58,58,0.4)'
const TOPBAR_FG          = '#f0ede6'
const TOPBAR_FG_85       = 'rgba(240,237,230,0.85)'
const TOPBAR_FG_50       = 'rgba(240,237,230,0.5)'
const TOPBAR_FG_30       = 'rgba(240,237,230,0.3)'
const TOPBAR_ACCENT      = '#bf0a30'
const TOPBAR_ACCENT_60   = 'rgba(191,10,48,0.6)'
const TOPBAR_ACCENT_06   = 'rgba(191,10,48,0.06)'

const TABS = [
  { id: 'business',    label: 'Business',                 active: false, href: 'https://agency-1776-business.vercel.app' },
  { id: 'politicians', label: 'Politicians or Candidates', active: true,  href: 'https://agency-1776-politicians-or-candidat.vercel.app/' },
  { id: 'nonprofit',   label: 'Nonprofit',                active: false, href: 'https://agency-1776-nonprofit.vercel.app' },
]

const TopBrandBar = () => {
  const scopeRef = useRef(null)

  useLayoutEffect(() => {
    if (!scopeRef.current) return
    const scope = scopeRef.current
    const ctx = gsap.context(() => {
      const inactive = scope.querySelectorAll("[data-topbar-tab='inactive']")
      inactive.forEach((el) => {
        const hoverIn  = () => gsap.to(el, { color: TOPBAR_FG,    duration: 0.35, ease: 'power2.out' })
        const hoverOut = () => gsap.to(el, { color: TOPBAR_FG_85, duration: 0.35, ease: 'power2.out' })
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
      className="fixed inset-x-0 top-0 z-[60] backdrop-blur-md"
      style={{
        backgroundColor: TOPBAR_BG_95,
        borderBottom: `1px solid ${TOPBAR_BORDER}`,
        colorScheme: 'dark',
      }}
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-4 py-2 md:px-12">
        <div className="flex min-w-0 flex-1 items-center gap-1 overflow-x-auto no-scrollbar sm:gap-2 lg:flex-none lg:gap-4">
          {TABS.map((t) => (
            <TopBarTab key={t.id} tab={t} />
          ))}
        </div>

        <div
          className="hidden shrink-0 items-center gap-4 whitespace-nowrap text-[10px] uppercase tracking-[0.28em] lg:flex"
          style={{ color: TOPBAR_FG_50 }}
        >
          <span className="inline-flex items-center gap-2">
            <span
              className="inline-block h-1 w-1 rounded-full"
              style={{ backgroundColor: TOPBAR_ACCENT }}
            />
            Politicians Division
          </span>
          <span style={{ color: TOPBAR_FG_30 }}>/</span>
          <span>Est. MMXXIV</span>
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
      data-topbar-tab={isActive ? 'active' : 'inactive'}
      data-cursor={tab.href ? 'link' : 'default'}
      aria-current={isActive ? 'page' : undefined}
      role={tab.href ? undefined : 'presentation'}
      className={cn(
        'relative inline-flex select-none items-center whitespace-nowrap px-3 py-2 text-[12px] uppercase tracking-[0.28em] transition-opacity md:px-5 md:text-[13px]',
        !isActive && !tab.href && 'cursor-not-allowed',
        tab.href ? 'cursor-pointer' : ''
      )}
      style={{ color: isActive ? TOPBAR_FG : TOPBAR_FG_85 }}
      title={isActive || tab.href ? undefined : 'Coming soon'}
    >
      {isActive && (
        <span
          aria-hidden
          className="chamfer chamfer-xs absolute inset-y-1 left-0 right-0 -z-0"
          style={{
            '--chamfer-border-color': TOPBAR_ACCENT_60,
            '--chamfer-bg': TOPBAR_ACCENT_06,
          }}
        />
      )}
      <span className="relative z-10">{tab.label}</span>
    </Wrapper>
  )
}

export default TopBrandBar
