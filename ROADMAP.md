
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

#### 5.3 Sonification (Stretch Goal) ✅ shipped
- [x] Forces: sawtooth buzz pitch ∝ net force (NewtonsLawsLesson Law 2, 110–330 Hz)
- [x] Waves: sine pitch ∝ wave frequency (WavePropertiesLesson, 220–1100 Hz)
- [x] Electricity: sine hum pitch ∝ current (ElectricalPowerLesson, 110–550 Hz)
- [x] Energy: triangle rising tone ∝ KE log scale (EnergyEquationsLesson, 150–550 Hz)
- [x] Off by default, 🔊 speaker toggle per sim
- [x] useSimAudio hook (src/utils/simAudio.js) — Web Audio API, fade in/out, cleanup on unmount

#### 5.4 Abstract Concept Scaffolding ✅ shipped
- [x] Forces: real photo/video then interactive FBD then body-based language
- [x] Energy: "bank account" analogy then consistent colours then animated Sankey
- [x] Waves: slinky video then sim with sound output then persistent labels
- [x] Electricity: animated charges then water pipe parallel then tap-to-add circuits
- [x] Particles: macro zoom-in then temperature slider then state labels

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

---
