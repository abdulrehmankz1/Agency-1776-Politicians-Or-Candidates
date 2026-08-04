import LegalPage from '@/components/legal-page'
import { PRIVACY_POLICY } from '@/constants/legal'

export const metadata = {
  title: 'Privacy Policy — Agency 1776',
  description:
    'How Agency 1776 collects, uses, and protects the information you share through our website and inquiry form.',
}

const PrivacyPage = () => <LegalPage doc={PRIVACY_POLICY} />

export default PrivacyPage
