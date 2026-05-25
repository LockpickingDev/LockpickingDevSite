import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'

// Replace '' with the path or URL to each photo.
// Example: { src: '/picks/my-snake-rake.jpg', caption: 'Snake Rake — spring steel' }
const MY_PICKS = [
  { src: 'src/public/lockpicks/2019 Spring - First Batch made.jpg', caption: 'Add photo' },
  { src: 'src/public/lockpicks/2020 Spring Picks.jpg', caption: 'Add photo' },
  { src: '', caption: 'Add photo' },
  { src: '', caption: 'Add photo' },
  { src: '', caption: 'Add photo' },
  { src: '', caption: 'Add photo' },
  { src: '', caption: 'Add photo' },
  { src: '', caption: 'Add photo' },
  { src: '', caption: 'Add photo' },
  { src: '', caption: 'Add photo' },
  { src: '', caption: 'Add photo' },
  { src: '', caption: 'Add photo' },
]

const OTHERS_PICKS = [
  { src: '', caption: 'Add photo' },
  { src: '', caption: 'Add photo' },
  { src: '', caption: 'Add photo' },
  { src: '', caption: 'Add photo' },
  { src: '', caption: 'Add photo' },
  { src: '', caption: 'Add photo' },
  { src: '', caption: 'Add photo' },
  { src: '', caption: 'Add photo' },
  { src: '', caption: 'Add photo' },
]

const MINE_INITIAL = 9
const OTHERS_INITIAL = 6
const PICKS_PAGE = 8

interface PickItem { src: string; caption: string }

function PickCard({ item, onOpen }: { item: PickItem; onOpen: (item: PickItem) => void }) {
  if (!item.src) {
    return (
      <div className="pick-placeholder">
        <div className="pick-placeholder-icon">🔑</div>
        <div className="pick-placeholder-text">Add photo</div>
      </div>
    )
  }
  return (
    <button className="pick-card" onClick={() => onOpen(item)} aria-label="View full size">
      <img src={item.src} alt={item.caption} />
      {item.caption && item.caption !== 'Add photo' && (
        <div className="pick-caption">{item.caption}</div>
      )}
    </button>
  )
}

interface LightboxProps { item: PickItem; onClose: () => void }

function Lightbox({ item, onClose }: LightboxProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div className="lightbox-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <button className="lightbox-close" onClick={onClose} aria-label="Close">✕</button>
      <div className="lightbox-content" onClick={e => e.stopPropagation()}>
        <img src={item.src} alt={item.caption} className="lightbox-img" />
        {item.caption && item.caption !== 'Add photo' && (
          <div className="lightbox-caption">{item.caption}</div>
        )}
      </div>
    </div>
  )
}

export default function Lockpicks() {
  const [mineCount, setMineCount] = useState(MINE_INITIAL)
  const [othersCount, setOthersCount] = useState(OTHERS_INITIAL)
  const [lightboxItem, setLightboxItem] = useState<PickItem | null>(null)

  const openLightbox = useCallback((item: PickItem) => setLightboxItem(item), [])
  const closeLightbox = useCallback(() => setLightboxItem(null), [])

  const visibleMine = MY_PICKS.slice(0, mineCount)
  const visibleOthers = OTHERS_PICKS.slice(0, othersCount)
  const mineRemaining = MY_PICKS.length - mineCount
  const othersRemaining = OTHERS_PICKS.length - othersCount

  return (
    <>
      {lightboxItem && <Lightbox item={lightboxItem} onClose={closeLightbox} />}

      {/* HERO */}
      <section className="lab-hero">
        <div className="lab-hero-content">
          <div className="lab-breadcrumb">
            <Link to="/" className="lab-back">← Back to Home</Link>
          </div>
          <h1 className="lab-title">
            Lock<span className="cyan">picks</span>
            <span className="hero-cursor" />
          </h1>
          <p className="lab-subtitle">
            Custom picks I've made and treasured pieces received from others.
          </p>
          <p className="lab-desc">
            Over 100 custom lockpicks made by hand over the years — plus picks gifted
            from talented makers in the locksport community.
          </p>
        </div>
      </section>

      {/* COVERT INSTRUMENTS */}
      <section className="picks-section" style={{ background: 'var(--bg)', paddingTop: '3rem', paddingBottom: '3rem' }}>
        <div className="container">
          <div className="covert-banner">
            <div className="covert-banner-text">
              <strong>Available to Purchase</strong>
              <p>
                A selection of my custom handmade lockpicks is available for sale through Covert
                Instruments' Chop Shop — a curated marketplace for handcrafted picks from makers
                in the locksport community. Each pick is one of a kind.
              </p>
            </div>
            <a
              href="https://covertinstruments.com/collections/chop-shop-custom-lock-picks"
              target="_blank"
              rel="noreferrer"
              className="covert-link-btn"
            >
              Shop My Picks at Covert Instruments →
            </a>
          </div>
        </div>
      </section>

      {/* MY CUSTOM PICKS */}
      <section className="picks-section" id="my-picks">
        <div className="container">
          <div className="section-label">handmade</div>
          <h2 className="section-title">My Custom Picks</h2>
          <div className="section-divider" />
          <p className="lab-section-desc">
            Over 100 custom lockpicks made by hand over the years — from functional
            daily carries to artistic pieces. Spring steel, titanium, brass, and more.
          </p>
          <div className="picks-grid">
            {visibleMine.map((item, i) => <PickCard key={i} item={item} onOpen={openLightbox} />)}
          </div>
          {MY_PICKS.length > MINE_INITIAL && (
            mineRemaining > 0 ? (
              <button className="show-more-btn" onClick={() => setMineCount(c => Math.min(c + PICKS_PAGE, MY_PICKS.length))}>
                {`Show More · ${Math.min(PICKS_PAGE, mineRemaining)} more pick${Math.min(PICKS_PAGE, mineRemaining) === 1 ? '' : 's'} ↓`}
              </button>
            ) : (
              <button className="show-more-btn" onClick={() => setMineCount(MINE_INITIAL)}>
                Show Less ↑
              </button>
            )
          )}
        </div>
      </section>

      {/* PICKS FROM OTHERS */}
      <section className="picks-section picks-section-alt" id="picks-from-others">
        <div className="container">
          <div className="section-label">community</div>
          <h2 className="section-title">Picks From Others</h2>
          <div className="section-divider" />
          <p className="lab-section-desc">
            Custom picks gifted by talented makers in the locksport community.
            Each one is a small piece of someone else's craft and creativity.
          </p>
          <div className="picks-grid">
            {visibleOthers.map((item, i) => <PickCard key={i} item={item} onOpen={openLightbox} />)}
          </div>
          {OTHERS_PICKS.length > OTHERS_INITIAL && (
            othersRemaining > 0 ? (
              <button className="show-more-btn" onClick={() => setOthersCount(c => Math.min(c + PICKS_PAGE, OTHERS_PICKS.length))}>
                {`Show More · ${Math.min(PICKS_PAGE, othersRemaining)} more pick${Math.min(PICKS_PAGE, othersRemaining) === 1 ? '' : 's'} ↓`}
              </button>
            ) : (
              <button className="show-more-btn" onClick={() => setOthersCount(OTHERS_INITIAL)}>
                Show Less ↑
              </button>
            )
          )}
        </div>
      </section>
    </>
  )
}
