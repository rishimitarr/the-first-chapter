import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function DonateFloat({
  label = 'Donate',
  to,
  href,
  background = '#1A3A6B',
  shadow = '0 6px 24px rgba(26,58,107,0.30)',
  variant = 'button',
}) {
  const [visible, setVisible] = useState(true)
  const wrapStyle = { ...styles.wrap, background, boxShadow: shadow }
  const kitHref = to || href || '/donate'
  const KitLink = to ? Link : 'a'
  const kitLinkProps = to ? { to: kitHref } : { href: kitHref }
  const action =
    to ? (
      <Link to={to} style={styles.donate}>{label}</Link>
    ) : href ? (
      <a href={href} style={styles.donate}>{label}</a>
    ) : (
      <button type="button" style={styles.donate}>{label}</button>
    )

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          style={variant === 'kit' ? styles.kitWrap : wrapStyle}
          initial={{ opacity: 0, y: 24, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        >
          {variant === 'kit' ? (
            <KitLink {...kitLinkProps} style={styles.kitLink}>
              <span style={styles.kitCopy}>
                <span style={styles.kitTitle}>Donate Today</span>
                <span style={styles.kitMessage}>Donate to start a first chapter today.</span>
                <span style={styles.kitLabel}>Educational Kit</span>
              </span>
              <span style={styles.kitPrice}>
                <span style={styles.kitPriceAmount}>$6</span>
                <span style={styles.kitPriceText}>/ kit</span>
              </span>
            </KitLink>
          ) : (
            action
          )}
          <button style={variant === 'kit' ? styles.kitClose : styles.close} onClick={() => setVisible(false)} aria-label="Dismiss">
            <X size={13} strokeWidth={2.5} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

const styles = {
  wrap: {
    position: 'fixed',
    bottom: 28,
    right: 28,
    zIndex: 999,
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    borderRadius: 4,
    padding: '10px 18px 10px 20px',
  },
  kitWrap: {
    position: 'fixed',
    right: 24,
    bottom: 24,
    zIndex: 999,
    width: 'min(340px, calc(100vw - 32px))',
    background: '#1A3A6B',
    border: '1px solid rgba(255,255,255,0.14)',
    borderRadius: 8,
    boxShadow: '0 18px 44px rgba(26,58,107,0.34)',
    display: 'flex',
    alignItems: 'stretch',
    overflow: 'hidden',
  },
  kitLink: {
    flex: 1,
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    gap: 16,
    alignItems: 'end',
    padding: '18px 44px 18px 18px',
    textDecoration: 'none',
    color: '#FFFFFF',
  },
  kitCopy: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    minWidth: 0,
  },
  kitTitle: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 900,
    fontSize: '1.35rem',
    lineHeight: 1,
    letterSpacing: '-0.03em',
    color: '#FFFFFF',
  },
  kitLabel: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 800,
    fontSize: '0.72rem',
    lineHeight: 1.15,
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.62)',
  },
  kitMessage: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 500,
    fontSize: '0.8rem',
    lineHeight: 1.35,
    color: 'rgba(255,255,255,0.82)',
  },
  kitPrice: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: 1,
    color: '#FFFFFF',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    whiteSpace: 'nowrap',
  },
  kitPriceAmount: {
    fontWeight: 900,
    fontSize: '1.35rem',
    lineHeight: 1,
  },
  kitPriceText: {
    fontWeight: 800,
    fontSize: '0.68rem',
    lineHeight: 1,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  kitClose: {
    position: 'absolute',
    top: 9,
    right: 9,
    background: 'rgba(255,255,255,0.14)',
    border: 'none',
    borderRadius: 4,
    width: 22,
    height: 22,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: '#FFFFFF',
    padding: 0,
  },
  donate: {
    background: 'none',
    border: 'none',
    color: '#fff',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 700,
    fontSize: '0.9rem',
    cursor: 'pointer',
    padding: 0,
    letterSpacing: '0.01em',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
  },
  close: {
    background: 'rgba(255,255,255,0.18)',
    border: 'none',
    borderRadius: 3,
    width: 20,
    height: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: '#fff',
    padding: 0,
    flexShrink: 0,
  },
}
