import Footer from '@/components/footer'
import Hero from '@/sections/work/hero'
import Showcase from '@/sections/work/showcase'

export const metadata = {
  title: 'Work — Agency 1776',
  description:
    'Agency 1776 supports American candidates, political teams, and movements that need a serious digital presence built around message, trust, and action.',
}

const WorkPage = () => {
  return (
    <main className="relative">
      <Hero />
      <Showcase />
      <Footer />
    </main>
  )
}

export default WorkPage
