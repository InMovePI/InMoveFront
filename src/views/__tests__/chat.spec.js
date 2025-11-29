import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import ChatPage from '../ChatPage.vue';
import { createRouter, createWebHistory } from 'vue-router';
import { createPinia, setActivePinia } from 'pinia';
import { useChatStore } from '@/stores/chatStore';
import api from '@/services/api';

describe('ChatView', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    localStorage.clear();
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('sends message and displays assistant reply', async () => {
    const pinia = createPinia();
    setActivePinia(pinia);
    const chatStore = useChatStore();
    const router = createRouter({ history: createWebHistory(), routes: [] });
    // mock api get/post returning text reply - must be set before mounting
    // ensure any loadSessions returns no sessions
    vi.spyOn(api, 'get').mockResolvedValueOnce({ data: [] });
    const postSpy = vi.spyOn(api, 'post').mockResolvedValue({ data: { reply: 'Hello' } });
    const wrapper = mount(ChatPage, { global: { plugins: [pinia, router] } });

    const input = wrapper.find('textarea');
    await input.setValue('Hi');
    await wrapper.find('form').trigger('submit');

    // wait until the store sends/receives messages: wait for an assistant message
    async function waitForAssistant(expectedText, timeout = 2000) {
      const deadline = Date.now() + timeout;
      while (Date.now() < deadline) {
        await new Promise((r) => setTimeout(r, 10));
        const found = chatStore.messages.some((m) => m.role === 'assistant' && (typeof m.content === 'string' ? m.content.includes(expectedText) : JSON.stringify(m.content).includes(expectedText)));
        if (found) return true;
      }
      return false;
    }
    const received = await waitForAssistant('Hello');
    expect(postSpy).toHaveBeenCalled();
    expect(received).toBe(true);
    expect(wrapper.html()).toContain('Hello');
  });

  it('renders treino/dieta card when backend returns card data', async () => {
    const pinia = createPinia();
    setActivePinia(pinia);
    const chatStore = useChatStore();
    const router = createRouter({ history: createWebHistory(), routes: [] });

    vi.spyOn(api, 'get').mockResolvedValueOnce({ data: [] });
    const postSpy = vi.spyOn(api, 'post').mockResolvedValue({ data: { treino: 'Exercicio A', dieta: 'Dieta X' } });
    const wrapper = mount(ChatPage, { global: { plugins: [pinia, router] } });

    const input = wrapper.find('textarea');
    await input.setValue('Me recomenda um treino');
    await wrapper.find('form').trigger('submit');

    // Wait until card appears in the store
    async function waitForCard(timeout = 2000) {
      const deadline = Date.now() + timeout;
      while (Date.now() < deadline) {
        await new Promise((r) => setTimeout(r, 10));
        const found = chatStore.messages.some((m) => m.role === 'assistant' && m.type === 'card' && m.card && m.card.treino);
        if (found) return true;
      }
      return false;
    }
    const hasCard = await waitForCard();
    expect(hasCard).toBe(true);
    expect(wrapper.html()).toContain('Treino');
    expect(wrapper.html()).toContain('Exercicio A');
  });

  it('loads chat history on mount', async () => {
    const pinia = createPinia();
    setActivePinia(pinia);
    const chatStore = useChatStore();
    const router = createRouter({ history: createWebHistory(), routes: [] });
    // loadSessions (history) then loadSessionMessages
    vi.spyOn(api, 'get').mockResolvedValueOnce({ data: [{ id: 1, title: 'First', updated_at: new Date().toISOString(), last_message: { content: 'Bem-vindx' } }] })
      .mockResolvedValueOnce({ data: [{ role: 'assistant', content: 'Bem-vindx', created_at: new Date().toISOString() }] });
    const wrapper = mount(ChatPage, { global: { plugins: [pinia, router] } });
    // wait for mount/loadHistory
    await new Promise((r) => setTimeout(r, 10));
    expect(wrapper.html()).toContain('Bem-vindx');
  });

  it('loads and normalizes card JSON chat history', async () => {
    const pinia = createPinia();
    setActivePinia(pinia);
    const router = createRouter({ history: createWebHistory(), routes: [] });
    const payload = [{ role: 'assistant', content: JSON.stringify({ treino: 'A', dieta: 'B' }), created_at: new Date().toISOString() }];
    // Return sessions first, then messages for that session
    vi.spyOn(api, 'get').mockResolvedValueOnce({ data: [{ id: 1, title: 'S1', updated_at: new Date().toISOString(), last_message: null }] })
      .mockResolvedValueOnce({ data: payload });
    const wrapper = mount(ChatPage, { global: { plugins: [pinia, router] } });
    // wait for load
    await new Promise((r) => setTimeout(r, 10));
    expect(wrapper.html()).toContain('Treino');
    expect(wrapper.html()).toContain('A');
  });

  it('disables input while sending', async () => {
    const pinia = createPinia();
    setActivePinia(pinia);
    const chatStore = useChatStore();
    const router = createRouter({ history: createWebHistory(), routes: [] });
    vi.spyOn(api, 'get').mockResolvedValue({ data: [] });
    let resolvePost;
    const postPromise = new Promise((res) => { resolvePost = res; });
    vi.spyOn(api, 'post').mockImplementation(() => postPromise);
    const wrapper = mount(ChatPage, { global: { plugins: [pinia, router] } });
    const btn = wrapper.find('form button[type="submit"]');
    const input = wrapper.find('textarea');
    await input.setValue('Wait this');
    await wrapper.find('form').trigger('submit');
    // Now the sending flag should be true and button disabled
    expect(chatStore.sending).toBe(true);
    expect(btn.attributes('disabled')).toBeDefined();
    // resolve the post
    resolvePost({ data: { reply: 'Done' } });
    // wait for assistant message
    async function waitForAssistant(timeout = 2000) {
      const deadline = Date.now() + timeout;
      while (Date.now() < deadline) {
        await new Promise((r) => setTimeout(r, 10));
        const found = chatStore.messages.some((m) => m.role === 'assistant' && (typeof m.content === 'string' ? m.content.includes('Done') : JSON.stringify(m.content).includes('Done')));
        if (found) return true;
      }
      return false;
    }
    const got = await waitForAssistant();
    expect(got).toBe(true);
    // After response sending should be false and button enabled
    expect(chatStore.sending).toBe(false);
    expect(btn.attributes('disabled')).toBeUndefined();
  });
});
