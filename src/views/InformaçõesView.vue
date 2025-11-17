<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import api from '@/services/api';

const router = useRouter();

// Dados do formulário
const pesoAtual = ref('');
const altura = ref('');
const metaPeso = ref('');
const objetivo = ref('');
const diasTreino = ref([]);
const grupoFoco = ref([]);
const preferencias = ref('');

// Estados
const erro = ref('');
const loading = ref(false);

// Multi-select dias da semana
const aberto = ref(false);
const selectContainer = ref(null);
const dias = [
  'Segunda-Feira',
  'Terça-Feira',
  'Quarta-Feira',
  'Quinta-Feira',
  'Sexta-Feira',
  'Sábado',
  'Domingo'
];

// Multi-select grupo muscular
const abertoGrupo = ref(false);
const grupoContainer = ref(null);
const grupos = ['Inferiores', 'Superiores'];

function limitarAltura(event) {
  const min = 0;
  const max = 250;
  let valor = Number(event.target.value);
  if (valor < min) valor = min;
  if (valor > max) valor = max;
  event.target.value = valor;
}

function toggleDia(dia) {
  if (diasTreino.value.includes(dia)) {
    diasTreino.value = diasTreino.value.filter((d) => d !== dia);
  } else {
    diasTreino.value.push(dia);
  }
}

function toggleGrupo(opcao) {
  if (grupoFoco.value.includes(opcao)) {
    grupoFoco.value = grupoFoco.value.filter((g) => g !== opcao);
  } else {
    grupoFoco.value.push(opcao);
  }
}

function handleClickFora(event) {
  if (selectContainer.value && !selectContainer.value.contains(event.target)) {
    aberto.value = false;
  }
  if (grupoContainer.value && !grupoContainer.value.contains(event.target)) {
    abertoGrupo.value = false;
  }
}

const handleCadastro = async () => {
  // Validações
  if (!pesoAtual.value || !altura.value || !metaPeso.value || !objetivo.value) {
    erro.value = 'Por favor, preencha todos os campos obrigatórios';
    return;
  }

  if (diasTreino.value.length === 0) {
    erro.value = 'Selecione pelo menos um dia de treino';
    return;
  }

  if (grupoFoco.value.length === 0) {
    erro.value = 'Selecione pelo menos um grupo muscular';
    return;
  }

  // Recuperar dados da primeira etapa
  const dadosCadastroStr = localStorage.getItem('dadosCadastro');
  
  if (!dadosCadastroStr) {
    erro.value = 'Dados do cadastro não encontrados. Retorne à página anterior.';
    return;
  }

  const dadosCadastro = JSON.parse(dadosCadastroStr);

  // Montar objeto completo para enviar
  const dadosCompletos = {
    name: dadosCadastro.name,
    email: dadosCadastro.email,
    password: dadosCadastro.password,
    data_nascimento: dadosCadastro.data_nascimento,
    genero: dadosCadastro.genero,
    altura_cm: parseInt(altura.value),
    peso_kg: parseFloat(pesoAtual.value),
    preferencias: preferencias.value || 'outro',
    // Campos extras (não estão no model User, mas podem ser úteis)
    meta_peso: parseFloat(metaPeso.value),
    objetivo: objetivo.value,
    dias_treino: diasTreino.value.join(','),
    grupo_foco: grupoFoco.value.join(',')
  };

  loading.value = true;
  erro.value = '';

  try {
    const response = await api.post('/api/usuarios/', dadosCompletos);
    
    // Salvar token se a API retornar
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    
    // Salvar dados do usuário
    localStorage.setItem('user', JSON.stringify(response.data));
    
    // Limpar dados temporários do cadastro
    localStorage.removeItem('dadosCadastro');
    
    // Redirecionar para home/dashboard
    router.push('/');
    
  } catch (err) {
    console.error('Erro ao cadastrar:', err);
    erro.value = err.response?.data?.message || 
                 err.response?.data?.detail ||
                 'Erro ao cadastrar. Tente novamente.';
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickFora);
  
  // Verificar se tem dados do cadastro
  const dadosCadastroStr = localStorage.getItem('dadosCadastro');
  if (!dadosCadastroStr) {
    alert('Complete o cadastro primeiro!');
    router.push('/cadastro');
  }
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickFora);
});
</script>

<template>
  <section class="cadastro">
    <!-- IMAGEM DE FUNDO - COLOQUE SUA IMAGEM AQUI -->
    <div class="background-image">
      <!-- OPÇÃO 1: Use background-image no CSS */
      <!-- OPÇÃO 2: Ou descomente a linha abaixo -->
      <!-- <img src="/homem-de-vista-frontal-malhando-com-halteres.jpg" alt="Background" /> -->
    </div>

    <!-- Card do formulário com efeito glass -->
    <div class="card-formulario">
      <div class="container-form">
        <div class="titulo">
          <h1>INMOVE</h1>
        </div>
        
        <div class="breadcrumb">
          <span>Cadastro</span>
          <span class="separador">&gt;</span>
          <span class="ativo">Informações</span>
        </div>

        <!-- Mensagem de erro -->
        <div v-if="erro" class="erro">
          {{ erro }}
        </div>

        <div class="campos">
          <!-- Linha com 3 inputs pequenos -->
          <div class="linha-inputs">
            <div class="campo-mini">
              <label>Peso atual (kg):</label>
              <input 
                v-model="pesoAtual"
                type="number" 
                class="input" 
              />
            </div>
            <div class="campo-mini">
              <label>Altura (cm):</label>
              <input
                v-model="altura"
                type="number"
                @input="limitarAltura"
                class="input"
              />
            </div>
            <div class="campo-mini">
              <label>Meta de peso (kg):</label>
              <input 
                v-model="metaPeso"
                type="number" 
                class="input" 
              />
            </div>
          </div>

          <!-- Objetivo -->
          <div class="campo">
            <label>Objetivo:</label>
            <select v-model="objetivo" class="input select-custom">
              <option value="">Selecione um objetivo</option>
              <option value="hipertrofia">Hipertrofia</option>
              <option value="emagrecimento">Emagrecimento</option>
              <option value="definicao">Definição Muscular</option>
            </select>
          </div>

          <!-- Dias da semana -->
          <div class="campo">
            <label>Dias da semana:</label>
            <div class="select-container" ref="selectContainer">
              <div class="select-input" @click="aberto = !aberto">
                <span class="texto" :class="{ placeholder: diasTreino.length === 0 }">
                  {{
                    diasTreino.length > 0
                      ? diasTreino.join(', ').length > 35
                        ? diasTreino.join(', ').slice(0, 35) + '...'
                        : diasTreino.join(', ')
                      : 'Selecione os dias de treino'
                  }}
                </span>
                <span class="seta">▼</span>
              </div>

              <ul v-if="aberto" class="select-options">
                <li
                  v-for="dia in dias"
                  :key="dia"
                  @click.stop="toggleDia(dia)"
                  :class="{ selecionado: diasTreino.includes(dia) }"
                >
                  {{ dia }}
                </li>
              </ul>
            </div>
          </div>

          <!-- Grupo muscular -->
          <div class="campo">
            <label>Grupo muscular de foco:</label>
            <div class="select-container" ref="grupoContainer">
              <div class="select-input" @click="abertoGrupo = !abertoGrupo">
                <span class="texto" :class="{ placeholder: grupoFoco.length === 0 }">
                  {{
                    grupoFoco.length > 0
                      ? grupoFoco.join(', ')
                      : 'Selecione os grupos musculares'
                  }}
                </span>
                <span class="seta">▼</span>
              </div>

              <ul v-if="abertoGrupo" class="select-options">
                <li
                  v-for="opcao in grupos"
                  :key="opcao"
                  @click.stop="toggleGrupo(opcao)"
                  :class="{ selecionado: grupoFoco.includes(opcao) }"
                >
                  {{ opcao }}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <button 
          @click="handleCadastro" 
          class="button"
          :disabled="loading"
        >
          {{ loading ? 'CADASTRANDO...' : 'CONTINUAR' }}
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
  margin-bottom: 35px;
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
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 22px;
  margin-bottom: 35px;
}

.campo {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.linha-inputs {
  display: flex;
  gap: 12px;
  width: 100%;
}

.campo-mini {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.campo label,
.campo-mini label {
  font-family: 'Poppins', sans-serif;
  color: white;
  font-size: 13px;
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

/* Select customizado */
.select-custom {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 0px center;
  background-size: 20px;
  padding-right: 25px;
  cursor: pointer;
}

.select-custom option {
  background-color: #1a1a1a;
  color: white;
  padding: 10px;
}

/* Multi-select customizado */
.select-container {
  position: relative;
  width: 100%;
}

.select-input {
  cursor: pointer;
  width: 100%;
  padding: 12px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  transition: border-color 0.3s;
}

.select-input:hover {
  border-bottom-color: rgba(255, 255, 255, 0.5);
}

.select-input:focus-within {
  border-bottom-color: rgb(206, 233, 4);
}

.texto {
  font-family: 'Poppins', sans-serif;
  font-size: 15px;
  color: white;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
}

.texto.placeholder {
  color: rgba(255, 255, 255, 0.4);
}

.seta {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.6);
  margin-left: 10px;
  transition: transform 0.3s;
}

.select-options {
  position: absolute;
  top: calc(100% + 5px);
  left: 0;
  width: 100%;
  background: rgba(26, 26, 26, 0.95);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  list-style: none;
  padding: 8px 0;
  max-height: 200px;
  overflow-y: auto;
  z-index: 100;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
}

.select-options li {
  padding: 10px 16px;
  cursor: pointer;
  color: white;
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  transition: background-color 0.2s;
}

.select-options li:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.select-options li.selecionado {
  background-color: rgba(206, 233, 4, 0.2);
  color: rgb(206, 233, 4);
  font-weight: 500;
}

/* Scrollbar customizada */
.select-options::-webkit-scrollbar {
  width: 6px;
}

.select-options::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
}

.select-options::-webkit-scrollbar-thumb {
  background: rgba(206, 233, 4, 0.3);
  border-radius: 10px;
}

.select-options::-webkit-scrollbar-thumb:hover {
  background: rgba(206, 233, 4, 0.5);
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
    margin-bottom: 30px;
  }

  .linha-inputs {
    flex-direction: column;
    gap: 20px;
  }

  .campo label,
  .campo-mini label {
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
    margin-bottom: 25px;
  }

  .button {
    font-size: 13px;
  }
}
</style>