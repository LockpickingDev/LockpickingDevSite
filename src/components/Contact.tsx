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
              <span className="cyan-text">// payment_info</span>
              <br />No transactions on this site.
              <br />Payment via <span className="cyan-text">PayPal</span> or{' '}
              <span className="cyan-text">Venmo</span> after confirming details by email.
            </div>
          </div>
          <div>
            <div className="t-form">
              <div className="t-form-header">
                <span className="terminal-dot t-red" />
                <span className="terminal-dot t-yellow" />
                <span className="terminal-dot t-green" />
                <span className="terminal-title">request_session.sh</span>
              </div>
              <div className="t-form-body">
                <div className="t-form-line">
                  <span className="prompt-sym">$</span> ./request_session --interactive
                </div>
                {submitted ? (
                  <div className="t-success">
                    <div className="t-success-msg">[OK] Request transmitted successfully.</div>
                    <div className="t-success-sub">Awaiting response: 24–48 hours</div>
                    <div className="t-cursor">$ _</div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="t-form-row">
                      <div className="t-group">
                        <label className="t-label">name:</label>
                        <input className="t-input" type="text" placeholder="your name" required />
                      </div>
                      <div className="t-group">
                        <label className="t-label">email:</label>
                        <input className="t-input" type="email" placeholder="your@email.com" required />
                      </div>
                    </div>
                    <div className="t-form-row">
                      <div className="t-group">
                        <label className="t-label">group_size:</label>
                        <select className="t-select">
                          <option value="">select...</option>
                          <option>1–5 people</option>
                          <option>6–15 people</option>
                          <option>16–25 people</option>
                          <option>25+ people</option>
                        </select>
                      </div>
                      <div className="t-group">
                        <label className="t-label">event_type:</label>
                        <select className="t-select">
                          <option value="">select...</option>
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
                      <label className="t-label">preferred_date:</label>
                      <input className="t-input" type="text" placeholder="e.g. July 2025, weekends preferred" />
                    </div>
                    <div className="t-group">
                      <label className="t-label">message:</label>
                      <textarea className="t-textarea" placeholder="describe your event, group experience level, location..." />
                    </div>
                    <button type="submit" className="t-submit">&gt; send_request</button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
