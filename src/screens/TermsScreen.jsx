import { useNavigate } from 'react-router-dom'
import { ArrowLeft, FileText } from '@phosphor-icons/react'

const SECTIONS = [
  {
    title: '1. Who these terms apply to',
    body: `These Terms of Service ("Terms") govern your use of NeuroPhysics, a GCSE Physics revision app operated by an independent UK-based developer ("we", "us", "our").

By creating an account or using the app, you agree to these Terms. If you do not agree, please do not use the app.

Minimum age: You must be 13 or older to use NeuroPhysics. If you are under 16, a parent or guardian should read and agree to these Terms on your behalf before you use the app.`,
  },
  {
    title: '2. What NeuroPhysics provides',
    body: `NeuroPhysics provides:
• GCSE Physics revision lessons, interactive diagrams, and knowledge checks
• Practice exam questions in the style of major UK exam boards
• An AI-powered tutoring chat (Mamo)
• AI-assisted marking of written exam answers
• Practical lab simulations

The app is for personal, non-commercial educational use only. It is not a substitute for qualified teacher instruction, official exam board guidance, or professional academic advice.

Exam-style questions in NeuroPhysics are original content created for revision practice. NeuroPhysics is not affiliated with, endorsed by, or authorised by any exam board.`,
  },
  {
    title: '3. AI tutor (Mamo) and AI marking',
    body: `The Mamo chat feature and AI marking system are powered by Google's Gemini AI model. These services are automated.

Important limitations — please read carefully:

• AI responses and marks may be inaccurate, incomplete, or out of date.
• AI marking is for practice and self-assessment only. It does not reflect official exam board marking standards.
• You should always verify important information with a qualified teacher or official revision materials.
• Do not rely solely on AI-generated content for exam preparation.
• Do not share personal, sensitive, or confidential information in the chat.
• We are not responsible for any consequences of relying on AI-generated content, including any effect on your exam results.

By using Mamo or submitting answers for AI marking, you accept these limitations.`,
  },
  {
    title: '4. Your account',
    body: `You are responsible for:
• Keeping your login details secure and confidential.
• All activity that takes place under your account.
• Notifying us immediately if you suspect unauthorised use of your account.

We reserve the right to suspend or delete accounts that breach these Terms.`,
  },
  {
    title: '5. Acceptable use',
    body: `You agree not to:
• Use the app for any unlawful purpose under the laws of England and Wales.
• Attempt to reverse-engineer, decompile, or copy the app or its content.
• Share your account with others or create multiple accounts.
• Attempt to manipulate, bypass, or exploit the AI systems.
• Use the app to bully, harass, or harm others.
• Submit content that is offensive, illegal, or infringes third-party rights.`,
  },
  {
    title: '6. Intellectual property',
    body: `All content in NeuroPhysics — including lesson text, diagrams, animations, code, and original exam-style questions — is owned by the developer and is protected by UK copyright law (Copyright, Designs and Patents Act 1988).

You may use the content for your own personal, non-commercial study only. You may not copy, distribute, sell, or publish any content from the app without our written permission.`,
  },
  {
    title: '7. Disclaimers',
    body: `NeuroPhysics is provided "as is" and "as available". We do not guarantee that:
• The app will be error-free or always available.
• Revision content is 100% accurate or reflects the very latest specification.
• AI-generated marking will meet official exam board standards.

Nothing in these Terms affects your rights as a consumer under the Consumer Rights Act 2015.`,
  },
  {
    title: '8. Limitation of liability',
    body: `To the fullest extent permitted by the laws of England and Wales, we shall not be liable for:
• Any indirect, incidental, or consequential loss or damage.
• Loss of data or device damage arising from use of the app.
• Any impact on your exam results, grades, or academic performance.
• Inaccuracies in AI-generated content or marking.

Our total liability to you for any claim shall not exceed the amount you have paid us in the 12 months preceding the claim. If you have not paid anything, our liability is limited to £50.

These limitations do not apply to liability for death or personal injury caused by our negligence, fraud, or any other liability that cannot be excluded by law.`,
  },
  {
    title: '9. Privacy and data',
    body: `Your use of NeuroPhysics is also governed by our Privacy Policy, which explains how we collect and use your data in compliance with UK GDPR and the Data Protection Act 2018. You can read it in Settings → Privacy Policy.`,
  },
  {
    title: '10. Changes to these terms',
    body: `We may update these Terms from time to time. We will notify you of significant changes within the app. Continued use of the app after notification of changes means you accept the updated Terms.

If you do not accept the new Terms, you should stop using the app and delete your account.`,
  },
  {
    title: '11. Governing law and disputes',
    body: `These Terms are governed by the laws of England and Wales. Any disputes arising from these Terms or your use of the app shall be subject to the exclusive jurisdiction of the courts of England and Wales.

If you have a complaint or dispute, please contact us first at support@neurophysics.app and we will try to resolve it informally.`,
  },
  {
    title: '12. Contact',
    body: `For questions about these Terms:\nEmail: support@neurophysics.app`,
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
          className="w-11 h-11 rounded-[12px] flex items-center justify-center shrink-0"
          style={{ background: 'rgba(18,26,47,0.9)', border: '0.75px solid #1d293d' }}
          aria-label="Go back"
        >
          <ArrowLeft size={18} color="#a8b8cc" />
        </button>
        <div className="flex items-center gap-2">
          <FileText size={16} color="#6366f1" />
          <h1 className="text-base font-bold" style={{ color: '#f8fafc' }}>Terms of Service</h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-5 py-5 space-y-6" style={{ minHeight: 0 }}>
        <div className="rounded-[14px] px-4 py-3" style={{ background: 'rgba(99,102,241,0.08)', border: '0.75px solid rgba(99,102,241,0.25)' }}>
          <p className="text-xs font-semibold" style={{ color: '#818cf8' }}>Last updated: April 2026 · England and Wales</p>
          <p className="text-xs mt-1" style={{ color: '#a8b8cc' }}>Please read these terms before using NeuroPhysics. They explain your rights and responsibilities as a user.</p>
        </div>

        {SECTIONS.map(s => (
          <div key={s.title}>
            <h2 className="text-sm font-bold mb-2" style={{ color: '#f8fafc' }}>{s.title}</h2>
            <p className="text-sm leading-relaxed whitespace-pre-line break-words" style={{ color: '#a8b8cc' }}>{s.body}</p>
          </div>
        ))}

        <div style={{ height: 32 }} />
      </div>
    </div>
  )
}
