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
  const allSources = [examCalculations, examPracticals, examParticleModel, examGraphs, examSpace, examEquations, examExtended, examDiagramQs]
  const ids = new Set()
  allSources.forEach(source => {
    Object.keys(source).forEach(id => {
      // Strip _describe suffix so the ID maps to the real topic
      ids.add(id.replace(/_describe$/, ''))
    })
  })
  return [...ids]
}
