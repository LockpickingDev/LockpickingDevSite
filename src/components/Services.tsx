interface Tier {
  slug: string
  name: string
  size: string
  price: string
  isContact?: boolean
  features: string[]
  featured?: boolean
}

const TIERS: Tier[] = [
  {
    slug: 'private_group',
    name: 'Private Group',
    size: 'Up to 5 people',
    price: '300',
    features: ['Hands-on personal instruction', 'All picks & locks provided', 'Dates, parties, private events', '~2 hour session'],
  },
  {
    slug: 'standard',
    name: 'Standard',
    size: '6–15 people',
    price: '450',
    featured: true,
    features: ['Group instruction + 1-on-1 time', 'All equipment provided', 'Meetups & team-building', '~2.5 hour session'],
  },
  {
    slug: 'large_group',
    name: 'Large Group',
    size: '16–25 people',
    price: '650+',
    features: ['Full workshop format', 'Multiple skill stations', 'Corporate events', '~3 hour session'],
  },
  {
    slug: 'convention_village',
    name: 'Convention Village',
    size: '25+ people',
    price: '',
    isContact: true,
    features: ['Full lockpicking village', 'Multi-table, multi-skill', 'Conferences & conventions', 'Custom scope & duration'],
  },
]

export default function Services() {
  return (
    <section className="services-section" id="services">
      <div className="container">
        <div className="terminal-box">
          <div className="terminal-header">
            <span className="terminal-dot t-red" />
            <span className="terminal-dot t-yellow" />
            <span className="terminal-dot t-green" />
            <span className="terminal-title">services.sh — pricing_table</span>
          </div>
          <div className="terminal-body">
            <div className="section-label">services</div>
            <h2 className="section-title">Lessons &amp; Event Experiences</h2>
            <div className="section-divider" />
            <p className="terminal-cmd">
              <span className="cmd-prompt">$</span>{' '}
              ./list_packages --location="St. Louis, MO" --travel=true
            </p>
            <div className="services-grid">
              {TIERS.map(t => (
                <div key={t.slug} className={`service-card${t.featured ? ' featured' : ''}`}>
                  <div className="service-tier">{t.slug}</div>
                  <div className="service-name">{t.name}</div>
                  <div className="service-size">{t.size}</div>
                  {t.isContact ? (
                    <div className="service-price contact-text">contact_for_pricing()</div>
                  ) : (
                    <div className="service-price">
                      <span className="dollar">$</span>{t.price}
                    </div>
                  )}
                  <ul className="service-features">
                    {t.features.map(f => <li key={f}>{f}</li>)}
                  </ul>
                </div>
              ))}
            </div>
            <div className="terminal-note">
              <span>// <strong>location:</strong> St. Louis, MO</span>
              <span>// <strong>travel:</strong> available</span>
              <span>// <strong>payment:</strong> PayPal | Venmo</span>
              <span>// <strong>equipment:</strong> all provided</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
