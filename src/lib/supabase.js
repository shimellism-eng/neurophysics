import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

// If env vars are missing at runtime, the client still exists but calls will fail gracefully
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
