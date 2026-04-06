import { motion } from 'motion/react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, ChevronRight, BookOpen, FlaskConical, GraduationCap } from 'lucide-react'
import { TOPICS } from '../data/topics'
import { useProgress } from '../hooks/useProgress'
import { getExamQuestionCount } from '../data/examIndex'

export default function LessonPlayer() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { markStarted } = useProgress()
  const topic = TOPICS[id]

  if (!topic) return (
    <div className="flex items-center justify-center h-full" style={{ color: '#a8b8cc' }}>
      Topic not found
    </div>
  )

  const VisualComponent = topic.lessonVisual

  const examCount = getExamQuestionCount(id)

  const handleStartQuiz = () => {
    markStarted(id)
    navigate(`/diagnostic/${id}`)
  }

  return (
    <div className="flex flex-col h-full overflow-hidden" style={{ background: '#0b1121' }}>
      {/* Header */}
      <div className="px-5 pt-5 pb-3 shrink-0 flex items-center gap-3">
        <button
          onClick={() => navigate('/topics')}
          className="w-11 h-11 rounded-[12px] flex items-center justify-center"
          style={{ background: 'rgba(18,26,47,0.9)', border: '0.75px solid #1d293d' }}
        >
          <ArrowLeft size={18} color="#a8b8cc" />
        </button>
        <div className="flex-1 min-w-0">
          <div className="text-xs font-medium truncate" style={{ color: topic.moduleColor }}>{topic.module}</div>
          <h1 className="text-lg font-bold leading-tight truncate" style={{ color: '#f8fafc' }}>{topic.title}</h1>
        </div>
        <div className="flex items-center gap-2">
          {topic.course === 'physics-only' ? (
            <div
              className="px-2.5 py-1 rounded-full text-xs font-semibold"
              style={{ background: 'rgba(139,92,246,0.15)', color: '#a78bfa', border: '1px solid rgba(139,92,246,0.35)' }}
            >
              Physics Only
            </div>
          ) : (
            <div
              className="px-2.5 py-1 rounded-full text-xs font-semibold"
              style={{ background: 'rgba(34,197,94,0.12)', color: '#4ade80', border: '1px solid rgba(34,197,94,0.3)' }}
            >
              Combined
            </div>
          )}
          <div
            className="px-3 py-1 rounded-full text-xs font-medium"
            style={{ background: `${topic.moduleColor}20`, color: topic.moduleColor, border: `1px solid ${topic.moduleColor}40` }}
          >
            Lesson
          </div>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-5 pb-6">
        {/* Visual container */}
        <motion.div
          className="w-full rounded-[24px] mb-5 overflow-hidden"
          style={{
            minHeight: 240,
            background: 'rgba(18,26,47,0.9)',
            border: `0.75px solid ${topic.moduleColor}40`,
            boxShadow: `inset 0px 2px 4px 0px rgba(0,0,0,0.05), 0 0 30px ${topic.moduleColor}20`,
          }}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <VisualComponent />
        </motion.div>

        {/* Required Practical button */}
        {topic.practicalId && (
          <motion.button
            className="w-full py-3 rounded-[14px] flex items-center justify-center gap-2 font-semibold text-sm mb-4"
            style={{ background: 'rgba(253,199,0,0.12)', border: '0.75px solid rgba(253,199,0,0.4)', color: '#fdc700' }}
            onClick={() => navigate(`/practical/${topic.practicalId}`)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileTap={{ scale: 0.98 }}
          >
            <FlaskConical size={16} />
            Required Practical
          </motion.button>
        )}

        {/* Subtitle */}
        <motion.div
          className="flex items-center gap-2 mb-3"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <BookOpen size={14} color={topic.moduleColor} />
          <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: topic.moduleColor }}>
            {topic.subtitle}
          </span>
        </motion.div>

        {/* Description */}
        <motion.p
          className="text-sm leading-relaxed mb-6"
          style={{ color: '#cad5e2' }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {topic.description}
        </motion.p>

        {/* Key concepts pills */}
        <motion.div
          className="flex flex-wrap gap-2 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {[topic.subtitle, topic.module, 'GCSE Physics'].map((tag, i) => (
            <span
              key={i}
              className="px-3 py-1 rounded-full text-xs font-medium"
              style={{ background: 'rgba(18,26,47,0.9)', border: '0.75px solid #1d293d', color: '#a8b8cc' }}
            >
              {tag}
            </span>
          ))}
        </motion.div>

        {/* Concept card */}
        <motion.div
          className="rounded-[16px] p-4 mb-6"
          style={{
            background: `${topic.moduleColor}10`,
            border: `0.75px solid ${topic.moduleColor}40`,
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: topic.moduleColor }}>
            Key Concept
          </div>
          <p className="text-sm leading-relaxed" style={{ color: '#cad5e2' }}>
            {topic.concept}
          </p>
        </motion.div>

        {/* CTA  -  inside scroll so it never overlaps */}
        <motion.button
          className="w-full py-4 rounded-[16px] flex items-center justify-center gap-2 font-semibold text-base mb-6"
          style={{
            background: `linear-gradient(135deg, ${topic.moduleColor}, ${topic.moduleColor}cc)`,
            boxShadow: `0px 8px 24px ${topic.moduleColor}40`,
            color: '#fff',
          }}
          onClick={handleStartQuiz}
          whileTap={{ scale: 0.97 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          Test Your Knowledge
          <ChevronRight size={20} strokeWidth={2.5} />
        </motion.button>

        {/* Exam Practice button — below Test Your Knowledge */}
        {examCount > 0 && (
          <motion.button
            className="w-full py-4 rounded-[16px] flex items-center justify-center gap-2 font-semibold text-base mb-6"
            style={{ background: 'rgba(99,102,241,0.12)', border: '0.75px solid rgba(99,102,241,0.4)', color: '#818cf8' }}
            onClick={() => navigate(`/exam/${id}`)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            whileTap={{ scale: 0.98 }}
          >
            <GraduationCap size={16} />
            Exam Practice ({examCount} questions)
          </motion.button>
        )}
      </div>
    </div>
  )
}
