<template>
  <aside :class="['chat-sidebar', { 'mobile-open': showSidebar }]" ref="sidebar">
    <div class="sidebar-header">
      <h3>Conversas</h3>
      <div class="actions">
        <button @click="onNewConversation" class="btn-small">Nova conversa</button>
        <button @click="reload" class="btn-small">Recarregar</button>
      </div>
    </div>

    <ul class="sessions-list">
      <li v-for="session in sessions" :key="session.id" :class="{ selected: session.id === selectedSession }">
        <div class="session-left" @click="select(session)">
          <div class="session-title">{{ session.title || ('Conversa ' + session.id) }}</div>
          <div class="session-snippet">{{ session.last_message?.content ? truncate(session.last_message.content, 70) : '' }}</div>
        </div>
        <div class="session-right">
          <div class="session-meta">{{ timeAgo(session.updated_at) }}</div>
          <div class="session-actions">
            <button class="action" @click.stop="onRename(session)">Renomear</button>
            <button class="action delete" @click.stop="onDelete(session)">Excluir</button>
          </div>
        </div>
      </li>
    </ul>
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
.chat-sidebar {
  width: 100%;
  max-width: 320px;
  background: #1e1e1e;
  color: #f0f0f0;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  box-sizing: border-box;
  transition: transform 0.3s ease, opacity 0.3s ease;
  overflow-x: hidden;
}

/* Header */
.sidebar-header { display:flex; justify-content:space-between; align-items:center; gap:8px; }
.sidebar-header h3 { font-size:18px; font-weight:700; color:#d0e900; }
.actions { display:flex; gap:6px; }
.btn-small {
  background:#d0e900; color:#111; padding:6px 10px; border-radius:6px; border:none; cursor:pointer; font-weight:600; transition: transform 0.15s, box-shadow 0.15s;
}
.btn-small:hover { transform:translateY(-2px); box-shadow:0 4px 8px rgba(208,233,0,0.4); }

/* Lista sessões */
.sessions-list { margin-top:10px; padding:0; list-style:none; display:flex; flex-direction:column; gap:8px; }
.sessions-list li {
  padding:12px;
  border-radius:10px;
  cursor:pointer;
  display:flex;
  justify-content:space-between;
  background:#222;
  transition: background 0.2s, transform 0.15s;
  word-break: break-word; /* evita overflow horizontal */
}
.sessions-list li:hover { background:#2a2a2a; transform:translateX(2px); }
.sessions-list li.selected { background:linear-gradient(90deg,#2a2a2a,#1f1f1f); border-left:4px solid #d0e900; }
.session-title { font-weight:600; color:#d0e900; }
.session-snippet { font-size:13px; color:#ccc; margin-top:2px; word-break: break-word; }
.session-meta { font-size:11px; color:#888; text-align:right; }
.session-actions { display:flex; gap:4px; margin-top:4px; flex-wrap: wrap; }
.action { background:transparent; border:1px solid #555; padding:2px 6px; border-radius:4px; font-size:11px; color:#ccc; cursor:pointer; transition: all 0.15s; }
.action:hover { color:#d0e900; border-color:#d0e900; }
.action.delete:hover { color:#ff4d4d; border-color:#ff4d4d; }

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
}
</style>
