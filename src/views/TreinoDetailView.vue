<script setup>
import { computed, watchEffect, ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { getWorkoutBySlug } from '@/data/workouts'
import AppFooter from '@/components/AppFooter.vue'
import { useWorkoutLogsStore } from '@/stores/workoutLogs'

const authStore = useAuthStore()
const route = useRoute()
const router = useRouter()

const workout = computed(() => getWorkoutBySlug(route.params.slug))

watchEffect(() => {
  if (route.params.slug && !workout.value) {
    router.replace({ name: 'treinamentos' })
  }
})

const heroStats = computed(() => {
  if (!workout.value) return []
  return [
    { label: 'Calorias', value: workout.value.calories, icon: '🔥' },
    { label: 'Duração', value: workout.value.duration, icon: '⏱️' },
    { label: 'Intensidade', value: workout.value.intensity, icon: '⚡' }
  ]
})

const workoutLogs = useWorkoutLogsStore()
const finishing = ref(false)

function parseDurationToMinutes(str = '') {
  // handles formats like '1h30', '1h05', '45min', '1h', '90 min', '1h30min', '1h25'
  if (!str) return 0
  const s = String(str).toLowerCase().replace(' ', '')
  const hMatch = s.match(/(\d+)h(?:|(\d+))/)
  if (hMatch) {
    const h = Number(hMatch[1])
    const m = Number(hMatch[2] || 0)
    return h * 60 + m
  }
  const mMatch = s.match(/(\d+)min/)
  if (mMatch) return Number(mMatch[1])
  const digits = s.match(/(\d+)/)
  return digits ? Number(digits[0]) : 0
}

async function finishWorkout() {
  if (!workout?.value) return
  const payload = {
    workoutSlug: workout.value.slug || '',
    caloriesBurned: Number(String(workout.value.calories || '').replace(/[^0-9.]/g, '')) || 0,
    durationMinutes: parseDurationToMinutes(workout.value.duration) || 0,
    finishedAt: new Date().toISOString(),
  }

  finishing.value = true
  try {
    const res = await workoutLogs.saveLog(payload)
    // res may be the saved record or { queued: true }
    // keep UI simple: show lastMessage from store
    // (the store sets lastMessage and updates queue)
  } catch (err) {
    // propagate auth issues to auth store / login flow
    console.warn('failed to save workout log', err)
    // show a simple alert for now
    if (err?.code === 'UNAUTHORIZED' || err?.response?.status === 401) {
      alert('Sessão inválida, por favor faça login novamente.')
    } else {
      alert('Erro ao salvar treino: ' + String(err?.message ?? err))
    }
  } finally {
    finishing.value = false
  }
}
</script>

<template>
  <div class="treino-detail">
    <header>
      <div class="navegacao">
        <h1>INMOVE</h1>
        <div class="pages">
          <RouterLink to="/principal"><span>Home</span></RouterLink>
          <RouterLink to="/dashboard">Dashboard</RouterLink>
          <RouterLink to="/treinamentos">Treinamentos</RouterLink>
          <RouterLink v-if="!authStore.isAuthenticated" to="/cadastro" class="cadastro">Cadastro de Usuário</RouterLink>
          <RouterLink v-else to="/perfil" class="cadastro">
            <span class="avatar-sm">{{ authStore.user?.name ? authStore.user.name.charAt(0).toUpperCase() : 'U' }}</span>
            Perfil
          </RouterLink>
        </div>
      </div>
    </header>

    <main v-if="workout">
      <div class="back-link">
        <RouterLink to="/treinamentos">← Voltar para Treinamentos</RouterLink>
      </div>

      <section class="hero">
        <img class="hero-cover" :src="workout.cover" :alt="workout.title" />
        <div class="hero-info">
          <p class="label">Plano selecionado</p>
          <h2>{{ workout.title }}</h2>
          <p class="focus">{{ workout.focus }}</p>
          <p class="overview">{{ workout.overview }}</p>
          <div class="hero-stats">
            <article v-for="stat in heroStats" :key="stat.label">
              <span class="icon">{{ stat.icon }}</span>
              <small>{{ stat.label }}</small>
              <strong>{{ stat.value }}</strong>
            </article>
          </div>
        </div>
      </section>

      <section class="warmup surface">
        <div>
          <p class="label">Aquecimento</p>
          <h3>{{ workout.warmup.title }}</h3>
          <p class="duration">{{ workout.warmup.duration }}</p>
        </div>
        <div class="tags" v-if="workout.warmup.tags?.length">
          <span v-for="tag in workout.warmup.tags" :key="tag">{{ tag }}</span>
        </div>
      </section>

      <section class="exercises surface">
        <div class="section-head">
          <div>
            <p class="label">Sequência principal</p>
            <h3>Execução guiada</h3>
          </div>
          <RouterLink class="download" to="/treinos">Ver guia geral</RouterLink>
        </div>
        <div class="exercise-grid">
          <article v-for="exercise in workout.exercises" :key="exercise.name" class="exercise-card">
            <div>
              <h4>{{ exercise.name }}</h4>
              <p>{{ exercise.note }}</p>
            </div>
            <span class="volume">{{ exercise.volume }}</span>
          </article>
        </div>
      </section>

      <section class="finisher surface" v-if="workout.finisher">
        <div>
          <p class="label">Finalização</p>
          <h3>{{ workout.finisher.title }}</h3>
          <p class="tip">{{ workout.finisher.tip }}</p>
        </div>
        <span class="volume">{{ workout.finisher.volume }}</span>
      </section>

      <div class="actions">
        <button class="start-btn" type="button">Iniciar esse treino</button>
        <button
          class="finish-btn"
          type="button"
          :disabled="finishing || workoutLogs.saving"
          @click="finishWorkout"
        >
          {{ finishing || workoutLogs.saving ? 'Salvando treino...' : 'Concluir treino' }}
        </button>
      </div>
      <div class="log-feedback" v-if="workoutLogs.lastMessage">
        {{ workoutLogs.lastMessage }}
      </div>
    </main>

    <AppFooter />
  </div>
</template>

<style scoped>
.treino-detail {
  min-height: 100vh;
  background: radial-gradient(circle at top, rgba(206, 233, 4, 0.15), #050505 70%);
  color: #f5f5f5;
  font-family: 'Poppins', 'Inter', system-ui, sans-serif;
}

.navegacao {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background-color: white;
  color: black;
  padding: 1rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.pages {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 50px;
  flex-wrap: wrap;
}

.pages a {
  color: black;
  text-decoration: none;
  position: relative;
  white-space: nowrap;
}

.pages a:not(.cadastro)::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -2px;
  width: 0%;
  height: 2px;
  background-color: black;
  transition: width 0.3s ease;
}

.pages a:not(.cadastro):hover::after {
  width: 100%;
}

.cadastro {
  background-color: rgb(206, 233, 4);
  padding: 9px 18px;
  border-radius: 999px;
  color: black;
  text-decoration: none;
}

.avatar-sm {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #fff;
  color: #0f0f0f;
  margin-right: 6px;
  font-weight: 700;
}

main {
  padding: clamp(24px, 6vw, 72px);
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.back-link a {
  color: rgba(245, 245, 245, 0.65);
  text-decoration: none;
  font-weight: 500;
}

.hero {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 28px;
  align-items: center;
}

.hero-cover {
  width: 100%;
  border-radius: 32px;
  min-height: 280px;
  object-fit: cover;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.45);
}

.hero-info {
  background: rgba(0, 0, 0, 0.55);
  border-radius: 32px;
  padding: clamp(20px, 4vw, 40px);
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.label {
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-size: 0.75rem;
  opacity: 0.7;
}

.focus {
  margin: 0;
  font-size: 1.1rem;
  color: rgb(206, 233, 4);
}

.overview {
  margin: 0;
  opacity: 0.85;
}

.hero-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 12px;
}

.hero-stats article {
  background: rgba(255, 255, 255, 0.08);
  border-radius: 18px;
  padding: 12px;
  text-align: center;
}

.hero-stats strong {
  display: block;
  font-size: 1.1rem;
}

.hero-stats .icon {
  font-size: 1.4rem;
}

.surface {
  background: rgba(15, 15, 15, 0.8);
  border-radius: 28px;
  padding: clamp(20px, 4vw, 36px);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4);
}

.warmup {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 16px;
  align-items: center;
}

.warmup .duration {
  font-weight: 600;
  color: rgb(206, 233, 4);
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.tags span {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 999px;
  padding: 6px 14px;
  font-size: 0.85rem;
}

.exercises .section-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
}

.download {
  color: rgb(206, 233, 4);
  text-decoration: none;
  font-weight: 600;
}

.exercise-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
  margin-top: 20px;
}

.exercise-card {
  background: rgba(255, 255, 255, 0.06);
  border-radius: 18px;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.exercise-card h4 {
  margin: 0;
}

.exercise-card p {
  margin: 4px 0 0;
  opacity: 0.75;
}

.exercise-card .volume {
  font-weight: 700;
  color: rgb(206, 233, 4);
}

.finisher {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.finisher .tip {
  margin: 4px 0 0;
  opacity: 0.8;
}

.finisher .volume {
  font-weight: 700;
  color: rgb(206, 233, 4);
}

.start-btn {
  align-self: flex-start;
  background: rgb(206, 233, 4);
  color: #030303;
  border: none;
  border-radius: 999px;
  padding: 14px 32px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.start-btn:hover {
  transform: translateY(-3px);
}

.actions {
  display: flex;
  gap: 12px;
  align-items: center;
}

.finish-btn {
  background: rgb(206, 233, 4);
  color: #000;
  padding: 14px 20px;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  font-weight: 700;
}

.finish-btn[disabled] {
  opacity: 0.6;
  cursor: default;
}

.log-feedback {
  margin-top: 10px;
  color: #dcdcdc;
  font-size: 0.95rem;
}

@media (max-width: 640px) {
  .navegacao {
    justify-content: center;
  }

  .pages {
    justify-content: center;
    gap: 16px;
  }

  .hero-info {
    padding: 20px;
  }

  .exercise-card {
    flex-direction: column;
    align-items: flex-start;
  }

  .start-btn {
    width: 100%;
    text-align: center;
  }
}
</style>
