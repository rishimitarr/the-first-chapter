import Nav from './components/Nav'
import Hero from './components/Hero'
import Mission from './components/Mission'
import About from './components/About'
import Join from './components/Join'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Mission />
        <About />
        <Join />
      </main>
      <Footer />
    </>
  )
}

export default App
