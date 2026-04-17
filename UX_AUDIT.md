# NeuroPhysics UX/UI Audit
Date: 2026-04-17
Framework: Nielsen's 10 Heuristics + Krug's "Don't Make Me Think"
Status: IN PROGRESS

Severity scale: 0=not a problem · 1=cosmetic · 2=minor friction · 3=major · 4=catastrophic

---

## Phase 1: Navigation & Information Architecture
### Score: 7/10

### Findings:

**Strengths:**
- 4-tab bottom nav — within the 7±2 cognitive limit ✅
- Nav labels always visible (not just active) — good for neurodivergent users ✅
- Smart active state: Learn tab highlights for /lesson/, /exam/, /practice/, /practical/ etc ✅
- Safe-area padding correctly applied to bottom nav ✅

**Issues:**

| # | Issue | Severity | Heuristic violated |
|---|---|---|---|
| 1 | **"Chat" nav label** — the branded AI tutor is the app's most distinctive feature, but the tab just says "Chat". A new user has no idea this is a physics tutor. "Ask Mamo" or "Mamo" would be self-evident and on-brand | 1 | Match system to real world |
| 2 | **No Exams tab** — Exam Practice and Timed Papers are core GCSE prep features, but they live behind the Home screen's ExamWidget (requires scrolling to discover). A dedicated tab or prominent card would surface them | 2 | Recognition over recall |
| 3 | **Hidden screens** — /spec-checklist, /equation-drill, /topic-map, /grade9, /mastery, /study-plan, /papers have no direct path from bottom nav. Discovery relies entirely on home screen cards. A user who dismisses a card loses the route | 2 | Recognition over recall |
| 4 | **Dual V1/V2 UI via feature flag** — `np_ui_v2` localStorage flag serves two completely different versions of Home, Topics, Papers, Settings screens. Students and teachers may be on different versions, creating inconsistent experience and doubling QA surface | 3 | Consistency & standards |
| 5 | **No global search** — 27 screens, 2,903 questions, 6 boards. A student looking for "waves" or "specific heat" must scroll the full Learn screen to find it | 2 | Flexibility & efficiency |

### Required fixes:
- Decide on V1 vs V2 and retire the other — having two parallel UIs is the biggest IA risk

### Recommended fixes:
- Rename "Chat" → "Mamo" in BottomNav (1-line change, big brand clarity win)
- Add an "Exams" or "Practice" shortcut on the Home screen above the fold
- Consider surfacing /spec-checklist and /study-plan in Settings or via a persistent Home card

---

## Phase 2: Core Learning Journey (Lesson Flow)
### Score: 7.5/10

### Findings:

**Strengths:**
- 9-step scaffold (Spark → Key Words → Connect → Explore → Understand → Practise → Lock It In → Real World → Done) is excellent cognitive sequencing for SEN learners ✅
- Steps are **dynamically filtered** — if a topic lacks `workedExample`, `guidedPractice` etc., those steps are removed at runtime. No blank steps are shown ✅
- **Resume overlay** — bottom sheet asking "Continue where you left off?" on re-entry. Saved to localStorage. Great for ADHD users who lose focus mid-lesson ✅
- Segmented progress bar with animated fill + step label + hint text (`src/screens/LessonPlayer.jsx:617`) ✅
- **ADHD break nudge** — `useSessionTimer` fires at 20 min, orange warning timer in step label row ✅
- XP popup on every step advance — immediate dopamine reward loop ✅
- Persistent keyword glossary chip bar from step 2 onwards — reduces cognitive load ✅
- Hearts system disabled by default (explore mode = true) — removes failure anxiety ✅
- `goBack()` defined and correctly handles step decrement ✅

**Issues:**

| # | Issue | Severity | Heuristic violated |
|---|---|---|---|
| 1 | **Back button exits lesson, not "go back one step"** — The `<ArrowLeft>` button in the header calls `exitLesson()` (saves + navigates to /learn). The `goBack()` function exists (`LessonPlayer.jsx:288`) and correctly decrements the step, but is never wired to any visible UI element. A user on step 5 who taps the back arrow exits the lesson entirely. Especially problematic for ADHD users who misclick. | 3 | User control & freedom |
| 2 | **No "previous step" affordance** — There is no "Back" / "Previous" button in the bottom action area. The only forward/backward navigation for non-CTA steps is the Next button (forward only). Users who want to re-read step 3 after reaching step 6 have no path except "exit + resume". | 3 | User control & freedom |
| 3 | **Legacy flow null steps** — `renderLegacyStep` cases 0, 1, 2 return `null` when `topic.lessonVisual`, `topic.ideaVisual`, or `topic.realityVisual` are absent. User sees a blank scrollable area with only the Next button — no content, no explanation. No fallback message. | 2 | Visibility of system status |
| 4 | **Step counter shown twice** — `{step + 1} / {totalSteps}` appears both in the header pill (`LessonPlayer.jsx:590`) and in the step label row (`LessonPlayer.jsx:659`) within ~40px of each other. Duplicate information adds visual clutter. | 1 | Aesthetic & minimalist design |

### Required fixes:
- Wire `goBack()` to the header back button when `step > 0` (call `exitLesson()` only when `step === 0`). One-line fix: replace `onClick={exitLesson}` with `onClick={step > 0 ? goBack : exitLesson}`.

### Recommended fixes:
- Add a ghost "← Previous" button in the bottom action area alongside the Next button for non-CTA steps
- Add a `"Content unavailable"` fallback in `renderLegacyStep` for null cases
- Remove the duplicate step counter from either the header pill or the label row

---

## Phase 3: Home Screen
### Score: 8/10

### Findings:

**Strengths:**
- Single large primary CTA above the fold — smart study plan recommendation (today's topic / review due) ✅
- Exam countdown widget with urgency tinting (green/amber/red/slate) ✅
- Board badge always visible in hero row — users always know which spec they're on ✅
- Streak card with BreakNudge — motivation layer ✅
- Progress bar (% through spec) shows once started ✅
- Study plan integration via `useStudyPlan` hook — smart prioritisation ✅

**Issues:**

| # | Issue | Severity | Heuristic violated |
|---|---|---|---|
| 5 | **Exam Practice & Timed Papers require scrolling to discover** — `ExamWidget` is the third card below the fold on a standard iPhone. Core exam prep features are invisible without scrolling. New users following a revision plan never see them unless they explore. | 2 | Recognition over recall |
| 6 | **Hero badge pills overflow on small screens** — XP + mastered count + days countdown + board + target grade can wrap to 3 rows on 375px-wide phones. Five competing badges at 12px compete for attention and clutter the greeting. | 1 | Aesthetic & minimalist design |
| 7 | **Progress bar hidden from new users** — `progressPct > 0` guard means a brand new user sees no visual sense of how much content the app contains. A zero-state bar ("0 / 47 topics") would set expectations. | 1 | Visibility of system status |
| 8 | **Spec Checklist, Study Plan, Mastery Map have no persistent Home link** — These screens are only reachable via home screen cards (which can be scrolled past) or deep links. No bottom-nav tab, no Settings shortcut. (See also Phase 1 Issue 3.) | 2 | Recognition over recall |

### Recommended fixes:
- Add a small "Exam Prep" shortcut row (2 pill buttons: "Past Papers" / "Timed Test") immediately below the primary CTA, above the fold on all iPhones
- Cap hero badges to 3 most relevant: XP + board + days-to-exam. Move mastered count and target grade to the progress bar row
- Show the progress bar even at 0% ("0 / 47 topics" start state)

---

## Phase 4: Learn Screen & Topic Navigation
### Score: 8.5/10

### Findings:

**Strengths:**
- Search across all board-filtered topics ✅ (2+ char threshold)
- Module expand/collapse state persisted in sessionStorage — back-navigation restores state ✅
- Paper filter tabs using board-specific `paperLabels` (e.g. "Unit 1 / Unit 2" for WJEC) ✅
- Progress ring per topic and per module ✅
- Board-filtered modules (board-specific modules hidden for other boards) ✅
- First unmastered topic "Start here" banner ✅
- Board re-reads on storage event + focus event (iOS reliability fix) ✅

**Issues:**

| # | Issue | Severity | Heuristic violated |
|---|---|---|---|
| 9 | **Single-char search returns nothing with no feedback** — Typing "w" (for "waves") shows an empty state with no message. The 2+ char threshold is fine technically but the empty state gives no hint that more characters are needed. | 1 | Help users recognise errors |
| 10 | **Search only matches topic titles, not exam question keywords or recall terms** — A student searching "specific heat capacity" finds the topic, but searching "latent heat" may miss topics where it's covered as a subtopic. Recall questions and equation names are unsearchable. | 2 | Flexibility & efficiency |
| 11 | **Topic mastery state visual language is implicit** — Filled ring = mastered, partial ring = in-progress, empty = not started. No legend. New users don't know what the ring states mean. | 1 | Match system to real world |

### Recommended fixes:
- Show "Type 2+ characters to search" hint in the empty search state
- Consider adding topic keywords/equations to the search index (search is already implemented, just widen the corpus)
- Add a one-time tooltip or legend chip below the search bar: "⬤ mastered · ◐ in progress · ○ not started"

---

## Phase 5: AI Tutor (MamoChat)
### Score: 7.5/10

### Findings:

**Strengths:**
- Streaming SSE responses with token-by-token rendering ✅
- Board-aware: `boardName` + `gValue` injected into every request ✅
- Per-topic localStorage threads (URL param `?topic=waves`) ✅
- localStorage quota guard: evicts oldest threads when >4MB ✅
- Guest users get a friendly "Sign in to unlock Mamo" message instead of a 401 error ✅
- AbortController on unmount prevents setState-after-unmount memory leak ✅
- Rate limit errors surfaced as friendly human-readable messages ✅

**Issues:**

| # | Issue | Severity | Heuristic violated |
|---|---|---|---|
| 12 | **1000-char message limit is silently enforced** — Long messages are truncated with `.slice(0, 1000)` with no counter or warning. A student who types a full multi-part question has no idea their message was cut. | 2 | Visibility of system status |
| 13 | **Quick topic picker is hardcoded and board-agnostic** — `QUICK_TOPICS` is a fixed list of 12 topics (`MamoChat.jsx`). CCEA-specific topics (Radiation & Risk, Converging Lenses) and OCR-B Universe topics are absent. A CCEA student sees AQA-centric starters. | 1 | Match system to real world |
| 14 | **No way to copy AI response text** — Users can't copy Mamo's answer into their revision notes. Long-press on mobile selects characters but the markdown rendering may not produce clean copyable text. | 1 | Flexibility & efficiency |
| 15 | **"Chat" tab label** — Already captured in Phase 1 (Issue 1). Repeating for completeness: the tab says "Chat" not "Mamo". A new user doesn't know this is an AI physics tutor. | 1 | Match system to real world |

### Recommended fixes:
- Add a character counter below the input (`{input.length}/1000`) that turns amber at 800 chars
- Derive `QUICK_TOPICS` from `getSelectedBoard()` — return board-specific topic starters
- Add a long-press copy action or a small copy icon on AI message bubbles

---

## Phase 6: Settings & Accessibility
### Score: 8.5/10

### Findings:

**Strengths:**
- Font size toggle (Normal / Large 18px base) ✅
- Dyslexic font (OpenDyslexic) ✅
- High contrast mode ✅
- Reduce Motion (respects `prefers-reduced-motion` too) ✅
- Background theme cycle (dark / AMOLED / soft) ✅
- Board selector with visual board cards ✅
- Exam date picker with urgency tinting ✅
- Daily reminder time picker ✅
- Avatar emoji picker ✅
- Account deletion with cascade ✅
- Sectioned layout (`sections` array groups settings logically) ✅

**Issues:**

| # | Issue | Severity | Heuristic violated |
|---|---|---|---|
| 16 | **Spec Checklist, Study Plan, Mastery Map unreachable from Settings** — These are the app's most powerful study tools, but they have no nav entry point except scrollable home cards. Settings is the natural fallback discovery point for advanced features. | 2 | Recognition over recall |
| 17 | **No in-app help or FAQ** — 27 screens, novel features (spaced repetition, adaptive tiers, explore mode), but no "How does this work?" anywhere. Neurodivergent users who need structure get no guidance once past onboarding. | 2 | Help and documentation |

### Recommended fixes:
- Add a "Study Tools" section in Settings with links to `/spec-checklist`, `/study-plan`, `/mastery`, `/papers`
- Add a "Help & About" row to Settings linking to a simple FAQ or in-app walkthrough

---

## Phase 7: Onboarding & Error States
### Score: 8/10

### Findings:

**Strengths:**
- 8-step onboarding with skip option on each step ✅
- Board selection early in flow ✅
- Accessibility preferences step (ADHD/Dyslexia/Autism/Visual) ✅
- Age gate with parental consent for 13–15 (required by COPPA/GDPR) ✅
- Exam date collected during setup ✅
- ErrorBoundary wrapping full app (main.jsx) ✅
- Full-screen offline overlay with retry button ✅
- Friendly error messages in MamoChat (rate limit, server error, etc.) ✅

**Issues:**

| # | Issue | Severity | Heuristic violated |
|---|---|---|---|
| 18 | **8-step onboarding may cause drop-off** — 8 steps before reaching the app is long for a student. ADHD users in particular may abandon. The accessibility step (ADHD/Dyslexia prefs) could be deferred to Settings and shown as a post-login nudge instead. | 2 | User control & freedom |
| 19 | **"Topic not found" error has no back button** — `LessonPlayer.jsx:243`: if `!topic`, renders "Topic not found" text with no navigation out. User is stuck on a dead screen — back gesture is the only escape, and that may not be obvious on all devices. | 2 | Error recovery |
| 20 | **Legacy lesson null steps** — already captured as Issue 3 in Phase 2. Blank content area with no fallback. | 2 | Visibility of system status |

### Recommended fixes:
- Move accessibility preferences to a post-login "Customise your experience" prompt (shown once, dismissable) — reduces onboarding steps to 5
- Add a "← Back to topics" button to the "Topic not found" error state

---

## UX/UI Audit Summary
### Overall Score: 7.9/10

**Framework:** Nielsen's 10 Heuristics + Krug's "Don't Make Me Think"
**Date:** 2026-04-17

---

### CRITICAL (Severity 3) — Fix before App Store launch

| # | Issue | Fix effort |
|---|---|---|
| 1 | Back button exits lesson instead of going back one step | 1-line: `onClick={step > 0 ? goBack : exitLesson}` in LessonPlayer header |
| 2 | No "previous step" affordance anywhere in lesson flow | Add ghost "← Previous" button in bottom action area |
| 4 | Dual V1/V2 UI via `np_ui_v2` feature flag — retire one version | Medium — audit which screens have V2 versions, pick one, delete the other |

---

### HIGH PRIORITY (Severity 2) — Fix in v1.0.1

| # | Issue | Fix effort |
|---|---|---|
| 3 | Legacy lesson steps return `null` silently — blank screen | Add `"Content coming soon"` fallback in `renderLegacyStep` |
| 5 | Exam Practice requires scrolling to discover | Add 2-pill "Past Papers / Timed Test" row above fold on Home |
| 8 | Spec Checklist / Study Plan / Mastery Map have no persistent nav path | Add "Study Tools" section to Settings |
| 10 | Search only matches topic titles, not equations/keywords | Widen search corpus to include topic keywords array |
| 12 | 1000-char chat message limit silently truncated | Add character counter below input |
| 16 | Spec Checklist etc. unreachable from Settings | See issue 8 |
| 17 | No in-app help or FAQ | Add "Help & About" to Settings |
| 18 | 8-step onboarding risks drop-off | Defer accessibility step to post-login nudge |
| 19 | "Topic not found" has no back button | Add `← Back to topics` to error state |

---

### NICE TO HAVE (Severity 1) — Post-launch polish

| # | Issue |
|---|---|
| "Chat" tab | Rename to "Mamo" in BottomNav (1-line change, big brand win — Issue 1 from Phase 1) |
| 4 | Step counter shown twice in lesson header |
| 6 | Hero badge pills overflow on small screens |
| 7 | Progress bar hidden from new users (no 0-state) |
| 9 | Single-char search shows empty state with no hint |
| 11 | Topic mastery ring states have no legend |
| 13 | Quick topic picker is AQA-centric, not board-aware |
| 14 | No copy button on AI responses |

---

### Phase scores

| Phase | Area | Score |
|---|---|---|
| 1 | Navigation & Information Architecture | 7/10 |
| 2 | Core Learning Journey (LessonPlayer) | 7.5/10 |
| 3 | Home Screen | 8/10 |
| 4 | Learn Screen & Topic Navigation | 8.5/10 |
| 5 | AI Tutor (MamoChat) | 7.5/10 |
| 6 | Settings & Accessibility | 8.5/10 |
| 7 | Onboarding & Error States | 8/10 |
| **Overall** | | **7.9/10** |
