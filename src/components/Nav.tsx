import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()
  const onLab = pathname === '/lab'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`nav${scrolled ? ' nav--scrolled' : ''}`}>
      <a href="/" className="nav-logo">
        <span className="prompt">~$</span> LockpickingDev
      </a>
      <ul className="nav-links">
        {onLab ? (
          <>
            <li><a href="/#about">about</a></li>
            <li><a href="/#clearance">record</a></li>
            <li><a href="/#services">services</a></li>
            <li><a href="/#contact">contact</a></li>
            <li><Link to="/lab" className="nav-link-active">lab</Link></li>
          </>
        ) : (
          <>
            <li><a href="#about">about</a></li>
            <li><a href="#clearance">record</a></li>
            <li><a href="#skills">skills</a></li>
            <li><a href="#services">services</a></li>
            <li><a href="#contact">contact</a></li>
            <li><Link to="/lab">lab</Link></li>
          </>
        )}
      </ul>
      <a href={onLab ? '/#contact' : '#contact'} className="nav-cta">
        &gt; request_session
      </a>
    </nav>
  )
}
