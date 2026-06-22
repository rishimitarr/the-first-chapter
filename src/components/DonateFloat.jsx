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
}) {
  const [visible, setVisible] = useState(true)
  const wrapStyle = { ...styles.wrap, background, boxShadow: shadow }
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
          style={wrapStyle}
          initial={{ opacity: 0, y: 24, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        >
          {action}
          <button style={styles.close} onClick={() => setVisible(false)} aria-label="Dismiss">
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
