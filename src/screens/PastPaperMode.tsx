import { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { useProgress } from '../hooks/useProgress';
import { ScreenWrapper } from '../components/layout/ScreenWrapper';
import { MarkSchemeReveal } from '../components/ui/MarkSchemeReveal';
import type { PastPaperQuestion, BoardId } from '../types/content';
import './PastPaperMode.css';

/** Maps each board to its available past-paper files (newest first). */
const PAPER_FILES: Record<BoardId, string[]> = {
  aqa:         ['2023-p2', '2022-p2', '2021-p2', '2020-p2', '2019-p2'],
  edexcel:     ['2023-p1', '2022-p1', '2021-p1'],
  'ocr-gateway': ['2023-p3', '2022-p3'],
  'ocr-21c':   ['2023-p3', '2022-p3'],
  wjec:        ['2023-u2', '2022-u2'],
};

/** Friendly label for a paper file key. */
function paperLabel(key: string): string {
  const [year, paper] = key.split('-');
  return `${year} ${paper.toUpperCase().replace('P', 'Paper ').replace('U', 'Unit ')}`;
}

export function PastPaperMode() {
  const { progress } = useUser();
  const { logQuestion } = useProgress();
  const boardId = (progress?.board ?? 'aqa') as BoardId;

  const availablePapers = PAPER_FILES[boardId] ?? PAPER_FILES.aqa;
  const [selectedPaper, setSelectedPaper] = useState(availablePapers[0]);
  const [questions, setQuestions] = useState<PastPaperQuestion[]>([]);
  const [filter, setFilter] = useState<'all' | 'easy' | 'medium' | 'hard'>('all');
  const [active, setActive] = useState<PastPaperQuestion | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);

  /* Reset paper selection when board changes */
  useEffect(() => {
    const papers = PAPER_FILES[boardId] ?? PAPER_FILES.aqa;
    setSelectedPaper(papers[0]);
  }, [boardId]);

  useEffect(() => {
    import(`../../content/past-papers/${boardId}/${selectedPaper}.json`)
      .then(mod => setQuestions((mod.default as any).questions))
      .catch(() => setQuestions([]));
  }, [boardId, selectedPaper]);

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
      <main className="pp-question safe-top safe-bot" aria-label="Past paper question">
        <div className="pp-question__topbar">
          <button className="pp-question__back" onClick={closeQuestion} aria-label="Back to question list">← Back</button>
          <div>
            <p className="pp-question__source">{active.id.replace(/^([a-z0-9-]+)-(\d{4})-.+-q/, (_, b, y) => `${b.toUpperCase()} ${y} Q`)}</p>
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
      </main>
    );
  }

  return (
    <ScreenWrapper>
      <div className="pp__header">
        <h1>Past Papers</h1>
        <p className="text-muted text-sm">{boardId.toUpperCase()} {paperLabel(selectedPaper)}</p>
        <div className="pp__paper-select">
          {availablePapers.map(p => (
            <button
              key={p}
              className={`pp__filter ${selectedPaper === p ? 'pp__filter--active' : ''}`}
              onClick={() => setSelectedPaper(p)}
            >
              {paperLabel(p)}
            </button>
          ))}
        </div>
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
