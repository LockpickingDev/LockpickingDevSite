import { Helmet } from 'react-helmet-async'

interface LinkItem {
  platform: string
  handle: string
  url: string
  color: string
  icon: React.ReactNode
}

const LINKS: LinkItem[] = [
  {
    platform: 'YouTube',
    handle: '@LockpickingDev',
    url: 'https://www.youtube.com/@LockpickingDev',
    color: '#FF0000',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M22 14s0-3-.4-4.4a2.4 2.4 0 0 0-1.7-1.7C18.5 7.5 14 7.5 14 7.5s-4.5 0-5.9.4a2.4 2.4 0 0 0-1.7 1.7C6 11 6 14 6 14s0 3 .4 4.4a2.4 2.4 0 0 0 1.7 1.7C9.5 20.5 14 20.5 14 20.5s4.5 0 5.9-.4a2.4 2.4 0 0 0 1.7-1.7C22 17 22 14 22 14Z" fill="#FF0000"/>
        <polygon points="12,11.2 17.5,14 12,16.8" fill="white"/>
      </svg>
    ),
  },
  {
    platform: 'Instagram',
    handle: '@LockpickingDev',
    url: 'https://www.instagram.com/lockpickingdev/',
    color: '#bc1888',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <defs>
          <linearGradient id="ig-grad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f09433"/>
            <stop offset="50%" stopColor="#dc2743"/>
            <stop offset="100%" stopColor="#bc1888"/>
          </linearGradient>
        </defs>
        <rect x="5" y="5" width="18" height="18" rx="5" fill="url(#ig-grad)"/>
        <circle cx="14" cy="14" r="4.5" stroke="white" strokeWidth="1.8" fill="none"/>
        <circle cx="19.2" cy="8.8" r="1.1" fill="white"/>
      </svg>
    ),
  },
  {
    platform: 'Facebook',
    handle: 'LockpickingDevOfficial',
    url: 'https://www.facebook.com/LockpickingDevOfficial/',
    color: '#1877F2',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="5" y="5" width="18" height="18" rx="4" fill="#1877F2"/>
        <path d="M16 14.5h2l.5-2.8H16v-1.2c0-.8.4-1.3 1.3-1.3H18.5V6.7C17.9 6.6 17.2 6.5 16.4 6.5c-2.2 0-3.6 1.3-3.6 3.6v1.6H10.5v2.8H12.8V21.5H16V14.5Z" fill="white"/>
      </svg>
    ),
  },
  {
    platform: 'Bluesky',
    handle: '@lockpickingdev.bsky.social',
    url: 'https://bsky.app/profile/lockpickingdev.bsky.social',
    color: '#0085ff',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 8.5C11.8 6.7 8 4.5 5.5 5.5 3 6.5 3 10 4 11.5 5 13 7 13.5 9 13 7.5 14 5 15.5 5 18s2.5 4 5 2.5c1.5-.9 2.8-2.2 4-3.5 1.2 1.3 2.5 2.6 4 3.5 2.5 1.5 5-.5 5-2.5s-2.5-4-4-5c2-.5 4-1 5-2.5 1-1.5 1-5-1.5-6S16.2 6.7 14 8.5Z" fill="#0085ff"/>
      </svg>
    ),
  },
  {
    platform: 'Gateway Locksport',
    handle: 'GatewayLocksport.com',
    url: 'https://www.gatewaylocksport.com',
    color: '#00e5ff',
    icon: (
      <img src="/brand/Gateway-Locksport-Logo-PNG-white-no-words.png" alt="Gateway Locksport" width="28" height="28" style={{ objectFit: 'contain' }} />
    ),
  },
  {
    platform: 'Email',
    handle: 'LockpickingDev@gmail.com',
    url: 'mailto:LockpickingDev@gmail.com',
    color: '#00ff88',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="4" y="7" width="20" height="14" rx="3" stroke="#00ff88" strokeWidth="1.6" fill="none"/>
        <path d="M4 10L14 16L24 10" stroke="#00ff88" strokeWidth="1.6" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    platform: 'Donate',
    handle: 'Enjoying the content? Toss a tip my way',
    url: 'https://account.venmo.com/u/LockpickingDevEvents',
    color: '#3D95CE',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="4" y="4" width="20" height="20" rx="5" fill="#3D95CE"/>
        <text x="14" y="19" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="14" fill="white">V</text>
      </svg>
    ),
  },
]

export default function Links() {
  return (
    <>
      <Helmet>
        <title>LockpickingDev — Links</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="description" content="All links for LockpickingDev — YouTube, Instagram, Facebook, Bluesky, Gateway Locksport, and email." />
        <link rel="canonical" href="https://lockpicking.dev/links" />
      </Helmet>

      <div className="links-page">
        <div className="links-hero">
          <img
            src="/brand/animated-logo.gif"
            alt="LockpickingDev"
            className="links-avatar"
          />
          <h1 className="links-name">LockpickingDev</h1>
          <p className="links-tagline">Gateway Locksport Founder · St. Louis, MO</p>
          <p className="links-site">lockpicking.dev</p>
        </div>

        <div className="links-list">
          {LINKS.map(({ platform, handle, url, color, icon }) => (
            <a
              key={platform}
              href={url}
              target={url.startsWith('mailto') ? undefined : '_blank'}
              rel={url.startsWith('mailto') ? undefined : 'noreferrer'}
              className="links-card"
              style={{ '--link-color': color } as React.CSSProperties}
            >
              <span className="links-icon">{icon}</span>
              <span className="links-info">
                <span className="links-platform">{platform}</span>
                <span className="links-handle">{handle}</span>
              </span>
              <span className="links-arrow">→</span>
            </a>
          ))}
        </div>

        <div className="links-footer">
          <span className="links-footer-text">lockpicking.dev</span>
        </div>
      </div>
    </>
  )
}
