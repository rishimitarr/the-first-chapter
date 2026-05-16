import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'

const navVariants = {
  hidden: { y: -140, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 100, damping: 20 },
  },
}

const linkContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.45 },
  },
}

const linkVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 120, damping: 18 },
  },
}

const defaultLinks = [
  { label: 'Our Mission', href: '/#mission' },
  { label: 'About Us', href: '/#about' },
  { label: 'Care Kits', href: '/care-kits', route: true },
  { label: 'Join Us', href: '/#join' },
]

// On the /care-kits route the nav swaps to in-page anchors that mirror
// the page's own sections.
const careKitsLinks = [
  { label: 'The Kit', href: '#the-kit' },
  { label: "What's Inside", href: '#whats-inside' },
  { label: "Who It's For", href: '#recipients' },
  { label: 'How It Works', href: '#create-a-kit' },
]

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  const onCareKits = location.pathname.startsWith('/care-kits')
  const links = onCareKits ? careKitsLinks : defaultLinks

  const resolveHref = (l) => {
    if (l.route) return l.href
    if (l.href.startsWith('/#') && location.pathname === '/') return l.href.slice(1)
    return l.href
  }

  const ctaHref = onCareKits ? '#sponsor' : (location.pathname === '/' ? '#join' : '/#join')
  const ctaLabel = onCareKits ? 'Sponsor a Kit' : 'Get Involved'

  return (
    <motion.nav
      style={styles.nav}
      variants={navVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Rainbow bar */}
      <div style={styles.rainbow} />

      <div style={styles.inner} className="nav-inner-height">
        {/* Logo */}
        <Link to="/" style={styles.logoWrap} aria-label="The First Chapter home">
          <img
            src="/New First Chapter Logo.png"
            alt="The First Chapter"
            style={styles.logoImg}
            className="nav-logo-img"
          />
        </Link>

        {/* Desktop links */}
        <motion.div
          className="nav-links-desktop"
          style={styles.linksWrap}
          variants={linkContainerVariants}
          initial="hidden"
          animate="visible"
        >
          {links.map((l) => {
            const href = resolveHref(l)
            if (l.route) {
              return (
                <motion.div key={l.href} variants={linkVariants} whileHover={{ y: -2 }}>
                  <Link to={href} className="nav-link-item" style={styles.navLink}>
                    {l.label}
                  </Link>
                </motion.div>
              )
            }
            return (
              <motion.a
                key={l.href}
                href={href}
                className="nav-link-item"
                style={styles.navLink}
                variants={linkVariants}
                whileHover={{ y: -2 }}
              >
                {l.label}
              </motion.a>
            )
          })}
          <motion.a
            href={ctaHref}
            style={styles.ctaBtn}
            variants={linkVariants}
            whileHover={{ scale: 1.04, boxShadow: '0 8px 24px rgba(107,45,139,0.45)' }}
            whileTap={{ scale: 0.97 }}
          >
            {ctaLabel}
          </motion.a>
          {onCareKits && (
            <motion.a
              href="/"
              style={styles.homeBtn}
              variants={linkVariants}
              whileHover={{ scale: 1.04, boxShadow: '0 8px 24px rgba(247,148,29,0.45)' }}
              whileTap={{ scale: 0.97 }}
            >
              Home
            </motion.a>
          )}
        </motion.div>

        {/* Hamburger */}
        <button
          className="nav-hamburger"
          style={styles.hamburger}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span
            style={{
              ...styles.bar,
              ...(menuOpen ? { transform: 'translateY(7px) rotate(45deg)' } : {}),
            }}
          />
          <span
            style={{
              ...styles.bar,
              ...(menuOpen ? { opacity: 0 } : {}),
            }}
          />
          <span
            style={{
              ...styles.bar,
              ...(menuOpen ? { transform: 'translateY(-7px) rotate(-45deg)' } : {}),
            }}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            style={styles.mobileMenu}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 120, damping: 22 }}
          >
            {links.map((l) => {
              const href = resolveHref(l)
              if (l.route) {
                return (
                  <Link
                    key={l.href}
                    to={href}
                    style={styles.mobileLink}
                    onClick={() => setMenuOpen(false)}
                  >
                    {l.label}
                  </Link>
                )
              }
              return (
                <a
                  key={l.href}
                  href={href}
                  style={styles.mobileLink}
                  onClick={() => setMenuOpen(false)}
                >
                  {l.label}
                </a>
              )
            })}
            <a
              href={ctaHref}
              style={styles.mobileCta}
              onClick={() => setMenuOpen(false)}
            >
              {ctaLabel}
            </a>
            {onCareKits && (
              <a
                href="/"
                style={styles.mobileHome}
                onClick={() => setMenuOpen(false)}
              >
                Home
              </a>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

const styles = {
  nav: {
    position: 'sticky',
    top: 0,
    zIndex: 100,
    background: '#fff',
    boxShadow: '0 2px 20px rgba(0,0,0,0.07)',
  },
  rainbow: {
    height: 6,
    background:
      'linear-gradient(to right, #6B2D8B 0% 16.6%, #0099D6 16.6% 33.2%, #39B54A 33.2% 49.8%, #F7941D 49.8% 66.4%, #EE3093 66.4% 83%, #FBB040 83% 100%)',
  },
  inner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: 1160,
    margin: '0 auto',
    padding: '0 24px',
    height: 114,
  },
  logoWrap: {
    display: 'flex',
    alignItems: 'center',
    flexShrink: 0,
  },
  logoImg: {
    height: 100,
    width: 'auto',
    objectFit: 'contain',
    mixBlendMode: 'multiply',
  },
  linksWrap: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
  },
  navLink: {
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 500,
    fontSize: '0.9rem',
    color: '#1A1A1A',
    padding: '8px 14px',
    borderRadius: 8,
    cursor: 'pointer',
    transition: 'color 0.2s',
  },
  ctaBtn: {
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 700,
    fontSize: '0.9rem',
    color: '#fff',
    background: '#6B2D8B',
    padding: '10px 22px',
    borderRadius: 100,
    marginLeft: 8,
    cursor: 'pointer',
    display: 'inline-block',
  },
  hamburger: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 8,
  },
  bar: {
    display: 'block',
    width: 24,
    height: 2,
    background: '#1A3A6B',
    borderRadius: 2,
    transition: 'transform 0.25s, opacity 0.25s',
  },
  mobileMenu: {
    display: 'flex',
    flexDirection: 'column',
    padding: '12px 24px 20px',
    background: '#fff',
    borderTop: '1px solid rgba(0,0,0,0.06)',
    overflow: 'hidden',
  },
  mobileLink: {
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 500,
    fontSize: '1rem',
    color: '#1A1A1A',
    padding: '12px 0',
    borderBottom: '1px solid rgba(0,0,0,0.06)',
    display: 'block',
  },
  mobileCta: {
    display: 'inline-block',
    marginTop: 16,
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 700,
    fontSize: '0.95rem',
    color: '#fff',
    background: '#6B2D8B',
    padding: '12px 24px',
    borderRadius: 100,
    textAlign: 'center',
  },
  homeBtn: {
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 700,
    fontSize: '0.9rem',
    color: '#fff',
    background: '#F7941D',
    padding: '10px 22px',
    borderRadius: 100,
    marginLeft: 8,
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    textDecoration: 'none',
  },
  mobileHome: {
    display: 'inline-block',
    marginTop: 10,
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 700,
    fontSize: '0.95rem',
    color: '#fff',
    background: '#F7941D',
    padding: '12px 24px',
    borderRadius: 100,
    textAlign: 'center',
  },
}
