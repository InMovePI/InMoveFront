<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'

const etapa = 6 
const progresso = `${(etapa / 7) * 100}%`

const router = useRouter()
const objetivo = ref(null)

function selecionar(valor) {
  objetivo.value = valor
}


function continuar() {
  if (!objetivo.value) {
    alert('Por favor, selecione um objetivo antes de continuar.')
    return
  }
  router.push('/foco')
}
</script>

<template>
    <div class="container">
    <div class="titulo-container">
      <h1>Qual é o seu objetivo?</h1>
    </div>
    <button :class="{ selecionado: objetivo === 'Hipertrofia' }" @click="selecionar('Hipertrofia')"  class="botao">Hipertrofia</button>
    <button :class="{ selecionado: objetivo === 'Emagrecimento' }" @click="selecionar('Emagrecimento')"  class="botao">Emagrecimento</button>
    <button :class="{ selecionado: objetivo === 'Definição Muscular' }" @click="selecionar('Definição Muscular')"  class="botao">Definição Muscular</button>
    <div class="barra">
      <div class="progresso" :style="{ width: progresso }"></div>
    </div>
    <button class="continuar" @click="continuar">Continuar</button>
  </div>
</template>

<style scoped>
body {
  background-color: #0b4650;
  margin: 0;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.titulo-container {
  width: 90%;
  max-width: 20rem;
  text-align: left;
  margin-bottom: 0.5rem;
}

.container h1 {
  color: white;
  font-family: Poppins, sans-serif;
  font-weight: 500;
  font-size: 25px;
  margin: 0;
  margin-bottom: 1rem;
}

.botao {
  all: unset;
  display: block;
  margin-top: 2rem;
  background-color: rgba(217, 217, 217, 0.5);
  color: white;
  border-radius: 0.5rem;
  font-weight: 600;
  font-family: 'Poppins', sans-serif;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.1s ease;
  min-width: 10rem;
  max-width: 90%;
  padding: 0.75rem 5rem;
  text-align: center;
}

.botao:hover {
  background-color: rgba(112, 112, 112, 0.5);
}

.selecionado {
  background-color: #e6ff2b;
  color: #0b4650;
  transform: scale(1.03);
}

.barra {
  width: 20%;
  height: 4px;
  background-color: white;
  border-radius: 2px;
  overflow: hidden;
  margin-top: 3rem;
}

.progresso {
  height: 100%;
  background-color: #e6ff2b;
  border-radius: 2px 0 0 2px;
}

.continuar {
  all: unset; 
  display: inline-block;
  margin-top: 2rem;
  background-color: #e6ff2b;
  color: #0b4650;
  border-radius: 10rem;
  text-decoration: none;
  font-weight: 600;
  font-family: 'Poppins', sans-serif;
  cursor: pointer;
  transition: background-color 0.3s ease;
  min-width: 10rem;
  padding: 0.75rem 2rem;
  text-align: center;
}

.continuar:hover {
  background-color: #afc01a;
}

</style>