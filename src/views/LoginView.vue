<template>
  <div class="background-container">
    <img src="/public/gym.jpg" alt="" class="background-image" />
  </div>
  <div class="wrapper">
    <div class="container">
      <h1>INMOVE</h1>
      <h2>Login</h2>
      <div class="login">
        <p>Email</p>
        <input type="email" class="input" />
        <p>Senha</p>
        <input type="password" class="input" />
      </div>

      <div class="options">
        <div class="checkbox-wrapper">
          <input type="checkbox" id="rememberMe" />
          <label for="rememberMe">Manter conectado</label>
        </div>
        <a href="#" class="forgot-password">Esqueceu a senha?</a>
     </div>
     <router-link to="/" class="button">Continuar</router-link>
     <p class="cadastro">Não tem uma conta? <router-link to="cadastro"> Cadastre-se! </router-link></p>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
}

.cadastro{
    color: white;
    font-size: 15px;
    margin-top: 5px; /* Reduz espaço acima */
    margin-bottom: 0;
}

.cadastro a{
    color: rgb(206, 233, 4);
    text-decoration: none;
}

.cadastro a:hover{
    text-decoration: underline;
}

.button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  background-color: rgb(206, 233, 4);
  text-decoration: none;
  color: black;
  padding: 15px;
  border-radius: 30px;
  transition: background-color 1s;
  margin-bottom: 10px;
}

.button:hover {
  background-color: rgb(172, 194, 5);
}

.login p {
  color: white;
  margin-left: 5px;
  margin-top: 5px; /* Reduz espaço acima dos labels */
  margin-bottom: 5px;
}

.input {
  width: 290px;
  padding: 10px;
  margin-bottom: 10px;
  padding-left: 20px;
  font-size: 16px;
  border-radius: 15px;
  border: 2px solid rgb(206, 233, 4);
  background-color: #202020;
  color: white;
  box-sizing: border-box;
  font-family: poppins, sans-serif;
}

.options {
  display: flex;
  justify-content: space-between;
  width: 290px;
  margin-bottom: 15px; /* Reduz espaço abaixo das options */
  margin-top: 10px;
}

.checkbox-wrapper {
  display: flex;
  align-items: center;
  gap: 2px;
}

.checkbox-wrapper input[type='checkbox'] {
  width: 16px;
  height: 16px;
  cursor: pointer;
  accent-color: rgb(206, 233, 4);
}

.checkbox-wrapper label {
  color: white;
  font-family: poppins, sans-serif;
  font-size: 14px;
  cursor: pointer;
  user-select: none;
}

.forgot-password {
  color: rgb(206, 233, 4);
  font-family: poppins, sans-serif;
  font-size: 14px;
  text-decoration: none;
  margin-left: 99px;
}

.forgot-password:hover {
  text-decoration: underline;
}

.container h1 {
  font-family: jaro, sans-serif;
  color: rgb(206, 233, 4);
  font-size: 40px;
  margin-top: 30px;
  margin-bottom: 0;
}

.container h2 {
  font-family: poppins, sans-serif;
  color: white;
  font-size: 20px;
  margin-top: 5px;
  margin-bottom: 10px;
}

.container {
  background-color: #202020;
  width: 450px;
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 30px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
}

body,
html {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden;
}

.background-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
}

.background-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: blur(5px);
}
</style>
