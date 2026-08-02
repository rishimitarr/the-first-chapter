import Nav from '../components/Nav'
import Footer from '../components/Footer'
import EventRecap from '../components/EventRecap'
import { getLatestEventRecap } from '../data/eventRecaps'

export default function ImpactPage() {
  const latestEvent = getLatestEventRecap()

  return (
    <>
      <Nav />
      <main>
        <EventRecap event={latestEvent} />
      </main>
      <Footer />
    </>
  )
}