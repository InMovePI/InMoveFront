<script setup>
</script>

<template>
  <section class="cadastro">
    <div class="formulario">
      <div class="titulo">
        <h1>INMOVE</h1>
      </div>

      <div class="coluna">
        <input type="text" placeholder="Nome" class="input" />
        <input type="date" placeholder="Data de Nascimento" class="input" />
        <input type="email" placeholder="Email" class="input" />
        <input type="password" placeholder="Senha" class="input" />
        <input type="password" placeholder="Confirmar Senha" class="input" />

        <router-link to="/">Continuar</router-link>
      </div>
    </div>

    <div class="imagem">
      <img src="/public/mulher-adulto-sinal-simbolo-familia.jpg"/>
    </div>
  </section>
</template>

<style scoped>
.coluna a{
  display: flex;                
  justify-content: center;      
  align-items: center;          
  width: 250px; 
  background-color: rgb(206, 233, 4);
  text-decoration: none;
  color: black;
  padding: 15px;
  border-radius: 30px;
  transition: background-color 1s;
}

.coluna a:hover {
  background-color:rgb(172, 194, 5);
}

.titulo h1 {
  color:rgb(206, 233, 4);
  font-family: poppins, sans-serif;
  display: flex;
  justify-content: center;
}

.cadastro {
  display: flex;
  height: 100vh;
}

.coluna {
  display: flex;
  flex-direction: column;
  align-items: center; /* mantém tudo centralizado na metade esquerda */
}

.input {
  display: block;
  width: 400px;
  padding: 10px;
  margin-bottom: 30px;
  padding-left: 20px;
  font-size: 16px;
  border-radius: 20px;
  border: 1px solid black;
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
