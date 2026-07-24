
/* ============================================================
   HydraGuard — Web App (Supabase)
   Layout: sidebar on desktop, bottom-tab nav on mobile
   ============================================================ */
import * as api from './api.js';
import { supabaseConfigured } from './supabaseClient.js';

/* ---------- ICONS ---------- */
const ICONS = {
  droplet:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.69s5.66 6.11 8.14 10.63A8.5 8.5 0 1 1 3.86 13.32C6.34 8.8 12 2.69 12 2.69Z"/></svg>',
  pill:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/><path d="m8.5 8.5 7 7"/></svg>',
  calendar:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>',
  home:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/><path d="M9 22V12h6v10"/></svg>',
  user:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6.5 8-6.5s8 2.5 8 6.5"/></svg>',
  plus:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
  bell:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>',
  check:'<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
  chevronRight:'<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>',
  chevronLeft:'<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>',
  x:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>',
  edit:'<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>',
  trash:'<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6"/></svg>',
  logout:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>',
  wifiOff:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><path d="M2 2l20 20M8.5 16.5a5 5 0 0 1 7 0M5 12.5a10 10 0 0 1 3-2M19 12.5a10 10 0 0 0-1.2-.9M12 20h.01"/></svg>',
  clock:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  shield:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 4 5v6c0 5.5 3.5 9.7 8 11 4.5-1.3 8-5.5 8-11V5Z"/></svg>',
  emergency:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.68 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.32 1.85.55 2.81.68A2 2 0 0 1 22 16.92z"/></svg>',
  mail:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>',
  users:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  bellRing:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/><path d="M18 5a2 2 0 0 1 3 1.7"/></svg>',
};
function icon(name,cls=''){return `<span class="${cls}" style="display:flex">${ICONS[name]||''}</span>`;}

/* ---------- ESTADO (populado a partir do Supabase após login) ---------- */
let DB = {
  auth: null, // {id, nome, email}
  simpleMode: false,
  hydrationGoal: 2000,
  hydrationToday: 0,
  hydrationLog: [],
  hydrationHistory: [], // dias anteriores (sem o dia de hoje), no formato {date, ml}
  medications: [],
  agenda: [],
  caregivers: [],
};

function dayKey(offset){
  const d = new Date(); d.setDate(d.getDate()+offset);
  return d.toISOString().slice(0,10);
}

async function loadAllData(){
  const uid = DB.auth.id;
  const profile = await api.getProfile(uid);
  DB.auth.nome = profile.nome;
  DB.auth.email = profile.email;
  DB.hydrationGoal = profile.meta_hidratacao_ml;
  DB.simpleMode = profile.modo_simples;

  const since = new Date(); since.setDate(since.getDate()-90);
  const hydroRows = await api.getHydrationLog(uid, since.toISOString());
  const byDate = {};
  hydroRows.forEach(r=>{
    const d = r.registrado_em.slice(0,10);
    byDate[d] = (byDate[d]||0) + r.ml;
  });
  const today = dayKey(0);
  DB.hydrationToday = byDate[today] || 0;
  DB.hydrationLog = hydroRows
    .filter(r=>r.registrado_em.slice(0,10)===today)
    .map(r=>({ id:r.id, ml:r.ml, hora:new Date(r.registrado_em).toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'}) }));
  DB.hydrationHistory = Object.keys(byDate).filter(d=>d!==today).sort()
    .map(d=>({ date:d, ml:byDate[d] }));

  DB.medications = (await api.getMedications(uid)).map(m=>({
    id:m.id, nome:m.nome, dose:m.dose, horario:(m.horario||'').slice(0,5), tomado:m.tomado_hoje,
  }));
  DB.agenda = (await api.getAgenda(uid)).map(e=>({
    id:e.id, titulo:e.titulo, data:e.data, hora:(e.horario||'').slice(0,5), tipo:e.tipo,
  }));
  DB.caregivers = (await api.getCaregivers(uid)).map(c=>({
    id:c.id, nome:c.nome, email:c.email, parentesco:c.parentesco, status:c.status,
    alertas:{ hidratacao:c.alerta_hidratacao, medicamentos:c.alerta_medicamentos, agenda:c.alerta_agenda },
  }));
}

let route = 'home';
let calCursor = new Date();
let calSelected = dayKey(0);
let hidratacaoTab = 'hoje';
let historicoPeriodo = 'semana';

/* ---------- HELPERS ---------- */
function isOffline(){
  return !navigator.onLine || api.pendingCount() > 0;
}
function offlineLabel(){
  if(!navigator.onLine) return 'Sem conexão — salvando localmente';
  const n = api.pendingCount();
  return n>0 ? `Sincronizando ${n} pendência${n>1?'s':''}…` : 'Offline';
}
window.addEventListener('online', async ()=>{
  await api.attemptSync(()=>{});
  if(DB.auth) await loadAllData().catch(()=>{});
  render();
});
window.addEventListener('offline', render);

function initials(nome){
  return (nome||'?').split(' ').filter(Boolean).slice(0,2).map(p=>p[0].toUpperCase()).join('');
}
function showToast(msg, iconName){
  const t = document.getElementById('toast');
  t.innerHTML = (iconName?icon(iconName):'') + '<span>'+msg+'</span>';
  t.classList.add('show');
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(()=>t.classList.remove('show'), 2200);
}
function closeModal(){ document.getElementById('modalOverlay').classList.remove('show'); }
function openModal(html){
  document.getElementById('modalBody').innerHTML = html;
  document.getElementById('modalOverlay').classList.add('show');
}
document.getElementById('modalOverlay').addEventListener('click', e=>{
  if(e.target.id==='modalOverlay') closeModal();
});

/* ---------- RENDER ROOT ---------- */
function render(){
  document.body.classList.toggle('simple', DB.simpleMode);
  const app = document.getElementById('app');
  if(!DB.auth){ app.innerHTML = renderAuth(); attachAuthEvents(); return; }
  app.innerHTML = renderShell();
  attachShellEvents();
}

/* ============================================================
   AUTH
   ============================================================ */
let authMode = 'login'; // 'login' | 'cadastro'
let authError = '';
let authLoading = false;

function renderAuth(){
  return `
  <div class="auth-screen">
    <div class="auth-card">
      <div class="brand">
        <div class="brand-mark">${icon('shield')}</div>
        <div>
          <div class="brand-name">HydraGuard</div>
          <div class="brand-sub">Cuidado renal, todos os dias</div>
        </div>
      </div>
      ${authMode==='login' ? `
        <h1 class="auth-title">Entrar na sua conta</h1>
        <p class="auth-desc">Acompanhe sua hidratação, medicamentos e agenda em um só lugar.</p>
        <div id="loginForm">
          <div class="field">
            <label for="loginEmail">E-mail</label>
            <input id="loginEmail" type="email" placeholder="voce@email.com" autocomplete="email">
          </div>
          <div class="field">
            <label for="loginSenha">Senha</label>
            <input id="loginSenha" type="password" placeholder="••••••••" autocomplete="current-password">
            ${authError ? `<div class="field-error">${authError}</div>` : ''}
          </div>
          <button type="button" id="loginSubmitBtn" class="btn-primary" ${authLoading?'disabled':''}>${authLoading?'Entrando…':'Entrar'}</button>
        </div>
        <div class="auth-switch">Ainda não tem conta? <a id="toCadastro">Cadastre-se</a></div>
        ${!supabaseConfigured ? `<div class="auth-hint" style="background:var(--alert-light);color:#991B1B;">Supabase ainda não configurado. Edite <strong>js/config.js</strong> com a URL e a anon key do seu projeto.</div>` : ''}
      ` : `
        <h1 class="auth-title">Criar sua conta</h1>
        <p class="auth-desc">Leva menos de um minuto.</p>
        <div id="cadastroForm">
          <div class="field">
            <label for="cadNome">Nome completo</label>
            <input id="cadNome" type="text" placeholder="Seu nome">
          </div>
          <div class="field">
            <label for="cadEmail">E-mail</label>
            <input id="cadEmail" type="email" placeholder="voce@email.com">
          </div>
          <div class="field">
            <label for="cadSenha">Senha</label>
            <input id="cadSenha" type="password" placeholder="Mínimo 6 caracteres">
            ${authError ? `<div class="field-error">${authError}</div>` : ''}
          </div>
          <button type="button" id="cadastroSubmitBtn" class="btn-primary" ${authLoading?'disabled':''}>${authLoading?'Criando…':'Criar conta'}</button>
        </div>
        <div class="auth-switch">Já tem conta? <a id="toLogin">Entrar</a></div>
      `}
    </div>
  </div>`;
}

function attachAuthEvents(){
  const toC = document.getElementById('toCadastro');
  const toL = document.getElementById('toLogin');
  if(toC) toC.onclick = ()=>{authMode='cadastro'; authError=''; render();};
  if(toL) toL.onclick = ()=>{authMode='login'; authError=''; render();};

  async function doLogin(){
    const email = document.getElementById('loginEmail').value.trim();
    const senha = document.getElementById('loginSenha').value;
    if(!email || !senha){ authError='Preencha e-mail e senha.'; render(); return; }
    authLoading = true; authError=''; render();
    try{
      const { user } = await api.signIn({ email, senha });
      DB.auth = { id:user.id, nome:'', email:user.email };
      await loadAllData();
      route='home'; authLoading=false; render();
      showToast('Bem-vindo(a) de volta, '+DB.auth.nome.split(' ')[0]+'!','check');
    }catch(err){
      authLoading=false;
      authError = translateAuthError(err);
      render();
    }
  }
  const loginBtn = document.getElementById('loginSubmitBtn');
  if(loginBtn) loginBtn.onclick = doLogin;
  ['loginEmail','loginSenha'].forEach(id=>{
    const field = document.getElementById(id);
    if(field) field.onkeydown = (e)=>{ if(e.key==='Enter') doLogin(); };
  });

  async function doCadastro(){
    const nome = document.getElementById('cadNome').value.trim();
    const email = document.getElementById('cadEmail').value.trim();
    const senha = document.getElementById('cadSenha').value;
    if(!nome || !email || senha.length<6){ authError='Preencha nome, e-mail e uma senha com 6+ caracteres.'; render(); return; }
    authLoading = true; authError=''; render();
    try{
      const data = await api.signUp({ nome, email, senha });
      if(data.session){
        DB.auth = { id:data.user.id, nome, email };
        await loadAllData();
        route='home'; authLoading=false; render();
        showToast('Conta criada! Bem-vindo(a), '+nome.split(' ')[0]+'.','check');
      } else {
        // Projeto com confirmação de e-mail ativada: precisa confirmar antes de logar
        authLoading=false; authMode='login';
        authError='Conta criada! Confirme seu e-mail e faça login.';
        render();
      }
    }catch(err){
      authLoading=false;
      authError = translateAuthError(err);
      render();
    }
  }
  const cadastroBtn = document.getElementById('cadastroSubmitBtn');
  if(cadastroBtn) cadastroBtn.onclick = doCadastro;
  ['cadNome','cadEmail','cadSenha'].forEach(id=>{
    const field = document.getElementById(id);
    if(field) field.onkeydown = (e)=>{ if(e.key==='Enter') doCadastro(); };
  });
}

function translateAuthError(err){
  const msg = (err && err.message) || '';
  if(msg.includes('Invalid login credentials')) return 'E-mail ou senha incorretos.';
  if(msg.includes('User already registered')) return 'Este e-mail já está cadastrado.';
  if(msg.includes('não configurado')) return msg;
  return msg || 'Não foi possível completar a ação. Tente novamente.';
}

/* ============================================================
   SHELL (sidebar desktop / bottom nav mobile)
   ============================================================ */
const NAV_ITEMS = [
  {id:'home', label:'Início', icon:'home'},
  {id:'hidratacao', label:'Hidratação', icon:'droplet'},
  {id:'medicamentos', label:'Medicamentos', icon:'pill'},
  {id:'agenda', label:'Agenda', icon:'calendar'},
  {id:'perfil', label:'Perfil', icon:'user'},
];
function getNavItems(){
  // Modo simples: navegação reduzida aos itens essenciais do dia a dia, com nomes mais curtos
  if(!DB.simpleMode) return NAV_ITEMS;
  return NAV_ITEMS
    .filter(i=>i.id!=='agenda')
    .map(i=>{
      if(i.id==='hidratacao') return {...i, label:'Água'};
      if(i.id==='medicamentos') return {...i, label:'Remédios'};
      return i;
    });
}

function renderShell(){
  return `
  <div class="shell">
    <aside class="sidebar">
      <div class="side-brand">
        <div class="brand-mark" style="width:36px;height:36px;border-radius:10px;">${icon('shield')}</div>
        <div class="brand-name">HydraGuard</div>
      </div>
      <nav class="side-nav">
        ${getNavItems().map(item=>`
          <button class="side-link ${route===item.id?'active':''}" data-route="${item.id}">
            ${icon(item.icon)}<span>${item.label}</span>
          </button>`).join('')}
      </nav>
      <div class="side-foot">
        <div class="side-user" data-route="perfil">
          <div class="avatar">${initials(DB.auth.nome)}</div>
          <div>
            <div class="side-user-name">${DB.auth.nome}</div>
            <div class="side-user-role">Paciente</div>
          </div>
        </div>
      </div>
    </aside>

    <main class="main">
      <div class="topbar-mobile">
        <div class="brand" style="margin-bottom:0;">
          <div class="brand-mark" style="width:34px;height:34px;border-radius:9px;">${icon('shield')}</div>
          <div class="brand-name" style="font-size:16px;">HydraGuard</div>
        </div>
        <div id="offlinePillMobile" class="offline-pill ${isOffline()?'show':''}">
          <span class="dot"></span> ${offlineLabel()}
        </div>
      </div>
      <div id="pageContent"></div>
    </main>

    <button class="fab" id="fabBtn" aria-label="Ação rápida">${icon('plus')}</button>

    <nav class="bottom-nav">
      ${getNavItems().map(item=>`
        <button class="bottom-link ${route===item.id?'active':''}" data-route="${item.id}">
          ${icon(item.icon)}<span>${item.label}</span>
        </button>`).join('')}
    </nav>
  </div>`;
}

function attachShellEvents(){
  document.querySelectorAll('[data-route]').forEach(el=>{
    el.onclick = ()=>{ route = el.getAttribute('data-route'); render(); };
  });
  document.getElementById('fabBtn').onclick = ()=>{
    if(route==='hidratacao') openAddHydration();
    else if(route==='medicamentos') openAddMedication();
    else if(route==='agenda') openAddEvent();
    else route='hidratacao', render();
  };
  renderPage();
}

/* ============================================================
   PAGE ROUTER
   ============================================================ */
function renderPage(){
  const el = document.getElementById('pageContent');
  if(route==='home') el.innerHTML = pageHome();
  else if(route==='hidratacao') el.innerHTML = pageHidratacao();
  else if(route==='medicamentos') el.innerHTML = pageMedicamentos();
  else if(route==='agenda') el.innerHTML = pageAgenda();
  else if(route==='perfil') el.innerHTML = pagePerfil();
  bindPageEvents();
}

/* ---------- HOME ---------- */
function pageHome(){
  if(DB.simpleMode) return pageHomeSimple();
  const pct = Math.min(100, Math.round(DB.hydrationToday/DB.hydrationGoal*100));
  const pendentes = DB.medications.filter(m=>!m.tomado);
  const proximo = DB.agenda.slice().sort((a,b)=>a.data.localeCompare(b.data))[0];
  const first = DB.auth.nome.split(' ')[0];
  return `
    <div class="page-head">
      <div>
        <h1 class="page-title">Olá, ${first} 👋</h1>
        <p class="page-sub">${new Date().toLocaleDateString('pt-BR',{weekday:'long', day:'numeric', month:'long'})}</p>
      </div>
      <div class="offline-pill ${isOffline()?'show':''}" id="offlinePillDesktop"><span class="dot"></span> ${offlineLabel()}</div>
    </div>

    <div class="grid grid-3">
      <div class="card stat-card" id="homeHydroCard" style="cursor:pointer;">
        <div class="stat-top">
          <div class="stat-icon" style="background:var(--primary-light);color:var(--primary-dark);">${icon('droplet')}</div>
          <span class="chip ${pct>=100?'chip-success':'chip-warn'}">${pct}%</span>
        </div>
        <div class="stat-value">${DB.hydrationToday} ml</div>
        <div class="stat-label">Meta: ${DB.hydrationGoal} ml hoje · ver histórico ${'&rsaquo;'}</div>
        <div class="progress-track"><div class="progress-fill" style="width:${pct}%"></div></div>
      </div>

      <div class="card stat-card">
        <div class="stat-top">
          <div class="stat-icon" style="background:var(--success-light);color:var(--success);">${icon('pill')}</div>
          <span class="chip ${pendentes.length?'chip-warn':'chip-success'}">${DB.medications.length-pendentes.length}/${DB.medications.length}</span>
        </div>
        <div class="stat-value">${pendentes.length}</div>
        <div class="stat-label">${pendentes.length===1?'medicamento pendente':'medicamentos pendentes'}</div>
      </div>

      <div class="card stat-card">
        <div class="stat-top">
          <div class="stat-icon" style="background:var(--warn-light);color:var(--warn);">${icon('calendar')}</div>
        </div>
        <div class="stat-value" style="font-size:17px;">${proximo? proximo.titulo : 'Sem eventos'}</div>
        <div class="stat-label">${proximo? formatDateShort(proximo.data)+' às '+proximo.hora : 'Nada agendado'}</div>
      </div>
    </div>

    <div class="section-head">
      <h2>Medicamentos de hoje</h2>
      <button class="link-btn" data-route="medicamentos">Ver todos ${icon('chevronRight')}</button>
    </div>
    <div class="card">
      <div class="list">
        ${DB.medications.slice(0,3).map(m=>medRow(m)).join('') || emptyState('pill','Nenhum medicamento cadastrado','Adicione seus medicamentos para receber lembretes')}
      </div>
    </div>

    <div class="section-head">
      <h2>Próximos compromissos</h2>
      <button class="link-btn" data-route="agenda">Ver agenda ${icon('chevronRight')}</button>
    </div>
    <div class="card">
      <div class="list">
        ${DB.agenda.slice().sort((a,b)=>a.data.localeCompare(b.data)).slice(0,3).map(ev=>agendaRow(ev)).join('') || emptyState('calendar','Nenhum compromisso','Sua agenda está livre')}
      </div>
    </div>
  `;
}

function formatDateShort(dateStr){
  const d = new Date(dateStr+'T00:00:00');
  return d.toLocaleDateString('pt-BR',{day:'2-digit',month:'short'});
}

/* ---------- HOME (modo simples) ---------- */
function pageHomeSimple(){
  const pct = Math.min(100, Math.round(DB.hydrationToday/DB.hydrationGoal*100));
  const first = DB.auth.nome.split(' ')[0];
  const pendentes = DB.medications.filter(m=>!m.tomado);
  return `
    <div class="page-head"><div><h1 class="page-title">Olá, ${first}</h1></div></div>

    <div class="card" style="text-align:center;padding:32px 20px;">
      <div style="font-size:16px;color:var(--ink-soft);font-weight:800;margin-bottom:8px;">Água hoje</div>
      <div style="font-size:46px;font-weight:800;line-height:1;">${DB.hydrationToday} ml</div>
      <div class="progress-track" style="max-width:300px;margin:18px auto 24px;height:14px;"><div class="progress-fill" style="width:${pct}%"></div></div>
      <button class="btn-primary" style="max-width:300px;margin:0 auto;font-size:19px;padding:18px;display:flex;align-items:center;justify-content:center;gap:10px;" data-add-water="200">${icon('droplet')} Beber 200 ml</button>
    </div>

    <div class="section-head"><h2>Remédios de hoje</h2></div>
    <div class="card">
      <div class="list">
        ${DB.medications.length ? DB.medications.map(m=>simpleMedRow(m)).join('') : emptyState('pill','Nenhum remédio cadastrado','Toque no + para adicionar')}
      </div>
      ${pendentes.length===0 && DB.medications.length ? `<p style="text-align:center;color:var(--success);font-weight:700;font-size:16px;margin:14px 0 2px;">${icon('check')} Tudo em dia por hoje!</p>` : ''}
    </div>
  `;
}
function simpleMedRow(m){
  return `
  <div class="list-item" style="padding:18px;gap:16px;">
    <div class="list-item-icon" style="width:52px;height:52px;background:${m.tomado?'var(--success-light)':'var(--primary-light)'};color:${m.tomado?'var(--success)':'var(--primary-dark)'};">${icon('pill')}</div>
    <div class="list-item-body">
      <p class="list-item-title" style="font-size:19px;">${m.nome}</p>
      <p class="list-item-sub" style="font-size:15px;">${m.horario}</p>
    </div>
    <button class="chip ${m.tomado?'chip-success':'chip-warn'}" style="border:none;cursor:pointer;font-size:15.5px;padding:11px 16px;font-weight:800;" data-toggle-med="${m.id}">${m.tomado?'✓ Feito':'Marcar'}</button>
  </div>`;
}

function medRow(m){
  return `
  <div class="list-item">
    <div class="list-item-icon" style="background:${m.tomado?'var(--success-light)':'var(--primary-light)'};color:${m.tomado?'var(--success)':'var(--primary-dark)'};">${icon('pill')}</div>
    <div class="list-item-body">
      <p class="list-item-title">${m.nome} · ${m.dose}</p>
      <p class="list-item-sub">${m.horario}</p>
    </div>
    <button class="chip ${m.tomado?'chip-success':'chip-warn'}" style="border:none;cursor:pointer;" data-toggle-med="${m.id}">${m.tomado?'Tomado':'Pendente'}</button>
  </div>`;
}
function agendaRow(ev){
  const tipoIcon = ev.tipo==='sessao'?'droplet':ev.tipo==='consulta'?'user':'calendar';
  return `
  <div class="list-item">
    <div class="list-item-icon" style="background:var(--primary-light);color:var(--primary-dark);">${icon(tipoIcon)}</div>
    <div class="list-item-body">
      <p class="list-item-title">${ev.titulo}</p>
      <p class="list-item-sub">${formatDateShort(ev.data)} · ${ev.hora}</p>
    </div>
  </div>`;
}
function emptyState(iconName,title,sub){
  return `<div class="empty">${icon(iconName)}<div class="empty-title">${title}</div><div class="empty-sub">${sub}</div></div>`;
}

/* ---------- HIDRATAÇÃO ---------- */
function pageHidratacao(){
  if(DB.simpleMode) return pageHidratacaoSimple();
  return `
    <div class="page-head">
      <div>
        <h1 class="page-title">Hidratação</h1>
        <p class="page-sub">Controle diário de líquidos</p>
      </div>
    </div>

    <div class="tabs">
      <button class="tab-btn ${hidratacaoTab==='hoje'?'active':''}" data-hid-tab="hoje">Hoje</button>
      <button class="tab-btn ${hidratacaoTab==='historico'?'active':''}" data-hid-tab="historico">Histórico</button>
    </div>

    ${hidratacaoTab==='hoje' ? hidratacaoHojeContent() : hidratacaoHistoricoContent()}
  `;
}

function hidratacaoHojeContent(){
  const pct = Math.min(100, Math.round(DB.hydrationToday/DB.hydrationGoal*100));
  return `
    <div class="card">
      <div class="hydro-ring-wrap">
        <svg width="180" height="180" viewBox="0 0 180 180">
          <circle cx="90" cy="90" r="78" fill="none" stroke="#EEF2F7" stroke-width="16"/>
          <circle cx="90" cy="90" r="78" fill="none" stroke="var(--primary)" stroke-width="16"
            stroke-linecap="round" stroke-dasharray="${2*Math.PI*78}"
            stroke-dashoffset="${2*Math.PI*78*(1-pct/100)}"
            transform="rotate(-90 90 90)" style="transition:stroke-dashoffset .5s ease"/>
          <text x="90" y="84" text-anchor="middle" font-size="30" font-weight="800" fill="var(--ink)">${DB.hydrationToday}</text>
          <text x="90" y="106" text-anchor="middle" font-size="13" fill="var(--ink-soft)">de ${DB.hydrationGoal} ml</text>
        </svg>
      </div>
      <div class="quick-add">
        <button class="quick-btn" data-add-water="100">+100 ml</button>
        <button class="quick-btn" data-add-water="200">+200 ml</button>
        <button class="quick-btn" data-add-water="300">+300 ml</button>
        <button class="quick-btn custom" id="customWaterBtn">Outro valor</button>
      </div>
    </div>

    <div class="section-head"><h2>Registros de hoje</h2></div>
    <div class="card">
      <div class="list">
        ${DB.hydrationLog.slice().reverse().map(r=>`
          <div class="list-item">
            <div class="list-item-icon" style="background:var(--primary-light);color:var(--primary-dark);">${icon('droplet')}</div>
            <div class="list-item-body">
              <p class="list-item-title">${r.ml} ml</p>
              <p class="list-item-sub">${r.hora}</p>
            </div>
            <button class="close-btn" data-del-water="${r.id}" aria-label="Remover registro" style="width:28px;height:28px;">${icon('x')}</button>
          </div>
        `).join('') || emptyState('droplet','Nenhum registro hoje','Toque em um dos botões acima para começar')}
      </div>
    </div>
  `;
}

/* ---------- HIDRATAÇÃO — HISTÓRICO ---------- */
function getHistoricoData(periodo){
  const n = periodo==='mes' ? 30 : 7;
  // A meta usada na comparação é sempre a meta atual do paciente (DB.hydrationGoal),
  // mesmo para dias antigos — assim o gráfico reflete imediatamente qualquer mudança de meta.
  const combined = [
    ...DB.hydrationHistory.map(d=>({...d, goal: DB.hydrationGoal})),
    {date:dayKey(0), ml:DB.hydrationToday, goal: DB.hydrationGoal},
  ];
  return combined.slice(-n);
}

function hidratacaoHistoricoContent(){
  const data = getHistoricoData(historicoPeriodo);
  const maxVal = Math.max(...data.map(d=>Math.max(d.ml,d.goal))) * 1.12;
  const mediaMl = Math.round(data.reduce((s,d)=>s+d.ml,0)/data.length);
  const diasNaMeta = data.filter(d=>d.ml>=d.goal).length;
  const melhorDia = data.slice().sort((a,b)=>b.ml-a.ml)[0];
  const today = dayKey(0);

  return `
    <div class="grid grid-3">
      <div class="card stat-card" style="padding:18px;">
        <div class="stat-label">Média diária</div>
        <div class="stat-value" style="font-size:22px;">${mediaMl} ml</div>
      </div>
      <div class="card stat-card" style="padding:18px;">
        <div class="stat-label">Dias na meta</div>
        <div class="stat-value" style="font-size:22px;">${diasNaMeta}/${data.length}</div>
      </div>
      <div class="card stat-card" style="padding:18px;">
        <div class="stat-label">Melhor dia</div>
        <div class="stat-value" style="font-size:16px;">${formatDateShort(melhorDia.date)} · ${melhorDia.ml}ml</div>
      </div>
    </div>

    <div class="card" style="margin-top:18px;">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;flex-wrap:wrap;gap:10px;">
        <div class="card-title" style="margin:0;">Consumo de água</div>
        <div style="display:flex;gap:6px;">
          <button class="seg-btn ${historicoPeriodo==='semana'?'active':''}" data-periodo="semana">7 dias</button>
          <button class="seg-btn ${historicoPeriodo==='mes'?'active':''}" data-periodo="mes">30 dias</button>
        </div>
      </div>
      <p class="card-sub">Cada barra é um dia. A linha da meta é ${DB.hydrationGoal} ml (sua meta atual).</p>

      <div class="chart-bars">
        ${data.map(d=>{
          const heightPct = Math.max(4, Math.round(d.ml/maxVal*100));
          const adherence = d.goal ? d.ml/d.goal : 0;
          const color = adherence>=1 ? 'var(--success)' : adherence>=0.7 ? 'var(--primary)' : 'var(--alert)';
          const isToday = d.date===today;
          return `<div class="chart-bar-col">
            <div class="chart-bar" style="height:${heightPct}%;background:${color};${isToday?'box-shadow:0 0 0 2px var(--ink);':''}" title="${formatDateShort(d.date)}: ${d.ml} ml"></div>
          </div>`;
        }).join('')}
      </div>
      <div class="chart-labels">
        ${data.map((d,i)=>`<div class="chart-label">${shouldShowLabel(i,data.length)?labelForBar(d,historicoPeriodo):''}</div>`).join('')}
      </div>

      <div class="chart-legend">
        <span class="chart-legend-item"><i style="background:var(--success)"></i>Meta atingida</span>
        <span class="chart-legend-item"><i style="background:var(--primary)"></i>Parcial (70%+)</span>
        <span class="chart-legend-item"><i style="background:var(--alert)"></i>Abaixo de 70%</span>
      </div>
    </div>
  `;
}
function shouldShowLabel(i,n){
  if(n<=7) return true;
  return i%5===0 || i===n-1;
}
function labelForBar(d, periodo){
  const dt = new Date(d.date+'T00:00:00');
  if(periodo==='semana') return dt.toLocaleDateString('pt-BR',{weekday:'short'}).replace('.','');
  return dt.getDate();
}

/* ---------- HIDRATAÇÃO (modo simples) ---------- */
function pageHidratacaoSimple(){
  const pct = Math.min(100, Math.round(DB.hydrationToday/DB.hydrationGoal*100));
  return `
    <div class="page-head"><div><h1 class="page-title">Água</h1></div></div>
    <div class="card" style="text-align:center;padding:30px 20px;">
      <div class="hydro-ring-wrap">
        <svg width="200" height="200" viewBox="0 0 180 180">
          <circle cx="90" cy="90" r="78" fill="none" stroke="#EEF2F7" stroke-width="18"/>
          <circle cx="90" cy="90" r="78" fill="none" stroke="var(--primary)" stroke-width="18"
            stroke-linecap="round" stroke-dasharray="${2*Math.PI*78}"
            stroke-dashoffset="${2*Math.PI*78*(1-pct/100)}"
            transform="rotate(-90 90 90)" style="transition:stroke-dashoffset .5s ease"/>
          <text x="90" y="84" text-anchor="middle" font-size="32" font-weight="800" fill="var(--ink)">${DB.hydrationToday}</text>
          <text x="90" y="108" text-anchor="middle" font-size="14" fill="var(--ink-soft)">de ${DB.hydrationGoal} ml</text>
        </svg>
      </div>
      <div class="quick-add" style="margin-top:24px;">
        <button class="quick-btn" style="font-size:19px;padding:20px 10px;" data-add-water="100">+100 ml</button>
        <button class="quick-btn" style="font-size:19px;padding:20px 10px;" data-add-water="200">+200 ml</button>
        <button class="quick-btn" style="font-size:19px;padding:20px 10px;" data-add-water="300">+300 ml</button>
      </div>
    </div>
  `;
}

function openAddHydration(){
  openModal(`
    <div class="modal-head"><h3>Adicionar quantidade</h3><button class="close-btn" onclick="closeModal()">${icon('x')}</button></div>
    <div class="field">
      <label for="customMl">Quantidade (ml)</label>
      <input id="customMl" type="number" min="1" placeholder="Ex: 250" autofocus>
    </div>
    <button class="btn-primary" id="confirmWaterBtn">Adicionar</button>
  `);
  document.getElementById('confirmWaterBtn').onclick = ()=>{
    const val = parseInt(document.getElementById('customMl').value,10);
    if(!val || val<=0){ showToast('Informe uma quantidade válida'); return; }
    addWater(val);
    closeModal();
  };
}
async function addWater(ml){
  // Atualização otimista: mostra na hora, ajusta se algo der errado
  const tempId = 'temp-'+Date.now();
  DB.hydrationToday += ml;
  DB.hydrationLog.push({ id:tempId, ml, hora: new Date().toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'}) });
  renderPage();
  try{
    const { data, offline } = await api.addHydration(DB.auth.id, ml);
    const entry = DB.hydrationLog.find(r=>r.id===tempId);
    if(entry && data && data.id) entry.id = data.id;
    showToast(offline ? `+${ml} ml salvo (será sincronizado)` : `+${ml} ml registrado`, offline?'wifiOff':'check');
  }catch(err){
    // desfaz a atualização otimista se a escrita falhar por um motivo que não seja rede
    DB.hydrationToday -= ml;
    DB.hydrationLog = DB.hydrationLog.filter(r=>r.id!==tempId);
    renderPage();
    showToast('Não foi possível registrar. Tente de novo.');
  }
}

/* ---------- MEDICAMENTOS ---------- */
function pageMedicamentos(){
  if(DB.simpleMode) return pageMedicamentosSimple();
  return `
    <div class="page-head">
      <div>
        <h1 class="page-title">Medicamentos</h1>
        <p class="page-sub">${DB.medications.length} cadastrados</p>
      </div>
      <button class="btn-primary" style="width:auto;padding:11px 18px;display:flex;align-items:center;gap:7px;" id="addMedTopBtn">${icon('plus')} Novo</button>
    </div>
    <div class="card">
      <div class="list">
        ${DB.medications.map(m=>`
          <div class="list-item">
            <div class="list-item-icon" style="background:${m.tomado?'var(--success-light)':'var(--primary-light)'};color:${m.tomado?'var(--success)':'var(--primary-dark)'};">${icon('pill')}</div>
            <div class="list-item-body">
              <p class="list-item-title">${m.nome}</p>
              <p class="list-item-sub">${m.dose} · ${m.horario}</p>
            </div>
            <button class="chip ${m.tomado?'chip-success':'chip-warn'}" style="border:none;cursor:pointer;margin-right:2px;" data-toggle-med="${m.id}">${m.tomado?'Tomado':'Marcar'}</button>
            <button class="close-btn" style="width:30px;height:30px;" data-del-med="${m.id}" aria-label="Remover">${icon('trash')}</button>
          </div>
        `).join('') || emptyState('pill','Nenhum medicamento','Cadastre seus medicamentos para não esquecer os horários')}
      </div>
    </div>
  `;
}

/* ---------- MEDICAMENTOS (modo simples) ---------- */
function pageMedicamentosSimple(){
  return `
    <div class="page-head"><div><h1 class="page-title">Remédios</h1></div></div>
    <div class="card">
      <div class="list">
        ${DB.medications.length ? DB.medications.map(m=>simpleMedRow(m)).join('') : emptyState('pill','Nenhum remédio cadastrado','Toque no + para adicionar')}
      </div>
    </div>
  `;
}

function openAddMedication(){
  openModal(`
    <div class="modal-head"><h3>Novo medicamento</h3><button class="close-btn" onclick="closeModal()">${icon('x')}</button></div>
    <div class="field"><label for="medNome">Nome do medicamento</label><input id="medNome" placeholder="Ex: Sevelamer"></div>
    <div class="field"><label for="medDose">Dose</label><input id="medDose" placeholder="Ex: 800mg"></div>
    <div class="field"><label for="medHora">Horário</label><input id="medHora" type="time" value="08:00"></div>
    <button class="btn-primary" id="confirmMedBtn">Salvar medicamento</button>
  `);
  document.getElementById('confirmMedBtn').onclick = async ()=>{
    const nome = document.getElementById('medNome').value.trim();
    const dose = document.getElementById('medDose').value.trim();
    const horario = document.getElementById('medHora').value;
    if(!nome || !dose){ showToast('Preencha nome e dose'); return; }
    closeModal();
    try{
      const { data, offline } = await api.addMedication(DB.auth.id, { nome, dose, horario, tomado_hoje:false });
      DB.medications.push({ id: data?.id || 'temp-'+Date.now(), nome, dose, horario, tomado:false });
      renderPage();
      showToast(offline ? 'Medicamento salvo (será sincronizado)' : 'Medicamento adicionado', offline?'wifiOff':'check');
    }catch(err){ showToast('Não foi possível salvar o medicamento'); }
  };
}

/* ---------- AGENDA ---------- */
function pageAgenda(){
  const monthLabel = calCursor.toLocaleDateString('pt-BR',{month:'long', year:'numeric'});
  const events = DB.agenda.filter(e=>e.data===calSelected).sort((a,b)=>a.hora.localeCompare(b.hora));
  return `
    <div class="page-head">
      <div><h1 class="page-title">Agenda</h1><p class="page-sub">Sessões, consultas e exames</p></div>
    </div>
    <div class="card">
      <div class="cal-head">
        <button class="cal-nav-btn" id="calPrev">${icon('chevronLeft')}</button>
        <strong style="text-transform:capitalize;font-size:14.5px;">${monthLabel}</strong>
        <button class="cal-nav-btn" id="calNext">${icon('chevronRight')}</button>
      </div>
      <div class="cal-grid">
        ${['D','S','T','Q','Q','S','S'].map(d=>`<div class="cal-dow">${d}</div>`).join('')}
        ${renderCalDays()}
      </div>
    </div>

    <div class="section-head"><h2>${formatDateFull(calSelected)}</h2></div>
    <div class="card">
      <div class="list">
        ${events.map(ev=>`
          <div class="list-item">
            <div class="list-item-icon" style="background:var(--primary-light);color:var(--primary-dark);">${icon(ev.tipo==='sessao'?'droplet':ev.tipo==='consulta'?'user':'calendar')}</div>
            <div class="list-item-body">
              <p class="list-item-title">${ev.titulo}</p>
              <p class="list-item-sub">${ev.hora}</p>
            </div>
            <button class="close-btn" style="width:30px;height:30px;" data-del-event="${ev.id}">${icon('trash')}</button>
          </div>
        `).join('') || emptyState('calendar','Nada agendado', 'Toque no + para adicionar um compromisso')}
      </div>
    </div>
  `;
}
function formatDateFull(dateStr){
  const d = new Date(dateStr+'T00:00:00');
  return d.toLocaleDateString('pt-BR',{weekday:'long', day:'numeric', month:'long'});
}
function renderCalDays(){
  const year = calCursor.getFullYear(), month = calCursor.getMonth();
  const firstDow = new Date(year,month,1).getDay();
  const daysInMonth = new Date(year,month+1,0).getDate();
  const prevDays = new Date(year,month,0).getDate();
  const todayKey = dayKey(0);
  let html='';
  for(let i=firstDow-1;i>=0;i--) html += `<div class="cal-day muted">${prevDays-i}</div>`;
  for(let d=1; d<=daysInMonth; d++){
    const key = `${year}-${String(month+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    const hasEvent = DB.agenda.some(e=>e.data===key);
    let cls='cal-day';
    if(key===todayKey) cls+=' today';
    if(key===calSelected) cls+=' selected';
    html += `<div class="${cls}" data-cal-day="${key}">${d}${hasEvent?'<span class="cal-dot"></span>':''}</div>`;
  }
  const remain = (7 - (new Date(year,month+1,0).getDay()+1)%7)%7;
  for(let i=1;i<=remain;i++) html += `<div class="cal-day muted">${i}</div>`;
  return html;
}
function openAddEvent(){
  openModal(`
    <div class="modal-head"><h3>Novo compromisso</h3><button class="close-btn" onclick="closeModal()">${icon('x')}</button></div>
    <div class="field"><label for="evTitulo">Título</label><input id="evTitulo" placeholder="Ex: Consulta nefrologista"></div>
    <div class="field"><label for="evData">Data</label><input id="evData" type="date" value="${calSelected}"></div>
    <div class="field"><label for="evHora">Horário</label><input id="evHora" type="time" value="09:00"></div>
    <div class="field">
      <label for="evTipo">Tipo</label>
      <select id="evTipo" style="width:100%;padding:13px 14px;border-radius:10px;border:1.5px solid var(--line);font-size:15px;background:#F8FAFC;">
        <option value="sessao">Sessão de hemodiálise</option>
        <option value="consulta">Consulta médica</option>
        <option value="exame">Exame</option>
      </select>
    </div>
    <button class="btn-primary" id="confirmEventBtn">Salvar compromisso</button>
  `);
  document.getElementById('confirmEventBtn').onclick = async ()=>{
    const titulo = document.getElementById('evTitulo').value.trim();
    const data = document.getElementById('evData').value;
    const hora = document.getElementById('evHora').value;
    const tipo = document.getElementById('evTipo').value;
    if(!titulo || !data){ showToast('Preencha título e data'); return; }
    calSelected = data;
    closeModal();
    try{
      const { data:row, offline } = await api.addAgendaEvent(DB.auth.id, { titulo, data, horario:hora, tipo });
      DB.agenda.push({ id: row?.id || 'temp-'+Date.now(), titulo, data, hora, tipo });
      renderPage();
      showToast(offline ? 'Compromisso salvo (será sincronizado)' : 'Compromisso adicionado', offline?'wifiOff':'check');
    }catch(err){ showToast('Não foi possível salvar o compromisso'); }
  };
}

/* ---------- PERFIL ---------- */
function pagePerfil(){
  return `
    <div class="page-head"><h1 class="page-title">Perfil</h1></div>
    <div class="card">
      <div class="profile-head">
        <div class="profile-avatar">${initials(DB.auth.nome)}</div>
        <div>
          <p class="profile-name">${DB.auth.nome}</p>
          <p class="profile-email">${DB.auth.email}</p>
        </div>
        <button class="close-btn" style="margin-left:auto;width:36px;height:36px;" id="editProfileBtn">${icon('edit')}</button>
      </div>

      <div class="simple-toggle" style="margin-bottom:18px;">
        <div>
          <div class="settings-label">Modo simples</div>
          <div style="font-size:12.5px;color:var(--ink-soft);margin-top:2px;">Botões maiores e navegação reduzida</div>
        </div>
        <label class="switch"><input type="checkbox" id="simpleModeToggle" ${DB.simpleMode?'checked':''}><span class="slider"></span></label>
      </div>

      <div class="settings-row" id="editGoalRow">
        <div class="settings-row-left">${icon('droplet')}<span class="settings-label">Meta diária de hidratação</span></div>
        <div style="display:flex;align-items:center;gap:6px;color:var(--ink-soft);font-weight:700;font-size:13.5px;">${DB.hydrationGoal} ml ${icon('chevronRight')}</div>
      </div>
      <div class="settings-row" id="offlineToggleRow">
        <div class="settings-row-left">${icon('wifiOff')}<span class="settings-label">Status de conexão</span></div>
        <div style="display:flex;align-items:center;gap:8px;">
          <span class="chip ${isOffline()?'chip-warn':'chip-success'}">${navigator.onLine ? (api.pendingCount()>0?`${api.pendingCount()} pendente(s)`:'Online') : 'Offline'}</span>
        </div>
      </div>
      <div class="settings-row" id="emergencyRow">
        <div class="settings-row-left" style="color:var(--alert);">${icon('emergency')}<span class="settings-label" style="color:var(--alert);">Contato de emergência</span></div>
        ${icon('chevronRight')}
      </div>
      <div class="settings-row" id="logoutRow">
        <div class="settings-row-left logout-btn">${icon('logout')}<span class="settings-label logout-btn">Sair da conta</span></div>
      </div>
    </div>

    <div class="section-head"><h2>Cuidador e família</h2></div>
    <div class="card">
      <p class="card-sub" style="margin-bottom:16px;">Convide um familiar por e-mail para acompanhar seu tratamento. Ele poderá ver seus indicadores e receber alertas se algo sair do previsto.</p>
      <div class="list">
        ${DB.caregivers.length ? DB.caregivers.map(c=>caregiverRow(c)).join('') : emptyState('users','Nenhum cuidador vinculado','Adicione um e-mail para convidar alguém')}
      </div>
      <button class="btn-secondary" style="width:100%;margin-top:14px;display:flex;align-items:center;justify-content:center;gap:8px;" id="addCaregiverBtn">${icon('plus')} Adicionar cuidador</button>
      ${DB.caregivers.length ? `<button class="link-btn" style="width:100%;justify-content:center;margin-top:14px;" id="previewCaregiverBtn">${icon('users')} Ver o que o cuidador enxerga</button>` : ''}
    </div>
  `;
}

function caregiverRow(c){
  const alertLabels = [];
  if(c.alertas.hidratacao) alertLabels.push('Hidratação');
  if(c.alertas.medicamentos) alertLabels.push('Medicamentos');
  if(c.alertas.agenda) alertLabels.push('Agenda');
  const statusChip = c.status==='ativo'
    ? `<span class="chip chip-success">Ativo</span>`
    : `<span class="chip chip-warn">Convite enviado</span>`;
  return `
  <div class="list-item" style="align-items:flex-start;">
    <div class="avatar" style="background:var(--primary-light);color:var(--primary-dark);flex-shrink:0;">${initials(c.nome)}</div>
    <div class="list-item-body">
      <p class="list-item-title">${c.nome} <span style="font-weight:600;color:var(--ink-soft);">· ${c.parentesco}</span></p>
      <div class="list-item-sub" style="display:flex;align-items:center;gap:6px;"><span style="display:flex;flex-shrink:0;transform:scale(.75);transform-origin:left center;">${ICONS.mail}</span><span>${c.email}</span></div>
      <div class="list-item-sub" style="display:flex;align-items:center;gap:6px;margin-top:5px;"><span style="display:flex;flex-shrink:0;transform:scale(.75);transform-origin:left center;">${ICONS.bellRing}</span><span>Alertas: ${alertLabels.length ? alertLabels.join(', ') : 'nenhum'}</span></div>
    </div>
    <div style="display:flex;flex-direction:column;align-items:flex-end;gap:8px;">
      ${statusChip}
      <button class="close-btn" style="width:30px;height:30px;" data-del-caregiver="${c.id}" aria-label="Remover cuidador">${icon('trash')}</button>
    </div>
  </div>`;
}

function openCaregiverPreview(){
  const pct = Math.min(100, Math.round(DB.hydrationToday/DB.hydrationGoal*100));
  const pendentes = DB.medications.filter(m=>!m.tomado);
  const proximo = DB.agenda.slice().sort((a,b)=>a.data.localeCompare(b.data))[0];
  openModal(`
    <div class="modal-head"><h3>Visão do cuidador</h3><button class="close-btn" onclick="closeModal()">${icon('x')}</button></div>
    <p style="font-size:13.5px;color:var(--ink-soft);margin:-6px 0 18px;line-height:1.5;">É isso que um cuidador vinculado vê ao acompanhar ${DB.auth.nome.split(' ')[0]} remotamente — só indicadores, sem poder editar nada.</p>

    <div class="list">
      <div class="list-item">
        <div class="list-item-icon" style="background:${pct>=100?'var(--success-light)':'var(--primary-light)'};color:${pct>=100?'var(--success)':'var(--primary-dark)'};">${icon('droplet')}</div>
        <div class="list-item-body">
          <p class="list-item-title">Hidratação hoje</p>
          <p class="list-item-sub">${DB.hydrationToday} ml de ${DB.hydrationGoal} ml (${pct}%)</p>
        </div>
        ${pct<70 ? `<span class="chip chip-alert">Atenção</span>` : `<span class="chip chip-success">OK</span>`}
      </div>
      <div class="list-item">
        <div class="list-item-icon" style="background:${pendentes.length?'var(--warn-light)':'var(--success-light)'};color:${pendentes.length?'var(--warn)':'var(--success)'};">${icon('pill')}</div>
        <div class="list-item-body">
          <p class="list-item-title">Medicamentos</p>
          <p class="list-item-sub">${DB.medications.length-pendentes.length} de ${DB.medications.length} tomados hoje</p>
        </div>
        ${pendentes.length ? `<span class="chip chip-warn">${pendentes.length} pendente${pendentes.length>1?'s':''}</span>` : `<span class="chip chip-success">Em dia</span>`}
      </div>
      <div class="list-item">
        <div class="list-item-icon" style="background:var(--primary-light);color:var(--primary-dark);">${icon('calendar')}</div>
        <div class="list-item-body">
          <p class="list-item-title">Próximo compromisso</p>
          <p class="list-item-sub">${proximo ? proximo.titulo+' · '+formatDateShort(proximo.data)+' às '+proximo.hora : 'Nada agendado'}</p>
        </div>
      </div>
    </div>

    <div class="auth-hint" style="margin-top:18px;">Na versão oficial, o cuidador recebe esse painel por um acesso próprio (via convite por e-mail) e alertas automáticos conforme configurado.</div>
  `);
}

function openAddCaregiver(){
  openModal(`
    <div class="modal-head"><h3>Adicionar cuidador</h3><button class="close-btn" onclick="closeModal()">${icon('x')}</button></div>
    <p style="font-size:13.5px;color:var(--ink-soft);margin:-6px 0 18px;line-height:1.5;">Enviaremos um convite por e-mail. Quando aceito, essa pessoa poderá acompanhar seus indicadores.</p>

    <div class="field"><label for="cgNome">Nome do cuidador</label><input id="cgNome" placeholder="Ex: Marcos Pereira"></div>
    <div class="field"><label for="cgEmail">E-mail</label><input id="cgEmail" type="email" placeholder="cuidador@email.com"></div>
    <div class="field">
      <label for="cgParentesco">Parentesco</label>
      <select id="cgParentesco" style="width:100%;padding:13px 14px;border-radius:10px;border:1.5px solid var(--line);font-size:15px;background:#F8FAFC;">
        <option>Filho(a)</option>
        <option>Cônjuge</option>
        <option>Outro familiar</option>
        <option>Cuidador(a) profissional</option>
      </select>
    </div>

    <div class="field">
      <label>Avisar o cuidador quando:</label>
      <div style="display:flex;flex-direction:column;gap:10px;margin-top:6px;">
        <label style="display:flex;align-items:center;gap:10px;font-size:14.5px;font-weight:600;cursor:pointer;">
          <input type="checkbox" id="cgAlertHidratacao" checked style="width:18px;height:18px;"> Não atingir a meta de hidratação do dia
        </label>
        <label style="display:flex;align-items:center;gap:10px;font-size:14.5px;font-weight:600;cursor:pointer;">
          <input type="checkbox" id="cgAlertMedicamentos" checked style="width:18px;height:18px;"> Deixar de tomar um medicamento no horário
        </label>
        <label style="display:flex;align-items:center;gap:10px;font-size:14.5px;font-weight:600;cursor:pointer;">
          <input type="checkbox" id="cgAlertAgenda" style="width:18px;height:18px;"> Compromissos da agenda se aproximando
        </label>
      </div>
    </div>

    <button class="btn-primary" id="confirmCaregiverBtn">Enviar convite</button>
  `);
  document.getElementById('confirmCaregiverBtn').onclick = async ()=>{
    const nome = document.getElementById('cgNome').value.trim();
    const email = document.getElementById('cgEmail').value.trim().toLowerCase();
    const parentesco = document.getElementById('cgParentesco').value;
    if(!nome || !email || !email.includes('@')){ showToast('Preencha nome e um e-mail válido'); return; }
    if(DB.caregivers.some(c=>c.email.toLowerCase()===email)){ showToast('Esse e-mail já está vinculado'); return; }
    const alertas = {
      hidratacao: document.getElementById('cgAlertHidratacao').checked,
      medicamentos: document.getElementById('cgAlertMedicamentos').checked,
      agenda: document.getElementById('cgAlertAgenda').checked,
    };
    closeModal();
    try{
      const { data, offline } = await api.addCaregiver(DB.auth.id, {
        nome, email, parentesco, status:'pendente',
        alerta_hidratacao: alertas.hidratacao,
        alerta_medicamentos: alertas.medicamentos,
        alerta_agenda: alertas.agenda,
      });
      DB.caregivers.push({ id: data?.id || 'temp-'+Date.now(), nome, email, parentesco, status:'pendente', alertas });
      renderPage();
      showToast(offline ? 'Cuidador salvo (convite será enviado ao sincronizar)' : 'Convite enviado para '+email, offline?'wifiOff':'check');
    }catch(err){ showToast('Não foi possível salvar o cuidador'); }
  };
}

/* ---------- SHARED PAGE EVENT BINDING ---------- */
function bindPageEvents(){
  document.querySelectorAll('[data-route]').forEach(el=>{
    el.onclick = ()=>{ route = el.getAttribute('data-route'); render(); };
  });
  const homeHydroCard = document.getElementById('homeHydroCard');
  if(homeHydroCard) homeHydroCard.onclick = ()=>{ hidratacaoTab='historico'; route='hidratacao'; render(); };
  document.querySelectorAll('[data-add-water]').forEach(el=>{
    el.onclick = ()=> addWater(parseInt(el.getAttribute('data-add-water'),10));
  });
  const customBtn = document.getElementById('customWaterBtn');
  if(customBtn) customBtn.onclick = openAddHydration;

  document.querySelectorAll('[data-hid-tab]').forEach(el=>{
    el.onclick = ()=>{ hidratacaoTab = el.getAttribute('data-hid-tab'); renderPage(); };
  });
  document.querySelectorAll('[data-periodo]').forEach(el=>{
    el.onclick = ()=>{ historicoPeriodo = el.getAttribute('data-periodo'); renderPage(); };
  });

  document.querySelectorAll('[data-del-water]').forEach(el=>{
    el.onclick = async ()=>{
      const id = el.getAttribute('data-del-water');
      const item = DB.hydrationLog.find(r=>r.id===id);
      if(item){ DB.hydrationToday = Math.max(0, DB.hydrationToday-item.ml); }
      DB.hydrationLog = DB.hydrationLog.filter(r=>r.id!==id);
      renderPage();
      try{ await api.deleteHydration(id, DB.auth.id); }catch{ showToast('Não sincronizado, tente de novo mais tarde'); }
    };
  });

  document.querySelectorAll('[data-toggle-med]').forEach(el=>{
    el.onclick = async ()=>{
      const id = el.getAttribute('data-toggle-med');
      const m = DB.medications.find(x=>x.id===id);
      if(!m) return;
      m.tomado = !m.tomado; renderPage();
      showToast(m.tomado?'Marcado como tomado':'Marcado como pendente','check');
      try{ await api.toggleMedication(id, DB.auth.id, m.tomado); }
      catch{ m.tomado = !m.tomado; renderPage(); showToast('Não foi possível salvar, tente de novo'); }
    };
  });
  document.querySelectorAll('[data-del-med]').forEach(el=>{
    el.onclick = async ()=>{
      const id = el.getAttribute('data-del-med');
      DB.medications = DB.medications.filter(m=>m.id!==id);
      renderPage();
      try{ await api.deleteMedication(id, DB.auth.id); }catch{ showToast('Não sincronizado, tente de novo mais tarde'); }
    };
  });
  const addMedTop = document.getElementById('addMedTopBtn');
  if(addMedTop) addMedTop.onclick = openAddMedication;

  document.querySelectorAll('[data-cal-day]').forEach(el=>{
    el.onclick = ()=>{ calSelected = el.getAttribute('data-cal-day'); renderPage(); };
  });
  const calPrev = document.getElementById('calPrev');
  const calNext = document.getElementById('calNext');
  if(calPrev) calPrev.onclick = ()=>{ calCursor.setMonth(calCursor.getMonth()-1); renderPage(); };
  if(calNext) calNext.onclick = ()=>{ calCursor.setMonth(calCursor.getMonth()+1); renderPage(); };
  document.querySelectorAll('[data-del-event]').forEach(el=>{
    el.onclick = async ()=>{
      const id = el.getAttribute('data-del-event');
      DB.agenda = DB.agenda.filter(e=>e.id!==id);
      renderPage();
      try{ await api.deleteAgendaEvent(id, DB.auth.id); }catch{ showToast('Não sincronizado, tente de novo mais tarde'); }
    };
  });

  const simpleToggle = document.getElementById('simpleModeToggle');
  if(simpleToggle) simpleToggle.onchange = async ()=>{
    DB.simpleMode = simpleToggle.checked;
    if(DB.simpleMode && route==='agenda') route='home';
    render();
    showToast(DB.simpleMode? 'Modo simples ativado' : 'Modo simples desativado', 'check');
    try{ await api.updateProfile(DB.auth.id, { modo_simples: DB.simpleMode }); }catch{}
  };

  const editGoalRow = document.getElementById('editGoalRow');
  if(editGoalRow) editGoalRow.onclick = ()=>{
    openModal(`
      <div class="modal-head"><h3>Meta de hidratação</h3><button class="close-btn" onclick="closeModal()">${icon('x')}</button></div>
      <div class="field"><label for="goalInput">Meta diária (ml)</label><input id="goalInput" type="number" value="${DB.hydrationGoal}"></div>
      <button class="btn-primary" id="saveGoalBtn">Salvar</button>
    `);
    document.getElementById('saveGoalBtn').onclick = async ()=>{
      const val = parseInt(document.getElementById('goalInput').value,10);
      if(!val || val<=0){ showToast('Informe um valor válido'); return; }
      DB.hydrationGoal = val; closeModal(); renderPage();
      try{
        const { offline } = await api.updateProfile(DB.auth.id, { meta_hidratacao_ml: val });
        showToast(offline ? 'Meta salva (será sincronizada)' : 'Meta atualizada', offline?'wifiOff':'check');
      }catch{ showToast('Não foi possível salvar a meta'); }
    };
  };

  const editProfileBtn = document.getElementById('editProfileBtn');
  if(editProfileBtn) editProfileBtn.onclick = ()=>{
    openModal(`
      <div class="modal-head"><h3>Editar dados</h3><button class="close-btn" onclick="closeModal()">${icon('x')}</button></div>
      <div class="field"><label for="pNome">Nome</label><input id="pNome" value="${DB.auth.nome}"></div>
      <p style="font-size:12.5px;color:var(--ink-soft);margin-top:-8px;">O e-mail de login é <strong>${DB.auth.email}</strong> e não pode ser trocado por aqui.</p>
      <button class="btn-primary" id="savePBtn">Salvar alterações</button>
    `);
    document.getElementById('savePBtn').onclick = async ()=>{
      const nome = document.getElementById('pNome').value.trim();
      if(!nome){ showToast('Preencha o nome'); return; }
      DB.auth.nome = nome;
      closeModal(); render();
      try{
        const { offline } = await api.updateProfile(DB.auth.id, { nome });
        showToast(offline ? 'Nome salvo (será sincronizado)' : 'Dados atualizados', offline?'wifiOff':'check');
      }catch{ showToast('Não foi possível salvar'); }
    };
  };

  const emergencyRow = document.getElementById('emergencyRow');
  if(emergencyRow) emergencyRow.onclick = ()=>{
    openModal(`
      <div class="modal-head"><h3>Contato de emergência</h3><button class="close-btn" onclick="closeModal()">${icon('x')}</button></div>
      <p style="font-size:14.5px;color:var(--ink-soft);line-height:1.5;">Em uma situação de emergência, entre em contato com o serviço de urgência mais próximo ou ligue para o SAMU.</p>
      <a href="tel:192" class="btn-primary" style="display:block;text-align:center;text-decoration:none;background:var(--alert);">Ligar para 192 (SAMU)</a>
    `);
  };

  const addCaregiverBtn = document.getElementById('addCaregiverBtn');
  if(addCaregiverBtn) addCaregiverBtn.onclick = openAddCaregiver;

  const previewCaregiverBtn = document.getElementById('previewCaregiverBtn');
  if(previewCaregiverBtn) previewCaregiverBtn.onclick = openCaregiverPreview;

  document.querySelectorAll('[data-del-caregiver]').forEach(el=>{
    el.onclick = async ()=>{
      const id = el.getAttribute('data-del-caregiver');
      const c = DB.caregivers.find(x=>x.id===id);
      DB.caregivers = DB.caregivers.filter(x=>x.id!==id);
      renderPage();
      if(c) showToast('Acesso de '+c.nome.split(' ')[0]+' removido');
      try{ await api.deleteCaregiver(id, DB.auth.id); }catch{ showToast('Não sincronizado, tente de novo mais tarde'); }
    };
  });

  const logoutRow = document.getElementById('logoutRow');
  if(logoutRow) logoutRow.onclick = ()=>{
    openModal(`
      <div class="modal-head"><h3>Sair da conta</h3><button class="close-btn" onclick="closeModal()">${icon('x')}</button></div>
      <p style="font-size:14.5px;color:var(--ink-soft);">Tem certeza que deseja sair?</p>
      <div class="btn-row">
        <button class="btn-secondary" onclick="closeModal()">Cancelar</button>
        <button class="btn-primary" style="background:var(--alert);" id="confirmLogout">Sair</button>
      </div>
    `);
    document.getElementById('confirmLogout').onclick = async ()=>{
      await api.signOut();
      DB.auth = null; route='home'; closeModal(); render();
    };
  };
}

/* ---------- INIT ---------- */
// closeModal é referenciada via onclick="closeModal()" no HTML gerado acima.
// Como este arquivo é um <script type="module">, funções não ficam globais
// por padrão — por isso expomos explicitamente no window.
window.closeModal = closeModal;

(async function init(){
  if(!supabaseConfigured){ render(); return; }
  try{
    const session = await api.getSession();
    if(session){
      DB.auth = { id: session.user.id, nome:'', email: session.user.email };
      await loadAllData();
      route = 'home';
    }
  }catch(err){
    console.warn('Não foi possível restaurar a sessão', err);
  }
  render();
  api.attemptSync(()=>{});
})();
