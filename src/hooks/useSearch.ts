import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import type { TopicMeta, ConceptData, Equation, PastPaperQuestion } from '../types/content';

/* ── Result types ─────────────────────────────────────────────── */

export interface TopicResult {
  id: string;
  name: string;
  emoji: string;
  color: string;
  path: string;
}

export interface ConceptResult {
  id: string;
  title: string;
  topicId: string;
  topicName: string;
  path: string;
}

export interface EquationResult {
  id: string;
  name: string;
  canonical: string;
  color: string;
  path: string;
}

export interface QuestionResult {
  id: string;
  number: string;
  questionText: string;
  topic: string;
  marks: number;
  path: string;
}

export interface SearchResults {
  topics: TopicResult[];
  concepts: ConceptResult[];
  equations: EquationResult[];
  questions: QuestionResult[];
}

const EMPTY: SearchResults = { topics: [], concepts: [], equations: [], questions: [] };

/* ── Search index (loaded once) ───────────────────────────────── */

interface SearchIndex {
  topics: TopicResult[];
  concepts: ConceptResult[];
  equations: EquationResult[];
  questions: QuestionResult[];
}

async function buildIndex(): Promise<SearchIndex> {
  const topics: TopicResult[] = [];
  const concepts: ConceptResult[] = [];
  const equations: EquationResult[] = [];
  const questions: QuestionResult[] = [];

  // Topic meta
  try {
    const meta = (await import('../../content/topics/forces/_meta.json')).default as unknown as TopicMeta;
    topics.push({
      id: meta.id,
      name: meta.name,
      emoji: meta.emoji,
      color: meta.color,
      path: `/topic/${meta.id}`,
    });

    // Concept files within the topic
    const conceptFiles = meta.conceptOrder;
    for (const cid of conceptFiles) {
      try {
        const cMod = await import(`../../content/topics/${meta.id}/${cid}.json`);
        const c = cMod.default as unknown as ConceptData;
        concepts.push({
          id: c.id,
          title: c.title,
          topicId: meta.id,
          topicName: meta.name,
          path: `/learn/${c.id}`,
        });
      } catch { /* skip missing */ }
    }
  } catch { /* skip */ }

  // Electricity topic meta + concepts
  try {
    const meta = (await import('../../content/topics/electricity/_meta.json')).default as unknown as TopicMeta;
    topics.push({
      id: meta.id,
      name: meta.name,
      emoji: meta.emoji,
      color: meta.color,
      path: `/topic/${meta.id}`,
    });

    const conceptFiles = meta.conceptOrder;
    for (const cid of conceptFiles) {
      try {
        const cMod = await import(`../../content/topics/${meta.id}/${cid}.json`);
        const c = cMod.default as unknown as ConceptData;
        concepts.push({
          id: c.id,
          title: c.title,
          topicId: meta.id,
          topicName: meta.name,
          path: `/learn/${c.id}`,
        });
      } catch { /* skip missing */ }
    }
  } catch { /* skip */ }

  // Equations — Forces
  try {
    const eqMod = (await import('../../content/equations/forces.json')).default as any;
    for (const eq of eqMod.equations as Equation[]) {
      equations.push({
        id: eq.id,
        name: eq.name,
        canonical: eq.canonical,
        color: eq.color,
        path: '/equations',
      });
    }
  } catch { /* skip */ }

  // Equations — Electricity
  try {
    const eqMod = (await import('../../content/equations/electricity.json')).default as any;
    for (const eq of eqMod.equations as Equation[]) {
      equations.push({
        id: eq.id,
        name: eq.name,
        canonical: eq.canonical,
        color: eq.color,
        path: '/equations',
      });
    }
  } catch { /* skip */ }

  // Past papers
  try {
    const ppMod = (await import('../../content/past-papers/aqa/2023-p2.json')).default as any;
    for (const q of ppMod.questions as PastPaperQuestion[]) {
      questions.push({
        id: q.id,
        number: q.number,
        questionText: q.questionText,
        topic: q.topic,
        marks: q.marks,
        path: '/papers',
      });
    }
  } catch { /* skip */ }

  return { topics, concepts, equations, questions };
}

/* ── Fuzzy-ish match ──────────────────────────────────────────── */

function matches(text: string, query: string): boolean {
  return text.toLowerCase().includes(query.toLowerCase());
}

function searchIndex(index: SearchIndex, query: string): SearchResults {
  const q = query.trim();
  if (!q) return EMPTY;

  return {
    topics: index.topics.filter(t => matches(t.name, q)),
    concepts: index.concepts.filter(c => matches(c.title, q)),
    equations: index.equations.filter(e =>
      matches(e.name, q) || matches(e.canonical, q),
    ),
    questions: index.questions.filter(qn =>
      matches(qn.questionText, q) || matches(qn.number, q),
    ),
  };
}

/* ── Hook ─────────────────────────────────────────────────────── */

export function useSearch(query: string, debounceMs = 300) {
  const [results, setResults] = useState<SearchResults>(EMPTY);
  const [loading, setLoading] = useState(false);
  const indexRef = useRef<SearchIndex | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Build index once
  useEffect(() => {
    let cancelled = false;
    buildIndex().then(idx => {
      if (!cancelled) indexRef.current = idx;
    });
    return () => { cancelled = true; };
  }, []);

  // Debounced search
  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);

    const q = query.trim();
    if (!q) {
      setResults(EMPTY);
      setLoading(false);
      return;
    }

    setLoading(true);
    timerRef.current = setTimeout(() => {
      if (indexRef.current) {
        setResults(searchIndex(indexRef.current, q));
      }
      setLoading(false);
    }, debounceMs);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [query, debounceMs]);

  const totalResults = useMemo(
    () => results.topics.length + results.concepts.length + results.equations.length + results.questions.length,
    [results],
  );

  return { results, loading, totalResults };
}
