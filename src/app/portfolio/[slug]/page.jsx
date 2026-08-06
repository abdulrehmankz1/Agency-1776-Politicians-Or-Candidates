import Link from 'next/link'

import CampaignPreview from '@/components/campaign-preview'
import CtaButton from '@/components/cta-button'
import Footer from '@/components/footer'
import Icon from '@/components/icon'
import RevealBorder from '@/components/reveal-border'
import { AGENCY } from '@/constants/campaign'

export async function generateMetadata({ params }) {
  const { slug } = await params
  return {
    title: `${slug} — Agency 1776`,
    description: 'Case study coming soon.',
  }
}

/*
 * Placeholder Portfolio detail page. Renders whenever a `/portfolio/[slug]`
 * link is clicked. Deliberately minimal chrome — no invented client
 * case-study copy.
 */
const PortfolioDetailPage = async ({ params }) => {
  const { slug } = await params

  return (
    <main className="relative">
      <section className="relative isolate flex min-h-[100dvh] flex-col overflow-hidden bg-background pt-[7rem]">
        <div className="relative mx-auto flex w-full max-w-[1600px] flex-1 flex-col justify-center px-6 pb-20 lg:px-10">
          <div className="grid grid-cols-12 gap-10 lg:gap-14">
            <div className="col-span-12 lg:col-span-7">
              <div className="flex items-center gap-3 text-[0.82rem] uppercase tracking-[0.28em] text-foreground/60">
                <Link
                  href="/portfolio"
                  className="group inline-flex items-center gap-2"
                  data-cursor="link"
                >
                  <Icon
                    name="arrow"
                    className="h-3.5 w-3.5 rotate-180 text-accent"
                    strokeWidth={2}
                  />
                  <span>Back to Portfolio</span>
                </Link>
                <span
                  className="h-px w-8 bg-muted"
                  aria-hidden="true"
                />
                <span className="font-mono text-foreground/70">{slug}</span>
              </div>

              <h1 className="mt-10 text-balance text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] tracking-[0.005em]">
                Case study coming soon.
              </h1>

              <p className="mt-8 max-w-xl text-lg leading-relaxed text-foreground/70 lg:text-xl">
                Detailed campaign case-study content will land here shortly.
                In the meantime, {AGENCY.brand} is available to talk about the
                work.
              </p>

              <div className="mt-12 flex flex-wrap items-center gap-4">
                <CtaButton href="/contact" variant="primary">
                  CONTACT US
                </CtaButton>
                <CtaButton href="/portfolio" variant="ghost">
                  BACK TO PORTFOLIO
                </CtaButton>
              </div>
            </div>

            <aside
              aria-hidden="true"
              className="col-span-12 lg:col-span-5"
            >
              <div className="relative aspect-[4/5] max-h-[70vh] w-full overflow-hidden bg-surface">
                <RevealBorder tone="accent" />
                <CampaignPreview variant="c" className="absolute inset-0" />
              </div>
            </aside>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

export default PortfolioDetailPage
