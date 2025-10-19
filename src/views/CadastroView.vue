<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

function limitarIdade(event) {
  const min = 0
  const max = 120
  let valor = Number(event.target.value)
  if (valor < min) valor = min
  if (valor > max) valor = max
  event.target.value = valor
}

function limitarAltura(event) {
  const min = 0
  const max = 250
  let valor = Number(event.target.value)
  if (valor < min) valor = min
  if (valor > max) valor = max
  event.target.value = valor
}

/* --- Dias da semana --- */
const aberto = ref(false)
const diasSelecionados = ref([])
const selectContainer = ref(null)

const dias = [
  'Segunda-Feira',
  'Terça-Feira',
  'Quarta-Feira',
  'Quinta-Feira',
  'Sexta-Feira',
  'Sábado',
  'Domingo'
]

function toggleDia(dia) {
  if (diasSelecionados.value.includes(dia)) {
    diasSelecionados.value = diasSelecionados.value.filter((d) => d !== dia)
  } else {
    diasSelecionados.value.push(dia)
  }
}

const abertoRestrições = ref(false)
const restriçõesSelecionadas = ref([])
const restriçõesContainer = ref(null)
const restrições = ['Glúten', 'Lactose', 'Vegetariano', 'vegano']

function toggleRestrições(opcao) {
  if (restriçõesSelecionadas.value.includes(opcao)) {
    restriçõesSelecionadas.value = restriçõesSelecionadas.value.filter((g) => g !== opcao)
  } else {
    restriçõesSelecionadas.value.push(opcao)
  }
}
/* --- Grupo muscular --- */
const abertoGrupo = ref(false)
const grupoSelecionados = ref([])
const grupoContainer = ref(null)
const grupos = ['Inferiores', 'Superiores']

function toggleGrupo(opcao) {
  if (grupoSelecionados.value.includes(opcao)) {
    grupoSelecionados.value = grupoSelecionados.value.filter((g) => g !== opcao)
  } else {
    grupoSelecionados.value.push(opcao)
  }
}

/* --- Fecha ambos ao clicar fora --- */
function handleClickFora(event) {
  if (selectContainer.value && !selectContainer.value.contains(event.target)) {
    aberto.value = false
  }
  if (grupoContainer.value && !grupoContainer.value.contains(event.target)) {
    abertoGrupo.value = false
  }
  if (restriçõesContainer.value && !restriçõesContainer.value.contains(event.target)) {
    abertoRestrições.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickFora)
})
onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickFora)
})
</script>

<template>
  <section class="cadastro">
    <div class="titulo">
      <h1>Cadastre-se!</h1>
    </div>

    <div class="colunas">
      <div class="primeiraColuna">
        <input type="text" placeholder="Nome" class="input" />
        <input type="date" placeholder="Data de Nascimento" class="input" />
        <input type="email" placeholder="Email" class="input" />
        <input type="password" placeholder="Senha" class="input" />
        <input type="password" placeholder="Confirmar Senha" class="input" />
        <select name="Gênero" class="input objetivo">
          <option disabled selected hidden>Gênero</option>
          <option>Feminino</option>
          <option>Masculino</option>
          <option>Prefiro não informar</option>
        </select>
        <input type="number" @input="limitarIdade" placeholder="Idade" class="input" />
      </div>

      <div class="segundaColuna">
        <input type="number" @input="limitarAltura" placeholder="Altura (cm)" class="input" />
        <input type="number" placeholder="Peso (kg)" class="input" />
        <input type="number" placeholder="Meta de peso" class="input" />

        <!-- Select com placeholder cinza -->
        <select name="Objetivo" class="input objetivo">
          <option disabled selected hidden>Objetivo</option>
          <option>Hipertrofia</option>
          <option>Emagrecimento</option>
          <option>Definição Muscular</option>
        </select>

        <!-- Select customizado de dias -->
        <div class="select-container" ref="selectContainer">
          <div class="select-input" @click="aberto = !aberto">
            <span class="texto" :class="{ placeholder: diasSelecionados.length === 0 }">
              {{
                diasSelecionados.length > 0
                  ? diasSelecionados.join(', ').length > 30
                    ? diasSelecionados.join(', ').slice(0, 30) + '...'
                    : diasSelecionados.join(', ')
                  : 'Dias da semana que deseja treinar'
              }}
            </span>
            <span class="seta">▼</span>
          </div>

          <ul v-if="aberto" class="select-options">
            <li
              v-for="dia in dias"
              :key="dia"
              @click.stop="toggleDia(dia)"
              :class="{ selecionado: diasSelecionados.includes(dia) }"
            >
              {{ dia }}
            </li>
          </ul>
        </div>

        <!-- Novo: grupo muscular de foco -->
        <div class="select-container" ref="grupoContainer">
          <div class="select-input" @click="abertoGrupo = !abertoGrupo">
            <span class="texto" :class="{ placeholder: grupoSelecionados.length === 0 }">
              {{
                grupoSelecionados.length > 0
                  ? grupoSelecionados.join(', ').length > 30
                    ? grupoSelecionados.join(', ').slice(0, 30) + '...'
                    : grupoSelecionados.join(', ')
                  : 'Grupo muscular de foco'
              }}
            </span>
            <span class="seta">▼</span>
          </div>

          <ul v-if="abertoGrupo" class="select-options">
            <li
              v-for="opcao in grupos"
              :key="opcao"
              @click.stop="toggleGrupo(opcao)"
              :class="{ selecionado: grupoSelecionados.includes(opcao) }"
            >
              {{ opcao }}
            </li>
          </ul>
        </div>
        <div class="select-container" ref="restriçõesContainer">
          <div class="select-input" @click="abertoRestrições = !abertoRestrições">
            <span class="texto" :class="{ placeholder: restriçõesSelecionadas.length === 0 }">
              {{
                restriçõesSelecionadas.length > 0
                  ? restriçõesSelecionadas.join(', ').length > 30
                    ? restriçõesSelecionadas.join(', ').slice(0, 30) + '...'
                    : restriçõesSelecionadas.join(', ')
                  : 'Restrições Alimentares'
              }}
            </span>
            <span class="seta">▼</span>
          </div>

          <ul v-if="abertoRestrições" class="select-options">
            <li
              v-for="opcao in restrições"
              :key="opcao"
              @click.stop="toggleRestrições(opcao)"
              :class="{ selecionado: restriçõesSelecionadas.includes(opcao) }"
            >
              {{ opcao }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.colunas {
  display: flex;
  gap: 204px;
  margin-top: 40px;
}

.primeiraColuna,
.segundaColuna {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 100px;
}

.cadastro {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.titulo h1 {
  color: #e6ff2b;
  font-family: poppins, sans-serif;
  font-weight: 600;
  margin-top: 100px;
  font-size: 30px;
}

.input {
  padding: 0.5rem;
  border: none;
  border-bottom: 2px solid #ffffff;
  font-size: 1rem;
  color: white;
  background: transparent;
  margin: 4px;
}

.input:focus {
  outline: none;
}

/* Placeholder cinza */
.input::placeholder {
  color: #999;
}

/* Corrige a cor dos selects padrão */
.objetivo {
  color: #999;
}
.objetivo option {
  color: white;
}
.objetivo:focus,
.objetivo:not(:placeholder-shown) {
  color: white;
}

/* --- Estilo dos selects customizados --- */
.select-container {
  position: relative;
}

.select-input {
  padding: 0.5rem;
  border: none;
  border-bottom: 2px solid #ffffff;
  font-size: 1rem;
  color: white;
  background: transparent;
  margin: 4px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
}

.texto {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 90%;
  color: white;
}

.texto.placeholder {
  color: #999;
}

.select-input:hover {
  border-color: #e6ff2b;
}

.seta {
  font-size: 12px;
}

.select-options {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  margin-top: 3px;
  border: 1px solid #fff;
  border-radius: 5px;
  background-color: #1a1a1a;
  list-style: none;
  padding: 5px 0;
  max-height: 180px;
  overflow-y: auto;
  z-index: 10;
}

.select-options li {
  padding: 6px 10px;
  cursor: pointer;
  color: white;
}

.select-options li:hover {
  background-color: #333;
}

.select-options li.selecionado {
  background-color: #e6ff2b;
  color: black;
}
</style>
