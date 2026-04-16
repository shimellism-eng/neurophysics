import { motion } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import PublicHeader from '../components/PublicHeader'

const STATS = [
  { value: '58', label: 'Topics' },
  { value: '2,900+', label: 'Questions' },
  { value: '6', label: 'Exam Boards' },
  { value: '100%', label: 'Neurodivergent-friendly' },
]

const HOW_IT_WORKS = [
  {
    num: '1',
    emoji: '🎓',
    title: 'Pick your exam board',
    desc: 'AQA, Edexcel, OCR, WJEC, CCEA — we cover them all.',
  },
  {
    num: '2',
    emoji: '📚',
    title: 'Learn by topic',
    desc: 'Bite-sized lessons with diagrams and worked examples.',
  },
  {
    num: '3',
    emoji: '✏️',
    title: 'Practise & test',
    desc: 'Adaptive questions that get harder as you improve.',
  },
  {
    num: '4',
    emoji: '📈',
    title: 'Track mastery',
    desc: 'See your progress across every topic at a glance.',
  },
]

const BRAIN_CARDS = [
  {
    emoji: '🧠',
    title: 'ADHD-friendly',
    desc: 'Chunked content, break reminders, no walls of text.',
    color: '#6366f1',
  },
  {
    emoji: '📖',
    title: 'Dyslexia support',
    desc: 'Readable fonts, high contrast, text-to-speech on every screen.',
    color: '#06b6d4',
  },
  {
    emoji: '🤖',
    title: 'AI tutor (Mamo)',
    desc: 'Ask anything, 24/7, no judgement.',
    color: '#e879f9',
  },
]

const MODULES = [
  { emoji: '⚡', name: 'Energy', color: '#f97316' },
  { emoji: '💪', name: 'Forces', color: '#10b981' },
  { emoji: '🌊', name: 'Waves', color: '#06b6d4' },
  { emoji: '🔌', name: 'Electricity', color: '#fbbf24' },
  { emoji: '⚛️', name: 'Atomic', color: '#e879f9' },
  { emoji: '🔮', name: 'Particle', color: '#9b59b6' },
  { emoji: '🚀', name: 'Space', color: '#6366f1' },
  { emoji: '🧲', name: 'Magnetism', color: '#f43f5e' },
]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1], delay },
})

export default function LandingScreen() {
  const navigate = useNavigate()

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        background: '#0a0a0f',
        overflowY: 'auto',
        overflowX: 'hidden',
        fontFamily: 'inherit',
        color: '#fff',
      }}
    >
      <PublicHeader />

      {/* Hero */}
      <section
        style={{
          position: 'relative',
          padding: '56px 20px 48px',
          textAlign: 'center',
          maxWidth: 480,
          margin: '0 auto',
        }}
      >
        {/* Glow backdrop */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 480,
            height: 320,
            background:
              'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(99,102,241,0.13) 0%, rgba(0,212,255,0.07) 50%, transparent 100%)',
            pointerEvents: 'none',
          }}
        />

        <motion.h1
          {...fadeUp(0)}
          style={{
            fontSize: 34,
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            margin: '0 0 4px',
            color: '#fff',
          }}
        >
          Master GCSE Physics.
          <br />
          <span style={{ color: '#00d4ff' }}>Your way.</span>
        </motion.h1>

        <motion.p
          {...fadeUp(0.1)}
          style={{
            fontSize: 15,
            color: 'rgba(255,255,255,0.55)',
            margin: '16px 0 32px',
            lineHeight: 1.55,
          }}
        >
          Built for neurodivergent learners.
          <br />
          Every topic. Every exam board.
        </motion.p>

        <motion.div
          {...fadeUp(0.2)}
          style={{ display: 'flex', gap: 10 }}
        >
          <button
            onClick={() => navigate('/auth')}
            style={{
              flex: 1,
              height: 48,
              background: '#00d4ff',
              border: 'none',
              borderRadius: 14,
              color: '#0a0a0f',
              fontSize: 15,
              fontWeight: 700,
              fontFamily: 'inherit',
              cursor: 'pointer',
              letterSpacing: '-0.01em',
            }}
          >
            Start for free →
          </button>
          <button
            onClick={() => navigate('/auth')}
            style={{
              flex: 1,
              height: 48,
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: 14,
              color: '#fff',
              fontSize: 15,
              fontWeight: 600,
              fontFamily: 'inherit',
              cursor: 'pointer',
            }}
          >
            Sign in
          </button>
        </motion.div>
      </section>

      {/* Stats strip */}
      <section style={{ padding: '0 16px 40px', maxWidth: 480, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 10,
          }}
        >
          {STATS.map((s) => (
            <div
              key={s.label}
              style={{
                background: '#12121a',
                border: '1px solid #1e1e2e',
                borderRadius: 14,
                padding: '16px 14px',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 800,
                  color: '#00d4ff',
                  letterSpacing: '-0.02em',
                  lineHeight: 1,
                }}
              >
                {s.value}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: 'rgba(255,255,255,0.45)',
                  marginTop: 4,
                  fontWeight: 500,
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* How it works */}
      <section style={{ padding: '0 16px 40px', maxWidth: 480, margin: '0 auto' }}>
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.35 }}
          style={{
            fontSize: 20,
            fontWeight: 700,
            marginBottom: 16,
            letterSpacing: '-0.02em',
            color: '#fff',
          }}
        >
          How it works
        </motion.h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {HOW_IT_WORKS.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, delay: 0.4 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              style={{
                background: '#12121a',
                border: '1px solid #1e1e2e',
                borderRadius: 14,
                padding: '14px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: 14,
              }}
            >
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: '50%',
                  background: 'rgba(99,102,241,0.15)',
                  border: '1px solid rgba(99,102,241,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  fontSize: 15,
                  fontWeight: 700,
                  color: '#a5b4fc',
                }}
              >
                {step.num}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 2 }}>
                  {step.emoji} {step.title}
                </div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.45 }}>
                  {step.desc}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Built for every brain */}
      <section style={{ padding: '0 16px 40px', maxWidth: 480, margin: '0 auto' }}>
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.5 }}
          style={{
            fontSize: 20,
            fontWeight: 700,
            marginBottom: 16,
            letterSpacing: '-0.02em',
            color: '#fff',
          }}
        >
          Built for every brain
        </motion.h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {BRAIN_CARDS.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.55 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              style={{
                background: '#12121a',
                border: `1px solid ${card.color}28`,
                borderRadius: 14,
                padding: '16px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: 14,
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  background: `${card.color}18`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 20,
                  flexShrink: 0,
                }}
              >
                {card.emoji}
              </div>
              <div>
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: 14,
                    marginBottom: 4,
                    color: card.color,
                  }}
                >
                  {card.title}
                </div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.45 }}>
                  {card.desc}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Topic module preview */}
      <section style={{ padding: '0 0 40px', maxWidth: 480, margin: '0 auto' }}>
        <h2
          style={{
            fontSize: 20,
            fontWeight: 700,
            marginBottom: 16,
            letterSpacing: '-0.02em',
            paddingLeft: 16,
            color: '#fff',
          }}
        >
          All topics covered
        </h2>
        <div
          style={{
            display: 'flex',
            gap: 8,
            overflowX: 'auto',
            paddingLeft: 16,
            paddingRight: 16,
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {MODULES.map((mod) => (
            <button
              key={mod.name}
              onClick={() => navigate('/auth')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '8px 14px',
                borderRadius: 9999,
                background: `${mod.color}14`,
                border: `1px solid ${mod.color}35`,
                color: mod.color,
                fontSize: 13,
                fontWeight: 600,
                fontFamily: 'inherit',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                flexShrink: 0,
                transition: 'background 0.15s',
              }}
            >
              <span>{mod.emoji}</span>
              <span>{mod.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section
        style={{
          padding: '32px 16px 0',
          maxWidth: 480,
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <h2
            style={{
              fontSize: 24,
              fontWeight: 800,
              letterSpacing: '-0.03em',
              marginBottom: 20,
              color: '#fff',
            }}
          >
            Ready to start?
          </h2>
          <button
            onClick={() => navigate('/auth')}
            style={{
              width: '100%',
              height: 56,
              background: '#00d4ff',
              border: 'none',
              borderRadius: 14,
              color: '#0a0a0f',
              fontSize: 16,
              fontWeight: 700,
              fontFamily: 'inherit',
              cursor: 'pointer',
              letterSpacing: '-0.01em',
              marginBottom: 16,
            }}
          >
            Create your free account →
          </button>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', margin: 0 }}>
            Already have an account?{' '}
            <button
              onClick={() => navigate('/auth')}
              style={{
                background: 'none',
                border: 'none',
                color: '#00d4ff',
                fontSize: 14,
                fontWeight: 600,
                fontFamily: 'inherit',
                cursor: 'pointer',
                padding: 0,
              }}
            >
              Sign in
            </button>
          </p>
        </motion.div>
      </section>

      {/* Footer */}
      <footer
        style={{
          padding: '32px 16px 40px',
          textAlign: 'center',
          maxWidth: 480,
          margin: '0 auto',
        }}
      >
        <p
          style={{
            fontSize: 12,
            color: 'rgba(255,255,255,0.3)',
            margin: 0,
          }}
        >
          © 2026 NeuroPhysics ·{' '}
          <button
            onClick={() => navigate('/privacy')}
            style={{
              background: 'none',
              border: 'none',
              color: 'rgba(255,255,255,0.3)',
              fontSize: 12,
              fontFamily: 'inherit',
              cursor: 'pointer',
              padding: 0,
              textDecoration: 'underline',
            }}
          >
            Privacy
          </button>
          {' · '}
          <button
            onClick={() => navigate('/terms')}
            style={{
              background: 'none',
              border: 'none',
              color: 'rgba(255,255,255,0.3)',
              fontSize: 12,
              fontFamily: 'inherit',
              cursor: 'pointer',
              padding: 0,
              textDecoration: 'underline',
            }}
          >
            Terms
          </button>
        </p>
      </footer>
    </div>
  )
}
