<script setup></script>

<template>
  <section class="cadastro">
    <div class="imagem">
      <img src="/public/homem-de-vista-frontal-malhando-com-halteres.jpg" />
    </div>

    <div class="formulario">
      <div class="titulo">
        <h1>INMOVE</h1>
      </div>
      <div class="texto">
        <h1>Cadastre-se</h1>
        <p>Informações pessoais</p>
      </div>

      <div class="coluna">
        <input type="number" placeholder="Peso atual (kg)" class="input">
        <input type="number" placeholder="Altura (cm)" class="input">
        <input type="number" placeholder="Meta de peso (kg)" class="input">
        <select name="Objetivo" class="input">
            <option >Hipertrofia</option>
            <option >Emagrecimento</option>
            <option >Definição Muscular</option>
        </select>

        <router-link to="/informações">Continuar</router-link>
      </div>
    </div>
  </section>
</template>

<style scoped>
.texto h1,
p {
  font-family: "Poppins", sans-serif;
  color: white;
  margin-left: 25px;
}

.texto p {
  margin-top: -15px;
  margin-bottom: 40px;
  font-size: 18px;
}

.coluna a {
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

.coluna a:hover {
  background-color: rgb(172, 194, 5);
}

.titulo h1 {
  color: rgb(206, 233, 4);
  display: flex;
  justify-content: center;
  font-family: "Jaro", sans-serif;
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
  border-radius: 15px;
  border: 2px solid rgb(206, 233, 4);
  box-sizing: border-box;
  font-family: poppins, sans-serif;
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
