<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const data = ref('')
const router = useRouter()

function formatarData() {

  let numeros = data.value.replace(/\D/g, '')
  
  if(numeros.length > 2 && numeros.length <= 4){
    numeros = numeros.slice(0,2) + '/' + numeros.slice(2)
  } else if(numeros.length > 4){
    numeros = numeros.slice(0,2) + '/' + numeros.slice(2,4) + '/' + numeros.slice(4,8)
  }

  data.value = numeros
}

function continuar() {
  if (!data.value) {
    alert('Por favor, insira a sua data de nascimento.')
    return
  }
  router.push('/altura')
}

const etapa = 2 
const progresso = `${(etapa / 7) * 100}%`
</script>

<template>
  <div class="container">
    <div class="titulo-container">
      <h1>Qual a sua data de nascimento?</h1>
    </div>
    <input
      type="data"
      placeholder="DD/MM/AAAA"
      class="input-nascimento"
      v-model="data"
      @input="formatarData"
      maxlength="10"
    />
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

.input-nascimento {
    width: 90%;
  max-width: 20rem;
  padding: 0.5rem 0;
  background-color: transparent;
  border-left: none;
  border-right: none;
  border-top: 2px solid white;    
  border-bottom: 2px solid white; 
  border-radius: 0.25rem;
  color: white;
  font-size: 16px;
  font-family: 'Poppins', sans-serif;
  text-align: center;
  outline: none;
}



.input-nascimento::placeholder {
  color: rgba(255, 255, 255, 0.6); 
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
  margin-top: 2rem;
  background-color: #e6ff2b;
  color: #0b4650;
  border: none;
  border-radius: 10rem;
  text-decoration: none;
  font-weight: 600;
  font-family: 'Poppins', sans-serif;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: auto;
  min-width: 10rem;
  padding: 0.75rem 2rem;
  text-align: center;
}

.continuar:hover {
  background-color: #afc01a;
}
</style>
