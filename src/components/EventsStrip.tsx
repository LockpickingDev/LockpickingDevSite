const EVENTS = [
  'DEF CON',
  'Microsoft Blue Hat Security Conference',
  'Microsoft Zero Day Quest',
  'BSides Kansas City',
  'BSides Seattle',
  'HushCon Seattle',
  'Hacker Campout Seattle',
  'PAX West',
  "UMSL Women's Hackathon",
]

export default function EventsStrip() {
  return (
    <div className="ticker">
      <div className="ticker-track">
        {[...EVENTS, ...EVENTS].map((event, i) => (
          <span key={i} className="ticker-item">{event}</span>
        ))}
      </div>
    </div>
  )
}
