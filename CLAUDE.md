# CLAUDE.md — NeuroPhysics

> Single source of truth for the NeuroPhysics project.
> Read this before touching any file. Do not ask clarifying questions covered here.

---

## Project Overview

**NeuroPhysics** is a GCSE Physics PWA built specifically for neurodivergent learners (ADHD, dyslexia, autism spectrum). It covers AQA GCSE Physics with plans to expand to all five UK exam boards.

- **Live domain:** neurophysics.co.uk
- **Local path:** `/Users/mamo/neurophysics/`
- **Owner:** Mamo — GCSE & A-Level Physics teacher, SEN specialist, ADHD
- **Related site:** physicalm.co.uk (tutoring business)

## Session Memory
- Read **memory.md** at the start of every session before touching any file
- Update **memory.md** at the end of every session before running the end-of-session checklist
- memory.md is the live session log — CLAUDE.md is the permanent architecture bible

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | React + Vite |
| Language | JSX (not TypeScript — all files are .jsx/.js) |
| Routing | React Router (screen-based navigation) |
| Auth | Supabase (`src/lib/supabase.js`) |
| State | React Context (AuthContext, MamoContext) |
| PWA | Vite PWA plugin with Workbox |
| Hosting | neurophysics.co.uk |

---

## Design System

### Theme
- **Mode:** Dark only
- **Font:** Bricolage Grotesque (Google Fonts)
- **Background:** `#0a0a0f`
- **Surface:** `#12121a`
- **Border:** `#1e1e2e`

### Accent Colours
| Token | Hex | Use |
|---|---|---|
| `--cyan` | `#00d4ff` | Primary actions, highlights |
| `--purple` | `#9b59b6` | Secondary, navigation |
| `--amber` | `#f39c12` | Warnings, equations |
| `--pink` | `#e91e8c` | Achievements, progress |

### UI Rules
- High contrast, minimum 4.5:1 ratio
- Large tap targets (min 48px)
- One concept per screen — no walls of text
- Progress always visible
- Immediate feedback on all interactions
- ADHD-friendly: chunked info, no cognitive overload

---

## Actual File Structure

```
/neurophysics/src/
├── App.jsx                          # Root app, routing
├── main.jsx                         # Entry point
├── index.css                        # Global styles + design tokens
│
├── context/
│   ├── AuthContext.jsx              # Supabase auth state
│   └── MamoContext.jsx             # App-wide state (progress, settings)
│
├── screens/                         # Route-level pages
│   ├── SplashScreen.jsx
│   ├── OnboardingScreen.jsx
│   ├── AuthScreen.jsx
│   ├── HomeScreen.jsx
│   ├── LearnScreen.jsx
│   ├── LessonPlayer.jsx            # Core lesson loop runner
│   ├── DiagnosticQuestion.jsx
│   ├── AdaptivePractice.jsx
│   ├── ExamPractice.jsx
│   ├── TimedPaper.jsx
│   ├── PaperResults.jsx
│   ├── Grade9Challenge.jsx
│   ├── MasteryScreen.jsx
│   ├── TopicMap.jsx
│   ├── PracticalScreen.jsx
│   ├── MisconceptionFeedback.jsx
│   ├── MamoChat.jsx                # AI chat feature
│   ├── ShareProgressScreen.jsx
│   ├── SettingsScreen.jsx
│   ├── PrivacyPolicyScreen.jsx
│   ├── TermsScreen.jsx
│   ├── LandingScreen.jsx           # Public homepage (unauthenticated /  route)
│   └── SpecChecklist.jsx           # Specification checklist at /spec-checklist
│
├── components/
│   ├── AtomIcon.jsx
│   ├── BottomNav.jsx
│   ├── PublicHeader.jsx             # Website nav header (landing page only)
│   ├── BreakNudge.jsx              # ADHD break reminders
│   ├── CircuitSymbols.jsx
│   ├── HeartsDisplay.jsx           # Lives/hearts system
│   │
│   ├── lesson/                     # Lesson loop steps
│   │   ├── HookCard.jsx
│   │   ├── PriorKnowledgeProbe.jsx
│   │   ├── VocabPreTeach.jsx
│   │   ├── WorkedExampleStepper.jsx
│   │   ├── GuidedPracticeFader.jsx
│   │   ├── DualCodingSummary.jsx
│   │   └── SessionClose.jsx
│   │
│   └── questions/                  # Question type components
│       ├── CalculationQuestion.jsx
│       ├── ConfidenceQuestion.jsx
│       ├── DiagramQuestion.jsx
│       ├── ExtendedAnswerQuestion.jsx
│       ├── FillStepsQuestion.jsx
│       ├── GraphQuestion.jsx
│       ├── HotspotQuestion.jsx
│       ├── MisconceptionQuestion.jsx
│       ├── SequenceSortQuestion.jsx
│       ├── TapMatchQuestion.jsx
│       └── index.js
│
├── data/
│   ├── topics.jsx                  # Master topic index
│   ├── topics-electricity.jsx
│   ├── topics-energy.jsx
│   ├── topics-forces.jsx
│   ├── topics-matter.jsx
│   ├── topics-waves.jsx
│   ├── topics-practicals.jsx       # Required Practicals topic metadata
│   ├── topics-keyconcepts.jsx      # Edexcel Key Concepts: SI units, scalars, equations
│   ├── topics-globalchallenges.jsx # OCR Gateway A P8: transport safety, electricity costs
│   ├── topics-universe.jsx         # OCR 21C P7: telescope optics, HR diagram, astronomy history
│   ├── examIndex.js
│   ├── examCalculations.js
│   ├── examChained.js
│   ├── examDiagramQs.js
│   ├── examDiagrams.jsx
│   ├── examEquations.js
│   ├── examExtended.js
│   ├── examGraphs.js
│   ├── examNovelContext.js
│   ├── examParticleModel.js
│   ├── examPracticals.js
│   ├── examRPAErrors.js
│   ├── examSpace.js
│   ├── interactiveIndex.js
│   ├── interactiveQuestions.js
│   ├── interactiveQuestions2.js
│   ├── practicals.js
│   ├── questionBank.js
│   ├── visuals-helpers.jsx
│   └── questionBank/
│       ├── index.js
│       ├── qb-atomic.js + part1/part2
│       ├── qb-electricity.js + part1/part2
│       ├── qb-energy.js
│       ├── qb-forces.js            # + WJEC circular motion + CCEA hydraulics
│       ├── qb-magnetism.js
│       ├── qb-particle.js
│       ├── qb-space.js
│       ├── qb-waves.js + part1/part2  # + WJEC seismic waves + CCEA diverging lenses
│       ├── qb-practicals.js        # 154 questions for 11 required practicals
│       ├── qb-keyconcepts.js       # Edexcel Topic 1 — SI units, scalars, equation rearranging
│       ├── qb-globalchallenges.js  # OCR Gateway A P8 — transport safety, electricity costs
│       └── qb-universe-ocr.js      # OCR 21C P7 — telescope optics, HR diagram, astronomy history
│
├── hooks/
│   ├── useAdaptive.js
│   ├── useHearts.jsx
│   ├── useInsights.js
│   ├── useProgress.js
│   ├── useSessionTimer.js
│   └── useSound.jsx
│
├── lib/
│   └── supabase.js                 # Supabase client
│
└── utils/
    ├── notifications.js
    ├── secureStorage.js
    └── tts.js                      # Text-to-speech
```

---

## Key Features Already Built

- Supabase auth (login/signup)
- Onboarding flow
- Hearts/lives system (useHearts, HeartsDisplay)
- Break nudge system (BreakNudge) — ADHD support
- Session timer (useSessionTimer)
- Text-to-speech (tts.js)
- Adaptive practice engine (useAdaptive, AdaptivePractice)
- Exam practice screens (timed paper, results, Grade 9 challenge)
- Full question bank across all major AQA topics
- 10 question types (calculation, diagram, hotspot, graph, sequence, etc.)
- Lesson player with multi-step lesson components
- Topic map
- Practical screen
- Misconception feedback screen
- MamoChat (AI chat feature)
- Progress sharing screen
- Settings, Privacy Policy, Terms screens

---

## Current Status

- [x] Scaffold complete
- [x] Routing set up
- [x] Design tokens applied globally
- [x] Auth (Supabase) working
- [x] Onboarding flow built
- [x] Hearts/lives system built
- [x] Break nudge (ADHD support) built
- [x] Session timer built
- [x] Text-to-speech built
- [x] Lesson player built
- [x] All lesson step components built
- [x] All 10 question type components built
- [x] Question bank built (energy, forces, waves, electricity, atomic, magnetism, particle, space)
- [x] Exam practice screens built
- [x] Adaptive practice built
- [x] Topic data files built (electricity, energy, forces, matter, waves)
- [x] Exam data files built (calculations, diagrams, graphs, extended, practicals, etc.)
- [x] MamoChat built
- [x] Practical screen built (PracticalScreen.jsx — 7 tabs, progress tracking)
- [x] Topic map built
- [x] Required Practicals module on Learn screen (11 practicals, teal, FlaskConical)
- [x] 154 AQA exam questions for all 11 required practicals (qb-practicals.js)
- [x] AI marking for all extended writing (extended, short_answer, novel-context types — api/mark.js)
- [x] Course filtering for Grade9Challenge and TimedPaper
- [x] Lesson progress resume (localStorage)
- [x] HomeScreen InsightsPanel (accuracy, strong/weak topics)
- [x] AdaptivePractice screen + useAdaptive hook
- [x] Deployed to neurophysics.co.uk
- [x] NotebookLM infographics in Method tab (RP1, RP2 live — RP3–RP11 pending)
- [x] NovelContextQuestion extracted to shared component with AI marking
- [x] Back button exits lesson to home + saves progress mid-lesson
- [x] markStarted fires when user advances past hook (not only at quiz)
- [x] Space Physics module shows "Physics only" badge on Learn screen
- [x] Security hardening: JWT auth on all AI endpoints (api/mark, api/gemini, api/anthropic)
- [x] Security hardening: JWT signature verified in delete-account
- [x] Security hardening: CORS rejects unknown origins with 403
- [x] Security hardening: HSTS + tightened CSP in vercel.json
- [x] SUPABASE_JWT_SECRET added to Vercel — auth fully enforced
- [x] All AQA mentions removed from user-facing text (board-agnostic language throughout)
- [x] Multi-board infrastructure: boardConfig.js, board picker in Settings, LearnScreen board filtering
- [x] Multi-board Phase 1: 6 boards supported (AQA, Edexcel, OCR-A, OCR-B, WJEC, CCEA)
- [x] CCEA A*-G grade system in PaperResults (with C* grade)
- [x] Board-specific module stubs: Key Concepts (Edexcel), Global Challenges (OCR-A), Studying the Universe (OCR-B)
- [x] Multi-board Phase 2: question banks wired in (qb-keyconcepts, qb-globalchallenges, qb-universe-ocr imported in index.js)
- [x] Multi-board Phase 2d/2e: WJEC circular motion (8q) + seismic waves (5q); CCEA hydraulics (5q) + diverging lenses (6q)
- [x] Board filtering in getNextQuestion/getQuestionsForTopic — questions with boards:[] only shown for matching board
- [x] AdaptivePractice passes selected board to getNextQuestion
- [x] LearnScreen: topics with empty lessonSteps route to /practice/:topicId (board-specific practice topics)
- [x] Phase 3: Board selector as step 3/5 in onboarding flow (right after sign-in)
- [x] Phase 3: StepGoal shows CCEA A*–G grade options vs 9-1 based on selected board
- [x] Phase 3: HomeScreen "🏆 Target: Grade X" chip — shows "Target: A*" for CCEA (board-coloured)
- [x] Multi-board consistency audit + fixes: Grade9Challenge, LearnScreen, MasteryScreen, PaperResults, PracticalScreen, OnboardingScreen all board-aware
- [x] PracticalScreen: header badge translates RP→CP/PAG/SP/PP per board (practicalShort from boardConfig)
- [x] All 'Grade 9' labels/buttons now compute from getSelectedBoard().gradeSystem — shows 'Grade A*' for CCEA
- [x] LearnScreen 'Start here' CTA checks lessonSteps before routing to /lesson/ vs /practice/
- [x] Full lesson content for 8 board-specific topics: topics-keyconcepts.jsx (Edexcel — SI Units, Scalars, Equations), topics-globalchallenges.jsx (OCR-A — Transport Safety, Electricity Costs), topics-universe.jsx (OCR-B — Telescope Optics, HR Diagram, History of Astronomy)
- [x] All 8 topics have full 9-step lesson schema + interactive React/SVG visual components (lessonVisual, ideaVisual, realityVisual)
- [x] PWA service worker live — vite-plugin-pwa, Workbox, 45 entries precached, offline support
- [x] App experience audit (5-agent) + Phase 1 fixes: TimedPaper memory leak, BottomNav Learn-tab active state on lesson/exam/practical routes, LessonPlayer STEPS filter (no null screens), resume step validation, break nudges + elapsed timer in lesson, AI marking 30s timeout + auth guard (ExtendedAnswerQuestion), Cache-Control headers for static assets, CSP updated for cdnfonts.com, TTS buttons in HookCard + WorkedExampleStepper
- [x] App experience audit Phase 2 fixes: PriorKnowledgeProbe state preserved on back navigation, AdaptivePractice AI marking auth token + timeout, board name badge on HomeScreen
- [x] useSessionTimer: sessionStorage persistence so refresh doesn't reset ADHD break timer (fixed crash from bad useRef init pattern)
- [x] LearnScreen routing fix: new 9-step topics (topic.hook) now correctly route to /lesson/:id — was incorrectly routing to /practice/:id because check only tested legacy topic.lessonSteps field
- [x] Examiner audit of all 11 Required Practicals across all 6 boards (AQA/Edexcel/OCR-A/OCR-B/WJEC/CCEA) — 3 agents deployed in parallel
- [x] All critical examiner-identified errors fixed in practicals.js and qb-practicals.js: voltmeter placement (RP1), energy table typo (RP1), IV definitions (RP1/RP5/RP6), liquid density method (RP5), latent heat sample data (RP6), hazard format (RP6), RP7 axes + units, RP8 air track→trolley, RP9 frequency/stroboscope/longitudinal, RP10 4th Leslie face + radiator error, RP11 plane mirror Part A + r notation
- [x] RP4 fixes: protective resistor 10Ω→100Ω, lamp I-V data symmetry corrected, iv_t2_04 question values made consistent with sample data, diode threshold unified to 0.6–0.7V
- [x] Fix "AI marking unavailable": replaced manual HS256 JWT crypto in _verifyAuth.js with Supabase admin getUser() — works with any JWT algorithm; all callers updated to await async function; NovelContextQuestion auth guard hardened + 30s timeout added
- [x] Practical simulation diagram audit + fixes: RP1 label colours, RP3 label overflow, RP4 diode value, RP5 overlapping labels, RP7 extension label, RP8 air track→dynamics trolley+wheels, RP9 wavelength scale, RP10 contrast bug, RP11 glass block + ray box labels
- [x] Security Fix 1: .env.production removed from git tracking; .env + .env.production added to .gitignore
- [x] Security Fix 2: unsafe-inline removed from script-src CSP (Vite builds only external script tags — safe)
- [x] Security Fix 3: in-memory rate limiters replaced with Upstash Redis persistent sliding window (api/mark.js + api/gemini.js); api/anthropic.js deleted (dead code); ANTHROPIC_API_KEY removed from Vercel
- [x] Security Fix 4: getValidatedBoard() added to boardConfig.js — whitelists np_board against Object.keys(BOARDS) before use; SettingsScreen.jsx + getSelectedBoard() both use it; no raw localStorage.getItem('np_board') calls remain outside boardConfig.js
- [x] Public landing page (LandingScreen.jsx) — shown to unauthenticated visitors at /; hero, stats, how-it-works, module pills, footer; PublicHeader.jsx; BottomNav/FloatingMamo hidden when not logged in
- [x] ip variable bug fixed in api/mark.js (was ReferenceError on usage log line)
- [x] Onboarding reduced to 3 steps: Board → Goal → Prefs (skippable) → Profile (skippable); StepValueProp removed from flow (landing page covers it)
- [x] +50 XP celebration badge added to SessionClose.jsx (animated amber badge + 🔥 line)
- [x] SpecChecklist.jsx — spec checklist screen at /spec-checklist; all 58 topics, mastered/in-progress/not-started, board-filtered, collapsible module sections
- [x] TTS consistency: GuidedPracticeFader.jsx now has TTS buttons on all tiers; VocabPreTeach uses shared speak() from tts.js
- [x] Sentry error monitoring: @sentry/react installed; initialised in main.jsx behind VITE_SENTRY_DSN env guard; PII stripped before send (ICO Children's Code); vendor-sentry chunk added
- [x] Chunk splitting: 6 missing exam data files added to data-exam manual chunk in vite.config.js (examChained, examDiagramQs, examDiagrams, examExtended, examNovelContext, examRPAErrors)
- [x] Age verification on consent screen: DOB (month + year) input; under-13 blocked with red warning (COPPA/ICO); age confirmation checkbox shows confirmed age; under-16 parent/guardian reminder
- [x] PracticalScreen Explore tab: 8th tab with PhET + WithDiode external simulation links for all 11 practicals
- [x] PracticalScreen Data Collection mode: Record button + chip list + live ScatterGraph for 8 practicals (RP1,RP3,RP4,RP5,RP7,RP8,RP9,RP11); useDataCollector hook in src/hooks/useDataCollector.js
- [ ] RP3–RP11 infographics (generate in NotebookLM, add to INFOGRAPHIC_READY set)
- [ ] Sentry DSN: create account at sentry.io, add VITE_SENTRY_DSN to .env.local + Vercel env vars to activate error monitoring
- [ ] App Store screenshots: create 5 screens in Figma (hook card, worked example, adaptive practice, progress, MamoChat)

---

## Coding Conventions

- All files are .jsx or .js — NOT TypeScript
- CSS custom properties for all colours — never hardcode hex values
- Component files: PascalCase. Utility/hook files: camelCase
- Screens go in src/screens/. Reusable UI goes in src/components/
- Data files go in src/data/. Follow existing naming pattern
- **NEVER delete any code, file, or content without explicit user permission — always add/edit only**
- **Lesson routing: check `topic.hook` (new 9-step flow) OR `topic.lessonSteps?.length > 0` (legacy) — never check lessonSteps alone**
- **ALWAYS end every session with the full checklist: Vercel deploy + GitHub push + cap sync ios + CLAUDE.md update**

## API / Security Conventions

- All serverless functions in `api/` require a valid Supabase Bearer token
- Auth is verified via `api/_verifyAuth.js` — uses `SUPABASE_JWT_SECRET` env var (HS256)
- Client-side: always pass `Authorization: Bearer <session.access_token>` to AI endpoints
- CORS: unknown origins return 403 — never default to first allowed origin
- Never accept API keys from request headers — server env vars only
- Rate limiting is per-IP via Upstash Redis (persistent, survives cold starts) — 20 req/60s sliding window; shared helper in api/_rateLimit.js; fails open if UPSTASH env vars not set

## Multi-Board Conventions

- Board selection stored in `localStorage` key `np_board` — default `'aqa'`
- Board metadata lives in `src/utils/boardConfig.js` — single source of truth
- Module `boards: ['edexcel']` array restricts a module to specific boards; no field = universal
- Topic `boards: []` field restricts a topic; used in board-specific question bank questions
- CCEA uses A*-G grade system — always check `board.gradeSystem === 'A*-G'` before showing 9-1 UI
- Edexcel uses g = 10 N/kg; AQA/OCR/WJEC use 9.8 — read from `BOARDS[boardId].g`
- New board-specific question bank files: `qb-keyconcepts.js`, `qb-globalchallenges.js`, `qb-universe-ocr.js`

---

## After Every Update (mandatory — do not skip)

1. `npx vercel --prod` — deploy to neurophysics.co.uk
2. `git add [changed files] && git commit -m "..."` — commit to main
3. `git push origin main` — push to GitHub
4. `npx cap sync ios` — sync to Xcode for TestFlight
5. Update this CLAUDE.md — Current Status and any new conventions

**Always end every session by printing this exact checklist with tick/cross status:**
```
✅ Deployed to neurophysics.co.uk
✅ Pushed to GitHub
✅ cap sync ios done
✅ CLAUDE.md updated
```

---

## Key Behaviours for Claude Code

- **Never rewrite working components** unless explicitly asked
- **Always check existing files first** before creating new ones — it probably already exists
- **One task at a time** — do not bundle unrelated changes
- **After each change**, confirm what was changed and what to do next
- **Do not add new dependencies** without asking first
- **Prefer small targeted edits** over full file rewrites
- **Check src/data/ before writing new data** — the question bank is extensive
- **Supabase is the backend** — do not suggest Firebase or other alternatives
- **If context is getting long**, stop, summarise, and confirm next step before continuing
- **Run npm run build** after significant changes to catch errors early
- **Never remove content without explicit user approval**
