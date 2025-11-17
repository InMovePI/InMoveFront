<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// Dados do formulário
const nome = ref('');
const email = ref('');
const senha = ref('');
const confirmarSenha = ref('');
const erro = ref('');
const loading = ref(false);

const handleContinuar = () => {
  // Validações básicas
  if (!nome.value || !email.value || !senha.value || !confirmarSenha.value) {
    erro.value = 'Por favor, preencha todos os campos';
    return;
  }

  // Validação de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value)) {
    erro.value = 'Email inválido';
    return;
  }

  // Validação de senha (mínimo 6 caracteres)
  if (senha.value.length < 6) {
    erro.value = 'A senha deve ter no mínimo 6 caracteres';
    return;
  }

  // Validação de confirmação de senha
  if (senha.value !== confirmarSenha.value) {
    erro.value = 'As senhas não coincidem';
    return;
  }

  // Salvar dados no localStorage
  const dadosCadastro = {
    name: nome.value,
    email: email.value,
    password: senha.value
  };

  localStorage.setItem('dadosCadastro', JSON.stringify(dadosCadastro));
  
  // Redirecionar para próxima página
  router.push('/informacoes');
};
</script>

<template>
  <section class="cadastro">
    <div class="background-image">

    </div>

    <!-- Card do formulário com efeito glass -->
    <div class="card-formulario">
      <div class="container-form">
        <div class="titulo">
          <h1>INMOVE</h1>
        </div>
        
        <div class="breadcrumb">
          <span>Usuário</span>
          <span class="separador">&gt;</span>
          <span class="ativo">Cadastro</span>
        </div>

        <!-- Mensagem de erro -->
        <div v-if="erro" class="erro">
          {{ erro }}
        </div>

        <div class="campos">
          <div class="campo">
            <label>Nome:</label>
            <input 
              v-model="nome"
              type="text" 
              class="input" 
            />
          </div>

          <div class="campo">
            <label>Email:</label>
            <input 
              v-model="email"
              type="email" 
              class="input" 
            />
          </div>

          <div class="campo">
            <label>Senha:</label>
            <input 
              v-model="senha"
              type="password" 
              class="input" 
            />
          </div>

          <div class="campo">
            <label>Confirmar senha:</label>
            <input 
              v-model="confirmarSenha"
              type="password" 
              class="input" 
            />
          </div>
        </div>

        <button 
          @click="handleContinuar" 
          class="button"
          :disabled="loading"
        >
          {{ loading ? 'Carregando...' : 'CONTINUAR' }}
        </button>
                <p class="login-link">
          Já possui uma conta? 
          <router-link to="/login">Faça login!</router-link>
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

.cadastro {
  position: relative;
  display: flex;
  align-items: center;
  padding-left: 80px;
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
}

.background-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Card com efeito glassmorphism */
.card-formulario {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 480px;
  padding: 50px 40px;
  
  /* Efeito de vidro fosco */
  background: rgba(20, 20, 20, 0.75);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  
  /* Borda azul como na imagem */
  border-radius: 8px;
  
  /* Sombra para destacar */
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
}

.container-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.titulo h1 {
  color: rgb(206, 233, 4);
  font-family: 'Jaro', sans-serif;
  font-size: 48px;
  letter-spacing: 2px;
  margin-bottom: 20px;
  font-weight: 400;
}

.breadcrumb {
  font-family: 'Poppins', sans-serif;
  color: white;
  font-size: 15px;
  margin-bottom: 40px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.breadcrumb .separador {
  color: #999;
}

.breadcrumb .ativo {
  font-weight: 400;
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
}

.campos {
  display: flex;
  flex-direction: column;
  gap: 25px;
  margin-bottom: 40px;
  width: 100%;
}

.campo {
  display: flex;
  flex-direction: column;
  gap: 8px;
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
.login-link {
  color: white;
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  text-align: center;
  margin-top: 20px;
}

.login-link a {
  color: rgb(206, 233, 4);
  text-decoration: none;
  font-weight: 500;
  transition: opacity 0.3s;
}

.login-link a:hover {
  text-decoration: underline;
  opacity: 0.8;
}


/* Responsividade */
@media (max-width: 1024px) {
  .cadastro {
    padding-left: 40px;
    padding-right: 40px;
  }

  .card-formulario {
    max-width: 500px;
    margin: 0 auto;
  }
}

@media (max-width: 768px) {
  .cadastro {
    padding: 20px;
    justify-content: center;
  }

  .card-formulario {
    max-width: 100%;
    padding: 40px 30px;
  }

  .titulo h1 {
    font-size: 40px;
    margin-bottom: 15px;
  }

  .breadcrumb {
    font-size: 14px;
    margin-bottom: 30px;
  }

  .campos {
    gap: 20px;
    margin-bottom: 35px;
  }

  .campo label {
    font-size: 13px;
  }

  .input {
    font-size: 14px;
    padding: 10px 0;
  }

  .button {
    max-width: 100%;
    padding: 14px;
  }
}

@media (max-width: 480px) {
  .card-formulario {
    padding: 35px 25px;
    border-width: 1.5px;
  }

  .titulo h1 {
    font-size: 36px;
  }

  .breadcrumb {
    font-size: 13px;
    margin-bottom: 25px;
  }

  .campos {
    gap: 18px;
    margin-bottom: 30px;
  }

  .button {
    font-size: 13px;
  }
}
</style>