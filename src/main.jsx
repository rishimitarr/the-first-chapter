import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import CareKitsLanding from './components/CareKitsLanding.jsx'
import EducationKit from './components/EducationKit.jsx'
import AboutPage from './pages/AboutPage.jsx'
import ImpactPage from './pages/ImpactPage.jsx'
import DonationComingSoon from './pages/DonationComingSoon.jsx'
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
        <Route path="/mission" element={<Navigate to="/about" replace />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/event-gallery" element={<ImpactPage />} />
        <Route path="/impact" element={<Navigate to="/event-gallery" replace />} />
        <Route path="/care-kits" element={<CareKitsLanding />} />
        <Route path="/care-kits/education" element={<EducationKit />} />
        <Route path="/donate" element={<DonationComingSoon />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
