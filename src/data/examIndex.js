/**
 * examIndex.js — merges all exam-style question data files
 * and exposes a single lookup function.
 */
import { PHYSICS_ONLY_TOPICS } from './topics'
import { getValidatedBoard } from '../utils/boardConfig'

/** Filter a question list by the current board (used for g-value board splits) */
function filterByBoard(questions) {
  const boardId = getValidatedBoard()
  return questions.filter(q => !q.boards || q.boards.includes(boardId))
}
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
    questions.push(...filterByBoard(examCalculations[subtopicId]))
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
 * @param {string} [course] - 'combined' | 'physics_only' | undefined
 */
export function getGrade9Questions(course) {
  const questions = []
  const physicsOnly = course === 'combined'  // if combined, exclude physics-only topics

  // Chained-equation multi-step calculations from all topics
  Object.entries(examChained).forEach(([topicId, qs]) => {
    if (physicsOnly && PHYSICS_ONLY_TOPICS.has(topicId)) return
    questions.push(...qs)
  })

  // RPA "too high / too low" error direction questions
  examRPAErrors.forEach(q => {
    if (physicsOnly && q.topicId && PHYSICS_ONLY_TOPICS.has(q.topicId)) return
    questions.push(q)
  })

  // Novel-context 6-mark questions
  examNovelContext.forEach(q => {
    if (physicsOnly && q.topic && PHYSICS_ONLY_TOPICS.has(q.topic)) return
    questions.push(q)
  })

  // Shuffle
  for (let i = questions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[questions[i], questions[j]] = [questions[j], questions[i]]
  }

  return questions
}

/**
 * Get a balanced mini-paper for timed practice (35 marks).
 * Structure: MCQ → short answer → calculation → extended.
 * @param {string} [course] - 'combined' | 'physics_only' | undefined
 */
export function getTimedPaperQuestions(course) {
  const paper = []
  const physicsOnly = course === 'combined'

  // Section A — 5 × MCQ / equation-recall (1 mark each)
  const mcqPool = []
  Object.entries(examEquations).forEach(([topicId, qs]) => {
    if (physicsOnly && PHYSICS_ONLY_TOPICS.has(topicId)) return
    mcqPool.push(...qs)
  })
  paper.push(...mcqPool.sort(() => Math.random() - 0.5).slice(0, 5))

  // Section B — Short answer: 2 × calculation (tier 1–2) + 1 × RPA error
  const calcPool = []
  Object.entries(examCalculations).forEach(([topicId, qs]) => {
    if (physicsOnly && PHYSICS_ONLY_TOPICS.has(topicId)) return
    calcPool.push(...filterByBoard(qs).filter(q => q.tier <= 2))
  })
  paper.push(...calcPool.sort(() => Math.random() - 0.5).slice(0, 2))

  const rpaPool = examRPAErrors.filter(q => !physicsOnly || !q.topicId || !PHYSICS_ONLY_TOPICS.has(q.topicId))
  if (rpaPool.length > 0) paper.push(rpaPool[Math.floor(Math.random() * rpaPool.length)])

  // Section C — Chained calculation (tier 3) + graph/diagram
  const chainPool = []
  Object.entries(examChained).forEach(([topicId, qs]) => {
    if (physicsOnly && PHYSICS_ONLY_TOPICS.has(topicId)) return
    chainPool.push(...qs)
  })
  if (chainPool.length > 0) paper.push(chainPool[Math.floor(Math.random() * chainPool.length)])

  const graphPool = []
  Object.entries(examGraphs).forEach(([topicId, qs]) => {
    if (physicsOnly && PHYSICS_ONLY_TOPICS.has(topicId)) return
    graphPool.push(...qs)
  })
  if (graphPool.length > 0) paper.push(graphPool[Math.floor(Math.random() * graphPool.length)])

  // Section D — Novel context OR extended 6-mark
  const novelPool = examNovelContext.filter(q => !physicsOnly || !q.topic || !PHYSICS_ONLY_TOPICS.has(q.topic))
  if (novelPool.length > 0) paper.push(novelPool[Math.floor(Math.random() * novelPool.length)])

  return paper
}
