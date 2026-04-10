import { createContext, useContext, useState, useEffect } from 'react'
import { supabase, supabaseConfigured } from '../lib/supabase'
import { Capacitor } from '@capacitor/core'
import { Browser } from '@capacitor/browser'
import { App as CapApp } from '@capacitor/app'
import { SignInWithApple } from '@capacitor-community/apple-sign-in'

const AuthContext = createContext(null)

const isNative = Capacitor.isNativePlatform()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Supabase not configured yet — skip straight to auth screen
    if (!supabaseConfigured || !supabase) {
      setLoading(false)
      return
    }

    // PKCE flow: if ?code= is in the URL after OAuth redirect (web only),
    // explicitly exchange it for a session before doing anything else.
    const params = new URLSearchParams(window.location.search)
    const code = params.get('code')

    const handleOAuthCode = async (oauthCode) => {
      try {
        const { data, error } = await supabase.auth.exchangeCodeForSession(oauthCode)
        if (!error && data?.session) {
          setUser(data.session.user)
        }
      } catch (e) {
        console.error('OAuth code exchange error:', e)
      } finally {
        setLoading(false)
      }
    }

    const init = async () => {
      try {
        // Web: check for ?code= in URL
        if (code) {
          window.history.replaceState({}, '', window.location.pathname + window.location.hash)
          await handleOAuthCode(code)
          return
        }

        // Native: check if app was launched via deep link (cold start)
        if (isNative) {
          const { url } = await CapApp.getLaunchUrl() ?? {}
          if (url) {
            const parsed = new URL(url)
            const launchCode = parsed.searchParams.get('code')
            if (launchCode) {
              await handleOAuthCode(launchCode)
              Browser.close().catch(() => {})
              return
            }
          }
        }

        const { data: { session } } = await supabase.auth.getSession()
        setUser(session?.user ?? null)
      } catch (e) {
        console.error('Auth init error:', e)
      } finally {
        setLoading(false)
      }
    }

    init()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)

      // On every sign-in, sync the display name from OAuth metadata into the
      // local profile so HomeScreen always has a name even if the profile was
      // previously cleared.
      if (session?.user && _event === 'SIGNED_IN') {
        try {
          const profile = JSON.parse(localStorage.getItem('neurophysics_profile') || '{}')
          if (!profile.name) {
            const meta = session.user.user_metadata || {}
            const rawName = meta.full_name || meta.name || session.user.email?.split('@')[0]
            if (rawName) {
              localStorage.setItem('neurophysics_profile', JSON.stringify({
                ...profile,
                name: rawName.split(' ')[0], // first name only
                avatar: profile.avatar || '🧠',
              }))
            }
          }
        } catch { /* non-critical */ }
      }
    })

    // Native: listen for deep link callback from OAuth
    let appUrlListener
    if (isNative) {
      appUrlListener = CapApp.addListener('appUrlOpen', async ({ url }) => {
        // URL looks like: com.mamo.neurophysics://callback?code=xxx
        const parsed = new URL(url)
        const oauthCode = parsed.searchParams.get('code')
        if (oauthCode) {
          await handleOAuthCode(oauthCode)
          Browser.close().catch(() => {})
        }
      })
    }

    return () => {
      subscription.unsubscribe()
      if (appUrlListener) appUrlListener.then(l => l.remove())
    }
  }, [])

  const signUp = async ({ email, password, name }) => {
    if (!supabase) return { error: { message: 'Supabase not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.' } }
    return supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name } },
    })
  }

  const signIn = async ({ email, password }) => {
    if (!supabase) return { error: { message: 'Supabase not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.' } }
    return supabase.auth.signInWithPassword({ email, password })
  }

  const signOut = async () => {
    // Clear user state immediately — AppShell redirects on setUser(null)
    setUser(null)
    if (supabase) {
      // Race against a 3 s timeout so a slow/offline network never blocks the UI
      const timeout = new Promise(resolve => setTimeout(resolve, 3000))
      await Promise.race([supabase.auth.signOut().catch(console.error), timeout])
    }
  }

  const signInWithOAuth = async (provider) => {
    if (!supabase) return { error: { message: 'Supabase not configured.' } }

    // Native Apple Sign In — use the native framework (biometric popup, no browser)
    if (isNative && provider === 'apple') {
      try {
        const result = await SignInWithApple.authorize({
          clientId: 'com.mamo.neurophysics',
          redirectURI: 'https://zqaibksrvpzeqtqpjwgf.supabase.co/auth/v1/callback',
          scopes: 'email name',
        })
        const { identityToken, givenName, familyName } = result.response
        if (!identityToken) return { error: { message: 'No identity token from Apple' } }

        const { data, error } = await supabase.auth.signInWithIdToken({
          provider: 'apple',
          token: identityToken,
          options: {
            data: {
              full_name: [givenName, familyName].filter(Boolean).join(' ') || undefined,
            },
          },
        })
        return { data, error }
      } catch (e) {
        // User cancelled or error
        return { error: { message: e?.message || 'Apple Sign In cancelled' } }
      }
    }

    if (isNative) {
      // Native Google (and any future providers): open OAuth in system browser
      const redirectTo = 'com.mamo.neurophysics://callback'
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: { redirectTo, skipBrowserRedirect: true },
      })
      if (error) return { error }
      if (data?.url) {
        await Browser.open({ url: data.url, presentationStyle: 'popover' })
      }
      return { error: null }
    }

    // Web: normal redirect flow
    return supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: window.location.origin },
    })
  }

  const resetPassword = async (email) => {
    if (!supabase) return { error: { message: 'Supabase not configured.' } }
    return supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/#/reset-password`,
    })
  }

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signOut, signInWithOAuth, resetPassword, supabaseConfigured }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
