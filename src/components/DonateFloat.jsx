import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Heart, Loader2, ChevronLeft, Bell } from 'lucide-react'
import { Link } from 'react-router-dom'
import { loadStripe } from '@stripe/stripe-js'

const STRIPE_PUBLISHABLE_KEY =
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY ||
  import.meta.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

const MIN_DONATION = 2

const IMG_LEFT_CARD = '/donation%20left%20card%20image.jpg'
const IMG_WINDOW = '/donation%20window%20image.avif'
const IMG_LOGO = '/New%20First%20Chapter%20Logo.png'

let stripePromise
function getStripe() {
  if (!STRIPE_PUBLISHABLE_KEY) return null
  if (!stripePromise) stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY)
  return stripePromise
}

function ModalEmbeddedCheckout({ amountCents }) {
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('')

  useEffect(() => {
    let checkout
    let cancelled = false

    const mountCheckout = async () => {
      setStatus('loading')
      setMessage('')

      try {
        if (!STRIPE_PUBLISHABLE_KEY) {
          throw new Error(
            'Stripe publishable key is missing. Add VITE_STRIPE_PUBLISHABLE_KEY to your environment.',
          )
        }

        const stripe = await getStripe()
        if (!stripe) throw new Error('Stripe.js did not load.')

        const fetchClientSecret = async () => {
          const response = await fetch('/api/create-checkout-session', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amountCents }),
          })
          const data = await response.json()
          if (!response.ok)
            throw new Error(data.error || 'Unable to start donation.')
          return data.clientSecret
        }

        if (cancelled) return

        if (typeof stripe.createEmbeddedCheckoutPage === 'function') {
          checkout = await stripe.createEmbeddedCheckoutPage({
            fetchClientSecret,
          })
        } else {
          checkout = await stripe.initEmbeddedCheckout({
            clientSecret: await fetchClientSecret(),
          })
        }

        checkout.mount('#modal-embedded-checkout')
        setStatus('ready')
      } catch (error) {
        if (!cancelled) {
          setStatus('error')
          setMessage(error.message || 'Unable to start donation.')
        }
      }
    }

    mountCheckout()

    return () => {
      cancelled = true
      checkout?.destroy()
    }
  }, [amountCents])

  return (
    <div style={s.checkoutShell}>
      {status === 'loading' && (
        <div style={s.checkoutLoading}>
          <Loader2 size={20} style={s.spinIcon} />
          <span>Preparing secure donation form</span>
        </div>
      )}
      {status === 'error' && (
        <div style={s.errorBox}>
          <strong>Donation form could not load.</strong>
          <span>{message}</span>
        </div>
      )}
      <div id="modal-embedded-checkout" style={s.embeddedCheckout} />
    </div>
  )
}

export default function DonateFloat({
  label = 'Donate',
  to,
  href,
  background = '#1A3A6B',
  shadow = '0 6px 24px rgba(26,58,107,0.30)',
  variant = 'button',
}) {
  if (variant !== 'kit') {
    return <DonateFloatButton label={label} to={to} href={href} background={background} shadow={shadow} />
  }

  return <DonateFloatWidget />
}

function DonateFloatButton({ label, to, href, background, shadow }) {
  const [visible, setVisible] = useState(true)
  const wrapStyle = { ...s.wrap, background, boxShadow: shadow }

  const action = to ? (
    <Link to={to} style={s.donate}>{label}</Link>
  ) : href ? (
    <a href={href} style={s.donate}>{label}</a>
  ) : (
    <button type="button" style={s.donate}>{label}</button>
  )

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          style={wrapStyle}
          initial={{ opacity: 0, y: 24, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        >
          {action}
          <button style={s.close} onClick={() => setVisible(false)} aria-label="Dismiss">
            <X size={13} strokeWidth={2.5} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function DonateFloatWidget() {
  const [view, setView] = useState('card')
  const [amount, setAmount] = useState('')
  const [checkoutAmount, setCheckoutAmount] = useState(null)
  const [nextTimeEmail, setNextTimeEmail] = useState('')
  const [nextTimeLoading, setNextTimeLoading] = useState(false)
  const [nextTimeSubmitted, setNextTimeSubmitted] = useState(false)
  const [nextTimeError, setNextTimeError] = useState('')

  const numericAmount = useMemo(() => {
    const parsed = parseFloat(amount)
    return isNaN(parsed) ? 0 : parsed
  }, [amount])

  const isValid = numericAmount >= MIN_DONATION
  const kitCount = Math.floor(numericAmount / 6)

  const handleAmountChange = (e) => {
    const value = e.target.value
    if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
      setAmount(value)
    }
  }

  const openModal = () => {
    setAmount('')
    setCheckoutAmount(null)
    setView('modal')
  }

  const closeModal = () => setView('nexttime')
  const closeNextTime = () => setView('pill')

  useEffect(() => {
    if (!isValid) return undefined
    const timer = window.setTimeout(() => setCheckoutAmount(numericAmount), 450)
    return () => window.clearTimeout(timer)
  }, [numericAmount, isValid])

  useEffect(() => {
    if (view === 'modal' || view === 'nexttime') {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [view])

  const handleNextTimeSubmit = async (e) => {
    e.preventDefault()
    if (!nextTimeEmail) return
    setNextTimeLoading(true)
    setNextTimeError('')
    try {
      const res = await fetch('/api/newsletter-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName: 'Supporter', lastName: '', email: nextTimeEmail }),
      })
      const data = await res.json()
      if (!res.ok) {
        setNextTimeError(data.error || 'Something went wrong. Please try again.')
        return
      }
      setNextTimeSubmitted(true)
    } catch {
      setNextTimeError('Network error. Please check your connection and try again.')
    } finally {
      setNextTimeLoading(false)
    }
  }

  useEffect(() => {
    if (view !== 'modal') return
    const onKey = (e) => { if (e.key === 'Escape') closeModal() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [view])

  useEffect(() => {
    const onOpen = () => openModal()
    window.addEventListener('open-donate-modal', onOpen)
    return () => window.removeEventListener('open-donate-modal', onOpen)
  }, [])

  return (
    <>
      {/* ── Floating Card ── */}
      <AnimatePresence mode="wait">
        {view === 'card' && (
          <motion.div
            key="donate-card"
            style={s.card}
            initial={{ opacity: 0, y: 24, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 280, damping: 24 }}
            onClick={openModal}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && openModal()}
          >
            <img src={IMG_WINDOW} alt="" style={s.cardBanner} draggable={false} />
            <div style={s.cardBody}>
              <div style={s.cardCopy}>
                <span style={s.cardTitle}>Donate Today</span>
                <span style={s.cardMessage}>
                  Fund a child's first chapter with school supplies.
                </span>
              </div>
              <span style={s.cardPrice}>
                <span style={s.cardPriceAmount}>$6</span>
                <span style={s.cardPriceText}>/ kit</span>
              </span>
            </div>
            <button
              style={s.cardClose}
              onClick={(e) => { e.stopPropagation(); setView('pill') }}
              aria-label="Close"
            >
              <X size={13} strokeWidth={2.5} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Pill Button ── */}
      <AnimatePresence mode="wait">
        {view === 'pill' && (
          <motion.button
            key="donate-pill"
            style={s.pill}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            onClick={openModal}
            aria-label="Open donation"
          >
            <Heart size={16} fill="currentColor" />
            <span>Donate</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Modal ── */}
      <AnimatePresence>
        {view === 'modal' && (
          <motion.div
            key="donate-modal-backdrop"
            className="donate-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeModal}
          >
            <motion.div
              className="donate-modal-grid"
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                style={s.modalClose}
                onClick={closeModal}
                aria-label="Close donation"
              >
                <X size={18} strokeWidth={2.5} />
              </button>

              {/* Left Card */}
              <div className="donate-modal-left">
                <img
                  src={IMG_LEFT_CARD}
                  alt="Educational care kit supplies"
                  style={s.leftImage}
                  draggable={false}
                />
                <div style={s.leftContent}>
                  <img
                    src={IMG_LOGO}
                    alt="The First Chapter"
                    style={s.leftLogo}
                  />
                  <h2 style={s.leftHeading}>
                    Help a Child Start Their First Chapter
                  </h2>
                  <p style={s.leftBody}>
                    Every $6 funds one educational care kit, packed by
                    volunteers and delivered to children in the Greater
                    Toronto Area. Your donation provides the school supplies
                    a child needs to begin their learning journey.
                  </p>
                </div>
              </div>

              {/* Right Card */}
              <div className="donate-modal-right">
                <h3 style={s.rightTitle}>Complete Your Donation</h3>

                <div style={s.amountBlock}>
                  <label style={s.amountLabel} htmlFor="modal-donation-amount">
                    Donation amount (CAD)
                  </label>
                  <div style={s.amountInputWrap}>
                    <span style={s.currencySymbol}>CA$</span>
                    <input
                      id="modal-donation-amount"
                      type="text"
                      inputMode="decimal"
                      autoComplete="off"
                      placeholder="0.00"
                      value={amount}
                      onChange={handleAmountChange}
                      style={s.amountInput}
                    />
                  </div>
                  {amount !== '' && !isValid && (
                    <span style={s.amountError}>
                      Minimum donation is CA${MIN_DONATION.toFixed(2)}
                    </span>
                  )}
                </div>

                {isValid && (
                  <div style={s.totalRow}>
                    <span style={s.totalAmount}>
                      CA${numericAmount.toFixed(2)}
                    </span>
                    <span style={s.totalKits}>
                      {kitCount} educational kit{kitCount !== 1 ? 's' : ''}
                    </span>
                  </div>
                )}

                <div style={s.divider} />

                {isValid && checkoutAmount !== null ? (
                  <ModalEmbeddedCheckout
                    amountCents={Math.round(checkoutAmount * 100)}
                  />
                ) : (
                  <div style={s.checkoutPlaceholder}>
                    Enter CA${MIN_DONATION.toFixed(2)} or more to continue.
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Maybe Next Time? ── */}
      <AnimatePresence>
        {view === 'nexttime' && (
          <motion.div
            key="donate-modal-backdrop"
            className="donate-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeNextTime}
          >
            <motion.div
              className="donate-modal-grid"
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Left Card (same as donation modal) */}
              <div className="donate-modal-left">
                <img
                  src={IMG_LEFT_CARD}
                  alt="Educational care kit supplies"
                  style={s.leftImage}
                  draggable={false}
                />
                <div style={s.leftContent}>
                  <img
                    src={IMG_LOGO}
                    alt="The First Chapter"
                    style={s.leftLogo}
                  />
                  <h2 style={s.leftHeading}>
                    Help a Child Start Their First Chapter
                  </h2>
                  <p style={s.leftBody}>
                    Every $6 funds one educational care kit, packed by
                    volunteers and delivered to children in the Greater
                    Toronto Area. Your donation provides the school supplies
                    a child needs to begin their learning journey.
                  </p>
                </div>
              </div>

              {/* Right Card - Maybe Next Time */}
              <div className="donate-modal-right" style={s.nextTimeRight}>
                <button
                  style={s.nextTimeBack}
                  onClick={closeNextTime}
                  aria-label="Go back"
                >
                  <ChevronLeft size={20} strokeWidth={2.5} />
                </button>

                <h3 style={s.nextTimeTitle}>Maybe next time?</h3>

                {nextTimeSubmitted ? (
                  <div style={s.nextTimeSuccess}>
                    <div style={s.nextTimeSuccessIcon}>&#10003;</div>
                    <h4 style={s.nextTimeSuccessHeading}>You're on the list!</h4>
                    <p style={s.nextTimeSuccessText}>
                      We'll keep you updated on our mission and upcoming events.
                    </p>
                  </div>
                ) : (
                  <>
                    <div style={s.nextTimeIconWrap}>
                      <Bell size={32} color="#FBB040" strokeWidth={2} />
                    </div>
                    <p style={s.nextTimeBody}>
                      Please leave your email address below, and we'll send you a gentle reminder later.
                    </p>

                    <form onSubmit={handleNextTimeSubmit} style={s.nextTimeForm}>
                      <input
                        type="email"
                        placeholder="Email address"
                        value={nextTimeEmail}
                        onChange={(e) => { setNextTimeEmail(e.target.value); setNextTimeError('') }}
                        style={s.nextTimeInput}
                        required
                      />
                      {nextTimeError && (
                        <span style={s.nextTimeError}>{nextTimeError}</span>
                      )}
                      <button
                        type="submit"
                        disabled={nextTimeLoading || !nextTimeEmail}
                        style={s.nextTimeSubmit}
                      >
                        {nextTimeLoading ? (
                          <Loader2 size={18} style={{ animation: 'stripeSpin 0.85s linear infinite' }} />
                        ) : (
                          'Remind me later'
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={closeNextTime}
                        style={s.nextTimeDismiss}
                      >
                        No thanks
                      </button>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

const s = {
  /* ── Button variant (backward compat) ── */
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

  /* ── Floating Card ── */
  card: {
    position: 'fixed',
    right: 24,
    bottom: 24,
    zIndex: 999,
    width: 'min(340px, calc(100vw - 32px))',
    background: '#FFFFFF',
    border: 'none',
    borderRadius: 12,
    boxShadow: '0 20px 50px rgba(26,58,107,0.18)',
    overflow: 'hidden',
    cursor: 'pointer',
  },
  cardBanner: {
    width: '100%',
    height: 140,
    objectFit: 'cover',
    display: 'block',
  },
  cardBody: {
    padding: '14px 44px 14px 18px',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: 12,
  },
  cardCopy: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    minWidth: 0,
  },
  cardTitle: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 900,
    fontSize: '1.3rem',
    lineHeight: 1,
    letterSpacing: '-0.03em',
    color: '#1A1A1A',
  },
  cardMessage: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 500,
    fontSize: '0.78rem',
    lineHeight: 1.35,
    color: 'rgba(26,26,26,0.62)',
  },
  cardPrice: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: 1,
    color: '#1A3A6B',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    whiteSpace: 'nowrap',
    flexShrink: 0,
  },
  cardPriceAmount: {
    fontWeight: 900,
    fontSize: '1.8rem',
    lineHeight: 1,
  },
  cardPriceText: {
    fontWeight: 800,
    fontSize: '0.65rem',
    lineHeight: 1,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  cardClose: {
    position: 'absolute',
    top: 10,
    right: 10,
    background: '#FFFFFF',
    border: '1px solid rgba(26,58,107,0.18)',
    borderRadius: 6,
    width: 30,
    height: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: '#1A3A6B',
    padding: 0,
    boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
    transition: 'background 0.2s',
  },

  /* ── Pill Button ── */
  pill: {
    position: 'fixed',
    bottom: 28,
    right: 28,
    zIndex: 999,
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    background: '#1A3A6B',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: 999,
    padding: '12px 24px',
    cursor: 'pointer',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 700,
    fontSize: '0.92rem',
    boxShadow: '0 8px 28px rgba(26,58,107,0.38)',
    letterSpacing: '0.01em',
    transition: 'box-shadow 0.2s, transform 0.2s',
  },

  /* ── Modal Close ── */
  modalClose: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 10,
    background: 'rgba(26,58,107,0.08)',
    border: 'none',
    borderRadius: 8,
    width: 32,
    height: 32,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: '#1A3A6B',
    padding: 0,
    transition: 'background 0.2s',
  },

  /* ── Left Card ── */
  leftImage: {
    width: '100%',
    height: 200,
    objectFit: 'cover',
    display: 'block',
  },
  leftContent: {
    padding: '28px 32px',
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  leftLogo: {
    width: 72,
    height: 'auto',
  },
  leftHeading: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 850,
    fontSize: '1.6rem',
    lineHeight: 1.1,
    letterSpacing: '-0.04em',
    color: '#1A1A1A',
    margin: 0,
  },
  leftBody: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.92rem',
    lineHeight: 1.7,
    color: '#4B5563',
    margin: 0,
  },
  leftPills: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 4,
  },
  leftPill: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '6px 12px',
    borderRadius: 4,
    border: '1px solid rgba(26,58,107,0.12)',
    background: '#FFFFFF',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: '0.72rem',
    fontWeight: 700,
    color: '#1A3A6B',
  },

  /* ── Right Card ── */
  rightTitle: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 850,
    fontSize: 'clamp(1.3rem, 2vw, 1.65rem)',
    lineHeight: 1.1,
    letterSpacing: '-0.035em',
    color: '#1A1A1A',
    margin: '0 0 20px',
  },
  amountBlock: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
  },
  amountLabel: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 800,
    fontSize: '0.88rem',
    color: '#1A1A1A',
  },
  amountInputWrap: {
    display: 'flex',
    alignItems: 'center',
    border: '1.5px solid rgba(26,58,107,0.16)',
    borderRadius: 8,
    overflow: 'hidden',
    background: '#F8FAFC',
    transition: 'border-color 0.2s',
  },
  currencySymbol: {
    paddingLeft: 14,
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 750,
    fontSize: '1rem',
    color: '#64748B',
    userSelect: 'none',
  },
  amountInput: {
    flex: 1,
    border: 'none',
    outline: 'none',
    background: 'transparent',
    padding: '12px 14px 12px 6px',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 850,
    fontSize: '1.1rem',
    color: '#1A1A1A',
    minWidth: 0,
  },
  amountError: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.8rem',
    fontWeight: 600,
    color: '#DC2626',
  },
  totalRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    padding: '14px 0',
    marginTop: 4,
  },
  totalAmount: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 850,
    fontSize: '1.15rem',
    color: '#1A3A6B',
  },
  totalKits: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 600,
    fontSize: '0.85rem',
    color: '#64748B',
  },
  divider: {
    height: 1,
    background: 'rgba(26,58,107,0.08)',
    margin: '4px 0 16px',
  },

  /* ── Checkout ── */
  checkoutShell: {
    position: 'relative',
    minHeight: 320,
  },
  checkoutLoading: {
    minHeight: 200,
    display: 'grid',
    placeItems: 'center',
    gap: 10,
    color: '#64748B',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 700,
    fontSize: '0.88rem',
  },
  spinIcon: {
    animation: 'stripeSpin 0.85s linear infinite',
  },
  errorBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
    padding: 16,
    borderRadius: 8,
    background: 'rgba(238,48,147,0.08)',
    color: '#9F1239',
    fontFamily: "'Inter', sans-serif",
    lineHeight: 1.5,
    fontSize: '0.88rem',
  },
  embeddedCheckout: {
    width: '100%',
  },
  checkoutPlaceholder: {
    minHeight: 200,
    display: 'grid',
    placeItems: 'center',
    color: '#64748B',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 700,
    fontSize: '0.88rem',
  },

  /* ── Maybe Next Time ── */
  nextTimeRight: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: '48px 32px',
  },
  nextTimeBack: {
    position: 'absolute',
    top: 12,
    left: 12,
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#1A1A1A',
    padding: 4,
    borderRadius: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'opacity 0.2s',
  },
  nextTimeTitle: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 850,
    fontSize: 'clamp(1.4rem, 2.2vw, 1.75rem)',
    lineHeight: 1.1,
    letterSpacing: '-0.035em',
    color: '#1A1A1A',
    margin: '0 0 24px',
  },
  nextTimeIconWrap: {
    width: 64,
    height: 64,
    borderRadius: 16,
    background: 'rgba(251,176,64,0.15)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  nextTimeBody: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.95rem',
    lineHeight: 1.6,
    color: '#555',
    margin: '0 0 28px',
    maxWidth: 320,
  },
  nextTimeForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    width: '100%',
    maxWidth: 320,
  },
  nextTimeInput: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.95rem',
    padding: '14px 16px',
    border: '1.5px solid #dde4ed',
    borderRadius: 8,
    outline: 'none',
    background: '#F8FAFC',
    color: '#1A1A1A',
    transition: 'border-color 0.2s, background 0.2s',
    width: '100%',
    boxSizing: 'border-box',
  },
  nextTimeError: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.8rem',
    fontWeight: 600,
    color: '#DC2626',
  },
  nextTimeSubmit: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 700,
    fontSize: '0.95rem',
    padding: '14px 24px',
    borderRadius: 8,
    border: 'none',
    background: '#57A018',
    color: '#FFFFFF',
    cursor: 'pointer',
    transition: 'background 0.2s, transform 0.1s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  nextTimeDismiss: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 700,
    fontSize: '0.95rem',
    padding: '14px 24px',
    borderRadius: 8,
    border: '1.5px solid #dde4ed',
    background: 'transparent',
    color: '#1A1A1A',
    cursor: 'pointer',
    transition: 'background 0.2s',
  },
  nextTimeSuccess: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 12,
    padding: '20px 0',
  },
  nextTimeSuccessIcon: {
    width: 56,
    height: 56,
    borderRadius: 12,
    background: 'rgba(87,160,24,0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.8rem',
    color: '#57A018',
  },
  nextTimeSuccessHeading: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 800,
    fontSize: '1.3rem',
    color: '#1A1A1A',
    margin: 0,
  },
  nextTimeSuccessText: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.9rem',
    color: '#555',
    margin: 0,
    textAlign: 'center',
  },
}
