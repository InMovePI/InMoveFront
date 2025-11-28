import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import AuthService from '@/services/auth';
import api from '@/services/api';
const auth = AuthService;

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);
  const isAuthenticated = computed(() => !!user.value);

  async function register(payload) {
    // Register user then login automatically
    const created = await auth.register(payload);
    // After successful create, perform login
    await login(payload.email, payload.password);
    return created;
  }

  async function login(email, password) {
    const tokens = await auth.login(email, password);
    // tokens.access is already saved and header set in auth.login()
    // fetch current user
    try {
      const me = await auth.getCurrentUser();
      user.value = me;
      localStorage.setItem('user', JSON.stringify(me));
    } catch (err) {
      console.error('Error fetching current user', err);
      // don't rethrow; keep tokens set
    }
    return tokens;
  }

  async function logout() {
    auth.logout();
    user.value = null;
  }

  async function fetchCurrentUser() {
    try {
      const me = await auth.getCurrentUser();
      user.value = me;
      return me;
    } catch (err) {
      console.error('Error fetching current user', err);
      return null;
    }
  }

  // hydrate store from localStorage if available
  if (localStorage.getItem('access_token')) {
    // ensure header set
    api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;
    const userStr = localStorage.getItem('user');
    if (userStr) user.value = JSON.parse(userStr);
  }

  return { user, isAuthenticated, register, login, logout, fetchCurrentUser };
});
