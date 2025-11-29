<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
const router = useRouter();

const name = ref(authStore.user?.name || '');
const email = ref(authStore.user?.email || '');
const altura = ref(authStore.user?.altura_cm || authStore.user?.altura || '');
const peso = ref(authStore.user?.peso_kg || authStore.user?.peso || '');
const meta_peso = ref(authStore.user?.meta_peso || '');
const objetivo = ref(authStore.user?.objetivo || '');
const dias_treino = ref(authStore.user?.dias_treino || '');
const grupo_foco = ref(authStore.user?.grupo_foco || '');
const loading = ref(false);
const error = ref('');

async function save() {
  loading.value = true;
  error.value = '';
  try {
    let payload;
    let isForm = false;
    // Always send JSON payload (profile picture upload cancelled)
    payload = {
      name: name.value,
      email: email.value,
      altura_cm: altura.value,
      peso_kg: peso.value,
      meta_peso: meta_peso.value,
      objetivo: objetivo.value,
      dias_treino: Array.isArray(dias_treino.value) ? dias_treino.value.join(',') : dias_treino.value,
      grupo_foco: Array.isArray(grupo_foco.value) ? grupo_foco.value.join(',') : grupo_foco.value
    };

    await authStore.updateProfile(payload, isForm);
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
      <!-- Photo upload removed per feature cancellation -->
      <div class="field">
        <label>Nome</label>
        <input v-model="name" type="text" />
      </div>
      <div class="field">
        <label>Email</label>
        <input v-model="email" type="email" />
      </div>
      <div class="field">
        <label>Peso (kg)</label>
        <input v-model="peso" type="number" step="0.1" />
      </div>
      <div class="field">
        <label>Altura (cm)</label>
        <input v-model="altura" type="number" />
      </div>
      <div class="field">
        <label>Meta de peso (kg)</label>
        <input v-model="meta_peso" type="number" step="0.1" />
      </div>
      <div class="field">
        <label>Objetivo</label>
        <input v-model="objetivo" type="text" />
      </div>
      <div class="field">
        <label>Dias de Treino (use vírgula pra separar)</label>
        <input v-model="dias_treino" type="text" />
      </div>
      <div class="field">
        <label>Grupo de Foco (use vírgula pra separar)</label>
        <input v-model="grupo_foco" type="text" />
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
