import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Backpack,
  Heart,
  ShieldCheck,
  PackageOpen,
  ArrowRight,
  Lock,
  Check,
  HandHeart,
  ShoppingBag,
  Truck,
  Mail,
} from 'lucide-react'
import Nav from './Nav'
import Footer from './Footer'
import SparklesText from './SparklesText'

const PAGE_BG = '#F4F6FB'

// ─── Kit card — horizontal layout, white card, colored accent column ─────────

function KitCard({ kit, isMobile }) {
  return (
    <motion.div
      whileHover={kit.comingSoon ? {} : { y: -6, boxShadow: `0 22px 48px ${kit.shadow}` }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      style={{ ...styles.kitCard, opacity: kit.comingSoon ? 0.72 : 1 }}
    >
      <div style={{ ...styles.kitAccent, background: kit.accentBg, width: isMobile ? 80 : 130, padding: isMobile ? '20px 10px' : '28px 16px' }}>
        <div style={styles.kitIconCircle}>
          <kit.Icon size={isMobile ? 22 : 30} color="#fff" strokeWidth={2} />
        </div>
      </div>

      <div style={{ ...styles.kitBody, padding: isMobile ? '16px 16px' : '24px 28px' }}>
        <div style={styles.kitBodyTop}>
          <h3 style={{ ...styles.kitCardTitle, color: kit.titleColor }}>{kit.name}</h3>
          <p style={styles.kitCardDesc}>{kit.desc}</p>
          <div style={styles.kitTags}>
            {kit.items.map((item) => (
              <span key={item} style={{ ...styles.kitTag, background: `${kit.tagBg}`, color: kit.tagColor }}>
                {item}
              </span>
            ))}
          </div>
        </div>
        {kit.comingSoon ? (
          <span style={styles.kitCtaDisabled}>
            <Lock size={12} strokeWidth={2.5} style={{ marginRight: 6 }} />
            Coming Soon
          </span>
        ) : (
          <Link to={kit.href} style={{ ...styles.kitCta, background: kit.accentBg }}>
            {kit.cta}
            <ArrowRight size={15} strokeWidth={2.5} style={{ marginLeft: 8 }} />
          </Link>
        )}
      </div>
    </motion.div>
  )
}

// ─── Step card ───────────────────────────────────────────────────────────────

function StepCard({ step, index, span, isMobile }) {
  const Icon = step.icon
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: index * 0.08 }}
      whileHover={{ y: -6, boxShadow: '0 18px 38px rgba(26,58,107,0.12)', transition: { type: 'spring', stiffness: 280, damping: 18 } }}
      style={{ ...styles.stepCard, gridColumn: isMobile ? 'span 1' : `span ${span}` }}
    >
      <div style={styles.stepHeaderRow}>
        <span style={{ ...styles.stepIconWrap, background: `${step.color}18` }}>
          <Icon size={22} color={step.color} strokeWidth={2} />
        </span>
        <span style={{ ...styles.stepNumber, color: step.color }}>{step.step}</span>
      </div>
      <span style={styles.stepTitle}>{step.title}</span>
      <span style={styles.stepDesc}>{step.desc}</span>
    </motion.div>
  )
}

// ─── Main ────────────────────────────────────────────────────────────────────

const KITS = [
  {
    name: 'Education Kit',
    Icon: Backpack,
    accentBg: '#6B2D8B',
    titleColor: '#6B2D8B',
    tagBg: 'rgba(107,45,139,0.09)',
    tagColor: '#4A1E61',
    shadow: 'rgba(107,45,139,0.20)',
    desc: 'Stationery essentials and a comfort item, hand packed for one child in the Greater Toronto Area.',
    items: ['Pencils and coloured pencils', 'Calculator', 'Ruler and sharpener', 'Erasers', 'Mini plushie', 'Handwritten note'],
    href: '/care-kits/education',
    cta: 'Explore the Education Kit',
    comingSoon: false,
  },
  {
    name: 'Comfort Kit',
    Icon: Heart,
    accentBg: '#EE3093',
    titleColor: '#B91F70',
    tagBg: 'rgba(238,48,147,0.09)',
    tagColor: '#B91F70',
    shadow: 'rgba(238,48,147,0.20)',
    desc: 'A care package for kids spending time in hospital wards or family shelters. Currently in development.',
    items: ['Soft fleece blanket', 'Cuddle plushie', 'Activity booklet', 'Volunteer note'],
    href: '#',
    cta: 'Coming Soon',
    comingSoon: true,
  },
  {
    name: 'Health Kit',
    Icon: ShieldCheck,
    accentBg: '#14B8A6',
    titleColor: '#0D7A6F',
    tagBg: 'rgba(20,184,166,0.09)',
    tagColor: '#0D7A6F',
    shadow: 'rgba(20,184,166,0.20)',
    desc: 'Hygiene and wellness essentials for kids in shelters, hospitals, and transitional homes. Launching later this year.',
    items: ['Toothbrush and toothpaste', 'Bandages and first aid basics', 'Reusable water bottle', 'Daily multivitamins', 'Wellness activity booklet'],
    href: '#',
    cta: 'Coming Soon',
    comingSoon: true,
  },
]

const STEPS = [
  { icon: HandHeart, color: '#EE3093', step: '01', title: 'You sponsor a kit', desc: 'A single donation funds one full Care Kit for one child in the Greater Toronto Area.', span: 2 },
  { icon: ShoppingBag, color: '#0099D6', step: '02', title: 'We source the supplies', desc: 'Every item bought from Canadian suppliers wherever possible — quality over convenience.', span: 2 },
  { icon: PackageOpen, color: '#6B2D8B', step: '03', title: 'Volunteers hand pack it', desc: 'A volunteer assembles your kit one piece at a time, with a short handwritten note tucked inside.', span: 2 },
  { icon: Truck, color: '#39B54A', step: '04', title: 'A child receives it', desc: 'We deliver directly to hospital wards, family shelters, and partner programs across the GTA.', span: 3 },
  { icon: Mail, color: '#F7941D', step: '05', title: 'A card in your name', desc: 'A small card inside the kit carries your name — your generosity reaches the child directly.', span: 3 },
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
            Care Kits are hand-packed, donation-funded packages delivered directly to
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
              How it works →
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── WHAT ARE CARE KITS ── */}
      <section style={styles.section}>
        <div style={styles.sectionInner}>
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            style={styles.eyebrow}
          >
            What Are Care Kits?
          </motion.span>
          <div style={{ ...styles.aboutRow, flexDirection: isMobile ? 'column' : 'row' }}>
            {/* Text column */}
            <motion.div
              style={styles.aboutText}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 style={{ ...styles.sectionH2, maxWidth: 'none' }}>
                For every child who deserves <span style={styles.h2Em}>a fresh start.</span>
              </h2>
              <p style={{ ...styles.sectionLeadWide, marginTop: 32 }}>
                When a child's life shifts — a hospital stay, a shelter placement, a home in
                transition — school and normalcy are the first things to pause. Care Kits are
                our small, real answer: purpose-built packages that meet kids exactly where
                they are, with supplies chosen specifically for their situation.
              </p>
              <p style={{ ...styles.sectionLeadWide, marginBottom: 0 }}>
                Every kit is hand-packed by a volunteer, funded by a single donor, and
                delivered free of charge through our hospital and shelter partners across
                the Greater Toronto Area.
              </p>
            </motion.div>

            {/* Image column */}
            <motion.div
              style={{ ...styles.aboutImgWrap, flex: isMobile ? '1 1 auto' : '0 0 300px', width: isMobile ? '100%' : undefined }}
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
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
                color: '#6B2D8B',
                bg: 'rgba(107,45,139,0.07)',
                title: 'Hand-Packed with Care',
                body: 'Every kit is assembled by one of our volunteers — no assembly lines, no shortcuts. Each item is placed with intention so a child feels seen the moment they open it.',
              },
              {
                Icon: Heart,
                color: '#C0392B',
                bg: 'rgba(192,57,43,0.07)',
                title: 'Funded by One Donor',
                body: 'A single sponsorship covers one complete kit for one child. Donors know exactly where their contribution goes — and children receive every cent of it.',
              },
              {
                Icon: Truck,
                color: '#1A3A6B',
                bg: 'rgba(26,58,107,0.07)',
                title: 'Delivered by Us',
                body: 'Our team personally delivers every kit to hospitals and shelters across the GTA — no middlemen, no delays. We show up ourselves because these kids deserve that.',
              },
            ].map((p, i) => (
              <motion.div
                key={p.title}
                style={styles.pillarCard}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6, boxShadow: '0 18px 42px rgba(26,58,107,0.12)', transition: { duration: 0.35 } }}
              >
                <div style={{ ...styles.pillarIconWrap, background: p.bg }}>
                  <p.Icon size={26} color={p.color} strokeWidth={1.8} />
                </div>
                <h4 style={styles.pillarTitle}>{p.title}</h4>
                <p style={styles.pillarBody}>{p.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OUR KITS ── */}
      <section id="our-kits" style={styles.kitsSection}>
        <div style={styles.sectionInner}>
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            style={styles.eyebrow}
          >
            Our Kits
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={styles.sectionH2}
          >
            Three kits. <span style={styles.h2Em}>One mission.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{ ...styles.sectionLead, marginBottom: 48 }}
          >
            Each kit is built around a specific moment in a child's life. Education,
            comfort, and health. Different needs, same care.
          </motion.p>

          <div style={styles.kitsGrid}>
            {KITS.map((kit, i) => (
              <motion.div
                key={kit.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <KitCard kit={kit} isMobile={isMobile} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" style={styles.section}>
        <div style={styles.sectionInner}>
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            style={styles.eyebrow}
          >
            How It Works
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ ...styles.sectionH2, maxWidth: 'none' }}
          >
            From your gift to a <span style={styles.h2Em}>child's hands.</span>
          </motion.h2>

          <div style={{ ...styles.stepsGrid, gridTemplateColumns: isMobile ? '1fr' : 'repeat(6, 1fr)' }}>
            {STEPS.map((s, i) => (
              <StepCard key={s.step} step={s} index={i} span={s.span} isMobile={isMobile} />
            ))}
          </div>
        </div>
      </section>

      {/* ── SPONSOR SECTION ── */}
      <section id="sponsor" style={styles.sponsorSection}>
        <div style={styles.sectionInner}>
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            style={styles.eyebrow}
          >
            Sponsor a Kit
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={styles.sponsorH2}
          >
            One kit can change a{' '}
            <SparklesText
              text="chapter"
              colors={{ first: '#6B2D8B', second: '#FBB040' }}
              count={12}
              textStyle={{ color: '#FBB040' }}
            />
            <span style={{ color: '#FBB040' }}>.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={styles.sponsorLead}
          >
            Every sponsored kit goes directly to a child who needs one. Your contribution
            funds the supplies and the carry pouch. This is a donation, not a product purchase.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.15 }}
            style={{ ...styles.sponsorCards, flexDirection: isMobile ? 'column' : 'row' }}
          >
            <SponsorCard
              label="Education Kit"
              color="#6B2D8B"
              bg="linear-gradient(155deg, #6B2D8B 0%, #4A1E61 100%)"
              price="30"
              desc="Stationery essentials and a comfort item, packed for one child in the GTA."
              cta="Explore & Sponsor"
              href="/care-kits/education"
              isLink
              isMobile={isMobile}
            />
            <SponsorCard
              label="Comfort Kit"
              color="#EE3093"
              bg="linear-gradient(155deg, #EE3093 0%, #B91F70 100%)"
              comingSoon
              desc="A care package for kids in hospital wards or family shelters. In development."
              isMobile={isMobile}
            />
            <SponsorCard
              label="Health Kit"
              color="#14B8A6"
              bg="linear-gradient(155deg, #14B8A6 0%, #0D7A6F 100%)"
              comingSoon
              desc="Hygiene and wellness essentials for kids in shelters and transitional homes."
              isMobile={isMobile}
            />
          </motion.div>

          <p style={styles.footnote}>
            100% of your gift funds the supplies and the carry pouch.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}

// ─── Simple sponsor mini-card ─────────────────────────────────────────────────

function SponsorCard({ label, color, bg, price, desc, cta, href, comingSoon, isLink, isMobile }) {
  return (
    <motion.div
      whileHover="hover"
      variants={{ hover: { scale: 1.04 } }}
      transition={{ duration: 0.9, ease: [0.55, 0, 0.1, 1] }}
      style={{ ...styles.sponsorCard, background: bg, width: isMobile ? '100%' : 300 }}
    >
      <span style={styles.sponsorBadge}>
        {comingSoon && <Lock size={11} strokeWidth={2.5} style={{ marginRight: 5 }} />}
        {comingSoon ? 'Coming Soon' : label}
      </span>

      {!comingSoon && (
        <span style={styles.sponsorPrice}>
          ${price}
          <span style={styles.sponsorCad}> CAD</span>
          <span style={styles.sponsorPer}> / kit</span>
        </span>
      )}
      {comingSoon && (
        <span style={styles.sponsorName}>{label}</span>
      )}

      <p style={styles.sponsorDesc}>{desc}</p>

      {comingSoon ? (
        <span style={styles.sponsorBtnDisabled}>Not yet available</span>
      ) : isLink ? (
        <Link to={href} style={styles.sponsorBtn}>{cta}</Link>
      ) : (
        <a href={href} style={styles.sponsorBtn}>{cta}</a>
      )}
    </motion.div>
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
    fontFamily: "'Poppins', sans-serif",
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
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 800,
    color: '#FBB040',
    whiteSpace: 'nowrap',
    fontStyle: 'normal',
  },
  heroLead: {
    fontFamily: "'DM Sans', sans-serif",
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
    borderRadius: 100,
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 700,
    fontSize: '0.95rem',
    color: '#fff',
    background: '#6B2D8B',
    boxShadow: '0 6px 24px rgba(107,45,139,0.45)',
    textDecoration: 'none',
  },
  heroGhost: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '14px 26px',
    borderRadius: 100,
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 700,
    fontSize: '0.95rem',
    color: '#ffffff',
    border: '1.5px solid rgba(255,255,255,0.45)',
    background: 'rgba(255,255,255,0.10)',
    backdropFilter: 'blur(10px)',
    textDecoration: 'none',
  },

  section: { position: 'relative', padding: '60px 24px 60px' },
  kitsSection: { position: 'relative', padding: '0 24px clamp(80px, 12vh, 140px)' },
  sponsorSection: { position: 'relative', padding: '0 24px clamp(100px, 14vh, 160px)', textAlign: 'center' },

  sectionInner: { maxWidth: 1080, margin: '0 auto' },
  eyebrow: {
    display: 'inline-block',
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 800,
    fontSize: '0.74rem',
    letterSpacing: '0.24em',
    textTransform: 'uppercase',
    color: '#6B2D8B',
    background: 'rgba(107,45,139,0.10)',
    padding: '6px 14px',
    borderRadius: 100,
    marginBottom: 22,
  },
  sectionH2: {
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 800,
    fontSize: 'clamp(2.1rem, 4.4vw, 3.4rem)',
    lineHeight: 1.08,
    letterSpacing: '-0.025em',
    color: '#1A3A6B',
    margin: '0 0 16px',
    maxWidth: 820,
  },
  h2Em: { color: '#FBB040', fontStyle: 'normal' },
  sectionLead: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 'clamp(1rem, 1.25vw, 1.18rem)',
    lineHeight: 1.7,
    color: 'rgba(26,26,26,0.72)',
    maxWidth: 760,
    margin: '0 0 48px',
  },
  sectionLeadWide: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 'clamp(1rem, 1.25vw, 1.18rem)',
    lineHeight: 1.7,
    color: 'rgba(26,26,26,0.72)',
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
    borderRadius: 18,
    overflow: 'hidden',
    boxShadow: '0 12px 36px rgba(26,58,107,0.14)',
  },
  aboutImg: {
    width: '100%',
    aspectRatio: '3 / 4',
    objectFit: 'cover',
    objectPosition: 'center center',
    display: 'block',
  },
  aboutImgCaption: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '0.7rem',
    color: 'rgba(26,58,107,0.38)',
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
    borderRadius: 20,
    border: '1.5px solid rgba(26,58,107,0.09)',
    boxShadow: '0 4px 18px rgba(26,58,107,0.07)',
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
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 700,
    fontSize: '1.05rem',
    color: '#1A3A6B',
    margin: 0,
    lineHeight: 1.3,
  },
  pillarBody: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '0.92rem',
    color: 'rgba(26,26,26,0.65)',
    lineHeight: 1.7,
    margin: 0,
  },

  // kit cards — vertical stack, horizontal layout per card
  kitsGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: 18,
  },
  kitCard: {
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 20,
    overflow: 'hidden',
    background: '#FFFFFF',
    boxShadow: '0 4px 20px rgba(26,58,107,0.08)',
    border: '1px solid rgba(26,58,107,0.07)',
  },
  kitAccent: {
    width: 130,
    flexShrink: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 14,
    padding: '28px 16px',
  },
  kitIconCircle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 58,
    height: 58,
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.22)',
  },
  kitAccentLabel: {
    display: 'inline-flex',
    alignItems: 'center',
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 700,
    fontSize: '0.68rem',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.88)',
    textAlign: 'center',
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
  kitCardTitle: {
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 800,
    fontSize: '1.35rem',
    letterSpacing: '-0.02em',
    lineHeight: 1.1,
    margin: 0,
  },
  kitCardDesc: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '0.95rem',
    lineHeight: 1.6,
    color: 'rgba(26,26,26,0.68)',
    margin: 0,
  },
  kitTags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 5,
    marginTop: 4,
  },
  kitTag: {
    fontFamily: "'DM Sans', sans-serif",
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
    padding: '10px 22px',
    borderRadius: 100,
    color: '#fff',
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 700,
    fontSize: '0.88rem',
    textDecoration: 'none',
    letterSpacing: '-0.01em',
  },
  kitCtaDisabled: {
    alignSelf: 'flex-start',
    display: 'inline-flex',
    alignItems: 'center',
    padding: '10px 20px',
    borderRadius: 100,
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 600,
    fontSize: '0.82rem',
    letterSpacing: '0.01em',
    background: 'rgba(26,26,26,0.06)',
    color: 'rgba(26,26,26,0.40)',
    border: '1.5px dashed rgba(26,26,26,0.20)',
    cursor: 'not-allowed',
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
    border: '1px solid rgba(26,58,107,0.10)',
    borderRadius: 18,
    padding: '22px 18px 24px',
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    boxShadow: '0 4px 20px rgba(26,58,107,0.06)',
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
    borderRadius: 12,
  },
  stepNumber: {
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 800,
    fontSize: '0.78rem',
    letterSpacing: '0.2em',
    opacity: 0.85,
  },
  stepTitle: {
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 700,
    fontSize: '0.95rem',
    color: '#1A3A6B',
    letterSpacing: '-0.015em',
    lineHeight: 1.25,
  },
  stepDesc: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '0.92rem',
    lineHeight: 1.55,
    color: 'rgba(26,26,26,0.68)',
  },

  // sponsor
  sponsorH2: {
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 800,
    fontSize: 'clamp(2.1rem, 4.6vw, 3.4rem)',
    lineHeight: 1.1,
    letterSpacing: '-0.025em',
    color: '#1A3A6B',
    margin: '0 auto 22px',
    maxWidth: 820,
  },
  sponsorLead: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 'clamp(1rem, 1.25vw, 1.18rem)',
    lineHeight: 1.7,
    color: 'rgba(26,26,26,0.68)',
    maxWidth: 640,
    margin: '0 auto 48px',
  },
  sponsorCards: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 22,
    marginBottom: 36,
  },
  sponsorCard: {
    position: 'relative',
    width: 300,
    minHeight: 320,
    flexShrink: 0,
    overflow: 'hidden',
    borderRadius: 22,
    padding: '28px 28px 80px',
    boxShadow: '0 14px 38px rgba(26,58,107,0.18)',
    color: '#FFFFFF',
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  sponsorBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    width: 'fit-content',
    background: 'rgba(255,255,255,0.22)',
    backdropFilter: 'blur(8px)',
    border: '1px solid rgba(255,255,255,0.28)',
    padding: '5px 14px',
    borderRadius: 100,
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 700,
    fontSize: '0.78rem',
    letterSpacing: '0.04em',
    color: '#fff',
  },
  sponsorPrice: {
    display: 'block',
    fontFamily: "'JetBrains Mono', 'SF Mono', monospace",
    fontWeight: 900,
    fontSize: '3rem',
    lineHeight: 1.05,
    letterSpacing: '-0.02em',
    marginTop: 4,
  },
  sponsorCad: { fontSize: '1.1rem', fontWeight: 700, opacity: 0.88 },
  sponsorPer: { display: 'block', fontSize: '0.9rem', fontWeight: 600, opacity: 0.78 },
  sponsorName: {
    display: 'block',
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 800,
    fontSize: '2rem',
    lineHeight: 1.1,
    letterSpacing: '-0.02em',
    marginTop: 4,
    color: 'rgba(255,255,255,0.95)',
  },
  sponsorDesc: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '0.95rem',
    lineHeight: 1.55,
    color: 'rgba(255,255,255,0.92)',
    margin: 0,
  },
  sponsorBtn: {
    position: 'absolute',
    bottom: 18,
    left: 18,
    right: 18,
    zIndex: 3,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '13px 18px',
    borderRadius: 12,
    background: '#FFFFFF',
    color: '#1A1A1A',
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 700,
    fontSize: '0.88rem',
    textDecoration: 'none',
    border: '2px solid #FFFFFF',
  },
  sponsorBtnDisabled: {
    position: 'absolute',
    bottom: 18,
    left: 18,
    right: 18,
    zIndex: 3,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '13px 18px',
    borderRadius: 12,
    background: 'rgba(255,255,255,0.18)',
    color: 'rgba(255,255,255,0.85)',
    fontFamily: "'JetBrains Mono', 'SF Mono', monospace",
    fontWeight: 700,
    fontSize: '0.82rem',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    border: '1.5px dashed rgba(255,255,255,0.4)',
    cursor: 'not-allowed',
  },
  footnote: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '0.86rem',
    lineHeight: 1.6,
    color: 'rgba(26,58,107,0.6)',
    textAlign: 'center',
    maxWidth: 620,
    margin: '0 auto',
    fontStyle: 'italic',
  },
}
