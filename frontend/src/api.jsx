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
    return Promise.reject({
      message: error.response?.data?.message || error.message || 'Request failed',
      status: error.response?.status,
      data: error.response?.data
    });
  }
);

export const register = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    throw {
      message: error.message || 'Registration failed',
      status: error.status,
      data: error.data
    };
  }
};

export const login = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  } catch (error) {
    throw {
      message: error.response?.data?.message || error.message || 'Login failed',
      status: error.response?.status,
      data: error.response?.data
    };
  }
};

export const googleLogin = async (credential) => {
  try {
    const response = await api.post('/auth/google', { credential });
    return response.data;
  } catch (error) {
    throw {
      message: error.response?.data?.message || error.message || 'Google login failed',
      status: error.response?.status,
      data: error.response?.data
    };
  }
};
export const forgotPassword = async (email) => {
  try {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
  } catch (error) {
    throw {
      message: error.response?.data?.message || error.message || 'Password reset request failed',
      status: error.response?.status,
      data: error.response?.data
    };
  }
};

export const resetPassword = async (email, password) => {
  try {
    const response = await api.post('/auth/reset-password', { email, password });
    return response.data;
  } catch (error) {
    throw {
      message: error.response?.data?.message || error.message || 'Password reset failed',
      status: error.response?.status,
      data: error.response?.data
    };
  }
};


// Verify a reset password token before showing the reset form
export const verifyResetToken = async (token) => {
  try {
    const response = await api.get(`/auth/verify-reset-token/${token}`);
    return response.data;
  } catch (error) {
    throw {
      message: error.response?.data?.message || error.message || 'Invalid or expired token',
      status: error.response?.status,
      data: error.response?.data
    };
  }
};

export default api;