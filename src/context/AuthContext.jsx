import { createContext, useContext, useState, useEffect } from 'react'
import { supabase, supabaseConfigured } from '../lib/supabase'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Supabase not configured yet — skip straight to auth screen
    if (!supabaseConfigured || !supabase) {
      setLoading(false)
      return
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    }).catch(() => setLoading(false))

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
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
    if (!supabase) return
    await supabase.auth.signOut()
  }

  const signInWithOAuth = async (provider) => {
    if (!supabase) return { error: { message: 'Supabase not configured.' } }
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
