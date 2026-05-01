export function getAnswerMarksTotal(answerMap = {}) {
  return Object.values(answerMap).reduce((sum, answer) => (
    sum + (answer?.marksAwarded ?? answer?.selfScore ?? answer?.score ?? 0)
  ), 0)
}
