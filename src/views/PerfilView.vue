<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
const authStore = useAuthStore();
const router = useRouter();

function handleLogout() {
    authStore.logout();
    router.push('/login');
}
</script>

<template>
    <section class="perfil">
        <div class="perfil-card">
            <div class="perfil-header">
                <div class="avatar">{{ (authStore.user?.name || 'U').charAt(0).toUpperCase() }}</div>
                <div class="perfil-info">
                    <h2>{{ authStore.user?.name || 'Usuário' }}</h2>
                    <p>{{ authStore.user?.email || '' }}</p>
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
                      <span>{{ authStore.user?.email || '-' }}</span>
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