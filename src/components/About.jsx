import { motion } from 'framer-motion'
import {
  BookOpen,
  HeartPulse,
  HandHeart,
  Compass,
  UsersRound,
} from 'lucide-react'

const NAVY = '#1A3A6B'
const BLUE = '#0099D6'
const ORANGE = '#F7941D'
const YELLOW = '#FBB040'
const CHARCOAL = '#1A1A1A'

const aboutImages = {
  hero: {
    src: '/about-hero-children-reading.png',
    alt: 'Children reading and learning together',
    credit: 'Ismail Salad Osman Hajji Dirir',
  },
  vision: {
    src: 'https://images.unsplash.com/photo-1560785496-3c9d27877182?auto=format&fit=crop&w=1200&q=82',
    alt: 'Child writing in a notebook',
    credit: 'Annie Spratt',
  },
  mission: {
    src: 'https://images.unsplash.com/photo-1636202339022-7d67f7447e3a?auto=format&fit=crop&w=1200&q=82',
    alt: 'Children sitting at desks in a classroom',
    credit: 'Mario Heller',
  },
}

const RISHI_BIO =
  "Inequality wasn't an abstraction for me growing up. I've witnessed people weighing whether a notebook was worth the money, and I know that what stands between children and their dreams isn't a shortage of love. It's access. My role at The First Chapter involves laying the groundwork for operations, finance, fundraising, outreach, and making sure the organization operates with integrity. Trust is earned through transparency with each passing day."

const VEER_BIO =
  "Every child should have an equal opportunity in life. This principle is the reason I started The First Chapter. Too many children within our own community do not have access to what most people take for granted: a healthy childhood, an adequate education, and the basic feeling of being cared for. My goal is simple: to connect selflessness with the children who need it most."

const focusCards = [
  {
    icon: BookOpen,
    title: 'Education access',
    body: 'We aim to provide practical learning supplies, educational kits, and school-readiness support to children who may be starting from behind.',
    color: NAVY,
  },
  {
    icon: HeartPulse,
    title: 'Health and wellbeing',
    body: 'We aim to support children facing hospital stays, family instability, or difficult transitions with resources that feel useful and caring.',
    color: BLUE,
  },
  {
    icon: HandHeart,
    title: 'Community care',
    body: 'We aim to work with local partners, volunteers, families, and students so help reaches children through trusted community channels.',
    color: ORANGE,
  },
]

const quickLinks = [
  { icon: Compass, label: 'Vision', href: '#vision' },
  { icon: BookOpen, label: 'Mission', href: '#mission' },
  { icon: HeartPulse, label: 'Purpose', href: '#purpose' },
  { icon: UsersRound, label: 'Founders', href: '#founders' },
]

function FounderCard({ initials, name, role, bio, color }) {
  return (
    <motion.article
      style={styles.founderCard}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <div style={{ ...styles.founderAvatar, background: color }}>{initials}</div>
      <div>
        <span style={styles.founderRole}>{role}</span>
        <h3 style={styles.founderName}>{name}</h3>
        <p style={styles.founderBio}>{bio}</p>
      </div>
    </motion.article>
  )
}

export default function About() {
  return (
    <div style={styles.page}>
      <section style={styles.hero}>
        <div className="container">
          <div style={styles.heroGrid} className="about-page-hero-grid">
            <motion.div
              style={styles.heroCopy}
              initial={{ opacity: 0, x: -36 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 style={styles.heroTitle} className="about-hero-title">
                About The First Chapter
              </h1>
              <p style={styles.heroText}>
                The First Chapter is a student-led non-profit in the Greater Toronto Area
                focused on helping children access education, health, and the feeling that
                someone is in their corner.
              </p>
            </motion.div>

            <motion.div
              style={styles.heroImageWrap}
              className="about-image-card"
              initial={{ opacity: 0, x: 36 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
                <img src={aboutImages.hero.src} alt={aboutImages.hero.alt} style={styles.heroImage} />
              <span style={styles.imageCredit}>Photo: {aboutImages.hero.credit}</span>
              <div style={styles.heroImageNote}>
                Built around supplies, care, and community support.
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section style={styles.quickBand} aria-label="About page sections">
        <div className="container">
          <div style={styles.quickGrid} className="about-quick-grid">
            {quickLinks.map((item) => {
              const Icon = item.icon
              return (
                <motion.a
                  key={item.href}
                  href={item.href}
                  style={styles.quickItem}
                  initial="rest"
                  whileHover="hover"
                  whileTap={{ scale: 0.98 }}
                  variants={{
                    rest: { y: 0, scale: 1, color: CHARCOAL },
                    hover: { y: -8, scale: 1.03, color: NAVY },
                  }}
                  transition={{ type: 'spring', stiffness: 280, damping: 18 }}
                >
                  <motion.span
                    style={styles.quickIcon}
                    variants={{ rest: { rotate: 0 }, hover: { rotate: -6 } }}
                  >
                    <Icon size={35} strokeWidth={1.75} />
                  </motion.span>
                  <span>{item.label}</span>
                </motion.a>
              )
            })}
          </div>
        </div>
      </section>

      <section id="vision" style={styles.visionSection}>
        <div className="container">
          <h2 style={styles.sectionTitle}>Our Vision</h2>
          <div style={styles.visionPanel} className="about-vision-grid">
            <div style={styles.visionImageWrap} className="about-image-card">
              <img src={aboutImages.vision.src} alt={aboutImages.vision.alt} style={styles.visionImage} />
              <span style={styles.imageCredit}>Photo: {aboutImages.vision.credit} / Unsplash</span>
            </div>
            <div style={styles.visionBody}>
              <p>
                We believe every child deserves access to the tools, encouragement, and
                care that make learning and growing feel possible. A child should not have
                to wonder whether they belong in a classroom, whether they have the basic
                supplies to participate, or whether anyone notices what they are carrying.
              </p>
              <p>
                Our vision is to build a community where generosity becomes practical:
                school supplies, care kits, awareness, volunteer time, and local partnerships
                that help children feel supported before they fall through the cracks.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="mission" style={styles.missionSection}>
        <div className="container">
          <div style={styles.splitFeature} className="about-split-feature">
            <div style={styles.splitImageWrap} className="about-image-card">
              <img src={aboutImages.mission.src} alt={aboutImages.mission.alt} style={styles.splitImage} />
              <span style={styles.imageCredit}>Photo: {aboutImages.mission.credit} / Unsplash</span>
            </div>
            <div style={styles.splitCopy}>
              <h2 style={styles.sectionTitle}>Our Mission</h2>
              <p style={styles.bodyText}>
                Our mission is to equip children facing hardship with thoughtfully assembled educational care kits, 
                while building a community of donors, advocates, and partner organizations committed to closing the gap in access to learning. 
                Every kit we create is a deliberate act of care, and every partnership we form is a step toward lasting, community-driven change.
              </p>
              <a href="/care-kits" style={styles.primaryButton}>Explore Care Kits</a>
            </div>
          </div>

          <div style={styles.focusGrid} className="about-focus-grid">
            {focusCards.map((card) => {
              const Icon = card.icon
              return (
                <motion.article
                  key={card.title}
                  style={styles.focusCard}
                  whileHover={{ y: -6, boxShadow: '0 16px 36px rgba(26,58,107,0.14)' }}
                >
                  <span style={{ ...styles.focusIcon, color: card.color, background: `${card.color}16` }}>
                    <Icon size={24} />
                  </span>
                  <h3 style={styles.focusTitle}>{card.title}</h3>
                  <p style={styles.focusBody}>{card.body}</p>
                </motion.article>
              )
            })}
          </div>
        </div>
      </section>

      <section id="purpose" style={styles.purposeBand}>
        <div className="container">
          <HeartPulse size={58} strokeWidth={1.8} style={styles.purposeIcon} />
          <h2 style={styles.purposeTitle}>Our Purpose</h2>
          <p style={styles.purposeText}>
            The First Chapter exists to close the gap between a child's potential 
            and the resources available to them. Through educational care kits and trusted community partnerships, 
            we put learning tools directly into the hands of children in Brampton and beyond who would otherwise go without.
          </p>
        </div>
      </section>

      <section id="founders" style={styles.foundersSection}>
        <div className="container">
          <div style={styles.foundersHeader}>
            <h2 style={styles.sectionTitle}>Founders</h2>
          </div>
          <div style={styles.founderGrid} className="about-founder-grid">
            <FounderCard initials="VM" name="Veer Malik" role="Co-Founder & CEO" bio={VEER_BIO} color={CHARCOAL} />
            <FounderCard initials="RM" name="Rishi Mitra" role="Co-Founder & COO " bio={RISHI_BIO} color={NAVY} />
          </div>
        </div>
      </section>

    </div>
  )
}

const styles = {
  page: { background: '#fff', color: CHARCOAL },
  hero: { padding: '96px 0 72px', background: '#fff' },
  heroGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 0.75fr',
    gap: 42,
    alignItems: 'center',
  },
  heroCopy: { position: 'relative', zIndex: 2 },
  heroTitle: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 750,
    fontSize: 'clamp(2.2rem, 3.2vw, 3rem)',
    lineHeight: 1.08,
    letterSpacing: '-0.02em',
    margin: '0 0 18px',
    maxWidth: 'none',
    whiteSpace: 'nowrap',
  },
  heroText: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '1.08rem',
    lineHeight: 1.75,
    color: '#555',
    maxWidth: 520,
    margin: 0,
  },
  heroImageWrap: {
    position: 'relative',
    minHeight: 430,
    overflow: 'hidden',
    borderRadius: 6,
    boxShadow: '0 22px 60px rgba(0,0,0,0.13)',
  },
  heroImage: { width: '100%', height: 430, objectFit: 'cover' },
  imageCredit: {
    position: 'absolute',
    right: 10,
    bottom: 9,
    zIndex: 2,
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.58rem',
    color: 'rgba(255,255,255,0.64)',
    letterSpacing: '0.02em',
    textShadow: '0 1px 5px rgba(0,0,0,0.45)',
    pointerEvents: 'none',
  },
  heroImageNote: {
    position: 'absolute',
    left: 22,
    bottom: 22,
    maxWidth: 310,
    background: '#fff',
    color: CHARCOAL,
    padding: '14px 16px',
    borderRadius: 4,
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 800,
    fontSize: '0.9rem',
    boxShadow: '0 10px 26px rgba(0,0,0,0.14)',
  },
  quickBand: { background: '#F5F3EF', padding: '34px 0' },
  quickGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: 14,
  },
  quickItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    minHeight: 112,
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 700,
    fontSize: '0.82rem',
    color: CHARCOAL,
  },
  quickIcon: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  visionSection: { padding: '74px 0 54px' },
  visionPanel: {
    display: 'grid',
    gridTemplateColumns: '0.9fr 1.1fr',
    gap: 56,
    alignItems: 'stretch',
    marginTop: 28,
  },
  sectionTitle: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 750,
    fontSize: 'clamp(1.9rem, 3vw, 2.55rem)',
    lineHeight: 1.12,
    letterSpacing: '-0.015em',
    margin: 0,
  },
  visionBody: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 20,
    fontFamily: "'Inter', sans-serif",
    fontSize: '1rem',
    lineHeight: 1.8,
    color: '#555',
    maxWidth: 700,
  },
  visionImageWrap: {
    position: 'relative',
    width: '100%',
    minHeight: 320,
    overflow: 'hidden',
    borderRadius: 6,
    boxShadow: '0 2px 16px rgba(0,0,0,0.07)',
  },
  visionImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  missionSection: { padding: '54px 0 82px' },
  splitFeature: {
    display: 'grid',
    gridTemplateColumns: '1fr 0.9fr',
    gap: 46,
    alignItems: 'center',
    marginBottom: 46,
  },
  splitImageWrap: {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 6,
  },
  splitImage: {
    width: '100%',
    height: 350,
    objectFit: 'cover',
  },
  splitCopy: { display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 20 },
  bodyText: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '1rem',
    lineHeight: 1.8,
    color: '#555',
    margin: 0,
  },
  primaryButton: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '13px 26px',
    borderRadius: 4,
    background: NAVY,
    color: '#fff',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 800,
    fontSize: '0.88rem',
  },
  focusGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 20,
  },
  focusCard: {
    background: '#fff',
    border: '1px solid rgba(0,0,0,0.07)',
    borderRadius: 6,
    padding: '28px 26px',
    boxShadow: '0 2px 16px rgba(0,0,0,0.07)',
  },
  focusIcon: {
    width: 48,
    height: 48,
    borderRadius: 8,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  focusTitle: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 750,
    fontSize: '1.25rem',
    margin: '0 0 10px',
  },
  focusBody: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.95rem',
    lineHeight: 1.7,
    color: '#555',
    margin: 0,
  },
  purposeBand: {
    background: NAVY,
    color: '#fff',
    textAlign: 'center',
    padding: '82px 24px',
  },
  purposeIcon: { color: YELLOW, margin: '0 auto 20px' },
  purposeTitle: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 750,
    fontSize: 'clamp(1.9rem, 3vw, 2.55rem)',
    lineHeight: 1.12,
    letterSpacing: '-0.015em',
    maxWidth: 880,
    margin: '0 auto 18px',
  },
  purposeText: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '1rem',
    lineHeight: 1.8,
    color: 'rgba(255,255,255,0.82)',
    maxWidth: 820,
    margin: '0 auto',
  },
  foundersSection: { padding: '46px 0 84px', background: '#fff' },
  foundersHeader: { maxWidth: 760, marginBottom: 28 },
  founderGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 24,
  },
  founderCard: {
    display: 'grid',
    gridTemplateColumns: '64px 1fr',
    gap: 18,
    background: '#F7F8FA',
    border: '1px solid rgba(0,0,0,0.06)',
    borderRadius: 6,
    padding: 28,
  },
  founderAvatar: {
    width: 64,
    height: 64,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 800,
  },
  founderRole: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 700,
    fontSize: '0.72rem',
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    color: NAVY,
  },
  founderName: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 750,
    fontSize: '1.45rem',
    margin: '3px 0 12px',
  },
  founderBio: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.94rem',
    lineHeight: 1.75,
    color: '#555',
    margin: 0,
  },
  readingSection: { padding: '82px 0 92px', background: '#F5F3EF' },
  readingHeader: {
    display: 'block',
    maxWidth: 760,
    marginBottom: 30,
  },
  readingIntro: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '1rem',
    lineHeight: 1.75,
    color: '#555',
    margin: '14px 0 0',
  },
  carouselShell: {
    display: 'grid',
    gridTemplateColumns: '48px 1fr 48px',
    gap: 18,
    alignItems: 'stretch',
  },
  carouselButton: {
    border: '1px solid rgba(26,58,107,0.18)',
    borderRadius: 4,
    background: '#fff',
    color: NAVY,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  storyViewport: { minHeight: 270, overflow: 'hidden' },
  storyCard: {
    minHeight: 270,
    background: '#fff',
    borderRadius: 6,
    padding: 0,
    boxShadow: '0 2px 16px rgba(0,0,0,0.07)',
    border: '1px solid rgba(0,0,0,0.06)',
    overflow: 'hidden',
    display: 'grid',
    gridTemplateColumns: '0.42fr 0.58fr',
  },
  storyEmpty: {
    minHeight: 270,
    background: '#fff',
    borderRadius: 6,
    border: '1px solid rgba(0,0,0,0.06)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.95rem',
    color: '#666',
  },
  storyImageWrap: {
    position: 'relative',
    minHeight: 270,
    background: '#E9ECEF',
  },
  storyImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  storyContent: {
    padding: '34px 36px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  storyTitle: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 750,
    fontSize: 'clamp(1.25rem, 2vw, 1.7rem)',
    lineHeight: 1.2,
    margin: '0 0 22px',
  },
  storyLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 800,
    fontSize: '0.88rem',
    color: NAVY,
  },
  carouselFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 18,
    alignItems: 'center',
    marginTop: 18,
  },
  dots: { display: 'flex', gap: 8 },
  dot: {
    width: 9,
    height: 9,
    borderRadius: '50%',
    border: 0,
    cursor: 'pointer',
  },
}
