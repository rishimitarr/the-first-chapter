/* global process */

const MIN_AMOUNT_CENTS = 200
const KIT_CURRENCY = 'cad'
const KIT_NAME = 'Educational Kit'

const json = (res, status, body) => {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.end(JSON.stringify(body))
}

const getOrigin = (req) => {
  const configured = process.env.SITE_URL || process.env.VERCEL_PROJECT_PRODUCTION_URL
  if (configured) {
    const normalized = configured.startsWith('http') ? configured : `https://${configured}`
    return normalized.replace(/\/$/, '')
  }

  const protocol = req.headers['x-forwarded-proto'] || 'http'
  const host = req.headers['x-forwarded-host'] || req.headers.host
  return `${protocol}://${host}`
}

const parseBody = async (req) => {
  if (req.body && typeof req.body === 'object') return req.body

  let raw = ''
  for await (const chunk of req) raw += chunk
  return raw ? JSON.parse(raw) : {}
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    json(res, 405, { error: 'Method not allowed' })
    return
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    json(res, 500, { error: 'Stripe is not configured yet.' })
    return
  }

  try {
    const body = await parseBody(req)
    const rawAmount = Number.parseInt(body.amountCents, 10)
    const amountCents = Math.max(MIN_AMOUNT_CENTS, isNaN(rawAmount) ? MIN_AMOUNT_CENTS : rawAmount)
    const origin = getOrigin(req)

    const donationLabel = `CA$${(amountCents / 100).toFixed(2)} donation`

    const params = new URLSearchParams({
      mode: 'payment',
      ui_mode: 'embedded_page',
      submit_type: 'donate',
      return_url: `${origin}/donate?session_id={CHECKOUT_SESSION_ID}`,
      'line_items[0][quantity]': '1',
      'line_items[0][price_data][currency]': KIT_CURRENCY,
      'line_items[0][price_data][unit_amount]': String(amountCents),
      'line_items[0][price_data][product_data][name]': KIT_NAME,
      'line_items[0][price_data][product_data][description]':
        'One volunteer-packed school supply kit for a child in the Greater Toronto Area.',
      'payment_intent_data[description]': `${donationLabel} for ${KIT_NAME}`,
      'metadata[kit]': KIT_NAME,
      'metadata[amount_cents]': String(amountCents),
    })

    const stripeRes = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params,
    })

    const data = await stripeRes.json()

    if (!stripeRes.ok) {
      console.error('Stripe session creation failed', data?.error?.message || data)
      json(res, stripeRes.status, { error: data?.error?.message || 'Unable to start donation.' })
      return
    }

    json(res, 200, { clientSecret: data.client_secret })
  } catch (error) {
    console.error('Donation session error', error)
    json(res, 500, { error: 'Unable to start donation.' })
  }
}
