<template>
  <div class="ingredient-card">
    <div class="row">
      <label :for="`food_${idx}`">Alimento</label>
      <div class="input-wrapper">
        <input
          :id="`food_${idx}`"
          type="text"
          :value="ingredient.query"
          placeholder="Digite o alimento ou código"
          @input="onQuery"
        />
        <ul v-if="ingredient.suggestions?.length" class="suggestions" role="listbox">
          <li
            v-for="opt in ingredient.suggestions"
            :key="opt.id"
            @click="onSelect(opt)"
          >
            <div>
              <span class="primary">{{ opt.name || opt.brand || 'Item sem nome' }}</span>
              <span class="muted" v-if="opt.brand">{{ opt.brand }}</span>
            </div>
            <small>{{ opt.nutrients?.calories }} kcal · 100 g</small>
          </li>
        </ul>
      </div>
    </div>

    <div class="row compact">
      <label :for="`w_${idx}`">Peso (g)</label>
      <input
        :id="`w_${idx}`"
        type="number"
        min="1"
        :value="ingredient.weight_grams"
        @input="onWeight"
      />
      <button type="button" class="remove" @click="$emit('remove')">Remover</button>
    </div>

    <div class="macros">
      <div>
        <span class="label">Calorias</span>
        <strong>{{ formatUnit(ingredient.calories, 'kcal') }}</strong>
      </div>
      <div>
        <span class="label">Proteína</span>
        <strong>{{ formatUnit(ingredient.protein, 'g') }}</strong>
      </div>
      <div>
        <span class="label">Carboidrato</span>
        <strong>{{ formatUnit(ingredient.carbs, 'g') }}</strong>
      </div>
      <div>
        <span class="label">Gordura</span>
        <strong>{{ formatUnit(ingredient.fat, 'g') }}</strong>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  ingredient: { type: Object, required: true },
  idx: { type: Number, required: true },
})

const emit = defineEmits(['query-change', 'weight-change', 'select-suggestion', 'remove'])

function onQuery(event) {
  emit('query-change', event.target.value)
}

function onWeight(event) {
  emit('weight-change', Number(event.target.value))
}

function onSelect(option) {
  emit('select-suggestion', option)
}

function formatUnit(val, unit) {
  if (val == null || val === undefined) return '—'
  const n = Math.round(Number(val) * 10) / 10
  return `${n}${unit === 'kcal' ? ' kcal' : ' ' + unit}`
}
</script>

<style scoped>
:host { display:block }
.ingredient-card {
  background: #2c2c2c;
  border-radius: 16px;
  border: 1px solid rgba(255,255,255,0.04);
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  color: #f0f0f0;
  box-shadow: 0 20px 40px rgba(0,0,0,0.35);
  width: 100%;
  box-sizing: border-box;
}
.row { display:flex; flex-direction:column; gap:8px }
.row.compact { flex-direction:row; align-items:flex-end; gap:12px; flex-wrap:wrap }
label { font-weight:600 }
input {
  background:#1e1e1e;
  border:1px solid #3a3a3a;
  border-radius:12px;
  padding:10px 14px;
  color:#f0f0f0;
  font-size:15px;
  transition:border-color .15s ease, box-shadow .15s ease;
}
input:focus {
  border-color:rgb(206, 233, 4);
  box-shadow:0 0 12px rgba(206,233,4,0.3);
  outline:none;
}
.input-wrapper { position:relative }
.suggestions {
  position:absolute;
  left:0;
  right:0;
  top: calc(100% + 6px);
  list-style:none;
  margin:0;
  padding:6px;
  background:#1e1e1e;
  border:1px solid rgb(206, 233, 4);
  border-radius:12px;
  max-height:220px;
  overflow:auto;
  z-index:20;
  box-shadow:0 18px 30px rgba(0,0,0,0.5);
}
.suggestions li {
  padding:10px;
  border-radius:10px;
  display:flex;
  justify-content:space-between;
  gap:10px;
  cursor:pointer;
}
.suggestions li:hover {
  background:rgba(206,233,4,0.08);
}
.primary { font-weight:700 }
.muted { opacity:0.7; margin-left:6px }
.remove {
  margin-left:auto;
  background:transparent;
  border:1px solid rgba(255,255,255,0.2);
  color:#ff6b6b;
  border-radius:10px;
  padding:8px 12px;
  cursor:pointer;
}
.remove:hover { border-color:#ff6b6b }
.macros {
  display:grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap:12px;
}
.macros div {
  background:#1e1e1e;
  border-radius:12px;
  padding:12px;
  text-align:center;
  border:1px solid rgba(255,255,255,0.06);
}
.label { display:block; font-size:12px; text-transform:uppercase; letter-spacing:0.6px; opacity:0.7 }

@media (max-width: 800px) {
  .macros { grid-template-columns: repeat(2, 1fr) }
}
@media (max-width: 520px) {
  .row.compact { flex-direction:column; align-items:stretch }
}
</style>
