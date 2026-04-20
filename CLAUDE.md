# CLAUDE.md — NeuroPhysics

> Architecture bible. Read this + memory.md before touching any file.

---

## Tooling Rules (read first — stops context exhaustion)

**Use Serena MCP semantic tools BEFORE reading any file.** Reading whole React screens (LessonPlayer, App.jsx, HomeScreen, etc.) has repeatedly exhausted context and forced session summaries. Don't.

### Always try first
- `mcp__serena__get_symbols_overview` — get the shape of a file (classes, functions, exports) before reading any of it
- `mcp__serena__find_symbol` — jump to a specific function / component / hook by name path (e.g. `LessonPlayer`, `useProgress/markStarted`)
- `mcp__serena__find_referencing_symbols` — "what uses this?" lookups instead of grep
- `mcp__serena__replace_symbol_body` — edit a single function/component without rewriting the whole file

### When it's OK to read a whole file
Only if one of these is true:
- File is **<50 lines**
- File is **config, markdown, CSS, or JSON**
- You already ran `get_symbols_overview` and genuinely need every symbol

### Never
- Never `Read` a React screen (anything in `src/screens/` or `src/components/`) as your first move — use `get_symbols_overview` first
- Never grep for a function name when `find_symbol` will find it
- Never read a 2000-line file to edit one function — use `find_symbol` + `replace_symbol_body`

---

## Session Memory

- **At session start:** read `memory.md` at project root. It's the live session log — the last session's state, what's broken, what's queued.
- **Before end-of-session commit:** update `memory.md` with what changed, what's still pending, anything Mamo needs to know next time.
- **CLAUDE.md = permanent conventions** (design tokens, security, board rules). **memory.md = live log** (what just happened).

---

## About This Project

**NeuroPhysics** — GCSE Physics PWA for neurodivergent learners (ADHD, dyslexia, autism).

- **Stack:** React + Vite, **JSX only — no TypeScript**. Supabase auth. Vercel hosting. iOS wrapper via Capacitor.
- **Boards covered (six):** AQA, Edexcel, OCR-A, OCR-B, WJEC, CCEA.
- **Live:** neurophysics.co.uk
- **Owner:** Mamo — physics teacher, SEN specialist, ADHD.

---

## Talking to Mamo

- Plain English. Short chunks. No walls of text.
- **WHY before WHAT** — explain the reason for a change before the diff.
- **Flag terminal commands explicitly** — if Mamo needs to run something, call it out ("run this in Terminal:") rather than burying it in prose.
- Assume **zero Xcode knowledge** — walk through Xcode steps, don't assume he knows where Product > Archive lives.

---

## Do Not

- **Don't read whole files** before trying Serena's symbolic tools first.
- **Don't commit `.env*` files** — ever.
- **Don't skip the memory.md update** at session end — future sessions rely on it.
- **Don't change working scroll/padding** without an explicit bug report from Mamo. If a screen already scrolls, leave its `paddingBottom` / `overflow` / `minHeight` / safe-area values alone.

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
- **Never touch working scroll/padding** — if a screen scrolls fine, do NOT change its `paddingBottom`, `overflow`, `minHeight`, or safe-area values unless the user reports it broken
- Bottom nav clearance: `paddingBottom: 'calc(96px + env(safe-area-inset-bottom, 0px))'` on scroll containers — never reduce this
- iOS flex scroll: `flex-1 overflow-y-auto` inside `flex flex-col h-full` always needs `style={{ minHeight: 0 }}` — never remove

---

## Tool Auto-Selection Rules

**Never ask Mamo which tool to use. Auto-select based on the task.**

### When Mamo says → Use this tool automatically

| Trigger | Tool | Action |
|---|---|---|
| "fix [bug]" / "why is X broken" / "not working" | gitnexus | `gitnexus_query` on the symptom first |
| "change/edit/update [function or component]" | gitnexus | `gitnexus_impact` before touching anything |
| "rename X to Y" | gitnexus | `gitnexus_rename(dry_run:true)` — never find-and-replace |
| "how does X work" / "where is X" / "find X" | code-review-graph | `semantic_search_nodes` |
| "what uses X" / "what calls X" / "what imports X" | code-review-graph | `query_graph` with callers_of/imports_of |
| "add a question" / "add topic data" | Read existing file first | Check `src/data/` before writing anything new |
| "how do I use [Supabase/React/Vite/React Router]" | context7 | Auto-call `resolve-library-id` + `get-library-docs` |
| "pack/summarise the codebase" / large context needed | repomix | `pack_codebase` with `compress:true` |
| before any commit | gitnexus | `gitnexus_detect_changes` — always |
| "review these changes" | code-review-graph | `detect_changes` + `get_review_context` |

### Always do without being asked
- Before editing ANY function/component: run `gitnexus_impact` silently, proceed only if LOW/MEDIUM risk (report HIGH/CRITICAL to Mamo before continuing)
- When a library API is involved: call context7 in the background, don't ask Mamo for the docs
- After every session: deploy + git push + cap sync ios (the end-of-session checklist)
- After fixing a bug: run `npm run build` to confirm no errors introduced

### Never do
- Never Grep for a function when `semantic_search_nodes` can find it
- Never read a full file to find one function — use serena `find_symbol` or gitnexus `context`
- Never paste library docs into the conversation — use context7
- Never ask "which tool should I use?" — decide silently

---

## Knowledge Graphs

Two MCP graph tools are active — use before Grep/Glob/Read.

**gitnexus** — 1,070 nodes, 1,908 edges, 84 flows
- `gitnexus_query({query})` · `gitnexus_context({name})` · `gitnexus_impact({target, direction})` · `gitnexus_detect_changes({scope})`
- Rebuild: `gitnexus analyze`

**code-review-graph** — 1,278 nodes, 6,664 edges
- `semantic_search_nodes` · `get_impact_radius` · `detect_changes` · `get_architecture_overview`
- Rebuild: `python3.11 -m code_review_graph build`

<!-- gitnexus:start -->
<!-- gitnexus:end -->
<!-- code-review-graph MCP tools -->

---

---

See ROADMAP.md for the feature roadmap.
See REDESIGN.md for the UI/UX redesign tracker.
When working on redesign tasks, read REDESIGN.md only. When working on feature tasks, read ROADMAP.md only. Never read both in the same session.
