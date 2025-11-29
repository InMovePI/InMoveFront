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
const initials = computed(() => (name.value ? name.value.split(' ').map(n=>n[0]).join('') : 'U'));

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
                <div class="field">
                      <label>Nome</label>
                      <span>{{ authStore.user?.name || '-' }}</span>
                </div>
                    <div class="field">
                        <label>Email</label>
                        <span>{{ email || '-' }}</span>
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
.perfil {
    min-height: 80vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    background-color: #0f0f0f;
}
.perfil-card {
    width: 100%;
    max-width: 900px;
    background: rgba(255,255,255,0.04);
    padding: 24px;
    border-radius: 12px;
    color: #fff;
}
.perfil-header {
    display: flex;
    gap: 16px;
    align-items: center;
}
.avatar {
    width: 72px;
    height: 72px;
    border-radius: 50%;
    background: #ceeb04;
    color: #000;
    display:flex;
    align-items:center;
    justify-content:center;
    font-weight:700;
    font-size:24px;
}
.perfil-info h2 { margin: 0; }
.perfil-info p { margin: 2px 0 0 0; opacity: 0.8; }
.perfil-section { margin-top: 20px; }
.field { display:flex; gap: 10px; align-items:center; padding:8px 0; }
.field label { min-width: 120px; color:#ddd; }
.perfil-actions { display:flex; gap:12px; margin-top: 20px; }
.btn { padding: 8px 16px; border-radius: 8px; border: none; cursor: pointer; }
.btn-primary { background-color: #ceeb04; color:#000; }
.btn-danger { background-color: #ff5252; color: #fff; }

@media (max-width: 600px) {
    .perfil-card { padding: 16px; }
    .avatar { width: 56px; height:56px; }
    .field { flex-direction: column; align-items: flex-start; }
    .field label { min-width: auto; }
    .perfil-actions { flex-direction: column; }
}
</style>