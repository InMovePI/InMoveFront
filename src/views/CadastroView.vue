<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Dados do formulário
const nome = ref('')
const email = ref('')
const senha = ref('')
const dataNascimento = ref('')
const genero = ref('')
const erro = ref('')
const loading = ref(false)

const handleContinuar = () => {
  // Validações básicas
  if (!nome.value || !email.value || !senha.value || !dataNascimento.value || !genero.value) {
    erro.value = 'Por favor, preencha todos os campos'
    return
  }

  // Validação de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email.value)) {
    erro.value = 'Email inválido'
    return
  }

  // Validação de senha (mínimo 8 caracteres)
    if (senha.value.length < 8) {
      erro.value = 'A senha deve ter no mínimo 8 caracteres'
    return
  }


  // Mapear gênero para o código esperado pelo backend
  const generoMap = {
    'masculino': 'M',
    'feminino': 'F',
    'prefiro-nao-dizer': 'O'
  }

  // Salvar dados no localStorage
  const dadosCadastro = {
    name: nome.value,
    email: email.value,
    password: senha.value,
    data_nascimento: dataNascimento.value,
    genero: generoMap[genero.value],
  }

  localStorage.setItem('dadosCadastro', JSON.stringify(dadosCadastro))

  // Redirecionar para próxima página
  router.push('/informacoes')
}

</script>

<template>
  <section class="cadastro">
    <div class="background-image"></div>

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
            <input v-model="nome" type="text" class="input" />
          </div>

          <div class="campo">
            <label>Email:</label>
            <input v-model="email" type="email" class="input" />
          </div>


          <div class="campo">
            <label>Senha:</label>
            <input v-model="senha" type="password" class="input" />
          </div>

          <div class="campo-duplo">
            <div class="campo">
              <label>Data de nascimento:</label>
              <input v-model="dataNascimento" type="date" class="input" />
            </div>

            <div class="campo">
              <label>Gênero:</label>
              <select v-model="genero" class="input select-custom">
                <option value="" disabled selected>Selecione</option>
                <option value="masculino">Masculino</option>
                <option value="feminino">Feminino</option>
                <option value="prefiro-nao-dizer">Prefiro não dizer</option>
              </select>
            </div>
          </div>
        </div>

        <button @click="handleContinuar" class="button" :disabled="loading">
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
  background-image: url('/mulherAlongando.png');
  opacity: 0.9;
  background-size: cover;
  background-position-y: 30%;
  background-position-x: center;
  background-repeat: no-repeat;
}

.background-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

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
  width: 100%;
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

.campo-duplo {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
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

.select-custom {
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='white' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0 center;
  padding-right: 20px;
}

.select-custom option {
  background-color: #1a1a1a;
  color: white;
  padding: 10px;
}

.select-custom option:checked {
  background-color: rgb(206, 233, 4);
  color: #000;
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

  .campo-duplo {
    grid-template-columns: 1fr;
    gap: 20px;
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