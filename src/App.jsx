import Nav from './components/Nav'
import Hero from './components/Hero'
import HomeAbout from './components/HomeAbout'
import ImpactStrip from './components/ImpactStrip'
import OurImpact from './components/OurImpact'
import EventRecap from './components/EventRecap'
import ProgramCards from './components/ProgramCards'
import ReadingList from './components/ReadingList'
import Join from './components/Join'
import Footer from './components/Footer'
import { getLatestEventRecaps } from './data/eventRecaps'

function App() {
  const latestEvents = getLatestEventRecaps()

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <HomeAbout />
        <ImpactStrip />
        <OurImpact />
        {latestEvents.map((event) => (
          <EventRecap key={event.slug} event={event} variant="teaser" />
        ))}
        <ProgramCards />
        <ReadingList />
        <Join />
      </main>
      <Footer />
    </>
  )
}

export default App
