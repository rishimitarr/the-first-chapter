import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useScroll } from 'framer-motion'
import {
  Heart,
  Pencil,
  Palette,
  Calculator,
  Eraser,
  Ruler,
  ArrowLeft,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import Nav from './Nav'
import Footer from './Footer'
import DonateFloat from './DonateFloat'

// ── Timing knobs ──────────────────────────────────────────────────────────────
const SCROLL_START = '38%'
const ANIM_END = 1.0
const SECTION_HEIGHT_VH = 110
const MOBILE_SECTION_HEIGHT_VH = 130
const FRAME_LERP = 0.26
const MOBILE_FRAME_STEP = 8
const MOBILE_MAX_DPR = 1

const FRAME_COUNT = 144
const FRAME_VER = 'v3'
const framePath = (i) =>
  `/kit-frames-webp/frame-${String(i).padStart(3, '0')}.webp?${FRAME_VER}`

const PAGE_BG = '#fff'
const EDUCATION_BLUE = '#0099D6'
const LOGO_GREEN = '#57A018'
const LOGO_ORANGE = '#F7941D'
const LOGO_PINK = '#EE3093'
const LOGO_TEAL = '#14B8A6'
const LOGO_NAVY = '#1A3A6B'
const NEUTRAL_ACCENT = '#1A1A1A'

const colorShadow = (color, opacity = 0.18) => {
  const hex = color.replace('#', '')
  const r = parseInt(hex.slice(0, 2), 16)
  const g = parseInt(hex.slice(2, 4), 16)
  const b = parseInt(hex.slice(4, 6), 16)
  return `rgba(${r},${g},${b},${opacity})`
}

const fromLeft = {
  hidden: { opacity: 0, x: -150, scale: 0.96, transition: { duration: 0.3, ease: 'easeIn' } },
  visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] } },
}
const fromRight = {
  hidden: { opacity: 0, x: 150, scale: 0.96, transition: { duration: 0.3, ease: 'easeIn' } },
  visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] } },
}
const fromBottom = {
  hidden: { opacity: 0, y: 120, scale: 0.96, transition: { duration: 0.3, ease: 'easeIn' } },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] } },
}

// ─── CraftCard ────────────────────────────────────────────────────────────────

function CraftCard({ card, index }) {
  return (
    <motion.div
      style={styles.craftCard}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, boxShadow: `0 16px 40px ${colorShadow(card.color, 0.16)}` }}
    >
      <div style={styles.craftImgWrap}>
        <img src={card.img} alt={card.title} style={styles.craftImg} />
        <span style={styles.craftCredit}>Photo: {card.credit}</span>
      </div>
      <div style={styles.craftBody}>
        <span style={{ ...styles.craftNumber, color: card.color }}>{card.num}</span>
        <h3 style={styles.craftCardTitle}>{card.title}</h3>
        <p style={styles.craftCardBody}>{card.body}</p>
      </div>
    </motion.div>
  )
}

// ─── Main ────────────────────────────────────────────────────────────────────

export default function EducationKit() {
  const sectionRef = useRef(null)
  const canvasRef = useRef(null)
  const imagesRef = useRef([])
  const currentFrame = useRef(0)
  const targetFrame = useRef(0)
  const lastDrawnFrame = useRef(-1)
  const [loadedPct, setLoadedPct] = useState(0)
  const [ready, setReady] = useState(false)
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth <= 768 : false
  )
  const frameNumbers = useMemo(() => {
    if (!isMobile) return Array.from({ length: FRAME_COUNT }, (_, i) => i + 1)
    const frames = []
    for (let i = 1; i <= FRAME_COUNT; i += MOBILE_FRAME_STEP) frames.push(i)
    if (frames[frames.length - 1] !== FRAME_COUNT) frames.push(FRAME_COUNT)
    return frames
  }, [isMobile])

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const [titleNumber, setTitleNumber] = useState(0)
  const rotateWords = useMemo(
    () => ['One Story.', 'One Chapter.', 'One Beginning.', 'One Promise.', 'One Change.'],
    []
  )

  useEffect(() => {
    const id = setTimeout(() => {
      setTitleNumber(titleNumber === rotateWords.length - 1 ? 0 : titleNumber + 1)
    }, 2200)
    return () => clearTimeout(id)
  }, [titleNumber, rotateWords])

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: [`start ${SCROLL_START}`, 'end end'],
  })

  useEffect(() => {
    let cancelled = false
    const resetFrame = requestAnimationFrame(() => {
      if (cancelled) return
      setReady(false)
      setLoadedPct(0)
    })
    imagesRef.current = []
    currentFrame.current = 0
    targetFrame.current = 0
    const priority = []
    const rest = []
    frameNumbers.forEach((i) => {
      if (isMobile || i === 1 || i === FRAME_COUNT || i % 6 === 0) priority.push(i)
      else rest.push(i)
    })
    const order = [...priority, ...rest]
    const imgs = new Array(FRAME_COUNT)
    let count = 0
    const criticalCount = isMobile ? order.length : Math.min(20, priority.length)
    let critical = 0
    order.forEach((n, idx) => {
      const img = new Image()
      img.decoding = 'async'
      img.fetchPriority = idx < criticalCount ? 'high' : 'low'
      img.src = framePath(n)
      img.onload = () => {
        if (cancelled) return
        count++
        if (idx < criticalCount) critical++
        if (critical >= criticalCount) setReady(true)
        setLoadedPct(Math.round((count / order.length) * 100))
        window.dispatchEvent(new Event('kit-frame-ready'))
      }
      img.onerror = () => {
        if (cancelled) return
        count++
        if (count >= order.length) setReady(true)
      }
      imgs[n - 1] = img
    })
    imagesRef.current = imgs
    const fallback = setTimeout(() => setReady(true), 1500)
    return () => {
      cancelled = true
      cancelAnimationFrame(resetFrame)
      clearTimeout(fallback)
    }
  }, [frameNumbers, isMobile])

  useEffect(() => {
    return scrollYProgress.on('change', (v) => {
      const t = Math.min(1, Math.max(0, v / ANIM_END))
      const nextFrame = t * (FRAME_COUNT - 1)
      targetFrame.current = isMobile
        ? Math.min(
            FRAME_COUNT - 1,
            Math.round(nextFrame / MOBILE_FRAME_STEP) * MOBILE_FRAME_STEP
          )
        : nextFrame
    })
  }, [isMobile, scrollYProgress])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf
    let drawing = false
    let dpr = Math.min(window.devicePixelRatio || 1, isMobile ? MOBILE_MAX_DPR : 2.25)

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      dpr = Math.min(window.devicePixelRatio || 1, isMobile ? MOBILE_MAX_DPR : 2.25)
      canvas.width = Math.max(1, Math.floor(rect.width * dpr))
      canvas.height = Math.max(1, Math.floor(rect.height * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = isMobile ? 'medium' : 'high'
      lastDrawnFrame.current = -1
      requestDraw()
    }

    const pickImage = (idx) => {
      const arr = imagesRef.current
      const target = arr[idx]
      if (target && target.complete && target.naturalWidth) return target
      for (let s = 1; s < (isMobile ? MOBILE_FRAME_STEP + 2 : 18); s++) {
        const a = arr[idx - s]
        if (a && a.complete && a.naturalWidth) return a
        const b = arr[idx + s]
        if (b && b.complete && b.naturalWidth) return b
      }
      return null
    }

    const draw = () => {
      drawing = false
      if (isMobile) currentFrame.current = targetFrame.current
      else currentFrame.current += (targetFrame.current - currentFrame.current) * FRAME_LERP
      const idx = Math.round(currentFrame.current)
      if (isMobile && idx === lastDrawnFrame.current) return
      const img = pickImage(idx)
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      ctx.clearRect(0, 0, w, h)
      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = isMobile ? 'medium' : 'high'
      if (img) {
        const ir = img.naturalWidth / img.naturalHeight
        const cr = w / h
        const scale = 0.94
        let dw, dh
        if (ir > cr) { dw = w * scale; dh = (w * scale) / ir }
        else { dh = h * scale; dw = (h * scale) * ir }
        const dx = (w - dw) / 2
        const dy = (h - dh) / 2
        ctx.drawImage(img, dx, dy, dw, dh)
      }
      lastDrawnFrame.current = idx
      if (!isMobile) raf = requestAnimationFrame(draw)
    }

    function requestDraw() {
      if (drawing) return
      drawing = true
      raf = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('kit-frame-ready', requestDraw)
    const unsubscribe = isMobile
      ? scrollYProgress.on('change', requestDraw)
      : undefined
    requestDraw()

    return () => {
      cancelAnimationFrame(raf)
      unsubscribe?.()
      window.removeEventListener('resize', resize)
      window.removeEventListener('kit-frame-ready', requestDraw)
    }
  }, [isMobile, scrollYProgress])

  return (
    <div style={{ background: PAGE_BG, color: '#1A1A1A' }}>
      <Nav />

      {/* HERO */}
      <section style={styles.hero}>
        <img src="/education-kit-landing.jpg" alt="" aria-hidden="true" style={styles.heroBg} />
        <div style={styles.heroOverlay} />
        <div style={{ ...styles.heroInner, padding: isMobile ? '0 24px' : '0 60px' }}>
          {/* back link */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Link to="/care-kits" style={styles.backLink}>
              <ArrowLeft size={15} strokeWidth={2.5} style={{ marginRight: 6 }} />
              All Care Kits
            </Link>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            style={styles.heroH1}
          >
            <span style={{ ...styles.heroLine, whiteSpace: 'nowrap' }}>The Educational Kit.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
            style={styles.heroLead}
          >
            Stationery essentials and a comfort item, hand packed for one child in the
            Greater Toronto Area who is navigating a hospital stay, shelter placement,
            or home in transition.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            style={styles.heroCtaRow}
          >
            <a href="#the-kit" style={styles.heroPrimary}>
              See What's Inside
            </a>
            <Link to="/care-kits#donate" style={styles.heroGhost}>
              Donate Today
            </Link>
          </motion.div>
        </div>
      </section>

      {/* SCROLL ANIMATION */}
      <section ref={sectionRef} id="the-kit" style={{ ...styles.scrollSection, height: isMobile ? `${MOBILE_SECTION_HEIGHT_VH}vh` : `${SECTION_HEIGHT_VH}vh` }}>
        <div style={isMobile ? styles.stickyMobile : styles.sticky}>
          <div style={styles.kitLabelWrap}>
            <span style={styles.kitEyebrow}>Presenting</span>
            <span style={styles.kitTitle}>The Educational Kit</span>
          </div>
          <div style={styles.stage}>
            <canvas ref={canvasRef} style={isMobile ? styles.canvasMobile : styles.canvas} />
          </div>
          <span style={styles.disclaimer}>Illustration is not accurate to scale or quantity.</span>
          {!ready && (
            <div style={styles.loader}>
              <div style={styles.loaderTrack}>
                <div style={{ ...styles.loaderFill, width: `${loadedPct}%` }} />
              </div>
              <span style={styles.loaderText}>Preparing kit {loadedPct}%</span>
            </div>
          )}
        </div>
      </section>

      {/* WHAT'S INSIDE */}
      <section id="whats-inside" style={styles.section}>
        <div style={styles.sectionInner}>
          <motion.div
            variants={fromLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: '-250px 0px -80px 0px' }}
          >
            <span style={styles.sectionEyebrow}>Kit Contents</span>
            <h2 style={{ ...styles.sectionH2, maxWidth: 'none', whiteSpace: isMobile ? 'normal' : 'nowrap' }}>
              What's Included
            </h2>
            <p style={styles.sectionLead}>
              At its core, the Educational Kit is a stationery kit: the everyday supplies
              that make school feel possible. Pencils, erasers, rulers. The things most kids
              take for granted, and that children in crisis are the most likely to be without.
              We source each item carefully so the kit feels complete, not makeshift.
            </p>

            <div style={{ ...styles.insideGrid, gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)' }}>
              {[
                { icon: Heart,      color: LOGO_PINK,      name: 'Mini Plushie',        desc: 'A small comfort plushie tucked into every kit because kids need more than supplies.' },
                { icon: Pencil,     color: EDUCATION_BLUE, name: 'Pencils',             desc: 'HB graphite pencils, ready to use for the first day back.' },
                { icon: Palette,    color: LOGO_ORANGE,    name: 'Coloured Pencils',    desc: 'A set of vibrant pencil crayons for creative work, art, and expression.' },
                { icon: Calculator, color: LOGO_NAVY,      name: 'Calculator',          desc: 'A basic calculator to support math work across grade levels.' },
                { icon: Eraser,     color: LOGO_GREEN,     name: 'Erasers',             desc: 'Soft erasers that keep the page clean and mistakes easy to fix.' },
                { icon: Ruler,      color: LOGO_TEAL,      name: 'Ruler and Sharpener', desc: 'A 30 cm ruler and a handheld sharpener so nothing stops the work.' },
              ].map((item) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={item.name}
                    whileHover={{ y: -6, boxShadow: `0 16px 36px ${colorShadow(item.color, 0.16)}`, transition: { type: 'spring', stiffness: 280, damping: 18 } }}
                    style={styles.insideCard}
                  >
                    <span style={{ ...styles.insideIconWrap, background: `${item.color}18` }}>
                      <Icon size={22} color={item.color} strokeWidth={2} />
                    </span>
                    <span style={styles.insideName}>{item.name}</span>
                    <span style={styles.insideDesc}>{item.desc}</span>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section id="recipients" style={styles.section}>
        <div style={styles.sectionInner}>
          <motion.div
            variants={fromBottom}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: '-250px 0px -80px 0px' }}
          >
            <span style={styles.sectionEyebrow}>Recipients</span>
            <h2 style={styles.sectionH2}>
              Who Receives Kits
            </h2>
            <p style={styles.sectionLead}>
              Our Educational Kits go directly to children across the Greater Toronto Area
              who are spending time in hospital wards, family shelters, foster placements,
              and homes in transition. Education is one of the first things that pauses when
              a child's life shifts. The kit is our small, real answer: a familiar set of
              supplies that says you are still a student, still a kid, still on your way.
            </p>

            <div style={styles.statRow}>
              {[
                { k: 'Across the GTA', v: 'Hospitals, shelters, family programs', color: EDUCATION_BLUE },
                { k: 'Personalized', v: 'Each kit packed with a single child in mind', color: LOGO_ORANGE },
                { k: 'No cost', v: 'Delivered to families and partners for free', color: LOGO_GREEN },
              ].map((s) => (
                <motion.div
                  key={s.k}
                  whileHover={{ y: -8, scale: 1.02, boxShadow: `0 16px 36px ${colorShadow(s.color, 0.16)}`, transition: { type: 'spring', stiffness: 280, damping: 18 } }}
                  style={styles.statCard}
                >
                  <span style={{ ...styles.statKey, color: s.color }}>{s.k}</span>
                  <span style={styles.statVal}>{s.v}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* HOW IT'S MADE */}
      <section id="craft" style={styles.section}>
        <div style={styles.sectionInner}>
          <motion.div
            variants={fromRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: '-250px 0px -80px 0px' }}
          >
            <span style={styles.sectionEyebrow}>Process</span>
            <h2 style={styles.sectionH2}>
              Kit Assembly
            </h2>

            <div style={{ ...styles.cardGrid, gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)' }}>
              {[
                { num: '01', color: EDUCATION_BLUE, title: 'Sourced with intent', body: 'Every supply is chosen for durability, child safety, and usefulness in real classrooms.', img: '/pillar-edu-a.jpg', credit: 'Unsplash' },
                { num: '02', color: LOGO_ORANGE, title: 'Packed by hand', body: 'Volunteers assemble each kit one at a time, with care built into every pouch.', img: '/care-kits-about.jpg', credit: 'Annie Spratt' },
                { num: '03', color: LOGO_GREEN, title: 'Delivered with care', body: 'Kits are handed to trusted hospital, shelter, and family program partners across the GTA.', img: '/pillar-health-b.jpg', credit: 'Unsplash' },
              ].map((c, i) => (
                <CraftCard key={c.title} card={c} index={i} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
      <DonateFloat
        label="Donate Today"
        to="/care-kits#donate"
        background={LOGO_NAVY}
        shadow="0 6px 24px rgba(26,58,107,0.30)"
      />
    </div>
  )
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = {
  hero: { position: 'relative', width: '100%', height: '100dvh', minHeight: 600, overflow: 'hidden', display: 'flex', alignItems: 'center' },
  heroBg: { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%', display: 'block' },
  heroOverlay: { position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.38) 55%, rgba(0,0,0,0.48) 100%)', zIndex: 1 },
  heroInner: { position: 'relative', zIndex: 2, padding: '0 60px', display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 820 },
  backLink: {
    display: 'inline-flex',
    alignItems: 'center',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 600,
    fontSize: '0.85rem',
    color: LOGO_NAVY,
    textDecoration: 'none',
    letterSpacing: '0.02em',
    border: '1.5px solid rgba(243,247,252,0.9)',
    background: '#F3F7FC',
    backdropFilter: 'blur(8px)',
    padding: '7px 16px',
    borderRadius: 4,
    width: 'fit-content',
  },
  heroH1: { fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 'clamp(2.4rem, 5.5vw, 5rem)', lineHeight: 1.08, color: '#ffffff', margin: 0, letterSpacing: '-0.02em', textShadow: '0 2px 32px rgba(0,0,0,0.4)' },
  heroLine: { display: 'block' },
  heroLead: { fontFamily: "'Inter', sans-serif", fontSize: 'clamp(1rem, 1.3vw, 1.2rem)', lineHeight: 1.65, color: 'rgba(255,255,255,0.92)', maxWidth: 620, margin: 0, textShadow: '0 1px 12px rgba(0,0,0,0.35)' },
  heroCtaRow: { display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' },
  heroPrimary: { display: 'inline-flex', alignItems: 'center', padding: '14px 30px', borderRadius: 4, fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '0.95rem', color: LOGO_NAVY, background: '#F3F7FC', border: '1.5px solid rgba(243,247,252,0.9)', boxShadow: '0 6px 24px rgba(0,0,0,0.22)', textDecoration: 'none' },
  heroGhost: { display: 'inline-flex', alignItems: 'center', padding: '14px 26px', borderRadius: 4, fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '0.95rem', color: LOGO_NAVY, border: '1.5px solid rgba(243,247,252,0.9)', background: '#F3F7FC', backdropFilter: 'blur(10px)', textDecoration: 'none' },

  scrollSection: { position: 'relative', height: `${SECTION_HEIGHT_VH}vh` },
  sticky: { position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' },
  stickyMobile: { position: 'sticky', top: 0, height: '100svh', overflow: 'hidden' },
  kitLabelWrap: { position: 'absolute', top: 'clamp(40px, 7vh, 80px)', left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, zIndex: 5, pointerEvents: 'none' },
  kitEyebrow: { fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: '0.92rem', letterSpacing: '0.34em', textTransform: 'uppercase', color: '#1A1A1A' },
  kitTitle: { fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 'clamp(1.9rem, 3.4vw, 2.8rem)', lineHeight: 1.1, letterSpacing: '-0.02em', color: '#1A1A1A' },
  stage: { position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: 'clamp(60px, 9vh, 120px)', zIndex: 2 },
  disclaimer: { position: 'absolute', bottom: 'clamp(20px, 3vh, 36px)', left: 0, right: 0, textAlign: 'center', fontFamily: "'Inter', sans-serif", fontSize: '0.74rem', fontStyle: 'italic', letterSpacing: '0.04em', color: 'rgba(0,0,0,0.45)', pointerEvents: 'none', zIndex: 4 },
  canvas: { width: 'min(76vw, 1040px)', height: 'min(60vh, 660px)', display: 'block', background: 'transparent' },
  canvasMobile: { width: 'min(88vw, 520px)', height: '42vh', display: 'block', background: 'transparent' },
  loader: { position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14, background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(8px)', zIndex: 6 },
  loaderTrack: { width: 220, height: 3, background: 'rgba(0,0,0,0.12)', borderRadius: 100, overflow: 'hidden' },
  loaderFill: { height: '100%', background: EDUCATION_BLUE, transition: 'width 0.2s ease' },
  loaderText: { fontFamily: "'Inter', sans-serif", fontSize: '0.78rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(0,153,214,0.72)' },

  section: { position: 'relative', padding: '0 24px clamp(80px, 12vh, 140px)' },
  sectionInner: { maxWidth: 1080, margin: '0 auto' },
  sectionEyebrow: { display: 'block', fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '0.72rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#aaa', marginBottom: 14, background: 'none', padding: 0, borderRadius: 0 },
  sectionH2: { fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 750, fontSize: 'clamp(1.9rem, 3vw, 2.55rem)', lineHeight: 1.12, letterSpacing: '-0.015em', color: '#1A1A1A', margin: '0 0 24px', maxWidth: 820 },
  h2Em: { color: NEUTRAL_ACCENT, fontStyle: 'normal' },
  sectionLead: { fontFamily: "'Inter', sans-serif", fontSize: 'clamp(1rem, 1.25vw, 1.18rem)', lineHeight: 1.7, color: '#555', maxWidth: 760, margin: '0 0 48px' },

  statRow: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 18 },
  statCard: { background: '#FFFFFF', border: '1px solid rgba(0,0,0,0.06)', borderRadius: 6, padding: '22px 24px', display: 'flex', flexDirection: 'column', gap: 8, boxShadow: '0 2px 16px rgba(0,0,0,0.07)' },
  statKey: { fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: '0.78rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: EDUCATION_BLUE },
  statVal: { fontFamily: "'Inter', sans-serif", fontSize: '1rem', lineHeight: 1.5, color: '#555' },

  insideGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 },
  insideCard: { background: '#FFFFFF', border: '1px solid rgba(0,0,0,0.06)', borderRadius: 6, padding: '26px 24px', display: 'flex', flexDirection: 'column', gap: 10, boxShadow: '0 2px 16px rgba(0,0,0,0.07)', cursor: 'default' },
  insideIconWrap: { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 44, height: 44, borderRadius: 8 },
  insideName: { fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '1.05rem', color: '#1A1A1A', letterSpacing: '-0.01em' },
  insideDesc: { fontFamily: "'Inter', sans-serif", fontSize: '0.95rem', lineHeight: 1.6, color: '#555' },

  cardGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 },
  craftCard: { background: '#fff', borderRadius: 6, overflow: 'hidden', boxShadow: '0 2px 16px rgba(0,0,0,0.07)', cursor: 'default', border: '1px solid rgba(0,0,0,0.06)', display: 'flex', flexDirection: 'column' },
  craftImgWrap: { height: 240, overflow: 'hidden', position: 'relative' },
  craftImg: { width: '100%', height: '100%', objectFit: 'cover', display: 'block' },
  craftCredit: { position: 'absolute', bottom: 8, right: 10, fontFamily: "'Inter', sans-serif", fontSize: '0.6rem', color: 'rgba(255,255,255,0.42)', letterSpacing: '0.02em', pointerEvents: 'none' },
  craftBody: { padding: '24px 26px 28px' },
  craftNumber: { display: 'block', fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: '0.86rem', letterSpacing: '0.18em', marginBottom: 10 },
  craftCardTitle: { fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: '1.3rem', letterSpacing: '-0.01em', margin: '0 0 10px', color: '#1A1A1A' },
  craftCardBody: { fontFamily: "'Inter', sans-serif", fontSize: '1rem', lineHeight: 1.7, color: '#555', margin: 0 },

  stepsGrid: { display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gridTemplateRows: 'auto auto', gap: 16 },
  stepCard: { position: 'relative', background: '#FFFFFF', border: '1px solid rgba(0,0,0,0.06)', borderRadius: 6, padding: '28px 24px 32px', display: 'flex', flexDirection: 'column', gap: 10, boxShadow: '0 2px 16px rgba(0,0,0,0.07)', cursor: 'default', overflow: 'hidden' },
  stepHeaderRow: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 },
  stepIconWrap: { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 44, height: 44, borderRadius: 8 },
  stepNumber: { fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: '0.78rem', letterSpacing: '0.2em', opacity: 0.85 },
  stepTitle: { fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: '1.05rem', color: '#1A1A1A', letterSpacing: '-0.015em', lineHeight: 1.25 },
  stepDesc: { fontFamily: "'Inter', sans-serif", fontSize: '0.95rem', lineHeight: 1.7, color: '#555' },

}
