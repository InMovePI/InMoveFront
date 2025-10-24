<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

function limitarAltura(event) {
  const min = 0
  const max = 250
  let valor = Number(event.target.value)

  if (valor < min) valor = min
  if (valor > max) valor = max

  event.target.value = valor
}

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

function handleClickFora(event) {
  if (selectContainer.value && !selectContainer.value.contains(event.target)) {
    aberto.value = false
  }
  if (grupoContainer.value && !grupoContainer.value.contains(event.target)) {
    abertoGrupo.value = false
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
    <div class="imagem">
      <img src="/public/homem-de-vista-frontal-malhando-com-halteres.jpg" />
    </div>

    <div class="formulario">
      <div class="titulo">
        <h1>INMOVE</h1>
      </div>
      <div class="texto">
        <h1>Cadastre-se</h1>
        <p>Informações de cadastro</p>
      </div>

      <div class="coluna">
        <div class="linha">
          <input type="number" placeholder="Peso atual (kg)" class="input mini" />
          <input
            type="number"
            @input="limitarAltura"
            placeholder="Altura (cm)"
            class="input mini"
          />
          <input type="number" placeholder="Meta de peso (kg)" class="input mini" />
        </div>

        <select name="Objetivo" class="input">
          <option>Hipertrofia</option>
          <option>Emagrecimento</option>
          <option>Definição Muscular</option>
        </select>

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

        <div class="select-container" ref="grupoContainer">
          <div class="select-input2" @click="abertoGrupo = !abertoGrupo">
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

        <div class="login">
          <p>Já tem uma conta? <router-link to="/login"> Faça login! </router-link></p>
        </div>

        <router-link class="button" to="/">Continuar</router-link>
      </div>
    </div>
  </section>
</template>

<style scoped>
.login a{
  color: rgb(206, 233, 4);
  text-decoration: underline;
  margin-left: 3px;
  margin-bottom: 10px;
  font-size: 15px;
}

.login p{
  font-size: 15px;
}

.select-container {
  position: relative;
}

.select-input {
  cursor: pointer;
  width: 400px;
  padding: 10px;
  margin-bottom: 30px;
  padding-left: 20px;
  font-size: 16px;
  border-radius: 15px;
  border: 2px solid rgb(206, 233, 4);
  background-color: #202020;
  color: white;
  box-sizing: border-box;
  font-family: poppins, sans-serif;
}

.select-input2 {
  cursor: pointer;
  width: 400px;
  padding: 10px;
  padding-left: 20px;
  font-size: 16px;
  border-radius: 15px;
  border: 2px solid rgb(206, 233, 4);
  background-color: #202020;
  color: white;
  box-sizing: border-box;
  font-family: poppins, sans-serif;
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

.linha {
  display: flex;
  gap: 15px;
  justify-content: center;
  width: 100%;
  max-width: 400px;
}

.input.mini {
  width: 120px;
}

.texto h1,
p {
  font-family: 'Poppins', sans-serif;
  color: white;
  display: flex;
  justify-content: flex-end;
}

.texto p {
  margin-top: -15px;
  margin-bottom: 40px;
  font-size: 18px;
}

.button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  background-color: rgb(206, 233, 4);
  text-decoration: none;
  color: black;
  padding: 15px;
  border-radius: 30px;
  transition: background-color 1s;
}

.button:hover {
  background-color: rgb(172, 194, 5);
}

.titulo h1 {
  color: rgb(206, 233, 4);
  display: flex;
  justify-content: center;
  font-family: 'Jaro', sans-serif;
  font-size: 40px;
  letter-spacing: 0.5px;
}

.cadastro {
  display: flex;
  height: 100vh;
}

.coluna {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.input {
  display: block;
  width: 400px;
  padding: 10px;
  margin-bottom: 30px;
  padding-left: 20px;
  font-size: 16px;
  border-radius: 15px;
  border: 2px solid rgb(206, 233, 4);
  background-color: #202020;
  color: white;
  box-sizing: border-box;
  font-family: poppins, sans-serif;
}

select.input {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}

.formulario {
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 160px;
  box-sizing: border-box;
}

.imagem {
  width: 50%;
  height: 100%;
}

.imagem img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
</style>
