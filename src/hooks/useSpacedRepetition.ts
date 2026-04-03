import { useState, useCallback } from 'react';

/* ── Types ─────────────────────────────────────────────────────── */

export interface SRSCard {
  conceptId: string;
  nextReview: string; // ISO date YYYY-MM-DD
  interval: number;   // days
  easeFactor: number;
  repetitions: number;
}

export interface SRSStats {
  totalCards: number;
  dueToday: number;
  nextReviewDate: string | null; // ISO date of earliest future review, or null
  averageEase: number;
}

/* ── Constants ─────────────────────────────────────────────────── */

const STORAGE_KEY = 'neurophysics_srs';
const MIN_EASE = 1.3;
const INITIAL_INTERVAL = 1;

/* ── Helpers ───────────────────────────────────────────────────── */

function todayISO(): string {
  return new Date().toISOString().split('T')[0];
}

function addDays(dateStr: string, days: number): string {
  const d = new Date(dateStr + 'T00:00:00');
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
}

function loadCards(): SRSCard[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveCards(cards: SRSCard[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
  } catch { /* storage unavailable */ }
}

/* ── Hook ──────────────────────────────────────────────────────── */

export function useSpacedRepetition() {
  const [cards, setCards] = useState<SRSCard[]>(loadCards);

  /** Persist helper — updates state + localStorage */
  function persist(next: SRSCard[]) {
    saveCards(next);
    setCards(next);
  }

  /** Cards due today or earlier */
  const getDueCards = useCallback((): SRSCard[] => {
    const today = todayISO();
    return cards.filter(c => c.nextReview <= today);
  }, [cards]);

  /** Review a card with a quality rating 0-5 */
  const reviewCard = useCallback((conceptId: string, quality: 0 | 1 | 2 | 3 | 4 | 5) => {
    const today = todayISO();
    const next = cards.map(c => {
      if (c.conceptId !== conceptId) return c;

      let { interval, easeFactor, repetitions } = c;

      if (quality <= 2) {
        // Forgot — reset
        interval = INITIAL_INTERVAL;
        repetitions = 0;
        // ease factor decreases slightly
        easeFactor = Math.max(MIN_EASE, easeFactor - 0.2);
      } else if (quality === 3) {
        // Hard
        interval = Math.max(1, Math.round(interval * 1.2));
        repetitions += 1;
        easeFactor = Math.max(MIN_EASE, easeFactor - 0.15);
      } else if (quality === 4) {
        // Good
        interval = Math.max(1, Math.round(interval * easeFactor));
        repetitions += 1;
      } else {
        // Easy (5)
        interval = Math.max(1, Math.round(interval * easeFactor * 1.3));
        repetitions += 1;
        easeFactor = easeFactor + 0.15;
      }

      return {
        ...c,
        interval,
        easeFactor,
        repetitions,
        nextReview: addDays(today, interval),
      };
    });
    persist(next);
  }, [cards]);

  /** Add a new card (no-op if already exists) */
  const addCard = useCallback((conceptId: string) => {
    if (cards.some(c => c.conceptId === conceptId)) return;
    const card: SRSCard = {
      conceptId,
      nextReview: addDays(todayISO(), INITIAL_INTERVAL),
      interval: INITIAL_INTERVAL,
      easeFactor: 2.5,
      repetitions: 0,
    };
    persist([...cards, card]);
  }, [cards]);

  /** Aggregate stats */
  const getStats = useCallback((): SRSStats => {
    const today = todayISO();
    const dueToday = cards.filter(c => c.nextReview <= today).length;

    // Earliest future review (cards not yet due)
    const futureCards = cards.filter(c => c.nextReview > today);
    const nextReviewDate = futureCards.length > 0
      ? futureCards.reduce((min, c) => c.nextReview < min ? c.nextReview : min, futureCards[0].nextReview)
      : null;

    const averageEase = cards.length > 0
      ? Math.round((cards.reduce((sum, c) => sum + c.easeFactor, 0) / cards.length) * 100) / 100
      : 0;

    return {
      totalCards: cards.length,
      dueToday,
      nextReviewDate,
      averageEase,
    };
  }, [cards]);

  return { cards, getDueCards, reviewCard, addCard, getStats };
}
