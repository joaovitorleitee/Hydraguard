import { supabase, supabaseConfigured } from './supabaseClient.js';
import { pushToQueue, trySync, queueSize } from './offlineQueue.js';

function isNetworkError(err){
  if(!navigator.onLine) return true;
  const msg = (err && err.message || '').toLowerCase();
  return ['network','fetch','offline','unavailable','timeout'].some(k => msg.includes(k));
}

// Executa uma escrita no Supabase; se falhar por rede, guarda na fila offline
// e devolve um resultado "otimista" para a tela continuar funcionando.
async function writeWithFallback({ table, action, payload, match }){
  if(!supabaseConfigured) throw new Error('Supabase não configurado (veja js/config.js)');
  try {
    let query = supabase.from(table);
    let result;
    if(action==='insert') result = await query.insert(payload).select().single();
    else if(action==='update') result = await query.update(payload).match(match).select().single();
    else if(action==='delete') result = await query.delete().match(match);
    if(result.error) throw result.error;
    return { data: result.data, offline: false };
  } catch (err) {
    if(isNetworkError(err)){
      pushToQueue({ table, action, payload, match });
      return { data: { ...match, ...payload }, offline: true };
    }
    throw err;
  }
}

export function attemptSync(onProgress){
  return trySync(supabase, onProgress);
}
export function pendingCount(){ return queueSize(); }

// ---------------- AUTH ----------------
export async function signUp({ nome, email, senha }){
  const { data, error } = await supabase.auth.signUp({ email, password: senha });
  if(error) throw error;
  if(data.user){
    const { error: profileError } = await supabase.from('pacientes').insert({
      id: data.user.id, nome, email,
      meta_hidratacao_diaria: 2000,
      modo_simples: false,
    });
    if(profileError){
      throw new Error('Conta criada, mas não foi possível salvar o perfil: ' + profileError.message);
    }
  }
  return data;
}
export async function signIn({ email, senha }){
  const { data, error } = await supabase.auth.signInWithPassword({ email, password: senha });
  if(error) throw error;
  return data;
}
export async function signOut(){
  await supabase.auth.signOut();
}
export async function getSession(){
  const { data } = await supabase.auth.getSession();
  return data.session;
}
export function onAuthChange(cb){
  return supabase.auth.onAuthStateChange((_event, session) => cb(session));
}

// ---------------- PERFIL ----------------
export async function getProfile(userId){
  const { data, error } = await supabase.from('pacientes').select('*').eq('id', userId).maybeSingle();
  if(error) throw error;
  if(data) return data;

  // Perfil não existe (ex: cadastro antigo que falhou antes da correção).
  // Cria um perfil mínimo agora, usando o e-mail da sessão autenticada.
  const { data: userData } = await supabase.auth.getUser();
  const email = userData?.user?.email || '';
  const { data: created, error: createError } = await supabase.from('pacientes')
    .insert({ id:userId, nome:email.split('@')[0]||'Paciente', email, meta_hidratacao_diaria:2000, modo_simples:false })
    .select().single();
  if(createError) throw new Error('Não foi possível criar seu perfil: ' + createError.message);
  return created;
}
export async function updateProfile(userId, patch){
  return writeWithFallback({ table:'pacientes', action:'update', payload:{ ...patch, atualizado_em:new Date().toISOString() }, match:{ id:userId } });
}

// ---------------- HIDRATAÇÃO ----------------
export async function getHydrationLog(userId, sinceISODate){
  const { data, error } = await supabase.from('hidratacao').select('*')
    .eq('paciente_id', userId).gte('horario', sinceISODate)
    .order('horario', { ascending: true });
  if(error) throw error;
  return data || [];
}
export async function addHydration(userId, quantidade){
  const now = new Date();
  return writeWithFallback({
    table:'hidratacao', action:'insert',
    payload:{ paciente_id:userId, quantidade, horario: now.toISOString(), data: now.toISOString().slice(0,10), sincronizado:true },
  });
}
export async function deleteHydration(id, userId){
  return writeWithFallback({ table:'hidratacao', action:'delete', match:{ id, paciente_id:userId } });
}

// ---------------- MEDICAMENTOS ----------------
export async function getMedications(userId){
  const { data, error } = await supabase.from('medicamentos').select('*').eq('paciente_id', userId).order('horario');
  if(error) throw error;
  return data || [];
}
export async function addMedication(userId, med){
  return writeWithFallback({ table:'medicamentos', action:'insert', payload:{ paciente_id:userId, dias:[], ativo:true, ...med } });
}
export async function toggleMedication(id, userId, tomado){
  return writeWithFallback({ table:'medicamentos', action:'update', payload:{ tomado_hoje: tomado, ultima_atualizacao: new Date().toISOString().slice(0,10) }, match:{ id, paciente_id:userId } });
}
export async function deleteMedication(id, userId){
  return writeWithFallback({ table:'medicamentos', action:'delete', match:{ id, paciente_id:userId } });
}

// ---------------- AGENDA ----------------
export async function getAgenda(userId){
  const { data, error } = await supabase.from('agenda').select('*').eq('paciente_id', userId).order('data');
  if(error) throw error;
  return data || [];
}
export async function addAgendaEvent(userId, ev){
  return writeWithFallback({ table:'agenda', action:'insert', payload:{ paciente_id:userId, concluido:false, ...ev } });
}
export async function deleteAgendaEvent(id, userId){
  return writeWithFallback({ table:'agenda', action:'delete', match:{ id, paciente_id:userId } });
}

// ---------------- CUIDADORES ----------------
export async function getCaregivers(userId){
  const { data, error } = await supabase.from('cuidadores').select('*').eq('paciente_id', userId).order('created_at');
  if(error) throw error;
  return data || [];
}
export async function addCaregiver(userId, caregiver){
  return writeWithFallback({ table:'cuidadores', action:'insert', payload:{ paciente_id:userId, ...caregiver } });
}
export async function deleteCaregiver(id, userId){
  return writeWithFallback({ table:'cuidadores', action:'delete', match:{ id, paciente_id:userId } });
}
