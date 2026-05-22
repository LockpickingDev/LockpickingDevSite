import Hero from '../components/Hero'
import EventsStrip from '../components/EventsStrip'
import About from '../components/About'
import EventsGrid from '../components/EventsGrid'
import Skills from '../components/Skills'
import Services from '../components/Services'
import Contact from '../components/Contact'

export default function Home() {
  return (
    <>
      <Hero />
      <EventsStrip />
      <About />
      <EventsGrid />
      <Skills />
      <Services />
      <Contact />
    </>
  )
}
