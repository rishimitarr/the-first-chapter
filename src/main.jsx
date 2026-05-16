import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import CareKitsLanding from './components/CareKitsLanding.jsx'
import EducationKit from './components/EducationKit.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'

document.addEventListener('touchmove', (e) => {
  if (e.touches.length > 1) e.preventDefault()
}, { passive: false })

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/care-kits" element={<CareKitsLanding />} />
        <Route path="/care-kits/education" element={<EducationKit />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
