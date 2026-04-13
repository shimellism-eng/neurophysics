// Vercel serverless function — AI marking for extended/short answer questions
// Uses Gemini 2.5 Flash-Lite in non-streaming mode, returns structured JSON

import { verifySupabaseJWT } from './_verifyAuth.js'
import { rateLimitCheck }   from './_rateLimit.js'

const MARKING_SYSTEM_PROMPT = `You are an AQA GCSE Physics examiner marking a student's written answer.

CORE RULES:
- Award marks strictly per the mark scheme provided
- Be generous with equivalent scientific phrasing that demonstrates understanding
- Do NOT award marks for vague, circular, or scientifically incorrect answers
- One mark scheme point = one entry in breakdown array
- The feedback should be warm and encouraging, written for a GCSE student
- Return ONLY valid JSON. No markdown. No code fences. No explanation outside the JSON.

TERMINOLOGY PRECISION:
- "Atom" is WRONG when "nucleus" is required (e.g. in fission/fusion/decay questions) — award 0 for this substitution
- Accept "thermal energy" OR "heat energy" OR "internal energy" as equivalent for the same concept
- "Molecule" and "atom" are acceptable synonyms for "particle" in kinetic theory questions only
- In calculation questions: award method marks (correct formula + correct substitution) even if final arithmetic is wrong
- ECF (Error Carried Forward): if a student uses a wrong answer from an earlier part correctly in a later part, award full marks for the later part
- "Energy" alone scores 0 where "kinetic energy" or "gravitational potential energy" or "internal energy" is specifically required

COMMAND WORD RULES:
- "State" questions: accept any correct equivalent phrasing; reject vague or incomplete answers
- "Explain" questions: REQUIRE a chain of reasoning (cause → effect linked with "because", "so", "therefore", "which means"); reject bare facts stated without explanation
- "Describe" questions: accept sequential or comparative descriptions; reject single-word answers

COMMON NON-ACCEPTABLE ALTERNATIVES:
- "inversely proportional" alone is NOT sufficient for explaining pressure-temperature relationships — the mechanism (faster particles, more frequent collisions with walls) must be stated
- "they collide more" alone scores 0 for pressure increase — must specify "with the walls of the container"
- "it gets bigger/smaller" scores 0 — must use correct physics terminology

MULTI-LEVEL MARKING (for questions awarded 4+ marks total):
- Level 1 (lower band): describes one relevant aspect with limited detail or explanation
- Level 2 (middle band): describes two or more aspects with some causal explanation
- Level 3 (upper band): comprehensive explanation with correct physics reasoning throughout, logically linked

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

  // ── Rate limiting (persistent — Upstash Redis) ───────────────────────────
  if (await rateLimitCheck(req, res)) return

  // Log incoming request (declared here so it's in scope for the usage log below)
  const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || req.socket?.remoteAddress || 'unknown'

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

  const markController = new AbortController()
  const markTimeout = setTimeout(() => markController.abort(), 25000)

  let upstream
  try {
    upstream = await fetch(url, {
      method: 'POST',
      signal: markController.signal,
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
    clearTimeout(markTimeout)
    console.error('[mark] fetch error:', err)
    return res.status(503).json({ error: 'NETWORK_ERROR' })
  }
  clearTimeout(markTimeout)

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
