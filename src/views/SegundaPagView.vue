<script setup></script>

<template>
  <div class="container">
    <h1 class="title">InMove</h1>  
    <div class="textos">
      <h2 class="title2">Vamos começar</h2>
      <p class="txt">
        Primeiro, precisamos saber algumas informações sobre você. Esses dados serão utilizados para criar uma experiência personalizada ao seu objetivo
      </p>
      <router-link to="/frame1" class="continuar">Começar</router-link>
    </div>
  </div>
</template>

<style>
body {
  background-color: #0b4650;
  margin: 0;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.textos {
  display: flex;
  flex-direction: column;
  width: 366px;
  height: calc(100vh - 100px);
  justify-content: center;
  text-align: center;
}

.title {
  color: white;
  margin-top: 30px;
}

.title2 {
  color: #e6ff2b;
  margin-top: 0; 
}
.txt {
  color: white;
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
  align-self: center;
}

.continuar:hover {
  background-color: #afc01a;
}
</style>
