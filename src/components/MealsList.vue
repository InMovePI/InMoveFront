<template>
  <div class="meals-list">
    <header class="hero">
      <div class="hero-left">
        <h1>Minhas Refeições</h1>
        <p class="subtitle">Registre suas refeições, calcule macros e acompanhe sua semana de forma clara.</p>
      </div>
      <div class="hero-right">
        <div class="toolbar">
          <div class="left"><label for="dateFilter">Data</label><input id="dateFilter" type="date" v-model="dateStr" @change="load" /></div>
          <router-link to="/meals/create" class="btn">Nova Refeição</router-link>
        </div>
      </div>
    </header>

    <div v-if="loading" class="spinner">Carregando...</div>

    <div v-if="!loading" class="cards">
      <MealCard
        v-for="item in items"
        :key="item.id"
        :meal="item"
        @view="openDetail"
        @delete="del"
      />
    </div>

    <nav class="pagination" aria-label="Pagination">
      <button :disabled="page<=1" @click="prev">Anterior</button>
      <span>Page {{ page }}</span>
      <button :disabled="!meta?.next" @click="next">Próxima</button>
    </nav>

    <MealDetail v-if="showDetail" :meal="detailMeal" @close="closeDetail" @delete="deleteFromDetail"/>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { listMeals, getMeal, deleteMeal } from '../services/meals'
import MealDetail from './MealDetail.vue'
import MealCard from './meals/MealCard.vue'

const dateStr = ref(new Date().toISOString().slice(0, 10))
const items = ref([])
const meta = ref(null)
const page = ref(1)
const loading = ref(false)
const showDetail = ref(false)
const detailMeal = ref(null)

function format(v) { return v == null ? null : Number(v).toFixed(1) }

async function load() {
  loading.value = true
  try {
    const data = await listMeals({ date: dateStr.value, page: page.value })
    // backend may use a custom pagination (page/total_pages/results) or standard next/previous pattern
    if (data && data.results) {
      items.value = data.results
      meta.value = { page: data.page || page.value, total_pages: data.total_pages ?? null, page_size: data.page_size ?? null }
      // ensure local page matches backend page when provided
      if (data.page) page.value = data.page
    } else if (Array.isArray(data)) {
      items.value = data
      meta.value = null
    } else {
      // fallback for older paginator formats
      items.value = data.results || data
      meta.value = { next: data.next, prev: data.previous }
    }
  } catch (err) {
    console.error(err)
    alert('Erro ao carregar refeições')
  } finally {
    loading.value = false
  }
}

function prev() {
  if (meta.value?.page && meta.value.page > 1) {
    page.value = meta.value.page - 1
    load()
  } else if (page.value > 1) { page.value -= 1; load() }
}

function next() {
  if (meta.value?.total_pages && meta.value.page < meta.value.total_pages) {
    page.value = meta.value.page + 1
    load()
  } else if (meta.value?.next) { page.value += 1; load() }
}

async function openDetail(id) {
  try {
    loading.value = true
    const data = await getMeal(id)
    detailMeal.value = data
    showDetail.value = true
  } catch (err) {
    console.error(err)
    alert('Erro ao obter detalhe')
  } finally {
    loading.value = false
  }
}

function closeDetail() { showDetail.value = false; detailMeal.value = null }

async function del(id) {
  if (!confirm('Tem certeza que deseja excluir?')) return
  loading.value = true
  try {
    await deleteMeal(id)
    await load()
  } catch (err) {
    console.error(err)
    alert('Erro ao excluir')
  } finally {
    loading.value = false
  }
}

async function deleteFromDetail() {
  if (!detailMeal.value?.id) return
  await deleteMeal(detailMeal.value.id)
  closeDetail()
  load()
}

onMounted(load)
</script>

<style scoped>

.meals-list {
  padding: clamp(20px, 4vw, 48px);
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  box-sizing: border-box;
  display:flex;
  flex-direction:column;
  gap:20px;
  background:#121212;
  min-height:100vh;
  color:#f0f0f0;
}

.toolbar {
  display:flex;
  gap:16px;
  align-items:center;
  justify-content:space-between;
  flex-wrap:wrap;
  width:100%;
}

.toolbar .left {
  display:flex;
  gap:12px;
  align-items:center;
  flex:1;
  min-width:220px;
}

.toolbar label { font-weight:600; white-space:nowrap }

.toolbar input {
  flex:1;
  min-width:0;
  padding:10px 14px;
  border-radius:12px;
  border:1px solid #2c2c2c;
  background:#1e1e1e;
  color:#f0f0f0;
}

.toolbar input:focus { border-color:rgb(206, 233, 4); box-shadow:0 0 12px rgba(206,233,4,0.28); outline:none }

.btn {
  padding:12px 16px;
  border-radius:14px;
  background:rgb(206, 233, 4);
  color:#111;
  font-weight:700;
  text-decoration:none;
  box-shadow:0 0 15px rgba(206,233,4,0.25);
  white-space:nowrap;
  text-align:center;
}

.btn:hover { box-shadow:0 0 20px rgba(206,233,4,0.4) }

.hero {
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:24px;
  padding:36px;
  border-radius:22px;
  background:#1e1e1e;
  border:1px solid #2c2c2c;
  box-shadow:0 35px 80px rgba(0,0,0,0.5);
  flex-wrap:wrap;
}



.hero-left h1 {
  margin:0;
  font-size:clamp(1.8rem, 4vw, 2.6rem);
  font-weight:900;
  line-height:1.2;
  overflow-wrap:break-word;
}

.subtitle {
  margin-top:6px;
  opacity:0.85;
  max-width:520px;
  font-size:clamp(.95rem, 1.8vw, 1.1rem);
}

.hero-right { display:flex; align-items:center; justify-content:flex-end }

.cards {
  display:grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap:20px;
  width:100%;
  min-width:0;
}
.spinner { padding:1.5rem; text-align:center; color:#f0f0f0 }
.pagination { display:flex; gap:1rem; align-items:center; margin-top:1rem; justify-content:center; flex-wrap:wrap }
.pagination button { padding:10px 16px; border-radius:12px; border:1px solid #2c2c2c; background:#1e1e1e; color:#f0f0f0 }
.pagination button:disabled { opacity:0.5 }

@media (max-width: 960px) {
  .hero {
    flex-direction:column;
    align-items:flex-start;
    padding:24px;
    gap:18px;
  }
  .toolbar { flex-direction:column; align-items:flex-start }
}

@media (max-width: 640px) {
  .hero { gap:16px; padding:20px }
  .toolbar { align-items:stretch }
  .toolbar .left { flex-direction:column; align-items:flex-start; width:100% }
  .toolbar label { font-size:0.9rem }
  .toolbar input { width:100% }
  .btn { width:100% }
  .cards { grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)) }
  .pagination { flex-direction:column; gap:0.5rem }
}
</style>
