/**
 * tts.js - Natural text-to-speech utility
 *
 * Picks the best available voice (prefers enhanced/premium voices),
 * preprocesses physics text so it reads naturally, and exposes a
 * single `speak(text)` function used across the app.
 */

// Voices to try in priority order (name substring match, case-insensitive)
const PREFERRED_VOICES = [
  // iOS / macOS enhanced voices (most natural)
  'Samantha (Enhanced)',
  'Samantha',
  'Daniel (Enhanced)',
  'Daniel',
  'Karen (Enhanced)',
  'Karen',
  // Android / Chrome
  'Google UK English Female',
  'Google US English',
  // Windows
  'Microsoft Zira',
  'Microsoft Mark',
]

let _voice = null

function pickVoice() {
  if (_voice) return _voice
  const voices = window.speechSynthesis.getVoices()
  if (!voices.length) return null

  for (const preferred of PREFERRED_VOICES) {
    const match = voices.find(v =>
      v.name.toLowerCase().includes(preferred.toLowerCase())
    )
    if (match) { _voice = match; return match }
  }

  // Fallback: first English voice, preferring localService (on-device = better quality)
  const enVoices = voices.filter(v => v.lang.startsWith('en'))
  const local = enVoices.find(v => v.localService)
  _voice = local || enVoices[0] || voices[0]
  return _voice
}

// Reset cached voice when voices list changes (browser fires this event)
if (typeof window !== 'undefined') {
  window.speechSynthesis.onvoiceschanged = () => { _voice = null }
}

/**
 * Preprocess physics text so the synthesiser reads it naturally.
 */
function preprocess(text) {
  return text
    // Remove markdown-style bold/italic
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/\*(.+?)\*/g, '$1')
    // Expand common physics abbreviations
    .replace(/\bm\/s\b/gi, 'metres per second')
    .replace(/\bm\/s²\b/gi, 'metres per second squared')
    .replace(/\bkg\b/gi, 'kilograms')
    .replace(/\bkm\/h\b/gi, 'kilometres per hour')
    .replace(/\bJ\b/g, 'joules')
    .replace(/\bkJ\b/g, 'kilojoules')
    .replace(/\bW\b/g, 'watts')
    .replace(/\bkW\b/g, 'kilowatts')
    .replace(/\bN\b/g, 'newtons')
    .replace(/\bPa\b/g, 'pascals')
    .replace(/\bHz\b/gi, 'hertz')
    .replace(/\bkHz\b/gi, 'kilohertz')
    .replace(/\bA\b/g, 'amps')
    .replace(/\bV\b/g, 'volts')
    .replace(/\bΩ\b/g, 'ohms')
    .replace(/\bΔ/g, 'change in ')
    .replace(/\b°C\b/g, 'degrees Celsius')
    .replace(/\b°F\b/g, 'degrees Fahrenheit')
    // Superscripts / exponents
    .replace(/²/g, ' squared')
    .replace(/³/g, ' cubed')
    .replace(/\^2\b/g, ' squared')
    .replace(/\^3\b/g, ' cubed')
    // Fractions / division
    .replace(/\//g, ' divided by ')
    // Remove leftover symbols that read badly
    .replace(/[×]/g, ' times ')
    .replace(/[÷]/g, ' divided by ')
    .replace(/[≈]/g, ' approximately ')
    .replace(/[≠]/g, ' not equal to ')
    .replace(/[≤]/g, ' less than or equal to ')
    .replace(/[≥]/g, ' greater than or equal to ')
    // Strip any remaining special chars that aren't letters/numbers/punctuation
    .replace(/[★☆▸▶→←↑↓]/g, '')
    // Collapse multiple spaces
    .replace(/\s{2,}/g, ' ')
    .trim()
}

/**
 * Speak text aloud. Safe to call even if TTS not supported.
 * @param {string} text
 */
export function speak(text) {
  if (!('speechSynthesis' in window)) return
  window.speechSynthesis.cancel()

  const utt = new SpeechSynthesisUtterance(preprocess(text))

  const voice = pickVoice()
  if (voice) utt.voice = voice

  utt.rate   = 0.92   // slightly slower than natural for clarity
  utt.pitch  = 1.0    // neutral pitch (avoid robotic high/low extremes)
  utt.volume = 1.0

  window.speechSynthesis.speak(utt)
}

/**
 * Stop any currently playing speech.
 */
export function stopSpeech() {
  if ('speechSynthesis' in window) window.speechSynthesis.cancel()
}
