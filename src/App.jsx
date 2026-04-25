import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Mission from './components/Mission'
import About from './components/About'
import Impact from './components/Impact'
import JoinTeam from './components/JoinTeam'
import Footer from './components/Footer'
import './index.css'

export default function App() {
  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif', background: '#fdf9f5' }}>
      <Navbar />
      <Hero />
      <Mission />
      <About />
      <Impact />
      <JoinTeam />
      <Footer />
    </div>
  )
}
