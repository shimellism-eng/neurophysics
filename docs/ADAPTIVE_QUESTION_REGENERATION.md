# Adaptive Question Regeneration

## Release Scope

Adaptive Practice is generated for AQA GCSE Physics 8463 and Pearson Edexcel GCSE Physics 1PH0 only.

The runtime app still reads the same JSON locations:

- `public/data/questions/aqa/*.json`
- `public/data/questions/edexcel/*.json`
- `public/data/questions/manifest.json`

The 9-step lesson flow, XP/streak logic, spaced repetition, board filtering, and Adaptive Practice selection code are not part of this regeneration pipeline.

## Source of Truth

Generation inputs live in `src/data/adaptiveQuestionSource/`:

- `specManifests.js` maps AQA and Edexcel specification references to runtime topics/subtopics.
- `questionBlueprints.js` defines response modes, contexts, and reviewed learning facts used to build questions.

The generator is `scripts/regenerate_adaptive_questions.mjs`.

Run:

```bash
npm run questions:regenerate
```

This rebuilds all AQA and Edexcel topic files plus `all.json` and `manifest.json` from the same source so the files cannot drift apart.

## Quality Gates

Run:

```bash
npm run audit:questions
```

The audit fails if production questions have:

- missing `specRef`, `specStatement`, learning objective, AO, demand, response mode, or review metadata
- duplicate exact stems
- near-duplicate skeleton stems
- repeated option sets
- repeated explanations
- null, placeholder, joke, "Different answer", "all of these", or "none of these" options
- overrepresented objective buckets above the approved limit
- topic JSON files that drift from `all.json`
- source manifest entries with no generated coverage

## Review Workflow

1. Update the spec manifest or blueprint facts.
2. Run `npm run questions:regenerate`.
3. Run `npm run audit:questions`.
4. Sample-review at least 10 generated questions per board for the touched topic.
5. Run `npm test` and `npm run build`.
6. Sync iOS assets with `npx cap sync ios` before simulator or device checks.

## Rollback

The old shipped bank is recoverable from git history. Do not keep a second archived copy under `public/`, because anything under `public/` can be shipped to learners.
