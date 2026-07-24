# HydraGuard — Web

Versão web (navegador, desktop e celular) do HydraGuard. Site estático em
HTML/CSS/JS puro (sem build, sem framework) conectado ao Supabase — pensado
para ser barato de manter: GitHub (grátis) + Vercel (grátis) + Supabase
(grátis no plano free).

## Estrutura do projeto

```
hydraguard-web/
├── index.html          ← página única do app
├── css/styles.css       ← todo o visual (mesmo design do protótipo aprovado)
├── js/
│   ├── config.js         ← ⚠️ COLOQUE aqui a URL e a anon key do seu Supabase
│   ├── supabaseClient.js ← cria o cliente Supabase (via CDN, sem npm install)
│   ├── offlineQueue.js   ← fila local (localStorage) para quando cair a internet
│   ├── api.js            ← toda a comunicação com o Supabase (auth + CRUD)
│   └── app.js            ← toda a interface (telas, navegação, modo simples...)
├── sql/schema.sql        ← script para criar as tabelas no Supabase
└── vercel.json
```

---

## 1. Configurar o Supabase

**Se vocês já têm o projeto Supabase usado no app mobile** (com as tabelas
`pacientes`, `medicamentos`, `hidratacao`, `agenda`): abram o **SQL Editor**
do projeto e rodem só a seção **"5. CUIDADORES"** do arquivo
`sql/schema.sql` (é a parte nova desta versão).

**Se for um projeto novo**: criem um projeto em https://supabase.com,
abram o **SQL Editor** e rodem o arquivo `sql/schema.sql` inteiro.

Depois, peguem as credenciais em **Project Settings → API**:
- `Project URL`
- `anon public key`

Abram `js/config.js` e colem os dois valores:

```js
export const SUPABASE_URL = 'https://xxxxxxxx.supabase.co';
export const SUPABASE_ANON_KEY = 'eyJhbGciOi...';
```

> A `anon key` é pública por design (o navegador do paciente precisa dela) —
> quem protege os dados são as políticas de RLS que já estão no
> `schema.sql`. **Nunca** coloquem a `service_role key` aqui.

Por padrão o Supabase pede confirmação por e-mail no cadastro. Para testar
mais rápido, em **Authentication → Providers → Email**, podem desligar
"Confirm email" temporariamente.

---

## 2. Testar localmente (opcional, mas recomendado)

Não precisa de `npm install` — é só servir os arquivos estáticos:

```bash
npx serve . -l 3000
# ou: python3 -m http.server 3000
```

Abram http://localhost:3000, criem uma conta e testem hidratação,
medicamentos, agenda, cuidadores e modo simples.

---

## 3. Subir para o GitHub

Se estiverem usando o zip que geramos:
1. Criem um repositório novo no GitHub (pode ser privado).
2. Extraiam o zip e subam o conteúdo — pela interface web (arrastando os
   arquivos) ou via linha de comando:

```bash
git init
git add .
git commit -m "HydraGuard web — versão inicial"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/hydraguard-web.git
git push -u origin main
```

> Importante: `js/config.js` com as chaves do Supabase vai junto no
> repositório. Como a anon key é pública por design (ver seção 1), isso é
> normal e seguro — mas se preferirem não versionar, deem
> `git update-index --skip-worktree js/config.js` depois do primeiro commit.

---

## 4. Deploy no Vercel

1. Em https://vercel.com, cliquem em **Add New → Project** e importem o
   repositório do GitHub.
2. Em **Framework Preset**, escolham **Other** (é site estático, não precisa
   de build).
3. **Build Command**: deixem em branco. **Output Directory**: `./` (raiz).
4. Cliquem em **Deploy**.

Pronto — o Vercel gera uma URL pública (tipo `hydraguard-web.vercel.app`)
que funciona igual em computador e celular, com layout responsivo (sidebar
no desktop, barra de abas embaixo no celular).

Toda vez que vocês derem `git push` no `main`, o Vercel republica sozinho.

---

## O que já funciona ponta a ponta

- Cadastro/login real (Supabase Auth)
- Hidratação: registrar, excluir, histórico de 7/30 dias comparado com a
  meta atual
- Medicamentos: cadastrar, marcar como tomado, excluir
- Agenda: cadastrar, visualizar em calendário, excluir
- Cuidador/família: cadastrar (nome + e-mail), configurar alertas,
  pré-visualizar o que o cuidador veria, remover
- Perfil: editar nome, meta de hidratação, modo simples
- Modo simples: navegação reduzida e tudo bem maior
- Resiliência offline básica: se a escrita falhar por falta de internet,
  fica guardada no navegador (`localStorage`) e é reenviada automaticamente
  quando a conexão volta

## O que ainda é preciso construir (próximos passos)

1. **Convite de cuidador por e-mail de verdade.** Hoje o cadastro salva no
   banco, mas ninguém recebe e-mail. Precisa de uma Supabase Edge Function
   (ou serviço tipo Resend) que dispare o convite e, quando aceito, ligue a
   conta do cuidador (`cuidador_user_id`) e mude o status para `ativo`.
2. **Login separado para o cuidador.** As políticas de RLS já preparam o
   terreno (o cuidador ativo consegue *ler* hidratação/medicamentos/agenda
   do paciente vinculado), mas falta a tela/rota para esse segundo tipo de
   usuário logar e ver o próprio painel.
3. **Alertas automáticos (US31).** As preferências de alerta já são
   salvas por cuidador; falta o job agendado (Edge Function + `pg_cron`)
   que checa adesão 1x/dia e dispara e-mail/push quando necessário.
4. **Notificações de horário de medicamento.** Na web isso usaria a
   `Notification API` do navegador — diferente do Expo Notifications do
   app mobile, e só funciona com o site aberto (ou como PWA instalado).
5. **Offline mais robusto.** A fila atual funciona por aba/navegador
   (localStorage). Se quiserem algo mais próximo do AsyncStorage +
   syncService do app mobile, o próximo passo é migrar para IndexedDB.
