interface GridEvent {
  id: string
  category: string
  name: string
  location?: string
  desc: string
  badge?: string
  featured?: boolean
  special?: boolean
  watchUrl?: string
}

const EVENTS: GridEvent[] = [
  {
    id: 'defcon',
    category: 'Security Conference · Annual',
    name: 'DEF CON',
    location: 'Las Vegas, NV',
    desc: "Started by teaching hundreds of attendees each year how to pick their first lock at the Locksport Village, later stepping into a leadership role helping run the village. Currently working with the Physical Security Village, teaching lock bypass techniques at DEF CON — one of the world\’s most recognized hacker conferences.",
    featured: true,
  },
  {
    id: 'zdq',
    category: 'Invite Only · Microsoft',
    name: 'Microsoft Zero Day Quest',
    location: 'Redmond, WA',
    desc: "Invited to participate in Microsoft Zero Day Quest, an exclusive, invitation-only event for top vulnerability researchers. Served as the lockpicking and key impressioning specialist, providing hands-on physical security insight alongside cutting-edge digital research.",
    special: true,
    badge: 'Invite Only',
  },
  {
    id: 'paxwest',
    category: 'Gaming Expo',
    name: 'PAX West',
    location: 'Seattle, WA',
    desc: "Presented at PAX West, one of North America’s largest gaming conventions (100,000+ attendees), delivering a talk on the realism of lockpicking mechanics in video games. Followed by hands-on workshops where attendees learned to pick real locks.",
    watchUrl: 'https://www.youtube.com/watch?v=xhBGZLzKN-Q',
  },
  {
    id: 'bluehat',
    category: 'Corporate Conference · Microsoft',
    name: 'Microsoft Blue Hat',
    location: 'Redmond, WA',
    desc: "Microsoft's internal security conference for their own engineering and research teams. Ran lockpicking demos and hands-on workshops, giving Microsoft's security professionals a real-world look at what physical lock security actually feels like.",
  },
  {
    id: 'bssea',
    category: 'Community Conference',
    name: 'BSides Seattle',
    location: 'Redmond, WA',
    desc: "Community security conference hosted on the Microsoft campus in Redmond. Ran locksport instruction for a mix of security industry veterans and curious first-timers.",
  },
  {
    id: 'bskc',
    category: 'Community Conference',
    name: 'BSides Kansas City',
    location: 'Kansas City, MO',
    desc: "BSides events are community-run security conferences held outside the big-budget show circuit. Ran the locksport village and taught hands-on picking sessions at the Kansas City edition.",
  },
  {
    id: 'hushcon',
    category: 'Security Community',
    name: 'HushCon Seattle',
    location: 'Seattle, WA',
    desc: "An intimate Pacific NW security conference where everyone in the room is passionate about what they do. Ran locksport instruction for a tight-knit community of security enthusiasts.",
  },
  {
    id: 'umsl',
    category: 'University',
    name: "UMSL Women's Hackathon",
    location: 'St. Louis, MO',
    desc: "Led an educational locksport workshop at the University of Missouri - St. Louis.  The key idea: digital security means nothing if physical security is overlooked.",
  },
]

export default function EventsGrid() {
  return (
    <section className="events-grid-section" id="clearance">
      <div className="container">
        <div className="section-label">appearances</div>
        <h2 className="section-title">Events &amp; Operations</h2>
        <div className="section-divider" />
        <div className="events-list">
          {EVENTS.map(e => (
            <div
              key={e.id}
              className={`event-row${e.featured ? ' ev-featured' : ''}${e.special ? ' ev-special' : ''}`}
            >
              <div className="ev-left">
                <div className="ev-category">{e.category}</div>
                <div className="ev-name">{e.name}</div>
                {e.location && <div className="ev-location">{e.location}</div>}
              </div>
              <div className="ev-right">
                <div className="ev-desc">{e.desc}</div>
                {e.watchUrl && (
                  <a href={e.watchUrl} className="ev-watch-link" target="_blank" rel="noreferrer">
                    ▶ Watch the Talk on YouTube
                  </a>
                )}
                {e.badge && <div className="ev-badge">{e.badge}</div>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
