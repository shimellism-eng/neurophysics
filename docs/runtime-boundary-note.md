# Runtime Boundary Note

This note freezes the current stable baseline for the runtime-backed practice layer.

## Runtime-Backed Now
These flows are now intentionally powered by exported runtime JSON plus the runtime repository:

- `/Users/mamo/neurophysics/src/screens/PracticeHubScreen.jsx`
- `/Users/mamo/neurophysics/src/screens/QuickWinScreen.jsx`
- `/Users/mamo/neurophysics/src/screens/MixedRevisionScreen.jsx`
- `/Users/mamo/neurophysics/src/screens/AdaptivePractice.jsx`
- `/Users/mamo/neurophysics/src/screens/RecallScreen.jsx`
- `/Users/mamo/neurophysics/src/hooks/useSRS.js`
- `/Users/mamo/neurophysics/src/lib/questionRepository.js`
- `/Users/mamo/neurophysics/public/data/questions/manifest.json`
- `/Users/mamo/neurophysics/public/data/questions/aqa/*.json`
- `/Users/mamo/neurophysics/public/data/questions/edexcel/*.json`

Supporting adaptive runtime baseline:

- `/Users/mamo/neurophysics/src/hooks/useAdaptiveRuntime.js`
- `/Users/mamo/neurophysics/src/lib/adaptiveEngine.js`

## Still On Legacy Rich Exam Data
These flows remain intentionally backed by the legacy rich exam question system:

- `/Users/mamo/neurophysics/src/screens/ExamPractice.jsx`
- `/Users/mamo/neurophysics/src/data/examIndex.js`
- `/Users/mamo/neurophysics/src/data/examCalculations.js`
- `/Users/mamo/neurophysics/src/data/examPracticals.js`
- `/Users/mamo/neurophysics/src/data/examParticleModel.js`
- `/Users/mamo/neurophysics/src/data/examGraphs.js`
- `/Users/mamo/neurophysics/src/data/examSpace.js`
- `/Users/mamo/neurophysics/src/data/examEquations.js`
- `/Users/mamo/neurophysics/src/data/examExtended.js`
- `/Users/mamo/neurophysics/src/data/examDiagramQs.js`
- `/Users/mamo/neurophysics/src/data/examChained.js`
- `/Users/mamo/neurophysics/src/data/examRPAErrors.js`
- `/Users/mamo/neurophysics/src/data/examNovelContext.js`

## Intentionally Out Of Scope For Runtime Unification
The following are intentionally out of scope for the current runtime unification work:

- rich exam interaction migration
- extended-answer / AI-marked exam flows
- graph, diagram, sequence, hotspot, and other non-MCQ rich exam types
- `ExamPractice` parity migration
- `TimedPaper` parity migration
- lesson flow changes

## Should Not Be Migrated Yet
Do not migrate these to the runtime JSON bank yet:

- `/Users/mamo/neurophysics/src/screens/ExamPractice.jsx`
- `/Users/mamo/neurophysics/src/screens/TimedPaper.jsx`
- `/Users/mamo/neurophysics/src/data/examIndex.js`
- the rich exam data files under `/Users/mamo/neurophysics/src/data/exam*.js`

Reason:

- current runtime JSON is MCQ-oriented
- migrating these now would preserve screen flow but downgrade rich exam behavior

## Current Stable Baseline Files
Treat these as the frozen stable baseline for the runtime-backed practice layer:

- `/Users/mamo/neurophysics/src/screens/PracticeHubScreen.jsx`
- `/Users/mamo/neurophysics/src/screens/QuickWinScreen.jsx`
- `/Users/mamo/neurophysics/src/screens/MixedRevisionScreen.jsx`
- `/Users/mamo/neurophysics/src/screens/AdaptivePractice.jsx`
- `/Users/mamo/neurophysics/src/screens/RecallScreen.jsx`
- `/Users/mamo/neurophysics/src/hooks/useSRS.js`
- `/Users/mamo/neurophysics/src/hooks/useAdaptiveRuntime.js`
- `/Users/mamo/neurophysics/src/lib/adaptiveEngine.js`
- `/Users/mamo/neurophysics/src/lib/questionRepository.js`

Unless there is a deliberate new decision, avoid further changes to these baseline runtime-backed practice files.
