# NeuroPhysics — Session Memory

## Last Updated
2026-04-18

## What Was Just Done (latest — 2026-04-18)

### Sprint 3.2 Diagnostic Feedback ✅ shipped c43d6eb
- QuickWinScreen: 3-layer feedback card (result + senNote + action buttons), session streak counter, misconception tracking
- "Ask Mamo" button on wrong answers → /mamo?topic=&label=&question=&wrong=&correct=
- "Show concept" button → lesson/practical/practice routing
- MamoChat: reads question/wrong/correct params, pre-fills input with diagnostic message
- src/utils/misconceptions.js: localStorage wrong-answer tracker (np_misconceptions key)
- Note: question bank uses `senNote` (teacher hint) as Layer 2 explanation — works without schema changes

### Sprint 3.1 Spaced Repetition SM-2 ✅ shipped 4b95c87
- NEW: src/hooks/useSRS.js — SM-2 algorithm, localStorage `np_srs`, non-blocking Supabase sync
- HomeScreen: "Due for Review" amber card with per-topic pills (green/amber/red), only shown when totalDue > 0
- QuickWinScreen: now uses getDueQuestions() (specific question IDs, overdue-first) + records each answer via updateProgress()
- Supabase table NOT yet created — Mamo must run this SQL in Supabase dashboard:

```sql
create table if not exists public.user_question_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  question_id text not null,
  ease_factor numeric not null default 2.5,
  interval_days integer not null default 1,
  repetition_count integer not null default 0,
  last_reviewed timestamptz,
  next_due timestamptz,
  correct_streak integer not null default 0,
  total_attempts integer not null default 0,
  total_correct integer not null default 0,
  updated_at timestamptz not null default now(),
  unique(user_id, question_id)
);
alter table public.user_question_progress enable row level security;
create policy "Users can manage their own question progress"
  on public.user_question_progress for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);
```

### Sprint 2.5 Screen Reader & Keyboard ✅ shipped 51b6801
- Focus indicators already present via :focus-visible in index.css (no change needed)
- No `<img>` tags in codebase — alt text N/A
- Added aria-label to 3 icon-only back buttons in Grade9Challenge.jsx
- Added aria-live="polite" aria-atomic="true" to dynamic feedback regions:
  - AdaptivePractice: calculation feedback + MCQ hint divs
  - QuickWinScreen: MCQ feedback motion.div (already had aria-live from 2.5 pass)
  - ExamPractice: score display motion.div
  - MisconceptionFeedback: XP badge motion.div
- PracticalScreen "backdrop" at line 2538 is actually the main content scroll div — correctly skipped (aria-hidden would hide all content)
- Build clean, deployed, pushed, cap sync ios done

### Sprint 2.4 Reduced Motion ✅ shipped 7b0e213
- CSS @media rule + body.reduce-motion class were already in index.css
- useReducedMotion hook already existed and was used in 6 major screens
- Migrated 5 files that had non-reactive inline reads: OnboardingScreen (was OS-pref only, missed app pref), MamoChat/TypingDots (IIFE not reactive), AtomIcon (getReduceMotion() helper → hook), MisconceptionFeedback (inline reads inside useEffect → hoisted), AuthScreen (local duplicate function → hook import)
- Net: 14 lines added, 42 deleted — all JS animations now react live to both OS and in-app preference changes

### Sprint 2.3 Touch Targets ✅ shipped ae0dc8a
- MCQ option padding: py-3.5 (14px) → py-4 (16px) in QuickWinScreen, VocabPreTeach, EquationDrillScreen
- RecallQuestion: reveal button renamed "Flip card" with RefreshCw icon, padding fixed to py-4
- Already done (no changes): global 48px min + 8px gap in index.css, drag-drop tap-only, ComfortSettings sliders had +/− buttons
- CLAUDE.md 2.3 marked ✅ shipped

## What Was Just Done (previous — 2026-04-18)

### Sprint 2.2 Contrast Audit ✅ shipped 4536072
- Audited all 4 themes (dark, cream, lightblue, lightyellow) against WCAG 2.2 AA
- Fixed exactly 5 failing tokens in `src/index.css`:
  - Dark `--np-text-dim`: #64748b → #6c7c93 (4.50:1 on #080f1e)
  - Cream `--np-text-muted`: #64748b → #63738a (4.56:1 on #FFF8E7)
  - Cream `--np-text-dim`: #94a3b8 → #647388 (4.56:1 on #FFF8E7)
  - LBlue `--np-text-dim`: #7ea7cc → #497297 (4.54:1 on #E8F4FD)
  - LYell `--np-text-dim`: #a89060 → #876f3f (4.53:1 on #FFF9DB)
- Confirmed passing: cyan #00d4ff = 10.81:1, bg #080f1e is navy (not pure black) ✓
- CLAUDE.md roadmap item 2.2 marked ✅ shipped
- Build: passing, deployed, pushed, cap sync ios done

## What Was Just Done (previous — 2026-04-18)

### Sprint 2.1 Typography Overhaul ✅ shipped
- `index.html`: Google Fonts link updated — added Atkinson Hyperlegible, kept Bricolage Grotesque + Space Grotesk + IBM Plex Mono + Kalam
- `src/index.css`:
  - `--font-body` → `'Atkinson Hyperlegible', sans-serif`
  - `--font-display` → `'Bricolage Grotesque', sans-serif`
  - `body` rule: added `line-height: 1.7; letter-spacing: 0.04em`
  - `.font-display` class: updated from Space Grotesk to Bricolage Grotesque
  - Added `p { text-align: left; }` inside `@layer base`
- `src/design/tokens.js`: `fontBody` + `fontDisplay` synced to match
- CLAUDE.md roadmap item 2.1 marked ✅ shipped
- Build: passing

## What Was Just Done (previous — 2026-04-16)

### ⭐ ROOT CAUSE of safe-area overlap (commit 7310d88)
- **One-line fix in `index.html:14`** — added `viewport-fit=cover` to viewport meta
- Without it, iOS WebView resolves `env(safe-area-inset-top)` to **0**
- That's why Phase 1 (LessonPlayer/ExamPractice/DiagnosticQuestion paddingTop) and PageHeader.jsx fix (commit a4e298f) appeared to do nothing on-device — the `calc(20px + env(...))` was just giving back 20px = same as Tailwind `pt-5`
- After this fix, ALL prior safe-area work takes effect simultaneously
- Deployed + cap sync ios complete
- **Mamo must Cmd+R in Xcode to verify** — MamoChat, LessonPlayer, ExamPractice, DiagnosticQuestion, HomeScreen should all now clear Dynamic Island / return chip

### PageHeader safe-area fix (commit a4e298f)
- Added `paddingTop: 'calc(20px + env(safe-area-inset-top))'` to shared PageHeader.jsx
- Cascades to 6 screens: AdaptivePractice, MamoChat, StudyPlanScreen, SpecChecklist, EquationDrillScreen, RecallScreen
- Was latent until viewport-fit=cover fix above — now live

### CLAUDE.md tooling overhaul (commit 5ce8d50)
- Added 5 sections at top of CLAUDE.md: **Tooling Rules** (Serena-first), **Session Memory**, **About This Project**, **Talking to Mamo**, **Do Not**
- Rules aim to stop context exhaustion from reading whole React screens
- Serena tools to prefer: `get_symbols_overview`, `find_symbol`, `find_referencing_symbols`, `replace_symbol_body`
- Whole-file reads only allowed for <50 lines OR config/markdown/CSS
- Existing content (design tokens, file structure, conventions, API security, multi-board, knowledge graphs) preserved verbatim below

### Safe-area audit fixes (commit e495042, 11 files)
Following a full audit that found 13 P0 + 2 P1 layout issues, fixed in 3 phases:

- **Phase 1 — sticky-header paddingTop (3 files):**
  - `LessonPlayer.jsx:538`, `ExamPractice.jsx:644`, `DiagnosticQuestion.jsx:412`
  - Added `paddingTop: 'calc(20px + env(safe-area-inset-top))'` so sticky headers clear iOS status bar / return chip when app opened via universal link
  - ⚠️ **Needs device verification** — AppShell spacer at `App.jsx:368` already reserves the inset, so this may over-pad on iOS. If header sits too low on 14 Pro, revert this phase.

- **Phase 2 — removed duplicate safe-area padding (2 files):**
  - `HomeScreen.jsx:357` — dropped `paddingTop: 'env(safe-area-inset-top, 16px)'`
  - `ConsentScreen.jsx:54` — deleted `<div style={{ height: 'env(safe-area-inset-top)' }} />` spacer
  - AppShell already handles this globally

- **Phase 3 — iOS flex-scroll `minHeight: 0` on 8 screens:**
  - `ConsentScreen:56`, `PrivacyPolicyScreen:170`, `TermsScreen:131`, `DiagnosticQuestion:459`, `TimedPaper:710`, `TopicMap:396`, `PracticalScreen:2538`, `MisconceptionFeedback:120`
  - Each parent chain verified as `flex flex-col h-full overflow-hidden` before editing
  - Without `minHeight: 0`, WebKit refuses to scroll `flex-1 overflow-y-auto` children

Build passes. Deployed to neurophysics.co.uk, pushed to main (commits 5ce8d50 + e495042), `cap sync ios` complete.

### On-device testing needed (Mamo)
1. Rebuild from Xcode onto 14 Pro
2. Verify lesson header (opened via Facebook deep link) no longer overlaps Dynamic Island / return chip
3. **If header sits too low** on lesson screens → revert commit e495042's Phase 1 changes only (the paddingTop additions). Keep Phase 2 and Phase 3.
4. Spot-check scroll on: Consent, Privacy, Terms, Diagnostic, TimedPaper, TopicMap, Practical, MisconceptionFeedback

## What Was Done Before
- Legal fixes for Explore tab external links (ICO Children's Code + UK GDPR):
  1. Interstitial bottom-sheet warning before any external sim opens (names the domain, Cancel/Open site buttons)
  2. TabExplore disclaimer strengthened: "not controlled by NeuroPhysics"
  3. PrivacyPolicy section 5: third-party data disclosure paragraph added
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
