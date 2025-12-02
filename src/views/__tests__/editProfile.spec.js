import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import EditProfileView from '../EditProfileView.vue';
import { useAuthStore } from '@/stores/auth';
import { createRouter, createWebHistory } from 'vue-router';

describe('EditProfileView', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    localStorage.clear();
  });

  it('calls store.updateProfile and navigates on save', async () => {
    const pinia = createPinia();
    setActivePinia(pinia);
    const store = useAuthStore();
    store.user = { id: 1, name: 'User', email: 'u@u.com' };
    store.updateProfile = vi.fn().mockResolvedValue({ id: 1, name: 'User', email: 'u@u.com' });
    const router = createRouter({ history: createWebHistory(), routes: [] });
    const pushSpy = vi.spyOn(router, 'push');
    const wrapper = mount(EditProfileView, { global: { plugins: [pinia, router] } });
    // set fields
    await wrapper.find('input[type="text"]').setValue('User New');
    await wrapper.find('input[type="email"]').setValue('new@u.com');
    await wrapper.find('button').trigger('click');
    // wait a tick for promises
    await wrapper.vm.$nextTick();
    expect(store.updateProfile).toHaveBeenCalled();
    expect(pushSpy).toHaveBeenCalledWith('/perfil');
  });
});
