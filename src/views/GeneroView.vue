<script setup>
const etapa = 1 // etapa atual (de 1 a 8)
const progresso = `${(etapa / 8) * 100}%`
</script>

<template>
  <div class="container">
    <div class="titulo-container">
      <h1>Qual é o seu sexo?</h1>
    </div>
    <router-link to="/" class="botao">Masculino</router-link>
    <router-link to="/" class="botao">Feminino</router-link>
    <router-link to="/" class="botao">Prefiro não declarar</router-link>

    <div class="barra">
      <div class="progresso" :style="{ width: progresso }"></div>
    </div>
    <router-link to="/" class="continuar">Continuar</router-link>
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
  transform: translateY(-10%);
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
}

.botao {
  margin-top: 2rem;
  background-color: rgba(217, 217, 217, 0.5);
  color: white;
  border: none;
  border-radius: 0.5rem;
  text-decoration: none;
  font-weight: 600;
  font-family: 'Poppins', sans-serif;
  cursor: pointer;
  transition: background-color 0.3s ease;
  min-width: 10rem;
  max-width: 90%;
  padding: 0.75rem 5rem;
  text-align: center;
}

.botao:hover {
  background-color: rgba(112, 112, 112, 0.5);
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
