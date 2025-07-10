import { ref } from 'vue'
import { defineStore } from 'pinia'

import EditoraApi from '@/api/editora'

const editoraApi = new EditoraApi()

export const useEditoraStore = defineStore('editora', () => {
  const editoras = ref([
    {
      id: 1,
      descricao: 'Editora 1'
    },

  ])
  const meta = ref({
    page: 0,
    page_size: 0,
    total_pages: 0
  })

  async function getEditoras(page = 1, search = '') {
    const data = await editoraApi.buscarTodasAsEditoras(page, search)
    editoras.value = data.results
    meta.value.page = data.page
    meta.value.page_size = data.page_size
    meta.value.total_pages = data.total_pages
  }

  async function search(text) {
    await getEditoras(1, text)
  }

  async function excluirCategoria(id) {
    await categoriaApi.excluirCategoria(id)
    const index = categorias.value.findIndex((categoria) => categoria.id === id)
    categorias.value.splice(index, 1)
  }

  async function salvarCategoria(categoria) {
    if (categoria.id) {
      await categoriaApi.atualizarCategoria(categoria)
      const index = categorias.value.findIndex((c) => c.id === categoria.id)
      categorias.value.splice(index, 1, categoria)
    } else {
      const data = await categoriaApi.adicionarCategoria(categoria)
      categorias.value.splice(0, 0, data)
    }
  }

  async function proximaPagina() {
    await getCategorias(meta.value.page + 1)
  }

  async function paginaAnterior() {
    await getCategorias(meta.value.page - 1)
  }

  return {
    editoras,
    meta,
    getEditoras,
    search,
    salvarCategoria,
    excluirCategoria,
    proximaPagina,
    paginaAnterior
  }
})
