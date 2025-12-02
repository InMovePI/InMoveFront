<template>
  <div class="meal-detail" role="dialog" aria-modal="true" v-if="meal" @click.self="$emit('close')">
    <div class="panel">
      <header class="header">
      <h2>{{ meal.title }}</h2>
      <div class="meta">{{ formatDateBR(meal.date) }} · {{ formatTimeHM(meal.time) }}</div>
    </header>

    <section class="summary">
      <div class="big-cal">
        <div class="big">{{ fmtUnit(meal.total_calories, 'kcal') }}</div>
        <div class="label">Total</div>
      </div>
      <div class="mini-macros">
        <div class="m">Prot<br/><strong>{{ fmtUnit(meal.total_protein, 'g') }}</strong></div>
        <div class="m">Carbs<br/><strong>{{ fmtUnit(meal.total_carbs, 'g') }}</strong></div>
        <div class="m">Fat<br/><strong>{{ fmtUnit(meal.total_fat, 'g') }}</strong></div>
      </div>
    </section>

    <section>
      <h3>Ingredientes</h3>
      <ul class="ingredients">
        <li v-for="(ing, idx) in meal.ingredients" :key="idx">
          <div class="name">{{ displayNameFor(ing) }}</div>
          <div class="weight">{{ ing.weight_grams }} g</div>
          <div class="macros">
            <span>cal: {{ fmtUnit(ing.calories, 'kcal') }}</span>
            <span>prot: {{ fmtUnit(ing.protein, 'g') }}</span>
            <span>carbs: {{ fmtUnit(ing.carbs, 'g') }}</span>
            <span>fat: {{ fmtUnit(ing.fat, 'g') }}</span>
          </div>
        </li>
      </ul>
    </section>

    <footer class="totals">
      <div>Total</div>
      <div class="total-values">
        <span>Calories: {{ fmtUnit(meal.total_calories, 'kcal') }}</span>
        <span>Protein: {{ fmtUnit(meal.total_protein, 'g') }}</span>
        <span>Carbs: {{ fmtUnit(meal.total_carbs, 'g') }}</span>
        <span>Fat: {{ fmtUnit(meal.total_fat, 'g') }}</span>
      </div>
    </footer>

    <div class="actions">
      <button @click="$emit('close')">Fechar</button>
      <button class="danger" @click="confirmDelete">Excluir</button>
    </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import { findCachedById } from '../services/meals'
import { formatDateBR, formatTimeHM } from '@/utils/datetime'

const props = defineProps({ meal: Object })
const emit = defineEmits(['close', 'delete'])

const deleting = ref(false)

function format(v) {
  if (v == null) return null
  // return numeric string
  return Number(v).toFixed(1)
}

function fmtUnit(v, unit) {
  if (v == null || v === undefined) return '—'
  const n = Math.round(Number(v) * 10) / 10
  return `${n}${unit === 'kcal' ? ' kcal' : ' ' + unit}`
}

function displayNameFor(ing) {
  // If backend returned a friendly name, prefer it
  if (ing?.name) return ing.name
  // some responses use 'food_name' as identifier (barcode) — try to resolve from cache
  const asId = ing?.food_name
  if (asId) {
    const cached = findCachedById(asId)
    if (cached && cached.name) return cached.name
  }
  if (ing?.query) return ing.query
  return 'Ingrediente'
}

async function confirmDelete() {
  if (!confirm('Tem certeza que deseja excluir esta refeição?')) return
  deleting.value = true
  try {
    await emit('delete')
  } finally {
    deleting.value = false
  }
}
</script>

<style scoped>
/* Fullscreen overlay modal */
.meal-detail {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.75);
  padding: 20px;
  box-sizing: border-box;
}

.meal-detail > .panel {
  width: min(920px, 96%);
  max-height: 86vh;
  overflow: auto;
  padding: 28px;
  border-radius: 18px;
  background: #1e1e1e;
  border: 1px solid rgba(206, 233, 4, 0.35);
  box-shadow: 0 40px 120px rgba(0, 0, 0, 0.65);
  color: #f0f0f0;
  animation: modalIn .28s cubic-bezier(.2, .9, .2, 1) both;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  border-bottom: 1px solid rgba(206, 233, 4, 0.15);
  padding-bottom: 14px;
  margin-bottom: 18px;
}

.header h2 {
  margin: 0;
  font-size: 24px;
  font-weight: 800;
  color: rgb(206, 233, 4);
}

.meta {
  opacity: 0.8;
  font-size: 15px;
}

.ingredients {
  list-style: none;
  padding: 0;
  margin: 12px 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.ingredients li {
  display: flex;
  gap: 12px;
  padding: 14px;
  border-radius: 12px;
  align-items: center;
  background: #2c2c2c;
  border: 1px solid rgba(206, 233, 4, 0.1);
}

.ingredients .name {
  font-weight: 700;
  flex: 1;
}

.ingredients .weight {
  opacity: 0.8;
  font-size: 13px;
}

.macros {
  display: flex;
  gap: 10px;
  color: #f0f0f0;
  font-weight: 600;
  flex-wrap: wrap;
}

.macros span {
  padding: 6px 10px;
  border-radius: 8px;
  background: rgba(206, 233, 4, 0.08);
  border: 1px solid rgba(206, 233, 4, 0.2);
  text-transform: uppercase;
  font-size: 12px;
}

.totals {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px;
  border-radius: 12px;
  background: #2c2c2c;
  border: 1px solid rgba(206, 233, 4, 0.18);
  margin-top: 20px;
  gap: 12px;
}

.total-values {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  font-weight: 700;
}

.summary {
  display: flex;
  gap: 18px;
  align-items: center;
  padding: 12px 0 24px;
}

.big-cal {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 180px;
  padding: 18px;
  border-radius: 16px;
  background: rgba(206, 233, 4, 0.12);
  border: 1px solid rgba(206, 233, 4, 0.35);
}

.big-cal .big {
  font-size: 42px;
  font-weight: 900;
  color: rgb(206, 233, 4);
}

.big-cal .label {
  opacity: 0.7;
  font-size: 13px;
}

.mini-macros {
  display: flex;
  gap: 12px;
  color: #f0f0f0;
  flex-wrap: wrap;
}

.mini-macros .m {
  background: #2c2c2c;
  padding: 12px 16px;
  border-radius: 12px;
  border: 1px solid rgba(206, 233, 4, 0.18);
  text-align: center;
  font-weight: 700;
  min-width: 100px;
}

.mini-macros .m strong {
  display: block;
  font-size: 20px;
  color: rgb(206, 233, 4);
}

.actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 18px;
}

.actions button {
  padding: 12px 20px;
  border-radius: 999px;
  border: 1px solid transparent;
  cursor: pointer;
  font-weight: 600;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.actions button:first-child {
  background: transparent;
  border-color: rgba(206, 233, 4, 0.3);
  color: rgb(206, 233, 4);
}

.actions button:first-child:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 18px rgba(206, 233, 4, 0.25);
}

.danger {
  background: linear-gradient(120deg, #ff4d4d, #ff1f1f);
  color: #fff;
}

.danger:hover {
  transform: translateY(-1px);
  box-shadow: 0 12px 24px rgba(255, 77, 77, 0.35);
}

@keyframes modalIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 760px) {
  .meal-detail > .panel { padding: 18px; width: 100%; }
  .summary { flex-direction: column; align-items: flex-start; }
  .big-cal { width: 100%; }
  .ingredients li { flex-direction: column; align-items: flex-start; }
}
</style>
