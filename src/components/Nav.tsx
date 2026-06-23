import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const isHome = pathname === '/'
  const onResources = pathname === '/resources'
  const onLockpicks = pathname === '/lockpicks'
  const onPrints = pathname === '/prints'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [pathname])

  const a = (anchor: string) => isHome ? `#${anchor}` : `/#${anchor}`
  const close = () => setMenuOpen(false)

  const goToSection = (anchor: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    close()
    if (isHome) {
      document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth' })
      window.history.replaceState(null, '', `#${anchor}`)
    } else {
      navigate(`/#${anchor}`)
    }
  }

  return (
    <nav className={`nav${scrolled ? ' nav--scrolled' : ''}`}>
      <a href="/" className="nav-logo">
        <picture>
          <source media="(max-width: 900px)" srcSet="/brand/android-chrome-192x192.png" />
          <img src="/brand/animated-logo.gif" alt="" className="nav-logo-img" />
        </picture>
        LockpickingDev
      </a>
      <ul className="nav-links">
        <li><a href={a('about')} onClick={goToSection('about')}>About</a></li>
        <li><a href={a('clearance')} onClick={goToSection('clearance')}>Record</a></li>
        <li><a href={a('services')} onClick={goToSection('services')}>Services</a></li>
        <li><a href={a('contact')} onClick={goToSection('contact')}>Contact</a></li>
        <li><Link to="/resources" className={onResources ? 'nav-link-active' : ''} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Resources</Link></li>
        <li><Link to="/lockpicks" className={onLockpicks ? 'nav-link-active' : ''} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Lockpicks</Link></li>
        <li><Link to="/prints" className={onPrints ? 'nav-link-active' : ''} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>3D Prints</Link></li>
      </ul>
      <div className="nav-right">
        <a href={a('contact')} className="nav-cta" onClick={goToSection('contact')}>
          Book a Session
        </a>
        <button
          className={`nav-hamburger${menuOpen ? ' nav-hamburger--open' : ''}`}
          onClick={() => setMenuOpen(o => !o)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {menuOpen && (
        <div className="nav-mobile-menu">
          <a href={a('about')} className="nav-mobile-link" onClick={goToSection('about')}>About</a>
          <a href={a('clearance')} className="nav-mobile-link" onClick={goToSection('clearance')}>Record</a>
          <a href={a('services')} className="nav-mobile-link" onClick={goToSection('services')}>Services</a>
          <a href={a('contact')} className="nav-mobile-link" onClick={goToSection('contact')}>Contact</a>
          <Link to="/resources" className={`nav-mobile-link${onResources ? ' nav-link-active' : ''}`} onClick={() => { close(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>Resources</Link>
          <Link to="/lockpicks" className={`nav-mobile-link${onLockpicks ? ' nav-link-active' : ''}`} onClick={() => { close(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>Lockpicks</Link>
          <Link to="/prints" className={`nav-mobile-link${onPrints ? ' nav-link-active' : ''}`} onClick={() => { close(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>3D Prints</Link>
        </div>
      )}
    </nav>
  )
}
