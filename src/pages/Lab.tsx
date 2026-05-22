import { Link } from 'react-router-dom'

// Add your favorite YouTube video IDs here.
// Get the ID from the URL: youtube.com/watch?v=VIDEO_ID
const VIDEOS = [
  { id: 'REPLACE_ME', title: 'Add your favorite video title here' },
  { id: 'REPLACE_ME', title: 'Add your favorite video title here' },
  { id: 'REPLACE_ME', title: 'Add your favorite video title here' },
  { id: 'REPLACE_ME', title: 'Add your favorite video title here' },
]

interface Project {
  name: string
  status: 'live' | 'active' | 'wip' | 'paused'
  statusLabel: string
  desc: string
  link?: string
  tags: string[]
}

const PROJECTS: Project[] = [
  {
    name: 'Gateway Locksport',
    status: 'live',
    statusLabel: 'LIVE',
    desc: "Founded and run St. Louis's premier locksport meetup community. Regular events, growing membership, and a hub for locksport enthusiasts across the Midwest.",
    link: 'https://www.gatewaylocksport.com',
    tags: ['Community', 'Web', 'Locksport'],
  },
  {
    name: 'LockpickingDev YouTube',
    status: 'active',
    statusLabel: 'ACTIVE',
    desc: 'Building a locksport education channel covering picking techniques, lock reviews, community content, and event coverage.',
    link: 'https://www.youtube.com/@LockpickingDev',
    tags: ['Content', 'Education', 'Video'],
  },
  {
    name: 'Add a Project',
    status: 'wip',
    statusLabel: 'WIP',
    desc: 'Describe something you are currently building, tinkering with, or experimenting on. Locks, code, hardware — anything goes.',
    tags: ['Your', 'Tags', 'Here'],
  },
  {
    name: 'Add a Project',
    status: 'paused',
    statusLabel: 'PAUSED',
    desc: 'Got something on the backburner? Show it off here. Even incomplete or paused projects are worth sharing.',
    tags: ['Your', 'Tags', 'Here'],
  },
]

const STATUS_COLOR: Record<Project['status'], string> = {
  live: 'var(--green)',
  active: 'var(--cyan)',
  wip: 'var(--amber)',
  paused: 'var(--gray)',
}

export default function Lab() {
  return (
    <>
      {/* LAB HERO */}
      <section className="lab-hero">
        <div className="lab-hero-content">
          <div className="lab-breadcrumb">
            <Link to="/" className="lab-back">&lt; cd ..</Link>
          </div>
          <div className="lab-eyebrow">$ cd /lab</div>
          <h1 className="lab-title">
            The <span className="cyan">Lab</span>
            <span className="hero-cursor" />
          </h1>
          <p className="lab-subtitle">
            <span className="comment">// </span>
            Not selling anything here. Just sharing what I enjoy.
          </p>
          <p className="lab-desc">
            Favorite picks from the channel, projects I'm building, and whatever else I'm into.
            The fun side of being LockpickingDev.
          </p>
        </div>
      </section>

      {/* VIDEOS */}
      <section className="lab-section" id="videos">
        <div className="container">
          <div className="section-label">youtube</div>
          <h2 className="section-title">Favorite Videos</h2>
          <div className="section-divider" />
          <p className="lab-section-desc">
            Some of my favorite picks from the channel — techniques, challenges, and moments I'm proud of.
          </p>

          <div className="videos-grid">
            {VIDEOS.map((v, i) => (
              <div key={i} className="video-card">
                <div className="video-terminal-bar">
                  <span className="terminal-dot t-red" />
                  <span className="terminal-dot t-yellow" />
                  <span className="terminal-dot t-green" />
                  <span className="terminal-title">{v.title}</span>
                </div>
                {v.id === 'REPLACE_ME' ? (
                  <div className="video-placeholder">
                    <div className="video-placeholder-icon">▶</div>
                    <div className="video-placeholder-text">
                      Add a YouTube video ID in <code>Lab.tsx</code>
                    </div>
                  </div>
                ) : (
                  <iframe
                    className="video-embed"
                    src={`https://www.youtube.com/embed/${v.id}`}
                    title={v.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                )}
              </div>
            ))}
          </div>

          <div className="lab-channel-link">
            <span className="comment">// see everything →</span>
            <a
              href="https://www.youtube.com/@LockpickingDev"
              target="_blank"
              rel="noreferrer"
              className="cyan-link"
            >
              youtube.com/@LockpickingDev
            </a>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section className="lab-section lab-section-alt" id="projects">
        <div className="container">
          <div className="section-label">projects</div>
          <h2 className="section-title">Builds &amp; Projects</h2>
          <div className="section-divider" />
          <p className="lab-section-desc">
            Things I've built, things I'm building, and things I'll eventually get back to.
          </p>

          <div className="projects-grid">
            {PROJECTS.map((p, i) => (
              <div key={i} className="project-card">
                <div className="project-card-top">
                  <span
                    className="project-status-dot"
                    style={{ background: STATUS_COLOR[p.status] }}
                  />
                  <span className="project-status-label" style={{ color: STATUS_COLOR[p.status] }}>
                    {p.statusLabel}
                  </span>
                </div>
                <div className="project-name">{p.name}</div>
                <div className="project-desc">{p.desc}</div>
                <div className="project-tags">
                  {p.tags.map(t => (
                    <span key={t} className="project-tag">{t}</span>
                  ))}
                </div>
                {p.link && (
                  <a href={p.link} target="_blank" rel="noreferrer" className="project-link">
                    → {p.link.replace('https://', '')}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
