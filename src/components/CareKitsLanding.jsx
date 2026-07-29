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
import SparklesText from './SparklesText'
import DonateFloat from './DonateFloat'

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
      <div style={styles.kitImgWrap}>
        <img src={kit.img} alt={kit.name} style={styles.kitImg} />
        <span style={styles.kitCredit}>Photo: {kit.credit}</span>
      </div>

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
  { icon: HandHeart, accent: ACCENTS.green, step: '01', title: 'You sponsor a kit', desc: 'A single donation funds one full Care Kit for one child in the Greater Toronto Area.', span: 2 },
  { icon: ShoppingBag, accent: ACCENTS.amber, step: '02', title: 'We source the supplies', desc: 'Every item is selected from Canadian suppliers whenever possible, with quality guiding each choice.', span: 2 },
  { icon: PackageOpen, accent: ACCENTS.navy, step: '03', title: 'Volunteers hand pack it', desc: 'A volunteer assembles your kit one piece at a time, with a short handwritten note tucked inside.', span: 2 },
  { icon: Truck, accent: ACCENTS.teal, step: '04', title: 'A child receives it', desc: 'We deliver directly to hospital wards, family shelters, and partner programs across the GTA.', span: 3 },
  { icon: Mail, accent: ACCENTS.pink, step: '05', title: 'A card in your name', desc: 'A small card inside the kit carries your name so your generosity reaches the child directly.', span: 3 },
]

const DONATION_KITS = [
  {
    name: 'Educational Kit',
    color: LOGO_BLUE,
    background: `linear-gradient(155deg, ${LOGO_BLUE} 0%, ${LOGO_BLUE} 100%)`,
    shadow: '0 14px 38px rgba(0,153,214,0.22)',
    copy: 'Back-to-school essentials for everyday classroom learning.',
    items: ['1 notebook', '2 folders', '1 pencil pouch', '4 pens', '3 pencils', '5 crayons', '1 glue stick', '1 highlighter', '1 ruler', '2 erasers', '1 sharpener'],
    href: '/donate',
    comingSoon: false,
  },
  {
    name: 'Comfort Kit',
    color: LOGO_ORANGE,
    background: `linear-gradient(155deg, ${LOGO_ORANGE} 0%, ${LOGO_ORANGE} 100%)`,
    shadow: '0 14px 38px rgba(247,148,29,0.18)',
    copy: 'A care package concept currently in development.',
    items: ['Comfort supplies', 'Volunteer packed'],
    comingSoon: true,
  },
  {
    name: 'Health Kit',
    color: LOGO_PINK,
    background: `linear-gradient(155deg, ${LOGO_PINK} 0%, ${LOGO_PINK} 100%)`,
    shadow: '0 14px 38px rgba(238,48,147,0.18)',
    copy: 'A wellness kit concept currently in development.',
    items: ['Wellness essentials', 'Partner delivered'],
    comingSoon: true,
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
            <div style={{ ...styles.aboutRow, flexDirection: isMobile ? 'column' : 'row' }}>
              {/* Text column */}
              <div style={styles.aboutText}>
                <h2 style={{ ...styles.sectionH2, maxWidth: 'none' }}>
                  Care Kits
                </h2>
                <p style={{ ...styles.sectionLeadWide, marginTop: 32 }}>
                  When a child's life shifts, school and normal routines can pause overnight.
                  Care Kits bring useful supplies and a little comfort right to that moment.
                </p>
                <p style={styles.sectionLeadWide}>
                  Each kit is packed by a volunteer, funded by one donor, and delivered free of
                  charge through hospital and shelter partners across the GTA.
                </p>
                <p style={{ ...styles.sectionLeadWide, marginBottom: 0 }}>
                  A Care Kit cannot change the circumstances a child is facing, but it can make the
                  first days feel less overwhelming. Each one is a practical reminder that the child
                  and family are seen, supported, and not alone.
                </p>
              </div>

              {/* Image column */}
              <motion.div
                style={{ ...styles.aboutImgWrap, flex: isMobile ? '1 1 auto' : '0 0 300px', width: isMobile ? '100%' : undefined }}
                whileHover={{ scale: 1.03, zIndex: 2, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } }}
              >
                <div style={styles.aboutImgClip}>
                  <motion.img
                    src="/care-kits-about.jpg"
                    alt="Child focused on schoolwork"
                    style={{ ...styles.aboutImg, aspectRatio: isMobile ? '4/3' : '3/4' }}
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                  />
                </div>
                <span style={styles.aboutImgCaption}>Photo by Annie Spratt / Unsplash</span>
              </motion.div>
            </div>

            {/* Pillar cards */}
            <div style={{ ...styles.pillarRow, gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)' }}>
              {[
                {
                  Icon: HandHeart,
                  accent: ACCENTS.green,
                  title: 'Packed with Care',
                  body: 'Each item is chosen with purpose and placed by a volunteer.',
                },
                {
                  Icon: Heart,
                  accent: ACCENTS.pink,
                  title: 'Funded by One Donor',
                  body: 'One sponsorship funds one complete kit for one child.',
                },
                {
                  Icon: Truck,
                  accent: ACCENTS.teal,
                  title: 'Delivered by Us',
                  body: 'Our team brings kits directly to trusted local partners.',
                },
              ].map((p) => (
                <motion.div
                  key={p.title}
                  style={styles.pillarCard}
                  whileHover={{ y: -6, boxShadow: `0 18px 42px ${p.accent.shadow}`, transition: { duration: 0.35 } }}
                >
                  <div style={{ ...styles.pillarIconWrap, background: p.accent.bg }}>
                    <p.Icon size={26} color={p.accent.color} strokeWidth={1.8} />
                  </div>
                  <h4 style={styles.pillarTitle}>{p.title}</h4>
                  <p style={styles.pillarBody}>{p.body}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
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
              One kit can change a{' '}
              <SparklesText
                text="chapter"
                colors={{ first: '#F7941D', second: '#FBB040' }}
                count={12}
                textStyle={{ color: '#1A1A1A' }}
              />
              .
            </h2>

            <div style={{ ...styles.stepsGrid, gridTemplateColumns: isMobile ? '1fr' : 'repeat(6, 1fr)' }}>
              {STEPS.map((s, i) => (
                <StepCard key={s.step} step={s} index={i} span={s.span} isMobile={isMobile} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── DONATE ── */}
      <section id="donate" style={styles.donateSection}>
        <div style={styles.sectionInner}>
          <motion.div
            variants={fromBottom}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: '-250px 0px -80px 0px' }}
          >
            <span style={styles.eyebrow}>Donate</span>
            <h2 style={styles.sectionH2}>Donate a Kit</h2>
            <p style={{ ...styles.sectionLead, marginBottom: 42 }}>
              Each Educational Kit is $6 and goes toward supplies for one child.
            </p>
            <div style={{ ...styles.donateGrid, gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, minmax(0, 1fr))' }}>
              {DONATION_KITS.map((kit) => (
                <DonationKitCard key={kit.name} kit={kit} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
      <DonateFloat label="Donate Today" to="/donate" />
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

  // pillar cards
  pillarRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 24,
    marginTop: 56,
  },
  pillarCard: {
    background: '#fff',
    borderRadius: 6,
    border: '1px solid rgba(0,0,0,0.06)',
    boxShadow: '0 2px 16px rgba(0,0,0,0.07)',
    padding: '32px 28px',
    display: 'flex',
    flexDirection: 'column',
    gap: 14,
    cursor: 'default',
  },
  pillarIconWrap: {
    width: 52,
    height: 52,
    borderRadius: 14,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  pillarTitle: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 700,
    fontSize: '1.05rem',
    color: '#1A1A1A',
    margin: 0,
    lineHeight: 1.3,
  },
  pillarBody: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.92rem',
    color: '#555',
    lineHeight: 1.7,
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

  // steps
  stepsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(6, 1fr)',
    gridTemplateRows: 'auto auto',
    gap: 16,
    marginTop: 48,
  },
  stepCard: {
    position: 'relative',
    background: '#FFFFFF',
    border: '1px solid rgba(0,0,0,0.06)',
    borderRadius: 6,
    padding: '22px 18px 24px',
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    boxShadow: '0 2px 16px rgba(0,0,0,0.07)',
    cursor: 'default',
    overflow: 'hidden',
  },
  stepHeaderRow: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 },
  stepIconWrap: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 44,
    height: 44,
    borderRadius: 8,
  },
  stepNumber: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 800,
    fontSize: '0.78rem',
    letterSpacing: '0.2em',
    opacity: 0.82,
  },
  stepTitle: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 700,
    fontSize: '0.95rem',
    color: '#1A1A1A',
    letterSpacing: '-0.015em',
    lineHeight: 1.25,
  },
  stepDesc: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.92rem',
    lineHeight: 1.55,
    color: '#555',
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
