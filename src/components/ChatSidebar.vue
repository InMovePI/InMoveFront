<template>
  <aside :class="['chat-sidebar', { 'mobile-open': showSidebar } ]" ref="sidebar">
    <div class="sidebar-header">
      <div class="title-block">
        <span class="pulse-dot" aria-hidden="true"></span>
        <div>
          <h3>Conversas</h3>
          <p>{{ sessionCount }} ativa{{ sessionCount === 1 ? '' : 's' }}</p>
        </div>
      </div>
      <div class="header-actions">
        <button @click="onNewConversation" class="primary">Nova conversa</button>
        <button @click="reload" class="ghost">Recarregar</button>
      </div>
    </div>

    <div class="sessions-wrapper" role="navigation" aria-label="Histórico de conversas">
      <ul class="sessions-list" v-if="sessionCount">
        <li v-for="session in sessions" :key="session.id" :class="{ selected: session.id === selectedSession }">
          <div class="session-left" @click="select(session)">
            <div class="session-title">{{ session.title || ('Conversa ' + session.id) }}</div>
            <div class="session-snippet">{{ session.last_message?.content ? truncate(session.last_message.content, 70) : 'Sem mensagens ainda' }}</div>
          </div>
          <div class="session-right">
            <div class="session-meta">Atualizado {{ timeAgo(session.updated_at) }}</div>
            <div class="session-actions">
              <button class="action" @click.stop="onRename(session)">Renomear</button>
              <button class="action delete" @click.stop="onDelete(session)">Excluir</button>
            </div>
          </div>
        </li>
      </ul>

      <div v-else class="empty-state">
        <p>Nenhuma conversa ainda.</p>
        <button @click="onNewConversation">Criar primeira conversa</button>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { computed, inject, ref, onMounted, onBeforeUnmount } from 'vue';
import { useChatStore } from '@/stores/chatStore';

const showSidebar = inject('showSidebar');
const toggleSidebar = inject('toggleSidebar');

const sidebar = ref(null);

const chatStore = useChatStore();
const sessions = computed(() => chatStore.sessions || []);
const selectedSession = computed(() => chatStore.selectedSession);
const sessionCount = computed(() => sessions.value.length);

function truncate(text, n) { if (!text) return ''; return text.length>n?text.slice(0,n)+'...':text; }
function timeAgo(iso){ if(!iso)return''; const d=new Date(iso); return d.toLocaleString(); }

async function onNewConversation(){ await chatStore.createSession(); if(toggleSidebar) toggleSidebar(false); }
async function select(session){ await chatStore.loadSessionMessages(session.id); if(toggleSidebar) toggleSidebar(false); }
async function onRename(session){ const newTitle=prompt('Novo título da conversa', session.title||`Conversa ${session.id}`); if(!newTitle)return; await chatStore.renameSession(session.id,newTitle); }
async function onDelete(session){ if(!confirm('Tem certeza que deseja excluir esta conversa?'))return; await chatStore.deleteSession(session.id); }
async function reload(){ await chatStore.loadSessions(); }

// Swipe mobile
let startX = 0;
function onTouchStart(e){ startX = e.touches[0].clientX; }
function onTouchMove(e){ 
  const diff = e.touches[0].clientX - startX; 
  if(diff < -80 && toggleSidebar) toggleSidebar(false); 
}
onMounted(() => {
  if(sidebar.value){
    sidebar.value.addEventListener('touchstart', onTouchStart);
    sidebar.value.addEventListener('touchmove', onTouchMove);
  }
});
onBeforeUnmount(() => {
  if(sidebar.value){
    sidebar.value.removeEventListener('touchstart', onTouchStart);
    sidebar.value.removeEventListener('touchmove', onTouchMove);
  }
});
</script>

<style scoped>
/* Base */
.chat-sidebar {
  --accent: rgb(206, 233, 4);
  --accent-soft: rgba(206, 233, 4, 0.12);
  width: 100%;
  max-width: 360px;
  background: linear-gradient(135deg, rgba(30,30,30,0.95), rgba(18,18,18,0.95));
  border-right: 1px solid rgba(255,255,255,0.04);
  color: #f0f0f0;
  padding: 22px 20px 18px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-sizing: border-box;
  transition: transform 0.3s ease, opacity 0.3s ease;
  overflow: hidden;
  backdrop-filter: blur(12px);
}

/* Header */
.sidebar-header {
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}

.title-block {
  display: flex;
  align-items: center;
  gap: 10px;
}

.pulse-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 12px var(--accent);
  animation: pulse 1.8s infinite;
}

.sidebar-header h3 {
  margin: 0;
  font-size: 20px;
  font-weight: 800;
}

.sidebar-header p {
  margin: 0;
  font-size: 13px;
  opacity: 0.75;
}

.header-actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.header-actions button {
  border-radius: 999px;
  padding: 8px 14px;
  border: 1px solid transparent;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.header-actions button.primary {
  background: var(--accent);
  color: #1a1a1a;
  box-shadow: 0 10px 20px rgba(206,233,4,0.25);
}

.header-actions button.ghost {
  background: transparent;
  color: #f0f0f0;
  border-color: rgba(255,255,255,0.15);
}

.header-actions button:hover {
  transform: translateY(-1px);
}

/* Sessions */
.sessions-wrapper {
  flex: 1;
  overflow-y: auto;
  padding-right: 6px;
}

.sessions-wrapper::-webkit-scrollbar { width: 6px; }
.sessions-wrapper::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.12); border-radius: 10px; }

.sessions-list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.sessions-list li {
  display: flex;
  gap: 12px;
  justify-content: space-between;
  padding: 14px;
  border-radius: 16px;
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.04);
  cursor: pointer;
  transition: border-color 0.2s ease, transform 0.15s ease, background 0.2s ease;
  word-break: break-word;
}

.sessions-list li:hover {
  border-color: var(--accent);
  background: rgba(206,233,4,0.05);
  transform: translateX(3px);
}

.sessions-list li.selected {
  border-color: var(--accent);
  background: rgba(206,233,4,0.08);
  box-shadow: 0 10px 24px rgba(0,0,0,0.45);
}

.session-title {
  font-weight: 700;
  color: var(--accent);
  font-size: 15px;
}

.session-snippet {
  font-size: 13px;
  color: #cfcfcf;
  margin-top: 4px;
}

.session-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
  min-width: 120px;
}

.session-meta {
  font-size: 12px;
  color: #9ca3af;
}

.session-actions {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.session-actions .action {
  background: transparent;
  border: 1px solid rgba(255,255,255,0.2);
  color: #f0f0f0;
  border-radius: 999px;
  padding: 4px 10px;
  font-size: 11px;
  cursor: pointer;
  transition: border-color 0.15s ease, color 0.15s ease;
}

.session-actions .action:hover {
  border-color: var(--accent);
  color: var(--accent);
}

.session-actions .action.delete:hover {
  border-color: #ff5f5f;
  color: #ff5f5f;
}

.empty-state {
  margin-top: 40px;
  text-align: center;
  color: #b5b5b5;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.empty-state button {
  align-self: center;
  padding: 10px 18px;
  border-radius: 999px;
  border: none;
  background: var(--accent);
  color: #111;
  font-weight: 700;
  cursor: pointer;
}

@keyframes pulse {
  0% { box-shadow: 0 0 0 rgba(206,233,4,0.4); }
  70% { box-shadow: 0 0 18px rgba(206,233,4,0); }
  100% { box-shadow: 0 0 0 rgba(206,233,4,0); }
}

/* Mobile */
@media (max-width:768px){
  .chat-sidebar {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    max-width: 90%;
    transform: translateX(-100%);
    z-index: 30;
    box-shadow: 2px 0 12px rgba(0,0,0,0.6);
    overflow-y: auto;
    opacity:0;
    display: flex;
    flex-direction: column;
  }
  .chat-sidebar.mobile-open {
    transform: translateX(0);
    opacity:1;
  }
  .sidebar-header { flex-direction: column; align-items: flex-start; }
  .header-actions { width: 100%; }
  .header-actions button { flex: 1; justify-content: center; }
  .sessions-wrapper { padding-right: 0; }
}
</style>
