<script setup>
import { RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import AppFooter from '@/components/AppFooter.vue'

const authStore = useAuthStore()

const workout = {
  title: 'Pernas Completo',
  focus: 'Glúteo e posteriores',
  cover: '/desportista-em-um-treinamento-de-sportswear-em-uma-academia.jpg',
  calories: '86 cal',
  duration: '1h30min',
}

const warmup = {
  title: 'Aquecimento + ativação glúteo',
  duration: '15min',
}

const icon = 'https://cdn.jsdelivr.net/gh/twitter/twemoji/assets/svg/1f4aa.svg'
const exercises = [
  { name: 'Agachamento sumô', volume: '4x15', art: icon },
  { name: 'Cadeira abdutora', volume: '4x15', art: icon },
  { name: 'Elevação Pélvica', volume: '3x12', art: icon },
  { name: 'Afundo búlgaro', volume: '4x12', art: icon },
  { name: 'Stiff', volume: '4x15', art: icon },
  { name: 'Cadeira extensora', volume: '3x12', art: icon },
  { name: 'Panturrilha sentado', volume: '3x15', art: icon },
]

function startWorkout() {
  alert('Treino iniciado! Foque na execução perfeita. 💪')
}
</script>

<template>
  <div class="treinos-view">
<header>
  <div class="navegaçao">
    <h1>INMOVE</h1>
    <div class="pages">
      <router-link to="/"><span>Home</span></router-link>
      <router-link to="/dashboard">Dashboard</router-link>
      <router-link to="/">Explorar</router-link>
      <router-link v-if="!authStore.isAuthenticated" to="/cadastro" class="cadastro">Cadastro de Usuário</router-link>
      <router-link v-else to="/perfil" class="cadastro">
        <span class="avatar-sm">{{ authStore.user?.name ? authStore.user.name.charAt(0).toUpperCase() : 'U' }}</span>
        Perfil
      </router-link>
    </div>
  </div>
</header>

    <main>
      <section class="hero">
        <div class="hero-card">
          <img :src="workout.cover" alt="Mulher executando treino" />
          <div class="hero-info">
            <p class="label">Treino do dia</p>
            <h2>{{ workout.title }}</h2>
            <p class="focus">{{ workout.focus }}</p>
            <div class="stats">
              <div class="stat">
                <span>🔥</span>
                <strong>{{ workout.calories }}</strong>
              </div>
              <div class="stat">
                <span>🕒</span>
                <strong>{{ workout.duration }}</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="warmup">
        <div class="warmup-card">
          <div>
            <p class="label">{{ warmup.title }}</p>
            <span class="gluteo-pill">Glúteo</span>
          </div>
          <div class="duration">
            <span>🕒</span>
            <strong>{{ warmup.duration }}</strong>
          </div>
        </div>
      </section>

      <section class="exercises">
        <article v-for="exercise in exercises" :key="exercise.name" class="exercise-card">
          <div class="art">
            <img :src="exercise.art" :alt="exercise.name" />
          </div>
          <div>
            <h3>{{ exercise.name }}</h3>
            <p>{{ exercise.volume }}</p>
          </div>
        </article>
      </section>

      <button class="start-btn" type="button" @click="startWorkout">Iniciar treino</button>
    </main>
    <AppFooter />
  </div>
</template>

<style scoped>
.treinos-view {
  min-height: 100vh;
  background: #0f0f0f;
  color: #f5f5f5;
  font-family: 'Poppins', 'Inter', system-ui, sans-serif;
  padding-bottom: 48px;
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
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #fff;
  color: #0f0f0f;
  margin-right: 6px;
  font-weight: 700;
}

main {
    margin-top: 2rem;
  padding: 0 clamp(16px, 6vw, 72px) 48px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.hero-card {
  background: #1c1c1c;
  border-radius: 36px;
  overflow: hidden;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.65);
}

.hero-card img {
  width: 100%;
  height: 220px;
  object-fit: cover;
}

.hero-info {
  padding: 24px;
}

.label {
  text-transform: uppercase;
  letter-spacing: 0.3em;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.75);
}

.hero-info h2 {
  margin: 12px 0 8px;
  font-size: clamp(1.6rem, 4vw, 2.2rem);
}

.focus {
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 18px;
}

.stats {
  display: flex;
  gap: 12px;
}

.stat {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border-radius: 999px;
  background: #2a2a2a;
  font-weight: 600;
}

.warmup-card {
  background: #303030;
  border-radius: 24px;
  padding: 18px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #f5f5f5;
}

.gluteo-pill {
  display: inline-flex;
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.1);
  margin-top: 6px;
  font-size: 0.8rem;
}

.duration {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 700;
}

.exercises {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.exercise-card {
  display: flex;
  align-items: center;
  gap: 16px;
  background: #2d2d2d;
  border-radius: 20px;
  padding: 14px 18px;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05);
}

.exercise-card img {
  width: 70px;
  height: 70px;
  object-fit: contain;
  filter: grayscale(1);
}

.exercise-card h3 {
  margin: 0;
  font-size: 1rem;
}

.exercise-card p {
  margin: 4px 0 0;
  opacity: 0.85;
}

.start-btn {
  margin-top: 16px;
  width: 100%;
  border: none;
  border-radius: 30px;
  padding: 16px;
  background: rgb(206, 233, 4);
  font-weight: 700;
  color: #111;
  font-size: 1rem;
  cursor: pointer;
  box-shadow: 0 18px 40px rgba(206, 233, 4, 0.35);
}

@media (max-width: 600px) {
  .hero-card img {
    height: 180px;
  }

  .exercise-card {
    flex-direction: column;
    text-align: center;
  }

  .exercise-card img {
    width: 100px;
    height: 100px;
  }
  .navegaçao{
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5rem;
  }
  .pages{
    justify-content: center;;
  }
}
</style>
