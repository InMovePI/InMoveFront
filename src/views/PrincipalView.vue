<script setup>
const etapa = 5
const progresso = `${(etapa / 100) * 100}%`
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
    <div class="esquerda">
      <div class="container">
        <h1>Treino Personalizado</h1>
        <img src="/public/icons8-haltere-60.png" width="40px" height="40px" />
        <p>Progresso 5%</p>
        <div class="barra">
          <div class="progresso" :style="{ width: progresso }"></div>
        </div>
      </div>
      <div class="opcoes">
        <h1>Mais Opções</h1>
        <div class="item">
          <img src="/public/icons8-lista-32.png" width="25px" height="25px" />
          <router-link>Histórico de treinos</router-link>
        </div>

        <div class="item">
          <img src="/public/icons8-sino-32.png" width="26px" height="26px" />
          <router-link>Lembretes e notificações</router-link>
        </div>

        <div class="item">
          <img src="/public/icons8-estrela-32.png" width="25px" height="25px" />
          <router-link>Avaliar o aplicativo</router-link>
        </div>
      </div>
    </div>

    <div class="direita">
      <div class="texto">
        <h1>Meus Treinos:</h1>
        <p>Crie suas próprias rotinas de treino</p>
      </div>
      <div class="container2">
        <h1>Criar uma rotina de treino</h1>
        <p>+</p>
      </div>

      <div class="texto2">
        <h1>Treinos Imediatos:</h1>
        <p>Um novo treino sempre baseado nas suas preferências.</p>
      </div>
      <div class="container2">
        <h1>Treino Imediato</h1>
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  display: flex;
  justify-content: space-between;
}


.direita {
  margin: 0px 90px;
}

.texto2{
  margin: 20px;
}

.texto2 h1{
  font-size: 18px;
  color: #e6ff2b;
  font-weight: 600;
}

.texto2 p{
  color: white;
  width: 300px
}

.container2 {
  width: 250px;
  margin: 10px 20px 0 0;
  position: relative;
}

.container2 p {
  font-size: 50px;
  position: absolute;
  right: 40px;
  top: 50%;
  transform: translateY(-50%);
  margin: 0;
  color: white;
}

.container2 h1 {
  color: white;
  font-family: poppins, sans-serif;
  font-weight: 600;
  font-size: 18px;
  width: 170px;
}

.texto h1 {
  font-size: 18px;
  color: #e6ff2b;
  font-weight: 600;
}

.texto p {
  color: white;
  width: 300px;
}

.texto {
  margin: 98px 220px 0px 0px;
  font-family: poppins, sans-serif;
  text-align: center;
}

.opcoes h1 {
  margin-bottom: 10px;
  color: #e6ff2b;
  font-size: 18px;
  font-family: poppins, sans-serif;
  font-weight: 600;
}

.opcoes {
  margin: 50px 0px 0px 250px;
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.item {
  display: flex;
  align-items: center; /* centraliza verticalmente img + p */
  gap: 10px;
  margin-bottom: 10px;
}

.item a {
  color: white;
  font-family: poppins, sans-serif;
  text-decoration: none;
  position: relative;
}

.item a::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -2px;
  width: 0%;
  height: 1px;
  background-color: white;
  transition: width 0.3s ease;
}

.item a:hover::after {
  width: 100%;
}

.container,
.container2 {
  min-height: 120px;
  padding: 20px;
  border-radius: 13px;
  background-color: rgba(51, 51, 51, 0.4);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.container {
  align-items: flex-start; /* alinha à esquerda */
  width: 250px;
  margin: 160px 0px 0px 250px;
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
