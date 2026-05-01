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
