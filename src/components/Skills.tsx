interface Skill {
  icon: string
  name: string
  desc: string
  level: number
}

const SKILLS: Skill[] = [
  {
    icon: '🔒',
    name: 'Single Pin Picking',
    desc: 'Precision technique for manipulating individual pins in pin tumbler locks. The foundation of locksport.',
    level: 5,
  },
  {
    icon: '🔑',
    name: 'Bypass Techniques',
    desc: 'Non-destructive entry methods — shimming, decoding, and other non-pick bypass approaches.',
    level: 4,
  },
  {
    icon: '🗄️',
    name: 'Safe Manipulation',
    desc: 'Decoding combination safes by feel and sound. Provided service to antique shops throughout St. Louis.',
    level: 4,
  },
  {
    icon: '🎓',
    name: 'Locksport Education',
    desc: 'Teaching ethical locksport to audiences ranging from complete beginners to cybersecurity professionals.',
    level: 5,
  },
]

export default function Skills() {
  return (
    <section className="skills-section" id="skills">
      <div className="container">
        <div className="section-label">capabilities</div>
        <h2 className="section-title">Skill Set</h2>
        <div className="section-divider" />
        <div className="skills-grid">
          {SKILLS.map(s => (
            <div key={s.name} className="skill-card">
              <div className="skill-icon">{s.icon}</div>
              <div className="skill-name">{s.name}</div>
              <div className="skill-desc">{s.desc}</div>
              <div className="skill-level">
                {Array.from({ length: 5 }, (_, i) => (
                  <div key={i} className={`skill-pip${i < s.level ? ' active' : ''}`} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
