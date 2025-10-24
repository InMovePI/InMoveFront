<script setup>
</script>

<template>
  <section class="cadastro">
    <div class="formulario">
      <div class="titulo">
        <h1>INMOVE</h1>
      </div>
      <div class="texto">
        <h1>Cadastre-se</h1>
        <p>Informações pessoais</p>
      </div>

      <div class="coluna">
        <input type="text" placeholder="Nome" class="input" />

        <div class="linha">
          <input type="date" placeholder="Data de Nascimento" class="input pequeno" />
          <select class="input pequeno">
            <option value="">Gênero</option>
            <option value="feminino">Feminino</option>
            <option value="masculino">Masculino</option>
            <option value="nao-informar">Prefiro não informar</option>
          </select>
        </div>

        <input type="email" placeholder="Email" class="input" />
        <input type="password" placeholder="Senha" class="input2" />

        <div class="login">
          <p>Já tem uma conta? <router-link to="/login"> Faça login! </router-link></p>
        </div>

        <router-link class="button" to="/informacoes">Continuar</router-link>
      </div>
    </div>

    <div class="imagem">
      <img src="/public/fotodocadastro.jpg" />
    </div>
  </section>
</template>

<style scoped>
.login a{
  color: rgb(206, 233, 4);
  text-decoration: underline;
  margin-left: 3px;
  margin-bottom: 10px;
  font-size: 15px;
}

.login p{
  font-size: 15px;
}
.texto h1, p {
  font-family: 'Poppins', sans-serif;
  color: white;
  display: flex;
  justify-content: flex-start;
}

.texto h1{
  margin-top: -10px;
  font-size: 20px;
  font-family: poppins, sans-serif;
}

.texto p {
  margin-top: -15px;
  margin-bottom: 40px;
  font-size: 18px;
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
}

.button:hover {
  background-color: rgb(172, 194, 5);
}

.titulo h1 {
  color: rgb(206, 233, 4);
  display: flex;
  justify-content: center;
  font-family: 'Jaro', sans-serif;
  font-size: 40px;
  letter-spacing: 0.5px;
}

.cadastro {
  display: flex;
  height: 100vh;
}

.coluna {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.input {
  display: block;
  width: 400px;
  padding: 10px;
  margin-bottom: 30px;
  padding-left: 20px;
  font-size: 16px;
  color: white;
  background-color: #202020;
  border-radius: 15px;
  border: 2px solid rgb(206, 233, 4);
  box-sizing: border-box;
  font-family: poppins, sans-serif;
}

.input2 {
  display: block;
  width: 400px;
  padding: 10px;
  padding-left: 20px;
  font-size: 16px;
  color: white;
  background-color: #202020;
  border-radius: 15px;
  border: 2px solid rgb(206, 233, 4);
  box-sizing: border-box;
  font-family: poppins, sans-serif;
}

.linha {
  display: flex;
  gap: 20px;
  width: 400px;
  justify-content: space-between;
}

.pequeno {
  width: 190px;
}

select.input {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}

.formulario {
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 160px;
  box-sizing: border-box;
}

.imagem {
  width: 50%;
  height: 100%;
}

.imagem img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
</style>