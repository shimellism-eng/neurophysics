/**
 * examIndex.js — merges all exam-style question data files
 * and exposes a single lookup function.
 */
import { getSelectedCourse, getValidatedBoard } from '../utils/boardConfig'
import { filterQuestionsForSelection, isQuestionAvailableForSelection, isTopicAvailableForSelection } from '../utils/curriculumFilters'

/** Filter a question list by the current board (used for g-value board splits) */
function filterBySelection(questions, boardId = getValidatedBoard(), course = getSelectedCourse()) {
  return filterQuestionsForSelection(questions, boardId, course)
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
export function getExamQuestions(subtopicId, { boardId = getValidatedBoard(), course = getSelectedCourse() } = {}) {
  if (!isTopicAvailableForSelection(subtopicId, boardId, course)) return []
  const questions = []

  // Calculations
  if (examCalculations[subtopicId]) {
    questions.push(...filterBySelection(examCalculations[subtopicId], boardId, course))
  }

  // Required practical sequence sorts + describe-method / error-analysis variants
  if (examPracticals[subtopicId]) {
    questions.push(...filterBySelection(examPracticals[subtopicId], boardId, course))
  }
  // _describe suffix keys hold method-description and error-analysis questions
  if (examPracticals[subtopicId + '_describe']) {
    questions.push(...filterBySelection(examPracticals[subtopicId + '_describe'], boardId, course))
  }

  // Particle model fill-in-the-steps
  if (examParticleModel[subtopicId]) {
    questions.push(...filterBySelection(examParticleModel[subtopicId], boardId, course))
  }

  // Graph reading questions
  if (examGraphs[subtopicId]) {
    questions.push(...filterBySelection(examGraphs[subtopicId], boardId, course))
  }

  // Space topic questions
  if (examSpace[subtopicId]) {
    questions.push(...filterBySelection(examSpace[subtopicId], boardId, course))
  }

  // Equation recall (MCQ-style)
  if (examEquations[subtopicId]) {
    questions.push(...filterBySelection(examEquations[subtopicId], boardId, course))
  }

  // Extended 6-mark open-ended questions
  if (examExtended[subtopicId]) {
    questions.push(...filterBySelection(examExtended[subtopicId], boardId, course))
  }

  // Diagram-based past paper style questions
  if (examDiagramQs[subtopicId]) {
    questions.push(...filterBySelection(examDiagramQs[subtopicId], boardId, course))
  }

  // Grade 9 chained-equation calculations
  if (examChained[subtopicId]) {
    questions.push(...filterBySelection(examChained[subtopicId], boardId, course))
  }

  return questions
}

/**
 * Get count of exam questions available for a topic.
 */
export function getExamQuestionCount(subtopicId, options) {
  return getExamQuestions(subtopicId, options).length
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
export function getGrade9Questions(course = getSelectedCourse(), boardId = getValidatedBoard()) {
  const questions = []

  // Chained-equation multi-step calculations from all topics
  Object.entries(examChained).forEach(([topicId, qs]) => {
    if (!isTopicAvailableForSelection(topicId, boardId, course)) return
    questions.push(...filterBySelection(qs, boardId, course))
  })

  // RPA "too high / too low" error direction questions
  examRPAErrors.forEach(q => {
    if (isQuestionAvailableForSelection(q, boardId, course)) questions.push(q)
  })

  // Novel-context 6-mark questions
  examNovelContext.forEach(q => {
    if (isQuestionAvailableForSelection(q, boardId, course)) questions.push(q)
  })

  // Shuffle
  for (let i = questions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[questions[i], questions[j]] = [questions[j], questions[i]]
  }

  return questions
}

/**
 * Get a balanced mini-paper for timed practice.
 * Structure: MCQ → short answer → calculation → extended.
 * @param {string} [course] - 'combined' | 'physics_only' | undefined
 */
export function getTimedPaperQuestions(course = getSelectedCourse(), boardId = getValidatedBoard()) {
  const paper = []

  // Section A — 5 × MCQ / equation-recall (1 mark each)
  const mcqPool = []
  Object.entries(examEquations).forEach(([topicId, qs]) => {
    if (!isTopicAvailableForSelection(topicId, boardId, course)) return
    mcqPool.push(...filterBySelection(qs, boardId, course))
  })
  paper.push(...mcqPool.sort(() => Math.random() - 0.5).slice(0, 5))

  // Section B — Short answer: 2 × calculation (tier 1–2) + 1 × RPA error
  const calcPool = []
  Object.entries(examCalculations).forEach(([topicId, qs]) => {
    if (!isTopicAvailableForSelection(topicId, boardId, course)) return
    calcPool.push(...filterBySelection(qs, boardId, course).filter(q => q.tier <= 2))
  })
  paper.push(...calcPool.sort(() => Math.random() - 0.5).slice(0, 2))

  const rpaPool = filterBySelection(examRPAErrors, boardId, course)
  if (rpaPool.length > 0) paper.push(rpaPool[Math.floor(Math.random() * rpaPool.length)])

  // Section C — Chained calculation (tier 3) + graph/diagram
  const chainPool = []
  Object.entries(examChained).forEach(([topicId, qs]) => {
    if (!isTopicAvailableForSelection(topicId, boardId, course)) return
    chainPool.push(...filterBySelection(qs, boardId, course))
  })
  if (chainPool.length > 0) paper.push(chainPool[Math.floor(Math.random() * chainPool.length)])

  const graphPool = []
  Object.entries(examGraphs).forEach(([topicId, qs]) => {
    if (!isTopicAvailableForSelection(topicId, boardId, course)) return
    graphPool.push(...filterBySelection(qs, boardId, course))
  })
  if (graphPool.length > 0) paper.push(graphPool[Math.floor(Math.random() * graphPool.length)])

  // Section D — Novel context OR extended 6-mark
  const novelPool = filterBySelection(examNovelContext, boardId, course)
  if (novelPool.length > 0) paper.push(novelPool[Math.floor(Math.random() * novelPool.length)])

  return paper
}
