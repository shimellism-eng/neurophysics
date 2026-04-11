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
│   └── TermsScreen.jsx
│
├── components/
│   ├── AtomIcon.jsx
│   ├── BottomNav.jsx
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
- [ ] PWA manifest + service worker confirmed working
- [ ] RP3–RP11 infographics (generate in NotebookLM, add to INFOGRAPHIC_READY set)

---

## Coding Conventions

- All files are .jsx or .js — NOT TypeScript
- CSS custom properties for all colours — never hardcode hex values
- Component files: PascalCase. Utility/hook files: camelCase
- Screens go in src/screens/. Reusable UI goes in src/components/
- Data files go in src/data/. Follow existing naming pattern

## API / Security Conventions

- All serverless functions in `api/` require a valid Supabase Bearer token
- Auth is verified via `api/_verifyAuth.js` — uses `SUPABASE_JWT_SECRET` env var (HS256)
- Client-side: always pass `Authorization: Bearer <session.access_token>` to AI endpoints
- CORS: unknown origins return 403 — never default to first allowed origin
- Never accept API keys from request headers — server env vars only
- Rate limiting is per-IP in-memory (resets on cold start) — auth is the real protection

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
