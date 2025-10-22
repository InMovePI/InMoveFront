<script setup>
function limitarIdade(event) {
  const min = 0
  const max = 120
  let valor = Number(event.target.value)
  if (valor < min) valor = min
  if (valor > max) valor = max
  event.target.value = valor
}
</script>

<template>
  <section class="cadastro">
    <div class="formulario">
      <div class="titulo">
        <h1>INMOVE</h1>
      </div>

      <div class="Coluna">
        <input type="text" placeholder="Nome" class="input" />
        <input type="date" placeholder="Data de Nascimento" class="input" />
        <input type="email" placeholder="Email" class="input" />
        <input type="password" placeholder="Senha" class="input" />
        <input type="password" placeholder="Confirmar Senha" class="input" />
        <select name="Gênero" class="input objetivo">
          <option disabled selected hidden>Gênero</option>
          <option>Feminino</option>
          <option>Masculino</option>
          <option>Prefiro não informar</option>
        </select>
        <input type="number" @input="limitarIdade" placeholder="Idade" class="input" />
      </div>
    </div>

    <div class="imagem">
      <img src="/public/fitnesswoman-posing-gym.jpg"/>
    </div>
  </section>
</template>

<style scoped>
body {
  overflow-x: hidden;
  color: #202020;
}

.cadastro {
  display: flex;
  height: 100vh;
}

.formulario {
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 200px;
  box-sizing: border-box;
}

.Coluna {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 100px;
}

.titulo h1 {
  display: flex;
  justify-content: center;
  color:rgb(206, 233, 4);
  font-size: 35px;
}

.input {
  padding: 0.5rem;
  border: none;
  border-bottom: 2px solid #ffffff;
  font-size: 1rem;
  color: white;
  background: transparent;
  margin: 4px;
}

.input:focus {
  outline: none;
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
