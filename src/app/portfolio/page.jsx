import Footer from '@/components/footer'
import Hero from '@/sections/portfolio/hero'
import Showcase from '@/sections/portfolio/showcase'

export const metadata = {
  title: 'Portfolio — Agency 1776',
  description:
    'Agency 1776 supports American candidates, political teams, and movements that need a serious digital presence built around message, trust, and action.',
}

const PortfolioPage = () => {
  return (
    <main className="relative">
      <Hero />
      <Showcase />
      <Footer />
    </main>
  )
}

export default PortfolioPage
