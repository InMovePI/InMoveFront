<script setup>
import { RouterLink } from 'vue-router'
import { onMounted as vmOnMounted, computed as vmComputed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useWorkoutLogsStore } from '@/stores/workoutLogs'
import { workouts, getWorkoutBySlug } from '@/data/workouts'
import AppFooter from '@/components/AppFooter.vue'

const authStore = useAuthStore()

// we'll compute the real stats from workout logs for the last 7 days
const logsStore = useWorkoutLogsStore()

vmOnMounted(async () => {
  // attempt to load user's logs (fetchLogs is safe in the store)
  try {
    await logsStore.fetchLogs()
  } catch (err) {
    // ignore UI test environment fetch errors - logs might be pre-populated
    // failure will just leave logs empty
    /* noop */
  }
})

// helper: parse time fields and normalise log entries
function parseLogDate(log) {
  const d = log.finished_at ?? log.finishedAt ?? log.created_at ?? log.createdAt
  return d ? new Date(d) : null
}

const lastWeekCutoff = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)

const lastWeekLogs = vmComputed(() =>
  logsStore.logs.filter((l) => {
    const d = parseLogDate(l)
    return d && d >= lastWeekCutoff
  })
)

// performed logs sorted most recent first — allow duplicates
const performedLogsSorted = vmComputed(() =>
  logsStore.logs
    .slice()
    .sort((a, b) => {
      const da = parseLogDate(a)
      const db = parseLogDate(b)
      if (!da && !db) return 0
      if (!da) return 1
      if (!db) return -1
      return db - da
    })
)

const totalCaloriesLastWeek = vmComputed(() =>
  lastWeekLogs.value.reduce((sum, l) => sum + Number(l.calories_burned ?? l.caloriesBurned ?? 0), 0)
)

const totalDurationMinutes = vmComputed(() =>
  lastWeekLogs.value.reduce((sum, l) => sum + Number(l.duration_minutes ?? l.durationMinutes ?? 0), 0)
)

const stats = [
  { icon: '🔥', primary: totalCaloriesLastWeek, secondary: 'cal' },
  {
    icon: '🕒',
    primary: vmComputed(() => {
      const minutes = totalDurationMinutes.value
      if (!minutes) return '0m'
      const h = Math.floor(minutes / 60)
      const m = minutes % 60
      return h ? `${h}h ${m}m` : `${m}m`
    }),
    secondary: 'treino'
  },
  { icon: '🏋️', primary: vmComputed(() => lastWeekLogs.value.length), secondary: 'treinos' }
]

const planCards = workouts.slice(0, 4)

// progress: number of completed logs in the current month and percent
const monthlyGoal = 100
const monthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1)
const monthCompleted = vmComputed(() =>
  logsStore.logs.filter((l) => {
    const d = parseLogDate(l)
    return d && d >= monthStart
  }).length
)

const progressPercent = vmComputed(() => Math.round((monthCompleted.value / monthlyGoal) * 100))
</script>

<template>
  <div class="treinamentos">
    <header>
      <div class="navegaçao">
        <h1>INMOVE</h1>
        <div class="pages">
          <RouterLink to="/principal"><span>Home</span></RouterLink>
          <RouterLink to="/dashboard">Dashboard</RouterLink>
          <RouterLink to="/">Explorar</RouterLink>
          <RouterLink v-if="!authStore.isAuthenticated" to="/cadastro" class="cadastro">Cadastro de Usuário</RouterLink>
          <RouterLink v-else to="/perfil" class="cadastro">
            <span class="avatar-sm">{{ authStore.user?.name ? authStore.user.name.charAt(0).toUpperCase() : 'U' }}</span>
            Perfil
          </RouterLink>
        </div>
      </div>
    </header>

    <main>
      <section class="intro-grid">
          <div class="progress-card">
            <h2>Olá {{ authStore.user?.name ? authStore.user.name.split(' ')[0] : 'usuário' }}!</h2>
          <div class="cta">
            <div>
              <p class="label">Seu progresso:</p>
              <p class="detail">{{ monthCompleted }} / {{ monthlyGoal }} treinos completos esse mês</p>
            </div>
            <div class="progress-pill"><span>{{ progressPercent }}%</span></div>
          </div>
        </div>

        <div class="stats">
          <h3>Resultados da última semana:</h3>
          <div class="stats-grid">
            <article v-for="stat in stats" :key="stat.icon">
              <div class="icon">{{ stat.icon }}</div>
              <strong>{{ stat.primary }}</strong>
              <small>{{ stat.secondary }}</small>
            </article>
          </div>
        </div>
      </section>

      <section class="plan surface">
        <h3>Seu plano de treinos:</h3>
        <div class="plan-grid">
          <RouterLink
            v-for="card in planCards"
            :key="card.slug"
            class="plan-card-link"
            :to="{ name: 'treinamentos.detail', params: { slug: card.slug } }"
          >
            <article class="plan-card">
              <img :src="card.cover" :alt="card.title" />
              <div class="info">
                <p class="meta">{{ card.meta }}</p>
                <h4>{{ card.title }}</h4>
              </div>
            </article>
          </RouterLink>
        </div>
      </section>

      <section class="completed surface">
        <h3>Treinos realizados:</h3>
        <div v-if="logsStore.logs.length === 0" class="empty">Nenhum treino registrado ainda.</div>

        <div v-else class="performed-grid">
          <RouterLink
            v-for="log in performedLogsSorted"
            :key="log.id || log.created_at || log.createdAt"
            :to="{ name: 'treinamentos.detail', params: { slug: (log.workout_slug ?? log.workoutSlug) } }"
            class="plan-card-link performed-card"
          >
            <article class="plan-card">
              <img :src="(getWorkoutBySlug(log.workout_slug ?? log.workoutSlug) || {}).cover || ''" :alt="(getWorkoutBySlug(log.workout_slug ?? log.workoutSlug) || {}).title || (log.workout_slug ?? log.workoutSlug)" />
              <div class="info">
                <p class="meta">{{ (getWorkoutBySlug(log.workout_slug ?? log.workoutSlug) || {}).meta ?? '' }}</p>
                <h4>{{ (getWorkoutBySlug(log.workout_slug ?? log.workoutSlug) || {}).title ?? (log.workout_slug ?? log.workoutSlug) }}</h4>
              </div>
            </article>
          </RouterLink>
        </div>
      </section>
    </main>
    <AppFooter />
  </div>
</template>

<style scoped>
.treinamentos {
  min-height: 100vh;
  background: #121212;
  color: #f5f5f5;
  font-family: 'Poppins', 'Inter', system-ui, sans-serif;
}
/* HEADER */
.navegaçao {
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

.avatar-sm {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: #ffffff;
  color: #000;
  font-weight: 700;
  margin-right: 8px;
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
  padding: 9px;
  border-radius: 50px;
  color: black;
  text-decoration: none;
}

.cadastro:hover {
  background-color: rgb(180, 202, 12);
}

.avatar-sm {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: #ffffff;
  color: #000;
  font-weight: 700;
  margin-right: 8px;
}

main {
    margin-top: 2rem;
  padding: 0 clamp(16px, 6vw, 72px) 48px;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.intro-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}

.progress-card,
.stats,
.plan {
  background: #1e1e1e;
  border-radius: 24px;
  padding: 32px;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.55);
}

.progress-card h2 {
  margin: 0 0 24px;
  color: rgb(206, 233, 4);
}

.cta {
  background: #f1f1f1;
  border-radius: 16px;
  padding: 18px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #111;
}

.cta .label {
  font-weight: 600;
  margin: 0;
}

.cta .detail {
  margin: 4px 0 0;
  opacity: 0.7;
}

.progress-pill {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: rgb(206, 233, 4);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.2rem;
}

.stats h3,
.plan h3 {
  margin: 0 0 18px;
  color: rgb(206, 233, 4);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 16px;
}

.stats-grid article {
  background: #aeaeae;
  color: #111;
  border-radius: 18px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  font-weight: 600;
}

.stats-grid strong {
  font-size: 1.4rem;
}

.plan-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 18px;
}

/* performed cards (user history) — show 2 per row on desktop, 1 per row on small screens */
.performed-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.performed-card {
  text-decoration: none;
}

.performed-card .plan-card {
  /* keep the plan-card structure but reduce height so cards are visually smaller */
  min-height: 140px;
}

.performed-card .plan-card h4 {
  margin: 6px 0 0;
  font-size: 0.95rem;
}

.plan-card-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.plan-card {
  border-radius: 16px;
  overflow: hidden;
  position: relative;
  min-height: 180px;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.plan-card-link:hover .plan-card {
  transform: translateY(-4px);
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.45);
}

.plan-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.plan-card .info {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.85));
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.plan-card .meta {
  margin: 0;
  font-size: 0.85rem;
  opacity: 0.85;
}

.plan-card h4 {
  margin: 4px 0 0;
}

@media (max-width: 640px) {
  .progress-card {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .progress-pill {
    align-self: center;
  }
}

@media (max-width: 640px) {
  .performed-grid {
    grid-template-columns: 1fr; /* single column on mobile */
  }
  /* keep plan-card image sizing and overlay intact on mobile — do not change the card's visual structure */
}
</style>
