import React, { createContext, useContext, useState } from 'react';
import type { BoardId, Tier, UserProgress } from '../types/content';

const PROGRESS_KEY = 'neurophysics_progress';
const ONBOARDED_KEY = 'neurophysics_onboarded';

function loadProgress(): UserProgress | null {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function saveProgress(p: UserProgress): void {
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(p));
  } catch { /* storage unavailable */ }
}

function createInitialProgress(board: BoardId, tier: Tier): UserProgress {
  return {
    board,
    tier,
    streak: 1,
    lastActiveDate: new Date().toISOString().split('T')[0],
    completedConcepts: [],
    attemptedQuestions: [],
    misconceptionsLogged: [],
  };
}

interface UserContextValue {
  progress: UserProgress | null;
  isOnboarded: boolean;
  completeOnboarding: (board: BoardId, tier: Tier) => void;
  markConceptComplete: (conceptId: string) => void;
  logQuestion: (questionId: string, correct: boolean) => void;
  logMisconception: (conceptId: string, answer: number, correct: boolean) => void;
  updateStreak: () => void;
}

const UserContext = createContext<UserContextValue | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState<UserProgress | null>(loadProgress);
  const [isOnboarded, setIsOnboarded] = useState(() =>
    localStorage.getItem(ONBOARDED_KEY) === 'true'
  );

  function update(fn: (prev: UserProgress) => UserProgress) {
    setProgress(prev => {
      if (!prev) return prev;
      const next = fn(prev);
      saveProgress(next);
      return next;
    });
  }

  function completeOnboarding(board: BoardId, tier: Tier) {
    const p = createInitialProgress(board, tier);
    saveProgress(p);
    setProgress(p);
    localStorage.setItem(ONBOARDED_KEY, 'true');
    setIsOnboarded(true);
  }

  function markConceptComplete(conceptId: string) {
    update(prev => ({
      ...prev,
      completedConcepts: prev.completedConcepts.includes(conceptId)
        ? prev.completedConcepts
        : [...prev.completedConcepts, conceptId],
    }));
  }

  function logQuestion(questionId: string, correct: boolean) {
    update(prev => {
      const existing = prev.attemptedQuestions.find(q => q.questionId === questionId);
      const timestamp = new Date().toISOString();
      if (existing) {
        return {
          ...prev,
          attemptedQuestions: prev.attemptedQuestions.map(q =>
            q.questionId === questionId
              ? { ...q, correct: q.correct || correct, attempts: q.attempts + 1, timestamp }
              : q
          ),
        };
      }
      return {
        ...prev,
        attemptedQuestions: [...prev.attemptedQuestions, { questionId, correct, attempts: 1, timestamp }],
      };
    });
  }

  function logMisconception(conceptId: string, diagnosticAnswer: number, correct: boolean) {
    update(prev => ({
      ...prev,
      misconceptionsLogged: [
        ...prev.misconceptionsLogged,
        { conceptId, diagnosticAnswer, correct, timestamp: new Date().toISOString() },
      ],
    }));
  }

  function updateStreak() {
    update(prev => {
      const today = new Date().toISOString().split('T')[0];
      if (prev.lastActiveDate === today) return prev;

      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      const newStreak = prev.lastActiveDate === yesterday ? prev.streak + 1 : 1;
      return { ...prev, streak: newStreak, lastActiveDate: today };
    });
  }

  return (
    <UserContext.Provider value={{
      progress,
      isOnboarded,
      completeOnboarding,
      markConceptComplete,
      logQuestion,
      logMisconception,
      updateStreak,
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be inside UserProvider');
  return ctx;
}
