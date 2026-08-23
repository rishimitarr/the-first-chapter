/* global process */

const RESEND_API_KEY = process.env.RESEND_API_KEY

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
        from: 'The First Chapter <onboarding@thefirstchapternpo.org>',
        to: [email],
        subject: 'Help Educate Children Today!',
        html: `
          <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
          <html dir="ltr" lang="en">
          <head>
            <meta content="width=device-width" name="viewport"/>
            <meta content="text/html; charset=UTF-8" http-equiv="Content-Type"/>
            <title>Help educate children in the GTA and change lives.</title>
          </head>
          <body dir="ltr" lang="en" style="font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;font-size:1em;min-height:100%;line-height:155%">
            <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="max-width:600px;width:100%;border-radius:0px;line-height:155%">
              <tbody>
                <tr>
                  <td dir="ltr" lang="en" style="padding:0">
                    <h1 style="margin:0;padding:0;font-size:2.25em;line-height:1.44em;padding-top:0.389em;font-weight:600;text-align:left">Welcome to the family!</h1>
                    <p style="margin:0;padding:0;font-size:1em;padding-top:0.5em;padding-bottom:0.5em">Hello ${firstName || 'There'},</p>
                    <p style="margin:0;padding:0;font-size:1em;padding-top:0.5em;padding-bottom:0.5em">Thank you for joining our community. We're so glad to have you with us.</p>
                    <p style="margin:0;padding:0;font-size:1em;padding-top:0.5em;padding-bottom:0.5em">We need your help to educate children around the GTA. Every child deserves access to the supplies and opportunities that can shape their future, and together, we can make that possible. Whether it's through volunteering, sharing our mission, or contributing what you can, your support directly changes lives in our community.</p>
                    <p style="margin:0;padding:0;font-size:1em;padding-top:0.5em;padding-bottom:0.5em">In the weeks ahead, you'll hear from us about the students we serve, the programs we run, and the ways you can get involved. We promise to keep things meaningful. No bullsh*t, just stories and updates that matter.</p>
                    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
                      <tbody>
                        <tr>
                          <td align="left">
                            <a href="https://www.thefirstchapternpo.org/" style="display:inline-block;padding:7px 12px;background-color:#000000;color:#ffffff;border-radius:4px;font-weight:500;font-size:0.875em;text-decoration:none" target="_blank">Help us Today</a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <p style="margin:0;padding:0;font-size:1em;padding-top:0.5em;padding-bottom:0.5em">With gratitude,<br/>The First Chapter Team</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </body>
          </html>
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