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

## Quarantined locally, not shipped

The remaining dirty content/tooling experiments were preserved locally and removed from the tracked worktree:

- `.quarantine/deferred-question-content.patch`
- `.quarantine/export_runtime_questions.py`

Why quarantined:

- The source diff added or altered question content.
- Some additions were for non-release boards (`ocr-a`, `ocr-b`, `wjec`, `ccea`).
- Release scope is AQA + Edexcel only.
- The export script may be useful later, but it is not required for this release path.

`.quarantine/` is ignored by Git so these local notes cannot accidentally ship.

### Moved doc

- Root `README.md` was moved to `docs/QUESTION_BANK_STARTER.md` because it describes a question-bank starter package, not the app root.

## Review rule

Use explicit path staging. Do not run `git add -A` while the worktree contains mixed historical changes.

If a file contains release work and unrelated content edits, stage only the release hunk or leave the file dirty for a later focused commit.

## Recommended next cleanup order

1. Review `.quarantine/deferred-question-content.patch` if we want to recover any AQA/Edexcel-only content later.
2. Review topic-copy changes with a pedagogy lens before reapplying any of them.
3. Decide whether `.quarantine/export_runtime_questions.py` belongs under `scripts/` or should stay local only.
4. Run the final clean build/audit/iOS build from a clean checkout before deployment.
