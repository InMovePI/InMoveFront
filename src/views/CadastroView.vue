<script setup>
function limitarIdade(event) {
  const min = 0
  const max = 120
  let valor = Number(event.target.value)

  if (valor < min) valor = min
  if (valor > max) valor = max

  event.target.value = valor
}

function limitarAltura(event) {
  const min = 0
  const max = 250
  let valor = Number(event.target.value)

  if (valor < min) valor = min
  if (valor > max) valor = max

  event.target.value = valor
}
</script>

<template>
  <section class="cadastro">
    <div class="titulo">
      <h1>Cadastre-se!</h1>
    </div>

    <div class="colunas">
      <div class="primeiraColuna">
        <input type="text" placeholder="Nome" class="input" />
        <input type="date" placeholder="Data de Nascimento" class="input" />
        <input type="email" placeholder="Email" class="input" />
        <input type="password" placeholder="Senha" class="input" />
        <input type="password" placeholder="Confirmar Senha" class="input" />
        <select name="Gênero" class="input">
          <option>Feminino</option>
          <option>Masculino</option>
          <option>Prefiro não informar</option>
        </select>
        <input type="number" @input="limitarIdade" placeholder="Idade" class="input" />
      </div>

      <div class="segundaColuna">

        <input type="number" @input="limitarAltura" placeholder="Altura (cm)" class="input">
        <input type="number" placeholder="Peso (kg)" class="input" />
        <input type="number" placeholder="Meta de peso" class="input" />
        <select name="Objetivo" class="input">
            <option>Hipertrofia</option>
            <option>Emagrecimento</option>
            <option>Definição Muscular</option>
        </select>
      </div>
    </div>
  </section>
</template>

<style scoped>
.colunas{
    display: flex;
    gap: 204px;
    margin-top: 40px;
}

.primeiraColuna {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.segundaColuna {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.cadastro {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.titulo h1 {
  color: #e6ff2b;
  font-family: poppins, sans-serif;
  font-weight: 600;
  margin-top: 100px;
  font-size: 30px;
}

.input {
  padding: 0.5rem;
  border: none;
  border-bottom: 2px solid #ffffff;
  font-size: 1rem;
  color: white;
  margin: 4px;
}

.input:focus {
  outline: none;
}
</style>
