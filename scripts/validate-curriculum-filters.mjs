import { createServer } from 'vite'

const failures = []

function assert(condition, message) {
  if (!condition) failures.push(message)
}

const server = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
})

try {
  globalThis.localStorage = {
    getItem(key) {
      if (key === 'np_board') return 'aqa'
      if (key === 'neurophysics_prefs') return JSON.stringify({ course: 'combined' })
      return null
    },
    setItem() {},
    removeItem() {},
  }

  const [
    { MODULES, PHYSICS_ONLY_TOPICS, TOPICS },
    questionBank,
    examIndex,
    boardConfig,
    filters,
    curriculumOrder,
    coverageMatrixModule,
    practicalCoverageModule,
  ] = await Promise.all([
    server.ssrLoadModule('/src/data/topics.jsx'),
    server.ssrLoadModule('/src/data/questionBank/index.js'),
    server.ssrLoadModule('/src/data/examIndex.js'),
    server.ssrLoadModule('/src/utils/boardConfig.js'),
    server.ssrLoadModule('/src/utils/curriculumFilters.js'),
    server.ssrLoadModule('/src/features/curriculum/curriculumOrder.js'),
    server.ssrLoadModule('/src/data/curriculumCoverageMatrix.js'),
    server.ssrLoadModule('/src/data/practicalCoverageMatrix.js'),
  ])

  const { ALL_QUESTIONS, getNextQuestion, getQuestionsForTopic, getRecallQuestions } = questionBank
  const { getExamQuestions, getGrade9Questions, getTimedPaperQuestions } = examIndex
  const { BOARD_ORDER } = boardConfig
  const { BOARD_COURSE_TOPIC_OVERRIDES, getVisibleTopicIdsForSelection, isQuestionAvailableForSelection, normalizeCourseValue } = filters
  const { getCurriculumModules } = curriculumOrder
  const { COVERAGE_STATUSES, CURRICULUM_COVERAGE_MATRIX } = coverageMatrixModule
  const { PRACTICAL_COVERAGE_MATRIX } = practicalCoverageModule

  const VALID_COURSES = new Set(['combined', 'physics_only'])
  const VALID_STATUSES = new Set(COVERAGE_STATUSES)
  const coverageByTopic = new Map(CURRICULUM_COVERAGE_MATRIX.map((row) => [row.topicId, row]))
  const practicalsByTopic = new Map()

  for (const practicalRow of PRACTICAL_COVERAGE_MATRIX) {
    if (!practicalsByTopic.has(practicalRow.topicId)) practicalsByTopic.set(practicalRow.topicId, [])
    practicalsByTopic.get(practicalRow.topicId).push(practicalRow)
  }

  for (const [topicId, topic] of Object.entries(TOPICS)) {
    assert(VALID_COURSES.has(normalizeCourseValue(topic.course)), `Invalid topic course "${topic.course}" on topic ${topicId}`)
  }

  for (const module of MODULES) {
    for (const topicId of module.topics) {
      assert(Boolean(TOPICS[topicId]), `Module "${module.name}" references missing topic "${topicId}"`)
    }
  }

  const derivedPhysicsOnly = new Set(
    Object.entries(TOPICS)
      .filter(([, topic]) => normalizeCourseValue(topic.course) === 'physics_only')
      .map(([topicId]) => topicId)
  )

  assert(
    derivedPhysicsOnly.size === PHYSICS_ONLY_TOPICS.size &&
      [...derivedPhysicsOnly].every((topicId) => PHYSICS_ONLY_TOPICS.has(topicId)),
    'PHYSICS_ONLY_TOPICS is out of sync with topic metadata'
  )

  assert(
    CURRICULUM_COVERAGE_MATRIX.length === Object.keys(TOPICS).length,
    'Curriculum coverage matrix does not include every topic exactly once'
  )

  for (const [topicId, topic] of Object.entries(TOPICS)) {
    const coverageRow = coverageByTopic.get(topicId)
    assert(Boolean(coverageRow), `Curriculum coverage matrix is missing topic "${topicId}"`)
    if (!coverageRow) continue

    assert(coverageRow.module != null, `Coverage row for "${topicId}" is missing module`)
    assert(coverageRow.ks4Strand != null, `Coverage row for "${topicId}" is missing KS4 strand`)
    assert(
      VALID_COURSES.has(normalizeCourseValue(coverageRow.courseAvailability)),
      `Coverage row for "${topicId}" has invalid course availability "${coverageRow.courseAvailability}"`
    )
    assert(
      VALID_STATUSES.has(coverageRow.confidence),
      `Coverage row for "${topicId}" has invalid confidence "${coverageRow.confidence}"`
    )

    for (const boardId of BOARD_ORDER) {
      const boardEntry = coverageRow.boards?.[boardId]
      assert(Boolean(boardEntry), `Coverage row for "${topicId}" is missing board column "${boardId}"`)
      if (!boardEntry) continue
      assert(
        VALID_STATUSES.has(boardEntry.status),
        `Coverage row for "${topicId}" has invalid status "${boardEntry.status}" for board ${boardId}`
      )
      assert(
        typeof boardEntry.specReference === 'string' && boardEntry.specReference.length > 0,
        `Coverage row for "${topicId}" is missing spec reference for board ${boardId}`
      )
    }

    assert(
      normalizeCourseValue(coverageRow.courseAvailability) === normalizeCourseValue(topic.course),
      `Coverage matrix course mismatch for "${topicId}": matrix=${coverageRow.courseAvailability}, topic=${topic.course}`
    )
  }

  for (const practicalTopicId of Object.keys(TOPICS).filter((topicId) => TOPICS[topicId]?.module === 'Required Practicals')) {
    const rows = practicalsByTopic.get(practicalTopicId)
    assert(Boolean(rows?.length), `Practical coverage matrix is missing practical topic "${practicalTopicId}"`)
  }

  for (const practicalRow of PRACTICAL_COVERAGE_MATRIX) {
    if (practicalRow.topicId != null) {
      assert(
        Boolean(TOPICS[practicalRow.topicId]),
        `Practical coverage row "${practicalRow.practicalId}" references missing topic "${practicalRow.topicId}"`
      )
    }
    assert(
      VALID_STATUSES.has(practicalRow.confidence),
      `Practical coverage row "${practicalRow.practicalId}" has invalid confidence "${practicalRow.confidence}"`
    )

    for (const boardId of BOARD_ORDER) {
      const boardEntry = practicalRow.boards?.[boardId]
      assert(Boolean(boardEntry), `Practical coverage row "${practicalRow.practicalId}" is missing board column "${boardId}"`)
      if (!boardEntry) continue
      assert(
        VALID_STATUSES.has(boardEntry.status),
        `Practical coverage row "${practicalRow.practicalId}" has invalid status "${boardEntry.status}" for board ${boardId}`
      )
      assert(
        typeof boardEntry.requirementReference === 'string' && boardEntry.requirementReference.length > 0,
        `Practical coverage row "${practicalRow.practicalId}" is missing requirement reference for board ${boardId}`
      )
      assert(
        typeof boardEntry.boardLabel === 'string' && boardEntry.boardLabel.length > 0,
        `Practical coverage row "${practicalRow.practicalId}" is missing board label for board ${boardId}`
      )
    }
  }

  for (const boardId of BOARD_ORDER) {
    for (const course of ['combined', 'physics_only']) {
      const curriculumModules = getCurriculumModules(MODULES, boardId, course)
      const curriculumTopicIds = curriculumModules.flatMap((module) => module.topics)
      const duplicateTopicIds = curriculumTopicIds.filter((topicId, index) => curriculumTopicIds.indexOf(topicId) !== index)
      assert(duplicateTopicIds.length === 0, `Curriculum order duplicates topics for board ${boardId} ${course}: ${duplicateTopicIds.join(', ')}`)
      assert(curriculumModules.length > 0, `Curriculum order has no visible modules for board ${boardId} ${course}`)
      if (boardId === 'aqa') {
        assert(curriculumModules[0]?.name === 'Energy', `AQA curriculum order should start with Energy for ${course}`)
      }
      if (boardId === 'edexcel') {
        assert(curriculumModules[0]?.name === 'Topic 1: Key Concepts of Physics', `Edexcel curriculum order should start with Topic 1 for ${course}`)
      }

      const visibleTopics = getVisibleTopicIdsForSelection(Object.keys(TOPICS), boardId, course)
      const leakedPhysicsOnly = visibleTopics.filter((topicId) => {
        if (course !== 'combined') return false
        if (normalizeCourseValue(TOPICS[topicId]?.course) !== 'physics_only') return false
        const boardOverride = BOARD_COURSE_TOPIC_OVERRIDES[boardId]?.[topicId]
        return boardOverride?.combined !== true
      })
      assert(
        leakedPhysicsOnly.length === 0,
        `Combined course leaks physics_only topics for board ${boardId}: ${leakedPhysicsOnly.join(', ')}`
      )

      for (const topicId of visibleTopics) {
        const coverageRow = coverageByTopic.get(topicId)
        const status = coverageRow?.boards?.[boardId]?.status
        assert(Boolean(coverageRow), `Visible topic "${topicId}" for board ${boardId} ${course} is missing from coverage matrix`)
        assert(
          status !== 'missing',
          `Visible topic "${topicId}" for board ${boardId} ${course} is marked missing in the coverage matrix`
        )

        const adaptiveSupport = getQuestionsForTopic(topicId, null, boardId, course).length
        const recallSupport = getRecallQuestions(topicId, boardId, course).length
        const examSupport = getExamQuestions(topicId, { boardId, course }).length
        const practicalSupport = (practicalsByTopic.get(topicId) || []).filter(
          (row) => row.boards?.[boardId] && row.boards[boardId].status !== 'missing'
        ).length
        const supportCount = adaptiveSupport + recallSupport + examSupport + practicalSupport

        assert(
          !(status === 'covered' && supportCount === 0),
          `Covered topic "${topicId}" for board ${boardId} ${course} has no adaptive, recall, exam, or practical support evidence`
        )
      }

      const timedPaper = getTimedPaperQuestions(course, boardId)
      assert(
        timedPaper.every((question) => isQuestionAvailableForSelection(question, boardId, course)),
        `Timed paper leaks off-spec content for board ${boardId} ${course}`
      )

      const grade9 = getGrade9Questions(course, boardId)
      assert(
        grade9.every((question) => isQuestionAvailableForSelection(question, boardId, course)),
        `Grade 9 challenge leaks off-spec content for board ${boardId} ${course}`
      )

      const eligibleMcqs = ALL_QUESTIONS.filter(
        (question) =>
          question.type === 'mcq' &&
          question.options?.length >= 2 &&
          question.correctIndex != null &&
          isQuestionAvailableForSelection(question, boardId, course)
      )
      assert(eligibleMcqs.length > 0, `No eligible ${course} MCQs for board ${boardId}`)

      const sampleTopicId = visibleTopics.find((topicId) =>
        ALL_QUESTIONS.some((question) => question.topicId === topicId && isQuestionAvailableForSelection(question, boardId, course))
      )
      if (sampleTopicId) {
        const nextQuestion = getNextQuestion(sampleTopicId, 1, [], course, boardId)
        assert(
          !nextQuestion || isQuestionAvailableForSelection(nextQuestion, boardId, course),
          `Adaptive practice leaked off-spec question for board ${boardId} ${course}`
        )
      }
    }
  }
} finally {
  await server.close()
}

if (failures.length > 0) {
  console.error('Curriculum validation failed:')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log('Curriculum validation passed.')
