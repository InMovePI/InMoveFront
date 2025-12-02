<template>
  <article class="meal-card">
    <header>
      <div>
        <h3>{{ meal.title }}</h3>
        <p>{{ formatDateBR(meal.date) }} · {{ formatTimeHM(meal.time) }}</p>
      </div>
      <div class="actions">
        <button type="button" @click="$emit('view', meal.id)">Ver</button>
        <button type="button" class="danger" @click="$emit('delete', meal.id)">Excluir</button>
      </div>
    </header>

    <section class="ingredients" aria-label="Ingredientes">
      <div class="pill" v-for="(ing, idx) in previewIngredients" :key="ing.id || ing.food_name || idx">
        {{ ingredientLabel(ing) }}
      </div>
    </section>

    <footer>
      <div>
        <span>Calorias</span>
        <strong>{{ unit(meal.total_calories, 'kcal') }}</strong>
      </div>
      <div>
        <span>Proteína</span>
        <strong>{{ unit(meal.total_protein, 'g') }}</strong>
      </div>
      <div>
        <span>Carboidrato</span>
        <strong>{{ unit(meal.total_carbs, 'g') }}</strong>
      </div>
      <div>
        <span>Gordura</span>
        <strong>{{ unit(meal.total_fat, 'g') }}</strong>
      </div>
    </footer>
  </article>
</template>

<script setup>
import { computed } from 'vue'
import { formatDateBR, formatTimeHM } from '@/utils/datetime'
import { findCachedById } from '@/services/meals'

const props = defineProps({
  meal: { type: Object, required: true }
})

defineEmits(['view', 'delete'])

const previewIngredients = computed(() => {
  return (props.meal.ingredients || []).slice(0, 3)
})

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

function unit(value, symbol) {
  if (value == null || value === undefined) return '—'
  const n = Math.round(Number(value) * 10) / 10
  return `${n}${symbol === 'kcal' ? ' kcal' : ' ' + symbol}`
}
</script>

<style scoped>
.meal-card {
  background:#2c2c2c;
  color:#f0f0f0;
  border-radius:18px;
  border:1px solid rgba(255,255,255,0.05);
  padding:20px;
  display:flex;
  flex-direction:column;
  gap:18px;
  min-height:220px;
  position:relative;
  box-shadow:0 25px 45px rgba(0,0,0,0.35);
  transition: box-shadow .2s ease;
}
.meal-card::after {
  content:'';
  position:absolute;
  inset:8px;
  border-radius:16px;
  border:1px solid rgba(206,233,4,0.08);
  pointer-events:none;
}
.meal-card:hover {
  box-shadow:0 30px 60px rgba(206,233,4,0.12);
}
header { display:flex; justify-content:space-between; align-items:flex-start; gap:16px }
h3 { margin:0; font-size:22px }
p { margin:2px 0 0; opacity:0.8 }
.actions { display:flex; gap:10px }
.actions button {
  border:none;
  border-radius:10px;
  padding:8px 14px;
  font-weight:600;
  cursor:pointer;
  background:#1e1e1e;
  color:rgb(206, 233, 4);
  transition: box-shadow .2s ease;
}
.actions button:hover { box-shadow:0 0 12px rgba(206,233,4,0.35) }
button.danger { color:#fff; background:#ff5f5f }
.ingredients { display:flex; flex-wrap:wrap; gap:8px }
.pill {
  background:#1e1e1e;
  border-radius:999px;
  padding:6px 12px;
  font-size:13px;
  border:1px solid rgba(255,255,255,0.08);
}
footer { display:grid; grid-template-columns: repeat(4, minmax(0,1fr)); gap:12px }
footer div { background:#1e1e1e; padding:10px; border-radius:12px; border:1px solid rgba(255,255,255,0.06); text-align:center }
footer span { display:block; font-size:12px; opacity:0.7; text-transform:uppercase }

@media (max-width: 900px) {
  footer { grid-template-columns: repeat(2, minmax(0,1fr)) }
}
@media (max-width: 520px) {
  header { flex-direction:column }
  .actions { width:100%; justify-content:space-between }
  .actions button { flex:1 }
}
</style>
