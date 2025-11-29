<template>
  <div class="chat-window">
    <header class="chat-header">
      <h3>{{ title }}</h3>
    </header>
    <div class="chat-history" ref="chatHistory">
      <div v-for="(msg, index) in messages" :key="index">
        <MessageBubble :role="msg.role" :content="msg.type === 'card' ? '' : msg.content" :created_at="msg.created_at">
          <template v-if="msg.type === 'card'">
            <div class="card">
              <h4>Treino</h4>
              <p>{{ msg.card.treino }}</p>
              <h4>Dieta</h4>
              <p>{{ msg.card.dieta }}</p>
            </div>
          </template>
          <template v-else>
            {{ msg.content }}
          </template>
        </MessageBubble>
      </div>
      <div v-if="chatStore.sending" class="typing-indicator">IA está escrevendo<span class="dot">.</span><span class="dot">.</span><span class="dot">.</span></div>
    </div>
    <form class="chat-composer" @submit.prevent="onSubmit">
      <textarea v-model="input" :disabled="chatStore.sending" @keydown.enter.exact.prevent="onEnter" @keydown.enter.shift.stop></textarea>
      <div class="composer-actions">
        <button type="submit" :disabled="chatStore.sending">{{ chatStore.sending ? 'Enviando...' : 'Enviar' }}</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, nextTick, onMounted } from 'vue';
import MessageBubble from '@/components/MessageBubble.vue';
import { useChatStore } from '@/stores/chatStore';

const chatStore = useChatStore();
const input = ref('');
const messages = computed(() => chatStore.messages);
const title = computed(() => {
  const s = chatStore.sessions?.find((x) => x.id === chatStore.selectedSession);
  return s?.title || (s ? `Conversa ${s.id}` : 'Nova conversa');
});
const chatHistory = ref(null);

function scrollToBottom() {
  nextTick(() => {
    if (chatHistory.value) chatHistory.value.scrollTop = chatHistory.value.scrollHeight;
  });
}

onMounted(() => {
  scrollToBottom();
});

async function onSubmit() {
  if (!input.value.trim()) return;
  const txt = input.value;
  input.value = '';
  await chatStore.sendMessage(txt, chatStore.selectedSession);
  scrollToBottom();
}

function onEnter() {
  onSubmit();
}
</script>

<style scoped>
.chat-window { flex: 1; display:flex; flex-direction:column; background:#0f1724; color:#fff; }
.chat-header { padding: 12px; border-bottom: 1px solid rgba(255,255,255,0.05); }
.chat-history { flex:1; overflow-y:auto; padding: 12px; display:flex; flex-direction:column; gap: 10px; }
.card { background: #111827; border: 1px solid #374151; padding: 10px; border-radius: 8px; }
.chat-composer { display:flex; gap:8px; padding: 12px; border-top: 1px solid rgba(255,255,255,0.05); }
textarea { flex:1; min-height:48px; background:#0b1220; color:#fff; border:1px solid #1f2937; padding:8px; border-radius:8px; resize:none; }
.composer-actions { display:flex; align-items:center; }
button[disabled] { opacity: 0.6; cursor:not-allowed; }
.typing-indicator { font-size: 13px; color: #9ca3af; padding: 6px 10px; }
.typing-indicator .dot { animation: blink 1s infinite; margin-left: 2px; }
.typing-indicator .dot:nth-child(2) { animation-delay: 0.15s; }
.typing-indicator .dot:nth-child(3) { animation-delay: 0.3s; }
@keyframes blink { 0%{opacity:0.2}50%{opacity:1}100%{opacity:0.2} }
</style>
