/**
 * examIndex.js — merges all exam-style question data files
 * and exposes a single lookup function.
 */
import examCalculations from './examCalculations'
import examPracticals from './examPracticals'
import examParticleModel from './examParticleModel'
import examGraphs from './examGraphs'
import examSpace from './examSpace'
import examEquations from './examEquations'
import examExtended from './examExtended'
import examDiagramQs from './examDiagramQs'
import examChained from './examChained'
import examRPAErrors from './examRPAErrors'
import examNovelContext from './examNovelContext'

/**
 * Return all exam practice questions for a given subtopic ID.
 * Merges across all exam data sources.
 */
export function getExamQuestions(subtopicId) {
  const questions = []

  // Calculations
  if (examCalculations[subtopicId]) {
    questions.push(...examCalculations[subtopicId])
  }

  // Required practical sequence sorts + describe-method / error-analysis variants
  if (examPracticals[subtopicId]) {
    questions.push(...examPracticals[subtopicId])
  }
  // _describe suffix keys hold method-description and error-analysis questions
  if (examPracticals[subtopicId + '_describe']) {
    questions.push(...examPracticals[subtopicId + '_describe'])
  }

  // Particle model fill-in-the-steps
  if (examParticleModel[subtopicId]) {
    questions.push(...examParticleModel[subtopicId])
  }

  // Graph reading questions
  if (examGraphs[subtopicId]) {
    questions.push(...examGraphs[subtopicId])
  }

  // Space topic questions
  if (examSpace[subtopicId]) {
    questions.push(...examSpace[subtopicId])
  }

  // Equation recall (MCQ-style)
  if (examEquations[subtopicId]) {
    questions.push(...examEquations[subtopicId])
  }

  // Extended 6-mark open-ended questions
  if (examExtended[subtopicId]) {
    questions.push(...examExtended[subtopicId])
  }

  // Diagram-based past paper style questions
  if (examDiagramQs[subtopicId]) {
    questions.push(...examDiagramQs[subtopicId])
  }

  // Grade 9 chained-equation calculations
  if (examChained[subtopicId]) {
    questions.push(...examChained[subtopicId])
  }

  return questions
}

/**
 * Get count of exam questions available for a topic.
 */
export function getExamQuestionCount(subtopicId) {
  return getExamQuestions(subtopicId).length
}

/**
 * Get all topic IDs that have exam questions.
 */
export function getExamTopicIds() {
  const allSources = [
    examCalculations, examPracticals, examParticleModel, examGraphs,
    examSpace, examEquations, examExtended, examDiagramQs, examChained,
  ]
  const ids = new Set()
  allSources.forEach(source => {
    Object.keys(source).forEach(id => {
      // Strip _describe suffix so the ID maps to the real topic
      ids.add(id.replace(/_describe$/, ''))
    })
  })
  return [...ids]
}

/**
 * Get all Grade 9 discriminator questions (tier 3, mixed types).
 * Used by Grade9Challenge screen. Shuffled on each call.
 */
export function getGrade9Questions() {
  const questions = []

  // Chained-equation multi-step calculations from all topics
  Object.values(examChained).forEach(qs => questions.push(...qs))

  // RPA "too high / too low" error direction questions
  questions.push(...examRPAErrors)

  // Novel-context 6-mark questions
  questions.push(...examNovelContext)

  // Shuffle for variety
  for (let i = questions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[questions[i], questions[j]] = [questions[j], questions[i]]
  }

  return questions
}

/**
 * Get a balanced mini-paper for timed practice (35 marks).
 * Structure mirrors AQA: MCQ → short answer → calculation → extended.
 */
export function getTimedPaperQuestions() {
  const paper = []

  // Section A — 5 × MCQ / equation-recall (1 mark each)
  const mcqPool = []
  Object.values(examEquations).forEach(qs => mcqPool.push(...qs))
  const shuffledMCQ = mcqPool.sort(() => Math.random() - 0.5).slice(0, 5)
  paper.push(...shuffledMCQ)

  // Section B — Short answer: 2 × calculation (tier 1–2) + 1 × RPA error
  const calcPool = []
  Object.values(examCalculations).forEach(qs =>
    calcPool.push(...qs.filter(q => q.tier <= 2))
  )
  const shuffledCalc = calcPool.sort(() => Math.random() - 0.5).slice(0, 2)
  paper.push(...shuffledCalc)

  // 1 × RPA error direction question
  const rpaQ = examRPAErrors[Math.floor(Math.random() * examRPAErrors.length)]
  paper.push(rpaQ)

  // Section C — Chained calculation (tier 3) + graph/diagram
  const chainPool = []
  Object.values(examChained).forEach(qs => chainPool.push(...qs))
  const chainQ = chainPool[Math.floor(Math.random() * chainPool.length)]
  paper.push(chainQ)

  const graphPool = []
  Object.values(examGraphs).forEach(qs => graphPool.push(...qs))
  if (graphPool.length > 0) {
    paper.push(graphPool[Math.floor(Math.random() * graphPool.length)])
  }

  // Section D — Novel context OR extended 6-mark
  const novelQ = examNovelContext[Math.floor(Math.random() * examNovelContext.length)]
  paper.push(novelQ)

  return paper
}
