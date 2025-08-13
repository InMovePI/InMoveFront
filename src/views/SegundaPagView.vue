<script setup></script>

<template>
  <div class="container">
    <h1 class="title">InMove</h1>  
    <div class="textos">
      <h2 class="title2">Vamos começar</h2>
      <p class="txt">
        Primeiro, precisamos saber algumas informações sobre você. Esses dados serão utilizados para criar uma experiência personalizada ao seu objetivo
      </p>
    </div>
  </div>
</template>

<style>
body {
  background-color: #0b4650;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; 
  margin: 0;
}

.container {
  text-align: center;
}

.textos {
  display: flex;
  flex-direction: column;
  width: 366px;
  height: 205px;
  justify-content: center;

  margin: auto;
}

.title {
  color: white;
  margin-top: 0;
}

.title2 {
  color: yellow;
}

.txt {
  color: white;
}
</style>
