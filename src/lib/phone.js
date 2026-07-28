/*
 * Canonical phone handling for every form that collects a number.
 *
 * We own the country code. The visible input value is always `+1 (xxx) xxx-xxxx`
 * and the user never types the `+1` themselves — we pre-set it. Anything they
 * type or paste that carries its own `+1` / leading `1` is stripped, so
 * `5555550100`, `15555550100`, and `+1 (555) 555-0100` all collapse to the
 * same value.
 */

/*
 * NANP area codes never begin with 1, so a leading 1 is always a country code
 * the user supplied on top of our pre-set `+1` — safe to drop unconditionally.
 */
const toNationalDigits = (value) => {
  const digits = String(value ?? '').replace(/\D/g, '')
  const national = digits.startsWith('1') ? digits.slice(1) : digits
  return national.slice(0, 10)
}

/**
 * Live formatter for a phone input's `onChange`. Returns the partially
 * formatted value while the user is still typing so the `+1` appears as soon
 * as the first digit lands.
 *
 * @param {string} value Raw input value, in whatever shape the user produced.
 * @returns {string} `+1 (xxx) xxx-xxxx`, a partial prefix of it, or ''.
 */
export const formatPhoneInput = (value) => {
  const digits = toNationalDigits(value)
  if (!digits) return ''

  const area = digits.slice(0, 3)
  const prefix = digits.slice(3, 6)
  const line = digits.slice(6, 10)

  if (digits.length <= 3) return `+1 (${area}`
  if (digits.length <= 6) return `+1 (${area}) ${prefix}`
  return `+1 (${area}) ${prefix}-${line}`
}

/**
 * Server-side canonical producer — the defensive counterpart to
 * {@link formatPhoneInput}. API routes never trust the inbound string. Partial
 * entries (fewer than 10 national digits) collapse to an empty string.
 *
 * @param {string} value Raw phone value from the request body.
 * @returns {string} `+1 (xxx) xxx-xxxx`, or '' when absent or incomplete.
 */
export const normalizePhoneForSubmit = (value) => {
  const digits = toNationalDigits(value)
  if (digits.length !== 10) return ''
  return `+1 (${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
}
