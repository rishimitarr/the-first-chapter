import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

export default function DonationKitCard({ kit }) {
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
        {!kit.comingSoon && (
          <motion.div
            initial={{ scale: 0.88 }}
            variants={{ hover: { scale: 1 } }}
            transition={{ duration: 0.9, ease: [0.55, 0, 0.1, 1] }}
            style={styles.donatePriceWrap}
          >
            <span style={styles.donatePrice}>$6</span>
            <span style={styles.donateMeta}>CAD / kit</span>
          </motion.div>
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

const styles = {
  donateCard: {
    borderRadius: 8,
    padding: '26px 20px 22px',
    position: 'relative',
    overflow: 'hidden',
    minHeight: 520,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  donateCardContent: {
    zIndex: 2,
  },
  donateKitLabel: {
    display: 'inline-block',
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.82rem',
    fontWeight: 700,
    color: 'rgba(255,255,255,0.92)',
    background: 'rgba(255,255,255,0.12)',
    padding: '8px 12px',
    borderRadius: 999,
    marginBottom: 12,
    lineHeight: 1,
  },
  donateAmountMuted: {
    display: 'inline-block',
    color: 'rgba(255,255,255,0.9)',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 700,
  },
  donatePriceWrap: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    marginTop: 6,
  },
  donatePrice: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 900,
    fontSize: '3.4rem',
    lineHeight: 1,
    color: 'rgba(255,255,255,0.98)',
    letterSpacing: '-0.06em',
    display: 'inline-block',
  },
  donateMeta: {
    fontSize: '0.88rem',
    background: '#FFFFFF',
    color: '#0A0A0A',
    padding: '6px 10px',
    borderRadius: 999,
    display: 'inline-flex',
    alignItems: 'center',
    fontWeight: 800,
    textTransform: 'uppercase',
  },
  donateCopy: {
    color: 'rgba(255,255,255,0.92)',
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.98rem',
    lineHeight: 1.7,
    marginTop: 12,
    maxWidth: 320,
  },
  donateList: { listStyle: 'none', padding: 0, marginTop: 14, display: 'grid', gap: 8 },
  donateItem: {
    display: 'flex',
    gap: 10,
    alignItems: 'flex-start',
    color: 'rgba(255,255,255,0.95)',
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.92rem',
  },
  donateDisabled: {
    display: 'inline-block',
    width: '100%',
    textAlign: 'center',
    padding: '14px 18px',
    borderRadius: 6,
    border: '1px solid rgba(255,255,255,0.22)',
    color: 'rgba(255,255,255,0.92)',
    background: 'transparent',
    fontWeight: 700,
  },
  donateCta: {
    display: 'inline-block',
    width: '100%',
    textAlign: 'center',
    padding: '14px 18px',
    borderRadius: 6,
    color: '#0a0a0a',
    background: 'rgba(255,255,255,0.95)',
    textDecoration: 'none',
    fontWeight: 800,
  },
  donateBg: {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    zIndex: 1,
    opacity: 0.98,
  },
}
