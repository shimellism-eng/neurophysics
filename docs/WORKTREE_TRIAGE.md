# Worktree Triage

## Staged for release hardening

These changes are safe to review as the release patch:

- AQA/Edexcel-only metadata, manifest, docs, and social preview assets
- Timed-paper mark-label and score-replacement fixes
- API rate-limit/auth safety changes
- Supabase no-cache service-worker change
- Valid OpenDyslexic font binaries
- Session memory update

## Left dirty for separate review

These are intentionally not part of the release patch:

- Large screen rewrites or visual changes
- Question-bank rewrites or deleted split-bank files
- New runtime repository/import layers
- Prototype screens and design scratch files, now ignored via `.gitignore`
- Generated database files, schema drafts, and import scripts
- Local agent/config/cache folders

## Remaining Dirty Buckets

### Keep for focused review

These may contain useful work, but each needs its own intent, review, and tests before it belongs in `main`:

- App shell and routing: `src/App.jsx`, `src/main.jsx`
- Comfort/accessibility/UI system: `src/index.css`, `src/context/ComfortContext.jsx`, `src/components/ComfortSettings.jsx`, `src/components/ui/Card.jsx`, `src/components/ui/SafeAreaPage.jsx`, `src/components/PageHeader.jsx`
- Lesson UI polish: `src/components/lesson/*`, `src/screens/LessonPlayer.jsx`
- Practice/runtime experiments: `src/lib/questionRepository.js`, `src/lib/adaptiveEngine.js`, `src/hooks/useAdaptiveRuntime.js`, `src/screens/PracticeHubScreen.jsx`
- Practice screens with behavioural surface area: `src/screens/AdaptivePractice.jsx`, `src/screens/QuickWinScreen.jsx`, `src/screens/MixedRevisionScreen.jsx`, `src/screens/ExamPractice.jsx`, `src/screens/DiagnosticQuestion.jsx`, `src/screens/TimedPaper.jsx`
- Account/onboarding/settings screens: `src/screens/AuthScreen.jsx`, `src/screens/ConsentScreen.jsx`, `src/screens/OnboardingScreen.jsx`, `src/screens/SettingsScreen.jsx`
- Study/support screens: `src/screens/HomeScreen.jsx`, `src/screens/LearnScreen.jsx`, `src/screens/MasteryScreen.jsx`, `src/screens/MamoChat.jsx`, `src/screens/PaperResults.jsx`, `src/screens/RecallScreen.jsx`, `src/screens/SpecChecklist.jsx`, `src/screens/SplashScreen.jsx`

### Restore or replace only with explicit approval

These affect shipped content/assets and should not be casually kept or removed:

- Deleted original practical PNGs: `public/practicals/RP1.png`, `public/practicals/RP2.png`
- New practical WebP replacements: `public/practicals/RP1.webp`, `public/practicals/RP2.webp`
- Deleted split question-bank files:
  - `src/data/questionBank/qb-atomic-part1.js`
  - `src/data/questionBank/qb-atomic-part2.js`
  - `src/data/questionBank/qb-electricity-part1.js`
  - `src/data/questionBank/qb-electricity-part2.js`
  - `src/data/questionBank/qb-waves-part1.js`
  - `src/data/questionBank/qb-waves-part2.js`
- Modified question/content files: `src/data/examCalculations.js`, `src/data/examExtended.js`, `src/data/questionBank/*.js`, `src/data/topics*.jsx`, `src/data/visuals-helpers.jsx`

### Promote into docs/tools only if wanted

These are useful-looking, but should not sit as loose root/untracked files:

- `README.md`
- `docs/runtime-boundary-note.md`
- `public/terms.html`
- `scripts/export_runtime_questions.py`
- `src/data/questionBank/qb-recall-board-overlays.js`

### Config and release surface review

These are small enough to review, but can affect production behaviour:

- `AGENTS.md`, `CLAUDE.md`
- `package.json`, `package-lock.json`
- `public/privacy.html`
- `vercel.json`
- `vite.config.js`
- `src/utils/notifications.js`

## Local noise ignored

These files/folders are kept on disk but should not appear in release staging:

- `*.backup`
- `prototypes/`
- `skills-lock.json`
- root scratch files `/Design` and `/EVERY`
- `.DS_Store` files at any depth

`src/.DS_Store` was previously tracked by Git and should stay removed from the repository index.

## Review rule

Use explicit path staging. Do not run `git add -A` in this repo while the worktree contains mixed historical changes.

If a file contains both release work and unrelated edits, stage only the release hunk or leave the file dirty for a later focused commit.
