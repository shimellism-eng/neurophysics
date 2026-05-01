# NeuroPhysics Curriculum Sign-Off Report

This release is signed off for AQA and Edexcel GCSE Physics only.

The runtime board selector and public question manifest expose two supported board routes:

| Board | Release status | Notes |
| --- | --- | --- |
| AQA | Supported | Board-filtered GCSE Physics route is live for this release. |
| Edexcel | Supported | Board-filtered GCSE Physics route is live for this release. |

## Release posture

- Public claims must say AQA and Edexcel only.
- The app must not advertise additional GCSE exam boards in metadata, app-store copy, public docs, or share images.
- Future board work can remain in internal data only if it is not exposed as a supported release claim.
- Curriculum validation for this release is scoped to the boards in `BOARD_ORDER`.

## Canonical release sources

- `src/utils/boardConfig.js`
- `public/data/questions/manifest.json`
- `docs/curriculum-coverage-matrix.md`
- `docs/board-overlay-checklists.md`
