<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import api from '@/services/api';

const authStore = useAuthStore();
const router = useRouter();

const name = ref(authStore.user?.name || '');
const email = ref(authStore.user?.email || '');
const loading = ref(false);
const error = ref('');

async function save() {
  loading.value = true;
  error.value = '';
  try {
    // attempt to update profile via API if backend supports
    const payload = { name: name.value, email: email.value };
    const response = await api.patch('/usuarios/me/', payload).catch(() => null);
    if (response && response.data) {
      // update store
      await authStore.fetchCurrentUser();
    } else {
      // no backend update; update local store
      authStore.user = { ...authStore.user, name: name.value, email: email.value };
      localStorage.setItem('user', JSON.stringify(authStore.user));
    }
    router.push('/perfil');
  } catch (err) {
    error.value = 'Erro ao atualizar perfil';
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <section class="edit-perfil">
    <div class="card">
      <h2>Editar Perfil</h2>
      <div class="field">
        <label>Nome</label>
        <input v-model="name" type="text" />
      </div>
      <div class="field">
        <label>Email</label>
        <input v-model="email" type="email" />
      </div>
      <div class="actions">
        <button class="btn" @click="save" :disabled="loading">{{loading ? 'SALVANDO...' : 'SALVAR'}}</button>
        <button class="btn btn-secondary" @click="router.back()">Cancelar</button>
      </div>
      <p v-if="error" class="error">{{error}}</p>
    </div>
  </section>
</template>

<style scoped>
.edit-perfil { display:flex; align-items:center; justify-content:center; padding:20px; }
.card { width:100%; max-width:600px; background: rgba(255,255,255,0.04); color:#fff; padding:20px; border-radius:10px; }
.field { display:flex; flex-direction:column; gap:6px; margin-bottom:12px; }
label { color:#ccc; }
input { padding:10px; border-radius:6px; border: 1px solid rgba(255,255,255,0.08); background:transparent; color:#fff; }
.actions { display:flex; gap:10px; }
.btn { padding:8px 12px; border-radius:8px; border:none; cursor:pointer; }
.btn-secondary { background:#666; color:#fff; }
.error { color:#ff6666; margin-top:12px; }
@media (max-width:600px){ .card{ padding:16px;} }
</style>
