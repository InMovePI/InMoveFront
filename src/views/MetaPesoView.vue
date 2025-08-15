<script setup>
const etapa = 5 // etapa atual (de 1 a 7)
const progresso = `${(etapa / 7) * 100}%`

import { ref } from 'vue'
import { useRouter } from 'vue-router'

const metapeso = ref('')
const router = useRouter()

function continuar() {
  if (!metapeso.value) {
    alert('Por favor, insira a sua meta de peso.')
    return
  }
  router.push('/objetivo')
}
</script>

<template>
  <div class="container">
    <div class="titulo-container">
      <h1>Qual é a sua meta de peso?</h1>
    </div>
    <input
      type="text"
      placeholder="Ex: 60kgs"
      class="input-peso"
      maxlength="3"
      v-model="metapeso"
      @input="(event) => (event.target.value = event.target.value.replace(/\D/g, ''))"
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

.input-peso {
  width: 90%;
  max-width: 20rem;
  padding: 0.5rem 0;
  background-color: transparent;
  border-left: none;
  border-right: none;
  border-top: 2px solid white; /* espessura da borda */
  border-bottom: 2px solid white; /* espessura da borda */
  border-radius: 0.25rem;
  color: white;
  font-size: 16px;
  font-family: 'Poppins', sans-serif;
  text-align: center;
  outline: none;
}

.input-altura::placeholder {
  color: rgba(255, 255, 255, 0.6); /* placeholder mais claro */
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
