import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Hero from '../components/Hero'
import EventsStrip from '../components/EventsStrip'
import About from '../components/About'
import EventsGridV2 from '../components/EventsGridV2'
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
      <Hero />
      <EventsStrip />
      <About />
      <EventsGridV2 />
      <Services />
      <Contact />
    </>
  )
}
