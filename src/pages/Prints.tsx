import { useState, useEffect, useCallback, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

const SIZES = ['Small', 'Medium', 'Large'] as const
const POSITIONS = ['Left', 'Center', 'Right'] as const
type Size = typeof SIZES[number]
type Position = typeof POSITIONS[number]

interface PrintModel {
  id: string
  name: string
  desc: string
  image: string
  versions: Record<Size, Record<Position, string>>
}

function stl(id: string, size: string, pos: string) {
  return `/3dprinting/stl/${id}/${size.toLowerCase()}-${pos.toLowerCase()}.stl`
}

function makeVersions(id: string): Record<Size, Record<Position, string>> {
  return {
    Small:  { Left: stl(id, 'small', 'left'),  Center: stl(id, 'small', 'center'),  Right: stl(id, 'small', 'right')  },
    Medium: { Left: stl(id, 'medium', 'left'), Center: stl(id, 'medium', 'center'), Right: stl(id, 'medium', 'right') },
    Large:  { Left: stl(id, 'large', 'left'),  Center: stl(id, 'large', 'center'),  Right: stl(id, 'large', 'right')  },
  }
}

const MODELS: PrintModel[] = [
  {
    id: 'padlock-display-flat',
    name: 'Padlock Display Stand — Flat',
    desc: 'Clean flat-base stand with a key holder slot. Stable footprint, minimal profile. One of the most printed locksport display designs in the community.',
    image: '/3dprinting/lockdisplays/Padlock Display Stands - Medium Flat.jpg',
    versions: makeVersions('padlock-display-flat'),
  },
  {
    id: 'padlock-display-concave',
    name: 'Padlock Display Stand — Concave',
    desc: 'Concave base that cradles the lock body for a more secure hold and a cleaner visual presentation.',
    image: '/3dprinting/lockdisplays/Padlock Display Stand - Large w Concave.jpg',
    versions: makeVersions('padlock-display-concave'),
  },
  {
    id: 'padlock-display-wide-flat',
    name: 'Padlock Display Stand — Wide Flat',
    desc: 'Wider flat-base design built for larger padlocks. Extra stability for heavier or wider lock bodies.',
    image: '/3dprinting/lockdisplays/Padlock Display Stand - Large Flat.jpg',
    versions: makeVersions('padlock-display-wide-flat'),
  },
]

interface VersionModalProps {
  model: PrintModel
  onClose: () => void
}

function VersionModal({ model, onClose }: VersionModalProps) {
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
      <div className="version-modal" onClick={e => e.stopPropagation()}>
        <div className="version-modal-header">{model.name}</div>
        <img src={model.image} alt={model.name} className="version-modal-img" />
        <div className="version-modal-label">CHOOSE A VERSION TO DOWNLOAD</div>
        <div className="version-matrix">
          <div />
          <div className="version-matrix-axis-header">← KEY POSITION →</div>
          <div className="version-matrix-axis-side">KEY SIZE</div>
          {POSITIONS.map(pos => (
            <div key={pos} className="version-matrix-col-header">{pos.toUpperCase()}</div>
          ))}
          {SIZES.map(size => (
            <Fragment key={size}>
              <div className="version-matrix-row-label">{size}</div>
              {POSITIONS.map(pos => (
                <a
                  key={`${size}-${pos}`}
                  href={model.versions[size][pos]}
                  download
                  className="version-dl-btn"
                  onClick={e => e.stopPropagation()}
                >
                  ↓ STL
                </a>
              ))}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Prints() {
  const [activeModel, setActiveModel] = useState<PrintModel | null>(null)
  const openModal = useCallback((m: PrintModel) => setActiveModel(m), [])
  const closeModal = useCallback(() => setActiveModel(null), [])

  return (
    <>
      <Helmet>
        <title>3D Prints — Lock Display Stands &amp; More | LockpickingDev</title>
        <meta name="description" content="Free STL files for 3D printable lock display stands and locksport tools by LockpickingDev. Community staples used at meetups and in collections worldwide." />
        <link rel="canonical" href="https://lockpicking.dev/prints" />
      </Helmet>

      {activeModel && <VersionModal model={activeModel} onClose={closeModal} />}

      {/* HERO */}
      <section className="lab-hero">
        <div className="lab-hero-content">
          <div className="lab-breadcrumb">
            <Link to="/" className="lab-back">← Back to Home</Link>
          </div>
          <h1 className="lab-title">
            3D <span className="cyan">Prints</span>
            <span className="hero-cursor" />
          </h1>
          <p className="lab-subtitle">
            Lock display stands, tools, and hardware — all free to print.
          </p>
          <p className="lab-desc">
            Original 3D printable designs built for the locksport community.
            Download the STL, print it, use it. No cost, no catch.
          </p>
        </div>
      </section>

      {/* COMMUNITY CALLOUT */}
      <section className="picks-section" style={{ background: 'var(--bg)', paddingTop: '3rem', paddingBottom: '3rem' }}>
        <div className="container">
          <div className="covert-banner">
            <div className="covert-banner-text">
              <strong>Community Staples</strong>
              <p>
                These lock display stands have been printed and used by hundreds of people across the
                locksport community. If you've been to a meetup and seen a lock on a stand, there's a
                good chance it came from these files.
              </p>
            </div>
            <a
              href="https://www.thingiverse.com/LockpickingDev/designs"
              target="_blank"
              rel="noreferrer"
              className="covert-link-btn"
            >
              View All on Thingiverse →
            </a>
          </div>
        </div>
      </section>

      {/* MODELS */}
      <section className="picks-section picks-section-alt" id="models">
        <div className="container">
          <div className="section-label">free downloads</div>
          <h2 className="section-title">Lock Display Stands</h2>
          <div className="section-divider" />
          <p className="lab-section-desc">
            Click any model to choose a version and download the STL.
            Each stand comes in 9 variants — three sizes (small, medium, large)
            and three key holder positions (left, center, right).
          </p>
          <div className="prints-grid">
            {MODELS.map(model => (
              <button
                key={model.id}
                className="print-card"
                onClick={() => openModal(model)}
                aria-label={`Download ${model.name}`}
              >
                <img src={model.image} alt={model.name} className="print-card-img" />
                <div className="print-card-body">
                  <div className="print-card-name">{model.name}</div>
                  <div className="print-card-desc">{model.desc}</div>
                  <div className="print-card-cta">Download STL →</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
