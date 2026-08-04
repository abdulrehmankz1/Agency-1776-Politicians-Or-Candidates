/*
 * Legal page content — Privacy Policy and Terms of Service.
 *
 * These are standard, good-faith templates drafted for Agency 1776 (a brand of
 * Ops 1776 Group of Companies) so the site is not shipped with the required
 * legal pages missing. They are written around the data the site actually
 * collects — the /contact inquiry form (name, email, phone, campaign details,
 * message) — and the way the site operates.
 *
 * BEFORE PUBLISHING: a few items are jurisdiction / business decisions that
 * only the agency can confirm. They are marked with `[[ ... ]]` so they are
 * easy to find and are rendered on-page as a visible review flag. Replace them
 * and have counsel review the final copy:
 *   - `[[STATE]]`           governing-law state
 *   - `[[PRIVACY EMAIL]]`   a dedicated inbox for privacy / legal requests
 * The pages otherwise route people to the /contact form, which is live.
 *
 * Each document renders verbatim from this file. `body` entries are paragraphs;
 * a `list` renders as a bulleted list beneath the paragraphs in the same block.
 */

// Rendered in the "Last updated" line. Set to the day the pages were drafted;
// bump it whenever the copy below changes.
export const LEGAL_EFFECTIVE_DATE = 'August 4, 2026'

export const PRIVACY_POLICY = {
  slug: 'privacy-policy',
  eyebrow: 'Legal / Privacy',
  title: 'Privacy Policy',
  intro:
    'This Privacy Policy explains what information Agency 1776 collects, how we use it, and the choices you have. Agency 1776 is a brand of Ops 1776 Group of Companies (“Agency 1776,” “we,” “us,” or “our”). By using this website or submitting an inquiry, you agree to the practices described here.',
  sections: [
    {
      heading: 'Information We Collect',
      body: [
        'We collect information you provide directly to us. When you complete the inquiry form on our Contact page, we collect the details you enter, which may include your full name, email address, phone number, campaign or organization name, candidate name, campaign type, website needs, timeline, branding status, and the message you send us.',
        'We also collect limited technical information automatically when you visit the site, such as your browser type, device information, referring pages, and general usage data. This information is collected through standard web logs and, where applicable, cookies or similar technologies used to operate and improve the site.',
      ],
    },
    {
      heading: 'How We Use Your Information',
      body: ['We use the information we collect to:'],
      list: [
        'Respond to your inquiry and communicate with you about your campaign or project',
        'Provide, maintain, and improve our websites, services, and campaign deliverables',
        'Prepare proposals, quotes, and scope for the work you request',
        'Send you updates, confirmations, and information you have asked for',
        'Protect the security and integrity of our site and prevent misuse',
        'Comply with our legal obligations',
      ],
    },
    {
      heading: 'How We Share Your Information',
      body: [
        'We do not sell your personal information. We share information only as needed to operate our business: with service providers who help us host the site, deliver email, and run our operations; with other companies within Ops 1776 Group where necessary to deliver the services you request; and when required by law, legal process, or to protect our rights, users, or the public.',
      ],
    },
    {
      heading: 'Cookies and Tracking',
      body: [
        'This site may use cookies and similar technologies to remember your preferences (such as light or dark theme), keep the site functioning, and understand how the site is used. You can control cookies through your browser settings. Disabling some cookies may affect how parts of the site work.',
      ],
    },
    {
      heading: 'Data Retention',
      body: [
        'We keep the information you submit for as long as needed to respond to your inquiry, deliver the services you request, and meet our legal, accounting, and business requirements. When information is no longer needed, we take reasonable steps to delete or de-identify it.',
      ],
    },
    {
      heading: 'Data Security',
      body: [
        'We use reasonable administrative, technical, and physical safeguards designed to protect the information we hold. No method of transmission or storage is completely secure, so we cannot guarantee absolute security, but we work to protect your information consistent with industry practices.',
      ],
    },
    {
      heading: 'Your Choices and Rights',
      body: [
        'You may request access to, correction of, or deletion of the personal information you have submitted to us, and you may ask us to stop contacting you at any time. Depending on where you live, you may have additional rights under applicable privacy laws. To make a request, contact us using the details in the “Contact Us” section below, and we will respond as required by law.',
      ],
    },
    {
      heading: 'Children’s Privacy',
      body: [
        'This site is intended for candidates, campaigns, organizations, and adults working on their behalf. It is not directed to children under 13, and we do not knowingly collect personal information from children under 13. If you believe a child has provided us with personal information, please contact us so we can remove it.',
      ],
    },
    {
      heading: 'Third-Party Links',
      body: [
        'Our site and the campaign work we showcase may link to third-party websites that we do not control. This Privacy Policy does not apply to those sites, and we are not responsible for their content or privacy practices. We encourage you to review the privacy policies of any site you visit.',
      ],
    },
    {
      heading: 'Changes to This Policy',
      body: [
        'We may update this Privacy Policy from time to time. When we do, we will revise the “Last updated” date at the top of this page. Your continued use of the site after an update means you accept the revised policy.',
      ],
    },
    {
      heading: 'Contact Us',
      body: [
        'If you have questions about this Privacy Policy or how we handle your information, reach out through our Contact page or email us at [[PRIVACY EMAIL]].',
      ],
    },
  ],
}

export const TERMS_OF_SERVICE = {
  slug: 'terms-of-service',
  eyebrow: 'Legal / Terms',
  title: 'Terms of Service',
  intro:
    'These Terms of Service (“Terms”) govern your use of the Agency 1776 website and the services we offer. Agency 1776 is a brand of Ops 1776 Group of Companies (“Agency 1776,” “we,” “us,” or “our”). By accessing this site or engaging our services, you agree to these Terms. If you do not agree, please do not use the site.',
  sections: [
    {
      heading: 'Use of the Site',
      body: [
        'You may use this site for lawful purposes and in accordance with these Terms. You agree not to misuse the site, interfere with its normal operation, attempt to gain unauthorized access to any part of it, or use it to transmit harmful, unlawful, or deceptive content.',
      ],
    },
    {
      heading: 'Our Services',
      body: [
        'Agency 1776 builds campaign websites, landing pages, and digital campaign assets for candidates, political leaders, organizations, and movements. Descriptions of our services, packages, and pricing on this site are provided for general information and do not constitute a binding offer. The specific scope, deliverables, timeline, and fees for any engagement are set out in a separate agreement, proposal, or statement of work between you and Agency 1776.',
      ],
    },
    {
      heading: 'Inquiries and Communications',
      body: [
        'Submitting an inquiry through our Contact page does not create a contract or a client relationship. It begins a conversation. A project is only confirmed once both parties agree to a written scope and terms. You are responsible for ensuring that the information you provide to us is accurate and that you are authorized to submit it on behalf of the campaign or organization you represent.',
      ],
    },
    {
      heading: 'Intellectual Property',
      body: [
        'The content on this site — including text, design, graphics, layout, and the Agency 1776 name and marks — is owned by or licensed to Agency 1776 and is protected by applicable intellectual property laws. You may not copy, reproduce, distribute, or create derivative works from this site’s content without our prior written permission.',
        'Ownership of the work we create for a client, and any license to materials the client provides to us, is governed by the separate agreement for that engagement, not by these Terms.',
      ],
    },
    {
      heading: 'Client Content',
      body: [
        'If you provide us with content — such as logos, photos, candidate information, or copy — you represent that you have the rights to use it and to allow us to use it in delivering your project. You are responsible for the accuracy and legality of the content you supply, including compliance with any applicable campaign, election, and advertising regulations.',
      ],
    },
    {
      heading: 'Third-Party Services and Links',
      body: [
        'This site and our services may reference or link to third-party tools, platforms, and websites, including the live campaign sites shown in our work. We do not control those third parties and are not responsible for their content, availability, or practices. Your use of any third-party service is governed by that party’s own terms.',
      ],
    },
    {
      heading: 'Disclaimers',
      body: [
        'The site and its content are provided on an “as is” and “as available” basis without warranties of any kind, whether express or implied, including implied warranties of merchantability, fitness for a particular purpose, and non-infringement. We do not warrant that the site will be uninterrupted, error-free, or free of harmful components, and we make no guarantee regarding any specific electoral, fundraising, or campaign outcome.',
      ],
    },
    {
      heading: 'Limitation of Liability',
      body: [
        'To the fullest extent permitted by law, Agency 1776 and Ops 1776 Group will not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of data, revenue, or goodwill, arising out of or related to your use of this site. Nothing in these Terms limits liability that cannot be limited under applicable law.',
      ],
    },
    {
      heading: 'Indemnification',
      body: [
        'You agree to indemnify and hold harmless Agency 1776, Ops 1776 Group, and our personnel from any claims, damages, or expenses arising out of your use of the site, your violation of these Terms, or content you submit to us in violation of another party’s rights or applicable law.',
      ],
    },
    {
      heading: 'Governing Law',
      body: [
        'These Terms are governed by the laws of the State of [[STATE]], without regard to its conflict-of-law principles. Any dispute relating to these Terms or the site will be subject to the exclusive jurisdiction of the state and federal courts located in that state.',
      ],
    },
    {
      heading: 'Changes to These Terms',
      body: [
        'We may update these Terms from time to time. When we do, we will revise the “Last updated” date at the top of this page. Your continued use of the site after an update means you accept the revised Terms.',
      ],
    },
    {
      heading: 'Contact Us',
      body: [
        'Questions about these Terms can be sent through our Contact page or by email to [[PRIVACY EMAIL]].',
      ],
    },
  ],
}
