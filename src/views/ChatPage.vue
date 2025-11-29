<template>
  <div class="chat-page">
    <div v-if="showSidebar" class="overlay" @click="toggleSidebar(false)"></div>

    <ChatSidebar />

    <div class="chat-main">
      <div class="chat-mobile-header">
        <button class="hamburger" @click="toggleSidebar(true)">☰</button>
        <h3>{{ chatTitle }}</h3>
      </div>

      <ChatWindow />
    </div>

    <div v-if="toast" class="toast" role="status">{{ toast }}</div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, provide } from 'vue';
import ChatSidebar from '@/components/ChatSidebar.vue';
import ChatWindow from '@/components/ChatWindow.vue';
import { useChatStore } from '@/stores/chatStore';

const chatStore = useChatStore();
const toast = ref(null);
const showSidebar = ref(false);

provide('showSidebar', showSidebar);
provide('toggleSidebar', (v) => showSidebar.value = v);

watch(() => chatStore.errorMessage, (v) => {
  if (v) {
    toast.value = v;
    setTimeout(() => { toast.value = null; chatStore.clearError(); }, 3500);
  }
});

onMounted(async () => {
  await chatStore.loadSessions();
  if (chatStore.sessions?.length) {
    const first = chatStore.sessions[0];
    await chatStore.loadSessionMessages(first.id);
  } else {
    await chatStore.createSession();
  }
});

function toggleSidebar(open){ showSidebar.value = open; }

const chatTitle = computed(() => {
  const s = chatStore.sessions?.find(x => x.id === chatStore.selectedSession);
  return s?.title || (s ? `Conversa ${s.id}` : 'Nova conversa');
});
</script>

<style scoped>
.chat-page { display:flex; height:100vh; overflow:hidden; }

.chat-sidebar { width:320px; flex-shrink:0; }

.chat-main { flex:1; display:flex; flex-direction:column; overflow:hidden; }

.chat-mobile-header { display:none; align-items:center; padding:12px 16px; background:#2a2a2a; border-bottom:1px solid rgba(255,255,255,0.05); gap:12px; }
.chat-mobile-header h3 { color:#22ff99; font-weight:700; margin:0; font-size:18px; }
.hamburger { font-size:24px; background:transparent; border:none; color:#22ff99; cursor:pointer; }

.overlay { position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.5); z-index:20; }

@media(max-width:768px){
  .chat-page { flex-direction:column; }
  .chat-mobile-header { display:flex; }
  .chat-sidebar { position:fixed; top:0; left:0; max-width:90%; transform:translateX(-100%); z-index:30; box-shadow:2px 0 12px rgba(0,0,0,0.6); overflow-y:auto; transition:transform 0.3s ease, opacity 0.3s ease; }
  .chat-sidebar.mobile-open { transform:translateX(0); opacity:1; }
  .chat-main { flex:1; overflow:hidden; }
}

.toast { position:fixed; right:16px; top:16px; background:#ff4444; color:white; padding:8px 12px; border-radius:6px; z-index:9999; }
</style>
