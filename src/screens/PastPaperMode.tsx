import { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { useProgress } from '../hooks/useProgress';
import { ScreenWrapper } from '../components/layout/ScreenWrapper';
import { MarkSchemeReveal } from '../components/ui/MarkSchemeReveal';
import type { PastPaperQuestion, BoardId } from '../types/content';
import './PastPaperMode.css';

export function PastPaperMode() {
  const { progress } = useUser();
  const { logQuestion } = useProgress();
  const boardId = (progress?.board ?? 'aqa') as BoardId;

  const [questions, setQuestions] = useState<PastPaperQuestion[]>([]);
  const [filter, setFilter] = useState<'all' | 'easy' | 'medium' | 'hard'>('all');
  const [active, setActive] = useState<PastPaperQuestion | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);

  useEffect(() => {
    import(`../../content/past-papers/${boardId}/2023-p2.json`)
      .then(mod => setQuestions((mod.default as any).questions))
      .catch(() => setQuestions([]));
  }, [boardId]);

  const filtered = filter === 'all' ? questions : questions.filter(q => q.difficulty === filter);

  function openQuestion(q: PastPaperQuestion) {
    setActive(q);
    setSelected(null);
    setAnswered(false);
  }

  function handleAnswer(idx: number) {
    if (answered) return;
    const correct = active!.correctIndex === idx;
    setSelected(idx);
    setAnswered(true);
    logQuestion(active!.id, correct);
  }

  function closeQuestion() { setActive(null); }

  if (active) {
    const correct = selected === active.correctIndex;
    return (
      <div className="pp-question safe-top safe-bot">
        <div className="pp-question__topbar">
          <button className="pp-question__back" onClick={closeQuestion}>← Back</button>
          <div>
            <p className="pp-question__source">{active.id.replace('aqa-', 'AQA ').replace('-p2-q', ' P2 Q')}</p>
            <span className="pp-question__marks">{active.marks} marks · {active.difficulty}</span>
          </div>
        </div>

        <div className="pp-question__body scroll-area">
          <div className="pp-question__text card">{active.questionText}</div>

          {active.type === 'multiple-choice' && active.options && (
            <div className="pp-question__options">
              {active.options.map((opt, i) => {
                let state = '';
                if (answered) {
                  if (i === active.correctIndex) state = 'correct';
                  else if (i === selected) state = 'wrong';
                  else state = 'dim';
                }
                return (
                  <button
                    key={i}
                    className={`pp-question__option pp-question__option--${state || 'idle'}`}
                    onClick={() => handleAnswer(i)}
                    disabled={answered}
                  >
                    <span className="pp-question__option-letter">{String.fromCharCode(65 + i)}</span>
                    <span>{opt}</span>
                  </button>
                );
              })}
            </div>
          )}

          {answered && (
            <div className={`pp-question__result pp-question__result--${correct ? 'correct' : 'wrong'}`}>
              {correct ? '✓ Correct!' : '✗ Not quite'}
            </div>
          )}

          {answered && (
            <MarkSchemeReveal
              steps={active.markScheme.steps.map(s => s.description)}
              award={`${active.marks} marks available`}
              commonMistake={active.markScheme.commonErrors?.[0]}
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <ScreenWrapper>
      <div className="pp__header">
        <h1>Past Papers</h1>
        <p className="text-muted text-sm">{boardId.toUpperCase()} 2023 Paper 2</p>
      </div>

      <div className="pp__filters">
        {(['all','easy','medium','hard'] as const).map(f => (
          <button
            key={f}
            className={`pp__filter ${filter === f ? 'pp__filter--active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div className="pp__list">
        {filtered.map(q => (
          <button key={q.id} className="pp__question-card card" onClick={() => openQuestion(q)}>
            <div className="pp__q-left">
              <p className="pp__q-number">Q{q.number}</p>
              <p className="pp__q-topic">{q.topic} · {q.concept.replace(/-/g, ' ')}</p>
            </div>
            <div className="pp__q-right">
              <span className={`pp__difficulty pp__difficulty--${q.difficulty}`}>{q.difficulty}</span>
              <span className="pp__marks-badge">{q.marks}m</span>
            </div>
          </button>
        ))}
        {filtered.length === 0 && (
          <p className="text-muted">No questions found.</p>
        )}
      </div>
    </ScreenWrapper>
  );
}
