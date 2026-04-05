import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

const SECTIONS = [
  {
    title: '1. Acceptance of terms',
    body: `By downloading or using NeuroPhysics you agree to these Terms of Service. If you do not agree, please do not use the app.\n\nUsers under 13 must have parental or guardian consent before using the app.`,
  },
  {
    title: '2. What NeuroPhysics provides',
    body: `NeuroPhysics provides interactive GCSE Physics revision materials aligned to the AQA specification, including lessons, knowledge checks, practical simulations, and an AI-powered tutoring chat (Mamo).\n\nThe app is for educational purposes only and is not a substitute for qualified teacher instruction.`,
  },
  {
    title: '3. AI tutor (Mamo)',
    body: `The Mamo chat feature is powered by Claude, an AI model made by Anthropic. Responses are generated automatically and may occasionally be inaccurate. You should:\n\n• Verify important information with a teacher or textbook.\n• Not rely solely on Mamo for exam preparation.\n• Not share personal, sensitive, or confidential information in the chat.\n\nWe are not responsible for any decisions made based on AI-generated content.`,
  },
  {
    title: '4. Acceptable use',
    body: `You agree not to:\n\n• Use the app for any unlawful purpose.\n• Attempt to reverse-engineer, modify, or distribute the app.\n• Use the app to harass, harm, or mislead others.\n• Attempt to bypass or exploit the AI system prompt.`,
  },
  {
    title: '5. Intellectual property',
    body: `All app content — including lesson text, diagrams, animations, and code — is owned by the developer and protected by copyright law. You may use the content for personal, non-commercial study only.`,
  },
  {
    title: '6. Disclaimer of warranties',
    body: `NeuroPhysics is provided "as is" without warranties of any kind. We do not guarantee that the app will be error-free, always available, or that revision materials are 100% accurate or up to date with the latest AQA specification.`,
  },
  {
    title: '7. Limitation of liability',
    body: `To the maximum extent permitted by law, we are not liable for any indirect, incidental, or consequential damages arising from your use of the app, including exam results.`,
  },
  {
    title: '8. Changes to these terms',
    body: `We may update these Terms from time to time. The latest version will always be available in the app. Continued use after changes means you accept the updated terms.`,
  },
  {
    title: '9. Governing law',
    body: `These Terms are governed by the laws of England and Wales.`,
  },
  {
    title: '10. Contact',
    body: `For questions about these Terms, contact:\nsupport@neurophysics.app`,
  },
]

export default function TermsScreen() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col h-full overflow-hidden" style={{ background: '#0b1121' }}>
      {/* Header */}
      <div className="px-5 pt-5 pb-4 shrink-0 flex items-center gap-3" style={{ borderBottom: '0.75px solid #1d293d' }}>
        <button
          onClick={() => navigate(-1)}
          className="w-9 h-9 rounded-[12px] flex items-center justify-center shrink-0"
          style={{ background: 'rgba(18,26,47,0.9)', border: '0.75px solid #1d293d' }}
          aria-label="Go back"
        >
          <ArrowLeft size={18} color="#90a1b9" />
        </button>
        <h1 className="text-base font-bold" style={{ color: '#f8fafc' }}>Terms of Service</h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-5 py-5 space-y-6">
        <p className="text-xs" style={{ color: '#90a1b9' }}>Last updated: April 2026</p>

        {SECTIONS.map(s => (
          <div key={s.title}>
            <h2 className="text-sm font-bold mb-2" style={{ color: '#f8fafc' }}>{s.title}</h2>
            <p className="text-sm leading-relaxed whitespace-pre-line" style={{ color: '#90a1b9' }}>{s.body}</p>
          </div>
        ))}

        <div style={{ height: 32 }} />
      </div>
    </div>
  )
}
