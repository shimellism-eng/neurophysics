# Worktree Triage

## Current cleanup state

The release-hardening and structure cleanup has been split into small commits. Each code slice was verified from a staged-only checkout with:

- `npm test`
- `npm run build`
- `npm run audit:curriculum`
- `git diff --cached --check`

GitNexus impact checks were run before each symbol-touching slice. `gitnexus_detect_changes` is not exposed by the local CLI, so staged-only checkout verification was used as the scope fallback.

## Committed cleanup buckets

- Runtime-backed practice layer
- Practical WebP asset replacement
- Practical screen presentation polish
- Comfort/UI foundation cleanup
- Learner-flow presentation polish
- Question-component presentation cleanup
- Question behavior/scoring cleanup
- Auth, consent, and onboarding cleanup
- Learner progress/result screen cleanup
- Exam practice marks display cleanup
- Learn screen topic-browser cleanup
- LessonPlayer chrome cleanup
- TimedPaper controls cleanup
- Public/support screen cleanup
- MamoChat mobile comfort cleanup
- Unused split question-bank deletion

## Still dirty and not staged

These files remain dirty because they affect question content, board coverage, or generated/import experiments. They should not be mixed into a release cleanup commit.

### Question-bank and exam data

- `src/data/examCalculations.js`
- `src/data/examExtended.js`
- `src/data/questionBank/qb-atomic.js`
- `src/data/questionBank/qb-forces.js`
- `src/data/questionBank/qb-globalchallenges.js`
- `src/data/questionBank/qb-waves.js`

Why left out:

- They add or alter question content.
- Some additions are for non-release boards (`ocr-a`, `ocr-b`, `wjec`, `ccea`).
- Release scope is AQA + Edexcel only.

### Topic copy/data

- `src/data/topics-electricity.jsx`
- `src/data/topics-energy.jsx`
- `src/data/topics-forces.jsx`

Why left out:

- These are lesson/content copy changes.
- Some are harmless clarifications, but they should be reviewed as a pedagogy/content slice, not bundled with structure cleanup.

### Untracked tooling

- `scripts/export_runtime_questions.py`

Why left out:

- Looks like a useful export/import utility, but it is not required for the current release path.
- Should be reviewed with the question-bank/data pipeline work.

### Moved doc

- Root `README.md` was moved to `docs/QUESTION_BANK_STARTER.md` because it describes a question-bank starter package, not the app root.

## Review rule

Use explicit path staging. Do not run `git add -A` while the worktree contains mixed historical changes.

If a file contains release work and unrelated content edits, stage only the release hunk or leave the file dirty for a later focused commit.

## Recommended next cleanup order

1. Review AQA/Edexcel-only question-bank changes separately from non-release board additions.
2. Review topic-copy changes with a pedagogy lens.
3. Decide whether `scripts/export_runtime_questions.py` belongs under `scripts/` or should stay local only.
4. Run the final clean build/audit/iOS build from a clean checkout before deployment.
