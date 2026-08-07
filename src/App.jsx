import Nav from './components/Nav'
import Hero from './components/Hero'
import HomeAbout from './components/HomeAbout'
import ImpactStrip from './components/ImpactStrip'
import EventRecap from './components/EventRecap'
import ProgramCards from './components/ProgramCards'
import ReadingList from './components/ReadingList'
import Join from './components/Join'
import Footer from './components/Footer'
import { getLatestEventRecap } from './data/eventRecaps'

function App() {
  const latestEvent = getLatestEventRecap()

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <HomeAbout />
        <ImpactStrip />
        <EventRecap event={latestEvent} variant="teaser" />
        <ProgramCards />
        <ReadingList />
        <Join />
      </main>
      <Footer />
    </>
  )
}

export default App
