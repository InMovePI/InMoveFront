import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import PerfilView from '../PerfilView.vue';
import { useAuthStore } from '@/stores/auth';
import { createRouter, createWebHistory } from 'vue-router';

describe('PerfilView', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    localStorage.clear();
  });

  it('shows user info and logout', async () => {
    const pinia = createPinia();
    setActivePinia(pinia);
    const store = useAuthStore();
    store.user = { id: 1, name: 'Teste', email: 't@t.com' };
    const router = createRouter({ history: createWebHistory(), routes: [] });
    const wrapper = mount(PerfilView, { global: { plugins: [pinia, router] } });
    expect(wrapper.html()).toContain('Teste');
    expect(wrapper.html()).toContain('t@t.com');
  });
});
