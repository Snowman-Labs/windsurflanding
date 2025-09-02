import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import netlifyPlugin from '@netlify/vite-plugin'
import dotenv from 'dotenv'

dotenv.config()

export default defineConfig({
  plugins: [
    react(),
    // Netlify emulation (prod + some dev features)
    netlifyPlugin(),
    // Dev-only Pipefy middleware to avoid needing Netlify CLI locally
    {
      name: 'pipefy-dev-middleware',
      apply: 'serve',
      configureServer(server) {
        const PIPEFY_API = 'https://api.pipefy.com/graphql'
        const token = process.env.PIPEFY_TOKEN
        const hasToken = !!token

        // Health
        server.middlewares.use('/api/health', async (req, res) => {
          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ ok: true, dev: true, hasToken }))
        })

        // GET fields
        server.middlewares.use('/api/pipefy/fields', async (req, res) => {
          console.log('[DEV] /api/pipefy/fields hit:', req.url)
          if (!hasToken) {
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: 'PIPEFY_TOKEN not configured in .env' }))
            return
          }
          const url = new URL(req.url || '', 'http://localhost')
          const pipeId = url.searchParams.get('pipeId') || '306642120'
          const query = `query GetPipe($id: ID!) { pipe(id: $id) { id name start_form_fields { id label type required } } }`
          try {
            const r = await fetch(PIPEFY_API, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
              body: JSON.stringify({ query, variables: { id: pipeId } }),
            })
            const data = await r.json()
            console.log('[DEV] Pipefy fields status:', r.status, 'errors:', data.errors)
            res.statusCode = r.ok && !data.errors ? 200 : 502
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(data.data?.pipe || { error: 'Pipefy error', details: data.errors || data }))
          } catch (e: any) {
            console.error('[DEV] Pipefy fields exception:', e)
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: 'Unexpected error', details: String(e) }))
          }
        })

        // POST submit
        server.middlewares.use('/api/pipefy/submit', async (req, res) => {
          console.log('[DEV] /api/pipefy/submit hit')
          if (req.method !== 'POST') return res.end()
          if (!hasToken) {
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: 'PIPEFY_TOKEN not configured in .env' }))
            return
          }
          try {
            const chunks: Uint8Array[] = []
            await new Promise<void>((resolve) => {
              req.on('data', (c) => chunks.push(c))
              req.on('end', () => resolve())
            })
            const { pipeId, title, fields } = JSON.parse(Buffer.concat(chunks).toString() || '{}')
            console.log('[DEV] submit payload:', { pipeId, title, fields })
            if (!pipeId || !Array.isArray(fields) || fields.length === 0) {
              res.statusCode = 400
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ error: 'Missing pipeId or fields' }))
              return
            }
            const mutation = `mutation CreateCard($input: CreateCardInput!) { createCard(input: $input) { card { id url title } } }`
            const input = {
              pipe_id: String(pipeId),
              title: title || 'Website Lead',
              fields_attributes: fields.map((f: any) => ({ field_id: String(f.id), field_value: f.value })),
            }
            const r = await fetch(PIPEFY_API, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
              body: JSON.stringify({ query: mutation, variables: { input } }),
            })
            const data = await r.json()
            console.log('[DEV] Pipefy submit status:', r.status, 'errors:', data.errors)
            res.statusCode = r.ok && !data.errors ? 200 : 502
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(data.data?.createCard?.card || { error: 'Pipefy error', details: data.errors || data }))
          } catch (e: any) {
            console.error('[DEV] submit exception:', e)
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: 'Unexpected error', details: String(e) }))
          }
        })
      },
    },
  ],
})
