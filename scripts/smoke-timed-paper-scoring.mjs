import { getAnswerMarksTotal } from '../src/features/timed-paper/scoring.js'

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

console.log('timed-paper scoring smoke: pass')
