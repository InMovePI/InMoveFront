<script>
import { RouterLink } from 'vue-router'
</script>

<template>
  <header>
    <div class="navegaçao">
      <h1>INMOVE</h1>
      <div class="pages">
        <router-link><span>Home</span></router-link>
        <router-link>Painel de treinamento</router-link>
        <router-link>Explorar</router-link>
        <router-link to="/cadastro" class="cadastro">Cadastro de Usuário</router-link>
      </div>
    </div>
  </header>

  <main>
    <div class="intro">
      <div class="texto">
        <h2>Olá, usuário!</h2>
        <h1>MAKE YOUR BODY SHAPE</h1>
        <p>
          Descubra o prazer de se <span>movimentar</span>, superar desafios e construir uma rotina
          mais <span>equilibrada</span>. Comece hoje a sua jornada rumo à melhor versão de si mesmo.
        </p>
      </div>

      <img src="/public/mulheres-jovens-participando-da-aula-de-spinning(1).jpg" alt="" />
    </div>

    <div class="dois">
      <h1>POR QUÊ ESCOLHER A <span>INMOVE</span>?</h1>
      <div class="topicos">
        <div class="container">
          <img src="/public/icons8-alvo-32.png" />
          <h1>PROGRESSO</h1>
          <p>
            Acompanhe sua evolução com treinos planejados para desafiar seus limites e gerar
            resultados reais, passo a passo.
          </p>
        </div>
        <div class="container">
          <img src="/public/icons8-tríceps-32.png" />
          <H1>TREINOS PERSONALIZADOS</H1>
          <p>
            Cada corpo é único. Por isso, nossos programas são criados com base nos seus objetivos -
            seja ganhar massa, definir ou melhorar o condicionamento físico.
          </p>
        </div>
      </div>
      <div class="topicos">
        <div class="container">
          <img src="/public/icons8-nutrição-32.png" />
          <h1>ORIENTAÇÃO NUTRICIONAL</h1>
          <p>
            Potencialize seus resultados com orientações nutricionais que complementam o treino e
            promovem mais energia e bem-estar
          </p>
        </div>
        <div class="container">
          <img src="/public/icons8-protect-32.png" />
          <h1>AUTODEFESA E CONFIANÇA</h1>
          <p>
            Desenvolva força física e mental com atividades que unem preparo corporal e técnicas de
            defesa pessoal.
          </p>
        </div>
      </div>
    </div>

    <div class="tres">
  <p>Descubra o treino ideal para você</p>
  <h1>NOSSOS SERVIÇOS:</h1>

  <!-- PRIMEIRA LINHA -->
  <div class="serviços-container">
    <div class="serviços">
      <img src="/public/dias-de-fitness-linda-mulher-loira-na-academia-no-fim-de-semana.jpg" />
      <h2>Força e Cardio</h2>
      <p>Melhore o condicionamento físico</p>
    </div>

    <div class="serviços">
      <img
        src="/public/jovem-desportista-feliz-se-preparando-para-um-treino-e-amarrando-cadarco-no-centro-de-fitness.jpg"
      />
      <h2>Treinos femininos</h2>
      <p>Treinos pensados para o corpo feminino, com foco em bem-estar, definição e saúde.</p>
    </div>
  </div>

  <!-- SEGUNDA LINHA -->
  <div class="serviços-container" style="margin-top: 80px">
    <div class="serviços">
      <img src="/public/bodybuilder-training-arm-with-resistance-band.jpg" />
      <h2>Yoga e Flexibilidade</h2>
      <p>Práticas que unem corpo e mente, aumentando o equilíbrio, a flexibilidade e a paz interior.</p>
    </div>

    <div class="serviços">
      <img src="/public/woman-helping-man-gym.jpg" />
      <h2>Treinos em Grupo</h2>
      <p>Atividades dinâmicas e motivadoras com grupos para incentivar o desempenho e a constância.</p>
    </div>
  </div>
</div>

  </main>
</template>

<style scoped>
body {
  overflow-x: hidden;
}

/* SEÇÃO INTRO */
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
}

img {
  width: 800px;
  height: 500px;
  border-radius: 30px;
  max-width: 100%;
}

span {
  color: rgb(206, 233, 4);
}

.texto h2 {
  color: rgb(206, 233, 4);
  font-size: 18px;
  margin: 0px 0px 0px 50px;
}

.texto h1 {
  color: white;
  font-size: 50px;
  width: 400px;
  margin: 0px 50px;
  font-weight: bolder;
}

.texto p {
  color: white;
  width: 400px;
  margin: 0px 50px;
}

/* HEADER */
.navegaçao {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background-color: white;
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

.pages a::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -2px;
  width: 0%;
  height: 2px;
  background-color: black;
  transition: width 0.3s ease;
}

.pages a:hover::after {
  width: 100%;
}

.cadastro {
  background-color: rgb(206, 233, 4);
  padding: 9px;
  border-radius: 50px;
  color: black;
  text-decoration: none;
}

/* SEÇÃO DOIS */
.dois {
  background-color: rgba(51, 51, 51, 1);
  width: 100%;
  padding: 0 80px 40px 80px;
  box-sizing: border-box;
}

.dois h1 {
  color: white;
  margin: 20px 0px 60px 50px;
}

.topicos {
  display: flex;
  justify-content: space-around;
  margin: 20px 0;
  gap: 20px;
  align-items: flex-start;
  flex-wrap: wrap;
}

.topicos + .topicos {
  margin-top: 60px;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  width: 300px;
  box-sizing: border-box;
}

.container img {
  width: 60px;
  height: 60px;
  background-color: white;
  margin-bottom: 10px;
  border-radius: 5px;
  padding: 3px;
}

.container h1 {
  color: white;
  font-size: 20px;
  margin: 0 0 10px 0;
}

.container p {
  color: white;
  margin: 0;
  width: 100%;
  text-align: left;
  line-height: 1.4;
}

/* SEÇÃO TRES */
.tres {
  background-color: #1f1f1f;
  padding: 60px 0;
}

.tres p {
  color: rgb(206, 233, 4);
  font-size: 20px;
  margin-left: 128px;
  margin-bottom: 4px;
  margin-top: -10px;
}

.tres h1 {
  color: white;
  font-size: 28px;
  margin-left: 128px;
  margin-bottom: 25px;
  margin-top: 0;
}

/* CONTAINER DE SERVIÇOS */
.serviços-container {
  display: flex;
  justify-content: center;
  align-items: stretch;
  gap: 180px;
  flex-wrap: wrap;
}

.serviços {
  background-color: #2d2d2d;
  padding: 20px;
  border-radius: 15px;
  text-align: center;
  width: 300px;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
}

.serviços img {
  width: 100%;
  height: 200px;
  border-radius: 10px;
  object-fit: cover;
  margin-bottom: 15px;
}

.serviços h2 {
  color: rgb(206, 233, 4);
  font-size: 20px;
  margin-bottom: 8px;
}

.serviços p {
  color: #dcdcdc;
  font-size: 15px;
  margin: 0 auto;
  width: 90%;
  text-align: center;
  line-height: 1.4;
}
</style>
