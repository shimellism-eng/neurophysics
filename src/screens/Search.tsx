import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useSettings } from '../context/SettingsContext';
import { useSearch } from '../hooks/useSearch';
import { ScreenWrapper } from '../components/layout/ScreenWrapper';
import type {
  TopicResult,
  ConceptResult,
  EquationResult,
  QuestionResult,
} from '../hooks/useSearch';
import './Search.css';

/* ── Animation helpers ────────────────────────────────────────── */

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0 },
};

/* ── Component ────────────────────────────────────────────────── */

export function Search() {
  const [query, setQuery] = useState('');
  const { results, totalResults } = useSearch(query);
  const navigate = useNavigate();
  const { settings } = useSettings();
  const noAnims = settings.animations === 'none';

  const hasQuery = query.trim().length > 0;

  return (
    <ScreenWrapper>
      {/* Back button */}
      <button className="search__back" onClick={() => navigate(-1)}>
        <span aria-hidden="true">&larr;</span> Back
      </button>

      {/* Search input */}
      <div className="search__input-wrap">
        <label htmlFor="search-input" className="sr-only">Search topics, equations, and questions</label>
        <span className="search__icon" aria-hidden="true">&#128269;</span>
        <input
          id="search-input"
          className="search__input"
          type="search"
          placeholder="Search topics, equations, questions..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          autoFocus
          autoComplete="off"
          spellCheck={false}
        />
      </div>

      {/* Results or empty state */}
      {!hasQuery && <EmptyState />}

      {hasQuery && totalResults === 0 && <NoResults query={query} />}

      {hasQuery && totalResults > 0 && (
        <div className="search__results">
          <AnimatePresence mode="sync">
            {/* Topics */}
            {results.topics.length > 0 && (
              <ResultGroup key="topics" title="Topics" noAnims={noAnims}>
                {results.topics.map(t => (
                  <TopicCard key={t.id} item={t} noAnims={noAnims} onClick={() => navigate(t.path)} />
                ))}
              </ResultGroup>
            )}

            {/* Concepts */}
            {results.concepts.length > 0 && (
              <ResultGroup key="concepts" title="Concepts" noAnims={noAnims}>
                {results.concepts.map(c => (
                  <ConceptCard key={c.id} item={c} noAnims={noAnims} onClick={() => navigate(c.path)} />
                ))}
              </ResultGroup>
            )}

            {/* Equations */}
            {results.equations.length > 0 && (
              <ResultGroup key="equations" title="Equations" noAnims={noAnims}>
                {results.equations.map(e => (
                  <EquationCard key={e.id} item={e} noAnims={noAnims} onClick={() => navigate(e.path)} />
                ))}
              </ResultGroup>
            )}

            {/* Questions */}
            {results.questions.length > 0 && (
              <ResultGroup key="questions" title="Questions" noAnims={noAnims}>
                {results.questions.map(q => (
                  <QuestionCard key={q.id} item={q} noAnims={noAnims} onClick={() => navigate(q.path)} />
                ))}
              </ResultGroup>
            )}
          </AnimatePresence>
        </div>
      )}
    </ScreenWrapper>
  );
}

/* ── Sub-components ───────────────────────────────────────────── */

function ResultGroup({ title, children, noAnims }: { title: string; children: React.ReactNode; noAnims: boolean }) {
  return (
    <motion.div
      initial={noAnims ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={noAnims ? undefined : { opacity: 0 }}
      transition={{ duration: 0.15 }}
    >
      <h2 className="search__group-title">{title}</h2>
      {children}
    </motion.div>
  );
}

function TopicCard({ item, noAnims, onClick }: { item: TopicResult; noAnims: boolean; onClick: () => void }) {
  return (
    <motion.button
      className="search__card search__card--topic"
      style={{ '--card-accent': item.color } as React.CSSProperties}
      onClick={onClick}
      variants={noAnims ? undefined : itemVariants}
      initial={noAnims ? false : 'hidden'}
      animate="visible"
      transition={{ duration: 0.15 }}
      whileTap={noAnims ? undefined : { scale: 0.98 }}
    >
      <span className="search__card-icon" aria-hidden="true">{item.emoji}</span>
      <div className="search__card-body">
        <p className="search__card-title">{item.name}</p>
      </div>
      <span className="search__card-chevron" aria-hidden="true">&rsaquo;</span>
    </motion.button>
  );
}

function ConceptCard({ item, noAnims, onClick }: { item: ConceptResult; noAnims: boolean; onClick: () => void }) {
  return (
    <motion.button
      className="search__card"
      onClick={onClick}
      variants={noAnims ? undefined : itemVariants}
      initial={noAnims ? false : 'hidden'}
      animate="visible"
      transition={{ duration: 0.15 }}
      whileTap={noAnims ? undefined : { scale: 0.98 }}
    >
      <span className="search__card-icon" aria-hidden="true">📖</span>
      <div className="search__card-body">
        <p className="search__card-title">{item.title}</p>
        <p className="search__card-sub">{item.topicName}</p>
      </div>
      <span className="search__card-chevron" aria-hidden="true">&rsaquo;</span>
    </motion.button>
  );
}

function EquationCard({ item, noAnims, onClick }: { item: EquationResult; noAnims: boolean; onClick: () => void }) {
  return (
    <motion.button
      className="search__card"
      onClick={onClick}
      variants={noAnims ? undefined : itemVariants}
      initial={noAnims ? false : 'hidden'}
      animate="visible"
      transition={{ duration: 0.15 }}
      whileTap={noAnims ? undefined : { scale: 0.98 }}
    >
      <span className="search__card-icon" aria-hidden="true">&sum;</span>
      <div className="search__card-body">
        <p className="search__card-title">{item.name}</p>
        <p className="search__card-sub search__card-formula">{item.canonical}</p>
      </div>
      <span className="search__card-chevron" aria-hidden="true">&rsaquo;</span>
    </motion.button>
  );
}

function QuestionCard({ item, noAnims, onClick }: { item: QuestionResult; noAnims: boolean; onClick: () => void }) {
  return (
    <motion.button
      className="search__card"
      onClick={onClick}
      variants={noAnims ? undefined : itemVariants}
      initial={noAnims ? false : 'hidden'}
      animate="visible"
      transition={{ duration: 0.15 }}
      whileTap={noAnims ? undefined : { scale: 0.98 }}
    >
      <span className="search__card-icon" aria-hidden="true">📝</span>
      <div className="search__card-body">
        <p className="search__card-title">Q{item.number} ({item.marks} marks)</p>
        <p className="search__card-sub">{item.questionText}</p>
      </div>
      <span className="search__card-chevron" aria-hidden="true">&rsaquo;</span>
    </motion.button>
  );
}

function EmptyState() {
  return (
    <div className="search__empty">
      <span className="search__empty-icon">&#128269;</span>
      <p className="search__empty-title">Search NeuroPhysics</p>
      <p className="search__empty-hint">
        Try searching for <span className="search__suggestion">"momentum"</span> or{' '}
        <span className="search__suggestion">"F=ma"</span>
      </p>
    </div>
  );
}

function NoResults({ query }: { query: string }) {
  return (
    <div className="search__empty">
      <span className="search__empty-icon">&#128528;</span>
      <p className="search__empty-title">No results for "{query.trim()}"</p>
      <p className="search__empty-hint">
        Try a different keyword, like{' '}
        <span className="search__suggestion">"weight"</span>,{' '}
        <span className="search__suggestion">"velocity"</span>, or{' '}
        <span className="search__suggestion">"Newton"</span>
      </p>
    </div>
  );
}
