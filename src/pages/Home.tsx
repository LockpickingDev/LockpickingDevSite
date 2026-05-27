import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Hero from '../components/Hero'
import EventsStrip from '../components/EventsStrip'
import About from '../components/About'
import EventsGrid from '../components/EventsGrid'
import Services from '../components/Services'
import Contact from '../components/Contact'

export default function Home() {
  const { hash } = useLocation()

  useEffect(() => {
    if (!hash) return
    const el = document.querySelector(hash)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }, [hash])

  return (
    <>
      <Helmet>
        <title>LockpickingDev | Lockpicking Lessons &amp; Events — St. Louis, MO</title>
        <meta name="description" content="Private lockpicking lessons, corporate team-building workshops, and full lockpicking villages for conferences &amp; conventions. St. Louis, MO — groups of 5 to 500. Book LockpickingDev today." />
        <link rel="canonical" href="https://lockpicking.dev/" />
      </Helmet>
      <Hero />
      <EventsStrip />
      <About />
      <EventsGrid />
      <Services />
      <Contact />
    </>
  )
}
