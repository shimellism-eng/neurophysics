# Feature Structure

This folder is for feature-owned helpers that make the existing route screens
easier to read. It is not a dumping ground for full screen moves.

## What Belongs Here

- Small pure helpers with smoke tests.
- Storage wrappers that preserve the same localStorage keys.
- Route-decision helpers that keep the same destination rules.
- Thin feature utilities that can be reviewed without opening a giant screen.

## What Does Not Belong Here Yet

- Whole route screens from `src/screens/`.
- Question-bank content or curriculum data.
- The 9-step lesson flow.
- XP, streak, spaced-repetition, or board-filtering rule changes.
- Broad rewrites mixed with release fixes.

## Current Lanes

- `timed-paper/` - scoring, answer/session normalisation, computed mark helpers.
- `practice/` - shared practice-mode helpers.
- `settings/` - settings/profile persistence helpers.
- `lesson/` - lesson/practice/practical routing helpers only.
- `auth/` - tiny auth helpers only.

## Screen Ownership Rule

Route screens stay in `src/screens/` until a focused refactor has extracted the
logic around them first. Move helper logic before moving UI files. Each cleanup
commit should explain one concern, pass smoke checks, and avoid touching
pedagogy.
