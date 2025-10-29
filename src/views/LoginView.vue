<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '@/services/api';

const router = useRouter();

// Dados do formulário
const email = ref('');
const senha = ref('');
const manterConectado = ref(false);

const erro = ref('');
const loading = ref(false);

const handleLogin = async () => {
  if (!email.value || !senha.value) {
    erro.value = 'Por favor, preencha email e senha';
    return;
  }

  loading.value = true;
  erro.value = '';

  try {
    // Fazer login na API
    const response = await api.post('/api/token/', {
      email: email.value,
      password: senha.value
    });

    localStorage.setItem('access_token', response.data.access);
    localStorage.setItem('refresh_token', response.data.refresh);

    try {
      const userResponse = await api.get('/api/usuarios/', {
        headers: {
          Authorization: `Bearer ${response.data.access}`
        }
      });
      

      const user = userResponse.data.results.find(u => u.email === email.value);
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      }
    } catch (err) {
      console.error('Erro ao buscar dados do usuário:', err);
    }

    router.push('/');

  } catch (err) {
    console.error('Erro ao fazer login:', err);
    
    if (err.response?.status === 401) {
      erro.value = 'Email ou senha incorretos';
    } else {
      erro.value = err.response?.data?.detail || 
                   err.response?.data?.message ||
                   'Erro ao fazer login. Tente novamente.';
    }
  } finally {
    loading.value = false;
  }
};

const handleKeyPress = (event) => {
  if (event.key === 'Enter') {
    handleLogin();
  }
};
</script>

<template>
  <div class="background-container">
    <img src="/public/gym.jpg" alt="" class="background-image" />
  </div>
  <div class="wrapper">
    <div class="container">
      <h1>INMOVE</h1>
      <h2>Login</h2>

      <div v-if="erro" class="erro">
        {{ erro }}
      </div>

      <div class="login">
        <p>Email</p>
        <input 
          v-model="email"
          type="email" 
          class="input"
          @keypress="handleKeyPress"
          :disabled="loading"
        />
        <p>Senha</p>
        <input 
          v-model="senha"
          type="password" 
          class="input"
          @keypress="handleKeyPress"
          :disabled="loading"
        />
      </div>

      <div class="options">
        <div class="checkbox-wrapper">
          <input 
            v-model="manterConectado"
            type="checkbox" 
            id="rememberMe"
            :disabled="loading"
          />
          <label for="rememberMe">Manter conectado</label>
        </div>
        <a href="#" class="forgot-password">Esqueceu a senha?</a>
      </div>

      <button 
        @click="handleLogin" 
        class="button"
        :disabled="loading"
      >
        {{ loading ? 'Entrando...' : 'Continuar' }}
      </button>

      <p class="cadastro">
        Não tem uma conta? 
        <router-link to="/cadastro"> Cadastre-se! </router-link>
      </p>
    </div>
  </div>
</template>

<style scoped>
.erro {
  background-color: #ff4444;
  color: white;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 15px;
  text-align: center;
  font-family: 'Poppins', sans-serif;
  width: 290px;
  font-size: 14px;
}

.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
}

.cadastro {
  color: white;
  font-size: 15px;
  margin-top: 5px;
  margin-bottom: 0;
}

.cadastro a {
  color: rgb(206, 233, 4);
  text-decoration: none;
}

.cadastro a:hover {
  text-decoration: underline;
}

.button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  background-color: rgb(206, 233, 4);
  text-decoration: none;
  color: black;
  padding: 15px;
  border-radius: 30px;
  transition: background-color 1s;
  margin-bottom: 10px;
  border: none;
  cursor: pointer;
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
}

.button:hover {
  background-color: rgb(172, 194, 5);
}

.button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.login p {
  color: white;
  margin-left: 5px;
  margin-top: 5px;
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

.input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.options {
  display: flex;
  justify-content: space-between;
  width: 290px;
  margin-bottom: 15px;
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
  height: 530px;
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