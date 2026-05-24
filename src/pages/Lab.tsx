import { useState } from 'react'
import { Link } from 'react-router-dom'

// Add your favorite YouTube video IDs here.
// Get the ID from the URL: youtube.com/watch?v=VIDEO_ID
const VIDEOS = [
  { id: 'JwEFbeoMijg', title: '100 Lockpicking Hiking Locations Compilation' },
  { id: 'j036yjyKlmQ', title: 'How to Pick Handcuffs with a Bobby Pin' },
  { id: 'qc5ulBP_lgc', title: 'How to Shim & Bypass Handcuffs' },
  { id: '3mShtKSY5tY', title: 'Making Custom Lockpicks Part 1' },
  { id: 'i7gy1KSPJqg', title: 'Assa 600 Picked and Gutted' },
  { id: 'xe-fdHeNf5o', title: 'Mul-T-Lock Interactive with Serrated Drivers Picked and Gutted' },
  { id: 'BkpNt4auWRs', title: 'Assa Desmo Picked and Gutted' },
  { id: 'kBj3VXKfLHc', title: 'Mul-T-Lock C-13 Padlock Picked' },
  { id: 'P8XHhY9uow0', title: 'Master Lock 570 Picked AND Gutted! How to make a 570/575 Practice Lock' },
  { id: '-49I4SM0kfY', title: 'Master Lock 575 Picked AND Gutted' },
  { id: 'QVmBfQVxYmk', title: 'American Lock 1100 Speed Picking' },
  { id: 'PqZeR26oxVo', title: 'Rifkin Co ArcoLock, 7-Pin Bank Deposit Bag Lock Picked' },
  { id: 'kwtmc6kMVTs', title: 'Abus Titalium 80TI 50 Picked AND Gutted & How to Make a Titalium Practice Lock' },
  { id: 'hqdmQIjxE-k', title: 'How to Make Multi-Dong Picks (Honest Dong Shi Handle w Multipick tips)' },
  { id: 'Ki1nydPQO3U', title: '3D Printing, Silicone Molds, & Craft Resin for Locksport' },
  { id: 'PufrnWWWlKY', title: 'Lockpicks Handles - Thickness, Density, and Feedback' },
  { id: '6j8hKs6R0q4', title: 'How to Make Interchangeable Lockpick Handles' },
  { id: 'np33mdyEa5g', title: 'Silver Bird Padlock Picked with Different Homebrew Turner Tools' },
]

const VIDEOS_INITIAL = 4
const VIDEOS_PAGE = 8

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
  const [videoCount, setVideoCount] = useState(VIDEOS_INITIAL)
  const visibleVideos = VIDEOS.slice(0, videoCount)
  const videoRemaining = VIDEOS.length - videoCount

  return (
    <>
      {/* LAB HERO */}
      <section className="lab-hero">
        <div className="lab-hero-content">
          <div className="lab-breadcrumb">
            <Link to="/" className="lab-back">← Back to Home</Link>
          </div>
          <h1 className="lab-title">
            The <span className="cyan">Lab</span>
            <span className="hero-cursor" />
          </h1>
          <p className="lab-subtitle">
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
            {visibleVideos.map((v, i) => (
              <div key={i} className="video-card">
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
                <div className="video-caption">{v.title}</div>
              </div>
            ))}
          </div>

          {VIDEOS.length > VIDEOS_INITIAL && (
            videoRemaining > 0 ? (
              <button
                className="show-more-btn"
                onClick={() => setVideoCount(c => Math.min(c + VIDEOS_PAGE, VIDEOS.length))}
              >
                {`Show More · ${Math.min(VIDEOS_PAGE, videoRemaining)} more video${Math.min(VIDEOS_PAGE, videoRemaining) === 1 ? '' : 's'} ↓`}
              </button>
            ) : (
              <button className="show-more-btn" onClick={() => setVideoCount(VIDEOS_INITIAL)}>
                Show Less ↑
              </button>
            )
          )}

          <div className="lab-channel-link">
            <span>See everything →</span>
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
