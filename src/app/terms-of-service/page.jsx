import LegalPage from '@/components/legal-page'
import { TERMS_OF_SERVICE } from '@/constants/legal'

export const metadata = {
  title: 'Terms of Service — Agency 1776',
  description:
    'The terms that govern your use of the Agency 1776 website and the services we provide.',
}

const TermsPage = () => <LegalPage doc={TERMS_OF_SERVICE} />

export default TermsPage
