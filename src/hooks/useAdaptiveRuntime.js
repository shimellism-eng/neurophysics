import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  createDefaultLearnerState,
  hydrateLearnerState,
  selectAdaptiveQuestion,
  updateLearnerState,
} from '../lib/adaptiveEngine'

export const ADAPTIVE_RUNTIME_STORAGE_KEY = 'np_adaptive_v2'
export const ADAPTIVE_DEBUG_FLAG_KEY = 'np_adaptive_debug'

function loadStore() {
  if (typeof window === 'undefined') return {}
  try {
    return JSON.parse(window.localStorage.getItem(ADAPTIVE_RUNTIME_STORAGE_KEY) || '{}')
  } catch {
    return {}
  }
}

function saveStore(store) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(ADAPTIVE_RUNTIME_STORAGE_KEY, JSON.stringify(store))
  } catch {}
}

function readTopicState(topicId) {
  const store = loadStore()
  return hydrateLearnerState(store[topicId] || createDefaultLearnerState())
}

function isAdaptiveDebugEnabled() {
  if (!import.meta.env.DEV || typeof window === 'undefined') return false
  try {
    return window.localStorage.getItem(ADAPTIVE_DEBUG_FLAG_KEY) === '1'
  } catch {
    return false
  }
}

export function useAdaptiveRuntime(topicId) {
  const [state, setState] = useState(() => readTopicState(topicId))

  useEffect(() => {
    setState(readTopicState(topicId))
  }, [topicId])

  const persist = useCallback((nextState) => {
    const store = loadStore()
    store[topicId] = nextState
    saveStore(store)
    setState(nextState)
    return nextState
  }, [topicId])

  const recordAnswer = useCallback((question, isCorrect) => {
    const raw = updateLearnerState(state, question, isCorrect)
    const { difficultyChanged, ...nextState } = raw
    if (isAdaptiveDebugEnabled()) {
      console.debug('[AdaptiveRuntime:answer]', {
        question_id: question.id,
        topic: question.topicId,
        subtopic: question.subtopic,
        difficulty: question.difficulty,
        skill: question.skill,
        correctStreak: nextState.correctStreak,
        wrongStreak: nextState.wrongStreak,
        supportMode: nextState.supportMode,
        difficultyChanged,
        result: isCorrect ? 'correct' : 'wrong',
      })
    }
    const persisted = persist(nextState)
    return { ...persisted, difficultyChanged }
  }, [persist, state])

  const selectQuestion = useCallback((questions, options = {}) => {
    const selected = selectAdaptiveQuestion(questions, options.learnerState || state, {
      excludeIds: options.excludeIds || [],
      sessionSeenIds: options.sessionSeenIds || [],
      topicId: options.topicId || topicId,
      lastQuestion: options.lastQuestion || null,
    })

    if (selected && isAdaptiveDebugEnabled()) {
      const currentState = options.learnerState || state
      console.debug('[AdaptiveRuntime]', {
        question_id: selected.id,
        topic: selected.topicId,
        subtopic: selected.subtopic,
        difficulty: selected.difficulty,
        skill: selected.skill,
        correctStreak: currentState.correctStreak,
        wrongStreak: currentState.wrongStreak,
        supportMode: currentState.supportMode,
        recentQuestionIds: currentState.recentQuestionIds?.slice(-5) || [],
      })
    }

    return selected
  }, [state, topicId])

  const resetTopicState = useCallback(() => {
    const nextState = createDefaultLearnerState()
    return persist(nextState)
  }, [persist])

  const reloadTopicState = useCallback(() => {
    const nextState = readTopicState(topicId)
    setState(nextState)
    return nextState
  }, [topicId])

  return useMemo(() => ({
    learnerState: state,
    recordAnswer,
    reloadTopicState,
    resetTopicState,
    selectQuestion,
  }), [state, recordAnswer, reloadTopicState, resetTopicState, selectQuestion])
}
