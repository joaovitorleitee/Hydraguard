-- ============================================================
-- HydraGuard — Schema Supabase (versão Web)
-- ============================================================
-- Se você já tem o projeto Supabase usado no app mobile (com as
-- tabelas pacientes / medicamentos / hidratacao / agenda), rode
-- SOMENTE a seção "4. CUIDADORES" no final deste arquivo.
--
-- Se estiver começando um projeto Supabase do zero para a versão
-- web, rode o arquivo inteiro.
-- ============================================================

-- 1. PACIENTES ---------------------------------------------------
create table if not exists pacientes (
  id uuid primary key references auth.users(id) on delete cascade,
  nome text not null,
  email text not null,
  meta_hidratacao_ml integer not null default 2000,
  modo_simples boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table pacientes enable row level security;

create policy "Paciente vê e edita o próprio perfil"
  on pacientes for all
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- 2. HIDRATAÇÃO ---------------------------------------------------
create table if not exists hidratacao (
  id uuid primary key default gen_random_uuid(),
  paciente_id uuid not null references pacientes(id) on delete cascade,
  ml integer not null check (ml > 0),
  registrado_em timestamptz not null default now()
);

alter table hidratacao enable row level security;

create policy "Paciente acessa só os próprios registros de hidratação"
  on hidratacao for all
  using (auth.uid() = paciente_id)
  with check (auth.uid() = paciente_id);

create index if not exists idx_hidratacao_paciente_data
  on hidratacao (paciente_id, registrado_em desc);

-- 3. MEDICAMENTOS ---------------------------------------------------
create table if not exists medicamentos (
  id uuid primary key default gen_random_uuid(),
  paciente_id uuid not null references pacientes(id) on delete cascade,
  nome text not null,
  dose text not null,
  horario time not null,
  tomado_hoje boolean not null default false,
  ultima_atualizacao date not null default current_date,
  created_at timestamptz not null default now()
);

alter table medicamentos enable row level security;

create policy "Paciente acessa só os próprios medicamentos"
  on medicamentos for all
  using (auth.uid() = paciente_id)
  with check (auth.uid() = paciente_id);

-- 4. AGENDA ---------------------------------------------------
create table if not exists agenda (
  id uuid primary key default gen_random_uuid(),
  paciente_id uuid not null references pacientes(id) on delete cascade,
  titulo text not null,
  data date not null,
  horario time not null,
  tipo text not null default 'consulta' check (tipo in ('sessao','consulta','exame')),
  created_at timestamptz not null default now()
);

alter table agenda enable row level security;

create policy "Paciente acessa só a própria agenda"
  on agenda for all
  using (auth.uid() = paciente_id)
  with check (auth.uid() = paciente_id);

-- ============================================================
-- 5. CUIDADORES  (Épico 10 — novo nesta versão)
-- ============================================================
create table if not exists cuidadores (
  id uuid primary key default gen_random_uuid(),
  paciente_id uuid not null references pacientes(id) on delete cascade,
  nome text not null,
  email text not null,
  parentesco text not null default 'Outro familiar',
  status text not null default 'pendente' check (status in ('pendente','ativo')),
  alerta_hidratacao boolean not null default true,
  alerta_medicamentos boolean not null default true,
  alerta_agenda boolean not null default false,
  cuidador_user_id uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  unique (paciente_id, email)
);

alter table cuidadores enable row level security;

-- O paciente gerencia (cria/edita/remove) seus próprios cuidadores
create policy "Paciente gerencia seus cuidadores"
  on cuidadores for all
  using (auth.uid() = paciente_id)
  with check (auth.uid() = paciente_id);

-- Quando o cuidador aceitar o convite e tiver login próprio (cuidador_user_id
-- preenchido), ele passa a enxergar (somente leitura) os indicadores do paciente.
-- Isso habilita a "Visualização remota" (US30) com um segundo tipo de usuário.
create policy "Cuidador vinculado lê indicadores do paciente"
  on hidratacao for select
  using (
    exists (
      select 1 from cuidadores c
      where c.paciente_id = hidratacao.paciente_id
        and c.cuidador_user_id = auth.uid()
        and c.status = 'ativo'
    )
  );

create policy "Cuidador vinculado lê medicamentos do paciente"
  on medicamentos for select
  using (
    exists (
      select 1 from cuidadores c
      where c.paciente_id = medicamentos.paciente_id
        and c.cuidador_user_id = auth.uid()
        and c.status = 'ativo'
    )
  );

create policy "Cuidador vinculado lê a agenda do paciente"
  on agenda for select
  using (
    exists (
      select 1 from cuidadores c
      where c.paciente_id = agenda.paciente_id
        and c.cuidador_user_id = auth.uid()
        and c.status = 'ativo'
    )
  );

-- ============================================================
-- Observações importantes / pendências antes de ir para produção:
-- ============================================================
-- 1. Os ALERTAS (US31) descritos aqui (alerta_hidratacao, alerta_medicamentos,
--    alerta_agenda) só guardam a PREFERÊNCIA. O disparo em si (checar adesão
--    e mandar e-mail/push pro cuidador) precisa de um job agendado — dá pra
--    fazer com uma Supabase Edge Function + pg_cron rodando 1x/dia.
-- 2. O convite por e-mail (status 'pendente' -> 'ativo') também depende de
--    uma Edge Function (ou serviço de e-mail tipo Resend) que dispare o link
--    de convite e, quando aceito, atualize cuidador_user_id + status.
-- 3. Enquanto essas duas peças não existem, o cadastro de cuidador funciona
--    (US29) e a "visão do cuidador" pode ser demonstrada no próprio app do
--    paciente (como fizemos no protótipo), mas o cuidador ainda não tem
--    login e alerta de verdade funcionando ponta a ponta.
