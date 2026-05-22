interface Entry {
  period: string
  status: 'auth' | 'classified'
  name: string
  desc: string
  badge?: string
}

const ENTRIES: Entry[] = [
  {
    period: 'ANNUAL',
    status: 'auth',
    name: 'DEF CON',
    desc: "Lockpicking village instructor at the world's largest hacker conference. Las Vegas, NV.",
  },
  {
    period: 'INVITE ONLY',
    status: 'classified',
    name: 'Microsoft Zero Day Quest',
    desc: 'Exclusive invite-only event for vulnerability researchers. Lockpicking experience specialist.',
    badge: 'INVITE ONLY',
  },
  {
    period: 'CORPORATE',
    status: 'auth',
    name: 'Microsoft Blue Hat Security Conference',
    desc: "Lockpicking demonstrations and workshops for Microsoft's internal security conference.",
  },
  {
    period: 'MULTI-CITY',
    status: 'auth',
    name: 'BSides Kansas City & BSides Seattle',
    desc: 'Locksport village instructor at community-driven cybersecurity conferences across the Midwest and Pacific Northwest.',
  },
  {
    period: 'GAMING',
    status: 'auth',
    name: 'PAX West Gaming Convention',
    desc: "Brought locksport to gaming audiences at one of North America's largest gaming expos. Seattle, WA.",
  },
  {
    period: 'SECURITY',
    status: 'auth',
    name: 'HushCon Seattle & Hacker Campout Seattle',
    desc: 'Pacific Northwest security community events. Workshop facilitator and locksport instructor.',
  },
  {
    period: 'EDU',
    status: 'auth',
    name: "UMSL Women's Hackathon",
    desc: 'Educational locksport experience for students at the University of Missouri–St. Louis hackathon.',
  },
]

export default function Timeline() {
  return (
    <section className="timeline-section" id="clearance">
      <div className="container">
        <div className="clearance-banner">
          <span>■ OPERATOR CLEARANCE RECORD</span>
        </div>
        <div className="section-label">event_history</div>
        <h2 className="section-title">Events &amp; Operations</h2>
        <div className="section-divider" />
        <div className="timeline">
          {ENTRIES.map(e => (
            <div key={e.name} className="timeline-item">
              <div className="timeline-meta">
                <span className="timeline-year">{e.period}</span>
                <span className={`timeline-status status-${e.status}`}>
                  {e.status === 'auth' ? 'AUTHORIZED' : 'CLASSIFIED'}
                </span>
              </div>
              <div className="timeline-content">
                <div className="timeline-event-name">{e.name}</div>
                <div className="timeline-desc">{e.desc}</div>
              </div>
              {e.badge && <span className="timeline-badge">{e.badge}</span>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
