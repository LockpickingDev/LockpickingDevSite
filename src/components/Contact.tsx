import { useState, type FormEvent, type ChangeEvent } from 'react'
import DatePicker from './DatePicker'

const TIMES: string[] = []
for (let mins = 9 * 60; mins <= 22 * 60; mins += 5) {
  const h24 = Math.floor(mins / 60)
  const m = mins % 60
  const h12 = h24 === 12 ? 12 : h24 % 12 || 12
  const ampm = h24 < 12 ? 'AM' : 'PM'
  TIMES.push(`${h12}:${m.toString().padStart(2, '0')} ${ampm}`)
}

const GROUP_SIZES = ['1–5 people', '6–15 people', '16–25 people', '25+ people']
const EVENT_TYPES = ['Private Lesson', 'Group Lesson', 'Meetup Event', 'Corporate Team-Building', 'Conference / Convention', 'Educational Workshop', 'Party', 'Other (Please describe in message)']

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MAX = { name: 100, email: 254, message: 2000 }

// Encode all HTML-special characters - protects against XSS if data is rendered in any HTML context
function sanitize(value: string): string {
  return value.trim()
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
}

function isAllowed(value: string, allowed: string[]): boolean {
  return value === '' || allowed.includes(value)
}

interface Fields {
  name: string
  email: string
  groupSize: string
  eventType: string
  preferredTime: string
  message: string
}

interface Errors {
  name?: string
  email?: string
  groupSize?: string
  eventType?: string
  preferredTime?: string
  message?: string
}

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [honeypot, setHoneypot] = useState('')
  const [lastSubmit, setLastSubmit] = useState(0)
  const [fields, setFields] = useState<Fields>({
    name: '', email: '', groupSize: '', eventType: '', preferredTime: '', message: '',
  })
  const [errors, setErrors] = useState<Errors>({})

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setFields(prev => ({ ...prev, [name]: value }))
    if (errors[name as keyof Errors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  function validate(): Errors {
    const errs: Errors = {}
    const name = fields.name.trim()
    const email = fields.email.trim()
    if (!name) errs.name = 'Name is required'
    else if (name.length > MAX.name) errs.name = `Max ${MAX.name} characters`
    if (!email) errs.email = 'Email is required'
    else if (!EMAIL_RE.test(email)) errs.email = 'Enter a valid email address'
    if (!isAllowed(fields.groupSize, GROUP_SIZES)) errs.groupSize = 'Invalid selection'
    if (!isAllowed(fields.eventType, EVENT_TYPES)) errs.eventType = 'Invalid selection'
    if (fields.preferredTime && !isAllowed(fields.preferredTime, TIMES)) errs.preferredTime = 'Invalid selection'
    if (fields.message.trim().length > MAX.message) errs.message = `Max ${MAX.message} characters`
    return errs
  }

  function buildPayload() {
    return {
      name: sanitize(fields.name).slice(0, MAX.name),
      email: fields.email.trim().slice(0, MAX.email),
      groupSize: fields.groupSize,
      eventType: fields.eventType,
      preferredDate: selectedDate?.toLocaleDateString() ?? '',
      preferredTime: fields.preferredTime,
      message: sanitize(fields.message).slice(0, MAX.message),
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()

    // Honeypot: bots fill hidden fields, humans don't
    if (honeypot) return

    // Rate limit: one submission per 60 seconds
    if (Date.now() - lastSubmit < 60_000) return

    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }

    // TODO: send payload to your backend or email service (e.g. Formspree, EmailJS).
    // Server-side validation and rate limiting must also be applied there.
    buildPayload()

    setLastSubmit(Date.now())
    setSubmitted(true)
  }

  return (
    <section className="contact-section" id="contact">
      <div className="container">
        <div className="contact-grid">
          <div className="contact-info">
            <div className="section-label">contact</div>
            <h2 className="section-title">Open a Session</h2>
            <div className="section-divider" />
            <p className="contact-desc">
              Submit your request and I'll respond within 3-5 business days to work out the details. All
              sessions confirmed via email before any payment is arranged.
            </p>
<div className="payment-note">
              <strong className="payment-note-title">Payment Info</strong>
              <br />No transactions on this site.
              <br />Payment via <span className="cyan-text">PayPal</span> or{' '}
              <span className="cyan-text">Venmo</span> after confirming details by email.
            </div>
          </div>
          <div>
            <div className="contact-form-card">
              {submitted ? (
                <div className="form-success">
                  <div className="form-success-icon">✓</div>
                  <div className="form-success-msg">Your request has been sent!</div>
                  <div className="form-success-sub">I'll get back to you within 24–48 hours.</div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  {/* Honeypot - hidden from humans, filled by bots */}
                  <div className="t-honeypot" aria-hidden="true">
                    <input
                      type="text"
                      name="website"
                      value={honeypot}
                      onChange={e => setHoneypot(e.target.value)}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  <div className="t-form-row">
                    <div className="t-group">
                      <label className="t-label" htmlFor="name">Name</label>
                      <input
                        id="name" name="name" className={`t-input${errors.name ? ' t-input--error' : ''}`}
                        type="text" placeholder="Your name" autoComplete="name"
                        maxLength={MAX.name} value={fields.name} onChange={handleChange}
                      />
                      {errors.name && <div className="t-error">{errors.name}</div>}
                    </div>
                    <div className="t-group">
                      <label className="t-label" htmlFor="email">Email</label>
                      <input
                        id="email" name="email" className={`t-input${errors.email ? ' t-input--error' : ''}`}
                        type="email" placeholder="your@email.com" autoComplete="email"
                        maxLength={MAX.email} value={fields.email} onChange={handleChange}
                      />
                      {errors.email && <div className="t-error">{errors.email}</div>}
                    </div>
                  </div>

                  <div className="t-form-row">
                    <div className="t-group">
                      <label className="t-label" htmlFor="groupSize">Group Size</label>
                      <select
                        id="groupSize" name="groupSize"
                        className={`t-select${errors.groupSize ? ' t-input--error' : ''}`}
                        value={fields.groupSize} onChange={handleChange}
                      >
                        <option value="">Select...</option>
                        {GROUP_SIZES.map(s => <option key={s}>{s}</option>)}
                      </select>
                      {errors.groupSize && <div className="t-error">{errors.groupSize}</div>}
                    </div>
                    <div className="t-group">
                      <label className="t-label" htmlFor="eventType">Event Type</label>
                      <select
                        id="eventType" name="eventType"
                        className={`t-select${errors.eventType ? ' t-input--error' : ''}`}
                        value={fields.eventType} onChange={handleChange}
                      >
                        <option value="">Select...</option>
                        {EVENT_TYPES.map(t => <option key={t}>{t}</option>)}
                      </select>
                      {errors.eventType && <div className="t-error">{errors.eventType}</div>}
                    </div>
                  </div>

                  <div className="t-form-row">
                    <div className="t-group">
                      <label className="t-label">Preferred Date</label>
                      <DatePicker value={selectedDate} onChange={setSelectedDate} />
                    </div>
                    <div className="t-group">
                      <label className="t-label" htmlFor="preferredTime">Preferred Time</label>
                      <select
                        id="preferredTime" name="preferredTime"
                        className={`t-select${errors.preferredTime ? ' t-input--error' : ''}`}
                        value={fields.preferredTime} onChange={handleChange}
                      >
                        <option value="">Select a time...</option>
                        {TIMES.map(t => <option key={t}>{t}</option>)}
                      </select>
                      {errors.preferredTime && <div className="t-error">{errors.preferredTime}</div>}
                    </div>
                  </div>

                  <div className="t-group">
                    <label className="t-label" htmlFor="message">Message</label>
                    <textarea
                      id="message" name="message"
                      className={`t-textarea${errors.message ? ' t-input--error' : ''}`}
                      placeholder="Describe your event and location..."
                      maxLength={MAX.message} value={fields.message} onChange={handleChange}
                    />
                    {errors.message && <div className="t-error">{errors.message}</div>}
                  </div>

                  <button type="submit" className="t-submit">Send Request</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
