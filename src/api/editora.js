import axios from "axios";
export default class EditoraApi {
  async buscarTodasAsEditoras(page, search = "") {
    const { data } = await axios.get(`/editoras/?page=${page}&search=${search}`);
    return data;
  }
  // async adicionarCategoria(categoria) {
  //   const { data } = await axios.post("/categorias/", categoria);
  //   return data;
  // }
  // async atualizarCategoria(categoria) {
  //   const { data } = await axios.put(`/categorias/${categoria.id}/`, categoria);
  //   return data.results;
  // }
  // async excluirCategoria(id) {
  //   await axios.delete(`/categorias/${id}/`);
  // }
}
