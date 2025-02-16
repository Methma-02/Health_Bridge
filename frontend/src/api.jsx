// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const register = async (userData) => {
  const response = await api.post('/register', userData);
  return response.data;
};

export const login = async (credentials) => {
  const response = await api.post('/login', credentials);
  return response.data;
};


export const googleLogin = async (credential) => {
  const response = await api.post('/auth/google', { credential });
  return response.data;
};

export const requestPasswordReset = async (email) => {
  const response = await api.post('/auth/reset-password', { email });
  return response.data;
};

export default api;
