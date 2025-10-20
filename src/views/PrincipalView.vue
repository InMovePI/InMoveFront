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
          <h1>PROGRESSO</h1>
          <p>
            Acompanhe sua evolução com treinos planejados para desafiar seus limites e gerar
            resultados reais, passo a passo.
          </p>
        </div>
        <div class="container">
          <H1>TREINOS PERSONALIZADOS</H1>
          <p>
            Cada corpo é único. Por isso, nossos programas são criados com base nos seus objetivos -
            seja ganhar massa, definir ou melhorar o condicionamento físico.
          </p>
        </div>
      </div>
      <div class="topicos">
        <div class="container">
          <h1>ORIENTAÇÃO NUTRICIONAL</h1>
          <p>
            Potencialize seus resultados com orientações nutricionais que complementam o treino e
            promovem mais energia e bem-estar
          </p>
        </div>
        <div class="container">
          <h1>AUTODEFESA E CONFIANÇA</h1>
          <p>
            Desenvolva força física e mental com atividades que unem preparo corporal e técnicas de
            defesa pessoal.
          </p>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.container p{
  color: white;
  width: 300px;
}

.topicos {
  display: flex;
  justify-content: space-around;
  margin: 20px 0px;
}

.container h1 {
  color: white;
  font-size: 20px;
}

.dois h1 {
  color: white;
  margin: 20px 50px;
}

.dois {
  background-color: rgba(51, 51, 51, 1);
}

main {
  padding: 0 80px;
  display: flex;
  flex-direction: column;
}

.intro {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
  width: 100%;
}

img {
  width: 800px;
  height: 500px;
  border-radius: 30px;
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

.cadastro {
  background-color: rgb(206, 233, 4);
  padding: 9px;
  border-radius: 50px;
  color: black;
  text-decoration: none;
}

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
</style>
