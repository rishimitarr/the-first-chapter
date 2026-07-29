import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

function vercelApiDev() {
  return {
    name: 'vercel-api-dev',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const path = req.url?.split('?')[0]
        if (path !== '/api/create-checkout-session') return next()

        try {
          const { default: handler } = await import('./api/create-checkout-session.js')
          await handler(req, res)
        } catch (error) {
          console.error('API route error', error)
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json; charset=utf-8')
          res.end(JSON.stringify({ error: 'Unable to start donation.' }))
        }
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  Object.assign(process.env, env)

  return {
    plugins: [react(), vercelApiDev()],
  }
})
