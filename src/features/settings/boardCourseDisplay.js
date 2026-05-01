export const COURSE_OPTIONS = [
  { id: 'combined', label: 'Combined Science', desc: 'Trilogy / Double Award', emoji: '🔬' },
  { id: 'physics_only', label: 'Physics Only', desc: 'Separate Science', emoji: '⚛️' },
]

export function getCourseOption(courseId) {
  return COURSE_OPTIONS.find(option => option.id === courseId) || COURSE_OPTIONS[0]
}

export function getCourseLabel(courseId) {
  return getCourseOption(courseId).label
}

export function getBoardOptions(boards, order) {
  return order
    .map(boardId => boards[boardId])
    .filter(Boolean)
}
