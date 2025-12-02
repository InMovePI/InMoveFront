<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { listMeals, findCachedById } from '@/services/meals'
import { formatDateBR, formatTimeHM } from '@/utils/datetime'
import AppFooter from '@/components/AppFooter.vue'

const authStore = useAuthStore()
const recentMeals = ref([])
const mealsLoading = ref(false)
const mealsError = ref(null)

function fmtUnit(value, unit) {
  if (value === null || value === undefined) return '—'
  const n = Math.round(Number(value) * 10) / 10
  return `${n}${unit === 'kcal' ? ' kcal' : ' ' + unit}`
}

function ingredientLabel(ingredient) {
  if (!ingredient) return 'Ingrediente'
  if (ingredient.name) return ingredient.name
  if (ingredient.display_name) return ingredient.display_name
  if (ingredient.food?.name) return ingredient.food.name

  if (ingredient.food_name) {
    const cached = findCachedById(ingredient.food_name)
    if (cached?.name) return cached.name
    if (cached?.brand && cached?.name) return `${cached.brand} ${cached.name}`
    if (cached?.brand) return cached.brand
  }

  if (ingredient.query) return ingredient.query
  if (ingredient.brand) return ingredient.brand
  return 'Ingrediente'
}

function topIngredients(meal) {
  return (meal?.ingredients || []).slice(0, 3)
}

async function fetchRecentMeals() {
  mealsLoading.value = true
  mealsError.value = null
  try {
    const data = await listMeals({ page: 1 })
    let list = []
    if (Array.isArray(data)) {
      list = data
    } else if (Array.isArray(data?.results)) {
      list = data.results
    }
    recentMeals.value = list.slice(0, 3)
  } catch (error) {
    console.error(error)
    mealsError.value = 'Erro ao carregar refeições'
    recentMeals.value = []
  } finally {
    mealsLoading.value = false
  }
}

onMounted(fetchRecentMeals)
</script>

<template>
<header>
  <div class="navegaçao">
    <h1>INMOVE</h1>
    <div class="pages">
      <router-link to="/">Home</router-link>
      <router-link to="/dashboard"><span>Dashboard</span></router-link>
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
    <div class="intro">
      <div class="texto">
        <h1>Metas diárias:</h1>
        <p>
          Mantenha o foco nos seus objetivos! Cada progresso conta — complete suas metas e veja sua
          evolução acontecer em tempo real.
        </p>
      </div>

      <img src="/young-athletic-woman-exercising-situps-with-weight-plate-gym.jpg" />
    </div>

    <section class="cards">
      <div class="cards-head">
        <div>
          <h2>Últimas refeições cadastradas</h2>
          <p>Acompanhe rapidamente as três refeições mais recentes registradas.</p>
        </div>
        <router-link class="cards-link" to="/meals">Ver todas</router-link>
      </div>

      <div class="cards-grid" v-if="mealsLoading">
        <div class="card-placeholder">Carregando refeições...</div>
      </div>

      <div class="cards-grid" v-else-if="recentMeals.length">
        <article
          v-for="meal in recentMeals"
          :key="meal.id"
          class="recent-meal-card"
        >
          <header class="recent-meal-head">
            <div>
              <h3>{{ meal.title || 'Refeição sem título' }}</h3>
              <p>{{ formatDateBR(meal.date) }} · {{ formatTimeHM(meal.time) }}</p>
            </div>
          </header>

          <div class="macro-row">
            <div>
              <span>Calorias</span>
              <strong>{{ fmtUnit(meal.total_calories, 'kcal') }}</strong>
            </div>
            <div>
              <span>Proteínas</span>
              <strong>{{ fmtUnit(meal.total_protein, 'g') }}</strong>
            </div>
            <div>
              <span>Carboidratos</span>
              <strong>{{ fmtUnit(meal.total_carbs, 'g') }}</strong>
            </div>
            <div>
              <span>Gorduras</span>
              <strong>{{ fmtUnit(meal.total_fat, 'g') }}</strong>
            </div>
          </div>

          <div class="ingredients-preview" v-if="topIngredients(meal).length">
            <span
              class="pill"
              v-for="(ingredient, idx) in topIngredients(meal)"
              :key="ingredient.id || ingredient.food_name || idx"
            >
              {{ ingredientLabel(ingredient) }}
            </span>
          </div>
        </article>
      </div>

      <div class="cards-grid" v-else>
        <div class="card-placeholder">
          {{ mealsError || 'Nenhuma refeição cadastrada ainda. Registre sua primeira refeição para acompanhá-la aqui.' }}
        </div>
      </div>
    </section>

    <div class="treinos">
      <div class="treinos-header">
        <h1>Últimos treinos realizados:</h1>
        <a href="#" class="ver-todos">Ver todos</a>
      </div>
      <div class="images">
        <div class="cardImg">
          <img src="/desportista-em-um-treinamento-de-sportswear-em-uma-academia.jpg" alt="">
          <div class="cardImg-overlay">
            <div class="cardImg-info">
              <p class="exercicios">8 exercícios/ 1h30/ 380cal</p>
              <h3>Cardio & Abdômen</h3>
              <span class="data">Realizado em 22/10</span>
            </div>
            <button class="cardImg-btn">></button>
          </div>
        </div>
        <div class="cardImg">
          <img src="/vista-de-angulo-baixo-homem-de-construcao-muscular-irreconhecivel-se-preparando-para-levantar-uma-barra-em-um-clube-de-saude.jpg" alt="">
          <div class="cardImg-overlay">
            <div class="cardImg-info">
              <p class="exercicios">9 exercícios/ 1h30/ 400cal</p>
              <h3>Peito & Tríceps</h3>
              <span class="data">Realizado em 23/10</span>
            </div>
            <button class="cardImg-btn">></button>
          </div>
        </div>
      </div>
      <button class="ir-treinos">Ir para página de treinos ></button>
    </div>

  
  </main>
  <AppFooter />
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  overflow-x: hidden;
}
/* HEADER */
.navegaçao {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background-color: white;
  padding: 2.3rem;
  flex-wrap: wrap;
  gap: 3.7rem;
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

span {
  color: rgb(206, 233, 4);
}

/* ========== MAIN ========== */
main {
  display: flex;
  flex-direction: column;
  gap: 60px;
  padding-bottom: 60px;
}

/* ========== INTRO ========== */
.intro {
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 90vh;
  width: 100%;
  padding: 60px 80px;
  box-sizing: border-box;
  gap: 40px;
  flex-wrap: wrap;
}

.intro img {
  width: 100%;
  max-width: 700px;
  height: auto;
  aspect-ratio: 16/10;
  border-radius: 30px;
  object-fit: cover;
  flex: 1;
  min-width: 300px;
}

.texto {
  flex: 1;
  min-width: 300px;
  max-width: 500px;
}

.texto h1 {
  color: white;
  font-size: 50px;
  font-weight: bolder;
  margin-bottom: 20px;
  line-height: 1.2;
}

.texto p {
  color: white;
  font-size: 19px;
  line-height: 1.6;
}

/* ========== CARDS (Últimas refeições) ========== */
.cards {
  display: flex;
  flex-direction: column;
  gap: 20px;
  font-family: Poppins, sans-serif;
  color: white;
  padding: 0 40px;
}

.cards-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 12px;
}

.cards-head h2 {
  font-size: 32px;
  margin: 0;
}

.cards-head p {
  margin: 6px 0 0;
  opacity: 0.85;
  max-width: 480px;
}

.cards-link {
  background-color: rgb(206, 233, 4);
  color: black;
  text-decoration: none;
  padding: 10px 18px;
  border-radius: 20px;
  font-weight: 600;
  box-shadow: 0 12px 24px rgba(206, 233, 4, 0.25);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.cards-link:hover {
  transform: translateY(-1px);
  box-shadow: 0 16px 30px rgba(206, 233, 4, 0.35);
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 20px;
  width: 100%;
}

.recent-meal-card {
  background-color: #ffffff;
  color: #111;
  border-radius: 20px;
  border: 1px solid rgba(0, 0, 0, 0.06);
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-shadow: 0 25px 45px rgba(0, 0, 0, 0.15);
}

.recent-meal-head h3 {
  margin: 0;
  font-size: 22px;
}

.recent-meal-head p {
  margin: 6px 0 0;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.65);
}

.macro-row {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
}

.macro-row div {
  background: #f5f5f5;
  border-radius: 14px;
  padding: 12px;
  text-align: center;
  border: 1px solid rgba(0, 0, 0, 0.06);
}

.macro-row span {
  display: block;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  opacity: 0.7;
  color: black;
}

.macro-row strong {
  font-size: 20px;
  color: rgb(0, 0, 0);
}

.ingredients-preview {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.ingredients-preview .pill {
  background: rgba(206, 233, 4, 0.15);
  border-radius: 999px;
  border: 1px solid rgba(206, 233, 4, 0.4);
  padding: 6px 12px;
  font-size: 13px;
  color: #111;
}

.card-placeholder {
  grid-column: 1 / -1;
  background: #ffffff;
  color: #111;
  border: 1px dashed rgba(206, 233, 4, 0.7);
  border-radius: 20px;
  padding: 28px;
  text-align: center;
}

/* ========== TREINOS ========== */
.treinos {
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 0 40px;
  gap: 30px;
}

.treinos-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1200px;
}

.treinos h1 {
  font-family: Poppins, sans-serif;
  color: white;
  font-size: 32px;
  text-align: center;
}

.ver-todos {
  color: white;
  text-decoration: none;
  font-size: 16px;
  transition: color 0.3s ease;
}

.ver-todos:hover {
  color: rgb(206, 233, 4);
}

.images {
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 60px;
  flex-wrap: wrap;
  width: 100%;
}

.cardImg {
  position: relative;
  overflow: hidden;
  border-radius: 20px;
  flex: 1;
  min-width: 300px;
  max-width: 500px;
  cursor: pointer;
}

.cardImg img {
  width: 100%;
  height: auto;
  aspect-ratio: 16/10;
  object-fit: cover;
  filter: blur(2px);
  border-radius: 20px;
  transition: filter 0.3s ease;
}

.cardImg:hover img {
  filter:blur(2px) brightness(0.7);
}

.cardImg-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 25px;
  background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 70%, transparent 100%);
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.cardImg-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.cardImg-info .exercicios {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
}

.cardImg-info h3 {
  font-size: 22px;
  font-weight: 600;
  margin: 0;
  color: white;
}

.cardImg-info .data {
  display: inline-block;
  background-color: rgb(206, 233, 4);
  color: black;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  width: fit-content;
}

.cardImg-btn {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background-color: white;
  border: none;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.cardImg-btn:hover {
  background-color: rgb(206, 233, 4);
}

.ir-treinos {
  background-color: transparent;
  color: white;
  border: 2px solid white;
  padding: 15px 35px;
  border-radius: 50px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  font-family: Poppins, sans-serif;
  transition:  0.6s;
  margin-top: 15px;
}

.ir-treinos:hover {
  background-color: rgb(206, 233, 4);
  color: black;
  border-color: rgb(206, 233, 4);
}

/* ========== REFEIÇÕES ========== */
.refeicoes {
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 0 40px;
  gap: 30px;
}

.refeicoes h1 {
  font-family: Poppins, sans-serif;
  color: white;
  font-size: 32px;
}

.refeicoes-cards {
  display: flex;
  justify-content: space-around;
  align-items: stretch;
  gap: 40px;
  flex-wrap: wrap;
  width: 100%;
}

.refeicao-card {
  background-color: #f2f0ef;
  border-radius: 20px;
  padding: 25px;
  flex: 1;
  min-width: 280px;
  max-width: 350px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  transition: all 0.3s ease;
}

.refeicao-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.refeicao-header h3 {
  font-size: 20px;
  color: black;
  margin: 0;
  font-weight: 600;
}

.horario {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.7);
  margin: 0;
}

.macros {
  display: flex;
  justify-content: space-between;
  gap: 15px;
}

.macro-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}

.macro-label {
  font-size: 11px;
  color: rgba(0, 0, 0, 0.7);
  margin: 0;
  text-align: center;
}

.macro-value {
  font-size: 16px;
  font-weight: bold;
  color: black;
  margin: 0;
}

.calorias {
  font-size: 24px;
  font-weight: bold;
  color: black;
  text-align: center;
  margin: 0;
  padding-top: 10px;
  border-top: 2px solid rgba(0, 0, 0, 0.1);
}

.ir-dieta {
  background-color: transparent;
  color: white;
  border: 2px solid white;
  padding: 15px 35px;
  border-radius: 50px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  font-family: Poppins, sans-serif;
  transition: 0.6s;
  margin-top: 15px;
}

.ir-dieta:hover {
  background-color: rgb(206, 233, 4);
  color: black;
  border-color: rgb(206, 233, 4);
}

/* ========== RESPONSIVIDADE ========== */

/* Tablets grandes (até 1200px) */
@media (max-width: 1200px) {
  .intro {
    padding: 50px 60px;
  }

  .texto h1 {
    font-size: 42px;
  }

  .intro img {
    max-width: 600px;
  }

  .images {
    gap: 40px;
  }
}

/* Tablets (até 1024px) */
@media (max-width: 1024px) {
  .navegaçao h1 {
    font-size: 24px;
  }

  .refeicoes h1 {
  font-size: 28px;
}

  .pages {
    gap: 30px;
  }

  .intro {
    padding: 40px 50px;
    min-height: auto;
  }

  .texto h1 {
    font-size: 38px;
  }

  .texto p {
    font-size: 17px;
  }

  .cards {
    padding: 0 30px;
  }

  .treinos h1 {
    font-size: 28px;
  }
}

/* Tablets menores (até 900px) */
@media (max-width: 900px) {
  .intro {
    flex-direction: column;
    text-align: center;
    padding: 40px 40px;
  }

  .texto {
    max-width: 100%;
  }

  .texto h1,
  .texto p {
    text-align: center;
  }

  .intro img {
    max-width: 100%;
  }

  .cards-head {
    flex-direction: column;
    align-items: flex-start;
  }

  .cards-grid {
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  }
}

/* Mobile (até 768px) */
@media (max-width: 768px) {
  .navegaçao h1 {
    font-size: 20px;
  }
  
  .refeicoes {
  padding: 0 25px;
}

.refeicoes h1 {
  font-size: 24px;
}

.refeicoes-cards {
  gap: 25px;
}

.refeicao-card {
  min-width: 250px;
}

  .pages {
    gap: 20px;
  }

  .pages a {
    font-size: 14px;
  }

  .cadastro {
    padding: 8px 16px;
    font-size: 14px;
  }

  .intro {
    padding: 30px 25px;
    gap: 30px;
  }

  .texto h1 {
    font-size: 32px;
  }

  .texto p {
    font-size: 16px;
  }

  .cards {
    padding: 0 25px;
  }

  .cards-head h2 {
    font-size: 26px;
  }

  .cards-head p {
    font-size: 14px;
  }

  .macro-row {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .treinos {
    padding: 0 25px;
  }

  .treinos-header {
    flex-direction: column;
    gap: 15px;
  }

  .treinos h1 {
    font-size: 24px;
  }

  .images {
    gap: 30px;
  }

  .cardImg {
    min-width: 250px;
  }

  .cardImg-info h3 {
    font-size: 18px;
  }

  .cardImg-overlay {
    padding: 20px;
  }
}

/* Mobile pequeno (até 480px) */
@media (max-width: 480px) {
  .navegaçao h1 {
    font-size: 18px;
  }

  .refeicoes {
  padding: 0 20px;
}

.refeicoes h1 {
  font-size: 20px;
}

.refeicoes-cards {
  gap: 20px;
  flex-direction: column;
  align-items: center;
}

.refeicao-card {
  min-width: 100%;
  max-width: 450px;
}

  .pages {
    gap: 10px;
    justify-content: center;
  }

  .pages a {
    font-size: 12px;
  }

  .cadastro {
    padding: 6px 12px;
    font-size: 12px;
  }

  .intro {
    padding: 25px 20px;
  }

  .texto h1 {
    font-size: 28px;
  }

  .texto p {
    font-size: 15px;
  }

  .cards {
    padding: 0 20px;
  }

  .card1, .card2, .card3 {
    padding: 25px 20px;
    min-width: 100%;
  }

  .cards h1 {
    font-size: 18px;
  }

  .cards p {
    font-size: 24px;
  }

  .cards a {
    padding: 10px 16px;
    font-size: 14px;
  }

  .treinos {
    padding: 0 20px;
  }

  .treinos h1 {
    font-size: 20px;
  }

  .images {
    gap: 20px;
  }

  .cardImg {
    min-width: 100%;
  }

  .cardImg-info h3 {
    font-size: 16px;
  }

  .cardImg-info .exercicios {
    font-size: 10px;
  }

  .cardImg-overlay {
    padding: 15px;
  }

  .cardImg-btn {
    width: 35px;
    height: 35px;
    font-size: 20px;
  }
}
</style>