/**
 * SessionClose — Step 9
 * Plants the next retrieval event, closes the cognitive loop, ends with
 * a sense of genuine completion.
 *
 * Research:
 * - Spacing effect (Cepeda et al.): memory consolidation requires time-spaced
 *   retrieval — a single lesson without future retrieval = ~70% forgetting in 24 hrs
 * - ADHD: procedural memory consolidation is time-dependent; scheduled review
 *   = external executive function scaffold replacing internal one
 * - Bullet-point recap (not sentences) supports ADHD end-of-session fatigue
 * - Autistic learners benefit from closing the cognitive loop explicitly
 */
import { motion } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle2, ChevronRight, GraduationCap, RotateCcw } from 'lucide-react'

export default function SessionClose({
  topic,
  topicId,
  examCount,
  onStartQuiz,
  recap,
}) {
  const navigate = useNavigate()

  return (
    <div className="px-5 py-6 flex flex-col gap-5">

      {/* Completion celebration */}
      <motion.div
        className="flex flex-col items-center gap-3 py-4"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center"
          style={{
            background: `${topic.moduleColor}20`,
            border: `2px solid ${topic.moduleColor}50`,
          }}
        >
          <CheckCircle2 size={32} color={topic.moduleColor} />
        </div>
        <div className="text-center">
          <h2 className="text-lg font-bold" style={{ color: '#f8fafc' }}>
            Lesson complete
          </h2>
          <p className="text-sm mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>
            {topic.title}
          </p>
        </div>
      </motion.div>

      {/* What you learned today — 3 bullets */}
      <motion.div
        className="rounded-[18px] px-4 py-4"
        style={{
          background: `${topic.moduleColor}0d`,
          border: `1px solid ${topic.moduleColor}30`,
        }}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        <div className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: topic.moduleColor }}>
          What you learned today
        </div>
        <div className="flex flex-col gap-2.5">
          {recap.map((point, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5"
                style={{ background: `${topic.moduleColor}25`, color: topic.moduleColor }}
              >
                {i + 1}
              </div>
              <p className="text-sm leading-snug" style={{ color: '#cad5e2' }}>{point}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Spaced review message */}
      <motion.div
        className="flex items-start gap-3 px-4 py-3 rounded-[14px]"
        style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)' }}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.22 }}
      >
        <RotateCcw size={14} color="#818cf8" style={{ marginTop: 1, flexShrink: 0 }} />
        <p className="text-xs leading-relaxed" style={{ color: '#a5b4fc' }}>
          This will come up again in <strong>1 day</strong> for a quick retrieval check.
          Spaced practice is what moves it from short-term to long-term memory.
        </p>
      </motion.div>

      {/* CTAs */}
      <div className="flex flex-col gap-3">
        <motion.button
          className="w-full py-4 rounded-[16px] font-bold text-base flex items-center justify-center gap-2"
          style={{
            background: `linear-gradient(135deg, ${topic.moduleColor}, ${topic.moduleColor}cc)`,
            boxShadow: `0 8px 28px ${topic.moduleColor}40`,
            color: '#fff',
          }}
          onClick={onStartQuiz}
          whileTap={{ scale: 0.97 }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Test Your Knowledge
          <ChevronRight size={20} strokeWidth={2.5} />
        </motion.button>

        {examCount > 0 && (
          <motion.button
            className="w-full py-4 rounded-[16px] font-bold text-base flex items-center justify-center gap-2"
            style={{
              background: 'rgba(99,102,241,0.12)',
              border: '1px solid rgba(99,102,241,0.4)',
              color: '#818cf8',
            }}
            onClick={() => navigate(`/exam/${topicId}`)}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.38 }}
          >
            <GraduationCap size={16} />
            Exam Practice ({examCount} questions)
          </motion.button>
        )}
      </div>
    </div>
  )
}
