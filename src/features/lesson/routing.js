export function getTopicStudyRoute(topic, topicId) {
  if (topic?.hook || topic?.lessonSteps?.length > 0) return `/lesson/${topicId}`
  if (topic?.practicalId) return `/practical/${topic.practicalId}`
  return `/practice/${topicId}`
}

export function navigateToTopicStudy(navigate, topic, topicId) {
  navigate(getTopicStudyRoute(topic, topicId))
}
