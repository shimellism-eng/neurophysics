# NeuroPhysics — Session Memory

## Last Updated
April 2026

## What Was Just Done
- memory.md created as permanent session log
- Session Memory section added to CLAUDE.md Project Overview
- All 4 security fixes verified as already complete (done in a previous session)
- 10 market penetration + user love improvements implemented and deployed:
  1. Public landing page (LandingScreen.jsx + PublicHeader.jsx)
  2. Fixed ip ReferenceError in api/mark.js
  3. App Store screenshots (design task, pending — Figma needed)
  4. Onboarding reduced to 3 core steps with skip options
  5. +50 XP celebration badge added to SessionClose.jsx
  6. SpecChecklist.jsx screen at /spec-checklist
  7. TTS consistency fixes (GuidedPracticeFader, VocabPreTeach)
  8. Sentry error monitoring wired (awaiting VITE_SENTRY_DSN in Vercel)
  9. Exam data chunk splitting improved in vite.config.js
  10. Age verification (DOB picker) added to ConsentScreen.jsx

## Current State
- Build: passing (48 entries precached)
- Deployed: neurophysics.co.uk (live)
- iOS: cap sync complete
- Auth: Supabase getUser() working correctly
- Rate limiting: Upstash Redis persistent sliding window — COMPLETE ✅
- CSP: unsafe-inline removed from script-src — COMPLETE ✅
- .env.production: not tracked in git — COMPLETE ✅
- np_board localStorage: getValidatedBoard() used everywhere — COMPLETE ✅
- Sentry: installed and wired, VITE_SENTRY_DSN env var NOT YET added to Vercel

## Known Broken / At Risk
- Sentry inactive until VITE_SENTRY_DSN added to Vercel dashboard env vars
  (create free account at sentry.io → React project → copy DSN → add to Vercel)

## Next Tasks (in order)
1. Create Sentry account + add VITE_SENTRY_DSN to Vercel env vars
2. Create App Store screenshots in Figma (5 screens: hook card, worked example,
   adaptive practice, progress/mastery, MamoChat)
3. RP3–RP11 infographics (generate in NotebookLM, add to INFOGRAPHIC_READY set)
4. Add /spec-checklist link somewhere in the app UI (e.g. Settings screen or HomeScreen)

## Decisions Made
- Upstash Redis chosen for rate limiting (better free tier than Vercel KV)
- Board validation default fallback is 'aqa'
- Supabase getUser() preferred over manual HS256 JWT verification
- LandingScreen shown at / for unauthenticated users; HashRouter architecture kept (no Next.js rewrite needed)
- BottomNav + FloatingMamo hidden when user is not authenticated
- Onboarding: StepValueProp kept in code but removed from active flow (landing page covers it)
- Sentry: tracesSampleRate = 0.05 (5%) to stay within free tier budget
- Sentry: user email/username stripped before send (ICO Children's Code compliance)

## Do Not Touch
- src/data/qb-practicals.js — examiner audit completed, all fixes applied
- api/_verifyAuth.js — working correctly, do not refactor
- All question bank files — extensive and correct, do not rewrite
- api/_rateLimit.js — Upstash implementation correct, do not change algorithm

## How To Use This File
- Read this at the start of every session
- Update this at the end of every session before running the end-of-session checklist
- Log what was done, what broke, what is next, and any decisions made
