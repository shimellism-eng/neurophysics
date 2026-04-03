import { useParams, useNavigate } from 'react-router-dom';
import { useTopicMeta } from '../hooks/useContent';
import { useProgress } from '../hooks/useProgress';
import { useUser } from '../context/UserContext';
import { ScreenWrapper } from '../components/layout/ScreenWrapper';
import { ProgressRing } from '../components/ui/ProgressRing';
import './TopicDetail.css';

export function TopicDetail() {
  const { topicId } = useParams<{ topicId: string }>();
  const navigate = useNavigate();
  const { data: meta, loading } = useTopicMeta(topicId ?? null);
  const { isConceptComplete, topicProgress } = useProgress();
  const { progress } = useUser();

  if (loading) return <ScreenWrapper><p className="text-muted">Loading…</p></ScreenWrapper>;
  if (!meta)   return <ScreenWrapper><p className="text-muted">Topic not found.</p></ScreenWrapper>;

  const pct = topicProgress(meta.conceptOrder);
  const boardNote = progress?.board ? meta.boardNotes[progress.board] : undefined;

  const CONCEPT_LABELS: Record<string, string> = {
    'resultant-forces':   'Resultant Forces',
    'newtons-first-law':  "Newton's First Law",
    'newtons-second-law': "Newton's Second Law",
    'newtons-third-law':  "Newton's Third Law",
    'weight-and-gravity': 'Weight and Gravity',
    'momentum':           'Momentum',
    'work-and-energy':    'Work and Energy',
  };

  return (
    <ScreenWrapper>
      <button className="topic-detail__back" onClick={() => navigate('/topics')}>← Topics</button>

      <div className="topic-detail__header">
        <div className="topic-detail__title-row">
          <span className="topic-detail__emoji">{meta.emoji}</span>
          <div>
            <h1 className="topic-detail__title">{meta.name}</h1>
            <p className="text-muted text-sm">{meta.estimatedMinutes} min · {meta.totalConcepts} concepts</p>
          </div>
        </div>
        <ProgressRing percent={pct} size={64} />
      </div>

      {boardNote && (
        <div className="topic-detail__board-note">
          <p>{boardNote}</p>
        </div>
      )}

      <div className="topic-detail__concepts">
        {meta.conceptOrder.map((cId, i) => {
          const done = isConceptComplete(cId);
          const label = CONCEPT_LABELS[cId] ?? cId;
          return (
            <button
              key={cId}
              className={`topic-detail__concept ${done ? 'topic-detail__concept--done' : ''}`}
              onClick={() => navigate(`/learn/${cId}`)}
            >
              <div className="topic-detail__concept-num">
                {done ? '✓' : i + 1}
              </div>
              <div className="topic-detail__concept-info">
                <p className="topic-detail__concept-name">{label}</p>
                <p className="topic-detail__concept-meta">~8 min</p>
              </div>
              <span className="topic-detail__concept-arrow">›</span>
            </button>
          );
        })}
      </div>
    </ScreenWrapper>
  );
}
