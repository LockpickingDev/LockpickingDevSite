interface Tier {
  slug: string
  icon: string
  name: string
  tagline: string
  size: string
  price: string
  isContact?: boolean
  bookNow?: boolean
  features: string[]
  featured?: boolean
}

const TIERS: Tier[] = [
  {
    slug: 'private_group',
    icon: '🎯',
    name: 'Private Group',
    tagline: 'Perfect for date nights, friend groups & small celebrations',
    size: 'Up to 5 people',
    price: '300',
    bookNow: true,
    features: ['Hands-on personal instruction', 'All picks & locks provided', '~2 hour session'],
  },
  {
    slug: 'standard',
    icon: '👥',
    name: 'Standard',
    tagline: 'Ideal for team-building, meetups & group outings',
    size: '6–15 people',
    price: '450',
    featured: true,
    features: ['Group instruction + 1-on-1', 'All equipment provided', '~2.5 hour session'],
  },
  {
    slug: 'large_group',
    icon: '🏢',
    name: 'Large Group',
    tagline: 'Full workshop experience for corporate & bigger gatherings',
    size: '16–25 people',
    price: '650+',
    features: ['Full workshop format', 'Multiple skill stations', '~3 hour session'],
  },
  {
    slug: 'convention_village',
    icon: '🎪',
    name: 'Convention Village',
    tagline: 'End-to-end locksport village for conferences & conventions',
    size: '25+ people',
    price: '',
    isContact: true,
    features: ['Full lockpicking village', 'Multi-table, multi-skill', 'Custom scope & duration'],
  },
]

export default function Services() {
  return (
    <section className="services-section" id="services">
      <div className="container">
        <div className="section-label">services</div>
        <h2 className="section-title">Lessons &amp; Event Experiences</h2>
        <div className="section-divider" />
        <p className="services-intro">
          Tools and practice locks are provided for use during the workshop. Lock picks and training locks will also be available for purchase for those who want to continue practicing after the session. Based in St. Louis with travel available. Travel fees may apply for events outside the local area.
        </p>
        <div className="services-grid">
          {TIERS.map(t => (
            <div key={t.slug} className={`service-card${t.featured ? ' featured' : ''}`}>
              {t.featured && <div className="service-most-popular">★ Most Popular</div>}
              <div className="service-card-icon">{t.icon}</div>
              <div className="service-name">{t.name}</div>
              <div className="service-tagline">{t.tagline}</div>
              <div className="service-size">{t.size}</div>
              {t.isContact ? (
                <div className="service-price contact-text">Contact for pricing</div>
              ) : (
                <div className="service-price">
                  <span className="dollar">$</span>{t.price}
                </div>
              )}
              <ul className="service-features">
                {t.features.map(f => <li key={f}>{f}</li>)}
              </ul>
              <a
                href="#contact"
                className={`service-cta${t.featured ? '' : ' service-cta-outline'}`}
              >
                {t.isContact ? 'Get in Touch' : (t.featured || t.bookNow) ? 'Book Now' : 'Get a Quote'}
              </a>
            </div>
          ))}
        </div>
        <div className="services-info-row">
          <span><strong>Location:</strong> St. Louis, MO</span>
          <span><strong>Travel:</strong> Available</span>
          <span><strong>Payment:</strong> PayPal · Venmo</span>
          <span><strong>Equipment:</strong> All provided</span>
        </div>
      </div>
    </section>
  )
}
