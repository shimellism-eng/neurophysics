import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import * as Sentry from '@sentry/react'
import './index.css'
import App from './App.jsx'

// Error monitoring — silently no-ops if VITE_SENTRY_DSN is not set.
// To activate: add VITE_SENTRY_DSN to your .env.local and Vercel env vars.
// Create a free DSN at https://sentry.io (React project, free tier = 5K errors/month).
if (import.meta.env.VITE_SENTRY_DSN) {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    integrations: [Sentry.browserTracingIntegration()],
    tracesSampleRate: 0.05,          // 5% of sessions — keeps free tier budget
    environment: import.meta.env.MODE,
    // ICO Children's Code: never send PII in error payloads
    beforeSend(event) {
      // Strip any user email / id before sending
      if (event.user) {
        delete event.user.email
        delete event.user.username
      }
      return event
    },
  })
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
