import { getAnswerMarksTotal } from './scoring.js'

export function getPaperTotalMarks(questions = []) {
  return questions.reduce((sum, question) => sum + (question?.marks || 1), 0)
}

export function normaliseTimedPaperOutcome(outcome, marksAvailable = 1) {
  if (typeof outcome === 'object' && outcome !== null) {
    const marksAwarded = Math.max(
      0,
      Math.min(
        outcome.marksAwarded ?? outcome.selfScore ?? outcome.score ?? (outcome.correct ? marksAvailable : 0),
        marksAvailable
      )
    )

    return {
      answered: outcome.answered ?? true,
      marksAwarded,
      marksAvailable: outcome.marksAvailable ?? marksAvailable,
      correct: typeof outcome.correct === 'boolean'
        ? outcome.correct
        : marksAwarded >= marksAvailable,
      source: outcome.source,
    }
  }

  return {
    answered: true,
    marksAwarded: outcome ? marksAvailable : 0,
    marksAvailable,
    correct: !!outcome,
  }
}

export function normaliseTimedPaperAnswers(questions = [], answers = {}) {
  return questions.map((question, i) => (
    answers[i] ?? {
      answered: false,
      correct: false,
      marksAwarded: 0,
      marksAvailable: question?.marks || 1,
      score: 0,
    }
  ))
}

export function parseSavedTimedPaperState(rawValue, fallbackRemaining) {
  try {
    const saved = typeof rawValue === 'string' ? JSON.parse(rawValue || 'null') : rawValue
    if (saved?.questions) {
      const answers = saved.answers || {}
      return {
        qIndex: saved.qIndex || 0,
        answers,
        flags: saved.flags || {},
        remaining: saved.timeRemaining || fallbackRemaining,
        score: getAnswerMarksTotal(answers),
      }
    }
  } catch {}

  return {
    qIndex: 0,
    answers: {},
    flags: {},
    remaining: fallbackRemaining,
    score: 0,
  }
}

export function getTimedPaperTimeUsed(duration, remaining) {
  return Math.max(0, duration - remaining)
}
