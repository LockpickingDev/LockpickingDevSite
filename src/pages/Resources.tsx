import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

interface Company {
  name: string
  specialty: string
  desc: string
  url: string
}

const COMPANIES: Company[] = [
  {
    name: 'Covert Instruments',
    specialty: 'Picks & Tools',
    desc: 'Top-tier picks, tools, and gear with strong community support.',
    url: 'https://www.covertinstruments.com',
  },
  {
    name: 'Jimy Longs',
    specialty: 'Custom Picks',
    desc: 'Independent maker known for tough, reliable anti-bending taper picks.',
    url: 'https://www.jimylongs.com',
  },
  {
    name: 'Handcuff Warehouse',
    specialty: 'Handcuffs',
    desc: 'Handcuffs and training tools for security, law enforcement, and education.',
    url: 'https://www.handcuffwarehouse.com',
  },
]

interface Locksporter {
  name: string
  type: 'YouTube' | 'Website' | 'Community' | 'Podcast'
  desc: string
  url: string
}

// Add your recommended locksporters here.
// { name: 'Name', type: 'YouTube', desc: 'Why you recommend them.', url: 'https://...' }
const LOCKSPORTERS: Locksporter[] = [
  {
    name: 'Lockpickers United',
    type: 'Community',
    desc: 'One of the most welcoming communities in locksport. Incredibly helpful and eager to assist anyone learning to pick responsibly.',
    url: 'https://lockpickersunited.com/',
  },
  { 
    name: 'LockpickingLawyer', 
    type: 'YouTube', 
    desc: 'Straight to the point. No BS. If a lock has a weakness, LPL exposes it and shows you exactly how fast it fails. There’s a reason people check his channel before buying anything.', 
    url: 'https://www.youtube.com/@lockpickinglawyer'
  },
  { 
    name: 'LockNoob', 
    type: 'YouTube', 
    desc: 'A long-time locksporter who covers a bit of everything - a wide mix of picking, experiments, weird locks you didn’t know existed, and deep dives from someone who clearly enjoys the craft.', 
    url: 'https://www.youtube.com/@LockNoob'
  },
  { 
    name: 'Artichoke 2000', 
    type: 'YouTube', 
    desc: 'Detailed, methodical, and incredibly informative. If you want to understand high-security locks at a deeper level, this is a great place to start.', 
    url: 'https://www.youtube.com/@ArtichokeTwoThousand'
  },
  { 
    name: 'HelpfulLockpicker', 
    type: 'YouTube', 
    desc: 'The name says it all. A wide range of informative content covering many locksport topics, all presented in an approachable and easy-to-understand way.', 
    url: 'https://www.youtube.com/@HelpfulLockPicker'
  },
  { 
    name: 'Lock Manipulator', 
    type: 'YouTube', 
    desc: 'A channel focused on safe lock manipulation techniques and tools, including the creation of open-source tools for learning and practice.', 
    url: 'https://www.youtube.com/@lockmanipulator'
  }
]

interface Video {
  id: string
  title: string
}

// Add recommended videos from other creators here.
// { id: 'YOUTUBE_VIDEO_ID', title: 'Video_Title' },
const RECOMMENDED_VIDEOS: Video[] = [
  { id: 'efI3GrhT1wM', title: 'Lock Noob - ULTIMATE Lock Disassembly and Re-Assembly Guide' },
  { id: 'mK8TjuLDoMg', title: 'Naswek - "Jiggle Test" and the Four Fundamental Pin States' },
  { id: 'yc7uQC5hYwQ', title: 'Lock Pickers United - Throwback Thursday 8: The Jiggle Test' },
  { id: '9O-CJEwcQnY', title: 'LockPickingLawyer - [188] My Approach to Lock Picking Tension' },
  { id: 'fffL-kmmi4E', title: 'HelpfulLockpicker - How Key Bitting Affects Lock Picking and Your Lock\'s Security' },
  { id: 'vTc1srjQUVw', title: 'LockPickingLawyer - [82] How To Pick Locks With Paracentric Keyways' },
  { id: 'Jpjf2pjQeoY', title: 'Lock Pickers United - Mentorship Monday 8: How to Pick Security Pins' },
  { id: 'Cqd9DPrgi3g', title: 'LockPickingLawyer - [1428] Inside Perspective: Picking Spool Pins' },
  { id: 'muPJjTBuYHY', title: 'LockPickingLawyer - [1432] Inside Perspective: Picking Serrated Pins' },
  { id: 'SlvQEv_qRb0', title: 'HelpfulLockpicker - How To Master Serrated Driver Pins | Learn To Identify and Set Underset Pins' },
  { id: 'Y3ciLPPeSfc', title: 'Artichoke2000 - (23) The Theory of Picking Tapered Drivers' },
  { id: 'xDZHoTb0NP8', title: 'Artichoke2000 - (34) The Theory of Picking Barrel Drivers - Twins Part 3' },
  { id: 'EVS4tEZW5iU', title: 'Artichoke2000 - (21) The Theory of Picking Gin Spool Drivers - Gin Series Part 1' },
  { id: 'duKz0mYpjZM', title: 'Curious Lock Picker - Lock Picking Tutorial - Sliders' },
  { id: 'Rjl1aR2-4JY', title: 'Lock Noob - Dimple Lock Picking 101 - EVERYTHING you Need to Know' },
  { id: 'Cg6qbM3weMU', title: 'Crack Combination Lock Codes! No Code? No Problem!' },
  { id: 'bTbUkipBeTA', title: 'Lock Manipulator - Complete Safecracking Tutorial for Beginners' },
  { id: 'XD-jG1mfBGI', title: 'SasPes - Lockpicking Forensics - Key + Picking + Raking + Lishi picking' },
  { id: 'TvDvg2dNSWI', title: 'Porter Tradecraft - Lock Forensics: The Impact of Raking on Different Pin Types' },
  { id: 'jafxvnx6m2Y', title: 'Porter Tradecraft - Top 10 Physical Security Vulnerabilities' },
  { id: '5Q4WK4n-7BI', title: 'Tony Virelli - Duplicating a key at Menards using a 3D printed key!' },
]

// { id: 'YOUTUBE_VIDEO_ID', title: 'Video Title' },
// { id: 'j036yjyKlmQ', title: 'How to Pick Handcuffs with a Bobby Pin' },
const MY_VIDEOS: Video[] = [
  { id: '3mShtKSY5tY', title: 'Making Custom Lockpicks Part 1' },
  { id: 'PS-8U_dcTzs', title: 'How-To Pick Handcuffs with a Bobby Pin in 3 minutes 🔓' },
  { id: 'xe-fdHeNf5o', title: 'Mul-T-Lock Interactive with Serrated Drivers Picked and Gutted' },
  { id: 'xhBGZLzKN-Q', title: 'PAX West 2025 Workshop - Lockpicking in Video Games: How Realistic is it?' },
  { id: 'JwEFbeoMijg', title: '100 Lockpicking Hiking Locations Compilation' },
  { id: 'i7gy1KSPJqg', title: 'Assa 600 Picked and Gutted' },
  { id: 'x_nAQ5e6CrY', title: 'Mul-T-Lock Interactive Plus + NE10G Padlock Picked and Gutted' },
  { id: 'BkpNt4auWRs', title: 'Assa Desmo Picked and Gutted' },
  { id: 'hqdmQIjxE-k', title: 'How to Make Multi-Dong Picks (Honest Dong Shi Handle w Multipick tips)' },
  { id: 'kwtmc6kMVTs', title: 'Abus Titalium 80TI 50 Picked AND Gutted & How to Make a Titalium Practice Lock' },
  { id: 'P8XHhY9uow0', title: 'Master Lock 570 Picked AND Gutted! How to make a 570/575 Practice Lock' },
  { id: 'QVmBfQVxYmk', title: 'American Lock 1100 Speed Picking' },
  { id: 'qc5ulBP_lgc', title: 'How to Shim & Bypass Handcuffs' },
  { id: '6j8hKs6R0q4', title: 'How to Make Interchangeable Lockpick Handles' },
  { id: 'PufrnWWWlKY', title: 'Lockpicks Handles - Thickness, Density, and Feedback' },
  { id: 'np33mdyEa5g', title: 'Silver Bird Padlock Picked with Different Homebrew Turner Tools' },
  { id: '7cs6na6HTq8', title: 'Assa Abloy Maximum Plus Picked and Gutted and GIVEAWAY' },
  { id: 'S6cfqyZRJ1A', title: 'Covert Instruments Echelon Pick Set Review' },
  { id: 'zDg1uezYRhQ', title: 'Jimy Longs Lockpicks Review' },
  { id: 'G49cgGaZ7zc', title: 'Impressioning a Master Lock No 1 Padlock' },
  { id: '2EaBeOyexa0', title: 'Yale 2100 Picked and Gutted' },
  { id: 'RIVHIWbEFtU', title: '4 EASY Ways to Pick Open a Brinks Combination Lock' },
  { id: 'qYRbD82GjiM', title: 'My Lock Collection (Part 1)' },
  { id: 'VJw32eyLDxo', title: 'My Lock Collection - High Security (Part 2)' },
]

const REC_INITIAL = 4
const REC_PAGE = 8
const MY_INITIAL = 4
const MY_PAGE = 8

const TYPE_COLOR: Record<Locksporter['type'], string> = {
  YouTube: 'var(--red)',
  Website: 'var(--green)',
  Community: 'var(--amber)',
  Podcast: 'var(--cyan)',
}

export default function Resources() {
  const [recCount, setRecCount] = useState(REC_INITIAL)
  const visibleRec = RECOMMENDED_VIDEOS.slice(0, recCount)
  const recRemaining = RECOMMENDED_VIDEOS.length - recCount
  const [myCount, setMyCount] = useState(MY_INITIAL)
  const visibleMy = MY_VIDEOS.slice(0, myCount)
  const myRemaining = MY_VIDEOS.length - myCount

  return (
    <>
      <Helmet>
        <title>Resources - Gear, Creators &amp; Videos | LockpickingDev</title>
        <meta name="description" content="Curated locksport resources from LockpickingDev - recommended gear, creators, communities, and videos worth your time." />
        <link rel="canonical" href="https://lockpicking.dev/resources" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://lockpicking.dev/resources" />
        <meta property="og:title" content="Locksport Resources - Gear, Creators &amp; Videos | LockpickingDev" />
        <meta property="og:description" content="Curated locksport resources from LockpickingDev - recommended gear companies, community creators, and videos worth your time." />
        <meta property="og:image" content="https://lockpicking.dev/brand/og-resources.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="LockpickingDev" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://lockpicking.dev/resources" />
        <meta name="twitter:title" content="Locksport Resources - Gear, Creators &amp; Videos | LockpickingDev" />
        <meta name="twitter:description" content="Curated locksport resources from LockpickingDev - recommended gear, creators, and videos worth your time." />
        <meta name="twitter:image" content="https://lockpicking.dev/brand/og-resources.png" />
      </Helmet>

      {/* HERO */}
      <section className="lab-hero">
        <div className="lab-hero-content">
          <div className="lab-breadcrumb">
            <Link to="/" className="lab-back">← Back to Home</Link>
          </div>
          <h1 className="lab-title">
            <span className="cyan">Resources</span>
            <span className="hero-cursor" />
          </h1>
          <p className="lab-subtitle">
            Where I buy. Who I watch. What I'd tell a friend.
          </p>
          <p className="lab-desc">
            A curated set of recommendations from someone deep in the locksport community -
            gear worth buying, creators worth following, and videos worth watching.
            No fluff, just what I'd actually point you to.
          </p>
        </div>
      </section>

      {/* RECOMMENDED COMPANIES */}
      {COMPANIES.length > 0 && (
        <section className="lab-section" id="companies">
          <div className="container">
            <div className="section-label">gear</div>
            <h2 className="section-title">Recommended Companies</h2>
            <div className="section-divider" />
            <p className="lab-section-desc">
              Places I buy from and would recommend to any picker looking for quality tools.
            </p>
            <div className="companies-grid">
              {COMPANIES.map((c, i) => (
                <div key={i} className="locksporter-card">
                  <div className="locksporter-type" style={{ color: 'var(--green)' }}>
                    {c.specialty.toUpperCase()}
                  </div>
                  <div className="locksporter-name">{c.name}</div>
                  <div className="locksporter-desc">{c.desc}</div>
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noreferrer"
                    className="locksporter-link"
                  >
                    → {c.url.replace('https://', '').replace('http://', '')}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* RECOMMENDED LOCKSPORTERS */}
      {LOCKSPORTERS.length > 0 && (
        <section className="lab-section lab-section-alt" id="locksporters">
          <div className="container">
            <div className="section-label">community</div>
            <h2 className="section-title">Recommended Locksporters</h2>
            <div className="section-divider" />
            <p className="lab-section-desc">
              Creators and communities I'd point any picker to - whether you're just starting
              out or looking to go deeper.
            </p>
            <div className="locksporters-grid">
              {LOCKSPORTERS.map((l, i) => (
                <div key={i} className="locksporter-card">
                  <div
                    className="locksporter-type"
                    style={{ color: TYPE_COLOR[l.type] }}
                  >
                    {l.type.toUpperCase()}
                  </div>
                  <div className="locksporter-name">{l.name}</div>
                  <div className="locksporter-desc">{l.desc}</div>
                  <a
                    href={l.url}
                    target="_blank"
                    rel="noreferrer"
                    className="locksporter-link"
                  >
                    → {l.url.replace('https://', '').replace('http://', '')}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* RECOMMENDED VIDEOS */}
      {RECOMMENDED_VIDEOS.length > 0 && (
        <section className="lab-section" id="recommended">
          <div className="container">
            <div className="section-label">community picks</div>
            <h2 className="section-title">Recommended Videos</h2>
            <div className="section-divider" />
            <p className="lab-section-desc">
              Videos from other creators that I think are genuinely worth watching.
            </p>
            <div className="videos-grid">
              {visibleRec.map((v, i) => (
                <div key={i} className="video-card">
                  <iframe
                    className="video-embed"
                    src={`https://www.youtube.com/embed/${v.id}`}
                    title={v.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                  <div className="video-caption">{v.title}</div>
                </div>
              ))}
            </div>
            {RECOMMENDED_VIDEOS.length > REC_INITIAL && (
              recRemaining > 0 ? (
                <button
                  className="show-more-btn"
                  onClick={() => setRecCount(c => Math.min(c + REC_PAGE, RECOMMENDED_VIDEOS.length))}
                >
                  {`Show More · ${recRemaining} video${recRemaining === 1 ? '' : 's'} remaining ↓`}
                </button>
              ) : (
                <button className="show-more-btn" onClick={() => setRecCount(REC_INITIAL)}>
                  Show Less ↑
                </button>
              )
            )}
          </div>
        </section>
      )}

      {/* MY VIDEOS */}
      <section className="lab-section lab-section-alt" id="my-videos">
        <div className="container">
          <div className="section-label">youtube</div>
          <h2 className="section-title">My Videos</h2>
          <div className="section-divider" />
          <p className="lab-section-desc">
            Picks from the channel - techniques, challenges, and builds I'm proud of.
          </p>
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

          <div className="videos-grid">
            {visibleMy.map((v, i) => (
              <div key={i} className="video-card">
                <iframe
                  className="video-embed"
                  src={`https://www.youtube.com/embed/${v.id}`}
                  title={v.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
                <div className="video-caption">{v.title}</div>
              </div>
            ))}
          </div>

          {MY_VIDEOS.length > MY_INITIAL && (
            myRemaining > 0 ? (
              <button
                className="show-more-btn"
                onClick={() => setMyCount(c => Math.min(c + MY_PAGE, MY_VIDEOS.length))}
              >
                {`Show More · ${myRemaining} video${myRemaining === 1 ? '' : 's'} remaining ↓`}
              </button>
            ) : (
              <button className="show-more-btn" onClick={() => setMyCount(MY_INITIAL)}>
                Show Less ↑
              </button>
            )
          )}

        </div>
      </section>
    </>
  )
}
