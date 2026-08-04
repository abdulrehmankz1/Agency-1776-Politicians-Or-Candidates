'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

import Combobox from '@/components/combobox'
import Icon from '@/components/icon'
import LineBackdrop from '@/components/line-backdrop'
import RevealBorder from '@/components/reveal-border'
import SplitText from '@/components/split-text'
import { CONTACT_PAGE } from '@/constants/campaign'
import { useScrubHeading } from '@/hooks/use-scrub-heading'
import { useSectionReveal } from '@/hooks/use-section-reveal'
import { cn } from '@/utils/cn'
import { ScrollTrigger } from '@/utils/register-gsap'

/*
 * Underline-style input primitive. Shared for text/tel/email/select/textarea.
 * No boxed backgrounds — a hairline under the field turns accent on focus and
 * bright red on validation error. Matches the editorial rest of the site.
 */
const FieldShell = ({ index, label, required, error, children }) => (
  <div className="relative">
    <label
      className={cn(
        'flex flex-wrap items-baseline gap-3 text-[0.82rem] uppercase tracking-[0.28em]',
        error ? 'text-accent' : 'text-foreground/60',
      )}
    >
      <span className="font-mono text-[0.8rem] text-accent">
        {String(index).padStart(2, '0')}
      </span>
      <span>
        {label}
        {required ? <span aria-hidden="true"> *</span> : null}
      </span>
      {error && (
        <span className="ml-auto font-mono text-[0.75rem] normal-case tracking-[0.2em] text-accent">
          {error}
        </span>
      )}
    </label>
    <div className="mt-3">{children}</div>
  </div>
)

const inputBase =
  'peer block w-full appearance-none border-0 border-b border-muted bg-transparent py-3 text-base text-foreground placeholder:text-foreground/40 outline-none transition-colors focus:border-accent'

const initialFormState = () => {
  const state = {}
  for (const f of CONTACT_PAGE.form.fields) state[f.name] = ''
  return state
}

/*
 * Progressive US phone formatter. Strips everything but digits, drops an
 * optional leading country-code "1", caps at 10 national digits, and lays
 * them out as `(231) 456-7890` as the user types. Because it re-derives the
 * value from digits on every keystroke, the field can only ever hold a
 * complete 10-digit number or a partial on the way to one — never stray
 * characters or an over-long string.
 */
const formatUsPhone = (raw) => {
  let digits = raw.replace(/\D/g, '')
  if (digits.length > 10 && digits.startsWith('1')) digits = digits.slice(1)
  digits = digits.slice(0, 10)
  const area = digits.slice(0, 3)
  const prefix = digits.slice(3, 6)
  const line = digits.slice(6, 10)
  if (digits.length > 6) return `(${area}) ${prefix}-${line}`
  if (digits.length > 3) return `(${area}) ${prefix}`
  if (digits.length > 0) return `(${area}`
  return ''
}

/*
 * A phone value counts as "complete" only at a full 10-digit US number (an
 * optional leading "1" country code is allowed). Anything in between — the
 * partial numbers the client flagged (e.g. "(231) 2") — is rejected.
 */
const isCompletePhone = (value) => {
  const digits = value.replace(/\D/g, '')
  if (digits.length === 11 && digits.startsWith('1')) return true
  return digits.length === 10
}

const validate = (values) => {
  const errors = {}
  for (const f of CONTACT_PAGE.form.fields) {
    if (f.required && !values[f.name]?.trim()) {
      errors[f.name] = 'Required'
    }
  }
  const email = values.email?.trim()
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Invalid email'
  }
  // Phone is optional, but a partially-typed number is worse than none —
  // require a complete 10-digit number or an empty field.
  const phone = values.phone?.trim()
  if (phone && !isCompletePhone(phone)) {
    errors.phone = 'Enter a complete 10-digit number'
  }
  return errors
}

const ContactForm = () => {
  const scopeRef = useSectionReveal()
  const headingRef = useScrubHeading()

  const [values, setValues] = useState(initialFormState)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | submitting | success | error

  const update =
    (name, format) =>
    (event) => {
      const value = format ? format(event.target.value) : event.target.value
      setValues((v) => ({ ...v, [name]: value }))
      if (errors[name]) {
        setErrors((prev) => {
          const next = { ...prev }
          delete next[name]
          return next
        })
      }
    }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const nextErrors = validate(values)
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors)
      setStatus('error')
      // Focus first invalid field for screen readers.
      const firstError = Object.keys(nextErrors)[0]
      const firstField = event.currentTarget.querySelector(
        `[name="${firstError}"]`,
      )
      firstField?.focus()
      return
    }
    setErrors({})
    setStatus('submitting')
    // No backend wired — simulate an async send so the loading state is real.
    await new Promise((resolve) => setTimeout(resolve, 1200))
    setStatus('success')
  }

  const resetForm = () => {
    setValues(initialFormState())
    setErrors({})
    setStatus('idle')
  }

  const submitting = status === 'submitting'

  return (
    <section
      ref={scopeRef}
      id="contact-form"
      className="relative isolate overflow-hidden bg-surface py-32"
    >
      <LineBackdrop tone="muted" columns={14} pulses={3} />

      <div className="relative mx-auto max-w-[1600px] px-6 lg:px-10">
        <div className="grid grid-cols-12 gap-10 lg:gap-16">
          {/* Left column — heading + intro, sticky on lg. */}
          <div className="col-span-12 lg:col-span-5">
            <div className="lg:sticky lg:top-[8rem]">
              <div className="flex items-center gap-3 text-[0.82rem] uppercase tracking-[0.28em] text-foreground/60">
                <span className="border border-muted px-2 py-0.5 font-mono text-[0.8rem] text-foreground/80">
                  02
                </span>
                <span
                  className="h-px w-8 bg-muted"
                  data-reveal="icon"
                  aria-hidden="true"
                />
                <span>Inquiry</span>
              </div>

              <h2
                ref={headingRef}
                className="mt-8 text-balance text-[clamp(2.5rem,5.5vw,4.75rem)] leading-[0.95] tracking-[0.005em]"
              >
                <SplitText mode="words">{CONTACT_PAGE.form.heading}</SplitText>
              </h2>

              <p className="mt-8 max-w-md text-lg leading-relaxed text-foreground/80">
                <SplitText mode="block">{CONTACT_PAGE.form.body}</SplitText>
              </p>
            </div>
          </div>

          {/* Right column — form or success card. */}
          <div className="col-span-12 lg:col-span-7">
            <div className="relative bg-background p-6 sm:p-10 lg:p-12">
              <RevealBorder tone="muted" />

              <AnimatePresence
                mode="wait"
                initial={false}
                onExitComplete={() => {
                  // Swapping the tall form for the short success card (and
                  // back on reset) changes this section's height by ~700px.
                  // Every ScrollTrigger on the page — the hero reveal, this
                  // heading's scrub, the footer reveal — cached its
                  // start/end scroll positions against the previous layout,
                  // so without a recompute those decorative reveals sit at
                  // stale positions and fade their content toward zero
                  // opacity as the page scrolls (the "graphics above the
                  // footer go blank" post-submit bug). Refresh once the swap
                  // has settled the new layout.
                  requestAnimationFrame(() => ScrollTrigger.refresh())
                }}
              >
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35, ease: [0.85, 0, 0, 1] }}
                    role="status"
                    aria-live="polite"
                    className="flex min-h-[560px] flex-col justify-center gap-6"
                  >
                    <span className="flex h-14 w-14 items-center justify-center border border-accent">
                      <Icon
                        name="star"
                        className="h-6 w-6 text-accent"
                        strokeWidth={1.5}
                      />
                    </span>
                    <p className="font-display text-[clamp(2rem,3.5vw,3rem)] leading-[1] tracking-[0.005em]">
                      Inquiry received.
                    </p>
                    <p className="max-w-md text-base leading-relaxed text-foreground/75 lg:text-lg">
                      Thanks — Agency 1776 will be in touch about the next step
                      for your campaign.
                    </p>
                    <button
                      type="button"
                      onClick={resetForm}
                      data-cursor="button"
                      className="font-display mt-4 inline-flex items-center gap-3 self-start text-sm uppercase tracking-[0.22em] text-foreground/70 hover:text-accent"
                    >
                      Send another inquiry
                      <span
                        aria-hidden="true"
                        className="block h-px w-8 bg-accent"
                      />
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35, ease: [0.85, 0, 0, 1] }}
                    onSubmit={handleSubmit}
                    noValidate
                    aria-busy={submitting}
                    className="flex flex-col gap-8"
                  >
                    {CONTACT_PAGE.form.fields.map((field, i) => (
                      <FieldShell
                        key={field.name}
                        index={i + 1}
                        label={field.label}
                        required={field.required}
                        error={errors[field.name]}
                      >
                        {field.type === 'textarea' ? (
                          <textarea
                            name={field.name}
                            value={values[field.name]}
                            onChange={update(field.name)}
                            placeholder={field.placeholder}
                            rows={4}
                            disabled={submitting}
                            aria-invalid={!!errors[field.name]}
                            className={cn(inputBase, 'resize-none py-4')}
                          />
                        ) : field.type === 'select' ? (
                          // Fully custom combobox — the native `<select>`
                          // popup renders with OS-default styling that fights
                          // the site theme (mismatched white background,
                          // browser-controlled option colours). Combobox
                          // takes the same `event.target.value` payload the
                          // parent's `update` handler expects.
                          <Combobox
                            name={field.name}
                            value={values[field.name]}
                            onChange={update(field.name)}
                            options={field.options}
                            placeholder="Select an option"
                            disabled={submitting}
                            invalid={!!errors[field.name]}
                          />
                        ) : (
                          <input
                            name={field.name}
                            type={field.type}
                            inputMode={
                              field.type === 'tel' ? 'tel' : undefined
                            }
                            value={values[field.name]}
                            onChange={update(
                              field.name,
                              field.type === 'tel' ? formatUsPhone : undefined,
                            )}
                            placeholder={field.placeholder}
                            disabled={submitting}
                            aria-invalid={!!errors[field.name]}
                            className={inputBase}
                          />
                        )}
                      </FieldShell>
                    ))}

                    {/* Submit row — button + status message. */}
                    <div className="mt-4 flex flex-col gap-4 border-t border-muted/50 pt-8 sm:flex-row sm:items-center sm:justify-between">
                      <button
                        type="submit"
                        disabled={submitting}
                        data-cursor="button"
                        className={cn(
                          'font-display group relative inline-flex items-center gap-3 self-start bg-accent px-6 py-4 text-base uppercase tracking-[0.16em] leading-none text-on-accent transition-colors',
                          submitting
                            ? 'cursor-progress opacity-70'
                            : 'hover:bg-foreground hover:text-background',
                        )}
                      >
                        <span>
                          {submitting
                            ? 'SENDING…'
                            : CONTACT_PAGE.form.submit.label}
                        </span>
                        <motion.span
                          aria-hidden="true"
                          className="inline-block h-[1px] w-6 bg-current"
                          animate={{ scaleX: submitting ? 1.6 : 1 }}
                          transition={{ duration: 0.25 }}
                        />
                      </button>

                      {status === 'error' && (
                        <p
                          role="alert"
                          className="font-mono text-xs uppercase tracking-[0.22em] text-accent"
                        >
                          Please check the highlighted fields.
                        </p>
                      )}
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactForm
