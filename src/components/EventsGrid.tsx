interface GridEvent {
  id: string
  period: string
  status: 'auth' | 'classified'
  name: string
  desc: string
  badge?: string
}

const EVENTS: GridEvent[] = [
  {
    id: 'defcon',
    period: 'ANNUAL',
    status: 'auth',
    name: 'DEF CON',
    desc: "Lockpicking village instructor at the world's largest hacker conference. Las Vegas, NV. Running the locksport village and teaching hundreds of attendees each year.",
  },
  {
    id: 'zdq',
    period: 'INVITE ONLY',
    status: 'classified',
    name: 'Microsoft\nZero Day Quest',
    desc: 'Exclusive invite-only event for vulnerability researchers. Lockpicking experience specialist at one of the most selective security events in the world.',
    badge: 'INVITE ONLY',
  },
  {
    id: 'bluehat',
    period: 'CORPORATE',
    status: 'auth',
    name: 'Microsoft Blue Hat',
    desc: "Lockpicking demos & workshops at Microsoft's internal security conference.",
  },
  {
    id: 'bsides-kc',
    period: 'MIDWEST',
    status: 'auth',
    name: 'BSides Kansas City',
    desc: 'Locksport village instructor at the community cybersecurity conference.',
  },
  {
    id: 'bsides-sea',
    period: 'PACIFIC NW',
    status: 'auth',
    name: 'BSides Seattle',
    desc: 'Locksport instructor on the Microsoft campus in Redmond, WA.',
  },
  {
    id: 'paxwest',
    period: 'GAMING',
    status: 'auth',
    name: 'PAX West Gaming Convention',
    desc: "Brought locksport to gaming audiences at one of North America's largest gaming expos. Seattle, WA.",
  },
  {
    id: 'hushcon',
    period: 'SECURITY',
    status: 'auth',
    name: 'HushCon Seattle',
    desc: 'Workshop facilitator at the Pacific NW security community conference.',
  },
  {
    id: 'campout',
    period: 'OUTDOOR',
    status: 'auth',
    name: 'Hacker Campout Seattle',
    desc: "Locksport instructor at Seattle's outdoor hacker camping event — picking locks under the stars.",
  },
  {
    id: 'umsl',
    period: 'EDU',
    status: 'auth',
    name: "UMSL Women's Hackathon",
    desc: 'Educational locksport for students at the University of Missouri–St. Louis.',
  },
]

export default function EventsGrid() {
  return (
    <section className="events-grid-section" id="clearance">
      <div className="container">
        <div className="clearance-banner">
          <span>■ OPERATOR CLEARANCE RECORD</span>
        </div>
        <div className="section-label">event_history</div>
        <h2 className="section-title">Events &amp; Operations</h2>
        <div className="section-divider" />
        <div className="events-bento">
          {EVENTS.map(e => (
            <div key={e.id} className={`event-card eb-${e.id}`}>
              <div className="event-card-top">
                <span className="event-period">{e.period}</span>
                <span className={`event-status status-${e.status}`}>
                  {e.status === 'auth' ? 'AUTHORIZED' : 'CLASSIFIED'}
                </span>
              </div>
              <div className="event-name">
                {e.name.split('\n').map((line, i) => (
                  <span key={i}>{line}{i < e.name.split('\n').length - 1 && <br />}</span>
                ))}
              </div>
              <div className="event-desc">{e.desc}</div>
              {e.badge && <div className="event-badge">{e.badge}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
