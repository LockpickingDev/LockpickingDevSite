import { useState, type FormEvent } from 'react'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
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
              Submit your request and I'll respond within 24–48 hours to work out the details. All
              sessions confirmed via email before any payment is arranged.
            </p>
            <div className="contact-links">
              <a href="https://www.youtube.com/@LockpickingDev" className="contact-link" target="_blank" rel="noreferrer">
                YouTube · @LockpickingDev
              </a>
              <a href="https://www.facebook.com/LockpickingDevOfficial/" className="contact-link" target="_blank" rel="noreferrer">
                Facebook · LockpickingDevOfficial
              </a>
              <a href="https://www.instagram.com/lockpickingdev/" className="contact-link" target="_blank" rel="noreferrer">
                Instagram · @lockpickingdev
              </a>
              <a href="https://www.gatewaylocksport.com" className="contact-link" target="_blank" rel="noreferrer">
                GatewayLocksport.com
              </a>
            </div>
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
                <form onSubmit={handleSubmit}>
                  <div className="t-form-row">
                    <div className="t-group">
                      <label className="t-label">Name</label>
                      <input className="t-input" type="text" placeholder="Your name" required />
                    </div>
                    <div className="t-group">
                      <label className="t-label">Email</label>
                      <input className="t-input" type="email" placeholder="your@email.com" required />
                    </div>
                  </div>
                  <div className="t-form-row">
                    <div className="t-group">
                      <label className="t-label">Group Size</label>
                      <select className="t-select">
                        <option value="">Select...</option>
                        <option>1–5 people</option>
                        <option>6–15 people</option>
                        <option>16–25 people</option>
                        <option>25+ people</option>
                      </select>
                    </div>
                    <div className="t-group">
                      <label className="t-label">Event Type</label>
                      <select className="t-select">
                        <option value="">Select...</option>
                        <option>Private Lesson</option>
                        <option>Birthday Party</option>
                        <option>Corporate Team-Building</option>
                        <option>Conference / Convention</option>
                        <option>Cybersecurity Meetup</option>
                        <option>Educational Workshop</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>
                  <div className="t-group">
                    <label className="t-label">Preferred Date</label>
                    <input className="t-input" type="text" placeholder="e.g. July 2025, weekends preferred" />
                  </div>
                  <div className="t-group">
                    <label className="t-label">Message</label>
                    <textarea className="t-textarea" placeholder="Describe your event, group experience level, location..." />
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
