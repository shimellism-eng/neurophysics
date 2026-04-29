import { TOPICS } from '../data/topics'

export const BOARD_COURSE_TOPIC_OVERRIDES = {
  ccea: {
    // CCEA Double Award keeps more of the shared space and nuclear strands than
    // the generic combined-science split would allow. These overrides let the
    // board selector expose the board-faithful route without affecting others.
    moments: { combined: true },
    nuclear_fission: { combined: true },
    nuclear_fusion: { combined: true },
    solar_system: { combined: true },
    stellar_evolution: { combined: true },
    redshift: { combined: true },
  },
}

export function normalizeCourseValue(course) {
  if (course === 'physics-only') return 'physics_only'
  if (course === 'physics_only') return 'physics_only'
  if (course === 'combined') return 'combined'
  if (course === 'all') return 'all'
  return 'combined'
}

export function isBoardAvailableForSelection(boards, boardId) {
  return boards == null || !Array.isArray(boards) || boards.length === 0 || !boardId || boards.includes(boardId)
}

export function isCourseAvailableForSelection(itemCourse, selectedCourse = 'combined') {
  const normalizedCourse = normalizeCourseValue(itemCourse)
  const normalizedSelection = normalizeCourseValue(selectedCourse)

  if (normalizedSelection === 'all') return true
  if (normalizedSelection === 'physics_only') return normalizedCourse === 'combined' || normalizedCourse === 'physics_only'
  return normalizedCourse === 'combined'
}

function getTopicMeta(topicOrId) {
  if (!topicOrId) return null
  if (typeof topicOrId === 'string') return TOPICS[topicOrId] || null
  return topicOrId
}

function getTopicAvailabilityOverride(topicId, boardId, selectedCourse) {
  if (!topicId || !boardId) return null
  const normalizedSelection = normalizeCourseValue(selectedCourse)
  const boardOverrides = BOARD_COURSE_TOPIC_OVERRIDES[boardId]
  if (!boardOverrides) return null

  const topicOverrides = boardOverrides[topicId]
  if (!topicOverrides) return null

  if (Object.prototype.hasOwnProperty.call(topicOverrides, normalizedSelection)) {
    return topicOverrides[normalizedSelection]
  }

  return null
}

export function isTopicAvailableForSelection(topicOrId, boardId, course = 'combined') {
  const topic = getTopicMeta(topicOrId)
  if (!topic) return false
  if (!isBoardAvailableForSelection(topic.boards, boardId)) return false
  const topicId = typeof topicOrId === 'string' ? topicOrId : topic.id
  const override = getTopicAvailabilityOverride(topicId, boardId, course)
  if (override != null) return override
  return isCourseAvailableForSelection(topic.course, course)
}

export function getVisibleTopicIdsForSelection(topicIds = [], boardId, course = 'combined') {
  return topicIds.filter((topicId) => isTopicAvailableForSelection(topicId, boardId, course))
}

export function isModuleAvailableForSelection(module, boardId, course = 'combined') {
  if (!module) return false
  if (!isBoardAvailableForSelection(module.boards, boardId)) return false
  return getVisibleTopicIdsForSelection(module.topics, boardId, course).length > 0
}

export function isQuestionAvailableForSelection(question, boardId, course = 'combined') {
  if (!question) return false
  if (!isBoardAvailableForSelection(question.boards, boardId)) return false

  const topic = getTopicMeta(question.topicId || question.topic)
  if (topic && !isTopicAvailableForSelection(topic, boardId, course)) return false
  const questionCourse = question.course ?? topic?.course

  return isCourseAvailableForSelection(questionCourse, course)
}

export function filterQuestionsForSelection(questions = [], boardId, course = 'combined') {
  return questions.filter((question) => isQuestionAvailableForSelection(question, boardId, course))
}
