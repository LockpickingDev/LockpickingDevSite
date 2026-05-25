export default function About() {
  return (
    <section className="about-section" id="about">
      <div className="container">
        <div className="section-label">about</div>
        <h2 className="section-title">Who is LockpickingDev?</h2>
        <div className="section-divider" />
        <div className="about-two-col">
          <div>
            <p className="about-p">
              I'm LockpickingDev — a locksport practitioner, educator, and founder of{' '}
              <a href="https://www.gatewaylocksport.com" target="_blank" rel="noreferrer" className="cyan-link">
                Gateway Locksport
              </a>
              , St. Louis's premier locksport meetup and community.
            </p>
            <p className="about-p">
              I've taught cybersecurity influencers, California State Representatives, and run full
              lockpicking villages at DEF CON, Microsoft's invite-only Zero Day Quest, PAX West, and
              more. I've also decoded safes for antique shops throughout the St. Louis area.
            </p>
            <p className="about-p">
              My approach is grounded in ethics, responsibility, and genuine passion for making
              locksport accessible — whether you're a beginner at a birthday party or a security
              professional at a major conference.
            </p>
          </div>
          <div className="profile-card">
            <div className="profile-card-header">Quick Facts</div>
            <div className="profile-card-body">
              <div className="profile-row"><span className="pkey">Based in</span><span className="pval">St. Louis, MO</span></div>
              <div className="profile-row"><span className="pkey">Role</span><span className="pval">Locksport Educator</span></div>
              <div className="profile-row"><span className="pkey">Community</span><span className="pval">Gateway Locksport</span></div>
              <div className="profile-row"><span className="pkey">Events</span><span className="pnum">9+ major events</span></div>
              <div className="profile-row"><span className="pkey">Students Taught</span><span className="pval">500+</span></div>
              <div className="profile-row"><span className="pkey">Travel</span><span className="pval">Available</span></div>
              <div className="profile-row"><span className="pkey">All Equipment</span><span className="pval">Provided</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
