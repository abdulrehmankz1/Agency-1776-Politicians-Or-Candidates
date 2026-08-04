import Footer from '@/components/footer'
import ScrollToForm from '@/components/scroll-to-form'
import ContactForm from '@/sections/contact/form'
import ContactHero from '@/sections/contact/hero'

export const metadata = {
  title: 'Contact — Agency 1776',
  description:
    'Tell us about the candidate, race, timeline, and what needs to launch. Agency 1776 will help identify the right next step for your campaign.',
}

const ContactPage = () => {
  return (
    <main className="relative">
      {/* Reads `?to=form` and scrolls to the inquiry form (smoother-aware). */}
      <ScrollToForm />
      <ContactHero />
      <ContactForm />
      <Footer />
    </main>
  )
}

export default ContactPage
