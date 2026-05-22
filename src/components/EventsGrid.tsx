interface GridEvent {
  id: string
  eyebrow: string
  name: string
  desc: string
  badge?: string
}

const EVENTS: GridEvent[] = [
  {
    id: 'defcon',
    eyebrow: 'Security Conference · Annual · Las Vegas, NV',
    name: 'DEF CON',
    desc: 'Previously taught lockpicking and ran the locksport village. Now teaching bypass techniques with the Physical Security Village.',
  },
  {
    id: 'zdq',
    eyebrow: 'Invite Only · Microsoft',
    name: 'Microsoft\nZero Day Quest',
    desc: 'Exclusive invite-only event for vulnerability researchers. Lockpicking and key impressioning experience specialist at one of the most selective security events in the world.',
    badge: 'Invite Only',
  },
  {
    id: 'bluehat',
    eyebrow: 'Corporate Conference · Microsoft',
    name: 'Microsoft Blue Hat',
    desc: "Lockpicking demos & workshops at Microsoft's internal security conference.",
  },
  {
    id: 'bskc',
    eyebrow: 'Community Conference · Midwest',
    name: 'BSides Kansas City',
    desc: 'Locksport village instructor at the community cybersecurity conference.',
  },
  {
    id: 'bssea',
    eyebrow: 'Community Conference · Redmond, WA',
    name: 'BSides Seattle',
    desc: 'Locksport instructor on the Microsoft campus in Redmond, WA.',
  },
  {
    id: 'paxwest',
    eyebrow: 'Gaming Expo · Seattle, WA',
    name: 'PAX West',
    desc: "Gave a presentation on lockpicking in video games followed by a hands-on lockpicking instructional, teaching attendees to pick locks and experience the real thing. Brought locksport to gaming audiences at one of North America's largest gaming expos.",
  },
  {
    id: 'hushcon',
    eyebrow: 'Security Community · Pacific NW',
    name: 'HushCon Seattle',
    desc: 'Locksport instructor at the Pacific NW security community conference.',
  },
  {
    id: 'umsl',
    eyebrow: 'University · St. Louis, MO',
    name: "UMSL Women's Hackathon",
    desc: 'Educational locksport for students at the University of Missouri–St. Louis.',
  },
]

export default function EventsGrid() {
  return (
    <section className="events-grid-section" id="clearance">
      <div className="container">
        <div className="section-label">appearances</div>
        <h2 className="section-title">Events &amp; Operations</h2>
        <div className="section-divider" />
        <div className="events-magazine">
          {EVENTS.map(e => (
            <div key={e.id} className={`event-card-new em-${e.id}`}>
              <div className="ec-eyebrow">{e.eyebrow}</div>
              <div className="ec-name">
                {e.name.split('\n').map((line, i) => (
                  <span key={i}>{line}{i < e.name.split('\n').length - 1 && <br />}</span>
                ))}
              </div>
              <div className="ec-desc">{e.desc}</div>
              {e.badge && <div className="ec-badge">{e.badge}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
