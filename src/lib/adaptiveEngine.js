const DIFFICULTY_ORDER = ['easy', 'medium', 'hard']
const SKILL_RANKS = {
  recall: 1,
  concept: 2,
  apply: 3,
  analyse: 4,
}
const SKILL_BY_RANK = Object.fromEntries(Object.entries(SKILL_RANKS).map(([label, rank]) => [rank, label]))
const RECENT_QUESTION_MEMORY = 12
const RECENT_REPEAT_GUARD = 5
const MISTAKE_MEMORY = 4
const PATTERN_WINDOW = 3
const DIVERSITY_WINDOW = 6
const MAX_CONSECUTIVE_DIVERSITY_MATCHES = 2
const TOP_CANDIDATE_WINDOW = 20
const EFFECTIVE_DIFFICULTY_LABELS = ['easy', 'medium', 'hard']

function clampList(items, maxSize) {
  return items.slice(-maxSize)
}

function uniqueTail(items, maxSize) {
  const seen = new Set()
  const ordered = []
  for (let index = items.length - 1; index >= 0; index -= 1) {
    const value = items[index]
    if (!value || seen.has(value)) continue
    seen.add(value)
    ordered.unshift(value)
    if (ordered.length >= maxSize) break
  }
  return ordered
}

function getLastSeenDistance(recentQuestionIds, questionId) {
  const index = recentQuestionIds.lastIndexOf(questionId)
  if (index === -1) return Number.POSITIVE_INFINITY
  return recentQuestionIds.length - index
}

function getQuestionSubtopic(question) {
  return question.subtopicSlug || question.subtopic || question.topicId || null
}

function getQuestionConceptFamily(question) {
  return question.conceptFamily || null
}

function getQuestionPatternId(question) {
  return question.patternId || null
}

function getQuestionPattern(question) {
  return getQuestionPatternId(question) || inferQuestionPattern(question)
}

function getQuestionDiversityKeys(question) {
  const pattern = getQuestionPattern(question)
  const conceptFamily = getQuestionConceptFamily(question)
  const subtopic = getQuestionSubtopic(question)
  return {
    conceptFamily,
    pattern,
    subtopic,
  }
}

function inferSkillFromText(value) {
  const text = String(value || '').trim().toLowerCase()
  if (!text) return null

  if (/\b(recall|define|identify|state|name|label|list)\b/.test(text)) return 'recall'
  if (/\b(concept|describe|recognise|recognize|classify|compare)\b/.test(text)) return 'concept'
  if (/\b(apply|calculate|use|work out|determine|find|solve|substitute)\b/.test(text)) return 'apply'
  if (/\b(analyse|analyze|explain|justify|interpret|evaluate|deduce|reason|misconception)\b/.test(text)) return 'analyse'

  return null
}

function getQuestionSkillLabel(question) {
  return normalizeSkill(question.skill) || inferSkillFromText(question.skill) || question.skill || null
}

function getQuestionStem(question) {
  return String(question.question || question.stem || '').trim()
}

function normalizeStemForHeuristics(question) {
  return getQuestionStem(question)
    .toLowerCase()
    .replace(/\b\d+(\.\d+)?\b/g, ' ')
    .replace(/m\/s\^?2|m\/s|cm|mm|km|kg|g|nm|j|n|w|pa|v|a|hz|kwh/g, ' ')
    .replace(/[^a-z\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function inferQuestionPattern(question) {
  const subtopic = String(getQuestionSubtopic(question) || '').toLowerCase()
  const skill = String(getQuestionSkillLabel(question) || '').toLowerCase()
  const stem = normalizeStemForHeuristics(question)

  const stopWords = new Set([
    'a', 'an', 'and', 'the', 'is', 'are', 'what', 'which', 'how', 'much', 'does', 'do',
    'with', 'through', 'from', 'into', 'of', 'to', 'by', 'then', 'this', 'that', 'best',
    'answer', 'choose', 'correct', 'shows', 'show', 'statement', 'student',
  ])

  const tokens = stem
    .split(' ')
    .filter((token) => token && !stopWords.has(token))
    .slice(0, 4)

  return [subtopic, skill, tokens.join('_')].filter(Boolean).join('|')
}

export function normalizeSkill(skill) {
  const value = String(skill || '').trim().toLowerCase()
  if (!value) return null
  if (value === 'analyze') return 'analyse'
  if (SKILL_RANKS[value]) return value
  return inferSkillFromText(value) || value
}

export function getSkillRank(skill) {
  const normalized = normalizeSkill(skill)
  return normalized ? SKILL_RANKS[normalized] || null : null
}

function getDifficultyIndex(difficulty = 'easy') {
  const index = DIFFICULTY_ORDER.indexOf(String(difficulty || 'easy').toLowerCase())
  return index >= 0 ? index : 0
}

function clampDifficultyScore(score) {
  return Math.max(0, Math.min(DIFFICULTY_ORDER.length - 1, score))
}

function inferResponseMode(question) {
  const stem = normalizeStemForHeuristics(question)
  const skill = getQuestionSkillLabel(question)
  const hasNumbers = /\d/.test(getQuestionStem(question))

  if (
    /\bwhy\b|\bexplain\b|\bbest answer\b|\bwhich answer shows\b|\bwhich statement is correct\b|\bbecause\b|\bshows\b/.test(stem) ||
    skill === 'analyse'
  ) {
    return 'reasoning_check'
  }

  if (/\brearrange\b|\brearranged\b|\brearrangement\b/.test(stem)) {
    return 'equation_rearrangement'
  }

  if (hasNumbers && /\bwhat\b|\bcalculate\b|\bhow much\b|\bfind\b/.test(stem)) {
    return 'direct_substitution'
  }

  if (skill === 'recall' || skill === 'concept') {
    return 'direct_recall'
  }

  return 'standard_apply'
}

function inferWordingComplexity(question) {
  const words = getQuestionStem(question).split(/\s+/).filter(Boolean)
  let score = 0

  if (words.length >= 18) score += 0.12
  if (words.length >= 24) score += 0.12
  if (words.length >= 32) score += 0.18

  const stem = normalizeStemForHeuristics(question)
  if (/\bwhich\b.*\bwhy\b|\bbest answer\b|\bwhich statement is correct\b/.test(stem)) score += 0.12
  if (/\band\b.*\band\b|\bthen\b|\bafter\b|\bbefore\b/.test(stem)) score += 0.08

  return score
}

function inferStepComplexity(question, responseMode) {
  const stem = normalizeStemForHeuristics(question)
  let score = 0

  if (responseMode === 'equation_rearrangement') score += 0.35
  if (/\bconvert\b|\bchange\b.*\bto metres\b|\bto meters\b/.test(stem)) score += 0.18
  if (/\bperpendicular\b|\bresultant\b|\bopposite directions\b/.test(stem)) score += 0.1
  if (/\band\b.*\bthen\b|\bfirst\b.*\bthen\b/.test(stem)) score += 0.12

  return score
}

export function getEffectiveDifficultyDetails(question) {
  const rawDifficulty = String(question.difficulty || 'easy').toLowerCase()
  const rawDifficultyIndex = getDifficultyIndex(rawDifficulty)
  const skill = getQuestionSkillLabel(question)
  const skillRank = getSkillRank(skill)
  const responseMode = inferResponseMode(question)
  const wordingComplexity = inferWordingComplexity(question)
  const stepComplexity = inferStepComplexity(question, responseMode)

  let score = rawDifficultyIndex

  if (skillRank === 1) score -= 0.3
  if (skillRank === 2) score -= 0.1
  if (skillRank === 3) score += 0.15
  if (skillRank === 4) score += 0.35

  if (responseMode === 'direct_recall') score -= 0.35
  if (responseMode === 'direct_substitution') score -= 0.1
  if (responseMode === 'equation_rearrangement') score += 0.3
  if (responseMode === 'reasoning_check') score += 0.4

  score += wordingComplexity
  score += stepComplexity
  score = clampDifficultyScore(score)

  let effectiveDifficultyIndex = 0
  if (score >= 1.45) effectiveDifficultyIndex = 2
  else if (score >= 0.7) effectiveDifficultyIndex = 1

  return {
    rawDifficulty,
    rawDifficultyIndex,
    skill,
    skillRank,
    responseMode,
    wordingComplexity,
    stepComplexity,
    score,
    effectiveDifficultyIndex,
    effectiveDifficulty: EFFECTIVE_DIFFICULTY_LABELS[effectiveDifficultyIndex],
  }
}

function getDifficultyLabel(index) {
  return DIFFICULTY_ORDER[Math.max(0, Math.min(index, DIFFICULTY_ORDER.length - 1))]
}

export function createDefaultLearnerState() {
  return {
    currentDifficulty: 'easy',
    currentSkill: null,
    correctStreak: 0,
    wrongStreak: 0,
    supportMode: false,
    recentQuestionIds: [],
    recentMistakeSubtopics: [],
    recentMistakeSkills: [],
    totalAnswered: 0,
    totalCorrect: 0,
    updatedAt: Date.now(),
  }
}

export function hydrateLearnerState(value = {}) {
  const base = createDefaultLearnerState()
  return {
    ...base,
    ...value,
    currentDifficulty: DIFFICULTY_ORDER.includes(value.currentDifficulty) ? value.currentDifficulty : base.currentDifficulty,
    currentSkill: value.currentSkill ? normalizeSkill(value.currentSkill) || value.currentSkill : null,
    recentQuestionIds: Array.isArray(value.recentQuestionIds) ? value.recentQuestionIds.slice(-RECENT_QUESTION_MEMORY) : [],
    recentMistakeSubtopics: Array.isArray(value.recentMistakeSubtopics) ? value.recentMistakeSubtopics.slice(-MISTAKE_MEMORY) : [],
    recentMistakeSkills: Array.isArray(value.recentMistakeSkills) ? value.recentMistakeSkills.slice(-MISTAKE_MEMORY) : [],
  }
}

export function updateLearnerState(previousState, question, isCorrect) {
  const prev = hydrateLearnerState(previousState)
  const prevDifficulty = prev.currentDifficulty
  const next = {
    ...prev,
    totalAnswered: prev.totalAnswered + 1,
    totalCorrect: prev.totalCorrect + (isCorrect ? 1 : 0),
    recentQuestionIds: clampList([...prev.recentQuestionIds, question.id], RECENT_QUESTION_MEMORY),
    updatedAt: Date.now(),
  }

  if (isCorrect) {
    next.correctStreak = prev.correctStreak + 1
    next.wrongStreak = 0

    if (next.supportMode && next.correctStreak >= 2) {
      next.supportMode = false
    }

    if (next.correctStreak >= 3) {
      const nextSkill = getNextSkillLabel(prev.currentSkill || question.skill)
      if (nextSkill) {
        next.currentSkill = nextSkill
      } else {
        next.currentDifficulty = getDifficultyLabel(getDifficultyIndex(prev.currentDifficulty) + 1)
      }
      next.correctStreak = 0
    }
  } else {
    next.correctStreak = 0
    next.wrongStreak = prev.wrongStreak + 1
    next.currentSkill = normalizeSkill(question.skill) || prev.currentSkill || null
    next.recentMistakeSubtopics = clampList(
      [...prev.recentMistakeSubtopics, question.subtopicSlug || question.subtopic || question.topicId || ''],
      MISTAKE_MEMORY,
    ).filter(Boolean)
    next.recentMistakeSkills = clampList(
      [...prev.recentMistakeSkills, normalizeSkill(question.skill) || question.skill || ''],
      MISTAKE_MEMORY,
    ).filter(Boolean)
    if (next.wrongStreak >= 2) {
      next.currentDifficulty = getDifficultyLabel(getDifficultyIndex(prev.currentDifficulty) - 1)
      next.supportMode = true
    }
  }

  if (!next.currentSkill) {
    next.currentSkill = normalizeSkill(question.skill) || prev.currentSkill || null
  }

  const difficultyChanged = next.currentDifficulty !== prevDifficulty
    ? (getDifficultyIndex(next.currentDifficulty) > getDifficultyIndex(prevDifficulty) ? 'up' : 'down')
    : null

  return { ...next, difficultyChanged }
}

function getNextSkillLabel(skill) {
  const rank = getSkillRank(skill)
  if (!rank) return null
  return SKILL_BY_RANK[rank + 1] || null
}

function narrowByDifficulty(candidates, targetDifficultyIndex, supportMode) {
  if (!candidates.length) return candidates

  const difficultyMatches = (index) => candidates.filter((question) => getEffectiveDifficultyDetails(question).effectiveDifficultyIndex === index)

  if (supportMode) {
    for (let index = targetDifficultyIndex; index >= 0; index -= 1) {
      const bucket = difficultyMatches(index)
      if (bucket.length) return bucket
    }
    for (let index = targetDifficultyIndex + 1; index < DIFFICULTY_ORDER.length; index += 1) {
      const bucket = difficultyMatches(index)
      if (bucket.length) return bucket
    }
    return candidates
  }

  const exact = difficultyMatches(targetDifficultyIndex)
  if (exact.length) return exact

  const harder = difficultyMatches(Math.min(targetDifficultyIndex + 1, DIFFICULTY_ORDER.length - 1))
  if (harder.length) return harder

  const easier = difficultyMatches(Math.max(targetDifficultyIndex - 1, 0))
  if (easier.length) return easier

  return candidates
}

function narrowBySkill(candidates, state) {
  if (!candidates.length) return candidates

  const targetSkillRank = getSkillRank(state.currentSkill)
  if (targetSkillRank) {
    const exact = candidates.filter((question) => getSkillRank(question.skill) === targetSkillRank)
    if (exact.length) return exact
  }

  if (!state.currentSkill) return candidates

  const exactLabel = candidates.filter((question) => getQuestionSkillLabel(question) === state.currentSkill)
  return exactLabel.length ? exactLabel : candidates
}

function narrowByPattern(candidates, recentPatterns) {
  if (!candidates.length) return candidates
  const lastPattern = recentPatterns.at(-1) || null
  const recentPatternSet = new Set(recentPatterns)

  const differentFromLast = lastPattern
    ? candidates.filter((question) => getQuestionPattern(question) !== lastPattern)
    : candidates
  if (differentFromLast.length) return differentFromLast

  const differentFromRecent = candidates.filter((question) => !recentPatternSet.has(getQuestionPattern(question)))
  if (differentFromRecent.length) return differentFromRecent

  return candidates
}

function getTrailingMatchCount(history, key, value) {
  if (!value) return 0
  let count = 0
  for (let index = history.length - 1; index >= 0; index -= 1) {
    if (history[index]?.[key] !== value) break
    count += 1
  }
  return count
}

function hasAlternativeForKey(candidates, key, value) {
  if (!value || !Array.isArray(candidates)) return true
  return candidates.some((candidate) => {
    const candidateValue = getQuestionDiversityKeys(candidate)[key]
    return candidateValue && candidateValue !== value
  })
}

function wouldOverCluster(question, recentDiversity, candidates = null) {
  const keys = getQuestionDiversityKeys(question)
  return Object.entries(keys).some(([key, value]) => (
    value &&
    getTrailingMatchCount(recentDiversity, key, value) >= MAX_CONSECUTIVE_DIVERSITY_MATCHES &&
    hasAlternativeForKey(candidates, key, value)
  ))
}

function chooseDiverseCandidates(candidateSets, recentDiversity) {
  for (const candidates of candidateSets) {
    if (!candidates.length) continue
    const diverse = candidates.filter((question) => !wouldOverCluster(question, recentDiversity, candidates))
    if (diverse.length) return diverse
  }
  return candidateSets.find((candidates) => candidates.length) || []
}

function pickFromTopCandidates(candidates) {
  if (!candidates.length) return null
  const sorted = [...candidates].sort((a, b) => b.score - a.score)
  const slice = sorted.slice(0, Math.min(TOP_CANDIDATE_WINDOW, sorted.length))
  return slice[Math.floor(Math.random() * slice.length)].question
}

export function selectAdaptiveQuestion(questions, learnerState, options = {}) {
  const state = hydrateLearnerState(learnerState)
  const {
    excludeIds = [],
    sessionSeenIds = [],
    topicId = null,
    lastQuestion = null,
  } = options

  const explicitExclude = Array.isArray(excludeIds) ? excludeIds.filter(Boolean) : []
  const sessionSeenHistory = Array.isArray(sessionSeenIds) ? sessionSeenIds.filter(Boolean) : []
  const sessionSeenSet = new Set(sessionSeenHistory)
  const recentGuard = uniqueTail([
    ...state.recentQuestionIds,
    ...sessionSeenHistory,
    ...explicitExclude,
  ], RECENT_QUESTION_MEMORY)
  const strictRepeatGuard = recentGuard.slice(-RECENT_REPEAT_GUARD)
  const recentSet = new Set(strictRepeatGuard)
  const lastQuestionId = lastQuestion?.id || state.recentQuestionIds.at(-1) || null
  const noImmediateRepeatIds = new Set([lastQuestionId].filter(Boolean))

  const topicMatches = topicId
    ? questions.filter((question) => question.topicId === topicId)
    : questions
  let pool = topicMatches.length ? topicMatches : questions
  pool = pool.filter((question) => !noImmediateRepeatIds.has(question.id))
  if (sessionSeenSet.size) {
    pool = pool.filter((question) => !sessionSeenSet.has(question.id))
  }

  if (!pool.length) return null

  const isFreshTopic = state.totalAnswered === 0 && state.totalCorrect === 0 && state.recentQuestionIds.length === 0
  if (isFreshTopic) {
    const calmResponseModes = ['direct_recall', 'direct_substitution', 'standard_apply']
    const easyLabelStarters = pool.filter((question) => String(question.difficulty || '').toLowerCase() === 'easy')
    const easyCalmStarters = easyLabelStarters.filter((question) => {
      const details = getEffectiveDifficultyDetails(question)
      return details.effectiveDifficultyIndex === 0 && calmResponseModes.includes(details.responseMode)
    })
    const easyEffectiveStarters = easyLabelStarters.filter(
      (question) => getEffectiveDifficultyDetails(question).effectiveDifficultyIndex === 0,
    )
    const easyLowLoadStarters = easyLabelStarters.filter(
      (question) => calmResponseModes.includes(getEffectiveDifficultyDetails(question).responseMode),
    )
    const calmEffectiveStarters = pool.filter((question) => {
      const details = getEffectiveDifficultyDetails(question)
      return details.effectiveDifficultyIndex === 0 && calmResponseModes.includes(details.responseMode)
    })

    if (easyCalmStarters.length) pool = easyCalmStarters
    else if (easyEffectiveStarters.length) pool = easyEffectiveStarters
    else if (easyLowLoadStarters.length) pool = easyLowLoadStarters
    else if (easyLabelStarters.length) pool = easyLabelStarters
    else if (calmEffectiveStarters.length) pool = calmEffectiveStarters
  }

  const relaxedSet = new Set(strictRepeatGuard.slice(-3))
  const recentCandidates = [
    pool.filter((question) => !recentSet.has(question.id)),
    pool.filter((question) => !relaxedSet.has(question.id)),
    pool,
  ]
  const recencyCandidates = recentCandidates.find((candidates) => candidates.length) || pool
  const seenInTopicPool = pool.filter((question) => state.recentQuestionIds.includes(question.id)).length
  const topicCoverageRatio = pool.length ? seenInTopicPool / pool.length : 0

  const targetDifficultyIndex = isFreshTopic ? 0 : getDifficultyIndex(state.currentDifficulty)
  const targetSkillRank = getSkillRank(state.currentSkill)
  const lastMistakeSubtopic = state.recentMistakeSubtopics.at(-1) || null
  const lastMistakeSkill = state.recentMistakeSkills.at(-1) || null
  const questionById = new Map(questions.map((question) => [question.id, question]))
  const recentPatterns = uniqueTail(
    recentGuard
      .map((id) => questionById.get(id))
      .filter(Boolean)
      .map((question) => getQuestionPattern(question)),
    PATTERN_WINDOW,
  )
  const recentDiversity = uniqueTail(
    [
      ...state.recentQuestionIds,
      ...sessionSeenHistory,
      ...explicitExclude,
    ]
      .map((id) => questionById.get(id))
      .filter(Boolean)
      .map((question) => getQuestionDiversityKeys(question)),
    DIVERSITY_WINDOW,
  )
  const difficultyCandidates = narrowByDifficulty(recencyCandidates, targetDifficultyIndex, state.supportMode)
  const skillCandidates = narrowBySkill(difficultyCandidates, state)
  const patternCandidates = narrowByPattern(skillCandidates, recentPatterns)
  const candidates = chooseDiverseCandidates([
    patternCandidates,
    skillCandidates,
    difficultyCandidates,
    recencyCandidates,
    pool,
  ], recentDiversity)
  const narrowPool = candidates.length <= 6 || pool.length <= 8

  const scored = candidates.map((question) => {
    const effectiveDifficulty = getEffectiveDifficultyDetails(question)
    const difficultyIndex = effectiveDifficulty.effectiveDifficultyIndex
    const skillRank = getSkillRank(question.skill)
    const questionSubtopic = getQuestionSubtopic(question)
    const questionSkill = getQuestionSkillLabel(question)
    const questionPattern = getQuestionPattern(question)
    const questionConceptFamily = getQuestionConceptFamily(question)
    const lastPattern = recentPatterns.at(-1) || null
    const recentConceptFamilies = recentDiversity.map((item) => item.conceptFamily).filter(Boolean)
    const recentSubtopics = recentDiversity.map((item) => item.subtopic).filter(Boolean)
    const lastSeenDistance = getLastSeenDistance(state.recentQuestionIds, question.id)
    const seenRecently = Number.isFinite(lastSeenDistance)
    const leastRecentlySeenBonus = seenRecently
      ? Math.min(lastSeenDistance, RECENT_QUESTION_MEMORY) * (topicCoverageRatio >= 0.6 ? 4 : 2)
      : (topicCoverageRatio >= 0.6 ? 30 : 24)
    const scoreParts = {
      unseenBonus: seenRecently ? 0 : (topicCoverageRatio >= 0.6 ? 36 : 24),
      recencySpacingBonus: leastRecentlySeenBonus,
      sameTopicBonus: topicId && question.topicId === topicId ? 18 : 0,
      sameSubtopicBonus: lastQuestion && (questionSubtopic === getQuestionSubtopic(lastQuestion)) ? 2 : 0,
      supportSubtopicBonus: 0,
      supportSkillBonus: 0,
      patternBonus: 0,
      diversityBonus: 0,
      difficultyBonus: 0,
      skillBonus: 0,
      recentPenalty: recentSet.has(question.id) ? -40 : 0,
      randomness: Math.random() * 4,
    }

    if (state.supportMode) {
      if (lastMistakeSubtopic && questionSubtopic === lastMistakeSubtopic) scoreParts.supportSubtopicBonus += 28
      if (lastMistakeSkill && questionSkill === lastMistakeSkill) scoreParts.supportSkillBonus += 18
      if (difficultyIndex <= targetDifficultyIndex) {
        scoreParts.difficultyBonus += 32 - Math.abs(targetDifficultyIndex - difficultyIndex) * 4
      } else {
        scoreParts.difficultyBonus -= 10 + (difficultyIndex - targetDifficultyIndex) * 6
      }
    } else {
      scoreParts.difficultyBonus += 34 - Math.abs(targetDifficultyIndex - difficultyIndex) * 8
      if (targetSkillRank && skillRank) {
        scoreParts.skillBonus += 16 - Math.abs(targetSkillRank - skillRank) * 5
      }
      if (!targetSkillRank && state.currentSkill && questionSkill === state.currentSkill) {
        scoreParts.skillBonus += 8
      }
    }

    if (questionPattern && lastPattern) {
      if (questionPattern === lastPattern) {
        scoreParts.patternBonus -= narrowPool ? 56 : 36
      } else {
        scoreParts.patternBonus += narrowPool ? 20 : 14
      }
    }
    if (questionPattern && recentPatterns.includes(questionPattern)) {
      scoreParts.patternBonus -= narrowPool ? 34 : 22
    }
    if (questionConceptFamily && recentConceptFamilies.includes(questionConceptFamily)) {
      scoreParts.diversityBonus -= narrowPool ? 28 : 18
    } else if (questionConceptFamily) {
      scoreParts.diversityBonus += narrowPool ? 16 : 10
    }
    if (questionSubtopic && recentSubtopics.includes(questionSubtopic)) {
      scoreParts.diversityBonus -= narrowPool ? 22 : 12
    } else if (questionSubtopic) {
      scoreParts.diversityBonus += narrowPool ? 14 : 8
    }
    if (wouldOverCluster(question, recentDiversity, candidates)) {
      scoreParts.diversityBonus -= 80
    }

    if (topicCoverageRatio >= 0.75 && seenRecently) {
      scoreParts.recencySpacingBonus += Math.min(lastSeenDistance, RECENT_QUESTION_MEMORY) * 2
    }

    const score = Object.values(scoreParts).reduce((sum, value) => sum + value, 0)
    return { question, score }
  })

  const nonClusteredScored = scored.filter(({ question }) => !wouldOverCluster(question, recentDiversity, pool))
  return pickFromTopCandidates(nonClusteredScored.length ? nonClusteredScored : scored)
}
