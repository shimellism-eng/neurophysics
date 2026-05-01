import { getAnswerMarksTotal } from '../src/features/timed-paper/scoring.js'
import {
  getPaperTotalMarks,
  getTimedPaperTimeUsed,
  normaliseTimedPaperAnswers,
  normaliseTimedPaperOutcome,
  parseSavedTimedPaperState,
} from '../src/features/timed-paper/session.js'

const original = {
  0: { marksAwarded: 2 },
  1: { marksAwarded: 1 },
}

const replaced = {
  ...original,
  0: { marksAwarded: 1 },
}

const total = getAnswerMarksTotal(replaced)

if (total !== 2) {
  throw new Error(`Expected replacement score 2, got ${total}`)
}

const paperMarks = getPaperTotalMarks([{ marks: 2 }, {}, { marks: 6 }])
if (paperMarks !== 9) {
  throw new Error(`Expected computed paper marks 9, got ${paperMarks}`)
}

const clamped = normaliseTimedPaperOutcome({ marksAwarded: 8 }, 6)
if (clamped.marksAwarded !== 6) {
  throw new Error(`Expected clamped mark 6, got ${clamped.marksAwarded}`)
}

const normalisedAnswers = normaliseTimedPaperAnswers([{ marks: 2 }, {}], { 0: { marksAwarded: 1 } })
if (normalisedAnswers[1]?.answered !== false || normalisedAnswers[1]?.marksAvailable !== 1) {
  throw new Error('Expected unanswered question to stay separate from incorrect answers')
}

const restored = parseSavedTimedPaperState(
  JSON.stringify({
    questions: [{}],
    answers: { 0: { marksAwarded: 1 } },
    flags: { 0: true },
    qIndex: 0,
    timeRemaining: 100,
  }),
  3300
)
if (restored.score !== 1 || restored.remaining !== 100 || restored.flags[0] !== true) {
  throw new Error('Expected restored paper state to recompute score and preserve flags/time')
}

const timeUsed = getTimedPaperTimeUsed(3300, 3200)
if (timeUsed !== 100) {
  throw new Error(`Expected time used 100, got ${timeUsed}`)
}

console.log('timed-paper scoring smoke: pass')
