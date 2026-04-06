/**
 * interactiveIndex.js — merges both interactive question files
 * and exposes a single lookup function.
 */
import interactiveQuestions from './interactiveQuestions'
import interactiveQuestions2 from './interactiveQuestions2'

const allInteractive = { ...interactiveQuestions, ...interactiveQuestions2 }

/**
 * Return the 5 interactive questions for a given subtopic ID,
 * or an empty array if not found.
 */
export function getInteractiveQuestions(subtopicId) {
  return allInteractive[subtopicId] || []
}

export default allInteractive
