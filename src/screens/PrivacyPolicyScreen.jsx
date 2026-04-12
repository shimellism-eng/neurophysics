import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Shield } from 'lucide-react'

const SECTIONS = [
  {
    title: '1. Who we are',
    body: `NeuroPhysics is a GCSE Physics revision app designed for students aged 13 and over, with a focus on supporting neurodivergent learners. It is operated by an independent UK-based developer ("we", "us", "our").

We take your privacy seriously and are committed to complying with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.`,
  },
  {
    title: '2. What data we collect and why',
    body: `We collect only what we need to run the app:

📧 Your email address
Why: To create and manage your account.
Stored by: Supabase (our secure login provider).
Legal basis: Contract — needed to provide the service.

📊 Your learning progress
What: Topics started and completed, XP points, streak.
Where: Stored on your device only. Not sent to any server.
Legal basis: Legitimate interests (providing personalised revision).

⚙️ Your accessibility settings
What: Preferences like reduce-motion, font choices.
Where: Stored on your device only.
Legal basis: Legitimate interests (making the app usable for you).

💬 Messages you send to Mamo (AI tutor)
What: The text of each question you type.
Where: Sent to Google's Gemini API to generate a reply, then discarded. We do not store your chat messages.
Legal basis: Consent (you actively choose to use the chat).

📝 AI marking submissions
What: Your written exam answers and the relevant mark scheme.
Where: Sent to Google's Gemini API for marking, then discarded. We do not store your answers.
Legal basis: Consent (you actively choose to submit for marking).

We do NOT collect your name, date of birth, location, payment information, or any health records.`,
  },
  {
    title: '3. Special category data',
    body: `During setup you may choose options such as dyslexia-friendly font or focus mode. These choices are stored only on your device and are not sent to us or any third party. We do not hold or process any medical or disability data about you.`,
  },
  {
    title: '4. Children and young people',
    body: `NeuroPhysics is designed for GCSE students and is intended for users aged 13 and over.

We follow the ICO's Children's Code (Age Appropriate Design Code). This means:
• We default to the most privacy-protective settings.
• We do not use your data for advertising or profiling.
• We collect only the minimum data needed.
• We make it easy to delete your account and all data.

If you are under 13: please do not use this app without a parent or guardian reading this policy and giving their consent on your behalf. If we discover a user is under 13 without parental consent, we will delete their account.

Parents and guardians: contact us at support@neurophysics.app to request account deletion for your child.`,
  },
  {
    title: '5. How your data is stored',
    body: `Your learning progress and settings are stored locally on your device. Your email address is held by Supabase on servers within the EU/EEA.

We take reasonable technical and organisational steps to protect your data, including encrypted connections (HTTPS) and access controls on our systems.

If you tap an external simulation link in the Explore tab, you will leave NeuroPhysics and visit a third-party website. Those sites are not controlled by us, have their own privacy policies, and may collect data independently of NeuroPhysics.`,
  },
  {
    title: '6. How long we keep your data',
    body: `• Your account and email: kept until you delete your account.
• Learning progress and settings: stored on your device — deleted when you clear app data or uninstall.
• AI chat messages and marking submissions: not stored after the response is generated.
• Server request logs (Vercel): retained for up to 30 days for security purposes.

When you delete your account (Settings → Delete Account), your email is permanently removed from Supabase within 30 days.`,
  },
  {
    title: '7. Your rights under UK GDPR',
    body: `You have the right to:

✓ Access — request a copy of the personal data we hold about you.
✓ Erasure ("right to be forgotten") — ask us to delete your account and associated data.
✓ Rectification — ask us to correct inaccurate data.
✓ Restriction — ask us to limit how we process your data.
✓ Object — object to processing based on legitimate interests.
✓ Portability — receive your data in a portable format.
✓ Withdraw consent — where processing is based on consent, you can withdraw it at any time.

To exercise any of these rights, contact us at support@neurophysics.app. We will respond within one calendar month.

You also have the right to complain to the Information Commissioner's Office (ICO) at ico.org.uk or by calling 0303 123 1113.`,
  },
  {
    title: '8. Third-party services',
    body: `We use the following trusted third-party services. Each has its own privacy policy:

• Google Gemini API — powers the Mamo AI tutor and AI marking. Your messages are processed by Google. See: policies.google.com/privacy

• Supabase — secure account login and authentication. Your email is stored on Supabase servers. See: supabase.com/privacy

• Vercel — hosts our API. Vercel may log anonymous request metadata (e.g. timestamps). See: vercel.com/legal/privacy-policy

Exam-style questions are original content created for revision practice. NeuroPhysics is not affiliated with, endorsed by, or associated with any exam board.`,
  },
  {
    title: '9. Cookies and local storage',
    body: `We use your device's local storage (similar to cookies) to:

• Remember you are logged in (necessary — cannot be disabled)
• Save your learning progress (necessary for the app to work)
• Remember your accessibility preferences (necessary for accessibility)

We do not use advertising cookies, tracking cookies, or analytics that identify you personally.`,
  },
  {
    title: '10. AI data processing (Google Gemini)',
    body: `When you use the AI Tutor (Mamo Chat) feature, your questions are sent to Google Gemini (Google LLC) for processing. Google processes this data in accordance with their AI data usage policies. We do not send your name or email address to Google — only the physics question text. You can disable AI features in Settings.

The same applies to AI-marked exam answers: only the text of your written answer and the relevant mark scheme are sent to Google Gemini. No personally identifying information accompanies these requests.

For more detail on how Google handles data sent to the Gemini API, see: ai.google.dev/gemini-api/terms`,
  },
  {
    title: '11. COPPA / US users',
    body: `If you are located in the United States and under 13 years old, you should not use this app. NeuroPhysics does not knowingly collect personal information from children under 13 in the United States.

For users aged 13–17 in the US, your parent or guardian should review this privacy policy before you create an account.

We collect minimal data as described above. If you believe a child under 13 in the US has created an account, please contact us immediately at support@neurophysics.app and we will delete the account and all associated data promptly.`,
  },
  {
    title: '12. Changes to this policy',
    body: `We may update this Privacy Policy to reflect changes in the law or how the app works. The latest version is always available in Settings → Privacy Policy. For significant changes affecting children's data, we will notify you within the app.`,
  },
  {
    title: '13. Contact and complaints',
    body: `For any privacy questions, data requests, or concerns:

Email: support@neurophysics.app

If you are not satisfied with our response, you have the right to complain to the ICO:
Website: ico.org.uk
Phone: 0303 123 1113
Post: Information Commissioner's Office, Wycliffe House, Water Lane, Wilmslow, SK9 5AF`,
  },
]

export default function PrivacyPolicyScreen() {
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
          <Shield size={16} color="#6366f1" />
          <h1 className="text-base font-bold" style={{ color: '#f8fafc' }}>Privacy Policy</h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-5 py-5 space-y-6">
        <div className="rounded-[14px] px-4 py-3" style={{ background: 'rgba(99,102,241,0.08)', border: '0.75px solid rgba(99,102,241,0.25)' }}>
          <p className="text-xs font-semibold" style={{ color: '#818cf8' }}>Last updated: April 2026</p>
          <p className="text-xs mt-1" style={{ color: '#a8b8cc' }}>This policy applies to the NeuroPhysics app and website. It explains what data we collect, why, and your rights under UK law.</p>
        </div>

        {SECTIONS.map(s => (
          <div key={s.title}>
            <h2 className="text-sm font-bold mb-2" style={{ color: '#f8fafc' }}>{s.title}</h2>
            <p className="text-sm leading-relaxed whitespace-pre-line break-words" style={{ color: '#a8b8cc' }}>{s.body}</p>
          </div>
        ))}

        <div className="rounded-[14px] px-4 py-3" style={{ background: 'rgba(0,188,125,0.06)', border: '0.75px solid rgba(0,188,125,0.2)' }}>
          <p className="text-xs" style={{ color: '#00bc7d' }}>🔒 NeuroPhysics is committed to the ICO Children's Code. Your data is never sold, never used for advertising, and you can delete everything at any time.</p>
        </div>

        <div style={{ height: 32 }} />
      </div>
    </div>
  )
}
