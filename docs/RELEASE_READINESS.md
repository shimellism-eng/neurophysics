# Release Readiness

## Current release scope

NeuroPhysics is shipping as an AQA and Edexcel GCSE Physics app for this release.

The runtime board selector and public question manifest expose only:

- AQA
- Edexcel

## Intentionally not shipped

- V2 UI experiments are not part of this release.
- Wider-board claims are not part of this release.
- OCR, WJEC/Eduqas, and CCEA work must not appear in public marketing, metadata, app-store copy, or social preview assets.
- Historical experiments and generated import/database files are left out of release commits unless promoted deliberately.

## Verification checklist

Run these before deploying:

```bash
npm run build
npm test
npm run audit:curriculum
xcodebuild -project ios/App/App.xcodeproj -scheme App -sdk iphonesimulator -configuration Debug -destination 'generic/platform=iOS Simulator' build CODE_SIGNING_ALLOWED=NO
```

Run these release-claim checks:

```bash
rg "np_ui_v2|\\?v2|HomeScreenV2|TopicsScreenV2|PapersScreenV2|SettingsScreenV2" src docs public index.html CLAUDE.md README.md
rg "6 exam boards|2,900\\+|OCR-A|OCR-B|OCR Gateway|OCR 21C|OCR 21|WJEC|Eduqas|CCEA" index.html public README.md CLAUDE.md docs
```

Both commands should return no shipped release claims for V2 or unsupported boards.

After the web build passes, sync iOS assets:

```bash
npx cap sync ios
```
