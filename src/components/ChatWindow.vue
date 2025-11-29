<template>
  <div class="chat-window">
    <div class="chat-history" ref="chatHistory">
      <div v-for="(msg, index) in messages" :key="index">
        <MessageBubble 
          :role="msg.role" 
          :content="msg.type === 'card' ? formatCard(msg.card) : msg.content" 
          :created_at="msg.created_at"
        />
      </div>

      <div v-if="chatStore.sending" class="typing-indicator">
        IA está escrevendo<span class="dot">.</span><span class="dot">.</span><span class="dot">.</span>
      </div>
    </div>

    <form class="chat-composer" @submit.prevent="onSubmit">
      <textarea 
        v-model="input" 
        :disabled="chatStore.sending" 
        @keydown.enter.exact.prevent="onEnter" 
        @keydown.enter.shift.stop
        placeholder="Escreva sua mensagem..."
      ></textarea>
      <div class="composer-actions">
        <button type="submit" :disabled="chatStore.sending">{{ chatStore.sending ? '...' : '>' }}</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, nextTick, onMounted } from 'vue';
import MessageBubble from './MessageBubble.vue';
import { useChatStore } from '@/stores/chatStore';

const chatStore = useChatStore();
const input = ref('');
const messages = computed(() => chatStore.messages);
const chatHistory = ref(null);

function scrollToBottom() {
  nextTick(() => {
    if (chatHistory.value) chatHistory.value.scrollTop = chatHistory.value.scrollHeight;
  });
}

onMounted(() => scrollToBottom());

async function onSubmit() {
  if (!input.value.trim()) return;
  const txt = input.value;
  input.value = '';
  await chatStore.sendMessage(txt, chatStore.selectedSession);
  scrollToBottom();
}

function onEnter() { onSubmit(); }

// Formata cards como Markdown - CORRIGIDO
function formatCard(card) {
  if (!card) return '';
  
  let result = '';
  
  // Detecta se é um plano real ou apenas conversa
  const isDietaPlan = card.dieta && (
    card.dieta.length > 150 || // Planos são longos
    card.dieta.toLowerCase().includes('refeição') ||
    card.dieta.toLowerCase().includes('café da manhã') ||
    card.dieta.toLowerCase().includes('almoço') ||
    card.dieta.toLowerCase().includes('calorias') ||
    card.dieta.toLowerCase().includes('kcal')
  );
  
  const isTreinoPlan = card.treino && (
    card.treino.length > 150 || // Planos são longos
    card.treino.toLowerCase().includes('série') ||
    card.treino.toLowerCase().includes('repetições') ||
    card.treino.toLowerCase().includes('exercício') ||
    card.treino.toLowerCase().includes('treino')
  );
  
  // Só adiciona título "Treino" se for realmente um plano
  if (card.treino && card.treino.trim()) {
    if (isTreinoPlan) {
      result += `**Treino**\n${card.treino}\n\n`;
    } else {
      result += `${card.treino}\n\n`;
    }
  }
  
  // Só adiciona título "Dieta" se for realmente um plano
  if (card.dieta && card.dieta.trim()) {
    if (isDietaPlan) {
      result += `**Dieta**\n${card.dieta}`;
    } else {
      result += `${card.dieta}`;
    }
  }
  
  return result.trim();
}
</script>

<style scoped>
.chat-window {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #252525;
  color: #f0f0f0;
  width: 100%;
  overflow-x: hidden;
}

.chat-history {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  scroll-behavior: smooth;
  box-sizing: border-box;
}

/* Scroll personalizado */
.chat-history::-webkit-scrollbar {
  width: 8px;
}
.chat-history::-webkit-scrollbar-track {
  background: #1e1e1e;
}
.chat-history::-webkit-scrollbar-thumb {
  background: #22ff99;
  border-radius: 4px;
}
.chat-history::-webkit-scrollbar-thumb:hover {
  background: #00ff55;
}

/* Compositor de mensagens */
.chat-composer {
  display: flex;
  gap: 10px;
  padding: 12px;
  border-top: 1px solid rgba(255,255,255,0.05);
  background: #2a2a2a;
  align-items: center;
}

textarea {
  flex: 1;
  min-height: 50px;
  background: #1e1e1e;
  color: #f0f0f0;
  border: 1px solid #374151;
  padding: 10px;
  width: 95%;
  border-radius: 10px;
  resize: none;
  font-size: 14px;
  transition: border-color 0.2s;
}
textarea:focus {
  border-color: #22ff99;
  outline: none;
}

.composer-actions button {
  background: #22ff99;
  color: #111;
  border: none;
  border-radius: 20px;
  padding: 8px 14px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.15s, box-shadow 0.15s;
}
.composer-actions button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(34,255,153,0.4);
}
button[disabled] {
  opacity: 0.6;
  cursor: not-allowed;
}

.typing-indicator {
  font-size: 13px;
  color: #9ca3af;
  padding: 6px 10px;
  display: flex;
  gap: 2px;
}
.typing-indicator .dot {
  animation: blink 1s infinite;
}
.typing-indicator .dot:nth-child(2) { animation-delay: 0.15s; }
.typing-indicator .dot:nth-child(3) { animation-delay: 0.3s; }
@keyframes blink { 0%{opacity:0.2}50%{opacity:1}100%{opacity:0.2} }

/* Responsividade */
@media (max-width: 768px) {
  .chat-composer {
    flex-direction: column;
    gap: 8px;
  }
  .composer-actions button {
    width: 100%;
  }
}
</style>