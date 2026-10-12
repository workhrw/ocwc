import { useEffect, useRef, useState, type FormEvent } from 'react'
import { site } from './data'

type FieldErrors = Partial<Record<'name' | 'email' | 'message', string>>
const unavailable = 'Online messaging is not available yet. Please email or call the club.'

export default function ContactForm() {
  const [endpoint, setEndpoint] = useState('')
  const [checking, setChecking] = useState(true)
  const [notice, setNotice] = useState('')
  const [errors, setErrors] = useState<FieldErrors>({})
  const result = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const controller = new AbortController()
    const timeout = window.setTimeout(() => controller.abort(), 10000)
    fetch('/contact-config.json', { signal: controller.signal, cache: 'no-store' })
      .then(async (response) => {
        const config = await response.json()
        if (!response.ok || typeof config.endpoint !== 'string' || !/^https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]+\/exec$/.test(config.endpoint)) throw new Error('Unavailable')
        setEndpoint(config.endpoint)
      })
      .catch(() => setNotice(unavailable))
      .finally(() => { window.clearTimeout(timeout); setChecking(false) })
    return () => { window.clearTimeout(timeout); controller.abort() }
  }, [])

  function submit(event: FormEvent<HTMLFormElement>) {
    if (!endpoint) { event.preventDefault(); return }
    const form = event.currentTarget
    const values = new FormData(form)
    const nextErrors: FieldErrors = {}
    if (!String(values.get('name') || '').trim()) nextErrors.name = 'Enter your name.'
    if (!String(values.get('email') || '').trim() || !(form.elements.namedItem('email') as HTMLInputElement).validity.valid) nextErrors.email = 'Enter a valid email address.'
    if (!String(values.get('message') || '').trim()) nextErrors.message = 'Enter your message.'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) {
      event.preventDefault()
      setNotice('Please correct the highlighted fields.')
      window.requestAnimationFrame(() => result.current?.focus())
      return
    }
    // A normal browser form POST opens Google's actual result page.
    // Do not use no-cors fetch, infer success, or clear the visitor's text.
    setNotice('Check the Google confirmation page in the new tab to see whether your message was saved. Your text remains here.')
  }

  return (
    <section className="container narrow contact-form-section" aria-labelledby="contact-form-title">
      <p className="eyebrow">Get in touch</p>
      <h2 id="contact-form-title">Send the club a message</h2>
      <p>Name, email, and message are required. We save them in the club’s private Google Sheet to respond to your inquiry. <a href="/privacy">Privacy information</a>.</p>
      <p>You can also <a href="mailto:woodcarvingokc@gmail.com">email woodcarvingokc@gmail.com</a> or <a href={site.phoneHref}>call the club</a>.</p>
      <div ref={result} tabIndex={-1} className="contact-result" role="status" aria-live="polite" aria-atomic="true">
        {checking ? 'Checking message availability…' : notice}
      </div>
      <p id="contact-confirmation-help">A confirmation or error page from Google opens in a new tab after you submit. Check that page before sending again.</p>
      <form action={endpoint || undefined} method="post" target="_blank" rel="noopener noreferrer" onSubmit={submit} noValidate aria-describedby="contact-confirmation-help">
        <fieldset disabled={!endpoint} className="contact-fields">
          <legend className="visually-hidden">Your message to OCWC</legend>
          <label htmlFor="contact-name">Name</label>
          <input id="contact-name" name="name" type="text" autoComplete="name" required maxLength={100} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'contact-name-error' : undefined} />
          {errors.name && <p className="field-error" id="contact-name-error">{errors.name}</p>}
          <label htmlFor="contact-email">Email</label>
          <input id="contact-email" name="email" type="email" autoComplete="email" required maxLength={254} aria-invalid={!!errors.email} aria-describedby={errors.email ? 'contact-email-error' : undefined} />
          {errors.email && <p className="field-error" id="contact-email-error">{errors.email}</p>}
          <label htmlFor="contact-message">Message</label>
          <textarea id="contact-message" name="message" required rows={7} maxLength={5000} aria-invalid={!!errors.message} aria-describedby={errors.message ? 'contact-message-error' : undefined} />
          {errors.message && <p className="field-error" id="contact-message-error">{errors.message}</p>}
          <div hidden aria-hidden="true">
            <label htmlFor="contact-confirmation">Confirmation code (required)</label>
            <input id="contact-confirmation" name="confirmation_code" type="text" tabIndex={-1} autoComplete="off" data-lpignore="true" data-1p-ignore="true" />
          </div>
          <button className="button" type="submit">Send message</button>
        </fieldset>
      </form>
    </section>
  )
}
