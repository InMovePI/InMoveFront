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
    <div class="imagem">
      <img src="/homem-de-vista-frontal-malhando-com-halteres.jpg" />
    </div>

    <div class="formulario">
      <div class="titulo">
        <h1>INMOVE</h1>
      </div>
      <div class="texto">
        <h1>Cadastre-se</h1>
        <p>Informações de cadastro</p>
      </div>

      <!-- Mensagem de erro -->
      <div v-if="erro" class="erro">
        {{ erro }}
      </div>

      <div class="coluna">
        <div class="linha">
          <input 
            v-model="pesoAtual"
            type="number" 
            placeholder="Peso atual (kg)" 
            class="input mini" 
          />
          <input
            v-model="altura"
            type="number"
            @input="limitarAltura"
            placeholder="Altura (cm)"
            class="input mini"
          />
          <input 
            v-model="metaPeso"
            type="number" 
            placeholder="Meta de peso (kg)" 
            class="input mini" 
          />
        </div>

        <select v-model="objetivo" class="input">
          <option value="">Selecione um objetivo</option>
          <option value="hipertrofia">Hipertrofia</option>
          <option value="emagrecimento">Emagrecimento</option>
          <option value="definicao">Definição Muscular</option>
        </select>

        <div class="select-container" ref="selectContainer">
          <div class="select-input" @click="aberto = !aberto">
            <span class="texto" :class="{ placeholder: diasTreino.length === 0 }">
              {{
                diasTreino.length > 0
                  ? diasTreino.join(', ').length > 30
                    ? diasTreino.join(', ').slice(0, 30) + '...'
                    : diasTreino.join(', ')
                  : 'Dias da semana que deseja treinar'
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

        <div class="select-container" ref="grupoContainer">
          <div class="select-input2" @click="abertoGrupo = !abertoGrupo">
            <span class="texto" :class="{ placeholder: grupoFoco.length === 0 }">
              {{
                grupoFoco.length > 0
                  ? grupoFoco.join(', ').length > 30
                    ? grupoFoco.join(', ').slice(0, 30) + '...'
                    : grupoFoco.join(', ')
                  : 'Grupo muscular de foco'
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

        <div class="login">
          <p>Já tem uma conta? <router-link to="/login"> Faça login! </router-link></p>
        </div>

        <button 
          @click="handleCadastro" 
          class="button"
          :disabled="loading"
        >
          {{ loading ? 'Cadastrando...' : 'Continuar' }}
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.erro {
  background-color: #ff4444;
  color: white;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 20px;
  text-align: center;
  font-family: 'Poppins', sans-serif;
}

.login a {
  color: rgb(206, 233, 4);
  text-decoration: underline;
  margin-left: 3px;
  margin-bottom: 10px;
  font-size: 15px;
}

.login p {
  font-size: 15px;
}

.select-container {
  position: relative;
}

.select-input {
  cursor: pointer;
  width: 400px;
  padding: 10px;
  margin-bottom: 30px;
  padding-left: 20px;
  font-size: 16px;
  border-radius: 15px;
  border: 2px solid rgb(206, 233, 4);
  background-color: #202020;
  color: white;
  box-sizing: border-box;
  font-family: poppins, sans-serif;
}

.select-input2 {
  cursor: pointer;
  width: 400px;
  padding: 10px;
  padding-left: 20px;
  font-size: 16px;
  border-radius: 15px;
  border: 2px solid rgb(206, 233, 4);
  background-color: #202020;
  color: white;
  box-sizing: border-box;
  font-family: poppins, sans-serif;
}

.texto {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 90%;
  color: white;
}

.texto.placeholder {
  color: #999;
}

.select-input:hover {
  border-color: #e6ff2b;
}

.seta {
  font-size: 12px;
}

.select-options {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  border: 1px solid #fff;
  border-radius: 5px;
  background-color: #1a1a1a;
  list-style: none;
  padding: 5px 0;
  max-height: 180px;
  overflow-y: auto;
  z-index: 10;
}

.select-options li {
  padding: 6px 10px;
  cursor: pointer;
  color: white;
}

.select-options li:hover {
  background-color: #333;
}

.select-options li.selecionado {
  background-color: #e6ff2b;
  color: black;
}

.linha {
  display: flex;
  gap: 15px;
  justify-content: center;
  width: 100%;
  max-width: 400px;
}

.input.mini {
  width: 120px;
}

.texto h1,
p {
  font-family: 'Poppins', sans-serif;
  color: white;
  display: flex;
  justify-content: flex-end;
}

.texto h1 {
  font-size: 20px;
  font-family: poppins, sans-serif;
}
.texto p {
  margin-top: -15px;
  margin-bottom: 40px;
  font-size: 18px;
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

.titulo h1 {
  color: rgb(206, 233, 4);
  display: flex;
  justify-content: center;
  font-family: 'Jaro', sans-serif;
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
  background-color: #202020;
  color: white;
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