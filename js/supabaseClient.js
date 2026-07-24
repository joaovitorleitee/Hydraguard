// Carrega o SDK do Supabase direto do CDN (esm.sh) — não precisa de
// npm install nem de bundler, então o Vercel serve isso como site estático.
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from './config.js';

export const supabaseConfigured =
  SUPABASE_URL && !SUPABASE_URL.startsWith('COLE_AQUI') &&
  SUPABASE_ANON_KEY && !SUPABASE_ANON_KEY.startsWith('COLE_AQUI');

export const supabase = supabaseConfigured
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: { persistSession: true, autoRefreshToken: true },
    })
  : null;
