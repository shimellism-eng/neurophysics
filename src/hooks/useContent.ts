import { useState, useEffect } from 'react';
import type { BoardId, BoardConfig, TopicMeta, ConceptData } from '../types/content';

export function useBoardConfig(boardId: BoardId | null) {
  const [data, setData] = useState<BoardConfig | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!boardId) return;
    setLoading(true);
    import(`../../content/boards/${boardId}.json`)
      .then(mod => setData(mod.default as BoardConfig))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [boardId]);

  return { data, loading };
}

export function useTopicMeta(topicId: string | null) {
  const [data, setData] = useState<TopicMeta | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!topicId) return;
    setLoading(true);
    import(`../../content/topics/${topicId}/_meta.json`)
      .then(mod => setData(mod.default as TopicMeta))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [topicId]);

  return { data, loading };
}

export function useConcept(topicId: string | null, conceptId: string | null) {
  const [data, setData] = useState<ConceptData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!topicId || !conceptId) return;
    setLoading(true);
    setError(null);
    import(`../../content/topics/${topicId}/${conceptId}.json`)
      .then(mod => setData(mod.default as ConceptData))
      .catch(() => setError('Concept not found'))
      .finally(() => setLoading(false));
  }, [topicId, conceptId]);

  return { data, loading, error };
}
