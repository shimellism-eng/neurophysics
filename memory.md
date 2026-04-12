# NeuroPhysics — Session Memory

## Last Updated
April 2026

## What Was Just Done (latest)
- PracticalScreen Explore tab: 8th tab added, EXTERNAL_SIMS map, TabExplore component with PhET/WithDiode links
- PracticalScreen Data Collection mode: useDataCollector hook + Record/Clear/ScatterGraph UI in 8 Setup functions
- SetupInsulation + SetupRadiation skipped (no single slider variable)
- Build clean, deployed, pushed, iOS synced

## What Was Done Before (this session)
- memory.md created as permanent session log
- Session Memory section added to CLAUDE.md Project Overview
- All 4 security fixes verified as already complete (done in a previous session)
- Sentry activated: VITE_SENTRY_DSN added to Vercel, redeployed, now live
- 10 market penetration + user love improvements implemented and deployed
- From agent findings, items 1-4 implemented:
  1. Spec Checklist linked from Settings screen (new 'Study Tools' section)
  2. OpenGraph + Twitter Card meta tags added to index.html
  3. Privacy Policy section 4 (Children) + Terms section 3 (AI) confirmed already present
  4. App Store screenshots captured via preview tool (landing hero, lower sections, auth screen)

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
- /public/og-image.png does not exist — OG meta tags reference it but file not yet created.
  WhatsApp/Twitter link previews will show no image until this is made.
  Needed: 1200×630px dark-background PNG with NeuroPhysics branding.

## Next Tasks (in order)
1. Create og-image.png (1200×630) and add to /public/ — needed for link previews
2. Create App Store screenshots in Figma — 5 screens from a logged-in session:
   hook card, worked example stepper, adaptive practice, mastery/progress, MamoChat
3. RP3–RP11 infographics (generate in NotebookLM, add to INFOGRAPHIC_READY set)
4. Remaining agent findings: soft sign-up wall, hearts rename, touch target fixes,
   usage analytics event log, Stripe webhook stub, GitHub Actions CI, TestFlight beta

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
