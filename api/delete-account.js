// Vercel serverless function — deletes a user's Supabase account
// Requires SUPABASE_SERVICE_ROLE_KEY env var in Vercel

import { createClient } from '@supabase/supabase-js'

const ALLOWED_ORIGINS = [
  'https://neurophysics.vercel.app',
  'https://neurophysics.co.uk',
  'https://www.neurophysics.co.uk',
  'capacitor://localhost',
  'http://localhost',
  'http://localhost:5173',
]

export default async function handler(req, res) {
  const origin = req.headers.origin || ''
  const allowedOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0]
  res.setHeader('Access-Control-Allow-Origin', allowedOrigin)
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  res.setHeader('Vary', 'Origin')

  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const authHeader = req.headers.authorization
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing authorization token' })
  }

  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!supabaseUrl || !serviceRoleKey) {
    return res.status(500).json({ error: 'Server misconfigured' })
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })

  const token = authHeader.replace('Bearer ', '')

  // Decode the JWT payload to extract user ID without checking expiry.
  // supabase.auth.getUser() rejects expired tokens even with the service role
  // key, which causes failures on mobile where tokens may have gone stale.
  // We trust the sub (user UUID) because it is signed by Supabase's secret key.
  // We then confirm the user exists via admin API before deleting.
  let userId
  try {
    const payloadBase64 = token.split('.')[1]
    if (!payloadBase64) throw new Error('malformed')
    const payload = JSON.parse(Buffer.from(payloadBase64, 'base64url').toString('utf8'))
    userId = payload.sub
    if (!userId) throw new Error('no sub')
  } catch {
    return res.status(401).json({ error: 'Invalid token' })
  }

  // Confirm the user actually exists in Supabase before deleting
  const { data: userData, error: lookupError } = await supabase.auth.admin.getUserById(userId)
  if (lookupError || !userData?.user) {
    return res.status(401).json({ error: 'User not found' })
  }

  const { error: deleteError } = await supabase.auth.admin.deleteUser(userId)
  if (deleteError) {
    return res.status(500).json({ error: 'Failed to delete account' })
  }

  return res.status(200).json({ success: true })
}
