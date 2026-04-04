import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ScreenWrapper } from '../components/layout/ScreenWrapper';
import { Equation } from '../components/ui/Equation';
import { ShcDiagram } from '../components/practicals/ShcDiagram';
import { ResistanceWireDiagram } from '../components/practicals/ResistanceWireDiagram';
import { HookesLawDiagram } from '../components/practicals/HookesLawDiagram';
import './PracticalDetail.css';

/* ── Types ─────────────────────────────────────────────────── */

interface Equipment {
  name: string;
  purpose: string;
}

interface Variable {
  symbol: string;
  name: string;
  unit: string;
  color: string;
}

interface ExamQuestion {
  year: number;
  marks: number;
  text: string;
  markScheme: string[];
}

interface Practical {
  id: string;
  board: string;
  number: string;
  title: string;
  topic: string;
  tripleOnly: boolean;
  aim: string;
  equipment: Equipment[];
  method: string[];
  diagram: { type: string; description: string };
  setupImageUrl: string | null;
  keyEquation: string;
  keyEquationTex: string;
  variables: Variable[];
  whatToMeasure: string[];
  howToProcess: string;
  commonMistakes: string[];
  examTips: string[];
  safetyPoints: string[];
  examQuestions: ExamQuestion[];
}

/* ── Diagram selector ───────────────────────────────────────── */

function DiagramForPractical({ id, description }: { id: string; description: string }) {
  if (id === 'rp1') return <ShcDiagram />;
  if (id === 'rp3') return <ResistanceWireDiagram />;
  if (id === 'rp6') return <HookesLawDiagram />;

  // Generic placeholder for practicals without an SVG component yet
  return (
    <div
      style={{
        background: 'var(--bg4)',
        border: '1px dashed var(--border2)',
        borderRadius: 'var(--r-sm)',
        padding: 'var(--sp-6)',
        textAlign: 'center',
        color: 'var(--muted)',
        fontSize: '0.85rem',
        lineHeight: '1.5',
      }}
    >
      <p style={{ marginBottom: 'var(--sp-2)', fontSize: '2rem' }}>🔬</p>
      <p>{description}</p>
    </div>
  );
}

/* ── Topic badge modifier ───────────────────────────────────── */

const TOPIC_LABELS: Record<string, string> = {
  energy: 'Energy',
  electricity: 'Electricity',
  'particle-model': 'Particle Model',
  forces: 'Forces',
  waves: 'Waves',
};

/* ── Exam question card ─────────────────────────────────────── */

function QuestionCard({ question }: { question: ExamQuestion }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="practical-detail__question-card">
      <button
        className="practical-detail__question-header"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
      >
        <div className="practical-detail__question-meta">
          <span className="practical-detail__question-year">{question.year}</span>
          <span className="practical-detail__question-marks">{question.marks} marks</span>
        </div>
        <span
          className={`practical-detail__question-toggle${open ? ' practical-detail__question-toggle--open' : ''}`}
          aria-hidden="true"
        >
          ▼
        </span>
      </button>

      <p className="practical-detail__question-text">{question.text}</p>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ overflow: 'hidden' }}
          >
            <div className="practical-detail__mark-scheme">
              <p className="practical-detail__mark-scheme-title">Mark scheme</p>
              <ul className="practical-detail__mark-scheme-list">
                {question.markScheme.map((point, i) => (
                  <li key={i} className="practical-detail__mark-scheme-item">
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Main component ─────────────────────────────────────────── */

export function PracticalDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [practical, setPractical] = useState<Practical | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    import('../../content/practicals/aqa-practicals.json')
      .then(mod => {
        const all = mod.default as Practical[];
        const found = all.find(p => p.id === id) ?? null;
        setPractical(found);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <ScreenWrapper>
        <p style={{ color: 'var(--muted)', textAlign: 'center', paddingTop: 'var(--sp-10)' }}>
          Loading practical…
        </p>
      </ScreenWrapper>
    );
  }

  if (!practical) {
    return (
      <ScreenWrapper>
        <button className="practical-detail__back" onClick={() => navigate('/practicals')}>
          ← Practicals
        </button>
        <p style={{ color: 'var(--muted)' }}>Practical not found.</p>
      </ScreenWrapper>
    );
  }

  const topicLabel = TOPIC_LABELS[practical.topic] ?? practical.topic;

  return (
    <ScreenWrapper>
      {/* Back */}
      <button
        className="practical-detail__back"
        onClick={() => navigate('/practicals')}
        aria-label="Back to practicals list"
      >
        ← Practicals
      </button>

      {/* RP Header */}
      <div className="practical-detail__header">
        <div className="practical-detail__rp-number">{practical.number}</div>
        <h1 className="practical-detail__title">{practical.title}</h1>
        <div className="practical-detail__badges">
          <span className={`practical-detail__topic-badge practical-detail__topic-badge--${practical.topic}`}>
            {topicLabel}
          </span>
          {practical.tripleOnly && (
            <span className="practical-detail__triple-badge">Triple Science only</span>
          )}
        </div>
      </div>

      {/* Aim */}
      <section className="practical-detail__section">
        <h2 className="practical-detail__section-title">Aim</h2>
        <p className="practical-detail__aim">{practical.aim}</p>
      </section>

      {/* Equipment */}
      <section className="practical-detail__section">
        <h2 className="practical-detail__section-title">Equipment</h2>
        <div className="practical-detail__equipment-list">
          {practical.equipment.map((item, i) => (
            <div key={i} className="practical-detail__equipment-item">
              <div className="practical-detail__equipment-dot" aria-hidden="true" />
              <div>
                <p className="practical-detail__equipment-name">{item.name}</p>
                <p className="practical-detail__equipment-purpose">{item.purpose}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Apparatus diagram */}
      <section className="practical-detail__section">
        <h2 className="practical-detail__section-title">Apparatus diagram</h2>
        <div className="practical-detail__diagram">
          {practical.setupImageUrl && (
            <img
              className="practical-detail__setup-photo"
              src={practical.setupImageUrl}
              alt={`Real-world setup for ${practical.title}`}
              loading="lazy"
            />
          )}
          <DiagramForPractical id={practical.id} description={practical.diagram.description} />
          <p className="practical-detail__diagram-caption">
            {practical.diagram.description}
          </p>
        </div>
      </section>

      {/* Method */}
      <section className="practical-detail__section">
        <h2 className="practical-detail__section-title">Method</h2>
        <ol className="practical-detail__method-list" aria-label="Step-by-step method">
          {practical.method.map((step, i) => (
            <li key={i} className="practical-detail__method-step">
              <div className="practical-detail__step-number" aria-hidden="true">
                {i + 1}
              </div>
              <span className="practical-detail__step-text">{step}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* What to measure */}
      <section className="practical-detail__section">
        <h2 className="practical-detail__section-title">What to measure</h2>
        <div className="practical-detail__measure-list">
          {practical.whatToMeasure.map((item, i) => (
            <div key={i} className="practical-detail__measure-item">
              <span className="practical-detail__measure-icon" aria-hidden="true">📏</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Key equation */}
      <section className="practical-detail__section">
        <h2 className="practical-detail__section-title">Key equation</h2>
        <div className="practical-detail__equation-panel">
          <div className="practical-detail__equation-display">
            <Equation tex={practical.keyEquationTex} display />
          </div>
          <div className="practical-detail__variables">
            {practical.variables.map((v, i) => (
              <div
                key={i}
                className={`practical-detail__variable practical-detail__variable--${v.color}`}
              >
                <span className="practical-detail__variable-symbol">{v.symbol}</span>
                <span className="practical-detail__variable-name">{v.name}</span>
                <span className="practical-detail__variable-unit">{v.unit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to process */}
      <section className="practical-detail__section">
        <h2 className="practical-detail__section-title">How to process your results</h2>
        <p className="practical-detail__process">{practical.howToProcess}</p>
      </section>

      {/* Common mistakes */}
      <section className="practical-detail__section">
        <div className="practical-detail__warning-box">
          <div className="practical-detail__warning-title">
            <span aria-hidden="true">⚠</span>
            Common mistakes
          </div>
          <ul className="practical-detail__warning-list">
            {practical.commonMistakes.map((m, i) => (
              <li key={i} className="practical-detail__warning-item">{m}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Exam tips */}
      <section className="practical-detail__section">
        <div className="practical-detail__tips-box">
          <div className="practical-detail__tips-title">
            <span aria-hidden="true">★</span>
            Exam tips
          </div>
          <ul className="practical-detail__tips-list">
            {practical.examTips.map((tip, i) => (
              <li key={i} className="practical-detail__tips-item">{tip}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Safety */}
      <section className="practical-detail__section">
        <div className="practical-detail__safety-box">
          <div className="practical-detail__safety-title">
            <span aria-hidden="true">⚠</span>
            Safety
          </div>
          <ul className="practical-detail__safety-list">
            {practical.safetyPoints.map((s, i) => (
              <li key={i} className="practical-detail__safety-item">{s}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Exam questions */}
      {practical.examQuestions.length > 0 && (
        <section className="practical-detail__section">
          <h2 className="practical-detail__section-title">Exam-style questions</h2>
          <div className="practical-detail__questions">
            {practical.examQuestions.map((q, i) => (
              <QuestionCard key={i} question={q} />
            ))}
          </div>
        </section>
      )}
    </ScreenWrapper>
  );
}
