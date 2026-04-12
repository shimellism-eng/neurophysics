# CLAUDE.md — NeuroPhysics

> Architecture bible. Read this + memory.md before touching any file.

---

## Project
- **GCSE Physics PWA** for neurodivergent learners (ADHD, dyslexia, autism)
- **Live:** neurophysics.co.uk | **Local:** `/Users/mamo/neurophysics/`
- **Owner:** Mamo — Physics teacher, SEN specialist, ADHD
- **Stack:** React + Vite, JSX only, React Router, Supabase auth, Vite PWA (Workbox), Vercel hosting, Capacitor iOS

## Session Memory
Read **memory.md** before every session. Update it after. CLAUDE.md = permanent conventions. memory.md = live session log.

---

## Design Tokens
- **BG:** `#080f1e` | **Surface:** `rgba(15,22,41,0.95)` | **Surface deep:** `rgba(8,15,30,0.96)`
- **Cyan:** `#00d4ff` (primary) | **Purple:** `#9b59b6` (nav) | **Amber:** `#f39c12` (warnings) | **Pink:** `#e91e8c` (achievements)
- **Font:** Bricolage Grotesque | **Borders:** 0.75px | **Tap targets:** min 44×44px (`w-11 h-11 rounded-[12px]`)
- High contrast min 4.5:1, one concept per screen, immediate feedback, chunked info

## File Structure
- `src/screens/` — route-level pages (27 screens)
- `src/components/` — reusable UI: `lesson/` (7 step components), `questions/` (10 question types)
- `src/data/` — topic data (`topics-*.jsx`), question banks (`questionBank/qb-*.js`), exam data (`exam*.js`)
- `src/hooks/` — useAdaptive, useHearts, useInsights, useProgress, useSessionTimer, useSound
- `src/utils/` — boardConfig.js (single source of truth for 6 boards), secureStorage, tts
- `src/context/` — AuthContext (Supabase), MamoContext (app state)
- `api/` — serverless: mark.js, gemini.js, _verifyAuth.js, _rateLimit.js, delete-account.js

## Key Screens
`HomeScreen`, `LearnScreen`, `LessonPlayer` (core lesson loop), `AdaptivePractice`, `ExamPractice`, `TimedPaper`, `DiagnosticQuestion`, `MamoChat` (AI tutor), `PracticalScreen`, `SpecChecklist`, `MasteryScreen`, `SettingsScreen`, `LandingScreen` (public /), `OnboardingScreen`

---

## Coding Conventions
- JSX/JS only — no TypeScript
- CSS custom properties for colours — never hardcode hex
- PascalCase components, camelCase hooks/utils
- **NEVER delete code without explicit permission — add/edit only**
- **Lesson routing:** check `topic.hook` (new 9-step) OR `topic.lessonSteps?.length > 0` (legacy) — never lessonSteps alone
- Run `npm run build` after significant changes

## API / Security
- All `api/` functions require Supabase Bearer token via `_verifyAuth.js`
- Client: always pass `Authorization: Bearer <session.access_token>` to AI endpoints
- CORS: unknown origins → 403. Never accept API keys from request headers
- Rate limiting: Upstash Redis sliding window (20 req/60s) via `_rateLimit.js`

## Multi-Board (6 boards: AQA, Edexcel, OCR-A, OCR-B, WJEC, CCEA)
- Board stored in `localStorage` key `np_board` (default `'aqa'`). Use `getSelectedBoard()` / `getValidatedBoard()` from boardConfig.js — never raw localStorage
- `boards: ['edexcel']` on module/topic restricts to that board. No field = universal. `boards == null` = universal
- CCEA: A*-G grades — check `board.gradeSystem === 'A*-G'` before showing 9-1 UI
- g values: Edexcel/CCEA = 10, AQA/OCR/WJEC = 9.8 — read from `BOARDS[boardId].g`
- Board-specific question banks: `qb-keyconcepts.js` (Edexcel), `qb-globalchallenges.js` (OCR-A), `qb-universe-ocr.js` (OCR-B)

---

## Pending
- [ ] RP3–RP11 NotebookLM infographics (add to INFOGRAPHIC_READY set in PracticalScreen)
- [ ] Sentry DSN: create at sentry.io → add VITE_SENTRY_DSN to .env.local + Vercel
- [ ] App Store screenshots: 5 screens in Figma

---

## After Every Update (mandatory)
1. `npx vercel --prod` — deploy
2. `git add [...] && git commit -m "..."` — commit
3. `git push origin main` — push
4. `npx cap sync ios` — sync Xcode

```
✅ Deployed to neurophysics.co.uk
✅ Pushed to GitHub
✅ cap sync ios done
✅ CLAUDE.md updated
```

---

## Key Behaviours
- Never rewrite working components unless asked
- Check existing files before creating new ones
- One task at a time — no bundling unrelated changes
- No new dependencies without asking
- Prefer small targeted edits over full rewrites
- Supabase is the backend — never suggest alternatives

---

## Knowledge Graphs (use BEFORE Grep/Glob/Read)

Two MCP graph tools are active. Use them first — they are faster and cheaper than file scanning.

**gitnexus** — 1,070 nodes, 1,908 edges, 84 execution flows
- `gitnexus_query({query: "concept"})` — find by concept
- `gitnexus_context({name: "symbolName"})` — callers, callees, flows
- `gitnexus_impact({target: "X", direction: "upstream"})` — blast radius before editing
- `gitnexus_detect_changes({scope: "staged"})` — pre-commit scope check
- Rebuild: `gitnexus analyze`

**code-review-graph** — 1,278 nodes, 6,664 edges, 120 files
- `semantic_search_nodes` — find functions/classes by name or keyword
- `get_impact_radius` — blast radius of a change
- `detect_changes` + `get_review_context` — token-efficient code review
- `get_architecture_overview` — high-level structure
- Rebuild: `python3.11 -m code_review_graph build`

<!-- gitnexus:start -->
<!-- gitnexus:end -->
<!-- code-review-graph MCP tools -->
