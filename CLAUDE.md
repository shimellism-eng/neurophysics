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
│       ├── qb-forces.js
│       ├── qb-magnetism.js
│       ├── qb-particle.js
│       ├── qb-space.js
│       ├── qb-waves.js + part1/part2
│       └── qb-practicals.js        # 154 AQA questions for 11 required practicals
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
- [ ] PWA manifest + service worker confirmed working
- [ ] All exam boards wired in (currently AQA focus)

---

## Coding Conventions

- All files are .jsx or .js — NOT TypeScript
- CSS custom properties for all colours — never hardcode hex values
- Component files: PascalCase. Utility/hook files: camelCase
- Screens go in src/screens/. Reusable UI goes in src/components/
- Data files go in src/data/. Follow existing naming pattern

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
