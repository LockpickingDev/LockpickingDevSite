const TOP3 = [
  {
    id: 'defcon',
    accent: 'cyan',
    stat: "World's Premier Hacker Conference",
    category: 'Security Conference · Annual',
    name: 'DEF CON',
    location: 'Las Vegas, NV',
    desc: "Started by teaching hundreds of attendees each year how to pick their first lock at the Locksport Village, later stepping into a leadership role helping run the village. Currently working with the Physical Security Village, teaching lock bypass techniques at one of the world's most recognized hacker conferences.",
  },
  {
    id: 'zdq',
    accent: 'amber',
    stat: 'Invitation Only',
    category: 'Invite Only · Microsoft',
    name: 'Microsoft Zero Day Quest',
    location: 'Redmond, WA',
    desc: "Invited to participate in Microsoft Zero Day Quest, an exclusive, invitation-only event for top vulnerability researchers. Served as the lockpicking and key impressioning specialist, providing hands-on physical security insight alongside cutting-edge digital research.",
    badge: 'Invite Only',
  },
  {
    id: 'paxwest',
    accent: 'blue',
    stat: '100,000+ Attendees',
    category: 'Gaming Expo',
    name: 'PAX West',
    location: 'Seattle, WA',
    desc: "Presented at PAX West, one of North America's largest gaming conventions, delivering a talk on the realism of lockpicking mechanics in video games. Followed by hands-on workshops where attendees learned to pick real locks.",
    watchUrl: 'https://www.youtube.com/watch?v=xhBGZLzKN-Q',
  },
]

const REST = [
  {
    id: 'bluehat',
    category: 'Corporate Conference · Microsoft',
    name: 'Microsoft Blue Hat',
    location: 'Redmond, WA',
    desc: "Microsoft's internal security conference for their engineering and research teams. Ran lockpicking demos and hands-on workshops, giving their security professionals a real-world look at physical lock security.",
  },
  {
    id: 'shmoocon',
    category: 'Security Conference',
    name: 'ShmooCon',
    location: 'Washington, DC',
    desc: "One of the most respected East Coast security conferences before it concluded its run, bringing together researchers, professionals, and hobbyists. Led hands-on lockpicking instruction, helping attendees quickly go from no experience to opening their first locks.",
  },
  {
    id: 'layerone',
    category: 'Security Conference',
    name: 'LayerOne',
    location: 'Los Angeles, CA',
    desc: "A long-running, community-driven security conference with deep roots in hacker culture. Led locksport instruction and hands-on sessions, teaching practical lockpicking skills to a technically curious audience.",
  },
  {
    id: 'bssea',
    category: 'Community Conference',
    name: 'BSides Seattle',
    location: 'Redmond, WA',
    desc: "Community security conference hosted on the Microsoft campus. Ran locksport instruction for a mix of security industry veterans and curious first-timers.",
  },
  {
    id: 'bskc',
    category: 'Community Conference',
    name: 'BSides Kansas City',
    location: 'Kansas City, MO',
    desc: "Community-run security conference outside the big-budget show circuit. Ran the locksport village and taught hands-on picking sessions.",
  },
  {
    id: 'hushcon',
    category: 'Security Community',
    name: 'HushCon Seattle',
    location: 'Seattle, WA',
    desc: "An intimate Pacific NW security conference where everyone in the room is passionate about what they do. Ran locksport instruction for a tight-knit community of enthusiasts.",
  },
  {
    id: 'magfest',
    category: 'Gaming & Music Festival',
    name: 'Super MAGFest',
    location: 'National Harbor, MD',
    desc: "One of the largest gaming and music festivals on the East Coast, known for its creative, maker-friendly crowd. Ran hands-on locksport workshops teaching attendees everything from picking their first lock to defeating handcuffs and escaping restraints.",
  },
  {
    id: 'umsl',
    category: 'University',
    name: "UMSL Women's Hackathon",
    location: 'St. Louis, MO',
    desc: "Led an educational locksport workshop at the University of Missouri–St. Louis. The key idea: digital security means nothing if physical security is overlooked.",
  },
]

export default function EventsGridV2() {
  return (
    <section className="ev2-section" id="clearance">
      <div className="container">
        <div className="section-label">events</div>
        <h2 className="section-title">Appearances & Instruction</h2>
        <div className="section-divider" />

        <div className="ev2-top3">
          {TOP3.map(e => (
            <div key={e.id} className={`ev2-card ev2-card--${e.accent}`}>
              <div className="ev2-stat">{e.stat}</div>
              <div className="ev2-category">{e.category}</div>
              <div className="ev2-name">{e.name}</div>
              <div className="ev2-location">{e.location}</div>
              <p className="ev2-desc">{e.desc}</p>
              {e.watchUrl && (
                <a href={e.watchUrl} className="ev2-watch" target="_blank" rel="noreferrer">
                  ▶ Watch the Talk
                </a>
              )}
              {e.badge && <div className="ev2-badge">{e.badge}</div>}
            </div>
          ))}
        </div>

        <div className="ev2-rest">
          {REST.map(e => (
            <div key={e.id} className="ev2-rest-row">
              <div className="ev2-rest-left">
                <div className="ev2-rest-name">{e.name}</div>
                <div className="ev2-rest-meta">{e.category} · {e.location}</div>
              </div>
              <div className="ev2-rest-desc">{e.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
