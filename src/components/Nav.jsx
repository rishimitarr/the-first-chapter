import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import DonateFloat from './DonateFloat'

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
  { label: 'About Us', href: '/about', route: true },
  { label: 'Care Kits', href: '/care-kits', route: true },
  { label: 'Join Us', href: '/#join' },
]

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const atTop = isHome && !scrolled

  const links = defaultLinks

  const resolveHref = (l) => {
    if (l.route) return l.href
    if (l.href.startsWith('/#') && location.pathname === '/') return l.href.slice(1)
    return l.href
  }

  const openDonate = () => window.dispatchEvent(new CustomEvent('open-donate-modal'))

  return (
    <>
    <motion.nav
      style={{
        ...styles.nav,
        background: atTop ? 'transparent' : '#fff',
        boxShadow: atTop ? 'none' : '0 2px 20px rgba(0,0,0,0.07)',
      }}
      className={atTop ? 'nav-overlay' : undefined}
      variants={navVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Rainbow bar */}
      <div style={{ ...styles.rainbow, background: atTop ? 'transparent' : styles.rainbow.background }} />

      <div style={styles.inner} className="nav-inner-height">
        {/* Logo */}
        <Link to="/" style={styles.logoWrap} aria-label="The First Chapter home">
          <img
            src="/New First Chapter Logo.png"
            alt="The First Chapter"
            style={{
              ...styles.logoImg,
              mixBlendMode: atTop ? 'normal' : 'multiply',
              ...(atTop ? { filter: 'brightness(0) invert(1)' } : {}),
            }}
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
                  <Link
                    to={href}
                    className="nav-link-item"
                    style={{ ...styles.navLink, ...navLinkStyle(atTop) }}
                  >
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
                style={{ ...styles.navLink, ...navLinkStyle(atTop) }}
                variants={linkVariants}
                whileHover={{ y: -2 }}
              >
                {l.label}
              </motion.a>
            )
          })}
          <motion.div variants={linkVariants} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <button
              onClick={openDonate}
              style={{
                ...styles.ctaBtn,
                background: atTop ? 'rgba(255,255,255,0.94)' : '#1A3A6B',
                color: atTop ? '#1A3A6B' : '#fff',
              }}
            >
              Donate Today
            </button>
          </motion.div>
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
              background: atTop ? '#fff' : '#1A3A6B',
              ...(menuOpen ? { transform: 'translateY(7px) rotate(45deg)' } : {}),
            }}
          />
          <span
            style={{
              ...styles.bar,
              background: atTop ? '#fff' : '#1A3A6B',
              ...(menuOpen ? { opacity: 0 } : {}),
            }}
          />
          <span
            style={{
              ...styles.bar,
              background: atTop ? '#fff' : '#1A3A6B',
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
            <button
              onClick={() => { setMenuOpen(false); openDonate() }}
              style={styles.mobileCta}
            >
              Donate Today
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
    <DonateFloat variant="kit" />
    </>
  )
}

function navLinkStyle(atTop) {
  return {
    color: atTop ? '#fff' : '#1A1A1A',
    ...(atTop ? { textShadow: '0 1px 14px rgba(0,0,0,0.5)' } : {}),
  }
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
      'linear-gradient(to right, #F07000 0% 14.285%, #003078 14.285% 28.57%, #0090B8 28.57% 42.855%, #58A018 42.855% 57.14%, #E81858 57.14% 71.425%, #682090 71.425% 85.71%, #FFB000 85.71% 100%)',
  },
  inner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: 1160,
    margin: '0 auto',
    padding: '0 24px',
    height: 150,
  },
  logoWrap: {
    display: 'flex',
    alignItems: 'center',
    flexShrink: 0,
  },
  logoImg: {
    height: 160,
    width: 'auto',
    objectFit: 'contain',
    mixBlendMode: 'multiply',
  },
  linksWrap: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  navLink: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 700,
    fontSize: '1.25rem',
    color: '#1A1A1A',
    padding: '10px 18px',
    borderRadius: 8,
    cursor: 'pointer',
    transition: 'color 0.2s',
  },
  ctaBtn: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 700,
    fontSize: '0.9rem',
    color: '#fff',
    background: '#1A3A6B',
    padding: '10px 22px',
    borderRadius: 4,
    marginLeft: 8,
    cursor: 'pointer',
    display: 'inline-block',
    letterSpacing: '0.01em',
    border: 'none',
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
    fontFamily: "'Inter', sans-serif",
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
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 700,
    fontSize: '0.95rem',
    color: '#fff',
    background: '#1A3A6B',
    padding: '12px 24px',
    borderRadius: 4,
    textAlign: 'center',
  },
}
