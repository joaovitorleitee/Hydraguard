// ============================================================
// Fila offline — equivalente web do offlineQueueService/syncService
// que existem no app mobile (lá usam AsyncStorage, aqui usamos
// localStorage porque é um site rodando no navegador).
// ============================================================
const QUEUE_KEY = 'hydraguard_pending_ops';

export function getQueue(){
  try { return JSON.parse(localStorage.getItem(QUEUE_KEY)) || []; }
  catch { return []; }
}

export function pushToQueue(op){
  const queue = getQueue();
  queue.push({ ...op, id: crypto.randomUUID(), queuedAt: new Date().toISOString() });
  localStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
}

export function clearFromQueue(id){
  const queue = getQueue().filter(op => op.id !== id);
  localStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
}

export function queueSize(){
  return getQueue().length;
}

// op = { table: 'hidratacao', action: 'insert'|'update'|'delete', payload, match }
export async function trySync(supabase, onProgress){
  if(!navigator.onLine || !supabase) return;
  const queue = getQueue();
  for(const op of queue){
    try {
      let query = supabase.from(op.table);
      if(op.action==='insert') await query.insert(op.payload);
      else if(op.action==='update') await query.update(op.payload).match(op.match);
      else if(op.action==='delete') await query.delete().match(op.match);
      clearFromQueue(op.id);
      if(onProgress) onProgress();
    } catch (e) {
      // Se ainda falhar (ex: continua sem internet de verdade), para e tenta de novo depois
      console.warn('Falha ao sincronizar operação pendente, tentando de novo mais tarde', e);
      break;
    }
  }
}
