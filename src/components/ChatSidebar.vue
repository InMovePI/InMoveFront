<template>
  <aside class="chat-sidebar">
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
import { computed } from 'vue';
import { useChatStore } from '@/stores/chatStore';
import { useRouter } from 'vue-router';

const chatStore = useChatStore();
const sessions = computed(() => chatStore.sessions || []);
const selectedSession = computed(() => chatStore.selectedSession);

function truncate(text, n) {
  if (!text) return '';
  return text.length > n ? text.slice(0, n) + '...' : text;
}

function timeAgo(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  return d.toLocaleString();
}

async function onNewConversation() {
  await chatStore.createSession();
}

async function select(session) {
  await chatStore.loadSessionMessages(session.id);
}

async function onRename(session) {
  const newTitle = prompt('Novo título da conversa', session.title || `Conversa ${session.id}`);
  if (!newTitle) return;
  await chatStore.renameSession(session.id, newTitle);
}

async function onDelete(session) {
  if (!confirm('Tem certeza que deseja excluir esta conversa?')) return;
  await chatStore.deleteSession(session.id);
}

async function reload() {
  await chatStore.loadSessions();
}
</script>

<style scoped>
.chat-sidebar { width: 300px; background: #111; color: #fff; padding: 16px; box-sizing: border-box; }
.sidebar-header { display:flex; justify-content:space-between; align-items:center; gap:8px; }
.sessions-list { margin-top: 10px; padding: 0; list-style: none; }
.sessions-list li { padding: 10px; border-radius: 8px; cursor: pointer; display:flex; flex-direction:column; gap:6px; border:1px solid #222; margin-bottom: 8px; }
.sessions-list li.selected { background: linear-gradient(90deg,#333,#222); }
.session-title { font-weight: 600; }
.session-snippet { font-size: 13px; color: #ddd; }
.session-meta { font-size: 11px; color: #999; }
.btn-small { background: #d0e900; color: #111; padding: 6px 8px; border-radius:6px; border: none; cursor:pointer; }
</style>
