import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Heart,
  PackageOpen,
  Lock,
  HandHeart,
  ShoppingBag,
  Truck,
  Mail,
  Check,
} from 'lucide-react'
import Nav from './Nav'
import Footer from './Footer'


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

const PAGE_BG = '#fff'
const LOGO_BLUE = '#0099D6'
const LOGO_GREEN = '#57A018'
const LOGO_ORANGE = '#F7941D'
const LOGO_PINK = '#EE3093'
const LOGO_TEAL = '#14B8A6'
const LOGO_NAVY = '#1A3A6B'
const ACCENTS = {
  green: { color: LOGO_GREEN, bg: 'rgba(87,160,24,0.08)', shadow: 'rgba(87,160,24,0.12)' },
  navy: { color: LOGO_NAVY, bg: 'rgba(26,58,107,0.08)', shadow: 'rgba(26,58,107,0.12)' },
  amber: { color: LOGO_ORANGE, bg: 'rgba(247,148,29,0.09)', shadow: 'rgba(247,148,29,0.12)' },
  pink: { color: LOGO_PINK, bg: 'rgba(238,48,147,0.08)', shadow: 'rgba(238,48,147,0.12)' },
  teal: { color: LOGO_TEAL, bg: 'rgba(20,184,166,0.08)', shadow: 'rgba(20,184,166,0.12)' },
}

function KitCard({ kit, isMobile }) {
  return (
    <motion.div
      whileHover={{ y: -6, boxShadow: '0 16px 40px rgba(0,0,0,0.13)' }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      style={{ ...styles.kitCard, opacity: kit.comingSoon ? 0.72 : 1 }}
    >
      <div style={{ ...styles.kitBody, padding: isMobile ? '22px 22px 24px' : '24px 26px 28px' }}>
        <div style={styles.kitBodyTop}>
          <h3 style={styles.kitCardTitle}>{kit.name}</h3>
          <p style={styles.kitCardDesc}>{kit.body}</p>
        </div>
        {kit.comingSoon ? (
          <span style={styles.kitCtaDisabled}>
            <Lock size={12} strokeWidth={2.5} style={{ marginRight: 6 }} />
            Coming Soon
          </span>
        ) : (
          <Link to={kit.href} style={{ ...styles.kitCta, background: kit.color }}>
            {kit.cta}
          </Link>
        )}
      </div>
    </motion.div>
  )
}

// ─── Step card ───────────────────────────────────────────────────────────────

function StepCard({ step, span, isMobile }) {
  const Icon = step.icon
  return (
    <motion.div
      whileHover={{ y: -6, boxShadow: `0 18px 38px ${step.accent.shadow}`, transition: { type: 'spring', stiffness: 280, damping: 18 } }}
      style={{ ...styles.stepCard, gridColumn: isMobile ? 'span 1' : `span ${span}` }}
    >
      <div style={styles.stepHeaderRow}>
        <span style={{ ...styles.stepIconWrap, background: step.accent.bg }}>
          <Icon size={22} color={step.accent.color} strokeWidth={2} />
        </span>
      </div>
      <span style={styles.stepTitle}>{step.title}</span>
      <span style={styles.stepDesc}>{step.desc}</span>
    </motion.div>
  )
}

function DonationKitCard({ kit }) {
  return (
    <motion.div
      whileHover="hover"
      variants={{ hover: { scale: kit.comingSoon ? 1 : 1.04 } }}
      transition={{ duration: 0.9, ease: [0.55, 0, 0.1, 1] }}
      style={{ ...styles.donateCard, background: kit.background, boxShadow: kit.shadow }}
    >
      <DonationCardBg />
      <div style={styles.donateCardContent}>
        <span style={styles.donateKitLabel}>{kit.name}</span>
        {kit.comingSoon ? (
          <span style={styles.donateAmountMuted}>Coming Soon</span>
        ) : (
          <motion.span
            initial={{ scale: 0.88 }}
            variants={{ hover: { scale: 1 } }}
            transition={{ duration: 0.9, ease: [0.55, 0, 0.1, 1] }}
            style={styles.donatePrice}
          >
            $6<span style={styles.donateCurrency}> CAD</span>
            <span style={styles.donatePer}> / kit</span>
          </motion.span>
        )}
        <p style={styles.donateCopy}>{kit.copy}</p>
        <ul style={styles.donateList}>
          {kit.items.map((item) => (
            <li key={item} style={styles.donateItem}>
              <Check size={15} strokeWidth={3} style={{ flexShrink: 0, marginTop: 3 }} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      {kit.comingSoon ? (
        <span style={styles.donateDisabled}>Not yet available</span>
      ) : (
        <a href={kit.href} style={styles.donateCta}>
          Donate Today
        </a>
      )}
    </motion.div>
  )
}

const DonationCardBg = () => (
  <motion.svg
    viewBox="0 0 320 384"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    variants={{ hover: { scale: 1.4 } }}
    transition={{ duration: 1, ease: [0.55, 0, 0.1, 1] }}
    style={styles.donateBg}
    preserveAspectRatio="xMidYMid slice"
  >
    <motion.circle
      variants={{ hover: { scaleY: 0.55, y: -22 } }}
      transition={{ duration: 1, ease: [0.55, 0, 0.1, 1], delay: 0.15 }}
      cx="160.5"
      cy="120"
      r="105"
      fill="rgba(255,255,255,0.16)"
    />
    <motion.ellipse
      variants={{ hover: { scaleY: 2.3, y: -28 } }}
      transition={{ duration: 1, ease: [0.55, 0, 0.1, 1], delay: 0.15 }}
      cx="160.5"
      cy="280"
      rx="110"
      ry="48"
      fill="rgba(255,255,255,0.14)"
    />
  </motion.svg>
)

// ─── Main ────────────────────────────────────────────────────────────────────

const KITS = [
  {
    num: '01',
    color: LOGO_BLUE,
    name: 'Educational Kit',
    body: 'Back-to-school essentials packed for everyday classroom learning, including a notebook, folders, writing tools, crayons, glue, a ruler, erasers, and a sharpener.',
    img: 'https://images.unsplash.com/photo-1661732017114-6d554292c1b2?auto=format&fit=crop&w=1200&q=82',
    credit: 'Kelly Sikkema / Unsplash',
    href: '/care-kits/education',
    cta: 'Explore the Educational Kit',
    comingSoon: false,
  },
  {
    num: '02',
    color: LOGO_ORANGE,
    name: 'Comfort Kit',
    body: 'A care package for kids in hospital wards or family shelters. A soft blanket, a plushie, and a handwritten note from a volunteer. Currently in development.',
    img: 'https://images.unsplash.com/photo-1530325553241-4f6e7690cf36?auto=format&fit=crop&w=1200&q=82',
    credit: 'Barrett Ward / Unsplash',
    href: '#',
    cta: 'Coming Soon',
    comingSoon: true,
  },
  {
    num: '03',
    color: LOGO_PINK,
    name: 'Health Kit',
    body: 'Hygiene and wellness essentials for kids in shelters, hospitals, and transitional homes. Launching later this year.',
    img: 'https://images.unsplash.com/photo-1759910548177-638d4e6ee0d5?auto=format&fit=crop&w=1200&q=82',
    credit: 'mdreza jalali / Unsplash',
    href: '#',
    cta: 'Coming Soon',
    comingSoon: true,
  },
]

const STEPS = [
  { step: '01', title: 'You sponsor a kit', desc: 'A single donation funds one full Care Kit for one child in the Greater Toronto Area.', img: '/make the donation.jpg' },
  { step: '02', title: 'We source the supplies', desc: 'Every item is selected from Canadian suppliers whenever possible, with quality guiding each choice.', img: '/source the supplies.jpg' },
  { step: '03', title: 'Volunteers hand pack it', desc: 'A volunteer assembles your kit one piece at a time, with a short handwritten note tucked inside.', img: '/pack the boxes.jpg' },
  { step: '04', title: 'A child receives it', desc: 'We deliver directly to hospital wards, family shelters, and partner programs across the GTA.', img: '/child recieves it.jpg' },
  { step: '05', title: 'A card in your name', desc: 'A small card inside the kit carries your name so your generosity reaches the child directly.', img: '/card in your name.jpg' },
]

const CARE_KIT_CARDS = [
  {
    title: 'Useful Supplies and Comfort',
    body: 'Each kit contains practical items selected to bring comfort and normalcy during difficult times. From school supplies to cozy essentials, everything is chosen with care.',
    img: '/supplies and comfort.jpg',
  },
  {
    title: 'Packed with Care',
    body: 'Volunteers hand-pack each kit, one piece at a time. Every item is placed thoughtfully, with a handwritten note tucked inside to let the child know someone cares.',
    img: '/Packing.jpg',
  },
  {
    title: 'Funded by One Donor',
    body: 'A single donation sponsors one complete kit for one child. Your generosity directly impacts a child in need across the Greater Toronto Area.',
    img: '/Funded By One.jpg',
  },
  {
    title: 'Delivered by Us',
    body: 'Our team delivers kits directly to hospital wards, family shelters, and partner programs. We ensure every kit reaches children who need it most.',
    img: '/Delivered by us.jpg',
  },
]



const ROTATE_WORDS = ['One Story.', 'One Chapter.', 'One Beginning.', 'One Promise.', 'One Change.']

export default function CareKitsLanding() {
  const [titleNumber, setTitleNumber] = useState(0)
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth <= 768 : false
  )

  useEffect(() => {
    const id = setInterval(() => setTitleNumber((n) => (n + 1) % ROTATE_WORDS.length), 2200)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <div style={{ background: PAGE_BG, color: '#1A1A1A' }}>
      <Nav />

      {/* ── HERO ── */}
      <section style={styles.hero}>
        <img src="/care-kits-hero.jpg" alt="" aria-hidden="true" style={styles.heroBg} />
        <div style={styles.heroOverlay} />
        <div style={{ ...styles.heroInner, padding: isMobile ? '0 24px' : '0 60px' }}>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            style={styles.heroH1}
          >
            <span style={styles.heroLine}>One Kit.</span>
            <span style={styles.rotateWrap}>
              &nbsp;
              {ROTATE_WORDS.map((w, i) => (
                <motion.span
                  key={w}
                  style={styles.rotateWord}
                  initial={{ opacity: 0, y: -100 }}
                  transition={{ type: 'spring', stiffness: 50 }}
                  animate={
                    titleNumber === i
                      ? { y: 0, opacity: 1 }
                      : { y: titleNumber > i ? -150 : 150, opacity: 0 }
                  }
                >
                  {w}
                </motion.span>
              ))}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
            style={styles.heroLead}
          >
            Care Kits are carefully packed packages funded by donations and delivered directly to
            children across the Greater Toronto Area who are navigating hospitals, shelters,
            and moments of crisis.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            style={styles.heroCtaRow}
          >
            <a href="#our-kits" style={styles.heroPrimary}>
              See Our Kits
            </a>
            <a href="#how-it-works" style={styles.heroGhost}>
              How it works
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── WHAT ARE CARE KITS ── */}
      <section style={styles.section}>
        <div style={styles.sectionInner}>
          <motion.div
            variants={fromLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: '-250px 0px -80px 0px' }}
          >
            <span style={styles.eyebrow}>What Are Care Kits?</span>
            <h2 style={styles.sectionH2}>
              Care Kits
            </h2>
          </motion.div>

          <div style={{ ...styles.careKitGrid, gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)' }}>
            {CARE_KIT_CARDS.map((card, i) => (
              <motion.div
                key={card.title}
                style={styles.careKitCard}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ y: -6, boxShadow: '0 16px 40px rgba(0,0,0,0.13)', transition: { duration: 0.22, ease: 'easeOut' } }}
              >
                <div style={styles.careKitImgWrap}>
                  <img src={card.img} alt={card.title} style={styles.careKitImg} />
                </div>
                <div style={styles.careKitText}>
                  <h3 style={styles.careKitTitle}>{card.title}</h3>
                  <p style={styles.careKitBody}>{card.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OUR KITS ── */}
      <section id="our-kits" style={styles.kitsSection}>
        <div style={styles.sectionInner}>
          <motion.div
            variants={fromBottom}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: '-250px 0px -80px 0px' }}
          >
            <span style={styles.eyebrow}>Our Kits</span>
            <h2 style={styles.sectionH2}>
              Three kits. <span style={styles.h2Em}>One mission.</span>
            </h2>
            <p style={{ ...styles.sectionLead, marginBottom: 48 }}>
              Each kit is built around a specific moment in a child's life. Education,
              comfort, and health. Different needs, same care.
            </p>

            <div style={{ ...styles.kitsGrid, gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, minmax(0, 1fr))' }}>
              {KITS.map((kit) => (
                <div key={kit.name}>
                  <KitCard kit={kit} isMobile={isMobile} />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" style={styles.section}>
        <div style={styles.sectionInner}>
          <motion.div
            variants={fromRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: '-250px 0px -80px 0px' }}
          >
            <span style={styles.eyebrow}>How It Works</span>
            <h2 style={{ ...styles.sectionH2, maxWidth: 'none' }}>
              How Your Donation Works
            </h2>
          </motion.div>

          <div style={{ ...styles.howItWorksGrid, gridTemplateColumns: isMobile ? '1fr' : 'repeat(5, 1fr)' }}>
            {STEPS.map((s, i) => (
              <motion.div
                key={s.step}
                style={styles.howItWorksCard}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ y: -6, boxShadow: '0 16px 40px rgba(0,0,0,0.13)', transition: { duration: 0.22, ease: 'easeOut' } }}
              >
                <div style={styles.howItWorksImgWrap}>
                  <img src={s.img} alt={s.title} style={styles.howItWorksImg} />
                  <span style={styles.howItWorksStep}>{s.step}</span>
                </div>
                <div style={styles.howItWorksText}>
                  <h3 style={styles.howItWorksTitle}>{s.title}</h3>
                  <p style={styles.howItWorksBody}>{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = {
  hero: {
    position: 'relative',
    width: '100%',
    height: '100dvh',
    minHeight: 600,
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
  },
  heroBg: {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center 30%',
    display: 'block',
  },
  heroOverlay: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(135deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.28) 55%, rgba(0,0,0,0.38) 100%)',
    zIndex: 1,
  },
  heroInner: {
    position: 'relative',
    zIndex: 2,
    padding: '0 60px',
    display: 'flex',
    flexDirection: 'column',
    gap: 28,
    maxWidth: 820,
  },
  heroH1: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 800,
    fontSize: 'clamp(2.4rem, 5.5vw, 5rem)',
    lineHeight: 1.08,
    color: '#ffffff',
    margin: 0,
    letterSpacing: '-0.02em',
    textShadow: '0 2px 32px rgba(0,0,0,0.4)',
  },
  heroLine: { display: 'block' },
  rotateWrap: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    justifyContent: 'flex-start',
    overflow: 'hidden',
    paddingTop: 4,
    paddingBottom: 6,
  },
  rotateWord: {
    position: 'absolute',
    left: 0,
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 800,
    color: '#FBB040',
    whiteSpace: 'nowrap',
    fontStyle: 'normal',
  },
  heroLead: {
    fontFamily: "'Inter', sans-serif",
    fontSize: 'clamp(1rem, 1.3vw, 1.2rem)',
    lineHeight: 1.65,
    color: 'rgba(255,255,255,0.92)',
    maxWidth: 620,
    margin: 0,
    textShadow: '0 1px 12px rgba(0,0,0,0.35)',
  },
  heroCtaRow: { display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' },
  heroPrimary: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '14px 30px',
    borderRadius: 4,
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 700,
    fontSize: '0.95rem',
    color: LOGO_NAVY,
    background: '#F3F7FC',
    border: '1.5px solid rgba(243,247,252,0.9)',
    boxShadow: '0 6px 24px rgba(0,0,0,0.22)',
    textDecoration: 'none',
  },
  heroGhost: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '14px 26px',
    borderRadius: 4,
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 700,
    fontSize: '0.95rem',
    color: LOGO_NAVY,
    border: '1.5px solid rgba(243,247,252,0.9)',
    background: '#F3F7FC',
    backdropFilter: 'blur(10px)',
    textDecoration: 'none',
  },

  section: { position: 'relative', padding: '60px 24px 60px' },
  kitsSection: { position: 'relative', padding: '0 24px clamp(80px, 12vh, 140px)' },
  donateSection: { position: 'relative', padding: '0 24px clamp(90px, 13vh, 150px)' },

  sectionInner: { maxWidth: 1080, margin: '0 auto' },
  eyebrow: {
    display: 'block',
    fontFamily: "'Inter', sans-serif",
    fontWeight: 600,
    fontSize: '0.72rem',
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    color: '#aaa',
    marginBottom: 14,
    background: 'none',
    padding: 0,
    borderRadius: 0,
  },
  sectionH2: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 750,
    fontSize: 'clamp(1.9rem, 3vw, 2.55rem)',
    lineHeight: 1.12,
    letterSpacing: '-0.015em',
    color: '#1A1A1A',
    margin: '0 0 16px',
    maxWidth: 820,
  },
  h2Em: { color: '#1A1A1A', fontStyle: 'normal' },
  sectionLead: {
    fontFamily: "'Inter', sans-serif",
    fontSize: 'clamp(1rem, 1.25vw, 1.18rem)',
    lineHeight: 1.7,
    color: '#555',
    maxWidth: 760,
    margin: '0 0 48px',
  },
  sectionLeadWide: {
    fontFamily: "'Inter', sans-serif",
    fontSize: 'clamp(1rem, 1.25vw, 1.18rem)',
    lineHeight: 1.7,
    color: '#555',
    margin: '0 0 18px',
  },

  // about section split layout
  aboutRow: {
    display: 'flex',
    gap: 52,
    alignItems: 'flex-start',
  },
  aboutText: {
    flex: '1 1 58%',
    display: 'flex',
    flexDirection: 'column',
    gap: 0,
  },
  aboutImgWrap: {
    flex: '0 0 300px',
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    cursor: 'default',
  },
  aboutImgClip: {
    borderRadius: 6,
    overflow: 'hidden',
    boxShadow: '0 2px 16px rgba(0,0,0,0.07)',
  },
  aboutImg: {
    width: '100%',
    aspectRatio: '3 / 4',
    objectFit: 'cover',
    objectPosition: 'center center',
    display: 'block',
  },
  aboutImgCaption: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.7rem',
    color: 'rgba(0,0,0,0.38)',
    fontStyle: 'italic',
    letterSpacing: '0.02em',
    textAlign: 'right',
  },

  // care kit cards
  careKitGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: 24,
    marginTop: 48,
  },
  careKitCard: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 6,
    overflow: 'hidden',
    border: '1px solid rgba(0,0,0,0.07)',
    background: '#fff',
  },
  careKitImgWrap: {
    position: 'relative',
    height: 220,
    overflow: 'hidden',
    flexShrink: 0,
  },
  careKitImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  },
  careKitText: {
    padding: '24px 24px 28px',
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    flex: 1,
    background: '#fff',
  },
  careKitTitle: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 800,
    fontSize: '1.4rem',
    color: '#1A1A1A',
    margin: 0,
    lineHeight: 1.2,
    letterSpacing: '-0.02em',
  },
  careKitBody: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.95rem',
    lineHeight: 1.75,
    color: '#555',
    margin: 0,
  },

  kitsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    gap: 24,
  },
  kitCard: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 6,
    overflow: 'hidden',
    background: '#FFFFFF',
    boxShadow: '0 2px 16px rgba(0,0,0,0.07)',
    border: '1px solid rgba(0,0,0,0.06)',
    height: '100%',
  },
  kitImgWrap: {
    height: 260,
    overflow: 'hidden',
    position: 'relative',
  },
  kitImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
    transition: 'transform 0.5s ease',
  },
  kitCredit: {
    position: 'absolute',
    bottom: 8,
    right: 10,
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.6rem',
    color: 'rgba(255,255,255,0.42)',
    letterSpacing: '0.02em',
    pointerEvents: 'none',
  },
  kitBody: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '24px 28px',
    gap: 16,
  },
  kitBodyTop: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  kitNumber: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 800,
    fontSize: '0.86rem',
    letterSpacing: '0.18em',
  },
  kitCardTitle: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 800,
    fontSize: '1.5rem',
    letterSpacing: '-0.02em',
    lineHeight: 1.1,
    margin: 0,
    color: '#1A1A1A',
  },
  kitCardDesc: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.95rem',
    lineHeight: 1.6,
    color: '#555',
    margin: 0,
  },
  kitTags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 5,
    marginTop: 4,
  },
  kitTag: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 500,
    fontSize: '0.75rem',
    padding: '3px 10px',
    borderRadius: 100,
    whiteSpace: 'nowrap',
  },
  kitCta: {
    alignSelf: 'flex-start',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '12px 20px',
    borderRadius: 4,
    color: '#fff',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 700,
    fontSize: '0.88rem',
    textDecoration: 'none',
    letterSpacing: '-0.01em',
    boxShadow: '0 6px 18px rgba(87,160,24,0.22)',
  },
  kitCtaDisabled: {
    alignSelf: 'flex-start',
    display: 'inline-flex',
    alignItems: 'center',
    padding: '10px 20px',
    borderRadius: 4,
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 600,
    fontSize: '0.82rem',
    letterSpacing: '0.01em',
    background: 'rgba(26,26,26,0.06)',
    color: 'rgba(26,26,26,0.40)',
    border: '1.5px solid rgba(26,26,26,0.20)',
    cursor: 'not-allowed',
  },

  donateGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    gap: 24,
  },
  donateCard: {
    position: 'relative',
    minHeight: 540,
    overflow: 'hidden',
    borderRadius: 6,
    padding: 30,
    paddingBottom: 84,
    color: '#FFFFFF',
    cursor: 'default',
  },
  donateBg: {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    zIndex: 0,
    pointerEvents: 'none',
  },
  donateCardContent: {
    position: 'relative',
    zIndex: 2,
    display: 'flex',
    flexDirection: 'column',
    gap: 14,
  },
  donateKitLabel: {
    display: 'inline-flex',
    alignItems: 'center',
    width: 'fit-content',
    background: 'rgba(255,255,255,0.22)',
    backdropFilter: 'blur(8px)',
    border: '1px solid rgba(255,255,255,0.28)',
    color: '#FFFFFF',
    padding: '5px 14px',
    borderRadius: 100,
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 700,
    fontSize: '0.8rem',
    letterSpacing: '0.04em',
  },
  donatePrice: {
    display: 'block',
    fontFamily: "'JetBrains Mono', 'SF Mono', monospace",
    fontWeight: 900,
    fontSize: '3.4rem',
    lineHeight: 1.05,
    transformOrigin: 'top left',
    letterSpacing: '-0.02em',
    marginTop: 4,
    color: '#FFFFFF',
  },
  donateCurrency: {
    fontSize: '1.2rem',
    fontWeight: 700,
    letterSpacing: 0,
    opacity: 0.88,
  },
  donatePer: {
    display: 'block',
    fontSize: '0.95rem',
    fontWeight: 600,
    opacity: 0.78,
    marginTop: -4,
  },
  donateAmountMuted: {
    display: 'block',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 800,
    fontSize: '2.4rem',
    lineHeight: 1.1,
    letterSpacing: '-0.02em',
    marginTop: 4,
    color: 'rgba(255,255,255,0.95)',
  },
  donateCopy: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.97rem',
    lineHeight: 1.55,
    color: 'rgba(255,255,255,0.92)',
    margin: '4px 0 6px',
  },
  donateList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  donateItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 10,
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.94rem',
    lineHeight: 1.4,
    color: 'rgba(255,255,255,0.95)',
  },
  donateCta: {
    position: 'absolute',
    bottom: 18,
    left: 18,
    right: 18,
    zIndex: 3,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '13px 22px',
    borderRadius: 4,
    background: '#FFFFFF',
    color: LOGO_BLUE,
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 800,
    fontSize: '0.92rem',
    textTransform: 'uppercase',
    letterSpacing: '0.01em',
    textDecoration: 'none',
    border: '2px solid #FFFFFF',
  },
  donateDisabled: {
    position: 'absolute',
    bottom: 18,
    left: 18,
    right: 18,
    zIndex: 3,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '13px 18px',
    borderRadius: 4,
    background: 'rgba(255,255,255,0.18)',
    color: 'rgba(255,255,255,0.85)',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 700,
    fontSize: '0.82rem',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    border: '1.5px solid rgba(255,255,255,0.4)',
  },

  // how it works cards
  howItWorksGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gap: 24,
    marginTop: 48,
  },
  howItWorksCard: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 6,
    overflow: 'hidden',
    border: '1px solid rgba(0,0,0,0.07)',
    background: '#fff',
  },
  howItWorksImgWrap: {
    position: 'relative',
    height: 200,
    overflow: 'hidden',
    flexShrink: 0,
  },
  howItWorksImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  },
  howItWorksStep: {
    position: 'absolute',
    top: 12,
    left: 12,
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 800,
    fontSize: '0.8rem',
    color: '#fff',
    background: 'rgba(0,0,0,0.5)',
    padding: '4px 10px',
    borderRadius: 4,
    letterSpacing: '0.1em',
  },
  howItWorksText: {
    padding: '20px 20px 24px',
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    flex: 1,
    background: '#fff',
  },
  howItWorksTitle: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 800,
    fontSize: '1.1rem',
    color: '#1A1A1A',
    margin: 0,
    lineHeight: 1.2,
    letterSpacing: '-0.02em',
  },
  howItWorksBody: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.9rem',
    lineHeight: 1.7,
    color: '#555',
    margin: 0,
  },

  footnote: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.86rem',
    lineHeight: 1.6,
    color: 'rgba(0,0,0,0.45)',
    textAlign: 'center',
    maxWidth: 620,
    margin: '0 auto',
    fontStyle: 'italic',
  },
}
