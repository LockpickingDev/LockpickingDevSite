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
              I'm LockpickingDev - a locksport practitioner, educator, and founder of{' '}
              <a href="https://www.gatewaylocksport.com" target="_blank" rel="noopener noreferrer" className="cyan-link">
                Gateway Locksport
              </a>
              , a St. Louis-based community centered around hands-on lockpicking and physical security.
            </p>
            <p className="about-p">
              Through my{' '}
              <a href="https://www.youtube.com/@LockpickingDev" target="_blank" rel="noopener noreferrer" className="cyan-link">
                YouTube channel
              </a>
              {' '}and in-person workshops, I've taught everyone from complete beginners to cybersecurity
              influencers and California State Representatives. I've also led instruction at events like{' '}
              <a href="https://defcon.org/index.html" target="_blank" rel="noopener noreferrer" className="cyan-link">
                DEF CON
              </a>
              ,{' '}
              <a href="https://www.microsoft.com/en-us/msrc/zero_day_quest_live_hacking_event" target="_blank" rel="noopener noreferrer" className="cyan-link">
                Microsoft Zero Day Quest
              </a>
              , and{' '}
              <a href="https://west.paxsite.com/" target="_blank" rel="noopener noreferrer" className="cyan-link">
                PAX West
              </a>
              .
            </p>
            <p className="about-p">
              Everything I teach is grounded in ethical, responsible locksport, with a focus on making
              it approachable, practical, and fun to learn.
            </p>
          </div>
          <div className="profile-card">
            <div className="profile-card-header">Quick Facts</div>
            <div className="profile-card-body">
              <div className="profile-row"><span className="pkey">Based in</span><span className="pval">St. Louis, MO</span></div>
              <div className="profile-row"><span className="pkey">Role</span><span className="pval">Locksport Educator</span></div>
              <div className="profile-row"><span className="pkey">Community</span><span className="pval">Lockpickers United</span></div>
              <div className="profile-row"><span className="pkey">Events</span><span className="pnum">22+ major events</span></div>
              <div className="profile-row"><span className="pkey">Students Taught</span><span className="pval">2000+</span></div>
              <div className="profile-row"><span className="pkey">Travel</span><span className="pval">Available</span></div>
              <div className="profile-row"><span className="pkey">All Equipment</span><span className="pval">Provided</span></div>
              <div className="profile-row"><span className="pkey">YouTube</span><span className="pval"><a href="https://www.youtube.com/@LockpickingDev" target="_blank" rel="noopener noreferrer" className="cyan-link">@LockpickingDev</a></span></div>
              <div className="profile-row"><span className="pkey">Facebook</span><span className="pval"><a href="https://www.facebook.com/LockpickingDevOfficial/" target="_blank" rel="noopener noreferrer" className="cyan-link">LockpickingDevOfficial</a></span></div>
              <div className="profile-row"><span className="pkey">Instagram</span><span className="pval"><a href="https://www.instagram.com/lockpickingdev/" target="_blank" rel="noopener noreferrer" className="cyan-link">@lockpickingdev</a></span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
