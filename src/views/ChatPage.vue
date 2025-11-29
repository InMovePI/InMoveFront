<template>
  <div class="chat-page">
    <ChatSidebar />
    <ChatWindow />

    <div v-if="toast" class="toast" role="status">{{ toast }}</div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import ChatSidebar from '@/components/ChatSidebar.vue';
import ChatWindow from '@/components/ChatWindow.vue';
import { useChatStore } from '@/stores/chatStore';

const chatStore = useChatStore();
const toast = ref(null);

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
</script>

<style scoped>
.chat-page { display:flex; height: calc(100vh - 64px); }
@media (max-width: 768px) { .chat-page { flex-direction: column; } }
.toast { position: fixed; right: 16px; top: 16px; background: #ff4444; color: white; padding: 8px 12px; border-radius: 6px; z-index: 9999; }
</style>
