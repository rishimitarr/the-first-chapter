import Nav from './components/Nav'
import Hero from './components/Hero'
import HomeAbout from './components/HomeAbout'
import ImpactStrip from './components/ImpactStrip'
import ProgramCards from './components/ProgramCards'
import Join from './components/Join'
import Footer from './components/Footer'
import DonateFloat from './components/DonateFloat'

const bannerStyle = {
  background: '#1A3A6B',
  color: '#fff',
  textAlign: 'center',
  padding: '10px 16px',
  fontFamily: "'Inter', sans-serif",
  fontSize: '0.85rem',
  letterSpacing: '0.02em',
}

function App() {
  return (
    <>
      <div style={bannerStyle}>🚧 This site is currently under construction. Some things may change.</div>
      <Nav />
      <main>
        <Hero />
        <HomeAbout />
        <ImpactStrip />
        <ProgramCards />
        <Join />
      </main>
      <Footer />
      <DonateFloat />
    </>
  )
}

export default App
