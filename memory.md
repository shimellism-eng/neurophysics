# NeuroPhysics — Session Memory

## Last Updated
2026-05-02

## What Was Just Done (latest — 2026-05-02)

### Adaptive Practice AQA Energy Stores authored
- Started the Energy topic rebuild and added the new authored Energy source file.
- Fixed AQA `Energy Stores`: 19/19 authored and passed.
- Hidden spec metadata:
  - AQA Physics `specRef`: `4.1.1.1`.
  - AQA Combined Science `combinedSpecRef`: `6.1.1.1`.
  - `courseAvailability`: `combined` + `physics_only`.
- Runtime quality checks:
  - Energy Stores runtime count: 19.
  - Bad scaffold/answer phrase count: 0.
  - No visible objective wording, no "answer claims" wording, no answer leaked in top text.
- Current Energy good-to-go count after this fix:
  - AQA: 19/94 good to go.
  - Edexcel: 0/94 good to go.
  - Combined Energy: 19/188 good to go.
- Verification:
  - `npm run questions:regenerate` passes.
  - `npm run audit:questions` passes.
  - `npm test` passes.
  - `npm run build` passes.
  - `npx cap sync ios` passes.
  - iOS simulator build passes on iPhone 17 Pro Max with `CODE_SIGNING_ALLOWED=NO`.
  - Exact AQA Energy Stores route was shown live in Simulator.
- Temporary simulator bypass was used only to jump straight to the fixed screen, then removed from source and the app was rebuilt/synced cleanly.

### Next step
- Continue AQA Energy:
  - AQA `Efficiency`: 18 authored exam-style questions.

### Adaptive Practice AQA National Grid authored
- Fixed the final AQA Electricity slice with authored exam-style questions:
  - AQA `National Grid`: 24/24 authored and passed.
  - Covered AQA Physics `specRef`: `4.2.4.3`.
  - Covered AQA Combined Science `combinedSpecRef`: `6.2.4.3`.
  - `courseAvailability`: `combined` + `physics_only`.
- Runtime quality checks:
  - National Grid runtime count: 24.
  - Authored IDs: 24.
  - Bad scaffold/answer phrase count: 0.
  - No visible objective wording, no "answer claims" wording, no answer leaked in top text.
- Current Electricity good-to-go count after this fix:
  - AQA: 144/144 good to go.
  - Edexcel: 94/94 good to go.
  - Combined Electricity: 238/238 good to go.
- Verification:
  - `npm run questions:regenerate` passes.
  - `npm run audit:questions` passes.
  - `npm test` passes.
  - `npm run build` passes.
  - `npx cap sync ios` passes.
  - iOS simulator build passes on iPhone 17 Pro Max with `CODE_SIGNING_ALLOWED=NO`.
  - Exact AQA National Grid route was shown live in Simulator after one extra wait for the Capacitor splash to clear.
- Temporary simulator bypass was used only to jump straight to the fixed screen, then removed from source and the app was rebuilt/synced cleanly.

### Next step
- Move from Electricity to the next topic bucket:
  - AQA `Energy`: 94 generated / 0 premium passed.
  - Start with `Energy Stores`: 19 authored exam-style questions.

### Adaptive Practice AQA Resistance authored
- Fixed the next AQA Electricity slice with authored exam-style questions:
  - AQA `Resistance`: 42/42 authored and passed.
  - Covered AQA Physics `specRef`: `4.2.1.3` and `4.2.1.4`.
  - Covered AQA Combined Science `combinedSpecRef`: `6.2.1.3` and `6.2.1.4`.
  - `courseAvailability`: `combined` + `physics_only`.
- Runtime quality checks:
  - Resistance runtime count: 42.
  - Authored IDs: 42.
  - Bad scaffold phrase count: 0.
  - No leaked objective/answer wording in the top label.
- Current Electricity good-to-go count after this fix:
  - AQA: 120/144 good to go.
  - Edexcel: 94/94 good to go.
  - Combined Electricity: 214/238 good to go.
- Verification:
  - `npm run questions:regenerate` passes.
  - `npm run audit:questions` passes.
  - `npm test` passes.
  - `npm run build` passes.
  - `npx cap sync ios` passes.
  - iOS simulator build passes on iPhone 17 Pro Max with `CODE_SIGNING_ALLOWED=NO`.
  - iOS simulator install/launch passes; exact AQA Resistance route was shown live.
- Temporary simulator bypass was used only to jump straight to the fixed screen, then removed from source and the app was rebuilt/synced cleanly.

### Next step
- Continue AQA Electricity:
  - AQA `National Grid`: 24 authored exam-style questions.

### Adaptive Practice AQA Series Circuits scaffold wording removed
- Mamo spotted a live Series Circuits question still using failed scaffold wording:
  - "Which answer matches this ... objective..."
  - "Choose the statement that fits this exact GCSE Physics idea..."
  - answer-option wrappers like "For series circuits, the answer claims..."
- Root cause:
  - AQA `Series Circuits` was still falling back to generated scaffold content.
  - The previous fix covered `Series Resistance` and `Parallel Circuits`, but not the broader `Series Circuits` bucket.
- Fixed:
  - AQA `Series Circuits`: 19/19 authored exam-style questions.
  - Hidden spec metadata:
    - AQA Physics `specRef`: `4.2.2`.
    - AQA Combined Science `combinedSpecRef`: `6.2.2`.
    - `courseAvailability`: `combined` + `physics_only`.
- Direct runtime check:
  - `Series Circuits runtime`: 19.
  - `Authored`: 19.
  - Bad scaffold phrase count: 0.
- Current Electricity good-to-go count after this fix:
  - AQA: 78/144 good to go.
  - Edexcel: 94/94 good to go.
  - Combined Electricity: 172/238 good to go.
- Verification:
  - `npm run questions:regenerate` passes.
  - `npm run audit:questions` passes.
  - `npm test` passes.
  - `npm run build` passes.
  - `npx cap sync ios` passes.
  - iOS simulator build passes on iPhone 17 Pro Max with `CODE_SIGNING_ALLOWED=NO`.
  - iOS simulator install/launch passes; updated app is live in Simulator.

### Next step
- Continue AQA Electricity:
  - AQA `Resistance`: 42 authored exam-style questions.
  - Then AQA `National Grid`: 24.

### Adaptive Practice AQA Series Resistance + Parallel Circuits authored
- Fixed the next AQA Electricity slice with premium, exam-style authored questions:
  - AQA `Series Resistance`: 5/5 authored.
  - AQA `Parallel Circuits`: 5/5 authored.
- Hidden spec metadata:
  - AQA Physics `specRef`: `4.2.2`.
  - AQA Combined Science `combinedSpecRef`: `6.2.2`.
  - `courseAvailability`: `combined` + `physics_only`.
- Updated the regeneration pipeline so authored AQA items can carry `combinedSpecRef` into runtime JSON.
- Current Electricity good-to-go count after this fix:
  - AQA: 59/144 good to go.
  - Edexcel: 94/94 good to go.
  - Combined Electricity: 153/238 good to go.
- Verification:
  - `npm run questions:regenerate` passes.
  - `npm run audit:questions` passes.
  - `npm test` passes.
  - `npm run build` passes.
  - `npx cap sync ios` passes.
  - iOS simulator build passes on iPhone 17 Pro Max with `CODE_SIGNING_ALLOWED=NO`.
  - iOS simulator install/launch passes; updated app is live in Simulator.

### Next step
- Continue AQA Electricity:
  - AQA `Resistance`: 42 authored exam-style questions.
  - Then AQA `Series Circuits`: 19.
  - Then AQA `National Grid`: 24.

### Adaptive Practice board/course filter hardening
- Implemented the first part of the board-faithful/course-faithful Adaptive Practice plan.
- Fixed runtime filtering:
  - `AdaptivePractice.jsx` now reads both selected board and selected course.
  - `questionRepository.js` now passes course into `getQuestions`, `getQuestionsByTopicId`, `getExamQuestions`, `getTimedPaperQuestions`, and `getRandomQuiz`.
  - `curriculumFilters.js` now understands `courseAvailability` arrays from the generated runtime question bank.
  - Combined Science now sees only questions with `courseAvailability` including `combined`.
  - Physics Only now sees both `combined` and `physics_only` questions.
  - Question-level `examBoard` is now checked, so AQA and Edexcel runtime banks cannot cross-leak.
- Added permanent smoke test:
  - `scripts/smoke-adaptive-course-filter.mjs`
  - Added it to `npm test`.
- Verified runtime counts:
  - AQA Combined: 688 questions.
  - AQA Physics Only mode: 832 questions.
  - AQA Physics-only-only: 144 questions.
  - Edexcel Combined: 451 questions.
  - Edexcel Physics Only mode: 681 questions.
  - Edexcel Physics-only-only: 230 questions.
  - Space visible to Combined: 0 for both boards.
- Verification:
  - `node scripts/smoke-adaptive-course-filter.mjs` passes.
  - `npm run audit:curriculum` passes.
  - `npm test` passes.
  - `npm run build` passes.
  - `npx cap sync ios` passes.
  - iOS simulator build passes on iPhone 17 Pro Max with `CODE_SIGNING_ALLOWED=NO`.

### Next step
- Continue premium authoring:
  - AQA `Series Resistance`: 5 authored exam-style questions.
  - AQA `Parallel Circuits`: 5 authored exam-style questions.
  - Then continue AQA `Resistance`, `Series Circuits`, and `National Grid`.

### Adaptive Practice visible answer-hint leak fixed
- Mamo found a serious issue in Adaptive Practice: the grey label above the question was showing the hidden learning objective, which could reveal the answer or heavily hint it.
- Root cause:
  - Runtime `skill` was being filled from `learningObjective` / generator objective text.
  - `AdaptivePractice.jsx` displays `currentQuestion.skill` to learners, so hidden audit metadata leaked into the UI.
- Fixed globally:
  - `scripts/regenerate_adaptive_questions.mjs` now sets visible `skill` to neutral text: `${subtopic} practice`.
  - Hidden metadata still keeps `learningObjective.statement` for audits and spec coverage.
  - Regenerated all runtime question JSON for AQA and Edexcel.
- Added a permanent audit gate:
  - `scripts/audit_question_repetition.js` now fails if visible `skill` equals/includes the hidden learning objective or includes the correct answer.
- Verification:
  - `npm run audit:questions` passes.
  - AQA `leaked skill hints`: 0.
  - Edexcel `leaked skill hints`: 0.
  - Direct runtime scan of `public/data/questions/aqa/all.json` and `public/data/questions/edexcel/all.json`: 0 visible skill leaks.

### Next step
- Continue AQA Electricity:
  - AQA `Series Resistance`: 5/5 authored.
  - AQA `Parallel Circuits`: 5/5 authored.

### Adaptive Practice AQA Energy Transfer + Series Current correction
- Checked spec anchors before authoring:
  - AQA `Series Current`: `4.2.2`, current in series circuits.
  - AQA `Energy Transfer`: corrected from `4.2.4.1` to `4.2.4.2`, energy transfers in everyday electrical appliances.
- Fixed:
  - AQA `Series Current`: 5/5 authored exam-style questions.
  - AQA `Energy Transfer`: 5/5 authored exam-style questions.
- Current Electricity good-to-go count after this correction:
  - AQA: 49/144 good to go.
  - Edexcel: 94/94 good to go.
  - Combined Electricity: 143/238 good to go.
- Verification:
  - `npm run questions:regenerate` passes.
  - `npm run audit:questions` passes.
  - `npm test` passes.
  - `npm run build` passes.
  - `npx cap sync ios` passes.
  - iOS simulator build passes on iPhone 17 Pro Max with `CODE_SIGNING_ALLOWED=NO`.
  - iOS simulator boot/install/launch passes after rebooting the simulator.

### Next step
- Continue AQA Electricity:
  - AQA `Series Resistance`: 5/5 authored.
  - AQA `Parallel Circuits`: 5/5 authored.

### Adaptive Practice AQA Power + Edexcel Parallel Circuits correction
- Checked spec anchors before authoring:
  - AQA `4.2.4.1` covers electrical power, `P = V × I`, `P = I²R`, and energy transfer over time.
  - Edexcel local manifest had a bad `10.20` reference for `Parallel Circuits`; official Edexcel Physics 1PH0 has `10.20` as thermistors.
  - Corrected Edexcel `Parallel Circuits` hidden spec coverage to `10.3/10.11/10.14/10.17`:
    - series/parallel circuit differences
    - current conservation at junctions
    - resistance change in series/parallel
    - core practical testing series and parallel circuits
- Fixed:
  - AQA `Power`: 5/5 authored exam-style questions.
  - Edexcel `Parallel Circuits`: 19/19 authored exam-style questions.
- Current Electricity good-to-go count after this correction:
  - AQA: 39/144 good to go.
  - Edexcel: 94/94 good to go.
  - Combined Electricity: 133/238 good to go.
- Verification:
  - `npm run questions:regenerate` passes.
  - `npm run audit:questions` passes.
  - `npm test` passes.
  - `npm run build` passes.
  - `npx cap sync ios` passes.
  - iOS simulator build passes on iPhone 17 Pro Max with `CODE_SIGNING_ALLOWED=NO`.
  - iOS simulator install/launch passes.

### Next step
- Continue AQA Electricity only until AQA catches up:
  - AQA `Energy Transfer`: 5/5 authored.
  - AQA `Series Current`: 5/5 authored.

### Adaptive Practice AQA Potential Difference + Edexcel Domestic Electricity correction
- Checked official spec anchors before authoring:
  - AQA `4.2.1.3` covers current, resistance and potential difference, including `V = I × R`, units, and measuring current/potential difference.
  - Edexcel domestic electricity content includes mains a.c., live/neutral/earth wires, fuses/circuit breakers, live-wire switching, live-to-earth danger, and domestic appliance power ratings.
- Fixed the next Electricity pair:
  - AQA `Potential Difference`: 5/5 authored exam-style questions.
  - Edexcel `Domestic Electricity`: 19/19 authored exam-style questions.
- Kept learner-facing text exam-style only; no scaffold/meta phrases.
- Current Electricity good-to-go count after this correction:
  - AQA: 34/144 good to go.
  - Edexcel: 75/94 good to go.
  - Combined Electricity: 109/238 good to go.
- Verification:
  - `npm run questions:regenerate` passes.
  - `npm run audit:questions` passes.
  - `npm test` passes.
  - `npm run build` passes.
  - `npx cap sync ios` passes.
  - iOS simulator build passes on iPhone 17 Pro Max with `CODE_SIGNING_ALLOWED=NO`.
  - iOS simulator install/launch passes.

### Next step
- Continue Electricity with:
  - AQA `Power`: 5/5 authored.
  - Edexcel `Parallel Circuits`: 19/19 authored.

### Adaptive Practice AQA Current + Edexcel Current-Voltage correction
- Fixed the next two Electricity screenshot areas:
  - AQA `Current`: 5/5 authored exam-style questions.
  - Edexcel `Current-Voltage Characteristics`: 19/19 authored exam-style questions.
- Replaced the old scaffold-style learner text for those subtopics, including:
  - "Demand focus..."
  - "Use the wording carefully..."
  - "For current..."
  - "For current-voltage characteristics..."
- Kept hidden metadata for audits and coverage:
  - `specRef`
  - `learningObjective`
  - `assessmentObjective`
  - `demand`
  - `misconceptionTag`
  - `review.status`
- Current Electricity good-to-go count after this correction:
  - AQA: 29/144 good to go.
  - Edexcel: 56/94 good to go.
  - Combined Electricity: 85/238 good to go.
- Verification:
  - `npm run questions:regenerate` passes.
  - `npm run audit:questions` passes.
  - `npm test` passes.
  - `npm run build` passes.
  - `npx cap sync ios` passes.
  - iOS simulator build passes on iPhone 17 Pro Max with `CODE_SIGNING_ALLOWED=NO`.

### Next step
- Continue Electricity with:
  - AQA `Potential Difference`: 5/5 authored.
  - Edexcel `Domestic Electricity`: 19/19 authored.

### Adaptive Practice Edexcel Electrical Energy correction
- Mamo spotted that the screen title said `Electrical Power`, but the question chip was actually `Electrical Energy`.
- Fixed the actual selected subtopic: Edexcel `Electrical Energy`.
- Added 18 reviewed authored exam-style questions for Edexcel Electrical Energy in `src/data/adaptiveQuestionSource/authoredElectricity.js`.
- Replaced the old scaffold-style learner text for that subtopic, including phrases like:
  - "Which option best separates..."
  - "Choose the statement that fits this exact GCSE Physics idea..."
  - "For electrical energy..."
- Updated runtime JSON for:
  - `public/data/questions/edexcel/electricity.json`
  - `public/data/questions/edexcel/all.json`
- Current Electricity good-to-go count after this correction:
  - AQA: 24/144 good to go.
  - Edexcel: 37/94 good to go.
  - Combined Electricity: 61/238 good to go.
- Verification:
  - `npm run questions:regenerate` passes.
  - `npm run audit:questions` passes.
  - `npm test` passes.
  - `npm run build` passes.
  - `git diff --check` passes.
  - `npx cap sync ios` passes.
  - iOS simulator build passes on iPhone 17 Pro Max with `CODE_SIGNING_ALLOWED=NO`.
  - iOS simulator install/launch passes.

### Next step
- Fix the two electricity areas Mamo showed directly in screenshots:
  - AQA `Current`: 5/5 authored.
  - Edexcel `Current-Voltage Characteristics`: 19/19 authored.

### Adaptive Practice authored Atomic Structure checkpoint
- Replaced the learner-facing Atomic Structure bank with authored exam-style questions for AQA and Edexcel.
- Added `src/data/adaptiveQuestionSource/authoredAtomicStructure.js` as the source of truth for this checkpoint:
  - AQA Atomic Structure: 25 reviewed authored questions.
  - Edexcel Atomic Structure: 25 reviewed authored questions.
- Each authored item keeps hidden quality metadata:
  - `specRef`
  - `learningObjective`
  - `assessmentObjective`
  - `demand`
  - `commandWord`
  - `misconceptionTag`
  - `review.status`
- Updated `scripts/regenerate_adaptive_questions.mjs` so Atomic Structure uses authored items instead of generated student-facing wording.
- Added audit gates to block scaffold/meta wording in authored learner-facing text:
  - no "learning objective" wording
  - no "common mix-up" wording
  - no "demand focus" wording
  - no "Which option best separates..." wording
  - no "For isotopes..." answer wrappers
- Kept app behaviour untouched:
  - 9-step lesson flow unchanged.
  - Adaptive selection logic unchanged.
  - XP/streak/spaced repetition unchanged.
  - board filtering unchanged.
- Runtime counts after Atomic replacement:
  - AQA: 832 questions total, Atomic Structure now 25 authored items.
  - Edexcel: 681 questions total, Atomic Structure now 25 authored items.
- Verification:
  - `npm run audit:questions` passes.
  - `npm test` passes.
  - `npm run build` passes.
  - `git diff --check` passes.
  - `npx cap sync ios` passes.
  - iOS simulator build passes on iPhone 17 Pro Max with `CODE_SIGNING_ALLOWED=NO`.
  - iOS simulator launch passes; fresh install lands on the auth screen, and synced iOS JSON contains the authored Atomic questions.

### Next step
- Visually review Atomic Structure on-device using AQA and Edexcel.
- If the Atomic sample is approved, repeat the same authored-source approach topic by topic, starting with Electricity.
- Do not deploy this content checkpoint until the Atomic on-device sample is approved.

### Adaptive Practice release-count guard
- Mamo approved the first 4 Atomic Structure questions on both boards as acceptable for the first authored checkpoint.
- Added a regeneration safety rail: Adaptive Practice cannot regenerate below 1,500 total runtime questions.
- Current runtime count remains 1,513:
  - AQA: 832
  - Edexcel: 681
- This prevents later topic replacement from accidentally shrinking the product while we rebuild the remaining topics.
- Verification:
  - `npm run questions:regenerate` passes at 1,513 questions.
  - `npm test` passes.
  - `npm run build` passes.
  - `git diff --check` passes.

### Next step
- Build the authored Electricity source while preserving the 1,500+ total bank requirement.
- Replace Electricity only when AQA + Edexcel authored Electricity coverage is dense enough to pass the count guard and quality gates.

### Adaptive Practice Electricity authored slice
- Added the first Electricity authored-source checkpoint:
  - AQA Charge: 24 authored exam-style questions.
  - Edexcel Electrical Power: 19 authored exam-style questions.
- Wired `AUTHORED_ELECTRICITY_ITEMS` into the same authored regeneration path as Atomic Structure.
- Kept runtime totals unchanged:
  - AQA: 832
  - Edexcel: 681
  - Total: 1,513
- Kept non-authored Electricity subtopics on the existing fallback bank for now, so the app does not drop below the release count floor while the rebuild continues.
- Verification:
  - `npm run questions:regenerate` passes.
  - `npm run audit:questions` passes.
  - `npm test` passes.
  - `npm run build` passes.
  - `git diff --check` passes.
  - `npx cap sync ios` passes.
  - iOS simulator build passes with `CODE_SIGNING_ALLOWED=NO`.
  - iOS simulator install/launch passes after booting the iPhone 17 Pro Max simulator.

### Next step
- Continue Electricity subtopic-by-subtopic:
  - AQA: Current, Potential Difference, Resistance, Series/Parallel circuits, Power, Energy Transfer, National Grid.
  - Edexcel: Current-Voltage Characteristics, Domestic Electricity, Electrical Energy, Parallel Circuits.
- Next immediate fix: AQA Resistance + Edexcel Current-Voltage Characteristics because they are high-impact, diagram/graph-heavy exam areas.

### Adaptive Practice full regeneration from spec manifests
- Rebuilt the Adaptive Practice bank for the locked AQA + Edexcel release scope.
- Added source-of-truth inputs:
  - `src/data/adaptiveQuestionSource/specManifests.js`
  - `src/data/adaptiveQuestionSource/questionBlueprints.js`
- Added deterministic regeneration:
  - `scripts/regenerate_adaptive_questions.mjs`
  - `npm run questions:regenerate`
- Regenerated runtime JSON from the same source for:
  - AQA: 900 questions
  - Edexcel: 750 questions
  - combined manifest: 1,650 questions
- Each generated question now includes spec reference, spec statement, learning objective, AO, demand, command word, response mode, pattern ID, misconception tag, context type, distractor rationales, author notes, and review metadata.
- Strengthened `npm run audit:questions` so it fails on missing quality metadata, duplicate exact stems, semantic near-duplicate stems, repeated option sets, repeated explanations, placeholder options, overused objective buckets, topic-file drift, or missing source-manifest coverage.
- Added `docs/ADAPTIVE_QUESTION_REGENERATION.md` for the next developer.
- Kept app behaviour untouched: no changes to Adaptive Practice selection logic, 9-step lesson flow, XP/streak, spaced repetition, board filtering, or question rendering.
- Verification:
  - `npm run questions:regenerate` passes
  - `npm test` passes
  - `npm run build` passes
  - `git diff --check` passes
  - `npx cap sync ios` passes
  - iOS simulator build/run passes on iPhone 17 Pro Max simulator with `CODE_SIGNING_ALLOWED=NO`

### Next step
- Human sample-review the regenerated Adaptive Practice questions topic by topic, starting with Atomic Structure on AQA and Edexcel.
- If the sample reads well, commit this as one Adaptive Practice regeneration checkpoint.
- If any wording feels too mechanical, refine only `questionBlueprints.js` / generator phrasing and regenerate; do not hand-edit runtime JSON.

### Adaptive Practice wording polish
- Sample-reviewed the regenerated AQA and Edexcel Atomic Structure questions after the structural regeneration.
- Found the first generated wording was metadata-clean but too mechanical for learners.
- Polished the generator so visible answer choices read as neutral multiple-choice claims instead of labels like "Incorrect recall".
- Re-ran regeneration and kept all quality gates strict:
  - duplicate IDs: 0
  - duplicate exact stems: 0
  - near/template duplicate stems: 0
  - repeated option sets: 0
  - placeholder options: 0
  - missing spec/learning metadata: 0
- Verification after polish:
  - `npm test` passes
  - `npm run build` passes
  - `git diff --check` passes
  - `npx cap sync ios` passes
  - iOS simulator build/run passes with `CODE_SIGNING_ALLOWED=NO`

### Next step
- Continue sample review topic by topic, next with Electricity for AQA + Edexcel.
- If Electricity reads clean, move to Energy, Forces, Magnetism, Particle Model, Waves, then Space.
- Keep improving generator/source facts only; do not hand-edit runtime JSON.

### Adaptive Practice question-quality repair
- Audited Adaptive Practice runtime question data for both shipped boards.
- AQA status:
  - 900 runtime rows
  - 900 unique exact question texts
  - 0 duplicate IDs
  - 0 exact duplicate stems
  - 0 near/template duplicate stems
- Edexcel before repair:
  - 750 runtime rows
  - 233 unique exact question texts
  - 93 exact duplicate-stem groups
  - 74 near/template duplicate-stem groups
- Added `npm run audit:questions` and wired it into `npm test`.
- Added `scripts/repair_edexcel_question_variety.mjs`, a deterministic/idempotent Edexcel-only prompt repair script.
- Repaired Edexcel runtime prompts in:
  - `public/data/questions/edexcel/all.json`
  - all Edexcel topic JSON files
  - `public/data/questions/manifest.json`
- The repair preserves IDs, topics, subtopics, difficulty, skill, options, correct answers, explanations, board filtering, Adaptive Practice logic, and the 9-step lesson flow.
- Verification after repair:
  - `npm run audit:questions` passes
  - `npm test` passes
  - `npm run build` passes
  - `git diff --check` passes

### Next step
- Review/commit the Edexcel prompt repair as one content-quality checkpoint.
- Next quality pass should inspect repeated option sets/distractors, because the current gate removes repeated stems/templates but still reports repeated option sets for both boards.

### Edexcel Atomic Structure distractor cleanup
- Repaired distractor variety for Edexcel `atomic_structure` only, using curated GCSE-safe wrong-answer pools.
- Preserved every correct answer exactly and kept existing question IDs, topics, difficulty, skills, explanations, and Adaptive Practice logic unchanged.
- `npm test`, `npm run build`, `npm run audit:questions`, and `git diff --check` passed after the atomic distractor batch.
- Remaining repeated option sets are mostly outside Edexcel Atomic Structure, especially Magnetism, Space, Waves, Energy, Electricity, and some AQA calculation pairs.

### Remaining Adaptive Practice distractor cleanup
- Repaired repeated answer-option sets across the remaining AQA and Edexcel runtime question files.
- Added curated wrong-answer pools for the remaining repeated-option topics and kept numerical distractors generated from the existing correct answer values.
- Final question-quality state:
  - AQA duplicate IDs: 0
  - AQA exact duplicate stems: 0
  - AQA near/template duplicate stems: 0
  - AQA repeated option sets: 0
  - Edexcel duplicate IDs: 0
  - Edexcel exact duplicate stems: 0
  - Edexcel near/template duplicate stems: 0
  - Edexcel repeated option sets: 0
- Verification after remaining cleanup:
  - `npm run audit:questions` passes
  - `npm test` passes
  - `npm run build` passes
  - `git diff --check` passes

## What Was Just Done (latest — 2026-05-01)

### Auth, consent, onboarding cleanup
- Committed the auth/onboarding bucket as `7c52965` (`Clean up auth consent onboarding flow`).
- Kept the cleanup scoped to entry and consent screens:
  - `src/context/AuthContext.jsx`
  - `src/screens/AuthScreen.jsx`
  - `src/screens/ConsentScreen.jsx`
  - `src/screens/OnboardingScreen.jsx`
  - `src/utils/notifications.js`
- Guest access now routes through `/consent?next=guest` before creating the guest session, so privacy/age consent is not bypassed.
- Auth/profile avatar fallbacks now use an empty value instead of an emoji, matching the calmer profile presentation.
- Auth, consent, onboarding, and notification copy were polished to the shared ink/teal visual language.
- The active onboarding flow remains board -> setup -> app; the 9-step lesson flow, question content, XP/streak rules, and board filtering were not touched.

### Auth cleanup verification
- GitNexus impact checks were used before staging. `useAuth` is a high-impact symbol, but the scoped diff did not change the auth API/session contract.
- `gitnexus_detect_changes` is not exposed in the local CLI, so staged-only verification was used as the scope check.
- Exported the staged index to a clean temporary checkout and verified:
  - `npm test` passed.
  - `npm run build` passed.
  - `npm run audit:curriculum` passed.
- `git diff --cached --check` passed before commit.
- GitNexus index refreshed after commit: 1,753 nodes, 3,475 edges, 102 clusters, 139 flows.

### Learner progress presentation cleanup
- Committed the first main-learner slice as `035ac00` (`Polish learner progress screens`).
- Kept this commit to small progress/result screens:
  - `DiagnosticQuestion`
  - `EquationDrillScreen`
  - `MasteryScreen`
  - `PaperResults`
  - `StudyPlanScreen`
  - `TopicMap`
- Removed several emoji-style UI labels, improved long-title wrapping, softened grade/progress copy, and aligned result/progress colours with the shared app palette.
- `PaperResults` now reads `marksAwarded` where available, so result breakdowns match the timed-paper scoring contract.
- Left the larger learner-flow files dirty for separate review because they mix UI cleanup with behaviour-affecting changes:
  - `LearnScreen`
  - `LessonPlayer`
  - `ExamPractice`
  - `TimedPaper`

### Learner presentation verification
- GitNexus impact checks for the touched screen symbols reported LOW risk.
- `gitnexus_detect_changes` is not exposed in the local CLI, so staged-only verification was used as the scope check.
- Exported the staged index to a clean temporary checkout and verified:
  - `npm test` passed.
  - `npm run build` passed.
  - `npm run audit:curriculum` passed.
- `git diff --cached --check` passed before commit.
- GitNexus index refreshed after commit: 1,757 nodes, 3,481 edges, 103 clusters, 140 flows.

### Exam practice marks cleanup
- Committed the exam-practice slice as `fcd65c8` (`Fix exam practice marks display`).
- `ExamPractice` now totals actual available marks instead of treating every question as 1 mark.
- Result saving/display now uses the computed mark total, so multi-mark exam-style questions are not under-reported.
- Also aligned the screen with the shared `PageHeader` and calmer label/copy style.
- Left `TimedPaper`, `LearnScreen`, and `LessonPlayer` dirty for separate review because those diffs include navigation/timer/lesson-flow changes.

### Exam practice verification
- GitNexus impact for `ExamPractice` reported LOW risk.
- `gitnexus_detect_changes` is not exposed in the local CLI, so staged-only verification was used as the scope check.
- Exported the staged index to a clean temporary checkout and verified:
  - `npm test` passed.
  - `npm run build` passed.
  - `npm run audit:curriculum` passed.
- `git diff --cached --check` passed before commit.
- GitNexus index refreshed after commit: 1,758 nodes, 3,483 edges, 102 clusters, 140 flows.

### Learn screen structure cleanup
- Committed the Learn screen slice as `03f9b9c` (`Simplify learn screen topic browser`).
- Replaced local topic/module visibility checks with shared curriculum filter helpers.
- Added topic search and simplified module expansion state so the screen is easier to reason about.
- Kept routing through the existing lesson/practical/practice decision:
  - lesson when `topic.hook || topic.lessonSteps?.length > 0`
  - practical when `topic.practicalId`
  - practice fallback
- Did not touch topic/question data, board rules, or the 9-step lesson flow.

### Learn screen verification
- GitNexus impact for `LearnScreen` reported LOW risk.
- `gitnexus_detect_changes` is not exposed in the local CLI, so staged-only verification was used as the scope check.
- Exported the staged index to a clean temporary checkout and verified:
  - `npm test` passed.
  - `npm run build` passed.
  - `npm run audit:curriculum` passed.
- `git diff --cached --check` passed before commit.
- GitNexus index refreshed after commit: 1,760 nodes, 3,485 edges, 102 clusters, 140 flows.

### Lesson player chrome cleanup
- Committed the lesson-player slice as `9568aed` (`Clean up lesson player chrome`).
- Kept the 9-step flow definition and lesson content untouched.
- Made the lesson shell calmer by replacing emoji-style affordances with icons/text, simplifying the footer CTA, and keeping completion handled by `SessionClose`.
- `nextTopicId` now respects the selected board/course when choosing the next unmastered topic.
- Exam-count loading is now dynamic so lesson entry does not eagerly pull the exam index.

### Lesson player verification
- GitNexus impact for `LessonPlayer` reported LOW risk.
- `gitnexus_detect_changes` is not exposed in the local CLI, so staged-only verification was used as the scope check.
- Exported the staged index to a clean temporary checkout and verified:
  - `npm test` passed.
  - `npm run build` passed.
  - `npm run audit:curriculum` passed.
- `git diff --cached --check` passed before commit.
- GitNexus index refreshed after commit: 1,761 nodes, 3,487 edges, 101 clusters, 140 flows.

### Timed paper controls cleanup
- Committed the timed-paper slice as `d6e023b` (`Polish timed paper controls`).
- Aligned timed-paper colours/copy with the shared app palette and `PageHeader`.
- Preserved the hide-timer comfort control; the dirty version had removed it, so it was restored before commit.
- Pause/continue controls remain available and saved to session storage.
- Time-up result saving uses the score ref and computed total marks, matching the timed-paper scoring helpers.

### Timed paper verification
- GitNexus impact for `TimedPaper` reported LOW risk.
- `gitnexus_detect_changes` is not exposed in the local CLI, so staged-only verification was used as the scope check.
- Exported the staged index to a clean temporary checkout and verified:
  - `npm test` passed.
  - `npm run build` passed.
  - `npm run audit:curriculum` passed.
- `git diff --cached --check` passed before commit.
- GitNexus index refreshed after commit: 1,765 nodes, 3,489 edges, 103 clusters, 140 flows.

### Public/support screen cleanup
- Committed the support-screen slice as `28076f3` (`Clean up public support screens`).
- Updated public landing claims to match the AQA/Edexcel release scope (`2` exam boards, not `6`).
- Polished splash, landing, terms, privacy, and spec checklist presentation/copy.
- Privacy/terms now describe local progress, optional synced comfort settings, and local Mamo chat thread storage more accurately.
- `SpecChecklist` and `useStudyPlan` now use shared curriculum/course helpers so combined/physics-only filtering is consistent.

### Support screen verification
- GitNexus impact checks for touched screen symbols reported LOW risk.
- GitNexus impact for `useStudyPlan` reported LOW risk with direct dependents `HomeScreen` and `StudyPlanScreen`.
- `gitnexus_detect_changes` is not exposed in the local CLI, so staged-only verification was used as the scope check.
- Exported the staged index to a clean temporary checkout and verified:
  - `npm test` passed.
  - `npm run build` passed.
  - `npm run audit:curriculum` passed.
- `git diff --cached --check` passed before commit.
- GitNexus index refreshed after commit: 1,768 nodes, 3,495 edges, 103 clusters, 141 flows.

### MamoChat mobile comfort cleanup
- Committed the chat slice as `fdfc654` (`Improve MamoChat mobile comfort`).
- Improved guest handling by routing guest attempts to sign-in instead of silently failing.
- Added visual viewport handling so the input bar follows the iOS keyboard more cleanly.
- Reduced starter prompts while the keyboard is open, softened copy/colours, and kept Mamo as signed-in-only support.
- Did not change the AI endpoint, prompt safety model, auth model, or GCSE physics content.

### MamoChat verification
- GitNexus impact for `MamoChat` reported LOW risk.
- `gitnexus_detect_changes` is not exposed in the local CLI, so staged-only verification was used as the scope check.
- Exported the staged index to a clean temporary checkout and verified:
  - `npm test` passed.
  - `npm run build` passed.
  - `npm run audit:curriculum` passed.
- `git diff --cached --check` passed before commit.
- GitNexus index refreshed after commit: 1,768 nodes, 3,497 edges, 101 clusters, 141 flows.

### Worktree triage docs cleanup
- Committed docs cleanup as `929415f` (`Update worktree triage docs`).
- Updated `docs/WORKTREE_TRIAGE.md` so it reflects the cleanup buckets that are now committed.
- Updated `docs/RELEASE_READINESS.md` release-check commands after the root README move.
- Moved the untracked root `README.md` into `docs/QUESTION_BANK_STARTER.md` because it describes a question-bank starter package, not the app root.
- Left remaining question-bank/topic data dirty for explicit content review because it includes non-release board additions and large split-bank deletions.
- GitNexus index refreshed after commit: 1,773 nodes, 3,500 edges, 103 clusters, 141 flows.

### Unused split-bank cleanup
- Committed deletion of unreferenced split-bank files as `c87a232` (`Remove unused split question banks`).
- Verified no runtime source imports referenced:
  - `qb-atomic-part1.js`
  - `qb-atomic-part2.js`
  - `qb-electricity-part1.js`
  - `qb-electricity-part2.js`
  - `qb-waves-part1.js`
  - `qb-waves-part2.js`
- Exported the staged index to a clean temporary checkout and verified:
  - `npm test` passed.
  - `npm run build` passed.
  - `npm run audit:curriculum` passed.
- Left live question-bank additions/edits dirty because they include content and non-release board material.
- GitNexus index refreshed after commit: 1,772 nodes, 3,502 edges, 101 clusters, 141 flows.

### Remaining content experiments quarantined
- Preserved the remaining dirty question/topic data changes in `.quarantine/deferred-question-content.patch`.
- Preserved the untracked runtime export script in `.quarantine/export_runtime_questions.py`.
- Restored the tracked data/topic files to the committed release state because the dirty content included non-release board material and should not ship in the AQA/Edexcel release.
- Added `.quarantine/` to `.gitignore` so local deferred experiments cannot be staged accidentally.
- Updated `docs/WORKTREE_TRIAGE.md` with the quarantine location and next review steps.
- Final release checks passed:
  - `npm test` passed. It printed a local Vite websocket port warning, but exited 0 and all smoke checks passed.
  - `npm run build` passed.
  - `npm run audit:curriculum` passed.
  - V2 reference scan passed.
  - Unsupported-board public/docs claim scan passed.
  - iOS simulator build passed with `CODE_SIGNING_ALLOWED=NO`.
- GitNexus index refreshed after final cleanup: 1,760 nodes, 3,476 edges, 101 clusters, 140 flows.

### Runtime-backed practice layer cleanup
- Committed the practice/runtime bucket as `ec9643b` (`Integrate runtime-backed practice layer`).
- Added the runtime-backed question repository and adaptive engine:
  - `src/lib/questionRepository.js`
  - `src/lib/adaptiveEngine.js`
  - `src/hooks/useAdaptiveRuntime.js`
- Added `PracticeHubScreen` and wired `/practice-tools` in `App.jsx`.
- Updated practice entry points to use the runtime repository where this bucket already intended it:
  - `AdaptivePractice`
  - `QuickWinScreen`
  - `MixedRevisionScreen`
  - `RecallScreen`
  - `Grade9Challenge`
  - `useSRS`
- Included `@capacitor/network` with the App offline/runtime bucket instead of committing it separately.
- Added `docs/runtime-boundary-note.md` to explain the runtime boundary for human reviewers.
- Added the previously untracked `qb-recall-board-overlays.js` because committed `questionBank/index.js` already imports it; without this file, a clean checkout cannot build.
- Staged only the narrow topic metadata normalisations needed by the curriculum checker (`physics-only` -> `physics_only`) and left broader lesson-copy/question-content edits dirty for separate review.

### Runtime cleanup verification
- GitNexus query/impact fallback was used. New symbols were not yet indexed before commit, so direct impact lookup for new runtime symbols was unavailable; existing touched route symbols reported LOW risk.
- `gitnexus_detect_changes` is not exposed in the local CLI, so staged-only verification was used as the scope check.
- Exported the staged index to a clean temporary checkout and verified:
  - `npm test` passed.
  - `npm run build` passed.
  - `npm run audit:curriculum` passed.
- `git diff --cached --check` passed before commit.
- GitNexus index refreshed after commit: 1,736 nodes, 3,456 edges, 101 clusters, 138 flows.

### Remaining cleanup buckets
- Still dirty and intentionally not committed:
  - UI/comfort/safe-area component changes
  - lesson component polish
  - question-bank split/deletion work
  - topic lesson-copy edits
  - practical PNG -> WebP replacement
  - auth/main/offline boundary changes outside the runtime bucket
  - README and runtime export script

### Practical infographic asset cleanup
- Committed asset-only practical infographic cleanup as `2b09120` (`Use WebP practical infographics`).
- Replaced the large RP1/RP2 PNG files with WebP equivalents:
  - `public/practicals/RP1.webp`
  - `public/practicals/RP2.webp`
- Updated only the necessary `TabMethod` image path in `PracticalScreen` from `.png` to `.webp`.
- Added lazy/async image hints for the infographic image.
- Left unrelated `PracticalScreen` wording/layout edits dirty for separate review.

### Practical asset verification
- GitNexus impact checks for `PracticalScreen` and `TabMethod` reported LOW risk.
- Confirmed WebP files are valid image binaries.
- Exported the staged index to a clean temporary checkout and verified:
  - `npm test` passed.
  - `npm run build` passed.
  - `npm run audit:curriculum` passed.
- `git diff --cached --check` passed before commit.
- GitNexus index refreshed after commit: 1,740 nodes, 3,459 edges, 102 clusters, 138 flows.

### Practical screen presentation cleanup
- Committed practical visual polish as `53d8eca` (`Polish practical screen presentation`).
- Kept this visual-only:
  - improved `RealWorldCard` spacing/surface styling
  - replaced warning emoji labels with text labels for cleaner rendering
  - changed `Lab Setup` to `Lab setup`
  - let long practical titles wrap instead of truncating
- No practical methods, hazards arrays, calculations, question content, routing, or board logic were changed.

### Practical presentation verification
- GitNexus impact checks for `PracticalScreen`, `SetupSpring`, `TabOverview`, `TabSetup`, and `RealWorldCard` reported LOW risk.
- Exported the staged index to a clean temporary checkout and verified:
  - `npm test` passed.
  - `npm run build` passed.
  - `npm run audit:curriculum` passed.
- `git diff --cached --check` passed before commit.
- GitNexus index refreshed after commit: 1,741 nodes, 3,461 edges, 101 clusters, 138 flows.

### Comfort UI foundation cleanup
- Committed shared UI/comfort foundation cleanup as `82a7b7f` (`Clean up comfort UI foundation`).
- Kept this as a foundation bucket only:
  - updated global design tokens and reusable utility classes in `index.css`
  - refined `ComfortSettings` styling/copy while preserving preference keys and behaviour
  - changed comfort preset icons from emoji to text initials for cleaner rendering
  - improved `PageHeader` wrapping, optional eyebrow support, and quiet surface styling
  - added `ownsTopInset` support to `SafeAreaPage`
  - simplified the crash fallback display in `main.jsx`
- No 9-step lesson flow, question content, board rules, XP/streak logic, or route ownership changed.

### Comfort foundation verification
- GitNexus impact check for `useComfort` reported HIGH because it is used across Settings, LessonPlayer, overlays, and comfort UI. The staged context change did not alter the `useComfort` API or stored preference shape.
- Other impact checks for `ComfortProvider`, `ComfortSettings`, `SafeAreaPage`, and `PageHeader` reported LOW.
- Exported the staged index to a clean temporary checkout and verified:
  - `npm test` passed.
  - `npm run build` passed.
  - `npm run audit:curriculum` passed.
- `git diff --cached --check` passed before commit.
- GitNexus index refreshed after commit: 1,745 nodes, 3,467 edges, 102 clusters, 139 flows.

### Learner-flow presentation cleanup
- Committed learner-flow presentation cleanup as `1d5b71a` (`Polish learner flow presentation`).
- Polished:
  - `BreakNudge`
  - `HeartsDisplay`
  - `GuidedPracticeFader`
  - `HookCard`
  - `LessonHeader`
  - `SessionClose`
  - `SessionPreview`
- Kept this presentation-only:
  - no lesson step ordering changes
  - no 9-step lesson flow changes
  - no scoring/mastery changes
  - no question/content data edits
  - no route changes
- Restored the risky `LessonHeader` safe-area padding line before commit so cleanup did not remove notch protection.

### Learner-flow verification
- GitNexus impact checks for all touched learner-flow components reported LOW risk.
- Exported the staged index to a clean temporary checkout and verified:
  - `npm test` passed.
  - `npm run build` passed.
  - `npm run audit:curriculum` passed.
- `git diff --cached --check` passed before commit.
- GitNexus index refreshed after commit: 1,749 nodes, 3,469 edges, 104 clusters, 139 flows.

### Question-component presentation cleanup
- Committed visual-only question component cleanup as `2842d4d` (`Polish question component presentation`).
- Polished:
  - `CalculationQuestion`
  - `ConfusionBusterQuestion`
  - `ExtendedAnswerQuestion`
  - `GraphQuestion`
  - `NovelContextQuestion`
  - `RecallQuestion`
  - `Card`
- Kept this commit visual-only:
  - removed emoji labels from question UI copy
  - improved graph sizing/readability
  - aligned card styling with the shared surface tokens
  - did not change answer checking, marking logic, callbacks, question data, or pedagogy
- Left behaviour/scoring changes dirty for the next bucket:
  - richer `onComplete` score objects in extended/novel questions
  - full mark-range self-score choices
  - calculation keyboard viewport handling

### Question presentation verification
- GitNexus impact checks for all touched question components reported LOW risk.
- Exported the staged index to a clean temporary checkout and verified:
  - `npm test` passed.
  - `npm run build` passed.
  - `npm run audit:curriculum` passed.
- `git diff --cached --check` passed before commit.
- GitNexus index refreshed after commit: 1,749 nodes, 3,471 edges, 102 clusters, 139 flows.

### Question behaviour/scoring cleanup
- Committed question outcome contract cleanup as `21b7e19` (`Fix question outcome scoring contracts`).
- `ExtendedAnswerQuestion` and `NovelContextQuestion` now return structured outcomes with:
  - `marksAwarded`
  - `marksAvailable`
  - `correct`
  - `source`
  - `selfScore` / `score` where relevant
- `NovelContextQuestion` self-review now offers every mark value from `0` to full marks instead of only `0`, midpoint, and full marks.
- `CalculationQuestion` now handles iOS keyboard viewport pressure by hiding the worked-example panel while the keyboard is open and scrolling the answer input into view.
- `Grade9Challenge` now normalises object outcomes via `outcome.correct`, avoiding the old bug where any score object would be treated as truthy/correct.

### Question behaviour verification
- GitNexus impact checks for `CalculationQuestion`, `ExtendedAnswerQuestion`, `NovelContextQuestion`, and `Grade9Challenge` reported LOW risk.
- Caller contract check:
  - `TimedPaper` already uses `normaliseTimedPaperOutcome`.
  - `ExamPractice` already accepts rich outcome objects.
  - `Grade9Challenge` was patched in this bucket.
- Exported the staged index to a clean temporary checkout and verified:
  - `npm test` passed.
  - `npm run build` passed.
  - `npm run audit:curriculum` passed.
- `git diff --cached --check` passed before commit.
- GitNexus index refreshed after commit: 1,752 nodes, 3,473 edges, 103 clusters, 139 flows.

### Code-structure cleanup helpers
- Added small `src/features/` helper modules without moving large route screens.
- Extracted timed-paper session helpers for computed total marks, outcome normalisation, restored state parsing, unanswered-answer normalisation, and time-used calculation.
- Extracted shared topic study routing while preserving the exact lesson gate: `topic.hook || topic.lessonSteps?.length > 0`, then practical route, then practice fallback.
- Extracted settings/profile localStorage helpers while keeping the same keys: `neurophysics_profile` and `neurophysics_prefs`.
- Extracted board/course display helpers for board option ordering and course labels without touching `getSelectedBoard`, board filtering, or board config rules.
- Expanded smoke tests:
  - `scripts/smoke-timed-paper-scoring.mjs`
  - `scripts/smoke-topic-routing.mjs`
  - `scripts/smoke-settings-storage.mjs`
  - `scripts/smoke-board-course-display.mjs`
- Updated `src/features/README.md` to explain what belongs in features and why screens stay route-owned until extracted safely.

### Verification
- `npm test` passed.
- `npm run build` passed.
- `npm run audit:curriculum` passed.
- `git diff --cached --check` passed before commits.
- GitNexus impact checks were run before symbol edits. `TimedPaper`, `QuickWinScreen`, `MixedRevisionScreen`, `SettingsScreen`, and `OnboardingScreen` were LOW risk. `getSelectedBoard` was CRITICAL, so it was intentionally not edited.
- GitNexus index was refreshed after each commit.

### Commits
- `35ec5e7` Extract timed paper session helpers
- `0ed37f0` Extract topic study routing helper
- `a1e2232` Extract settings storage helpers
- `40a6819` Document feature helper structure
- `344cde3` Extract board course display helpers

### Notes
- Existing dirty/untracked historical work remains intentionally uncommitted.
- No V2 resurrection, no question-bank/content edits, no 9-step lesson-flow changes, and no broad folder reshuffle.

### Repo hygiene cleanup
- Added `.gitignore` rules for local backup/prototype/scratch files:
  - `*.backup`
  - `prototypes/`
  - `skills-lock.json`
  - root scratch files `/Design` and `/EVERY`
  - `.DS_Store` files at any depth
- Removed tracked `src/.DS_Store` from Git while leaving local files alone.
- Updated `docs/WORKTREE_TRIAGE.md` to document the ignored local-noise bucket.
- Commit: `eb7c515` Ignore local scratch files
- Verification passed: `npm test`, `npm run build`, `git diff --cached --check`.

### Remaining dirty worktree triage
- Expanded `docs/WORKTREE_TRIAGE.md` with clear buckets for the remaining dirty files:
  - keep for focused review
  - restore or replace only with explicit approval
  - promote into docs/tools only if wanted
  - config and release-surface review
- No dirty code/content files were staged or changed during this triage pass.
- Commit: `24f5ccc` Document remaining dirty worktree buckets
- Verification passed: `npm test`, `npm run build`, `git diff --cached --check`.

### Config and release-surface cleanup
- Kept release-safe config/docs changes:
  - `AGENTS.md` GitNexus index counts refreshed.
  - `public/privacy.html` now reflects comfort-setting sync and local Mamo chat thread storage.
  - `public/terms.html` added for public web access to Terms of service.
  - `vercel.json` CSP now allows Plausible, matching the committed analytics script in `index.html`.
  - `vite.config.js` Supabase no-cache regex fixed and data chunking made more granular.
- Restored `CLAUDE.md` to the accurate committed version because the dirty rewrite incorrectly claimed TypeScript and the wrong live domain.
- Left `package.json` and `package-lock.json` dirty because their `@capacitor/network` dependency belongs with the separate uncommitted App offline/PracticeHub changes.
- Commit: `e0186c8` Clean release surface config
- Commit: `485693a` Refresh GitNexus project instructions
- Verification passed: `npm test`, `npm run build`, `git diff --cached --check`.

### AQA + Edexcel release hardening
- Release claims are now scoped to AQA and Edexcel only in public metadata and release docs.
- Removed active V2 release surface by verification: no `np_ui_v2`, `?v2`, or `*ScreenV2` references are present in shipped source/docs.
- Updated Open Graph/Twitter metadata and regenerated social preview PNGs from the current AQA/Edexcel SVG.
- TimedPaper no longer claims a hard-coded 35 marks. It displays the computed mark total from the generated paper.
- TimedPaper scoring now recomputes total marks from the current answer map, so revisiting/re-answering a question replaces marks instead of adding duplicates.
- AI endpoint rate limiting now fails closed if Upstash is missing.
- Supabase server auth now accepts `SUPABASE_URL` or `VITE_SUPABASE_URL`.
- Service worker no longer caches Supabase auth/data responses.
- OpenDyslexic font files were replaced with valid OpenType binaries and added to the PWA precache pattern.

### Verification
- `npm run build` passed.
- `npm run audit:curriculum` passed.
- iOS simulator build passed with `CODE_SIGNING_ALLOWED=NO`.
- `pnpm test` could not run because `pnpm` is not installed and the repo has no test script.
- `git diff --check` passed after removing one trailing whitespace line in `DiagnosticQuestion.jsx`.
- GitNexus impact checks were run for TimedPaper, getTimedPaperQuestions, rateLimitCheck, verifySupabaseJWT, and MasteryScreen. All reported LOW risk or unavailable target for non-indexed constants.

### Notes
- The repo still has many pre-existing dirty and untracked files. Do not commit broadly. Stage only the files from this release-hardening pass.

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
