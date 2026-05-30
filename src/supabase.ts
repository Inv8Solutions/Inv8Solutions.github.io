import { createClient } from '@supabase/supabase-js'

// Resolve env vars with precedence: first `process.env` (CI / server), then `import.meta.env` (Vite), then fallback
const nodeUrl = typeof process !== 'undefined' && process.env && process.env.VITE_SUPABASE_URL ? String(process.env.VITE_SUPABASE_URL) : ''
const nodeAnon = typeof process !== 'undefined' && process.env && process.env.VITE_SUPABASE_ANON_KEY ? String(process.env.VITE_SUPABASE_ANON_KEY) : ''
const viteUrl = (import.meta.env.VITE_SUPABASE_URL as string) || ''
const viteAnon = (import.meta.env.VITE_SUPABASE_ANON_KEY as string) || ''

const supabaseUrl = nodeUrl || viteUrl || ''
const supabaseAnonKey = nodeAnon || viteAnon || ''

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    '[supabase] Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY.\n' +
    'Set them in your CI (GitHub Actions) or in .env.local at project root.'
  )
}

// Debug: show which source provided the values (mask key)
try {
  const maskedKey = supabaseAnonKey && supabaseAnonKey.length > 12
    ? `${supabaseAnonKey.slice(0,8)}...${supabaseAnonKey.slice(-4)}`
    : supabaseAnonKey || ''
  const source = nodeAnon ? 'process.env (CI/server)' : (viteAnon ? 'import.meta.env (.env.local or Vite)' : 'none')

} catch (e) {
  /* ignore logging errors in environments where import.meta.env isn't available */
}

// Fallback to placeholder strings so createClient does not throw on missing env vars;
// all requests will fail gracefully instead of crashing the app at import time.
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
)


