<template>
  <div class="weekly-summary">
    <h3>Resumo Semanal</h3>

    <div v-if="loading" class="spinner">Carregando resumo...</div>

    <table v-if="!loading && data">
      <thead>
        <tr>
          <th>Dia</th>
          <th>Calories (kcal)</th>
          <th>Protein (g)</th>
          <th>Carbs (g)</th>
          <th>Fat (g)</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="dateKey in orderedDateKeys()" :key="dateKey">
          <td :data-label="'Dia'">{{ formatDateBR(dateKey) }}</td>
          <td :data-label="'Calories (kcal)'">{{ fmtUnit(data.days?.[dateKey]?.calories, 'kcal') }}</td>
          <td :data-label="'Protein (g)'">{{ fmtUnit(data.days?.[dateKey]?.protein, 'g') }}</td>
          <td :data-label="'Carbs (g)'">{{ fmtUnit(data.days?.[dateKey]?.carbs, 'g') }}</td>
          <td :data-label="'Fat (g)'">{{ fmtUnit(data.days?.[dateKey]?.fat, 'g') }}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td>Total</td>
          <td :data-label="'Total (kcal)'">{{ fmtUnit(data.week_totals?.calories, 'kcal') }}</td>
          <td :data-label="'Total (g)'">{{ fmtUnit(data.week_totals?.protein, 'g') }}</td>
          <td :data-label="'Total (g)'">{{ fmtUnit(data.week_totals?.carbs, 'g') }}</td>
          <td :data-label="'Total (g)'">{{ fmtUnit(data.week_totals?.fat, 'g') }}</td>
        </tr>
      </tfoot>
    </table>

    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { weeklySummary } from '../services/meals'
import { formatDateBR } from '@/utils/datetime'

const data = ref(null)
const loading = ref(false)
const error = ref(null)


function fmt(v){ return v == null ? null : Number(v).toFixed(1) }

function fmtUnit(v, unit){
  if (v == null || v === undefined) return '—'
  const n = Math.round(Number(v) * 10) / 10
  return `${n}${unit === 'kcal' ? ' kcal' : ' ' + unit}`
}

async function load() {
  loading.value = true
  try {
    data.value = await weeklySummary()
  } catch (err) {
    error.value = 'Erro ao carregar resumo semanal'
  } finally {
    loading.value = false
  }
}

  onMounted(load)

  // helper to return ordered date keys (asc) for table rendering
  const orderedDateKeys = () => {
    if (!data.value?.days) return []
    return Object.keys(data.value.days).sort()
  }
</script>

<style scoped>
.weekly-summary {
  padding: clamp(20px, 4vw, 36px);
  border-radius:20px;
  background:#1e1e1e;
  border: 1px solid #2c2c2c;
  box-shadow: 0 35px 80px rgba(0,0,0,0.55);
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  color:#f0f0f0;
  box-sizing: border-box;
}
table { width:100%; border-collapse: separate; border-spacing: 0; border-radius:12px; overflow:hidden; border:1px solid #2c2c2c }
th, td { padding:16px 18px; text-align:left }
thead th { background:#151515; font-weight:700 }
tbody tr { transition: background .12s ease }
tbody tr:hover { background: rgba(206,233,4,0.05) }
tfoot tr { font-weight:800; background:#151515 }
.spinner { padding:14px }
.error { color:#ff6b6b; font-weight:700 }

@media (max-width: 720px) {
  table, thead, tbody, th, td, tr { display:block }
  thead { display:none }
  tbody tr { margin-bottom:12px; border-radius:16px; padding:16px; background:#151515; border: 1px solid #2c2c2c }
  td { padding:8px 10px; display:flex; justify-content:space-between }
  td::before { content: attr(data-label); font-weight:700; opacity:0.8; margin-right:10px }
}
</style>
