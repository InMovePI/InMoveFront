<script setup></script>

<template>
  <header>
    <div class="navegaçao">
      <h1>INMOVE</h1>
      <div class="pages">
        <router-link to="/">Home</router-link>
        <router-link to="/dashboard"><span>Dashboard</span></router-link>
        <router-link to="/">Explorar</router-link>
        <router-link to="/cadastro" class="cadastro">Cadastro de Usuário</router-link>
      </div>
    </div>
  </header>

  <main>
    <div class="intro">
      <div class="texto">
        <h1>Metas diárias:</h1>
        <p>
          Mantenha o foco nos seus objetivos! Cada progresso conta — complete suas metas e veja sua
          evolução acontecer em tempo real.
        </p>
      </div>

      <img src="/public/young-athletic-woman-exercising-situps-with-weight-plate-gym.jpg" />
    </div>

    <div class="cards">
      <div class="card1">
        <h1>Treino</h1>
        <p>45min</p>
        <router-link to="/">Ver plano de treinos</router-link>
      </div>

      <div class="card2">
        <h1>Meta de água</h1>
        <p>2,5L</p>
        <router-link to="/">Ver plano alimentar</router-link>
      </div>

      <div class="card3">
        <h1>Meta calórica</h1>
        <p>1700 cal</p>
        <router-link to="/">Ver plano alimentar</router-link>
      </div>
    </div>

    <div class="treinos">
      <div>
      <h1>Últimos treinos realizados:</h1>
    </div>
      <div class="images">
        <div class="cardImg">
          <img src="/public/desportista-em-um-treinamento-de-sportswear-em-uma-academia.jpg" alt="">
        </div>
        <div class="cardImg">
          <img src="/public/vista-de-angulo-baixo-homem-de-construcao-muscular-irreconhecivel-se-preparando-para-levantar-uma-barra-em-um-clube-de-saude.jpg" alt="">
        </div>

      </div>
    </div>
  </main>
</template>

<style scoped>
.images img{
  width: 480px;
  height: 300px;
}

.images{
  display: flex;
  justify-content: space-around;
  margin-top: 30px;
  gap: 20rem;
}
.cardImg img{
  filter: blur(1.5px);
}

.treinos{
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 50px;
}

.treinos h1{
  font-family: Poppins, sans-serif;
  color: white;

}

.cards p{
  font-size: 20px;
  display: flex;
  justify-content: center;
}

.cards a{
  color: black;
  text-decoration: none;
  background-color:rgb(206, 233, 4);
  padding: 10px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  transition: 0.3s;
}

.cards a:hover{
  background-color: rgb(180, 202, 12);
}

.cards{
  display: flex;
  justify-content: space-around;
  font-family: Poppins, sans-serif;
  color: white;
}


.card1, .card2, .card3 {
    border: white solid 1px;
    border-radius: 20px;
    padding: 20px;
    width: 250px;
    display: flex;
    flex-direction: column;
    gap: 15px;
}

body {
  overflow-x: hidden;
}

main {
  display: flex;
  flex-direction: column;
}

span {
  color: rgb(206, 233, 4);
}

.navegaçao {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background-color: white;
  height: 90.8px;
}

.navegaçao h1 {
  margin: 0;
}

.pages {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 50px;
}

.pages a {
  color: black;
  text-decoration: none;
  position: relative;
}

.pages a:not(.cadastro)::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -2px;
  width: 0%;
  height: 2px;
  background-color: black;
  transition: width 0.3s ease;
}

.pages a:not(.cadastro):hover::after {
  width: 100%;
}

.cadastro {
  background-color: rgb(206, 233, 4);
  padding: 9px;
  border-radius: 50px;
  color: black;
  text-decoration: none;
}

main {
  display: flex;
  flex-direction: column;
}

.intro {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
  width: 100%;
  padding: 0 80px;
  box-sizing: border-box;
  margin-top: -40px;
}

img {
  width: 700px;
  height: 450px;
  border-radius: 30px;
  max-width: 100%;
}

span {
  color: rgb(206, 233, 4);
}

.texto h2 {
  color: rgb(206, 233, 4);
  font-size: 18px;
  margin: 0px 0px 10px 50px;
}

.texto h1 {
  color: white;
  font-size: 50px;
  width: 400px;
  margin: 0px 50px 15px 50px;
  font-weight: bolder;
}

.texto p {
  color: white;
  width: 400px;
  margin: 0px 50px;
  font-size: 19px;
}
</style>