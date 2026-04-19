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

## Evidence-Based Improvement Roadmap

> Based on cognitive science research (Rosenshine, Dunlosky, Mayer), WCAG 2.2 AA, BDA Style Guide, PhET accessibility research, and neurodivergent UX best practices.
> Work through items in sprint order. Each numbered item is a standalone commit.
> Mark items [x] when shipped. Check this section on every session to see what's done and what's next.

### Sprint 1: Core Differentiators

#### 1.1 Comfort Settings Panel ✅ shipped bea42bc
- [x] Create `ComfortProvider` React context wrapping the entire app
- [x] Create `ComfortSettings` component, accessible from persistent icon in app header (sliders/accessibility icon)
- [x] Also accessible from main settings page
- [x] First-time-use prompt on first login: "Set up your learning preferences"
- [x] Controls to implement:
  - Font Size: slider 0.8rem to 1.6rem, default 1rem, honour system Dynamic Type
  - Font Family: toggle Atkinson Hyperlegible | OpenDyslexic | System Default
  - Line Spacing: slider 1.5 to 2.5, default 1.7
  - Background: picker Dark (#0F0F1A) | Cream (#FFF8E7) | Light Blue (#E8F4FD) | Light Yellow (#FFF9DB)
  - Reduced Motion: toggle On | Off | System Default
  - Sound Effects: toggle On | Off
  - Celebrations: toggle On | Off (confetti, animations, celebratory sounds)
  - TTS Speed: slider 0.5x to 2.0x, default 1.0x
  - TTS Auto-read: toggle Auto-read questions | Manual only
  - Reading Ruler: toggle On | Off
  - Colour Overlay: toggle + colour Off | Yellow | Blue | Pink | Green
  - Challenge Mode: toggle Hearts/Lives On | Off
  - Session Length: selector 5 min | 10 min | 15 min | 25 min
- [x] Apply preferences globally via CSS custom properties set on :root by ComfortProvider
- [x] Store in Supabase `user_preferences` table (user_id, preference_key, preference_value, updated_at)
- [x] Load on app mount, apply immediately, no reload on changes
- [x] Preset profiles:
  - "Dyslexia-friendly": OpenDyslexic, line spacing 2.0, cream background, overlay yellow, reading ruler on
  - "ADHD-friendly": reduced celebrations, session length 10 min, font size 1.1rem
  - "Low sensory": reduced motion on, sound off, celebrations off, dark background
  - "High contrast": all ratios 7:1+, font size 1.2rem
- [x] "Reset to Defaults" button
- [x] Cache locally (localStorage) for offline PWA, sync to Supabase when connected

#### 1.2 Hearts/Lives Opt-In ✅ shipped (see commit after bea42bc)
- [x] Default mode: unlimited attempts with diagnostic feedback, no penalty (`exploreMode: true` default)
- [x] Hearts/lives only when "Challenge Mode" toggled on in Comfort Settings
- [x] Replace punitive language: overlay now reads "Nearly there!" + "Those tricky questions are exactly where the learning happens." + hint to disable hearts
- [x] Add "Revision Mode" badge: green REVISION pill shown in lesson header when exploreMode is active
- [x] Live reactivity: LessonPlayer reads `exploreMode` from `useComfort()` — toggling in Settings takes effect without page reload
- [x] Store mode preference in Supabase, persist across sessions (via ComfortContext sync)

#### 1.3 Session Framing ✅ shipped 8ab0727
- [x] Session Preview Screen before every lesson/practice: "This session has [X] parts, about [Y] minutes"
- [x] List each part with estimated time
- [x] Two buttons: [Start Session] and [Not now]
- [x] Calculate estimated time from content length + user's average pace if available
- [x] Optional Pomodoro timer during session (Comfort Settings controlled, default off)
- [x] Timer end = gentle break suggestion, never forced stop

#### 1.4 Quick Win Mode ✅ shipped ccec6c2
- [x] "Quick Win" card on dashboard, prominent position
- [x] One tap to start, no setup
- [x] 5 questions, ~3 minutes
- [x] Pull from SRS due questions if available, otherwise random mix
- [x] Results: "4/5 correct! Topics: Forces, Waves, Energy"
- [x] Always available, never locked behind progress gates

### Sprint 2: Accessibility Foundation

#### 2.1 Typography Overhaul ✅ shipped
- [x] Import Atkinson Hyperlegible from Google Fonts
- [x] Bricolage Grotesque for headings (h1-h3), nav, brand, logo ONLY
- [x] All body/label/button/input/feedback/question text to Atkinson Hyperlegible
- [x] CSS vars: `--font-body: 'Atkinson Hyperlegible', sans-serif` and `--font-display: 'Bricolage Grotesque', sans-serif`
- [x] Global line-height: 1.7 on body text
- [x] Letter-spacing: 0.04em on body text
- [x] All body text left-aligned (remove center/justify on paragraphs)
- [x] No italic for emphasis, use bold or accent colour
- [x] Comfort Settings font toggle overrides these defaults

#### 2.2 Contrast Audit ✅ shipped 4536072
- [x] Dark background to #0F0F1A or #1A1A2E, not pure black
- [x] All body text: min 4.5:1 contrast
- [x] Large text (18px+ or 14px+ bold): min 3:1
- [x] UI elements (buttons, toggles, sliders, borders): min 3:1
- [x] Check cyan accent on dark. If below 4.5:1, lighten to ~#4AEAFF
- [x] Never colour alone for meaning, always pair with label or icon

#### 2.3 Touch Targets ✅ shipped ae0dc8a
- [x] Min 48x48px all interactive elements
- [x] Min 8px spacing between adjacent targets
- [x] MCQ options: full-width cards, min 16px padding
- [x] All drag-and-drop: add tap-to-select, tap-to-place alternative
- [x] All sliders: add + and - step buttons
- [x] Equation card flip: add visible "Flip card" button

#### 2.4 Reduced Motion ✅ shipped 7b0e213
- [x] Respect `prefers-reduced-motion: reduce` globally
- [x] Disable CSS transitions/transforms/keyframes (except opacity) when active
- [x] Wrap all JS animations in motion preference check
- [x] Create `useReducedMotion()` hook reading system pref AND Comfort Setting (in-app overrides system)

#### 2.5 Screen Reader & Keyboard ✅ shipped 51b6801
- [x] All interactive elements focusable (Tab, Enter, Arrows, Escape)
- [x] Visible focus indicators on all focusable elements
- [x] ARIA labels on all custom interactive elements
- [x] `aria-live="polite"` for dynamic content (scores, feedback, sim values)
- [x] Meaningful alt text on all images, `alt=""` on decorative

### Sprint 3: Instructional Engine

#### 3.1 Spaced Repetition (SM-2) ✅ shipped 4b95c87
- [x] Supabase table `user_question_progress`: user_id, question_id, ease_factor (default 2.5), interval_days (default 1), repetition_count (default 0), last_reviewed, next_due, correct_streak (default 0), total_attempts (default 0), total_correct (default 0)
- [x] SM-2 algorithm: correct increases interval (1/3/7/14/30/60 days), ease up (max 3.0). Incorrect resets interval to 1, ease down (min 1.3)
- [x] `useSRS()` hook: fetch due questions, return count per topic, provide updateProgress(), sort overdue first then lowest ease
- [x] Dashboard: "Due for Review" badge, per-topic status (green/amber/red), "Start Review" button
- [x] Queue SRS updates offline, sync when connected
- ⚠️ Supabase table must be created manually — run SQL in memory.md in Supabase dashboard

#### 3.2 Diagnostic Feedback ✅ shipped c43d6eb
- [x] Incorrect answer shows 3-layer card: correct answer (green) + senNote as "why" explanation + action buttons
- [x] "Ask Mamo" button (wrong answers only) opens MamoChat with question/wrong/correct pre-filled in input
- [x] "Show concept" button routes to lesson/practical/practice for the topic
- [x] Track misconception frequency via src/utils/misconceptions.js (localStorage, Supabase sync deferred to class dashboard)
- [x] Correct answer: "Got it!" + "X in a row" streak indicator for 3+ consecutive correct
- Note: `misconception_tags` field not added to question bank — questions use `senNote` as explanation source

#### 3.3 Interleaved Practice ✅ shipped a3d66f5
- [x] "Mixed Revision" mode: questions from multiple topics, SRS-weighted
- [x] Colour-coded topic label on each question card (QuickWinScreen + MixedRevisionScreen)
- [x] Per-topic result breakdown in module colours

#### 3.4 Micro-Topic Segmenting ✅ shipped
- [x] Step counter: "Step N of N" in progress bar row
- [x] Persistent segmented progress bar showing position in full lesson loop (already existed, retained)
- [x] "I need a break" button: saves step to localStorage, returns to home
- [x] HomeScreen: "Resume: [topic]" card when a break position is saved
- [ ] Content audit: break long explanations into sub-steps (manual content work — deferred to Mamo)

### Sprint 4: Neurodivergent UX Polish

#### 4.1 Transition Warnings ✅ shipped
- [x] Before screen transitions: "Coming up: [label] · [hint]" strip above Next button
- [x] Consistent transition animation: slide respects reducedMotion (opacity-only fade when on)
- [x] Never auto-advance: already true — all advances require explicit tap
- [x] Never auto-play media: TTS already requires tap (speak() only on button click)
- [x] End of section: "Coming up next / [topic title]" on done step's Next Topic CTA

#### 4.2 Lesson Map View ✅ shipped
- [x] Lesson outline accessible from any point (persistent icon)
- [x] All steps shown, current highlighted
- [x] Jump to completed steps only
- [x] Estimated time remaining

#### 4.3 Reading Ruler ✅ shipped
- [x] Semi-transparent horizontal bar (~2 lines tall, user-chosen colour)
- [x] Mobile: follows scroll. Desktop: follows mouse Y
- [x] Works on concept explanations, feedback cards, question stems
- [x] Global overlay component from ComfortProvider, pointer-events: none

#### 4.4 Colour Overlay ✅ shipped
- [x] Semi-transparent tint over main content (not nav/settings)
- [x] Yellow (#FFF9DB 30%) | Blue (#E8F4FD 25%) | Pink (#FFE8F0 25%) | Green (#E8F5E9 25%)
- [x] CSS pseudo-element or overlay div, pointer-events: none

### Sprint 5: Physics Content

#### 5.1 Equation Builder ✅ shipped d4302bf
- [x] EquationBuilder component: select equation then input known values then step-by-step solve
- [ ] KaTeX rendering, min 1.2em, generous spacing
- [ ] Consistent variable colour-coding across entire app: velocity=cyan, force=amber, energy=green, time=pink, mass=purple
- [ ] Show triangle method alongside algebraic rearrangement
- [ ] TTS reads steps if enabled
- [ ] Practice mode: given values, select equation first, then solve
- [ ] aria-label on equations with spoken form

#### 5.2 Sim Accessibility ✅ shipped
- [x] Keyboard nav on all sims (Tab, Enter, Arrows — native range inputs + ± buttons)
- [x] ARIA labels on all sim elements (role="img" aria-label on all SVGs across 8 topic files)
- [x] aria-live regions for value changes (SimSlider value display + SimNarration panel)
- [x] + and - step buttons alongside every slider (SimSlider component, 32px tap targets)
- [x] "What's happening" narration toggle (SimNarration collapsible panel on all lesson sims)
- [ ] Tap-to-select, tap-to-place for drag-and-drop (no drag-and-drop sims exist currently)

#### 5.3 Sonification (Stretch Goal)
- [ ] Forces: pitch maps to net force, pulse tempo to acceleration
- [ ] Waves: play sound wave shown, pitch mapping for EM
- [ ] Electricity: hum pitch maps to current, clicks for charge carriers
- [ ] Energy: rising tone for KE increase
- [ ] Off by default, speaker icon toggle per sim
- [ ] Respect Sound Effects setting, volume slider per sim

#### 5.4 Abstract Concept Scaffolding (concrete then visual then abstract)
- [ ] Forces: real photo/video then interactive FBD then body-based language
- [ ] Energy: "bank account" analogy then consistent colours then animated Sankey
- [ ] Waves: slinky video then sim with sound output then persistent labels
- [ ] Electricity: animated charges then water pipe parallel then tap-to-add circuits
- [ ] Particles: macro zoom-in then temperature slider then state labels

### Sprint 6: Teacher Dashboard

#### 6.1 Misconception Analytics
- [ ] Teacher dashboard (Supabase role check)
- [ ] Class overview: progress, completion, time-on-task
- [ ] Misconception heatmap: topics x misconceptions, colour = frequency
- [ ] Learner drill-down: SRS progress, errors, comfort settings, session patterns
- [ ] Stuck learner alerts: 5+ attempts same topic, or 7+ days inactive

#### 6.2 SEND Progress Tracking
- [ ] Differentiated targets per learner
- [ ] Optional SEND grouping (teacher-set, never shown to learners)
- [ ] Track: session length, preferred times, comfort settings, progress velocity
- [ ] Export PDF/CSV for IEP reviews, EHCP annual reviews, parents evenings

#### 6.3 Class Management
- [ ] Create classes, invite via code or email
- [ ] Assign topics/sessions to individuals or groups
- [ ] Real-time progress during sessions
- [ ] Nudge messages through the app

### Roadmap Global Rules

- State: React Context for comfort settings. Supabase for persistent data. Local state for ephemeral UI only
- Performance: Lazy-load ComfortSettings, teacher dashboard, equation builder (React.lazy + Suspense)
- PWA/Offline: SRS data and comfort settings work offline. Queue Supabase updates, sync when connected
- Testing after each sprint: screen reader, keyboard-only, 200% zoom, reduced motion, each comfort preset, 375px width
- Mobile-first: all new components. Test 375px minimum
- Do not break existing features. Additive or controlled replacement only. Feature flag if unsure
- Commit format: `type(scope): [item] description` types: feat/fix/refactor/docs/test scopes: comfort/a11y/engine/ndux/physics/dashboard
