/**
 * Question bank index — aggregates all adaptive question bank files.
 *
 * Question schema:
 * {
 *   id: string,              // unique e.g. 'es_t1_01'
 *   topicId: string,         // matches TOPICS key
 *   course: 'combined'|'physics_only',
 *   tier: 1|2|3,
 *   type: 'mcq'|'calculation'|'short_answer'|'extended',
 *   marks: number,
 *   timeExpected: number,    // seconds (threshold for "confident" answer)
 *   question: string,
 *   // MCQ only:
 *   options: string[],
 *   correctIndex: number,
 *   // Calculation only:
 *   answer: number,
 *   unit: string,
 *   acceptableRange: [number, number],
 *   // Short answer / extended:
 *   markScheme: string[],
 *   senNote: string,
 * }
 */

import energyQuestions from './qb-energy'
import electricityQuestions from './qb-electricity'
import forcesQuestions from './qb-forces'
import wavesQuestions from './qb-waves'
import particleQuestions from './qb-particle'
import atomicQuestions from './qb-atomic'
import magnetismQuestions from './qb-magnetism'
import spaceQuestions from './qb-space'
import practicalsQuestions from './qb-practicals'
import keyConceptsQuestions from './qb-keyconcepts'
import globalChallengesQuestions from './qb-globalchallenges'
import universeOCRQuestions from './qb-universe-ocr'

export const ALL_QUESTIONS = [
  ...energyQuestions,
  ...electricityQuestions,
  ...forcesQuestions,
  ...wavesQuestions,
  ...particleQuestions,
  ...atomicQuestions,
  ...magnetismQuestions,
  ...spaceQuestions,
  ...practicalsQuestions,
  ...keyConceptsQuestions,
  ...globalChallengesQuestions,
  ...universeOCRQuestions,
]

/**
 * Get questions for a specific topic, optionally filtered by tier and board.
 * Questions with no boards field are shown for all boards.
 */
export function getQuestionsForTopic(topicId, tier = null, board = null) {
  return ALL_QUESTIONS.filter(q =>
    q.topicId === topicId &&
    (tier === null || q.tier === tier) &&
    (q.boards == null || q.boards.length === 0 || !board || q.boards.includes(board))
  )
}

/**
 * Get next adaptive question for a topic at a given tier.
 * Excludes recently seen question IDs to avoid repetition.
 * board: board id string (e.g. 'aqa', 'wjec') — questions with a boards array
 *        are only shown if the current board is in that array.
 *        Questions with no boards field are shown for every board.
 */
export function getNextQuestion(topicId, tier, excludeIds = [], course = 'all', board = null) {
  const matchesCourse = (q) => course === 'all' || q.course === 'combined'
  const matchesBoard  = (q) => q.boards == null || q.boards.length === 0 || !board || q.boards.includes(board)
  const pool = ALL_QUESTIONS.filter(q =>
    q.topicId === topicId &&
    q.tier === tier &&
    !excludeIds.includes(q.id) &&
    matchesCourse(q) &&
    matchesBoard(q)
  )
  if (pool.length === 0) {
    // Fall back to any unseen question at this tier (respecting course/board filters)
    const fallback = ALL_QUESTIONS.filter(q =>
      q.topicId === topicId &&
      q.tier === tier &&
      matchesCourse(q) &&
      matchesBoard(q)
    )
    if (fallback.length === 0) return null
    return fallback[Math.floor(Math.random() * fallback.length)]
  }
  return pool[Math.floor(Math.random() * pool.length)]
}

/**
 * Get total question count.
 */
export function getTotalQuestionCount() {
  return ALL_QUESTIONS.length
}

/**
 * Get question count per topic.
 */
export function getQuestionCountForTopic(topicId) {
  return ALL_QUESTIONS.filter(q => q.topicId === topicId).length
}

/**
 * Get questions filtered by course.
 */
export function getQuestionsForCourse(course) {
  if (course === 'physics_only') return ALL_QUESTIONS
  return ALL_QUESTIONS.filter(q => q.course === 'combined')
}
