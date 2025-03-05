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
// Add these to your api.js file

// For checking if email exists and initiating password reset
export const forgotPassword = async (email) => {
  try {
    const response = await fetch('/api/auth/forgot-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error checking email');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Forgot password API error:', error);
    throw error;
  }
};

// For resetting the password (modified to work with current backend)
export const resetPassword = async (email, password) => {
  try {
    const response = await fetch('/api/auth/reset-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        email, 
        password
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Password reset failed');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Reset password API error:', error);
    throw error;
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