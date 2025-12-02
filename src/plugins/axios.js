import api from '@/services/api';

// Garantir que o token do localStorage fique aplicado caso exista no boot do app
const access = localStorage.getItem('access_token');
if (access) {
  api.defaults.headers.common['Authorization'] = `Bearer ${access}`;
}

export default api;
