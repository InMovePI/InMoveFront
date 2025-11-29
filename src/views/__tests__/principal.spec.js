import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { createRouter, createWebHistory } from 'vue-router';
import routes from '@/router/index';
import PrincipalView from '../PrincipalView.vue';
import { useAuthStore } from '@/stores/auth';

describe('PrincipalView header', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    localStorage.clear();
  });

  it('shows Cadastro when not authenticated', () => {
    const pinia = createPinia();
    const router = createRouter({ history: createWebHistory(), routes: [] });
    const wrapper = mount(PrincipalView, { global: { plugins: [pinia, router] } });
    expect(wrapper.html()).toContain('Cadastro de Usuário');
  });

  it('shows Perfil when authenticated', async () => {
    const pinia = createPinia();
    setActivePinia(pinia);
    const store = useAuthStore();
    store.user = { id: 1, name: 'Teste', email: 't@t.com' };
    const router = createRouter({ history: createWebHistory(), routes: [] });
    const wrapper = mount(PrincipalView, { global: { plugins: [pinia, router] } });
    expect(wrapper.html()).toContain('Perfil');
  });
});
