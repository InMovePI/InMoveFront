<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
const router = useRouter();

const name = computed(() => authStore.user?.name || '');
const email = computed(() => authStore.user?.email || '');
const altura = computed(() => authStore.user?.altura_cm || authStore.user?.altura || '');
const peso = computed(() => authStore.user?.peso_kg || authStore.user?.peso || '');
const meta_peso = computed(() => authStore.user?.meta_peso || '');
const objetivo = computed(() => authStore.user?.objetivo || '');
const dias_treino = computed(() => (authStore.user?.dias_treino && authStore.user.dias_treino.split(',')) || []);
const grupo_foco = computed(() => (authStore.user?.grupo_foco && authStore.user.grupo_foco.split(',')) || []);
const initials = computed(() => (name.value ? name.value.split(' ').map(n => n[0]).join('') : 'U'));

function handleLogout() {
    authStore.logout();
    router.push('/login');
}
</script>

<template>
<section class="perfil">
  <div class="perfil-card">
    <div class="perfil-header">
      <div class="avatar">{{ initials }}</div>
      <div class="perfil-info">
        <h2>{{ name || 'Usuário' }}</h2>
        <p>{{ email || '' }}</p>
      </div>
    </div>

    <div class="perfil-section">
      <h3>Informações</h3>
      <div class="field" v-if="name">
        <label>Nome</label>
        <span>{{ name }}</span>
      </div>
      <div class="field" v-if="email">
        <label>Email</label>
        <span>{{ email }}</span>
      </div>
      <div class="field" v-if="peso">
        <label>Peso (kg)</label>
        <span>{{ peso }}</span>
      </div>
      <div class="field" v-if="altura">
        <label>Altura (cm)</label>
        <span>{{ altura }}</span>
      </div>
      <div class="field" v-if="meta_peso">
        <label>Meta de Peso (kg)</label>
        <span>{{ meta_peso }}</span>
      </div>
      <div class="field" v-if="objetivo">
        <label>Objetivo</label>
        <span>{{ objetivo }}</span>
      </div>
      <div class="field" v-if="dias_treino.length">
        <label>Dias de Treino</label>
        <span>{{ dias_treino.join(', ') }}</span>
      </div>
      <div class="field" v-if="grupo_foco.length">
        <label>Grupo de Foco</label>
        <span>{{ grupo_foco.join(', ') }}</span>
      </div>
    </div>

    <div class="perfil-actions">
      <button class="btn btn-primary" @click="router.push('/perfil/editar')">Editar Perfil</button>
      <button class="btn btn-danger" @click="handleLogout">Desconectar</button>
    </div>
  </div>
</section>
</template>

<style scoped>
/* Layout centralizado */
.perfil {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #121212;
}

/* Card */
.perfil-card {
  width: 100%;
  max-width: 900px;
  background: #1e1e1e;
  padding: 28px;
  border-radius: 16px;
  color: #f0f0f0;
  box-shadow: 0 8px 20px rgba(0,0,0,0.6);
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* Cabeçalho */
.perfil-header {
  display: flex;
  gap: 20px;
  align-items: center;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #22ff99;
  color: #111827;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 28px;
  box-shadow: 0 4px 12px rgba(34,255,153,0.4);
  flex-shrink: 0;
}

.perfil-info h2 {
  margin: 0;
  font-size: 24px;
  font-weight: 700;
}

.perfil-info p {
  margin: 4px 0 0 0;
  color: #ccc;
  font-size: 14px;
}

/* Seção de informações */
.perfil-section h3 {
  margin-bottom: 12px;
  color: #22ff99;
  font-size: 18px;
  font-weight: 600;
}

.field {
  display: flex;
  gap: 16px;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid rgba(255,255,255,0.1);
}

.field label {
  min-width: 140px;
  color: #aaa;
  font-weight: 500;
}

.field span {
  color: #f0f0f0;
}

/* Ações */
.perfil-actions {
  display: flex;
  gap: 16px;
  margin-top: 12px;
  flex-wrap: wrap;
}

.btn {
  padding: 10px 20px;
  border-radius: 10px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: transform 0.15s, box-shadow 0.15s;
}

.btn-primary {
  background: #22ff99;
  color: #111827;
  box-shadow: 0 4px 12px rgba(34,255,153,0.4);
}
.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(34,255,153,0.6);
}

.btn-danger {
  background: #ff5252;
  color: #fff;
  box-shadow: 0 4px 12px rgba(255,82,82,0.4);
}
.btn-danger:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(255,82,82,0.6);
}

/* Responsividade */
@media (max-width: 768px) {
  .perfil-card { padding: 20px; }
  .avatar { width: 64px; height: 64px; font-size: 24px; }
  .perfil-info h2 { font-size: 20px; }
  .field { flex-direction: column; align-items: flex-start; gap: 4px; }
  .field label { min-width: auto; }
  .perfil-actions { flex-direction: column; gap: 12px; }
}
</style>
