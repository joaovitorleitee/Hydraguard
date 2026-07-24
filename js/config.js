// ============================================================
// Configuração do Supabase
// ============================================================
// A "anon key" do Supabase é feita para ser pública (o navegador
// do paciente precisa dela para falar com o banco) — a segurança
// de verdade vem das políticas de RLS que estão no sql/schema.sql.
// Mesmo assim, NUNCA coloque aqui a "service_role key".
//
// Onde encontrar: Supabase → seu projeto → Project Settings → API
// ============================================================
export const SUPABASE_URL = 'COLE_AQUI_A_URL_DO_SEU_PROJETO_SUPABASE';
export const SUPABASE_ANON_KEY = 'COLE_AQUI_A_ANON_KEY_DO_SEU_PROJETO_SUPABASE';
