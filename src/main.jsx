import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import * as Sentry from '@sentry/react'
import './index.css'
import App from './App.jsx'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, info) {
    console.error('App crash:', error, info);
    try { Sentry.captureException(error, { extra: info }) } catch {}
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100dvh',
          background: '#080f1e',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '32px',
          fontFamily: 'Bricolage Grotesque, sans-serif',
          color: '#f8fafc',
          textAlign: 'center',
          gap: '16px'
        }}>
          <div style={{ fontSize: '48px' }}>⚡</div>
          <h2 style={{ fontSize: '20px', fontWeight: 700, margin: 0 }}>Something went wrong</h2>
          <p style={{ fontSize: '14px', color: '#94a3b8', margin: 0 }}>
            Don't worry — your progress is saved. Try refreshing the page.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: '8px',
              padding: '12px 24px',
              background: '#5ea7a1',
              color: '#07111d',
              border: 'none',
              borderRadius: '12px',
              fontSize: '14px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            Refresh
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// Error monitoring — silently no-ops if VITE_SENTRY_DSN is not set.
// To activate: add VITE_SENTRY_DSN to your .env.local and Vercel env vars.
// Create a free DSN at https://sentry.io (React project, free tier = 5K errors/month).
if (import.meta.env.VITE_SENTRY_DSN) {
  try {
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
  } catch (e) {
    console.warn('Sentry init failed:', e)
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
