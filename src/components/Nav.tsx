import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const onResources = pathname === '/resources'
  const onLockpicks = pathname === '/lockpicks'
  const onPrints = pathname === '/prints'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const a = (anchor: string) => isHome ? `#${anchor}` : `/#${anchor}`

  return (
    <nav className={`nav${scrolled ? ' nav--scrolled' : ''}`}>
      <a href="/" className="nav-logo">
        <img src="/brand/animated-logo.gif" alt="" className="nav-logo-img" />
        LockpickingDev
      </a>
      <ul className="nav-links">
        <li><a href={a('about')}>About</a></li>
        <li><a href={a('clearance')}>Record</a></li>
        <li><a href={a('services')}>Services</a></li>
        <li><a href={a('contact')}>Contact</a></li>
        <li><Link to="/resources" className={onResources ? 'nav-link-active' : ''} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Resources</Link></li>
        <li><Link to="/lockpicks" className={onLockpicks ? 'nav-link-active' : ''} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Lockpicks</Link></li>
        <li><Link to="/prints" className={onPrints ? 'nav-link-active' : ''} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>3D Prints</Link></li>
      </ul>
      <a href={isHome ? '#contact' : '/#contact'} className="nav-cta">
        Book a Session
      </a>
    </nav>
  )
}
