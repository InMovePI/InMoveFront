import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import ChatWindow from '../ChatWindow.vue';
import { createPinia, setActivePinia } from 'pinia';
import { useChatStore } from '@/stores/chatStore';
import api from '@/services/api';

describe('ChatWindow', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.restoreAllMocks();
  });

  it('sends message via chatStore and renders assistant reply', async () => {
    const pinia = createPinia();
    setActivePinia(pinia);
    const chatStore = useChatStore();
    // Setup an empty session and a selection
    chatStore.sessions = [{ id: 10, title: 'Test' }];
    chatStore.selectedSession = 10;
    const postSpy = vi.spyOn(api, 'post').mockResolvedValue({ data: { reply: 'Ok' } });
    const wrapper = mount(ChatWindow, { global: { plugins: [pinia] } });
    const textarea = wrapper.find('textarea');
    await textarea.setValue('Hello there');
    await wrapper.find('form').trigger('submit');
    // Wait for async to push message
    await new Promise((r) => setTimeout(r, 10));
    expect(postSpy).toHaveBeenCalled();
    expect(chatStore.messages.some((m) => m.role === 'assistant')).toBeTruthy();
  });
});
