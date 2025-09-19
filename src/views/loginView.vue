<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const senha = ref('')
const router = useRouter()

function continuar() {
  if (!email.value || !senha.value) {
    alert('Por favor, preencha o email e a senha.')
    return
  }

  // Aqui você faria a requisição de login pro back-end
  console.log('Tentando login com:', email.value, senha.value)

  // Se login for bem-sucedido:
  router.push('/principal')
}
</script>

<template>
  <div class="container">
    <h1 class="titulo">Bem-vindo de volta!</h1>
    <p class="subtitulo">Faça login para continuar usando sua conta.</p>

    <div class="campo">
      <label for="email">Email:</label>
      <input type="email" v-model="email" id="email" placeholder="Digite seu email">
    </div>

    <div class="campo">
      <label for="senha">Senha:</label>
      <input type="password" v-model="senha" id="senha" placeholder="Digite sua senha">
    </div>

    <button class="continuar" @click="continuar">Continuar</button>
  </div>
</template>

<style scoped>
body {
  background-color: #0b4650;
  margin: 0;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-family: Poppins, sans-serif;
  color: white;
}

.titulo {
  color: #e6ff2b;
  font-weight: bold;
  font-size: 1.5rem;
  margin-bottom: 0.3rem;
  font-family: Poppins, sans-serif;
}

.subtitulo {
  font-size: 1rem;
  color: white;
  margin-bottom: 1.5rem;
  text-align: center;
  font-family: Poppins, sans-serif;
}

.campo {
  width: 100%;
  max-width: 250px;
  margin-bottom: 1rem;
}

label {
  display: block;
  font-size: 0.9rem;
  margin-bottom: 0.3rem;
}

input {
  width: 100%;
  padding: 0.5rem;
  border-radius: 0.4rem;
  border: none;
  background-color: rgba(255, 255, 255, 0.4);
  color: #fff;
  outline: none;
  font-size: 0.9rem;
}

input::placeholder {
  color: rgba(255, 255, 255, 0.7);
}

.continuar {
  margin-top: 1rem;
  background-color: #e6ff2b;
  color: #0b4650;
  border: none;
  border-radius: 10rem;
  text-decoration: none;
  font-weight: 600;
  cursor: pointer;
  padding: 0.75rem 2rem;
  text-align: center;
  transition: background-color 0.3s ease;
}

.continuar:hover {
  background-color: #afc01a;
}
</style>
