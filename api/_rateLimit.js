// Persistent rate limiter using Upstash Redis.
// Unlike the in-memory Map, this survives cold starts and is shared
// across all Vercel function instances — so the limit is real.
//
// Required Vercel env vars (add in Vercel dashboard):
//   UPSTASH_REDIS_REST_URL
//   UPSTASH_REDIS_REST_TOKEN
//
// Fails CLOSED if env vars are missing so protected AI endpoints never run
// without the persistent limiter configured.

import { Ratelimit } from '@upstash/ratelimit'
import { Redis }     from '@upstash/redis'

let _limiter = null

function getLimiter() {
  if (_limiter) return _limiter

  const url   = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN

  if (!url || !token) return null

  _limiter = new Ratelimit({
    redis: new Redis({ url, token }),
    limiter: Ratelimit.slidingWindow(20, '60 s'),
    analytics: false,
    prefix: 'np_rl',
  })

  return _limiter
}

/**
 * rateLimitCheck(req, res)
 *
 * Returns true  → request is blocked, 429 already sent, caller must return.
 * Returns false → request is allowed, caller continues normally.
 */
export async function rateLimitCheck(req, res) {
  const limiter = getLimiter()

  // Upstash not configured — fail closed for protected AI endpoints.
  if (!limiter) {
    console.error('[security] Upstash rate limiter not configured — rejecting protected request')
    res.status(503).json({ error: 'Rate limit service unavailable. Try again later.' })
    return true
  }

  const ip =
    (req.headers['x-forwarded-for'] || '').split(',')[0].trim() ||
    req.socket?.remoteAddress ||
    'anonymous'

  const { success } = await limiter.limit(ip)

  if (!success) {
    res.status(429).json({ error: 'Too many requests — try again in a minute.' })
    return true
  }

  return false
}
