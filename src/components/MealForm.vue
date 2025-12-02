<template>
  <form class="meal-form" @submit.prevent="submit">
    <header class="page-head">
      <div class="title">Criar Refeição</div>
      <div class="subtitle">Adicione ingredientes, ajuste pesos e salve sua refeição — tudo visualizado em kcal e gramas.</div>
    </header>
    <div class="row">
      <label for="title">Título</label>
      <input id="title" v-model="title" required />
    </div>

    <div class="row">
      <label for="date">Data</label>
      <input id="date" type="date" v-model="date" />

      <label for="time">Hora</label>
      <input id="time" type="time" v-model="time" />
    </div>

    <h4>Ingredientes</h4>
    <div class="ingredients">
      <IngredientInput
        v-for="(ing, idx) in ingredients"
        :key="idx"
        :ingredient="ing"
        :idx="idx"
        @query-change="(value) => handleQuery(idx, value)"
        @weight-change="(value) => handleWeight(idx, value)"
        @select-suggestion="(opt) => selectSuggestion(idx, opt)"
        @remove="remove(idx)"
      />
    </div>

    <div class="form-actions">
      <button type="button" class="add-ingredient" @click="add">
        <span class="icon" aria-hidden="true">+</span>
        <span>Adicionar ingrediente</span>
      </button>
      <div class="totals" aria-live="polite">
        <div>
          <span class="label">Calorias</span>
          <strong>{{ fmtUnit(total.calories, 'kcal') }}</strong>
        </div>
        <div>
          <span class="label">Proteínas</span>
          <strong>{{ fmtUnit(total.protein, 'g') }}</strong>
        </div>
        <div>
          <span class="label">Carboidratos</span>
          <strong>{{ fmtUnit(total.carbs, 'g') }}</strong>
        </div>
        <div>
          <span class="label">Gorduras</span>
          <strong>{{ fmtUnit(total.fat, 'g') }}</strong>
        </div>
      </div>
    </div>

    <div class="submit">
      <button type="submit" :disabled="loading">Salvar</button>
      <button type="button" @click="$router.back()">Cancelar</button>
    </div>

    <div v-if="error" class="error">{{ error }}</div>

  </form>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import useDebounce from '../hooks/useDebounce'
import { searchFood, createMeal } from '../services/meals'
import { useRouter } from 'vue-router'
import IngredientInput from './meals/IngredientInput.vue'

const router = useRouter()

const title = ref('')
const date = ref(new Date().toISOString().slice(0, 10))
const time = ref('08:00:00')
const loading = ref(false)
const error = ref(null)

function emptyIngredient() {
  return reactive({ query: '', selected: null, weight_grams: 100, suggestions: [], calories: 0, protein: 0, carbs: 0, fat: 0 })
}

const ingredients = ref([emptyIngredient()])

function add() { ingredients.value.push(emptyIngredient()) }
function remove(i) { ingredients.value.splice(i, 1) }

function fmt(v) { return v == null ? null : Number(v).toFixed(1) }

function fmtUnit(v, unit) {
  if (v == null || v === undefined) return '—'
  // remove trailing .0 when integer-ish
  const n = Math.round(Number(v) * 10) / 10
  return `${n}${unit === 'kcal' ? ' kcal' : ' ' + unit}`
}

const total = computed(() => {
  return ingredients.value.reduce((acc, ing) => ({
    calories: acc.calories + Number(ing.calories || 0),
    protein: acc.protein + Number(ing.protein || 0),
    carbs: acc.carbs + Number(ing.carbs || 0),
    fat: acc.fat + Number(ing.fat || 0),
  }), { calories: 0, protein: 0, carbs: 0, fat: 0 })
})

// per-ingredient debounce state
const debouncedMap = new Map()

function getDebouncer(idx) {
  if (!debouncedMap.has(idx)) {
    const container = ref('')
    const { debounced } = useDebounce(container, 300)
    debouncedMap.set(idx, { container, debounced })
  }
  return debouncedMap.get(idx)
}

function handleQuery(idx, value) {
  ingredients.value[idx].query = value
  onQuery(idx, value)
}

function onQuery(idx, value) {
  const deb = getDebouncer(idx)
  deb.container.value = value ?? ingredients.value[idx].query
  deb.debounced.value = deb.container.value // ensure watch in hook triggers
  // watch the debounced value asynchronously
  setTimeout(async () => {
    const q = (deb.debounced.value || '').trim()
    if (!q) { ingredients.value[idx].suggestions = []; return }
    try {
      // prefer Portuguese (Brazil) results where backend supports it
      const results = await searchFood(q, { lang: 'pt', country: 'BR' })
      // Strict pt-BR filter: only show results that appear to be Brazilian/Portuguese.
      // Backend is asked to filter by country=BR/lang=pt but we'll enforce strictly on client
      // so the autocomplete only displays pt-BR items when requested.
      const looksBrazilian = (r) => {
        const txt = ((r.name || '') + ' ' + (r.brand || '') + ' ' + (r.country || '') + ' ' + (r.languages || '')).toLowerCase()
        // check for common portuguese letters or Brazil marker
        if (/[ãáâàéêíóôõúç]/i.test(txt)) return true
        if (/(brasil|brazil|\bbr\b|pt|pt_br)/i.test(txt)) return true
        // check explicit countries/language arrays if present
        if (Array.isArray(r.languages) && r.languages.some(l => /pt/.test(String(l)))) return true
        if (Array.isArray(r.countries) && r.countries.some(c => /(brasil|brazil|br)/i.test(String(c)))) return true
        return false
      }

      // Prioritize pt-BR items but show all results as fallback when none or to allow broader matches.
      const brazilianFirst = results.filter(looksBrazilian)
      // put brazilian results first, but include all results
      const rest = results.filter(r => !looksBrazilian(r))
      ingredients.value[idx].suggestions = brazilianFirst.concat(rest)
    } catch (err) {
      ingredients.value[idx].suggestions = []
    }
  }, 350)
}

  function selectSuggestion(idx, opt) {
  const ing = ingredients.value[idx]
  ing.selected = opt
  // Display the human-readable name in the input for UX (hide internal IDs)
  ing.query = opt.name || opt.brand || 'Ingrediente selecionado'
  // fill base nutrient values for the weight (per 100g)
  const factor = (ing.weight_grams || 0) / 100
  ing.calories = (opt.nutrients?.calories || 0) * factor
  ing.protein = (opt.nutrients?.protein || 0) * factor
  ing.carbs = (opt.nutrients?.carbs || 0) * factor
  ing.fat = (opt.nutrients?.fat || 0) * factor
  ing.suggestions = []
}

function handleWeight(idx, value) {
  ingredients.value[idx].weight_grams = value
  updateIngredient(idx)
}

function updateIngredient(idx) {
  const ing = ingredients.value[idx]
  const nutrients = ing.selected?.nutrients
  if (!nutrients) return
  const f = (ing.weight_grams || 0) / 100
  ing.calories = (nutrients.calories || 0) * f
  ing.protein = (nutrients.protein || 0) * f
  ing.carbs = (nutrients.carbs || 0) * f
  ing.fat = (nutrients.fat || 0) * f
}

function validate() {
  if (!title.value.trim()) {
    error.value = 'Título é obrigatório'
    return false
  }
  if (ingredients.value.length < 1) {
    error.value = 'Adicione ao menos 1 ingrediente'
    return false
  }
  for (const ing of ingredients.value) {
    if (!ing.weight_grams || ing.weight_grams <= 0) {
      error.value = 'Peso deve ser maior que 0'
      return false
    }
    if (!ing.query || !ing.query.toString().trim()) {
      error.value = 'Ingrediente deve ter um nome visível'
      return false
    }
  }
  error.value = null
  return true
}

async function submit() {
  if (!validate()) return
  loading.value = true
  const payload = {
    title: title.value,
    date: date.value,
    time: time.value,
    // send id when available, otherwise send display name
    ingredients: ingredients.value.map((ing) => ({ food_name: ing.selected?.id || ing.query || ing.selected?.name, weight_grams: Number(ing.weight_grams) }))
  }
  try {
    await createMeal(payload)
    alert('Refeição criada com sucesso')
    router.push('/meals')
  } catch (err) {
    console.error(err)
    error.value = err?.response?.data?.message || 'Erro ao criar'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* Card layout */

.meal-form {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: clamp(20px, 4vw, 40px);
  border-radius: 24px;
  background: #1e1e1e;
  border: 1px solid #2c2c2c;
  box-shadow: 0 40px 80px rgba(0,0,0,0.5);
  display: flex;
  flex-direction: column;
  gap: 24px;
  color: #f0f0f0;
  box-sizing: border-box;
}

.meal-form h4 {
  margin-top: 6px;
  font-weight: 700;
  letter-spacing: 0.2px;
  color: var(--color-heading, #fff);
}

.page-head { display:flex; flex-direction:column; gap:6px; padding-bottom:8px; border-bottom: 1px solid rgba(255,255,255,0.04) }
.page-head .title { font-size:28px; font-weight:900 }
.page-head .subtitle { color: rgba(255,255,255,0.9); opacity:0.9 }

.row { display:flex; gap:12px; align-items:center; flex-wrap:wrap }
.row label { min-width: 80px; color:#f0f0f0; font-weight:600 }
.row input[type='text'], .row input[type='date'], .row input[type='time'], .row input[type='number'] {
  flex: 1; padding:12px 14px; border-radius:14px; border:1px solid #333; background: #2c2c2c; color: #f0f0f0; transition: box-shadow .12s ease, border-color .12s ease; outline: none;
}
.row input:focus { box-shadow: 0 0 12px rgba(206,233,4,0.3); border-color: rgb(206, 233, 4) }

.ingredients { display:grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap:16px }

.form-actions { display:flex; justify-content:space-between; align-items:center; gap:20px; flex-wrap:wrap }
.add-ingredient {
  display:inline-flex;
  align-items:center;
  gap:10px;
  padding:12px 18px;
  border-radius:999px;
  border:1px solid rgba(206,233,4,0.4);
  background: radial-gradient(circle at top, rgba(206,233,4,0.4), rgba(206,233,4,0.15));
  color:#f0f0f0;
  font-weight:700;
  cursor:pointer;
  box-shadow:0 15px 30px rgba(0,0,0,0.35);
  transition: transform .15s ease, box-shadow .15s ease;
}
.add-ingredient .icon {
  width:28px;
  height:28px;
  border-radius:50%;
  background:rgb(206, 233, 4);
  color:#111;
  display:flex;
  align-items:center;
  justify-content:center;
  font-size:18px;
  font-weight:800;
}
.add-ingredient:hover { transform: translateY(-1px); box-shadow:0 20px 35px rgba(0,0,0,0.45) }

.form-actions .totals {
  flex:1 1 320px;
  display:grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap:12px;
}
.form-actions .totals > div {
  background:#2c2c2c;
  border-radius:14px;
  padding:12px 16px;
  border:1px solid rgba(206,233,4,0.18);
  text-align:center;
}
.form-actions .totals .label { display:block; font-size:12px; letter-spacing:0.6px; text-transform:uppercase; opacity:0.7 }

.label { display:block; font-size:12px; text-transform:uppercase; letter-spacing:0.6px; opacity:0.7 }

.submit { display:flex; gap:8px; justify-content:flex-end }
.submit button[type='submit'] { background:rgb(206, 233, 4); padding:12px 18px; border-radius:12px; border:none; color:#1e1e1e; font-weight:700; cursor:pointer; transition: box-shadow .12s ease }
.submit button[type='submit']:hover { box-shadow:0 0 15px rgba(206,233,4,0.45) }
.submit button[type='submit']:disabled { opacity:0.6; cursor:not-allowed }
.submit button[type='button'] { background:transparent; border:1px solid rgba(255,255,255,0.1); padding:10px 14px; border-radius:12px; color:#f0f0f0 }

.error { color:#ff6b6b; font-weight:700 }

@media (max-width: 640px) {
  .row { flex-direction:column; align-items:stretch }
  .form-actions { flex-direction:column; align-items:stretch }
  .add-ingredient { width:100%; justify-content:center }
  .form-actions .totals { width:100% }
  .submit { justify-content:stretch; flex-direction:column }
}

@keyframes popIn { from { opacity: 0; transform: translateY(8px) scale(.996) } to { opacity:1; transform:translateY(0) scale(1) } }
</style>
