import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

// Replace '' with the path or URL to each photo.
// Example: { src: 'path', caption: 'words' }
const MY_PICKS = [
  { src: '/mycustompicks/2022 Spring Picks (1).JPG', caption: '2022 Spring Picks' },
  { src: '/mycustompicks/Goth Chicks.JPG', caption: 'Goth Chicks' },
  { src: '/mycustompicks/Brass Dimple Picks for Multipick Flags.jpg', caption: 'Brass Dimple Picks for Multipick Flags' },
  { src: '/mycustompicks/2019 Spring - First Batch of Lock Picks Ever Made.JPG', caption: '2019 Spring Picks - First Batch made' },
  { src: '/mycustompicks/2020 Spring Picks.JPG', caption: '2020 Spring Picks' },
  { src: '/mycustompicks/Burl with resin filled gaps (1).JPG', caption: 'Burl with resin filled gaps' },
  { src: '/mycustompicks/Custom Moki Interchangeable Handles (304 Steel).png', caption: 'Custom Moki Interchangeable Handles (304 Steel)' },
  { src: '/mycustompicks/Aluminum Bronze & Aluminum Interchangleable Handles.JPG', caption: 'Aluminum Bronze & Aluminum Interchangleable Handles' },
  { src: '/mycustompicks/Keys and Skulls in Resin (2).jpg', caption: 'Keys & Skulls in Resin' }, 
  { src: '/mycustompicks/Gaboon Ebony Wood, Brass Pins, and Brass Inlay.jpg', caption: 'Gaboon Ebony Wood, Brass Pins, and Brass Inlay' },
  { src: '/mycustompicks/Burl, Ebony, and Brass Dimple Picks.JPG', caption: 'Burl, Ebony, and Brass Dimple Picks' },
  { src: '/mycustompicks/Mammoth Tusk Pick.jpg', caption: 'Mammoth Tusk Pick' },
  { src: '/mycustompicks/Padauk, Ancient Bog Oak handle with Polycrylic Finish.jpg', caption: 'Padauk, Ancient Bog Oak handle with Polycrylic Finish' },
  { src: '/mycustompicks/Spalted Maple - Hattori Owned.JPG', caption: 'Spalted Maple - Hattori Owned' },
  { src: '/mycustompicks/Interchangeable Aluminum Handles Engraved (1).JPG', caption: 'Interchangeable Aluminum Handles Engraved' },
  { src: '/mycustompicks/Interchangeable Aluminum Handles Engraved (2).JPG', caption: 'Interchangeable Aluminum Handles Engraved' },  
  { src: '/mycustompicks/Zebra Wood CA Glue Finish.jpg', caption: 'Zebra Wood CA Glue Finish' },
  { src: '/mycustompicks/Burl with Brass Inlay - Gifted to PickSmith (2).JPG', caption: 'Burl with Brass Inlay - Gifted to PickSmith' },
  { src: '/mycustompicks/Burl with Brass Inlay - LPU RAFL Donation.JPG', caption: 'Burl with Brass Inlay - LPU RAFL Donation' },
  { src: '/mycustompicks/Malle Burl Green Resin.JPG', caption: 'Malle Burl - Green Resin' },
  { src: '/mycustompicks/Malle Burl Red Resin - Sold CI.JPG', caption: 'Malle Burl Red Resin - Sold via Covert Instruments' },
  { src: '/mycustompicks/Alder Burl - Sold CI.JPG', caption: 'Alder Burl - Sold via Covert Instruments' },
  { src: '/mycustompicks/Black palm - Sold CI.JPG', caption: 'Black Palm - Sold via Covert Instruments' },
  { src: '/mycustompicks/Small burl - Sold CI.JPG', caption: 'Small Burl - Sold via Covert Instruments' },
  { src: '/mycustompicks/LPU RAFL Donation.JPG', caption: 'LPU RAFL Donation' },
  { src: '/mycustompicks/Ambrosia Wood Handle with CA Glue Finish.JPG', caption: 'Ambrosia Wood Handle with CA Glue Finish' },
  { src: '/mycustompicks/Curly Mango .016 med hook full tang, CA Glue finish - Lambda2 (Lambda Due on YouTube) (3).jpg', caption: 'Curly Mango CA Glue finish - Gifted to Lambda2' },
  { src: '/mycustompicks/Another Burl.JPG', caption: 'Another Burl' },
  { src: '/mycustompicks/Ancient Bog Oak, Paduak, African Blackwood, Brass.JPG', caption: 'Ancient Bog Oak, Paduak, African Blackwood, Brass' },
  { src: '/mycustompicks/Multi-Dong Dimple Pick.JPG', caption: 'Multi-Dong Dimple Pick - Honest Dong Shi Handle Converted to use MultiPick Flags' },
  { src: '/mycustompicks/Star Wars in Resin (1).JPG', caption: 'Star Wars in Resin' },
  { src: '/mycustompicks/Star Wars in Resin (2).JPG', caption: 'Star Wars in Resin' },
  { src: '/mycustompicks/Padauk.JPG', caption: 'Padauk' },
  { src: '/mycustompicks/Purple Heart.JPG', caption: 'Purple Heart' },
  { src: '/mycustompicks/Ancient Bog Oak, Highly Figured Walnut, Brass.JPG', caption: 'Ancient Bog Oak, Highly Figured Walnut, Brass' },
  { src: '/mycustompicks/Medeco Lifter with Acryllic Handle.JPG', caption: 'Medeco Lifter with Acrylic Handle' },
  { src: '/mycustompicks/Interchangeable Aluminum Handles for Jimy Longs Modular Picks.JPG', caption: "Interchangeable Aluminum Handles for Jimy Long's Modular Picks" },
  { src: '/mycustompicks/LPU RAFL 2023.JPG', caption: 'LPU RAFL 2023' },
  { src: '/mycustompicks/Deer Leg Pick.JPG', caption: 'Deer Leg Pick' },
  { src: '/mycustompicks/Googley Eye Lockpicks (1).JPG', caption: 'Googley Eye Lockpicks' },
  { src: '/mycustompicks/Googley Eye Glow in the Dark.jpg', caption: 'Googley Eye Glow in the Dark' },
]

const OTHERS_PICKS = [
  { src: '/picksfromothers/Bones by PickSmith (1).JPG', caption: '\"Bones\" by PickSmith' },
  { src: '/picksfromothers/Bones by PickSmith (2).JPG', caption: '\"Bones\" by PickSmith' },
  { src: '/picksfromothers/Caimon Pick by Lambda2 Lockpick Italy (1).JPG', caption: 'Caimon Pick by Lambda2 Lockpick Italy' },
  { src: '/picksfromothers/Caimon Pick by Lambda2 Lockpick Italy (2).JPG', caption: 'Caimon Pick by Lambda2 Lockpick Italy' },
  { src: '/picksfromothers/Rob Lawn Lockpicks.jpg', caption: 'Rob Lawn' },
  { src: '/picksfromothers/Matts Lock Pit.jpg', caption: 'Matt\'s Lock Pit' },
  { src: '/picksfromothers/Matt\'s Lock Pit 2.JPG', caption: 'Matt\'s Lock Pit' },
  { src: '/picksfromothers/Aluminum Interchangeable Handles - Machined by Max.jpg', caption: 'Aluminum Interchangeable Handles - Machined by Max' },
]

const MINE_INITIAL = 9
const OTHERS_INITIAL = 6
const PICKS_PAGE = 9

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
      <Helmet>
        <title>Custom Lockpicks - Handmade Collection | LockpickingDev</title>
        <meta name="description" content="Over 100 handmade custom lockpicks by LockpickingDev - spring steel, titanium, brass, and more. Available for purchase via Covert Instruments. Plus picks gifted from the locksport community." />
        <link rel="canonical" href="https://lockpicking.dev/lockpicks" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://lockpicking.dev/lockpicks" />
        <meta property="og:title" content="Custom Lockpick Collection - LockpickingDev" />
        <meta property="og:description" content="Over 100 handmade custom lockpicks in spring steel, titanium, and brass. Available for purchase via Covert Instruments." />
        <meta property="og:image" content="https://lockpicking.dev/brand/og-lockpicks.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="LockpickingDev" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://lockpicking.dev/lockpicks" />
        <meta name="twitter:title" content="Custom Lockpick Collection - LockpickingDev" />
        <meta name="twitter:description" content="Over 100 handmade custom lockpicks in spring steel, titanium, and brass. Available for purchase via Covert Instruments." />
        <meta name="twitter:image" content="https://lockpicking.dev/brand/og-lockpicks.png" />
      </Helmet>

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
            Over 100 custom lockpicks made by hand over the years - plus picks gifted
            from talented makers in the locksport community.
          </p>
          <a
            href="https://youtube.com/playlist?list=PLZoVNaGe89lHO06kIjTeidULphDiErcZx"
            target="_blank"
            rel="noreferrer"
            className="picks-yt-link"
          >
            ▶ Watch: How I Make Custom Lockpicks - Full Tutorial Series
          </a>
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
                Instruments' Chop Shop - a curated marketplace for handcrafted picks from makers
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
            Over 100 custom lockpicks made by hand over the years - from functional
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
