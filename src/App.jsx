import Nav from './components/Nav'
import Hero from './components/Hero'
import HomeAbout from './components/HomeAbout'
import ImpactStrip from './components/ImpactStrip'
import ProgramCards from './components/ProgramCards'
import ReadingList from './components/ReadingList'
import Join from './components/Join'
import Footer from './components/Footer'
import DonateFloat from './components/DonateFloat'

function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <HomeAbout />
        <ImpactStrip />
        <ProgramCards />
        <ReadingList />
        <Join />
      </main>
      <Footer />
      <DonateFloat variant="kit" to="/care-kits#donate" />
    </>
  )
}

export default App
