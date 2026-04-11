// Shared JWT verification helper for all NeuroPhysics API endpoints.
// Verifies a Supabase-issued HS256 JWT against SUPABASE_JWT_SECRET env var.
// Pure crypto — no network call, no external dependencies.

import { createHmac, timingSafeEqual } from 'crypto'

/**
 * Verifies a Supabase Bearer token from an Authorization header.
 * Returns { userId, email } on success.
 * Throws with a descriptive message on any failure — caller should return 401.
 *
 * @param {string|undefined} authHeader — value of req.headers.authorization
 * @returns {{ userId: string, email: string|undefined }}
 */
export function verifySupabaseJWT(authHeader) {
  if (!authHeader?.startsWith('Bearer ')) {
    throw new Error('Missing or malformed Authorization header')
  }

  const token = authHeader.slice(7).trim()
  const parts = token.split('.')
  if (parts.length !== 3) throw new Error('Malformed JWT structure')

  const [headerB64, payloadB64, sigB64] = parts

  const secret = process.env.SUPABASE_JWT_SECRET
  if (!secret) {
    // ⚠️  SUPABASE_JWT_SECRET not set — auth is DISABLED.
    // Add it in Vercel Dashboard → Settings → Environment Variables, then redeploy.
    console.error('[security] SUPABASE_JWT_SECRET missing — API endpoints are UNPROTECTED')
    return { userId: 'unauthenticated', email: undefined }
  }

  // Verify HS256 HMAC signature using timing-safe comparison
  const signingInput = `${headerB64}.${payloadB64}`
  const expected = createHmac('sha256', secret)
    .update(signingInput)
    .digest('base64url')

  const expectedBuf = Buffer.from(expected, 'utf8')
  const actualBuf   = Buffer.from(sigB64,   'utf8')

  const sigValid = expectedBuf.length === actualBuf.length &&
    timingSafeEqual(expectedBuf, actualBuf)

  if (!sigValid) throw new Error('JWT signature invalid')

  // Decode payload (already verified above)
  let payload
  try {
    payload = JSON.parse(Buffer.from(payloadB64, 'base64url').toString('utf8'))
  } catch {
    throw new Error('JWT payload not valid JSON')
  }

  // Check expiry
  const now = Math.floor(Date.now() / 1000)
  if (payload.exp && payload.exp < now) {
    throw new Error('JWT expired')
  }

  if (!payload.sub) throw new Error('JWT missing sub (user ID)')

  return { userId: payload.sub, email: payload.email }
}
