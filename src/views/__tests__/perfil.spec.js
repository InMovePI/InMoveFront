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

  it('displays extra profile fields and avatar image', async () => {
    const pinia = createPinia();
    setActivePinia(pinia);
    const store = useAuthStore();
    store.user = {
      id: 2,
      name: 'Full User',
      email: 'full@user.com',
      peso_kg: 72.5,
      altura_cm: 175,
      meta_peso: 70,
      objetivo: 'Perda de peso',
      dias_treino: 'Seg,Qua,Sex',
      grupo_foco: 'Peito,Costas',
      // profile_picture removed
    };
    const router = createRouter({ history: createWebHistory(), routes: [] });
    const wrapper = mount(PerfilView, { global: { plugins: [pinia, router] } });
    expect(wrapper.html()).toContain('Full User');
    expect(wrapper.html()).toContain('full@user.com');
    expect(wrapper.html()).toContain('72.5');
    expect(wrapper.html()).toContain('175');
    expect(wrapper.html()).toContain('Perda de peso');
    // Our template joins array with ', ' (comma + space)
    expect(wrapper.html()).toContain('Seg, Qua, Sex');
    expect(wrapper.html()).toContain('Peito, Costas');
    // should render initials inside avatar div (Full User -> FU)
    expect(wrapper.find('.avatar').text()).toContain('FU');
  });
});
