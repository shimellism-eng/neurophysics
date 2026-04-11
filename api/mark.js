// Vercel serverless function — AI marking for extended/short answer questions
// Uses Gemini 2.5 Flash-Lite in non-streaming mode, returns structured JSON

import { verifySupabaseJWT } from './_verifyAuth.js'

// ── Simple in-memory rate limiter (per-IP, resets every minute) ──────────────
const rateMap = new Map()
const RATE_LIMIT = 10  // marking is more expensive than chat
const WINDOW_MS  = 60_000

function isRateLimited(ip) {
  const now = Date.now()
  const entry = rateMap.get(ip)
  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return false
  }
  if (entry.count >= RATE_LIMIT) return true
  entry.count++
  return false
}

setInterval(() => {
  const now = Date.now()
  for (const [key, val] of rateMap) {
    if (now > val.resetAt) rateMap.delete(key)
  }
}, 300_000)

const MARKING_SYSTEM_PROMPT = `You are an AQA GCSE Physics examiner marking a student's written answer.

Rules:
- Award marks strictly per the mark scheme provided
- Be generous with equivalent scientific phrasing that demonstrates understanding
- Do NOT award marks for vague, circular, or scientifically incorrect answers
- One mark scheme point = one entry in breakdown array
- The feedback should be warm and encouraging, written for a GCSE student
- Return ONLY valid JSON. No markdown. No code fences. No explanation outside the JSON.

Required JSON format:
{
  "marksAwarded": <integer, 0 to total marks>,
  "breakdown": [
    {"awarded": true, "reason": "<one short sentence explaining why mark was/wasn't given>"},
    ...one object per mark scheme point, in order...
  ],
  "feedback": "<1–2 encouraging sentences. Acknowledge what they got right. Give one specific tip to improve.>"
}`

export default async function handler(req, res) {
  // ── CORS ──────────────────────────────────────────────────────────────────
  const ALLOWED_ORIGINS = [
    'https://neurophysics.vercel.app',
    'https://neurophysics.co.uk',
    'https://www.neurophysics.co.uk',
    'capacitor://localhost',
    'http://localhost',
    'http://localhost:5173',
  ]
  const origin = req.headers.origin || ''
  if (origin && !ALLOWED_ORIGINS.includes(origin)) return res.status(403).end()
  const allowedOrigin = origin || ALLOWED_ORIGINS[0]
  res.setHeader('Access-Control-Allow-Origin', allowedOrigin)
  res.setHeader('Vary', 'Origin')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  // ── Auth — require valid Supabase session ─────────────────────────────────
  try {
    await verifySupabaseJWT(req.headers.authorization)
  } catch {
    return res.status(401).json({ error: 'UNAUTHORIZED' })
  }

  // ── Rate limiting ─────────────────────────────────────────────────────────
  const ip =
    (req.headers['x-forwarded-for'] || '').split(',')[0].trim() ||
    req.socket?.remoteAddress ||
    'unknown'

  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'TOO_MANY_REQUESTS' })
  }

  // ── API key ───────────────────────────────────────────────────────────────
  const apiKey = (process.env.GOOGLE_AI_API_KEY || '').trim()
  if (!apiKey) {
    return res.status(500).json({ error: 'MISCONFIGURED' })
  }

  // ── Body validation ───────────────────────────────────────────────────────
  const { question, studentAnswer, markScheme, marks } = req.body || {}

  if (!question || typeof question !== 'string') {
    return res.status(400).json({ error: 'Missing question' })
  }
  if (!studentAnswer || typeof studentAnswer !== 'string') {
    return res.status(400).json({ error: 'Missing studentAnswer' })
  }
  if (studentAnswer.trim().length < 10) {
    return res.status(400).json({ error: 'Answer too short' })
  }
  if (studentAnswer.length > 1000) {
    return res.status(400).json({ error: 'Answer too long' })
  }
  if (!Array.isArray(markScheme) || markScheme.length < 1 || markScheme.length > 12) {
    return res.status(400).json({ error: 'Invalid markScheme' })
  }
  if (!markScheme.every(item => typeof item === 'string' && item.trim().length > 0 && item.length < 500)) {
    return res.status(400).json({ error: 'Invalid markScheme content' })
  }
  if (typeof marks !== 'number' || marks < 1 || marks > 12) {
    return res.status(400).json({ error: 'Invalid marks' })
  }

  // ── Build prompt ──────────────────────────────────────────────────────────
  const markSchemeText = markScheme
    .map((point, i) => `${i + 1}. ${point}`)
    .join('\n')

  const prompt = `Question (${marks} marks):
${question.slice(0, 500)}

Mark scheme (award 1 mark for each):
${markSchemeText}

Student answer:
${studentAnswer.slice(0, 1000)}

Mark this answer. Return JSON only.`

  // ── Call Gemini (non-streaming) ───────────────────────────────────────────
  const model = 'gemini-2.5-flash-lite'
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`

  let upstream
  try {
    upstream = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        system_instruction: { parts: [{ text: MARKING_SYSTEM_PROMPT }] },
        generationConfig: {
          maxOutputTokens: 500,
          temperature: 0.3,  // low temp for consistent marking
        },
      }),
    })
  } catch (err) {
    console.error('[mark] fetch error:', err)
    return res.status(503).json({ error: 'NETWORK_ERROR' })
  }

  if (!upstream.ok) {
    const errText = await upstream.text().catch(() => '')
    console.error('[mark] upstream error:', upstream.status, errText)
    const errorCode = upstream.status === 429 ? 'TOO_MANY_REQUESTS'
      : upstream.status === 503 ? 'SERVICE_UNAVAILABLE'
      : 'UPSTREAM_ERROR'
    return res.status(502).json({ error: errorCode })
  }

  // ── Parse Gemini JSON response ────────────────────────────────────────────
  let geminiBody
  try {
    geminiBody = await upstream.json()
  } catch {
    return res.status(502).json({ error: 'PARSE_ERROR' })
  }

  const rawText = geminiBody?.candidates?.[0]?.content?.parts?.[0]?.text || ''

  // Strip any accidental markdown fences Gemini might add
  const cleaned = rawText.replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/i, '').trim()

  let marking
  try {
    marking = JSON.parse(cleaned)
  } catch {
    console.error('[mark] JSON parse failed:', rawText)
    return res.status(502).json({ error: 'INVALID_JSON' })
  }

  // Validate structure
  if (
    typeof marking.marksAwarded !== 'number' ||
    !Array.isArray(marking.breakdown) ||
    typeof marking.feedback !== 'string'
  ) {
    console.error('[mark] unexpected shape:', marking)
    return res.status(502).json({ error: 'INVALID_RESPONSE' })
  }

  // Clamp marks to valid range
  marking.marksAwarded = Math.max(0, Math.min(marks, Math.round(marking.marksAwarded)))

  // Ensure breakdown length matches mark scheme
  while (marking.breakdown.length < markScheme.length) {
    marking.breakdown.push({ awarded: false, reason: 'Not covered in answer.' })
  }
  marking.breakdown = marking.breakdown.slice(0, markScheme.length)

  console.log('[mark] complete:', { ip_prefix: ip.split('.').slice(0, 2).join('.'), marks: `${marking.marksAwarded}/${marks}` })

  return res.status(200).json(marking)
}
