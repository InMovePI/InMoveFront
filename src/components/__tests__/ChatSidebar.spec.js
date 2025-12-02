import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import ChatSidebar from '../ChatSidebar.vue';
import { createPinia, setActivePinia } from 'pinia';
import { useChatStore } from '@/stores/chatStore';
import api from '@/services/api';

describe('ChatSidebar', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.restoreAllMocks();
  });

  it('renders sessions and triggers load on click', async () => {
    const pinia = createPinia();
    setActivePinia(pinia);
    const chatStore = useChatStore();
    vi.spyOn(api, 'get').mockResolvedValue({ data: [{ id: 1, title: 'One', updated_at: new Date().toISOString(), last_message: { content: 'Ok' } }] });
    await chatStore.loadSessions();
    const wrapper = mount(ChatSidebar, { global: { plugins: [pinia] } });
    const li = wrapper.find('li');
    expect(li.exists()).toBe(true);
    const spy = vi.spyOn(chatStore, 'loadSessionMessages');
    await li.find('.session-left').trigger('click');
    expect(spy).toHaveBeenCalled();
    // test rename: mock patch endpoint
    const session = chatStore.sessions[0];
    vi.spyOn(api, 'patch').mockResolvedValue({ data: { ...session, title: 'Renamed' } });
    vi.spyOn(window, 'prompt').mockReturnValue('Renamed');
    await li.find('button.action').trigger('click');
    // delete: mock delete endpoint
    vi.spyOn(api, 'delete').mockResolvedValue({ status: 204 });
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    const deleteBtn = wrapper.find('button.delete');
    await deleteBtn.trigger('click');
    expect(chatStore.sessions.some(s => s.id === session.id)).toBe(false);
  });
});
