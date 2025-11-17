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
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  overflow-x: hidden;
}

/* ========== HEADER ========== */
.navegaçao {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background-color: white;
  padding: 1.5rem 2rem;
  flex-wrap: wrap;
  gap: 1rem;
  min-height: 90px;
}

.navegaçao h1 {
  margin: 0;
  font-size: 28px;
}

.pages {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 50px;
  flex-wrap: wrap;
}

.pages a {
  color: black;
  text-decoration: none;
  position: relative;
  white-space: nowrap;
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
  padding: 9px 18px;
  border-radius: 50px;
  color: black;
  text-decoration: none;
  transition: all 0.3s ease;
}

.cadastro:hover {
  background-color: rgb(180, 202, 12);
}

span {
  color: rgb(206, 233, 4);
}

/* ========== MAIN ========== */
main {
  display: flex;
  flex-direction: column;
  gap: 60px;
  padding-bottom: 60px;
}

/* ========== INTRO ========== */
.intro {
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 90vh;
  width: 100%;
  padding: 60px 80px;
  box-sizing: border-box;
  gap: 40px;
  flex-wrap: wrap;
}

.intro img {
  width: 100%;
  max-width: 700px;
  height: auto;
  aspect-ratio: 16/10;
  border-radius: 30px;
  object-fit: cover;
  flex: 1;
  min-width: 300px;
}

.texto {
  flex: 1;
  min-width: 300px;
  max-width: 500px;
}

.texto h1 {
  color: white;
  font-size: 50px;
  font-weight: bolder;
  margin-bottom: 20px;
  line-height: 1.2;
}

.texto p {
  color: white;
  font-size: 19px;
  line-height: 1.6;
}

/* ========== CARDS ========== */
.cards {
  display: flex;
  justify-content: space-around;
  align-items: stretch;
  font-family: Poppins, sans-serif;
  color: white;
  gap: 40px;
  padding: 0 40px;
  flex-wrap: wrap;
}

.card1, .card2, .card3 {
  border: white solid 2px;
  border-radius: 20px;
  padding: 30px 25px;
  flex: 1;
  min-width: 250px;
  max-width: 350px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  transition: all 0.3s ease;
}

.card1:hover, .card2:hover, .card3:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(206, 233, 4, 0.2);
  border-color: rgb(206, 233, 4);
}

.cards h1 {
  font-size: 24px;
  margin-bottom: 5px;
}

.cards p {
  font-size: 32px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  color: rgb(206, 233, 4);
  margin: 10px 0;
}

.cards a {
  color: black;
  text-decoration: none;
  background-color: rgb(206, 233, 4);
  padding: 12px 20px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;
  font-weight: 500;
  text-align: center;
}

.cards a:hover {
  background-color: rgb(180, 202, 12);
  transform: scale(1.05);
}

/* ========== TREINOS ========== */
.treinos {
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 0 40px;
  gap: 30px;
}

.treinos h1 {
  font-family: Poppins, sans-serif;
  color: white;
  font-size: 32px;
  text-align: center;
}

.images {
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 60px;
  flex-wrap: wrap;
  width: 100%;
}

.cardImg {
  position: relative;
  overflow: hidden;
  border-radius: 20px;
  transition: transform 0.3s ease;
  flex: 1;
  min-width: 300px;
  max-width: 500px;
}

.cardImg:hover {
  transform: scale(1.02);
}

.cardImg img {
  width: 100%;
  height: auto;
  aspect-ratio: 16/10;
  object-fit: cover;
  filter: blur(1.5px);
  transition: filter 0.3s ease;
  border-radius: 20px;
}

.cardImg:hover img {
  filter: blur(0px);
}

/* ========== RESPONSIVIDADE ========== */

/* Tablets grandes (até 1200px) */
@media (max-width: 1200px) {
  .intro {
    padding: 50px 60px;
  }

  .texto h1 {
    font-size: 42px;
  }

  .intro img {
    max-width: 600px;
  }

  .images {
    gap: 40px;
  }
}

/* Tablets (até 1024px) */
@media (max-width: 1024px) {
  .navegaçao h1 {
    font-size: 24px;
  }

  .pages {
    gap: 30px;
  }

  .intro {
    padding: 40px 50px;
    min-height: auto;
  }

  .texto h1 {
    font-size: 38px;
  }

  .texto p {
    font-size: 17px;
  }

  .cards {
    gap: 30px;
  }

  .treinos h1 {
    font-size: 28px;
  }
}

/* Tablets menores (até 900px) */
@media (max-width: 900px) {
  .intro {
    flex-direction: column;
    text-align: center;
    padding: 40px 40px;
  }

  .texto {
    max-width: 100%;
  }

  .texto h1,
  .texto p {
    text-align: center;
  }

  .intro img {
    max-width: 100%;
  }

  .cards {
    flex-direction: column;
    align-items: center;
  }

  .card1, .card2, .card3 {
    max-width: 500px;
    width: 100%;
  }
}

/* Mobile (até 768px) */
@media (max-width: 768px) {
  .navegaçao h1 {
    font-size: 20px;
  }

  .pages {
    gap: 20px;
  }

  .pages a {
    font-size: 14px;
  }

  .cadastro {
    padding: 8px 16px;
    font-size: 14px;
  }

  .intro {
    padding: 30px 25px;
    gap: 30px;
  }

  .texto h1 {
    font-size: 32px;
  }

  .texto p {
    font-size: 16px;
  }

  .cards {
    padding: 0 25px;
    gap: 25px;
  }

  .cards h1 {
    font-size: 20px;
  }

  .cards p {
    font-size: 28px;
  }

  .treinos {
    padding: 0 25px;
  }

  .treinos h1 {
    font-size: 24px;
  }

  .images {
    gap: 30px;
  }

  .cardImg {
    min-width: 250px;
  }
}

/* Mobile pequeno (até 480px) */
@media (max-width: 480px) {
  .navegaçao h1 {
    font-size: 18px;
  }

  .pages {
    gap: 10px;
    justify-content: center;
  }

  .pages a {
    font-size: 12px;
  }

  .cadastro {
    padding: 6px 12px;
    font-size: 12px;
  }

  .intro {
    padding: 25px 20px;
  }

  .texto h1 {
    font-size: 28px;
  }

  .texto p {
    font-size: 15px;
  }

  .cards {
    padding: 0 20px;
  }

  .card1, .card2, .card3 {
    padding: 25px 20px;
    min-width: 100%;
  }

  .cards h1 {
    font-size: 18px;
  }

  .cards p {
    font-size: 24px;
  }

  .cards a {
    padding: 10px 16px;
    font-size: 14px;
  }

  .treinos {
    padding: 0 20px;
  }

  .treinos h1 {
    font-size: 20px;
  }

  .images {
    gap: 20px;
  }

  .cardImg {
    min-width: 100%;
  }
}
</style>