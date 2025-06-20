// Cloudflare Email Worker örneği
// Bu kodu Cloudflare Workers'a deploy etmeniz gerekiyor

export interface Env {
  EMAIL_FROM: string
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 })
    }
    
    try {
      const { to, subject, html, text } = await request.json()
      
      // Cloudflare Email API kullanarak e-posta gönder
      const response = await fetch('https://api.mailchannels.net/tx/v1/send', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          personalizations: [{ to: [{ email: to }] }],
          from: { email: env.EMAIL_FROM || 'hello@kocaelisekerleme.com' },
          subject,
          content: [
            { type: 'text/plain', value: text },
            { type: 'text/html', value: html },
          ],
        }),
      })
      
      if (!response.ok) {
        throw new Error('Email send failed')
      }
      
      return new Response('Email sent', { status: 200 })
    } catch (error) {
      return new Response('Error sending email', { status: 500 })
    }
  },
}