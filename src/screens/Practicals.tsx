import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ScreenWrapper } from '../components/layout/ScreenWrapper';
import './Practicals.css';

/* ── Types ─────────────────────────────────────────────────── */

export interface PracticalSummary {
  id: string;
  number: string;
  title: string;
  topic: string;
  tripleOnly: boolean;
}

const TOPIC_ORDER = ['energy', 'electricity', 'particle-model', 'forces', 'waves'];
const TOPIC_LABELS: Record<string, string> = {
  energy: 'Energy',
  electricity: 'Electricity',
  'particle-model': 'Particle Model',
  forces: 'Forces',
  waves: 'Waves',
};

const ALL_FILTER = 'all';

/* ── Component ─────────────────────────────────────────────── */

export function Practicals() {
  const navigate = useNavigate();
  const [practicals, setPracticals] = useState<PracticalSummary[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>(ALL_FILTER);

  useEffect(() => {
    import('../../content/practicals/aqa-practicals.json')
      .then(mod => {
        const data = mod.default as PracticalSummary[];
        setPracticals(data);
      })
      .catch(console.error);
  }, []);

  const filtered = activeFilter === ALL_FILTER
    ? practicals
    : practicals.filter(p => p.topic === activeFilter);

  const grouped = TOPIC_ORDER.reduce<Record<string, PracticalSummary[]>>((acc, topic) => {
    const items = filtered.filter(p => p.topic === topic);
    if (items.length > 0) acc[topic] = items;
    return acc;
  }, {});

  const availableTopics = Array.from(new Set(practicals.map(p => p.topic)));

  return (
    <ScreenWrapper>
      {/* Header */}
      <div className="practicals__header">
        <h1 className="practicals__title">Required Practicals</h1>
        <p className="practicals__subtitle">
          AQA GCSE Physics (8463) · 10 practicals
        </p>
      </div>

      {/* Filter chips */}
      <div className="practicals__filters" role="group" aria-label="Filter by topic">
        <motion.button
          className={`practicals__chip ${activeFilter === ALL_FILTER ? 'practicals__chip--active' : ''}`}
          onClick={() => setActiveFilter(ALL_FILTER)}
          whileTap={{ scale: 0.95 }}
        >
          All
        </motion.button>
        {availableTopics
          .filter(t => TOPIC_ORDER.includes(t))
          .sort((a, b) => TOPIC_ORDER.indexOf(a) - TOPIC_ORDER.indexOf(b))
          .map(topic => (
            <motion.button
              key={topic}
              className={`practicals__chip ${activeFilter === topic ? 'practicals__chip--active' : ''}`}
              onClick={() => setActiveFilter(topic)}
              whileTap={{ scale: 0.95 }}
            >
              {TOPIC_LABELS[topic] ?? topic}
            </motion.button>
          ))}
      </div>

      {/* Practical groups */}
      <AnimatePresence mode="wait">
        {Object.keys(grouped).length === 0 ? (
          <p className="practicals__empty">No practicals found for this topic.</p>
        ) : (
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
          >
            {Object.entries(grouped).map(([topic, items]) => (
              <section key={topic} className="practicals__group">
                <div className="practicals__group-title">
                  <span>{TOPIC_LABELS[topic] ?? topic}</span>
                  <div className="practicals__group-line" aria-hidden="true" />
                </div>

                {items.map((p, i) => (
                  <motion.button
                    key={p.id}
                    className={`practicals__card${p.tripleOnly ? ' practicals__card--triple' : ''}`}
                    onClick={() => navigate(`/practical/${p.id}`)}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    whileTap={{ scale: 0.98 }}
                    aria-label={`${p.number}: ${p.title}${p.tripleOnly ? ', Triple Science only' : ''}`}
                  >
                    {/* RP badge */}
                    <div className="practicals__rp-badge" aria-hidden="true">
                      {p.number}
                    </div>

                    {/* Body */}
                    <div className="practicals__card-body">
                      <p className="practicals__card-title">{p.title}</p>
                      <div className="practicals__card-meta">
                        <span className={`practicals__topic-badge practicals__topic-badge--${p.topic}`}>
                          {TOPIC_LABELS[p.topic] ?? p.topic}
                        </span>
                        {p.tripleOnly && (
                          <span className="practicals__triple-badge">Triple only</span>
                        )}
                      </div>
                    </div>

                    <span className="practicals__card-arrow" aria-hidden="true">›</span>
                  </motion.button>
                ))}
              </section>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </ScreenWrapper>
  );
}
