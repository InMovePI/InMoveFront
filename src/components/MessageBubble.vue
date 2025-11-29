<template>
  <article :class="['message', role]">
    <!-- Usuário -->
    <div v-if="role === 'user'" class="message-content user-message">
      {{ content }}
    </div>

    <!-- Assistente -->
    <div v-else class="message-content assistant-message" v-html="formattedContent"></div>

    <time v-if="created_at" class="msg-time">{{ formattedTime }}</time>
  </article>
</template>

<script setup>
import { computed } from 'vue';
import MarkdownIt from 'markdown-it';

const md = new MarkdownIt({ linkify: true });

const props = defineProps({
  role: { type: String, default: 'assistant' },
  content: { type: String, default: '' },
  created_at: { type: String, default: '' }
});

const formattedContent = computed(() => md.render(props.content || ''));

const formattedTime = computed(() => {
  if (!props.created_at) return '';
  try {
    const dt = new Date(props.created_at);
    return dt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } catch (e) {
    return props.created_at;
  }
});
</script>

<style scoped>
.message {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.message-content {
  max-width: 100%;
  padding: 12px 16px;
  border-radius: 16px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;
  white-space: pre-wrap;
  box-sizing: border-box;
  transition: transform 0.15s, box-shadow 0.15s;
}

/* Usuário → direita */
.user-message {
  align-self: flex-end;
  background: linear-gradient(135deg, #22ff99, #00ff55);
  color: #111827;
  box-shadow: 0 2px 8px rgba(34, 255, 153, 0.3);
}
.user-message:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(34, 255, 153, 0.5);
}

/* Assistente → esquerda */
.assistant-message {
  align-self: flex-start;
  background-color: #1e1e1e;
  color: #f0f0f0;
  box-shadow: 0 2px 6px rgba(0,0,0,0.3);
}
.assistant-message:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0,0,0,0.4);
}

/* Markdown */
.assistant-message a { color:#22ff99; text-decoration: underline; }
.assistant-message strong { color:#22ff99; }
.assistant-message em { font-style: italic; }

.msg-time {
  font-size: 10px;
  opacity: 0.6;
  color: #9ca3af;
  align-self: flex-end;
}

/* Responsividade */
@media(max-width:768px){
  .message-content{
    max-width:85%;
    padding:10px 14px;
    font-size:13px;
  }
}
</style>
