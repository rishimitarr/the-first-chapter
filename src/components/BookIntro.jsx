import { motion, useAnimation } from 'framer-motion'
import { useState, useEffect } from 'react'

function getBookSize() {
  const vw = window.innerWidth
  const vh = window.innerHeight
  const isMobile = vw <= 600
  const W = isMobile ? Math.round(vw * 0.78) : Math.round(Math.min(vw * 0.42, 520))
  const H = Math.round(W * 1.42)
  const D = Math.round(W * 0.07)
  // Keep book within vertical viewport
  const maxH = Math.round(vh * 0.72)
  if (H > maxH) {
    const scale = maxH / H
    return { W: Math.round(W * scale), H: maxH, D: Math.round(D * scale) }
  }
  return { W, H, D }
}

export default function BookIntro({ onComplete }) {
  const [visible, setVisible] = useState(true)
  const [dims, setDims] = useState(() => getBookSize())
  const coverControls = useAnimation()
  const textControls = useAnimation()
  const overlayControls = useAnimation()

  useEffect(() => {
    const handleResize = () => setDims(getBookSize())
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    async function sequence() {
      await new Promise((r) => setTimeout(r, 400))
      await coverControls.start({
        rotateY: 180,
        transition: { duration: 1.2, ease: [0.4, 0, 0.2, 1] },
      })
      await textControls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 },
      })
      await new Promise((r) => setTimeout(r, 900))
      await overlayControls.start({
        opacity: 0,
        transition: { duration: 0.7 },
      })
      setVisible(false)
      onComplete?.()
    }
    sequence()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  if (!visible) return null

  const { W, H, D } = dims
  const logoSize = Math.round(W * 0.52)
  const coverLogoSize = Math.round(W * 0.46)
  const chapterFontSize = Math.round(W * 0.042)
  const coverTitleFontSize = Math.round(W * 0.036)

  const s = makeStyles(W, H, D, logoSize, coverLogoSize, chapterFontSize, coverTitleFontSize)

  return (
    <motion.div animate={overlayControls} style={s.overlay}>
      <div style={s.scene}>
        <motion.div style={s.bookContainer}>
          <div style={s.backCover} />
          <div style={s.spine} />
          <div style={s.pages} />
          <div style={s.insidePage}>
            <motion.div animate={textControls} initial={{ opacity: 0, y: 10 }} style={s.insideContent}>
              <img src="/New First Chapter Logo.png" alt="The First Chapter" style={s.insideLogo} />
              <div style={s.chapterLabel}>Chapter 1</div>
            </motion.div>
          </div>
          <motion.div animate={coverControls} initial={{ rotateY: 0 }} style={s.frontCover}>
            <div style={s.coverFace}>
              <img src="/New First Chapter Logo.png" alt="The First Chapter" style={s.coverLogo} />
              <div style={s.coverTitle}>The First Chapter</div>
            </div>
            <div style={s.coverInside} />
          </motion.div>
        </motion.div>
      </div>
      <div style={s.hint}>Opening your story…</div>
    </motion.div>
  )
}

function makeStyles(W, H, D, logoSize, coverLogoSize, chapterFontSize, coverTitleFontSize) {
  return {
    overlay: {
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      background: '#FDFAF6',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: Math.round(H * 0.06),
    },
    scene: {
      perspective: '2000px',
      perspectiveOrigin: '50% 40%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    bookContainer: {
      width: W,
      height: H,
      position: 'relative',
      transformStyle: 'preserve-3d',
      transform: 'none',
      filter: 'drop-shadow(0 24px 64px rgba(0,0,0,0.32))',
    },
    backCover: {
      position: 'absolute', left: 0, top: 0, width: W, height: H,
      background: '#0F2544',
      borderRadius: '6px 12px 12px 6px',
    },
    spine: {
      position: 'absolute', left: 0, top: 0, width: D, height: H,
      background: '#0A1B33',
      transformOrigin: 'left center',
      transform: 'rotateY(-90deg)',
    },
    pages: {
      position: 'absolute', right: 0, top: 0, width: D, height: H,
      background: 'linear-gradient(to right, #E8D5A3, #F5ECD7)',
      transformOrigin: 'right center',
      transform: 'rotateY(90deg)',
    },
    insidePage: {
      position: 'absolute', left: 0, top: 0, width: W, height: H,
      background: '#FDFAF6',
      borderRadius: '6px 12px 12px 6px',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      transform: 'translateZ(0.5px)',
      zIndex: 1,
    },
    insideContent: {
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      gap: Math.round(H * 0.03),
    },
    insideLogo: {
      width: logoSize, height: 'auto', objectFit: 'contain', mixBlendMode: 'multiply',
    },
    chapterLabel: {
      fontFamily: "'Poppins', sans-serif",
      fontWeight: 600,
      fontSize: `${chapterFontSize}px`,
      color: '#1A3A6B',
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
    },
    frontCover: {
      position: 'absolute', left: 0, top: 0, width: W, height: H,
      transformStyle: 'preserve-3d',
      transformOrigin: 'left center',
      zIndex: 2,
    },
    coverFace: {
      position: 'absolute', inset: 0,
      background: '#1A3A6B',
      borderRadius: '6px 12px 12px 6px',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      gap: Math.round(H * 0.04),
      backfaceVisibility: 'hidden',
      WebkitBackfaceVisibility: 'hidden',
    },
    coverLogo: {
      width: coverLogoSize, height: 'auto', objectFit: 'contain',
      filter: 'brightness(0) invert(1)', opacity: 0.9,
    },
    coverTitle: {
      fontFamily: "'Poppins', sans-serif",
      fontWeight: 700,
      fontSize: `${coverTitleFontSize}px`,
      color: 'rgba(255,255,255,0.85)',
      letterSpacing: '0.10em',
      textTransform: 'uppercase',
      textAlign: 'center',
    },
    coverInside: {
      position: 'absolute', inset: 0,
      background: '#e8e4de',
      borderRadius: '6px 12px 12px 6px',
      backfaceVisibility: 'hidden',
      WebkitBackfaceVisibility: 'hidden',
      transform: 'rotateY(180deg)',
    },
    hint: {
      fontFamily: "'DM Sans', sans-serif",
      fontSize: `${Math.round(W * 0.036)}px`,
      color: 'rgba(26,58,107,0.4)',
      letterSpacing: '0.06em',
    },
  }
}
