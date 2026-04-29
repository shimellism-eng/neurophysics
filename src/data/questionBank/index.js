/**
 * Question bank index — aggregates all adaptive question bank files.
 *
 * Question schema:
 * {
 *   id: string,              // unique e.g. 'es_t1_01'
 *   topicId: string,         // matches TOPICS key
 *   course: 'combined'|'physics_only',
 *   tier: 1|2|3,
 *   type: 'mcq'|'calculation'|'short_answer'|'extended'|'confusion_buster',
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
import confusionQuestions from './qb-confusion'
// ── Recall question banks (AQA-only, type:'recall') ──────────────────────────
import recallEnergyQuestions        from './qb-recall-energy'
import recallElectricityQuestions   from './qb-recall-electricity'
import recallParticlesQuestions     from './qb-recall-particles'
import recallAtomicQuestions        from './qb-recall-atomic'
import recallForcesQuestions        from './qb-recall-forces'
import recallWavesQuestions         from './qb-recall-waves'
import recallElectromagnetismQuestions from './qb-recall-electromagnetism'
import recallSpaceQuestions         from './qb-recall-space'
import recallBoardOverlayQuestions  from './qb-recall-board-overlays'
import { filterQuestionsForSelection, isQuestionAvailableForSelection } from '../../utils/curriculumFilters'

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
  ...confusionQuestions,
]

// Recall questions are kept separate — they use type:'recall' and are only
// served by RecallScreen, never by AdaptivePractice.
export const ALL_RECALL_QUESTIONS = [
  ...recallEnergyQuestions,
  ...recallElectricityQuestions,
  ...recallParticlesQuestions,
  ...recallAtomicQuestions,
  ...recallForcesQuestions,
  ...recallWavesQuestions,
  ...recallElectromagnetismQuestions,
  ...recallSpaceQuestions,
  ...recallBoardOverlayQuestions,
]

/**
 * Get questions for a specific topic, optionally filtered by tier, board, and course.
 * Questions with no boards field are shown for all boards.
 */
export function getQuestionsForTopic(topicId, tier = null, board = null, course = 'all') {
  return ALL_QUESTIONS.filter(q =>
    q.topicId === topicId &&
    (tier === null || q.tier === tier) &&
    isQuestionAvailableForSelection(q, board, course)
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
  const pool = ALL_QUESTIONS.filter(q =>
    q.topicId === topicId &&
    q.tier === tier &&
    !excludeIds.includes(q.id) &&
    isQuestionAvailableForSelection(q, board, course)
  )
  if (pool.length === 0) {
    // Fall back to any unseen question at this tier (respecting course/board filters)
    const fallback = ALL_QUESTIONS.filter(q =>
      q.topicId === topicId &&
      q.tier === tier &&
      isQuestionAvailableForSelection(q, board, course)
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
  return filterQuestionsForSelection(ALL_QUESTIONS, null, course)
}

/**
 * Get recall questions for a specific topic.
 * Includes both type:'recall' and type:'sequence_sort' from the recall banks.
 * board: if provided, filters out questions with a boards array that doesn't include this board.
 * course: 'combined' | 'physics_only' | 'all' (default 'all')
 */
export function getRecallQuestions(topicId, board = null, course = 'all') {
  return ALL_RECALL_QUESTIONS.filter(q => {
    if (q.topicId !== topicId) return false
    return isQuestionAvailableForSelection(q, board, course)
  })
}

/**
 * Get all recall questions for a topic area (module-level, not topic-level).
 * Used when a topic has no recall questions but its sibling topics do.
 */
export function getRecallQuestionCount(topicId, board = null) {
  return ALL_RECALL_QUESTIONS.filter(q => {
    if (q.topicId !== topicId) return false
    if (board && q.boards?.length > 0 && !q.boards.includes(board)) return false
    return true
  }).length
}
