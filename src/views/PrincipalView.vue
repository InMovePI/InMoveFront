<script>
import { RouterLink } from 'vue-router'
</script>

<template>
<header>
  <div class="navegaçao">
    <h1>INMOVE</h1>
    <div class="pages">
      <router-link to="/"><span>Home</span></router-link>
      <router-link to="/dashboard">Dashboard</router-link>
      <router-link to="/">Explorar</router-link>
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
  <div class="serviços-container segunda-linha">
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
  padding: 1rem;
  flex-wrap: wrap;
  gap: 1rem;
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

.serviços-container.segunda-linha {
  margin-top: 80px;
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

/* ========== RESPONSIVIDADE ========== */

/* Tablets (768px - 1024px) */
@media (max-width: 1330px) {
  /* Header */
  .navegaçao {
    justify-content: center;
    gap: 1.5rem;
  }
  
  .pages {
    gap: 30px;
    justify-content: center;
  }

  /* Intro */
  .intro {
    padding: 0 40px;
    flex-direction: column;
    justify-content: center;
    gap: 40px;
    height: auto;
    min-height: 100vh;
    padding-top: 40px;
    padding-bottom: 40px;
  }

  .intro img {
    width: 100%;
    max-width: 600px;
    height: auto;
  }

  .texto h1 {
    font-size: 40px;
    width: 100%;
    text-align: center;
    margin: 0;
  }

  .texto h2 {
    text-align: center;
    margin: 0 0 10px 0;
  }

  .texto p {
    width: 100%;
    text-align: center;
    margin: 20px 0 0 0;
    max-width: 600px;
  }

  /* Seção Dois */
  .dois {
    padding: 40px 40px;
  }

  .dois h1 {
    margin: 20px 0 40px 0;
    text-align: center;
  }

  .topicos {
    justify-content: center;
    gap: 40px;
  }

  .container {
    width: 45%;
    min-width: 280px;
  }

  /* Seção Tres */
  .tres p,
  .tres h1 {
    margin-left: 40px;
  }

  .serviços-container {
    gap: 40px;
  }
}

/* Mobile (até 768px) */
@media (max-width: 768px) {
  /* Header - mantém horizontal */
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

  /* Intro */
  .intro {
    padding: 20px;
    height: auto;
    min-height: auto;
  }

  .intro img {
    width: 100%;
    height: auto;
    max-width: 100%;
  }

  .texto h1 {
    font-size: 32px;
    width: 100%;
  }

  .texto h2 {
    font-size: 16px;
  }

  .texto p {
    font-size: 14px;
    width: 100%;
  }

  /* Seção Dois */
  .dois {
    padding: 30px 20px;
  }

  .dois h1 {
    font-size: 24px;
    margin: 20px 0 30px 0;
  }

  .topicos {
    flex-direction: column;
    align-items: center;
    gap: 30px;
  }

  .topicos + .topicos {
    margin-top: 30px;
  }

  .container {
    width: 100%;
    max-width: 400px;
    align-items: center;
    text-align: center;
  }

  .container img {
    margin: 0 auto 10px;
  }

  .container h1 {
    text-align: center;
  }

  .container p {
    text-align: center;
  }

  /* Seção Tres */
  .tres {
    padding: 40px 20px;
  }

  .tres p {
    margin-left: 0;
    text-align: center;
    font-size: 18px;
  }

  .tres h1 {
    margin-left: 0;
    text-align: center;
    font-size: 24px;
  }

  .serviços-container {
    gap: 30px;
    padding: 0 10px;
  }

  .serviços-container.segunda-linha {
    margin-top: 30px;
  }

  .serviços {
    width: 100%;
    max-width: 400px;
  }
}

/* Mobile pequeno (até 480px) */
@media (max-width: 480px) {
  .navegaçao h1 {
    font-size: 18px;
  }

  .pages {
    gap: 10px;
  }

  .pages a {
    font-size: 12px;
  }

  .cadastro {
    padding: 6px 12px;
    font-size: 12px;
  }

  .texto h1 {
    font-size: 28px;
  }

  .texto h2 {
    font-size: 14px;
  }

  .texto p {
    font-size: 13px;
  }

  .dois h1 {
    font-size: 20px;
  }

  .container h1 {
    font-size: 18px;
  }

  .container p {
    font-size: 14px;
  }

  .tres h1 {
    font-size: 20px;
  }

  .tres p {
    font-size: 16px;
  }

  .serviços {
    padding: 15px;
  }

  .serviços h2 {
    font-size: 18px;
  }

  .serviços p {
    font-size: 14px;
  }
}
</style>