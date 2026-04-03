import { useUser } from '../context/UserContext';

export function useProgress() {
  const { progress, markConceptComplete, logQuestion, logMisconception } = useUser();

  function isConceptComplete(conceptId: string) {
    return progress?.completedConcepts.includes(conceptId) ?? false;
  }

  function getQuestionAttempt(questionId: string) {
    return progress?.attemptedQuestions.find(q => q.questionId === questionId) ?? null;
  }

  function topicProgress(conceptIds: string[]): number {
    if (!progress || conceptIds.length === 0) return 0;
    const done = conceptIds.filter(id => progress.completedConcepts.includes(id)).length;
    return Math.round((done / conceptIds.length) * 100);
  }

  return {
    progress,
    isConceptComplete,
    getQuestionAttempt,
    topicProgress,
    markConceptComplete,
    logQuestion,
    logMisconception,
  };
}
