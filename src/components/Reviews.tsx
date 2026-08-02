interface Review {
  quote: string
  author: string
  eventType: string
}

const REVIEWS: Review[] = [
  {
    quote: "My workshop with the LockpickingDev was amazing! I booked this experience as a surprise gift for my wife and not only was it super fun, we also learned a lot about lockpicking and security. Our host was very kind, provided a bunch of gear, and was accommodating to any requests. I'd highly recommend everyone trying out this unique experience.",
    author: 'Workshop Guest',
    eventType: 'Private Lesson',
  },
]

export default function Reviews() {
  return (
    <section className="reviews-section" id="reviews">
      <div className="container">
        <div className="section-label">reviews</div>
        <h2 className="section-title">What Guests Are Saying</h2>
        <div className="section-divider" />
        <div className={`dossier-grid${REVIEWS.length === 1 ? ' dossier-grid--single' : ''}`}>
          {REVIEWS.map((r, i) => (
            <div key={i} className="dossier-card">
              <div className="dossier-header">
                <span className="dossier-rec">review_{String(i + 1).padStart(3, '0')}.log</span>
              </div>
              <div className="dossier-body">
                <div className="dossier-row">
                  <span className="dossier-key">guest</span>
                  <span className="dossier-val dossier-val-cyan">{r.author}</span>
                </div>
                <div className="dossier-row">
                  <span className="dossier-key">event</span>
                  <span className="dossier-val dossier-val-amber">{r.eventType}</span>
                </div>
                <p className="dossier-quote">{r.quote}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
