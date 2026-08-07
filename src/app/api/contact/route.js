import { normalizePhoneForSubmit } from '@/lib/phone'

/*
 * Two fan-out targets, both server-side only:
 *   • the contact form submission webhook — drives the contact-form GHL
 *     workflow (contact create/update + the form's own automations). Fires
 *     on EVERY submit.
 *   • the SMS consent webhook — drives the SMS opt-in / subscription workflow.
 *     Fires ONLY when the visitor actually consented (a phone number plus at
 *     least one ticked consent box). Firing it unconditionally opted every
 *     contact into SMS even with no box checked, so it is gated below.
 */
const CONTACT_WEBHOOK_URL =
  'https://services.leadconnectorhq.com/hooks/sXAEbVurmQaTnNok2hXX/webhook-trigger/xzXNYKJboy6hpeTkbSFJ'
const SMS_WEBHOOK_URL =
  'https://services.leadconnectorhq.com/hooks/sXAEbVurmQaTnNok2hXX/webhook-trigger/0kjJIBPhZUKQ9T6B0PqO'

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

    // Gate the SMS webhook on real consent: it fires only when a phone number
    // survived normalisation AND at least one consent box was ticked. The
    // contact webhook always fires.
    const consentedToSms = Boolean(phone) && (Boolean(body.smsUpdates) || Boolean(body.smsPromo))
    const webhookUrls = [
      CONTACT_WEBHOOK_URL,
      ...(consentedToSms ? [SMS_WEBHOOK_URL] : []),
    ]

    // Per-URL `.catch` so one dead webhook cannot block delivery to the other.
    const results = await Promise.all(
      webhookUrls.map((url) =>
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
