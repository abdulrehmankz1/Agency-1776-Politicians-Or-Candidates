import { normalizePhoneForSubmit } from '@/lib/phone'

/*
 * Fan-out targets, in order:
 *   0 — the contact form submission webhook. Drives the contact-form GHL
 *       workflow (contact create/update + the form's own automations).
 *   1 — the SMS consent webhook. Drives the SMS opt-in / subscription
 *       workflow from the two consent checkboxes (sms_updates / sms_promo).
 *
 * Both receive the identical payload — the SMS workflow reads the consent
 * fields and acts only when they are "Yes", so nothing is stripped for it.
 * Webhook URLs stay server-side only.
 */
const WEBHOOK_URLS = [
  'https://services.leadconnectorhq.com/hooks/sXAEbVurmQaTnNok2hXX/webhook-trigger/xzXNYKJboy6hpeTkbSFJ',
  'https://services.leadconnectorhq.com/hooks/sXAEbVurmQaTnNok2hXX/webhook-trigger/0kjJIBPhZUKQ9T6B0PqO',
]

/*
 * The form collects a single "Full Name" field but GHL expects the pair, so we
 * split on the first whitespace run and hand the remainder over as the surname.
 */
const splitName = (fullName) => {
  const parts = fullName.split(/\s+/)
  return { firstName: parts[0] ?? '', lastName: parts.slice(1).join(' ') }
}

const text = (value) => String(value ?? '').trim()

export const POST = async (request) => {
  try {
    const body = await request.json()

    const fullName = text(body.fullName)
    const email = text(body.email)
    const message = text(body.message)

    if (!fullName || !email || !message) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const { firstName, lastName } = splitName(fullName)
    const phone = normalizePhoneForSubmit(body.phone)

    const payload = {
      type: 'Contact_Form',
      firstName,
      lastName,
      email,
      phone,
      organization: text(body.organization),
      candidate: text(body.candidate),
      campaignType: text(body.campaignType),
      websiteNeed: text(body.websiteNeed),
      timeline: text(body.timeline),
      branding: text(body.branding),
      message,
      /*
       * Consent can only be 'Yes' when a phone number survived normalisation.
       * The client already clears the boxes when the field is emptied; this
       * guard stops a hand-rolled POST from opting in a numberless contact.
       */
      sms_updates: phone && body.smsUpdates ? 'Yes' : 'No',
      sms_promo: phone && body.smsPromo ? 'Yes' : 'No',
      source: 'src_contact',
      submitted_at: new Date().toISOString(),
    }

    // Per-URL `.catch` so one dead webhook cannot block delivery to the other.
    const results = await Promise.all(
      WEBHOOK_URLS.map((url) =>
        fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }).catch((error) => {
          console.error('[Contact API] webhook error:', error)
          return { ok: false }
        }),
      ),
    )

    // Partial failure still succeeds for the client — only a total loss is 502.
    if (!results.some((result) => result.ok)) {
      return Response.json(
        { error: 'Webhook delivery failed' },
        { status: 502 },
      )
    }

    return Response.json({ success: true })
  } catch (error) {
    console.error('[Contact API]:', error)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
