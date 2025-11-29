import { defineStore } from 'pinia';
import api from '@/services/api';

export const useChatStore = defineStore('chat', {
  state: () => ({
    sessions: [],
    selectedSession: null,
    messages: [],
    sending: false,
    error: null,
    errorMessage: null,
  }),
  actions: {
    /** Load list of sessions (history) */
    async loadSessions() {
      try {
        const res = await api.get('/chat/history/');
        this.sessions = Array.isArray(res.data) ? res.data : [];
      } catch (err) {
        this.error = err;
        console.error('Failed to load chat sessions/history', err);
      }
    },
    async sendMessage(text, sessionId = null) {
      if (!text || this.sending) return;
      this.sending = true;
      this.error = null;
      const userMsg = { role: 'user', content: text, created_at: new Date().toISOString() };
      this.messages.push(userMsg);
      try {
        const payload = { message: text };
        if (sessionId || this.selectedSession) payload.session_id = sessionId || this.selectedSession;
        const res = await api.post('/chat/', payload);
        const data = res.data;
        // Backend might return treino/dieta or reply text
        if (data && (data.treino || data.dieta)) {
          // Backend returned treino/dieta structured data; create a card message
          const assistantMsg = { role: 'assistant', type: 'card', card: { treino: data.treino, dieta: data.dieta }, created_at: new Date().toISOString(), session: data.session_id || (sessionId || this.selectedSession) };
          this.messages.push(assistantMsg);
          // If api returned session_id, use it
          if (data.session_id) this.selectedSession = data.session_id;
          return assistantMsg;
        } else if (typeof data === 'string') {
          const m = { role: 'assistant', type: 'text', content: data, created_at: new Date().toISOString(), session: data.session_id || (sessionId || this.selectedSession) };
          this.messages.push(m);
          if (data.session_id) this.selectedSession = data.session_id;
          return m;
        } else if (data?.reply) {
          const m = { role: 'assistant', type: 'text', content: data.reply, created_at: new Date().toISOString(), session: data.session_id || (sessionId || this.selectedSession) };
          this.messages.push(m);
          if (data.session_id) this.selectedSession = data.session_id;
          return m;
        } else {
          // fallback: push entire payload
          const m = { role: 'assistant', type: 'text', content: JSON.stringify(data), created_at: new Date().toISOString(), session: data.session_id || (sessionId || this.selectedSession) };
          this.messages.push(m);
          if (data.session_id) this.selectedSession = data.session_id;
          return m;
        }
        // Optionally refresh history
        // await this.loadHistory();
      } catch (err) {
        this.error = err;
        console.error('Failed to send message', err);
        const m = { role: 'assistant', content: 'Erro de conexão.', created_at: new Date().toISOString() };
        this.messages.push(m);
        return m;
      } finally {
        this.sending = false;
      }
    },
    async refreshSessions() {
      return this.loadSessions();
    },
    addMessage(msg) {
      this.messages.push(msg);
    },
    async createSession(title = null) {
      try {
        const payload = title ? { title } : {};
        const res = await api.post('/chat/sessions/', payload);
        const created = res.data;
        if (created?.id) {
          // refresh session list and select
          await this.loadSessions();
          this.selectedSession = created.id;
          // load messages if any
          await this.loadSessionMessages(created.id);
        }
        return created;
      } catch (err) {
        this.error = err;
        console.error('Failed to create session', err);
        throw err;
      }
    },
    async renameSession(sessionId, title) {
      try {
        // try server endpoint; if it doesn't exist, adjust locally
        if (!sessionId) throw new Error('Missing session id');
        const res = await api.patch(`/chat/sessions/${sessionId}/`, { title });
        const updated = res.data;
        // update local sessions
        this.sessions = this.sessions.map((s) => (s.id === sessionId ? { ...s, title: updated?.title || title } : s));
        return updated;
      } catch (err) {
        // fallback to local rename
        this.sessions = this.sessions.map((s) => (s.id === sessionId ? { ...s, title } : s));
        this.error = err;
        this.errorMessage = 'Falha ao renomear sessão (fallback local aplicado).';
        console.warn('Failed to rename session on server, local fallback used', err);
        return { id: sessionId, title };
      }
    },
    async deleteSession(sessionId) {
      try {
        if (!sessionId) throw new Error('Missing session id');
        await api.delete(`/chat/sessions/${sessionId}/`);
        // remove locally
        this.sessions = this.sessions.filter((s) => s.id !== sessionId);
        if (this.selectedSession === sessionId) {
          this.selectedSession = this.sessions.length ? this.sessions[0].id : null;
          if (this.selectedSession) await this.loadSessionMessages(this.selectedSession);
        }
        return true;
      } catch (err) {
        // fallback: remove locally
        this.sessions = this.sessions.filter((s) => s.id !== sessionId);
        if (this.selectedSession === sessionId) this.selectedSession = this.sessions.length ? this.sessions[0].id : null;
        this.error = err;
        this.errorMessage = 'Falha ao excluir sessão (fallback local aplicado).';
        console.warn('Failed to delete session on server, local fallback used', err);
        return false;
      }
    },
    setError(message) {
      this.errorMessage = message;
      this.error = new Error(message);
    },
    clearError() {
      this.error = null;
      this.errorMessage = null;
    },
    async loadSessionMessages(sessionId) {
      try {
        const res = await api.get(`/chat/sessions/${sessionId}/`);
        let messages = Array.isArray(res.data) ? res.data : [];
        // Normalize messages: parse JSON for assistant card
        messages = messages.map((m) => {
          if (m.role === 'assistant' && typeof m.content === 'string') {
            try {
              const parsed = JSON.parse(m.content);
              if (parsed && (parsed.treino || parsed.dieta)) {
                return { ...m, type: 'card', card: { treino: parsed.treino, dieta: parsed.dieta } };
              }
            } catch (e) {
              // keep text
            }
          }
          return m;
        });
        this.messages = messages;
        this.selectedSession = sessionId;
        return messages;
      } catch (err) {
        this.error = err;
        console.error('Failed to load session messages', err);
        throw err;
      }
    }
  }
});

export default useChatStore;
