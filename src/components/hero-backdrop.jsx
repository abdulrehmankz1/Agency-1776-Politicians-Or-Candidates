'use client'

import dynamic from 'next/dynamic'

import { useIsDesktop } from '@/hooks/use-is-desktop'

/*
 * Desktop-only, lazily-loaded wrapper for the Antigravity hero field. Like
 * HeroBeams, Antigravity is a three.js / react-three-fiber WebGL effect — the
 * heaviest asset on the internal-page heroes. Loading it through `next/dynamic`
 * (client-only) puts three.js in its own chunk that is fetched *only when the
 * effect actually mounts* — i.e. on desktop. Phones and tablets render `null`
 * here, never download three.js, and never run the WebGL loop. The heroes read
 * cleanly on their solid backgrounds without it.
 */
const Antigravity = dynamic(() => import('@/components/antigravity'), {
  ssr: false,
})

const HeroBackdrop = () => {
  const isDesktop = useIsDesktop()
  return isDesktop ? <Antigravity /> : null
}

export default HeroBackdrop
