<script></script>

<template>
  <header>
    <div class="navegaçao">
      <h1>InMove</h1>

      <router-link><p>Home</p> </router-link>
      <router-link><p>Atividades</p> </router-link>
      <router-link><p>Explorar</p> </router-link>
      <router-link><p>Pessoal</p> </router-link>

      <img src="/public/icons8-usuário-homem-com-círculo-90.png" width="45px" height="45px">
    </div>
  </header>
</template>

<style scoped>

.navegaçao p{
  color: white;
  font-family: Poppins, sans-serif;
}

.navegaçao a{
  text-decoration: none;
}

.navegaçao{
  display: flex;
  flex-direction: row;
  justify-content:space-around;
  padding: 10px;
  align-items: center;
  border-radius:30px;
  margin: 15px 80px;
  background-color: rgba(51, 51, 51, 0.7);
}

h1{
    font-weight: 500;
    font-family: Poppins, sans-serif;
    color: white;
    font-size: 25px;
  }
</style>