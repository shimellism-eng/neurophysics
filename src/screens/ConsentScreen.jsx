/**
 * ConsentScreen — shown once on first launch.
 * UK GDPR / ICO Children's Code compliant age gate + data consent.
 * Sets neurophysics_consent in localStorage on acceptance.
 */
import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import { Shield, Check, CaretRight, Warning } from '@phosphor-icons/react'

const CURRENT_YEAR = new Date().getFullYear()

function calcAge(year, month) {
  if (!year || !month) return null
  const now = new Date()
  let age = now.getFullYear() - parseInt(year)
  if (now.getMonth() + 1 < parseInt(month)) age--
  return age
}

export default function ConsentScreen() {
  const navigate = useNavigate()
  const [birthYear, setBirthYear] = useState('')
  const [birthMonth, setBirthMonth] = useState('')
  const [ageConfirmed, setAgeConfirmed] = useState(false)
  const [termsRead, setTermsRead] = useState(false)
  const [parentalConsent, setParentalConsent] = useState(false)

  const age = calcAge(birthYear, birthMonth)
  const ageEntered = birthYear.length === 4 && birthMonth !== ''
  const isUnder13 = ageEntered && age !== null && age < 13
  const isOldEnough = ageEntered && age !== null && age >= 13
  const needs13to15Notice = isOldEnough && age !== null && age <= 15

  const canContinue = isOldEnough && ageConfirmed && termsRead && (!needs13to15Notice || parentalConsent)

  const handleContinue = () => {
    try {
      localStorage.setItem('neurophysics_consent', JSON.stringify({
        ts: Date.now(),
        version: '2026-04',
        ageVerified: age,
      }))
    } catch {}
    navigate('/auth', { replace: true })
  }

  return (
    <div
      className="flex flex-col h-full overflow-hidden"
      style={{ background: '#0b1121' }}
    >
      <div className="flex-1 overflow-y-auto px-5 pt-10 pb-8 flex flex-col gap-6" style={{ minHeight: 0 }}>

        {/* Icon + title */}
        <motion.div
          className="flex flex-col items-center text-center gap-3"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="w-16 h-16 rounded-[22px] flex items-center justify-center"
            style={{ background: 'rgba(99,102,241,0.15)', border: '1.5px solid rgba(99,102,241,0.35)' }}>
            <Shield size={30} color="#818cf8" />
          </div>
          <h1 className="text-2xl font-bold" style={{ color: '#f8fafc', letterSpacing: '-0.02em' }}>
            Before you start
          </h1>
          <p className="text-sm leading-relaxed" style={{ color: '#a8b8cc', maxWidth: 300 }}>
            NeuroPhysics is a GCSE revision app for students aged 13+. Please take a moment to confirm the following.
          </p>
        </motion.div>

        {/* What we collect — plain English summary */}
        <motion.div
          className="rounded-[18px] px-4 py-4 space-y-3"
          style={{ background: 'rgba(18,26,47,0.9)', border: '0.75px solid #1d293d' }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          <p className="text-xs font-bold uppercase tracking-wide" style={{ color: '#556677' }}>What we use your data for</p>
          {[
            { emoji: '📧', label: 'Your email address', detail: 'To create your account' },
            { emoji: '📊', label: 'Your revision progress', detail: 'Stored on your device only' },
            { emoji: '💬', label: 'AI chat & marking', detail: 'Sent to Google, not stored by us' },
          ].map(item => (
            <div key={item.label} className="flex items-start gap-3">
              <span style={{ fontSize: 18, lineHeight: 1.4 }}>{item.emoji}</span>
              <div>
                <p className="text-sm font-semibold" style={{ color: '#f8fafc' }}>{item.label}</p>
                <p className="text-xs" style={{ color: '#a8b8cc' }}>{item.detail}</p>
              </div>
            </div>
          ))}
          <p className="text-xs pt-1" style={{ color: '#556677' }}>
            We never sell your data or use it for advertising.
          </p>
        </motion.div>

        {/* Age verification */}
        <motion.div
          className="rounded-[18px] px-4 py-4"
          style={{ background: 'rgba(18,26,47,0.9)', border: '0.75px solid #1d293d' }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
        >
          <p className="text-xs font-bold uppercase tracking-wide mb-3" style={{ color: '#556677' }}>Your date of birth</p>
          <div className="flex gap-3">
            <select
              value={birthMonth}
              onChange={e => setBirthMonth(e.target.value)}
              className="flex-1 rounded-[10px] px-3 py-2.5 text-sm font-semibold"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '0.75px solid #2d3e55',
                color: birthMonth ? '#f8fafc' : '#556677',
                outline: 'none',
              }}
            >
              <option value="">Month</option>
              {['January','February','March','April','May','June','July','August','September','October','November','December'].map((m, i) => (
                <option key={i} value={i + 1}>{m}</option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Year"
              value={birthYear}
              onChange={e => setBirthYear(e.target.value.slice(0, 4))}
              min={CURRENT_YEAR - 100}
              max={CURRENT_YEAR}
              className="w-24 rounded-[10px] px-3 py-2.5 text-sm font-semibold"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '0.75px solid #2d3e55',
                color: '#f8fafc',
                outline: 'none',
              }}
            />
          </div>

          {/* Under-13 warning */}
          <AnimatePresence>
            {isUnder13 && (
              <motion.div
                className="flex items-start gap-2 mt-3 px-3 py-3 rounded-[10px]"
                style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)' }}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <Warning size={14} color="#f87171" style={{ flexShrink: 0, marginTop: 1 }} />
                <p className="text-xs leading-relaxed" style={{ color: '#fca5a5' }}>
                  NeuroPhysics requires users to be 13 or older. If you are under 13,
                  please ask a parent or guardian to create an account on your behalf.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 13–15 parental consent notice */}
          <AnimatePresence>
            {needs13to15Notice && (
              <motion.div
                className="mt-3 rounded-[10px] px-3 py-3 space-y-3"
                style={{ background: 'rgba(243,156,18,0.08)', border: '1px solid rgba(243,156,18,0.3)' }}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <div className="flex items-start gap-2">
                  <Warning size={14} color="#f39c12" style={{ flexShrink: 0, marginTop: 1 }} />
                  <p className="text-xs leading-relaxed" style={{ color: '#fde68a' }}>
                    You're under 16. A parent or guardian should review our{' '}
                    <span style={{ color: '#f39c12', textDecoration: 'underline' }}>Privacy Policy</span>{' '}
                    before you continue. By ticking the box below, you confirm a parent or guardian has agreed to you using NeuroPhysics.
                  </p>
                </div>
                <button
                  className="w-full flex items-start gap-3 rounded-[10px] px-3 py-3 text-left"
                  style={{
                    background: parentalConsent ? 'rgba(243,156,18,0.12)' : 'rgba(255,255,255,0.03)',
                    border: parentalConsent ? '1px solid rgba(243,156,18,0.5)' : '0.75px solid rgba(243,156,18,0.2)',
                    transition: 'all 0.2s',
                  }}
                  onClick={() => setParentalConsent(p => !p)}
                >
                  <div
                    className="w-6 h-6 rounded-[6px] shrink-0 flex items-center justify-center mt-0.5"
                    style={{
                      background: parentalConsent ? '#f39c12' : 'rgba(255,255,255,0.07)',
                      border: parentalConsent ? 'none' : '0.75px solid rgba(243,156,18,0.4)',
                      transition: 'all 0.2s',
                    }}
                  >
                    {parentalConsent && <Check size={14} color="#fff" />}
                  </div>
                  <p className="text-xs font-semibold leading-relaxed" style={{ color: parentalConsent ? '#fde68a' : '#a8b8cc' }}>
                    My parent or guardian has agreed to me using this app
                  </p>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Checkboxes */}
        <motion.div
          className="space-y-3"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.4 }}
        >
          {/* Age confirmation — only shown if old enough */}
          <AnimatePresence>
            {isOldEnough && (
              <motion.button
                className="w-full flex items-start gap-3 rounded-[14px] px-4 py-4 text-left"
                style={{
                  background: ageConfirmed ? 'rgba(99,102,241,0.1)' : 'rgba(18,26,47,0.9)',
                  border: ageConfirmed ? '1px solid rgba(99,102,241,0.5)' : '0.75px solid #1d293d',
                  transition: 'all 0.2s',
                }}
                onClick={() => setAgeConfirmed(p => !p)}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
              >
                <div
                  className="w-6 h-6 rounded-[6px] shrink-0 flex items-center justify-center mt-0.5"
                  style={{
                    background: ageConfirmed ? '#6366f1' : 'rgba(255,255,255,0.07)',
                    border: ageConfirmed ? 'none' : '0.75px solid #2d3e55',
                    transition: 'all 0.2s',
                  }}
                >
                  {ageConfirmed && <Check size={14} color="#fff" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold" style={{ color: ageConfirmed ? '#818cf8' : '#f8fafc' }}>
                    I confirm I am {age} years old
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: '#a8b8cc' }}>
                    {age < 16
                      ? 'As you are under 16, a parent or guardian should confirm this on your behalf.'
                      : 'I understand how my data is used and my rights under UK GDPR.'}
                  </p>
                </div>
              </motion.button>
            )}
          </AnimatePresence>

          {/* Terms + Privacy confirmation */}
          <button
            className="w-full flex items-start gap-3 rounded-[14px] px-4 py-4 text-left"
            style={{
              background: termsRead ? 'rgba(99,102,241,0.1)' : 'rgba(18,26,47,0.9)',
              border: termsRead ? '1px solid rgba(99,102,241,0.5)' : '0.75px solid #1d293d',
              transition: 'all 0.2s',
            }}
            onClick={() => setTermsRead(p => !p)}
          >
            <div
              className="w-6 h-6 rounded-[6px] shrink-0 flex items-center justify-center mt-0.5"
              style={{
                background: termsRead ? '#6366f1' : 'rgba(255,255,255,0.07)',
                border: termsRead ? 'none' : '0.75px solid #2d3e55',
                transition: 'all 0.2s',
              }}
            >
              {termsRead && <Check size={14} color="#fff" />}
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold" style={{ color: termsRead ? '#818cf8' : '#f8fafc' }}>
                I agree to the Terms and Privacy Policy
              </p>
              <p className="text-xs mt-0.5" style={{ color: '#a8b8cc' }}>
                I understand how my data is used and my rights under UK law.
              </p>
            </div>
          </button>
        </motion.div>

        {/* Links to full documents */}
        <motion.div
          className="flex items-center justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.4 }}
        >
          <button
            className="text-xs underline"
            style={{ color: '#6366f1' }}
            onClick={() => navigate('/privacy')}
          >
            Privacy Policy
          </button>
          <span style={{ color: '#2d3e55' }}>·</span>
          <button
            className="text-xs underline"
            style={{ color: '#6366f1' }}
            onClick={() => navigate('/terms')}
          >
            Terms of Service
          </button>
        </motion.div>

        {/* Continue button */}
        <motion.button
          onClick={handleContinue}
          disabled={!canContinue}
          className="w-full py-4 rounded-[16px] font-bold text-base flex items-center justify-center gap-2"
          style={{
            background: canContinue
              ? '#6366f1'
              : 'rgba(255,255,255,0.05)',
            color: canContinue ? '#fff' : '#3a4a5a',
            boxShadow: canContinue ? '0 8px 24px rgba(99,102,241,0.35)' : 'none',
            cursor: canContinue ? 'pointer' : 'not-allowed',
            transition: 'all 0.25s',
          }}
          whileTap={canContinue ? { scale: 0.97 } : {}}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          Get Started
          <CaretRight size={18} />
        </motion.button>

      </div>
    </div>
  )
}
