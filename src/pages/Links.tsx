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
      <img src="/icons/youtube.png" alt="YouTube" width="28" height="28" style={{ objectFit: 'contain' }} />
    ),
  },
  {
    platform: 'Instagram',
    handle: '@LockpickingDev',
    url: 'https://www.instagram.com/lockpickingdev/',
    color: '#bc1888',
    icon: (
      <img src="/icons/instagram.png" alt="Instagram" width="28" height="28" style={{ objectFit: 'contain' }} />
    ),
  },
  {
    platform: 'Facebook',
    handle: 'LockpickingDevOfficial',
    url: 'https://www.facebook.com/LockpickingDevOfficial/',
    color: '#1877F2',
    icon: (
      <img src="/icons/facebook.png" alt="Facebook" width="28" height="28" style={{ objectFit: 'contain' }} />
    ),
  },
  {
    platform: 'Bluesky',
    handle: '@lockpickingdev.bsky.social',
    url: 'https://bsky.app/profile/lockpickingdev.bsky.social',
    color: '#0085ff',
    icon: (
      <img src="/icons/bluesky.png" alt="Bluesky" width="28" height="28" style={{ objectFit: 'contain' }} />
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
    color: '#EA4335',
    icon: (
      <img src="/icons/gmail.png" alt="Email" width="28" height="28" style={{ objectFit: 'contain' }} />
    ),
  },
  {
    platform: 'Donate',
    handle: 'Enjoying the content? Toss a tip my way',
    url: 'https://account.venmo.com/u/LockpickingDevEvents',
    color: '#3D95CE',
    icon: (
      <img src="/icons/venmo.png" alt="Email" width="28" height="28" style={{ objectFit: 'contain' }} />
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
