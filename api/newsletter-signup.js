/* global process */

const RESEND_API_KEY = process.env.RESEND_API_KEY || 're_CpywtYBN_KoZoF53yrQFdLWCTCB61UrC3'

const json = (res, status, body) => {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.end(JSON.stringify(body))
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

  try {
    const body = await parseBody(req)
    const { firstName, lastName, email } = body

    if (!email || !firstName) {
      json(res, 400, { error: 'First name and email are required.' })
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      json(res, 400, { error: 'Please enter a valid email address.' })
      return
    }

    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'The First Chapter <onboarding@resend.dev>',
        to: [email],
        subject: 'Welcome to The First Chapter!',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #1A3A6B; font-size: 24px;">Welcome, ${firstName}!</h1>
            <p style="color: #555; line-height: 1.6;">
              Thank you for joining The First Chapter community. We're thrilled to have you with us.
            </p>
            <p style="color: #555; line-height: 1.6;">
              You'll receive updates about our mission to provide educational care kits to children 
              in the Greater Toronto Area, upcoming events, and ways you can make a difference.
            </p>
            <div style="margin: 30px 0; padding: 20px; background: #f5f5f5; border-radius: 8px;">
              <p style="color: #1A3A6B; font-weight: bold; margin: 0;">
                Together, we're writing brighter futures for children in our community.
              </p>
            </div>
            <p style="color: #555; line-height: 1.6;">
              If you have any questions, feel free to reach out to us anytime.
            </p>
            <p style="color: #555; margin-top: 30px;">
              Warm regards,<br/>
              The First Chapter Team
            </p>
          </div>
        `,
      }),
    })

    if (!resendRes.ok) {
      const errorData = await resendRes.json()
      console.error('Resend error:', errorData)
      json(res, resendRes.status, { error: errorData.message || 'Failed to send welcome email.' })
      return
    }

    json(res, 200, { success: true, message: 'Welcome email sent successfully!' })
  } catch (error) {
    console.error('Newsletter signup error:', error)
    json(res, 500, { error: 'Something went wrong. Please try again.' })
  }
}