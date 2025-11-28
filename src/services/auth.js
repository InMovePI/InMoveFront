import api from './api';

const AuthService = {
  async register(payload) {
    // payload includes { email, name, password, ...optional }
    const response = await api.post('/usuarios/', payload);
    return response.data;
  },

  async login(email, password) {
    const response = await api.post('/token/', { email, password });
    const { access, refresh } = response.data;

    if (access) {
      localStorage.setItem('access_token', access);
    }
    if (refresh) {
      localStorage.setItem('refresh_token', refresh);
    }

    // set axios default header
    this.setAuthHeader(access);
    return response.data;
  },

  setAuthHeader(token) {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common['Authorization'];
    }
  },

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    this.setAuthHeader(null);
  },

  async getCurrentUser() {
    const response = await api.get('/usuarios/me/');
    return response.data;
  }
};

export default AuthService;
