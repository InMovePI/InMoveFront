import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { useAuthStore } from '@/stores/auth';

import App from './App.vue';
import router from './router';
import './plugins/axios';

import './assets/main.css';

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.use(router);

// Hydrate auth store on app startup if token exists
try {
	const authStore = useAuthStore();
	// initialize auth store (set axios header and optionally fetch user)
	authStore.initFromStorage();
} catch (err) {
	// if pinia not ready for store, ignore
}

app.mount('#app');

// During development ensure any previously-registered service workers are removed
// to avoid stale service worker behavior (caching / intercept) which causes dev-time issues.
if (import.meta.env.DEV && 'serviceWorker' in navigator) {
	navigator.serviceWorker.getRegistrations().then((registrations) => {
		for (const r of registrations) {
			try { r.unregister(); } catch (e) { /* ignore */ }
		}
	}).catch(() => {});

	// clear runtime caches created by workbox during development
	if ('caches' in window) {
		caches.keys().then((keys) => keys.forEach((k) => caches.delete(k))).catch(() => {});
	}
}
