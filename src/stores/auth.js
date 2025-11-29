import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import AuthService from '@/services/auth';
import api from '@/services/api';
// Using AuthService only (user.js removed)
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

  async function updateProfile(payload, isForm = false) {
    try {
      const updated = await auth.update(payload, isForm);
      // If API returns updated user, apply it
      if (updated) {
        user.value = updated;
        localStorage.setItem('user', JSON.stringify(updated));
      }
      return updated;
    } catch (err) {
      console.error('Error updating profile', err);
      throw err;
    }
  }

  async function initFromStorage() {
    const token = localStorage.getItem('access_token');
    if (token) {
      // ensure axios header set
      auth.setAuthHeader(token);
      try {
        const me = await auth.getCurrentUser();
        user.value = me;
      } catch (err) {
        console.warn('Could not fetch current user during init', err);
      }
    }
  }

  // uploadProfilePicture removed as profile picture feature was cancelled

  // hydrate store from localStorage if available
  if (localStorage.getItem('access_token')) {
    // ensure header set
    api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;
    const userStr = localStorage.getItem('user');
    if (userStr) user.value = JSON.parse(userStr);
  }

  return { user, isAuthenticated, register, login, logout, fetchCurrentUser, updateProfile };
});
