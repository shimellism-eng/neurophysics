const BASE_PATH = '/data/questions'
const SRS_STORAGE_KEY = 'np_srs'

import { filterQuestionsForSelection } from '../utils/curriculumFilters'

const manifestPromise = { current: null }
const fileCache = new Map()


function normalizeTopicKey(topic = null) {
  return topic
    ? String(topic).trim().toLowerCase().replace(/&/g, 'and').replace(/'/g, '').replace(/\s+/g, '_').replace(/\//g, '_')
    : null
}

function normalizeSkillLabel(skill = null) {
  const value = String(skill || '').trim().toLowerCase()
  if (!value) return null
  if (/\b(recall|define|identify|state|name|label|list)\b/.test(value)) return 'recall'
  if (/\b(concept|describe|recognise|recognize|classify|compare)\b/.test(value)) return 'concept'
  if (/\b(apply|calculate|use|work out|determine|find|solve|substitute)\b/.test(value)) return 'apply'
  if (/\b(analyse|analyze|explain|justify|interpret|evaluate|deduce|reason|misconception)\b/.test(value)) return 'analyse'
  return value
}

function filterQuestions(source, { examBoard = null, course = 'all', topicId = null, subtopic = null, difficulty = null, skill = null } = {}) {
  const normalizedSkill = normalizeSkillLabel(skill)
  return source.filter((question) => {
    if (topicId && question.topicId !== topicId) return false
    if (subtopic && question.subtopic !== subtopic) return false
    if (difficulty && question.difficulty !== difficulty) return false
    if (normalizedSkill && normalizeSkillLabel(question.skill) !== normalizedSkill) return false
    if (!filterQuestionsForSelection([question], examBoard, course).length) return false
    return true
  })
}

async function loadAllQuestionsForBoard(boardId) {
  return loadBoardFile(boardId, null)
}


function inferRecallCommandWord(question) {
  const value = String(question.skill || question.question || '').toLowerCase()
  if (/\bdefine\b/.test(value)) return 'Define'
  if (/\bdescribe\b/.test(value)) return 'Describe'
  if (/\bexplain\b|\bwhy\b/.test(value)) return 'Explain'
  if (/\bidentify\b|\bname\b|\bstate\b|\blabel\b|\blist\b/.test(value)) return 'State'
  return 'State'
}

function toRecallQuestion(question) {
  return {
    id: question.id,
    type: 'recall',
    topicId: question.topicId,
    question: question.question,
    modelAnswer: question.correctAnswer,
    senNote: question.explanation || question.senNote || null,
    commandWord: inferRecallCommandWord(question),
    marks: 1,
    sourceQuestion: question,
  }
}

function toGrade9ChallengeQuestion(question) {
  return {
    id: question.id,
    type: 'mcq-challenge',
    topicId: question.topicId,
    topic: question.topic,
    subtopic: question.subtopic,
    question: question.question,
    questionSubtitle: [question.topic, question.subtopic].filter(Boolean).join(' · ') || null,
    options: Array.isArray(question.options) ? [...question.options] : [],
    correctIndex: question.correctIndex,
    correctAnswer: question.correctAnswer,
    explanation: question.explanation || null,
    senNote: question.senNote || question.explanation || null,
    marks: 1,
    difficulty: question.difficulty,
    skill: question.skill || null,
    sourceQuestion: question,
  }
}

function normalizeBoardId(board = 'aqa') {
  const value = String(board || 'aqa').trim().toLowerCase()
  if (value === 'aqa') return 'aqa'
  if (value === 'edexcel') return 'edexcel'
  if (import.meta.env.DEV && value) {
    console.warn(`[questionRepository] Unsupported board requested: ${value}`)
  }
  return null
}

function shuffle(items) {
  const copy = [...items]
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

function readSrsStore() {
  if (typeof window === 'undefined') return {}
  try {
    return JSON.parse(window.localStorage.getItem(SRS_STORAGE_KEY) || '{}')
  } catch {
    return {}
  }
}

async function fetchJson(path) {
  if (!fileCache.has(path)) {
    fileCache.set(path, fetch(path).then(async (response) => {
      if (!response.ok) throw new Error(`Failed to load ${path}: ${response.status}`)
      return response.json()
    }))
  }
  return fileCache.get(path)
}

export async function loadQuestionManifest() {
  if (!manifestPromise.current) {
    manifestPromise.current = fetchJson(`${BASE_PATH}/manifest.json`)
  }
  return manifestPromise.current
}

async function loadBoardFile(boardId, topic = null) {
  const manifest = await loadQuestionManifest()
  const board = normalizeBoardId(boardId)
  if (!board) return []
  const boardEntry = manifest.boards?.[board]
  if (!boardEntry) return []
  const path = topic ? boardEntry.topics?.[topic] : boardEntry.all
  if (!path) return []
  const payload = await fetchJson(path)
  return payload.questions || []
}

export async function getQuestions({ examBoard = 'aqa', course = 'all', topic = null, subtopic = null, difficulty = null } = {}) {
  const source = await loadBoardFile(examBoard, normalizeTopicKey(topic))
  return filterQuestions(source, { examBoard, course, subtopic, difficulty })
}

export async function getQuestionsByTopicId({ examBoard = 'aqa', course = 'all', topicId, subtopic = null, difficulty = null, skill = null } = {}) {
  const source = await loadAllQuestionsForBoard(examBoard)
  return filterQuestions(source, { examBoard, course, topicId, subtopic, difficulty, skill })
}

export async function getRecallQuestions({ examBoard = 'aqa', topicId, shuffle: shouldShuffle = false } = {}) {
  const questions = await getQuestionsByTopicId({ examBoard, topicId })
  const recallQuestions = questions
    .filter((question) => {
      const normalizedSkill = normalizeSkillLabel(question.skill)
      return normalizedSkill === 'recall' || normalizedSkill === 'concept'
    })
    .map(toRecallQuestion)
  return shouldShuffle ? shuffle(recallQuestions) : recallQuestions
}

export async function getGrade9Questions({ examBoard = 'aqa', course = 'combined' } = {}) {
  const source = await loadAllQuestionsForBoard(examBoard)
  const hardQuestions = filterQuestions(source, { difficulty: 'hard' })
  const visibleQuestions = filterQuestionsForSelection(hardQuestions, examBoard, course)
  return shuffle(visibleQuestions.map(toGrade9ChallengeQuestion))
}

export async function getExamQuestions({ examBoard = 'aqa', topicId, course = 'combined', difficulty = null, skill = null } = {}) {
  return getQuestionsByTopicId({ examBoard, course, topicId, difficulty, skill })
}

export async function getTimedPaperQuestions({ examBoard = 'aqa', course = 'combined', difficulty = null } = {}) {
  const source = await loadAllQuestionsForBoard(examBoard)
  return filterQuestions(source, { examBoard, course, difficulty })
}

export async function getQuestionMap({ examBoard = 'aqa' } = {}) {
  const questions = await loadAllQuestionsForBoard(examBoard)
  return new Map(questions.map((question) => [question.id, question]))
}

export async function getRandomQuiz({
  examBoard = 'aqa',
  topic = null,
  subtopic = null,
  difficulty = null,
  count = 10,
  excludeIds = [],
  maxPerTopic = null,
  course = 'all',
} = {}) {
  const questions = await getQuestions({ examBoard, course, topic, subtopic, difficulty })
  const exclude = new Set(excludeIds)
  const filtered = questions.filter((question) => !exclude.has(question.id))
  const srsStore = readSrsStore()
  const now = Date.now()

  const due = filtered
    .filter((question) => srsStore[question.id]?.next_due && srsStore[question.id].next_due <= now)
    .sort((a, b) => srsStore[a.id].next_due - srsStore[b.id].next_due)
  const dueIds = new Set(due.map((question) => question.id))
  const rest = shuffle(filtered.filter((question) => !dueIds.has(question.id)))
  const ordered = [...due, ...rest]

  const picked = []
  const perTopic = {}
  for (const question of ordered) {
    if (picked.length >= count) break
    if (maxPerTopic != null) {
      perTopic[question.topic] = (perTopic[question.topic] || 0) + 1
      if (perTopic[question.topic] > maxPerTopic) continue
    }
    picked.push(question)
  }

  if (picked.length < count) {
    const pickedIds = new Set(picked.map((question) => question.id))
    for (const question of ordered) {
      if (picked.length >= count) break
      if (!pickedIds.has(question.id)) picked.push(question)
    }
  }

  return picked.slice(0, count)
}

export function checkAnswer(question, selectedIndex) {
  const correctIndex = question.correctIndex
  const selectedOption = selectedIndex != null ? question.options[selectedIndex] ?? null : null
  return {
    isCorrect: selectedIndex === correctIndex,
    selectedOption,
    correctIndex,
    correctAnswer: question.correctAnswer,
    explanation: question.explanation,
  }
}

export function getAnswerReview(question) {
  return {
    correctAnswer: question.correctAnswer,
    explanation: question.explanation,
    correctIndex: question.correctIndex,
  }
}
