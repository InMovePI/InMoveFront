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
  <section class="login-page">
    <!-- IMAGEM DE FUNDO - COLOQUE SUA IMAGEM AQUI -->
    <div class="background-image">
      <!-- OPÇÃO 1: Use background-image no CSS -->
      <!-- OPÇÃO 2: Ou descomente a linha abaixo -->
      <!-- <img src="/public/gym.jpg" alt="Background" /> -->
    </div>

    <!-- Card do login com efeito glass -->
    <div class="card-login">
      <div class="container-form">
        <div class="titulo">
          <h1>INMOVE</h1>
          <h2>Login</h2>
        </div>

        <!-- Mensagem de erro -->
        <div v-if="erro" class="erro">
          {{ erro }}
        </div>

        <div class="campos">
          <div class="campo">
            <label>Email:</label>
            <input 
              v-model="email"
              type="email" 
              class="input"
              @keypress="handleKeyPress"
              :disabled="loading"
            />
          </div>

          <div class="campo">
            <label>Senha:</label>
            <input 
              v-model="senha"
              type="password" 
              class="input"
              @keypress="handleKeyPress"
              :disabled="loading"
            />
          </div>
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
          {{ loading ? 'ENTRANDO...' : 'CONTINUAR' }}
        </button>

        <p class="cadastro">
          Não tem uma conta? 
          <router-link to="/cadastro"> Cadastre-se! </router-link>
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.login-page {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
  overflow: hidden;
}

/* IMAGEM DE FUNDO - COLOQUE SUA IMAGEM AQUI */
.background-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  
  /* OPÇÃO 1: Use background-image */
  background-image: url('/public/mulherAlongando.png');
  opacity: 0.9;
  background-size: cover;
  background-position-y: 30%;
  background-position-x: center;
  background-repeat: no-repeat;
  
  /* OPÇÃO 2: Ou use uma cor temporária */
  background-color: #2a2a2a;
  
  /* Blur na imagem de fundo */
}

.background-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Card com efeito glassmorphism - SEM BORDA AZUL */
.card-login {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 420px;
  padding: 50px 40px;
  
  /* Efeito de vidro fosco */
  background: rgba(20, 20, 20, 0.75);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  
  /* SEM borda azul dessa vez */
  border-radius: 8px;
  
  /* Sombra para destacar */
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
}

.container-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.titulo {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 25px;
  width: 100%;
}

.titulo h1 {
  color: rgb(206, 233, 4);
  font-family: 'Jaro', sans-serif;
  font-size: 48px;
  letter-spacing: 2px;
  margin-bottom: 5px;
  font-weight: 400;
}

.titulo h2 {
  color: white;
  font-family: 'Poppins', sans-serif;
  font-size: 22px;
  font-weight: 400;
  margin: 0;
}

.erro {
  background-color: rgba(255, 68, 68, 0.2);
  color: #ff4444;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 20px;
  text-align: center;
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  border: 1px solid #ff4444;
  width: 100%;
}

.campos {
  display: flex;
  flex-direction: column;
  gap: 22px;
  margin-bottom: 20px;
  width: 100%;
}

.campo {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
}

.campo label {
  font-family: 'Poppins', sans-serif;
  color: white;
  font-size: 14px;
  font-weight: 400;
}

.input {
  width: 100%;
  padding: 12px 0;
  font-size: 15px;
  color: white;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  font-family: 'Poppins', sans-serif;
  outline: none;
  transition: border-color 0.3s;
}

.input:focus {
  border-bottom-color: rgb(206, 233, 4);
}

.input::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

.input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 30px;
}

.checkbox-wrapper {
  display: flex;
  align-items: center;
  gap: 6px;
}

.checkbox-wrapper input[type='checkbox'] {
  width: 16px;
  height: 16px;
  cursor: pointer;
  accent-color: rgb(206, 233, 4);
}

.checkbox-wrapper input[type='checkbox']:disabled {
  cursor: not-allowed;
}

.checkbox-wrapper label {
  color: white;
  font-family: 'Poppins', sans-serif;
  font-size: 13px;
  cursor: pointer;
  user-select: none;
}

.forgot-password {
  color: rgb(206, 233, 4);
  font-family: 'Poppins', sans-serif;
  font-size: 13px;
  text-decoration: none;
  transition: opacity 0.3s;
}

.forgot-password:hover {
  text-decoration: underline;
  opacity: 0.8;
}

.button {
  width: 100%;
  max-width: 220px;
  background-color: rgb(206, 233, 4);
  color: #000;
  padding: 15px 30px;
  border-radius: 30px;
  border: none;
  cursor: pointer;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  font-size: 14px;
  letter-spacing: 0.5px;
  transition: all 0.3s;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
}

.button:hover {
  background-color: rgb(172, 194, 5);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(206, 233, 4, 0.3);
}

.button:disabled {
  background-color: #666;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.cadastro {
  color: white;
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  text-align: center;
  margin: 0;
}

.cadastro a {
  color: rgb(206, 233, 4);
  text-decoration: none;
  font-weight: 500;
}

.cadastro a:hover {
  text-decoration: underline;
}

/* Responsividade */
@media (max-width: 768px) {
  .card-login {
    max-width: 90%;
    padding: 40px 30px;
  }

  .titulo h1 {
    font-size: 40px;
  }

  .titulo h2 {
    font-size: 20px;
  }

  .campos {
    gap: 20px;
  }

  .campo label {
    font-size: 13px;
  }

  .input {
    font-size: 14px;
  }

  .options {
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }

  .forgot-password {
    align-self: flex-end;
  }

  .button {
    max-width: 100%;
  }
}

@media (max-width: 480px) {
  .card-login {
    max-width: 95%;
    padding: 35px 25px;
  }

  .titulo h1 {
    font-size: 36px;
  }

  .titulo h2 {
    font-size: 18px;
  }

  .checkbox-wrapper label,
  .forgot-password {
    font-size: 12px;
  }

  .cadastro {
    font-size: 13px;
  }
}
</style>