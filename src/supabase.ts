import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    '[supabase] Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY.\n' +
    'Add them as GitHub repository secrets (Settings → Secrets → Actions).'
  )
}

// Debug: show whether Vite loaded the vars (masked key for safety)
try {
  const maskedKey = supabaseAnonKey && supabaseAnonKey.length > 12
    ? `${supabaseAnonKey.slice(0,8)}...${supabaseAnonKey.slice(-4)}`
    : supabaseAnonKey || ''
  console.log('[supabase] VITE_SUPABASE_URL=', supabaseUrl)
  console.log('[supabase] VITE_SUPABASE_ANON_KEY present=', !!supabaseAnonKey, 'sample=', maskedKey)
} catch (e) {
  /* ignore logging errors in environments where import.meta.env isn't available */
}

// Fallback to placeholder strings so createClient does not throw on missing env vars;
// all requests will fail gracefully instead of crashing the app at import time.
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
)


