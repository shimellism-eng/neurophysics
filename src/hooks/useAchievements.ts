import { useState, useCallback, useRef } from 'react';
import type { UserProgress } from '../types/content';

export interface AchievementDef {
  id: string;
  icon: string;
  label: string;
  description: string;
  check: (progress: UserProgress, streak: number) => boolean;
  progressFn?: (progress: UserProgress, streak: number) => { current: number; target: number } | null;
}

export interface AchievementState {
  id: string;
  unlockedAt: string | null;
}

export interface AchievementView extends AchievementDef {
  unlocked: boolean;
  unlockedAt: string | null;
  progressInfo: { current: number; target: number } | null;
}

const STORAGE_KEY = 'neurophysics_achievements';

const FORCES_CONCEPTS = [
  'resultant-forces', 'newtons-first-law', 'newtons-second-law',
  'newtons-third-law', 'weight-and-gravity', 'momentum', 'work-and-energy',
];

const ELECTRICITY_CONCEPTS = [
  'charge-and-current', 'potential-difference', 'resistance',
  'ohms-law', 'series-circuits', 'parallel-circuits', 'power-and-energy',
];

export const ACHIEVEMENT_DEFS: AchievementDef[] = [
  {
    id: 'first-step',
    icon: '🌱',
    label: 'First Step',
    description: 'Complete your first concept',
    check: (p) => p.completedConcepts.length >= 1,
  },
  {
    id: 'forces-complete',
    icon: '⚡',
    label: 'Force of Nature',
    description: 'Complete all 7 Forces concepts',
    check: (p) => FORCES_CONCEPTS.every(c => p.completedConcepts.includes(c)),
    progressFn: (p) => ({
      current: FORCES_CONCEPTS.filter(c => p.completedConcepts.includes(c)).length,
      target: 7,
    }),
  },
  {
    id: 'electricity-complete',
    icon: '🔌',
    label: 'Circuit Master',
    description: 'Complete all 7 Electricity concepts',
    check: (p) => ELECTRICITY_CONCEPTS.every(c => p.completedConcepts.includes(c)),
    progressFn: (p) => ({
      current: ELECTRICITY_CONCEPTS.filter(c => p.completedConcepts.includes(c)).length,
      target: 7,
    }),
  },
  {
    id: 'question-10',
    icon: '🎯',
    label: 'Getting Started',
    description: 'Answer 10 questions',
    check: (p) => p.attemptedQuestions.length >= 10,
    progressFn: (p) => ({ current: Math.min(p.attemptedQuestions.length, 10), target: 10 }),
  },
  {
    id: 'question-50',
    icon: '💪',
    label: 'Practice Makes Progress',
    description: 'Answer 50 questions',
    check: (p) => p.attemptedQuestions.length >= 50,
    progressFn: (p) => ({ current: Math.min(p.attemptedQuestions.length, 50), target: 50 }),
  },
  {
    id: 'question-100',
    icon: '🏆',
    label: 'Century Club',
    description: 'Answer 100 questions',
    check: (p) => p.attemptedQuestions.length >= 100,
    progressFn: (p) => ({ current: Math.min(p.attemptedQuestions.length, 100), target: 100 }),
  },
  {
    id: 'accuracy-80',
    icon: '🎯',
    label: 'Sharp Shooter',
    description: 'Reach 80% accuracy (min 10 questions)',
    check: (p) => {
      if (p.attemptedQuestions.length < 10) return false;
      const correct = p.attemptedQuestions.filter(q => q.correct).length;
      return (correct / p.attemptedQuestions.length) >= 0.8;
    },
  },
  {
    id: 'streak-3',
    icon: '🔥',
    label: 'On a Roll',
    description: '3-day streak',
    check: (_p, streak) => streak >= 3,
    progressFn: (_p, streak) => ({ current: Math.min(streak, 3), target: 3 }),
  },
  {
    id: 'streak-7',
    icon: '🌟',
    label: 'Week Warrior',
    description: '7-day streak',
    check: (_p, streak) => streak >= 7,
    progressFn: (_p, streak) => ({ current: Math.min(streak, 7), target: 7 }),
  },
  {
    id: 'streak-30',
    icon: '💎',
    label: 'Unstoppable',
    description: '30-day streak',
    check: (_p, streak) => streak >= 30,
    progressFn: (_p, streak) => ({ current: Math.min(streak, 30), target: 30 }),
  },
  {
    id: 'night-owl',
    icon: '🦉',
    label: 'Night Owl',
    description: 'Study after 10pm',
    check: (p) => {
      return p.attemptedQuestions.some(q => {
        const h = new Date(q.timestamp).getHours();
        return h >= 22;
      }) || p.completedConcepts.length > 0 && new Date().getHours() >= 22;
    },
  },
  {
    id: 'early-bird',
    icon: '🐦',
    label: 'Early Bird',
    description: 'Study before 7am',
    check: (p) => {
      return p.attemptedQuestions.some(q => {
        const h = new Date(q.timestamp).getHours();
        return h < 7;
      }) || p.completedConcepts.length > 0 && new Date().getHours() < 7;
    },
  },
  {
    id: 'all-boards',
    icon: '📚',
    label: 'Board Explorer',
    description: 'Try questions from 3+ exam boards',
    check: (p) => {
      const boards = new Set<string>();
      for (const q of p.attemptedQuestions) {
        // question IDs contain board prefix e.g. "aqa-2022-p2-q3"
        const parts = (q.questionId ?? '').split('-');
        if (parts.length >= 2) boards.add(parts[0]);
      }
      return boards.size >= 3;
    },
  },
];

function loadState(): Record<string, string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveState(state: Record<string, string>): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch { /* storage unavailable */ }
}

export function useAchievements() {
  const [state, setState] = useState<Record<string, string>>(loadState);
  const sessionUnlocked = useRef<string[]>([]);

  const checkAchievements = useCallback((progress: UserProgress, streak: number): AchievementView[] => {
    const current = { ...state };
    const newlyUnlocked: string[] = [];

    for (const def of ACHIEVEMENT_DEFS) {
      if (current[def.id]) continue;
      if (def.check(progress, streak)) {
        const ts = new Date().toISOString();
        current[def.id] = ts;
        newlyUnlocked.push(def.id);
      }
    }

    if (newlyUnlocked.length > 0) {
      saveState(current);
      setState(current);
      sessionUnlocked.current = [...sessionUnlocked.current, ...newlyUnlocked];
    }

    return ACHIEVEMENT_DEFS.map(def => ({
      ...def,
      unlocked: !!current[def.id],
      unlockedAt: current[def.id] ?? null,
      progressInfo: def.progressFn ? def.progressFn(progress, streak) : null,
    }));
  }, [state]);

  const getAchievements = useCallback((progress: UserProgress, streak: number): AchievementView[] => {
    return ACHIEVEMENT_DEFS.map(def => ({
      ...def,
      unlocked: !!state[def.id],
      unlockedAt: state[def.id] ?? null,
      progressInfo: def.progressFn ? def.progressFn(progress, streak) : null,
    }));
  }, [state]);

  const getNewlyUnlocked = useCallback((): AchievementView[] => {
    const ids = sessionUnlocked.current;
    if (ids.length === 0) return [];
    return ACHIEVEMENT_DEFS
      .filter(d => ids.includes(d.id))
      .map(def => ({
        ...def,
        unlocked: true,
        unlockedAt: state[def.id] ?? null,
        progressInfo: def.progressFn ? null : null,
      }));
  }, [state]);

  const clearSessionUnlocked = useCallback(() => {
    sessionUnlocked.current = [];
  }, []);

  const unlockedCount = Object.keys(state).length;

  return {
    checkAchievements,
    getAchievements,
    getNewlyUnlocked,
    clearSessionUnlocked,
    unlockedCount,
    totalCount: ACHIEVEMENT_DEFS.length,
  };
}
