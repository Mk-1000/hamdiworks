import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY ?? '';

// Singleton so HMR doesn't create multiple clients and abort the previous auth init (AbortError)
const globalKey = '__supabase_client_' + (supabaseUrl || 'placeholder');
const cached = (globalThis as unknown as Record<string, SupabaseClient | undefined>)[globalKey];
let supabase: SupabaseClient;
if (cached) {
  supabase = cached;
} else {
  supabase = createClient(
    supabaseUrl || 'https://placeholder.supabase.co',
    supabaseAnonKey || 'placeholder-key'
  );
  (globalThis as unknown as Record<string, SupabaseClient>)[globalKey] = supabase;
}
export { supabase };
