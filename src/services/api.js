import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:19003',  // URL do seu Django
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Interceptor para adicionar token em todas as requisições
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;