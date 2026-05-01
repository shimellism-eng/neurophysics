/**
 * ConsentScreen — shown once on first launch.
 * UK GDPR / ICO Children's Code compliant age gate + data consent.
 * Sets neurophysics_consent in localStorage on acceptance.
 */
import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Shield, Check, CaretRight, Warning } from '@phosphor-icons/react'
import { useAuth } from '../context/AuthContext'

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
  const [searchParams] = useSearchParams()
  const { continueAsGuest } = useAuth()
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
    const nextMode = searchParams.get('next')
    try {
      localStorage.setItem('neurophysics_consent', JSON.stringify({
        ts: Date.now(),
        version: '2026-04',
        ageVerified: age,
      }))
    } catch {}
    if (nextMode === 'guest') {
      continueAsGuest()
      const onboarded = !!localStorage.getItem('neurophysics_onboarded')
      navigate(onboarded ? '/' : '/onboarding', { replace: true })
      return
    }
    navigate('/auth', { replace: true })
  }

  return (
    <div
      className="flex flex-col h-full overflow-hidden np-shell-gradient"
      style={{ paddingTop: 'var(--safe-top)' }}
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
            style={{ background: 'var(--np-accent-soft)', border: '1.5px solid rgba(116,188,181,0.32)' }}>
            <Shield size={30} color="var(--np-accent-strong)" />
          </div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--np-text)', letterSpacing: '-0.02em' }}>
            Before you start
          </h1>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--np-text-muted)', maxWidth: 300 }}>
            NeuroPhysics is a GCSE revision app for students aged 13+. Please take a moment to confirm the following.
          </p>
        </motion.div>

        {/* What we collect — plain English summary */}
        <motion.div
          className="rounded-[18px] px-4 py-4 space-y-3"
          style={{ background: 'var(--surface-panel)', border: 'var(--border-quiet)' }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          <p className="text-xs font-bold uppercase tracking-wide" style={{ color: 'var(--np-text-dim)' }}>What we use your data for</p>
          {[
            { icon: '1', label: 'Your email address', detail: 'Used only if you create an account.' },
            { icon: '2', label: 'Your study settings', detail: 'Saved on your device and may sync when you sign in.' },
            { icon: '3', label: 'AI chat and marking', detail: 'Sent to Google to generate responses. Recent Mamo threads may stay on your device.' },
          ].map(item => (
            <div key={item.label} className="flex items-start gap-3">
              <span style={{ fontSize: 13, lineHeight: 1.4, color: 'var(--np-accent-strong)', fontWeight: 700, width: 16 }}>{item.icon}</span>
              <div>
                <p className="text-sm font-semibold" style={{ color: 'var(--np-text)' }}>{item.label}</p>
                <p className="text-xs" style={{ color: 'var(--np-text-muted)' }}>{item.detail}</p>
              </div>
            </div>
          ))}
          <p className="text-xs pt-1" style={{ color: 'var(--np-text-dim)' }}>
            We never sell your data or use it for advertising.
          </p>
        </motion.div>

        {/* Age verification */}
        <motion.div
          className="rounded-[18px] px-4 py-4"
          style={{ background: 'var(--surface-panel)', border: 'var(--border-quiet)' }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
        >
          <p className="text-xs font-bold uppercase tracking-wide mb-3" style={{ color: 'var(--np-text-dim)' }}>Your date of birth</p>
          <div className="flex gap-3">
            <select
              value={birthMonth}
              onChange={e => setBirthMonth(e.target.value)}
              className="flex-1 rounded-[10px] px-3 py-2.5 text-sm font-semibold"
              style={{
                background: 'var(--surface-quiet)',
                border: 'var(--border-quiet)',
                color: birthMonth ? 'var(--np-text)' : 'var(--np-text-dim)',
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
                background: 'var(--surface-quiet)',
                border: 'var(--border-quiet)',
                color: 'var(--np-text)',
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
                style={{ background: 'var(--np-warning-soft)', border: '1px solid rgba(216,139,45,0.28)' }}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <div className="flex items-start gap-2">
                  <Warning size={14} color="var(--np-amber)" style={{ flexShrink: 0, marginTop: 1 }} />
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--np-text-mid)' }}>
                    You're under 16. A parent or guardian should review our{' '}
                    <span style={{ color: 'var(--np-amber)', textDecoration: 'underline' }}>Privacy policy</span>{' '}
                    before you continue. By ticking the box below, you confirm a parent or guardian has agreed to you using NeuroPhysics.
                  </p>
                </div>
                <button
                  className="w-full flex items-start gap-3 rounded-[10px] px-3 py-3 text-left"
                  style={{
                      background: parentalConsent ? 'rgba(216,139,45,0.12)' : 'rgba(255,255,255,0.03)',
                      border: parentalConsent ? '1px solid rgba(216,139,45,0.42)' : '0.75px solid rgba(216,139,45,0.2)',
                    transition: 'all 0.2s',
                  }}
                  onClick={() => setParentalConsent(p => !p)}
                >
                  <div
                    className="w-6 h-6 rounded-[6px] shrink-0 flex items-center justify-center mt-0.5"
                    style={{
                      background: parentalConsent ? 'var(--np-amber)' : 'rgba(255,255,255,0.07)',
                      border: parentalConsent ? 'none' : '0.75px solid rgba(216,139,45,0.32)',
                      transition: 'all 0.2s',
                    }}
                  >
                    {parentalConsent && <Check size={14} color="#fff" />}
                  </div>
                  <p className="text-xs font-semibold leading-relaxed" style={{ color: parentalConsent ? 'var(--np-text)' : 'var(--np-text-muted)' }}>
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
                  background: ageConfirmed ? 'var(--np-accent-soft)' : 'var(--surface-panel)',
                  border: ageConfirmed ? '1px solid rgba(116,188,181,0.4)' : 'var(--border-quiet)',
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
                    background: ageConfirmed ? 'var(--np-accent)' : 'rgba(255,255,255,0.07)',
                    border: ageConfirmed ? 'none' : 'var(--border-quiet)',
                    transition: 'all 0.2s',
                  }}
                >
                  {ageConfirmed && <Check size={14} color="#fff" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold" style={{ color: ageConfirmed ? 'var(--np-accent-strong)' : 'var(--np-text)' }}>
                    I confirm I am {age} years old
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--np-text-muted)' }}>
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
              background: termsRead ? 'var(--np-accent-soft)' : 'var(--surface-panel)',
              border: termsRead ? '1px solid rgba(116,188,181,0.4)' : 'var(--border-quiet)',
              transition: 'all 0.2s',
            }}
            onClick={() => setTermsRead(p => !p)}
          >
            <div
              className="w-6 h-6 rounded-[6px] shrink-0 flex items-center justify-center mt-0.5"
              style={{
                background: termsRead ? 'var(--np-accent)' : 'rgba(255,255,255,0.07)',
                border: termsRead ? 'none' : 'var(--border-quiet)',
                transition: 'all 0.2s',
              }}
            >
              {termsRead && <Check size={14} color="#fff" />}
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold" style={{ color: termsRead ? 'var(--np-accent-strong)' : 'var(--np-text)' }}>
                I agree to the terms of service and privacy policy
              </p>
              <p className="text-xs mt-0.5" style={{ color: 'var(--np-text-muted)' }}>
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
            style={{ color: 'var(--np-accent-strong)' }}
            onClick={() => navigate('/privacy')}
          >
            Privacy policy
          </button>
          <span style={{ color: 'var(--np-text-dim)' }}>·</span>
          <button
            className="text-xs underline"
            style={{ color: 'var(--np-accent-strong)' }}
            onClick={() => navigate('/terms')}
          >
            Terms of service
          </button>
        </motion.div>

        {searchParams.get('next') === 'guest' && (
          <motion.div
            className="rounded-[14px] px-4 py-3"
            style={{ background: 'var(--np-accent-soft)', border: '0.75px solid rgba(116,188,181,0.22)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.28, duration: 0.4 }}
          >
            <p className="text-xs leading-relaxed" style={{ color: 'var(--np-text-muted)' }}>
              Guest mode lets you explore lessons and study tools first. Some features, including Mamo and cross-device syncing, need a free account.
            </p>
          </motion.div>
        )}

        {/* Continue button */}
        <motion.button
          onClick={handleContinue}
          disabled={!canContinue}
          className="w-full py-4 rounded-[16px] font-bold text-base flex items-center justify-center gap-2"
          style={{
            background: canContinue
              ? 'var(--np-accent)'
              : 'rgba(255,255,255,0.05)',
            color: canContinue ? '#07111d' : 'var(--np-text-dim)',
            boxShadow: canContinue ? 'var(--shadow-raised)' : 'none',
            cursor: canContinue ? 'pointer' : 'not-allowed',
            transition: 'all 0.25s',
          }}
          whileTap={canContinue ? { scale: 0.97 } : {}}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          Continue
          <CaretRight size={18} />
        </motion.button>

      </div>
    </div>
  )
}
