<template>
  <article :class="['message', role]">
    <div class="message-content" :class="role === 'user' ? 'user-message' : 'assistant-message'">
      <slot>{{ content }}</slot>
    </div>
    <time v-if="created_at" class="msg-time">{{ formattedTime }}</time>
  </article>
</template>

<script setup>
import { computed } from 'vue';
const props = defineProps({ role: { type: String, default: 'assistant' }, content: { type: [String, Object], default: '' }, created_at: { type: String, default: '' } });
const formattedTime = computed(() => {
  if (!props.created_at) return '';
  try { const dt = new Date(props.created_at); return dt.toLocaleTimeString(); } catch (e) { return props.created_at; }
});
</script>

<style scoped>
.message { display:flex; flex-direction:column; gap:6px; }
.message-content { max-width: 70%; padding: 10px 14px; border-radius: 16px; }
.user-message { align-self: flex-end; background-color:#4f46e5; color: #fff; }
.assistant-message { align-self: flex-start; background-color:#e5e7eb; color: #111827; }
.msg-time { font-size: 10px; opacity: 0.6; }
</style>
