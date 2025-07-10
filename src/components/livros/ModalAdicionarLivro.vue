<script setup>
import { reactive, onMounted, ref } from "vue";
import AutoComplete from "@/components/AutoComplete.vue";
import { useCategoriaStore } from "@/stores/categoria";
import { useEditoraStore } from "@/stores/editora";

const categoriaStore = useCategoriaStore();
const editoraStore = useEditoraStore();

const defaultLivro = {
  id: null,
  titulo: "",
  categoria: "",
  editora: "",
  autores: "",
  capa: "",
};
const livro = reactive({ ...defaultLivro });
const imagePreview = ref(null);

function openSelectImage() {
  const input = document.querySelector("input[type='file']");
  if (input) {
    input.click();
  }
}

function selectImage(evt) {
  const file = evt.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}

function limpar() {
  Object.assign(livro, { ...defaultLivro });
}

async function salvar() {
  alert("TODO: salvar");
  if (livro.id) {
    // await livrosApi.atualizarLivro(livro);
  } else {
    // await livrosApi.adicionarLivro(livro);
  }
  //   livros.value = await livrosApi.buscarTodosOsLivros();
  limpar();
}

onMounted(() => {
  categoriaStore.getCategorias();
  editoraStore.getEditoras();
});
</script>

<template>
  <div class="modal">
    <div class="content">
      <div class="row gap-20">
        <div class="col-10">
          <h1>Adicionar Livro</h1>
          <div class="form">
            <div class="row">
              <input
                class="col-8"
                type="text"
                v-model="livro.titulo"
                placeholder="Título"
              />
              <auto-complete
                class="col-4"
                v-model="livro.categoria"
                :items="categoriaStore.categorias"
                :search="categoriaStore.search"
                item-text="descricao"
                placeholder="Categoria"
              />
            </div>
            <div class="row">
              <auto-complete
                class="col-4"
                v-model="livro.editora"
                :items="editoraStore.editoras"
                :search="editoraStore.search"
                item-text="nome"
                placeholder="Editora"
              />
              <input
                type="text"
                class="col-6"
                v-model="livro.autores"
                placeholder="Autores"
              />
            </div>
            <form />
          </div>
        </div>
        <div class="col-2">
          <div @click="openSelectImage">
            <img
              class="image-preview"
              :src="imagePreview || 'https://placehold.co/100x150?text=?'"
              alt="Capa do Livro"
            />
          </div>
          <input type="file" hidden="selectImage" @input="selectImage" />
          <div class="button-actions">
            <button @click="salvar">Salvar</button>
            <button @click="limpar">Limpar</button>
            <button @click="$emit('close')">Fechar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  width: 60%;
  min-height: 60%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.image-preview {
  width: 100px;
  height: 150px;
  background-color: #f0f0f0;
  border-radius: 5px;
  margin-bottom: 20px;
}

.button-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
