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
export const SUPABASE_URL = 'https://eisfjjhrfactbkjtagte.supabase.co';
export const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVpc2ZqamhyZmFjdGJranRhZ3RlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQyODUwNDYsImV4cCI6MjA5OTg2MTA0Nn0.t7gu5ipV4QHpq4Ufhn1bFUiruAmDeRgIk_husd0OBiw';
