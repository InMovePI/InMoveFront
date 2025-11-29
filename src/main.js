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
