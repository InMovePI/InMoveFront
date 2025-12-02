import { describe, it, expect, beforeEach, vi } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { useChatStore } from '../chatStore';
import api from '@/services/api';

describe('chatStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.restoreAllMocks();
  });

  it('sendMessage returns assistant message and updates state', async () => {
    const store = useChatStore();
    vi.spyOn(api, 'post').mockResolvedValue({ data: { reply: 'Hi from AI' } });
    const res = await store.sendMessage('Hello');
    expect(res).toBeDefined();
    expect(res.role).toBe('assistant');
    expect(res.content).toContain('Hi from AI');
    expect(store.messages.some(m => m.role === 'assistant')).toBe(true);
    expect(store.sending).toBe(false);
  });
});
