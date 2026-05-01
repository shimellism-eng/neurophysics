// Shared auth verification helper for all NeuroPhysics API endpoints.
// Uses the Supabase admin client to verify user tokens — works regardless of
// JWT algorithm (HS256 or RS256) and Supabase SDK version.
// This is the officially supported approach for server-side token verification.

import { createClient } from '@supabase/supabase-js'

let _adminClient = null

function getAdminClient() {
  if (_adminClient) return _adminClient
  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) {
    console.error('[security] SUPABASE_URL/VITE_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY not set')
    return null
  }
  _adminClient = createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
  return _adminClient
}

/**
 * Verifies a Supabase Bearer token from an Authorization header.
 * Returns { userId, email } on success.
 * Throws with a descriptive message on any failure — caller should return 401.
 *
 * @param {string|undefined} authHeader — value of req.headers.authorization
 * @returns {Promise<{ userId: string, email: string|undefined }>}
 */
export async function verifySupabaseJWT(authHeader) {
  if (!authHeader?.startsWith('Bearer ')) {
    throw new Error('Missing or malformed Authorization header')
  }

  const token = authHeader.slice(7).trim()
  const admin = getAdminClient()

  if (!admin) {
    // ⚠️  Admin client not configured — fail closed, never allow unauthenticated access.
    // Ensure SUPABASE_URL or VITE_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in Vercel.
    console.error('[security] Supabase admin client not configured — rejecting request')
    throw new Error('Auth service unavailable')
  }

  const { data: { user }, error } = await admin.auth.getUser(token)

  if (error || !user) {
    throw new Error(error?.message || 'Invalid or expired token')
  }

  return { userId: user.id, email: user.email }
}
