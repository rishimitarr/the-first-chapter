import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'

const NAVY = '#1A3A6B'
const CHARCOAL = '#1A1A1A'

const sectionVariant = {
  hidden: { opacity: 0, y: 120, scale: 0.96, transition: { duration: 0.3, ease: 'easeIn' } },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] } },
}

const todayKey = () => new Date().toISOString().slice(0, 10)
const feedCacheKey = () => `tfc-home-reading-real-news-v2-${todayKey()}`
const isGenericNewsImage = (image = '') =>
  image.includes('lh3.googleusercontent.com/J6_coFbog') || image.includes('news.google.com')

const hasCleanArticleImages = (items = []) =>
  items.length > 0 && items.every((story) => story.image && !isGenericNewsImage(story.image))

const SAFE_TITLE_LENGTH = 78
const MAX_SUMMARY_WORDS = 10
const LOW_SIGNAL_TITLE_WORDS = new Set([
  'a',
  'an',
  'the',
  'of',
  'to',
  'into',
  'about',
  'after',
  'before',
  'during',
  'over',
  'under',
  'that',
])

const normalizeTitle = (title = '') =>
  title
    .replace(/\s+/g, ' ')
    .replace(/\s+-\s+[^-]+$/, '')
    .replace(/\s+\|\s+.+$/, '')
    .trim()

const compressTitlePhrases = (title) =>
  title
    .replace(/\bcelebrates a school year of turning cafeterias into hubs of\b/gi, 'Celebrates')
    .replace(/\bturning cafeterias into hubs of\b/gi, '')
    .replace(/\ba school year of\b/gi, '')
    .replace(/\blevels in Scotland as\b/gi, '')
    .replace(/\byouth violence and youth unemployment\b/gi, 'youth violence and unemployment')
    .replace(/\bnew report shows that\b/gi, '')
    .replace(/\bnew report shows\b/gi, '')
    .replace(/\bstudy finds that\b/gi, '')
    .replace(/\bstudy finds\b/gi, '')
    .replace(/\baccording to experts\b/gi, '')
    .replace(/\s+/g, ' ')
    .trim()

const summarizeByClause = (title) => {
  const clauses = title
    .split(/\s*(?::|;|\s+-\s+|\s+—\s+|\s+–\s+)\s*/)
    .map((part) => part.trim())
    .filter(Boolean)

  if (clauses.length < 2) return title

  const meaningful = clauses
    .filter((part) => !/^(opinion|analysis|watch|video|live updates)$/i.test(part))
    .sort((a, b) => Math.abs(SAFE_TITLE_LENGTH - a.length) - Math.abs(SAFE_TITLE_LENGTH - b.length))

  return meaningful[0] || title
}

const summarizeByWords = (title) => {
  const words = title.split(' ').filter(Boolean)
  if (words.length <= MAX_SUMMARY_WORDS) return title

  const compressedWords = words.filter((word, index) => {
    if (index === 0) return true
    return !LOW_SIGNAL_TITLE_WORDS.has(word.toLowerCase().replace(/[^a-z]/g, ''))
  })
  const sourceWords = compressedWords.length >= 6 ? compressedWords : words
  const firstWords = sourceWords.slice(0, MAX_SUMMARY_WORDS)
  const lastWord = words.at(-1)
  const includesLocation = /^(in|for|from|across|amid)$/i.test(words.at(-2) || '')

  if (includesLocation && !firstWords.includes(words.at(-2))) {
    return `${firstWords.slice(0, MAX_SUMMARY_WORDS - 2).join(' ')} ${words.at(-2)} ${lastWord}`
  }

  return firstWords.join(' ')
}

const summarizeTitle = (title = '') => {
  const clean = normalizeTitle(title)
  if (clean.length <= SAFE_TITLE_LENGTH) return clean

  const compressed = compressTitlePhrases(clean)
  if (compressed.length <= SAFE_TITLE_LENGTH) return compressed

  const clause = summarizeByClause(compressed)
  if (clause.length <= SAFE_TITLE_LENGTH) return clause

  return summarizeByWords(clause)
}

export default function ReadingList() {
  const [stories, setStories] = useState([])
  const [active, setActive] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    const cacheKey = feedCacheKey()
    const cached = localStorage.getItem(cacheKey)

    if (cached) {
      const parsed = JSON.parse(cached)
      if (hasCleanArticleImages(parsed)) {
        const frame = requestAnimationFrame(() => {
          if (cancelled) return
          setStories(parsed)
          setLoading(false)
        })
        return () => {
          cancelled = true
          cancelAnimationFrame(frame)
        }
      }
      localStorage.removeItem(cacheKey)
    }

    fetch('/api/reading-list')
      .then((res) => {
        if (!res.ok) throw new Error('Reading list failed')
        return res.json()
      })
      .then((data) => {
        if (cancelled) return
        const items = Array.isArray(data.stories) ? data.stories : []
        const cleanItems = items.filter((story) => story.image && !isGenericNewsImage(story.image))
        setStories(cleanItems)
        setLoading(false)
        if (cleanItems.length > 0) localStorage.setItem(cacheKey, JSON.stringify(cleanItems))
      })
      .catch(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (stories.length === 0) return undefined
    const id = setInterval(() => {
      setActive((current) => (current + 1) % stories.length)
    }, 6500)
    return () => clearInterval(id)
  }, [stories.length])

  const story = stories[active]
  const displayTitle = story ? summarizeTitle(story.title) : ''
  const go = (direction) => {
    if (stories.length === 0) return
    setActive((current) => (current + direction + stories.length) % stories.length)
  }

  return (
    <section id="reading" style={styles.section}>
      <div className="container">
        <motion.div
          variants={sectionVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: '-250px 0px -80px 0px' }}
        >
          <div style={styles.header} className="reading-header">
            <h2 style={styles.title}>Reading List</h2>
            <p style={styles.intro}>
              A rotating set of articles about children, education, health, and belonging.
              The goal is to keep this page connected to the real issues children are facing now.
            </p>
          </div>

          <div style={styles.carouselShell} className="reading-carousel-shell">
            <div style={styles.storyViewport} className="reading-story-viewport">
              {loading || !story ? (
                <div style={styles.storyEmpty}>
                  {loading ? 'Loading articles...' : 'Articles are unavailable right now.'}
                </div>
              ) : (
                <div style={styles.storyTrack} className="reading-story-track">
                  <AnimatePresence mode="wait">
                    <motion.article
                      key={`${story.title}-${active}`}
                      style={styles.storyCard}
                      className="reading-story-card"
                      initial={{ opacity: 0, x: 46, scale: 0.985 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: -46, scale: 0.985 }}
                      transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <img src={story.image} alt="" aria-hidden="true" style={styles.storyImage} />
                      <div style={styles.storyShade} />
                      <div style={styles.storyContent} className="reading-story-content">
                        <span style={styles.storyKicker}>Article spotlight</span>
                        <h3 style={styles.storyTitle} title={story.title}>{displayTitle}</h3>
                        <a href={story.link} target="_blank" rel="noreferrer" style={styles.storyLink}>
                          Read article <ExternalLink size={16} />
                        </a>
                      </div>
                    </motion.article>
                  </AnimatePresence>
                </div>
              )}
            </div>

            <div style={styles.carouselFooter}>
              <div style={styles.dots}>
                {stories.map((item, index) => (
                  <button
                    key={`${item.title}-${index}`}
                    aria-label={`Show article ${index + 1}`}
                    onClick={() => setActive(index)}
                    style={{
                      ...styles.dot,
                      width: index === active ? 22 : 8,
                      background: index === active ? NAVY : 'rgba(26,58,107,0.2)',
                    }}
                  />
                ))}
              </div>

              <div style={styles.carouselControls}>
                <button style={styles.carouselButton} onClick={() => go(-1)} aria-label="Previous article">
                  <ChevronLeft size={22} />
                </button>
                <button style={styles.carouselButton} onClick={() => go(1)} aria-label="Next article">
                  <ChevronRight size={22} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

const styles = {
  section: { padding: '86px 0 96px', background: '#fff' },
  header: {
    maxWidth: 760,
    marginBottom: 34,
  },
  title: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 800,
    fontSize: 'clamp(1.9rem, 3vw, 2.55rem)',
    lineHeight: 1.12,
    letterSpacing: 0,
    margin: 0,
    color: CHARCOAL,
  },
  intro: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '1rem',
    lineHeight: 1.75,
    color: '#555',
    margin: '14px 0 0',
  },
  carouselShell: {
    position: 'relative',
  },
  storyViewport: {
    minHeight: 430,
    overflow: 'hidden',
    borderRadius: 8,
  },
  storyTrack: {
    display: 'block',
  },
  storyCard: {
    position: 'relative',
    minHeight: 430,
    background: NAVY,
    borderRadius: 8,
    padding: 0,
    overflow: 'hidden',
    boxShadow: '0 18px 46px rgba(26,58,107,0.17)',
  },
  storyEmpty: {
    minHeight: 430,
    background: '#fff',
    borderRadius: 8,
    border: '1px solid rgba(26,58,107,0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.95rem',
    color: '#666',
  },
  storyImage: {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  storyShade: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(90deg, rgba(8,20,38,0.9) 0%, rgba(13,33,61,0.62) 43%, rgba(13,33,61,0.18) 100%)',
  },
  storyContent: {
    position: 'absolute',
    inset: 'auto auto 0 0',
    width: 'min(760px, 74%)',
    padding: '0 42px 42px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  storyKicker: {
    display: 'inline-flex',
    alignItems: 'center',
    marginBottom: 13,
    padding: '7px 11px',
    borderRadius: 999,
    background: 'rgba(255,255,255,0.13)',
    border: '1px solid rgba(255,255,255,0.18)',
    color: 'rgba(255,255,255,0.86)',
    fontFamily: "'Inter', sans-serif",
    fontWeight: 700,
    fontSize: '0.68rem',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
  },
  storyTitle: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 800,
    fontSize: 'clamp(1.65rem, 3.35vw, 2.82rem)',
    lineHeight: 1.08,
    letterSpacing: 0,
    color: '#fff',
    textWrap: 'balance',
    margin: '0 0 24px',
  },
  storyLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    padding: '12px 16px',
    borderRadius: 4,
    background: '#fff',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 800,
    fontSize: '0.9rem',
    color: NAVY,
    boxShadow: '0 10px 24px rgba(0,0,0,0.14)',
  },
  carouselFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 22,
    alignItems: 'center',
    marginTop: 24,
  },
  dots: { display: 'flex', gap: 9, alignItems: 'center' },
  dot: {
    height: 8,
    borderRadius: 999,
    border: 0,
    cursor: 'pointer',
    transition: 'width 0.22s ease, background 0.22s ease',
  },
  carouselControls: {
    display: 'flex',
    gap: 12,
  },
  carouselButton: {
    width: 48,
    height: 48,
    border: '1px solid rgba(26,58,107,0.2)',
    borderRadius: 999,
    background: '#fff',
    color: NAVY,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    boxShadow: '0 8px 24px rgba(26,58,107,0.1)',
    transition: 'transform 0.2s ease, border-color 0.2s ease, color 0.2s ease',
  },
}
