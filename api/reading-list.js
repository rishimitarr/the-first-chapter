/* global process */

const FEEDS = [
  'https://news.google.com/rss/search?q=children+education+access+school+supplies&hl=en-CA&gl=CA&ceid=CA:en',
  'https://news.google.com/rss/search?q=children+health+education+wellbeing&hl=en-CA&gl=CA&ceid=CA:en',
  'https://news.google.com/rss/search?q=child+poverty+education+health&hl=en-CA&gl=CA&ceid=CA:en',
  'https://www.bing.com/news/search?q=children+education+health&format=rss',
]

const NEWS_QUERY = [
  '"children education"',
  '"child education"',
  '"girls education"',
  '"out of school children"',
  '"children learning"',
  '"child literacy"',
  '"children mental health"',
  '"school meals"',
  '"child poverty"',
].join(' OR ')

const REQUIRED_TOPIC_PATTERN =
  /\b(child|children|kid|kids|youth|student|students|school|schools|classroom|education|learning|literacy|pediatric|paediatric)\b/i

const SUPPORT_TOPIC_PATTERN =
  /\b(health|wellbeing|well-being|mental health|poverty|hunger|nutrition|supplies|access|displaced|refugee|homeless|bullying|special education|school meal|classroom)\b/i

const CHILD_OR_SCHOOL_PATTERN =
  /\b(child|children|kid|kids|youth|school|schools|classroom|education|learning|literacy|pediatric|paediatric)\b/i

const COMMERCIAL_PATTERN =
  /\b(sale|deal|coupon|discount|shopping|shopper|walmart|target|amazon|product|marker|markers|backpack sale|buy now|price drop|slickdeals|affiliate)\b/i

const IRRELEVANT_PATTERN =
  /\b(medical student|college student|university student|higher education|demographic challenges|pregnancy prevention|consumer spending)\b/i

const EXCLUDED_NEWS_DOMAINS = [
  'biztoc.com',
  'foreignpolicy.com',
  'naturalnews.com',
  'nypost.com',
  'pymnts.com',
  'rawstory.com',
  'slickdeals.net',
  'worldofglobal.com',
].join(',')

const json = (res, status, body) => {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.setHeader('Cache-Control', 's-maxage=21600, stale-while-revalidate=86400')
  res.end(JSON.stringify(body))
}

const decode = (value = '') =>
  value
    .replace(/<!\[CDATA\[|\]\]>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim()

const stripHtml = (value = '') => decode(value).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()

const tag = (xml, name) => {
  const match = xml.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)<\\/${name}>`, 'i'))
  return decode(match?.[1] || '')
}

const attr = (value, name) => {
  const match = value.match(new RegExp(`${name}=["']([^"']+)["']`, 'i'))
  return decode(match?.[1] || '')
}

const imageFromRssItem = (itemXml) => {
  const mediaContent = itemXml.match(/<media:content[^>]+url=["']([^"']+)["'][^>]*>/i)?.[1]
  const mediaThumb = itemXml.match(/<media:thumbnail[^>]+url=["']([^"']+)["'][^>]*>/i)?.[1]
  const enclosure = itemXml.match(/<enclosure[^>]+type=["']image\/[^"']+["'][^>]+url=["']([^"']+)["'][^>]*>/i)?.[1]
  const description = decode(tag(itemXml, 'description'))
  const htmlImg = description.match(/<img[^>]+src=["']([^"']+)["']/i)?.[1]
  return decode(mediaContent || mediaThumb || enclosure || htmlImg || '')
}

const sourceFromUrl = (url = '') => {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return ''
  }
}

const isRelevantStory = (story) => {
  const text = `${story.title || ''} ${story.description || ''} ${story.source || ''}`
  return (
    REQUIRED_TOPIC_PATTERN.test(text) &&
    CHILD_OR_SCHOOL_PATTERN.test(text) &&
    SUPPORT_TOPIC_PATTERN.test(text) &&
    !COMMERCIAL_PATTERN.test(text) &&
    !IRRELEVANT_PATTERN.test(text)
  )
}

const extractMetaImage = (html = '') => {
  const patterns = [
    /<meta[^>]+property=["']og:image:secure_url["'][^>]+content=["']([^"']+)["'][^>]*>/i,
    /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["'][^>]*>/i,
    /<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["'][^>]*>/i,
    /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["'][^>]*>/i,
    /<meta[^>]+content=["']([^"']+)["'][^>]+name=["']twitter:image["'][^>]*>/i,
  ]
  for (const pattern of patterns) {
    const image = html.match(pattern)?.[1]
    if (image) return decode(image)
  }
  return ''
}

const absoluteUrl = (image, pageUrl) => {
  if (!image) return ''
  try {
    return new URL(image, pageUrl).toString()
  } catch {
    return ''
  }
}

const isGenericNewsImage = (image = '') =>
  image.includes('lh3.googleusercontent.com/J6_coFbog') || image.includes('news.google.com')

const uniqueStories = (stories) => {
  const unique = []
  const seen = new Set()

  stories.forEach((story) => {
    const key = story.title.toLowerCase()
    if (!seen.has(key)) {
      seen.add(key)
      unique.push(story)
    }
  })

  return unique
}

async function fetchWithTimeout(url, ms = 4500) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), ms)
  try {
    return await fetch(url, {
      redirect: 'follow',
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 TheFirstChapterBot/1.0',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
    })
  } finally {
    clearTimeout(timeout)
  }
}

async function enrichImage(story) {
  if (story.image && !isGenericNewsImage(story.image)) return story
  const storyWithoutGenericImage = isGenericNewsImage(story.image) ? { ...story, image: '' } : story

  try {
    const metaRes = await fetchWithTimeout(`https://api.microlink.io/?url=${encodeURIComponent(storyWithoutGenericImage.link)}`, 5500)
    if (metaRes.ok) {
      const data = await metaRes.json()
      const image = data?.data?.image?.url
      const resolvedUrl = data?.data?.url || storyWithoutGenericImage.link
      if (image && !isGenericNewsImage(image)) return { ...storyWithoutGenericImage, image, link: resolvedUrl }
    }
  } catch {
    // Continue to direct metadata scrape.
  }

  try {
    const pageRes = await fetchWithTimeout(storyWithoutGenericImage.link, 4500)
    if (!pageRes.ok) return storyWithoutGenericImage
    const html = await pageRes.text()
    const image = absoluteUrl(extractMetaImage(html), pageRes.url || storyWithoutGenericImage.link)
    return image && !isGenericNewsImage(image)
      ? { ...storyWithoutGenericImage, image, link: pageRes.url || storyWithoutGenericImage.link }
      : storyWithoutGenericImage
  } catch {
    return storyWithoutGenericImage
  }
}

async function fetchNewsApiStories() {
  const key = process.env.NEWS_API_KEY
  if (!key) return []

  const params = new URLSearchParams({
    q: NEWS_QUERY,
    searchIn: 'title,description',
    language: 'en',
    sortBy: 'publishedAt',
    pageSize: '50',
    excludeDomains: EXCLUDED_NEWS_DOMAINS,
    apiKey: key,
  })

  const res = await fetchWithTimeout(`https://newsapi.org/v2/everything?${params.toString()}`, 6500)
  if (!res.ok) return []
  const data = await res.json()
  return (data.articles || [])
    .map((article) => ({
      title: stripHtml(article.title || '').replace(/\s+-\s+[^-]+$/, ''),
      link: article.url,
      image: article.urlToImage,
      source: article.source?.name || sourceFromUrl(article.url),
      date: article.publishedAt || new Date().toISOString(),
      description: stripHtml(article.description || ''),
    }))
    .filter((story) => story.title && story.link && story.image)
    .filter(isRelevantStory)
    .map((story) => {
      const publicStory = { ...story }
      delete publicStory.description
      return publicStory
    })
}

async function fetchGNewsStories() {
  const key = process.env.GNEWS_API_KEY
  if (!key) return []

  const params = new URLSearchParams({
    q: 'children education OR child health OR school supplies OR child poverty',
    lang: 'en',
    max: '10',
    apikey: key,
  })

  const res = await fetchWithTimeout(`https://gnews.io/api/v4/search?${params.toString()}`, 6500)
  if (!res.ok) return []
  const data = await res.json()
  return (data.articles || [])
    .map((article) => ({
      title: stripHtml(article.title || ''),
      link: article.url,
      image: article.image,
      source: article.source?.name || sourceFromUrl(article.url),
      date: article.publishedAt || new Date().toISOString(),
    }))
    .filter((story) => story.title && story.link && story.image)
}

async function fetchFeed(feed) {
  const res = await fetchWithTimeout(feed, 5000)
  if (!res.ok) return []
  const xml = await res.text()
  const items = xml.match(/<item[\s\S]*?<\/item>/gi) || []
  return items.slice(0, 8).map((itemXml) => {
    const link = tag(itemXml, 'link') || attr(tag(itemXml, 'guid'), 'href')
    const title = stripHtml(tag(itemXml, 'title')).replace(/\s+-\s+[^-]+$/, '')
    const source = stripHtml(tag(itemXml, 'source')) || sourceFromUrl(link)
    const rawDate = tag(itemXml, 'pubDate')
    const date = rawDate ? new Date(rawDate).toISOString() : new Date().toISOString()
    return {
      title,
      link,
      source,
      date,
      image: imageFromRssItem(itemXml),
    }
  }).filter((story) => story.title && story.link)
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    json(res, 405, { error: 'Method not allowed' })
    return
  }

  try {
    const apiResults = await Promise.allSettled([
      fetchNewsApiStories(),
      fetchGNewsStories(),
    ])
    const apiStories = uniqueStories(apiResults
      .flatMap((result) => (result.status === 'fulfilled' ? result.value : []))
      .filter((story) => story.image && !isGenericNewsImage(story.image)))

    let stories = apiStories

    if (stories.length < 8) {
      const feedResults = await Promise.allSettled(FEEDS.map(fetchFeed))
      const feedStories = uniqueStories(feedResults
        .flatMap((result) => (result.status === 'fulfilled' ? result.value : [])))
      const enriched = await Promise.all(feedStories.slice(0, 18).map(enrichImage))
      stories = uniqueStories([
        ...stories,
        ...enriched.filter((story) => story.image && !isGenericNewsImage(story.image)),
      ])
    }

    if (stories.length > 0) {
      json(res, 200, {
        updatedAt: new Date().toISOString(),
        provider: process.env.NEWS_API_KEY ? 'newsapi' : 'gnews',
        stories: stories.slice(0, 10),
      })
      return
    }

    const feedResults = await Promise.allSettled(FEEDS.map(fetchFeed))
    const unique = uniqueStories(feedResults
      .flatMap((result) => (result.status === 'fulfilled' ? result.value : [])))

    const enriched = await Promise.all(unique.slice(0, 16).map(enrichImage))
    const fallbackStories = enriched
      .filter((story) => story.image)
      .slice(0, 10)

    json(res, 200, {
      updatedAt: new Date().toISOString(),
      stories: fallbackStories,
    })
  } catch {
    json(res, 500, { error: 'Unable to load reading list' })
  }
}
