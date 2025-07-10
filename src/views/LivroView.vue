<script setup>
import { ref, onMounted } from "vue";
import ModalAdicionarLivro from "../components/livros/ModalAdicionarLivro.vue";
import LivrosApi from "@/api/livros";
const livrosApi = new LivrosApi();

const showModal = ref(false);

const livros = ref([]);

onMounted(async () => {
  // livros.value = await livrosApi.buscarTodosOsLivros();
  // await categoriaStore.getCategorias();
});

// function editar(livroParaEditar) {
//   Object.assign(livro, livroParaEditar);
// }

async function excluir(id) {
  await livrosApi.excluirLivro(id);
  livros.value = await livrosApi.buscarTodosOsLivros();
}

function mostrar() {
  console.log("teste");
}
</script>

<template>
  <div class="container">
    <button @click="showModal = true">+</button>
    <h1>Gerenciamento de Livros</h1>
    <ul class="livros-list">
      <li v-for="livro in livros" :key="livro.id">
        <div class="livro-info" @click="editar(livro)">
          <img
            :src="livro.capa || 'https://via.placeholder.com/150'"
            alt="Capa do Livro"
            class="livro-capa"
          />
          <div>
            <strong>ID:</strong> {{ livro.id }} <br />
            <strong>Título:</strong> {{ livro.titulo }} <br />
            <strong>Categoria:</strong> {{ livro.categoria }} <br />
            <strong>Editora:</strong> {{ livro.editora }} <br />
            <strong>Autores:</strong> {{ livro.autores }}
          </div>
        </div>
        <button @click="excluir(livro.id)">Excluir</button>
      </li>
    </ul>
  </div>
  <modal-adicionar-livro v-if="showModal" @close="showModal = false" />
</template>

<style scoped>
body {
  font-family: "Arial", sans-serif;
  background-color: #f4f4f9;
  margin: 0;
  padding: 0;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
}

h1 {
  font-size: 1.5rem;
  color: #343a40;
  margin-bottom: 30px;
  text-align: center;
}

.form {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
}

.livros-list {
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
  max-width: 800px;
}

li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
}

.livro-info {
  display: flex;
  gap: 15px;
  cursor: pointer;
}

.livro-info img {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 5px;
}

.livro-info div {
  font-size: 0.9rem;
}

li button {
  padding: 8px 12px;
  font-size: 0.9rem;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  transition: background-color 0.3s;
}

li button:hover {
  background-color: #c0392b;
}

@media (max-width: 600px) {
  .form {
    flex-direction: column;
    gap: 10px;
  }

  input[type="text"] {
    width: 100%;
  }

  ul {
    padding: 0;
  }
}
</style>
