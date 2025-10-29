<script setup></script>

<template>
  <header>
    <div class="navegaçao">
      <h1>INMOVE</h1>
      <div class="pages">
        <router-link to="/">Home</router-link>
        <router-link to="/dashboard"><span>Dashboard</span></router-link>
        <router-link>Explorar</router-link>
        <router-link to="/cadastro" class="cadastro">Cadastro de Usuário</router-link>
      </div>
    </div>
  </header>
</template>

<style scoped>
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
</style>
