import { Bebas_Neue, Space_Grotesk } from 'next/font/google'
import Script from 'next/script'

import CustomCursor from '@/components/custom-cursor'
import Navbar from '@/components/navbar'
import SmoothScrollProvider from '@/components/smooth-scroll-provider'
import TopBrandBar from '@/components/top-brand-bar'

import './globals.css'

const GA_MEASUREMENT_ID = 'G-5SXMYSM52X'

/*
 * Type system:
 *   - Bebas Neue drives every display surface — headings, CTA labels, brand
 *     wordmarks, big numeric plates. Ships in one weight (400); Bebas is
 *     naturally condensed and reads as "bold" without any weight utility.
 *   - Space Grotesk drives every body surface — paragraphs, nav links, form
 *     copy, captions, monospace-adjacent labels. Full 300–700 range.
 */
const bebas = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-bebas',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-space',
})

export const metadata = {
  title: 'Agency 1776',
  description: 'Premium campaign sites for politicians and candidates.',
}

/*
 * Runs before React hydrates so `data-theme` on <html> is already correct on
 * first paint — no light-flash on refresh, no hydration mismatch. Falls back
 * to `dark` if localStorage is unavailable or holds an unknown value.
 */
const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t='dark';}document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`

const RootLayout = ({ children }) => {
  return (
    <html
      lang="en"
      className={`${bebas.variable} ${spaceGrotesk.variable}`}
      data-theme="dark"
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }}
        />
      </head>
      <body>
        {/* Fixed chrome — MUST live outside the smooth-scroll wrapper. */}
        <CustomCursor />
        <TopBrandBar />
        <Navbar />

        <SmoothScrollProvider>{children}</SmoothScrollProvider>

        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
      </body>
    </html>
  )
}

export default RootLayout
