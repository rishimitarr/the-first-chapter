import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useScroll, useAnimation } from 'framer-motion'
import {
  Backpack,
  Heart,
  Pencil,
  Palette,
  Calculator,
  Eraser,
  Ruler,
  HandHeart,
  ShoppingBag,
  PackageOpen,
  Truck,
  Mail,
  Check,
  Lock,
  ArrowLeft,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import Nav from './Nav'
import Footer from './Footer'
import SparklesText from './SparklesText'

// ── Timing knobs ──────────────────────────────────────────────────────────────
const SCROLL_START = '38%'
const ANIM_END = 1.0
const SECTION_HEIGHT_VH = 110
const FRAME_LERP = 0.26

const FRAME_COUNT = 144
const FRAME_VER = 'v3'
const framePath = (i) =>
  `/kit-frames-webp/frame-${String(i).padStart(3, '0')}.webp?${FRAME_VER}`

const PAGE_BG = '#F4F6FB'

// ─── CraftCard ────────────────────────────────────────────────────────────────

function CraftCard({ card, index }) {
  const controls = useAnimation()
  const hoverCountRef = useRef(0)
  const [hovered, setHovered] = useState(false)

  const handleHoverStart = () => {
    hoverCountRef.current += 1
    const rotate = hoverCountRef.current % 2 === 1 ? -1.8 : 1.8
    setHovered(true)
    controls.start({
      y: -12, rotate, scale: 1.03,
      boxShadow: `0 20px 44px ${card.color}44`,
      transition: { type: 'spring', stiffness: 280, damping: 18 },
    })
  }

  const handleHoverEnd = () => {
    setHovered(false)
    controls.start({
      y: 0, rotate: 0, scale: 1,
      boxShadow: '0 4px 20px rgba(26,58,107,0.07)',
      transition: { type: 'spring', stiffness: 280, damping: 18 },
    })
  }

  return (
    <motion.div
      style={styles.craftCard}
      initial={{ opacity: 0, y: 70, rotate: -3 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ type: 'spring', stiffness: 110, damping: 14, delay: index * 0.1 }}
      animate={controls}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
    >
      <div style={{ ...styles.craftStrip, background: card.color }}>
        <motion.div
          style={styles.craftShine}
          animate={hovered ? { x: '130%', opacity: 0.22 } : { x: '-40%', opacity: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        />
      </div>
      <div style={styles.craftBody}>
        <h3 style={{ ...styles.craftCardTitle, color: card.color }}>{card.title}</h3>
        <p style={styles.craftCardBody}>{card.body}</p>
      </div>
    </motion.div>
  )
}

// ─── PricingCard (education kit only) ────────────────────────────────────────

function PricingCard({ label, price, description, items, cta, background, BGComponent, comingSoon = false, href = '#sponsor', isMobile }) {
  return (
    <motion.div
      whileHover="hover"
      variants={{ hover: { scale: 1.04 } }}
      transition={{ duration: 0.9, ease: [0.55, 0, 0.1, 1] }}
      style={{ ...styles.priceCard, background, width: isMobile ? '100%' : 320 }}
    >
      {BGComponent && <BGComponent />}
      <div style={styles.priceContent}>
        <span style={styles.priceLabel}>
          {comingSoon && <Lock size={12} strokeWidth={2.5} style={{ marginRight: 6 }} />}
          {comingSoon ? 'Coming Soon' : label}
        </span>
        {!comingSoon ? (
          <motion.span
            initial={{ scale: 0.88 }}
            variants={{ hover: { scale: 1 } }}
            transition={{ duration: 0.9, ease: [0.55, 0, 0.1, 1] }}
            style={styles.priceAmount}
          >
            $30<span style={styles.priceCurrency}> CAD</span>
            <span style={styles.pricePer}> / kit</span>
          </motion.span>
        ) : (
          <span style={styles.priceAmountMuted}>{label}</span>
        )}
        <p style={styles.priceDesc}>{description}</p>
        <ul style={styles.priceList}>
          {items.map((it) => (
            <li key={it} style={styles.priceItem}>
              <Check size={15} strokeWidth={3} style={{ flexShrink: 0, marginTop: 3 }} />
              <span>{it}</span>
            </li>
          ))}
        </ul>
      </div>
      {comingSoon ? (
        <span style={styles.priceBtnDisabled}>Not yet available</span>
      ) : (
        <a href={href} style={styles.priceBtn}>{cta}</a>
      )}
    </motion.div>
  )
}

// ─── BG shapes ───────────────────────────────────────────────────────────────

const BGCircles = () => (
  <motion.svg
    viewBox="0 0 320 384" fill="none" xmlns="http://www.w3.org/2000/svg"
    variants={{ hover: { scale: 1.4 } }}
    transition={{ duration: 1, ease: [0.55, 0, 0.1, 1] }}
    style={styles.priceBg} preserveAspectRatio="xMidYMid slice"
  >
    <motion.circle variants={{ hover: { scaleY: 0.55, y: -22 } }} transition={{ duration: 1, ease: [0.55, 0, 0.1, 1], delay: 0.15 }} cx="160.5" cy="120" r="105" fill="rgba(255,255,255,0.16)" />
    <motion.ellipse variants={{ hover: { scaleY: 2.3, y: -28 } }} transition={{ duration: 1, ease: [0.55, 0, 0.1, 1], delay: 0.15 }} cx="160.5" cy="280" rx="110" ry="48" fill="rgba(255,255,255,0.14)" />
  </motion.svg>
)

// ─── Main ────────────────────────────────────────────────────────────────────

export default function EducationKit() {
  const sectionRef = useRef(null)
  const canvasRef = useRef(null)
  const imagesRef = useRef([])
  const currentFrame = useRef(0)
  const targetFrame = useRef(0)
  const [loadedPct, setLoadedPct] = useState(0)
  const [ready, setReady] = useState(false)
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth <= 768 : false
  )

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
    const priority = []
    const rest = []
    for (let i = 1; i <= FRAME_COUNT; i++) {
      if (i === 1 || i === FRAME_COUNT || i % 6 === 0) priority.push(i)
      else rest.push(i)
    }
    const order = [...priority, ...rest]
    const imgs = new Array(FRAME_COUNT)
    let count = 0
    const criticalCount = Math.min(20, priority.length)
    let critical = 0
    order.forEach((n, idx) => {
      const img = new Image()
      img.decoding = 'async'
      img.src = framePath(n)
      img.onload = () => {
        if (cancelled) return
        count++
        if (idx < criticalCount) critical++
        if (critical >= criticalCount && !ready) setReady(true)
        setLoadedPct(Math.round((count / FRAME_COUNT) * 100))
      }
      img.onerror = () => {
        count++
        if (count >= FRAME_COUNT) setReady(true)
      }
      imgs[n - 1] = img
    })
    imagesRef.current = imgs
    const fallback = setTimeout(() => setReady(true), 1500)
    return () => {
      cancelled = true
      clearTimeout(fallback)
    }
  }, [])

  useEffect(() => {
    return scrollYProgress.on('change', (v) => {
      const t = Math.min(1, Math.max(0, v / ANIM_END))
      targetFrame.current = t * (FRAME_COUNT - 1)
    })
  }, [scrollYProgress])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf
    let dpr = Math.min(window.devicePixelRatio || 1, 3)

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      dpr = Math.min(window.devicePixelRatio || 1, 3)
      canvas.width = Math.max(1, Math.floor(rect.width * dpr))
      canvas.height = Math.max(1, Math.floor(rect.height * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = 'high'
    }
    resize()
    window.addEventListener('resize', resize)

    const pickImage = (idx) => {
      const arr = imagesRef.current
      const target = arr[idx]
      if (target && target.complete && target.naturalWidth) return target
      for (let s = 1; s < 18; s++) {
        const a = arr[idx - s]
        if (a && a.complete && a.naturalWidth) return a
        const b = arr[idx + s]
        if (b && b.complete && b.naturalWidth) return b
      }
      return null
    }

    const draw = () => {
      currentFrame.current += (targetFrame.current - currentFrame.current) * FRAME_LERP
      const idx = Math.round(currentFrame.current)
      const img = pickImage(idx)
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      ctx.clearRect(0, 0, w, h)
      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = 'high'
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
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <div style={{ background: PAGE_BG, color: '#1A1A1A' }}>
      <Nav />

      {/* HERO */}
      <section style={styles.hero}>
        <img src="/education-kit-hero.jpg" alt="" aria-hidden="true" style={styles.heroBg} />
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
            <span style={styles.heroLine}>The Education Kit.</span>
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
            <a href="#sponsor" style={styles.heroGhost}>
              Sponsor a Kit →
            </a>
          </motion.div>
        </div>
      </section>

      {/* SCROLL ANIMATION */}
      <section ref={sectionRef} id="the-kit" style={{ ...styles.scrollSection, height: isMobile ? '70vh' : `${SECTION_HEIGHT_VH}vh` }}>
        <div style={styles.sticky}>
          <div style={styles.kitLabelWrap}>
            <span style={styles.kitEyebrow}>Presenting</span>
            <span style={styles.kitTitle}>The Education Kit</span>
          </div>
          <div style={styles.stage}>
            <canvas ref={canvasRef} style={styles.canvas} />
          </div>
          <span style={styles.disclaimer}>Illustration is not accurate to scale or quantity.</span>
          {!ready && (
            <div style={styles.loader}>
              <div style={styles.loaderTrack}>
                <div style={{ ...styles.loaderFill, width: `${loadedPct}%` }} />
              </div>
              <span style={styles.loaderText}>Preparing kit · {loadedPct}%</span>
            </div>
          )}
        </div>
      </section>

      {/* WHAT'S INSIDE */}
      <section id="whats-inside" style={styles.section}>
        <div style={styles.sectionInner}>
          <motion.span initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6 }} style={styles.sectionEyebrow}>
            What's Inside
          </motion.span>
          <motion.h2 initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} style={styles.sectionH2}>
            Six supplies. One <span style={styles.h2Em}>complete kit.</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.7, delay: 0.1 }} style={styles.sectionLead}>
            At its core, the Education Kit is a stationery kit: the everyday supplies
            that make school feel possible. Pencils, erasers, rulers. The things most kids
            take for granted, and that children in crisis are the most likely to be without.
            We source each item carefully so the kit feels complete, not makeshift.
          </motion.p>

          <div style={{ ...styles.insideGrid, gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)' }}>
            {[
              { icon: Heart,      color: '#EE3093', name: 'Mini Plushie',        desc: 'A small comfort plushie tucked into every kit because kids need more than supplies.' },
              { icon: Pencil,     color: '#6B2D8B', name: 'Pencils',             desc: 'HB graphite pencils, pre-sharpened and ready for the first day back.' },
              { icon: Palette,    color: '#0099D6', name: 'Coloured Pencils',    desc: 'A set of vibrant pencil crayons for creative work, art, and self-expression.' },
              { icon: Calculator, color: '#39B54A', name: 'Calculator',          desc: 'A basic calculator to support math work across grade levels.' },
              { icon: Eraser,     color: '#F7941D', name: 'Erasers',             desc: 'Soft erasers that keep the page clean and mistakes easy to fix.' },
              { icon: Ruler,      color: '#14B8A6', name: 'Ruler and Sharpener', desc: 'A 30 cm ruler and a handheld sharpener so nothing stops the work.' },
            ].map((item, i) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.55, delay: i * 0.07 }}
                  whileHover={{ y: -6, boxShadow: '0 16px 36px rgba(26,58,107,0.10)', transition: { type: 'spring', stiffness: 280, damping: 18 } }}
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
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section id="recipients" style={styles.section}>
        <div style={styles.sectionInner}>
          <motion.span initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6 }} style={styles.sectionEyebrow}>
            Who It's For
          </motion.span>
          <motion.h2 initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} style={styles.sectionH2}>
            Built for kids navigating <span style={styles.h2Em}>big moments.</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.7, delay: 0.1 }} style={styles.sectionLead}>
            Our Education Kits go directly to children across the Greater Toronto Area
            who are spending time in hospital wards, family shelters, foster placements,
            and homes in transition. Education is one of the first things that pauses when
            a child's life shifts. The kit is our small, real answer: a familiar set of
            supplies that says you are still a student, still a kid, still on your way.
          </motion.p>

          <div style={styles.statRow}>
            {[
              { k: 'GTA-wide', v: 'Hospitals, shelters, family programs' },
              { k: 'Personalized', v: 'Each kit packed with a single child in mind' },
              { k: 'No cost', v: 'Delivered to families and partners for free' },
            ].map((s, i) => (
              <motion.div
                key={s.k}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.08 }}
                whileHover={{ y: -8, scale: 1.02, boxShadow: '0 16px 36px rgba(26,58,107,0.10)', transition: { type: 'spring', stiffness: 280, damping: 18 } }}
                style={styles.statCard}
              >
                <span style={styles.statKey}>{s.k}</span>
                <span style={styles.statVal}>{s.v}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT'S MADE */}
      <section id="craft" style={styles.section}>
        <div style={styles.sectionInner}>
          <motion.span initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6 }} style={styles.sectionEyebrow}>
            How It's Made
          </motion.span>
          <motion.h2 initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} style={styles.sectionH2}>
            Sourced thoughtfully. <span style={styles.h2Em}>Packed by hand.</span>
          </motion.h2>

          <div style={{ ...styles.cardGrid, gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)' }}>
            {[
              { color: '#6B2D8B', title: 'Sourced with intent', body: 'Every supply is chosen for durability and child safety, with local Canadian suppliers prioritized whenever possible.' },
              { color: '#0099D6', title: 'Hand assembled', body: 'Volunteers pack each kit one at a time. No factory line. Just real hands, building one kit for one kid.' },
              { color: '#39B54A', title: 'Built to last', body: 'Reusable carry pouch, recyclable inserts, and zero single use plastic in the kit itself wherever we can avoid it.' },
              { color: '#F7941D', title: 'Shaped by educators', body: 'Contents are reviewed with teachers, child life specialists, and family workers so the kit actually fits the way kids learn and play.' },
              { color: '#EE3093', title: 'Personally addressed', body: 'Every kit is matched to a specific child where possible, with a small handwritten note from a volunteer included inside.' },
              { color: '#14B8A6', title: 'Delivered with care', body: 'We hand off kits directly to hospital staff, shelter workers, and family programs across the GTA so they reach kids fast.' },
            ].map((c, i) => (
              <CraftCard key={c.title} card={c} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CREATING A KIT TODAY */}
      <section id="create-a-kit" style={styles.section}>
        <div style={styles.sectionInner}>
          <motion.span initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6 }} style={styles.sectionEyebrow}>
            Creating a Kit Today
          </motion.span>
          <motion.h2 initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} style={styles.sectionH2}>
            From your gift to a <span style={styles.h2Em}>child's hands.</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.7, delay: 0.1 }} style={styles.sectionLead}>
            Every kit starts with someone choosing to sponsor one. Here is exactly what
            happens after you do, from the moment your donation comes in to the moment a
            child opens their kit.
          </motion.p>

          <div style={{ ...styles.stepsGrid, gridTemplateColumns: isMobile ? '1fr' : 'repeat(6, 1fr)' }}>
            {[
              { icon: HandHeart,   color: '#EE3093', step: '01', title: 'You sponsor a kit',        desc: 'A single donation funds one full Education Kit for one child in the Greater Toronto Area.', span: 2 },
              { icon: ShoppingBag, color: '#0099D6', step: '02', title: 'We source the supplies',   desc: 'Pencils, plushie, calculator, ruler, and the rest. Bought from Canadian suppliers wherever possible.', span: 2 },
              { icon: PackageOpen, color: '#6B2D8B', step: '03', title: 'Volunteers hand pack it',  desc: 'A volunteer assembles your kit one piece at a time, with a short handwritten note tucked inside.', span: 2 },
              { icon: Truck,       color: '#39B54A', step: '04', title: 'A child receives it',      desc: 'We deliver directly to hospital wards, family shelters, and partner programs across the GTA.', span: 3 },
              { icon: Mail,        color: '#F7941D', step: '05', title: 'A card in your name',      desc: 'Tucked inside the kit, a small card carries your name and a note that shares your generosity with the child who receives it.', span: 3 },
            ].map((s, i) => {
              const Icon = s.icon
              return (
                <motion.div
                  key={s.step}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.55, delay: i * 0.08 }}
                  whileHover={{ y: -6, boxShadow: '0 18px 38px rgba(26,58,107,0.12)', transition: { type: 'spring', stiffness: 280, damping: 18 } }}
                  style={{ ...styles.stepCard, gridColumn: isMobile ? 'span 1' : `span ${s.span}` }}
                >
                  <div style={styles.stepHeaderRow}>
                    <span style={{ ...styles.stepIconWrap, background: `${s.color}18` }}>
                      <Icon size={22} color={s.color} strokeWidth={2} />
                    </span>
                    <span style={{ ...styles.stepNumber, color: s.color }}>{s.step}</span>
                  </div>
                  <span style={styles.stepTitle}>{s.title}</span>
                  <span style={styles.stepDesc}>{s.desc}</span>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* SPONSOR */}
      <section id="sponsor" style={styles.sponsorSection}>
        <div style={styles.sectionInner}>
          <motion.span initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6 }} style={styles.sectionEyebrow}>
            Sponsor a Kit
          </motion.span>
          <motion.h2 initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} style={styles.sponsorH2}>
            One kit can change a{' '}
            <SparklesText text="chapter" colors={{ first: '#6B2D8B', second: '#FBB040' }} count={12} textStyle={{ color: '#FBB040' }} />
            <span style={{ color: '#FBB040' }}>.</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.7, delay: 0.1 }} style={styles.sponsorLead}>
            Every sponsored kit goes directly to a child who needs one. Your contribution
            funds the supplies and the carry pouch. This is a donation, not a product purchase.
          </motion.p>

          <div style={{ ...styles.priceGrid, flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'stretch' : 'flex-start' }}>
            <PricingCard
              label="Education Kit"
              comingSoon
              description="Stationery essentials and a small comfort item, hand packed for one child in the Greater Toronto Area."
              items={['Pencils and coloured pencils', 'Calculator', 'Ruler and sharpener', 'Erasers', 'Mini plushie', 'Handwritten note']}
              background="linear-gradient(155deg, #6B2D8B 0%, #4A1E61 100%)"
              BGComponent={BGCircles}
              isMobile={isMobile}
            />
          </div>

          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6, delay: 0.2 }} style={styles.priceFootnote}>
            100% of your gift funds the supplies and the carry pouch.
          </motion.p>
        </div>
      </section>

      <Footer />
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
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 600,
    fontSize: '0.85rem',
    color: 'rgba(255,255,255,0.80)',
    textDecoration: 'none',
    letterSpacing: '0.02em',
    border: '1px solid rgba(255,255,255,0.28)',
    background: 'rgba(255,255,255,0.10)',
    backdropFilter: 'blur(8px)',
    padding: '7px 16px',
    borderRadius: 100,
    width: 'fit-content',
  },
  heroH1: { fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: 'clamp(2.4rem, 5.5vw, 5rem)', lineHeight: 1.08, color: '#ffffff', margin: 0, letterSpacing: '-0.02em', textShadow: '0 2px 32px rgba(0,0,0,0.4)' },
  heroLine: { display: 'block' },
  heroLead: { fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(1rem, 1.3vw, 1.2rem)', lineHeight: 1.65, color: 'rgba(255,255,255,0.92)', maxWidth: 620, margin: 0, textShadow: '0 1px 12px rgba(0,0,0,0.35)' },
  heroCtaRow: { display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' },
  heroPrimary: { display: 'inline-flex', alignItems: 'center', padding: '14px 30px', borderRadius: 100, fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: '0.95rem', color: '#fff', background: '#6B2D8B', boxShadow: '0 6px 24px rgba(107,45,139,0.45)', textDecoration: 'none' },
  heroGhost: { display: 'inline-flex', alignItems: 'center', padding: '14px 26px', borderRadius: 100, fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: '0.95rem', color: '#ffffff', border: '1.5px solid rgba(255,255,255,0.45)', background: 'rgba(255,255,255,0.10)', backdropFilter: 'blur(10px)', textDecoration: 'none' },

  scrollSection: { position: 'relative', height: `${SECTION_HEIGHT_VH}vh` },
  sticky: { position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' },
  kitLabelWrap: { position: 'absolute', top: 'clamp(40px, 7vh, 80px)', left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, zIndex: 5, pointerEvents: 'none' },
  kitEyebrow: { fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: '0.92rem', letterSpacing: '0.34em', textTransform: 'uppercase', color: '#6B2D8B' },
  kitTitle: { fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: 'clamp(1.9rem, 3.4vw, 2.8rem)', lineHeight: 1.1, letterSpacing: '-0.02em', color: '#1A3A6B' },
  stage: { position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: 'clamp(60px, 9vh, 120px)', zIndex: 2 },
  disclaimer: { position: 'absolute', bottom: 'clamp(20px, 3vh, 36px)', left: 0, right: 0, textAlign: 'center', fontFamily: "'DM Sans', sans-serif", fontSize: '0.74rem', fontStyle: 'italic', letterSpacing: '0.04em', color: 'rgba(26,58,107,0.45)', pointerEvents: 'none', zIndex: 4 },
  canvas: { width: 'min(76vw, 1040px)', height: 'min(60vh, 660px)', display: 'block', background: 'transparent' },
  loader: { position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14, background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(8px)', zIndex: 6 },
  loaderTrack: { width: 220, height: 3, background: 'rgba(26,58,107,0.10)', borderRadius: 100, overflow: 'hidden' },
  loaderFill: { height: '100%', background: '#6B2D8B', transition: 'width 0.2s ease' },
  loaderText: { fontFamily: "'DM Sans', sans-serif", fontSize: '0.78rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(26,58,107,0.6)' },

  section: { position: 'relative', padding: '0 24px clamp(80px, 12vh, 140px)' },
  sectionInner: { maxWidth: 1080, margin: '0 auto' },
  sectionEyebrow: { display: 'inline-block', fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: '0.74rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: '#6B2D8B', background: 'rgba(107,45,139,0.10)', padding: '6px 14px', borderRadius: 100, marginBottom: 22 },
  sectionH2: { fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: 'clamp(2.1rem, 4.4vw, 3.4rem)', lineHeight: 1.08, letterSpacing: '-0.025em', color: '#1A3A6B', margin: '0 0 24px', maxWidth: 820 },
  h2Em: { color: '#FBB040', fontStyle: 'normal' },
  sectionLead: { fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(1rem, 1.25vw, 1.18rem)', lineHeight: 1.7, color: 'rgba(26,26,26,0.72)', maxWidth: 760, margin: '0 0 48px' },

  statRow: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 18 },
  statCard: { background: '#FFFFFF', border: '1px solid rgba(26,58,107,0.10)', borderRadius: 18, padding: '22px 24px', display: 'flex', flexDirection: 'column', gap: 8, boxShadow: '0 4px 24px rgba(26,58,107,0.05)' },
  statKey: { fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: '0.78rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#6B2D8B' },
  statVal: { fontFamily: "'DM Sans', sans-serif", fontSize: '1rem', lineHeight: 1.5, color: '#1A3A6B' },

  insideGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 },
  insideCard: { background: '#FFFFFF', border: '1px solid rgba(26,58,107,0.10)', borderRadius: 18, padding: '26px 24px', display: 'flex', flexDirection: 'column', gap: 10, boxShadow: '0 4px 20px rgba(26,58,107,0.06)', cursor: 'default' },
  insideIconWrap: { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 44, height: 44, borderRadius: 12 },
  insideName: { fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: '1.05rem', color: '#1A3A6B', letterSpacing: '-0.01em' },
  insideDesc: { fontFamily: "'DM Sans', sans-serif", fontSize: '0.95rem', lineHeight: 1.6, color: 'rgba(26,26,26,0.68)' },

  cardGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 },
  craftCard: { background: '#fff', borderRadius: 18, overflow: 'hidden', boxShadow: '0 4px 20px rgba(26,58,107,0.07)', cursor: 'default' },
  craftStrip: { height: 5, position: 'relative', overflow: 'hidden' },
  craftShine: { position: 'absolute', top: 0, bottom: 0, width: '40%', background: 'rgba(255,255,255,0.5)', filter: 'blur(6px)', left: '-40%' },
  craftBody: { padding: '22px 20px 24px' },
  craftCardTitle: { fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: '0.96rem', letterSpacing: '-0.01em', margin: '0 0 8px' },
  craftCardBody: { fontFamily: "'DM Sans', sans-serif", fontSize: '0.93rem', lineHeight: 1.6, color: 'rgba(26,26,26,0.68)', margin: 0 },

  stepsGrid: { display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gridTemplateRows: 'auto auto', gap: 16 },
  stepCard: { position: 'relative', background: '#FFFFFF', border: '1px solid rgba(26,58,107,0.10)', borderRadius: 18, padding: '22px 18px 24px', display: 'flex', flexDirection: 'column', gap: 10, boxShadow: '0 4px 20px rgba(26,58,107,0.06)', cursor: 'default', overflow: 'hidden' },
  stepHeaderRow: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 },
  stepIconWrap: { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 44, height: 44, borderRadius: 12 },
  stepNumber: { fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: '0.78rem', letterSpacing: '0.2em', opacity: 0.85 },
  stepTitle: { fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: '0.95rem', color: '#1A3A6B', letterSpacing: '-0.015em', lineHeight: 1.25 },
  stepDesc: { fontFamily: "'DM Sans', sans-serif", fontSize: '0.92rem', lineHeight: 1.55, color: 'rgba(26,26,26,0.68)' },

  priceGrid: { display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 22, marginBottom: 36 },
  priceCard: { position: 'relative', width: 320, minHeight: 540, flexShrink: 0, overflow: 'hidden', borderRadius: 22, padding: 30, paddingBottom: 84, boxShadow: '0 14px 38px rgba(26,58,107,0.18)', color: '#FFFFFF', cursor: 'default' },
  priceBg: { position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' },
  priceContent: { position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', gap: 14 },
  priceLabel: { display: 'inline-flex', alignItems: 'center', width: 'fit-content', background: 'rgba(255,255,255,0.22)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.28)', color: '#FFFFFF', padding: '5px 14px', borderRadius: 100, fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.04em' },
  priceAmount: { display: 'block', fontFamily: "'JetBrains Mono', 'SF Mono', monospace", fontWeight: 900, fontSize: '3.4rem', lineHeight: 1.05, transformOrigin: 'top left', letterSpacing: '-0.02em', marginTop: 4 },
  priceCurrency: { fontSize: '1.2rem', fontWeight: 700, letterSpacing: 0, opacity: 0.88 },
  pricePer: { display: 'block', fontSize: '0.95rem', fontWeight: 600, opacity: 0.78, marginTop: -4 },
  priceAmountMuted: { display: 'block', fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: '2.4rem', lineHeight: 1.1, letterSpacing: '-0.02em', marginTop: 4, color: 'rgba(255,255,255,0.95)' },
  priceDesc: { fontFamily: "'DM Sans', sans-serif", fontSize: '0.97rem', lineHeight: 1.55, color: 'rgba(255,255,255,0.92)', margin: '4px 0 6px' },
  priceList: { listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 },
  priceItem: { display: 'flex', alignItems: 'flex-start', gap: 10, fontFamily: "'DM Sans', sans-serif", fontSize: '0.94rem', lineHeight: 1.4, color: 'rgba(255,255,255,0.95)' },
  priceBtn: { position: 'absolute', bottom: 18, left: 18, right: 18, zIndex: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '13px 18px', borderRadius: 12, background: '#FFFFFF', color: '#1A1A1A', fontFamily: "'JetBrains Mono', 'SF Mono', monospace", fontWeight: 800, fontSize: '0.92rem', letterSpacing: '0.04em', textTransform: 'uppercase', textDecoration: 'none', border: '2px solid #FFFFFF', transition: 'background 0.2s ease, color 0.2s ease' },
  priceBtnDisabled: { position: 'absolute', bottom: 18, left: 18, right: 18, zIndex: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '13px 18px', borderRadius: 12, background: 'rgba(255,255,255,0.18)', color: 'rgba(255,255,255,0.85)', fontFamily: "'JetBrains Mono', 'SF Mono', monospace", fontWeight: 700, fontSize: '0.82rem', letterSpacing: '0.08em', textTransform: 'uppercase', border: '1.5px dashed rgba(255,255,255,0.4)', cursor: 'not-allowed' },
  priceFootnote: { fontFamily: "'DM Sans', sans-serif", fontSize: '0.86rem', lineHeight: 1.6, color: 'rgba(26,58,107,0.6)', textAlign: 'center', maxWidth: 620, margin: '0 auto', fontStyle: 'italic' },

  sponsorSection: { position: 'relative', padding: '0 24px clamp(100px, 14vh, 160px)', textAlign: 'center' },
  sponsorH2: { fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: 'clamp(2.1rem, 4.6vw, 3.4rem)', lineHeight: 1.1, letterSpacing: '-0.025em', color: '#1A3A6B', margin: '0 auto 22px', maxWidth: 820 },
  sponsorLead: { fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(1rem, 1.25vw, 1.18rem)', lineHeight: 1.7, color: 'rgba(26,26,26,0.68)', maxWidth: 640, margin: '0 auto 48px' },
}
