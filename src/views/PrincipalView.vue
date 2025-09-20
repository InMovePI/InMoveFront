<script setup>
const etapa = 5
const progresso = `${(etapa /100 ) * 100}%`
</script>

<template>
  <header>
    <div class="navegaçao">
      <h1>InMove</h1>
      <div class="pages">
        <router-link>Home </router-link>
        <router-link>Atividades</router-link>
        <router-link>Explorar</router-link>
        <router-link>Pessoal</router-link>
      </div>
      <router-link>
        <img src="/public/icons8-usuário-homem-com-círculo-90.png" width="45px" height="45px" />
      </router-link>
    </div>
  </header>
  <main>
    <div class="container">
      <h1>Treino Personalizado</h1>
      <img src="/public/icons8-haltere-60.png" width="40px" height="40px">
      <p>Progresso 5%</p>
      <div class="barra">
      <div class="progresso" :style="{ width: progresso }"></div>
    </div>
    </div>
  </main>
</template>

<style scoped>
.container {
  display: flex;          /* habilita flex */
  flex-direction: column; /* empilha os elementos verticalmente */
  justify-content: flex-start; /* alinha no topo */
  align-items: flex-start;     /* alinha à esquerda */
  background-color: rgba(51, 51, 51, 0.4);
  width: 250px;
  padding: 20px;
  margin: 40px 95px;
  border-radius: 13px;
}

.container h1,
.container p {
  margin: 0;
  color: white;
  font-family: poppins, sans-serif;
}

.container h1 {
  font-weight: 600;
  font-size: 18px;
}

.container img {
  position: relative; 
  left: 180px;
  width: 50px;
  height: 50px;
}

.barra {
  width: 80%;
  height: 5px;
  background-color: white;
  border-radius: 2px;
  margin-top: 2px;
}

.progresso {
  height: 100%;
  background-color: #e6ff2b;
  border-radius: 2px;
}

.pages a {
  text-decoration: none;
  position: relative;
  color: white;
  font-family: Poppins, sans-serif;
  margin: 0px 40px;
}

.pages a::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -2px;
  width: 0%;
  height: 1px;
  background-color: white;
  transition: width 0.3s ease;
}

.pages a:hover::after {
  width: 100%;
}

.navegaçao {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 6px;
  align-items: center;
  border-radius: 30px;
  margin: 15px 80px;
  background-color: rgba(51, 51, 51, 0.5);
}

.pages {
  display: flex;
  align-items: center;
}

.navegaçao h1 {
  font-weight: 500;
  font-family: Poppins, sans-serif;
  color: white;
  font-size: 25px;
}
</style>
